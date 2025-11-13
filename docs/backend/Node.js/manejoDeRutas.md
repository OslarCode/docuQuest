# Guía de Manejo de Rutas en Node.js con ES Modules

## Introducción al Sistema de Rutas en Node.js

Node.js proporciona módulos nativos para el manejo de rutas de archivos y URLs. Los principales módulos son `path` y `url`, que ofrecen utilidades para trabajar con rutas del sistema de archivos y URLs respectivamente.

## Importante: Diferencia entre CommonJS y ES Modules

### Explicación de `__dirname` y `__filename` en ES Modules

En CommonJS (el sistema de módulos antiguo de Node.js), las variables `__dirname` y `__filename` estaban disponibles automáticamente. Sin embargo, en ES Modules (el estándar moderno) necesitamos construirlas manualmente.

**¿Por qué este cambio?**

- ES Modules es un estándar universal de JavaScript que funciona en navegadores y otros entornos
- Los navegadores no tienen sistema de archivos, por lo que `__dirname` no tiene sentido allí
- Node.js se adapta al estándar usando `import.meta.url`

### Cómo obtener `__dirname` y `__filename` en ES Modules

```javascript
// IMPORTANTE: En ES Modules (la versión moderna de JavaScript) no tenemos acceso directo a las variables __dirname y __filename
// que sí estaban disponibles en CommonJS (la versión antigua). Por eso necesitamos este código.

// Importamos el módulo 'path' que nos permite trabajar con rutas de archivos y directorios
import path from "path";

// Importamos la función 'fileURLToPath' del módulo 'url' que convierte URLs de archivos en rutas de sistema
import { fileURLToPath } from "url";

// ¿QUÉ HACE ESTE CÓDIGO?
// Necesitamos recrear las variables __filename y __dirname que nos dicen:
// - __filename: La ruta completa del archivo actual
// - __dirname: La carpeta donde está ubicado el archivo actual

// PASO 1: Obtener __filename (ruta completa del archivo)
// import.meta.url nos da la URL del módulo actual en formato "file:///ruta/completa/archivo.js"
// fileURLToPath convierte esa URL en una ruta de sistema normal: "/ruta/completa/archivo.js"
const __filename = fileURLToPath(import.meta.url);

// PASO 2: Obtener __dirname (carpeta contenedora)
// path.dirname() toma una ruta de archivo y devuelve solo el directorio que lo contiene
// Si __filename es "/usuarios/proyecto/app.js", __dirname será "/usuarios/proyecto"
const __dirname = path.dirname(__filename);

// EJEMPLO PRÁCTICO:
// Si este archivo se llama "app.js" y está en "C:\mi-proyecto\src\app.js"
// __filename será: "C:\mi-proyecto\src\app.js" (o "/mi-proyecto/src/app.js" en Linux/Mac)
// __dirname será: "C:\mi-proyecto\src" (o "/mi-proyecto/src" en Linux/Mac)

// Mostramos los resultados en consola
console.log("Ruta del archivo:", __filename);
console.log("Directorio:", __dirname);

// ¿POR QUÉ ES ÚTIL ESTO?
// Estas variables son esenciales para:
// - Leer archivos de configuración relativos al proyecto
// - Acceder a recursos como imágenes, plantillas, etc.
// - Construir rutas dinámicas en tu aplicación

// EJEMPLO DE USO PRÁCTICO:
// const rutaConfig = path.join(__dirname, 'config', 'database.json');
// const rutaImagen = path.join(__dirname, '..', 'assets', 'logo.png');
```

## Módulo Path - Manejo de Rutas del Sistema de Archivos

### Métodos Principales del Módulo Path

#### path.join() - Unir Segmentos de Ruta

```javascript
// UNIÓN INTELIGENTE DE RUTAS CON path.join()

// path.join() es como un "constructor de rutas inteligente" que:
// - Combina múltiples partes de rutas
// - Maneja automáticamente las barras (/) según el sistema operativo
// - Resuelve referencias como '..' (directorio padre) y '.' (directorio actual)

// EJEMPLO 1: Navegación entre directorios
const rutaCompleta = path.join(__dirname, 'archivos', 'documentos', '..', 'imagenes');
console.log(rutaCompleta);
// Ejemplo de salida: /ruta/al/proyecto/archivos/imagenes

// DESGLOSE PASO A PASO de lo que hace path.join():
// 1. __dirname = "/ruta/al/proyecto" (directorio base)
// 2. + 'archivos' → "/ruta/al/proyecto/archivos"
// 3. + 'documentos' → "/ruta/al/proyecto/archivos/documentos"
// 4. + '..' (SUBIR un nivel) → "/ruta/al/proyecto/archivos"
// 5. + 'imagenes' → "/ruta/al/proyecto/archivos/imagenes"

// EL '..' ES CLAVE: Te permite "retroceder" en la estructura de carpetas
// Es como decir: "ve a documentos, luego vuelve atrás, y entra en imagenes"

// EJEMPLO 2: Uso práctico para archivos estáticos en un servidor web
const rutaArchivo = path.join(__dirname, 'public', 'css', 'estilos.css');
console.log(Sirviendo archivo: ${rutaArchivo});
// Ejemplo de salida: Sirviendo archivo: /ruta/al/proyecto/public/css/estilos.css

// ESTRUCTURA DE CARPETAS EJEMPLO:
// mi-proyecto/
// ├── app.js (este archivo)
// ├── public/
// │   ├── css/
// │   │   └── estilos.css
// │   └── imagenes/
// └── archivos/
//     ├── documentos/
//     └── imagenes/

// VENTAJAS DE USAR path.join() vs concatenar strings:
// 1. EVITA ERRORES con las barras:
//    path.join('carpeta', 'subcarpeta') → "carpeta/subcarpeta" (Linux/Mac) o "carpeta\subcarpeta" (Windows)
//    'carpeta' + '/' + 'subcarpeta' → Puede fallar en Windows

// 2. NORMALIZA LA RUTA automáticamente:
//    path.join('carpeta//', 'subcarpeta/') → "carpeta/subcarpeta"

// 3. MANEJA REFERENCIAS RELATIVAS:
//    path.join('carpeta', '..', 'otra-carpeta') → "otra-carpeta"

// USOS COMUNES EN DESARROLLO WEB:
// - Servir archivos estáticos (CSS, JS, imágenes)
// - Configurar rutas de plantillas
// - Acceder a archivos de configuración
// - Definir rutas de uploads o logs

// IMPORTANTE: path.join() NO verifica si la ruta existe, solo la construye
// Para verificar existencia necesitarías el módulo 'fs'
```

#### path.resolve() - Resolver Rutas Absolutas

```javascript
// RESOLUCIÓN DE RUTAS ABSOLUTAS CON path.resolve()

// path.resolve() construye una ruta absoluta resolviendo una secuencia de rutas relativas
// A diferencia de path.join(), resolve() siempre retorna una ruta absoluta completa
// Funciona resolviendo las rutas de derecha a izquierda hasta construir una ruta absoluta

// Ejemplo básico: Resolver rutas relativas desde el directorio actual de trabajo
const rutaAbsoluta = path.resolve("src", "components", "Header.jsx");
console.log(rutaAbsoluta);
// Ejemplo: /ruta/actual/src/components/Header.jsx

// Como funciona path.resolve():
// 1. Toma los segmentos: 'src', 'components', 'Header.jsx'
// 2. Comienza desde el directorio actual de trabajo (process.cwd())
// 3. Construye la ruta absoluta combinando el directorio actual con los segmentos

// Ejemplo práctico con __dirname para mayor precisión
const configPath = path.resolve(__dirname, "config", "database.json");
console.log(`Archivo de configuración: ${configPath}`);

// DIFERENCIAS CLAVE ENTRE path.join() Y path.resolve():

// path.join() - Solo une rutas, mantiene el tipo (relativa/absoluta)
// Ejemplo: path.join('a', 'b', 'c') → "a/b/c" (ruta relativa)

// path.resolve() - Siempre retorna ruta absoluta
// Ejemplo: path.resolve('a', 'b', 'c') → "/directorio/actual/a/b/c" (ruta absoluta)

// COMPORTAMIENTO DE path.resolve() CON MÚLTIPLES ARGUMENTOS:
// Resuelve de derecha a izquierda hasta encontrar una ruta absoluta

// Ejemplo: path.resolve('/a', '/b', 'c')
// 1. Comienza con 'c' (relativo)
// 2. Luego '/b' (absoluto) → descarta todo lo anterior
// 3. Resultado: '/b/c'

// CASOS DE USO TÍPICOS PARA path.resolve():

// 1. Configuración de aplicaciones - Para asegurar rutas absolutas a archivos de config
// 2. Servidores web - Para definir rutas absolutas a recursos estáticos
// 3. Scripts de build - Para referenciar archivos de manera precisa
// 4. Herramientas de desarrollo - Cuando necesitas rutas completas y no relativas

// EJEMPLO ADICIONAL: Resolución desde diferentes puntos
const ruta1 = path.resolve("."); // Directorio actual de trabajo
const ruta2 = path.resolve(".."); // Directorio padre del directorio actual
const ruta3 = path.resolve("/home", "usuario", "proyecto"); // Ruta absoluta explícita

console.log("Directorio actual:", ruta1);
console.log("Directorio padre:", ruta2);
console.log("Ruta explícita:", ruta3);
```

#### path.dirname() - Obtener Directorio Padre

```javascript
// OBTENCIÓN DEL DIRECTORIO PADRE CON path.dirname()

// path.dirname() es una función que extrae la parte del directorio de una ruta de archivo
// Es equivalente a obtener todo lo que está antes de la última barra en una ruta

// Ejemplo básico: Extraer el directorio de una ruta absoluta
const directorio = path.dirname("/usuarios/juan/proyecto/src/app.js");
console.log(directorio); // /usuarios/juan/proyecto/src

// Como funciona path.dirname():
// - Toma una ruta completa como entrada
// - Elimina el último segmento (el nombre del archivo)
// - Retorna la ruta del directorio que contiene el archivo

// Ejemplos adicionales para entender el comportamiento:
const ejemplo1 = path.dirname("/a/b/c/d.txt"); // Retorna: '/a/b/c'
const ejemplo2 = path.dirname("/a/b/c/"); // Retorna: '/a/b/c'
const ejemplo3 = path.dirname("archivo.js"); // Retorna: '.' (directorio actual)
const ejemplo4 = path.dirname("/solo/"); // Retorna: '/solo'

// Uso práctico con __filename en aplicaciones reales
console.log(`Directorio actual: ${__dirname}`);

// DIFERENCIA ENTRE __dirname Y path.dirname(__filename):
// - __dirname ya contiene el directorio del archivo actual
// - path.dirname(__filename) haría lo mismo pero es redundante
// - __dirname es más directo y eficiente para este caso específico

// CASOS DE USO COMUNES PARA path.dirname():

// 1. Navegación en estructuras de archivos
const configDir = path.dirname("/proyecto/config/database.json");
// Resultado: '/proyecto/config'

// 2. Obtener directorios padres múltiples niveles
const proyectoDir = path.dirname(path.dirname("/proyecto/src/app.js"));
// Resultado: '/proyecto' (sube dos niveles)

// 3. Procesamiento de rutas dinámicas
function obtenerDirectorioContenedor(rutaArchivo) {
  return path.dirname(rutaArchivo);
}

// 4. En combinación con otras funciones de path
const rutaCompleta = "/home/usuario/documentos/informe.pdf";
const directorioPadre = path.dirname(rutaCompleta);
const nombreArchivo = path.basename(rutaCompleta);

console.log(`Archivo: ${nombreArchivo}`);
console.log(`Ubicado en: ${directorioPadre}`);

// IMPORTANTE: path.dirname() trabaja exclusivamente con análisis de strings
// No verifica si la ruta existe en el sistema de archivos
// Solo realiza operaciones de manipulación de strings basadas en las barras de directorio
```

#### path.basename() - Obtener Nombre del Archivo

```javascript
// OBTENCIÓN DEL NOMBRE DE ARCHIVO CON path.basename()

// path.basename() es una función que extrae la última parte de una ruta de archivo
// Es decir, obtiene el nombre del archivo o directorio final de una ruta

// Ejemplo básico: Extraer el nombre de archivo de una ruta completa
const nombreArchivo = path.basename("/usuarios/juan/documento.txt");
console.log(nombreArchivo); // documento.txt

// Como funciona path.basename():
// - Toma una ruta completa como entrada
// - Identifica el último segmento después de la última barra
// - Retorna solo el nombre del archivo o directorio final

// Ejemplos adicionales para entender el comportamiento:
const ejemplo1 = path.basename("/a/b/c/d.txt"); // Retorna: 'd.txt'
const ejemplo2 = path.basename("/a/b/c/"); // Retorna: 'c'
const ejemplo3 = path.basename("archivo.js"); // Retorna: 'archivo.js'
const ejemplo4 = path.basename("/solo/"); // Retorna: 'solo'

// USO CON SEGUNDO PARÁMETRO PARA ELIMINAR EXTENSIÓN
// El segundo parámetro opcional permite remover una extensión específica
const nombreSinExtension = path.basename(
  "/usuarios/juan/documento.txt",
  ".txt"
);
console.log(nombreSinExtension); // documento

// El segundo parámetro debe coincidir exactamente con la extensión a remover
// Incluyendo el punto y siendo case-sensitive en algunos sistemas

// Ejemplos con el segundo parámetro:
const ejemplo5 = path.basename("/ruta/archivo.html", ".html"); // 'archivo'
const ejemplo6 = path.basename("/ruta/archivo.js", ".js"); // 'archivo'
const ejemplo7 = path.basename("/ruta/archivo.txt", ".js"); // 'archivo.txt' (no coincide)

// CASOS DE USO COMUNES PARA path.basename():

// 1. Procesamiento de archivos subidos
const archivoSubido = "/tmp/upload/imagen_usuario.jpg";
const nombreArchivoSubido = path.basename(archivoSubido);
// Útil para renombrar o almacenar referencias

// 2. Generación de nombres de archivo para descargas
function generarNombreDescarga(rutaCompleta) {
  return path.basename(rutaCompleta);
}

// 3. Análisis de logs o listados de archivos
const rutasArchivos = ["/var/log/app/error.log", "/var/log/app/access.log"];
const nombresArchivos = rutasArchivos.map((ruta) => path.basename(ruta));
// Resultado: ['error.log', 'access.log']

// 4. En combinación con otras funciones de path
const rutaCompleta = "/home/usuario/documentos/informe.pdf";
const directorio = path.dirname(rutaCompleta);
const archivo = path.basename(rutaCompleta);
const archivoSinExtension = path.basename(rutaCompleta, ".pdf");

console.log(`Directorio: ${directorio}`);
console.log(`Archivo completo: ${archivo}`);
console.log(`Nombre sin extensión: ${archivoSinExtension}`);

// DIFERENCIA CON OTRAS FUNCIONES RELACIONADAS:
// - path.basename(): obtiene el archivo final
// - path.dirname(): obtiene el directorio contenedor
// - path.extname(): obtiene solo la extensión del archivo
```

#### path.extname() - Obtener Extensión del Archivo

```javascript
// OBTENCIÓN DE LA EXTENSIÓN DE ARCHIVO CON path.extname()

// path.extname() es una función que extrae la extensión de un archivo desde una ruta
// Retorna la extensión incluyendo el punto, o una cadena vacía si no hay extensión

// Ejemplo básico: Extraer la extensión de una ruta de archivo
const extension = path.extname("/usuarios/juan/imagen.jpg");
console.log(extension); // .jpg

// Como funciona path.extname():
// - Analiza la ruta buscando el último punto después de la última barra
// - Retorna todo desde ese punto hasta el final de la cadena
// - Si no hay punto, o el punto está en el directorio, retorna cadena vacía

// Ejemplos adicionales para entender el comportamiento:
const ejemplo1 = path.extname("/a/b/c/d.txt"); // Retorna: '.txt'
const ejemplo2 = path.extname("/a/b/c/archivo"); // Retorna: '' (sin extensión)
const ejemplo3 = path.extname("/a/b/c/archivo.js"); // Retorna: '.js'
const ejemplo4 = path.extname("/a/b.c/d"); // Retorna: '' (el punto está en el directorio)
const ejemplo5 = path.extname("/a/b/.archivoculto"); // Retorna: '' (archivo oculto sin extensión)

// CASO DE USO PRÁCTICO: Detección de tipos de archivo
const archivo = "/ruta/al/archivo.js";
if (path.extname(archivo) === ".js") {
  console.log("Es un archivo JavaScript");
}

// Este patrón es muy común en aplicaciones web para:
// - Identificar tipos de archivo para procesamiento
// - Aplicar lógica específica según el tipo de archivo
// - Validar extensiones permitidas

// EJEMPLOS MÁS COMPLEJOS DE DETECCIÓN DE EXTENSIONES:

// 1. Validación de múltiples extensiones en un servidor web
const archivoSolicitado = "/static/css/estilos.css";
const ext = path.extname(archivoSolicitado);

if (ext === ".css") {
  console.log("Serviendo archivo CSS");
} else if (ext === ".js") {
  console.log("Serviendo archivo JavaScript");
} else if (ext === ".html") {
  console.log("Serviendo archivo HTML");
} else {
  console.log("Tipo de archivo no reconocido");
}

// 2. Filtrado de archivos por extensión
const archivos = ["app.js", "style.css", "index.html", "README"];
const archivosJs = archivos.filter(
  (archivo) => path.extname(archivo) === ".js"
);
console.log("Archivos JavaScript:", archivosJs); // ['app.js']

// 3. Configuración de MIME types basados en extensión
function obtenerTipoMIME(rutaArchivo) {
  const extension = path.extname(rutaArchivo);
  const tiposMIME = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  return tiposMIME[extension] || "application/octet-stream";
}

// 4. En combinación con path.basename() para análisis completo
const rutaCompleta = "/proyecto/src/componentes/App.jsx";
const nombreArchivo = path.basename(rutaCompleta); // 'App.jsx'
const extensionArchivo = path.extname(rutaCompleta); // '.jsx'
const nombreBase = path.basename(rutaCompleta, extensionArchivo); // 'App'

console.log(`Nombre: ${nombreArchivo}`);
console.log(`Extensión: ${extensionArchivo}`);
console.log(`Nombre base: ${nombreBase}`);

// LIMITACIONES IMPORTANTES:
// - path.extname() solo analiza la cadena, no verifica la existencia del archivo
// - No valida que la extensión corresponda a un tipo de archivo real
// - Archivos pueden tener múltiples extensiones (ej: '.tar.gz') pero extname() solo toma la última
```

## Módulo URL - Manejo de URLs

### Importación y Uso Básico

```javascript
// Importación de la clase URL del módulo url
// En Node.js, URL es parte del módulo url pero también está disponible globalmente en versiones modernas
import { URL } from "url";

// Crear una nueva instancia de URL
// La clase URL permite analizar y manipular URLs de manera estructurada
// Se construye pasando la URL completa como string al constructor
const miUrl = new URL(
  "https://ejemplo.com:8080/ruta/api?usuario=john&pagina=1#seccion"
);

// PROPIEDADES PRINCIPALES DE LA INSTANCIA URL:

// protocol - Obtiene el protocolo de la URL (incluye los dos puntos)
console.log(miUrl.protocol); // https:

// hostname - Obtiene el nombre del host o dominio sin el puerto
console.log(miUrl.hostname); // ejemplo.com

// port - Obtiene el número de puerto si está especificado en la URL
console.log(miUrl.port); // 8080

// pathname - Obtiene la ruta del recurso en el servidor (incluye la barra inicial)
console.log(miUrl.pathname); // /ruta/api

// search - Obtiene la cadena de consulta completa incluyendo el signo de interrogación
console.log(miUrl.search); // ?usuario=john&pagina=1

// hash - Obtiene el fragmento o ancla de la URL incluyendo el signo de numeral
console.log(miUrl.hash); // #seccion

// OTRAS PROPIEDADES ÚTILES DE LA CLASE URL:

// host - Incluye el nombre del host y el puerto
console.log(miUrl.host); // ejemplo.com:8080

// origin - Obtiene el origen de la URL (protocolo + hostname + puerto)
console.log(miUrl.origin); // https://ejemplo.com:8080

// searchParams - Objeto URLSearchParams para manipular parámetros de consulta
console.log(miUrl.searchParams); // Objeto con métodos para trabajar con query parameters

// Ejemplos de uso con searchParams:
console.log(miUrl.searchParams.get("usuario")); // 'john'
console.log(miUrl.searchParams.get("pagina")); // '1'

// href - La URL completa como string
console.log(miUrl.href); // https://ejemplo.com:8080/ruta/api?usuario=john&pagina=1#seccion

// CASOS DE USO PRÁCTICOS:

// 1. Validación y análisis de URLs ingresadas por usuarios
function analizarURL(urlString) {
  try {
    const url = new URL(urlString);
    return {
      dominio: url.hostname,
      ruta: url.pathname,
      parametros: Object.fromEntries(url.searchParams),
      esSegura: url.protocol === "https:",
    };
  } catch (error) {
    console.log("URL inválida:", error.message);
    return null;
  }
}

// 2. Construcción de URLs dinámicas
const baseURL = "https://api.mi-servicio.com";
const endpoint = "/usuarios";
const parametros = { limite: 10, pagina: 2 };

const urlCompleta = new URL(endpoint, baseURL);
urlCompleta.search = new URLSearchParams(parametros).toString();
console.log(urlCompleta.href); // https://api.mi-servicio.com/usuarios?limite=10&pagina=2

// 3. Manipulación de parámetros de consulta
const urlConParametros = new URL("https://ejemplo.com/buscar");
urlConParametros.searchParams.set("q", "node.js");
urlConParametros.searchParams.set("sort", "fecha");
console.log(urlConParametros.href); // https://ejemplo.com/buscar?q=node.js&sort=fecha

// MANEJO DE ERRORES:
// El constructor URL lanzará un error si la URL no es válida
try {
  const urlInvalida = new URL("esto-no-es-una-url");
} catch (error) {
  console.log("Error al crear URL:", error.message);
}
```

### Análisis de Parámetros de Consulta

```javascript
// Obtener parámetros de consulta
// searchParams devuelve un objeto URLSearchParams que proporciona métodos para trabajar con los parámetros de consulta (query parameters)
const parametros = miUrl.searchParams;

// MÉTODOS PRINCIPALES DE URLSearchParams:

// get() - Obtiene el valor del primer parámetro con la clave especificada
console.log(parametros.get('usuario')); // john

// get() - Si el parámetro no existe, retorna null
console.log(parametros.get('pagina'));  // 1

// has() - Verifica si existe un parámetro con la clave especificada
// Retorna true si existe, false si no existe
console.log(parametros.has('busqueda')); // false

// Iterar sobre todos los parámetros
// URLSearchParams es iterable, permite recorrer todos los parámetros como pares [clave, valor]
for (const [clave, valor] de parametros) {
    console.log(`${clave}: ${valor}`);
}
// Salida esperada:
// usuario: john
// pagina: 1

// OTROS MÉTODOS ÚTILES DE URLSearchParams:

// getAll() - Obtiene todos los valores de un parámetro (útil cuando hay múltiples valores con la misma clave)
const urlConDuplicados = new URL('https://ejemplo.com?color=rojo&color=azul');
console.log(urlConDuplicados.searchParams.getAll('color')); // ['rojo', 'azul']

// set() - Establece o actualiza el valor de un parámetro
parametros.set('nuevoParametro', 'valor123');
console.log(parametros.get('nuevoParametro')); // valor123

// append() - Agrega un nuevo valor sin eliminar los existentes (para parámetros con múltiples valores)
parametros.append('categoria', 'tecnologia');
parametros.append('categoria', 'programacion');

// delete() - Elimina un parámetro específico
parametros.delete('pagina');
console.log(parametros.has('pagina')); // false

// toString() - Convierte los parámetros a string en formato URL
console.log(parametros.toString()); // usuario=john&nuevoParametro=valor123&categoria=tecnologia&categoria=programacion

// keys() - Obtiene un iterador con todas las claves
for (const clave de parametros.keys()) {
    console.log('Clave:', clave);
}

// values() - Obtiene un iterador con todos los valores
for (const valor de parametros.values()) {
    console.log('Valor:', valor);
}

// entries() - Obtiene un iterador con todos los pares [clave, valor] (es lo mismo que iterar directamente)
for (const [clave, valor] de parametros.entries()) {
    console.log(`Entrada: ${clave} = ${valor}`);
}

// CASOS DE USO PRÁCTICOS:

// 1. Procesamiento de formularios web
function procesarFormulario(urlString) {
    const url = new URL(urlString);
    const datos = {};

    for (const [clave, valor] de url.searchParams) {
        datos[clave] = valor;
    }

    return datos;
}

// 2. Validación de parámetros requeridos
function validarParametros(urlString, parametrosRequeridos) {
    const url = new URL(urlString);

    for (const parametro of parametrosRequeridos) {
        if (!url.searchParams.has(parametro)) {
            throw new Error(`Falta el parámetro requerido: ${parametro}`);
        }
    }

    return true;
}

// 3. Construcción dinámica de URLs con parámetros
function construirURL(base, parametros) {
    const url = new URL(base);

    Object.entries(parametros).forEach(([clave, valor]) => {
        url.searchParams.set(clave, valor);
    });

    return url.href;
}

// 4. Limpieza de parámetros sensibles
function limpiarURLSensible(urlString) {
    const url = new URL(urlString);
    const parametrosSensibles = ['password', 'token', 'apiKey'];

    parametrosSensibles.forEach(param => {
        if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
        }
    });

    return url.href;
}
```

## Implementación de un Servidor HTTP con Manejo de Rutas

### Servidor Básico con Enrutamiento

Te explico este servidor HTTP completo en partes:

**PRIMERA PARTE: CONFIGURACIÓN INICIAL E IMPORTACIONES**

```javascript
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

// Obtener __dirname y __filename para ES Modules
// Esto es necesario porque en ES Modules no tenemos acceso directo a estas variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear el servidor HTTP
// http.createServer() recibe una función callback que se ejecuta en cada solicitud
// La función callback recibe dos parámetros: req (solicitud) y res (respuesta)
const server = http.createServer(async (req, res) => {
  // Analizar la URL solicitada usando la clase URL
  // Se construye la URL completa usando el host de los headers de la solicitud
  const url = new URL(req.url, `http://${req.headers.host}`);
  const rutaSolicitada = url.pathname;

  console.log(`Solicitud recibida: ${rutaSolicitada}`);

  // Configurar headers básicos para la respuesta
  // Por defecto, todas las respuestas serán HTML con codificación UTF-8
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  try {
    // Sistema de enrutamiento basado en la ruta solicitada
    // switch-case es un patrón común para manejar diferentes rutas
    switch (rutaSolicitada) {
      case "/":
        await servirPaginaInicio(res);
        break;
      case "/acerca":
        await servirPaginaAcerca(res);
        break;
      case "/contacto":
        await servirPaginaContacto(res);
        break;
      default:
        // Si no es una ruta definida, verificar si es un archivo estático
        if (await esArchivoEstatico(rutaSolicitada)) {
          await servirArchivoEstatico(rutaSolicitada, res);
        } else {
          // Si no es archivo estático ni ruta definida, mostrar error 404
          servirError404(res, rutaSolicitada);
        }
    }
  } catch (error) {
    // Manejo centralizado de errores
    // Cualquier error no controlado en las funciones anteriores llegará aquí
    console.error("Error al procesar solicitud:", error);
    servirError500(res, error);
  }
});
```

**SEGUNDA PARTE: FUNCIONES DE PÁGINAS Y ARCHIVOS ESTÁTICOS**

```javascript
// Función para servir la página de inicio
// Genera HTML dinámicamente como string
async function servirPaginaInicio(res) {
  const contenido = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página de Inicio</title>
        </head>
        <body>
            <h1>Bienvenido a la Página de Inicio</h1>
            <nav>
                <a href="/">Inicio</a> |
                <a href="/acerca">Acerca</a> |
                <a href="/contacto">Contacto</a>
            </nav>
            <p>Esta es la página principal del sitio.</p>
        </body>
        </html>
    `;

  // Establecer código de estado 200 (OK) y enviar el contenido
  res.statusCode = 200;
  res.end(contenido);
}

// Función similar para la página "Acerca de"
async function servirPaginaAcerca(res) {
  const contenido = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Acerca de Nosotros</title>
        </head>
        <body>
            <h1>Acerca de Nosotros</h1>
            <nav>
                <a href="/">Inicio</a> |
                <a href="/acerca">Acerca</a> |
                <a href="/contacto">Contacto</a>
            </nav>
            <p>Información sobre nuestra empresa.</p>
        </body>
        </html>
    `;

  res.statusCode = 200;
  res.end(contenido);
}

// Función para verificar si una ruta corresponde a un archivo estático
// Comprueba si la extensión del archivo está en la lista de extensiones permitidas
async function esArchivoEstatico(ruta) {
  const extensionesPermitidas = [
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".json",
    ".txt",
  ];
  const extension = path.extname(ruta);
  return extensionesPermitidas.includes(extension);
}

// Función para servir archivos estáticos desde el directorio 'public'
async function servirArchivoEstatico(rutaSolicitada, res) {
  try {
    // Construir la ruta completa al archivo
    // path.join() asegura que la ruta sea correcta independientemente del SO
    const rutaCompleta = path.join(__dirname, "public", rutaSolicitada);

    // Leer el contenido del archivo usando fs/promises (versión asíncrona)
    const contenido = await fs.readFile(rutaCompleta);

    // Determinar el tipo MIME basado en la extensión del archivo
    // Esto es importante para que el navegador interprete correctamente el contenido
    const extension = path.extname(rutaSolicitada);
    const tiposMIME = {
      ".css": "text/css",
      ".js": "application/javascript",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".json": "application/json",
      ".txt": "text/plain",
    };

    // Establecer el Content-Type apropiado para el tipo de archivo
    res.setHeader(
      "Content-Type",
      tiposMIME[extension] || "application/octet-stream"
    );
    res.statusCode = 200;
    res.end(contenido);
  } catch (error) {
    // Si el archivo no existe (error ENOENT), mostrar error 404
    if (error.code === "ENOENT") {
      servirError404(res, rutaSolicitada);
    } else {
      // Para otros errores, relanzar la excepción para que sea capturada por el manejador global
      throw error;
    }
  }
}
```

**TERCERA PARTE: MANEJO DE ERRORES Y INICIO DEL SERVIDOR**

```javascript
// Función para manejar errores 404 (Página no encontrada)
function servirError404(res, ruta) {
  res.statusCode = 404; // Código de estado HTTP para "No encontrado"
  res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página No Encontrada</title>
        </head>
        <body>
            <h1>Error 404 - Página No Encontrada</h1>
            <p>La ruta "${ruta}" no existe en este servidor.</p>
            <a href="/">Volver al Inicio</a>
        </body>
        </html>
    `);
}

// Función para manejar errores 500 (Error interno del servidor)
function servirError500(res, error) {
  res.statusCode = 500; // Código de estado HTTP para "Error interno del servidor"
  res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error del Servidor</title>
        </head>
        <body>
            <h1>Error 500 - Error Interno del Servidor</h1>
            <p>Ha ocurrido un error inesperado.</p>
            <pre>${error.message}</pre>
            <a href="/">Volver al Inicio</a>
        </body>
        </html>
    `);
}

// Iniciar el servidor y ponerlo a escuchar en el puerto especificado
const PORT = 3000;
server.listen(PORT, () => {
  // Esta función callback se ejecuta cuando el servidor está listo para recibir conexiones
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

**CARACTERÍSTICAS PRINCIPALES DE ESTE SERVIDOR:**

- **Enrutamiento básico**: Maneja rutas específicas como '/', '/acerca', '/contacto'
- **Servicio de archivos estáticos**: Sirve CSS, JS, imágenes desde el directorio 'public'
- **Manejo de errores**: Gestiona errores 404 y 500 de manera centralizada
- **Tipo MIME automático**: Detecta y establece el Content-Type correcto para archivos estáticos
- **Estructura modular**: Separa la lógica en funciones especializadas
- **Logging**: Registra cada solicitud recibida en la consola

Este servidor representa la base fundamental sobre la que se construyen frameworks web más complejos como Express.js.

## Sistema de Enrutamiento Avanzado con Parámetros

### Implementación de Rutas con Parámetros

Te explico este servidor API REST completo en partes:

**PRIMERA PARTE: CONFIGURACIÓN INICIAL Y ESTRUCTURA DEL SERVIDOR**

```javascript
import http from "http";
import { URL } from "url";

// Base de datos simulada en memoria
// En una aplicación real, esto estaría en una base de datos externa
const usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@ejemplo.com" },
  { id: 2, nombre: "Carlos López", email: "carlos@ejemplo.com" },
  { id: 3, nombre: "María Rodríguez", email: "maria@ejemplo.com" },
];

// Crear el servidor HTTP
const server = http.createServer(async (req, res) => {
  // Analizar la URL solicitada para extraer ruta y parámetros
  const url = new URL(req.url, `http://${req.headers.host}`);
  const ruta = url.pathname;

  // Configurar headers para respuestas JSON
  // application/json indica que todas las respuestas serán en formato JSON
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    // Sistema de enrutamiento para la API
    // Todas las rutas de la API comienzan con /api/usuarios
    if (ruta.startsWith("/api/usuarios")) {
      await manejarRutaUsuarios(ruta, req.method, res, url);
    } else {
      // Si la ruta no coincide con ningún endpoint conocido
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Endpoint no encontrado" }));
    }
  } catch (error) {
    // Manejo global de errores no controlados
    console.error("Error:", error);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Error interno del servidor" }));
  }
});
```

**SEGUNDA PARTE: MANEJO DE RUTAS Y MÉTODOS HTTP**

```javascript
async function manejarRutaUsuarios(ruta, metodo, res, url) {
  // Analizar la ruta para determinar si se solicita un usuario específico
  // split('/') divide la ruta en partes: ['', 'api', 'usuarios', '1'] para /api/usuarios/1
  // filter(parte => parte !== '') elimina las partes vacías
  const partesRuta = ruta.split("/").filter((parte) => parte !== "");

  // Verificar si la ruta tiene un ID: /api/usuarios/1 (3 partes) vs /api/usuarios (2 partes)
  const tieneId = partesRuta.length === 3 && !isNaN(partesRuta[2]);

  // Manejar diferentes métodos HTTP para la ruta /api/usuarios
  if (metodo === "GET") {
    if (ruta === "/api/usuarios") {
      // GET /api/usuarios - Listar todos los usuarios
      res.statusCode = 200;
      res.end(JSON.stringify(usuarios));
    } else if (tieneId) {
      // GET /api/usuarios/:id - Obtener un usuario específico por ID
      const userId = parseInt(partesRuta[2]);
      const usuario = usuarios.find((u) => u.id === userId);

      if (usuario) {
        // Usuario encontrado - retornar 200 OK con los datos
        res.statusCode = 200;
        res.end(JSON.stringify(usuario));
      } else {
        // Usuario no encontrado - retornar 404 Not Found
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Usuario no encontrado" }));
      }
    }
  } else if (metodo === "POST" && ruta === "/api/usuarios") {
    // POST /api/usuarios - Crear un nuevo usuario
    // Solo permitido en la ruta base, no en rutas con ID
    await crearUsuario(req, res);
  } else {
    // Método HTTP no permitido para esta ruta
    // 405 Method Not Allowed
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Método no permitido" }));
  }
}
```

**TERCERA PARTE: CREACIÓN DE USUARIOS Y MANEJO DE DATOS**

```javascript
// Función para crear usuario (simplificada)
function crearUsuario(req, res) {
  let body = "";

  // Los datos POST llegan en chunks (fragmentos)
  // Es necesario acumular todos los chunks para obtener el cuerpo completo
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Cuando se han recibido todos los datos
  req.on("end", () => {
    try {
      // Intentar parsear el cuerpo como JSON
      const nuevoUsuario = JSON.parse(body);

      // Asignar un nuevo ID (en una app real esto lo haría la base de datos)
      nuevoUsuario.id = usuarios.length + 1;

      // Agregar el nuevo usuario al array
      usuarios.push(nuevoUsuario);

      // Retornar 201 Created con el usuario creado
      res.statusCode = 201;
      res.end(JSON.stringify(nuevoUsuario));
    } catch (error) {
      // Si el JSON es inválido, retornar error 400 Bad Request
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "JSON inválido" }));
    }
  });
}

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API REST ejecutándose en http://localhost:${PORT}`);
});
```

**ENDPOINTS DISPONIBLES EN ESTA API:**

1. **GET /api/usuarios**

   - Lista todos los usuarios
   - Código: 200 OK
   - Respuesta: Array de usuarios

2. **GET /api/usuarios/:id**

   - Obtiene un usuario específico
   - Código: 200 OK (encontrado) o 404 Not Found (no existe)
   - Respuesta: Objeto usuario o mensaje de error

3. **POST /api/usuarios**
   - Crea un nuevo usuario
   - Código: 201 Created (éxito) o 400 Bad Request (JSON inválido)
   - Cuerpo: JSON con los datos del usuario (sin ID)
   - Respuesta: Usuario creado con ID asignado

**CÓDIGOS DE ESTADO HTTP UTILIZADOS:**

- **200 OK**: Solicitud exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos de entrada inválidos
- **404 Not Found**: Recurso no encontrado
- **405 Method Not Allowed**: Método HTTP no permitido para la ruta
- **500 Internal Server Error**: Error genérico del servidor

**CARACTERÍSTICAS PRINCIPALES DE ESTA API:**

- **Arquitectura RESTful**: Sigue convenciones REST para rutas y métodos HTTP
- **Manejo de métodos HTTP**: GET para leer, POST para crear
- **Respuestas JSON**: Todas las respuestas están en formato JSON
- **Manejo de errores**: Códigos de estado HTTP apropiados para diferentes errores
- **Parsing de datos**: Manejo de cuerpos de solicitud POST en formato JSON
- **Enrutamiento dinámico**: Soporte para parámetros en la URL (/api/usuarios/:id)

Esta API representa la estructura básica de un servicio REST que podría extenderse con más métodos (PUT, DELETE) y funcionalidades como autenticación, validación de datos y conexión a base de datos real.

## Mejores Prácticas y Consideraciones

### 1. Validación de Rutas

```javascript
import path from "path";

// Función para prevenir ataques de directory traversal
// Estos ataques intentan acceder a archivos fuera del directorio permitido
function validarRutaSegura(rutaSolicitada, directorioBase) {
  // Resolver la ruta solicitada contra el directorio base
  // path.resolve() combina la ruta base con la ruta solicitada y retorna una ruta absoluta
  // Esto normaliza la ruta y resuelve referencias como '..' y '.'
  const rutaResuelta = path.resolve(directorioBase, rutaSolicitada);

  // Verificar que la ruta resuelta comience con el directorio base
  // Esto asegura que el archivo solicitado esté dentro del directorio permitido
  return rutaResuelta.startsWith(directorioBase);
}

// Ejemplo de uso en un servidor web
// Directorio base donde se almacenan los archivos públicos permitidos
const directorioPublico = path.join(__dirname, "public");

// Ruta potencialmente maliciosa que intenta salir del directorio público
const rutaUsuario = "../archivo-secreto.txt";

// Validar si la ruta solicitada es segura
if (validarRutaSegura(rutaUsuario, directorioPublico)) {
  console.log("Ruta segura");
} else {
  console.log("Intento de acceso no autorizado detectado");
}

// ANÁLISIS DETALLADO DE LO QUE SUCEDE:

// Supongamos que:
// __dirname = "/app/proyecto"
// directorioPublico = "/app/proyecto/public"
// rutaUsuario = "../archivo-secreto.txt"

// path.resolve(directorioPublico, rutaUsuario) hace:
// 1. Comienza con "/app/proyecto/public"
// 2. Agrega "../archivo-secreto.txt"
// 3. El '..' sube un nivel: "/app/proyecto/archivo-secreto.txt"

// La validación compara:
// rutaResuelta = "/app/proyecto/archivo-secreto.txt"
// directorioBase = "/app/proyecto/public"

// "/app/proyecto/archivo-secreto.txt".startsWith("/app/proyecto/public") = false
// Por lo tanto, se detecta como ruta no segura

// MÁS EJEMPLOS PRÁCTICOS:

// Ejemplo 1: Ruta segura dentro del directorio público
const rutaSegura = "css/estilos.css";
console.log(validarRutaSegura(rutaSegura, directorioPublico)); // true

// path.resolve("/app/proyecto/public", "css/estilos.css")
// = "/app/proyecto/public/css/estilos.css"
// Comienza con "/app/proyecto/public" → true

// Ejemplo 2: Ataque con múltiples directorios padres
const rutaMaliciosa = "../../../../etc/passwd";
console.log(validarRutaSegura(rutaMaliciosa, directorioPublico)); // false

// Ejemplo 3: Ruta con normalización
const rutaConBarras = "subcarpeta//archivo.txt";
console.log(validarRutaSegura(rutaConBarras, directorioPublico)); // true

// path.resolve normaliza las barras dobles

// CASOS ESPECIALES A CONSIDERAR:

// Caso 1: Directorio base con trailing slash
const directorioConSlash = directorioPublico + "/";
console.log(validarRutaSegura("archivo.txt", directorioConSlash)); // true

// Caso 2: Rutas absolutas (siempre deben ser rechazadas si no coinciden con el base)
const rutaAbsoluta = "/otra/carpeta/archivo.txt";
console.log(validarRutaSegura(rutaAbsoluta, directorioPublico)); // false

// Caso 3: En sistemas Windows (rutas con backslash)
// path.resolve() maneja automáticamente las diferencias entre sistemas

// MEJORA DE LA FUNCIÓN PARA MAYOR SEGURIDAD:

function validarRutaSeguraMejorada(rutaSolicitada, directorioBase) {
  // Normalizar el directorio base para asegurar formato consistente
  const directorioBaseNormalizado = path.resolve(directorioBase) + path.sep;

  // Resolver la ruta solicitada
  const rutaResuelta = path.resolve(directorioBase, rutaSolicitada);

  // Asegurar que la ruta resuelta termine con separator si es directorio
  const rutaResueltaNormalizada = rutaResuelta + path.sep;

  // Verificar que comience con el directorio base normalizado
  return rutaResueltaNormalizada.startsWith(directorioBaseNormalizado);
}

// USO EN CONTEXTO REAL DE SERVIDOR WEB:

function servirArchivoSeguro(rutaSolicitada, res) {
  const directorioBase = path.join(__dirname, "public");

  if (!validarRutaSegura(rutaSolicitada, directorioBase)) {
    res.statusCode = 403; // Forbidden
    res.end("Acceso denegado");
    return;
  }

  // Si la ruta es segura, proceder a servir el archivo
  const rutaCompleta = path.join(directorioBase, rutaSolicitada);
  // ... lógica para leer y servir el archivo
}
```

### 2. Configuración de MIME Types

```javascript
// Mapeo de extensiones de archivo a tipos MIME
// Los tipos MIME (Multipurpose Internet Mail Extensions) indican al navegador
// qué tipo de contenido se está sirviendo y cómo debe interpretarlo
const tiposMIME = {
    '.html': 'text/html',                    // Documentos HTML
    '.css': 'text/css',                      // Hojas de estilo CSS
    '.js': 'application/javascript',         // Código JavaScript
    '.json': 'application/json',             // Datos en formato JSON
    '.png': 'image/png',                     // Imágenes PNG
    '.jpg': 'image/jpeg',                    // Imágenes JPEG
    '.gif': 'image/gif',                     // Imágenes GIF animadas
    '.svg': 'image/svg+xml',                 // Gráficos vectoriales SVG
    '.ico': 'image/x-icon'                   // Iconos de favoritos
};

// Función para determinar el tipo MIME basado en la extensión del archivo
function obtenerTipoMIME(archivo) {
    // Extraer la extensión del archivo usando path.extname()
    // toLowerCase() asegura que la extensión esté en minúsculas para coincidir con las claves del objeto
    const extension = path.extname(archivo).toLowerCase();

    // Buscar el tipo MIME en el objeto de mapeo
    // Si la extensión no está en el objeto, retorna 'application/octet-stream' como valor por defecto
    // 'application/octet-stream' indica datos binarios genéricos
    return tiposMIME[extension] || 'application/octet-stream';
}

// EJEMPLOS DE USO Y COMPORTAMIENTO:

// Ejemplo 1: Archivo HTML
console.log(obtenerTipoMIME('/ruta/index.html'));
// '.html' → 'text/html'

// Ejemplo 2: Archivo CSS
console.log(obtenerTipoMIME('estilos/principal.css'));
// '.css' → 'text/css'

// Ejemplo 3: Archivo con extensión en mayúsculas
console.log(obtenerTipoMIME('script.JS'));
// '.JS' convertido a '.js' → 'application/javascript'

// Ejemplo 4: Archivo con extensión no registrada
console.log(obtenerTipoMIME('documento.pdf'));
// '.pdf' no existe en tiposMIME → 'application/octet-stream'

// Ejemplo 5: Archivo sin extensión
console.log(obtenerTipoMIME('README'));
// '' (cadena vacía) → 'application/octet-stream'

// USO EN CONTEXTO REAL DE UN SERVIDOR WEB:

function servirArchivoEstatico(rutaSolicitada, res) {
    try {
        // Leer el archivo del sistema de archivos
        const contenido = await fs.readFile(rutaCompleta);

        // Determinar el tipo MIME apropiado
        const tipoMIME = obtenerTipoMIME(rutaSolicitada);

        // Establecer el header Content-Type
        res.setHeader('Content-Type', tipoMIME);

        // Enviar el contenido
        res.end(contenido);

    } catch (error) {
        // Manejo de errores...
    }
}

// VERSIÓN MEJORADA CON MÁS TIPOS MIME COMUNES:

const tiposMIMECompletos = {
    // Documentos y texto
    '.html': 'text/html',
    '.htm': 'text/html',
    '.css': 'text/css',
    '.txt': 'text/plain',
    '.md': 'text/markdown',
    '.xml': 'application/xml',

    // Scripts y código
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.jsx': 'application/javascript',
    '.ts': 'application/typescript',

    // Datos y formatos de intercambio
    '.json': 'application/json',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',

    // Imágenes
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp',
    '.ico': 'image/x-icon',
    '.avif': 'image/avif',

    // Fuentes
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',

    // Audio y video
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm'
};

// FUNCIÓN MEJORADA CON MANEJO DE PARÁMETROS ADICIONALES:

function obtenerTipoMIMECompleto(archivo, charset = 'utf-8') {
    const extension = path.extname(archivo).toLowerCase();
    let tipoMIME = tiposMIMECompletos[extension] || 'application/octet-stream';

    // Agregar charset para tipos de texto que lo soportan
    if (tipoMIME.startsWith('text/') && !tipoMIME.includes('charset')) {
        tipoMIME += `; charset=${charset}`;
    }

    return tipoMIME;
}

// Ejemplo con charset:
console.log(obtenerTipoMIMECompleto('index.html'));
// 'text/html; charset=utf-8'

// IMPORTANCIA DE LOS TIPOS MIME CORRECTOS:

// 1. Renderizado adecuado: El navegador sabe cómo interpretar el contenido
// 2. Seguridad: Tipos incorrectos pueden causar vulnerabilidades XSS
// 3. Performance: Algunos tipos permiten compresión o optimizaciones específicas
// 4. Compatibilidad: Asegura que los recursos se carguen correctamente en todos los navegadores

// CASOS ESPECIALES A CONSIDERAR:

// Archivos que deben ser forzados a descarga:
function esTipoDescargable(tipoMIME) {
    const tiposParaDescargar = [
        'application/pdf',
        'application/zip',
        'application/octet-stream'
    ];
    return tiposParaDescargar.includes(tipoMIME);
}

// En un servidor, para forzar descarga en lugar de visualización:
if (esTipoDescargable(tipoMIME)) {
    res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(archivo) + '"');
}
```

### 3. Manejo de Errores Centralizado

```javascript
// Clase para manejar respuestas de error HTTP de manera consistente
// Se utiliza static methods para no necesitar crear instancias de la clase
// Esto permite un uso directo como ManejadorErrores.notFound(res)
class ManejadorErrores {
  // Método para errores 404 - Recurso no encontrado
  // Se usa cuando el cliente solicita un recurso que no existe
  static notFound(res, mensaje = "Recurso no encontrado") {
    // Establecer código de estado HTTP 404
    res.statusCode = 404;
    // Enviar respuesta en formato JSON con el mensaje de error
    res.end(JSON.stringify({ error: mensaje }));
  }

  // Método para errores 500 - Error interno del servidor
  // Se usa para errores inesperados en el servidor
  static serverError(res, error) {
    // Registrar el error completo en la consola del servidor para debugging
    console.error("Error del servidor:", error);
    // Establecer código de estado HTTP 500
    res.statusCode = 500;
    // Enviar respuesta genérica al cliente (no exponer detalles internos)
    res.end(JSON.stringify({ error: "Error interno del servidor" }));
  }

  // Método para errores 400 - Solicitud incorrecta
  // Se usa cuando el cliente envía datos mal formados o inválidos
  static badRequest(res, mensaje = "Solicitud inválida") {
    // Establecer código de estado HTTP 400
    res.statusCode = 400;
    // Enviar respuesta con mensaje específico sobre el error en la solicitud
    res.end(JSON.stringify({ error: mensaje }));
  }
}

// EJEMPLOS DE USO EN UN SERVIDOR WEB:

// En el manejo de rutas de un servidor
import http from "http";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const ruta = url.pathname;

  // Configurar header para respuestas JSON
  res.setHeader("Content-Type", "application/json");

  try {
    if (ruta === "/api/usuarios") {
      // Lógica para manejar usuarios...
    } else if (ruta.startsWith("/api/usuarios/")) {
      // Lógica para usuario específico...
    } else {
      // Ruta no encontrada - usar el manejador de errores
      ManejadorErrores.notFound(res, `La ruta ${ruta} no existe`);
    }
  } catch (error) {
    // Error inesperado - usar el manejador de errores del servidor
    ManejadorErrores.serverError(res, error);
  }
});

// EJEMPLOS ESPECÍFICOS DE CADA MÉTODO:

// Ejemplo 1: Recurso no encontrado
function obtenerUsuario(userId, res) {
  const usuario = buscarUsuarioEnBD(userId);
  if (!usuario) {
    ManejadorErrores.notFound(res, `Usuario con ID ${userId} no encontrado`);
    return;
  }
  // Continuar con la lógica si el usuario existe...
}

// Ejemplo 2: Validación de datos de entrada
function crearUsuario(datosUsuario, res) {
  if (!datosUsuario.nombre || !datosUsuario.email) {
    ManejadorErrores.badRequest(res, "Nombre y email son requeridos");
    return;
  }

  if (!validarEmail(datosUsuario.email)) {
    ManejadorErrores.badRequest(res, "Formato de email inválido");
    return;
  }

  // Continuar con la creación del usuario...
}

// Ejemplo 3: Error inesperado en base de datos
async function obtenerProductos(res) {
  try {
    const productos = await database.query("SELECT * FROM productos");
    res.end(JSON.stringify(productos));
  } catch (error) {
    ManejadorErrores.serverError(res, error);
  }
}

// EXTENSIÓN DE LA CLASE CON MÁS TIPOS DE ERRORES:

class ManejadorErroresExtendido extends ManejadorErrores {
  // Error 401 - No autorizado
  static unauthorized(res, mensaje = "No autorizado") {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: mensaje }));
  }

  // Error 403 - Prohibido
  static forbidden(res, mensaje = "Acceso denegado") {
    res.statusCode = 403;
    res.end(JSON.stringify({ error: mensaje }));
  }

  // Error 409 - Conflicto
  static conflict(res, mensaje = "Conflicto con el recurso") {
    res.statusCode = 409;
    res.end(JSON.stringify({ error: mensaje }));
  }

  // Error 422 - Entidad no procesable
  static unprocessable(res, mensaje = "Entidad no procesable") {
    res.statusCode = 422;
    res.end(JSON.stringify({ error: mensaje }));
  }
}

// VENTAJAS DE ESTE ENFOQUE:

// 1. Consistencia: Todas las respuestas de error siguen el mismo formato
// 2. Mantenibilidad: Los cambios en el formato de errores se hacen en un solo lugar
// 3. Reutilización: El mismo manejo de errores se usa en toda la aplicación
// 4. Separación de concerns: La lógica de negocio no se mezcla con el manejo de errores HTTP

// USO CON MÉTODOS DE AUTENTICACIÓN:

function middlewareAutenticacion(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    ManejadorErroresExtendido.unauthorized(
      res,
      "Token de autenticación requerido"
    );
    return;
  }

  if (!validarToken(token)) {
    ManejadorErroresExtendido.forbidden(res, "Token inválido o expirado");
    return;
  }

  // Si la autenticación es exitosa, continuar
  next();
}

// FORMATO ALTERNATIVO DE RESPUESTA DE ERROR:

class ManejadorErroresDetallado {
  static notFound(res, mensaje = "Recurso no encontrado", detalles = {}) {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        error: mensaje,
        codigo: "NOT_FOUND",
        detalles: detalles,
        timestamp: new Date().toISOString(),
      })
    );
  }
}

// Ejemplo de uso con detalles adicionales:
ManejadorErroresDetallado.notFound(res, "Usuario no encontrado", {
  userId: 12345,
  recurso: "usuarios",
  sugerencia: "Verifique que el ID sea correcto",
});
```

## Conclusión

Node.js proporciona herramientas robustas para el manejo de rutas a través de sus módulos nativos `path` y `url`. Con ES Modules, el enfoque ha evolucionado pero mantiene la misma funcionalidad poderosa. La clave está en:

- **Entender la diferencia** entre CommonJS y ES Modules para `__dirname` y `__filename`
- Usar `path.join()` y `path.resolve()` para construir rutas de manera segura
- Utilizar la clase `URL` para parsear y manipular URLs
- Implementar validación de seguridad para prevenir ataques de directory traversal
- Crear sistemas de enrutamiento modulares y mantenibles
- Manejar adecuadamente los errores y tipos MIME

Este enfoque nativo es fundamental para entender cómo funcionan los frameworks web en Node.js y proporciona una base sólida para construir aplicaciones web robustas y seguras.
