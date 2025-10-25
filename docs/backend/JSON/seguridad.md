# Seguridad básica y buenas prácticas

## Objetivo

- Rechazar bodies demasiado grandes.
- Aceptar solo `Content-Type: application/json` donde toca.
- Validar y **whitelist** de campos (POST/PUT).
- Saneado de strings y control de claves peligrosas.
- CORS razonable y cabeceras de seguridad.
- Rate-limit mínimo en memoria.
- (Opcional) límites sobre el archivo JSON.

> Mantiene la API y el cliente previos sin romperlos.

## 1) Cambios en `server.js`

### 1.1 Constantes y utilidades (arriba del archivo)

```jsx
const PORT = 3000;

// Seguridad: límites y CORS
const MAX_BODY_BYTES = 10 * 1024; // 10KB por petición JSON
const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5500", // por si sirves el cliente estático
  "http://127.0.0.1:5500",
]);

// Rate limit simple (p. ej., 60 req/min por IP)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
const rateMap = new Map(); // ip -> {count, start}

// Helpers CORS y cabeceras de seguridad
function applySecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  // Como es una API, un CSP simple de “nada por defecto”
  res.setHeader("Content-Security-Policy", "default-src 'none'");
}

function allowCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Rate limit naive por IP
function checkRateLimit(req, res) {
  const ip = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
    // reinicia ventana
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  if (entry.count > RATE_LIMIT_MAX) {
    return false; // bloqueado
  }
  return true;
}

// Whitelist de campos permitidos en POST/PUT
const ALLOWED_FIELDS = new Set(["nombre", "email", "edad"]);

// Saneado y filtros anti-prototype-pollution
function isDangerKey(key) {
  return key === "__proto__" || key === "constructor" || key === "prototype";
}
function sanitizeString(s) {
  // trim + colapsar espacios + quitar controles no imprimibles básicos
  return String(s)
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, "");
}
function pickAndSanitizePayload(raw) {
  const out = {};
  for (const [k, v] of Object.entries(raw)) {
    if (isDangerKey(k)) continue; // bloquear claves peligrosas
    if (!ALLOWED_FIELDS.has(k)) continue; // solo campos permitidos
    if (k === "nombre" || k === "email") {
      out[k] = sanitizeString(v);
    } else if (k === "edad") {
      out[k] = Number(v);
    }
  }
  return out;
}
```

### 1.2 `sendJson` y `OPTIONS` (añade seguridad y CORS)

En tu `sendJson`, antes de `res.end`:

```jsx
function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  applySecurityHeaders(res);
  // CORS se aplica en cada ruta con allowCors(req,res) antes de llamar a sendJson
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}
```

En el handler de `OPTIONS` (pre-flight), añade:

```jsx
if (method === "OPTIONS") {
  applySecurityHeaders(res);
  allowCors(req, res);
  res.writeHead(204);
  return res.end();
}
```

### 1.3 Límite de tamaño y parseo seguro del body

Reemplaza tu `parseJsonBody` por esta versión con límite de bytes y tipo:

```jsx
async function parseJsonBody(req) {
  const ct = req.headers["content-type"] || "";
  if (!/^application\/json\b/i.test(ct)) {
    throw new Error("Content-Type debe ser application/json");
  }
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_BODY_BYTES) {
      throw new Error("Body demasiado grande");
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("JSON inválido");
  }
}
```

### 1.4 Aplica CORS, rate-limit y cabeceras de seguridad por petición

Justo al entrar al `createServer` (antes del router):

```jsx
const server = http.createServer(async (req, res) => {
  try {
    applySecurityHeaders(res);
    allowCors(req, res);

    if (!checkRateLimit(req, res)) {
      return sendJson(res, 429, { error: "Demasiadas peticiones" });
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const method = req.method || "GET";
    // ...

```

### 1.5 Endpoints POST y PUT con whitelist y saneado

En **POST /api/usuarios** (sustituye la parte donde usas `payload`):

```jsx
if (method === "POST" && url.pathname === "/api/usuarios") {
  try {
    const raw = await parseJsonBody(req);
    const payload = pickAndSanitizePayload(raw); // ← whitelist + saneado
    validarUsuarioNuevo(payload); // ← reglas del Módulo 10
    const usuarios = await readJsonArray();
    asegurarEmailUnico(usuarios, payload.email);

    const nextId = usuarios.length
      ? Math.max(...usuarios.map((u) => u.id || 0)) + 1
      : 1;

    const nuevo = {
      id: nextId,
      nombre: payload.nombre,
      email: payload.email,
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
```

En **PUT /api/usuarios/:id** (sustituye donde montas `patch`):

```jsx
if (method === "PUT" && url.pathname.startsWith("/api/usuarios/")) {
  const id = Number(url.pathname.split("/").pop());
  if (Number.isNaN(id)) return sendJson(res, 400, { error: "id inválido" });

  let patchRaw;
  try {
    patchRaw = await parseJsonBody(req);
  } catch (e) {
    return sendJson(res, 400, { error: e.message });
  }

  const patch = pickAndSanitizePayload(patchRaw); // ← whitelist+saneado
  try {
    validarUsuarioPatch(patch);
  } catch (e) {
    return sendJson(res, 400, { error: e.message });
  }

  const usuarios = await readJsonArray();
  const idx = usuarios.findIndex((u) => u.id === id);
  if (idx === -1) return sendJson(res, 404, { error: "No encontrado" });

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
```

> GET y DELETE no requieren cambios relevantes para seguridad básica, más allá de CORS, rate-limit y cabeceras.

## 2) Ajustes menores en `lib/validate.js`

Refuerza reglas para que el saneado + validación se den la mano:

```jsx
// validarUsuarioNuevo(data)
if (data.nombre.length < 2) {
  throw new Error("Nombre demasiado corto.");
}
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
  throw new Error("Email inválido.");
}
if (!Number.isInteger(data.edad) || data.edad < 0 || data.edad > 120) {
  throw new Error("Edad inválida (0-120).");
}

// validarUsuarioPatch(patch)
if ("nombre" in patch && patch.nombre.length < 2) {
  throw new Error("Nombre demasiado corto en patch.");
}
if ("email" in patch && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(patch.email)) {
  throw new Error("Email inválido en patch.");
}
if (
  "edad" in patch &&
  (!Number.isInteger(patch.edad) || patch.edad < 0 || patch.edad > 120)
) {
  throw new Error("Edad inválida en patch (0-120).");
}
```

## 3) (Opcional) Límite de tamaño del archivo JSON

En `lib/file-utils.js`, antes de leer, puedes rechazar archivos descomunales:

```jsx
import { stat } from "node:fs/promises";
const MAX_JSON_FILE_BYTES = 5 * 1024 * 1024; // 5MB

export async function readJsonArray(filePath = DATA_PATH) {
  if (!(await exists(filePath))) return [];
  try {
    const s = await stat(filePath);
    if (s.size > MAX_JSON_FILE_BYTES) {
      // Evita cargar archivos desorbitados
      return [];
    }
  } catch {}
  // ... resto igual
}
```

## 4) Resumen de defensas añadidas

- **Tamaño de body**: corta peticiones > 10KB.
- **Content-Type**: exige `application/json` en POST/PUT.
- **Whitelist + saneado**: solo `nombre`, `email`, `edad`, limpiando strings.
- **Claves peligrosas**: bloqueadas `__proto__`, `constructor`, `prototype`.
- **Validación**: tipos, rango, formato de email, unicidad.
- **Rate-limit**: 60 peticiones/min por IP (en memoria).
- **CORS**: solo orígenes permitidos; expone cabeceras cuando hace falta.
- **Cabeceras de seguridad**: `X-Content-Type-Options`, `Referrer-Policy`, `CSP` mínimo.
- **(Opc.) Límite de tamaño del .json** para evitar lecturas enormes.

## Qué no hace (a propósito)

- No cifra ni autentica: eso sería otro bloque (auth, tokens, sesiones).
- No persiste rate-limit entre reinicios (en memoria es suficiente para clase).
- No registra auditoría; puedes añadir logs si lo necesitas.
