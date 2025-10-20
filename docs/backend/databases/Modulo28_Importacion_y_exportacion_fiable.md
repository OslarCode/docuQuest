# Modulo 28. Importación y exportación fiable

## 🧭 28.1. CSV y JSON: los formatos más comunes

Cuando hablamos de integración de datos, estos son los formatos que más aparecen:

| Formato | Características principales | Uso típico |
| --- | --- | --- |
| **CSV** | Ligero, fácil de leer, ampliamente soportado | Importar/exportar listados (productos, usuarios…) |
| **JSON** | Estructurado, jerárquico, admite anidación | APIs, integraciones complejas, catálogos con relaciones |

📌 En ambos casos, la clave no es solo mover datos… sino **validarlos y cargarlos correctamente** sin romper la integridad de la base.

## 🧠 28.2. Importación básica desde CSV

Ejemplo: supongamos que tenemos esta tabla:

```sql
CREATE TABLE producto (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio NUMERIC(10,2) NOT NULL,
  categoria TEXT
);

```

Y un archivo `productos.csv`:

```
nombre,precio,categoria
Teclado,59.90,Electrónica
Camiseta,19.99,Ropa
Libro,15.50,Libros

```

Importación básica con SQL:

```sql
COPY producto (nombre, precio, categoria)
FROM '/ruta/a/productos.csv'
DELIMITER ','
CSV HEADER;

```

👉 Esto carga las tres filas directamente en la tabla.

📌 Esto funciona muy bien… **si** el CSV está limpio.

Pero en la práctica, hay que validar antes de confiar.

## 🧭 28.3. Validar antes de insertar

Errores comunes en archivos reales:

- Filas vacías.
- Tipos incorrectos (`abc` en un campo numérico).
- Duplicados.
- Campos faltantes.

Patrón recomendado:

1. Importar primero en una **tabla temporal**.
2. Validar datos.
3. Insertar en la tabla final si todo es correcto.

Ejemplo:

```sql
CREATE TEMP TABLE tmp_producto (
  nombre TEXT,
  precio TEXT,
  categoria TEXT
);

COPY tmp_producto FROM '/ruta/a/productos.csv' DELIMITER ',' CSV HEADER;

-- Validaciones básicas
SELECT * FROM tmp_producto WHERE precio ~ '^[0-9]+(\.[0-9]{1,2})?$';  -- formato numérico correcto
SELECT * FROM tmp_producto WHERE nombre IS NULL OR nombre = '';

-- Si todo está bien:
INSERT INTO producto (nombre, precio, categoria)
SELECT nombre, precio::NUMERIC(10,2), categoria
FROM tmp_producto;

```

👉 De esta forma **no contaminas** la tabla real con datos rotos.

## 🧠 28.4. Importación de JSON

JSON es ideal cuando:

- Hay jerarquías o relaciones.
- Viene de APIs externas.
- Necesitas campos opcionales o anidados.

Ejemplo de archivo:

```json
[
  { "nombre": "Teclado", "precio": 59.90, "categoria": "Electrónica" },
  { "nombre": "Camiseta", "precio": 19.99, "categoria": "Ropa" }
]

```

En PostgreSQL (u otros motores con soporte JSON):

```sql
CREATE TEMP TABLE tmp_json (data JSONB);

COPY tmp_json FROM '/ruta/a/productos.json';

INSERT INTO producto (nombre, precio, categoria)
SELECT
  data->>'nombre',
  (data->>'precio')::NUMERIC,
  data->>'categoria'
FROM tmp_json;

```

👉 Esto permite validar y transformar **campo por campo** antes de insertar.

## 🧭 28.5. Validación semántica (no solo sintaxis)

No basta con que el archivo “tenga datos”.

También hay que comprobar:

- ¿Los valores tienen sentido? (precios > 0)
- ¿No hay duplicados conflictivos?
- ¿Las categorías existen en otra tabla?
- ¿El formato de email es válido?

Ejemplo:

```sql
SELECT * FROM tmp_producto WHERE precio::NUMERIC <= 0;
SELECT * FROM tmp_producto WHERE categoria NOT IN (SELECT nombre FROM categoria);

```

👉 Si algo falla, **se corrige antes de insertarlo**.

## 🧠 28.6. Cargas idempotentes — que no duplican datos

Una carga idempotente es aquella que puedes ejecutar varias veces y **el resultado es siempre el mismo**.

Ejemplo inseguro ❌:

```sql
INSERT INTO producto (nombre, precio, categoria)
SELECT nombre, precio, categoria FROM tmp_producto;

```

👉 Si ejecutas este script dos veces → duplica los registros.

Ejemplo idempotente ✅:

```sql
INSERT INTO producto (nombre, precio, categoria)
SELECT nombre, precio, categoria
FROM tmp_producto
ON CONFLICT (nombre) DO UPDATE
SET precio = EXCLUDED.precio,
    categoria = EXCLUDED.categoria;

```

👉 Si el producto ya existe, **se actualiza**.

👉 Si no existe, **se inserta**.

👉 Si ejecutas el script 10 veces, la tabla queda igual.

📌 Esto es especialmente importante en **integraciones automáticas y cron jobs**.

## 🧭 28.7. Control de errores y reportes

En flujos de importación reales conviene:

- Guardar registros inválidos en una tabla de errores:

```sql
CREATE TABLE import_errors (
  id SERIAL PRIMARY KEY,
  archivo TEXT,
  linea INT,
  error TEXT,
  fecha TIMESTAMP DEFAULT NOW()
);

```

- Validar fila a fila y registrar errores:

```sql
INSERT INTO import_errors (archivo, linea, error)
VALUES ('productos.csv', 42, 'Precio inválido: abc');

```

👉 Así puedes **depurar problemas sin abortar toda la importación**.

## 🧠 28.8. Exportación fiable

La exportación es el proceso inverso: sacar datos de forma segura y limpia.

Ejemplo simple a CSV:

```sql
COPY (SELECT nombre, precio, categoria FROM producto)
TO '/ruta/export/productos.csv'
DELIMITER ','
CSV HEADER;

```

Ejemplo a JSON:

```sql
SELECT json_agg(row_to_json(producto)) FROM producto;

```

👉 Es importante:

- Asegurar formatos consistentes.
- Escapar caracteres especiales.
- Filtrar datos sensibles.
- Registrar quién exportó y cuándo (auditoría).

## 🧭 28.9. Buenas prácticas en integraciones

- **Nunca** insertes directamente sin validación previa.
- Usa **tablas temporales o staging** para limpiar datos antes.
- Implementa cargas **idempotentes** para evitar duplicados.
- Mantén logs y errores rastreables.
- Establece formatos estándar y documentados.
- Haz que la exportación sea clara, repetible y verificable.
- Si hay datos sensibles → aplica enmascaramiento (ver M23).

## 🚨 28.10. Errores comunes

- Cargar CSV directamente sin validar → tablas rotas.
- No controlar duplicados → datos inflados.
- Falta de idempotencia → cargas irreversibles.
- No manejar errores → se pierden registros fallidos.
- Exportar datos sensibles sin control.
- Falta de trazabilidad (nadie sabe quién importó qué).