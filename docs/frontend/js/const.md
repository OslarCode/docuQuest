# Const

## ¿Qué es "const" en JavaScript?

`const` es una palabra clave en JavaScript que se utiliza para declarar variables cuyo valor no cambiará después de su inicialización. Es decir, una vez que se asigna un valor a una constante utilizando `const`, ese valor no puede ser modificado posteriormente durante la ejecución del programa.

## Funcionamiento de "const" en JavaScript

Cuando se declara una constante con `const`, se debe asignar un valor a la constante al momento de la declaración. Una vez que se asigna un valor, este valor no puede ser cambiado posteriormente. Intentar cambiar el valor de una constante después de su inicialización resultará en un error.

```jsx
const PI = 3.1416;
PI = 3.14; // Error: Assignment to constant variable
```

En este ejemplo, se intenta cambiar el valor de la constante `PI` después de su inicialización, lo que resulta en un error. Las constantes declaradas con `const` son inmutables y no pueden ser reasignadas.

## Características Principales de "const"

### 1. Inmutabilidad

Las variables declaradas con `const` son inmutables, lo que significa que su valor no puede ser cambiado una vez que se ha asignado.

### 2. Declaración y Asignación

Una constante declarada con `const` debe tener un valor asignado en el momento de la declaración. No se puede declarar una constante sin asignarle un valor inicial.

### 3. Alcance de Bloque

Al igual que con `let`, las constantes declaradas con `const` tienen un alcance de bloque, lo que significa que solo son visibles dentro del bloque en el que fueron declaradas.

### 4. No se Puede Re-declarar

Al contrario que las variables declaradas con `var`, una constante declarada con `const` no puede ser re-declarada en el mismo ámbito.

```jsx
const y = 5;
const y = 10; // Error: Identifier 'y' has already been declared
```

## Ejemplos Prácticos

### Declaración de Constantes Matemáticas

```jsx
const PI = 3.1416;
const GRAVEDAD = 9.81;
```

En este ejemplo, se declaran constantes para representar el valor de Pi y la aceleración gravitatoria, valores que no cambian durante la ejecución del programa.

### Uso de Constantes en Cálculos

```jsx
const RADIO = 5;
const area = Math.PI * Math.pow(RADIO, 2);
```

En este ejemplo, se utiliza una constante para representar el radio de un círculo y calcular su área utilizando la fórmula matemática correspondiente.

### Declaración de Objetos y Arreglos Constantes

```jsx
const persona = { nombre: "Juan", edad: 30 };
const colores = ["rojo", "verde", "azul"];
```

En este ejemplo, se declaran constantes para representar un objeto y un arreglo de colores, cuyos valores no cambiarán durante la ejecución del programa.

## Buenas Prácticas al Usar "const"

### 1. Utilizar "const" para Valores Inmutables

Se recomienda utilizar `const` siempre que sea posible para valores que no cambiarán durante la ejecución del programa, ya que ayuda a prevenir errores y mejorar la legibilidad del código.

### 2. Utilizar Nombres Descriptivos

Es importante utilizar nombres descriptivos para las constantes para que sea claro cuál es su propósito y qué valor representan.

### 3. Evitar Re-declaraciones

Evitar re-declarar constantes con el mismo nombre en el mismo ámbito, ya que esto puede llevar a confusiones y errores en el código.

## Conclusiones

En conclusión, `const` es una palabra clave en JavaScript que se utiliza para declarar variables cuyo valor no cambiará durante la ejecución del programa. Las constantes declaradas con `const` son inmutables y no pueden ser reasignadas después de su inicialización. Comprender cómo
