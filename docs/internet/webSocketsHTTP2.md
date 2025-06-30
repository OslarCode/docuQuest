# Extra: WebSockets y HTTP/2

## 🧠 ¿Qué significa “conexión persistente”?

Una **conexión persistente** es cuando el navegador **mantiene abierta la comunicación con el servidor**, en lugar de **cerrarla y volverla a abrir cada vez que necesita algo**.

### 📦 Comparación sencilla:

| Comunicación tradicional (HTTP 1.1) | Conexión persistente (WebSocket / HTTP/2) |
| --- | --- |
| Cliente hace una petición → servidor responde → conexión se cierra | Cliente se conecta una vez → intercambio de datos sin cerrar la conexión |
| Como enviar cartas por correo | Como una llamada de teléfono activa todo el rato |

## 🔄 WebSockets: comunicación en tiempo real

### 🔍 ¿Qué es WebSocket?

**WebSocket** es un protocolo que permite abrir una **conexión continua y bidireccional** entre el navegador y el servidor.

> Es decir: ambos pueden enviarse mensajes en cualquier momento, sin tener que esperar una petición nueva.
> 

### 🧪 Ejemplo real: Chat en tiempo real

Imagina una app de chat:

- Sin WebSocket: cada 2 segundos el navegador hace una petición para ver si hay mensajes nuevos.
- Con WebSocket: el servidor **envía directamente el mensaje al navegador** cuando llega, sin que el navegador tenga que preguntar.

📌 También se usa en:

- Juegos multijugador online
- Notificaciones en vivo
- Seguimiento de bolsas o criptomonedas
- Paneles de administración en tiempo real (dashboard)

### ✍️ Ejemplo básico de código (cliente WebSocket en JavaScript):

```
const socket = new WebSocket('wss://mi-servidor.com/socket');

socket.onopen = () => {
  console.log('Conectado al servidor');
  socket.send('¡Hola desde el navegador!');
};

socket.onmessage = (event) => {
  console.log('Mensaje recibido:', event.data);
};

```

✅ La conexión se abre una vez y **permanece abierta todo el tiempo**.

### 🚧 Requisitos para usar WebSockets

- El servidor debe soportarlo (ej: Node.js con `ws`, Laravel WebSockets, etc.)
- Usa el protocolo `ws://` o `wss://` (seguro)
- No usa peticiones HTTP tradicionales

## ⚡ HTTP/2: la evolución del protocolo web

### 📦 ¿Qué es HTTP/2?

**HTTP/2** es una **mejora del protocolo HTTP clásico (1.1)** que **mantiene una sola conexión** abierta para enviar múltiples archivos a la vez.

### 🧠 ¿Por qué es mejor?

| HTTP 1.1 | HTTP/2 |
| --- | --- |
| Abre varias conexiones | Usa una sola conexión para todo |
| Envia archivos uno por uno | Puede enviar muchos en paralelo |
| Mucho “overhead” | Más eficiente y rápido |
| Sin compresión de cabeceras | Cabeceras comprimidas |

### 🧪 Ejemplo real:

Una web moderna tiene que cargar:

- 1 HTML
- 10 CSS
- 25 JS
- 20 imágenes

👉 Con HTTP 1.1: **cada recurso usa una conexión separada**

👉 Con HTTP/2: **se manda todo por una sola conexión multiplexada**

🔍 Resultado:

- Sitios más rápidos
- Menos uso de CPU/servidor
- Mejores métricas de Core Web Vitals

### 🤔 ¿Cómo se activa HTTP/2?

La buena noticia: **¡ya está activo en la mayoría de servidores modernos!**

| Plataforma / CDN | ¿Soporta HTTP/2? |
| --- | --- |
| Cloudflare | ✅ Sí |
| Netlify, Vercel | ✅ Sí |
| Apache / Nginx modernos | ✅ Sí (con configuración) |
| GitHub Pages | ✅ Sí |

### 🧪 ¿Cómo saber si tu web usa HTTP/2?

1. Abre Chrome DevTools → pestaña **Network**
2. Añade la columna “Protocol”
3. Verás `h2` (HTTP/2) o `http/1.1`

### 📌 Diferencias clave: WebSockets vs HTTP/2

| Característica | WebSocket | HTTP/2 |
| --- | --- | --- |
| Comunicación | Bidireccional en tiempo real | Petición/respuesta pero más rápido |
| Persistencia | Sí | Sí |
| Ideal para... | Chats, juegos, notificaciones | Carga rápida de sitios web |
| Protocolos | `ws://`, `wss://` | `https://` (requiere SSL) |
| Reemplaza HTTP | ❌ No, lo complementa | ✅ Sí, reemplaza HTTP/1.1 |

## ✅ Resumen general

| Concepto | ¿Qué hace? |
| --- | --- |
| WebSocket | Crea una conexión directa entre cliente y servidor para intercambiar datos en tiempo real |
| HTTP/2 | Permite múltiples peticiones simultáneas a través de una única conexión optimizada |
| Beneficio común | Mejor rendimiento, menos latencia, más velocidad en experiencias modernas |