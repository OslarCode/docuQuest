# Elementos básicos del modelo relacional

## 2.1. Las tablas: estructuras, no listas caóticas

En el modelo relacional, la **tabla** es la unidad estructural fundamental.

No es una lista cualquiera: es **una representación matemática de una relación**.

Cada tabla debe tener:

- Un **nombre único**.
- Un conjunto de **columnas (atributos)** que definen el tipo de datos.
- Un conjunto de **filas (tuplas)** que representan instancias de esa relación.

Ejemplo conceptual (tabla `Producto`):

| id_producto | nombre      | precio | stock |
| ----------- | ----------- | ------ | ----- |
| 1           | Teclado     | 20.00  | 15    |
| 2           | Ratón       | 10.00  | 30    |
| 3           | Monitor 24" | 120.00 | 5     |

Cada **fila** representa un producto concreto.

Cada **columna** representa una propiedad bien definida.

**Importante:**

En el modelo relacional:

- No hay orden garantizado de filas ni columnas.
- Cada fila debe ser única en su clave.
- El orden visual no significa nada para el motor.

## 2.2. Las columnas: atributos y dominios

Las **columnas** no solo tienen nombre, también tienen:

- Un **dominio**: el conjunto de valores permitidos.
- Una **restricción semántica**: qué representan.

Ejemplo:

Columna `precio` podría tener un dominio numérico positivo (por ejemplo, DECIMAL).

Columna `nombre` pertenece a un dominio de texto limitado.

Esto evita errores como:

- Introducir texto en una columna que espera un número.
- Guardar precios negativos.
- Duplicar tipos incompatibles.

Por eso, en un buen diseño relacional, **los dominios se definen con cuidado**, no se dejan “abiertos”.

## 2.3. Las filas: instancias de la relación

Cada **fila (tupla)** representa una **instancia única** del concepto modelado.

Si tienes una tabla `Cliente`, cada fila es un cliente distinto.

Ejemplo:

| id_cliente | nombre | correo                                      |
| ---------- | ------ | ------------------------------------------- |
| 1          | Ana    | [ana@example.com](mailto:ana@example.com)   |
| 2          | Luis   | [luis@example.com](mailto:luis@example.com) |
| 3          | Sara   | [sara@example.com](mailto:sara@example.com) |

Cada fila está definida de forma precisa y verificable.

Si duplicas una fila completa sin control… ya rompiste una de las bases del modelo: **unicidad de instancias**.

## 2.4. Claves: identidad y consistencia

En el modelo relacional **toda tabla debe tener una clave primaria** que identifique unívocamente cada fila.

Esta clave es **la identidad lógica** de la instancia.

Tipos de claves más comunes:

- **Clave primaria (PK)**: la identidad única de la fila.
  Ej: `id_cliente`.
- **Clave alternativa (AK)**: otra columna que también podría identificar (por ejemplo, un `correo` único).
- **Clave compuesta**: combinación de columnas que juntas identifican una fila única.
  Ej: (id_producto, id_pedido) en una tabla de detalle de pedidos.

Ejemplo:

| id_cliente (PK) | correo                                      | nombre |
| --------------- | ------------------------------------------- | ------ |
| 1               | [ana@example.com](mailto:ana@example.com)   | Ana    |
| 2               | [luis@example.com](mailto:luis@example.com) | Luis   |

Aquí `id_cliente` es la PK. Si alguien intenta insertar otra fila con `id_cliente = 1`, debe fallar.

**Esto no es un capricho:** sin clave, no puedes relacionar tablas de forma segura.

## 2.5. Valores nulos (NULL): ausencia, no cero

Un **valor NULL** no es “0” ni “cadena vacía”.

Significa literalmente: _“valor desconocido o no aplicable”_.

Ejemplo:

| id_cliente | nombre | telefono  |
| ---------- | ------ | --------- |
| 1          | Ana    | 611000000 |
| 2          | Luis   | NULL      |

Luis no tiene teléfono registrado. Esto no es un error, es un estado válido que hay que manejar con cuidado.

Muchos principiantes caen en este error: confundir NULL con “vacío”.

Esto puede llevar a consultas incorrectas y bugs difíciles de rastrear.

## 2.6. Ejercicio práctico guiado — Representar relaciones con estructuras planas

Este ejercicio sigue siendo agnóstico de motor, usando archivos CSV para reforzar **los conceptos de tabla, fila, columna, clave y NULL**.

### Estructura de carpetas:

```
proyecto-relacional/
│
├── datos/
│   ├── clientes.csv
│   ├── productos.csv
│   ├── pedidos.csv
│
├── scripts/
│   └── claves.js
└── README.md

```

### `clientes.csv`:

```
id_cliente,nombre,correo,telefono
1,Ana,ana@example.com,611000000
2,Luis,luis@example.com,
3,Sara,sara@example.com,612000000

```

Nota el valor vacío en la columna `telefono` de Luis: eso representa `NULL`.

### `productos.csv`:

```
id_producto,nombre,precio
1,Teclado,20.00
2,Ratón,10.00
3,Monitor 24",120.00

```

### `pedidos.csv`:

```
id_pedido,id_cliente,id_producto,cantidad
A001,1,1,2
A002,1,3,1
A003,2,2,4

```

## Código ejemplo `claves.js` (JavaScript)

Vamos a:

1. Leer los tres CSV.
2. Verificar que no haya duplicados en las claves primarias.
3. Validar que todos los pedidos referencian clientes y productos existentes.

```jsx
import fs from "fs";

function leerCSV(ruta) {
  const data = fs.readFileSync(ruta, "utf-8").trim();
  const [cabecera, ...filas] = data.split("\n");
  const campos = cabecera.split(",");
  return filas.map((fila) => {
    const valores = fila.split(",");
    return Object.fromEntries(valores.map((v, i) => [campos[i], v]));
  });
}

const clientes = leerCSV("./datos/clientes.csv");
const productos = leerCSV("./datos/productos.csv");
const pedidos = leerCSV("./datos/pedidos.csv");

// 1. Verificar duplicados en claves primarias
function verificarClaveUnica(datos, campoClave) {
  const claves = new Set();
  for (const fila of datos) {
    if (claves.has(fila[campoClave])) {
      console.error(
        `❌ Duplicado detectado en ${campoClave}: ${fila[campoClave]}`
      );
    } else {
      claves.add(fila[campoClave]);
    }
  }
}

verificarClaveUnica(clientes, "id_cliente");
verificarClaveUnica(productos, "id_producto");
verificarClaveUnica(pedidos, "id_pedido");

// 2. Validar integridad de referencias
const idsClientes = new Set(clientes.map((c) => c.id_cliente));
const idsProductos = new Set(productos.map((p) => p.id_producto));

for (const pedido of pedidos) {
  if (!idsClientes.has(pedido.id_cliente)) {
    console.error(
      `❌ Pedido ${pedido.id_pedido} referencia un cliente inexistente`
    );
  }
  if (!idsProductos.has(pedido.id_producto)) {
    console.error(
      `❌ Pedido ${pedido.id_pedido} referencia un producto inexistente`
    );
  }
}

console.log("Verificación completada");
```

**Salida esperada (si todo está bien)**:

```
Verificación completada

```

Lo que hiciste manualmente aquí es:

- Definir **claves primarias** (sin duplicados).
- Usar **claves foráneas** (referencias entre tablas).
- Manejar **valores NULL** correctamente.

Esto es exactamente lo que un motor relacional hace por ti cuando defines la estructura correctamente.

## 2.7. Buenas prácticas en la definición de elementos básicos

- Define siempre una clave primaria clara y estable.
- Evita claves que cambien con el tiempo (por ejemplo, correos).
- Usa NULL solo cuando signifique realmente “desconocido” o “no aplica”.
- Usa nombres de columnas consistentes (ej. `id_cliente` en todas las tablas).
- Mantén los dominios de datos coherentes: no mezcles tipos.

## Errores comunes de principiantes

- Usar el nombre del usuario como clave → cambia con el tiempo.
- Dejar columnas “abiertas” → datos inconsistentes.
- No usar NULL correctamente → falsas igualdades.
- Repetir información en múltiples tablas → duplicidad y caos.
