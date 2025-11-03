# Programación Backend

El **backend** es la parte de una aplicación web que vive en el **servidor**: recibe peticiones, ejecuta la lógica del negocio, habla con bases de datos o servicios externos y devuelve respuestas (normalmente JSON o HTML).

Si el frontend es _“la cara”_, el backend es _“el cerebro + las manos”_.

## Cómo funciona (flujo básico)

1. El navegador o la app móvil hace una **request** a una URL (por ejemplo `POST /api/pedidos`).
2. El backend procesa: valida datos, aplica reglas, consulta o guarda en la base de datos, integra pasarelas, etc.
3. El backend responde con un status (`200`, `201`, `400`, `401`, `500`…) y un payload (`JSON`, `HTML`, archivo…).

Cliente → (HTTP) → Backend (Rutas, Controladores, Servicios, DB) → Respuesta

## Piezas clave (sin rodeos)

- **Rutas y Controladores** → definen qué URL existe y qué hace.
- **Servicios** → contienen la lógica real (cálculos, reglas, integraciones).
- **Modelos / Base de datos** → guardan y leen datos con consistencia.
- **Autenticación y Autorización** → controlan quién eres y qué puedes hacer (JWT, sesiones).
- **Validación** → nunca confíes en lo que entra desde el cliente.
- **Observabilidad** → logs, métricas, trazas; si no se mide, no existe.
- **Seguridad** → CORS, rate limiting, saneo de inputs, secretos en variables de entorno.
- **Despliegue** → ejecutar el servidor en VPS, Docker o serverless de forma reproducible.

## Ejemplo conceptual mínimo de backend

Antes de ver código real, conviene entender cómo “piensa” un backend. Imagina que existe una web donde los usuarios envían su nombre y su edad para registrarse.

### Pseudocódigo del servidor

```
cuando llega una petición POST a /registro:

    leer los datos enviados (nombre, edad)

    si falta alguno o la edad es menor que 0:
        devolver respuesta 400 con "Datos inválidos"

    guardar los datos en almacenamiento (archivo, memoria o base de datos)

    devolver respuesta 201 con "Registro completado"
```

### Posibles respuestas del servidor

Correcto:

```
Status: 201 Created
Contenido: Registro completado
```

Datos erróneos:

```
Status: 400 Bad Request
Contenido: Datos inválidos
```

### Qué nos enseña este ejemplo

Un backend siempre:

- recibe peticiones (datos del cliente)
- valida lo recibido
- ejecuta lógica (reglas de negocio)
- guarda información si es necesario
- devuelve una respuesta clara y estructurada

## Tipos de backend hoy en día

Aunque la idea principal del backend es siempre la misma (recibir peticiones, aplicar reglas y devolver respuestas), hoy existen diferentes formas de construirlo. Cada enfoque responde a necesidades distintas de escalabilidad, mantenimiento y velocidad de desarrollo.

### Backend monolítico

Toda la aplicación vive en un único servidor y proyecto. Es la forma tradicional y la más didáctica para empezar. Resulta sencilla de entender y mantener en pequeños y medianos proyectos.

Ejemplos habituales: aplicaciones con frameworks como Laravel, Django, Spring, Express.

Cuándo usarlo: proyectos educativos, MVPs, equipos pequeños, sistemas internos.

### Microservicios

La aplicación se divide en muchos servicios pequeños, cada uno con una función concreta y comunicándose entre sí mediante APIs o mensajería.

Ventaja: alta escalabilidad y despliegue independiente de componentes.
Desventaja: más complejidad operativa desde el inicio.

Cuándo usarlo: grandes plataformas, servicios con alta concurrencia y equipos distribuidos.

### Backend serverless

En lugar de servidores tradicionales, se ejecutan funciones bajo demanda en la nube. No se gestiona infraestructura y se paga solo por uso.

Ventaja: escalado automático y coste ajustado al tráfico.
Desventaja: mayor dependencia del proveedor y límites en tiempos de ejecución o conexión persistente.

Ejemplos: AWS Lambda, Google Cloud Functions, Cloudflare Workers.

### Edge computing

Lógica ejecutada lo más cerca posible del usuario para reducir latencia, especialmente en aplicaciones globales o tiempo real.

Ejemplo: Cloudflare Workers, Vercel Edge Functions.

### APIs REST, GraphQL y WebSockets

Más que “tipos de backend”, son formas de exponer funcionalidades:

- REST: comunicación con recursos y métodos HTTP estándar.
- GraphQL: consultas definidas por el cliente para obtener solo lo necesario.
- WebSockets: conexión persistente para tiempo real (chat, notificaciones, streaming).

### Qué debes retener en esta fase

Todas estas arquitecturas cumplen la misma misión fundamental: recibir solicitudes, procesar información y devolver resultados. Para aprender correctamente, primero se trabaja con un backend monolítico simple, luego se exploran los demás modelos a medida que avanzan las necesidades tecnológicas y de negocio.

## Cosas que harías en un backend real

- Autenticación JWT para rutas protegidas (`/api/admin/*`).
- Rate limiting y configuración de CORS.
- Validación fuerte con Zod o Joi en entrada y salida.
- Capas separadas (rutas → controladores → servicios → repositorios).
- Migraciones formales y seeds de base de datos.
- Logs estructurados y métricas para monitoreo.
- Tests automáticos y CI/CD antes de desplegar.
- Variables de entorno para secretos y configuración (nunca en el repo).

## En una frase

> El **backend** es el servicio que **custodia datos** y **hace cumplir las reglas**.
> Expone APIs fiables y seguras, y garantiza que cada request se convierta en una respuesta coherente.
> Lo demás es implementación.

A continuación tienes un glosario compacto y didáctico, pensado para acompañar a la introducción sin abrumar. Está redactado con el mismo tono formativo, orientado a principiantes pero riguroso en la terminología técnica. Puedes insertarlo al final del apartado introductorio antes de empezar con ejemplos prácticos o arquitectura básica.

## Glosario esencial para entender el backend

Este glosario recoge términos básicos que verás constantemente al trabajar con backend. Comprenderlos desde el principio ayuda a construir una base sólida.

**Servidor**
Equipo o proceso que recibe solicitudes de clientes, las procesa y devuelve respuestas.

**Cliente**
Aplicación o dispositivo que solicita algo al servidor. Puede ser un navegador, una app móvil, otro servidor o un script.

**Request (petición)**
Mensaje que el cliente envía al servidor a través del protocolo HTTP. Incluye método, ruta, cabeceras y a veces cuerpo de datos.

**Response (respuesta)**
Mensaje que el servidor envía al cliente tras procesar la solicitud. Contiene un código de estado, cabeceras y datos en el cuerpo.

**HTTP**
Protocolo que define cómo se comunican clientes y servidores en la web. Es la base de la comunicación en backend.

**Métodos HTTP**
Acciones estándar usadas para interactuar con recursos: GET, POST, PUT, PATCH, DELETE.

**Ruta o endpoint**
Dirección URL a la que el cliente hace una petición para acceder a una funcionalidad concreta, por ejemplo `/api/usuarios`.

**Código de estado (status code)**
Número que indica el resultado de la operación. Ejemplos

- 200: OK
- 201: Creado
- 400: Error del cliente
- 401/403: Autenticación/Autorización fallida
- 500: Error del servidor

**Base de datos**
Sistema donde el backend almacena y consulta información de manera estructurada.

**Modelo**
Estructura que representa una entidad real y define cómo se gestionan sus datos, generalmente conectada a la base de datos.

**Lógica de negocio**
Reglas que definen cómo debe funcionar la aplicación según sus objetivos. Por ejemplo, qué condiciones debe cumplir un pedido para ser aceptado.

**API**
Interfaz que permite que diferentes sistemas se comuniquen. En backend, expone operaciones accesibles desde un cliente.

**Autenticación**
Proceso para verificar la identidad de un usuario o aplicación.

**Autorización**
Proceso que determina qué acciones puede realizar un usuario autenticado.

**Middleware**
Funciones que se ejecutan antes o después de procesar una petición para tareas como validar datos, gestionar sesiones o registrar actividad.

**Variables de entorno**
Configuraciones externas al código que almacenan información sensible o dependiente del entorno, como contraseñas o URLs de bases de datos.

**Escalabilidad**
Capacidad de un sistema para manejar más usuarios o más carga aumentando recursos sin perder rendimiento.
