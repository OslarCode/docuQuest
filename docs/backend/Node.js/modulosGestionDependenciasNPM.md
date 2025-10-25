# Módulos y gestión de dependencias con NPM

## ¿Qué es un módulo en Node.js?

Cuando programas en Node.js, lo más habitual no es escribir todo el código en un único archivo. A medida que los proyectos crecen, dividir tu lógica en partes reutilizables se vuelve imprescindible. A eso lo llamamos “modularizar”. Node.js te permite trabajar fácilmente con módulos, que no son más que archivos de JavaScript que exportan y reutilizan funcionalidades.

Desde el principio, Node ha ofrecido soporte para módulos mediante el sistema **CommonJS**, el cual usa funciones como `require()` para importar y `module.exports` para exportar. Si vienes de JavaScript moderno en el navegador, probablemente estés más familiarizado con `import` y `export`. Node ahora también soporta **ESModules**, aunque no por defecto en todos los casos, así que por ahora, nos centraremos en la forma tradicional.

Imagina que tienes un archivo llamado `saludos.js` con una función para saludar:

```jsx
// saludos.js
function saludar(nombre) {
  return `Hola, ${nombre}`;
}

module.exports = saludar;
```

Ahora puedes reutilizarla desde otro archivo:

```jsx
// app.js
const saludar = require("./saludos");
console.log(saludar("Laura"));
```

Este pequeño paso te permite organizar tu código por funcionalidades y reutilizarlo sin copiar y pegar.

## ¿Qué es NPM y para qué sirve?

NPM es el **gestor de paquetes de Node.js**. Piensa en él como una biblioteca gigante donde otros desarrolladores han publicado funciones y herramientas que tú puedes instalar y usar en tus proyectos. Si alguna vez has querido enviar un correo, generar PDFs, crear un servidor web o conectarte a una base de datos, probablemente exista un paquete en NPM que ya lo hace por ti.

Para comenzar a usar NPM en un proyecto, solo necesitas inicializarlo ejecutando este comando en la raíz del directorio:

```bash
npm init -y
```

Esto crea un archivo `package.json`, que actúa como el “carnet de identidad” de tu proyecto. Allí se registran las dependencias, scripts y metadatos como el nombre o la versión del proyecto.

Por ejemplo, si quieres instalar una biblioteca como `chalk`, que sirve para colorear textos en la terminal, puedes hacer esto:

```bash
npm install chalk
```

Y luego usarla en tu archivo:

```jsx
const chalk = require("chalk");
console.log(chalk.green("Texto en verde"));
```

Esto convierte una simple línea de texto en algo más visual y agradable. Muy útil para herramientas de consola.

## Explorando el archivo package.json

El `package.json` no solo lista los paquetes que usas, también permite definir scripts personalizados para automatizar tareas. Por ejemplo, puedes añadir un script llamado "iniciar" que ejecute tu app principal:

```json
"scripts": {
  "iniciar": "node app.js"
}

```

Luego, desde la terminal, puedes ejecutar:

```bash
npm run iniciar
```

También puedes definir scripts para pruebas, compilaciones, formateo de código, entre otros. Este archivo es esencial para mantener organizado tu entorno, sobre todo cuando trabajas en equipo.

## Creando tus propios módulos reutilizables

No todo en NPM tiene que venir de fuera. Muchas veces, tú mismo puedes crear tus propios módulos locales para organizar tu código o compartirlo con otros proyectos.

Por ejemplo, supongamos que estás construyendo una pequeña app de notas. Puedes crear un módulo `notas.js` que gestione las funciones principales:

```jsx
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

Y luego usarlo desde tu archivo principal:

```jsx
const { crearNota } = require("./notas");
const miNota = crearNota("Recordatorio", "Estudiar Node.js");
console.log(miNota);
```

Al dividir el código de esta forma, no solo lo haces más limpio y legible, también te facilitas mucho el mantenimiento a largo plazo.

## ¿Qué diferencia hay entre dependencias normales y de desarrollo?

Cuando instalas paquetes con NPM, puedes diferenciarlos en dos grupos. Por un lado, están las **dependencias normales**, que tu app necesita para funcionar en producción. Por otro, están las **dependencias de desarrollo**, como herramientas para pruebas, formateo de código o compiladores.

Para instalar una dependencia de desarrollo, simplemente agregas la bandera `--save-dev` o `-D`:

```bash
npm install nodemon --save-dev
```

Esto hace que el paquete se registre en la sección `devDependencies` del `package.json`. Así, si despliegas tu proyecto en producción, esos paquetes no se instalan si no son necesarios.

## Proyecto práctico: Generador de notas con formato de colores

Vamos a cerrar este módulo con un proyecto sencillo que combine todo lo que hemos aprendido hasta ahora.

La idea es crear un generador de notas desde consola que reciba un título y un contenido, y que devuelva la nota con colores.

1. Crea una carpeta `proyecto-notas/`
2. Ejecuta `npm init -y`
3. Instala `chalk` para los colores:

```bash
npm install chalk
```

1. Crea un archivo `notas.js` con la lógica de creación:

```jsx
function crearNota(titulo, contenido) {
  return {
    titulo,
    contenido,
    fecha: new Date().toLocaleString(),
  };
}

module.exports = { crearNota };
```

1. Luego, crea `index.js` para ejecutar desde terminal:

```jsx
const chalk = require("chalk");
const { crearNota } = require("./notas");

const titulo = process.argv[2];
const contenido = process.argv[3];

if (!titulo || !contenido) {
  console.log(chalk.red("⚠️ Debes proporcionar un título y contenido"));
  process.exit();
}

const nota = crearNota(titulo, contenido);
console.log(chalk.green.bold("📓 Nota creada:"));
console.log(chalk.blue("Título:"), nota.titulo);
console.log(chalk.yellow("Contenido:"), nota.contenido);
console.log(chalk.gray("Fecha:"), nota.fecha);
```

1. Prueba el resultado:

```bash
node index.js "Revisar código" "Terminar módulo 2"
```

Con este pequeño script, ya estás trabajando con módulos, argumentos desde consola, dependencias externas y generación dinámica de contenido.

## Conclusión

Al finalizar este módulo ya tienes un dominio inicial del sistema de módulos de Node.js y sabes cómo usar NPM para instalar y gestionar librerías externas. También has aprendido a estructurar tu código para que sea modular, mantenible y profesional. Esto es un paso enorme para cualquier desarrollador backend moderno.

A partir del próximo módulo, exploraremos uno de los aspectos más potentes de Node.js: la asincronía y su modelo de ejecución no bloqueante. Prepárate para entender cómo manejar tareas en segundo plano, leer archivos sin bloquear el flujo, y dominar el famoso "callback hell"... para luego salir de él.
