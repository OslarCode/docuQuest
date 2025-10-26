# DOM

El DOM representa la estructura de un archivo HTML. Es una interfaz que permite a los programas acceder y actualizar el contenido, la estructura y el estilo de un documento web. En otras palabras, el DOM es como un árbol invertido que representa todos los elementos de una página web. Desde encabezados hasta párrafos, imágenes y enlaces, todo se representa como objetos en el DOM.

¿Por qué es importante? Gracias al DOM, podemos interactuar con los elementos de una página web usando JavaScript. Podemos modificar el contenido dinámicamente, crear animaciones y reaccionar a eventos del usuario. En resumen, el DOM es esencial para desarrolladores web que desean crear experiencias interactivas en sus sitios.

## Índice de contenidos

1. **¿Qué es el DOM?**
   - El DOM es una interfaz de programación para documentos HTML y XML.
   - Representa la estructura del documento como un árbol de objetos donde cada nodo es un objeto representando parte del documento.
2. **Estructura del DOM:**
   - **Document**: Objeto raíz que representa todo el documento.
   - **Elementos**: Nodos que representan etiquetas HTML como `<div>`, `<p>`, `<ul>`, etc.
   - **Atributos**: Propiedades de los elementos que contienen información adicional.
   - **Textos**: Representan el texto dentro de los elementos.
3. **Accediendo al DOM desde JavaScript:**
   - **getElementById**: Método para obtener un elemento por su ID único.
   - **getElementsByClassName**: Obtener elementos por su clase.
   - **getElementsByTagName**: Obtener elementos por su etiqueta.
   - **querySelector y querySelectorAll**: Selector CSS para obtener elementos (más potente y flexible).
4. **Manipulación del DOM:**
   - **Crear elementos**: `document.createElement()`
   - **Modificar contenido**: `element.innerHTML` o `element.textContent`
   - **Modificar atributos**: `element.setAttribute()` o directamente `element.attribute`
   - **Agregar o eliminar nodos**: `parent.appendChild()`, `parent.removeChild()`, etc.
5. **Eventos en el DOM:**
   - Interacciones del usuario que disparan acciones en JavaScript.
   - Ejemplos comunes: `click`, `mouseover`, `submit`, etc.
   - Asociar eventos a elementos: `element.addEventListener()`
6. **Renderización y Reflujos:**
   - Cambios en el DOM pueden afectar al rendimiento.
   - Minimizar cambios frecuentes y costosos para mejorar la experiencia del usuario.

Dominar estos conceptos te permitirá trabajar eficazmente con el DOM en JavaScript, lo cual es fundamental para el desarrollo web interactivo y dinámico.

## Índice de capítulos

---
