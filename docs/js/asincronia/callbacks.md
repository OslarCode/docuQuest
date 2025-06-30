# Callbacks

## Funciones de Callback en la Asincronía de JavaScript

## 🧠 ¿Qué es un **callback**?

Un **callback** es simplemente una **función que se pasa como argumento** a otra función, para que **esa otra función la ejecute más tarde**.

> 📦 JavaScript trata a las funciones como ciudadanos de primera clase:
> 
> 
> Puedes **pasarlas como argumentos**, **guardarlas en variables** y **retornarlas** como cualquier dato.
> 

## ✅ Ejemplo básico real: función que saluda con callback

```jsx
// Función que toma un nombre y una función como argumentos
function procesarUsuario(nombre, callback) {
  // Mostramos un mensaje base
  console.log("Procesando usuario...");

  // Ejecutamos la función que se pasó como argumento (el callback)
  callback(nombre);
}

// Esta es la función que queremos ejecutar al final
function saludar(nombre) {
  console.log(`Hola, ${nombre}. Bienvenido a la app.`);
}

// Llamamos a la función y le pasamos otra función como parámetro
procesarUsuario("Carlos", saludar);

```

### 🔍 ¿Qué ocurre aquí?

1. Llamamos a `procesarUsuario("Carlos", saludar)`.
2. La función `saludar` **no se ejecuta inmediatamente**, solo se **pasa como dato**.
3. Dentro de `procesarUsuario`, **se ejecuta `callback(nombre)`**, y entonces se llama a `saludar("Carlos")`.

### 📌 Esto es un **callback**:

Una **función que se ejecuta dentro de otra**, pasada como parámetro.

## ✅ Otro ejemplo real: función con retraso (simulando asincronía)

```jsx
function esperarYMostrar(mensaje, callback) {
  console.log("⏳ Esperando 2 segundos...");

  setTimeout(() => {
    console.log(mensaje);
    callback(); // ejecutamos el callback después del mensaje
  }, 2000);
}

function final() {
  console.log("✅ Todo ha terminado.");
}

// Llamamos y pasamos la función final como callback
esperarYMostrar("📝 Aquí está tu mensaje", final);

```

### 🔍 ¿Qué ocurre aquí?

- Usamos `setTimeout` para simular un proceso que tarda.
- Cuando termina, **llamamos al callback** (la función `final`).
- Resultado:
    
    ```
    ⏳ Esperando 2 segundos...
    📝 Aquí está tu mensaje
    ✅ Todo ha terminado.
    
    ```
    

Ejemplo de callback típico del DOM (por ejemplo, con addEventListener) y después cómo los callbacks pueden volverse complicados (callback hell) si no se organizan bien

## ✅ Parte 1: **Ejemplo real de callback en el DOM con `addEventListener`**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Callback en el DOM</title>
</head>
<body>
  <button id="miBoton">Haz clic aquí</button>
  <p id="mensaje"></p>

  <script>
    // Obtenemos los elementos del DOM
    const boton = document.getElementById("miBoton");
    const mensaje = document.getElementById("mensaje");

    // Callback: esta función se ejecutará cuando el botón sea clicado
    function manejarClick() {
      mensaje.textContent = "👋 ¡Hola! Has hecho clic en el botón.";
    }

    // Asociamos el evento al botón con un callback
    boton.addEventListener("click", manejarClick);
  </script>
</body>
</html>

```

### 🔍 ¿Qué está pasando?

1. Tenemos un botón y un párrafo.
2. Usamos `addEventListener` para decir:
    
    > "Cuando alguien haga clic en este botón, ejecuta esta función".
    > 
3. La función `manejarClick` es un **callback** porque **no se ejecuta inmediatamente**, sino que **se pasa como argumento** y se ejecuta **cuando ocurra un evento**.

## ⚠️ Parte 2: Ejemplo de **callback hell** (infierno de callbacks)

Cuando tenemos **muchas funciones anidadas una dentro de otra**, especialmente asincrónicas (como en `setTimeout`), el código se vuelve **difícil de leer y mantener**.

### 💥 Ejemplo con `setTimeout`:

```jsx
console.log("🛠 Iniciando proceso...");

setTimeout(() => {
  console.log("Paso 1 completado");

  setTimeout(() => {
    console.log("Paso 2 completado");

    setTimeout(() => {
      console.log("Paso 3 completado");

      setTimeout(() => {
        console.log("✅ Proceso finalizado");
      }, 1000);

    }, 1000);

  }, 1000);

}, 1000);

```

### 🔍 Problemas:

- Todo está **muy anidado**.
- Difícil de **leer**, **debuggear** y **modificar**.
- Si necesitas manejar errores aquí, se complica aún más.

> A esto se le llama callback hell ("infierno de callbacks").
> 

### ✅ ¿Cómo evitarlo?

Con **promesas** y **`async/await`**, que hacen que el código asincrónico se vea como secuencial.

¿Quieres que ahora transformemos este mismo ejemplo de callback hell en una versión con `async/await`, bien organizada y limpia?

Vamos a **transformar el ejemplo de callback hell** con `setTimeout` en una versión **mucho más clara y limpia usando `async/await`**.

## ✅ Versión limpia y moderna con `async/await`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Async/Await en cadena</title>
</head>
<body>
  <h2>Ejemplo: evitar callback hell con async/await</h2>
  <button id="iniciar">Iniciar proceso</button>
  <pre id="log"></pre>

  <script>
    const log = document.getElementById("log");
    const btn = document.getElementById("iniciar");

    // Función que simula esperar N milisegundos
    function esperar(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Función asincrónica que organiza los pasos con await
    async function ejecutarProceso() {
      log.textContent = "🛠 Iniciando proceso...\n";

      await esperar(1000);
      log.textContent += "✔️ Paso 1 completado\n";

      await esperar(1000);
      log.textContent += "✔️ Paso 2 completado\n";

      await esperar(1000);
      log.textContent += "✔️ Paso 3 completado\n";

      await esperar(1000);
      log.textContent += "✅ Proceso finalizado";
    }

    // Al hacer clic, ejecutamos todo el proceso asincrónico
    btn.addEventListener("click", ejecutarProceso);
  </script>
</body>
</html>

```

### 🔍 ¿Qué hicimos aquí?

1. Creamos una función `esperar(ms)` que devuelve una promesa con `setTimeout`.
2. Usamos `await` para esperar cada paso.
3. El código se lee **de arriba hacia abajo**, como si fuera **sincrónico**, pero sigue siendo asincrónico.
4. Evitamos el caos de anidamientos del "callback hell".

### ✅ Ventajas de usar `async/await`:

- Mucho más legible.
- Fácil de mantener y ampliar.
- Puedes usar `try/catch` para manejar errores fácilmente.
- Ideal para procesos que dependen uno del otro.

### Soluciones para Evitar el Callback Hell

1. **Modularización del Código**: Dividir el código en funciones más pequeñas y modulares puede ayudar a evitar el anidamiento excesivo de callbacks. Cada función puede manejar una parte específica de la lógica asincrónica.
2. **Promesas**: Las promesas, introducidas en ECMAScript 6, proporcionan una manera más estructurada de manejar la asincronía y evitar el callback hell. Las promesas permiten encadenar operaciones asincrónicas de manera más clara y manejable.
3. **Async/Await**: La sintaxis async/await, introducida en ECMAScript 2017, permite escribir código asincrónico de manera similar al código síncrono, mejorando significativamente la legibilidad y manejabilidad del código.

## Callbacks en Operaciones Asincrónicas (Ejemplos)

Aquí tienes un **ejemplo completo y real** de **callback en una operación asincrónica** usando `setTimeout`, que simula una tarea que toma tiempo (como consultar una base de datos o llamar a una API). Te lo explico **línea por línea** con comentarios claros.

## ✅ Ejemplo real: procesar un pedido y notificar al usuario con un callback

```jsx
// Función asincrónica simulada usando setTimeout
function procesarPedido(pedido, callback) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  // Simulamos un retardo de 2 segundos (como una operación asincrónica)
  setTimeout(() => {
    console.log("✅ Pedido procesado correctamente.");

    // Ejecutamos el callback una vez termina la operación
    callback(pedido);
  }, 2000);
}

// Esta es la función callback que se ejecutará al finalizar el pedido
function notificarUsuario(pedido) {
  console.log(`📦 Tu pedido "${pedido}" está listo para ser enviado.`);
}

// Ejecutamos todo pasando la función notificarUsuario como callback
procesarPedido("Camiseta JavaScript", notificarUsuario);

```

## 🔍 ¿Qué ocurre paso por paso?

1. **Llamamos a `procesarPedido("Camiseta JavaScript", notificarUsuario)`**
    
    → Esto **inicia la operación** y le pasamos una función (`notificarUsuario`) que **debe ejecutarse al final**.
    
2. Dentro de `procesarPedido`, se imprime el mensaje inicial:
    
    ```
    🛒 Recibido pedido: Camiseta JavaScript
    
    ```
    
3. Luego, se inicia `setTimeout(...)` que **simula una espera de 2 segundos**.
4. Después de los 2 segundos:
    - Se imprime `✅ Pedido procesado correctamente.`
    - Se ejecuta el **callback `notificarUsuario(pedido)`**
5. Finalmente, el callback imprime:
    
    ```
    📦 Tu pedido "Camiseta JavaScript" está listo para ser enviado.
    
    ```
    

### 🧠 ¿Por qué es asincrónico?

Porque usamos `setTimeout`, que es **no bloqueante**: la ejecución **continúa** mientras espera. En una app real, esto puede representar una petición a servidor, lectura de archivo, etc.

### ✅ Resultado final esperado en consola:

```
🛒 Recibido pedido: Camiseta JavaScript
✅ Pedido procesado correctamente.
📦 Tu pedido "Camiseta JavaScript" está listo para ser enviado.

```

Ahora, vamos a transformar el ejemplo original paso por paso para que veas **cómo evoluciona el código** desde:

1. ✅ **Callback** →
2. ✅ **Promesa** →
3. ✅ **async/await**

## 🔁 Versión 1 (RECAP): Con **callback**

```jsx
function procesarPedido(pedido, callback) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  setTimeout(() => {
    console.log("✅ Pedido procesado correctamente.");
    callback(pedido); // Ejecutamos el callback manualmente
  }, 2000);
}

function notificarUsuario(pedido) {
  console.log(`📦 Tu pedido "${pedido}" está listo para ser enviado.`);
}

procesarPedido("Camiseta JavaScript", notificarUsuario);

```

## 🔁 Versión 2: Con **promesas**

```jsx
// Ahora procesarPedido devuelve una promesa
function procesarPedido(pedido) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("✅ Pedido procesado correctamente.");
      resolve(pedido); // Terminamos la promesa con éxito
    }, 2000);
  });
}

// Usamos .then() para manejar el resultado
procesarPedido("Camiseta JavaScript")
  .then((pedido) => {
    console.log(`📦 Tu pedido "${pedido}" está listo para ser enviado.`);
  })
  .catch((error) => {
    console.error("❌ Hubo un error con el pedido:", error);
  });

```

### 🔍 ¿Qué hicimos?

- Ahora `procesarPedido` devuelve una **promesa**.
- Podemos usar `.then()` para ejecutar algo **cuando termine**.
- Separamos claramente la **lógica de la operación** y la **reacción al resultado**.

## 🔁 Versión 3: Con **async/await** (la forma más clara y moderna)

```jsx
function procesarPedido(pedido) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Pedido procesado correctamente.");
      resolve(pedido);
    }, 2000);
  });
}

// Función asincrónica que usa await en vez de .then()
async function ejecutarPedido() {
  try {
    const pedido = await procesarPedido("Camiseta JavaScript");
    console.log(`📦 Tu pedido "${pedido}" está listo para ser enviado.`);
  } catch (error) {
    console.error("❌ Hubo un error con el pedido:", error);
  }
}

// Ejecutamos todo
ejecutarPedido();

```

## ✅ Comparación final

| Versión | Código limpio | Manejo de errores | Orden secuencial |
| --- | --- | --- | --- |
| Callback | ❌ | Complicado | Difícil de leer |
| Promesa (.then) | ✅ | Con `.catch()` | Medianamente |
| Async/Await | ✅✅ | Natural con `try` | ✅ Muy claro |

Ahora, vamos a **extender el ejemplo con `async/await`** para simular **dos pedidos realizados uno después del otro**, como si un usuario hiciera varios pedidos y quisieras procesarlos en orden.

## 🎯 Objetivo:

Simular dos pedidos consecutivos (uno tras otro), usando `async/await`, de forma clara y entendible.

## ✅ Código completo comentado línea por línea

```jsx
// Simulamos una operación asincrónica: procesar un pedido
function procesarPedido(pedido) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Pedido "${pedido}" procesado correctamente.`);
      resolve(pedido);
    }, 2000); // Simulamos 2 segundos de espera
  });
}

// Función asincrónica que encadena dos pedidos en orden
async function ejecutarPedidosEnCadena() {
  try {
    // Primer pedido
    const pedido1 = await procesarPedido("Camiseta JavaScript");
    console.log(`📦 Pedido 1 listo: ${pedido1}\n`);

    // Segundo pedido (solo comienza cuando termina el primero)
    const pedido2 = await procesarPedido("Sticker HTML5");
    console.log(`📦 Pedido 2 listo: ${pedido2}\n`);

    console.log("🎉 Todos los pedidos fueron procesados exitosamente.");
  } catch (error) {
    console.error("❌ Error durante el procesamiento de pedidos:", error);
  }
}

// Ejecutamos la función principal
ejecutarPedidosEnCadena();

```

### 🔍 ¿Qué pasa aquí paso a paso?

1. Llamamos a `ejecutarPedidosEnCadena()`.
2. Se procesa el **primer pedido** (`"Camiseta JavaScript"`) con `await`.
3. Solo cuando el primer pedido termina, se procesa el **segundo pedido** (`"Sticker HTML5"`).
4. Se muestra el mensaje final cuando **ambos han sido procesados**.
5. Si alguno falla, el `try...catch` lo captura.

### 🧠 Ventajas:

- ✅ El orden es **100% controlado**.
- ✅ El código es **limpio y legible**, sin anidamientos.
- ✅ Se puede ampliar fácilmente a 3, 4, o más pasos.

### 📦 Salida esperada en consola:

```
🛒 Recibido pedido: Camiseta JavaScript
✅ Pedido "Camiseta JavaScript" procesado correctamente.
📦 Pedido 1 listo: Camiseta JavaScript

🛒 Recibido pedido: Sticker HTML5
✅ Pedido "Sticker HTML5" procesado correctamente.
📦 Pedido 2 listo: Sticker HTML5

🎉 Todos los pedidos fueron procesados exitosamente.

```

Ahora vamos a usar **`Promise.all()`** para **procesar varios pedidos al mismo tiempo**, es decir, **en paralelo**, en lugar de uno tras otro como hicimos antes con `await`.

## 🎯 Objetivo:

Procesar múltiples pedidos de forma **concurrente**, y mostrar **cuánto tardan en total** comparado con el modo secuencial.

## ✅ Código completo con `Promise.all()` y comparación de tiempos

```jsx
// Simulamos una operación asincrónica que tarda 2 segundos por pedido
function procesarPedido(pedido) {
  console.log(`🛒 Recibido pedido: ${pedido}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Pedido "${pedido}" procesado.`);
      resolve(pedido);
    }, 2000);
  });
}

// Función asincrónica para procesar múltiples pedidos en paralelo
async function ejecutarPedidosEnParalelo() {
  const pedidos = ["Camiseta JS", "Sticker HTML5", "Gorra CSS"];

  console.log("⏱ Iniciando procesamiento en paralelo...\n");

  const inicio = Date.now(); // Marcamos el tiempo de inicio

  try {
    // Lanzamos todos los pedidos al mismo tiempo
    const resultados = await Promise.all(
      pedidos.map((p) => procesarPedido(p))
    );

    const fin = Date.now(); // Tiempo al finalizar

    console.log("\n📦 Todos los pedidos fueron procesados:");
    resultados.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p}`);
    });

    const duracion = ((fin - inicio) / 1000).toFixed(2);
    console.log(`⏳ Tiempo total: ${duracion} segundos`);
  } catch (error) {
    console.error("❌ Ocurrió un error al procesar los pedidos:", error);
  }
}

ejecutarPedidosEnParalelo();

```

### 🔍 ¿Qué pasa aquí?

1. Creamos un array de pedidos (`["Camiseta JS", "Sticker HTML5", "Gorra CSS"]`).
2. Con `Promise.all()` y `.map()`, **disparamos todas las promesas a la vez**.
3. `await Promise.all(...)` espera a que **todas las promesas terminen**.
4. Luego imprimimos los resultados y el **tiempo total**.

### 🧠 Comparación de tiempos

- Cada pedido tarda **2 segundos**.
- En modo secuencial (con `await` uno tras otro), serían: **2s + 2s + 2s = 6s** aprox.
- En modo paralelo (`Promise.all()`), tardan: **≈ 2s en total** 🔥

### 📦 Resultado esperado:

```
⏱ Iniciando procesamiento en paralelo...

🛒 Recibido pedido: Camiseta JS
🛒 Recibido pedido: Sticker HTML5
🛒 Recibido pedido: Gorra CSS
✅ Pedido "Camiseta JS" procesado.
✅ Pedido "Sticker HTML5" procesado.
✅ Pedido "Gorra CSS" procesado.

📦 Todos los pedidos fueron procesados:
  1. Camiseta JS
  2. Sticker HTML5
  3. Gorra CSS
⏳ Tiempo total: 2.00 segundos

```

Ahora vamos a usar **`Promise.race()`**, que nos permite lanzar varias promesas al mismo tiempo, **pero solo se resuelve (o rechaza) con la primera que termine**, sin importar si fue la más rápida o la más lenta.

## 🎯 Objetivo:

Simular una carrera entre pedidos y actuar **solo con el primero que se procese**, ignorando el resto.

## ✅ Código completo con `Promise.race()` y comentarios línea por línea

```jsx
// Simulamos un pedido que tarda entre 1 y 5 segundos aleatoriamente
function procesarPedido(pedido) {
  const tiempo = Math.floor(Math.random() * 5000) + 1000; // entre 1 y 5 segundos

  console.log(`🛒 Pedido "${pedido}" recibido. Tardará ${tiempo}ms.`);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ Pedido "${pedido}" completado en ${tiempo}ms`);
    }, tiempo);
  });
}

// Función principal usando Promise.race
async function ejecutarCarreraDePedidos() {
  const pedidos = ["Camiseta JS", "Sticker CSS", "Taza HTML"];

  console.log("🏁 Iniciando carrera de pedidos...\n");

  try {
    // Solo se resuelve el primer pedido que termine
    const ganador = await Promise.race(
      pedidos.map((p) => procesarPedido(p))
    );

    console.log(`\n🎉 El primer pedido en completarse fue:\n${ganador}`);
  } catch (error) {
    console.error("❌ Ocurrió un error:", error);
  }
}

ejecutarCarreraDePedidos();

```

## 🔍 ¿Qué ocurre aquí?

1. Cada pedido simula un tiempo aleatorio (1 a 5 segundos).
2. Todos se lanzan **al mismo tiempo**.
3. **`Promise.race()` resuelve con la primera promesa que termine**.
4. Imprimimos solo el resultado del más rápido.

### 📦 Resultado ejemplo:

```
🏁 Iniciando carrera de pedidos...

🛒 Pedido "Camiseta JS" recibido. Tardará 3763ms.
🛒 Pedido "Sticker CSS" recibido. Tardará 1285ms.
🛒 Pedido "Taza HTML" recibido. Tardará 2214ms.

🎉 El primer pedido en completarse fue:
✅ Pedido "Sticker CSS" completado en 1285ms

```

### 🧠 ¿Cuándo usar `Promise.race()`?

- Cuando necesitas **la primera respuesta disponible**, no todas.
- Para implementar **timeouts personalizados**.
- Para elegir **la API o servidor más rápido** entre varias opciones.

Ahora vamos a combinar `**Promise.race()**` con un **timeout manual**, una técnica muy útil para **cancelar procesos lentos** si no responden a tiempo.

## 🎯 Objetivo:

Simular una petición (por ejemplo a una API) y **cancelarla si tarda más de 3 segundos**, mostrando un mensaje de error si se excede ese tiempo.

## ✅ Código completo con `Promise.race()` + timeout manual (comentado línea por línea)

```jsx
// Simulamos una petición asincrónica que tarda entre 2 y 5 segundos
function peticionLenta() {
  const tiempo = Math.floor(Math.random() * 3000) + 2000; // entre 2000ms y 5000ms

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ Respuesta recibida en ${tiempo}ms`);
    }, tiempo);
  });
}

// Promesa de timeout: se rechaza después de cierto tiempo
function crearTimeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(`⏰ Tiempo de espera excedido: ${ms}ms`);
    }, ms);
  });
}

// Función principal que usa Promise.race para elegir entre la petición o el timeout
async function ejecutarPeticionConTimeout() {
  console.log("🚀 Iniciando petición...");

  try {
    // Solo se resolverá la promesa que termine primero: la petición o el timeout
    const resultado = await Promise.race([
      peticionLenta(),      // Operación lenta
      crearTimeout(3000)    // Tiempo máximo permitido: 3 segundos
    ]);

    console.log(resultado);
  } catch (error) {
    // Se ejecuta si gana el timeout
    console.error("❌ Error:", error);
  }
}

ejecutarPeticionConTimeout();

```

## 🔍 ¿Qué ocurre aquí?

1. `peticionLenta()` tarda **entre 2 y 5 segundos**.
2. `crearTimeout(3000)` se **rechaza** si pasan más de **3 segundos**.
3. `Promise.race()` **espera la primera promesa que termine**:
    - Si la petición termina antes de 3s → `.then()`
    - Si tarda más → gana el timeout → `.catch()`

## 📦 Posibles resultados:

### Si la petición fue rápida (menos de 3s):

```
🚀 Iniciando petición...
✅ Respuesta recibida en 2481ms

```

### Si fue lenta (más de 3s):

```
🚀 Iniciando petición...
❌ Error: ⏰ Tiempo de espera excedido: 3000ms

```

## ✅ ¿Por qué es útil esta técnica?

- Para evitar que la app se quede esperando eternamente.
- Para mejorar la **experiencia del usuario**.
- Para evitar errores o congelamientos por **APIs lentas o sin respuesta**.

## Callbacks en métodos de arrays

Vamos a ver cómo se usan los **callbacks en los métodos de arrays** más comunes en JavaScript: `forEach`, `map`, `filter` y `reduce`.

## 🧠 ¿Qué es un callback en este contexto?

Cuando usas métodos como `.map()`, `.filter()`, etc., **le pasas una función como argumento**. Esa función es el **callback**, y el array **la ejecuta automáticamente** para cada elemento.

## ✅ 1. `.forEach()` – Recorrer un array y hacer algo con cada elemento

```jsx
const frutas = ["manzana", "plátano", "naranja"];

// Recorremos cada fruta usando un callback
frutas.forEach((fruta, indice) => {
  console.log(`${indice + 1}. ${fruta}`);
});

```

### 🔍 Qué pasa aquí:

- `.forEach()` **no devuelve nada**.
- Solo ejecuta el **callback** una vez por cada elemento.
- Puedes acceder al **valor** y al **índice**.

## ✅ 2. `.map()` – Crear un nuevo array a partir del original

```jsx
const numeros = [1, 2, 3, 4];

// Usamos map para duplicar cada número
const duplicados = numeros.map((num) => {
  return num * 2;
});

console.log(duplicados); // [2, 4, 6, 8]

```

### 🔍 Qué hace `.map()`:

- Devuelve un **nuevo array**.
- El **callback devuelve el valor transformado** de cada elemento.

## ✅ 3. `.filter()` – Crear un nuevo array con elementos que cumplen una condición

```jsx
const edades = [12, 18, 25, 8, 30];

// Filtramos solo mayores de edad
const mayores = edades.filter((edad) => {
  return edad >= 18;
});

console.log(mayores); // [18, 25, 30]

```

### 🔍 Qué hace `.filter()`:

- Devuelve un nuevo array **solo con los elementos que cumplen la condición** (el callback debe retornar `true` o `false`).

## ✅ 4. `.reduce()` – Reducir un array a un solo valor (acumulador)

```jsx
const precios = [10, 20, 15];

// Sumamos todos los precios
const total = precios.reduce((acumulador, precio) => {
  return acumulador + precio;
}, 0); // 0 es el valor inicial

console.log(`Total: ${total} €`);

```

### 🔍 Qué hace `.reduce()`:

- Recorre el array acumulando un valor.
- En cada paso:
    - `acumulador` guarda el resultado parcial.
    - `precio` es el valor actual.
- Devuelve **un único valor final**.

## 📦 Resumen visual:

| Método | Devuelve | Usos comunes |
| --- | --- | --- |
| `forEach` | Nada | Mostrar cosas en consola, DOM, etc. |
| `map` | Nuevo array | Transformar valores |
| `filter` | Nuevo array | Eliminar/seleccionar elementos |
| `reduce` | Un solo valor | Totales, sumas, objetos acumulados |

### Ejemplos prácticos reales:

## ✅ Parte 1: Calcular estadísticas de usuarios (con `filter`, `map` y `reduce`)

### 🧾 Supuesto: tenemos una lista de usuarios con edad, y queremos:

- Filtrar los mayores de edad.
- Obtener sus nombres.
- Calcular la edad promedio.

### 📦 Código comentado paso por paso:

```jsx
// Lista de usuarios con nombre y edad
const usuarios = [
  { nombre: "Ana", edad: 17 },
  { nombre: "Luis", edad: 22 },
  { nombre: "Carlos", edad: 30 },
  { nombre: "Marta", edad: 15 },
  { nombre: "Lucía", edad: 25 }
];

// 1. Filtramos solo los mayores de edad (edad >= 18)
const mayores = usuarios.filter(usuario => usuario.edad >= 18);

console.log("👤 Usuarios mayores de edad:");
mayores.forEach(usuario => console.log(`- ${usuario.nombre}, ${usuario.edad} años`));

// 2. Creamos un array con solo los nombres
const nombres = mayores.map(usuario => usuario.nombre);

console.log("\n📋 Nombres de mayores:", nombres);

// 3. Calculamos la edad promedio con reduce
const totalEdad = mayores.reduce((acum, usuario) => acum + usuario.edad, 0);
const promedioEdad = (totalEdad / mayores.length).toFixed(1);

console.log(`\n📊 Edad promedio: ${promedioEdad} años`);

```

### ✅ Salida esperada:

```
👤 Usuarios mayores de edad:
- Luis, 22 años
- Carlos, 30 años
- Lucía, 25 años

📋 Nombres de mayores: [ 'Luis', 'Carlos', 'Lucía' ]

📊 Edad promedio: 25.7 años

```

### ¿Qué aprendiste aquí?

- `filter()` para seleccionar usuarios.
- `map()` para extraer valores.
- `reduce()` para sumar y calcular promedio.

 Ahora, continuamos con la **Parte 2: Transformar una lista de productos**, aplicando `map()` para **crear un nuevo array con precios con IVA** y otra presentación **más legible para mostrar en pantalla o carrito**.

## 🧾 Supuesto: tenemos una lista de productos con nombre y precio base (sin impuestos), y queremos:

- Calcular el **precio con IVA (21%)**
- Formatear los datos para mostrarlos como en una factura o carrito

## ✅ Código completo y comentado línea por línea:

```jsx
// Lista de productos con nombre y precio sin IVA
const productos = [
  { nombre: "Teclado", precio: 25 },
  { nombre: "Ratón", precio: 15 },
  { nombre: "Monitor", precio: 120 },
  { nombre: "Auriculares", precio: 45 }
];

// 1. Creamos un nuevo array con precio con IVA (21%) usando map()
const productosConIVA = productos.map(producto => {
  const precioConIVA = (producto.precio * 1.21).toFixed(2); // 21% de IVA
  return {
    ...producto, // copiamos las propiedades originales
    precioConIVA: parseFloat(precioConIVA) // añadimos nueva propiedad
  };
});

console.log("🛒 Productos con IVA:");
productosConIVA.forEach(p => {
  console.log(`- ${p.nombre}: ${p.precio}€ + IVA = ${p.precioConIVA}€`);
});

// 2. Creamos una representación para ticket o pantalla de compra
const formatoTicket = productosConIVA.map(p => {
  return `${p.nombre.padEnd(15)} ......... ${p.precioConIVA} €`;
});

console.log("\n🧾 Formato para ticket:");
formatoTicket.forEach(linea => console.log(linea));

```

## ✅ Salida esperada:

```
🛒 Productos con IVA:
- Teclado: 25€ + IVA = 30.25€
- Ratón: 15€ + IVA = 18.15€
- Monitor: 120€ + IVA = 145.20€
- Auriculares: 45€ + IVA = 54.45€

🧾 Formato para ticket:
Teclado         ......... 30.25 €
Ratón           ......... 18.15 €
Monitor         ......... 145.2 €
Auriculares     ......... 54.45 €

```

### ✅ ¿Qué aprendiste aquí?

- A usar `.map()` para **crear un nuevo array transformado** sin modificar el original.
- A usar `padEnd()` y `toFixed()` para mejorar la presentación.
- A formatear objetos para distintos fines (cálculo + visualización).

Ahora, vamos ahora con la **Parte 3**, donde usaremos `.reduce()` para **agrupar productos por categoría** y **contar cuántos hay de cada tipo**.

## 🧾 Supuesto real:

Tenemos un array de productos, cada uno con un nombre y una categoría.

Queremos:

1. Agruparlos por categoría (como si fueran secciones de una tienda).
2. Contar cuántos productos hay en cada categoría.

## ✅ Código completo comentado paso por paso:

```jsx
// Lista de productos con categorías
const productos = [
  { nombre: "Teclado", categoria: "Periféricos" },
  { nombre: "Ratón", categoria: "Periféricos" },
  { nombre: "Monitor", categoria: "Pantallas" },
  { nombre: "Auriculares", categoria: "Audio" },
  { nombre: "Altavoces", categoria: "Audio" },
  { nombre: "Micrófono", categoria: "Audio" },
  { nombre: "Tablet", categoria: "Pantallas" }
];

// 1. Agrupamos productos por categoría usando reduce
const agrupados = productos.reduce((resultado, producto) => {
  const { categoria, nombre } = producto;

  // Si no existe la categoría, la inicializamos como array vacío
  if (!resultado[categoria]) {
    resultado[categoria] = [];
  }

  // Añadimos el producto al array correspondiente
  resultado[categoria].push(nombre);

  return resultado; // Devolvemos el acumulador
}, {}); // Valor inicial: objeto vacío

console.log("📦 Productos agrupados por categoría:\n");
for (const categoria in agrupados) {
  console.log(`📂 ${categoria}:`);
  agrupados[categoria].forEach(producto => {
    console.log(`   - ${producto}`);
  });
}

// 2. Contamos cuántos hay por categoría
const conteo = productos.reduce((contador, producto) => {
  const cat = producto.categoria;
  contador[cat] = (contador[cat] || 0) + 1;
  return contador;
}, {});

console.log("\n📊 Cantidad de productos por categoría:\n", conteo);

```

### ✅ Salida esperada:

```
📦 Productos agrupados por categoría:

📂 Periféricos:
   - Teclado
   - Ratón
📂 Pantallas:
   - Monitor
   - Tablet
📂 Audio:
   - Auriculares
   - Altavoces
   - Micrófono

📊 Cantidad de productos por categoría:
{
  Periféricos: 2,
  Pantallas: 2,
  Audio: 3
}

```

### ✅ ¿Qué aprendiste aquí?

- `.reduce()` no solo sirve para sumar números: también puedes construir **estructuras complejas como objetos agrupados**.
- Puedes usarlo para **agrupar elementos por categoría**, **contar ocurrencias**, etc.
- Esta técnica es muy usada en dashboards, reportes, e-commerce y filtros avanzados.

## Callbacks y manejo de Errores

A diferencia de `try...catch` en código síncrono, los **callbacks suelen manejar errores usando el primer parámetro** de la función: si hay error, ese argumento no es `null`.

### 🧠 Concepto básico:

Cuando usas callbacks en funciones asincrónicas, es común seguir el patrón:

```
callback(error, resultado);

```

Si **ocurre un error**, el primer argumento (`error`) es un objeto o mensaje.

Si **no hay error**, ese valor es `null`, y el segundo parámetro tiene el resultado.

## ✅ Ejemplo real simulado: leer un archivo (simulado con setTimeout)

```jsx
// Simulamos una función asincrónica que "lee un archivo"
function leerArchivo(nombre, callback) {
  setTimeout(() => {
    // Simulamos un error si el archivo no existe
    if (nombre !== "datos.txt") {
      // El primer parámetro representa el error
      return callback("❌ Archivo no encontrado", null);
    }

    // Si todo va bien, el error es null y enviamos el contenido
    const contenido = "Este es el contenido del archivo";
    callback(null, contenido);
  }, 1000); // Simula retraso de 1 segundo
}

// Usamos el callback para manejar resultado o error
leerArchivo("datos.txt", (error, resultado) => {
  if (error) {
    // Si hay error, lo mostramos
    console.error("Error:", error);
    return;
  }

  // Si todo va bien, mostramos el contenido
  console.log("✅ Archivo leído correctamente:");
  console.log(resultado);
});

```

### ✅ ¿Qué hace este ejemplo?

- Simula una función que lee un archivo.
- Si el nombre del archivo **no es el esperado**, lanza un error (`error ≠ null`).
- El **callback decide qué hacer** dependiendo si `error` existe o no.

## 📌 Resultado en consola:

```
✅ Archivo leído correctamente:
Este es el contenido del archivo

```

...o, si pruebas con `"otro.txt"`:

```
Error: ❌ Archivo no encontrado

```

## Funciones de Retry

## 🧠 ¿Qué es `retry()`?

Es una función que **reintenta automáticamente** una operación fallida, por ejemplo, hasta 3 veces, con cierto intervalo de tiempo.

Esto es útil cuando trabajamos con **errores intermitentes**, como en conexiones de red o lectura de archivos.

## ✅ Ejemplo práctico: Reintentar leer un archivo con callback

```jsx
// Simulamos una función que a veces falla al leer un archivo
function leerArchivo(nombre, callback) {
  setTimeout(() => {
    const falloAleatorio = Math.random() < 0.5; // 50% de fallar

    if (falloAleatorio || nombre !== "datos.txt") {
      return callback("❌ Error al leer el archivo", null);
    }

    const contenido = "📄 Contenido del archivo leído correctamente";
    callback(null, contenido);
  }, 500); // Simula retardo
}

```

### ✅ Creamos la función `retry`

```jsx
function retry(fn, maxIntentos, delay, callback) {
  let intentos = 0;

  function intentar() {
    intentos++;

    fn((error, resultado) => {
      if (!error) {
        // Si no hay error, devolvemos el resultado
        return callback(null, resultado);
      }

      if (intentos >= maxIntentos) {
        // Si se exceden los intentos, devolvemos el error final
        return callback(`❌ Falló tras ${intentos} intentos: ${error}`, null);
      }

      console.warn(`⚠️ Intento ${intentos} fallido. Reintentando en ${delay}ms...`);
      setTimeout(intentar, delay); // Reintenta después del delay
    });
  }

  intentar(); // Inicia el primer intento
}

```

### ✅ Usamos `retry()` para ejecutar `leerArchivo`

```jsx
// Empaquetamos la función original para adaptarla a retry
function tarea(callback) {
  leerArchivo("datos.txt", callback);
}

// Reintentamos hasta 3 veces con 1 segundo de espera entre intentos
retry(tarea, 3, 1000, (error, resultado) => {
  if (error) {
    console.error(error); // Error final tras reintentos
    return;
  }

  console.log("✅ Éxito:", resultado);
});

```

## 🧪 Posible salida (dependiendo del azar):

```
⚠️ Intento 1 fallido. Reintentando en 1000ms...
⚠️ Intento 2 fallido. Reintentando en 1000ms...
✅ Éxito: 📄 Contenido del archivo leído correctamente

```

o...

```
⚠️ Intento 1 fallido. Reintentando en 1000ms...
⚠️ Intento 2 fallido. Reintentando en 1000ms...
⚠️ Intento 3 fallido. Reintentando en 1000ms...
❌ Falló tras 3 intentos: ❌ Error al leer el archivo

```

### ✅ ¿Qué aprendiste aquí?

- A implementar `retry()` en funciones basadas en **callbacks**.
- A manejar errores intermitentes de forma elegante y controlada.
- A separar la lógica de reintento de la lógica de la tarea.

## Paralelismo controlado

## 🧠 ¿Qué es el paralelismo controlado?

JavaScript permite ejecutar tareas **en paralelo** (por ejemplo, múltiples peticiones fetch al mismo tiempo).

Sin embargo, lanzar **demasiadas al mismo tiempo puede saturar la red o el servidor**.

El **paralelismo controlado** significa:

- Ejecutar **un número limitado de tareas a la vez**.
- Esperar a que se libere un "slot" para lanzar la siguiente tarea.
- Controlar errores y aplicar `retry()` si algo falla.

Esto es muy útil, por ejemplo, en:

- Descarga de muchos archivos.
- Llamadas API masivas.
- Procesos asincrónicos como `fetch`, lectura de archivos, etc.

## ✅ Ejemplo real: Descargar 5 archivos, máximo 2 en paralelo, con retry

### Paso 1: función simulada de descarga con fallo aleatorio

```jsx
function descargarArchivo(id) {
  return new Promise((resolve, reject) => {
    const tiempo = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      if (Math.random() < 0.3) {
        // 30% de fallar
        reject(`❌ Falló descarga del archivo ${id}`);
      } else {
        resolve(`✅ Archivo ${id} descargado en ${tiempo}ms`);
      }
    }, tiempo);
  });
}

```

### Paso 2: función retry para promesas

```jsx
async function retryPromesa(fn, intentos = 3, delay = 1000) {
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (error) {
      console.warn(`⚠️ Intento ${i + 1} fallido: ${error}`);
      if (i < intentos - 1) await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error("❌ Todos los intentos fallaron");
}

```

### Paso 3: ejecución con paralelismo controlado (máximo 2 a la vez)

```jsx
async function ejecutarConParalelismo(tareas, limite = 2) {
  const resultados = [];
  let index = 0;

  // Ejecuta una tarea, y cuando termina, lanza la siguiente
  async function ejecutarSiguiente() {
    if (index >= tareas.length) return;

    const actual = index++;
    try {
      const resultado = await tareas[actual]();
      resultados[actual] = resultado;
    } catch (error) {
      resultados[actual] = error.message || String(error);
    }

    // Ejecuta la siguiente en cola
    await ejecutarSiguiente();
  }

  // Iniciamos "limite" tareas paralelas
  const procesos = [];
  for (let i = 0; i < limite; i++) {
    procesos.push(ejecutarSiguiente());
  }

  await Promise.all(procesos);
  return resultados;
}

```

### Paso 4: definimos tareas y lanzamos todo

```jsx
(async () => {
  const tareas = [];

  for (let i = 1; i <= 5; i++) {
    // Cada tarea se envuelve en retry
    tareas.push(() => retryPromesa(() => descargarArchivo(i)));
  }

  console.log("📦 Descargando archivos con máximo 2 en paralelo...\n");

  const resultados = await ejecutarConParalelismo(tareas, 2);

  resultados.forEach((res, i) => {
    console.log(`Archivo ${i + 1}:`, res);
  });
})();

```

## 🧠 ¿Qué aprendiste?

- Puedes **combinar `retry()` con ejecución paralela**.
- Puedes **limitar el número de tareas en paralelo** para evitar cuellos de botella.
- Aprendiste a **encolar tareas y controlar errores asíncronos** de forma profesional.

## Practica mini APP de descarga masiva

Ahora, vamos a construir una **mini app en JavaScript puro** que simula la descarga masiva de imágenes desde URLs, utilizando:

- ✅ `Promise.all` y paralelismo controlado (máximo 3 imágenes a la vez).
- ✅ Retry automático en caso de fallo de descarga.
- ✅ Renderizado visual de las imágenes en pantalla.
- ✅ Comentarios línea por línea para entenderlo todo.

### 🧱 Paso 1: HTML básico (`index.html`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Descarga Masiva de Imágenes</title>
  <style>
    .galeria img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      margin: 10px;
      border: 2px solid #ccc;
    }
    .status {
      font-family: monospace;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>🖼️ Descarga Masiva de Imágenes</h1>
  <div class="galeria" id="galeria"></div>
  <div class="status" id="estado"></div>

  <script src="main.js"></script>
</body>
</html>

```

### 🧠 Paso 2: JavaScript con control de paralelismo y retry (`main.js`)

```jsx
// Lista de URLs de imágenes simuladas (algunas fallarán)
const urls = [
  "https://picsum.photos/id/10/300",
  "https://picsum.photos/id/20/300",
  "https://picsum.photos/id/30/300",
  "https://picsum.photos/id/999/300", // esta probablemente falla
  "https://picsum.photos/id/50/300",
  "https://picsum.photos/id/60/300"
];

// Simula descarga con posible error (30% de fallo aleatorio)
function descargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url + "?rand=" + Math.random(); // evitar cache

    img.onload = () => resolve(img);
    img.onerror = () => reject(`❌ Error al cargar: ${url}`);
  });
}

// Retry automático: reintenta hasta 3 veces con espera entre intentos
async function retry(fn, intentos = 3, delay = 1000) {
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`⚠️ Reintento ${i + 1} fallido`);
      if (i < intentos - 1) await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error("❌ Todos los intentos fallaron");
}

// Lógica de paralelismo controlado
async function procesarEnParalelo(tareas, limite = 3) {
  const resultados = [];
  let index = 0;

  async function ejecutarSiguiente() {
    if (index >= tareas.length) return;

    const actual = index++;
    try {
      resultados[actual] = await tareas[actual]();
    } catch (err) {
      resultados[actual] = err;
    }

    await ejecutarSiguiente(); // Lanzar el siguiente
  }

  // Lanzamos hasta 'limite' tareas simultáneas
  const lotes = [];
  for (let i = 0; i < limite; i++) {
    lotes.push(ejecutarSiguiente());
  }

  await Promise.all(lotes);
  return resultados;
}

// Función principal
(async () => {
  const galeria = document.getElementById("galeria");
  const estado = document.getElementById("estado");

  // Creamos tareas: cada una intenta descargar y mostrar una imagen
  const tareas = urls.map((url, i) => async () => {
    estado.textContent = `⏳ Descargando imagen ${i + 1} de ${urls.length}...`;

    const img = await retry(() => descargarImagen(url));
    galeria.appendChild(img);

    return `✅ Imagen ${i + 1} cargada`;
  });

  try {
    const resultados = await procesarEnParalelo(tareas, 3);
    estado.textContent = "✅ Todas las imágenes procesadas";
    resultados.forEach((r, i) => console.log(`Imagen ${i + 1}:`, r));
  } catch (e) {
    estado.textContent = "❌ Error en la descarga masiva";
    console.error(e);
  }
})();

```

## 🧪 ¿Qué verás al ejecutar?

- Se descargan hasta **3 imágenes en paralelo**.
- Cada imagen puede fallar, y en ese caso **se reintenta hasta 3 veces**.
- Si alguna falla después de todos los intentos, se captura y se continúa con las demás.
- Las imágenes exitosas se muestran en pantalla.

### ✅ ¿Qué aprendiste?

- Cómo aplicar **retry automático** en operaciones reales.
- Cómo controlar el **paralelismo** en descargas masivas.
- Cómo integrar todo en una **mini app real y visual**.

Ahora, vamos a **mejorar la mini app de descarga masiva de imágenes** con:

1. ✅ Una **barra de progreso global** para ver el avance en tiempo real.
2. ❌ Mensajes de **error individuales** si una imagen no se puede cargar, incluso después de los reintentos.

### 🧱 Paso 1: Añadir la barra de progreso al HTML

Modifica el archivo `index.html`:

```html
<body>
  <h1>🖼️ Descarga Masiva de Imágenes</h1>

  <!-- Barra de progreso -->
  <progress id="progreso" max="100" value="0" style="width: 100%; height: 20px;"></progress>
  <div class="status" id="estado"></div>

  <div class="galeria" id="galeria"></div>
  <script src="main.js"></script>
</body>

```

### 🧠 Paso 2: JavaScript mejorado en `main.js`

Aquí está el código actualizado y comentado línea por línea:

```jsx
const urls = [
  "https://picsum.photos/id/10/300",
  "https://picsum.photos/id/20/300",
  "https://picsum.photos/id/30/300",
  "https://picsum.photos/id/999/300", // Fallará
  "https://picsum.photos/id/50/300",
  "https://picsum.photos/id/60/300"
];

function descargarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url + "?rand=" + Math.random();

    img.onload = () => resolve(img);
    img.onerror = () => reject(`❌ Error al cargar: ${url}`);
  });
}

async function retry(fn, intentos = 3, delay = 1000) {
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i < intentos - 1) {
        console.warn(`⚠️ Reintento ${i + 1}...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  throw new Error("❌ Todos los intentos fallaron");
}

async function procesarEnParalelo(tareas, limite = 3) {
  const resultados = [];
  let index = 0;

  async function ejecutarSiguiente() {
    if (index >= tareas.length) return;

    const actual = index++;
    try {
      resultados[actual] = await tareas[actual](actual);
    } catch (err) {
      resultados[actual] = err;
    }

    await ejecutarSiguiente();
  }

  const lotes = [];
  for (let i = 0; i < limite; i++) {
    lotes.push(ejecutarSiguiente());
  }

  await Promise.all(lotes);
  return resultados;
}

// Función principal con barra de progreso
(async () => {
  const galeria = document.getElementById("galeria");
  const estado = document.getElementById("estado");
  const progreso = document.getElementById("progreso");

  let completadas = 0;
  const total = urls.length;

  const tareas = urls.map((url, i) => async (i) => {
    estado.textContent = `🔄 Procesando imagen ${i + 1} de ${total}...`;

    try {
      const img = await retry(() => descargarImagen(url));
      galeria.appendChild(img);
      console.log(`✅ Imagen ${i + 1} descargada`);
    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.textContent = `❌ Imagen ${i + 1} falló: ${error.message}`;
      errorMsg.style.color = "red";
      galeria.appendChild(errorMsg);
      console.error(error.message);
    }

    completadas++;
    progreso.value = (completadas / total) * 100;
  });

  await procesarEnParalelo(tareas, 3);
  estado.textContent = "✅ Descarga completa";
})();

```

## 🧪 ¿Qué verás ahora?

- Una **barra de progreso** que avanza a medida que se descargan imágenes.
- Si alguna imagen falla tras 3 intentos, aparece un mensaje de error en rojo en la galería.
- Consola con logs detallados para desarrolladores.