# Casos de uso avanzados

## 🔐 1. Autenticación con OAuth

**OAuth** es un protocolo de autorización que permite a las apps obtener acceso limitado a recursos sin necesidad de contraseñas. Ideal para integración con servicios como Google, GitHub, etc.

### ✅ Código actualizado y comentado:

```jsx
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const fetch = require('node-fetch');

// Configuramos OAuth 1.0a con clave del consumidor y secreto
const oauth = OAuth({
  consumer: {
    key: 'TU_CONSUMER_KEY',
    secret: 'TU_CONSUMER_SECRET'
  },
  signature_method: 'HMAC-SHA1',
  hash_function(baseString, key) {
    return crypto.createHmac('sha1', key).update(baseString).digest('base64');
  }
});

// Preparamos datos para solicitud autenticada
const requestData = {
  url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
  method: 'GET'
};

const token = {
  key: 'TU_ACCESS_TOKEN',
  secret: 'TU_ACCESS_SECRET'
};

// Enviamos solicitud autenticada
fetch(requestData.url, {
  method: requestData.method,
  headers: oauth.toHeader(oauth.authorize(requestData, token))
})
.then(res => res.json())
.then(data => console.log('✅ Datos recibidos:', data))
.catch(err => console.error('❌ Error OAuth:', err));

```

## 📁 2. Manipulación de archivos (upload y download)

### 🟢 Carga de archivo usando `FormData`:

```html
<input type="file" id="archivo">

```

```jsx
document.getElementById('archivo').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('https://api.miapp.com/upload', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    console.log('✅ Archivo cargado:', result);
  } catch (err) {
    console.error('❌ Error al subir archivo:', err);
  }
});

```

### 🟢 Descarga de archivo con blob:

```jsx
async function descargarArchivo() {
  const url = 'https://api.miapp.com/files/123';
  const res = await fetch(url);

  if (!res.ok) throw new Error('❌ No se pudo descargar el archivo');

  const blob = await res.blob();
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'reporte.pdf';
  enlace.click();
  URL.revokeObjectURL(enlace.href);
}

```

## 🔄 3. Comunicación en tiempo real con WebSockets

### ✅ Código comentado de WebSocket:

```jsx
const socket = new WebSocket('wss://api.miapp.com/socket');

// Se establece conexión
socket.addEventListener('open', () => {
  console.log('✅ Conectado al WebSocket');
  socket.send(JSON.stringify({ tipo: 'subscribe', canal: 'notificaciones' }));
});

// Recibe mensajes en tiempo real
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('📩 Mensaje recibido:', data);
});

// Error en la conexión
socket.addEventListener('error', (e) => {
  console.error('❌ Error WebSocket:', e);
});

// Cierre de conexión
socket.addEventListener('close', () => {
  console.log('🔌 Conexión cerrada');
});

```

## 📊 4. Uso de GraphQL en APIs JavaScript

**GraphQL** permite consultar solo los datos necesarios, mejorando la eficiencia frente a REST.

### ✅ Consulta GraphQL:

```jsx
const query = `
  query {
    usuarios {
      id
      nombre
      email
    }
  }
`;

fetch('https://api.miapp.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query })
})
.then(res => res.json())
.then(data => console.log('✅ Datos GraphQL:', data))
.catch(err => console.error('❌ Error GraphQL:', err));

```

## 🧪 5. Testing con Postman

**Postman** es ideal para probar endpoints y automatizar pruebas.

Aquí tienes un ejemplo JSON real de colección:

```json
{
  "info": {
    "name": "Libros API Test",
    "_postman_id": "abcd-1234",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Obtener todos los libros",
      "request": {
        "method": "GET",
        "url": "https://api.miapp.com/libros"
      }
    }
  ]
}

```

🧠 Consejo: Puedes importar este archivo en Postman y ejecutar la prueba fácilmente.

## 🚀 6. Caché de respuestas en clientes y servidores

**El caché** permite evitar solicitudes repetidas y ahorrar recursos. Puede aplicarse en:

- 🧠 **Frontend**: usando `localStorage`, `sessionStorage`, IndexedDB, etc.
- 💡 **Backend**: con Redis, Varnish, HTTP headers (`Cache-Control`, `ETag`, etc.)

### 🟢 Ejemplo simple: caché en localStorage del navegador

```jsx
async function obtenerDatosConCache() {
  const cacheKey = 'libros_cache';

  // Si hay datos en cache, los usamos
  if (localStorage.getItem(cacheKey)) {
    console.log('✅ Usando datos de caché');
    return JSON.parse(localStorage.getItem(cacheKey));
  }

  // Si no, hacemos la solicitud y guardamos el resultado
  const res = await fetch('https://api.miapp.com/libros');
  const datos = await res.json();
  localStorage.setItem(cacheKey, JSON.stringify(datos));
  return datos;
}

```

🧠 **Consejo**: Puedes agregar una caducidad usando `Date.now()` y comparar con un tiempo límite.

## 🌐 7. Diseño REST avanzado

Un buen diseño de API REST no solo se basa en rutas y verbos, también considera:

| Elemento | Ejemplo |
| --- | --- |
| Nombres claros y plurales | `/usuarios`, `/productos/123` |
| Verbos HTTP | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| Rutas jerárquicas | `/usuarios/1/compras/42` |
| Filtros y parámetros | `/productos?categoria=libros&orden=precio` |
| Respuestas estandarizadas | `{ "data": [...], "meta": {...} }` |
| Documentación | Swagger, Postman, Redoc, etc. |

---

### 🟢 Ejemplo de URL bien diseñada:

```
GET https://api.miapp.com/libros?categoria=ficcion&autor=asimov

```

- `GET` para consultar.
- `libros` es plural y descriptivo.
- `?categoria=ficcion` como filtro de búsqueda.
- Claridad, orden y consistencia.

## 📌 8. Buenas prácticas adicionales

- ✅ **Usar HTTPS siempre** (protege tokens, cookies y datos).
- ✅ **Token de autenticación en `Authorization: Bearer`**.
- ✅ **Evitar exponer errores técnicos en producción**.
- ✅ **Gestionar permisos y roles desde el backend**.
- ✅ **Validar y sanitizar todos los datos del usuario**.
- ✅ **Evitar datos sensibles en el frontend o en la URL**.
- ✅ **Limitar la tasa de solicitudes** (rate limiting).
- ✅ **Versionar tu API**: `/v1/usuarios` → `/v2/usuarios`.

## 🧠 Conclusión general

La gestión avanzada de APIs REST en JavaScript va más allá del `fetch` básico. Involucra seguridad, diseño limpio, escalabilidad, rendimiento y buenas prácticas de desarrollo profesional.