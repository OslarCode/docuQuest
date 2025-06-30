# Fundamentos de Internet y la web

## 🌐 Módulo 1: ¿Qué es Internet y cómo funciona?

### 📌 ¿Qué es Internet?

**Internet es una red gigante de computadoras conectadas entre sí.**

Imagina que cada computadora es como una casa en una ciudad, y que todas esas casas están conectadas por carreteras. Esa “carretera” es lo que llamamos Internet. Gracias a ella, puedes enviar mensajes, ver vídeos, cargar webs o jugar online con gente del otro lado del mundo.

### 📌 ¿Y cómo están conectadas esas computadoras?

A través de **cables, satélites, redes móviles, antenas WiFi, routers y servidores**. Toda esa infraestructura es lo que permite que un dato que tú envías llegue a otro lugar del mundo en segundos.

## 🧠 Red de redes: Entendiendo TCP/IP de forma sencilla

### 🌐 ¿Qué significa que Internet es una “red de redes”?

Cuando decimos que **Internet es una red de redes**, nos referimos a que no existe un único lugar o servidor central que controle todo. En realidad, hay **millones de redes diferentes** (hogares, empresas, universidades, centros de datos, etc.) **interconectadas entre sí**.

Y para que todas estas redes puedan “hablar” el mismo idioma, necesitan **reglas comunes**. A estas reglas les llamamos **protocolos de comunicación**.

El conjunto de protocolos más importante se llama **TCP/IP**.

### 🗣️ Analogia útil: TCP/IP como el idioma común del mundo digital

Imagina que estás en un aeropuerto internacional. Cada pasajero viene de un país distinto, pero todos pueden entenderse gracias al **inglés como idioma común**. En Internet, **TCP/IP es ese idioma común**. Sin él, las computadoras no sabrían cómo enviarse mensajes.

## 🔌 ¿Qué es TCP/IP y cómo funciona?

### 📦 Explicación sencilla

**TCP/IP** es un **modelo de comunicación por capas**. Significa que, cuando envías o recibes algo por Internet (como una página web, un video o un correo), ese dato se **prepara, transporta, entrega y muestra** siguiendo una serie de pasos organizados en niveles. Cada capa cumple una misión específica.

> 💡 Piensa en TCP/IP como una empresa de mensajería internacional:
> 
> 1. Alguien prepara un paquete (capa de aplicación),
> 2. Lo etiqueta con la dirección de envío (capa de Internet),
> 3. Se asegura que viaje seguro y completo (capa de transporte),
> 4. Y lo lleva por la carretera adecuada (capa de enlace).

### 🧱 Las 4 capas del modelo TCP/IP explicadas con ejemplos

| 🧩 Capa | 🔧 Qué hace | 🎯 Ejemplo real |
| --- | --- | --- |
| **1. Capa de enlace (Enlace de datos)** | Se encarga de la conexión física entre dispositivos. Puede ser por cable Ethernet, WiFi, fibra, etc. | Cuando conectas el cable de red o te unes a una red WiFi. Es la carretera por donde circularán los datos. |
| **2. Capa de Internet** | Encargada de poner “direcciones” a los paquetes. Usa las famosas **IP** para que cada dato sepa a dónde ir. | Es como escribir la dirección del destinatario en un paquete postal. Ejemplo: enviar datos a `142.250.184.206` (Google). |
| **3. Capa de transporte** | Asegura que los paquetes lleguen bien, completos y en orden. Usa protocolos como **TCP** o **UDP**. | Como un repartidor que te entrega los paquetes uno a uno, en orden, y se asegura de que no falte ninguno. Si algo falla, lo reenvía. |
| **4. Capa de aplicación** | Es la parte visible para ti. Aquí están protocolos como **HTTP**, **FTP**, **SMTP** (correo), etc. | Tu navegador usando HTTP para ver una web, tu app de correo enviando un mensaje o una app descargando un archivo. |

### 🧠 ¿Por qué se llama TCP/IP?

Porque **TCP (Transmission Control Protocol)** e **IP (Internet Protocol)** son los **dos pilares fundamentales** del modelo.

### 🔹 IP (Internet Protocol)

- Es como una dirección postal.
- **Identifica dispositivos únicos** en Internet (como `192.168.1.100` o `2001:db8::1`).
- Se encarga de **dirigir los datos al destino correcto**.

### 🔹 TCP (Transmission Control Protocol)

- Es como un repartidor eficiente.
- Se asegura de que **los datos lleguen completos, sin errores y en el orden correcto**.
- Si un paquete se pierde, lo vuelve a pedir.

> 🔍 Diferencia clave:
> 
> - **TCP** es lento pero confiable. Ideal para cargar una web o enviar un correo.
> - **UDP** es rápido pero no garantiza entrega. Ideal para llamadas, videojuegos online, streaming.

### 🌐 Ejemplo real completo

**¿Qué ocurre cuando visitas `https://www.wikipedia.org` desde tu navegador?**

1. Tu navegador usa **HTTP** (capa de aplicación) para pedir la página.
2. HTTP trabaja sobre **TCP**, que dividirá la solicitud en paquetes y controlará que lleguen correctamente.
3. Cada paquete será direccionado con una **IP** (capa de Internet) para que sepa a dónde ir: por ejemplo, al servidor de Wikipedia.
4. Los paquetes viajarán físicamente a través de tu red local, router, cables, antenas, etc. (**capa de enlace**).
5. El servidor de Wikipedia responderá repitiendo el proceso al revés.

### 📚 ¿Y qué pasa si algo se pierde por el camino?

Aquí entra en juego **TCP**. Este protocolo **detecta pérdidas o errores**, y **reenvía automáticamente los paquetes faltantes**.

> 📦 Es como si envías un puzzle por correo, y el destinatario nota que falta una pieza. TCP se encarga de pedir que esa pieza se envíe de nuevo.
> 

## ✅ Resumen

- **Internet no es una única red**, sino un sistema gigante compuesto por millones de redes interconectadas.
- Para que todo funcione, las computadoras usan un conjunto de reglas llamado **modelo TCP/IP**.
- Este modelo se organiza en **capas**, donde cada una cumple un rol específico: desde la transmisión física hasta lo que ves en pantalla.
- Comprender TCP/IP es como entender el sistema postal digital del mundo: **todo lo que haces en Internet pasa por ahí.**

## 🧭 ¿Y qué sucede una vez que los dispositivos “hablan” entre sí?

Ahora que ya sabes **cómo las computadoras se comunican usando el modelo TCP/IP**, es momento de entender **qué es lo que realmente se envía por esa red**.

Porque no se transmiten archivos enteros o sitios web completos de una sola vez, sino que **la información se fragmenta en pequeños bloques llamados paquetes**.

Estos paquetes son como los “vehículos” que viajan por las carreteras digitales que conecta a tu dispositivo con el resto del mundo.

Veamos qué contiene cada uno de esos paquetes, cómo se preparan, y qué camino siguen para llegar a su destino.

## 📦 ¿Qué es un paquete de datos?

Cuando accedes a una página web, como por ejemplo YouTube, **no estás descargando todo el contenido de una sola vez**. En lugar de eso, la información se **divide en pequeñas unidades llamadas “paquetes de datos”**, que viajan por Internet de forma independiente.

### 🧁 Ejemplo real:

Imagina que ves un vídeo en YouTube. El vídeo completo **no se descarga de golpe**, sino que se divide en **muchas partes pequeñas**. Cada una de esas partes es un paquete. Es como si el vídeo fuera un gran pastel, y YouTube te lo enviara **en trozos pequeños, uno tras otro**.

### 📦 ¿Qué contiene un paquete?

Cada paquete de datos incluye al menos tres elementos fundamentales:

- 📤 **Dirección de origen**: el dispositivo que envía el paquete (ej. el servidor de YouTube).
- 📥 **Dirección de destino**: a quién va dirigido (ej. tu PC o móvil).
- 🔢 **Número de secuencia**: indica qué parte del contenido representa (ej. trozo 7 de 200).

Además, puede contener otra información como el tipo de datos, comprobación de errores y más, dependiendo del protocolo (por ejemplo, TCP).

> 💡 Metáfora ampliada:
> 
> 
> Es como enviar un pastel por correo, pero partido en cajas numeradas. Cada caja lleva una parte del pastel, una etiqueta de quién la envió y a dónde va. Al llegar a destino, las cajas se ordenan y el pastel se reconstruye automáticamente.
> 

## 🔄 ¿Cómo viajan los datos por Internet?

### 🛣️ Analogía principal: viaje en carretera

Los datos **no viajan en línea recta ni en un único camino**. El recorrido es similar al de un coche viajando por una red de autopistas: pasa por cruces, peajes y desvíos hasta llegar a destino. Lo mismo hacen los paquetes por las **redes informáticas**.

### 🧭 Ruta simplificada de un paquete de datos:

1. **Tú escribes una URL** (ej. `google.com`) en tu navegador.
2. Tu navegador genera una petición HTTP y la envía al **router doméstico**.
3. El router la pasa a tu **Proveedor de Internet (ISP)**.
4. El ISP la redirige a través de **routers intermedios** (nodos de la red mundial).
5. Finalmente, llega al **servidor** que aloja el contenido que pediste (por ejemplo, uno de los servidores de Google).
6. El servidor responde, enviando los paquetes **de vuelta a través de la red**, muchas veces por una ruta distinta (Internet es dinámica).

### 🛜 Ejemplo real:

Cuando accedes a `https://www.google.com`:

- Tu router crea una solicitud y la manda a tu ISP (ej. Movistar).
- Esa solicitud viaja por cables, nodos y centros de datos por Europa.
- Finalmente llega a un servidor de Google, posiblemente en un gran centro de datos en Bélgica, Irlanda o EE.UU.
- El servidor prepara la respuesta en forma de paquetes, y esos paquetes **viajan de vuelta hasta ti**.

> 🔍 Dato curioso: Aunque tú solo ves “Google carga al instante”, en realidad tu solicitud puede haber dado la vuelta al mundo en milisegundos.
> 

## 🚛 ¿Quién participa en este viaje digital?

Hay **tres actores principales** que hacen posible el envío y recepción de paquetes por Internet:

| 🔧 Elemento | 🎯 Función | 📍 Ubicación habitual |
| --- | --- | --- |
| **Router** | Dirige el tráfico entre redes (tu casa ↔ Internet). Decide por dónde enviar cada paquete. | En tu casa, en tu empresa, en el proveedor de Internet. |
| **Switch** | Conecta varios dispositivos dentro de una misma red local (LAN). No se comunica con Internet directamente. | Oficinas, escuelas, hogares con red cableada. |
| **Servidor** | Es donde vive la web o el servicio. Responde a tus peticiones con paquetes de datos. | Centros de datos de empresas como Google, Amazon, Microsoft, etc. |

### 🔄 Ejemplo real de ida y vuelta

Supongamos que estás viendo un video en YouTube:

1. Tu navegador pide el video (petición HTTP).
2. Esa solicitud va desde tu móvil → router → ISP → red mundial → servidor de YouTube.
3. El servidor de YouTube **responde con cientos de paquetes de video** codificados.
4. Esos paquetes pasan por **routers, switches, nodos y cables** hasta llegar a tu router.
5. Tu navegador los **reconstruye, ordena y muestra** en pantalla el video en tiempo real.

> 📶 Importante: Si alguno de esos paquetes se pierde o llega mal, protocolos como TCP se encargan de pedirlos de nuevo. Si es video en directo o juegos, se usa UDP, que prioriza velocidad sobre precisión.
> 

## 🚦 ¿Qué pasa si hay congestión o cortes?

Internet no siempre elige el camino más corto, sino el más disponible en ese momento. Si hay congestión o un nodo falla:

- Los **routers buscan otra ruta** automáticamente.
- Así se mantiene la comunicación, aunque sea por un camino más largo.

> 💡 Piensa en Google Maps: Si una calle está cortada, el GPS recalcula la ruta. Los paquetes de datos hacen lo mismo.
> 

## ✅ Conclusión del bloque

- Los **paquetes de datos** son la unidad básica de comunicación en Internet.
- Cada paquete **viaja por caminos distintos**, como si fueran cartas enviadas por correo postal digital.
- Gracias a routers, switches y servidores, los datos van y vuelven en milésimas de segundo.
- Entender este proceso es esencial para comprender cómo funciona Internet y por qué a veces algo **tarda, falla o se corta**.

## 🧭 ¿Y cómo saben los paquetes a dónde ir?

Ahora que ya entiendes **qué es un paquete de datos y cómo viaja por Internet**, surge una nueva pregunta clave:

👉 **¿Cómo sabe ese paquete cuál es su destino? ¿Y cómo llega de vuelta la respuesta a tu dispositivo?**

La respuesta está en algo fundamental llamado **dirección IP**.

Sin direcciones IP, los paquetes no tendrían idea de a dónde ir —sería como enviar una carta sin dirección postal.

## 🌍 Direcciones IP: el GPS de Internet

### 🌐 ¿Qué es una dirección IP y para qué sirve?

Una **dirección IP (Internet Protocol)** es como la **dirección única de cada casa en Internet**.

Identifica a cada dispositivo conectado: ya sea tu PC, tu móvil, tu Smart TV o un servidor en la nube.

Gracias a estas direcciones:

- Los paquetes **saben a dónde ir** (destino),
- Y los servidores **saben de dónde vienen** (origen), para poder responder.

### 🧩 Ejemplo real:

Cuando escribes `https://google.com` en el navegador:

1. Tu navegador consulta un sistema llamado **DNS** para traducir ese nombre a una dirección IP (por ejemplo: `142.250.184.206`).
2. Esa IP pertenece a un **servidor de Google**.
3. Tu dispositivo se conecta a ese servidor usando la IP, no el nombre.
4. Google responde a tu dirección IP pública con los datos que pediste.

> 💡 Analogía: Es como pedir una pizza. Tu nombre no importa: el repartidor necesita tu dirección exacta para entregártela.
> 

## 🔢 Tipos de direcciones IP: IPv4 vs IPv6

### 📍 IPv4

- Es la versión **más antigua y común**.
- Tiene 4 bloques de números (ej. `192.168.0.1`).
- Puede generar cerca de **4 mil millones** de combinaciones únicas.
- Pero… ¡ya se están acabando!

### 📍 IPv6

- Es la versión **nueva** y fue creada para resolver el agotamiento de IPv4.
- Tiene un formato más largo (ej. `2001:0db8:85a3::8a2e:0370:7334`).
- Puede generar **billones de billones** de direcciones.
- Es esencial para el futuro del Internet de las cosas (IoT) y la expansión global.

> 🔍 Ejemplo: Tu router puede tener una IP privada como 192.168.1.1 (IPv4) y una IP pública como 2a00:1450:4001:81f::200e (IPv6) al mismo tiempo.
> 

## 🗺️ ¿Quién reparte las direcciones IP?

Las direcciones IP **no se asignan al azar**. Existe una organización jerárquica y global que gestiona su distribución:

### 🌍 Los RIRs (Registros Regionales de Internet)

Son 5 organismos que reparten bloques de IP según regiones del mundo:

| 🌐 RIR | Región que administra |
| --- | --- |
| ARIN | América del Norte |
| RIPE NCC | Europa, Medio Oriente y Asia Central |
| APNIC | Asia y Pacífico |
| LACNIC | América Latina y Caribe |
| AFRINIC | África |

🔄 Estos reparten direcciones a los **proveedores de Internet (ISP)**, gobiernos, universidades y grandes empresas, quienes a su vez las asignan a usuarios y servidores.

## 🏠 IP pública, IP privada y publicación web

### 📡 IP pública

- Es visible desde fuera de tu red.
- Permite que otros puedan **acceder a tu dispositivo o servidor** desde Internet.
- Es necesaria si publicas una web o quieres acceder a un dispositivo desde fuera de casa.

### 🏠 IP privada

- Solo funciona dentro de tu red local (ej. `192.168.x.x`).
- Usada para comunicar tu PC, impresora y móvil dentro de tu hogar o empresa.
- No es accesible desde fuera de Internet.

> 🔍 Ejemplo: Tu portátil tiene una IP privada en casa, pero accede a Google usando la IP pública de tu router, proporcionada por tu ISP.
> 

## 🔄 IP Estática vs. Dinámica

### 📍 IP Estática

- Es **fija**: siempre es la misma.
- Ideal para servidores, cámaras, sistemas de control remoto.
- Te asegura que **tu web o aplicación esté siempre en el mismo sitio**.

> ✅ Ejemplo: Un servidor web con IP 203.0.113.5 estará disponible 24/7 desde cualquier parte del mundo.
> 

### 🔄 IP Dinámica

- **Cambia automáticamente** cada vez que reinicias el router o después de un tiempo.
- Es la opción común en casas.
- No sirve para servicios que requieren ser localizados de forma estable.

> ❌ Ejemplo: Si tu IP cambia de 190.2.1.4 a 190.2.1.9, tu página dejará de ser accesible si no tienes un dominio que lo gestione.
> 

## 🧩 Resumen visual de tipos de IP

| Tipo | ¿Qué es? | Uso principal |
| --- | --- | --- |
| **IPv4** | Dirección clásica (`192.168.1.1`) | Red doméstica, servidores tradicionales |
| **IPv6** | Dirección moderna, extensa | IoT, nuevas redes, expansión mundial |
| **Estática** | No cambia | Servidores, hosting, correo empresarial |
| **Dinámica** | Cambia con el tiempo | Hogares, móviles, acceso temporal |

## ✅ Conclusión del bloque

- **Todas las comunicaciones por Internet necesitan una dirección IP de origen y de destino**.
- Las direcciones IP hacen posible que los paquetes lleguen a su destino y regresen con la respuesta.
- Saber diferenciar entre **IP pública/privada** y **estática/dinámica** es fundamental para quienes desarrollan sitios web o trabajan en redes.
- Con IPv6, el Internet está preparado para un futuro con **más dispositivos conectados que nunca**.

## 🔁 Transición natural desde direcciones IP

Ahora que ya sabes qué es una dirección IP y cómo permite que los paquetes lleguen a su destino, falta un último ingrediente esencial en este proceso:

👉 **¿Qué normas siguen esos paquetes para viajar, llegar completos y ser entendidos correctamente por el destinatario?**

Aquí entran en juego los **protocolos de transporte y control**, que actúan como las reglas de circulación de esta gran autopista digital.

Dependiendo de si se trata de una web, una videollamada o una prueba de conexión, **los paquetes usarán distintos protocolos** según sus necesidades.

## 📡 Protocolos clave: TCP, UDP, ICMP

En Internet, no todos los datos se transmiten de la misma forma.

Dependiendo de si necesitas velocidad, precisión o verificación, se utiliza un protocolo distinto.

Estos protocolos **definen cómo se envían, reciben, corrigen o ignoran los paquetes de datos**.

Veamos los tres más importantes que actúan en la “logística” de la red.

### 📬 TCP (Transmission Control Protocol)

**TCP** es el protocolo más confiable para transportar datos.

- Se asegura de que **todos los paquetes lleguen a su destino**.
- Si uno se pierde, **lo solicita de nuevo**.
- Los paquetes llegan **en el orden correcto**, sin repeticiones ni errores.

> 🛠 ¿Para qué se usa?
> 
> 
> Webs, correos electrónicos, formularios online, descarga de archivos.
> 
> En todos estos casos, **la información debe llegar completa y en orden**.
> 

> 🔍 Ejemplo: Cuando visitas Amazon, necesitas que cada imagen, precio y botón se cargue correctamente. TCP se encarga de que todo llegue bien antes de mostrarlo en pantalla.
> 

### 🏃 UDP (User Datagram Protocol)

**UDP** es un protocolo mucho más rápido, pero **menos estricto**.

- No espera confirmaciones.
- No reenvía datos perdidos.
- A veces llegan paquetes desordenados o se pierden… y no pasa nada.

> 🛠 ¿Para qué se usa?
> 
> 
> Videollamadas, streaming de video/audio, videojuegos online.
> 
> En estos casos, **la prioridad es la velocidad, no la perfección**.
> 

> 🔍 Ejemplo: En una videollamada, si se pierde un fragmento de tu voz, no pasa nada grave. Es mejor seguir adelante que esperar a que llegue un paquete antiguo.
> 

### 📡 ICMP (Internet Control Message Protocol)

**ICMP** no transporta información como TCP o UDP. Su función es diferente:

- Detecta errores o fallos de conexión.
- Sirve para **diagnosticar el estado de la red**.
- Es el protocolo que usa el famoso comando `ping`.

> 🔍 Ejemplo:
> 
> 
> Si haces `ping google.com`, estás enviando un paquete ICMP al servidor de Google.
> 
> Google te responde con el tiempo que tardó en recibirlo.
> 
> Si no responde, puede que esté caído o que haya un problema en tu conexión.
> 

> 💡 Analogia rápida:
> 
> 
> ICMP es como un mensajero que pregunta “¿estás ahí?” y espera una respuesta rápida.
> 
> No lleva contenido, solo **verifica que la otra parte está viva y conectada**.
> 

## ✅ Resumen del módulo

| Protocolo | ¿Qué hace? | Se usa en… |
| --- | --- | --- |
| **TCP** | Envía paquetes **completos y ordenados** | Webs, correo, apps críticas |
| **UDP** | Envía paquetes **rápidos pero sin garantía** | Juegos online, videollamadas |
| **ICMP** | **Verifica y diagnostica** el estado de la red | Pruebas de conexión (`ping`) |

## 🧩 Conclusión de esta sección

- Los **protocolos de transporte y control** son tan importantes como los paquetes o las direcciones IP.
- Sin ellos, los datos podrían perderse, duplicarse o llegar desordenados.
- Saber cuál se usa en cada caso te ayuda a **comprender por qué un sitio carga lento, una videollamada se corta o un servidor no responde**.

## 🔀 Transición desde los protocolos a las redes

Hasta ahora has aprendido cómo los datos viajan a través de Internet: en forma de paquetes, con direcciones IP que indican su destino, y usando **protocolos como TCP o UDP** que deciden cómo se transportan.

Pero… ¿**por dónde viajan físicamente esos datos**? ¿Qué caminos existen, desde tu casa hasta los servidores de todo el mundo?

Aquí es donde entran los diferentes tipos de **redes informáticas**, desde la red local de tu casa hasta las gigantescas infraestructuras globales que componen Internet.

## 🖧 ¿Cómo funciona una red local (LAN)?

### 🏠 ¿Qué es una LAN?

Una **LAN (Local Area Network)** es una red de corto alcance que conecta **dispositivos dentro de una misma ubicación física**, como una casa, oficina o aula.

> 💡 Es como una mini autopista exclusiva para los dispositivos de tu entorno inmediato.
> 
> 
> No necesita salir a Internet para funcionar.
> 

### 🔌 ¿Qué suele incluir una LAN?

- Un **router o módem** (puede tener conexión a Internet).
- Un **switch** para conectar varios dispositivos por cable.
- Dispositivos como **PCs, móviles, Smart TVs, impresoras o consolas**.

> 🔍 Ejemplo real:
> 
> 
> En tu casa, tu portátil y tu móvil comparten archivos usando la LAN, sin pasar por Internet.
> 

### 🧠 Características principales de una LAN:

- Usa **IPs privadas** (como `192.168.1.34`).
- Tiene **alta velocidad local** (100 Mbps o más).
- Puede funcionar **sin necesidad de conexión a Internet**.
- Puede usar **WiFi o cables Ethernet**, o ambos.

## 🖧 Otros tipos de redes (más allá de la LAN)

### 🌍 WAN: Redes de Área Amplia

Una **WAN (Wide Area Network)** conecta **dispositivos o redes LAN que están muy alejadas geográficamente**.

> 💡 Internet es la WAN más grande del mundo.
> 
> 
> Une millones de redes a través de cables submarinos, satélites y centros de datos.
> 

### ✅ Ejemplo:

- Si estás en Argentina y visitas una web alojada en Alemania, estás usando una WAN.
- La información viaja miles de kilómetros por infraestructuras globales.

### 🌐 Relación con la web:

- Gracias a la WAN, **tu sitio web puede ser visitado desde cualquier parte del mundo**.
- Los servicios de hosting y los ISPs dependen de las WAN para mover grandes volúmenes de datos.

### 🏙️ MAN: Redes Metropolitanas

Una **MAN (Metropolitan Area Network)** conecta **varias redes LAN dentro de una misma ciudad o región**.

> 💡 Es como una autopista de datos para instituciones distribuidas en una misma área geográfica.
> 

### ✅ Ejemplo:

- Una universidad con campus en varios barrios que comparten red.
- Empresas con sedes interconectadas en una ciudad.

### 🌐 Relación con la web:

- Facilita el desarrollo y mantenimiento de sitios web en equipos distribuidos.
- Mejora la velocidad de acceso a recursos compartidos entre oficinas.

### 💾 SAN: Redes de Almacenamiento

Una **SAN (Storage Area Network)** es una red interna diseñada **exclusivamente para el almacenamiento de datos**.

> 💡 Es como un almacén de contenido digital conectado por una red muy rápida y privada.
> 

### ✅ Ejemplo:

- Un proveedor de hosting con cientos de webs guarda sus archivos en una SAN.
- Netflix usa SANs para gestionar sus servidores de vídeo.

### 🌐 Relación con la web:

- Permiten que tu sitio cargue más rápido.
- Garantizan disponibilidad constante (24/7) y redundancia de datos.

### 📶 WLAN: Redes Inalámbricas

Una **WLAN (Wireless LAN)** es una red local **sin cables**, que conecta dispositivos mediante Wi-Fi.

> 💡 Es como una LAN, pero con libertad de movimiento.
> 

### ✅ Ejemplo:

- Una oficina donde se trabaja desde portátiles conectados por Wi-Fi.
- Un aula donde los estudiantes suben sus proyectos web sin cables.

### 🌐 Relación con la web:

- Da **movilidad** a los equipos de desarrollo web.
- Ideal para probar webs en diferentes dispositivos en tiempo real.

## 🧩 Resumen visual de los tipos de red

| Tipo de red | Cobertura | Ejemplo real | Relación con la web |
| --- | --- | --- | --- |
| **LAN** | Local | Casa, oficina | Desarrollo local, redes privadas |
| **WAN** | Mundial | Internet, cables submarinos | Acceso global a webs |
| **MAN** | Ciudad | Red de universidades | Trabajo distribuido en una zona |
| **SAN** | Interna | Centro de datos | Almacenamiento rápido y seguro de webs |
| **WLAN** | Local (Wi-Fi) | Oficinas, hogares | Flexibilidad de conexión sin cables |

## ✅ Conclusión de la sección

- No toda la red es igual: hay distintos **tipos de redes** según su tamaño, función y ubicación.
- Saber diferenciar entre **LAN, WAN, MAN, SAN y WLAN** es clave para entender cómo se construyen, acceden y mantienen los sitios web.
- Como desarrollador web, esto te ayuda a elegir **dónde alojar, cómo conectar y cómo trabajar** según el contexto de tu proyecto.

## 🔁 Transición desde tipos de redes a privacidad y seguridad

Ya conoces los principales tipos de redes: desde las **LAN en tu casa** hasta las enormes **WAN globales** que permiten que una web sea accesible desde cualquier parte del mundo.

Pero en este gran sistema interconectado, donde los datos viajan constantemente por caminos compartidos, surge una pregunta clave:

👉 **¿Cómo protegemos nuestra información? ¿Quién puede verla, interceptarla o bloquearla?**

Aquí entran en juego **las herramientas de seguridad, privacidad y control de tráfico**: proxies, VPN, firewalls… y también la infraestructura física que hace posible todo el recorrido digital.

## 🕵️‍♂️ ¿Qué es un proxy y una VPN?

En Internet, los datos pueden ser filtrados, observados o protegidos dependiendo de por dónde y cómo viajan. Las herramientas como **proxy** y **VPN** permiten **modificar el trayecto** de esos datos para mejorar el rendimiento, el anonimato o la seguridad.

### 🧭 Proxy: el intermediario digital

Un **proxy** es un servidor que actúa como **puente o filtro entre tu equipo e Internet**.

> 💡 Piensa en el proxy como un recepcionista que revisa cada solicitud antes de dejarla salir o entrar.
> 

### 🔍 ¿Para qué sirve?

- **Filtrar o bloquear páginas web**, muy común en escuelas o empresas.
- **Ocultar tu IP real**, sustituyéndola por la del servidor proxy.
- **Controlar el acceso a contenido**, útil en entornos corporativos.
- **Almacenar en caché webs visitadas** para cargarlas más rápido después.

### ✅ Ejemplo práctico:

En una oficina, todo el tráfico de los empleados pasa por un proxy. El administrador puede ver qué webs visitan, bloquear ciertos sitios y acelerar otros gracias al almacenamiento en caché.

### 🔐 VPN (Virtual Private Network): el túnel cifrado

Una **VPN** es una tecnología que crea un **túnel seguro y cifrado** entre tu dispositivo y un servidor externo. A partir de ahí, todo tu tráfico parece provenir de ese servidor.

> 💡 Es como enviar tu información dentro de una caja cerrada por un camino alternativo.
> 

### 🔍 ¿Para qué sirve?

- **Navegar de forma privada y segura**, incluso en redes públicas.
- **Evitar bloqueos geográficos**, accediendo a contenido disponible en otras regiones.
- **Proteger tus datos** de posibles espías en WiFi abiertas (cafeterías, aeropuertos).

### ✅ Ejemplo real:

Estás en un aeropuerto con WiFi gratis. Si te conectas a una VPN, todo lo que haces en Internet viaja **cifrado**, aunque alguien esté intentando espiar la red.

## 🧭 ¿Qué son las IP públicas, privadas y dinámicas?

Estas direcciones determinan **quién ve tu equipo en Internet** y cómo puede ser accedido.

### 📡 IP pública

- Es la dirección **visible en Internet**.
- Tu ISP te la asigna, y con ella **te comunicas con el exterior**.
- Ejemplo: `80.32.45.210`

### 🏠 IP privada

- Solo funciona **dentro de tu red local** (LAN).
- No puede ser vista desde fuera.
- Ejemplo: `192.168.1.1` (tu router en casa)

### 🔁 IP dinámica

- Cambia cada cierto tiempo automáticamente.
- Más común en hogares.
- Puede dificultar accesos constantes si no se usa un dominio o DNS.

> 💡 Nota: También existen IP estáticas, que no cambian nunca y son ideales para servidores web o cámaras de seguridad.
> 

## 🔥 ¿Cómo funciona un firewall?

Un **firewall** actúa como un **portero digital** que decide qué tráfico entra o sale de tu dispositivo o red.

> 💡 Imagina un guardia de seguridad que revisa cada vehículo que intenta entrar a un edificio.
> 

### 🛡️ ¿Qué puede hacer un firewall?

- **Bloquear puertos o servicios** sospechosos.
- **Permitir solo tráfico confiable**, como webs seguras (HTTPS).
- **Proteger tu red o dispositivo** de ataques, malware o accesos no deseados.

### ✅ Ejemplo real:

- El firewall de Windows bloquea por defecto conexiones entrantes no autorizadas.
- Una empresa puede usar un firewall para **impedir el acceso a redes sociales** o sitios de descarga.

## 🌍 Infraestructura de Internet (IXPs y cables submarinos)

Ya hemos visto cómo se transportan los datos y qué herramientas los protegen. Pero… ¿**por dónde viajan físicamente**?

### 🔗 IXPs (Internet Exchange Points)

Los **IXPs** son **puntos físicos de interconexión** entre distintos proveedores de Internet (como Movistar, Vodafone o Orange).

> 💡 Imagina una rotonda donde muchas carreteras se cruzan y los coches (paquetes de datos) cambian de vía.
> 

### 🔍 ¿Por qué son importantes?

- Hacen que el tráfico entre redes sea **más rápido y eficiente**.
- Reducen la latencia (tiempo de espera).
- Ahorran costes a los ISPs y mejoran la experiencia del usuario.

### ✅ Ejemplo:

Un cliente de Orange en Madrid accede a Netflix. Si ambos están conectados al IXP local, los datos viajan directamente sin salir del país. Resultado: más velocidad, menos latencia.

### 🌊 Cables submarinos

Más del **95% del tráfico internacional** de Internet **viaja bajo el océano**, por **cables de fibra óptica**.

> 💡 Son como autopistas digitales submarinas que conectan continentes enteros.
> 

### 🔍 ¿Qué hacen?

- Transportan datos entre América, Europa, Asia, África y Oceanía.
- Permiten que una web alojada en EE.UU. cargue en segundos desde España.
- Son gestionados por consorcios de grandes empresas como Google, Amazon, Facebook o gobiernos.

### ✅ Ejemplo real:

El cable **Grace Hopper**, propiedad de Google, conecta Bilbao (España) con EE. UU. y Reino Unido. Transfiere datos a velocidades increíbles con mínima latencia.

## ✅ Resumen del bloque

| Tema | Qué aprendiste |
| --- | --- |
| **Proxy** | Intermediario que filtra, acelera o registra tráfico |
| **VPN** | Túnel cifrado para privacidad y acceso libre |
| **IP pública/privada/dinámica** | Define visibilidad y alcance de los dispositivos |
| **Firewall** | Sistema que protege y filtra accesos a tu red |
| **IXPs** | Puntos donde se conectan proveedores de Internet |
| **Cables submarinos** | Infraestructura global que conecta continentes |

## 📚 LIBROS RECOMENDADOS

### ✅ Conceptos generales de Internet, redes y TCP/IP

1. **“Redes de computadoras” – Andrew S. Tanenbaum & David Wetherall**
    
    🔹 El libro más clásico y completo sobre redes. Explica en detalle TCP/IP, protocolos, arquitectura y seguridad.
    
    🟡 Nivel: Intermedio/avanzado
    
2. **“Cómo funciona Internet” – Preston Gralla (ed. Anaya Multimedia)**
    
    🔹 Libro visual, con explicaciones claras sobre routers, direcciones IP, protocolos, cableado y servicios.
    
    🟢 Nivel: Principiante/intermedio
    
3. **“Internet para todos” – Editorial OpenLibra (PDF libre)**
    
    🔹 Manual básico con ilustraciones y ejemplos reales sobre redes, IPs, privacidad y VPN.
    
    📎 [https://openlibra.com/es/book/internet-para-todos](https://openlibra.com/es/book/internet-para-todos)
    
    🟢 Nivel: Principiante
    

## 🌐 WEBS Y TUTORIALES ONLINE

### 🧠 Redes y protocolos

- **Cisco Networking Academy (gratuito con cuenta)**
    
    [https://skillsforall.com/](https://skillsforall.com/)
    
    🔹 Curso gratuito de “Introducción a redes”. Muy bien explicado, con animaciones y evaluaciones.
    
- **Cloudflare Learning Center**
    
    [https://www.cloudflare.com/learning/](https://www.cloudflare.com/learning/)
    
    🔹 Artículos sencillos sobre TCP/IP, DNS, VPN, firewalls, CDN, seguridad web. Muy didáctico.
    
- **GeeksForGeeks – Computer Networks**
    
    [https://www.geeksforgeeks.org/computer-network-tutorials/](https://www.geeksforgeeks.org/computer-network-tutorials/)
    
    🔹 Explicaciones concisas de protocolos, topologías, redes, modelos OSI y TCP/IP.
    

### 🌍 Infraestructura y funcionamiento de Internet

- **How the Internet Works (Mozilla)**
    
    [https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work)
    
    🔹 Guía interactiva paso a paso: de navegador a servidor.
    
- **SubmarineCableMap (TeleGeography)**
    
    [https://www.submarinecablemap.com/](https://www.submarinecablemap.com/)
    
    🔹 Mapa interactivo de todos los cables submarinos del mundo.
    
- **RIPE NCC Academy – Introducción a IPv6**
    
    [https://academy.ripe.net/](https://academy.ripe.net/)
    
    🔹 Curso gratuito sobre el sistema IPv6 y la transición desde IPv4.
    

## 🎥 VÍDEOS Y CURSOS EN YOUTUBE

### 🔌 Modelo TCP/IP, redes y paquetes de datos

1. **“¿Cómo funciona Internet?” – Píldoras de Ciencia (español, 7 min)**
    
    [https://youtu.be/h3jZzNKpG2o](https://youtu.be/h3jZzNKpG2o)
    
    ✅ Explica el viaje de datos, los paquetes, IPs y servidores.
    
2. **“Modelo OSI y TCP/IP explicado fácil” – Platzi (español, 10 min)**
    
    [https://youtu.be/ci8WPKTuJpU](https://youtu.be/ci8WPKTuJpU)
    
    ✅ Ideal para entender capas, protocolos y analogías.
    
3. **“What is the Internet?” – Code.org (inglés, subtitulado, 6 min)**
    
    [https://youtu.be/Dxcc6ycZ73M](https://youtu.be/Dxcc6ycZ73M)
    
    ✅ Excelente para visualizar cómo viajan los datos y qué papel juegan los routers.
    

### 🔐 VPN, proxy, firewall y privacidad

1. **“¿Qué es una VPN y cómo funciona?” – MuyLinux (español, 9 min)**
    
    [https://youtu.be/_ZvgPiNq5fY](https://youtu.be/_ZvgPiNq5fY)
    
    ✅ Muy claro, con ejemplos cotidianos.
    
2. **“Proxy vs VPN vs Tor – Diferencias explicadas” – TechZone (español, 8 min)**
    
    [https://youtu.be/rlfWgZQ3F28](https://youtu.be/rlfWgZQ3F28)
    
    ✅ Comparación muy visual y sencilla de entender.
    
3. **“Firewall explicado en 5 minutos” – Explicalo Fácil (español, 5 min)**
    
    [https://youtu.be/l1m8F4VYr10](https://youtu.be/l1m8F4VYr10)
    
    ✅ Ideal para entender lo básico de la seguridad perimetral.
    

## 🧩 BONUS INTERACTIVO

- **Packet Tracer (de Cisco – herramienta gratuita)**
    
    [https://www.netacad.com/courses/packet-tracer](https://www.netacad.com/courses/packet-tracer)
    
    🔹 Simulador de redes donde puedes ver cómo se envían paquetes, cómo funciona una LAN, un router, un firewall, etc.