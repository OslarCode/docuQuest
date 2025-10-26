# Clases y métodos en JavaScript (ES6+)

En este módulo, exploraremos las **Clases y Métodos en JavaScript (ES6+)**, centrándonos en su definición, uso del constructor, instanciación de objetos, encapsulación y métodos estáticos. Estos conceptos son fundamentales para aplicar la Programación Orientada a Objetos (POO) en JavaScript de manera efectiva.

## Introducción a las Clases en JavaScript

Con la introducción de ECMAScript 2015 (ES6), JavaScript incorporó la sintaxis de **clases**, proporcionando una forma más clara y concisa de trabajar con objetos y herencia. Aunque las clases en JavaScript son una mejora sintáctica sobre la herencia basada en prototipos, no introducen un nuevo modelo de herencia orientada a objetos.

### Definición de clases con `class`

Para definir una clase en JavaScript, utilizamos la palabra clave `class` seguida del nombre de la clase. Por convención, los nombres de las clases comienzan con una letra mayúscula.

**Ejemplo:**

```jsx
class Persona {
  // Definición de la clase
}
```

### Métodos en clases

Dentro de una clase, podemos definir métodos que representen comportamientos asociados a esa clase. Estos métodos se declaran sin la palabra clave `function`.

**Ejemplo:**

```jsx
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, me llamo ${this.nombre} y tengo ${this.edad} años.`);
  }
}
```

En este ejemplo, hemos definido la clase `Persona` con un método `saludar` que imprime un saludo en la consola.

### El método `constructor()`

El `constructor` es un método especial que se invoca automáticamente al crear una nueva instancia de la clase. Se utiliza para inicializar las propiedades del objeto.

**Ejemplo:**

```jsx
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
}
```

Aquí, el constructor recibe dos parámetros (`nombre` y `edad`) y asigna estos valores a las propiedades del objeto.

### Instanciación de objetos

Para crear una instancia de una clase, utilizamos la palabra clave `new` seguida del nombre de la clase y los argumentos necesarios para el constructor.

**Ejemplo:**

```jsx
const persona1 = new Persona("Ana", 30);
persona1.saludar(); // Hola, me llamo Ana y tengo 30 años.
```

En este caso, hemos creado una instancia de la clase `Persona` llamada `persona1` y hemos llamado al método `saludar`.

---

## Encapsulación y Métodos Estáticos

La **encapsulación** es un principio de la POO que consiste en restringir el acceso directo a ciertas propiedades o métodos de un objeto, permitiendo controlarlos a través de métodos públicos. JavaScript ofrece mecanismos para lograr esta encapsulación, incluyendo propiedades privadas y métodos estáticos.

### Propiedades y métodos públicos

Por defecto, todas las propiedades y métodos definidos en una clase son públicos, es decir, accesibles desde fuera de la clase.

**Ejemplo:**

```jsx
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, me llamo ${this.nombre}.`);
  }
}

const persona1 = new Persona("Luis", 25);
console.log(persona1.nombre); // Luis
persona1.saludar(); // Hola, me llamo Luis.
```

En este ejemplo, tanto la propiedad `nombre` como el método `saludar` son públicos y pueden ser accedidos directamente desde fuera de la clase.

### Propiedades y métodos privados con `#`

A partir de ECMAScript 2022, JavaScript introdujo la sintaxis de campos privados utilizando el prefijo `#`. Las propiedades y métodos privados no son accesibles desde fuera de la clase, lo que permite una encapsulación más estricta.

**Ejemplo:**

```jsx
class CuentaBancaria {
  #saldo = 0;

  constructor(nombre) {
    this.nombre = nombre;
  }

  depositar(cantidad) {
    if (cantidad > 0) {
      this.#saldo += cantidad;
      console.log(`Depósito exitoso. Saldo actual: ${this.#saldo}`);
    } else {
      console.log("La cantidad debe ser positiva.");
    }
  }

  retirar(cantidad) {
    if (cantidad > 0 && cantidad <= this.#saldo) {
      this.#saldo -= cantidad;
      console.log(`Retiro exitoso. Saldo actual: ${this.#saldo}`);
    } else {
      console.log("Fondos insuficientes o cantidad inválida.");
    }
  }

  #actualizarSaldo(nuevoSaldo) {
    this.#saldo = nuevoSaldo;
  }
}

const cuenta = new CuentaBancaria("Carlos");
cuenta.depositar(100); // Depósito exitoso. Saldo actual: 100
cuenta.retirar(50); // Retiro exitoso. Saldo actual: 50
console.log(cuenta.#saldo); // SyntaxError: Private field '#saldo' must be declared in an enclosing class
```

En este ejemplo, la propiedad `#saldo` y el método `#actualizarSaldo` son privados y no pueden ser accedidos directamente desde fuera de la clase, garantizando que el saldo solo pueda ser modificado mediante los métodos públicos `depositar` y `retirar`.

### Métodos estáticos con `static`

Los **métodos estáticos** son funciones asociadas a la clase en sí misma, no a las instancias de la clase. Se definen utilizando la palabra clave `static` y se invocan directamente desde la clase, sin necesidad de crear una instancia.

**Ejemplo:**

```jsx
class Calculadora {
  static sumar(a, b) {
    return a + b;
  }

  static restar(a, b) {
    return a - b;
  }
}

// Llamada a los métodos estáticos sin instanciar la clase
console.log(Calculadora.sumar(5, 3)); // 8
console.log(Calculadora.restar(10, 4)); // 6
```

En este caso, `sumar` y `restar` son métodos estáticos de la clase `Calculadora`, lo que significa que no es necesario crear una instancia para utilizarlos. Esto es útil para funciones auxiliares o utilidades que no dependen de los atributos de una instancia.

---

## **Conclusión**

Las **clases en JavaScript** proporcionan una forma más estructurada y legible de trabajar con objetos en la Programación Orientada a Objetos (POO). En este módulo hemos aprendido sobre:

✅ Definir clases con `class`.

✅ Crear métodos dentro de una clase.

✅ Usar el `constructor()` para inicializar objetos.

✅ Instanciar objetos con `new`.

✅ Aplicar encapsulación con propiedades privadas `#`.

✅ Definir métodos estáticos con `static`.
