# Navegadores web y motores de renderizado

## 🧭 Módulo 8: ¿Qué es un navegador web?

### 🧠 ¿Qué es un navegador?

Un **navegador web** (web browser) es un **programa que te permite acceder e interactuar con sitios web** a través de Internet.

Su función principal es:

> Traducir el código de una página web (HTML, CSS, JS) en una interfaz visual que tú puedas ver y usar.
> 

### 🛠 ¿Qué hace exactamente un navegador?

Cuando visitas un sitio web, el navegador:

1. **Hace una petición HTTP/HTTPS** al servidor.
2. **Recibe los archivos de la web** (HTML, CSS, JS, imágenes…).
3. **Interpreta** ese contenido.
4. **Genera la estructura visual** y funcional en la pantalla.
5. Permite **interacciones** como clics, formularios, desplazamientos…

💡 Todo esto ocurre en cuestión de milisegundos.

## ⚙️ Componentes internos clave del navegador

Un navegador moderno tiene muchos componentes, pero los más importantes para un desarrollador web son:

| Componente | Función principal |
| --- | --- |
| **Motor de renderizado** | Dibuja la página web en la pantalla |
| **Motor JavaScript** | Ejecuta el código JavaScript que hace la web interactiva |
| **Gestor de red** | Maneja las peticiones y respuestas HTTP/HTTPS |
| **Caché** | Guarda temporalmente archivos para acelerar futuras visitas |
| **UI** | La interfaz visible: barra de direcciones, pestañas, etc. |

### 🖼 Diferencia entre motor de renderizado y motor JavaScript

| Motor | Función principal | Ejemplos |
| --- | --- | --- |
| **Motor de renderizado** | Convierte HTML y CSS en elementos visuales en pantalla | Blink, WebKit, Gecko |
| **Motor JavaScript** | Ejecuta el código JS que da vida e interactividad a la página | V8 (Chrome), SpiderMonkey |

💡 Ambos trabajan **juntos** para que una web no solo se vea bien, sino que **funcione dinámicamente**.

## 🔧 Ejemplos de motores de renderizado por navegador

| Navegador | Motor de renderizado | Motor JS |
| --- | --- | --- |
| Chrome | **Blink** | V8 |
| Edge (nuevo) | **Blink** | V8 |
| Firefox | **Gecko** | SpiderMonkey |
| Safari | **WebKit** | JavaScriptCore |
| Opera | **Blink** | V8 |

💡 Blink es el más extendido (usado por Chrome, Edge, Opera, Brave…).

## 🛠 Proceso interno del navegador para mostrar una página

Cuando el navegador recibe los archivos de la web, sigue una serie de pasos:

### 🔁 Proceso completo:

1. **Parseo del HTML**:
    
    El navegador lee el HTML y construye el **DOM** (Document Object Model). Es como un árbol de elementos HTML.
    
2. **Parseo del CSS**:
    
    Se genera el **CSSOM** (CSS Object Model), que describe cómo se debe ver cada elemento.
    
3. **Combinación DOM + CSSOM → Árbol de renderizado**:
    
    El navegador une estructura + estilos para saber cómo y dónde pintar cada cosa.
    
4. **Layout**:
    
    Calcula el tamaño y posición de cada elemento en pantalla.
    
5. **Painting (pintado)**:
    
    Dibuja visualmente todos los elementos.
    
6. **Repaint y reflow** (cuando cambian cosas):
    
    Si hay animaciones o scripts que cambian el DOM o CSS, el navegador vuelve a pintar (repaint) o recalcular el layout (reflow).
    

### 📌 Ejemplo real:

Tú escribes este código:

```html
<h1 style="color: red;">Hola mundo</h1>

```

➡️ El navegador:

- Crea un nodo DOM para `<h1>`
- Detecta su estilo CSS (`color: red`)
- Lo pinta en la pantalla con el texto “Hola mundo” en rojo

### ⚡ Notas importantes para desarrolladores:

- El **DOM y CSSOM se pueden modificar desde JavaScript**
- Las operaciones que modifican el layout (como cambiar el tamaño de un div) **pueden afectar al rendimiento**
- Usar técnicas como `will-change`, `transform`, `opacity` mejora la eficiencia en animaciones

## ✅ Resumen del Módulo 8

| Concepto | Qué hace |
| --- | --- |
| Navegador web | Programa que permite ver e interactuar con sitios web |
| Motor de renderizado | Convierte HTML/CSS en una web visible |
| Motor JavaScript | Ejecuta scripts que hacen la web dinámica |
| DOM | Estructura HTML convertida a nodos por el navegador |
| CSSOM | Representación interna de los estilos CSS |
| Render → Reflow | Proceso de visualización y actualización de cambios |

## 🔍 Módulo 9: Google Chrome a fondo

### 🧰 DevTools: herramientas esenciales para desarrolladores

Las **Chrome DevTools** son una suite de herramientas integradas que te permiten inspeccionar, editar y depurar el código de una web en tiempo real.

### 📌 ¿Cómo acceder?

Presiona `F12` o haz clic derecho en la página → **"Inspeccionar"**

### 🔧 Secciones clave de DevTools:

| Sección | Para qué sirve |
| --- | --- |
| **Elements** | Ver y editar el HTML y los estilos CSS aplicados a cada elemento |
| **Console** | Ver errores y mensajes del JavaScript |
| **Network** | Ver peticiones HTTP (método, estado, tamaño, tiempo, cabeceras...) |
| **Sources** | Ver y depurar archivos JavaScript |
| **Application** | Ver cookies, localStorage, indexedDB, manifest, service workers |
| **Performance** | Analizar cómo se carga y ejecuta la página (repaint, scripting, rendering...) |
| **Lighthouse** | Auditoría automática de rendimiento, accesibilidad, SEO y buenas prácticas |

### ✅ Actividades sugeridas:

1. Abre `https://developer.mozilla.org`
2. Inspecciona el logo y cambia su color desde la pestaña **Elements**
3. Ve a **Network** y actualiza la página. ¿Qué ves?
4. Haz clic en **Lighthouse** y genera un informe completo

## 🚀 Lighthouse y análisis de rendimiento

**Lighthouse** es una herramienta integrada que analiza automáticamente cualquier sitio web y genera un **informe con puntuaciones** sobre:

- **Performance (rendimiento)**
- **Accessibility (accesibilidad)**
- **Best practices (buenas prácticas)**
- **SEO**
- **Progressive Web App (opcional)**

🔍 Ideal para:

- Optimizar tu web
- Detectar problemas ocultos
- Mejorar el posicionamiento

💡 Consejo: usa Lighthouse desde el **modo incógnito** para evitar interferencias con extensiones.

## 🧩 Extensiones, flags y perfiles

### 🧩 Extensiones

Pequeños programas que añaden funciones extra al navegador.

### Ejemplos útiles para desarrolladores:

- **React Developer Tools**
- **Wappalyzer** (detecta tecnologías usadas en una web)
- **Web Developer Toolbar**
- **ColorZilla** (selector de colores)

👉 Se instalan desde: [https://chrome.google.com/webstore](https://chrome.google.com/webstore)

### 🚩 Flags

Funciones experimentales que puedes activar escribiendo en la barra:

```
chrome://flags

```

📌 Aquí puedes probar características nuevas antes de que estén disponibles oficialmente, como:

- Lazy loading
- WebGPU
- Nuevos motores de renderizado

⚠️ ¡Úsalas con precaución! Pueden ser inestables.

### 👤 Perfiles

Chrome permite usar **perfiles separados** con distintos favoritos, contraseñas, cookies, extensiones, etc.

💡 Muy útil si quieres probar:

- Un usuario logueado y otro no.
- Un entorno limpio vs. uno con caché.
- Navegar sin historial ni interferencias.

## 📦 Caching y Service Workers

### 🧠 ¿Qué es el caché?

El **caché** guarda archivos (HTML, CSS, imágenes, scripts...) **localmente** para que el navegador **no tenga que descargarlos cada vez**.

✅ Ventajas:

- Aumenta la velocidad de carga
- Ahorra datos y recursos

🔍 Puedes ver qué está en caché desde DevTools → pestaña **Network** (ver columna “Size” y “Transferred”).

### ⚙️ ¿Qué son los Service Workers?

Son scripts que funcionan en segundo plano en el navegador y permiten:

- Interceptar peticiones de red
- Servir contenido desde caché
- Crear **Progressive Web Apps (PWA)**

💡 Ejemplo: una web que funciona sin conexión o carga instantáneamente al volver a entrar.

Puedes ver los service workers desde DevTools → pestaña **Application** → sección **Service Workers**.

## 🕵️ Modo Incógnito, sandboxing y seguridad

### 🕶️ Modo incógnito

Abres una nueva ventana con:

```
Ctrl + Shift + N

```

✅ No guarda:

- Historial
- Cookies
- Caché persistente

💡 Útil para pruebas limpias sin interferencias.

### 🛡️ Sandboxing

Los navegadores modernos **aislan procesos** para proteger tu sistema. Esto significa:

- Cada pestaña funciona como un proceso separado.
- Si una web falla o contiene malware, **no afecta a otras ni a tu sistema**.

Chrome fue pionero en implementar **sandboxing real por pestaña**, por eso es tan seguro.

## ✅ Resumen del Módulo 9

| Tema | Qué aprendiste |
| --- | --- |
| DevTools | Herramientas integradas para inspeccionar, depurar y editar en vivo |
| Lighthouse | Audita tu web para mejorar rendimiento, accesibilidad y SEO |
| Extensiones | Añaden funcionalidades al navegador para desarrollo |
| Flags | Activan funciones experimentales |
| Perfiles | Separan entornos para pruebas independientes |
| Caché | Almacena archivos localmente para mejorar la velocidad de carga |
| Service Workers | Scripts en segundo plano para crear experiencias offline |
| Incógnito | Navegación privada sin rastros |
| Sandboxing | Aislamiento seguro de procesos del navegador |

---

[🧪 Actividad practica auditoría completa con DevTools + LightHouse](%F0%9F%A7%AA%20Actividad%20practica%20auditori%CC%81a%20completa%20con%20DevTo%201da9de518f228021af0bde596b90e5aa.md)