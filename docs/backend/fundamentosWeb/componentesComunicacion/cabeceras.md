# Funcionamiento de las Cabeceras HTTP

Las cabeceras HTTP son metadatos que proporcionan información contextual sobre la petición o respuesta. Actúan como "instrucciones de configuración" para la comunicación entre cliente y servidor.

## Estructura de las Cabeceras

**FORMATO:** `Nombre-Cabecera: valor1, valor2, valor3`

**CARACTERÍSTICAS:**

- Sensibles a mayúsculas/minúsculas en el nombre (por convención se usan Pascal-Case)
- Valores separados por comas para múltiples valores
- Líneas separadas por CRLF (Carriage Return Line Feed)

**EJEMPLO:**

```
Content-Type: application/json; charset=utf-8
Cache-Control: no-cache, no-store
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

## Clasificación de Cabeceras

### 1. **Cabeceras de Petición (Request Headers)**

Información que el cliente envía al servidor sobre sí mismo y la petición.

**PRINCIPALES CABECERAS DE PETICIÓN:**

| Cabecera            | Ejemplo                                     | Propósito                        |
| ------------------- | ------------------------------------------- | -------------------------------- |
| **User-Agent**      | `Mozilla/5.0 (Windows NT 10.0; Win64; x64)` | Identificar el cliente/navegador |
| **Accept**          | `application/json, text/html;q=0.9`         | Formatos que el cliente acepta   |
| **Authorization**   | `Bearer token123` o `Basic dXNlcjpwYXNz`    | Credenciales de autenticación    |
| **Content-Type**    | `application/json`                          | Tipo de datos en el cuerpo       |
| **Content-Length**  | `1024`                                      | Tamaño del cuerpo en bytes       |
| **Cookie**          | `session=abc123; user=john`                 | Cookies almacenadas              |
| **Accept-Language** | `es-ES, es;q=0.9, en;q=0.8`                 | Idiomas preferidos               |
| **Accept-Encoding** | `gzip, deflate, br`                         | Compresiones aceptadas           |

**EJEMPLO COMPLETO DE PETICIÓN:**

```http
GET /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Accept: application/json, text/plain;q=0.8
Accept-Language: es-ES, es;q=0.9, en;q=0.7
Accept-Encoding: gzip, deflate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Cookie: session_id=abc123; user_preferences=dark_mode
Cache-Control: no-cache
```

### 2. **Cabeceras de Respuesta (Response Headers)**

Información que el servidor envía al cliente sobre la respuesta.

**PRINCIPALES CABECERAS DE RESPUESTA:**

| Cabecera                        | Ejemplo                            | Propósito                          |
| ------------------------------- | ---------------------------------- | ---------------------------------- |
| **Content-Type**                | `application/json; charset=utf-8`  | Tipo y codificación del contenido  |
| **Content-Length**              | `2048`                             | Tamaño del cuerpo de respuesta     |
| **Cache-Control**               | `max-age=3600, public`             | Directivas de caché                |
| **Set-Cookie**                  | `session=xyz789; Path=/; HttpOnly` | Establecer cookies                 |
| **Server**                      | `nginx/1.18.0`                     | Información del servidor           |
| **Access-Control-Allow-Origin** | `*` o `https://midominio.com`      | Control CORS                       |
| **Location**                    | `/nueva-ubicacion`                 | Redirecciones (3xx)                |
| **WWW-Authenticate**            | `Basic realm="Acceso restringido"` | Esquema de autenticación requerido |

**EJEMPLO COMPLETO DE RESPUESTA:**

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 245
Cache-Control: max-age=3600, public
Server: nginx/1.18.0
Set-Cookie: session_id=xyz789; Path=/; Secure; HttpOnly; SameSite=Strict
Access-Control-Allow-Origin: *
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
Date: Mon, 23 Oct 2023 10:30:45 GMT
```

### 3. **Cabeceras de Caché (Cache Headers)**

Controlan el almacenamiento temporal de recursos.

**PRINCIPALES CABECERAS DE CACHÉ:**

| Cabecera          | Valores Comunes                        | Significado                    |
| ----------------- | -------------------------------------- | ------------------------------ |
| **Cache-Control** | `no-cache`, `no-store`, `max-age=3600` | Control directo del caché      |
| **ETag**          | `"33a64df551425fcc55e4d"`              | Identificador único de versión |
| **Last-Modified** | `Mon, 23 Oct 2023 10:00:00 GMT`        | Fecha de última modificación   |
| **Expires**       | `Tue, 24 Oct 2023 10:30:45 GMT`        | Fecha de expiración            |

**EJEMPLOS DE ESTRATEGIAS DE CACHÉ:**

```http
# No almacenar en caché
Cache-Control: no-cache, no-store, must-revalidate

# Cachear por 1 hora
Cache-Control: public, max-age=3600

# Cachear pero validar con servidor
Cache-Control: no-cache
ETag: "33a64df551425fcc55e4d"
Last-Modified: Mon, 23 Oct 2023 10:00:00 GMT
```

### 4. **Cabeceras de Autenticación y Seguridad**

**MECANISMOS DE AUTENTICACIÓN:**

**Basic Auth:**

```http
Authorization: Basic dXNlcjpwYXNzd29yZA==
# (user:password en Base64)
```

**Bearer Token (JWT):**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Cookies de Sesión:**

```http
# En petición
Cookie: session_id=abc123; user_preferences=dark_mode

# En respuesta
Set-Cookie: session_id=xyz789; Path=/; Secure; HttpOnly; SameSite=Strict
```

### 5. **Cabeceras CORS (Cross-Origin Resource Sharing)**

Permiten el acceso entre diferentes dominios.

**CABECERAS CORS PRINCIPALES:**

| Cabecera                             | Ejemplo                       | Propósito               |
| ------------------------------------ | ----------------------------- | ----------------------- |
| **Access-Control-Allow-Origin**      | `*` o `https://cliente.com`   | Dominios permitidos     |
| **Access-Control-Allow-Methods**     | `GET, POST, PUT, DELETE`      | Métodos HTTP permitidos |
| **Access-Control-Allow-Headers**     | `Content-Type, Authorization` | Cabeceras permitidas    |
| **Access-Control-Allow-Credentials** | `true`                        | Permitir credenciales   |

**EJEMPLO DE RESPUESTA CORS:**

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://mi-frontend.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

## Cabeceras Específicas por Contexto

### **Para Upload de Archivos:**

```http
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Length: 1048576
```

### **Para APIs RESTful:**

```http
Accept: application/vnd.api+json
Content-Type: application/vnd.api+json
X-API-Version: 2.0
```

### **Para Streaming:**

```http
Transfer-Encoding: chunked
Content-Type: video/mp4
Content-Range: bytes 0-1023/2048
```

## Procesamiento de Cabeceras en el Servidor

**EJEMPLO EN NODE.JS:**

```javascript
app.get("/api/datos", (req, res) => {
  // Leer cabeceras de petición
  const userAgent = req.get("User-Agent");
  const authToken = req.get("Authorization");
  const acceptHeader = req.get("Accept");

  // Validar autenticación
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .set("WWW-Authenticate", 'Bearer realm="API"')
      .json({ error: "Token requerido" });
  }

  // Configurar cabeceras de respuesta
  res.set({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
    "X-Custom-Header": "valor-personalizado",
  });

  res.json({ datos: "contenido" });
});
```

## Cabeceras Personalizadas

**CONVENCIÓN:** Prefijar con `X-` para cabeceras personalizadas

**EJEMPLOS:**

```http
# En petición
X-API-Key: abc123def456
X-Request-ID: 123e4567-e89b-12d3-a456-426614174000
X-Client-Version: 2.1.0

# En respuesta
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1698064245
X-Powered-By: Mi-API/1.0
```

## Optimización y Mejores Prácticas

### **Compresión de Contenido:**

```http
# Cliente indica qué compresiones acepta
Accept-Encoding: gzip, deflate, br

# Servidor indica qué compresión usa
Content-Encoding: gzip
```

### **Negociación de Contenido:**

```http
# Cliente especifica preferencias
Accept: application/json, text/html;q=0.9, */*;q=0.8
Accept-Language: es-ES, es;q=0.9, en;q=0.7
Accept-Charset: utf-8, iso-8859-1;q=0.5
```

### **Seguridad:**

```http
# Cabeceras de seguridad recomendadas
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

## Resumen Técnico

- **Función:** Proveer metadatos y configuración para la comunicación HTTP
- **Tipos:** Petición, Respuesta, Caché, Autenticación, CORS
- **Formato:** `Nombre: valor` (una por línea)
- **Importancia:** Controlan caché, seguridad, formato de datos, autenticación
- **Extensibilidad:** Se pueden crear cabeceras personalizadas con prefijo `X-`

Las cabeceras son esenciales para el funcionamiento avanzado de aplicaciones web modernas, permitiendo control fino sobre el comportamiento de la comunicación entre cliente y servidor.
