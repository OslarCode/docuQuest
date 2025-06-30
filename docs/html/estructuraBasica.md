# Estructura básica de una página web

# Introducción a HTML5: Estructura Básica de una Página Web

HTML5, la quinta revisión del lenguaje de marcado de hipertexto, ha revolucionado la forma en que se construyen y se presentan las páginas web en la era digital. Este estándar, desarrollado por el World Wide Web Consortium (W3C), introduce una serie de nuevas características y mejoras destinadas a mejorar la experiencia del usuario, la accesibilidad y la capacidad de los desarrolladores para crear contenido web dinámico y sofisticado. En este ensayo, exploraremos en profundidad la estructura básica de una página web creada con HTML5, destacando sus elementos esenciales y su organización jerárquica.

## Fundamentos de HTML5

HTML5 es la versión más reciente del lenguaje de marcado estándar utilizado para la creación y el diseño de páginas web. A diferencia de sus predecesores, HTML5 ofrece una serie de nuevas etiquetas semánticas y funcionalidades que simplifican el proceso de desarrollo y mejoran la accesibilidad y la interoperabilidad entre diferentes plataformas y dispositivos.

## La Estructura Básica de una Página Web HTML5

La estructura básica de una página web HTML5 sigue un formato estándar que consta de varios elementos fundamentales. A continuación, describiremos cada uno de estos elementos en detalle:

### 1. Doctype

El doctype (tipo de documento) es la primera línea de código en un documento HTML5 y define la versión de HTML utilizada en la página. En HTML5, el doctype se simplifica a la siguiente declaración:

```html
<!DOCTYPE html>
```

### 2. Elemento `<html>`

El elemento `<html>` es el contenedor raíz de todo el contenido de la página web y engloba todos los demás elementos HTML. Este elemento define el comienzo y el final del documento HTML5 y especifica el idioma del contenido mediante el atributo `lang`.

```html
<!DOCTYPE html>
<html lang="es">
  <!-- Contenido de la página -->
</html>
```

### 3. Elemento `<head>`

El elemento `<head>` contiene información meta sobre el documento, como el título de la página, metadatos, enlaces a hojas de estilo y scripts, entre otros. No se muestra directamente en la página web, pero proporciona información importante para los motores de búsqueda y los navegadores.

```html
<head>
  <meta charset="UTF-8" />
  <title>Título de la Página</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="script.js" defer></script>
</head>
```

### 4. Elemento `<body>`

El elemento `<body>` contiene todo el contenido visible de la página web, incluyendo texto, imágenes, vídeos, enlaces y otros elementos multimedia. Es el área donde los usuarios interactúan con el contenido de la página.

```html
<body>
  <header>
    <h1>Título de la Página</h1>
    <nav>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#acerca">Acerca de</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <section id="inicio">
    <h2>Sección de Inicio</h2>
    <p>Contenido de la sección de inicio...</p>
  </section>

  <section id="acerca">
    <h2>Acerca de Nosotros</h2>
    <p>Información sobre nuestra empresa...</p>
  </section>

  <footer>
    <p>Derechos de Autor &copy; 2024. Todos los derechos reservados.</p>
  </footer>
</body>
```

### 5. Elementos Semánticos

HTML5 introduce una serie de nuevos elementos semánticos que permiten a los desarrolladores estructurar el contenido de manera más significativa y accesible. Algunos de estos elementos incluyen `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>` y `<aside>`. Estos elementos proporcionan información adicional sobre el propósito y la estructura del contenido, lo que facilita la navegación y la comprensión para los usuarios y los motores de búsqueda.

```html
<header>
  <!-- Encabezado de la página -->
</header>

<nav>
  <!-- Menú de navegación -->
</nav>

<section>
  <!-- Sección principal de la página -->
</section>

<article>
  <!-- Contenido independiente y autocontenido -->
</article>

<aside>
  <!-- Contenido relacionado o complementario -->
</aside>

<footer>
  <!-- Pie de página de la página web -->
</footer>
```

### 6. Comentarios

Los comentarios en HTML5 se utilizan para proporcionar información adicional dentro del código fuente sin afectar la visualización o el comportamiento de la página web. Los comentarios se encierran entre `<!--` y `-->`.

```html
<!-- Este es un comentario en HTML5 -->
```

### 7. Atributos Globales

Los atributos globales son aquellos que pueden ser utilizados en cualquier elemento HTML5 y proporcionan información adicional sobre el elemento o su comportamiento. Algunos ejemplos de atributos globales incluyen `id`, `class`, `style`, `title`, `lang`, `data-*`, `aria-*`, entre otros.

```html
<div id="contenedor" class="principal" style="color: #333;">Contenido...</div>
```

## Conclusión

En conclusión, la estructura básica de una página web HTML5 sigue un formato estándar que consta de varios elementos esenciales, incluyendo el doctype, los elementos `<html>`, `<head>` y `<body>`, así como elementos semánticos y atributos globales. Estos elementos proporcionan la base sobre la cual se construye el contenido de la página web, permitiendo a los desarrolladores crear experiencias web dinámicas, accesibles e interactivas. Con la continua evolución de HTML5 y las tecnologías web relacionadas, se espera que el desarrollo web siga avanzando y ofreciendo nuevas y emocionantes posibilidades en el futuro.
