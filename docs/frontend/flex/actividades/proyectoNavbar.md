# 🧪 Proyecto práctico: Creación de una Navbar Responsiva con Flexbox

Vamos a transformar este ejemplo de **navbar responsiva** en una **actividad práctica guiada** que **integra todos los conceptos de Flexbox** que hemos trabajado, incluyendo:

✅ `flex-direction`

✅ `flex-wrap`

✅ `justify-content`

✅ `align-items`

✅ `align-self`

✅ `order`

✅ `flex-grow`

✅ `flex-shrink`

✅ `flex-basis`

✅ `flex` (shorthand)

✅ `flex-flow`

✅ `media queries`

✅ Menú hamburguesa interactivo con JavaScript

# 🧪 Actividad Guiada: Creación de una Navbar Responsiva con Flexbox

## 🎯 Objetivo

Construir una barra de navegación moderna, flexible y responsiva, que se adapte automáticamente a distintos tamaños de pantalla. Se utilizarán todas las propiedades clave de Flexbox para estructurar, alinear, expandir, contraer y ordenar los elementos.

## 📂 Estructura del Proyecto

```
/navbar-flexbox/
├── index.html
├── styles.css
└── script.js

```

## 🔧 index.html (con comentarios didácticos)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navbar Flexbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <header>
    <nav class="navbar">
      <div class="logo">
        <a href="#">MiLogo</a>
      </div>

      <ul class="nav-links">
        <li><a href="#">Inicio</a></li>
        <li class="dropdown">
          <a href="#">Servicios ▼</a>
          <ul class="dropdown-content">
            <li><a href="#">Diseño Web</a></li>
            <li><a href="#">SEO</a></li>
            <li><a href="#">Hosting</a></li>
          </ul>
        </li>
        <li><a href="#">Portafolio</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>

      <div class="social-icons">
        <a href="#"><img src="facebook.png" alt="Facebook" /></a>
        <a href="#"><img src="twitter.png" alt="Twitter" /></a>
        <a href="#"><img src="instagram.png" alt="Instagram" /></a>
      </div>

      <div class="burger" id="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  </header>

  <script src="script.js"></script>
</body>
</html>

```

## 🎨 styles.css (explicado y mejorado)

```css
/* ========== RESET ========== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
}

/* ========== HEADER ========== */
header {
  background-color: #222;
  color: white;
  padding: 10px 0;
}

/* ========== NAVBAR FLEX ========== */
.navbar {
  display: flex;
  flex-flow: row wrap; /* Combina flex-direction: row + flex-wrap: wrap */
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}

/* LOGO */
.logo a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

/* MENÚ DE ENLACES */
.nav-links {
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 25px;
  flex: 1 1 auto;
  justify-content: center;
}

/* Enlaces individuales */
.nav-links a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  padding: 8px 12px;
}

/* Dropdown */
.dropdown {
  position: relative;
}
.dropdown-content {
  display: none;
  position: absolute;
  top: 40px;
  background-color: #444;
  list-style: none;
  padding: 0;
}
.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown-content li a {
  display: block;
  padding: 10px;
  color: white;
}

/* ICONOS SOCIALES */
.social-icons {
  display: flex;
  gap: 10px;
  order: 2;
}
.social-icons img {
  width: 24px;
}

/* MENÚ HAMBURGUESA */
.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  order: 3;
}
.burger div {
  width: 25px;
  height: 3px;
  background: white;
}

/* ========== RESPONSIVE (MOBILE) ========== */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    background-color: #222;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 60px;
    left: 0;
  }

  .nav-links.active {
    display: flex;
  }

  .burger {
    display: flex;
  }

  .social-icons {
    justify-content: center;
    flex-grow: 1;
  }
}

```

## 🧠 script.js (para el menú hamburguesa)

```jsx
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

```

## ✅ ¿Qué conceptos de Flexbox has practicado?

| Concepto | Dónde se aplica |
| --- | --- |
| `display: flex` | `.navbar`, `.nav-links`, `.social-icons` |
| `flex-direction` | `.nav-links` (fila y columna según media query) |
| `flex-wrap` | `.navbar` para adaptación automática |
| `flex-grow` | `.social-icons` crece en móvil |
| `flex-shrink` | `.logo` no se encoge (`flex-shrink: 0`) |
| `flex-basis` | implícito en los enlaces con `auto` |
| `flex` shorthand | `.nav-links` (`flex: 1 1 auto`) |
| `justify-content` | Espacio entre logo, enlaces e iconos |
| `align-items` | Centrado vertical de los ítems |
| `align-self` | (opcional para ejercicios adicionales) |
| `order` | Reorganización en móvil (`.social-icons`, `.burger`) |

A continuación te propongo una **serie de mejoras profesionales** para elevar tu navbar responsiva a un **nivel avanzado y accesible**, sin perder compatibilidad ni simplicidad. Estas mejoras incluyen:

## ✅ 1. Mejora de Accesibilidad (ARIA y navegación teclado)

### 🎯 Objetivo:

Hacer que el menú hamburguesa y el dropdown sean **accesibles para lectores de pantalla y teclado**.

### 🛠️ Instrucciones:

### 🧩 HTML:

Actualiza el botón hamburguesa con atributos ARIA:

```html
<div
  class="burger"
  id="burger"
  role="button"
  aria-label="Abrir menú de navegación"
  aria-expanded="false"
  aria-controls="navMenu"
  tabindex="0">
  <div></div>
  <div></div>
  <div></div>
</div>

<ul class="nav-links" id="navMenu">
  ...
</ul>

```

### 🧩 JS:

Mejora el script para controlar `aria-expanded`:

```jsx
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

function toggleMenu() {
  navMenu.classList.toggle('active');
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
}

burger.addEventListener('click', toggleMenu);
burger.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') toggleMenu();
});

```

## ✅ 2. Animación del menú desplegable (transición suave)

### 🎯 Objetivo:

Evitar el cambio brusco al abrir/cerrar el menú en móvil.

### 🛠️ CSS:

```css
.nav-links {
  display: flex;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.nav-links.active {
  max-height: 500px; /* Ajusta según contenido */
}

```

**Importante**: eliminar el `display: none` para permitir la animación (`max-height` solo funciona con `block/flex` visibles).

## ✅ 3. Reemplazar imágenes por íconos SVG (inline-flex)

### 🎯 Objetivo:

Reducir dependencia de imágenes externas, mejorar rendimiento y escalabilidad.

### 🛠️ HTML (ejemplo de icono de Twitter):

```html
<div class="social-icons">
  <a href="#" aria-label="Twitter" class="icon twitter">
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
      <path d="M23.4 4.6a9.8 9.8 0 0 1-2.8.8 5 5 0 0 0 2.1-2.7 9.7 9.7 0 0 1-3 1.2 4.8 4.8 0 0 0-8.4 4.4A13.7 13.7 0 0 1 1.6 3.2a4.8 4.8 0 0 0 1.5 6.4 4.8 4.8 0 0 1-2.2-.6v.1a4.8 4.8 0 0 0 3.9 4.7 4.8 4.8 0 0 1-2.2.1 4.8 4.8 0 0 0 4.5 3.3A9.7 9.7 0 0 1 0 19.5a13.7 13.7 0 0 0 7.5 2.2c9 0 13.9-7.5 13.9-14 0-.2 0-.4 0-.6a10 10 0 0 0 2.4-2.5z"/>
    </svg>
  </a>
  <!-- Repite para otros iconos -->
</div>

```

### 🛠️ CSS:

```css
.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.3s;
}
.social-icons a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.social-icons svg {
  fill: white;
  transition: transform 0.3s;
}
.social-icons a:hover svg {
  transform: scale(1.1);
}

```

## ✅ 4. Mejora de navegación por teclado (foco visual)

Agrega este snippet al final de tu CSS:

```css
a:focus, button:focus, .burger:focus {
  outline: 2px solid yellow;
  outline-offset: 4px;
}

```

## ✅ 5. Mejora visual opcional: Animación del ícono hamburguesa

```css
.burger div {
  transition: all 0.3s ease;
}
.burger.active div:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.burger.active div:nth-child(2) {
  opacity: 0;
}
.burger.active div:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

```

Y actualiza el JS para alternar la clase `active` en `.burger` también:

```jsx
function toggleMenu() {
  navMenu.classList.toggle('active');
  burger.classList.toggle('active');
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
}

```

## 🎁 BONUS: Mejora de rendimiento

- Usa `minified SVG` inline en vez de `<img>`.
- Precarga las fuentes o íconos importantes.
- Usa `prefers-reduced-motion` para desactivar animaciones si el usuario lo prefiere:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

```