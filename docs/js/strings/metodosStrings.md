# Métodos de Strings

# Métodos Básicos para Manipular Strings en JavaScript

## Introducción

Los strings son uno de los tipos de datos más utilizados en JavaScript y se utilizan para representar texto. JavaScript proporciona una variedad de métodos integrados que permiten realizar operaciones comunes en strings, como la búsqueda, la manipulación y la extracción de datos.

## Métodos Básicos para Manipular Strings

A continuación, se presentan algunos de los métodos más comunes que se pueden utilizar con los strings en JavaScript:

### 1. `length`

El método `length` se utiliza para obtener la longitud de un string, es decir, el número total de caracteres que contiene.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.length); // Imprime: 10
```

### 2. `charAt()`

El método `charAt()` se utiliza para devolver el carácter en la posición especificada en un string.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.charAt(0)); // Imprime: H
console.log(mensaje.charAt(6)); // Imprime: M
```

### 3. `concat()`

El método `concat()` se utiliza para concatenar uno o más strings con el string actual y devolver el nuevo string resultante.

**Ejemplo:**

```jsx
let nombre = "Juan";
let apellido = "Pérez";
console.log(nombre.concat(" ", apellido)); // Imprime: Juan Pérez
```

### 4. `indexOf()`

El método `indexOf()` se utiliza para buscar la primera ocurrencia de un substring dentro de un string y devolver la posición de inicio de la coincidencia. Si no se encuentra el substring, devuelve -1.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.indexOf("Mundo")); // Imprime: 5
console.log(mensaje.indexOf("Adiós")); // Imprime: -1
```

### 5. `lastIndexOf()`

El método `lastIndexOf()` se utiliza para buscar la última ocurrencia de un substring dentro de un string y devolver la posición de inicio de la coincidencia. Si no se encuentra el substring, devuelve -1.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.lastIndexOf("o")); // Imprime: 7
```

### 6. `toUpperCase()`

El método `toUpperCase()` se utiliza para convertir todos los caracteres de un string a mayúsculas.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.toUpperCase()); // Imprime: HOLA MUNDO
```

### 7. `toLowerCase()`

El método `toLowerCase()` se utiliza para convertir todos los caracteres de un string a minúsculas.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.toLowerCase()); // Imprime: hola mundo
```

### 8. `substring()`

El método `substring()` se utiliza para extraer una porción de un string y devolverla como un nuevo string. Toma dos parámetros: el índice de inicio y el índice de fin (opcional).

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.substring(5)); // Imprime: Mundo
console.log(mensaje.substring(0, 4)); // Imprime: Hola
```

### 9. `slice()`

El método `slice()` se utiliza para extraer una porción de un string y devolverla como un nuevo string. Toma dos parámetros: el índice de inicio y el índice de fin (opcional).

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.slice(5)); // Imprime: Mundo
console.log(mensaje.slice(0, 4)); // Imprime: Hola
```

### 10. `split()`

El método `split()` se utiliza para dividir un string en un array de subcadenas utilizando un separador especificado.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.split(" ")); // Imprime: ['Hola', 'Mundo']
```

### 11. `replace()`

El método `replace()` se utiliza para reemplazar una subcadena dentro de un string con otra subcadena.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.replace("Mundo", "Amigo")); // Imprime: Hola Amigo
```

### 12. `trim()`

El método `trim()` se utiliza para eliminar los espacios en blanco al principio y al final de un string.

**Ejemplo:**

```jsx
let mensaje = "   Hola Mundo   ";
console.log(mensaje.trim()); // Imprime: Hola Mundo
```

## Conclusiones

Los métodos mencionados anteriormente son solo algunos de los métodos básicos que se pueden utilizar con los strings en JavaScript. Estos métodos proporcionan una amplia gama de funcionalidades para manipular y trabajar con strings de manera efectiva en aplicaciones web. Al comprender cómo funcionan estos métodos y cómo se pueden utilizar en diferentes situaciones, los desarrolladores JavaScript pueden escribir código más limpio, eficiente y mantenible. Con la capacidad de realizar operaciones como búsqueda, manipulación y extracción de datos, los métodos de string son una herramienta invaluable en el arsenal de cualquier desarrollador JavaScript.

# Métodos de Búsqueda para Strings en JavaScript

## Introducción

En JavaScript, los strings son una parte fundamental del lenguaje y se utilizan para representar texto. Una de las tareas comunes al trabajar con strings es buscar subcadenas dentro de ellos. Afortunadamente, JavaScript proporciona una variedad de métodos de búsqueda que permiten realizar esta tarea de manera eficiente. En este análisis, exploraremos los métodos de búsqueda para strings en JavaScript, cómo funcionan y cómo se pueden utilizar en diferentes situaciones.

## Métodos de Búsqueda para Strings

### 1. `indexOf()`

El método `indexOf()` se utiliza para buscar la primera ocurrencia de un substring dentro de un string y devuelve la posición de inicio de la coincidencia. Si no se encuentra el substring, devuelve -1.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.indexOf("Mundo")); // Imprime: 5
console.log(mensaje.indexOf("Adiós")); // Imprime: -1
```

### 2. `lastIndexOf()`

El método `lastIndexOf()` se utiliza para buscar la última ocurrencia de un substring dentro de un string y devuelve la posición de inicio de la coincidencia. Si no se encuentra el substring, devuelve -1.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.lastIndexOf("o")); // Imprime: 7
```

### 3. `includes()`

El método `includes()` se utiliza para determinar si un string contiene otro string y devuelve `true` o `false` según el resultado.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.includes("Mundo")); // Imprime: true
console.log(mensaje.includes("Adiós")); // Imprime: false
```

### 4. `startsWith()`

El método `startsWith()` se utiliza para determinar si un string comienza con otro string y devuelve `true` o `false` según el resultado.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.startsWith("Hola")); // Imprime: true
console.log(mensaje.startsWith("Mundo")); // Imprime: false
```

### 5. `endsWith()`

El método `endsWith()` se utiliza para determinar si un string termina con otro string y devuelve `true` o `false` según el resultado.

**Ejemplo:**

```jsx
let mensaje = "Hola Mundo";
console.log(mensaje.endsWith("Mundo")); // Imprime: true
console.log(mensaje.endsWith("Hola")); // Imprime: false
```

### 6. `match()`

El método `match()` se utiliza para buscar una expresión regular dentro de un string y devuelve un array con las coincidencias encontradas.

**Ejemplo:**

```jsx
let mensaje = "La casa es roja y la puerta es roja";
console.log(mensaje.match(/roja/g)); // Imprime: ['roja', 'roja']
```

### 7. `search()`

El método `search()` se utiliza para buscar una expresión regular dentro de un string y devuelve la posición de la primera coincidencia encontrada. Si no se encuentra la expresión regular, devuelve -1.

**Ejemplo:**

```jsx
let mensaje = "La casa es roja y la puerta es roja";
console.log(mensaje.search(/roja/)); // Imprime: 12
```

## Conclusiones

Los métodos de búsqueda para strings en JavaScript proporcionan una forma eficiente de buscar subcadenas dentro de strings y determinar si contienen ciertos patrones. Estos métodos son fundamentales en muchas aplicaciones web para tareas como la validación de formularios, la manipulación de texto y la búsqueda de información específica. Al comprender cómo funcionan estos métodos y cómo se pueden utilizar en diferentes situaciones, los desarrolladores JavaScript pueden escribir código más limpio, eficiente y mantenible. Con su capacidad para buscar subcadenas, coincidencias de expresiones regulares y determinar la presencia de ciertos patrones, los métodos de búsqueda para strings son una herramienta esencial en el arsenal de cualquier desarrollador JavaScript.
