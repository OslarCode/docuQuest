# Tipos y calidad de datos en SQLite

## 1. Afinidad de tipos en SQLite: “flexible pero no caótica”

A diferencia de otros motores, SQLite **no tiene un sistema de tipos rígido**.

Esto significa que puedes guardar un número en una columna `TEXT` y SQLite **no se quejará**… a menos que tú se lo pidas.

Por eso es tan importante entender su modelo:

### Tipos principales en SQLite

- `INTEGER` → números enteros (1, 2, 999, -100, etc.)
- `REAL` → números decimales (1.5, 3.14, etc.)
- `TEXT` → texto (cadenas, fechas formateadas como texto)
- `BLOB` → datos binarios (imágenes, archivos — raramente usado en SQLite puro)
- `NUMERIC` → intenta comportarse como número, pero admite texto también.

Por defecto, SQLite **aplica “afinidad” de tipo**, no un tipo rígido:

- Si defines `price REAL`, intentará almacenar un número.
- Pero si insertas `"hola"`, lo guardará igualmente… a menos que tengas restricciones.

Ejemplo:

```sql
CREATE TABLE demo (
  precio REAL
);
INSERT INTO demo (precio) VALUES ('hola');
SELECT * FROM demo;

```

Sí, **esto funciona** 😅

Para evitar este tipo de problemas, SQLite ofrece:

- **`STRICT` tables** (nuevo estándar moderno).
- **Restricciones (`NOT NULL`, `CHECK`, etc.)** que validan cada fila.

## 2. Usando `STRICT` tables

Si creas la tabla con `STRICT`, **SQLite se vuelve mucho más estricto con los tipos**.

Ejemplo:

```sql
CREATE TABLE productos (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  precio REAL NOT NULL
) STRICT;

```

Prueba:

```sql
INSERT INTO productos (nombre, precio) VALUES ('Teclado', 'abc');

```

Resultado:

```
Error: cannot store TEXT value in REAL column productos.precio

```

Esto es exactamente lo que queremos en una base robusta.

Recomendación práctica: **usa `STRICT` siempre** que estés en SQLite 3.37+ (2022 en adelante). Todos los entornos modernos ya lo incluyen.

## 3. Restricciones de integridad (constraints)

Las **restricciones** son reglas que aseguran que **los datos cumplan ciertas condiciones** antes de guardarse.

Vamos a repasarlas con ejemplos claros:

### a) `NOT NULL` — campo obligatorio

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
) STRICT;

```

Esto impide:

```sql
INSERT INTO users (name) VALUES (NULL);

```

Esto protege tu base sin necesidad de lógica en la app.

### b) `UNIQUE` — valores no repetidos

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
) STRICT;

```

Prueba:

```sql
INSERT INTO users (email) VALUES ('ana@example.com');
INSERT INTO users (email) VALUES ('ana@example.com');

```

Error: `UNIQUE constraint failed: users.email`

Esto evita duplicados directamente a nivel de base de datos.

### c) `CHECK` — validaciones personalizadas

```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0)
) STRICT;

```

Prueba:

```sql
INSERT INTO products (name, price) VALUES ('Producto malo', -5);

```

Error: `CHECK constraint failed: price >= 0`

Puedes hacer checks más elaborados:

```sql
CHECK (LENGTH(name) >= 3)
CHECK (price BETWEEN 0 AND 9999)

```

### d) `DEFAULT` — valores por defecto

Si un campo no se especifica, SQLite usará este valor:

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  total REAL NOT NULL CHECK (total >= 0)
) STRICT;

```

Ahora puedes insertar:

```sql
INSERT INTO orders (total) VALUES (99.99);

```

Y SQLite rellenará automáticamente `created_at` con la fecha actual en formato ISO.

*Pro tip*: usa este patrón ISO UTC con `strftime` siempre que necesites timestamps portables:

```
'%Y-%m-%dT%H:%M:%fZ'

```

## 4. Fechas y horas en SQLite

SQLite **no tiene un tipo de fecha nativo**, pero ofrece tres maneras habituales:

1. **TEXT** → fecha en formato ISO `YYYY-MM-DDTHH:MM:SSZ`
2. **REAL** → días desde 4714 A.C. (formato juliano)
3. **INTEGER** → Unix epoch (segundos desde 1970)

Ejemplo con TEXT (recomendado para simplicidad):

```sql
INSERT INTO orders (total) VALUES (50);
SELECT id, created_at FROM orders;

```

Si quieres consultar o formatear fechas:

```sql
SELECT created_at,
       date(created_at),
       time(created_at),
       datetime(created_at)
FROM orders;

```

Si prefieres guardar timestamps como Unix:

```sql
CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  ts INTEGER NOT NULL DEFAULT (unixepoch())
) STRICT;

```

Lo importante no es el formato que uses, **sino ser consistente en toda la base**.

## 🧪 5. Ejercicio práctico — calidad de datos

Vamos a crear una tabla robusta de clientes que no permita errores típicos:

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL CHECK (LENGTH(name) >= 2),
  email TEXT UNIQUE NOT NULL,
  phone TEXT CHECK (LENGTH(phone) BETWEEN 9 AND 15),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

```

Prueba insertar valores correctos:

```sql
INSERT INTO clients (name, email, phone)
VALUES ('Ana', 'ana@example.com', '+34 600 123 456');

```

Prueba insertar un error:

```sql
INSERT INTO clients (name, email, phone)
VALUES ('', 'duplicado@example.com', '123');

```

SQLite rechazará la fila y protegerá tus datos.

Consulta final:

```sql
SELECT * FROM clients;

```

## 6. Buenas prácticas en validación con SQLite

- ✅ Usa `STRICT` siempre que puedas.
- ✅ Usa `NOT NULL` en todas las columnas obligatorias.
- ✅ Usa `CHECK` para asegurarte de que los datos tengan sentido.
- ✅ Usa `DEFAULT` para evitar nulos innecesarios.
- ✅ Mantén un **formato de fecha consistente** en toda la base.
- ⚠️ No abuses de validaciones en el código si puedes hacerlo directamente en la base.

## Errores comunes

| Error | Causa | Solución |
| --- | --- | --- |
| “cannot store TEXT value in REAL column” | Insertaste un texto en una tabla STRICT | Corrige el tipo de dato o la entrada |
| “UNIQUE constraint failed” | Insertaste un duplicado | Cambia el dato o elimina la restricción si no es necesaria |
| “CHECK constraint failed” | La validación personalizada no se cumple | Corrige la lógica o el valor |
| Fechas inconsistentes | Usas distintos formatos | Elige **uno solo** para toda la app |

## 1. Qué es una relación en bases de datos

En una base de datos relacional, las **tablas no viven aisladas**.

Un cliente puede tener muchos pedidos.

Un producto puede pertenecer a una categoría.

Un usuario puede escribir varios comentarios.

Esto se llama **relación entre tablas**, y se logra usando **claves foráneas** (*foreign keys*).

**Ejemplo mental sencillo:**

- Tabla `clients` → almacena clientes.
- Tabla `orders` → almacena pedidos.
    
    Cada pedido **pertenece a un cliente**.
    
    Por tanto:
    
- `clients.id` es la **clave primaria**.
- `orders.client_id` es la **clave foránea** que hace referencia a `clients.id`.

📌 Esto garantiza que **no existan pedidos “huérfanos”** sin cliente asociado.

## 2. Activar claves foráneas en SQLite

En SQLite, las foreign keys **no están activadas por defecto**.

Debes activarlas explícitamente en cada sesión:

```sql
PRAGMA foreign_keys = ON;

```

Muy importante:

- Si no activas esto, las relaciones no se aplicarán.
- Una buena práctica es poner esta línea en tus scripts de inicialización (`init.sql`) o ejecutarla nada más abrir la conexión en tu app.

En Node.js, por ejemplo:

```jsx
db.pragma('foreign_keys = ON');

```

## 3. Crear relaciones con `FOREIGN KEY`

Vamos a construir un ejemplo real:

Clientes → Pedidos (1 cliente puede tener varios pedidos).

### Paso 1: Tabla de clientes

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
) STRICT;

```

### Paso 2: Tabla de pedidos con foreign key

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  total REAL NOT NULL CHECK (total >= 0),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY (client_id) REFERENCES clients(id)
) STRICT;

```

Aquí `client_id` debe coincidir con un `id` válido de `clients`.

Si no existe ese cliente, SQLite **rechaza** la inserción.

Prueba:

```sql
INSERT INTO orders (client_id, total) VALUES (999, 45.50);

```

Error: `FOREIGN KEY constraint failed` ✅

Inserta un cliente válido:

```sql
INSERT INTO clients (name, email) VALUES ('Ana', 'ana@example.com');
INSERT INTO orders (client_id, total) VALUES (1, 45.50);

```

Consulta:

```sql
SELECT * FROM orders;

```

Ahora sí funciona.

## 4. Reglas de propagación (`ON DELETE` / `ON UPDATE`)

SQLite permite definir qué hacer con la relación cuando:

- se **borra** o **actualiza** un registro en la tabla padre.

Opciones comunes:

- `ON DELETE CASCADE` → si borras el cliente, se borran sus pedidos automáticamente.
- `ON DELETE RESTRICT` → prohíbe borrar si hay pedidos asociados (por defecto).
- `ON DELETE SET NULL` → pone `NULL` en `client_id` al borrar el cliente.
- `ON UPDATE CASCADE` → propaga cambios de id.

Ejemplo con cascada:

```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  total REAL NOT NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
) STRICT;

```

Prueba:

```sql
INSERT INTO clients (name, email) VALUES ('Luis', 'luis@example.com');
INSERT INTO orders (client_id, total) VALUES (2, 100);
DELETE FROM clients WHERE id = 2;
SELECT * FROM orders;

```

Verás que el pedido también desaparece automáticamente.

Esto es **muy útil** para mantener la base limpia y evitar datos basura.

## 5. Índices y foreign keys

Cuando defines una `FOREIGN KEY`, SQLite no crea automáticamente un índice en esa columna.

Para mejorar el rendimiento en consultas y joins, **debes crearlo tú**:

```sql
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);

```

Esto acelera consultas como:

```sql
SELECT * FROM orders
WHERE client_id = 1;

```

*Regla de oro práctica*:

> Cada FOREIGN KEY debería tener un índice asociado.
> 

## 6. Ejercicio práctico — Relaciones cliente ↔ pedidos

1. Activa foreign keys:

```sql
PRAGMA foreign_keys = ON;

```

1. Crea las tablas:

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
) STRICT;

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL,
  total REAL NOT NULL CHECK (total >= 0),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
) STRICT;

CREATE INDEX idx_orders_client_id ON orders(client_id);

```

1. Inserta datos:

```sql
INSERT INTO clients (name, email) VALUES ('Marta', 'marta@example.com');
INSERT INTO orders (client_id, total) VALUES (1, 49.99);
INSERT INTO orders (client_id, total) VALUES (1, 79.90);

```

1. Borra el cliente:

```sql
DELETE FROM clients WHERE id = 1;

```

1. Comprueba pedidos:

```sql
SELECT * FROM orders;

```

Vacío. Se borraron automáticamente gracias al `ON DELETE CASCADE`.

## 7. Buenas prácticas con relaciones

- Activa siempre `PRAGMA foreign_keys = ON;` al inicio.
- Usa `ON DELETE CASCADE` si quieres limpieza automática.
- Usa `ON DELETE RESTRICT` si no quieres borrar por accidente.
- Crea índices en todas las columnas que usen `FOREIGN KEY`.
- Haz pruebas con inserciones y borrados para comprobar que tus reglas funcionan como esperas.
- Documenta bien la dirección de las relaciones (1→N, N→1, N→N).

## Errores comunes

| Error | Causa | Solución |
| --- | --- | --- |
| `FOREIGN KEY constraint failed` | Intentaste insertar un ID que no existe | Inserta primero en la tabla padre |
| Las foreign keys “no hacen nada” | No activaste PRAGMA foreign_keys | Ejecuta `PRAGMA foreign_keys = ON;` |
| Lentitud en joins | No hay índice en la columna FK | Crea un índice manual |
| Borrado no esperado | Usaste ON DELETE CASCADE sin querer | Cambia a RESTRICT o elimina la cascada |

Con esto ya tienes una **base sólida para trabajar con relaciones 1→N en SQLite**.

En el **Módulo 3** aprenderás a hacer consultas expresivas sobre estas relaciones:

- `JOIN` entre tablas
- `VIEW` para consultas reutilizables
- `WITH` (CTE) y funciones de ventana