# Planificación conceptual de consultas

## 19.1. Qué es la planificación de consultas

Cuando lanzas una consulta SQL, el motor **no la ejecuta directamente**:

1. La analiza (parsing).
2. La optimiza: elige _cómo_ obtener los datos.
3. La ejecuta.

Este “_cómo_” es lo que se llama **plan de ejecución** (_query plan_).

Ejemplo:

```sql
SELECT * FROM cliente WHERE correo = 'ana@example.com';

```

El motor podría:

- Recorrer toda la tabla (`Seq Scan`).
- Usar un índice en `correo` (`Index Scan`).
- Combinarla con otras tablas (si hay JOIN).

Entender **cómo piensa el optimizador** te permite **escribir consultas más eficientes**, sin depender de trucos específicos de cada motor.

## 19.2. Full Table Scan vs Index Scan

| Tipo de plan          | Descripción                                  | Cuándo ocurre                                       |
| --------------------- | -------------------------------------------- | --------------------------------------------------- |
| **Full Table Scan**   | Recorre toda la tabla                        | No hay índice útil o pocos filtros selectivos       |
| **Index Scan**        | Usa un índice para ubicar filas directamente | Hay índice y el filtro es selectivo                 |
| **Bitmap Index Scan** | Combina varios índices para filtrar          | Filtros múltiples y no hay índice compuesto directo |

Ejemplo real:

```sql
EXPLAIN
SELECT * FROM cliente WHERE correo = 'ana@example.com';

```

Resultado posible:

```
Index Scan using idx_cliente_correo on cliente ...

```

→ El motor eligió el índice porque **filtra bien**.

## 19.3. Cardinalidad y selectividad: el núcleo de la decisión

**Cardinalidad:** número de filas esperadas en el resultado.

**Selectividad:** proporción de filas que pasan el filtro.

Si la consulta devuelve el 0.001 % de las filas, usar un índice es claramente mejor.

Si devuelve el 80 %… un full scan puede ser más barato que hacer millones de “saltos de índice”.

Regla práctica:

- Alta selectividad → índice.
- Baja selectividad → full scan suele ser más eficiente.

Ejemplo:

```sql
SELECT * FROM pedido WHERE estado = 'pendiente';

```

Si solo 5 % de los pedidos están pendientes → índice es útil.

Si el 95 % están pendientes → probablemente no lo usará.

## 19.4. Costos estimados y reales

Los optimizadores usan un **modelo de costos**:

- Lecturas de disco,
- Saltos de índice,
- Combinaciones de tablas,
- Coste estimado de filtrado.

Ejemplo:

```sql
EXPLAIN ANALYZE
SELECT * FROM pedido WHERE estado = 'pendiente';

```

Salida típica:

```
Seq Scan on pedido  (cost=0.00..1023.00 rows=500 width=32)

```

“cost” = estimación

“rows” = cuántas filas cree que saldrán

Si la estimación está mal, el plan puede no ser el mejor.

## 19.5. Cómo influir en el plan sin “forzar” nada

- **Diseñando bien índices** (M17–M18).
- **Usando filtros claros y específicos**.
- **Evitando funciones innecesarias sobre columnas indexadas**.
- **Usando tipos correctos** (buscar `fecha` en un campo `DATE` y no en texto).

Ejemplo malo:

```sql
WHERE LOWER(correo) = 'ana@example.com'

```

El índice no se usa si fue creado sobre `correo` sin LOWER.

Mejor:

- Crear un índice funcional sobre `LOWER(correo)` si es necesario.
- O guardar el correo normalizado.

## 19.6. Planificación en consultas con JOIN

Cuando haces joins, el optimizador debe decidir:

- **En qué orden** unir las tablas.
- **Qué algoritmo usar** (nested loop, merge join, hash join…).

Ejemplo:

```sql
SELECT *
FROM pedido p
JOIN cliente c ON p.id_cliente = c.id_cliente
WHERE c.correo = 'ana@example.com';

```

Orden lógico:

1. Buscar cliente por correo (usa índice en `cliente.correo`).
2. Buscar sus pedidos (usa índice en `pedido.id_cliente`).
3. Devolver resultados.

Si no hay índices → escanea ambas tablas, genera un producto cartesiano parcial y luego filtra.

Coste altísimo.

## 19.7. Tipos comunes de join y cuándo se eligen

| Tipo de join    | Cómo funciona                                                               | Cuándo se usa normalmente           |
| --------------- | --------------------------------------------------------------------------- | ----------------------------------- |
| **Nested Loop** | Repite sobre cada fila de una tabla y busca en la otra (rápido con índices) | 1-a-N con índices                   |
| **Merge Join**  | Combina dos flujos ordenados                                                | Tablas ordenadas, consultas grandes |
| **Hash Join**   | Construye tabla hash y compara                                              | Filtros amplios, sin índice         |

Tú no eliges directamente el algoritmo: **el optimizador lo hace según el costo estimado**.

Pero puedes _influir_ en su decisión **dando buena información** (índices, estadísticas actualizadas, filtros claros).

## 19.8. Ordenación y planificación

Cuando haces:

```sql
SELECT * FROM pedido ORDER BY fecha;

```

→ Si tienes índice en `fecha`, el motor puede devolver filas **ya ordenadas**.

→ Si no, debe ordenar en memoria o en disco (coste extra).

**La presencia de un índice adecuado puede cambiar totalmente el plan**.

## 19.9. Agrupaciones (`GROUP BY`) y planificación

Los índices también ayudan en `GROUP BY` y agregaciones:

```sql
SELECT estado, COUNT(*) FROM pedido GROUP BY estado;

```

Si hay un índice en `estado`, el motor:

- Puede recorrer filas ya agrupadas lógicamente,
- Reduciendo operaciones de agrupación.

Si no, tendrá que escanear toda la tabla y agrupar desde cero.

También influye si hay pocas categorías (`estado`) o muchas.

## 19.10. Subconsultas vs joins: impacto en el plan

Dos consultas que devuelven lo mismo pueden generar **planes muy diferentes**:

Subconsulta:

```sql
SELECT * FROM pedido
WHERE id_cliente IN (SELECT id_cliente FROM cliente WHERE ciudad = 'Madrid');

```

Join equivalente:

```sql
SELECT p.*
FROM pedido p
JOIN cliente c ON p.id_cliente = c.id_cliente
WHERE c.ciudad = 'Madrid';

```

Muchas veces el join produce **un plan más eficiente**, porque permite:

- Optimizar el orden de acceso,
- Reutilizar índices,
- Evitar subconsultas repetitivas.

_(aunque esto depende del motor — lo importante es razonar sobre el plan resultante)._

## 19.11. Paginación y planificación

Paginaciones grandes con `OFFSET` generan planes costosos:

```sql
SELECT * FROM pedido ORDER BY fecha LIMIT 10 OFFSET 50000;

```

Aunque haya índice, el motor debe **recorrer las 50.000 filas anteriores**.

El plan puede volverse muy caro.

Patrón recomendado:

- Paginación por cursor o marcador (como ya vimos en M18),
- Reutilizar índices ordenados.

## 19.12. Estadísticas actualizadas = planes más inteligentes

El optimizador se basa en **estadísticas internas** (número de filas, distribución de valores).

Si están desactualizadas:

- Hará malas estimaciones,
- Elegirá planes subóptimos,
- Consultas lentas aunque haya índices.

Solución:

```sql
VACUUM ANALYZE;  -- PostgreSQL
ANALYZE TABLE pedido;  -- MySQL

```

Siempre analiza tablas **después de cargas grandes o cambios estructurales**.

## 19.13. Buenas prácticas de planificación conceptual

- Diseña tus consultas pensando en **selectividad**, no en “lo que suena bien”.
- Usa índices alineados con los patrones reales de acceso.
- Evita funciones que rompan el uso de índices.
- Mantén estadísticas actualizadas.
- Usa `EXPLAIN` y `EXPLAIN ANALYZE` para entender qué está pasando.
- Prefiere joins bien diseñados a subconsultas innecesarias.
- Ajusta consultas para evitar recorrer más filas de las necesarias.

## 19.14. Errores comunes

- Pensar que “si hay índice, siempre se usará”.
- No revisar los planes de ejecución y confiar ciegamente.
- Escribir consultas que obligan a la base a hacer full scans innecesarios.
- Usar funciones o casting sobre columnas indexadas.
- No actualizar estadísticas.
- Hacer paginaciones masivas con OFFSET sin pensar en el costo.
