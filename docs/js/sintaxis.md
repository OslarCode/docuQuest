# Sintaxis JavaScript

## Sintaxis Básica de JavaScript

### ¿Qué es una variable?

Una variable en JavaScript es como una caja con un nombre donde puedes guardar información. Imagina que tienes una caja etiquetada con el nombre “message”. Dentro de esa caja, puedes almacenar diferentes cosas, como palabras, números o incluso otros objetos.

### Declaración de Variables

En JavaScript, las variables se declaran utilizando las palabras clave `var`, `let` o `const`. La diferencia entre ellas radica en su alcance y mutabilidad.

```jsx
// Declaración de variables utilizando var
var x = 10;

// Declaración de variables utilizando let
let y = 20;

// Declaración de variables utilizando const
const z = 30;
```

### Comentarios

Los comentarios en JavaScript se utilizan para hacer anotaciones dentro del código que no se ejecutan. Pueden ser de una sola línea o de varias líneas.

```jsx
// Este es un comentario de una sola línea

/*
Este es un comentario de
varias líneas
*/
```

### Sentencias y Bloques

Las sentencias en JavaScript son líneas individuales de código que se ejecutan secuencialmente. Los bloques de código se delimitan con llaves `{}` y pueden contener múltiples sentencias.

```jsx
// Sentencia de asignación
let a = 5;

// Bloque de código con condicional if
if (a > 0) {
  console.log("El número es positivo");
}
```

### Funciones

Las funciones en JavaScript se utilizan para encapsular bloques de código y pueden recibir parámetros y devolver valores.

```jsx
// Declaración de una función
function suma(a, b) {
  return a + b;
}

// Llamada a la función
let resultado = suma(3, 5);
console.log(resultado); // Output: 8
```

### Operadores

JavaScript admite una variedad de operadores para realizar cálculos, comparaciones y otras operaciones.

```jsx
// Operadores aritméticos
let suma = 3 + 5; // suma = 8
let resta = 10 - 3; // resta = 7
let multiplicacion = 2 * 4; // multiplicacion = 8
let division = 10 / 2; // division = 5

// Operadores de comparación
let igualdad = suma == resta; // igualdad = false
let desigualdad = suma != multiplicacion; // desigualdad = false
let mayorQue = suma > resta; // mayorQue = true

// Operadores lógicos
let and = suma > resta && suma < multiplicacion; // and = true
let or = suma < resta || suma == multiplicacion; // or = true
```

## Tipos de Datos en JavaScript

JavaScript es un lenguaje de tipado dinámico, lo que significa que las variables pueden contener diferentes tipos de datos en diferentes momentos de la ejecución del programa. A continuación, se presentan los tipos de datos fundamentales en JavaScript:

### 1. Números (Number)

Los números en JavaScript pueden ser enteros o de punto flotante y se pueden utilizar para realizar operaciones aritméticas.

```jsx
let entero = 10;
let flotante = 3.14;
```

### 2. Cadenas de Texto (String)

Las cadenas de texto en JavaScript se utilizan para representar texto y se pueden delimitar con comillas simples ('') o dobles ("").

```jsx
let texto1 = "Hola, mundo!";
let texto2 = "¡Bienvenido a JavaScript!";
```

### 3. Booleanos (Boolean)

Los booleanos en JavaScript representan un valor de verdadero (true) o falso (false) y se utilizan en expresiones condicionales y lógicas.

```jsx
let verdadero = true;
let falso = false;
```

### 4. Arreglos (Array)

Los arreglos en JavaScript se utilizan para almacenar múltiples valores en una sola variable y se pueden acceder mediante un índice numérico.

```jsx
let arreglo = [1, 2, 3, 4, 5];
```

### 5. Objetos (Object)

Los objetos en JavaScript se utilizan para representar colecciones de pares clave-valor y se pueden utilizar para modelar estructuras de datos más complejas.

```jsx
let persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid",
};
```

### 6. Undefined

El valor `undefined` se utiliza para representar variables que no tienen un valor asignado o que no están definidas.

```jsx
let variableNoDefinida;
console.log(variableNoDefinida); // Output: undefined
```

### 7. Null

El valor `null` se utiliza para representar la ausencia intencional de cualquier valor o referencia de objeto.

```jsx
let valorNulo = null;
```

### 8. Symbol

Los símbolos (Symbol) son valores únicos que se utilizan como identificadores de propiedad en objetos.

```jsx
let simbolo = Symbol("descripcion");
```

### Conversión entre Tipos de Datos

JavaScript proporciona métodos para convertir entre diferentes tipos de datos, como `parseInt()` y `parseFloat()` para convertir cadenas a números, y `toString()` para convertir números a cadenas.

```jsx
let cadena = "10";
let numero = parseInt(cadena); // numero = 10
```

## Conclusión

En resumen, la sintaxis básica de JavaScript incluye la declaración de variables, comentarios, sentencias y bloques, funciones y operadores. Además, JavaScript admite una variedad de tipos de datos fundamentales, como números, cadenas de texto, booleanos, arreglos, objetos, `undefined`, `null` y símbolos. Comprender estos conceptos básicos es fundamental para escribir código JavaScript funcional y eficiente en el desarrollo web. A medida que avancemos en nuestro dominio del lenguaje, podremos utilizar estos conceptos para crear aplicaciones web más complejas y dinámicas.
