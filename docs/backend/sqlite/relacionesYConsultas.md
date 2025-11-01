# Relaciones y consultas expresivas

## 1. JOIN — Unir tablas y evitar consultas “en cascada”

Un **JOIN** te permite **combinar datos de varias tablas** en una sola consulta.

Imagina que tienes:

- `clients` → información de clientes
- `orders` → pedidos que pertenecen a esos clientes

Queremos obtener:

*Nombre del cliente + total del pedido + fecha* en una sola tabla.

### Recordatorio de estructura

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
) STRICT;

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  total REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY (client_id) REFERENCES clients(id)
) STRICT;

```

Insertamos algunos datos:

```sql
INSERT INTO clients (name, email) VALUES
('Ana', 'ana@example.com'),
('Luis', 'luis@example.com');

INSERT INTO orders (client_id, total) VALUES
(1, 49.99),
(1, 89.90),
(2, 120.00);

```

## 2. INNER JOIN — la unión más común

`INNER JOIN` devuelve solo las filas que tienen coincidencias en ambas tablas.

```sql
SELECT
  orders.id AS order_id,
  clients.name AS client_name,
  orders.total,
  orders.created_at
FROM orders
INNER JOIN clients
  ON orders.client_id = clients.id;

```

Qué hace esto:

- Toma cada `order`
- Busca al `client` que coincida en `client_id`
- Devuelve solo las filas donde hay coincidencia.

Resultado:

```
order_id | client_name | total  | created_at
--------------------------------------------
1        | Ana         | 49.99  | ...
2        | Ana         | 89.90  | ...
3        | Luis        | 120.00 | ...

```

Nota práctica:

- Siempre especifica los nombres de tabla con prefijo (`orders.total` en vez de `total`) cuando haces JOINs.
- Usa alias (`AS`) para que las columnas tengan nombres claros.

## 3. LEFT JOIN — incluso si no hay coincidencia

`LEFT JOIN` devuelve **todas las filas de la tabla izquierda** (la primera), aunque no haya coincidencia en la derecha.

Ejemplo:

```sql
SELECT
  c.name AS client,
  o.id AS order_id,
  o.total
FROM clients c
LEFT JOIN orders o
  ON c.id = o.client_id;

```

Si tuvieras un cliente sin pedidos:

```
order_id | client  | total
--------------------------
1        | Ana     | 49.99
2        | Ana     | 89.90
3        | Luis    | 120.00
NULL     | Marta   | NULL

```

Muy útil para detectar registros “sin actividad”.

## 4. RIGHT JOIN y FULL JOIN

SQLite no soporta `RIGHT JOIN` ni `FULL JOIN` directamente.

Pero puedes lograr el mismo resultado invirtiendo tablas (`RIGHT` → `LEFT`) o usando CTEs o `UNION`.

Ejemplo equivalente a RIGHT JOIN:

```sql
SELECT
  o.id AS order_id,
  c.name AS client,
  o.total
FROM orders o
LEFT JOIN clients c
  ON c.id = o.client_id;

```

Igual que un RIGHT JOIN clásico, pero cambiando el orden.

## 5. JOIN + filtros y ordenamiento

Puedes aplicar `WHERE`, `ORDER BY` y `LIMIT` igual que en cualquier `SELECT`.

```sql
SELECT
  c.name AS client,
  o.total
FROM clients c
INNER JOIN orders o
  ON c.id = o.client_id
WHERE o.total > 80
ORDER BY o.total DESC
LIMIT 5;

```

Resultado:

```
client | total
---------------
Luis   | 120.00
Ana    | 89.90

```

Esto es **muy potente** cuando tienes relaciones N→1.

## 6. JOIN entre más de dos tablas

Puedes encadenar varios JOINs:

Supongamos que tenemos otra tabla `products` y una tabla `order_items` para pedidos con varios productos:

```sql
SELECT
  c.name AS client,
  o.id AS order_id,
  p.name AS product,
  oi.quantity,
  (oi.quantity * p.price) AS subtotal
FROM clients c
INNER JOIN orders o
  ON c.id = o.client_id
INNER JOIN order_items oi
  ON o.id = oi.order_id
INNER JOIN products p
  ON oi.product_id = p.id;

```

Así puedes armar informes complejos de facturación, inventario, etc.

## Ejercicio práctico — JOIN básico y LEFT JOIN

1. Crea un cliente sin pedidos:

```sql
INSERT INTO clients (name, email) VALUES ('Marta', 'marta@example.com');

```

1. Haz un `INNER JOIN` entre clientes y pedidos.
    
    No aparecerá Marta.
    
2. Haz un `LEFT JOIN` entre clientes y pedidos.
    
    Ahora Marta aparecerá con `NULL` en las columnas de pedidos.
    
3. Ordena por nombre de cliente.

## Buenas prácticas con JOINs

- Usa alias cortos (`c`, `o`, `p`) para que la consulta sea más legible.
- Prefiere `INNER JOIN` para datos que **deben coincidir** y `LEFT JOIN` para **auditorías** o reportes.
- Siempre usa `ON` con condiciones claras (`c.id = o.client_id`).
- Evita usar `NATURAL JOIN` — es más propenso a errores ocultos.

## 1. Qué es una VIEW (vista)

Una **VIEW** en SQLite es básicamente una **consulta guardada** que se comporta como si fuera una tabla.

No almacena datos nuevos — simplemente **muestra datos existentes** de manera estructurada.

Esto es muy útil cuando tienes consultas JOIN complejas que necesitas usar muchas veces.

### Ejemplo básico de VIEW

Imagina que tenemos nuestra relación:

- `clients` → clientes
- `orders` → pedidos

Y queremos obtener un **informe combinado** con:

- nombre del cliente,
- número de pedido,
- total,
- fecha.

La consulta es esta:

```sql
SELECT
  o.id AS order_id,
  c.name AS client_name,
  o.total,
  o.created_at
FROM orders o
INNER JOIN clients c
  ON o.client_id = c.id;

```

Ahora, en lugar de repetir esta consulta en varios informes, la guardamos como una **VIEW**:

```sql
CREATE VIEW IF NOT EXISTS view_orders_clients AS
SELECT
  o.id AS order_id,
  c.name AS client_name,
  o.total,
  o.created_at
FROM orders o
INNER JOIN clients c
  ON o.client_id = c.id;

```

A partir de aquí, podemos consultar **como si fuera una tabla**:

```sql
SELECT * FROM view_orders_clients;

```

Resultado idéntico, pero con una consulta mucho más limpia.

### Modificar o eliminar una VIEW

- Ver la definición de la vista:

```sql
.schema view_orders_clients

```

- Eliminarla si es necesario:

```sql
DROP VIEW IF EXISTS view_orders_clients;

```

Nota: SQLite **no permite `CREATE OR REPLACE VIEW`** directamente, debes `DROP` y volver a `CREATE` si quieres actualizarla.

### Ejercicio rápido con VIEW

1. Crea una VIEW `view_orders_clients` como el ejemplo anterior.
2. Haz un `SELECT` simple sobre esa vista.
3. Agrega un nuevo pedido y repite el `SELECT` → verás que la vista se **actualiza automáticamente**, porque refleja los datos reales.

## 2. Qué es una CTE (Common Table Expression)

Una **CTE** es como una **subconsulta temporal nombrada** que puedes usar dentro de una sola sentencia `SELECT`, `INSERT`, `UPDATE` o `DELETE`.

La sintaxis:

```sql
WITH nombre_cte AS (
  SELECT ...
)
SELECT ... FROM nombre_cte;

```

Ventajas de usar CTE:

- Hace tu SQL más **legible y modular**.
- Evita duplicar subconsultas largas.
- Permite hacer cálculos intermedios.

### Ejemplo práctico de CTE

Queremos obtener:

- Nombre del cliente
- Total acumulado de todos sus pedidos

Sin CTE:

```sql
SELECT
  c.name,
  SUM(o.total) AS total_gastado
FROM clients c
LEFT JOIN orders o
  ON c.id = o.client_id
GROUP BY c.name;

```

Con CTE:

```sql
WITH total_por_cliente AS (
  SELECT
    c.id AS client_id,
    c.name,
    SUM(o.total) AS total_gastado
  FROM clients c
  LEFT JOIN orders o
    ON c.id = o.client_id
  GROUP BY c.id
)
SELECT * FROM total_por_cliente
ORDER BY total_gastado DESC;

```

Mucho más limpio si esta consulta se va a extender o encadenar con otras.

## 3. CTE encadenadas (múltiples WITH)

Puedes declarar **más de una CTE** separándolas con comas.

Ejemplo:

Queremos calcular:

1. total por cliente,
2. y luego quedarnos solo con los que gastaron más de 100 €.

```sql
WITH total_por_cliente AS (
  SELECT
    c.id,
    c.name,
    SUM(o.total) AS total_gastado
  FROM clients c
  LEFT JOIN orders o
    ON c.id = o.client_id
  GROUP BY c.id
),
top_clientes AS (
  SELECT * FROM total_por_cliente
  WHERE total_gastado > 100
)
SELECT * FROM top_clientes
ORDER BY total_gastado DESC;

```

Resultado: solo clientes “top”.

Esto es muy útil para **informes y dashboards** donde quieres filtrar por tramos de ventas, fechas, etc.

## 4. CTE recursivas (opcional avanzado)

SQLite también permite **CTEs recursivas**, por ejemplo para manejar jerarquías o generar secuencias.

No las usaremos a fondo ahora, pero vale un vistazo:

```sql
WITH RECURSIVE contador(x) AS (
  SELECT 1
  UNION ALL
  SELECT x+1 FROM contador WHERE x < 5
)
SELECT x FROM contador;

```

Resultado:

```
1
2
3
4
5

```

Este tipo de CTE es muy útil cuando necesitas recorrer estructuras jerárquicas o generar datos sintéticos sin bucles en la app.

## 5. Ejercicio práctico — CTE en acción

1. Crear una CTE llamada `clientes_con_total` que calcule:
    - nombre del cliente
    - total gastado
2. Crear otra CTE que filtre solo los que gastaron más de 80 €.
3. Hacer un `SELECT` final ordenado por total descendente.

Resultado esperado:

```
name  | total_gastado
---------------------
Luis  | 120.00
Ana   | 139.89

```

## 6. Buenas prácticas con VIEWS y CTEs

- Usa **VIEWS** cuando la consulta se va a reutilizar en varios lugares.
- Usa **CTEs** cuando necesites dividir una consulta compleja en pasos lógicos.
- Evita subconsultas enormes dentro de `SELECT` — conviértelas en CTEs.
- Nombra las CTEs y vistas de forma descriptiva (`ventas_por_cliente`, `top_ventas`, etc.).
- Siempre prueba cada parte de una CTE por separado antes de unirlas.

## Errores comunes

| Error | Causa | Solución |
| --- | --- | --- |
| “no such view” | La vista no existe o la borraste | Usa `.tables` y `.schema` para verificar |
| Resultados vacíos en CTE | Nombre mal escrito o lógica incorrecta | Ejecuta cada CTE individualmente |
| “ambiguous column name” | Columna repetida en JOIN | Usa prefijos o alias (`c.name`, `o.total`) |
| No se actualiza la vista | Mala interpretación | Recuerda que la vista refleja la tabla original en tiempo real |