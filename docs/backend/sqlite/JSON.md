# JSON y estructuras dinámicas

## 1. ¿Por qué usar JSON en SQLite?

SQLite es una base relacional, pero hay casos donde los datos:

- Tienen estructura variable,
- No justifican crear tablas adicionales,
- Necesitan almacenarse de forma compacta.

Ejemplo:

- Un perfil de usuario con configuraciones personalizadas.
- Etiquetas o arrays de valores dinámicos.
- Logs o respuestas de APIs con estructura flexible.

Con JSON1, puedes:

- **Guardar JSON como texto** (en una columna `TEXT`),
- **Consultar valores dentro del JSON** como si fueran columnas,
- **Actualizar valores internos** sin reescribir todo,
- **Indexar** campos específicos para rendimiento.

## 2. Creando una tabla con JSON

Ejemplo sencillo:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  metadata TEXT CHECK (json_valid(metadata))
);

```

Aquí `metadata` es un `TEXT` que debe contener **JSON válido** gracias a `json_valid()`.

Insertar un usuario con metadatos:

```sql
INSERT INTO users (name, metadata)
VALUES ('Ana', '{"theme":"dark","notifications":true,"roles":["admin","editor"]}');

```

Puedes usar cualquier estructura JSON válida (objetos, arrays, booleanos, etc.).

## 3. Consultar valores dentro de JSON — `json_extract`

Para obtener valores internos de la columna JSON:

```sql
SELECT
  name,
  json_extract(metadata, '$.theme') AS theme,
  json_extract(metadata, '$.roles[0]') AS first_role
FROM users;

```

Notas:

- `$.theme` → accede a la clave `theme` dentro del objeto.
- `$.roles[0]` → accede al primer elemento del array `roles`.
- Si la clave no existe → devuelve `NULL`.

Resultado:

```
name | theme | first_role
-------------------------
Ana  | dark  | admin

```

## 4. Filtrar por campos dentro de JSON

Puedes usar `json_extract` en el `WHERE` como si fuera una columna:

```sql
SELECT *
FROM users
WHERE json_extract(metadata, '$.notifications') = 1;

```

Esto selecciona todos los usuarios que tengan `"notifications": true`.

También funciona con arrays:

```sql
SELECT *
FROM users
WHERE json_extract(metadata, '$.roles[0]') = 'admin';

```

Aunque funciona, si tienes muchos registros puede ser **lento sin índice**… más adelante veremos cómo optimizar esto.

## 5. Actualizar valores dentro de JSON — `json_set`

SQLite permite **actualizar partes específicas** de un JSON sin reescribir todo el objeto:

```sql
UPDATE users
SET metadata = json_set(metadata, '$.theme', 'light')
WHERE id = 1;

```

Ahora el campo `"theme"` cambiará de `"dark"` a `"light"`.

También puedes agregar nuevas claves:

```sql
UPDATE users
SET metadata = json_set(metadata, '$.language', 'es-ES')
WHERE id = 1;

```

`json_set` devuelve un nuevo JSON con el cambio aplicado.

## 6. Otras funciones útiles de JSON1

- `json_valid(expr)` → devuelve 1 si el texto es JSON válido.
- `json_array_length(json, path)` → cuenta elementos en un array.
- `json_object(key, value, ...)` → construye un objeto JSON desde cero.
- `json_array(value1, value2, ...)` → construye un array.
- `json_remove(json, path)` → elimina una clave del objeto.

Ejemplo:

```sql
SELECT json_array('a','b','c');
-- ["a","b","c"]

SELECT json_object('nombre','Oscar','edad',34);
-- {"nombre":"Oscar","edad":34}

UPDATE users
SET metadata = json_remove(metadata, '$.roles[0]')
WHERE id = 1;

```

## 7. Ejercicio práctico — estructura dinámica de usuario

1. Crear tabla:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  metadata TEXT CHECK (json_valid(metadata))
);

```

1. Insertar varios usuarios:

```sql
INSERT INTO users (name, metadata) VALUES
('Ana', '{"theme":"dark","notifications":true,"roles":["admin","editor"]}'),
('Luis', '{"theme":"light","notifications":false,"roles":["viewer"]}'),
('Marta', '{"theme":"dark","notifications":true,"roles":["editor"]}');

```

1. Consultar:

```sql
SELECT name, json_extract(metadata, '$.theme') AS theme FROM users;

```

1. Filtrar por `notifications = true`:

```sql
SELECT name FROM users
WHERE json_extract(metadata, '$.notifications') = 1;

```

1. Actualizar un valor:

```sql
UPDATE users
SET metadata = json_set(metadata, '$.theme', 'light')
WHERE name = 'Ana';

```

1. Agregar un nuevo campo:

```sql
UPDATE users
SET metadata = json_set(metadata, '$.last_login', datetime('now'))
WHERE name = 'Luis';

```

Resultado: tienes una estructura flexible **sin tener que modificar el esquema de la tabla**.

## 8. Cuándo usar JSON y cuándo no

Usar JSON en SQLite **no significa olvidar el diseño relacional**.

Úsalo cuando:

- La estructura es opcional o variable (ej. preferencias de usuario).
- No necesitas hacer JOINs complejos sobre esos datos.
- Buscas flexibilidad sin cambiar el esquema cada dos días.

Evítalo cuando:

- Los datos son relacionales y se consultan con frecuencia.
- Necesitas indexar y filtrar mucho sobre campos internos.
- La estructura JSON termina pareciendo una tabla dentro de otra (antipatrón).

En esos casos, es mejor **crear tablas normales** y usar relaciones (`JOIN`).

## 9. Errores comunes con JSON1

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| `json_extract` devuelve NULL | Ruta mal escrita o clave inexistente | Verifica el path (`$.clave`) |
| Consultas lentas con muchos registros | No hay índice en campos JSON | Crear índice sobre columna generada |
| Datos corruptos en `metadata` | JSON mal formado | Usar `CHECK (json_valid())` |
| Actualizaciones destructivas | Reemplazar todo el JSON manualmente | Usar `json_set` y `json_remove` |

## 10. Buenas prácticas con JSON1

- Valida siempre el JSON con `CHECK (json_valid(columna))`.
- Usa rutas bien escritas (`$.clave` o `$.array[0]`).
- Guarda solo lo que realmente es dinámico, no todo.
- Usa `json_set` para cambios puntuales.
- No abuses de JSON si podrías usar una tabla tradicional.
- Si manejas datos sensibles, considera cifrar esta columna también (ver módulo 6).

## 1. Qué es una columna generada

Una **columna generada** es una columna cuyo valor **no se guarda directamente**, sino que **se calcula a partir de otras** cada vez que se inserta o actualiza una fila.

Ejemplo simple:

```sql
CREATE TABLE ejemplo (
  data TEXT,
  valor TEXT GENERATED ALWAYS AS (json_extract(data, '$.clave')) STORED
);

```

- `valor` no se escribe manualmente.
- Se calcula automáticamente leyendo el JSON de `data`.
- Se puede **indexar** igual que cualquier otra columna.

Así SQLite no necesita parsear el JSON en cada consulta.

## 2. Columna generada con índice sobre campo JSON

Supongamos que tenemos la tabla `users` con un campo `metadata`:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  metadata TEXT CHECK (json_valid(metadata)),
  notifications BOOLEAN GENERATED ALWAYS AS (json_extract(metadata, '$.notifications')) STORED
);

```

 Explicación:

- `metadata` → contiene el JSON original.
- `notifications` → columna generada que extrae el valor del JSON.
- `STORED` → significa que el valor se guarda físicamente (más rápido que `VIRTUAL`).

Ahora podemos **indexar** esta columna:

```sql
CREATE INDEX idx_users_notifications ON users(notifications);

```

Y la consulta:

```sql
SELECT name FROM users WHERE notifications = 1;

```

Ya no evalúa el JSON fila por fila, **usa el índice directamente**.

Puedes comprobarlo:

```sql
EXPLAIN QUERY PLAN
SELECT name FROM users WHERE notifications = 1;

```

Verás algo como:

```
SEARCH TABLE users USING INDEX idx_users_notifications (notifications=?)

```

Esto puede multiplicar por 10 o más el rendimiento en tablas grandes.

## 3. Columna generada para valores en arrays JSON

También puedes indexar campos de arrays si tienes rutas deterministas:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  metadata TEXT CHECK (json_valid(metadata)),
  first_role TEXT GENERATED ALWAYS AS (json_extract(metadata, '$.roles[0]')) STORED
);
CREATE INDEX idx_users_first_role ON users(first_role);

```

Ahora consultas como:

```sql
SELECT * FROM users WHERE first_role = 'admin';

```

Usarán índice sin parsear todo el JSON.

## 4. Comparativa de rendimiento

Supón que tienes 100.000 usuarios con metadatos como:

```json
{"theme":"dark","notifications":true,"roles":["admin"]}

```

### Sin índice:

```sql
SELECT * FROM users WHERE json_extract(metadata, '$.notifications') = 1;

```

- SQLite debe leer todo el JSON.
- Muy lento en tablas grandes.

### Con columna generada + índice:

```sql
SELECT * FROM users WHERE notifications = 1;

```

- SQLite usa índice directamente.
- Consulta rápida incluso con miles de filas.

Siempre que filtres repetidamente por un campo JSON, **conviene indexarlo**.

## 5. Ejercicio práctico — indexar un campo JSON

1. Crear tabla:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  metadata TEXT CHECK (json_valid(metadata)),
  theme TEXT GENERATED ALWAYS AS (json_extract(metadata, '$.theme')) STORED
);

```

1. Insertar datos:

```sql
INSERT INTO users (name, metadata) VALUES
('Ana', '{"theme":"dark","notifications":true}'),
('Luis', '{"theme":"light","notifications":false}'),
('Marta', '{"theme":"dark","notifications":true}');

```

1. Crear índice:

```sql
CREATE INDEX idx_users_theme ON users(theme);

```

1. Consultar con índice:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM users WHERE theme = 'dark';

```

Verás que ahora usa `SEARCH TABLE ... USING INDEX`.

1. Ejecutar la misma consulta sin índice (elimina el índice y repite).
    
    Verás `SCAN TABLE` → mucho menos eficiente.
    

## 6. Cuando no usar columnas generadas

Aunque son muy potentes, **no siempre debes indexar todos los campos JSON**:

Evítalo si:

- El campo casi nunca se usa en filtros.
- Tiene pocos valores distintos (ej. booleano con 50/50).
- Cambia muy frecuentemente (porque actualizar índices cuesta tiempo).
- Es un JSON demasiado variable (diferentes estructuras por fila).

**Crea índices solo sobre campos realmente importantes para tus consultas.**

## 7. Columnas virtuales vs almacenadas (`VIRTUAL` vs `STORED`)

SQLite permite dos tipos de columnas generadas:

- `VIRTUAL` → no guarda el valor, lo calcula cada vez.
    - Ocupa menos espacio.
    - Más lenta si se consulta muchas veces.
    - No siempre se puede indexar.
- `STORED` → guarda el valor calculado.
    - Ocupa más espacio.
    - Mucho más rápida en consultas repetidas.
    - Se puede indexar perfectamente.

En la práctica:

- Para filtros frecuentes → usa `STORED` + índice.
- Para casos raros → `VIRTUAL` sin índice puede bastar.

## 8. Combinando JSON + JOIN

También puedes usar columnas generadas sobre JSON **y** combinarlas con otras tablas.

Por ejemplo:

```sql
SELECT u.name, p.name AS product
FROM users u
JOIN orders o ON u.id = o.client_id
JOIN products p ON o.product_id = p.id
WHERE u.theme = 'dark';

```

Aquí `u.theme` viene de un campo JSON, pero **gracias al índice**, el filtro se hace antes del JOIN, lo que mejora mucho el rendimiento.

## 9. Buenas prácticas con JSON + índices

- Si filtras frecuentemente por un valor de JSON → crea **una columna generada STORED + índice**.
- Usa `EXPLAIN QUERY PLAN` para verificar que SQLite **realmente está usando** el índice.
- No indexes campos JSON que no aportan valor en consultas.
- Prefiere índices sobre valores simples (TEXT, INTEGER) extraídos del JSON.
- Mantén tus rutas JSON consistentes (`$.campo` siempre igual).

## 10. Errores comunes al indexar JSON

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| `SCAN TABLE` pese a índice | La consulta usa `json_extract` en lugar de la columna generada | Cambia a usar la columna generada |
| Índice no se usa | Ruta mal escrita o tipo no coincide | Verifica ruta y tipo de dato |
| Consultas lentas | Índices innecesarios o mala estrategia | Revisa índices y `EXPLAIN` |
| Columna generada no se actualiza | No usaste `STORED` | Cambia a STORED si necesitas persistencia |
| Error de creación de índice | Columna no indexable (ej. VIRTUAL) | Usa STORED en su lugar |