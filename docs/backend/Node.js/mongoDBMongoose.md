# Conexión a base de datos real con MongoDB y Mongoose

## Introducción

MongoDB es una base de datos NoSQL orientada a documentos. En lugar de tablas y filas, almacena **documentos JSON** flexibles. Usaremos **Mongoose**, una biblioteca que facilita la conexión con MongoDB, define modelos con validación y permite hacer consultas más seguras y organizadas.

## Paso 1: Instalar MongoDB y Mongoose

1. Asegúrate de tener una base de datos local (MongoDB Community Server) o usar MongoDB Atlas (nube gratuita).
   - Si no lo tienes: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Para usar en la nube: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Instala `mongoose`:

```bash
npm install mongoose
```

## Paso 2: Conectar Express con MongoDB usando Mongoose

Modifica `server.js` para incluir la conexión:

```jsx
// Importamos Express, el framework para crear el servidor web
const express = require("express");

// Importamos Mongoose, una librería para conectarse y trabajar con MongoDB
const mongoose = require("mongoose");

// Creamos una instancia de la aplicación Express
const app = express();

// Definimos el puerto donde se levantará el servidor
const PORT = 3000;
// Conectamos a una base de datos MongoDB local llamada "portafolio"
// mongoose.connect() devuelve una promesa, por eso usamos .then() y .catch()
mongoose
  .connect("mongodb://127.0.0.1:27017/portafolio", {
    useNewUrlParser: true, // Usa el nuevo parser de URL de MongoDB
    useUnifiedTopology: true, // Usa el nuevo sistema de conexión (recomendado)
  })
  .then(() => console.log("✅ Conectado a MongoDB")) // Si conecta con éxito, se imprime en consola
  .catch((err) => console.error("❌ Error al conectar:", err)); // Si hay error, lo mostramos
// Middleware para interpretar cuerpos JSON en las peticiones (req.body)
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta 'public'
// Por ejemplo: HTML, CSS, JS frontend, imágenes, etc.
app.use(express.static("public"));
```

### ¿Qué falta para hacerlo funcional?

Aunque este código es solo una base, ya está listo para:

- **Añadir modelos de datos con Mongoose**
- **Definir rutas GET, POST, etc.**
- **Usar HTML estático desde /public**
- **Leer o escribir en MongoDB**

## Paso 3: Crear el modelo de proyecto

Crea un archivo `models/Proyecto.js`:

```jsx
// Importamos Mongoose, que nos permite trabajar con MongoDB de forma más sencilla
const mongoose = require("mongoose");

// Definimos el esquema del modelo "Proyecto"
// Un esquema define la estructura y validaciones del documento que se guardará en MongoDB
const ProyectoSchema = new mongoose.Schema({
  // Campo 'titulo': debe ser un string obligatorio
  titulo: { type: String, required: true },

  // Campo 'descripcion': también debe ser un string obligatorio
  descripcion: { type: String, required: true },

  // Campo 'fecha': es un objeto Date y si no se especifica, se usa la fecha actual automáticamente
  fecha: { type: Date, default: Date.now },
});

// Exportamos el modelo 'Proyecto' basado en el esquema definido
// Esto nos permite usar Proyecto.find(), Proyecto.create(), etc. en otros archivos
module.exports = mongoose.model("Proyecto", ProyectoSchema);
```

### ¿Qué hace este archivo?

- Define cómo debe ser un documento `Proyecto` dentro de MongoDB:
  - Tiene `titulo`, `descripcion` y `fecha`.
  - Valida que `titulo` y `descripcion` sean obligatorios (`required: true`).
  - Asigna automáticamente la fecha actual si no se proporciona (`default: Date.now`).
- Exporta el modelo para poder usarlo en tus rutas (`require('./models/Proyecto')`, por ejemplo).

## Paso 4: Reescribir las rutas con MongoDB

En `server.js`, debajo de `app.use(...)`, añade:

```jsx
// Importamos el modelo Proyecto que define la estructura de los documentos en MongoDB
const Proyecto = require("./models/Proyecto");
// Ruta GET para obtener todos los proyectos
app.get("/api/proyectos", async (req, res) => {
  // Usamos Mongoose para buscar todos los proyectos y los ordenamos por fecha descendente
  const proyectos = await Proyecto.find().sort({ fecha: -1 });

  // Respondemos con la lista en formato JSON
  res.json(proyectos);
});
// Ruta POST para crear un nuevo proyecto
app.post("/api/proyectos", async (req, res) => {
  // Extraemos los campos enviados en el cuerpo de la petición
  const { titulo, descripcion } = req.body;

  // Validamos que no falten campos obligatorios
  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: "Faltan campos" }); // Error 400: Bad Request
  }

  try {
    // Creamos una instancia del modelo con los datos recibidos
    const nuevo = new Proyecto({ titulo, descripcion });

    // Guardamos el nuevo proyecto en MongoDB
    await nuevo.save();

    // Respondemos con estado 201 (creado) y el objeto guardado
    res.status(201).json({ mensaje: "Proyecto creado", proyecto: nuevo });
  } catch (err) {
    // Si algo falla, devolvemos error 500 con el mensaje de error
    res.status(500).json({ mensaje: "Error al guardar", error: err.message });
  }
});
// Ruta DELETE para eliminar un proyecto por su ID
app.delete("/api/proyectos/:id", async (req, res) => {
  // Extraemos el ID desde los parámetros de la URL
  const id = req.params.id;

  try {
    // Buscamos y eliminamos el proyecto por ID
    const resultado = await Proyecto.findByIdAndDelete(id);

    // Si no se encontró nada para eliminar, devolvemos 404
    if (!resultado) return res.status(404).json({ mensaje: "No encontrado" });

    // Si se eliminó correctamente, enviamos confirmación
    res.json({ mensaje: "Proyecto eliminado" });
  } catch (err) {
    // Si ocurre un error, respondemos con error 500 y el detalle
    res.status(500).json({ mensaje: "Error al eliminar", error: err.message });
  }
});
```

### ¿Qué hace este código?

- **GET** `/api/proyectos`: devuelve todos los proyectos ordenados por fecha.
- **POST** `/api/proyectos`: guarda un nuevo proyecto, validando los campos.
- **DELETE** `/api/proyectos/:id`: elimina un proyecto según su ID.
- Usa `async/await` para operaciones asíncronas con MongoDB.
- Incluye **manejo de errores** y respuestas con los códigos HTTP adecuados.

## El resto (frontend)

¡No necesitas cambiar nada!

Tu HTML, CSS y `script.js` siguen funcionando igual porque todo lo que ha cambiado es el **backend**. Ahora tus proyectos se almacenan en **MongoDB**, no en un archivo local.

## ¿Qué has logrado?

- Integrar tu API con una base de datos real
- Usar Mongoose para definir esquemas con validación
- Conectar Node.js + Express + MongoDB de forma profesional
- Reutilizar tu frontend sin modificarlo

## Recursos útiles

- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Atlas (base de datos en la nube)](https://www.mongodb.com/cloud/atlas)
- GUI para MongoDB: [Compass](https://www.mongodb.com/products/compass)
