# Manipular JSON desde formularios HTML con Node.js

## Qué vas a aprender

- Enviar datos desde un formulario HTML.
- Guardarlos en un archivo JSON local.
- Listarlos en la web.
- Todo sin base de datos ni frameworks (Node.js nativo).

## Estructura del proyecto

```
form-json/
├── public/
│   └── index.html          ← Formulario + listado (renderiza con fetch)
├── usuarios.json           ← “Base de datos” simulada (se crea al guardar)
└── server.js               ← Servidor HTTP nativo Node

```

## Paso 1: `public/index.html` (formulario + render de la tabla)

> Archivo estático. Envía el formulario a /guardar y pinta la tabla consultando /usuarios vía fetch.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Registro de Usuarios (JSON + Node)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container py-5">
      <h1 class="text-primary mb-4">Registro de Usuarios</h1>

      <form action="/guardar" method="POST" class="mb-5 row g-2">
        <div class="col-md-4">
          <input
            class="form-control"
            name="nombre"
            placeholder="Nombre"
            required
          />
        </div>
        <div class="col-md-4">
          <input
            class="form-control"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div class="col-md-2">
          <input
            class="form-control"
            name="edad"
            type="number"
            placeholder="Edad"
            min="0"
            required
          />
        </div>
        <div class="col-md-2">
          <button class="btn btn-success w-100">Registrar</button>
        </div>
      </form>

      <h2>Usuarios registrados</h2>
      <table class="table table-bordered" id="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Registrado</th>
          </tr>
        </thead>
        <tbody id="tbody">
          <!-- Se rellena con fetch -->
        </tbody>
      </table>
    </div>

    <script>
      async function cargarUsuarios() {
        try {
          const res = await fetch("/usuarios"); // devuelve JSON
          if (!res.ok) throw new Error("Error al cargar");
          const usuarios = await res.json(); // array
          const tbody = document.getElementById("tbody");
          tbody.innerHTML = usuarios
            .map(
              (u) => `
          <tr>
            <td>${escapeHtml(u.nombre)}</td>
            <td>${escapeHtml(u.email)}</td>
            <td>${Number(u.edad)}</td>
            <td>${u.fecha}</td>
          </tr>
        `
            )
            .join("");
        } catch (e) {
          console.error(e);
        }
      }

      // Saneado básico para prevenir inyección en la tabla
      function escapeHtml(str) {
        return String(str)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      cargarUsuarios();
    </script>
  </body>
</html>
```

## Paso 2: `server.js` (servidor HTTP nativo + guardado en JSON)

> Sin Express. Maneja GET / y /usuarios, y POST /guardar. Guarda en usuarios.json con indentación legible.

```jsx
// server.js
import http from "node:http";
import { readFile, writeFile, access } from "node:fs/promises";
import { constants, createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_FILE = path.join(__dirname, "usuarios.json");

// Utilidad: comprueba si existe el archivo
async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Lectura segura de usuarios.json
async function leerUsuarios() {
  if (!(await exists(DATA_FILE))) return [];
  const txt = await readFile(DATA_FILE, "utf8");
  if (!txt.trim()) return [];
  try {
    return JSON.parse(txt);
  } catch {
    return [];
  }
}

// Escritura segura de usuarios.json
async function guardarUsuarios(arr) {
  const json = JSON.stringify(arr, null, 2);
  await writeFile(DATA_FILE, json, "utf8");
}

// Servir archivo estático simple (solo index.html en este caso)
function serveIndex(res) {
  const filePath = path.join(PUBLIC_DIR, "index.html");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  createReadStream(filePath).pipe(res);
}

// Parseo de body x-www-form-urlencoded
async function parseFormBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const body = Buffer.concat(chunks).toString("utf8");
  const params = new URLSearchParams(body);
  const obj = {};
  for (const [k, v] of params.entries()) obj[k] = v;
  return obj;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    // GET /
    if (req.method === "GET" && url.pathname === "/") {
      return serveIndex(res);
    }

    // GET /usuarios -> JSON de usuarios
    if (req.method === "GET" && url.pathname === "/usuarios") {
      const usuarios = await leerUsuarios();
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify(usuarios));
    }

    // POST /guardar -> procesa formulario y guarda en JSON
    if (req.method === "POST" && url.pathname === "/guardar") {
      const data = await parseFormBody(req);
      const { nombre, email, edad } = data;

      // Validación básica
      if (!nombre || !email || !edad || Number.isNaN(Number(edad))) {
        res.writeHead(302, { Location: "/" });
        return res.end();
      }

      const usuarios = await leerUsuarios();
      usuarios.push({
        nombre: String(nombre).trim(),
        email: String(email).trim(),
        edad: Number(edad),
        fecha: new Date().toISOString().replace("T", " ").slice(0, 16),
      });
      await guardarUsuarios(usuarios);

      // Redirige de vuelta a la portada
      res.writeHead(302, { Location: "/" });
      return res.end();
    }

    // Cualquier otro recurso estático bajo /public si lo necesitas
    // (opcional) ejemplo: servir Bootstrap local, imágenes, etc.

    // 404 por defecto
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("No encontrado");
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Error interno del servidor");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
```

## Cómo ejecutar

1. Crea la estructura de carpetas y archivos tal cual.
2. Ejecuta:

   ```
   node server.js

   ```

3. Abre en el navegador:

   ```
   http://localhost:3000

   ```

## Resultado

- Los usuarios se registran con el formulario HTML.
- El servidor guarda cada registro en `usuarios.json` sin borrar los anteriores.
- El listado se pinta en la tabla con un `fetch` a `/usuarios`.
- Todo funciona con Node.js nativo y un archivo JSON local.

## Técnicas aplicadas

| Acción                    | Tecnología usada en Node.js                              |
| ------------------------- | -------------------------------------------------------- |
| Servir la página          | Módulo `http` + archivo estático                         |
| Recibir formulario POST   | `application/x-www-form-urlencoded` + `URLSearchParams`  |
| Guardar datos como JSON   | `JSON.stringify(..., null, 2)` + `fs/promises.writeFile` |
| Leer datos JSON           | `fs/promises.readFile` + `JSON.parse()`                  |
| Render del listado        | `fetch('/usuarios')` + DOM en el cliente                 |
| Saneado básico en cliente | Función `escapeHtml` en `index.html`                     |

## Mejoras posibles

- Validación más estricta del email y rangos de edad.
- Editar y eliminar usuarios.
- Paginación o ordenación por fecha.
- Sustituir el render con `fetch` por una plantilla server-side si prefieres no usar JS en el cliente.
