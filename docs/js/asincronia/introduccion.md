# Introducción

# Introducción

JavaScript es un lenguaje que se ejecuta en el navegador y destaca por su capacidad para manejar operaciones asincrónicas sin bloquear el hilo principal. Esto permite que las aplicaciones web sigan siendo fluidas y reactivas incluso cuando realizan tareas que toman tiempo, como solicitudes a servidores o lectura de archivos.

La asincronía en JavaScript se gestiona mediante tres mecanismos principales:

- **Callbacks**, funciones que se ejecutan tras completar una tarea, pero que pueden complicar el código (problema conocido como _callback hell_).
- **Promesas**, que ofrecen una forma más estructurada de manejar tareas asincrónicas y sus posibles resultados (éxito o error).
- **Async/Await**, que permite escribir código asincrónico de forma legible y parecida al código tradicional, facilitando el manejo y comprensión del flujo del programa.

### Ejemplo de Asincronía en JavaScript

Aquí tienes un **ejemplo real** de asincronía en JavaScript: vamos a **leer un archivo local usando la API `FileReader`**, que funciona de forma asincrónica. Este es un caso muy común en aplicaciones web que permiten al usuario subir o previsualizar archivos.

### 📁 Ejemplo: Leer el contenido de un archivo de texto (.txt) seleccionado por el usuario

```html
<!-- HTML: Input para seleccionar un archivo -->
<input type="file" id="archivo" accept=".txt" />
<pre id="resultado"></pre>

<script>
  // Esperamos a que el DOM esté cargado
  document.addEventListener("DOMContentLoaded", () => {
    // Obtenemos las referencias a los elementos del DOM
    const inputArchivo = document.getElementById("archivo");
    const salida = document.getElementById("resultado");

    // Evento que se dispara cuando el usuario selecciona un archivo
    inputArchivo.addEventListener("change", () => {
      const archivo = inputArchivo.files[0]; // Obtenemos el primer archivo

      if (!archivo) {
        salida.textContent = "❌ No se seleccionó ningún archivo.";
        return;
      }

      // Creamos una nueva instancia de FileReader
      const lector = new FileReader();

      // Evento asincrónico: se dispara cuando termina de leer el archivo
      lector.onload = () => {
        // Mostramos el contenido del archivo en la página
        salida.textContent = `📄 Contenido del archivo:\n\n${lector.result}`;
      };

      // Evento de error, por si algo falla durante la lectura
      lector.onerror = () => {
        salida.textContent = "❌ Error al leer el archivo.";
      };

      // Iniciamos la lectura del archivo como texto (esto es asincrónico)
      lector.readAsText(archivo);

      // Este mensaje se muestra inmediatamente (sin esperar a que termine la lectura)
      console.log("⏳ Leyendo archivo...");
    });
  });
</script>
```

### 🔍 ¿Qué pasa aquí?

1. El usuario selecciona un archivo `.txt` desde su dispositivo.
2. Se dispara el evento `change`, y usamos `FileReader` para leer el contenido.
3. El método `readAsText()` **empieza la lectura de forma asincrónica**.
4. Cuando termina, el evento `onload` se ejecuta y muestra el contenido.
5. Si ocurre un error, se captura con `onerror`.

### ✅ ¿Por qué es asincrónico?

Porque leer archivos puede tardar, y **no queremos congelar la interfaz** mientras eso ocurre. Gracias a la asincronía, el navegador puede seguir funcionando mientras la lectura se realiza en segundo plano.

Este ejemplo real muestra cómo JavaScript maneja asincronía **más allá de redes o `fetch()`**, usando eventos y APIs del navegador.

## Ventajas y desafíos de la Asincronía

La asincronía en JavaScript ofrece ventajas clave como una **interfaz de usuario más fluida**, **manejo eficiente de operaciones I/O** y **mayor escalabilidad** en aplicaciones, especialmente en entornos como Node.js. Al permitir que tareas se ejecuten en segundo plano, evita que el hilo principal se bloquee, mejorando la experiencia del usuario y el rendimiento del sistema.

Sin embargo, también implica desafíos: el **manejo de errores** puede ser más complejo, la estructura del código puede volverse difícil de mantener (especialmente con callbacks), y pueden surgir **condiciones de carrera** si no se controlan correctamente los tiempos de ejecución. Aunque herramientas modernas como promesas y `async/await` han simplificado mucho estas tareas, entender y manejar la asincronía sigue siendo una habilidad avanzada.

## Event Loop (Bucle de Eventos)

El **Event Loop** es el mecanismo central que permite a JavaScript manejar múltiples operaciones asincrónicas en un solo hilo sin bloquear la ejecución. Gracias a él, el lenguaje puede mantener la **interfaz de usuario fluida** y procesar tareas en segundo plano de forma eficiente.

Funciona mediante la coordinación de tres componentes principales:

- La **Pila de Llamadas (Call Stack)**, donde se ejecutan las funciones en orden LIFO.
- La **Cola de Microtareas**, donde se almacenan tareas de alta prioridad como las promesas resueltas.
- La **Cola de Tareas**, que gestiona otras acciones como `setTimeout` o eventos del DOM.

El Event Loop verifica constantemente si la pila está vacía y, si es así, primero procesa todas las microtareas, luego las tareas normales, y finalmente actualiza la interfaz. Este ciclo se repite indefinidamente, asegurando que la ejecución asincrónica no interrumpa la experiencia del usuario.

### Ejemplo del Event Loop en Acción

Vamos a explicarlo de la forma **más sencilla posible**, por partes. Aquí va la **explicación clara y real** de cómo funcionan:

## 🧱 1. La _Pila de Llamadas_ (Call Stack)

### 🧾 ¿Qué es?

La **Call Stack** es como una **pila de platos**:

- Cada vez que llamas una función, se **apila** (entra en la parte superior).
- Cuando termina, se **desapila** (sale de arriba).

### ✅ Ejemplo real y comentado:

```jsx
function saludar() {
  console.log("👋 Hola");
}

function iniciar() {
  console.log("🚀 Iniciando...");
  saludar(); // Se apila saludar()
  console.log("✅ Listo");
}

iniciar(); // Se apila iniciar()
```

### 🔍 Qué ocurre paso a paso:

1. `iniciar()` se apila.
2. Dentro de `iniciar`, se apila `saludar()`.
3. `saludar` hace un `console.log`, y se desapila.
4. Vuelve a `iniciar()`, imprime y se desapila.

> Todo esto ocurre de forma síncrona, línea por línea. No hay nada asincrónico aún.

## 📩 2. La _Cola de Tareas_ (Task Queue o Macrotasks)

### 🧾 ¿Qué es?

La **Cola de Tareas** guarda cosas que deben ejecutarse **después de que la pila esté vacía**.

Ejemplos típicos:

- `setTimeout()`
- Eventos del DOM (clicks, teclas, etc.)

### ✅ Ejemplo real y comentado:

```jsx
console.log("🟢 Inicio");

setTimeout(() => {
  console.log("⏰ Esto viene de la cola de tareas");
}, 0);

console.log("🔚 Fin");
```

### 🔍 Qué ocurre:

1. `console.log("🟢 Inicio")` va a la pila y se ejecuta.
2. `setTimeout(...)` también va a la pila, pero **no ejecuta el callback todavía**.
3. Su callback se va a la **cola de tareas**.
4. `console.log("🔚 Fin")` se ejecuta normalmente.
5. **Después de vaciar la pila**, el Event Loop toma el callback del `setTimeout` y lo ejecuta.

## ⚙️ 3. La _Cola de Microtareas_ (Microtask Queue)

### 🧾 ¿Qué es?

La **cola de microtareas** es otra fila donde se almacenan tareas **más pequeñas pero con mayor prioridad** que las tareas normales (macrotareas).

**Ejemplos comunes de microtareas:**

- `.then()` de una `Promise`
- `queueMicrotask()`

> 🔥 Importante: Todas las microtareas se ejecutan antes que cualquier tarea de la cola de tareas (como setTimeout), incluso si ambas están listas al mismo tiempo.

### ✅ Ejemplo real y comentado:

```jsx
console.log("🟢 Inicio");

Promise.resolve().then(() => {
  console.log("🔁 Microtarea: promesa resuelta");
});

setTimeout(() => {
  console.log("⏰ Tarea: setTimeout");
}, 0);

console.log("🔚 Fin");
```

### 🔍 Qué ocurre paso a paso:

1. `console.log("🟢 Inicio")` se ejecuta en la **pila de llamadas**.
2. `Promise.resolve().then(...)` **registra** el callback en la **cola de microtareas**.
3. `setTimeout(...)` **registra** su callback en la **cola de tareas**.
4. `console.log("🔚 Fin")` se ejecuta.
5. La **pila está vacía**, el Event Loop:
   - ✅ Ejecuta la **cola de microtareas** (`console.log("🔁 Microtarea: promesa resuelta")`)
   - ⏳ Luego ejecuta la **cola de tareas** (`console.log("⏰ Tarea: setTimeout")`)

## 📊 Comparación rápida:

| Acción                             | Prioridad | Cola                 |
| ---------------------------------- | --------- | -------------------- |
| `Promise.then()`                   | Alta      | Microtareas          |
| `queueMicrotask()`                 | Alta      | Microtareas          |
| `setTimeout`, `setInterval`        | Media     | Tareas (macrotareas) |
| Eventos del DOM (click, input)     | Media     | Tareas (macrotareas) |
| Código normal (funciones directas) | Inmediata | Call Stack           |

Aquí tienes un **ejemplo completo y real** que combina:

- 🧱 **Call Stack** (pila de llamadas)
- 🔁 **Microtareas** (`Promise.then`)
- ⏰ **Tareas** (`setTimeout`)

Con **comentarios línea por línea** para entender perfectamente el orden de ejecución.

### ✅ Ejemplo completo:

```jsx
console.log("🟢 1. Inicio del script"); // Call Stack

setTimeout(() => {
  console.log("⏰ 5. Tarea desde setTimeout"); // Task Queue (macrotarea)
}, 0);

Promise.resolve().then(() => {
  console.log("🔁 3. Microtarea desde promesa"); // Microtask Queue
});

console.log("🟡 2. Fin del script"); // Call Stack

// Otra microtarea
queueMicrotask(() => {
  console.log("🔁 4. Microtarea desde queueMicrotask"); // Microtask Queue
});
```

### 🔍 Resultado esperado en consola:

```
🟢 1. Inicio del script
🟡 2. Fin del script
🔁 3. Microtarea desde promesa
🔁 4. Microtarea desde queueMicrotask
⏰ 5. Tarea desde setTimeout

```

![console.log(_🟢 1. Inicio del script_); __ Call Stack - visual selection.svg](<console.log(__1._Inicio_del_script_)____Call_Stack_-_visual_selection.svg>)

### 🧠 Explicación paso a paso:

1. **Call Stack** ejecuta las funciones principales directamente:
   - `console.log("1")`
   - `setTimeout(...)` registra la tarea → va a la **Task Queue**.
   - `Promise.then(...)` registra la microtarea → va a la **Microtask Queue**.
   - `console.log("2")`
   - `queueMicrotask(...)` también va a la **Microtask Queue**.
2. Cuando el **call stack se vacía**, el Event Loop:
   - ✅ Ejecuta **todas las microtareas**:
     - `console.log("3")`
     - `console.log("4")`
3. Luego ejecuta **una tarea de la cola de tareas**:
   - `console.log("5")` desde `setTimeout`

### ✅ Conclusión:

- El **código síncrono va primero** (call stack).
- Luego **microtareas** (promesas, `queueMicrotask`).
- Por último, **tareas** como `setTimeout`.

Este es el **orden real de ejecución del Event Loop** en JavaScript.

## Importancia del Event Loop

El **Event Loop** es esencial en JavaScript porque permite ejecutar múltiples operaciones asincrónicas de forma eficiente y sin bloquear el hilo principal. Esto garantiza que la **interfaz de usuario siga siendo fluida y receptiva**, incluso cuando se manejan tareas como solicitudes de red o eventos del DOM.

Además, su diseño permite manejar la **concurrencia sin múltiples hilos**, lo que simplifica el desarrollo y mejora el rendimiento. Al priorizar las **microtareas** y organizar la ejecución de eventos, el Event Loop optimiza la respuesta de la aplicación. Entender cómo funciona es clave para todo desarrollador que quiera dominar la asincronía en JavaScript.

## Ejemplo de Asincronía y Event Loop en JavaScript

A continuación, te muestro un **ejemplo completo** de asincronía en JavaScript utilizando la **API Fetch** para obtener una imagen aleatoria y mostrarla dinámicamente en el navegador. Este ejemplo no lo hemos hecho antes y combina asincronía con manipulación del DOM.

### 🎯 Ejemplo real: Cargar y mostrar una imagen aleatoria de un perro usando asincronía (`fetch`, `async/await`)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Imagen aleatoria de perro</title>
    <style>
      body {
        font-family: sans-serif;
        text-align: center;
        padding: 20px;
      }
      img {
        max-width: 400px;
        border-radius: 10px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <h1>🐶 Ver un perro aleatorio</h1>
    <button id="boton">Cargar imagen</button>
    <div id="resultado"></div>

    <script>
      // Obtenemos referencias al botón y al div donde mostraremos la imagen
      const boton = document.getElementById("boton");
      const resultado = document.getElementById("resultado");

      // Función asincrónica para obtener y mostrar una imagen aleatoria
      async function cargarPerro() {
        try {
          // Mostramos un mensaje mientras se carga la imagen
          resultado.innerHTML = "🔄 Cargando imagen...";

          // Esperamos la respuesta de la API
          const respuesta = await fetch(
            "https://dog.ceo/api/breeds/image/random"
          );

          // Si la respuesta no fue exitosa, lanzamos un error
          if (!respuesta.ok) {
            throw new Error("Error al obtener la imagen");
          }

          // Convertimos la respuesta a JSON
          const datos = await respuesta.json();

          // Creamos una imagen y la insertamos en el DOM
          resultado.innerHTML = `<img src="${datos.message}" alt="Perro aleatorio">`;
        } catch (error) {
          // Si ocurre un error, lo mostramos al usuario
          resultado.innerHTML = `❌ Error: ${error.message}`;
        }
      }

      // Asociamos el evento click del botón a la función asincrónica
      boton.addEventListener("click", cargarPerro);
    </script>
  </body>
</html>
```

### 🧠 ¿Qué muestra este ejemplo?

- Una **interfaz sencilla** con un botón.
- Al hacer clic, se realiza una **petición asincrónica (`fetch`)** a una API pública.
- Se usa `*async/await**` para esperar la respuesta sin bloquear el navegador.
- Se maneja el error con `*try...catch**`.
- El resultado (una imagen) se muestra en la página al terminar la operación.

Este tipo de lógica es muy común en apps modernas (galerías, redes sociales, dashboards, etc.) donde se carga contenido desde servidores externos **sin recargar la página**.

Aquí tienes **otro ejemplo completamente diferente** de asincronía en JavaScript: esta vez vamos a **simular una animación por pasos** usando `async/await` con una función que espera con `setTimeout`, controlando el flujo como si fueran acciones secuenciales.

### 🎯 Ejemplo: Simulación de una animación paso a paso con `async/await`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Simulación paso a paso</title>
    <style>
      #output {
        font-family: monospace;
        padding: 10px;
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        width: 300px;
        margin: 20px auto;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <h2>🚦 Simulación de semáforo</h2>
    <button id="iniciar">Iniciar</button>
    <div id="output">Pulsa el botón para comenzar</div>

    <script>
      const output = document.getElementById("output");
      const boton = document.getElementById("iniciar");

      // Función que espera una cantidad de milisegundos y luego resuelve
      function esperar(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      // Función asincrónica que simula un semáforo paso a paso
      async function simularSemaforo() {
        output.textContent = "🔴 Rojo - Detente";
        await esperar(2000); // Esperamos 2 segundos

        output.textContent = "🟡 Amarillo - Prepárate";
        await esperar(1500); // Esperamos 1.5 segundos

        output.textContent = "🟢 Verde - Avanza";
        await esperar(2000); // Esperamos 2 segundos

        output.textContent = "⚫ Ciclo completado";
      }

      // Al hacer clic en el botón, ejecutamos la simulación
      boton.addEventListener("click", simularSemaforo);
    </script>
  </body>
</html>
```

### 🔍 ¿Qué hace este ejemplo?

- Simula un **semáforo** cambiando los mensajes en la interfaz.
- Usa una función llamada `esperar(ms)` que devuelve una promesa resuelta tras cierto tiempo.
- Con `await`, detenemos el flujo **sin bloquear el navegador**, esperando el tiempo indicado.
- El resultado se muestra en orden, como si fuese un proceso visual paso a paso.

Este tipo de asincronía es muy útil para:

- Simulaciones educativas.
- Animaciones secuenciales controladas por lógica.
- Control de flujos visuales paso a paso (tutoriales, juegos, etc.).

# Promesas Avanzadas

## Promise.all

## 🧠 ¿Qué es `Promise.all()`?

- `*Promise.all()**` es un método de JavaScript que te permite **ejecutar varias promesas al mismo tiempo** y **esperar a que todas terminen**.

Sirve para casos donde necesitas **varios datos al mismo tiempo** antes de continuar.

> 🧾 Piénsalo así: “No continúes hasta que todos estos pedidos estén listos”.

## ✅ Ejemplo real y comentado

Supongamos que quieres **obtener información de tres usuarios diferentes** desde una API.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.all ejemplo</title>
  </head>
  <body>
    <h2>Usuarios cargados:</h2>
    <ul id="lista"></ul>

    <script>
      const lista = document.getElementById("lista");

      // Función que obtiene un usuario por ID
      function obtenerUsuario(id) {
        // Retorna una promesa fetch
        return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
          (res) => res.json()
        );
      }

      // Ejecutamos múltiples promesas a la vez con Promise.all
      Promise.all([
        obtenerUsuario(1), // Promesa 1
        obtenerUsuario(2), // Promesa 2
        obtenerUsuario(3), // Promesa 3
      ])
        .then((usuarios) => {
          // Solo se entra aquí cuando TODAS las promesas se resolvieron

          usuarios.forEach((usuario) => {
            // Creamos un <li> por cada usuario
            const item = document.createElement("li");
            item.textContent = `${usuario.name} (${usuario.email})`;
            lista.appendChild(item);
          });
        })
        .catch((error) => {
          // Si alguna promesa falla, se captura aquí
          console.error("❌ Ocurrió un error al obtener los usuarios:", error);
        });
    </script>
  </body>
</html>
```

### 🔍 ¿Qué hace este ejemplo?

1. Crea 3 peticiones asincrónicas a una API de prueba.
2. `Promise.all([...])` ejecuta **todas a la vez**.
3. Espera hasta que **las 3 promesas estén resueltas**.
4. Luego muestra los usuarios en una lista HTML.
5. Si **una sola promesa falla**, el `catch` captura el error.

### 🧠 ¿Cuándo usar `Promise.all()`?

- Cuando necesitas **esperar varias cosas al mismo tiempo**.
- Por ejemplo:
  - Cargar varias imágenes.
  - Obtener varios archivos o usuarios.
  - Hacer múltiples peticiones a la vez y procesarlas juntas.

## Promise.race

## 🏁 ¿Qué es `Promise.race()`?

- `*Promise.race()**` ejecuta varias promesas al mismo tiempo, **pero solo se resuelve (o rechaza) con la que termine primero**, **sin importar si fue éxito o error**.

> 🧾 Piensa en una carrera de promesas: solo importa quién llega primero, no cómo.

## ✅ Ejemplo real: simular dos tareas, una lenta y una rápida

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.race ejemplo</title>
  </head>
  <body>
    <h2>Resultado de la carrera:</h2>
    <div id="resultado">Esperando...</div>

    <script>
      const resultado = document.getElementById("resultado");

      // Función que crea una promesa que se resuelve después de cierto tiempo
      function tarea(nombre, tiempo) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(`✅ ${nombre} terminó en ${tiempo}ms`);
          }, tiempo);
        });
      }

      // Ejecutamos dos tareas con tiempos diferentes
      Promise.race([
        tarea("Tarea RÁPIDA", 1000), // Se resolverá en 1 segundo
        tarea("Tarea LENTA", 3000), // Se resolverá en 3 segundos
      ])
        .then((mensaje) => {
          // Solo se ejecuta la primera promesa que se resuelva
          resultado.textContent = mensaje;
        })
        .catch((error) => {
          // Si la primera promesa en completarse falla, se captura aquí
          resultado.textContent = `❌ Error: ${error}`;
        });
    </script>
  </body>
</html>
```

### 🔍 ¿Qué pasa aquí?

1. `tarea()` devuelve una promesa que se resuelve después de un tiempo.
2. Usamos `Promise.race()` para **lanzar dos tareas al mismo tiempo**.
3. La que termine primero, gana:
   - En este caso, **“Tarea RÁPIDA”** se resuelve antes, y el `.then()` muestra el resultado.
4. Si la primera promesa en terminar fuera un error (usando `reject`), entonces `.catch()` lo capturaría.

### 🧠 ¿Cuándo usar `Promise.race()`?

- Para ejecutar **varias estrategias y quedarte con la más rápida** (por ejemplo, cargar datos desde varios servidores).
- Para implementar **timeouts personalizados** (si la promesa tarda mucho, rechazas tú mismo).
- Para mejorar la **experiencia del usuario** eligiendo la primera respuesta disponible.

Aquí tienes un **ejemplo práctico y muy común**: usar `**Promise.race()**` para **cancelar una operación lenta** si **supera un límite de tiempo**.

### 🎯 Escenario real:

Queremos **hacer una petición a una API**, pero **cancelarla si tarda más de 3 segundos**, para no dejar al usuario esperando indefinidamente.

### ✅ Ejemplo completo con comentarios línea por línea

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.race con timeout</title>
  </head>
  <body>
    <h2>Resultado de la petición:</h2>
    <div id="estado">Esperando respuesta...</div>

    <script>
      const estado = document.getElementById("estado");

      // Función que simula una petición lenta (ej: fetch real)
      function peticionLenta() {
        return new Promise((resolve) => {
          // Simulamos 5 segundos de demora (muy lenta)
          setTimeout(() => {
            resolve("✅ Datos recibidos correctamente");
          }, 5000);
        });
      }

      // Función que actúa como temporizador (rechaza si pasa demasiado tiempo)
      function timeout(ms) {
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject("⏰ Tiempo de espera superado (timeout)");
          }, ms);
        });
      }

      // Usamos Promise.race para ejecutar ambas al mismo tiempo
      Promise.race([
        peticionLenta(), // operación lenta
        timeout(3000), // timeout de 3 segundos
      ])
        .then((respuesta) => {
          // Si la petición termina antes del timeout
          estado.textContent = respuesta;
        })
        .catch((error) => {
          // Si el timeout se dispara primero
          estado.textContent = `❌ Error: ${error}`;
        });
    </script>
  </body>
</html>
```

### 🔍 ¿Qué está pasando?

1. `peticionLenta()` tarda 5 segundos → **más de lo permitido**.
2. `timeout(3000)` se dispara a los 3 segundos → **gana la carrera**.
3. `Promise.race()` rechaza primero, y entra al `.catch()` con el mensaje de timeout.
4. Si cambiáramos la petición a que tarde solo 2 segundos, entonces ganaría y se ejecutaría el `.then()`.

### ✅ ¿Cuándo usar esto?

- Cuando quieres proteger tu app de servicios lentos o caídos.
- Para mejorar la UX con **timeouts personalizados**.
- Para evitar dejar a tus usuarios esperando indefinidamente por un recurso.

## Encadenamiento de Promesas con Async/Await

## 🔗 ¿Qué es el encadenamiento de promesas con `async/await`?

El **encadenamiento** es cuando haces **varias operaciones asincrónicas** una detrás de otra, donde **el resultado de una se usa en la siguiente**.

Con `async/await`, esto se hace escribiendo el código en **orden secuencial**, como si fuera código normal, pero **esperando a que cada promesa se resuelva** antes de seguir.

### ✅ Ejemplo real y comentado: obtener un post y luego los comentarios de ese post

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Encadenamiento async/await</title>
  </head>
  <body>
    <h2>Post y comentarios</h2>
    <div id="resultado">Cargando...</div>

    <script>
      const resultado = document.getElementById("resultado");

      // Función asincrónica que encadena dos peticiones
      async function cargarPostYComentarios() {
        try {
          // Paso 1: Obtenemos un post
          const resPost = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
          );
          const post = await resPost.json();

          // Mostramos el título del post
          resultado.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><hr><h4>Comentarios:</h4>`;

          // Paso 2: Obtenemos los comentarios de ese post
          const resComentarios = await fetch(
            `https://jsonplaceholder.typicode.com/posts/1/comments`
          );
          const comentarios = await resComentarios.json();

          // Paso 3: Mostramos los comentarios
          comentarios.forEach((comentario) => {
            resultado.innerHTML += `<p><strong>${comentario.name}</strong>: ${comentario.body}</p>`;
          });
        } catch (error) {
          // Manejamos cualquier error en las dos peticiones
          resultado.textContent = `❌ Error: ${error.message}`;
        }
      }

      // Ejecutamos la función al cargar la página
      cargarPostYComentarios();
    </script>
  </body>
</html>
```

### 🔍 ¿Qué hace este ejemplo?

1. Hace una **primera petición** para obtener un post.
2. Espera con `await` hasta que se recibe el resultado.
3. Luego hace una **segunda petición** relacionada: los comentarios del post.
4. También la espera con `await`.
5. Al final muestra todo junto en pantalla.

### 🧠 Ventajas de encadenar promesas con `async/await`:

- Código más **limpio y fácil de leer** que usando `.then().then().then()`.
- Parece código **sincrónico**, aunque todo es asincrónico.
- Más fácil de manejar errores con un único `try...catch`.

# Manejo de Errores en Asincronía

## 🧨 ¿Por qué manejar errores en código asincrónico?

Cuando haces tareas asincrónicas (como peticiones `fetch`, lectura de archivos, temporizadores, etc.), **algo puede fallar**:

- Fallo de conexión
- URL incorrecta
- JSON mal formado
- Tiempo excedido (timeout)
- Código del servidor que devuelve error

Si **no manejas los errores**, la app puede **romperse silenciosamente** o dar mensajes confusos.

## 🧱 1. **Manejo de errores con `.catch()` (promesas encadenadas)**

```jsx
fetch("https://jsonplaceholder.typicode.com/posts/12345") // ID inválido
  .then((respuesta) => {
    if (!respuesta.ok) {
      // Si el estado HTTP no es exitoso, lanzamos un error manual
      throw new Error("❌ Error al obtener el post");
    }
    return respuesta.json(); // Convertimos a JSON
  })
  .then((datos) => {
    console.log("✅ Post recibido:", datos);
  })
  .catch((error) => {
    // Captura cualquier error ocurrido antes
    console.error("🧨 Error capturado:", error.message);
  });
```

### 🔍 Qué pasa aquí:

- Si la URL está mal o el ID no existe, se lanza un `Error`.
- `.catch()` captura **cualquier error** que ocurra en la cadena anterior.
- Esto es esencial para mantener control sobre lo que ocurre en tu app.

## 🧱 2. **Manejo de errores con `async/await` + `try...catch` (más moderno)**

```jsx
async function obtenerPost() {
  try {
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts/9999"
    ); // ID posiblemente inexistente

    if (!respuesta.ok) {
      // Si la respuesta HTTP no es exitosa, lanzamos error
      throw new Error("❌ Post no encontrado");
    }

    const datos = await respuesta.json();
    console.log("✅ Post recibido:", datos);
  } catch (error) {
    // Captura cualquier error ocurrido en el bloque try
    console.error("🧨 Error capturado:", error.message);
  }
}

// Llamamos a la función
obtenerPost();
```

### ✅ Ventajas de `try...catch` con `async/await`:

- Código **más limpio**.
- Permite manejar múltiples operaciones dentro de un mismo bloque.
- Fácil de leer, más parecido a código síncrono.

## 🧠 Reglas importantes:

1. **Siempre maneja errores en tareas asincrónicas**.
2. Si usas `.then()`, **usa `.catch()` al final**.
3. Si usas `async/await`, **usa `try...catch`**.
4. Revisa siempre `response.ok` antes de convertir a JSON.
5. No uses `throw` a lo loco: lánzalo solo con sentido (cuando algo falla de verdad).

A continuación te muestro un ejemplo real en el que se **simulan errores de red** y se implementa un **sistema de reintento automático (retry)** si algo falla. Esto es muy útil en aplicaciones reales cuando una API puede fallar **temporalmente**, pero quieres volver a intentarlo antes de mostrar error al usuario.

## 🎯 Objetivo:

Hacer una petición `fetch`, y si falla (por red o error HTTP), **reintentarla hasta 3 veces** antes de rendirse.

### ✅ Ejemplo real con retry automático y comentarios línea por línea:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Retry automático con fetch</title>
  </head>
  <body>
    <h2>Resultado:</h2>
    <pre id="resultado">Esperando respuesta...</pre>

    <script>
      const resultado = document.getElementById("resultado");

      // Función asincrónica que reintenta una petición hasta 3 veces
      async function fetchConRetry(url, intentos = 3, delay = 1000) {
        for (let intento = 1; intento <= intentos; intento++) {
          try {
            resultado.textContent = `🔄 Intento ${intento} de ${intentos}...`;

            // Simulamos una posible URL incorrecta o error de red
            const res = await fetch(url);

            if (!res.ok) {
              throw new Error(`❌ Error HTTP ${res.status}`);
            }

            const datos = await res.json();
            return datos; // Salimos del bucle si todo fue bien
          } catch (error) {
            // Mostramos error temporal
            console.warn(`⚠️ Error en intento ${intento}: ${error.message}`);

            if (intento === intentos) {
              throw new Error("🚫 Todos los intentos fallaron");
            }

            // Esperamos un poco antes de reintentar
            await new Promise((res) => setTimeout(res, delay));
          }
        }
      }

      // Ejecutamos la función
      (async () => {
        try {
          // Puedes probar con una URL inválida o válida para ver el comportamiento
          const datos = await fetchConRetry(
            "https://jsonplaceholder.typicode.com/posts/1",
            3
          );

          resultado.textContent = `✅ Petición exitosa:\n\n${JSON.stringify(
            datos,
            null,
            2
          )}`;
        } catch (errorFinal) {
          resultado.textContent = `❌ Fallo definitivo: ${errorFinal.message}`;
        }
      })();
    </script>
  </body>
</html>
```

### 🔍 Qué hace este ejemplo:

1. La función `fetchConRetry()` intenta hacer `fetch()` hasta 3 veces.
2. Si ocurre un error (por red o HTTP no válido), entra en el `catch`.
3. Si no es el último intento, **espera 1 segundo** antes de volver a intentar.
4. Si en el tercer intento **aún falla**, lanza un error final que se captura fuera.
5. El usuario ve en pantalla si fue exitoso o si todos los intentos fallaron.

### 🧠 ¿Cuándo usar esta técnica?

- Cuando consumes APIs que a veces fallan por carga o latencia.
- En apps móviles o conexiones inestables.
- Cuando no quieres frustrar al usuario con errores inmediatos.

## Condiciones de Carrera

## 🧠 ¿Qué es una _condición de carrera_ en JavaScript?

Una **condición de carrera** (race condition) ocurre cuando **dos o más operaciones asincrónicas** intentan modificar o usar **los mismos datos**, y el **resultado final depende del orden en que terminen**.

> ⚠️ Problema: Como no sabemos cuál operación se completará primero, el resultado puede ser incorrecto o inesperado.

## 🎯 Ejemplo real: dos peticiones que modifican el mismo contenido

Imagina que tienes un botón que **carga información de usuario**, pero el usuario hace clic dos veces muy rápido.

### ✅ Código con condición de carrera:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Condición de carrera</title>
  </head>
  <body>
    <h2>Datos del usuario:</h2>
    <button id="cargar">Cargar Usuario</button>
    <div id="resultado">Sin datos</div>

    <script>
      const boton = document.getElementById("cargar");
      const resultado = document.getElementById("resultado");

      // Función asincrónica que simula una petición lenta
      async function cargarUsuario(id) {
        const respuesta = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const datos = await respuesta.json();
        resultado.textContent = `👤 ${datos.name}`;
      }

      // Al hacer clic varias veces rápido, cargamos diferentes usuarios
      let idActual = 1;

      boton.addEventListener("click", () => {
        cargarUsuario(idActual);
        idActual++; // Aumentamos el ID para la próxima petición
      });
    </script>
  </body>
</html>
```

### 🔍 ¿Qué ocurre aquí?

1. Si haces clic **dos veces muy rápido**, por ejemplo:
   - `cargarUsuario(1)` empieza (pero es lenta)
   - `cargarUsuario(2)` también empieza (más rápida)
2. Si la **segunda petición termina antes**, se muestra el usuario 2.
3. Luego, cuando **la primera termina**, **sobrescribe** el resultado y aparece el usuario 1.
4. Resultado: la pantalla muestra datos **incorrectos o desactualizados**.

> ⚠️ Esto es una condición de carrera: el resultado depende del orden en que llegan las respuestas, no del orden en que se lanzaron.

## ✅ Cómo evitar condiciones de carrera (forma sencilla)

Una forma simple es **cancelar** o **ignorar** resultados viejos si llega uno más nuevo.

### 🔧 Ejemplo corregido con control de versión:

```jsx
let ultimaPeticion = 0;

async function cargarUsuario(id) {
  const numeroPeticion = ++ultimaPeticion; // Asignamos un número único a esta petición

  const respuesta = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const datos = await respuesta.json();

  if (numeroPeticion === ultimaPeticion) {
    // Solo mostramos el resultado si esta es la última petición enviada
    resultado.textContent = `✅ ${datos.name}`;
  } else {
    console.warn("⚠️ Resultado descartado por ser una petición anterior");
  }
}
```

### ✅ Resultado:

- Solo la **última petición activa** puede actualizar el DOM.
- Si otra termina más tarde, **se ignora**.

### 🧠 ¿Cuándo preocuparse por esto?

- En apps con **búsquedas en vivo**, formularios dinámicos, carga de imágenes, etc.
- Siempre que lances **varias peticiones rápidas**, especialmente si dependen de entradas del usuario.

Vamos a hacer un ejemplo real y visual de **búsqueda en vivo** con un campo de texto. Al escribir, se hace una petición asincrónica simulada, pero si escribes muy rápido, se genera una **condición de carrera**: puede mostrarse el resultado de una búsqueda anterior que terminó más tarde.

Te mostraré **dos versiones**:

1. ✅ La versión _con condición de carrera_ (mal).
2. ✅ La versión _corregida_ que evita el problema.

## 🔍 VERSIÓN 1: CONDICIÓN DE CARRERA (resultado incorrecto si escribes rápido)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Búsqueda en vivo (con condición de carrera)</title>
    <style>
      body {
        font-family: sans-serif;
        padding: 20px;
      }
      input {
        padding: 10px;
        width: 300px;
      }
      .resultado {
        margin-top: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>🔍 Buscar usuario</h2>
    <input type="text" id="busqueda" placeholder="Escribe un ID (1 al 10)..." />
    <div class="resultado" id="resultado">Esperando búsqueda...</div>

    <script>
      const input = document.getElementById("busqueda");
      const resultado = document.getElementById("resultado");

      // Simulamos una búsqueda asincrónica lenta
      async function buscarUsuario(id) {
        resultado.textContent = `🔄 Buscando usuario ${id}...`;
        await new Promise((res) => setTimeout(res, Math.random() * 2000 + 500)); // Tiempo aleatorio

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) {
          resultado.textContent = "❌ Usuario no encontrado.";
          return;
        }

        const datos = await res.json();
        resultado.textContent = `👤 ${datos.name} (${datos.email})`;
      }

      input.addEventListener("input", () => {
        const id = input.value.trim();
        if (id && !isNaN(id)) {
          buscarUsuario(id);
        }
      });
    </script>
  </body>
</html>
```

### 🔍 Qué pasa:

- Si escribes "1", luego "2", luego "3" muy rápido...
- Es posible que la búsqueda de "1" tarde más y **aparezca al final**, aunque ya estés buscando "3".
- Resultado: **información incorrecta en pantalla**.

A continuación te muestro la **versión corregida** del ejemplo anterior, usando una técnica muy sencilla y eficaz: **control de versiones con un `requestId`**.

Así garantizamos que **solo se muestre el resultado de la última búsqueda activa**, ignorando cualquier búsqueda anterior que termine después.

## ✅ VERSIÓN CORREGIDA: SIN condición de carrera (control con `requestId`)

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Búsqueda en vivo (sin condición de carrera)</title>
    <style>
      body {
        font-family: sans-serif;
        padding: 20px;
      }
      input {
        padding: 10px;
        width: 300px;
      }
      .resultado {
        margin-top: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>🔍 Buscar usuario</h2>
    <input type="text" id="busqueda" placeholder="Escribe un ID (1 al 10)..." />
    <div class="resultado" id="resultado">Esperando búsqueda...</div>

    <script>
      const input = document.getElementById("busqueda");
      const resultado = document.getElementById("resultado");

      // Variable para controlar la versión actual de la búsqueda
      let ultimaBusquedaId = 0;

      async function buscarUsuario(id) {
        const requestId = ++ultimaBusquedaId; // Nueva versión de búsqueda

        resultado.textContent = `🔄 Buscando usuario ${id}...`;

        // Simulamos una búsqueda con retardo aleatorio
        await new Promise((res) => setTimeout(res, Math.random() * 2000 + 500));

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) {
          if (requestId === ultimaBusquedaId) {
            resultado.textContent = "❌ Usuario no encontrado.";
          }
          return;
        }

        const datos = await res.json();

        // Solo mostramos el resultado si esta sigue siendo la última búsqueda activa
        if (requestId === ultimaBusquedaId) {
          resultado.textContent = `👤 ${datos.name} (${datos.email})`;
        } else {
          console.warn("⚠️ Resultado descartado por ser una búsqueda antigua.");
        }
      }

      input.addEventListener("input", () => {
        const id = input.value.trim();
        if (id && !isNaN(id)) {
          buscarUsuario(id);
        }
      });
    </script>
  </body>
</html>
```

### ✅ ¿Qué resuelve esto?

- Cada vez que se inicia una nueva búsqueda, se incrementa `ultimaBusquedaId`.
- Cada promesa (petición) recuerda **con qué `requestId` fue lanzada**.
- Al finalizar, **verifica si sigue siendo la última búsqueda activa**.
- Si **no lo es**, **se ignora su resultado** (así no pisa el más reciente).

### 🧠 Conclusión:

Este patrón de control con `requestId` es **muy útil en interfaces reactivas**, donde las peticiones pueden cruzarse fácilmente.

¿Te gustaría que prepare un ejemplo visual con una **barra de progreso animada** para simular una carga con posibles condiciones de carrera también?

La **sincronización de operaciones en JavaScript** para evitar **condiciones de carrera** se basa en **controlar el orden y el estado de las operaciones asincrónicas**, ya que JavaScript **no tiene hilos paralelos reales en el navegador**, sino un único **hilo de ejecución** y un **event loop**.

## ✅ ¿Cómo sincronizar operaciones en JavaScript puede evitar las condiciones de carrera?

### 1. **Control de versión o `requestId`**

(✅ ya lo vimos antes)

Cada operación tiene un identificador único, y **solo se acepta el resultado más reciente**.

```
let version = 0;
async function operacion() {
  const current = ++version;
  const datos = await fetch(...);
  if (current === version) {
    // Solo si es la versión más nueva, mostramos datos
  }
}

```

### 2. **Encadenamiento de promesas**

Cuando una operación depende del resultado anterior, se **encadenan** usando `.then()` o `async/await`.

```
async function flujoSincronizado() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  // Cada paso espera al anterior
}

```

Esto asegura que **cada operación se haga en orden**.

### 3. **Deshabilitar entradas del usuario temporalmente**

Una forma simple y efectiva:

```
boton.disabled = true;
await hacerAlgoLento();
boton.disabled = false;

```

Así evitas que el usuario **dispare múltiples veces** el mismo proceso mientras está corriendo.

### 4. **AbortController (para cancelar operaciones anteriores)**

Ideal para **fetch()**, permite abortar peticiones anteriores si ya no son necesarias:

```
let controller;

function nuevaPeticion() {
  if (controller) controller.abort(); // Cancelamos la anterior

  controller = new AbortController();

  fetch("...", { signal: controller.signal })
    .then(res => res.json())
    .then(data => { /* usar datos */ })
    .catch(err => {
      if (err.name === "AbortError") console.log("Petición cancelada");
    });
}

```

### 5. **Bloqueo lógico (lock)**

Puedes usar una variable booleana para impedir que se inicie una operación si ya hay otra corriendo:

```
let enProceso = false;

async function ejecutar() {
  if (enProceso) return; // Evitamos colisión
  enProceso = true;

  await tareaAsincrona();

  enProceso = false;
}

```

## ✅ Conclusión:

Aunque JavaScript no tiene sincronización por hilos como otros lenguajes, puedes **evitar condiciones de carrera** con:

- Control de versión (`requestId`)
- Encadenamiento correcto
- Cancelación con `AbortController`
- Bloqueos lógicos (`enProceso`)
- Interfaces bloqueadas temporalmente

# Ejemplo Práctico Mini APP

Vamos a crear una **mini app de búsqueda en vivo**, donde se apliquen **todas las técnicas para evitar condiciones de carrera** en JavaScript:

## 🎯 Objetivo de la app

- Campo de texto para buscar usuarios por ID (del 1 al 10).
- Cada vez que se escribe, se hace una petición a una API.
- Usaremos:
  - ✅ Control de versión (`requestId`)
  - ✅ `AbortController` para cancelar búsquedas anteriores
  - ✅ Bloqueo lógico (`enProceso`)
  - ✅ Encadenamiento correcto (`async/await`)

## 🧱 Paso 1: Estructura HTML

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Mini app: búsqueda segura</title>
    <style>
      body {
        font-family: sans-serif;
        padding: 20px;
      }
      input {
        padding: 10px;
        width: 300px;
      }
      .resultado {
        margin-top: 20px;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h2>🔍 Buscar usuario (ID del 1 al 10)</h2>
    <input type="text" id="busqueda" placeholder="Escribe un ID..." />
    <div class="resultado" id="resultado">Esperando búsqueda...</div>

    <script>
      // JavaScript irá aquí
    </script>
  </body>
</html>
```

## 🧱 Paso 2: JavaScript con todas las protecciones

```jsx
const input = document.getElementById("busqueda");
const resultado = document.getElementById("resultado");

let version = 0; // Control de versiones
let controlador; // Para AbortController
let enProceso = false; // Bloqueo lógico

// Escuchar cada cambio en el input
input.addEventListener("input", () => {
  const id = input.value.trim();

  // Validamos entrada (solo números entre 1 y 10)
  if (id && !isNaN(id) && +id >= 1 && +id <= 10) {
    buscarUsuario(id);
  } else {
    resultado.textContent = "🕓 Esperando entrada válida (1 al 10)...";
  }
});

async function buscarUsuario(id) {
  if (enProceso) {
    // Evitamos lanzar otra si ya hay una corriendo
    console.log("⏳ Ya hay una búsqueda en proceso. Ignorando esta.");
    return;
  }

  // Incrementamos la versión y guardamos el número actual
  const estaVersion = ++version;

  // Abortamos la búsqueda anterior si existía
  if (controlador) controlador.abort();

  // Creamos un nuevo controlador para esta petición
  controlador = new AbortController();

  enProceso = true; // Activamos bloqueo lógico
  resultado.textContent = `🔄 Buscando usuario ${id}...`;

  try {
    const respuesta = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      { signal: controlador.signal }
    );

    // Verificamos si la respuesta es válida
    if (!respuesta.ok) {
      throw new Error("❌ Usuario no encontrado.");
    }

    const datos = await respuesta.json();

    // Solo mostramos el resultado si es la búsqueda más reciente
    if (estaVersion === version) {
      resultado.textContent = `✅ ${datos.name} (${datos.email})`;
    } else {
      console.log("⚠️ Resultado descartado por versión antigua.");
    }
  } catch (error) {
    // Si el error fue por cancelación, no hacemos nada
    if (error.name === "AbortError") {
      console.log("🛑 Búsqueda cancelada");
    } else {
      resultado.textContent = `❌ Error: ${error.message}`;
    }
  } finally {
    enProceso = false; // Liberamos el bloqueo
  }
}
```

## ✅ ¿Qué aprendiste con esta mini app?

- A usar `requestId` (versión) para evitar resultados desactualizados.
- A usar `AbortController` para **cancelar** peticiones viejas.
- A usar `enProceso` para bloquear doble ejecución.
- A mantener un flujo limpio y sincronizado con `async/await`.

Ahora, vamos a **convertir esta mini app en un componente más moderno y reutilizable**, usando **Bootstrap 5** para el diseño, con:

- 🎨 **Estilos visuales mejorados**
- 🔄 Un **spinner de carga**
- ✅ **Validación visual del input**
- 📦 Todo modular y reutilizable

## ✅ Paso 1: HTML base con Bootstrap

Agregamos Bootstrap desde CDN y preparamos la estructura:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Componente búsqueda segura</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-light p-4">
    <div class="container">
      <h2 class="mb-4">🔍 Buscar usuario (ID 1–10)</h2>

      <!-- Componente -->
      <div id="componente-busqueda" class="card shadow-sm p-4">
        <form id="formulario" class="row g-3 needs-validation" novalidate>
          <div class="col-auto">
            <input
              type="number"
              min="1"
              max="10"
              class="form-control"
              id="inputId"
              placeholder="ID de usuario"
              required
            />
            <div class="invalid-feedback">
              Introduce un número entre 1 y 10.
            </div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">
              Buscar
              <span
                class="spinner-border spinner-border-sm d-none"
                role="status"
                id="spinner"
              ></span>
            </button>
          </div>
        </form>

        <div class="mt-4" id="resultado">Esperando búsqueda...</div>
      </div>
    </div>

    <script>
      // JavaScript irá aquí
    </script>
  </body>
</html>
```

## ✅ Paso 2: Lógica JavaScript con todo integrado y modularizado

```jsx
(() => {
  const input = document.getElementById("inputId");
  const resultado = document.getElementById("resultado");
  const formulario = document.getElementById("formulario");
  const spinner = document.getElementById("spinner");

  let version = 0;
  let enProceso = false;
  let controller;

  // Validación de Bootstrap al enviar
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();

    formulario.classList.add("was-validated");

    const id = input.value.trim();

    if (input.checkValidity()) {
      buscarUsuario(id);
    }
  });

  async function buscarUsuario(id) {
    if (enProceso) return;

    const actual = ++version;

    if (controller) controller.abort();
    controller = new AbortController();

    enProceso = true;
    spinner.classList.remove("d-none");
    resultado.innerHTML = `<div class="text-muted">🔄 Buscando usuario ${id}...</div>`;

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          signal: controller.signal,
        }
      );

      if (!res.ok) throw new Error("Usuario no encontrado");

      const datos = await res.json();

      if (actual === version) {
        resultado.innerHTML = `
          <div class="alert alert-success">
            <strong>${datos.name}</strong><br>
            <small>${datos.email}</small>
          </div>`;
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        resultado.innerHTML = `<div class="alert alert-danger">❌ ${err.message}</div>`;
      }
    } finally {
      enProceso = false;
      spinner.classList.add("d-none");
    }
  }
})();
```

## ✅ ¿Qué mejoras trae esta versión?

| Característica                | Implementación                                 |
| ----------------------------- | ---------------------------------------------- |
| Validación visual             | Bootstrap + atributo `required` + feedback     |
| Componente reutilizable       | Todo está dentro de una `card` Bootstrap       |
| Spinner de carga              | Bootstrap spinner animado, oculto/visible      |
| Acceso modularizado           | Código dentro de IIFE (`(() => { })()`)        |
| Prevención de errores comunes | Control de versión + abortado + bloqueo lógico |
