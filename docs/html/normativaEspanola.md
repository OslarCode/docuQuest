# Normativas Españolas sobre Accesibilidad Web en HTML5

## Marco Normativo Español sobre Accesibilidad Web

### 1. Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)

La Ley 34/2002 establece el marco legal básico para los servicios de la sociedad de la información y el comercio electrónico en España. Si bien no aborda directamente la accesibilidad web, en su artículo 4.2.f establece la obligación de garantizar el acceso a la información y los servicios en línea a todas las personas, incluidas aquellas con discapacidad.

### 2. Real Decreto 1494/2007, de 12 de noviembre, por el que se aprueba el Reglamento sobre las condiciones básicas para el acceso de las personas con discapacidad a las tecnologías, productos y servicios relacionados con la sociedad de la información y medios de comunicación social

Este Real Decreto establece las condiciones básicas de accesibilidad y no discriminación para las personas con discapacidad en relación con las tecnologías de la información y la comunicación. En su disposición adicional segunda, se establece la obligación de que los sitios web de los organismos públicos cumplan con los estándares de accesibilidad establecidos en el Real Decreto 1494/2007.

### 3. Norma UNE 139803:2012 sobre Accesibilidad en la Web

La Norma UNE 139803:2012 es la norma española que establece los criterios y requisitos de accesibilidad que deben cumplir los sitios web para garantizar la accesibilidad de las personas con discapacidad. Esta norma está basada en las Directrices de Accesibilidad al Contenido Web (WCAG) del World Wide Web Consortium (W3C) y define tres niveles de conformidad: A, AA y AAA.

### 4. Directrices de Accesibilidad al Contenido Web (WCAG)

Aunque no son una normativa española específica, las WCAG son un conjunto de pautas internacionales desarrolladas por el W3C que establecen los estándares de accesibilidad web a nivel mundial. Estas directrices están ampliamente reconocidas y son referenciadas por las normativas y regulaciones nacionales, incluidas las normativas españolas, como la Norma UNE 139803:2012.

## Requisitos de Accesibilidad para Sitios Web en HTML5

Los sitios web deben cumplir con una serie de requisitos de accesibilidad para garantizar que sean utilizables por todas las personas, incluidas aquellas con discapacidad. Algunos de los requisitos más importantes incluyen:

### 1. Uso de Elementos Semánticos

Los desarrolladores deben utilizar elementos semánticos de HTML5, como `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`, para estructurar el contenido de manera clara y significativa.

### 2. Uso Correcto de Atributos de Accesibilidad

Se deben utilizar atributos de accesibilidad como `alt` para descripciones de imágenes, `aria-label` para etiquetar elementos interactivos y `tabindex` para especificar el orden de tabulación de los elementos.

### 3. Contraste de Color y Legibilidad

El sitio web debe tener un buen contraste de color entre el texto y el fondo para garantizar que sea legible para personas con discapacidades visuales o dificultades para la lectura.

### 4. Teclado y Navegación Alternativa

El sitio web debe ser completamente operable utilizando solo el teclado, sin depender del ratón, y debe proporcionar opciones de navegación alternativas para personas con discapacidades motoras.

## Ejemplo de Cumplimiento de Normativas Españolas en HTML5

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejemplo de Sitio Web Accesible</title>
  </head>
  <body>
    <header>
      <h1>Encabezado del Sitio Web</h1>
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Acerca de</a></li>
          <li><a href="#">Servicios</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h2>Sección Principal</h2>
        <p>Contenido principal del sitio web.</p>
        <img src="imagen.jpg" alt="Descripción de la imagen" />
      </section>

      <aside>
        <h2>Barra Lateral</h2>
        <p>Contenido relacionado o complementario.</p>
      </aside>
    </main>

    <footer>
      <p>Derechos de autor © 2022. Todos los derechos reservados.</p>
    </footer>
  </body>
</html>
```

Este ejemplo muestra un sitio web simple creado con HTML5 que cumple con algunas de las normativas y requisitos de accesibilidad españolas, como el uso de elementos semánticos, atributos de accesibilidad y contraste de color adecuado.

## Conclusiones

En conclusión, las normativas españolas sobre accesibilidad web en HTML5 establecen los requisitos y estándares que deben cumplir los sitios web para garantizar que sean accesibles para todas las personas, incluidas aquellas con discapacidad. Cumplir con estas normativas es fundamental para promover la igualdad de oportunidades y el pleno ejercicio de los derechos de todas las personas en el entorno digital. Los desarrolladores web deben estar familiarizados con estas normativas y asegurarse de que sus sitios web cumplan con los requisitos de accesibilidad para garantizar una experiencia inclusiva para todos los usuarios.
