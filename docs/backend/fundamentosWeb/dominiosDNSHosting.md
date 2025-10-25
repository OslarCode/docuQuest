# Dominios, DNS y Hosting

## ¿Qué es un dominio?

Un **dominio** es el **nombre legible** que usamos para acceder a una web en lugar de escribir una dirección IP.

Ejemplo real:

- IP del servidor: `93.184.216.34`
- Dominio equivalente: `example.com`

Así, en lugar de escribir una serie de números, simplemente accedemos por nombre.

### Nombre de dominio vs Dirección IP

| Concepto          | ¿Qué es?                                                   | Ejemplo         |
| ----------------- | ---------------------------------------------------------- | --------------- |
| Dirección IP      | Dirección numérica del servidor donde está alojada una web | `93.184.216.34` |
| Nombre de dominio | Nombre fácil de recordar que apunta a esa IP               | `example.com`   |

El dominio es como el **nombre de un contacto**, y la IP es como su **número de teléfono**.

## Estructura de un dominio

Un dominio tiene varias partes. Por ejemplo:

```
www.miweb.informativa.es

```

Lo descomponemos así:

| Parte         | Qué significa                                               |
| ------------- | ----------------------------------------------------------- |
| `.es`         | TLD (Top-Level Domain) → dominio de nivel superior          |
| `informativa` | SLD (Second-Level Domain) → nombre principal registrado     |
| `miweb`       | Subdominio                                                  |
| `www`         | Subdominio de tercer nivel (opcional, tradicionalmente web) |

### TLD (Top-Level Domain)

- Es la **extensión del dominio**.
- Hay dos tipos:
  - **Genéricos (gTLD):** `.com`, `.net`, `.org`, `.info`, `.xyz`...
  - **Territoriales (ccTLD):** `.es`, `.fr`, `.ar`, `.mx`, `.de`...

Ejemplos:

- `google.com` (gTLD)
- `gob.es` (ccTLD de España)

### SLD (Second-Level Domain)

- Es el nombre **real** que tú registras como marca o proyecto.
- En `openai.com`, el SLD es `openai`.

### Subdominios

- Son **divisiones o secciones** de un dominio.
- Te permiten crear zonas distintas del sitio sin comprar otro dominio.

Ejemplos:

- `blog.miweb.com`
- `tienda.ejemplo.net`
- `api.spotify.com`

## ¿Cómo se registra un dominio?

Para tener un dominio propio, debes **registrarlo** a tu nombre o empresa.

### ¿Dónde?

- En empresas llamadas **registradores de dominios**.
- Ejemplos: [Namecheap](https://namecheap.com/), [GoDaddy](https://godaddy.com/), [Google Domains](https://domains.google/), [DonDominio](https://dondominio.com/), etc.

### ¿Cómo funciona el registro?

1. Buscas si el dominio está disponible (`midominio.com`)
2. Si está libre, puedes **registrarlo por 1 año o más** (pagando una cuota anual)
3. El dominio se **asocia a tus datos personales o empresa**
4. Puedes modificar sus **registros DNS** para apuntarlo a tu hosting

### WHOIS: consulta de propietarios

El sistema **WHOIS** te permite saber **quién es el propietario de un dominio** (a menos que use protección de privacidad).

🔍 Prueba en:

[https://who.is](https://who.is/) o [https://lookup.icann.org](https://lookup.icann.org/)

### ICANN: el regulador de dominios

**ICANN** (Internet Corporation for Assigned Names and Numbers):

- Es una **organización sin ánimo de lucro**
- Gestiona la asignación de nombres de dominio y direcciones IP
- Supervisa a los **registradores oficiales**

No puedes registrar dominios directamente con ICANN, solo a través de registradores acreditados.

## Resumen

| Término      | Definición                                             |
| ------------ | ------------------------------------------------------ |
| Dominio      | Nombre fácil que sustituye a una IP                    |
| Dirección IP | Dirección numérica de un servidor                      |
| TLD          | Extensión final del dominio (`.com`, `.es`, etc.)      |
| SLD          | Nombre principal del dominio (`miweb`, `google`, etc.) |
| Subdominio   | División del dominio (`blog.`, `tienda.`, `api.`)      |
| Registrador  | Empresa donde puedes comprar un dominio                |
| WHOIS        | Sistema para consultar propietarios de dominios        |
| ICANN        | Organización que regula dominios e IPs                 |

## Hosting y servidores web

### ¿Qué es un hosting?

Un **hosting** (o alojamiento web) es un **servicio que te alquila espacio en un servidor conectado a Internet** para que puedas **subir tu sitio web** y que esté disponible para todo el mundo 24/7.

**Ejemplo práctico:**

Piensa en el hosting como **un terreno en Internet** donde vas a construir tu casa (tu web). El dominio es la **dirección postal** de esa casa.

## Tipos de hosting

Hay diferentes tipos de hosting según **el tamaño, la potencia, el precio y el nivel de control** que necesites.

### 1. **Hosting compartido**

- **Barato y sencillo**
- Tu web **comparte recursos** (RAM, CPU, ancho de banda) con otras webs
- Ideal para webs pequeñas o personales

🔍 Ejemplo: una tienda básica, un blog, un portfolio

Ventajas:

- Económico
- Fácil de usar (panel tipo cPanel)

Desventajas:

- Lentitud si otras webs consumen muchos recursos
- Poca personalización

### 2. **VPS (Servidor Privado Virtual)**

- Una máquina virtual dentro de un servidor físico
- **Más control y recursos dedicados**
- Ideal para desarrolladores o proyectos medianos

🔍 Ejemplo: web con tráfico moderado + base de datos

Ventajas:

- Más potencia
- Acceso root (control total)

Desventajas:

- Requiere conocimientos técnicos
- Más caro que el compartido

### 3. **Servidor dedicado**

- Tienes **un servidor físico entero solo para ti**
- Máximo control, alto rendimiento
- Para grandes empresas o proyectos con mucho tráfico

Ejemplo: eCommerce tipo Amazon, plataformas de streaming

Ventajas:

- Todo el rendimiento es tuyo
- Muy seguro

Desventajas:

- Muy caro
- Necesitas saber administración de servidores

### 4. **Hosting en la nube (Cloud)**

- Tu web **no depende de un solo servidor**, sino de **una red de servidores**
- Escalable, muy confiable y rápido

🔍 Ejemplo: Google Cloud, AWS, Vercel, Netlify, Heroku

Ventajas:

- Se adapta al tráfico automáticamente
- Escalable, rápido, seguro

Desventajas:

- Costes variables (según uso)
- Puede ser complejo al principio

### **Selección del Proveedor de Hosting**

La elección de un proveedor de hosting es una de las decisiones más importantes en la publicación de una página web. Los proveedores de hosting ofrecen servicios que permiten que los sitios web sean accesibles en Internet. Estos servicios incluyen servidores físicos o virtuales, almacenamiento, ancho de banda y soporte técnico.

Es crucial seleccionar un proveedor de hosting que ofrezca un buen equilibrio entre rendimiento, fiabilidad y costo. Además, es importante considerar aspectos como la escalabilidad, la seguridad, el soporte técnico y la ubicación de los servidores, ya que estos factores pueden afectar significativamente la experiencia del usuario y el posicionamiento en motores de búsqueda.

## Relación entre dominio y hosting

Para que una web funcione necesitas **ambas cosas**:

| Dominio                           | Hosting                               |
| --------------------------------- | ------------------------------------- |
| Es la dirección                   | Es el lugar donde está la web         |
| Se registra aparte                | Se contrata con un proveedor          |
| Se apunta al hosting mediante DNS | Alberga los archivos reales del sitio |

💡 Cuando compras un dominio, debes **apuntarlo al hosting** modificando los **registros DNS**, que veremos en el siguiente módulo.

## ¿Qué es un servidor web?

Un **servidor web** es el **software que recibe las peticiones HTTP** y responde con contenido (HTML, CSS, JS, imágenes, etc.).

### Los más comunes:

### Apache

- Muy usado, **flexible y estable**
- Se configura con archivos `.htaccess`
- Ideal para proyectos PHP (WordPress, Laravel...)

Ejemplo: muchos hostings compartidos usan Apache

### Nginx (se pronuncia “Engine-X”)

- **Rápido y eficiente**, ideal para alto tráfico
- Usa menos memoria
- Se usa mucho en sitios modernos, APIs, Node.js, React...

Ejemplo: Netflix, Dropbox, WordPress.com usan Nginx

### Otros servidores:

- **LiteSpeed** (rápido, compatible con Apache)
- **Caddy** (sencillo, con HTTPS automático)
- **Node.js** también se puede usar como servidor (Express.js)

## Resumen

| Concepto           | Qué significa                                                 |
| ------------------ | ------------------------------------------------------------- |
| Hosting            | Servicio que aloja tu web en un servidor conectado a Internet |
| Hosting compartido | Varias webs en el mismo servidor                              |
| VPS                | Servidor virtual con más control y recursos                   |
| Servidor dedicado  | Servidor físico exclusivo                                     |
| Cloud hosting      | Alojamiento en la nube, escalable                             |
| Dominio + hosting  | El dominio apunta al hosting mediante registros DNS           |
| Servidor web       | Software que entrega la web al navegador (Apache, Nginx...)   |

## DNS (Domain Name System)

### ¿Qué es el DNS?

DNS significa **Domain Name System** y es como **la guía telefónica de Internet**.

**Función principal:**

Convertir nombres de dominio fáciles de recordar (como `google.com`) en direcciones IP que las computadoras entienden (como `142.250.186.206`).

**Ejemplo real:**

Cuando escribes `facebook.com`, tu navegador no entiende ese texto. El sistema DNS lo convierte en una dirección IP para poder conectarse al servidor correcto.

## ¿Cómo funciona el proceso de resolución de nombres?

Vamos a explicarlo paso a paso con un ejemplo:

Supón que visitas `www.ejemplo.com`.

### Paso a paso:

1. **Consulta caché local** (tu navegador o sistema operativo guarda la IP si ya la usaste antes).
2. Si no la encuentra, consulta tu **servidor DNS configurado** (por tu ISP o uno público como `8.8.8.8` de Google).
3. Ese servidor DNS pregunta a los **servidores raíz**:

   > “¿Dónde están los servidores del TLD .com?”

4. Luego pregunta a los **servidores del TLD** (`.com`):

   > “¿Dónde están los DNS autorizados para ejemplo.com?”

5. Por fin, contacta a los **servidores de nombres de `ejemplo.com`**, que le devuelven la IP final.
6. Tu navegador se conecta a esa IP y carga la web.

Este proceso suele tardar **menos de 1 segundo** gracias al uso de **cachés**.

## Tipos de registros DNS

En los DNS se usan diferentes tipos de **registros** para manejar diferentes funciones:

### `A` (Address)

- Apunta un dominio a una dirección IPv4.

Ejemplo:

```
ejemplo.com → 93.184.216.34

```

### `AAAA`

- Igual que `A`, pero para direcciones IPv6.

### `CNAME` (Canonical Name)

- Apunta un dominio **a otro dominio**, no a una IP.

Ejemplo:

```
www.ejemplo.com → ejemplo.com

```

(Se usa para redirigir subdominios)

### `MX` (Mail Exchange)

- Define **los servidores de correo electrónico** de ese dominio.

Ejemplo:

```
ejemplo.com → mail.servidorcorreo.com (prioridad 10)

```

### `TXT`

- Registro de texto. Se usa para:
  - Verificaciones de propiedad (Google, Microsoft...)
  - Seguridad del correo (SPF, DKIM, DMARC)

🔍 Ejemplo:

```
"v=spf1 include:_spf.google.com ~all"

```

### `NS` (Name Server)

- Define **qué servidores DNS son responsables** del dominio.

🔍 Ejemplo:

```
ejemplo.com → ns1.dondominio.com, ns2.dondominio.com

```

## ¿Qué es el TTL?

**TTL** = Time To Live

Indica **cuánto tiempo puede almacenarse la información DNS en caché** antes de actualizarla.

Ejemplo:

TTL = 3600 segundos → la IP de ese dominio se guarda por **1 hora** en caché.

### ¿Para qué sirve?

- Evita hacer consultas DNS cada vez (más rápido).
- Si haces cambios (como cambiar de hosting), puede que tarde un poco en “propagarse”.

##¿Qué significa “propagar un dominio”?

Cuando cambias los DNS de tu dominio o alguno de sus registros, ese cambio **tarda un tiempo en actualizarse globalmente**.

Este proceso se llama **propagación DNS**, y puede durar desde **unos minutos hasta 48 horas**, dependiendo del TTL anterior y las zonas del mundo.

Mientras se propaga:

- Algunos usuarios verán la versión antigua.
- Otros ya verán la nueva.

## Resumen

| Concepto              | Explicación                                                   |
| --------------------- | ------------------------------------------------------------- |
| DNS                   | Sistema que convierte nombres de dominio en IPs               |
| Proceso de resolución | Serie de pasos desde el dominio hasta la IP final             |
| Registros `A`         | Apuntan a IPs IPv4                                            |
| Registros `CNAME`     | Apuntan a otros dominios                                      |
| Registros `MX`        | Configuran servidores de correo                               |
| Registros `TXT`       | Información adicional (verificaciones, seguridad)             |
| Registros `NS`        | Qué DNS gestionan el dominio                                  |
| TTL                   | Tiempo que se guarda la info DNS en caché                     |
| Propagación DNS       | Tiempo que tarda en reflejarse un cambio DNS en todo el mundo |
