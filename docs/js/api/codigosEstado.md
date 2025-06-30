# Códigos de estado HTTP

# Códigos de Estado HTTP en las APIs REST de JavaScript para Páginas Web

Un componente crucial de esta interacción son los códigos de estado HTTP, que indican el resultado de las solicitudes realizadas al servidor. Estos códigos permiten a los desarrolladores y a las aplicaciones entender cómo se procesaron las solicitudes y responder adecuadamente.

## 200 OK: Solicitud Exitosa

### Definición y Propósito

El código de estado 200 OK indica que la solicitud se ha procesado correctamente y que el servidor ha devuelto la respuesta esperada. Este es el código más comúnmente utilizado para indicar éxito en una operación HTTP.

### Implementación en JavaScript

En JavaScript, la respuesta con el código 200 OK se maneja comúnmente utilizando la Fetch API o bibliotecas como Axios.

### Ejemplo con Fetch API

```jsx
fetch("<https://api.example.com/users>")
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Failed to fetch users");
    }
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se verifica si el estado de la respuesta es 200 OK antes de procesar los datos JSON.

### Aplicación Práctica

El código 200 OK se utiliza en varias operaciones, como obtener listas de recursos, recuperar detalles específicos de un recurso y validar solicitudes exitosas en general.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}

```

Esta respuesta JSON representa un usuario que ha sido recuperado exitosamente del servidor.

## 201 Created: Recurso Creado

### Definición y Propósito

El código de estado 201 Created indica que una solicitud que lleva a la creación de un recurso ha sido exitosa. Además de indicar éxito, este código suele ir acompañado de la ubicación del nuevo recurso mediante el header `Location`.

### Implementación en JavaScript

### Ejemplo con Fetch API

```jsx
const data = { name: "John Doe", email: "john.doe@example.com" };

fetch("<https://api.example.com/users>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      throw new Error("Failed to create user");
    }
  })
  .then((data) => console.log("User created:", data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se verifica si el estado de la respuesta es 201 Created antes de procesar los datos JSON del nuevo recurso.

### Aplicación Práctica

El código 201 Created se utiliza principalmente en operaciones de creación de recursos, como agregar un nuevo usuario, crear una nueva entrada en una base de datos o registrar un nuevo producto.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 201 Created
Location: <https://api.example.com/users/1>
Content-Type: application/json

{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}

```

Esta respuesta JSON incluye la ubicación del nuevo recurso creado y los detalles del recurso.

## 400 Bad Request: Solicitud Incorrecta

### Definición y Propósito

El código de estado 400 Bad Request indica que el servidor no puede procesar la solicitud debido a un error del cliente, como una sintaxis incorrecta, parámetros inválidos o datos malformados.

### Implementación en JavaScript

### Ejemplo con Fetch API

```jsx
fetch("<https://api.example.com/users>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "", email: "not-an-email" }),
})
  .then((response) => {
    if (response.status === 400) {
      return response.json().then((error) => {
        throw new Error(`Bad Request: ${error.message}`);
      });
    } else {
      return response.json();
    }
  })
  .then((data) => console.log("User created:", data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se maneja el estado 400 Bad Request verificando la respuesta del servidor y lanzando un error si la solicitud es incorrecta.

### Aplicación Práctica

El código 400 Bad Request se utiliza en situaciones donde el cliente envía datos malformados, parámetros incorrectos o cualquier otra solicitud que el servidor no pueda procesar debido a un error del cliente.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Invalid email format"
}

```

Esta respuesta JSON indica que el servidor no pudo procesar la solicitud debido a un formato de correo electrónico inválido.

## 401 Unauthorized: No Autorizado

### Definición y Propósito

El código de estado 401 Unauthorized indica que la solicitud no se ha completado porque carece de credenciales de autenticación válidas. Este código se utiliza cuando el servidor requiere autenticación y las credenciales proporcionadas son inválidas o inexistentes.

### Implementación en JavaScript

### Ejemplo con Fetch API

```jsx
fetch("<https://api.example.com/secure-data>", {
  headers: {
    Authorization: "Bearer invalid-token",
  },
})
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Unauthorized: Invalid token");
    } else {
      return response.json();
    }
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se maneja el estado 401 Unauthorized verificando la respuesta del servidor y lanzando un error si las credenciales son inválidas.

### Aplicación Práctica

El código 401 Unauthorized se utiliza en operaciones que requieren autenticación, como acceder a datos sensibles, modificar información de usuario o realizar cualquier acción que requiera una sesión autenticada.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="example"

{
  "error": "Invalid token"
}

```

Esta respuesta JSON y el header `WWW-Authenticate` indican que la solicitud no está autorizada debido a un token inválido.

## 404 Not Found: Recurso No Encontrado

### Definición y Propósito

El código de estado 404 Not Found indica que el servidor no pudo encontrar el recurso solicitado. Este código se utiliza cuando el recurso especificado en la URL no existe.

### Implementación en JavaScript

### Ejemplo con Fetch API

```jsx
fetch("<https://api.example.com/non-existent-resource>")
  .then((response) => {
    if (response.status === 404) {
      throw new Error("Resource not found");
    } else {
      return response.json();
    }
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se maneja el estado 404 Not Found verificando la respuesta del servidor y lanzando un error si el recurso no se encuentra.

### Aplicación Práctica

El código 404 Not Found se utiliza cuando se solicita un recurso que no existe en el servidor, como una página web, un archivo, o una entrada en una base de datos.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "Resource not found"
}

```

Esta respuesta JSON indica que el servidor no pudo encontrar el recurso solicitado.

## 500 Internal Server Error: Error en el Servidor

### Definición y Propósito

El código de estado 500 Internal Server Error indica que el servidor encontró una condición inesperada que le impidió completar la solicitud. Este código se utiliza cuando ocurre un error genérico en el servidor que no se puede clasificar en otra categoría de códigos de estado.

### Implementación en JavaScript

### Ejemplo con Fetch API

```jsx
fetch("<https://api.example.com/unstable-endpoint>")
  .then((response) => {
    if (response.status === 500) {
      throw new Error("Internal Server Error");
    } else {
      return response.json();
    }
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

En este ejemplo, se maneja el estado 500 Internal Server Error verificando la respuesta del servidor y lanzando un error si ocurre un problema en el servidor.

### Aplicación Práctica

El código 500 Internal Server Error se utiliza cuando ocurre un error interno en el servidor, como una excepción no controlada, problemas con la base de datos o cualquier otra falla del sistema.

### Ejemplo de Respuesta de Servidor

```
HTTP/1.1 500 Internal Server Error

Content-Type: application/json

{
  "error": "Unexpected server error"
}

```

Esta respuesta JSON indica que el servidor encontró un error inesperado que le impidió completar la solicitud.

## Conclusión

Los códigos de estado HTTP son fundamentales para la comunicación efectiva entre clientes y servidores en las APIs REST. Entender y manejar adecuadamente estos códigos permite a los desarrolladores crear aplicaciones web más robustas y eficientes. Este documento ha explorado en detalle los códigos de estado 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found y 500 Internal Server Error, proporcionando ejemplos prácticos de su implementación en JavaScript y discutiendo su aplicación en el desarrollo de APIs REST.

La correcta interpretación y gestión de estos códigos de estado no solo mejora la experiencia del usuario, sino que también facilita el mantenimiento y la depuración de aplicaciones web complejas. A medida que las tecnologías web continúan evolucionando, el conocimiento profundo de los códigos de estado HTTP seguirá siendo una habilidad esencial para los desarrolladores de software.
