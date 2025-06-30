# Promesas

## 🟢 ¿Qué es una Promesa?

Una **promesa** es un objeto en JavaScript que **representa el resultado futuro** de una operación asincrónica.

Es como una **promesa real**: algo que **todavía no ha pasado**, pero que **puede cumplirse o fallar** más adelante.

> 🔁 Las promesas permiten escribir código asincrónico de forma más ordenada y legible que los callbacks anidados.
> 

## 🧱 Estados de una Promesa

Una promesa puede estar en **tres estados**:

1. **Pending (pendiente)** – Aún no se ha resuelto ni rechazado.
2. **Fulfilled (cumplida)** – La operación se completó con éxito.
3. **Rejected (rechazada)** – La operación falló por algún motivo.

## ✅ Ejemplo real: Simular una tarea que tarda un poco

```jsx
// Creamos una promesa que simula una operación asincrónica
const tareaLenta = new Promise((resolve, reject) => {
  console.log("⏳ Iniciando tarea...");

  setTimeout(() => {
    const exito = Math.random() > 0.3; // 70% de probabilidad de éxito

    if (exito) {
      resolve("🎉 Tarea completada con éxito");
    } else {
      reject("💥 Algo salió mal");
    }
  }, 2000); // Simula un retardo de 2 segundos
});

// Manejo de la promesa con .then() y .catch()
tareaLenta
  .then(resultado => {
    console.log("✅ Resultado:", resultado);
  })
  .catch(error => {
    console.error("❌ Error:", error);
  });

```

### 🔍 Explicación línea por línea

- `new Promise((resolve, reject) => { ... })`: creamos una promesa. Dentro definimos qué pasará si **se resuelve** o si **falla**.
- `setTimeout(...)`: simulamos una tarea que tarda 2 segundos (como una petición a una API).
- `resolve(...)`: indica que la promesa se cumplió (fulfilled).
- `reject(...)`: indica que la promesa falló (rejected).
- `.then(...)`: se ejecuta cuando la promesa se cumple.
- `.catch(...)`: se ejecuta cuando la promesa falla.

## 🟢 Ventajas sobre los callbacks

| Callbacks | Promesas |
| --- | --- |
| Pueden anidarse mal | Encadenamiento ordenado |
| Difícil manejo de errores | `.catch()` centraliza errores |
| No controlan estado | Las promesas tienen estado |

## Creación de Promesas

Para crear una promesa, se utiliza el constructor `Promise`, que toma una función ejecutora (executor) como argumento. Esta función ejecutora recibe dos parámetros: `resolve` y `reject`. La función `resolve` se llama cuando la operación asincrónica se completa con éxito, mientras que `reject` se llama cuando ocurre un error.

**Ejemplo de creación de una promesa:**

```jsx
const miPromesa = new Promise((resolve, reject) => {
  let operacionExitosa = true; // Simulación de una operación asincrónica

  if (operacionExitosa) {
    resolve("Operación completada con éxito");
  } else {
    reject("Ocurrió un error");
  }
});

```

En este ejemplo, `miPromesa` es una promesa que se resolverá con éxito si `operacionExitosa` es `true`, o se rechazará con un error si `operacionExitosa` es `false`.

## ✅ Ejemplo real: Simular un pedido de comida

Vamos a crear una función que simula pedir una pizza a domicilio. Tarda 2 segundos y puede **tener éxito** o **fallar**.

```jsx
function pedirPizza() {
  return new Promise((resolve, reject) => {
    console.log("🍕 Pedido recibido, preparando pizza...");

    setTimeout(() => {
      const exito = Math.random() > 0.2; // 80% de probabilidad de éxito

      if (exito) {
        resolve("✅ ¡Tu pizza está lista!");
      } else {
        reject("❌ Lo sentimos, no quedan ingredientes.");
      }
    }, 2000);
  });
}

// Usamos la promesa
pedirPizza()
  .then(mensaje => {
    console.log(mensaje); // Se ejecuta si todo va bien
  })
  .catch(error => {
    console.error(error); // Se ejecuta si algo falla
  });

```

### 🔍 Explicación

```jsx
function pedirPizza() {
  return new Promise((resolve, reject) => {

```

🧱 Creamos una función que retorna una promesa. Dentro tenemos dos funciones: `resolve` (si todo va bien) y `reject` (si algo falla).

```jsx
    console.log("🍕 Pedido recibido, preparando pizza...");

```

🖨️ Mensaje para mostrar que el pedido comenzó.

```jsx
    setTimeout(() => {

```

⏳ Simula que la tarea toma 2 segundos (como un pedido real).

```jsx
      const exito = Math.random() > 0.2;

```

🎲 Usamos un valor aleatorio para decidir si el pedido fue exitoso (80% de probabilidad).

```jsx
      if (exito) {
        resolve("✅ ¡Tu pizza está lista!");

```

✅ Si hay éxito, llamamos a `resolve` con el mensaje.

```jsx
      } else {
        reject("❌ Lo sentimos, no quedan ingredientes.");
      }

```

❌ Si falla, llamamos a `reject`.

```jsx
    }, 2000);
  });
}

```

⏱️ Terminamos el `setTimeout` y cerramos la promesa.

## 2. Estados de una Promesa

Las promesas pueden estar en uno de los siguientes estados:

### 1. `pending` (pendiente)

Este es el estado inicial de una promesa. En este estado, la promesa ni se ha cumplido ni se ha rechazado. Está esperando a que la operación asincrónica se complete o falle.

**Ejemplo:**

```jsx
const promesaPendiente = new Promise((resolve, reject) => {
  // La promesa está en estado pendiente
});

```

## ✅ Ejemplo real de promesa en estado `pending` (pendiente)

```jsx
// Función que simula consultar una base de datos
function consultarBaseDeDatos() {
  return new Promise((resolve, reject) => {
    // Mostramos un mensaje al comenzar la operación asincrónica
    console.log("🔍 Consultando la base de datos...");

    // Simulamos una espera de 3 segundos antes de obtener un resultado
    setTimeout(() => {
      // Llamamos a resolve después del tiempo simulado (éxito)
      resolve("📦 Resultado: datos encontrados");
    }, 3000); // Tiempo en milisegundos (3 segundos)
  });
}

// Llamamos a la función que devuelve una promesa
const promesa = consultarBaseDeDatos();

// En este punto la promesa está en estado "pending" (pendiente)
// porque aún no se ha cumplido ni rechazado
console.log("🟡 Estado actual de la promesa:", promesa);

// Registramos lo que debe ocurrir cuando la promesa se cumple
promesa.then(resultado => {
  // Esto se ejecuta cuando se llama a resolve()
  console.log("✅ Promesa cumplida:", resultado);
});

```

### 🔍 Resultado esperado en consola:

1. Inmediatamente:
    
    ```
    🔍 Consultando la base de datos...
    🟡 Estado actual de la promesa: Promise {<pending>}
    
    ```
    
2. Tres segundos después:
    
    ```
    ✅ Promesa cumplida: 📦 Resultado: datos encontrados
    
    ```
    

## 2. `fulfilled` (cumplido)

Una promesa pasa a este estado cuando la operación asincrónica se completa con éxito y se llama a la función `resolve`. En este estado, la promesa devuelve un valor que puede ser manejado por el método `.then()`.

**Ejemplo:**

```jsx
const promesaCumplida = new Promise((resolve, reject) => {
  resolve("Operación exitosa");
});

```

## ✅ Ejemplo real de promesa en estado `fulfilled`

```jsx
// Función que simula verificar el stock de un producto
function verificarStock(producto) {
  return new Promise((resolve, reject) => {
    // Mostramos un mensaje indicando el inicio del proceso
    console.log(`🔎 Verificando stock para: ${producto}...`);

    // Simulamos una consulta que tarda 2 segundos
    setTimeout(() => {
      const productosDisponibles = ["camiseta", "zapatillas", "gorra"];

      // Si el producto está en la lista, lo damos por disponible
      if (productosDisponibles.includes(producto)) {
        // Se resuelve la promesa exitosamente (fulfilled)
        resolve(`✅ Stock disponible para ${producto}`);
      } else {
        // En caso contrario, se rechaza (veremos esto luego)
        reject(`❌ No hay stock de ${producto}`);
      }
    }, 2000); // Simulamos una espera de 2 segundos
  });
}

// Llamamos a la función con un producto que sí existe
const promesa = verificarStock("zapatillas");

// En este momento, la promesa está en estado "pending"
// pero luego pasará a "fulfilled" porque el producto sí existe
console.log("🟡 Estado inicial de la promesa:", promesa);

// Manejamos el resultado exitoso con .then()
promesa.then(resultado => {
  // Esta función se ejecuta si la promesa se resuelve (fulfilled)
  console.log("🎉 Promesa cumplida:", resultado);
});

```

### 🧪 ¿Qué se muestra en consola?

Inmediatamente:

```
🔎 Verificando stock para: zapatillas...
🟡 Estado inicial de la promesa: Promise {<pending>}

```

Dos segundos después:

```
🎉 Promesa cumplida: ✅ Stock disponible para zapatillas

```

## 3. `rejected` (rechazado)

Una promesa entra en este estado cuando la operación asincrónica falla y se llama a la función `reject`. En este estado, la promesa devuelve un motivo de rechazo que puede ser manejado por el método `.catch()`.

**Ejemplo:**

```jsx
const promesaRechazada = new Promise((resolve, reject) => {
  reject("Ocurrió un error");
});

```

## ❌ Ejemplo real de promesa en estado `rejected`

```jsx
// Función que simula verificar el stock de un producto
function verificarStock(producto) {
  return new Promise((resolve, reject) => {
    // Mostramos un mensaje indicando el inicio de la verificación
    console.log(`🔎 Verificando stock para: ${producto}...`);

    // Simulamos una operación asincrónica con retraso
    setTimeout(() => {
      const productosDisponibles = ["camiseta", "zapatillas", "gorra"];

      // Si el producto está en la lista, resolvemos la promesa
      if (productosDisponibles.includes(producto)) {
        resolve(`✅ Stock disponible para ${producto}`);
      } else {
        // Si no está disponible, rechazamos la promesa (rejected)
        reject(`❌ No hay stock disponible para ${producto}`);
      }
    }, 2000); // Espera simulada de 2 segundos
  });
}

// Llamamos a la función con un producto que NO está en stock
const promesa = verificarStock("pantalón");

// La promesa está inicialmente en estado "pending"
console.log("🟡 Estado inicial de la promesa:", promesa);

// Manejamos el resultado exitoso con .then()
promesa
  .then(resultado => {
    // Esto se ejecutaría si la promesa se resolviera (no será el caso aquí)
    console.log("🎉 Promesa cumplida:", resultado);
  })
  .catch(error => {
    // Esto se ejecuta cuando la promesa es rechazada (rejected)
    console.log("🚨 Promesa rechazada:", error);
  });

```

### 🧪 Resultado esperado en consola:

Inmediatamente:

```
🔎 Verificando stock para: pantalón...
🟡 Estado inicial de la promesa: Promise {<pending>}

```

Dos segundos después:

```
🚨 Promesa rechazada: ❌ No hay stock disponible para pantalón

```

### 3. Métodos de las Promesas

Las promesas en JavaScript vienen con varios métodos integrados que permiten manejar sus estados y resultados de manera eficiente. Los más importantes son `.then()`, `.catch()`, y `.finally()`.

### Método `.then()`

El método `.then()` se ejecuta cuando la promesa se cumple. Toma hasta dos argumentos: una función que se ejecutará si la promesa se resuelve correctamente, y una función opcional que se ejecutará si la promesa se rechaza.

**Sintaxis:**

```jsx
promesa.then(onFulfilled, onRejected);

```

## ❌ Promesa rechazada manejada con `.then(success, error)`

```jsx
// Función que simula verificar el stock de un producto
function verificarStock(producto) {
  return new Promise((resolve, reject) => {
    // Mostramos un mensaje indicando que comienza la verificación
    console.log(`🔎 Verificando stock para: ${producto}...`);

    // Simulamos una espera de 2 segundos
    setTimeout(() => {
      const productosDisponibles = ["camiseta", "zapatillas", "gorra"];

      // Si el producto existe, resolvemos la promesa
      if (productosDisponibles.includes(producto)) {
        resolve(`✅ Stock disponible para ${producto}`);
      } else {
        // Si no existe, rechazamos la promesa
        reject(`❌ No hay stock disponible para ${producto}`);
      }
    }, 2000);
  });
}

// Llamamos a la función con un producto que NO está en la lista
const promesa = verificarStock("pantalón");

// Estado inicial: pending
console.log("🟡 Estado inicial de la promesa:", promesa);

// Usamos .then() con dos funciones:
// 1. Primera función → se ejecuta si la promesa se resuelve (fulfilled)
// 2. Segunda función → se ejecuta si la promesa es rechazada (rejected)
promesa.then(
  resultado => {
    // Éxito (no se ejecutará en este caso)
    console.log("🎉 Promesa cumplida:", resultado);
  },
  error => {
    // Error (esto sí se ejecutará)
    console.log("🚨 Promesa rechazada:", error);
  }
);

```

### 🧪 Resultado en consola:

Inmediatamente:

```
🔎 Verificando stock para: pantalón...
🟡 Estado inicial de la promesa: Promise {<pending>}

```

Dos segundos después:

```
🚨 Promesa rechazada: ❌ No hay stock disponible para pantalón

```

✅ Este método funciona, pero hoy en día es **más limpio usar `.catch()` separado**, porque separa claramente el flujo de éxito y el de error, especialmente en código encadenado o largo.

¿Quieres ahora ver cómo encadenar varios `.then()` o un ejemplo real con `.finally()`?

### Método `.catch()`

El método `.catch()` se ejecuta cuando la promesa se rechaza. Es un atajo para `.then(null, onRejected)`, proporcionando una forma más clara y concisa de manejar errores.

**Sintaxis:**

```jsx
promesa.catch(onRejected);

```

## ❌ Ejemplo de promesa rechazada con `.catch()` y comentarios línea por línea

```jsx
// Función que simula verificar el stock de un producto
function verificarStock(producto) {
  return new Promise((resolve, reject) => {
    // Mostramos que estamos iniciando la verificación
    console.log(`🔎 Verificando stock para: ${producto}...`);

    // Simulamos una espera asincrónica de 2 segundos
    setTimeout(() => {
      const productosDisponibles = ["camiseta", "zapatillas", "gorra"];

      // Si el producto está disponible, resolvemos la promesa
      if (productosDisponibles.includes(producto)) {
        resolve(`✅ Stock disponible para ${producto}`);
      } else {
        // Si no está disponible, rechazamos la promesa con un mensaje de error
        reject(`❌ No hay stock disponible para ${producto}`);
      }
    }, 2000); // Tiempo de espera simulado
  });
}

// Solicitamos un producto que NO está en la lista (provocará un error)
const promesa = verificarStock("pantalón");

// Estado inicial de la promesa es "pending"
console.log("🟡 Estado inicial de la promesa:", promesa);

// Usamos .then() para manejar el éxito
promesa
  .then(resultado => {
    // Este bloque se ejecutaría si la promesa se resuelve correctamente
    console.log("🎉 Promesa cumplida:", resultado);
  })
  .catch(error => {
    // Este bloque se ejecuta si la promesa es rechazada (rejected)
    console.log("🚨 Promesa rechazada:", error);
  });

```

### 🧪 Resultado en consola:

Al ejecutar el script, verás:

```
🔎 Verificando stock para: pantalón...
🟡 Estado inicial de la promesa: Promise {<pending>}

```

Después de 2 segundos:

```
🚨 Promesa rechazada: ❌ No hay stock disponible para pantalón

```

### Método `.finally()`

El método `.finally()` se ejecuta independientemente de si la promesa se cumple o se rechaza. Es útil para realizar acciones de limpieza o finalizar tareas que deben ejecutarse en cualquier caso.

**Sintaxis:**

```jsx
promesa.finally(onFinally);

```

## 🔄 Promesa con `.finally()`, ejemplo comentado línea por línea

```jsx
// Función que simula verificar el stock de un producto
function verificarStock(producto) {
  return new Promise((resolve, reject) => {
    // Mostramos que empieza el proceso
    console.log(`🔎 Verificando stock para: ${producto}...`);

    // Simulamos un retraso asincrónico (como si fuera una consulta de red)
    setTimeout(() => {
      const productosDisponibles = ["camiseta", "zapatillas", "gorra"];

      // Verificamos si el producto existe en stock
      if (productosDisponibles.includes(producto)) {
        resolve(`✅ Stock disponible para ${producto}`);
      } else {
        reject(`❌ No hay stock disponible para ${producto}`);
      }
    }, 2000); // Espera de 2 segundos simulada
  });
}

// Pedimos un producto que NO está en la lista, así la promesa será rechazada
verificarStock("pantalón")
  .then(resultado => {
    // Se ejecuta si la promesa se resuelve correctamente
    console.log("🎉 Resultado:", resultado);
  })
  .catch(error => {
    // Se ejecuta si la promesa es rechazada
    console.log("🚨 Error:", error);
  })
  .finally(() => {
    // Este bloque se ejecuta siempre, sin importar el resultado de la promesa
    console.log("📦 Verificación finalizada.");
  });

```

### 🧪 Resultado en consola:

```
🔎 Verificando stock para: pantalón...
🚨 Error: ❌ No hay stock disponible para pantalón
📦 Verificación finalizada.

```

Si pruebas con `"gorra"` (que sí está disponible), verás:

```
🔎 Verificando stock para: gorra...
🎉 Resultado: ✅ Stock disponible para gorra
📦 Verificación finalizada.

```

### Uso Avanzado de Promesas

### Encadenamiento de Promesas

Una de las características más poderosas de las promesas es su capacidad para encadenar múltiples operaciones asincrónicas de manera secuencial. Esto se logra devolviendo una nueva promesa en el método `.then()`, permitiendo que las operaciones se ejecuten una tras otra.

**Ejemplo de encadenamiento:**

```jsx
// 🔧 Función que devuelve una promesa para obtener datos desde una URL
function obtenerDatos(url) {
return new Promise((resolve, reject) => {
// Creamos un nuevo objeto XMLHttpRequest para hacer una petición HTTP
const xhr = new XMLHttpRequest();

// Abrimos una petición GET a la URL especificada
xhr.open("GET", url);

// Cuando la respuesta ha sido cargada completamente
xhr.onload = () => {
// Si el estado HTTP es 200 (OK), resolvemos la promesa con la respuesta
if (xhr.status === 200) {
resolve(xhr.responseText);
} else {
// Si no es 200, rechazamos la promesa con un error que incluye el código de estado
reject(new Error(`Error: ${xhr.status}`));
}
};

// Si ocurre un error de red (no se puede conectar al servidor, por ejemplo)
xhr.onerror = () => reject(new Error("Error de red"));

// Enviamos la petición HTTP
xhr.send();
});
}

// 🔁 Encadenamos múltiples llamadas a obtenerDatos, una después de otra

obtenerDatos("[https://api.example.com/datos1](https://api.example.com/datos1)")
.then((datos1) => {
// Cuando se obtienen los datos1, se muestran en consola
console.log("Datos 1 obtenidos:", datos1);

// Luego se hace otra solicitud (datos2)
return obtenerDatos("[https://api.example.com/datos2](https://api.example.com/datos2)");
})
.then((datos2) => {
// Cuando se obtienen los datos2, se muestran en consola
console.log("Datos 2 obtenidos:", datos2);

// Luego se hace otra solicitud (datos3)
return obtenerDatos("[https://api.example.com/datos3](https://api.example.com/datos3)");
})
.then((datos3) => {
// Cuando se obtienen los datos3, se muestran en consola
console.log("Datos 3 obtenidos:", datos3);
})
.catch((error) => {
// Si ocurre algún error en cualquiera de las solicitudes, se captura aquí
console.error("Error al obtener datos:", error);
});
```

En este ejemplo, cada llamada a `obtenerDatos` devuelve una nueva promesa que se encadena en el método `.then()`, permitiendo que las operaciones se realicen en secuencia. Si ocurre un error en cualquier punto del encadenamiento, el método `.catch()` lo manejará.

### Manejo de Errores en Promesas

El manejo adecuado de errores es crucial para aplicaciones robustas. Las promesas ofrecen una forma coherente de manejar errores mediante el método `.catch()`. Además, se pueden manejar errores de manera centralizada en el final de un encadenamiento de promesas, lo que simplifica la gestión de errores en operaciones complejas.

**Ejemplo de manejo de errores centralizado:**

```jsx
// 🔁 Iniciamos una cadena de promesas llamando a obtenerDatos con la primera URL
obtenerDatos("https://api.example.com/datos1")
  .then((datos1) => {
    // ✅ Si la primera solicitud fue exitosa, mostramos los datos1 por consola
    console.log("Datos 1 obtenidos:", datos1);

    // 🔁 Luego devolvemos una nueva promesa para la segunda solicitud
    return obtenerDatos("https://api.example.com/datos2");
  })
  .then((datos2) => {
    // ✅ Si la segunda solicitud fue exitosa, mostramos los datos2 por consola
    console.log("Datos 2 obtenidos:", datos2);

    // 🔁 Luego devolvemos una nueva promesa para la tercera solicitud
    return obtenerDatos("https://api.example.com/datos3");
  })
  .then((datos3) => {
    // ✅ Si la tercera solicitud fue exitosa, mostramos los datos3 por consola
    console.log("Datos 3 obtenidos:", datos3);
  })
  .catch((error) => {
    // ❌ Si ocurre un error en cualquiera de las tres solicitudes, se captura aquí
    console.error("Error durante la obtención de datos:", error);
  });
```

### 🔍 ¿Qué está pasando?

- Cada `.then()` espera que el `.then()` anterior termine correctamente.
- Si una promesa falla (por ejemplo, si `obtenerDatos()` no puede acceder a la URL), se **detiene la cadena** y se ejecuta `.catch()`.
- Este patrón permite manejar múltiples operaciones asincrónicas en **orden secuencial**, sin anidamientos profundos (lo que se conoce como evitar el *callback hell*).

### Patrones Avanzados con Promesas

### Promesas Paralelas con `Promise.all()`

El método `Promise.all()` permite ejecutar múltiples promesas en paralelo y esperar a que todas se resuelvan. Esto es útil para realizar operaciones asincrónicas concurrentes y mejorar el rendimiento.

**Sintaxis:**

```jsx
Promise.all(iterable);

```

**Ejemplo:**

```jsx
// 🔧 Creamos una promesa para obtener datos desde la URL 1
const promesa1 = obtenerDatos("https://api.example.com/datos1");

// 🔧 Creamos una segunda promesa para obtener datos desde la URL 2
const promesa2 = obtenerDatos("https://api.example.com/datos2");

// 🔧 Creamos una tercera promesa para obtener datos desde la URL 3
const promesa3 = obtenerDatos("https://api.example.com/datos3");

// 🔁 Ejecutamos las tres promesas al mismo tiempo usando Promise.all
Promise.all([promesa1, promesa2, promesa3])
  .then((resultados) => {
    // ✅ Si todas las promesas se resuelven correctamente,
    // `resultados` será un array con las respuestas de cada una (en el mismo orden)
    console.log("Todos los datos obtenidos:", resultados);
  })
  .catch((error) => {
    // ❌ Si alguna de las promesas falla, se ejecuta este bloque
    // y se interrumpe el resto del procesamiento
    console.error("Error al obtener datos:", error);
  });
```

En este ejemplo, `Promise.all()` toma un array de promesas y devuelve una nueva promesa que se resuelve cuando todas las promesas del array se han resuelto. Si alguna de las promesas se rechaza, `Promise.all()` se rechaza con el motivo de la primera promesa rechazada.

### Promesas Rápidas con `Promise.race()`

El método `Promise.race()` devuelve una promesa que se resuelve o se rechaza tan pronto como una de las promesas en el iterable se resuelva o se rechace. Esto es útil cuando solo te interesa la primera promesa que se complete, independientemente de su resultado.

**Sintaxis:**

```jsx
Promise.race(iterable);

```

**Ejemplo:**

```jsx
// ⏳ Creamos una promesa que se resolverá después de 2 segundos
const promesaLenta = new Promise((resolve) => 
  setTimeout(() => resolve("Lenta"), 2000)
);

// ⚡ Creamos otra promesa que se resolverá más rápido, después de 1 segundo
const promesaRapida = new Promise((resolve) => 
  setTimeout(() => resolve("Rápida"), 1000)
);

// 🏁 Usamos Promise.race para ejecutar ambas promesas y obtener solo la que se resuelva primero
Promise.race([promesaLenta, promesaRapida])
  .then((resultado) => {
    // ✅ Se ejecuta cuando la promesa más rápida se resuelve primero
    console.log("Promesa ganadora:", resultado); // Mostrará: "Rápida"
  })
  .catch((error) => {
    // ❌ Se ejecuta si la promesa ganadora es rechazada
    console.error("Error:", error);
  });
```

### 🧠 ¿Qué hace `Promise.race()`?

- Ejecuta **todas** las promesas en paralelo.
- **Devuelve solo la primera que se resuelva o se rechace**, ignorando el resto.
- En este caso, `promesaRapida` gana la carrera porque se resuelve en 1 segundo, antes que la lenta.

Este patrón se usa mucho cuando quieres tener un **timeout manual** o cuando lo único que te interesa es **la primera respuesta disponible**, por ejemplo en peticiones a varios servidores espejo (mirrors).

## Conclusión

Las promesas representan un avance significativo en la gestión de la asincronía en JavaScript. Proporcionan una estructura más manejable y coherente para manejar operaciones asincrónicas en comparación con los callbacks tradicionales. Al entender los diferentes estados de una promesa y los métodos asociados como `.then()`, `.catch()`, y `.finally()`, los desarrolladores pueden crear aplicaciones web más eficientes, legibles y mantenibles.

El uso de técnicas avanzadas como el encadenamiento de promesas, el manejo centralizado de errores, y la ejecución de promesas en paralelo con `Promise.all()` o en competición con `Promise.race()`, permite a los desarrolladores abordar operaciones asincrónicas complejas de manera efectiva. En resumen, el dominio de las promesas es esencial para cualquier desarrollador de JavaScript que desee crear aplicaciones web modernas y robustas.

## 🧪 **Ejercicio Práctico: Simulador de Descarga de Archivos con Promesas**

**Objetivo:** Simular la descarga de varios archivos usando Promesas, controlando tiempos, errores, y mostrando los resultados en consola. Aprenderás a:

- Crear promesas manualmente
- Usar `.then()`, `.catch()` y `.finally()`
- Aplicar `Promise.all()` y `Promise.race()`

## 🧩 Paso 1: Crear una función `descargarArchivo(nombre, tiempo, errorProbable)`

```jsx
// 🧱 Función que simula la descarga de un archivo
function descargarArchivo(nombre, tiempo, errorProbable = false) {
  return new Promise((resolve, reject) => {
    console.log(`⏳ Iniciando descarga de: ${nombre}...`);

    // Simulamos el tiempo que tarda en descargarse
    setTimeout(() => {
      if (errorProbable && Math.random() < 0.3) {
        // ❌ Simulamos un fallo en un 30% de los casos si errorProbable es true
        reject(`❌ Error al descargar ${nombre}`);
      } else {
        // ✅ Si todo va bien, resolvemos la promesa con el nombre del archivo
        resolve(`✅ Archivo descargado: ${nombre}`);
      }
    }, tiempo);
  });
}

```

## ✅ Paso 2: Simular descargas con `.then()` y `.catch()`

```jsx
// Descargamos un solo archivo usando Promesas básicas
descargarArchivo("video1.mp4", 2000)
  .then((mensaje) => {
    // Si la descarga fue exitosa
    console.log(mensaje);
  })
  .catch((error) => {
    // Si ocurrió un error
    console.error(error);
  })
  .finally(() => {
    // Siempre se ejecuta al final, ocurra o no error
    console.log("🔚 Descarga finalizada.");
  });

```

Continuamos con el **Paso 3**, donde vamos a descargar múltiples archivos en paralelo usando `Promise.all()` y `Promise.race()`.

## 🚀 **Paso 3A: Descargar múltiples archivos con `Promise.all()`**

**Objetivo:** Esperar a que todos los archivos terminen de descargarse antes de continuar.

```jsx
// Creamos varias promesas de descarga
const descarga1 = descargarArchivo("foto1.jpg", 1000);
const descarga2 = descargarArchivo("audio1.mp3", 1500);
const descarga3 = descargarArchivo("documento.pdf", 2000);

// Usamos Promise.all para esperar a que todas se resuelvan
Promise.all([descarga1, descarga2, descarga3])
  .then((resultados) => {
    // Este bloque se ejecuta si TODAS las promesas fueron resueltas
    console.log("📦 Todas las descargas completadas:");
    resultados.forEach((mensaje) => console.log(mensaje));
  })
  .catch((error) => {
    // Este bloque se ejecuta si ALGUNA de las promesas falla
    console.error("🚨 Ocurrió un error durante las descargas:");
    console.error(error);
  })
  .finally(() => {
    // Siempre se ejecuta al final
    console.log("🧾 Fin del proceso de descarga.");
  });

```

🧠 **Nota:** Si una sola descarga falla, `Promise.all()` **rechaza todo el conjunto**.

## ⚡ **Paso 3B: Ver cuál descarga termina primero con `Promise.race()`**

**Objetivo:** Obtener el resultado de la primera promesa que se resuelva, sin importar el resto.

```jsx
// Simulamos las mismas descargas
const descargaA = descargarArchivo("foto2.jpg", 1000);
const descargaB = descargarArchivo("audio2.mp3", 2000);
const descargaC = descargarArchivo("documento2.pdf", 3000);

// Usamos Promise.race para saber cuál se resuelve primero
Promise.race([descargaA, descargaB, descargaC])
  .then((ganadora) => {
    // Solo se obtiene el resultado de la PRIMERA promesa resuelta
    console.log("🏁 Descarga más rápida:", ganadora);
  })
  .catch((error) => {
    // Si la primera promesa rechaza, se captura aquí
    console.error("💥 Error en la primera descarga:", error);
  });
```

Ahora implementamos un **timeout de seguridad** usando `Promise.race()` para cancelar la operación si **ninguna descarga termina en un tiempo razonable**.

## 🚨 Paso 4: Timeout de seguridad con `Promise.race()`

### 🧠 Objetivo:

Crear una promesa que rechace automáticamente si el tiempo máximo (timeout) se agota antes de que cualquier descarga termine. Así evitamos que una descarga lenta o colgada bloquee el sistema.

### ✅ Ejemplo completo y comentado línea por línea:

```jsx
// Simulamos una función de descarga lenta
function descargarArchivo(nombre, tiempo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ ${nombre} descargado en ${tiempo}ms`);
    }, tiempo);
  });
}

// Creamos una promesa de timeout que se rechaza después de cierto tiempo
function crearTimeout(tiempoLimite) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`⏰ Timeout: no se completó en ${tiempoLimite}ms`));
    }, tiempoLimite);
  });
}

// Simulamos una descarga lenta
const descargaLenta = descargarArchivo("video_lento.mp4", 5000); // 5 segundos

// Establecemos un timeout de 2 segundos
const timeout = crearTimeout(2000); // Se dispara si tarda más de 2 segundos

// Usamos Promise.race para quedarnos con lo que ocurra primero
Promise.race([descargaLenta, timeout])
  .then((resultado) => {
    // Si la descarga fue más rápida que el timeout
    console.log(resultado);
  })
  .catch((error) => {
    // Si el timeout se ejecutó primero
    console.error("❌ Error o timeout:", error.message);
  });

```

### 🧪 Resultado esperado:

- Si la descarga tarda menos de `2000ms`, se muestra el resultado normal.
- Si tarda más, el `timeout` gana la carrera y se lanza un error.

Vamos a combinar **`Promise.all()`** con **`Promise.race()`** para lanzar múltiples descargas en paralelo, pero cancelarlas si **todas tardan demasiado tiempo** (timeout global).

## ✅ Paso 5: Múltiples descargas protegidas por un timeout global

### 🎯 Objetivo:

- Descargar varios archivos en paralelo.
- Cancelar **todas** las descargas si se demoran más del límite permitido.

### 💻 Código completo y comentado línea por línea:

```jsx
// Función simulada para "descargar" un archivo con retraso variable
function descargarArchivo(nombre, tiempo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`✅ Archivo ${nombre} descargado en ${tiempo}ms`);
    }, tiempo); // Espera "tiempo" milisegundos
  });
}

// Función que crea una promesa que se rechaza si pasa el tiempo límite
function crearTimeoutGlobal(tiempoLimite) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`⏰ Timeout global: las descargas tardaron más de ${tiempoLimite}ms`));
    }, tiempoLimite);
  });
}

// Creamos múltiples promesas de descarga con distintos tiempos
const promesa1 = descargarArchivo("imagen1.jpg", 1500); // 1.5s
const promesa2 = descargarArchivo("video1.mp4", 3000);  // 3s
const promesa3 = descargarArchivo("audio1.mp3", 4000);  // 4s

// Agrupamos todas las descargas en Promise.all()
const todasLasDescargas = Promise.all([promesa1, promesa2, promesa3]);

// Creamos un timeout global de 3 segundos
const timeoutGlobal = crearTimeoutGlobal(3000);

// Usamos Promise.race() para que gane el grupo o el timeout
Promise.race([todasLasDescargas, timeoutGlobal])
  .then((resultados) => {
    console.log("📦 Todas las descargas completadas con éxito:");
    resultados.forEach((res) => console.log(res));
  })
  .catch((error) => {
    console.error("❌ Error en la descarga:", error.message);
  });

```

### 🧪 Resultado esperado:

- Si **todas las descargas** terminan antes de 3 segundos → Se muestra el resultado completo.
- Si **alguna descarga tarda demasiado y se excede el tiempo total**, se dispara el error de timeout.

Vamos a integrar el ejemplo anterior en una versión con interfaz visual usando **HTML + Bootstrap 5**, con **spinners individuales por archivo** y un mensaje visual de timeout.

## ✅ App Visual: Descarga Múltiple con Spinners y Timeout Global

### 🧱 Archivos usados:

1. `index.html`: Interfaz visual (con Bootstrap).
2. `<script>`: Código JavaScript embebido con `Promise.all()` + `Promise.race()`.

### 📄 index.html (código completo con comentarios):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Descarga múltiple con Timeout</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-dark text-light p-5">

  <div class="container">
    <h1 class="mb-4">🚀 Descarga de Archivos con Timeout</h1>

    <!-- Contenedor para mostrar estado de cada archivo -->
    <div id="descargas" class="mb-4">
      <!-- Aquí se insertarán dinámicamente los estados -->
    </div>

    <!-- Alerta global de éxito o error -->
    <div id="alerta" class="alert d-none" role="alert"></div>
  </div>

  <script>
    // Lista de archivos a descargar con su tiempo (simulado)
    const archivos = [
      { nombre: "imagen1.jpg", tiempo: 1500 },
      { nombre: "video1.mp4", tiempo: 3000 },
      { nombre: "audio1.mp3", tiempo: 4000 },
    ];

    const descargasContainer = document.getElementById("descargas");
    const alerta = document.getElementById("alerta");

    // Muestra un spinner por cada archivo
    archivos.forEach(({ nombre }) => {
      const item = document.createElement("div");
      item.id = nombre;
      item.innerHTML = `
        <div class="mb-2">
          <strong>${nombre}</strong>
          <div class="spinner-border text-info spinner-border-sm" role="status"></div>
          <span class="ms-2">Descargando...</span>
        </div>
      `;
      descargasContainer.appendChild(item);
    });

    // Simula una descarga con tiempo variable
    function descargarArchivo(nombre, tiempo) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(nombre), tiempo);
      });
    }

    // Timeout global
    function timeoutGlobal(ms) {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("⏰ Timeout global alcanzado")), ms);
      });
    }

    // Ejecutar las descargas
    const promesas = archivos.map(({ nombre, tiempo }) =>
      descargarArchivo(nombre, tiempo).then((archivo) => {
        // Al resolver, actualiza el estado visual del archivo
        const item = document.getElementById(archivo);
        item.querySelector(".spinner-border").remove();
        item.querySelector("span").textContent = `✅ ${archivo} descargado`;
        return archivo;
      })
    );

    const todas = Promise.all(promesas);
    const limite = timeoutGlobal(3500);

    Promise.race([todas, limite])
      .then(() => {
        alerta.className = "alert alert-success";
        alerta.textContent = "🎉 Todas las descargas se completaron a tiempo";
        alerta.classList.remove("d-none");
      })
      .catch((error) => {
        alerta.className = "alert alert-danger";
        alerta.textContent = `❌ ${error.message}`;

        // Cancelar visualmente cualquier spinner que quede activo
        archivos.forEach(({ nombre }) => {
          const item = document.getElementById(nombre);
          if (item.querySelector(".spinner-border")) {
            item.querySelector(".spinner-border").remove();
            item.querySelector("span").textContent = "⛔ Cancelado por timeout";
          }
        });

        alerta.classList.remove("d-none");
      });
  </script>
</body>
</html>

```

### 🧪 Comportamiento esperado:

- Cada archivo tiene su **spinner** mientras se descarga.
- Si todos terminan a tiempo → ✅ Se muestra alerta verde.
- Si alguna se retrasa demasiado → ⛔ Se muestra alerta roja y se cancelan todas.