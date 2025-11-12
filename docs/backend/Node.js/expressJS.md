# Express.js con ES Modules

## Introducción

Después de aprender a manejar rutas, peticiones y respuestas manualmente con el módulo `http` nativo de Node.js, llega el momento de simplificar el desarrollo con **Express.js**.

Express es un **framework web minimalista y flexible** que facilita la creación de aplicaciones web y APIs REST. Con Express puedes:

- Definir rutas de manera clara y concisa
- Trabajar con middlewares para validación, autenticación, logging, etc.
- Servir contenido estático de forma automática
- Crear APIs REST completas con pocas líneas de código
- Integrar fácilmente bases de datos, motores de plantillas o librerías externas

La ventaja principal de Express es que abstrae la complejidad del módulo HTTP nativo, permitiéndote concentrarte en la lógica de tu aplicación.

## Configuración del Proyecto con ES Modules

### Instalación y Configuración Inicial

Primero, necesitamos crear un proyecto Node.js configurado para usar ES Modules:

```bash
# Crear un nuevo directorio para el proyecto
mkdir mi-proyecto-express
cd mi-proyecto-express

# Inicializar package.json con ES Modules
npm init -y
```

Edita el archivo `package.json` generado para habilitar ES Modules:

```json
{
  "name": "mi-proyecto-express",
  "version": "1.0.0",
  "type": "module",
  "description": "Proyecto Express con ES Modules",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

Ahora instala Express:

```bash
npm install express
```

## Tu Primer Servidor con Express y ES Modules

Vamos a crear un servidor básico con Express usando la sintaxis de ES Modules:

```javascript
// server.js

// Importamos el framework Express usando ES Modules
// En lugar de require('express'), usamos import
import express from "express";

// Creamos una instancia de la aplicación de Express
// Esta instancia será el núcleo de nuestra aplicación web
const app = express();

// Definimos el puerto en el que se ejecutará el servidor
// Usamos process.env.PORT para compatibilidad con servicios de despliegue
const PORT = process.env.PORT || 3000;

// Middleware para que Express pueda interpretar cuerpos de tipo JSON en peticiones
// Esto es esencial para manejar POST, PUT, PATCH, etc.
// Sin este middleware, req.body sería undefined
app.use(express.json());

// Ruta GET para la raíz ("/")
// Cuando el usuario visita la página principal, respondemos con HTML simple
// app.get() define una ruta para peticiones GET
app.get("/", (req, res) => {
  // res.send() envía una respuesta y determina automáticamente el Content-Type
  res.send("<h1>Bienvenido a mi servidor con Express y ES Modules</h1>");
});

// Ruta GET para la API ("/api/hola")
// Devuelve un objeto JSON como respuesta, ideal para una API REST
app.get("/api/hola", (req, res) => {
  // res.json() convierte automáticamente el objeto a JSON
  // y establece el Content-Type a application/json
  res.json({
    mensaje: "Hola desde Express con ES Modules",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Ruta GET para información del servidor
app.get("/api/info", (req, res) => {
  res.json({
    servidor: "Express con ES Modules",
    nodeVersion: process.version,
    plataforma: process.platform,
    memoria: process.memoryUsage(),
  });
});

// Inicia el servidor en el puerto especificado
// El callback se ejecuta una vez que el servidor está corriendo
app.listen(PORT, () => {
  console.log(`Servidor Express ejecutándose en http://localhost:${PORT}`);
  console.log("Endpoints disponibles:");
  console.log(`  GET http://localhost:${PORT}/ - Página principal`);
  console.log(`  GET http://localhost:${PORT}/api/hola - API de saludo`);
  console.log(
    `  GET http://localhost:${PORT}/api/info - Información del servidor`
  );
});
```

### Análisis del Servidor Básico

Este servidor Express demuestra varias características fundamentales:

- **Importación con ES Modules**: Usamos `import express from 'express'` en lugar de `const express = require('express')`
- **Instancia de aplicación**: `const app = express()` crea nuestra aplicación web
- **Middleware JSON**: `app.use(express.json())` permite procesar cuerpos de peticiones JSON
- **Definición de rutas**: Usamos `app.get()` para definir endpoints GET
- **Métodos de respuesta**: `res.send()` para HTML/texto, `res.json()` para JSON
- **Inicio del servidor**: `app.listen()` inicia el servidor en el puerto especificado

### Probando el Servidor Básico

Ejecuta el servidor:

```bash
node server.js
```

Visita las siguientes URLs en tu navegador o usa herramientas como curl o Postman:

- `http://localhost:3000/` - Página principal HTML
- `http://localhost:3000/api/hola` - Endpoint API JSON
- `http://localhost:3000/api/info` - Información del servidor

## Crear y Consumir una API REST Completa

Vamos a implementar una API REST completa para gestionar proyectos, similar a la del módulo anterior pero con Express y ES Modules:

```javascript
// api-proyectos.js

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Base de datos en memoria (simulada)
// En una aplicación real, esto estaría en una base de datos persistente
let proyectos = [
  {
    id: 1,
    titulo: "Gestor de tareas",
    descripcion:
      "Aplicación de gestión de tareas construida con Node.js y Express",
    estado: "activo",
    fechaCreacion: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    titulo: "Wiki retro",
    descripcion: "Sistema wiki estilo años 90 con HTML, CSS y JavaScript puros",
    estado: "activo",
    fechaCreacion: new Date("2024-01-20").toISOString(),
  },
  {
    id: 3,
    titulo: "API REST con Express",
    descripcion: "Implementación de API REST completa usando Express.js",
    estado: "completado",
    fechaCreacion: new Date("2024-02-01").toISOString(),
  },
];

// Ruta GET para obtener todos los proyectos
// Este endpoint devuelve la lista completa de proyectos
app.get("/api/proyectos", (req, res) => {
  // Podemos añadir filtros opcionales via query parameters
  const { estado, busqueda } = req.query;

  let proyectosFiltrados = proyectos;

  // Filtrar por estado si se proporciona
  if (estado) {
    proyectosFiltrados = proyectosFiltrados.filter((p) => p.estado === estado);
  }

  // Filtrar por búsqueda en título o descripción
  if (busqueda) {
    const termino = busqueda.toLowerCase();
    proyectosFiltrados = proyectosFiltrados.filter(
      (p) =>
        p.titulo.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
    );
  }

  res.json({
    success: true,
    data: proyectosFiltrados,
    total: proyectosFiltrados.length,
    filtros: { estado, busqueda },
  });
});

// Ruta GET para obtener un proyecto específico por ID
// Los :id indica un parámetro de ruta
app.get("/api/proyectos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Validar que el ID sea un número válido
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "ID debe ser un número válido",
    });
  }

  const proyecto = proyectos.find((p) => p.id === id);

  if (!proyecto) {
    return res.status(404).json({
      success: false,
      error: "Proyecto no encontrado",
    });
  }

  res.json({
    success: true,
    data: proyecto,
  });
});

// Ruta POST para crear un nuevo proyecto
// El cliente debe enviar un objeto JSON con "titulo" y "descripcion"
app.post("/api/proyectos", (req, res) => {
  // Extraemos los datos del cuerpo de la petición
  const { titulo, descripcion, estado = "activo" } = req.body;

  // Validación de campos obligatorios
  if (!titulo || !descripcion) {
    return res.status(400).json({
      success: false,
      error: 'Los campos "titulo" y "descripcion" son obligatorios',
    });
  }

  // Validar longitud mínima
  if (titulo.length < 3) {
    return res.status(400).json({
      success: false,
      error: "El título debe tener al menos 3 caracteres",
    });
  }

  // Crear nuevo proyecto con ID único
  const nuevoProyecto = {
    id: Date.now(), // ID único basado en timestamp
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado,
    fechaCreacion: new Date().toISOString(),
  };

  // Agregar a la "base de datos"
  proyectos.push(nuevoProyecto);

  // Responder con estado 201 (Created) y el nuevo proyecto
  res.status(201).json({
    success: true,
    message: "Proyecto creado exitosamente",
    data: nuevoProyecto,
  });
});

// Ruta PUT para actualizar un proyecto existente
app.put("/api/proyectos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "ID debe ser un número válido",
    });
  }

  const proyectoIndex = proyectos.findIndex((p) => p.id === id);

  if (proyectoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Proyecto no encontrado",
    });
  }

  const { titulo, descripcion, estado } = req.body;

  // Actualizar solo los campos proporcionados
  if (titulo !== undefined) {
    if (titulo.length < 3) {
      return res.status(400).json({
        success: false,
        error: "El título debe tener al menos 3 caracteres",
      });
    }
    proyectos[proyectoIndex].titulo = titulo.trim();
  }

  if (descripcion !== undefined) {
    proyectos[proyectoIndex].descripcion = descripcion.trim();
  }

  if (estado !== undefined) {
    proyectos[proyectoIndex].estado = estado;
  }

  proyectos[proyectoIndex].fechaActualizacion = new Date().toISOString();

  res.json({
    success: true,
    message: "Proyecto actualizado exitosamente",
    data: proyectos[proyectoIndex],
  });
});

// Ruta DELETE para eliminar un proyecto
app.delete("/api/proyectos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "ID debe ser un número válido",
    });
  }

  const proyectoIndex = proyectos.findIndex((p) => p.id === id);

  if (proyectoIndex === -1) {
    return res.status(404).json({
      success: false,
      error: "Proyecto no encontrado",
    });
  }

  // Eliminar el proyecto del array
  const proyectoEliminado = proyectos.splice(proyectoIndex, 1)[0];

  res.json({
    success: true,
    message: "Proyecto eliminado exitosamente",
    data: proyectoEliminado,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`API de Proyectos ejecutándose en http://localhost:${PORT}`);
  console.log("Endpoints CRUD disponibles:");
  console.log("  GET    /api/proyectos          - Listar todos los proyectos");
  console.log("  GET    /api/proyectos/:id      - Obtener proyecto específico");
  console.log("  POST   /api/proyectos          - Crear nuevo proyecto");
  console.log("  PUT    /api/proyectos/:id      - Actualizar proyecto");
  console.log("  DELETE /api/proyectos/:id      - Eliminar proyecto");
});
```

### Características de esta API REST

Esta implementación incluye:

- **Operaciones CRUD completas**: Create, Read, Update, Delete
- **Validación de datos**: Verificación de campos obligatorios y validaciones
- **Manejo de errores**: Respuestas apropiadas para diferentes escenarios de error
- **Filtros y búsqueda**: Parámetros de consulta para filtrar resultados
- **Códigos de estado HTTP**: Uso apropiado de 200, 201, 400, 404
- **Estructura de respuesta consistente**: Formato uniforme para todas las respuestas

### Probando la API REST

Puedes probar la API usando curl, Postman, o cualquier cliente HTTP:

```bash
# Obtener todos los proyectos
curl http://localhost:3000/api/proyectos

# Obtener proyectos filtrados por estado
curl "http://localhost:3000/api/proyectos?estado=activo"

# Buscar proyectos
curl "http://localhost:3000/api/proyectos?busqueda=wiki"

# Obtener un proyecto específico
curl http://localhost:3000/api/proyectos/1

# Crear un nuevo proyecto
curl -X POST http://localhost:3000/api/proyectos \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nuevo Proyecto","descripcion":"Descripción del nuevo proyecto"}'

# Actualizar un proyecto
curl -X PUT http://localhost:3000/api/proyectos/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Título Actualizado"}'

# Eliminar un proyecto
curl -X DELETE http://localhost:3000/api/proyectos/1
```

## Middleware para Servir Contenido Estático

Express simplifica enormemente el servicio de archivos estáticos. Vamos a crear un servidor que sirva archivos HTML, CSS, JavaScript e imágenes:

```javascript
// servidor-estatico.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// En ES Modules, necesitamos obtener __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
// express.static() configura el servidor para servir archivos estáticos automáticamente
app.use(express.static(path.join(__dirname, "public")));

// También podemos servir múltiples carpetas estáticas
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Ruta adicional para la página principal
// Aunque express.static sirve index.html automáticamente,
// podemos definir rutas personalizadas también
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta de API que coexiste con el contenido estático
app.get("/api/status", (req, res) => {
  res.json({
    status: "servidor funcionando",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Manejo de rutas no encontradas (404)
// Este middleware se ejecuta cuando ninguna ruta coincide
app.use("*", (req, res) => {
  // Si el cliente acepta JSON, devolvemos error en JSON
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(404).json({
      success: false,
      error: "Endpoint no encontrado",
      path: req.originalUrl,
    });
  }

  // Si no, servimos una página HTML de error
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Manejo global de errores
// Este middleware captura cualquier error no manejado
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err);

  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message:
      process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de archivos estáticos en http://localhost:${PORT}`);
  console.log("Archivos servidos desde: " + path.join(__dirname, "public"));
});
```

### Estructura de Carpetas para Contenido Estático

Crea la siguiente estructura de archivos para probar el servidor estático:

```
proyecto-express/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── 404.html
│   ├── estilo.css
│   └── script.js
└── assets/
    ├── images/
    └── downloads/
```

**public/index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Servidor Express con Archivos Estáticos</title>
    <link rel="stylesheet" href="/estilo.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Express con ES Modules</h1>
        <p>Servidor de archivos estáticos</p>
      </header>

      <nav>
        <a href="/">Inicio</a>
        <a href="/api/status">Status API</a>
        <a href="/ruta-inexistente">Error 404</a>
      </nav>

      <main>
        <section>
          <h2>Características</h2>
          <ul>
            <li>Servicio automático de archivos estáticos</li>
            <li>Middleware para parsing JSON</li>
            <li>Manejo de errores personalizado</li>
            <li>ES Modules en lugar de CommonJS</li>
          </ul>
        </section>

        <section>
          <h2>Probando la API</h2>
          <button id="btnStatus">Ver Status del Servidor</button>
          <div id="resultado"></div>
        </section>
      </main>
    </div>

    <script src="/script.js"></script>
  </body>
</html>
```

**public/estilo.css**

```css
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
  padding: 20px;
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
  margin-bottom: 10px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

nav a {
  text-decoration: none;
  color: #3498db;
  padding: 12px 24px;
  border: 2px solid #3498db;
  border-radius: 25px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: #3498db;
  color: white;
}

main {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

section {
  margin-bottom: 30px;
}

section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
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

button {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

button:hover {
  background: #2980b9;
}

#resultado {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
  border-left: 4px solid #3498db;
}
```

**public/script.js**

```javascript
// JavaScript del lado del cliente
document.addEventListener("DOMContentLoaded", function () {
  console.log("Página cargada - Servidor Express con ES Modules");

  const btnStatus = document.getElementById("btnStatus");
  const resultado = document.getElementById("resultado");

  if (btnStatus && resultado) {
    btnStatus.addEventListener("click", async function () {
      try {
        const response = await fetch("/api/status");
        const data = await response.json();

        resultado.innerHTML = `
                    <h3>Status del Servidor:</h3>
                    <p><strong>Estado:</strong> ${data.status}</p>
                    <p><strong>Versión:</strong> ${data.version}</p>
                    <p><strong>Timestamp:</strong> ${new Date(
                      data.timestamp
                    ).toLocaleString()}</p>
                `;
      } catch (error) {
        resultado.innerHTML = `<p style="color: red;">Error al obtener el status: ${error.message}</p>`;
      }
    });
  }

  // Navegación suave para enlaces internos
  document.querySelectorAll("nav a").forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("/api/")) {
        return; // No prevenir comportamiento por defecto en enlaces de API
      }

      const href = this.getAttribute("href");
      if (href !== "/" && !href.startsWith("http")) {
        e.preventDefault();
        // Aquí podríamos añadir una transición suave
        window.location.href = href;
      }
    });
  });
});
```

**public/404.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página No Encontrada - Error 404</title>
    <link rel="stylesheet" href="/estilo.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Error 404</h1>
        <p>Página no encontrada</p>
      </header>

      <main style="text-align: center;">
        <section>
          <h2>Lo sentimos</h2>
          <p>La página que buscas no existe en este servidor.</p>
          <p>Puede que la URL sea incorrecta o la página haya sido movida.</p>

          <div style="margin-top: 30px;">
            <a
              href="/"
              style="display: inline-block; padding: 12px 24px; background: #3498db; color: white; text-decoration: none; border-radius: 5px;"
            >
              Volver a la Página Principal
            </a>
          </div>
        </section>
      </main>
    </div>
  </body>
</html>
```

## Servidor Express Completo con Persistencia en Archivos

Ahora vamos a crear un servidor Express completo que combine todo lo aprendido, incluyendo persistencia de datos en archivos JSON:

```javascript
// servidor-completo.js

import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Rutas de archivos
const RUTA_PROYECTOS = path.join(__dirname, "data", "proyectos.json");
const RUTA_LOGS = path.join(__dirname, "logs", "servidor.log");

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Middleware personalizado para logging
app.use(async (req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.url} - ${
    req.ip
  }\n`;

  try {
    await fs.mkdir(path.dirname(RUTA_LOGS), { recursive: true });
    await fs.appendFile(RUTA_LOGS, logEntry, "utf8");
  } catch (error) {
    console.error("Error escribiendo log:", error);
  }

  console.log(logEntry.trim());
  next();
});

// Clase para manejar la persistencia de proyectos
class GestorProyectos {
  constructor(rutaArchivo) {
    this.rutaArchivo = rutaArchivo;
  }

  async cargarProyectos() {
    try {
      await fs.mkdir(path.dirname(this.rutaArchivo), { recursive: true });
      const datos = await fs.readFile(this.rutaArchivo, "utf8");
      return JSON.parse(datos);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, devolvemos array vacío
        return [];
      }
      throw error;
    }
  }

  async guardarProyectos(proyectos) {
    await fs.writeFile(
      this.rutaArchivo,
      JSON.stringify(proyectos, null, 2),
      "utf8"
    );
  }

  async obtenerTodos(filtros = {}) {
    let proyectos = await this.cargarProyectos();

    // Aplicar filtros
    if (filtros.estado) {
      proyectos = proyectos.filter((p) => p.estado === filtros.estado);
    }

    if (filtros.busqueda) {
      const termino = filtros.busqueda.toLowerCase();
      proyectos = proyectos.filter(
        (p) =>
          p.titulo.toLowerCase().includes(termino) ||
          p.descripcion.toLowerCase().includes(termino)
      );
    }

    return proyectos;
  }

  async obtenerPorId(id) {
    const proyectos = await this.cargarProyectos();
    return proyectos.find((p) => p.id === id);
  }

  async crear(proyectoData) {
    const proyectos = await this.cargarProyectos();
    const nuevoProyecto = {
      id: Date.now(),
      ...proyectoData,
      fechaCreacion: new Date().toISOString(),
    };

    proyectos.push(nuevoProyecto);
    await this.guardarProyectos(proyectos);
    return nuevoProyecto;
  }

  async actualizar(id, datosActualizacion) {
    const proyectos = await this.cargarProyectos();
    const indice = proyectos.findIndex((p) => p.id === id);

    if (indice === -1) {
      return null;
    }

    proyectos[indice] = {
      ...proyectos[indice],
      ...datosActualizacion,
      fechaActualizacion: new Date().toISOString(),
    };

    await this.guardarProyectos(proyectos);
    return proyectos[indice];
  }

  async eliminar(id) {
    const proyectos = await this.cargarProyectos();
    const indice = proyectos.findIndex((p) => p.id === id);

    if (indice === -1) {
      return null;
    }

    const [proyectoEliminado] = proyectos.splice(indice, 1);
    await this.guardarProyectos(proyectos);
    return proyectoEliminado;
  }
}

// Instancia del gestor de proyectos
const gestorProyectos = new GestorProyectos(RUTA_PROYECTOS);

// Rutas de la API
app.get("/api/proyectos", async (req, res) => {
  try {
    const { estado, busqueda } = req.query;
    const proyectos = await gestorProyectos.obtenerTodos({ estado, busqueda });

    res.json({
      success: true,
      data: proyectos,
      total: proyectos.length,
    });
  } catch (error) {
    console.error("Error obteniendo proyectos:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al obtener proyectos",
    });
  }
});

app.get("/api/proyectos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID debe ser un número válido",
      });
    }

    const proyecto = await gestorProyectos.obtenerPorId(id);

    if (!proyecto) {
      return res.status(404).json({
        success: false,
        error: "Proyecto no encontrado",
      });
    }

    res.json({
      success: true,
      data: proyecto,
    });
  } catch (error) {
    console.error("Error obteniendo proyecto:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al obtener el proyecto",
    });
  }
});

app.post("/api/proyectos", async (req, res) => {
  try {
    const { titulo, descripcion, estado = "activo" } = req.body;

    // Validaciones
    if (!titulo || !descripcion) {
      return res.status(400).json({
        success: false,
        error: 'Los campos "titulo" y "descripcion" son obligatorios',
      });
    }

    if (titulo.length < 3) {
      return res.status(400).json({
        success: false,
        error: "El título debe tener al menos 3 caracteres",
      });
    }

    const nuevoProyecto = await gestorProyectos.crear({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado,
    });

    res.status(201).json({
      success: true,
      message: "Proyecto creado exitosamente",
      data: nuevoProyecto,
    });
  } catch (error) {
    console.error("Error creando proyecto:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al crear el proyecto",
    });
  }
});

app.put("/api/proyectos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID debe ser un número válido",
      });
    }

    const { titulo, descripcion, estado } = req.body;
    const datosActualizacion = {};

    if (titulo !== undefined) {
      if (titulo.length < 3) {
        return res.status(400).json({
          success: false,
          error: "El título debe tener al menos 3 caracteres",
        });
      }
      datosActualizacion.titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
      datosActualizacion.descripcion = descripcion.trim();
    }

    if (estado !== undefined) {
      datosActualizacion.estado = estado;
    }

    const proyectoActualizado = await gestorProyectos.actualizar(
      id,
      datosActualizacion
    );

    if (!proyectoActualizado) {
      return res.status(404).json({
        success: false,
        error: "Proyecto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Proyecto actualizado exitosamente",
      data: proyectoActualizado,
    });
  } catch (error) {
    console.error("Error actualizando proyecto:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al actualizar el proyecto",
    });
  }
});

app.delete("/api/proyectos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "ID debe ser un número válido",
      });
    }

    const proyectoEliminado = await gestorProyectos.eliminar(id);

    if (!proyectoEliminado) {
      return res.status(404).json({
        success: false,
        error: "Proyecto no encontrado",
      });
    }

    res.json({
      success: true,
      message: "Proyecto eliminado exitosamente",
      data: proyectoEliminado,
    });
  } catch (error) {
    console.error("Error eliminando proyecto:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al eliminar el proyecto",
    });
  }
});

// Ruta para estadísticas del servidor
app.get("/api/estadisticas", async (req, res) => {
  try {
    const proyectos = await gestorProyectos.obtenerTodos();
    const proyectosPorEstado = proyectos.reduce((acc, proyecto) => {
      acc[proyecto.estado] = (acc[proyecto.estado] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        totalProyectos: proyectos.length,
        proyectosPorEstado,
        servidor: {
          nodeVersion: process.version,
          plataforma: process.platform,
          memoria: process.memoryUsage(),
          tiempoActividad: process.uptime(),
        },
      },
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al obtener estadísticas",
    });
  }
});

// Ruta de salud del servidor
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(404).json({
      success: false,
      error: "Endpoint no encontrado",
      path: req.originalUrl,
    });
  }

  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);

  res.status(500).json({
    success: false,
    error: "Error interno del servidor",
    message:
      process.env.NODE_ENV === "development" ? err.message : "Algo salió mal",
  });
});

// Inicializar datos de ejemplo si no existen
async function inicializarDatos() {
  try {
    const proyectos = await gestorProyectos.cargarProyectos();

    if (proyectos.length === 0) {
      console.log("Inicializando datos de ejemplo...");

      const proyectosEjemplo = [
        {
          id: 1,
          titulo: "API REST con Express",
          descripcion:
            "Implementación de API REST completa usando Express.js y ES Modules",
          estado: "completado",
          fechaCreacion: new Date("2024-01-15").toISOString(),
        },
        {
          id: 2,
          titulo: "Sistema de Gestión de Proyectos",
          descripcion:
            "Aplicación web para gestionar proyectos y tareas del equipo",
          estado: "activo",
          fechaCreacion: new Date("2024-02-01").toISOString(),
        },
        {
          id: 3,
          titulo: "Documentación Técnica",
          descripcion:
            "Creación de documentación completa para el sistema desarrollado",
          estado: "pendiente",
          fechaCreacion: new Date("2024-02-10").toISOString(),
        },
      ];

      await gestorProyectos.guardarProyectos(proyectosEjemplo);
      console.log("Datos de ejemplo inicializados correctamente");
    }
  } catch (error) {
    console.error("Error inicializando datos:", error);
  }
}

// Iniciar servidor
app.listen(PORT, async () => {
  await inicializarDatos();

  console.log("=".repeat(60));
  console.log("🚀 SERVIDOR EXPRESS COMPLETO INICIADO");
  console.log("=".repeat(60));
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📁 Archivos estáticos: ${path.join(__dirname, "public")}`);
  console.log(`💾 Datos persistentes: ${RUTA_PROYECTOS}`);
  console.log("");
  console.log("📍 ENDPOINTS DISPONIBLES:");
  console.log("");
  console.log("🌐 PÁGINAS WEB:");
  console.log("   GET /                    - Página principal");
  console.log("");
  console.log("🔗 API ENDPOINTS:");
  console.log(
    "   GET    /api/proyectos    - Listar proyectos (filtros: ?estado=&busqueda=)"
  );
  console.log("   GET    /api/proyectos/:id - Obtener proyecto específico");
  console.log("   POST   /api/proyectos    - Crear nuevo proyecto");
  console.log("   PUT    /api/proyectos/:id - Actualizar proyecto");
  console.log("   DELETE /api/proyectos/:id - Eliminar proyecto");
  console.log("   GET    /api/estadisticas - Estadísticas del servidor");
  console.log("   GET    /api/health       - Salud del servidor");
  console.log("");
  console.log("📊 CARACTERÍSTICAS:");
  console.log("   ✅ Persistencia en archivo JSON");
  console.log("   ✅ Middleware de logging");
  console.log("   ✅ Validación de datos");
  console.log("   ✅ Manejo de errores");
  console.log("   ✅ Servicio de archivos estáticos");
  console.log("   ✅ ES Modules (import/export)");
  console.log("=".repeat(60));
});
```

## Migración desde el Módulo Anterior

Si estás migrando un proyecto del módulo anterior (con el módulo HTTP nativo) a Express, aquí están las principales diferencias:

### Antes (HTTP Nativo)

```javascript
// Con módulo HTTP nativo y CommonJS
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hola Mundo</h1>");
  }
});
```

### Después (Express con ES Modules)

```javascript
// Con Express y ES Modules
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hola Mundo</h1>");
});
```

### Ventajas de Express

- **Sintaxis más clara**: Las rutas se definen de manera más intuitiva
- **Middleware integrado**: Parsing JSON, servir archivos estáticos, etc.
- **Manejo de errores**: Estructura consistente para manejo de errores
- **Extensibilidad**: Gran ecosistema de middlewares y extensiones
- **Productividad**: Desarrollo más rápido y menos código boilerplate

## ¿Qué Has Aprendido en Este Módulo?

### Conceptos Fundamentales de Express

- **Qué es Express.js** y por qué simplifica el desarrollo web con Node.js
- **Configuración de proyectos** con ES Modules en lugar de CommonJS
- **Creación de aplicaciones Express** básicas y comprensión de su arquitectura

### Desarrollo de APIs REST

- **Implementación de operaciones CRUD** completas (Create, Read, Update, Delete)
- **Manejo de parámetros de ruta** (`/api/proyectos/:id`)
- **Procesamiento de parámetros de consulta** (`?estado=activo&busqueda=api`)
- **Validación de datos** de entrada en peticiones POST y PUT
- **Uso apropiado de códigos de estado HTTP** (200, 201, 400, 404, 500)

### Middlewares y Características Avanzadas

- **Middleware para parsing JSON** con `express.json()`
- **Servicio de archivos estáticos** con `express.static()`
- **Creación de middlewares personalizados** para logging y otras funcionalidades
- **Manejo global de errores** y rutas no encontradas (404)

### Persistencia de Datos y Estructura

- **Persistencia en archivos JSON** usando el módulo `fs` con async/await
- **Organización del código** en clases para mejor mantenibilidad
- **Separación de responsabilidades** entre rutas, lógica de negocio y persistencia

### Buenas Prácticas y Producción

- **Estructura de respuesta consistente** para APIs
- **Logging de actividades** del servidor
- **Manejo de errores robusto** con información apropiada
- **Inicialización de datos** de ejemplo para desarrollo
- **Configuración para diferentes entornos** (desarrollo/producción)

## Recursos Adicionales

- [Documentación oficial de Express.js](https://expressjs.com/)
- [Guía de migración a ES Modules en Node.js](https://nodejs.org/api/esm.html)
- [Express Application Generator](https://expressjs.com/en/starter/generator.html) - Herramienta para crear aplicaciones Express
- [Middleware de Express](https://expressjs.com/en/guide/using-middleware.html) - Guía completa sobre middlewares
- [MEAN Stack Guide](https://www.mongodb.com/mean-stack) - Para cuando quieras integrar con bases de datos
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html) - Mejores prácticas de seguridad

Este conocimiento te prepara para construir aplicaciones web y APIs robustas con Express.js, utilizando las mejores prácticas y la sintaxis moderna de ES Modules.
