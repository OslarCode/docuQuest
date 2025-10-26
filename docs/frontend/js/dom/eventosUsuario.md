# Eventos de interacción con el usuario

Lista de algunos de los eventos más comunes disponibles en el DOM (Document Object Model) en JavaScript:

### Eventos de Interacción del Usuario

1. **click**: Se dispara cuando se hace clic en un elemento.
    
    ```jsx
    element.addEventListener('click', function(event) {
        // Acciones cuando se hace clic en el elemento
    });
    
    ```
    
2. **mouseover / mouseout**: Se activan cuando el cursor del mouse entra o sale del área de un elemento.
    
    ```jsx
    element.addEventListener('mouseover', function(event) {
        // Acciones cuando el mouse entra al elemento
    });
    
    element.addEventListener('mouseout', function(event) {
        // Acciones cuando el mouse sale del elemento
    });
    
    ```
    
3. **mousemove**: Se dispara cuando el cursor del mouse se mueve sobre un elemento.
    
    ```jsx
    element.addEventListener('mousemove', function(event) {
        // Acciones mientras el mouse se mueve sobre el elemento
    });
    
    ```
    
4. **keydown / keyup**: Se activan cuando se presiona o se suelta una tecla en el teclado.
    
    ```jsx
    document.addEventListener('keydown', function(event) {
        // Acciones cuando se presiona una tecla
    });
    
    document.addEventListener('keyup', function(event) {
        // Acciones cuando se suelta una tecla
    });
    
    ```
    
5. **submit**: Se dispara cuando se envía un formulario.
    
    ```jsx
    form.addEventListener('submit', function(event) {
        // Acciones cuando se envía el formulario
        event.preventDefault(); // Para prevenir el envío por defecto
    });
    
    ```
    

### Eventos de Carga y Descarga

1. **load**: Se activa cuando se completa la carga de todos los recursos de la página.
    
    ```jsx
    window.addEventListener('load', function(event) {
        // Acciones después de que se carga completamente la página
    });
    
    ```
    
2. **DOMContentLoaded**: Se dispara cuando se completa la carga inicial del HTML y se pueden manipular los elementos del DOM.
    
    ```jsx
    document.addEventListener('DOMContentLoaded', function(event) {
        // Acciones cuando el DOM está listo para ser manipulado
    });
    
    ```
    
3. **unload**: Se activa justo antes de que se descargue la página o se cambie a otra página.
    
    ```jsx
    window.addEventListener('unload', function(event) {
        // Acciones antes de que la página se descargue o cambie
    });
    
    ```
    

### Eventos de Cambio de Estado

1. **resize**: Se dispara cuando se cambia el tamaño de la ventana del navegador.
    
    ```jsx
    window.addEventListener('resize', function(event) {
        // Acciones cuando se cambia el tamaño de la ventana
    });
    
    ```
    
2. **scroll**: Se activa cuando se desplaza el contenido de un elemento (como una ventana o un div).
    
    ```jsx
    element.addEventListener('scroll', function(event) {
        // Acciones cuando se realiza scroll en el elemento
    });
    
    ```
    

### Otros Eventos

1. **focus / blur**: Se disparan cuando un elemento obtiene o pierde el foco de entrada (como al hacer clic en un campo de entrada).
    
    ```jsx
    input.addEventListener('focus', function(event) {
        // Acciones cuando el elemento obtiene el foco
    });
    
    input.addEventListener('blur', function(event) {
        // Acciones cuando el elemento pierde el foco
    });
    
    ```
    
2. **error**: Se activa cuando se produce un error durante la carga de un recurso (como una imagen o un script).
    
    ```jsx
    element.addEventListener('error', function(event) {
        // Acciones cuando ocurre un error en la carga del recurso
    });
    
    ```
    

Estos son solo algunos de los eventos más utilizados en JavaScript para interactuar con elementos HTML y manejar diferentes estados y acciones dentro de una página web. Cada evento tiene su propia utilidad y se puede utilizar junto con funciones de manejo de eventos para realizar acciones específicas en respuesta a las interacciones del usuario o cambios en el estado de la página.