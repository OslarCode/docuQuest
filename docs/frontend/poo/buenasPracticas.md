# Proyecto final y buenas prácticas con JavaScript

En este sexto y último módulo, consolidaremos los conocimientos adquiridos sobre la Programación Orientada a Objetos (POO) en JavaScript mediante el desarrollo de una mini aplicación web. Además, exploraremos buenas prácticas y principios de diseño que nos permitirán escribir código limpio, reutilizable y mantenible

## Desarrollo de una Mini Aplicación Web Orientada a Objetos

Para aplicar los conceptos de POO en un contexto práctico, desarrollaremos una mini aplicación web que gestione una lista de tareas (To-Do List). Esta aplicación permitirá agregar, marcar como completadas y eliminar tareas, todo ello utilizando clases y manipulando el DOM de manera orientada a objetos

### Definición de clases y relaciones

Comenzaremos definiendo dos clases principales: `Tarea` y `ListaDeTareas`

**Clase `Tarea`:**

Esta clase representará una tarea individual con propiedades como `id`, `descripcion` y `completada`

```jsx
class Tarea {
  constructor(id, descripcion) {
    this.id = id;
    this.descripcion = descripcion;
    this.completada = false;
  }

  marcarComoCompletada() {
    this.completada = true;
  }
}
```

**Clase `ListaDeTareas`:**

Esta clase gestionará un conjunto de tareas y proporcionará métodos para agregar, eliminar y obtener tareas

```jsx
class ListaDeTareas {
  constructor() {
    this.tareas = [];
    this.idActual = 1;
  }

  agregarTarea(descripcion) {
    const tarea = new Tarea(this.idActual++, descripcion);
    this.tareas.push(tarea);
    return tarea;
  }

  eliminarTarea(id) {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  }

  obtenerTareas() {
    return this.tareas;
  }
}
```

### Manipulación del DOM

Para interactuar con el usuario, necesitaremos manipular el DOM para mostrar la lista de tareas y actualizarla en respuesta a las acciones del usuario

**Clase `InterfazDeUsuario`:**

Esta clase se encargará de la interacción con el DOM, renderizando las tareas y manejando los eventos del usuario

```jsx
class InterfazDeUsuario {
  constructor(listaDeTareas) {
    this.listaDeTareas = listaDeTareas;
    this.contenedorTareas = document.getElementById("contenedorTareas");
    this.formulario = document.getElementById("formularioTarea");
    this.inputTarea = document.getElementById("inputTarea");

    this.formulario.addEventListener("submit", (e) => this.agregarTarea(e));
  }

  agregarTarea(evento) {
    evento.preventDefault();
    const descripcion = this.inputTarea.value.trim();
    if (descripcion) {
      const tarea = this.listaDeTareas.agregarTarea(descripcion);
      this.inputTarea.value = "";
      this.renderizarTarea(tarea);
    }
  }

  renderizarTarea(tarea) {
    const elementoTarea = document.createElement("div");
    elementoTarea.className = "tarea";
    elementoTarea.dataset.id = tarea.id;
    elementoTarea.innerHTML = `
      <span>${tarea.descripcion}</span>
      <button class="completar">Completar</button>
      <button class="eliminar">Eliminar</button>
    `;

    elementoTarea
      .querySelector(".completar")
      .addEventListener("click", () => this.completarTarea(tarea.id));
    elementoTarea
      .querySelector(".eliminar")
      .addEventListener("click", () => this.eliminarTarea(tarea.id));

    this.contenedorTareas.appendChild(elementoTarea);
  }

  completarTarea(id) {
    const tarea = this.listaDeTareas.tareas.find((t) => t.id === id);
    if (tarea) {
      tarea.marcarComoCompletada();
      const elementoTarea = this.contenedorTareas.querySelector(
        `[data-id='${id}']`
      );
      elementoTarea.classList.add("completada");
    }
  }

  eliminarTarea(id) {
    this.listaDeTareas.eliminarTarea(id);
    const elementoTarea = this.contenedorTareas.querySelector(
      `[data-id='${id}']`
    );
    if (elementoTarea) {
      this.contenedorTareas.removeChild(elementoTarea);
    }
  }
}
```

### Uso de eventos

La clase `InterfazDeUsuario` maneja eventos del usuario, como el envío del formulario para agregar una tarea y los clics en los botones de completar y eliminar. Esto se logra utilizando el método `addEventListener` para asociar funciones que respondan a estos eventos

---

## Buenas Prácticas y Optimización

Para garantizar que nuestro código sea limpio, eficiente y fácil de mantener, es fundamental seguir ciertas buenas prácticas y principios de diseño.

### Código limpio y reutilizable

- **Nombres descriptivos:** Utilizar nombres claros y significativos para variables, funciones y clases
- **Funciones y métodos concisos:** Cada función o método debe realizar una única tarea específica
- **Evitar la duplicación de código:** Reutilizar funciones y métodos en lugar de repetir bloques de código similares

### Principios SOLID en JavaScript

Los principios SOLID son cinco directrices que ayudan a diseñar software más comprensible, flexible y mantenible:

1. **Responsabilidad Única (Single Responsibility Principle):** Cada clase debe tener una única responsabilidad o motivo para cambiar
2. **Abierto/Cerrado (Open/Closed Principle):** Las clases deben estar abiertas para extensión pero cerradas para modificación
3. **Sustitución de Liskov (Liskov Substitution Principle):** Las clases derivadas deben ser sustituibles por sus clases base sin alterar el comportamiento esperado del programa
4. **Segregación de Interfaces (Interface Segregation Principle):** Los clientes no deben estar obligados a depender de interfaces que no utilizan
5. **Inversión de Dependencias (Dependency Inversion Principle):** Las clases deben depender de abstracciones y no de implementaciones concretas

Aplicar estos principios en JavaScript implica diseñar nuestras clases y módulos de manera que sean fáciles de entender
