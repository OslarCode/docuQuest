# If/Else

## ¿Qué son los condicionales?

Los condicionales son estructuras de control de flujo que permiten ejecutar ciertas porciones de código solo si se cumple una condición específica. En JavaScript, los condicionales se utilizan para realizar acciones basadas en la evaluación de expresiones lógicas. Esto permite que un programa tome diferentes caminos de ejecución dependiendo de las condiciones que se cumplan en tiempo de ejecución.

## La estructura básica de los condicionales en JavaScript

En JavaScript, los condicionales básicos están formados por la declaración `if`, seguida de una expresión lógica que se evalúa. Si la expresión se evalúa como verdadera, el bloque de código dentro del `if` se ejecuta. Además del `if`, también se pueden utilizar `else` y `else if` para definir bloques de código alternativos que se ejecutan en caso de que la expresión lógica no sea verdadera.

```jsx
if (condicion) {
  // Bloque de código si la condición es verdadera
} else if (otraCondicion) {
  // Bloque de código si la primera condición no se cumple, pero esta sí
} else {
  // Bloque de código si ninguna de las condiciones anteriores se cumple
}
```

## Uso de la declaración `if`

La declaración `if` es la forma más básica de condicional en JavaScript. Permite ejecutar un bloque de código solo si la expresión lógica que se evalúa es verdadera.

**Ejemplo:**

```jsx
let edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
}
```

En este ejemplo, el bloque de código dentro del `if` se ejecutará solo si la variable `edad` es mayor o igual a 18.

## Uso de la declaración `else`

La declaración `else` se utiliza junto con `if` para ejecutar un bloque de código alternativo si la expresión lógica del `if` no es verdadera.

**Ejemplo:**

```jsx
let hora = 14;

if (hora < 12) {
  console.log("Buenos días");
} else {
  console.log("Buenas tardes");
}
```

En este ejemplo, si la variable `hora` es menor que 12, se imprimirá "Buenos días". De lo contrario, se imprimirá "Buenas tardes".

## Uso de la declaración `else if`

La declaración `else if` se utiliza para evaluar múltiples condiciones secuenciales si la condición del `if` no se cumple.

**Ejemplo:**

```jsx
let calificacion = 85;

if (calificacion >= 90) {
  console.log("A");
} else if (calificacion >= 80) {
  console.log("B");
} else if (calificacion >= 70) {
  console.log("C");
} else {
  console.log("D");
}
```

En este ejemplo, se evalúa la variable `calificacion` y se imprime la letra correspondiente a la calificación en base a las condiciones establecidas.

## Consideraciones adicionales

- Es importante tener en cuenta el orden en el que se colocan las condiciones `if`, `else if` y `else`. JavaScript evalúa estas condiciones secuencialmente y ejecuta el primer bloque de código cuya condición sea verdadera.
- Se pueden anidar múltiples declaraciones `if`, `else if` y `else` dentro de otras, pero esto puede complicar la legibilidad del código y hacerlo más propenso a errores.

## El condicional ternario

El condicional ternario en JavaScript (también conocido como el operador ternario) es una forma concisa de realizar una operación condicional. Funciona como una versión simplificada de una estructura `if...else`. Se utiliza para asignar un valor basado en una condición de forma compacta.

La sintaxis básica del condicional ternario es:

```jsx
condición ? expresión_si_verdadero : expresión_si_falso;
```

- **`condición`**: La condición que se evalúa (verdadera o falsa).
- **`expresión_si_verdadero`**: El valor que se devuelve si la condición es verdadera.
- **`expresión_si_falso`**: El valor que se devuelve si la condición es falsa.

### Ejemplo 1: Determinar si un número es par o impar

Vamos a usar el condicional ternario para determinar si un número es par o impar.

```jsx
let numero = 5;

// Usamos el condicional ternario para verificar si el número es par o impar
let resultado = numero % 2 === 0 ? "Es par" : "Es impar";

// Imprimimos el resultado en la consola
console.log(resultado); // "Es impar"
```

- `(numero % 2 === 0)`: Verificamos si el número es divisible por 2 (es decir, si es par).
- `"Es par"`: Este es el valor que se asigna a `resultado` si la condición es verdadera.
- `"Es impar"`: Este es el valor que se asigna a `resultado` si la condición es falsa.

### Ejemplo 2: Verificar si una persona es mayor de edad

Vamos a usar el condicional ternario para verificar si una persona es mayor de edad.

```jsx
let edad = 18;

// Usamos el condicional ternario para determinar si la persona es mayor de edad
let esMayorDeEdad =
  edad >= 18 ? "Sí, es mayor de edad" : "No, es menor de edad";

// Imprimimos el resultado en la consola
console.log(esMayorDeEdad); // "Sí, es mayor de edad"
```

- `(edad >= 18)`: Verificamos si la edad es mayor o igual a 18.
- `"Sí, es mayor de edad"`: Este es el valor que se asigna a `esMayorDeEdad` si la condición es verdadera.
- `"No, es menor de edad"`: Este es el valor que se asigna a `esMayorDeEdad` si la condición es falsa.

### Ejemplo 3: Seleccionar un valor basado en una variable booleana

Vamos a usar el condicional ternario para seleccionar un valor basado en una variable booleana.

```jsx
let esEstudiante = true;

// Usamos el condicional ternario para seleccionar el mensaje apropiado
let mensaje = esEstudiante
  ? "Tienes descuento de estudiante"
  : "No tienes descuento";

// Imprimimos el mensaje en la consola
console.log(mensaje); // "Tienes descuento de estudiante"
```

- `esEstudiante`: La variable booleana que determina si la persona es estudiante.
- `"Tienes descuento de estudiante"`: Este es el valor que se asigna a `mensaje` si `esEstudiante` es verdadero.
- `"No tienes descuento"`: Este es el valor que se asigna a `mensaje` si `esEstudiante` es falso.

### Comentarios sobre el código

En cada ejemplo, el condicional ternario nos permite escribir una condición y elegir entre dos valores posibles de manera muy compacta y legible. Esto puede hacer que el código sea más fácil de leer y escribir, especialmente para condiciones simples.

## Conclusiones

En resumen, los condicionales `if`, `else if` y `else` son estructuras fundamentales en JavaScript que permiten controlar el flujo de ejecución de un programa en función de condiciones específicas. Al comprender cómo funcionan estas estructuras y cómo se utilizan, los desarrolladores pueden escribir código más eficiente y lógico para sus aplicaciones. Los condicionales son una herramienta poderosa que permite crear programas dinámicos y adaptables a diferentes situaciones y escenarios.
