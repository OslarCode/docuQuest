# Objetos

## ¿Qué son los Objetos en JavaScript?

En JavaScript, un objeto es una colección de pares de clave-valor donde cada clave es una cadena única y cada valor puede ser cualquier tipo de dato, incluidos otros objetos. Los objetos en JavaScript se utilizan para representar entidades complejas y estructuradas, como usuarios, productos, servicios, etc. Cada objeto en JavaScript es una instancia de una clase, que es una plantilla para crear objetos con propiedades y métodos específicos.

## Estructura de un Objeto Literal en JavaScript

La estructura básica de un objeto en JavaScript es la siguiente:

```jsx
let objeto = {
  clave1: valor1,
  clave2: valor2,
  // Otras claves y valores
};
```

En esta estructura, `clave1`, `clave2`, etc., son las claves del objeto, y `valor1`, `valor2`, etc., son los valores asociados a esas claves. Los valores pueden ser de cualquier tipo de dato, incluyendo números, cadenas, arreglos, funciones e incluso otros objetos.

✅ **Ventajas de los objetos literales**

✔ Rápidos y sencillos de crear.

✔ Útiles para datos únicos o configuraciones.

✔ No necesitas usar `new` para instanciarlos.

❌ **Desventajas**

❌ No puedes reutilizar el código fácilmente si necesitas múltiples objetos con la misma estructura.

❌ No hay herencia ni encapsulamiento.

### Ejemplo de un Objeto en Literal en JavaScript

```jsx
// Definición de un objeto persona
let persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
  saludar: function () {
    console.log(
      "¡Hola! Mi nombre es " + this.nombre + " y tengo " + this.edad + " años."
    );
  },
};

// Acceso a las propiedades del objeto
console.log(persona.nombre); // Imprime: Juan
console.log(persona.edad); // Imprime: 30

// Llamada a un método del objeto
persona.saludar(); // Imprime: ¡Hola! Mi nombre es Juan y tengo 30 años.
```

En este ejemplo, se define un objeto `persona` con tres propiedades (`nombre`, `edad` y `profesion`) y un método (`saludar`). Las propiedades se acceden utilizando la notación de punto (`persona.nombre`) y el método se llama de la misma manera (`persona.saludar()`).

## Funcionamiento de los Objetos en JavaScript

Los objetos en JavaScript funcionan como contenedores flexibles que permiten almacenar y organizar datos de manera eficiente. A continuación, exploraremos algunos conceptos clave sobre cómo funcionan los objetos en JavaScript:

### Acceso a Propiedades y Métodos

Las propiedades y métodos de un objeto se acceden utilizando la notación de punto (`objeto.propiedad`) o la notación de corchetes (`objeto['propiedad']`). La notación de punto es más común y fácil de leer, pero la notación de corchetes es útil cuando se accede a propiedades con nombres dinámicos o cuando el nombre de la propiedad contiene caracteres especiales.

```jsx
let persona = {
  nombre: "María",
  edad: 25,
  "lugar de nacimiento": "Madrid",
};

console.log(persona.nombre); // Imprime: María
console.log(persona["edad"]); // Imprime: 25
console.log(persona["lugar de nacimiento"]); // Imprime: Madrid
```

### Agregar y Modificar Propiedades

Las propiedades de un objeto pueden agregarse o modificarse en cualquier momento después de la creación del objeto utilizando la notación de punto o la notación de corchetes.

```jsx
let persona = {
  nombre: "Pedro",
  edad: 35,
};

persona.profesion = "Ingeniero"; // Agregar nueva propiedad
persona["lugar de residencia"] = "Barcelona"; // Agregar nueva propiedad con notación de corchetes

persona.edad = 40; // Modificar propiedad existente

console.log(persona);
```

### Eliminar Propiedades

Las propiedades de un objeto pueden eliminarse utilizando el operador `delete`.

```jsx
let persona = {
  nombre: "Ana",
  edad: 30,
  profesion: "Abogada",
};

delete persona.profesion; // Eliminar propiedad 'profesion'

console.log(persona);
```

## Métodos de Objetos en JavaScript

Los objetos en JavaScript pueden contener métodos, que son funciones asociadas al objeto. Estos métodos pueden realizar acciones y manipular los datos del objeto.

### Ejemplo de Método en un Objeto

```jsx
let persona = {
  nombre: "Carlos",
  edad: 28,
  saludar: function () {
    console.log(
      "¡Hola! Mi nombre es " + this.nombre + " y tengo " + this.edad + " años."
    );
  },
};

persona.saludar(); // Imprime: ¡Hola! Mi nombre es Carlos y tengo 28 años.
```

En este ejemplo, el método `saludar` del objeto `persona` imprime un mensaje saludando con el nombre y la edad de la persona.

🔹 **¿Qué es `this`?**

Es una palabra clave que hace referencia al objeto en el que se encuentra el código en ejecución.

📌 **Ejemplo básico:**

```jsx
javascript;
CopiarEditar;
const persona = {
  nombre: "Ana",
  saludar: function () {
    console.log("Hola, mi nombre es " + this.nombre);
  },
};

persona.saludar(); // Salida: Hola, mi nombre es Ana
```

👉 Aquí, `this.nombre` se refiere a `persona.nombre`, porque `this` apunta al objeto `persona`.

---

### 🛠 ¿Cómo cambia `this`?

1️⃣ **En un objeto:** `this` apunta al objeto en el que se ejecuta el método.

```jsx
javascript;
CopiarEditar;
const coche = {
  marca: "Toyota",
  mostrarMarca: function () {
    console.log("Marca: " + this.marca);
  },
};

coche.mostrarMarca(); // Marca: Toyota
```

2️⃣ **En una función normal (modo estricto):** `this` es `undefined`.

```jsx
javascript;
CopiarEditar;
("use strict");
function prueba() {
  console.log(this);
}
prueba(); // undefined
```

3️⃣ **En una función dentro de otra función:** `this` puede perder su contexto.

```jsx
javascript;
CopiarEditar;
const usuario = {
  nombre: "Carlos",
  mostrar: function () {
    function interna() {
      console.log(this.nombre);
    }
    interna();
  },
};

usuario.mostrar(); // undefined
```

👉 Aquí, `this` dentro de `interna()` ya no apunta a `usuario`, sino al **objeto global (`window` en navegadores o `undefined` en modo estricto)**.

💡 **Solución:** Usar `bind()` o una arrow function.

```jsx
javascript;
CopiarEditar;
const usuario = {
  nombre: "Carlos",
  mostrar: function () {
    const interna = () => {
      console.log(this.nombre);
    };
    interna();
  },
};

usuario.mostrar(); // Carlos
```

✅ **Las arrow functions heredan `this` del contexto donde fueron creadas.**

## Estructura de un objeto con clases (ES6+)

Las clases en JavaScript permiten crear "moldes" para generar múltiples instancias de un objeto con las mismas propiedades y métodos.

📌 **Ejemplo de clase en JavaScript:**

```jsx
javascript;
CopiarEditar;
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

// Crear instancias de la clase
const juan = new Persona("Juan", 30);
const maria = new Persona("María", 25);

juan.saludar(); // Hola, soy Juan
maria.saludar(); // Hola, soy María
```

✅ **Ventajas de las clases**

✔ Permiten reutilización del código mediante instancias.

✔ Soportan **herencia** (`extends`), lo que facilita la organización del código.

✔ Son más estructuradas y fáciles de mantener en proyectos grandes.

❌ **Desventajas**

❌ Para objetos pequeños, es más código del necesario.

❌ Requiere el uso de `new` para crear instancias.

❌ Puede ser más lento en rendimiento si solo necesitas un objeto único.

## 🛠 **¿Cuándo usar cada uno?**

| Caso                                      | Objeto Literal `{}` | Clase `class`   |
| ----------------------------------------- | ------------------- | --------------- |
| Datos únicos o de configuración           | ✅ Sí               | ❌ No necesario |
| Múltiples instancias con misma estructura | ❌ No recomendado   | ✅ Ideal        |
| Reutilización de código                   | ❌ Difícil          | ✅ Sí           |
| Soporte para herencia                     | ❌ No               | ✅ Sí           |

🔹 **Si necesitas un objeto rápido y único → Usa un objeto literal `{}`.**

🔹 **Si necesitas crear varios objetos con la misma estructura → Usa una clase.**

## Conclusiones

En resumen, los objetos en JavaScript son elementos fundamentales que permiten organizar y estructurar datos de manera efectiva. Con su capacidad para contener propiedades y métodos, los objetos proporcionan una forma poderosa de modelar entidades y funcionalidades en aplicaciones web y más allá. Al comprender cómo funcionan los objetos en JavaScript y cómo utilizarlos de manera efectiva, los desarrolladores pueden escribir código más limpio, legible y mantenible, lo que contribuye a la creación de aplicaciones robustas y escalables.
