# Seguridad, despliegue y buenas prácticas

## Despliegue y buenas prácticas en aplicaciones Node.js

Hasta ahora hemos construido aplicaciones funcionales, conectadas a bases de datos, con rutas bien organizadas y un frontend que interactúa con la API. Pero ningún proyecto está realmente completo hasta que puede vivir en internet, escalar, ser mantenido y, sobre todo, sobrevivir sin fallos graves. Este módulo se encarga de todo eso.

### Preparación para producción

Antes de pensar en subir la app a un servidor, es importante dejarla lista internamente. ¿Qué significa esto? Básicamente, asegurarte de que no estás subiendo nada innecesario, que tus variables sensibles están protegidas, y que tu código no tiene errores no controlados.

Un primer paso esencial es usar archivos `.env` correctamente para separar los datos sensibles (como las URLs de conexión a la base de datos o claves secretas) del código fuente. Este archivo nunca debería estar subido al repositorio. Por eso, en tu `.gitignore`, debes asegurarte de incluir:

```
.env
node_modules/

```

También es buena práctica organizar tu servidor Express en archivos separados: modelos, rutas, controladores, y middlewares. Si tu `server.js` mide más de 100 líneas, probablemente estás haciendo demasiado ahí. Piensa siempre en separar responsabilidades.

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

## NUEVA SECCIÓN DEL MÓDULO 8

### Seguridad real: Login, JWT, Bcrypt y Roles

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

## Paso 3: Modelo `Usuario`

```jsx
// models/Usuario.js
const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema);
```

## Paso 4: Middleware para proteger rutas

```jsx
// middleware/verificarToken.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token requerido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ mensaje: "Token inválido" });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "Solo accesible para administradores" });
  }
  next();
}

module.exports = { verificarToken, soloAdmin };
```

## Paso 5: Rutas de autenticación

```jsx
// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const { verificarToken, soloAdmin } = require("../middleware/verificarToken");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Registro
router.post("/registro", async (req, res) => {
  const { nombre, correo, contraseña, rol } = req.body;

  try {
    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ nombre, correo, contraseña: hash, rol });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al registrar", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const match = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!match)
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ mensaje: "Login correcto", token });
  } catch (err) {
    res.status(500).json({ mensaje: "Error en login", error: err.message });
  }
});

// Ruta protegida
router.get("/usuarios", verificarToken, soloAdmin, async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

module.exports = router;
```

## Paso 6: `server.js`

```jsx
// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor en puerto ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ Error Mongo:", err.message));
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

## ¿Qué has aprendido aquí?

- Uso real de **bcrypt** para proteger contraseñas
- Generación y verificación de **tokens JWT**
- Protección de rutas con middleware
- Uso de **roles** para restringir accesos
- Cómo diseñar una **API segura local**

## 🧠 ¿Qué sigue?

En el **Módulo 9**:

- Documentar esta API con Swagger
- Añadir testing con Jest
- Mejor manejo de errores y logs
- Validaciones con Joi
- Crear un sistema completo de usuarios
