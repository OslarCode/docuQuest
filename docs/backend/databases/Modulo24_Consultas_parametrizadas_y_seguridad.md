# Modulo 24. Consultas parametrizadas y seguridad

## 🧭 24.1. Qué es la inyección SQL

La **inyección SQL** ocurre cuando los datos introducidos por el usuario se **insertan directamente** en una consulta sin validarlos ni parametrizarlos.

Ejemplo inseguro ❌ (muy común):

```jsx
// Supongamos que el usuario escribe su nombre
const nombre = req.query.nombre;

const sql = `SELECT * FROM usuarios WHERE nombre = '${nombre}'`;
db.query(sql);

```

Si el usuario pone:

```
Ana

```

👉 La consulta será:

```sql
SELECT * FROM usuarios WHERE nombre = 'Ana';

```

Pero si pone:

```
' OR '1'='1

```

👉 Se convierte en:

```sql
SELECT * FROM usuarios WHERE nombre = '' OR '1'='1';

```

👉 Resultado: **devuelve todos los usuarios**, sin autorización.

📌 La inyección SQL es una de las **vulnerabilidades más frecuentes y peligrosas**.

Permite:

- Leer datos sensibles,
- Modificar registros,
- Borrar tablas completas (`DROP`),
- Incluso ejecutar funciones internas.

## 🧠 24.2. Consultas parametrizadas — la solución correcta ✅

En lugar de insertar valores manualmente en la cadena SQL, se usan **placeholders** y **parámetros separados**.

Ejemplo seguro:

```jsx
const nombre = req.query.nombre;

const sql = `SELECT * FROM usuarios WHERE nombre = ?`;
db.query(sql, [nombre]);

```

👉 El valor de `nombre` no se concatena directamente.

👉 El motor lo trata como **dato literal**, no como código.

👉 No importa qué texto meta el usuario: nunca podrá romper la consulta.

📌 Esto es válido en casi todos los lenguajes modernos:

- `?` en SQLite, MySQL y muchos ORMs.
- `$1`, `$2`… en PostgreSQL.
- `@param` en algunos motores.

## 🧭 24.3. Ejemplo en PostgreSQL (parámetros numerados)

```jsx
const correo = req.body.correo;
const sql = 'SELECT * FROM usuario WHERE correo = $1';
db.query(sql, [correo]);

```

Incluso si el usuario escribe:

```
' OR 1=1; DROP TABLE usuario;

```

👉 la consulta no se rompe.

👉 la BD busca literalmente un correo que contenga ese texto (sin éxito).

## 🧠 24.4. Paginación correcta — evitando abusos y ataques

Otro error común es construir **paginación insegura**.

Ejemplo inseguro ❌:

```jsx
const page = req.query.page;
const limit = req.query.limit;
const sql = `SELECT * FROM productos LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

```

👉 Un atacante puede enviar `limit=1000000` y tumbar la base con una consulta enorme.

✅ Solución:

- Validar tipos y límites máximos.
- Usar parámetros, no concatenación.

Ejemplo:

```jsx
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.min(50, parseInt(req.query.limit) || 10);
const offset = (page - 1) * limit;

const sql = `SELECT * FROM productos LIMIT $1 OFFSET $2`;
db.query(sql, [limit, offset]);

```

👉 La paginación ahora es **segura y predecible**.

👉 Nadie puede romper la consulta enviando valores raros.

## 🧭 24.5. Filtros dinámicos seguros

Es habitual que las apps tengan filtros dinámicos:

- Buscar por nombre, categoría, rango de precios, etc.

Error clásico ❌:

```jsx
let where = '';
if (req.query.nombre) {
  where += ` AND nombre LIKE '%${req.query.nombre}%'`;
}
const sql = `SELECT * FROM productos WHERE 1=1 ${where}`;

```

👉 Esto es terreno fértil para inyecciones.

✅ Solución:

- Construir condiciones dinámicas **con parámetros separados**.
- Usar arrays para los valores.

Ejemplo:

```jsx
let conditions = [];
let params = [];

if (req.query.nombre) {
  params.push(`%${req.query.nombre}%`);
  conditions.push(`nombre LIKE $${params.length}`);
}

if (req.query.categoria) {
  params.push(req.query.categoria);
  conditions.push(`categoria = $${params.length}`);
}

const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
const sql = `SELECT * FROM productos ${where}`;
db.query(sql, params);

```

👉 Da igual lo que meta el usuario, nunca rompe la consulta.

👉 La búsqueda es flexible, segura y escalable.

## 🧠 24.6. Ordenación predecible y segura

Otro punto débil: `ORDER BY`.

La mayoría de motores **no permiten usar parámetros directamente en ORDER BY**,

por lo que si no se valida, un atacante puede inyectar código.

Ejemplo inseguro ❌:

```jsx
const orderBy = req.query.orderBy;
const sql = `SELECT * FROM productos ORDER BY ${orderBy}`;

```

Si `orderBy` = `"precio; DROP TABLE productos;"` → 💥 desastre.

✅ Solución:

- Usar **listas blancas** (whitelists) con columnas válidas.
- Rechazar cualquier otra cosa.

Ejemplo:

```jsx
const validColumns = ['precio', 'nombre', 'fecha_creacion'];
let orderBy = 'precio'; // por defecto

if (validColumns.includes(req.query.orderBy)) {
  orderBy = req.query.orderBy;
}

const sql = `SELECT * FROM productos ORDER BY ${orderBy} ASC`;
db.query(sql);

```

👉 Solo las columnas válidas son aceptadas, el resto es ignorado.

👉 Sin concatenaciones directas con valores arbitrarios.

## 🧭 24.7. Consultas parametrizadas en joins

Incluso en consultas más complejas (con joins), el principio es el mismo:

```jsx
const clienteId = req.params.id;
const sql = `
  SELECT p.id, p.total, c.nombre
  FROM pedido p
  JOIN cliente c ON p.cliente_id = c.id
  WHERE c.id = $1
`;
db.query(sql, [clienteId]);

```

👉 Seguro, limpio y mantenible.

## 🧠 24.8. Buenas prácticas de seguridad en consultas

- Nunca concatenes valores del usuario directamente en SQL.
- Usa siempre parámetros (`?`, `$1`, etc.).
- Valida y limita paginación (`LIMIT`/`OFFSET`).
- Usa listas blancas para `ORDER BY`.
- Construye filtros dinámicos **con arrays de parámetros**.
- Loguea consultas críticas en la capa de aplicación.
- Usa roles de BD con privilegios mínimos (ver Módulo 22).
- Haz pruebas de inyección de forma proactiva.

## 🚨 24.9. Errores comunes

- “Solo concateno porque es más rápido” 😬
- No validar tipos ni límites.
- No controlar columnas permitidas en ordenación.
- No usar parámetros en joins complejos.
- Confiar ciegamente en datos de formularios.
- No tener logging ni monitoreo.