# Tipos de datos

## Tipos de Datos en JavaScript

JavaScript es un lenguaje de programación dinámicamente tipado, lo que significa que las variables no están asociadas a un tipo de dato específico y pueden contener diferentes tipos de datos en momentos diferentes durante la ejecución del programa. A continuación, describiremos los principales tipos de datos en JavaScript:

### 1. Tipos de Datos Primitivos

Los tipos de datos primitivos en JavaScript son aquellos que representan valores simples y se almacenan directamente en la ubicación de memoria que la variable tiene asignada. Estos tipos de datos son inmutables, lo que significa que no se pueden modificar directamente. Los tipos de datos primitivos en JavaScript son los siguientes:

### a. Números (Number)

El tipo de datos "number" se utiliza para representar valores numéricos, ya sean enteros o de punto flotante.

```jsx
let edad = 25; // Entero
let precio = 99.99; // Punto flotante
```

### b. Cadena de Texto (String)

El tipo de datos "string" se utiliza para representar cadenas de caracteres, es decir, texto.

```jsx
let nombre = "Juan";
let mensaje = "Hola Mundo";
```

### c. Booleano (Boolean)

El tipo de datos "boolean" se utiliza para representar valores de verdadero (true) o falso (false).

```jsx
let esMayorDeEdad = true;
let tienePermiso = false;
```

### d. Valor Nulo (Null)

El tipo de datos "null" se utiliza para representar la ausencia intencional de cualquier valor o referencia de objeto.

```jsx
let datoNulo = null;
```

### e. Valor Indefinido (Undefined)

El tipo de datos "undefined" se utiliza para representar una variable que ha sido declarada pero aún no ha sido asignada.

```jsx
let variableIndefinida;
```

### f. Símbolo (Symbol)

El tipo de datos "symbol" se utiliza para crear identificadores únicos para propiedades de objetos.

```jsx
const simbolo = Symbol("descripcion");
```

### 2. Tipos de Datos No Primitivos

Los tipos de datos no primitivos en JavaScript son aquellos que representan valores más complejos y se almacenan como referencias a ubicaciones de memoria. Estos tipos de datos pueden contener conjuntos de valores y pueden ser modificados directamente. Los tipos de datos no primitivos en JavaScript son los siguientes:

### a. Objeto (Object)

El tipo de datos "object" se utiliza para representar colecciones de datos y funcionalidades. Los objetos en JavaScript son conjuntos de pares clave-valor, donde cada clave es una cadena única y cada valor puede ser cualquier tipo de datos, incluyendo otros objetos.

```jsx
let persona = {
  nombre: "Juan",
  edad: 25,
  esEstudiante: true,
};
```

### b. Arreglo (Array)

El tipo de datos "array" se utiliza para representar una colección ordenada de elementos. Los elementos de un arreglo pueden ser de cualquier tipo de datos, incluyendo otros arreglos u objetos.

```jsx
let colores = ["rojo", "verde", "azul"];
```

### c. Función (Function)

El tipo de datos "function" se utiliza para representar funciones en JavaScript. Las funciones son objetos de primera clase en JavaScript y pueden ser asignadas a variables, pasadas como argumentos y devueltas como valores de otras funciones.

```jsx
function sumar(a, b) {
  return a + b;
}
```

## Funcionamiento de los Tipos de Datos en JavaScript

Los tipos de datos en JavaScript se comportan de manera diferente según su naturaleza. Los tipos de datos primitivos son inmutables, lo que significa que una vez que se han creado, no se pueden modificar directamente. Por otro lado, los tipos de datos no primitivos son mutables, lo que significa que pueden ser modificados directamente.

### Ejemplo Práctico:

```jsx
// Tipos de datos primitivos
let numero = 10;
let texto = "Hola";
let esVerdadero = true;

// Tipos de datos no primitivos
let persona = {
  nombre: "Juan",
  edad: 25,
};

let colores = ["rojo", "verde", "azul"];
```

En este ejemplo, se muestran ejemplos de ambos tipos de datos en JavaScript. La variable `numero` contiene un tipo de dato primitivo (número), mientras que las variables `persona` y `colores` contienen tipos de datos no primitivos (objeto y arreglo, respectivamente).

## Conclusiones

En conclusión, los tipos de datos en JavaScript son elementos fundamentales que permiten almacenar y manipular información en un programa. Comprender los diferentes tipos de datos disponibles en JavaScript, así como sus características y comportamientos, es esencial para escribir código efectivo y funcional en el desarrollo de aplicaciones web. Tanto los tipos de datos primitivos como los no primitivos tienen roles importantes en JavaScript, y saber cómo utilizarlos correctamente es crucial para convertirse en un programador competente y eficiente en este lenguaje de programación.
