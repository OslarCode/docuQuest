# Asincronía en Node.js ES Modules

## ¿Por qué es tan importante la asincronía en Node.js?

Node.js fue diseñado para ser **rápido y eficiente**, pero no porque tenga múltiples hilos como otros lenguajes. Lo que lo hace especial es su capacidad para **hacer muchas cosas al mismo tiempo sin bloquearse**, gracias a un modelo de ejecución basado en eventos y asincronía.

Este módulo te enseñará cómo funcionan los **callbacks**, las **promesas** y el sistema de ejecución conocido como **event loop**. También aprenderás a trabajar con funciones asíncronas modernas como `async/await` de forma clara y progresiva, usando la sintaxis moderna de ES Modules.

## Configuración inicial para ES Modules

Para seguir este módulo, asegúrate de tener configurado ES Modules en tu proyecto:

```json
// package.json
{
  "name": "asincronia-node",
  "type": "module",
  "scripts": {
    "dev": "node --watch ejemplos/callbacks.js"
  }
}
```

## Callback: el punto de partida

En Node.js, muchas funciones que acceden al sistema (como leer un archivo) **no se ejecutan inmediatamente**, sino que **se programan para ejecutarse después**. Esto se hace mediante callbacks: funciones que se ejecutan cuando otra tarea termina.

Veamos un ejemplo práctico leyendo un archivo de forma asíncrona con ES Modules:

```jsx
// ejemplos/lectura-callback.js
import { readFile } from "fs";

// Lectura de archivo con callback tradicional
readFile("ejemplo.txt", "utf8", (error, datos) => {
  if (error) {
    console.error("Error al leer el archivo:", error.message);
    return;
  }
  console.log("Contenido del archivo:", datos);
});

console.log("Archivo solicitado. Esperando resultados...");
// Esta línea se ejecuta inmediatamente, antes de que el archivo se lea
```

**Características importantes de los callbacks:**

- No bloquean el hilo principal
- Reciben error como primer parámetro (convención "error-first")
- Se ejecutan cuando la operación asíncrona finaliza

## El problema del "callback hell" y cómo identificarlo

Aunque los callbacks son fundamentales, cuando los anidas demasiado se vuelven difíciles de leer y mantener. A esto se le llama **callback hell** o "pirámide de la muerte".

```jsx
// ejemplos/callback-hell.js
import { readFile } from "fs";

// Ejemplo de callback hell - EVITAR ESTE PATRÓN
readFile("uno.txt", "utf8", (err1, data1) => {
  if (err1) {
    console.error("Error leyendo uno.txt:", err1);
    return;
  }

  readFile("dos.txt", "utf8", (err2, data2) => {
    if (err2) {
      console.error("Error leyendo dos.txt:", err2);
      return;
    }

    readFile("tres.txt", "utf8", (err3, data3) => {
      if (err3) {
        console.error("Error leyendo tres.txt:", err3);
        return;
      }

      console.log("Todos los archivos leídos:");
      console.log("Uno:", data1);
      console.log("Dos:", data2);
      console.log("Tres:", data3);
    });
  });
});
```

**Problemas del callback hell:**

- Código difícil de leer y mantener
- Manejo repetitivo de errores
- Dificultad para depurar
- Complicado agregar nuevas funcionalidades

## Promesas: una evolución natural

Las promesas son objetos que representan el resultado eventual (éxito o fracaso) de una operación asíncrona. Proporcionan una alternativa más limpia y manejable a los callbacks.

### Promesas con el módulo fs/promises

```jsx
// ejemplos/promesas-basicas.js
import { readFile } from "fs/promises";

// Lectura con promesas usando .then() y .catch()
readFile("ejemplo.txt", "utf8")
  .then((datos) => {
    console.log("Contenido del archivo:", datos);
    return datos.length; // Puedes encadenar operaciones
  })
  .then((longitud) => {
    console.log("Longitud del contenido:", longitud);
  })
  .catch((error) => {
    console.error("Error al leer el archivo:", error.message);
  });

console.log("Leyendo archivo con promesas...");
```

### Encadenamiento de promesas

```jsx
// ejemplos/encadenamiento-promesas.js
import { readFile, writeFile } from "fs/promises";

function procesarArchivos() {
  return readFile("origen.txt", "utf8")
    .then((contenido) => {
      console.log("Archivo leído, procesando...");
      const contenidoProcesado = contenido.toUpperCase();
      return writeFile("destino.txt", contenidoProcesado);
    })
    .then(() => {
      console.log("Archivo procesado y guardado exitosamente");
      return readFile("destino.txt", "utf8");
    })
    .then((contenidoFinal) => {
      console.log("Contenido final:", contenidoFinal);
    })
    .catch((error) => {
      console.error("Error en el proceso:", error.message);
    });
}

procesarArchivos();
```

### Múltiples promesas simultáneas

```jsx
// ejemplos/promesas-paralelas.js
import { readFile } from "fs/promises";

// Promise.all - ejecuta múltiples promesas en paralelo
Promise.all([
  readFile("uno.txt", "utf8"),
  readFile("dos.txt", "utf8"),
  readFile("tres.txt", "utf8"),
])
  .then((resultados) => {
    console.log("Todos los archivos leídos:");
    resultados.forEach((contenido, index) => {
      console.log(`Archivo ${index + 1}:`, contenido);
    });
  })
  .catch((error) => {
    console.error("Error leyendo archivos:", error.message);
  });

// Promise.allSettled - espera a que todas se resuelvan o rechacen
Promise.allSettled([
  readFile("uno.txt", "utf8"),
  readFile("archivo-inexistente.txt", "utf8"),
  readFile("tres.txt", "utf8"),
]).then((resultados) => {
  console.log("Resultados de todas las promesas:");
  resultados.forEach((resultado, index) => {
    if (resultado.status === "fulfilled") {
      console.log(`Promesa ${index + 1}: Éxito`);
    } else {
      console.log(`Promesa ${index + 1}: Error -`, resultado.reason.message);
    }
  });
});
```

## Async/Await: la evolución moderna

`async/await` es una forma moderna de trabajar con promesas que hace que el código asíncrono se lea como código síncrono, manteniendo todas las ventajas de la asincronía.

### Sintaxis básica de async/await

```jsx
// ejemplos/async-await-basico.js
import { readFile } from "fs/promises";

// Función async siempre retorna una promesa
async function leerYProcesarArchivo() {
  try {
    // await pausa la ejecución hasta que la promesa se resuelve
    const datos = await readFile("ejemplo.txt", "utf8");
    console.log("Contenido del archivo:", datos);

    // Puedes usar múltiples await en secuencia
    const longitud = datos.length;
    console.log("Longitud del contenido:", longitud);

    return datos; // Se convierte automáticamente en promesa resuelta
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    throw error; // Propaga el error
  }
}

// Uso de la función async
leerYProcesarArchivo()
  .then((resultado) => {
    console.log("Proceso completado con resultado:", resultado);
  })
  .catch((error) => {
    console.error("Error en el proceso:", error.message);
  });
```

### Múltiples operaciones con async/await

```jsx
// ejemplos/async-await-avanzado.js
import { readFile, writeFile, access } from "fs/promises";

async function procesarMultiplesArchivos() {
  try {
    console.log("Iniciando procesamiento de archivos...");

    // Operaciones secuenciales
    const archivo1 = await readFile("uno.txt", "utf8");
    const archivo2 = await readFile("dos.txt", "utf8");

    console.log("Archivo 1:", archivo1);
    console.log("Archivo 2:", archivo2);

    // Combinar contenido
    const contenidoCombinado = archivo1 + "\\n" + archivo2;

    // Guardar resultado
    await writeFile("combinado.txt", contenidoCombinado);
    console.log("Archivos combinados y guardados exitosamente");

    return {
      archivo1: archivo1.length,
      archivo2: archivo2.length,
      combinado: contenidoCombinado.length,
    };
  } catch (error) {
    console.error("Error en el procesamiento:", error.message);
    throw error;
  }
}

// Ejecutar la función
procesarMultiplesArchivos()
  .then((estadisticas) => {
    console.log("Estadísticas del proceso:", estadisticas);
  })
  .catch((error) => {
    console.error("Error general:", error.message);
  });
```

### Operaciones paralelas con async/await

```jsx
// ejemplos/async-await-paralelo.js
import { readFile } from "fs/promises";

async function leerArchivosEnParalelo() {
  try {
    console.log("Leyendo archivos en paralelo...");

    // Iniciar todas las operaciones simultáneamente
    const promesaUno = readFile("uno.txt", "utf8");
    const promesaDos = readFile("dos.txt", "utf8");
    const promesaTres = readFile("tres.txt", "utf8");

    // Esperar a que todas terminen
    const [contenidoUno, contenidoDos, contenidoTres] = await Promise.all([
      promesaUno,
      promesaDos,
      promesaTres,
    ]);

    console.log("Todos los archivos leídos exitosamente");
    console.log("Uno:", contenidoUno);
    console.log("Dos:", contenidoDos);
    console.log("Tres:", contenidoTres);

    return {
      uno: contenidoUno,
      dos: contenidoDos,
      tres: contenidoTres,
    };
  } catch (error) {
    console.error("Error leyendo archivos en paralelo:", error.message);
    throw error;
  }
}

leerArchivosEnParalelo();
```

## ¿Cómo funciona el Event Loop en Node.js?

Node.js no ejecuta varias operaciones "a la vez" como lo haría un lenguaje multihilo. En su lugar, utiliza un único hilo que sigue un ciclo de eventos llamado **Event Loop**. Este sistema es extremadamente eficiente para operaciones I/O.

### Fases del Event Loop:

1. **Timers**: Ejecuta callbacks de `setTimeout()` y `setInterval()`
2. **Pending Callbacks**: Ejecuta callbacks de operaciones del sistema
3. **Poll**: Recupera nuevos eventos I/O y ejecuta sus callbacks
4. **Check**: Ejecuta callbacks de `setImmediate()`
5. **Close**: Ejecuta callbacks de eventos 'close'

### Ejemplo práctico del Event Loop

```jsx
// ejemplos/event-loop-demo.js
import { readFile } from "fs/promises";

console.log("1. Inicio del script");

setTimeout(() => {
  console.log("3. Timeout ejecutado");
}, 0);

Promise.resolve().then(() => {
  console.log("4. Microtarea de promesa");
});

readFile("ejemplo.txt", "utf8").then(() => {
  console.log("5. Archivo leído (operación I/O)");
});

console.log("2. Fin del script sincrónico");

// Salida esperada:
// 1. Inicio del script
// 2. Fin del script sincrónico
// 4. Microtarea de promesa
// 3. Timeout ejecutado
// 5. Archivo leído (operación I/O)
```

## Ejercicio práctico: Gestor de archivos asíncrono

Vamos a crear un gestor de archivos que demuestre todos los conceptos aprendidos:

```jsx
// ejercicios/gestor-archivos.js
import { readFile, writeFile, readdir, stat } from "fs/promises";
import { join } from "path";

class GestorArchivos {
  constructor(directorio) {
    this.directorio = directorio;
  }

  // Listar archivos con información de tamaño
  async listarArchivos() {
    try {
      const archivos = await readdir(this.directorio);

      const infoArchivos = await Promise.all(
        archivos.map(async (archivo) => {
          const rutaCompleta = join(this.directorio, archivo);
          const info = await stat(rutaCompleta);

          return {
            nombre: archivo,
            tamaño: info.size,
            esDirectorio: info.isDirectory(),
            modificado: info.mtime,
          };
        })
      );

      return infoArchivos;
    } catch (error) {
      throw new Error(`Error listando archivos: ${error.message}`);
    }
  }

  // Leer y procesar múltiples archivos
  async procesarArchivos(extension = ".txt") {
    try {
      const archivos = await this.listarArchivos();
      const archivosTexto = archivos.filter(
        (archivo) => archivo.nombre.endsWith(extension) && !archivo.esDirectorio
      );

      console.log(
        `Procesando ${archivosTexto.length} archivos ${extension}...`
      );

      const contenidos = await Promise.all(
        archivosTexto.map(async (archivo) => {
          const rutaCompleta = join(this.directorio, archivo.nombre);
          const contenido = await readFile(rutaCompleta, "utf8");

          return {
            nombre: archivo.nombre,
            contenido: contenido,
            lineas: contenido.split("\\n").length,
            palabras: contenido.split(/\\s+/).length,
          };
        })
      );

      // Generar reporte
      const reporte = {
        totalArchivos: contenidos.length,
        totalLineas: contenidos.reduce(
          (sum, archivo) => sum + archivo.lineas,
          0
        ),
        totalPalabras: contenidos.reduce(
          (sum, archivo) => sum + archivo.palabras,
          0
        ),
        archivos: contenidos,
      };

      // Guardar reporte
      await writeFile(
        join(this.directorio, "reporte.json"),
        JSON.stringify(reporte, null, 2)
      );

      return reporte;
    } catch (error) {
      throw new Error(`Error procesando archivos: ${error.message}`);
    }
  }
}

// Uso del gestor de archivos
async function main() {
  const gestor = new GestorArchivos("./archivos-ejemplo");

  try {
    console.log("=== GESTOR DE ARCHIVOS ASÍNCRONO ===");

    const archivos = await gestor.listarArchivos();
    console.log("Archivos encontrados:", archivos.length);

    const reporte = await gestor.procesarArchivos(".txt");
    console.log("Reporte generado:");
    console.log("- Total archivos:", reporte.totalArchivos);
    console.log("- Total líneas:", reporte.totalLineas);
    console.log("- Total palabras:", reporte.totalPalabras);

    console.log("Reporte guardado en reporte.json");
  } catch (error) {
    console.error("Error en la aplicación:", error.message);
  }
}

// Ejecutar la aplicación
main();
```

## Patrones avanzados y mejores prácticas

### 1. Manejo robusto de errores

```jsx
// ejemplos/manejo-errores.js
import { readFile } from "fs/promises";

async function leerConReintentos(rutaArchivo, reintentos = 3) {
  for (let intento = 1; intento <= reintentos; intento++) {
    try {
      const contenido = await readFile(rutaArchivo, "utf8");
      return contenido;
    } catch (error) {
      if (intento === reintentos) {
        throw new Error(
          `Falló después de ${reintentos} intentos: ${error.message}`
        );
      }
      console.log(`Intento ${intento} falló, reintentando...`);
      // Esperar antes del reintento
      await new Promise((resolve) => setTimeout(resolve, 1000 * intento));
    }
  }
}

// Uso con manejo de errores específico
leerConReintentos("archivo-importante.txt")
  .then((contenido) => console.log("Éxito:", contenido))
  .catch((error) => console.error("Error crítico:", error.message));
```

### 2. Limitación de operaciones concurrentes

```jsx
// ejemplos/limitacion-concurrencia.js
class LimitadorConcurrencia {
  constructor(maximoConcurrente) {
    this.maximoConcurrente = maximoConcurrente;
    this.cola = [];
    this.ejecutando = 0;
  }

  async ejecutar(operacion) {
    return new Promise((resolve, reject) => {
      this.cola.push({ operacion, resolve, reject });
      this.ejecutarSiguiente();
    });
  }

  ejecutarSiguiente() {
    if (this.ejecutando >= this.maximoConcurrente || this.cola.length === 0) {
      return;
    }

    const { operacion, resolve, reject } = this.cola.shift();
    this.ejecutando++;

    Promise.resolve(operacion())
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.ejecutando--;
        this.ejecutarSiguiente();
      });
  }
}

// Uso del limitador
const limitador = new LimitadorConcurrencia(2);

async function tareaSimulada(id, duracion) {
  console.log(`Iniciando tarea ${id}`);
  await new Promise((resolve) => setTimeout(resolve, duracion));
  console.log(`Completando tarea ${id}`);
  return `Resultado-${id}`;
}

// Ejecutar múltiples tareas con limitación
Promise.all([
  limitador.ejecutar(() => tareaSimulada(1, 1000)),
  limitador.ejecutar(() => tareaSimulada(2, 500)),
  limitador.ejecutar(() => tareaSimulada(3, 800)),
  limitador.ejecutar(() => tareaSimulada(4, 300)),
]).then((resultados) => {
  console.log("Todas las tareas completadas:", resultados);
});
```

## Conclusión del módulo

Has aprendido la evolución completa de la asincronía en Node.js, desde los callbacks básicos hasta los patrones modernos con async/await. Comprendes cómo Node.js maneja operaciones no bloqueantes a través del Event Loop y cómo escribir código asíncrono eficiente y mantenible.

**Puntos clave recordatorios:**

- Usa **async/await** para código más legible
- Aprovecha **Promise.all** para operaciones paralelas
- Implementa **manejo robusto de errores** con try/catch
- Considera **limitación de concurrencia** para operaciones masivas
- Entiende el **Event Loop** para optimizar el rendimiento

## Recursos complementarios

- [Documentación oficial de Node.js sobre Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [MDN Web Docs: async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Web Docs: Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Artículo: JavaScript Visualized - Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

Este conocimiento te prepara para construir aplicaciones Node.js escalables y eficientes, capaces de manejar múltiples operaciones I/O sin bloquear el hilo principal.
