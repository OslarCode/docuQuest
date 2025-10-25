# DevTools de Google Chome

## **¿Qué son las DevTools de Chrome?**

Las **Chrome DevTools** (Herramientas de Desarrollo) son un conjunto de utilidades integradas en el navegador Google Chrome que permiten a los desarrolladores **analizar, depurar y optimizar** websites y aplicaciones web.

### **Cómo Acceder a las DevTools**

**MÉTODOS RÁPIDOS:**

- `F12` en Windows/Linux
- `Cmd + Option + I` en Mac
- `Ctrl + Shift + I` en cualquier sistema
- Clic derecho → "Inspeccionar elemento"
- Menú Chrome → Más herramientas → Herramientas de desarrollo

**INTERFAZ PRINCIPAL:**

```
+-----------------------------------+
| Pestañas: | Elements | Console | Sources | Network | etc. |
+-----------------------------------+
|                                   |
|        Área de trabajo            |
|                                   |
+-----------------------------------+
```

## **Parte 2: Pestaña Elements - El Inspector HTML/CSS**

### **Funcionalidades Principales**

**INSPECCIÓN DE ELEMENTOS:**

- Clic derecho → "Inspeccionar" sobre cualquier elemento
- Navegación por el DOM en tiempo real
- Ver y modificar HTML inmediatamente

**EJEMPLO PRÁCTICO:**

```html
<!-- Puedes cambiar esto en caliente -->
<div class="producto" style="color: blue;">
  <h1>Mi Producto</h1>
</div>
```

**EDICIÓN DE ESTILOS CSS:**

- Ver todos los estilos aplicados a un elemento
- Modificar CSS en tiempo real
- Ver qué reglas están siendo aplicadas/ignoradas
- Probardiferentes diseños sin guardar

```css
/* Modificas esto directamente en DevTools */
.producto {
  color: red; /* Cambias de blue a red */
  margin: 20px; /* Añades nuevo estilo */
}
```

### **Features Avanzadas de Elements**

**COMPUTED (ESTILOS COMPUTADOS):**

- Ver el valor final de cada propiedad CSS
- Entender la cascada y herencia
- Debuggar problemas de especificidad

**BOX MODEL:**

- Visualizar margin, border, padding, content
- Ver dimensiones exactas del elemento
- Identificar problemas de layout

**DEVICE MODE:**

- Simular diferentes dispositivos móviles
- Probar responsive design
- Throttling de red (simular conexiones lentas)

## **Pestaña Console - El Diálogo con JavaScript**

### **Funcionalidades Básicas de la Consola**

La consola es tu **línea de comunicación directa con JavaScript**.

**COMANDOS BÁSICOS:**

```javascript
// Logs básicos
console.log("Mensaje informativo");
console.warn("Advertencia");
console.error("Error crítico");

// Debug más avanzado
console.table([
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 30 },
]);
console.group("Grupo de logs");
console.groupEnd();
```

**SALIDA DE console.table():**

```
┌─────────┬──────────┬──────┐
│ (index) │  nombre  │ edad │
├─────────┼──────────┼──────┤
│    0    │  "Ana"   │  25  │
│    1    │  "Luis"  │  30  │
└─────────┴──────────┴──────┘
```

### **Funcionalidades Avanzadas de la Consola**

**EJECUCIÓN DE CÓDIGO EN TIEMPO REAL:**

```javascript
// Puedes ejecutar cualquier código JavaScript
const elementos = document.querySelectorAll(".producto");
elementos.length; // Muestra cuántos elementos hay

// Modificar el DOM
document.body.style.backgroundColor = "lightblue";

// Llamar a funciones de tu aplicación
miFuncionDeLaApp();
```

**DEBUG CON breakpoints:**

```javascript
// En tu código
debugger; // La ejecución se pausa aquí

// En la consola puedes entonces:
// - Inspeccionar variables
// - Ejecutar código en ese contexto
// - Paso a paso por la ejecución
```

**MONITOREO DE EVENTOS:**

```javascript
// Ver todos los eventos que ocurren
monitorEvents(document.getElementById("miBoton"));
// Muestra: click, mouseover, etc.

// Dejar de monitorizar
unmonitorEvents(document.getElementById("miBoton"));
```

### **Métodos Útiles de la Consola**

```javascript
// Medición de tiempo
console.time("miOperacion");
// código a medir...
console.timeEnd("miOperacion"); // Muestra: miOperacion: 125ms

// Contar ejecuciones
console.count("llamadasAPI"); // llamadasAPI: 1
console.count("llamadasAPI"); // llamadasAPI: 2

// Traza de pila
console.trace(); // Muestra dónde se llamó esta función

// Assertions
console.assert(edad >= 18, "El usuario debe ser mayor de edad");
```

### **Pestaña Network - Analizando Comunicaciones**

### **Funcionalidades Básicas de Network**

La pestaña Network muestra **todas las comunicaciones** entre el navegador y los servidores.

**CÓMO USARLA:**

1. Abre DevTools → Pestaña Network
2. Recarga la página (F5)
3. Observa todas las peticiones HTTP/HTTPS

**INFORMACIÓN POR COLUMNAS:**

- **Name:** Recurso solicitado
- **Status:** Código HTTP (200, 404, 500...)
- **Type:** Tipo de recurso (document, script, stylesheet...)
- **Size:** Tamaño transferido
- **Time:** Tiempo de carga

### **Análisis Detallado de Peticiones**

**AL HACER CLIC EN UNA PETICIÓN:**

**Headers:**

```http
Request URL: https://api.midominio.com/usuarios
Request Method: GET
Status Code: 200 OK
Remote Address: 192.168.1.1:443
Referrer Policy: strict-origin-when-cross-origin
```

**Response:**

```json
{
  "usuarios": [
    { "id": 1, "nombre": "Ana" },
    { "id": 2, "nombre": "Luis" }
  ]
}
```

**Timing:**

```
Queueing: 1.25ms
Stalled: 0.5ms
Waiting (TTFB): 150ms  // Time to First Byte
Content Download: 15ms
```

### **Features Avanzadas de Network**

**THROTTLING (SIMULACIÓN DE RED LENTA):**

- Fast 3G, Slow 3G, Offline
- Personalizar latencia y velocidad
- **Uso:** Probar cómo se comporta tu app en conexiones lentas

**FILTRADO DE PETICIONES:**

```bash
domain:api.midominio.com    # Solo peticiones a este dominio
method:POST                 # Solo peticiones POST
status-code:200             # Solo respuestas 200
larger-than:100K           # Archivos mayores a 100KB
```

**PRESERVAR LOG:**

- Mantiene las peticiones al navegar entre páginas
- Útil para analizar flujos de navegación

## **Otras Pestañas Importantes**

### **Sources - Debugging de JavaScript**

**BREAKPOINTS INTERACTIVOS:**

- Pausar ejecución en líneas específicas
- Inspeccionar variables en ese momento
- Paso a paso (Step over, into, out)

**WATCH EXPRESSIONS:**

```javascript
// Añades variables para monitorizar
usuario.activo;
arrayProductos.length;
totalCarrito;
```

**CALL STACK:**

- Ver la pila de llamadas que llevó a este punto
- Navegar entre diferentes contextos de ejecución

### **Application - Almacenamiento Local**

**COOKIES:**

- Ver, editar, eliminar cookies
- Dominio, path, expiración

**LOCAL STORAGE & SESSION STORAGE:**

```javascript
// Ver datos guardados
localStorage.setItem("usuario", JSON.stringify({ nombre: "Ana" }));
// En DevTools puedes ver/modificar estos datos
```

**INDEXEDDB:**

- Bases de datos del navegador
- Inspeccionar tablas y registros

**SERVICE WORKERS:**

- Ver workers registrados
- Forzar update, bypass for testing

### **Performance - Análisis de Rendimiento**

**GRABACIÓN DE PERFORMANCE:**

1. Clic "Record"
2. Realizar acciones en la página
3. Clic "Stop"
4. Analizar frames por segundo, tiempos de ejecución

**METRICAS CLAVE:**

- **FPS:** Frames por segundo (objetivo: 60 FPS)
- **CPU:** Uso de procesador
- **Network:** Actividad de red

## **Flujos de Trabajo Prácticos**

### **Debuggear un Problema de API**

**PROBLEMA:** Un formulario no envía datos correctamente

**PASOS CON DEVTOOLS:**

1. **Abrir Network → Preserve log**
2. **Enviar formulario**
3. **Buscar petición POST en Network**
4. **Inspeccionar:**
   - **Payload:** ¿Se envían los datos correctos?
   - **Headers:** ¿Faltan headers necesarios?
   - **Response:** ¿Qué error devuelve el servidor?
   - **Timing:** ¿Es problema de red o servidor?

**EJEMPLO DE ANÁLISIS:**

```http
// Request Headers
Content-Type: application/json
Authorization: Bearer token_expirado  // ← ¡PROBLEMA DETECTADO!

// Response
Status: 401 Unauthorized
{"error": "Token expired"}
```

### **Optimizar Tiempos de Carga**

**PROBLEMA:** La página carga muy lento

**PASOS CON DEVTOOLS:**

1. **Abrir Network → Deshabilitar cache**
2. **Recargar página**
3. **Ordenar por "Time" o "Size"**
4. **Identificar cuellos de botella:**
   - Imágenes muy grandes
   - JavaScript no comprimido
   - Muchas peticiones pequeñas
   - TTFB (Time to First Byte) alto

**SOLUCIONES:**

- Comprimir imágenes
- Habilitar gzip en servidor
- Combinar archivos CSS/JS
- Usar CDN para recursos estáticos

### **Debuggear Problemas de CSS**

**PROBLEMA:** Un elemento no se ve como debería

**PASOS CON DEVTOOLS:**

1. **Clic derecho → Inspect en el elemento**
2. **En Elements panel:**
   - Ver styles aplicados
   - Buscar reglas tachadas (sobrescritas)
   - Checkear Box Model
   - Ver Computed styles
3. **Probar cambios en vivo**
4. **Copiar CSS final cuando funcione**

## **Tips y Trucos Avanzados**

### **Atajos de Teclado Útiles**

```bash
Ctrl + Shift + C  # Modo inspector de elementos
Ctrl + Shift + F  # Buscar en todos los archivos
Ctrl + P          # Ir a archivo
Ctrl + Shift + P  # Comando palette (¡MUY ÚTIL!)
```

#### **Comandos del Command Palette (Ctrl+Shift+P)**

```bash
> screenshot                    # Capturar pantalla completa
> show coverage                # Ver código no utilizado
> disable javascript           # Probar sin JS
> sensors                      # Simular geolocalización
> dark theme                   # Cambiar tema oscuro
```

### **Configuraciones Recomendadas**

**EN SETTINGS (F1):**

- "Disable cache (while DevTools is open)"
- "Group similar messages in console"
- "Show timestamps in console"
- "Enable custom formatters"

## **Resumen para el Programador Web**

**PARA FRONTEND:**

- Elements: Debuggar HTML/CSS, responsive design
- Console: Ejecutar JS, ver logs, probar código
- Network: Analizar APIs, optimizar carga

**PARA BACKEND:**

- Network: Ver peticiones/respuestas HTTP
- Console: Debuggar JavaScript del cliente
- Application: Ver almacenamiento local

**PARA FULL-STACK:**

- Sources: Debuggar tanto frontend como ver comunicación con backend
- Performance: Optimizar rendimiento integral
- Network: Entender flujo completo cliente-servidor

**EJEMPLO DE USO DIARIO:**

```javascript
// 1. Ver errores en Console
// 2. Inspeccionar elementos problemáticos en Elements
// 3. Analizar peticiones fallidas en Network
// 4. Debuggar paso a paso en Sources
// 5. Ver almacenamiento en Application
// 6. Medir rendimiento en Performance
```

Las DevTools son probablemente la herramienta más poderosa para cualquier desarrollador web, permitiendo entender y resolver problemas que de otra manera serían casi imposibles de diagnosticar.
