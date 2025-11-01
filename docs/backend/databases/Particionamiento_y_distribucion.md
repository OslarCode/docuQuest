# Particionamiento y distribución

## 33.1. El problema que resuelve el particionamiento

Imagina una tabla `pedido` con **cientos de millones de filas**.

Con el tiempo:

- Las consultas se vuelven lentas.
- Los índices pesan más que la RAM.
- Los backups tardan horas.
- Las operaciones de mantenimiento ya no entran en la ventana nocturna.

Llegados a ese punto, **ya no basta con agregar índices**:

hay que **dividir la tabla en partes más manejables**, sin cambiar la lógica de consultas.

A eso se le llama **particionamiento**.

## 33.2. Qué es particionar

Particionar una tabla significa **dividir físicamente** sus datos en **segmentos más pequeños**, llamados _particiones_, mientras la aplicación **sigue viéndola como una sola tabla lógica**.

Ejemplo conceptual:

```
pedido (tabla lógica)
├── pedido_2024
├── pedido_2025
└── pedido_2026

```

Para la app:

```sql
SELECT * FROM pedido WHERE fecha BETWEEN '2025-01-01' AND '2025-12-31';

```

Internamente:

la base **solo toca la partición 2025**, en lugar de escanear millones de filas de todos los años.

Resultado:

- Consultas más rápidas,
- Mantenimientos más ágiles,
- Archivos más pequeños por partición.

## 33.3. Tipos de particionamiento más comunes

1. **Por rango** (ej. fechas, IDs secuenciales)
2. **Por hash** (distribuir carga uniformemente)
3. **Por lista** (categorías o conjuntos discretos)

En la práctica, el **particionamiento por rango** es el más fácil de implementar y entender.

Los otros se usan cuando hay más nodos, más tráfico o más necesidades de balanceo.

## 33.4. Particionamiento por rango — ejemplo real

Supongamos que tenemos una tabla `pedido` con 3 años de datos:

```sql
CREATE TABLE pedido (
  id SERIAL,
  fecha DATE NOT NULL,
  cliente_id INT,
  total NUMERIC(10,2),
  PRIMARY KEY (id, fecha)
) PARTITION BY RANGE (fecha);

```

Hemos definido que la tabla se particionará por **rango de fechas**.

Ahora creamos las particiones:

```sql
CREATE TABLE pedido_2024
  PARTITION OF pedido
  FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE pedido_2025
  PARTITION OF pedido
  FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE pedido_2026
  PARTITION OF pedido
  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');

```

Cuando insertas:

```sql
INSERT INTO pedido (fecha, cliente_id, total)
VALUES ('2025-05-01', 123, 59.90);

```

La fila va automáticamente a `pedido_2025`.

Cuando consultas:

```sql
SELECT SUM(total) FROM pedido WHERE fecha BETWEEN '2025-01-01' AND '2025-12-31';

```

El motor solo toca `pedido_2025`.

Esto se llama **partition pruning** (poda de particiones).

## 33.5. Ventajas prácticas del particionamiento por rango

- Consultas más rápidas sobre períodos acotados.
- Mantenimiento selectivo: puedes vaciar o archivar una partición completa sin afectar las demás.
- Cada partición puede tener sus propios índices, almacenarse en diferentes discos o tablespaces.
- Se pueden aplicar estrategias de retención (por ejemplo, borrar automáticamente particiones viejas).

Ejemplo de limpieza:

```sql
DROP TABLE pedido_2024;

```

Esto borra **todo 2024** en un solo comando — sin escanear fila a fila.

## 33.6. Particionamiento por hash — distribuir carga

Cuando no tienes un criterio natural como una fecha, puedes usar un **hash** para distribuir filas entre particiones.

Ejemplo:

```sql
CREATE TABLE cliente (
  id SERIAL,
  nombre TEXT,
  email TEXT
) PARTITION BY HASH (id);

```

Crear particiones:

```sql
CREATE TABLE cliente_p0 PARTITION OF cliente FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE cliente_p1 PARTITION OF cliente FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE cliente_p2 PARTITION OF cliente FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE cliente_p3 PARTITION OF cliente FOR VALUES WITH (MODULUS 4, REMAINDER 3);

```

Cada nueva fila se distribuye automáticamente según `id % 4`.

Esto **balancea la carga** entre particiones, útil cuando no hay una columna temporal o categórica clara.

## 33.7. Particionamiento por lista — categorías discretas

Si tus datos tienen pocos valores fijos, puedes particionar por lista.

Ejemplo:

```sql
CREATE TABLE pedido_estado (
  id SERIAL,
  estado TEXT
) PARTITION BY LIST (estado);

CREATE TABLE pedido_pendiente PARTITION OF pedido_estado FOR VALUES IN ('pendiente');
CREATE TABLE pedido_enviado PARTITION OF pedido_estado FOR VALUES IN ('enviado');
CREATE TABLE pedido_cancelado PARTITION OF pedido_estado FOR VALUES IN ('cancelado');

```

Cada fila va a la partición correspondiente según su `estado`.

Útil cuando tienes categorías bien definidas (ej. regiones, tipos de cliente…).

## 33.8. Índices y mantenimiento por partición

Cada partición:

- Puede tener su propio índice.
- Se puede vacuumear o reindexar por separado.
- Puede almacenarse en un tablespace diferente.

Esto da flexibilidad para:

- Optimizar el almacenamiento según el uso.
- Archivar particiones antiguas en discos lentos y baratos.
- Mantener activas solo las particiones recientes en almacenamiento rápido.

Ejemplo:

```sql
CREATE INDEX idx_pedido_2025_fecha ON pedido_2025 (fecha);

```

La consulta solo usará ese índice cuando filtre por 2025.

## 33.9. Sharding — la idea extendida

Cuando una base ya no cabe **ni siquiera en un solo servidor físico o lógico**, entra en juego el **sharding**:

_Dividir la base en varios servidores_ (shards), cada uno con **una parte de los datos**.

Ejemplo clásico:

```
Shard 1 → clientes con ID 1–1000000
Shard 2 → clientes con ID 1000001–2000000
Shard 3 → clientes con ID 2000001–...

```

La aplicación debe saber **a qué shard enviar cada consulta**.

Ventajas:

- Escala horizontal real.
- Se pueden manejar volúmenes enormes.

Desventajas:

- Mucha más complejidad.
- Consultas globales (ej. `SELECT COUNT(*)`) se vuelven más difíciles.
- Requiere infraestructura más avanzada.

**El particionamiento es local**, **el sharding es distribuido**.

## 33.10. Cuándo usar particionamiento y cuándo NO

**Sí conviene particionar**:

- Tablas muy grandes (decenas de millones de filas).
- Consultas mayoritariamente filtradas por fechas o categorías claras.
- Cuando necesitas archivar datos antiguos fácilmente.
- Cuando quieres mejorar mantenibilidad sin cambiar la lógica de consultas.

**No hace falta particionar**:

- Bases pequeñas o medianas.
- Consultas que siempre leen toda la tabla igualmente.
- Si el equipo aún no tiene operaciones maduras para mantener múltiples particiones.

Particionar demasiado pronto **puede añadir complejidad innecesaria**.

## 33.11. Buenas prácticas al particionar

- Elige **un criterio de partición estable y natural** (fecha, ID, categoría…).
- Mantén particiones equilibradas — evita que una crezca desproporcionadamente.
- Automatiza la **creación y eliminación de particiones** futuras.
- Indexa particiones según las consultas reales.
- Archiva o borra particiones antiguas en lugar de hacer deletes masivos.
- Mide rendimiento antes y después para ajustar.
- Documenta cómo están organizadas las particiones y por qué.

## 33.12. Errores comunes

- Particionar sin un criterio claro → desequilibrio de datos.
- Olvidar crear particiones futuras → inserciones fallan.
- Borrar datos fila a fila en lugar de eliminar particiones enteras.
- No actualizar índices de particiones.
- Particionar demasiado pronto (overengineering).
- Confundir sharding con particionamiento interno.
