# Guía de Manejo de Rutas en Node.js con ES Modules

## Introducción al Sistema de Rutas en Node.js

Node.js proporciona módulos nativos para el manejo de rutas de archivos y URLs. Los principales módulos son `path` y `url`, que ofrecen utilidades para trabajar con rutas del sistema de archivos y URLs respectivamente.

## Importante: Diferencia entre CommonJS y ES Modules

### Explicación de `__dirname` y `__filename` en ES Modules

En CommonJS (el sistema de módulos antiguo de Node.js), las variables `__dirname` y `__filename` estaban disponibles automáticamente. Sin embargo, en ES Modules (el estándar moderno) necesitamos construirlas manualmente.

**¿Por qué este cambio?**

- ES Modules es un estándar universal de JavaScript que funciona en navegadores y otros entornos
- Los navegadores no tienen sistema de archivos, por lo que `__dirname` no tiene sentido allí
- Node.js se adapta al estándar usando `import.meta.url`

### Cómo obtener `__dirname` y `__filename` en ES Modules

```javascript
import path from "path";
import { fileURLToPath } from "url";

// En ES Modules, necesitamos obtener __dirname y __filename de esta manera
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Ruta del archivo:", __filename);
console.log("Directorio:", __dirname);
```

**Desglose del proceso:**

1. `import.meta.url` contiene la URL del módulo actual (ej: `"file:///usuarios/proyecto/src/app.js"`)
2. `fileURLToPath()` convierte la URL a una ruta del sistema de archivos
3. `path.dirname()` extrae el directorio de la ruta del archivo

### Ejemplo de problema común y solución

**❌ INCORRECTO (no funciona en ES Modules):**

```javascript
// Esto causará error porque __dirname no existe en ES Modules
const ruta = __dirname + "/archivos/config.json";
```

**✅ CORRECTO (funciona en ES Modules):**

```javascript
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ruta = path.join(__dirname, "archivos", "config.json");
```

## Módulo Path - Manejo de Rutas del Sistema de Archivos

### Métodos Principales del Módulo Path

#### path.join() - Unir Segmentos de Ruta

```javascript
// Une múltiples segmentos de ruta normalizando el resultado
const rutaCompleta = path.join(
  __dirname,
  "archivos",
  "documentos",
  "..",
  "imagenes"
);
console.log(rutaCompleta);
// Ejemplo de salida: /ruta/al/proyecto/archivos/imagenes

// Uso práctico para servir archivos estáticos
const rutaArchivo = path.join(__dirname, "public", "css", "estilos.css");
console.log(`Sirviendo archivo: ${rutaArchivo}`);
```

#### path.resolve() - Resolver Rutas Absolutas

```javascript
// Resuelve una secuencia de rutas en una ruta absoluta
const rutaAbsoluta = path.resolve("src", "components", "Header.jsx");
console.log(rutaAbsoluta);
// Ejemplo: /ruta/actual/src/components/Header.jsx

// Resolución con múltiples argumentos
const configPath = path.resolve(__dirname, "config", "database.json");
console.log(`Archivo de configuración: ${configPath}`);
```

#### path.dirname() - Obtener Directorio Padre

```javascript
// Obtiene el directorio de una ruta
const directorio = path.dirname("/usuarios/juan/proyecto/src/app.js");
console.log(directorio); // /usuarios/juan/proyecto/src

// Uso con __filename
console.log(`Directorio actual: ${__dirname}`);
```

#### path.basename() - Obtener Nombre del Archivo

```javascript
// Obtiene la última parte de una ruta
const nombreArchivo = path.basename("/usuarios/juan/documento.txt");
console.log(nombreArchivo); // documento.txt

// Con segundo parámetro para eliminar extensión
const nombreSinExtension = path.basename(
  "/usuarios/juan/documento.txt",
  ".txt"
);
console.log(nombreSinExtension); // documento
```

#### path.extname() - Obtener Extensión del Archivo

```javascript
// Obtiene la extensión del archivo
const extension = path.extname("/usuarios/juan/imagen.jpg");
console.log(extension); // .jpg

// Detección de tipos de archivo
const archivo = "/ruta/al/archivo.js";
if (path.extname(archivo) === ".js") {
  console.log("Es un archivo JavaScript");
}
```

## Módulo URL - Manejo de URLs

### Importación y Uso Básico

```javascript
import { URL } from "url";

// Crear una nueva instancia de URL
const miUrl = new URL(
  "https://ejemplo.com:8080/ruta/api?usuario=john&pagina=1#seccion"
);

console.log(miUrl.protocol); // https:
console.log(miUrl.hostname); // ejemplo.com
console.log(miUrl.port); // 8080
console.log(miUrl.pathname); // /ruta/api
console.log(miUrl.search); // ?usuario=john&pagina=1
console.log(miUrl.hash); // #seccion
```

### Análisis de Parámetros de Consulta

```javascript
// Obtener parámetros de consulta
const parametros = miUrl.searchParams;

console.log(parametros.get("usuario")); // john
console.log(parametros.get("pagina")); // 1
console.log(parametros.has("busqueda")); // false

// Iterar sobre todos los parámetros
for (const [clave, valor] of parametros) {
  console.log(`${clave}: ${valor}`);
}
```

## Implementación de un Servidor HTTP con Manejo de Rutas

### Servidor Básico con Enrutamiento

```javascript
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

// Obtener __dirname y __filename para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  // Extraer la ruta solicitada
  const url = new URL(req.url, `http://${req.headers.host}`);
  const rutaSolicitada = url.pathname;

  console.log(`Solicitud recibida: ${rutaSolicitada}`);

  // Configurar headers básicos
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  try {
    // Enrutamiento basado en la ruta solicitada
    switch (rutaSolicitada) {
      case "/":
        await servirPaginaInicio(res);
        break;
      case "/acerca":
        await servirPaginaAcerca(res);
        break;
      case "/contacto":
        await servirPaginaContacto(res);
        break;
      default:
        // Verificar si es un archivo estático
        if (await esArchivoEstatico(rutaSolicitada)) {
          await servirArchivoEstatico(rutaSolicitada, res);
        } else {
          servirError404(res, rutaSolicitada);
        }
    }
  } catch (error) {
    console.error("Error al procesar solicitud:", error);
    servirError500(res, error);
  }
});

// Función para servir la página de inicio
async function servirPaginaInicio(res) {
  const contenido = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página de Inicio</title>
        </head>
        <body>
            <h1>Bienvenido a la Página de Inicio</h1>
            <nav>
                <a href="/">Inicio</a> | 
                <a href="/acerca">Acerca</a> | 
                <a href="/contacto">Contacto</a>
            </nav>
            <p>Esta es la página principal del sitio.</p>
        </body>
        </html>
    `;

  res.statusCode = 200;
  res.end(contenido);
}

// Función para servir la página "Acerca de"
async function servirPaginaAcerca(res) {
  const contenido = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Acerca de Nosotros</title>
        </head>
        <body>
            <h1>Acerca de Nosotros</h1>
            <nav>
                <a href="/">Inicio</a> | 
                <a href="/acerca">Acerca</a> | 
                <a href="/contacto">Contacto</a>
            </nav>
            <p>Información sobre nuestra empresa.</p>
        </body>
        </html>
    `;

  res.statusCode = 200;
  res.end(contenido);
}

// Función para verificar y servir archivos estáticos
async function esArchivoEstatico(ruta) {
  const extensionesPermitidas = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".json",
    ".txt",
  ];
  const extension = path.extname(ruta);
  return extensionesPermitidas.includes(extension);
}

async function servirArchivoEstatico(rutaSolicitada, res) {
  try {
    // Construir ruta completa al archivo usando path.join()
    const rutaCompleta = path.join(__dirname, "public", rutaSolicitada);

    // Leer el archivo
    const contenido = await fs.readFile(rutaCompleta);

    // Determinar el tipo de contenido basado en la extensión
    const extension = path.extname(rutaSolicitada);
    const tiposMIME = {
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".json": "application/json",
      ".txt": "text/plain",
    };

    res.setHeader(
      "Content-Type",
      tiposMIME[extension] || "application/octet-stream"
    );
    res.statusCode = 200;
    res.end(contenido);
  } catch (error) {
    if (error.code === "ENOENT") {
      servirError404(res, rutaSolicitada);
    } else {
      throw error;
    }
  }
}

// Funciones de manejo de errores
function servirError404(res, ruta) {
  res.statusCode = 404;
  res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página No Encontrada</title>
        </head>
        <body>
            <h1>Error 404 - Página No Encontrada</h1>
            <p>La ruta "${ruta}" no existe en este servidor.</p>
            <a href="/">Volver al Inicio</a>
        </body>
        </html>
    `);
}

function servirError500(res, error) {
  res.statusCode = 500;
  res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error del Servidor</title>
        </head>
        <body>
            <h1>Error 500 - Error Interno del Servidor</h1>
            <p>Ha ocurrido un error inesperado.</p>
            <pre>${error.message}</pre>
            <a href="/">Volver al Inicio</a>
        </body>
        </html>
    `);
}

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

## Sistema de Enrutamiento Avanzado con Parámetros

### Implementación de Rutas con Parámetros

```javascript
import http from "http";
import { URL } from "url";

// Base de datos simulada
const usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com" },
  { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com" },
  { id: 3, nombre: "María Rodríguez", email: "maria@ejemplo.com" },
];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const ruta = url.pathname;

  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    // Enrutamiento para API REST
    if (ruta.startsWith("/api/usuarios")) {
      await manejarRutaUsuarios(ruta, req.method, res, url);
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Endpoint no encontrado" }));
    }
  } catch (error) {
    console.error("Error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Error interno del servidor" }));
  }
});

async function manejarRutaUsuarios(ruta, metodo, res, url) {
  // Extraer ID de usuario si está presente
  const partesRuta = ruta.split("/").filter((parte) => parte !== "");
  const tieneId = partesRuta.length === 3 && !isNaN(partesRuta[2]);

  if (metodo === "GET") {
    if (ruta === "/api/usuarios") {
      // GET /api/usuarios - Listar todos los usuarios
      res.statusCode = 200;
      res.end(JSON.stringify(usuarios));
    } else if (tieneId) {
      // GET /api/usuarios/:id - Obtener usuario específico
      const userId = parseInt(partesRuta[2]);
      const usuario = usuarios.find((u) => u.id === userId);

      if (usuario) {
        res.statusCode = 200;
        res.end(JSON.stringify(usuario));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Usuario no encontrado" }));
      }
    }
  } else if (metodo === "POST" && ruta === "/api/usuarios") {
    // POST /api/usuarios - Crear nuevo usuario
    await crearUsuario(req, res);
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Método no permitido" }));
  }
}

// Función para crear usuario (simplificada)
function crearUsuario(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const nuevoUsuario = JSON.parse(body);
      nuevoUsuario.id = usuarios.length + 1;
      usuarios.push(nuevoUsuario);

      res.statusCode = 201;
      res.end(JSON.stringify(nuevoUsuario));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "JSON inválido" }));
    }
  });
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API REST ejecutándose en http://localhost:${PORT}`);
});
```

## Mejores Prácticas y Consideraciones

### 1. Validación de Rutas

```javascript
import path from "path";

function validarRutaSegura(rutaSolicitada, directorioBase) {
  // Prevenir directory traversal attacks
  const rutaResuelta = path.resolve(directorioBase, rutaSolicitada);
  return rutaResuelta.startsWith(directorioBase);
}

// Ejemplo de uso
const directorioPublico = path.join(__dirname, "public");
const rutaUsuario = "../archivo-secreto.txt";

if (validarRutaSegura(rutaUsuario, directorioPublico)) {
  console.log("Ruta segura");
} else {
  console.log("Intento de acceso no autorizado detectado");
}
```

### 2. Configuración de MIME Types

```javascript
const tiposMIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function obtenerTipoMIME(archivo) {
  const extension = path.extname(archivo).toLowerCase();
  return tiposMIME[extension] || "application/octet-stream";
}
```

### 3. Manejo de Errores Centralizado

```javascript
class ManejadorErrores {
  static notFound(res, mensaje = "Recurso no encontrado") {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: mensaje }));
  }

  static serverError(res, error) {
    console.error("Error del servidor:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Error interno del servidor" }));
  }

  static badRequest(res, mensaje = "Solicitud inválida") {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: mensaje }));
  }
}
```

## Conclusión

Node.js proporciona herramientas robustas para el manejo de rutas a través de sus módulos nativos `path` y `url`. Con ES Modules, el enfoque ha evolucionado pero mantiene la misma funcionalidad poderosa. La clave está en:

- **Entender la diferencia** entre CommonJS y ES Modules para `__dirname` y `__filename`
- Usar `path.join()` y `path.resolve()` para construir rutas de manera segura
- Utilizar la clase `URL` para parsear y manipular URLs
- Implementar validación de seguridad para prevenir ataques de directory traversal
- Crear sistemas de enrutamiento modulares y mantenibles
- Manejar adecuadamente los errores y tipos MIME

Este enfoque nativo es fundamental para entender cómo funcionan los frameworks web en Node.js y proporciona una base sólida para construir aplicaciones web robustas y seguras.
