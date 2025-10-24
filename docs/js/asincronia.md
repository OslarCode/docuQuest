# Asincronía

## 🧩 **¿Qué es la Asincronía en JavaScript?**

Imagina que estás en un restaurante:

### 🍽️ **Ejemplo del mundo real:**

- **Síncrono (sin asincronía):** El camarero toma tu pedido, va a la cocina, ESPERA ahí hasta que tu comida esté lista, te la trae, y solo entonces atiende al siguiente cliente.
- **Asíncrono (con asincronía):** El camarero toma tu pedido, lo envía a la cocina, y MIENTRAS se cocina, él sigue atendiendo a otros clientes. Cuando tu comida está lista, te la trae.

### 💻 **Traducción a JavaScript:**

La **asincronía** significa que JavaScript puede empezar una tarea larga (como leer un archivo o hacer una petición a internet) y **seguir haciendo otras cosas** mientras espera, en lugar de "congelarse" esperando.

### 📁 **Ejemplo Real: Leer un Archivo SIN Bloquear la Interfaz**

Aquí tienes un ejemplo práctico que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo de Asincronía</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      button {
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
      }
      #mensajes {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        background: #f9f9f9;
      }
    </style>
  </head>
  <body>
    <h2>📁 Demo: Leer archivo SIN bloquear la interfaz</h2>

    <!-- Input para seleccionar archivo -->
    <input type="file" id="archivoInput" accept=".txt" />

    <!-- Botones para demostrar que la interfaz NO se bloquea -->
    <div>
      <button onclick="mostrarMensajeRapido()">
        Haz clic aquí (debería funcionar siempre)
      </button>
      <button onclick="contarNumeros()">Contar números (tarea pesada)</button>
    </div>

    <div id="mensajes"></div>

    <script>
      const mensajesDiv = document.getElementById("mensajes");
      const archivoInput = document.getElementById("archivoInput");

      // Función para agregar mensajes a la pantalla
      function agregarMensaje(mensaje) {
        mensajesDiv.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${mensaje}</div>`;
      }

      // 1️⃣ DEMOSTRACIÓN: La interfaz responde incluso mientras leemos archivos
      archivoInput.addEventListener("change", function (evento) {
        const archivo = evento.target.files[0];

        if (!archivo) {
          agregarMensaje("❌ No se seleccionó ningún archivo");
          return;
        }

        agregarMensaje("📖 **Comenzando a leer el archivo...**");

        // FileReader lee archivos de forma ASINCRÓNICA
        const lector = new FileReader();

        // Esto se ejecutará CUANDO TERMINE de leer el archivo
        lector.onload = function () {
          agregarMensaje(
            "✅ **Archivo leído completo:** " +
              lector.result.substring(0, 50) +
              "..."
          );
        };

        // Esto se ejecuta si hay ERROR
        lector.onerror = function () {
          agregarMensaje("❌ Error al leer el archivo");
        };

        // INICIAMOS la lectura (esto es asincrónico)
        lector.readAsText(archivo);

        // Este mensaje aparece INMEDIATAMENTE, sin esperar a que termine la lectura
        agregarMensaje(
          "⏳ La lectura empezó, pero puedes seguir usando los botones..."
        );
      });

      // 2️⃣ DEMOSTRACIÓN: Este botón SIEMPRE debe funcionar
      function mostrarMensajeRapido() {
        agregarMensaje(
          "🎯 ¡Este botón funciona! (La interfaz NO está bloqueada)"
        );
      }

      // 3️⃣ COMPARACIÓN: Esto SÍ bloquearía la interfaz (NO asincrónico)
      function contarNumeros() {
        agregarMensaje("🔢 Comenzando conteo pesado...");

        // Esto BLOQUEA la interfaz porque es síncrono y toma tiempo
        let resultado = 0;
        for (let i = 0; i < 500000000; i++) {
          resultado += i;
        }

        agregarMensaje("✔️ Conteo terminado: " + resultado);
      }
    </script>
  </body>
</html>
```

## 🧠 **¿Qué está pasando aquí?**

### ✅ **Comportamiento ASINCRÓNICO (FileReader):**

1. Seleccionas un archivo
2. JavaScript **inicia** la lectura
3. **INMEDIATAMENTE** muestra el mensaje "La lectura empezó..."
4. **Puedes seguir haciendo clic en botones** mientras se lee el archivo
5. Cuando termina la lectura, muestra el contenido

### ❌ **Comportamiento SÍNCRONO (conteo de números):**

1. Haces clic en "Contar números"
2. La interfaz **SE CONGELA** - no puedes hacer clic en otros botones
3. Solo cuando termina el cálculo, todo vuelve a la normalidad

Por lo tanto, La asincronía en JavaScript permite ejecutar tareas sin bloquear el flujo principal del programa, lo que es esencial para manejar operaciones como peticiones a servidores, lectura de archivos o temporizadores Esta capacidad hace que las aplicaciones web sean más rápidas, reactivas y eficientes.

## Ventajas y desafíos de la Asincronía

La asincronía en JavaScript ofrece ventajas clave como una **interfaz de usuario más fluida**, **manejo eficiente de operaciones I/O** y **mayor escalabilidad** en aplicaciones, especialmente en entornos como Node.js. Al permitir que tareas se ejecuten en segundo plano, evita que el hilo principal se bloquee, mejorando la experiencia del usuario y el rendimiento del sistema.

Sin embargo, también implica desafíos: el **manejo de errores** puede ser más complejo, la estructura del código puede volverse difícil de mantener (especialmente con callbacks), y pueden surgir **condiciones de carrera** si no se controlan correctamente los tiempos de ejecución. Aunque herramientas modernas como promesas y `async/await` han simplificado mucho estas tareas, entender y manejar la asincronía sigue siendo una habilidad avanzada.

La asincronía en JavaScript se gestiona mediante tres mecanismos principales:

- **Callbacks**, funciones que se ejecutan tras completar una tarea, pero que pueden complicar el código (problema conocido como _callback hell_).
- **Promesas**, que ofrecen una forma más estructurada de manejar tareas asincrónicas y sus posibles resultados (éxito o error).
- **Async/Await**, que permite escribir código asincrónico de forma legible y parecida al código tradicional, facilitando el manejo y comprensión del flujo del programa.

## 🧩 **¿Qué son los Callbacks?**

---

Imagina que le pides a un amigo que te llame cuando termine de trabajar:

### 📞 **Ejemplo del mundo real:**

- Le dices: "Cuando termines tu trabajo, **llámame**"
- El **callback** es esa "llamada" que recibes cuando la tarea está completa

### 💻 **Traducción a JavaScript:**

Un **callback** es simplemente una **función que se pasa como argumento** a otra función, y que se ejecutará **cuando termine cierta tarea**.

## 🔧 **Ejemplos Prácticos de Callbacks**

### **Ejemplo 1: Callback SÍNCRONO (inmediato)**

```jsx
// Función que ACEPTA un callback
function saludar(nombre, callback) {
  console.log(`👋 Hola ${nombre}`);
  // Ejecutamos el callback inmediatamente
  callback();
}

// Función callback que PASAMOS como argumento
function despedirse() {
  console.log("¡Hasta luego!");
}

// Usamos la función con nuestro callback
saludar("María", despedirse);

// Resultado en consola:
// 👋 Hola María
// ¡Hasta luego!
```

### **Ejemplo 2: Callback ASINCRÓNICO (con setTimeout)**

```jsx
// Función que hace algo y luego ejecuta el callback
function hacerTarea(nombreTarea, duracion, callback) {
  console.log(`🔨 Comenzando: ${nombreTarea}`);

  // Simulamos una tarea que toma tiempo (ASINCRÓNICA)
  setTimeout(function () {
    console.log(`✅ Terminado: ${nombreTarea}`);
    // Ejecutamos el callback CUANDO TERMINA la tarea
    callback();
  }, duracion);
}

// Callback que se ejecutará cuando termine la tarea
function tareaTerminada() {
  console.log("🎉 ¡Callback ejecutado! La tarea terminó");
}

// Usamos la función
hacerTarea("lavar platos", 2000, tareaTerminada);
console.log("📝 Mientras tanto, puedo seguir haciendo otras cosas...");

// Resultado en consola:
// 🔨 Comenzando: lavar platos
// 📝 Mientras tanto, puedo seguir haciendo otras cosas...
// (espera 2 segundos...)
// ✅ Terminado: lavar platos
// 🎉 ¡Callback ejecutado! La tarea terminó
```

## 📁 **Ejemplo Real: Callbacks con FileReader**

Aquí tienes el ejemplo práctico que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Callbacks en Acción</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      #contenedor {
        margin: 20px 0;
      }
      .mensaje {
        padding: 10px;
        margin: 5px 0;
        border-left: 4px solid #007bff;
        background: #f8f9fa;
      }
      .exito {
        border-left-color: #28a745;
        background: #d4edda;
      }
      .error {
        border-left-color: #dc3545;
        background: #f8d7da;
      }
    </style>
  </head>
  <body>
    <h2>📞 Demo: Callbacks en JavaScript</h2>

    <div>
      <button onclick="demoCallbackSincrono()">Callback Sincrono</button>
      <button onclick="demoCallbackAsincrono()">Callback Asincrono</button>
      <input type="file" id="archivo" accept=".txt" />
    </div>

    <div id="contenedor"></div>

    <script>
      const contenedor = document.getElementById("contenedor");

      function mostrarMensaje(texto, tipo = "info") {
        const div = document.createElement("div");
        div.className = `mensaje ${tipo}`;
        div.textContent = `${new Date().toLocaleTimeString()}: ${texto}`;
        contenedor.appendChild(div);
      }

      // 1️⃣ CALLBACK SÍNCRONO
      function demoCallbackSincrono() {
        mostrarMensaje("--- CALLBACK SÍNCRONO ---");

        // Función que usa un callback
        function procesarArray(array, callback) {
          mostrarMensaje(`Procesando array: [${array}]`);

          // Por cada elemento, ejecutamos el callback
          for (let i = 0; i < array.length; i++) {
            callback(array[i], i);
          }

          mostrarMensaje("Procesamiento terminado");
        }

        // Callback que pasamos como argumento
        function mostrarElemento(elemento, indice) {
          mostrarMensaje(`Elemento ${indice}: ${elemento}`);
        }

        // Usamos la función con nuestro callback
        procesarArray(["manzana", "naranja", "plátano"], mostrarElemento);
      }

      // 2️⃣ CALLBACK ASINCRÓNICO
      function demoCallbackAsincrono() {
        mostrarMensaje("--- CALLBACK ASINCRÓNICO ---");

        function tareaLarga(nombre, segundos, callbackExito, callbackError) {
          mostrarMensaje(`⏳ Iniciando tarea: ${nombre}`);

          setTimeout(() => {
            // Simulamos que a veces falla
            const exito = Math.random() > 0.3;

            if (exito) {
              mostrarMensaje(`✅ ${nombre} completada`);
              callbackExito(`Resultado de ${nombre}`);
            } else {
              mostrarMensaje(`❌ ${nombre} falló`);
              callbackError(`Error en ${nombre}`);
            }
          }, segundos * 1000);
        }

        // Callbacks para éxito y error
        function cuandoExito(resultado) {
          mostrarMensaje(`🎉 ¡Éxito! ${resultado}`, "exito");
        }

        function cuandoError(error) {
          mostrarMensaje(`😞 Falló: ${error}`, "error");
        }

        // Ejecutamos la tarea con callbacks
        tareaLarga("Descargar archivo", 2, cuandoExito, cuandoError);
        mostrarMensaje("📝 Esta línea se ejecuta INMEDIATAMENTE, sin esperar");
      }

      // 3️⃣ CALLBACK EN EL MUNDO REAL: FileReader
      document
        .getElementById("archivo")
        .addEventListener("change", function (e) {
          const archivo = e.target.files[0];
          if (!archivo) return;

          mostrarMensaje("--- FILEREADER CON CALLBACKS ---");

          const lector = new FileReader();

          // CALLBACK para cuando se carga el archivo
          lector.onload = function (evento) {
            mostrarMensaje(`📄 Archivo leído: ${archivo.name}`, "exito");
            mostrarMensaje(
              `Contenido: ${evento.target.result.substring(0, 50)}...`
            );
          };

          // CALLBACK para errores
          lector.onerror = function () {
            mostrarMensaje("❌ Error leyendo el archivo", "error");
          };

          // CALLBACK para progreso
          lector.onprogress = function (evento) {
            if (evento.lengthComputable) {
              const porcentaje = (evento.loaded / evento.total) * 100;
              mostrarMensaje(`📊 Progreso: ${porcentaje.toFixed(1)}%`);
            }
          };

          lector.readAsText(archivo);
          mostrarMensaje(
            "🔄 Lectura iniciada... puedes seguir usando los botones"
          );
        });
    </script>
  </body>
</html>
```

### ✅ **Ventajas:**

- Sencillos de entender al principio
- Permiten manejar operaciones asíncronas

### ⚠️ **Problemas (lo veremos después):**

- **Callback Hell**: Callbacks dentro de callbacks dentro de callbacks...
- Díficil manejo de errores
- Código difícil de leer y mantener

## 🧩 **¿Qué es el Callback Hell?**

Imagina que estás organizando una fiesta y necesitas:

1. **Comprar ingredientes** → luego
2. **Cocinar** → luego
3. **Decorar** → luego
4. **Enviar invitaciones**

Cada paso DEPENDE del anterior. Con callbacks, esto se convierte en...

### 🔥 **El Infierno de los Callbacks (Callback Hell)**

```jsx
// ¡ESTE ES EL CALLBACK HELL!
comprarIngredientes(function (ingredientes) {
  cocinar(ingredientes, function (comida) {
    decorar(function () {
      enviarInvitaciones(function () {
        console.log("🎉 ¡Fiesta lista!");
        // ¿Y si quiero agregar más pasos?
        limpiarCasa(function () {
          prepararMusica(function () {
            // 😵 ¡Se vuelve inmanejable!
          });
        });
      });
    });
  });
});
```

### 💻 **Ejemplo Real: Callback Hell en Acción**

Aquí tienes un demo interactivo para que veas el problema:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Callback Hell - Demo Interactivo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .paso {
        padding: 10px;
        margin: 10px 0;
        border-left: 4px solid;
        background: #f8f9fa;
      }
      .paso-1 {
        border-color: #007bff;
      }
      .paso-2 {
        border-color: #28a745;
        margin-left: 20px;
      }
      .paso-3 {
        border-color: #ffc107;
        margin-left: 40px;
      }
      .paso-4 {
        border-color: #dc3545;
        margin-left: 60px;
      }
      .paso-5 {
        border-color: #6f42c1;
        margin-left: 80px;
      }
      .error {
        background: #f8d7da;
        border-color: #dc3545;
      }
      .exito {
        background: #d4edda;
        border-color: #28a745;
      }
      button {
        padding: 10px 15px;
        margin: 5px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
      }
      .btn-bueno {
        background: #28a745;
        color: white;
      }
      .btn-malo {
        background: #dc3545;
        color: white;
      }
      .codigo {
        background: #2d2d2d;
        color: #f8f9fa;
        padding: 15px;
        border-radius: 5px;
        font-family: "Courier New", monospace;
        margin: 15px 0;
        overflow-x: auto;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🔥 Callback Hell - Demo Interactivo</h1>

      <p>
        <strong>Problema:</strong> Callbacks dentro de callbacks dentro de
        callbacks...
      </p>

      <div class="codigo">
        // ¡CÓDIGO DEL INFIERNO! 😈<br />
        loginUsuario(function(usuario) {<br />
        &nbsp;&nbsp;obtenerDatosUsuario(usuario, function(datos) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;cargarAmigos(datos, function(amigos) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cargarFotos(amigos, function(fotos)
        {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// ¿Dónde estoy?
        ¡Socorro!<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});<br />
        &nbsp;&nbsp;&nbsp;&nbsp;});<br />
        &nbsp;&nbsp;});<br />
        });
      </div>

      <button class="btn-malo" onclick="ejecutarCallbackHell()">
        🔴 Ejecutar Callback Hell
      </button>
      <button class="btn-bueno" onclick="ejecutarConPromesas()">
        🟢 Ejecutar con Promesas
      </button>

      <div id="resultado" style="margin-top: 20px;"></div>
    </div>

    <script>
      const resultado = document.getElementById("resultado");

      function limpiarResultado() {
        resultado.innerHTML = "";
      }

      function agregarPaso(texto, nivel = 1, tipo = "info") {
        const div = document.createElement("div");
        div.className = `paso paso-${nivel} ${tipo}`;
        div.innerHTML = `${new Date().toLocaleTimeString()}: ${texto}`;
        resultado.appendChild(div);
      }

      // Simulamos funciones asincrónicas con callbacks
      function simularTarea(
        nombre,
        duracion,
        callbackExito,
        callbackError = null
      ) {
        setTimeout(() => {
          // Simulamos un 20% de probabilidad de error
          const exito = Math.random() > 0.2;

          if (exito) {
            callbackExito(`Resultado de ${nombre}`);
          } else {
            if (callbackError) {
              callbackError(`Error en ${nombre}`);
            } else {
              // Si no hay manejo de errores... ¡CRASH!
              throw new Error(`Error no manejado en: ${nombre}`);
            }
          }
        }, duracion);
      }

      // 🔥 VERSIÓN CON CALLBACK HELL
      function ejecutarCallbackHell() {
        limpiarResultado();
        agregarPaso("🚀 INICIANDO CALLBACK HELL...", 1);

        // ¡ESTE ES EL INFIERNO!
        simularTarea(
          "Paso 1: Login",
          1000,
          function (resultado1) {
            agregarPaso(`✅ ${resultado1}`, 1, "exito");

            simularTarea(
              "Paso 2: Cargar perfil",
              800,
              function (resultado2) {
                agregarPaso(`✅ ${resultado2}`, 2, "exito");

                simularTarea(
                  "Paso 3: Cargar amigos",
                  600,
                  function (resultado3) {
                    agregarPaso(`✅ ${resultado3}`, 3, "exito");

                    simularTarea(
                      "Paso 4: Cargar fotos",
                      400,
                      function (resultado4) {
                        agregarPaso(`✅ ${resultado4}`, 4, "exito");

                        simularTarea(
                          "Paso 5: Mostrar dashboard",
                          200,
                          function (resultado5) {
                            agregarPaso(`✅ ${resultado5}`, 5, "exito");
                            agregarPaso("🎉 ¡Proceso completado!", 1, "exito");
                          },
                          function (error) {
                            agregarPaso(`❌ ${error} - TODO FALLÓ`, 5, "error");
                          }
                        );
                      },
                      function (error) {
                        agregarPaso(
                          `❌ ${error} - No se pudieron cargar fotos`,
                          4,
                          "error"
                        );
                      }
                    );
                  },
                  function (error) {
                    agregarPaso(
                      `❌ ${error} - No se pudieron cargar amigos`,
                      3,
                      "error"
                    );
                  }
                );
              },
              function (error) {
                agregarPaso(
                  `❌ ${error} - No se pudo cargar perfil`,
                  2,
                  "error"
                );
              }
            );
          },
          function (error) {
            agregarPaso(`❌ ${error} - Login falló`, 1, "error");
          }
        );
      }

      // ✅ VERSIÓN CON PROMESAS (para comparar)
      function ejecutarConPromesas() {
        limpiarResultado();
        agregarPaso("🚀 INICIANDO CON PROMESAS...", 1);

        // Esto lo veremos en la siguiente clase, pero muestra la diferencia
        agregarPaso("📝 Con promesas sería algo así:", 1);
        agregarPaso("loginUsuario()", 1);
        agregarPaso(".then(obtenerDatosUsuario)", 2);
        agregarPaso(".then(cargarAmigos)", 3);
        agregarPaso(".then(cargarFotos)", 4);
        agregarPaso(".then(mostrarDashboard)", 5);
        agregarPaso(".catch(manejarError) ← ¡UN SOLO MANEJADOR!", 1, "exito");
      }
    </script>
  </body>
</html>
```

### 🎯 **Los Problemas del Callback Hell**

### 1. **🔺 Pirámide de la Muerte (Pyramid of Doom)**

```jsx
// Código que se va desplazando hacia la derecha...
tarea1(function () {
  tarea2(function () {
    tarea3(function () {
      tarea4(function () {
        tarea5(function () {
          // ¿Dónde empezó esto?
        });
      });
    });
  });
});
```

### 2. **❌ Manejo de Errores Complicado**

```jsx
// ¡Tengo que manejar errores en CADA nivel!
tarea1(
  function (result1) {
    tarea2(
      result1,
      function (result2) {
        tarea3(
          result2,
          function (result3) {
            // Éxito
          },
          function (error3) {
            // Error en tarea3
          }
        );
      },
      function (error2) {
        // Error en tarea2
      }
    );
  },
  function (error1) {
    // Error en tarea1
  }
);
```

### 3. **🔄 Díficil de Reutilizar**

```jsx
// ¿Cómo reutilizo solo los pasos 2 y 3?
function procesoCompleto(callback) {
  paso1(function () {
    paso2(function () {
      paso3(function () {
        paso4(function () {
          callback();
        });
      });
    });
  });
}
```

### 4. **🐛 Díficil de Depurar**

- ¿En qué paso falló?
- ¿Dónde poner `console.log`?
- El stack trace se pierde en callbacks

### 💡 **Ejemplo del Mundo Real: Proceso de Compra**

```jsx
// CALLBACK HELL en un proceso de compra
procesarPago(function (pagoExitoso) {
  if (pagoExitoso) {
    verificarInventario(function (inventarioDisponible) {
      if (inventarioDisponible) {
        generarFactura(function (factura) {
          enviarEmailConfirmacion(function (emailEnviado) {
            if (emailEnviado) {
              actualizarInventario(function () {
                console.log("✅ Compra completada");
              });
            } else {
              console.log("❌ Error enviando email");
            }
          });
        });
      } else {
        console.log("❌ Sin inventario");
      }
    });
  } else {
    console.log("❌ Pago falló");
  }
});
```

### 🔥 **Señales de Callback Hell:**

- **Mucha indentación** hacia la derecha
- **}`});`}`});`}`});** al final
- **Díficil seguir** la lógica del código
- **Múltiples manejadores** de errores

### ✅ **Soluciones**

- **Promesas** - Para código más plano
- **Async/Await** - Para código que parece síncrono
- **Funciones separadas** - Dividir en funciones más pequeñas

En el siguiente enlace tienes mas ejemplo de [CallbackHell](https://codepen.io/oslar/pen/bNEvBaN)

## 🧩 **¿Qué son las Promesas?**

---

Imagina que le pides a un amigo que te traiga un libro de la biblioteca:

### 📚 **Ejemplo del mundo real:**

- Tu amigo te dice: "**Te prometo** que te traeré el libro"
- La promesa puede tener 3 estados:
  - **📝 Pendiente:** Está yendo a la biblioteca
  - ✅ **Cumplida:** Te trae el libro
  - ❌ **Rechazada:** No había libros o la biblioteca estaba cerrada

### 💻 **Traducción a JavaScript:**

Una **Promesa** es un objeto que representa una operación que **puede completarse ahora o en el futuro**, y que eventualmente producirá un valor.

### 🔧 **Estructura Básica de una Promesa**

```jsx
// Creando una promesa
const miPromesa = new Promise((resolve, reject) => {
  // Aquí va el código asincrónico

  const exito = true; // Simulamos que puede salir bien o mal

  if (exito) {
    resolve("🎉 ¡La operación fue exitosa!"); // Se cumplió la promesa
  } else {
    reject("❌ Algo salió mal"); // Se rechazó la promesa
  }
});

// Usando la promesa
miPromesa
  .then((resultado) => {
    console.log(resultado); // Se ejecuta si se RESUELVE
  })
  .catch((error) => {
    console.log(error); // Se ejecuta si se RECHAZA
  });
```

### 💻 **Ejemplo Real: Demo Interactivo de Promesas**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promesas en JavaScript - Demo Interactivo</title>
    <body>
    <div class="container">
      <h1>🤝 Promesas en JavaScript</h1>
      <p>
        <strong>Definición sencilla:</strong> Una promesa es un objeto que
        representa una tarea que
        <strong>puede completarse ahora o en el futuro</strong>.
      </p>

      <div class="ejemplo">
        <h3>📝 Estados de una Promesa:</h3>
        <div class="estado pendiente">⏳ PENDING (Pendiente)</div>
        <div class="estado cumplida">✅ FULFILLED (Cumplida)</div>
        <div class="estado rechazada">❌ REJECTED (Rechazada)</div>
      </div>

      <h2>🎯 Demo Interactivo</h2>

      <button class="btn-exito" onclick="ejecutarPromesaExitosa()">
        ✅ Probar Promesa Exitosa
      </button>
      <button class="btn-error" onclick="ejecutarPromesaFallida()">
        ❌ Probar Promesa Fallida
      </button>
      <button class="btn-ejemplo" onclick="simularLlamadaAPI()">
        🌐 Simular Llamada API
      </button>

      <div id="resultado" style="margin-top: 20px;"></div>

      <div class="codigo">
        // CREAR una promesa:<br />
        const promesa = new Promise((resolve, reject) => {<br />
        &nbsp;&nbsp;// Código asincrónico aquí<br />
        &nbsp;&nbsp;if (todoBien) {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;resolve("✅ Éxito");<br />
        &nbsp;&nbsp;} else {<br />
        &nbsp;&nbsp;&nbsp;&nbsp;reject("❌ Error");<br />
        &nbsp;&nbsp;}<br />
        });<br /><br />
        // USAR la promesa:<br />
        promesa<br />
        &nbsp;&nbsp;.then(resultado => console.log(resultado))<br />
        &nbsp;&nbsp;.catch(error => console.log(error));
      </div>
    </div>
    </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.estado {
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
}
.pendiente {
  background: #fff3cd;
  color: #856404;
  border: 2px dashed #ffc107;
}
.cumplida {
  background: #d4edda;
  color: #155724;
  border: 2px solid #28a745;
}
.rechazada {
  background: #f8d7da;
  color: #721c24;
  border: 2px solid #dc3545;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-exito {
  background: #28a745;
  color: white;
}
.btn-error {
  background: #dc3545;
  color: white;
}
.btn-ejemplo {
  background: #007bff;
  color: white;
}
.ejemplo {
  background: #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
  border-left: 4px solid #007bff;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
```

```jsx
// Obtenemos del DOM (documento HTML) el elemento con id="resultado".
// Este será el contenedor donde mostraremos mensajes en pantalla.
const resultado = document.getElementById("resultado");

/**
 * 📢 Función mostrarMensaje
 * Muestra en pantalla un mensaje con un tipo visual (info, pendiente, cumplida, rechazada…)
 * y añade una marca de tiempo.
 *
 * @param {string} mensaje - El texto que queremos mostrar al usuario
 * @param {string} tipo - Tipo de mensaje (por defecto "info"). Se usa como clase CSS para estilos diferentes.
 */
function mostrarMensaje(mensaje, tipo = "info") {
  // Creamos dinámicamente un nuevo elemento <div>
  const div = document.createElement("div");

  // Asignamos al div una clase compuesta: "estado" y el tipo.
  // Ejemplo: "estado cumplida" → esto sirve para aplicar estilos CSS diferentes.
  div.className = `estado ${tipo}`;

  // Insertamos en el interior del div el texto junto a la hora actual.
  // toLocaleTimeString() nos da la hora local en formato legible (hh:mm:ss)
  div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`;

  // Añadimos el div como hijo al contenedor 'resultado', así se mostrará en pantalla.
  resultado.appendChild(div);
}

/**
 * 🧹 Función limpiarResultado
 * Borra todo el contenido del contenedor "resultado".
 * Esto se usa antes de iniciar una nueva demostración para no mezclar mensajes antiguos.
 */
function limpiarResultado() {
  resultado.innerHTML = "";
}

// -----------------------------------------------------------------------------
// 1️⃣ PROMESA EXITOSA
// -----------------------------------------------------------------------------

/**
 * 🟢 ejecutarPromesaExitosa
 * Crea y ejecuta una promesa que se resuelve correctamente después de 2 segundos.
 * Sirve para entender cómo funciona el flujo asíncrono cuando la promesa se cumple.
 */
function ejecutarPromesaExitosa() {
  // Primero limpiamos el resultado para tener una "pantalla" limpia.
  limpiarResultado();

  // Mostramos un primer mensaje informativo al usuario.
  mostrarMensaje("🚀 Creando promesa exitosa...", "pendiente");

  // Creamos una nueva promesa manualmente.
  // Esta promesa simula una tarea que tarda 2 segundos en completarse.
  const promesaExitosa = new Promise((resolve, reject) => {
    setTimeout(() => {
      // Después de 2 segundos llamamos a resolve, que indica "¡todo fue bien!".
      resolve("🎉 ¡La promesa se cumplió exitosamente!");
    }, 2000);
  });

  // Usamos la promesa recién creada
  promesaExitosa
    // .then() se ejecuta cuando la promesa se resuelve correctamente.
    .then((resultado) => {
      mostrarMensaje(resultado, "cumplida");
    })
    // .catch() se ejecuta si la promesa fue rechazada (en este caso no ocurrirá, pero es buena práctica incluirlo).
    .catch((error) => {
      mostrarMensaje(error, "rechazada");
    });

  // Importante: esta línea se ejecuta inmediatamente,
  // antes de que la promesa se cumpla.
  // Esto demuestra que las promesas NO bloquean el flujo principal.
  mostrarMensaje(
    "📝 Esta línea se ejecuta INMEDIATAMENTE (la promesa está pendiente)",
    "pendiente"
  );
}

// -----------------------------------------------------------------------------
// 2️⃣ PROMESA FALLIDA
// -----------------------------------------------------------------------------

/**
 * 🔴 ejecutarPromesaFallida
 * Crea una promesa que falla (reject) después de 2 segundos.
 * Sirve para aprender a manejar errores con promesas.
 */
function ejecutarPromesaFallida() {
  limpiarResultado();
  mostrarMensaje("🚀 Creando promesa que fallará...", "pendiente");

  // Creamos una promesa que rechaza en lugar de resolver.
  const promesaFallida = new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos que ocurrió un error.
      reject("😞 La promesa fue rechazada - algo salió mal");
    }, 2000);
  });

  promesaFallida
    .then((resultado) => {
      // Esto no se ejecutará porque la promesa falla.
      mostrarMensaje(resultado, "cumplida");
    })
    .catch((error) => {
      // Esto sí se ejecutará porque la promesa fue rechazada.
      mostrarMensaje(error, "rechazada");
    });
}

// -----------------------------------------------------------------------------
// 3️⃣ EJEMPLO REAL: Simular llamada a API
// -----------------------------------------------------------------------------

/**
 * 🌐 simularLlamadaAPI
 * Simula el comportamiento típico de una llamada a una API externa:
 * - Tarda un tiempo en responder
 * - A veces responde con éxito, otras veces falla
 * - Devuelve datos o un error
 * - Utiliza finally() para hacer algo sin importar el resultado
 */
function simularLlamadaAPI() {
  limpiarResultado();
  mostrarMensaje("🌐 Simulando llamada a API...", "pendiente");

  /**
   * 📡 llamadaAPI
   * Esta función devuelve una promesa que simula la respuesta de un servidor.
   * No realiza una llamada real, solo emula tiempos de espera y respuestas aleatorias.
   */
  function llamadaAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Math.random() devuelve un número entre 0 y 1.
        // Si es mayor a 0.3 consideramos que la API "funcionó".
        const exito = Math.random() > 0.3;

        if (exito) {
          // Datos simulados de un usuario obtenidos desde la "API"
          const datosUsuario = {
            id: 1,
            nombre: "Ana García",
            email: "ana@ejemplo.com",
          };
          resolve(datosUsuario); // promesa resuelta exitosamente
        } else {
          // Simulamos un error típico de red o servidor.
          reject("🔴 Error 404: API no disponible");
        }
      }, 1500); // simulamos que tarda 1.5 segundos en responder
    });
  }

  // Consumimos la promesa devuelta por llamadaAPI
  llamadaAPI()
    .then((usuario) => {
      // Si la promesa se resuelve correctamente, mostramos los datos recibidos.
      mostrarMensaje(
        `✅ Usuario obtenido: ${usuario.nombre} (${usuario.email})`,
        "cumplida"
      );
    })
    .catch((error) => {
      // Si algo falla, mostramos el error al usuario.
      mostrarMensaje(error, "rechazada");
    })
    .finally(() => {
      // finally() se ejecuta SIEMPRE, haya éxito o error.
      // Es ideal para tareas de limpieza o mensajes finales.
      mostrarMensaje("🏁 La operación terminó (éxito o error)");
    });
}
```

## 🔄 **Convertir Callbacks a Promesas**

Aquí está cómo solucionamos el Callback Hell con promesas:

### ❌ **ANTES (Callback Hell):**

```jsx
// 😵 Callback Hell
hacerTarea1(
  function (result1) {
    hacerTarea2(
      result1,
      function (result2) {
        hacerTarea3(
          result2,
          function (result3) {
            console.log("Resultado final:", result3);
          },
          function (error3) {
            console.error("Error en tarea 3:", error3);
          }
        );
      },
      function (error2) {
        console.error("Error en tarea 2:", error2);
      }
    );
  },
  function (error1) {
    console.error("Error en tarea 1:", error1);
  }
);
```

### ✅ **AHORA (con Promesas):**

```jsx
// 😎 Con Promesas (mucho más limpio)
hacerTarea1()
  .then((result1) => hacerTarea2(result1))
  .then((result2) => hacerTarea3(result2))
  .then((result3) => {
    console.log("Resultado final:", result3);
  })
  .catch((error) => {
    // ¡UN SOLO manejador de errores para TODAS las tareas!
    console.error("Algo falló:", error);
  });
```

### ✅ **Ventajas de las Promesas:**

- **Código más plano** - Sin pirámides de callbacks
- **Mejor manejo de errores** - Un solo `.catch()` para todo
- **Más legible** - Se lee como instrucciones secuenciales
- **Fácil de encadenar** - `.then().then().then()`

### 🔧 **Métodos Útiles:**

- `.then()` - Para cuando la promesa se cumple
- `.catch()` - Para cuando la promesa falla
- `.finally()` - Se ejecuta siempre (éxito o error)

### 💡 **Casos de Uso Comunes:**

- Llamadas a APIs (`fetch`)
- Lectura de archivos
- Operaciones de base de datos
- Carga de imágenes
- Temporizadores

## 🧩 **¿Qué es Async/Await?**

---

Imagina que tienes un asistiente que te trae cosas:

### 📚 **Ejemplo del mundo real:**

- **Con promesas:** "Tráeme el libro, Y LUEGO léeme el primer capítulo, Y LUEGO..."
- **Con async/await:** "Espera aquí mientras voy por el libro. ¡Ya lo tengo! Ahora voy a leerte el primer capítulo..."

### 💻 **Traducción a JavaScript:**

**Async/Await** es una forma de escribir código asincrónico que **parece síncrono**, pero sin bloquear el hilo principal.

### 🔧 **Sintaxis Básica de Async/Await**

```jsx
// La palabra "async" hace que una función devuelva una promesa
async function miFuncion() {
  // "await" hace que JavaScript ESPERE a que la promesa se resuelva
  const resultado = await algunaPromesa();
  return resultado;
}

// Es equivalente a:
function miFuncion() {
  return algunaPromesa().then((resultado) => resultado);
}
```

### 💻 **Ejemplo Real: Demo Interactivo de Async/Await**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Async/Await - Demo Interactivo</title>
  </head>
  <body>
    <div class="container">
      <h1>⏳ Async/Await en JavaScript</h1>
      <p>
        <strong>Definición sencilla:</strong> Una forma de escribir código
        asincrónico que se <strong>lee como código síncrono</strong>.
      </p>

      <div class="comparacion">
        <div class="columna promesas">
          <h3>📝 Con Promesas</h3>
          <div class="codigo">
            obtenerUsuario()<br />
            &nbsp;&nbsp;.then(usuario => {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;return obtenerPosts(usuario);<br />
            &nbsp;&nbsp;})<br />
            &nbsp;&nbsp;.then(posts => {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;return obtenerComentarios(posts);<br />
            &nbsp;&nbsp;})<br />
            &nbsp;&nbsp;.then(comentarios => {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;mostrarResultado(comentarios);<br />
            &nbsp;&nbsp;})<br />
            &nbsp;&nbsp;.catch(error => {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;console.error(error);<br />
            &nbsp;&nbsp;});
          </div>
        </div>

        <div class="columna async-await">
          <h3>🎯 Con Async/Await</h3>
          <div class="codigo">
            async function proceso() {<br />
            &nbsp;&nbsp;try {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const usuario = await obtenerUsuario();<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const posts = await
            obtenerPosts(usuario);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;const comentarios = await
            obtenerComentarios(posts);<br />
            &nbsp;&nbsp;&nbsp;&nbsp;mostrarResultado(comentarios);<br />
            &nbsp;&nbsp;} catch (error) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;console.error(error);<br />
            &nbsp;&nbsp;}<br />
            }
          </div>
        </div>
      </div>
      <h2>🎯 Demo Interactivo</h2>
      <button class="btn-ejemplo" onclick="ejecutarProcesoCompleto()">
        🚀 Ejecutar Proceso con Async/Await
      </button>
      <button class="btn-comparar" onclick="compararConPromesas()">
        🔄 Comparar con Promesas
      </button>
      <div id="resultado" style="margin-top: 20px;"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.paso {
  padding: 12px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid;
}
.info {
  background: #d1ecf1;
  border-color: #17a2b8;
}
.exito {
  background: #d4edda;
  border-color: #28a745;
}
.error {
  background: #f8d7da;
  border-color: #dc3545;
}
.espera {
  background: #fff3cd;
  border-color: #ffc107;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-ejemplo {
  background: #007bff;
  color: white;
}
.btn-comparar {
  background: #6f42c1;
  color: white;
}
.comparacion {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
.columna {
  flex: 1;
  padding: 15px;
  border-radius: 5px;
}
.promesas {
  background: #e7f3ff;
  border: 2px solid #007bff;
}
.async-await {
  background: #f0e7ff;
  border: 2px solid #6f42c1;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
```

```jsx
// Obtenemos el elemento HTML con id="resultado".
// Aquí iremos añadiendo mensajes visuales que muestran el progreso de cada paso.
const resultado = document.getElementById("resultado");

/**
 * 📝 mostrarPaso
 * Crea un elemento <div> con el mensaje y lo añade al contenedor.
 * Incluye la hora exacta para que veas el orden temporal de ejecución.
 *
 * @param {string} mensaje - Texto a mostrar
 * @param {string} tipo - Tipo de mensaje (info, espera, exito, error). Sirve para aplicar estilos CSS diferentes.
 */
function mostrarPaso(mensaje, tipo = "info") {
  const div = document.createElement("div");
  div.className = `paso ${tipo}`;
  div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`;
  resultado.appendChild(div);
}

/**
 * 🧹 limpiarResultado
 * Borra todo el contenido dentro de 'resultado'.
 * Se usa al iniciar cada proceso para que no se mezclen mensajes de ejecuciones anteriores.
 */
function limpiarResultado() {
  resultado.innerHTML = "";
}

// -----------------------------------------------------------------------------
// 🧪 FUNCIONES QUE SIMULAN TAREAS ASÍNCRONAS
// -----------------------------------------------------------------------------

/**
 * 🟢 simularTarea
 * Simula una tarea que tarda cierto tiempo en completarse y que SIEMPRE se resuelve bien.
 * Ideal para probar flujos asincrónicos en serie.
 *
 * @param {string} nombre - Nombre descriptivo de la tarea
 * @param {number} duracion - Tiempo que tarda la tarea en "terminar" (por defecto 1000 ms)
 * @returns {Promise} - Promesa que se resuelve tras el tiempo indicado
 */
function simularTarea(nombre, duracion = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ ${nombre} completado`);
    }, duracion);
  });
}

/**
 * 🔴 simularTareaConError
 * Simula una tarea que SIEMPRE falla después de cierto tiempo.
 * Ideal para probar manejo de errores.
 *
 * @param {string} nombre - Nombre de la tarea fallida
 * @param {number} duracion - Tiempo que tarda antes de fallar
 * @returns {Promise} - Promesa que se rechaza tras el tiempo indicado
 */
function simularTareaConError(nombre, duracion = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`❌ Error en ${nombre}`);
    }, duracion);
  });
}

// -----------------------------------------------------------------------------
// 1️⃣ PROCESO CON ASYNC / AWAIT
// -----------------------------------------------------------------------------

/**
 * 🧭 ejecutarProcesoCompleto
 * Demuestra cómo usar async/await para ejecutar tareas asincrónicas en orden.
 * Visualmente, parece código "normal" y legible, pero en realidad sigue siendo asincrónico.
 */
async function ejecutarProcesoCompleto() {
  limpiarResultado();
  mostrarPaso("🚀 INICIANDO PROCESO CON ASYNC/AWAIT...", "info");

  try {
    // Cada paso se ejecuta en secuencia porque usamos 'await' antes de cada promesa.

    mostrarPaso("1. Iniciando sesión...", "espera");
    const paso1 = await simularTarea("Inicio de sesión", 1500);
    mostrarPaso(paso1, "exito");

    mostrarPaso("2. Cargando perfil de usuario...", "espera");
    const paso2 = await simularTarea("Carga de perfil", 1200);
    mostrarPaso(paso2, "exito");

    mostrarPaso("3. Obteniendo amigos...", "espera");
    const paso3 = await simularTarea("Lista de amigos", 1000);
    mostrarPaso(paso3, "exito");

    mostrarPaso("4. Cargando mensajes...", "espera");
    const paso4 = await simularTarea("Mensajes", 800);
    mostrarPaso(paso4, "exito");

    // Si llegamos hasta aquí, ningún paso falló.
    mostrarPaso("🎉 ¡Todo el proceso completado exitosamente!", "exito");
  } catch (error) {
    // Si ocurre cualquier error en CUALQUIER 'await', el flujo salta directamente aquí.
    mostrarPaso(error, "error");
  }
}

// -----------------------------------------------------------------------------
// 2️⃣ MISMO PROCESO USANDO ENCADENAMIENTO DE PROMESAS
// -----------------------------------------------------------------------------

/**
 * 🪄 compararConPromesas
 * Ejecuta el mismo flujo que la función anterior pero usando el estilo clásico con then() y catch().
 * Sirve para comparar legibilidad y manejo de errores.
 */
function compararConPromesas() {
  limpiarResultado();
  mostrarPaso("🔄 EJECUTANDO EL MISMO PROCESO CON PROMESAS...", "info");

  mostrarPaso("1. Iniciando sesión...", "espera");

  // Cada .then espera a que termine la promesa anterior.
  simularTarea("Inicio de sesión", 1500)
    .then((resultado1) => {
      mostrarPaso(resultado1, "exito");
      mostrarPaso("2. Cargando perfil de usuario...", "espera");
      return simularTarea("Carga de perfil", 1200);
    })
    .then((resultado2) => {
      mostrarPaso(resultado2, "exito");
      mostrarPaso("3. Obteniendo amigos...", "espera");
      return simularTarea("Lista de amigos", 1000);
    })
    .then((resultado3) => {
      mostrarPaso(resultado3, "exito");
      mostrarPaso("4. Cargando mensajes...", "espera");
      return simularTarea("Mensajes", 800);
    })
    .then((resultado4) => {
      mostrarPaso(resultado4, "exito");
      mostrarPaso("🎉 ¡Todo el proceso completado exitosamente!", "exito");
    })
    .catch((error) => {
      // Si ocurre un error en cualquiera de las tareas, el flujo salta directamente aquí.
      mostrarPaso(error, "error");
    });
}

// -----------------------------------------------------------------------------
// 3️⃣ MANEJO DE ERRORES CON ASYNC / AWAIT
// -----------------------------------------------------------------------------

/**
 * 🧰 procesoConPosibleError
 * Ejemplo realista: algunas operaciones pueden fallar de forma aleatoria.
 * Mostramos cómo capturar y manejar ese error con try/catch/finally.
 */
async function procesoConPosibleError() {
  try {
    mostrarPaso("🔍 Buscando datos del usuario...", "info");

    // Simulamos que a veces la operación funciona y otras falla
    const exito = Math.random() > 0.5;

    if (exito) {
      // Si "hay suerte", esperamos la promesa y mostramos el resultado
      const datos = await simularTarea("Obtención de datos", 1000);
      mostrarPaso(datos, "exito");
      return datos;
    } else {
      // Si "no hay suerte", forzamos un error intencional
      await simularTareaConError("Obtención de datos", 1000);
    }
  } catch (error) {
    // Captura cualquier error que ocurra dentro del bloque try
    mostrarPaso(`💥 Error capturado: ${error}`, "error");

    // Aquí podrías implementar lógica de recuperación,
    // como reintentar la petición o mostrar un mensaje al usuario.
    mostrarPaso("🔄 Intentando recuperación...", "info");
  } finally {
    // finally() se ejecuta siempre, haya error o no.
    mostrarPaso("🏁 Este código se ejecuta SIEMPRE (éxito o error)", "info");
  }
}
```

### 🔄 **Conversión de Promesas a Async/Await**

### ❌ **ANTES (con Promesas):**

```jsx
function cargarDatosUsuario() {
  return obtenerUsuario()
    .then((usuario) => {
      return obtenerPosts(usuario.id);
    })
    .then((posts) => {
      return obtenerComentarios(posts[0].id);
    })
    .then((comentarios) => {
      console.log("Comentarios:", comentarios);
      return comentarios;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
```

### ✅ **AHORA (con Async/Await):**

```jsx
async function cargarDatosUsuario() {
  try {
    const usuario = await obtenerUsuario();
    const posts = await obtenerPosts(usuario.id);
    const comentarios = await obtenerComentarios(posts[0].id);
    console.log("Comentarios:", comentarios);
    return comentarios;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

## 🎯 **Reglas Básicas de Async/Await**

### 1. **`async` antes de `function`**

```jsx
// Correcto
async function miFuncion() { }

// También con arrow functions
const miFuncion = async () => { };

// ERROR: Falta async
function miFuncion() {
    await algunaPromesa(); // ❌ Error: await solo en funciones async
}

```

### 2. **`await` solo dentro de funciones `async`**

```jsx
async function procesoCorrecto() {
    const resultado = await algunaPromesa(); // ✅
}

function procesoIncorrecto() {
    const resultado = await algunaPromesa(); // ❌ Error
}

```

### 3. **Manejo de errores con `try/catch`**

```jsx
async function procesoSeguro() {
  try {
    const datos = await obtenerDatos();
    return datos;
  } catch (error) {
    console.error("Algo falló:", error);
    return null;
  }
}
```

## 💡 **Ejemplo del Mundo Real: Proceso de Compra**

```jsx
async function procesarCompra(usuarioId, productos) {
  try {
    // 1. Verificar usuario
    const usuario = await verificarUsuario(usuarioId);

    // 2. Verificar inventario
    const inventario = await verificarInventario(productos);

    // 3. Procesar pago
    const pago = await procesarPago(usuario, productos);

    // 4. Generar factura
    const factura = await generarFactura(pago);

    // 5. Enviar confirmación
    await enviarEmailConfirmacion(usuario, factura);

    console.log("✅ Compra procesada exitosamente");
    return factura;
  } catch (error) {
    console.error("❌ Error en la compra:", error);
    // Revertir cambios si es necesario
    await revertirTransaccion();
    throw error; // Relanzar el error
  }
}

// Uso simple y limpio
procesarCompra(123, ["producto1", "producto2"])
  .then((factura) => console.log("Factura:", factura))
  .catch((error) => console.error("Falló:", error));
```

### ✅ **Ventajas de Async/Await:**

- **Código más legible** - Parece síncrono
- **Mejor manejo de errores** - Con `try/catch` tradicional
- **Fácil de depurar** - Mejor stack trace
- **Menos anidamiento** - Sin callbacks o `.then()` encadenados

### ⚠️ **Errores Comunes:**

- Olvidar `async` antes de la función
- Usar `await` fuera de función `async`
- Olvidar el `try/catch` para manejar errores

### 💡 **Consejos:**

- Usa `async/await` para código más limpio
- Combínalo con `try/catch` para robustez
- Recuerda que `async` siempre devuelve una Promesa

## 🧩 **¿Por qué es importante manejar errores en asincronía?**

---

Imagina que estás cocinando y dejas algo en el horno:

### 🍳 **Ejemplo del mundo real:**

- **Sin manejo de errores:** Dejas la comida en el horno sin timer. ¡Se quema!
- **Con manejo de errores:** Pones un timer que suena cuando está lista, y otro que avisa si hay humo.

### 💻 **Traducción a JavaScript:**

En operaciones asincrónicas, **muchas cosas pueden fallar**: conexión de red, archivos que no existen, datos inválidos... Si no manejamos estos errores, nuestra aplicación puede fallar silenciosamente.

## 🔧 **Métodos para Manejar Errores**

---

### 1. **Con Callbacks (patrón error-first)**

```jsx
/**
 * 📜 leerArchivo(nombreArchivo, callback)
 * Este ejemplo usa el patrón clásico de callbacks en Node.js y JavaScript:
 * 👉 El primer parámetro de la función callback siempre representa el ERROR.
 * 👉 El segundo parámetro representa el resultado correcto.
 *
 * @param {string} nombreArchivo - Nombre del archivo que queremos "leer".
 * @param {function} callback - Función que se llamará cuando termine la operación asíncrona.
 */
function leerArchivo(nombreArchivo, callback) {
  // Simulamos un proceso asíncrono usando setTimeout,
  // como si estuviéramos leyendo un archivo desde el disco o un servidor.
  setTimeout(() => {
    // Math.random() genera un número entre 0 y 1.
    // Si es mayor que 0.3, simulamos que el archivo SÍ existe.
    const archivoExiste = Math.random() > 0.3;

    if (archivoExiste) {
      // ✅ Caso exitoso:
      // Llamamos al callback pasando:
      // - null como primer argumento (porque NO hay error)
      // - el contenido del archivo como segundo argumento
      callback(null, `📄 Contenido de ${nombreArchivo}`);
    } else {
      // ❌ Caso de error:
      // Llamamos al callback pasando:
      // - un mensaje de error como primer argumento
      // - null como segundo argumento (porque no hay contenido válido)
      callback("❌ Archivo no encontrado", null);
    }
  }, 1000); // simulamos que tarda 1 segundo en "leer"
}

// -----------------------------------------------------------------------------
// 🧪 USO DEL PATRÓN DE CALLBACKS
// -----------------------------------------------------------------------------

// Llamamos a leerArchivo pasando el nombre del archivo y una función callback.
// Esta función será ejecutada CUANDO termine la lectura (de forma asíncrona).
leerArchivo("mi-documento.txt", (error, contenido) => {
  // Esta función callback recibe dos parámetros:
  // error → si hay error, contendrá un mensaje
  // contenido → si no hay error, contendrá los datos obtenidos

  if (error) {
    // Si hay error, lo mostramos por consola y salimos de la función
    console.error("Error:", error);
    return; // importante: esto evita ejecutar el resto del bloque
  }

  // Si no hubo error, mostramos el contenido obtenido
  console.log("Contenido:", contenido);
});
```

### 2. **Con Promesas (.catch())**

```jsx
/**
 * 📜 leerArchivoPromesa(nombreArchivo)
 * Esta función devuelve una PROMESA.
 * Ya no necesitamos usar callbacks manualmente como en el patrón anterior.
 *
 * @param {string} nombreArchivo - Nombre del archivo a "leer".
 * @returns {Promise<string>} - Una promesa que:
 *   - ✅ se resuelve con el contenido si el archivo existe.
 *   - ❌ se rechaza con un mensaje de error si no existe.
 */
function leerArchivoPromesa(nombreArchivo) {
  return new Promise((resolve, reject) => {
    // Creamos y devolvemos una nueva promesa.
    // Esta promesa representa un trabajo asíncrono que terminará bien o mal.

    // Simulamos un retardo de 1 segundo para "leer" el archivo.
    setTimeout(() => {
      // Generamos un resultado aleatorio para simular si el archivo existe o no.
      const archivoExiste = Math.random() > 0.3;

      if (archivoExiste) {
        // ✅ Si el archivo "existe", resolvemos la promesa con el contenido.
        resolve(`📄 Contenido de ${nombreArchivo}`);
      } else {
        // ❌ Si no existe, rechazamos la promesa con un mensaje de error.
        reject("❌ Archivo no encontrado");
      }
    }, 1000);
  });
}

// -----------------------------------------------------------------------------
// 🧪 USO DE LA PROMESA
// -----------------------------------------------------------------------------

// Llamamos a la función. En vez de pasarle un callback, encadenamos .then() y .catch().
leerArchivoPromesa("mi-documento.txt")
  .then((contenido) => {
    // .then() se ejecuta cuando la promesa se resuelve correctamente.
    // El valor que recibimos aquí es lo que se pasó a "resolve".
    console.log("Contenido:", contenido);
  })
  .catch((error) => {
    // .catch() se ejecuta si la promesa fue rechazada.
    // El valor que recibimos aquí es lo que se pasó a "reject".
    console.error("Error:", error);
  });
```

### 3. **Con Async/Await (try/catch)**

```jsx
/**
 * 📜 procesarArchivo()
 * Esta función usa async/await para leer un archivo de forma asíncrona
 * sin necesidad de encadenar callbacks ni then().
 *
 * 👉 'async' indica que esta función SIEMPRE devolverá una promesa.
 * 👉 'await' pausa la ejecución dentro de esta función hasta que la promesa termine.
 */
async function procesarArchivo() {
  try {
    // ⏸️ 'await' espera a que leerArchivoPromesa termine.
    // Si la promesa se resuelve, su valor se guarda en 'contenido'.
    // Si la promesa se rechaza, automáticamente lanza una excepción que será capturada en el catch.
    const contenido = await leerArchivoPromesa("mi-documento.txt");

    // ✅ Si todo salió bien, esta línea se ejecuta con el contenido correcto.
    console.log("Contenido:", contenido);
  } catch (error) {
    // ❌ Si la promesa fue rechazada (por ejemplo, si el archivo no existe),
    // el flujo salta directamente aquí y 'error' contiene el mensaje del reject.
    console.error("Error:", error);
  }
}
```

## 💻 **Ejemplo Real: Demo Interactivo de Manejo de Errores**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Manejo de Errores en Asincronía - Demo Interactivo</title>
  </head>
  <body>
    <div class="container">
      <h1>🚨 Manejo de Errores en Asincronía</h1>
      <p>
        <strong>Regla de oro:</strong> <em>Siempre</em> maneja los errores en
        operaciones asincrónicas.
      </p>
      <div class="metodos">
        <div class="metodo callbacks">
          <h3>📞 Con Callbacks</h3>
          <div class="codigo">
            funcion((error, resultado) => {<br />
            &nbsp;&nbsp;if (error) {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Manejar error<br />
            &nbsp;&nbsp;} else {<br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Usar resultado<br />
            &nbsp;&nbsp;}<br />
            });
          </div>
        </div>
        <div class="metodo promesas">
          <h3>🤝 Con Promesas</h3>
          <div class="codigo">
            promesa<br />
            &nbsp;&nbsp;.then(resultado => {})<br />
            &nbsp;&nbsp;.catch(error => {});
          </div>
        </div>

        <div class="metodo async-await">
          <h3>⏳ Con Async/Await</h3>
          <div class="codigo">
            try {<br />
            &nbsp;&nbsp;const resultado = await promesa;<br />
            } catch (error) {<br />
            &nbsp;&nbsp;// Manejar error<br />
            }
          </div>
        </div>
      </div>
      <h2>🎯 Demo Interactivo</h2>
      <button class="btn-exito" onclick="probarOperacionExitosa()">
        ✅ Probar Operación Exitosa
      </button>
      <button class="btn-error" onclick="probarOperacionFallida()">
        ❌ Probar Operación Fallida
      </button>
      <button class="btn-api" onclick="simularLlamadaAPI()">
        🌐 Simular Llamada API
      </button>
      <button class="btn-reintento" onclick="probarReintentos()">
        🔄 Probar Reintentos Automáticos
      </button>
      <div id="resultado" style="margin-top: 20px;"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.resultado {
  padding: 12px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid;
}
.exito {
  background: #d4edda;
  border-color: #28a745;
}
.error {
  background: #f8d7da;
  border-color: #dc3545;
}
.advertencia {
  background: #fff3cd;
  border-color: #ffc107;
}
.info {
  background: #d1ecf1;
  border-color: #17a2b8;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-exito {
  background: #28a745;
  color: white;
}
.btn-error {
  background: #dc3545;
  color: white;
}
.btn-api {
  background: #007bff;
  color: white;
}
.btn-reintento {
  background: #6f42c1;
  color: white;
}
.metodos {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
.metodo {
  flex: 1;
  padding: 15px;
  border-radius: 5px;
  border: 2px solid;
}
.callbacks {
  border-color: #ffc107;
  background: #fffbf0;
}
.promesas {
  border-color: #17a2b8;
  background: #f0f9ff;
}
.async-await {
  border-color: #28a745;
  background: #f0fff4;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
```

```jsx
// Obtenemos el contenedor del DOM donde iremos pintando cada mensaje de estado.
const resultado = document.getElementById("resultado");

/**
 * 📢 mostrarResultado
 * Crea un <div> con una clase acorde al tipo (info, exito, error, advertencia…)
 * y le inserta un timestamp + el mensaje, para mostrarlo en pantalla.
 */
function mostrarResultado(mensaje, tipo = "info") {
  const div = document.createElement("div"); // Creamos el nodo <div>
  div.className = `resultado ${tipo}`; // Clases CSS para estilado
  div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`; // Hora + texto
  resultado.appendChild(div); // Lo añadimos al contenedor
}

/**
 * 🧹 limpiarResultado
 * Vacía el contenedor para empezar “en limpio” cada demo.
 */
function limpiarResultado() {
  resultado.innerHTML = "";
}

/**
 * 🧪 operacionAsincrona
 * Simula una operación que tarda entre 1000 y 2000 ms y que puede
 * resolver (éxito) o rechazar (error) en función de una probabilidad.
 *
 * @param {string} nombre - Etiqueta de la operación (para los mensajes)
 * @param {number} probabilidadExito - Valor entre 0 y 1 (por defecto 0.7)
 * @returns {Promise<string>}
 */
function operacionAsincrona(nombre, probabilidadExito = 0.7) {
  return new Promise((resolve, reject) => {
    // Duración aleatoria entre 1000 ms y 2000 ms
    const duracion = 1000 + Math.random() * 1000;

    setTimeout(() => {
      // La operación “sale bien” si el aleatorio es menor que la probabilidad de éxito
      const exito = Math.random() < probabilidadExito;

      if (exito) {
        // Resolvemos con un mensaje incluyendo la duración redondeada
        resolve(`✅ ${nombre} completado en ${duracion.toFixed(0)}ms`);
      } else {
        // Rechazamos con un mensaje de error (ver nota al final sobre usar Error)
        reject(`❌ ${nombre} falló después de ${duracion.toFixed(0)}ms`);
      }
    }, duracion);
  });
}

// -----------------------------------------------------------------------------
// 1️⃣ OPERACIÓN EXITOSA (manejo correcto con try/catch)
// -----------------------------------------------------------------------------

/**
 * Demostración con alta probabilidad de éxito: se ve el flujo normal.
 */
async function probarOperacionExitosa() {
  limpiarResultado();
  mostrarResultado(
    "🚀 Iniciando operación que probablemente tendrá éxito...",
    "info"
  );

  try {
    // Esperamos a que la promesa se resuelva; si falla, saltará al catch
    const resultado = await operacionAsincrona("Proceso principal", 0.9);
    mostrarResultado(resultado, "exito"); // Mensaje de éxito
    mostrarResultado("🎉 Continuando con el flujo normal...", "exito");
  } catch (error) {
    // Si hubiera error, lo mostramos y ejecutamos un plan B
    mostrarResultado(error, "error");
    mostrarResultado("🔄 Ejecutando plan de contingencia...", "advertencia");
  }
}

// -----------------------------------------------------------------------------
// 2️⃣ OPERACIÓN FALLIDA (manejo explícito del error)
// -----------------------------------------------------------------------------

/**
 * Demostración con baja probabilidad de éxito: queremos ver el manejo de errores.
 */
async function probarOperacionFallida() {
  limpiarResultado();
  mostrarResultado(
    "🚀 Iniciando operación que probablemente fallará...",
    "info"
  );

  try {
    const resultado = await operacionAsincrona("Proceso riesgoso", 0.2);
    mostrarResultado(resultado, "exito");
  } catch (error) {
    // Mostramos el error y damos respuestas “amigables”/alternativas
    mostrarResultado(error, "error");
    mostrarResultado(
      "💡 Mostrando mensaje amigable al usuario...",
      "advertencia"
    );
    mostrarResultado("🔄 Ofreciendo alternativas...", "info");
  }
}

// -----------------------------------------------------------------------------
// 3️⃣ EJEMPLO REAL: Llamada a API con manejo de errores específicos
// -----------------------------------------------------------------------------

/**
 * Simula un fetch real y maneja:
 * - Errores HTTP (404, 500, otros)
 * - Errores de red/conexión (TypeError típicamente en fetch)
 */
async function simularLlamadaAPI() {
  limpiarResultado();
  mostrarResultado("🌐 Simulando llamada a API real...", "info");

  try {
    // Hacemos la petición; OJO: la URL debe ir como string plano sin <>
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    // fetch NO lanza error en 4xx/5xx; hay que revisar response.ok y status
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Usuario no encontrado (404)");
      } else if (response.status === 500) {
        throw new Error("Error del servidor (500)");
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    // Si todo bien, parseamos el JSON
    const usuario = await response.json();
    mostrarResultado(`✅ Usuario obtenido: ${usuario.name}`, "exito");
    mostrarResultado(`📧 Email: ${usuario.email}`, "exito");
  } catch (error) {
    // Diferenciamos por tipo y/o mensaje
    if (error.name === "TypeError" && String(error.message).includes("fetch")) {
      // Suele indicar problemas de red/DNS/CORS en algunos contextos
      mostrarResultado("🔌 Error de conexión: Verifica tu internet", "error");
    } else if (String(error.message).includes("404")) {
      mostrarResultado("👤 Usuario no encontrado", "error");
    } else if (String(error.message).includes("500")) {
      mostrarResultado("🖥️ Error del servidor, intenta más tarde", "error");
    } else {
      mostrarResultado(
        `💥 Error inesperado: ${error.message || error}`,
        "error"
      );
    }
  }
}

// -----------------------------------------------------------------------------
// 4️⃣ EJEMPLO AVANZADO: Reintentos automáticos con backoff lineal
// -----------------------------------------------------------------------------

/**
 * Intenta ejecutar una operación varias veces.
 * Si falla, espera un tiempo creciente antes de reintentar (1s, 2s, 3s…).
 */
async function probarReintentos() {
  limpiarResultado();
  mostrarResultado("🔄 Probando sistema de reintentos automáticos...", "info");

  // Encapsulamos la lógica de reintentos para poder reutilizarla
  async function operacionConReintentos(operacion, maxReintentos = 3) {
    let ultimoError;

    for (let intento = 1; intento <= maxReintentos; intento++) {
      try {
        mostrarResultado(
          `📝 Intento ${intento} de ${maxReintentos}...`,
          "info"
        );
        const resultado = await operacion(); // Ejecutamos la operación
        return resultado; // Si va bien, devolvemos y salimos
      } catch (error) {
        ultimoError = error; // Guardamos el último error
        // ⚠️ OJO: si error es string, error.message será undefined (ver nota final)
        const msg = error?.message ?? String(error);
        mostrarResultado(`⚠️ Intento ${intento} falló: ${msg}`, "advertencia");

        // Si aún quedan intentos, esperamos (backoff lineal)
        if (intento < maxReintentos) {
          const espera = intento * 1000; // 1s, 2s, 3s...
          mostrarResultado(
            `⏳ Esperando ${espera}ms antes de reintentar...`,
            "info"
          );
          await new Promise((resolve) => setTimeout(resolve, espera));
        }
      }
    }

    // Si agotamos todo, lanzamos un error final con detalle
    const finalMsg = ultimoError?.message ?? String(ultimoError);
    throw new Error(`Todos los reintentos fallaron: ${finalMsg}`);
  }

  try {
    // Ejemplo: operación con solo 10% de éxito
    const resultado = await operacionConReintentos(
      () => operacionAsincrona("Tarea difícil", 0.1),
      3
    );
    mostrarResultado(resultado, "exito");
  } catch (error) {
    mostrarResultado(error.message, "error");
    mostrarResultado("💡 Contacta al soporte técnico", "advertencia");
  }
}

// -----------------------------------------------------------------------------
// 5️⃣ COMPARACIÓN: ¿Qué pasa SIN manejo de errores?
// -----------------------------------------------------------------------------

/**
 * Demuestra el anti-patrón de no manejar errores en promesas.
 * En apps reales, esto produce “unhandled promise rejections”.
 */
function probarSinManejoErrores() {
  limpiarResultado();
  mostrarResultado("🔥 Probando qué pasa SIN manejo de errores...", "info");

  // Disparamos una operación con baja probabilidad de éxito y SIN .catch()
  operacionAsincrona("Operación sin protección", 0.3).then((resultado) => {
    mostrarResultado(resultado, "exito");
  });

  // Si falla, el error no se captura aquí → el runtime/buscador lo reportará
  // como “UnhandledPromiseRejection”. Es un ejemplo de lo que NO hay que hacer.
}
```

# 🎯 **Tipos Comunes de Errores en Asincronía**

## **Los Temidos "Errores de Red"**

---

Ahora, pensad que nuestro camarero (JavaScript) tiene que ir a la bodega (un servidor en internet) a por una botella de vino muy especial. El viaje a la bodega es lo que llamamos una **petición de red** (como `fetch`).

Durante ese viaje, muchas cosas pueden salir mal. A estos problemas los llamamos **errores de red**:

1. **"La bodega no existe" (Error 404):** Le diste una dirección incorrecta al camarero. El servidor no encuentra lo que le pides.
2. **"El camino está cortado" (Sin conexión):** El camarero ni siquiera puede salir del restaurante porque la puerta está bloqueada. No hay internet.
3. **"La bodega no te deja entrar" (Error 403 o 401):** La bodega es privada y necesitas una clave que no tienes.
4. **"El camarero se perdió y nunca volvió" (Timeout):** El viaje está tardando demasiado y el restaurante decide cancelar el pedido.

### **Ejemplo Sencillo en Código**

Usamos `fetch()` para hacer una petición, como mandar a nuestro camarero. Pero como el viaje puede fallar, usamos `.catch()` para estar preparados.

```jsx
// Enviar a nuestro "camarero" (fetch) a por datos
fetch("<https://api.ejemplo.com/datos>")
  .then((response) => {
    // ¡Oh! El camarero volvió, pero quizás con malas noticias
    if (!response.ok) {
      throw new Error(
        `¡Error ${response.status}! La bodega no pudo darnos el vino.`
      );
    }
    return response.json(); // Todo bien, leemos los datos (el vino)
  })
  .then((datos) => {
    console.log("¡Éxito! Aquí están los datos:", datos);
    // Aquí mostramos los datos en la página web
  })
  .catch((error) => {
    // ¡Zona de rescate! Aquí capturamos CUALQUIER error del viaje.
    console.error("Algo salió mal en el viaje:", error.message);
    // Mostramos un mensaje bonito al usuario: "Lo sentimos, no hay datos por un problema de conexión"
  });
```

**¿Qué está pasando aquí?**

- `fetch()` manda al camarero. Es una **operación asíncrona**.
- `.then()` se ejecuta cuando el camarero vuelve, **sin bloquear** el resto de la web.
- `.catch()` es nuestro **plan B**. Atrapa **cualquier error** que haya pasado en el camino (red, servidor, etc.).
- `response.ok` nos permite verificar si la respuesta del servidor fue exitosa (código 200) o fue un error (código 404, 500, etc.).

### **En Resumen:**

- **Asincronía:** Hacer cosas sin tener que esperar a que terminen.
- **Error de Red:** Cualquier fallo que ocurra cuando intentamos comunicarnos con un servidor externo.
- **Tu Deber como Programador:** Siempre **anticipar y manejar** estos errores con `.catch()` o `try/catch` (en `async/await`) para que tu aplicación no se rompa y le des una buena experiencia al usuario, incluso cuando las cosas salgan mal.

¡Y esto es todo! Espero que ahora le perdáis el miedo a manejar estos errores. Son como los baches en la carretera, siempre hay que estar preparados para ellos. 😊

### Ejemplo real de e**rrores de red en la asincronía**

```jsx
/**
 * 📡 obtenerDatos()
 * Realiza una llamada a una API REST usando fetch y async/await.
 * Controla errores tanto de red como de respuesta HTTP.
 *
 * @returns {Promise<object|undefined>} - Devuelve los datos JSON si la llamada es exitosa.
 */
async function obtenerDatos() {
  try {
    // ⏳ Iniciamos la llamada a la API.
    // OJO: en tu código original la URL tenía "< >" — eso da error en fetch.
    // ✅ Debe ir así:
    const response = await fetch("https://api.ejemplo.com/datos");

    // ⚠️ fetch NO lanza error automáticamente en errores HTTP (404, 500…)
    // Solo lanza error si hay problemas de red.
    // Por eso debemos revisar manualmente response.ok
    if (!response.ok) {
      // Si la respuesta no es OK, lanzamos un error personalizado
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // ✅ Si la respuesta fue correcta, parseamos el cuerpo como JSON
    // y lo devolvemos al que llame a esta función
    return await response.json();
  } catch (error) {
    // 🚨 Si ocurre algún error durante el fetch o el parseo, se captura aquí.

    // TypeError suele indicar problemas de red, DNS, CORS o conexión interrumpida.
    if (error.name === "TypeError") {
      console.error("Error de conexión:", error.message);
    } else {
      // Cualquier otro tipo de error (HTTP personalizado u otros)
      console.error("Otro error:", error);
    }
  }
}
```

👉 **Qué debes entender aquí**:

- `fetch()` devuelve una promesa que:
  - **Se resuelve siempre**, aunque la respuesta sea 404 o 500.
  - **Se rechaza** solo si hay un problema de red (por ejemplo, no hay internet o la URL es inválida).
- `response.ok` es un booleano que vale `true` solo si el código HTTP está entre 200 y 299.
  Si no lo está, tú mismo debes lanzar un `Error` manual (como se hace con `throw new Error(...)`).
- `await response.json()` también puede lanzar error si la respuesta no es JSON válido. Por eso es mejor tener todo dentro del `try`.
- `catch` diferencia dos casos:
  - `TypeError` → normalmente indica que la petición ni siquiera llegó al servidor (por ejemplo, sin internet o fallo de CORS).
  - Cualquier otro → normalmente es un error que tú lanzaste con `throw`.

👉 **Ejemplo de uso**:

```jsx
(async () => {
  const datos = await obtenerDatos();
  if (datos) {
    console.log("Datos recibidos:", datos);
  } else {
    console.log("No se pudieron obtener los datos");
  }
})();
```

👉 **Pro tip**: si quieres mejorar aún más este patrón en un proyecto real, puedes:

- Añadir un timeout manual si la API no responde.
- Controlar códigos de error específicos (404, 401, 500…).
- Devolver un objeto de error en lugar de solo mostrarlo en consola.

## **Errores de Validación: El Problema no es el Viaje, sino lo que Traes**

---

Imaginad que el camarero **sí llegó a la bodega** y **sí le dieron la botella de vino**. No hubo ningún error de red. ¡El viaje fue un éxito!

Pero cuando el camarero vuelve y vosotros, los sommeliers (expertos en vino), la examináis, os dais cuenta de que...

1. **¡Es un refresco, no un vino!** ➡️ El tipo de dato es incorrecto.
2. **La botella está medio vacía.** ➡️ Faltan datos obligatorios.
3. **La etiqueta dice "Año: 18.500".** ➡️ Un año imposible. Los datos no tienen sentido.
4. **Pedisteis una botella y os trajeron una caja de 12.** ➡️ La estructura no es la esperada.

### **¿En qué consisten los Errores de Validación?**

Un error de validación ocurre **después de que la comunicación con el servidor sea exitosa** (es decir, no hay error de red), pero los datos que recibimos **no cumplen con las reglas, el formato o la estructura que nuestra aplicación espera para funcionar correctamente.**

**La clave es:** El servidor respondió, pero su respuesta es "inválida" para nosotros.

### **Ejemplo Sencillo en Código**

Pensad que pedimos los datos de un usuario a una API y esperamos un objeto con un `nombre` (string) y una `edad` (número).

```jsx
// Supongamos que esta petición es EXITOSA (código 200)
fetch("<https://api.ejemplo.com/usuario>")
  .then((response) => response.json()) // Convertimos la respuesta a JSON (esto también funciona)
  .then((usuario) => {
    // --- ¡ZONA DE VALIDACIÓN! ---
    // Aquí comprobamos MANUALMENTE si los datos son correctos.

    // ¿El usuario tiene la propiedad 'nombre' y es un string?
    if (!usuario.nombre || typeof usuario.nombre !== "string") {
      throw new Error(
        "Validación falló: El nombre es obligatorio y debe ser un texto."
      );
    }

    // ¿La 'edad' existe y es un número mayor que 0?
    if (!usuario.edad || typeof usuario.edad !== "number" || usuario.edad < 0) {
      throw new Error(
        "Validación falló: La edad es obligatoria y debe ser un número positivo."
      );
    }

    // --- Si pasamos la validación, todo está bien ---
    console.log(`Hola, ${usuario.nombre}. Tienes ${usuario.edad} años.`);
  })
  .catch((error) => {
    // ¡OJO! Este 'catch' captura TODOS los errores:
    // - Errores de RED (el viaje falló)
    // - Errores de VALIDACIÓN (el "vino" era malo)

    console.error("Algo salió mal:", error.message);
  });
```

**¿Y si el servidor nos devolviera esto?**

```json
// Caso 1: Error de validación (edad es string)
{ "nombre": "Ana", "edad": "veinticinco" }

// Caso 2: Error de validación (falta el nombre)
{ "edad": 25 }

```

En ambos casos, nuestras comprobaciones con `if` lanzarían un error que caería en el `.catch`.

### **Diferencia Clave entre Error de Red y Error de Validación**

| Característica              | Error de Red                                     | Error de Validación                                   |
| --------------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| **¿Cuándo pasa?**           | **Durante** la comunicación.                     | **Después** de una comunicación exitosa.              |
| **¿El servidor respondió?** | No, la petición falló.                           | Sí, con un código de estado 200 (o similar).          |
| **La respuesta...**         | Ni siquiera llega.                               | Llega, pero su contenido es inválido.                 |
| **¿Quién lo causa?**        | Problemas de conexión, servidor caído, URL mala. | Datos mal formados, faltan campos, tipos incorrectos. |
| **En la analogía**          | El camarero no pudo llegar a la bodega.          | El camarero trajo un refresco en lugar de vino.       |

### **En Resumen:**

- **Error de Red:** "No pude obtener una respuesta."
- **Error de Validación:** "Obtuve una respuesta, pero es incorrecta o inútil para lo que necesito."

Como buenos desarrolladores, no solo debemos manejar los fallos en el viaje (red), sino también **desconfiar de los datos que recibimos y validarlos siempre** antes de usarlos. ¡Es la clave para apps robustas y seguras!

¿Queda claro? ¡Es la diferencia entre que el mensajero no llegue y que llegue con el paquete equivocado! 📦❌

### **Ejemplo real de errores de validación**

```jsx
/**
 * 👤 procesarUsuario(datos)
 * Función asíncrona que valida datos de usuario y luego los guarda de forma asíncrona.
 * Usa try/catch para capturar y gestionar errores, tanto de validación como de backend.
 *
 * @param {Object} datos - Objeto con la información del usuario (por ejemplo: { nombre, email })
 * @returns {Promise<Object>} - Devuelve el usuario guardado si todo sale bien.
 * @throws {Error} - Relanza cualquier error para que lo maneje la función que la llame.
 */
async function procesarUsuario(datos) {
  try {
    // ✅ 1. VALIDACIÓN SÍNCRONA
    // Antes de hacer cualquier operación asíncrona, validamos los datos.
    // Esto es inmediato y evita gastar recursos si ya sabemos que los datos son inválidos.
    if (!datos.email || !datos.email.includes("@")) {
      // Lanzamos un error manualmente si el email no existe o no contiene "@"
      throw new Error("Email inválido");
    }

    // 🕒 2. OPERACIÓN ASÍNCRONA
    // Aquí asumimos que guardarUsuario() es una función que devuelve una promesa.
    // Por ejemplo, podría guardar datos en una base de datos o enviar la información a una API.
    const usuario = await guardarUsuario(datos);

    // ✅ Si la operación fue exitosa, devolvemos el usuario guardado.
    return usuario;
  } catch (error) {
    // 🚨 3. MANEJO DE ERRORES
    // Capturamos tanto errores de validación (síncronos) como errores de guardarUsuario (asíncronos).
    console.error("Error procesando usuario:", error.message);

    // 🔁 Relanzamos el error para que lo gestione la función que llame a procesarUsuario().
    // Esto es importante si queremos que la función superior decida qué hacer.
    throw error;
  }
}
```

👉 **Qué debes entender aquí**:

- **Validación síncrona**: no necesita `await`. Es inmediata y sirve para **prevenir** llamadas innecesarias a la base de datos o API si los datos ya son inválidos.
- Si el email no es válido, `throw new Error(...)` **interrumpe la ejecución** de la función y salta directamente al bloque `catch`.
- Si la validación pasa, se llama a `guardarUsuario(datos)`, que es una operación asíncrona.
  `await` espera a que termine y captura el resultado en `usuario`.
- Cualquier error que ocurra en `guardarUsuario` también será capturado en el `catch`.
- `throw error` dentro del `catch` **relanza** el error para que **el código que llama a `procesarUsuario`** pueda reaccionar.
  (Por ejemplo, mostrar un mensaje en la interfaz al usuario).

👉 **Ejemplo de uso**:

```jsx
(async () => {
  try {
    const nuevoUsuario = await procesarUsuario({
      nombre: "Ana",
      email: "ana@correo.com",
    });
    console.log("Usuario guardado correctamente:", nuevoUsuario);
  } catch (error) {
    console.log("No se pudo procesar el usuario:", error.message);
  }
})();
```

👉 **Ejemplo con error de validación**:

```jsx
(async () => {
  try {
    await procesarUsuario({ nombre: "Luis", email: "correo-invalido" });
  } catch (error) {
    console.log("❌ Error capturado en el llamador:", error.message);
    // Aquí podrías mostrar un mensaje en pantalla al usuario
  }
})();
```

✅ Este patrón es muy común en la práctica:

- Validar rápido → lanzar error si hay problema.
- Esperar operaciones asíncronas → manejar errores si ocurren.
- Relanzar si la responsabilidad de manejar el error no es de esta función.

## **Errores de Timeout: El Camarero que Nunca Regresa**

---

Imaginad esta situación: Mandáis al camarero a la bodega, pero...

⌛ **Pasan 5 minutos... 10 minutos... 15 minutos...** y el camarero no regresa. No sabéis si se perdió, si está atrapado, o si sigue esperando en la bodega.

Finalmente, el gerente del restaurante dice: **"¡Basta! Hemos esperado demasiado. Cancelamos el pedido y seguimos con otros clientes."**

### **¿En qué consisten los Errores de Timeout?**

Un **timeout** ocurre cuando establecemos un **límite de tiempo máximo** para una operación asíncrona (como una petición de red), y esta **no se completa dentro de ese plazo**. No es que falle, es que **tarda demasiado**.

**La clave es:** La petición podría eventualmente tener éxito, pero no podemos esperar eternamente.

### **Ejemplo Sencillo en Código**

JavaScript nos permite configurar timeouts fácilmente. Aquí hay dos formas comunes:

### **Opción 1: Con `setTimeout()` y `AbortController` (la forma moderna)**

```jsx
// Creamos un "control remoto" para cancelar la petición
const controller = new AbortController();
const signal = controller.signal;

// Configuramos nuestro "temporizador de cocina"
setTimeout(() => {
  controller.abort(); // ¡Cancelar la petición después de 5 segundos!
}, 5000);

// Enviamos al camarero con el "control remoto"
fetch("<https://api.ejemplo.com/datos-lentos>", { signal })
  .then((response) => response.json())
  .then((datos) => {
    console.log("¡Datos recibidos!", datos);
  })
  .catch((error) => {
    if (error.name === "AbortError") {
      console.error("⏰ ¡Timeout! La petición tardó más de 5 segundos.");
    } else {
      console.error("Otro tipo de error:", error.message);
    }
  });
```

### **Opción 2: Con `Promise.race()` (concepto más avanzado)**

```jsx
// Creamos una "carrera" entre la petición y el timeout
function fetchConTimeout(url, tiempoMaximo = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("⏰ ¡Timeout! La petición tardó demasiado")),
      tiempoMaximo
    );
  });

  const fetchPromise = fetch(url).then((response) => response.json());

  // El que gane la carrera (se resuelva primero) define el resultado
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Usamos nuestra función con timeout
fetchConTimeout("<https://api.ejemplo.com/datos-lentos>", 3000)
  .then((datos) => console.log("¡Éxito!", datos))
  .catch((error) => console.error("Error:", error.message));
```

### **¿Por qué ocurren los Timeouts?**

1. **Conexión lenta:** La red del usuario es muy pobre.
2. **Servidor sobrecargado:** El servidor está procesando muchas peticiones y responde lentamente.
3. **Datos muy grandes:** Se están transfiriendo archivos pesados.
4. **Procesamiento largo:** El servidor tarda mucho en generar la respuesta.

### **¿Cómo manejarlos en la práctica?**

```jsx
async function obtenerDatos() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos

    const response = await fetch("<https://api.ejemplo.com/datos>", {
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Cancelar el timeout si la petición tuvo éxito

    if (!response.ok) throw new Error(`Error del servidor: ${response.status}`);

    const datos = await response.json();
    console.log("Datos válidos:", datos);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error(
        "⏰ Timeout: Por favor, verifica tu conexión o intenta más tarde."
      );
      // Mostrar mensaje amigable al usuario
    } else {
      console.error("Otro error:", error.message);
    }
  }
}
```

### **En Resumen:**

| Error                   | En la Analogía                              | En Código                          |
| ----------------------- | ------------------------------------------- | ---------------------------------- |
| **Error de Red**        | "No pudo salir del restaurante"             | `fetch` rechaza inmediatamente     |
| **Error de Validación** | "Trajo el producto equivocado"              | Respuesta OK, pero datos inválidos |
| **Timeout**             | **"Tardó demasiado, cancelamos el pedido"** | `AbortError` después de X segundos |

**La moraleja:** Siempre estableced tiempos de espera razonables en vuestras peticiones. ¡No dejéis que vuestra aplicación espere eternamente! Es mejor decir "lo sentimos, inténtalo de nuevo" que dejar al usuario con una pantalla cargando indefinidamente.

¿Ven por qué los timeouts son como ese "gerente sensato" que mantiene el restaurante funcionando eficientemente? 🕐⚡

### **Ejemplo real de errores de tiempo de espera**

```jsx
/**
 * ⏳ conTimeout(promesa, tiempoMs)
 * Envuelve una promesa y establece un tiempo máximo de espera.
 * Si la promesa no se resuelve ni rechaza antes de que pase el tiempo,
 * se rechaza con un error de "Timeout".
 *
 * @param {Promise} promesa - La promesa original que queremos limitar.
 * @param {number} tiempoMs - Tiempo máximo de espera en milisegundos.
 * @returns {Promise} - Promesa que se resuelve si la original lo hace a tiempo,
 *                      o se rechaza si se agota el tiempo.
 */
function conTimeout(promesa, tiempoMs) {
  return new Promise((resolve, reject) => {
    // 🧭 1. Creamos un temporizador que rechazará la promesa si pasa el tiempo indicado.
    const timeoutId = setTimeout(() => {
      reject(new Error(`Timeout después de ${tiempoMs}ms`));
    }, tiempoMs);

    // 🧭 2. Encadenamos la promesa original:
    promesa
      // Si se resuelve a tiempo, resolvemos también la promesa envolvente.
      .then(resolve)
      // Si falla antes del timeout, también rechazamos la promesa envolvente.
      .catch(reject)
      // 🧽 3. finally() se ejecuta siempre: limpiamos el timeout para evitar fugas de memoria.
      .finally(() => clearTimeout(timeoutId));
  });
}

// -----------------------------------------------------------------------------
// 🧪 Ejemplo de uso con timeout
// -----------------------------------------------------------------------------

/**
 * 📡 obtenerDatosConTimeout()
 * Intenta obtener datos con un límite de tiempo de 5 segundos.
 * Si la operación demora más, se lanza un error de timeout.
 */
async function obtenerDatosConTimeout() {
  try {
    // 🔥 Aquí estamos llamando a obtenerDatos() (otra función asíncrona)
    // pero la envolvemos en conTimeout para asegurarnos de que no tarde más de 5 segundos.
    const datos = await conTimeout(obtenerDatos(), 5000);

    // Si llega aquí, la promesa se resolvió a tiempo ✅
    return datos;
  } catch (error) {
    // 🛑 Si ocurre un error, distinguimos si fue por timeout o por otro motivo
    if (error.message.includes("Timeout")) {
      console.error("⏱️ La operación tardó demasiado");
    } else {
      console.error("💥 Otro error:", error);
    }
  }
}
```

👉 **Qué está pasando aquí**:

- `setTimeout()` crea un temporizador que, al cumplirse `tiempoMs`, ejecuta `reject(new Error(...))`.
  Esto obliga a que la promesa falle si se demora demasiado.
- Mientras tanto, `promesa.then().catch()` gestiona normalmente la promesa original:
  - Si se **resuelve antes de que expire el timeout**, se llama `resolve()` y todo funciona.
  - Si se **rechaza antes**, se llama `reject()` con su error original.
- `.finally(clearTimeout(...))` garantiza que **el timeout se limpie**, para evitar fugas de recursos.

👉 **Ejemplo práctico**:

Imagina que `obtenerDatos()` llama a una API que a veces se cuelga.

En vez de dejar la interfaz esperando indefinidamente, estableces un tiempo límite.

✅ **Ventajas de este patrón**:

- Evita que la UI quede colgada por llamadas lentas.
- Te permite mostrar mensajes como _“La operación está tardando demasiado, inténtalo de nuevo”_.
- Te da un control preciso sobre la experiencia del usuario.

🚨 **Importante**:

Esto **no cancela realmente** la petición `fetch` original (JavaScript no tiene cancelación nativa de promesas).

Pero sí permite ignorar su resultado si tarda demasiado, y seguir con otro flujo.

👉 Si quieres cancelarla realmente, puedes combinar este patrón con **`AbortController`**.

📌 **Ejemplo alternativo con cancelación real usando `AbortController`** (opcional):

```jsx
async function fetchConTimeout(url, tiempoMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), tiempoMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}
```

👉 Esta versión sí **interrumpe** la petición al servidor, no solo la ignora.

## ✅ **Mejores Prácticas**

---

- **Siempre** maneja errores en operaciones asincrónicas
- Usa **try/catch** con async/await para código más limpio
- **Diferenciar** tipos de error (red, validación, servidor)
- Proporciona **mensajes de error útiles** al usuario

### ❌ **Errores Comunes:**

- Olvidar el **.catch()** en promesas
- No usar **try/catch** con async/await
- **Silenciar errores** sin notificar al usuario
- No **relanzar errores** cuando es necesario

### 🛡️ **Estrategias Avanzadas:**

- **Reintentos automáticos** para errores temporales
- **Circuit breakers** para evitar colapsar servicios
- **Timeouts** para operaciones lentas
- **Fallbacks** (alternativas cuando el servicio principal falla)

# Conceptos sobre el mecanismo de la asincronía en JavaScript

---

## 🧩 **¿Qué es el Event Loop?**

Imagina un restaurante muy eficiente:

### 🍽️ **Ejemplo del mundo real:**

- **Cocina (Call Stack):** Donde se prepara un plato a la vez
- **Mesas (Web APIs):** Donde los clientes esperan su comida
- **Camarero (Event Loop):** Que constantemente verifica si la cocina está libre y trae nuevos pedidos

### 💻 **Traducción a JavaScript:**

El **Event Loop** es el mecanismo que permite a JavaScript manejar múltiples operaciones con un **solo hilo**, haciendo que parezca que hace varias cosas a la vez.

## 🔧 **Los Componentes del Event Loop**

## 1. **Call Stack (Pila de Llamadas)**

---

Imagina que el Call Stack es como **una pila de platos** o **una torre de libros** - solo puedes agregar o quitar del TOPE.

```jsx
/**
 * 🔥 CALL STACK = PILA DE EJECUCIÓN
 *
 * REGLAS:
 * 1. Último en entrar, primero en salir (LIFO - Last In, First Out)
 * 2. Solo una cosa a la vez (JavaScript es single-threaded)
 * 3. Si se llena demasiado = ERROR "Stack Overflow"
 */

console.log("📚 Entendiendo el Call Stack paso a paso");

// 📍 EJEMPLO 1: Función simple
function saludar() {
  console.log("Hola!");
  return "Listo";
}

function iniciar() {
  console.log("Iniciando programa...");
  const resultado = saludar(); // 📍 Esta función entra al Call Stack
  console.log("Resultado:", resultado);
}

// Ejecutamos
iniciar();

/**
 * 🎯 ¿QUÉ PASA EN EL CALL STACK?
 *
 * PASO 1: iniciar() entra al Call Stack
 * Call Stack = [iniciar]
 *
 * PASO 2: console.log("Iniciando...") entra
 * Call Stack = [iniciar, console.log]
 *
 * PASO 3: console.log termina → SALE
 * Call Stack = [iniciar]
 *
 * PASO 4: saludar() entra
 * Call Stack = [iniciar, saludar]
 *
 * PASO 5: console.log("Hola!") entra y sale
 * Call Stack = [iniciar, saludar]
 *
 * PASO 6: saludar() termina → SALE
 * Call Stack = [iniciar]
 *
 * PASO 7: console.log("Resultado:") entra y sale
 * Call Stack = [iniciar]
 *
 * PASO 8: iniciar() termina → SALE
 * Call Stack = [] VACÍO
 */
```

## Analogía del Libro de Recetas

```jsx
/**
 * 📖 ANALOGÍA: LIBRO DE RECETAS
 *
 * Imagina que cocinas siguiendo una receta:
 * - Cada paso = función en el Call Stack
 * - Si la receta dice "ve a la página 30" = llamas otra función
 * - Cuando terminas esa página, vuelves donde estabas
 */

console.log("🍳 Analogía del libro de recetas");

function recetaPrincipal() {
  console.log("Paso 1: Preparar ingredientes");
  prepararSalsa(); // 📖 "Ve a la página de la salsa"
  console.log("Paso 3: Cocinar todo junto");
}

function prepararSalsa() {
  console.log("Paso 2.1: Picar tomates");
  picarIngredientes(); // 📖 "Ve a la página de picar"
  console.log("Paso 2.3: Mezclar salsa");
}

function picarIngredientes() {
  console.log("Paso 2.2: Picando... listo!");
}

// Ejecutamos la receta
recetaPrincipal();

/**
 * 🎯 ORDEN EN EL CALL STACK:
 *
 * 1. recetaPrincipal() entra
 * 2. console.log("Paso 1") entra y sale
 * 3. prepararSalsa() entra
 * 4. console.log("Paso 2.1") entra y sale
 * 5. picarIngredientes() entra
 * 6. console.log("Paso 2.2") entra y sale
 * 7. picarIngredientes() SALE
 * 8. console.log("Paso 2.3") entra y sale
 * 9. prepararSalsa() SALE
 * 10. console.log("Paso 3") entra y sale
 * 11. recetaPrincipal() SALE
 *
 * 📍 PRINCIPIO LIFO: La última función que entró (picarIngredientes)
 * es la primera en salir
 */
```

### El Famoso Error: Stack Overflow

```jsx
/**
 * 💥 STACK OVERFLOW = CALL STACK LLENO
 *
 * Ocurre cuando llamamos demasiadas funciones recursivamente
 * sin condición de salida
 */

console.log("⚠️ Cuidado con el Stack Overflow");

// ✅ RECURSIÓN CON CONDICIÓN DE SALIDA (SEGURA)
function cuentaRegresivaSegura(numero) {
  console.log("Número:", numero);

  if (numero <= 0) {
    // ✅ CONDICIÓN DE SALIDA
    console.log("¡Fin!");
    return;
  }

  cuentaRegresivaSegura(numero - 1); // 📍 Cada llamada agrega al Call Stack
}

cuentaRegresivaSegura(3);

/**
 * 🎯 CALL STACK en cuentaRegresivaSegura(3):
 *
 * 1. cuentaRegresivaSegura(3)
 * 2. cuentaRegresivaSegura(2)
 * 3. cuentaRegresivaSegura(1)
 * 4. cuentaRegresivaSegura(0) → CONDICIÓN DE SALIDA
 * 5. SALE cuentaRegresivaSegura(0)
 * 6. SALE cuentaRegresivaSegura(1)
 * 7. SALE cuentaRegresivaSegura(2)
 * 8. SALE cuentaRegresivaSegura(3)
 *
 * ✅ Call Stack se mantiene controlado
 */

// ❌ RECURSIÓN INFINITA (PELIGROSO)
function recursionInfinita() {
  console.log("¡Ayuda! Me repito infinitamente");
  recursionInfinita(); // ❌ SIN CONDICIÓN DE SALIDA
}

// ¡NO EJECUTES ESTO! Causaría:
// Uncaught RangeError: Maximum call stack size exceeded
// recursionInfinita();
```

### Call Stack vs Código Asíncrono

```jsx
/**
 * 🔄 CALL STACK + ASINCRONÍA
 *
 * El Call Stack solo maneja código SINCRÓNICO
 * El código asíncrono va a Web APIs y luego al Callback Queue
 */

console.log("📍 Call Stack: Inicio sincrónico");

// ⏰ Esto NO va al Call Stack inmediatamente
setTimeout(() => {
  console.log("🔄 Esto estuvo en Callback Queue antes del Call Stack");
}, 0);

// 📍 Esto SÍ va al Call Stack inmediatamente
console.log("📍 Call Stack: Fin sincrónico");

/**
 * 🎯 ORDEN REAL DE EJECUCIÓN:
 *
 * 1. console.log("📍 Inicio") → Call Stack → EJECUTADO
 * 2. setTimeout → Web APIs (NO al Call Stack)
 * 3. console.log("📍 Fin") → Call Stack → EJECUTADO
 *
 * 📍 CALL STACK VACÍO (todo el código sincrónico terminó)
 *
 * 4. Función del setTimeout → Callback Queue → Call Stack → EJECUTADO
 *
 * ⚠️ IMPORTANTE: El setTimeout aunque sea 0ms, NUNCA interrumpe el Call Stack
 */
```

### Depurando el Call Stack

```jsx
/**
 * 🐛 DEBUGGING: Cómo ver el Call Stack en acción
 */

function funcionA() {
  console.log("En función A");
  funcionB(); // 📍 Llamamos a B desde A
}

function funcionB() {
  console.log("En función B");
  funcionC(); // 📍 Llamamos a C desde B
}

function funcionC() {
  console.log("En función C");
  console.trace("📍 ¡Mira el Call Stack desde aquí!"); // 🐛 DEBUG
}

funcionA();

/**
 * 🎯 SALIDA DE console.trace():
 *
 * console.trace()
 * funcionC
 * funcionB
 * funcionA
 * (código global)
 *
 * 📍 Esto muestra exactamente la PILA de llamadas:
 * Quién llamó a quién, en orden inverso (del más reciente al más antiguo)
 */
```

### Ejemplo Práctico del Mundo Real

```jsx
/**
 * 🏪 EJEMPLO REAL: Proceso de compra en tienda online
 */

console.log("🛒 Iniciando proceso de compra...");

function procesoCompra() {
  validarUsuario();
  const total = calcularTotal();
  procesarPago(total);
  confirmarCompra();
}

function validarUsuario() {
  console.log("✅ Validando usuario...");
  // Simulamos validación
  return true;
}

function calcularTotal() {
  console.log("💰 Calculando total...");
  aplicarDescuento(); // 📍 Llamada dentro de otra función
  return 100;
}

function aplicarDescuento() {
  console.log("🎯 Aplicando descuento...");
}

function procesarPago(monto) {
  console.log("💳 Procesando pago:", monto);
}

function confirmarCompra() {
  console.log("🎉 ¡Compra confirmada!");
}

// Ejecutamos el proceso
procesoCompra();

/**
 * 🎯 CALL STACK durante procesoCompra():
 *
 * 1. procesoCompra() entra
 * 2. validarUsuario() entra → ejecuta → sale
 * 3. calcularTotal() entra
 * 4. aplicarDescuento() entra → ejecuta → sale
 * 5. calcularTotal() sale
 * 6. procesarPago() entra → ejecuta → sale
 * 7. confirmarCompra() entra → ejecuta → sale
 * 8. procesoCompra() sale
 *
 * 📍 NUNCA hay más de 3 funciones en el Call Stack a la vez
 */
```

### Reglas Fundamentales del Call Stack

```jsx
/**
 * 📋 REGLAS DE ORO DEL CALL STACK
 */

// REGLA 1: Último en Entrar, Primero en Salir (LIFO)
function regla1() {
  console.log("1️⃣ Primero en entrar...");
  function interna() {
    console.log("2️⃣ Último en entrar...");
    console.log("3️⃣ ¡Primero en salir!");
  }
  interna();
  console.log("4️⃣ Primero en entrar, último en salir");
}
regla1();

// REGLA 2: Una ejecución a la vez
function regla2() {
  console.log("📍 JavaScript es single-threaded");
  console.log("📍 Solo una función se ejecuta EN ESTE MOMENTO");
  console.log("📍 Las demás esperan su turno en el Call Stack");
}
regla2();

// REGLA 3: El orden importa
function regla3() {
  console.log("A");
  function segunda() {
    console.log("B");
    function tercera() {
      console.log("C");
    }
    tercera();
    console.log("D");
  }
  segunda();
  console.log("E");
}
regla3(); // Salida: A, B, C, D, E

/**
 * 🎯 RESUMEN FINAL:
 *
 * CALL STACK = PILA DE EJECUCIÓN donde:
 * - Se ejecuta el código JavaScript
 * - Sigue principio LIFO (Last In, First Out)
 * - Es single-threaded (una cosa a la vez)
 * - Si se llena → Stack Overflow
 * - Solo maneja código SINCRÓNICO
 * - El código ASÍNCRONO va a otras partes (Web APIs, Callback Queue)
 */

console.log("🎯 ¡Ahora entiendes el Call Stack!");
```

### **En Resumen Muy Sencillo:**

```jsx
/**
 * 🎪 CALL STACK = TORRE DE PLATOS
 *
 * 📍 Solo puedes:
 * - Agregar un plato al TOPE (llamar función)
 * - Quitar el plato del TOPE (función termina)
 *
 * 📍 NO puedes:
 * - Agregar en medio
 * - Quitar del fondo
 * - Tener múltiples torres
 *
 * 📍 Si la torre es muy alta: ¡SE CAE! (Stack Overflow)
 */

function resumen() {
  console.log("📍 Call Stack = Ejecución inmediata y ordenada");
  console.log("📍 Última función en entrar = Primera en salir");
  console.log("📍 Base de todo el sistema JavaScript");
}

resumen();
```

**¡El Call Stack es el motor de ejecución de JavaScript - donde realmente sucede la magia!**

## 2. **Callback Queue (Cola de Tareas)**

---

Imagina que JavaScript tiene **una persona que atiende (Call Stack)** y una **lista de espera (Callback Queue)**.

```jsx
/**
 * EJEMPLO PRÁCTICO DEL CALLBACK QUEUE
 *
 * PENSEMOS EN UN RESTAURANTE:
 * - El cocinero = Call Stack (solo puede hacer una cosa a la vez)
 * - Los pedidos en la mesa = Callback Queue (esperan su turno)
 * - El mesero = Event Loop (lleva pedidos al cocinero cuando está libre)
 */

console.log("🔹 Pedido 1: Entrada inmediata"); // Va directo al cocinero

setTimeout(() => {
  console.log("🕒 Pedido 3: Llega después de 2 segundos"); // Espera en la lista
}, 2000);

setTimeout(() => {
  console.log("🕒 Pedido 2: Llega después de 0 segundos"); // Espera en la lista
}, 0);

console.log("🔹 Pedido 4: Entrada inmediata"); // Va directo al cocinero

/**
 * ¿QUÉ PASA EN ESTE CÓDIGO?
 *
 * RESULTADO EN CONSOLA:
 * 🔹 Pedido 1: Entrada inmediata
 * 🔹 Pedido 4: Entrada inmediata
 * 🕒 Pedido 2: Llega después de 0 segundos
 * 🕒 Pedido 3: Llega después de 2 segundos
 *
 * EXPLICACIÓN:
 * 1. El "cocinero" (Call Stack) procesa primero los console.log normales
 * 2. Los setTimeout van a la "lista de espera" (Callback Queue)
 * 3. Cuando el cocinero termina, el "mesero" (Event Loop) trae los pedidos de la lista
 */
```

### Código Explicado Paso a Paso

```jsx
/**
 * DEMOSTRACIÓN COMPLETA DEL CALLBACK QUEUE
 *
 * COMPONENTES PRINCIPALES:
 * 1. Call Stack: Donde se ejecuta el código principal (FILA DE EJECUCIÓN)
 * 2. Web APIs: Funciones como setTimeout, fetch, eventos (AYUDANTES EXTERNOS)
 * 3. Callback Queue: Cola donde esperan las funciones callback (LISTA DE ESPERA)
 * 4. Event Loop: Verifica constantemente si el Call Stack está vacío (MESERO)
 */

console.log("🚀 INICIO: Esto va directo al Call Stack");

/**
 * setTimeout ES UNA WEB API
 * - JavaScript le dice al navegador: "Ejecuta esto después de X tiempo"
 * - El navegador maneja el temporizador por su cuenta
 * - Cuando termina el tiempo, pone la función en el Callback Queue
 */
setTimeout(() => {
  console.log("⏰ Timeout de 0ms - Viene del Callback Queue");
}, 0);

/**
 * OTRO EJEMPLO CON MÁS TIEMPO
 * - Este espera más tiempo en las Web APIs
 * - Pero igual va al Callback Queue cuando termina
 */
setTimeout(() => {
  console.log("🐢 Timeout de 1000ms - Tardó más en llegar a la cola");
}, 1000);

/**
 * PROMESAS TIENEN PRIORIDAD DIFERENTE (Microtask Queue)
 * - Las promesas van a una cola ESPECIAL con mayor prioridad
 * - Se ejecutan ANTES que el Callback Queue normal
 */
Promise.resolve().then(() => {
  console.log("✅ Promesa - Viene de la Microtask Queue (máxima prioridad)");
});

/**
 * CÓDIGO SINCRÓNICO
 * - Esto se ejecuta INMEDIATAMENTE en el Call Stack
 * - No pasa por ninguna cola de espera
 */
console.log("🏁 FIN: Última línea del código sincrónico");

/**
 * ¿QUÉ ORDEN SE EJECUTA?
 *
 * 1. 🚀 INICIO: Esto va directo al Call Stack
 * 2. 🏁 FIN: Última línea del código sincrónico
 * 3. ✅ Promesa - Viene de la Microtask Queue (máxima prioridad)
 * 4. ⏰ Timeout de 0ms - Viene del Callback Queue
 * 5. 🐢 Timeout de 1000ms - Tardó más en llegar a la cola
 *
 * ¿POR QUÉ ESTE ORDEN?
 * - Primero todo el código sincrónico del Call Stack
 * - Luego la Microtask Queue (promesas)
 * - Finalmente el Callback Queue (setTimeout)
 */
```

### Analogía del Restaurante Detallada

```jsx
/**
 * ANALOGÍA COMPLETA DEL RESTAURANTE
 */

// El restaurante (JavaScript) abre
console.log("🍽️ RESTAURANTE ABIERTO - Call Stack listo");

// Cliente 1: Llega y pide inmediatamente (código sincrónico)
console.log("👨‍🍳 Cliente 1: 'Quiero una hamburguesa' - ATENDIDO INMEDIATO");

// Cliente 2: Pide pero dice "llámame cuando esté listo en 2 segundos" (setTimeout)
setTimeout(() => {
  console.log("📞 Cliente 2: 'Mi pedido de pizza está listo' - CALLBACK QUEUE");
}, 2000);

// Cliente 3: Pide con urgencia máxima (Promise - Microtask Queue)
Promise.resolve().then(() => {
  console.log(
    "🚨 Cliente 3: 'URGENTE: Ensalada' - MICROTASK QUEUE (máxima prioridad)"
  );
});

// Cliente 4: También pide inmediatamente
console.log("👨‍🍳 Cliente 4: 'Quiero refresco' - ATENDIDO INMEDIATO");

// Cliente 5: Pide "llámame en 0 segundos" (setTimeout 0ms)
setTimeout(() => {
  console.log(
    "📞 Cliente 5: 'Mi café está listo' - CALLBACK QUEUE (aunque sea 0ms)"
  );
}, 0);

/**
 * PROCESO EN EL RESTAURANTE:
 *
 * 1. 🍽️ RESTAURANTE ABIERTO - Call Stack listo
 * 2. 👨‍🍳 Cliente 1: 'Quiero una hamburguesa' - ATENDIDO INMEDIATO
 * 3. 👨‍🍳 Cliente 4: 'Quiero refresco' - ATENDIDO INMEDIATO
 *
 * (El cocinero termina todos los pedidos inmediatos)
 *
 * 4. 🚨 Cliente 3: 'URGENTE: Ensalada' - MICROTASK QUEUE (máxima prioridad)
 *    - Las promesas tienen PRIORIDAD sobre los timeouts
 *
 * 5. 📞 Cliente 5: 'Mi café está listo' - CALLBACK QUEUE (aunque sea 0ms)
 *    - Los timeouts van DESPUÉS de las promesas, aunque digan 0ms
 *
 * 6. 📞 Cliente 2: 'Mi pedido de pizza está listo' - CALLBACK QUEUE
 *    - Después de 2 segundos reales
 */
```

### Reglas Clave del Callback Queue

```jsx
/**
 * REGLAS FUNDAMENTALES DEL EVENT LOOP
 */

console.log("📚 APRENDIENDO LAS REGLAS");

// REGLA 1: El código sincrónico SIEMPRE se ejecuta primero
console.log("1️⃣ Código sincrónico - PRIMERO SIEMPRE");

// REGLA 2: Las Microtasks (Promesas) tienen máxima prioridad
Promise.resolve().then(() => {
  console.log("2️⃣ Microtask (Promise) - SEGUNDO LUGAR - Máxima prioridad");
});

// REGLA 3: Los Macrotasks (setTimeout) van después
setTimeout(() => {
  console.log("3️⃣ Macrotask (setTimeout) - TERCER LUGAR - Baja prioridad");
}, 0);

// REGLA 4: Incluso setTimeout(0) espera su turno
setTimeout(() => {
  console.log("4️⃣ setTimeout(0) - CUARTO LUGAR - Aunque sea 0ms, va a la cola");
}, 0);

// REGLA 5: El orden en la misma cola se respeta
setTimeout(() => {
  console.log("5️⃣ Primer setTimeout(100ms) - Se ejecuta por orden de llegada");
}, 100);

setTimeout(() => {
  console.log("6️⃣ Segundo setTimeout(100ms) - Mismo tiempo, orden de código");
}, 100);

/**
 * RESUMEN DE PRIORIDADES:
 *
 * 1. 🥇 CÓDIGO SINCRÓNICO (Call Stack)
 * 2. 🥇 MICROTASKS (Promesas, queueMicrotask)
 * 3. 🥈 MACROTASKS (setTimeout, setInterval, eventos)
 * 4. 🥉 RENDERIZADO (Actualización de pantalla)
 *
 * FLUJO: Sincrónico → Microtasks → Macrotasks → Render → Repetir
 */
```

### Ejemplo Práctico y Útil

```jsx
/**
 * EJEMPLO PRÁCTICO: Cómo usar este conocimiento en código real
 */

function cargarDatosDeUsuario() {
  console.log("1. Iniciando carga de datos...");

  // SIMULAMOS UNA PETICIÓN A UNA API
  setTimeout(() => {
    console.log("3. Datos recibidos del servidor (después de 1 segundo)");

    // PROCESAMOS LOS DATOS CON UNA PROMESA
    Promise.resolve().then(() => {
      console.log("4. Procesando datos (Microtask - alta prioridad)");
    });
  }, 1000);

  console.log("2. Esperando datos... (esto se ejecuta inmediatamente)");
}

// EJECUTAMOS LA FUNCIÓN
cargarDatosDeUsuario();

/**
 * ¿QUÉ PASA AQUÍ?
 *
 * 1. "Iniciando carga de datos..." - Sincrónico, se ejecuta inmediatamente
 * 2. "Esperando datos..." - Sincrónico, se ejecuta inmediatamente
 * 3. El setTimeout espera 1 segundo en las Web APIs
 * 4. Después de 1 segundo: "Datos recibidos del servidor"
 * 5. Inmediatamente después: "Procesando datos" - Porque la promesa es Microtask
 *
 * ESTO ES IMPORTANTE PARA:
 * - Evitar bloqueos en la interfaz
 * - Manejar operaciones asíncronas correctamente
 * - Entender por qué a veces el código no se ejecuta en el orden esperado
 */
```

### **En Resumen Muy Sencillo:**

```jsx
/**
 * 🎯 RESUMEN SUPER SIMPLE:
 *
 * JavaScript = 1 cocinero + 2 listas de espera
 *
 * LISTA 1 (URGENTE): Microtask Queue - Promesas (MÁXIMA PRIORIDAD)
 * LISTA 2 (NORMAL): Callback Queue - setTimeout, eventos (BAJA PRIORIDAD)
 *
 * REGLA DE ORO:
 * 1. Terminar todo el trabajo inmediato (código normal)
 * 2. Atender todas las URGENCIAS (Promesas)
 * 3. Atender la lista normal (setTimeout)
 * 4. Repetir
 */

console.log("✨ ¡Ahora entiendes el Callback Queue!");
```

## 3. **Microtask Queue (Cola de Microtareas)**

---

Es una **cola de MÁXIMA PRIORIDAD** donde esperan las promesas y otras microtareas. ¡Tiene prioridad sobre el Callback Queue normal!

```jsx
/**
 * 🔥 MICROTASK QUEUE = COLA DE MÁXIMA PRIORIDAD
 *
 * REGLAS:
 * 1. MÁXIMA PRIORIDAD - Se ejecuta ANTES que el Callback Queue
 * 2. Solo para: Promesas, queueMicrotask(), MutationObserver
 * 3. Se vacía COMPLETAMENTE antes de pasar al Callback Queue
 */

console.log("📚 Entendiendo la Microtask Queue");

// 📍 Código normal (Call Stack)
console.log("1️⃣ Call Stack: Código sincrónico");

// ⏰ Macrotask (Callback Queue - BAJA prioridad)
setTimeout(() => {
  console.log("4️⃣ Callback Queue: setTimeout - ÚLTIMO lugar");
}, 0);

// ✅ Microtask (Microtask Queue - MÁXIMA prioridad)
Promise.resolve().then(() => {
  console.log("3️⃣ Microtask Queue: Promise - SEGUNDO lugar");
});

// 📍 Más código normal
console.log("2️⃣ Call Stack: Más código sincrónico");

/**
 * 🎯 ORDEN DE EJECUCIÓN:
 *
 * 1️⃣ Call Stack: Código sincrónico
 * 2️⃣ Call Stack: Más código sincrónico
 * 3️⃣ Microtask Queue: Promise - MÁXIMA PRIORIDAD
 * 4️⃣ Callback Queue: setTimeout - BAJA PRIORIDAD
 *
 * ¡La Promise se ejecuta ANTES del setTimeout aunque ambos estén "listos"!
 */
```

### Analogía de la Emergencia Hospitalaria

```jsx
/**
 * 🏥 ANALOGÍA: HOSPITAL CON URGENCIAS
 *
 * - Pacientes normales = Callback Queue (sala de espera normal)
 * - Pacientes URGENTES = Microtask Queue (urgencias)
 * - El doctor SIEMPRE atiende urgencias primero
 */

console.log("🏥 Abriendo hospital...");

// Paciente NORMAL (Callback Queue)
setTimeout(() => {
  console.log("👨‍⚕️ Paciente NORMAL: Dolor de cabeza - Esperó su turno");
}, 0);

// Paciente URGENTE (Microtask Queue)
Promise.resolve().then(() => {
  console.log("🚑 Paciente URGENTE: Ataque al corazón - ATENCIÓN INMEDIATA!");
});

// Más pacientes NORMALES
setTimeout(() => {
  console.log("👨‍⚕️ Paciente NORMAL: Fiebre - Esperó su turno");
}, 0);

console.log("📋 Terminando registro de pacientes...");

/**
 * 🎯 ORDEN DE ATENCIÓN:
 *
 * 1. "🏥 Abriendo hospital..." (Call Stack)
 * 2. "📋 Terminando registro..." (Call Stack)
 * 3. "🚑 Paciente URGENTE: Ataque al corazón" (Microtask Queue - PRIMERO!)
 * 4. "👨‍⚕️ Paciente NORMAL: Dolor de cabeza" (Callback Queue)
 * 5. "👨‍⚕️ Paciente NORMAL: Fiebre" (Callback Queue)
 *
 * ¡Los URGENTES siempre pasan primero!
 */
```

### Jerarquía de Colas en JavaScript

```jsx
/**
 * 🏆 JERARQUÍA DE COLAS - ¿QUÉ SE EJECUTA PRIMERO?
 */

console.log("🥇 Inicio: Call Stack siempre primero");

// 🥈 MICROTASK QUEUE (MÁXIMA prioridad después del Call Stack)
Promise.resolve().then(() => {
  console.log("🥈 Microtask: Promise - SEGUNDO lugar");
});

queueMicrotask(() => {
  console.log("🥈 Microtask: queueMicrotask() - También segundo lugar");
});

// 🥉 CALLBACK QUEUE (BAJA prioridad)
setTimeout(() => {
  console.log("🥉 Callback Queue: setTimeout - TERCER lugar");
}, 0);

// 📍 CALL STACK (SIEMPRE primero)
console.log("🥇 Call Stack: Fin del código sincrónico");

/**
 * 🎯 ORDEN DEFINITIVO:
 *
 * 1. 🥇 TODO el Call Stack (código sincrónico)
 * 2. 🥈 TODAS las Microtasks (se vacía completamente)
 * 3. 🥉 Callback Queue (solo UNA tarea por ciclo del event loop)
 *
 * FLUJO: Call Stack → (vacío) → Microtask Queue → Callback Queue
 */
```

### Ejemplo con Múltiples Niveles

```jsx
/**
 * 🔄 MICROTASKS DENTRO DE MICROTASKS
 *
 * Las microtasks se vacían COMPLETAMENTE, incluso si se agregan nuevas
 */

console.log("1️⃣ Call Stack: Inicio");

// Macrotask normal
setTimeout(() => {
  console.log("6️⃣ Callback Queue: setTimeout externo");
}, 0);

// Microtask principal
Promise.resolve().then(() => {
  console.log("3️⃣ Microtask: Promise principal");

  // ¡Otra microtask DENTRO de una microtask!
  Promise.resolve().then(() => {
    console.log("4️⃣ Microtask: Promise anidada");

    // ¡Y otra más!
    queueMicrotask(() => {
      console.log("5️⃣ Microtask: queueMicrotask anidada");
    });
  });
});

console.log("2️⃣ Call Stack: Fin");

/**
 * 🎯 ¿QUÉ PASA AQUÍ?
 *
 * 1. "1️⃣ Call Stack: Inicio"
 * 2. "2️⃣ Call Stack: Fin"
 *
 * 📍 CALL STACK VACÍO - Ahora procesamos microtasks
 *
 * 3. "3️⃣ Microtask: Promise principal"
 * 4. "4️⃣ Microtask: Promise anidada"
 * 5. "5️⃣ Microtask: queueMicrotask anidada"
 *
 * ⚠️ IMPORTANTE: El Event Loop NO pasa al Callback Queue hasta que
 * la Microtask Queue esté COMPLETAMENTE VACÍA
 *
 * 6. "6️⃣ Callback Queue: setTimeout externo"
 */
```

### Caso Real: Promesas vs setTimeout

```jsx
/**
 * 💼 CASO REAL: ¿Qué se ejecuta primero en una aplicación?
 */

function cargarDatosUsuario() {
  console.log("1. Iniciando carga de datos...");

  // Simulamos petición HTTP (Macrotask)
  setTimeout(() => {
    console.log("4. Datos recibidos del servidor");

    // Procesamos los datos (Microtask - alta prioridad)
    Promise.resolve().then(() => {
      console.log("5. Procesando datos recibidos - MICROTASK");
    });
  }, 0);

  // Verificamos cache local (Microtask)
  Promise.resolve().then(() => {
    console.log("3. Verificando cache local - MICROTASK");
  });

  console.log("2. Configuración completada");
}

cargarDatosUsuario();

/**
 * 🎯 ORDEN EN UNA APLICACIÓN REAL:
 *
 * 1. "Iniciando carga de datos..." - Call Stack
 * 2. "Configuración completada" - Call Stack
 * 3. "Verificando cache local" - Microtask (ALTA prioridad)
 * 4. "Datos recibidos del servidor" - Callback Queue (BAJA prioridad)
 * 5. "Procesando datos recibidos" - Microtask (ALTA prioridad)
 *
 * 💡 POR QUÉ ES IMPORTANTE:
 * - Las promesas se ejecutan inmediatamente después del código actual
 * - Los timeouts esperan aunque su tiempo sea 0
 * - Podemos priorizar tareas críticas usando promesas
 */
```

### El Problema del "Starvation"

```jsx
/**
 * ⚠️ PELIGRO: MICROTASK STARVATION
 *
 * Si agregamos microtasks infinitamente, el Callback Queue NUNCA se ejecuta
 */

console.log("⚠️ Demostración del problema de starvation");

function starvationDemo() {
  console.log("1. Inicio - Call Stack");

  // Macrotask normal
  setTimeout(() => {
    console.log("❌ ESTO NUNCA SE EJECUTA - Starvation!");
  }, 0);

  // Microtask que se llama a sí misma infinitamente
  function microtaskInfinita() {
    Promise.resolve().then(() => {
      console.log("🔁 Microtask infinita ejecutándose...");
      microtaskInfinita(); // ❌ LLAMADA RECURSIVA
    });
  }

  microtaskInfinita();
}

// 🚨 ¡CUIDADO! Este código bloqueará el event loop
// starvationDemo();

/**
 * 🎯 ¿QUÉ PASA CON starvationDemo()?
 *
 * 1. "Inicio - Call Stack" se ejecuta
 * 2. setTimeout se programa (va al Callback Queue)
 * 3. microtaskInfinita() comienza a agregar microtasks infinitamente
 * 4. El Event Loop NUNCA puede pasar al Callback Queue porque
 *    la Microtask Queue NUNCA se vacía
 * 5. El setTimeout NUNCA se ejecuta = STARVATION
 *
 * 💡 SOLUCIÓN: No crear microtasks recursivamente sin control
 */
```

### Métodos que usan Microtask Queue

```jsx
/**
 * 📋 MÉTODOS QUE USAN MICROTASK QUEUE
 */

console.log("🔧 Métodos que van a Microtask Queue");

// 1. PROMESAS (.then, .catch, .finally)
Promise.resolve("dato").then((resultado) => {
  console.log("1. Promise.then():", resultado);
});

// 2. queueMicrotask() - API explícita
queueMicrotask(() => {
  console.log("2. queueMicrotask(): Función explícita");
});

// 3. MutationObserver - Para cambios en el DOM
// (En entorno de navegador)
// const observer = new MutationObserver(() => {
//   console.log("3. MutationObserver: Cambio en DOM");
// });

// 4. process.nextTick() - En Node.js (aún mayor prioridad)
// process.nextTick(() => {
//   console.log("4. process.nextTick(): Prioridad máxima en Node.js");
// });

// 📍 Para comparar - Esto va a Callback Queue (BAJA prioridad)
setTimeout(() => {
  console.log("5. setTimeout(): Callback Queue - Último lugar");
}, 0);

console.log("📍 Call Stack: Código normal");

/**
 * 🎯 ORDEN DE EJECUCIÓN:
 *
 * 1. "🔧 Métodos que van a Microtask Queue"
 * 2. "📍 Call Stack: Código normal"
 * 3. "1. Promise.then(): dato"
 * 4. "2. queueMicrotask(): Función explícita"
 * 5. "5. setTimeout(): Callback Queue - Último lugar"
 */
```

### Reglas de Oro de la Microtask Queue

```jsx
/**
 * 📋 REGLAS DE ORO DE LA MICROTASK QUEUE
 */

console.log("📜 Reglas de la Microtask Queue");

// REGLA 1: Se vacía COMPLETAMENTE en cada ciclo
Promise.resolve().then(() => {
  console.log(
    "1️⃣ Regla 1: Microtask - Se ejecuta inmediatamente después del Call Stack"
  );

  Promise.resolve().then(() => {
    console.log(
      "1️⃣ Regla 1: Microtask anidada - También se ejecuta ANTES de cualquier setTimeout"
    );
  });
});

setTimeout(() => {
  console.log(
    "1️⃣ Regla 1: setTimeout - Espera a que TODAS las microtasks terminen"
  );
}, 0);

// REGLA 2: Orden de llegada en la misma cola
Promise.resolve().then(() => console.log("2️⃣ Regla 2: Promise A"));
Promise.resolve().then(() => console.log("2️⃣ Regla 2: Promise B"));
queueMicrotask(() => console.log("2️⃣ Regla 2: queueMicrotask C"));

// REGLA 3: No bloquear con microtasks infinitas
function tareaSegura() {
  let contador = 0;

  function microtaskControlada() {
    contador++;
    console.log(`3️⃣ Regla 3: Microtask segura #${contador}`);

    if (contador < 3) {
      Promise.resolve().then(microtaskControlada);
    }
  }

  microtaskControlada();
}

tareaSegura();

console.log("📜 Fin de las reglas - Call Stack vacío");

/**
 * 🎯 RESUMEN FINAL:
 *
 * MICROTASK QUEUE = COLA DE MÁXIMA PRIORIDAD donde:
 * - Van las Promesas (.then, .catch, .finally)
 * - Van las queueMicrotask()
 * - Se ejecuta INMEDIATAMENTE después del Call Stack
 * - Se VACÍA COMPLETAMENTE antes del Callback Queue
 * - ¡CUIDADO con las microtasks infinitas!
 */

console.log("🎯 ¡Ahora entiendes la Microtask Queue!");
```

### **En Resumen Muy Sencillo:**

```jsx
/**
 * 🏆 MICROTASK QUEUE = VIP DEL EVENT LOOP
 *
 * 📍 Es la COLA DE MÁXIMA PRIORIDAD
 * 📍 Siempre se ejecuta ANTES que el Callback Queue normal
 * 📍 Para: Promesas, queueMicrotask()
 * 📍 Se vacía COMPLETAMENTE en cada ciclo
 */

function resumenMicrotask() {
  console.log("📍 Microtask Queue = Máxima prioridad después del Call Stack");
  console.log("📍 Promesas > setTimeout en prioridad");
  console.log("📍 ¡Cuidado con crear microtasks infinitas!");
}

resumenMicrotask();
```

**¡La Microtask Queue es el carril rápido del JavaScript asíncrono!** Las promesas y tareas críticas van aquí para ejecutarse lo antes posible.

## 💻 **Demo Interactivo: Visualizando el Event Loop**

Aquí tienes un ejemplo completo que muestra cómo funciona:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Event Loop - Demo Visual</title>
</head>
<body>
    <div class="container">
        <h1>🔄 Event Loop en JavaScript</h1>
        <p><strong>Definición sencilla:</strong> El "motor" que permite a JavaScript manejar operaciones asincrónicas con un solo hilo.</p>
        <div class="explicacion">
            <h3>🎯 ¿Cómo funciona?</h3>
            <div class="paso">1. <strong>Call Stack:</strong> Ejecuta el código síncrono (una cosa a la vez)</div>
            <div class="paso">2. <strong>Web APIs:</strong> Maneja operaciones asincrónicas (setTimeout, fetch, etc.)</div>
            <div class="paso">3. <strong>Queues:</strong> Esperan callbacks listos para ejecutarse</div>
            <div class="paso">4. <strong>Event Loop:</strong> Mueve callbacks al Call Stack cuando está vacío</div>
        </div>
        <div class="sistema">
            <div class="componente call-stack">
                <h3>🏗️ Call Stack</h3>
                <p><em>Pila de llamadas - Una cosa a la vez</em></p>
                <div id="stack-content"></div>
            </div>
            <div class="componente web-apis">
                <h3>🌐 Web APIs</h3>
                <p><em>Operaciones en segundo plano</em></p>
                <div id="apis-content"></div>
            </div>
            <div class="componente task-queue">
                <h3>📋 Task Queue</h3>
                <p><em>Callbacks de setTimeout, eventos DOM</em></div>
                <div id="task-queue-content"></div>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <div class="componente microtask-queue">
                <h3>⚡ Microtask Queue</h3>
                <p><em>Callbacks de Promesas - ALTA prioridad</em></p>
                <div id="microtask-queue-content"></div>
            </div>
        </div>
        <h2>🎯 Demo Interactivo</h2>
        <button class="btn-ejemplo" onclick="ejecutarEjemploCompleto()">🚀 Ejecutar Ejemplo Completo</button>
        <button class="btn-ejemplo" onclick="ejecutarEjemploMicrotasks()">⚡ Probar Microtasks vs Tasks</button>
        <button class="btn-limpiar" onclick="limpiarTodo()">🗑️ Limpiar Todo</button>
        <div id="consola" style="margin-top: 20px; font-family: 'Courier New', monospace; background: #2d2d2d; color: white; padding: 15px; border-radius: 5px;"></div>
    </div>
</body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.sistema {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}
.componente {
  border: 2px solid;
  border-radius: 8px;
  padding: 15px;
  min-height: 200px;
}
.call-stack {
  border-color: #dc3545;
  background: #f8d7da;
}
.web-apis {
  border-color: #ffc107;
  background: #fff3cd;
}
.task-queue {
  border-color: #28a745;
  background: #d4edda;
}
.microtask-queue {
  border-color: #007bff;
  background: #cce7ff;
}
.tarea {
  background: white;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
  border-left: 4px solid;
  font-size: 14px;
}
.sincrona {
  border-left-color: #dc3545;
}
.settimeout {
  border-left-color: #ffc107;
}
.promesa {
  border-left-color: #007bff;
}
.evento {
  border-left-color: #28a745;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-ejemplo {
  background: #007bff;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.explicacion {
  background: #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}
.paso {
  padding: 10px;
  margin: 5px 0;
  background: #f8f9fa;
  border-left: 4px solid #6f42c1;
}
```

```jsx
// =============== REFERENCIAS DEL DOM ===============
// Contenedores donde pintaremos visualmente el estado del sistema
const stackContent = document.getElementById("stack-content");
const apisContent = document.getElementById("apis-content");
const taskQueueContent = document.getElementById("task-queue-content");
const microtaskQueueContent = document.getElementById(
  "microtask-queue-content"
);
const consola = document.getElementById("consola");

// =============== ESTADO (MODELO) ===============
// Estructuras que representan, de forma DIDÁCTICA, el entorno de ejecución JS
let callStack = []; // Pila de llamadas (lo que se está ejecutando ahora)
let webAPIs = []; // "Zona" donde las Web APIs esperan/cronometan (setTimeout, fetch...)
let taskQueue = []; // Cola de tareas “macro” (setTimeout, eventos)
let microtaskQueue = []; // Cola de microtareas (promesas, queueMicrotask)

// =============== UTILIDADES DE LOG Y RENDER ===============
function log(mensaje) {
  // Añadimos línea de log con timestamp y hacemos autoscroll
  consola.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

function actualizarVisualizacion() {
  // Renderizamos Call Stack como bloques apilados
  stackContent.innerHTML = callStack
    .map((tarea) => `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`)
    .join("");

  // Renderizamos Web APIs mostrando tiempo restante de cada “timer”
  apisContent.innerHTML = webAPIs
    .map(
      (api) =>
        `<div class="tarea ${api.tipo}">${api.nombre} (${api.tiempoRestante}ms)</div>`
    )
    .join("");

  // Renderizamos Task Queue (macro-tasks)
  taskQueueContent.innerHTML = taskQueue
    .map((tarea) => `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`)
    .join("");

  // Renderizamos Microtask Queue (micro-tasks)
  microtaskQueueContent.innerHTML = microtaskQueue
    .map((tarea) => `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`)
    .join("");
}

function limpiarTodo() {
  // Reseteamos el “mundo simulado”
  callStack = [];
  webAPIs = [];
  taskQueue = [];
  microtaskQueue = [];
  consola.innerHTML = "";
  actualizarVisualizacion();
}

// =============== OPERACIONES SOBRE LA PILA ===============
function agregarAlStack(nombre, tipo = "sincrona") {
  // Empujar una “tarea” a la pila (visualización)
  callStack.push({ nombre, tipo });
  log(`📥 Apilado: ${nombre}`);
  actualizarVisualizacion();
}

function removerDelStack() {
  // Quitar el tope de la pila (visualización)
  if (callStack.length > 0) {
    const tarea = callStack.pop();
    log(`📤 Desapilado: ${tarea.nombre}`);
    actualizarVisualizacion();
    return tarea;
  }
}

// =============== SIMULADOR DE WEB APIs ===============
/**
 * simularWebAPI:
 * - Crea un “reloj” que descuenta tiempoRestante cada 100ms.
 * - Al llegar a 0, saca la “API” de WebAPIs y mete su callback en:
 *   - microtaskQueue si es tipo 'promesa'
 *   - taskQueue en caso contrario (setTimeout/eventos)
 */
function simularWebAPI(nombre, tipo, duracion, callback) {
  const api = { nombre, tipo, tiempoRestante: duracion, callback };
  webAPIs.push(api);
  log(`🌐 Web API iniciada: ${nombre} (${duracion}ms)`);
  actualizarVisualizacion();

  // Bajamos tiempoRestante para “simular” el paso del tiempo
  const interval = setInterval(() => {
    api.tiempoRestante -= 100;

    if (api.tiempoRestante <= 0) {
      clearInterval(interval);

      // Remover de Web APIs (ya “terminó”)
      webAPIs = webAPIs.filter((a) => a !== api);

      // Encolar su callback en la cola correcta
      if (tipo === "promesa") {
        microtaskQueue.push({ nombre: `Callback: ${nombre}`, tipo });
        log(`⚡ Microtask agregado: ${nombre}`);
      } else {
        taskQueue.push({ nombre: `Callback: ${nombre}`, tipo });
        log(`📋 Task agregado: ${nombre}`);
      }

      actualizarVisualizacion();
    } else {
      // Render parcial intermedio (para ver la cuenta regresiva)
      actualizarVisualizacion();
    }
  }, 100);
}

// =============== “EVENT LOOP” SIMULADO ===============
/**
 * procesarEventLoop:
 * 1) Vacía el Call Stack (para simular que el hilo queda libre).
 * 2) Procesa TODAS las microtasks (promesas) primero (alta prioridad).
 * 3) Procesa UNA task macro (setTimeout/evento) por iteración.
 * Esto reproduce la regla real: microtasks -> tasks.
 */
function procesarEventLoop() {
  // 1. Vaciar la pila actual (simulación del final de un tick)
  while (callStack.length > 0) {
    removerDelStack();
  }

  // 2. Procesar TODAS las microtasks (promesas tienen prioridad)
  while (microtaskQueue.length > 0) {
    const microtask = microtaskQueue.shift();
    agregarAlStack(microtask.nombre, microtask.tipo);
    // Simulamos que “se ejecuta” y sale de la pila en 100ms
    setTimeout(() => removerDelStack(), 100);
    log(`🎯 Microtask procesado: ${microtask.nombre}`);
  }

  // 3. Procesar UNA sola task macro por ciclo
  if (taskQueue.length > 0) {
    const task = taskQueue.shift();
    agregarAlStack(task.nombre, task.tipo);
    setTimeout(() => removerDelStack(), 100);
    log(`📝 Task procesado: ${task.nombre}`);
  }

  actualizarVisualizacion();
}

// =============== EJEMPLO 1: DEMO COMPLETA ===============
function ejecutarEjemploCompleto() {
  limpiarTodo();
  log("🚀 INICIANDO DEMO COMPLETO DEL EVENT LOOP");

  // Código síncrono: entra directo a la pila
  agregarAlStack("script principal", "sincrona");

  // Programamos, con pequeños retrasos, la creación de distintas “Web APIs”
  // setTimeout → terminará en Task Queue
  setTimeout(() => {
    simularWebAPI("setTimeout 100ms", "settimeout", 100, () => {});
  }, 10);

  // Promesa → terminará en Microtask Queue
  setTimeout(() => {
    simularWebAPI("Promise.resolve()", "promesa", 50, () => {});
  }, 20);

  // Más “código síncrono” (simulado) que entra a la pila y se desapila
  setTimeout(() => {
    agregarAlStack('console.log("Hola")', "sincrona");
    setTimeout(() => removerDelStack(), 100);
  }, 30);

  // Otro setTimeout
  setTimeout(() => {
    simularWebAPI("setTimeout 200ms", "settimeout", 200, () => {});
  }, 40);

  // “Tick” del event loop: cada 300ms procesamos colas según prioridad
  let procesamientos = 0;
  const interval = setInterval(() => {
    procesarEventLoop();
    procesamientos++;
    if (procesamientos > 10) {
      clearInterval(interval);
      log("🏁 Demo completado");
    }
  }, 300);
}

// =============== EJEMPLO 2: MICROTASKS vs TASKS ===============
function ejecutarEjemploMicrotasks() {
  limpiarTodo();
  log("⚡ DEMO: MICROTASKS vs TASKS (PRIORIDAD)");

  agregarAlStack("Inicio del script", "sincrona");

  // setTimeout → Task Queue (baja prioridad frente a microtasks)
  setTimeout(() => {
    simularWebAPI("setTimeout 0ms", "settimeout", 100, () => {});
    log("⏰ setTimeout programado");
  }, 10);

  // Promesa → Microtask Queue (ALTA prioridad)
  setTimeout(() => {
    simularWebAPI("Promise.then()", "promesa", 50, () => {});
    log("🤝 Promesa programada");
  }, 20);

  // Evento (simulado) → Task Queue
  setTimeout(() => {
    simularWebAPI("Evento click", "evento", 80, () => {});
    log("🖱️ Evento click simulado");
  }, 30);

  // Otra promesa → Microtask Queue
  setTimeout(() => {
    simularWebAPI("Promise.resolve().then()", "promesa", 30, () => {});
    log("🔁 Otra promesa programada");
  }, 40);

  // Explicación del orden
  setTimeout(() => {
    log("\\n🎯 ORDEN DE EJECUCIÓN:");
    log("1. Call Stack vacío");
    log("2. MICROTASKS (Promesas) - TODAS primero");
    log("3. TASKS (setTimeout, eventos) - UNA por vez");
  }, 200);

  // Procesado periódico del “event loop” simulado
  let procesamientos = 0;
  const interval = setInterval(() => {
    procesarEventLoop();
    procesamientos++;
    if (procesamientos > 8) {
      clearInterval(interval);
      log(
        "\\n💡 CONCLUSIÓN: Las Microtasks tienen MÁS prioridad que las Tasks"
      );
    }
  }, 400);
}

// =============== ARRANQUE ===============
actualizarVisualizacion(); // Pintamos vacío al iniciar
```

## 🎯 **El Orden de Ejecución (¡CRUCIAL!)**

```jsx
console.log("1. 🟢 Script inicio"); // Call Stack

setTimeout(() => {
  console.log("6. ⏰ setTimeout"); // Task Queue
}, 0);

Promise.resolve().then(() => {
  console.log("4. 🤝 Microtask 1"); // Microtask Queue
});

Promise.resolve().then(() => {
  console.log("5. 🤝 Microtask 2"); // Microtask Queue
});

console.log("2. 🟡 Script medio"); // Call Stack

queueMicrotask(() => {
  console.log("3. ⚡ queueMicrotask"); // Microtask Queue
});

console.log("7. 🔴 Script fin"); // Call Stack

// RESULTADO:
// 1. 🟢 Script inicio
// 2. 🟡 Script medio
// 7. 🔴 Script fin
// 4. 🤝 Microtask 1
// 5. 🤝 Microtask 2
// 3. ⚡ queueMicrotask
// 6. ⏰ setTimeout
```

# 🧩 Aquí tenemos ejemplos prácticos reales de la aplicación de estos mecanismos

## 💻 **Demo Interactivo: Visualizando el Call Stack y la pila de funciones**

Aquí tienes un ejemplo completo que muestra visualmente cómo se apilan y desapilan las funciones:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Call Stack - Demo Visual</title>
  </head>
  <body>
    <div class="container">
      <h1>🏗️ Call Stack (Pila de Llamadas)</h1>
      <p>
        <strong>Definición sencilla:</strong> La "pila de platos" donde
        JavaScript apila las funciones que está ejecutando.
      </p>
      <div class="explicacion">
        <h3>🎯 Reglas del Call Stack:</h3>
        <p>
          ✅ <strong>LIFO:</strong> Last In, First Out (Último en entrar,
          primero en salir)
        </p>
        <p>
          ✅ <strong>Una a la vez:</strong> Solo se ejecuta la función en el
          tope de la pila
        </p>
        <p>
          ✅ <strong>Bloqueante:</strong> Si una función tarda, todo se detiene
        </p>
      </div>
      <h2>📊 Call Stack en Tiempo Real</h2>
      <div class="call-stack" id="callStack">
        <div class="funcion principal" style="opacity: 0.7;">
          [BASE] Contexto Global
        </div>
      </div>
      <div class="controles">
        <button class="btn-ejecutar" onclick="ejecutarEjemploCompleto()">
          🚀 Ejecutar Ejemplo Completo
        </button>
        <button class="btn-paso" onclick="ejecutarPasoAPaso()">
          👣 Ejecutar Paso a Paso
        </button>
        <button class="btn-limpiar" onclick="limpiarStack()">
          🗑️ Limpiar Stack
        </button>
      </div>
      <h3>📝 Código que se ejecutará:</h3>
      <div class="codigo">
        function funcionA() {<br />
        &nbsp;&nbsp;console.log("🔵 Entrando a función A");<br />
        &nbsp;&nbsp;funcionB(); // Llama a B desde A<br />
        &nbsp;&nbsp;console.log("🔵 Saliendo de función A");<br />
        }<br /><br />
        function funcionB() {<br />
        &nbsp;&nbsp;console.log("🟢 Entrando a función B");<br />
        &nbsp;&nbsp;funcionC(); // Llama a C desde B<br />
        &nbsp;&nbsp;console.log("🟢 Saliendo de función B");<br />
        }<br /><br />
        function funcionC() {<br />
        &nbsp;&nbsp;console.log("🟡 Entrando a función C");<br />
        &nbsp;&nbsp;console.log("🟡 Ejecutando código en C");<br />
        &nbsp;&nbsp;console.log("🟡 Saliendo de función C");<br />
        }<br /><br />
        // Llamada inicial<br />
        funcionA();
      </div>
      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.call-stack {
  border: 3px solid #dc3545;
  border-radius: 10px;
  padding: 20px;
  background: #f8d7da;
  min-height: 400px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  margin: 20px 0;
}
.funcion {
  background: white;
  padding: 15px;
  margin: 5px 0;
  border-radius: 8px;
  border-left: 5px solid;
  width: 80%;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.funcion.entrando {
  animation: entrar 0.5s ease;
}
.funcion.saliendo {
  animation: salir 0.5s ease;
}
@keyframes entrar {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes salir {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-50px);
    opacity: 0;
  }
}
.principal {
  border-left-color: #dc3545;
}
.secundaria {
  border-left-color: #007bff;
}
.terciaria {
  border-left-color: #28a745;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-ejecutar {
  background: #28a745;
  color: white;
}
.btn-paso {
  background: #007bff;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.controles {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}
.explicacion {
  background: #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
}
```

```jsx
// ===================== ELEMENTOS DEL DOM =====================
// Donde pintamos visualmente la pila y los logs
const callStackElement = document.getElementById("callStack");
const consolaElement = document.getElementById("consola");

// ===================== ESTADO DEL STACK =====================
// La pila arranca con el contexto global (como en JS real)
let callStack = ["[BASE] Contexto Global"];
// Flag para evitar que se disparen acciones simultáneas/solapadas
let ejecucionEnCurso = false;
/**
 * 🧾 log(mensaje)
 * Añade una línea a la "consola" visual y hace autoscroll.
 */
function log(mensaje) {
  consolaElement.innerHTML += `<div>${mensaje}</div>`;
  consolaElement.scrollTop = consolaElement.scrollHeight;
}

/**
 * 🖼️ actualizarStackVisual()
 * Vuelve a pintar toda la pila según el estado actual.
 * Aplica clases CSS en función del nombre para colorear (A/B/C).
 */
function actualizarStackVisual() {
  callStackElement.innerHTML = "";

  callStack.forEach((funcion, index) => {
    const div = document.createElement("div");
    // Color/estilo según el nombre de la función (didáctico)
    div.className = `funcion ${
      funcion.includes("A")
        ? "principal"
        : funcion.includes("B")
        ? "secundaria"
        : funcion.includes("C")
        ? "terciaria"
        : "principal"
    }`;
    div.textContent = funcion;

    // Efecto "entrando" al tope de la pila (si hay más de 1 elemento)
    if (index === callStack.length - 1 && callStack.length > 1) {
      div.classList.add("entrando");
    }

    callStackElement.appendChild(div);
  });
}

/**
 * ⬆️ apilarFuncion(nombreFuncion)
 * Empuja una "función" al tope de la pila y repinta.
 */
function apilarFuncion(nombreFuncion) {
  callStack.push(nombreFuncion);
  log(`📥 APILANDO: ${nombreFuncion}`);
  actualizarStackVisual();
}

/**
 * ⬇️ desapilarFuncion()
 * Saca del tope de la pila si no estamos en el contexto base.
 */
function desapilarFuncion() {
  if (callStack.length > 1) {
    const funcion = callStack.pop();
    log(`📤 DESAPILANDO: ${funcion}`);
    actualizarStackVisual();
    return funcion;
  }
}

/**
 * 🧹 limpiarStack()
 * Resetea pila, consola y marca que no hay ejecución en curso.
 */
function limpiarStack() {
  callStack = ["[BASE] Contexto Global"];
  consolaElement.innerHTML = "";
  actualizarStackVisual();
  ejecucionEnCurso = false;
}

// ===================== 1) EJEMPLO COMPLETO AUTOMÁTICO =====================

/**
 * ▶️ ejecutarEjemploCompleto()
 * Simula A → B → C con esperas (delay) para ver entradas/salidas en la pila.
 * Evita reentradas usando el flag ejecucionEnCurso.
 */
async function ejecutarEjemploCompleto() {
  if (ejecucionEnCurso) return; // evita doble ejecución
  ejecucionEnCurso = true;
  limpiarStack();

  log("🚀 INICIANDO EJECUCIÓN COMPLETA");

  // “Funciones” simuladas que apilan/desapilan y esperan con delay
  async function funcionA() {
    apilarFuncion("funcionA()");
    await delay(1000);
    log("🔵 Ejecutando código en A...");

    // A llama a B
    await funcionB();

    log("🔵 Finalizando código en A...");
    await delay(500);
    desapilarFuncion(); // sale A
  }

  async function funcionB() {
    apilarFuncion("funcionB()");
    await delay(1000);
    log("🟢 Ejecutando código en B...");

    // B llama a C
    await funcionC();

    log("🟢 Finalizando código en B...");
    await delay(500);
    desapilarFuncion(); // sale B
  }

  async function funcionC() {
    apilarFuncion("funcionC()");
    await delay(1000);
    log("🟡 Ejecutando código en C...");
    await delay(500);
    log("🟡 Más código en C...");
    await delay(500);
    desapilarFuncion(); // sale C
  }

  // Utilidad para “pausar” (simula trabajo síncrono prolongado)
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Secuencia: A (que llama a B, que llama a C)
  await funcionA();
  log("🎯 ¡Ejecución completada!");
  ejecucionEnCurso = false;
}

// ===================== 2) EJEMPLO PASO A PASO =====================

/**
 * El array `pasos` define una “macro grabada” de acciones:
 * - apilar/desapilar funciones
 * - escribir logs
 * - mensaje de inicio/fin
 * `pasoActual` avanza uno a uno en cada click/llamada a ejecutarPasoAPaso()
 */
let pasoActual = 0;
const pasos = [
  { accion: "inicio", mensaje: "👋 Preparado para ejecutar paso a paso" },
  {
    accion: "apilar",
    funcion: "funcionA()",
    mensaje: "📥 Llamando a funcionA()",
  },
  { accion: "log", mensaje: "🔵 Ejecutando código en A..." },
  {
    accion: "apilar",
    funcion: "funcionB()",
    mensaje: "📥 funcionA() llama a funcionB()",
  },
  { accion: "log", mensaje: "🟢 Ejecutando código en B..." },
  {
    accion: "apilar",
    funcion: "funcionC()",
    mensaje: "📥 funcionB() llama a funcionC()",
  },
  { accion: "log", mensaje: "🟡 Ejecutando código en C..." },
  { accion: "log", mensaje: "🟡 Más código en C..." },
  { accion: "desapilar", mensaje: "📤 funcionC() termina - se desapila" },
  { accion: "log", mensaje: "🟢 Volviendo a funcionB()..." },
  { accion: "desapilar", mensaje: "📤 funcionB() termina - se desapila" },
  { accion: "log", mensaje: "🔵 Volviendo a funcionA()..." },
  { accion: "desapilar", mensaje: "📤 funcionA() termina - se desapila" },
  { accion: "fin", mensaje: "🎉 ¡Todas las funciones completadas!" },
];

/**
 * ⏭️ ejecutarPasoAPaso()
 * Ejecuta el siguiente paso de la secuencia. Al terminar, reinicia estados.
 */
function ejecutarPasoAPaso() {
  if (ejecucionEnCurso) return;

  // Al primer paso, limpiamos y bloqueamos ejecución concurrente
  if (pasoActual === 0) {
    limpiarStack();
    ejecucionEnCurso = true;
  }

  // Si ya no quedan pasos, reseteamos
  if (pasoActual >= pasos.length) {
    pasoActual = 0;
    ejecucionEnCurso = false;
    return;
  }

  const paso = pasos[pasoActual];

  // Ejecutamos según el tipo de acción
  switch (paso.accion) {
    case "apilar":
      log(paso.mensaje);
      apilarFuncion(paso.funcion);
      break;
    case "desapilar":
      log(paso.mensaje);
      desapilarFuncion();
      break;
    case "log":
      log(paso.mensaje);
      break;
    case "inicio":
    case "fin":
      log(paso.mensaje);
      break;
  }

  pasoActual++;
}

// ===================== 3) EJEMPLO DE STACK OVERFLOW =====================

/**
 * demostrarStackOverflow()
 * Muestra cómo una recursión profunda provoca desbordamiento de pila (teórico).
 * Nota: en esta demo NO se invoca realmente la recursión infinita (sería poco amable con la página).
 */
function demostrarStackOverflow() {
  log("⚠️ DEMOSTRACIÓN DE STACK OVERFLOW");

  function funcionRecursiva(contador) {
    apilarFuncion(`funcionRecursiva(${contador})`);

    if (contador <= 0) {
      // Caso base: detener recursión
      desapilarFuncion();
      return;
    }

    // Recursión: en la vida real, una condición errónea (o muy grande) desbordaría la pila
    funcionRecursiva(contador - 1);
    desapilarFuncion();
  }

  // Aquí solo explicamos, no lanzamos una recursión enorme para no colgar la UI.
  log("💥 Demostración: Llamadas recursivas profundas (no ejecutadas aquí)");
}

// ===================== INICIO =====================
actualizarStackVisual(); // Pintado inicial (solo contexto global)
```

## 🔄 **Ejemplo Real Sencillo: Cómo se Apilan las Funciones**

## 🍕 Simulador de Pedidos de Comida

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simulador de Pedidos - Call Stack Visual</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>🍕 Simulador de Pedidos - Call Stack Visual</h1>

    <div class="container">
      <div class="panel">
        <h3>Call Stack</h3>
        <div id="callStack" class="call-stack"></div>
      </div>

      <div class="panel">
        <h3>Web APIs</h3>
        <div id="webApis" class="web-apis"></div>

        <h3>Callback Queue</h3>
        <div id="callbackQueue" class="callback-queue"></div>
      </div>
    </div>

    <div class="controls">
      <button onclick="hacerPedido()">Hacer Pedido de Pizza</button>
      <button onclick="consultarEstado()">Consultar Estado</button>
      <button onclick="cancelarPedido()">Cancelar Pedido</button>
      <button onclick="limpiarLog()">Limpiar Log</button>
    </div>

    <div class="log-container">
      <h3>Log de Ejecución</h3>
      <div id="log" class="log"></div>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  min-height: 100vh;
}

h1 {
  text-align: center;
  color: white;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.panel {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.panel h3 {
  margin-bottom: 15px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 5px;
}

.call-stack,
.web-apis,
.callback-queue {
  min-height: 200px;
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
}

.call-stack {
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
}

.web-apis {
  background: linear-gradient(145deg, #e3f2fd, #bbdefb);
}

.callback-queue {
  background: linear-gradient(145deg, #fff3e0, #ffe0b2);
}

.stack-item {
  background: linear-gradient(145deg, #27ae60, #2ecc71);
  color: white;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-weight: bold;
}

.queue-item {
  background: linear-gradient(145deg, #e67e22, #f39c12);
  color: white;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-weight: bold;
}

.controls {
  text-align: center;
  margin-bottom: 30px;
}

button {
  background: linear-gradient(145deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 24px;
  margin: 5px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: translateY(0);
}

.log-container {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.log {
  background: #1a1a1a;
  color: #00ff00;
  padding: 20px;
  border-radius: 8px;
  font-family: "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  border: 2px solid #333;
}

.log div {
  margin-bottom: 5px;
  padding: 5px;
  border-left: 3px solid #00ff00;
  padding-left: 10px;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stack-item,
.queue-item {
  animation: fadeIn 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .panel {
    min-width: auto;
  }

  button {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
}
```

```jsx
// Variables para simular el estado
let pedidoEnProceso = false;
let numeroPedido = 0;
let timeoutIds = [];

// Función para actualizar la visualización
function actualizarVisualizacion(
  callStack = [],
  webApis = [],
  callbackQueue = []
) {
  const callStackElement = document.getElementById("callStack");
  const webApisElement = document.getElementById("webApis");
  const callbackQueueElement = document.getElementById("callbackQueue");

  callStackElement.innerHTML = callStack
    .map((item) => `<div class="stack-item">${item}</div>`)
    .join("");

  webApisElement.innerHTML = webApis
    .map((item) => `<div class="queue-item">${item}</div>`)
    .join("");

  callbackQueueElement.innerHTML = callbackQueue
    .map((item) => `<div class="queue-item">${item}</div>`)
    .join("");
}

// Función para agregar logs
function log(mensaje, tipo = "info") {
  const logDiv = document.getElementById("log");
  const timestamp = new Date().toLocaleTimeString();
  const color =
    {
      info: "#00ff00",
      error: "#ff4444",
      warning: "#ffaa00",
      success: "#44ff44",
    }[tipo] || "#00ff00";

  const logEntry = document.createElement("div");
  logEntry.style.color = color;
  logEntry.innerHTML = `<strong>[${timestamp}]</strong> ${mensaje}`;

  logDiv.appendChild(logEntry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Función para limpiar el log
function limpiarLog() {
  document.getElementById("log").innerHTML = "";
  log("🔧 Log limpiado - Listo para nuevos pedidos", "info");
}

// Función principal - HACER PEDIDO
function hacerPedido() {
  log("🎯 CLICK: Usuario hace clic en 'Hacer Pedido'", "info");

  // 1. Entra al Call Stack
  actualizarVisualizacion(["hacerPedido()"], [], []);

  if (pedidoEnProceso) {
    log("❌ Ya hay un pedido en proceso - No se puede hacer otro", "error");
    // Sale del Call Stack
    actualizarVisualizacion([], [], []);
    return;
  }

  pedidoEnProceso = true;
  numeroPedido++;

  log(`📦 INICIANDO PEDIDO #${numeroPedido}`, "success");
  log("1️⃣ Procesando pago del pedido...", "info");

  // Simular procesamiento síncrono
  procesarPago();

  log("3️⃣ Pedido confirmado, cocinando pizza... 🍕", "info");

  // 2. setTimeout entra al Call Stack y luego pasa a Web APIs
  actualizarVisualizacion(["setTimeout()"], [], []);

  const timeoutId = setTimeout(() => {
    // 5. Callback entra a la Queue cuando termina el tiempo
    log("⏰ TIMEOUT COMPLETADO - Callback de pizza lista en Queue", "warning");
    actualizarVisualizacion([], [], ["callbackPizzaLista()"]);

    // 6. Event Loop mueve el callback al Call Stack cuando está vacío
    pizzaLista();
  }, 3000);

  timeoutIds.push(timeoutId);

  // 3. setTimeout sale del Call Stack, callback queda en Web APIs
  log("4️⃣ Pizza en el horno (esperando 3 segundos)... 🔥", "info");
  actualizarVisualizacion(
    [],
    [`setTimeout(${timeoutId}) - Pizza en horno`],
    []
  );

  // 4. Función principal termina, Call Stack se vacía
  log("✅ Función hacerPedido() completada - Call Stack vacío", "success");
  actualizarVisualizacion(
    [],
    [`setTimeout(${timeoutId}) - Pizza en horno`],
    []
  );
}

function procesarPago() {
  log("2️⃣ EJECUTANDO: procesarPago() - Entra al Call Stack", "info");

  // Simular validación de pago
  actualizarVisualizacion(
    ["hacerPedido()", "procesarPago()"],
    ["setTimeout() - Pizza en horno"],
    []
  );

  log("💳 Validando tarjeta de crédito...", "info");

  // Pequeña pausa síncrona para simular procesamiento
  const inicio = Date.now();
  while (Date.now() - inicio < 1000) {
    // Simular trabajo (no hacer esto en producción)
  }

  log("✅ Pago procesado correctamente - €25.00", "success");

  // procesarPago sale del Call Stack
  actualizarVisualizacion(
    ["hacerPedido()"],
    ["setTimeout() - Pizza en horno"],
    []
  );
}

function pizzaLista() {
  log("🎉 PIZZA LISTA - Callback ejecutándose en Call Stack", "success");

  // Callback entra al Call Stack
  actualizarVisualizacion(["pizzaLista()"], [], []);

  log(`🍕 ¡Pedido #${numeroPedido} listo para entregar!`, "success");

  // Simular entrega
  log("🚗 Preparando entrega...", "info");

  const entregaTimeoutId = setTimeout(() => {
    log("📦 Callback de entrega listo en Queue", "warning");
    actualizarVisualizacion([], [], ["callbackEntrega()"]);
    entregarPizza();
  }, 2000);

  timeoutIds.push(entregaTimeoutId);

  log("⏱️ Entregando pizza (2 segundos)... 🚗", "info");
  actualizarVisualizacion(
    [],
    [`setTimeout(${entregaTimeoutId}) - Entregando pizza`],
    []
  );

  // pizzaLista sale del Call Stack
  actualizarVisualizacion(
    [],
    [`setTimeout(${entregaTimeoutId}) - Entregando pizza`],
    []
  );
}

function entregarPizza() {
  log("🏠 PIZZA ENTREGADA - Segundo callback ejecutándose", "success");
  actualizarVisualizacion(["entregarPizza()"], [], []);

  pedidoEnProceso = false;
  log("✅ ¡Pedido COMPLETADO exitosamente! ¡Disfruta tu pizza! 🎉", "success");

  // Limpiar timeouts
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];

  actualizarVisualizacion([], [], []);
}

function consultarEstado() {
  log("🔍 Consultando estado del pedido...", "info");
  actualizarVisualizacion(
    ["consultarEstado()"],
    ["setTimeout() - Pizza en horno"],
    []
  );

  const estado = pedidoEnProceso
    ? `Pedido #${numeroPedido} en proceso`
    : "Sin pedidos activos";

  log(`📊 Estado actual: ${estado}`, "info");

  // Sale inmediatamente del Call Stack
  actualizarVisualizacion([], ["setTimeout() - Pizza en horno"], []);
}

function cancelarPedido() {
  log("❌ Intentando cancelar pedido...", "warning");
  actualizarVisualizacion(
    ["cancelarPedido()"],
    ["setTimeout() - Pizza en horno"],
    []
  );

  if (!pedidoEnProceso) {
    log("ℹ️ No hay pedidos activos para cancelar", "info");
  } else {
    log(
      "⚠️ Pedido ya en proceso - No se puede cancelar una vez en cocina",
      "error"
    );
    log("💡 Sugerencia: Espera a que termine y haz uno nuevo", "info");
  }

  actualizarVisualizacion([], ["setTimeout() - Pizza en horno"], []);
}

// Estado inicial
document.addEventListener("DOMContentLoaded", function () {
  actualizarVisualizacion([], [], []);
  log("🚀 Simulador de Call Stack INICIADO", "success");
  log("👉 Haz clic en 'Hacer Pedido de Pizza' para comenzar", "info");
  log(
    "📊 Observa cómo se mueven las funciones entre Call Stack, Web APIs y Callback Queue",
    "info"
  );
});
```

## 🎯 **Cómo probar y ver el Call Stack en acción:**

1. **Copia todo el código** en un archivo `.html`
2. **Ábrelo en el navegador**
3. **Haz clic en "Hacer Pedido de Pizza"**
4. **Observa el flujo en tiempo real:**

## 📈 **Secuencia que verás:**

```
🎯 CLICK: Usuario hace clic en 'Hacer Pedido'
📦 Iniciando pedido #1
1️⃣ Procesando pago...
2️⃣ Dentro de procesarPago()
💳 Pago procesado correctamente
3️⃣ Pedido confirmado, cocinando pizza...
4️⃣ Pizza en el horno (3 segundos)...
✅ Función hacerPedido() completada - Call Stack vacío

[ESPERA 3 SEGUNDOS...]

⏰ TIMEOUT COMPLETADO - Callback listo para ejecutar
🎉 PIZZA LISTA - Callback ejecutándose
🍕 ¡Pedido #1 listo para entregar!
🚗 Entregando pizza (2 segundos)...

[ESPERA 2 SEGUNDOS...]

📦 Callback de entrega en Queue
🏠 PIZZA ENTREGADA - Segundo callback ejecutándose
✅ Pedido completado exitosamente!

```

## 🔍 **Lo más importante que verás visualmente:**

- **Call Stack**: Se llena y vacía constantemente
- **Web APIs**: Los `setTimeout` "viven" aquí mientras esperan
- **Callback Queue**: Los callbacks esperan aquí su turno
- **Event Loop**: Mueve callbacks de la Queue al Stack cuando está vacío

**¡La magia está en que puedes hacer clic en otros botones mientras la pizza está "en el horno"!** Eso demuestra que JavaScript **no se bloquea** durante las operaciones asíncronas.

¿Ves cómo funciona el baile entre estas tres áreas? ¡Es como una coreografía perfecta! 💃🕺

## 🚨 **Stack Overflow (Desbordamiento de Pila)**

---

## 📁 **1. stack-overflow.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo Stack Overflow</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
        color: #333;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      }

      h1 {
        color: #2c3e50;
        text-align: center;
        margin-bottom: 30px;
      }

      .stack-visualization {
        background: #2c3e50;
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        max-height: 300px;
        overflow-y: auto;
        font-family: "Courier New", monospace;
      }

      .stack-frame {
        background: #3498db;
        margin: 5px 0;
        padding: 10px;
        border-radius: 5px;
        border-left: 4px solid #e74c3c;
      }

      .stack-warning {
        background: #e74c3c;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        text-align: center;
        font-weight: bold;
      }

      .controls {
        text-align: center;
        margin: 20px 0;
      }

      button {
        background: #3498db;
        color: white;
        border: none;
        padding: 12px 24px;
        margin: 5px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      button:hover {
        background: #2980b9;
        transform: translateY(-2px);
      }

      button.danger {
        background: #e74c3c;
      }

      button.danger:hover {
        background: #c0392b;
      }

      .explanation {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin: 15px 0;
        border-left: 4px solid #3498db;
      }

      .log {
        background: #1a1a1a;
        color: #00ff00;
        padding: 15px;
        border-radius: 8px;
        font-family: "Courier New", monospace;
        max-height: 200px;
        overflow-y: auto;
        margin: 15px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🚨 Demo de Stack Overflow</h1>

      <div class="explanation">
        <h3>¿Qué es un Stack Overflow?</h3>
        <p>
          Ocurre cuando una función se llama a sí misma
          <strong>infinitamente</strong> sin condición de salida, llenando el
          Call Stack hasta que el navegador no puede manejar más llamadas.
        </p>
      </div>

      <div class="controls">
        <button onclick="iniciarRecursionNormal()">
          🔁 Recursión Normal (Segura)
        </button>
        <button onclick="iniciarStackOverflow()" class="danger">
          💥 Provocar Stack Overflow
        </button>
        <button onclick="limpiarTodo()">🔄 Limpiar Todo</button>
      </div>

      <div class="stack-visualization">
        <h3>Call Stack Visualizer</h3>
        <div id="stackContainer"></div>
      </div>

      <div class="log">
        <h3>Log de Ejecución</h3>
        <div id="log"></div>
      </div>

      <div class="explanation">
        <h3>¿Por qué pasa esto?</h3>
        <p>
          El Call Stack tiene un <strong>límite máximo</strong> de llamadas
          anidadas (normalmente ~10,000-50,000 dependiendo del navegador).
          Cuando una función recursiva no tiene caso base o el caso base nunca
          se alcanza, el stack se llena hasta explotar. 💥
        </p>
      </div>
    </div>

    <script src="stack-overflow-demo.js"></script>
  </body>
</html>
```

## ⚡ **2. stack-overflow-demo.js**

```jsx
// Variables para controlar la visualización
let stackFrames = [];
let recursionCount = 0;
let maxSafeRecursion = 50; // Límite seguro para la demo
let isRunning = false;

// Función para actualizar la visualización del stack
function actualizarStackVisualization() {
  const stackContainer = document.getElementById("stackContainer");
  const framesHTML = stackFrames
    .map((frame, index) => {
      const depth = stackFrames.length - index;
      const backgroundColor =
        index === stackFrames.length - 1
          ? "linear-gradient(135deg, #e74c3c, #c0392b)"
          : "linear-gradient(135deg, #3498db, #2980b9)";

      return `
            <div class="stack-frame" style="
                background: ${backgroundColor};
                margin-left: ${depth * 10}px;
                transform: scale(${1 - index * 0.02});
            ">
                <strong>${frame.functionName}</strong>
                (nivel: ${frame.level})<br>
                <small>Recursión #${frame.iteration}</small>
            </div>
        `;
    })
    .join("");

  stackContainer.innerHTML = framesHTML;

  // Mostrar advertencia si el stack está creciendo mucho
  if (stackFrames.length > maxSafeRecursion * 0.7) {
    const warning = document.createElement("div");
    warning.className = "stack-warning";
    warning.innerHTML = `⚠️ STACK CRECIENDO PELIGROSAMENTE: ${stackFrames.length} frames`;
    stackContainer.prepend(warning);
  }
}

// Función para agregar logs
function log(mensaje, tipo = "info") {
  const logDiv = document.getElementById("log");
  const timestamp = new Date().toLocaleTimeString();
  const color =
    {
      info: "#3498db",
      error: "#e74c3c",
      success: "#2ecc71",
      warning: "#f39c12",
    }[tipo] || "#3498db";

  const logEntry = document.createElement("div");
  logEntry.style.color = color;
  logEntry.innerHTML = `[${timestamp}] ${mensaje}`;

  logDiv.appendChild(logEntry);
  logDiv.scrollTop = logDiv.scrollHeight;
}

// Función para limpiar todo
function limpiarTodo() {
  stackFrames = [];
  recursionCount = 0;
  isRunning = false;
  actualizarStackVisualization();
  document.getElementById("log").innerHTML = "";
  log("✅ Todo limpiado - Listo para nueva demo", "success");
}

// ========== DEMO 1: RECURSIÓN NORMAL (SEGURA) ==========

function recursionSegura(nivel = 0) {
  if (!isRunning) return;

  // CASO BASE: Detenerse cuando llegamos al límite seguro
  if (nivel >= maxSafeRecursion) {
    log(`✅ RECURSIÓN SEGURA COMPLETADA: Alcanzado nivel ${nivel}`, "success");
    isRunning = false;
    return;
  }

  recursionCount++;

  // Agregar frame al stack
  stackFrames.push({
    functionName: "recursionSegura()",
    level: nivel,
    iteration: recursionCount,
  });

  actualizarStackVisualization();
  log(
    `🔁 Recursión segura - Nivel: ${nivel}, Stack size: ${stackFrames.length}`
  );

  // Simular algún trabajo
  const inicio = Date.now();
  while (Date.now() - inicio < 20) {
    // Pequeña pausa para visualización
  }

  // Llamada recursiva
  recursionSegura(nivel + 1);

  // Remover frame del stack (esto muestra cómo se desapila)
  stackFrames.pop();
  actualizarStackVisualization();
}

function iniciarRecursionNormal() {
  if (isRunning) {
    log("⚠️ Ya hay una ejecución en curso", "warning");
    return;
  }

  limpiarTodo();
  isRunning = true;
  log("🚀 INICIANDO RECURSIÓN SEGURA", "success");
  log(`📏 Límite seguro: ${maxSafeRecursion} niveles`, "info");

  setTimeout(() => {
    recursionSegura(0);
  }, 100);
}

// ========== DEMO 2: STACK OVERFLOW ==========

function funcionInfinita(nivel = 0) {
  // ¡NO HAY CASO BASE! Esto causará stack overflow
  recursionCount++;

  // Agregar frame al stack
  stackFrames.push({
    functionName: "funcionInfinita()",
    level: nivel,
    iteration: recursionCount,
  });

  // Actualizar visualización cada ciertos niveles para no saturar
  if (recursionCount % 100 === 0) {
    actualizarStackVisualization();
    log(
      `📈 Stack creciendo - Nivel: ${nivel}, Frames: ${stackFrames.length}`,
      "warning"
    );
  }

  // Llamada recursiva INFINITA
  funcionInfinita(nivel + 1);

  // Esta línea NUNCA se ejecutará
  stackFrames.pop();
}

function funcionConCondicionRota(nivel = 0) {
  recursionCount++;

  stackFrames.push({
    functionName: "funcionConCondicionRota()",
    level: nivel,
    iteration: recursionCount,
  });

  // ¡CONDICIÓN QUE NUNCA SE CUMPLE!
  // El stack overflow ocurrirá antes de que nivel alcance 100,000
  if (nivel > 100000) {
    log("🎯 ¡Caso base alcanzado! (esto nunca pasará)", "success");
    stackFrames.pop();
    return;
  }

  if (recursionCount % 200 === 0) {
    actualizarStackVisualization();
    log(`⚠️ Condición rota - Nivel: ${nivel}, Meta: 100,000`, "warning");
  }

  // Llamada recursiva
  funcionConCondicionRota(nivel + 1);

  stackFrames.pop();
}

function iniciarStackOverflow() {
  if (isRunning) {
    log("⚠️ Ya hay una ejecución en curso", "warning");
    return;
  }

  limpiarTodo();
  isRunning = true;
  recursionCount = 0;

  log("💥 INICIANDO STACK OVERFLOW DEMO", "error");
  log("❌ Esto crasheará el navegador - ¡Ten cuidado!", "error");
  log("🛑 El stack se llenará hasta el límite máximo...", "warning");

  // Usar setTimeout para dar tiempo a que se muestren los mensajes
  setTimeout(() => {
    try {
      // Elegir una de las dos funciones para demostrar
      if (Math.random() > 0.5) {
        log("🔨 Usando función infinita sin caso base...", "error");
        funcionInfinita(0);
      } else {
        log("🔨 Usando función con condición inalcanzable...", "error");
        funcionConCondicionRota(0);
      }
    } catch (error) {
      log(`💥 STACK OVERFLOW CAPTURADO: ${error.message}`, "error");
      isRunning = false;
    }
  }, 500);
}

// ========== DEMO 3: RECURSIÓN MUTUA (STACK OVERFLOW) ==========

function funcionA(nivel) {
  recursionCount++;

  stackFrames.push({
    functionName: "funcionA()",
    level: nivel,
    iteration: recursionCount,
  });

  if (recursionCount % 150 === 0) {
    actualizarStackVisualization();
    log(`🔄 Recursión mutua A→B - Nivel: ${nivel}`, "warning");
  }

  // Llamar a B
  funcionB(nivel + 1);

  stackFrames.pop();
}

function funcionB(nivel) {
  recursionCount++;

  stackFrames.push({
    functionName: "funcionB()",
    level: nivel,
    iteration: recursionCount,
  });

  if (recursionCount % 150 === 0) {
    actualizarStackVisualization();
    log(`🔄 Recursión mutua B→A - Nivel: ${nivel}`, "warning");
  }

  // Llamar de vuelta a A - ¡CICLO INFINITO!
  funcionA(nivel + 1);

  stackFrames.pop();
}

function iniciarRecursionMutua() {
  if (isRunning) {
    log("⚠️ Ya hay una ejecución en curso", "warning");
    return;
  }

  limpiarTodo();
  isRunning = true;
  recursionCount = 0;

  log("🔄 INICIANDO RECURSIÓN MUTUA INFINITA", "error");
  log("🔁 A llama a B, B llama a A... infinitamente", "warning");

  setTimeout(() => {
    try {
      funcionA(0);
    } catch (error) {
      log(`💥 STACK OVERFLOW EN RECURSIÓN MUTUA: ${error.message}`, "error");
      isRunning = false;
    }
  }, 500);
}

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  log("🚀 Demo de Stack Overflow cargado", "success");
  log("👉 Usa 'Recursión Normal' para ver cómo debería funcionar", "info");
  log(
    "⚠️ 'Provocar Stack Overflow' crasheará esta pestaña - ¡Cuidado!",
    "error"
  );
});

// Agregar el botón de recursión mutua dinámicamente
document.addEventListener("DOMContentLoaded", function () {
  const controls = document.querySelector(".controls");
  const mutuaButton = document.createElement("button");
  mutuaButton.className = "danger";
  mutuaButton.textContent = "🔄 Recursión Mutua Infinita";
  mutuaButton.onclick = iniciarRecursionMutua;
  controls.appendChild(mutuaButton);
});
```

## 🎯 **Cómo usar la demo:**

### **Prueba Segura (No crashea):**

1. **Haz clic en "Recursión Normal"**
2. **Observa** cómo el stack crece y luego se vacía ordenadamente
3. **Ve** cómo cada función sale del stack cuando termina

### **Stack Overflow (¡Cuidado!):**

1. **Haz clic en "Provocar Stack Overflow"**
2. **Observa** cómo el stack crece sin control
3. **Finalmente** el navegador mostrará un error y se detendrá

### **Recursión Mutua:**

1. **Haz clic en "Recursión Mutua Infinita"**
2. **Ve** cómo dos funciones se llaman mutuamente forever
3. **Observa** el stack overflow por ciclo infinito

## 🔍 **Qué observar:**

- **Stack creciendo**: Cada llamada agrega un frame
- **Límite máximo**: El navegador tiene un tope (~10-50k frames)
- **Error resultante**: "Maximum call stack size exceeded"
- **Diferencia**: Recursión segura vs. infinita

## ⚠️ **Advertencia importante:**

La demo de Stack Overflow **puede crashear la pestaña** del navegador. ¡Usa con cuidado y guarda tu trabajo antes de probar!

¿Quieres que modifique algo específico de la demo?

## 🧩 **Las Dos Colas: Task Queue vs Microtask Queue**

---

## 🔧 **Task Queue (Cola de Tareas)**

## Sistema de Notificaciones con Prioridades

## 📁 **1. index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Gestión de Notificaciones</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1>🚀 Sistema de Gestión de Notificaciones</h1>
        <p class="subtitle">Visualización del Event Loop en tiempo real</p>
      </header>

      <div class="dashboard">
        <!-- Panel de Control -->
        <div class="control-panel">
          <h2>🎮 Panel de Control</h2>
          <div class="buttons">
            <button onclick="iniciarSimulacion()" class="btn btn-primary">
              ▶️ Iniciar Simulación
            </button>
            <button
              onclick="agregarNotificacionManual()"
              class="btn btn-secondary"
            >
              ➕ Notificación Manual
            </button>
            <button onclick="limpiarTodo()" class="btn btn-danger">
              🗑️ Limpiar Todo
            </button>
          </div>

          <div class="stats">
            <div class="stat-card">
              <span class="stat-number" id="totalNotificaciones">0</span>
              <span class="stat-label">Total Notificaciones</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="urgentesCount">0</span>
              <span class="stat-label">Urgentes</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="normalesCount">0</span>
              <span class="stat-label">Normales</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="backgroundCount">0</span>
              <span class="stat-label">Background</span>
            </div>
          </div>
        </div>

        <!-- Visualización del Event Loop -->
        <div class="event-loop-viz">
          <h2>🔄 Event Loop - Colas de Prioridad</h2>
          <div class="queues-container">
            <div class="queue microtask-queue">
              <h3>🚨 Microtask Queue (Alta Prioridad)</h3>
              <div class="queue-items" id="microtaskQueue">
                <div class="queue-empty">Vacía</div>
              </div>
            </div>

            <div class="queue task-queue">
              <h3>🟡 Task Queue (Prioridad Normal)</h3>
              <div class="queue-items" id="taskQueue">
                <div class="queue-empty">Vacía</div>
              </div>
            </div>

            <div class="queue background-queue">
              <h3>🔵 Background Queue (Baja Prioridad)</h3>
              <div class="queue-items" id="backgroundQueue">
                <div class="queue-empty">Vacía</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call Stack -->
        <div class="call-stack-viz">
          <h2>📚 Call Stack</h2>
          <div class="stack-container">
            <div class="stack-items" id="callStack">
              <div class="stack-empty">Ejecución principal</div>
            </div>
          </div>
        </div>

        <!-- Log de Ejecución -->
        <div class="execution-log">
          <h2>📋 Log de Ejecución</h2>
          <div class="log-container">
            <div class="log-header">
              <span>Tiempo</span>
              <span>Tipo</span>
              <span>Mensaje</span>
              <span>Estado</span>
            </div>
            <div class="log-entries" id="logEntries"></div>
          </div>
        </div>

        <!-- Notificaciones Procesadas -->
        <div class="notifications-panel">
          <h2>📨 Notificaciones Procesadas</h2>
          <div class="notifications-list" id="notificationsList">
            <div class="empty-state">
              Las notificaciones aparecerán aquí cuando se procesen
            </div>
          </div>
        </div>
      </div>

      <!-- Explicación -->
      <div class="explanation">
        <h3>💡 ¿Cómo funciona el sistema de prioridades?</h3>
        <div class="priority-examples">
          <div class="priority-item urgent">
            <h4>🚨 URGENTE (Microtask Queue)</h4>
            <p>
              Se ejecuta inmediatamente después del código actual. Usado para
              errores críticos, validaciones de seguridad y respuestas
              inmediatas de API.
            </p>
          </div>
          <div class="priority-item normal">
            <h4>🟡 NORMAL (Task Queue)</h4>
            <p>
              Se ejecuta después de las microtasks. Usado para interacciones de
              usuario, actualizaciones de UI y mensajes normales.
            </p>
          </div>
          <div class="priority-item background">
            <h4>🔵 BACKGROUND (Task Queue con delay)</h4>
            <p>
              Se ejecuta después de un tiempo específico. Usado para analytics,
              logs y tareas de mantenimiento.
            </p>
          </div>
        </div>
      </div>
    </div>

    <script src="notificaciones.js"></script>
    <script src="visualizacion.js"></script>
  </body>
</html>
```

## 🎨 **2. styles.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 20px;
  margin-bottom: 30px;
}

.control-panel {
  grid-column: 1 / 2;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.control-panel h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  border-left: 4px solid #3498db;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.event-loop-viz {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.event-loop-viz h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.queues-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.queue {
  flex: 1;
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s ease;
}

.queue h3 {
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.microtask-queue {
  background: linear-gradient(135deg, #ffeaa7, #fab1a0);
  border: 2px solid #e17055;
}

.task-queue {
  background: linear-gradient(135deg, #81ecec, #74b9ff);
  border: 2px solid #0984e3;
}

.background-queue {
  background: linear-gradient(135deg, #a29bfe, #dfe6e9);
  border: 2px solid #6c5ce7;
}

.queue-items {
  min-height: 120px;
  max-height: 150px;
  overflow-y: auto;
}

.queue-empty {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 20px;
}

.queue-item {
  background: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.queue-item.urgent {
  border-left-color: #e74c3c;
}

.queue-item.normal {
  border-left-color: #f39c12;
}

.queue-item.background {
  border-left-color: #3498db;
}

.call-stack-viz {
  grid-column: 1 / 2;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.call-stack-viz h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.stack-container {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 10px;
  padding: 20px;
  min-height: 150px;
}

.stack-items {
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}

.stack-empty {
  text-align: center;
  color: #bdc3c7;
  font-style: italic;
  padding: 20px;
}

.stack-item {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  animation: stackPush 0.3s ease;
}

.execution-log {
  grid-column: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.execution-log h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.log-container {
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
}

.log-header {
  display: grid;
  grid-template-columns: 100px 120px 1fr 100px;
  gap: 15px;
  padding: 15px;
  background: #34495e;
  color: white;
  font-weight: 600;
}

.log-entries {
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  display: grid;
  grid-template-columns: 100px 120px 1fr 100px;
  gap: 15px;
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  animation: fadeIn 0.5s ease;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-entry.urgent {
  background: #ffeaa7;
}

.log-entry.normal {
  background: #dfe6e9;
}

.log-entry.background {
  background: #a29bfe;
  color: white;
}

.notifications-panel {
  grid-column: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.notifications-panel h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
}

.notification-item {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.notification-item.urgent {
  background: #ffeaa7;
  border-left-color: #e74c3c;
}

.notification-item.normal {
  background: #dfe6e9;
  border-left-color: #f39c12;
}

.notification-item.background {
  background: #a29bfe;
  border-left-color: #3498db;
  color: white;
}

.explanation {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.explanation h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.priority-examples {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.priority-item {
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid;
}

.priority-item.urgent {
  background: #ffeaa7;
  border-left-color: #e74c3c;
}

.priority-item.normal {
  background: #dfe6e9;
  border-left-color: #f39c12;
}

.priority-item.background {
  background: #a29bfe;
  border-left-color: #3498db;
  color: white;
}

.priority-item h4 {
  margin-bottom: 10px;
  font-size: 1.1rem;
}

/* Animaciones */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes stackPush {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .event-loop-viz {
    grid-column: 1;
    grid-row: 2;
  }

  .execution-log,
  .notifications-panel {
    grid-column: 1;
  }

  .priority-examples {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .buttons {
    flex-direction: column;
  }

  .log-header,
  .log-entry {
    grid-template-columns: 80px 100px 1fr 80px;
    font-size: 0.9rem;
  }
}
```

## ⚡ **3. visualizacion.js**

```jsx
// ===========================================================
// 📊 SISTEMA DE VISUALIZACIÓN PARA EL GESTOR DE NOTIFICACIONES
// ===========================================================
// Esta clase gestiona toda la lógica de interfaz visual:
// - Colas de tareas (urgentes, normales y background)
// - Pila de llamadas (Call Stack)
// - Historial de eventos (Log)
// - Lista de notificaciones procesadas
// - Contadores de estadísticas
class VisualizadorEventLoop {
  constructor() {
    // 🧮 Inicializamos contadores de notificaciones por tipo
    this.contadores = {
      total: 0, // Total de notificaciones procesadas
      urgentes: 0, // Microtasks (alta prioridad)
      normales: 0, // Tasks normales (prioridad estándar)
      background: 0, // Tareas en background (baja prioridad)
    };
  }

  /**
   * 📈 actualizarEstadisticas()
   * Actualiza los contadores visibles en el DOM
   * según el estado actual del objeto `this.contadores`.
   */
  actualizarEstadisticas() {
    document.getElementById("totalNotificaciones").textContent =
      this.contadores.total;
    document.getElementById("urgentesCount").textContent =
      this.contadores.urgentes;
    document.getElementById("normalesCount").textContent =
      this.contadores.normales;
    document.getElementById("backgroundCount").textContent =
      this.contadores.background;
  }

  /**
   * 🧾 agregarALog(timestamp, tipo, mensaje, estado)
   * Registra un nuevo evento en el panel de LOG visual.
   * Cada entrada muestra:
   * - Hora
   * - Tipo (urgente / normal / background)
   * - Mensaje descriptivo
   * - Estado (ej: "Encolado", "Procesado")
   */
  agregarALog(timestamp, tipo, mensaje, estado) {
    const logEntries = document.getElementById("logEntries");
    const logEntry = document.createElement("div");
    logEntry.className = `log-entry ${tipo}`;

    logEntry.innerHTML = `
            <span>${timestamp}</span>
            <span>
                ${
                  tipo === "urgent"
                    ? "🚨 URGENTE"
                    : tipo === "normal"
                    ? "🟡 NORMAL"
                    : "🔵 BACKGROUND"
                }
            </span>
            <span>${mensaje}</span>
            <span>${estado}</span>
        `;

    logEntries.appendChild(logEntry);
    logEntries.scrollTop = logEntries.scrollHeight; // auto-scroll al final
  }

  /**
   * 📥 agregarACola(tipo, mensaje, id)
   * Añade un item visual a la cola correspondiente según el tipo.
   * - 'urgent' → microtaskQueue
   * - 'normal' → taskQueue
   * - 'background' → backgroundQueue
   * También elimina el mensaje "Vacía" si la cola estaba vacía.
   */
  agregarACola(tipo, mensaje, id) {
    const queueId =
      tipo === "urgent"
        ? "microtaskQueue"
        : tipo === "normal"
        ? "taskQueue"
        : "backgroundQueue";

    const queue = document.getElementById(queueId);
    const queueItem = document.createElement("div");
    queueItem.className = `queue-item ${tipo}`;
    queueItem.id = `queue-${id}`;
    queueItem.innerHTML = `
            <strong>${mensaje.substring(0, 30)}...</strong>
            <div class="queue-time">${new Date().toLocaleTimeString()}</div>
        `;

    // Si hay mensaje "Vacía", lo quitamos porque ahora hay elementos
    const emptyMsg = queue.querySelector(".queue-empty");
    if (emptyMsg) {
      emptyMsg.remove();
    }

    queue.appendChild(queueItem);
    queue.scrollTop = queue.scrollHeight;
  }

  /**
   * 🗑️ removerDeCola(tipo, id)
   * Quita un item visual de la cola según su id.
   * Si la cola queda vacía, vuelve a mostrar el mensaje "Vacía".
   */
  removerDeCola(tipo, id) {
    const queueId =
      tipo === "urgent"
        ? "microtaskQueue"
        : tipo === "normal"
        ? "taskQueue"
        : "backgroundQueue";

    const queueItem = document.getElementById(`queue-${id}`);
    if (queueItem) {
      queueItem.remove();
    }

    const queue = document.getElementById(queueId);
    if (queue.children.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "queue-empty";
      emptyMsg.textContent = "Vacía";
      queue.appendChild(emptyMsg);
    }
  }

  /**
   * 🧱 agregarAlStack(funcion)
   * Simula la entrada de una función en el Call Stack.
   * Si el stack estaba vacío (solo tenía el mensaje base),
   * se elimina ese mensaje antes de agregar la nueva función.
   */
  agregarAlStack(funcion) {
    const stack = document.getElementById("callStack");
    const stackItem = document.createElement("div");
    stackItem.className = "stack-item";
    stackItem.textContent = funcion;

    const emptyMsg = stack.querySelector(".stack-empty");
    if (emptyMsg) {
      emptyMsg.remove();
    }

    stack.appendChild(stackItem);
  }

  /**
   * ⬇️ removerDelStack()
   * Simula la salida de la función más reciente del Call Stack.
   * Si la pila queda vacía, vuelve a mostrar el mensaje base
   * "Ejecución principal".
   */
  removerDelStack() {
    const stack = document.getElementById("callStack");
    if (stack.children.length > 0) {
      stack.removeChild(stack.lastChild);
    }

    if (stack.children.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "stack-empty";
      emptyMsg.textContent = "Ejecución principal";
      stack.appendChild(emptyMsg);
    }
  }

  /**
   * 📬 agregarNotificacionProcesada(tipo, mensaje, datos)
   * Muestra una notificación procesada en el panel lateral.
   * Incluye:
   * - Tipo (con icono)
   * - Hora de procesamiento
   * - Mensaje original
   * - Datos en JSON
   */
  agregarNotificacionProcesada(tipo, mensaje, datos) {
    const notificationsList = document.getElementById("notificationsList");
    const notificationItem = document.createElement("div");
    notificationItem.className = `notification-item ${tipo}`;

    notificationItem.innerHTML = `
            <div class="notification-header">
                <strong>${
                  tipo === "urgent"
                    ? "🚨 URGENTE"
                    : tipo === "normal"
                    ? "🟡 NORMAL"
                    : "🔵 BACKGROUND"
                }</strong>
                <span class="notification-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="notification-message">${mensaje}</div>
            <div class="notification-data">${JSON.stringify(datos)}</div>
        `;

    // Quitar mensaje de estado vacío si existe
    const emptyState = notificationsList.querySelector(".empty-state");
    if (emptyState) {
      emptyState.remove();
    }

    notificationsList.appendChild(notificationItem);
    notificationsList.scrollTop = notificationsList.scrollHeight;
  }

  /**
   * 🔢 incrementarContador(tipo)
   * Incrementa el contador total y el del tipo específico
   * y actualiza la interfaz.
   */
  incrementarContador(tipo) {
    this.contadores.total++;
    this.contadores[tipo + "s"]++;
    this.actualizarEstadisticas();
  }
}

// ============================================
// 📌 INSTANCIA GLOBAL DEL VISUALIZADOR
// ============================================
const visualizador = new VisualizadorEventLoop();

/**
 * 🧼 limpiarTodo()
 * Restablece toda la interfaz a su estado inicial:
 * - Colas vacías
 * - Stack con mensaje base
 * - Log limpio
 * - Lista de notificaciones con mensaje por defecto
 * - Contadores en cero
 */
function limpiarTodo() {
  document.getElementById("microtaskQueue").innerHTML =
    '<div class="queue-empty">Vacía</div>';
  document.getElementById("taskQueue").innerHTML =
    '<div class="queue-empty">Vacía</div>';
  document.getElementById("backgroundQueue").innerHTML =
    '<div class="queue-empty">Vacía</div>';
  document.getElementById("callStack").innerHTML =
    '<div class="stack-empty">Ejecución principal</div>';
  document.getElementById("logEntries").innerHTML = "";
  document.getElementById("notificationsList").innerHTML =
    '<div class="empty-state">Las notificaciones aparecerán aquí cuando se procesen</div>';

  visualizador.contadores = {
    total: 0,
    urgentes: 0,
    normales: 0,
    background: 0,
  };
  visualizador.actualizarEstadisticas();
}

/**
 * ✉️ agregarNotificacionManual()
 * Simula la llegada de una notificación aleatoria con tipo y mensaje predefinidos:
 * - urgent → Microtask Queue
 * - normal → Task Queue
 * - background → Background Queue
 *
 * También:
 * - La agrega al log
 * - La mete en la cola visual
 * - Incrementa contadores
 * - Programa su “procesamiento” con un setTimeout según prioridad
 */
function agregarNotificacionManual() {
  // Seleccionamos tipo aleatorio
  const tipos = ["urgent", "normal", "background"];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];

  // Mensajes predeterminados según el tipo
  const mensajes = {
    urgent: ["Error de conexión", "Validación fallida", "Alerta de seguridad"],
    normal: ["Mensaje recibido", "Actualización de UI", "Evento de usuario"],
    background: ["Enviar analytics", "Limpiar cache", "Sincronizar datos"],
  };

  // Seleccionamos mensaje aleatorio del tipo
  const mensaje =
    mensajes[tipo][Math.floor(Math.random() * mensajes[tipo].length)];
  const id = Date.now(); // id único basado en timestamp

  // Log de encolado
  visualizador.agregarALog(
    new Date().toLocaleTimeString(),
    tipo,
    mensaje,
    "Encolado"
  );

  // Agregar a la cola visual
  visualizador.agregarACola(tipo, mensaje, id);
  visualizador.incrementarContador(tipo);

  // Simular procesamiento automático tras un tiempo distinto por prioridad
  setTimeout(
    () => {
      visualizador.removerDeCola(tipo, id);
      visualizador.agregarALog(
        new Date().toLocaleTimeString(),
        tipo,
        mensaje,
        "Procesado"
      );
      visualizador.agregarNotificacionProcesada(tipo, mensaje, { id: id });
    },
    tipo === "urgent" ? 100 : tipo === "normal" ? 500 : 2000
  );
}
```

## ⚡ **3. notificaciones.js**

```jsx
/**
 * 🚀 SISTEMA REAL: Gestor de Notificaciones con Diferentes Prioridades
 *
 * Escenario: Una aplicación que recibe notificaciones de diferentes fuentes
 * y necesita manejarlas con prioridades inteligentes usando el Event Loop
 */

class GestorNotificaciones {
  constructor() {
    this.notificaciones = [];
    this.isProcesando = false;
  }

  /**
   * 🔴 NOTIFICACIÓN DE ALTA PRIORIDAD (Microtask Queue)
   * Uso: Errores críticos, respuestas inmediatas de API, validaciones
   * Comportamiento: Se ejecuta INMEDIATAMENTE después del código actual
   */
  agregarNotificacionUrgente(mensaje, datos) {
    console.log(`🚨 [URGENTE] Encolando: ${mensaje}`);

    // Usamos Promise para máxima prioridad (Microtask Queue)
    Promise.resolve().then(() => {
      this._procesarNotificacionUrgente(mensaje, datos);
    });
  }

  /**
   * 🟡 NOTIFICACIÓN DE MEDIA PRIORIDAD (Task Queue con delay 0)
   * Uso: Actualizaciones de UI, notificaciones de usuario, procesos normales
   * Comportamiento: Se ejecuta después de todas las microtasks
   */
  agregarNotificacionNormal(mensaje, datos) {
    console.log(`🟡 [NORMAL] Encolando: ${mensaje}`);

    // Usamos setTimeout para prioridad normal (Task Queue)
    setTimeout(() => {
      this._procesarNotificacionNormal(mensaje, datos);
    }, 0);
  }

  /**
   * 🔵 NOTIFICACIÓN DE BAJA PRIORIDAD (Task Queue con delay)
   * Uso: Logs, analytics, tareas de mantenimiento, procesos en segundo plano
   * Comportamiento: Se ejecuta después de un tiempo específico
   */
  agregarNotificacionBackground(mensaje, datos, delay = 1000) {
    console.log(`🔵 [BACKGROUND] Encolando: ${mensaje} (delay: ${delay}ms)`);

    // Usamos setTimeout con delay para baja prioridad
    setTimeout(() => {
      this._procesarNotificacionBackground(mensaje, datos);
    }, delay);
  }

  /**
   * 🎯 PROCESAMIENTO DE NOTIFICACIONES URGENTES
   * Estas se ejecutan en la Microtask Queue (máxima prioridad)
   */
  _procesarNotificacionUrgente(mensaje, datos) {
    console.log(`✅ [URGENTE] Procesada: ${mensaje}`);
    console.log("   ↳ Datos:", datos);

    // Las urgentes pueden generar más microtasks
    if (mensaje.includes("error")) {
      Promise.resolve().then(() => {
        console.log("   ↳ 🔔 [MICROTASK] Notificando administrador del error");
      });
    }
  }

  /**
   * 📝 PROCESAMIENTO DE NOTIFICACIONES NORMALES
   * Estas se ejecutan en la Task Queue (prioridad normal)
   */
  _procesarNotificacionNormal(mensaje, datos) {
    console.log(`✅ [NORMAL] Procesada: ${mensaje}`);
    console.log("   ↳ Datos:", datos);

    // Las normales pueden contener microtasks internas
    if (mensaje.includes("actualizar")) {
      Promise.resolve().then(() => {
        console.log("   ↳ 🎨 [MICROTASK] Actualizando cache de UI");
      });
    }
  }

  /**
   * 📊 PROCESAMIENTO DE NOTIFICACIONES BACKGROUND
   * Estas son las de más baja prioridad
   */
  _procesarNotificacionBackground(mensaje, datos) {
    console.log(`✅ [BACKGROUND] Procesada: ${mensaje}`);
    console.log("   ↳ Datos:", datos);

    // Simulamos procesamiento pesado (pero no bloqueante gracias al delay)
    const inicio = Date.now();
    while (Date.now() - inicio < 50) {
      // Simulamos trabajo de procesamiento
    }
    console.log("   ↳ ⏱️  Procesamiento background completado");
  }
}

/**
 * 🌍 SIMULACIÓN DE ESCENARIO REAL: Aplicación de mensajería
 *
 * Vamos a simular una aplicación que recibe notificaciones de diferentes fuentes
 * y ver cómo el Event Loop maneja las prioridades automáticamente
 */

function simularAplicacionMensajeria() {
  console.log("📱 INICIANDO SIMULACIÓN: App de Mensajería");
  console.log("=".repeat(50));

  const gestor = new GestorNotificaciones();

  // 📍 1. CÓDIGO SINCRÓNICO INICIAL (Call Stack)
  console.log("📍 [CALL STACK] Configurando aplicación...");
  const config = { usuario: "john_doe", tema: "oscuro" };
  console.log("📍 [CALL STACK] Configuración cargada:", config);

  // 🚨 2. NOTIFICACIÓN URGENTE: Error de conexión (Microtask Queue)
  gestor.agregarNotificacionUrgente(
    "Error de conexión con servidor principal",
    { codigo: 503, servidor: "api.principal.com" }
  );

  // 🟡 3. NOTIFICACIÓN NORMAL: Mensaje recibido (Task Queue)
  gestor.agregarNotificacionNormal("Nuevo mensaje de Ana", {
    de: "ana",
    mensaje: "¿Quedamos esta tarde?",
    timestamp: Date.now(),
  });

  // 🔵 4. NOTIFICACIÓN BACKGROUND: Analytics (Task Queue con delay)
  gestor.agregarNotificacionBackground(
    "Enviar datos de analytics",
    { eventos: ["login", "navegacion"], usuario: "john_doe" },
    2000
  );

  // 🚨 5. OTRA NOTIFICACIÓN URGENTE: Validación fallida (Microtask Queue)
  gestor.agregarNotificacionUrgente("Validación de seguridad fallida", {
    intento: 3,
    ip: "192.168.1.100",
  });

  // 🟡 6. NOTIFICACIÓN NORMAL: Actualización de estado (Task Queue)
  gestor.agregarNotificacionNormal("Actualizar estado de conexión", {
    estado: "conectado",
    ultimaConexion: Date.now(),
  });

  // 📍 7. MÁS CÓDIGO SINCRÓNICO (Call Stack)
  console.log("📍 [CALL STACK] Todas las notificaciones encoladas");
  console.log("📍 [CALL STACK] Aplicación lista para interactuar");

  // 🟡 8. NOTIFICACIÓN POR EVENTO DE USUARIO (Task Queue)
  setTimeout(() => {
    console.log('👤 [USUARIO] Usuario hace click en "Enviar mensaje"');
    gestor.agregarNotificacionNormal("Mensaje enviado por usuario", {
      para: "ana",
      mensaje: "¡Sí, perfecto!",
      timestamp: Date.now(),
    });

    // 🚨 Respuesta inmediata del servidor (Microtask Queue)
    gestor.agregarNotificacionUrgente("Mensaje entregado al servidor", {
      id: "msg_12345",
      estado: "entregado",
    });
  }, 100);

  console.log(
    "📍 [CALL STACK] Simulación configurada - Observa el orden de ejecución:"
  );
  console.log("=".repeat(50));
}

/**
 * 🎯 EJECUCIÓN Y ANÁLISIS DEL COMPORTAMIENTO
 *
 * Al ejecutar esta simulación, veremos exactamente cómo JavaScript
 * prioriza las tareas usando el Event Loop:
 *
 * 1. PRIMERO: Todo el código sincrónico (Call Stack)
 * 2. SEGUNDO: Notificaciones URGENTES (Microtask Queue)
 * 3. TERCERO: Notificaciones NORMALES (Task Queue)
 * 4. CUARTO: Notificaciones BACKGROUND (Task Queue con delay)
 *
 * Esto sucede AUTOMÁTICAMENTE gracias al diseño del Event Loop
 */

// 🚀 Ejecutamos la simulación
simularAplicacionMensajeria();

/**
 * 💡 POR QUÉ ESTE EJEMPLO ES IMPORTANTE EN APLICACIONES REALES:
 *
 * 1. 🚨 URGENTE (Microtask):
 *    - Errores críticos deben manejarse inmediatamente
 *    - Validaciones de seguridad no pueden esperar
 *    - Respuestas de API que bloquean la UI
 *
 * 2. 🟡 NORMAL (Task Queue):
 *    - Interacciones de usuario (clicks, teclas)
 *    - Actualizaciones de UI
 *    - Mensajes entre componentes
 *
 * 3. 🔵 BACKGROUND (Task Queue con delay):
 *    - Analytics y métricas
 *    - Logs de depuración
 *    - Sincronización en segundo plano
 *    - Limpieza de cache
 *
 * 🎯 EL RESULTADO: Una aplicación responsive que prioriza
 * lo importante y no se bloquea con tareas pesadas
 */

// 🔄 Ejemplo adicional: Cómo manejar peticiones HTTP reales
function ejemploPeticionHTTP() {
  console.log("\\n🌐 EJEMPLO ADICIONAL: Petición HTTP real");

  // Simulación de petición HTTP con diferentes fases
  setTimeout(() => {
    console.log("1. 📡 [TASK] Iniciando petición HTTP...");

    // Simulamos respuesta exitosa (Microtask para procesamiento inmediato)
    Promise.resolve().then(() => {
      console.log("2. ✅ [MICROTASK] Procesando respuesta HTTP inmediatamente");

      // Dentro del microtask, más trabajo que necesita alta prioridad
      Promise.resolve().then(() => {
        console.log("3. 🔄 [MICROTASK] Actualizando estado de loading");
      });
    });

    // Task normal para actualizar UI después del procesamiento
    setTimeout(() => {
      console.log("4. 🎨 [TASK] Actualizando interfaz de usuario");
    }, 0);
  }, 500);
}

// Ejecutamos el ejemplo adicional
ejemploPeticionHTTP();

/**
 * 🏆 CONCLUSIÓN PRÁCTICA:
 *
 * En aplicaciones reales, entender el Event Loop te permite:
 *
 * ✅ Priorizar automáticamente tareas críticas
 * ✅ Evitar bloqueos en la interfaz de usuario
 * ✅ Gestionar eficientemente recursos del navegador
 * ✅ Crear aplicaciones más fluidas y responsivas
 * ✅ Debuggear problemas de rendimiento más fácilmente
 *
 * Este conocimiento es FUNDAMENTAL para desarrollo frontend moderno
 * y aplicaciones Node.js de alto rendimiento.
 */
```

## 📋 **Instrucciones de uso:**

1. **Crea una carpeta** para el proyecto
2. **Guarda los 4 archivos** con estos nombres:
   - `index.html`
   - `styles.css`
   - `notificaciones.js` (tu código original)
   - `visualizacion.js`
3. **Abre `index.html`** en tu navegador
4. **Haz clic en "Iniciar Simulación"** para ver el sistema en acción

## 🎯 **Qué podrás visualizar:**

- ✅ **Colas de prioridad** en tiempo real
- ✅ **Call Stack** con las funciones ejecutándose
- ✅ **Log de ejecución** detallado
- ✅ **Estadísticas** de notificaciones procesadas
- ✅ **Notificaciones** con diferentes niveles de prioridad

¡El sistema mostrará exactamente cómo JavaScript maneja las diferentes prioridades usando el Event Loop! 🚀

**Este ejemplo muestra exactamente cómo una aplicación real utiliza las diferentes colas del Event Loop para manejar prioridades de forma automática y eficiente.** 🚀

## 🔧 Microtask **Queue**

## Sistema de Caché con Actualización Inteligente

## 📁 **1. index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Caché Inteligente</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <header class="header">
        <h1>🚀 Sistema de Caché Inteligente</h1>
        <p class="subtitle">
          Actualizaciones en Tiempo Real con Microtask Queue
        </p>
      </header>

      <div class="dashboard">
        <!-- Panel de Control -->
        <div class="control-panel">
          <h2>🎮 Panel de Control</h2>
          <div class="buttons">
            <button onclick="iniciarSimulacion()" class="btn btn-primary">
              ▶️ Iniciar Dashboard Financiero
            </button>
            <button
              onclick="simularConsultaUsuario()"
              class="btn btn-secondary"
            >
              👤 Simular Consulta Usuario
            </button>
            <button
              onclick="ejecutarActualizacionMasiva()"
              class="btn btn-warning"
            >
              🔄 Actualización Masiva
            </button>
            <button onclick="limpiarTodo()" class="btn btn-danger">
              🗑️ Limpiar Todo
            </button>
          </div>

          <div class="stats">
            <div class="stat-card">
              <span class="stat-number" id="lecturasCount">0</span>
              <span class="stat-label">Lecturas</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="escriturasCount">0</span>
              <span class="stat-label">Escrituras</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="actualizacionesCount">0</span>
              <span class="stat-label">Actualizaciones</span>
            </div>
            <div class="stat-card">
              <span class="stat-number" id="cacheSize">0</span>
              <span class="stat-label">Tamaño Caché</span>
            </div>
          </div>
        </div>

        <!-- Visualización del Caché -->
        <div class="cache-viz">
          <h2>💾 Caché en Memoria</h2>
          <div class="cache-container">
            <div class="cache-header">
              <span>Clave</span>
              <span>Valor</span>
              <span>Estado</span>
              <span>Última Actualización</span>
            </div>
            <div class="cache-items" id="cacheItems">
              <div class="cache-empty">El caché está vacío</div>
            </div>
          </div>
        </div>

        <!-- Colas de Procesamiento -->
        <div class="queues-viz">
          <h2>🔄 Colas de Procesamiento</h2>
          <div class="queues-container">
            <div class="queue microtask-queue">
              <h3>🚨 Microtask Queue (Alta Prioridad)</h3>
              <div class="queue-stats">
                <span id="microtaskCount">0</span> tareas pendientes
              </div>
              <div class="queue-items" id="microtaskQueue">
                <div class="queue-empty">Sin tareas pendientes</div>
              </div>
            </div>

            <div class="queue task-queue">
              <h3>⏰ Task Queue (Operaciones Programadas)</h3>
              <div class="queue-stats">
                <span id="taskCount">0</span> tareas pendientes
              </div>
              <div class="queue-items" id="taskQueue">
                <div class="queue-empty">Sin tareas programadas</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call Stack -->
        <div class="call-stack-viz">
          <h2>📚 Call Stack</h2>
          <div class="stack-container">
            <div class="stack-items" id="callStack">
              <div class="stack-empty">Ejecución principal</div>
            </div>
          </div>
        </div>

        <!-- Log de Ejecución -->
        <div class="execution-log">
          <h2>📋 Log de Operaciones</h2>
          <div class="log-container">
            <div class="log-header">
              <span>Tiempo</span>
              <span>Tipo</span>
              <span>Operación</span>
              <span>Detalles</span>
            </div>
            <div class="log-entries" id="logEntries"></div>
          </div>
        </div>

        <!-- Suscriptores Activos -->
        <div class="subscribers-panel">
          <h2>👥 Suscriptores Activos</h2>
          <div class="subscribers-list" id="subscribersList">
            <div class="empty-state">No hay suscriptores activos</div>
          </div>
        </div>
      </div>

      <!-- Explicación del Sistema -->
      <div class="explanation">
        <h3>💡 ¿Cómo funciona el sistema de caché inteligente?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🚨</div>
            <h4>Microtask Queue</h4>
            <p>
              Operaciones críticas se ejecutan inmediatamente después del código
              actual, con máxima prioridad y sin bloquear la UI.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💾</div>
            <h4>Actualizaciones en Background</h4>
            <p>
              Los datos se devuelven inmediatamente y se actualizan en segundo
              plano, manteniendo la aplicación responsive.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h4>Validaciones No Bloqueantes</h4>
            <p>
              Las validaciones se ejecutan en microtasks, permitiendo que las
              operaciones principales continúen sin esperar.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📢</div>
            <h4>Notificaciones Inmediatas</h4>
            <p>
              Los suscriptores reciben notificaciones instantáneas de cambios
              mediante microtasks.
            </p>
          </div>
        </div>
      </div>
    </div>

    <script src="cache-system.js"></script>
    <script src="visualizacion.js"></script>
  </body>
</html>
```

## 🎨 **2. styles.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: #333;
  min-height: 100vh;
  line-height: 1.6;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 20px;
  margin-bottom: 30px;
}

.control-panel {
  grid-column: 1 / 2;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.control-panel h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 25px;
}

.btn {
  padding: 12px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  text-align: center;
}

.btn-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-secondary {
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.stat-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  border-left: 4px solid #3498db;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.cache-viz {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.cache-viz h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.cache-container {
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
}

.cache-header {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1.2fr;
  gap: 15px;
  padding: 15px;
  background: #34495e;
  color: white;
  font-weight: 600;
}

.cache-items {
  max-height: 300px;
  overflow-y: auto;
}

.cache-empty {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px;
}

.cache-item {
  display: grid;
  grid-template-columns: 1fr 1fr 0.8fr 1.2fr;
  gap: 15px;
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  animation: slideIn 0.3s ease;
}

.cache-item:last-child {
  border-bottom: none;
}

.cache-item.updated {
  background: #d4edda;
  animation: highlight 1s ease;
}

.cache-item.pending {
  background: #fff3cd;
}

.cache-key {
  font-weight: 600;
  color: #2c3e50;
}

.cache-value {
  font-family: "Courier New", monospace;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.cache-status {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
}

.status-actual {
  background: #d4edda;
  color: #155724;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-updating {
  background: #cce7ff;
  color: #004085;
}

.queues-viz {
  grid-column: 1 / 2;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.queues-viz h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.queues-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.queue {
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;
}

.queue h3 {
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.queue-stats {
  text-align: center;
  margin-bottom: 15px;
  font-weight: 600;
  padding: 8px;
  border-radius: 6px;
}

.microtask-queue {
  background: linear-gradient(135deg, #ffeaa7, #fab1a0);
  border: 2px solid #e17055;
}

.microtask-queue .queue-stats {
  background: rgba(225, 112, 85, 0.2);
  color: #c44569;
}

.task-queue {
  background: linear-gradient(135deg, #81ecec, #74b9ff);
  border: 2px solid #0984e3;
}

.task-queue .queue-stats {
  background: rgba(9, 132, 227, 0.2);
  color: #0984e3;
}

.queue-items {
  min-height: 120px;
  max-height: 150px;
  overflow-y: auto;
}

.queue-empty {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 20px;
}

.queue-item {
  background: white;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.queue-item.microtask {
  border-left-color: #e74c3c;
}

.queue-item.task {
  border-left-color: #3498db;
}

.queue-item .operation-type {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.queue-item .operation-details {
  font-size: 0.9rem;
  color: #666;
}

.call-stack-viz {
  grid-column: 2 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.call-stack-viz h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.stack-container {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 10px;
  padding: 20px;
  min-height: 150px;
}

.stack-items {
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
}

.stack-empty {
  text-align: center;
  color: #bdc3c7;
  font-style: italic;
  padding: 20px;
}

.stack-item {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  animation: stackPush 0.3s ease;
}

.execution-log {
  grid-column: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.execution-log h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.log-container {
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
}

.log-header {
  display: grid;
  grid-template-columns: 100px 120px 1fr 2fr;
  gap: 15px;
  padding: 15px;
  background: #34495e;
  color: white;
  font-weight: 600;
}

.log-entries {
  max-height: 300px;
  overflow-y: auto;
}

.log-entry {
  display: grid;
  grid-template-columns: 100px 120px 1fr 2fr;
  gap: 15px;
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  animation: fadeIn 0.5s ease;
}

.log-entry:last-child {
  border-bottom: none;
}

.log-entry.microtask {
  background: #ffeaa7;
}

.log-entry.task {
  background: #dfe6e9;
}

.log-entry.critical {
  background: #ff6b6b;
  color: white;
}

.log-entry .log-time {
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
}

.log-entry .log-type {
  font-weight: 600;
}

.subscribers-panel {
  grid-column: 1 / 3;
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.subscribers-panel h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.subscribers-list {
  max-height: 200px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
}

.subscriber-item {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background: linear-gradient(135deg, #a29bfe, #74b9ff);
  color: white;
  animation: slideIn 0.3s ease;
}

.explanation {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.explanation h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.feature-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 20px;
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.feature-card h4 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-card p {
  color: #666;
  line-height: 1.5;
}

/* Animaciones */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes stackPush {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes highlight {
  0% {
    background: #d4edda;
  }
  50% {
    background: #c3e6cb;
  }
  100% {
    background: #d4edda;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .cache-viz {
    grid-column: 1;
    grid-row: 2;
  }

  .call-stack-viz {
    grid-column: 1;
  }

  .execution-log,
  .subscribers-panel {
    grid-column: 1;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .buttons {
    grid-template-columns: 1fr;
  }

  .log-header,
  .log-entry {
    grid-template-columns: 80px 100px 1fr 1fr;
    font-size: 0.9rem;
  }

  .cache-header,
  .cache-item {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
```

## ⚡ **3. visualizacion.js**

```jsx
// Sistema de visualización para el gestor de caché inteligente
class VisualizadorCache {
  constructor() {
    this.estadisticas = {
      lecturas: 0,
      escrituras: 0,
      actualizaciones: 0,
      cacheSize: 0,
    };
    this.microtaskCount = 0;
    this.taskCount = 0;
    this.suscriptores = new Set();
  }

  actualizarEstadisticas() {
    document.getElementById("lecturasCount").textContent =
      this.estadisticas.lecturas;
    document.getElementById("escriturasCount").textContent =
      this.estadisticas.escrituras;
    document.getElementById("actualizacionesCount").textContent =
      this.estadisticas.actualizaciones;
    document.getElementById("cacheSize").textContent =
      this.estadisticas.cacheSize;
    document.getElementById("microtaskCount").textContent = this.microtaskCount;
    document.getElementById("taskCount").textContent = this.taskCount;
  }

  agregarALog(timestamp, tipo, operacion, detalles) {
    const logEntries = document.getElementById("logEntries");
    const logEntry = document.createElement("div");
    logEntry.className = `log-entry ${tipo}`;

    const icon =
      tipo === "microtask" ? "🚨" : tipo === "critical" ? "💾" : "⏰";

    logEntry.innerHTML = `
            <span class="log-time">${timestamp}</span>
            <span class="log-type">${icon} ${tipo.toUpperCase()}</span>
            <span>${operacion}</span>
            <span>${detalles}</span>
        `;

    logEntries.appendChild(logEntry);
    logEntries.scrollTop = logEntries.scrollHeight;
  }

  actualizarCacheItem(clave, valor, estado = "actual") {
    const cacheItems = document.getElementById("cacheItems");

    // Buscar si ya existe el item
    let cacheItem = document.getElementById(`cache-${clave}`);

    if (!cacheItem) {
      cacheItem = document.createElement("div");
      cacheItem.className = "cache-item";
      cacheItem.id = `cache-${clave}`;

      cacheItem.innerHTML = `
                <span class="cache-key">${clave}</span>
                <span class="cache-value">${valor}</span>
                <span class="cache-status status-${estado}">${estado.toUpperCase()}</span>
                <span class="cache-time">${new Date().toLocaleTimeString()}</span>
            `;

      // Remover mensaje de vacío si existe
      const emptyMsg = cacheItems.querySelector(".cache-empty");
      if (emptyMsg) {
        emptyMsg.remove();
      }

      cacheItems.appendChild(cacheItem);
      this.estadisticas.cacheSize++;
    } else {
      cacheItem.querySelector(".cache-value").textContent = valor;
      cacheItem.querySelector(
        ".cache-status"
      ).className = `cache-status status-${estado}`;
      cacheItem.querySelector(".cache-status").textContent =
        estado.toUpperCase();
      cacheItem.querySelector(".cache-time").textContent =
        new Date().toLocaleTimeString();

      // Animación de actualización
      cacheItem.classList.add("updated");
      setTimeout(() => cacheItem.classList.remove("updated"), 1000);
    }

    this.actualizarEstadisticas();
  }

  agregarACola(tipo, operacion, detalles, id) {
    const queueId = tipo === "microtask" ? "microtaskQueue" : "taskQueue";
    const queue = document.getElementById(queueId);

    const queueItem = document.createElement("div");
    queueItem.className = `queue-item ${tipo}`;
    queueItem.id = `queue-${id}`;

    queueItem.innerHTML = `
            <div class="operation-type">${operacion}</div>
            <div class="operation-details">${detalles}</div>
            <div class="queue-time">${new Date().toLocaleTimeString()}</div>
        `;

    // Remover mensaje de "Vacía" si existe
    const emptyMsg = queue.querySelector(".queue-empty");
    if (emptyMsg) {
      emptyMsg.remove();
    }

    queue.appendChild(queueItem);
    queue.scrollTop = queue.scrollHeight;

    // Actualizar contador
    if (tipo === "microtask") {
      this.microtaskCount++;
    } else {
      this.taskCount++;
    }
    this.actualizarEstadisticas();
  }

  removerDeCola(tipo, id) {
    const queueId = tipo === "microtask" ? "microtaskQueue" : "taskQueue";
    const queueItem = document.getElementById(`queue-${id}`);

    if (queueItem) {
      queueItem.remove();

      // Actualizar contador
      if (tipo === "microtask") {
        this.microtaskCount--;
      } else {
        this.taskCount--;
      }
      this.actualizarEstadisticas();
    }

    // Si la cola queda vacía, mostrar mensaje
    const queue = document.getElementById(queueId);
    if (queue.children.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "queue-empty";
      emptyMsg.textContent =
        tipo === "microtask"
          ? "Sin tareas pendientes"
          : "Sin tareas programadas";
      queue.appendChild(emptyMsg);
    }
  }

  agregarAlStack(funcion) {
    const stack = document.getElementById("callStack");
    const stackItem = document.createElement("div");
    stackItem.className = "stack-item";
    stackItem.textContent = funcion;

    // Remover mensaje de "Ejecución principal" si existe
    const emptyMsg = stack.querySelector(".stack-empty");
    if (emptyMsg) {
      emptyMsg.remove();
    }

    stack.appendChild(stackItem);
  }

  removerDelStack() {
    const stack = document.getElementById("callStack");
    if (stack.children.length > 0) {
      stack.removeChild(stack.lastChild);
    }

    // Si el stack queda vacío, mostrar mensaje
    if (stack.children.length === 0) {
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "stack-empty";
      emptyMsg.textContent = "Ejecución principal";
      stack.appendChild(emptyMsg);
    }
  }

  agregarSuscriptor(id) {
    this.suscriptores.add(id);
    this.actualizarListaSuscriptores();
  }

  removerSuscriptor(id) {
    this.suscriptores.delete(id);
    this.actualizarListaSuscriptores();
  }

  actualizarListaSuscriptores() {
    const subscribersList = document.getElementById("subscribersList");
    subscribersList.innerHTML = "";

    if (this.suscriptores.size === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent = "No hay suscriptores activos";
      subscribersList.appendChild(emptyState);
      return;
    }

    this.suscriptores.forEach((id) => {
      const subscriberItem = document.createElement("div");
      subscriberItem.className = "subscriber-item";
      subscriberItem.innerHTML = `
                <strong>Suscriptor #${id}</strong>
                <div>Recibiendo actualizaciones en tiempo real</div>
            `;
      subscribersList.appendChild(subscriberItem);
    });
  }

  incrementarContador(tipo) {
    this.estadisticas[tipo]++;
    this.actualizarEstadisticas();
  }
}

// Instancia global del visualizador
const visualizador = new VisualizadorCache();

// Función para limpiar todo
function limpiarTodo() {
  document.getElementById("microtaskQueue").innerHTML =
    '<div class="queue-empty">Sin tareas pendientes</div>';
  document.getElementById("taskQueue").innerHTML =
    '<div class="queue-empty">Sin tareas programadas</div>';
  document.getElementById("callStack").innerHTML =
    '<div class="stack-empty">Ejecución principal</div>';
  document.getElementById("logEntries").innerHTML = "";
  document.getElementById("cacheItems").innerHTML =
    '<div class="cache-empty">El caché está vacío</div>';
  document.getElementById("subscribersList").innerHTML =
    '<div class="empty-state">No hay suscriptores activos</div>';

  visualizador.estadisticas = {
    lecturas: 0,
    escrituras: 0,
    actualizaciones: 0,
    cacheSize: 0,
  };
  visualizador.microtaskCount = 0;
  visualizador.taskCount = 0;
  visualizador.suscriptores.clear();
  visualizador.actualizarEstadisticas();
}

// Funciones de simulación
function iniciarSimulacion() {
  limpiarTodo();
  simularDashboardFinanciero();
}

function simularConsultaUsuario() {
  const claves = ["precio_BTC", "precio_ETH", "portfolio_total"];
  const clave = claves[Math.floor(Math.random() * claves.length)];

  visualizador.agregarALog(
    new Date().toLocaleTimeString(),
    "critical",
    "Consulta de usuario",
    `Solicitando: ${clave}`
  );

  visualizador.agregarACola(
    "microtask",
    "Actualización en background",
    `Clave: ${clave}`,
    Date.now()
  );

  visualizador.incrementarContador("lecturas");
}

function ejecutarActualizacionMasiva() {
  visualizador.agregarALog(
    new Date().toLocaleTimeString(),
    "task",
    "Actualización masiva",
    "Procesando lote de 3 actualizaciones"
  );

  ["precio_BTC", "precio_ETH", "portfolio_total"].forEach((clave, index) => {
    visualizador.agregarACola(
      "microtask",
      `Actualización ${index + 1}`,
      `Clave: ${clave}`,
      Date.now() + index
    );
  });
}
```

## ⚡ **3. cache-system.js**

```jsx
class GestorCachéInteligente {
  constructor() {
    this.caché = new Map();
    this.estadísticas = {
      lecturas: 0,
      escrituras: 0,
      actualizaciones: 0,
    };
    this.suscriptores = new Set();
  }

  async obtenerDatoConActualización(clave, actualizarDato) {
    console.log(`📖 [LECTURA] Solicitando: ${clave}`);

    const datoActual = this.caché.get(clave);

    Promise.resolve().then(async () => {
      try {
        console.log(
          `🔄 [MICROTASK] Actualizando caché en background: ${clave}`
        );

        const datoNuevo = await actualizarDato();
        this.caché.set(clave, datoNuevo);
        this.estadísticas.actualizaciones++;

        console.log(`✅ [MICROTASK] Caché actualizado: ${clave}`, datoNuevo);

        this._notificarSuscriptores(clave, datoNuevo);
      } catch (error) {
        console.error(`❌ [MICROTASK] Error actualizando ${clave}:`, error);
        this._manejarError(clave, error);
      }
    });

    this.estadísticas.lecturas++;
    return datoActual;
  }

  establecerDatoCrítico(clave, valor, validar = null) {
    console.log(`💾 [ESCRITURA] Guardando dato crítico: ${clave}`);

    this.caché.set(clave, valor);
    this.estadísticas.escrituras++;

    if (validar) {
      Promise.resolve().then(() => {
        console.log(`🔍 [MICROTASK] Validando dato crítico: ${clave}`);
        const esVálido = validar(valor);

        if (!esVálido) {
          console.warn(`⚠️ [MICROTASK] Dato inválido detectado: ${clave}`);
          this._corregirDatoInválido(clave);
        }
      });
    }

    return valor;
  }

  suscribir(callback) {
    console.log("👥 [SUSCRIPCIÓN] Nuevo suscriptor agregado");
    this.suscriptores.add(callback);

    return () => {
      Promise.resolve().then(() => {
        this.suscriptores.delete(callback);
        console.log("👋 [MICROTASK] Suscriptor removido limpiamente");
      });
    };
  }

  async actualizarMúltiplesDatos(actualizaciones) {
    console.log(
      `🔄 [ACTUALIZACIÓN] Iniciando lote de ${actualizaciones.length} actualizaciones`
    );

    const promesas = actualizaciones.map(({ clave, actualizador }, índice) => {
      return Promise.resolve().then(async () => {
        console.log(`📦 [MICROTASK ${índice + 1}] Procesando: ${clave}`);

        try {
          const nuevoValor = await actualizador();
          this.caché.set(clave, nuevoValor);

          console.log(`✅ [MICROTASK ${índice + 1}] Completado: ${clave}`);
          return { clave, éxito: true, valor: nuevoValor };
        } catch (error) {
          console.error(`❌ [MICROTASK ${índice + 1}] Error: ${clave}`, error);
          return { clave, éxito: false, error };
        }
      });
    });

    const resultados = await Promise.allSettled(promesas);

    Promise.resolve().then(() => {
      console.log("🎉 [MICROTASK] Lote de actualizaciones completado");
      this._notificarActualizaciónMasiva(resultados);
    });

    return resultados;
  }

  eliminarDatoSeguro(clave) {
    console.log(`🗑️ [ELIMINACIÓN] Solicitando eliminar: ${clave}`);

    const dato = this.caché.get(clave);

    Promise.resolve().then(() => {
      if (this._puedeEliminar(clave)) {
        this.caché.delete(clave);
        console.log(`✅ [MICROTASK] Dato eliminado seguro: ${clave}`);
      } else {
        console.warn(`⚠️ [MICROTASK] No se puede eliminar: ${clave} - en uso`);
      }
    });

    return dato;
  }

  _notificarSuscriptores(clave, valor) {
    Promise.resolve().then(() => {
      console.log(
        `📢 [MICROTASK] Notificando a ${this.suscriptores.size} suscriptores`
      );
      this.suscriptores.forEach((callback) => {
        try {
          callback(clave, valor);
        } catch (error) {
          console.error("❌ Error en suscriptor:", error);
        }
      });
    });
  }

  _notificarActualizaciónMasiva(resultados) {
    const éxitos = resultados.filter(
      (r) => r.status === "fulfilled" && r.value.éxito
    ).length;
    const fallos = resultados.length - éxitos;

    console.log(
      `📊 [MICROTASK] Resumen lote: ${éxitos} éxitos, ${fallos} fallos`
    );
  }

  _manejarError(clave, error) {
    Promise.resolve().then(() => {
      console.error(`🛡️ [MICROTASK] Manejando error para: ${clave}`);
    });
  }

  _corregirDatoInválido(clave) {
    Promise.resolve().then(() => {
      console.log(`🔧 [MICROTASK] Corrigiendo dato inválido: ${clave}`);
    });
  }

  _puedeEliminar(clave) {
    return true;
  }
}

async function simularDashboardFinanciero() {
  console.log("💹 INICIANDO SIMULACIÓN: Dashboard Financiero en Tiempo Real");
  console.log("=".repeat(60));

  const gestorCaché = new GestorCachéInteligente();

  console.log("📍 [CALL STACK] Configurando dashboard financiero...");

  gestorCaché.establecerDatoCrítico("precio_BTC", 45000, (v) => v > 0);
  gestorCaché.establecerDatoCrítico("precio_ETH", 3000, (v) => v > 0);
  gestorCaché.establecerDatoCrítico("tipo_cambio", 1.08, (v) => v > 0);

  const desuscribir = gestorCaché.suscribir((clave, valor) => {
    console.log(`📈 [SUSCRIPTOR] Cambio detectado: ${clave} = ${valor}`);
  });

  console.log("\\n👤 [USUARIO] Usuario consultando datos...");

  const precioBTC = await gestorCaché.obtenerDatoConActualización(
    "precio_BTC",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return 45150 + Math.random() * 100;
    }
  );

  const precioETH = await gestorCaché.obtenerDatoConActualización(
    "precio_ETH",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return 3020 + Math.random() * 50;
    }
  );

  console.log("📍 [CALL STACK] Datos mostrados al usuario inmediatamente:");
  console.log("   ↳ BTC:", precioBTC);
  console.log("   ↳ ETH:", precioETH);

  console.log("\\n🔄 [SISTEMA] Programando actualización masiva...");

  setTimeout(async () => {
    const actualizaciones = [
      {
        clave: "precio_BTC",
        actualizador: async () => {
          await new Promise((resolve) => setTimeout(resolve, 80));
          return 45200 + Math.random() * 200;
        },
      },
      {
        clave: "precio_ETH",
        actualizador: async () => {
          await new Promise((resolve) => setTimeout(resolve, 60));
          return 3050 + Math.random() * 100;
        },
      },
      {
        clave: "portfolio_total",
        actualizador: async () => {
          await new Promise((resolve) => setTimeout(resolve, 120));
          return 100000 + Math.random() * 5000;
        },
      },
    ];

    await gestorCaché.actualizarMúltiplesDatos(actualizaciones);
  }, 500);

  console.log("\\n🛡️ [MANTENIMIENTO] Programando limpieza automática...");

  setTimeout(() => {
    console.log("🧹 [SISTEMA] Iniciando limpieza de caché...");
    gestorCaché.eliminarDatoSeguro("datos_temporales");
  }, 1000);

  setTimeout(() => {
    console.log("\\n👤 [USUARIO] Usuario realiza nueva consulta...");

    gestorCaché.obtenerDatoConActualización("portfolio_total", async () => {
      await new Promise((resolve) => setTimeout(resolve, 70));
      return 102000 + Math.random() * 3000;
    });

    gestorCaché.establecerDatoCrítico("meta_inversión", 150000, (v) => v > 0);
  }, 800);

  setTimeout(() => {
    Promise.resolve().then(() => {
      console.log("\\n📊 [MICROTASK] === ESTADÍSTICAS FINALES ===");
      console.log("   ↳ Lecturas:", gestorCaché.estadísticas.lecturas);
      console.log("   ↳ Escrituras:", gestorCaché.estadísticas.escrituras);
      console.log(
        "   ↳ Actualizaciones:",
        gestorCaché.estadísticas.actualizaciones
      );
      console.log("   ↳ Tamaño caché:", gestorCaché.caché.size);
      console.log("   ↳ Suscriptores activos:", gestorCaché.suscriptores.size);

      desuscribir();
    });
  }, 2000);

  console.log(
    "\\n📍 [CALL STACK] Dashboard configurado - Observa el orden de microtasks:"
  );
  console.log("=".repeat(60));
}

simularDashboardFinanciero();

function ejemploRetryInteligente() {
  console.log("\\n🔄 EJEMPLO ADICIONAL: Patrón de Retry Inteligente");

  async function operaciónCríticaConRetry(operación, máximoReintentos = 3) {
    let reintentos = 0;

    function ejecutarConRetry() {
      return Promise.resolve().then(async () => {
        try {
          console.log(
            `🔄 [MICROTASK] Intentando operación (reintento ${reintentos + 1})`
          );
          const resultado = await operación();
          console.log("✅ [MICROTASK] Operación exitosa");
          return resultado;
        } catch (error) {
          reintentos++;

          if (reintentos < máximoReintentos) {
            console.log(`⏳ [MICROTASK] Reintentando en microtask...`);
            return ejecutarConRetry();
          } else {
            throw new Error(
              `❌ [MICROTASK] Fallo después de ${reintentos} reintentos`
            );
          }
        }
      });
    }

    return ejecutarConRetry();
  }

  setTimeout(() => {
    operaciónCríticaConRetry(async () => {
      if (Math.random() > 0.5) {
        throw new Error("Error simulado");
      }
      return "éxito";
    })
      .then((resultado) => console.log("🎉 Resultado final:", resultado))
      .catch((error) => console.error("💥 Error final:", error.message));
  }, 100);
}

ejemploRetryInteligente();
```

## 📋 **Instrucciones de uso:**

1. **Crea una carpeta** para el proyecto
2. **Guarda los 4 archivos** con estos nombres:
   - `index.html`
   - `styles.css`
   - `cache-system.js` (tu código original)
   - `visualizacion.js`
3. **Abre `index.html`** en tu navegador
4. **Haz clic en "Iniciar Dashboard Financiero"** para ver el sistema en acción

## 🎯 **Qué podrás visualizar:**

- ✅ **Caché en memoria** con datos en tiempo real
- ✅ **Microtask Queue** con operaciones de alta prioridad
- ✅ **Task Queue** con operaciones programadas
- ✅ **Call Stack** con las funciones ejecutándose
- ✅ **Log detallado** de todas las operaciones
- ✅ **Suscriptores activos** recibiendo notificaciones
- ✅ **Estadísticas** en tiempo real del sistema

¡El sistema mostrará exactamente cómo las microtasks permiten actualizaciones inmediatas sin bloquear la interfaz! 🚀

## 💻 **Demo Interactivo: Todas las Colas en Acción**

Aquí tienes un ejemplo completo que muestra visualmente cómo interactúan todas las partes:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Colas y Orden de Ejecución - Demo Completo</title>
  </head>
  <body>
    <div class="container">
      <h1>🎯 Colas y Orden de Ejecución en JavaScript</h1>
      <div class="prioridad">
        <div class="nivel alta">
          <h3>🥇 ALTA PRIORIDAD</h3>
          <p>Call Stack (Código síncrono)</p>
        </div>
        <div class="nivel media">
          <h3>🥈 MEDIA PRIORIDAD</h3>
          <p>Microtask Queue (Promesas)</p>
        </div>
        <div class="nivel baja">
          <h3>🥉 BAJA PRIORIDAD</h3>
          <p>Task Queue (setTimeout, Eventos)</p>
        </div>
      </div>
      <div class="sistema">
        <div class="componente call-stack">
          <h3>🏗️ Call Stack</h3>
          <p><em>Código síncrono - Se ejecuta inmediatamente</em></p>
          <div id="stack-content"></div>
        </div>
        <div class="componente web-apis">
          <h3>🌐 Web APIs</h3>
          <p><em>Operaciones en segundo plano</em></p>
          <div id="apis-content"></div>
        </div>
        <div class="componente microtask-queue">
          <h3>⚡ Microtask Queue</h3>
          <p><em>Promesas - ALTA prioridad</em></p>
          <div id="microtask-content"></div>
        </div>
        <div class="componente task-queue">
          <h3>📋 Task Queue</h3>
          <p><em>setTimeout, Eventos - BAJA prioridad</em></p>
          <div id="task-content"></div>
        </div>
      </div>
      <div class="explicacion">
        <h3>🎯 ORDEN DE EJECUCIÓN (¡IMPORTANTE!):</h3>
        <p>1. <strong>Call Stack:</strong> Todo el código síncrono primero</p>
        <p>
          2. <strong>Microtask Queue:</strong> TODAS las promesas (alta
          prioridad)
        </p>
        <p>3. <strong>Task Queue:</strong> SOLO UNA tarea (baja prioridad)</p>
        <p>4. <strong>Repetir</strong> desde el paso 1</p>
      </div>
      <button class="btn-ejemplo" onclick="ejecutarEjemploCompleto()">
        🚀 Ejecutar Ejemplo Completo
      </button>
      <button class="btn-orden" onclick="demostrarOrdenEjecucion()">
        🔄 Demostrar Orden de Ejecución
      </button>
      <button class="btn-limpiar" onclick="limpiarTodo()">
        🗑️ Limpiar Todo
      </button>

      <h3>📝 Código de Ejemplo:</h3>
      <div class="orden-ejecucion">
        console.log('1. Script inicio');<br />
        <br />
        setTimeout(() => {<br />
        &nbsp;&nbsp;console.log('6. Timeout');<br />
        }, 0);<br />
        <br />
        Promise.resolve().then(() => {<br />
        &nbsp;&nbsp;console.log('4. Promesa 1');<br />
        });<br />
        <br />
        console.log('2. Script medio');<br />
        <br />
        queueMicrotask(() => {<br />
        &nbsp;&nbsp;console.log('5. queueMicrotask');<br />
        });<br />
        <br />
        Promise.resolve().then(() => {<br />
        &nbsp;&nbsp;console.log('3. Promesa 2');<br />
        });<br />
        <br />
        console.log('7. Script fin');
      </div>
      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.sistema {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}
.componente {
  border: 3px solid;
  border-radius: 8px;
  padding: 15px;
  min-height: 300px;
}
.call-stack {
  border-color: #dc3545;
  background: #f8d7da;
}
.web-apis {
  border-color: #ffc107;
  background: #fff3cd;
}
.microtask-queue {
  border-color: #007bff;
  background: #cce7ff;
}
.task-queue {
  border-color: #28a745;
  background: #d4edda;
}
.tarea {
  background: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid;
  font-size: 13px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.sincrona {
  border-left-color: #dc3545;
}
.promesa {
  border-left-color: #007bff;
}
.settimeout {
  border-left-color: #ffc107;
}
.evento {
  border-left-color: #28a745;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-ejemplo {
  background: #007bff;
  color: white;
}
.btn-orden {
  background: #6f42c1;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.explicacion {
  background: #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}
.orden-ejecucion {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
  font-family: "Courier New", monospace;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 150px;
  max-height: 300px;
  overflow-y: auto;
}
.prioridad {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  text-align: center;
}
.nivel {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  margin: 0 5px;
}
.alta {
  background: #007bff;
  color: white;
}
.media {
  background: #28a745;
  color: white;
}
.baja {
  background: #ffc107;
  color: #212529;
}
```

```jsx
// Elementos del DOM
const stackContent = document.getElementById("stack-content");
const apisContent = document.getElementById("apis-content");
const microtaskContent = document.getElementById("microtask-content");
const taskContent = document.getElementById("task-content");
const consola = document.getElementById("consola");

// Estado del sistema
let callStack = [];
let webAPIs = [];
let microtaskQueue = [];
let taskQueue = [];
let contadorTareas = 0;

function log(mensaje) {
  consola.innerHTML += `<div>${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

function limpiarTodo() {
  callStack = [];
  webAPIs = [];
  microtaskQueue = [];
  taskQueue = [];
  contadorTareas = 0;
  consola.innerHTML = "";
  actualizarVisualizacion();
}

function actualizarVisualizacion() {
  stackContent.innerHTML = callStack
    .map((t) => `<div class="tarea ${t.tipo}">${t.nombre}</div>`)
    .join("");

  apisContent.innerHTML = webAPIs
    .map((api) => `<div class="tarea ${api.tipo}">${api.nombre}</div>`)
    .join("");

  microtaskContent.innerHTML = microtaskQueue
    .map((t) => `<div class="tarea ${t.tipo}">${t.nombre}</div>`)
    .join("");

  taskContent.innerHTML = taskQueue
    .map((t) => `<div class="tarea ${t.tipo}">${t.nombre}</div>`)
    .join("");
}

// 1️⃣ EJEMPLO COMPLETO DEL SISTEMA
async function ejecutarEjemploCompleto() {
  limpiarTodo();
  log("🚀 INICIANDO SISTEMA COMPLETO DE COLAS");

  // Función para simular operaciones asincrónicas
  function simularOperacion(nombre, tipo, destino, duracion = 1000) {
    const id = contadorTareas++;
    const tarea = { id, nombre: `${nombre} #${id}`, tipo };

    // Agregar a Web APIs
    webAPIs.push(tarea);
    log(`🌐 Web API iniciada: ${tarea.nombre}`);
    actualizarVisualizacion();

    // Simular que termina después del tiempo
    setTimeout(() => {
      // Remover de Web APIs
      webAPIs = webAPIs.filter((api) => api.id !== id);

      // Agregar a la cola correspondiente
      if (destino === "microtask") {
        microtaskQueue.push(tarea);
        log(`⚡ Microtask agregada: ${tarea.nombre}`);
      } else {
        taskQueue.push(tarea);
        log(`📋 Task agregada: ${tarea.nombre}`);
      }

      actualizarVisualizacion();
    }, duracion);
  }

  // Simular diferentes tipos de operaciones

  // setTimeout (Task Queue)
  simularOperacion("setTimeout", "settimeout", "task", 800);
  simularOperacion("setTimeout", "settimeout", "task", 1200);

  // Promesas (Microtask Queue)
  simularOperacion("Promise.then()", "promesa", "microtask", 600);
  simularOperacion("Promise.then()", "promesa", "microtask", 400);

  // Eventos (Task Queue)
  simularOperacion("Evento click", "evento", "task", 1000);

  // queueMicrotask (Microtask Queue)
  simularOperacion("queueMicrotask", "promesa", "microtask", 300);

  // Procesar el event loop
  let ciclos = 0;
  const interval = setInterval(() => {
    procesarEventLoop();
    ciclos++;

    if (ciclos > 15) {
      clearInterval(interval);
      log("🏁 Sistema completado");
    }
  }, 500);
}

function procesarEventLoop() {
  log("\\n--- CICLO DEL EVENT LOOP ---");

  // 1. Procesar Call Stack (código síncrono)
  if (callStack.length > 0) {
    const tarea = callStack.pop();
    log(`🎯 Call Stack: ${tarea.nombre}`);
  }

  // 2. Procesar TODAS las Microtasks (alta prioridad)
  while (microtaskQueue.length > 0) {
    const microtask = microtaskQueue.shift();
    log(`⚡ Microtask EJECUTADA: ${microtask.nombre}`);
  }

  // 3. Procesar UNA Task (baja prioridad)
  if (taskQueue.length > 0) {
    const task = taskQueue.shift();
    log(`📋 Task EJECUTADA: ${task.nombre}`);
  }

  actualizarVisualizacion();
}

// 2️⃣ DEMOSTRACIÓN DEL ORDEN DE EJECUCIÓN
function demostrarOrdenEjecucion() {
  limpiarTodo();
  log("🎯 DEMOSTRANDO EL ORDEN DE EJECUCIÓN");
  log("=====================================");

  // Este código se ejecutará en el orden REAL
  setTimeout(() => {
    log("6. ⏰ setTimeout (Task Queue)");
  }, 0);

  Promise.resolve().then(() => {
    log("3. 🤝 Promesa 1 (Microtask Queue)");
  });

  queueMicrotask(() => {
    log("4. ⚡ queueMicrotask (Microtask Queue)");
  });

  Promise.resolve().then(() => {
    log("5. 🤝 Promesa 2 (Microtask Queue)");
  });

  log("1. 🟢 Script inicio (Call Stack)");
  log("2. 🔴 Script medio (Call Stack)");
  log("7. 🟡 Script fin (Call Stack)");

  log(
    "\\n💡 NOTA: Observa cómo se ejecutan primero todas las Microtasks antes que el setTimeout"
  );
}

// 3️⃣ EJEMPLO PRÁCTICO: ¿QUÉ PASA CUANDO...?
function ejemploPractico() {
  log("\\n🔍 EJEMPLO PRÁCTICO: Microtasks dentro de Tasks");

  setTimeout(() => {
    log("A. ⏰ Timeout (Task) iniciado");

    Promise.resolve().then(() => {
      log("B. 🤝 Promesa DENTRO de timeout (Microtask)");
    });

    log("C. ⏰ Timeout (Task) terminado");
  }, 0);

  Promise.resolve().then(() => {
    log("D. 🤝 Promesa FUERA de timeout (Microtask)");
  });

  log("E. 🟢 Código síncrono (Call Stack)");

  // Orden esperado: E, D, A, C, B
}

// Inicializar
actualizarVisualizacion();

// Ejecutar ejemplo práctico automáticamente
setTimeout(ejemploPractico, 2000);
```

# Mecanismos avanzados de la asincronía en JavaScript

---

## 🧩 **¿Qué es Promise.all()?**

Imagina que estás organizando una fiesta y necesitas:

### 🎉 **Ejemplo del mundo real:**

- **Sin Promise.all():** Llamas a un amigo, esperas a que llegue, luego llamas a otro, esperas...
- **Con Promise.all():** Llamas a TODOS tus amigos a la vez, y esperas a que TODOS lleguen

### 💻 **Traducción a JavaScript:**

**Promise.all()** te permite ejecutar **múltiples promesas al mismo tiempo** y esperar a que **TODAS** se resuelvan.

## 🔧 **Sintaxis Básica de Promise.all()**

```jsx
// Promise.all() recibe un ARRAY de promesas
Promise.all([promesa1, promesa2, promesa3])
  .then((resultados) => {
    // resultados es un array con TODOS los resultados
    console.log("Todos terminaron:", resultados);
  })
  .catch((error) => {
    // Si CUALQUIERA falla, se captura aquí
    console.error("Alguna falló:", error);
  });
```

## 💻 **Demo Interactivo: Promise.all() en Acción**

## 📁 Estructura de Archivos

### 1. **index.html**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.all() - Ejecutar Promesas en Paralelo</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>🚀 Promise.all() - Ejecutar Promesas en Paralelo</h1>
      <p>
        <strong>Definición sencilla:</strong> Ejecuta múltiples promesas
        <strong>al mismo tiempo</strong> y espera a que
        <strong>TODAS</strong> terminen.
      </p>

      <div class="estadisticas">
        <div class="estadistica">
          <h3>⏱️ Tiempo Secuencial</h3>
          <div class="tiempo" id="tiempoSecuencial">0ms</div>
          <p>(Una después de otra)</p>
        </div>
        <div class="estadistica">
          <h3>⚡ Tiempo Paralelo</h3>
          <div class="tiempo" id="tiempoParalelo">0ms</div>
          <p>(Todas al mismo tiempo)</p>
        </div>
        <div class="estadistica">
          <h3>🎯 Mejora</h3>
          <div class="tiempo" id="mejora">0%</div>
          <p>(Más rápido)</p>
        </div>
      </div>

      <div class="comparacion">
        <div class="metodo secuencial">
          <h3>🐌 Secuencial (Sin Promise.all)</h3>
          <p><em>Una tarea después de otra</em></p>
          <div id="tareas-secuenciales">
            <div class="tarea pendiente" id="secuencial-1">
              <span>📥 Descargar imagen 1</span>
              <span>⏳ Esperando...</span>
            </div>
            <div class="tarea pendiente" id="secuencial-2">
              <span>📥 Descargar imagen 2</span>
              <span>⏳ Esperando...</span>
            </div>
            <div class="tarea pendiente" id="secuencial-3">
              <span>📥 Descargar imagen 3</span>
              <span>⏳ Esperando...</span>
            </div>
          </div>
          <button class="btn-secuencial" onclick="ejecutarSecuencial()">
            🐌 Ejecutar Secuencial
          </button>
        </div>

        <div class="metodo paralelo">
          <h3>⚡ Paralelo (Con Promise.all)</h3>
          <p><em>Todas las tareas al mismo tiempo</em></p>
          <div id="tareas-paralelas">
            <div class="tarea pendiente" id="paralelo-1">
              <span>📥 Descargar imagen 1</span>
              <span>⏳ Esperando...</span>
            </div>
            <div class="tarea pendiente" id="paralelo-2">
              <span>📥 Descargar imagen 2</span>
              <span>⏳ Esperando...</span>
            </div>
            <div class="tarea pendiente" id="paralelo-3">
              <span>📥 Descargar imagen 3</span>
              <span>⏳ Esperando...</span>
            </div>
          </div>
          <button class="btn-paralelo" onclick="ejecutarParalelo()">
            ⚡ Ejecutar Paralelo
          </button>
        </div>
      </div>

      <h3>📝 Código de Comparación:</h3>
      <div class="comparacion">
        <div class="codigo">
          // 🐌 SECUENCIAL (lento)<br />
          async function secuencial() {<br />
          &nbsp;&nbsp;const resultado1 = await tarea(1000);<br />
          &nbsp;&nbsp;const resultado2 = await tarea(1000);<br />
          &nbsp;&nbsp;const resultado3 = await tarea(1000);<br />
          &nbsp;&nbsp;// Tiempo total: ~3000ms<br />
          }
        </div>
        <div class="codigo">
          // ⚡ PARALELO (rápido)<br />
          async function paralelo() {<br />
          &nbsp;&nbsp;const resultados = await Promise.all([<br />
          &nbsp;&nbsp;&nbsp;&nbsp;tarea(1000),<br />
          &nbsp;&nbsp;&nbsp;&nbsp;tarea(1000),<br />
          &nbsp;&nbsp;&nbsp;&nbsp;tarea(1000)<br />
          &nbsp;&nbsp;]);<br />
          &nbsp;&nbsp;// Tiempo total: ~1000ms<br />
          }
        </div>
      </div>

      <button class="btn-api" onclick="ejemploAPIsReales()">
        🌐 Ejemplo con APIs Reales
      </button>
      <button class="btn-limpiar" onclick="limpiarTodo()">
        🗑️ Limpiar Todo
      </button>

      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>

    <script src="app.js"></script>
  </body>
</html>
```

### 2. **styles.css**

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.comparacion {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
}
.metodo {
  border: 2px solid;
  border-radius: 8px;
  padding: 15px;
}
.secuencial {
  border-color: #dc3545;
  background: #f8d7da;
}
.paralelo {
  border-color: #28a745;
  background: #d4edda;
}
.tarea {
  background: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pendiente {
  border-left-color: #ffc107;
}
.procesando {
  border-left-color: #007bff;
}
.completada {
  border-left-color: #28a745;
}
.fallada {
  border-left-color: #dc3545;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-paralelo {
  background: #28a745;
  color: white;
}
.btn-secuencial {
  background: #dc3545;
  color: white;
}
.btn-api {
  background: #007bff;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.estadisticas {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  text-align: center;
}
.estadistica {
  padding: 15px;
  border-radius: 8px;
  background: #e9ecef;
  flex: 1;
  margin: 0 10px;
}
.tiempo {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
.progreso {
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  margin: 5px 0;
  overflow: hidden;
}
.barra-progreso {
  height: 100%;
  background: #007bff;
  transition: width 0.3s ease;
  width: 0%;
}
```

### 3. **app.js**

```jsx
/**
 * 🚀 PROMISE.ALL() - DEMOSTRACIÓN PRÁCTICA
 *
 * Este archivo demuestra la diferencia entre ejecutar promesas de forma
 * secuencial vs paralela usando Promise.all()
 */

// ============================================================================
// 📋 VARIABLES GLOBALES Y CONFIGURACIÓN
// ============================================================================

/**
 * Elementos del DOM que vamos a manipular
 * Se obtienen una vez al cargar la página para mejor performance
 */
const consola = document.getElementById("consola");
const tiempoSecuencial = document.getElementById("tiempoSecuencial");
const tiempoParalelo = document.getElementById("tiempoParalelo");
const mejora = document.getElementById("mejora");

// ============================================================================
// 🛠️ FUNCIONES DE UTILIDAD PARA LA INTERFAZ
// ============================================================================

/**
 * 📝 Función para mostrar mensajes en la consola
 * @param {string} mensaje - El mensaje a mostrar en la consola
 *
 * Esta función agrega un nuevo mensaje a la consola y automáticamente
 * hace scroll hacia abajo para mostrar el mensaje más reciente
 */
function log(mensaje) {
  consola.innerHTML += `<div>${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

/**
 * 🗑️ Función para limpiar toda la interfaz
 *
 * Restablece todos los contadores, mensajes y estados visuales
 * a su estado inicial. Es útil para realizar nuevas pruebas
 */
function limpiarTodo() {
  // Limpiar consola
  consola.innerHTML = "";

  // Resetear contadores de tiempo
  tiempoSecuencial.textContent = "0ms";
  tiempoParalelo.textContent = "0ms";
  mejora.textContent = "0%";

  // Resetear estados visuales de todas las tareas
  for (let i = 1; i <= 3; i++) {
    resetearTarea(`secuencial-${i}`);
    resetearTarea(`paralelo-${i}`);
  }
}

/**
 * 🔄 Actualiza el estado visual de una tarea específica
 * @param {string} id - El ID del elemento DOM de la tarea
 * @param {string} estado - Estado: 'pendiente', 'procesando', 'completada', 'fallada'
 * @param {string} mensaje - Mensaje descriptivo del estado actual
 *
 * Cambia la clase CSS y el texto para reflejar el estado actual de la tarea
 */
function actualizarTarea(id, estado, mensaje) {
  const elemento = document.getElementById(id);
  elemento.className = `tarea ${estado}`;
  elemento.querySelector("span:last-child").textContent = mensaje;
}

/**
 * 🔄 Restablece una tarea a su estado inicial
 * @param {string} id - El ID del elemento DOM de la tarea
 */
function resetearTarea(id) {
  actualizarTarea(id, "pendiente", "⏳ Esperando...");
}

// ============================================================================
// ⚡ FUNCIÓN PRINCIPAL: SIMULADOR DE TAREAS ASINCRÓNICAS
// ============================================================================

/**
 * 🎯 Simula una tarea asincrónica (como descargar un archivo o hacer una petición HTTP)
 * @param {string} nombre - Nombre descriptivo de la tarea
 * @param {number} duracion - Duración en milisegundos que debe tardar la tarea
 * @param {number} probabilidadExito - Probabilidad de éxito (0.0 a 1.0), por defecto 90%
 * @returns {Promise} Promesa que se resuelve o rechaza después del tiempo especificado
 *
 * Esta función es el corazón de la demostración. Simula:
 * - Tiempo de espera (como una descarga real)
 * - Posibilidad de fallo (como errores de red)
 * - Información detallada del resultado
 */
function simularTarea(nombre, duracion, probabilidadExito = 0.9) {
  return new Promise((resolve, reject) => {
    const inicio = Date.now();

    // setTimeout simula el tiempo que tomaría una operación real
    setTimeout(() => {
      const exito = Math.random() < probabilidadExito;
      const tiempoTranscurrido = Date.now() - inicio;

      if (exito) {
        // ✅ La tarea fue exitosa
        resolve({
          nombre,
          duracion,
          tiempoReal: tiempoTranscurrido,
          estado: "✅ Completado",
        });
      } else {
        // ❌ La tarea falló
        reject({
          nombre,
          duracion,
          tiempoReal: tiempoTranscurrido,
          estado: "❌ Falló",
        });
      }
    }, duracion);
  });
}

// ============================================================================
// 🐌 EJECUCIÓN SECUENCIAL (MÉTODO LENTO)
// ============================================================================

/**
 * 🐌 Ejecuta tareas de forma SECUENCIAL (una después de otra)
 *
 * CARACTERÍSTICAS:
 * - Cada tarea espera a que la anterior termine
 * - Tiempo total = suma de todos los tiempos individuales
 * - Más simple de entender y debuggear
 * - Menos eficiente en términos de tiempo
 *
 * TIEMPO ESTIMADO: ~3000ms (1000ms × 3 tareas)
 */
async function ejecutarSecuencial() {
  limpiarTodo();
  log("🐌 INICIANDO EJECUCIÓN SECUENCIAL");
  const inicioTotal = Date.now();

  try {
    // 📥 TAREA 1 - Primera descarga
    actualizarTarea("secuencial-1", "procesando", "⏬ Descargando...");
    const resultado1 = await simularTarea("Imagen 1", 1000);
    actualizarTarea(
      "secuencial-1",
      "completada",
      `✅ ${resultado1.tiempoReal}ms`
    );
    log(`📥 ${resultado1.nombre} completado en ${resultado1.tiempoReal}ms`);

    // 📥 TAREA 2 - Espera a que termine la 1
    actualizarTarea("secuencial-2", "procesando", "⏬ Descargando...");
    const resultado2 = await simularTarea("Imagen 2", 1000);
    actualizarTarea(
      "secuencial-2",
      "completada",
      `✅ ${resultado2.tiempoReal}ms`
    );
    log(`📥 ${resultado2.nombre} completado en ${resultado2.tiempoReal}ms`);

    // 📥 TAREA 3 - Espera a que terminen la 1 y 2
    actualizarTarea("secuencial-3", "procesando", "⏬ Descargando...");
    const resultado3 = await simularTarea("Imagen 3", 1000);
    actualizarTarea(
      "secuencial-3",
      "completada",
      `✅ ${resultado3.tiempoReal}ms`
    );
    log(`📥 ${resultado3.nombre} completado en ${resultado3.tiempoReal}ms`);

    // 📊 CALCULAR TIEMPO TOTAL
    const tiempoTotal = Date.now() - inicioTotal;
    tiempoSecuencial.textContent = `${tiempoTotal}ms`;
    log(`🐌 TIEMPO TOTAL SECUENCIAL: ${tiempoTotal}ms`);
  } catch (error) {
    // 🚨 MANEJO DE ERRORES
    log(`❌ Error en ejecución secuencial: ${error.nombre}`);
  }
}

// ============================================================================
// ⚡ EJECUCIÓN PARALELA CON PROMISE.ALL() (MÉTODO RÁPIDO)
// ============================================================================

/**
 * ⚡ Ejecuta tareas en PARALELO usando Promise.all()
 *
 * CARACTERÍSTICAS:
 * - Todas las tareas comienzan AL MISMO TIEMPO
 * - Tiempo total = tiempo de la tarea más lenta
 * - Más eficiente pero más complejo
 * - Si UNA promesa falla, TODAS son rechazadas
 *
 * TIEMPO ESTIMADO: ~1000ms (el tiempo de la tarea más lenta)
 */
async function ejecutarParalelo() {
  limpiarTodo();
  log("⚡ INICIANDO EJECUCIÓN PARALELA CON PROMISE.ALL()");
  const inicioTotal = Date.now();

  try {
    // 🎯 INICIAR TODAS LAS TAREAS SIMULTÁNEAMENTE
    actualizarTarea("paralelo-1", "procesando", "⏬ Descargando...");
    actualizarTarea("paralelo-2", "procesando", "⏬ Descargando...");
    actualizarTarea("paralelo-3", "procesando", "⏬ Descargando...");

    /**
     * 🚀 PROMISE.ALL() - EL CORAZÓN DE LA EJECUCIÓN PARALELA
     *
     * Promise.all() recibe un array de promesas y:
     * 1. Ejecuta TODAS las promesas inmediatamente
     * 2. Espera a que TODAS se resuelvan
     * 3. Retorna un array con los resultados en el MISMO ORDEN
     * 4. Si UNA promesa es rechazada, Promise.all() se rechaza inmediatamente
     */
    const resultados = await Promise.all([
      simularTarea("Imagen 1", 1000),
      simularTarea("Imagen 2", 1000),
      simularTarea("Imagen 3", 1000),
    ]);

    // 📊 ACTUALIZAR INTERFAZ CON RESULTADOS
    resultados.forEach((resultado, index) => {
      actualizarTarea(
        `paralelo-${index + 1}`,
        "completada",
        `✅ ${resultado.tiempoReal}ms`
      );
      log(`📥 ${resultado.nombre} completado en ${resultado.tiempoReal}ms`);
    });

    // ⏱️ CALCULAR TIEMPO TOTAL Y MEJORA
    const tiempoTotal = Date.now() - inicioTotal;
    tiempoParalelo.textContent = `${tiempoTotal}ms`;
    log(`⚡ TIEMPO TOTAL PARALELO: ${tiempoTotal}ms`);

    // 📈 CALCULAR PORCENTAJE DE MEJORA
    const tiempoSec = parseInt(tiempoSecuencial.textContent) || 3000;
    const mejoraPorcentaje = Math.round((1 - tiempoTotal / tiempoSec) * 100);
    mejora.textContent = `${mejoraPorcentaje}% más rápido`;
  } catch (error) {
    // 🚨 MANEJO DE ERRORES EN PROMISE.ALL()
    log(`❌ Error en ejecución paralela: ${error.nombre}`);
    log('💡 Promise.all() es "todo o nada": si UNA falla, TODAS fallan');
  }
}

// ============================================================================
// 🌐 EJEMPLO CON APIS REALES (CASO DE USO PRÁCTICO)
// ============================================================================

/**
 * 🌐 Demuestra Promise.all() con peticiones HTTP reales
 *
 * CASO DE USO COMÚN:
 * - Cargar múltiples recursos de API simultáneamente
 * - Combinar datos de diferentes endpoints
 * - Reducir tiempo de carga de aplicaciones
 */
async function ejemploAPIsReales() {
  limpiarTodo();
  log("🌐 EJEMPLO CON APIS REALES - Cargando datos de usuarios...");

  try {
    /**
     * 🚀 CARGAR MÚLTIPLES RECURSOS EN PARALELO
     *
     * En lugar de esperar a que cada fetch termine antes de empezar el siguiente,
     * Promise.all() permite hacer todas las peticiones simultáneamente
     */
    const [usuarios, posts, comentarios] = await Promise.all([
      // 📥 Fetch 1: Lista de usuarios
      fetch("<https://jsonplaceholder.typicode.com/users>").then((r) =>
        r.json()
      ),

      // 📥 Fetch 2: Lista de posts (comienza AL MISMO TIEMPO que el fetch 1)
      fetch("<https://jsonplaceholder.typicode.com/posts>").then((r) =>
        r.json()
      ),

      // 📥 Fetch 3: Lista de comentarios (comienza AL MISMO TIEMPO que los otros)
      fetch("<https://jsonplaceholder.typicode.com/comments>").then((r) =>
        r.json()
      ),
    ]);

    // 📊 MOSTRAR RESULTADOS
    log(`✅ Usuarios cargados: ${usuarios.length}`);
    log(`✅ Posts cargados: ${posts.length}`);
    log(`✅ Comentarios cargados: ${comentarios.length}`);
    log("🎉 ¡Todos los datos cargados en paralelo!");
  } catch (error) {
    log(`❌ Error cargando datos: ${error.message}`);
  }
}

// ============================================================================
// ⚠️ EJEMPLO: MANEJO DE ERRORES EN PROMISE.ALL()
// ============================================================================

/**
 * ⚠️ Demuestra el comportamiento de Promise.all() cuando hay errores
 *
 * COMPORTAMIENTO CRÍTICO:
 * - Promise.all() es "TODO O NADA"
 * - Si UNA promesa falla, Promise.all() RECHAZA INMEDIATAMENTE
 * - Las otras promesas siguen ejecutándose, pero sus resultados se ignoran
 */
async function ejemploConErrores() {
  log("\\n⚠️ EJEMPLO: Promise.all() con errores");

  try {
    const resultados = await Promise.all([
      simularTarea("Tarea 1", 500, 0.9), // 90% probabilidad de éxito
      simularTarea("Tarea 2", 800, 0.3), // 30% probabilidad de éxito (probable falle)
      simularTarea("Tarea 3", 600, 0.9), // 90% probabilidad de éxito
    ]);

    log("✅ Todas las tareas completadas");
  } catch (error) {
    log(`❌ Promise.all() falló porque una tarea falló: ${error.nombre}`);
    log('💡 Promise.all() es "todo o nada": si UNA falla, TODAS fallan');
  }
}

// ============================================================================
// 🛡️ EJEMPLO: PROMISE.ALLSETTLED() (ALTERNATIVA MÁS TOLERANTE)
// ============================================================================

/**
 * 🛡️ Demuestra Promise.allSettled() - alternativa cuando quieres todos los resultados
 *
 * DIFERENCIAS CON Promise.all():
 * - NO se rechaza si alguna promesa falla
 * - Espera a que TODAS las promesas terminen (éxito o error)
 * - Retorna array de objetos con estado y valor/razón
 * - Útil cuando quieres procesar resultados parciales
 */
async function ejemploAllSettled() {
  log("\\n🛡️ EJEMPLO: Promise.allSettled() (no se detiene por errores)");

  const resultados = await Promise.allSettled([
    simularTarea("Tarea A", 400, 0.9),
    simularTarea("Tarea B", 600, 0.2), // Esta probablemente falle
    simularTarea("Tarea C", 500, 0.9),
  ]);

  // 📊 PROCESAR TODOS LOS RESULTADOS (éxitos y fallos)
  resultados.forEach((resultado, index) => {
    if (resultado.status === "fulfilled") {
      // ✅ Tarea completada exitosamente
      log(`✅ Tarea ${index + 1}: ${resultado.value.estado}`);
    } else {
      // ❌ Tarea falló
      log(`❌ Tarea ${index + 1}: ${resultado.reason.estado}`);
    }
  });

  log("🎯 Promise.allSettled() espera a TODAS, sin importar errores");
}

// ============================================================================
// 🎯 EJECUCIÓN AUTOMÁTICA DE EJEMPLOS ADICIONALES
// ============================================================================

/**
 * Programa la ejecución de ejemplos adicionales después de un tiempo
 * Esto permite ver diferentes comportamientos sin interacción del usuario
 */
setTimeout(() => {
  ejemploConErrores();
  setTimeout(ejemploAllSettled, 2000);
}, 5000);
```

## 📋 Instrucciones de Uso

1. **Crea una carpeta** para el proyecto
2. **Guarda los 3 archivos** con estos nombres:
   - `index.html`
   - `styles.css`
   - `app.js`
3. **Abre `index.html`** en tu navegador
4. **Prueba los diferentes métodos**:
   - 🐌 **Secuencial**: Tareas una después de otra (~3000ms)
   - ⚡ **Paralelo**: Todas las tareas al mismo tiempo (~1000ms)
   - 🌐 **APIs Reales**: Ejemplo práctico con fetch

## 🎯 Conceptos Explicados

### **Promise.all() - Comportamiento Clave:**

- ⚡ **Ejecución paralela**: Todas las promesas comienzan inmediatamente
- ⏱️ **Tiempo óptimo**: Termina cuando la promesa más lenta termina
- 🚨 **Todo o nada**: Si una falla, todas fallan
- 📊 **Orden preservado**: Los resultados mantienen el orden del array

### **Casos de Uso Comunes:**

- 📥 **Descargas múltiples**: Imágenes, archivos, recursos
- 🌐 **APIs múltiples**: Datos de diferentes endpoints
- 🗃️ **Operaciones de BD**: Múltiples consultas independientes
- 🔧 **Procesamiento**: Transformaciones paralelas de datos

¡Este código te ayudará a entender visualmente la potencia de `Promise.all()` y cuándo usarlo en tus proyectos! 🚀

## 🎯 **Características Clave de Promise.all()**

### **Ventajas:**

- **Máxima velocidad:** Ejecuta en paralelo
- **Sincronización:** Espera a que TODAS terminen
- **Orden preservado:** Los resultados mantienen el orden del array

## Cuando usar Promise.all()

- Cuando necesitas múltiples recursos que no dependen entre sí.
- Para mejorar performance ejecutando operaciones en paralelo.
- Cuando todas las operaciones son esenciales (todo o nada)

## Cuando no usar Prmise All()

- Cuando las operaciones dependen unas de otras.
- Cuando quieres manejar errores de forma individual.
- Cuando algunas operaciones son opcionales.

## Alternativas

- Promise.allSettled() - Cuando quieres todos los resultados
- Promise.race() - Cuando solo necesitas el primer resultado
- Ejecución secuencial - Cuando hay dependencias entre operacion

## 🔧 **Alternativas a Promise.all()**

### **Promise.allSettled()** - No se detiene por errores. Sintaxis básica.

```jsx
Promise.allSettled([promesa1, promesa2, promesa3, ...])
  .then((resultados) => {
    console.log('✅ Todas las promesas finalizaron:', resultados);
  });
/*👉 A diferencia de Promise.all():

Promise.allSettled() NO rechaza si alguna promesa falla.

Espera a que todas las promesas se resuelvan o se rechacen.

Devuelve un array con objetos de estado por cada promesa:

{ status: "fulfilled", value: ... } si se cumplió

{ status: "rejected", reason: ... } si falló*/
```

### **Promise.race()** - La primera que termine. Sintaxis básica.

```jsx
Promise.race([promesa1, promesa2, promesa3, ...])
  .then((valorGanador) => {
    console.log('✅ Promesa que se resolvió/rechazó primero:', valorGanador);
  })
  .catch((error) => {
    console.error('❌ La primera promesa en fallar fue:', error);
  });
/*👉 Qué hace Promise.race():

Recibe como argumento un array (o iterable) de promesas.

Devuelve una nueva promesa que se resuelve o se rechaza con el resultado de la primera promesa que termine (no necesariamente la que se resuelva primero, también puede ser la que falle primero).

El resto de las promesas siguen ejecutándose en segundo plano, pero su resultado ya no afecta al race.*/
```

### ✅ **¿Cuándo usar Promise.all()?**

- Cuando necesitas **múltiples datos independientes**
- Cuando las tareas **no dependen** entre sí
- Para **optimizar velocidad** (ejecución paralela)
- Cuando quieres **esperar a que todas terminen**

### ❌ **¿Cuándo NO usar Promise.all()?**

- Cuando las tareas **dependen** entre sí
- Cuando manejas **muchísimas** promesas (puede saturar)
- Cuando quieres **resultados parciales** aunque algunas fallen

### 💡 **Casos de Uso Reales:**

- Cargar **múltiples imágenes** para una galería
- Obtener **datos de varias APIs** al mismo tiempo
- **Procesar archivos** en paralelo
- **Validaciones múltiples** independientes

# 🏎️ **¿Qué es Promise.race()**

## 📚 ¿Qué es Promise.race()?

**Promise.race()** es como una **carrera de promesas**: toma varias promesas y **gana la que termine primero** (ya sea con éxito o con error).

### 🔍 Analogía Simple:

Imagina que tienes 3 amigos buscando la respuesta a una pregunta:

- **Amigo 1** va a la biblioteca (tarda 5 minutos)
- **Amigo 2** busca en Google (tarda 2 minutos)
- **Amigo 3** pregunta a un experto (tarda 1 minuto)

**Promise.race()** te da la respuesta del **amigo 3** (el más rápido) y **ignora a los demás**.

### 💻 CÓDIGO EJEMPLO SENCILLO

```jsx
/**
 * 🏎️ PROMISE.RACE() - EJEMPLO SUPER SENCILLO
 *
 * Promise.race() recibe un array de promesas y:
 * ✅ GANA la primera promesa que termine (éxito o error)
 * ❌ IGNORA todas las demás promesas
 */

// 🕒 Función que simula una tarea con un tiempo específico
function tarea(nombre, tiempo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`✅ ${nombre} terminó en ${tiempo}ms`);
    }, tiempo);
  });
}

// 🚨 Función que simula una tarea que FALLA
function tareaQueFalla(nombre, tiempo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`❌ ${nombre} FALLÓ en ${tiempo}ms`);
    }, tiempo);
  });
}

// 🎯 EJEMPLO 1: CARRERA NORMAL (TODAS EXITOSAS)
async function carreraNormal() {
  console.log("🏁 INICIANDO CARRERA NORMAL...");

  try {
    const ganador = await Promise.race([
      tarea("Descarga A", 3000), // Tarda 3 segundos
      tarea("Descarga B", 1500), // Tarda 1.5 segundos  ← ¡ESTA GANA!
      tarea("Descarga C", 2000), // Tarda 2 segundos
    ]);

    console.log("🏆 GANADOR:", ganador);
    console.log(
      "💡 Nota: Las otras descargas siguen ejecutándose en segundo plano"
    );
  } catch (error) {
    console.log("❌ Error:", error);
  }
}

// 🚨 EJEMPLO 2: CARRERA CON ERROR (LA MÁS RÁPIDA FALLA)
async function carreraConError() {
  console.log("\\n🏁 INICIANDO CARRERA CON ERROR...");

  try {
    const ganador = await Promise.race([
      tarea("Tarea Segura", 2000), // Tarda 2 segundos
      tareaQueFalla("Tarea Rápida", 500), // Falla en 0.5 segundos ← ¡ESTA GANA!
      tarea("Tarea Lenta", 3000), // Tarda 3 segundos
    ]);

    console.log("🏆 GANADOR:", ganador);
  } catch (error) {
    console.log("🎯 PRIMERA EN TERMINAR (pero con error):", error);
    console.log(
      "💡 Promise.race() NO espera a las exitosas si una falla primero"
    );
  }
}

// ⏱️ EJEMPLO 3: TIMEOUT AUTOMÁTICO (Caso de uso REAL)
async function conTimeout() {
  console.log("\\n⏰ EJEMPLO REAL: TIMEOUT AUTOMÁTICO");

  // Simulamos una descarga que podría tardar mucho
  const descargaLenta = tarea("Descarga de archivo grande", 5000);

  // Creamos un timeout de seguridad (3 segundos)
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("⏰ TIMEOUT: La descarga tardó demasiado");
    }, 3000);
  });

  try {
    const resultado = await Promise.race([
      descargaLenta, // La descarga real
      timeout, // El timeout de seguridad
    ]);

    console.log("✅ Descarga completada:", resultado);
  } catch (error) {
    console.log("❌", error);
    console.log("💡 El timeout 'ganó la carrera' y canceló la descarga lenta");
  }
}

// 🎮 EJEMPLO 4: MULTIPLES FUENTES DE DATOS
async function multiplesFuentes() {
  console.log("\\n🌐 EJEMPLO REAL: MÚLTIPLES FUENTES DE DATOS");

  // Simulamos buscar el mismo dato en diferentes servidores
  const servidorA = tarea("Servidor Principal", 800);
  const servidorB = tarea("Servidor Secundario", 400); // ← Este responde más rápido
  const servidorC = tarea("Servidor de Respaldo", 600);

  try {
    const dato = await Promise.race([servidorA, servidorB, servidorC]);

    console.log("📡 Dato obtenido del:", dato);
    console.log("💡 Usamos el servidor más rápido, ignoramos los demás");
  } catch (error) {
    console.log("❌ Todos los servidores fallaron");
  }
}

// 🚀 EJECUTAR TODOS LOS EJEMPLOS
async function ejecutarEjemplos() {
  console.log("🎯 ====================================");
  console.log("🏎️  DEMOSTRACIÓN DE PROMISE.RACE()");
  console.log("🎯 ====================================\\n");

  await carreraNormal();
  await carreraConError();
  await conTimeout();
  await multiplesFuentes();

  console.log("\\n🎯 ====================================");
  console.log("📚 RESUMEN: CUÁNDO USAR PROMISE.RACE()");
  console.log("🎯 ====================================");
  console.log("1️⃣ ⏰ Timeouts automáticos");
  console.log("2️⃣ 🌐 Múltiples fuentes de datos (usar la más rápida)");
  console.log("3️⃣ 🚨 Detección rápida de errores");
  console.log("4️⃣ 🎯 Cualquier caso donde solo necesites el primer resultado");
}

// Ejecutar la demostración
ejecutarEjemplos();
```

### 🎯 SALIDA ESPERADA DEL CÓDIGO:

```
🎯 ====================================
🏎️  DEMOSTRACIÓN DE PROMISE.RACE()
🎯 ====================================

🏁 INICIANDO CARRERA NORMAL...
🏆 GANADOR: ✅ Descarga B terminó en 1500ms
💡 Nota: Las otras descargas siguen ejecutándose en segundo plano

🏁 INICIANDO CARRERA CON ERROR...
🎯 PRIMERA EN TERMINAR (pero con error): ❌ Tarea Rápida FALLÓ en 500ms
💡 Promise.race() NO espera a las exitosas si una falla primero

⏰ EJEMPLO REAL: TIMEOUT AUTOMÁTICO
❌ ⏰ TIMEOUT: La descarga tardó demasiado
💡 El timeout 'ganó la carrera' y canceló la descarga lenta

🌐 EJEMPLO REAL: MÚLTIPLES FUENTES DE DATOS
📡 Dato obtenido del: ✅ Servidor Secundario terminó en 400ms
💡 Usamos el servidor más rápido, ignoramos los demás

🎯 ====================================
📚 RESUMEN: CUÁNDO USAR PROMISE.RACE()
🎯 ====================================
1️⃣ ⏰ Timeouts automáticos
2️⃣ 🌐 Múltiples fuentes de datos (usar la más rápida)
3️⃣ 🚨 Detección rápida de errores
4️⃣ 🎯 Cualquier caso donde solo necesites el primer resultado

```

### 📖 EXPLICACIÓN VISUAL

Imagina estas promesas corriendo:

```
PROMESA A: 🐢 ---[3 segundos]---> ✅
PROMESA B: 🐇 -[1.5 segundos]-> ✅  ← ¡GANADORA!
PROMESA C: 🐕 --[2 segundos]---> ✅

RESULTADO: Promise.race() = 🐇 (la más rápida)

```

## 🆚 COMPARACIÓN RÁPIDA

| Método                 | Comportamiento                   | Cuando usar                    |
| ---------------------- | -------------------------------- | ------------------------------ |
| `Promise.all()`        | Espera a **TODAS**               | Necesitas todos los resultados |
| `Promise.race()`       | Toma al **PRIMERO**              | Solo necesitas el más rápido   |
| `Promise.any()`        | Toma al **PRIMERO EXITOSO**      | Quieres el primer éxito        |
| `Promise.allSettled()` | Espera a **TODAS** (éxito/error) | Necesitas saber de todas       |

### 💡 CASOS DE USO REALES

### 1. **Timeout Automático:**

```jsx
// Si la API no responde en 5 segundos, muestra error
const respuesta = await Promise.race([
  fetch("/api/datos"),
  timeout(5000), // Timeout de 5 segundos
]);
```

### 2. **Múltiples Servidores:**

```jsx
// Usar el servidor que responda más rápido
const dato = await Promise.race([
  servidorEuropeo.getDatos(),
  servidorAmericano.getDatos(),
  servidorAsiatico.getDatos(),
]);
```

### 3. **Carga con Fallback:**

```jsx
// Intentar cargar de cache primero, si no de red
const imagen = await Promise.race([
  cargarDeCache(),
  cargarDeRed().then(guardarEnCache),
]);
```

**¡Promise.race() es tu aliado cuando la velocidad importa más que tener todos los resultados!** 🏎️💨

## 💻 **Demo Interactivo: Promise.race() en Acción**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.race() - La Carrera de Promesas</title>
  </head>
  <body>
    <div class="container">
      <h1>🏁 Promise.race() - La Carrera de Promesas</h1>
      <p>
        <strong>Definición sencilla:</strong> Ejecuta múltiples promesas y
        devuelve la <strong>PRIMERA</strong> que termine (éxito o error).
      </p>
      <div class="explicacion">
        <h3>🎯 ¿En qué se diferencia de Promise.all()?</h3>
        <p>
          ✅ <strong>Promise.all():</strong> Espera a que
          <strong>TODAS</strong> terminen
        </p>
        <p>
          ✅ <strong>Promise.race():</strong> Solo espera a la
          <strong>PRIMERA</strong> que termine
        </p>
      </div>
      <h2>🏃‍♂️ Pista de Carrera</h2>
      <div class="pista">
        <div class="participante rapido" id="corredor-rapido">🚀 Rápido</div>
        <div class="participante medio" id="corredor-medio">🐢 Medio</div>
        <div class="participante lento" id="corredor-lento">🐌 Lento</div>
        <div class="meta"></div>
        <div class="meta-texto">META</div>
      </div>
      <div class="estadisticas">
        <div class="estadistica">
          <h3>🚀 Corredor Rápido</h3>
          <div class="tiempo" id="tiempo-rapido">-</div>
          <p>500-800ms</p>
        </div>
        <div class="estadistica">
          <h3>🐢 Corredor Medio</h3>
          <div class="tiempo" id="tiempo-medio">-</div>
          <p>1000-1500ms</p>
        </div>
        <div class="estadistica">
          <h3>🐌 Corredor Lento</h3>
          <div class="tiempo" id="tiempo-lento">-</div>
          <p>2000-3000ms</p>
        </div>
      </div>
      <div class="carrera">
        <h3>🎯 Participantes de la Carrera</h3>
        <div class="corredor esperando" id="participante-rapido">
          <span>🚀 <strong>Promesa Rápida</strong> (500-800ms)</span>
          <span>⏳ Esperando inicio...</span>
        </div>
        <div class="corredor esperando" id="participante-medio">
          <span>🐢 <strong>Promesa Media</strong> (1000-1500ms)</span>
          <span>⏳ Esperando inicio...</span>
        </div>
        <div class="corredor esperando" id="participante-lento">
          <span>🐌 <strong>Promesa Lenta</strong> (2000-3000ms)</span>
          <span>⏳ Esperando inicio...</span>
        </div>
        <button class="btn-carrera" onclick="iniciarCarrera()">
          🏁 Iniciar Carrera
        </button>
        <button class="btn-timeout" onclick="ejemploTimeout()">
          ⏰ Ejemplo con Timeout
        </button>
        <button class="btn-carga" onclick="ejemploCargaImagenes()">
          🖼️ Carrera de Carga
        </button>
        <button class="btn-limpiar" onclick="limpiarTodo()">
          🗑️ Limpiar Todo
        </button>
      </div>
      <h3>📝 Código de Ejemplo:</h3>
      <div class="codigo">
        // 🏁 Promise.race() - Solo importa el primero<br />
        const ganadora = await Promise.race([<br />
        &nbsp;&nbsp;promesaRapida(500), // 🚀 Este probablemente gane<br />
        &nbsp;&nbsp;promesaMedia(1000), // 🐢 Este llega segundo<br />
        &nbsp;&nbsp;promesaLenta(2000) // 🐌 Este llega último<br />
        ]);<br /><br />
        console.log('¡Ganó:', ganadora);<br />
        // Solo se ejecuta con el resultado del MÁS RÁPIDO
      </div>
      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.carrera {
  border: 3px solid #007bff;
  border-radius: 10px;
  padding: 20px;
  background: #f0f8ff;
  margin: 20px 0;
}
.corredor {
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 5px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}
.esperando {
  border-left-color: #6c757d;
  background: #f8f9fa;
}
.corriendo {
  border-left-color: #007bff;
  background: #e7f3ff;
}
.ganador {
  border-left-color: #28a745;
  background: #d4edda;
  transform: scale(1.02);
}
.perdedor {
  border-left-color: #dc3545;
  background: #f8d7da;
  opacity: 0.7;
}
.fallo {
  border-left-color: #ffc107;
  background: #fff3cd;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
}
.btn-carrera {
  background: #007bff;
  color: white;
}
.btn-timeout {
  background: #28a745;
  color: white;
}
.btn-carga {
  background: #6f42c1;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.pista {
  height: 100px;
  background: linear-gradient(90deg, #e9ecef 0%, #dee2e6 100%);
  border-radius: 8px;
  margin: 20px 0;
  position: relative;
  overflow: hidden;
}
.participante {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: left 0.5s ease;
  left: 10px;
}
.rapido {
  background: #dc3545;
  top: 10px;
}
.medio {
  background: #007bff;
  top: 50px;
}
.lento {
  background: #28a745;
  top: 90px;
}
.meta {
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #000;
}
.meta-texto {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  font-weight: bold;
}
.estadisticas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}
.estadistica {
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  background: #e9ecef;
}
.ganador-estadistica {
  background: #d4edda;
  border: 2px solid #28a745;
}
.tiempo {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
.explicacion {
  background: #fff3cd;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
  border-left: 4px solid #ffc107;
}
```

```jsx
// Elementos del DOM
const consola = document.getElementById("consola");
const corredorRapido = document.getElementById("corredor-rapido");
const corredorMedio = document.getElementById("corredor-medio");
const corredorLento = document.getElementById("corredor-lento");

function log(mensaje) {
  consola.innerHTML += `<div>${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

function limpiarTodo() {
  consola.innerHTML = "";
  resetearParticipantes();
  resetearPista();
  resetearEstadisticas();
}

function resetearParticipantes() {
  for (const id of ["rapido", "medio", "lento"]) {
    const elemento = document.getElementById(`participante-${id}`);
    elemento.className = "corredor esperando";
    elemento.querySelector("span:last-child").textContent =
      "⏳ Esperando inicio...";
  }
}

function resetearPista() {
  corredorRapido.style.left = "10px";
  corredorMedio.style.left = "10px";
  corredorLento.style.left = "10px";
}

function resetearEstadisticas() {
  for (const id of ["rapido", "medio", "lento"]) {
    document.getElementById(`tiempo-${id}`).textContent = "-";
  }
}

function actualizarParticipante(id, estado, mensaje) {
  const elemento = document.getElementById(`participante-${id}`);
  elemento.className = `corredor ${estado}`;
  elemento.querySelector("span:last-child").textContent = mensaje;
}

function actualizarPista(id, progreso) {
  const elemento = document.getElementById(`corredor-${id}`);
  const pistaWidth = document.querySelector(".pista").offsetWidth - 80;
  elemento.style.left = `${10 + (progreso * pistaWidth) / 100}px`;
}

function actualizarTiempo(id, tiempo) {
  document.getElementById(`tiempo-${id}`).textContent = `${tiempo}ms`;
}

// Función que simula una promesa con tiempo variable
function crearPromesa(nombre, minTiempo, maxTiempo, probabilidadExito = 0.9) {
  return new Promise((resolve, reject) => {
    const tiempo = Math.random() * (maxTiempo - minTiempo) + minTiempo;
    const inicio = Date.now();
    let progreso = 0;

    // Animación de progreso
    const intervalo = setInterval(() => {
      progreso += 100 / (tiempo / 100);
      if (progreso >= 100) {
        clearInterval(intervalo);
        progreso = 100;
      }
      actualizarPista(nombre.toLowerCase(), progreso);
    }, 100);

    setTimeout(() => {
      clearInterval(intervalo);
      const tiempoReal = Date.now() - inicio;
      actualizarTiempo(nombre.toLowerCase(), tiempoReal);

      const exito = Math.random() < probabilidadExito;

      if (exito) {
        resolve({
          nombre,
          tiempo: tiempoReal,
          mensaje: `✅ ${nombre} completado en ${tiempoReal}ms`,
        });
      } else {
        reject({
          nombre,
          tiempo: tiempoReal,
          mensaje: `❌ ${nombre} falló después de ${tiempoReal}ms`,
        });
      }
    }, tiempo);
  });
}

// 1️⃣ CARRERA BÁSICA CON PROMISE.RACE()
async function iniciarCarrera() {
  limpiarTodo();
  log("🏁 INICIANDO CARRERA CON PROMISE.RACE()");

  // Preparar participantes
  actualizarParticipante("rapido", "corriendo", "🏃‍♂️ Corriendo...");
  actualizarParticipante("medio", "corriendo", "🏃‍♂️ Corriendo...");
  actualizarParticipante("lento", "corriendo", "🏃‍♂️ Corriendo...");

  try {
    // Promise.race() - Solo espera al MÁS RÁPIDO
    const ganadora = await Promise.race([
      crearPromesa("Rapido", 500, 800),
      crearPromesa("Medio", 1000, 1500),
      crearPromesa("Lento", 2000, 3000),
    ]);

    // Solo esto se ejecuta (con el ganador)
    log(`🎉 ¡GANÓ ${ganadora.nombre.toUpperCase()}!`);
    log(ganadora.mensaje);
    actualizarParticipante(
      ganadora.nombre.toLowerCase(),
      "ganador",
      `🏆 ¡GANADOR! ${ganadora.tiempo}ms`
    );

    // Marcar los demás como perdedores
    ["rapido", "medio", "lento"].forEach((id) => {
      if (id !== ganadora.nombre.toLowerCase()) {
        actualizarParticipante(
          id,
          "perdedor",
          `😞 Perdió - ${document.getElementById(`tiempo-${id}`).textContent}`
        );
      }
    });

    log("💡 Promise.race() solo devuelve el PRIMERO en terminar");
  } catch (error) {
    // Si el PRIMERO en terminar fue un error
    log(`💥 El primero en terminar fue un ERROR: ${error.nombre}`);
    log(error.mensaje);
    actualizarParticipante(
      error.nombre.toLowerCase(),
      "fallo",
      `💥 Falló - ${error.tiempo}ms`
    );
  }
}

// 2️⃣ EJEMPLO PRÁCTICO: TIMEOUT CON PROMISE.RACE()
async function ejemploTimeout() {
  limpiarTodo();
  log("⏰ EJEMPLO: TIMEOUT CON PROMISE.RACE()");

  function conTimeout(promesa, tiempoLimite) {
    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`⏰ Timeout después de ${tiempoLimite}ms`));
      }, tiempoLimite);
    });

    return Promise.race([promesa, timeout]);
  }

  // Simular una operación que puede tardar mucho
  const operacionLenta = new Promise((resolve) => {
    setTimeout(() => {
      resolve("✅ Operación lenta completada");
    }, 3000); // Tarda 3 segundos
  });

  try {
    // Timeout de 2 segundos
    const resultado = await conTimeout(operacionLenta, 2000);
    log(resultado);
  } catch (error) {
    log(`❌ ${error.message}`);
    log("💡 El timeout ganó la carrera contra la operación lenta");
  }
}

// 3️⃣ EJEMPLO PRÁCTICO: CARRERA DE CARGA DE IMÁGENES
async function ejemploCargaImagenes() {
  limpiarTodo();
  log("🖼️ EJEMPLO: CARRERA DE CARGA DE IMÁGENES");

  // Simular carga de imágenes desde diferentes servidores
  function cargarImagen(servidor, tiempo) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`✅ Imagen cargada desde ${servidor} en ${tiempo}ms`);
      }, tiempo);
    });
  }

  try {
    // Intentar cargar desde múltiples servidores
    const imagen = await Promise.race([
      cargarImagen("Servidor Principal", 1500),
      cargarImagen("Servidor Secundario", 800),
      cargarImagen("CDN Rápido", 400),
      cargarImagen("Cache Local", 200),
    ]);

    log(imagen);
    log("🎯 Usamos la imagen del servidor más rápido");
  } catch (error) {
    log(`❌ Error cargando imagen: ${error.message}`);
  }
}

// 4️⃣ EJEMPLO: PROMISE.RACE() CON ERRORES
async function ejemploConErrores() {
  log("\\n⚠️ EJEMPLO: Promise.race() con posibles errores");

  function tareaInestable(nombre, tiempo, probabilidadFallo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < probabilidadFallo) {
          reject(new Error(`❌ ${nombre} falló`));
        } else {
          resolve(`✅ ${nombre} exitosa`);
        }
      }, tiempo);
    });
  }

  try {
    const resultado = await Promise.race([
      tareaInestable("Servidor A", 500, 0.8), // Alto riesgo
      tareaInestable("Servidor B", 800, 0.2), // Bajo riesgo
      tareaInestable("Servidor C", 1000, 0.5), // Riesgo medio
    ]);

    log(resultado);
  } catch (error) {
    log(`💥 El primero en terminar fue un error: ${error.message}`);
    log(
      "⚠️ Promise.race() no distingue entre éxito y error - solo toma el primero"
    );
  }
}

// 5️⃣ EJEMPLO: CANCELACIÓN CON PROMISE.RACE()
async function ejemploCancelacion() {
  log("\\n🚫 EJEMPLO: PATRÓN DE CANCELACIÓN");

  let cancelar = false;

  function operacionCancelable() {
    return new Promise((resolve, reject) => {
      const intervalo = setInterval(() => {
        if (cancelar) {
          clearInterval(intervalo);
          reject(new Error("🚫 Operación cancelada por el usuario"));
        }
      }, 100);

      // Simular trabajo
      setTimeout(() => {
        clearInterval(intervalo);
        resolve("✅ Operación completada");
      }, 3000);
    });
  }

  function crearBotonCancelacion() {
    return new Promise((_, reject) => {
      // Simular botón de cancelación
      setTimeout(() => {
        if (Math.random() < 0.3) {
          // 30% de probabilidad de cancelar
          reject(new Error("🛑 Usuario canceló la operación"));
        }
      }, 1500);
    });
  }

  try {
    const resultado = await Promise.race([
      operacionCancelable(),
      crearBotonCancelacion(),
    ]);

    log(resultado);
  } catch (error) {
    log(error.message);
  }
}

// Ejecutar ejemplos adicionales
setTimeout(() => {
  ejemploConErrores();
  setTimeout(ejemploCancelacion, 3000);
}, 8000);
```

## 🎯 **Características Clave de Promise.race()**

### ✅ **Comportamiento:**

- **Primero en terminar gana:** No importa si es éxito o error
- **Ignora las demás:** Las otras promesas siguen ejecutándose en segundo plano
- **No espera:** Devuelve inmediatamente cuando una termina

### ⚠️ **Casos Especiales:**

```jsx
// Si el PRIMERO es un error, Promise.race() falla
Promise.race([
  Promise.reject("❌ Error inmediato"),
  Promise.resolve("✅ Éxito rápido"),
]).catch((error) => {
  console.log(error); // "❌ Error inmediato"
});

// Si el PRIMERO es éxito, Promise.race() tiene éxito
Promise.race([
  Promise.resolve("✅ Éxito inmediato"),
  Promise.reject("❌ Error lento"),
]).then((resultado) => {
  console.log(resultado); // "✅ Éxito inmediato"
});
```

### ✅ **¿Cuándo usar Promise.race()?**

- Para implementar **timeouts**
- Cuando tienes **múltiples fuentes** y quieres la más rápida
- Para **cancelar operaciones** por acción del usuario
- En **carreras de servicios** (¿qué servidor responde primero?)

### ❌ **¿Cuándo NO usar Promise.race()?**

- Cuando necesitas **todos los resultados**
- Cuando las operaciones **dependen** entre sí
- Cuando quieres **procesar** todos los datos

### 💡 **Diferencias con Promise.all():**

- **Promise.all():** Espera a TODAS (como un equipo)
- **Promise.race():** Solo la PRIMERA (como una carrera)

# 🧩 **¿Qué es AbortController?**

Imagina que estás descargando un archivo grande:

### 📥 **Ejemplo del mundo real:**

- **Sin AbortController:** Una vez que empiezas la descarga, no puedes cancelarla
- **Con AbortController:** Tienes un **botón de cancelar** que puedes presionar en cualquier momento

### 💻 **Traducción a JavaScript:**

**AbortController** es un objeto que permite **cancelar** operaciones asincrónicas como `fetch`, `Promise`, y otras cuando ya no las necesitas.

## 🔧 **Sintaxis Básica de AbortController**

```jsx
// ======================================================
// 🛑 1. Crear un AbortController
// ======================================================

// Creamos una nueva instancia de AbortController.
// Este objeto nos dará un "control remoto" para cancelar operaciones.
const controller = new AbortController();

// Obtenemos la señal (signal) asociada al controller.
// Esta signal es la que pasaremos a las operaciones que queremos poder abortar.
const signal = controller.signal;

// ======================================================
// 📡 2. Pasar la signal a operaciones que la soporten (como fetch)
// ======================================================

// Aquí hacemos una petición fetch, pero le pasamos la opción { signal }.
// Esto permite que esta petición pueda ser cancelada más adelante.
fetch("/api/datos", { signal })
  .then((response) => {
    // Si no se canceló, procesamos la respuesta normalmente.
    return response.json();
  })
  .then((datos) => {
    console.log("Datos recibidos:", datos);
  })
  .catch((error) => {
    // Si la operación fue abortada, fetch lanza un error con name === 'AbortError'
    if (error.name === "AbortError") {
      console.log("✅ Fetch cancelado por el usuario");
    } else {
      // Si no fue cancelada, mostramos el error real.
      console.error("❌ Otro error:", error);
    }
  });

// ======================================================
// 🧭 3. Cancelar cuando quieras (por ejemplo, al hacer clic en un botón)
// ======================================================

// Escuchamos un click en un botón con id="cancelar"
document.getElementById("cancelar").addEventListener("click", () => {
  // Al llamar a abort(), todas las operaciones asociadas a esta signal
  // lanzarán un AbortError y dejarán de ejecutarse inmediatamente.
  controller.abort();
  // ⚠️ Nota: Esto no "revierte" lo que ya se haya hecho, pero sí corta la espera de fetch.
});
```

## 💻 **Demo Interactivo: AbortController en Acción**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>AbortController - Cancelar Operaciones Asincrónicas</title>
  </head>
  <body>
    <div class="container">
      <h1>🚫 AbortController - Cancelar Operaciones Asincrónicas</h1>
      <p>
        <strong>Definición sencilla:</strong> Un "botón de cancelar" para
        operaciones que tardan mucho tiempo.
      </p>
      <div class="explicacion">
        <h3>🎯 ¿Por qué necesitamos AbortController?</h3>
        <p>
          ✅ <strong>Mejora la experiencia de usuario:</strong> Los usuarios
          pueden cancelar operaciones lentas
        </p>
        <p>
          ✅ <strong>Ahorra recursos:</strong> Detiene peticiones innecesarias
          al servidor
        </p>
        <p>
          ✅ <strong>Control preciso:</strong> Cancela exactamente lo que
          quieres, cuando quieres
        </p>
      </div>
      <!-- DEMO 1: FETCH CON ABORT CONTROLLER -->
      <div class="demo-section fetch-demo">
        <h2>🌐 Demo 1: Cancelar Petición Fetch</h2>
        <p>Simula una petición HTTP lenta que puedes cancelar</p>
        <div class="estado esperando" id="estado-fetch">
          ⏳ Esperando para iniciar fetch...
        </div>
        <div class="progreso">
          <div class="barra-progreso" id="progreso-fetch"></div>
        </div>
        <div class="controles">
          <button class="btn-iniciar" onclick="iniciarFetch()">
            🌐 Iniciar Fetch Lento
          </button>
          <button
            class="btn-cancelar"
            id="btn-cancelar-fetch"
            disabled
            onclick="cancelarFetch()"
          >
            🚫 Cancelar Fetch
          </button>
        </div>
        <div class="codigo">
          // 1. Crear AbortController<br />
          const controller = new AbortController();<br />
          const signal = controller.signal;<br /><br />
          // 2. Usar en fetch<br />
          fetch(url, { signal })<br />
          &nbsp;&nbsp;.then(response => response.json())<br />
          &nbsp;&nbsp;.then(data => console.log(data))<br />
          &nbsp;&nbsp;.catch(error => {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;if (error.name === 'AbortError') {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log('Fetch cancelado');<br />
          &nbsp;&nbsp;&nbsp;&nbsp;}<br />
          &nbsp;&nbsp;});<br /><br />
          // 3. Cancelar cuando quieras<br />
          controller.abort();
        </div>
      </div>
      <!-- DEMO 2: TIMEOUT PERSONALIZADO CON ABORT -->
      <div class="demo-section timeout-demo">
        <h2>⏰ Demo 2: Timeout con Cancelación</h2>
        <p>Crea un timeout que puedes cancelar antes de que termine</p>
        <div class="estado esperando" id="estado-timeout">
          ⏳ Esperando para iniciar timeout...
        </div>
        <div class="progreso">
          <div class="barra-progreso" id="progreso-timeout"></div>
        </div>
        <div class="controles">
          <button class="btn-iniciar" onclick="iniciarTimeout()">
            ⏰ Iniciar Timeout (5s)
          </button>
          <button
            class="btn-cancelar"
            id="btn-cancelar-timeout"
            disabled
            onclick="cancelarTimeout()"
          >
            🚫 Cancelar Timeout
          </button>
        </div>
      </div>
      <!-- DEMO 3: MÚLTIPLES DESCARGAS -->
      <div class="demo-section custom-demo">
        <h2>📥 Demo 3: Múltiples Descargas con Cancelación Individual</h2>
        <p>Gestiona varias operaciones y cancela las que quieras</p>
        <div class="controles">
          <button class="btn-iniciar" onclick="agregarDescarga()">
            📥 Agregar Nueva Descarga
          </button>
          <button class="btn-cancelar" onclick="cancelarTodasDescargas()">
            🗑️ Cancelar Todas
          </button>
        </div>
        <div class="lista-descargas" id="lista-descargas">
          <!-- Las descargas se agregarán aquí dinámicamente -->
        </div>
      </div>
      <button class="btn-ejemplo" onclick="ejemploAvanzado()">
        🚀 Ejemplo Avanzado: Búsqueda en Tiempo Real
      </button>
      <button class="btn-ejemplo" onclick="limpiarTodo()">
        🗑️ Limpiar Todo
      </button>
      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.demo-section {
  border: 3px solid;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}
.fetch-demo {
  border-color: #007bff;
  background: #f0f8ff;
}
.timeout-demo {
  border-color: #28a745;
  background: #f0fff4;
}
.custom-demo {
  border-color: #6f42c1;
  background: #f8f0ff;
}
.estado {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s ease;
}
.esperando {
  background: #fff3cd;
  color: #856404;
  border: 2px dashed #ffc107;
}
.procesando {
  background: #d1ecf1;
  color: #0c5460;
  border: 2px solid #17a2b8;
}
.completado {
  background: #d4edda;
  color: #155724;
  border: 2px solid #28a745;
}
.cancelado {
  background: #f8d7da;
  color: #721c24;
  border: 2px solid #dc3545;
}
.error {
  background: #fff3cd;
  color: #856404;
  border: 2px solid #ffc107;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.btn-iniciar {
  background: #28a745;
  color: white;
}
.btn-iniciar:hover {
  background: #218838;
}
.btn-cancelar {
  background: #dc3545;
  color: white;
}
.btn-cancelar:hover {
  background: #c82333;
}
.btn-cancelar:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
.btn-ejemplo {
  background: #007bff;
  color: white;
}
.progreso {
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  margin: 15px 0;
  overflow: hidden;
}
.barra-progreso {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00ff88);
  transition: width 0.3s ease;
  width: 0%;
}
.controles {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
.explicacion {
  background: #e9ecef;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}
.lista-descargas {
  margin: 15px 0;
}
.descarga-item {
  background: white;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  border-left: 4px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.descarga-pendiente {
  border-left-color: #ffc107;
}
.descarga-activa {
  border-left-color: #007bff;
}
.descarga-completada {
  border-left-color: #28a745;
}
.descarga-cancelada {
  border-left-color: #dc3545;
}
```

```jsx
// Elementos del DOM
const consola = document.getElementById("consola");

// Estado global
let fetchController = null;
let timeoutController = null;
let descargasActivas = new Map(); // Map para gestionar múltiples descargas

function log(mensaje) {
  consola.innerHTML += `<div>${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

function limpiarTodo() {
  consola.innerHTML = "";
  resetearFetch();
  resetearTimeout();
  cancelarTodasDescargas();
}

// ==================== DEMO 1: FETCH ====================
function resetearFetch() {
  document.getElementById("estado-fetch").className = "estado esperando";
  document.getElementById("estado-fetch").textContent =
    "⏳ Esperando para iniciar fetch...";
  document.getElementById("progreso-fetch").style.width = "0%";
  document.getElementById("btn-cancelar-fetch").disabled = true;

  if (fetchController) {
    fetchController.abort();
    fetchController = null;
  }
}

async function iniciarFetch() {
  resetearFetch();

  // Crear nuevo AbortController
  fetchController = new AbortController();
  const signal = fetchController.signal;

  // Actualizar UI
  document.getElementById("estado-fetch").className = "estado procesando";
  document.getElementById("estado-fetch").textContent =
    "🔄 Haciendo petición fetch...";
  document.getElementById("btn-cancelar-fetch").disabled = false;

  log("🌐 Iniciando petición fetch lenta...");

  try {
    // Simular una petición fetch lenta con progreso
    let progreso = 0;
    const intervalo = setInterval(() => {
      if (signal.aborted) {
        clearInterval(intervalo);
        return;
      }

      progreso += 10;
      document.getElementById("progreso-fetch").style.width = `${progreso}%`;

      if (progreso >= 100) {
        clearInterval(intervalo);
      }
    }, 200);

    // Simular fetch con AbortController
    await new Promise((resolve, reject) => {
      // Verificar si ya fue abortado
      if (signal.aborted) {
        reject(new DOMException("Abortado", "AbortError"));
        return;
      }

      // Escuchar el evento abort
      signal.addEventListener("abort", () => {
        reject(new DOMException("Abortado", "AbortError"));
      });

      // Simular trabajo que toma tiempo
      setTimeout(() => {
        if (signal.aborted) {
          reject(new DOMException("Abortado", "AbortError"));
        } else {
          resolve("✅ Datos recibidos correctamente");
        }
      }, 2000);
    });

    // Éxito
    document.getElementById("estado-fetch").className = "estado completado";
    document.getElementById("estado-fetch").textContent =
      "✅ Fetch completado exitosamente";
    document.getElementById("progreso-fetch").style.width = "100%";
    document.getElementById("btn-cancelar-fetch").disabled = true;

    log("✅ Fetch completado: Datos recibidos");
  } catch (error) {
    if (error.name === "AbortError") {
      document.getElementById("estado-fetch").className = "estado cancelado";
      document.getElementById("estado-fetch").textContent =
        "🚫 Fetch cancelado por el usuario";
      log("🚫 Fetch cancelado por el usuario");
    } else {
      document.getElementById("estado-fetch").className = "estado error";
      document.getElementById(
        "estado-fetch"
      ).textContent = `❌ Error: ${error.message}`;
      log(`❌ Error en fetch: ${error.message}`);
    }
    document.getElementById("btn-cancelar-fetch").disabled = true;
  }
}

function cancelarFetch() {
  if (fetchController) {
    fetchController.abort();
    fetchController = null;
  }
}

// ==================== DEMO 2: TIMEOUT ====================
function resetearTimeout() {
  document.getElementById("estado-timeout").className = "estado esperando";
  document.getElementById("estado-timeout").textContent =
    "⏳ Esperando para iniciar timeout...";
  document.getElementById("progreso-timeout").style.width = "0%";
  document.getElementById("btn-cancelar-timeout").disabled = true;

  if (timeoutController) {
    timeoutController.abort();
    timeoutController = null;
  }
}

async function iniciarTimeout() {
  resetearTimeout();

  // Crear nuevo AbortController
  timeoutController = new AbortController();
  const signal = timeoutController.signal;

  // Actualizar UI
  document.getElementById("estado-timeout").className = "estado procesando";
  document.getElementById("estado-timeout").textContent =
    "⏰ Timeout en progreso (5 segundos)...";
  document.getElementById("btn-cancelar-timeout").disabled = false;

  log("⏰ Iniciando timeout de 5 segundos...");

  try {
    // Timeout con AbortController
    await new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Abortado", "AbortError"));
        return;
      }

      const timeoutId = setTimeout(() => {
        resolve("✅ Timeout completado");
      }, 5000);

      // Animación de progreso
      let progreso = 0;
      const intervalo = setInterval(() => {
        if (signal.aborted) {
          clearInterval(intervalo);
          clearTimeout(timeoutId);
          return;
        }

        progreso += 1;
        document.getElementById(
          "progreso-timeout"
        ).style.width = `${progreso}%`;

        if (progreso >= 100) {
          clearInterval(intervalo);
        }
      }, 50);

      // Escuchar cancelación
      signal.addEventListener("abort", () => {
        clearInterval(intervalo);
        clearTimeout(timeoutId);
        reject(new DOMException("Abortado", "AbortError"));
      });
    });

    // Éxito
    document.getElementById("estado-timeout").className = "estado completado";
    document.getElementById("estado-timeout").textContent =
      "✅ Timeout completado";
    document.getElementById("btn-cancelar-timeout").disabled = true;

    log("✅ Timeout completado después de 5 segundos");
  } catch (error) {
    if (error.name === "AbortError") {
      document.getElementById("estado-timeout").className = "estado cancelado";
      document.getElementById("estado-timeout").textContent =
        "🚫 Timeout cancelado";
      log("🚫 Timeout cancelado por el usuario");
    } else {
      document.getElementById("estado-timeout").className = "estado error";
      document.getElementById(
        "estado-timeout"
      ).textContent = `❌ Error: ${error.message}`;
      log(`❌ Error en timeout: ${error.message}`);
    }
    document.getElementById("btn-cancelar-timeout").disabled = true;
  }
}

function cancelarTimeout() {
  if (timeoutController) {
    timeoutController.abort();
    timeoutController = null;
  }
}

// ==================== DEMO 3: MÚLTIPLES DESCARGAS ====================
function agregarDescarga() {
  const id = Date.now().toString();
  const nombre = `Descarga ${Object.keys(descargasActivas).length + 1}`;

  // Crear elemento UI
  const descargaItem = document.createElement("div");
  descargaItem.className = "descarga-item descarga-pendiente";
  descargaItem.id = `descarga-${id}`;
  descargaItem.innerHTML = `
                <span>${nombre}</span>
                <div>
                    <span id="estado-${id}">⏳ Pendiente</span>
                    <button onclick="iniciarDescarga('${id}', '${nombre}')" style="margin-left: 10px;">▶️ Iniciar</button>
                    <button onclick="cancelarDescarga('${id}')" style="margin-left: 5px;">🚫 Cancelar</button>
                </div>
            `;

  document.getElementById("lista-descargas").appendChild(descargaItem);

  // Inicializar en el mapa
  descargasActivas.set(id, {
    controller: null,
    nombre: nombre,
    estado: "pendiente",
  });

  log(`📥 Nueva descarga agregada: ${nombre}`);
}

async function iniciarDescarga(id, nombre) {
  const datos = descargasActivas.get(id);
  if (!datos || datos.estado === "activa") return;

  // Crear controller
  const controller = new AbortController();
  const signal = controller.signal;

  // Actualizar estado
  datos.controller = controller;
  datos.estado = "activa";
  descargasActivas.set(id, datos);

  // Actualizar UI
  const elemento = document.getElementById(`descarga-${id}`);
  elemento.className = "descarga-item descarga-activa";
  document.getElementById(`estado-${id}`).textContent = "🔄 Descargando...";

  log(`🔄 Iniciando descarga: ${nombre}`);

  try {
    // Simular descarga
    await new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("Abortado", "AbortError"));
        return;
      }

      const tiempo = 3000 + Math.random() * 4000; // 3-7 segundos
      const inicio = Date.now();

      const intervalo = setInterval(() => {
        if (signal.aborted) {
          clearInterval(intervalo);
          return;
        }

        const transcurrido = Date.now() - inicio;
        const progreso = Math.min(100, (transcurrido / tiempo) * 100);

        if (progreso >= 100) {
          clearInterval(intervalo);
          resolve();
        }
      }, 100);

      signal.addEventListener("abort", () => {
        clearInterval(intervalo);
        reject(new DOMException("Abortado", "AbortError"));
      });

      setTimeout(() => {
        if (!signal.aborted) {
          clearInterval(intervalo);
          resolve();
        }
      }, tiempo);
    });

    // Éxito
    elemento.className = "descarga-item descarga-completada";
    document.getElementById(`estado-${id}`).textContent = "✅ Completada";
    datos.estado = "completada";
    descargasActivas.set(id, datos);

    log(`✅ Descarga completada: ${nombre}`);
  } catch (error) {
    if (error.name === "AbortError") {
      elemento.className = "descarga-item descarga-cancelada";
      document.getElementById(`estado-${id}`).textContent = "🚫 Cancelada";
      datos.estado = "cancelada";
      descargasActivas.set(id, datos);

      log(`🚫 Descarga cancelada: ${nombre}`);
    }
  }
}

function cancelarDescarga(id) {
  const datos = descargasActivas.get(id);
  if (datos && datos.controller) {
    datos.controller.abort();
    log(`🗑️ Descarga cancelada manualmente: ${datos.nombre}`);
  }
}

function cancelarTodasDescargas() {
  let canceladas = 0;

  descargasActivas.forEach((datos, id) => {
    if (datos.controller && datos.estado === "activa") {
      datos.controller.abort();
      canceladas++;
    }
  });

  log(`🗑️ Canceladas ${canceladas} descargas activas`);
}

// ==================== EJEMPLO AVANZADO ====================
async function ejemploAvanzado() {
  log("\\n🚀 EJEMPLO AVANZADO: Búsqueda en Tiempo Real con Cancelación");

  let busquedaController = null;

  async function buscar(termino) {
    // Cancelar búsqueda anterior si existe
    if (busquedaController) {
      busquedaController.abort();
      log(`🚫 Cancelando búsqueda anterior: "${terminoAnterior}"`);
    }

    // Nueva búsqueda
    busquedaController = new AbortController();
    const signal = busquedaController.signal;

    log(`🔍 Buscando: "${termino}"...`);

    try {
      // Simular búsqueda en API
      await new Promise((resolve, reject) => {
        if (signal.aborted) {
          reject(new DOMException("Abortado", "AbortError"));
          return;
        }

        const tiempo = 800 + Math.random() * 1200;

        signal.addEventListener("abort", () => {
          reject(new DOMException("Abortado", "AbortError"));
        });

        setTimeout(() => {
          if (!signal.aborted) {
            resolve();
          }
        }, tiempo);
      });

      // Simular resultados
      const resultados = [
        `Resultado 1 para "${termino}"`,
        `Resultado 2 para "${termino}"`,
        `Resultado 3 para "${termino}"`,
      ];

      log(
        `✅ Búsqueda completada para "${termino}": ${resultados.length} resultados`
      );
      return resultados;
    } catch (error) {
      if (error.name === "AbortError") {
        log(`🚫 Búsqueda cancelada para: "${termino}"`);
      }
      throw error;
    }
  }

  // Simular usuario escribiendo rápido
  const terminos = ["jav", "javas", "javasc", "javascript"];
  let terminoAnterior = "";

  for (const termino of terminos) {
    terminoAnterior = termino;
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simular delay entre tecleo
    await buscar(termino).catch(() => {}); // Ignorar errores de cancelación
  }

  log("💡 AbortController evita que se muestren resultados obsoletos");
}
```

## 🎯 **Características Clave de AbortController**

### ✅ **Ventajas:**

- **Cancelación precisa:** Cancela exactamente lo que quieres
- **Múltiples operaciones:** Un controller puede cancelar muchas operaciones
- **Reutilizable:** Puedes crear nuevos controllers después de abortar
- **Estándar moderno:** Soporte nativo en navegadores modernos

## 🛠️ **Operaciones que Soportan AbortController**

### **1. Fetch API**

```jsx
// =========================================================
// 🛑 1. Crear un AbortController
// =========================================================

// Creamos una instancia de AbortController.
// Este objeto nos permitirá "controlar" la petición y cancelarla cuando queramos.
const controller = new AbortController();

// =========================================================
// 📡 2. Realizar la petición fetch con signal de cancelación
// =========================================================

// Realizamos una petición fetch al endpoint /api/data.
// Importante: pasamos la opción { signal: controller.signal }.
// Esta "signal" es como un canal de comunicación entre el fetch y el controller,
// que permite interrumpir la operación de red desde fuera.
fetch("/api/data", { signal: controller.signal })
// Si la petición NO fue cancelada, y el servidor responde correctamente,
// convertimos la respuesta en JSON normalmente.
.then((response) => response.json())

// =========================================================
// 🧯 3. Capturar errores, incluido AbortError
// =========================================================
.catch((error) => {
// Cuando abortamos la petición, fetch lanza un error de tipo AbortError.
if ([error.name](http://error.name/) === "AbortError") {
// Detectamos específicamente ese tipo de error
// para no tratarlo como un "fallo real" del servidor o la red.
console.log("Fetch cancelado");
} else {
// Otros errores (de red, servidor, etc.) se pueden manejar aquí también.
console.error("Otro error:", error);
}
});

// =========================================================
// 🧨 4. Cancelar la petición manualmente
// =========================================================

// Al llamar a controller.abort(),
// inmediatamente se:
//   - interrumpe la petición en curso,
//   - se lanza un AbortError en el fetch,
//   - se ejecuta el bloque .catch() de arriba.
controller.abort();

/*Lo que realmente está pasando aquí:

AbortController crea un controlador.

controller.signal se pasa al fetch, vinculando esa petición a este controlador.

Cuando llamas a controller.abort(), la señal emite un “evento de aborto”.

fetch detecta ese evento y rechaza la promesa inmediatamente con un AbortError.

El .catch() intercepta ese error y te permite manejarlo de forma controlada.*/
```

### **2. Promesas Personalizadas**

```jsx
/**
 * 🧭 operacionCancelable(signal)
 * Esta función devuelve una promesa que representa una operación asíncrona
 * que **puede ser cancelada externamente** mediante una señal AbortSignal.
 *
 * @param {AbortSignal} signal - La señal de cancelación asociada a un AbortController
 * @returns {Promise<string>} - Promesa que se resuelve o rechaza según lo que ocurra
 */
function operacionCancelable(signal) {
  return new Promise((resolve, reject) => {
    // =========================================================
    // 🛑 1. Verificar si ya estaba cancelado antes de empezar
    // =========================================================
    // Si alguien llamó a controller.abort() antes de que esta función empezara,
    // signal.aborted será true, por lo que rechazamos inmediatamente.
    if (signal.aborted) {
      // DOMException es el tipo de error que fetch usa internamente
      // cuando se aborta. Usarlo aquí mantiene consistencia.
      reject(new DOMException("Abortado", "AbortError"));
      return; // Importante: detenemos la ejecución para no continuar.
    }

    // =========================================================
    // ⏳ 2. Simular una operación asíncrona
    // =========================================================
    // Aquí usamos setTimeout como ejemplo.
    // Supongamos que nuestra operación tarda 5 segundos en completarse.
    const timeoutId = setTimeout(() => {
      // Si no se cancela, resolvemos la promesa con éxito.
      resolve("Operación completada");
    }, 5000);

    // =========================================================
    // 🧨 3. Escuchar si la operación es cancelada
    // =========================================================
    // Asociamos un listener a la signal.
    // Si alguien llama a controller.abort() en cualquier momento,
    // se ejecutará esta función.
    signal.addEventListener("abort", () => {
      // Cancelamos el timeout, ya que la operación fue abortada.
      clearTimeout(timeoutId);

      // Rechazamos la promesa con un DOMException AbortError,
      // igual que hace fetch al ser cancelado.
      reject(new DOMException("Abortado", "AbortError"));
    });
  });
}

/*Qué está pasando aquí paso a paso:

signal.aborted — Si la señal ya está en estado “abortado” antes de empezar,
rechazamos la promesa al instante para no ejecutar nada innecesario.

Simulamos una operación asíncrona con setTimeout de 5 segundos.
Esto representa cualquier tarea: consulta a base de datos, cálculo costoso, etc.

Escuchamos el evento abort en la señal.
Si alguien llama a controller.abort(), cancelamos el timeout y rechazamos la promesa.
Al igual que en fetch, usamos:
--- reject(new DOMException("Abortado", "AbortError")) ---

Esto nos permite manejar la cancelación de forma consistente en toda la app.*/
```

### **3. Event Listeners**

```jsx
// =======================================================
// 🛑 1. Crear un AbortController
// =======================================================

// Creamos una instancia del AbortController.
// Esta instancia nos permitirá cancelar o "abortar" operaciones asociadas a su señal.
const controller = new AbortController();

// =======================================================
// 🖱️ 2. Agregar un event listener con signal
// =======================================================
// En lugar de añadir un listener tradicional que tendríamos que eliminar manualmente,
// podemos asociarle la signal de nuestro controller.
//
// 👉 Nota importante:
// Desde ECMAScript 2023, addEventListener soporta la opción { signal },
// lo que permite vincular el listener a un AbortController.
element.addEventListener(
  "click",
  () => {
    console.log("Click!");
  },
  { signal: controller.signal } // 👈 Aquí está la clave
);

// =======================================================
// 🧨 3. Remover automáticamente el listener
// =======================================================
// Cuando llamamos a controller.abort(), cualquier listener que
// haya sido agregado con esa signal se eliminará automáticamente,
// igual que si hubiésemos hecho element.removeEventListener(...).
controller.abort();

/*Qué está pasando aquí realmente:

AbortController crea una señal (controller.signal) que podemos vincular a diferentes operaciones.

Al pasar { signal: controller.signal } como tercera opción de addEventListener, estamos diciendo:

“Este event listener debe desaparecer si la signal se aborta”.

Cuando ejecutamos controller.abort():

Se dispara el evento abort en la signal.

Todos los listeners vinculados con esa signal se eliminan automáticamente.

No se ejecuta más el callback asociado a ese evento.

👉 Esto es equivalente a:

element.removeEventListener("click", handler);

…pero más limpio, especialmente cuando tienes múltiples listeners que quieres limpiar de golpe.*/
```

## 🎯 **Casos de Uso Prácticos**

### **1. Búsqueda en Tiempo Real**

```jsx
// =============================================================
// 🧭 BÚSQUEDA EN TIEMPO REAL con AbortController
// =============================================================

// Referencia al input de búsqueda y a un contenedor de resultados
const inputBusqueda = document.getElementById("buscador");
const contenedorResultados = document.getElementById("resultados");

// Variable para almacenar el controlador actual
// De esta manera podremos abortar la petición anterior si el usuario escribe de nuevo
let controllerActual = null;

/**
 * 🧰 función buscarEnAPI(query)
 * Lanza una petición fetch para buscar datos según el texto ingresado.
 * Usa AbortController para cancelar la petición anterior si existe.
 */
async function buscarEnAPI(query) {
  // Si ya existe un controlador anterior, lo abortamos
  // Esto cancela la petición que aún no haya terminado
  if (controllerActual) {
    controllerActual.abort();
  }

  // Creamos un nuevo controlador para esta búsqueda
  controllerActual = new AbortController();
  const signal = controllerActual.signal;

  try {
    // Simulamos una llamada a un endpoint de búsqueda
    // ⚠️ Nota: Aquí podrías poner tu URL real, por ejemplo:
    // `https://miapi.com/search?q=${encodeURIComponent(query)}`
    const response = await fetch(`/api/buscar?q=${encodeURIComponent(query)}`, {
      signal,
    });

    // Si la petición fue abortada, esta línea no se ejecuta
    const datos = await response.json();

    // Mostramos resultados
    mostrarResultados(datos);
  } catch (error) {
    // Si la petición fue abortada, capturamos el AbortError
    if (error.name === "AbortError") {
      console.log(
        "⏳ Petición anterior cancelada (usuario siguió escribiendo)"
      );
    } else {
      console.error("❌ Error en la búsqueda:", error);
    }
  }
}

/**
 * 🧭 mostrarResultados(datos)
 * Limpia el contenedor y pinta la lista de resultados.
 */
function mostrarResultados(datos) {
  contenedorResultados.innerHTML = "";

  if (!datos || datos.length === 0) {
    contenedorResultados.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  const ul = document.createElement("ul");
  datos.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.nombre;
    ul.appendChild(li);
  });
  contenedorResultados.appendChild(ul);
}

/**
 * ⌨️ Evento de input
 * Cada vez que el usuario escribe, lanzamos una nueva búsqueda
 * (y cancelamos la anterior si no ha terminado).
 */
inputBusqueda.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  // Si no hay texto, limpiamos resultados y abortamos búsqueda
  if (query === "") {
    contenedorResultados.innerHTML = "";
    if (controllerActual) controllerActual.abort();
    return;
  }

  buscarEnAPI(query);
});
```

### 🧠 **Explicación del flujo**

1. El usuario escribe en el `input`.
2. Se dispara el evento `input` y se llama a `buscarEnAPI(query)`.
3. Antes de lanzar la nueva búsqueda:
   - si había una anterior en curso → **se cancela** con `controller.abort()`.
4. Se crea un nuevo `AbortController` para la nueva búsqueda.
5. Si la búsqueda anterior termina después de la nueva… **no pasa nada**, porque ya fue cancelada.
6. La UI siempre muestra solo el resultado de **la última búsqueda**.

### 🧪 Simulación de API (opcional)

Si quieres probar este código sin un backend real, puedes simular `/api/buscar` con algo así en tu servidor local o incluso en el mismo front:

```jsx
// Este bloque NO va en producción, solo sirve para simular la respuesta
if (!window.fetchInterceptado) {
  const originalFetch = window.fetch;
  window.fetch = (url, options) => {
    if (url.startsWith("/api/buscar")) {
      const params = new URLSearchParams(url.split("?")[1]);
      const q = params.get("q").toLowerCase();
      return new Promise((resolve) => {
        setTimeout(() => {
          const fakeResults = [
            "Manzana",
            "Mango",
            "Mandarina",
            "Melón",
            "Melocotón",
            "Pera",
            "Piña",
          ]
            .filter((fruta) => fruta.toLowerCase().includes(q))
            .map((nombre) => ({ nombre }));
          resolve(new Response(JSON.stringify(fakeResults), { status: 200 }));
        }, 1000); // simulamos 1 segundo de latencia
      });
    }
    return originalFetch(url, options);
  };
  window.fetchInterceptado = true;
}
```

### 📌 Ventajas de este patrón

- ⚡ **Evita resultados desactualizados**: solo la última búsqueda cuenta.
- 🧼 **Limpio y eficiente**: no necesitas manejar IDs de peticiones ni flags manualmente.
- 🌐 Ideal para autocompletados, buscadores y filtros dinámicos.

👉 **Resumen de la lógica clave:**

```jsx
if (controllerActual) controllerActual.abort(); // Cancela la búsqueda anterior
controllerActual = new AbortController(); // Nuevo controlador para la nueva búsqueda
fetch(url, { signal: controllerActual.signal });
```

### ✅ **¿Cuándo usar AbortController?**

- **Búsquedas en tiempo real:** Cancelar búsquedas anteriores
- **Descargas largas:** Permitir al usuario cancelar
- **Timeouts personalizados:** Que se puedan cancelar
- **Múltiples peticiones:** Cancelar todas de una vez

### ❌ **Limitaciones:**

- **No retrocompatible:** Navegadores antiguos no lo soportan
- **Solo operaciones compatibles:** No funciona con todo
- **Una vez usado:** Un controller no se puede reutilizar después de abort()

### 💡 **Mejores Prácticas:**

- **Verificar `signal.aborted`** antes de empezar operaciones costosas
- **Siempre limpiar recursos** (timeouts, intervals) en el evento abort
- **Usar nuevos controllers** para nuevas operaciones después de cancelar

# 🧩 **¿Qué es el Retry Automático?**

Imagina que intentas llamar por teléfono:

### 📞 **Ejemplo del mundo real:**

- **Sin retry:** Llamas una vez, si no contestan, te rindes
- **Con retry:** Llamas, si no contestan, esperas 5 segundos y vuelves a llamar... hasta 3 veces

### 💻 **Traducción a JavaScript:**

El **retry automático** es un patrón que reintenta una operación fallida automáticamente, usualmente con un delay entre intentos.

## 🔧 **Patrón Básico de Retry**

Este patrón es **muy común y poderoso en entornos reales**, sobre todo cuando trabajas con APIs inestables o servicios externos que pueden fallar de forma intermitente.

```jsx
/**
 * 🔁 conReintentos(operacion, maxReintentos)
 *
 * Ejecuta una operación asíncrona con reintentos automáticos si falla.
 *
 * @param {Function} operacion - Función asíncrona que se ejecutará en cada intento.
 * @param {number} maxReintentos - Número máximo de veces que se intentará (por defecto: 3).
 * @returns {*} El resultado de la operación si finalmente tiene éxito.
 * @throws {Error} Si todos los intentos fallan, lanza un error final.
 */
async function conReintentos(operacion, maxReintentos = 3) {
  // 🔁 Repetimos la operación hasta alcanzar el máximo de reintentos
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      // =============================================================
      // 🧭 1. Mostrar en consola el número de intento actual
      // =============================================================
      // Esto es muy útil para depurar o monitorear cuántos intentos se realizan.
      console.log(`🔄 Intento ${intento} de ${maxReintentos}`);

      // =============================================================
      // 🧭 2. Ejecutar la operación asíncrona
      // =============================================================
      // `operacion` es una función que devuelve una promesa (por ejemplo, un fetch).
      // Si se resuelve correctamente, guardamos el resultado.
      const resultado = await operacion();

      // =============================================================
      // ✅ 3. Si llega aquí, la operación fue exitosa
      // =============================================================
      // Salimos del bucle inmediatamente devolviendo el resultado.
      return resultado;
    } catch (error) {
      // =============================================================
      // ❌ 4. Si ocurre un error, capturamos la excepción
      // =============================================================
      console.log(`❌ Intento ${intento} falló: ${error.message}`);

      // =============================================================
      // 🧨 5. Si es el último intento, relanzamos el error
      // =============================================================
      // Esto asegura que si no hay más reintentos, la función falle de forma controlada.
      if (intento === maxReintentos) {
        throw new Error(`Todos los intentos fallaron: ${error.message}`);
      }

      // =============================================================
      // ⏳ 6. Si aún quedan intentos, esperamos un poco antes de volver a intentar
      // =============================================================
      // Esto evita saturar el servidor con reintentos inmediatos.
      // Aquí aplicamos una espera proporcional al número de intento (backoff lineal).
      const tiempoEspera = 1000 * intento; // ej. 1s, 2s, 3s...
      console.log(
        `⏳ Esperando ${tiempoEspera}ms antes del siguiente intento...`
      );

      // Usamos una pequeña promesa con setTimeout para "pausar" el bucle
      await new Promise((resolve) => setTimeout(resolve, tiempoEspera));
    }
  }
}
```

### 🧠 **Qué hace este patrón paso a paso**:

1. **Ejecuta la operación** asíncrona dentro de un bucle `for`.
2. Si **tiene éxito** → sale del bucle y devuelve el resultado.
3. Si **falla**, captura el error y:
   - si es el **último intento**, lanza el error final;
   - si **quedan intentos**, espera un tiempo y vuelve a intentarlo.
4. El tiempo de espera **crece con cada intento** (1s, 2s, 3s, …) para no saturar al servidor.
5. Si todos los intentos fallan → la función lanza un error.

✅ **Ejemplo práctico: uso con fetch**

```jsx
async function fetchDatos() {
  const respuesta = await fetch("/api/datos");
  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }
  return await respuesta.json();
}

// Llamamos a la función con reintentos
conReintentos(fetchDatos, 3)
  .then((datos) => console.log("✅ Datos recibidos:", datos))
  .catch((err) =>
    console.error("❌ No se pudo completar la operación:", err.message)
  );
```

📌 Si `/api/datos` falla la primera vez pero responde bien en el segundo intento, se completará con éxito.

Si falla las 3 veces, se lanza un error final con un mensaje claro.

🧭 **Variantes comunes que se usan en producción:**

- **Backoff exponencial:** tiempo de espera = `2^(intento - 1) * 1000` ms.
- **Jitter:** agregar una pequeña variación aleatoria para evitar picos de carga simultáneos.
- **AbortController:** para cancelar reintentos si el usuario cierra la vista o se agota un timeout general.
- **Límites dinámicos:** ajustar maxReintentos según la criticidad de la operación.

👉 **Resumen final del patrón de retry**:

| Paso                          | Qué hace                                   |
| ----------------------------- | ------------------------------------------ |
| `try/catch` en un bucle `for` | Reintenta varias veces de forma controlada |
| `await operacion()`           | Ejecuta la tarea asíncrona                 |
| `if (último intento)`         | Lanza error final si no hay éxito          |
| `await setTimeout(...)`       | Espera entre intentos (backoff)            |
| Devuelve resultado            | Si al menos un intento es exitoso          |

## 💻 **Demo Interactivo: Retry Automático en Acción**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Retry Automático - Reintentos Inteligentes</title>
  </head>
  <body>
    <div class="container">
      <h1>🔄 Retry Automático - Reintentos Inteligentes</h1>
      <p>
        <strong>Definición sencilla:</strong> Reintentar automáticamente una
        operación fallida, usualmente con delays entre intentos.
      </p>
      <div class="configuracion">
        <h3>⚙️ Configuración de Reintentos</h3>
        <div class="config-item">
          <label for="maxReintentos">Máx. Reintentos:</label>
          <input type="number" id="maxReintentos" value="3" min="1" max="10" />
        </div>
        <div class="config-item">
          <label for="delayBase">Delay Base (ms):</label>
          <input
            type="number"
            id="delayBase"
            value="1000"
            min="100"
            max="10000"
          />
        </div>
        <div class="config-item">
          <label>Estrategia de Backoff:</label>
          <select id="estrategiaBackoff">
            <option value="lineal">Lineal (constante)</option>
            <option value="exponencial">Exponencial (creciente)</option>
            <option value="fibonacci">Fibonacci (progresivo)</option>
          </select>
        </div>
      </div>
      <!-- DEMO 1: RETRY BÁSICO -->
      <div class="demo-section basico-demo">
        <h2>🔄 Demo 1: Retry Básico</h2>
        <p>
          Reintenta una operación inestable hasta que tenga éxito o se agoten
          los intentos
        </p>
        <div class="progreso">
          <div class="barra-progreso" id="progreso-basico"></div>
        </div>
        <div id="intentos-basico">
          <!-- Los intentos se agregarán aquí dinámicamente -->
        </div>
        <div class="controles">
          <button class="btn-iniciar" onclick="iniciarRetryBasico()">
            🔄 Iniciar Retry Básico
          </button>
          <button class="btn-iniciar" onclick="iniciarRetryConFallos()">
            💥 Probar con Más Fallos
          </button>
        </div>
        <div class="codigo">
          // PATRÓN BÁSICO DE RETRY<br />
          async function conReintentos(operacion, maxReintentos) {<br />
          &nbsp;&nbsp;for (let intento = 1; intento <= maxReintentos; intento++)
          {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;try {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return await operacion();<br />
          &nbsp;&nbsp;&nbsp;&nbsp;} catch (error) {<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (intento === maxReintentos)
          throw error;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;await delay(1000 * intento); //
          Backoff lineal<br />
          &nbsp;&nbsp;&nbsp;&nbsp;}<br />
          &nbsp;&nbsp;}<br />
          }
        </div>
      </div>
      <!-- DEMO 2: RETRY AVANZADO CON ESTRATEGIAS -->
      <div class="demo-section avanzado-demo">
        <h2>🎯 Demo 2: Retry Avanzado con Estrategias</h2>
        <p>Diferentes estrategias de backoff para optimizar los reintentos</p>

        <div class="estadisticas">
          <div class="estadistica">
            <h3>📊 Total de Intentos</h3>
            <div class="tiempo" id="total-intentos">0</div>
          </div>
          <div class="estadistica">
            <h3>⏱️ Tiempo Total</h3>
            <div class="tiempo" id="tiempo-total">0ms</div>
          </div>
          <div class="estadistica">
            <h3>🎯 Resultado</h3>
            <div class="tiempo" id="resultado-final">-</div>
          </div>
        </div>
        <div id="intentos-avanzado">
          <!-- Los intentos avanzados se agregarán aquí -->
        </div>
        <div class="controles">
          <button class="btn-estrategia" onclick="probarTodasEstrategias()">
            🧪 Probar Todas las Estrategias
          </button>
          <button class="btn-api" onclick="ejemploAPIReal()">
            🌐 Ejemplo con API Real
          </button>
        </div>
      </div>
      <!-- DEMO 3: ESTRATEGIAS DE BACKOFF -->
      <div class="demo-section estrategias-demo">
        <h2>📈 Demo 3: Estrategias de Backoff</h2>
        <p>Compara diferentes estrategias de espera entre reintentos</p>
        <div id="comparacion-estrategias">
          <!-- Comparación de estrategias -->
        </div>
        <div class="controles">
          <button class="btn-estrategia" onclick="compararEstrategias()">
            📊 Comparar Estrategias
          </button>
        </div>
      </div>
      <button class="btn-limpiar" onclick="limpiarTodo()">
        🗑️ Limpiar Todo
      </button>
      <h3>📟 Consola de Ejecución:</h3>
      <div class="consola" id="consola"></div>
    </div>
  </body>
</html>
```

```css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.demo-section {
  border: 3px solid;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}
.basico-demo {
  border-color: #007bff;
  background: #f0f8ff;
}
.avanzado-demo {
  border-color: #28a745;
  background: #f0fff4;
}
.estrategias-demo {
  border-color: #6f42c1;
  background: #f8f0ff;
}
.intento {
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 5px solid;
  transition: all 0.3s ease;
}
.pendiente {
  border-left-color: #6c757d;
  background: #f8f9fa;
}
.procesando {
  border-left-color: #007bff;
  background: #e7f3ff;
}
.exito {
  border-left-color: #28a745;
  background: #d4edda;
}
.fallo {
  border-left-color: #dc3545;
  background: #f8d7da;
}
.reintento {
  border-left-color: #ffc107;
  background: #fff3cd;
}
button {
  padding: 12px 20px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.btn-iniciar {
  background: #28a745;
  color: white;
}
.btn-iniciar:hover {
  background: #218838;
}
.btn-iniciar:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
.btn-api {
  background: #007bff;
  color: white;
}
.btn-estrategia {
  background: #6f42c1;
  color: white;
}
.btn-limpiar {
  background: #6c757d;
  color: white;
}
.estadisticas {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}
.estadistica {
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  background: #e9ecef;
}
.exito-estadistica {
  background: #d4edda;
  border: 2px solid #28a745;
}
.fallo-estadistica {
  background: #f8d7da;
  border: 2px solid #dc3545;
}
.progreso {
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  margin: 15px 0;
  overflow: hidden;
}
.barra-progreso {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00ff88);
  transition: width 0.3s ease;
  width: 0%;
}
.controles {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
}
.configuracion {
  background: #fff3cd;
  padding: 15px;
  border-radius: 5px;
  margin: 15px 0;
}
.config-item {
  margin: 10px 0;
}
label {
  display: inline-block;
  width: 150px;
  font-weight: bold;
}
input[type="number"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 80px;
}
.codigo {
  background: #2d2d2d;
  color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
}
.consola {
  background: #2d2d2d;
  color: #00ff00;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  margin: 15px 0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}
.estrategia-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}
.backoff-lineal {
  background: #007bff;
  color: white;
}
.backoff-exponencial {
  background: #28a745;
  color: white;
}
.backoff-fibonacci {
  background: #6f42c1;
  color: white;
}
```

```jsx
// Elementos del DOM
const consola = document.getElementById("consola");

// Estado global
let ejecucionEnCurso = false;

function log(mensaje) {
  consola.innerHTML += `<div>${mensaje}</div>`;
  consola.scrollTop = consola.scrollHeight;
}

function limpiarTodo() {
  consola.innerHTML = "";
  document.getElementById("intentos-basico").innerHTML = "";
  document.getElementById("intentos-avanzado").innerHTML = "";
  document.getElementById("comparacion-estrategias").innerHTML = "";
  document.getElementById("progreso-basico").style.width = "0%";
  resetearEstadisticas();
  ejecucionEnCurso = false;
}

function resetearEstadisticas() {
  document.getElementById("total-intentos").textContent = "0";
  document.getElementById("tiempo-total").textContent = "0ms";
  document.getElementById("resultado-final").textContent = "-";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ==================== DEMO 1: RETRY BÁSICO ====================
function crearOperacionInestable(
  probabilidadExito = 0.3,
  nombre = "Operación"
) {
  return async function () {
    await delay(500 + Math.random() * 500); // Simular trabajo

    if (Math.random() < probabilidadExito) {
      return `✅ ${nombre} exitosa`;
    } else {
      throw new Error(`❌ ${nombre} falló temporalmente`);
    }
  };
}

function agregarIntentoBasico(intento, estado, mensaje) {
  const div = document.createElement("div");
  div.className = `intento ${estado}`;
  div.innerHTML = `
                <strong>Intento ${intento}:</strong> ${mensaje}
            `;
  document.getElementById("intentos-basico").appendChild(div);
}

async function iniciarRetryBasico() {
  if (ejecucionEnCurso) return;
  ejecucionEnCurso = true;

  document.getElementById("intentos-basico").innerHTML = "";
  document.getElementById("progreso-basico").style.width = "0%";

  const maxReintentos = parseInt(
    document.getElementById("maxReintentos").value
  );
  const delayBase = parseInt(document.getElementById("delayBase").value);
  const estrategia = document.getElementById("estrategiaBackoff").value;

  log(`🔄 INICIANDO RETRY BÁSICO (${maxReintentos} intentos máx)`);

  const operacion = crearOperacionInestable(0.3, "Tarea básica");

  try {
    const resultado = await conReintentos(
      operacion,
      maxReintentos,
      delayBase,
      estrategia,
      (intento, estado, mensaje) => {
        agregarIntentoBasico(intento, estado, mensaje);
        document.getElementById("progreso-basico").style.width = `${
          (intento / maxReintentos) * 100
        }%`;
      }
    );

    log(`🎉 ${resultado} después de varios intentos`);
  } catch (error) {
    log(`💥 ${error.message}`);
  }

  ejecucionEnCurso = false;
}

async function iniciarRetryConFallos() {
  if (ejecucionEnCurso) return;

  document.getElementById("intentos-basico").innerHTML = "";
  document.getElementById("progreso-basico").style.width = "0%";

  const maxReintentos = 3;
  const operacion = crearOperacionInestable(0.1, "Tarea muy inestable"); // Solo 10% de éxito

  log(`💥 PROBANDO CON OPERACIÓN MUY INESTABLE (10% éxito)`);

  try {
    const resultado = await conReintentos(
      operacion,
      maxReintentos,
      1000,
      "lineal",
      (intento, estado, mensaje) => {
        agregarIntentoBasico(intento, estado, mensaje);
        document.getElementById("progreso-basico").style.width = `${
          (intento / maxReintentos) * 100
        }%`;
      }
    );

    log(`🎉 ¡Milagro! ${resultado}`);
  } catch (error) {
    log(`💥 Como esperábamos: ${error.message}`);
  }
}

// ==================== FUNCIÓN PRINCIPAL DE RETRY ====================
async function conReintentos(
  operacion,
  maxReintentos,
  delayBase = 1000,
  estrategia = "lineal",
  callbackProgreso = null
) {
  let ultimoError = null;
  const inicioTotal = Date.now();
  let totalIntentos = 0;

  for (let intento = 1; intento <= maxReintentos; intento++) {
    totalIntentos++;

    if (callbackProgreso) {
      callbackProgreso(intento, "procesando", "🔄 Ejecutando...");
    }

    log(`📝 Intento ${intento}/${maxReintentos}...`);

    try {
      const resultado = await operacion();

      if (callbackProgreso) {
        callbackProgreso(intento, "exito", resultado);
      }

      const tiempoTotal = Date.now() - inicioTotal;
      log(`✅ ¡Éxito en el intento ${intento}! Tiempo total: ${tiempoTotal}ms`);

      return resultado;
    } catch (error) {
      ultimoError = error;

      if (callbackProgreso) {
        callbackProgreso(intento, "fallo", error.message);
      }

      log(`❌ Intento ${intento} falló: ${error.message}`);

      // Si es el último intento, salimos
      if (intento === maxReintentos) {
        const tiempoTotal = Date.now() - inicioTotal;
        log(
          `💥 Todos los ${maxReintentos} intentos fallaron. Tiempo total: ${tiempoTotal}ms`
        );
        throw new Error(
          `Todos los ${maxReintentos} intentos fallaron. Último error: ${error.message}`
        );
      }

      // Calcular delay según estrategia
      const delayMs = calcularDelay(estrategia, intento, delayBase);
      log(
        `⏳ Esperando ${delayMs}ms antes del siguiente intento (${estrategia})...`
      );

      if (callbackProgreso) {
        callbackProgreso(intento, "reintento", `⏳ Esperando ${delayMs}ms...`);
      }

      await delay(delayMs);
    }
  }

  throw ultimoError;
}

function calcularDelay(estrategia, intento, delayBase) {
  switch (estrategia) {
    case "lineal":
      return delayBase * intento; // 1000, 2000, 3000...

    case "exponencial":
      return delayBase * Math.pow(2, intento - 1); // 1000, 2000, 4000, 8000...

    case "fibonacci":
      const fib = [1, 1, 2, 3, 5, 8, 13, 21];
      return delayBase * (fib[intento - 1] || 21); // 1000, 1000, 2000, 3000, 5000...

    default:
      return delayBase;
  }
}

// ==================== DEMO 2: RETRY AVANZADO ====================
function agregarIntentoAvanzado(
  intento,
  estrategia,
  estado,
  mensaje,
  tiempo = ""
) {
  const div = document.createElement("div");
  div.className = `intento ${estado}`;
  div.innerHTML = `
                <strong>Intento ${intento}</strong>
                <span class="estrategia-badge backoff-${estrategia}">${estrategia}</span>
                <span style="float: right;">${tiempo}</span>
                <br>${mensaje}
            `;
  document.getElementById("intentos-avanzado").appendChild(div);
}

async function probarTodasEstrategias() {
  if (ejecucionEnCurso) return;
  ejecucionEnCurso = true;

  document.getElementById("intentos-avanzado").innerHTML = "";
  resetearEstadisticas();

  const estrategias = ["lineal", "exponencial", "fibonacci"];
  const operacion = crearOperacionInestable(0.4, "Tarea avanzada");

  log("🧪 PROBANDO TODAS LAS ESTRATEGIAS DE BACKOFF");

  for (const estrategia of estrategias) {
    log(`\\n📊 Probando estrategia: ${estrategia.toUpperCase()}`);

    try {
      const inicio = Date.now();
      const resultado = await conReintentos(
        operacion,
        4,
        1000,
        estrategia,
        (intento, estado, mensaje) => {
          const tiempoTranscurrido = Date.now() - inicio;
          agregarIntentoAvanzado(
            intento,
            estrategia,
            estado,
            mensaje,
            `${tiempoTranscurrido}ms`
          );
        }
      );

      const tiempoTotal = Date.now() - inicio;
      log(`✅ ${estrategia}: ${resultado} en ${tiempoTotal}ms`);
    } catch (error) {
      log(`❌ ${estrategia}: ${error.message}`);
    }

    await delay(1000); // Pausa entre estrategias
  }

  ejecucionEnCurso = false;
}

// ==================== DEMO 3: COMPARACIÓN DE ESTRATEGIAS ====================
async function compararEstrategias() {
  document.getElementById("comparacion-estrategias").innerHTML = "";

  const estrategias = [
    { nombre: "lineal", desc: "Lineal (constante)" },
    { nombre: "exponencial", desc: "Exponencial (creciente)" },
    { nombre: "fibonacci", desc: "Fibonacci (progresivo)" },
  ];

  log("\\n📈 COMPARANDO ESTRATEGIAS DE BACKOFF");

  for (const estrategia of estrategias) {
    const div = document.createElement("div");
    div.className = "intento pendiente";
    div.innerHTML = `
                    <h4>${estrategia.desc}</h4>
                    <div id="detalles-${estrategia.nombre}">Calculando...</div>
                `;
    document.getElementById("comparacion-estrategias").appendChild(div);

    // Simular delays para esta estrategia
    let detalles = "";
    let tiempoAcumulado = 0;

    for (let intento = 1; intento <= 5; intento++) {
      const delayMs = calcularDelay(estrategia.nombre, intento, 1000);
      tiempoAcumulado += delayMs;
      detalles += `Intento ${intento}: ${delayMs}ms (Total: ${tiempoAcumulado}ms)<br>`;
    }

    document.getElementById(`detalles-${estrategia.nombre}`).innerHTML =
      detalles;
    log(`📊 ${estrategia.desc}: ${detalles.replace(/<br>/g, " | ")}`);
  }
}

// ==================== EJEMPLO CON API REAL ====================
async function ejemploAPIReal() {
  log("\\n🌐 EJEMPLO CON API REAL (simulado)");

  // Simular una API que a veces falla
  async function llamarAPI(endpoint) {
    await delay(300 + Math.random() * 700); // Simular latencia de red

    // Simular diferentes tasas de error según el endpoint
    const tasasError = {
      "/api/usuarios": 0.2, // 20% de error
      "/api/posts": 0.4, // 40% de error
      "/api/comentarios": 0.6, // 60% de error
    };

    const tasaError = tasasError[endpoint] || 0.3;

    if (Math.random() < tasaError) {
      throw new Error(
        `API ${endpoint} no disponible (${
          Math.random() < 0.5 ? "Timeout" : "Error 500"
        })`
      );
    }

    return `✅ Datos de ${endpoint} recibidos`;
  }

  const endpoints = ["/api/usuarios", "/api/posts", "/api/comentarios"];

  for (const endpoint of endpoints) {
    log(`\\n🔗 Llamando a ${endpoint}...`);

    try {
      const resultado = await conReintentos(
        () => llamarAPI(endpoint),
        3,
        1000,
        "exponencial"
      );

      log(resultado);
    } catch (error) {
      log(`💥 No se pudo conectar a ${endpoint}: ${error.message}`);
    }
  }

  log(
    "\\n💡 En una app real, esto evita que errores temporales afecten al usuario"
  );
}

// ==================== EJEMPLO AVANZADO: RETRY CON CIRCUIT BREAKER ====================
function crearRetryAvanzado() {
  log("\\n🛡️ EJEMPLO AVANZADO: Retry con Circuit Breaker");

  class RetryAvanzado {
    constructor(maxReintentos = 3, delayBase = 1000) {
      this.maxReintentos = maxReintentos;
      this.delayBase = delayBase;
      this.estadisticas = {
        exitos: 0,
        fallos: 0,
        reintentos: 0,
      };
    }

    async ejecutar(operacion, contexto = "Operación") {
      for (let intento = 1; intento <= this.maxReintentos; intento++) {
        try {
          log(`🔧 ${contexto} - Intento ${intento}/${this.maxReintentos}`);
          const resultado = await operacion();

          this.estadisticas.exitos++;
          log(`✅ ${contexto} exitosa en intento ${intento}`);

          return resultado;
        } catch (error) {
          this.estadisticas.fallos++;
          this.estadisticas.reintentos++;

          log(`❌ ${contexto} falló en intento ${intento}: ${error.message}`);

          if (intento === this.maxReintentos) {
            log(`💥 ${contexto}: Todos los intentos fallaron`);
            throw error;
          }

          // Backoff exponencial con jitter (aleatoriedad)
          const delay = this.calcularDelayConJitter(intento);
          log(`⏳ ${contexto}: Esperando ${delay}ms antes del reintento...`);

          await delay(delay);
        }
      }
    }

    calcularDelayConJitter(intento) {
      const baseDelay = this.delayBase * Math.pow(2, intento - 1);
      const jitter = baseDelay * 0.2 * Math.random(); // ±20% de aleatoriedad
      return baseDelay + jitter;
    }

    obtenerEstadisticas() {
      return this.estadisticas;
    }
  }

  // Ejemplo de uso
  const retryAvanzado = new RetryAvanzado(4, 800);
  const operacionCritica = crearOperacionInestable(0.25, "Operación crítica");

  retryAvanzado
    .ejecutar(operacionCritica, "Tarea importante")
    .then((resultado) => {
      log(`🎉 ${resultado}`);
      const stats = retryAvanzado.obtenerEstadisticas();
      log(`📊 Estadísticas: ${JSON.stringify(stats)}`);
    })
    .catch((error) => {
      log(`💥 Error final: ${error.message}`);
    });
}

// Ejecutar ejemplo avanzado después de un tiempo
setTimeout(crearRetryAvanzado, 3000);
```

## 🎯 **Estrategias de Backoff (Espera entre Reintentos)**

### **1. Backoff Lineal**

```jsx
// Tiempo de espera constante: 1s, 2s, 3s...
function calcularDelayLineal(intento, delayBase) {
  return delayBase * intento;
}
```

### **2. Backoff Exponencial**

```jsx
// Tiempo se duplica: 1s, 2s, 4s, 8s...
function calcularDelayExponencial(intento, delayBase) {
  return delayBase * Math.pow(2, intento - 1);
}
```

### **3. Backoff Fibonacci**

```jsx
// Secuencia Fibonacci: 1s, 1s, 2s, 3s, 5s...
function calcularDelayFibonacci(intento, delayBase) {
  const fib = [1, 1, 2, 3, 5, 8, 13, 21];
  return delayBase * (fib[intento - 1] || 21);
}
```

### **4. Backoff con Jitter (Aleatoriedad)**

```jsx
// Agrega aleatoriedad para evitar sincronización
function calcularDelayConJitter(intento, delayBase) {
  const baseDelay = delayBase * Math.pow(2, intento - 1);
  const jitter = baseDelay * 0.2 * Math.random(); // ±20%
  return baseDelay + jitter;
}
```

## 🔧 **Patrón Avanzado: Retry con Circuit Breaker**

```jsx
/**
 * ⚡ RetryAvanzado
 * Clase que implementa un sistema de:
 *   - 🔁 Reintentos automáticos de operaciones asíncronas.
 *   - 🧠 Circuit Breaker (disyuntor) para evitar sobrecargar servicios que fallan.
 *
 * Estados posibles del circuito:
 *   - CLOSED: Todo funciona normalmente.
 *   - OPEN: No se permiten nuevas operaciones por un tiempo.
 *   - HALF_OPEN: Después de un periodo de espera, se permite un intento de prueba.
 */
class RetryAvanzado {
  constructor(maxReintentos = 3, delayBase = 1000) {
    // Número máximo de intentos antes de rendirse
    this.maxReintentos = maxReintentos;

    // Tiempo base de espera entre reintentos (en milisegundos)
    // Este delay puede escalar con cada intento.
    this.delayBase = delayBase;

    // Estado del circuito:
    // CLOSED = normal, OPEN = bloqueado, HALF_OPEN = en prueba
    this.circuitState = "CLOSED"; // OPEN, HALF_OPEN, CLOSED
  }

  /**
   * 🚀 ejecutar(operacion)
   * Ejecuta una operación asíncrona con:
   * - Reintentos automáticos en caso de fallo
   * - Protección con circuit breaker
   */
  async ejecutar(operacion) {
    // ===========================================================
    // 🧱 1. Comprobar si el circuito está "abierto"
    // ===========================================================
    // Si el circuito está abierto, significa que recientemente fallaron muchas operaciones
    // y no queremos seguir golpeando el servicio.
    if (this.circuitState === "OPEN") {
      throw new Error("Circuit breaker abierto - no se permiten operaciones");
    }

    // ===========================================================
    // 🔁 2. Intentar ejecutar la operación varias veces
    // ===========================================================
    for (let intento = 1; intento <= this.maxReintentos; intento++) {
      try {
        // Ejecutamos la operación asíncrona (por ejemplo, un fetch a una API externa)
        const resultado = await operacion();

        // Si tiene éxito, registramos ese éxito en el circuito
        this.registrarExito();

        // Y devolvemos el resultado al llamador
        return resultado;
      } catch (error) {
        // ===========================================================
        // 🧨 3. Si ocurre un error, evaluamos si debemos abrir el circuito
        // ===========================================================
        if (this.debeAbirCircuitBreaker(error)) {
          // Cambiamos el estado a OPEN (no se aceptarán más operaciones temporalmente)
          this.circuitState = "OPEN";

          // ⚠️ Muy importante:
          // Programamos un temporizador para cambiar el estado a HALF_OPEN
          // después de 30 segundos. Esto permite reintentar más adelante.
          setTimeout(() => (this.circuitState = "HALF_OPEN"), 30000);
        }

        // ===========================================================
        // ⛔ 4. Si ya es el último intento, relanzamos el error
        // ===========================================================
        if (intento === this.maxReintentos) throw error;

        // ===========================================================
        // ⏳ 5. Si no es el último intento, esperamos un tiempo antes de reintentar
        // ===========================================================
        await this.calcularDelay(intento);
      }
    }
  }

  /**
   * 🧠 debeAbirCircuitBreaker(error)
   * Determina si un error es lo suficientemente crítico para abrir el circuito.
   * Por ejemplo: errores 500 del servidor o timeouts.
   */
  debeAbirCircuitBreaker(error) {
    // Podrías usar aquí cualquier lógica más compleja (contador de errores, métricas, etc.)
    return error.message.includes("500") || error.message.includes("Timeout");
  }

  /**
   * 🟢 registrarExito()
   * Si el circuito estaba en estado HALF_OPEN (modo prueba) y una operación tiene éxito,
   * significa que el servicio volvió a funcionar correctamente.
   * Por lo tanto, cerramos el circuito y retomamos el flujo normal.
   */
  registrarExito() {
    if (this.circuitState === "HALF_OPEN") {
      this.circuitState = "CLOSED";
    }
  }

  /**
   * 🕒 calcularDelay(intento)
   * Calcula un tiempo de espera antes del próximo intento.
   * Aquí podrías aplicar un “backoff exponencial” si lo deseas.
   */
  async calcularDelay(intento) {
    const delay = this.delayBase * intento; // ej. 1000ms, 2000ms, 3000ms…
    console.log(`⏳ Reintentando en ${delay}ms...`);
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}

/*Cómo funciona este patrón en la práctica

🔁 Reintentos:
Si la operación falla, el sistema la vuelve a intentar hasta maxReintentos.

🧱 Circuit breaker:

Si los errores indican un problema crítico (p. ej. HTTP 500 o timeout),
se “abre el circuito” → no se aceptan nuevas peticiones por un tiempo.

Tras un tiempo de enfriamiento (30 segundos en este ejemplo), el estado cambia a HALF_OPEN.
En ese estado, se permite una petición de prueba.

Si la prueba sale bien → se cierra el circuito (CLOSED) y todo vuelve a la normalidad.

⏳ Backoff progresivo:
Cada intento espera más tiempo que el anterior antes de reintentar.*/
```

## 🎯 **Casos de Uso Prácticos**

### **1. Peticiones HTTP con Fetch**

Este código es un patrón muy usado en producción para **hacer peticiones `fetch` con reintentos automáticos**, especialmente útil cuando una API externa puede fallar momentáneamente.

```jsx
/**
 * 🌐 fetchConReintentos(url, options, maxReintentos)
 *
 * Realiza una petición fetch y, si falla, la vuelve a intentar varias veces
 * con un tiempo de espera creciente entre cada intento.
 *
 * @param {string} url - URL de la API o recurso a obtener.
 * @param {object} options - Opciones para fetch (headers, method, body, etc.).
 * @param {number} maxReintentos - Número máximo de reintentos permitidos (por defecto: 3).
 * @returns {Promise<any>} - Devuelve la respuesta parseada como JSON si tiene éxito.
 * @throws {Error} - Si todos los intentos fallan, lanza el último error capturado.
 */
async function fetchConReintentos(url, options = {}, maxReintentos = 3) {
  // =========================================================
  // 🔁 Bucle de reintentos
  // =========================================================
  // Intentamos la operación hasta que:
  // - tenga éxito, o
  // - se alcancen los maxReintentos.
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      // =========================================================
      // 📡 1. Realizamos la petición fetch
      // =========================================================
      const response = await fetch(url, options);

      // =========================================================
      // 🧾 2. Verificamos si la respuesta fue exitosa
      // =========================================================
      // Si el código HTTP no está en el rango 200–299 (por ejemplo, 500 o 404),
      // generamos un error manual para forzar el retry.
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // =========================================================
      // ✅ 3. Si todo salió bien, parseamos la respuesta como JSON
      // =========================================================
      // Y devolvemos el resultado al llamador (rompiendo el bucle).
      return await response.json();
    } catch (error) {
      // =========================================================
      // ❌ 4. Si ocurre un error (de red o HTTP no OK), lo manejamos aquí
      // =========================================================
      console.error(`❌ Error en intento ${intento}:`, error.message);

      // =========================================================
      // ⛔ 5. Si fue el último intento permitido, relanzamos el error
      // =========================================================
      // Esto permite que el llamador maneje el fallo final.
      if (intento === maxReintentos) throw error;

      // =========================================================
      // ⏳ 6. Si no es el último intento, esperamos antes de reintentar
      // =========================================================
      // La espera aumenta proporcionalmente al número de intento
      // (backoff lineal): 1s, 2s, 3s...
      const tiempoEspera = 1000 * intento;
      console.log(`⏳ Reintentando en ${tiempoEspera / 1000}s...`);

      await new Promise((resolve) => setTimeout(resolve, tiempoEspera));
    }
  }
}
```

### 🧠 **Qué hace este patrón paso a paso**

1. Intenta hacer un `fetch`.
2. Si la respuesta es exitosa (`response.ok === true`), devuelve los datos y termina.
3. Si la respuesta es un error HTTP (por ejemplo, 500 o 404) o hay un error de red, lanza una excepción.
4. Si **no es el último intento**, espera un tiempo antes de reintentar (1s, luego 2s, luego 3s…).
5. Si **se alcanza el máximo de reintentos**, lanza el último error para que sea manejado por quien llama a la función.

✅ **Ejemplo de uso real:**

```jsx
fetchConReintentos("https://api.ejemplo.com/datos", {}, 3)
  .then((data) => {
    console.log("✅ Datos recibidos:", data);
  })
  .catch((error) => {
    console.error("❌ No se pudo completar la operación:", error.message);
  });
```

### 🧰 Mejores prácticas comunes que podrías agregar:

- **Backoff exponencial**: en vez de `1000 * intento`, usar `1000 * (2 ** (intento - 1))` para esperar más en cada fallo.
- **AbortController**: para poder cancelar todos los reintentos si el usuario sale de la página o cancela la operación.
- **Tipos de error**: diferenciar entre errores recuperables (ej. timeout) y no recuperables (ej. 404), y reintentar solo en los primeros.

👉 **Resumen del patrón:**

| Paso                      | Acción                                                               |
| ------------------------- | -------------------------------------------------------------------- |
| Intentar fetch            | Hace la llamada a la API                                             |
| Verificar `response.ok`   | Lanza error si la respuesta no es exitosa                            |
| Manejar error             | Muestra el error y decide si reintenta                               |
| Espera progresiva         | Aumenta el tiempo entre cada reintento                               |
| Error final si todo falla | Permite al código que llama decidir cómo manejar el fallo definitivo |

### **2. Conexiones de Base de Datos**

Este patrón es **muy utilizado en entornos backend reales** cuando necesitas asegurar que tu app pueda **recuperarse automáticamente de errores temporales de conexión** a la base de datos (por ejemplo, cuando el servidor de BD tarda en levantar, hay problemas de red, etc.).

```jsx
/**
 * 🧠 conectarBDConReintentos(config, maxReintentos)
 *
 * Intenta establecer una conexión a la base de datos varias veces.
 * Si falla, espera un tiempo creciente entre cada intento.
 * Si todos los intentos fallan, lanza un error final.
 *
 * @param {object} config - Configuración de conexión (host, puerto, usuario, etc.)
 * @param {number} maxReintentos - Número máximo de intentos (por defecto: 5)
 * @returns {Promise<object>} - Objeto de conexión si tiene éxito
 * @throws {Error} - Si no logra conectarse tras todos los intentos
 */
async function conectarBDConReintentos(config, maxReintentos = 5) {
  // ============================================================
  // 🔁 Bucle de reintentos
  // ============================================================
  // Se repetirá la operación de conexión hasta que:
  //  1. Sea exitosa (devuelve la conexión)
  //  2. Se alcancen los maxReintentos → lanza un error
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      // ============================================================
      // 🛰️ 1. Intentar conectar a la base de datos
      // ============================================================
      // `database.connect()` es una función asíncrona que intenta
      // establecer la conexión usando la configuración pasada.
      const conexion = await database.connect(config);

      // ============================================================
      // ✅ 2. Si llegamos aquí, la conexión fue exitosa
      // ============================================================
      console.log(`✅ Conexión a BD exitosa en intento ${intento}`);
      return conexion; // Terminamos la función aquí.
    } catch (error) {
      // ============================================================
      // ❌ 3. Si ocurre un error, lo informamos
      // ============================================================
      console.log(`❌ Intento ${intento} falló: ${error.message}`);

      // ============================================================
      // ⛔ 4. Si fue el último intento, lanzamos un error definitivo
      // ============================================================
      if (intento === maxReintentos) {
        throw new Error(
          `No se pudo conectar a la BD después de ${maxReintentos} intentos`
        );
      }

      // ============================================================
      // ⏳ 5. Si aún quedan intentos, esperamos antes de reintentar
      // ============================================================
      // La espera se incrementa con cada intento:
      // intento 1 → 2s, intento 2 → 4s, intento 3 → 6s, ...
      const tiempoEspera = 2000 * intento;
      console.log(`⏳ Reintentando en ${tiempoEspera / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, tiempoEspera));
    }
  }
}
```

### 🧠 **Cómo funciona este patrón**

1. Intenta **conectarse a la base de datos**.
2. Si la conexión falla, imprime el error y espera un tiempo antes de volver a intentar.
3. Cada intento **aumenta el tiempo de espera** (en este ejemplo: 2s, 4s, 6s...).
4. Si logra conectarse, devuelve el objeto de conexión inmediatamente.
5. Si no logra conectarse tras `maxReintentos`, lanza un error final para que la app lo maneje (por ejemplo, mostrando un mensaje de error crítico o reiniciando el servicio).

✅ **Ejemplo de uso típico en un servidor Node.js**:

```jsx
const configBD = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "miapp",
};

(async () => {
  try {
    const conexion = await conectarBDConReintentos(configBD, 5);
    console.log("🚀 Servidor listo con conexión a BD");
    // Aquí podrías iniciar tu app Express, por ejemplo
  } catch (error) {
    console.error("❌ No se pudo iniciar la app:", error.message);
    process.exit(1); // Salir del proceso si la conexión es crítica
  }
})();
```

### 📌 **Ventajas prácticas de este patrón**

- 🧱 **Evita fallos inmediatos** si la BD tarda en iniciar (por ejemplo, en despliegues con Docker o Kubernetes).
- 🔁 **Permite recuperación automática** sin reiniciar manualmente la app.
- 🧭 **Reduce errores falsos negativos** por cortes temporales de red.
- 📊 Facilita logging y monitoreo de fallos intermitentes.

👉 **Variaciones comunes que podrías implementar**:

- ⏳ **Backoff exponencial** (ej. `2 ** intento * 1000` en lugar de lineal).
- 🧠 **Circuit breaker**: si la BD falla demasiado, suspender intentos por un tiempo.
- 🛑 **AbortController**: cancelar reintentos si se recibe una señal externa.
- 🕵️ **Logging estructurado**: para enviar estos eventos a herramientas de observabilidad (Prometheus, Grafana, etc.).

📌 **Resumen del patrón `conectarBDConReintentos`:**

| Paso                        | Acción                                                |
| --------------------------- | ----------------------------------------------------- |
| `database.connect()`        | Intenta conectarse a la base de datos                 |
| `try/catch` con bucle `for` | Controla los intentos y captura errores               |
| Delay entre intentos        | Evita reintentar demasiado rápido                     |
| Lanza error final           | Si no logra conectarse después del máximo de intentos |
| Mejora la resiliencia       | La app no cae por pequeños fallos temporales          |

### **3. Procesamiento de Archivos**

Este patrón es útil cuando un archivo **puede no estar disponible inmediatamente**, por ejemplo:

- Cuando otro proceso lo está creando,
- Cuando se genera de forma asíncrona (logs, exportaciones, backups),
- O cuando trabajas con sistemas de archivos distribuidos.

```jsx
/**
 * 📂 procesarArchivoConReintentos(rutaArchivo, maxReintentos)
 *
 * Intenta leer un archivo varias veces, esperando entre intentos si no existe aún.
 * Ideal para casos en que el archivo se genera asíncronamente y puede tardar un poco en aparecer.
 *
 * @param {string} rutaArchivo - Ruta completa al archivo que se quiere leer.
 * @param {number} maxReintentos - Número máximo de intentos de lectura (por defecto: 3).
 * @returns {Promise<object>} - El contenido del archivo parseado como JSON.
 * @throws {Error} - Si el archivo no existe después de todos los reintentos o hay otro error.
 */
async function procesarArchivoConReintentos(rutaArchivo, maxReintentos = 3) {
  // ============================================================
  // 🔁 1. Bucle de reintentos
  // ============================================================
  // Intentamos leer el archivo varias veces.
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      // ============================================================
      // 📖 2. Intentar leer el archivo
      // ============================================================
      // Usamos fs.promises.readFile (versión asíncrona basada en Promesas)
      // para leer el contenido en formato UTF-8.
      const contenido = await fs.promises.readFile(rutaArchivo, "utf8");

      // ============================================================
      // 🧾 3. Parsear el contenido como JSON
      // ============================================================
      // Si la lectura fue exitosa, intentamos convertir el contenido
      // en un objeto JavaScript (por ejemplo, si es un archivo de configuración).
      return JSON.parse(contenido);
    } catch (error) {
      // ============================================================
      // ❌ 4. Si ocurre un error, lo analizamos
      // ============================================================

      // Caso especial: el archivo no existe todavía (ENOENT)
      // 👉 Esto puede pasar si otro proceso está escribiendo el archivo.
      if (error.code === "ENOENT" && intento < maxReintentos) {
        console.log(
          `⚠️ Archivo no encontrado. Intento ${intento} de ${maxReintentos}. ` +
            `Esperando 500ms antes de reintentar...`
        );

        // Esperamos medio segundo antes de volver a intentar
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Usamos `continue` para pasar al siguiente intento
        continue;
      }

      // Si no es un error ENOENT o es el último intento → lanzar error final
      if (intento === maxReintentos) {
        console.error("❌ No se pudo procesar el archivo:", error.message);
        throw error;
      }
    }
  }
}
```

### 🧠 **Qué hace esta función paso a paso**

1. Usa un bucle `for` para controlar la cantidad de reintentos.
2. Intenta leer el archivo con `fs.promises.readFile`.
3. Si la lectura tiene éxito, **devuelve el contenido parseado como JSON**.
4. Si falla con código `ENOENT` (archivo no encontrado):
   - Espera 500 ms.
   - Vuelve a intentar.
5. Si se agotan los intentos o el error es de otro tipo, **lanza el error** para que lo maneje el llamador.

✅ **Ejemplo de uso típico**:

```jsx
import fs from "fs";

(async () => {
  try {
    const datos = await procesarArchivoConReintentos("./tmp/salida.json", 5);
    console.log("✅ Archivo leído correctamente:", datos);
  } catch (error) {
    console.error("❌ No se pudo leer el archivo:", error.message);
  }
})();
```

### 📌 **Ventajas prácticas de este patrón**:

- ⏳ Permite **esperar archivos que aún están en proceso de escritura**.
- 🔁 Mejora la **resiliencia** de scripts automáticos y pipelines.
- 🧠 Evita errores falsos negativos por pequeños retrasos de disco/red.
- 🧾 Es perfecto para logs, reportes o exportaciones en sistemas asíncronos.

👉 **Posibles mejoras reales** que podrías añadir:

- **Tiempo de espera configurable** (en vez de fijo en 500 ms).
- **Backoff exponencial** (por ejemplo, 500 ms, luego 1 s, luego 2 s…).
- **Límites por tipo de error** (por ejemplo, no reintentar si el error es de permisos `EACCES`).
- **Logging estructurado** para observabilidad en producción.

📊 **Resumen del patrón de lectura con reintentos**

| Paso                      | Acción                                             |
| ------------------------- | -------------------------------------------------- |
| `readFile`                | Intenta leer el archivo                            |
| `catch` con código ENOENT | Detecta si no existe → espera y vuelve a intentar  |
| `maxReintentos`           | Lanza error si falla después de varios intentos    |
| JSON.parse()              | Devuelve el contenido como objeto si fue exitoso   |
| Mejora la resiliencia     | Evita errores por archivos que tardan en generarse |

### ✅ **¿Cuándo usar Retry Automático?**

- **Errores temporales:** Network timeouts, servidores ocupados
- **Recursos no disponibles:** Archivos bloqueados, conexiones saturadas
- **Inicialización:** Servicios que necesitan tiempo para arrancar
- **Operaciones idempotentes:** Que se pueden repetir sin efectos secundarios

### ❌ **¿Cuándo NO usar Retry?**

- **Errores permanentes:** 404 Not Found, permisos denegados
- **Operaciones no idempotentes:** Que causan efectos secundarios al repetirse
- **Errores de validación:** Datos incorrectos del usuario
- **Límites de tasa:** Podría empeorar la situación

### 💡 **Mejores Prácticas:**

- **Usar backoff exponencial** para no saturar el servidor
- **Limitar el número máximo** de reintentos
- **Considerar el contexto:** ¿Vale la pena reintentar?
- **Loggear los reintentos** para debugging
- **Agregar jitter** para evitar el "herd effect"

# 🔍 **CONCEPTOS QUE FALTAN (Pero son importantes)**

### **1. 🚨 ERROR HANDLING AVANZADO**

```jsx
// Error boundaries, global error handlers, graceful degradation
window.addEventListener("unhandledrejection", (event) => {
  console.log("Promesa rechazada no manejada:", event.reason);
  event.preventDefault();
});
```

### **2. 🔄 PATRONES DE CONCURRENCIA**

```jsx
// Limitación de concurrencia, semáforos
async function conLimiteConcurrencia(tareas, limite = 3) {
  // Ejecutar máximo 3 tareas a la vez
}
```

### **3. 📡 STREAMS Y DATA FLOW**

```jsx
// Para manejar datos en tiempo real, grandes volúmenes
fetch("/api/datos-grandes").then((response) => {
  const reader = response.body.getReader();
  // Procesar datos en chunks
});
```

### **4. 🛡️ CIRCUIT BREAKER PATTERN**

```jsx
// Más avanzado que retry - evita colapsar servicios caídos
class CircuitBreaker {
  // Estado: OPEN, HALF_OPEN, CLOSED
}
```

### **5. ⚡ PERFORMANCE Y OPTIMIZACIÓN**

```jsx
// Debouncing, throttling para eventos
function debounce(func, wait) {
  // Agrupar múltiples llamadas
}
```

### **6. 🔗 COMPOSICIÓN DE PROMESAS AVANZADA**

```jsx
// Promise.allSettled(), Promise.any(), encadenamiento complejo
```

### **7. 🌐 ASINCRONÍA EN NODE.JS**

```jsx
// nextTick, setImmediate, streams de Node.js
process.nextTick(() => {
  // Ejecutar después del event loop actual
});
```

# Manejo de errores avanzado en la asincronía

---

# Manejo de Errores en JavaScript Asíncrono

Ya se ha comnetado cómo manejar errores cuando trabajamos con código asíncrono en JavaScript. Hagamos un breve repaso.

## ¿Por qué es importante manejar errores?

Imaginen que están pidiendo comida por una app. Si el restaurante está cerrado, la app no debería quedarse "colgada" esperando para siempre. Debería decirles "Lo sentimos, este restaurante está cerrado" y dejarles pedir en otro lugar.

Eso es exactamente lo que hace el manejo de errores: **anticipar lo que puede salir mal y tener un plan B**.

## 1. Callbacks - La forma antigua

```jsx
// Simulamos pedir datos de un usuario
function obtenerUsuario(id, callback) {
  console.log(`Buscando usuario con ID: ${id}...`);

  // Simulamos que a veces falla (usuario no existe)
  if (id > 100) {
    // ¡ERROR! El callback recibe el error como primer parámetro
    callback(new Error("Usuario no encontrado"), null);
  } else {
    // ¡ÉXITO! No hay error (null) y tenemos datos
    callback(null, { id: id, nombre: "Ana García", email: "ana@ejemplo.com" });
  }
}

// USO - Siempre verificamos si hay error primero
obtenerUsuario(150, function (error, usuario) {
  if (error) {
    // PLAN B: Si hay error, lo manejamos
    console.log("❌ Ocurrió un error:", error.message);
    console.log("Mostrando usuario genérico en su lugar...");
    return; // ¡Importante: salimos de la función!
  }

  // Si no hay error, usamos los datos
  console.log("✅ Usuario encontrado:", usuario);
});

obtenerUsuario(50, function (error, usuario) {
  if (error) {
    console.log("❌ Ocurrió un error:", error.message);
    return;
  }

  console.log("✅ Usuario encontrado:", usuario);
});
```

## 2. Promesas - La forma moderna

```jsx
// La misma función pero con Promesas
function obtenerUsuarioPromesa(id) {
  return new Promise(function (resolve, reject) {
    console.log(`Buscando usuario con ID: ${id}...`);

    // Simulamos tiempo de espera (como una API real)
    setTimeout(function () {
      if (id > 100) {
        // REJECT = Algo salió mal
        reject(new Error("Usuario no encontrado en la base de datos"));
      } else {
        // RESOLVE = Todo salió bien
        resolve({
          id: id,
          nombre: "Carlos López",
          email: "carlos@ejemplo.com",
          premium: id < 50,
        });
      }
    }, 1000);
  });
}

// USO con .then() y .catch()
obtenerUsuarioPromesa(200)
  .then(function (usuario) {
    // Esto solo se ejecuta si TODO SALE BIEN
    console.log("✅ Usuario premium:", usuario);
  })
  .catch(function (error) {
    // Esto se ejecuta si ALGO SALE MAL
    console.log("❌ Error al buscar usuario:", error.message);
    console.log("Podemos ofrecer crear una nueva cuenta...");
  });

// También podemos encadenar operaciones
obtenerUsuarioPromesa(25)
  .then(function (usuario) {
    console.log("✅ Usuario encontrado:", usuario.nombre);

    // Podemos seguir encadenando más operaciones
    if (usuario.premium) {
      console.log("🎉 ¡Es usuario premium! Mostrando beneficios...");
    }

    return usuario; // Pasamos el usuario al siguiente .then()
  })
  .then(function (usuario) {
    console.log(`Enviando email de bienvenida a: ${usuario.email}`);
  })
  .catch(function (error) {
    // ¡IMPORTANTE! Un solo .catch() maneja TODOS los errores
    // de la cadena completa
    console.log("❌ Algo falló en el proceso:", error.message);
  });
```

## 3. Async/Await - La forma más legible

```jsx
// Async/Await hace que el código asíncrono se vea como síncrono
async function procesarUsuario(id) {
  try {
    console.log(`🔍 Iniciando búsqueda del usuario ${id}...`);

    // "await" significa: "espera a que esta promesa termine"
    const usuario = await obtenerUsuarioPromesa(id);

    // Esta línea solo se ejecuta si la promesa anterior tuvo éxito
    console.log("✅ Usuario cargado correctamente:", usuario.nombre);

    // Podemos seguir haciendo más operaciones
    if (usuario.premium) {
      console.log("🌟 Cargando contenido exclusivo para premium...");
    }

    return usuario;
  } catch (error) {
    // catch captura CUALQUIER error que ocurra en el try
    console.log("❌ Error crítico:", error.message);

    // Plan B: Podemos devolver un valor por defecto
    console.log("Mostrando perfil de invitado...");
    return { nombre: "Invitado", email: "", premium: false };
  }
}

// USO - Parece código normal, pero es asíncrono
async function main() {
  console.log("=== PROCESANDO USUARIO VÁLIDO ===");
  const usuario1 = await procesarUsuario(30);
  console.log("Usuario final:", usuario1);

  console.log("\\n=== PROCESANDO USUARIO INVÁLIDO ===");
  const usuario2 = await procesarUsuario(150);
  console.log("Usuario final:", usuario2);
}

// Ejecutamos todo
main();
```

## 4. Ejemplo del Mundo Real: Cargar Datos de una API

```jsx
async function cargarDatosDeClima(ciudad) {
  try {
    console.log(`🌤️ Consultando clima para: ${ciudad}`);

    // Simulamos una API real que puede fallar
    const respuesta = await fetch(`https://api.clima-ejemplo.com/${ciudad}`);

    // Verificamos si la respuesta HTTP es exitosa
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status} - Ciudad no encontrada`);
    }

    const datosClima = await respuesta.json();

    console.log(`✅ Clima en ${ciudad}: ${datosClima.temperatura}°C`);
    return datosClima;
  } catch (error) {
    console.log("❌ No pudimos obtener el clima:", error.message);

    // Diferentes planes B según el tipo de error
    if (error.message.includes("Ciudad no encontrada")) {
      console.log("💡 Sugerencia: Verifica el nombre de la ciudad");
    } else if (error.message.includes("network")) {
      console.log("🔌 Problema de conexión - Verifica tu internet");
    } else {
      console.log("⚠️ Error desconocido - Intenta más tarde");
    }

    // Devolvemos datos por defecto
    return { temperatura: "N/A", ciudad: ciudad, error: true };
  }
}

// Probemos nuestra función
async function mostrarClima() {
  const climas = await Promise.all([
    cargarDatosDeClima("Madrid"),
    cargarDatosDeClima("CiudadInexistente"),
    cargarDatosDeClima("Barcelona"),
  ]);

  console.log("Resumen de climas:", climas);
}

mostrarClima();
```

## Resumen de Reglas de Oro:

1. **Siempre ten un .catch() o try/catch** - Nunca dejes promesas sin manejar
2. **Verifica primero si hay error** - En callbacks, siempre check `if (error)`
3. **Usa throw new Error()** - Para crear errores descriptivos
4. **Ten un plan B** - ¿Qué mostrar si falla la carga de datos?
5. **Async/await es tu amigo** - Hace el código más fácil de leer y mantener

# Clase Avanzada: Metodologías Profesionales para Manejo de Errores

Existen metodologías mucho más avanzadas que el simple `try/catch`. Vamos a explorar técnicas que usan los desarrolladores profesionales.

## 1. Patrón "Result Object" - Alternativa a Try/Catch

```jsx
// ===============================================
// Clase Result
// ===============================================
// Esta clase representa el resultado de una operación que puede
// salir bien (éxito) o mal (error). En lugar de lanzar excepciones,
// encapsulamos la información en un objeto estructurado.
// Esto permite tener un flujo de control más predecible y limpio,
// sobre todo cuando tenemos múltiples pasos que validar o ejecutar.
class Result {
  constructor(success, data, error) {
    // success → indica si la operación fue exitosa (true) o falló (false)
    // data → si fue exitosa, aquí se guarda el resultado de la operación
    // error → si falló, aquí se guarda la información del error
    this.success = success;
    this.data = data;
    this.error = error;
  }

  // Método estático para crear un resultado exitoso.
  // Así evitamos usar `new Result(...)` en todo el código.
  static success(data) {
    return new Result(true, data, null);
  }

  // Método estático para crear un resultado fallido con información del error.
  static failure(error) {
    return new Result(false, null, error);
  }

  // Métodos de conveniencia para trabajar con los resultados.
  // Nos permiten saber fácilmente si la operación tuvo éxito.
  isSuccess() {
    return this.success;
  }

  // Devuelve los datos si la operación fue exitosa.
  // Si no fue exitosa, lanza un error para evitar usar datos inexistentes.
  getData() {
    if (!this.success) {
      throw new Error("Cannot get data from failed result");
    }
    return this.data;
  }

  // Devuelve el objeto de error (en caso de fallo).
  getError() {
    return this.error;
  }
}

// ===============================================
// Ejemplo práctico: Sistema de validación de usuarios
// ===============================================
// Esta función orquesta varias validaciones antes de crear un usuario.
// Lo importante es que cada validación devuelve un `Result` (éxito o error),
// así podemos cortar el flujo en cuanto algo falla, sin try/catch innecesarios.
async function validarYCrearUsuario(datosUsuario) {
  // Paso 1: Validar el email.
  // Llamamos a la función de validación y obtenemos un Result.
  const resultadoEmail = validarEmail(datosUsuario.email);
  if (!resultadoEmail.isSuccess()) {
    // Si falla, devolvemos directamente ese resultado de error
    // sin continuar con el resto de validaciones.
    return resultadoEmail;
  }

  // Paso 2: Verificar que el username no exista en la base de datos.
  const resultadoUnicidad = await verificarUsuarioUnico(datosUsuario.username);
  if (!resultadoUnicidad.isSuccess()) {
    return resultadoUnicidad;
  }

  // Paso 3: Validar edad mínima requerida.
  const resultadoEdad = validarEdad(datosUsuario.edad);
  if (!resultadoEdad.isSuccess()) {
    return resultadoEdad;
  }

  // Paso 4: Si todo lo anterior sale bien, creamos el usuario en la BD.
  const usuarioCreado = await crearUsuarioEnBD(datosUsuario);

  // Devolvemos un resultado exitoso con los datos del nuevo usuario.
  return Result.success(usuarioCreado);
}

// ===============================================
// Funciones de validación
// ===============================================
// Cada validación devuelve un Result, no lanza excepciones.
// Esto permite componerlas fácilmente.

function validarEmail(email) {
  // Expresión regular simple para validar formato de email.
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!regex.test(email)) {
    // Si el email no es válido, devolvemos un Result de error
    // con detalles útiles: tipo de error, mensaje, campo y valor.
    return Result.failure({
      type: "VALIDATION_ERROR",
      message: "Email inválido",
      field: "email",
      value: email,
    });
  }
  // Si pasa la validación, devolvemos éxito con el email limpio.
  return Result.success(email);
}

async function verificarUsuarioUnico(username) {
  // Simulamos una consulta a la base de datos para ver si el usuario ya existe.
  const usuariosExistentes = await buscarUsuariosPorUsername(username);

  if (usuariosExistentes.length > 0) {
    // Si ya existe, devolvemos un error con una sugerencia automática.
    // Esto es útil para UX (p. ej., “prueba con ana123”).
    return Result.failure({
      type: "BUSINESS_ERROR",
      message: "El nombre de usuario ya existe",
      field: "username",
      value: username,
      suggestion: `Prueba con ${username}${Math.floor(Math.random() * 1000)}`,
    });
  }

  // Si no existe, devolvemos éxito.
  return Result.success(username);
}

// ===============================================
// USO DEL SISTEMA
// ===============================================
// En lugar de tener múltiples try/catch, manejamos todo con un único flujo.
// Esto hace que el código sea más predecible y más fácil de mantener.

async function procesarRegistro() {
  // Este objeto representa los datos que recibiríamos, por ejemplo,
  // desde un formulario de registro en el frontend.
  const usuario = {
    email: "email-invalido", // <- Forzamos un error de email para probar.
    username: "ana",
    edad: 15,
  };

  // Ejecutamos todas las validaciones y creación.
  const resultado = await validarYCrearUsuario(usuario);

  if (resultado.isSuccess()) {
    // Si todo salió bien, obtenemos el usuario creado.
    console.log("🎉 Usuario creado:", resultado.getData());
  } else {
    // Si hubo error, recuperamos la información y mostramos un mensaje claro.
    const error = resultado.getError();
    console.log(`❌ Error en ${error.field}: ${error.message}`);

    // Si la validación ofrece sugerencias (por ejemplo, username),
    // también podemos mostrarlas para mejorar la experiencia del usuario.
    if (error.suggestion) {
      console.log(`💡 Sugerencia: ${error.suggestion}`);
    }
  }
}

// ===============================================
// NOTA IMPORTANTE:
// ===============================================
// Las funciones `validarEdad`, `crearUsuarioEnBD` y `buscarUsuariosPorUsername`
// no están definidas aquí, pero en un proyecto real deberían:
// - `validarEdad`: verificar si la edad es >= 18 (o el mínimo que se establezca).
// - `crearUsuarioEnBD`: insertar el usuario en la base de datos.
// - `buscarUsuariosPorUsername`: consultar la BD para ver si ya existe el nombre.
//
// Este patrón de diseño es muy útil porque:
// ✔ Evita múltiples bloques try/catch encadenados
// ✔ Centraliza la lógica de control de errores
// ✔ Devuelve mensajes estructurados y reutilizables
// ✔ Hace que el código sea más fácil de probar y mantener
```

## 2. Error Boundaries con Función Wrapper

```jsx
// ======================================================
// 🔸 withErrorBoundary: una función envoltorio ("wrapper")
// ======================================================
// Su objetivo es:
//  1. Ejecutar funciones asíncronas con un nombre identificable.
//  2. Capturar cualquier error que ocurra dentro de esa función.
//  3. Transformar ese error genérico en un objeto estructurado y controlado.
//  4. Devolver un `Result` en lugar de lanzar excepciones.
//
// Esto permite tener flujos de control mucho más predecibles
// sin llenar la aplicación de try/catch en todos lados.
function withErrorBoundary(operationName, asyncFn) {
  // Retornamos una nueva función asíncrona que envuelve a la original.
  // Esta nueva función acepta cualquier número de argumentos (...args)
  // y es la que finalmente usaremos en lugar de la original.
  return async function (...args) {
    try {
      // Log opcional: útil para depuración y trazabilidad.
      console.log(`🚀 Ejecutando: ${operationName}`);

      // Ejecutamos la función original (`asyncFn`) pasando los mismos argumentos.
      const result = await asyncFn(...args);

      // Si no hay error, mostramos mensaje de éxito.
      console.log(`✅ ${operationName} completado exitosamente`);

      // Devolvemos un objeto Result de éxito con el resultado de la operación.
      return Result.success(result);
    } catch (error) {
      // Si ocurre un error en la función original, lo capturamos aquí.
      console.error(`💥 Error en ${operationName}:`, error);

      // Aquí viene lo importante:
      // En lugar de devolver el error original (que puede ser inconsistente),
      // creamos un objeto de error estructurado con toda la info útil.
      const enhancedError = {
        operation: operationName, // Nombre de la operación que falló
        timestamp: new Date().toISOString(), // Cuándo ocurrió el error
        originalError: error.message, // Mensaje original del error
        context: args[0], // Podemos guardar el primer argumento como contexto (útil para debug)
      };

      // Devolvemos un Result de fallo con la información enriquecida.
      return Result.failure(enhancedError);
    }
  };
}

// ======================================================
// 🪙 EJEMPLO PRÁCTICO: Procesamiento de pagos
// ======================================================
// Usamos `withErrorBoundary` para envolver una función que puede fallar.
// Así cualquier error que ocurra dentro de `procesarPago` será capturado
// automáticamente, sin necesidad de escribir try/catch en cada llamada.
const procesarPagoSeguro = withErrorBoundary(
  "procesarPago", // nombre que identificará esta operación en los logs
  async function (datosPago) {
    // Simulamos validaciones que podrían fallar.

    // Primera validación: tarjeta válida
    if (!datosPago.tarjetaValida) {
      // Si la tarjeta no es válida, lanzamos un error que será capturado por el boundary.
      throw new Error("Tarjeta inválida o expirada");
    }

    // Segunda validación: fondos disponibles
    if (datosPago.monto > datosPago.limite) {
      throw new Error("Fondos insuficientes");
    }

    // Simulamos un procesamiento asíncrono (por ejemplo, llamado a un gateway de pago)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Si todo va bien, devolvemos un objeto con la información de la transacción.
    return {
      idTransaccion: `TX-${Date.now()}`, // ID generado con la marca de tiempo actual
      monto: datosPago.monto,
      estado: "COMPLETADO",
      fecha: new Date(),
    };
  }
);

// ======================================================
// 🧭 USO REAL EN UN FLUJO DE PAGO
// ======================================================
// Esta función representa cómo un sistema de pago podría usar
// la función protegida con el Error Boundary.
async function flujoDePago() {
  // Datos simulados de un pago (por ejemplo, enviados desde el frontend).
  const pago = {
    tarjetaValida: false, // ❌ Forzamos un error para ver cómo se captura.
    monto: 150,
    limite: 100,
  };

  // Llamamos a la función envuelta.
  // Nótese que no hay try/catch aquí: toda la gestión de errores ya
  // está manejada dentro de `withErrorBoundary`.
  const resultado = await procesarPagoSeguro(pago);

  // Si la operación tuvo éxito...
  if (resultado.isSuccess()) {
    const transaccion = resultado.getData();
    console.log("💰 Pago exitoso:", transaccion.idTransaccion);
  } else {
    // Si falló, recuperamos el error estructurado.
    const error = resultado.getError();
    console.log("❌ Transacción fallida:");
    console.log("   Operación:", error.operation);
    console.log("   Error:", error.originalError);
    console.log("   Contexto:", error.context);
    console.log("   Timestamp:", error.timestamp);

    // Podemos decidir cómo manejarlo en función del tipo de error.
    manejarErrorDePago(error);
  }
}

// ======================================================
// 🧭 MANEJADOR DE ERRORES DE PAGO
// ======================================================
// Esta función recibe el error enriquecido y toma decisiones concretas
// según el tipo de error original. Esto separa la lógica de negocio
// de la lógica de control de errores.
function manejarErrorDePago(error) {
  if (error.originalError.includes("Tarjeta inválida")) {
    console.log("🔄 Redirigiendo a actualización de tarjeta...");
  } else if (error.originalError.includes("Fondos insuficientes")) {
    console.log("💳 Ofreciendo método de pago alternativo...");
  }
}

// ======================================================
// 📝 RESUMEN CLAVE DE ESTE PATRÓN
// ======================================================
// ✔ `withErrorBoundary` permite envolver funciones y capturar errores
//   sin ensuciar el código con try/catch repetidos.
// ✔ Centraliza el manejo de errores, mejorando la trazabilidad.
// ✔ Devuelve `Result` → un estándar para propagar estado (éxito/fallo).
// ✔ En aplicaciones reales, este patrón se usa para envolver:
//    - llamadas a APIs externas
//    - operaciones con bases de datos
//    - integraciones con pasarelas de pago
//    - funciones críticas que no deben romper todo el flujo
```

## 3. Patrón "Railway Oriented Programming"

```jsx
// =======================================================
// 🧠 Pipeline: encadenar operaciones (sync/async) que pueden fallar
// =======================================================
// Idea clave: encapsular un valor y su "estado" (éxito/fracaso).
// Si alguna etapa falla, las siguientes se "saltan" y el error se propaga
// hasta el final, donde lo manejamos con `.match(...)`.

class Pipeline {
  constructor(value, isSuccess = true) {
    // value → si vamos bien, es el valor acumulado; si falló, es el error.
    // isSuccess → marca si el pipeline está en estado de éxito o de fallo.
    this.value = value;
    this.isSuccess = isSuccess;
  }

  // Crea un pipeline exitoso con un valor inicial.
  static of(value) {
    return new Pipeline(value, true);
  }

  // Crea un pipeline fallido con un "error" (objeto o Error).
  static fail(error) {
    return new Pipeline(error, false);
  }

  // =====================================================
  // 🔗 bind(fn): encadena una función SINCRONA
  // - Si ya venimos fallidos → no hace nada y devuelve el mismo pipeline (error bubbling).
  // - Si vamos bien → aplica fn(value). Si fn lanza, capturamos y pasamos a fail.
  // =====================================================
  bind(fn) {
    if (!this.isSuccess) {
      // Ya falló antes: propagamos tal cual sin tocar el error.
      return this;
    }
    try {
      const next = fn(this.value); // Aplicamos la transformación
      return Pipeline.of(next); // Envolvemos el nuevo valor en éxito
    } catch (error) {
      // Si la función lanza, convertimos el pipeline a estado fallido
      return Pipeline.fail(error);
    }
  }

  // =====================================================
  // 🔗 bindAsync(asyncFn): encadena una función ASÍNCRONA (promesa)
  // - Mismo comportamiento que bind, pero esperando el resultado.
  // =====================================================
  async bindAsync(asyncFn) {
    if (!this.isSuccess) {
      return this; // error bubbling
    }
    try {
      const result = await asyncFn(this.value);
      return Pipeline.of(result);
    } catch (error) {
      return Pipeline.fail(error);
    }
  }

  // =====================================================
  // 🎯 match(successFn, failureFn): "desempaqueta" el resultado
  // - Si éxito → llama successFn(value)
  // - Si fallo → llama failureFn(error)
  // Devuelve lo que devuelvan esas funciones (patrón 'fold').
  // =====================================================
  match(successFn, failureFn) {
    if (this.isSuccess) {
      return successFn(this.value);
    } else {
      return failureFn(this.value);
    }
  }
}

// =======================================================
// 🛒 Caso real: procesamiento de pedido en e-commerce
// Flujo:
//   datosPedido
//     → validarStock (sync)
//     → calcularImpuestos (async)
//     → aplicarDescuentos (async)
//     → procesarPago (async)
//     → crearEnvio (async)
// Si en cualquiera falla, las siguientes etapas NO se ejecutan.
// =======================================================
async function procesarPedido(datosPedido) {
  // Arrancamos el pipeline en estado exitoso con el pedido original
  const pipeline = Pipeline.of(datosPedido)
    // Etapa 1 (sync): valida y, si todo ok, marca stockValidado
    .bind(validarStock)
    // Etapa 2 (async): calcula impuestos y total
    .bindAsync(calcularImpuestos)
    // Etapa 3 (async): aplica descuentos (o lanza si cupón inválido)
    .bindAsync(aplicarDescuentos)
    // Etapa 4 (async): cobra (puede fallar por fondos/tarjeta)
    .bindAsync(procesarPago)
    // Etapa 5 (async): crea el envío (puede fallar si transportista cae)
    .bindAsync(crearEnvio);

  // Al final, "plegamos" el pipeline a un objeto estándar de respuesta
  return pipeline.match(
    // ✔ Éxito: devolvemos datos listos para el cliente/API
    (pedidoCompletado) => ({
      success: true,
      data: pedidoCompletado,
      message: "Pedido procesado exitosamente",
    }),
    // ❌ Fallo: normalizamos el error (mensaje, paso, recuperable)
    (error) => ({
      success: false,
      error: error.message, // Mensaje de error human-readable
      step: error.step || "unknown", // Dónde falló (si lo marcamos)
      recoverable: !error.critical, // Podemos reintentar o pedir acción al usuario
    })
  );
}

// =======================================================
// 🧩 Funciones del pipeline (cada una debe ser pura/idéntica en forma):
//   - Reciben el "pedido" acumulado hasta ese punto
//   - Devuelven el pedido enriquecido (o lanzan error estructurado)
// =======================================================

// 1) Validación de stock (SINCRONA)
function validarStock(pedido) {
  console.log("📦 Validando stock...");
  // Si algún item no tiene suficiente stock, lanzamos un error estructurado:
  if (pedido.items.some((item) => item.stock < item.cantidad)) {
    throw {
      message: "Producto sin stock disponible",
      step: "validarStock", // nos ayuda a saber en qué etapa falló
      recoverable: true, // podría resolverse (reducir cantidad, backorder, etc.)
    };
  }
  // Enriquecemos el pedido con una marca de validación
  return { ...pedido, stockValidado: true };
}

// 2) Cálculo de impuestos (ASÍNCRONA)
async function calcularImpuestos(pedido) {
  console.log("🧮 Calculando impuestos...");
  // Simulamos I/O (consulta reglas fiscales, etc.)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const impuestos = pedido.subtotal * 0.21; // IVA 21% de ejemplo
  return {
    ...pedido,
    impuestos,
    total: pedido.subtotal + impuestos, // acumulamos total parcial
  };
}

// 3) Aplicación de descuentos (ASÍNCRONA)
async function aplicarDescuentos(pedido) {
  console.log("🎁 Aplicando descuentos...");
  // Regla simple: un código "EXPIRED" provoca fallo
  if (pedido.codigoDescuento === "EXPIRED") {
    throw {
      message: "Código de descuento expirado",
      step: "aplicarDescuentos",
      recoverable: true, // el usuario puede probar otro cupón
    };
  }

  // Ejemplo: si hay cupón válido, restamos un 10% (demo)
  if (pedido.codigoDescuento === "WELCOME10") {
    const descuento = (pedido.total ?? pedido.subtotal) * 0.1;
    return {
      ...pedido,
      descuento,
      total: (pedido.total ?? pedido.subtotal) - descuento,
    };
  }

  // Sin cupón o sin cambios: devolvemos el pedido tal cual
  return pedido;
}

// 4) Procesamiento de pago (ASÍNCRONA)
async function procesarPago(pedido) {
  console.log("💳 Procesando pago...");
  // Simulación de llamada a gateway de pago
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Reglas de fallo de ejemplo:
  if (!pedido.tarjetaValida) {
    throw {
      message: "Tarjeta inválida o expirada",
      step: "procesarPago",
      recoverable: true, // el usuario puede actualizar tarjeta
    };
  }
  if ((pedido.total ?? pedido.subtotal) > (pedido.limite ?? 0)) {
    throw {
      message: "Fondos insuficientes",
      step: "procesarPago",
      recoverable: true, // probar otro método de pago
    };
  }

  // Si todo ok, adjuntamos datos de transacción
  return {
    ...pedido,
    pago: {
      idTransaccion: `TX-${Date.now()}`,
      estado: "COMPLETADO",
      fecha: new Date().toISOString(),
      importe: pedido.total ?? pedido.subtotal,
    },
  };
}

// 5) Creación de envío (ASÍNCRONA)
async function crearEnvio(pedido) {
  console.log("🚚 Creando envío...");
  // Simulamos llamada a proveedor logístico
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Simulación de caída del servicio logístico
  if (pedido.transportista === "FALLA_CARRIER") {
    throw {
      message: "El servicio del transportista no responde",
      step: "crearEnvio",
      critical: false, // no es crítico (podemos reintentar con otro carrier)
      recoverable: true,
    };
  }

  // Todo ok: devolvemos etiqueta/guía de envío
  return {
    ...pedido,
    envio: {
      guia: `ENV-${Math.floor(Math.random() * 1e6)}`,
      carrier: pedido.transportista || "STANDARD",
      estado: "GENERADO",
      fecha: new Date().toISOString(),
    },
    estadoFinal: "COMPLETADO",
  };
}

// =======================================================
// 🧪 Mini demo de uso (no se ejecuta aquí, solo referencia)
// =======================================================
// (async () => {
//   const pedido = {
//     items: [{ sku: "A1", cantidad: 2, stock: 10 }],
//     subtotal: 100,
//     codigoDescuento: "WELCOME10", // prueba "EXPIRED" para ver fallo en descuentos
//     tarjetaValida: true,          // pon false para forzar fallo en pago
//     limite: 200,                  // baja a 50 para forzar "fondos insuficientes"
//     transportista: "STANDARD",    // usa "FALLA_CARRIER" para simular caída
//   };

//   const res = await procesarPedido(pedido);
//   console.log(JSON.stringify(res, null, 2));
// })();
```

## 4. Sistema de Recuperación y Reintentos

```jsx
// ==========================================================
// ♻️ RetryStrategy: reintentos con backoff exponencial controlado
// ==========================================================
// Objetivo: envolver una operación asíncrona que puede fallar (API caída,
// timeouts, red saturada...) y reintentarla de forma segura un número
// finito de veces, solo cuando el error sea "recuperable".

class RetryStrategy {
  // --------------------------------------------------------
  // withRetry(operation, maxRetries, delay)
  // - operation: () => Promise<any>  → la operación a ejecutar/reintentar
  // - maxRetries: nº máximo de intentos (incluye el primero)
  // - delay: espera base en ms para el backoff exponencial
  // Devuelve: Result.success(data) o Result.failure(errorEstructurado)
  // --------------------------------------------------------
  static async withRetry(operation, maxRetries = 3, delay = 1000) {
    let lastError; // guardamos el último error para reportarlo si agotamos reintentos

    // Bucle de intentos: 1..maxRetries
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Intento ${attempt}/${maxRetries}`);

        // Ejecutamos la operación. Si resuelve → salimos devolviendo éxito.
        const result = await operation();

        console.log("✅ Operación exitosa");
        return Result.success(result);
      } catch (error) {
        // Si falla, capturamos el error y decidimos si reintentamos.
        lastError = error;
        console.log(`❌ Intento ${attempt} falló:`, error.message);

        // Si NO es recuperable o ya es el último intento → rompemos el bucle.
        if (!this.isRecoverableError(error) || attempt === maxRetries) {
          break;
        }

        // Backoff exponencial: delay * 2^(attempt-1)
        // p.ej. con delay=1000ms → 1000, 2000, 4000, ...
        const waitTime = delay * Math.pow(2, attempt - 1);
        console.log(`⏳ Esperando ${waitTime}ms antes del reintento...`);

        // Esperamos el tiempo calculado antes de reintentar
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }

    // Si llegamos aquí, agotamos reintentos o no era recuperable.
    // Devolvemos un error estructurado para trazabilidad.
    return Result.failure({
      message: `Todos los intentos fallaron: ${
        lastError?.message ?? "Error desconocido"
      }`,
      originalError: lastError, // el objeto Error original (útil para logs)
      retriesAttempted: maxRetries, // nº de intentos realizados
    });
  }

  // --------------------------------------------------------
  // isRecoverableError(error)
  // Heurística simple que decide si vale la pena reintentar.
  // Aquí se buscan patrones "transitorios" típicos de red/servidor.
  // En un entorno real, conviene ampliarlo con status HTTP, códigos propios, etc.
  // --------------------------------------------------------
  static isRecoverableError(error) {
    const msg = (error?.message || "").toLowerCase();

    // Patrones genéricos de fallos temporales
    const recoverablePatterns = [
      "timeout", // tiempo de espera agotado
      "network", // error de red genérico
      "temporarily unavailable", // temporalmente no disponible
      "rate limit", // límite de peticiones
      "server busy", // servidor ocupado
      "ecs service unavailable", // (ejemplo) infra ocupada
    ];

    return recoverablePatterns.some((pattern) => msg.includes(pattern));
  }
}

// ==========================================================
// 🌐 USO: servicio que golpea una API externa no siempre estable
// - Intentamos hasta 3 veces con backoff 1s → 1s, 2s, 4s.
// - La operación tiene un 70% de fallos simulados.
// ==========================================================
async function obtenerDatosDeAPI() {
  const resultado = await RetryStrategy.withRetry(
    async () => {
      // Simulamos una API caprichosa: a veces falla
      const shouldFail = Math.random() < 0.7; // 70% de probabilidad de fallo

      if (shouldFail) {
        // Lanzamos un error que aparenta ser transitorio
        throw new Error("Servidor temporalmente no disponible");
      }

      // Éxito: devolvemos datos
      return { datos: "Información importante", timestamp: new Date() };
    },
    3, // máximo de 3 intentos
    1000 // delay base: 1s (backoff exponencial: 1s, 2s, 4s)
  );

  // resultado es un Result: success|failure
  return resultado;
}
```

## 5. Monitorización y Logging Avanzado

```jsx
// ============================================================
// 🛡️ Sistema profesional de tracking de errores (cliente/servidor)
// ============================================================
// Objetivo: capturar errores, enriquecerlos con contexto útil,
// guardarlos en memoria, reportarlos a un servicio externo y
// detectar patrones de repetición en ventanas de tiempo cortas.
//
// Nota: Este ejemplo funciona en navegador y Node.js. Para evitar
// 'ReferenceError' en Node, se usa acceso seguro a window/navigator.

/* eslint-disable no-console */
class ErrorTracker {
  // Almacén en memoria de los errores capturados (solo sesión/proceso actual).
  // En producción, conviene limitar tamaño o hacer flush periódico.
  static errors = [];

  // ------------------------------------------------------------
  // track(error, context)
  // - error: instancia de Error (ideal) o un objeto compatible.
  // - context: metadatos que nos interesen (componente, usuario, acción...).
  // Devuelve: el "errorEntry" enriquecido (con id, timestamp, etc.).
  // ------------------------------------------------------------
  static track(error, context = {}) {
    // Entrada estructurada del error: normalizamos campos clave.
    const errorEntry = {
      // ID único para correlacionar reportes/logs/soporte humano.
      id: this.generateId(),

      // Tipo de error (por defecto 'Error'; podría ser 'TypeError', 'FetchError'...).
      type: error.name,

      // Mensaje legible para humanos; útil para detectar patrones.
      message: error.message,

      // Pila de llamadas (stacktrace) → crítica para diagnóstico.
      // Puede estar undefined si no es un Error real.
      stack: error.stack,

      // Metadatos que pasemos desde el punto de captura.
      // Nunca metas PII sensible sin anonimizar (GDPR).
      context: context,

      // Cuándo ocurrió (ISO 8601 para facilidad de parseo en backend).
      timestamp: new Date().toISOString(),

      // Info del agente de usuario (si estamos en navegador).
      // En Node no existe navigator → acceso seguro.
      userAgent:
        (typeof navigator !== "undefined" && navigator.userAgent) || "Node.js",

      // URL actual (navegador) o etiqueta "Server" si estamos en backend.
      url:
        (typeof window !== "undefined" &&
          window.location &&
          window.location.href) ||
        "Server",
    };

    // Guardamos en memoria (para análisis local y detección de patrones).
    this.errors.push(errorEntry);

    // Enviar a plataforma de observabilidad (Sentry, Datadog, LogRocket, etc.).
    this.reportToService(errorEntry);

    // Ejecutamos heurística simple para detectar picos/patrones recientes.
    this.checkForPatterns();

    // Devolvemos la entrada por si queremos mostrar/guardar el ID, etc.
    return errorEntry;
  }

  // ------------------------------------------------------------
  // generateId(): crea un identificador razonablemente único.
  // En entornos modernos podrías usar crypto.randomUUID().
  // ------------------------------------------------------------
  static generateId() {
    return `ERR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // ------------------------------------------------------------
  // reportToService(errorEntry)
  // Aquí integrarías el SDK/endpoint del proveedor de tracking.
  // Este stub solo hace logging bonito en consola.
  // ------------------------------------------------------------
  static reportToService(errorEntry) {
    // 🔭 Consola agrupada para lectura humana (útil en desarrollo).
    console.group("🚨 ERROR REPORTADO");
    console.log("ID:", errorEntry.id);
    console.log("Tipo:", errorEntry.type);
    console.log("Mensaje:", errorEntry.message);
    console.log("Contexto:", errorEntry.context);
    console.groupEnd();

    // 🌐 En producción: envía a tu colector/servicio.
    // Recuerda sanear PII y manejar fallos (con retry/jitter si aplica).
    // fetch('<https://api.error-tracking.com/errors>', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorEntry),
    // });
  }

  // ------------------------------------------------------------
  // checkForPatterns()
  // Detección naive de "patrones" de error repetidos en la última hora.
  // Si un mensaje se repite ≥ 5 veces en 60 minutos → warning en consola.
  // En serio: en producción haz esto en el servidor con agregaciones.
  // ------------------------------------------------------------
  static checkForPatterns() {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);

    // Filtramos solo errores recientes (últimos 60 minutos).
    const recentErrors = this.errors.filter(
      (err) => new Date(err.timestamp) > lastHour
    );

    // Contamos ocurrencias por 'message' (clave simple y efectiva).
    const errorCounts = recentErrors.reduce((acc, err) => {
      acc[err.message] = (acc[err.message] || 0) + 1;
      return acc;
    }, {});

    // Disparamos alerta si un mensaje supera el umbral.
    Object.entries(errorCounts).forEach(([message, count]) => {
      if (count >= 5) {
        console.warn(
          `⚠️ PATRÓN DETECTADO: "${message}" ocurrió ${count} veces en la última hora`
        );
      }
    });
  }
}

// ============================================================
// 🧪 USO en aplicación real (patrón de captura controlada)
// ============================================================
// Ejemplo: tenemos una función "crítica" donde algo puede fallar
// (consulta BD, llamada a API, cálculo sensible...). Capturamos
// el error, lo trackeamos con contexto, usamos el ID para soporte
// y re-lanzamos para que el flujo normal de errores siga su curso.
async function funcionCritica() {
  try {
    // ...código que puede fallar (simulamos un fallo controlado)
    throw new Error("Error de conexión a base de datos");
  } catch (error) {
    // Enriquecemos con contexto (¡evita PII! usa ids o hashes).
    const trackedError = ErrorTracker.track(error, {
      component: "funcionCritica",
      userId: "user123", // mejor: un hash/uuid no-identificable
      action: "procesarPago", // qué intentaba hacer el usuario
    });

    // Guardamos/mostramos el ID para correlación con soporte/logs.
    console.log("Error ID para soporte:", trackedError.id);

    // Re-lanzamos para que capas superiores (middleware/global) decidan.
    throw error;
  }
}
```

## Resumen de Metodologías Avanzadas:

1. **Result Object** - Evita excepciones, usa objetos predecibles
2. **Error Boundaries** - Wrappers que capturan y transforman errores
3. **Railway Programming** - Encadenamiento elegante de operaciones que pueden fallar
4. **Retry Strategies** - Recuperación automática de errores temporales
5. **Error Tracking** - Monitorización y análisis de patrones de error

# Limitación de concurrencia en JavaScript

---

## ¿Qué es la limitación de concurrencia?

Imaginen que tienen **3 cajeros en un banco** y **10 personas haciendo fila**. Si dejaran que las 10 personas entren al banco al mismo tiempo, sería un caos total. En vez de eso, dejan entrar máximo 3 personas a la vez.

Eso es exactamente la limitación de concurrencia: **controlar cuántas "tareas" pueden ejecutarse al mismo tiempo**.

## ¿Por qué es importante en JavaScript?

JavaScript es **single-threaded** (un solo hilo de ejecución). Si lanzamos 100 peticiones a una API al mismo tiempo, podemos:

- 🔥 **Saturar el servidor**
- 📈 **Consumir toda la memoria**
- 🐌 **Hacer que todo vaya más lento**

## 1. Ejemplo del Mundo Real: Cajeros del Banco

```jsx
// ============================================================
// 🏦 Banco (limitador de concurrencia con cola FIFO)
// ============================================================
// Idea: tienes un número finito de "cajeros" (workers). Si llegan más
// tareas (clientes) de las que puedes atender en paralelo, las pones en
// una fila de espera. Cada vez que un cajero queda libre, llamas al siguiente.
//
// Ventajas:
// - Controlas cuántas tareas asíncronas corren a la vez.
// - Evitas saturar APIs/DBs/CPU.
// - Mantienes orden de llegada (FIFO).

class Banco {
  constructor(numCajeros) {
    // cuántas tareas simultáneas están permitidas
    this.cajerosDisponibles = numCajeros;

    // cola de espera (FIFO) de tareas pendientes { resolve, nombreCliente, transaccion }
    this.filaDeEspera = [];

    // contador de tareas en ejecución ahora mismo
    this.tareasEnProgreso = 0;
  }

  // ------------------------------------------------------------
  // atenderCliente(nombreCliente, transaccion)
  // - nombreCliente: etiqueta sólo para logs (debug/observabilidad)
  // - transaccion: función asíncrona () => Promise<any> que ejecuta la tarea real
  // Devuelve: una Promesa que se resuelve cuando termina la transacción.
  // ------------------------------------------------------------
  async atenderCliente(nombreCliente, transaccion) {
    console.log(`🏦 [${nombreCliente}] Llegó al banco...`);

    // Si no queda ningún cajero libre, el cliente espera en fila
    if (this.tareasEnProgreso >= this.cajerosDisponibles) {
      console.log(
        `⏳ [${nombreCliente}] En espera... ${
          this.filaDeEspera.length + 1
        } en fila`
      );

      // Creamos una promesa "pendiente": guardamos su resolve para dispararla
      // cuando haya cajero. No ejecutamos todavía la transacción.
      return new Promise((resolve) => {
        this.filaDeEspera.push({ resolve, nombreCliente, transaccion });
      });
    }

    // Si hay cajero libre, ejecutamos ya la transacción
    return this.ejecutarTransaccion(nombreCliente, transaccion);
  }

  // ------------------------------------------------------------
  // ejecutarTransaccion(nombreCliente, transaccion)
  // Arranca la tarea, aumenta el contador y se asegura de liberarlo en "finally"
  // ------------------------------------------------------------
  async ejecutarTransaccion(nombreCliente, transaccion) {
    // ocupamos un cajero (sube concurrencia activa)
    this.tareasEnProgreso++;
    console.log(
      `✅ [${nombreCliente}] Atendiendo... ` +
        `Cajeros ocupados: ${this.tareasEnProgreso}/${this.cajerosDisponibles}`
    );

    try {
      // Ejecutamos la tarea asíncrona real
      const resultado = await transaccion();
      console.log(`🎉 [${nombreCliente}] Transacción completada!`);
      return resultado;
    } finally {
      // Pase lo que pase (éxito o error), liberamos el cajero
      this.tareasEnProgreso--;
      console.log(
        `🔄 [${nombreCliente}] Salió del banco. ` +
          `Cajeros ocupados: ${this.tareasEnProgreso}/${this.cajerosDisponibles}`
      );

      // Si hay gente esperando y queda hueco, atendemos al siguiente
      this.atenderSiguiente();
    }
  }

  // ------------------------------------------------------------
  // atenderSiguiente()
  // Saca el siguiente cliente de la cola (FIFO) y lo pone a ejecutar.
  // ------------------------------------------------------------
  atenderSiguiente() {
    // Sólo si hay alguien esperando y queda algún cajero libre
    if (
      this.filaDeEspera.length > 0 &&
      this.tareasEnProgreso < this.cajerosDisponibles
    ) {
      // Extraemos el primero que llegó (FIFO)
      const siguienteCliente = this.filaDeEspera.shift();

      console.log(`👉 Llamando a: ${siguienteCliente.nombreCliente}`);

      // Disparamos la promesa que teníamos retenida en atenderCliente(...)
      // Resolviéndola con la promesa de ejecutarTransaccion(...)
      // Nota: esto hace que la promesa original del cliente empiece a "correr" ahora.
      siguienteCliente.resolve(
        this.ejecutarTransaccion(
          siguienteCliente.nombreCliente,
          siguienteCliente.transaccion
        )
      );
    }
  }
}

// ============================================================
// 🧪 SIMULACIÓN DEL BANCO (demo reproducible)
// ============================================================
// Creamos un banco con 2 cajeros y lanzamos 5 "clientes" en paralelo.
// Sólo 2 se ejecutarán a la vez; los otros esperarán su turno.

async function simularBanco() {
  // Banco con sólo 2 cajeros (concurrencia máxima = 2)
  const miBanco = new Banco(2);

  // Transacción simulada: devuelve una promesa que resuelve tras 'duracion' ms
  function hacerTransaccion(duracion = 2000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Transacción de ${duracion}ms completada`);
      }, duracion);
    });
  }

  console.log("🚀 INICIANDO SIMULACIÓN - Banco con 2 cajeros");
  console.log("=============================================");

  // Llegan 5 clientes "a la vez"
  const clientes = [
    miBanco.atenderCliente("Ana", () => hacerTransaccion(1000)),
    miBanco.atenderCliente("Carlos", () => hacerTransaccion(3000)),
    miBanco.atenderCliente("Maria", () => hacerTransaccion(2000)),
    miBanco.atenderCliente("Pedro", () => hacerTransaccion(1500)),
    miBanco.atenderCliente("Laura", () => hacerTransaccion(2500)),
  ];

  // Esperamos a que TODOS terminen (conserva el orden de la llamada)
  const resultados = await Promise.all(clientes);

  console.log("=============================================");
  console.log("🏁 TODOS LOS CLIENTES ATENDIDOS!");
  console.log("Resultados:", resultados);
}

// Ejecutamos la simulación
simularBanco();
```

## 2. Limitación Simple para Peticiones HTTP

```jsx
// ==================================================================
// 🌐 LimitadorDeAPI — Controla cuántas peticiones simultáneas puedes ejecutar
// ==================================================================
// Patrón útil cuando necesitas lanzar muchas peticiones (fetch, descargas, etc.)
// pero no quieres saturar al servidor ni disparar errores por "rate limit".
// Usa una cola FIFO simple para ir liberando peticiones una a una.

class LimitadorDeAPI {
  constructor(limiteSimultaneas) {
    // Número máximo de peticiones activas en paralelo
    this.limite = limiteSimultaneas;

    // Cuántas peticiones se están ejecutando ahora mismo
    this.enEjecucion = 0;

    // Cola de resolvers (promesas pendientes) cuando se alcanza el límite
    this.cola = [];
  }

  // --------------------------------------------------------------
  // ejecutar(peticion)
  // - peticion: función asíncrona que representa la operación real
  //   (por ejemplo, fetch, descarga, llamada a base de datos)
  // Devuelve: la promesa que resuelve cuando se completa la petición.
  // --------------------------------------------------------------
  async ejecutar(peticion) {
    console.log(
      `📡 Peticiones en ejecución: ${this.enEjecucion}/${this.limite}`
    );

    // Si ya estamos en el límite de peticiones simultáneas
    if (this.enEjecucion >= this.limite) {
      console.log(`⏳ Límite alcanzado. Petición en cola...`);

      // Creamos una promesa que no se resuelve hasta que
      // una petición anterior termine y libere espacio.
      await new Promise((resolve) => this.cola.push(resolve));
      // ⚡ En este punto, cuando se llame a resolve() más adelante,
      // la ejecución continúa y la petición "entra en juego".
    }

    // Ahora tenemos un "slot" libre para ejecutar la petición
    this.enEjecucion++;

    try {
      console.log(
        `🚀 Ejecutando petición... (${this.enEjecucion}/${this.limite} activas)`
      );

      // Ejecutamos la función que representa la petición real
      const resultado = await peticion();

      // Devolvemos el resultado para encadenar en Promise.all
      return resultado;
    } finally {
      // 🧹 Liberamos espacio SÍ O SÍ (incluso si la petición falla)
      this.enEjecucion--;
      console.log(
        `✅ Petición completada. (${this.enEjecucion}/${this.limite} activas)`
      );

      // Si hay peticiones esperando en la cola, liberamos la siguiente
      if (this.cola.length > 0) {
        const siguiente = this.cola.shift();
        // Llamar a resolve() desbloquea la promesa creada arriba
        siguiente();
      }
    }
  }
}

// ==================================================================
// 🧪 EJEMPLO PRÁCTICO: Descarga controlada de imágenes
// ==================================================================
// Simulamos descargas para demostrar que nunca hay más de 2
// ejecutándose al mismo tiempo, aunque lancemos 5 de golpe.

async function descargarImagenes() {
  // Creamos un limitador con máximo 2 peticiones simultáneas
  const limitador = new LimitadorDeAPI(2);

  // URLs de imágenes a descargar (simuladas)
  const urlsDeImagenes = [
    "<https://ejemplo.com/imagen1.jpg>",
    "<https://ejemplo.com/imagen2.jpg>",
    "<https://ejemplo.com/imagen3.jpg>",
    "<https://ejemplo.com/imagen4.jpg>",
    "<https://ejemplo.com/imagen5.jpg>",
  ];

  console.log("🖼️ INICIANDO DESCARGA DE 5 IMÁGENES (máximo 2 simultáneas)");

  // Mapeamos cada URL a una tarea limitada por el limitador
  const descargas = urlsDeImagenes.map(async (url, index) => {
    // Le decimos al limitador: “ejecuta esto cuando haya hueco”
    return limitador.ejecutar(async () => {
      console.log(`⬇️ Descargando imagen ${index + 1}: ${url}`);

      // Simulamos el tiempo de descarga (1–3 segundos)
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );

      console.log(`✅ Imagen ${index + 1} descargada`);
      return `Imagen_${index + 1}_completada`;
    });
  });

  // Promise.all lanza todas las tareas, pero el limitador asegura
  // que sólo 2 estén activas al mismo tiempo.
  const resultados = await Promise.all(descargas);

  console.log("🎉 TODAS LAS IMÁGENES DESCARGADAS:", resultados);
}

// Ejecuta la demo si quieres probarlo
// descargarImagenes();
```

## 3. Patrón "Pool de Workers" Reutilizable

```jsx
// ===================================================================
// 🧵 PoolDeTrabajo: pool genérico con N "workers" y cola FIFO
// ===================================================================
// Patrón típico para controlar concurrencia de tareas heterogéneas
// (I/O, CPU, llamadas a API, procesamiento de archivos, etc.)
// - Hasta `tamañoPool` tareas simultáneas.
// - Si no hay worker libre, la tarea entra en cola.
// - Cuando un worker se libera, toma la siguiente tarea (FIFO).
class PoolDeTrabajo {
  constructor(tamañoPool) {
    // Capacidad máxima simultánea (número de workers)
    this.tamaño = tamañoPool;

    // Métrica de cuántos workers están ocupados ahora
    this.workersActivos = 0;

    // Cola de espera FIFO con elementos { tarea, nombreTarea, resolve, reject }
    this.cola = [];

    // Representación “lógica” de los workers (id + flag ocupado)
    this.workers = Array.from({ length: tamañoPool }, (_, i) => ({
      id: i + 1,
      ocupado: false,
    }));
  }

  // ---------------------------------------------------------------
  // ejecutar(tarea, nombreTarea?)
  // - tarea: función asíncrona () => Promise<any>
  // - nombreTarea: etiqueta para logs/observabilidad
  // Devuelve una promesa que resuelve/rechaza con el resultado de `tarea`.
  // ---------------------------------------------------------------
  async ejecutar(tarea, nombreTarea = "tarea") {
    // 1) ¿hay algún worker libre?
    const workerLibre = this.workers.find((w) => !w.ocupado);

    if (workerLibre) {
      // Sí → asignamos inmediatamente al worker y arrancamos
      return this._asignarTarea(workerLibre, tarea, nombreTarea);
    }

    // 2) No hay worker libre → encolamos la tarea y devolvemos
    //    una promesa que resolveremos cuando haya hueco.
    console.log(
      `📋 [${nombreTarea}] En cola. Cola actual: ${this.cola.length + 1}`
    );

    return new Promise((resolve, reject) => {
      this.cola.push({ tarea, nombreTarea, resolve, reject });
    });
  }

  // ---------------------------------------------------------------
  // _asignarTarea(worker, tarea, nombreTarea)
  // Marca el worker como ocupado, ejecuta la tarea y garantiza liberar
  // el worker (y disparar la siguiente) en el `finally`.
  // ---------------------------------------------------------------
  async _asignarTarea(worker, tarea, nombreTarea) {
    worker.ocupado = true;
    this.workersActivos++;

    console.log(`👷 Worker ${worker.id} ejecutando: ${nombreTarea}`);
    console.log(`   Workers activos: ${this.workersActivos}/${this.tamaño}`);

    try {
      // Ejecutamos la tarea real (puede resolver o rechazar)
      const resultado = await tarea();
      return resultado;
    } catch (error) {
      // Rechazamos hacia arriba (no tragamos el error aquí)
      throw error;
    } finally {
      // 🔐 Siempre liberar el worker (aunque la tarea falle)
      worker.ocupado = false;
      this.workersActivos--;

      console.log(`🆓 Worker ${worker.id} liberado`);
      console.log(`   Workers activos: ${this.workersActivos}/${this.tamaño}`);

      // Y después de liberar, intentamos despachar la siguiente en cola
      this._procesarSiguiente();
    }
  }

  // ---------------------------------------------------------------
  // _procesarSiguiente()
  // Si hay cola y un worker libre, saca el primero (FIFO) y lo lanza.
  // Encadena el resultado a la promesa encolada (resolve/reject).
  // ---------------------------------------------------------------
  _procesarSiguiente() {
    if (this.cola.length === 0) return;

    const workerLibre = this.workers.find((w) => !w.ocupado);
    if (workerLibre && this.cola.length > 0) {
      const siguiente = this.cola.shift(); // FIFO
      console.log(`👉 Siguiente en cola: ${siguiente.nombreTarea}`);

      // Lanzamos la tarea en el worker libre, y encadenamos su resultado
      // a la promesa que devolvimos cuando se encoló.
      this._asignarTarea(workerLibre, siguiente.tarea, siguiente.nombreTarea)
        .then(siguiente.resolve)
        .catch(siguiente.reject);
    }
  }
}

// ===================================================================
// 🧪 EJEMPLO: Procesamiento de archivos con diferentes duraciones
// ===================================================================
// - Máximo 3 archivos procesándose a la vez.
// - Los demás esperan en cola y entran cuando se libere un worker.
async function procesarArchivos() {
  const pool = new PoolDeTrabajo(3); // 3 workers máximo

  const archivos = [
    "documento1.pdf",
    "imagen1.jpg",
    "video1.mp4",
    "documento2.pdf",
    "imagen2.jpg",
    "video2.mp4",
    "documento3.pdf",
    "imagen3.jpg",
  ];

  console.log("📁 PROCESANDO 8 ARCHIVOS (máximo 3 simultáneos)");
  console.log("==============================================");

  // Mapeamos cada archivo a una tarea limitada por el pool
  const procesos = archivos.map(async (archivo, index) => {
    return pool.ejecutar(async () => {
      console.log(`🔄 Procesando: ${archivo}`);

      // Simulamos “trabajo” con distintas duraciones por tipo
      let tiempoProcesamiento;
      if (archivo.endsWith(".pdf")) {
        tiempoProcesamiento = 2000; // PDFs ~2s
      } else if (archivo.endsWith(".jpg")) {
        tiempoProcesamiento = 1500; // JPG ~1.5s
      } else {
        tiempoProcesamiento = 3000; // MP4 ~3s
      }

      await new Promise((resolve) => setTimeout(resolve, tiempoProcesamiento));

      console.log(`✅ Completado: ${archivo} (${tiempoProcesamiento}ms)`);
      return `${archivo}_procesado`;
    }, `Archivo_${index + 1}`);
  });

  // Esperamos todos los resultados (mantiene el orden de creación)
  const resultados = await Promise.all(procesos);
  console.log("==============================================");
  console.log("🎉 TODOS LOS ARCHIVOS PROCESADOS!");
  console.log("Resultados:", resultados);
}

// Ejecutar ejemplo
// procesarArchivos();
```

## 4. Ejemplo con APIs Reales (fetch)

```jsx
// ======================================================
// 🌐 LimitadorDePeticiones — throttle/concurrency para fetch
// ======================================================
// Controla cuántas peticiones HTTP pueden estar activas a la vez.
// Si alcanzas el máximo, las siguientes esperan en una cola FIFO
// hasta que se libere un "slot".

class LimitadorDePeticiones {
  constructor(maxSimultaneas) {
    // Máximo de peticiones simultáneas permitidas
    this.max = maxSimultaneas;

    // Contador de peticiones actualmente en vuelo
    this.actual = 0;

    // Cola de "resolvers" para desbloquear cuando haya hueco
    this.cola = [];
  }

  // ------------------------------------------------------
  // fetchLimitado(url, options?)
  // Encola/ejecuta un fetch respetando el límite de concurrencia.
  // Devuelve la misma Response que `fetch` (no toca el resultado).
  // ------------------------------------------------------
  async fetchLimitado(url, options = {}) {
    // Si ya estamos en el límite, espera tu turno (FIFO)
    if (this.actual >= this.max) {
      await new Promise((resolve) => this.cola.push(resolve));
      // cuando alguien termine, llamaremos a resolve() y seguirás
    }

    // Reservamos un "slot" de concurrencia
    this.actual++;
    console.log(`🌐 Petición a: ${url} (${this.actual}/${this.max} activas)`);

    try {
      // Ejecutamos la petición real
      const respuesta = await fetch(url, options);
      return respuesta; // devolvemos la Response para que el llamador decida
    } finally {
      // Pase lo que pase (éxito o error), liberamos el slot
      this.actual--;

      // Si hay gente esperando en la cola, desbloquea al siguiente
      if (this.cola.length > 0) {
        const siguiente = this.cola.shift(); // FIFO
        siguiente(); // permite que continúe la próxima petición en espera
      }
    }
  }
}

// ======================================================
// 🧪 USO PRÁCTICO: Consultar múltiples APIs con límite = 2
// ======================================================
async function consultarMultiplesAPIs() {
  const limitador = new LimitadorDePeticiones(2); // Máximo 2 peticiones en paralelo

  const apis = [
    "<https://jsonplaceholder.typicode.com/posts/1>",
    "<https://jsonplaceholder.typicode.com/posts/2>",
    "<https://jsonplaceholder.typicode.com/posts/3>",
    "<https://jsonplaceholder.typicode.com/posts/4>",
    "<https://jsonplaceholder.typicode.com/posts/5>",
  ];

  console.log("🚀 CONSULTANDO 5 APIS (máximo 2 simultáneas)");

  // Creamos promesas: todas "salen" ya, pero el limitador frena la concurrencia real
  const consultas = apis.map(async (url, index) => {
    try {
      const respuesta = await limitador.fetchLimitado(url);
      const datos = await respuesta.json();

      console.log(
        `✅ API ${index + 1} respondió: ${datos.title.substring(0, 20)}...`
      );
      return datos; // acumulamos el JSON
    } catch (error) {
      console.log(`❌ Error en API ${index + 1}:`, error.message);
      return null; // no reventamos Promise.all por una sola caída
    }
  });

  // Esperamos a que acaben todas (el limitador mantiene 2 activas como máximo)
  const resultados = await Promise.all(consultas);

  console.log(
    "🎉 Consultas completadas. Resultados obtenidos:",
    resultados.length
  );
}

// Para probar localmente, descomenta:
// consultarMultiplesAPIs();
```

## Resumen Visual:

```
Sin limitación (CAOS):
[🔥] [🔥] [🔥] [🔥] [🔥] [🔥] [🔥] [🔥] [🔥] [🔥]
↑ 10 tareas al mismo tiempo → Servidor colapsa

Con limitación (ORDEN):
[👷] [👷] [👷] [⏳] [⏳] [⏳] [⏳] [⏳] [⏳] [⏳]
↑ 3 trabajando + 7 esperando → Todo fluye mejor

```

## Reglas de Oro:

1. **Identifica cuellos de botella** - ¿Qué recursos son limitados?
2. **Usa límites conservadores** - Mejor prevenir que curar
3. **Siempre libera recursos** - Usa `finally` para evitar bloqueos
4. **Maneja la cola** - Asegúrate de que las tareas en espera se ejecuten
5. **Monitoriza** - Lleva cuenta de lo que está pasando

¿Ven cómo con estos ejemplos podemos controlar el flujo de trabajo y evitar saturar nuestros sistemas? ¿Les gustaría que profundice en algún caso de uso específico?

# Debouncing y Throttling - Explicación Sencilla

---

## ¿Por qué necesitamos esto?

Imaginen que tienen un **interruptor de luz** que cada vez que lo tocan, enciende o apaga la luz. Si alguien empieza a tocar el interruptor muy rápido (¡click, click, click!), la luz parpadea locamente y pueden fundir la bombilla.

**Debouncing y Throttling** evitan este "parpadeo" en nuestras aplicaciones.

## Debouncing

### Analogía: El Ascensor

Imaginen un ascensor en un edificio:

- **Sin debouncing**: El ascensor se mueve inmediatamente cada vez que alguien pulsa un botón (¡caos!)
- **Con debouncing**: El ascensor espera 2 segundos después del último botón pulsado, por si alguien más va a pulsar otro botón

```jsx
/**
 * DEBOUNCE - Espera a que terminen los eventos rápidos antes de ejecutar
 *
 * Como un ascensor que espera 2 segundos después del último botón pulsado
 * antes de moverse, por si alguien más va a pulsar otro botón.
 */

function debounce(funcionOriginal, tiempoEspera) {
  let timeoutId; // Esto es como el "temporizador del ascensor"

  // Esta es la función que devolvemos (la versión "debounceada")
  return function (...args) {
    console.log(
      `⏰ Evento detectado! Reiniciando temporizador de ${tiempoEspera}ms...`
    );

    // SIEMPRE: Cancelar el temporizador anterior
    // Es como decir: "Olvídate del viaje que iba a hacer, tengo un nuevo destino"
    clearTimeout(timeoutId);

    // Configurar NUEVO temporizador
    timeoutId = setTimeout(() => {
      console.log("🚀 Ejecutando función después del periodo de espera!");
      funcionOriginal.apply(this, args);
    }, tiempoEspera);
  };
}

// EJEMPLO REAL: Búsqueda en tiempo real
function buscarEnBaseDeDatos(terminoBusqueda) {
  // Esto simula una petición costosa a una API
  console.log(`🔍 BUSCANDO en API: "${terminoBusqueda}"`);
  console.log("📊 Resultados para:", terminoBusqueda);
}

// Creamos la versión "debounceada" que espera 500ms después del último typing
const buscarDebounceado = debounce(buscarEnBaseDeDatos, 500);

// SIMULACIÓN: Usuario escribiendo en un search input
function simularUsuarioEscribiendo() {
  console.log("👤 Usuario empezó a escribir...");

  // El usuario escribe rápido: "h", "ho", "hol", "hola"
  setTimeout(() => buscarDebounceado("h"), 100); // Se cancela
  setTimeout(() => buscarDebounceado("ho"), 200); // Se cancela
  setTimeout(() => buscarDebounceado("hol"), 300); // Se cancela
  setTimeout(() => buscarDebounceado("hola"), 400); // ¡Este se ejecuta!

  // El usuario sigue escribiendo después de una pausa
  setTimeout(() => {
    console.log("\\n👤 Usuario sigue escribiendo después de pausa...");
    buscarDebounceado("hola m"); // Se cancela
    buscarDebounceado("hola mu"); // Se cancela
    buscarDebounceado("hola mun"); // Se cancela
    buscarDebounceado("hola mund"); // Se cancela
    buscarDebounceado("hola mundo"); // ¡Este se ejecuta!
  }, 1500);
}

// Ejecutar simulación
// simularUsuarioEscribiendo();
```

### Ejemplo Práctico: Search Input en una Web

```jsx
/**
 * EJEMPLO DEL MUNDO REAL: Search input con Debouncing
 */

class SearchComponent {
  constructor() {
    this.buscarDebounceado = debounce(this.buscarReal, 300);
  }

  // Esta función se llama CADA VEZ que el usuario escribe
  onInputChange(termino) {
    console.log(`⌨️ Usuario escribió: "${termino}"`);

    // En vez de buscar inmediatamente, usamos la versión debounceada
    this.buscarDebounceado(termino);
  }

  // Esta es la función REAL que hace la búsqueda (costosa)
  buscarReal(termino) {
    if (termino.length === 0) {
      console.log("❌ Término vacío - no buscar");
      return;
    }

    // Simulamos una petición HTTP a una API
    console.log("🌐 Haciendo petición REAL a la API con:", termino);

    // En una app real, aquí iría:
    // fetch(`/api/search?q=${termino}`)
    //   .then(response => response.json())
    //   .then(data => this.mostrarResultados(data));
  }
}

// DEMOSTRACIÓN
function demostrarSearch() {
  const search = new SearchComponent();

  console.log("🎯 DEMO: Usuario escribiendo 'javascript' rápidamente");
  console.log("===================================================");

  const texto = "javascript";
  let terminoActual = "";

  // Simulamos typing rápido
  for (let letra of texto) {
    terminoActual += letra;
    search.onInputChange(terminoActual);
  }

  console.log("===================================================");
  console.log("💡 Nota: Solo se hizo 1 búsqueda REAL (por 'javascript')");
  console.log("💡 En vez de 10 búsquedas (una por cada letra)");
}

// Ejecutar demo
// demostrarSearch();
```

## Throttling

### Analogía: El Semáforo

Imaginen un semáforo en una calle muy transitada:

- **Sin throttling**: Todos los coches pasan a la vez (embotellamiento)
- **Con throttling**: Solo pasan X coches cada Y tiempo (flujo controlado)

```jsx
/**
 * THROTTLE - Ejecuta la función como máximo una vez cada X tiempo
 *
 * Como un semáforo que solo deja pasar coches cada 2 segundos,
 * sin importar cuántos coches lleguen en ese tiempo.
 */

function throttle(funcionOriginal, intervalo) {
  let ultimaEjecucion = 0; // Cuándo se ejecutó por última vez
  let timeoutId = null; // Para el caso del "trailing edge"

  return function (...args) {
    const ahora = Date.now();
    const tiempoDesdeUltimaEjecucion = ahora - ultimaEjecucion;
    const tiempoRestante = intervalo - tiempoDesdeUltimaEjecucion;

    console.log(
      `⏱️  Tiempo desde última ejecución: ${tiempoDesdeUltimaEjecucion}ms`
    );

    // Si ha pasado suficiente tiempo desde la última ejecución
    if (tiempoDesdeUltimaEjecucion >= intervalo) {
      console.log("🚀 Ejecución INMEDIATA (pasó el intervalo)");

      // Ejecutamos la función
      funcionOriginal.apply(this, args);
      ultimaEjecucion = ahora;
    } else if (!timeoutId) {
      // Si NO ha pasado suficiente tiempo, programamos para después
      console.log(`⏳ Programando ejecución en ${tiempoRestante}ms...`);

      timeoutId = setTimeout(() => {
        console.log("🚀 Ejecución PROGRAMADA (final del intervalo)");
        funcionOriginal.apply(this, args);
        ultimaEjecucion = Date.now();
        timeoutId = null;
      }, tiempoRestante);
    } else {
      console.log("❌ Ejecución BLOQUEADA - Ya hay una programada");
    }
  };
}

// EJEMPLO REAL: Tracking de scroll
function trackScrollPosition(posicion) {
  console.log(`📊 Guardando posición de scroll: ${posicion}px`);
  // En una app real: enviar analytics, lazy load images, etc.
}

// Throttle: máximo una vez cada 100ms
const trackScrollThrottled = throttle(trackScrollPosition, 100);

// SIMULACIÓN: Eventos de scroll rápidos
function simularScrollRapido() {
  console.log("🖱️ SIMULANDO SCROLL RÁPIDO DEL USUARIO");
  console.log("======================================");

  // El usuario hace scroll muy rápido (muchos eventos en poco tiempo)
  const posiciones = [100, 150, 200, 250, 300, 350, 400, 450, 500];

  posiciones.forEach((pos, index) => {
    setTimeout(() => {
      console.log(`\\n📍 Evento scroll ${index + 1}: ${pos}px`);
      trackScrollThrottled(pos);
    }, index * 50); // Eventos cada 50ms (más rápido que el throttle de 100ms)
  });
}

// Ejecutar simulación
// simularScrollRapido();
```

### Ejemplo Práctico: Botón de "Cargar Más"

```jsx
/**
 * EJEMPLO DEL MUNDO REAL: Botón que evita clicks múltiples
 */

class LoadMoreButton {
  constructor() {
    this.cargarMasThrottled = throttle(this.cargarMasReal, 2000); // 2 segundos
    this.clickCount = 0;
  }

  // Este método se llama cuando el usuario hace click
  onButtonClick() {
    this.clickCount++;
    console.log(`🖱️ Click #${this.clickCount} detectado`);

    // Usamos la versión throttled para evitar clicks múltiples
    this.cargarMasThrottled();
  }

  // Esta es la función REAL que carga más datos
  cargarMasReal() {
    console.log("🚀 CARGANDO MÁS DATOS (petición REAL a la API)");

    // Simulamos una petición que tarda 1 segundo
    setTimeout(() => {
      console.log("✅ Datos cargados exitosamente");
    }, 1000);
  }
}

// DEMOSTRACIÓN
function demostrarClicksMultiples() {
  const button = new LoadMoreButton();

  console.log("🎯 DEMO: Usuario haciendo clicks rápidos");
  console.log("=======================================");

  // Simulamos usuario haciendo clicks muy rápidos
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      button.onButtonClick();
    }, i * 300); // Clicks cada 300ms (más rápido que el throttle de 2000ms)
  }
}

// Ejecutar demo
// demostrarClicksMultiples();
```

## Comparación directa

```jsx
/**
 * COMPARACIÓN: Debounce vs Throttle en el MISMO ejemplo
 */

function mostrarMensaje(tipo, mensaje) {
  console.log(`${tipo}: ${mensaje}`);
}

// Creamos ambas versiones
const mostrarDebounce = debounce((msg) => mostrarMensaje("DEBOUNCE", msg), 500);

const mostrarThrottle = throttle((msg) => mostrarMensaje("THROTTLE", msg), 500);

function comparacionDirecta() {
  console.log("🎭 COMPARACIÓN DIRECTA: Debounce vs Throttle");
  console.log("============================================");
  console.log(
    "Eventos rápidos cada 200ms (más rápido que el intervalo de 500ms)"
  );
  console.log("------------------------------------------------------------");

  // Simulamos 5 eventos rápidos
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      const mensaje = `Evento ${i} a los ${i * 200}ms`;
      console.log(`\\n🔄 ${mensaje}`);

      mostrarDebounce(mensaje);
      mostrarThrottle(mensaje);
    }, i * 200);
  }
}

// Ejecutar comparación
// comparacionDirecta();
```

## Casos de uso del mundo real

```jsx
/**
 * CASOS DE USO PRÁCTICOS - Cuándo usar cada uno
 */

class CasosDeUsoReales {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // 1️⃣ DEBOUNCE - Para búsquedas en tiempo real
    const searchInput = document.createElement("input");
    searchInput.placeholder = "Buscar...";
    searchInput.addEventListener(
      "input",
      debounce((e) => this.buscarProductos(e.target.value), 300)
    );

    // 2️⃣ THROTTLE - Para eventos de scroll/resize
    window.addEventListener(
      "scroll",
      throttle(() => this.verificarElementosVisibles(), 100)
    );

    window.addEventListener(
      "resize",
      throttle(() => this.actualizarLayout(), 250)
    );

    // 3️⃣ THROTTLE - Para evitar spam de botones
    const submitButton = document.createElement("button");
    submitButton.textContent = "Enviar Formulario";
    submitButton.addEventListener(
      "click",
      throttle(() => this.enviarFormulario(), 2000, { trailing: false })
    );
  }

  buscarProductos(termino) {
    console.log(`🔍 Buscando productos: "${termino}"`);
    // Lógica real de búsqueda...
  }

  verificarElementosVisibles() {
    console.log("👀 Verificando elementos visibles en viewport");
    // Lógica para lazy loading, animaciones, etc.
  }

  actualizarLayout() {
    console.log("📐 Actualizando layout después de resize");
    // Recalcular layouts responsivos
  }

  enviarFormulario() {
    console.log("📧 Enviando formulario (evita doble envío)");
    // Lógica de envío del formulario
  }
}

// RESUMEN VISUAL
function mostrarResumen() {
  console.log(`
🎯 RESUMEN - CUÁNDO USAR CADA UNO:

DEBOUNCE (⏰ Espera a que termine):
✅ Búsquedas en tiempo real
✅ Validación de formularios mientras se escribe
✅ Auto-guardado mientras se escribe
✅ Filtros que se actualizan al escribir

THROTTLE (🚦 Limita la frecuencia):
✅ Eventos de scroll (infinite scroll, lazy load)
✅ Eventos de resize (responsive design)
✅ Eventos de mouse move (tooltips, efectos)
✅ Clicks en botones (evitar spam/doble envío)

💡 REGLA SIMPLE:
• Usa DEBOUNCE cuando quieres ESPERAR a que termine la acción rápida
• Usa THROTTLE cuando quieres PERMITIR la acción pero menos frecuente
    `);
}

// Mostrar resumen
mostrarResumen();
```

## Resumen Final:

| Característica     | Debouncing           | Throttling             |
| ------------------ | -------------------- | ---------------------- |
| **Comportamiento** | Espera a que termine | Ejecuta periódicamente |
| **Analogía**       | Ascensor que espera  | Semáforo que controla  |
| **Caso de uso**    | Search inputs        | Scroll events          |
| **Resultado**      | 1 ejecución al final | Ejecuciones espaciadas |

---
