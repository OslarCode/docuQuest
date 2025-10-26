# Ámbito de variables

# Ámbito de una variable

El ámbito de una variable en JavaScript se refiere al contexto en el cual una variable es válida y puede ser accedida. El ámbito determina dónde en tu código una variable es reconocida y dónde no lo es. Entender cómo funciona el ámbito es crucial para evitar errores y escribir código JavaScript eficiente y mantenible. Aquí está una explicación de cómo funciona el ámbito de una variable en JavaScript:

## Ámbito Global

Cuando declaras una variable fuera de cualquier función o bloque de código, se convierte en una variable global. Esto significa que la variable es accesible desde cualquier parte de tu programa, ya sea dentro de funciones, bucles, o cualquier otro bloque de código.

```jsx
let nombre = "Juan"; // Variable global

function saludar() {
  console.log("Hola, " + nombre);
}

saludar(); // Muestra "Hola, Juan"

```

```jsx
// Lo correcto es declarar la variable dentro de la función
function saludar() {
  let nombre = "Juan"; // Variable local a la función
  console.log("Hola, " + nombre);
}

saludar(); // Muestra "Hola, Juan"

```

Las variables globales pueden ser útiles, pero debes tener cuidado al usarlas, ya que pueden causar colisiones de nombres y comportamientos inesperados en programas grandes y complejos.

## Ámbito Local (Funciones y Bloques)

En JavaScript, el ámbito local se crea cuando declaras una variable dentro de una función o un bloque de código (como un bucle o una declaración condicional). Estas variables son accesibles sólo dentro de ese contexto y no pueden ser vistas desde fuera.

```jsx
function saludar() {
  let mensaje = "Hola, Mundo"; // Variable local
  console.log(mensaje);
}

saludar(); // Muestra "Hola, Mundo"
console.log(mensaje); // Error: mensaje no está definido

```

Las variables locales tienen un alcance limitado, lo que significa que su vida útil se limita al tiempo que existe la función o el bloque en el que se declararon.

## Ámbito de Bloque (ES6)

A partir de ECMAScript 6 (ES6), puedes usar let y const para declarar variables con ámbito de bloque. Esto significa que las variables son válidas sólo dentro del bloque en el que se declaran, como un bucle for o una declaración if.

```jsx
if (true) {
  let x = 10; // Variable con ámbito de bloque
  console.log(x); // Muestra 10
}

console.log(x); // Error: x no está definido

```

Esto ayuda a evitar problemas de colisión de nombres y mejora la claridad del código al limitar el alcance de las variables.

## Ámbito de Función Anidado

Las funciones anidadas tienen acceso al ámbito de sus funciones contenedoras. Esto significa que una función interna puede acceder a las variables de su función externa.

```jsx
function externa() {
  let mensaje = "Hola, ";

  function interna() {
    console.log(mensaje + "Mundo");
  }

  interna(); // Muestra "Hola, Mundo"
}

externa();

```

La función interna puede acceder a la variable mensaje de la función externa.

En resumen, el ámbito de una variable en JavaScript determina su visibilidad y accesibilidad en diferentes partes del código. Entender y gestionar el ámbito de las variables es esencial para escribir código JavaScript eficiente, evitar errores y mantener una buena organización en tus programas.