# JSON en Node.js con JSON.parse()

## ¿Qué hace `JSON.parse()`?

Convierte un **texto JSON** (por ejemplo, el contenido de un archivo `.json` o la respuesta de una API) en un **objeto JavaScript** que puedes usar directamente en tu aplicación backend con Node.js.

- ✅ Si tienes un JSON válido, lo transforma en un objeto o array de JS.
- ✅ Puedes acceder a sus propiedades con `objeto.clave` o `objeto["clave"]`.

## Sintaxis básica

```jsx
const json = '{"nombre": "Mario", "edad": 35}';

const datos = JSON.parse(json);

console.log(datos.nombre); // Mario
```

## Caso real 1: Leer un archivo `.json` con configuración

Imagina que tienes un archivo llamado `config.json`:

```json
{
  "app_name": "MiApp",
  "modo": "produccion",
  "limite_usuarios": 100
}
```

📁 **Archivo: `leer_config.js`**

```jsx
import { readFileSync } from "node:fs";

// 1. Leer archivo
const contenido = readFileSync("config.json", "utf8");

// 2. Convertir JSON a objeto JS
const config = JSON.parse(contenido);

// 3. Acceder a propiedades
console.log("🛠️ Nombre de la app:", config.app_name);
console.log("⚙️ Modo:", config.modo);
console.log("👥 Límite de usuarios:", config.limite_usuarios);
```

✅ Muy útil para almacenar configuraciones de un proyecto sin necesidad de base de datos.

## Caso real 2: Leer JSON desde una API pública

Vamos a usar la API gratuita de [OMDb](https://www.omdbapi.com/) para buscar películas.

La URL de prueba es:

```
https://www.omdbapi.com/?apikey=5b2c4cb3&s=batman

```

📁 **Archivo: `api_peliculas.js`**

```jsx
// 1. Hacer la petición HTTP
const respuesta = await fetch(
  "https://www.omdbapi.com/?apikey=5b2c4cb3&s=batman"
);

// 2. Convertir respuesta a objeto JS
const datos = await respuesta.json();

// 3. Acceder a la lista de películas
const peliculas = datos.Search ?? [];

console.log("🎬 Resultados para 'Batman':");

for (const peli of peliculas) {
  console.log(`📘 ${peli.Title} (${peli.Year})`);
}
```

🧠 Aquí estamos:

- ✅ Llamando a una API REST que responde en JSON
- ✅ Parseando la respuesta automáticamente con `.json()`
- ✅ Mostrando títulos y años de las películas.

## Caso real 3: Leer lista de usuarios desde un archivo `.json`

📁 `usuarios.json`:

```json
[
  { "nombre": "Mario", "email": "mario@ejemplo.com" },
  { "nombre": "Luigi", "email": "luigi@ejemplo.com" }
]
```

📁 `listar_usuarios.js`:

```jsx
import { readFileSync } from "node:fs";

// 1. Leer archivo JSON
const contenido = readFileSync("usuarios.json", "utf8");

// 2. Parsear a array
const usuarios = JSON.parse(contenido);

// 3. Mostrar usuarios
console.log("👥 Lista de usuarios:");
for (const u of usuarios) {
  console.log(`- ${u.nombre} (${u.email})`);
}
```

## Cosas útiles que puedes hacer con `JSON.parse()`

| Uso común                           | Ejemplo                        |
| ----------------------------------- | ------------------------------ |
| Leer datos de configuración         | `config.json`                  |
| Leer una base de datos plana        | `usuarios.json`                |
| Consumir APIs REST                  | `fetch()` + `.json()`          |
| Mostrar resultados en consola o web | Recorrer arrays con `for...of` |
| Acceder a propiedades específicas   | `objeto.nombre`                |

## Buenas prácticas

| Consejo                                                      | Por qué es útil                               |
| ------------------------------------------------------------ | --------------------------------------------- |
| Usa siempre `utf8` al leer archivos                          | Evitas problemas con caracteres               |
| Usa `try/catch` si no estás seguro de que el JSON sea válido | Evitas errores si hay problemas en el archivo |
| Valida las claves antes de usarlas                           | Usa `??` para valores por defecto             |
| No mezcles comillas simples en JSON                          | JSON requiere **comillas dobles**             |

Ejemplo con validación simple:

```jsx
try {
  const contenido = readFileSync("datos.json", "utf8");
  const datos = JSON.parse(contenido);
  console.log("✅ JSON válido:", datos);
} catch (error) {
  console.error("❌ Error al parsear JSON:", error.message);
}
```

## En resumen

| Acción                              | Lo que aprendiste                |
| ----------------------------------- | -------------------------------- |
| Leer un archivo `.json`             | `readFileSync()`                 |
| Convertir JSON a objeto JS          | `JSON.parse()`                   |
| Mostrar los datos con `console.log` | Y recorrer arrays con `for...of` |
| Leer datos desde APIs externas      | Muy útil para apps dinámicas     |
