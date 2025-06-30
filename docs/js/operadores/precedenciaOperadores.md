# Precedencia de Operadores

## Introducción a la Precedencia en JavaScript

La precedencia en JavaScript se refiere al orden en el que se evalúan las operaciones en una expresión. Cada operador tiene una precedencia asignada, lo que determina su prioridad en relación con otros operadores. Cuando hay múltiples operadores en una expresión, JavaScript utiliza su precedencia para decidir qué operación se realiza primero.

## Tabla de Precedencia de Operadores en JavaScript

JavaScript sigue una jerarquía de precedencia predefinida para sus operadores. A continuación, se presenta una tabla simplificada de algunos operadores comunes, ordenados de mayor a menor precedencia:

1. Paréntesis `( )`
2. Incremento/decremento `++ --`
3. Negación `!`
4. Exponenciación `*`
5. Multiplicación/división `/ %`
6. Suma/resta `+ -`
7. Concatenación de cadenas `+`
8. Operadores de comparación `> < >= <=`
9. Igualdad estricta `=== !==`
10. Operadores lógicos `&& ||`
11. Asignación `=`

Es importante tener en cuenta que esta es solo una lista parcial de operadores comunes y su precedencia relativa. Hay otros operadores en JavaScript con diferentes niveles de precedencia.

## Funcionamiento de la Precedencia en JavaScript

Para comprender mejor cómo funciona la precedencia en JavaScript, veamos algunos ejemplos prácticos:

### Ejemplo 1: Multiplicación vs. Suma

```jsx
let resultado = 2 + 3 * 4;
console.log(resultado); // Devuelve 14 (se evalúa primero la multiplicación)
```

En este ejemplo, la multiplicación se evalúa antes que la suma debido a la precedencia más alta del operador `*`.

### Ejemplo 2: Uso de Paréntesis

```jsx
let resultado = (2 + 3) * 4;
console.log(resultado); // Devuelve 20 (se evalúa primero la suma dentro de los paréntesis)
```

Los paréntesis pueden utilizarse para modificar la precedencia de los operadores y forzar la evaluación en un orden específico.

### Ejemplo 3: Asignación y Comparación

```jsx
let a = 5;
let b = 3;
let resultado = a * b > 10;
console.log(resultado); // Devuelve true (se evalúa primero la multiplicación y luego la comparación)
```

En este caso, la multiplicación se evalúa antes que la comparación debido a la precedencia del operador `>`.

## Conclusiones

La precedencia de operadores en JavaScript es un aspecto fundamental de la sintaxis del lenguaje que afecta directamente al resultado de las expresiones. Al comprender la jerarquía de precedencia y cómo se evalúan las expresiones en JavaScript, los desarrolladores pueden escribir código más claro, preciso y menos propenso a errores. Es importante tener en cuenta la precedencia al escribir expresiones complejas y utilizar paréntesis cuando sea necesario para evitar confusiones y garantizar el comportamiento deseado del código.
