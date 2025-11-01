# Vistas materializadas y reportes

## 29.1. El problema: consultas costosas repetidas

Imagina una tabla de pedidos de una tienda online:

```sql
CREATE TABLE pedido (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT NOW()
);

```

Y supongamos que tenemos **miles o millones de registros**.

Cada vez que el dashboard de administración quiere saber:

- Ventas por día,
- Ventas por cliente,
- Promedios y totales…

…ejecuta **la misma consulta agregada** una y otra vez.

Ejemplo:

```sql
SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas
FROM pedido
GROUP BY dia
ORDER BY dia DESC;

```

Al principio es rápido… pero a medida que crece la tabla, esta consulta se vuelve **lenta**.

Y si tienes 50 usuarios viendo el dashboard, la estás ejecutando 50 veces

## 29.2. Vistas normales vs vistas materializadas

Una **vista normal** es básicamente una **consulta guardada con nombre**:

```sql
CREATE VIEW ventas_por_dia AS
SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas
FROM pedido
GROUP BY dia;

```

- Se comporta como una tabla al consultarla:

```sql
SELECT * FROM ventas_por_dia;

```

- Pero **se calcula en cada consulta**, no guarda nada.

Una **vista materializada**:

- Ejecuta la consulta **una sola vez** al crearse o refrescarse.
- Guarda el resultado como si fuera una tabla.
- Luego las lecturas son **instantáneas**, incluso con millones de filas originales.

Ejemplo:

```sql
CREATE MATERIALIZED VIEW ventas_por_dia_mv AS
SELECT DATE(fecha) AS dia, SUM(total) AS total_ventas
FROM pedido
GROUP BY dia;

```

Cuando alguien hace:

```sql
SELECT * FROM ventas_por_dia_mv;

```

No se recalcula nada.

Solo se **lee directamente** la vista precomputada.

Esto es ideal para dashboards, reportes internos, analítica básica y optimización de consultas recurrentes.

## 29.3. Refrescar vistas materializadas

Una vista materializada no se actualiza sola.

Debes refrescarla cuando quieras que muestre los datos más recientes.

Ejemplo:

```sql
REFRESH MATERIALIZED VIEW ventas_por_dia_mv;

```

Esto vuelve a ejecutar la consulta original y **reemplaza el contenido** de la vista.

Lo habitual es programar estos refrescos:

- Cada 5 minutos (si se necesita semitiempo real).
- Cada hora o día (para reportes nocturnos).
- Manualmente tras grandes importaciones.

## 29.4. Reportes agregados sencillos

Además de ventas por día, hay muchas consultas que se benefician de vistas materializadas:

- Top 10 productos más vendidos:

```sql
CREATE MATERIALIZED VIEW top_productos_mv AS
SELECT producto_id, COUNT(*) AS cantidad, SUM(total) AS total
FROM pedido
GROUP BY producto_id
ORDER BY total DESC
LIMIT 10;

```

- Total de clientes activos por mes:

```sql
CREATE MATERIALIZED VIEW clientes_activos_mes_mv AS
SELECT DATE_TRUNC('month', fecha) AS mes, COUNT(DISTINCT cliente_id) AS clientes
FROM pedido
GROUP BY mes;

```

Ahora puedes consultar estos reportes **instantáneamente**, sin recalcular millones de filas cada vez.

## 29.5. Indexar vistas materializadas

Otra ventaja: a diferencia de las vistas normales, las **vistas materializadas pueden tener índices**.

Esto mejora aún más el rendimiento.

```sql
CREATE INDEX idx_ventas_por_dia_dia ON ventas_por_dia_mv (dia);

```

Así las consultas filtradas, ordenadas o paginadas sobre la vista **son igual de rápidas que sobre una tabla bien optimizada**.

## 29.6. Automatizar refrescos programados

La mayoría de escenarios reales no refrescan manualmente las vistas.

Se usa:

- Cron jobs,
- Jobs internos del motor,
- Triggers programados,
- O herramientas de orquestación.

Ejemplo con cron (Linux):

```
0 * * * * psql -d tienda -c "REFRESH MATERIALIZED VIEW ventas_por_dia_mv;"

```

Esto refresca cada hora.

Ejemplo más controlado (PostgreSQL + función):

```sql
CREATE OR REPLACE FUNCTION refrescar_reportes()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW ventas_por_dia_mv;
  REFRESH MATERIALIZED VIEW top_productos_mv;
END;
$$ LANGUAGE plpgsql;

```

Luego puedes llamar a:

```sql
SELECT refrescar_reportes();

```

O programarlo como tarea.

## 29.7. Control de consistencia y bloqueos

Por defecto, cuando refrescas una vista materializada:

- Se borra y vuelve a generar.
- Durante ese tiempo puede bloquear lecturas.

Para evitar interrupciones, algunos motores permiten refrescar de forma **concurrente**:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY ventas_por_dia_mv;

```

Requiere índices únicos adecuados, pero permite refrescar sin bloquear a los usuarios que están consultando.

## 29.8. Vistas materializadas vs tablas de reportes manuales

Antes de que existieran vistas materializadas, muchos equipos creaban **tablas de reportes** y las llenaban con scripts cron.

Ejemplo tradicional:

```sql
CREATE TABLE ventas_por_dia_reporte (...);
DELETE FROM ventas_por_dia_reporte;
INSERT INTO ventas_por_dia_reporte (...)
SELECT ...

```

Funciona, pero:

- Necesitas más código de mantenimiento.
- Debes cuidar integridad manualmente.
- Es más fácil cometer errores.

Las vistas materializadas **reducen esta complejidad**, porque:

- Encapsulan la lógica.
- Se refrescan de forma atómica.
- No requieren scripts adicionales para leer.

## 29.9. Buenas prácticas para reportes con vistas materializadas

- Usa vistas materializadas solo para **consultas pesadas y recurrentes**.
- No las refresques en exceso si no es necesario.
- Indexa los campos más consultados.
- Documenta cuándo y cómo se refrescan.
- Usa nombres claros (`_mv`) para diferenciarlas de tablas y vistas normales.
- Automatiza su refresco en un cron o job controlado.
- Controla bloqueos si tienes muchos usuarios concurrentes.

## 29.10. Errores comunes

- Creer que una vista normal mejora rendimiento (no lo hace).
- Refrescar vistas manualmente a mano en producción.
- No indexar vistas materializadas.
- Refrescar con demasiada frecuencia → bloqueos y sobrecarga.
- No versionar la lógica de las vistas → descoordinación con el código.
- Confundir vistas materializadas con backups (no lo son).
