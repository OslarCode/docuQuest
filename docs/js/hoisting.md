# Hoisting

# Hoisting

El hoisting es un comportamiento clave en JavaScript que a menudo puede ser confuso para los desarrolladores, pero es esencial para comprender cómo funcionan las variables y las funciones en el lenguaje. El término "hoisting" significa elevar o izar, y se refiere al comportamiento por el cual las declaraciones de variables y funciones son movidas al comienzo del contexto (ya sea global o local) durante la fase de interpretación del código. Aunque puede parecer extraño, es importante entenderlo para evitar errores y comportamientos inesperados en tu código JavaScript.

A continuación, se explica cómo funciona el hoisting en JavaScript:

## Elevación de Declaraciones de Variables

Cuando declaras una variable con var, JavaScript "iza" la declaración de esa variable al comienzo de su contexto actual (ya sea el ámbito global o el de una función). Sin embargo, solo la declaración se eleva, no la asignación de valor.

```jsx
console.log(miVariable); // Undefined
var miVariable = 5;

Lo que realmente sucede:

var miVariable; // La declaración se eleva
console.log(miVariable); // Undefined
miVariable = 5; // Asignación de valor

```

Esto puede llevar a situaciones en las que la variable está declarada pero su valor es undefined hasta que se le asigne uno.

## Elevación de Declaraciones de Funciones

Las funciones declaradas con la palabra clave function también son "izadas" al comienzo de su contexto actual, lo que significa que puedes llamar a una función antes de declararla en el código.

```jsx
sayHello(); // "Hola"

function sayHello() {
  console.log("Hola");
}

Lo que realmente sucede:

function sayHello() {
  console.log("Hola");
}

sayHello(); // "Hola"

```

Sin embargo, esto no es válido para funciones expresadas o funciones asignadas a variables. Solo se aplica a las funciones declaradas con la palabra clave function.

## Hoisting en el Ámbito Global y Local

El hoisting ocurre tanto en el ámbito global como en los ámbitos locales de las funciones. Si declaras una variable en un ámbito local, esta se elevará al comienzo de ese ámbito, y no afectará las variables en otros ámbitos.

```jsx
function example() {
  console.log(x); // Undefined
  var x = 10;
  console.log(x); // 10
}
example();

```

Aquí, la variable x se eleva solo dentro de la función example.

## Evitando Problemas con el Hoisting

Para evitar comportamientos inesperados, es una buena práctica declarar tus variables al principio de las funciones o del ámbito en lugar de depender del hoisting. También, considera utilizar let y const en lugar de var para declarar variables, ya que tienen un ámbito más claro y no se ven afectadas por el hoisting de la misma manera.

En resumen, el hoisting en JavaScript se refiere al comportamiento de elevar declaraciones de variables y funciones al comienzo de su ámbito, lo que puede llevar a resultados inesperados si no se entiende adecuadamente. Es importante conocer esta característica para escribir código más claro y evitar errores sutiles en tus programas JavaScript.