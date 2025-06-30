# Fundamentos de la programación orientada a objetos (Poo)

La **Programación Orientada a Objetos (POO)** es un paradigma de programación que organiza el diseño de software en torno a **objetos**, que son instancias de **clases**. Este enfoque permite modelar entidades del mundo real de manera más intuitiva, facilitando la gestión y escalabilidad de aplicaciones complejas

## ¿Qué es la Programación Orientada a Objetos?

La POO se centra en la creación de objetos que contienen tanto **datos** (atributos o propiedades) como **comportamientos** (métodos o funciones). Cada objeto es una instancia de una **clase**, que actúa como plantilla o molde para crear objetos con características y comportamientos similares

**Ejemplo en JavaScript ES6+:**

```jsx
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
  }
}

const persona1 = new Persona("Ana", 30);
persona1.saludar(); // Hola, mi nombre es Ana y tengo 30 años.
```

## Beneficios y aplicaciones en el desarrollo web

La adopción de la POO en el desarrollo web ofrece múltiples ventajas:

- **Modularidad:** Permite dividir el código en piezas independientes (clases y objetos), facilitando su mantenimiento y reutilización
- **Reutilización:** Las clases pueden ser reutilizadas en diferentes partes de la aplicación o en proyectos distintos, reduciendo la duplicación de código
- **Escalabilidad:** Facilita la ampliación de funcionalidades sin afectar significativamente el código existente
- **Mantenibilidad:** Al tener una estructura organizada, es más sencillo identificar y corregir errores o implementar mejoras

En el desarrollo web, la POO es fundamental para construir aplicaciones robustas y escalables, especialmente cuando se trabaja con frameworks y bibliotecas modernas que siguen este paradigma

## Comparación entre programación estructurada y orientada a objetos

La **programación estructurada** se basa en la división del programa en funciones o procedimientos, enfocándose en la secuencia lógica de las operaciones. Por otro lado, la **programación orientada a objetos** organiza el código en torno a objetos que representan entidades del mundo real

**Diferencias clave:**

- **Enfoque:**
  - _Estructurada:_ Basada en funciones y procedimientos
  - _Orientada a objetos:_ Basada en objetos y clases
- **Modularidad:**
  - _Estructurada:_ Se logra mediante funciones
  - _Orientada a objetos:_ Se logra mediante clases y objetos, facilitando una mayor encapsulación
- **Reutilización:**
  - _Estructurada:_ Limitada a funciones reutilizables
  - _Orientada a objetos:_ Alta reutilización mediante herencia y polimorfismo

La POO ofrece una estructura más cercana a cómo percibimos el mundo real, lo que puede simplificar el diseño y desarrollo de aplicaciones complejas

## Principios de la POO

La POO se basa en cuatro pilares fundamentales: **Abstracción**, **Encapsulación**, **Herencia** y **Polimorfismo**

### Abstracción

La **abstracción** consiste en identificar y modelar las características esenciales de una entidad, omitiendo detalles irrelevantes. Esto permite centrarse en aspectos significativos para el contexto de la aplicación

**Ejemplo en JavaScript ES6+:**

```jsx
class Coche {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }

  arrancar() {
    console.log(`${this.marca} ${this.modelo} está arrancando.`);
  }

```

En este ejemplo, la clase `Coche` abstrae las propiedades y comportamientos esenciales de un coche, como su marca, modelo y la capacidad de arrancar

### Encapsulación

La **encapsulación** es el mecanismo que permite ocultar los detalles internos de un objeto y exponer solo lo necesario a través de una interfaz pública. Esto protege la integridad del objeto y previene accesos indebidos a su estado interno

**Ejemplo en JavaScript ES6+:**

```jsx
class CuentaBancaria {
  #saldo = 0; // Propiedad privada

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
}

const cuenta = new CuentaBancaria();
cuenta.depositar(100); // Depósito exitoso. Saldo actual: 100
cuenta.retirar(50); // Retiro exitoso. Saldo actual: 50
cuenta.#saldo = 1000; // Error: No se puede acceder a una propiedad privada
```

Aquí, la propiedad `#saldo` es privada y solo puede ser manipulada mediante los métodos públicos `depositar` y `retirar`, garantizando la encapsulación del estado interno de la cuenta bancaria

### Herencia

La **herencia** permite que una clase (subclase) adquiera propiedades y métodos de otra clase (superclase), facilitando la reutilización y extensión del código

**Ejemplo en JavaScript ES6+:**

```jsx
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hacerSonido() {
    console.log(`${this.nombre} hace un sonido.`);
  }
}

class Perro extends Animal {
  hacerSonido() {
    console.log(`${this.nombre} ladra.`);
  }
}

const perro1 = new Perro("Firulais");
perro1.hacerSonido(); // Firulais ladra.
```

En este ejemplo, la clase `Perro` hereda de `Animal`, pero sobrescribe el método `hacerSonido()` para personalizar su comportamiento.

---

### **Polimorfismo**

El **polimorfismo** permite que diferentes clases implementen el mismo método de manera distinta, proporcionando flexibilidad y facilitando la extensibilidad del código.

**Ejemplo en JavaScript ES6+:**

```jsx
class Figura {
  calcularArea() {
    throw new Error("Este método debe ser implementado por una subclase.");
  }
}

class Cuadrado extends Figura {
  constructor(lado) {
    super();
    this.lado = lado;
  }

  calcularArea() {
    return this.lado * this.lado;
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super();
    this.radio = radio;
  }

  calcularArea() {
    return Math.PI * this.radio * this.radio;
  }
}

const cuadrado = new Cuadrado(4);
console.log(`Área del cuadrado: ${cuadrado.calcularArea()}`); // Área del cuadrado: 16

const circulo = new Circulo(3);
console.log(`Área del círculo: ${circulo.calcularArea()}`); // Área del círculo: 28.27...
```

En este ejemplo, la clase `Figura` define un método `calcularArea()`, que es sobrescrito por sus subclases `Cuadrado` y `Circulo`. Esto permite que objetos diferentes puedan responder a la misma interfaz de manera única.

---

## **Conclusión**

La **Programación Orientada a Objetos (POO)** es un enfoque fundamental en el desarrollo de aplicaciones web modernas. Sus principios clave (**Abstracción, Encapsulación, Herencia y Polimorfismo**) proporcionan una base sólida para escribir código reutilizable, modular y escalable.

A lo largo del curso, aplicaremos estos conceptos en escenarios reales del desarrollo web, integrándolos con tecnologías actuales para maximizar su potencial.
