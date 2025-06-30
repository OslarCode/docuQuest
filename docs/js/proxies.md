# Proxies

# **Conceptos Avanzados en JavaScript: Proxies**

En el mundo de la programación avanzada en JavaScript, los Proxies son una característica poderosa que permite interceptar y personalizar el comportamiento fundamental de los objetos.

## **Introducción a los Proxies en JavaScript**

Los Proxies son objetos especiales que permiten definir un comportamiento personalizado para operaciones fundamentales en otros objetos, como la lectura, escritura y eliminación de propiedades. Esto significa que podemos interceptar y controlar el acceso a un objeto y modificar su comportamiento según nuestras necesidades específicas.

### **Características Principales de los Proxies**

Antes de profundizar en cómo funcionan los Proxies en JavaScript, es importante comprender algunas de sus características clave:

- **Interceptación de Operaciones**: Los Proxies permiten interceptar y personalizar el comportamiento de las operaciones fundamentales en un objeto, como la lectura, escritura y eliminación de propiedades.
- **Flexibilidad**: Los Proxies son extremadamente flexibles y pueden utilizarse para implementar una amplia variedad de patrones y técnicas avanzadas en JavaScript.
- **Transparencia**: A pesar de que un Proxy puede modificar el comportamiento de un objeto, esta modificación es transparente para el código que interactúa con el objeto.

### **Creación de un Proxy en JavaScript**

Veamos cómo se puede crear un Proxy en JavaScript utilizando la función constructora `Proxy`:

```jsx
// Objeto original
const objetivo = {
  nombre: "Juan",
  edad: 30,
};

// Crear un Proxy para el objeto original
const manejador = {
  get: function (obj, propiedad) {
    console.log(`Accediendo a la propiedad "${propiedad}"`);
    return obj[propiedad];
  },
};

const proxy = new Proxy(objetivo, manejador);

// Acceder a una propiedad del Proxy
console.log(proxy.nombre); // Imprime: "Accediendo a la propiedad "nombre"" y luego "Juan"
```

En este ejemplo, creamos un objeto llamado `objetivo` y luego creamos un Proxy para este objeto utilizando la función constructora `Proxy`. Definimos un `manejador` que contiene una función `get` para interceptar y personalizar la lectura de propiedades en el objeto. Cuando se accede a una propiedad del Proxy, el método `get` del manejador se ejecuta, lo que nos permite personalizar el comportamiento de la operación de lectura.

### **Interceptación de Operaciones con Proxies**

Los Proxies permiten interceptar y personalizar varias operaciones fundamentales en un objeto, como la lectura, escritura y eliminación de propiedades. Veamos un ejemplo de cómo se puede utilizar un Proxy para implementar la validación de datos en un objeto:

```jsx
// Objeto original
const usuario = {
  nombre: "",
  edad: 0,
};

// Crear un Proxy para el objeto original
const manejadorValidacion = {
  set: function (obj, propiedad, valor) {
    if (propiedad === "nombre" && typeof valor !== "string") {
      throw new TypeError("El nombre debe ser una cadena de texto");
    }
    if (propiedad === "edad" && typeof valor !== "number") {
      throw new TypeError("La edad debe ser un número");
    }
    // Si las validaciones pasan, se establece el valor en el objeto original
    obj[propiedad] = valor;
    return true;
  },
};

const proxyUsuario = new Proxy(usuario, manejadorValidacion);

// Intentar establecer valores inválidos
try {
  proxyUsuario.nombre = 123; // Error: El nombre debe ser una cadena de texto
} catch (error) {
  console.error(error.message);
}

try {
  proxyUsuario.edad = "treinta"; // Error: La edad debe ser un número
} catch (error) {
  console.error(error.message);
}
```

En este ejemplo, creamos un Proxy para un objeto `usuario` y definimos un `manejadorValidacion` que contiene una función `set` para interceptar y personalizar la escritura de propiedades en el objeto. Utilizamos esta función para validar los valores asignados a las propiedades `nombre` y `edad`, lanzando un error si los valores no cumplen con los criterios de validación especificados.

### **Creación de Propiedades Virtuales con Proxies**

Los Proxies también pueden utilizarse para crear propiedades virtuales en un objeto, es decir, propiedades que no están presentes en el objeto original pero que se calculan dinámicamente según sea necesario. Veamos un ejemplo de cómo se puede utilizar un Proxy para implementar propiedades virtuales en un objeto:

```jsx
// Objeto original
const persona = {
  nombre: "Juan",
  apellido: "Pérez",
};

// Crear un Proxy para el objeto original
const manejadorPropiedadesVirtuales = {
  get: function (obj, propiedad) {
    if (propiedad === "nombreCompleto") {
      return `${obj.nombre} ${obj.apellido}`;
    }
    return obj[propiedad];
  },
};

const proxyPersona = new Proxy(persona, manejadorPropiedadesVirtuales);

// Acceder a una propiedad virtual
console.log(proxyPersona.nombreCompleto); // Imprime: "Juan Pérez"
```

En este ejemplo, creamos un Proxy para un objeto `persona` y definimos un `manejadorPropiedadesVirtuales` que contiene una función `get` para interceptar y personalizar la lectura de propiedades en el objeto. Utilizamos esta función para crear una propiedad virtual llamada `nombreCompleto`, que concatena las propiedades `nombre` y `apellido` para formar el nombre completo de la persona.

## **Ejemplo práctico Proxies en JavaScript**

Supongamos que queremos crear un objeto que actúe como una caché para almacenar el resultado de ciertas operaciones costosas. Utilizaremos un Proxy para interceptar las llamadas a propiedades inexistentes y calcular el resultado de la operación correspondiente, almacenándolo en la caché para futuras referencias.

```jsx
// Creamos una función para simular una operación costosa
function operacionCostosa(numero) {
  console.log(`Realizando operación costosa para el número ${numero}...`);
  // Simulamos una operación costosa, como cálculos intensivos
  return numero * numero;
}

// Creamos un objeto Proxy para actuar como una caché
const cache = new Proxy(
  {},
  {
    get: function (target, propiedad) {
      if (!target[propiedad]) {
        // Si la propiedad no existe en la caché, realizamos la operación y la almacenamos
        target[propiedad] = operacionCostosa(Number(propiedad));
      }
      return target[propiedad];
    },
  }
);

// Probamos el funcionamiento de la caché
console.log(cache[5]); // Realiza la operación costosa para el número 5 y devuelve 25
console.log(cache[5]); // Devuelve el resultado almacenado en la caché (25), sin realizar la operación costosa nuevamente
console.log(cache[8]); // Realiza la operación costosa para el número 8 y devuelve 64
console.log(cache[8]); // Devuelve el resultado almacenado en la caché (64), sin realizar la operación costosa nuevamente
```

En este ejemplo, creamos un Proxy que actúa como una caché para almacenar el resultado de operaciones costosas. Cuando se accede a una propiedad del objeto Proxy y esa propiedad no existe en la caché, el Proxy intercepta la llamada y realiza la operación correspondiente, almacenando el resultado en la caché. Si la propiedad ya existe en la caché, el Proxy devuelve el resultado almacenado sin necesidad de realizar la operación nuevamente.

Este ejemplo ilustra cómo los Proxies pueden utilizarse para agregar funcionalidades adicionales a los objetos, como la implementación de cachés, la validación de datos, el registro de operaciones, entre otros. Los Proxies ofrecen una manera poderosa y flexible de modificar el comportamiento de los objetos en JavaScript.

## **Conclusiones y Consideraciones Finales**

En resumen, los Proxies son una característica poderosa en JavaScript que permite interceptar y personalizar el comportamiento fundamental de los objetos. Permiten definir un comportamiento personalizado para operaciones como la lectura, escritura y eliminación de propiedades, lo que proporciona una gran flexibilidad y control sobre el acceso y la manipulación de los datos.

Al comprender y utilizar correctamente los Proxies en JavaScript, los desarrolladores pueden mejorar la modularidad, la seguridad y la eficiencia de sus aplicaciones, proporcionando una forma más flexible y controlada de interactuar con los objetos.

Espero que este texto haya proporcionado una comprensión profunda de los Proxies en

JavaScript y cómo se pueden utilizar para interceptar y personalizar el comportamiento de los objetos de manera efectiva. Con este conocimiento, podrás diseñar y desarrollar aplicaciones más avanzadas y robustas en JavaScript.
