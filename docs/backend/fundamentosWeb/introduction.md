# Fundamentos de la Web y HTTP

## Introducción al funcionamiento de Internet por detrás

La Web moderna es el resultado de la evolución de una idea sencilla: conectar ordenadores para compartir información de forma universal. Lo que comenzó como un sistema de documentos enlazados en los años 90 ha crecido hasta convertirse en una red global de aplicaciones interactivas, servicios en la nube, inteligencia artificial y comunicación en tiempo real.

Detrás de cada sitio web, aplicación móvil o plataforma digital que usamos a diario, existe una arquitectura basada en principios fundamentales que se mantienen desde el origen de Internet: la comunicación entre **clientes** y **servidores**, la transferencia de datos mediante **HTTP**, y la identificación de recursos a través de **dominios y direcciones IP**.

Comprender estos fundamentos es esencial antes de adentrarse en el desarrollo backend. Saber cómo fluye la información entre el navegador y el servidor, qué papel juegan los protocolos de comunicación, cómo intervienen los DNS o qué significa realmente “servir una página” permite al programador entender no solo **cómo construir** una aplicación web, sino también **por qué funciona** como lo hace.

**1. Introducción general**
La Web funciona gracias a un intercambio constante de mensajes entre clientes (navegadores) y servidores (ordenadores remotos). Para comprender el backend es esencial entender este proceso y el papel del protocolo HTTP.

**2. Modelo cliente-servidor**

- El **cliente** solicita información (por ejemplo, una página web).
- El **servidor** recibe la petición, la procesa y devuelve una **respuesta**.
- Toda esta comunicación sigue las reglas del protocolo **HTTP**.

**3. HTTP y HTTPS**

- **HTTP (HyperText Transfer Protocol)** define cómo se envían y reciben datos.
- **HTTPS** añade seguridad mediante cifrado **TLS/SSL**.
- Cada intercambio sigue una estructura básica:

  - Petición: `GET / HTTP/1.1`
  - Respuesta: `HTTP/1.1 200 OK` con el contenido solicitado.

**4. Dominios, DNS y hosting**

- **Dominio**: nombre legible del sitio web.
- **DNS**: traduce el dominio en una **dirección IP**.
- **Hosting**: servidor físico o virtual donde se aloja la web.
  Ejemplo: `www.google.com → DNS → 142.250.185.132 → servidor`.

**5. Métodos de petición HTTP**
Cada método indica una intención:

- **GET**: obtener información.
- **POST**: enviar datos.
- **PUT**: actualizar recursos.
- **DELETE**: eliminarlos.
  Ejemplo práctico: una llamada `fetch()` desde JavaScript.

**6. Puertos y direcciones locales**

- **localhost** representa tu propio equipo.
- **Puerto** indica la puerta de comunicación (ej. `http://localhost:3000`).
  Se usa para probar servidores locales durante el desarrollo.

**7. Seguridad y HTTPS**

- HTTPS cifra las comunicaciones para evitar interceptaciones.
- Es obligatorio en producción (especialmente en formularios o pagos).
- Se configura con certificados **SSL/TLS**, por ejemplo, mediante **Let’s Encrypt**.

**8. Conclusión**

- El **backend** responde a peticiones **HTTP**.
- **HTTP/HTTPS** son el lenguaje de comunicación.
- **Dominios, DNS y hosting** sostienen la infraestructura web.
- Con herramientas como **Node.js**, es posible crear un servidor en pocas líneas.
