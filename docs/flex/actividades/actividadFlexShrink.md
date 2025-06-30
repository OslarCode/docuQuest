# 🧪 Actividad práctica: Controlando la contracción con flex-shrink

## 🎯 Objetivo

Visualizar cómo los elementos dentro de un contenedor Flexbox se contraen al disminuir el espacio disponible, y cómo podemos **controlar individualmente qué tan rápido se encoge cada uno** mediante `flex-shrink`.

## 🧰 Parte 1: Estructura HTML base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Práctica con flex-shrink</title>
  <style>
    /* Estilos en la siguiente sección */
  </style>
</head>
<body>

  <h1 style="text-align:center;">🔽 Práctica visual con <code>flex-shrink</code></h1>

  <p style="text-align:center;">Reduce el tamaño de la ventana para ver cómo los elementos se contraen según su valor de <code>flex-shrink</code>.</p>

  <div class="container" id="container">
    <div class="item item1">Elemento 1</div>
    <div class="item item2">Elemento 2</div>
    <div class="item item3">Elemento 3</div>
  </div>

  <div class="controls">
    <label>shrink 1:
      <input type="number" id="shrink1" min="0" value="2" />
    </label>
    <label>shrink 2:
      <input type="number" id="shrink2" min="0" value="0" />
    </label>
    <label>shrink 3:
      <input type="number" id="shrink3" min="0" value="1" />
    </label>
    <button onclick="actualizarShrink()">Aplicar cambios</button>
  </div>

  <script>
    function actualizarShrink() {
      document.querySelector('.item1').style.flexShrink = document.getElementById('shrink1').value;
      document.querySelector('.item2').style.flexShrink = document.getElementById('shrink2').value;
      document.querySelector('.item3').style.flexShrink = document.getElementById('shrink3').value;
    }
  </script>

</body>
</html>

```

## 🎨 Parte 2: Estilos CSS explicados

```css
body {
  font-family: sans-serif;
  margin: 20px;
}

.container {
  display: flex;
  width: 100%;
  max-width: 600px;
  border: 2px dashed #bbb;
  padding: 10px;
  margin: auto;
  overflow: hidden;
}

/* Estilos generales de los ítems */
.item {
  flex: 1 1 auto; /* flex-grow: 1; flex-shrink: 1; flex-basis: auto */
  min-width: 50px;
  padding: 15px;
  margin: 5px;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 6px;
  box-sizing: border-box;
}

/* Colores para diferenciarlos */
.item1 { background: #42a5f5; }
.item2 { background: #66bb6a; }
.item3 { background: #ffa726; }

.controls {
  margin: 30px auto;
  max-width: 600px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.controls label {
  font-size: 14px;
}

```

## 📱 Parte 3: Comportamiento responsivo con media query

```css
@media (max-width: 480px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }

  .item {
    flex-shrink: 1;
    width: 100%;
  }
}

```

## 🧠 Qué se practica

- `flex-shrink: 2` → el ítem se encoge **más rápido** que los demás.
- `flex-shrink: 1` → comportamiento estándar (proporcional).
- `flex-shrink: 0` → el ítem **no se encoge** (puede causar overflow si el espacio es muy limitado).
- Combinación con `flex-basis` implícita (`auto`).
- Cambios visuales en tiempo real mediante JavaScript.
- Respuesta adaptable con media queries.

## 🧩 Reto extra

Agrega una clase `.no-shrink` que puedas aplicar o quitar desde un botón:

```html
<button onclick="document.querySelector('.item2').classList.toggle('no-shrink')">
  Activar/Desactivar no-shrink en Elemento 2
</button>

<style>
  .no-shrink {
    flex-shrink: 0 !important;
    background-color: #ffccbc;
  }
</style>

```

## ✅ Conclusión

Has practicado de forma guiada y visual:

- Cómo funciona `flex-shrink`
- Cómo establecer prioridades de contracción
- Cómo evitar que elementos críticos se reduzcan
- Cómo aplicar esos cambios dinámicamente
- Cómo integrar todo con un diseño responsivo

> 🧩 Combina flex-shrink con flex-grow y flex-basis para lograr un control total del layout en Flexbox.
>