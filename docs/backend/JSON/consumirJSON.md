# Consumir JSON con fetch()

## Qué vas a hacer

- Crear un endpoint local que devuelve JSON desde un archivo.
- Consumir ese endpoint con `fetch()` desde el navegador.
- Renderizar resultados sin recargar la página.

## Estructura de archivos

```
json-fetch/
├── public/
│   └── index.html      ← Interfaz y JS con fetch
├── usuarios.json       ← Datos simulados en JSON
└── server.js           ← Servidor HTTP nativo (sin Express)

```

## Paso 1: `usuarios.json`

```json
[
  { "id": 1, "nombre": "Mario", "email": "mario@nintendo.com", "edad": 35 },
  { "id": 2, "nombre": "Luigi", "email": "luigi@nintendo.com", "edad": 34 },
  { "id": 3, "nombre": "Peach", "email": "peach@nintendo.com", "edad": 28 }
]
```

## Paso 2: `server.js` (Node HTTP básico)

```jsx
// server.js
import http from "node:http";
import { readFile, access } from "node:fs/promises";
import { constants, createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_FILE = path.join(__dirname, "usuarios.json");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

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

function serveIndex(res) {
  const filePath = path.join(PUBLIC_DIR, "index.html");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      return serveIndex(res);
    }

    if (req.method === "GET" && url.pathname === "/api/usuarios") {
      const usuarios = await leerUsuarios();
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify(usuarios));
    }

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

## Paso 3: `public/index.html` (HTML + JS con `fetch()`)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Usuarios con Fetch y JSON (Node)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="container py-5">
      <h1 class="mb-4 text-primary">Usuarios cargados con fetch()</h1>
      <div class="mb-3">
        <button class="btn btn-success" id="btn-cargar">Cargar usuarios</button>
      </div>
      <div id="usuarios" class="row g-4"></div>
    </div>

    <script>
      const contenedor = document.getElementById("usuarios");
      document
        .getElementById("btn-cargar")
        .addEventListener("click", cargarUsuarios);
      window.addEventListener("DOMContentLoaded", cargarUsuarios);

      async function cargarUsuarios() {
        try {
          const res = await fetch("/api/usuarios");
          if (!res.ok) throw new Error("Respuesta no OK");
          const usuarios = await res.json();
          renderUsuarios(usuarios);
        } catch (err) {
          console.error("Error al cargar usuarios:", err);
          contenedor.innerHTML = `<div class="alert alert-danger">Error al cargar usuarios.</div>`;
        }
      }

      function renderUsuarios(usuarios) {
        contenedor.innerHTML = usuarios
          .map(
            (u) => `
        <div class="col-md-4">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title">${escapeHtml(u.nombre)}</h5>
              <p class="card-text">
                Correo: ${escapeHtml(u.email)}<br>
                Edad: ${Number(u.edad)}
              </p>
            </div>
          </div>
        </div>
      `
          )
          .join("");
      }

      function escapeHtml(str) {
        return String(str)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }
    </script>
  </body>
</html>
```

## Cómo ejecutar

1. Crea la estructura tal cual y coloca los archivos.
2. Ejecuta:

   ```
   node server.js

   ```

3. Abre:

   ```
   http://localhost:3000

   ```

## Qué has aprendido

| Acción                           | Cómo se hace                                         |
| -------------------------------- | ---------------------------------------------------- |
| Exponer datos JSON locales       | Endpoint GET `/api/usuarios` leyendo `usuarios.json` |
| Consumir JSON desde el navegador | `fetch("/api/usuarios").then(...).catch(...)`        |
| Render dinámico sin recargar     | Construcción de tarjetas con JS y Bootstrap          |
| Manejo simple de errores         | Comprobación de `res.ok` y `try/catch`               |
