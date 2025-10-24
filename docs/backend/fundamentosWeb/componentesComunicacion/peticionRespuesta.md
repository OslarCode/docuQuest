# Funcionamiento de los Mensajes de Petición y Respuesta HTTP

Los mensajes HTTP son el formato estandarizado que utilizan cliente y servidor para comunicarse. Siguen una estructura específica definida en el protocolo HTTP.

## Estructura de una Petición HTTP

Una petición HTTP está compuesta por tres partes principales:

### 1. **Línea de Inicio (Request Line)**

Contiene la información fundamental de la petición.

**FORMATO:** `Método URL Versión_HTTP`

**EJEMPLO:**

```
GET /api/usuarios/123 HTTP/1.1
```

**COMPONENTES:**

- **Método HTTP:** Acción a realizar (GET, POST, PUT, DELETE)
- **URL:** Recurso solicitado (`/api/usuarios/123`)
- **Versión HTTP:** Protocolo usado (`HTTP/1.1` o `HTTP/2`)

### 2. **Cabeceras (Headers)**

Metadatos que proporcionan contexto adicional.

**CATEGORÍAS PRINCIPALES:**

| Tipo de Cabecera  | Ejemplos                                                | Propósito                          |
| ----------------- | ------------------------------------------------------- | ---------------------------------- |
| **Autenticación** | `Authorization: Bearer token123` `Cookie: session=abc`  | Identificar al usuario             |
| **Contenido**     | `Content-Type: application/json` `Content-Length: 156`  | Describir los datos enviados       |
| **Cliente**       | `User-Agent: Mozilla/5.0...` `Accept: application/json` | Información del cliente            |
| **Caché**         | `Cache-Control: no-cache`                               | Control de almacenamiento temporal |

**EJEMPLO COMPLETO DE CABECERAS:**

```
Host: api.midominio.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Content-Type: application/json
Content-Length: 89
```

### 3. **Cuerpo (Body)**

Datos opcionales que se envían al servidor.

**SE USA EN:** POST, PUT, PATCH
**FORMATOS COMUNES:** JSON, XML, form-data

**EJEMPLO:**

```json
{
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "edad": 28
}
```

## Estructura de una Respuesta HTTP

La respuesta sigue una estructura similar pero con diferencias clave:

### 1. **Línea de Estado (Status Line)**

Indica el resultado de la petición.

**FORMATO:** `Versión_HTTP Código_Estado Mensaje`

**EJEMPLO:**

```
HTTP/1.1 200 OK
```

### 2. **Códigos de Estado HTTP**

| Código  | Categoría          | Significado                            | Ejemplos Comunes                                 |
| ------- | ------------------ | -------------------------------------- | ------------------------------------------------ |
| **1xx** | Informativo        | Petición recibida, proceso continuando | 100 Continue                                     |
| **2xx** | Éxito              | Petición completada satisfactoriamente | 200 OK, 201 Created, 204 No Content              |
| **3xx** | Redirección        | Acción adicional necesaria             | 301 Moved Permanently, 304 Not Modified          |
| **4xx** | Error del Cliente  | La petición contiene error             | 400 Bad Request, 401 Unauthorized, 404 Not Found |
| **5xx** | Error del Servidor | El servidor falló al procesar          | 500 Internal Server Error, 502 Bad Gateway       |

### 3. **Cabeceras de Respuesta**

Incluyen información específica del servidor.

**EJEMPLOS:**

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 245
Set-Cookie: session_id=abc123; Path=/; HttpOnly
Cache-Control: max-age=3600
Server: nginx/1.18.0
Date: Mon, 23 Oct 2023 10:30:45 GMT
```

### 4. **Cuerpo de la Respuesta**

Contiene los datos solicitados o mensajes de error.

**EJEMPLO DE ÉXITO:**

```json
{
  "id": 123,
  "nombre": "María García",
  "email": "maria@ejemplo.com",
  "activo": true
}
```

**EJEMPLO DE ERROR:**

```json
{
  "error": {
    "code": 404,
    "message": "Usuario no encontrado",
    "details": "El usuario con ID 999 no existe en el sistema"
  }
}
```

### Ejemplo Completo: Proceso de Login

#### **PETICIÓN DEL CLIENTE:**

```
POST /api/auth/login HTTP/1.1
Host: api.miapp.com
Content-Type: application/json
Content-Length: 67
User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)

{
  "email": "usuario@ejemplo.com",
  "password": "mi_contraseña_segura"
}
```

#### **RESPUESTA DEL SERVIDOR (ÉXITO):**

```
HTTP/1.1 200 OK
Content-Type: application/json
Set-Cookie: session_token=xyz789; Path=/; Secure; HttpOnly
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999

{
  "status": "success",
  "data": {
    "user": {
      "id": 123,
      "name": "Juan Pérez",
      "email": "usuario@ejemplo.com"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
}
```

#### **RESPUESTA DEL SERVIDOR (ERROR):**

```
HTTP/1.1 401 Unauthorized
Content-Type: application/json
WWW-Authenticate: Bearer

{
  "status": "error",
  "code": 401,
  "message": "Credenciales inválidas",
  "timestamp": "2023-10-23T10:30:45Z"
}
```

## Características Avanzadas

### **Persistencia de Conexiones (HTTP/1.1 vs HTTP/2)**

- **HTTP/1.1:** Múltiples conexiones para recursos paralelos
- **HTTP/2:** Multiplexación en una sola conexión

### **Codificación de Contenido**

- **gzip, deflate:** Compresión para reducir tamaño
- **chunked:** Transferencia en trozos para contenido dinámico

### **Negociación de Contenido**

El cliente puede especificar qué formatos acepta:

```
Accept: application/json, text/html;q=0.9, */*;q=0.8
Accept-Language: es-ES, es;q=0.9, en;q=0.8
Accept-Encoding: gzip, deflate
```

### Flujo de Procesamiento

1. **Cliente construye la petición** con método, URL, cabeceras y cuerpo
2. **Servidor parsea y valida** la petición
3. **Servidor ejecuta la lógica** de negocio (base de datos, etc.)
4. **Servidor forma la respuesta** con código de estado, cabeceras y cuerpo
5. **Cliente interpreta la respuesta** y actúa en consecuencia

### Resumen Técnico

- **Petición:** Método + URL + Cabeceras + Cuerpo
- **Respuesta:** Código Estado + Cabeceras + Cuerpo
- **Cabeceras:** Contexto y metadatos de la comunicación
- **Cuerpo:** Datos principales (opcional en peticiones GET)
- **Estado HTTP:** Resultado estandarizado de la operación

Esta estructura estandarizada permite la interoperabilidad entre cualquier cliente y servidor web, independientemente de su tecnología subyacente.
