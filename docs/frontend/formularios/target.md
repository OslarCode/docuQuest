# Atributo Target

# El Atributo "target" en los Formularios HTML: Conceptos y Funcionamiento

Los formularios HTML son elementos esenciales en el desarrollo web, permitiendo la interacción entre los usuarios y los sitios web. Dentro de los atributos que definen el comportamiento de un formulario, el atributo "target" juega un papel crucial al especificar dónde se abrirá el resultado del envío del formulario. En este texto, exploraremos en detalle qué es y cómo funciona el atributo "target" en los formularios web, analizando su significado, su funcionamiento interno y proporcionando ejemplos ilustrativos.

## Introducción

El atributo "target" en un elemento de formulario HTML define el contexto en el que se abrirá el resultado del envío del formulario. Este atributo puede tener diferentes valores, que determinan si el resultado se abrirá en la misma ventana del navegador, en una nueva ventana o pestaña, en un marco específico, o incluso en un iframe. Comprender cómo funciona este atributo es fundamental para controlar la experiencia del usuario al interactuar con el formulario.

## Definición y Significado del Atributo "target"

El atributo "target" en un elemento de formulario HTML especifica el destino del resultado del envío del formulario. Puede tener los siguientes valores:

- "\_self": El resultado se abrirá en la misma ventana del navegador que contiene el formulario. Este es el valor predeterminado si no se especifica otro.
- "\_blank": El resultado se abrirá en una nueva ventana o pestaña del navegador.
- "\_parent": El resultado se abrirá en el marco o iframe padre del formulario.
- "\_top": El resultado se abrirá en la ventana superior del navegador, reemplazando cualquier marco existente.

### Funcionamiento Interno del Atributo "target"

El atributo "target" funciona de la siguiente manera:

1. **Usuario Completa el Formulario**: El usuario completa los campos del formulario con la información requerida, como nombre, dirección de correo electrónico, comentarios, etc.
2. **Envío del Formulario**: Una vez que el usuario ha completado el formulario, hace clic en el botón de envío. Esto activa un evento en el navegador que recopila los datos del formulario y los envía al servidor especificado en el atributo "action".
3. **Procesamiento en el Servidor**: El servidor web procesa los datos del formulario según corresponda y genera una respuesta, que puede ser una nueva página web, un mensaje de confirmación, una redirección a otra URL, entre otros.
4. **Apertura del Resultado según el Atributo "target"**: Una vez que el navegador recibe la respuesta del servidor, determina cómo abrir el resultado del envío del formulario según el valor especificado en el atributo "target".

### Ejemplos de Uso del Atributo "target"

A continuación, se presentan algunos ejemplos que ilustran cómo se utiliza el atributo "target" en los formularios HTML:

### Ejemplo 1: Abrir el Resultado en la Misma Ventana del Navegador

```html
<form action="procesar.php" method="post" target="_self">
  <!-- Campos del formulario -->
  <button type="submit">Enviar</button>
</form>

```

En este ejemplo, el resultado del envío del formulario se abrirá en la misma ventana del navegador que contiene el formulario, ya que se especifica "\_self" como valor del atributo "target".

### Ejemplo 2: Abrir el Resultado en una Nueva Ventana o Pestaña

```html
<form action="procesar.php" method="post" target="_blank">
  <!-- Campos del formulario -->
  <button type="submit">Enviar</button>
</form>

```

En este ejemplo, el resultado del envío del formulario se abrirá en una nueva ventana o pestaña del navegador, ya que se especifica "\_blank" como valor del atributo "target".

## Conclusiones

El atributo "target" en los formularios HTML es esencial para controlar dónde se abrirá el resultado del envío del formulario, lo que influye directamente en la experiencia del usuario. Al comprender su funcionamiento y cómo se utiliza, los desarrolladores web pueden diseñar formularios que sean intuitivos y fáciles de usar, mejorando así la interacción entre los usuarios y los sitios web.