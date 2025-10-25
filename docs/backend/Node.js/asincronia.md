# Fundamentos de asincronía en Node.js

# MÓDULO 3: Fundamentos de asincronía en Node.js

## ¿Por qué es tan importante la asincronía en Node.js?

Node.js fue diseñado para ser **rápido y eficiente**, pero no porque tenga múltiples hilos como otros lenguajes. Lo que lo hace especial es su capacidad para **hacer muchas cosas al mismo tiempo sin bloquearse**, gracias a un modelo de ejecución basado en eventos y asincronía.

Este módulo te enseñará cómo funcionan los **callbacks**, las **promesas** y el sistema de ejecución conocido como **event loop**. También aprenderás a trabajar con funciones asíncronas modernas como `async/await` de forma clara y progresiva.

## Callback: el punto de partida

En Node.js, muchas funciones que acceden al sistema (como leer un archivo) **no se ejecutan inmediatamente**, sino que **se programan para ejecutarse después**. Esto se hace mediante callbacks: funciones que se ejecutan cuando otra tarea termina.

Veamos un ejemplo práctico leyendo un archivo de forma asíncrona:

```jsx
// leerArchivo.js
const fs = require("fs");

fs.readFile("ejemplo.txt", "utf8", (error, datos) => {
  if (error) {
    console.error("❌ Error al leer el archivo:", error.message);
    return;
  }
  console.log("📄 Contenido del archivo:", datos);
});

console.log("✅ Archivo solicitado. Esperando resultados...");
```

Cuando ejecutas este código, **el programa no se detiene** mientras se lee el archivo. Continúa y luego ejecuta el callback cuando el archivo ya está disponible. Esa es la esencia de la asincronía en Node.js.

## El problema del “callback hell”

Aunque los callbacks son muy útiles, cuando los anidas demasiado se vuelven caóticos. A eso se le llama **callback hell**.

```jsx
fs.readFile("uno.txt", "utf8", (err1, data1) => {
  fs.readFile("dos.txt", "utf8", (err2, data2) => {
    fs.readFile("tres.txt", "utf8", (err3, data3) => {
      console.log("Archivos leídos:", data1, data2, data3);
    });
  });
});
```

Este tipo de código es difícil de leer y mantener. Para resolverlo, surgieron las **promesas**.

## Promesas: una forma más limpia

Las promesas son objetos que representan el resultado de una operación asíncrona. Te permiten encadenar acciones sin caer en la anidación excesiva.

```jsx
const fs = require("fs/promises"); // Versión moderna del módulo fs

fs.readFile("ejemplo.txt", "utf8")
  .then((datos) => {
    console.log("✅ Contenido del archivo:", datos);
  })
  .catch((error) => {
    console.error("❌ Error al leer el archivo:", error.message);
  });
```

Esto hace que el código sea más limpio, legible y fácil de manejar. Además, al usar `.catch()`, gestionamos los errores de forma más centralizada.

## Async/Await: promesas aún más fáciles

`async/await` es una forma moderna de trabajar con promesas como si fueran operaciones secuenciales, **sin bloquear el hilo principal**.

```jsx
const fs = require("fs/promises");

async function mostrarContenido() {
  try {
    const datos = await fs.readFile("ejemplo.txt", "utf8");
    console.log("📄 Contenido:", datos);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

mostrarContenido();
```

Visualmente se parece a código sincrónico, pero internamente sigue siendo asíncrono y no bloqueante. Esto mejora la legibilidad sin perder rendimiento.

## ¿Cómo funciona todo esto por dentro?

Node.js no ejecuta varias cosas "a la vez" como un navegador multihilo. En su lugar, tiene un único hilo que sigue un ciclo de eventos llamado **Event Loop**. Este ciclo revisa constantemente si hay tareas pendientes que deben ejecutarse, como leer un archivo o esperar una respuesta de red.

Piensa en él como un recepcionista muy eficiente: recibe tareas, las delega (a la cocina, al servicio técnico, etc.), y cuando esas tareas están listas, las vuelve a recoger para entregártelas.

## 💻 Ejercicio práctico guiado: lectura múltiple de archivos

Vamos a crear un pequeño script que lea 3 archivos usando `async/await` y muestre su contenido en orden.

### Paso 1: crea tres archivos de texto con algo dentro

```
uno.txt
dos.txt
tres.txt
```

### Paso 2: crea `lector.js`

```jsx
// lector.js
const fs = require("fs/promises");

async function leerArchivos() {
  try {
    const uno = await fs.readFile("uno.txt", "utf8");
    const dos = await fs.readFile("dos.txt", "utf8");
    const tres = await fs.readFile("tres.txt", "utf8");

    console.log("🟠 Archivo uno:", uno);
    console.log("🔵 Archivo dos:", dos);
    console.log("🟢 Archivo tres:", tres);
  } catch (error) {
    console.error("❌ Hubo un error al leer los archivos:", error.message);
  }
}

leerArchivos();
```

Este script lee los archivos en secuencia, respetando el orden. Si uno falla, se detiene y muestra el error correspondiente.

## Conclusión del módulo

Ya sabes cómo Node.js maneja la asincronía y por qué es tan potente para tareas que deben esperar resultados (como leer archivos, acceder a bases de datos o hacer peticiones HTTP). Has aprendido la evolución de los callbacks hasta llegar a `async/await`, la herramienta más cómoda y usada hoy en día.

## Recursos complementarios

- [Artículo: El event loop explicado en detalle (Fireship)](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- Documentación oficial de Promesas: [https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
