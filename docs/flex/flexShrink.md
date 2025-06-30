# Flex-shrink: Controlando la contracción de elementos

## 📘 ¿Qué es `flex-shrink`?

`flex-shrink` define **cuánto puede reducirse un elemento** flexible cuando **no hay suficiente espacio** en el contenedor. Es una herramienta esencial para evitar desbordamientos y crear diseños responsivos.

> 🎯 A diferencia de flex-grow, que permite expandir elementos, flex-shrink controla la capacidad de contraerse.

## 🧠 ¿Cómo funciona?

- Todos los elementos flexibles tienen por defecto `flex-shrink: 1`.
- Cuanto **mayor el valor**, **más se reducirá** el elemento cuando el espacio sea escaso.
- Si `flex-shrink: 0`, el elemento **nunca se encogerá** (puede provocar overflow si no cabe).

## 🧾 Valores comunes

| Valor | Comportamiento                                |
| ----- | --------------------------------------------- |
| `0`   | El elemento **no se encoge** nunca            |
| `1`   | (por defecto) Se encoge de forma proporcional |
| `>1`  | Se encoge **más rápido** que otros elementos  |

## 🧪 Ejemplo base reutilizable

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item no-shrink">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
  .container {
    display: flex;
    width: 300px;
    border: 1px solid black;
  }
  .item {
    flex: 1 1 auto; /* flex-grow: 1; flex-shrink: 1; flex-basis: auto */
    background: lightblue;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .no-shrink {
    flex-shrink: 0; /* Este no se encogerá */
  }
</style>
```

📌 Aunque el espacio sea limitado, el elemento `.no-shrink` **mantendrá su tamaño**.

## 💡 Ejemplo con prioridades de reducción

```css
.item:nth-child(1) {
  flex-shrink: 2;
} /* Se encoge más rápido */
.item:nth-child(2) {
  flex-shrink: 0;
} /* No se encoge nunca */
.item:nth-child(3) {
  flex-shrink: 1;
} /* Valor estándar */
```

✅ Esto permite dar **prioridad de espacio visual** a ciertos elementos.

## 📱 Ejemplo adaptativo con media queries

```css
@media (max-width: 600px) {
  .item:first-child {
    flex-shrink: 2;
  }
  .item:nth-child(2) {
    flex-shrink: 0;
  }
}
```

📌 En pantallas pequeñas puedes evitar que botones, menús u otros elementos críticos se reduzcan.

## 🛠️ Casos de uso comunes

- ✅ **Botones o etiquetas importantes** que no deben encogerse nunca.
- ✅ **Diseños fluidos** que respetan jerarquía visual.
- ✅ **Dashboards o formularios** donde ciertos campos deben mantener su tamaño.

## ✅ Conclusión

La propiedad `flex-shrink` es fundamental para el diseño web moderno. Permite que los elementos **se adapten a pantallas pequeñas** sin sacrificar usabilidad ni romper el diseño.

> 🧩 Cuando se combina con flex-grow y flex-basis, flex-shrink te da el control total sobre la adaptabilidad de tus componentes.
