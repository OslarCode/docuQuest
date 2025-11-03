# Conectandolo todo: Desarrollo web basado en Internet

## El ciclo completo para conectar tu sitio web a Internet

Una vez que has diseñado tu sitio web con HTML, CSS, JavaScript o cualquier framework moderno, llega el momento clave: **hacer que el mundo pueda verlo**.

Pero… ¿cómo se pasa de archivos en tu ordenador a un sitio disponible en `www.miweb.com`?

Este proceso involucra varios componentes de Internet que ya has visto en módulos anteriores: **DNS, direcciones IP, HTTPS, servidores, protocolos TCP/IP**, etc.

Veámoslo paso a paso, de forma clara y conectada con lo que ya sabes.

## ¿Qué se necesita para que una web sea accesible?

Tener solo los archivos `.html`, `.css`, `.js` no es suficiente. Para que cualquier persona, desde cualquier parte del mundo, pueda ver tu web, necesitas **conectar cuatro piezas clave**:

### 1. Dominio + DNS + Hosting + HTTPS

| Elemento    | ¿Qué es?                              | ¿Qué hace?                                             |
| ----------- | ------------------------------------- | ------------------------------------------------------ |
| **Dominio** | El nombre de tu web (ej. `miweb.com`) | Es la dirección que el usuario escribe en el navegador |
| **DNS**     | Sistema de Nombres de Dominio         | Traduce el dominio a una IP del servidor               |
| **Hosting** | Servidor donde se aloja tu web        | Almacena tus archivos y los sirve cuando alguien entra |
| **HTTPS**   | Protocolo de comunicación segura      | Protege los datos que viajan entre usuario y servidor  |

> Analogía completa:
>
> Piensa en tu web como un restaurante:
>
> - El **dominio** es el cartel con el nombre en la calle.
> - El **DNS** es quien busca la dirección exacta en un mapa.
> - El **hosting** es el local donde está el restaurante.
> - El **HTTPS** es la cerradura segura que impide que alguien robe la comida por el camino.

## Flujo completo: ¿Cómo conectas tu web al mundo?

1. **Registras un dominio** en un proveedor como DonDominio, Namecheap o Google Domains.
2. **Contratas un hosting** o usas uno gratuito como GitHub Pages, Netlify o Vercel.
3. Configuras los **registros DNS** para que el dominio apunte al servidor (hosting).
4. **Subes los archivos** de tu web al hosting (mediante Git, FTP o panel web).
5. Activas **HTTPS** con un certificado SSL (normalmente automático).
6. Tu web queda disponible en Internet a través de una URL, lista para cualquier visitante.

## ¿Cómo subir tu sitio web a un hosting?

Aquí tienes tres plataformas **gratuitas, modernas y fáciles de usar**, perfectas para comenzar. Funcionan especialmente bien con sitios estáticos (HTML, CSS, JS) o apps modernas (React, Vue, Next.js).

### Opción 1: GitHub Pages

Ideal para sitios estáticos, portafolios y documentación.

### Requisitos:

- Tener una cuenta en [GitHub](https://github.com/)

### Pasos:

1. Crea un repositorio llamado `tusitio`.
2. Sube tus archivos (`index.html`, `styles.css`, etc.).
3. Entra en **Settings → Pages**.
4. Selecciona la rama (`main`) y carpeta (`/root`).
5. Obtendrás una URL como:

```bash
https://tuusuario.github.io/tusitio/

```

> Automáticamente, GitHub incluye HTTPS gratuito.

### Opción 2: Netlify (ultra fácil)

Perfecto para sitios personales, landings y pequeños proyectos.

### Requisitos:

- Cuenta en [Netlify.com](https://www.netlify.com/)

### Pasos:

1. Haz clic en “**Add new site** → Import from Git”.
2. Conecta tu cuenta de GitHub y selecciona tu repositorio.
3. Netlify detecta el proyecto y lo publica automáticamente.
4. Puedes configurar tu propio dominio o usar uno temporal como:

```bash
https://nombre-unico.netlify.app

```

> Incluye HTTPS gratis, despliegue automático y opciones avanzadas de rendimiento.

### Opción 3: Vercel (ideal para apps con JavaScript moderno)

Perfecta para proyectos en **React, Next.js, Vue, Svelte, Astro**, etc.

### Requisitos:

- Cuenta en [Vercel.com](https://vercel.com/)

### Pasos:

1. Importa tu proyecto desde GitHub.
2. Vercel detecta el framework y realiza el build automáticamente.
3. Obtienes una URL del estilo:

```bash
https://tusitio.vercel.app

```

> Vercel proporciona HTTPS automático, configuración continua y CDN integrada.

### Comparativa rápida

| Plataforma       | Ideal para…                 | Facilidad  | Dominio propio | HTTPS automático |
| ---------------- | --------------------------- | ---------- | -------------- | ---------------- |
| **GitHub Pages** | Sitios estáticos simples    | ⭐⭐⭐⭐   | Sí             | Sí               |
| **Netlify**      | Portafolios, landings       | ⭐⭐⭐⭐⭐ | Sí             | Sí               |
| **Vercel**       | Apps JS (React, Next, etc.) | ⭐⭐⭐⭐   | Sí             | Sí               |

## ¿Y qué pasa a nivel de red?

Cuando alguien visita tu sitio, el proceso invisible que ocurre en segundos es:

1. El navegador pide la dirección (ej. `www.miweb.com`)
2. El **DNS convierte el dominio en una IP**.
3. Se establece una conexión TCP/IP entre el navegador y el servidor.
4. Si hay **HTTPS**, se cifra la conexión con SSL/TLS.
5. El navegador descarga los archivos desde el **hosting** (HTML, CSS, JS).
6. Se renderiza la web en la pantalla del usuario.

> Todo esto sucede en milisegundos, pero involucra routers, switches, protocolos, puertos, IPs y servidores en varias partes del mundo.

## Conclusiones

| Paso                | ¿Qué implica?                                                |
| ------------------- | ------------------------------------------------------------ |
| **Diseño**          | Tu web creada con código (HTML, CSS, JS, frameworks)         |
| **Hosting**         | Servidor donde se aloja y sirve tu sitio web                 |
| **Dominio + DNS**   | Dirección pública que permite a otros encontrar tu web       |
| **Seguridad HTTPS** | Cifrado para proteger datos entre el visitante y el servidor |
| **Visibilidad web** | Tu sitio es accesible desde cualquier parte del mundo        |

## Recursos adicionales

### Libros

- **“Full Stack Web Development For Beginners” – Mark Wahlbeck**
  Incluye la parte de despliegue web real, Git, dominios, DNS y hosting.
- **“Build and Deploy Modern Web Projects” – Netlify Docs**
  Disponible en línea: [https://docs.netlify.com/](https://docs.netlify.com/)

### Webs y tutoriales

- **GitHub Pages Docs**
  [https://pages.github.com/](https://pages.github.com/)
- **Vercel Guide**
  [https://vercel.com/docs](https://vercel.com/docs)
- **Netlify Learn**
  [https://www.netlify.com/learn/](https://www.netlify.com/learn/)
- **Let's Encrypt – Certificados gratuitos HTTPS**
  [https://letsencrypt.org/](https://letsencrypt.org/)

### Vídeos recomendados

1.  **“Cómo subir tu web a GitHub Pages” – Fazt (YouTube, español)**

[https://youtu.be/8AZ8GqW5iak](https://youtu.be/8AZ8GqW5iak)

2.  **“Desplegar una web en Netlify en 5 minutos” – HolaMundo (español)**

[https://youtu.be/ExFE6rj9gJU](https://youtu.be/ExFE6rj9gJU)

3.  **“¿Cómo funciona un dominio, DNS y hosting?” – La Cocina del Código (español)**

[https://youtu.be/B1k_sxosg5M](https://youtu.be/B1k_sxosg5M)

# Seguridad web básica

> Continuación del módulo anterior:
>
> Una vez que tu sitio web está publicado y accesible desde cualquier parte del mundo, el siguiente paso es **garantizar que sea seguro** para los usuarios que lo visitan. Esto no solo genera confianza (candado verde 🔒), sino que **protege los datos y evita ataques** que podrían comprometer tu sitio o a tus visitantes.

## ¿Qué es un certificado SSL?

Un **certificado SSL** (Secure Sockets Layer) —actualmente reemplazado por **TLS (Transport Layer Security)**— es un **archivo digital** que se instala en tu servidor para habilitar la navegación segura a través de **HTTPS**.

> HTTPS es la versión segura de HTTP. Usa el protocolo SSL/TLS para cifrar los datos que viajan entre el navegador y tu servidor.

## ¿Qué hace un certificado SSL/TLS?

1. **Cifra los datos** (como contraseñas o tarjetas de crédito) para que nadie pueda espiarlos.
2. **Verifica la identidad del sitio**, asegurando al usuario que está en la web correcta.
3. Activa el icono de **candado** en la barra del navegador.
4. **Evita advertencias de seguridad** al visitar la web.

_Ejemplo real:_

Al entrar en `https://www.mi-banco.com`, el navegador usa el certificado SSL para confirmar que estás en el sitio original y cifra tu contraseña cuando inicias sesión.

## ¿Dónde se consiguen estos certificados?

- **En el proveedor de hosting:** la mayoría incluyen certificados gratuitos.
- **Con Let's Encrypt:** organización que emite certificados SSL gratuitos y automáticos.
- **De pago:** algunas empresas prefieren certificados con **validación extendida (EV)** para mostrar su nombre legal junto al candado, ideal para ecommerce y bancos.

## Otras capas de seguridad importantes

Cuando un sitio está disponible por HTTPS, ya cumple una parte esencial de la seguridad web. Pero aún existen **otras amenazas comunes** que podemos prevenir con configuraciones adicionales.

### HSTS (HTTP Strict Transport Security)

Es una cabecera que le indica al navegador:

> “Solo se debe acceder a esta web por HTTPS, nunca por HTTP.”

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

```

_Previene ataques de downgrade_, donde un atacante intenta forzar una conexión no segura.

### CSP (Content Security Policy)

Permite definir **desde qué fuentes externas se pueden cargar archivos** como scripts, imágenes o estilos. Así puedes evitar la ejecución de código malicioso.

```
Content-Security-Policy: default-src 'self'; img-src 'self' cdn.miweb.com; script-src 'self';

```

_Bloquea ataques XSS_ (ver más abajo).

### ¿Qué es XSS (Cross-Site Scripting)?

Es cuando un atacante **inyecta código JavaScript malicioso** en tu web. Puede robar cookies, redirigir al usuario, manipular el contenido o registrar lo que escribe.

_Ejemplo típico:_

```html
<script>
  alert("¡Hackeado!");
</script>
```

### ¿Cómo prevenir XSS?

- Escapando correctamente caracteres peligrosos (`<`, `>`, `&`, etc.)
- Aplicando una política **CSP restrictiva**
- **Validando y sanitizando** todas las entradas del usuario

### ¿Qué es CSRF (Cross-Site Request Forgery)?

Ocurre cuando un usuario legítimo es engañado para ejecutar **acciones maliciosas sin saberlo**, como enviar dinero o cambiar su contraseña.

_Ejemplo real:_

1. Inicias sesión en tu banco.
2. Sin cerrar sesión, visitas una web maliciosa.
3. Esa web envía una solicitud automática a `POST /transferir` sin que tú lo sepas.

### ¿Cómo se previene CSRF?

- Usando **tokens únicos** que verifiquen cada acción.
- Validando el **origen** de la solicitud (cabeceras `Origin` o `Referer`).
- Configurando cookies con `SameSite=Strict`.

### ¿Qué es Clickjacking?

Consiste en **engañar al usuario para que haga clic en algo sin saberlo**. El atacante incrusta tu web en un `iframe` invisible y pone encima un botón falso.

### ¿Cómo prevenirlo?

- Con esta cabecera:

```
X-Frame-Options: DENY

```

- O mediante CSP:

```
Content-Security-Policy: frame-ancestors 'none';

```

## ¿Cómo proteger tu web desde el navegador y el servidor?

### Desde el navegador (cliente):

- Redirigir todo a **HTTPS obligatorio**
- Activar **HSTS** para que nunca cargue HTTP
- Usar políticas **CSP restrictivas**
- Validar entradas y escapar salidas (HTML, JS, URLs)
- Usar cabeceras adicionales como:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: no-referrer`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`

### Desde el servidor (backend):

- Mantén actualizado tu sistema, CMS, plugins y frameworks
- Usa un firewall (como **Cloudflare** o **WAFs**)
- Escanea tu web regularmente:
  - [https://observatory.mozilla.org](https://observatory.mozilla.org/)
  - [https://securityheaders.com](https://securityheaders.com/)
- Aplica políticas de acceso y control de errores en `.htaccess`
- Asegúrate de que tus **certificados SSL estén activos y renovados**

## Resumen

| Amenaza / Protección  | ¿Qué hace?                                                       |
| --------------------- | ---------------------------------------------------------------- |
| **SSL/TLS (HTTPS)**   | Cifra los datos entre cliente y servidor                         |
| **HSTS**              | Fuerza al navegador a usar solo HTTPS                            |
| **CSP**               | Restringe fuentes externas para evitar inyecciones               |
| **XSS**               | Inyección de scripts → se previene con validación y CSP          |
| **CSRF**              | Acciones maliciosas → se previene con tokens y origen verificado |
| **Clickjacking**      | Clics engañosos en iframes → se bloquea con X-Frame-Options      |
| **Cabeceras seguras** | Mejoran protección y privacidad en cada navegador                |

## Recursos adicionales para reforzar

### Libros y guías:

- _Web Security for Developers_ – Malcolm McDonald
  Práctico, enfocado a seguridad moderna sin complicarse.
- _Hacking Web Apps_ – Mike Shema
  Explica los tipos de ataque web con ejemplos y prevención.

### Webs y documentación:

- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
  Lista actualizada de las 10 amenazas web más frecuentes.
- [Let's Encrypt](https://letsencrypt.org/)
  Para obtener certificados SSL gratuitos.

### Vídeos:

- **“¿Qué es HTTPS y SSL?” – DotCSV (español)**
  [https://youtu.be/Efw1n9xKbGk](https://youtu.be/Efw1n9xKbGk)
- **“Cómo proteger tu sitio con cabeceras HTTP” – La Cocina del Código**
  [https://youtu.be/vKnCUmYfc5E](https://youtu.be/vKnCUmYfc5E)

# Buenas prácticas para desarrolladores web

> Conexión con el módulo anterior:
>
> Ya sabes cómo proteger tu web con HTTPS, certificados, cabeceras seguras y otras medidas clave de seguridad.
>
> Ahora llega el momento de **ir más allá** y aplicar una serie de buenas prácticas para que tu web sea también **rápida, compatible y profesional**.

## 1. Pruebas en diferentes navegadores y redes

### ¿Por qué es importante?

Un sitio web puede funcionar perfecto en tu portátil con Wi-Fi rápido y navegador actualizado… pero fallar en un móvil antiguo con red 3G o en un navegador menos usado como Safari o Edge.

> Desarrollar sin probar es como lanzar un cohete sin revisar los controles: puede que funcione… o puede que explote.

### Recomendaciones clave

| Prueba                             | ¿Qué verificar?                                             |
| ---------------------------------- | ----------------------------------------------------------- |
| Chrome, Firefox, Safari, Edge      | Compatibilidad de HTML, CSS, JS y animaciones               |
| Modo móvil                         | Diseño responsive, usabilidad táctil, visibilidad           |
| Conexión lenta (Fast 3G, Slow 3G)  | Rendimiento, carga progresiva, errores                      |
| Sin JavaScript o navegador antiguo | Comportamiento degradado (fallbacks), mensajes alternativos |

En DevTools → pestaña **Network**, puedes simular velocidad lenta o desconexión.

En pestaña **Rendering**, activa simulación de problemas visuales.

## 2. Errores comunes en producción (¡y cómo evitarlos!)

Llevar una web a producción sin revisar ciertos aspectos técnicos es uno de los errores más frecuentes. Aquí van los más típicos:

### CORS (Cross-Origin Resource Sharing)

Cuando tu web necesita hacer peticiones a otro dominio (como una API), el servidor remoto debe autorizar esa conexión. Si no lo hace, el navegador **la bloqueará por seguridad**.

Error típico:

```bash
Access to fetch at 'https://api.otrositio.com' from origin 'https://miweb.com' has been blocked by CORS policy.

```

### Solución:

- En el servidor remoto:

```
Access-Control-Allow-Origin: https://miweb.com

```

- En desarrollo: usa **proxies locales** (`vite.config.js`, `next.config.js`) o servidores intermedios.

### Mixed content (contenido mixto)

Si tu sitio carga por `https://` pero **incluye imágenes, scripts o iframes desde `http://`**, el navegador bloqueará esos recursos por seguridad.

### Solución:

- Usa siempre **URLs seguras (https)** para todo.
- Puedes forzar la actualización automática con:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="upgrade-insecure-requests"
/>
```

### DNS mal configurado

- El dominio no apunta al hosting.
- Registros `A`, `CNAME`, `MX` o `TXT` mal definidos.
- Subdominios como `www` o `blog` no resuelven.

### Solución:

- Verifica tus DNS en [https://dnschecker.org](https://dnschecker.org/)
- Usa comandos como `dig`, `nslookup` o los paneles de tu proveedor (Cloudflare, DonDominio, etc.)

## 3. Optimización web real

Optimizar tu web no es solo cuestión de estética o velocidad: **mejora la experiencia del usuario, reduce consumo de datos y mejora tu SEO**.

### Imágenes: formato y peso

- Usa **formatos modernos** como `.webp` o `.avif`.
- Comprime sin perder calidad:
  - [https://tinypng.com](https://tinypng.com/)
  - [https://squoosh.app](https://squoosh.app/)

### 💤 Lazy Load (carga diferida)

Evita cargar todas las imágenes desde el inicio. Cárgalas solo cuando el usuario las necesite (scroll).

```html
<img src="imagen.jpg" loading="lazy" alt="Ejemplo de imagen optimizada" />
```

Mejora la velocidad inicial de carga y el rendimiento en móviles.

### Minificación y compresión

### CSS y JS:

- Minifica los archivos (`.min.js`, `.min.css`) para reducir su tamaño.
- Herramientas recomendadas:
  - `Terser`, `esbuild`, `cssnano`
  - Automatizado por frameworks como **Vite**, **Next.js**, **Parcel**

### HTML:

- Usa herramientas de build como `html-minifier` o ajustes en el sistema de producción.

### Servidor:

Activa compresión Gzip o Brotli para servir archivos más pequeños:

```
# Apache
AddOutputFilterByType DEFLATE text/html text/css application/javascript

```

```
# Nginx
gzip on;
gzip_types text/html text/css application/javascript;

```

## Resumen

| Buenas prácticas               | ¿Por qué aplicarlas?                                  |
| ------------------------------ | ----------------------------------------------------- |
| Probar en navegadores y redes  | Garantiza compatibilidad y accesibilidad global       |
| Evitar errores CORS            | Permite la comunicación con APIs externas             |
| Evitar contenido mixto         | Mejora la seguridad y evita bloqueos                  |
| Configurar DNS correctamente   | Asegura visibilidad y funcionamiento en todo el mundo |
| Optimizar imágenes             | Reduce tiempos de carga y consumo de datos            |
| Usar lazy loading              | Mejora la experiencia de usuario                      |
| Minificar y comprimir archivos | Reduce peso y mejora velocidad de carga               |

## Próximos pasos

Has llegado al final de una parte crucial del ciclo de desarrollo web: poner tu sitio en línea, **de forma segura, optimizada y profesional**.

> A partir de aquí, puedes explorar herramientas avanzadas como:
>
> - **Auditorías con Lighthouse**
> - **Monitorización de errores en tiempo real**
> - **Pruebas automáticas de rendimiento**
> - **Automatización de despliegues (CI/CD)**
