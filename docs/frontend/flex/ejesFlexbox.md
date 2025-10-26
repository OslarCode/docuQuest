# Ejes en Flexbox: Eje Principal y Eje Secundario

## 📘 Introducción

Una de sus características clave es el uso de **dos ejes de referencia**: el **eje principal (main axis)** y el **eje secundario (cross axis)**. Estos ejes definen cómo se colocan y alinean los elementos dentro del contenedor flex, y comprenderlos es esencial para dominar Flexbox.

## 🧱 1. ¿Qué son el Eje Principal y el Eje Secundario?

### 🔹 Eje Principal (`main axis`)

Es la dirección en la que se distribuyen los elementos hijos de un contenedor `flex`.

- `flex-direction: row` → horizontal (izquierda a derecha)
- `flex-direction: row-reverse` → horizontal (derecha a izquierda)
- `flex-direction: column` → vertical (de arriba hacia abajo)
- `flex-direction: column-reverse` → vertical (de abajo hacia arriba)

🔍 **Ejemplo básico:**

```css
.container {
  display: flex;
  flex-direction: row; /* Eje principal horizontal */
}
```

### 🔸 Eje Secundario (`cross axis`)

Es perpendicular al eje principal y define la dirección de alineación secundaria.

- Si el eje principal es horizontal (`row`), el eje secundario será vertical.
- Si el eje principal es vertical (`column`), el eje secundario será horizontal.

🔍 Se controla con propiedades como `align-items` y `align-content`.

## ⚙️ 2. Propiedades Relacionadas con el Eje Principal

### `flex-direction`: dirección del eje principal

```css
.container {
  display: flex;
  flex-direction: row; /* Alternativas: column, row-reverse, column-reverse */
}
```

### `justify-content`: distribución en el eje principal

```css
.container {
  display: flex;
  justify-content: space-between; /* Otras opciones: flex-start, center, space-around, space-evenly */
}
```

### 💡 Ejemplo completo:

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid #000;
  }
  .item {
    padding: 20px;
    border: 1px solid red;
  }
</style>
```

## 🧩 3. Propiedades del Eje Secundario

### `align-items`: alineación de elementos en el eje secundario

Valores comunes:

- `flex-start`
- `center`
- `flex-end`
- `stretch` (valor por defecto)
- `baseline`

🔍 Útil para centrar contenido verticalmente cuando `flex-direction: row`.

```css
.container {
  display: flex;
  align-items: center;
  height: 200px;
}
```

### `align-content`: distribución entre líneas múltiples en el eje secundario

Aplica solo cuando hay **varias filas o columnas**, usando `flex-wrap`.

Valores comunes:

- `space-between`
- `space-around`
- `stretch`
- `center`

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  height: 400px;
}
```

## 🧪 4. Ejemplo Combinado (Ambos Ejes en Acción)

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between; /* Distribución horizontal */
    align-items: center; /* Alineación vertical de ítems */
    align-content: space-around; /* Distribución entre líneas */
    height: 500px;
    border: 1px solid #000;
  }
  .item {
    flex: 1 1 150px;
    padding: 20px;
    border: 1px solid red;
    text-align: center;
  }
</style>
```

## 🧠 Conclusión

Comprender los conceptos de **eje principal y eje secundario** en Flexbox es esencial para crear diseños precisos, responsivos y bien alineados. Mientras el eje principal organiza la dirección de los elementos (`flex-direction` y `justify-content`), el eje secundario permite controlar su alineación vertical u horizontal (`align-items`, `align-content`). Este enfoque es mucho más intuitivo y potente en comparación con el modelo tradicional de CSS.
