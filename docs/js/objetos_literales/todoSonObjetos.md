# ¿Por qué en JavaScript se dice que todo son objetos?

Se dice que en **JavaScript todo son objetos** porque, en su núcleo, la mayoría de los valores y estructuras de datos en JavaScript pueden comportarse como objetos o son efectivamente objetos. Aquí hay algunas razones clave:

### 1. **Los tipos de datos primitivos tienen envoltorios de objeto**

- Aunque JavaScript tiene tipos primitivos como `string`, `number`, `boolean`, `null`, `undefined`, `bigint` y `symbol`, cuando se accede a métodos de estos valores, JavaScript automáticamente los envuelve en sus versiones de objeto.
- Ejemplo:

Internamente, JavaScript convierte `"Hola"` en un `new String("Hola")`, lo que permite el acceso a métodos.
    
    ```jsx
    let str = "Hola";
    console.log(str.toUpperCase()); // "HOLA"
    ```
    

### 2. **Todo lo que no es primitivo es un objeto**

- Los arrays (`[]`), funciones (`function`), objetos (`{}`), fechas (`new Date()`), expresiones regulares (`/regex/`), y casi todas las demás estructuras de datos en JavaScript son objetos.
- Ejemplo:

Aunque `arr` es un array, en JavaScript sigue siendo tratado como un objeto.
    
    ```jsx
    let arr = [1, 2, 3];
    console.log(typeof arr); // "object"
    
    ```
    

### 3. **Las funciones son objetos de primera clase**

- En JavaScript, las funciones son en realidad objetos con una propiedad especial (`[[Call]]`) que les permite ejecutarse.
- Ejemplo:

Como puedes ver, una función puede tener propiedades, lo que confirma que es un objeto.
    
    ```jsx
    function saludar() {
      console.log("Hola");
    }
    saludar.propiedad = "Soy un objeto";
    console.log(saludar.propiedad); // "Soy un objeto"
    
    ```
    

### 4. **Los objetos pueden extenderse dinámicamente**

- A diferencia de otros lenguajes más estrictos, en JavaScript se pueden agregar propiedades a objetos en cualquier momento.
- Ejemplo:
    
    ```jsx
    let persona = { nombre: "Juan" };
    persona.edad = 30;
    console.log(persona); // { nombre: "Juan", edad: 30 }
    
    ```
    

### 5. **El prototipo de los objetos**

- Todos los objetos en JavaScript heredan propiedades y métodos de un prototipo (`Object.prototype`, `Array.prototype`, etc.).
- Ejemplo:

Aunque `obj` está vacío, hereda `toString()` de `Object.prototype`.
    
    ```jsx
    let obj = {};
    console.log(obj.toString()); // "[object Object]"
    
    ```
    

### **Conclusión**

En JavaScript, **todo es un objeto o se comporta como tal**, excepto los tipos de datos primitivos en su estado puro. Sin embargo, incluso estos pueden ser envueltos en objetos temporalmente para permitir el uso de métodos y propiedades. Esta flexibilidad es lo que da lugar a la afirmación de que *"en JavaScript, todo es un objeto"*. 🚀