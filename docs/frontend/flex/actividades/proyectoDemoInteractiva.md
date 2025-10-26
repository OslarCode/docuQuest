# 🧪 Proyecto práctico: Demo Interactiva Completa de Flexbox

## 🎯 Objetivo

Visualizar de forma práctica y animada cómo afectan las distintas propiedades de Flexbox a los contenedores e ítems. Esta demo permite:

- Cambiar dinámicamente `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`.
- Ajustar `flex-grow`, `flex-shrink`, `flex-basis`, `order` y `align-self` de cada ítem.
- Observar el efecto visual inmediato, con animaciones suaves mediante **GSAP (TweenLite)**.

## ✅ ¿Qué conceptos se practican aquí?

| Categoría | Propiedades |
| --- | --- |
| Contenedor Flex | `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content` |
| Ítems Flex | `align-self`, `flex-grow`, `flex-shrink`, `flex-basis`, `order` |
| Composición | `flex` (shorthand) |
| Responsividad | `@media queries`, `min-width`, `wrap` |
| Animación | `GSAP`, `transform`, `transition`, `ease` |
| Interacción | `input[type="radio |
| Accesibilidad | `label for`, `aria-*`, `role="region"` |

## Código HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flexbox Demo Pro</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
  <link rel="stylesheet" href="styles.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
  <script src="script.js" defer></script>
</head>
<body>
  <header>
    <h1>🎯 Flexbox Demo Pro</h1>
    <button class="toggle-theme" id="toggleTheme">🌓 Tema</button>
  </header>

  <section class="controls">
    <details open>
      <summary>Contenedor Flex</summary>
      <label for="direction">Dirección:</label>
      <select id="direction">
        <option value="row">row</option>
        <option value="row-reverse">row-reverse</option>
        <option value="column">column</option>
        <option value="column-reverse">column-reverse</option>
      </select>

      <label for="wrap">Wrap:</label>
      <select id="wrap">
        <option value="nowrap">nowrap</option>
        <option value="wrap" selected>wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </select>

      <label for="justify">Justify Content:</label>
      <select id="justify">
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="flex-end">flex-end</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>

      <label for="alignItems">Align Items:</label>
      <select id="alignItems">
        <option value="stretch">stretch</option>
        <option value="center">center</option>
        <option value="flex-start">flex-start</option>
        <option value="flex-end">flex-end</option>
        <option value="baseline">baseline</option>
      </select>
    </details>

    <details>
      <summary>Ítem Seleccionado</summary>
      <label for="itemSelect">Elegir ítem:</label>
      <select id="itemSelect">
        <option value="0">Ítem 1</option>
        <option value="1">Ítem 2</option>
        <option value="2">Ítem 3</option>
        <option value="3">Ítem 4</option>
      </select>

      <label for="grow">flex-grow:</label>
      <input type="number" id="grow" value="1" min="0" />

      <label for="shrink">flex-shrink:</label>
      <input type="number" id="shrink" value="1" min="0" />

      <label for="basis">flex-basis:</label>
      <input type="text" id="basis" value="100px" />

      <label for="order">order:</label>
      <input type="number" id="order" value="0" />

      <label for="alignSelf">align-self:</label>
      <select id="alignSelf">
        <option value="auto">auto</option>
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="flex-end">flex-end</option>
        <option value="stretch">stretch</option>
        <option value="baseline">baseline</option>
      </select>
    </details>
  </section>

  <section class="flex-container" id="flexContainer">
    <div class="flex-item">1</div>
    <div class="flex-item">2</div>
    <div class="flex-item">3</div>
    <div class="flex-item">4</div>
  </section>
</body>
</html>

```

## Código CSS

```css
:root {
  --bg: #f5f5f5;
  --text: #111;
  --accent: #007bff;
  --card: #fff;
}

body.dark {
  --bg: #111;
  --text: #eee;
  --accent: #00bcd4;
  --card: #222;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg);
  color: var(--text);
  padding: 20px;
  transition: background 0.3s, color 0.3s;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.toggle-theme {
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

details {
  background: var(--card);
  padding: 10px;
  border-radius: 6px;
  flex: 1 1 300px;
}

details summary {
  font-weight: bold;
  margin-bottom: 8px;
  cursor: pointer;
}

label {
  display: block;
  margin-top: 10px;
}

select, input[type="number"], input[type="text"] {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px dashed var(--accent);
  min-height: 200px;
  transition: all 0.3s ease;
}

.flex-item {
  background-color: var(--card);
  padding: 20px;
  border-radius: 8px;
  flex: 1 1 100px;
  text-align: center;
  color: var(--text);
  transition: transform 0.3s ease;
}

.flex-item:hover {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
  }
}
```

## Código JavaScript

```jsx
// Referencias a elementos
const container = document.getElementById("flexContainer");
const themeBtn = document.getElementById("toggleTheme");

// Controles contenedor
document.getElementById("direction").addEventListener("change", e => {
  container.style.flexDirection = e.target.value;
});
document.getElementById("wrap").addEventListener("change", e => {
  container.style.flexWrap = e.target.value;
});
document.getElementById("justify").addEventListener("change", e => {
  container.style.justifyContent = e.target.value;
});
document.getElementById("alignItems").addEventListener("change", e => {
  container.style.alignItems = e.target.value;
});

// Modo claro/oscuro
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// GSAP animación de entrada
window.addEventListener("DOMContentLoaded", () => {
  gsap.from(".flex-item", {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.8,
    ease: "back.out(1.7)"
  });
});

// Controles de ítem individual
const itemSelect = document.getElementById("itemSelect");
const grow = document.getElementById("grow");
const shrink = document.getElementById("shrink");
const basis = document.getElementById("basis");
const order = document.getElementById("order");
const alignSelf = document.getElementById("alignSelf");

[itemSelect, grow, shrink, basis, order, alignSelf].forEach(el => {
  el.addEventListener("input", updateItemStyles);
});

function updateItemStyles() {
  const index = parseInt(itemSelect.value);
  const item = document.querySelectorAll(".flex-item")[index];

  item.style.flexGrow = grow.value;
  item.style.flexShrink = shrink.value;
  item.style.flexBasis = basis.value;
  item.style.order = order.value;
  item.style.alignSelf = alignSelf.value;
}
```