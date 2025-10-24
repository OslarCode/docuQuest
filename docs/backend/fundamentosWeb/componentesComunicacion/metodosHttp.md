# Funcionamiento de los Métodos HTTP

Los métodos HTTP (también llamados "verbos HTTP") definen la acción que el cliente quiere realizar sobre un recurso específico. Son fundamentales en las APIs RESTful y determinan cómo interactúan cliente y servidor.

## Métodos HTTP Principales

### 1. **GET**

**FUNCIÓN:** Solicitar la representación de un recurso.

**CARACTERÍSTICAS:**

- Solo recupera datos
- No debe modificar el estado del servidor
- Puede ser cacheado
- Permanece en el historial del navegador
- Puede ser marcado como favorito

**EJEMPLO PRÁCTICO:**

```http
GET /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
Accept: application/json
```

**RESPUESTA ESPERADA:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nombre": "Ana López",
  "email": "ana@ejemplo.com"
}
```

**BUENAS PRÁCTICAS:**

- Usar para operaciones de lectura
- No enviar datos sensibles en la URL
- Implementar paginación para grandes conjuntos de datos

### 2. **POST**

**FUNCIÓN:** Enviar datos al servidor para crear un nuevo recurso.

**CARACTERÍSTICAS:**

- Crea nuevos recursos
- Lleva un cuerpo (body) con los datos
- No es idempotente (múltiples llamadas crean múltiples recursos)
- No es cacheable

**EJEMPLO PRÁCTICO:**

```http
POST /api/usuarios HTTP/1.1
Host: api.midominio.com
Content-Type: application/json
Content-Length: 78

{
  "nombre": "Carlos Ruiz",
  "email": "carlos@ejemplo.com",
  "edad": 32
}
```

**RESPUESTA ESPERADA:**

```http
HTTP/1.1 201 Created
Location: /api/usuarios/456
Content-Type: application/json

{
  "id": 456,
  "nombre": "Carlos Ruiz",
  "email": "carlos@ejemplo.com",
  "edad": 32
}
```

**CASOS DE USO:**

- Crear nuevos usuarios
- Enviar formularios de contacto
- Procesar pagos

### 3. **PUT**

**FUNCIÓN:** Actualizar un recurso existente o crearlo si no existe.

**CARACTERÍSTICAS:**

- Es idempotente (múltiples llamadas tienen el mismo efecto)
- Reemplaza el recurso completo
- Requiere que el cliente envíe todos los atributos

**EJEMPLO PRÁCTICO:**

```http
PUT /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
Content-Type: application/json
Content-Length: 85

{
  "id": 123,
  "nombre": "Ana López Modificado",
  "email": "ana.modificada@ejemplo.com",
  "edad": 29
}
```

**RESPUESTA ESPERADA:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nombre": "Ana López Modificado",
  "email": "ana.modificada@ejemplo.com",
  "edad": 29
}
```

### 4. **PATCH**

**FUNCIÓN:** Actualizar parcialmente un recurso.

**CARACTERÍSTICAS:**

- Actualiza solo los campos especificados
- Más eficiente que PUT para cambios pequeños
- No necesariamente idempotente

**EJEMPLO PRÁCTICO:**

```http
PATCH /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
Content-Type: application/json
Content-Length: 35

{
  "email": "nuevo.email@ejemplo.com"
}
```

**RESPUESTA ESPERADA:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 123,
  "nombre": "Ana López",
  "email": "nuevo.email@ejemplo.com",
  "edad": 28
}
```

### 5. **DELETE**

**FUNCIÓN:** Eliminar un recurso específico.

**CARACTERÍSTICAS:**

- Elimina el recurso identificado
- Es idempotente
- Puede devolver el recurso eliminado o solo confirmación

**EJEMPLO PRÁCTICO:**

```http
DELETE /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
Authorization: Bearer token123
```

**RESPUESTAS POSIBLES:**

```http
# Opción 1: Confirmación simple
HTTP/1.1 204 No Content

# Opción 2: Con datos del recurso eliminado
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Usuario 123 eliminado correctamente"
}
```

## Métodos Adicionales

### 6. **HEAD**

**FUNCIÓN:** Igual que GET pero sin cuerpo de respuesta.

**USO:** Verificar si un recurso existe, metadatos.

```http
HEAD /api/usuarios/123 HTTP/1.1
Host: api.midominio.com
```

### 7. **OPTIONS**

**FUNCIÓN:** Descubrir qué métodos HTTP soporta un endpoint.

**USO:** Pre-vuelo en CORS, descubrimiento de API.

```http
OPTIONS /api/usuarios HTTP/1.1
Host: api.midominio.com
```

**RESPUESTA:**

```http
HTTP/1.1 200 OK
Allow: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

## Propiedades Clave de los Métodos

### **Idempotencia**

Una operación es idempotente si múltiples peticiones idénticas tienen el mismo efecto que una sola.

**IDEMPOTENTES:** GET, PUT, DELETE, HEAD, OPTIONS
**NO IDEMPOTENTES:** POST, PATCH

**EJEMPLO:**

- `DELETE /usuarios/123` (si se ejecuta 1 o 5 veces, el resultado es el mismo)
- `POST /usuarios` (cada ejecución crea un usuario nuevo)

### **Seguridad**

Un método es seguro si no modifica el estado del servidor.

**MÉTODOS SEGUROS:** GET, HEAD, OPTIONS
**MÉTODOS NO SEGUROS:** POST, PUT, PATCH, DELETE

## Ejemplos de Flujos Completos

### **CRUD Completo de Usuarios:**

1. **CREAR (POST)**

```http
POST /usuarios
Body: {"nombre": "Maria", "email": "maria@ejemplo.com"}
→ Respuesta: 201 Created, Location: /usuarios/1
```

2. **LEER (GET)**

```http
GET /usuarios/1
→ Respuesta: 200 OK, {"id": 1, "nombre": "Maria", ...}
```

3. **ACTUALIZAR (PUT)**

```http
PUT /usuarios/1
Body: {"id": 1, "nombre": "Maria", "email": "nuevo@email.com"}
→ Respuesta: 200 OK
```

4. **ELIMINAR (DELETE)**

```http
DELETE /usuarios/1
→ Respuesta: 204 No Content
```

## Buenas Prácticas y Convenciones

### **Designación Correcta de Métodos:**

- Usar GET para consultas y búsquedas
- Usar POST para creación
- Usar PUT para reemplazo completo
- Usar PATCH para actualizaciones parciales
- Usar DELETE para eliminación

### **Códigos de Estado Apropiados:**

- **POST:** 201 Created (con header Location)
- **PUT:** 200 OK o 204 No Content
- **DELETE:** 200 OK o 204 No Content
- **GET:** 200 OK

### **Ejemplo de API RESTful Bien Diseñada:**

```
GET    /articulos          # Listar artículos
POST   /articulos          # Crear artículo
GET    /articulos/123      # Obtener artículo 123
PUT    /articulos/123      # Reemplazar artículo 123
PATCH  /articulos/123      # Actualizar parcialmente artículo 123
DELETE /articulos/123      # Eliminar artículo 123
```

## Resumen Técnico

| Método     | Idempotente | Seguro | Con Body | Propósito Principal     |
| ---------- | ----------- | ------ | -------- | ----------------------- |
| **GET**    | ✓           | ✓      | ❌       | Recuperar recursos      |
| **POST**   | ❌          | ❌     | ✓        | Crear nuevos recursos   |
| **PUT**    | ✓           | ❌     | ✓        | Reemplazar recursos     |
| **PATCH**  | ❌          | ❌     | ✓        | Actualizar parcialmente |
| **DELETE** | ✓           | ❌     | ❌       | Eliminar recursos       |

La correcta utilización de los métodos HTTP es fundamental para construir APIs RESTful predecibles, mantenibles y que sigan los estándares web.
