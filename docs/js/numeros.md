# Números

## ¿Qué son los Números en JavaScript?

En JavaScript, los números son un tipo de datos utilizado para representar valores numéricos, ya sean enteros (números sin decimales) o de punto flotante (números con decimales). Los números en JavaScript se utilizan en una variedad de situaciones, como cálculos matemáticos, manipulación de datos y control de flujo del programa.

## Características de los Números en JavaScript

### 1. Enteros y de Punto Flotante

En JavaScript, los números pueden ser enteros o de punto flotante. Los enteros son números sin decimales, mientras que los números de punto flotante tienen decimales.

```jsx
let entero = 10;
let flotante = 3.14;
```

### 2. Precisión Limitada

JavaScript utiliza el estándar IEEE 754 para representar números de punto flotante, lo que significa que la precisión de los números de punto flotante está limitada a cierto número de dígitos. Esto puede llevar a errores de redondeo en ciertas operaciones matemáticas.

### 3. Operaciones Matemáticas

Los números en JavaScript se pueden utilizar en una variedad de operaciones matemáticas, como suma, resta, multiplicación, división, exponenciación y más.

```jsx
let suma = 5 + 3; // suma = 8
let resta = 10 - 3; // resta = 7
let multiplicacion = 2 * 4; // multiplicacion = 8
let division = 10 / 2; // division = 5
let potencia = Math.pow(2, 3); // potencia = 8
```

### 4. NaN y Infinity

JavaScript tiene valores especiales para representar situaciones especiales, como operaciones matemáticas inválidas o resultados infinitos. `NaN` (Not a Number) se utiliza para representar resultados que no son números válidos, mientras que `Infinity` se utiliza para representar resultados infinitos.

```jsx
let resultadoInvalido = 0 / 0; // resultadoInvalido = NaN
let resultadoInfinito = 1 / 0; // resultadoInfinito = Infinity
```

## Funcionamiento de los Números en JavaScript

Los números en JavaScript funcionan de manera similar a otros lenguajes de programación y se pueden utilizar en una variedad de situaciones. Los números se pueden asignar a variables, utilizar en operaciones matemáticas, comparar con otros números y más.

```jsx
let x = 5;
let y = 3;
let suma = x + y; // suma = 8
```

## Ejemplos Prácticos

### Cálculo del Área de un Círculo

```jsx
const radio = 5;
const area = Math.PI * Math.pow(radio, 2);
console.log("El área del círculo es: " + area);
```

En este ejemplo, se utiliza el radio de un círculo para calcular su área utilizando la fórmula matemática π \* radio^2.

### Conversión de Temperatura

```jsx
const temperaturaCelsius = 30;
const temperaturaFahrenheit = (temperaturaCelsius * 9) / 5 + 32;
console.log("La temperatura en Fahrenheit es: " + temperaturaFahrenheit);
```

En este ejemplo, se convierte una temperatura de grados Celsius a grados Fahrenheit utilizando la fórmula de conversión.

### Suma de Números

```jsx
let numeros = [1, 2, 3, 4, 5];
let sumaTotal = 0;

for (let i = 0; i < numeros.length; i++) {
  sumaTotal += numeros[i];
}

console.log("La suma de los números es: " + sumaTotal);
```

En este ejemplo, se suma una serie de números almacenados en un arreglo utilizando un bucle `for`.

## Conclusión

En conclusión, los números en JavaScript son un tipo de datos fundamental utilizado para representar valores numéricos, ya sean enteros o de punto flotante. Se pueden utilizar en una variedad de situaciones, como cálculos matemáticos, manipulación de datos y control de flujo del programa. Comprender cómo funcionan los números en JavaScript y cómo utilizarlos de manera efectiva es esencial para el desarrollo de aplicaciones web. Con práctica y experiencia, los programadores pueden aprovechar al máximo el potencial de los números en JavaScript en sus proyectos.

# Métodos para Manipular Números en JavaScript

## Introducción

JavaScript es un lenguaje de programación versátil que se utiliza ampliamente en el desarrollo web y de aplicaciones. Una de las tareas más comunes al trabajar con JavaScript es la manipulación de números. Para facilitar esta tarea, JavaScript proporciona una serie de métodos integrados que permiten realizar operaciones aritméticas, redondeo, conversión de tipos y más. En este análisis, exploraremos los métodos más utilizados para manipular números en JavaScript, cómo funcionan y cómo se pueden aplicar en diferentes situaciones.

## Métodos para Manipular Números

### 1. `toFixed()`

El método `toFixed()` se utiliza para redondear un número a un número específico de decimales y devolver una cadena que representa el número redondeado.

**Ejemplo:**

```jsx
let numero = 10.5678;
let redondeado = numero.toFixed(2);
console.log(redondeado); // Imprime: "10.57"
```

### 2. `toPrecision()`

El método `toPrecision()` se utiliza para formatear un número utilizando la notación exponencial o la notación de punto fijo, según el número de dígitos significativos especificado.

**Ejemplo:**

```jsx
let numero = 123.456789;
let formateado = numero.toPrecision(4);
console.log(formateado); // Imprime: "123.5"
```

### 3. `toString()`

El método `toString()` se utiliza para convertir un número en una cadena de texto. También se puede especificar la base numérica en la que se desea que se convierta el número.

**Ejemplo:**

```jsx
let numero = 42;
let cadena = numero.toString();
console.log(cadena); // Imprime: "42"
```

### 4. `parseInt()`

El método `parseInt()` se utiliza para analizar una cadena y devolver un entero. También se puede especificar la base numérica en la que se espera que esté representado el número.

**Ejemplo:**

```jsx
let cadena = "42";
let entero = parseInt(cadena);
console.log(entero); // Imprime: 42
```

### 5. `parseFloat()`

El método `parseFloat()` se utiliza para analizar una cadena y devolver un número de punto flotante.

**Ejemplo:**

```jsx
let cadena = "3.14";
let flotante = parseFloat(cadena);
console.log(flotante); // Imprime: 3.14
```

### 6. `Math.round()`

El método `Math.round()` se utiliza para redondear un número al entero más cercano.

**Ejemplo:**

```jsx
let numero = 4.6;
let redondeado = Math.round(numero);
console.log(redondeado); // Imprime: 5
```

### 7. `Math.floor()`

El método `Math.floor()` se utiliza para redondear un número hacia abajo al entero más cercano.

**Ejemplo:**

```jsx
let numero = 4.6;
let redondeado = Math.floor(numero);
console.log(redondeado); // Imprime: 4
```

### 8. `Math.ceil()`

El método `Math.ceil()` se utiliza para redondear un número hacia arriba al entero más cercano.

**Ejemplo:**

```jsx
let numero = 4.2;
let redondeado = Math.ceil(numero);
console.log(redondeado); // Imprime: 5
```

### 9. `Math.abs()`

El método `Math.abs()` se utiliza para devolver el valor absoluto de un número.

**Ejemplo:**

```jsx
let numero = -5;
let absoluto = Math.abs(numero);
console.log(absoluto); // Imprime: 5
```

### 10. `Math.pow()`

El método `Math.pow()` se utiliza para elevar un número a una potencia especificada.

**Ejemplo:**

```jsx
let base = 2;
let exponente = 3;
let resultado = Math.pow(base, exponente);
console.log(resultado); // Imprime: 8
```

### 11. `Math.sqrt()`

El método `Math.sqrt()` se utiliza para calcular la raíz cuadrada de un número.

**Ejemplo:**

```jsx
let numero = 25;
let raizCuadrada = Math.sqrt(numero);
console.log(raizCuadrada); // Imprime: 5
```

## Conclusiones

Los métodos mencionados anteriormente son solo algunos de los más comúnmente utilizados para manipular números en JavaScript. Estos métodos proporcionan una variedad de funcionalidades que van desde el redondeo y formateo de números hasta el cálculo de potencias y raíces cuadradas. Al comprender cómo funcionan estos métodos y cómo se pueden aplicar en diferentes situaciones, los desarrolladores JavaScript pueden escribir código más limpio, eficiente y mantenible. Con la capacidad de realizar operaciones aritméticas y matemáticas complejas, los métodos para manipular números en JavaScript son una herramienta esencial en el arsenal de cualquier desarrollador web.
