# Flexbox (CSS Flexible Box Layout)

## 🧭 Introducción

Flexbox, abreviatura de _Flexible Box Layout_, es un sistema de diseño moderno en CSS que facilita la alineación, el espaciado y la distribución de elementos dentro de un contenedor. A diferencia de métodos más antiguos como `float` o `inline-block`, Flexbox permite crear interfaces dinámicas y adaptables con menos código y mayor control.

Este modelo trabaja organizando los elementos en **una sola dimensión** (ya sea en fila o en columna), lo que lo hace ideal para componentes como barras de navegación, tarjetas, menús, formularios o cualquier grupo de elementos que necesite ordenarse de manera flexible.

## 🔧 Elementos Clave de Flexbox

### 📦 El Contenedor Flex

Para activar Flexbox, se aplica `display: flex` (o `inline-flex`) al elemento contenedor. Esto convierte a sus hijos directos en elementos flexibles.

```css
.container {
  display: flex;
}
```

### 📐 Propiedades del Contenedor

| Propiedad         | Función                                                                       |
| ----------------- | ----------------------------------------------------------------------------- |
| `flex-direction`  | Define el eje principal: `row`, `row-reverse`, `column`, `column-reverse`     |
| `flex-wrap`       | Permite o impide el ajuste de los elementos: `nowrap`, `wrap`, `wrap-reverse` |
| `flex-flow`       | Shorthand para `flex-direction` y `flex-wrap`                                 |
| `justify-content` | Alinea los ítems sobre el eje principal                                       |
| `align-items`     | Alinea los ítems sobre el eje cruzado (transversal)                           |
| `align-content`   | Alinea múltiples líneas si hay `wrap`                                         |

### 🔩 Propiedades de los Flex Items

Estas propiedades se aplican a los hijos directos del contenedor:

| Propiedad     | Función                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `order`       | Cambia el orden visual de los elementos                                  |
| `flex-grow`   | Controla cuánto puede crecer un ítem en proporción a los demás           |
| `flex-shrink` | Controla cuánto puede encogerse un ítem                                  |
| `flex-basis`  | Establece el tamaño inicial del ítem antes del reparto flexible          |
| `flex`        | Atajo para `flex-grow`, `flex-shrink` y `flex-basis` (`flex: 1 0 100px`) |
| `align-self`  | Alinea individualmente un ítem (anula `align-items` del contenedor)      |

## 🧭 Comprendiendo los Ejes

- **Eje principal (main axis)**: definido por `flex-direction` (`row` = horizontal, `column` = vertical).
- **Eje cruzado (cross axis)**: perpendicular al eje principal.

Visualizar correctamente estos ejes es esencial para entender cómo se distribuyen y alinean los ítems.

## 📈 Algoritmo de Distribución en Flexbox

Flexbox aplica un proceso en dos fases:

1. **Flexing (Distribución)**

   Calcula el espacio disponible y lo reparte según `flex-grow`, `flex-shrink`, y `flex-basis`.

2. **Positioning (Alineación)**

   Aplica `justify-content`, `align-items` y `align-content` para colocar los elementos.

## 💡 Ejemplo Básico

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.container {
  display: flex;
  justify-content: space-around; /* distribución horizontal */
  align-items: center; /* alineación vertical */
  height: 300px;
  border: 2px solid #333;
}

.item {
  width: 100px;
  height: 100px;
  background-color: #ff5733;
}
```

🔎 Este ejemplo crea una fila horizontal centrada con tres cajas, distribuidas equitativamente con espacio alrededor (`space-around`).

## 🧠 Áreas que suelen confundir

1. **Ejes principales y secundarios**

   Cambian según `flex-direction`. La visualización mental puede resultar difícil al principio.

2. **Interacción entre `flex-grow`, `shrink` y `basis`**

   Su combinación afecta la distribución de espacio. Conviene experimentar con distintos valores.

3. **`align-content` vs `align-items`**
   - `align-items`: actúa sobre los ítems en una sola línea.
   - `align-content`: actúa sobre el conjunto de líneas (cuando hay `wrap`).

## 🧪 Sugerencia práctica para el aprendizaje

Experimenta con este contenedor editable:

```html
<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 10px;
    border: 1px dashed #999;
    padding: 20px;
  }

  .item {
    flex: 1 1 150px; /* grow, shrink, basis */
    background: #ccc;
    padding: 20px;
    text-align: center;
  }
</style>

<div class="container">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>
```

🎯 Cambia los valores de `flex`, `justify-content`, `align-items` en el inspector del navegador y observa el efecto.

## 🧮 Comparación rápida con Grid

| Característica  | Flexbox                 | Grid                       |
| --------------- | ----------------------- | -------------------------- |
| Dimensión       | Unidimensional          | Bidimensional              |
| Uso ideal       | Distribución de ítems   | Diseño completo de layout  |
| Control por eje | Principal y transversal | Fila y columna simultáneos |

## ✅ Conclusión

Flexbox es una herramienta poderosa y esencial en el diseño web moderno. Al dominarlo, podrás:

- Centrar elementos con facilidad
- Reordenar visualmente ítems sin alterar el HTML
- Crear diseños adaptables con pocas líneas de código
