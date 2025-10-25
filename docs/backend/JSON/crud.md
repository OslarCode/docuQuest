# CRUD HTTP nativo con Node.js

## Objetivo

- Exponer endpoints HTTP que operen sobre `data/usuarios.json`.
- Reutilizar `readJsonArray`, `writeJsonArray` y las validaciones.
- Mantener el servidor simple y entendible.

## Estructura del proyecto

```
json-crud/
├── data/
│   └── usuarios.json
├── lib/
│   ├── file-utils.js
│   └── validate.js
└── server.js               ← nuevo (CRUD nativo)

```

> Se asume que file-utils.js y validate.js son los del Módulo 10.

## server.js — Servidor HTTP nativo con CRUD

```jsx
// server.js
import http from "node:http";
import { readJsonArray, writeJsonArray } from "./lib/file-utils.js";
import {
  validarUsuarioNuevo,
  validarUsuarioPatch,
  asegurarEmailUnico,
} from "./lib/validate.js";

const PORT = 3000;

// Utilidad: enviar JSON con status y headers apropiados
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    // CORS básico para pruebas con navegador; quítalo si no lo necesitas
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

// Parsear body JSON de una petición
async function parseJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("JSON inválido");
  }
}

// Router muy básico
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method || "GET";

    // Responder preflight CORS simple
    if (method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      return res.end();
    }

    // Rutas:
    // GET    /api/usuarios
    // GET    /api/usuarios/:id
    // POST   /api/usuarios
    // PUT    /api/usuarios/:id
    // DELETE /api/usuarios/:id

    // 1) GET /api/usuarios
    if (method === "GET" && url.pathname === "/api/usuarios") {
      const usuarios = await readJsonArray();
      return sendJson(res, 200, usuarios);
    }

    // 2) GET /api/usuarios/:id
    if (method === "GET" && url.pathname.startsWith("/api/usuarios/")) {
      const id = Number(url.pathname.split("/").pop());
      if (Number.isNaN(id)) return sendJson(res, 400, { error: "id inválido" });

      const usuarios = await readJsonArray();
      const user = usuarios.find((u) => u.id === id);
      if (!user) return sendJson(res, 404, { error: "No encontrado" });

      return sendJson(res, 200, user);
    }

    // 3) POST /api/usuarios  (crear)
    if (method === "POST" && url.pathname === "/api/usuarios") {
      // Content-Type esperado: application/json
      if (!/^application\/json/i.test(req.headers["content-type"] || "")) {
        return sendJson(res, 415, {
          error: "Content-Type debe ser application/json",
        });
      }

      let payload;
      try {
        payload = await parseJsonBody(req);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }

      try {
        validarUsuarioNuevo(payload);
        const usuarios = await readJsonArray();
        asegurarEmailUnico(usuarios, payload.email);

        const nextId = usuarios.length
          ? Math.max(...usuarios.map((u) => u.id || 0)) + 1
          : 1;

        const nuevo = {
          id: nextId,
          nombre: String(payload.nombre).trim(),
          email: String(payload.email).trim(),
          edad: payload.edad,
          fecha: new Date().toISOString().replace("T", " ").slice(0, 16),
        };

        usuarios.push(nuevo);
        await writeJsonArray(usuarios);
        return sendJson(res, 201, nuevo);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }
    }

    // 4) PUT /api/usuarios/:id  (actualizar parcial o total)
    if (method === "PUT" && url.pathname.startsWith("/api/usuarios/")) {
      if (!/^application\/json/i.test(req.headers["content-type"] || "")) {
        return sendJson(res, 415, {
          error: "Content-Type debe ser application/json",
        });
      }

      const id = Number(url.pathname.split("/").pop());
      if (Number.isNaN(id)) return sendJson(res, 400, { error: "id inválido" });

      let patch;
      try {
        patch = await parseJsonBody(req);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }

      // Validación de patch (solo valida lo que venga)
      try {
        validarUsuarioPatch(patch);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }

      const usuarios = await readJsonArray();
      const idx = usuarios.findIndex((u) => u.id === id);
      if (idx === -1) return sendJson(res, 404, { error: "No encontrado" });

      // Si cambia email, asegurar unicidad
      if (patch.email) {
        try {
          asegurarEmailUnico(usuarios, patch.email, id);
        } catch (e) {
          return sendJson(res, 400, { error: e.message });
        }
      }

      usuarios[idx] = { ...usuarios[idx], ...patch };
      await writeJsonArray(usuarios);
      return sendJson(res, 200, usuarios[idx]);
    }

    // 5) DELETE /api/usuarios/:id
    if (method === "DELETE" && url.pathname.startsWith("/api/usuarios/")) {
      const id = Number(url.pathname.split("/").pop());
      if (Number.isNaN(id)) return sendJson(res, 400, { error: "id inválido" });

      const usuarios = await readJsonArray();
      const exists = usuarios.some((u) => u.id === id);
      if (!exists) return sendJson(res, 404, { error: "No encontrado" });

      const nuevos = usuarios.filter((u) => u.id !== id);
      await writeJsonArray(nuevos);
      // 204 No Content: no enviamos cuerpo
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      return res.end();
    }

    // 404 por defecto
    return sendJson(res, 404, { error: "Ruta no encontrada" });
  } catch (err) {
    // 500 por defecto
    return sendJson(res, 500, { error: "Error interno" });
  }
});

server.listen(PORT, () => {
  console.log(`API en http://localhost:${PORT}`);
});
```

## Cómo probar rápidamente (curl)

Crear:

```
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Mario","email":"mario@mail.com","edad":35}'

```

Listar:

```
curl http://localhost:3000/api/usuarios

```

Obtener por id:

```
curl http://localhost:3000/api/usuarios/1

```

Actualizar parcial (PUT):

```
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@new.com","edad":36}'

```

Eliminar:

```
curl -X DELETE http://localhost:3000/api/usuarios/1

```

## Notas didácticas

- Usamos `PUT` para actualización parcial por simplicidad. Si quisieras seguir la convención estricta, podrías usar `PATCH` para parcial y `PUT` para reemplazo completo. Para mantener el módulo simple, dejamos solo `PUT`.
- El CORS básico está habilitado para que puedas llamar a la API desde un `index.html` local con `fetch`. Si no lo necesitas, quítalo.
- La validación se concentra en `validate.js`. Si cambia el modelo de datos, actualiza ahí.
- La escritura es segura vía `writeJsonArray` (temporal + rename).
