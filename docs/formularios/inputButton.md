# Input Type Button

# Los Input Types en Formularios de HTML: El Input Type "Button"

En el desarrollo web, los formularios son una parte esencial de la interacción entre los usuarios y las aplicaciones en línea. Los input types en HTML permiten a los desarrolladores crear una amplia variedad de controles de entrada para recopilar información del usuario. El input type "button" es uno de estos tipos de entrada y se utiliza para crear botones en los formularios web. En este texto, exploraremos en detalle qué es y cómo funciona el input type "button" en los formularios web, analizando su significado, sus atributos, su funcionamiento interno y proporcionando ejemplos ilustrativos.

## Introducción

El input type "button" en HTML se utiliza para crear botones dentro de los formularios web. Estos botones pueden tener diferentes funciones, como enviar un formulario, activar una acción o ejecutar un script de JavaScript. En este texto, examinaremos en profundidad cómo funciona este tipo de entrada y cómo se puede utilizar de manera efectiva en los formularios web.

## Definición y Significado del Input Type "Button"

El input type "button" en HTML se utiliza para crear botones en los formularios web que los usuarios pueden hacer clic para realizar una acción específica. Estos botones pueden tener una amplia variedad de funciones, desde enviar un formulario hasta ejecutar un script de JavaScript que realiza una acción particular en la página web.

## Funcionamiento Interno del Input Type "Button"

El input type "button" funciona de la siguiente manera:

1. **Creación del Botón**: Los desarrolladores utilizan la etiqueta `<input>` con el atributo type establecido en "button" para crear un botón en el formulario. Este botón puede tener un valor de texto visible para el usuario y puede estar asociado con una función o acción específica.
2. **Interacción del Usuario**: Cuando un usuario hace clic en el botón, se desencadena una acción asociada con ese botón. Esta acción puede ser enviar el formulario, activar una función de JavaScript, redirigir a otra página web, entre otros.
3. **Funciones Asociadas**: Los botones pueden tener funciones asociadas que se ejecutan cuando se hace clic en ellos. Esto puede incluir el envío de un formulario utilizando JavaScript, la activación de una animación en la página, o cualquier otra acción deseada por el desarrollador.

## Atributos del Input Type "Button"

El input type "button" puede tener varios atributos que afectan su comportamiento y apariencia. Algunos de los atributos más comunes incluyen:

- **value**: Este atributo especifica el texto que se mostrará en el botón. Este texto puede ser cualquier cosa, desde una palabra simple hasta una frase descriptiva que indique la acción que se realizará cuando se haga clic en el botón.
- **onclick**: Este atributo especifica la acción que se realizará cuando se haga clic en el botón. Puede contener un fragmento de código JavaScript que se ejecutará cuando se active el botón.

### Ejemplos de Uso del Input Type "Button"

A continuación, se presentan algunos ejemplos que ilustran cómo se utiliza el input type "button" en los formularios HTML:

### Ejemplo 1: Botón de Envío de Formulario

```html
<form action="/submit_form" method="post">
  <input type="text" name="username" placeholder="Ingrese su nombre de usuario">
  <input type="password" name="password" placeholder="Ingrese su contraseña">
  <input type="button" value="Enviar" onclick="submitForm()">
</form>

<script>
  function submitForm() {
    // Código para enviar el formulario
    document.forms[0].submit();
  }
</script>

```

En este ejemplo, se crea un formulario con campos de entrada para el nombre de usuario y la contraseña. El botón "Enviar" utiliza el input type "button" y tiene asociada una función JavaScript llamada "submitForm()" que se ejecuta cuando se hace clic en el botón. Esta función envía el formulario al servidor.

### Ejemplo 2: Botón de Ejecución de Acción

```html
<button type="button" onclick="showMessage()">Mostrar Mensaje</button>

<script>
  function showMessage() {
    alert("¡Hola! Bienvenido a nuestro sitio web.");
  }
</script>

```

En este ejemplo, se crea un botón que muestra un mensaje de saludo cuando se hace clic en él. El botón utiliza la etiqueta `<button>` con el atributo type establecido en "button" y tiene asociada una función JavaScript llamada "showMessage()" que se ejecuta cuando se hace clic en el botón.