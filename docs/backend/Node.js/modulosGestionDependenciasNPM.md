# Módulos y gestión de dependencias con NPM

## ¿Qué es un módulo en Node.js?

Cuando programas en Node.js, lo más habitual no es escribir todo el código en un único archivo. A medida que los proyectos crecen, dividir la lógica en partes reutilizables se vuelve imprescindible. A eso lo llamamos “modularizar”.
Node.js permite trabajar fácilmente con módulos, que no son más que archivos de JavaScript que exportan y reutilizan funcionalidades.

Desde sus primeras versiones, Node ha ofrecido soporte para módulos mediante el sistema **CommonJS**, que utiliza `require()` para importar y `module.exports` para exportar.
Sin embargo, el estándar actual de JavaScript define otra forma más moderna: los **ES Modules (ESM)**, que usan `import` y `export`, igual que en el navegador.

Hoy en día, Node.js admite ambos sistemas, aunque es importante conocer sus diferencias para usarlos correctamente según el caso.

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
import despedir, { saludar } from "./saludos.js";

console.log(saludar("Laura"));
console.log(despedir("Laura"));
```

La principal diferencia es que **ES Modules usa la palabra clave `import/export` y requiere la extensión `.js` explícita** en las rutas locales.
Además, **las importaciones son evaluadas de forma asíncrona**, lo que permite optimizar la carga del código.

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
Si trabajas con librerías antiguas o proyectos donde ya se usa CommonJS, es completamente válido seguir con `require()`. Solo una advertencia, no se deberían usar los dos tipos de archivos al mismo tiempo en el mismo proyecto, ya que posiblemente esto cause problemas.

## Manejo de rutas y `__dirname` en ES Modules

En los módulos CommonJS, Node.js proporciona de forma automática las variables globales `__dirname` y `__filename`, que indican respectivamente la ruta del directorio y del archivo actual. Sin embargo, **en los módulos ES (ES Modules) estas variables no existen**, ya que el nuevo sistema de módulos sigue el estándar ECMAScript y evita introducir identificadores específicos del entorno.

Cuando se trabaja con rutas de archivos en un proyecto que utiliza `"type": "module"`, debemos construir esas variables de forma explícita utilizando las utilidades nativas de Node.js. El patrón recomendado y oficial es el siguiente:

```js
import { fileURLToPath } from "node:url";
import path from "node:path";

// Convertimos la URL del módulo actual en una ruta del sistema de archivos
const __filename = fileURLToPath(import.meta.url);

// Obtenemos el directorio base del archivo actual
const __dirname = path.dirname(__filename);
```

A partir de aquí, puedes usar `__dirname` y `__filename` como lo harías en CommonJS:

```js
import fs from "node:fs";

// Ejemplo: leer un archivo que está en el mismo directorio
const rutaArchivo = path.join(__dirname, "datos.txt");
const contenido = fs.readFileSync(rutaArchivo, "utf8");

console.log(contenido);
```

Este enfoque garantiza compatibilidad con cualquier entorno moderno de Node.js y es la forma recomendada para trabajar con rutas relativas en proyectos ESM.

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

## ¿Qué es un proyecto npm?

Un **proyecto npm** es simplemente una carpeta que contiene un archivo llamado `package.json`. Ese archivo describe tu proyecto:

- Nombre y versión del proyecto.
- Dependencias que necesita para funcionar.
- Scripts que puedes ejecutar con `npm run`.
- Tipo de módulo que usas (CommonJS o ES modules), entre otras cosas.

Para crear un proyecto npm desde cero:

1. Crea una carpeta de proyecto.
2. Inicializa npm dentro de esa carpeta.

Ejemplo en PowerShell:

```powershell
mkdir mi-proyecto-npm
cd mi-proyecto-npm

npm init -y

```

La opción `-y` acepta todas las opciones por defecto y genera un `package.json` básico, parecido a este:

```json
{
  "name": "mi-proyecto-npm",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: sin test\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {}
}
```

Más adelante podrás editar este archivo manualmente o dejar que npm lo vaya actualizando cuando instales paquetes.

## Configurar ES modules en Node

Como quieres trabajar con **ES modules**, es importante indicárselo a Node. La forma más sencilla es añadir la propiedad `"type": "module"` en tu `package.json`.

Un ejemplo actualizado podría ser:

```json
{
  "name": "mi-proyecto-npm",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: sin test\" && exit 1"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

Con `"type": "module"` activado, podrás usar `import` y `export` en tus archivos `.js`, en lugar de `require` y `module.exports`.

## Instalar y usar un paquete de npm (ejemplo con fechas)

Imagina que estás creando una aplicación en Node y necesitas trabajar con fechas de forma cómoda. En lugar de escribir toda la lógica tú mismo, puedes instalar una librería especializada como `date-fns`.

### Paso 1: instalar la dependencia

Desde la carpeta del proyecto:

```powershell
npm install date-fns

```

Esto hará dos cosas:

- Creará o actualizará la carpeta `node_modules` con el código de `date-fns` y sus dependencias.
- Añadirá una entrada en `dependencies` dentro de `package.json`, similar a:

```json
"dependencies": {
  "date-fns": "^3.6.0"
}

```

(La versión exacta puede variar.)

### Paso 2: usar la librería con ES modules

Crea el archivo `index.js` en la raíz del proyecto:

```jsx
// index.js
// Ejemplo de uso de date-fns con ES modules

// Importamos solo la función que necesitamos desde date-fns
import { format } from "date-fns";

// Obtenemos la fecha actual
const ahora = new Date();

// Le damos un formato día-mes-año
const fechaFormateada = format(ahora, "dd-MM-yyyy");

// Mostramos el resultado en consola
console.log("Fecha actual formateada:", fechaFormateada);
```

Para ejecutar el archivo:

```powershell
npm run start

```

Como en `package.json` definimos el script `"start": "node index.js"`, npm se encarga de lanzar Node sobre ese archivo.

La idea clave es que, gracias a npm, no has tenido que implementar tu propia lógica de formateo de fechas; simplemente has instalado y usado una librería ya probada.

## Ejemplo: consola con colores usando chalk (ES modules)

Otro ejemplo clásico es `chalk`, una librería para imprimir texto con colores y estilos en la consola.

### Paso 1: instalar chalk

Desde tu proyecto:

```powershell
npm install chalk

```

### Paso 2: usar chalk con ES modules

Edita `index.js` o crea un archivo nuevo, por ejemplo `consola-colores.js`:

```jsx
// consola-colores.js
// Ejemplo de uso de chalk con ES modules

// En versiones modernas de chalk se usa import por defecto
import chalk from "chalk";

// Mensajes con diferentes estilos
console.log(chalk.blue("Mensaje informativo en azul"));
console.log(chalk.green.bold("Operación completada correctamente"));
console.log(chalk.red.bold("Error crítico en el sistema"));
console.log(chalk.bgYellow.black("Advertencia: revisa tu configuración"));
```

Añade un script específico en `package.json` para este archivo:

```json
"scripts": {
  "start": "node index.js",
  "colores": "node consola-colores.js",
  "test": "echo \"Error: sin test\" && exit 1"
}

```

Ahora podrás ejecutar:

```powershell
npm run colores

```

Este ejemplo muestra cómo npm te facilita instalar y usar librerías modernas con sintaxis de ES modules.

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
  process.exit(1);
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

## ¿Qué son node_modules y package-lock.json?

Cuando instalas dependencias con npm, ocurren varias cosas importantes:

- Se crea o actualiza la carpeta `node_modules`.
- Se genera o actualiza el archivo `package-lock.json`.

### node_modules

- Es la carpeta donde npm descarga el código de todas las dependencias.
- Puede contener cientos o miles de archivos, incluso para proyectos pequeños.
- No es necesario entender todo lo que hay dentro para trabajar con Node, pero es fundamental no tocar su contenido manualmente.

### package-lock.json

- Registra exactamente qué versiones de cada dependencia se han instalado.
- Garantiza que, si otra persona ejecuta `npm install` con el mismo `package-lock.json`, obtenga las mismas versiones que tú.
- Es muy útil para evitar errores por cambios inesperados de versión.

En resumen, `package.json` dice qué paquetes necesitas a nivel general, y `package-lock.json` guarda el detalle preciso de lo que realmente se instaló.

## Dependencias de producción y dependencias de desarrollo

npm distingue dos tipos de dependencias. Entender esta diferencia te ayudará a mantener tu proyecto organizado y ligero.

### Dependencias de producción

Son los paquetes necesarios para que tu aplicación funcione cuando se ejecuta en un entorno real. Se instalan con:

```powershell
npm install express

```

Esto añadirá una entrada en la sección `"dependencies"` del archivo `package.json`:

```json
"dependencies": {
  "express": "^4.19.0"
}

```

Express es un ejemplo clásico, porque el servidor no puede funcionar sin él.

### Dependencias de desarrollo

Son herramientas que solo necesitas mientras desarrollas, pero no son necesarias para ejecutar la aplicación en producción.

Ejemplo:

```powershell
npm install nodemon --save-dev

```

Esto añade el paquete a `"devDependencies"`:

```json
"devDependencies": {
  "nodemon": "^3.0.2"
}

```

Estas dependencias suelen ser linters, herramientas de testing, compiladores, watchers o bundlers.

### ¿Cómo decide npm dónde guardar el paquete?

- `npm install paquete` → se guarda en `dependencies`
- `npm install paquete -D` o `-save-dev` → se guarda en `devDependencies`

Esta separación resulta útil cuando trabajas con despliegues, contenedores o servidores en producción, donde solo quieres instalar lo estrictamente necesario.

### Instalar paquetes globalmente

Hay paquetes que conviene instalar **de manera global**, porque funcionan como herramientas de línea de comandos que puedes ejecutar desde cualquier carpeta.

Ejemplo clásico:

```powershell
npm install -g live-server

```

Esto permite ejecutar:

```powershell
live-server

```

Desde cualquier lugar del sistema. Esta instalación no afecta a tu proyecto ni a tu `package.json`.

Como regla general, instala globalmente aquellas herramientas que se usan como comandos del sistema. El resto, instálalas de forma local para evitar conflictos de versiones entre proyectos.

## Comandos esenciales de npm para gestionar paquetes

Dominar estos comandos te permitirá mantener tu proyecto limpio y actualizado.

### Instalar todas las dependencias de un proyecto

Cuando descargas un proyecto con `package.json`, ejecuta:

```powershell
npm install

```

npm leerá las dependencias declaradas y reconstruirá la carpeta `node_modules`.

### Instalar un paquete específico

```powershell
npm install axios

```

### Desinstalar un paquete

Si ya no necesitas un paquete:

```powershell
npm uninstall chalk

```

npm lo elimina de `node_modules` y también de `package.json`.

### Actualizar dependencias

```powershell
npm update

```

Actualiza los paquetes a la última versión compatible con las reglas del `package.json`.

### Ver qué paquetes tienen actualizaciones disponibles

```powershell
npm outdated

```

Ejemplo de salida:

```
Package  Current  Wanted  Latest
chalk     5.0.0    5.3.0   6.0.0

```

- Current: lo que tienes instalado.
- Wanted: la última versión que respeta el rango del `package.json`.
- Latest: la última versión publicada en npm.

### Ver lista de paquetes instalados

```powershell
npm list

```

Si solo quieres ver los paquetes de primer nivel:

```powershell
npm list --depth=0

```

Esto resulta útil para revisar proyectos antiguos o detectar dependencias innecesarias.

## Scripts personalizados en package.json

Uno de los puntos más potentes del ecosistema npm es la capacidad de definir scripts que automatizan tareas.

Imagina que tu `package.json` contiene:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "saludo": "echo Hola desde un script de npm"
}

```

### Ejecutar un script

```powershell
npm run saludo

```

Salida:

```
Hola desde un script de npm

```

### Scripts especiales

Si el script se llama `start`, puedes simplificar:

```powershell
npm start

```

Sin necesidad de `run`.

Esto se utiliza habitualmente para lanzar la aplicación principal:

```json
"scripts": {
  "start": "node index.js"
}

```

### Script de desarrollo con nodemon

Cuando desarrollas un servidor Node, puede ser incómodo reiniciarlo manualmente tras cada cambio. Por eso se usa nodemon:

```json
"scripts": {
  "dev": "nodemon index.js"
}

```

Ejecuta:

```powershell
npm run dev

```

El servidor se reiniciará automáticamente cada vez que guardes un archivo.

## Herramientas habituales en proyectos con Node

A continuación se muestran herramientas muy comunes cuando estás aprendiendo backend.

### nodemon

- Restaura y reinicia el servidor al detectar cambios.
- Útil para desarrollo local.

Instalación recomendada:

```powershell
npm install nodemon -D

```

Uso vía script:

```json
"scripts": {
  "dev": "nodemon index.js"
}

```

### live-server

Ideal para proyectos HTML estáticos.

Instalación global:

```powershell
npm install -g live-server

```

Ejecución:

```powershell
live-server

```

## Ejecutar paquetes sin instalarlos globalmente con npx

El comando `npx` permite usar herramientas sin instalarlas previamente en tu sistema.

Ejemplo:

```powershell
npx create-react-app mi-app

```

O herramientas modernas:

```powershell
npx tailwindcss init

```

Esto evita llenar tu sistema de instalaciones globales. npx descarga y ejecuta el paquete temporalmente.

## Buenas prácticas con npm y Git

Unas cuantas buenas prácticas básicas:

1. No subas `node_modules` a tu repositorio Git.

   Crea un archivo `.gitignore` en la raíz del proyecto (si aún no existe) y añade:

   ```
   node_modules/

   ```

2. Comparte siempre `package.json` y `package-lock.json`.

   Así, cuando alguien clone tu proyecto, solo tendrá que ejecutar:

   ```powershell
   npm install

   ```

   Y npm descargará todas las dependencias necesarias usando la información de esos archivos.

3. Usa scripts en lugar de comandos largos.

   En lugar de recordar comandos complejos, defínelos en la sección `"scripts"` del `package.json`.

   Ejemplo:

   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "node --watch index.js",
     "test": "vitest"
   }

   ```

   Luego puedes ejecutar:

   ```powershell
   npm run dev
   npm test

   ```

   Esto hace el trabajo en equipo mucho más cómodo y evita errores.

## Ejemplo completo: uso real con ES modules

Imagina que tienes un proyecto Node configurado con ES modules (`"type": "module"` en `package.json`). Quieres crear un script que utilice chalk para mostrar mensajes con colores.

### Paso 1: instalar chalk

```powershell
npm install chalk

```

### Paso 2: crear un archivo y usar chalk con ES modules

Archivo `colores.js`:

```jsx
// colores.js
// Ejemplo usando chalk con ES modules

import chalk from "chalk";

console.log(chalk.green("Inicio del programa"));
console.log(chalk.blue.bold("Mensaje informativo"));
console.log(chalk.yellow("Proceso en ejecución"));
console.log(chalk.red.bold("Error detectado"));
console.log(chalk.bgCyan.black("Fin del programa"));
```

### Paso 3: añadir un script

```json
"scripts": {
  "start": "node index.js",
  "colores": "node colores.js"
}

```

Ejecutar:

```powershell
npm run colores

```

De este modo integras dependencias reales con scripts personalizados y sintaxis moderna.

### Anexo 1: Cómo actualizar dependencias mayores sin romper el proyecto

Actualizar dependencias en Node no siempre es trivial. npm indica las versiones usando el estándar semántico SemVer: `MAJOR.MINOR.PATCH`.

- MAJOR: cambios que pueden romper compatibilidad.
- MINOR: nuevas funciones sin romper compatibilidad.
- PATCH: corrección de errores.

Cuando actualizas una versión **mayor**, existe riesgo de que tu código deje de funcionar. Para hacerlo de forma segura sigue estas pautas.

### Comprobar versiones desactualizadas

```powershell
npm outdated

```

Esto te mostrará:

- Versión actual instalada.
- Versión permitida por tu package.json.
- Última versión disponible en npm.

Si el número de versión cambia en el primer bloque (MAJOR), la actualización puede romper tu código.

### Actualizar una dependencia específica

```powershell
npm install paquete@latest

```

Ejemplo:

```powershell
npm install express@latest

```

Esto actualiza a la versión mayor más reciente.

### Revisión de breaking changes

Antes de actualizar siempre consulta:

1. El repositorio oficial en GitHub.
2. La sección Releases o Changelog.
3. Notas de migración si existen.

Allí se documentan cambios que pueden afectar a tu código.

### Actualizar de forma controlada con un proyecto de prueba

Un método seguro consiste en crear un proyecto temporal donde instales la nueva versión y pruebes su comportamiento antes de actualizar tu proyecto principal. Es especialmente útil cuando trabajas con librerías complejas como Express, Prisma, Sequelize o ESLint.

### Uso de flags seguros en npm

npm permite actualizar dependencias respetando reglas estrictas:

```powershell
npm update --save --dry-run

```

La opción `--dry-run` simula la actualización sin tocar nada. Permite saber qué cambiaría npm.

### Reinstalar dependencias desde cero

Cuando se producen conflictos, una buena práctica es:

```powershell
rm -r node_modules
del package-lock.json
npm install

```

Esto fuerza una instalación limpia que a veces resuelve problemas de versiones mezcladas.

### Ejecutar tests después de la actualización

Si tu proyecto tiene tests automatizados, ejecutarlos después de cada actualización mayor es esencial.

```powershell
npm test

```

Si algo falla tendrás información directa para ajustar tu código a la nueva versión.

### Anexo 2: Cómo leer e interpretar el archivo package-lock.json

`package-lock.json` es generado automáticamente por npm y garantiza que todas las instalaciones sean reproducibles. Aunque no editamos este archivo manualmente, entenderlo es fundamental.

### Para qué sirve package-lock.json

- Registra exactamente qué versión de cada dependencia se instaló.
- Permite que otros desarrolladores obtengan las mismas versiones al ejecutar `npm install`.
- Ayuda a detectar cambios inesperados cuando se actualiza una dependencia.

### Estructura principal

Ejemplo simplificado:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "packages": {
    "": {
      "dependencies": {
        "chalk": "^5.3.0"
      }
    },
    "node_modules/chalk": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.3.0.tgz",
      "integrity": "sha512-...",
      "dependencies": {
        "ansi-styles": "^6.2.1"
      }
    }
  }
}
```

### Conceptos clave

### versión exacta instalada

Aunque en tu `package.json` tengas un rango como `^5.3.0`, en el `package-lock.json` siempre verás la versión precisa, por ejemplo `5.3.0`.

### resolved

URL desde la que npm descargó el paquete.

### integrity

Hash criptográfico que garantiza que nadie modificó el paquete.

### árbol de dependencias completo

En `packages` se registra cada dependencia y sus dependencias internas.

Esto permite reconstruir el árbol exactamente.

### Cuándo borrar package-lock.json

- Cuando hay conflictos de versiones difíciles de resolver.
- Solo en casos excepcionales.

Normalmente no deberías borrarlo, ya que perderás la información exacta de versiones.

### Anexo 3: Cómo organizar scripts avanzados en proyectos que usan ES modules

Los scripts pueden ir mucho más allá de ejecutar archivos. Puedes crear comandos que automaticen tareas de desarrollo, testing y despliegue.

A continuación se muestran ejemplos modernos y organizados.

### Scripts básicos de producción y desarrollo

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "node --watch src/index.js"
}

```

### Comentario

- `node --watch` reinicia automáticamente el archivo cuando cambia, similar a nodemon pero sin dependencias externas.
- Para usarlo necesitas Node 20 o superior.

### Scripts para testing

Si usas Vitest:

```json
"scripts": {
  "test": "vitest",
  "test:watch": "vitest --watch",
  "coverage": "vitest --coverage"
}

```

### Scripts para formatear y analizar código

```json
"scripts": {
  "lint": "eslint src",
  "format": "prettier --write src"
}

```

### Scripts compuestos

Puedes usar `&&` y `||` para encadenar comandos.

```json
"scripts": {
  "prepare": "npm run lint && npm test"
}

```

Otro ejemplo: reiniciar servidor y generar documentación simultáneamente.

```json
"scripts": {
  "dev": "concurrently \"npm run docs:watch\" \"npm run server\"",
  "server": "node --watch src/server.js",
  "docs:watch": "npx vitepress dev docs"
}

```

En este caso se necesita instalar `concurrently`:

```powershell
npm install concurrently -D

```

### Scripts con variables de entorno en Windows

Como trabajas en Windows, la forma correcta de setear variables es:

```json
"scripts": {
  "dev": "set NODE_ENV=development && node src/index.js"
}

```

Esto permite adaptar el entorno sin dependencias externas.

### Scripts para proyectos distribuidos en carpetas

Ejemplo típico:

- `src/`
- `scripts/`
- `tests/`

```json
"scripts": {
  "build": "node scripts/build.js",
  "deploy": "node scripts/deploy.js",
  "cleanup": "node scripts/cleanup.js"
}

```

Cada archivo puede estar escrito con sintaxis ES modules.

### Anexo 4: Cómo usar workspaces de npm

Los workspaces permiten gestionar múltiples proyectos dentro de un mismo repositorio. Son útiles para aplicaciones grandes, monorepos o proyectos que comparten utilidades internas.

### Activar workspaces en package.json

En el archivo raíz:

```json
{
  "name": "mi-monorepo",
  "private": true,
  "workspaces": ["packages/*"]
}
```

El campo `private: true` es obligatorio para evitar publicar el monorepo accidentalmente.

### Estructura típica

```
mi-monorepo/
  package.json
  packages/
    api/
      package.json
    web/
      package.json
    utils/
      package.json

```

Cada uno es un proyecto con sus propias dependencias y scripts.

### Instalar dependencias específicas en un workspace

```powershell
npm install express -w api

```

Esto instala express solo en `packages/api`.

### Ejecutar scripts dentro de un workspace

Si `packages/api/package.json` tiene:

```json
"scripts": {
  "start": "node src/index.js"
}

```

Puedes ejecutarlo desde la raíz del monorepo:

```powershell
npm run start -w api

```

### Instalación compartida

npm puede deduplicar dependencias comunes.

Por ejemplo, si dos proyectos usan chalk, npm las instala una sola vez en el nivel raíz cuando es posible.

### Referenciar paquetes internos

Si tienes una librería propia (por ejemplo `utils`) que deseas usar en `api`:

1. En `packages/utils/package.json` define:

```json
{
  "name": "@miempresa/utils",
  "version": "1.0.0",
  "type": "module"
}
```

1. Instala esa utilidad como dependencia local en `api`:

```powershell
npm install @miempresa/utils -w api

```

npm la enlaza sin necesidad de publicarla.

## Crear y publicar tu propio paquete en NPM

Este documento explica de manera clara y práctica cómo crear, estructurar, documentar y publicar tu propio paquete npm usando Node.js moderno con ES modules. También incluye recomendaciones de versionado semántico, buenas prácticas al actualizar versiones mayores y pautas para mantener el paquete estable con el tiempo.

### Crear la estructura básica de un paquete npm

Empieza creando una carpeta para tu paquete:

```powershell
mkdir mi-paquete-ejemplo
cd mi-paquete-ejemplo

```

Estructura mínima recomendada:

```
mi-paquete-ejemplo/
│
├── src/
│   └── index.js       → código principal del paquete
│
├── package.json       → configuración del paquete
└── README.md          → documentación oficial

```

Usar una carpeta `src` facilita escalar el proyecto y mantener orden en el código.

### Crear el archivo principal usando ES Modules

Para trabajar con ES Modules debes incluir `"type": "module"` en tu `package.json`. Lo configuraremos más adelante.

Ahora crea el archivo principal:

```jsx
// src/index.js
// Ejemplo de paquete sencillo que devuelve frases motivadoras

const frases = [
  "Tú puedes con todo.",
  "La constancia lleva al progreso.",
  "Cada día suma.",
  "La práctica hace al maestro.",
];

// Exportación moderna con ES modules
export function obtenerFraseAleatoria() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

// Exportación adicional opcional
export const VERSION = "1.0.0";
```

Este ejemplo muestra:

- Sintaxis moderna `export`.
- Lógica simple, ideal para introducir el concepto.
- Posibilidad de exportar varias funciones o constantes.

### Crear y configurar el archivo package.json

Inicializa el paquete con:

```powershell
npm init -y

```

Modifica el archivo resultante para configurarlo correctamente. Un ejemplo adecuado sería:

```json
{
  "name": "frases-motivadoras-ejemplo",
  "version": "1.0.0",
  "description": "Paquete de ejemplo que exporta frases motivadoras aleatorias.",
  "type": "module",
  "main": "src/index.js",
  "keywords": ["motivacion", "frases", "ejemplo"],
  "author": "Tu Nombre",
  "license": "MIT"
}
```

Campo clave:

- `"type": "module"`: permite usar `import` y `export` sin necesidad de extensiones adicionales.

### Crear un archivo README.md claro y profesional

Este archivo será lo primero que ve cualquier usuario en npm. Debe incluir explicación, instalación y ejemplos de uso reales.

Ejemplo:

```markdown
- frases-motivadoras-ejemplo

Un paquete educativo que devuelve frases motivadoras aleatorias.
Es un ejemplo práctico para aprender a publicar paquetes npm con ES modules.

- Instalación

npm install frases-motivadoras-ejemplo

- Uso

import { obtenerFraseAleatoria } from "frases-motivadoras-ejemplo";

console.log(obtenerFraseAleatoria());

- Licencia

MIT
```

### Crear una cuenta en npm

1. Accede a https://www.npmjs.com/signup.
2. Registra un nombre de usuario único.
3. Verifica tu correo.

Después, inicia sesión desde la terminal:

```powershell
npm login

```

Introduce usuario, contraseña y correo.

### Publicar un paquete en npm

Antes de publicar, asegúrate de que el nombre no esté ya registrado:

```powershell
npm search nombre-del-paquete

```

Cuando estés listo:

```powershell
npm publish

```

El paquete estará disponible en:

```
https://www.npmjs.com/package/NOMBRE

```

Si es la primera vez que publicas un paquete con un nombre nuevo, suele ser inmediato.

### Versionado semántico (SemVer)

npm usa el estándar:

```
MAJOR.MINOR.PATCH

```

Significado:

- MAJOR: cambios incompatibles.
- MINOR: nuevas funciones compatibles.
- PATCH: correcciones menores.

Ejemplos:

```powershell
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

```

npm actualizará automáticamente el `package.json` y creará una etiqueta Git si hay repositorio.

Tras actualizar la versión:

```powershell
npm publish

```

### Actualizar un paquete correctamente sin romper compatibilidad

Si publicas una versión nueva, sigue buenas prácticas:

### Consultar cambios de tu propia librería

Mantén un archivo `CHANGELOG.md` para documentar cambios importantes. Evitas confusión entre tus usuarios.

### Introducir cambios mayores con cuidado

Si cambias la forma en la que se importa o la estructura del paquete, aumenta el número MAJOR.

### Proveer advertencias de deprecación

Por ejemplo:

```jsx
console.warn("Esta función será eliminada en la versión 2.0.0.");
```

### Cómo actualizar dependencias de tu paquete sin romperlo

Integrando las recomendaciones del Anexo 1:

1. Ver lista de paquetes desactualizados:

```powershell
npm outdated

```

1. Simular actualización:

```powershell
npm update --dry-run

```

1. Forzar una instalación limpia si hay conflictos:

```powershell
rm -r node_modules
del package-lock.json
npm install

```

1. Ejecutar tests después de cada actualización.

Esto garantiza que tu paquete mantiene compatibilidad.

### Cómo interpretar package-lock.json en un paquete publicado

El archivo `package-lock.json` sirve para:

- asegurar instalaciones reproducibles;
- registrar versiones exactas de dependencias;
- verificar integridad mediante hashes.

Aunque no se publica en npm cuando subes una librería, sí es importante para desarrollo y contribución.

Estructura importante:

```json
"packages": {
  "node_modules/chalk": {
    "version": "5.3.0",
    "integrity": "sha512-...",
    "dependencies": { ... }
  }
}

```

No se edita manualmente. npm lo gestiona automáticamente.

### Uso de scripts avanzados durante el desarrollo del paquete

Puedes organizar tareas útiles en `package.json`.

Ejemplo:

```json
"scripts": {
  "dev": "node --watch src/index.js",
  "build": "node scripts/build.js",
  "test": "vitest",
  "lint": "eslint src",
  "prepare": "npm run lint && npm test"
}

```

El comando `prepare` se ejecuta automáticamente antes de publicar si existe.

### Eliminar un paquete de npm

Solo puedes eliminar un paquete dentro de las primeras 72 horas y con condiciones.

```powershell
npm unpublish nombre --force

```

Úsalo con cuidado, ya que puede afectar a otros desarrolladores.

### Probar el paquete desde otro proyecto

```powershell
mkdir proyecto-usuario
cd proyecto-usuario
npm init -y
npm install frases-motivadoras-ejemplo

```

Ejemplo de uso:

```jsx
import { obtenerFraseAleatoria } from "frases-motivadoras-ejemplo";

console.log(obtenerFraseAleatoria());
```

Esto permite asegurarte de que tu paquete funciona de forma real.

### Publicar versiones etiquetadas (beta, next, rc)

Puedes publicar versiones no definitivas sin afectar a usuarios actuales.

```powershell
npm publish --tag beta

```

Los usuarios deben instalarla explícitamente:

```powershell
npm install frases-motivadoras-ejemplo@beta

```

### Usar workspaces para paquetes grandes o múltiples utilidades

Si tu paquete crece o deseas crear varios módulos relacionados, puedes convertir tu repositorio en un monorepo usando workspaces.

Ejemplo de configuración raíz:

```json
{
  "name": "mis-utilidades-js",
  "private": true,
  "workspaces": ["packages/*"]
}
```

Cada paquete debe tener su propio `package.json`, y puedes publicar cada uno de forma independiente.

## npm Cheat Sheet: Guía esencial para trabajar con Node.js y ES Modules

Este documento funciona como una referencia rápida y clara sobre los comandos más importantes de npm, su utilidad práctica y las situaciones en las que conviene utilizarlos. Todos los ejemplos están pensados para un entorno moderno basado en ES modules y desarrollo en Windows.

### Inicializar un nuevo proyecto

Un proyecto npm comienza con el archivo `package.json`. Puedes generarlo de dos maneras:

```powershell
npm init

```

Este comando te hará preguntas sobre el nombre del proyecto, versión inicial, descripción y punto de entrada.

Si quieres aceptar las opciones por defecto de forma automática:

```powershell
npm init -y

```

Después de esto tendrás un `package.json` listo para editar.

### Comprobar versiones instaladas

Antes de empezar es habitual verificar la versión de Node.js y npm disponibles en tu sistema:

```powershell
node -v
npm -v

```

Esto es útil para asegurarte de que estás trabajando con versiones actualizadas o compatibles con los paquetes que necesitas.

### Instalar paquetes

npm permite instalar dependencias locales, que se guardan en la carpeta `node_modules` y quedan registradas en tu `package.json`.

Instalar una dependencia normal:

```powershell
npm install nombre-paquete

```

Instalar una dependencia de desarrollo:

```powershell
npm install nombre-paquete -D

```

El atajo:

```powershell
npm i

```

Instalar todas las dependencias listadas en `package.json`:

```powershell
npm install

```

### Eliminar un paquete instalado

Si un paquete ya no es necesario:

```powershell
npm uninstall nombre-paquete

```

npm lo elimina tanto del `package.json` como del directorio `node_modules`.

### Actualizar paquetes

Para actualizar a las versiones más recientes permitidas por el `package.json`:

```powershell
npm update

```

Para comprobar qué paquetes tienen versiones más nuevas:

```powershell
npm outdated

```

Esto mostrará una tabla con:

- Versión instalada.
- Versión recomendada dentro del rango del `package.json`.
- Última versión disponible en npm.

### Listar paquetes instalados

Ver la estructura completa de dependencias:

```powershell
npm list

```

Mostrar solo los paquetes principales (sin subdependencias):

```powershell
npm list --depth=0

```

Esto resulta útil para revisar qué dependencias se utilizan realmente en un proyecto.

### Instalación global

Algunas herramientas que funcionan como programas de consola suelen instalarse globalmente. Por ejemplo:

```powershell
npm install -g nombre-paquete

```

Esto permite usar ese comando desde cualquier carpeta del sistema.

### Scripts personalizados en package.json

Puedes definir tareas automatizadas dentro de la sección `"scripts"`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "node --watch src/index.js"
}

```

Ejecutar un script:

```powershell
npm run dev

```

El script `start` es especial, ya que puedes ejecutarlo sin `run`:

```powershell
npm start

```

Los scripts son muy útiles para automatizar pruebas, formateo de código, generación de documentación o despliegues.

### Workspaces y monorepos (npm 7+)

npm permite trabajar con múltiples proyectos dentro de un solo repositorio mediante workspaces.

Ejemplo de ejecución de un script dentro de un workspace específico:

```powershell
npm run build --workspace=utils

```

Ejecutar un script en todos los workspaces:

```powershell
npm run test --workspaces

```

Los workspaces facilitan compartir dependencias y utilidades entre varios paquetes dentro del mismo repositorio.

### Publicar paquetes en npm

Antes de publicar, inicia sesión:

```powershell
npm login

```

Publicar un paquete:

```powershell
npm publish

```

Subir una nueva versión:

```powershell
npm version patch
npm version minor
npm version major

```

Eliminar un paquete recién publicado:

```powershell
npm unpublish nombre --force

```

Solo debe hacerse con precaución y dentro de las primeras 72 horas desde la publicación.

### Ejecutar paquetes sin instalarlos usando npx

`npx` ejecuta temporalmente paquetes sin necesidad de instalarlos globalmente.

Por ejemplo:

```powershell
npx create-react-app miAplicacion

```

También es útil para herramientas de configuración:

```powershell
npx tailwindcss init

```

### Seguridad y auditoría

npm incluye herramientas para analizar vulnerabilidades en dependencias:

```powershell
npm audit

```

Intentar corregirlas automáticamente:

```powershell
npm audit fix

```

Forzar la actualización aunque pueda romper dependencias:

```powershell
npm audit fix --force

```

Este comando debe utilizarse solo cuando comprendas el impacto sobre las dependencias.

### Integración con sistemas como GitHub

Dependabot puede automatizar la actualización de dependencias creando Pull Requests cuando detecta vulnerabilidades o mejoras. Debes crear el archivo `.github/dependabot.yml` con configuraciones básicas como:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
```

Esto permite mantener actualizadas las dependencias sin intervención manual.

### Buenas prácticas básicas

Es importante evitar subir la carpeta `node_modules` a Git. Asegúrate de incluir en tu `.gitignore`:

```
node_modules/

```

La carpeta puede regenerarse siempre mediante `npm install`, por lo que no debe formar parte del repositorio.

### Comandos básicos de npm

| Comando                  | Descripción                                                     | Ejemplo práctico                              |
| ------------------------ | --------------------------------------------------------------- | --------------------------------------------- |
| `npm init`               | Crea un archivo `package.json` mediante preguntas interactivas. | Crear un nuevo proyecto npm.                  |
| `npm init -y`            | Crea `package.json` con valores por defecto.                    | Inicializar rápidamente proyectos de prueba.  |
| `npm install`            | Instala todas las dependencias listadas en `package.json`.      | Configurar un proyecto recién descargado.     |
| `npm install paquete`    | Instala un paquete como dependencia de producción.              | `npm install express`                         |
| `npm install paquete -D` | Instala un paquete como dependencia de desarrollo.              | `npm install nodemon -D`                      |
| `npm uninstall paquete`  | Elimina un paquete y actualiza `package.json`.                  | `npm uninstall chalk`                         |
| `npm list`               | Muestra el árbol completo de dependencias instaladas.           | Revisar dependencias cargadas en el proyecto. |
| `npm list --depth=0`     | Muestra solo los paquetes principales.                          | Auditar dependencias directas.                |
| `npm outdated`           | Muestra paquetes que tienen versiones más nuevas disponibles.   | Detectar actualizaciones recomendadas.        |
| `npm update`             | Actualiza paquetes según las reglas del `package.json`.         | Mantener dependencias al día.                 |
| `npm start`              | Ejecuta el script llamado `start` en `package.json`.            | Arrancar la aplicación principal.             |
| `npm run script`         | Ejecuta cualquier script definido en `package.json`.            | `npm run dev`                                 |
| `npm install -g paquete` | Instala un paquete globalmente.                                 | `npm install -g live-server`                  |
| `npx comando`            | Ejecuta un paquete sin instalarlo globalmente.                  | `npx tailwindcss init`                        |

### Comandos avanzados de npm

| Comando                              | Descripción                                                      | Ejemplo práctico                                    |
| ------------------------------------ | ---------------------------------------------------------------- | --------------------------------------------------- |
| `npm audit`                          | Analiza vulnerabilidades en dependencias.                        | Detectar riesgos de seguridad.                      |
| `npm audit fix`                      | Intenta corregir vulnerabilidades automáticamente.               | Actualizar dependencias vulnerables.                |
| `npm audit fix --force`              | Fuerza actualizaciones que podrían ser incompatibles.            | Resolver vulnerabilidades graves.                   |
| `npm version patch`                  | Incrementa el tercer número del versionado.                      | `1.0.0 → 1.0.1`                                     |
| `npm version minor`                  | Incrementa el número intermedio.                                 | `1.0.0 → 1.1.0`                                     |
| `npm version major`                  | Incrementa el primer número con cambios incompatibles.           | `1.0.0 → 2.0.0`                                     |
| `npm publish`                        | Publica un paquete en npm.                                       | Subir una librería propia.                          |
| `npm unpublish nombre --force`       | Elimina un paquete publicado recientemente.                      | Retirar una versión problemática.                   |
| `npm pack`                           | Genera un archivo `.tgz` con el paquete listo para distribuir.   | Probar cómo quedará el paquete antes de publicarlo. |
| `npm dedupe`                         | Reduce duplicados en `node_modules` cuando es posible.           | Optimizar el árbol de dependencias.                 |
| `npm ci`                             | Instalación limpia basada estrictamente en `package-lock.json`.  | Entornos donde la reproducibilidad es crítica.      |
| `npm config set clave valor`         | Ajusta opciones de configuración de npm.                         | `npm config set init-license MIT`                   |
| `npm root -g`                        | Muestra la ruta global donde npm instala paquetes globales.      | Ubicar herramientas instaladas globalmente.         |
| `npm doctor`                         | Diagnostica el estado del entorno npm.                           | Resolver fallos en el sistema npm.                  |
| `npm exec comando`                   | Ejecuta un binario de dependencias locales de manera controlada. | `npm exec eslint .`                                 |
| `npm install nombre-paquete@version` | Instala una versión específica.                                  | `npm install express@5.0.0`                         |
| `npm install nombre-paquete@tag`     | Instala una versión etiquetada (beta, next, rc).                 | `npm install prisma@beta`                           |
| `npm install --dry-run`              | Simula la instalación sin realizar cambios.                      | Probar actualizaciones antes de aplicarlas.         |
| `npm update --dry-run`               | Simula actualizaciones sin modificar nada.                       | Revisar cambios previstos.                          |
| `npm run script --workspace=paquete` | Ejecuta un script solo en un workspace.                          | `npm run build --workspace=api`                     |
| `npm run script --workspaces`        | Ejecuta un script en todos los workspaces.                       | `npm run test --workspaces`                         |
| `npm create`                         | Ejecuta generadores interactivos de proyectos.                   | `npm create vite@latest`                            |

## Conclusión

Al finalizar este módulo, ya dominas las bases del sistema de módulos en Node.js, tanto con **CommonJS** como con **ES Modules**, y sabes cómo usar **NPM** para instalar y gestionar dependencias externas.
También has aprendido a modularizar tu código, mantenerlo limpio y a elegir la sintaxis más adecuada según el contexto.

Este conocimiento te prepara para trabajar con código moderno y estructurado, y sienta las bases para los siguientes temas de Node.js, donde exploraremos su modelo de ejecución asíncrono, la lectura de archivos y el manejo de tareas en segundo plano.
