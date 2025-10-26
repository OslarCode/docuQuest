# Módulos

# Introducción a los Módulos en JavaScript: Estructurando y Organizando Código

En el desarrollo de aplicaciones web modernas, es fundamental tener una estructura de código modular y organizada para facilitar el mantenimiento, la escalabilidad y la colaboración entre desarrolladores. Los módulos en JavaScript son una característica esencial que permite dividir el código en unidades más pequeñas y reutilizables, lo que ayuda a mantener un código más limpio y modular. En este texto, exploraremos en detalle qué son los módulos en JavaScript, cómo funcionan y cómo se utilizan para organizar y estructurar el código de manera eficiente.

## ¿Qué son los Módulos en JavaScript?

En JavaScript, un módulo es un archivo independiente que encapsula un conjunto de funcionalidades relacionadas. Los módulos permiten dividir el código en unidades lógicas y reutilizables, lo que facilita la gestión y el mantenimiento del código en proyectos grandes y complejos. Cada módulo puede contener variables, funciones, clases u otros elementos de código, y puede exportar ciertas partes de su funcionalidad para que estén disponibles para otros módulos.

## Funcionamiento de los Módulos en JavaScript

### Exportación e Importación de Funcionalidades

Una de las características clave de los módulos en JavaScript es la capacidad de exportar e importar funcionalidades entre diferentes módulos. Esto se logra utilizando las palabras clave `export` e `import`.

### Exportación de Funcionalidades

Para exportar una funcionalidad desde un módulo, se utiliza la palabra clave `export`, seguida del nombre de la función, variable, clase, u otro elemento que se desea exportar. Por ejemplo:

```jsx
// módulo.js
export function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}

```

En este ejemplo, estamos exportando la función `saludar` desde el módulo `módulo.js`.

### Importación de Funcionalidades

Para importar una funcionalidad desde otro módulo, se utiliza la palabra clave `import`, seguida del nombre de la funcionalidad y la ruta del módulo. Por ejemplo:

```jsx
// main.js
import { saludar } from "./módulo.js";

console.log(saludar("Juan")); // Salida: ¡Hola, Juan!

```

En este ejemplo, estamos importando la función `saludar` desde el módulo `módulo.js` y luego llamándola en el archivo `main.js`.

### Tipos de Exportación e Importación

Existen varias formas de exportar e importar funcionalidades en JavaScript, incluyendo la exportación e importación por defecto y la exportación e importación con alias.

### Exportación e Importación por Defecto

La exportación por defecto permite exportar una sola funcionalidad como el valor predeterminado de un módulo. Esto se logra utilizando la palabra clave `export default`. Por ejemplo:

```jsx
// módulo.js
export default function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}

```

En este caso, la función `saludar` se exporta como la funcionalidad predeterminada del módulo `módulo.js`. Para importar la funcionalidad predeterminada, no es necesario utilizar llaves. Por ejemplo:

```jsx
// main.js
import saludar from "./módulo.js";

console.log(saludar("Juan")); // Salida: ¡Hola, Juan!

```

### Exportación e Importación con Alias

También es posible asignar alias a las funcionalidades exportadas e importadas utilizando la palabra clave `as`. Esto es útil cuando se desea cambiar el nombre de una funcionalidad para evitar conflictos de nombres. Por ejemplo:

```jsx
// módulo.js
export function saludar(nombre) {
  return `¡Hola, ${nombre}!`;
}
```

```jsx
// main.js
import { saludar as greet } from "./módulo.js";

console.log(greet("Juan")); // Salida: ¡Hola, Juan!
```

En este ejemplo, hemos importado la función `saludar` del módulo `módulo.js` con el alias `greet`.

## Módulos externos y librerías

👉 **Un módulo externo o librería** es simplemente **código que otra persona ya escribió** (o tú mismo antes) para hacer cosas que tú puedes usar sin tener que volver a programarlas.

Por ejemplo: en lugar de escribir tú mismo una función que formatee fechas… puedes usar una librería que ya lo hace por ti.

## 🧱 1) Hay dos formas comunes de usar librerías externas en JavaScript

1. **En el navegador** (con `<script>` o con módulos desde un CDN)
2. **En Node.js** (con `npm install` + `import` o `require`)

Vamos a ver ambas con ejemplos sencillos.

## 🌐 2) **USAR UNA LIBRERÍA EN EL NAVEGADOR** (sin instalaciones complicadas)

Supongamos que quieres usar [**Lodash**](https://lodash.com/), una librería famosa que trae muchas funciones útiles.

### 📁 Estructura del proyecto

```
/mi-proyecto
  ├─ index.html
  └─ app.js

```

### 🧾 index.html

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo librería externa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 1) Cargamos la librería Lodash desde un CDN (servidor público) -->
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

    <!-- 2) Cargamos nuestro script después -->
    <script type="module" src="./app.js"></script>
  </head>
  <body>
    <h1>Ejemplo con Lodash</h1>
    <div id="out"></div>
  </body>
</html>

```

👉 Fíjate que **no instalamos nada**. Solo enlazamos el `.js` de Lodash desde una URL pública.

### 🧠 app.js

```jsx
// Como Lodash fue cargado en el HTML antes de este script,
// podemos usar su objeto global: _
const numeros = [1, 2, 3, 4, 5];

// _.shuffle() es una función de Lodash que mezcla aleatoriamente un array
const mezcla = _.shuffle(numeros);

const $out = document.getElementById("out");
$out.textContent = `Original: ${numeros.join(", ")} | Mezclado: ${mezcla.join(", ")}`;

```

✅ **Qué pasó aquí**:

- Lodash se cargó desde Internet.
- Lodash dejó disponible un objeto global llamado `_`.
- Lo usamos directamente en nuestro código.

👉 Esto es útil cuando quieres usar librerías **rápidamente en el navegador**, sin instalaciones ni configuración especial.

## 🧰 3) **USAR UNA LIBRERÍA CON NODE.JS (NPM)**

Ahora imagina que estás trabajando en un **proyecto más profesional** con Node.js (por ejemplo con Express o Vite).

En este caso:

1. Inicializas el proyecto con npm
2. Instalas la librería
3. La importas en tu código

### 📦 Paso 1: inicializar un proyecto

Abre una carpeta vacía y en la terminal escribe:

```bash
npm init -y

```

Esto creará un archivo `package.json`.

### 📦 Paso 2: instalar la librería

Por ejemplo Lodash:

```bash
npm install lodash

```

Esto añade Lodash a `node_modules`.

### 🧠 Paso 3: importar y usar

Si tu proyecto usa módulos ES (ECMAScript), puedes escribir:

```jsx
// app.js
import _ from "lodash";

const numeros = [10, 20, 30, 40];
const mezclados = _.shuffle(numeros);

console.log("Original:", numeros);
console.log("Mezclado:", mezclados);

```

Y luego ejecutas:

```bash
node app.js

```

✅ **Qué pasó aquí**:

- NPM descargó Lodash a tu proyecto.
- `import _ from "lodash";` trajo su funcionalidad a tu archivo.
- La usaste como si fuera tuya.

👉 **IMPORTANTE**: si no tienes `"type": "module"` en tu `package.json`, en Node también podrías usar la sintaxis CommonJS:

```jsx
const _ = require("lodash");

```

## 🧠 4) Diferencia entre módulo “local” y “externo”

- **Módulo local** → es un archivo tuyo (ej. `./utils.js`) que importas con una ruta relativa.
    
    ```jsx
    import { miFuncion } from "./utils.js";
    
    ```
    
- **Módulo externo** → es una librería instalada (ej. `lodash`) o cargada desde CDN.
    
    ```jsx
    import _ from "lodash";
    
    ```
    

👉 Si usas **ruta con `./`** → estás trayendo **tus archivos**.

👉 Si usas **nombre simple (sin `./`)** → estás trayendo una **librería externa** instalada.

## 🚀 5) Otras librerías comunes que puedes usar

- 📅 [**Day.js**](https://day.js.org/) → Fechas fáciles
- 🧮 [**Lodash**](https://lodash.com/) → utilidades para arrays, strings, objetos…
- 📦 [**Axios**](https://axios-http.com/) → peticiones HTTP (muy popular)
- 🧭 [**Three.js**](https://threejs.org/) → gráficos 3D en navegador
- 🪝 [**Chart.js**](https://www.chartjs.org/) → gráficos bonitos

Todas se pueden usar:

- vía **CDN** en HTML si quieres algo rápido, o
- vía **npm install** si estás en un proyecto más grande.

## 📝 Resumen rápido

| Método | Ideal para… | Cómo se importa |
| --- | --- | --- |
| CDN + `<script>` | Probar rápido en navegador | Se usa objeto global (ej. `_`, `dayjs`) |
| `import` desde `node_modules` | Proyectos Node, Vite, React, etc. | `import ... from "lib"` |
| `require(...)` | Node con CommonJS | `const lib = require("lib")` |

## Ventajas de Utilizar Módulos en JavaScript

El uso de módulos en JavaScript ofrece una serie de ventajas importantes:

1. **Organización del Código**: Los módulos permiten dividir el código en unidades más pequeñas y cohesivas, lo que facilita la organización y el mantenimiento del código.
2. **Reutilización de Código**: Al dividir el código en módulos, es posible reutilizar funcionalidades en diferentes partes de una aplicación o incluso en diferentes proyectos.
3. **Encapsulación**: Los módulos permiten encapsular funcionalidades, lo que ayuda a evitar la contaminación del espacio global y a reducir el riesgo de colisiones de nombres.
4. **Legibilidad y Mantenibilidad**: Al dividir el código en módulos lógicos y reutilizables, se mejora la legibilidad y la mantenibilidad del código, lo que facilita la colaboración entre desarrolladores.

## Conclusiones

En resumen, los módulos en JavaScript son una característica fundamental que permite organizar y estructurar el código de manera eficiente. Al utilizar los módulos, los desarrolladores pueden dividir el código en unidades más pequeñas y reutilizables, lo que facilita la gestión, el mantenimiento y la colaboración en proyectos de desarrollo de software. Con la introducción de las importaciones y exportaciones de módulos en JavaScript, la gestión de dependencias y la estructuración del código se han vuelto mucho más simples y flexibles. Es importante comprender cómo funcionan los módulos y cómo se utilizan para aprovechar al máximo esta poderosa característica del lenguaje JavaScript.