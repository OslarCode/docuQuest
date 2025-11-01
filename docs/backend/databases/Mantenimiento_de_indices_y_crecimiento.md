# Mantenimiento de índices y crecimiento

## 31.1. Por qué mantener los índices

Cuando insertas, actualizas y borras registros de una tabla a lo largo de meses o años:

- Las páginas de índices se llenan de huecos,
- Las rutas de acceso se vuelven menos eficientes,
- Y el optimizador de consultas **deja de elegir los mejores planes**.

El rendimiento no se degrada de golpe: baja lentamente hasta que un día las consultas que antes tardaban 50 ms… tardan 5 segundos 😬.

Por eso es importante tener **mantenimiento planificado**, no reactivo.

## 31.2. Fragmentación de índices — concepto básico

Los índices (por ejemplo, B-Tree en la mayoría de motores) están organizados en **páginas**.

Con el tiempo:

- Borrados → dejan huecos,
- Actualizaciones → reordenan nodos,
- Inserts desordenados → aumentan profundidad.

Ejemplo:

- Día 1: índice limpio → consultas rápidas.
- Día 200: muchos deletes/inserts → árbol con huecos → más saltos → consultas lentas.

Un índice fragmentado **no se ve a simple vista**, pero afecta directamente al rendimiento.

## 31.3. Cómo detectar fragmentación

La mayoría de motores tienen vistas internas o herramientas de diagnóstico.

Ejemplo (PostgreSQL):

```sql
SELECT
  relname AS tabla,
  indexrelname AS indice,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS tamano
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

```

Esto permite ver:

- Cuántas veces se usa cada índice,
- Su tamaño real en disco,
- Cuáles podrían necesitar mantenimiento.

También puedes consultar la **tasa de bloat (fragmentación)** con extensiones como `pgstattuple`:

```sql
SELECT * FROM pgstattuple('mi_indice');

```

Índices grandes + poco uso → candidatos a limpiar o eliminar.

Índices muy usados + mucho bloat → candidatos a reindexar.

## 31.4. Reindexación

Cuando un índice está fragmentado, la solución más directa es **reconstruirlo**.

```sql
REINDEX INDEX mi_indice;

```

o para toda la tabla:

```sql
REINDEX TABLE productos;

```

Esto:

- Reorganiza internamente el índice,
- Libera espacio,
- Mejora tiempos de búsqueda.

Lo ideal es hacerlo en horarios de baja carga.

Algunos motores permiten reindexar concurrentemente para no bloquear.

## 31.5. VACUUM y limpieza periódica

En motores como PostgreSQL, además de reindexar, hay que **limpiar espacio muerto** con `VACUUM`.

```sql
VACUUM ANALYZE productos;

```

- `VACUUM` → limpia tuplas borradas y libera espacio interno.
- `ANALYZE` → actualiza estadísticas del planificador de consultas.

Esto no borra datos reales ni afecta a usuarios.

Pero **mejora el rendimiento silenciosamente**.

También existe `AUTOVACUUM`, que se ejecuta automáticamente,

pero en sistemas grandes conviene reforzarlo con tareas programadas controladas.

## 31.6. Estadísticas actualizadas = buenos planes de consulta

Los optimizadores de bases relacionales **deciden cómo ejecutar consultas** en base a:

- Número estimado de filas,
- Distribución de valores,
- Cardinalidad de columnas.

Si las estadísticas están desactualizadas:

- El motor **elige malos índices**,
- Hace joins ineficientes,
- Ejecuta planes más lentos.

Ejemplo:

```sql
ANALYZE productos;

```

Esto fuerza la actualización de estadísticas de esa tabla.

Muchas veces, un simple `ANALYZE` puede mejorar tiempos de consulta sin tocar nada más.

**Buenas estadísticas = menos sorpresas en producción.**

## 31.7. El housekeeping periódico

“Housekeeping” = **mantenimiento programado recurrente** que mantiene la base sana sin intervención manual.

En la práctica se compone de:

- Limpieza (VACUUM o equivalente).
- Actualización de estadísticas (ANALYZE).
- Reindexación selectiva.
- Rotación de logs y auditorías.
- Limpieza de datos temporales.

Ejemplo cron (PostgreSQL):

```
0 3 * * * psql -d tienda -c "VACUUM ANALYZE;"
0 4 * * 0 psql -d tienda -c "REINDEX DATABASE tienda;"

```

Esto mantiene la base optimizada sin que los usuarios lo noten.

## 31.8. Supervisar crecimiento

Además de limpiar, debes **vigilar el crecimiento** de tablas e índices.

Ejemplo de consulta para tamaños:

```sql
SELECT
  relname AS objeto,
  pg_size_pretty(pg_total_relation_size(relid)) AS tamano_total,
  pg_size_pretty(pg_relation_size(relid)) AS tamano_tabla,
  pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS tamano_indices
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

```

Esto te permite identificar:

- Tablas que crecen más de lo previsto,
- Índices desproporcionados,
- Necesidad de archivar datos antiguos.

Un crecimiento descontrolado puede saturar el disco incluso si las consultas están bien optimizadas.

## 31.9. Archivar datos antiguos en lugar de borrarlos “a saco”

Muchas empresas no necesitan **consultar datos viejos constantemente**, pero sí conservarlos.

Solución práctica:

- Mover datos antiguos a tablas de archivo.
- Borrarlos de las tablas activas.
- Mantener índices más pequeños y eficientes.

Ejemplo:

```sql
INSERT INTO pedido_archivo SELECT * FROM pedido WHERE fecha < NOW() - INTERVAL '1 year';
DELETE FROM pedido WHERE fecha < NOW() - INTERVAL '1 year';
VACUUM ANALYZE pedido;

```

Así las tablas activas se mantienen ligeras y rápidas.

## 31.10. Buenas prácticas de mantenimiento de índices

- **No reindexes todo a lo loco.** Prioriza índices grandes y usados.
- Programa mantenimiento en **ventanas de baja carga**.
- Usa `AUTOVACUUM` pero complementa con limpiezas programadas.
- Mantén estadísticas frescas.
- Supervisa crecimiento de tablas e índices.
- Considera archivar datos antiguos en lugar de borrarlos sin más.
- Documenta qué tareas de housekeeping se ejecutan y cuándo.

## 31.11. Errores comunes

- Olvidarse de los índices después de crearlos.
- Depender exclusivamente de autovacuum sin supervisión.
- No medir ni monitorear crecimiento → problemas tardíos.
- Reindexar indiscriminadamente sin priorizar.
- Dejar estadísticas desactualizadas → planes de ejecución pésimos.
- No archivar datos → tablas gigantes que ralentizan todo.
