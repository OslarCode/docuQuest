# Variables en CSS3

# Exploración Avanzada de Variables en CSS3

## Introducción

Las variables en CSS3 son una característica poderosa que permite definir y reutilizar valores en una hoja de estilo. Introducidas con CSS Custom Properties, las variables proporcionan una forma eficiente de gestionar la consistencia y la flexibilidad en el diseño de interfaces web.

## Funcionamiento de las Variables en CSS3

Las variables en CSS3 son identificadores que representan valores que pueden ser reutilizados a lo largo de una hoja de estilo. Estos identificadores, también conocidos como Custom Properties, se definen utilizando la sintaxis `--nombre-variable: valor;` y pueden ser utilizados en cualquier parte del documento CSS utilizando la función `var(--nombre-variable)`.

### Definición de Variables

Las variables en CSS3 se definen en el ámbito de un selector específico, lo que significa que pueden ser globales o locales a un determinado elemento o conjunto de elementos. Esto proporciona flexibilidad en la aplicación de estilos y permite ajustar fácilmente los valores en diferentes partes del documento.

```css
/* Definición de variables globales */
:root {
  --color-primario: #007bff;
  --color-secundario: #6c757d;
}

/* Definición de variables locales */
.contenedor {
  --ancho: 300px;
}
```

### Uso de Variables

Una vez definidas, las variables pueden ser utilizadas en cualquier parte del documento CSS utilizando la función `var()`.

```css
/* Uso de variables globales */
.elemento {
  color: var(--color-primario);
  background-color: var(--color-secundario);
}

/* Uso de variables locales */
.otro-elemento {
  width: var(--ancho);
}
```

### Herencia de Variables

Las variables en CSS3 pueden heredarse de forma similar a otras propiedades CSS. Esto significa que un elemento puede heredar el valor de una variable definida en un ancestro.

```html
<div class="padre">
  <div class="hijo">
    <!-- La variable --color-primario se hereda del padre -->
    <p>Texto de ejemplo</p>
  </div>
</div>
```

```css
.padre {
  --color-primario: #007bff;
}

.hijo {
  color: var(--color-primario); /* Hereda el color del padre */
}
```

## Ejemplos Prácticos

### Cambio de Tema con Variables

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cambio de Tema con Variables en CSS</title>
    <style>
      :root {
        --color-primario: #007bff;
      }

      body {
        background-color: var(--color-primario);
      }

      .botones {
        background-color: var(--color-primario);
        color: #fff;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }

      .botones:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <button class="botones" onclick="cambiarTema('#007bff')">Tema Azul</button>
    <button class="botones" onclick="cambiarTema('#28a745')">Tema Verde</button>
    <button class="botones" onclick="cambiarTema('#dc3545')">Tema Rojo</button>

    <script>
      function cambiarTema(color) {
        document.documentElement.style.setProperty("--color-primario", color);
      }
    </script>
  </body>
</html>
```

En este ejemplo, se define una variable `--color-primario` que controla el color de fondo del cuerpo de la página y de los botones. Al hacer clic en un botón, se llama a una función JavaScript que cambia el valor de la variable, lo que resulta en un cambio de tema dinámico en la página.

### Diseño Adaptativo con Variables

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Diseño Adaptativo con Variables en CSS</title>
    <style>
      :root {
        --ancho-columnas: 300px;
      }

      .contenedor {
        display: flex;
        flex-wrap: wrap;
      }

      .item {
        width: var(--ancho-columnas);
        margin: 10px;
        background-color: #f0f0f0;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div class="contenedor">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </div>

    <script>
      // JavaScript para cambiar el ancho de las columnas en dispositivos móviles
      if (window.matchMedia("(max-width: 768px)").matches) {
        document.documentElement.style.setProperty("--ancho-columnas", "100%");
      }
    </script>
  </body>
</html>
```

En este ejemplo, se define una variable `--ancho-columnas` que controla el ancho de los elementos dentro de un contenedor flex. Cuando la pantalla tiene un ancho máximo de 768px, se modifica dinámicamente el valor de la variable para que los elementos se muestren en una sola columna en dispositivos móviles.

## Utilización Avanzada de Variables en CSS3

### Modularización de Estilos

Las variables en CSS3 facilitan la modularización de estilos al permitir definir valores comunes una vez y reutilizarlos en múltiples lugares del documento. Esto hace que el mantenimiento y la actualización de estilos sean más eficientes y consistentes.

### Personalización del Tema

Con el uso de variables, es posible crear hojas de estilo fácilmente personalizables que permiten a los usuarios cambiar el aspecto y la sensación de una página web según sus preferencias personales. Esto es especialmente útil en aplicaciones web y sitios que requieren una marca blanca o una personalización del tema.

### Gestión de la Consistencia

Las variables en CSS3 facilitan la gestión de la consistencia en el diseño de interfaces web al proporcionar un único punto de control para valores como colores, tamaños y espaciados. Esto ayuda a mantener un aspecto coherente en toda la aplicación y a reducir la duplicación de código.

## Conclusiones

Las variables en CSS3 son una característica poderosa que proporciona flexibilidad y modularidad en la creación de hojas de estilo para interfaces web. Con la capacidad de definir valores una vez y reutilizarlos en todo el documento, las variables permiten crear estilos más mantenibles,

adaptables y personalizables. Al comprender cómo funcionan las variables y cómo utilizarlas en diferentes situaciones, los desarrolladores pueden mejorar la eficiencia y la consistencia en el diseño de interfaces web.

## Referencias

- Mozilla Developer Network. (s.f.). CSS Custom Properties (Variables). Recuperado de [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- CSS-Tricks. (s.f.). A Strategy Guide To CSS Custom Properties. Recuperado de [https://css-tricks.com/strategies-approaches-to-css-custom-properties/](https://css-tricks.com/strategies-approaches-to-css-custom-properties/)
