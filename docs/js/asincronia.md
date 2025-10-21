# Asincronía

## 🧩 **¿Qué es la Asincronía en JavaScript?**

Imagina que estás en un restaurante:

### 🍽️ **Ejemplo del mundo real:**

- **Síncrono (sin asincronía):** El camarero toma tu pedido, va a la cocina, ESPERA ahí hasta que tu comida esté lista, te la trae, y solo entonces atiende al siguiente cliente.
- **Asíncrono (con asincronía):** El camarero toma tu pedido, lo envía a la cocina, y MIENTRAS se cocina, él sigue atendiendo a otros clientes. Cuando tu comida está lista, te la trae.

### 💻 **Traducción a JavaScript:**

La **asincronía** significa que JavaScript puede empezar una tarea larga (como leer un archivo o hacer una petición a internet) y **seguir haciendo otras cosas** mientras espera, en lugar de "congelarse" esperando.

## 📁 **Ejemplo Real: Leer un Archivo SIN Bloquear la Interfaz**

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

Imagina que le pides a un amigo que te llame cuando termine de trabajar:

### 📞 **Ejemplo del mundo real:**

- Le dices: "Cuando termines tu trabajo, **llámame**"
- El **callback** es esa "llamada" que recibes cuando la tarea está completa

### 💻 **Traducción a JavaScript:**

Un **callback** es simplemente una **función que se pasa como argumento** a otra función, y que se ejecutará **cuando termine cierta tarea**.

## 🔧 **Ejemplos Prácticos de Callbacks**

### **Ejemplo 1: Callback SÍNCRONO (inmediato)**

```javascript
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

```javascript
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

## 🔥 **El Infierno de los Callbacks (Callback Hell)**

```javascript
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

## 💻 **Ejemplo Real: Callback Hell en Acción**

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

## 🎯 **Los Problemas del Callback Hell**

### 1. **🔺 Pirámide de la Muerte (Pyramid of Doom)**

```javascript
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

```javascript
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

```javascript
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

## 💡 **Ejemplo del Mundo Real: Proceso de Compra**

```javascript
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

## 3. **Promesas**

### 🧩 **¿Qué son las Promesas?**

Imagina que le pides a un amigo que te traiga un libro de la biblioteca:

### 📚 **Ejemplo del mundo real:**

- Tu amigo te dice: "**Te prometo** que te traeré el libro"
- La promesa puede tener 3 estados:
  - **📝 Pendiente:** Está yendo a la biblioteca
  - ✅ **Cumplida:** Te trae el libro
  - ❌ **Rechazada:** No había libros o la biblioteca estaba cerrada

### 💻 **Traducción a JavaScript:**

Una **Promesa** es un objeto que representa una operación que **puede completarse ahora o en el futuro**, y que eventualmente producirá un valor.

## 🔧 **Estructura Básica de una Promesa**

```javascript
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

## 💻 **Ejemplo Real: Demo Interactivo de Promesas**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promesas en JavaScript - Demo Interactivo</title>
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
    </style>
  </head>
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

    <script>
      const resultado = document.getElementById("resultado");

      function mostrarMensaje(mensaje, tipo = "info") {
        const div = document.createElement("div");
        div.className = `estado ${tipo}`;
        div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`;
        resultado.appendChild(div);
      }

      function limpiarResultado() {
        resultado.innerHTML = "";
      }

      // 1️⃣ PROMESA EXITOSA
      function ejecutarPromesaExitosa() {
        limpiarResultado();
        mostrarMensaje("🚀 Creando promesa exitosa...", "pendiente");

        const promesaExitosa = new Promise((resolve, reject) => {
          // Simulamos una tarea que toma 2 segundos
          setTimeout(() => {
            resolve("🎉 ¡La promesa se cumplió exitosamente!");
          }, 2000);
        });

        // Usamos la promesa
        promesaExitosa
          .then((resultado) => {
            mostrarMensaje(resultado, "cumplida");
          })
          .catch((error) => {
            mostrarMensaje(error, "rechazada");
          });

        mostrarMensaje(
          "📝 Esta línea se ejecuta INMEDIATAMENTE (la promesa está pendiente)",
          "pendiente"
        );
      }

      // 2️⃣ PROMESA FALLIDA
      function ejecutarPromesaFallida() {
        limpiarResultado();
        mostrarMensaje("🚀 Creando promesa que fallará...", "pendiente");

        const promesaFallida = new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulamos un error
            reject("😞 La promesa fue rechazada - algo salió mal");
          }, 2000);
        });

        promesaFallida
          .then((resultado) => {
            mostrarMensaje(resultado, "cumplida");
          })
          .catch((error) => {
            mostrarMensaje(error, "rechazada");
          });
      }

      // 3️⃣ EJEMPLO REAL: Simular llamada a API
      function simularLlamadaAPI() {
        limpiarResultado();
        mostrarMensaje("🌐 Simulando llamada a API...", "pendiente");

        function llamadaAPI() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              // Simulamos que a veces la API responde y a veces no
              const exito = Math.random() > 0.3;

              if (exito) {
                const datosUsuario = {
                  id: 1,
                  nombre: "Ana García",
                  email: "ana@ejemplo.com",
                };
                resolve(datosUsuario);
              } else {
                reject("🔴 Error 404: API no disponible");
              }
            }, 1500);
          });
        }

        // Usamos la promesa
        llamadaAPI()
          .then((usuario) => {
            mostrarMensaje(
              `✅ Usuario obtenido: ${usuario.nombre} (${usuario.email})`,
              "cumplida"
            );
          })
          .catch((error) => {
            mostrarMensaje(error, "rechazada");
          })
          .finally(() => {
            // finally se ejecuta SIEMPRE, tanto en éxito como en error
            mostrarMensaje("🏁 La operación terminó (éxito o error)");
          });
      }
    </script>
  </body>
</html>
```

## 🔄 **Convertir Callbacks a Promesas**

Aquí está cómo solucionamos el Callback Hell con promesas:

### ❌ **ANTES (Callback Hell):**

```javascript
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

```javascript
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

Imagina que tienes un asistiente que te trae cosas:

### 📚 **Ejemplo del mundo real:**

- **Con promesas:** "Tráeme el libro, Y LUEGO léeme el primer capítulo, Y LUEGO..."
- **Con async/await:** "Espera aquí mientras voy por el libro. ¡Ya lo tengo! Ahora voy a leerte el primer capítulo..."

### 💻 **Traducción a JavaScript:**

**Async/Await** es una forma de escribir código asincrónico que **parece síncrono**, pero sin bloquear el hilo principal.

## 🔧 **Sintaxis Básica de Async/Await**

```javascript
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

## 💻 **Ejemplo Real: Demo Interactivo de Async/Await**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Async/Await - Demo Interactivo</title>
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
    </style>
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

    <script>
      const resultado = document.getElementById("resultado");

      function mostrarPaso(mensaje, tipo = "info") {
        const div = document.createElement("div");
        div.className = `paso ${tipo}`;
        div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`;
        resultado.appendChild(div);
      }

      function limpiarResultado() {
        resultado.innerHTML = "";
      }

      // Funciones simuladas que devuelven promesas
      function simularTarea(nombre, duracion = 1000) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(`✅ ${nombre} completado`);
          }, duracion);
        });
      }

      function simularTareaConError(nombre, duracion = 1000) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(`❌ Error en ${nombre}`);
          }, duracion);
        });
      }

      // 1️⃣ EJEMPLO CON ASYNC/AWAIT
      async function ejecutarProcesoCompleto() {
        limpiarResultado();
        mostrarPaso("🚀 INICIANDO PROCESO CON ASYNC/AWAIT...", "info");

        try {
          // El código se ejecuta en orden, como si fuera síncrono
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

          mostrarPaso("🎉 ¡Todo el proceso completado exitosamente!", "exito");
        } catch (error) {
          // Capturamos CUALQUIER error que ocurra en cualquier await
          mostrarPaso(error, "error");
        }
      }

      // 2️⃣ COMPARACIÓN: MISMO PROCESO CON PROMESAS
      function compararConPromesas() {
        limpiarResultado();
        mostrarPaso("🔄 EJECUTANDO EL MISMO PROCESO CON PROMESAS...", "info");

        mostrarPaso("1. Iniciando sesión...", "espera");

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
            mostrarPaso(
              "🎉 ¡Todo el proceso completado exitosamente!",
              "exito"
            );
          })
          .catch((error) => {
            mostrarPaso(error, "error");
          });
      }

      // 3️⃣ EJEMPLO REAL: Manejo de errores con Async/Await
      async function procesoConPosibleError() {
        try {
          mostrarPaso("🔍 Buscando datos del usuario...", "info");

          // Simulamos una petición que puede fallar
          const exito = Math.random() > 0.5;

          if (exito) {
            const datos = await simularTarea("Obtención de datos", 1000);
            mostrarPaso(datos, "exito");
            return datos;
          } else {
            // Forzamos un error
            await simularTareaConError("Obtención de datos", 1000);
          }
        } catch (error) {
          mostrarPaso(`💥 Error capturado: ${error}`, "error");
          // Podemos tomar decisiones basadas en el error
          mostrarPaso("🔄 Intentando recuperación...", "info");
        } finally {
          mostrarPaso(
            "🏁 Este código se ejecuta SIEMPRE (éxito o error)",
            "info"
          );
        }
      }
    </script>
  </body>
</html>
```

## 🔄 **Conversión de Promesas a Async/Await**

### ❌ **ANTES (con Promesas):**

```javascript
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

```javascript
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

```javascript
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

```javascript
async function procesoCorrecto() {
    const resultado = await algunaPromesa(); // ✅
}

function procesoIncorrecto() {
    const resultado = await algunaPromesa(); // ❌ Error
}
```

### 3. **Manejo de errores con `try/catch`**

```javascript
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

```javascript
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

Imagina que estás cocinando y dejas algo en el horno:

### 🍳 **Ejemplo del mundo real:**

- **Sin manejo de errores:** Dejas la comida en el horno sin timer. ¡Se quema!
- **Con manejo de errores:** Pones un timer que suena cuando está lista, y otro que avisa si hay humo.

### 💻 **Traducción a JavaScript:**

En operaciones asincrónicas, **muchas cosas pueden fallar**: conexión de red, archivos que no existen, datos inválidos... Si no manejamos estos errores, nuestra aplicación puede fallar silenciosamente.

## 🔧 **Métodos para Manejar Errores**

### 1. **Con Callbacks (patrón error-first)**

```javascript
// Patrón tradicional: el primer parámetro es siempre el error
function leerArchivo(nombreArchivo, callback) {
  // Simulamos lectura asincrónica
  setTimeout(() => {
    const archivoExiste = Math.random() > 0.3;

    if (archivoExiste) {
      callback(null, `📄 Contenido de ${nombreArchivo}`); // Éxito: error es null
    } else {
      callback("❌ Archivo no encontrado", null); // Error: primer parámetro
    }
  }, 1000);
}

// Uso
leerArchivo("mi-documento.txt", (error, contenido) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Contenido:", contenido);
});
```

### 2. **Con Promesas (.catch())**

```javascript
function leerArchivoPromesa(nombreArchivo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const archivoExiste = Math.random() > 0.3;

      if (archivoExiste) {
        resolve(`📄 Contenido de ${nombreArchivo}`);
      } else {
        reject("❌ Archivo no encontrado");
      }
    }, 1000);
  });
}

// Uso con .catch()
leerArchivoPromesa("mi-documento.txt")
  .then((contenido) => {
    console.log("Contenido:", contenido);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### 3. **Con Async/Await (try/catch)**

```javascript
async function procesarArchivo() {
  try {
    const contenido = await leerArchivoPromesa("mi-documento.txt");
    console.log("Contenido:", contenido);
  } catch (error) {
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
    </style>
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

    <script>
      const resultado = document.getElementById("resultado");

      function mostrarResultado(mensaje, tipo = "info") {
        const div = document.createElement("div");
        div.className = `resultado ${tipo}`;
        div.innerHTML = `${new Date().toLocaleTimeString()}: ${mensaje}`;
        resultado.appendChild(div);
      }

      function limpiarResultado() {
        resultado.innerHTML = "";
      }

      // Función simulada que puede fallar
      function operacionAsincrona(nombre, probabilidadExito = 0.7) {
        return new Promise((resolve, reject) => {
          const duracion = 1000 + Math.random() * 1000;

          setTimeout(() => {
            const exito = Math.random() < probabilidadExito;

            if (exito) {
              resolve(`✅ ${nombre} completado en ${duracion.toFixed(0)}ms`);
            } else {
              reject(`❌ ${nombre} falló después de ${duracion.toFixed(0)}ms`);
            }
          }, duracion);
        });
      }

      // 1️⃣ OPERACIÓN EXITOSA (manejo correcto)
      async function probarOperacionExitosa() {
        limpiarResultado();
        mostrarResultado(
          "🚀 Iniciando operación que probablemente tendrá éxito...",
          "info"
        );

        try {
          const resultado = await operacionAsincrona("Proceso principal", 0.9);
          mostrarResultado(resultado, "exito");
          mostrarResultado("🎉 Continuando con el flujo normal...", "exito");
        } catch (error) {
          mostrarResultado(error, "error");
          mostrarResultado(
            "🔄 Ejecutando plan de contingencia...",
            "advertencia"
          );
        }
      }

      // 2️⃣ OPERACIÓN FALLIDA (manejo de errores)
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
          mostrarResultado(error, "error");
          mostrarResultado(
            "💡 Mostrando mensaje amigable al usuario...",
            "advertencia"
          );
          mostrarResultado("🔄 Ofreciendo alternativas...", "info");
        }
      }

      // 3️⃣ EJEMPLO REAL: Llamada a API con manejo de errores específicos
      async function simularLlamadaAPI() {
        limpiarResultado();
        mostrarResultado("🌐 Simulando llamada a API real...", "info");

        try {
          // Simulamos fetch a una API
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
          );

          if (!response.ok) {
            // Manejo específico de errores HTTP
            if (response.status === 404) {
              throw new Error("Usuario no encontrado (404)");
            } else if (response.status === 500) {
              throw new Error("Error del servidor (500)");
            } else {
              throw new Error(`Error HTTP: ${response.status}`);
            }
          }

          const usuario = await response.json();
          mostrarResultado(`✅ Usuario obtenido: ${usuario.name}`, "exito");
          mostrarResultado(`📧 Email: ${usuario.email}`, "exito");
        } catch (error) {
          // Manejo diferenciado de tipos de error
          if (error.name === "TypeError" && error.message.includes("fetch")) {
            mostrarResultado(
              "🔌 Error de conexión: Verifica tu internet",
              "error"
            );
          } else if (error.message.includes("404")) {
            mostrarResultado("👤 Usuario no encontrado", "error");
          } else if (error.message.includes("500")) {
            mostrarResultado(
              "🖥️ Error del servidor, intenta más tarde",
              "error"
            );
          } else {
            mostrarResultado(`💥 Error inesperado: ${error.message}`, "error");
          }
        }
      }

      // 4️⃣ EJEMPLO AVANZADO: Reintentos automáticos
      async function probarReintentos() {
        limpiarResultado();
        mostrarResultado(
          "🔄 Probando sistema de reintentos automáticos...",
          "info"
        );

        async function operacionConReintentos(operacion, maxReintentos = 3) {
          let ultimoError;

          for (let intento = 1; intento <= maxReintentos; intento++) {
            try {
              mostrarResultado(
                `📝 Intento ${intento} de ${maxReintentos}...`,
                "info"
              );
              const resultado = await operacion();
              return resultado;
            } catch (error) {
              ultimoError = error;
              mostrarResultado(
                `⚠️ Intento ${intento} falló: ${error.message}`,
                "advertencia"
              );

              if (intento < maxReintentos) {
                const espera = intento * 1000; // Espera progresiva
                mostrarResultado(
                  `⏳ Esperando ${espera}ms antes de reintentar...`,
                  "info"
                );
                await new Promise((resolve) => setTimeout(resolve, espera));
              }
            }
          }

          throw new Error(
            `Todos los reintentos fallaron: ${ultimoError.message}`
          );
        }

        try {
          // Operación que falla mucho (solo 10% de éxito)
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

      // 5️⃣ COMPARACIÓN: ¿Qué pasa SIN manejo de errores?
      function probarSinManejoErrores() {
        limpiarResultado();
        mostrarResultado(
          "🔥 Probando qué pasa SIN manejo de errores...",
          "info"
        );

        // Esto causaría un crash en una app real
        operacionAsincrona("Operación sin protección", 0.3).then(
          (resultado) => {
            mostrarResultado(resultado, "exito");
          }
        );
        // ¡No hay .catch()! El error se pierde silenciosamente
      }
    </script>
  </body>
</html>
```

## 🎯 **Tipos Comunes de Errores en Asincronía**

### 1. **Errores de Red**

```javascript
async function obtenerDatos() {
  try {
    const response = await fetch("https://api.ejemplo.com/datos");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Error de conexión:", error.message);
    } else {
      console.error("Otro error:", error);
    }
  }
}
```

### 2. **Errores de Validación**

```javascript
async function procesarUsuario(datos) {
  try {
    // Validación síncrona
    if (!datos.email || !datos.email.includes("@")) {
      throw new Error("Email inválido");
    }

    // Operación asincrónica
    const usuario = await guardarUsuario(datos);
    return usuario;
  } catch (error) {
    console.error("Error procesando usuario:", error.message);
    throw error; // Relanzar para que lo maneje el llamador
  }
}
```

### 3. **Errores de Tiempo de Espera**

```javascript
function conTimeout(promesa, tiempoMs) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Timeout después de ${tiempoMs}ms`));
    }, tiempoMs);

    promesa
      .then(resolve)
      .catch(reject)
      .finally(() => clearTimeout(timeoutId));
  });
}

// Uso
async function obtenerDatosConTimeout() {
  try {
    const datos = await conTimeout(obtenerDatos(), 5000);
    return datos;
  } catch (error) {
    if (error.message.includes("Timeout")) {
      console.error("La operación tardó demasiado");
    } else {
      console.error("Otro error:", error);
    }
  }
}
```

### ✅ **Mejores Prácticas:**

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
