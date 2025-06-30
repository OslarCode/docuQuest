# Media Queries en CSS3

# Exploración Avanzada de Media Queries en CSS3

## Introducción

Las media queries en CSS3 son una característica fundamental que permite diseñar interfaces web adaptables y receptivas, capaces de ajustarse dinámicamente a diferentes dispositivos y tamaños de pantalla.

## Funcionamiento de las Media Queries en CSS3

Las media queries en CSS3 permiten aplicar reglas de estilo específicas en función de características del dispositivo, como el ancho de la pantalla, la orientación, la resolución y otras capacidades. Esto se logra utilizando la sintaxis `@media` seguida de una condición que debe cumplirse para que se apliquen las reglas de estilo dentro de la media query.

### Sintaxis Básica

La sintaxis básica de una media query es la siguiente:

```css
@media screen and (max-width: 768px) {
  /* Reglas de estilo para pantallas con un ancho máximo de 768px */
  body {
    font-size: 14px;
  }
}
```

En este ejemplo, las reglas de estilo dentro de la media query se aplicarán solo a dispositivos con una pantalla de ancho máximo de 768px.

### Condiciones de Media Queries

Las media queries pueden utilizar una variedad de condiciones para determinar cuándo se deben aplicar las reglas de estilo. Algunas de las condiciones más comunes incluyen:

- Ancho de pantalla (`max-width`, `min-width`)
- Orientación (`landscape`, `portrait`)
- Resolución (`min-resolution`, `max-resolution`)
- Dispositivo (`device-width`, `device-height`)

### Operadores Lógicos

Las media queries también admiten operadores lógicos como `and`, `or` y `not`, que permiten combinar múltiples condiciones para definir reglas de estilo más complejas y específicas.

## Ejemplos Prácticos

### Media Query para Dispositivos Móviles

```css
@media screen and (max-width: 768px) {
  /* Reglas de estilo para dispositivos móviles */
  .menu {
    display: none;
  }
}
```

En este ejemplo, se oculta el menú de navegación cuando la pantalla tiene un ancho máximo de 768px, lo que permite optimizar la experiencia de usuario en dispositivos móviles.

### Media Query para Pantallas de Alta Resolución

```css
@media screen and (min-resolution: 2dppx) {
  /* Reglas de estilo para pantallas de alta resolución (Retina) */
  .logo {
    background-image: url("logo@2x.png");
    background-size: contain;
  }
}
```

En este ejemplo, se carga una versión de alta resolución del logotipo cuando la pantalla tiene una resolución mínima de 2dppx (puntos por pulgada), mejorando la calidad visual en pantallas Retina y similares.

## Utilización Avanzada de Media Queries en CSS3

### Media Queries Anidadas

Las media queries pueden anidarse dentro de otras reglas de estilo, lo que permite definir estilos específicos para diferentes situaciones dentro del mismo bloque de CSS.

### Media Queries Basadas en Funciones

Las media queries también pueden basarse en funciones de CSS, como `prefers-color-scheme` para detectar el modo de color preferido del usuario (`light` o `dark`), o `prefers-reduced-motion` para detectar si el usuario prefiere animaciones suaves o reducidas.

## Conclusiones

Las media queries en CSS3 son una herramienta poderosa que permite crear interfaces web adaptables y receptivas, capaces de proporcionar una experiencia de usuario óptima en una amplia variedad de dispositivos y entornos. Al comprender cómo funcionan y cómo utilizar las media queries en CSS3, los diseñadores y desarrolladores pueden crear sitios web modernos y flexibles que se adapten dinámicamente a las necesidades y preferencias de los usuarios.

## Referencias

- Mozilla Developer Network. (s.f.). Using media queries. Recuperado de [https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- CSS-Tricks. (s.f.). A Complete Guide to CSS Media Queries. Recuperado de [https://css-tricks.com/a-complete-guide-to-css-media-queries/](https://css-tricks.com/a-complete-guide-to-css-media-queries/)
