# Herencia y polimorfismo en JavaScript

En este módulo, profundizaremos en los conceptos de **Herencia y Polimorfismo en JavaScript**, fundamentales en la Programación Orientada a Objetos (POO). Estos principios permiten crear estructuras de código más organizadas, reutilizables y escalables.

## Herencia en JavaScript

La **herencia** es un mecanismo que permite a una clase derivar propiedades y métodos de otra clase. En JavaScript, a partir de ECMAScript 6 (ES6), se introdujo la sintaxis de clases que facilita la implementación de la herencia.

### Uso de `extends` para herencia de clases

La palabra clave `extends` se utiliza para crear una clase que hereda de otra. Esto establece una relación de prototipo entre la clase hija y la clase padre.

**Ejemplo:**

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
  constructor(nombre, raza) {
    super(nombre);
    this.raza = raza;
  }

  ladrar() {
    console.log(`${this.nombre} ladra.`);
  }
}

const miPerro = new Perro("Rex", "Labrador");
miPerro.hacerSonido(); // Rex hace un sonido.
miPerro.ladrar(); // Rex ladra.
```

En este ejemplo, `Perro` hereda de `Animal`, adquiriendo sus propiedades y métodos. Además, `Perro` añade el método `ladrar`.

### Llamado al constructor padre con `super()`

Dentro del constructor de la clase hija, es necesario llamar a `super()` para invocar el constructor de la clase padre. Esto asegura que las propiedades heredadas sean inicializadas correctamente.

**Ejemplo:**

```jsx
class Vehiculo {
  constructor(marca) {
    this.marca = marca;
  }
}

class Coche extends Vehiculo {
  constructor(marca, modelo) {
    super(marca);
    this.modelo = modelo;
  }
}

const miCoche = new Coche("Toyota", "Corolla");
console.log(miCoche.marca); // Toyota
console.log(miCoche.modelo); // Corolla
```

Aquí, `Coche` llama a `super(marca)` para inicializar la propiedad `marca` definida en `Vehiculo`.

### Sobreescritura de métodos

La **sobreescritura de métodos** permite que una clase hija proporcione una implementación específica de un método que ya está definido en su clase padre.

**Ejemplo:**

```jsx
class Animal {
  hacerSonido() {
    console.log("Sonido genérico de animal.");
  }
}

class Gato extends Animal {
  hacerSonido() {
    console.log("El gato maúlla.");
  }
}

const miGato = new Gato();
miGato.hacerSonido(); // El gato maúlla.
```

En este caso, `Gato` sobrescribe el método `hacerSonido` de `Animal` para proporcionar su propia implementación.

---

## Polimorfismo en JavaScript

El **polimorfismo** es la capacidad de diferentes clases para ser tratadas como instancias de la misma clase a través de una interfaz común. Esto permite que métodos con el mismo nombre actúen de manera diferente según la clase que los implemente.

### Métodos sobrescritos (method overriding)

Como se mostró anteriormente, las clases hijas pueden sobrescribir métodos de sus clases padres para proporcionar comportamientos específicos.

**Ejemplo adicional:**

```jsx
class Ave {
  volar() {
    console.log("El ave vuela.");
  }
}

class Pinguino extends Ave {
  volar() {
    console.log("El pingüino no puede volar.");
  }
}

const miAve = new Ave();
const miPinguino = new Pinguino();

miAve.volar(); // El ave vuela.
miPinguino.volar(); // El pingüino no puede volar.
```

Aquí, aunque `Pinguino` es una subclase de `Ave`, sobrescribe el método `volar` para reflejar su incapacidad para volar.

### Uso de clases abstractas (simulación)

JavaScript no tiene soporte nativo para **clases abstractas**, pero podemos simular este comportamiento lanzando errores en métodos que deben ser implementados por las clases derivadas.

**Ejemplo:**

```jsx
class Figura {
  constructor() {
    if (new.target === Figura) {
      throw new Error("No se puede instanciar una clase abstracta.");
    }
  }

  calcularArea() {
    throw new Error("El método calcularArea() debe ser implementado.");
  }
}

class Circulo extends Figura {
  constructor(radio) {
    super();
    this.radio = radio;
  }

  calcularArea() {
    return Math.PI * this.radio ** 2;
  }
}

const miCirculo = new Circulo(5);
console.log(miCirculo.calcularArea()); // 78.53981633974483

const miFigura = new Figura(); // Error: No se puede instanciar una clase abstracta.
```

En este ejemplo, `Figura` actúa como una clase abstracta. Intentar instanciar `Figura` directamente lanza un error, y cualquier subclase debe implementar el método `calcularArea`.

---

Comprender y aplicar **herencia** y **polimorfismo** en JavaScript es esencial para desarrollar aplicaciones robustas y mantenibles. Estos conceptos permiten estructurar el código de manera que sea fácil de extender y reutilizar, facilitando la colaboración y el crecimiento del proyecto.
