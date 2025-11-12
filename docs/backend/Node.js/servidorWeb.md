# Servidores Web con Node.js y ES Modules

## Introducción

Antes de utilizar frameworks como Express o Nest, es fundamental comprender **cómo Node.js puede crear un servidor web básico por sí mismo** usando el módulo interno `http`. Este conocimiento te ayuda a comprender conceptos esenciales que son la base de cualquier desarrollo web:

- Peticiones y respuestas HTTP
- Rutas y URLs
- Cabeceras HTTP
- Códigos de estado
- Envío de HTML, JSON y archivos estáticos

Al finalizar este módulo, serás capaz de implementar un servidor completo que escuche peticiones en un puerto, responda con diferentes contenidos según la ruta solicitada, maneje errores correctamente y sirva archivos estáticos.

## Configuración Inicial para ES Modules

Para utilizar ES Modules en Node.js, necesitamos configurar nuestro proyecto adecuadamente. Crea un archivo `package.json` con el siguiente contenido:

```json
{
  "type": "module",
  "name": "mi-servidor-web",
  "version": "1.0.0",
  "description": "Servidor web con Node.js y ES Modules",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  }
}
```

La línea `"type": "module"` es crucial, ya que le indica a Node.js que use el sistema de módulos ES6 en lugar de CommonJS.

## Tu Primer Servidor HTTP en Node.js

Node.js incluye un módulo llamado `http` que permite crear servidores web sin necesidad de instalar dependencias externas. Vamos a crear nuestro primer servidor paso a paso.

### Código Básico del Servidor

```javascript
// server.js

// Importamos el módulo 'http' que viene integrado en Node.js
// En ES Modules usamos 'import' en lugar de 'require'
// Este módulo proporciona todas las herramientas necesarias para crear servidores HTTP
import http from "http";

// Creamos el servidor usando http.createServer()
// Esta función recibe un callback que se ejecuta por cada petición recibida
// El callback recibe dos parámetros:
// - req: objeto que representa la petición del cliente
// - res: objeto que usamos para construir la respuesta
const server = http.createServer((req, res) => {
  // Escribimos la cabecera de la respuesta HTTP
  // El código 200 significa "OK" - todo salió bien
  // El segundo parámetro es un objeto con las cabeceras HTTP
  // 'Content-Type': 'text/plain' indica que enviamos texto plano
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Finalizamos la respuesta enviando el mensaje de texto al cliente
  // res.end() cierra la respuesta y envía los datos al cliente
  res.end("¡Hola desde Node.js sin frameworks usando ES Modules!");
});

// Indicamos al servidor que escuche en el puerto 3000
// El segundo parámetro es un callback opcional que se ejecuta cuando el servidor inicia
const PORT = 3000;
server.listen(PORT, () => {
  // Mostramos un mensaje en la consola para confirmar que el servidor está funcionando
  console.log("Servidor escuchando en http://localhost:" + PORT);
  console.log("Presiona Ctrl + C para detener el servidor");
});
```

### Probando el Servidor Básico

1. Guarda el código en un archivo llamado `server.js`
2. Abre tu terminal y ejecuta:
   ```bash
   node server.js
   ```
3. Abre tu navegador y visita `http://localhost:3000`
4. Deberías ver el mensaje "¡Hola desde Node.js sin frameworks usando ES Modules!"

### Análisis de lo que Ocurre

Cuando visitas `http://localhost:3000` en tu navegador:

1. El navegador envía una petición HTTP GET a tu servidor
2. Node.js recibe la petición y ejecuta el callback de `createServer`
3. El servidor responde con código 200 y el texto plano
4. El navegador recibe la respuesta y muestra el texto

## Implementación de Rutas Básicas

Un servidor web real necesita responder diferente contenido según la URL solicitada. Vamos a implementar un sistema de rutas básico.

```javascript
// server-con-rutas.js

// Importamos el módulo HTTP
import http from "http";

// Creamos el servidor con un sistema de rutas
const server = http.createServer((req, res) => {
  // req.url contiene la URL solicitada por el cliente
  // req.method contiene el método HTTP (GET, POST, etc.)
  console.log("Petición recibida:", req.method, req.url);

  // Si la URL es "/" y el método es GET, mostramos la página principal
  if (req.url === "/" && req.method === "GET") {
    // Enviamos una cabecera con estado 200 (OK) y tipo de contenido HTML
    res.writeHead(200, { "Content-Type": "text/html" });

    // Enviamos un mensaje HTML como respuesta
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Página Principal</title>
            </head>
            <body>
                <h1>Bienvenido al Servidor Node.js</h1>
                <p>Esta es la página principal</p>
                <nav>
                    <a href="/acerca">Acerca de</a> | 
                    <a href="/api">API</a> | 
                    <a href="/contacto">Contacto</a>
                </nav>
            </body>
            </html>
        `);

    // Si la URL es "/acerca" y el método es GET, mostramos información
  } else if (req.url === "/acerca" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Acerca de</title>
            </head>
            <body>
                <h1>Acerca de Nuestro Servidor</h1>
                <p>Este servidor fue construido con Node.js y módulos nativos</p>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);

    // Si la URL es "/api" y el método es GET, respondemos con JSON
  } else if (req.url === "/api" && req.method === "GET") {
    // Cabecera con estado 200 y tipo de contenido JSON
    res.writeHead(200, { "Content-Type": "application/json" });

    // Enviamos un objeto convertido a JSON como respuesta
    res.end(
      JSON.stringify({
        mensaje: "Hola desde la API",
        timestamp: new Date().toISOString(),
        estado: "activo",
        version: "1.0.0",
      })
    );

    // Si la URL es "/contacto" y el método es GET, mostramos formulario
  } else if (req.url === "/contacto" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Contacto</title>
            </head>
            <body>
                <h1>Página de Contacto</h1>
                <form action="/contacto" method="POST">
                    <input type="text" name="nombre" placeholder="Tu nombre">
                    <button type="submit">Enviar</button>
                </form>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);

    // Si la URL es "/contacto" y el método es POST, procesamos el formulario
  } else if (req.url === "/contacto" && req.method === "POST") {
    // Por ahora, simplemente redirigimos a la página principal
    res.writeHead(302, {
      Location: "/",
      "Content-Type": "text/plain",
    });
    res.end("Formulario recibido. Redirigiendo...");

    // Si no coincide con ninguna ruta conocida, devolvemos un error 404
  } else {
    // Estado 404 (no encontrado) y tipo de contenido texto plano
    res.writeHead(404, { "Content-Type": "text/html" });

    // Mensaje de error como respuesta
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Página No Encontrada</title>
            </head>
            <body>
                <h1>404 - Página No Encontrada</h1>
                <p>La página que buscas no existe en este servidor.</p>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);
  }
});

// Iniciamos el servidor para que escuche en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log("Servidor con rutas ejecutándose en http://localhost:" + PORT);
  console.log("Rutas disponibles:");
  console.log("  GET / - Página principal");
  console.log("  GET /acerca - Información del servidor");
  console.log("  GET /api - Endpoint API JSON");
  console.log("  GET /contacto - Formulario de contacto");
  console.log("  POST /contacto - Procesar formulario");
  console.log("  * Cualquier otra ruta - Error 404");
});
```

### Probando las Rutas

Después de ejecutar este servidor, prueba las siguientes URLs en tu navegador:

- `http://localhost:3000/` - Página principal con navegación
- `http://localhost:3000/acerca` - Página "Acerca de"
- `http://localhost:3000/api` - Respuesta JSON
- `http://localhost:3000/contacto` - Formulario de contacto
- `http://localhost:3000/ruta-inexistente` - Error 404 personalizado

## Sirviendo HTML desde Archivos Externos

Incrustar HTML en strings de JavaScript no es una práctica recomendada para proyectos reales. Es mejor mantener el HTML en archivos separados. Vamos a crear un servidor que lea archivos HTML del sistema de archivos.

```javascript
// server-con-archivos-html.js

// Importamos los módulos necesarios
import http from "http";
import fs from "fs/promises"; // Versión con promesas de fs
import path from "path";
import { fileURLToPath } from "url";

// En ES Modules, necesitamos obtener __dirname manualmente
// fileURLToPath convierte la URL del módulo a una ruta de archivo
// path.dirname extrae el directorio de la ruta del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creamos el servidor HTTP
const server = http.createServer(async (req, res) => {
  console.log("Petición recibida:", req.method, req.url);

  // Si el usuario accede a la raíz ("/"), servimos el archivo index.html
  if (req.url === "/" && req.method === "GET") {
    try {
      // Construimos la ruta absoluta hacia el archivo index.html
      // path.join() crea rutas compatibles con cualquier sistema operativo
      const rutaArchivo = path.join(__dirname, "public", "index.html");

      // Leemos el archivo HTML usando fs.readFile() con await
      // 'utf8' especifica la codificación para obtener texto en lugar de Buffer
      const contenido = await fs.readFile(rutaArchivo, "utf8");

      // Si el archivo se lee correctamente, enviamos estado 200 y tipo HTML
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(contenido);
    } catch (error) {
      // Si hay un error al leer el archivo, devolvemos error 500
      console.error("Error al leer archivo HTML:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(
        "Error interno del servidor: No se pudo cargar la página principal"
      );
    }

    // Si el usuario accede a "/acerca", servimos acerca.html
  } else if (req.url === "/acerca" && req.method === "GET") {
    try {
      const rutaArchivo = path.join(__dirname, "public", "acerca.html");
      const contenido = await fs.readFile(rutaArchivo, "utf8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(contenido);
    } catch (error) {
      console.error("Error al leer archivo acerca.html:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
    }

    // Para cualquier otra ruta, respondemos con 404
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Página No Encontrada</title>
            </head>
            <body>
                <h1>404 - Página No Encontrada</h1>
                <p>La página "${req.url}" no existe en este servidor.</p>
                <a href="/">Volver al inicio</a>
            </body>
            </html>
        `);
  }
});

// Configuramos el puerto y ponemos el servidor a escuchar
const PORT = 3000;
server.listen(PORT, () => {
  console.log(
    "Servidor con archivos HTML ejecutándose en http://localhost:" + PORT
  );
  console.log("Archivos servidos desde: " + path.join(__dirname, "public"));
});
```

### Creando los Archivos HTML

Antes de ejecutar este servidor, necesitamos crear la carpeta `public` con los archivos HTML:

**Crea la carpeta y archivos:**

```bash
mkdir public
```

**public/index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Servidor Node.js</title>
  </head>
  <body>
    <h1>Bienvenido a Mi Servidor</h1>
    <p>Este contenido viene de un archivo HTML externo</p>
    <p>El servidor está construido con Node.js y ES Modules</p>

    <nav>
      <a href="/">Inicio</a> | <a href="/acerca">Acerca de</a> |
      <a href="/api">API JSON</a>
    </nav>

    <section>
      <h2>Características</h2>
      <ul>
        <li>Servidor HTTP nativo</li>
        <li>Archivos HTML externos</li>
        <li>Sistema de rutas básico</li>
        <li>Manejo de errores</li>
      </ul>
    </section>
  </body>
</html>
```

**public/acerca.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acerca de - Mi Servidor</title>
  </head>
  <body>
    <h1>Acerca de Este Servidor</h1>

    <p>Este servidor web fue creado como ejemplo educativo para demostrar:</p>

    <ul>
      <li>Cómo crear servidores HTTP con Node.js</li>
      <li>Uso de ES Modules en lugar de CommonJS</li>
      <li>Lectura de archivos del sistema de archivos</li>
      <li>Manejo básico de rutas HTTP</li>
      <li>Servicio de contenido estático</li>
    </ul>

    <h2>Tecnologías Utilizadas</h2>
    <ul>
      <li>Node.js Runtime</li>
      <li>Módulo HTTP nativo</li>
      <li>Módulo File System (fs)</li>
      <li>Módulo Path para rutas</li>
      <li>ES Modules (import/export)</li>
    </ul>

    <a href="/">Volver a la página principal</a>
  </body>
</html>
```

Ahora ejecuta el servidor y visita `http://localhost:3000/` y `http://localhost:3000/acerca` para ver los archivos HTML siendo servidos correctamente.

## Sirviendo Archivos Estáticos (CSS, JavaScript, Imágenes)

Un servidor web real necesita servir no solo HTML, sino también CSS, JavaScript, imágenes y otros recursos. Vamos a crear un servidor que detecte automáticamente el tipo de archivo y sirva el contenido correcto.

```javascript
// server-archivos-estaticos.js

import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definimos un objeto que relaciona extensiones de archivo con sus tipos MIME
// Los tipos MIME le indican al navegador qué tipo de contenido estamos enviando
const tiposMIME = {
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
};

// Creamos el servidor HTTP
const server = http.createServer(async (req, res) => {
  console.log("Petición recibida:", req.method, req.url);

  // Si la URL es "/", cargamos "/index.html" por defecto
  // En otros casos, usamos la ruta tal cual
  let rutaSolicitada = req.url === "/" ? "/index.html" : req.url;

  // Construimos la ruta completa al archivo dentro de la carpeta 'public'
  const rutaArchivo = path.join(__dirname, "public", rutaSolicitada);

  // Obtenemos la extensión del archivo solicitado
  const extension = path.extname(rutaArchivo).toLowerCase();

  // Buscamos el tipo MIME en nuestro objeto
  // Si no encuentra la extensión, usa "text/plain" por defecto
  const tipoContenido = tiposMIME[extension] || "text/plain";

  try {
    // Intentamos leer el archivo solicitado desde el sistema de archivos
    // NO especificamos codificación para archivos binarios (imágenes, etc.)
    const contenido = await fs.readFile(rutaArchivo);

    // Si el archivo se lee correctamente, enviamos código 200 y el tipo MIME correspondiente
    res.writeHead(200, { "Content-Type": tipoContenido });

    // Enviamos el contenido del archivo como respuesta
    res.end(contenido);
  } catch (error) {
    // Si hay un error (archivo no existe), respondemos con error 404
    if (error.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Recurso No Encontrado</title>
                    <link rel="stylesheet" href="/estilo.css">
                </head>
                <body>
                    <div class="container">
                        <h1>404 - Recurso No Encontrado</h1>
                        <p>El archivo solicitado no existe: ${rutaSolicitada}</p>
                        <a href="/">Volver a la página principal</a>
                    </div>
                </body>
                </html>
            `);
    } else {
      // Para otros tipos de errores (permisos, etc.), respondemos con error 500
      console.error("Error del servidor:", error);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>500 - Error del Servidor</title>
                    <link rel="stylesheet" href="/estilo.css">
                </head>
                <body>
                    <div class="container">
                        <h1>500 - Error Interno del Servidor</h1>
                        <p>Ha ocurrido un error inesperado en el servidor.</p>
                        <a href="/">Volver a la página principal</a>
                    </div>
                </body>
                </html>
            `);
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(
    "Servidor de archivos estáticos ejecutándose en http://localhost:" + PORT
  );
  console.log("Sirviendo archivos desde: " + path.join(__dirname, "public"));
  console.log(
    "Tipos de archivo soportados: " + Object.keys(tiposMIME).join(", ")
  );
});
```

### Ampliando la Estructura de Archivos

Ahora vamos a expandir nuestra carpeta `public` con más tipos de archivos:

**public/estilo.css**

```css
/* Estilos básicos para nuestro servidor */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

header {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 2.5em;
}

p {
  color: #7f8c8d;
  font-size: 1.1em;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0;
}

nav a {
  text-decoration: none;
  color: #3498db;
  padding: 12px 24px;
  border: 2px solid #3498db;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
}

nav a:hover {
  background-color: #3498db;
  color: white;
  transform: translateY(-2px);
}

section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 10px;
}

ul {
  list-style: none;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #ecf0f1;
}

li:before {
  content: "✓ ";
  color: #27ae60;
  font-weight: bold;
}

footer {
  text-align: center;
  margin-top: 40px;
  color: white;
}

.error {
  text-align: center;
  color: #e74c3c;
}

.error h1 {
  color: #e74c3c;
  font-size: 4em;
  margin-bottom: 20px;
}
```

**public/script.js**

```javascript
// JavaScript del lado del cliente para nuestro servidor
document.addEventListener("DOMContentLoaded", function () {
  console.log("Página cargada correctamente desde archivo estático");

  // Añadir interactividad básica
  const titulo = document.querySelector("h1");
  if (titulo) {
    titulo.addEventListener("click", function () {
      this.style.color =
        this.style.color === "rgb(231, 76, 60)" ? "#2c3e50" : "#e74c3c";
    });
  }

  // Mostrar hora actual en el footer si existe
  const footer = document.querySelector("footer");
  if (footer) {
    const hora = new Date().toLocaleTimeString();
    const elementoHora = document.createElement("p");
    elementoHora.textContent = `Página cargada a las: ${hora}`;
    elementoHora.style.fontSize = "0.9em";
    elementoHora.style.opacity = "0.8";
    footer.appendChild(elementoHora);
  }

  // Efecto hover mejorado para enlaces de navegación
  const enlacesNav = document.querySelectorAll("nav a");
  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    enlace.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});
```

**Actualiza public/index.html para usar los nuevos estilos:**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Servidor Node.js con Archivos Estáticos</title>
    <link rel="stylesheet" href="/estilo.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Bienvenido a Mi Servidor Node.js</h1>
        <p>Servidor construido con módulos nativos y ES Modules</p>
      </header>

      <nav>
        <a href="/">Inicio</a>
        <a href="/acerca.html">Acerca de</a>
        <a href="/api.json">Ejemplo JSON</a>
        <a href="/ruta-inexistente">Error 404</a>
      </nav>

      <section>
        <h2>Características del Servidor</h2>
        <ul>
          <li>Servidor HTTP nativo de Node.js</li>
          <li>Sistema de archivos estáticos completo</li>
          <li>Detección automática de tipos MIME</li>
          <li>Manejo de errores 404 y 500</li>
          <li>Estilos CSS y JavaScript del lado cliente</li>
          <li>Compatibilidad con múltiples tipos de archivo</li>
        </ul>
      </section>

      <section>
        <h2>Tecnologías Implementadas</h2>
        <ul>
          <li>Módulo HTTP para el servidor web</li>
          <li>Módulo FS para lectura de archivos</li>
          <li>Módulo Path para manejo de rutas</li>
          <li>ES Modules (import/export)</li>
          <li>Async/Await para operaciones asíncronas</li>
          <li>Promesas para manejo de errores</li>
        </ul>
      </section>

      <footer>
        <p>Servidor ejecutándose en Node.js con ES Modules</p>
      </footer>
    </div>

    <script src="/script.js"></script>
  </body>
</html>
```

**Crea también public/api.json para probar JSON:**

```json
{
  "servidor": "Node.js con ES Modules",
  "version": "1.0.0",
  "estado": "activo",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "caracteristicas": [
    "Servicio de archivos estáticos",
    "Manejo de tipos MIME",
    "Sistema de rutas",
    "Manejo de errores HTTP"
  ],
  "estadisticas": {
    "archivos_servidos": 0,
    "uptime": "0 segundos",
    "memoria_uso": "0 MB"
  }
}
```

## Ejercicio Práctico Completo: Servidor con HTML, CSS, JSON y API

Vamos a crear un servidor completo que combine todo lo aprendido:

```javascript
// servidor-completo.js

import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de tipos MIME
const tiposMIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

// Datos de ejemplo para nuestra API
const usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com", activo: true },
  { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com", activo: true },
  {
    id: 3,
    nombre: "María Rodríguez",
    email: "maria@ejemplo.com",
    activo: false,
  },
];

const productos = [
  { id: 1, nombre: "Laptop", precio: 999.99, categoria: "tecnologia" },
  { id: 2, nombre: "Mouse", precio: 29.99, categoria: "tecnologia" },
  { id: 3, nombre: "Libro", precio: 19.99, categoria: "educacion" },
];

class ServidorWebCompleto {
  constructor() {
    this.contadorPeticiones = 0;
    this.server = http.createServer(this.manejarPeticion.bind(this));
  }

  async manejarPeticion(req, res) {
    this.contadorPeticiones++;
    const url = new URL(req.url, `http://${req.headers.host}`);
    const ruta = url.pathname;

    console.log(
      `[${new Date().toISOString()}] Petición ${this.contadorPeticiones}: ${
        req.method
      } ${ruta}`
    );

    try {
      // Ruta principal - página de inicio
      if (ruta === "/" && req.method === "GET") {
        await this.servirPaginaInicio(res);

        // Rutas de API
      } else if (ruta === "/api/usuarios" && req.method === "GET") {
        await this.obtenerUsuarios(res, url);
      } else if (ruta.startsWith("/api/usuarios/") && req.method === "GET") {
        await this.obtenerUsuarioPorId(res, ruta);
      } else if (ruta === "/api/productos" && req.method === "GET") {
        await this.obtenerProductos(res, url);
      } else if (ruta === "/api/estadisticas" && req.method === "GET") {
        await this.obtenerEstadisticas(res);

        // Rutas de páginas
      } else if (ruta === "/acerca" && req.method === "GET") {
        await this.servirPaginaAcerca(res);
      } else if (ruta === "/contacto" && req.method === "GET") {
        await this.servirPaginaContacto(res);

        // Servir archivos estáticos
      } else {
        await this.servirArchivoEstatico(res, ruta);
      }
    } catch (error) {
      await this.manejarError(res, error, ruta);
    }
  }

  async servirPaginaInicio(res) {
    const contenido = await this.leerPlantilla("index.html");
    const html = contenido
      .replace("{{titulo}}", "Inicio - Servidor Completo")
      .replace(
        "{{contenido}}",
        `
                <section>
                    <h2>Bienvenido al Servidor Web Completo</h2>
                    <p>Este servidor demuestra todas las funcionalidades aprendidas:</p>
                    <ul>
                        <li><strong>Servicio de archivos estáticos</strong> - HTML, CSS, JS, imágenes</li>
                        <li><strong>API REST</strong> - Endpoints para usuarios y productos</li>
                        <li><strong>Sistema de rutas avanzado</strong> - Con parámetros y queries</li>
                        <li><strong>Manejo de errores</strong> - Páginas de error personalizadas</li>
                        <li><strong>Plantillas HTML</strong> - Contenido dinámico básico</li>
                    </ul>
                </section>
                
                <section>
                    <h2>Endpoints de API Disponibles</h2>
                    <div class="endpoints">
                        <div class="endpoint">
                            <code>GET /api/usuarios</code>
                            <p>Lista todos los usuarios</p>
                        </div>
                        <div class="endpoint">
                            <code>GET /api/usuarios/:id</code>
                            <p>Obtiene un usuario específico</p>
                        </div>
                        <div class="endpoint">
                            <code>GET /api/productos</code>
                            <p>Lista todos los productos</p>
                        </div>
                        <div class="endpoint">
                            <code>GET /api/estadisticas</code>
                            <p>Estadísticas del servidor</p>
                        </div>
                    </div>
                </section>
            `
      );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  async servirPaginaAcerca(res) {
    const contenido = await this.leerPlantilla("index.html");
    const html = contenido
      .replace("{{titulo}}", "Acerca de - Servidor Completo")
      .replace(
        "{{contenido}}",
        `
                <section>
                    <h2>Acerca de Este Servidor</h2>
                    <p>Este es un servidor web educativo construido con Node.js y módulos nativos.</p>
                    
                    <h3>Tecnologías Utilizadas</h3>
                    <ul>
                        <li><strong>Node.js</strong> - Runtime de JavaScript</li>
                        <li><strong>Módulo HTTP</strong> - Servidor web nativo</li>
                        <li><strong>Módulo FS</strong> - Sistema de archivos</li>
                        <li><strong>Módulo Path</strong> - Manejo de rutas</li>
                        <li><strong>ES Modules</strong> - Sistema de módulos moderno</li>
                    </ul>
                    
                    <h3>Características Implementadas</h3>
                    <ul>
                        <li>Servicio de archivos estáticos con detección MIME</li>
                        <li>API REST con múltiples endpoints</li>
                        <li>Sistema de plantillas básico</li>
                        <li>Manejo de parámetros de consulta</li>
                        <li>Estadísticas en tiempo real</li>
                        <li>Páginas de error personalizadas</li>
                    </ul>
                </section>
            `
      );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  async servirPaginaContacto(res) {
    const contenido = await this.leerPlantilla("index.html");
    const html = contenido
      .replace("{{titulo}}", "Contacto - Servidor Completo")
      .replace(
        "{{contenido}}",
        `
                <section>
                    <h2>Contacto</h2>
                    <p>Esta es una página de contacto de ejemplo.</p>
                    
                    <form action="/contacto" method="POST" style="max-width: 500px;">
                        <div style="margin-bottom: 15px;">
                            <label for="nombre" style="display: block; margin-bottom: 5px;">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required 
                                   style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
                            <input type="email" id="email" name="email" required 
                                   style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        </div>
                        
                        <div style="margin-bottom: 15px;">
                            <label for="mensaje" style="display: block; margin-bottom: 5px;">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" rows="4" required 
                                      style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
                        </div>
                        
                        <button type="submit" 
                                style="background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">
                            Enviar Mensaje
                        </button>
                    </form>
                </section>
            `
      );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }

  async obtenerUsuarios(res, url) {
    const params = url.searchParams;
    const soloActivos = params.get("activos") === "true";

    let usuariosFiltrados = usuarios;
    if (soloActivos) {
      usuariosFiltrados = usuarios.filter((user) => user.activo);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: usuariosFiltrados,
        total: usuariosFiltrados.length,
        filtros: {
          activos: soloActivos,
        },
      })
    );
  }

  async obtenerUsuarioPorId(res, ruta) {
    const id = parseInt(ruta.split("/").pop());

    if (isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "ID de usuario inválido",
        })
      );
      return;
    }

    const usuario = usuarios.find((u) => u.id === id);

    if (usuario) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: usuario,
        })
      );
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "Usuario no encontrado",
        })
      );
    }
  }

  async obtenerProductos(res, url) {
    const params = url.searchParams;
    const categoria = params.get("categoria");

    let productosFiltrados = productos;
    if (categoria) {
      productosFiltrados = productos.filter((p) => p.categoria === categoria);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: productosFiltrados,
        total: productosFiltrados.length,
        filtros: {
          categoria: categoria || "todas",
        },
      })
    );
  }

  async obtenerEstadisticas(res) {
    const stats = {
      peticionesTotales: this.contadorPeticiones,
      usuariosRegistrados: usuarios.length,
      productosDisponibles: productos.length,
      tiempoServidor: new Date().toISOString(),
      memoria: process.memoryUsage(),
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        data: stats,
      })
    );
  }

  async servirArchivoEstatico(res, rutaSolicitada) {
    // Si la ruta es un directorio, servir index.html
    const ruta = rutaSolicitada.endsWith("/")
      ? rutaSolicitada + "index.html"
      : rutaSolicitada;
    const rutaArchivo = path.join(__dirname, "public", ruta);
    const extension = path.extname(rutaArchivo).toLowerCase();
    const tipoContenido = tiposMIME[extension] || "text/plain";

    try {
      const contenido = await fs.readFile(rutaArchivo);
      res.writeHead(200, { "Content-Type": tipoContenido });
      res.end(contenido);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw {
          code: 404,
          message: `Archivo no encontrado: ${rutaSolicitada}`,
        };
      } else {
        throw { code: 500, message: `Error al leer archivo: ${error.message}` };
      }
    }
  }

  async leerPlantilla(nombreArchivo) {
    const ruta = path.join(__dirname, "public", nombreArchivo);
    return await fs.readFile(ruta, "utf8");
  }

  async manejarError(res, error, ruta) {
    console.error("Error en el servidor:", error);

    const codigo = error.code || 500;
    const mensaje = error.message || "Error interno del servidor";

    if (ruta.startsWith("/api/")) {
      // Error en API - responder con JSON
      res.writeHead(codigo, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: mensaje,
          code: codigo,
        })
      );
    } else {
      // Error en página web - responder con HTML
      const contenido = await this.leerPlantilla("index.html");
      const html = contenido
        .replace("{{titulo}}", `Error ${codigo} - Servidor Completo`)
        .replace(
          "{{contenido}}",
          `
                    <section class="error">
                        <h1>Error ${codigo}</h1>
                        <p>${mensaje}</p>
                        <a href="/">Volver a la página principal</a>
                    </section>
                `
        );

      res.writeHead(codigo, { "Content-Type": "text/html" });
      res.end(html);
    }
  }

  iniciar(puerto = 3000) {
    this.server.listen(puerto, () => {
      console.log("=".repeat(60));
      console.log("🚀 SERVEDOR WEB COMPLETO INICIADO");
      console.log("=".repeat(60));
      console.log(`📡 URL: http://localhost:${puerto}`);
      console.log("📁 Archivos estáticos: ./public/");
      console.log("");
      console.log("📍 RUTAS DISPONIBLES:");
      console.log("");
      console.log("🌐 PÁGINAS WEB:");
      console.log("   GET /              - Página principal");
      console.log("   GET /acerca        - Acerca del servidor");
      console.log("   GET /contacto      - Formulario de contacto");
      console.log("");
      console.log("🔗 API ENDPOINTS:");
      console.log("   GET /api/usuarios           - Lista todos los usuarios");
      console.log("   GET /api/usuarios?activos=true - Usuarios activos");
      console.log("   GET /api/usuarios/{id}      - Usuario específico");
      console.log("   GET /api/productos          - Lista todos los productos");
      console.log(
        "   GET /api/productos?categoria=tecnologia - Productos filtrados"
      );
      console.log("   GET /api/estadisticas       - Estadísticas del servidor");
      console.log("");
      console.log("📄 ARCHIVOS ESTÁTICOS:");
      console.log("   GET /estilo.css    - Hoja de estilos");
      console.log("   GET /script.js     - JavaScript del cliente");
      console.log("   GET /api.json      - Ejemplo de JSON estático");
      console.log("=".repeat(60));
    });
  }
}

// Crear e iniciar el servidor
const servidor = new ServidorWebCompleto();
servidor.iniciar(3000);
```

### Estructura Final del Proyecto

Crea los siguientes archivos para completar el ejercicio:

**public/index.html** (plantilla base)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{titulo}}</title>
    <link rel="stylesheet" href="/estilo-completo.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Servidor Web Completo</h1>
        <p>Node.js + ES Modules + Módulos Nativos</p>
      </header>

      <nav>
        <a href="/">Inicio</a>
        <a href="/acerca">Acerca</a>
        <a href="/contacto">Contacto</a>
        <a href="/api/usuarios">API Usuarios</a>
        <a href="/api/productos">API Productos</a>
        <a href="/api/estadisticas">Estadísticas</a>
      </nav>

      <main>{{contenido}}</main>

      <footer>
        <p>Servidor educativo - Node.js con ES Modules</p>
        <p>Peticiones atendidas: <span id="contador-peticiones">0</span></p>
      </footer>
    </div>

    <script src="/script-completo.js"></script>
  </body>
</html>
```

**public/estilo-completo.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.8em;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

header p {
  color: #7f8c8d;
  font-size: 1.2em;
}

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0;
}

nav a {
  text-decoration: none;
  color: #3498db;
  padding: 12px 20px;
  border: 2px solid #3498db;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: white;
}

nav a:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

main {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

section {
  margin-bottom: 30px;
}

section h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
}

section h3 {
  color: #34495e;
  margin: 20px 0 15px 0;
}

ul {
  list-style: none;
}

li {
  padding: 10px 0;
  border-bottom: 1px solid #ecf0f1;
  position: relative;
  padding-left: 25px;
}

li:before {
  content: "▶";
  color: #3498db;
  position: absolute;
  left: 0;
  font-size: 0.8em;
}

strong {
  color: #2c3e50;
}

.endpoints {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.endpoint {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.endpoint code {
  background: #2c3e50;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  display: block;
  margin-bottom: 10px;
}

form {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
}

button {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
}

footer {
  text-align: center;
  color: white;
  margin-top: 40px;
  padding: 20px;
}

footer p {
  margin: 5px 0;
}

.error {
  text-align: center;
  padding: 40px;
}

.error h1 {
  font-size: 4em;
  margin-bottom: 20px;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  header {
    padding: 20px;
  }

  h1 {
    font-size: 2em;
  }

  nav {
    flex-direction: column;
    align-items: center;
  }

  nav a {
    width: 200px;
    text-align: center;
  }

  main {
    padding: 20px;
  }

  .endpoints {
    grid-template-columns: 1fr;
  }
}
```

**public/script-completo.js**

```javascript
// JavaScript completo para el servidor web
document.addEventListener("DOMContentLoaded", function () {
  console.log("Servidor Web Completo - Cliente inicializado");

  // Actualizar contador de peticiones en el footer
  const contadorElemento = document.getElementById("contador-peticiones");
  if (contadorElemento) {
    // Simular actualización del contador (en un caso real, esto vendría del servidor)
    let contador = 0;
    setInterval(() => {
      contador++;
      contadorElemento.textContent = contador;
    }, 2000);
  }

  // Mejorar la interactividad de los enlaces de navegación
  const enlaces = document.querySelectorAll("nav a");
  enlaces.forEach((enlace) => {
    // Añadir efecto de carga
    enlace.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("/api/")) {
        return; // No aplicar efecto a enlaces de API
      }

      e.preventDefault();
      const url = this.getAttribute("href");

      // Añadir clase de carga
      this.classList.add("cargando");
      this.innerHTML = "⏳ Cargando...";

      // Navegar después de un breve delay para mostrar el efecto
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    });

    // Efectos hover mejorados
    enlace.addEventListener("mouseenter", function () {
      if (!this.classList.contains("cargando")) {
        this.style.transform = "translateY(-3px) scale(1.05)";
        this.style.boxShadow = "0 8px 20px rgba(52, 152, 219, 0.3)";
      }
    });

    enlace.addEventListener("mouseleave", function () {
      if (!this.classList.contains("cargando")) {
        this.style.transform = "translateY(0) scale(1)";
        this.style.boxShadow = "none";
      }
    });
  });

  // Mejorar los formularios
  const formularios = document.querySelectorAll("form");
  formularios.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const boton = this.querySelector('button[type="submit"]');
      const textoOriginal = boton.textContent;

      // Efecto de carga en el botón
      boton.innerHTML = "⏳ Enviando...";
      boton.disabled = true;

      // En un caso real, aquí haríamos una petición fetch
      setTimeout(() => {
        alert("Formulario enviado (esto es una simulación)");
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
      }, 1500);

      e.preventDefault();
    });
  });

  // Añadir funcionalidad a las secciones
  const secciones = document.querySelectorAll("section");
  secciones.forEach((seccion, index) => {
    // Añadir animación de entrada
    seccion.style.opacity = "0";
    seccion.style.transform = "translateY(20px)";

    setTimeout(() => {
      seccion.style.transition = "all 0.6s ease";
      seccion.style.opacity = "1";
      seccion.style.transform = "translateY(0)";
    }, index * 200);

    // Efecto hover en secciones
    seccion.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
    });

    seccion.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });
  });

  // Añadir estilos para el estado de carga
  const style = document.createElement("style");
  style.textContent = `
        .cargando {
            background: #95a5a6 !important;
            border-color: #95a5a6 !important;
            cursor: not-allowed;
        }
        
        section {
            transition: all 0.3s ease;
        }
    `;
  document.head.appendChild(style);

  // Mostrar información de la página actual en consola
  console.log("Página actual:", window.location.pathname);
  console.log("User Agent:", navigator.userAgent);
});
```

## Ejecución y Pruebas Finales

1. **Ejecuta el servidor completo:**

   ```bash
   node servidor-completo.js
   ```

2. **Prueba todas las funcionalidades:**
   - `http://localhost:3000/` - Página principal con navegación completa
   - `http://localhost:3000/acerca` - Página "Acerca de"
   - `http://localhost:3000/contacto` - Formulario de contacto
   - `http://localhost:3000/api/usuarios` - API de usuarios
   - `http://localhost:3000/api/usuarios?activos=true` - Usuarios filtrados
   - `http://localhost:3000/api/usuarios/1` - Usuario específico
   - `http://localhost:3000/api/productos` - API de productos
   - `http://localhost:3000/api/productos?categoria=tecnologia` - Productos filtrados
   - `http://localhost:3000/api/estadisticas` - Estadísticas del servidor
   - `http://localhost:3000/ruta-inexistente` - Página de error 404

## ¿Qué Has Aprendido?

Al completar este módulo, ahora comprendes:

### Conceptos Fundamentales

- **Cómo Node.js maneja peticiones HTTP** a través del módulo nativo `http`
- **El ciclo de vida de una petición web** desde que llega al servidor hasta que se envía la respuesta
- **Diferencia entre ES Modules y CommonJS** y cómo configurar proyectos con ES Modules

### Habilidades Técnicas

- **Crear servidores HTTP básicos** que responden a peticiones
- **Implementar sistemas de rutas** para manejar diferentes URLs y métodos HTTP
- **Servir archivos estáticos** como HTML, CSS, JavaScript e imágenes
- **Detectar tipos MIME automáticamente** para enviar las cabeceras correctas
- **Construir APIs REST básicas** que devuelven datos JSON
- **Manejar errores HTTP** con códigos de estado y páginas personalizadas

### Buenas Prácticas

- **Separar el contenido HTML** del código JavaScript usando archivos externos
- **Usar async/await** para operaciones asíncronas con el sistema de archivos
- **Organizar el código en clases** para mejor mantenibilidad
- **Manejar rutas no existentes** con páginas de error 404 amigables
- **Validar parámetros** en las APIs para evitar errores

### Conocimientos Avanzados

- **Trabajar con parámetros de consulta** en las URLs
- **Implementar plantillas HTML básicas** para contenido dinámico
- **Crear sistemas de archivos estáticos** completos y eficientes
- **Manejar diferentes tipos de contenido** (texto, JSON, HTML, binarios)

## Recursos Adicionales

- [Documentación oficial del módulo HTTP de Node.js](https://nodejs.org/api/http.html)
- [Guía de ES Modules en Node.js](https://nodejs.org/api/esm.html)
- [MDN Web Docs - HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [MDN Web Docs - MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Node.js File System (fs) documentation](https://nodejs.org/api/fs.html)
- [JavaScript async/await guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Este conocimiento fundamental te prepara para entender cómo funcionan los frameworks web modernos y te da la base para construir aplicaciones web robustas sin dependencias externas.
