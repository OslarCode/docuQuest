# SQL Essential en SQLite

## 1. Qué es SQL y cómo funciona en SQLite

SQL significa **Structured Query Language**, y es el lenguaje estándar para comunicarnos con bases de datos relacionales.

Cuando escribes SQL en SQLite, **no estás programando en un lenguaje “nuevo”**, estás dando **instrucciones declarativas** al motor:

- Tú dices *“quiero estos datos”*,
- SQLite decide **cómo obtenerlos de forma eficiente**.

Por ejemplo:

```sql
SELECT name FROM users;

```

No le dices *“cómo recorrer la tabla”*, solo *“qué quieres obtener”*.

Esto hace que SQL sea más sencillo que un lenguaje imperativo, y a la vez muy potente.

## 2. Crear tablas — `CREATE TABLE`

Toda base de datos relacional parte de **tablas**.

Cada tabla representa una **entidad** (ej. usuarios, productos, pedidos…).

Estructura básica:

```sql
CREATE TABLE nombre_tabla (
  nombre_columna1 TIPO REGLAS,
  nombre_columna2 TIPO REGLAS,
  ...
);

```

Ejemplo real:

```sql
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

```

Qué estamos diciendo:

- `IF NOT EXISTS`: evita error si la tabla ya existe.
- `id INTEGER PRIMARY KEY`: crea una clave única autoincremental.
- `name TEXT NOT NULL UNIQUE`: texto obligatorio y único (no se puede repetir).

Para ver qué tablas hay creadas:

```sql
.tables

```

Para ver su estructura:

```sql
.schema categories

```

**Consejo:** nombra las tablas en plural (`users`, `products`) y las columnas en minúscula y snake_case (`created_at`).

## 🧾 3. Insertar datos — `INSERT INTO`

Sintaxis básica:

```sql
INSERT INTO nombre_tabla (col1, col2, ...) VALUES (valor1, valor2, ...);

```

Ejemplo real:

```sql
INSERT INTO categories (name) VALUES ('Electrónica');
INSERT INTO categories (name) VALUES ('Oficina');
INSERT INTO categories (name) VALUES ('Gaming');

```

Consulta:

```sql
SELECT * FROM categories;

```

**Consejo práctico:**

- Si omites la columna `id` (PRIMARY KEY), SQLite la genera automáticamente.
- Usa comillas simples `' '` para texto.
- Si quieres insertar varios registros a la vez:

```sql
INSERT INTO categories (name)
VALUES ('Hogar'), ('Videojuegos'), ('Deportes');

```

## 4. Consultar datos — `SELECT`

Es el corazón de SQL.

Sintaxis:

```sql
SELECT columnas FROM tabla WHERE condición;

```

Ejemplo básico:

```sql
SELECT id, name FROM categories;

```

Filtrando resultados:

```sql
SELECT id, name FROM categories
WHERE name = 'Gaming';

```

Ordenando:

```sql
SELECT id, name FROM categories
ORDER BY name ASC;

```

Limitando:

```sql
SELECT id, name FROM categories
ORDER BY id DESC
LIMIT 3;

```

**Consejo**: Usa `*` solo en pruebas rápidas. En producción especifica las columnas que necesitas.

## 5. Actualizar datos — `UPDATE`

Sintaxis:

```sql
UPDATE tabla SET columna = valor WHERE condición;

```

Ejemplo:

```sql
UPDATE categories
SET name = 'Videojuegos y Consolas'
WHERE name = 'Gaming';

```

Verifica:

```sql
SELECT * FROM categories;

```

**Muy importante**:

- Si olvidas el `WHERE`, **actualizas toda la tabla**.
    
    Ejemplo peligroso:
    
    ```sql
    UPDATE categories SET name = 'ERROR';
    
    ```
    
    Esto cambiaría *todos* los nombres de categoría.
    
    Siempre revisa dos veces tus condiciones.
    

## 6. Borrar datos — `DELETE`

Sintaxis:

```sql
DELETE FROM tabla WHERE condición;

```

Ejemplo:

```sql
DELETE FROM categories WHERE name = 'Deportes';

```

Verifica:

```sql
SELECT * FROM categories;

```

 Igual que con `UPDATE`:

- Si olvidas `WHERE`, **borras toda la tabla**.
- No hay “papelera de reciclaje”. Lo borrado se va.

## 7. Borrar tabla completa — `DROP TABLE`

Si quieres eliminar toda la tabla (estructura + datos):

```sql
DROP TABLE IF EXISTS categories;

```

Esto no se puede deshacer.

Haz backups antes de operaciones destructivas.

## 8. Ejercicio práctico guiado — CRUD básico

Crea una tabla `clients` y realiza operaciones reales:

```sql
CREATE TABLE clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT
);

INSERT INTO clients (name, email, phone)
VALUES
  ('Ana López', 'ana@example.com', '+34 600 123 456'),
  ('Luis Ramos', 'luis@example.com', '+34 622 555 111'),
  ('Marta Ruiz', 'marta@example.com', '+34 699 222 333');

SELECT * FROM clients;

UPDATE clients SET phone = '+34 611 111 111' WHERE name = 'Luis Ramos';

DELETE FROM clients WHERE email = 'marta@example.com';

```

Comprueba:

```sql
SELECT * FROM clients;

```

## Buenas prácticas Módulo 1

- Usa `IF NOT EXISTS` en `CREATE TABLE` para que tus scripts sean seguros.
- Escribe consultas en mayúsculas (`SELECT`, `INSERT`) y nombres en minúsculas (`users`, `name`).
- Haz siempre un `SELECT` antes de `UPDATE` o `DELETE` para confirmar qué afectará.
- Guarda tu esquema en archivos `.sql` para versionar fácilmente.
- SQLite soporta transacciones, lo que te permite deshacer cambios si te equivocas (veremos esto en Módulo 5).

## Errores comunes

| Error | Causa | Solución |
| --- | --- | --- |
| `no such table` | Intentas usar una tabla no creada | Usa `.tables` y `.schema` para verificar |
| `UNIQUE constraint failed` | Duplicaste un valor único | Asegúrate de que `email` u otras columnas únicas no se repiten |
| `syntax error` | Faltan comillas, comas o paréntesis | Revisa bien la estructura y usa `.schema` como referencia |
| Cambios masivos por error | Olvidaste el `WHERE` | Siempre haz un `SELECT` previo |

## 1. Placeholders y parámetros (seguridad y buenas prácticas)

Cuando trabajas con SQLite desde un lenguaje de programación (Node.js, Python, etc.), **no debes concatenar cadenas** para armar tus consultas SQL, porque eso abre la puerta a inyecciones SQL y errores difíciles de depurar.

### Ejemplo incorrecto:

```jsx
// Node.js
const name = "Ana";
db.prepare(`SELECT * FROM users WHERE name = '${name}'`).get();

```

Esto funciona, sí… pero si `name` viene de un formulario, alguien podría inyectar código malicioso.

### Ejemplo correcto con placeholders

En SQLite (y la mayoría de motores SQL modernos) puedes usar:

- `?` → placeholder posicional.
- `:nombre` → placeholder con nombre.

Ejemplo en Node.js:

```jsx
const name = "Ana";
const row = db.prepare("SELECT * FROM users WHERE name = ?").get(name);
console.log(row);

```

o con nombre:

```jsx
const email = "ana@example.com";
const row = db.prepare("SELECT * FROM users WHERE email = :mail").get({ mail: email });

```

Lo mismo aplica para `INSERT`, `UPDATE` y `DELETE`:

```jsx
db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run("Juan", "juan@example.com");
db.prepare("UPDATE users SET name = ? WHERE id = ?").run("Juan Pérez", 2);
db.prepare("DELETE FROM users WHERE id = ?").run(2);

```

*Ventajas de usar parámetros*:

- Evitas inyecciones SQL.
- Mantienes tu código limpio y fácil de leer.
- SQLite maneja los tipos por ti (no tienes que poner comillas manualmente).

Este mismo enfoque se aplica si usas Python, Go, C#, etc.

Solo cambia la sintaxis del método de conexión, pero **el principio es idéntico**.

## 2. Placeholders dentro del shell interactivo

En el **shell nativo de SQLite** (`sqlite3`) no hay placeholders como tal (eso lo usas desde código), pero puedes usar `.parameter` para simularlos y hacer tus scripts más reutilizables:

```sql
.parameter set @category 'Gaming'
SELECT * FROM categories WHERE name = @category;

```

Puedes listar parámetros activos:

```
.parameter list

```

Y limpiarlos:

```
.parameter clear

```

Esto es útil si tus estudiantes hacen scripts `.sql` reutilizables con valores variables.

## 3. Importar datos reales desde CSV

Importar CSV es una habilidad práctica muy útil para:

- Poblar bases de prueba en segundos.
- Cargar datasets reales sin escribir 200 `INSERT`.
- Prototipar apps rápidamente.

Supongamos que tienes un archivo `data/products.csv` con este contenido:

```
name,price,sku
Teclado mecánico,79.90,KB-001
Ratón inalámbrico,29.50,MS-010
Monitor 24",149.00,MN-200
Silla ergonómica,199.99,CH-500

```

### Paso 1: Preparar la tabla

Asegúrate de que exista la tabla correspondiente:

```sql
CREATE TABLE IF NOT EXISTS products (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  price  REAL NOT NULL,
  sku    TEXT UNIQUE
);

```

### Paso 2: Entrar en modo CSV en el shell

Abre la terminal:

```bash
sqlite3 data/primer.db

```

En el shell:

```
.mode csv
.headers on
.import data/products.csv products

```

Con esto:

- `.mode csv` le dice a SQLite cómo leer el archivo.
- `.headers on` hace que ignore la primera fila (cabeceras).
- `.import` carga directamente el CSV en la tabla `products`.

Verifica:

```sql
SELECT * FROM products;

```

**Consejo**: Si tu CSV usa otro separador (como `;`), puedes definirlo así:

```
.separator ;

```

## 4. Exportar resultados a CSV o texto

También puedes hacer el proceso inverso: **sacar datos de SQLite a un archivo**.

Por ejemplo:

```sql
.headers on
.mode csv
.output data/export_usuarios.csv
SELECT * FROM users;
.output stdout

```

Esto crea `export_usuarios.csv` con tus datos.

Muy útil para informes, respaldos, o integración con Excel/Google Sheets.

Puedes cambiar `.mode` a otros formatos:

- `.mode list` (por defecto)
- `.mode box` (bonito en consola)
- `.mode table` (legible)
- `.mode json` (sí, SQLite puede exportar JSON directamente)

Ejemplo:

```
.mode box
SELECT * FROM products;

```

## 5. Ejercicio práctico — CSV + consultas parametrizadas

**Objetivo:** Cargar datos reales, consultarlos con parámetros y exportar resultados.

1. Crea un archivo `clientes.csv`:

```
name,email,phone
Ana López,ana@example.com,+34 600 123 456
Luis Ramos,luis@example.com,+34 622 555 111
Marta Ruiz,marta@example.com,+34 699 222 333

```

1. Crea la tabla:

```sql
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT
);

```

1. Importa:

```
.mode csv
.headers on
.import data/clientes.csv clients

```

1. Consulta con parámetros (desde tu código Node.js o Python, no desde shell):

```jsx
const row = db.prepare("SELECT * FROM clients WHERE email = ?").get("ana@example.com");
console.log(row);

```

1. Exporta la tabla a CSV:

```
.headers on
.mode csv
.output data/export_clientes.csv
SELECT * FROM clients;
.output stdout

```

**Tip real**: Este flujo es muy común en aulas, prototipos y pruebas unitarias. Cargar datasets CSV y jugar con SQL es una forma muy práctica de dominar la sintaxis sin complicarse con backends todavía.

## 6. Conclusión del Módulo 1

En este módulo ya dominas:

- Crear, leer, actualizar y borrar datos (CRUD) con SQL.
- Usar placeholders de forma segura en aplicaciones reales.
- Importar y exportar CSV de forma ágil.
- Utilizar comandos básicos del shell (`.mode`, `.headers`, `.import`, `.output`).

Esto es **el núcleo operativo** de SQLite: si dominas este módulo, ya puedes trabajar con bases de datos funcionales en tus propios proyectos.

En el **Módulo 2** pasaremos a **tipos de datos, restricciones y calidad de datos en SQLite**, incluyendo:

- Afinidades de tipo
- `STRICT` tables
- `NOT NULL`, `UNIQUE`, `CHECK`, `DEFAULT`
- Fechas y horas bien manejadas en SQLite
- Activación de `foreign_keys`

Esta parte es esencial para evitar bases “rotas” o inconsistentes más adelante.