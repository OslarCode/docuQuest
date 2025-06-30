# Atributo Method

# El Atributo "method" en los Formularios HTML: Conceptos y Funcionamiento

Los formularios HTML son elementos fundamentales en el desarrollo web, permitiendo la interacción entre los usuarios y los sitios web. Uno de los atributos más importantes en la construcción de formularios es el atributo "method", que determina cómo se enviarán los datos del formulario al servidor web. En este texto, exploraremos en detalle qué es y cómo funciona el atributo "method" en los formularios web, analizando su significado, su funcionamiento interno y proporcionando ejemplos ilustrativos.

## Introducción

El atributo "method" en un elemento de formulario HTML especifica el método de envío de los datos del formulario al servidor. Puede tener dos valores posibles: "GET" y "POST". Comprender la diferencia entre estos métodos es esencial para controlar cómo se manejan y procesan los datos ingresados por los usuarios.

## Definición y Significado del Atributo "method"

El atributo "method" en un formulario HTML especifica el método HTTP utilizado para enviar los datos del formulario al servidor. Los dos valores posibles para este atributo son:

- "GET": Indica que los datos del formulario se adjuntarán a la URL de la acción del formulario como parámetros de consulta. Este método es adecuado para formularios con datos no sensibles y cuando se desea que los datos sean visibles en la URL.
- "POST": Indica que los datos del formulario se enviarán en el cuerpo de la solicitud HTTP. Este método es adecuado para formularios con datos sensibles y cuando se desea ocultar los datos de la URL.

### Funcionamiento Interno del Atributo "method"

El atributo "method" funciona de la siguiente manera:

1. **Usuario Completa el Formulario**: El usuario completa los campos del formulario con la información requerida, como nombre, dirección de correo electrónico, comentarios, etc.
2. **Envío del Formulario**: Una vez que el usuario ha completado el formulario, hace clic en el botón de envío. Esto activa un evento en el navegador que recopila los datos del formulario y los envía al servidor especificado en el atributo "action".
3. **Selección del Método de Envío**: Antes de enviar los datos del formulario, el navegador determina qué método utilizará para enviar los datos al servidor, según el valor especificado en el atributo "method".
4. **Transmisión de los Datos al Servidor**: Una vez seleccionado el método de envío, el navegador envía la solicitud HTTP al servidor, incluyendo los datos del formulario según corresponda al método seleccionado.
5. **Procesamiento en el Servidor**: El servidor web recibe la solicitud y procesa los datos del formulario según corresponda al método seleccionado. Esto puede implicar la validación de datos, el almacenamiento en una base de datos, el envío de correos electrónicos, entre otras acciones.
6. **Generación de una Respuesta**: Después de procesar los datos del formulario, el servidor genera una respuesta que puede ser una nueva página web, un mensaje de confirmación, una redirección a otra URL, entre otros.

### Ejemplos de Uso del Atributo "method"

A continuación, se presentan algunos ejemplos que ilustran cómo se utiliza el atributo "method" en los formularios HTML:

### Ejemplo 1: Método GET

```html
<form action="procesar.php" method="get">
  <!-- Campos del formulario -->
  <button type="submit">Enviar</button>
</form>

```

En este ejemplo, los datos del formulario se enviarán al servidor utilizando el método GET. Esto significa que los datos del formulario se adjuntarán a la URL de la acción del formulario como parámetros de consulta.

### Ejemplo 2: Método POST

```html
<form action="procesar.php" method="post">
  <!-- Campos del formulario -->
  <button type="submit">Enviar</button>
</form>

```

En este ejemplo, los datos del formulario se enviarán al servidor utilizando el método POST. Esto significa que los datos del formulario se enviarán en el cuerpo de la solicitud HTTP, en lugar de adjuntarse a la URL.

## Conclusiones

En resumen, el atributo "method" en los formularios HTML es esencial para controlar cómo se enviarán los datos del formulario al servidor. Al comprender la diferencia entre los métodos GET y POST, los desarrolladores web pueden elegir el método más adecuado según la naturaleza de los datos y los requisitos de seguridad de la aplicación web. Esto contribuye a la creación de experiencias de usuario efectivas y funcionales en la web.

### Notas sobre el método GET

1. Agrega los datos del formulario a la URL, en pares de nombre/valor.
2. ¡NUNCA utilices GET para enviar datos confidenciales! (¡Los datos del formulario enviado son visibles en la URL!).
3. La longitud de una URL es limitada (2048 caracteres).
4. Útil para envíos de formularios donde un usuario desea marcar el resultado como favorito.
5. GET es bueno para datos no seguros, como cadenas de consulta en Google.

## Notas sobre el métodos POST

1. Agrega los datos del formulario dentro del cuerpo de la solicitud HTTP (los datos del formulario enviado no se muestran en la URL)
2. POST no tiene limitaciones de tamaño y puede usarse para enviar grandes cantidades de datos.
3. Los envíos de formularios con POST no se pueden marcar como favoritos