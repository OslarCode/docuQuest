# Métodos HTTP

# Conceptos Básicos de Métodos HTTP en APIs REST de JavaScript

En el desarrollo de aplicaciones web modernas, las APIs REST (Representational State Transfer) juegan un papel crucial al permitir la comunicación entre diferentes sistemas. Estas APIs utilizan los métodos HTTP para realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los datos. En este documento, exploraremos los conceptos básicos de los métodos HTTP en las APIs REST, centrándonos en los métodos GET, POST, PUT, DELETE y PATCH.

## 1. GET: Recupera Datos del Servidor

El método GET es uno de los métodos HTTP más utilizados y su propósito principal es recuperar datos del servidor sin causar efectos secundarios. En el contexto de las APIs REST, GET se utiliza para solicitar la representación de un recurso específico, y es seguro y idempotente, lo que significa que múltiples solicitudes idénticas no deben causar ningún cambio en el estado del servidor.

### Ejemplo Básico de GET en JavaScript

Para ilustrar el uso del método GET, consideremos el siguiente ejemplo en JavaScript utilizando la API Fetch.

```jsx
fetch("<https://api.example.com/data>")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se realiza una solicitud GET a la URL `https://api.example.com/data`. La función `fetch` devuelve una promesa que se resuelve con la respuesta del servidor. Si la respuesta es correcta (`response.ok`), se convierte a formato JSON y se registra en la consola.

### Parámetros de Consulta

Los parámetros de consulta (query parameters) se utilizan para filtrar y especificar los datos que se desean recuperar.

```jsx
const queryParams = new URLSearchParams({
  search: "JavaScript",
  limit: 10,
});

fetch(`https://api.example.com/search?${queryParams}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se añaden parámetros de consulta (`search` y `limit`) a la URL para especificar los criterios de búsqueda y el número máximo de resultados.

### Encabezados de Solicitud

A veces es necesario incluir encabezados adicionales en las solicitudes GET, como autenticación o tipo de contenido.

```jsx
fetch("<https://api.example.com/data>", {
  method: "GET",
  headers: {
    Authorization: "Bearer token",
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se añaden encabezados para la autorización y el tipo de contenido.

## 2. POST: Envía Nuevos Datos al Servidor

El método POST se utiliza para enviar nuevos datos al servidor, típicamente para crear nuevos recursos. A diferencia de GET, POST no es idempotente, lo que significa que enviar la misma solicitud varias veces puede tener efectos diferentes, como crear múltiples recursos.

### Ejemplo Básico de POST en JavaScript

```jsx
const data = {
  name: "John Doe",
  email: "john.doe@example.com",
};

fetch("<https://api.example.com/users>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log("User created:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se envían datos JSON al servidor para crear un nuevo usuario. Los datos se envían en el cuerpo de la solicitud (`body`), y el tipo de contenido se especifica como `application/json`.

### Envío de Formularios

El método POST también se utiliza comúnmente para enviar datos de formularios.

```jsx
const formData = new FormData();
formData.append("username", "johndoe");
formData.append("password", "password123");

fetch("<https://api.example.com/login>", {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log("Login success:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se utiliza `FormData` para enviar datos de un formulario de inicio de sesión al servidor.

### Archivos

La carga de archivos también se realiza a menudo utilizando el método POST.

```jsx
const fileInput = document.querySelector('input[type="file"]');
const formData = new FormData();
formData.append("file", fileInput.files[0]);

fetch("<https://api.example.com/upload>", {
  method: "POST",
  body: formData,
})
  .then((response) => response.json())
  .then((data) => console.log("File uploaded:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se selecciona un archivo de un elemento de entrada de archivo y se envía al servidor utilizando `FormData`.

## 3. PUT: Actualiza Datos Existentes en el Servidor

El método PUT se utiliza para actualizar recursos existentes en el servidor. Es idempotente, lo que significa que realizar la misma solicitud varias veces tendrá el mismo efecto que realizarla una sola vez. Normalmente, PUT reemplaza completamente el recurso especificado con los datos proporcionados.

### Ejemplo Básico de PUT en JavaScript

```jsx
const data = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
};

fetch("<https://api.example.com/users/1>", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log("User updated:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se actualizan los datos del usuario con ID 1. Los nuevos datos se envían en el cuerpo de la solicitud, y se especifica el tipo de contenido como `application/json`.

### Comparación con PATCH

A diferencia de PATCH, PUT reemplaza completamente el recurso especificado. Si solo se desean realizar cambios parciales, PATCH es más apropiado.

## 4. DELETE: Elimina Datos del Servidor

El método DELETE se utiliza para eliminar recursos del servidor. Es idempotente, lo que significa que realizar la misma solicitud varias veces tendrá el mismo efecto que realizarla una sola vez.

### Ejemplo Básico de DELETE en JavaScript

```jsx
fetch("<https://api.example.com/users/1>", {
  method: "DELETE",
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("User deleted");
  })
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se elimina el usuario con ID 1. No se requiere un cuerpo de solicitud para DELETE.

### Manejo de Respuestas

Algunas APIs pueden devolver una respuesta con detalles adicionales sobre la eliminación.

```jsx
fetch("<https://api.example.com/users/1>", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log("User deleted:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se maneja la respuesta JSON que proporciona detalles adicionales sobre la eliminación del recurso.

## 5. PATCH: Aplica Actualizaciones Parciales a los Datos

El método PATCH se utiliza para aplicar actualizaciones parciales a un recurso. A diferencia de PUT, que reemplaza completamente el recurso, PATCH permite modificar solo los campos especificados.

### Ejemplo Básico de PATCH en JavaScript

```jsx
const data = {
  email: "jane.doe@newdomain.com",
};

fetch("<https://api.example.com/users/1>", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log("User partially updated:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, solo se actualiza el campo de correo electrónico del usuario con ID 1, manteniendo el resto de los datos intactos.

### Uso de JSON Patch

JSON Patch es un formato estándar para describir una serie de operaciones que deben aplicarse a un documento JSON.

```jsx
const patchData = [
  { op: "replace", path: "/email", value: "jane.doe@newdomain.com" },
];

fetch("<https://api.example.com/users/1>", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(patchData),
})
  .then((response) => response.json())
  .then((data) => console.log("User partially updated with JSON Patch:", data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se utiliza JSON Patch para actualizar el campo de correo electrónico.

## Conclusión

Comprender los métodos HTTP en las APIs REST es fundamental para cualquier desarrollador web. Cada método tiene un propósito específico y se utiliza para diferentes operaciones CRUD

. En este documento, hemos explorado en detalle los métodos GET, POST, PUT, DELETE y PATCH, proporcionando ejemplos prácticos de su implementación en JavaScript.

### Resumen de Métodos HTTP

1. **GET**: Utilizado para recuperar datos del servidor. Es seguro e idempotente.
2. **POST**: Utilizado para enviar nuevos datos al servidor. No es idempotente.
3. **PUT**: Utilizado para actualizar recursos existentes, reemplazándolos completamente. Es idempotente.
4. **DELETE**: Utilizado para eliminar recursos del servidor. Es idempotente.
5. **PATCH**: Utilizado para aplicar actualizaciones parciales a un recurso. No es idempotente pero permite modificaciones precisas.

### Prácticas Recomendadas

- **Seguridad**: Siempre proteger las API con mecanismos de autenticación y autorización adecuados.
- **Validación**: Validar los datos enviados al servidor para evitar inconsistencias y errores.
- **Documentación**: Documentar las APIs de manera clara y detallada para facilitar su uso por otros desarrolladores.

### Futuras Consideraciones

El campo del desarrollo web está en constante evolución. Tecnologías emergentes y nuevas prácticas pueden cambiar la manera en que interactuamos con las APIs. Mantenerse actualizado con las mejores prácticas y nuevas herramientas es crucial para el éxito continuo en el desarrollo de aplicaciones web.

Con este conocimiento, los desarrolladores están mejor equipados para crear y mantener APIs REST eficientes y efectivas, aprovechando todo el potencial de los métodos HTTP en JavaScript.
