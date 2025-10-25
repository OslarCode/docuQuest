# Sistema de archivos y procesos en Node.js

## Introducción

Una de las grandes ventajas de Node.js es que permite interactuar directamente con el sistema operativo, lo que lo convierte en una herramienta ideal para crear scripts, herramientas de automatización, servidores de archivos, y más.

En este módulo vas a aprender a:

- Leer, escribir y modificar archivos locales
- Trabajar con rutas de archivos de forma segura
- Utilizar flujos (streams) para manejar archivos grandes
- Interactuar con procesos del sistema (memoria, CPU, etc.)
- Crear herramientas útiles directamente desde la terminal

## Trabajando con el sistema de archivos (`fs`)

Node.js incluye un módulo interno llamado `fs` (file system), que permite realizar operaciones como leer, escribir, copiar, eliminar o renombrar archivos y carpetas.

Puedes usarlo en su versión clásica basada en callbacks, o en su versión moderna con promesas (`fs/promises`), que es la que vamos a utilizar aquí por claridad y compatibilidad con `async/await`.

### Leer archivos de texto

```jsx
const fs = require("fs/promises");

async function leerArchivo() {
  const contenido = await fs.readFile("./texto.txt", "utf8");
  console.log("📄 Contenido del archivo:", contenido);
}
```

El segundo parámetro `"utf8"` indica que queremos leer el contenido como texto. Si lo omites, obtendrás un `Buffer`.

### Escribir archivos (crea o reemplaza)

```jsx
await fs.writeFile(
  "./resultado.txt",
  "Este es un nuevo archivo generado por Node.js"
);
```

Si el archivo no existe, lo crea. Si ya existe, lo sobrescribe. Puedes guardar datos generados por tu programa, respuestas de una API, logs, etc.

### Añadir contenido al final de un archivo (append)

```jsx
await fs.appendFile("./resultado.txt", "\nNueva línea añadida al final");
```

Ideal para guardar logs, errores o registros de acciones sin borrar lo anterior.

### Eliminar archivos

```jsx
await fs.unlink("./archivo_innecesario.txt");
```

Úsalo con cuidado. Esta acción no se puede deshacer.

### Crear y eliminar carpetas

```jsx
await fs.mkdir("./carpetaNueva"); // Crea una carpeta
await fs.rmdir("./carpetaNueva"); // Elimina la carpeta si está vacía
```

## Trabajar con rutas (`path`)

Cuando trabajas con archivos, necesitas crear rutas compatibles con cualquier sistema operativo. Para eso usamos el módulo `path`, que evita errores como separadores invertidos en Windows (`\`) o rutas absolutas relativas mal construidas.

```jsx
const path = require("path");

const rutaCompleta = path.join(__dirname, "data", "archivo.txt");
console.log(rutaCompleta);
```

Esto genera una ruta segura como:

`/home/usuario/proyecto/data/archivo.txt`

## Streams: lectura y escritura eficiente

Para archivos muy grandes (como logs, archivos CSV o de respaldo), no conviene leerlos todos de golpe. En su lugar, puedes procesarlos por partes usando _streams_ (flujos).

```jsx
const fs = require("fs");

const lector = fs.createReadStream("grande.txt", "utf8");

lector.on("data", (chunk) => {
  console.log("📦 Bloque recibido:", chunk.length, "bytes");
});

lector.on("end", () => {
  console.log("✅ Lectura completa");
});
```

Con esto evitas saturar la memoria leyendo archivos pesados, y puedes incluso procesarlos línea a línea o enviarlos por red.

## Interacción con el sistema (`os` y `process`)

### Módulo `os`

Permite consultar información del sistema operativo:

```jsx
const os = require("os");

console.log("Sistema operativo:", os.platform());
console.log("Memoria libre:", os.freemem());
console.log("CPUs:", os.cpus().length);
```

### Módulo `process`

Permite interactuar con el proceso actual: leer argumentos, variables de entorno, o cerrar el programa manualmente.

```jsx
console.log("Directorio actual:", process.cwd());
console.log("Variables de entorno:", process.env);
console.log("Argumentos:", process.argv);
```

También puedes capturar errores que no fueron controlados:

```jsx
process.on("uncaughtException", (err) => {
  console.error("Error inesperado:", err.message);
});
```

## Ejercicio práctico: Generador de resumen del sistema

Vamos a crear un script que guarde en un archivo un resumen de tu sistema actual: sistema operativo, memoria libre, CPUs, directorio actual y fecha.

```jsx
// resumen.js
const fs = require("fs/promises");
const os = require("os");

async function generarResumen() {
  const resumen = `
🖥️ INFORME DEL SISTEMA
-------------------------
Sistema operativo: ${os.platform()}
Memoria libre: ${Math.round(os.freemem() / 1024 / 1024)} MB
Número de CPUs: ${os.cpus().length}
Directorio actual: ${process.cwd()}
Fecha: ${new Date().toLocaleString()}
`;

  await fs.writeFile("./informe.txt", resumen);
  console.log("✅ Informe guardado como 'informe.txt'");
}

generarResumen();
```

Ejecuta con:

```bash
node resumen.js
```

Y revisa el archivo generado.

## Conclusión

En este módulo has aprendido a interactuar con el sistema de archivos y el entorno del sistema operativo desde Node.js. Estas habilidades son fundamentales para crear aplicaciones de línea de comandos, generadores de contenido, sistemas de logging, tareas programadas o incluso servidores que manejan archivos de usuario.

## Recursos adicionales

- [Documentación oficial de fs/promises](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options)
- [Documentación de path](https://nodejs.org/api/path.html)
- [Documentación de os](https://nodejs.org/api/os.html)
