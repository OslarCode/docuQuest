# Programación backend

El backend es la parte de una aplicación web que vive en el servidor: recibe peticiones, ejecuta la lógica del negocio, habla con bases de datos o servicios externos y devuelve respuestas (normalmente JSON o HTML).

Si el frontend es “la cara”, el backend es “el cerebro + las manos”.

CÓMO FUNCIONA (flujo básico)

1. El navegador o la app móvil hace una request a una URL (por ejemplo `POST /api/pedidos`).
2. El backend procesa: valida datos, aplica reglas, consulta o guarda en la base de datos, integra pasarelas, etc.
3. El backend responde con un status (200, 201, 400, 401, 500…) y un payload (JSON, HTML, archivo…).

Cliente → (HTTP) → Backend (Rutas, Controladores, Servicios, DB) → Respuesta

PIEZAS CLAVE (sin rodeos)

- Rutas y Controladores → definen qué URL existe y qué hace.
- Servicios → contienen la lógica real (cálculos, reglas, integraciones).
- Modelos / Base de datos → guardan y leen datos con consistencia.
- Autenticación y Autorización → controlan quién eres y qué puedes hacer (JWT, sesiones).
- Validación → nunca confíes en lo que entra desde el cliente.
- Observabilidad → logs, métricas, trazas; si no se mide, no existe.
- Seguridad → CORS, rate limiting, saneo de inputs, secretos en variables de entorno.
- Despliegue → ejecutar el servidor en VPS, Docker o serverless de forma reproducible.

EJEMPLO REAL MÍNIMO CON NODE.JS (EXPRESS + SQLITE)

Un CRUD básico de productos para que un frontend pueda listar y crear.

Contenido de package.json:

```
{
  "name": "mini-backend",
  "type": "module",
  "scripts": {
    "dev": "node index.js"
  },
  "dependencies": {
    "better-sqlite3": "^11.5.0",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "zod": "^3.23.8"
  }
}

```

Contenido de index.js:

```jsx
import "dotenv/config";
import express from "express";
import Database from "better-sqlite3";
import { z } from "zod";

const app = express();
app.use(express.json());

const db = new Database("db.sqlite");

// Migración mínima (idempotente)
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK(price >= 0)
  );
`);

const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
});

// Rutas
app.get("/api/products", (req, res) => {
  const rows = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  res.json(rows);
});

app.post("/api/products", (req, res) => {
  const parse = ProductSchema.safeParse(req.body);
  if (!parse.success)
    return res.status(400).json({ error: parse.error.flatten() });

  const { name, price } = parse.data;
  const stmt = db.prepare("INSERT INTO products (name, price) VALUES (?, ?)");
  const info = stmt.run(name, price);
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(info.lastInsertRowid);
  res.status(201).json(product);
});

// Ejemplo de validación en parámetro
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0)
    return res.status(400).json({ error: "id inválido" });

  const info = db.prepare("DELETE FROM products WHERE id = ?").run(id);
  if (info.changes === 0) return res.status(404).json({ error: "No existe" });
  res.status(204).send();
});

// Arranque
const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`API lista en http://localhost:${port}`));
```

Cómo probar:

```
npm install
npm run dev

# En otra terminal:
curl http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado mecánico","price":79.9}'

```

COSAS QUE HARÍAS EN UN BACKEND REAL

- Autenticación JWT para rutas protegidas (por ejemplo /api/admin/\*).
- Rate limiting y configuración de CORS.
- Validación fuerte con Zod o Joi en entrada y salida.
- Capas separadas (rutas → controladores → servicios → repositorios).
- Migraciones formales y seeds de base de datos.
- Logs estructurados y métricas para monitoreo.
- Tests automáticos y CI/CD antes de desplegar.
- Variables de entorno para secretos y configuración (nunca en el repo).

EN UNA FRASE

El backend es el servicio que custodia los datos y las reglas del negocio, expone APIs fiables y seguras, y garantiza que cada request se convierta en una respuesta coherente. Lo demás es implementación.
