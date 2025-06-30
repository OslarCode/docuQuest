# Asincronía

# Introducción a al asincronía con JavaScript

La asincronía en JavaScript permite ejecutar tareas sin bloquear el flujo principal del programa, lo que es esencial para manejar operaciones como peticiones a servidores, lectura de archivos o temporizadores. Gracias a mecanismos como callbacks, promesas y `async/await`, JavaScript puede responder a eventos o procesar datos externos sin detener la interacción del usuario con la página. Esta capacidad hace que las aplicaciones web sean más rápidas, reactivas y eficientes.

Kyle Simpson, autor de la serie _You Don’t Know JS_, destaca que “la asincronía no trata de velocidad, sino de eficiencia”, subrayando que JavaScript, aunque de un solo hilo, puede hacer múltiples cosas sin esperar a que cada una termine. Comprender bien la asincronía es clave para dominar JavaScript moderno y construir experiencias web fluidas y profesionales.

## 1. **Conceptos Básicos**

- **Asincronía**: La capacidad de ejecutar operaciones sin bloquear el hilo principal. Permite que otras tareas continúen ejecutándose mientras se espera que una operación se complete.
- **Event Loop (Bucle de Eventos)**: El mecanismo que permite a JavaScript realizar operaciones asincrónicas. Se encarga de manejar la pila de llamadas, la cola de tareas y la cola de microtareas.

Aquí tienes un **ejemplo real y básico** de asincronía en JavaScript usando `fetch()` para obtener datos de una API pública.

```jsx
// Definimos una función asincrónica para obtener datos de una API
async function obtenerUsuario() {
  try {
    // Mostramos un mensaje antes de iniciar la petición
    console.log("Obteniendo datos del usuario...");

    // Usamos fetch() para hacer una petición HTTP GET a una API pública
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    // Convertimos la respuesta en formato JSON
    const usuario = await respuesta.json();

    // Mostramos los datos obtenidos
    console.log("Datos del usuario recibidos:");
    console.log(usuario);
  } catch (error) {
    // Capturamos errores de red o fallos en la petición
    console.error("Error al obtener los datos:", error);
  }
}

// Llamamos a la función (esto dispara la ejecución asincrónica)
obtenerUsuario();
```

### ¿Qué hace este ejemplo?

- Simula una situación real: obtener los datos de un usuario desde una API REST.
- Usa `async/await` para escribir código asincrónico de forma clara y legible.
- Maneja errores correctamente con `try...catch`.
- Muestra cómo interactuar con un servicio externo sin bloquear la ejecución del resto de la aplicación.

Este tipo de lógica es la base de casi cualquier aplicación web moderna que se comunica con un servidor.

## 2. **Funciones de Callback**

Un **callback** en JavaScript es simplemente una **función que se pasa como argumento a otra función** para que se ejecute **más tarde**, normalmente **cuando algo ha terminado**.

Piensa en esto como cuando haces un pedido en una cafetería: das tu orden (función principal) y dejas tu nombre (el callback). Cuando tu café está listo, te llaman por tu nombre para dártelo. El **callback es la función que se llama al final del proceso**, cuando ya todo está listo.

En código, sería algo así:

```jsx
function pedirCafe(callback) {
  console.log("Preparando café...");

  setTimeout(() => {
    console.log("Café listo.");
    callback(); // Llamamos a la función que pasamos como argumento
  }, 2000);
}

function avisar() {
  console.log("¡Ven a recoger tu café!");
}

pedirCafe(avisar);
```

Aquí, `avisar` es el **callback**, y se ejecuta **solo después de que el café esté listo**. Así de simple.

Aquí tienes otro **ejemplo real de una función callback** en JavaScript.

```jsx
// Definimos una función que simula una operación que tarda en completarse (por ejemplo, procesar datos)
function procesarDatos(nombre, callback) {
  console.log("Procesando datos...");

  // Simulamos un retardo con setTimeout (espera de 2 segundos)
  setTimeout(() => {
    // Mostramos que el procesamiento ha finalizado
    console.log(`Datos procesados para: ${nombre}`);

    // Llamamos a la función callback que se pasó como argumento
    callback(nombre);
  }, 2000); // 2000 milisegundos = 2 segundos
}

// Definimos una función que será usada como callback
function saludar(nombre) {
  console.log(`Hola, ${nombre}. Bienvenido a la aplicación.`);
}

// Llamamos a procesarDatos y le pasamos 'Carlos' y la función saludar como callback
procesarDatos("Carlos", saludar);
```

### ¿Qué hace este ejemplo?

- La función `procesarDatos` simula una tarea que toma tiempo (como una operación de red o cálculo pesado).
- Una vez completada, llama a la función `callback`, que en este caso es `saludar`.
- `setTimeout` representa la parte asincrónica: tras un retraso de 2 segundos, se ejecuta el bloque interno.
- El callback permite decidir **qué hacer después** del proceso, sin necesidad de esperar o bloquear el flujo del programa.

Este patrón de callbacks es muy común en JavaScript, especialmente antes del uso extendido de Promesas y `async/await`. Aún hoy se usa en bibliotecas, eventos y APIs clásicas del navegador.

## 3. **Promesas**

Una **promesa** en JavaScript es un **objeto que representa una tarea que se va a completar en el futuro**, ya sea con éxito (**resuelta**) o con error (**rechazada**). Es una forma moderna de trabajar con código asincrónico, más clara y manejable que los antiguos callbacks.

### 🧠 Explicación sencilla:

Imagina que haces un pedido por Internet. La tienda te dice:

_"Te prometo que te lo entregaré, o te avisaré si hay un problema."_

Esa **promesa** puede:

- cumplirse (te entregan el pedido)
- fallar (hay un problema con el envío)

Lo mismo hace JavaScript con `Promise`.

### ✅ Ejemplo de Promesa:

```jsx
// Creamos una función que devuelve una promesa
function pedirProducto() {
  return new Promise((resolve, reject) => {
    console.log("Realizando pedido...");

    // Simulamos que tarda 2 segundos en completarse
    setTimeout(() => {
      const productoDisponible = true; // Simulamos que todo va bien

      if (productoDisponible) {
        resolve("Producto entregado con éxito.");
      } else {
        reject("El producto no está disponible.");
      }
    }, 2000);
  });
}

// Usamos la promesa
pedirProducto()
  .then((mensaje) => {
    // Esto se ejecuta si la promesa se cumple (resolve)
    console.log("Éxito:", mensaje);
  })
  .catch((error) => {
    // Esto se ejecuta si la promesa falla (reject)
    console.error("Error:", error);
  });
```

### ¿Qué hace este ejemplo?

1. La función `pedirProducto` devuelve una **nueva promesa**.
2. Dentro, se simula un retraso de 2 segundos con `setTimeout`.
3. Si `productoDisponible` es `true`, se llama a `resolve()` y la promesa se considera **resuelta con éxito**.
4. Si fuera `false`, se llama a `reject()` y la promesa se **rechaza** con error.
5. Luego, con `.then()` manejamos el caso exitoso, y con `.catch()` el caso de error.

Así funcionan las promesas: **esperan que algo ocurra, y luego ejecutan el código correspondiente dependiendo del resultado**.

Una **promesa en JavaScript** puede estar en uno de **tres estados**:

1. `pending` (pendiente): la promesa está en curso, todavía no ha terminado.
2. `fulfilled` (cumplida): la operación se completó con éxito.
3. `rejected` (rechazada): ocurrió un error o algo falló.

### 🧪 Ejemplo para ver los tres estados:

```jsx
// Creamos una función que devuelve una promesa
function verificarEstadoPromesa(estadoSimulado) {
  return new Promise((resolve, reject) => {
    console.log("⏳ Estado: pending (pendiente)...");

    // Simulamos una espera de 2 segundos
    setTimeout(() => {
      if (estadoSimulado === "exito") {
        resolve("✅ Estado: fulfilled (cumplida). Operación exitosa.");
      } else {
        reject("❌ Estado: rejected (rechazada). Ocurrió un error.");
      }
    }, 2000);
  });
}

// Ejemplo 1: promesa cumplida
verificarEstadoPromesa("exito")
  .then((resultado) => {
    // Si la promesa se cumple, se ejecuta esto
    console.log(resultado);
  })
  .catch((error) => {
    // Si la promesa se rechaza, se ejecuta esto
    console.error(error);
  });

// Ejemplo 2: promesa rechazada
verificarEstadoPromesa("error")
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.error(error);
  });
```

### 🧠 Resumen del comportamiento:

- Al ejecutarse, cada promesa entra primero en **estado `pending`**.
- Si todo va bien (`resolve`), cambia a **`fulfilled`** y se ejecuta `.then()`.
- Si algo falla (`reject`), cambia a **`rejected`** y se ejecuta `.catch()`.

Con esto puedes **controlar el flujo de tareas asincrónicas** de forma ordenada y profesional.

Las **promesas** en JavaScript tienen **tres métodos principales** que se usan para manejar su resultado o estado:

### ✅ Métodos principales de una promesa:

1. **`.then()`** – se ejecuta cuando la promesa se **cumple** (`fulfilled`)
2. **`.catch()`** – se ejecuta cuando la promesa **falla** (`rejected`)
3. **`.finally()`** – se ejecuta **siempre**, haya éxito o error (ideal para limpiar o cerrar procesos)

### 🧪 Ejemplo real:

```jsx
// Creamos una función que devuelve una promesa
function simularDescargaArchivo(estadoSimulado) {
  return new Promise((resolve, reject) => {
    console.log("🚀 Iniciando descarga...");

    setTimeout(() => {
      if (estadoSimulado === "ok") {
        resolve("✅ Archivo descargado correctamente.");
      } else {
        reject("❌ Error al descargar el archivo.");
      }
    }, 2000);
  });
}

// Usamos la promesa con sus métodos principales
simularDescargaArchivo("ok") // Cambia a "error" para probar el catch()
  .then((mensaje) => {
    // Se ejecuta si la promesa se resuelve bien
    console.log("THEN:", mensaje);
  })
  .catch((error) => {
    // Se ejecuta si la promesa falla
    console.error("CATCH:", error);
  })
  .finally(() => {
    // Se ejecuta siempre, haya éxito o fallo
    console.log("FINALLY: Descarga finalizada (éxito o error).");
  });
```

### 🔍 ¿Qué hace cada método?

- `.then()` recibe el resultado del `resolve()` y ejecuta su función.
- `.catch()` recibe el error del `reject()` y lo maneja.
- `.finally()` no recibe datos, **solo se ejecuta al final** pase lo que pase, útil para mostrar un loader, cerrar procesos, etc.

Este patrón es fundamental para construir aplicaciones robustas, ya que te permite **controlar el flujo asincrónico** de forma limpia y predecible.

### 🧠 ¿Qué es `async` / `await`?

- `*async**` convierte una función normal en una **función asincrónica** que **siempre devuelve una promesa**.
- `*await**` se usa **dentro** de funciones `async` para **esperar** el resultado de una promesa **sin bloquear** el resto del código.

🧾 Es como decir:

> “Espera aquí hasta que esta tarea termine, y luego continúa.”

### ✅ Ejemplo real y comentado paso a paso

```jsx
// Definimos una función asincrónica
async function obtenerClima() {
  try {
    // Mostramos un mensaje antes de hacer la petición
    console.log("🌤 Obteniendo datos del clima...");

    // Usamos 'await' para esperar a que termine la promesa de fetch
    const respuesta = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.4&longitude=-3.7&current_weather=true"
    );

    // Esperamos la conversión de la respuesta a JSON
    const datos = await respuesta.json();

    // Mostramos la temperatura actual
    console.log(
      `📡 Temperatura actual: ${datos.current_weather.temperature}°C`
    );
  } catch (error) {
    // Si algo falla, mostramos el error
    console.error("⚠️ Error al obtener el clima:", error);
  }
}

// Llamamos a la función (esto dispara el proceso asincrónico)
obtenerClima();
```

### 🔍 ¿Qué ocurre aquí?

1. `async function obtenerClima()` define una función asincrónica.
2. `await fetch(...)` **espera** la respuesta sin bloquear el navegador.
3. Luego `await respuesta.json()` espera a que se convierta a objeto.
4. Todo esto está dentro de un `try...catch` para manejar errores fácilmente.

### ✅ ¿Por qué usar `async/await`?

- Es **más legible** y natural que usar `.then()` y `.catch()`.
- Puedes escribir código asincrónico como si fuera **secuencial**.
- Es ideal para tareas complejas que dependen de varias promesas.

Con `async/await`, trabajar con datos externos o tareas que tardan (como APIs, timers, lecturas de archivos...) se vuelve mucho más **fácil, claro y mantenible**.

## **Manejo de Errores**

Con `async/await`, la **forma correcta y clara de manejar errores** es usar un bloque `**try...catch**`. Así puedes **atrapar cualquier error** que ocurra durante la ejecución asincrónica, ya sea al hacer `fetch()`, convertir a JSON o cualquier otra promesa que falle.

### 🧪 Ejemplo real con manejo de errores usando `try...catch` :

```jsx
// Función asincrónica para obtener información de una API
async function obtenerUsuario() {
  try {
    // Mostramos un mensaje indicando que empieza el proceso
    console.log("📡 Consultando usuario...");

    // Simulamos una URL errónea (puedes cambiarla por una válida para probar)
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/usuarios/1"
    );

    // Si la respuesta no es OK (por ejemplo, 404), lanzamos un error personalizado
    if (!respuesta.ok) {
      throw new Error(`⚠️ Error HTTP: ${respuesta.status}`);
    }

    // Esperamos a convertir la respuesta en JSON
    const datos = await respuesta.json();

    // Mostramos los datos recibidos
    console.log("👤 Usuario recibido:", datos);
  } catch (error) {
    // Capturamos cualquier error de red, JSON o error manual lanzado
    console.error("❌ Ha ocurrido un error:", error.message);
  } finally {
    // Esto se ejecuta siempre, haya error o no
    console.log("🔚 Proceso completado.");
  }
}

// Llamamos a la función
obtenerUsuario();
```

### 🔍 ¿Qué está pasando aquí?

1. **`try`**: Aquí colocamos todo el código que **puede fallar**.
2. **`fetch()`**: Si falla la conexión o la URL está mal, va directo al `catch`.
3. **`respuesta.ok`**: Si el estado HTTP no es 200–299, **lanzamos un error manual**.
4. **`catch`**: Captura y muestra cualquier error que haya ocurrido.
5. **`finally`**: Siempre se ejecuta, perfecto para mostrar mensajes finales, cerrar loaders, etc.

### ✅ ¿Por qué es útil esto?

- Puedes **detectar y mostrar errores amigables** al usuario.
- Evitas que tu aplicación **se detenga** o se rompa.
- Te permite controlar cada paso de forma **limpia y profesional**.

Con `try...catch`, `async/await` se vuelve una herramienta **poderosa y segura** para manejar tareas asincrónicas reales.

## **Herramientas y Recursos**

- **Documentación**: Consulta la documentación oficial de MDN Web Docs sobre [promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise), [async/await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function), y [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API).
- **Playgrounds**: Usa entornos de desarrollo interactivos como CodePen, JSFiddle o [repl.it](http://repl.it/) para experimentar.

## Índice de contenidos

---
