# Servidores web con Node.js

## Introducción

Antes de usar frameworks como Express o Nest, es vital que entiendas **cómo Node.js puede crear un servidor web básico por sí mismo** usando el módulo interno `http`. Esto te ayuda a comprender conceptos fundamentales como:

- Peticiones y respuestas HTTP
- Rutas (URLs)
- Cabeceras (`headers`)
- Códigos de estado
- Envío de HTML, JSON y archivos estáticos

Al terminar este módulo serás capaz de montar un servidor que escuche peticiones en un puerto, responda con diferentes contenidos según la ruta, y maneje errores o rutas no encontradas.

## Tu primer servidor HTTP en Node.js

Node incluye un módulo llamado `http` que permite crear un servidor sin necesidad de instalar nada.

### Código básico

```jsx
// server.js

// Importamos el módulo 'http' que viene integrado en Node.js
// Este módulo permite crear servidores web.
const http = require("http");

// Creamos el servidor usando http.createServer()
// Esta función recibe un callback que maneja las peticiones (req) y respuestas (res)
const server = http.createServer((req, res) => {
  // Escribimos la cabecera de la respuesta HTTP con el código de estado 200 (OK)
  // y el tipo de contenido como texto plano.
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Finalizamos la respuesta enviando el mensaje de texto al cliente.
  res.end("¡Hola desde Node.js sin frameworks!");
});

// Indicamos al servidor que escuche en el puerto 3000
// y definimos un callback que se ejecuta cuando el servidor empieza a escuchar.
server.listen(3000, () => {
  // Mostramos un mensaje en la consola para indicar que el servidor está funcionando.
  console.log("🚀 Servidor escuchando en http://localhost:3000");
});
```

Este código ya te permite visitar `http://localhost:3000` y ver una respuesta.

## Rutas básicas

Podemos responder cosas distintas según la URL (`req.url`) y el método (`req.method`):

```jsx
// Importamos el módulo 'http' incorporado en Node.js
const http = require("http");

// Creamos un servidor HTTP
// La función que recibe maneja cada petición (req) y genera una respuesta (res)
const server = http.createServer((req, res) => {
  // Si la URL es "/" y el método es GET, mostramos la página principal
  if (req.url === "/" && req.method === "GET") {
    // Enviamos una cabecera con estado 200 (OK) y tipo de contenido HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    // Enviamos un mensaje HTML como respuesta
    res.end("<h1>Página principal</h1>");

    // Si la URL es "/api" y el método es GET, respondemos con JSON
  } else if (req.url === "/api" && req.method === "GET") {
    // Cabecera con estado 200 y tipo de contenido JSON
    res.writeHead(200, { "Content-Type": "application/json" });
    // Enviamos un objeto convertido a JSON como respuesta
    res.end(JSON.stringify({ mensaje: "Hola desde la API" }));

    // Si no coincide con ninguna ruta, devolvemos un error 404
  } else {
    // Estado 404 (no encontrado) y tipo de contenido texto plano
    res.writeHead(404, { "Content-Type": "text/plain" });
    // Mensaje de error como respuesta
    res.end("404 - No encontrado");
  }
});

// Iniciamos el servidor para que escuche en el puerto 3000
server.listen(3000, () => {
  // Mostramos un mensaje en consola cuando el servidor esté activo
  console.log("Servidor escuchando en http://localhost:3000");
});
```

Este servidor responde HTML en la raíz `/`, JSON en `/api`, y un error `404` para cualquier otra ruta.

## Sirviendo HTML desde archivos

Para no incrustar HTML en el código, puedes **leer archivos HTML y servirlos como respuesta**:

```jsx
// Importamos el módulo 'http' para crear el servidor
const http = require("http");

// Importamos el módulo 'fs' (filesystem) para leer archivos del sistema
const fs = require("fs");

// Importamos el módulo 'path' para construir rutas de forma segura y multiplataforma
const path = require("path");

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
  // Si el usuario accede a la raíz ("/"), servimos el archivo index.html
  if (req.url === "/") {
    // Construimos la ruta absoluta hacia el archivo index.html dentro de la carpeta 'public'
    const rutaArchivo = path.join(__dirname, "public", "index.html");

    // Leemos el archivo HTML usando fs.readFile()
    fs.readFile(rutaArchivo, (err, contenido) => {
      // Si hay un error al leer el archivo (por ejemplo, no existe), devolvemos error 500
      if (err) {
        res.writeHead(500); // Error interno del servidor
        res.end("Error interno del servidor");
        return;
      }

      // Si el archivo se lee correctamente, enviamos estado 200 y tipo HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(contenido); // Enviamos el contenido del archivo al navegador
    });

    // Si accede a cualquier otra ruta, respondemos con 404
  } else {
    res.writeHead(404); // Página no encontrada
    res.end("Página no encontrada");
  }
});

// Ponemos el servidor a escuchar en el puerto 3000
server.listen(3000, () => {
  // Mostramos en consola que el servidor está corriendo
  console.log("🌐 Servidor iniciado en http://localhost:3000");
});
```

Crea una carpeta `public/` con un archivo `index.html` y pruébalo.

## Enviando archivos estáticos (CSS, imágenes...)

Para permitir el acceso a archivos como `style.css` o imágenes `.png`, necesitas detectar su extensión y responder con el tipo MIME correcto:

```jsx
// Definimos un objeto que relaciona extensiones de archivo con sus tipos MIME
// Esto se usará para indicar el tipo de contenido correcto en la respuesta HTTP
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
  // Si la URL es "/", cargamos "/index.html" por defecto. En otros casos, usamos la ruta tal cual.
  let ruta = req.url === "/" ? "/index.html" : req.url;

  // Construimos la ruta completa al archivo dentro de la carpeta 'public'
  const rutaArchivo = path.join(__dirname, "public", ruta);

  // Obtenemos la extensión del archivo solicitado (por ejemplo, ".html", ".css", etc.)
  const ext = path.extname(rutaArchivo);

  // Buscamos el tipo MIME en el objeto 'mime'. Si no lo encuentra, usa "text/plain" por defecto.
  const tipo = mime[ext] || "text/plain";

  // Leemos el archivo solicitado desde el sistema de archivos
  fs.readFile(rutaArchivo, (err, contenido) => {
    if (err) {
      // Si hay un error (por ejemplo, el archivo no existe), respondemos con error 404
      res.writeHead(404);
      res.end("Archivo no encontrado");
    } else {
      // Si el archivo se lee correctamente, enviamos código 200 y el tipo MIME correspondiente
      res.writeHead(200, { "Content-Type": tipo });

      // Enviamos el contenido del archivo como respuesta
      res.end(contenido); // ← ⚠️ ¡Hay un error de escritura aquí!
    }
  });
});
```

Esto te permite cargar HTML, CSS, JS e imágenes en rutas normales (`/`, `/style.css`, `/logo.png`, etc.).

### ¿Qué hace este servidor?

- Sirve **cualquier archivo estático** desde la carpeta `public`: `.html`, `.css`, `.js`, imágenes, etc.
- Detecta automáticamente el tipo de archivo y ajusta el `Content-Type` correcto.
- Muestra un error 404 si el archivo no existe.

## Ejercicio práctico: servidor con HTML, CSS y JSON

1. Crea una carpeta `public/` con estos archivos:

**`index.html`**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Servidor Node.js</title>
    <link rel="stylesheet" href="/estilo.css" />
  </head>
  <body>
    <h1>Bienvenido a mi servidor sin frameworks</h1>
    <p>Este contenido viene de un archivo HTML</p>
  </body>
</html>
```

**`estilo.css`**

```css
body {
  background-color: #f2f2f2;
  font-family: sans-serif;
  text-align: center;
  padding: 50px;
}
```

1. Ejecuta el servidor y accede a:
   - `http://localhost:3000/`
   - `http://localhost:3000/api` → Respuesta JSON
   - `http://localhost:3000/estilo.css` → Archivo CSS servido correctamente

## ¿Qué has aprendido?

- Cómo crear un servidor HTTP básico
- Cómo manejar rutas sin frameworks
- Cómo servir HTML, JSON y archivos estáticos
- Cómo usar módulos internos (`http`, `fs`, `path`)
- Cómo responder correctamente con cabeceras y estados HTTP

## Recursos adicionales

- [Node.js HTTP module](https://nodejs.org/api/http.html)
- [MDN HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Node.js MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
