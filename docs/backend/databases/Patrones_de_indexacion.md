# Modulo 18. Patrones de indexación

## 🧭 18.1. ¿Qué es un patrón de indexación?

Cuando consultas una base, normalmente:

- Filtras registros con `WHERE`,
- A veces los unes con otras tablas (`JOIN`),
- A menudo los ordenas (`ORDER BY`),
- Y en algunos casos aplicas filtros adicionales (`LIMIT`, `OFFSET`, `GROUP BY`).

👉 Un **buen índice** debe **ajustarse a ese patrón real de uso**, no solo a la columna “más importante”.

Ejemplo:

```sql
SELECT *
FROM cliente
WHERE ciudad = 'Madrid'
ORDER BY apellido;

```

→ Si solo indexas `apellido`, la búsqueda por `ciudad` no se beneficia.

→ Si indexas `(ciudad, apellido)`, la base podrá **filtrar y ordenar** sin hacer pasos extra.

## 🧱 18.2. Índices en columnas de búsqueda (`WHERE`)

El caso más común: filtrar por un campo específico o combinación de campos.

Ejemplo:

```sql
SELECT * FROM pedido WHERE fecha = '2025-10-20';

```

👉 Índice recomendado:

```sql
CREATE INDEX idx_pedido_fecha ON pedido(fecha);

```

Esto evita escanear toda la tabla cada vez que se consulta por fecha.

📌 **Consejo**:

- Indexa las columnas que aparecen frecuentemente en `WHERE`.
- Si hay varias columnas en el filtro, considera un índice compuesto.

## 🧠 18.3. Índices para filtros múltiples

Si consultas así:

```sql
SELECT *
FROM pedido
WHERE fecha = '2025-10-20' AND estado = 'enviado';

```

👉 Un índice sobre `(fecha, estado)` puede cubrir la consulta completa:

```sql
CREATE INDEX idx_pedido_fecha_estado ON pedido(fecha, estado);

```

📌 El **orden de las columnas en el índice importa**:

- `(fecha, estado)` sirve para filtrar por `fecha` sola o ambas.
- `(estado, fecha)` **no** será eficiente si solo consultas por `fecha`.

**Regla práctica:**

→ pon primero la columna **más selectiva** (la que reduce más filas).

## 🧮 18.4. Índices para ordenación (`ORDER BY`)

Supón:

```sql
SELECT *
FROM cliente
WHERE ciudad = 'Madrid'
ORDER BY apellido;

```

👉 Un índice sobre `(ciudad, apellido)` permite:

- Filtrar por `ciudad`,
- Ordenar por `apellido`,
- Sin necesidad de un paso extra de sorting.

```sql
CREATE INDEX idx_cliente_ciudad_apellido
ON cliente(ciudad, apellido);

```

👉 Esto es muy eficiente para paginación (`LIMIT/OFFSET`) y listados largos.

## 🧭 18.5. Índices de cobertura (covering indexes)

Un **índice de cobertura** es aquel que contiene **todas las columnas** que una consulta necesita.

Así, el motor puede responder **sin tocar la tabla original**, solo leyendo el índice.

Ejemplo:

```sql
SELECT correo, ciudad
FROM cliente
WHERE ciudad = 'Madrid';

```

👉 Índice recomendado:

```sql
CREATE INDEX idx_cliente_ciudad_correo
ON cliente(ciudad, correo);

```

- Filtro por `ciudad`.
- La columna `correo` también está en el índice.
    
    👉 La base responde **solo desde el índice**, lo que es rapidísimo en tablas grandes.
    

*(Esto es más evidente en motores como PostgreSQL o MySQL InnoDB, donde acceder al índice es mucho más barato que leer la tabla entera.)*

## 🧱 18.6. Índices y paginación eficiente

Un error común:

```sql
SELECT * FROM pedido ORDER BY fecha DESC LIMIT 10 OFFSET 50000;

```

👉 Aunque tengas índice en `fecha`, **el OFFSET obliga a recorrer miles de filas**.

Patrón recomendado:

- Paginación basada en **cursores o marcadores**, no en OFFSET.
- Aprovecha índices ordenados.

Ejemplo:

```sql
SELECT * FROM pedido
WHERE fecha < '2025-10-20'
ORDER BY fecha DESC
LIMIT 10;

```

👉 El índice en `fecha` permite saltar directamente a la posición correcta y paginar **sin penalizaciones enormes**.

## 🧠 18.7. Índices parciales (cuando no todo merece ser indexado)

Algunas consultas solo afectan a **una parte pequeña de la tabla**.

Por ejemplo:

```sql
SELECT * FROM pedido WHERE estado = 'pendiente';

```

Si solo el 5 % de los pedidos están “pendientes”, un índice parcial es más eficiente:

```sql
CREATE INDEX idx_pedido_pendiente
ON pedido(fecha)
WHERE estado = 'pendiente';

```

👉 El índice solo contiene los pedidos pendientes → más pequeño, más rápido.

👉 Muy útil para datos históricos o activos/inactivos.

*(Soportado en PostgreSQL y algunos otros motores.)*

## 🧭 18.8. Índices en JOIN

Cuando haces:

```sql
SELECT *
FROM pedido p
JOIN cliente c ON p.id_cliente = c.id_cliente
WHERE c.correo = 'ana@example.com';

```

👉 Índice recomendado:

- `cliente(correo)` para encontrar el cliente.
- `pedido(id_cliente)` para encontrar rápidamente sus pedidos.

```sql
CREATE INDEX idx_cliente_correo ON cliente(correo);
CREATE INDEX idx_pedido_id_cliente ON pedido(id_cliente);

```

📌 **Regla de oro**:

→ Indexa las **claves foráneas** usadas frecuentemente en joins.

→ Esto evita que las relaciones N-a-N o 1-a-N colapsen con tablas grandes.

## 🧮 18.9. Índices únicos como optimización y restricción

Ya lo mencionamos en el módulo anterior, pero aquí es importante:

```sql
CREATE UNIQUE INDEX idx_usuario_email_unico ON usuario(email);

```

- Acelera búsquedas por email.
- Garantiza unicidad sin necesidad de lógica extra en la aplicación.
- Optimiza validaciones de registro y login.

👉 Muchos campos “identificadores naturales” (correo, DNI, username) deberían tener índices únicos.

## 🧠 18.10. Anti-patrones típicos de indexación ❌

| Anti-patrón | Por qué es un problema | Alternativa recomendada |
| --- | --- | --- |
| Indexar todas las columnas | Aumenta el coste de escritura y espacio | Indexar solo lo necesario |
| Indexar columnas con baja selectividad (`activo`, `sexo`) | No mejora nada | Evitar o usar índices parciales |
| Repetir índices sobre la misma columna | Desperdicio | Consolidar en uno solo |
| Ignorar el orden en índices compuestos | Ineficiencia | Poner primero la columna más filtrante |
| No revisar si el índice se usa (`EXPLAIN`) | Índices muertos ocupando espacio | Medir antes de crear |

## 🧭 18.11. Verificar uso de índices

No basta con crearlos:

👉 Hay que **medir si el motor realmente los usa**.

Ejemplo PostgreSQL:

```sql
EXPLAIN ANALYZE
SELECT correo FROM cliente WHERE ciudad = 'Madrid';

```

- `Index Scan` ✅ índice usado.
- `Seq Scan` ❌ no lo está usando (quizá el índice no ayuda o hay demasiado pocos registros filtrados).

📌 Esto es fundamental en sistemas grandes.

## 🧠 18.12. Buenas prácticas

- Diseña índices **según patrones de consulta reales**, no supuestos.
- Usa índices compuestos solo si el orden de las columnas tiene sentido.
- Indexa FK y columnas muy usadas en `WHERE`, `JOIN` y `ORDER BY`.
- Considera índices de cobertura para mejorar aún más rendimiento.
- Limpia índices duplicados o inútiles.
- Usa `EXPLAIN` para validar cada decisión.
- Documenta qué índices existen y por qué.

## 🚨 18.13. Errores comunes

- Crear índices por cada columna “por si acaso”.
- No actualizar índices cuando cambian los patrones de uso.
- No considerar el orden correcto en índices compuestos.
- Usar OFFSET con millones de filas y confiar en el índice.
- No eliminar índices obsoletos.

✅ Con este módulo, el estudiante **aprende a pensar estratégicamente los índices**,

construyéndolos **según patrones de búsqueda, ordenación y filtrado reales**,

evitando inflar la base con índices que no aportan nada.