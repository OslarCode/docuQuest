# Consumo de APIs web

Hoy en día, las aplicaciones ya no funcionan solas: necesitan hablar con otros servicios. Para lograrlo, usan APIs web. Aprender a consumir APIs es esencial si quieres crear apps modernas y conectadas. En este recorrido, veremos cómo hacer peticiones HTTP usando Fetch y Axios, cómo manejar errores, cómo proteger tus peticiones con OAuth y JWT, y cómo aplicar todo esto tanto en el frontend como en el backend.

## Hacer peticiones HTTP: tu primer contacto con una API

Cuando quieres pedir datos a una API (por ejemplo, una lista de libros), necesitas hacer una **petición HTTP**. En JavaScript, puedes hacerlo de dos formas populares: usando **Fetch API**, que ya viene con el navegador, o **Axios**, una librería externa.

### Usar Fetch API

`fetch()` es simple y directo. Haces una solicitud a una URL, esperas la respuesta y luego haces algo con los datos.

```jsx
// Ejemplo básico con Fetch
fetch("<https://api.example.com/data>")
  .then((res) => {
    // Verificar si la respuesta fue exitosa
    if (!res.ok) throw new Error("Algo salió mal");
    // Convertir la respuesta a JSON
    return res.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

Si la petición falla, el bloque `.catch()` atrapa el error y muestra un mensaje.

### Usar Axios

Axios hace lo mismo, pero con algunas ventajas extra. Ya convierte todo a JSON automáticamente y te da más detalles si algo falla.

```jsx
import axios from "axios";

// Ejemplo básico con Axios
axios
  .get("<https://api.example.com/data>")
  .then((res) => console.log(res.data))
  .catch((error) => console.error("Error:", error));
```

También puedes configurar Axios para que todas tus peticiones tengan el mismo encabezado, como un token de acceso:

```jsx
// Configuración global de Axios
axios.defaults.headers.common["Authorization"] = "Bearer tu_token";
```

### Uso moderno con async/await

La forma más moderna y legible de trabajar con peticiones asíncronas es usando `async/await`:

```jsx
// Ejemplo con async/await y Fetch
async function obtenerDatos() {
  try {
    const respuesta = await fetch("<https://api.example.com/data>");

    // Verificar si la respuesta fue exitosa
    if (!respuesta.ok) throw new Error("Error en la petición");

    // Convertir la respuesta a JSON
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Falló:", error);
    throw error; // Relanzar el error para que lo maneje quien llame a esta función
  }
}

// Uso de la función
async function mostrarDatos() {
  try {
    const datos = await obtenerDatos();
    console.log("Datos recibidos:", datos);
  } catch (error) {
    console.error("Error al mostrar datos:", error);
  }
}
```

## Manejo de estados de carga y error en interfaces

Cuando trabajas en el frontend, es importante mostrar estados de carga y manejar errores de forma elegante:

```jsx
// Ejemplo en un contexto de React, pero aplicable a cualquier framework
const [datos, setDatos] = useState(null);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function cargarDatos() {
    try {
      setCargando(true);
      setError(null);

      const respuesta = await fetch("<https://api.example.com/data>");

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }

      const datosRecibidos = await respuesta.json();
      setDatos(datosRecibidos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  cargarDatos();
}, []);

// En la interfaz puedes usar estos estados:
if (cargando) return <div>Cargando...</div>;
if (error) return <div>Error: {error}</div>;
if (!datos) return <div>No hay datos</div>;

return <div>{/* Mostrar datos aquí */}</div>;
```

## Manejar errores y respuestas de forma elegante

Cuando haces peticiones, es vital no asumir que siempre saldrán bien. A veces el servidor responde con error, a veces la red falla, o a veces recibes una respuesta inesperada.

Con **Fetch**, necesitas comprobar manualmente si todo fue bien:

```jsx
// Manejo detallado de errores con Fetch
fetch("<https://api.example.com/data>")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error completo:", error);
    // Puedes mostrar diferentes mensajes según el tipo de error
    if (error.name === "TypeError") {
      console.error("Error de red - verifica tu conexión");
    } else {
      console.error("Error del servidor:", error.message);
    }
  });
```

Con **Axios**, puedes capturar detalles más específicos:

```jsx
axios
  .get("<https://api.example.com/data>")
  .then((res) => console.log(res.data))
  .catch((error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error("Respuesta del servidor:", error.response.status);
      console.error("Datos del error:", error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error("No hubo respuesta del servidor");
    } else {
      // Algo pasó al configurar la petición
      console.error("Error general:", error.message);
    }
  });
```

## Manejo de APIs paginadas

Cuando una API devuelve muchos resultados (ej: 10,000 productos), en lugar de enviarlos todos de una vez, los divide en páginas más pequeñas (ej: 20 productos por página).

### **Parámetros comunes de paginación:**

- **page**: Número de página actual
- **limit** o **size**: Cantidad de elementos por página
- **offset**: Número de elementos a saltar

## **Estructura típica de respuesta paginada:**

```json
{
  "data": [
    { "id": 1, "nombre": "Producto A" },
    { "id": 2, "nombre": "Producto B" }
    // ... hasta 'limit' elementos
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

Ejemplo de como manejar una API paginada:

```jsx
// Ejemplo de consumo de API paginada
async function obtenerDatosPaginados(pagina = 1, limite = 10) {
  try {
    const respuesta = await fetch(
      `https://api.example.com/data?page=${pagina}&limit=${limite}`
    );

    if (!respuesta.ok) throw new Error("Error en la petición");

    const datos = await respuesta.json();

    // Estructura típica de respuesta paginada
    return {
      datos: datos.items, // Los datos reales
      paginaActual: datos.page, // Página actual
      totalPaginas: datos.totalPages, // Total de páginas
      totalElementos: datos.total, // Total de elementos
      tieneSiguiente: datos.hasNext, // Si hay más páginas
      tieneAnterior: datos.hasPrev, // Si hay páginas anteriores
    };
  } catch (error) {
    console.error("Error obteniendo datos paginados:", error);
    throw error;
  }
}

// Uso en una aplicación
async function cargarSiguientePagina() {
  try {
    const resultado = await obtenerDatosPaginados(paginaActual + 1);

    // Actualizar estado de la aplicación
    setDatos((prevDatos) => [...prevDatos, ...resultado.datos]);
    setPaginaActual(resultado.paginaActual);
    setTieneMasPaginas(resultado.tieneSiguiente);
  } catch (error) {
    console.error("Error cargando página:", error);
  }
}
```

Hasta ahora hemos visto cómo consumir APIs públicas y manejar datos paginados, pero muchas APIs requieren **autenticación** para acceder a datos privados o realizar operaciones sensibles.

Imagina que quieres acceder al perfil de un usuario en una red social, hacer una compra online, o gestionar tus archivos en la nube. Todas estas operaciones necesitan demostrar que eres quien dices ser. Aquí es donde entran en juego dos herramientas fundamentales: **OAuth** para autorización entre servicios y **JWT** para manejo seguro de identidad.

## Autenticación: proteger tus peticiones con OAuth y JWT

Cuando accedes a datos privados, necesitas **demostrar quién eres**. Aquí entran dos herramientas clave: **OAuth** y **JWT**.

## ¿Cómo funciona OAuth?

**OAuth (Open Authorization)** es un protocolo de autorización estándar que permite a las aplicaciones acceder a información de usuarios en otros servicios sin necesidad de compartir sus contraseñas.

El flujo básico de OAuth 2.0 (la versión más usada) sigue estos pasos:

### 1. **Solicitud de Autorización**

Tu aplicación redirige al usuario al proveedor de OAuth (como Google, GitHub, etc.) con:

- Tu `client_id` (identificador de tu aplicación)
- Los `scopes` (permisos que necesitas)
- Una `redirect_uri` (donde volverá después)

### 2. **Usuario Autoriza**

El usuario ve una pantalla del proveedor preguntando: "¿La aplicación X quiere acceder a tu información Y?" Si acepta, el proveedor redirige de vuelta a tu aplicación con un **código de autorización**.

### 3. **Intercambio por Token**

Tu aplicación backend intercambia ese código por un **token de acceso**, haciendo una petición secreta (con tu `client_secret`) al proveedor.

### 4. **Uso del Token**

Con el token de acceso, tu aplicación puede hacer peticiones a la API del proveedor para obtener los datos autorizados.

## Ejemplo práctico simplificado:

```jsx
// 1. Usuario hace clic en "Login con Google"
window.location.href = `https://accounts.google.com/o/oauth2/auth?
  client_id=TU_CLIENT_ID&
  redirect_uri=https://tuapp.com/callback&
  scope=email profile&
  response_type=code`;

// 2. Google redirige a tu callback con un código
// <https://tuapp.com/callback?code=AUTH_CODE>

// 3. Backend intercambia código por token
const response = await fetch("<https://oauth2.googleapis.com/token>", {
  method: "POST",
  body: JSON.stringify({
    code: "AUTH_CODE",
    client_id: "TU_CLIENT_ID",
    client_secret: "TU_CLIENT_SECRET",
    redirect_uri: "<https://tuapp.com/callback>",
    grant_type: "authorization_code",
  }),
});

// 4. Obtienes el token de acceso
const { access_token } = await response.json();

// 5. Usas el token para obtener datos del usuario
const userData = await fetch(
  "<https://www.googleapis.com/oauth2/v2/userinfo>",
  {
    headers: { Authorization: `Bearer ${access_token}` },
  }
);
```

## ¿Por qué es seguro?

- **No compartes contraseñas**: El usuario nunca da su contraseña a tu aplicación
- **Tokens temporales**: Los tokens expiran y se pueden revocar
- **Permisos específicos**: Solo accedes a lo que el usuario autorizó explícitamente

### OAuth: inicio de sesión con permisos

OAuth es como pedirle a Google permiso para acceder a tus datos sin darle tu contraseña a otra app. El proceso suele ir así:

1. El usuario inicia sesión en un proveedor (como Google o GitHub).
2. Ese proveedor devuelve un "código de autorización".
3. Tu app cambia ese código por un **token de acceso**.
4. Usas ese token para hacer peticiones protegidas.

En código, se ve así:

```jsx
// Ejemplo de flujo OAuth en el backend con Node.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ruta para intercambiar código por token de acceso
router.post("/oauth/callback", async (req, res) => {
  try {
    const { code } = req.body;

    // Intercambiar el código por un token de acceso
    const tokenResponse = await axios.post(
      "<https://oauth.example.com/token>",
      {
        code: code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Usar el token para obtener datos del usuario
    const userResponse = await axios.get("<https://api.example.com/user>", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    // Guardar información del usuario en la base de datos (ejemplo con SQLite)
    const db = require("../data/database");
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, email, access_token, refresh_token)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run([
      userResponse.data.id,
      userResponse.data.email,
      access_token,
      refresh_token,
    ]);

    res.json({
      success: true,
      user: userResponse.data,
      access_token: access_token,
    });
  } catch (error) {
    console.error("Error en OAuth callback:", error);
    res.status(500).json({
      success: false,
      error: "Error en la autenticación",
    });
  }
});

module.exports = router;
```

## ¿Qué es un JWT?

**JWT (JSON Web Token)** es un estándar abierto que define una forma compacta y autónoma de transmitir información de forma segura entre partes como un objeto JSON.

Un JWT es como un "pase de acceso" digital que contiene información sobre el usuario. Está formado por tres partes separadas por puntos:

```
header.payload.signature

```

### Estructura de un JWT:

1. **Header**: Especifica el tipo de token y el algoritmo de firma
2. **Payload**: Contiene los "claims" o datos del usuario (id, nombre, permisos, expiración)
3. **Signature**: Firma digital que verifica la autenticidad del token

## ¿Cómo funciona JWT?

### 1. **Generación del Token** (Login exitoso)

Cuando un usuario inicia sesión correctamente, el servidor genera un JWT:

```jsx
// Backend - Generar JWT tras login exitoso
const jwt = require("jsonwebtoken");

function generarToken(usuario) {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira en 1 hora
  };

  return jwt.sign(payload, "clave_secreta", { algorithm: "HS256" });
}

// Usuario se logea correctamente
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar credenciales (ejemplo simplificado)
  const usuario = verificarCredenciales(email, password);

  if (usuario) {
    const token = generarToken(usuario);
    res.json({
      token: token,
      usuario: { id: usuario.id, email: usuario.email },
    });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});
```

### 2. **Envío del Token**

El cliente guarda el JWT (normalmente en localStorage o cookies) y lo envía en cada petición:

```jsx
// Frontend - Enviar JWT en peticiones
const token = localStorage.getItem("jwt_token");

fetch("/api/datos-protegidos", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

### 3. **Verificación del Token**

El servidor verifica la validez del JWT en cada petición protegida:

```jsx
// Backend - Middleware de verificación
function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  jwt.verify(token, "clave_secreta", (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    req.usuario = usuario; // Información del usuario decodificada
    next();
  });
}

// Uso en rutas protegidas
app.get("/api/perfil", verificarToken, (req, res) => {
  // req.usuario contiene los datos del JWT (id, email, etc.)
  res.json({
    mensaje: "Acceso permitido",
    usuario: req.usuario,
  });
});
```

## Ventajas de JWT:

- **Sin estado (stateless)**: El servidor no necesita guardar sesiones
- **Portable**: La información del usuario viaja en el propio token
- **Verificación rápida**: Solo necesita verificar la firma digital
- **Escalable**: Ideal para arquitecturas de microservicios

## Diferencias clave con OAuth:

- **OAuth**: Protocolo de autorización para acceder a recursos de terceros
- **JWT**: Formato de token que puede usarse dentro de OAuth u otros sistemas

## Ejemplo de token JWT decodificado:

```jsx
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "id": 123,
  "email": "usuario@ejemplo.com",
  "iat": 1516239022,  // Fecha de emisión
  "exp": 1516242622   // Fecha de expiración
}

// Signature (firmado con clave secreta)
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secreto)

```

### JWT: un pase con firma digital

JWT (JSON Web Token) es un archivo que contiene datos sobre el usuario, firmado digitalmente. Si tienes un JWT válido, puedes acceder a recursos protegidos.

Tu flujo sería así:

1. El usuario inicia sesión → el servidor genera un JWT.
2. El cliente guarda el JWT (en localStorage, por ejemplo).
3. Para cada petición, el cliente envía el JWT en los encabezados.

```jsx
// En el frontend - enviar JWT en las peticiones
async function hacerPeticionProtegida() {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    // Redirigir al login si no hay token
    window.location.href = "/login";
    return;
  }

  try {
    const respuesta = await fetch("<https://api.example.com/protegido>", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (respuesta.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("jwt_token");
      window.location.href = "/login";
      return;
    }

    if (!respuesta.ok) throw new Error("Error en la petición");

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error en petición protegida:", error);
    throw error;
  }
}

// En el backend - verificar JWT
const jwt = require("jsonwebtoken");

function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Token de acceso requerido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido o expirado" });
    }

    req.usuario = usuario;
    next();
  });
}

// Uso en las rutas protegidas
app.get("/api/datos-protegidos", autenticarToken, (req, res) => {
  // Solo usuarios autenticados llegan aquí
  res.json({
    mensaje: "Datos protegidos",
    usuario: req.usuario,
  });
});
```

## Diferencias clave entre frontend y backend

### En el frontend: mostrar datos en la interfaz

Imagina que tienes una app en React que quiere mostrar datos al cargar. Puedes usar `fetch()` en un `useEffect` para pedir esos datos y mostrarlos:

```jsx
// Frontend - React example
import { useState, useEffect } from "react";

function ListaDeProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setCargando(true);
        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  if (cargando) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Productos Disponibles</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### En el backend: combinar datos de otras APIs

A veces, tu servidor (por ejemplo, una app en Node.js) también necesita hablar con otras APIs, como una pasarela de pagos o un servicio externo.

```jsx
// Backend - Node.js + Express consumiendo otra API
const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ruta que consume datos de una API externa y los procesa
router.get("/datos-combinados", async (req, res) => {
  try {
    // Hacer múltiples peticiones en paralelo
    const [usuariosResponse, productosResponse] = await Promise.all([
      axios.get("<https://api.users.com/usuarios>"),
      axios.get("<https://api.products.com/productos>"),
    ]);

    // Combinar y procesar datos
    const datosCombinados = {
      usuarios: usuariosResponse.data,
      productos: productosResponse.data,
      timestamp: new Date().toISOString(),
      totalElementos:
        usuariosResponse.data.length + productosResponse.data.length,
    };

    // Opcional: guardar en base de datos SQLite
    const db = require("../data/database");
    db.run("INSERT INTO cache_api (tipo, datos) VALUES (?, ?)", [
      "datos_combinados",
      JSON.stringify(datosCombinados),
    ]);

    res.json(datosCombinados);
  } catch (error) {
    console.error("Error obteniendo datos combinados:", error);

    // En caso de error, intentar servir datos cacheados
    const db = require("../data/database");
    db.get(
      "SELECT datos FROM cache_api WHERE tipo = ? ORDER BY fecha DESC LIMIT 1",
      ["datos_combinados"],
      (err, row) => {
        if (err || !row) {
          return res.status(500).json({
            error: "No se pudieron obtener los datos",
          });
        }

        res.json(JSON.parse(row.datos));
      }
    );
  }
});

module.exports = router;
```

## Manejo de CORS y variables de entorno

CORS significa **Cross-Origin Resource Sharing** o **Compartición de Recursos entre Orígenes**.

Es un **mecanismo de seguridad del navegador** que controla qué sitios web pueden hacer peticiones a un servidor distinto del dominio desde el que fue cargada la página.

### Por qué existe CORS

Sin CORS, cualquier página maliciosa podría cargar tu web en segundo plano y hacer peticiones a tu API usando tus credenciales, robando o manipulando datos. CORS evita eso al exigir que el servidor autorice explícitamente qué orígenes externos pueden comunicarse con él.

### Qué es un "origen"

El origen se define por tres elementos:

- Protocolo (http / https)
- Dominio (ejemplo.com)
- Puerto (:3000, :8080, etc.)

Ejemplo:

| URL                                             | Origen                                                      |
| ----------------------------------------------- | ----------------------------------------------------------- |
| [https://miapp.com](https://miapp.com/)         | [https://miapp.com](https://miapp.com/)                     |
| [https://api.miapp.com](https://api.miapp.com/) | Es otro origen                                              |
| [http://localhost:3000](http://localhost:3000/) | Diferente origen de [https://miapp.com](https://miapp.com/) |

Si tu frontend está en `http://localhost:5173` y la API en `http://localhost:3000`, el navegador las considera **orígenes distintos**, y CORS entra en juego.

### Cómo responde CORS

Cuando el navegador detecta que la petición es a otro origen, primero envía una petición de verificación (preflight) con `OPTIONS`. El servidor debe responder indicando si se permite el acceso.

Las cabeceras más usadas son:

| Cabecera                           | Qué indica                                              |
| ---------------------------------- | ------------------------------------------------------- |
| `Access-Control-Allow-Origin`      | Orígenes permitidos                                     |
| `Access-Control-Allow-Methods`     | Métodos permitidos (GET, POST, etc.)                    |
| `Access-Control-Allow-Headers`     | Qué cabeceras puede enviar el cliente                   |
| `Access-Control-Allow-Credentials` | Si se permiten cookies/tokens enviadas por el navegador |

## **Preflight Request en CORS**

Cuando el navegador detecta una petición "compleja" (con ciertos headers personalizados, métodos diferentes a GET/POST/HEAD, o contenido con tipo específico), aplica un mecanismo de seguridad adicional llamado **preflight**.

El navegador envía primero una petición `OPTIONS` para verificar si el servidor permite la operación real:

```json
// Petición PREFLIGHT que envía el navegador automáticamente:
OPTIONS /api/datos-protegidos HTTP/1.1
Origin: <https://mi-frontend.com>
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: Authorization, Content-Type
```

El servidor debe responder autorizando estas operaciones:

```json
// Respuesta del servidor a la preflight:
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://mi-frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Authorization, Content-Type
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400  // Cachear esta respuesta por 24 horas
```

Solo después de recibir esta autorización, el navegador envía la petición real con los datos.

### **¿Qué solicitudes requieren preflight?**

- Métodos: PUT, DELETE, PATCH, etc.
- Headers personalizados: Authorization, X-API-Key, etc.
- Content-Type diferente a: application/x-www-form-urlencoded, multipart/form-data, text/plain

### **¿Qué solicitudes NO requieren preflight?**

- GET, POST, HEAD con Content-Type estándar
- Peticiones simples sin headers personalizados

### Ejemplo en Node.js + Express

Si tu API está en `http://localhost:3000` y tu frontend en `http://localhost:5173`, instala el middleware CORS:

```bash
npm install cors

```

Luego en `server.js`:

```jsx
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // si usas cookies o sesiones
  })
);

app.get("/api/data", (req, res) => {
  res.json({ msg: "API funcionando y CORS habilitado" });
});

app.listen(3000);
```

### Ejemplo manual sin middleware

```jsx
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
```

### Cuándo te encuentras con CORS

Situaciones típicas:

- Frontend en React/Vite/Angular/Vue consumiendo API Express
- Aplicación local pidiendo datos a API remota
- SPA usando cookies de sesión
- APIs públicas que solo permiten ciertos dominios

### Resumen conceptual

CORS no es un error de tu código

El error típico “Blocked by CORS policy” no significa que tu código esté mal, sino que **el servidor no está diciendo explícitamente que permite tu origen**.

En otras palabras:

> El navegador bloquea para protegerte, y el servidor debe autorizar.

### Configuración de CORS en el backend

Cuando el frontend consume APIs externas o de diferente dominio, necesitas configurar CORS:

```jsx
// Backend - Configuración de CORS
const express = require("express");
const cors = require("cors");

const app = express();

// Configuración básica de CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "<http://localhost:3000>",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Si usas cookies o autenticación con sesiones
  })
);

// O configurar manualmente los headers CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
```

### Uso de variables de entorno

Es crucial usar variables de entorno para configuraciones sensibles:

```jsx
// .env file
API_BASE_URL=https://api.ejemplo.com
JWT_SECRET=tu_clave_secreta_muy_segura
CLIENT_ID=tu_client_id
CLIENT_SECRET=tu_client_secret
DATABASE_PATH=./data/mi_app.db

// En tu código
require('dotenv').config();

const config = {
  apiBaseUrl: process.env.API_BASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  databasePath: process.env.DATABASE_PATH
};

// Uso en peticiones
async function hacerPeticionExterna() {
  const respuesta = await fetch(`${process.env.API_BASE_URL}/datos`, {
    headers: {
      'Client-ID': process.env.CLIENT_ID,
      'Authorization': `Bearer ${process.env.API_KEY}`
    }
  });

  return await respuesta.json();
}

```

## Conclusión: dominar las APIs es dominar el desarrollo moderno

Consumir APIs no es solo hacer peticiones: es entender cómo hablar con otros sistemas, manejar errores de forma inteligente y mantener la seguridad en todo momento. Ya sea desde el navegador o desde tu servidor, saber usar Fetch, Axios, JWT y OAuth te da una ventaja enorme como desarrollador.
