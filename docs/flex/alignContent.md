# Align-content: Controlando el Espaciado entre Líneas

## 📘 Introducción

En el modelo Flexbox de CSS, `align-content` es una propiedad clave para gestionar **el espacio vertical (o cruzado)** entre las **líneas** de elementos cuando hay múltiples filas o columnas. A diferencia de `align-items`, que alinea elementos individuales, `align-content` actúa sobre **todas las líneas flexibles** dentro del contenedor.

> ⚠️ Solo tiene efecto si el contenedor tiene más de una línea, es decir, si está configurado con flex-wrap: wrap.

## 🔍 ¿Qué hace `align-content`?

Controla cómo se distribuye el espacio adicional a lo largo del **eje cruzado** (vertical si los elementos están en fila, horizontal si están en columna).

### 📏 Diferencia clave:

| Propiedad       | Afecta a...                     | Ejemplo práctico                |
| --------------- | ------------------------------- | ------------------------------- |
| `align-items`   | Ítems individuales en una línea | Centrado vertical de un ítem    |
| `align-content` | Conjunto de **líneas**          | Separación entre filas de ítems |

## 🧾 Valores de `align-content` y su efecto visual

| Valor                   | Efecto                                                     |
| ----------------------- | ---------------------------------------------------------- |
| `flex-start`            | Agrupa las líneas al **inicio** del eje cruzado            |
| `flex-end`              | Agrupa las líneas al **final** del eje cruzado             |
| `center`                | Agrupa las líneas en el **centro** del contenedor          |
| `space-between`         | Espacio uniforme entre líneas, sin margen exterior         |
| `space-around`          | Espacio igual **alrededor** de cada línea                  |
| `space-evenly`          | Espacio **idéntico entre** y alrededor de todas las líneas |
| `stretch` (por defecto) | Estira las líneas para ocupar todo el espacio disponible   |

## 💡 Ejemplo base reutilizable

Todos los ejemplos usan la misma estructura, solo cambia el valor de `align-content`.

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <!-- ... -->
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    align-content: center; /* Cambia según el ejemplo */
    height: 400px;
    border: 1px solid #000;
  }

  .item {
    flex: 1 1 100px;
    height: 100px;
    margin: 5px;
    border: 1px solid red;
    box-sizing: border-box;
  }
</style>
```

## 🎨 Ejemplos visuales por valor

### 🔹 `align-content: flex-start`

Líneas agrupadas arriba, espacio abajo.

### 🔸 `align-content: flex-end`

Líneas agrupadas abajo, espacio arriba.

### 🔹 `align-content: center`

Líneas agrupadas en el centro vertical del contenedor.

### 🔸 `align-content: space-between`

Espacio repartido solo entre líneas (no arriba ni abajo).

### 🔹 `align-content: space-around`

Espacio igual arriba, abajo y entre líneas.

### 🔸 `align-content: space-evenly`

Espacio idéntico entre todas las líneas y márgenes.

### 🔹 `align-content: stretch`

Las líneas se expanden verticalmente para ocupar toda la altura.

## 🛠️ Aplicaciones prácticas

- ✅ **Galerías de imágenes**: Distribuir filas de forma uniforme.
- ✅ **Dashboards y tarjetas**: Crear diseños simétricos sin usar `grid`.
- ✅ **Listados responsivos**: Que se adapten al alto del contenedor en cualquier tamaño de pantalla.

## ✅ Conclusión

La propiedad `align-content` permite controlar **cómo se organizan las múltiples líneas** de ítems dentro de un contenedor Flexbox, ofreciendo una solución precisa para layouts adaptables. Combinada con `flex-wrap` y otras propiedades como `gap`, `justify-content` o `align-items`, puede ayudarte a construir interfaces ordenadas, limpias y modernas.

> 🎯 Dominar align-content es esencial para refinar diseños complejos y lograr una distribución visual equilibrada, especialmente en pantallas grandes o layouts que cambian dinámicamente.
