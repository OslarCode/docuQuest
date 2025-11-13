# HTTP manejo de peticiones y respuestas ES Modules

El módulo `http` es el núcleo para crear servidores web en Node.js. Permite construir servidores HTTP, hacer peticiones a otros servidores y manejar el protocolo HTTP completo.

## Importación del Módulo HTTP

```jsx
// Módulo nativo de Node.js para crear servidores HTTP
// HTTP (HyperText Transfer Protocol) - protocolo no seguro
import http from "http";

// Módulo nativo de Node.js para crear servidores HTTPS
// HTTPS (HTTP Secure) - protocolo seguro con encriptación SSL/TLS
import https from "https";

// DIFERENCIAS CLAVE ENTRE HTTP Y HTTPS:

// HTTP:
// - Puerto por defecto: 80
// - Comunicación no encriptada
// - Más rápido (sin overhead de encriptación)
// - Adecuado para desarrollo y testing

// HTTPS:
// - Puerto por defecto: 443
// - Comunicación encriptada con SSL/TLS
// - Más seguro, protege datos sensibles
// - Requisito para muchas funcionalidades modernas del navegador
// - Necesita certificados SSL/TLS

// EJEMPLO DE SERVIDOR HTTP BÁSICO:

const servidorHTTP = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Servidor HTTP funcionando\n");
});

servidorHTTP.listen(3000, () => {
  console.log(
    "Servidor HTTP en [http://localhost:3000](http://localhost:3000/)"
  );
});

// EJEMPLO DE SERVIDOR HTTPS BÁSICO (REQUIERE CERTIFICADOS):

// Para HTTPS necesitas un certificado SSL y una clave privada
// En producción, estos se obtienen de una autoridad certificadora
// En desarrollo, puedes usar certificados auto-firmados

const opcionesHTTPS = {
  key: "", // Clave privada SSL (generalmente desde un archivo .key)
  cert: "", // Certificado SSL (generalmente desde un archivo .crt)
};

const servidorHTTPS = https.createServer(opcionesHTTPS, (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Servidor HTTPS funcionando\n");
});

servidorHTTPS.listen(3443, () => {
  console.log(
    "Servidor HTTPS en [https://localhost:3443](https://localhost:3443/)"
  );
});

// CÓMO CARGAR CERTIFICADOS DESDE ARCHIVOS:

import fs from "fs";

// En un entorno real, los certificados se cargan desde archivos
const opcionesHTTPSReales = {
  key: fs.readFileSync("ruta/al/privkey.pem"),
  cert: fs.readFileSync("ruta/al/cert.pem"),
  // Opcional: cadena de certificados
  ca: fs.readFileSync("ruta/al/chain.pem"),
};

// USO EN APLICACIONES DEL MUNDO REAL:

// Estrategia común: Redirigir HTTP a HTTPS en producción
function crearServidorSeguro(app) {
  // En entornos de producción, usar HTTPS
  if (process.env.NODE_ENV === "production") {
    const opciones = {
      key: fs.readFileSync("/etc/ssl/private/privkey.pem"),
      cert: fs.readFileSync("/etc/ssl/certs/cert.pem"),
    };
    return https.createServer(opciones, app);
  } else {
    // En desarrollo, usar HTTP para simplicidad
    return http.createServer(app);
  }
}

// SERVIDOR QUE MANEJA TANTO HTTP COMO HTTPS:

// Escenario: Servidor que escucha en ambos puertos
// HTTP (puerto 80) redirige a HTTPS (puerto 443)

const app = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>¡Hola desde servidor seguro!</h1>");
};

// Servidor HTTPS principal
const servidorPrincipal = https.createServer(opcionesHTTPS, app);
servidorPrincipal.listen(443, () => {
  console.log("Servidor HTTPS principal en puerto 443");
});

// Servidor HTTP que redirige a HTTPS
const servidorRedireccion = http.createServer((req, res) => {
  // Redirigir todas las solicitudes HTTP a HTTPS
  const urlSegura = `https://${req.headers.host}${req.url}`;
  res.writeHead(301, { Location: urlSegura });
  res.end();
});

servidorRedireccion.listen(80, () => {
  console.log("Servidor de redirección HTTP en puerto 80");
});

// CONSIDERACIONES DE SEGURIDAD:

// 1. Siempre usar HTTPS en producción para:
//    - Proteger datos sensibles (contraseñas, información personal)
//    - Prevenir ataques man-in-the-middle
//    - Cumplir con estándares de seguridad modernos

// 2. Configuraciones recomendadas para HTTPS:
const opcionesSeguras = {
  key: fs.readFileSync("clave-privada.pem"),
  cert: fs.readFileSync("certificado.pem"),
  // Forzar versiones seguras de TLS
  secureProtocol: "TLSv1_2_method",
  // Configuraciones de cipher suites
  ciphers: ["ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES256-GCM-SHA384"].join(
    ":"
  ),
  honorCipherOrder: true,
};

// USO CON EXPRESS.JS U OTROS FRAMEWORKS:

// Aunque este ejemplo usa el módulo http nativo,
// la misma lógica aplica para frameworks:

import express from "express";

const appExpress = express();

appExpress.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

// El servidor se crea de la misma manera
const servidorExpressHTTP = http.createServer(appExpress);
const servidorExpressHTTPS = https.createServer(opcionesHTTPS, appExpress);

// CONSIDERACIONES DE RENDIMIENTO:

// HTTPS tiene un impacto en el rendimiento debido a:
// - Handshake inicial SSL/TLS
// - Encriptación/desencriptación de datos
// Sin embargo, con hardware moderno el impacto es mínimo

// Para mejorar el rendimiento de HTTPS:
// 1. Usar Session Resumption
// 2. Implementar HTTP/2 (que requiere HTTPS)
// 3. Usar certificados ECDSA (más eficientes que RSA)

// EJEMPLO DE HTTP/2 CON HTTPS:

// Nota: Node.js tiene soporte experimental para HTTP/2
import http2 from "http2";

const servidorHTTP2 = http2.createSecureServer(opcionesHTTPS, (req, res) => {
  res.writeHead(200);
  res.end("¡Hola desde HTTP/2!");
});
```

**RESUMEN DE USOS PRÁCTICOS:**

- **Desarrollo local**: Usar HTTP para simplicidad
- **Producción**: Siempre usar HTTPS para seguridad
- **APIs**: HTTPS para proteger datos en tránsito
- **Aplicaciones web**: HTTPS requerido para muchas APIs del navegador
- **Redirección**: Configurar redirección automática de HTTP a HTTPS

La importación de ambos módulos es común en aplicaciones que necesitan soportar ambos protocolos o que implementan redirección de HTTP a HTTPS para garantizar que todas las conexiones sean seguras.

### Análisis del Objeto Request (req)

```jsx
import http from "http";

// Crear servidor HTTP con una función callback que se ejecuta en cada solicitud
// La función recibe dos objetos: req (solicitud) y res (respuesta)
const server = http.createServer((req, res) => {
  // ANÁLISIS DE LA SOLICITUD HTTP

  // Método HTTP (GET, POST, PUT, DELETE, etc.)
  // Indica la acción que el cliente quiere realizar
  console.log("Método:", req.method);

  // URL solicitada (ruta y query string)
  // Ejemplo: '/api/usuarios?pagina=1' o '/productos/123'
  console.log("URL:", req.url);

  // Headers de la petición
  // Contienen metadatos sobre la solicitud como:
  // - Content-Type: tipo de datos enviados
  // - User-Agent: información del cliente
  // - Authorization: credenciales de autenticación
  // - Accept: tipos de respuesta que el cliente puede entender
  console.log("Headers:", req.headers);

  // Información de la conexión del cliente
  // req.socket.remoteAddress contiene la dirección IP del cliente
  console.log("Dirección IP del cliente:", req.socket.remoteAddress);

  // EJEMPLO DE RUTEO BASADO EN MÉTODO HTTP

  // Manejar diferentes métodos HTTP con respuestas apropiadas
  if (req.method === "GET") {
    // GET - Solicitar datos (operación segura e idempotente)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Recibida petición GET");
  } else if (req.method === "POST") {
    // POST - Enviar datos para crear nuevos recursos
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Recibida petición POST");
  } else {
    // Método no soportado - retornar error 405 Method Not Allowed
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Método no permitido");
  }
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log(
    "Servidor ejecutándose en [http://localhost:3000](http://localhost:3000/)"
  );
});

// ANÁLISIS DETALLADO DE LAS PROPIEDADES DEL OBJETO req:

// Ejemplo de solicitud completa que se puede analizar:

function analizarSolicitudCompleta(req, res) {
  console.log("=== ANÁLISIS COMPLETO DE SOLICITUD ===");

  // INFORMACIÓN BÁSICA
  console.log("Método HTTP:", req.method);
  console.log("URL completa:", req.url);
  console.log("Versión HTTP:", req.httpVersion);

  // INFORMACIÓN DE LA CONEXIÓN
  console.log("IP del cliente:", req.socket.remoteAddress);
  console.log("Puerto del cliente:", req.socket.remotePort);
  console.log("IP local:", req.socket.localAddress);
  console.log("Puerto local:", req.socket.localPort);

  // HEADERS MÁS IMPORTANTES
  console.log("User-Agent:", req.headers["user-agent"]);
  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Content-Length:", req.headers["content-length"]);
  console.log("Accept:", req.headers["accept"]);
  console.log(
    "Authorization:",
    req.headers["authorization"] ? "Presente" : "No presente"
  );

  // INFORMACIÓN DE LA URL (usando el módulo URL)
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log("Pathname:", url.pathname);
  console.log("Query parameters:", url.searchParams.toString());
  console.log("Hostname:", url.hostname);
}

// MANEJO AVANZADO DE DIFERENTES MÉTODOS HTTP:

function manejoAvanzadoMetodos(req, res) {
  switch (req.method) {
    case "GET":
      // Operación de lectura - no debe modificar datos
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      });
      res.end(JSON.stringify({ mensaje: "Datos obtenidos", metodo: "GET" }));
      break;

    case "POST":
      // Operación de creación - procesar datos enviados
      res.writeHead(201, {
        "Content-Type": "application/json",
        Location: "/nuevo-recurso/123",
      });
      res.end(JSON.stringify({ mensaje: "Recurso creado", metodo: "POST" }));
      break;

    case "PUT":
      // Operación de actualización completa
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ mensaje: "Recurso actualizado", metodo: "PUT" })
      );
      break;

    case "PATCH":
      // Operación de actualización parcial
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          mensaje: "Recurso actualizado parcialmente",
          metodo: "PATCH",
        })
      );
      break;

    case "DELETE":
      // Operación de eliminación
      res.writeHead(204); // No Content - éxito sin cuerpo de respuesta
      res.end();
      break;

    case "OPTIONS":
      // Pre-flight request para CORS
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      });
      res.end();
      break;

    default:
      res.writeHead(405, {
        "Content-Type": "application/json",
        Allow: "GET, POST, PUT, DELETE, OPTIONS",
      });
      res.end(JSON.stringify({ error: "Método no permitido" }));
  }
}

// EJEMPLO DE MANEJO DE DATOS DEL CUERPO EN POST/PUT:

function manejarDatosCuerpo(req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    let body = "";

    // Acumular datos del cuerpo (pueden llegar en múltiples chunks)
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Cuando se reciben todos los datos
    req.on("end", () => {
      try {
        const datos = JSON.parse(body);
        console.log("Datos recibidos:", datos);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            estado: "éxito",
            datosRecibidos: datos,
          })
        );
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "JSON inválido" }));
      }
    });
  } else {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ error: "Método no soportado para esta operación" })
    );
  }
}

// MIDDLEWARE DE LOGGING MEJORADO:

function crearServidorConLogging() {
  return http.createServer((req, res) => {
    const timestamp = new Date().toISOString();
    const ip = req.socket.remoteAddress;

    console.log(`[${timestamp}] ${ip} - ${req.method} ${req.url}`);

    // Medir tiempo de respuesta
    const inicio = Date.now();

    res.on("finish", () => {
      const duracion = Date.now() - inicio;
      console.log(
        `[${timestamp}] Respuesta: ${res.statusCode} - ${duracion}ms`
      );
    });

    // Lógica principal del servidor
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("OK");
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Método no permitido");
    }
  });
}
```

**RESUMEN DE PROPIEDADES PRINCIPALES DEL OBJETO `req`:**

- **`req.method`**: Método HTTP (GET, POST, PUT, etc.)
- **`req.url`**: Ruta y parámetros de consulta solicitados
- **`req.headers`**: Objeto con todos los headers de la solicitud
- **`req.socket`**: Información de la conexión TCP
- **`req.httpVersion`**: Versión del protocolo HTTP

Este servidor demuestra los fundamentos del manejo de solicitudes HTTP en Node.js, proporcionando la base sobre la cual se construyen frameworks web más complejos como Express.js.

### Manejo Avanzado de Respuestas

```jsx
import http from "http";

const server = http.createServer((req, res) => {
  // CONFIGURACIÓN DE HEADERS DE RESPUESTA

  // Headers básicos para todas las respuestas
  // Content-Type indica el tipo de contenido que se envía
  res.setHeader("Content-Type", "application/json");

  // Header personalizado que indica la tecnología utilizada
  res.setHeader("X-Powered-By", "Node.js HTTP");

  // Header para control de CORS (permite solicitudes desde otros dominios)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // MANEJO DE DIFERENTES RUTAS CON CÓDIGOS DE ESTADO HTTP

  // Ruta: /success - Código 200 OK
  if (req.url === "/success") {
    // 200 OK - Solicitud exitosa
    // writeHead() establece el código de estado y puede sobrescribir headers
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Éxito: Operación completada");
  }

  // Ruta: /not-found - Código 404 Not Found
  else if (req.url === "/not-found") {
    // 404 Not Found - Recurso solicitado no existe
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Error: Recurso no encontrado");
  }

  // Ruta: /server-error - Código 500 Internal Server Error
  else if (req.url === "/server-error") {
    // 500 Internal Server Error - Error genérico del servidor
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error: Problema interno del servidor");
  }

  // Ruta: /redirect - Código 302 Found (Redirección temporal)
  else if (req.url === "/redirect") {
    // 302 Found - Redirección temporal
    // El header Location indica a dónde redirigir
    res.writeHead(302, {
      Location: "/success",
      "Content-Type": "text/plain",
    });
    res.end("Redirigiendo...");
  }

  // Ruta por defecto - Código 200 OK
  else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Página principal");
  }
});

server.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
  console.log("Endpoints disponibles:");
  console.log("  GET /success        - 200 OK");
  console.log("  GET /not-found      - 404 Not Found");
  console.log("  GET /server-error   - 500 Internal Server Error");
  console.log("  GET /redirect       - 302 Redirect");
  console.log("  GET /               - Página principal");
});

// EXPLICACIÓN DETALLADA DE CÓDIGOS DE ESTADO HTTP:

function explicacionCodigosEstado() {
  // CÓDIGOS 2xx - ÉXITO
  // 200 OK: Solicitud exitosa, respuesta contiene los datos solicitados
  // 201 Created: Recurso creado exitosamente (usado en POST)
  // 204 No Content: Éxito pero sin contenido en la respuesta (usado en DELETE)
  // CÓDIGOS 3xx - REDIRECCIÓN
  // 301 Moved Permanently: Redirección permanente
  // 302 Found: Redirección temporal
  // 304 Not Modified: El recurso no ha cambiado (caché)
  // CÓDIGOS 4xx - ERROR DEL CLIENTE
  // 400 Bad Request: Solicitud mal formada
  // 401 Unauthorized: No autenticado
  // 403 Forbidden: Autenticado pero sin permisos
  // 404 Not Found: Recurso no existe
  // 405 Method Not Allowed: Método HTTP no permitido
  // CÓDIGOS 5xx - ERROR DEL SERVIDOR
  // 500 Internal Server Error: Error genérico del servidor
  // 501 Not Implemented: Funcionalidad no implementada
  // 503 Service Unavailable: Servicio no disponible
}

// EJEMPLO MÁS COMPLETO CON MÁS CÓDIGOS DE ESTADO:

function servidorCompleto() {
  return http.createServer((req, res) => {
    // Headers base para todas las respuestas
    res.setHeader("X-Powered-By", "Node.js");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = req.url;
    const method = req.method;

    // RUTEO MÁS DETALLADO
    if (url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
                <html>
                    <body>
                        <h1>Página Principal</h1>
                        <ul>
                            <li><a href="/success">/success (200)</a></li>
                            <li><a href="/created">/created (201)</a></li>
                            <li><a href="/no-content">/no-content (204)</a></li>
                            <li><a href="/not-found">/not-found (404)</a></li>
                            <li><a href="/server-error">/server-error (500)</a></li>
                            <li><a href="/redirect">/redirect (302)</a></li>
                            <li><a href="/bad-request">/bad-request (400)</a></li>
                            <li><a href="/unauthorized">/unauthorized (401)</a></li>
                        </ul>
                    </body>
                </html>
            `);
    } else if (url === "/success") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Operación exitosa", status: 200 }));
    } else if (url === "/created" && method === "POST") {
      // 201 Created - Usado cuando se crea un nuevo recurso
      res.writeHead(201, {
        "Content-Type": "application/json",
        Location: "/resources/123", // URI del nuevo recurso
      });
      res.end(
        JSON.stringify({
          message: "Recurso creado exitosamente",
          id: 123,
          status: 201,
        })
      );
    } else if (url === "/no-content") {
      // 204 No Content - Éxito sin contenido en el cuerpo
      res.writeHead(204);
      res.end(); // Sin cuerpo de respuesta
    } else if (url === "/bad-request") {
      // 400 Bad Request - Solicitud mal formada
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Solicitud inválida",
          details: "Faltan campos requeridos",
          status: 400,
        })
      );
    } else if (url === "/unauthorized") {
      // 401 Unauthorized - No autenticado
      res.writeHead(401, {
        "Content-Type": "application/json",
        "WWW-Authenticate": 'Basic realm="Acceso restringido"',
      });
      res.end(
        JSON.stringify({
          error: "No autorizado",
          message: "Se requiere autenticación",
          status: 401,
        })
      );
    } else if (url === "/method-not-allowed") {
      // 405 Method Not Allowed
      res.writeHead(405, {
        "Content-Type": "application/json",
        Allow: "GET, POST", // Métodos permitidos para este endpoint
      });
      res.end(
        JSON.stringify({
          error: "Método no permitido",
          allowedMethods: ["GET", "POST"],
          status: 405,
        })
      );
    } else if (url === "/redirect-permanent") {
      // 301 Moved Permanently - Redirección permanente
      res.writeHead(301, {
        Location: "/success",
        "Content-Type": "text/plain",
      });
      res.end("Redirección permanente a /success");
    } else if (url === "/not-found") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Recurso no encontrado",
          requestedUrl: url,
          status: 404,
        })
      );
    } else if (url === "/server-error") {
      // Simular un error del servidor
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Error interno del servidor",
          message: "Algo salió mal en el servidor",
          status: 500,
        })
      );
    } else {
      // Ruta no encontrada
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Endpoint no encontrado",
          availableEndpoints: [
            "/",
            "/success",
            "/created",
            "/no-content",
            "/not-found",
            "/server-error",
            "/redirect",
            "/bad-request",
            "/unauthorized",
            "/method-not-allowed",
          ],
          status: 404,
        })
      );
    }
  });
}

// DIFERENCIA ENTRE setHeader() Y writeHead():

function diferenciaHeaders() {
  const server = http.createServer((req, res) => {
    // setHeader() - Establece un header individual
    // Se puede llamar múltiples veces para diferentes headers
    res.setHeader("Content-Type", "application/json");
    res.setHeader("X-Custom-Header", "valor personalizado");

    // writeHead() - Establece el código de estado y puede sobrescribir headers
    // Debe llamarse antes de end() y después de setHeader()
    // Los headers en writeHead() sobrescriben los establecidos con setHeader()
    res.writeHead(200, {
      "Content-Type": "text/plain", // Sobrescribe el Content-Type anterior
      "X-Another-Header": "otro valor",
    });

    res.end("Respuesta con headers mixtos");
  });
}
```

**RESUMEN DE HEADERS COMUNES:**

- **`Content-Type`**: Tipo de contenido (text/html, application/json, etc.)
- **`Location`**: Para redirecciones (302, 301)
- **`Cache-Control`**: Control de caché
- **`Access-Control-Allow-Origin`**: Control CORS
- **`X-Powered-By`**: Header personalizado para información del servidor
- **`WWW-Authenticate`**: Esquema de autenticación requerido

Este servidor demuestra el uso correcto de códigos de estado HTTP y headers, que es fundamental para construir APIs RESTful y aplicaciones web profesionales.

## Servidor HTTP con Enrutamiento Completo

Te explico este servidor HTTP completo con enrutamiento en partes:

**PRIMERA PARTE: CONFIGURACIÓN INICIAL Y MANEJO DE CORS**

```jsx
import http from "http";
import { URL } from "url";

const server = http.createServer(async (req, res) => {
  // Parsear URL para obtener pathname y parámetros de consulta
  // Se construye la URL completa usando el host de los headers
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const queryParams = parsedUrl.searchParams;

  // Configurar CORS para desarrollo
  // Permite solicitudes desde cualquier origen (*)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Manejar preflight requests (CORS)
  // Las solicitudes OPTIONS son enviadas por el navegador antes de requests complejos
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No Content
    res.end();
    return; // Terminar la ejecución aquí para preflight
  }

  try {
    // Enrutamiento basado en método y ruta
    // Se usa switch(true) para evaluar múltiples condiciones
    switch (true) {
      case req.method === "GET" && pathname === "/":
        await handleHome(req, res);
        break;

      case req.method === "GET" && pathname === "/api/users":
        await handleGetUsers(req, res, queryParams);
        break;

      case req.method === "GET" && pathname.startsWith("/api/users/"):
        await handleGetUserById(req, res, pathname);
        break;

      case req.method === "POST" && pathname === "/api/users":
        await handleCreateUser(req, res);
        break;

      case req.method === "PUT" && pathname.startsWith("/api/users/"):
        await handleUpdateUser(req, res, pathname);
        break;

      case req.method === "DELETE" && pathname.startsWith("/api/users/"):
        await handleDeleteUser(req, res, pathname);
        break;

      default:
        handleNotFound(res);
    }
  } catch (error) {
    handleServerError(res, error);
  }
});
```

**SEGUNDA PARTE: MANEJADOR DE LA PÁGINA PRINCIPAL Y DATOS**

```jsx
// Manejador para la ruta raíz
async function handleHome(req, res) {
  const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Servidor Node.js HTTP</title>
        </head>
        <body>
            <h1>Bienvenido al Servidor HTTP</h1>
            <p>Este es un servidor construido con el módulo nativo HTTP de Node.js</p>
            <ul>
                <li><a href="/api/users">Ver usuarios (GET)</a></li>
                <li>Crear usuario (POST) - Usar herramienta como Postman</li>
            </ul>
        </body>
        </html>
    `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(htmlResponse);
}

// Datos de ejemplo (simulando una base de datos)
const users = [
  { id: 1, name: "Ana García", email: "ana@ejemplo.com", active: true },
  { id: 2, name: "Carlos López", email: "carlos@ejemplo.com", active: true },
  { id: 3, name: "María Rodríguez", email: "maria@ejemplo.com", active: false },
];
```

**TERCERA PARTE: MANEJADORES GET - LECTURA DE DATOS**

```jsx
// Manejador para obtener todos los usuarios
async function handleGetUsers(req, res, queryParams) {
  // Filtrar usuarios activos si se solicita mediante parámetro de consulta
  // Ejemplo: /api/users?active=true
  const onlyActive = queryParams.get("active") === "true";
  let usersToReturn = users;

  if (onlyActive) {
    usersToReturn = users.filter((user) => user.active);
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      data: usersToReturn,
      count: usersToReturn.length,
    })
  );
}

// Manejador para obtener usuario por ID
async function handleGetUserById(req, res, pathname) {
  // Extraer el ID de la ruta: /api/users/123 → 123
  const userId = parseInt(pathname.split("/").pop());

  // Validar que el ID sea un número válido
  if (isNaN(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        error: "ID de usuario inválido",
      })
    );
    return;
  }

  // Buscar usuario en el array
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        error: "Usuario no encontrado",
      })
    );
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      data: user,
    })
  );
}
```

**CUARTA PARTE: MANEJADORES POST - CREACIÓN DE DATOS**

```jsx
// Manejador para crear usuario
async function handleCreateUser(req, res) {
  let body = "";

  // Recibir datos del body en chunks (fragmentos)
  // En HTTP, el cuerpo de la solicitud puede llegar en múltiples partes
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Cuando se reciben todos los datos
  req.on("end", () => {
    try {
      // Parsear el JSON recibido
      const userData = JSON.parse(body);

      // Validaciones básicas de campos requeridos
      if (!userData.name || !userData.email) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: "Nombre y email son requeridos",
          })
        );
        return;
      }

      // Crear nuevo usuario con ID autoincremental
      const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        active: userData.active !== undefined ? userData.active : true,
      };

      // Agregar al array (en producción sería INSERT en base de datos)
      users.push(newUser);

      // Retornar 201 Created con el nuevo usuario
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: newUser,
          message: "Usuario creado exitosamente",
        })
      );
    } catch (error) {
      // Error al parsear JSON
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          error: "JSON inválido en el cuerpo de la petición",
        })
      );
    }
  });
}
```

**QUINTA PARTE: MANEJADORES PUT Y DELETE - ACTUALIZACIÓN Y ELIMINACIÓN**

```jsx
// Manejador para actualizar usuario
async function handleUpdateUser(req, res, pathname) {
  const userId = parseInt(pathname.split("/").pop());

  if (isNaN(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "ID inválido" }));
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      // Buscar índice del usuario a actualizar
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ success: false, error: "Usuario no encontrado" })
        );
        return;
      }

      // Parsear datos de actualización
      const updateData = JSON.parse(body);

      // Actualizar usuario manteniendo propiedades existentes y sobreescribiendo las nuevas
      // El spread operator (...) combina los objetos
      users[userIndex] = { ...users[userIndex], ...updateData };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          data: users[userIndex],
          message: "Usuario actualizado exitosamente",
        })
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "JSON inválido" }));
    }
  });
}

// Manejador para eliminar usuario
async function handleDeleteUser(req, res, pathname) {
  const userId = parseInt(pathname.split("/").pop());

  if (isNaN(userId)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "ID inválido" }));
    return;
  }

  // Buscar índice del usuario
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Usuario no encontrado" }));
    return;
  }

  // Eliminar usuario del array (en producción sería soft delete)
  users.splice(userIndex, 1);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      message: "Usuario eliminado exitosamente",
    })
  );
}
```

**SEXTA PARTE: MANEJADORES DE ERRORES Y CONFIGURACIÓN FINAL**

```jsx
// Manejador para rutas no encontradas
function handleNotFound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: false,
      error: "Endpoint no encontrado",
      message: "La ruta solicitada no existe en este servidor",
    })
  );
}

// Manejador de errores del servidor
function handleServerError(res, error) {
  console.error("Error del servidor:", error);

  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: false,
      error: "Error interno del servidor",
      // En desarrollo muestra el mensaje de error, en producción mensaje genérico
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Algo salió mal",
    })
  );
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor API REST ejecutándose en <http://localhost>:${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
});
```

**CARACTERÍSTICAS PRINCIPALES DEL SERVIDOR:**

- **Arquitectura RESTful**: Sigue convenciones REST para rutas y métodos HTTP
- **CRUD Completo**: Create, Read, Update, Delete para recursos de usuario
- **Manejo de CORS**: Configuración para desarrollo y preflight requests
- **Validación de Datos**: Validación básica de entradas y JSON
- **Manejo de Errores**: Centralizado con códigos de estado HTTP apropiados
- **Parsing de Cuerpo**: Manejo de datos POST/PUT en formato JSON
- **Variables de Entorno**: Configuración flexible de puerto y entorno

Este servidor representa una implementación completa de una API REST usando solo el módulo HTTP nativo de Node.js, sin dependencias externas.

## Cliente HTTP para Hacer Peticiones

```jsx
import http from "http";
import https from "https";

// Función para hacer peticiones HTTP/HTTPS
// Esta función envuelve el módulo nativo en una Promise para usar async/await
function httpRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    // Determinar si es HTTP o HTTPS basado en el protocolo en las opciones
    // options.protocol puede ser 'http:' o 'https:'
    const protocol = options.protocol === "https:" ? https : http;

    // Crear la solicitud HTTP/HTTPS
    // protocol.request() retorna un objeto ClientRequest
    const req = protocol.request(options, (res) => {
      // res es un objeto IncomingMessage que representa la respuesta
      let responseData = "";

      // Evento 'data': se dispara cuando llegan chunks de datos
      // En HTTP, la respuesta puede llegar en múltiples fragmentos
      res.on("data", (chunk) => {
        responseData += chunk; // Acumular los chunks
      });

      // Evento 'end': se dispara cuando se completa la recepción de datos
      res.on("end", () => {
        // Resolver la Promise con un objeto que contiene:
        resolve({
          statusCode: res.statusCode, // Código de estado HTTP (200, 404, etc.)
          headers: res.headers, // Headers de la respuesta
          data: responseData, // Datos acumulados como string
        });
      });
    });

    // Manejar errores de la solicitud
    // Pueden ser errores de conexión, timeout, DNS, etc.
    req.on("error", (error) => {
      reject(error); // Rechazar la Promise con el error
    });

    // Opcional: Si hay datos para enviar en el cuerpo (POST, PUT, PATCH)
    if (data) {
      req.write(data); // Escribir los datos en el cuerpo de la solicitud
    }

    // Finalizar la solicitud
    // Esto envía la solicitud al servidor
    req.end();
  });
}

// Ejemplos de uso del cliente HTTP
async function examples() {
  try {
    // EJEMPLO 1: PETICIÓN GET - Obtener datos
    console.log("=== EJEMPLO 1: PETICIÓN GET ===");

    const getResponse = await httpRequest({
      hostname: "jsonplaceholder.typicode.com", // Dominio del servidor
      port: 443, // Puerto HTTPS
      path: "/posts/1", // Ruta del recurso
      method: "GET", // Método HTTP
      protocol: "https:", // Protocolo a usar
      headers: {
        "Content-Type": "application/json", // Tipo de contenido esperado
        "User-Agent": "Node.js-HTTP-Client/1.0", // Identificar nuestro cliente
      },
    });

    console.log("Status Code:", getResponse.statusCode);
    console.log("GET Response:", JSON.parse(getResponse.data));

    // EJEMPLO 2: PETICIÓN POST - Crear nuevo recurso
    console.log("\n=== EJEMPLO 2: PETICIÓN POST ===");

    // Datos a enviar en el cuerpo de la solicitud
    const postData = JSON.stringify({
      title: "Mi nuevo post",
      body: "Contenido del post creado desde Node.js",
      userId: 1,
    });

    const postResponse = await httpRequest(
      {
        hostname: "jsonplaceholder.typicode.com",
        port: 443,
        path: "/posts",
        method: "POST",
        protocol: "https:",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData), // Longitud del cuerpo en bytes
          "User-Agent": "Node.js-HTTP-Client/1.0",
        },
      },
      postData
    ); // Pasar los datos como segundo parámetro

    console.log("Status Code:", postResponse.statusCode);
    console.log("POST Response:", JSON.parse(postResponse.data));
  } catch (error) {
    console.error("Error en petición HTTP:", error);
  }
}

// MÁS EJEMPLOS DE USO PRÁCTICO:

async function ejemplosAvanzados() {
  try {
    // EJEMPLO 3: PETICIÓN CON TIMEOUT
    console.log("\n=== EJEMPLO 3: PETICIÓN CON TIMEOUT ===");

    // Podemos agregar timeout manualmente con Promise.race()
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Timeout después de 5 segundos")),
        5000
      );
    });

    const requestPromise = httpRequest({
      hostname: "jsonplaceholder.typicode.com",
      port: 443,
      path: "/posts",
      method: "GET",
      protocol: "https:",
    });

    const response = await Promise.race([requestPromise, timeoutPromise]);
    console.log("Petición completada antes del timeout");

    // EJEMPLO 4: PETICIÓN CON PARÁMETROS DE QUERY
    console.log("\n=== EJEMPLO 4: PETICIÓN CON QUERY PARAMS ===");

    const queryParams = new URLSearchParams({
      userId: 1,
      _limit: 5,
    }).toString();

    const queryResponse = await httpRequest({
      hostname: "jsonplaceholder.typicode.com",
      port: 443,
      path: `/posts?${queryParams}`, // Incluir parámetros en la ruta
      method: "GET",
      protocol: "https:",
    });

    const posts = JSON.parse(queryResponse.data);
    console.log(`Recibidos ${posts.length} posts del usuario 1`);

    // EJEMPLO 5: MANEJO DE ERRORES ESPECÍFICOS
    console.log("\n=== EJEMPLO 5: MANEJO DE ERRORES ===");

    try {
      // Intentar acceder a un recurso que no existe
      await httpRequest({
        hostname: "jsonplaceholder.typicode.com",
        port: 443,
        path: "/posts/9999", // Probablemente no exista
        method: "GET",
        protocol: "https:",
      });
    } catch (error) {
      console.log("Error capturado:", error.message);
    }
  } catch (error) {
    console.error("Error en ejemplos avanzados:", error);
  }
}

// VERSIÓN MEJORADA DEL CLIENTE HTTP:

function httpRequestMejorada(options, data = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.protocol === "https:" ? https : http;

    // Agregar timeout a la solicitud
    const req = protocol.request(options, (res) => {
      let responseData = "";
      let statusCode = res.statusCode;

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        // Determinar si fue exitoso basado en el código de estado
        const esExitoso = statusCode >= 200 && statusCode < 300;

        const resultado = {
          exito: esExitoso,
          statusCode: statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          data: responseData,
        };

        if (esExitoso) {
          resolve(resultado);
        } else {
          // Para códigos de error HTTP, aún resolvemos pero con exito: false
          resolve(resultado);
        }
      });
    });

    // Manejar timeout
    req.setTimeout(10000, () => {
      req.destroy(); // Destruir la solicitud
      reject(new Error("Timeout de la solicitud HTTP"));
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

// EJEMPLO DE USO EN UNA APLICACIÓN REAL:

class APIClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "User-Agent": "MiApp/1.0",
      ...defaultHeaders,
    };
  }

  async get(endpoint, headers = {}) {
    const url = new URL(endpoint, this.baseURL);

    return await httpRequestMejorada({
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method: "GET",
      protocol: url.protocol,
      headers: { ...this.defaultHeaders, ...headers },
    });
  }

  async post(endpoint, data, headers = {}) {
    const url = new URL(endpoint, this.baseURL);
    const body = JSON.stringify(data);

    return await httpRequestMejorada(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: url.pathname,
        method: "POST",
        protocol: url.protocol,
        headers: {
          ...this.defaultHeaders,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          ...headers,
        },
      },
      body
    );
  }
}

// USO DEL CLIENTE DE API:

async function usarAPIClient() {
  const api = new APIClient("https://jsonplaceholder.typicode.com");

  try {
    // Usar los métodos simplificados
    const usuarios = await api.get("/users");
    console.log("Usuarios:", JSON.parse(usuarios.data));

    const nuevoPost = await api.post("/posts", {
      title: "Post desde APIClient",
      body: "Contenido del post",
      userId: 1,
    });
    console.log("Nuevo post creado:", JSON.parse(nuevoPost.data));
  } catch (error) {
    console.error("Error con APIClient:", error);
  }
}

// Ejecutar todos los ejemplos
async function ejecutarTodosLosEjemplos() {
  console.log("🚀 INICIANDO EJEMPLOS DE CLIENTE HTTP\n");

  await examples();
  await ejemplosAvanzados();
  await usarAPIClient();

  console.log("\n✅ TODOS LOS EJEMPLOS COMPLETADOS");
}

// Descomentar para ejecutar:
// ejecutarTodosLosEjemplos();

// RESUMEN DE CARACTERÍSTICAS PRINCIPALES:

// 1. ✅ Soporte para HTTP y HTTPS
// 2. ✅ Interface basada en Promises para async/await
// 3. ✅ Envío de datos en solicitudes POST/PUT
// 4. ✅ Manejo de errores de conexión y timeout
// 5. ✅ Configuración flexible de headers
// 6. ✅ Acumulación automática de datos de respuesta
// 7. ✅ Retorno de status code y headers de respuesta

// CASOS DE USO COMUNES:

// - Consumir APIs REST externas
// - Hacer web scraping
// - Comunicación entre microservicios
// - Integración con servicios de terceros
// - Testing de endpoints HTTP
```

## Servidor HTTP con Manejo de Archivos Estáticos

```jsx
// Importar módulos necesarios
import http from "http"; // Módulo para crear servidor HTTP
import fs from "fs/promises"; // Módulo de sistema de archivos con Promises
import path from "path"; // Módulo para manejar rutas de archivos
import { fileURLToPath } from "url"; // Utilidad para obtener __dirname en ES Modules

// Obtener __filename y __dirname equivalentes en ES Modules
// En CommonJS estas variables están disponibles globalmente, pero en ES Modules necesitamos crearlas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear servidor HTTP
const server = http.createServer(async (req, res) => {
  // Este servidor solo sirve archivos estáticos, por eso solo acepta métodos GET
  if (req.method === "GET") {
    try {
      // Determinar la ruta del archivo a servir
      // Si la URL es '/' (raíz), servir index.html por defecto
      // Si la URL es otra (/about.html, /styles.css, etc.), usar esa ruta
      let filePath = req.url === "/" ? "/index.html" : req.url;

      // Construir la ruta completa al archivo
      // path.join() es seguro y maneja automáticamente las diferencias entre sistemas operativos
      filePath = path.join(__dirname, "public", filePath);

      // Leer el archivo del sistema de archivos
      // fs.readFile() con await porque fs/promises retorna Promises
      const content = await fs.readFile(filePath);

      // Determinar el tipo MIME basado en la extensión del archivo
      // Esto es crucial para que el navegador sepa cómo interpretar el contenido
      const extname = path.extname(filePath);

      // Mapeo de extensiones a tipos MIME
      const mimeTypes = {
        ".html": "text/html", // Páginas HTML
        ".css": "text/css", // Hojas de estilo
        ".js": "application/javascript", // Código JavaScript
        ".png": "image/png", // Imágenes PNG
        ".jpg": "image/jpeg", // Imágenes JPEG
        ".gif": "image/gif", // Imágenes GIF
        ".json": "application/json", // Datos JSON
      };

      // Obtener el Content-Type apropiado o usar 'application/octet-stream' como predeterminado
      const contentType = mimeTypes[extname] || "application/octet-stream";

      // Configurar respuesta exitosa
      res.writeHead(200, { "Content-Type": contentType });

      // Enviar el contenido del archivo
      res.end(content);
    } catch (error) {
      // Manejo de errores al leer archivos

      if (error.code === "ENOENT") {
        // ENOENT = Error NO ENTity - El archivo no existe
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Archivo no encontrado</h1>");
      } else {
        // Cualquier otro error (permisos, archivo corrupto, etc.)
        console.error("Error del servidor:", error);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>500 - Error interno del servidor</h1>");
      }
    }
  } else {
    // Si el método no es GET, retornar error 405 Method Not Allowed
    // Este servidor solo sirve para leer archivos, no acepta POST, PUT, etc.
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Método no permitido");
  }
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log("Servidor de archivos estáticos en http://localhost:3000");
});

// EJEMPLO DE ESTRUCTURA DE CARPETAS NECESARIA:

/*
mi-proyecto/
├── server.js (este archivo)
└── public/
    ├── index.html
    ├── about.html
    ├── styles/
    │   └── main.css
    ├── js/
    │   └── app.js
    └── images/
        ├── logo.png
        └── background.jpg
*/

// EJEMPLO DE ARCHIVOS QUE PODRÍA CONTENER LA CARPETA PUBLIC:

// public/index.html
const ejemploIndexHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Mi Sitio Estático</title>
    <link rel="stylesheet" href="/styles/main.css">
</head>
<body>
    <h1>Bienvenido a mi sitio</h1>
    <img src="/images/logo.png" alt="Logo">
    <p>Este es un sitio servido con Node.js HTTP</p>
    <script src="/js/app.js"></script>
</body>
</html>
`;

// public/styles/main.css
const ejemploCSS = `
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
}
`;

// public/js/app.js
const ejemploJS = `
console.log('JavaScript cargado correctamente');
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página completamente cargada');
});
`;

// VERSIÓN MEJORADA CON MÁS CARACTERÍSTICAS:

class StaticFileServer {
  constructor(publicFolder = "public", port = 3000) {
    this.publicFolder = publicFolder;
    this.port = port;
    this.mimeTypes = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".json": "application/json",
      ".txt": "text/plain",
      ".ico": "image/x-icon",
    };
  }

  async start() {
    const server = http.createServer(async (req, res) => {
      await this.handleRequest(req, res);
    });

    server.listen(this.port, () => {
      console.log(
        `Servidor de archivos estáticos en http://localhost:${this.port}`
      );
    });
  }

  async handleRequest(req, res) {
    // Solo permitir métodos GET y HEAD
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Método no permitido");
      return;
    }

    try {
      // Prevenir directory traversal attacks
      const safePath = this.getSafePath(req.url);

      // Construir ruta completa
      const filePath = path.join(__dirname, this.publicFolder, safePath);

      // Verificar que el archivo esté dentro del directorio público
      if (!this.isPathSafe(filePath)) {
        res.writeHead(403, { "Content-Type": "text/html" });
        res.end("<h1>403 - Acceso prohibido</h1>");
        return;
      }

      // Leer estadísticas del archivo
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        // Si es directorio, servir index.html
        const indexFilePath = path.join(filePath, "index.html");
        await this.serveFile(indexFilePath, res);
      } else {
        // Si es archivo, servirlo directamente
        await this.serveFile(filePath, res);
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  getSafePath(url) {
    // Limpiar la URL y prevenir directory traversal
    let safePath = url.split("?")[0]; // Remover query parameters
    safePath = safePath.split("#")[0]; // Remover fragmentos

    // Si la ruta es vacía o solo '/', servir index.html
    if (safePath === "" || safePath === "/") {
      return "/index.html";
    }

    return safePath;
  }

  isPathSafe(filePath) {
    // Verificar que la ruta resuelta esté dentro del directorio público
    const publicDir = path.join(__dirname, this.publicFolder);
    const resolvedPath = path.resolve(filePath);

    return resolvedPath.startsWith(publicDir);
  }

  async serveFile(filePath, res) {
    const content = await fs.readFile(filePath);
    const extname = path.extname(filePath).toLowerCase();
    const contentType = this.mimeTypes[extname] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": content.length,
    });

    res.end(content);
  }

  handleError(error, res) {
    if (error.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - No encontrado</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #d32f2f; }
                    </style>
                </head>
                <body>
                    <h1>404 - Archivo no encontrado</h1>
                    <p>El recurso solicitado no existe en este servidor.</p>
                    <a href="/">Volver al inicio</a>
                </body>
                </html>
            `);
    } else {
      console.error("Error del servidor:", error);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>500 - Error del servidor</title>
                </head>
                <body>
                    <h1>500 - Error interno del servidor</h1>
                    <p>Ha ocurrido un error inesperado.</p>
                </body>
                </html>
            `);
    }
  }
}

// USO DE LA VERSIÓN MEJORADA:

// Crear y iniciar servidor
// const fileServer = new StaticFileServer('public', 3000);
// fileServer.start();

// CARACTERÍSTICAS DE LA VERSIÓN MEJORADA:

// 1. ✅ Prevención de directory traversal attacks
// 2. ✅ Soporte para directorios (sirve index.html automáticamente)
// 3. ✅ Manejo de métodos HEAD
// 4. ✅ Páginas de error más informativas
// 5. ✅ Configuración flexible de carpeta pública y puerto
// 6. ✅ Validación de rutas seguras
// 7. ✅ Headers Content-Length para mejor performance

// USOS PRÁCTICOS DE ESTE SERVIDOR:

// 1. Desarrollo frontend: Servir archivos HTML, CSS, JS durante el desarrollo
// 2. Prototipado rápido: Crear prototipos de sitios web estáticos
// 3. Documentación: Servir documentación HTML estática
// 4. Aplicaciones SPA: Servir Single Page Applications
// 5. Archivos de descarga: Servir archivos para descarga

// EJEMPLO DE CONFIGURACIÓN PARA DIFERENTES ENTORNOS:

function createServerForEnvironment() {
  const environment = process.env.NODE_ENV || "development";
  const publicFolder = environment === "production" ? "dist" : "public";
  const port = process.env.PORT || 3000;

  const server = new StaticFileServer(publicFolder, port);
  server.start();

  return server;
}

// Descomentar para usar:
// createServerForEnvironment();
```

**CARACTERÍSTICAS PRINCIPALES DEL SERVIDOR:**

1. **Servicio de Archivos Estáticos**: Sirve HTML, CSS, JS, imágenes, etc.
2. **Detección Automática de MIME Types**: Configura el Content-Type correcto
3. **Manejo de Errores**: 404 para archivos no encontrados, 500 para errores del servidor
4. **Seguridad Básica**: Solo acepta métodos GET
5. **Ruta por Defecto**: `/` sirve `index.html` automáticamente

**FLUJO DE UNA SOLICITUD:**

1. Cliente solicita `http://localhost:3000/styles/main.css`
2. Servidor busca `public/styles/main.css`
3. Detecta extensión `.css` → Content-Type: `text/css`
4. Lee el archivo y lo envía al cliente
5. Si no existe, retorna error 404

Este servidor es ideal para desarrollo frontend y aplicaciones estáticas, proporcionando una base sólida que puede extenderse con más funcionalidades según sea necesario.

## Mejores Prácticas y Configuraciones

### Manejo de Errores del Servidor

```jsx
import http from "http";

// Crear servidor HTTP básico
const server = http.createServer((req, res) => {
  // Lógica principal del servidor para manejar solicitudes HTTP
  // Esta función se ejecuta cada vez que llega una nueva solicitud
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK - Solicitud procesada correctamente");
});

// ============================================================================
// MANEJO DE EVENTOS DEL SERVIDOR
// ============================================================================

// 1. EVENTO 'error' - Maneja errores del servidor
server.on("error", (error) => {
  console.error("Error del servidor:", error);

  // Manejar específicamente el error de puerto ocupado
  if (error.code === "EADDRINUSE") {
    console.log("El puerto ya está en uso. Intentando con otro puerto...");

    // Estrategias para manejar puerto ocupado:
    // a) Intentar con otro puerto automáticamente
    const newPort = parseInt(process.env.PORT || "3000") + 1;
    console.log(`Intentando con puerto ${newPort}...`);
    server.listen(newPort);

    // b) En producción, podrías registrar el error y salir
    // console.error('Puerto ocupado. Saliendo...');
    // process.exit(1);
  }

  // Manejar otros errores comunes
  else if (error.code === "EACCES") {
    console.error(
      "Error de permisos: No tienes permisos para usar este puerto"
    );
  } else if (error.code === "EADDRNOTAVAIL") {
    console.error("Error: La dirección no está disponible");
  }
});

// 2. EVENTO 'connection' - Se dispara cuando un cliente se conecta
server.on("connection", (socket) => {
  // socket es un objeto net.Socket que representa la conexión TCP
  console.log(
    "Nueva conexión desde:",
    socket.remoteAddress + ":" + socket.remotePort
  );

  // Podemos agregar más información sobre la conexión
  console.log("Conexión local:", socket.localAddress + ":" + socket.localPort);
  console.log("Tiempo de conexión:", new Date().toISOString());

  // También podemos manejar eventos en el socket individual
  socket.on("close", () => {
    console.log("Conexión cerrada desde:", socket.remoteAddress);
  });

  socket.on("error", (error) => {
    console.error(
      "Error en conexión con",
      socket.remoteAddress,
      ":",
      error.message
    );
  });
});

// 3. EVENTO 'close' - Se dispara cuando el servidor se cierra
server.on("close", () => {
  console.log("Servidor cerrado - Ya no acepta nuevas conexiones");
  console.log("Todas las conexiones existentes han sido finalizadas");
});

// 4. EVENTO 'listening' - Se dispara cuando el servidor comienza a escuchar
server.on("listening", () => {
  const address = server.address();
  console.log("Servidor escuchando en:", address.address + ":" + address.port);
});

// ============================================================================
// MANEJO DE SEÑALES DEL SISTEMA OPERATIVO (Graceful Shutdown)
// ============================================================================

// 1. SIGTERM - Señal de terminación (usada por Docker, Kubernetes, etc.)
process.on("SIGTERM", () => {
  console.log("\nRecibida señal SIGTERM. Cerrando servidor gracefulmente...");
  console.log("No se aceptarán nuevas conexiones...");

  // server.close() detiene el servidor de aceptar nuevas conexiones
  // pero permite terminar las conexiones existentes
  server.close(() => {
    console.log("✅ Servidor cerrado exitosamente");
    console.log("✅ Todas las conexiones existentes fueron completadas");
    process.exit(0); // Salir con código 0 (éxito)
  });

  // Timeout para forzar cierre si toma demasiado tiempo
  setTimeout(() => {
    console.log("⚠️  Timeout de cierre graceful. Forzando salida...");
    process.exit(1);
  }, 10000); // 10 segundos
});

// 2. SIGINT - Señal de interrupción (Ctrl+C en terminal)
process.on("SIGINT", () => {
  console.log("\nRecibida señal SIGINT (Ctrl+C). Cerrando servidor...");

  server.close(() => {
    console.log("✅ Servidor cerrado por interrupción del usuario");
    process.exit(0);
  });
});

// 3. SIGUSR2 - Señal usada por nodemon para reinicio
process.on("SIGUSR2", () => {
  console.log("Recibida señal SIGUSR2 (nodemon). Cerrando para reinicio...");

  server.close(() => {
    console.log("Servidor cerrado para reinicio");
    process.exit(0);
  });
});

// ============================================================================
// MANEJO DE EXCEPCIONES NO CAPTURADAS
// ============================================================================

// Manejar excepciones no capturadas en Promises
process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️  Promise rechazada no manejada:", reason);
  console.error("En la promise:", promise);
  // En producción, podrías registrar esto y continuar
  // process.exit(1); // O salir en entornos críticos
});

// Manejar excepciones síncronas no capturadas
process.on("uncaughtException", (error) => {
  console.error("💥 Excepción no capturada:", error);
  // Cerrar el servidor gracefulmente antes de salir
  server.close(() => {
    console.log("Servidor cerrado debido a error no manejado");
    process.exit(1); // Salir con código de error
  });
});

// ============================================================================
// INICIAR EL SERVIDOR CON MANEJO DE ERRORES
// ============================================================================

const PORT = process.env.PORT || 3000;

// Intentar iniciar el servidor con manejo de errores
try {
  server.listen(PORT, () => {
    // Esta callback se ejecuta cuando el servidor inicia correctamente
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Entorno: ${process.env.NODE_ENV || "development"}`);
    console.log(`🆔 PID: ${process.pid}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
}

// ============================================================================
// EJEMPLOS ADICIONALES DE USO PRÁCTICO
// ============================================================================

// EJEMPLO 1: MONITOREO DE CONEXIONES ACTIVAS
let activeConnections = 0;

server.on("connection", (socket) => {
  activeConnections++;
  console.log(`Conexión establecida. Activas: ${activeConnections}`);

  socket.on("close", () => {
    activeConnections--;
    console.log(`Conexión cerrada. Activas: ${activeConnections}`);
  });
});

// EJEMPLO 2: HEALTH CHECK ENDPOINT
const healthServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        connections: activeConnections,
        memory: process.memoryUsage(),
      })
    );
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

// EJEMPLO 3: GRACEFUL SHUTDOWN MEJORADO
function gracefulShutdown(signal) {
  console.log(`\n📞 Recibida señal ${signal}. Iniciando shutdown graceful...`);

  // 1. Detener aceptar nuevas conexiones
  server.close(() => {
    console.log("✅ Servidor HTTP cerrado");
  });

  // 2. Cerrar conexiones de base de datos, etc.
  // await database.close();

  // 3. Timeout forzado
  const forceShutdown = setTimeout(() => {
    console.log("⚠️  Shutdown forzado después de timeout");
    process.exit(1);
  }, 10000);

  // 4. Limpiar timeout si se cierra gracefulmente
  server.close(() => {
    clearTimeout(forceShutdown);
    console.log("✅ Shutdown completado gracefulmente");
    process.exit(0);
  });
}

// Registrar múltiples señales para shutdown
["SIGTERM", "SIGINT", "SIGUSR2"].forEach((signal) => {
  process.on(signal, () => gracefulShutdown(signal));
});

// EJEMPLO 4: MANEJO DE CONFIGURACIÓN DE PUERTO
function startServer(port = 3000, maxRetries = 3) {
  let retries = 0;

  function attemptStart(currentPort) {
    server
      .listen(currentPort, () => {
        console.log(`✅ Servidor iniciado en puerto ${currentPort}`);
      })
      .on("error", (error) => {
        if (error.code === "EADDRINUSE" && retries < maxRetries) {
          retries++;
          console.log(
            `🔄 Puerto ${currentPort} ocupado. Intentando ${currentPort + 1}...`
          );
          setTimeout(() => attemptStart(currentPort + 1), 1000);
        } else {
          console.error(
            "❌ No se pudo iniciar el servidor después de varios intentos"
          );
          process.exit(1);
        }
      });
  }

  attemptStart(port);
}

// Para usar la versión con reintentos automáticos:
// startServer(3000, 5);
```

**RESUMEN DE EVENTOS PRINCIPALES:**

1. **`error`**: Errores del servidor (puerto ocupado, permisos, etc.)
2. **`connection`**: Nuevas conexiones de clientes
3. **`close`**: Servidor cerrado
4. **`listening`**: Servidor iniciado y escuchando
5. **`SIGTERM`/`SIGINT`**: Señales de terminación del sistema operativo

**BENEFICIOS DE ESTE ENFOQUE:**

- ✅ **Shutdown Graceful**: Cierra conexiones limpiamente
- ✅ **Manejo de Errores**: Recuperación automática de puertos ocupados
- ✅ **Monitoreo**: Seguimiento de conexiones activas
- ✅ **Robustez**: Manejo de excepciones no capturadas
- ✅ **Portabilidad**: Funciona en diferentes entornos (Docker, Kubernetes, etc.)

Este servidor está preparado para entornos de producción con manejo profesional de errores, señales del sistema operativo y cierre graceful que es esencial para mantener la disponibilidad del servicio.

### Configuración de Timeouts

```jsx
import http from "http";

const server = http.createServer((req, res) => {
  // Simular una operación que toma mucho tiempo (10 segundos)
  // Esto podría ser: procesamiento de datos, consulta a base de datos, llamada a API externa, etc.
  setTimeout(() => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Operación completada después de 10 segundos");
  }, 10000); // 10 segundos de delay

  // EJEMPLOS DE OPERACIONES QUE PODRÍAN TARDAR MUCHO TIEMPO:
  // - Procesamiento de archivos grandes
  // - Consultas complejas a bases de datos
  // - Integraciones con APIs lentas
  // - Generación de reportes complejos
  // - Procesamiento de imágenes/videos
});

// ============================================================================
// CONFIGURACIÓN DE TIMEOUTS DEL SERVIDOR
// ============================================================================

// 1. server.timeout = 15000 (15 segundos)
// Tiempo máximo de inactividad en una conexión
// Si no hay actividad por 15 segundos, el servidor cierra la conexión automáticamente
server.timeout = 15000; // 15 segundos en milisegundos

// 2. server.keepAliveTimeout = 5000 (5 segundos)
// Tiempo que el servidor mantiene la conexión keep-alive abierta después de la última respuesta
// Conexiones persistentes para múltiples requests en la misma conexión TCP
server.keepAliveTimeout = 5000; // 5 segundos

// 3. server.headersTimeout = 10000 (10 segundos)
// Tiempo máximo para que el cliente envíe los headers completos de la solicitud
// Si el cliente no envía todos los headers en 10 segundos, se cierra la conexión
server.headersTimeout = 10000; // 10 segundos

// ============================================================================
// EXPLICACIÓN DETALLADA DE CADA TIMEOUT
// ============================================================================

// SERVER.TIMEOUT (15 segundos)
// - Se refiere al tiempo máximo de inactividad en el socket
// - Comienza a contar después de que se establece la conexión
// - Se reinicia cada vez que hay actividad (datos enviados/recibidos)
// - Si se supera el timeout, el servidor emite un evento 'timeout' y cierra la conexión

server.on("timeout", (socket) => {
  console.log("⏰ Timeout de conexión alcanzado");
  console.log("Cliente:", socket.remoteAddress);
  console.log("Tiempo inactivo superó los 15 segundos");
});

// SERVER.KEEPALIVETIMEOUT (5 segundos)
// - Específico para conexiones keep-alive (HTTP persistent connections)
// - Tiempo que el servidor mantiene la conexión abierta para próximas solicitudes
// - Reduce overhead de establecer nuevas conexiones TCP
// - Mejora performance para clientes que hacen múltiples requests

// SERVER.HEADERSTIMEOUT (10 segundos)
// - Tiempo máximo para recibir los headers HTTP completos
// - Previene ataques de Slowloris (clientes que envían headers muy lentamente)
// - Comienza cuando se establece la conexión
// - Se detiene cuando se recibe el final de los headers (\r\n\r\n)

// ============================================================================
// EJEMPLO PRÁCTICO: QUÉ SUCEDE CON ESTA CONFIGURACIÓN
// ============================================================================

/*
ESCENARIO: Cliente hace una solicitud que tarda 10 segundos en procesarse

1. Cliente se conecta → Envía headers inmediatamente
   - headersTimeout: 10 segundos ✅ (headers llegan rápido)
   
2. Servidor procesa por 10 segundos
   - Durante este tiempo, el socket está activo (procesando)
   - server.timeout: 15 segundos ✅ (no se supera porque hay actividad)

3. Servidor responde a los 10 segundos
   - Cliente recibe respuesta

4. Si el cliente hace otra solicitud en 3 segundos:
   - keepAliveTimeout: 5 segundos ✅ (la conexión sigue abierta)

5. Si el cliente espera 6 segundos para la siguiente solicitud:
   - keepAliveTimeout: 5 segundos ❌ (la conexión se cierra)
   - El cliente debe establecer nueva conexión
*/

// ============================================================================
// VERSIÓN MEJORADA CON MANEJO DE TIMEOUTS PERSONALIZADO
// ============================================================================

const advancedServer = http.createServer((req, res) => {
  console.log(`Solicitud recibida: ${req.method} ${req.url}`);

  // Configurar timeout específico para esta solicitud
  req.socket.setTimeout(30000); // 30 segundos para esta conexión específica

  // Manejar timeout específico de esta solicitud
  req.socket.on("timeout", () => {
    console.log("Timeout de socket para solicitud específica");
    if (!res.headersSent) {
      res.writeHead(408, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Request Timeout",
          message: "La operación tomó demasiado tiempo",
        })
      );
    }
  });

  // Simular diferentes tipos de operaciones con diferentes tiempos
  const url = req.url;
  let processingTime = 10000; // 10 segundos por defecto

  if (url === "/fast") {
    processingTime = 1000; // 1 segundo
  } else if (url === "/slow") {
    processingTime = 20000; // 20 segundos (superará el timeout)
  } else if (url === "/very-slow") {
    processingTime = 40000; // 40 segundos (superará timeout personalizado)
  }

  console.log(`Procesando por ${processingTime}ms...`);

  setTimeout(() => {
    if (!res.headersSent) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Operación completada",
          processingTime: processingTime,
          timestamp: new Date().toISOString(),
        })
      );
    }
  }, processingTime);
});

// Configurar timeouts para el servidor mejorado
advancedServer.timeout = 15000; // 15 segundos
advancedServer.keepAliveTimeout = 5000; // 5 segundos
advancedServer.headersTimeout = 10000; // 10 segundos

// ============================================================================
// MONITOREO Y LOGGING DE TIMEOUTS
// ============================================================================

advancedServer.on("timeout", (socket) => {
  const clientInfo = `${socket.remoteAddress}:${socket.remotePort}`;
  console.warn(`🕒 TIMEOUT GLOBAL: Cliente ${clientInfo}`);
  console.warn(`   Tiempo inactivo superó ${advancedServer.timeout}ms`);
});

advancedServer.on("connection", (socket) => {
  const clientInfo = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`🔗 NUEVA CONEXIÓN: ${clientInfo}`);

  socket.on("timeout", () => {
    console.warn(`⏰ TIMEOUT DE SOCKET: ${clientInfo}`);
  });

  socket.on("close", (hadError) => {
    console.log(
      `❌ CONEXIÓN CERRADA: ${clientInfo} ${hadError ? "(con error)" : ""}`
    );
  });
});

// ============================================================================
// RECOMENDACIONES DE CONFIGURACIÓN POR ENTORNO
// ============================================================================

function createServerWithOptimalTimeouts() {
  const server = http.createServer((req, res) => {
    // Lógica de la aplicación...
    setTimeout(() => {
      res.end("OK");
    }, 10000);
  });

  const env = process.env.NODE_ENV || "development";

  if (env === "development") {
    // Desarrollo: timeouts más largos para debugging
    server.timeout = 30000; // 30 segundos
    server.keepAliveTimeout = 10000; // 10 segundos
    server.headersTimeout = 15000; // 15 segundos
    console.log("⚙️  Configuración de timeouts: DESARROLLO");
  } else if (env === "production") {
    // Producción: timeouts más agresivos para seguridad y performance
    server.timeout = 10000; // 10 segundos
    server.keepAliveTimeout = 5000; // 5 segundos
    server.headersTimeout = 5000; // 5 segundos
    console.log("⚙️  Configuración de timeouts: PRODUCCIÓN");
  } else {
    // Por defecto
    server.timeout = 15000;
    server.keepAliveTimeout = 5000;
    server.headersTimeout = 10000;
  }

  return server;
}

// ============================================================================
// MANEJO DE ERRORES RELACIONADOS CON TIMEOUTS
// ============================================================================

advancedServer.on("clientError", (err, socket) => {
  if (err.code === "ECONNRESET" || err.code === "EPIPE") {
    // Errores comunes cuando el cliente cierra la conexión durante timeout
    console.log("Cliente cerró la conexión anticipadamente");
  } else {
    console.error("Error de cliente:", err);
  }

  if (!socket.destroyed) {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  }
});

// ============================================================================
// INICIAR SERVIDOR DE EJEMPLO
// ============================================================================

const PORT = 3001;
advancedServer.listen(PORT, () => {
  console.log(`🚀 Servidor con timeouts avanzados en http://localhost:${PORT}`);
  console.log(`⏰ Timeout global: ${advancedServer.timeout}ms`);
  console.log(`🔗 Keep-alive timeout: ${advancedServer.keepAliveTimeout}ms`);
  console.log(`📋 Headers timeout: ${advancedServer.headersTimeout}ms`);
  console.log("\nEndpoints de prueba:");
  console.log("  GET /fast     - 1 segundo (éxito)");
  console.log("  GET /         - 10 segundos (éxito)");
  console.log("  GET /slow     - 20 segundos (timeout)");
  console.log("  GET /very-slow - 40 segundos (timeout personalizado)");
});

// Para usar el servidor original (comentar el anterior y descomentar este):
// server.listen(3000, () => {
//     console.log('Servidor básico con timeouts en http://localhost:3000');
// });
```

**RESUMEN DE LOS TIMEOUTS CONFIGURADOS:**

1. **`server.timeout = 15000`** (15 segundos)
   - Tiempo máximo de inactividad en la conexión
   - Se reinicia con cada actividad del socket
2. **`server.keepAliveTimeout = 5000`** (5 segundos)
   - Tiempo que se mantiene la conexión keep-alive abierta
   - Para múltiples requests en la misma conexión TCP
3. **`server.headersTimeout = 10000`** (10 segundos)
   - Tiempo máximo para recibir los headers completos
   - Protección contra ataques de Slowloris

**BENEFICIOS DE CONFIGURAR TIMEOUTS:**

- ✅ **Prevención de recursos colgados**: Cierra conexiones inactivas
- ✅ **Protección contra ataques**: Mitiga Slowloris y DoS
- ✅ **Mejor uso de recursos**: Libera sockets rápidamente
- ✅ **Experiencia de usuario**: Respuestas predecibles
- ✅ **Estabilidad del servidor**: Evita acumulación de conexiones

Esta configuración es esencial para servidores en producción para mantener la estabilidad y seguridad del servicio.

## Conclusión

El módulo HTTP de Node.js es extremadamente poderoso y flexible. Con ES Modules, el uso es similar pero con sintaxis de importación moderna. Las claves para dominar este módulo son:

- Entender los objetos `req` (request) y `res` (response)
- Manejar correctamente los streams de datos
- Implementar un buen sistema de enrutamiento
- Gestionar adecuadamente los errores y timeouts
- Configurar correctamente los headers y códigos de estado
- Utilizar el cliente HTTP para consumir APIs externas

Este conocimiento fundamental te permitirá entender cómo funcionan los frameworks web como Express.js y te dará la base para construir aplicaciones web robustas y eficientes.
