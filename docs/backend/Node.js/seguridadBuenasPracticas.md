# Despliegue y buenas prácticas en aplicaciones Node.js

Hasta ahora hemos construido aplicaciones funcionales, conectadas a bases de datos, con rutas bien organizadas y un frontend que interactúa con la API. Pero ningún proyecto está realmente completo hasta que puede vivir en internet, escalar, ser mantenido y, sobre todo, sobrevivir sin fallos graves. Este módulo se encarga de todo eso.

### Preparación para producción

Antes de pensar en subir la app a un servidor, es importante dejarla lista internamente. ¿Qué significa esto? Básicamente, asegurarte de que no estás subiendo nada innecesario, que tus variables sensibles están protegidas, y que tu código no tiene errores no controlados.

Un primer paso esencial es usar archivos `.env` correctamente para separar los datos sensibles (como las URLs de conexión a la base de datos o claves secretas) del código fuente. Este archivo nunca debería estar subido al repositorio. Por eso, en tu `.gitignore`, debes asegurarte de incluir:

```
.env
node_modules/

```

También es buena práctica organizar tu servidor Express en archivos separados: modelos, rutas, controladores, y middlewares. Si tu `server.js` mide más de 100 líneas, probablemente estás haciendo demasiado ahí. Piensa siempre en separar responsabilidades.

### Transición a ES Modules en Node.js

Node.js soporta oficialmente ES Modules (la sintaxis de import/export de JavaScript moderno) desde la versión 14. A diferencia de CommonJS (que usa require/module.exports), ES Modules ofrece:

- Mejor integración con herramientas de frontend
- Sintaxis estandarizada en ECMAScript
- Mejor análisis estático y tree-shaking
- Compatibilidad nativa con navegadores

Para usar ES Modules, puedes:

1. Cambiar la extensión de tus archivos a `.mjs`
2. O añadir `"type": "module"` en tu package.json

### Desplegar con Render, Railway o Vercel (sin complicarte)

Hay varias plataformas para desplegar una app Node.js gratis o con bajo coste. Las más amigables para principiantes son **Render** y **Railway**. No necesitas configurar un servidor desde cero, y el panel de control es visual.

### Ejemplo con Render:

1. Crea una cuenta en [https://render.com](https://render.com/)
2. Conecta tu repositorio de GitHub.
3. Selecciona "Web Service", elige el repositorio y configura:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start` o `node server.js`
4. En la sección de "Environment", añade tus variables `.env`.
5. Render construirá y ejecutará tu app en una URL pública como `https://midiario.onrender.com`

Lo importante aquí es que **tu backend esté preparado para usar el puerto dinámico que Render asigna**. Así que en `server.js`, deberías tener algo como esto:

```jsx
// Importar dependencias usando ES Modules
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
```

Railway funciona de forma similar, pero tiene una mejor integración con bases de datos como MongoDB o PostgreSQL, lo cual puede ser útil si quieres todo en una misma plataforma.

### Seguridad básica en Node.js

No es necesario complicarse demasiado, pero sí aplicar medidas mínimas:

- **Evita imprimir contraseñas o URLs** en consola.
- **Valida y sanitiza los datos** del usuario en cada ruta. Librerías como `express-validator` o `validator` son muy recomendables.
- **Controla errores de forma global**, con un middleware que capture todo lo que no se maneje explícitamente.

```jsx
// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error general:", err);
  res.status(500).json({ mensaje: "Error interno del servidor" });
});
```

- Si usas sesiones o autenticación, asegúrate de usar HTTPS, tokens firmados y librerías actualizadas.

### Buenas prácticas de estructura y mantenimiento

En proyectos más grandes, se recomienda seguir una estructura más ordenada como esta:

```
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── services/
├── utils/
└── index.js

```

Esto facilita el mantenimiento, la colaboración en equipo y el testeo. Además, deberías incluir un buen `README.md` donde expliques cómo levantar la app localmente, qué rutas expone, y cómo conectarse a la base de datos si fuese necesario.

También es ideal incluir scripts como:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

```

Y asegúrate de tener siempre actualizado tu archivo `package.json` con solo las dependencias que uses realmente.

### Testing y monitoreo

Aunque no entraremos a fondo en pruebas automatizadas en este curso, es importante que sepas que existen librerías como `Jest`, `Supertest` o `Mocha` para testear tu backend de forma seria.

Para monitorear errores, puedes usar servicios como **LogRocket**, **Sentry**, o simplemente logs bien organizados con `winston` o `morgan`.

### Conclusión

Publicar tu proyecto en internet y aplicar estas buenas prácticas no solo lo hace más profesional, sino también más seguro, estable y fácil de mantener. Es como terminar de pintar una casa después de construirla: puede estar bien por dentro, pero necesitas que luzca y funcione por fuera también.

Ahora que has llegado hasta aquí, tienes todas las bases necesarias para desarrollar proyectos reales con Node.js, desde un simple diario personal hasta un backend completo para una aplicación moderna. Lo que viene después depende de ti: puedes añadir autenticación, roles de usuario, almacenamiento en la nube o conectarte con frontend hechos en React, Vue o Svelte.

## Seguridad real: Login, JWT, Bcrypt y Roles

## Estructura del proyecto

```
auth-api/
├── server.js               # Punto de entrada
├── routes/
│   └── auth.js             # Rutas de login, registro, etc.
├── models/
│   └── Usuario.js          # Modelo de usuario (Mongoose)
├── middleware/
│   └── verificarToken.js   # Middleware de protección JWT
├── .env
├── package.json

```

## Configuración inicial para ES Modules

Para usar ES Modules en este proyecto, necesitamos configurar el package.json:

```json
{
  "name": "auth-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "dotenv": "^16.0.0"
  }
}
```

El campo `"type": "module"` es crucial para habilitar ES Modules en Node.js.

## Paso 1: Instalación

```bash
npm init -y
npm install express mongoose bcrypt jsonwebtoken dotenv

```

## Paso 2: Configura `.env`

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/usuariosdb
JWT_SECRET=CLAVESECRETA123

```

## Paso 3: Modelo `Usuario` con ES Modules

```jsx
// models/Usuario.js
import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

// Exportación por defecto con ES Modules
export default mongoose.model("Usuario", UsuarioSchema);
```

## Paso 4: Middleware para proteger rutas con ES Modules

```jsx
// middleware/verificarToken.js
import jwt from "jsonwebtoken";

// Importar variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar token JWT
function verificarToken(req, res, next) {
  // Extraer token del header Authorization (formato: Bearer TOKEN)
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Token requerido" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Añadir información del usuario al objeto request
    req.usuario = decoded;

    // Continuar con el siguiente middleware o ruta
    next();
  } catch (err) {
    // Token inválido o expirado
    res.status(403).json({ mensaje: "Token inválido" });
  }
}

// Middleware para verificar rol de administrador
function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "Solo accesible para administradores" });
  }
  next();
}

// Exportación nombrada con ES Modules
export { verificarToken, soloAdmin };
```

## Paso 5: Rutas de autenticación con ES Modules

```jsx
// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Importar modelo y middleware usando ES Modules
import Usuario from "../models/Usuario.js";
import { verificarToken, soloAdmin } from "../middleware/verificarToken.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Ruta de registro de nuevos usuarios
router.post("/registro", async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !correo || !contraseña) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son requeridos" });
    }

    // Hashear la contraseña con bcrypt (10 rounds de salt)
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear nuevo usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash, rol });

    // Guardar usuario en la base de datos
    await nuevoUsuario.save();

    // Respuesta exitosa
    res.status(201).json({ mensaje: "Usuario creado exitosamente" });
  } catch (err) {
    // Manejo de errores específicos
    if (err.code === 11000) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }
    res
      .status(500)
      .json({ mensaje: "Error al registrar usuario", error: err.message });
  }
});

// Ruta de login para usuarios existentes
router.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    // Validar campos requeridos
    if (!correo || !contraseña) {
      return res
        .status(400)
        .json({ mensaje: "Correo y contraseña son requeridos" });
    }

    // Buscar usuario por correo
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar contraseña proporcionada con el hash almacenado
    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Generar token JWT con información del usuario
    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
        nombre: usuario.nombre,
      },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expira en 1 hora
      }
    );

    // Respuesta exitosa con token
    res.json({
      mensaje: "Login correcto",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error en el proceso de login", error: err.message });
  }
});

// Ruta protegida - solo accesible para administradores
router.get("/usuarios", verificarToken, soloAdmin, async (req, res) => {
  try {
    // Obtener todos los usuarios (excluyendo contraseñas)
    const usuarios = await Usuario.find().select("-contraseña");
    res.json(usuarios);
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener usuarios", error: err.message });
  }
});

// Ruta de perfil de usuario (accesible por cualquier usuario autenticado)
router.get("/perfil", verificarToken, async (req, res) => {
  try {
    // Obtener información del usuario actual (sin contraseña)
    const usuario = await Usuario.findById(req.usuario.id).select(
      "-contraseña"
    );

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener perfil", error: err.message });
  }
});

// Exportar router usando ES Modules
export default router;
```

## Paso 6: `server.js` con ES Modules

```jsx
// server.js

// Configurar variables de entorno al inicio
import "dotenv/config";

// Importar dependencias usando sintaxis ES Modules
import express from "express";
import mongoose from "mongoose";

// Importar rutas usando extensiones explícitas (necesario en ES Modules)
import authRoutes from "./routes/auth.js";

// Inicializar aplicación Express
const app = express();

// Middleware para parsear JSON en las requests
app.use(express.json());

// Configurar rutas
app.use("/api", authRoutes);

// Ruta de verificación de salud del servidor
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Middleware para manejar rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error no manejado:", err);
  res.status(500).json({
    mensaje: "Error interno del servidor",
    // Solo mostrar detalles del error en desarrollo
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});

// Conectar a MongoDB y iniciar servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");

    // Iniciar servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📊 Entorno: ${process.env.NODE_ENV || "development"}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1); // Salir del proceso si no puede conectar a la BD
  });

// Exportar app para testing (ES Modules)
export default app;
```

## Consideraciones importantes al migrar a ES Modules

1. **Extensiones de archivo**: En ES Modules, debes incluir las extensiones completas en los imports (`.js`).
2. **Variables `__dirname`**: No están disponibles en ES Modules. Puedes recrearlas así:

```jsx
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

1. **Importación de JSON**: Necesitas flag experimental o usar `fs.readFile`:

```jsx
import { readFile } from "fs/promises";
const packageJson = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
);
```

## Pruebas con Postman

1. **POST /api/registro**

```json
{
  "nombre": "Óscar",
  "correo": "oscar@email.com",
  "contraseña": "123456",
  "rol": "admin"
}
```

1. **POST /api/login**

```json
{
  "correo": "oscar@email.com",
  "contraseña": "123456"
}
```

1. **GET /api/usuarios**

Header: `Authorization: Bearer TU_TOKEN_AQUI`

(Protegida, solo accesible por usuarios `admin`)

1. **GET /api/perfil**

Header: `Authorization: Bearer TU_TOKEN_AQUI`

(Accesible por cualquier usuario autenticado)
