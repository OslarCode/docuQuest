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

---

# Conceptos sobre el mecanismo de la asincronía en JavaScript

## 🧩 **¿Qué es el Event Loop?**

Imagina un restaurante muy eficiente:

### 🍽️ **Ejemplo del mundo real:**

- **Cocina (Call Stack):** Donde se prepara un plato a la vez
- **Mesas (Web APIs):** Donde los clientes esperan su comida
- **Camarero (Event Loop):** Que constantemente verifica si la cocina está libre y trae nuevos pedidos

### 💻 **Traducción a JavaScript:**

El **Event Loop** es el mecanismo que permite a JavaScript manejar múltiples operaciones con un **solo hilo**, haciendo que parezca que hace varias cosas a la vez.

## 🔧 **Los Componentes del Event Loop**

### 1. **Call Stack (Pila de Llamadas)**

```javascript
function tarea1() {
  console.log("Tarea 1");
  tarea2(); // Se apila tarea2
}

function tarea2() {
  console.log("Tarea 2"); // Se ejecuta
  // tarea2 se desapila
}

tarea1(); // Se apila tarea1
// tarea1 se desapila

// Resultado:
// Tarea 1
// Tarea 2
```

### 2. **Web APIs**

- `setTimeout`, `setInterval`
- `fetch`, `XMLHttpRequest`
- Eventos del DOM (clics, teclas)
- `FileReader`

### 3. **Callback Queue (Cola de Tareas)**

### 4. **Microtask Queue (Cola de Microtareas)**

## 💻 **Demo Interactivo: Visualizando el Event Loop**

Aquí tienes un ejemplo completo que muestra cómo funciona:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Event Loop - Demo Visual</title>
    <style>
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
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
        .call-stack { border-color: #dc3545; background: #f8d7da; }
        .web-apis { border-color: #ffc107; background: #fff3cd; }
        .task-queue { border-color: #28a745; background: #d4edda; }
        .microtask-queue { border-color: #007bff; background: #cce7ff; }
        .tarea {
            background: white;
            padding: 8px;
            margin: 5px 0;
            border-radius: 4px;
            border-left: 4px solid;
            font-size: 14px;
        }
        .sincrona { border-left-color: #dc3545; }
        .settimeout { border-left-color: #ffc107; }
        .promesa { border-left-color: #007bff; }
        .evento { border-left-color: #28a745; }
        button {
            padding: 12px 20px;
            margin: 10px 5px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .btn-ejemplo { background: #007bff; color: white; }
        .btn-limpiar { background: #6c757d; color: white; }
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
    </style>
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

    <script>
        // Elementos del DOM
        const stackContent = document.getElementById('stack-content');
        const apisContent = document.getElementById('apis-content');
        const taskQueueContent = document.getElementById('task-queue-content');
        const microtaskQueueContent = document.getElementById('microtask-queue-content');
        const consola = document.getElementById('consola');

        // Estado del sistema
        let callStack = [];
        let webAPIs = [];
        let taskQueue = [];
        let microtaskQueue = [];

        function log(mensaje) {
            consola.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${mensaje}</div>`;
            consola.scrollTop = consola.scrollHeight;
        }

        function actualizarVisualizacion() {
            // Actualizar Call Stack
            stackContent.innerHTML = callStack.map(tarea =>
                `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`
            ).join('');

            // Actualizar Web APIs
            apisContent.innerHTML = webAPIs.map(api =>
                `<div class="tarea ${api.tipo}">${api.nombre} (${api.tiempoRestante}ms)</div>`
            ).join('');

            // Actualizar Task Queue
            taskQueueContent.innerHTML = taskQueue.map(tarea =>
                `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`
            ).join('');

            // Actualizar Microtask Queue
            microtaskQueueContent.innerHTML = microtaskQueue.map(tarea =>
                `<div class="tarea ${tarea.tipo}">${tarea.nombre}</div>`
            ).join('');
        }

        function limpiarTodo() {
            callStack = [];
            webAPIs = [];
            taskQueue = [];
            microtaskQueue = [];
            consola.innerHTML = '';
            actualizarVisualizacion();
        }

        function agregarAlStack(nombre, tipo = 'sincrona') {
            callStack.push({ nombre, tipo });
            log(`📥 Apilado: ${nombre}`);
            actualizarVisualizacion();
        }

        function removerDelStack() {
            if (callStack.length > 0) {
                const tarea = callStack.pop();
                log(`📤 Desapilado: ${tarea.nombre}`);
                actualizarVisualizacion();
                return tarea;
            }
        }

        function simularWebAPI(nombre, tipo, duracion, callback) {
            const api = {
                nombre,
                tipo,
                tiempoRestante: duracion,
                callback
            };

            webAPIs.push(api);
            log(`🌐 Web API iniciada: ${nombre} (${duracion}ms)`);
            actualizarVisualizacion();

            // Simular el paso del tiempo
            const interval = setInterval(() => {
                api.tiempoRestante -= 100;

                if (api.tiempoRestante <= 0) {
                    clearInterval(interval);
                    // Remover de Web APIs
                    webAPIs = webAPIs.filter(a => a !== api);

                    // Agregar a la cola correspondiente
                    if (tipo === 'promesa') {
                        microtaskQueue.push({ nombre: `Callback: ${nombre}`, tipo });
                        log(`⚡ Microtask agregado: ${nombre}`);
                    } else {
                        taskQueue.push({ nombre: `Callback: ${nombre}`, tipo });
                        log(`📋 Task agregado: ${nombre}`);
                    }

                    actualizarVisualizacion();
                } else {
                    actualizarVisualizacion();
                }
            }, 100);
        }

        function procesarEventLoop() {
            // 1. Procesar todo el Call Stack primero
            while (callStack.length > 0) {
                removerDelStack();
            }

            // 2. Procesar TODAS las Microtasks (alta prioridad)
            while (microtaskQueue.length > 0) {
                const microtask = microtaskQueue.shift();
                agregarAlStack(microtask.nombre, microtask.tipo);
                setTimeout(() => removerDelStack(), 100);
                log(`🎯 Microtask procesado: ${microtask.nombre}`);
            }

            // 3. Procesar UNA Task (baja prioridad)
            if (taskQueue.length > 0) {
                const task = taskQueue.shift();
                agregarAlStack(task.nombre, task.tipo);
                setTimeout(() => removerDelStack(), 100);
                log(`📝 Task procesado: ${task.nombre}`);
            }

            actualizarVisualizacion();
        }

        // 1️⃣ EJEMPLO COMPLETO DEL EVENT LOOP
        function ejecutarEjemploCompleto() {
            limpiarTodo();
            log('🚀 INICIANDO DEMO COMPLETO DEL EVENT LOOP');

            // Código síncrono (se ejecuta inmediatamente)
            agregarAlStack('script principal', 'sincrona');

            // setTimeout (Web API → Task Queue)
            setTimeout(() => {
                simularWebAPI('setTimeout 100ms', 'settimeout', 100, () => {});
            }, 10);

            // Promesa (Web API → Microtask Queue)
            setTimeout(() => {
                simularWebAPI('Promise.resolve()', 'promesa', 50, () => {});
            }, 20);

            // Más código síncrono
            setTimeout(() => {
                agregarAlStack('console.log("Hola")', 'sincrona');
                setTimeout(() => removerDelStack(), 100);
            }, 30);

            // Otro setTimeout
            setTimeout(() => {
                simularWebAPI('setTimeout 200ms', 'settimeout', 200, () => {});
            }, 40);

            // Procesar el event loop cada 300ms
            let procesamientos = 0;
            const interval = setInterval(() => {
                procesarEventLoop();
                procesamientos++;

                if (procesamientos > 10) {
                    clearInterval(interval);
                    log('🏁 Demo completado');
                }
            }, 300);
        }

        // 2️⃣ EJEMPLO: MICROTASKS vs TASKS (¡IMPORTANTE!)
        function ejecutarEjemploMicrotasks() {
            limpiarTodo();
            log('⚡ DEMO: MICROTASKS vs TASKS (PRIORIDAD)');

            agregarAlStack('Inicio del script', 'sincrona');

            // setTimeout (va a Task Queue - BAJA prioridad)
            setTimeout(() => {
                simularWebAPI('setTimeout 0ms', 'settimeout', 100, () => {});
                log('⏰ setTimeout programado');
            }, 10);

            // Promesa (va a Microtask Queue - ALTA prioridad)
            setTimeout(() => {
                simularWebAPI('Promise.then()', 'promesa', 50, () => {});
                log('🤝 Promesa programada');
            }, 20);

            // Evento de clic (simulado - va a Task Queue)
            setTimeout(() => {
                simularWebAPI('Evento click', 'evento', 80, () => {});
                log('🖱️ Evento click simulado');
            }, 30);

            // Otra promesa
            setTimeout(() => {
                simularWebAPI('Promise.resolve().then()', 'promesa', 30, () => {});
                log('🔁 Otra promesa programada');
            }, 40);

            // Procesar mostrando la prioridad
            setTimeout(() => {
                log('\n🎯 ORDEN DE EJECUCIÓN:');
                log('1. Call Stack vacío');
                log('2. MICROTASKS (Promesas) - TODAS primero');
                log('3. TASKS (setTimeout, eventos) - UNA por vez');
            }, 200);

            let procesamientos = 0;
            const interval = setInterval(() => {
                procesarEventLoop();
                procesamientos++;

                if (procesamientos > 8) {
                    clearInterval(interval);
                    log('\n💡 CONCLUSIÓN: Las Microtasks tienen MÁS prioridad que las Tasks');
                }
            }, 400);
        }

        // Inicializar
        actualizarVisualizacion();
    </script>
</body>
</html>
```

## 🎯 **El Orden de Ejecución (¡CRUCIAL!)**

```javascript
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

## 🔄 **Flujo del Event Loop Paso a Paso**

### **Paso 1:** Ejecutar todo el **Call Stack**

```javascript
console.log("Sincrono 1");
console.log("Sincrono 2");
// Todo el código síncrono se ejecuta primero
```

### **Paso 2:** Procesar **TODAS** las Microtasks

```javascript
Promise.resolve().then(() => console.log("Microtask 1"));
Promise.resolve().then(() => console.log("Microtask 2"));
// Se ejecutan TODAS las microtasks antes de continuar
```

### **Paso 3:** Procesar **UNA** Task

```javascript
setTimeout(() => console.log("Task 1"), 0);
setTimeout(() => console.log("Task 2"), 0);
// Solo se ejecuta UNA task, luego vuelve al paso 1
```

### ✅ **Reglas del Event Loop:**

1. **Call Stack primero** - Todo el código síncrono
2. **Microtasks después** - Promesas, queueMicrotask (TODAS)
3. **Tasks al final** - setTimeout, eventos (UNA por ciclo)

### ⚡ **Microtasks (Alta Prioridad):**

- `.then()`, `.catch()`, `.finally()` de Promesas
- `queueMicrotask()`
- `MutationObserver`

### ⏰ **Tasks (Baja Prioridad):**

- `setTimeout`, `setInterval`
- Eventos del DOM (click, keypress)
- `fetch` (la respuesta va a microtasks)
- `requestAnimationFrame`

### 🚨 **Errores Comunes:**

- Pensar que `setTimeout(fn, 0)` se ejecuta inmediatamente
- No entender por qué las promesas tienen prioridad
- Creer que JavaScript es multi-hilo

---

## 🧩 **¿Qué es el Call Stack?**

Imagina una pila de platos:

### 🍽️ **Ejemplo del mundo real:**

- Cuando lavas platos, **apilas** uno sobre otro
- Cuando los guardas, **desapilas** empezando por el de arriba
- Solo puedes tomar el plato de **arriba** de la pila

### 💻 **Traducción a JavaScript:**

El **Call Stack** es una estructura de datos que sigue el principio **LIFO** (Last In, First Out - Último en Entrar, Primero en Salir). Registra las funciones que se están ejecutando.

## 🔧 **Cómo Funciona el Call Stack**

### **Reglas Básicas:**

1. **Apilar (Push):** Cuando llamas una función
2. **Desapilar (Pop):** Cuando la función termina
3. **Solo el tope:** Solo se puede ejecutar la función en el tope de la pila

## 💻 **Demo Interactivo: Visualizando el Call Stack**

Aquí tienes un ejemplo completo que muestra visualmente cómo se apilan y desapilan las funciones:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Call Stack - Demo Visual</title>
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
    </style>
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

    <script>
      // Elementos del DOM
      const callStackElement = document.getElementById("callStack");
      const consolaElement = document.getElementById("consola");

      // Estado del stack
      let callStack = ["[BASE] Contexto Global"];
      let ejecucionEnCurso = false;

      function log(mensaje) {
        consolaElement.innerHTML += `<div>${mensaje}</div>`;
        consolaElement.scrollTop = consolaElement.scrollHeight;
      }

      function actualizarStackVisual() {
        callStackElement.innerHTML = "";

        callStack.forEach((funcion, index) => {
          const div = document.createElement("div");
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

          if (index === callStack.length - 1 && callStack.length > 1) {
            div.classList.add("entrando");
          }

          callStackElement.appendChild(div);
        });
      }

      function apilarFuncion(nombreFuncion) {
        callStack.push(nombreFuncion);
        log(`📥 APILANDO: ${nombreFuncion}`);
        actualizarStackVisual();
      }

      function desapilarFuncion() {
        if (callStack.length > 1) {
          const funcion = callStack.pop();
          log(`📤 DESAPILANDO: ${funcion}`);
          actualizarStackVisual();
          return funcion;
        }
      }

      function limpiarStack() {
        callStack = ["[BASE] Contexto Global"];
        consolaElement.innerHTML = "";
        actualizarStackVisual();
        ejecucionEnCurso = false;
      }

      // 1️⃣ EJEMPLO COMPLETO AUTOMÁTICO
      async function ejecutarEjemploCompleto() {
        if (ejecucionEnCurso) return;
        ejecucionEnCurso = true;
        limpiarStack();

        log("🚀 INICIANDO EJECUCIÓN COMPLETA");

        // Simulamos las funciones del ejemplo
        async function funcionA() {
          apilarFuncion("funcionA()");
          await delay(1000);
          log("🔵 Ejecutando código en A...");

          // Llamada a funcionB
          await funcionB();

          log("🔵 Finalizando código en A...");
          await delay(500);
          desapilarFuncion();
        }

        async function funcionB() {
          apilarFuncion("funcionB()");
          await delay(1000);
          log("🟢 Ejecutando código en B...");

          // Llamada a funcionC
          await funcionC();

          log("🟢 Finalizando código en B...");
          await delay(500);
          desapilarFuncion();
        }

        async function funcionC() {
          apilarFuncion("funcionC()");
          await delay(1000);
          log("🟡 Ejecutando código en C...");
          await delay(500);
          log("🟡 Más código en C...");
          await delay(500);
          desapilarFuncion();
        }

        function delay(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        // Ejecutar
        await funcionA();
        log("🎯 ¡Ejecución completada!");
        ejecucionEnCurso = false;
      }

      // 2️⃣ EJEMPLO PASO A PASO (INTERACTIVO)
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

      function ejecutarPasoAPaso() {
        if (ejecucionEnCurso) return;

        if (pasoActual === 0) {
          limpiarStack();
          ejecucionEnCurso = true;
        }

        if (pasoActual >= pasos.length) {
          pasoActual = 0;
          ejecucionEnCurso = false;
          return;
        }

        const paso = pasos[pasoActual];

        switch (paso.accion) {
          case "apilar":
            apilarFuncion(paso.funcion);
            break;
          case "desapilar":
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

      // 3️⃣ EJEMPLO DE STACK OVERFLOW
      function demostrarStackOverflow() {
        log("⚠️ DEMOSTRACIÓN DE STACK OVERFLOW");

        function funcionRecursiva(contador) {
          apilarFuncion(`funcionRecursiva(${contador})`);

          if (contador <= 0) {
            desapilarFuncion();
            return;
          }

          // Llamada recursiva sin condición de salida adecuada
          funcionRecursiva(contador - 1);
          desapilarFuncion();
        }

        // Esto causaría stack overflow en la vida real
        log("💥 Demostración: Llamadas recursivas profundas");
      }

      // Inicializar
      actualizarStackVisual();
    </script>
  </body>
</html>
```

## 🔄 **Ejemplo Sencillo: Cómo se Apilan las Funciones**

```javascript
function saludar() {
  console.log("Hola");
  despedirse(); // Se apila despedirse()
  console.log("Saludo completado");
  // Se desapila saludar()
}

function despedirse() {
  console.log("Adiós");
  // Se desapila despedirse()
}

saludar(); // Se apila saludar()

// ORDEN DE EJECUCIÓN:
// 1. 📥 saludar() se apila
// 2. 📥 despedirse() se apila (desde dentro de saludar)
// 3. 📤 despedirse() se desapila (cuando termina)
// 4. 📤 saludar() se desapila (cuando termina)
```

## 🎯 **El Proceso Visual del Call Stack**

### **Estado Inicial:**

```
Call Stack:
[ ] (vacío)
```

### **Paso 1: Llamar funcionA()**

```
Call Stack:
[ funcionA() ]
```

### **Paso 2: funcionA() llama a funcionB()**

```
Call Stack:
[ funcionA() ]
[ funcionB() ]  ← TOPE (se ejecuta esta)
```

### **Paso 3: funcionB() llama a funcionC()**

```
Call Stack:
[ funcionA() ]
[ funcionB() ]
[ funcionC() ]  ← TOPE (se ejecuta esta)
```

### **Paso 4: funcionC() termina**

```
Call Stack:
[ funcionA() ]
[ funcionB() ]  ← TOPE (vuelve a ejecutar esta)
```

### **Paso 5: funcionB() termina**

```
Call Stack:
[ funcionA() ]  ← TOPE (vuelve a ejecutar esta)
```

### **Paso 6: funcionA() termina**

```
Call Stack:
[ ] (vacío otra vez)
```

## 🚨 **Stack Overflow (Desbordamiento de Pila)**

```javascript
// ⚠️ ESTO CAUSA STACK OVERFLOW!
function funcionInfinita() {
  funcionInfinita(); // ¡Se llama a sí misma infinitamente!
}

funcionInfinita();

// RESULTADO:
// Call Stack:
// [ funcionInfinita() ]
// [ funcionInfinita() ]
// [ funcionInfinita() ]
// [ funcionInfinita() ]
// ... (se llena la memoria) ...
// 💥 ERROR: Maximum call stack size exceeded
```

### ✅ **Características del Call Stack:**

- **LIFO:** Último en entrar, primero en salir
- **Una operación a la vez:** Solo ejecuta la función del tope
- **Sincrónico:** Si una función tarda, bloquea todo
- **Tamaño limitado:** Puede desbordarse (stack overflow)

### 🔍 **Para Depurar:**

- Usa `console.trace()` para ver el stack actual
- Los errores muestran el "stack trace"
- Las herramientas de desarrollo muestran el call stack

### ⚠️ **Problemas Comunes:**

- **Stack Overflow:** Recursión infinita
- **Bloqueo:** Funciones síncronas que tardan mucho
- **Callbacks profundos:** Mucha anidación

---

## 🧩 **Las Dos Colas: Task Queue vs Microtask Queue**

Imagina una cafetería muy organizada:

### ☕ **Ejemplo del mundo real:**

- **Clientes normales (Task Queue):** Hacen fila y se atienden uno por uno
- **Clientes VIP (Microtask Queue):** Tienen prioridad y se atienden inmediatamente
- **Barista (Event Loop):** Atiende primero a todos los VIP, luego a un cliente normal

## 🔧 **Task Queue (Cola de Tareas)**

### **¿Qué va aquí?**

- `setTimeout`, `setInterval`
- Eventos del DOM (clics, teclas, etc.)
- `requestAnimationFrame`
- Operaciones de I/O

```javascript
// Ejemplo: setTimeout va a la Task Queue
console.log("1. 🟢 Inicio");

setTimeout(() => {
  console.log("3. ⏰ Timeout - Task Queue");
}, 0);

console.log("2. 🔴 Fin");

// Resultado:
// 1. 🟢 Inicio
// 2. 🔴 Fin
// 3. ⏰ Timeout - Task Queue
```

## ⚡ **Microtask Queue (Cola de Microtareas)**

### **¿Qué va aquí?**

- `.then()`, `.catch()`, `.finally()` de Promesas
- `queueMicrotask()`
- `MutationObserver`

```javascript
// Ejemplo: Promesas van a la Microtask Queue
console.log("1. 🟢 Inicio");

Promise.resolve().then(() => {
  console.log("3. 🤝 Promesa - Microtask Queue");
});

console.log("2. 🔴 Fin");

// Resultado:
// 1. 🟢 Inicio
// 2. 🔴 Fin
// 3. 🤝 Promesa - Microtask Queue
```

## 💻 **Demo Interactivo: Todas las Colas en Acción**

Aquí tienes un ejemplo completo que muestra visualmente cómo interactúan todas las partes:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Colas y Orden de Ejecución - Demo Completo</title>
    <style>
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
    </style>
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

    <script>
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
        log("\n--- CICLO DEL EVENT LOOP ---");

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
          "\n💡 NOTA: Observa cómo se ejecutan primero todas las Microtasks antes que el setTimeout"
        );
      }

      // 3️⃣ EJEMPLO PRÁCTICO: ¿QUÉ PASA CUANDO...?
      function ejemploPractico() {
        log("\n🔍 EJEMPLO PRÁCTICO: Microtasks dentro de Tasks");

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
    </script>
  </body>
</html>
```

## 🎯 **El Orden de Ejecución (¡REGLA DE ORO!)**

```javascript
console.log("1. 🟢 Script inicio"); // Call Stack

setTimeout(() => {
  console.log("6. ⏰ Timeout"); // Task Queue
}, 0);

Promise.resolve().then(() => {
  console.log("3. 🤝 Promesa 1"); // Microtask Queue
});

console.log("2. 🔴 Script medio"); // Call Stack

queueMicrotask(() => {
  console.log("4. ⚡ queueMicrotask"); // Microtask Queue
});

Promise.resolve().then(() => {
  console.log("5. 🤝 Promesa 2"); // Microtask Queue
});

console.log("7. 🟡 Script fin"); // Call Stack

// RESULTADO:
// 1. 🟢 Script inicio
// 2. 🔴 Script medio
// 7. 🟡 Script fin
// 3. 🤝 Promesa 1
// 4. ⚡ queueMicrotask
// 5. 🤝 Promesa 2
// 6. ⏰ Timeout
```

## 🔄 **Flujo Completo del Event Loop**

### **Ciclo 1:**

1. **Call Stack:** Ejecuta todo el código síncrono
2. **Microtask Queue:** Ejecuta TODAS las microtasks
3. **Task Queue:** Ejecuta UNA task
4. **Render:** Actualiza la interfaz (si es necesario)

### **Ciclo 2:**

1. **Call Stack:** Vacío (no hay código síncrono)
2. **Microtask Queue:** Vacía (ya se ejecutaron todas)
3. **Task Queue:** Ejecuta la siguiente task
4. **Render:** Actualiza la interfaz (si es necesario)

### ✅ **Task Queue (Baja Prioridad):**

- `setTimeout`, `setInterval`
- Eventos del DOM
- `requestAnimationFrame`
- **Se ejecuta:** UNA por ciclo del event loop

### ⚡ **Microtask Queue (Alta Prioridad):**

- `.then()`, `.catch()`, `.finally()`
- `queueMicrotask()`
- `MutationObserver`
- **Se ejecuta:** TODAS antes de pasar a las tasks

### 🔄 **Orden Inviolable:**

1. **Call Stack** (código síncrono)
2. **Microtask Queue** (TODAS las promesas)
3. **Task Queue** (UNA task)
4. **Repetir**

---

# Mecanismos avanzados de la asincronía en JavaScript

## 🧩 **¿Qué es Promise.all()?**

Imagina que estás organizando una fiesta y necesitas:

### 🎉 **Ejemplo del mundo real:**

- **Sin Promise.all():** Llamas a un amigo, esperas a que llegue, luego llamas a otro, esperas...
- **Con Promise.all():** Llamas a TODOS tus amigos a la vez, y esperas a que TODOS lleguen

### 💻 **Traducción a JavaScript:**

**Promise.all()** te permite ejecutar **múltiples promesas al mismo tiempo** y esperar a que **TODAS** se resuelvan.

## 🔧 **Sintaxis Básica de Promise.all()**

```javascript
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

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.all() - Ejecutar Promesas en Paralelo</title>
    <style>
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
    </style>
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

    <script>
      // Elementos del DOM
      const consola = document.getElementById("consola");
      const tiempoSecuencial = document.getElementById("tiempoSecuencial");
      const tiempoParalelo = document.getElementById("tiempoParalelo");
      const mejora = document.getElementById("mejora");

      function log(mensaje) {
        consola.innerHTML += `<div>${mensaje}</div>`;
        consola.scrollTop = consola.scrollHeight;
      }

      function limpiarTodo() {
        consola.innerHTML = "";
        tiempoSecuencial.textContent = "0ms";
        tiempoParalelo.textContent = "0ms";
        mejora.textContent = "0%";

        // Resetear estados visuales de tareas
        for (let i = 1; i <= 3; i++) {
          resetearTarea(`secuencial-${i}`);
          resetearTarea(`paralelo-${i}`);
        }
      }

      function actualizarTarea(id, estado, mensaje) {
        const elemento = document.getElementById(id);
        elemento.className = `tarea ${estado}`;
        elemento.querySelector("span:last-child").textContent = mensaje;
      }

      function resetearTarea(id) {
        actualizarTarea(id, "pendiente", "⏳ Esperando...");
      }

      // Función que simula una tarea asincrónica (como descargar un archivo)
      function simularTarea(nombre, duracion, probabilidadExito = 0.9) {
        return new Promise((resolve, reject) => {
          const inicio = Date.now();

          setTimeout(() => {
            const exito = Math.random() < probabilidadExito;
            const tiempoTranscurrido = Date.now() - inicio;

            if (exito) {
              resolve({
                nombre,
                duracion,
                tiempoReal: tiempoTranscurrido,
                estado: "✅ Completado",
              });
            } else {
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

      // 1️⃣ EJECUCIÓN SECUENCIAL (LENTA)
      async function ejecutarSecuencial() {
        limpiarTodo();
        log("🐌 INICIANDO EJECUCIÓN SECUENCIAL");
        const inicioTotal = Date.now();

        try {
          // Tarea 1
          actualizarTarea("secuencial-1", "procesando", "⏬ Descargando...");
          const resultado1 = await simularTarea("Imagen 1", 1000);
          actualizarTarea(
            "secuencial-1",
            "completada",
            `✅ ${resultado1.tiempoReal}ms`
          );
          log(
            `📥 ${resultado1.nombre} completado en ${resultado1.tiempoReal}ms`
          );

          // Tarea 2 (espera a que termine la 1)
          actualizarTarea("secuencial-2", "procesando", "⏬ Descargando...");
          const resultado2 = await simularTarea("Imagen 2", 1000);
          actualizarTarea(
            "secuencial-2",
            "completada",
            `✅ ${resultado2.tiempoReal}ms`
          );
          log(
            `📥 ${resultado2.nombre} completado en ${resultado2.tiempoReal}ms`
          );

          // Tarea 3 (espera a que terminen la 1 y 2)
          actualizarTarea("secuencial-3", "procesando", "⏬ Descargando...");
          const resultado3 = await simularTarea("Imagen 3", 1000);
          actualizarTarea(
            "secuencial-3",
            "completada",
            `✅ ${resultado3.tiempoReal}ms`
          );
          log(
            `📥 ${resultado3.nombre} completado en ${resultado3.tiempoReal}ms`
          );

          const tiempoTotal = Date.now() - inicioTotal;
          tiempoSecuencial.textContent = `${tiempoTotal}ms`;
          log(`🐌 TIEMPO TOTAL SECUENCIAL: ${tiempoTotal}ms`);
        } catch (error) {
          log(`❌ Error en ejecución secuencial: ${error.nombre}`);
        }
      }

      // 2️⃣ EJECUCIÓN PARALELA (RÁPIDA) - CON PROMISE.ALL()
      async function ejecutarParalelo() {
        limpiarTodo();
        log("⚡ INICIANDO EJECUCIÓN PARALELA CON PROMISE.ALL()");
        const inicioTotal = Date.now();

        try {
          // Iniciar TODAS las tareas al mismo tiempo
          actualizarTarea("paralelo-1", "procesando", "⏬ Descargando...");
          actualizarTarea("paralelo-2", "procesando", "⏬ Descargando...");
          actualizarTarea("paralelo-3", "procesando", "⏬ Descargando...");

          // Promise.all() ejecuta todas las promesas en paralelo
          const resultados = await Promise.all([
            simularTarea("Imagen 1", 1000),
            simularTarea("Imagen 2", 1000),
            simularTarea("Imagen 3", 1000),
          ]);

          // Actualizar UI con resultados
          resultados.forEach((resultado, index) => {
            actualizarTarea(
              `paralelo-${index + 1}`,
              "completada",
              `✅ ${resultado.tiempoReal}ms`
            );
            log(
              `📥 ${resultado.nombre} completado en ${resultado.tiempoReal}ms`
            );
          });

          const tiempoTotal = Date.now() - inicioTotal;
          tiempoParalelo.textContent = `${tiempoTotal}ms`;
          log(`⚡ TIEMPO TOTAL PARALELO: ${tiempoTotal}ms`);

          // Calcular mejora
          const tiempoSec = parseInt(tiempoSecuencial.textContent) || 3000;
          const mejoraPorcentaje = Math.round(
            (1 - tiempoTotal / tiempoSec) * 100
          );
          mejora.textContent = `${mejoraPorcentaje}% más rápido`;
        } catch (error) {
          log(`❌ Error en ejecución paralela: ${error.nombre}`);
          // Si una falla, Promise.all() rechaza inmediatamente
        }
      }

      // 3️⃣ EJEMPLO CON APIS REALES
      async function ejemploAPIsReales() {
        limpiarTodo();
        log("🌐 EJEMPLO CON APIS REALES - Cargando datos de usuarios...");

        try {
          // Hacer múltiples peticiones HTTP en paralelo
          const [usuarios, posts, comentarios] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users").then((r) =>
              r.json()
            ),
            fetch("https://jsonplaceholder.typicode.com/posts").then((r) =>
              r.json()
            ),
            fetch("https://jsonplaceholder.typicode.com/comments").then((r) =>
              r.json()
            ),
          ]);

          log(`✅ Usuarios cargados: ${usuarios.length}`);
          log(`✅ Posts cargados: ${posts.length}`);
          log(`✅ Comentarios cargados: ${comentarios.length}`);
          log("🎉 ¡Todos los datos cargados en paralelo!");
        } catch (error) {
          log(`❌ Error cargando datos: ${error.message}`);
        }
      }

      // 4️⃣ EJEMPLO: MANEJO DE ERRORES EN PROMISE.ALL()
      async function ejemploConErrores() {
        log("\n⚠️ EJEMPLO: Promise.all() con errores");

        try {
          const resultados = await Promise.all([
            simularTarea("Tarea 1", 500, 0.9),
            simularTarea("Tarea 2", 800, 0.3), // Esta probablemente falle
            simularTarea("Tarea 3", 600, 0.9),
          ]);

          log("✅ Todas las tareas completadas");
        } catch (error) {
          log(`❌ Promise.all() falló porque una tarea falló: ${error.nombre}`);
          log('💡 Promise.all() es "todo o nada": si UNA falla, TODAS fallan');
        }
      }

      // 5️⃣ EJEMPLO: PROMISE.ALLSETTLED() (alternativa cuando quieres todos los resultados)
      async function ejemploAllSettled() {
        log("\n🛡️ EJEMPLO: Promise.allSettled() (no se detiene por errores)");

        const resultados = await Promise.allSettled([
          simularTarea("Tarea A", 400, 0.9),
          simularTarea("Tarea B", 600, 0.2), // Esta probablemente falle
          simularTarea("Tarea C", 500, 0.9),
        ]);

        resultados.forEach((resultado, index) => {
          if (resultado.status === "fulfilled") {
            log(`✅ Tarea ${index + 1}: ${resultado.value.estado}`);
          } else {
            log(`❌ Tarea ${index + 1}: ${resultado.reason.estado}`);
          }
        });

        log("🎯 Promise.allSettled() espera a TODAS, sin importar errores");
      }

      // Ejecutar ejemplos adicionales después de un tiempo
      setTimeout(() => {
        ejemploConErrores();
        setTimeout(ejemploAllSettled, 2000);
      }, 5000);
    </script>
  </body>
</html>
```

## 🎯 **Características Clave de Promise.all()**

### ✅ **Ventajas:**

- **Máxima velocidad:** Ejecuta en paralelo
- **Sincronización:** Espera a que TODAS terminen
- **Orden preservado:** Los resultados mantienen el orden del array

### ⚠️ **Comportamiento con Errores:**

```javascript
// Si UNA promesa falla, Promise.all() falla inmediatamente
Promise.all([
  promesaExitosa(),
  promesaQueFalla(), // ¡Esto hace que TODO falle!
  promesaExitosa(), // Esta ni siquiera se ejecuta
])
  .then((resultados) => {
    // No se ejecuta si hay algún error
  })
  .catch((error) => {
    // Se captura el PRIMER error que ocurra
  });
```

## 🔧 **Alternativas a Promise.all()**

### **Promise.allSettled()** - No se detiene por errores

```javascript
// Espera a que TODAS terminen (éxito o error)
const resultados = await Promise.allSettled([
  promesaExitosa(),
  promesaQueFalla(),
  promesaExitosa(),
]);

resultados.forEach((resultado, index) => {
  if (resultado.status === "fulfilled") {
    console.log(`Tarea ${index}: ✅`, resultado.value);
  } else {
    console.log(`Tarea ${index}: ❌`, resultado.reason);
  }
});
```

### **Promise.race()** - La primera que termine

```javascript
// Devuelve la primera promesa que se resuelva o rechace
const ganadora = await Promise.race([
  promesaLenta(3000),
  promesaRapida(1000), // Esta gana
  promesaMedia(2000),
]);
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

## 🧩 **¿Qué es Promise.race()?**

Imagina una carrera de atletismo:

### 🏃‍♂️ **Ejemplo del mundo real:**

- **Sin Promise.race():** Esperas a que TODOS los corredores terminen
- **Con Promise.race():** Solo te importa el **PRIMERO** que cruce la meta

### 💻 **Traducción a JavaScript:**

**Promise.race()** ejecuta múltiples promesas y devuelve la **PRIMERA** que se resuelva o rechace, ignorando las demás.

## 🔧 **Sintaxis Básica de Promise.race()**

```javascript
// Promise.race() recibe un ARRAY de promesas
Promise.race([promesaRapida, promesaLenta, promesaMedia])
  .then((ganadora) => {
    // Solo se ejecuta con la PRIMERA que termine
    console.log("¡Ganó:", ganadora);
  })
  .catch((error) => {
    // Si la PRIMERA en terminar es un error
    console.error("Primera en fallar:", error);
  });
```

## 💻 **Demo Interactivo: Promise.race() en Acción**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Promise.race() - La Carrera de Promesas</title>
    <style>
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
    </style>
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

    <script>
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
      function crearPromesa(
        nombre,
        minTiempo,
        maxTiempo,
        probabilidadExito = 0.9
      ) {
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
                `😞 Perdió - ${
                  document.getElementById(`tiempo-${id}`).textContent
                }`
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
        log("\n⚠️ EJEMPLO: Promise.race() con posibles errores");

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
        log("\n🚫 EJEMPLO: PATRÓN DE CANCELACIÓN");

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
    </script>
  </body>
</html>
```

## 🎯 **Características Clave de Promise.race()**

### ✅ **Comportamiento:**

- **Primero en terminar gana:** No importa si es éxito o error
- **Ignora las demás:** Las otras promesas siguen ejecutándose en segundo plano
- **No espera:** Devuelve inmediatamente cuando una termina

### ⚠️ **Casos Especiales:**

```javascript
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

## 🔧 **Casos de Uso Prácticos**

### **1. Timeouts**

```javascript
function conTimeout(promesa, tiempoLimite) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout")), tiempoLimite);
  });

  return Promise.race([promesa, timeout]);
}

// Uso: Cancelar si tarda más de 5 segundos
const datos = await conTimeout(fetch("/api/datos"), 5000);
```

### **2. Múltiples fuentes**

```javascript
// Cargar de la fuente más rápida
const imagen = await Promise.race([
  cargarDesdeCDN(),
  cargarDesdeCache(),
  cargarDesdeServidor(),
]);
```

### **3. Cancelación por usuario**

```javascript
// Cancelar si el usuario hace clic en "cancelar"
const resultado = await Promise.race([
  operacionLarga(),
  esperarCancelacionUsuario(),
]);
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

## 🧩 **¿Qué es AbortController?**

Imagina que estás descargando un archivo grande:

### 📥 **Ejemplo del mundo real:**

- **Sin AbortController:** Una vez que empiezas la descarga, no puedes cancelarla
- **Con AbortController:** Tienes un **botón de cancelar** que puedes presionar en cualquier momento

### 💻 **Traducción a JavaScript:**

**AbortController** es un objeto que permite **cancelar** operaciones asincrónicas como `fetch`, `Promise`, y otras cuando ya no las necesitas.

## 🔧 **Sintaxis Básica de AbortController**

```javascript
// 1. Crear un AbortController
const controller = new AbortController();
const signal = controller.signal;

// 2. Pasar la signal a operaciones que la soporten
fetch("/api/datos", { signal })
  .then((response) => response.json())
  .then((datos) => {
    console.log("Datos recibidos:", datos);
  })
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("✅ Fetch cancelado por el usuario");
    } else {
      console.error("❌ Otro error:", error);
    }
  });

// 3. Cancelar cuando quieras
document.getElementById("cancelar").addEventListener("click", () => {
  controller.abort(); // ¡Cancela la operación!
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
    <style>
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
    </style>
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

    <script>
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
            document.getElementById(
              "progreso-fetch"
            ).style.width = `${progreso}%`;

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
          document.getElementById("estado-fetch").className =
            "estado completado";
          document.getElementById("estado-fetch").textContent =
            "✅ Fetch completado exitosamente";
          document.getElementById("progreso-fetch").style.width = "100%";
          document.getElementById("btn-cancelar-fetch").disabled = true;

          log("✅ Fetch completado: Datos recibidos");
        } catch (error) {
          if (error.name === "AbortError") {
            document.getElementById("estado-fetch").className =
              "estado cancelado";
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
        document.getElementById("estado-timeout").className =
          "estado esperando";
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
        document.getElementById("estado-timeout").className =
          "estado procesando";
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
          document.getElementById("estado-timeout").className =
            "estado completado";
          document.getElementById("estado-timeout").textContent =
            "✅ Timeout completado";
          document.getElementById("btn-cancelar-timeout").disabled = true;

          log("✅ Timeout completado después de 5 segundos");
        } catch (error) {
          if (error.name === "AbortError") {
            document.getElementById("estado-timeout").className =
              "estado cancelado";
            document.getElementById("estado-timeout").textContent =
              "🚫 Timeout cancelado";
            log("🚫 Timeout cancelado por el usuario");
          } else {
            document.getElementById("estado-timeout").className =
              "estado error";
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
        document.getElementById(`estado-${id}`).textContent =
          "🔄 Descargando...";

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
            document.getElementById(`estado-${id}`).textContent =
              "🚫 Cancelada";
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
        log("\n🚀 EJEMPLO AVANZADO: Búsqueda en Tiempo Real con Cancelación");

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
    </script>
  </body>
</html>
```

## 🎯 **Características Clave de AbortController**

### ✅ **Ventajas:**

- **Cancelación precisa:** Cancela exactamente lo que quieres
- **Múltiples operaciones:** Un controller puede cancelar muchas operaciones
- **Reutilizable:** Puedes crear nuevos controllers después de abortar
- **Estándar moderno:** Soporte nativo en navegadores modernos

### 🔧 **Cómo Funciona:**

```javascript
// 1. Crear controller y signal
const controller = new AbortController();
const signal = controller.signal;

// 2. Pasar signal a operaciones compatibles
fetch(url, { signal });
someAsyncFunction(signal);

// 3. Escuchar cancelación
signal.addEventListener("abort", () => {
  console.log("¡Operación cancelada!");
});

// 4. Cancelar cuando sea necesario
controller.abort(); // Dispara el evento 'abort'
```

## 🛠️ **Operaciones que Soportan AbortController**

### **1. Fetch API**

```javascript
const controller = new AbortController();

fetch("/api/data", { signal: controller.signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Fetch cancelado");
    }
  });

// Cancelar la petición
controller.abort();
```

### **2. Promesas Personalizadas**

```javascript
function operacionCancelable(signal) {
  return new Promise((resolve, reject) => {
    // Verificar si ya fue cancelado
    if (signal.aborted) {
      reject(new DOMException("Abortado", "AbortError"));
      return;
    }

    const timeoutId = setTimeout(() => {
      resolve("Operación completada");
    }, 5000);

    // Escuchar cancelación
    signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Abortado", "AbortError"));
    });
  });
}
```

### **3. Event Listeners**

```javascript
// También se puede usar para remover event listeners
const controller = new AbortController();

element.addEventListener(
  "click",
  () => {
    console.log("Click!");
  },
  { signal: controller.signal }
);

// Esto removerá el event listener
controller.abort();
```

## 🎯 **Casos de Uso Prácticos**

### **1. Búsqueda en Tiempo Real**

```javascript
let searchController = null;

async function buscar(termino) {
  // Cancelar búsqueda anterior
  if (searchController) {
    searchController.abort();
  }

  searchController = new AbortController();

  try {
    const resultados = await fetch(`/api/search?q=${termino}`, {
      signal: searchController.signal,
    });
    mostrarResultados(await resultados.json());
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error de búsqueda:", error);
    }
  }
}
```

### **2. Timeouts con Cancelación**

```javascript
function timeout(ms, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);

    signal.addEventListener("abort", () => {
      clearTimeout(timeoutId);
      reject(new DOMException("Timeout cancelado", "AbortError"));
    });

    if (signal.aborted) {
      clearTimeout(timeoutId);
      reject(new DOMException("Timeout cancelado", "AbortError"));
    }
  });
}
```

### **3. Múltiples Peticiones con Cancelación Global**

```javascript
class GestionadorPeticiones {
  constructor() {
    this.controller = new AbortController();
  }

  async hacerPeticiones(urls) {
    const promesas = urls.map((url) =>
      fetch(url, { signal: this.controller.signal })
    );

    return Promise.all(promesas);
  }

  cancelarTodas() {
    this.controller.abort();
    this.controller = new AbortController(); // Nuevo para próximas peticiones
  }
}
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

## 🧩 **¿Qué es el Retry Automático?**

Imagina que intentas llamar por teléfono:

### 📞 **Ejemplo del mundo real:**

- **Sin retry:** Llamas una vez, si no contestan, te rindes
- **Con retry:** Llamas, si no contestan, esperas 5 segundos y vuelves a llamar... hasta 3 veces

### 💻 **Traducción a JavaScript:**

El **retry automático** es un patrón que reintenta una operación fallida automáticamente, usualmente con un delay entre intentos.

## 🔧 **Patrón Básico de Retry**

```javascript
async function conReintentos(operacion, maxReintentos = 3) {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      console.log(`🔄 Intento ${intento} de ${maxReintentos}`);
      const resultado = await operacion();
      return resultado; // ¡Éxito! Salimos del bucle
    } catch (error) {
      console.log(`❌ Intento ${intento} falló: ${error.message}`);

      // Si es el último intento, relanzamos el error
      if (intento === maxReintentos) {
        throw new Error(`Todos los intentos fallaron: ${error.message}`);
      }

      // Esperamos antes del siguiente intento
      console.log(`⏳ Esperando antes del siguiente intento...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * intento));
    }
  }
}
```

## 💻 **Demo Interactivo: Retry Automático en Acción**

Aquí tienes un ejemplo completo que puedes probar:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Retry Automático - Reintentos Inteligentes</title>
    <style>
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
    </style>
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

    <script>
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
            log(
              `✅ ¡Éxito en el intento ${intento}! Tiempo total: ${tiempoTotal}ms`
            );

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
              callbackProgreso(
                intento,
                "reintento",
                `⏳ Esperando ${delayMs}ms...`
              );
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
          log(`\n📊 Probando estrategia: ${estrategia.toUpperCase()}`);

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

        log("\n📈 COMPARANDO ESTRATEGIAS DE BACKOFF");

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
        log("\n🌐 EJEMPLO CON API REAL (simulado)");

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
          log(`\n🔗 Llamando a ${endpoint}...`);

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
          "\n💡 En una app real, esto evita que errores temporales afecten al usuario"
        );
      }

      // ==================== EJEMPLO AVANZADO: RETRY CON CIRCUIT BREAKER ====================
      function crearRetryAvanzado() {
        log("\n🛡️ EJEMPLO AVANZADO: Retry con Circuit Breaker");

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
                log(
                  `🔧 ${contexto} - Intento ${intento}/${this.maxReintentos}`
                );
                const resultado = await operacion();

                this.estadisticas.exitos++;
                log(`✅ ${contexto} exitosa en intento ${intento}`);

                return resultado;
              } catch (error) {
                this.estadisticas.fallos++;
                this.estadisticas.reintentos++;

                log(
                  `❌ ${contexto} falló en intento ${intento}: ${error.message}`
                );

                if (intento === this.maxReintentos) {
                  log(`💥 ${contexto}: Todos los intentos fallaron`);
                  throw error;
                }

                // Backoff exponencial con jitter (aleatoriedad)
                const delay = this.calcularDelayConJitter(intento);
                log(
                  `⏳ ${contexto}: Esperando ${delay}ms antes del reintento...`
                );

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
        const operacionCritica = crearOperacionInestable(
          0.25,
          "Operación crítica"
        );

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
    </script>
  </body>
</html>
```

## 🎯 **Estrategias de Backoff (Espera entre Reintentos)**

### **1. Backoff Lineal**

```javascript
// Tiempo de espera constante: 1s, 2s, 3s...
function calcularDelayLineal(intento, delayBase) {
  return delayBase * intento;
}
```

### **2. Backoff Exponencial**

```javascript
// Tiempo se duplica: 1s, 2s, 4s, 8s...
function calcularDelayExponencial(intento, delayBase) {
  return delayBase * Math.pow(2, intento - 1);
}
```

### **3. Backoff Fibonacci**

```javascript
// Secuencia Fibonacci: 1s, 1s, 2s, 3s, 5s...
function calcularDelayFibonacci(intento, delayBase) {
  const fib = [1, 1, 2, 3, 5, 8, 13, 21];
  return delayBase * (fib[intento - 1] || 21);
}
```

### **4. Backoff con Jitter (Aleatoriedad)**

```javascript
// Agrega aleatoriedad para evitar sincronización
function calcularDelayConJitter(intento, delayBase) {
  const baseDelay = delayBase * Math.pow(2, intento - 1);
  const jitter = baseDelay * 0.2 * Math.random(); // ±20%
  return baseDelay + jitter;
}
```

## 🔧 **Patrón Avanzado: Retry con Circuit Breaker**

```javascript
class RetryAvanzado {
  constructor(maxReintentos = 3, delayBase = 1000) {
    this.maxReintentos = maxReintentos;
    this.delayBase = delayBase;
    this.circuitState = "CLOSED"; // OPEN, HALF_OPEN, CLOSED
  }

  async ejecutar(operacion) {
    if (this.circuitState === "OPEN") {
      throw new Error("Circuit breaker abierto - no se permiten operaciones");
    }

    for (let intento = 1; intento <= this.maxReintentos; intento++) {
      try {
        const resultado = await operacion();
        this.registrarExito();
        return resultado;
      } catch (error) {
        if (this.debeAbirCircuitBreaker(error)) {
          this.circuitState = "OPEN";
          setTimeout(() => (this.circuitState = "HALF_OPEN"), 30000); // Reintentar después de 30s
        }

        if (intento === this.maxReintentos) throw error;

        await this.calcularDelay(intento);
      }
    }
  }

  debeAbirCircuitBreaker(error) {
    // Abrir circuit breaker después de muchos errores consecutivos
    return error.message.includes("500") || error.message.includes("Timeout");
  }

  registrarExito() {
    if (this.circuitState === "HALF_OPEN") {
      this.circuitState = "CLOSED";
    }
  }
}
```

## 🎯 **Casos de Uso Prácticos**

### **1. Peticiones HTTP con Fetch**

```javascript
async function fetchConReintentos(url, options = {}, maxReintentos = 3) {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (intento === maxReintentos) throw error;

      console.log(`Reintento ${intento} falló, esperando...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * intento));
    }
  }
}
```

### **2. Conexiones de Base de Datos**

```javascript
async function conectarBDConReintentos(config, maxReintentos = 5) {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const conexion = await database.connect(config);
      console.log(`✅ Conexión a BD exitosa en intento ${intento}`);
      return conexion;
    } catch (error) {
      console.log(`❌ Intento ${intento} falló: ${error.message}`);

      if (intento === maxReintentos) {
        throw new Error(
          `No se pudo conectar a la BD después de ${maxReintentos} intentos`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 2000 * intento));
    }
  }
}
```

### **3. Procesamiento de Archivos**

```javascript
async function procesarArchivoConReintentos(rutaArchivo, maxReintentos = 3) {
  for (let intento = 1; intento <= maxReintentos; intento++) {
    try {
      const contenido = await fs.promises.readFile(rutaArchivo, "utf8");
      return JSON.parse(contenido);
    } catch (error) {
      if (error.code === "ENOENT" && intento < maxReintentos) {
        // Archivo no existe, esperar y reintentar (útil para archivos en proceso de escritura)
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }

      if (intento === maxReintentos) throw error;
    }
  }
}
```

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

---

## 🔍 **CONCEPTOS QUE FALTAN (Pero son importantes)**

### **1. 🚨 ERROR HANDLING AVANZADO**

```javascript
// Error boundaries, global error handlers, graceful degradation
window.addEventListener("unhandledrejection", (event) => {
  console.log("Promesa rechazada no manejada:", event.reason);
  event.preventDefault();
});
```

### **2. 🔄 PATRONES DE CONCURRENCIA**

```javascript
// Limitación de concurrencia, semáforos
async function conLimiteConcurrencia(tareas, limite = 3) {
  // Ejecutar máximo 3 tareas a la vez
}
```

### **3. 📡 STREAMS Y DATA FLOW**

```javascript
// Para manejar datos en tiempo real, grandes volúmenes
fetch("/api/datos-grandes").then((response) => {
  const reader = response.body.getReader();
  // Procesar datos en chunks
});
```

### **4. 🛡️ CIRCUIT BREAKER PATTERN**

```javascript
// Más avanzado que retry - evita colapsar servicios caídos
class CircuitBreaker {
  // Estado: OPEN, HALF_OPEN, CLOSED
}
```

### **5. ⚡ PERFORMANCE Y OPTIMIZACIÓN**

```javascript
// Debouncing, throttling para eventos
function debounce(func, wait) {
  // Agrupar múltiples llamadas
}
```

### **6. 🔗 COMPOSICIÓN DE PROMESAS AVANZADA**

```javascript
// Promise.allSettled(), Promise.any(), encadenamiento complejo
```

### **7. 🌐 ASINCRONÍA EN NODE.JS**

```javascript
// nextTick, setImmediate, streams de Node.js
process.nextTick(() => {
  // Ejecutar después del event loop actual
});
```

---

## 🚀 **PROPUESTA DE CONTINUACIÓN**

**3 caminos**:

### **Opción 1: 🎯 PROFUNDIZAR EN LO ESENCIAL** (Recomendado)

- **Error handling avanzado**
- **Limitación de concurrencia**
- **Debouncing/throttling**

### **Opción 2: 🛠️ PATRONES DE DISEÑO**

- **Circuit Breaker**
- **Observer Pattern con async**
- **Pub/Sub asincrónico**

### **Opción 3: 🌐 ECOSISTEMA**

- **Asincronía en Node.js**
- **Web Workers**
- **Service Workers**
