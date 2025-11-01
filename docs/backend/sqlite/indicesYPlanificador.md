# Indices y planificador de consultas

## 1. Qué es un índice en una base de datos

Un **índice** es como un **índice alfabético de un libro**:

- Sin índice: para encontrar algo tienes que **leer página por página**.
- Con índice: vas directamente a la sección donde está la información.

En SQLite:

- Un índice acelera la búsqueda, pero ocupa espacio adicional.
- Se actualiza automáticamente cuando insertas, borras o modificas datos.
- No cambia el resultado de tus consultas: **solo mejora la velocidad**.

## 2. Creación básica de índices

Supongamos que tenemos esta tabla de pedidos:

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  total REAL NOT NULL,
  created_at TEXT NOT NULL
);

```

Si hacemos una consulta frecuente como:

```sql
SELECT * FROM orders WHERE client_id = 123;

```

SQLite, sin índices, tiene que **recorrer toda la tabla** para encontrar coincidencias.

👉 Solución:

```sql
CREATE INDEX IF NOT EXISTS idx_orders_client_id
ON orders(client_id);

```

Ahora SQLite usa el índice para saltar directamente a las filas que necesita.

Puedes listar todos los índices con:

```sql
.indexes orders

```

Y verlos en el esquema:

```sql
.schema orders

```

## 3. Ver cómo SQLite ejecuta una consulta — `EXPLAIN QUERY PLAN`

La herramienta más importante para entender el rendimiento es:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE client_id = 123;

```

Sin índice, verás algo como:

```
SCAN TABLE orders

```

Esto significa que **lee toda la tabla** (table scan).

Con índice:

```
SEARCH TABLE orders USING INDEX idx_orders_client_id (client_id=?)

```

Ahora usa el índice para encontrar directamente los registros.

*Regla práctica*: si ves “SCAN TABLE” en una consulta que corre sobre una tabla grande, probablemente necesites un índice.

## 4. Cuándo crear índices (y cuándo no)

Crea un índice cuando:

- La columna aparece frecuentemente en condiciones `WHERE`.
- La columna se usa en `JOIN`.
- Se usa para ordenar (`ORDER BY`).
- Es una foreign key.

No crees un índice cuando:

- La tabla es muy pequeña (no vale la pena).
- Es una columna que cambia constantemente (actualizaciones frecuentes → sobrecarga innecesaria).
- No se usa en filtros ni joins.

**Cada índice adicional ralentiza las escrituras** un poco, porque SQLite debe mantenerlo actualizado.

Por eso se trata de **crear los necesarios, no todos**.

## 5. Índices compuestos

Un **índice compuesto** involucra más de una columna.

Esto es útil cuando tienes consultas con múltiples condiciones:

```sql
CREATE INDEX idx_orders_client_date
ON orders(client_id, created_at);

```

Si haces:

```sql
SELECT * FROM orders
WHERE client_id = 123 AND created_at > '2025-01-01';

```

SQLite usará este índice de forma eficiente.

*Importante*: el orden de las columnas en el índice **sí importa**.

Un índice `(client_id, created_at)` sirve bien para consultas con `client_id` solo o `client_id` + `created_at`,

pero **no** para `created_at` sola.

## 6. Índices únicos y parciales

### a) Índices únicos

Si quieres asegurar que una columna o combinación sea única:

```sql
CREATE UNIQUE INDEX idx_clients_email ON clients(email);

```

Esto es equivalente a `UNIQUE` en la definición de la tabla.

### b) Índices parciales (más avanzados)

Puedes crear un índice **solo para un subconjunto de filas**, por ejemplo pedidos con total alto:

```sql
CREATE INDEX idx_orders_high_value
ON orders(total)
WHERE total > 100;

```

Esto puede reducir el tamaño del índice y mejorar aún más la velocidad si la condición es frecuente.

Verifica su uso:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE total > 100;

```

## 7. Ejercicio práctico — uso real de índices

1. Crear tabla con muchos datos de ejemplo:

```sql
CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  ts TEXT NOT NULL,
  action TEXT
);

```

1. Insertar registros sintéticos (puedes usar un script o `.import` CSV).
2. Consultar sin índice:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM logs WHERE user_id = 5;

```

Debería mostrar `SCAN TABLE logs`.

1. Crear índice:

```sql
CREATE INDEX idx_logs_user_id ON logs(user_id);

```

1. Volver a consultar:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM logs WHERE user_id = 5;

```

Verás `SEARCH TABLE logs USING INDEX`.

📌 Diferencia clara cuando hay miles de filas.

## 8. Mantenimiento y buenas prácticas

- 🧼 Revisa índices innecesarios → más índices = más escritura = más espacio.
- 🧪 Usa `EXPLAIN QUERY PLAN` regularmente para entender cómo SQLite ejecuta tus consultas.
- 🛠 Usa nombres claros: `idx_<tabla>_<columna>` (o varias si es compuesto).
- 🧠 No indexes columnas con muy poca variación (ej. `sexo` o `activo=1`) — el índice no será eficiente.
- 🔑 Foreign keys deben tener índice si se usan en joins frecuentes.
- 📊 Para análisis profundos, SQLite incluye `ANALYZE` para ayudar al optimizador.

## Errores comunes

| Error / Síntoma | Causa | Solución |
| --- | --- | --- |
| Consulta lenta | Falta de índice | Crear índice en columnas filtradas |
| “SCAN TABLE” en EXPLAIN | No hay índice útil | Revisar estructura y orden |
| Escrituras más lentas | Exceso de índices | Eliminar los que no se usan |
| Índice no usado | Orden de columnas incorrecto | Reorganizar índice compuesto |

## 1. Qué es el “planificador” de consultas

Cada vez que SQLite recibe una consulta, no la ejecuta directamente.

Primero **piensa cómo ejecutarla de la manera más rápida posible**.

Para eso tiene un **planificador de consultas** (*query planner*).

Este planificador:

- Decide si usar un índice o leer toda la tabla.
- Elige el orden de los JOINs.
- Usa estadísticas internas para optimizar.

Y tú puedes inspeccionar ese plan para saber **si tu índice se está usando** o no.

## 2. EXPLAIN QUERY PLAN: tu herramienta principal

La forma más sencilla de “ver” el planificador en acción es:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE client_id = 5;

```

Ejemplo típico de salida:

```
SEARCH TABLE orders USING INDEX idx_orders_client_id (client_id=?)

```

Interpretación:

- `SEARCH TABLE ... USING INDEX` → ✅ índice usado.
- `SCAN TABLE ...` → ❌ no hay índice útil, lectura completa.

Si haces un JOIN:

```sql
EXPLAIN QUERY PLAN
SELECT c.name, o.total
FROM clients c
JOIN orders o ON c.id = o.client_id
WHERE o.total > 50;

```

Puedes ver algo como:

```
SCAN TABLE clients
SEARCH TABLE orders USING INDEX idx_orders_client_id (client_id=?)

```

Esto significa que SQLite:

1. Recorre la tabla `clients` (porque no hay filtro).
2. Busca en `orders` usando el índice.

**Consejo real**: aprende a leer estas salidas, aunque parezcan “secas”.

Una simple línea de “SCAN” suele indicar **una oportunidad de optimización**.

## 3. Comparación real: con y sin índice

Vamos a hacer un pequeño experimento práctico:

```sql
CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  ts TEXT NOT NULL,
  action TEXT
);

```

Insertamos muchos registros (ej. con un script, CSV o bucle).

Luego:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM logs WHERE user_id = 10;

```

`SCAN TABLE logs` (recorre todo).

Creamos índice:

```sql
CREATE INDEX idx_logs_user_id ON logs(user_id);

```

Repetimos:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM logs WHERE user_id = 10;

```

`SEARCH TABLE logs USING INDEX idx_logs_user_id (user_id=?)` ✅

Esto es exactamente cómo **validas que tus índices estén ayudando de verdad**.

## 4. Cómo decide SQLite si usar un índice

El planificador **no siempre usa un índice**, aunque exista.

SQLite evalúa:

- Cuántas filas espera leer con el índice.
- Si el índice evita ordenamientos adicionales.
- Si hay otros filtros más selectivos.
- Estadísticas internas de la tabla (que veremos ahora).

Ejemplo:

Si tienes un índice sobre `gender` (con solo dos valores posibles), probablemente **no lo use** porque no mejora nada.

Pero si tienes un índice sobre `email` (valores únicos), sí lo usará.

## 5. ANALYZE — dar información real al planificador

SQLite tiene una herramienta llamada `ANALYZE` que **recopila estadísticas internas** sobre tus tablas e índices.

Estas estadísticas permiten al planificador **tomar mejores decisiones**.

Ejecutar:

```sql
ANALYZE;

```

Esto:

- Calcula la distribución de valores en las columnas indexadas.
- Guarda esa info en tablas especiales internas (`sqlite_stat1`, `sqlite_stat4` si está habilitado).
- Mejora la calidad de los planes de ejecución.

Ver estadísticas:

```sql
SELECT * FROM sqlite_stat1;

```

Ejemplo de salida:

```
logs idx_logs_user_id 100000 1000

```

Esto significa que:

- `logs` tiene 100.000 filas
- `idx_logs_user_id` divide la tabla en aprox. 1000 filas por valor distinto

Con esa información, el planificador sabrá que **usar el índice es útil**.

## 6. Casos típicos de tuning con ANALYZE

### Caso 1: índice ignorado → se usa tras ANALYZE

```sql
EXPLAIN QUERY PLAN SELECT * FROM logs WHERE user_id = 10;
-- SCAN TABLE logs
ANALYZE;
EXPLAIN QUERY PLAN SELECT * FROM logs WHERE user_id = 10;
-- SEARCH TABLE logs USING INDEX idx_logs_user_id

```

### Caso 2: join con múltiples índices

Si tienes dos índices en una consulta JOIN, ANALYZE ayuda a decidir **qué tabla recorrer primero** y cuál buscar por índice.

## 7. Mantener las estadísticas actualizadas

Cada vez que tu base de datos cambia significativamente (miles de inserciones o borrados), **repite `ANALYZE`**.

También puedes limpiar estadísticas obsoletas:

```sql
DELETE FROM sqlite_stat1;
ANALYZE;

```

Esto es especialmente importante si tu aplicación crece con el tiempo.

## 8. Otras técnicas de optimización real en SQLite

- **`LIMIT` + `ORDER BY` con índice**: si ordenas por una columna indexada, SQLite puede evitar operaciones de sorting costosas.
    
    ```sql
    CREATE INDEX idx_orders_total ON orders(total);
    SELECT * FROM orders ORDER BY total DESC LIMIT 10;
    
    ```
    
    Mucho más rápido.
    
- **Evitar funciones en WHERE**:
    
    ```sql
    WHERE date(created_at) = '2025-10-09'
    
    ```
    
    Esto no usa el índice.
    
    Mejor:
    
    ```sql
    WHERE created_at >= '2025-10-09' AND created_at < '2025-10-10'
    
    ```
    
    Esto sí puede usar el índice sobre `created_at`.
    
- **Evitar comodines al inicio de LIKE**:
    
    `LIKE '%texto'` no usa índice, pero `LIKE 'texto%'` sí.
    

## 9. Ejercicio práctico — tuning real

1. Crea una tabla `ventas` con:

```sql
CREATE TABLE ventas (
  id INTEGER PRIMARY KEY,
  cliente TEXT,
  fecha TEXT,
  total REAL
);

```

1. Inserta muchos registros (por CSV o script).
2. Consulta sin índice:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM ventas WHERE cliente = 'Marta';

```

1. Crea índice:

```sql
CREATE INDEX idx_ventas_cliente ON ventas(cliente);

```

1. Repite la consulta con `EXPLAIN`:
    
    debería cambiar de SCAN a SEARCH.
    
2. Ejecuta `ANALYZE;` y vuelve a probar con filtros más complejos:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM ventas
WHERE cliente = 'Marta'
AND fecha BETWEEN '2025-01-01' AND '2025-12-31';

```

1. Observa cómo el planificador elige índices más eficientemente.

## 10. Buenas prácticas finales de optimización

- Siempre inspecciona tus consultas con `EXPLAIN QUERY PLAN`.
- Usa `ANALYZE` después de insertar muchos datos para mejorar los planes.
- Usa índices en columnas realmente selectivas y usadas en filtros/joins.
- Evita funciones en condiciones `WHERE` que impidan usar índices.
- No abuses de los índices — revisa su impacto en escrituras.

## Errores comunes

| Síntoma | Causa | Solución |
| --- | --- | --- |
| Consulta lenta aunque hay índice | Planificador no lo usa | Ejecuta `ANALYZE`, revisa selectividad |
| EXPLAIN siempre muestra SCAN | Falta índice útil o expresión no indexada | Ajusta consulta y crea índice correcto |
| Escrituras lentas | Demasiados índices | Revisa índices y elimina innecesarios |
| Estadísticas desactualizadas | Mucha inserción o borrado | Reejecuta `ANALYZE` periódicamente |