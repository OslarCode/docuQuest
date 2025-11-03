# RestFul APIs

# ¿Qué es una RESTful API y por qué deberías entenderla?

**Resumen introductorio**

Imagina que las aplicaciones pudieran hablar entre sí como si fueran personas. Una RESTful API es justo eso: un conjunto de reglas que permite que un programa se comunique con otro de manera clara, ordenada y eficiente. Es uno de los estilos más utilizados para crear APIs, y entender cómo funciona te abre las puertas al desarrollo de aplicaciones conectadas, escalables y fáciles de mantener.

## ¿Cómo funciona una RESTful API?

Cuando dos sistemas distintos necesitan intercambiar información, no lo hacen directamente. Usan intermediarios: las APIs. REST es una forma popular de diseñarlas. Piensa en REST como un conjunto de normas para que esa comunicación sea limpia y coherente.

Una API basada en REST organiza la información en “recursos” (por ejemplo, usuarios, libros o pedidos), y cada uno de estos recursos tiene una dirección web única (URL). Así, si quieres ver un usuario con ID 5, haces una petición a `/usuarios/5`.

## Principios esenciales de REST

### Comunicación sencilla y ordenada

REST impone una interfaz uniforme. Esto significa que todas las operaciones siguen las mismas reglas, lo cual reduce la complejidad. No importa si trabajas con usuarios o productos: los métodos y rutas se comportan de forma predecible.

Por ejemplo, si vas a `/usuarios/1`, sabes que estás viendo a un usuario. Si haces un `DELETE` a esa misma ruta, estás eliminándolo.

### Sin memoria en el servidor

Cada vez que haces una petición, el servidor no recuerda nada de lo que hiciste antes. Todo lo que necesita para responder debe venir en esa misma solicitud. Esta forma de trabajar, sin guardar “el estado” del cliente, hace que el sistema sea más escalable.

### Respuestas que se pueden guardar

REST permite que algunas respuestas se almacenen temporalmente. Por ejemplo, si pides la lista de libros, el servidor puede decir: “puedes guardar esto durante 5 minutos”. Así, si haces la misma consulta en poco tiempo, no es necesario repetirla.

### Arquitectura por capas

REST también permite construir la API por capas. Puedes tener un servidor, detrás otro servidor que actúa como filtro o proxy, y luego otro que maneja la base de datos. Esto facilita tareas como balancear la carga o implementar seguridad.

## Cómo se organizan los recursos (endpoints)

Un recurso en una API REST es algo que puede identificarse y manipularse, como un libro, un usuario o un comentario. Cada recurso tiene su propia URL. Por ejemplo:

- `/libros` representa la colección completa.
- `/libros/10` representa un libro específico.
- `/libros/10/autores` te da los autores de ese libro.

Este esquema jerárquico hace que la estructura de la API sea intuitiva y fácil de navegar.

## Los métodos HTTP: las acciones que puedes hacer

REST usa los métodos estándar de la web para operar sobre los recursos. Cada uno tiene un propósito claro.

- **GET**: sirve para leer datos. Si haces un GET a `/usuarios/2`, obtendrás la información del usuario 2.
- **POST**: crea un nuevo recurso. Enviar un POST a `/usuarios` con datos de un nuevo usuario lo añade a la base de datos.
- **PUT**: actualiza o crea un recurso específico. Si haces PUT a `/usuarios/2`, modificarás ese usuario o lo crearás si no existe.
- **DELETE**: elimina un recurso. Un DELETE a `/usuarios/2` borrará al usuario con ese ID.
- **PATCH** y **OPTIONS**: se usan en casos más específicos. PATCH actualiza parcialmente, y OPTIONS te dice qué operaciones están disponibles.

## Cómo saber si la API respondió bien: códigos de estado

Las APIs no solo devuelven datos, también te dicen cómo salió la operación con un número llamado código de estado HTTP. Algunos ejemplos útiles:

- **200 OK**: Todo salió bien.
- **201 Created**: Se creó un nuevo recurso (útil después de un POST).
- **204 No Content**: Se realizó correctamente, pero no hay nada que devolver (como tras un DELETE).
- **400 Bad Request**: El cliente envió mal los datos.
- **401 Unauthorized**: Falta autenticación.
- **403 Forbidden**: Aunque estés autenticado, no tienes permiso.
- **404 Not Found**: El recurso no existe.
- **500 Internal Server Error**: Algo falló en el servidor.

Estos códigos ayudan al cliente a reaccionar de forma correcta ante cualquier situación.

## Un ejemplo práctico: API para una biblioteca

Imagina que estás construyendo una API para una biblioteca que gestiona libros y autores.

Tus recursos principales serían `/libros` y `/autores`. Entonces podrías hacer cosas como:

- **GET /libros**: ver todos los libros.
- **GET /libros/123**: ver el libro con ID 123.
- **POST /libros**: añadir un nuevo libro.
- **PUT /libros/123**: editar el libro 123.
- **DELETE /libros/123**: eliminarlo.

Y si quisieras ver los autores del libro, accederías a `/libros/123/autores`.

### ¿Qué pasa cuando creas un libro?

Si haces un POST con:

```json
{
  "title": "El Quijote",
  "author": "Miguel de Cervantes",
  "publishedDate": "1605-01-16"
}
```

El servidor podría responder con:

```json
HTTP 201 Created
Location: /libros/456
{
  "id": 456,
  "title": "El Quijote",
  "author": "Miguel de Cervantes",
  "publishedDate": "1605-01-16"
}

```

Esto significa que todo salió bien y el nuevo libro tiene ID 456.

## ¿Por qué usar REST?

REST se ha convertido en un estándar porque permite construir APIs simples, fáciles de entender y altamente escalables. Al seguir sus principios, se crean sistemas robustos que pueden crecer sin romperse y conectarse con muchas otras plataformas.

## Reflexión final

Aprender RESTful APIs no es solo saber cómo funcionan las URLs o qué significa un `200 OK`. Es entender cómo construir sistemas que se comuniquen de forma clara, predecible y eficiente. La próxima vez que veas una aplicación interactuar con otra, ya sabrás que detrás hay una conversación perfectamente organizada.

# Ejercicio Práctico RESTful con Node.js + Express + SQLite

Vamos a crear un sistema completo diferente. Esta vez será una **API REST para gestionar una lista de Tareas (To-Do List)**.

**Enunciado:**
Desarrollar una API RESTful para gestionar una lista de tareas personales. Cada tarea tendrá un ID (autoincremental), descripción, estado (pendiente o completada) y fecha de creación. La API debe permitir listar todas las tareas, obtener una tarea específica, agregar una nueva tarea, marcar una tarea como completada/pendiente, editar la descripción de una tarea y eliminar tareas. Además, se creará una interfaz web sencilla para interactuar con la API.

**Objetivos de Aprendizaje:**

- Reforzar la estructura de un proyecto Node.js con Express.
- Practicar la definición de rutas RESTful para una entidad diferente.
- Manejar diferentes tipos de datos en SQLite (textos, booleanos, fechas).
- Implementar operaciones de actualización parcial (cambiar estado).
- Mejorar el manejo de eventos en el frontend.
- Aprender a mostrar estados booleanos de forma amigable en la interfaz.

**Tecnologías:**

- Backend: Node.js, Express, SQLite3.
- Frontend: HTML5, CSS3, JavaScript Vanilla.

### **Paso 1: Estructura del Proyecto y Configuración Inicial**

Crea la siguiente estructura de carpetas y archivos para el nuevo proyecto.

```
mi-gestor-tareas/
├── backend/
│   ├── data/
│   │   └── database.js
│   ├── routes/
│   │   └── tasks.js
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── server.js
└── package.json
```

Abre tu terminal, navega hasta la carpeta `mi-gestor-tareas` y ejecuta los comandos para inicializar el proyecto e instalar las dependencias.

```bash
cd mi-gestor-tareas
npm init -y
npm install express sqlite3
```

### **Paso 2: Crear la Base de Datos (Backend)**

**Archivo: `backend/data/database.js`**

Este archivo inicializará la base de datos SQLite y creará la tabla de tareas con los campos necesarios.

```javascript
// Importa el módulo sqlite3
const sqlite3 = require("sqlite3").verbose();

// Crea una instancia de la base de datos. El archivo 'tasks.db' se creará en el mismo directorio.
const db = new sqlite3.Database("./data/tasks.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite de tareas.");
    // Crear la tabla 'tasks' si no existe
    db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
      (err) => {
        if (err) {
          console.error("Error al crear la tabla", err.message);
        } else {
          console.log('Tabla "tasks" lista.');
        }
      }
    );
  }
});

// Exporta la instancia de la base de datos para usarla en otros archivos
module.exports = db;
```

### **Paso 3: Crear el Servidor y Definir las Rutas de la API (Backend)**

**Archivo: `backend/server.js`**

Este es el archivo principal del servidor. Configura Express, el middleware para parsear JSON y define las rutas principales.

```javascript
// Importa los módulos necesarios
const express = require("express");
const path = require("path");

// Importa las rutas definidas para las tareas
const taskRoutes = require("./routes/tasks");

// Crea una instancia de la aplicación Express
const app = express();
// Define el puerto donde escuchará el servidor
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos (nuestra interfaz frontend)
// La carpeta 'public' contendrá index.html, style.css y script.js
app.use(express.static(path.join(__dirname, "public")));

// Usa las rutas definidas en './routes/tasks' para cualquier path que empiece por '/api/tasks'
app.use("/api/tasks", taskRoutes);

// Inicia el servidor y lo pone a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor de tareas ejecutándose en http://localhost:${PORT}`);
});
```

**Archivo: `backend/routes/tasks.js`**

Este archivo contiene la definición de todos los endpoints (rutas) de nuestra API para la entidad "tasks".

```javascript
// Importa Express y el router
const express = require("express");
const router = express.Router();
// Importa la base de datos
const db = require("../data/database");

// GET /api/tasks - Obtener TODAS las tareas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM tasks ORDER BY created_at DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      // Si hay un error, devuelve un código 500 (Error Interno del Servidor)
      return res.status(500).json({ error: err.message });
    }
    // Si todo va bien, devuelve las tareas con código 200 (OK)
    res.status(200).json({ tasks: rows });
  });
});

// GET /api/tasks/:id - Obtener una tarea por su ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM tasks WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      // Si no se encuentra la tarea, devuelve un código 404 (No Encontrado)
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    // Devuelve la tarea encontrada
    res.status(200).json({ task: row });
  });
});

// POST /api/tasks - Crear una NUEVA tarea
router.post("/", (req, res) => {
  // Extrae la descripción del cuerpo (body) de la solicitud
  const { description } = req.body;

  // Validación simple: verifica que la descripción esté presente
  if (!description || description.trim() === "") {
    return res
      .status(400)
      .json({ message: "La descripción de la tarea es obligatoria." });
  }

  const sql = "INSERT INTO tasks (description) VALUES (?)";
  db.run(sql, [description.trim()], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Si la inserción es exitosa, devuelve el ID de la nueva tarea y un código 201 (Creado)
    res.status(201).json({
      message: "Tarea creada exitosamente",
      taskId: this.lastID,
    });
  });
});

// PUT /api/tasks/:id - Actualizar una tarea existente por su ID (descripción y estado)
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { description, completed } = req.body;

  // Validación: al menos un campo debe ser proporcionado para actualizar
  if (description === undefined && completed === undefined) {
    return res.status(400).json({
      message:
        "Se debe proporcionar al menos un campo para actualizar (description o completed).",
    });
  }

  // Construir la consulta SQL dinámicamente basada en los campos proporcionados
  let sql = "UPDATE tasks SET ";
  const params = [];

  if (description !== undefined) {
    sql += "description = ?";
    params.push(description);
  }

  if (completed !== undefined) {
    if (params.length > 0) sql += ", ";
    sql += "completed = ?";
    params.push(completed ? 1 : 0);
  }

  sql += " WHERE id = ?";
  params.push(id);

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      // Si no se afectó ninguna fila, la tarea no existía
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    // Devuelve un mensaje de éxito
    res.status(200).json({ message: "Tarea actualizada exitosamente" });
  });
});

// PATCH /api/tasks/:id/toggle - Alternar el estado de completado de una tarea
router.patch("/:id/toggle", (req, res) => {
  const id = req.params.id;

  // Primero obtenemos el estado actual de la tarea
  const getSql = "SELECT * FROM tasks WHERE id = ?";
  db.get(getSql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Alternar el estado de completado
    const newCompleted = row.completed ? 0 : 1;
    const updateSql = "UPDATE tasks SET completed = ? WHERE id = ?";

    db.run(updateSql, [newCompleted, id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        message: "Estado de tarea actualizado exitosamente",
        completed: Boolean(newCompleted),
      });
    });
  });
});

// DELETE /api/tasks/:id - Eliminar una tarea por su ID
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM tasks WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    // Devuelve un mensaje de éxito
    res.status(200).json({ message: "Tarea eliminada exitosamente" });
  });
});

// Exporta el router para usarlo en server.js
module.exports = router;
```

### **Paso 4: Crear la Interfaz Web (Frontend)**

Ahora crearemos la interfaz simple para gestionar las tareas.

**Archivo: `backend/public/index.html`**

Este es el archivo HTML principal. Crea un formulario para agregar tareas y una lista para mostrarlas.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gestor de Tareas</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Mi Gestor de Tareas</h1>
        <p>Organiza tus tareas diarias de manera simple</p>
      </header>

      <!-- Formulario para agregar nuevas tareas -->
      <div class="add-task-section">
        <form id="taskForm">
          <div class="input-group">
            <input
              type="text"
              id="description"
              placeholder="¿Qué necesitas hacer?"
              required
            />
            <button type="submit">Agregar Tarea</button>
          </div>
        </form>
      </div>

      <!-- Filtros y estadísticas -->
      <div class="filters">
        <button class="filter-btn active" data-filter="all">Todas</button>
        <button class="filter-btn" data-filter="pending">Pendientes</button>
        <button class="filter-btn" data-filter="completed">Completadas</button>
      </div>

      <!-- Lista de tareas -->
      <div class="tasks-section">
        <h2>Mis Tareas</h2>
        <div id="tasksList">
          <!-- Las tareas se cargarán aquí dinámicamente -->
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

**Archivo: `backend/public/style.css`**

Estilos mejorados para una interfaz de tareas más moderna.

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.add-task-section {
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.input-group {
  display: flex;
  gap: 10px;
}

#description {
  flex: 1;
  padding: 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

#description:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 15px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}

button[type="submit"] {
  background: #667eea;
  color: white;
}

button[type="submit"]:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

.filters {
  padding: 20px 30px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #eee;
}

.filter-btn {
  background: #f8f9fa;
  color: #666;
  padding: 10px 20px;
}

.filter-btn.active {
  background: #667eea;
  color: white;
}

.filter-btn:hover {
  background: #e9ecef;
}

.filter-btn.active:hover {
  background: #5a6fd8;
}

.tasks-section {
  padding: 30px;
}

.tasks-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: all 0.3s;
}

.task-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.task-item.completed {
  opacity: 0.7;
  background: #e9ecef;
}

.task-checkbox {
  margin-right: 15px;
}

.task-checkbox input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.task-content {
  flex: 1;
}

.task-description {
  font-size: 16px;
  color: #333;
}

.task-item.completed .task-description {
  text-decoration: line-through;
  color: #666;
}

.task-date {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.btn-edit,
.btn-delete {
  padding: 8px 15px;
  font-size: 14px;
}

.btn-edit {
  background: #28a745;
  color: white;
}

.btn-edit:hover {
  background: #218838;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.empty-state h3 {
  margin-bottom: 10px;
}
```

**Archivo: `backend/public/script.js`**

JavaScript completo para manejar la interfaz de tareas.

```javascript
// URLs base de nuestra API
const API_URL = "/api/tasks";

// Elementos del DOM
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");
const descriptionInput = document.getElementById("description");
const filterButtons = document.querySelectorAll(".filter-btn");

// Variables de estado
let currentFilter = "all";
let tasks = [];

// Cargar las tareas cuando la página se carga
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupEventListeners();
});

function setupEventListeners() {
  // Escuchar el envío del formulario (Crear tarea)
  taskForm.addEventListener("submit", handleTaskSubmit);

  // Escuchar los botones de filtro
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", handleFilterChange);
  });
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const description = descriptionInput.value.trim();

  if (description === "") {
    alert("Por favor, ingresa una descripción para la tarea.");
    return;
  }

  createTask(description);
}

function handleFilterChange(event) {
  // Actualizar botones activos
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Actualizar filtro actual y renderizar
  currentFilter = event.target.dataset.filter;
  renderTasks();
}

// Función para cargar todas las tareas desde la API
function loadTasks() {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar las tareas");
      }
      return response.json();
    })
    .then((data) => {
      tasks = data.tasks;
      renderTasks();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("No se pudieron cargar las tareas.");
    });
}

// Función para mostrar las tareas en la lista
function renderTasks() {
  tasksList.innerHTML = "";

  // Filtrar tareas según el filtro actual
  let filteredTasks = tasks;
  if (currentFilter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filteredTasks.length === 0) {
    showEmptyState();
    return;
  }

  filteredTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    tasksList.appendChild(taskElement);
  });
}

function showEmptyState() {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";

  let message = "";
  if (currentFilter === "all") {
    message = "No hay tareas. ¡Agrega una nueva tarea para comenzar!";
  } else if (currentFilter === "pending") {
    message = "¡No hay tareas pendientes! ¡Buen trabajo!";
  } else if (currentFilter === "completed") {
    message = "No hay tareas completadas.";
  }

  emptyState.innerHTML = `
        <h3>${message}</h3>
        <p>Usa el formulario de arriba para agregar una nueva tarea.</p>
    `;

  tasksList.appendChild(emptyState);
}

// Función para crear el elemento HTML de una tarea
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = `task-item ${task.completed ? "completed" : ""}`;
  taskDiv.dataset.taskId = task.id;

  // Formatear fecha
  const createdDate = new Date(task.created_at);
  const formattedDate = createdDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  taskDiv.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                   onchange="toggleTask(${task.id})">
        </div>
        <div class="task-content">
            <div class="task-description">${task.description}</div>
            <div class="task-date">Creada: ${formattedDate}</div>
        </div>
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask(${
              task.id
            })">Editar</button>
            <button class="btn-delete" onclick="deleteTask(${
              task.id
            })">Eliminar</button>
        </div>
    `;

  return taskDiv;
}

// Función para crear una nueva tarea
function createTask(description) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || "Error desconocido");
        });
      }
      return response.json();
    })
    .then((data) => {
      descriptionInput.value = "";
      loadTasks(); // Recargar la lista
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al crear la tarea: " + error.message);
    });
}

// Función para alternar el estado de completado de una tarea
function toggleTask(id) {
  fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      loadTasks(); // Recargar la lista
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al actualizar la tarea: " + error.message);
    });
}

// Función para editar una tarea
function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  const newDescription = prompt(
    "Editar descripción de la tarea:",
    task.description
  );

  if (newDescription !== null && newDescription.trim() !== "") {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newDescription.trim() }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        loadTasks(); // Recargar la lista
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al editar la tarea: " + error.message);
      });
  }
}

// Función para eliminar una tarea
function deleteTask(id) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
    return;
  }

  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      loadTasks(); // Recargar la lista
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al eliminar la tarea: " + error.message);
    });
}
```

### **Paso 5: Ejecutar la Aplicación**

1.  Abre tu terminal y navega hasta la carpeta `mi-gestor-tareas/backend`.
2.  Ejecuta el comando: `node server.js`
3.  Deberías ver el mensaje: "Servidor de tareas ejecutándose en http://localhost:3000".
4.  Abre tu navegador y ve a `http://localhost:3000`.

Ahora puedes probar la aplicación completa:

- **Agregar Tareas:** Usa el formulario de arriba.
- **Marcar como Completada:** Haz clic en el checkbox de cualquier tarea.
- **Filtrar Tareas:** Usa los botones "Todas", "Pendientes", "Completadas".
- **Editar Tareas:** Haz clic en "Editar" en cualquier tarea.
- **Eliminar Tareas:** Haz clic en "Eliminar" y confirma la acción.

### **Resumen y Conclusión**

En práctica hemos creado un sistema de gestión de tareas completo que incluye:

- **GET /api/tasks:** Obtiene todas las tareas ordenadas por fecha.
- **GET /api/tasks/:id:** Obtiene una tarea específica.
- **POST /api/tasks:** Crea una nueva tarea.
- **PUT /api/tasks/:id:** Actualiza una tarea existente.
- **PATCH /api/tasks/:id/toggle:** Alterna el estado de completado de una tarea.
- **DELETE /api/tasks/:id:** Elimina una tarea.
