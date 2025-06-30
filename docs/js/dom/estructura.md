# Estructura del DOM

# La Estructura del DOM de JavaScript en Páginas Web

El Modelo de Objetos del Documento, conocido como DOM (Document Object Model), es una pieza fundamental en la construcción y manipulación de páginas web dinámicas. El DOM ofrece una representación estructurada del documento HTML o XML, permitiendo a los desarrolladores acceder y modificar su contenido y estructura mediante lenguajes de programación como JavaScript. Esta representación toma la forma de un árbol jerárquico, donde cada nodo del árbol corresponde a una parte específica del documento.

## 1. Document: Objeto raíz que representa todo el documento

El nodo `Document` es el punto de entrada al contenido del DOM y representa el documento entero. Este nodo raíz es crucial porque actúa como el contenedor de todos los demás nodos en la jerarquía del DOM. El objeto `Document` proporciona las interfaces necesarias para acceder y manipular los elementos del documento.

### 1.1 Propiedades y Métodos del Objeto Document

El objeto `Document` ofrece una amplia variedad de propiedades y métodos que permiten a los desarrolladores interactuar con el documento de manera eficiente. Algunas de las propiedades más importantes incluyen:

- **`documentElement`**: Devuelve el elemento raíz del documento, generalmente el elemento `<html>` en documentos HTML.
- **`body`**: Devuelve el elemento `<body>` del documento.
- **`head`**: Devuelve el elemento `<head>` del documento.
- **`title`**: Permite acceder y modificar el título del documento.

Además de estas propiedades, el objeto `Document` ofrece numerosos métodos que facilitan la manipulación del DOM:

- **`getElementById(id)`**: Devuelve el elemento con el `id` especificado.
- **`getElementsByClassName(className)`**: Devuelve una colección de todos los elementos que tienen la clase especificada.
- **`getElementsByTagName(tagName)`**: Devuelve una colección de todos los elementos que tienen el nombre de etiqueta especificado.
- **`querySelector(selector)`**: Devuelve el primer elemento que coincide con el selector CSS especificado.
- **`querySelectorAll(selector)`**: Devuelve una lista estática de todos los elementos que coinciden con el selector CSS especificado.

### 1.2 Ejemplo de Uso del Objeto Document

El siguiente ejemplo muestra cómo utilizar algunas de las propiedades y métodos del objeto `Document` para acceder y modificar elementos en un documento HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Ejemplo de Document</title>
  </head>
  <body>
    <div id="content">Contenido Original</div>
    <script>
      // Acceder al título del documento
      console.log(document.title); // Salida: Ejemplo de Document

      // Modificar el título del documento
      document.title = "Nuevo Título";

      // Acceder al cuerpo del documento
      var body = document.body;
      console.log(body);

      // Acceder y modificar el contenido de un elemento por su ID
      var contentDiv = document.getElementById("content");
      contentDiv.textContent = "Contenido Modificado";

      // Añadir un nuevo elemento al cuerpo
      var newElement = document.createElement("p");
      newElement.textContent = "Este es un nuevo párrafo";
      body.appendChild(newElement);
    </script>
  </body>
</html>
```

## 2. Elementos: Nodos que representan etiquetas HTML

Los nodos de elementos son componentes esenciales del DOM y representan las etiquetas HTML que estructuran el contenido de una página web. Cada elemento del DOM tiene propiedades y métodos que permiten su manipulación.

### 2.1 Propiedades y Métodos de los Elementos

Cada nodo de elemento en el DOM hereda propiedades y métodos que facilitan su manipulación. Algunas de las propiedades más comunes son:

- **`id`**: Permite obtener o establecer el atributo `id` del elemento.
- **`className`**: Permite obtener o establecer el atributo `class` del elemento.
- **`innerHTML`**: Permite obtener o establecer el HTML contenido dentro del elemento.
- **`textContent`**: Permite obtener o establecer el texto contenido dentro del elemento.
- **`style`**: Permite acceder y modificar los estilos en línea del elemento.

Los métodos más utilizados incluyen:

- **`appendChild(node)`**: Añade un nodo como hijo del elemento.
- **`removeChild(node)`**: Elimina un nodo hijo del elemento.
- **`replaceChild(newNode, oldNode)`**: Reemplaza un nodo hijo por otro.
- **`setAttribute(name, value)`**: Establece el valor de un atributo del elemento.
- **`getAttribute(name)`**: Obtiene el valor de un atributo del elemento.
- **`addEventListener(type, listener)`**: Añade un manejador de eventos al elemento.

### 2.2 Ejemplo de Manipulación de Elementos

El siguiente ejemplo demuestra cómo crear, modificar y eliminar nodos de elementos en un documento HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Manipulación de Elementos</title>
  </head>
  <body>
    <div id="container">
      <p class="text">Párrafo 1</p>
      <p class="text">Párrafo 2</p>
    </div>
    <script>
      // Crear un nuevo elemento
      var newElement = document.createElement("p");
      newElement.textContent = "Párrafo 3";
      newElement.className = "text";

      // Añadir el nuevo elemento al contenedor
      var container = document.getElementById("container");
      container.appendChild(newElement);

      // Modificar el contenido de un elemento existente
      var firstParagraph = container.getElementsByClassName("text")[0];
      firstParagraph.textContent = "Párrafo Modificado 1";

      // Eliminar un elemento existente
      var secondParagraph = container.getElementsByClassName("text")[1];
      container.removeChild(secondParagraph);
    </script>
  </body>
</html>
```

## 3. Atributos: Propiedades de los elementos que contienen información adicional

Los atributos son pares clave-valor que proporcionan información adicional sobre los elementos HTML. Estos atributos pueden ser manipulados dinámicamente a través del DOM.

### 3.1 Propiedades y Métodos para Manipular Atributos

Los atributos de los elementos HTML se pueden gestionar mediante varias propiedades y métodos:

- **`setAttribute(name, value)`**: Establece el valor de un atributo.
- **`getAttribute(name)`**: Obtiene el valor de un atributo.
- **`removeAttribute(name)`**: Elimina un atributo del elemento.
- **`hasAttribute(name)`**: Verifica si el elemento tiene un atributo específico.

Además, algunos atributos tienen propiedades asociadas que permiten un acceso más directo. Por ejemplo, el atributo `class` puede ser manipulado mediante la propiedad `className`.

### 3.2 Ejemplo de Manipulación de Atributos

El siguiente ejemplo ilustra cómo trabajar con los atributos de los elementos HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Manipulación de Atributos</title>
  </head>
  <body>
    <a id="myLink" href="<https://www.ejemplo.com>" target="_blank"
      >Enlace a Ejemplo</a
    >
    <script>
      var link = document.getElementById("myLink");

      // Obtener el valor del atributo href
      console.log(link.getAttribute("href")); // Salida: <https://www.ejemplo.com>

      // Establecer un nuevo valor para el atributo href
      link.setAttribute("href", "<https://www.nuevo-ejemplo.com>");

      // Eliminar el atributo target
      link.removeAttribute("target");

      // Verificar si el enlace tiene un atributo title
      console.log(link.hasAttribute("title")); // Salida: false
    </script>
  </body>
</html>
```

## 4. Textos: Representan el texto dentro de los elementos

Los nodos de texto en el DOM representan el contenido textual de los elementos HTML. Estos nodos son fundamentales para la presentación de información legible por el usuario.

### 4.1 Propiedades y Métodos de los Nodos de Texto

Los nodos de texto tienen propiedades y métodos específicos que permiten su manipulación:

- **`textContent`**: Permite obtener o establecer el contenido textual de un nodo.
- **`nodeValue`**: Similar a `textContent`, permite obtener o establecer el valor del nodo de texto.
- **`splitText(offset)`**: Divide un nodo de texto en dos en la posición especificada.

### 4.2 Ejemplo de Manipulación de Nodos de Texto

El siguiente ejemplo demuestra cómo crear, modificar y dividir nodos de texto en un documento HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Manipulación de Nodos de Texto</title>
  </head>
  <body>
    <div id="textContainer">Texto Original</div>
    <script>
      var container = document.getElementById("textContainer");

      // Modificar el contenido textual de un elemento
      container.textContent = "Texto Modificado";

      // Crear un nuevo nodo de texto y añadirlo al contenedor
      var newText = document.createTextNode(" - Texto Adicional");
      container.appendChild(newText);

      // Dividir un nodo de texto
      var textNode = container.firstChild;
      var splitNode = textNode.splitText(13);
      console.log(textNode.nodeValue); // Salida: Texto Modificado
      console.log(splitNode.nodeValue); // Salida:  - Texto Adicional
    </script>
  </body>
</html>
```

## Conclusión

El DOM de JavaScript es una herramienta poderosa y flexible que permite a los desarrolladores web interactuar con el contenido y la estructura de los documentos HTML y XML de manera programática. Comprender la estructura del DOM y cómo manipular sus diferentes componentes es esencial para crear aplicaciones web dinámicas y eficientes. Desde el objeto raíz `Document` hasta los nodos de elementos, atributos y texto, cada parte del DOM juega un papel crucial en la representación y manipulación del contenido web. A través de ejemplos prácticos, hemos explorado las capacidades del DOM y cómo pueden ser aprovechadas para mejorar la experiencia del usuario y la funcionalidad de las páginas web.

---
