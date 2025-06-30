# Operaciones asíncronas comunes (Ajax VS Fetch)

# Introducción

En el desarrollo web, la asincronía juega un papel fundamental al permitir que las aplicaciones web permanezcan receptivas y eficientes mientras realizan tareas que pueden llevar tiempo, como las solicitudes de red o la temporización. Las operaciones asincrónicas comunes en JavaScript incluyen el uso de AJAX/FETCH para hacer solicitudes HTTP asincrónicas y `setTimeout`/`setInterval` para manejar la temporización.

## 1. AJAX/FETCH

### AJAX: Una Introducción Histórica

AJAX, acrónimo de "Asynchronous JavaScript and XML," es una técnica que permite a las aplicaciones web enviar y recibir datos de un servidor de manera asíncrona sin recargar la página. Introducido a mediados de la década de 2000, AJAX revolucionó el desarrollo web al permitir una experiencia de usuario más dinámica y fluida.

AJAX utiliza el objeto `XMLHttpRequest` (XHR) para enviar solicitudes HTTP al servidor y manejar las respuestas. Aunque el nombre sugiere el uso de XML, AJAX puede manejar varios formatos de datos, incluyendo JSON, HTML y texto plano.

**Ejemplo básico de AJAX con `XMLHttpRequest`:**

```jsx
function hacerSolicitudAJAX() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "<https://api.example.com/datos>", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var datos = JSON.parse(xhr.responseText);
      console.log(datos);
    }
  };

  xhr.send();
}

hacerSolicitudAJAX();
```

En este ejemplo, el objeto `XMLHttpRequest` se utiliza para hacer una solicitud GET a una API. La propiedad `onreadystatechange` maneja los cambios de estado del objeto XHR, y cuando el estado es 4 (completado) y el estado HTTP es 200 (éxito), se procesa la respuesta.

### FETCH: La Evolución de AJAX

Aunque AJAX sigue siendo ampliamente utilizado, el método `fetch`, introducido en la especificación de Fetch API, ofrece una alternativa moderna y más fácil de usar para realizar solicitudes HTTP. `fetch` devuelve una promesa que se resuelve con la respuesta del servidor, proporcionando una interfaz más limpia y manejable para las operaciones asincrónicas.

**Sintaxis básica de `fetch`:**

```jsx
fetch(url, opciones)
  .then((respuesta) => respuesta.json())
  .then((datos) => console.log(datos))
  .catch((error) => console.error("Error:", error));
```

**Ejemplo básico de `fetch`:**

```jsx
function hacerSolicitudFetch() {
  fetch("<https://api.example.com/datos>")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("Error en la solicitud");
      }
      return respuesta.json();
    })
    .then((datos) => console.log(datos))
    .catch((error) => console.error("Error:", error));
}

hacerSolicitudFetch();
```

En este ejemplo, `fetch` se utiliza para hacer una solicitud GET a una API. La respuesta se convierte en JSON y se maneja con `.then()`. Si la solicitud falla, se lanza un error y se maneja con `.catch()`.

### Ventajas de `fetch` sobre `XMLHttpRequest`

1. **Sintaxis más simple y limpia**: `fetch` proporciona una sintaxis más concisa y moderna en comparación con `XMLHttpRequest`.
2. **Promesas**: `fetch` utiliza promesas, lo que permite un manejo más robusto y flexible de las operaciones asincrónicas.
3. **Configuración más flexible**: `fetch` permite una configuración más sencilla y directa de las solicitudes, incluyendo métodos HTTP, encabezados y cuerpos de solicitud.

### Ejemplo avanzado de `fetch`

Para ilustrar el uso avanzado de `fetch`, consideremos un ejemplo en el que se realiza una solicitud POST para enviar datos a una API:

```jsx
async function enviarDatosFetch() {
  const datos = {
    nombre: "Juan",
    edad: 30,
  };

  try {
    const respuesta = await fetch("<https://api.example.com/enviar>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!respuesta.ok) {
      throw new Error("Error en la solicitud");
    }

    const resultado = await respuesta.json();
    console.log("Datos enviados:", resultado);
  } catch (error) {
    console.error("Error:", error);
  }
}

enviarDatosFetch();
```

En este ejemplo, `fetch` se utiliza para enviar datos JSON a una API utilizando el método POST. La respuesta se maneja de manera asincrónica con `async` y `await`, proporcionando una estructura clara y manejable para la operación.

## 2. setTimeout / setInterval

### Temporización en JavaScript

La temporización es otra área crucial en la que JavaScript maneja operaciones asincrónicas. Las funciones `setTimeout` y `setInterval` permiten ejecutar código después de un retraso específico o en intervalos regulares, respectivamente.

### setTimeout

`setTimeout` se utiliza para ejecutar una función después de un retraso especificado en milisegundos. Esta función devuelve un identificador que puede utilizarse para cancelar la operación si es necesario.

**Sintaxis básica de `setTimeout`:**

```jsx
setTimeout(funcion, retraso, ...argumentos);
```

**Ejemplo básico de `setTimeout`:**

```jsx
function mostrarMensaje() {
  console.log("Hola después de 2 segundos");
}

setTimeout(mostrarMensaje, 2000);
```

En este ejemplo, la función `mostrarMensaje` se ejecutará después de un retraso de 2000 milisegundos (2 segundos).

### Cancelación de `setTimeout`

El identificador devuelto por `setTimeout` puede utilizarse para cancelar la operación utilizando la función `clearTimeout`.

**Ejemplo de cancelación de `setTimeout`:**

```jsx
const id = setTimeout(() => console.log("Esto no se verá"), 2000);
clearTimeout(id);
```

En este ejemplo, la función pasada a `setTimeout` nunca se ejecutará porque `clearTimeout` se llama antes de que transcurra el retraso.

### setInterval

`setInterval` se utiliza para ejecutar una función repetidamente en intervalos regulares especificados en milisegundos. Al igual que `setTimeout`, devuelve un identificador que puede utilizarse para detener la ejecución.

**Sintaxis básica de `setInterval`:**

```jsx
setInterval(funcion, intervalo, ...argumentos);
```

**Ejemplo básico de `setInterval`:**

```jsx
function mostrarHora() {
  console.log("Hora actual:", new Date().toLocaleTimeString());
}

setInterval(mostrarHora, 1000);
```

En este ejemplo, la función `mostrarHora` se ejecutará cada 1000 milisegundos (1 segundo), mostrando la hora actual.

### Cancelación de `setInterval`

El identificador devuelto por `setInterval` puede utilizarse para detener la repetición utilizando la función `clearInterval`.

**Ejemplo de cancelación de `setInterval`:**

```jsx
const id = setInterval(
  () => console.log("Esto se repetirá cada segundo"),
  1000
);

setTimeout(() => {
  clearInterval(id);
  console.log("Intervalo detenido");
}, 5000);
```

En este ejemplo, el intervalo se detendrá después de 5 segundos, utilizando `clearInterval` dentro de un `setTimeout`.

### Ejemplos Avanzados de setTimeout y setInterval

### setTimeout Recursivo

Un patrón avanzado es el uso recursivo de `setTimeout` para crear intervalos ajustables dinámicamente. Este enfoque ofrece más control sobre el tiempo entre ejecuciones y permite ajustar o detener la repetición en cualquier momento.

**Ejemplo de `setTimeout` recursivo:**

```jsx
function tareaRepetitiva() {
  console.log(
    "Tarea repetitiva ejecutada a las",
    new Date().toLocaleTimeString()
  );
  setTimeout(tareaRepetitiva, 2000);
}

setTimeout(tareaRepetitiva, 2000);
```

En este ejemplo, `tareaRepetitiva` se llama a sí misma utilizando `setTimeout`, creando un intervalo ajustable que ejecuta la tarea cada 2 segundos.

### Usando Promesas con `setTimeout`

Otra técnica avanzada es combinar `setTimeout` con promesas para manejar temporizaciones de manera más estructurada y aprovechar el manejo de promesas.

**Ejemplo de promesa con `setTimeout`:**

```jsx
function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function tareaAsincrona() {
  console.log("Inicio de la tarea");
  await esperar(3000);
  console.log("Fin de la tarea después de 3 segundos");
}

tareaAsincrona();
```

En este ejemplo, la función `esperar` devuelve una promesa que se resuelve después de un retraso especificado. La función `tareaAsincrona` utiliza `await` para esperar la resolución de la promesa antes de continuar, proporcionando una estructura clara y asincrónica para la temporización.

## Conclusión

La gestión de operaciones asincrónicas en JavaScript es fundamental para el desarrollo de aplicaciones web modernas y eficientes. Las solicitudes HTTP asincrónicas, gestionadas a través de AJAX y FETCH, permiten la comunicación con servidores sin bloquear la interfaz de usuario, mejorando la experiencia del usuario. Las funciones de temporización, `setTimeout` y ` setInterval`, proporcionan mecanismos flexibles para manejar retrasos y repeticiones de tareas. Entender y aplicar estas técnicas con destreza permite a los desarrolladores crear aplicaciones web que no solo son responsivas y fluidas, sino también robustas y escalables. Al combinar estas herramientas con estructuras más avanzadas como promesas y la sintaxis `async/await`, es posible escribir código que sea tanto eficiente como fácil de mantener, logrando así una armonía entre funcionalidad y rendimiento en el desarrollo web.
