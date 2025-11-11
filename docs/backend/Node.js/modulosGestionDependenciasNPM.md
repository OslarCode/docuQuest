# Módulos y gestión de dependencias con NPM

## ¿Qué es un módulo en Node.js?

Cuando programas en Node.js, lo más habitual no es escribir todo el código en un único archivo. A medida que los proyectos crecen, dividir la lógica en partes reutilizables se vuelve imprescindible. A eso lo llamamos “modularizar”.
Node.js permite trabajar fácilmente con módulos, que no son más que archivos de JavaScript que exportan y reutilizan funcionalidades.

Desde sus primeras versiones, Node ha ofrecido soporte para módulos mediante el sistema **CommonJS**, que utiliza `require()` para importar y `module.exports` para exportar.
Sin embargo, el estándar actual de JavaScript define otra forma más moderna: los **ES Modules (ESM)**, que usan `import` y `export`, igual que en el navegador.

Hoy en día, Node.js admite ambos sistemas, aunque es importante conocer sus diferencias para usarlos correctamente según el caso.

---

## CommonJS: el sistema tradicional

Imagina que tienes un archivo llamado `saludos.js` con una función para saludar:

```js
// saludos.js
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

module.exports = saludar;
```

Y luego quieres reutilizarla desde otro archivo:

```js
// app.js
const saludar = require("./saludos");
console.log(saludar("Laura"));
```

CommonJS carga los módulos de forma **sincrónica**, por eso fue tan útil para el backend, donde no hay bloqueos visibles para el usuario. Este sistema sigue funcionando y es compatible con millones de paquetes existentes en NPM.

---

## ES Modules: la forma moderna y compatible con el navegador

A partir de Node.js 12 (y de forma estable desde Node.js 14), se incorporó soporte completo para **ES Modules (ESM)**, el mismo sistema que usa JavaScript en los navegadores modernos.
Para usarlo, debes indicar a Node.js que el proyecto trabaja con módulos ESM. Esto se hace añadiendo `"type": "module"` dentro del `package.json`.

Por ejemplo:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module"
}
```

Una vez activado, podrás escribir módulos con `export` y `import`:

```js
// saludos.js
export function saludar(nombre) {
  return `Hola, ${nombre}`;
}

// También se puede exportar por defecto
export default function despedir(nombre) {
  return `Adiós, ${nombre}`;
}
```

Y luego importarlos así:

```js
// app.js
import { saludar } from "./saludos.js";
import despedir from "./saludos.js";

console.log(saludar("Laura"));
console.log(despedir("Laura"));
```

La principal diferencia es que **ES Modules usa la palabra clave `import/export` y requiere la extensión `.js` explícita** en las rutas locales.
Además, **las importaciones son evaluadas de forma asíncrona**, lo que permite optimizar la carga del código.

---

## Diferencias prácticas entre CommonJS y ES Modules

| Característica | CommonJS (`require`)         | ES Modules (`import`)                                       |
| -------------- | ---------------------------- | ----------------------------------------------------------- |
| Sintaxis       | `const x = require("...")`   | `import x from "..."`                                       |
| Exportaciones  | `module.exports` o `exports` | `export` / `export default`                                 |
| Evaluación     | Sincrónica                   | Asíncrona                                                   |
| Archivos       | `.js` por defecto            | Requiere `.js` explícito (en rutas locales)                 |
| Compatibilidad | Amplia en NPM (histórica)    | Moderna, igual que en navegador                             |
| Activación     | Por defecto en Node.js       | Requiere `"type": "module"` en `package.json` o usar `.mjs` |

En proyectos nuevos, especialmente si también trabajas con frontend, **ES Modules** es la opción más coherente y estándar.
Si trabajas con librerías antiguas o proyectos donde ya se usa CommonJS, es completamente válido seguir con `require()`.

---

## ¿Qué es NPM y para qué sirve?

NPM es el gestor de paquetes de Node.js. Puedes imaginarlo como una enorme biblioteca donde miles de desarrolladores han publicado funciones y herramientas que tú puedes instalar y usar en tus proyectos.
Si alguna vez has querido enviar un correo, generar PDFs, crear un servidor web o conectarte a una base de datos, probablemente exista un paquete en NPM que ya lo hace por ti.

Para comenzar a usar NPM en un proyecto, solo necesitas inicializarlo ejecutando este comando en la raíz de tu directorio:

```bash
npm init -y
```

Esto crea un archivo **package.json**, que actúa como el “carnet de identidad” de tu proyecto.
Allí se registran las dependencias, scripts y metadatos como el nombre o la versión del proyecto.

Por ejemplo, si quieres instalar una biblioteca como **chalk**, que sirve para colorear textos en la terminal, puedes hacer lo siguiente:

```bash
npm install chalk
```

Y luego usarla (dependiendo del tipo de módulo):

**Con CommonJS:**

```js
const chalk = require("chalk");
console.log(chalk.green("Texto en verde"));
```

**Con ES Modules:**

```js
import chalk from "chalk";
console.log(chalk.green("Texto en verde"));
```

---

## Explorando el archivo package.json

El archivo **package.json** no solo lista los paquetes que usas, también te permite definir scripts personalizados para automatizar tareas.
Por ejemplo, puedes añadir un script llamado `"iniciar"` que ejecute tu app principal:

```json
"scripts": {
  "iniciar": "node app.js"
}
```

Y luego ejecutarlo desde la terminal con:

```bash
npm run iniciar
```

También puedes definir scripts para pruebas, compilaciones, o formateo de código.
Este archivo es fundamental para mantener organizado tu entorno, sobre todo cuando trabajas en equipo o despliegas en servidores.

---

## Creando tus propios módulos reutilizables

No todo en NPM tiene que venir de fuera.
Tú mismo puedes crear tus propios módulos locales para organizar tu código o compartirlo con otros proyectos.

Por ejemplo, supón que estás construyendo una pequeña app de notas.
Puedes crear un módulo `notas.js` que gestione las funciones principales:

**CommonJS:**

```js
// notas.js
function crearNota(titulo, contenido) {
  return {
    titulo,
    contenido,
    fecha: new Date().toISOString(),
  };
}

module.exports = { crearNota };
```

**ES Modules:**

```js
// notas.js
export function crearNota(titulo, contenido) {
  return {
    titulo,
    contenido,
    fecha: new Date().toISOString(),
  };
}
```

Y usarlo desde el archivo principal:

**CommonJS:**

```js
const { crearNota } = require("./notas");
const miNota = crearNota("Recordatorio", "Estudiar Node.js");
console.log(miNota);
```

**ES Modules:**

```js
import { crearNota } from "./notas.js";
const miNota = crearNota("Recordatorio", "Estudiar Node.js");
console.log(miNota);
```

De esta forma, tu código se mantiene limpio, legible y modular.

---

## Dependencias normales y de desarrollo

Cuando instalas paquetes con NPM, puedes diferenciarlos en dos grupos:

- **Dependencias normales**: las que tu aplicación necesita para funcionar en producción.
- **Dependencias de desarrollo**: herramientas que solo usas mientras desarrollas (como compiladores, linters o nodemon).

Para instalar una dependencia de desarrollo:

```bash
npm install nodemon --save-dev
```

Esto hace que el paquete se registre en la sección `devDependencies` del `package.json`.
Así, si despliegas tu proyecto en producción, esas dependencias no se instalan si no son necesarias.

---

## Proyecto práctico: Generador de notas con formato de colores

Vamos a cerrar este módulo con un ejemplo que combine todo lo aprendido.

Crearemos un pequeño generador de notas desde consola que reciba un título y un contenido, y devuelva la nota con colores.

1. Crea una carpeta `proyecto-notas/`
2. Ejecuta `npm init -y`
3. Instala **chalk** para los colores:

   ```bash
   npm install chalk
   ```

### Versión CommonJS

```js
// notas.js
function crearNota(titulo, contenido) {
  return {
    titulo,
    contenido,
    fecha: new Date().toLocaleString(),
  };
}

module.exports = { crearNota };

// index.js
const chalk = require("chalk");
const { crearNota } = require("./notas");

const titulo = process.argv[2];
const contenido = process.argv[3];

if (!titulo || !contenido) {
  console.log(chalk.red("Debes proporcionar un título y contenido"));
  process.exit();
}

const nota = crearNota(titulo, contenido);
console.log(chalk.green.bold("Nota creada:"));
console.log(chalk.blue("Título:"), nota.titulo);
console.log(chalk.yellow("Contenido:"), nota.contenido);
console.log(chalk.gray("Fecha:"), nota.fecha);
```

### Versión moderna (ES Modules)

Primero añade `"type": "module"` en `package.json`.
Luego cambia los archivos a la nueva sintaxis:

```js
// notas.js
export function crearNota(titulo, contenido) {
  return {
    titulo,
    contenido,
    fecha: new Date().toLocaleString(),
  };
}

// index.js
import chalk from "chalk";
import { crearNota } from "./notas.js";

const [titulo, contenido] = process.argv.slice(2);

if (!titulo || !contenido) {
  console.log(chalk.red("Debes proporcionar un título y contenido"));
  process.exit();
}

const nota = crearNota(titulo, contenido);
console.log(chalk.green.bold("Nota creada:"));
console.log(chalk.blue("Título:"), nota.titulo);
console.log(chalk.yellow("Contenido:"), nota.contenido);
console.log(chalk.gray("Fecha:"), nota.fecha);
```

Ejecuta desde consola:

```bash
node index.js "Revisar código" "Terminar módulo 2"
```

---

## Conclusión

Al finalizar este módulo, ya dominas las bases del sistema de módulos en Node.js, tanto con **CommonJS** como con **ES Modules**, y sabes cómo usar **NPM** para instalar y gestionar dependencias externas.
También has aprendido a modularizar tu código, mantenerlo limpio y a elegir la sintaxis más adecuada según el contexto.

Este conocimiento te prepara para trabajar con código moderno y estructurado, y sienta las bases para los siguientes temas de Node.js, donde exploraremos su modelo de ejecución asíncrono, la lectura de archivos y el manejo de tareas en segundo plano.
