# Variables

## ¿Qué son las Variables en JavaScript?

En JavaScript, una variable es un contenedor para almacenar datos. Estos datos pueden ser números, cadenas de texto, booleanos, arreglos, objetos u otros tipos de datos. Las variables en JavaScript son dinámicas, lo que significa que pueden contener diferentes tipos de datos en diferentes momentos de la ejecución del programa.

## Características Principales de las Variables en JavaScript

### 1. Dinamismo de Tipos

JavaScript es un lenguaje de tipado dinámico, lo que significa que no es necesario declarar el tipo de datos de una variable al crearla. El tipo de datos de una variable puede cambiar durante la ejecución del programa.

### 2. Alcance

Las variables en JavaScript tienen alcance de función o alcance global. Las variables declaradas dentro de una función solo son visibles dentro de esa función (a menos que se utilice la palabra clave `var`, en cuyo caso pueden tener un alcance más amplio). Las variables declaradas fuera de cualquier función tienen alcance global y son visibles en todo el programa.

### 3. Sensibilidad a Mayúsculas y Minúsculas

JavaScript distingue entre mayúsculas y minúsculas en los nombres de variables. Por lo tanto, `miVariable` y `mivariable` se consideran nombres de variables diferentes.

## Declaración de Variables en JavaScript

En JavaScript, las variables se declaran utilizando las palabras clave `var`, `let` o `const`.

### 1. Declaración con `var`

```jsx
var numero = 10;
```

### 2. Declaración con `let`

```jsx
let texto = "Hola, mundo!";
```

### 3. Declaración con `const`

```jsx
const PI = 3.1416;
```

La diferencia entre `var`, `let` y `const` radica en su alcance y mutabilidad:

- `var`: Tiene un alcance de función y su valor puede cambiar.
- `let`: Tiene un alcance de bloque y su valor puede cambiar.
- `const`: Tiene un alcance de bloque y su valor no puede cambiar una vez que se asigna.

## Operaciones con Variables en JavaScript

Las variables en JavaScript se pueden utilizar en operaciones aritméticas, concatenación de cadenas, evaluación de expresiones booleanas y otros cálculos.

### Operaciones Aritméticas

```jsx
let a = 5;
let b = 3;
let suma = a + b; // suma = 8
let resta = a - b; // resta = 2
let multiplicacion = a * b; // multiplicacion = 15
let division = a / b; // division = 1.6666666666666667
```

### Concatenación de Cadenas

```jsx
let nombre = "Juan";
let apellido = "Pérez";
let nombreCompleto = nombre + " " + apellido; // nombreCompleto = 'Juan Pérez'
```

### Evaluación de Expresiones Booleanas

```jsx
let x = 10;
let y = 5;
let esMayor = x > y; // esMayor = true
```

## Ejemplos Prácticos

### Declaración y Operación con Variables

```jsx
// Declaración de variables
let base = 5;
let altura = 3;

// Operación para calcular el área de un triángulo
let area = (base * altura) / 2;

// Imprimir el resultado
console.log("El área del triángulo es: " + area);
```

En este ejemplo, se declaran las variables `base` y `altura`, se realiza la operación para calcular el área de un triángulo y se imprime el resultado en la consola.

## Conclusión

En conclusión, las variables en JavaScript son contenedores para almacenar datos durante la ejecución de un programa. Tienen características como dinamismo de tipos, alcance y sensibilidad a mayúsculas y minúsculas. Las variables se pueden declarar utilizando las palabras clave `var`, `let` o `const`, y se pueden utilizar en operaciones aritméticas, concatenación de cadenas, evaluación de expresiones booleanas y otros cálculos. Comprender cómo funcionan las variables en JavaScript es fundamental para escribir código eficiente y funcional en el desarrollo web.
