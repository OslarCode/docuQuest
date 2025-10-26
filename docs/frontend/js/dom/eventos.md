# Eventos

# Los Eventos del DOM en JavaScript en Páginas Web

### Introducción

Los eventos del Modelo de Objetos del Documento (DOM) en JavaScript son fundamentales para crear páginas web interactivas y dinámicas. Los eventos permiten que el navegador responda a acciones del usuario, como clics, desplazamientos y envíos de formularios, proporcionando una forma eficaz de implementar comportamientos personalizados en respuesta a las interacciones del usuario. Este texto académico explorará en profundidad las interacciones del usuario que disparan acciones en JavaScript, ejemplos comunes de eventos como `click`, `mouseover`, y `submit`, y cómo asociar eventos a elementos utilizando el método `element.addEventListener()`.

## 1. Interacciones del Usuario que Disparan Acciones en JavaScript

### 1.1 Definición de Eventos del DOM

En el contexto del DOM, un evento es cualquier acción o suceso que tiene lugar en el navegador y que puede ser detectado por JavaScript. Estos eventos pueden ser causados por acciones del usuario, como hacer clic en un botón, o por eventos del sistema, como la carga completa de una página web. Cuando se produce un evento, el navegador genera un objeto de evento que contiene información sobre lo ocurrido, como el tipo de evento y el elemento en el que ocurrió.

### 1.2 Tipos de Eventos del DOM

Existen múltiples tipos de eventos que pueden ser gestionados en una página web, categorizados según la acción que representan. Los eventos más comunes incluyen:

- **Eventos de ratón**: `click`, `dblclick`, `mousedown`, `mouseup`, `mouseover`, `mouseout`, `mousemove`.
- **Eventos de teclado**: `keydown`, `keypress`, `keyup`.
- **Eventos de formulario**: `submit`, `reset`, `focus`, `blur`, `change`.
- **Eventos de documento**: `DOMContentLoaded`, `load`, `unload`, `scroll`.
- **Eventos de ventana**: `resize`, `scroll`.

### 1.3 Modelo de Eventos del DOM

El modelo de eventos del DOM define cómo se propagan los eventos a través del árbol del DOM y cómo se pueden gestionar en diferentes niveles. Existen tres fases en el ciclo de vida de un evento:

- **Captura**: El evento se propaga desde el documento raíz hasta el elemento objetivo.
- **Target**: El evento alcanza el elemento objetivo.
- **Burbujeo**: El evento se propaga de regreso desde el elemento objetivo hasta el documento raíz.

JavaScript permite interceptar y gestionar eventos en cualquiera de estas fases, proporcionando flexibilidad en la forma en que se manejan las interacciones del usuario.

## 2. Ejemplos Comunes de Eventos del DOM

### 2.1 Evento `click`

El evento `click` es uno de los eventos más comunes en el desarrollo web, disparado cuando un usuario hace clic en un elemento. Este evento es fundamental para interactuar con botones, enlaces y otras áreas interactivas de una página web.

### Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Evento Click</title>
  </head>
  <body>
    <button id="myButton">Haz clic aquí</button>
    <script>
      document
        .getElementById("myButton")
        .addEventListener("click", function () {
          alert("Botón clicado!");
        });
    </script>
  </body>
</html>
```

En este ejemplo, se añade un detector de eventos al botón que muestra una alerta cuando se hace clic en él.

### 2.2 Evento `mouseover`

El evento `mouseover` se dispara cuando el cursor del ratón se desplaza sobre un elemento. Este evento es útil para crear efectos de desplazamiento y menús desplegables.

### Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Evento Mouseover</title>
  </head>
  <body>
    <div
      id="hoverDiv"
      style="width:100px;height:100px;background-color:blue;"
    ></div>
    <script>
      document
        .getElementById("hoverDiv")
        .addEventListener("mouseover", function () {
          this.style.backgroundColor = "red";
        });
      document
        .getElementById("hoverDiv")
        .addEventListener("mouseout", function () {
          this.style.backgroundColor = "blue";
        });
    </script>
  </body>
</html>
```

Este ejemplo cambia el color de fondo de un div cuando el ratón se mueve sobre él y lo restablece cuando el ratón se mueve fuera del elemento.

### 2.3 Evento `submit`

El evento `submit` se dispara cuando un formulario es enviado. Este evento permite validar los datos del formulario antes de enviarlos al servidor.

### Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Evento Submit</title>
  </head>
  <body>
    <form id="myForm">
      <input type="text" id="name" required />
      <input type="submit" value="Enviar" />
    </form>
    <script>
      document
        .getElementById("myForm")
        .addEventListener("submit", function (event) {
          var name = document.getElementById("name").value;
          if (name === "") {
            alert("El nombre es obligatorio");
            event.preventDefault();
          }
        });
    </script>
  </body>
</html>
```

En este ejemplo, se valida que el campo de texto no esté vacío antes de permitir el envío del formulario.

## 3. Asociar Eventos a Elementos: `element.addEventListener()`

### 3.1 Introducción a `addEventListener()`

El método `addEventListener()` es la forma moderna y recomendada de asociar eventos a elementos en el DOM. Este método proporciona una forma flexible de gestionar múltiples eventos en un mismo elemento y permite especificar la fase del evento (captura o burbujeo).

### 3.2 Sintaxis y Uso

La sintaxis básica de `addEventListener()` es:

```jsx
element.addEventListener(eventType, listener, useCapture);
```

- **`eventType`**: El tipo de evento (por ejemplo, `click`, `mouseover`).
- **`listener`**: La función que se ejecutará cuando se dispare el evento.
- **`useCapture`** (opcional): Un booleano que indica si el evento debe ser capturado (true) o burbujeado (false, por defecto).

### 3.3 Ejemplo Avanzado

Consideremos un ejemplo más complejo donde se gestionan múltiples eventos en un elemento:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo Avanzado de addEventListener</title>
  </head>
  <body>
    <div
      id="interactiveDiv"
      style="width:200px;height:200px;background-color:green;"
    ></div>
    <script>
      var div = document.getElementById("interactiveDiv");

      function handleClick(event) {
        alert("Div clicado!");
      }

      function handleMouseOver(event) {
        div.style.backgroundColor = "yellow";
      }

      function handleMouseOut(event) {
        div.style.backgroundColor = "green";
      }

      div.addEventListener("click", handleClick);
      div.addEventListener("mouseover", handleMouseOver);
      div.addEventListener("mouseout", handleMouseOut);
    </script>
  </body>
</html>
```

En este ejemplo, el div cambia de color cuando se pasa el ratón sobre él y muestra una alerta cuando se hace clic.

### 3.4 Gestión de Eventos en Fase de Captura y Burbujeo

El método `addEventListener()` también permite especificar si el evento debe ser gestionado durante la fase de captura o burbujeo. Por defecto, los eventos se gestionan en la fase de burbujeo, pero esto se puede cambiar estableciendo el tercer argumento (`useCapture`) en `true`.

### Ejemplo de Captura de Eventos

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Captura de Eventos</title>
  </head>
  <body>
    <div
      id="outerDiv"
      style="width:300px;height:300px;background-color:lightblue;"
    >
      <div
        id="innerDiv"
        style="width:100px;height:100px;background-color:blue;"
      ></div>
    </div>
    <script>
      var outerDiv = document.getElementById("outerDiv");
      var innerDiv = document.getElementById("innerDiv");

      outerDiv.addEventListener(
        "click",
        function () {
          alert("Outer DIV capturado!");
        },
        true
      ); // Captura

      innerDiv.addEventListener("click", function () {
        alert("Inner DIV clicado!");
      });
    </script>
  </body>
</html>
```

En este ejemplo, el clic en el `innerDiv` primero será capturado por el `outerDiv` debido al uso de la fase de captura.

## Conclusión

La gestión de eventos del DOM en JavaScript es una técnica esencial para el desarrollo web interactivo y dinámico. A través de métodos como `addEventListener()`, los desarrolladores pueden asociar eventos a elementos de manera flexible y eficiente, gestionando eventos en las fases de captura y burbujeo. Comprender cómo funcionan los eventos del DOM y cómo asociarlos a elementos es crucial para cualquier desarrollador web que desee crear experiencias de usuario avanzadas y responsivas en la web moderna. La capacidad de responder a interacciones del usuario y gestionar eventos de manera eficaz es una de las competencias clave en el desarrollo de aplicaciones web ricas y funcionales.

---
