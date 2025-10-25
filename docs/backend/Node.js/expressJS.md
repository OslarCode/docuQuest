# Express.js

## Introducción

Después de aprender a manejar rutas, peticiones y respuestas manualmente con `http`, llega el momento de hacer tu vida mucho más fácil con **Express.js**.

Express es un **framework minimalista y flexible** que facilita la creación de aplicaciones web y APIs REST. Con él puedes:

- Definir rutas con claridad
- Trabajar con middlewares (para validar, autenticar, registrar, etc.)
- Servir contenido estático
- Crear APIs REST en pocas líneas
- Integrar fácilmente bases de datos, plantillas o librerías

## Instalación de Express

1. Crea una carpeta nueva o usa la del proyecto anterior:

```bash
npm init -y
npm install express
```

1. Crea un archivo `server.js` para empezar desde cero.

## Tu primer servidor con Express

```jsx
// server.js

// Importamos el framework Express
const express = require("express");

// Creamos una instancia de la aplicación de Express
const app = express();

// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Middleware para que Express pueda interpretar cuerpos de tipo JSON en peticiones
// Esto es útil para manejar POST, PUT, PATCH, etc.
app.use(express.json());

// Ruta GET para la raíz ("/")
// Cuando el usuario visita la página principal, se responde con HTML simple
app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a mi servidor con Express</h1>");
});

// Ruta GET para la API ("/api/hola")
// Devuelve un objeto JSON como respuesta, ideal para una API REST
app.get("/api/hola", (req, res) => {
  res.json({ mensaje: "Hola desde Express" });
});

// Inicia el servidor en el puerto especificado
// El callback se ejecuta una vez que el servidor está corriendo
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
```

### ¿Qué hace este servidor?

- Usa Express para simplificar la creación de rutas y manejo de peticiones.
- Tiene dos rutas:
  - `/`: responde con HTML.
  - `/api/hola`: responde con JSON.
- Tiene configurado el middleware `express.json()` para poder recibir peticiones con cuerpo en formato JSON (aunque en este ejemplo no se usa, está listo para ampliarse).
- Muestra un mensaje en consola cuando el servidor está funcionando.

## Crear y consumir una API REST

Supongamos que queremos manejar proyectos (como en el módulo anterior). Usamos un array para simular una base de datos:

```jsx
// Creamos una lista (array) de proyectos en memoria, simulando una base de datos temporal
let proyectos = [
  { id: 1, titulo: "Gestor de tareas", descripcion: "App con Node.js" },
  { id: 2, titulo: "Wiki retro", descripcion: "HTML, CSS y JS puros" },
];

// Ruta GET para obtener todos los proyectos
// Cuando el cliente hace una petición GET a /api/proyectos, se devuelve el array completo
app.get("/api/proyectos", (req, res) => {
  res.json(proyectos); // Enviamos los proyectos como JSON
});

// Ruta POST para crear un nuevo proyecto
// El cliente debe enviar un objeto JSON con "titulo" y "descripcion"
app.post("/api/proyectos", (req, res) => {
  // Creamos un nuevo objeto proyecto con ID único basado en la hora actual
  const nuevo = {
    id: Date.now(), // Genera un ID único basado en el timestamp
    titulo: req.body.titulo, // Extrae el título del cuerpo de la petición
    descripcion: req.body.descripcion, // Extrae la descripción del cuerpo
  };

  // Validamos que se hayan enviado ambos campos obligatorios
  if (!nuevo.titulo || !nuevo.descripcion) {
    // Si falta alguno, respondemos con error 400 (Bad Request)
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  // Si todo está bien, agregamos el nuevo proyecto al array
  proyectos.push(nuevo);

  // Respondemos con estado 201 (creado) y enviamos el nuevo proyecto
  res.status(201).json({ mensaje: "Proyecto creado", proyecto: nuevo });
});
```

### ¿Qué hace este código?

- Define un array `proyectos` con datos simulados.
- Tiene una **ruta GET** (`/api/proyectos`) que devuelve todos los proyectos.
- Tiene una **ruta POST** (`/api/proyectos`) que permite añadir un nuevo proyecto desde el cuerpo de la petición (JSON).
- Usa `Date.now()` como ID rápido (aunque en apps reales se usaría UUID o una base de datos).
- Valida que los campos requeridos no estén vacíos.
- Envía respuestas con los **códigos HTTP adecuados**: `200`, `201`, `400`.

## Middleware para servir contenido estático

Puedes usar una carpeta pública (`/public`) y servir archivos HTML, CSS, imágenes o JS sin tener que definir rutas a mano:

```jsx
app.use(express.static("public"));
```

Ahora, si tienes:

```
public/
├── index.html
├── estilo.css
├── script.js
```

Entonces `http://localhost:3000/` cargará `index.html` automáticamente.

Y puedes enlazar `/estilo.css` y `/script.js` sin configurar nada más.

## Reutilizar lo aprendido

Si migras tu proyecto del módulo anterior:

- El formulario HTML no cambia.
- El `fetch()` del frontend tampoco cambia.
- Solo migras la lógica del backend, y es **mucho más sencilla** con Express.

## Resultado: servidor Express completo (equivalente al módulo anterior)

```jsx
// server.js

// Importamos el framework Express
const express = require("express");
const app = express();

// Importamos el módulo 'fs' para trabajar con el sistema de archivos
const fs = require("fs");

// Importamos 'path' para construir rutas absolutas de forma segura
const path = require("path");

// Puerto donde se levantará el servidor
const PORT = 3000;

// Ruta absoluta al archivo JSON donde se guardan los proyectos
const RUTA_JSON = path.join(__dirname, "data", "proyectos.json");

// Middleware para poder interpretar cuerpos de tipo JSON en las peticiones
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
// Por ejemplo, HTML, CSS, JS frontend
app.use(express.static("public"));

// Ruta GET para obtener todos los proyectos almacenados en el archivo JSON
app.get("/api/proyectos", (req, res) => {
  // Leemos el contenido del archivo de forma asíncrona
  fs.readFile(RUTA_JSON, "utf8", (err, data) => {
    if (err) {
      // Si ocurre un error al leer, devolvemos un error 500 (interno)
      return res.status(500).json({ mensaje: "Error al leer" });
    }
    // Si se lee correctamente, convertimos el JSON a objeto y lo enviamos
    res.json(JSON.parse(data));
  });
});

// Ruta POST para añadir un nuevo proyecto al archivo JSON
app.post("/api/proyectos", (req, res) => {
  // Extraemos los campos esperados del cuerpo de la petición
  const { titulo, descripcion } = req.body;

  // Validación: Si falta alguno, respondemos con error 400
  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: "Faltan campos" });
  }

  // Leemos el archivo actual para obtener la lista de proyectos
  fs.readFile(RUTA_JSON, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error leyendo BD" });
    }

    // Convertimos el contenido a array de objetos
    const proyectos = JSON.parse(data);

    // Creamos un nuevo proyecto con ID único
    const nuevo = { id: Date.now(), titulo, descripcion };

    // Lo agregamos a la lista existente
    proyectos.push(nuevo);

    // Guardamos de nuevo el archivo con el proyecto añadido
    fs.writeFile(RUTA_JSON, JSON.stringify(proyectos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error guardando" });
      }

      // Respondemos con estado 201 (creado) y el nuevo objeto
      res.status(201).json({ mensaje: "Proyecto añadido", proyecto: nuevo });
    });
  });
});

// Iniciamos el servidor en el puerto indicado
app.listen(PORT, () => {
  console.log(`✅ Servidor Express en http://localhost:${PORT}`);
});
```

### ¿Qué hace este servidor?

- Sirve archivos estáticos desde la carpeta `public/` (por ejemplo, una interfaz HTML).
- Tiene un endpoint `GET /api/proyectos` que **lee y devuelve** los proyectos desde un archivo `proyectos.json`.
- Tiene un endpoint `POST /api/proyectos` que **agrega un nuevo proyecto** a ese archivo JSON, con validación de campos.
- Usa `Date.now()` para generar IDs únicos (válido para proyectos simples).
- Maneja errores de lectura y escritura en disco.
- Usa `express.json()` para poder recibir datos en formato JSON en peticiones POST.

## ¿Qué has aprendido en este módulo?

- Qué es Express y por qué simplifica el desarrollo web
- Cómo crear rutas para GET y POST
- Cómo parsear JSON y servir archivos estáticos
- Cómo manejar errores y respuestas limpias
- Cómo migrar un proyecto Node puro a Express

## Recursos adicionales

- [https://expressjs.com/es/](https://expressjs.com/es/)
- [Express cheat sheet](https://github.com/azat-co/cheatsheets/tree/master/express4)
