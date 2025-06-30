# 🧪 Proyecto práctico: Sección Hero Responsiva y Accesible con Flexbox

## 🎯 Objetivo

Crear una **sección Hero moderna, centrada con Flexbox**, que sea totalmente **responsiva**, con **accesibilidad mejorada**, una imagen decorativa SVG inline, animaciones suaves y control de disposición usando todas las propiedades principales de Flexbox:

## 📂 Estructura del Proyecto

```
/hero-flexbox/
├── index.html
├── styles.css
├── script.js (opcional, si quieres hacer más interacciones)
├── hero-bg.jpg (imagen de fondo real o de prueba)

```

## 🔧 index.html (comentado y mejorado)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sección Hero Accesible con Flexbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <main>
    <section class="hero" role="region" aria-label="Sección destacada principal">
      <div class="hero-content">
        <h1>Bienvenido a <strong>Mi Sitio Web</strong></h1>
        <p>Descubre nuestras increíbles ofertas y servicios diseñados para ti</p>
        <a href="#ofertas" class="btn" role="button" aria-label="Ver más sobre las ofertas">Ver más</a>
      </div>

      <!-- Decoración con SVG -->
      <div class="hero-svg" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="#ffffff22" />
        </svg>
      </div>
    </section>
  </main>

</body>
</html>

```

## 🎨 styles.css (explicado con Flexbox avanzado)

```css
/* ==== RESET Y FUENTE ==== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #111;
  color: #fff;
}

/* ==== SECCIÓN HERO ==== */
.hero {
  display: flex;
  flex-flow: row wrap; /* Permite que los elementos internos se ajusten si es necesario */
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 100vh;
  text-align: center;
  background-image: url('hero-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 40px;
}

/* ==== CONTENIDO DEL HERO ==== */
.hero-content {
  max-width: 700px;
  flex: 1 1 400px;
  z-index: 1;
  backdrop-filter: brightness(1.1);
  animation: fadeIn 1s ease-in-out;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

/* ==== BOTÓN ==== */
.btn {
  display: inline-block;
  padding: 12px 28px;
  background-color: #ff4500;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
}
.btn:hover,
.btn:focus {
  background-color: #e63946;
  outline: 2px solid #ffcccb;
  outline-offset: 4px;
}

/* ==== SVG DECORATIVO ==== */
.hero-svg {
  flex: 0 1 150px;
  align-self: flex-end;
  animation: float 3s ease-in-out infinite;
  opacity: 0.6;
}

/* ==== RESPONSIVE ==== */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .hero-content h1 {
    font-size: 2.2rem;
  }
  .hero-svg {
    display: none; /* Ocultar decoración en móviles si ocupa mucho espacio */
  }
}

/* ==== ANIMACIONES ==== */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

```

## ✅ ¿Qué estás practicando?

| Propiedad / Concepto | Aplicación directa |
| --- | --- |
| `display: flex` | Centrado general en `.hero` |
| `flex-direction` + `wrap` | `flex-flow: row wrap` |
| `justify-content` y `align-items` | Centrado horizontal y vertical |
| `flex` shorthand | `.hero-content` y `.hero-svg` |
| `align-self` | `.hero-svg` alineado abajo |
| `gap` | Espaciado entre elementos internos |
| `media queries` | Reordenamiento en móvil (`column`) |
| `transition` | Botón animado al hacer hover/focus |
| `animation` / `@keyframes` | Aparece suavemente (`fadeIn`, `float`) |
| `accessibility` (ARIA) | `role`, `aria-label`, `aria-hidden` |
| `SVG inline` | Decoración vectorial ligera y responsiva |

## 🧩 Reto Extra

Agrega un **overlay semitransparente** sobre el fondo:

```css
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

```

## ✅ Conclusión

Con esta versión has practicado una **implementación profesional de una sección Hero** usando Flexbox con:

- Alineación completa
- Adaptabilidad total
- Efectos visuales modernos
- Mejora de accesibilidad
- Estética profesional

Vamos a **mejorar la sección Hero** con lo siguiente:

### ✅ Mejoras integradas:

1. **Cambio automático de fondo según la hora del día** (mañana, tarde, noche).
2. **Animación de entrada al hacer scroll (scroll reveal)**.
3. **JavaScript para manejar el cambio dinámico de clases, animaciones y accesibilidad**.

## 🧩 Versión avanzada: Hero interactiva y dinámica con Flexbox + JS

### 📂 Estructura del Proyecto

```
/hero-flexbox-avanzado/
├── index.html
├── styles.css
├── script.js
├── bg-morning.jpg
├── bg-afternoon.jpg
├── bg-night.jpg

```

## 🔧 index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hero dinámica con Flexbox</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <main>
    <section class="hero" id="hero" role="region" aria-label="Sección destacada">
      <div class="hero-content hidden">
        <h1>Explora tu futuro digital</h1>
        <p>Diseños modernos, flexibles y accesibles a cualquier hora del día</p>
        <a href="#proyectos" class="btn" role="button">Ver proyectos</a>
      </div>

      <div class="hero-svg" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="150" height="150">
          <circle cx="100" cy="100" r="80" fill="#ffffff33" />
        </svg>
      </div>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>

```

## 🎨 styles.css

```css
/* Reset */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #111;
  color: white;
}

.hero {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: background-image 1s ease;
}

/* Overlay oscuro para mejorar contraste */
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 0;
}

.hero-content {
  z-index: 1;
  max-width: 700px;
  flex: 1 1 400px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.4rem;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  background: #ff5722;
  border-radius: 6px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background 0.3s;
}
.btn:hover { background: #e64a19; }

.hero-svg {
  flex: 0 1 150px;
  align-self: flex-end;
  z-index: 1;
  animation: float 4s ease-in-out infinite;
  opacity: 0.5;
}

/* Scroll animation hidden class */
.hidden {
  opacity: 0;
  transform: translateY(40px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }

  .hero-svg {
    display: none;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

```

## 🧠 script.js

```jsx
// 🎯 Cambiar fondo dinámico según hora
window.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const hour = new Date().getHours();

  let bg = "bg-morning.jpg";
  if (hour >= 12 && hour < 18) {
    bg = "bg-afternoon.jpg";
  } else if (hour >= 18 || hour < 6) {
    bg = "bg-night.jpg";
  }

  hero.style.backgroundImage = `url(${bg})`;
});

// 🎯 Mostrar contenido con animación al hacer scroll
const heroContent = document.querySelector('.hero-content');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Solo una vez
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(heroContent);

```

## ✅ Qué estás practicando aquí:

| Concepto | Aplicación |
| --- | --- |
| `flex` y `flex-flow` | Distribución principal del Hero |
| `flex-grow`, `flex-basis`, `align-self` | Organización del texto e imagen SVG |
| `media queries` | Responsividad total |
| `transition`, `transform`, `opacity` | Efectos visuales suaves en scroll |
| `JavaScript` | Cambio de fondo dinámico + intersección para animación |
| `IntersectionObserver` | Animaciones al entrar en viewport |
| `background-image` dinámico | En base a la hora del sistema |
| `SVG inline` | Ligero, escalable y decorativo |

# 🧩 Anexo: Funciones Avanzadas Hero

Incluye:

✅ 1. Mensaje dinámico de saludo (según hora del sistema)

✅ 2. Cambio automático entre modo claro / oscuro

✅ 3. Interruptor manual para elegir tema

✅ 4. Fondos generados con gradientes CSS dinámicos

## 📂 Estructura de archivos final:

```
/hero-flexbox-pro/
├── index.html
├── styles.css
├── script.js

```

## 🔧 index.html (actualizado)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Hero Dinámico Pro</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <header class="theme-toggle">
    <label>
      <input type="checkbox" id="themeSwitcher" aria-label="Alternar modo claro/oscuro" />
      🌗 Tema oscuro
    </label>
  </header>

  <main>
    <section class="hero" id="hero" role="region" aria-label="Sección destacada">
      <div class="hero-content hidden">
        <h1 id="greeting">¡Hola!</h1>
        <p>Diseños modernos, flexibles y accesibles a cualquier hora del día</p>
        <a href="#proyectos" class="btn" role="button">Ver proyectos</a>
      </div>

      <div class="hero-svg" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="150" height="150">
          <circle cx="100" cy="100" r="80" fill="#ffffff33" />
        </svg>
      </div>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>

```

## 🎨 styles.css (incluye modo claro y gradientes dinámicos)

```css
/* ==== RESET ==== */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  transition: background 0.4s ease;
}

.theme-toggle {
  text-align: right;
  padding: 10px 20px;
  font-size: 14px;
  background-color: var(--bg-header);
  color: var(--text-color);
}

body.light {
  --bg: #f0f0f0;
  --text-color: #111;
  --bg-header: #ffffff;
  --btn-bg: #ff5722;
  --btn-hover: #e64a19;
}

body.dark {
  --bg: #111;
  --text-color: #ffffff;
  --bg-header: #222;
  --btn-bg: #ff5722;
  --btn-hover: #e64a19;
}

/* ==== HERO ==== */
.hero {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, var(--grad1), var(--grad2));
  color: var(--text-color);
  transition: background 1s ease;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 0;
}

.hero-content {
  z-index: 1;
  max-width: 700px;
  flex: 1 1 400px;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;
}
.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}
.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  background: var(--btn-bg);
  border-radius: 6px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: background 0.3s;
}
.btn:hover { background: var(--btn-hover); }

.hero-svg {
  flex: 0 1 150px;
  align-self: flex-end;
  z-index: 1;
  animation: float 4s ease-in-out infinite;
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
  }
  .hero-svg {
    display: none;
  }
  .hero-content h1 {
    font-size: 2.2rem;
  }
}

/* Animaciones */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

```

## 🧠 script.js

```jsx
const hero = document.getElementById("hero");
const greeting = document.getElementById("greeting");
const themeSwitcher = document.getElementById("themeSwitcher");
const heroContent = document.querySelector('.hero-content');

// 1. Asignar gradientes y saludo según la hora
function setHeroBackgroundAndGreeting() {
  const hour = new Date().getHours();
  let grad1, grad2, mensaje;

  if (hour >= 6 && hour < 12) {
    grad1 = "#ffecd2"; grad2 = "#fcb69f";
    mensaje = "¡Buenos días!";
  } else if (hour >= 12 && hour < 18) {
    grad1 = "#a1c4fd"; grad2 = "#c2e9fb";
    mensaje = "¡Buenas tardes!";
  } else {
    grad1 = "#2c3e50"; grad2 = "#4ca1af";
    mensaje = "¡Buenas noches!";
  }

  document.documentElement.style.setProperty("--grad1", grad1);
  document.documentElement.style.setProperty("--grad2", grad2);
  greeting.textContent = mensaje;
}

// 2. Detectar preferencia de tema del sistema
function autoDetectTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = prefersDark ? "dark" : "light";
  document.body.classList.add(theme);
  themeSwitcher.checked = prefersDark;
}

// 3. Interruptor manual de tema
themeSwitcher.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeSwitcher.checked);
  document.body.classList.toggle("light", !themeSwitcher.checked);
});

// 4. Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

observer.observe(heroContent);

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", () => {
  setHeroBackgroundAndGreeting();
  autoDetectTheme();
});

```

## ✅ Resultado final: ¿qué incluye esta versión?

| Funcionalidad | Implementación |
| --- | --- |
| 🎨 Gradientes según hora | `setHeroBackgroundAndGreeting()` |
| ☀️🌙 Modo claro/oscuro automático | `autoDetectTheme()` + media query |
| 🎛️ Selector manual | Switch con toggle `themeSwitcher` |
| 📜 Animación con scroll | `IntersectionObserver` |
| 🌈 Transiciones visuales limpias | `transition` y `keyframes` |
| ♿ Accesibilidad (ARIA, foco, roles) | `aria-label`, `role`, `tabindex`, `:focus` |
| 🧪 Práctica integral de Flexbox y diseño moderno | `flex`, `flex-flow`, `align-self`, `gap`, media queries |