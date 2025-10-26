# Introducción

## JavaScript en el Desarrollo Web

JavaScript es el lenguaje fundamental de la programación web moderna. Junto con HTML y CSS, forma la tríada esencial para construir páginas y aplicaciones interactivas. Mientras que HTML define la estructura y CSS el diseño visual, **JavaScript aporta la lógica, el dinamismo y la interactividad** necesarios para transformar una página estática en una verdadera aplicación funcional.

Desde su creación en 1995 por Brendan Eich, JavaScript ha recorrido un largo camino. Lo que comenzó como un lenguaje sencillo para validar formularios, hoy es una tecnología clave que impulsa desde sitios web corporativos hasta plataformas de streaming, redes sociales y aplicaciones empresariales complejas.

### ¿Por qué aprender JavaScript?

Porque **ningún desarrollador web puede prescindir de él**. JavaScript es el lenguaje que ejecutan todos los navegadores modernos y es esencial para ofrecer experiencias atractivas, dinámicas y fluidas. También es uno de los lenguajes más versátiles: se usa tanto en el frontend como en el backend (con Node.js), en aplicaciones móviles (React Native), en escritorio (Electron), y en el desarrollo de APIs, chatbots, dashboards, juegos, entre muchos otros.

Además, **la demanda laboral de programadores JavaScript es una de las más altas del sector tecnológico**, y dominarlo abre puertas a múltiples oportunidades profesionales.

## ¿Cómo se integra JavaScript en una página web?

JavaScript puede escribirse directamente dentro de un documento HTML utilizando la etiqueta `<script>`, o bien cargarse como un archivo externo.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Ejemplo JS</title>
  <script>
    alert("¡Bienvenido al mundo de JavaScript!");
  </script>
</head>
<body>
  <p>Este es un ejemplo básico de JavaScript en una página web.</p>
</body>
</html>

```

También puedes mantener tu código limpio separando la lógica JavaScript en un archivo `.js` independiente:

```html
<script src="main.js"></script>

```

## Ejemplos básicos y actuales

### Mostrar un mensaje emergente:

```jsx
alert("Hola, desarrollador web");

```

### Capturar datos del usuario e imprimirlos en consola:

```jsx
const nombre = prompt("¿Cómo te llamas?");
console.log("Bienvenido, " + nombre);

```

### Escuchar eventos del usuario:

```jsx
document.querySelector("button").addEventListener("click", () => {
  alert("¡Botón pulsado!");
});

```

### Llamar a una API externa con `fetch()`:

```jsx
fetch("https://api.example.com/datos")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

```

Estos ejemplos muestran que con pocas líneas puedes crear interactividad, comunicarte con servicios externos y reaccionar a acciones del usuario.

## Un lenguaje moderno y en evolución constante

Hoy en día, el JavaScript que se utiliza es muy diferente al que se enseñaba hace años. Este tutorial se enfoca en **JavaScript moderno (ES6 y posteriores)**, utilizando:

- `let` y `const` en lugar de `var`
- Funciones flecha (`=>`)
- Desestructuración de objetos y arrays
- Promesas y `async/await` para código asíncrono
- Módulos ES (import/export)
- Buenas prácticas y estructuras limpias

```jsx
const saludar = (nombre = "invitado") => {
  console.log(`Hola, ${nombre}`);
};

```

Además, conocerás herramientas actuales del ecosistema como **NPM**, linters como **ESLint**, bundlers como **Vite/Webpack**, y cómo usar el navegador como entorno de pruebas y depuración.

## Buenas prácticas desde el inicio

A lo largo del tutorial se promoverá el uso de código limpio, legible, reutilizable y seguro. Aprenderás a:

- Manejar errores correctamente (`try...catch`)
- Validar datos del usuario en el cliente
- Evitar malas prácticas como el uso innecesario de variables globales
- Documentar tu código y comentar con claridad

Y muy importante: te enseñaremos **cómo escribir JavaScript para personas, no solo para que funcione en la máquina**.

## La comunidad y los recursos

JavaScript tiene una de las comunidades más activas del mundo del software. Esto significa que siempre encontrarás apoyo, librerías útiles y documentación actualizada. Algunos recursos esenciales son:

- [MDN Web Docs](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- Stack Overflow, GitHub y foros especializados

## Conclusión

Dominar JavaScript es mucho más que aprender un lenguaje: es entender cómo se comportan las páginas web, cómo fluye la interacción entre el usuario y el sistema, y cómo construir aplicaciones del mundo real. A lo largo de este tutorial, recorrerás desde las bases más simples hasta herramientas modernas y ejemplos profesionales.

Prepárate para aprender de verdad. Este curso no solo te enseñará a usar JavaScript, **te enseñará a pensar como un desarrollador web moderno**.

## Referencias

- Flanagan, D. (2011). JavaScript: The Definitive Guide. O'Reilly Media.
- Duckett, J. (2014). JavaScript and jQuery: Interactive Front-End Web Development. Wiley.
- MDN Web Docs. (s.f.). JavaScript. Recuperado de [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)