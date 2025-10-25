# Validación y control de errores con JSON

## Objetivo

- Validar campos y tipos antes de crear o actualizar.
- Rechazar entradas incompletas o mal formadas.
- Manejar JSON vacío o corrupto sin romper la app.
- Escribir el archivo de forma segura.
- Centralizar reglas de negocio en un único sitio.

## Estructura propuesta

```
json-crud/
├── data/
│   └── usuarios.json
├── lib/
│   ├── file-utils.js      ← lectura/escritura segura
│   └── validate.js        ← reglas de validación
├── create.js              ← crear registro con validación
├── update.js              ← actualizar con validación parcial
├── delete.js
└── list.js

```

> Si ya tienes los ficheros del Módulo 9, solo añade validate.js y mejora file-utils.js, create.js y update.js con las validaciones.

## `lib/validate.js` — Reglas de validación

```jsx
// lib/validate.js

// Reglas de negocio mínimas. Ajusta según tu dominio.
export function validarUsuarioNuevo(data) {
  // Campos obligatorios
  if (typeof data.nombre !== "string" || !data.nombre.trim()) {
    throw new Error("El nombre es obligatorio y debe ser texto.");
  }
  if (typeof data.email !== "string" || !data.email.includes("@")) {
    throw new Error("Email inválido.");
  }
  if (!Number.isInteger(data.edad) || data.edad < 0) {
    throw new Error("Edad inválida. Debe ser entero >= 0.");
  }
  return true;
}

// Validación parcial para updates. Solo valida lo que venga en 'patch'.
export function validarUsuarioPatch(patch) {
  if ("nombre" in patch) {
    if (typeof patch.nombre !== "string" || !patch.nombre.trim()) {
      throw new Error("Nombre inválido en patch.");
    }
  }
  if ("email" in patch) {
    if (typeof patch.email !== "string" || !patch.email.includes("@")) {
      throw new Error("Email inválido en patch.");
    }
  }
  if ("edad" in patch) {
    if (!Number.isInteger(patch.edad) || patch.edad < 0) {
      throw new Error("Edad inválida en patch.");
    }
  }
  return true;
}

// Utilidad opcional para evitar colisiones de email
export function asegurarEmailUnico(usuarios, email, idIgnorar = null) {
  const duplicado = usuarios.some(
    (u) => u.email === email && u.id !== idIgnorar
  );
  if (duplicado) {
    throw new Error("Email ya existente.");
  }
}
```

## `lib/file-utils.js` — Lectura/escritura robusta

```jsx
// lib/file-utils.js
import { readFile, writeFile, access, rename } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DATA_PATH = path.join(__dirname, "..", "data", "usuarios.json");

// Comprobar existencia
export async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// Lectura segura: si no existe o está vacío/corrupto, devuelve []
export async function readJsonArray(filePath = DATA_PATH) {
  if (!(await exists(filePath))) return [];
  let txt = "";
  try {
    txt = await readFile(filePath, "utf8");
  } catch {
    return [];
  }
  if (!txt.trim()) return [];
  try {
    const data = JSON.parse(txt);
    return Array.isArray(data) ? data : [];
  } catch {
    // JSON corrupto: no reventar; devolver []
    return [];
  }
}

// Escritura atómica simple: escribir en tmp y renombrar
export async function writeJsonArray(arr, filePath = DATA_PATH) {
  const json = JSON.stringify(arr, null, 2);
  const tmpPath = filePath + "." + process.pid + "." + Date.now() + ".tmp";
  await writeFile(tmpPath, json, "utf8");
  await rename(tmpPath, filePath);
}
```

> La escritura “atómica” evita archivos a medias si el proceso se interrumpe. Es suficiente para este nivel.

## `create.js` — Crear con validación y unicidad de email

```jsx
// create.js
import { readJsonArray, writeJsonArray } from "./lib/file-utils.js";
import { validarUsuarioNuevo, asegurarEmailUnico } from "./lib/validate.js";

// Uso: node create.js nombre="Mario" email=mario@mail.com edad=35
function parseArgs(argv) {
  const obj = {};
  for (const arg of argv) {
    const i = arg.indexOf("=");
    if (i === -1) continue;
    const k = arg.slice(0, i);
    const v = arg.slice(i + 1);
    if (/^-?\d+$/.test(v)) obj[k] = Number(v);
    else obj[k] = v;
  }
  return obj;
}

const payload = parseArgs(process.argv.slice(2));

try {
  validarUsuarioNuevo(payload);

  const usuarios = await readJsonArray();
  asegurarEmailUnico(usuarios, payload.email);

  const nextId = usuarios.length
    ? Math.max(...usuarios.map((u) => u.id || 0)) + 1
    : 1;
  const nuevo = {
    id: nextId,
    nombre: payload.nombre.trim(),
    email: payload.email.trim(),
    edad: payload.edad,
    fecha: new Date().toISOString().replace("T", " ").slice(0, 16),
  };

  usuarios.push(nuevo);
  await writeJsonArray(usuarios);

  console.log(`Creado id=${nuevo.id}`);
  process.exit(0);
} catch (err) {
  console.error("Error al crear:", err.message);
  process.exit(1);
}
```

## `update.js` — Actualización parcial con validación de patch

```jsx
// update.js
import { readJsonArray, writeJsonArray } from "./lib/file-utils.js";
import { validarUsuarioPatch, asegurarEmailUnico } from "./lib/validate.js";

// Uso: node update.js 3 nombre=Peach email=peach@royal.org edad=29
function parseArgsToPatch(argv) {
  const patch = {};
  for (const kv of argv) {
    const i = kv.indexOf("=");
    if (i === -1) continue;
    const key = kv.slice(0, i);
    const raw = kv.slice(i + 1);
    if (/^-?\d+$/.test(raw)) patch[key] = Number(raw);
    else if (raw === "null") patch[key] = null;
    else if (raw === "true" || raw === "false") patch[key] = raw === "true";
    else patch[key] = raw;
  }
  return patch;
}

const [idArg, ...rest] = process.argv.slice(2);
if (!idArg) {
  console.error("Uso: node update.js <id> campo=valor ...");
  process.exit(1);
}

const id = Number(idArg);
if (Number.isNaN(id)) {
  console.error("El id debe ser numérico.");
  process.exit(1);
}

const patch = parseArgsToPatch(rest);
if (!Object.keys(patch).length) {
  console.error("Debes indicar al menos un campo=valor.");
  process.exit(1);
}

try {
  const usuarios = await readJsonArray();
  const idx = usuarios.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error(`No existe usuario con id ${id}.`);

  // Validación del patch (solo lo que venga)
  validarUsuarioPatch(patch);

  // Si se cambia email, asegurar unicidad
  if (patch.email) {
    asegurarEmailUnico(usuarios, patch.email, id);
  }

  usuarios[idx] = { ...usuarios[idx], ...patch };
  await writeJsonArray(usuarios);
  console.log(`Usuario ${id} actualizado.`);
  process.exit(0);
} catch (err) {
  console.error("Error al actualizar:", err.message);
  process.exit(1);
}
```

## `delete.js` — Eliminar con chequeos mínimos

```jsx
// delete.js
import { readJsonArray, writeJsonArray } from "./lib/file-utils.js";

const idArg = process.argv[2];
if (!idArg) {
  console.error("Uso: node delete.js <id>");
  process.exit(1);
}

const id = Number(idArg);
if (Number.isNaN(id)) {
  console.error("El id debe ser numérico.");
  process.exit(1);
}

try {
  const usuarios = await readJsonArray();
  const existe = usuarios.some((u) => u.id === id);
  if (!existe) throw new Error(`No existe usuario con id ${id}.`);
  const nuevos = usuarios.filter((u) => u.id !== id);
  await writeJsonArray(nuevos);
  console.log(`Usuario ${id} eliminado.`);
  process.exit(0);
} catch (err) {
  console.error("Error al eliminar:", err.message);
  process.exit(1);
}
```

## Pruebas manuales rápidas

1. Crear:

```
node create.js nombre="Mario" email=mario@mail.com edad=35
node create.js nombre="Luigi" email=luigi@mail.com edad=34

```

1. Duplicado de email (debe fallar):

```
node create.js nombre="Otro" email=mario@mail.com edad=20

```

1. Update parcial con validación:

```
node update.js 1 email=mario@new.com
node update.js 2 edad=33

```

1. Update inválido (edad negativa, debe fallar):

```
node update.js 2 edad=-1

```

1. Delete:

```
node delete.js 1

```

## Errores típicos y cómo se gestionan

| Problema                   | Comportamiento del módulo                     |
| -------------------------- | --------------------------------------------- |
| Archivo no existe          | `readJsonArray()` devuelve `[]`.              |
| Archivo vacío              | Devuelve `[]`.                                |
| Archivo corrupto           | Devuelve `[]` sin romper el flujo.            |
| Faltan campos obligatorios | `validarUsuarioNuevo()` lanza error claro.    |
| Tipos incorrectos en patch | `validarUsuarioPatch()` lanza error claro.    |
| Email duplicado            | `asegurarEmailUnico()` lanza error.           |
| Escritura interrumpida     | Escritura atómica: primero tmp, luego rename. |

## Recomendaciones mínimas

- No guardes datos sensibles en JSON plano.
- Haz copia de seguridad del archivo si los datos importan.
- Mantén mensajes de error claros y consistentes.
- Si vas a crecer, separa validaciones por contexto (crear vs actualizar) y añade más reglas.
