# Flex-basis: Definiendo el tamaño inicial de un elemento flexible

## 📘 ¿Qué es `flex-basis`?

La propiedad `flex-basis` especifica el **tamaño base** de un elemento dentro de un contenedor Flexbox **antes** de aplicar el crecimiento (`flex-grow`) o la reducción (`flex-shrink`). Es decir, **define cuánto espacio debería ocupar inicialmente** cada ítem.

> 🎯 Es como decir: “Este elemento debería medir esto... si hay espacio suficiente”.

## 🧠 ¿Cómo funciona?

- Si se usa `flex-basis`, su valor **tiene prioridad sobre `width` o `height`**.
- Afecta la distribución inicial del espacio **antes de cualquier crecimiento o contracción**.
- Se puede usar con valores como `px`, `%`, `em`, `auto`, etc.

## 🧾 Valores comunes

| Valor          | Comportamiento                                                 |
| -------------- | -------------------------------------------------------------- |
| `auto`         | Usa el tamaño del contenido o el definido por `width`/`height` |
| `150px`, `30%` | Establece un tamaño base fijo                                  |
| `0`            | Elimina el tamaño base → útil junto con `flex-grow`            |

## 💡 Ejemplo 1: Tamaño base fijo

```css
.item {
  flex-basis: 150px;
}
```

📌 Cada ítem inicia con 150px de ancho (u alto, dependiendo de la dirección del eje).

### 🧪 Código completo:

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
</div>

<style>
  .container {
    display: flex;
    width: 400px;
    border: 1px solid black;
  }
  .item {
    flex-basis: 150px;
    background: lightblue;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
```

## 💡 Ejemplo 2: Tamaño base con porcentaje

```css
.item {
  flex-basis: 30%;
}
```

📌 Cada ítem tomará inicialmente el **30% del ancho del contenedor**.

## 💡 Ejemplo 3: `flex-basis: auto`

```css
.item {
  flex-basis: auto;
}
```

📌 El navegador calcula el tamaño según el **contenido interno** o los estilos como `width`.

## 📐 Comparación visual

```css
.item {
  flex: 1 1 200px; /* grow | shrink | basis */
}
```

Aquí:

- `1`: el elemento puede crecer
- `1`: también puede reducirse
- `200px`: será su tamaño inicial

Este shorthand equivale a:

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 200px;
```

## 🛠️ Casos de uso comunes

- ✅ **Cards o bloques con tamaño base personalizado**.
- ✅ **Grillas con anchos proporcionales al contenedor (`%`)**.
- ✅ **Componentes con contenido dinámico que se ajustan automáticamente**.

## ✅ Conclusión

`flex-basis` es una propiedad **clave para establecer el punto de partida visual** de cada ítem en Flexbox. Combinada con `flex-grow` y `flex-shrink`, te permite diseñar interfaces completamente adaptativas, fluidas y controladas.

> 🧩 Piensa en flex-basis como el “mínimo preferido” de cada ítem, antes de que entren en juego las reglas de expansión o contracción.
