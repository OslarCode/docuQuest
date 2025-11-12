# Manejo del sistema de archivos con Node.js ES Modules

Node.js proporciona capacidades completas para interactuar con el sistema de archivos a través del módulo `fs` (file system). Este módulo permite realizar operaciones como lectura, escritura, modificación y eliminación de archivos y directorios.

## Configuración Inicial para ES Modules

Para utilizar ES Modules en Node.js, es necesario configurar el proyecto adecuadamente:

**package.json**

```json
{
  "type": "module",
  "name": "proyecto-fs",
  "version": "1.0.0"
}
```

## Importación del Módulo fs

El módulo fs ofrece dos APIs: la basada en callbacks y la basada en promesas. Para ES Modules, utilizaremos la versión de promesas:

```jsx
// Importar la versión basada en promesas de fs
import fs from "fs/promises";
```

## Operaciones Básicas con Archivos

### Lectura de Archivos de Texto

```jsx
import fs from "fs/promises";

async function leerArchivoTexto() {
  try {
    // Leer un archivo de texto con codificación UTF-8
    const contenido = await fs.readFile("./documento.txt", "utf8");
    console.log("Contenido del archivo:");
    console.log(contenido);
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
  }
}

leerArchivoTexto();
```

El segundo parámetro `'utf8'` especifica la codificación del archivo. Si se omite, se obtiene un objeto Buffer con los datos binarios.

### Lectura de Archivos Binarios

```jsx
import fs from "fs/promises";

async function leerArchivoBinario() {
  try {
    // Leer archivo sin especificar codificación (devuelve Buffer)
    const buffer = await fs.readFile("./imagen.jpg");
    console.log("Tamaño del archivo:", buffer.length, "bytes");
    console.log("Primeros bytes:", buffer.slice(0, 10));
  } catch (error) {
    console.error("Error al leer el archivo binario:", error.message);
  }
}

leerArchivoBinario();
```

### Escritura de Archivos

```jsx
import fs from "fs/promises";

async function crearArchivo() {
  try {
    // Escribir contenido en un nuevo archivo
    const contenido = "Este es el contenido del archivo creado con Node.js";
    await fs.writeFile("./nuevo-archivo.txt", contenido);
    console.log("Archivo creado exitosamente");
  } catch (error) {
    console.error("Error al crear el archivo:", error.message);
  }
}

crearArchivo();
```

Si el archivo ya existe, será sobrescrito completamente.

### Añadir Contenido a un Archivo Existente

```jsx
import fs from "fs/promises";

async function añadirLinea() {
  try {
    // Añadir contenido al final del archivo sin borrar el existente
    const nuevaLinea = "\\nEsta línea se añadió después";
    await fs.appendFile("./nuevo-archivo.txt", nuevaLinea);
    console.log("Línea añadida al archivo");
  } catch (error) {
    console.error("Error al añadir contenido:", error.message);
  }
}

añadirLinea();
```

Este método es ideal para archivos de log o registros donde se necesita preservar el contenido anterior.

## Verificación y Información de Archivos

### Verificar Existencia de Archivos

```jsx
import fs from "fs/promises";

async function verificarArchivo(ruta) {
  try {
    // Verificar si se puede acceder al archivo
    await fs.access(ruta);
    console.log(`El archivo ${ruta} existe y es accesible`);
    return true;
  } catch (error) {
    console.log(`El archivo ${ruta} no existe o no es accesible`);
    return false;
  }
}

verificarArchivo("./archivo-inexistente.txt");
```

### Obtener Información Detallada de Archivos

```jsx
import fs from "fs/promises";

async function obtenerInfoArchivo(ruta) {
  try {
    // Obtener estadísticas del archivo
    const stats = await fs.stat(ruta);

    console.log(`Información del archivo: ${ruta}`);
    console.log("Es archivo:", stats.isFile());
    console.log("Es directorio:", stats.isDirectory());
    console.log("Tamaño:", stats.size, "bytes");
    console.log("Creado:", stats.birthtime.toLocaleString());
    console.log("Última modificación:", stats.mtime.toLocaleString());
    console.log("Último acceso:", stats.atime.toLocaleString());
    console.log("Permisos:", stats.mode.toString(8));

    return stats;
  } catch (error) {
    console.error("Error al obtener información:", error.message);
    return null;
  }
}

obtenerInfoArchivo("./documento.txt");
```

## Operaciones con Directorios

### Creación de Directorios

```jsx
import fs from "fs/promises";

async function crearDirectorios() {
  try {
    // Crear un directorio simple
    await fs.mkdir("./mi-directorio");
    console.log("Directorio creado: ./mi-directorio");

    // Crear directorios anidados (crea todos los directorios padres necesarios)
    await fs.mkdir("./carpeta-padre/carpeta-hija/subcarpeta", {
      recursive: true,
    });
    console.log("Directorios anidados creados exitosamente");
  } catch (error) {
    console.error("Error al crear directorios:", error.message);
  }
}

crearDirectorios();
```

### Listar Contenido de Directorios

```jsx
import fs from "fs/promises";

async function listarDirectorio(ruta = "./") {
  try {
    // Leer todos los elementos del directorio
    const elementos = await fs.readdir(ruta, {
      withFileTypes: true, // Incluir información del tipo
    });

    console.log(`Contenido de ${ruta}:`);

    for (const elemento of elementos) {
      const tipo = elemento.isDirectory()
        ? "📁"
        : elemento.isFile()
        ? "📄"
        : elemento.isSymbolicLink()
        ? "🔗"
        : "?";

      console.log(`${tipo} ${elemento.name}`);
    }

    return elementos;
  } catch (error) {
    console.error("Error al listar directorio:", error.message);
    return [];
  }
}

listarDirectorio("./");
```

### Eliminación de Archivos y Directorios

```jsx
import fs from "fs/promises";

async function limpiarArchivos() {
  try {
    // Eliminar un archivo
    await fs.unlink("./archivo-temporal.txt");
    console.log("Archivo eliminado");

    // Eliminar directorio vacío
    await fs.rmdir("./directorio-vacio");
    console.log("Directorio vacío eliminado");

    // Eliminar directorio y todo su contenido (recursivo)
    await fs.rm("./directorio-con-contenido", {
      recursive: true,
      force: true,
    });
    console.log("Directorio y contenido eliminados");
  } catch (error) {
    console.error("Error en operaciones de limpieza:", error.message);
  }
}

// limpiarArchivos(); // Usar con precaución
```

## Trabajo con Rutas usando el Módulo Path

El módulo `path` es esencial para trabajar con rutas de manera segura y multiplataforma.

```jsx
import path from "path";
import { fileURLToPath } from "url";

// En ES Modules, necesitamos obtener __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function demostracionPath() {
  const rutaEjemplo = "/usuarios/proyecto/src/archivo.js";

  console.log("=== DEMOSTRACIÓN MÓDULO PATH ===");
  console.log("Directorio actual del script:", __dirname);
  console.log("Archivo actual del script:", __filename);

  // Unir rutas de forma segura
  const rutaCompleta = path.join(__dirname, "archivos", "documento.txt");
  console.log("Ruta unida:", rutaCompleta);

  // Resolver rutas absolutas
  const rutaAbsoluta = path.resolve("src", "components", "App.jsx");
  console.log("Ruta absoluta:", rutaAbsoluta);

  // Obtener diferentes partes de una ruta
  console.log("Nombre del archivo:", path.basename(rutaEjemplo));
  console.log("Nombre sin extensión:", path.basename(rutaEjemplo, ".js"));
  console.log("Directorio padre:", path.dirname(rutaEjemplo));
  console.log("Extensión:", path.extname(rutaEjemplo));

  // Parsear una ruta en sus componentes
  const partes = path.parse(rutaEjemplo);
  console.log("Partes de la ruta:", partes);
}

demostracionPath();
```

## Operaciones de Copia y Movimiento

### Copiar Archivos

```jsx
import fs from "fs/promises";

async function copiarArchivo(origen, destino) {
  try {
    // Copiar archivo
    await fs.copyFile(origen, destino);
    console.log(`Archivo copiado de ${origen} a ${destino}`);
  } catch (error) {
    console.error("Error al copiar archivo:", error.message);
  }
}

copiarArchivo("./original.txt", "./copia.txt");
```

### Renombrar y Mover Archivos

```jsx
import fs from "fs/promises";

async function renombrarArchivo() {
  try {
    // Renombrar un archivo (también puede moverlo entre directorios)
    await fs.rename("./viejo-nombre.txt", "./nuevo-nombre.txt");
    console.log("Archivo renombrado exitosamente");

    // Mover archivo a otro directorio
    await fs.rename("./archivo.txt", "./backups/archivo.txt");
    console.log("Archivo movido a directorio backups");
  } catch (error) {
    console.error("Error al renombrar/mover archivo:", error.message);
  }
}

renombrarArchivo();
```

## Manejo de Archivos Grandes con Streams

Para archivos de gran tamaño, es más eficiente usar streams en lugar de leer todo el contenido en memoria.

### Lectura con Streams

```jsx
import fs from "fs";
import { once } from "events";

async function leerArchivoGrande(rutaArchivo) {
  // Crear stream de lectura
  const streamLectura = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 64 * 1024, // Procesar en chunks de 64KB
  });

  try {
    let totalBytes = 0;
    let numeroChunks = 0;

    // Manejar eventos del stream
    streamLectura.on("data", (chunk) => {
      numeroChunks++;
      totalBytes += chunk.length;
      console.log(`Procesando chunk ${numeroChunks}: ${chunk.length} bytes`);

      // Aquí puedes procesar cada chunk según tus necesidades
      // Ejemplo: buscar texto, transformar datos, etc.
    });

    streamLectura.on("end", () => {
      console.log(
        `Lectura completada: ${numeroChunks} chunks, ${totalBytes} bytes total`
      );
    });

    streamLectura.on("error", (error) => {
      console.error("Error en la lectura:", error.message);
    });

    // Esperar a que el stream termine
    await once(streamLectura, "end");
  } catch (error) {
    console.error("Error en lectura por stream:", error.message);
  }
}

leerArchivoGrande("./archivo-grande.log");
```

### Escritura con Streams

```jsx
import fs from "fs";

async function escribirArchivoGrande(rutaDestino, lineas) {
  return new Promise((resolve, reject) => {
    // Crear stream de escritura
    const streamEscritura = fs.createWriteStream(rutaDestino, {
      encoding: "utf8",
    });

    streamEscritura.on("finish", () => {
      console.log("Escritura completada exitosamente");
      resolve();
    });

    streamEscritura.on("error", (error) => {
      console.error("Error en la escritura:", error.message);
      reject(error);
    });

    // Escribir datos línea por línea
    for (const linea of lineas) {
      const puedeContinuar = streamEscritura.write(linea + "\\n");

      // Controlar backpressure - pausar si el buffer está lleno
      if (!puedeContinuar) {
        // Esperar a que el buffer se vacíe
        streamEscritura.once("drain", () => {
          console.log("Buffer vaciado, continuando escritura...");
        });
      }
    }

    // Indicar que no hay más datos por escribir
    streamEscritura.end();
  });
}

// Ejemplo de uso
const lineas = Array.from({ length: 10000 }, (_, i) => `Línea ${i + 1}`);
escribirArchivoGrande("./archivo-grande-salida.txt", lineas);
```

## Ejemplo Práctico: Procesador de Archivos de Texto

Vamos a crear una utilidad completa para procesar archivos de texto:

```jsx
import fs from "fs/promises";
import path from "path";

class ProcesadorArchivos {
  constructor(directorioBase) {
    this.directorioBase = directorioBase;
  }

  async crearEstructura() {
    try {
      // Crear estructura de directorios
      const directorios = ["entrada", "procesados", "salida", "logs"];

      for (const dir of directorios) {
        await fs.mkdir(path.join(this.directorioBase, dir), {
          recursive: true,
        });
      }

      console.log("Estructura de directorios creada");
    } catch (error) {
      console.error("Error al crear estructura:", error.message);
    }
  }

  async procesarArchivosTexto() {
    try {
      const directorioEntrada = path.join(this.directorioBase, "entrada");
      const archivos = await fs.readdir(directorioEntrada);

      for (const archivo of archivos) {
        const rutaCompleta = path.join(directorioEntrada, archivo);
        const stats = await fs.stat(rutaCompleta);

        if (stats.isFile() && path.extname(archivo) === ".txt") {
          await this.procesarArchivoIndividual(rutaCompleta, archivo);
        }
      }
    } catch (error) {
      console.error("Error al procesar archivos:", error.message);
    }
  }

  async procesarArchivoIndividual(rutaArchivo, nombreArchivo) {
    try {
      // Leer el archivo
      const contenido = await fs.readFile(rutaArchivo, "utf8");

      // Realizar transformaciones
      const lineas = contenido.split("\\n");
      const lineasProcesadas = lineas.map((linea, indice) => {
        return `Línea ${indice + 1}: ${linea.trim().toUpperCase()}`;
      });

      const contenidoProcesado = lineasProcesadas.join("\\n");

      // Guardar archivo procesado
      const rutaSalida = path.join(
        this.directorioBase,
        "salida",
        `procesado_${nombreArchivo}`
      );

      await fs.writeFile(rutaSalida, contenidoProcesado);

      // Mover archivo original a procesados
      const rutaProcesados = path.join(
        this.directorioBase,
        "procesados",
        nombreArchivo
      );

      await fs.rename(rutaArchivo, rutaProcesados);

      console.log(`Archivo ${nombreArchivo} procesado exitosamente`);
    } catch (error) {
      console.error(`Error al procesar ${nombreArchivo}:`, error.message);

      // Registrar error en log
      await this.registrarError(nombreArchivo, error.message);
    }
  }

  async registrarError(nombreArchivo, mensajeError) {
    try {
      const logEntry = `[${new Date().toISOString()}] ERROR: ${nombreArchivo} - ${mensajeError}\\n`;
      const rutaLog = path.join(this.directorioBase, "logs", "errores.log");

      await fs.appendFile(rutaLog, logEntry);
    } catch (error) {
      console.error("Error al escribir en log:", error.message);
    }
  }

  async generarReporte() {
    try {
      const directorioSalida = path.join(this.directorioBase, "salida");
      const archivos = await fs.readdir(directorioSalida);

      const reporte = {
        fechaGeneracion: new Date().toISOString(),
        totalArchivosProcesados: archivos.length,
        archivos: archivos,
        tamañoTotal: 0,
      };

      // Calcular tamaño total
      for (const archivo of archivos) {
        const stats = await fs.stat(path.join(directorioSalida, archivo));
        reporte.tamañoTotal += stats.size;
      }

      // Guardar reporte
      const rutaReporte = path.join(this.directorioBase, "reporte.json");
      await fs.writeFile(rutaReporte, JSON.stringify(reporte, null, 2));

      console.log("Reporte generado exitosamente");
      return reporte;
    } catch (error) {
      console.error("Error al generar reporte:", error.message);
    }
  }
}

// Uso de la clase
async function ejemploUso() {
  const procesador = new ProcesadorArchivos("./mi-proyecto");

  await procesador.crearEstructura();
  await procesador.procesarArchivosTexto();
  await procesador.generarReporte();
}

// ejemploUso();
```

## Manejo de Permisos y Atributos

```jsx
import fs from "fs/promises";

async function manejarPermisos() {
  try {
    const archivo = "./archivo-ejemplo.txt";

    // Crear archivo de ejemplo
    await fs.writeFile(archivo, "Contenido de ejemplo");

    // Cambiar permisos (ejemplo: lectura y escritura para propietario)
    await fs.chmod(archivo, 0o600);
    console.log("Permisos cambiados a 600 (rw-------)");

    // Cambiar propietario (solo funciona en Unix y con permisos adecuados)
    // await fs.chown(archivo, 1000, 1000);

    // Obtener información actual de permisos
    const stats = await fs.stat(archivo);
    console.log("Permisos actuales:", stats.mode.toString(8));
  } catch (error) {
    console.error("Error en manejo de permisos:", error.message);
  }
}

manejarPermisos();
```

## Conclusión

El módulo de sistema de archivos de Node.js con ES Modules proporciona una API poderosa y moderna para trabajar con archivos y directorios. Las operaciones basadas en promesas permiten un código más limpio y legible usando `async/await`.

Los conceptos clave cubiertos incluyen:

- Lectura y escritura de archivos de texto y binarios
- Operaciones con directorios (creación, listado, eliminación)
- Uso del módulo `path` para manejo seguro de rutas
- Trabajo eficiente con archivos grandes mediante streams
- Operaciones avanzadas como copia, movimiento y cambio de permisos

Este conocimiento forma la base para construir aplicaciones que necesitan interactuar con el sistema de archivos, como herramientas de línea de comandos, procesadores de datos, servidores de archivos y sistemas de backup.
