# Objetos y prototipos en JavaScript

En este módulo, exploraremos los **Objetos y Prototipos en JavaScript**, comprendiendo cómo este lenguaje implementa la Programación Orientada a Objetos (POO) de manera única. Abordaremos las diferencias entre la POO clásica y la basada en prototipos, la creación y manipulación de objetos, y profundizaremos en el concepto de prototipos y su papel en la herencia.

## JavaScript y su Modelo Basado en Prototipos

### Diferencia entre la POO clásica y la POO en JavaScript

En la **POO clásica**, presente en lenguajes como Java o C++, la estructura se basa en **clases** que actúan como plantillas para crear objetos. Estas clases definen propiedades y métodos que las instancias (objetos) heredarán.

Por otro lado, **JavaScript** implementa una **POO basada en prototipos**, donde no existen clases en el sentido tradicional. En su lugar, los objetos pueden heredar directamente de otros objetos. Cada objeto tiene una propiedad interna llamada `[[Prototype]]` que apunta a otro objeto, formando una cadena de prototipos. Esto permite la reutilización y extensión de propiedades y métodos sin la necesidad de clases.

### Creación de objetos con literales

La forma más sencilla de crear un objeto en JavaScript es utilizando la **notación literal**:

```jsx
const persona = {
  nombre: "Ana",
  edad: 28,
  saludar() {
    console.log(`Hola, me llamo ${this.nombre}.`);
  },
};
```

Aquí, `persona` es un objeto con propiedades `nombre` y `edad`, y un método `saludar`.

### Manipulación de propiedades y métodos

Podemos acceder y modificar las propiedades y métodos de un objeto de la siguiente manera:

```jsx
// Acceder a una propiedad
console.log(persona.nombre); // Ana

// Modificar una propiedad
persona.edad = 29;

// Añadir una nueva propiedad
persona.profesion = "Ingeniera";

// Llamar a un método
persona.saludar(); // Hola, me llamo Ana.
```

También es posible eliminar propiedades usando el operador `delete`:

```jsx
delete persona.profesion;
```

---

## Prototipos en JavaScript

### ¿Qué es un prototipo?

Un **prototipo** es un objeto del cual otro objeto hereda propiedades y métodos. Cuando intentamos acceder a una propiedad o método en un objeto, JavaScript busca primero en el propio objeto. Si no lo encuentra, continúa la búsqueda en su prototipo, y así sucesivamente hasta llegar a `null`. Esta cadena de búsqueda se conoce como **cadena de prototipos**.

### Herencia prototípica

La **herencia prototípica** permite que un objeto herede propiedades y métodos de otro objeto. Esto se logra asignando el prototipo de un objeto a otro objeto.

**Ejemplo:**

```jsx
const animal = {
  tipo: "mamífero",
  hacerSonido() {
    console.log("Sonido genérico");
  },
};

const perro = Object.create(animal);
perro.hacerSonido(); // Sonido genérico
```

En este ejemplo, `perro` hereda las propiedades y métodos de `animal` a través de la herencia prototípica.

### `Object.create()`, `Object.getPrototypeOf()` y `Object.setPrototypeOf()`

JavaScript proporciona métodos para trabajar con prototipos de manera más controlada:

- **`Object.create(proto, [propertiesObject])`**: Crea un nuevo objeto con el prototipo especificado.

```jsx
const gato = Object.create(animal, {
  nombre: {
    value: "Misu",
    writable: true,
    enumerable: true,
    configurable: true,
  },
});
console.log(gato.tipo); // mamífero
```

- **`Object.getPrototypeOf(obj)`**: Devuelve el prototipo del objeto especificado.

```jsx
console.log(Object.getPrototypeOf(gato) === animal); // true
```

- **`Object.setPrototypeOf(obj, proto)`**: Establece el prototipo de un objeto.

```jsx
const reptil = {
  tipo: "reptil",
};
Object.setPrototypeOf(gato, reptil);
console.log(gato.tipo); // reptil
```

**Nota:** Modificar el prototipo de un objeto existente con `Object.setPrototypeOf` puede tener implicaciones de rendimiento y debe hacerse con precaución.

### Propiedades y métodos heredados

Cuando un objeto hereda propiedades y métodos de su prototipo, puede acceder a ellos como si fueran propios. Sin embargo, si se define una propiedad o método con el mismo nombre en el objeto hijo, este sobrescribirá al del prototipo.

**Ejemplo:**

```jsx
const ave = {
  volar() {
    console.log("Volando");
  },
};

const pajaro = Object.create(ave);
pajaro.volar(); // Volando

pajaro.volar = function () {
  console.log("El pájaro está volando");
};
pajaro.volar(); // El pájaro está volando
```

En este caso, `pajaro` sobrescribe el método `volar` heredado de `ave` con su propia implementación.

---

Comprender el modelo de prototipos en JavaScript es esencial para aprovechar al máximo las características del lenguaje y escribir código más eficiente y reutilizable.
