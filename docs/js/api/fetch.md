# Fetch API

# Fetch API en las APIs REST de JavaScript para Páginas Web

## Introducción

Para facilitar esta interacción, JavaScript ofrece diversas herramientas, entre las cuales la Fetch API se destaca por su simplicidad y flexibilidad.

## ¿Qué es la Fetch API y cómo funciona?

### Definición y Propósito

La Fetch API es una interfaz moderna proporcionada por JavaScript para realizar solicitudes HTTP asíncronas. Fue introducida como una mejora y eventual reemplazo de la interfaz XMLHttpRequest (XHR), ofreciendo una manera más sencilla y poderosa de interactuar con recursos remotos a través de una red. La Fetch API es una promesa que facilita la gestión de respuestas asincrónicas, haciendo el código más limpio y manejable.

### Funcionamiento Básico

La Fetch API opera mediante el uso de Promesas, una característica central de JavaScript para manejar operaciones asíncronas. Cuando se realiza una solicitud con Fetch, se devuelve una Promesa que se resuelve con la respuesta una vez que el servidor ha procesado la solicitud. Esta respuesta puede ser manejada y procesada de acuerdo con las necesidades de la aplicación.

### Ventajas de la Fetch API

1. **Simplicidad y Legibilidad**: La Fetch API utiliza Promesas, lo que hace que el código sea más legible y menos propenso a errores en comparación con el enfoque de callback de XMLHttpRequest.
2. **Compatibilidad con Modern JavaScript**: Se integra perfectamente con las características modernas de JavaScript como async/await.
3. **Mayor Control y Flexibilidad**: Proporciona una manera más flexible y controlada de manejar solicitudes y respuestas HTTP.

## Sintaxis Básica de la Fetch API

### Realizar una Solicitud GET

Una solicitud GET es la forma más básica de interactuar con una API REST, utilizada para recuperar datos del servidor.

### Ejemplo Básico

```jsx
fetch("<https://api.example.com/data>")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error("There was a problem with your fetch operation:", error)
  );
```

En este ejemplo:

- `fetch('<https://api.example.com/data>')`: Realiza una solicitud GET a la URL especificada.
- `response.ok`: Verifica si la respuesta fue exitosa (código de estado 200-299).
- `response.json()`: Convierte la respuesta en un objeto JSON.
- `then(data => console.log(data))`: Maneja los datos de la respuesta.
- `catch(error => console.error('There was a problem with your fetch operation:', error))`: Maneja cualquier error que ocurra durante la solicitud.

### Realizar una Solicitud POST

Las solicitudes POST se utilizan para enviar datos al servidor, a menudo para crear nuevos recursos.

### Ejemplo Básico

```jsx
const data = { username: "example", password: "password123" };

fetch("<https://api.example.com/login>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error("There was a problem with your fetch operation:", error)
  );
```

En este ejemplo:

- `method: 'POST'`: Especifica que la solicitud es de tipo POST.
- `headers: {'Content-Type': 'application/json'}`: Define que los datos enviados están en formato JSON.
- `body: JSON.stringify(data)`: Convierte el objeto `data` a una cadena JSON para enviarla en el cuerpo de la solicitud.

### Manejo de Errores

El manejo de errores es esencial para garantizar que la aplicación pueda responder adecuadamente a fallos en la red o problemas con el servidor.

### Ejemplo de Manejo de Errores

```jsx
fetch("<https://api.example.com/data>")
  .then((response) => {
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        throw new Error("Client error");
      } else if (response.status >= 500) {
        throw new Error("Server error");
      }
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo, se verifican diferentes rangos de códigos de estado para distinguir entre errores del cliente (4xx) y del servidor (5xx), proporcionando mensajes de error específicos.

### Solicitudes con Autenticación

Muchas APIs requieren autenticación para acceder a recursos protegidos. Esto a menudo se maneja mediante tokens de autorización.

### Ejemplo con Token de Autorización

```jsx
const token = "your-access-token";

fetch("<https://api.example.com/protected-data>", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unauthorized");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo:

- `headers: {'Authorization':` Bearer ${token}`}`: Incluye el token de autorización en el header de la solicitud.

### Uso de Async/Await

La Fetch API se integra bien con la sintaxis de `async/await`, lo que permite un estilo de programación asíncrono más limpio y legible.

### Ejemplo con Async/Await

```jsx
async function fetchData() {
  try {
    const response = await fetch("<https://api.example.com/data>");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}

fetchData();
```

En este ejemplo:

- `await fetch('<https://api.example.com/data>')`: Espera a que la solicitud se complete.
- `await response.json()`: Espera a que la conversión a JSON se complete.
- El manejo de errores se realiza con un bloque `try/catch`.

### Manipulación de Headers

Los headers HTTP son cruciales para la configuración de solicitudes y respuestas. Pueden incluir información sobre el tipo de contenido, la autenticación y más.

### Ejemplo de Manipulación de Headers

```jsx
const headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "Bearer your-access-token");

fetch("<https://api.example.com/data>", { headers: headers })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error("There was a problem with your fetch operation:", error)
  );
```

En este ejemplo:

- `new Headers()`: Crea un nuevo objeto Headers.
- `headers.append('Content-Type', 'application/json')`: Añade un header de tipo de contenido.
- `headers.append('Authorization', 'Bearer your-access-token')`: Añade un header de autorización.

## Aplicaciones Avanzadas de la Fetch API

### Subir Archivos

La Fetch API también puede manejar la subida de archivos utilizando objetos `FormData`.

### Ejemplo de Subida de Archivos

```jsx
const formData = new FormData();
formData.append("file", fileInput.files[0]);

fetch("<https://api.example.com/upload>", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) =>
    console.error("There was a problem with your fetch operation:", error)
  );
```

En este ejemplo:

- `new FormData()`: Crea un nuevo objeto FormData.
- `formData.append('file', fileInput.files[0])`: Añade el archivo al FormData.
- `body: formData`: Envía el FormData en el cuerpo de la solicitud.

### Descargar Archivos

La Fetch API puede utilizarse para descargar archivos, manipulando blobs (Binary Large Objects).

### Ejemplo de Descarga de Archivos

```jsx
fetch("<https://api.example.com/file>")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.blob();
  })
  .then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "filename.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  })
  .catch((error) =>
    console.error("There was a problem with your fetch operation:", error)
  );
```

En este ejemplo:

- `response.blob()`: Convierte la respuesta en un blob.
- `window.URL.createObjectURL(blob)`: Crea una URL para el

blob.

- `a.download = 'filename.txt'`: Especifica el nombre del archivo a descargar.

### Gestión de Tiempo de Espera (Timeout)

La Fetch API no tiene una función de timeout nativa, pero se puede implementar utilizando Promesas y `AbortController`.

### Ejemplo con Timeout

```jsx
const controller = new AbortController();
const signal = controller.signal;

const fetchWithTimeout = (url, options, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out"));
    }, timeout);

    fetch(url, { ...options, signal })
      .then((response) => resolve(response))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timer));
  });
};

fetchWithTimeout("<https://api.example.com/data>", {}, 3000)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Fetch error:", error));
```

En este ejemplo:

- `AbortController()`: Crea un nuevo controlador para abortar la solicitud.
- `setTimeout(() => { controller.abort(); }, timeout)`: Aborta la solicitud después de un tiempo determinado.

## Conclusión

La Fetch API es una herramienta poderosa y versátil para interactuar con APIs REST en aplicaciones web. Su simplicidad y compatibilidad con características modernas de JavaScript la convierten en una opción preferida sobre la antigua interfaz XMLHttpRequest. Con un conocimiento sólido de su funcionamiento, sintaxis y aplicaciones avanzadas, los desarrolladores pueden aprovechar al máximo la Fetch API para construir aplicaciones web robustas y eficientes.

En este documento, hemos cubierto los fundamentos de la Fetch API, incluyendo su definición, propósito y funcionamiento básico. Hemos explorado la sintaxis básica para realizar solicitudes GET y POST, manejar errores, autenticación y cómo utilizar async/await para mejorar la legibilidad del código. También hemos visto aplicaciones avanzadas como la subida y descarga de archivos, así como la gestión de tiempos de espera.

Este conocimiento es esencial para cualquier desarrollador web moderno que trabaje con APIs REST, proporcionando una base sólida para crear aplicaciones web dinámicas y receptivas.
