# Autenticación y Autorización

# Autenticación y Autorización en las APIs REST de JavaScript para Páginas Web

## Introducción

La autenticación y la autorización son dos pilares fundamentales que garantizan que solo los usuarios legítimos tengan acceso a los recursos adecuados. En el contexto de las APIs REST, existen varios métodos para implementar estos procesos, entre los que se destacan las API Keys, Tokens (JWT), y OAuth.

## Métodos Comunes de Autenticación y Autorización

### API Keys

### Definición y Funcionamiento

Las API Keys son uno de los métodos más simples para autenticar aplicaciones que consumen una API. Una API Key es una cadena única que se asigna a cada cliente que necesita acceder a la API. Esta clave se envía con cada solicitud al servidor, generalmente a través de la URL, encabezados HTTP, o parámetros de consulta.

### Ventajas y Desventajas

- **Ventajas**:
  - Simplicidad: Fácil de implementar y usar.
  - Control de Acceso: Permite rastrear y controlar el acceso a la API.
- **Desventajas**:
  - Seguridad: Las claves pueden ser interceptadas si no se usan HTTPS.
  - Limitaciones: No proporcionan un método robusto para la gestión de permisos de usuarios.

### Ejemplo de Uso

```jsx
const apiKey = "your_api_key_here";
const url = `https://api.example.com/data?api_key=${apiKey}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Tokens (JWT)

### Definición y Funcionamiento

Los JSON Web Tokens (JWT) son un método compacto y seguro para transmitir información entre partes como un objeto JSON. Son particularmente útiles para la autenticación y la autorización en aplicaciones web. Un JWT se compone de tres partes: el encabezado (header), el payload, y la firma (signature).

- **Header**: Incluye el tipo de token (JWT) y el algoritmo de encriptación utilizado.
- **Payload**: Contiene las declaraciones (claims), que son la información que se desea transmitir, como el identificador de usuario y otros metadatos.
- **Signature**: Se genera combinando el header y el payload codificados en base64, firmados con un secreto o una clave privada.

### Ventajas y Desventajas

- **Ventajas**:
  - Seguridad: La firma asegura que el token no ha sido alterado.
  - Escalabilidad: Los tokens pueden ser verificados sin necesidad de almacenar la sesión en el servidor.
  - Flexibilidad: Pueden incluir cualquier información relevante en el payload.
- **Desventajas**:
  - Tamaño: Los JWT pueden ser relativamente grandes.
  - Seguridad: Si la clave privada es comprometida, todos los tokens emitidos son vulnerables.

### Ejemplo de Uso con JWT

Se detalla más adelante en este documento.

### OAuth

### Definición y Funcionamiento

OAuth es un protocolo de autorización que permite a las aplicaciones obtener acceso limitado a los recursos de usuario en un servidor sin exponer las credenciales del usuario. Funciona delegando el acceso a través de tokens de acceso que tienen permisos específicos.

### Ventajas y Desventajas

- **Ventajas**:
  - Seguridad: No se comparten las credenciales del usuario con las aplicaciones cliente.
  - Control Granular: Permite otorgar permisos específicos.
- **Desventajas**:
  - Complejidad: Es más complejo de implementar en comparación con otros métodos.

### Ejemplo de Uso

```jsx
const clientId = "your_client_id";
const clientSecret = "your_client_secret";
const redirectUri = "<https://yourapp.com/callback>";
const authUrl = `https://authorization-server.com/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

// Redirigir al usuario al URL de autorización
window.location.href = authUrl;
```

## Implementación de JWT (JSON Web Tokens)

### Introducción a JWT

Como se mencionó anteriormente, los JWT son ampliamente utilizados para la autenticación y la autorización en aplicaciones web. Su estructura y forma de trabajo los hacen ideales para aplicaciones que requieren una autenticación ligera y sin estado. A continuación, se proporciona un ejemplo detallado de cómo implementar JWT en una aplicación web usando JavaScript.

### Generación y Validación de JWT

### Paso 1: Instalación de Dependencias

Para manejar JWT en una aplicación Node.js, es común utilizar bibliotecas como `jsonwebtoken`. Primero, necesitamos instalar esta biblioteca.

```bash
npm install jsonwebtoken

```

### Paso 2: Configuración del Servidor para Emitir Tokens

En este paso, configuramos un servidor Express para emitir tokens JWT cuando un usuario inicia sesión correctamente.

```jsx
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const secretKey = "your_secret_key";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});
```

En este código:

- Configuramos un servidor Express que escucha en el puerto 3000.
- Utilizamos `body-parser` para manejar las solicitudes JSON.
- Definimos un endpoint `/login` que emite un token JWT si las credenciales son válidas.

### Paso 3: Validación de Tokens en Solicitudes Subsecuentes

Una vez que un cliente tiene un token, puede incluirlo en las solicitudes a endpoints protegidos. Configuramos middleware en el servidor para validar estos tokens.

```jsx
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});
```

En este código:

- `authenticateToken` es un middleware que verifica la validez del token.
- Si el token es válido, permite el acceso al endpoint protegido `/protected`.

### Ejemplo de Cliente JavaScript

Para realizar solicitudes autenticadas desde un cliente JavaScript, podemos usar la Fetch API junto con `async/await`.

```jsx
async function login(username, password) {
  const response = await fetch("<http://localhost:3000/login>", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    console.log("Login successful");
  } else {
    console.error("Login failed");
  }
}

async function accessProtectedResource() {
  const token = localStorage.getItem("token");
  const response = await fetch("<http://localhost:3000/protected>", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.text();
    console.log("Protected resource:", data);
  } else {
    console.error("Access denied");
  }
}

// Example usage
login("user1", "password1").then(() => {
  accessProtectedResource();
});
```

En este código:

- La función `login` realiza una solicitud POST al servidor para obtener un token y lo almacena en `localStorage`.
- La función `accessProtectedResource` recupera el token de `localStorage` y lo usa en el encabezado `Authorization` para acceder a un recurso protegido.

### Consideraciones de Seguridad

Aunque los JWT proporcionan una solución eficiente para la autenticación y la autorización, es importante seguir buenas prácticas de seguridad:

1. **HTTPS**: Siempre utilizar HTTPS para proteger los tokens durante la transmisión.
2. **Caducidad**: Configurar una caducidad razonable para los tokens (`expiresIn`), y considerar el uso de tokens de actualización (refresh tokens) para obtener nuevos tokens sin necesidad de volver a autenticar al usuario.
3. **Almacenamiento Seguro**: Almacenar los tokens de forma segura, preferiblemente en `localStorage` o `sessionStorage`. Evitar el uso de cookies si no están configuradas correctamente para ser seguras (e.g., HttpOnly y Secure).
4. **Validación Rigurosa**: Validar tokens en cada solicitud a recursos protegidos y manejar los errores de verificación adecuadamente.

##

Conclusión

La autenticación y la autorización son componentes esenciales en el desarrollo de APIs REST seguras. Métodos como las API Keys, Tokens (JWT), y OAuth ofrecen diferentes niveles de seguridad y complejidad. Los JWT, en particular, ofrecen una solución robusta y flexible que permite la autenticación sin estado, lo que los hace ideales para aplicaciones modernas que requieren escalabilidad y eficiencia.

Este documento ha explorado en detalle cómo funcionan estos métodos, con un enfoque en la implementación de JWT en una aplicación web con JavaScript. Al seguir las prácticas recomendadas y aplicar estos métodos correctamente, los desarrolladores pueden asegurar que sus aplicaciones web proporcionen acceso seguro y controlado a los recursos, protegiendo tanto los datos del usuario como la integridad del sistema.
