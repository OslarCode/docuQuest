# Flex-grow: Cómo distribuir el espacio sobrante

## 📘 Introducción

La propiedad `flex-grow` en Flexbox permite definir **qué tan grande puede crecer un elemento** flexible en relación con sus hermanos, **cuando hay espacio extra disponible** en el contenedor.

Es ideal para crear **layouts dinámicos y adaptables**, especialmente en diseños responsivos.

## 🔍 ¿Cómo funciona?

- El valor por defecto es `0` → el elemento **no crece**.
- Si se le asigna un valor positivo (`1`, `2`, etc.), el elemento **crecerá proporcionalmente** respecto a los otros elementos del mismo contenedor.

```css
.item {
  flex-grow: 2; /* Este ítem crecerá el doble que uno con flex-grow: 1 */
}
```

## 🧾 Valores posibles

| Valor     | Comportamiento                             |
| --------- | ------------------------------------------ |
| `0`       | No crecerá, aunque haya espacio disponible |
| `1+`      | Crecerá proporcionalmente al resto         |
| `2` o más | Crece más rápido que los demás             |

## 💡 Ejemplo 1: Crecimiento proporcional

```html
<div class="container">
  <div class="item" style="flex-grow: 1;">1</div>
  <div class="item" style="flex-grow: 2;">2</div>
</div>
```

📌 El segundo elemento ocupará **el doble del espacio libre** que el primero.

## 🧪 Código base reutilizable

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>

<style>
  .container {
    display: flex;
    width: 300px;
    border: 1px solid #000;
  }
  .item {
    background: lightblue;
    margin: 5px;
    padding: 10px;
    border: 1px solid #333;
    font-size: 18px;
    box-sizing: border-box;
  }
</style>
```

Puedes modificar los valores de `flex-grow` directamente en línea o en el CSS.

## 💡 Ejemplo 2: `flex-grow` + `flex-basis`

```css
.item {
  flex-grow: 2;
  flex-basis: 100px; /* Tamaño base antes de crecer */
}
```

📌 El elemento parte de 100px, pero puede crecer si hay espacio disponible.

## 📱 Ejemplo 3: Cambio en móviles con media queries

```css
.item {
  flex-grow: 1;
}

@media (max-width: 600px) {
  .item:nth-child(1) {
    flex-grow: 2;
  }
  .item:nth-child(2) {
    flex-grow: 1;
  }
}
```

📌 En pantallas pequeñas, puedes **priorizar el crecimiento** de ciertos elementos para mejorar la experiencia del usuario.

## 🛠️ Usos frecuentes

- ✅ **Menús de navegación** que ocupan espacio según la prioridad.
- ✅ **Grillas de contenido** que se adaptan al ancho.
- ✅ **Tarjetas o bloques** que crecen dinámicamente.
- ✅ **Dashboards** con columnas que se equilibran automáticamente.

## ✅ Conclusión

`flex-grow` es una de las claves para distribuir el espacio de forma **eficiente, limpia y controlada** en Flexbox. Su uso permite que los elementos se expandan proporcionalmente según las necesidades del diseño, **sin necesidad de medidas fijas o hacks CSS**.

> 🎯 Dominar flex-grow es esencial para construir interfaces modernas, fluidas y completamente adaptables.
