# 🧪 Actividad Práctica: Creación de un Tablero de Tarjetas Flexibles

# 🧪 Actividad Práctica: Creación de un Tablero de Tarjetas Flexibles

## 🎯 Objetivo

Crear una cuadrícula de tarjetas (cards) que se adapte automáticamente al ancho del contenedor. Aprenderás a usar `flex-wrap`, controlar el orden de los elementos, alinear tarjetas horizontal y verticalmente, y entender cómo usar `flex-flow`.

## 🧰 Estructura del HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Práctica con flex-wrap y amigos</title>
  <style>
    /* Estilos aquí 👇 */
  </style>
</head>
<body>
  <h1 style="text-align: center;">Tablero de tarjetas flexibles</h1>
  <div class="container">
    <div class="card">Tarjeta 1</div>
    <div class="card">Tarjeta 2</div>
    <div class="card especial">Tarjeta 3</div>
    <div class="card">Tarjeta 4</div>
    <div class="card">Tarjeta 5</div>
    <div class="card">Tarjeta 6</div>
  </div>
</body>
</html>

```

## 🎨 Estilos CSS: Flexbox en acción

```css
.container {
  display: flex;
  flex-flow: row wrap; /* Combina flex-direction + flex-wrap */
  justify-content: space-between; /* Espacio entre tarjetas horizontalmente */
  align-content: space-evenly; /* Distribuye el espacio entre filas verticalmente */
  gap: 10px; /* Espacio entre tarjetas */
  height: 500px; /* Altura para probar align-content */
  padding: 10px;
  border: 2px dashed #ccc;
}

/* Tarjetas básicas */
.card {
  flex: 0 1 30%; /* No crecer, encoger si es necesario, tamaño base 30% */
  min-width: 120px;
  padding: 20px;
  background-color: #e6f7ff;
  border: 1px solid #0099cc;
  font-family: sans-serif;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}

/* Cambiamos el orden de una tarjeta específica */
.especial {
  order: -1; /* Aparece primero aunque esté tercera en el HTML */
  background-color: #ffefc1;
}

```

## ✅ Qué vas a practicar

1. `flex-wrap: wrap` — permite que las tarjetas bajen a una nueva línea si no caben.
2. `flex-flow: row wrap` — escribe menos, gana claridad.
3. `justify-content: space-between` — reparte tarjetas de forma horizontal.
4. `align-content: space-evenly` — controla el espacio entre filas verticalmente.
5. `order` — cambia el orden visual de las tarjetas sin tocar el HTML.

## 🧩 Reto Extra: Cambia la dirección del contenedor

Prueba estas variantes en `.container` y observa el efecto:

```css
/* wrap-reverse */
flex-wrap: wrap-reverse;

/* flex-flow inverso */
flex-flow: row-reverse wrap;

```

## 🧪 Reto Avanzado

Haz que en dispositivos móviles (`max-width: 600px`) solo se muestre **una tarjeta por línea** usando media queries:

```css
@media (max-width: 600px) {
  .card {
    flex: 0 1 100%; /* Ocupa toda la línea */
  }
}

```

## 🧠 Conclusión

Con esta actividad has practicado de forma real todos los conceptos clave del texto sobre `flex-wrap`, y ahora comprendes cómo aplicarlos en situaciones reales como galerías, dashboards, tableros o secciones de contenido adaptable.

# 🧩 Anexo: Versión Interactiva con JavaScript

## 🧰 HTML + CSS + JS Integrado

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Flex-Wrap Interactivo</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 20px;
    }

    h1 {
      text-align: center;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-bottom: 20px;
      justify-content: center;
    }

    select, button {
      padding: 6px 12px;
      font-size: 14px;
    }

    .container {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-content: space-evenly;
      gap: 10px;
      height: 500px;
      padding: 10px;
      border: 2px dashed #ccc;
      transition: all 0.3s ease;
    }

    .card {
      flex: 0 1 30%;
      min-width: 120px;
      padding: 20px;
      background-color: #e6f7ff;
      border: 1px solid #0099cc;
      font-weight: bold;
      text-align: center;
      border-radius: 6px;
    }

    .especial {
      background-color: #ffefc1;
    }
  </style>
</head>
<body>

  <h1>🎯 Flexbox Interactivo</h1>

  <div class="controls">
    <label>
      flex-wrap:
      <select id="wrapSelect">
        <option value="nowrap">nowrap</option>
        <option value="wrap" selected>wrap</option>
        <option value="wrap-reverse">wrap-reverse</option>
      </select>
    </label>

    <label>
      justify-content:
      <select id="justifySelect">
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="space-between" selected>space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly">space-evenly</option>
      </select>
    </label>

    <label>
      align-content:
      <select id="alignSelect">
        <option value="flex-start">flex-start</option>
        <option value="center">center</option>
        <option value="space-between">space-between</option>
        <option value="space-around">space-around</option>
        <option value="space-evenly" selected>space-evenly</option>
        <option value="stretch">stretch</option>
      </select>
    </label>

    <button id="reorderBtn">🔄 Cambiar orden</button>
  </div>

  <div class="container" id="flexContainer">
    <div class="card">Tarjeta 1</div>
    <div class="card especial">Tarjeta 2</div>
    <div class="card">Tarjeta 3</div>
    <div class="card">Tarjeta 4</div>
    <div class="card">Tarjeta 5</div>
    <div class="card">Tarjeta 6</div>
  </div>

  <script>
    const container = document.getElementById("flexContainer");
    const wrapSelect = document.getElementById("wrapSelect");
    const justifySelect = document.getElementById("justifySelect");
    const alignSelect = document.getElementById("alignSelect");
    const reorderBtn = document.getElementById("reorderBtn");

    // Actualizar propiedades del contenedor flex
    function updateFlexSettings() {
      container.style.flexWrap = wrapSelect.value;
      container.style.justifyContent = justifySelect.value;
      container.style.alignContent = alignSelect.value;
    }

    // Aplicar cambios al seleccionar opciones
    wrapSelect.addEventListener("change", updateFlexSettings);
    justifySelect.addEventListener("change", updateFlexSettings);
    alignSelect.addEventListener("change", updateFlexSettings);

    // Cambiar aleatoriamente el orden visual de las tarjetas
    reorderBtn.addEventListener("click", () => {
      const cards = [...container.children];
      cards.forEach((card, i) => {
        card.style.order = Math.floor(Math.random() * 10);
      });
    });
  </script>

</body>
</html>

```

## ✅ Qué puedes hacer con esta versión

- Cambiar el **comportamiento de ajuste de línea (`flex-wrap`)** en tiempo real.
- Ajustar la **distribución horizontal (`justify-content`)** con solo un clic.
- Cambiar la **alineación vertical entre filas (`align-content`)** visualmente.
- Mezclar las tarjetas con un botón que modifica dinámicamente el **orden visual** (`order`).