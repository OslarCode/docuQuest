# Async/Await

## 1. Async/Await

### La Evolución de la Asincronía en JavaScript

La evolución del manejo de asincronía en JavaScript ha sido un viaje desde los callbacks, que aunque poderosos, podían llevar al infame "callback hell", hasta las promesas, que introdujeron una forma más estructurada y manejable de manejar la asincronía. Sin embargo, incluso con promesas, el código puede volverse complejo y difícil de leer cuando se anidan múltiples operaciones asincrónicas. Es en este contexto que `async` y `await` emergen como herramientas revolucionarias que simplifican enormemente la escritura y lectura de código asincrónico.

### Introducción a Async/Await

`async` y `await` son características introducidas en ECMAScript 2017 (ES8). Estas palabras clave permiten escribir código asincrónico que se lee y se comporta de manera similar al código síncrono, haciendo que las operaciones asincrónicas sean más intuitivas y menos propensas a errores. `async` se utiliza para declarar funciones asincrónicas, mientras que `await` se usa dentro de estas funciones para esperar la resolución de promesas.

## ✅ ¿Qué son `async` y `await` en JavaScript?

### 🧠 Definición (sencilla):

- `async` y `await` son **palabras clave** de JavaScript que permiten escribir **código asincrónico** de forma clara, como si fuera síncrono.
- Son una **forma moderna de trabajar con Promesas**.

## 🎯 Propósito:

- Evitar el **callback hell** (anidación de funciones).
- Hacer que el código sea **más limpio, fácil de leer y mantener**.
- Reemplazar `.then()` y `.catch()` con una sintaxis más directa.

## 🔧 Requisitos:

- `await` solo se puede usar **dentro de una función marcada como `async`**.
- `await` **pausa** la ejecución de la función hasta que la Promesa se resuelve.

## ✅ Ejemplo real: obtener datos simulados de una API

```jsx
// Simulamos una función que devuelve una promesa con datos después de un tiempo
function obtenerDatosDeServidor(nombre) {
  return new Promise((resolve) => {
    // Simulamos retraso (ej. conexión lenta)
    setTimeout(() => {
      resolve(`✅ Datos recibidos de ${nombre}`);
    }, 2000);
  });
}

// Declaramos una función asincrónica usando "async"
async function iniciarDescarga() {
  console.log("📡 Iniciando descarga de datos...");

  // "await" pausa hasta que la promesa se resuelva
  const datos1 = await obtenerDatosDeServidor("servidor 1");
  console.log(datos1); // ✅ Datos recibidos de servidor 1

  const datos2 = await obtenerDatosDeServidor("servidor 2");
  console.log(datos2); // ✅ Datos recibidos de servidor 2

  const datos3 = await obtenerDatosDeServidor("servidor 3");
  console.log(datos3); // ✅ Datos recibidos de servidor 3

  console.log("🎉 Descarga completada.");
}

// Llamamos a la función asincrónica
iniciarDescarga();

```

### 🔍 ¿Qué hace el código?:

- `obtenerDatosDeServidor(...)`: simula una petición que tarda 2 segundos.
- `async function iniciarDescarga()`: define una función asincrónica.
- `await obtenerDatosDeServidor(...)`: espera a que los datos estén listos **antes de continuar**.
- `console.log(...)`: muestra el resultado como si fuera código síncrono.

## 🧩 ¿Cómo se relaciona con las Promesas?

- Cada `await` espera el **resultado de una Promesa**.
- Internamente, `async` siempre **devuelve una Promesa**.
- Puedes combinarlo con `try/catch` para manejar errores fácilmente (mucho más claro que `.catch()`).

## 2. Declaración de Funciones Asincrónicas con `async`

### Definición y Uso de `async`

La palabra clave `async` se coloca antes de la declaración de una función para convertirla en una función asincrónica. Una función marcada con `async` siempre devuelve una promesa. Si la función devuelve un valor, este se envuelve en una promesa resuelta automáticamente. Si la función arroja una excepción, esta se envuelve en una promesa rechazada.

**Sintaxis básica de `async`:**

```jsx
async function nombreFuncion() {
  // código asincrónico
}

```

### 🧪 Escenario práctico: obtener el perfil de un usuario desde un "servidor"

```jsx
// Simulamos una función que devuelve una promesa con los datos del usuario
function obtenerPerfilUsuario(id) {
  return new Promise((resolve, reject) => {
    // Simulamos una petición asincrónica que tarda 2 segundos
    setTimeout(() => {
      // Simulamos que el usuario existe si el ID es 1
      if (id === 1) {
        resolve({
          nombre: "María",
          edad: 30,
          profesion: "Desarrolladora Web"
        });
      } else {
        // Si el ID no es válido, rechazamos la promesa con un error
        reject(new Error("❌ Usuario no encontrado"));
      }
    }, 2000); // 2 segundos de espera simulada
  });
}

// Definimos una función asincrónica para usar "await"
async function mostrarPerfil(id) {
  console.log("📡 Buscando perfil del usuario...");

  try {
    // Esperamos a que se resuelva la promesa de obtenerPerfilUsuario
    const perfil = await obtenerPerfilUsuario(id);

    // Si se resuelve correctamente, mostramos los datos
    console.log("✅ Perfil encontrado:");
    console.log("Nombre:", perfil.nombre);
    console.log("Edad:", perfil.edad);
    console.log("Profesión:", perfil.profesion);
  } catch (error) {
    // Si ocurre un error (por ejemplo, usuario no encontrado), lo capturamos aquí
    console.error("Error al obtener perfil:", error.message);
  }

  console.log("🔚 Fin del proceso.");
}

// Llamamos a la función con un ID válido
mostrarPerfil(1);

// Puedes probar también con un ID no válido para forzar el error
// mostrarPerfil(99);

```

### 🔍 Qué hace este ejemplo:

- Simula una llamada real a una API con `setTimeout`.
- Usa `async/await` para escribir el código de forma clara y secuencial.
- Captura errores fácilmente con `try/catch`.
- Muestra una operación realista de cómo se usaría `async` en una app.

### Ventajas de Usar `async`

El uso de `async` en la declaración de funciones ofrece varias ventajas:

1. **Claridad y Legibilidad**: Al declarar funciones como asincrónicas, se mejora la claridad del código, indicando explícitamente que se realizarán operaciones asincrónicas dentro de la función.
2. **Manejo Implícito de Promesas**: `async` simplifica el manejo de promesas al permitir que los valores de retorno y las excepciones se manejen automáticamente como promesas resueltas o rechazadas.
3. **Compatibilidad**: `async` es compatible con todas las características modernas de JavaScript y se integra bien con otras estructuras y patrones de código.

## 3. La Palabra Clave `await`

### Definición y Uso de `await`

La palabra clave `await` se utiliza dentro de funciones asincrónicas para pausar la ejecución de la función hasta que una promesa se resuelva. Al utilizar `await`, el código parece ejecutarse de manera síncrona, lo que facilita la lectura y el mantenimiento.

**Sintaxis básica de `await`:**

```jsx
async function nombreFuncion() {
  let resultado = await promesa;
  // código que depende de la promesa resuelta
}

```

### 🎯 Ejemplo: Obtener datos climáticos simulados de una ciudad

```jsx
// Simulamos una función que devuelve una promesa con datos del clima
function obtenerClima(ciudad) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos que solo tenemos datos para "Madrid"
      if (ciudad === "Madrid") {
        resolve({
          temperatura: 25,
          estado: "Soleado",
          humedad: "40%"
        });
      } else {
        reject(new Error("No hay datos disponibles para esta ciudad"));
      }
    }, 1500); // Simulamos que tarda 1.5 segundos
  });
}

// Creamos una función asincrónica para usar "await"
async function mostrarClima(ciudad) {
  console.log(`📡 Buscando clima para ${ciudad}...`);

  try {
    // ⏳ Aquí esperamos el resultado de la promesa sin bloquear la interfaz
    const clima = await obtenerClima(ciudad);

    // ✅ Si todo va bien, mostramos los datos del clima
    console.log(`🌤️ Clima en ${ciudad}:`);
    console.log(`Temperatura: ${clima.temperatura}°C`);
    console.log(`Estado: ${clima.estado}`);
    console.log(`Humedad: ${clima.humedad}`);
  } catch (error) {
    // ❌ Si hubo un error (por ejemplo, ciudad no encontrada), lo mostramos aquí
    console.error("⚠️ Error al obtener el clima:", error.message);
  }

  console.log("✅ Consulta finalizada.\n");
}

// Ejecutamos la función con una ciudad válida
mostrarClima("Madrid");

// También puedes probar con una ciudad no disponible
// mostrarClima("Barcelona");

```

### ✅ ¿Qué aprendiste con este ejemplo?

- `await` **espera** a que se resuelva una promesa y **continúa** solo cuando tiene el resultado.
- Puedes usar `try/catch` para **capturar errores fácilmente**.
- El código se ve **más limpio y secuencial** que con `.then()` y callbacks anidados.

¿Te gustaría ahora ver un ejemplo donde usemos `await` **dentro de un bucle** o para **varias llamadas en secuencia**?

### Ventajas de Usar `await`

El uso de `await` dentro de funciones asincrónicas ofrece varias ventajas:

1. **Simplicidad y Legibilidad**: `await` hace que el código asincrónico se lea y se escriba de manera similar al código síncrono, mejorando la comprensión y el mantenimiento del código.
2. **Reducción de Anidamiento**: `await` ayuda a evitar el anidamiento excesivo de callbacks o `.then()`, conocido como "callback hell" o "pyramid of doom".
3. **Manejo de Errores Simplificado**: Los errores en funciones asincrónicas pueden manejarse fácilmente con bloques `try...catch`, proporcionando una forma más clara y coherente de gestionar excepciones.

### Ejemplo Completo con `async` y `await`

Para ilustrar el uso de `async` y `await`, consideremos un ejemplo completo en el que se obtienen datos de múltiples APIs y se combinan los resultados.

### 🎯 Ejemplo: Obtener información de un usuario y luego sus publicaciones

```jsx
// Simulamos una API que devuelve los datos de un usuario
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, nombre: "Ana", email: "ana@example.com" });
      } else {
        reject(new Error("Usuario no encontrado"));
      }
    }, 1000); // Tarda 1 segundo
  });
}

// Simulamos una API que devuelve los posts de un usuario
function obtenerPostsDeUsuario(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, titulo: "Mi primer post", contenido: "Hola mundo" },
        { id: 102, titulo: "Post sobre JavaScript", contenido: "Async/await es genial" }
      ]);
    }, 1500); // Tarda 1.5 segundos
  });
}

// Creamos una función asincrónica para orquestar todo con async/await
async function mostrarInformacionCompleta(idUsuario) {
  try {
    console.log("🔍 Buscando usuario...");

    // Esperamos a que se resuelva obtenerUsuario()
    const usuario = await obtenerUsuario(idUsuario);
    console.log(`✅ Usuario encontrado: ${usuario.nombre} (${usuario.email})`);

    console.log("📨 Obteniendo publicaciones...");

    // Esperamos a que se resuelva obtenerPostsDeUsuario()
    const posts = await obtenerPostsDeUsuario(usuario.id);
    console.log(`📝 ${usuario.nombre} ha escrito ${posts.length} publicaciones:`);

    // Mostramos cada post
    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.titulo} → ${post.contenido}`);
    });
  } catch (error) {
    // Si ocurre un error en cualquiera de las dos promesas, lo capturamos aquí
    console.error("⚠️ Error:", error.message);
  }
}

// Ejecutamos la función con un ID de usuario válido
mostrarInformacionCompleta(1);

// También puedes probar con un ID no válido para ver el manejo de errores
// mostrarInformacionCompleta(2);

```

### ✅ ¿Qué demuestra este ejemplo?

- Cómo usar `async` y `await` para **encadenar operaciones asincrónicas** de forma secuencial.
- Cómo **manejar errores fácilmente** con `try/catch`.
- Cómo **hacer el código más legible** y natural, sin `.then()` ni callbacks anidados.

Ahora, vamos a convertir el ejemplo de `async/await` en una pequeña **app visual con HTML + JavaScript** donde el usuario puede introducir un ID y ver sus datos y publicaciones simuladas. Añadiremos también interacción con el DOM y comentarios línea por línea.

### ✅ 1. HTML (interfaz sencilla con Bootstrap opcional)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Consulta de Usuario</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    .resultado { margin-top: 1rem; padding: 1rem; border: 1px solid #ccc; border-radius: 8px; }
    .error { color: red; }
  </style>
</head>
<body>
  <h1>Buscar Usuario</h1>

  <!-- Input para ingresar el ID del usuario -->
  <input type="number" id="userIdInput" placeholder="Introduce ID de usuario" />
  <button id="buscarBtn">Buscar</button>

  <!-- Contenedor para mostrar resultados -->
  <div id="resultado" class="resultado"></div>

  <!-- Conectamos el archivo JS al final del body -->
  <script src="app.js"></script>
</body>
</html>

```

### ✅ 2. JavaScript (app.js con async/await + DOM + comentarios)

```jsx
// Función simulada para obtener usuario por ID
function obtenerUsuario(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, nombre: "Ana", email: "ana@example.com" });
      } else {
        reject(new Error("Usuario no encontrado"));
      }
    }, 1000);
  });
}

// Función simulada para obtener publicaciones del usuario
function obtenerPostsDeUsuario(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 101, titulo: "Mi primer post", contenido: "Hola mundo" },
        { id: 102, titulo: "Post sobre JavaScript", contenido: "Async/await es genial" }
      ]);
    }, 1200);
  });
}

// Referencias a elementos del DOM
const input = document.getElementById("userIdInput");
const btn = document.getElementById("buscarBtn");
const resultado = document.getElementById("resultado");

// Escuchamos clic en el botón
btn.addEventListener("click", async () => {
  const id = parseInt(input.value);
  resultado.innerHTML = "⏳ Cargando información...";

  try {
    // Obtenemos los datos del usuario
    const usuario = await obtenerUsuario(id);

    // Obtenemos sus posts
    const posts = await obtenerPostsDeUsuario(usuario.id);

    // Mostramos en el DOM
    resultado.innerHTML = `
      <h2>👤 ${usuario.nombre}</h2>
      <p>Email: ${usuario.email}</p>
      <h3>📚 Publicaciones:</h3>
      <ul>
        ${posts.map(post => `<li><strong>${post.titulo}:</strong> ${post.contenido}</li>`).join("")}
      </ul>
    `;
  } catch (error) {
    // Mostramos error en el DOM
    resultado.innerHTML = `<p class="error">⚠️ ${error.message}</p>`;
  }
});

```

### 🧪 ¿Cómo probarlo?

1. Guarda el HTML como `index.html`.
2. Guarda el JavaScript como `app.js` en la misma carpeta.
3. Abre `index.html` en el navegador.
4. Escribe `1` para ver los datos correctos, o cualquier otro número para ver el mensaje de error.

## Comparación con Promesas Tradicionales

Para comprender mejor las ventajas de `async` y `await`, es útil compararlas con el manejo de promesas tradicionales. Consideremos un ejemplo de manejo de promesas tradicionales:

**Promesas Tradicionales:**

```jsx
// Función que obtiene datos de 3 APIs en paralelo
function obtenerDatosDeApis() {
  // Promise.all espera que todas las promesas dentro del array se resuelvan
  return Promise.all([
    // Se hace una petición fetch a la primera API y se transforma la respuesta en JSON
    fetch('<https://api.example.com/datos1>').then(res => res.json()),

    // Se hace lo mismo con la segunda API
    fetch('<https://api.example.com/datos2>').then(res => res.json()),

    // Y con la tercera API
    fetch('<https://api.example.com/datos3>').then(res => res.json())
  ])
  // Cuando todas las promesas se resuelven, se reciben los tres resultados como un array
  .then(([datos1, datos2, datos3]) => {
    // Se devuelve un objeto con los datos combinados para acceder más fácilmente por nombre
    return { datos1, datos2, datos3 };
  })
  // Si alguna de las promesas falla, se captura el error aquí
  .catch(error => {
    // Se muestra el error en consola
    console.error("Error al obtener datos:", error);

    // Se relanza el error para que pueda manejarse en el siguiente nivel si se desea
    throw error;
  });
}

// Llamamos a la función y mostramos los datos combinados cuando se resuelvan todas las promesas
obtenerDatosDeApis().then(datosCombinados => console.log(datosCombinados));
```

🔎 **¿Qué hace este código?**

- Llama a 3 APIs en paralelo.
- Espera que las 3 se resuelvan con `Promise.all()`.
- Devuelve un solo objeto con los datos ya convertidos a JSON.
- Captura errores globalmente en caso de que falle alguna petición.

**Async/Await:**

```jsx
// Declaramos una función asincrónica que usará async/await
async function obtenerDatosDeApis() {
  try {
    // Esperamos a que se resuelvan las tres promesas al mismo tiempo usando Promise.all
    // Cada fetch hace una solicitud a una URL y se convierte a JSON con .then(res => res.json())
    let [datos1, datos2, datos3] = await Promise.all([
      fetch('<https://api.example.com/datos1>').then(res => res.json()),
      fetch('<https://api.example.com/datos2>').then(res => res.json()),
      fetch('<https://api.example.com/datos3>').then(res => res.json())
    ]);

    // Devolvemos un objeto con los tres resultados combinados
    return { datos1, datos2, datos3 };
  } catch (error) {
    // Si alguna de las promesas falla, se captura el error aquí
    console.error("Error al obtener datos:", error);

    // Relanzamos el error para que pueda manejarse externamente si se desea
    throw error;
  }
}

// Llamamos a la función y cuando se resuelve mostramos los datos combinados por consola
obtenerDatosDeApis().then(datosCombinados => console.log(datosCombinados));
```

En este ejemplo, `async` y `await` permiten escribir el mismo código de manera más limpia y legible. La eliminación de múltiples `.then()` y `.catch()` mejora la claridad del código y facilita el manejo de errores con bloques `try...catch`.

### Async/Await y Manejo de Errores

Una de las ventajas más significativas de `async` y `await` es la facilidad con la que se pueden manejar los errores en comparación con las promesas tradicionales. Al utilizar bloques `try...catch`, el manejo de errores se vuelve más intuitivo y estructurado.

**Ejemplo de manejo de errores con async/await:**

```jsx
// Definimos una función asincrónica llamada obtenerDatos
async function obtenerDatos() {
  try {
    // Esperamos la respuesta del servidor al hacer una solicitud fetch
    let respuesta = await fetch('<https://api.example.com/datos>');

    // Verificamos si la respuesta fue exitosa (status 200–299)
    // Si no fue exitosa, lanzamos un error manualmente
    if (!respuesta.ok) {
      throw new Error('Error en la solicitud');
    }

    // Si la respuesta fue exitosa, convertimos el cuerpo de la respuesta a JSON
    let datos = await respuesta.json();

    // Devolvemos los datos obtenidos
    return datos;
  } catch (error) {
    // Si ocurre algún error (de red o del fetch), lo mostramos en consola
    console.error("Error al obtener datos:", error);

    // Lanzamos nuevamente el error para que pueda manejarse fuera de esta función
    throw error;
  }
}

// Llamamos a la función obtenerDatos()
// Si todo sale bien, se imprimen los datos en consola
obtenerDatos()
  .then(datos => console.log(datos)) // Aquí se manejan los datos si la promesa se resuelve
  .catch(error => console.error("Error en la aplicación:", error)); // Aquí se manejan los errores si la promesa fue rechazada
```

En este ejemplo, `async` y `await` se combinan con `fetch` para obtener datos de una API. El bloque `try` envuelve el código donde se espera la resolución de la promesa de `fetch`. Si la respuesta no es exitosa (`!respuesta.ok`), se lanza un error con `throw new Error('Error en la solicitud')`. Este error es capturado por el bloque `catch`, donde se maneja de manera adecuada con un mensaje de error específico y se lanza nuevamente para ser capturado por el método `.catch()` al final de la cadena de promesas.

## 4. Buenas Prácticas y Consideraciones

### Eficiencia y Rendimiento

Si bien `async` y `await` facilitan la escritura de código asincrónico, es importante tener en cuenta su impacto en el rendimiento. Las funciones marcadas con `async` y que utilizan `await` pueden pausar la ejecución, lo que puede tener implicaciones si se utilizan de manera indiscriminada en operaciones intensivas de CPU o en loops muy largos.

### Uso Correcto de `await`

Es crucial utilizar `await` solo dentro de funciones marcadas como `async`. Intentar utilizar `await` fuera de una función `async` resultará en un error de sintaxis.

### Manejo de Errores

Aunque `async` y `await` simplifican el manejo de errores con bloques `try...catch`, es importante manejar adecuadamente los errores para evitar problemas inesperados en la aplicación.

### Compatibilidad

`async` y `await` son características modernas de JavaScript introducidas en ES8, por lo que es esencial verificar la compatibilidad del navegador o entorno donde se ejecutará el código.

### Conclusión

En resumen, `async` y `await` representan una evolución significativa en el manejo de la asincronía en JavaScript. Estas palabras clave proporcionan una sintaxis más clara y legible para trabajar con operaciones asincrónicas, mejorando la mantenibilidad y la eficiencia del código. Al convertir funciones en funciones asincrónicas con `async` y pausar la ejecución con `await` hasta que las promesas se resuelvan, los desarrolladores pueden escribir código que se ejecuta de manera similar al código síncrono, pero manteniendo todas las ventajas de la asincronía. El uso adecuado de `async` y `await` no solo mejora la experiencia del desarrollador, sino que también conduce a aplicaciones web más robustas y eficientes.