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
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona versiones asíncronas basadas en Promises de las funciones de fs
// Esto permite usar async/await en lugar de callbacks
import fs from 'fs/promises';

// Función asíncrona para leer un archivo de texto
// Se declara como async para poder usar await dentro de ella
async function leerArchivoTexto() {
try {
// Leer un archivo de texto con codificación UTF-8
// fs.readFile() retorna una Promise que se resuelve con el contenido del archivo
// Parámetros:
// 1. './documento.txt' - Ruta del archivo a leer (relativa al directorio actual)
// 2. 'utf8' - Codificación del archivo (opcional, pero recomendado para texto)
const contenido = await fs.readFile('./documento.txt', 'utf8');

// Mostrar el contenido del archivo en la consola
console.log('Contenido del archivo:');
console.log(contenido);

} catch (error) {
// Manejo de errores: captura cualquier error que ocurra durante la lectura
console.error('Error al leer el archivo:', error.message);
}
}

// Ejecutar la función
leerArchivoTexto();

// ============================================================================
// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS
// ============================================================================

// EJEMPLO 1: LECTURA DE ARCHIVO SIN CODIFICACIÓN (Buffer)
async function leerArchivoComoBuffer() {
try {
// Si no se especifica codificación, readFile retorna un Buffer
// Buffer es un objeto que representa datos binarios en crudo
const buffer = await fs.readFile('./documento.txt');
console.log('Contenido como Buffer:', buffer);
console.log('Buffer convertido a string:', buffer.toString('utf8'));

} catch (error) {
console.error('Error:', error.message);
}
}

// EJEMPLO 2: LECTURA CON RUTA ABSOLUTA
async function leerConRutaAbsoluta() {
try {
// Usando path para construir rutas absolutas (más seguras)
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rutaAbsoluta = path.join(__dirname, 'documento.txt');
const contenido = await fs.readFile(rutaAbsoluta, 'utf8');
console.log('Archivo leído desde ruta absoluta:', contenido);

} catch (error) {
console.error('Error:', error.message);
}
}

// EJEMPLO 3: LECTURA CON DIFERENTES CODIFICACIONES
async function leerConDiferentesCodificaciones() {
try {
// UTF-8 (recomendado para texto)
const utf8 = await fs.readFile('./archivo.txt', 'utf8');

// ASCII (caracteres básicos en inglés)
const ascii = await fs.readFile('./archivo.txt', 'ascii');

// Base64 (útil para imágenes o datos binarios)
const base64 = await fs.readFile('./archivo.txt', 'base64');

// Hex (representación hexadecimal)
const hex = await fs.readFile('./archivo.txt', 'hex');

console.log('UTF-8:', utf8);
console.log('ASCII:', ascii);
console.log('Base64:', base64);
console.log('Hex:', hex);

} catch (error) {
console.error('Error:', error.message);
}
}

// EJEMPLO 4: LECTURA CON OPCIONES ADICIONALES
async function leerConOpciones() {
try {
// Usando objeto de opciones en lugar de parámetros simples
const contenido = await fs.readFile('./documento.txt', {
encoding: 'utf8',
flag: 'r' // 'r' = lectura (read)
});
console.log('Contenido con opciones:', contenido);

} catch (error) {
console.error('Error:', error.message);
}
}

// EJEMPLO 5: MANEJO ESPECÍFICO DE DIFERENTES ERRORES
async function leerConManejoEspecificoDeErrores() {
try {
const contenido = await fs.readFile('./documento.txt', 'utf8');
console.log('Contenido:', contenido);

} catch (error) {
// Manejar diferentes tipos de errores específicamente
if (error.code === 'ENOENT') {
console.error('❌ El archivo no existe:', error.path);
} else if (error.code === 'EACCES') {
console.error('❌ Permisos insuficientes para leer el archivo');
} else if (error.code === 'EISDIR') {
console.error('❌ La ruta especificada es un directorio, no un archivo');
} else {
console.error('❌ Error desconocido:', error.message);
}
}
}

// EJEMPLO 6: LECTURA DE ARCHIVOS JSON
async function leerArchivoJSON() {
try {
// Leer y parsear automáticamente un archivo JSON
const contenido = await fs.readFile('./config.json', 'utf8');
const datosJSON = JSON.parse(contenido);
console.log('Datos JSON:', datosJSON);

} catch (error) {
if (error.code === 'ENOENT') {
console.error('Archivo JSON no encontrado');
} else if (error instanceof SyntaxError) {
console.error('Error de sintaxis en el JSON:', error.message);
} else {
console.error('Error al leer JSON:', error.message);
}
}
}

// EJEMPLO 7: LECTURA EN LOTE DE MÚLTIPLES ARCHIVOS
async function leerMultiplesArchivos() {
try {
// Leer varios archivos simultáneamente usando Promise.all()
const [archivo1, archivo2, archivo3] = await Promise.all([
fs.readFile('./archivo1.txt', 'utf8'),
fs.readFile('./archivo2.txt', 'utf8'),
fs.readFile('./archivo3.txt', 'utf8')
]);

console.log('Archivo 1:', archivo1);
console.log('Archivo 2:', archivo2);
console.log('Archivo 3:', archivo3);

} catch (error) {
console.error('Error al leer archivos múltiples:', error.message);
}
}

// EJEMPLO 8: LECTURA CON VALIDACIÓN DE EXISTENCIA PREVIA
async function leerConValidacion() {
try {
// Verificar si el archivo existe antes de intentar leerlo
try {
await fs.access('./documento.txt');
console.log('✅ El archivo existe, procediendo a leer...');

const contenido = await fs.readFile('./documento.txt', 'utf8');
console.log('Contenido:', contenido);

} catch (accessError) {
if (accessError.code === 'ENOENT') {
console.log('⚠️  El archivo no existe, creando uno por defecto...');

// Crear archivo por defecto si no existe
await fs.writeFile('./documento.txt', 'Contenido por defecto\n', 'utf8');
console.log('✅ Archivo creado exitosamente');
} else {
throw accessError; // Relanzar otros errores
}
}

} catch (error) {
console.error('Error en validación:', error.message);
}
}

// EJEMPLO 9: LECTURA CON PROCESAMIENTO DE LÍNEAS
async function leerYProcesarLineas() {
try {
const contenido = await fs.readFile('./documento.txt', 'utf8');

// Dividir el contenido en líneas
const lineas = contenido.split('\n');

console.log(📄 El archivo tiene ${lineas.length} líneas:);

// Procesar cada línea
lineas.forEach((linea, indice) => {
if (linea.trim() !== '') { // Ignorar líneas vacías
console.log(Línea ${indice + 1}: ${linea.trim()});
}
});

} catch (error) {
console.error('Error al procesar líneas:', error.message);
}
}

// EJEMPLO 10: FUNCIÓN REUTILIZABLE PARA LECTURA DE ARCHIVOS
class LectorArchivos {
constructor(directorioBase = './') {
this.directorioBase = directorioBase;
}

async leer(nombreArchivo, codificacion = 'utf8') {
try {
const rutaCompleta = ${this.directorioBase}/${nombreArchivo};
const contenido = await fs.readFile(rutaCompleta, codificacion);
return {
exito: true,
contenido: contenido,
longitud: contenido.length
};
} catch (error) {
return {
exito: false,
error: error.message,
codigoError: error.code
};
}
}

async leerJSON(nombreArchivo) {
const resultado = await this.leer(nombreArchivo, 'utf8');

if (resultado.exito) {
try {
const datos = JSON.parse(resultado.contenido);
return { ...resultado, datos: datos };
} catch (parseError) {
return {
exito: false,
error: Error parseando JSON: ${parseError.message}
};
}
}

return resultado;
}
}

// USO DE LA CLASE LECTOR ARCHIVOS
async function usarLectorArchivos() {
const lector = new LectorArchivos('./');

// Leer archivo de texto normal
const resultadoTexto = await lector.leer('documento.txt');
if (resultadoTexto.exito) {
console.log('📖 Texto leído:', resultadoTexto.contenido);
} else {
console.error('❌ Error:', resultadoTexto.error);
}

// Leer archivo JSON
const resultadoJSON = await lector.leerJSON('config.json');
if (resultadoJSON.exito) {
console.log('📊 JSON leído:', resultadoJSON.datos);
} else {
console.error('❌ Error JSON:', resultadoJSON.error);
}
}

// ============================================================================
// EJECUTAR TODOS LOS EJEMPLOS
// ============================================================================

async function ejecutarEjemplos() {
console.log('🚀 INICIANDO EJEMPLOS DE LECTURA DE ARCHIVOS\n');

console.log('1. 📄 Ejemplo básico:');
await leerArchivoTexto();

console.log('\n2. 🔧 Ejemplo con manejo específico de errores:');
await leerConManejoEspecificoDeErrores();

console.log('\n3. 📊 Ejemplo con JSON:');
await leerArchivoJSON();

console.log('\n4. 📚 Ejemplo con procesamiento de líneas:');
await leerYProcesarLineas();

console.log('\n5. 🛠️  Ejemplo con clase LectorArchivos:');
await usarLectorArchivos();

console.log('\n✅ TODOS LOS EJEMPLOS COMPLETADOS');
}

// Descomentar para ejecutar todos los ejemplos:
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs/promises`**: Versión moderna con soporte para Promises/async-await
2. **`readFile()`**: Función asíncrona para leer archivos completos
3. **Codificación 'utf8'**: Especifica que el archivo es texto con codificación UTF-8
4. **Manejo de errores con try/catch**: Captura errores de forma elegante
5. **Await**: Espera a que la operación de lectura se complete

**ERRORES COMUNES MANEJADOS:**

- **ENOENT**: Archivo no existe
- **EACCES**: Permisos insuficientes
- **EISDIR**: La ruta es un directorio
- **SyntaxError**: JSON mal formado

Este código proporciona una base sólida para trabajar con archivos en Node.js de manera moderna y eficiente usando async/await.

### Lectura de Archivos Binarios

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises permite trabajar con archivos de manera asíncrona usando async/await
import fs from "fs/promises";

// Función asíncrona para leer un archivo binario
// Los archivos binarios son: imágenes, videos, PDFs, ejecutables, etc.
async function leerArchivoBinario() {
  try {
    // Leer archivo sin especificar codificación (devuelve Buffer)
    // Cuando no se especifica codificación, fs.readFile() retorna un Buffer
    // Buffer es un objeto de Node.js que representa datos binarios en crudo
    const buffer = await fs.readFile("./imagen.jpg");

    // Mostrar información sobre el buffer
    console.log("Tamaño del archivo:", buffer.length, "bytes");
    console.log("Primeros bytes:", buffer.slice(0, 10));
  } catch (error) {
    console.error("Error al leer el archivo binario:", error.message);
  }
}

// Ejecutar la función
leerArchivoBinario();

// ============================================================================
// EXPLICACIÓN DETALLADA SOBRE BUFFERS Y ARCHIVOS BINARIOS
// ============================================================================

// ¿QUÉ ES UN BUFFER?
// - Un Buffer es una representación de datos binarios en memoria
// - Similar a un array de bytes, pero optimizado para operaciones I/O
// - Cada elemento es un número entre 0-255 (1 byte)
// - No tiene codificación de caracteres

// EJEMPLO 1: ANÁLISIS DETALLADO DEL BUFFER
async function analizarBufferDetalladamente() {
  try {
    const buffer = await fs.readFile("./imagen.jpg");

    console.log("\n=== ANÁLISIS DETALLADO DEL BUFFER ===");
    console.log("Longitud total:", buffer.length, "bytes");
    console.log("Longitud en KB:", (buffer.length / 1024).toFixed(2), "KB");
    console.log(
      "Longitud en MB:",
      (buffer.length / (1024 * 1024)).toFixed(2),
      "MB"
    );

    // Verificar si es una imagen JPEG (empieza con FF D8 FF)
    const signature = buffer.slice(0, 3);
    console.log("Firma hexadecimal:", signature.toString("hex"));

    if (signature.toString("hex") === "ffd8ff") {
      console.log("✅ Es un archivo JPEG válido");
    }

    // Mostrar diferentes representaciones de los primeros bytes
    console.log("\nPrimeros 10 bytes en diferentes formatos:");
    console.log("Hexadecimal:", buffer.slice(0, 10).toString("hex"));
    console.log("Decimal:", Array.from(buffer.slice(0, 10)));
    console.log("Base64:", buffer.slice(0, 10).toString("base64"));
  } catch (error) {
    console.error("Error en análisis detallado:", error.message);
  }
}

// EJEMPLO 2: DETECCIÓN DE TIPO DE ARCHIVO POR FIRMA
async function detectarTipoArchivo() {
  try {
    const buffer = await fs.readFile("./imagen.jpg");
    const primerosBytes = buffer.slice(0, 8); // Primeros 8 bytes para la firma

    const firmasConocidas = {
      ffd8ffe0: "JPEG",
      "89504e47": "PNG",
      47494638: "GIF",
      25504446: "PDF",
      "504b0304": "ZIP",
      52494646: "WEBP",
      "49492a00": "TIFF",
      "4d4d002a": "TIFF (big-endian)",
    };

    const hexSignature = primerosBytes.toString("hex");
    console.log("\n=== DETECCIÓN DE TIPO DE ARCHIVO ===");
    console.log("Firma encontrada:", hexSignature);

    const tipo = firmasConocidas[hexSignature] || "Desconocido";
    console.log("Tipo detectado:", tipo);
  } catch (error) {
    console.error("Error en detección de tipo:", error.message);
  }
}

// EJEMPLO 3: LECTURA DE DIFERENTES TIPOS DE ARCHIVOS BINARIOS
async function leerDiferentesTiposBinarios() {
  const archivos = [
    "./imagen.jpg",
    "./documento.pdf",
    "./video.mp4",
    "./audio.mp3",
    "./archivo.zip",
  ];

  for (const archivo of archivos) {
    try {
      console.log(`\n=== PROCESANDO: ${archivo} ===`);

      // Verificar si el archivo existe antes de leerlo
      await fs.access(archivo);

      const buffer = await fs.readFile(archivo);
      console.log(
        `Tamaño: ${buffer.length} bytes (${(
          buffer.length /
          1024 /
          1024
        ).toFixed(2)} MB)`
      );

      // Mostrar firma mágica
      const signature = buffer.slice(0, 4).toString("hex");
      console.log(`Firma: ${signature}`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`❌ ${archivo} no existe`);
      } else {
        console.error(`Error con ${archivo}:`, error.message);
      }
    }
  }
}

// EJEMPLO 4: CONVERSIÓN DE BUFFER A DIFERENTES FORMATOS
async function convertirBufferFormatos() {
  try {
    const buffer = await fs.readFile("./imagen.jpg");

    console.log("\n=== CONVERSIONES DE BUFFER ===");

    // A Base64 (útil para Data URLs en web)
    const base64 = buffer.toString("base64");
    console.log(
      "Base64 (primeros 100 chars):",
      base64.substring(0, 100) + "..."
    );

    // A Hexadecimal
    const hex = buffer.toString("hex");
    console.log(
      "Hexadecimal (primeros 20 chars):",
      hex.substring(0, 20) + "..."
    );

    // A String (puede no ser legible para binario)
    const asString = buffer.toString("utf8");
    console.log(
      "Como string UTF-8 (primeros 50 chars):",
      asString.substring(0, 50)
    );

    // Array de números
    const array = Array.from(buffer.slice(0, 5));
    console.log("Como array de números:", array);
  } catch (error) {
    console.error("Error en conversiones:", error.message);
  }
}

// EJEMPLO 5: LECTURA POR PARTES (CHUNKS) - PARA ARCHIVOS MUY GRANDES
async function leerArchivoGrande() {
  try {
    // Para archivos muy grandes, es mejor leer por partes
    // Pero para este ejemplo, simulamos con un archivo normal

    const buffer = await fs.readFile("./imagen.jpg");

    console.log("\n=== LECTURA POR PARTES SIMULADA ===");
    console.log("Tamaño total:", buffer.length, "bytes");

    const chunkSize = 1024; // 1KB por chunk
    let offset = 0;
    let chunkNumber = 1;

    while (offset < buffer.length) {
      const chunk = buffer.slice(offset, offset + chunkSize);
      console.log(`Chunk ${chunkNumber}: ${chunk.length} bytes`);

      offset += chunkSize;
      chunkNumber++;

      // Solo mostrar primeros 5 chunks para no saturar la consola
      if (chunkNumber > 5) {
        console.log(
          `... y ${Math.ceil((buffer.length - offset) / chunkSize)} chunks más`
        );
        break;
      }
    }
  } catch (error) {
    console.error("Error en lectura por partes:", error.message);
  }
}

// EJEMPLO 6: COMPARACIÓN DE ARCHIVOS BINARIOS
async function compararArchivos() {
  try {
    const [buffer1, buffer2] = await Promise.all([
      fs.readFile("./imagen1.jpg"),
      fs.readFile("./imagen2.jpg"),
    ]);

    console.log("\n=== COMPARACIÓN DE ARCHIVOS ===");
    console.log("Archivo 1:", buffer1.length, "bytes");
    console.log("Archivo 2:", buffer2.length, "bytes");

    if (buffer1.length === buffer2.length) {
      console.log("✅ Mismo tamaño");

      // Comparar contenido byte por byte
      let diferencias = 0;
      for (let i = 0; i < buffer1.length; i++) {
        if (buffer1[i] !== buffer2[i]) {
          diferencias++;
        }
      }

      console.log(`Bytes diferentes: ${diferencias}`);
      console.log(
        `Similitud: ${((1 - diferencias / buffer1.length) * 100).toFixed(2)}%`
      );
    } else {
      console.log("❌ Tamaños diferentes");
    }
  } catch (error) {
    console.error("Error en comparación:", error.message);
  }
}

// EJEMPLO 7: MANIPULACIÓN DE BUFFER
async function manipularBuffer() {
  try {
    const buffer = await fs.readFile("./imagen.jpg");

    console.log("\n=== MANIPULACIÓN DE BUFFER ===");

    // Crear un nuevo buffer con modificación
    const nuevoBuffer = Buffer.alloc(buffer.length);
    buffer.copy(nuevoBuffer);

    // Modificar algunos bytes (esto podría corromper la imagen)
    nuevoBuffer[0] = 0x00; // Modificar primer byte

    console.log("Buffer original (primer byte):", buffer[0].toString(16));
    console.log(
      "Buffer modificado (primer byte):",
      nuevoBuffer[0].toString(16)
    );

    // Guardar el buffer modificado
    await fs.writeFile("./imagen_modificada.jpg", nuevoBuffer);
    console.log("✅ Archivo modificado guardado");
  } catch (error) {
    console.error("Error en manipulación:", error.message);
  }
}

// EJEMPLO 8: USO PRÁCTICO - CONVERSIÓN A DATA URL
async function crearDataURL() {
  try {
    const buffer = await fs.readFile("./imagen.jpg");

    // Convertir a Base64 para Data URL
    const base64 = buffer.toString("base64");
    const dataURL = `data:image/jpeg;base64,${base64}`;

    console.log("\n=== DATA URL GENERADA ===");
    console.log(
      "Data URL (primeros 100 chars):",
      dataURL.substring(0, 100) + "..."
    );
    console.log("Longitud total Data URL:", dataURL.length, "caracteres");

    // Esto sería útil para:
    // - Incrustar imágenes en HTML
    // - Enviar imágenes via APIs
    // - Almacenar en bases de datos
  } catch (error) {
    console.error("Error creando Data URL:", error.message);
  }
}

// EJEMPLO 9: CLASE PARA MANEJO DE ARCHIVOS BINARIOS
class ManejadorBinarios {
  constructor() {
    this.firmas = {
      ffd8ff: "image/jpeg",
      "89504e47": "image/png",
      47494638: "image/gif",
      25504446: "application/pdf",
      "504b0304": "application/zip",
    };
  }

  async analizarArchivo(ruta) {
    try {
      const buffer = await fs.readFile(ruta);
      const signature = buffer.slice(0, 4).toString("hex");

      return {
        ruta: ruta,
        tamaño: buffer.length,
        tipo: this.firmas[signature] || "desconocido",
        firma: signature,
        buffer: buffer,
      };
    } catch (error) {
      throw new Error(`Error analizando ${ruta}: ${error.message}`);
    }
  }

  async esMismoArchivo(ruta1, ruta2) {
    try {
      const [buffer1, buffer2] = await Promise.all([
        fs.readFile(ruta1),
        fs.readFile(ruta2),
      ]);

      return buffer1.equals(buffer2);
    } catch (error) {
      return false;
    }
  }
}

// USO DE LA CLASE MANEJADOR BINARIOS
async function usarManejadorBinarios() {
  const manejador = new ManejadorBinarios();

  try {
    const analisis = await manejador.analizarArchivo("./imagen.jpg");
    console.log("\n=== ANÁLISIS CON CLASE ===");
    console.log("Ruta:", analisis.ruta);
    console.log("Tamaño:", analisis.tamaño, "bytes");
    console.log("Tipo:", analisis.tipo);
    console.log("Firma:", analisis.firma);
  } catch (error) {
    console.error("Error con manejador:", error.message);
  }
}

// ============================================================================
// EJECUTAR TODOS LOS EJEMPLOS
// ============================================================================

async function ejecutarTodosLosEjemplos() {
  console.log("🚀 INICIANDO EJEMPLOS DE ARCHIVOS BINARIOS\n");

  await analizarBufferDetalladamente();
  await detectarTipoArchivo();
  await convertirBufferFormatos();
  await leerArchivoGrande();
  await crearDataURL();
  await usarManejadorBinarios();

  console.log("\n✅ TODOS LOS EJEMPLOS COMPLETADOS");
}

// Descomentar para ejecutar todos los ejemplos:
// ejecutarTodosLosEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`Buffer`**: Objeto que representa datos binarios en memoria
2. **Sin codificación**: Cuando no se especifica encoding, retorna Buffer
3. **Operaciones binarias**: Ideal para imágenes, PDFs, archivos comprimidos, etc.
4. **Métodos útiles**: `length`, `slice()`, `toString('hex')`, `toString('base64')`

**DIFERENCIAS CLAVE ENTRE TEXTO Y BINARIO:**

- **Texto**: Usa codificación (UTF-8, ASCII), retorna string
- **Binario**: Sin codificación, retorna Buffer

**USOS COMUNES DE ARCHIVOS BINARIOS:**

- Imágenes (JPEG, PNG, GIF)
- Documentos (PDF, DOCX)
- Archivos comprimidos (ZIP, RAR)
- Ejecutables y librerías
- Bases de datos
- Archivos de audio/video

Este código proporciona una base sólida para trabajar con archivos binarios en Node.js, esencial para aplicaciones que manejan uploads de archivos, procesamiento de imágenes, o cualquier operación que involucre datos no textuales.

### Escritura de Archivos

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para crear un archivo
// Se declara como async para poder usar await
async function crearArchivo() {
  try {
    // Escribir contenido en un nuevo archivo
    // fs.writeFile() crea un archivo nuevo o sobrescribe uno existente
    const contenido = "Este es el contenido del archivo creado con Node.js";

    // Parámetros de fs.writeFile():
    // 1. './nuevo-archivo.txt' - Ruta del archivo a crear
    // 2. contenido - Datos a escribir en el archivo
    // 3. encoding (opcional) - Por defecto es 'utf8' para strings
    await fs.writeFile("./nuevo-archivo.txt", contenido);

    console.log("✅ Archivo creado exitosamente");
  } catch (error) {
    console.error("❌ Error al crear el archivo:", error.message);
  }
}

// Ejecutar la función
crearArchivo();

// ============================================================================
// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS
// ============================================================================

// EJEMPLO 1: CREAR ARCHIVO CON CODIFICACIÓN EXPLÍCITA
async function crearArchivoConCodificacion() {
  try {
    const contenido = "Contenido con codificación UTF-8 explícita";

    // Especificar codificación UTF-8 explícitamente
    await fs.writeFile("./archivo-utf8.txt", contenido, "utf8");
    console.log("✅ Archivo UTF-8 creado");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 2: CREAR ARCHIVO CON OPCIONES ADICIONALES
async function crearArchivoConOpciones() {
  try {
    const contenido = "Contenido con opciones adicionales";

    // Usar objeto de opciones
    await fs.writeFile("./archivo-opciones.txt", contenido, {
      encoding: "utf8",
      mode: 0o666, // Permisos del archivo (lectura/escritura para todos)
      flag: "w", // 'w' = write (escritura, crea o sobrescribe)
    });

    console.log("✅ Archivo con opciones creado");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 3: CREAR ARCHIVO EN DIRECTORIO QUE NO EXISTE (CON ERROR)
async function crearArchivoEnDirectorioInexistente() {
  try {
    // Intentar crear archivo en directorio que no existe
    await fs.writeFile("./directorio-inexistente/archivo.txt", "contenido");
  } catch (error) {
    console.log("❌ Error esperado:", error.message);
    console.log("Código de error:", error.code); // ENOENT
  }
}

// EJEMPLO 4: CREAR DIRECTORIO PRIMERO Y LUEGO ARCHIVO
async function crearDirectorioYArchivo() {
  try {
    const directorio = "./mi-directorio";
    const archivo = `${directorio}/mi-archivo.txt`;
    const contenido = "Archivo creado después del directorio";

    // Crear directorio primero (con recursive: true para crear múltiples niveles)
    await fs.mkdir(directorio, { recursive: true });
    console.log("✅ Directorio creado");

    // Luego crear el archivo
    await fs.writeFile(archivo, contenido);
    console.log("✅ Archivo creado en el directorio");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 5: CREAR ARCHIVOS EN LOTE
async function crearMultiplesArchivos() {
  try {
    const archivos = [
      { nombre: "./archivo1.txt", contenido: "Contenido del archivo 1" },
      { nombre: "./archivo2.txt", contenido: "Contenido del archivo 2" },
      { nombre: "./archivo3.txt", contenido: "Contenido del archivo 3" },
    ];

    // Usar Promise.all() para crear múltiples archivos simultáneamente
    const promesas = archivos.map((archivo) =>
      fs.writeFile(archivo.nombre, archivo.contenido)
    );

    await Promise.all(promesas);
    console.log(`✅ ${archivos.length} archivos creados exitosamente`);
  } catch (error) {
    console.error("Error creando archivos múltiples:", error.message);
  }
}

// EJEMPLO 6: CREAR ARCHIVO CON CONTENIDO DINÁMICO
async function crearArchivoConContenidoDinamico() {
  try {
    const timestamp = new Date().toISOString();
    const contenido = `
# Archivo generado automáticamente
Fecha de creación: ${timestamp}
Usuario: ${process.env.USER || "desconocido"}
Directorio: ${process.cwd()}

Este archivo fue generado por un script de Node.js.
        `.trim();

    await fs.writeFile("./archivo-generado.md", contenido);
    console.log("✅ Archivo Markdown creado con contenido dinámico");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 7: CREAR ARCHIVO CON DATOS JSON
async function crearArchivoJSON() {
  try {
    const datos = {
      usuario: {
        nombre: "Ana García",
        email: "ana@ejemplo.com",
        activo: true,
        preferencias: {
          tema: "oscuro",
          idioma: "es",
        },
      },
      fechaCreacion: new Date().toISOString(),
      version: "1.0.0",
    };

    // Convertir objeto a JSON con formato legible
    const contenidoJSON = JSON.stringify(datos, null, 2);

    await fs.writeFile("./configuracion.json", contenidoJSON);
    console.log("✅ Archivo JSON creado con formato legible");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 8: CREAR ARCHIVO BINARIO
async function crearArchivoBinario() {
  try {
    // Crear un Buffer con datos binarios
    const buffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" en ASCII

    // Para archivos binarios, no especificar encoding
    await fs.writeFile("./archivo-binario.dat", buffer);
    console.log("✅ Archivo binario creado");

    // Verificar el contenido
    const contenidoLeido = await fs.readFile("./archivo-binario.dat");
    console.log("Contenido leído:", contenidoLeido.toString()); // "Hello"
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 9: CREAR ARCHIVO CON MODOS DE ESCRITURA DIFERENTES
async function crearArchivoConDiferentesFlags() {
  try {
    const archivo = "./archivo-flags.txt";

    // 'w' - Write: Crea nuevo o sobrescribe existente (por defecto)
    await fs.writeFile(archivo, "Contenido inicial\n", { flag: "w" });

    // 'a' - Append: Añade al final del archivo (no sobrescribe)
    await fs.writeFile(archivo, "Línea añadida\n", { flag: "a" });
    await fs.writeFile(archivo, "Otra línea más\n", { flag: "a" });

    console.log("✅ Archivo con append creado");

    // Leer para verificar
    const contenido = await fs.readFile(archivo, "utf8");
    console.log("Contenido final:");
    console.log(contenido);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 10: CREAR ARCHIVO CON MANEJO DE ERRORES ESPECÍFICOS
async function crearArchivoConManejoErrores() {
  try {
    const archivo = "./archivo-protegido.txt";

    // Intentar crear archivo
    await fs.writeFile(archivo, "contenido");
    console.log("✅ Archivo creado exitosamente");
  } catch (error) {
    // Manejar diferentes tipos de errores específicamente
    switch (error.code) {
      case "EACCES":
        console.error(
          "❌ Error de permisos: No tienes acceso para escribir en esta ubicación"
        );
        break;
      case "ENOENT":
        console.error("❌ Error de ruta: El directorio no existe");
        break;
      case "EISDIR":
        console.error(
          "❌ Error de tipo: La ruta especificada es un directorio"
        );
        break;
      case "ENOSPC":
        console.error(
          "❌ Error de espacio: No hay espacio disponible en el disco"
        );
        break;
      default:
        console.error("❌ Error desconocido:", error.message);
    }
  }
}

// EJEMPLO 11: CREAR ARCHIVO DE LOG CON TIMESTAMP
async function crearArchivoLog() {
  try {
    const logEntry = `[${new Date().toISOString()}] - Mensaje de log generado\n`;

    // Usar append para añadir al archivo de log
    await fs.writeFile("./app.log", logEntry, { flag: "a" });
    console.log("✅ Entrada de log añadida");
  } catch (error) {
    console.error("Error en log:", error.message);
  }
}

// EJEMPLO 12: CLASE PARA MANEJO DE ARCHIVOS DE TEXTO
class ManejadorArchivos {
  constructor(directorioBase = "./") {
    this.directorioBase = directorioBase;
  }

  async crear(nombreArchivo, contenido, opciones = {}) {
    try {
      const rutaCompleta = `${this.directorioBase}/${nombreArchivo}`;
      await fs.writeFile(rutaCompleta, contenido, {
        encoding: "utf8",
        ...opciones,
      });

      return {
        exito: true,
        ruta: rutaCompleta,
        tamaño: contenido.length,
      };
    } catch (error) {
      return {
        exito: false,
        error: error.message,
        codigo: error.code,
      };
    }
  }

  async crearJSON(nombreArchivo, datos, opciones = {}) {
    const contenido = JSON.stringify(datos, null, 2);
    return await this.crear(nombreArchivo, contenido, opciones);
  }

  async crearDesdeTemplate(nombreArchivo, template, variables = {}) {
    let contenido = template;

    // Reemplazar variables en el template
    Object.keys(variables).forEach((key) => {
      const valor = variables[key];
      contenido = contenido.replace(new RegExp(`{{${key}}}`, "g"), valor);
    });

    return await this.crear(nombreArchivo, contenido);
  }
}

// USO DE LA CLASE MANEJADOR ARCHIVOS
async function usarManejadorArchivos() {
  const manejador = new ManejadorArchivos("./archivos-generados");

  // Crear directorio primero
  await fs.mkdir("./archivos-generados", { recursive: true });

  // 1. Crear archivo de texto normal
  const resultado1 = await manejador.crear(
    "mi-archivo.txt",
    "Contenido de ejemplo"
  );
  console.log("Resultado 1:", resultado1.exito ? "✅ Éxito" : "❌ Error");

  // 2. Crear archivo JSON
  const resultado2 = await manejador.crearJSON("config.json", {
    app: "Mi Aplicación",
    version: "1.0.0",
    config: { tema: "oscuro" },
  });
  console.log("Resultado 2:", resultado2.exito ? "✅ Éxito" : "❌ Error");

  // 3. Crear archivo desde template
  const template = `
# {{nombre}}
Bienvenido a {{appName}}

Fecha: {{fecha}}
Usuario: {{usuario}}
    `.trim();

  const resultado3 = await manejador.crearDesdeTemplate("readme.md", template, {
    nombre: "Mi Proyecto",
    appName: "Aplicación Node.js",
    fecha: new Date().toISOString(),
    usuario: process.env.USER || "invitado",
  });
  console.log("Resultado 3:", resultado3.exito ? "✅ Éxito" : "❌ Error");
}

// EJEMPLO 13: CREAR ARCHIVO CON VALIDACIÓN DE SEGURIDAD
async function crearArchivoSeguro(ruta, contenido) {
  try {
    // Validar que la ruta no contenga patrones peligrosos
    const patronesPeligrosos = ["../", "~/", "/etc/", "/bin/"];
    const esSegura = !patronesPeligrosos.some((patron) =>
      ruta.includes(patron)
    );

    if (!esSegura) {
      throw new Error("Ruta no permitida por seguridad");
    }

    // Validar tamaño máximo del contenido (ej: 10MB)
    const maxTamaño = 10 * 1024 * 1024; // 10MB
    if (contenido.length > maxTamaño) {
      throw new Error("El contenido excede el tamaño máximo permitido");
    }

    await fs.writeFile(ruta, contenido);
    console.log("✅ Archivo creado de forma segura");
  } catch (error) {
    console.error("❌ Error de seguridad:", error.message);
  }
}

// ============================================================================
// EJECUTAR TODOS LOS EJEMPLOS
// ============================================================================

async function ejecutarTodosLosEjemplos() {
  console.log("INICIANDO EJEMPLOS DE CREACIÓN DE ARCHIVOS\n");

  await crearArchivoConCodificacion();
  await crearArchivoConOpciones();
  await crearDirectorioYArchivo();
  await crearMultiplesArchivos();
  await crearArchivoConContenidoDinamico();
  await crearArchivoJSON();
  await crearArchivoBinario();
  await crearArchivoConDiferentesFlags();
  await crearArchivoLog();
  await usarManejadorArchivos();
  await crearArchivoSeguro("./archivo-seguro.txt", "Contenido seguro");

  console.log("\nTODOS LOS EJEMPLOS COMPLETADOS");
}

// Descomentar para ejecutar todos los ejemplos:
// ejecutarTodosLosEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.writeFile()`**: Crea archivos nuevos o sobrescribe existentes
2. **Comportamiento por defecto**: Crea el archivo si no existe, lo sobrescribe si existe
3. **Codificación automática**: Strings se escriben como UTF-8 por defecto
4. **Manejo de errores**: Captura errores de permisos, rutas, etc.

**MODOS DE ESCRITURA (FLAGS):**

- **'w'**: Write - Crea o sobrescribe (por defecto)
- **'a'**: Append - Añade al final del archivo
- **'wx'**: Write exclusive - Falla si el archivo existe
- **'ax'**: Append exclusive - Falla si el archivo existe

**USOS COMUNES:**

- Generación de archivos de configuración
- Creación de logs
- Exportación de datos
- Generación de reportes
- Guardado de archivos subidos por usuarios

Este código proporciona una base sólida para trabajar con archivos en Node.js, desde operaciones simples hasta manejo avanzado con templates, JSON y validaciones de seguridad.

### Añadir Contenido a un Archivo Existente

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises permite trabajar con archivos de manera asíncrona usando async/await
import fs from "fs/promises";

// Función asíncrona para añadir contenido a un archivo existente
// appendFile() es específicamente para añadir contenido al final sin sobrescribir
async function añadirLinea() {
  try {
    // Añadir contenido al final del archivo sin borrar el existente
    // fs.appendFile() automáticamente abre el archivo en modo "append"
    const nuevaLinea = "\nEsta línea se añadió después";

    // Parámetros de fs.appendFile():
    // 1. './nuevo-archivo.txt' - Ruta del archivo
    // 2. nuevaLinea - Contenido a añadir al final
    // 3. encoding (opcional) - Por defecto es 'utf8' para strings
    await fs.appendFile("./nuevo-archivo.txt", nuevaLinea);

    console.log("✅ Línea añadida al archivo");
  } catch (error) {
    console.error("❌ Error al añadir contenido:", error.message);
  }
}

// Ejecutar la función
añadirLinea();

// ============================================================================
// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS
// ============================================================================

// EJEMPLO 1: AÑADIR CONTENIDO CON TIMESTAMP
async function añadirConTimestamp() {
  try {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] - Evento registrado\n`;

    await fs.appendFile("./registro.log", linea);
    console.log("Evento registrado con timestamp");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 2: AÑADIR MÚLTIPLES LÍNEAS
async function añadirMultiplesLineas() {
  try {
    const lineas = [
      "\n=== NUEVA SECCIÓN ===",
      "Línea 1 del nuevo contenido",
      "Línea 2 del nuevo contenido",
      "Línea 3 del nuevo contenido",
      "=== FIN SECCIÓN ===\n",
    ];

    // Unir todas las líneas con saltos de línea
    const contenido = lineas.join("\n");
    await fs.appendFile("./archivo-multilinea.txt", contenido);

    console.log("Múltiples líneas añadidas");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 3: AÑADIR CONTENIDO CON CODIFICACIÓN ESPECÍFICA
async function añadirConCodificacion() {
  try {
    const contenido = "\nContenido con codificación específica";

    // Especificar codificación explícitamente
    await fs.appendFile("./archivo-codificado.txt", contenido, "utf8");
    console.log("Contenido añadido con codificación UTF-8");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 4: AÑADIR CONTENIDO CON OPCIONES
async function añadirConOpciones() {
  try {
    const contenido = "\nLínea añadida con opciones";

    // Usar objeto de opciones (aunque appendFile tiene pocas opciones)
    await fs.appendFile("./archivo-opciones.txt", contenido, {
      encoding: "utf8",
      // Nota: appendFile no soporta 'flag' ya que siempre usa 'a'
    });

    console.log("Contenido añadido con opciones");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 5: CREAR ARCHIVO SI NO EXISTE CON APPEND
async function crearSiNoExiste() {
  try {
    // appendFile crea el archivo automáticamente si no existe
    const contenido = "Este es el primer contenido del archivo\n";
    await fs.appendFile("./archivo-nuevo.txt", contenido);

    console.log("Archivo creado (si no existía) y contenido añadido");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 6: SISTEMA DE LOGGING CON APPEND
async function sistemaLogging() {
  try {
    const niveles = ["INFO", "WARN", "ERROR"];
    const nivel = niveles[Math.floor(Math.random() * niveles.length)];
    const mensaje = "Este es un mensaje de log de ejemplo";
    const timestamp = new Date().toISOString();

    const entradaLog = `[${timestamp}] [${nivel}] ${mensaje}\n`;

    await fs.appendFile("./app.log", entradaLog);
    console.log(`Log ${nivel} registrado`);
  } catch (error) {
    console.error("Error en sistema de logging:", error.message);
  }
}

// EJEMPLO 7: AÑADIR CONTENIDO A ARCHIVO CSV
async function añadirDatosCSV() {
  try {
    const datos = [
      { nombre: "Ana García", edad: 28, ciudad: "Madrid" },
      { nombre: "Carlos López", edad: 32, ciudad: "Barcelona" },
      { nombre: "María Rodríguez", edad: 25, ciudad: "Valencia" },
    ];

    for (const persona of datos) {
      const lineaCSV = `\n${persona.nombre},${persona.edad},${persona.ciudad}`;
      await fs.appendFile("./datos.csv", lineaCSV);
    }

    console.log("Datos CSV añadidos al archivo");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// EJEMPLO 8: AÑADIR CONTENIDO CON VERIFICACIÓN PREVIA
async function añadirConVerificacion() {
  try {
    const archivo = "./archivo-verificado.txt";
    const nuevoContenido = "\nLínea verificada antes de añadir";

    // Verificar si el archivo existe antes de añadir
    try {
      await fs.access(archivo);
      console.log("Archivo existe, añadiendo contenido...");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log("Archivo no existe, creando con contenido inicial...");
        // Crear archivo con contenido inicial
        await fs.writeFile(archivo, "Contenido inicial\n");
      } else {
        throw error; // Relanzar otros errores
      }
    }

    // Añadir el nuevo contenido
    await fs.appendFile(archivo, nuevoContenido);
    console.log("Contenido añadido después de verificación");
  } catch (error) {
    console.error("Error en verificación:", error.message);
  }
}

// EJEMPLO 9: AÑADIR CONTENIDO EN LOTE (BATCH)
async function añadirEnLote() {
  try {
    const archivo = "./archivo-lote.txt";
    const lineas = Array.from({ length: 10 }, (_, i) => `Línea ${i + 1}\n`);

    console.log("Añadiendo 10 líneas en operación única...");

    // Añadir todas las líneas en una sola operación
    const contenidoLote = lineas.join("");
    await fs.appendFile(archivo, contenidoLote);

    console.log("✅ 10 líneas añadidas en lote");
  } catch (error) {
    console.error("Error en lote:", error.message);
  }
}

// EJEMPLO 10: AÑADIR CONTENIDO CON LÍMITE DE TAMAÑO
async function añadirConLimiteTamaño() {
  try {
    const archivo = "./archivo-limitado.txt";
    const nuevoContenido = "\nNueva línea de contenido";
    const maxTamaño = 1024; // 1KB máximo

    // Verificar tamaño actual del archivo
    let stats;
    try {
      stats = await fs.stat(archivo);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Archivo no existe, está bien
        stats = { size: 0 };
      } else {
        throw error;
      }
    }

    // Verificar que no exceda el límite
    const tamañoDespues =
      stats.size + Buffer.byteLength(nuevoContenido, "utf8");

    if (tamañoDespues > maxTamaño) {
      console.log("Límite de tamaño alcanzado, no se añade contenido");
      return;
    }

    await fs.appendFile(archivo, nuevoContenido);
    console.log("Contenido añadido (dentro del límite de tamaño)");
  } catch (error) {
    console.error("Error con límite:", error.message);
  }
}

// EJEMPLO 11: CLASE PARA MANEJO DE ARCHIVOS CON APPEND
class ManejadorAppend {
  constructor(archivoBase) {
    this.archivo = archivoBase;
  }

  async añadirLinea(contenido, addNewLine = true) {
    try {
      const texto = addNewLine ? `\n${contenido}` : contenido;
      await fs.appendFile(this.archivo, texto);

      return {
        exito: true,
        mensaje: "Línea añadida exitosamente",
      };
    } catch (error) {
      return {
        exito: false,
        error: error.message,
        codigo: error.code,
      };
    }
  }

  async añadirLineaConTimestamp(contenido) {
    const timestamp = new Date().toISOString();
    const lineaConTimestamp = `[${timestamp}] ${contenido}`;
    return await this.añadirLinea(lineaConTimestamp);
  }

  async añadirJSON(datos) {
    try {
      const lineaJSON = `\n${JSON.stringify(datos)}`;
      await fs.appendFile(this.archivo, lineaJSON);

      return { exito: true };
    } catch (error) {
      return {
        exito: false,
        error: error.message,
      };
    }
  }

  async obtenerEstadisticas() {
    try {
      const stats = await fs.stat(this.archivo);
      const contenido = await fs.readFile(this.archivo, "utf8");
      const lineas = contenido.split("\n").filter((line) => line.trim() !== "");

      return {
        tamaño: stats.size,
        lineas: lineas.length,
        ultimaModificacion: stats.mtime,
      };
    } catch (error) {
      if (error.code === "ENOENT") {
        return { tamaño: 0, lineas: 0, ultimaModificacion: null };
      }
      throw error;
    }
  }
}

// USO DE LA CLASE MANEJADOR APPEND
async function usarManejadorAppend() {
  const manejador = new ManejadorAppend("./archivo-manejado.txt");

  // Añadir algunas líneas
  await manejador.añadirLinea("Primera línea");
  await manejador.añadirLineaConTimestamp("Evento importante");
  await manejador.añadirJSON({ usuario: "ana", accion: "login" });

  // Obtener estadísticas
  const stats = await manejador.obtenerEstadisticas();
  console.log("Estadísticas del archivo:");
  console.log("- Tamaño:", stats.tamaño, "bytes");
  console.log("- Líneas:", stats.lineas);
  console.log("- Última modificación:", stats.ultimaModificacion);
}

// EJEMPLO 12: COMPARACIÓN ENTRE APPENDFILE Y WRITEFILE CON FLAG 'a'
async function comparacionAppendVsWrite() {
  try {
    const contenido = "\nLínea de prueba";

    // Método 1: Usando appendFile (recomendado para añadir)
    await fs.appendFile("./archivo-append.txt", contenido);
    console.log("✅ appendFile completado");

    // Método 2: Usando writeFile con flag 'a' (mismo resultado)
    await fs.writeFile("./archivo-write-flag.txt", contenido, { flag: "a" });
    console.log('✅ writeFile con flag "a" completado');

    console.log(
      "Ambos métodos producen el mismo resultado para añadir contenido"
    );
  } catch (error) {
    console.error("Error en comparación:", error.message);
  }
}

// EJEMPLO 13: SISTEMA DE REGISTRO DE ACTIVIDAD
async function sistemaRegistroActividad() {
  try {
    const actividades = [
      "Usuario inició sesión",
      "Archivo subido exitosamente",
      "Configuración actualizada",
      "Reporte generado",
      "Usuario cerró sesión",
    ];

    for (const actividad of actividades) {
      const timestamp = new Date().toLocaleString("es-ES");
      const registro = `[${timestamp}] ${actividad}\n`;

      await fs.appendFile("./actividad.log", registro);

      // Simular delay entre actividades
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("Registro de actividades completado");

    // Mostrar el contenido del log
    const contenido = await fs.readFile("./actividad.log", "utf8");
    console.log("\nContenido del log de actividades:");
    console.log(contenido);
  } catch (error) {
    console.error("Error en registro de actividades:", error.message);
  }
}

// ============================================================================
// EJECUTAR TODOS LOS EJEMPLOS
// ============================================================================

async function ejecutarTodosLosEjemplos() {
  console.log("INICIANDO EJEMPLOS DE APPEND FILE\n");

  await añadirConTimestamp();
  await añadirMultiplesLineas();
  await crearSiNoExiste();
  await sistemaLogging();
  await añadirDatosCSV();
  await añadirConVerificacion();
  await añadirEnLote();
  await añadirConLimiteTamaño();
  await usarManejadorAppend();
  await comparacionAppendVsWrite();
  await sistemaRegistroActividad();

  console.log("\nTODOS LOS EJEMPLOS COMPLETADOS");
}

// Descomentar para ejecutar todos los ejemplos:
// ejecutarTodosLosEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.appendFile()`**: Añade contenido al final del archivo sin borrar lo existente
2. **Creación automática**: Si el archivo no existe, lo crea automáticamente
3. **Modo append**: Siempre trabaja en modo "añadir" (equivalente a flag 'a')
4. **Eficiente**: Ideal para logs y registros donde se acumula información

**DIFERENCIAS CLAVE CON `writeFile()`:**

- **`appendFile`**: Añade al final, preserva contenido existente
- **`writeFile`**: Sobrescribe todo el contenido (a menos que uses flag 'a')

**USOS COMUNES DE APPENDFILE:**

- **Sistemas de logging**: Añadir entradas de log
- **Registros de actividad**: Trackear eventos en tiempo real
- **Recolección de datos**: Acumular datos de sensores o métricas
- **Archivos de configuración**: Añadir nuevas configuraciones
- **Archivos CSV**: Añadir nuevas filas de datos

**VENTAJAS:**

- **No destructivo**: Preserva el contenido existente
- **Automático**: Crea el archivo si no existe
- **Simple**: Una función para añadir contenido
- **Eficiente**: Buen performance para operaciones de añadir

Este código muestra cómo usar `appendFile()` efectivamente para escenarios donde necesitas acumular información en archivos sin perder el contenido previo.

## Verificación y Información de Archivos

### Verificar Existencia de Archivos

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para verificar la existencia y accesibilidad de un archivo
// fs.access() verifica los permisos del proceso actual para el archivo/directorio
async function verificarArchivo(ruta) {
  try {
    // Verificar si se puede acceder al archivo
    // fs.access() lanza un error si el archivo no existe o no se puede acceder
    // Por defecto verifica el permiso de lectura (fs.constants.R_OK)
    await fs.access(ruta);

    console.log(`El archivo ${ruta} existe y es accesible`);
    return true;
  } catch (error) {
    // Si fs.access() lanza un error, significa que el archivo no existe o no es accesible
    console.log(`El archivo ${ruta} no existe o no es accesible`);
    return false;
  }
}

// Ejecutar la función con un archivo que probablemente no existe
verificarArchivo("./archivo-inexistente.txt");

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: VERIFICACIÓN CON DIFERENTES PERMISOS
async function verificarPermisosDetallados(ruta) {
  try {
    // Verificar permisos específicos usando fs.constants
    // F_OK - Verifica que el archivo existe
    // R_OK - Verifica que el archivo puede ser leído
    // W_OK - Verifica que el archivo puede ser escrito
    // X_OK - Verifica que el archivo puede ser ejecutado

    await fs.access(ruta, fs.constants.F_OK);
    console.log(`El archivo ${ruta} existe`);

    await fs.access(ruta, fs.constants.R_OK);
    console.log(`El archivo ${ruta} puede ser leído`);

    await fs.access(ruta, fs.constants.W_OK);
    console.log(`El archivo ${ruta} puede ser escrito`);

    // Para directorios, X_OK verifica que puede ser accedido (no ejecutado)
    await fs.access(ruta, fs.constants.X_OK);
    console.log(`El archivo ${ruta} puede ser ejecutado/accedido`);

    return true;
  } catch (error) {
    console.log(`Error de acceso para ${ruta}: ${error.message}`);
    return false;
  }
}

// EJEMPLO 2: VERIFICACIÓN COMBINANDO MÚLTIPLES PERMISOS
async function verificarPermisosCombinados(ruta) {
  try {
    // Verificar múltiples permisos simultáneamente usando OR bit a bit
    // Esto verifica que el archivo existe Y puede ser leído Y escrito
    await fs.access(
      ruta,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK
    );
    console.log(`El archivo ${ruta} existe, puede leerse y escribirse`);
    return true;
  } catch (error) {
    console.log(
      `El archivo ${ruta} no tiene los permisos requeridos: ${error.message}`
    );
    return false;
  }
}

// EJEMPLO 3: VERIFICACIÓN CON MANEJO ESPECÍFICO DE ERRORES
async function verificarConManejoErroresEspecifico(ruta) {
  try {
    await fs.access(ruta);
    console.log(`El archivo ${ruta} es accesible`);
    return true;
  } catch (error) {
    // Manejar diferentes tipos de errores específicamente
    switch (error.code) {
      case "ENOENT":
        console.log(`El archivo ${ruta} no existe`);
        break;
      case "EACCES":
        console.log(`Permiso denegado para acceder a ${ruta}`);
        break;
      case "EPERM":
        console.log(`Operación no permitida en ${ruta}`);
        break;
      case "ENOTDIR":
        console.log(`Un componente de la ruta no es un directorio`);
        break;
      case "ENAMETOOLONG":
        console.log(`La ruta es demasiado larga`);
        break;
      default:
        console.log(`Error desconocido al acceder a ${ruta}: ${error.message}`);
    }
    return false;
  }
}

// EJEMPLO 4: VERIFICAR SI ES ARCHIVO O DIRECTORIO
async function verificarTipo(ruta) {
  try {
    // Usar fs.stat() para obtener información detallada
    const stats = await fs.stat(ruta);

    if (stats.isFile()) {
      console.log(`${ruta} es un archivo`);
      console.log(`Tamaño: ${stats.size} bytes`);
      console.log(`Creado: ${stats.birthtime}`);
      console.log(`Modificado: ${stats.mtime}`);
    } else if (stats.isDirectory()) {
      console.log(`${ruta} es un directorio`);
    } else if (stats.isSymbolicLink()) {
      console.log(`${ruta} es un enlace simbólico`);
    }

    return stats;
  } catch (error) {
    console.log(`No se pudo obtener información de ${ruta}: ${error.message}`);
    return null;
  }
}

// EJEMPLO 5: FUNCIÓN REUTILIZABLE PARA VERIFICACIÓN DE ARCHIVOS
class VerificadorArchivos {
  constructor() {
    this.permisos = fs.constants;
  }

  async existe(ruta) {
    try {
      await fs.access(ruta, this.permisos.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  async puedeLeer(ruta) {
    try {
      await fs.access(ruta, this.permisos.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  async puedeEscribir(ruta) {
    try {
      await fs.access(ruta, this.permisos.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  async puedeEjecutar(ruta) {
    try {
      await fs.access(ruta, this.permisos.X_OK);
      return true;
    } catch {
      return false;
    }
  }

  async obtenerInformacionCompleta(ruta) {
    try {
      const stats = await fs.stat(ruta);

      return {
        existe: true,
        esArchivo: stats.isFile(),
        esDirectorio: stats.isDirectory(),
        esEnlaceSimbolico: stats.isSymbolicLink(),
        tamaño: stats.size,
        creado: stats.birthtime,
        modificado: stats.mtime,
        puedeLeer: await this.puedeLeer(ruta),
        puedeEscribir: await this.puedeEscribir(ruta),
        puedeEjecutar: await this.puedeEjecutar(ruta),
      };
    } catch (error) {
      return {
        existe: false,
        error: error.message,
        codigoError: error.code,
      };
    }
  }
}

// EJEMPLO 6: USO PRÁCTICO - VERIFICAR ANTES DE LEER
async function leerArchivoSeguro(ruta) {
  // Verificar que el archivo existe y puede leerse antes de intentar leerlo
  const verificador = new VerificadorArchivos();

  if (!(await verificador.existe(ruta))) {
    console.log(`No se puede leer ${ruta} porque no existe`);
    return null;
  }

  if (!(await verificador.puedeLeer(ruta))) {
    console.log(`No se puede leer ${ruta} por falta de permisos`);
    return null;
  }

  try {
    const contenido = await fs.readFile(ruta, "utf8");
    console.log(`Archivo ${ruta} leído exitosamente`);
    return contenido;
  } catch (error) {
    console.log(`Error inesperado al leer ${ruta}: ${error.message}`);
    return null;
  }
}

// EJEMPLO 7: VERIFICACIÓN DE MÚLTIPLES ARCHIVOS
async function verificarMultiplesArchivos(rutas) {
  const resultados = {};

  for (const ruta of rutas) {
    try {
      await fs.access(ruta);
      resultados[ruta] = { existe: true, accesible: true };
    } catch (error) {
      resultados[ruta] = {
        existe: false,
        accesible: false,
        error: error.message,
        codigo: error.code,
      };
    }
  }

  return resultados;
}

// EJEMPLO 8: VERIFICACIÓN CON RECURSIVIDAD PARA DIRECTORIOS
async function verificarEstructuraDirectorio(directorio) {
  try {
    // Verificar que el directorio existe
    await fs.access(directorio);

    // Leer el contenido del directorio
    const elementos = await fs.readdir(directorio);

    const estructura = {
      directorio: directorio,
      existe: true,
      elementos: [],
    };

    for (const elemento of elementos) {
      const rutaCompleta = `${directorio}/${elemento}`;
      const stats = await fs.stat(rutaCompleta);

      estructura.elementos.push({
        nombre: elemento,
        esArchivo: stats.isFile(),
        esDirectorio: stats.isDirectory(),
        tamaño: stats.size,
        modificado: stats.mtime,
      });
    }

    return estructura;
  } catch (error) {
    return {
      directorio: directorio,
      existe: false,
      error: error.message,
    };
  }
}

// EJEMPLO 9: DIFERENCIA ENTRE fs.access() Y fs.stat()
async function compararAccessVsStat(ruta) {
  console.log(`Comparando métodos para: ${ruta}`);

  // fs.access() - Solo verifica permisos, más rápido
  try {
    await fs.access(ruta);
    console.log("fs.access(): El archivo es accesible");
  } catch (error) {
    console.log(`fs.access(): ${error.message}`);
  }

  // fs.stat() - Obtiene información completa, más lento pero más detallado
  try {
    const stats = await fs.stat(ruta);
    console.log(`fs.stat(): Existe, tamaño: ${stats.size} bytes`);
  } catch (error) {
    console.log(`fs.stat(): ${error.message}`);
  }
}

// EJEMPLO 10: USO EN CASO REAL - CONFIGURACIÓN DE APLICACIÓN
async function cargarConfiguracion(rutaConfig) {
  const verificador = new VerificadorArchivos();

  // Verificar si el archivo de configuración existe
  if (!(await verificador.existe(rutaConfig))) {
    console.log(
      `Archivo de configuración ${rutaConfig} no encontrado, usando valores por defecto`
    );
    return { usarValoresPorDefecto: true };
  }

  // Verificar permisos de lectura
  if (!(await verificador.puedeLeer(rutaConfig))) {
    console.log(
      `Sin permisos para leer ${rutaConfig}, usando valores por defecto`
    );
    return { usarValoresPorDefecto: true };
  }

  try {
    // Cargar la configuración
    const contenido = await fs.readFile(rutaConfig, "utf8");
    const configuracion = JSON.parse(contenido);
    console.log(`Configuración cargada desde ${rutaConfig}`);
    return configuracion;
  } catch (error) {
    console.log(`Error al cargar configuración: ${error.message}`);
    return { usarValoresPorDefecto: true, error: error.message };
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE VERIFICACIÓN DE ARCHIVOS ===");

  // Ejemplo básico
  await verificarArchivo("./archivo-inexistente.txt");
  await verificarArchivo("./package.json"); // Este debería existir

  // Ejemplos avanzados
  await verificarPermisosDetallados("./package.json");
  await verificarConManejoErroresEspecifico("./archivo-inexistente.txt");
  await verificarTipo("./");

  // Usar la clase verificadora
  const verificador = new VerificadorArchivos();
  const info = await verificador.obtenerInformacionCompleta("./package.json");
  console.log("Información completa:", info);

  // Comparar métodos
  await compararAccessVsStat("./package.json");
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.access()`**: Verifica permisos de acceso a archivos/directorios
2. **Comportamiento**: Lanza error si no se puede acceder, no lanza error si es accesible
3. **Permisos disponibles**:
   - `fs.constants.F_OK` - Verifica existencia
   - `fs.constants.R_OK` - Verifica permiso de lectura
   - `fs.constants.W_OK` - Verifica permiso de escritura
   - `fs.constants.X_OK` - Verifica permiso de ejecución

**DIFERENCIAS CLAVE:**

- **`fs.access()`**: Solo verifica permisos, más rápido
- **`fs.stat()`**: Obtiene información completa (tamaño, fechas, etc.), más lento

**USOS COMUNES:**

- Validar existencia de archivos antes de operaciones
- Verificar permisos antes de leer/escribir
- Verificar requisitos de aplicación (archivos de configuración, etc.)
- Manejo condicional basado en disponibilidad de archivos

Este código proporciona una base sólida para verificar archivos de manera segura antes de realizar operaciones, previniendo errores y mejorando la robustez de las aplicaciones.

### Obtener Información Detallada de Archivos

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para obtener información detallada de un archivo o directorio
// fs.stat() retorna un objeto Stats con información completa sobre el sistema de archivos
async function obtenerInfoArchivo(ruta) {
  try {
    // Obtener estadísticas del archivo
    // fs.stat() retorna un objeto Stats con metadatos del archivo/directorio
    const stats = await fs.stat(ruta);

    // Mostrar información detallada del archivo
    console.log(`Información del archivo: ${ruta}`);

    // Verificar el tipo de elemento del sistema de archivos
    console.log("Es archivo:", stats.isFile());
    console.log("Es directorio:", stats.isDirectory());
    console.log("Es enlace simbólico:", stats.isSymbolicLink());
    console.log("Es bloque de dispositivo:", stats.isBlockDevice());
    console.log("Es carácter de dispositivo:", stats.isCharacterDevice());
    console.log("Es FIFO/pipe:", stats.isFIFO());
    console.log("Es socket:", stats.isSocket());

    // Información de tamaño
    console.log("Tamaño:", stats.size, "bytes");
    console.log("Tamaño en KB:", (stats.size / 1024).toFixed(2), "KB");
    console.log("Tamaño en MB:", (stats.size / (1024 * 1024)).toFixed(2), "MB");

    // Información de fechas y tiempos
    console.log("Creado:", stats.birthtime.toLocaleString());
    console.log("Última modificación:", stats.mtime.toLocaleString());
    console.log("Último acceso:", stats.atime.toLocaleString());
    console.log("Último cambio de metadatos:", stats.ctime.toLocaleString());

    // Información de permisos (en octal, formato estándar Unix)
    console.log("Permisos:", stats.mode.toString(8));

    // Información adicional disponible en el objeto Stats
    console.log("UID del propietario:", stats.uid);
    console.log("GID del grupo:", stats.gid);
    console.log("Número de bloques asignados:", stats.blocks);
    console.log("Tamaño del bloque:", stats.blksize);

    // También disponible: stats.dev, stats.ino, stats.nlink, stats.rdev

    return stats;
  } catch (error) {
    console.error("Error al obtener información:", error.message);
    return null;
  }
}

// Ejecutar la función
obtenerInfoArchivo("./documento.txt");

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: OBTENER INFORMACIÓN DE MÚLTIPLES ARCHIVOS
async function obtenerInfoMultiplesArchivos(rutas) {
  const resultados = [];

  for (const ruta of rutas) {
    try {
      const stats = await fs.stat(ruta);
      resultados.push({
        ruta: ruta,
        existe: true,
        esArchivo: stats.isFile(),
        esDirectorio: stats.isDirectory(),
        tamaño: stats.size,
        modificado: stats.mtime,
      });
    } catch (error) {
      resultados.push({
        ruta: ruta,
        existe: false,
        error: error.message,
      });
    }
  }

  return resultados;
}

// EJEMPLO 2: ANÁLISIS DETALLADO DE PERMISOS
function analizarPermisos(stats) {
  // Los permisos en Unix se representan como un número octal
  // Ejemplo: 0o100644 (archivo regular con permisos 644)
  // Los últimos 3 dígitos representan: propietario, grupo, otros

  const modo = stats.mode;
  const modoOctal = modo.toString(8);

  console.log("Análisis detallado de permisos:");
  console.log("Modo completo (octal):", modoOctal);
  console.log("Permisos simplificados:", modoOctal.slice(-3));

  // Extraer los últimos 3 dígitos para permisos de usuario/grupo/otros
  const permisos = modoOctal.slice(-3);
  const [usuario, grupo, otros] = permisos.split("").map(Number);

  console.log("Permisos del propietario:", usuario);
  console.log("Permisos del grupo:", grupo);
  console.log("Permisos para otros:", otros);

  // Función para interpretar permisos numéricos
  function interpretarPermisos(numero) {
    const binario = numero.toString(2).padStart(3, "0");
    return {
      lectura: binario[0] === "1",
      escritura: binario[1] === "1",
      ejecucion: binario[2] === "1",
    };
  }

  console.log("Propietario puede:", interpretarPermisos(usuario));
  console.log("Grupo puede:", interpretarPermisos(grupo));
  console.log("Otros pueden:", interpretarPermisos(otros));
}

// EJEMPLO 3: MONITOREO DE CAMBIOS EN ARCHIVOS
async function monitorearCambios(ruta, intervaloMs = 5000) {
  let ultimoTamaño = 0;
  let ultimaModificacion = null;

  const intervalo = setInterval(async () => {
    try {
      const stats = await fs.stat(ruta);

      if (
        stats.size !== ultimoTamaño ||
        ultimaModificacion === null ||
        stats.mtime.getTime() !== ultimaModificacion.getTime()
      ) {
        console.log(`Cambio detectado en ${ruta}:`);
        console.log(`  Tamaño: ${ultimoTamaño} -> ${stats.size} bytes`);
        console.log(`  Modificado: ${stats.mtime.toLocaleString()}`);

        ultimoTamaño = stats.size;
        ultimaModificacion = stats.mtime;
      }
    } catch (error) {
      console.log(`Error monitoreando ${ruta}:`, error.message);
      clearInterval(intervalo);
    }
  }, intervaloMs);

  return intervalo;
}

// EJEMPLO 4: CLASE PARA GESTIÓN DE METADATOS DE ARCHIVOS
class GestorMetadatos {
  constructor() {
    this.cache = new Map();
  }

  async obtenerMetadatos(ruta) {
    try {
      const stats = await fs.stat(ruta);

      const metadatos = {
        ruta: ruta,
        nombre: ruta.split("/").pop(),
        tipo: this.obtenerTipo(stats),
        tamaño: stats.size,
        tamañoLegible: this.formatearTamaño(stats.size),
        creado: stats.birthtime,
        modificado: stats.mtime,
        accedido: stats.atime,
        permisos: stats.mode.toString(8),
        propietario: stats.uid,
        grupo: stats.gid,
        inodo: stats.ino,
      };

      // Guardar en cache
      this.cache.set(ruta, metadatos);

      return metadatos;
    } catch (error) {
      return {
        ruta: ruta,
        error: error.message,
        codigoError: error.code,
      };
    }
  }

  obtenerTipo(stats) {
    if (stats.isFile()) return "archivo";
    if (stats.isDirectory()) return "directorio";
    if (stats.isSymbolicLink()) return "enlace_simbolico";
    if (stats.isBlockDevice()) return "dispositivo_bloque";
    if (stats.isCharacterDevice()) return "dispositivo_caracter";
    if (stats.isFIFO()) return "fifo";
    if (stats.isSocket()) return "socket";
    return "desconocido";
  }

  formatearTamaño(bytes) {
    const unidades = ["B", "KB", "MB", "GB", "TB"];
    let tamaño = bytes;
    let unidadIndex = 0;

    while (tamaño >= 1024 && unidadIndex < unidades.length - 1) {
      tamaño /= 1024;
      unidadIndex++;
    }

    return `${tamaño.toFixed(2)} ${unidades[unidadIndex]}`;
  }

  async compararArchivos(ruta1, ruta2) {
    const [meta1, meta2] = await Promise.all([
      this.obtenerMetadatos(ruta1),
      this.obtenerMetadatos(ruta2),
    ]);

    if (meta1.error || meta2.error) {
      return { error: "No se pudieron obtener metadatos de ambos archivos" };
    }

    return {
      mismoTamaño: meta1.tamaño === meta2.tamaño,
      mismaFechaModificacion:
        meta1.modificado.getTime() === meta2.modificado.getTime(),
      mismoTipo: meta1.tipo === meta2.tipo,
      diferencias: {
        tamaño: Math.abs(meta1.tamaño - meta2.tamaño),
        diasDesdeModificacion: Math.abs(
          (meta1.modificado - meta2.modificado) / (1000 * 60 * 60 * 24)
        ),
      },
    };
  }
}

// EJEMPLO 5: USO DEL GESTOR DE METADATOS
async function usarGestorMetadatos() {
  const gestor = new GestorMetadatos();

  const archivos = [
    "./documento.txt",
    "./package.json",
    "./src", // directorio
  ];

  for (const archivo of archivos) {
    const metadatos = await gestor.obtenerMetadatos(archivo);

    if (metadatos.error) {
      console.log(`Error con ${archivo}:`, metadatos.error);
    } else {
      console.log(`\nMetadatos de ${archivo}:`);
      console.log(`  Tipo: ${metadatos.tipo}`);
      console.log(`  Tamaño: ${metadatos.tamañoLegible}`);
      console.log(`  Modificado: ${metadatos.modificado.toLocaleString()}`);
      console.log(`  Permisos: ${metadatos.permisos}`);
    }
  }
}

// EJEMPLO 6: VERIFICACIÓN DE INTEGRIDAD DE ARCHIVOS
async function verificarIntegridad(ruta) {
  try {
    const stats = await fs.stat(ruta);

    const verificaciones = {
      existe: true,
      esLegible: true, // Asumimos legible si podemos hacer stat
      tamañoValido: stats.size >= 0,
      fechasConsistentes:
        stats.birthtime <= stats.mtime && stats.mtime <= new Date(),
      permisosValidos: (stats.mode & 0o777) <= 0o777,
      inodoValido: stats.ino > 0,
    };

    const todasPasadas = Object.values(verificaciones).every((v) => v);

    return {
      integridad: todasPasadas ? "OK" : "PROBLEMA",
      verificaciones: verificaciones,
      detalles: stats,
    };
  } catch (error) {
    return {
      integridad: "ERROR",
      error: error.message,
    };
  }
}

// EJEMPLO 7: ESTADÍSTICAS DE USO DE ARCHIVOS
async function generarEstadisticas(directorio) {
  try {
    const elementos = await fs.readdir(directorio);
    const estadisticas = {
      totalArchivos: 0,
      totalDirectorios: 0,
      tamañoTotal: 0,
      archivosPorExtension: {},
      archivosRecientes: [],
      archivosGrandes: [],
    };

    for (const elemento of elementos) {
      const rutaCompleta = `${directorio}/${elemento}`;

      try {
        const stats = await fs.stat(rutaCompleta);

        if (stats.isFile()) {
          estadisticas.totalArchivos++;
          estadisticas.tamañoTotal += stats.size;

          // Agrupar por extensión
          const extension = elemento.split(".").pop() || "sin_extension";
          estadisticas.archivosPorExtension[extension] =
            (estadisticas.archivosPorExtension[extension] || 0) + 1;

          // Archivos modificados en los últimos 7 días
          const diasDesdeModificacion =
            (new Date() - stats.mtime) / (1000 * 60 * 60 * 24);
          if (diasDesdeModificacion <= 7) {
            estadisticas.archivosRecientes.push({
              nombre: elemento,
              modificado: stats.mtime,
              tamaño: stats.size,
            });
          }

          // Archivos mayores a 1MB
          if (stats.size > 1024 * 1024) {
            estadisticas.archivosGrandes.push({
              nombre: elemento,
              tamaño: stats.size,
              tamañoLegible: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
            });
          }
        } else if (stats.isDirectory()) {
          estadisticas.totalDirectorios++;
        }
      } catch (error) {
        console.log(`Error procesando ${elemento}:`, error.message);
      }
    }

    return estadisticas;
  } catch (error) {
    console.log(`Error accediendo al directorio ${directorio}:`, error.message);
    return null;
  }
}

// EJEMPLO 8: DIFERENCIA ENTRE FS.STAT() Y FS.LSTAT()
async function compararStatVsLstat(ruta) {
  try {
    // fs.stat() sigue enlaces simbólicos y da info del archivo destino
    const stats = await fs.stat(ruta);

    // fs.lstat() da información del enlace simbólico mismo
    const lstats = await fs.lstat(ruta);

    console.log("Comparación stat() vs lstat():");
    console.log("stat() - Es enlace simbólico:", stats.isSymbolicLink());
    console.log("lstat() - Es enlace simbólico:", lstats.isSymbolicLink());
    console.log("stat() - Tamaño:", stats.size);
    console.log("lstat() - Tamaño:", lstats.size);

    // Si son diferentes, es un enlace simbólico
    if (stats.ino !== lstats.ino) {
      console.log("Este es un enlace simbólico que apunta a otro archivo");
    }
  } catch (error) {
    console.log("Error en comparación:", error.message);
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE INFORMACIÓN DE ARCHIVOS ===");

  // Ejemplo básico
  await obtenerInfoArchivo("./package.json");

  // Ejemplos avanzados
  const gestor = new GestorMetadatos();
  const metadatos = await gestor.obtenerMetadatos("./package.json");
  console.log("\nMetadatos formateados:", metadatos);

  const integridad = await verificarIntegridad("./package.json");
  console.log("\nVerificación de integridad:", integridad);

  const estadisticas = await generarEstadisticas("./");
  console.log("\nEstadísticas del directorio:", estadisticas);
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**INFORMACIÓN PRINCIPAL DISPONIBLE EN EL OBJETO STATS:**

- **Tipo**: `isFile()`, `isDirectory()`, `isSymbolicLink()`
- **Tamaño**: `size` (en bytes)
- **Fechas**: `birthtime` (creación), `mtime` (modificación), `atime` (acceso), `ctime` (cambio metadatos)
- **Permisos**: `mode` (permisos en formato octal)
- **Propietario**: `uid`, `gid` (usuario y grupo)
- **Sistema de archivos**: `ino` (inodo), `dev` (dispositivo)

**USOS COMUNES:**

- Verificación de existencia y tipo de archivos
- Monitoreo de cambios en archivos
- Gestión de permisos y seguridad
- Análisis de uso de disco
- Auditoría de sistemas de archivos
- Aplicaciones de backup y sincronización

Este código proporciona una base completa para trabajar con metadatos de archivos en Node.js, esencial para aplicaciones que necesitan información detallada del sistema de archivos.

## Operaciones con Directorios

### Creación de Directorios

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para crear directorios
// fs.mkdir() crea nuevos directorios en el sistema de archivos
async function crearDirectorios() {
  try {
    // Crear un directorio simple
    // fs.mkdir() con un solo parámetro crea un directorio en la ruta especificada
    // Si el directorio ya existe, lanzará un error
    await fs.mkdir("./mi-directorio");
    console.log("Directorio creado: ./mi-directorio");

    // Crear directorios anidados (crea todos los directorios padres necesarios)
    // Con la opción recursive: true, fs.mkdir() crea toda la jerarquía de directorios
    // Esto crea: ./carpeta-padre → ./carpeta-padre/carpeta-hija → ./carpeta-padre/carpeta-hija/subcarpeta
    await fs.mkdir("./carpeta-padre/carpeta-hija/subcarpeta", {
      recursive: true,
    });
    console.log("Directorios anidados creados exitosamente");
  } catch (error) {
    console.error("Error al crear directorios:", error.message);
  }
}

// Ejecutar la función
crearDirectorios();

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: CREAR DIRECTORIO CON PERMISOS ESPECÍFICOS
async function crearDirectorioConPermisos() {
  try {
    // Crear directorio con permisos específicos usando mode
    // 0o755 significa: propietario (lectura, escritura, ejecución), grupo y otros (lectura, ejecución)
    // En formato string: rwxr-xr-x
    await fs.mkdir("./directorio-con-permisos", {
      mode: 0o755, // Permisos en formato octal
    });
    console.log("Directorio con permisos específicos creado");
  } catch (error) {
    console.error("Error al crear directorio con permisos:", error.message);
  }
}

// EJEMPLO 2: VERIFICAR SI UN DIRECTORIO EXISTE ANTES DE CREARLO
async function crearDirectorioSiNoExiste(ruta) {
  try {
    // Primero verificar si el directorio ya existe
    try {
      await fs.access(ruta);
      console.log(`El directorio ${ruta} ya existe`);
      return false;
    } catch (error) {
      if (error.code === "ENOENT") {
        // El directorio no existe, proceder a crearlo
        await fs.mkdir(ruta, { recursive: true });
        console.log(`Directorio ${ruta} creado exitosamente`);
        return true;
      } else {
        // Otro tipo de error, relanzarlo
        throw error;
      }
    }
  } catch (error) {
    console.error(
      `Error al verificar/crear directorio ${ruta}:`,
      error.message
    );
    return false;
  }
}

// EJEMPLO 3: CREAR ESTRUCTURA COMPLEJA DE DIRECTORIOS
async function crearEstructuraCompleja() {
  try {
    const estructura = {
      base: "./proyecto",
      subdirectorios: [
        "src/components",
        "src/utils",
        "public/images",
        "public/css",
        "public/js",
        "docs/api",
        "tests/unit",
        "tests/integration",
        "logs/application",
        "logs/errors",
        "temp/uploads",
        "temp/cache",
      ],
    };

    // Crear directorio base
    await fs.mkdir(estructura.base, { recursive: true });
    console.log(`Directorio base creado: ${estructura.base}`);

    // Crear todos los subdirectorios
    for (const subdir of estructura.subdirectorios) {
      const rutaCompleta = `${estructura.base}/${subdir}`;
      await fs.mkdir(rutaCompleta, { recursive: true });
      console.log(`Subdirectorio creado: ${rutaCompleta}`);
    }

    console.log("Estructura de directorios completa creada");
  } catch (error) {
    console.error("Error creando estructura de directorios:", error.message);
  }
}

// EJEMPLO 4: CREAR DIRECTORIOS TEMPORALES CON NOMBRES ÚNICOS
async function crearDirectorioTemporal() {
  try {
    // Crear directorio temporal con timestamp para evitar colisiones
    const timestamp = new Date().getTime();
    const directorioTemporal = `./temp-${timestamp}`;

    await fs.mkdir(directorioTemporal);
    console.log(`Directorio temporal creado: ${directorioTemporal}`);

    return directorioTemporal;
  } catch (error) {
    console.error("Error creando directorio temporal:", error.message);
    return null;
  }
}

// EJEMPLO 5: MANEJAR ERRORES ESPECÍFICOS DE CREACIÓN DE DIRECTORIOS
async function crearDirectorioConManejoErrores(ruta) {
  try {
    await fs.mkdir(ruta, { recursive: true });
    console.log(`Directorio ${ruta} creado exitosamente`);
    return true;
  } catch (error) {
    // Manejar diferentes tipos de errores específicamente
    switch (error.code) {
      case "EEXIST":
        console.log(`El directorio ${ruta} ya existe`);
        break;
      case "ENOENT":
        console.log(
          `Una parte de la ruta padre no existe (se necesita recursive: true)`
        );
        break;
      case "EACCES":
        console.log(`Permiso denegado para crear el directorio en ${ruta}`);
        break;
      case "ENOTDIR":
        console.log(`Un componente de la ruta no es un directorio`);
        break;
      case "EROFS":
        console.log(`El sistema de archivos es de solo lectura`);
        break;
      case "ENAMETOOLONG":
        console.log(`El nombre del directorio es demasiado largo`);
        break;
      default:
        console.log(`Error desconocido al crear directorio: ${error.message}`);
    }
    return false;
  }
}

// EJEMPLO 6: CLASE PARA GESTIÓN DE DIRECTORIOS
class GestorDirectorios {
  constructor(directorioBase = "./") {
    this.directorioBase = directorioBase;
  }

  async crear(ruta, opciones = {}) {
    try {
      const rutaCompleta = `${this.directorioBase}/${ruta}`;
      await fs.mkdir(rutaCompleta, {
        recursive: true,
        ...opciones,
      });

      return {
        exito: true,
        ruta: rutaCompleta,
        mensaje: `Directorio ${rutaCompleta} creado exitosamente`,
      };
    } catch (error) {
      return {
        exito: false,
        ruta: ruta,
        error: error.message,
        codigoError: error.code,
      };
    }
  }

  async crearEstructura(estructura) {
    const resultados = [];

    for (const ruta of estructura) {
      const resultado = await this.crear(ruta);
      resultados.push(resultado);
    }

    return resultados;
  }

  async crearDesdeConfiguracion(config) {
    try {
      // Configuración ejemplo:
      // {
      //   base: 'mi-proyecto',
      //   directorios: ['src', 'public', 'tests']
      // }
      const basePath = `${this.directorioBase}/${config.base}`;

      // Crear directorio base
      await fs.mkdir(basePath, { recursive: true });

      // Crear subdirectorios
      for (const subdir of config.directorios) {
        const rutaCompleta = `${basePath}/${subdir}`;
        await fs.mkdir(rutaCompleta, { recursive: true });
      }

      console.log(`Estructura creada en: ${basePath}`);
      return true;
    } catch (error) {
      console.error("Error creando desde configuración:", error.message);
      return false;
    }
  }
}

// EJEMPLO 7: USO DEL GESTOR DE DIRECTORIOS
async function usarGestorDirectorios() {
  const gestor = new GestorDirectorios("./proyectos");

  // Crear estructura de proyecto típica
  const estructura = [
    "mi-app/src/components",
    "mi-app/src/utils",
    "mi-app/public/images",
    "mi-app/public/css",
    "mi-app/public/js",
    "mi-app/tests/unit",
    "mi-app/tests/integration",
    "mi-app/docs",
  ];

  const resultados = await gestor.crearEstructura(estructura);

  for (const resultado of resultados) {
    if (resultado.exito) {
      console.log(`✅ ${resultado.mensaje}`);
    } else {
      console.log(`❌ Error en ${resultado.ruta}: ${resultado.error}`);
    }
  }
}

// EJEMPLO 8: CREAR DIRECTORIO Y ARCHIVOS INICIALES
async function crearProyectoCompleto(nombreProyecto) {
  try {
    const estructura = {
      base: nombreProyecto,
      archivos: {
        [`${nombreProyecto}/package.json`]: JSON.stringify(
          {
            name: nombreProyecto,
            version: "1.0.0",
            type: "module",
          },
          null,
          2
        ),
        [`${nombreProyecto}/README.md`]: `# ${nombreProyecto}\n\nDescripción del proyecto.`,
        [`${nombreProyecto}/src/index.js`]: 'console.log("Hola Mundo");',
        [`${nombreProyecto}/.gitignore`]: "node_modules/\n.env",
      },
    };

    // Crear directorio base
    await fs.mkdir(`${nombreProyecto}/src`, { recursive: true });
    console.log(`Directorio base ${nombreProyecto} creado`);

    // Crear archivos iniciales
    for (const [rutaArchivo, contenido] of Object.entries(
      estructura.archivos
    )) {
      await fs.writeFile(rutaArchivo, contenido);
      console.log(`Archivo creado: ${rutaArchivo}`);
    }

    console.log(`Proyecto ${nombreProyecto} creado exitosamente`);
  } catch (error) {
    console.error("Error creando proyecto completo:", error.message);
  }
}

// EJEMPLO 9: CREAR DIRECTORIOS CON VALIDACIÓN DE SEGURIDAD
async function crearDirectorioSeguro(ruta) {
  try {
    // Validar que la ruta no contenga patrones peligrosos
    const patronesPeligrosos = ["../", "~/", "/etc/", "/bin/", "/usr/"];
    const esSegura = !patronesPeligrosos.some((patron) =>
      ruta.includes(patron)
    );

    if (!esSegura) {
      throw new Error("Ruta no permitida por seguridad");
    }

    // Validar longitud máxima de ruta
    if (ruta.length > 260) {
      throw new Error("La ruta es demasiado larga");
    }

    // Validar caracteres no permitidos (depende del sistema operativo)
    const caracteresNoPermitidos = ["<", ">", ":", '"', "|", "?", "*"];
    const tieneCaracteresInvalidos = caracteresNoPermitidos.some((caracter) =>
      ruta.includes(caracter)
    );

    if (tieneCaracteresInvalidos) {
      throw new Error("La ruta contiene caracteres no permitidos");
    }

    await fs.mkdir(ruta, { recursive: true });
    console.log(`Directorio seguro creado: ${ruta}`);
  } catch (error) {
    console.error("Error de seguridad:", error.message);
  }
}

// EJEMPLO 10: CREAR DIRECTORIOS TEMPORALES PARA PROCESAMIENTO
async function crearEntornoTemporal() {
  try {
    const timestamp = new Date().getTime();
    const directorioTemporal = `./procesamiento-${timestamp}`;

    // Crear estructura temporal
    await fs.mkdir(directorioTemporal, { recursive: true });
    await fs.mkdir(`${directorioTemporal}/entrada`);
    await fs.mkdir(`${directorioTemporal}/salida`);
    await fs.mkdir(`${directorioTemporal}/temp`);

    console.log(`Entorno temporal creado: ${directorioTemporal}`);

    // Devolver información del directorio temporal
    return {
      ruta: directorioTemporal,
      entrada: `${directorioTemporal}/entrada`,
      salida: `${directorioTemporal}/salida`,
      temp: `${directorioTemporal}/temp`,
    };
  } catch (error) {
    console.error("Error creando entorno temporal:", error.message);
    return null;
  }
}

// EJEMPLO 11: VERIFICAR Y CREAR DIRECTORIO CON ESTADÍSTICAS
async function crearYVerificarDirectorio(ruta) {
  try {
    // Crear el directorio
    await fs.mkdir(ruta, { recursive: true });

    // Verificar que se creó correctamente
    const stats = await fs.stat(ruta);

    if (stats.isDirectory()) {
      console.log(`Directorio verificado: ${ruta}`);
      console.log(`Creado: ${stats.birthtime.toLocaleString()}`);
      console.log(`Permisos: ${stats.mode.toString(8)}`);
      return true;
    } else {
      console.log(`Error: ${ruta} no es un directorio`);
      return false;
    }
  } catch (error) {
    console.error(`Error verificando directorio ${ruta}:`, error.message);
    return false;
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE CREACIÓN DE DIRECTORIOS ===");

  // Ejemplo básico
  await crearDirectorios();

  // Ejemplos avanzados
  await crearDirectorioConPermisos();
  await crearDirectorioSiNoExiste("./directorio-verificado");
  await crearEstructuraCompleja();

  // Usar el gestor de directorios
  await usarGestorDirectorios();

  // Crear proyecto completo
  await crearProyectoCompleto("mi-nuevo-proyecto");

  // Crear directorio seguro
  await crearDirectorioSeguro("./directorio-seguro");
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.mkdir(ruta)`**: Crea un directorio simple
2. **`fs.mkdir(ruta, { recursive: true })`**: Crea directorios anidados automáticamente
3. **`fs.mkdir(ruta, { mode: permisos })`**: Crea directorio con permisos específicos
4. **Comportamiento**: Lanza error si el directorio ya existe (a menos que uses `recursive: true` y no sea el directorio final)

**PERMISOS COMUNES EN OCTAL:**

- `0o755` - Propietario: rwx, Grupo: r-x, Otros: r-x
- `0o777` - Todos los permisos para todos
- `0o700` - Solo propietario tiene permisos

**USOS COMUNES:**

- Inicialización de proyectos
- Creación de estructuras de aplicaciones
- Directorios temporales para procesamiento
- Organización de archivos por categorías
- Preparación de entornos de trabajo

Este código proporciona una base completa para trabajar con directorios en Node.js, desde operaciones simples hasta gestión avanzada de estructuras de directorios complejas.

### Listar Contenido de Directorios

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para listar el contenido de un directorio
// fs.readdir() lee los nombres de los elementos en un directorio
async function listarDirectorio(ruta = "./") {
  try {
    // Leer todos los elementos del directorio
    // fs.readdir() retorna un array con los nombres de los elementos del directorio
    // Con la opción withFileTypes: true, retorna objetos Dirent en lugar de strings
    const elementos = await fs.readdir(ruta, {
      withFileTypes: true, // Incluir información del tipo de cada elemento
    });

    console.log(`Contenido de ${ruta}:`);

    // Iterar sobre cada elemento del directorio
    for (const elemento of elementos) {
      // Determinar el tipo de elemento usando los métodos del objeto Dirent
      // Dirent proporciona métodos para identificar el tipo de elemento del sistema de archivos
      const tipo = elemento.isDirectory()
        ? "[DIR]"
        : elemento.isFile()
        ? "[FILE]"
        : elemento.isSymbolicLink()
        ? "[LINK]"
        : "[UNKNOWN]";

      // Mostrar cada elemento con su tipo y nombre
      console.log(`${tipo} ${elemento.name}`);
    }

    return elementos;
  } catch (error) {
    console.error("Error al listar directorio:", error.message);
    return [];
  }
}

// Ejecutar la función con el directorio actual
listarDirectorio("./");

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: LISTAR DIRECTORIO SIN WITHFILETYPES
async function listarDirectorioSimple(ruta = "./") {
  try {
    // Sin withFileTypes: true, fs.readdir() retorna un array de strings
    const nombres = await fs.readdir(ruta);

    console.log(`Elementos en ${ruta}:`);
    nombres.forEach((nombre) => {
      console.log(` - ${nombre}`);
    });

    return nombres;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

// EJEMPLO 2: LISTAR CON INFORMACIÓN DETALLADA DE ARCHIVOS
async function listarConDetalles(ruta = "./") {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });

    console.log(`Contenido detallado de ${ruta}:`);
    console.log("=".repeat(50));

    for (const elemento of elementos) {
      const rutaCompleta = `${ruta}/${elemento.name}`;

      try {
        const stats = await fs.stat(rutaCompleta);

        console.log(
          `${elemento.isDirectory() ? "[DIR]" : "[FILE]"} ${elemento.name}`
        );
        console.log(`  Tamaño: ${stats.size} bytes`);
        console.log(`  Modificado: ${stats.mtime.toLocaleString()}`);
        console.log(`  Permisos: ${stats.mode.toString(8)}`);
        console.log("---");
      } catch (error) {
        console.log(
          `[ERROR] ${elemento.name} - No se pudo obtener información`
        );
      }
    }
  } catch (error) {
    console.error("Error al listar con detalles:", error.message);
  }
}

// EJEMPLO 3: FILTRAR POR TIPO DE ELEMENTO
async function listarFiltrado(ruta = "./") {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });

    // Filtrar solo directorios
    const directorios = elementos.filter((elemento) => elemento.isDirectory());
    console.log("Directorios:");
    directorios.forEach((dir) => console.log(` 📁 ${dir.name}`));

    // Filtrar solo archivos
    const archivos = elementos.filter((elemento) => elemento.isFile());
    console.log("\nArchivos:");
    archivos.forEach((archivo) => console.log(` 📄 ${archivo.name}`));

    // Filtrar enlaces simbólicos
    const enlaces = elementos.filter((elemento) => elemento.isSymbolicLink());
    console.log("\nEnlaces simbólicos:");
    enlaces.forEach((enlace) => console.log(` 🔗 ${enlace.name}`));

    return {
      directorios: directorios,
      archivos: archivos,
      enlaces: enlaces,
    };
  } catch (error) {
    console.error("Error al listar filtrado:", error.message);
    return { directorios: [], archivos: [], enlaces: [] };
  }
}

// EJEMPLO 4: LISTAR RECURSIVAMENTE (TODOS LOS SUBDIRECTORIOS)
async function listarRecursivo(ruta = "./", nivel = 0) {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });

    // Prefijo para indentación según el nivel de profundidad
    const indentacion = "  ".repeat(nivel);

    for (const elemento of elementos) {
      const rutaCompleta = `${ruta}/${elemento.name}`;

      if (elemento.isDirectory()) {
        console.log(`${indentacion}📁 ${elemento.name}/`);
        // Llamada recursiva para listar el subdirectorio
        await listarRecursivo(rutaCompleta, nivel + 1);
      } else {
        console.log(`${indentacion}📄 ${elemento.name}`);
      }
    }
  } catch (error) {
    console.error(`Error al listar ${ruta} recursivamente:`, error.message);
  }
}

// EJEMPLO 5: LISTAR CON INFORMACIÓN DE TAMAÑO AGRUPADO
async function listarConEstadisticas(ruta = "./") {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });

    let totalArchivos = 0;
    let totalDirectorios = 0;
    let tamañoTotal = 0;

    console.log(`Estadísticas de ${ruta}:`);
    console.log("-".repeat(40));

    for (const elemento of elementos) {
      const rutaCompleta = `${ruta}/${elemento.name}`;

      if (elemento.isDirectory()) {
        totalDirectorios++;
        console.log(`[DIR]  ${elemento.name}/`);
      } else if (elemento.isFile()) {
        totalArchivos++;
        try {
          const stats = await fs.stat(rutaCompleta);
          tamañoTotal += stats.size;
          console.log(`[FILE] ${elemento.name} (${stats.size} bytes)`);
        } catch (error) {
          console.log(`[FILE] ${elemento.name} (error al obtener tamaño)`);
        }
      }
    }

    console.log("-".repeat(40));
    console.log(`Total directorios: ${totalDirectorios}`);
    console.log(`Total archivos: ${totalArchivos}`);
    console.log(`Tamaño total: ${(tamañoTotal / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("Error al listar con estadísticas:", error.message);
  }
}

// EJEMPLO 6: CLASE PARA GESTIÓN DE LISTADO DE DIRECTORIOS
class GestorListado {
  constructor(directorioBase = "./") {
    this.directorioBase = directorioBase;
  }

  async listar(ruta = "", opciones = {}) {
    try {
      const rutaCompleta = `${this.directorioBase}/${ruta}`.replace(
        /\/\//g,
        "/"
      );
      const elementos = await fs.readdir(rutaCompleta, {
        withFileTypes: true,
        ...opciones,
      });

      return elementos.map((elemento) => ({
        nombre: elemento.name,
        ruta: `${rutaCompleta}/${elemento.name}`,
        esDirectorio: elemento.isDirectory(),
        esArchivo: elemento.isFile(),
        esEnlace: elemento.isSymbolicLink(),
        tipo: this.obtenerTipo(elemento),
      }));
    } catch (error) {
      console.error(`Error listando ${ruta}:`, error.message);
      return [];
    }
  }

  obtenerTipo(elemento) {
    if (elemento.isDirectory()) return "directorio";
    if (elemento.isFile()) return "archivo";
    if (elemento.isSymbolicLink()) return "enlace";
    if (elemento.isBlockDevice()) return "dispositivo_bloque";
    if (elemento.isCharacterDevice()) return "dispositivo_caracter";
    if (elemento.isFIFO()) return "fifo";
    if (elemento.isSocket()) return "socket";
    return "desconocido";
  }

  async listarPorTipo(ruta = "") {
    const elementos = await this.listar(ruta);

    return {
      directorios: elementos.filter((e) => e.esDirectorio),
      archivos: elementos.filter((e) => e.esArchivo),
      enlaces: elementos.filter((e) => e.esEnlace),
    };
  }

  async buscarPorPatron(ruta = "", patron) {
    const elementos = await this.listar(ruta);
    const regex = new RegExp(patron, "i"); // Búsqueda case insensitive

    return elementos.filter((elemento) => regex.test(elemento.nombre));
  }
}

// EJEMPLO 7: USO DEL GESTOR DE LISTADO
async function usarGestorListado() {
  const gestor = new GestorListado("./");

  console.log("=== LISTADO COMPLETO ===");
  const elementos = await gestor.listar();
  elementos.forEach((elemento) => {
    console.log(`${elemento.tipo.toUpperCase().padEnd(12)} ${elemento.nombre}`);
  });

  console.log("\n=== LISTADO POR TIPO ===");
  const porTipo = await gestor.listarPorTipo();

  console.log("Directorios:");
  porTipo.directorios.forEach((dir) => console.log(`  ${dir.nombre}`));

  console.log("\nArchivos:");
  porTipo.archivos.forEach((archivo) => console.log(`  ${archivo.nombre}`));

  console.log("\n=== BÚSQUEDA POR PATRÓN ===");
  const jsFiles = await gestor.buscarPorPatron("", "\\.js$");
  console.log("Archivos JavaScript:");
  jsFiles.forEach((archivo) => console.log(`  ${archivo.nombre}`));
}

// EJEMPLO 8: LISTAR CON ORDENAMIENTO
async function listarOrdenado(ruta = "./") {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });

    // Ordenar: directorios primero, luego archivos, alfabéticamente
    elementos.sort((a, b) => {
      // Directorios primero
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;

      // Luego orden alfabético
      return a.name.localeCompare(b.name);
    });

    console.log(`Contenido ordenado de ${ruta}:`);
    elementos.forEach((elemento) => {
      const tipo = elemento.isDirectory() ? "[DIR] " : "[FILE]";
      console.log(`${tipo} ${elemento.name}`);
    });

    return elementos;
  } catch (error) {
    console.error("Error al listar ordenado:", error.message);
    return [];
  }
}

// EJEMPLO 9: LISTAR CON INFORMACIÓN DE EXTENSIONES
async function listarConExtensiones(ruta = "./") {
  try {
    const elementos = await fs.readdir(ruta, { withFileTypes: true });
    const archivos = elementos.filter((elemento) => elemento.isFile());

    // Agrupar por extensión
    const porExtension = {};

    archivos.forEach((archivo) => {
      const extension = archivo.name.split(".").pop() || "sin-extension";
      if (!porExtension[extension]) {
        porExtension[extension] = [];
      }
      porExtension[extension].push(archivo.name);
    });

    console.log("Archivos agrupados por extensión:");
    Object.keys(porExtension)
      .sort()
      .forEach((extension) => {
        console.log(`\n.${extension}:`);
        porExtension[extension].forEach((archivo) => {
          console.log(`  ${archivo}`);
        });
      });

    return porExtension;
  } catch (error) {
    console.error("Error al listar por extensiones:", error.message);
    return {};
  }
}

// EJEMPLO 10: LISTAR CON LÍMITE Y PAGINACIÓN
async function listarPaginado(
  ruta = "./",
  pagina = 1,
  elementosPorPagina = 10
) {
  try {
    const todosElementos = await fs.readdir(ruta, { withFileTypes: true });

    // Calcular índices para la paginación
    const inicio = (pagina - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const elementosPagina = todosElementos.slice(inicio, fin);

    console.log(
      `Página ${pagina} de ${Math.ceil(
        todosElementos.length / elementosPorPagina
      )}`
    );
    console.log(
      `Elementos ${inicio + 1}-${Math.min(fin, todosElementos.length)} de ${
        todosElementos.length
      }`
    );
    console.log("-".repeat(40));

    elementosPagina.forEach((elemento, index) => {
      const numero = inicio + index + 1;
      const tipo = elemento.isDirectory() ? "[DIR]" : "[FILE]";
      console.log(`${numero.toString().padStart(3)}. ${tipo} ${elemento.name}`);
    });

    return {
      elementos: elementosPagina,
      paginaActual: pagina,
      totalPaginas: Math.ceil(todosElementos.length / elementosPorPagina),
      totalElementos: todosElementos.length,
    };
  } catch (error) {
    console.error("Error en listado paginado:", error.message);
    return {
      elementos: [],
      paginaActual: 1,
      totalPaginas: 0,
      totalElementos: 0,
    };
  }
}

// EJEMPLO 11: LISTAR OCULTOS Y MOSTRAR TODOS LOS DETALLES
async function listarCompleto(ruta = "./") {
  try {
    // En algunos sistemas, readdir no muestra archivos ocultos por defecto
    const elementos = await fs.readdir(ruta, {
      withFileTypes: true,
    });

    console.log(`Listado completo de ${ruta}:`);
    console.log("=".repeat(60));

    for (const elemento of elementos) {
      const rutaCompleta = `${ruta}/${elemento.name}`;

      try {
        const stats = await fs.stat(rutaCompleta);

        console.log(
          `${elemento.isDirectory() ? "D" : "F"} ${elemento.name.padEnd(30)}`
        );
        console.log(`     Tamaño: ${stats.size.toString().padStart(10)} bytes`);
        console.log(`     Modificado: ${stats.mtime.toLocaleDateString()}`);
        console.log(`     Permisos: ${stats.mode.toString(8)}`);
        console.log("");
      } catch (error) {
        console.log(`? ${elemento.name} - Error al obtener detalles`);
      }
    }
  } catch (error) {
    console.error("Error en listado completo:", error.message);
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE LISTADO DE DIRECTORIOS ===");

  // Ejemplo básico
  await listarDirectorio("./");

  // Ejemplos avanzados
  console.log("\n--- Listado con detalles ---");
  await listarConDetalles("./");

  console.log("\n--- Listado filtrado ---");
  await listarFiltrado("./");

  console.log("\n--- Listado ordenado ---");
  await listarOrdenado("./");

  console.log("\n--- Listado con extensiones ---");
  await listarConExtensiones("./");

  console.log("\n--- Usando gestor de listado ---");
  await usarGestorListado();

  console.log("\n--- Listado paginado ---");
  await listarPaginado("./", 1, 5);
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.readdir(ruta)`**: Lista nombres de elementos como strings
2. **`fs.readdir(ruta, { withFileTypes: true })`**: Lista objetos Dirent con información de tipo
3. **Objeto Dirent**: Proporciona métodos como `isDirectory()`, `isFile()`, `isSymbolicLink()`
4. **Manejo de errores**: Captura errores de permisos, directorio no existente, etc.

**MÉTODOS DISPONIBLES EN DIRENT:**

- `isDirectory()` - Verifica si es directorio
- `isFile()` - Verifica si es archivo regular
- `isSymbolicLink()` - Verifica si es enlace simbólico
- `isBlockDevice()` - Verifica si es dispositivo de bloque
- `isCharacterDevice()` - Verifica si es dispositivo de carácter
- `isFIFO()` - Verifica si es FIFO/pipe
- `isSocket()` - Verifica si es socket

**USOS COMUNES:**

- Exploradores de archivos
- Herramientas de administración de sistemas
- Aplicaciones de backup y sincronización
- Utilidades de limpieza y organización
- Herramientas de desarrollo y build

Este código proporciona una base completa para trabajar con listados de directorios en Node.js, desde operaciones simples hasta funcionalidades avanzadas como filtrado, ordenamiento y paginación.

### Eliminación de Archivos y Directorios

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para realizar operaciones de limpieza de archivos y directorios
// ADVERTENCIA: Estas operaciones son destructivas y no se pueden deshacer
async function limpiarArchivos() {
  try {
    // Eliminar un archivo específico
    // fs.unlink() elimina archivos o enlaces simbólicos
    // No funciona con directorios - para directorios usar fs.rmdir() o fs.rm()
    await fs.unlink("./archivo-temporal.txt");
    console.log("Archivo eliminado: ./archivo-temporal.txt");

    // Eliminar directorio vacío
    // fs.rmdir() solo funciona con directorios que están vacíos
    // Si el directorio contiene archivos u otros directorios, lanzará un error
    await fs.rmdir("./directorio-vacio");
    console.log("Directorio vacío eliminado: ./directorio-vacio");

    // Eliminar directorio y todo su contenido de forma recursiva
    // fs.rm() es la función más moderna y versátil para eliminación
    // Con recursive: true, elimina todo el contenido del directorio recursivamente
    // Con force: true, no lanza error si el directorio no existe
    await fs.rm("./directorio-con-contenido", {
      recursive: true, // Eliminar recursivamente todo el contenido
      force: true, // No lanzar error si el path no existe
    });
    console.log(
      "Directorio y contenido eliminados: ./directorio-con-contenido"
    );
  } catch (error) {
    console.error("Error en operaciones de limpieza:", error.message);
  }
}

// Ejecutar la función (comentado por seguridad)
// limpiarArchivos(); // Usar con precaución - operaciones destructivas

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: VERIFICAR ANTES DE ELIMINAR
async function eliminarConVerificacion(ruta) {
  try {
    // Verificar que el archivo/directorio existe antes de intentar eliminarlo
    await fs.access(ruta);

    // Obtener información para determinar el tipo
    const stats = await fs.stat(ruta);

    if (stats.isFile()) {
      await fs.unlink(ruta);
      console.log(`Archivo eliminado: ${ruta}`);
    } else if (stats.isDirectory()) {
      // Para directorios, verificar si está vacío
      const contenido = await fs.readdir(ruta);
      if (contenido.length === 0) {
        await fs.rmdir(ruta);
        console.log(`Directorio vacío eliminado: ${ruta}`);
      } else {
        console.log(
          `Directorio no vacío: ${ruta} (contiene ${contenido.length} elementos)`
        );
        // Podría usar fs.rm() con recursive: true aquí
      }
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`El elemento ${ruta} no existe`);
    } else {
      console.error(`Error al eliminar ${ruta}:`, error.message);
    }
  }
}

// EJEMPLO 2: ELIMINACIÓN SEGURA CON MÚLTIPLES OPCIONES
async function eliminarSeguro(ruta, opciones = {}) {
  const config = {
    verificarExistencia: true,
    forzarEliminacion: false,
    maxIntentos: 3,
    ...opciones,
  };

  let intentos = 0;

  while (intentos < config.maxIntentos) {
    try {
      if (config.verificarExistencia) {
        try {
          await fs.access(ruta);
        } catch (error) {
          if (error.code === "ENOENT") {
            console.log(`El elemento ${ruta} no existe`);
            return true; // Considerado éxito - ya no existe
          }
          throw error;
        }
      }

      // Intentar eliminar con fs.rm() (más moderno y versátil)
      await fs.rm(ruta, {
        recursive: true,
        force: config.forzarEliminacion,
      });

      console.log(`Eliminado exitosamente: ${ruta}`);
      return true;
    } catch (error) {
      intentos++;
      console.log(`Intento ${intentos} fallado para ${ruta}: ${error.message}`);

      if (intentos >= config.maxIntentos) {
        console.error(
          `No se pudo eliminar ${ruta} después de ${config.maxIntentos} intentos`
        );
        return false;
      }

      // Esperar antes de reintentar (backoff exponencial)
      await new Promise((resolve) => setTimeout(resolve, 1000 * intentos));
    }
  }
}

// EJEMPLO 3: ELIMINAR MÚLTIPLES ARCHIVOS POR PATRÓN
async function eliminarPorPatron(directorio, patron) {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const regex = new RegExp(patron);

    const eliminaciones = [];

    for (const elemento of elementos) {
      if (elemento.isFile() && regex.test(elemento.name)) {
        const rutaCompleta = `${directorio}/${elemento.name}`;
        eliminaciones.push(
          fs
            .unlink(rutaCompleta)
            .then(() => {
              console.log(`Eliminado: ${elemento.name}`);
              return { exito: true, archivo: elemento.name };
            })
            .catch((error) => {
              console.error(
                `Error eliminando ${elemento.name}:`,
                error.message
              );
              return {
                exito: false,
                archivo: elemento.name,
                error: error.message,
              };
            })
        );
      }
    }

    const resultados = await Promise.all(eliminaciones);
    const exitosos = resultados.filter((r) => r.exito).length;

    console.log(
      `Eliminación completada: ${exitosos}/${resultados.length} archivos eliminados`
    );
    return resultados;
  } catch (error) {
    console.error("Error en eliminación por patrón:", error.message);
    return [];
  }
}

// EJEMPLO 4: LIMPIAR DIRECTORIO TEMPORAL
async function limpiarDirectorioTemporal(directorio) {
  try {
    // Verificar que el directorio existe
    await fs.access(directorio);

    // Leer todo el contenido
    const elementos = await fs.readdir(directorio, { withFileTypes: true });

    console.log(`Limpiando directorio temporal: ${directorio}`);
    console.log(`Encontrados ${elementos.length} elementos`);

    for (const elemento of elementos) {
      const rutaCompleta = `${directorio}/${elemento.name}`;

      try {
        if (elemento.isFile()) {
          await fs.unlink(rutaCompleta);
          console.log(`  Archivo eliminado: ${elemento.name}`);
        } else if (elemento.isDirectory()) {
          await fs.rm(rutaCompleta, { recursive: true, force: true });
          console.log(`  Directorio eliminado: ${elemento.name}/`);
        }
      } catch (error) {
        console.error(`  Error eliminando ${elemento.name}:`, error.message);
      }
    }

    console.log("Limpieza de directorio temporal completada");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`El directorio temporal ${directorio} no existe`);
    } else {
      console.error("Error limpiando directorio temporal:", error.message);
    }
  }
}

// EJEMPLO 5: CLASE PARA GESTIÓN SEGURA DE ELIMINACIONES
class GestorEliminacion {
  constructor() {
    this.registroEliminados = [];
  }

  async eliminar(ruta, opciones = {}) {
    const config = {
      recursive: true,
      force: false,
      registrar: true,
      ...opciones,
    };

    try {
      // Obtener información antes de eliminar (para registro)
      let infoPrevia = null;
      if (config.registrar) {
        try {
          const stats = await fs.stat(ruta);
          infoPrevia = {
            ruta: ruta,
            esDirectorio: stats.isDirectory(),
            esArchivo: stats.isFile(),
            tamaño: stats.size,
            modificado: stats.mtime,
          };
        } catch (error) {
          // Si no podemos obtener stats, continuar igual
        }
      }

      // Realizar la eliminación
      await fs.rm(ruta, {
        recursive: config.recursive,
        force: config.force,
      });

      // Registrar la eliminación exitosa
      if (config.registrar && infoPrevia) {
        this.registroEliminados.push({
          ...infoPrevia,
          fechaEliminacion: new Date(),
          exito: true,
        });
      }

      console.log(`✅ Eliminado: ${ruta}`);
      return { exito: true, ruta: ruta };
    } catch (error) {
      console.error(`❌ Error eliminando ${ruta}:`, error.message);

      if (config.registrar) {
        this.registroEliminados.push({
          ruta: ruta,
          fechaIntento: new Date(),
          exito: false,
          error: error.message,
        });
      }

      return {
        exito: false,
        ruta: ruta,
        error: error.message,
        codigoError: error.code,
      };
    }
  }

  async eliminarMultiples(rutas, opciones = {}) {
    const resultados = [];

    for (const ruta of rutas) {
      const resultado = await this.eliminar(ruta, opciones);
      resultados.push(resultado);
    }

    return resultados;
  }

  obtenerRegistro() {
    return this.registroEliminados;
  }

  limpiarRegistro() {
    const count = this.registroEliminados.length;
    this.registroEliminados = [];
    return count;
  }
}

// EJEMPLO 6: USO DEL GESTOR DE ELIMINACIÓN
async function usarGestorEliminacion() {
  const gestor = new GestorEliminacion();

  const elementosAEliminar = [
    "./archivo-temp-1.txt",
    "./archivo-temp-2.txt",
    "./directorio-temp",
  ];

  console.log("Iniciando eliminación de elementos...");
  const resultados = await gestor.eliminarMultiples(elementosAEliminar, {
    force: true,
    registrar: true,
  });

  const exitosos = resultados.filter((r) => r.exito).length;
  console.log(
    `Proceso completado: ${exitosos}/${resultados.length} eliminaciones exitosas`
  );

  // Mostrar registro
  const registro = gestor.obtenerRegistro();
  console.log("\nRegistro de eliminaciones:");
  registro.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.ruta} - ${item.exito ? "ÉXITO" : "FALLIDO"}`
    );
  });
}

// EJEMPLO 7: ELIMINAR ARCHIVOS ANTIGUOS
async function eliminarArchivosAntiguos(directorio, diasLimite = 30) {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - diasLimite);

    console.log(
      `Eliminando archivos más antiguos que: ${fechaLimite.toLocaleDateString()}`
    );

    for (const elemento of elementos) {
      if (elemento.isFile()) {
        const rutaCompleta = `${directorio}/${elemento.name}`;
        const stats = await fs.stat(rutaCompleta);

        if (stats.mtime < fechaLimite) {
          await fs.unlink(rutaCompleta);
          console.log(
            `Eliminado archivo antiguo: ${
              elemento.name
            } (${stats.mtime.toLocaleDateString()})`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error eliminando archivos antiguos:", error.message);
  }
}

// EJEMPLO 8: ELIMINACIÓN CON VALIDACIÓN DE SEGURIDAD
async function eliminarConValidacionSegura(ruta, exclusiones = []) {
  // Lista de rutas críticas que NUNCA deberían eliminarse
  const rutasProtegidas = [
    "/",
    "/etc",
    "/bin",
    "/usr",
    "/var",
    "/home",
    "/System",
    "/Windows",
    "C:\\",
    "C:/Windows",
  ];

  // Convertir ruta a absoluta para comparación
  const rutaAbsoluta = await fs.realpath(ruta);

  // Verificar que no sea una ruta protegida
  const esRutaProtegida = rutasProtegidas.some((protegida) =>
    rutaAbsoluta.startsWith(protegida)
  );

  if (esRutaProtegida) {
    throw new Error(
      `OPERACIÓN BLOQUEADA: La ruta ${rutaAbsoluta} está protegida`
    );
  }

  // Verificar exclusiones personalizadas
  const estaExcluida = exclusiones.some((exclusion) =>
    rutaAbsoluta.includes(exclusion)
  );

  if (estaExcluida) {
    throw new Error(
      `OPERACIÓN BLOQUEADA: La ruta ${ruta} está en la lista de exclusiones`
    );
  }

  // Si pasa todas las validaciones, proceder con eliminación
  await fs.rm(ruta, { recursive: true, force: true });
  console.log(`Eliminación segura completada: ${ruta}`);
}

// EJEMPLO 9: LIMPIAR CACHE DE APLICACIÓN
async function limpiarCacheAplicacion() {
  const carpetasCache = [
    "./node_modules/.cache",
    "./.cache",
    "./temp",
    "./dist", // Directorio de build
    "./coverage", // Directorio de reports de tests
  ];

  console.log("Iniciando limpieza de cache de aplicación...");

  for (const carpeta of carpetasCache) {
    try {
      await fs.access(carpeta);
      await fs.rm(carpeta, { recursive: true, force: true });
      console.log(`✅ Cache limpiada: ${carpeta}`);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`⚠️  Cache no encontrada: ${carpeta}`);
      } else {
        console.error(`❌ Error limpiando ${carpeta}:`, error.message);
      }
    }
  }

  console.log("Limpieza de cache completada");
}

// EJEMPLO 10: ELIMINAR CON CONFIRMACIÓN INTERACTIVA (SIMULADA)
async function eliminarConConfirmacion(ruta) {
  // En una aplicación real, esto interactuaría con la consola
  // Para este ejemplo, simulamos la confirmación

  const confirmacionSimulada = true; // En realidad esto vendría de input del usuario

  if (!confirmacionSimulada) {
    console.log("Eliminación cancelada por el usuario");
    return false;
  }

  try {
    // Mostrar información de lo que se va a eliminar
    const stats = await fs.stat(ruta);
    const tipo = stats.isDirectory() ? "directorio" : "archivo";
    const tamaño = stats.isFile() ? ` (${stats.size} bytes)` : "";

    console.log(`Confirmando eliminación de ${tipo}: ${ruta}${tamaño}`);

    // Aquí iría la confirmación real del usuario
    // const confirmacion = await preguntaUsuario('¿Continuar? (s/n): ');

    // Simulamos que el usuario confirma
    await fs.rm(ruta, { recursive: true, force: true });
    console.log("✅ Eliminación confirmada y ejecutada");
    return true;
  } catch (error) {
    console.error("Error en eliminación con confirmación:", error.message);
    return false;
  }
}

// EJECUCIÓN DE EJEMPLOS (COMENTADO POR SEGURIDAD)
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE ELIMINACIÓN DE ARCHIVOS ===");

  // NOTA: Estos ejemplos están comentados porque son operaciones destructivas
  // Descomentar solo para pruebas en entornos controlados

  /*
    // Ejemplo básico (crear archivos temporales primero para prueba)
    await fs.writeFile('./archivo-temporal.txt', 'contenido temporal');
    await fs.mkdir('./directorio-vacio', { recursive: true });
    await fs.mkdir('./directorio-con-contenido/subdir', { recursive: true });
    await fs.writeFile('./directorio-con-contenido/archivo.txt', 'contenido');
    
    await limpiarArchivos();
    
    // Ejemplos avanzados
    await eliminarConVerificacion('./archivo-prueba.txt');
    await eliminarPorPatron('./', '^temp-');
    await usarGestorEliminacion();
    */

  console.log("Ejemplos de eliminación (comentados por seguridad)");
}

// Descomentar para ejecutar (SOLO EN ENTORNOS DE PRUEBA)
// ejecutarEjemplos();
```

## Operaciones de Copia y Movimiento

### Copiar Archivos

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para copiar un archivo de una ubicación a otra
// fs.copyFile() copia el contenido de un archivo a otro archivo
async function copiarArchivo(origen, destino) {
  try {
    // Copiar archivo de origen a destino
    // fs.copyFile() copia todo el contenido del archivo origen al archivo destino
    // Si el archivo destino ya existe, será sobrescrito completamente
    await fs.copyFile(origen, destino);
    console.log(`Archivo copiado de ${origen} a ${destino}`);
  } catch (error) {
    console.error("Error al copiar archivo:", error.message);
  }
}

// Ejecutar la función con archivos de ejemplo
copiarArchivo("./original.txt", "./copia.txt");

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: COPIAR CON MODOS DE COPIADO ESPECÍFICOS
async function copiarArchivoConModo(origen, destino, modo) {
  try {
    // fs.copyFile() acepta un tercer parámetro opcional que especifica el modo de copiado
    // Los modos disponibles son constantes del módulo fs:
    // - fs.constants.COPYFILE_EXCL: La operación falla si el archivo destino ya existe
    // - fs.constants.COPYFILE_FICLONE: El archivo se copia usando copy-on-write (si la plataforma lo soporta)
    // - fs.constants.COPYFILE_FICLONE_FORCE: El archivo se copia usando copy-on-write y falla si no está soportado

    await fs.copyFile(origen, destino, modo);
    console.log(`Archivo copiado con modo específico: ${origen} -> ${destino}`);
  } catch (error) {
    console.error("Error al copiar con modo:", error.message);
  }
}

// EJEMPLO 2: COPIAR CON VERIFICACIÓN DE EXISTENCIA
async function copiarConVerificacion(origen, destino) {
  try {
    // Verificar que el archivo origen existe
    await fs.access(origen);
    console.log(`Archivo origen verificado: ${origen}`);

    // Verificar si el archivo destino ya existe
    try {
      await fs.access(destino);
      console.log(
        `Advertencia: El archivo destino ${destino} ya existe y será sobrescrito`
      );
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`Archivo destino no existe, se creará: ${destino}`);
      } else {
        throw error; // Relanzar otros errores
      }
    }

    // Realizar la copia
    await fs.copyFile(origen, destino);
    console.log(`Copia completada: ${origen} -> ${destino}`);

    // Verificar que la copia fue exitosa
    const statsOrigen = await fs.stat(origen);
    const statsDestino = await fs.stat(destino);

    if (statsOrigen.size === statsDestino.size) {
      console.log("✅ Verificación: Archivos tienen el mismo tamaño");
    } else {
      console.log("⚠️  Advertencia: Los archivos tienen tamaños diferentes");
    }
  } catch (error) {
    console.error("Error en copia con verificación:", error.message);
  }
}

// EJEMPLO 3: COPIAR MÚLTIPLES ARCHIVOS
async function copiarMultiplesArchivos(archivos) {
  try {
    // archivos es un array de objetos { origen, destino }
    const resultados = [];

    for (const archivo of archivos) {
      try {
        await fs.copyFile(archivo.origen, archivo.destino);
        console.log(`✅ Copiado: ${archivo.origen} -> ${archivo.destino}`);
        resultados.push({
          exito: true,
          origen: archivo.origen,
          destino: archivo.destino,
        });
      } catch (error) {
        console.error(`❌ Error copiando ${archivo.origen}:`, error.message);
        resultados.push({
          exito: false,
          origen: archivo.origen,
          destino: archivo.destino,
          error: error.message,
        });
      }
    }

    const exitosos = resultados.filter((r) => r.exito).length;
    console.log(`Resumen: ${exitosos}/${resultados.length} copias exitosas`);

    return resultados;
  } catch (error) {
    console.error("Error en copia múltiple:", error.message);
    return [];
  }
}

// EJEMPLO 4: COPIAR CON CREACIÓN DE DIRECTORIOS DESTINO
async function copiarConDirectorios(origen, destino) {
  try {
    // Extraer el directorio destino del path completo
    const path = await import("path");
    const directorioDestino = path.dirname(destino);

    // Verificar/Crear el directorio destino
    try {
      await fs.access(directorioDestino);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`Creando directorio destino: ${directorioDestino}`);
        await fs.mkdir(directorioDestino, { recursive: true });
      } else {
        throw error;
      }
    }

    // Realizar la copia
    await fs.copyFile(origen, destino);
    console.log(`Archivo copiado con directorios: ${origen} -> ${destino}`);
  } catch (error) {
    console.error("Error copiando con directorios:", error.message);
  }
}

// EJEMPLO 5: COPIAR CON MODO EXCLUSIVO (NO SOBRESCRIBIR)
async function copiarSinSobrescribir(origen, destino) {
  try {
    // COPYFILE_EXCL hace que la operación falle si el archivo destino ya existe
    await fs.copyFile(origen, destino, fs.constants.COPYFILE_EXCL);
    console.log(
      `✅ Archivo copiado (sin sobrescribir): ${origen} -> ${destino}`
    );
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(
        `⚠️  El archivo destino ${destino} ya existe. No se sobrescribió.`
      );
    } else {
      console.error("Error en copia exclusiva:", error.message);
    }
  }
}

// EJEMPLO 6: CLASE PARA GESTIÓN DE COPIAS
class GestorCopias {
  constructor() {
    this.registroCopias = [];
  }

  async copiar(origen, destino, opciones = {}) {
    const config = {
      sobrescribir: true,
      crearDirectorios: true,
      verificarIntegridad: false,
      ...opciones,
    };

    try {
      // Verificar archivo origen
      const statsOrigen = await fs.stat(origen);
      if (!statsOrigen.isFile()) {
        throw new Error("El origen no es un archivo regular");
      }

      // Manejar directorios destino
      if (config.crearDirectorios) {
        const path = await import("path");
        const directorioDestino = path.dirname(destino);
        try {
          await fs.access(directorioDestino);
        } catch (error) {
          if (error.code === "ENOENT") {
            await fs.mkdir(directorioDestino, { recursive: true });
          } else {
            throw error;
          }
        }
      }

      // Configurar modo de copia
      let modo = 0;
      if (!config.sobrescribir) {
        modo = fs.constants.COPYFILE_EXCL;
      }

      // Realizar la copia
      await fs.copyFile(origen, destino, modo);

      // Verificar integridad si se solicita
      if (config.verificarIntegridad) {
        const statsDestino = await fs.stat(destino);
        if (statsOrigen.size !== statsDestino.size) {
          throw new Error(
            "La verificación de integridad falló: tamaños diferentes"
          );
        }
      }

      // Registrar la copia exitosa
      const registro = {
        origen: origen,
        destino: destino,
        fecha: new Date(),
        tamaño: statsOrigen.size,
        exito: true,
      };

      this.registroCopias.push(registro);
      console.log(`✅ Copia exitosa: ${origen} -> ${destino}`);

      return registro;
    } catch (error) {
      const registroError = {
        origen: origen,
        destino: destino,
        fecha: new Date(),
        exito: false,
        error: error.message,
      };

      this.registroCopias.push(registroError);
      console.error(`❌ Error copiando ${origen}:`, error.message);

      return registroError;
    }
  }

  async copiarLote(archivos, opciones = {}) {
    const resultados = [];

    for (const archivo of archivos) {
      const resultado = await this.copiar(
        archivo.origen,
        archivo.destino,
        opciones
      );
      resultados.push(resultado);
    }

    return resultados;
  }

  obtenerEstadisticas() {
    const total = this.registroCopias.length;
    const exitosas = this.registroCopias.filter((c) => c.exito).length;
    const fallidas = total - exitosas;
    const tamañoTotal = this.registroCopias
      .filter((c) => c.exito && c.tamaño)
      .reduce((sum, c) => sum + c.tamaño, 0);

    return {
      totalCopias: total,
      exitosas: exitosas,
      fallidas: fallidas,
      tamañoTotal: tamañoTotal,
      tasaExito: total > 0 ? ((exitosas / total) * 100).toFixed(2) + "%" : "0%",
    };
  }

  limpiarRegistro() {
    const count = this.registroCopias.length;
    this.registroCopias = [];
    return count;
  }
}

// EJEMPLO 7: USO DEL GESTOR DE COPIAS
async function usarGestorCopias() {
  const gestor = new GestorCopias();

  const archivosACopiar = [
    { origen: "./archivo1.txt", destino: "./backups/archivo1-backup.txt" },
    { origen: "./archivo2.txt", destino: "./backups/archivo2-backup.txt" },
    { origen: "./archivo3.txt", destino: "./backups/archivo3-backup.txt" },
  ];

  console.log("Iniciando copia de lote de archivos...");
  const resultados = await gestor.copiarLote(archivosACopiar, {
    crearDirectorios: true,
    verificarIntegridad: true,
    sobrescribir: false,
  });

  const estadisticas = gestor.obtenerEstadisticas();
  console.log("\nEstadísticas de copia:");
  console.log(`- Total: ${estadisticas.totalCopias}`);
  console.log(`- Exitosas: ${estadisticas.exitosas}`);
  console.log(`- Fallidas: ${estadisticas.fallidas}`);
  console.log(`- Tasa de éxito: ${estadisticas.tasaExito}`);
  console.log(`- Tamaño total copiado: ${estadisticas.tamañoTotal} bytes`);
}

// EJEMPLO 8: COPIAR CON TRANSFORMACIÓN DE CONTENIDO
async function copiarConTransformacion(origen, destino, transformacion) {
  try {
    // Leer el archivo origen
    const contenido = await fs.readFile(origen, "utf8");

    // Aplicar transformación
    let contenidoTransformado;
    if (typeof transformacion === "function") {
      contenidoTransformado = transformacion(contenido);
    } else {
      contenidoTransformado = contenido;
    }

    // Escribir el archivo destino
    await fs.writeFile(destino, contenidoTransformado);
    console.log(`Archivo copiado y transformado: ${origen} -> ${destino}`);
  } catch (error) {
    console.error("Error en copia con transformación:", error.message);
  }
}

// EJEMPLO 9: COPIAR ARCHIVOS BINARIOS
async function copiarArchivoBinario(origen, destino) {
  try {
    // Para archivos binarios, no especificar codificación
    // copyFile funciona igual para archivos de texto y binarios

    // Verificar que es un archivo binario (opcional)
    const stats = await fs.stat(origen);
    console.log(`Copiando archivo binario (${stats.size} bytes): ${origen}`);

    // Realizar la copia
    await fs.copyFile(origen, destino);

    // Verificar la copia
    const statsDestino = await fs.stat(destino);
    if (stats.size === statsDestino.size) {
      console.log(`✅ Copia binaria verificada: ${origen} -> ${destino}`);
    } else {
      console.log("⚠️  Advertencia: Tamaños diferentes en copia binaria");
    }
  } catch (error) {
    console.error("Error copiando archivo binario:", error.message);
  }
}

// EJEMPLO 10: COPIAR CON BACKUP AUTOMÁTICO
async function copiarConBackup(origen, destino) {
  try {
    const path = await import("path");

    // Si el archivo destino ya existe, crear un backup
    try {
      await fs.access(destino);

      // El archivo destino existe, crear backup
      const extension = path.extname(destino);
      const nombreBase = path.basename(destino, extension);
      const timestamp = new Date().getTime();
      const backupPath = `${path.dirname(
        destino
      )}/${nombreBase}_backup_${timestamp}${extension}`;

      await fs.copyFile(destino, backupPath);
      console.log(`✅ Backup creado: ${backupPath}`);
    } catch (error) {
      // El archivo destino no existe, no se necesita backup
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    // Realizar la copia principal
    await fs.copyFile(origen, destino);
    console.log(`✅ Archivo copiado: ${origen} -> ${destino}`);
  } catch (error) {
    console.error("Error en copia con backup:", error.message);
  }
}

// EJEMPLO 11: COPIAR CON LIMITE DE TAMAÑO
async function copiarConLimiteTamaño(
  origen,
  destino,
  tamañoMaximo = 10 * 1024 * 1024
) {
  // 10MB por defecto
  try {
    // Verificar tamaño del archivo origen
    const stats = await fs.stat(origen);

    if (stats.size > tamañoMaximo) {
      throw new Error(
        `El archivo es demasiado grande (${stats.size} bytes). Límite: ${tamañoMaximo} bytes`
      );
    }

    // Realizar la copia si pasa la verificación de tamaño
    await fs.copyFile(origen, destino);
    console.log(
      `✅ Archivo copiado (${stats.size} bytes): ${origen} -> ${destino}`
    );
  } catch (error) {
    console.error("Error en copia con límite de tamaño:", error.message);
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE COPIA DE ARCHIVOS ===");

  // Crear archivos de prueba primero
  try {
    await fs.writeFile(
      "./original.txt",
      "Este es el contenido del archivo original"
    );
    await fs.writeFile("./archivo1.txt", "Contenido archivo 1");
    await fs.writeFile("./archivo2.txt", "Contenido archivo 2");

    // Ejemplo básico
    await copiarArchivo("./original.txt", "./copia-basica.txt");

    // Ejemplos avanzados
    await copiarConVerificacion("./original.txt", "./copia-verificada.txt");
    await copiarSinSobrescribir("./original.txt", "./copia-exclusiva.txt");
    await usarGestorCopias();

    // Limpiar archivos de prueba
    await fs.unlink("./original.txt");
    await fs.unlink("./copia-basica.txt");
    await fs.unlink("./copia-verificada.txt");
    await fs.rm("./backups", { recursive: true, force: true });
  } catch (error) {
    console.error("Error en ejemplos:", error.message);
  }
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.copyFile(origen, destino)`**: Copia el contenido de un archivo a otro
2. **`fs.copyFile(origen, destino, modo)`**: Copia con modos específicos
3. **Modos disponibles**:
   - `COPYFILE_EXCL`: Falla si el destino existe
   - `COPYFILE_FICLONE`: Usa copy-on-write si está disponible
   - `COPYFILE_FICLONE_FORCE`: Fuerza copy-on-write o falla

**COMPORTAMIENTO POR DEFECTO:**

- Sobrescribe el archivo destino si existe
- Copia tanto archivos de texto como binarios
- Mantiene los mismos permisos (en la mayoría de sistemas)
- No copia metadatos como fechas de creación

**VENTAJAS DE `copyFile`:**

- Más eficiente que leer y escribir manualmente
- Maneja automáticamente archivos grandes
- Optimizado para el sistema operativo
- Soporte para operaciones atómicas en algunos casos

**USOS COMUNES:**

- Creación de backups
- Duplicación de archivos de configuración
- Procesamiento de uploads de archivos
- Sincronización de datos
- Operaciones de deployment

Este código proporciona una base completa para trabajar con operaciones de copia de archivos en Node.js, desde funciones básicas hasta gestión avanzada con verificación de integridad y manejo de errores.

### Renombrar y Mover Archivos

```jsx
// Importar el módulo de sistema de archivos con soporte para Promises
// fs/promises proporciona métodos asíncronos basados en Promises
import fs from "fs/promises";

// Función asíncrona para renombrar y mover archivos
// fs.rename() puede tanto renombrar archivos como moverlos entre directorios
async function renombrarArchivo() {
  try {
    // Renombrar un archivo (también puede moverlo entre directorios)
    // fs.rename() cambia el nombre de un archivo o lo mueve a una nueva ubicación
    // Si la ruta destino es diferente, el archivo se mueve a esa ubicación
    await fs.rename("./viejo-nombre.txt", "./nuevo-nombre.txt");
    console.log(
      "Archivo renombrado exitosamente: ./viejo-nombre.txt -> ./nuevo-nombre.txt"
    );

    // Mover archivo a otro directorio
    // Cuando el directorio destino es diferente, fs.rename() mueve el archivo
    // El directorio destino debe existir, de lo contrario lanzará un error
    await fs.rename("./archivo.txt", "./backups/archivo.txt");
    console.log(
      "Archivo movido a directorio backups: ./archivo.txt -> ./backups/archivo.txt"
    );
  } catch (error) {
    console.error("Error al renombrar/mover archivo:", error.message);
  }
}

// Ejecutar la función
renombrarArchivo();

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: VERIFICAR ANTES DE RENOMBRAR
async function renombrarConVerificacion(viejaRuta, nuevaRuta) {
  try {
    // Verificar que el archivo origen existe
    await fs.access(viejaRuta);
    console.log(`Archivo origen verificado: ${viejaRuta}`);

    // Verificar si el archivo destino ya existe
    try {
      await fs.access(nuevaRuta);
      console.log(
        `Advertencia: El archivo destino ${nuevaRuta} ya existe y será sobrescrito`
      );
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`Archivo destino no existe, se creará: ${nuevaRuta}`);
      } else {
        throw error; // Relanzar otros errores
      }
    }

    // Realizar el renombrado
    await fs.rename(viejaRuta, nuevaRuta);
    console.log(`✅ Renombrado exitoso: ${viejaRuta} -> ${nuevaRuta}`);
  } catch (error) {
    console.error("Error en renombrado con verificación:", error.message);
  }
}

// EJEMPLO 2: MOVER ARCHIVO CON CREACIÓN DE DIRECTORIO DESTINO
async function moverConDirectorio(origen, destino) {
  try {
    // Importar path para manipulación de rutas
    const path = await import("path");

    // Extraer el directorio destino del path completo
    const directorioDestino = path.dirname(destino);

    // Verificar si el directorio destino existe, si no, crearlo
    try {
      await fs.access(directorioDestino);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(`Creando directorio destino: ${directorioDestino}`);
        await fs.mkdir(directorioDestino, { recursive: true });
      } else {
        throw error;
      }
    }

    // Realizar el movimiento
    await fs.rename(origen, destino);
    console.log(`✅ Archivo movido: ${origen} -> ${destino}`);
  } catch (error) {
    console.error("Error moviendo archivo con directorio:", error.message);
  }
}

// EJEMPLO 3: RENOMBRAR MÚLTIPLES ARCHIVOS
async function renombrarMultiplesArchivos(renombres) {
  try {
    // renombres es un array de objetos { origen, destino }
    const resultados = [];

    for (const renombre of renombres) {
      try {
        await fs.rename(renombre.origen, renombre.destino);
        console.log(`✅ Renombrado: ${renombre.origen} -> ${renombre.destino}`);
        resultados.push({
          exito: true,
          origen: renombre.origen,
          destino: renombre.destino,
        });
      } catch (error) {
        console.error(
          `❌ Error renombrando ${renombre.origen}:`,
          error.message
        );
        resultados.push({
          exito: false,
          origen: renombre.origen,
          destino: renombre.destino,
          error: error.message,
        });
      }
    }

    const exitosos = resultados.filter((r) => r.exito).length;
    console.log(
      `Resumen: ${exitosos}/${resultados.length} renombrados exitosos`
    );

    return resultados;
  } catch (error) {
    console.error("Error en renombrado múltiple:", error.message);
    return [];
  }
}

// EJEMPLO 4: RENOMBRAR CON PATRÓN (BÚSQUEDA Y REEMPLAZO)
async function renombrarPorPatron(directorio, patronBusqueda, patronReemplazo) {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const archivos = elementos.filter((elemento) => elemento.isFile());

    const resultados = [];

    for (const archivo of archivos) {
      if (archivo.name.includes(patronBusqueda)) {
        const nuevoNombre = archivo.name.replace(
          patronBusqueda,
          patronReemplazo
        );
        const origen = `${directorio}/${archivo.name}`;
        const destino = `${directorio}/${nuevoNombre}`;

        try {
          await fs.rename(origen, destino);
          console.log(`✅ Renombrado: ${archivo.name} -> ${nuevoNombre}`);
          resultados.push({
            exito: true,
            origen: archivo.name,
            destino: nuevoNombre,
          });
        } catch (error) {
          console.error(`❌ Error renombrando ${archivo.name}:`, error.message);
          resultados.push({
            exito: false,
            origen: archivo.name,
            error: error.message,
          });
        }
      }
    }

    return resultados;
  } catch (error) {
    console.error("Error en renombrado por patrón:", error.message);
    return [];
  }
}

// EJEMPLO 5: CLASE PARA GESTIÓN DE RENOMBRADO
class GestorRenombrado {
  constructor() {
    this.registroRenombres = [];
  }

  async renombrar(origen, destino, opciones = {}) {
    const config = {
      crearDirectorios: true,
      sobrescribir: false,
      ...opciones,
    };

    try {
      // Verificar archivo origen
      const statsOrigen = await fs.stat(origen);
      if (!statsOrigen.isFile()) {
        throw new Error("El origen no es un archivo regular");
      }

      // Manejar directorios destino
      if (config.crearDirectorios) {
        const path = await import("path");
        const directorioDestino = path.dirname(destino);
        try {
          await fs.access(directorioDestino);
        } catch (error) {
          if (error.code === "ENOENT") {
            await fs.mkdir(directorioDestino, { recursive: true });
          } else {
            throw error;
          }
        }
      }

      // Verificar si el destino existe (si no se permite sobrescribir)
      if (!config.sobrescribir) {
        try {
          await fs.access(destino);
          throw new Error("El archivo destino ya existe");
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
      }

      // Realizar el renombrado
      await fs.rename(origen, destino);

      // Registrar el renombrado exitoso
      const registro = {
        origen: origen,
        destino: destino,
        fecha: new Date(),
        tamaño: statsOrigen.size,
        exito: true,
      };

      this.registroRenombres.push(registro);
      console.log(`✅ Renombrado exitoso: ${origen} -> ${destino}`);

      return registro;
    } catch (error) {
      const registroError = {
        origen: origen,
        destino: destino,
        fecha: new Date(),
        exito: false,
        error: error.message,
      };

      this.registroRenombres.push(registroError);
      console.error(`❌ Error renombrando ${origen}:`, error.message);

      return registroError;
    }
  }

  async renombrarLote(renombres, opciones = {}) {
    const resultados = [];

    for (const renombre of renombres) {
      const resultado = await this.renombrar(
        renombre.origen,
        renombre.destino,
        opciones
      );
      resultados.push(resultado);
    }

    return resultados;
  }

  async renombrarConTimestamp(origen, prefijo = "backup_") {
    try {
      const path = await import("path");
      const timestamp = new Date().getTime();
      const extension = path.extname(origen);
      const nombreBase = path.basename(origen, extension);
      const directorio = path.dirname(origen);

      const destino = `${directorio}/${prefijo}${nombreBase}_${timestamp}${extension}`;

      return await this.renombrar(origen, destino);
    } catch (error) {
      console.error("Error en renombrado con timestamp:", error.message);
      return { exito: false, error: error.message };
    }
  }

  obtenerEstadisticas() {
    const total = this.registroRenombres.length;
    const exitosos = this.registroRenombres.filter((r) => r.exito).length;
    const fallidos = total - exitosos;

    return {
      totalRenombres: total,
      exitosos: exitosos,
      fallidos: fallidos,
      tasaExito: total > 0 ? ((exitosos / total) * 100).toFixed(2) + "%" : "0%",
    };
  }

  limpiarRegistro() {
    const count = this.registroRenombres.length;
    this.registroRenombres = [];
    return count;
  }
}

// EJEMPLO 6: USO DEL GESTOR DE RENOMBRADO
async function usarGestorRenombrado() {
  const gestor = new GestorRenombrado();

  const archivosARenombrar = [
    { origen: "./documento-viejo.txt", destino: "./documento-nuevo.txt" },
    { origen: "./imagen.jpg", destino: "./fotos/imagen-actualizada.jpg" },
    { origen: "./log.txt", destino: "./archivos/log-diario.txt" },
  ];

  console.log("Iniciando renombrado de lote de archivos...");
  const resultados = await gestor.renombrarLote(archivosARenombrar, {
    crearDirectorios: true,
    sobrescribir: false,
  });

  const estadisticas = gestor.obtenerEstadisticas();
  console.log("\nEstadísticas de renombrado:");
  console.log(`- Total: ${estadisticas.totalRenombres}`);
  console.log(`- Exitosos: ${estadisticas.exitosos}`);
  console.log(`- Fallidos: ${estadisticas.fallidos}`);
  console.log(`- Tasa de éxito: ${estadisticas.tasaExito}`);
}

// EJEMPLO 7: ORGANIZAR ARCHIVOS POR EXTENSIÓN
async function organizarPorExtension(directorio) {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const archivos = elementos.filter((elemento) => elemento.isFile());

    const resultados = [];

    for (const archivo of archivos) {
      const path = await import("path");
      const extension =
        path.extname(archivo.name).toLowerCase() || "sin-extension";
      const directorioDestino = `${directorio}/${extension.replace(".", "")}`;
      const destino = `${directorioDestino}/${archivo.name}`;

      // Crear directorio para la extensión si no existe
      try {
        await fs.access(directorioDestino);
      } catch (error) {
        if (error.code === "ENOENT") {
          await fs.mkdir(directorioDestino, { recursive: true });
        } else {
          throw error;
        }
      }

      // Mover el archivo
      try {
        await fs.rename(`${directorio}/${archivo.name}`, destino);
        console.log(`✅ Organizado: ${archivo.name} -> ${directorioDestino}/`);
        resultados.push({
          exito: true,
          archivo: archivo.name,
          destino: directorioDestino,
        });
      } catch (error) {
        console.error(`❌ Error organizando ${archivo.name}:`, error.message);
        resultados.push({
          exito: false,
          archivo: archivo.name,
          error: error.message,
        });
      }
    }

    return resultados;
  } catch (error) {
    console.error("Error organizando por extensión:", error.message);
    return [];
  }
}

// EJEMPLO 8: RENOMBRAR CON NUMERACIÓN SECUENCIAL
async function renombrarSecuencial(directorio, prefijo = "archivo_") {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const archivos = elementos.filter((elemento) => elemento.isFile());

    // Ordenar archivos alfabéticamente
    archivos.sort((a, b) => a.name.localeCompare(b.name));

    const resultados = [];

    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      const numero = (i + 1).toString().padStart(3, "0"); // 001, 002, etc.
      const extension = archivo.name.split(".").pop();
      const nuevoNombre = `${prefijo}${numero}.${extension}`;
      const origen = `${directorio}/${archivo.name}`;
      const destino = `${directorio}/${nuevoNombre}`;

      try {
        await fs.rename(origen, destino);
        console.log(
          `✅ Renombrado secuencial: ${archivo.name} -> ${nuevoNombre}`
        );
        resultados.push({
          exito: true,
          original: archivo.name,
          nuevo: nuevoNombre,
        });
      } catch (error) {
        console.error(`❌ Error renombrando ${archivo.name}:`, error.message);
        resultados.push({
          exito: false,
          archivo: archivo.name,
          error: error.message,
        });
      }
    }

    return resultados;
  } catch (error) {
    console.error("Error en renombrado secuencial:", error.message);
    return [];
  }
}

// EJEMPLO 9: MOVER ARCHIVOS POR FECHA
async function moverPorFecha(directorio, diasLimite = 30) {
  try {
    const elementos = await fs.readdir(directorio, { withFileTypes: true });
    const archivos = elementos.filter((elemento) => elemento.isFile());

    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - diasLimite);

    const resultados = [];

    for (const archivo of archivos) {
      const rutaCompleta = `${directorio}/${archivo.name}`;
      const stats = await fs.stat(rutaCompleta);

      if (stats.mtime < fechaLimite) {
        const path = await import("path");
        const fechaCarpeta = stats.mtime.toISOString().split("T")[0]; // YYYY-MM-DD
        const directorioDestino = `${directorio}/antiguos/${fechaCarpeta}`;
        const destino = `${directorioDestino}/${archivo.name}`;

        // Crear directorio de fecha si no existe
        try {
          await fs.access(directorioDestino);
        } catch (error) {
          if (error.code === "ENOENT") {
            await fs.mkdir(directorioDestino, { recursive: true });
          } else {
            throw error;
          }
        }

        // Mover el archivo
        try {
          await fs.rename(rutaCompleta, destino);
          console.log(
            `✅ Movido por fecha: ${archivo.name} -> ${directorioDestino}/`
          );
          resultados.push({
            exito: true,
            archivo: archivo.name,
            destino: directorioDestino,
            fecha: stats.mtime,
          });
        } catch (error) {
          console.error(`❌ Error moviendo ${archivo.name}:`, error.message);
          resultados.push({
            exito: false,
            archivo: archivo.name,
            error: error.message,
          });
        }
      }
    }

    return resultados;
  } catch (error) {
    console.error("Error moviendo por fecha:", error.message);
    return [];
  }
}

// EJEMPLO 10: RENOMBRAR CON VALIDACIÓN DE SEGURIDAD
async function renombrarSeguro(origen, destino, exclusiones = []) {
  // Lista de rutas críticas que NUNCA deberían renombrarse
  const rutasProtegidas = [
    "/",
    "/etc",
    "/bin",
    "/usr",
    "/var",
    "/home",
    "/System",
    "/Windows",
    "C:\\",
    "C:/Windows",
  ];

  // Convertir rutas a absolutas para comparación
  const path = await import("path");
  const origenAbsoluto = await fs.realpath(origen);
  const destinoAbsoluto = path.resolve(destino);

  // Verificar que no sean rutas protegidas
  const esRutaProtegida = rutasProtegidas.some(
    (protegida) =>
      origenAbsoluto.startsWith(protegida) ||
      destinoAbsoluto.startsWith(protegida)
  );

  if (esRutaProtegida) {
    throw new Error(`OPERACIÓN BLOQUEADA: Ruta protegida detectada`);
  }

  // Verificar exclusiones personalizadas
  const estaExcluida = exclusiones.some(
    (exclusion) =>
      origenAbsoluto.includes(exclusion) || destinoAbsoluto.includes(exclusion)
  );

  if (estaExcluida) {
    throw new Error(`OPERACIÓN BLOQUEADA: Ruta en lista de exclusiones`);
  }

  // Si pasa todas las validaciones, proceder con renombrado
  await fs.rename(origen, destino);
  console.log(`✅ Renombrado seguro completado: ${origen} -> ${destino}`);
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE RENOMBRADO Y MOVIMIENTO DE ARCHIVOS ===");

  // Crear archivos y directorios de prueba primero
  try {
    await fs.writeFile("./viejo-nombre.txt", "Contenido archivo viejo");
    await fs.writeFile("./archivo.txt", "Contenido archivo normal");
    await fs.mkdir("./backups", { recursive: true });

    // Ejemplo básico
    await renombrarArchivo();

    // Crear más archivos para ejemplos avanzados
    await fs.writeFile("./documento-viejo.txt", "Contenido documento");
    await fs.writeFile("./imagen.jpg", "contenido imagen simulado");
    await fs.writeFile("./log.txt", "contenido log");

    // Ejemplos avanzados
    await renombrarConVerificacion(
      "./documento-viejo.txt",
      "./documento-nuevo.txt"
    );
    await usarGestorRenombrado();
    await renombrarPorPatron("./", "viejo", "nuevo");

    // Limpiar archivos de prueba
    await fs.unlink("./nuevo-nombre.txt").catch(() => {});
    await fs.unlink("./documento-nuevo.txt").catch(() => {});
    await fs.rm("./backups", { recursive: true, force: true }).catch(() => {});
    await fs.rm("./fotos", { recursive: true, force: true }).catch(() => {});
    await fs.rm("./archivos", { recursive: true, force: true }).catch(() => {});
  } catch (error) {
    console.error("Error en ejemplos:", error.message);
  }
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**FUNCIONES PRINCIPALES EXPLICADAS:**

1. **`fs.unlink(ruta)`**: Elimina archivos o enlaces simbólicos
2. **`fs.rmdir(ruta)`**: Elimina directorios vacíos
3. **`fs.rm(ruta, opciones)`**: Función moderna que unifica la eliminación
   - `recursive: true` - Elimina directorios con contenido
   - `force: true` - No lanza error si el elemento no existe

**DIFERENCIAS CLAVE:**

- **`unlink()`**: Solo para archivos y enlaces simbólicos
- **`rmdir()`**: Solo para directorios vacíos
- **`rm()`**: Para cualquier tipo, con opciones para recursividad y fuerza

**PRECAUCIONES CRÍTICAS:**

- Las eliminaciones son permanentes e irreversibles
- Verificar siempre la ruta antes de eliminar
- Usar validaciones de seguridad para rutas críticas
- Considerar implementar confirmaciones interactivas
- Mantener registros de operaciones de eliminación

**USOS COMUNES:**

- Limpieza de archivos temporales
- Gestión de espacio en disco
- Rotación de logs
- Limpieza de caché de aplicaciones
- Operaciones de mantenimiento del sistema

Este código proporciona una base completa para trabajar con operaciones de eliminación de forma segura y controlada en Node.js.

## Manejo de Archivos Grandes con Streams

Para archivos de gran tamaño, es más eficiente usar streams en lugar de leer todo el contenido en memoria.

### Lectura con Streams

```jsx
// Importar el módulo de sistema de archivos (versión con callbacks)
// y la función once para manejar eventos una sola vez
import fs from "fs";
import { once } from "events";

// Función asíncrona para leer archivos grandes usando streams
// Los streams son esenciales para archivos que no caben en memoria
async function leerArchivoGrande(rutaArchivo) {
  // Crear stream de lectura
  // fs.createReadStream() crea un stream legible que lee el archivo en chunks
  const streamLectura = fs.createReadStream(rutaArchivo, {
    encoding: "utf8", // Codificación del archivo
    highWaterMark: 64 * 1024, // Tamaño de cada chunk: 64KB
    // highWaterMark controla el tamaño máximo de cada fragmento de datos
  });

  try {
    // Variables para trackear el progreso
    let totalBytes = 0;
    let numeroChunks = 0;

    // Manejar eventos del stream - 'data' se dispara cuando hay datos disponibles
    streamLectura.on("data", (chunk) => {
      numeroChunks++;
      totalBytes += chunk.length;
      console.log(`Procesando chunk ${numeroChunks}: ${chunk.length} bytes`);

      // Aquí puedes procesar cada chunk según tus necesidades
      // Ejemplo: buscar texto, transformar datos, analizar contenido, etc.
      // El chunk es una porción del archivo, no el archivo completo

      // EJEMPLO: Contar líneas en el chunk actual
      const lineasEnChunk = chunk.split("\n").length - 1;
      console.log(`  Líneas en chunk: ${lineasEnChunk}`);

      // EJEMPLO: Buscar una palabra específica
      if (chunk.includes("error")) {
        console.log('  ⚠️  Se encontró la palabra "error" en este chunk');
      }
    });

    // Evento 'end' - se dispara cuando todo el archivo ha sido leído
    streamLectura.on("end", () => {
      console.log(
        `Lectura completada: ${numeroChunks} chunks, ${totalBytes} bytes total`
      );
      console.log(
        `Tamaño promedio por chunk: ${(totalBytes / numeroChunks).toFixed(
          2
        )} bytes`
      );
    });

    // Evento 'error' - se dispara cuando ocurre un error en la lectura
    streamLectura.on("error", (error) => {
      console.error("Error en la lectura:", error.message);
    });

    // Evento 'open' - se dispara cuando el archivo se abre exitosamente
    streamLectura.on("open", () => {
      console.log(`Archivo abierto: ${rutaArchivo}`);
    });

    // Evento 'close' - se dispara cuando el stream se cierra
    streamLectura.on("close", () => {
      console.log("Stream cerrado");
    });

    // Esperar a que el stream termine usando once()
    // once() retorna una promise que se resuelve cuando el evento 'end' ocurre
    await once(streamLectura, "end");
  } catch (error) {
    console.error("Error en lectura por stream:", error.message);
  }
}

// Ejecutar la función
// leerArchivoGrande('./archivo-grande.log');

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: STREAM CON PAUSA Y REANUDACIÓN
async function leerConPausa(rutaArchivo) {
  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 32 * 1024, // 32KB chunks
  });

  let chunkCount = 0;

  stream.on("data", (chunk) => {
    chunkCount++;
    console.log(`Chunk ${chunkCount}: ${chunk.length} bytes`);

    // Pausar después de 5 chunks para simular procesamiento lento
    if (chunkCount === 5) {
      console.log("Pausando stream por 2 segundos...");
      stream.pause();

      setTimeout(() => {
        console.log("Reanudando stream...");
        stream.resume();
      }, 2000);
    }
  });

  stream.on("end", () => {
    console.log(`Lectura completada con pausas: ${chunkCount} chunks`);
  });

  await once(stream, "end");
}

// EJEMPLO 2: PROCESAR STREAM CON PIPELINE PARA TRANSFORMACIÓN
import { pipeline } from "stream/promises";
import { Transform } from "stream";

async function procesarConTransformacion(rutaArchivo) {
  // Crear un stream de transformación personalizado
  const transformador = new Transform({
    transform(chunk, encoding, callback) {
      // Convertir a mayúsculas como ejemplo de transformación
      const resultado = chunk.toString().toUpperCase();
      this.push(resultado);
      callback();
    },
  });

  const streamLectura = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 16 * 1024,
  });

  try {
    // Usar pipeline para conectar streams automáticamente
    await pipeline(streamLectura, transformador, async function* (source) {
      // Procesar los datos transformados
      let lineCount = 0;
      for await (const chunk of source) {
        lineCount += chunk.toString().split("\n").length - 1;
        console.log(`Chunk transformado: ${chunk.length} bytes`);
      }
      console.log(`Total líneas procesadas: ${lineCount}`);
    });
  } catch (error) {
    console.error("Error en pipeline:", error.message);
  }
}

// EJEMPLO 3: LECTURA CON LÍMITE DE VELOCIDAD (THROTTLING)
async function leerConThrottling(rutaArchivo, bytesPorSegundo = 10240) {
  // 10KB/s
  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 1024, // 1KB chunks pequeños para mejor control
  });

  let totalBytes = 0;
  let startTime = Date.now();

  stream.on("data", (chunk) => {
    totalBytes += chunk.length;
    const elapsedTime = Date.now() - startTime;
    const expectedTime = (totalBytes / bytesPorSegundo) * 1000;

    // Si vamos muy rápido, hacer una pausa
    if (elapsedTime < expectedTime) {
      const delay = expectedTime - elapsedTime;
      stream.pause();
      setTimeout(() => stream.resume(), delay);
    }

    console.log(`Procesados ${totalBytes} bytes, velocidad controlada`);
  });

  await once(stream, "end");
}

// EJEMPLO 4: BUSCAR PATRONES EN ARCHIVO GRANDE
async function buscarPatron(rutaArchivo, patron) {
  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 64 * 1024,
  });

  const regex = new RegExp(patron, "gi");
  let coincidencias = [];
  let numeroLinea = 1;
  let buffer = "";

  stream.on("data", (chunk) => {
    // Manejar chunks que pueden cortar líneas a la mitad
    buffer += chunk;
    const lineas = buffer.split("\n");

    // La última línea podría estar incompleta
    buffer = lineas.pop() || "";

    for (const linea of lineas) {
      const encontrados = linea.match(regex);
      if (encontrados) {
        coincidencias.push({
          linea: numeroLinea,
          contenido: linea.trim(),
          coincidencias: encontrados,
        });
      }
      numeroLinea++;
    }
  });

  stream.on("end", () => {
    // Procesar la última línea si queda algo en el buffer
    if (buffer.trim()) {
      const encontrados = buffer.match(regex);
      if (encontrados) {
        coincidencias.push({
          linea: numeroLinea,
          contenido: buffer.trim(),
          coincidencias: encontrados,
        });
      }
    }

    console.log(
      `Encontradas ${coincidencias.length} coincidencias del patrón "${patron}"`
    );
    coincidencias.forEach((coincidencia, index) => {
      console.log(
        `${index + 1}. Línea ${coincidencia.linea}: ${coincidencia.contenido}`
      );
    });
  });

  await once(stream, "end");
  return coincidencias;
}

// EJEMPLO 5: CONTADOR DE PALABRAS EN ARCHIVO GRANDE
async function contarPalabras(rutaArchivo) {
  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 128 * 1024,
  });

  let totalPalabras = 0;
  let totalLineas = 0;
  let buffer = "";

  stream.on("data", (chunk) => {
    buffer += chunk;
    const lineas = buffer.split("\n");
    buffer = lineas.pop() || "";

    totalLineas += lineas.length;

    for (const linea of lineas) {
      // Contar palabras (secuencias de caracteres no-espacio)
      const palabras = linea
        .trim()
        .split(/\s+/)
        .filter((p) => p.length > 0);
      totalPalabras += palabras.length;
    }
  });

  stream.on("end", () => {
    // Procesar última línea
    if (buffer.trim()) {
      totalLineas++;
      const palabras = buffer
        .trim()
        .split(/\s+/)
        .filter((p) => p.length > 0);
      totalPalabras += palabras.length;
    }

    console.log(`Estadísticas del archivo:`);
    console.log(`- Total líneas: ${totalLineas}`);
    console.log(`- Total palabras: ${totalPalabras}`);
    console.log(
      `- Promedio palabras por línea: ${(totalPalabras / totalLineas).toFixed(
        2
      )}`
    );
  });

  await once(stream, "end");
  return { lineas: totalLineas, palabras: totalPalabras };
}

// EJEMPLO 6: STREAM CON MANEJO DE ERRORES ROBUSTO
async function leerConManejoErrores(rutaArchivo) {
  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 64 * 1024,
  });

  let chunksProcesados = 0;
  let errores = [];

  // Manejador de datos
  stream.on("data", (chunk) => {
    try {
      chunksProcesados++;
      // Simular un error ocasional
      if (chunksProcesados === 3) {
        throw new Error("Error simulado en chunk 3");
      }
      console.log(`Chunk ${chunksProcesados} procesado: ${chunk.length} bytes`);
    } catch (error) {
      errores.push({
        chunk: chunksProcesados,
        error: error.message,
      });
      console.error(`Error en chunk ${chunksProcesados}:`, error.message);
    }
  });

  // Manejador de errores del stream
  stream.on("error", (error) => {
    console.error("Error del stream:", error.message);
    errores.push({ tipo: "stream", error: error.message });
  });

  stream.on("end", () => {
    console.log(`Procesamiento completado con ${errores.length} errores`);
    if (errores.length > 0) {
      console.log("Errores encontrados:", errores);
    }
  });

  await once(stream, "end");
  return { chunksProcesados, errores };
}

// EJEMPLO 7: LECTURA CON PROGRESO EN TIEMPO REAL
async function leerConProgreso(rutaArchivo) {
  // Primero obtener el tamaño total del archivo
  const stats = await fs.promises.stat(rutaArchivo);
  const tamañoTotal = stats.size;

  const stream = fs.createReadStream(rutaArchivo, {
    encoding: "utf8",
    highWaterMark: 64 * 1024,
  });

  let bytesLeidos = 0;

  stream.on("data", (chunk) => {
    bytesLeidos += chunk.length;
    const porcentaje = ((bytesLeidos / tamañoTotal) * 100).toFixed(1);
    console.log(
      `Progreso: ${porcentaje}% (${bytesLeidos}/${tamañoTotal} bytes)`
    );
  });

  stream.on("end", () => {
    console.log("✅ Lectura completada al 100%");
  });

  await once(stream, "end");
}

// EJEMPLO 8: CLASE PARA GESTIÓN DE STREAMS
class GestorStreams {
  constructor() {
    this.streamsActivos = new Map();
  }

  async leerArchivo(rutaArchivo, opciones = {}) {
    const config = {
      highWaterMark: 64 * 1024,
      encoding: "utf8",
      onData: null,
      onEnd: null,
      onError: null,
      ...opciones,
    };

    const stream = fs.createReadStream(rutaArchivo, {
      encoding: config.encoding,
      highWaterMark: config.highWaterMark,
    });

    const streamId = `${rutaArchivo}-${Date.now()}`;
    this.streamsActivos.set(streamId, stream);

    return new Promise((resolve, reject) => {
      let datosAcumulados = "";
      let chunks = 0;

      stream.on("data", (chunk) => {
        chunks++;
        datosAcumulados += chunk;

        if (config.onData) {
          config.onData(chunk, chunks);
        }
      });

      stream.on("end", () => {
        this.streamsActivos.delete(streamId);

        if (config.onEnd) {
          config.onEnd(datosAcumulados, chunks);
        }

        resolve({
          contenido: datosAcumulados,
          totalChunks: chunks,
          tamaño: datosAcumulados.length,
        });
      });

      stream.on("error", (error) => {
        this.streamsActivos.delete(streamId);

        if (config.onError) {
          config.onError(error);
        }

        reject(error);
      });
    });
  }

  cancelarLectura(rutaArchivo) {
    for (const [id, stream] of this.streamsActivos) {
      if (id.startsWith(rutaArchivo)) {
        stream.destroy();
        this.streamsActivos.delete(id);
        console.log(`Lectura cancelada: ${rutaArchivo}`);
        return true;
      }
    }
    return false;
  }

  obtenerStreamsActivos() {
    return Array.from(this.streamsActivos.keys());
  }
}

// EJEMPLO 9: USO DEL GESTOR DE STREAMS
async function usarGestorStreams() {
  const gestor = new GestorStreams();

  try {
    const resultado = await gestor.leerArchivo("./archivo-grande.log", {
      highWaterMark: 32 * 1024,
      onData: (chunk, chunkNumber) => {
        console.log(`Procesando chunk ${chunkNumber}: ${chunk.length} bytes`);
      },
      onEnd: (contenido, totalChunks) => {
        console.log(
          `Lectura completada: ${totalChunks} chunks, ${contenido.length} caracteres`
        );
      },
    });

    console.log("Resultado final:", resultado);
  } catch (error) {
    console.error("Error en gestor de streams:", error.message);
  }
}

// EJEMPLO 10: COMPARACIÓN STREAM vs READFILE
async function compararMetodos(rutaArchivo) {
  console.log("=== COMPARACIÓN: STREAM vs READFILE ===");

  // Método 1: Usando stream (eficiente en memoria)
  console.log("\n1. Usando Stream:");
  const inicioStream = Date.now();
  const stream = fs.createReadStream(rutaArchivo, { encoding: "utf8" });

  let chunksStream = 0;
  stream.on("data", () => chunksStream++);

  await once(stream, "end");
  const tiempoStream = Date.now() - inicioStream;
  console.log(`   Tiempo: ${tiempoStream}ms, Chunks: ${chunksStream}`);

  // Método 2: Usando readFile (carga todo en memoria)
  console.log("\n2. Usando readFile:");
  const inicioReadFile = Date.now();

  try {
    const datos = await fs.promises.readFile(rutaArchivo, "utf8");
    const tiempoReadFile = Date.now() - inicioReadFile;
    console.log(
      `   Tiempo: ${tiempoReadFile}ms, Tamaño: ${datos.length} caracteres`
    );

    console.log("\nComparación:");
    console.log(
      `   Stream fue ${(tiempoReadFile / tiempoStream).toFixed(2)}x más rápido`
    );
    console.log(
      `   readFile usó ${(datos.length / 1024 / 1024).toFixed(2)}MB de memoria`
    );
  } catch (error) {
    console.error("Error con readFile:", error.message);
  }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
  console.log("=== EJEMPLOS DE STREAMS PARA ARCHIVOS GRANDES ===");

  // Nota: Necesitarías archivos reales para probar estos ejemplos
  console.log("Estos ejemplos requieren archivos reales para funcionar");
  console.log(
    "Puedes crear archivos de prueba con: echo 'contenido' > archivo-prueba.log"
  );

  /*
    // Ejemplos (descomentar cuando tengas archivos de prueba)
    await leerArchivoGrande('./archivo-grande.log');
    await leerConPausa('./archivo-grande.log');
    await buscarPatron('./archivo-grande.log', 'error');
    await contarPalabras('./archivo-grande.log');
    await leerConProgreso('./archivo-grande.log');
    await usarGestorStreams();
    await compararMetodos('./archivo-grande.log');
    */
}

// Descomentar para ejecutar
// ejecutarEjemplos();
```

**CARACTERÍSTICAS PRINCIPALES EXPLICADAS:**

1. **`fs.createReadStream()`**: Crea un stream legible para archivos grandes
2. **`highWaterMark`**: Controla el tamaño de cada chunk (64KB en el ejemplo)
3. **Eventos del stream**: `data`, `end`, `error`, `open`, `close`
4. **`once()`**: Utilidad para esperar un evento una sola vez

**VENTAJAS DE LOS STREAMS:**

- **Eficiencia en memoria**: No carga el archivo completo en RAM
- **Procesamiento en tiempo real**: Puedes procesar datos mientras se leen
- **Control granular**: Pausar, reanudar, cancelar la lectura
- **Escalabilidad**: Maneja archivos de cualquier tamaño

**EVENTOS PRINCIPALES:**

- **`data`**: Se dispara cuando hay datos disponibles para procesar
- **`end`**: Se dispara cuando la lectura se completa
- **`error`**: Se dispara cuando ocurre un error
- **`open`**: Se dispara cuando el archivo se abre
- **`close`**: Se dispara cuando el stream se cierra

**USOS COMUNES:**

- Procesamiento de logs grandes
- Análisis de datasets extensos
- Procesamiento de archivos de video/audio
- Streaming de datos en tiempo real
- Aplicaciones que necesitan procesamiento incremental

Este código proporciona una base completa para trabajar con streams en Node.js, esencial para aplicaciones que necesitan manejar archivos grandes de manera eficiente.

### Escritura con Streams

```jsx
// Importar el módulo de sistema de archivos (versión con callbacks)
import fs from 'fs';

// Función asíncrona para escribir archivos grandes usando streams
// Los streams de escritura son esenciales para generar archivos grandes eficientemente
async function escribirArchivoGrande(rutaDestino, lineas) {
    return new Promise((resolve, reject) => {
        // Crear stream de escritura
        // fs.createWriteStream() crea un stream escribible que escribe al archivo en chunks
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'  // Codificación del archivo de salida
            // highWaterMark por defecto es 16KB para streams de escritura
        });

        // Evento 'finish' - se dispara cuando todos los datos han sido escritos
        // y el stream ha sido cerrado con .end()
        streamEscritura.on('finish', () => {
            console.log('Escritura completada exitosamente');
            resolve();
        });

        // Evento 'error' - se dispara cuando ocurre un error en la escritura
        streamEscritura.on('error', (error) => {
            console.error('Error en la escritura:', error.message);
            reject(error);
        });

        // Evento 'open' - se dispara cuando el archivo se abre para escritura
        streamEscritura.on('open', () => {
            console.log(`Archivo abierto para escritura: ${rutaDestino}`);
        });

        // Evento 'close' - se dispara cuando el stream se cierra
        streamEscritura.on('close', () => {
            console.log('Stream de escritura cerrado');
        });

        // Escribir datos línea por línea
        let lineasEscritas = 0;
        let drenajesNecesarios = 0;

        for (const linea of lineas) {
            // streamEscritura.write() retorna false si el buffer interno está lleno
            // Esto se conoce como "backpressure" - el stream indica que no puede aceptar más datos temporalmente
            const puedeContinuar = streamEscritura.write(linea + '\n');
            lineasEscritas++;

            // Controlar backpressure - pausar si el buffer está lleno
            if (!puedeContinuar) {
                drenajesNecesarios++;
                console.log(`Backpressure detectado en línea ${lineasEscritas}. Esperando drenaje...`);

                // Esperar a que el buffer se vacíe (evento 'drain')
                // El evento 'drain' se emite cuando el buffer interno se ha vaciado
                // y el stream puede aceptar más datos
                streamEscritura.once('drain', () => {
                    console.log(`Drenaje completado (${drenajesNecesarios}). Continuando escritura...`);
                });
            }
        }

        // Indicar que no hay más datos por escribir
        // Esto es esencial - sin .end() el stream nunca emitirá 'finish'
        streamEscritura.end();

        console.log(`Total líneas enviadas: ${lineasEscritas}`);
        console.log(`Drenajes necesarios: ${drenajesNecesarios}`);

    });
}

// Ejemplo de uso
const lineas = Array.from({ length: 10000 }, (_, i) => `Línea ${i + 1}`);
escribirArchivoGrande('./archivo-grande-salida.txt', lineas);

// EJEMPLOS ADICIONALES Y EXPLICACIONES DETALLADAS:

// EJEMPLO 1: ESCRITURA CON HIGHWATERMARK PERSONALIZADO
async function escribirConHighWaterMark(rutaDestino, datos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8',
            highWaterMark: 8 * 1024 // 8KB - buffer más pequeño para backpressure más frecuente
        });

        let bytesEscritos = 0;
        let drenajes = 0;

        streamEscritura.on('finish', () => {
            console.log(`Escritura completada: ${bytesEscritos} bytes, ${drenajes} drenajes`);
            resolve();
        });

        streamEscritura.on('error', reject);

        for (const dato of datos) {
            const datoConSalto = dato + '\n';
            bytesEscritos += Buffer.byteLength(datoConSalto, 'utf8');

            const puedeContinuar = streamEscritura.write(datoConSalto);

            if (!puedeContinuar) {
                drenajes++;
                streamEscritura.once('drain', () => {
                    console.log(`Drenaje ${drenajes} completado`);
                });
            }
        }

        streamEscritura.end();
    });
}

// EJEMPLO 2: ESCRITURA CON GENERADOR DE DATOS ASÍNCRONO
async function escribirDesdeGenerador(rutaDestino, generadorDatos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        let escriturasPendientes = 0;
        let completado = false;

        async function escribirSiguiente() {
            const { value: dato, done } = await generadorDatos.next();

            if (done) {
                completado = true;
                // Esperar a que todas las escrituras pendientes terminen
                if (escriturasPendientes === 0) {
                    streamEscritura.end();
                }
                return;
            }

            escriturasPendientes++;
            const puedeContinuar = streamEscritura.write(dato + '\n');

            if (!puedeContinuar) {
                await new Promise(resolve => {
                    streamEscritura.once('drain', () => {
                        escriturasPendientes--;
                        resolve();
                    });
                });
            } else {
                escriturasPendientes--;
            }

            // Escribir siguiente dato
            escribirSiguiente();
        }

        streamEscritura.on('finish', resolve);
        streamEscritura.on('error', reject);

        // Iniciar el proceso de escritura
        escribirSiguiente();
    });
}

// EJEMPLO 3: ESCRITURA CON TRANSFORMACIÓN DE DATOS
import { Transform } from 'stream';

async function escribirConTransformacion(rutaDestino, datos) {
    return new Promise((resolve, reject) => {
        // Crear un stream de transformación personalizado
        const transformador = new Transform({
            transform(chunk, encoding, callback) {
                // Transformar datos - en este caso, convertir a JSON
                try {
                    const datoTransformado = JSON.stringify({
                        timestamp: new Date().toISOString(),
                        data: chunk.toString().trim(),
                        length: chunk.length
                    }) + '\n';
                    this.push(datoTransformado);
                    callback();
                } catch (error) {
                    callback(error);
                }
            }
        });

        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        // Conectar los streams
        transformador.pipe(streamEscritura);

        streamEscritura.on('finish', () => {
            console.log('Escritura con transformación completada');
            resolve();
        });

        streamEscritura.on('error', reject);
        transformador.on('error', reject);

        // Escribir datos a través del transformador
        for (const dato of datos) {
            transformador.write(dato);
        }

        transformador.end();
    });
}

// EJEMPLO 4: ESCRITURA CON COMPRESIÓN
import zlib from 'zlib';

async function escribirComprimido(rutaDestino, datos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino);
        const compresor = zlib.createGzip(); // Compresor GZIP

        let datosOriginales = 0;
        let datosComprimidos = 0;

        compresor.on('data', (chunk) => {
            datosComprimidos += chunk.length;
        });

        // Pipe: compresor -> escritura
        compresor.pipe(streamEscritura);

        streamEscritura.on('finish', () => {
            const ratio = ((1 - datosComprimidos / datosOriginales) * 100).toFixed(1);
            console.log(`Compresión completada: ${datosOriginales} -> ${datosComprimidos} bytes (${ratio}% reducción)`);
            resolve();
        });

        streamEscritura.on('error', reject);
        compresor.on('error', reject);

        // Escribir datos al compresor
        for (const dato of datos) {
            const buffer = Buffer.from(dato + '\n', 'utf8');
            datosOriginales += buffer.length;
            compresor.write(buffer);
        }

        compresor.end();
    });
}

// EJEMPLO 5: ESCRITURA CON VALIDACIÓN Y REINTENTOS
async function escribirConReintentos(rutaDestino, datos, maxReintentos = 3) {
    let reintentos = 0;

    while (reintentos <= maxReintentos) {
        try {
            await escribirConValidacion(rutaDestino, datos);
            console.log('Escritura exitosa');
            return;
        } catch (error) {
            reintentos++;
            console.error(`Intento ${reintentos} fallado:`, error.message);

            if (reintentos > maxReintentos) {
                throw new Error(`Fallo después de ${maxReintentos} reintentos: ${error.message}`);
            }

            // Esperar antes de reintentar (backoff exponencial)
            await new Promise(resolve => setTimeout(resolve, 1000 * reintentos));
            console.log(`Reintentando escritura (intento ${reintentos + 1})...`);
        }
    }
}

async function escribirConValidacion(rutaDestino, datos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        let bytesPrometidos = 0;
        let errores = [];

        streamEscritura.on('finish', async () => {
            // Validar que el archivo se escribió correctamente
            try {
                const stats = await fs.promises.stat(rutaDestino);
                if (stats.size === 0) {
                    throw new Error('Archivo creado pero vacío');
                }
                console.log(`Validación exitosa: ${stats.size} bytes escritos`);
                resolve();
            } catch (error) {
                reject(new Error(`Validación fallida: ${error.message}`));
            }
        });

        streamEscritura.on('error', reject);

        for (const dato of datos) {
            try {
                // Validar dato antes de escribir
                if (typeof dato !== 'string') {
                    throw new Error(`Dato inválido: ${typeof dato}`);
                }

                const datoParaEscribir = dato + '\n';
                bytesPrometidos += Buffer.byteLength(datoParaEscribir, 'utf8');

                const puedeContinuar = streamEscritura.write(datoParaEscribir);

                if (!puedeContinuar) {
                    await new Promise(resolve => {
                        streamEscritura.once('drain', resolve);
                    });
                }
            } catch (error) {
                errores.push(error.message);
                console.error('Error validando dato:', error.message);
            }
        }

        if (errores.length > 0) {
            console.warn(`${errores.length} errores de validación durante la escritura`);
        }

        streamEscritura.end();
    });
}

// EJEMPLO 6: CLASE PARA GESTIÓN DE ESCRITURA DE STREAMS
class GestorEscrituraStreams {
    constructor() {
        this.streamsActivos = new Map();
        this.estadisticas = new Map();
    }

    async escribirArchivo(rutaDestino, datos, opciones = {}) {
        const config = {
            highWaterMark: 16 * 1024,
            encoding: 'utf8',
            comprimir: false,
            transformar: null,
            ...opciones
        };

        return new Promise((resolve, reject) => {
            const streamEscritura = fs.createWriteStream(rutaDestino, {
                encoding: config.encoding,
                highWaterMark: config.highWaterMark
            });

            const streamId = `${rutaDestino}-${Date.now()}`;
            this.streamsActivos.set(streamId, streamEscritura);

            const estadisticas = {
                inicio: new Date(),
                datosEscritos: 0,
                drenajes: 0,
                lineasEscritas: 0
            };
            this.estadisticas.set(streamId, estadisticas);

            streamEscritura.on('finish', () => {
                estadisticas.fin = new Date();
                estadisticas.duracion = estadisticas.fin - estadisticas.inicio;
                this.streamsActivos.delete(streamId);

                console.log(`Escritura completada: ${estadisticas.lineasEscritas} líneas, ${estadisticas.drenajes} drenajes`);
                resolve(estadisticas);
            });

            streamEscritura.on('error', (error) => {
                this.streamsActivos.delete(streamId);
                this.estadisticas.delete(streamId);
                reject(error);
            });

            // Escribir datos
            for (const dato of datos) {
                let datoParaEscribir = dato;

                // Aplicar transformación si se especifica
                if (config.transformar && typeof config.transformar === 'function') {
                    datoParaEscribir = config.transformar(dato);
                }

                const lineaCompleta = datoParaEscribir + '\n';
                estadisticas.datosEscritos += Buffer.byteLength(lineaCompleta, 'utf8');
                estadisticas.lineasEscritas++;

                const puedeContinuar = streamEscritura.write(lineaCompleta);

                if (!puedeContinuar) {
                    estadisticas.drenajes++;
                    streamEscritura.once('drain', () => {
                        console.log(`Drenaje ${estadisticas.drenajes} completado para ${streamId}`);
                    });
                }
            }

            streamEscritura.end();
        });
    }

    cancelarEscritura(rutaDestino) {
        for (const [id, stream] of this.streamsActivos) {
            if (id.startsWith(rutaDestino)) {
                stream.destroy();
                this.streamsActivos.delete(id);
                const stats = this.estadisticas.get(id);
                this.estadisticas.delete(id);
                console.log(`Escritura cancelada: ${rutaDestino} (${stats?.lineasEscritas} líneas escritas)`);
                return true;
            }
        }
        return false;
    }

    obtenerEstadisticas() {
        return Array.from(this.estadisticas.entries()).map(([id, stats]) => ({
            id,
            ...stats
        }));
    }
}

// EJEMPLO 7: ESCRITURA CON PROGRESO EN TIEMPO REAL
async function escribirConProgreso(rutaDestino, datos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        const totalDatos = datos.length;
        let datosEscritos = 0;
        let ultimoProgreso = 0;

        function actualizarProgreso() {
            datosEscritos++;
            const progreso = Math.floor((datosEscritos / totalDatos) * 100);

            // Solo mostrar cuando el progreso cambia significativamente
            if (progreso !== ultimoProgreso && progreso % 10 === 0) {
                console.log(`Progreso: ${progreso}% (${datosEscritos}/${totalDatos})`);
                ultimoProgreso = progreso;
            }
        }

        streamEscritura.on('finish', () => {
            console.log('✅ Escritura completada al 100%');
            resolve();
        });

        streamEscritura.on('error', reject);

        for (const dato of datos) {
            const puedeContinuar = streamEscritura.write(dato + '\n');
            actualizarProgreso();

            if (!puedeContinuar) {
                streamEscritura.once('drain', () => {
                    console.log('Buffer drenado, continuando...');
                });
            }
        }

        streamEscritura.end();
    });
}

// EJEMPLO 8: ESCRITURA CONCATENANDO MÚLTIPLES FUENTES
async function escribirDesdeMultiplesFuentes(rutaDestino, fuentesDeDatos) {
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        let fuentesCompletadas = 0;
        let lineasTotales = 0;

        streamEscritura.on('finish', () => {
            console.log(`Escritura completada: ${fuentesCompletadas} fuentes, ${lineasTotales} líneas`);
            resolve();
        });

        streamEscritura.on('error', reject);

        async function escribirFuente(fuente) {
            for await (const dato of fuente) {
                const puedeContinuar = streamEscritura.write(dato + '\n');
                lineasTotales++;

                if (!puedeContinuar) {
                    await new Promise(resolve => {
                        streamEscritura.once('drain', resolve);
                    });
                }
            }
            fuentesCompletadas++;
        }

        // Escribir todas las fuentes en paralelo
        Promise.all(fuentesDeDatos.map(escribirFuente))
            .then(() => streamEscritura.end())
            .catch(reject);
    });
}

// EJEMPLO 9: ESCRITURA CON LÍMITE DE VELOCIDAD
async function escribirConThrottling(rutaDestino, datos, bytesPorSegundo = 10240) { // 10KB/s
    return new Promise((resolve, reject) => {
        const streamEscritura = fs.createWriteStream(rutaDestino, {
            encoding: 'utf8'
        });

        let bytesEscritos = 0;
        let inicio = Date.now();
        let indice = 0;

        function escribirSiguiente() {
            if (indice >= datos.length) {
                streamEscritura.end();
                return;
            }

            const dato = datos[indice];
            const datoConSalto = dato + '\n';
            const bytesDato = Buffer.byteLength(datoConSalto, 'utf8');

            // Calcular si necesitamos esperar para mantener el límite de velocidad
            const tiempoTranscurrido = Date.now() - inicio;
            const tiempoEsperado = (bytesEscritos / bytesPorSegundo) * 1000;

            if (tiempoTranscurrido < tiempoEsperado) {
                const espera = tiempoEsperado - tiempoTranscurrido;
                setTimeout(escribirSiguiente, espera);
                return;
            }

            const puedeContinuar = streamEscritura.write(datoConSalto);
            bytesEscritos += bytesDato;
            indice++;

            if (!puedeContinuar) {
                streamEscritura.once('drain', escribirSiguiente);
            } else {
                setImmediate(escribirSiguiente);
            }
        }

        streamEscritura.on('finish', () => {
            const duracion = (Date.now() - inicio) / 1000;
            const velocidad = (bytesEscritos / duracion / 1024).toFixed(2);
            console.log(`Escritura throttled completada: ${velocidad} KB/s`);
            resolve();
        });

        streamEscritura.on('error', reject);

        // Iniciar el proceso
        escribirSiguiente();
    });
}

// EJEMPLO 10: COMPARACIÓN STREAM vs WRITEFILE
async function compararMetodosEscritura(rutaDestino, datos) {
    console.log('=== COMPARACIÓN: STREAM vs WRITEFILE ===');

    // Método 1: Usando stream (eficiente en memoria)
    console.log('\n1. Usando Stream:');
    const inicioStream = Date.now();

    await new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(rutaDestino + '.stream', { encoding: 'utf8' });

        for (const dato of datos) {
            stream.write(dato + '\n');
        }

        stream.end();
        stream.on('finish', resolve);
        stream.on('error', reject);
    });

    const tiempoStream = Date.now() - inicioStream;
    console.log(`   Tiempo: ${tiempoStream}ms`);

    // Método 2: Usando writeFile (concatena todo en memoria primero)
    console.log('\n2. Usando writeFile:');
    const inicioWriteFile = Date.now();

    try {
        const contenido = datos.map(dato => dato + '\n').join('');
        await fs.promises.writeFile(rutaDestino + '.writefile', contenido, 'utf8');
        const tiempoWriteFile = Date.now() - inicioWriteFile;

        console.log(`   Tiempo: ${tiempoWriteFile}ms`);
        console.log(`   Memoria usada: ${(Buffer.byteLength(contenido, 'utf8') / 1024 / 1024).toFixed(2)}MB`);

        console.log('\nComparación:');
        const ratio = tiempoWriteFile / tiempoStream;
        console.log(`   Stream fue ${ratio.toFixed(2)}x ${ratio > 1 ? 'más rápido' : 'más lento'}`);

    } catch (error) {
        console.error('Error con writeFile:', error.message);
    }
}

// EJECUCIÓN DE EJEMPLOS
async function ejecutarEjemplos() {
    console.log("=== EJEMPLOS DE ESCRITURA CON STREAMS ===");

    const datosPrueba = Array.from({ length: 1000 }, (_, i) => `Dato de prueba ${i + 1}`);

    // Ejemplo básico
    await escribirArchivoGrande('./ejemplo-stream.txt', datosPrueba.slice(0, 100));

    // Ejemplos avanzados
    await escribirConHighWaterMark('./ejemplo-highwatermark.txt', datosPrueba.slice(0, 50));
    await escribirConProgreso('./ejemplo-progreso.txt', datosPrueba);

    // Usar gestor de streams
    const gestor = new GestorEscrituraStreams();
    await gestor.escribirArchivo('./ejemplo-gestor.txt', datosPrueba, {
        transformar: (dato) => `TRANSFORMADO: ${dato.toUpperCase()}`
    });

    console.log('Estadísticas del gestor:', gestor.obtenerEstadisticas());

    // Comparación de métodos
    await compararMetodosEscritura('./comparacion', datosPrueba);

    // Limpiar archivos de ejemplo
    try {
        await fs.promises.unlink('./ejemplo-stream.txt');
        await fs.promises.unlink('./ejemplo-highwatermark.txt');
        await fs.promises.unlink('./ejemplo-progreso.txt');
        await fs.promises.unlink('./ejemplo-gestor.txt');
        await fs.promises.unlink('./comparacion.stream');
        await fs.promises.unlink('./comparacion.writefile');
    } catch (error) {
        // Ignorar errores de limpieza
    }
}

// Descomentar para ejecutar
// ejecutarEjemplos();
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
