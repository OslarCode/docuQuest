# Async/Await

# Async/Await en las APIs REST de JavaScript para Páginas Web

## Introducción

La introducción de `async` y `await` en ECMAScript 2017 ha transformado la manera en que los desarrolladores manejan operaciones asíncronas en JavaScript. Esta técnica proporciona una forma más intuitiva y legible de trabajar con promesas, especialmente en el contexto de las APIs REST.

## ¿Qué es Async/Await y cómo funciona?

### Definición de Async/Await

`async` y `await` son palabras clave en JavaScript que permiten escribir código asíncrono de manera que se asemeja a código síncrono, mejorando la legibilidad y la gestión de las promesas. Una función declarada con `async` devuelve una promesa implícitamente, y dentro de esta función, `await` se puede utilizar para pausar la ejecución hasta que una promesa se resuelva o se rechace.

### Ejemplo Básico de Async/Await

```jsx
async function fetchData() {
  const response = await fetch("<https://api.example.com/data>");
  const data = await response.json();
  console.log(data);
}

fetchData();
```

En este ejemplo:

- `async function fetchData()`: Define una función asíncrona.
- `await fetch('<https://api.example.com/data>')`: Pausa la ejecución hasta que la promesa devuelta por `fetch` se resuelva.
- `await response.json()`: Pausa la ejecución hasta que la promesa devuelta por `response.json()` se resuelva, permitiendo obtener y procesar los datos de la respuesta.

### Funcionamiento Interno

1. **Declaración de Funciones Asíncronas**: Cuando una función se declara con `async`, se garantiza que esta función devolverá una promesa. Si la función devuelve un valor, éste se envuelve automáticamente en una promesa resuelta.

   ```jsx
   async function example() {
     return "Hello, World!";
   }

   example().then(console.log); // Output: Hello, World!
   ```

2. **Uso de Await**: Dentro de una función asíncrona, `await` se utiliza para esperar a que una promesa se resuelva. Esto pausa la ejecución de la función hasta que la promesa se resuelva y retorna el resultado de la promesa. Si la promesa es rechazada, se lanza una excepción que puede ser manejada con un bloque `try/catch`.

   ```jsx
   async function example() {
     try {
       const result = await someAsyncFunction();
       console.log(result);
     } catch (error) {
       console.error(error);
     }
   }
   ```

3. **Manejo de Errores**: Las funciones asíncronas pueden manejar errores utilizando bloques `try/catch`, lo que simplifica la gestión de errores en comparación con el manejo tradicional de promesas.

   ```jsx
   async function example() {
     try {
       const response = await fetch("<https://api.example.com/data>");
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       const data = await response.json();
       console.log(data);
     } catch (error) {
       console.error("Fetch error:", error);
     }
   }
   ```

## La Forma Más Sencilla de Trabajar con Promesas y Solicitudes Asíncronas

### Comparación entre Promesas y Async/Await

Antes de la introducción de `async` y `await`, las promesas eran la principal forma de manejar operaciones asíncronas en JavaScript. Aunque las promesas mejoraron la gestión de callbacks anidados (el conocido "callback hell"), `async` y `await` ofrecen una sintaxis más limpia y directa.

### Ejemplo con Promesas

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
    console.error("Fetch error:", error);
  }
}

fetchData();
```

### Ventajas de Async/Await

1. **Legibilidad**: El código escrito con `async` y `await` se asemeja más al código síncrono, lo que facilita la lectura y el mantenimiento.
2. **Manejo de Errores**: Utilizar bloques `try/catch` para manejar errores es más intuitivo y limpio en comparación con el uso de `.catch` en las promesas.
3. **Depuración**: La depuración de código asíncrono es más sencilla con `async` y `await`, ya que las herramientas de desarrollo pueden trazar el flujo de ejecución de manera más clara.

### Implementación de Solicitudes Asíncronas con Fetch API

La Fetch API es una herramienta poderosa para realizar solicitudes HTTP. Combinada con `async` y `await`, se convierte en una opción ideal para interactuar con APIs REST de manera eficiente y legible.

### Solicitud GET

Una solicitud GET se utiliza para obtener datos de un servidor.

```jsx
async function getData() {
  try {
    const response = await fetch("<https://api.example.com/data>");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getData();
```

### Solicitud POST

Una solicitud POST se utiliza para enviar datos al servidor, típicamente para crear un nuevo recurso.

```jsx
async function postData(url = "", data = {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

postData("<https://api.example.com/data>", { answer: 42 });
```

### Manejo de Errores con Async/Await

El manejo de errores es crucial en cualquier aplicación web para asegurar una experiencia de usuario robusta y resiliente.

### Ejemplo de Manejo de Errores

```jsx
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
  }
}

async function main() {
  try {
    const data = await fetchData("<https://api.example.com/data>");
    console.log("Data fetched successfully:", data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

main();
```

### Uso de Async/Await en Ciclos y Funciones Concurrentes

Una de las características poderosas de `async` y `await` es su capacidad para manejar múltiples operaciones asíncronas de manera secuencial o concurrente.

### Ejemplo de Ciclo con Async/Await

```jsx
async function fetchMultipleUrls(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data from", url, ":", error);
    }
  }
}

const urls = [
  "<https://api.example.com/data1>",
  "<https://api.example.com/data2>",
  "<https://api.example.com/data3>",
];

fetchMultipleUrls(urls);
```

### Ejemplo de Funciones Concurrentes

```jsx
async function fetchConcurrently(urls) {
  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
  );

  try {
    const results = await Promise.all(fetchPromises);
    console.log("All data fetched:", results);
  } catch (error) {
    console.error("Error fetching one or more URLs:", error);
  }
}

const urls = [
  "<https://api.example.com/data1>",
  "<https://api.example.com/data2>",
  "<https://api.example.com/data3>",
];

fetchConcurrently(urls);
```

En este ejemplo, `Promise.all` se utiliza para ejecutar

múltiples solicitudes en paralelo, y `await` se utiliza para esperar a que todas las promesas se resuelvan.

## Aplicaciones Avanzadas de Async/Await

### Ejecución Condicional y Reintentos

A veces es necesario realizar solicitudes condicionalmente o reintentar solicitudes fallidas. Esto se puede lograr fácilmente con `async` y `await`.

### Ejemplo de Reintentos

```jsx
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying... (${i + 1})`);
      } else {
        console.error("Max retries reached. Failed to fetch data.");
        throw error;
      }
    }
  }
}

fetchWithRetry("<https://api.example.com/data>")
  .then((data) => console.log("Data fetched successfully:", data))
  .catch((error) => console.error("Failed to fetch data:", error));
```

En este ejemplo, se intenta realizar la solicitud hasta un máximo de `retries` veces antes de rendirse y lanzar el error.

### Async/Await con WebSockets

Además de HTTP, `async` y `await` también pueden ser útiles cuando se trabaja con WebSockets para manejar comunicación en tiempo real.

### Ejemplo de WebSocket

```jsx
async function connectWebSocket(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      resolve(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      reject(error);
    };
  });
}

async function main() {
  try {
    const ws = await connectWebSocket("wss://example.com/socket");
    ws.onmessage = (message) => {
      console.log("Received message:", message.data);
    };
    // Send a message
    ws.send("Hello WebSocket");
  } catch (error) {
    console.error("Failed to connect to WebSocket:", error);
  }
}

main();
```

En este ejemplo, `connectWebSocket` devuelve una promesa que se resuelve cuando el WebSocket se conecta exitosamente, y se rechaza si ocurre un error.

## Conclusión

El uso de `async` y `await` ha revolucionado la manera en que los desarrolladores de JavaScript manejan operaciones asíncronas, especialmente en el contexto de las APIs REST. Estas herramientas permiten escribir código más limpio, legible y fácil de mantener. La capacidad de manejar errores de manera intuitiva, ejecutar operaciones en paralelo y reintentar solicitudes fallidas hace que `async` y `await` sean indispensables para el desarrollo web moderno.

En este documento, hemos explorado en profundidad qué son `async` y `await`, cómo funcionan y cómo se pueden utilizar para simplificar el trabajo con promesas y solicitudes asíncronas en aplicaciones web. También hemos cubierto aplicaciones avanzadas, incluyendo la gestión de errores, la ejecución concurrente y el uso de WebSockets.

Con una comprensión sólida de `async` y `await`, los desarrolladores pueden crear aplicaciones web más robustas y eficientes, mejorando significativamente la experiencia del usuario final.
