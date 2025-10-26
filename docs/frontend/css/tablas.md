# Tablas en CSS3

# Funcionamiento y Utilización de Tablas en CSS3

## Introducción

Las tablas son elementos esenciales en el diseño web, ya que permiten organizar y presentar datos de manera estructurada y legible. CSS3 ofrece herramientas poderosas para estilizar y personalizar la apariencia de las tablas, lo que permite a los diseñadores crear diseños más atractivos y funcionales.

## ¿Qué son las Tablas en CSS3?

Las tablas en CSS3 son elementos HTML utilizados para organizar datos en filas y columnas. Cada tabla consta de una o más filas (`<tr>`) y columnas (`<td>` para celdas de datos y `<th>` para encabezados de columna). Las tablas se utilizan comúnmente para mostrar información tabular, como listas de precios, horarios, datos estadísticos, entre otros. CSS3 ofrece una serie de propiedades que permiten estilizar y personalizar la apariencia de las tablas para adaptarse al diseño y estilo de una página web.

## Funcionamiento de las Tablas en CSS3

Las tablas en CSS3 se pueden estilizar utilizando una combinación de propiedades específicas de CSS. A continuación, exploraremos cómo funcionan y cómo utilizar estas propiedades para crear y estilizar diferentes aspectos de las tablas:

### 1. Estilización Básica de Tablas

La estilización básica de tablas implica la modificación de propiedades como el color de fondo, el borde y el espaciado de celdas.

```css
/* Estilizar el borde y el espaciado de celdas de la tabla */
table {
  border-collapse: collapse; /* Colapsar los bordes de la tabla */
  width: 100%; /* Ancho de la tabla */
}

td,
th {
  border: 1px solid #ddd; /* Borde de las celdas */
  padding: 8px; /* Espaciado interno de las celdas */
}

th {
  background-color: #f2f2f2; /* Color de fondo de los encabezados */
}
```

### 2. Estilización de Encabezados de Tabla

Los encabezados de tabla (`<th>`) pueden estilizarse de manera diferente para distinguirlos de las celdas de datos.

```css
/* Estilizar los encabezados de tabla */
th {
  background-color: #f2f2f2; /* Color de fondo */
  font-weight: bold; /* Negrita */
  text-align: left; /* Alineación del texto */
}
```

### 3. Alternancia de Colores de Fila

Es posible alternar los colores de fondo de las filas para mejorar la legibilidad y la estética de la tabla.

```css
/* Alternar los colores de fondo de las filas */
tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### 4. Estilización de Celdas Específicas

Las celdas específicas pueden estilizarse de manera única utilizando selectores de clase o ID.

```css
/* Estilizar una celda específica */
#highlighted-cell {
  background-color: yellow;
}
```

### 5. Colocación de Bordes Específicos

Es posible colocar bordes específicos en ciertas celdas para resaltar información importante.

```css
/* Colocar un borde específico en una celda */
.highlighted {
  border-left: 5px solid red;
}
```

## Utilización de Tablas en CSS3

### 1. Tablas de Precios

Las tablas de precios son un ejemplo común de uso de tablas en una página web. Pueden estilizarse para destacar planes o características específicas.

```css
/* Estilizar una tabla de precios */
.price-table {
  border-collapse: collapse;
  width: 100%;
}

.price-table th,
.price-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.price-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.price-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### 2. Tablas de Horarios

Las tablas de horarios se utilizan para mostrar horarios de eventos, clases o servicios. Pueden estilizarse para resaltar los días y horas específicas.

```css
/* Estilizar una tabla de horarios */
.schedule-table {
  border-collapse: collapse;
  width: 100%;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.schedule-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.schedule-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### 3. Tablas de Datos Estadísticos

Las tablas de datos estadísticos se utilizan para mostrar datos numéricos o comparativos. Pueden estilizarse para resaltar los datos más importantes o para mejorar la legibilidad.

```css
/* Estilizar una tabla de datos estadísticos */
.stats-table {
  border-collapse: collapse;
  width: 100%;
}

.stats-table th,
.stats-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.stats-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.stats-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### 4. Tablas de Datos Dinámicos

En algunas aplicaciones web, las tablas se utilizan para mostrar datos dinámicos que se actualizan periódicamente. Pueden estilizarse para destacar los cambios o actualizaciones más recientes.

```css
/* Estilizar una tabla de datos dinámicos */
.dynamic-table {
  border-collapse: collapse;
  width: 100%;
}

.dynamic-table th,
.dynamic-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.dynamic-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.dynamic-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

## Conclusiones

En conclusión, las tablas en CSS3 son elementos esenciales en el diseño web, ya que permiten organizar y presentar datos de manera estructurada y legible. CSS3 ofrece una serie de propiedades y técnicas que permiten estilizar y personalizar la apariencia de las tablas para adaptarse al diseño y estilo de una página web. Al comprender cómo funcionan y cómo utilizar estas técnicas, los diseñadores pueden crear diseños más atractivos y funcionales que mejoren la experiencia del usuario en línea. Con un conocimiento sólido de las propiedades y técnicas de estilización de tablas en CSS3, es posible crear tablas que sean tanto informativas como visualmente atractivas.
