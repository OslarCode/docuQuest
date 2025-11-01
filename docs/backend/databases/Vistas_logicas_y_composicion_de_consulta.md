# Modulo 11. Vistas lógicas y composición de consultas complejas

## 🧭 11.1. El problema de las consultas “monstruo”

En sistemas reales, no es raro ver consultas así 👇

```sql
SELECT c.nombre AS cliente,
       SUM(pp.cantidad * p.precio) AS total_gastado,
       COUNT(DISTINCT pp.id_pedido) AS total_pedidos,
       MIN(pp.fecha) AS primer_pedido,
       MAX(pp.fecha) AS ultimo_pedido
FROM cliente c
JOIN pedido pp ON c.id_cliente = pp.id_cliente
JOIN pedido_producto pdp ON pp.id_pedido = pdp.id_pedido
JOIN producto p ON pdp.id_producto = p.id_producto
WHERE c.activo = TRUE
  AND pp.fecha BETWEEN '2025-01-01' AND '2025-12-31'
GROUP BY c.nombre
HAVING SUM(pp.total) > 1000
ORDER BY total_gastado DESC;

```

👉 Es funcional, sí.

Pero:

- Es difícil de leer,
- Complicada de mantener,
- Y si la quieres reutilizar con ligeras variaciones… se vuelve un infierno.

La solución: **composición de consultas**.

## 🧱 11.2. Composición de consultas — la idea base

La idea es simple pero poderosa:

> “Divide una consulta compleja en bloques lógicos reutilizables.”
> 

Y puedes hacerlo de **dos maneras principales**:

1. 🧾 **Subconsultas / Common Table Expressions (CTE)** — composición temporal dentro de la misma query.
2. 🧰 **Vistas (VIEW)** — composición persistente, reutilizable en varias consultas.

## 🔸 11.3. Subconsultas — anidar resultados intermedios

📌 Caso: queremos saber cuánto gastó cada cliente, pero la parte de calcular el total de cada pedido es repetitiva.

En lugar de:

```sql
SELECT c.nombre, SUM(pdp.cantidad * p.precio) AS total_gastado
FROM cliente c
JOIN pedido pp ON c.id_cliente = pp.id_cliente
JOIN pedido_producto pdp ON pp.id_pedido = pdp.id_pedido
JOIN producto p ON pdp.id_producto = p.id_producto
GROUP BY c.nombre;

```

Podemos **extraer primero** el total de cada pedido en una subconsulta:

```sql
SELECT c.nombre, SUM(p.total_pedido) AS total_gastado
FROM cliente c
JOIN (
    SELECT pp.id_pedido, pp.id_cliente, SUM(pdp.cantidad * p.precio) AS total_pedido
    FROM pedido pp
    JOIN pedido_producto pdp ON pp.id_pedido = pdp.id_pedido
    JOIN producto p ON pdp.id_producto = p.id_producto
    GROUP BY pp.id_pedido, pp.id_cliente
) p ON c.id_cliente = p.id_cliente
GROUP BY c.nombre;

```

👉 Ventajas:

- Separamos responsabilidades: primero calculamos totales por pedido, luego totales por cliente.
- Más legible y mantenible.
- Reutilizable con ligeros cambios.

## 🟡 11.4. CTE — Common Table Expressions (WITH)

Las **CTE** son como subconsultas, pero:

- Se escriben arriba con `WITH`,
- Pueden reutilizarse dentro de la misma consulta,
- Mejoran mucho la claridad.

Ejemplo equivalente usando CTE:

```sql
WITH totales_por_pedido AS (
    SELECT pp.id_pedido,
           pp.id_cliente,
           SUM(pdp.cantidad * p.precio) AS total_pedido
    FROM pedido pp
    JOIN pedido_producto pdp ON pp.id_pedido = pdp.id_pedido
    JOIN producto p ON pdp.id_producto = p.id_producto
    GROUP BY pp.id_pedido, pp.id_cliente
)
SELECT c.nombre, SUM(tp.total_pedido) AS total_gastado
FROM cliente c
JOIN totales_por_pedido tp
  ON c.id_cliente = tp.id_cliente
GROUP BY c.nombre;

```

📌 Ventajas sobre subconsultas:

- Legibilidad clara, estructura en bloques.
- Reutilizable dentro de la misma consulta.
- Fácil de debuggear (puedes ejecutar cada CTE por separado).

👉 Las CTE **no almacenan datos**, son temporales y existen solo durante esa consulta.

## 🧰 11.5. Vistas — encapsulación persistente

Cuando una consulta es **reutilizada frecuentemente**, no necesitas repetirla en cada lugar.

👉 La solución: **crear una vista**.

```sql
CREATE VIEW totales_por_pedido AS
SELECT pp.id_pedido,
       pp.id_cliente,
       SUM(pdp.cantidad * p.precio) AS total_pedido
FROM pedido pp
JOIN pedido_producto pdp ON pp.id_pedido = pdp.id_pedido
JOIN producto p ON pdp.id_producto = p.id_producto
GROUP BY pp.id_pedido, pp.id_cliente;

```

Ahora puedes hacer:

```sql
SELECT c.nombre, SUM(tp.total_pedido) AS total_gastado
FROM cliente c
JOIN totales_por_pedido tp ON c.id_cliente = tp.id_cliente
GROUP BY c.nombre;

```

👉 Esto mejora la mantenibilidad brutalmente:

- Si cambian reglas de cálculo, actualizas **una vista**, no todas las consultas.
- La vista **puede tener permisos** diferentes a la tabla original.
- Se puede usar en múltiples queries, reportes y aplicaciones.

## 🧠 11.6. Vistas vs CTE — cuándo usar cada una

| CTE (WITH) | Vista (VIEW) |
| --- | --- |
| Temporal, vive solo durante la consulta | Persistente en el esquema |
| Ideal para consultas grandes puntuales | Ideal para lógica de negocio reutilizable |
| Muy buena para debug y lectura | Muy buena para simplificar código repetido |
| No afecta al esquema ni requiere permisos extra | Necesita CREATE VIEW (y permisos) |
| Útil en ETL, transformaciones, reportes puntuales | Útil en reporting, BI, APIs, dashboards |

👉 En muchos proyectos, **empiezas con una CTE** y si la usas varias veces, **la conviertes en vista**.

## 🧱 11.7. Vistas encadenadas — composición jerárquica

También puedes **construir vistas sobre otras vistas**.

Ejemplo:

```sql
CREATE VIEW totales_por_cliente AS
SELECT c.id_cliente, SUM(tp.total_pedido) AS total_gastado
FROM cliente c
JOIN totales_por_pedido tp ON c.id_cliente = tp.id_cliente
GROUP BY c.id_cliente;

```

Y luego:

```sql
CREATE VIEW clientes_vip AS
SELECT id_cliente, total_gastado
FROM totales_por_cliente
WHERE total_gastado > 1000;

```

👉 Con esto puedes construir un **modelo de datos en capas**:

- Vistas base: limpian y transforman datos.
- Vistas intermedias: agregan lógica de negocio.
- Vistas finales: entregan datos listos para consumir (BI, API, front).

Este patrón es muy usado en **data warehouses** y **modelos de negocio bien estructurados**.

## 🧮 11.8. Ejemplo práctico — Sistema de biblioteca

Tablas:

- `prestamo(id_prestamo, id_socio, id_libro, fecha_inicio, estado)`
- `socio(id_socio, nombre)`
- `libro(id_libro, titulo)`

📌 Vista base: préstamos activos

```sql
CREATE VIEW prestamos_activos AS
SELECT p.id_prestamo, p.id_socio, p.id_libro, p.fecha_inicio
FROM prestamo p
WHERE p.estado = 'activo';

```

📌 Vista intermedia: préstamos activos con datos enriquecidos

```sql
CREATE VIEW prestamos_detalle AS
SELECT pa.id_prestamo, s.nombre AS socio, l.titulo, pa.fecha_inicio
FROM prestamos_activos pa
JOIN socio s ON pa.id_socio = s.id_socio
JOIN libro l ON pa.id_libro = l.id_libro;

```

📌 Vista final: conteo de préstamos por socio

```sql
CREATE VIEW prestamos_por_socio AS
SELECT socio, COUNT(*) AS prestamos_activos
FROM prestamos_detalle
GROUP BY socio;

```

Ahora puedes:

```sql
SELECT * FROM prestamos_por_socio;

```

📌 Resultado:

| socio | prestamos_activos |
| --- | --- |
| Ana | 3 |
| Luis | 1 |

👉 Tres vistas, tres niveles de responsabilidad, una consulta final **limpia y rápida**.

## ⚠️ 11.9. Buenas prácticas con vistas y CTE

- Crea vistas **con un propósito claro**, no para “todo”.
- Nombra las vistas con **semántica de negocio**, no técnica (`ventas_por_mes`, no `v123`).
- No abuses de vistas anidadas si no aportan claridad.
- Documenta la **dependencia entre vistas**.
- Usa CTE para operaciones complejas puntuales y vistas para reglas de negocio estables.
- Mide el rendimiento: demasiadas vistas encadenadas pueden volverse lentas si no están bien diseñadas.

## 🚨 Errores comunes

- Repetir lógica en múltiples queries en vez de crear una vista.
- Vistas sin filtros → consultas más lentas de lo necesario.
- Encadenar vistas sin control → consultas difíciles de depurar.
- No documentar cambios en las vistas → reportes inconsistentes.
- Usar vistas como sustituto de un buen modelo base.