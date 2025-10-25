# Guardar y leer datos de un archivo JSON en Node.js

## ¿Por qué es útil esto?

Permite guardar información sin usar bases de datos como MySQL.

Ideal para **prototipos**, **ejercicios prácticos** y **proyectos pequeños**.

Los datos quedan guardados en un archivo `.json` local, fácil de leer y modificar.

## ¿Qué aprenderás?

- Cómo **crear** un archivo `.json` con `JSON.stringify()`
- Cómo **agregar** nuevos datos sin borrar los anteriores
- Cómo **leer y mostrar** los datos con `JSON.parse()`

## Caso práctico: guardar mensajes desde un script local

### Estructura sugerida del proyecto

```
guardar-json/
├── index.js              ← Script principal
├── guardar.js            ← Agrega un nuevo mensaje
├── mensajes.json         ← “Base de datos” simulada

```

## Paso 1: Crear `index.js` (mostrar mensajes)

```jsx
import { readFileSync, existsSync } from "node:fs";

// 1. Leer archivo si existe
const archivo = "mensajes.json";
const mensajes = existsSync(archivo)
  ? JSON.parse(readFileSync(archivo, "utf8"))
  : [];

// 2. Mostrar mensajes guardados
console.log("💬 Mensajes guardados:\n");

for (const m of mensajes) {
  console.log(`👤 ${m.nombre}: ${m.mensaje}`);
  console.log(`🕒 ${m.fecha}\n`);
}
```

✅ Este script simplemente lee el archivo `.json` y muestra el contenido por consola.

## Paso 2: Crear `guardar.js` (agregar nuevo mensaje)

```jsx
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// 1. Simulamos datos que podrían venir de un formulario
const nombre = process.argv[2];
const mensaje = process.argv[3];

if (!nombre || !mensaje) {
  console.error(
    "❌ Debes indicar nombre y mensaje. Ej: node guardar.js Mario 'Hola mundo'"
  );
  process.exit(1);
}

// 2. Leer archivo anterior si existe
const archivo = "mensajes.json";
const mensajes = existsSync(archivo)
  ? JSON.parse(readFileSync(archivo, "utf8"))
  : [];

// 3. Agregar nuevo mensaje
mensajes.push({
  nombre,
  mensaje,
  fecha: new Date().toISOString().replace("T", " ").slice(0, 16),
});

// 4. Guardar de nuevo con formato legible
writeFileSync(archivo, JSON.stringify(mensajes, null, 2), "utf8");

console.log(`✅ Mensaje guardado correctamente de ${nombre}`);
```

Cada vez que ejecutes este script, el nuevo mensaje se agregará al final de `mensajes.json` sin borrar los anteriores.

Ejemplo de uso en la terminal:

```
node guardar.js Mario "Hola desde Node"
node guardar.js Luigi "Todo bien"

```

## Resultado

- Los mensajes se almacenan como array de objetos dentro de `mensajes.json`.
- Se pueden leer desde `index.js`.
- No se sobrescriben los mensajes anteriores.
- No necesitas base de datos.

Contenido de `mensajes.json` después de varios mensajes:

```json
[
  {
    "nombre": "Mario",
    "mensaje": "Hola desde Node",
    "fecha": "2025-10-25 12:30"
  },
  {
    "nombre": "Luigi",
    "mensaje": "Todo bien",
    "fecha": "2025-10-25 12:31"
  }
]
```

## Lo que estás usando aquí:

| Acción                           | Método en Node.js              |
| -------------------------------- | ------------------------------ |
| Leer archivo `.json`             | `readFileSync()`               |
| Verificar existencia del archivo | `existsSync()`                 |
| Convertir JSON a objeto          | `JSON.parse()`                 |
| Convertir objeto a JSON          | `JSON.stringify(..., null, 2)` |
| Guardar datos en archivo         | `writeFileSync()`              |
| Mostrar datos en consola         | `console.log()`                |

## Consejos extra

| Tip                               | Para qué sirve                           |
| --------------------------------- | ---------------------------------------- |
| Validar campos antes de guardar   | Evita errores y mensajes vacíos          |
| Guardar con `null, 2`             | Hace que el archivo quede bien indentado |
| Hacer copia de seguridad del JSON | Evita perder datos importantes           |
| Ordenar los mensajes por fecha    | Puedes usar `.reverse()` o `.sort()`     |
