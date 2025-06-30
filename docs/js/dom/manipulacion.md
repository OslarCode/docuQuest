# Manipulación del DOM

# Manipulación del DOM de JavaScript en Páginas Web

La manipulación del Modelo de Objetos del Documento (DOM) es una habilidad fundamental en el desarrollo web, que permite a los desarrolladores crear, modificar y eliminar elementos en una página web de manera dinámica. La capacidad de interactuar con el DOM de forma programática utilizando JavaScript es crucial para crear experiencias de usuario ricas e interactivas. En este texto, exploraremos en profundidad las principales técnicas de manipulación del DOM: crear elementos con `document.createElement()`, modificar el contenido de los elementos con `element.innerHTML` o `element.textContent`, modificar atributos con `element.setAttribute()` o directamente con `element.attribute`, y agregar o eliminar nodos con `parent.appendChild()`, `parent.removeChild()`, entre otros.

## 1. Crear elementos: `document.createElement()`

El método `document.createElement()` permite crear un nuevo elemento HTML, que puede ser posteriormente insertado en el DOM. Este método es fundamental para la creación de contenido dinámico en páginas web.

### 1.1 Uso y Sintaxis

La sintaxis básica de `document.createElement()` es simple:

```jsx
var newElement = document.createElement("tagName");
```

Donde `'tagName'` es el nombre de la etiqueta del elemento que se desea crear, como `'div'`, `'p'`, `'span'`, etc.

### 1.2 Ejemplo Práctico

Consideremos el siguiente documento HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de createElement</title>
  </head>
  <body>
    <div id="container"></div>
    <script>
      // Crear un nuevo elemento <p>
      var newParagraph = document.createElement("p");
      newParagraph.textContent = "Este es un párrafo creado dinámicamente.";

      // Añadir el nuevo elemento al contenedor
      var container = document.getElementById("container");
      container.appendChild(newParagraph);
    </script>
  </body>
</html>
```

En este ejemplo, `document.createElement('p')` se utiliza para crear un nuevo elemento `<p>`, que luego se inserta en el contenedor `<div>` con el `id` "container".

### 1.3 Ventajas y Limitaciones

**Ventajas**:

- **Flexibilidad**: Permite crear cualquier tipo de elemento HTML de manera dinámica.
- **Integración**: Los elementos creados pueden ser completamente integrados en el DOM, con la capacidad de añadir atributos, estilos y contenido.

**Limitaciones**:

- **Pasos adicionales**: Crear un elemento con `createElement` requiere pasos adicionales para configurar sus atributos y contenido antes de insertarlo en el DOM.

## 2. Modificar contenido: `element.innerHTML` o `element.textContent`

Modificar el contenido de los elementos HTML es una de las tareas más comunes en la manipulación del DOM. Dos propiedades principales permiten esta manipulación: `innerHTML` y `textContent`.

### 2.1 innerHTML

La propiedad `innerHTML` permite obtener o establecer el HTML contenido dentro de un elemento. Es útil cuando se desea insertar HTML con varias etiquetas.

### 2.1.1 Uso y Sintaxis

```jsx
element.innerHTML = "Nuevo <b>contenido</b> con HTML.";
```

### 2.1.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de innerHTML</title>
  </head>
  <body>
    <div id="content">Contenido original</div>
    <script>
      var contentDiv = document.getElementById("content");

      // Modificar el contenido del elemento usando innerHTML
      contentDiv.innerHTML = "Nuevo <b>contenido</b> con HTML.";
    </script>
  </body>
</html>
```

### 2.2 textContent

La propiedad `textContent` permite obtener o establecer el contenido textual de un elemento, sin interpretar el texto como HTML.

### 2.2.1 Uso y Sintaxis

```jsx
element.textContent = "Nuevo contenido textual";
```

### 2.2.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de textContent</title>
  </head>
  <body>
    <div id="content">Contenido original</div>
    <script>
      var contentDiv = document.getElementById("content");

      // Modificar el contenido del elemento usando textContent
      contentDiv.textContent = "Nuevo contenido textual";
    </script>
  </body>
</html>
```

### 2.3 Ventajas y Limitaciones

**innerHTML**:

- **Ventajas**: Permite insertar HTML complejo.
- **Limitaciones**: Riesgo de inyección de HTML si se utilizan datos no validados, ya que el HTML se analiza y se interpreta.

**textContent**:

- **Ventajas**: Seguro contra inyección de HTML, ya que el texto se inserta tal cual.
- **Limitaciones**: No permite insertar HTML.

## 3. Modificar atributos: `element.setAttribute()` o directamente `element.attribute`

Modificar los atributos de los elementos HTML es esencial para controlar su comportamiento y apariencia. Existen dos formas principales de hacerlo: usando `setAttribute()` o accediendo directamente a las propiedades del elemento.

### 3.1 Uso de setAttribute()

El método `setAttribute()` permite establecer el valor de un atributo específico de un elemento.

### 3.1.1 Uso y Sintaxis

```jsx
element.setAttribute("attributeName", "value");
```

### 3.1.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de setAttribute</title>
  </head>
  <body>
    <a id="myLink" href="<https://www.ejemplo.com>">Enlace a Ejemplo</a>
    <script>
      var link = document.getElementById("myLink");

      // Modificar el atributo href del enlace
      link.setAttribute("href", "<https://www.nuevo-ejemplo.com>");
    </script>
  </body>
</html>
```

### 3.2 Acceso Directo a Atributos

Otra forma de modificar los atributos es accediendo directamente a las propiedades del elemento.

### 3.2.1 Uso y Sintaxis

```jsx
element.attributeName = "value";
```

### 3.2.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Modificación Directa de Atributos</title>
  </head>
  <body>
    <img id="myImage" src="imagen1.jpg" alt="Imagen 1" />
    <script>
      var image = document.getElementById("myImage");

      // Modificar el atributo src de la imagen
      image.src = "imagen2.jpg";
      image.alt = "Imagen 2";
    </script>
  </body>
</html>
```

### 3.3 Ventajas y Limitaciones

**setAttribute()**:

- **Ventajas**: Puede usarse para cualquier atributo, incluyendo aquellos que no tienen propiedades asociadas.
- **Limitaciones**: Es más verboso y puede ser menos intuitivo para atributos comunes.

**Acceso Directo a Atributos**:

- **Ventajas**: Sintaxis más limpia y directa para atributos comunes.
- **Limitaciones**: No todos los atributos tienen propiedades asociadas, lo que limita su uso.

## 4. Agregar o eliminar nodos: `parent.appendChild()`, `parent.removeChild()`, etc.

Agregar y eliminar nodos es una de las operaciones más fundamentales en la manipulación del DOM. Los métodos `appendChild()` y `removeChild()` permiten modificar la estructura del DOM de manera dinámica.

### 4.1 parent.appendChild()

El método `appendChild()` se utiliza para añadir un nodo al final de la lista de hijos de un nodo padre.

### 4.1.1 Uso y Sintaxis

```jsx
parentNode.appendChild(childNode);
```

### 4.1.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de appendChild</title>
  </head>
  <body>
    <ul id="list">
      <li>Elemento 1</li>
      <li>Elemento 2</li>
    </ul>
    <script>
      var list = document.getElementById("list");

      // Crear un nuevo elemento de lista
      var newItem = document.createElement("li");
      newItem.textContent = "Elemento 3";

      // Añadir el nuevo elemento al final de la lista
      list.appendChild(newItem);
    </script>
  </body>
</html>
```

### 4.2 parent.removeChild()

El método `removeChild()` se utiliza para eliminar un nodo hijo de un nodo padre.

### 4.2.1 Uso y Sintaxis

```jsx
parentNode.removeChild(childNode);
```

### 4.2.2 Ejemplo Práctico

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de removeChild</title>
  </head>
  <body>
    <ul id="list">
      <li id="item1">Elemento 1</li>
      <li id="item2">Elemento 2</li>
    </ul>
    <script>
             var list = document.getElementById('list');
             var item2 = document.getElementById('item2');

             // Eliminar el segundo elemento

      de la lista
             list.removeChild(item2);
    </script>
  </body>
</html>
```

### 4.3 Otras Operaciones de Manipulación de Nodos

Además de `appendChild()` y `removeChild()`, existen otros métodos útiles para la manipulación de nodos, tales como:

- **`insertBefore(newNode, referenceNode)`**: Inserta un nuevo nodo antes de un nodo de referencia.
- **`replaceChild(newNode, oldNode)`**: Reemplaza un nodo hijo existente con un nuevo nodo.

### Ejemplo de `insertBefore()`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de insertBefore</title>
  </head>
  <body>
    <ul id="list">
      <li>Elemento 1</li>
      <li>Elemento 3</li>
    </ul>
    <script>
      var list = document.getElementById("list");

      // Crear un nuevo elemento de lista
      var newItem = document.createElement("li");
      newItem.textContent = "Elemento 2";

      // Insertar el nuevo elemento antes del tercer elemento
      list.insertBefore(newItem, list.children[1]);
    </script>
  </body>
</html>
```

### Ejemplo de `replaceChild()`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de replaceChild</title>
  </head>
  <body>
    <ul id="list">
      <li id="item1">Elemento 1</li>
      <li id="item2">Elemento 2</li>
    </ul>
    <script>
      var list = document.getElementById("list");
      var item2 = document.getElementById("item2");

      // Crear un nuevo elemento de lista
      var newItem = document.createElement("li");
      newItem.textContent = "Elemento 2 reemplazado";

      // Reemplazar el segundo elemento de la lista
      list.replaceChild(newItem, item2);
    </script>
  </body>
</html>
```

### 4.4 Ventajas y Limitaciones

**appendChild()**:

- **Ventajas**: Simple y directo para añadir nuevos nodos al final de la lista de hijos.
- **Limitaciones**: Solo puede añadir nodos al final, no en una posición específica.

**removeChild()**:

- **Ventajas**: Permite eliminar nodos específicos del DOM.
- **Limitaciones**: Requiere una referencia al nodo hijo que se desea eliminar.

## Conclusión

La manipulación del DOM mediante JavaScript es una técnica esencial en el desarrollo web moderno, permitiendo a los desarrolladores crear, modificar y eliminar elementos de manera dinámica. La creación de elementos con `document.createElement()`, la modificación del contenido con `element.innerHTML` y `element.textContent`, la modificación de atributos con `element.setAttribute()` y acceso directo, y la manipulación de nodos con `appendChild()` y `removeChild()` son herramientas fundamentales para crear aplicaciones web interactivas y dinámicas. La comprensión y el dominio de estas técnicas son cruciales para cualquier desarrollador web que aspire a crear experiencias de usuario avanzadas y funcionales en la web moderna.

---
