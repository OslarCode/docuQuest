# Actualizar y eliminar datos en archivos JSON con Node.js

## Objetivo

- Leer un fichero `.json` a memoria.
- Localizar registros por `id`.
- Actualizar campos puntuales o varios a la vez.
- Eliminar registros por `id`.
- Guardar de nuevo el archivo con formato legible.
- Manejar errores básicos (archivo inexistente, JSON corrupto, ids no encontrados).

## Estructura propuesta

```
json-crud/
├── data/
│   └── usuarios.json        ← datos persistentes
├── lib/
│   └── file-utils.js        ← utilidades de lectura/escritura
├── list.js                  ← listar usuarios
├── update.js                ← actualizar por id
└── delete.js                ← eliminar por id

```

## Paso 1) Datos de ejemplo `data/usuarios.json`

```json
[
  { "id": 1, "nombre": "Mario", "email": "mario@nintendo.com", "edad": 35 },
  { "id": 2, "nombre": "Luigi", "email": "luigi@nintendo.com", "edad": 34 },
  { "id": 3, "nombre": "Peach", "email": "peach@nintendo.com", "edad": 28 }
]
```

## Paso 2) Utilidades comunes `lib/file-utils.js`

```jsx
// lib/file-utils.js
import { readFile, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al JSON
export const DATA_PATH = path.join(__dirname, "..", "data", "usuarios.json");

export async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function readJsonArray(filePath = DATA_PATH) {
  if (!(await exists(filePath))) return [];
  const txt = await readFile(filePath, "utf8");
  if (!txt.trim()) return [];
  try {
    const parsed = JSON.parse(txt);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // JSON corrupto: por seguridad devolvemos lista vacía
    return [];
  }
}

export async function writeJsonArray(arr, filePath = DATA_PATH) {
  const json = JSON.stringify(arr, null, 2);
  await writeFile(filePath, json, "utf8");
}
```

## Paso 3) Listar usuarios `list.js`

```jsx
// list.js
import { readJsonArray } from "./lib/file-utils.js";

const usuarios = await readJsonArray();
if (usuarios.length === 0) {
  console.log("No hay usuarios.");
  process.exit(0);
}

for (const u of usuarios) {
  console.log(`${u.id} | ${u.nombre} | ${u.email} | ${u.edad}`);
}
```

Ejecuta:

```
node list.js

```

## Paso 4) Actualizar por id `update.js`

Actualiza uno o varios campos. Recibe:

1. `id` (numérico)
2. pares `clave=valor` (por ejemplo `email=nuevo@mail.com` `edad=30`)

```jsx
// update.js
import { readJsonArray, writeJsonArray } from "./lib/file-utils.js";

function parseArgsToPatch(argv) {
  // argv: ["id", "campo=valor", "otro=valor", ...]
  const patch = {};
  for (const kv of argv) {
    const idx = kv.indexOf("=");
    if (idx === -1) continue;
    const key = kv.slice(0, idx).trim();
    const val = kv.slice(idx + 1).trim();

    // Conversión básica de tipos: number, boolean, null
    if (/^-?\d+(\.\d+)?$/.test(val)) {
      patch[key] = Number(val);
    } else if (val === "true" || val === "false") {
      patch[key] = val === "true";
    } else if (val === "null") {
      patch[key] = null;
    } else {
      patch[key] = val;
    }
  }
  return patch;
}

const [idArg, ...rest] = process.argv.slice(2);
if (!idArg) {
  console.error("Uso: node update.js <id> campo=valor [campo2=valor2 ...]");
  process.exit(1);
}

const id = Number(idArg);
if (Number.isNaN(id)) {
  console.error("El id debe ser numérico.");
  process.exit(1);
}

const patch = parseArgsToPatch(rest);
if (Object.keys(patch).length === 0) {
  console.error("Debes indicar al menos un campo=valor a actualizar.");
  process.exit(1);
}

const usuarios = await readJsonArray();
const idx = usuarios.findIndex((u) => u.id === id);

if (idx === -1) {
  console.error(`No existe un usuario con id ${id}.`);
  process.exit(1);
}

// Mezclamos campos existentes con el patch
usuarios[idx] = { ...usuarios[idx], ...patch };

await writeJsonArray(usuarios);
console.log(`Usuario ${id} actualizado.`);
```

Ejemplos:

```
node update.js 2 email=luigi@newmail.com
node update.js 3 nombre=Princesa_Peach edad=29
node update.js 1 activo=true
node update.js 1 nota=null

```

Notas:

- Conversión automática básica de tipos en línea de comandos.
- Si necesitas actualizar campos anidados, en este módulo básico no tratamos paths del tipo `perfil.contacto.telefono`. Si lo necesitas, se puede añadir un helper con acceso por ruta.

## Paso 5) Eliminar por id `delete.js`

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

const usuarios = await readJsonArray();
const exists = usuarios.some((u) => u.id === id);

if (!exists) {
  console.error(`No existe un usuario con id ${id}.`);
  process.exit(1);
}

const nuevos = usuarios.filter((u) => u.id !== id);
await writeJsonArray(nuevos);
console.log(`Usuario ${id} eliminado.`);
```

Ejemplo:

```
node delete.js 2

```

## Comprobación rápida del flujo

1. Listar:

```
node list.js

```

1. Actualizar email del id 3:

```
node update.js 3 email=peach@royal.org

```

1. Eliminar id 1:

```
node delete.js 1

```

1. Volver a listar:

```
node list.js

```

## Buenas prácticas mínimas

- Haz siempre copia de seguridad del `.json` si contiene datos reales.
- Valida tipos y rangos básicos (p. ej., `edad >= 0`).
- Define un criterio claro de unicidad para `id`. Si vas a crear registros nuevos en otros módulos, genera `id` con `Math.max(...ids) + 1` o un uuid.
- Usa `JSON.stringify(arr, null, 2)` para mantener el archivo legible.

## Extensiones posibles (siguientes módulos sencillos)

- Actualización parcial con rutas anidadas (`perfil.contacto.telefono`).
- Borrado masivo por filtro.
- Pequeño CRUD HTTP nativo con rutas GET/POST/PUT/DELETE sobre este mismo archivo.
- Paginación y ordenación en memoria.
