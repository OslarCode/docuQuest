# Extensiones y funciones personalizadas

## 1. Qué es una UDF (User Defined Function)

Una **UDF** es una función que tú defines en tu lenguaje anfitrión (por ejemplo, JavaScript o Python), y luego **la usas dentro de consultas SQL** como si fuera nativa.

Ejemplo de idea:

- Crear una función `slugify(text)` → para generar URLs amigables directamente desde SQL.
- Crear `es_email_valido(text)` → para validar emails.
- Crear `random_uuid()` → si necesitas identificadores únicos personalizados.

## 2. UDF en Node.js (con `better-sqlite3`)

Si usas Node.js, la librería [`better-sqlite3`](https://github.com/WiseLibs/better-sqlite3) permite **registrar funciones personalizadas** fácilmente.

Ejemplo de proyecto simple:

### Instalar dependencia

```bash
npm install better-sqlite3

```

### Código básico

```jsx
import Database from 'better-sqlite3';
const db = new Database('test.db');

// Definir una función personalizada
db.function('slugify', (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')           // elimina acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
});

// Crear tabla y datos
db.prepare('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title TEXT)').run();
db.prepare('INSERT INTO articles (title) VALUES (?)').run('Hola Mundo con Acentos');

// Usar la función en una consulta SQL
const rows = db.prepare('SELECT slugify(title) AS slug FROM articles').all();
console.log(rows);

```

Salida:

```
[ { slug: 'hola-mundo-con-acentos' } ]

```

Acabas de extender SQLite con una **función personalizada reutilizable**.

## 3. UDF en Python (con `sqlite3` estándar)

Python también permite registrar funciones fácilmente:

```python
import sqlite3
import unicodedata
import re

def slugify(text):
    text = unicodedata.normalize('NFD', text)
    text = text.encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^a-zA-Z0-9\s-]', '', text).lower()
    text = re.sub(r'\s+', '-', text).strip('-')
    return text

conn = sqlite3.connect('test.db')
conn.create_function('slugify', 1, slugify)

cur = conn.cursor()
cur.execute('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title TEXT)')
cur.execute('INSERT INTO articles (title) VALUES (?)', ('Hola Mundo con Acentos',))
conn.commit()

cur.execute('SELECT slugify(title) FROM articles')
print(cur.fetchall())

```

Resultado:

```
[('hola-mundo-con-acentos',)]

```

`conn.create_function(nombre, num_args, funcion)` → así se registra.

## 4. UDF con múltiples argumentos

Puedes crear funciones con más de un argumento fácilmente:

Node.js:

```jsx
db.function('concat3', (a, b, c) => `${a}-${b}-${c}`);
db.prepare("SELECT concat3('uno','dos','tres')").get();
// → uno-dos-tres

```

Python:

```python
def concat3(a,b,c): return f"{a}-{b}-{c}"
conn.create_function('concat3', 3, concat3)
cur.execute("SELECT concat3('uno','dos','tres')")

```

Igual que las funciones nativas.

## 5. Ejemplo práctico — validación de correos

Supón que quieres validar correos directamente desde la base, sin procesarlos en la app:

Node.js:

```jsx
db.function('is_valid_email', (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT)').run();
db.prepare('INSERT INTO users (email) VALUES (?)').run('correo@valido.com');

const rows = db.prepare('SELECT email, is_valid_email(email) AS valido FROM users').all();
console.log(rows);

```

Salida:

```
[ { email: 'correo@valido.com', valido: 1 } ]

```

## 6. Cuándo usar UDF (y cuándo no)

Útil cuando:

- Quieres reutilizar lógica en varias consultas SQL.
- Necesitas cálculos personalizados sin duplicar código.
- Deseas enriquecer tus consultas sin tocar la tabla.

Evítalo si:

- La lógica es muy compleja o pesada (debería vivir en la app).
- Necesitas funciones con estado persistente.
- No quieres acoplar tu lógica de negocio a la base.

Regla práctica: **usa UDF para transformar datos**, no para procesar lógica crítica.

## 7. Cargar extensiones nativas (`load_extension`)

SQLite también permite cargar **extensiones escritas en C/C++ o compiladas**.

Por ejemplo:

- `mod_spatialite` → soporte GIS, mapas y geodatos.
- `regexp` → soporte de expresiones regulares completas.
- `sqlcipher` → cifrado AES.

Para cargar:

```sql
SELECT load_extension('mod_spatialite');

```

Importante: algunas instalaciones de SQLite requieren compilar con soporte `--enable-load-extension`.

También puedes habilitarlo desde Node.js:

```jsx
db.loadExtension('./mod_spatialite.so');

```

Esto te abre la puerta a ampliar SQLite de forma modular sin inflar tu app principal.

## 8. Ejercicio práctico — combinación de funciones personalizadas

Vamos a crear un pequeño ejemplo que combina varias ideas:

1. Crear una tabla de productos:

```sql
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);

```

1. Insertar datos:

```sql
INSERT INTO products (name, price) VALUES
('Cámara Full HD', 199.99),
('Micrófono Profesional', 89.50),
('Luz LED', 49.00);

```

1. Registrar funciones en Node.js:

```jsx
db.function('slugify', text => text.toLowerCase().replace(/\s+/g,'-'));
db.function('with_tax', (price, rate) => (price * (1 + rate)).toFixed(2));

```

1. Consultar:

```sql
SELECT slugify(name) AS url_slug, with_tax(price, 0.21) AS final_price
FROM products;

```

 Resultado esperado:

```
url_slug                 | final_price
--------------------------|-------------
cámara-full-hd           | 241.99
micrófono-profesional    | 108.30
luz-led                  | 59.29

```

Has extendido SQLite para **convertir nombres y calcular precios con impuestos directamente en la consulta**.

## 9. Buenas prácticas con UDF y extensiones

- Usa nombres claros y consistentes para tus funciones personalizadas.
- Mantén las funciones ligeras (no hagas loops complejos).
- Si la lógica es compleja, preprocesa en la app, no en SQLite.
- Documenta tus UDF: otros devs deben saber qué hacen.
- Usa `load_extension` con cuidado — solo extensiones de confianza.
- Puedes combinar UDF con vistas, triggers y FTS para crear flujos muy potentes.

## 10. Errores comunes

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| “no such function: X” | UDF no registrada correctamente | Verificar nombre y argumentos |
| UDF lenta en grandes consultas | Función demasiado pesada | Optimizar o trasladar a la app |
| Problemas con caracteres especiales | Falta de normalización | Usar `.normalize()` o `unicodedata` |
| Extensión no se carga | SQLite sin soporte `load_extension` | Recompilar o habilitar extensión |
| Conflicto de nombres | UDF y función nativa con mismo nombre | Usar nombre único para la UDF |