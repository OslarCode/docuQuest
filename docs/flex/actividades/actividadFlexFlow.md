# 🧪 Actividad práctica: Explorando flex-flow en entornos reales

## 🎯 Objetivo

Crear una interfaz compuesta por tarjetas (cards), dispuestas en diferentes direcciones y ajustes de línea, utilizando la propiedad abreviada `flex-flow`. También aplicaremos combinaciones con `justify-content`, `align-items`, `gap`, y media queries para lograr un diseño adaptable.

## 🧰 Parte 1: Estructura básica (HTML + estilos iniciales)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Actividad Flex-Flow</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .container {
      display: flex;
      flex-flow: row wrap; /* Dirección por defecto: fila con ajuste automático */
      justify-content: space-around;
      align-items: center;
      gap: 15px;
      min-height: 400px;
      border: 2px dashed #bbb;
      padding: 15px;
    }

    .card {
      flex: 0 1 200px; /* No crece, se encoge si es necesario, tamaño base 200px */
      height: 120px;
      background-color: #e3f2fd;
      border: 1px solid #64b5f6;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #0d47a1;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>

<h1>🌐 Práctica con <code>flex-flow</code></h1>

<div class="container" id="container">
  <div class="card">Tarjeta 1</div>
  <div class="card">Tarjeta 2</div>
  <div class="card">Tarjeta 3</div>
  <div class="card">Tarjeta 4</div>
  <div class="card">Tarjeta 5</div>
  <div class="card">Tarjeta 6</div>
</div>

</body>
</html>

```

## 🔧 Parte 2: Modificamos dinámicamente `flex-flow` (añadiendo JS interactivo)

```html
<!-- Agrega esto antes del cierre </body> -->

<div style="text-align:center; margin-top: 40px;">
  <label for="flowSelect"><strong>Elegir flex-flow:</strong></label>
  <select id="flowSelect">
    <option value="row wrap" selected>row wrap</option>
    <option value="row-reverse wrap">row-reverse wrap</option>
    <option value="column wrap">column wrap</option>
    <option value="column wrap-reverse">column wrap-reverse</option>
    <option value="row nowrap">row nowrap</option>
  </select>
</div>

<script>
  const container = document.getElementById("container");
  const selector = document.getElementById("flowSelect");

  selector.addEventListener("change", () => {
    container.style.flexFlow = selector.value;
  });
</script>

```

📌 **¿Qué hace esto?** Te permite cambiar dinámicamente el valor de `flex-flow` con un selector `<select>` y ver el efecto directamente en las tarjetas.

## 🧠 Parte 3: Añadir comportamiento responsive

Agrega un media query para que los ítems cambien su orientación en móviles:

```css
@media (max-width: 600px) {
  .container {
    flex-flow: column wrap;
    justify-content: center;
    align-items: stretch;
  }

  .card {
    flex: 1 1 100%; /* Las tarjetas ocupan el ancho completo */
    height: auto;
  }
}

```

## 📌 Retos opcionales

### 🧩 Reto 1: Galería de imágenes

Sustituye las tarjetas por `<img>` en una clase `.gallery` usando:

```css
.gallery {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 10px;
}
.gallery img {
  flex: 0 1 150px;
  max-width: 100%;
  border-radius: 6px;
}

```

### 📊 Reto 2: Dashboard de widgets

Cambia `.card` por `.widget` con diferentes tamaños base (`flex-basis`) para simular un dashboard.

## ✅ Conclusión

Con esta práctica guiada, has trabajado con:

- ✅ `flex-flow` y sus combinaciones más comunes
- ✅ Cambios de dirección (`row`, `column`, `reverse`)
- ✅ Ajuste automático de líneas (`wrap`, `nowrap`, `wrap-reverse`)
- ✅ Integración con `justify-content` y `align-items`
- ✅ Interactividad con JavaScript
- ✅ Diseño responsive con media queries