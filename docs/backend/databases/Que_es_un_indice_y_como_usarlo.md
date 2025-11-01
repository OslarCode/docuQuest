# Modulo 17. ¿Qué es un índice y cómo usarlo?

## 🧭 17.1. Qué es un índice (en palabras sencillas)

Un índice es como **el índice de un libro**:

- Sin índice, tienes que leer página por página hasta encontrar lo que buscas.
- Con índice, vas directo al capítulo o párrafo que te interesa.

👉 En una base de datos, un índice permite:

- Acceder rápidamente a registros que cumplen ciertas condiciones.
- Acelerar búsquedas (`WHERE`), joins (`JOIN`), ordenaciones (`ORDER BY`), y filtros.
- Evitar recorrer toda la tabla (full scan) innecesariamente.

📌 Los índices **no almacenan datos nuevos**: almacenan **punteros ordenados** a las filas reales de la tabla.

La base los mantiene sincronizados cada vez que insertas, actualizas o borras.

## 🧱 17.2. Ejemplo sin índice

Supón una tabla `cliente` con 500.000 registros:

```sql
CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(150),
  ciudad VARCHAR(100)
);

```

Si haces esta consulta:

```sql
SELECT * FROM cliente WHERE correo = 'ana@example.com';

```

Sin índice en `correo`, la base debe **recorrer las 500.000 filas** hasta encontrar la coincidencia.

👉 Esto es lo que se llama **sequential scan** (escaneo secuencial).

En pocas filas no importa…

Pero en cientos de miles o millones, **la diferencia es brutal**.

## 🧠 17.3. Creando un índice

```sql
CREATE INDEX idx_cliente_correo ON cliente(correo);

```

Ahora al ejecutar:

```sql
SELECT * FROM cliente WHERE correo = 'ana@example.com';

```

👉 El motor usa el índice `idx_cliente_correo` para **ir directamente** a la posición donde está `ana@example.com`.

**Ventaja:**

- Tiempo de respuesta mucho más bajo.
- Menor carga en disco y CPU.

## 🧭 17.4. Índices y claves primarias

Cuando defines una **PRIMARY KEY**, la base de datos **crea automáticamente un índice** sobre esa columna (o columnas).

```sql
CREATE TABLE alumno (
  id_alumno SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

```

👉 Ya tienes un índice en `id_alumno`, por eso buscar por PK es siempre rápido:

```sql
SELECT * FROM alumno WHERE id_alumno = 100;

```

No necesitas crear un índice adicional sobre la PK.

## 🧮 17.5. Índices en claves foráneas

Si usas muchas relaciones, también conviene **indexar las claves foráneas** para que los JOIN sean rápidos:

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  id_cliente INT REFERENCES cliente(id_cliente),
  fecha TIMESTAMP
);

```

👉 Aunque no es obligatorio, **crear un índice sobre `id_cliente` en `pedido` mejora muchísimo**:

```sql
CREATE INDEX idx_pedido_id_cliente ON pedido(id_cliente);

```

Así consultas como:

```sql
SELECT *
FROM cliente c
JOIN pedido p ON c.id_cliente = p.id_cliente
WHERE c.id_cliente = 50;

```

👉 se resuelven sin escanear toda la tabla de pedidos.

## 🧠 17.6. Tipos de índices más comunes

| Tipo de índice | Características principales | Uso típico |
| --- | --- | --- |
| **B-Tree** (por defecto) | Ordenado, eficiente en búsquedas exactas y rangos | PK, FK, búsquedas por valor, ORDER BY |
| **Hash** | Búsquedas exactas, no sirve para rangos | Claves únicas consultadas por igualdad |
| **Compuestos** | Índice sobre varias columnas | Consultas que filtran por más de una columna |
| **Únicos (`UNIQUE`)** | Garantizan unicidad además de acelerar consultas | Correos, DNI, usernames |
| **Full-text / GIN / GiST** | Para búsquedas de texto avanzado (más adelante) | Buscadores, filtros complejos |

👉 En la mayoría de los casos, **B-Tree es suficiente y el más eficiente**.

## 🧭 17.7. Índices y selectividad

👉 *Selectividad* = **qué tan discriminante** es un campo.

Ejemplo:

- Índice en `correo` (cada valor único) → alta selectividad ✅ (muy útil).
- Índice en `activo` (TRUE/FALSE) → baja selectividad ❌ (poco útil, casi todos los registros comparten valor).

📌 **Regla práctica:**

- Índices son más efectivos cuando **reducen drásticamente el número de filas** a leer.
- Evita indexar columnas con muy pocos valores posibles.

## 🧱 17.8. Ejemplo — cuándo **no** usar índice

```sql
CREATE INDEX idx_usuario_activo ON usuario(activo);

```

Si `activo` tiene solo 2 valores (`TRUE`/`FALSE`) y 95 % de la tabla es `TRUE`,

👉 el índice **no mejora el rendimiento**, incluso puede empeorarlo.

En esos casos, el motor prefiere hacer un full scan porque es más barato que ir y volver con miles de punteros de índice.

## 🧠 17.9. Índices compuestos

Si consultas a menudo por **más de una columna**, puedes crear índices sobre múltiples campos.

Ejemplo — búsquedas frecuentes por ciudad y correo:

```sql
CREATE INDEX idx_cliente_ciudad_correo
ON cliente(ciudad, correo);

```

Consulta que lo aprovecha:

```sql
SELECT * FROM cliente
WHERE ciudad = 'Madrid' AND correo = 'ana@example.com';

```

📌 **Importante:** el orden de las columnas en el índice importa:

- El índice `(ciudad, correo)` sirve para filtrar por `ciudad` sola o por ambas.
- Pero **no** para filtrar solo por `correo` eficientemente.

👉 Usa este patrón solo si el filtro compuesto es frecuente.

## 🧭 17.10. Índices únicos

Además de acelerar búsquedas, los índices pueden **garantizar unicidad**:

```sql
CREATE UNIQUE INDEX idx_cliente_correo_unico ON cliente(correo);

```

👉 Si alguien intenta insertar dos clientes con el mismo correo:

```sql
INSERT INTO cliente (nombre, correo) VALUES ('Ana', 'ana@example.com');
INSERT INTO cliente (nombre, correo) VALUES ('Pedro', 'ana@example.com');

```

❌ El segundo INSERT falla automáticamente.

Esto combina **rendimiento + integridad**.

*(En muchos casos ya usarías directamente `UNIQUE` en la definición de la tabla, lo cual crea el índice automáticamente.)*

## 🧠 17.11. Coste de los índices

Un índice **no es gratis**:

- Cada `INSERT`, `UPDATE` o `DELETE` debe actualizar también los índices.
- Muchos índices innecesarios = escrituras más lentas y consumo extra de disco.
- Por eso solo debes **crear los que realmente aporten rendimiento**.

📌 Regla práctica:

- Índices para PK y FK ✅
- Índices para columnas muy consultadas ✅
- Índices para columnas de baja selectividad ❌
- Índices duplicados ❌ (ej. índice y PK sobre la misma columna)

## 🧮 17.12. Visualizar si se está usando un índice (EXPLAIN)

La mayoría de motores permiten ver si una consulta está usando índice.

Ejemplo en PostgreSQL:

```sql
EXPLAIN SELECT * FROM cliente WHERE correo = 'ana@example.com';

```

Si todo está bien, verás algo como:

```
Index Scan using idx_cliente_correo on cliente ...

```

Si no:

```
Seq Scan on cliente ...

```

👉 significa que está ignorando el índice (puede ser porque el filtro no es selectivo o porque el índice no ayuda en esa consulta).

## 🧠 17.13. Índices en joins

En relaciones 1-N y N-N (como vimos en Módulo 16), los índices son fundamentales:

```sql
SELECT *
FROM pedido p
JOIN cliente c ON p.id_cliente = c.id_cliente
WHERE c.correo = 'ana@example.com';

```

👉 El índice en `cliente.correo` permite encontrar el cliente rápido.

👉 El índice en `pedido.id_cliente` permite localizar sus pedidos sin recorrer toda la tabla.

📌 Esto es **una de las optimizaciones más efectivas** en bases relacionales reales.

## 🧭 17.14. Buenas prácticas

- Define índices **solo en columnas que realmente usas en consultas frecuentes**.
- Indexa **todas las FK importantes** para joins eficientes.
- Usa índices **únicos** para columnas que deben ser únicas (correo, DNI…).
- Usa índices compuestos solo cuando el patrón de consulta lo justifique.
- Verifica uso de índices con `EXPLAIN` antes y después de crearlos.
- Revisa índices periódicamente: algunos se vuelven inútiles con el tiempo.

## 🚨 17.15. Errores comunes

- Crear índices indiscriminadamente “por si acaso”.
- No indexar FKs en tablas con millones de filas.
- Usar índices en columnas con baja selectividad.
- No revisar si realmente se están usando.
- Olvidar que los índices tienen coste en escrituras.