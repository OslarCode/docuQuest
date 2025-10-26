# 🧪 Actividad práctica: Distribuyendo espacio con flex-grow

## 🎯 Objetivo

Crear una fila de tarjetas con diferentes prioridades de crecimiento utilizando `flex-grow`, visualizando cómo los elementos ocupan el espacio sobrante de forma proporcional. También se practicará la integración con `flex-basis` y media queries.

## 🧰 Parte 1: HTML base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Práctica con flex-grow</title>
  <style>
    /* Aquí van los estilos (ver más abajo) */
  </style>
</head>
<body>

  <h1 style="text-align:center;">📈 Práctica interactiva con <code>flex-grow</code></h1>

  <div class="container" id="container">
    <div class="box box1">1</div>
    <div class="box box2">2</div>
    <div class="box box3">3</div>
  </div>

  <!-- Controles para modificar flex-grow -->
  <div class="controls">
    <label>flex-grow de la caja 1:
      <input type="number" id="grow1" min="0" value="1" />
    </label>
    <label>flex-grow de la caja 2:
      <input type="number" id="grow2" min="0" value="2" />
    </label>
    <label>flex-grow de la caja 3:
      <input type="number" id="grow3" min="0" value="1" />
    </label>
    <button onclick="actualizar()">Actualizar</button>
  </div>

  <script>
    function actualizar() {
      const g1 = document.getElementById('grow1').value;
      const g2 = document.getElementById('grow2').value;
      const g3 = document.getElementById('grow3').value;

      document.querySelector('.box1').style.flexGrow = g1;
      document.querySelector('.box2').style.flexGrow = g2;
      document.querySelector('.box3').style.flexGrow = g3;
    }
  </script>

</body>
</html>

```

## 🎨 Parte 2: CSS con comentarios

```css
body {
  font-family: sans-serif;
  margin: 20px;
}

.container {
  display: flex;
  width: 100%;
  height: 150px;
  border: 2px dashed #bbb;
  margin-bottom: 20px;
}

.box {
  /* Tamaño base antes de crecer */
  flex-basis: 100px;

  /* Crecimiento individual será definido dinámicamente */
  flex-grow: 1;

  margin: 5px;
  padding: 20px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 80px;
  border-radius: 6px;
}

/* Colores personalizados para diferenciarlas */
.box1 { background-color: #42a5f5; }
.box2 { background-color: #66bb6a; }
.box3 { background-color: #ffa726; }

.controls {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
}

.controls label {
  font-size: 14px;
}

```

## 📱 Parte 3: Media query responsiva

```css
@media (max-width: 600px) {
  .container {
    flex-direction: column;
    height: auto;
  }

  .box {
    flex-grow: 1;
    flex-basis: auto;
  }
}

```

## 📌 ¿Qué se está practicando?

- `flex-grow`: expansión proporcional del espacio sobrante
- `flex-basis`: tamaño inicial antes de crecer
- Control de crecimiento individual con JavaScript
- Responsividad con media queries (`flex-direction: column`)
- Diferenciación visual y práctica del crecimiento dinámico

## 🧩 Reto extra (avanzado)

Agrega un botón para **restablecer todos los `flex-grow` a 1**:

```html
<button onclick="reiniciar()">Reiniciar</button>

<script>
  function reiniciar() {
    document.getElementById('grow1').value = 1;
    document.getElementById('grow2').value = 1;
    document.getElementById('grow3').value = 1;
    actualizar();
  }
</script>

```

## ✅ Conclusión

Esta actividad te permite experimentar de manera **visual y dinámica** cómo funciona `flex-grow` y cómo se reparte el espacio dentro de un contenedor Flexbox. También has practicado:

- Cambios visuales en tiempo real con JavaScript
- Valores proporcionales y su impacto en el layout
- Uso conjunto con `flex-basis`
- Diseño responsivo con Flexbox