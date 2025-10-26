# Align-self en Flexbox: Alineación individual en el eje cruzado

## 📘 ¿Qué es `align-self`?

La propiedad `align-self` permite **sobrescribir la alineación predeterminada** de un solo elemento dentro de un contenedor Flexbox, sin afectar a los demás. Es útil cuando quieres **alinear de forma diferente** un ítem puntual, mientras los otros siguen la regla general definida por `align-items`.

> 🧠 Se aplica en el eje cruzado: vertical si flex-direction: row, u horizontal si flex-direction: column.

## 🔍 ¿Cómo funciona?

- `align-self` **anula** el valor de `align-items` **solo para un elemento específico**.
- Acepta los mismos valores que `align-items`.
- Es compatible con media queries para alineaciones responsivas.

## 🧾 Valores comunes de `align-self`

| Valor        | Comportamiento                                                         |
| ------------ | ---------------------------------------------------------------------- |
| `auto`       | Usa el valor heredado de `align-items` (por defecto)                   |
| `flex-start` | Alinea al inicio del eje cruzado                                       |
| `flex-end`   | Alinea al final del eje cruzado                                        |
| `center`     | Centra el ítem en el eje cruzado                                       |
| `baseline`   | Alinea con la línea de base del texto                                  |
| `stretch`    | Estira el ítem para llenar el eje cruzado (default si sin altura fija) |

## 🧪 Ejemplo base reutilizable

```html
<div class="container">
  <div class="item">Item 1</div>
  <div class="item special">Item 2</div>
  <div class="item">Item 3</div>
</div>

<style>
  .container {
    display: flex;
    align-items: center; /* Alineación global */
    height: 300px;
    border: 1px solid #000;
  }
  .item {
    padding: 20px;
    margin: 10px;
    background: lightblue;
    border: 1px solid #333;
  }
  .special {
    align-self: flex-start; /* Alineación individual */
  }
</style>
```

📌 El segundo ítem se alinea al inicio, ignorando el `align-items: center`.

## 💡 Ejemplo 2: Alineación con `baseline`

```css
.item:nth-child(2) {
  align-self: baseline;
}
```

📌 Útil cuando los elementos tienen diferentes tamaños de texto y se desea **alinear por la base tipográfica**.

## 📱 Ejemplo 3: Alineación adaptable con media queries

```css
@media (max-width: 600px) {
  .item:nth-child(2) {
    align-self: flex-start;
  }
}
```

📌 Cambia la alineación solo en móviles. Muy útil para **layouts adaptativos**.

## 🛠️ Casos de uso comunes

- ✅ **Menús o botones individuales** que deben sobresalir visualmente.
- ✅ **Celdas de tabla o tarjetas** que requieren alineación especial.
- ✅ **Diseños adaptativos** donde algunos elementos cambian de comportamiento en diferentes resoluciones.

## ✅ Conclusión

`align-self` es una herramienta potente para obtener **alineaciones precisas y personalizadas** dentro de Flexbox. Permite un mayor control visual sin alterar el comportamiento del resto de los elementos. Combinado con media queries, se vuelve ideal para **interfaces móviles y accesibles**.

> 🧩 Piensa en align-self como un comodín para romper la alineación global cuando sea necesario.
