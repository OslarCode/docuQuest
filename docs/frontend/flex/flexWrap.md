# flex-wrap: Controlando el Ajuste de Líneas

## 📘 Introducción

Uno de los puntos fuertes de **Flexbox** es su capacidad para adaptar el diseño al espacio disponible. La propiedad `flex-wrap` es clave en esta tarea: define si los elementos hijos (flex items) se colocan en una sola línea o si se ajustan automáticamente en varias. Comprenderla es esencial para desarrollar interfaces responsivas sin esfuerzo.

## 🔍 ¿Qué hace `flex-wrap`?

Controla **si los elementos hijos deben ajustarse o desbordarse** cuando no hay espacio suficiente en el contenedor.

### 🧱 Valores posibles:

| Valor                | Comportamiento                                                             |
| -------------------- | -------------------------------------------------------------------------- |
| `nowrap` _(default)_ | Todos los ítems en una sola línea, aunque se desborden                     |
| `wrap`               | Los ítems se dividen en varias líneas                                      |
| `wrap-reverse`       | Igual que `wrap`, pero las nuevas líneas se añaden antes, en orden inverso |

## 💡 Ejemplos prácticos

### 1. `flex-wrap: nowrap` (por defecto)

```html
<div class="container">
  <div class="item">Item 1</div>
  <!-- ... -->
</div>

<style>
  .container {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  .item {
    flex: 0 0 200px;
    padding: 20px;
    border: 1px solid red;
  }
</style>
```

📌 Todos los ítems se mantienen en una sola línea y pueden desbordarse si no hay espacio.

### 2. `flex-wrap: wrap`

```html
<div class="container">
  <div class="item">Item 1</div>
  <!-- ... -->
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 0 0 200px;
    padding: 20px;
    border: 1px solid red;
  }
</style>
```

📌 Los ítems se ajustan automáticamente en varias líneas al llegar al límite del contenedor.

### 3. `flex-wrap: wrap-reverse`

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

📌 Igual que `wrap`, pero las nuevas líneas se colocan antes que las anteriores.

## 🧪 Combinaciones útiles

### 🔄 `flex-flow`: combinación de `flex-direction` y `flex-wrap`

```css
.container {
  display: flex;
  flex-flow: row wrap; /* row + wrap */
}
```

📌 Menos código, más claridad.

### 🔧 `justify-content` + `flex-wrap`

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
```

📌 Distribuye ítems en varias líneas y alinea horizontalmente.

### 📏 `align-content`: controla espacio vertical entre líneas

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: 400px;
}
```

📌 Útil cuando hay varias filas de ítems y queremos controlar su separación vertical.

### 🎯 `order`: cambia el orden visual

```css
.item:nth-child(1) {
  order: 2;
}
.item:nth-child(3) {
  order: 1;
}
```

📌 Puedes reorganizar visualmente los ítems sin cambiar el HTML.

## ✅ Conclusión

La propiedad `flex-wrap` permite crear **layouts fluidos, ordenados y responsivos**, adaptándose al ancho del contenedor y a la cantidad de contenido. Su integración con otras propiedades como `flex-flow`, `justify-content`, `align-content` y `order` ofrece un control total sobre el comportamiento y disposición de los elementos.

> 🔧 Dominar flex-wrap significa desbloquear el verdadero potencial de Flexbox para crear diseños adaptables con mínimo esfuerzo y máximo control.
