# ¿Qué es la Arquitectura Cliente-Servidor?

La arquitectura cliente-servidor es un modelo de diseño de software en el que las tareas se distribuyen entre los proveedores de un recurso o servicio, llamados **servidores**, y los demandantes, llamados **clientes**.

En esencia, es una relación de **petición-respuesta**.

### Los Dos Componentes Fundamentales

1.  **Cliente**

    - **Qué es:** Un programa o dispositivo que solicita un servicio o recurso a otro programa.
    - **Función:** Inicia la comunicación, envía una **petición** y espera una **respuesta**.
    - **Ejemplos:**
      - Un navegador web (Google Chrome, Firefox).
      - Una aplicación móvil (Instagram, Gmail).
      - Un programa de escritorio (Spotify, Outlook).

2.  **Servidor**
    - **Qué es:** Un programa o computadora potente (física o virtual) que posee los recursos y provee servicios.
    - **Función:** Espera pasivamente las peticiones de los clientes, las procesa y les envía una respuesta.
    - **Ejemplos:**
      - Un **servidor web** (Apache, Nginx) que entrega páginas HTML.
      - Un **servidor de base de datos** (MySQL, PostgreSQL) que gestiona y devuelve datos.
      - Un **servidor de archivos** que proporciona acceso a documentos.

### Cómo Funciona el Proceso: El Ciclo de Petición-Respuesta

El proceso sigue siempre una secuencia lógica y predecible:

1.  **Petición (Request):** El cliente necesita algo. Por ejemplo, cuando un usuario escribe `www.ejemplo.com` en el navegador, este (el cliente) envía una petición HTTP al servidor que aloja esa página web.

2.  **Procesamiento:** El servidor recibe la petición. Internamente, puede realizar diversas acciones para cumplirla: consultar una base de datos, ejecutar lógica de negocio, recuperar un archivo, etc.

3.  **Respuesta (Response):** Una vez procesada la petición, el servidor envía los datos solicitados de vuelta al cliente. En el ejemplo, el servidor respondería con el código HTML, CSS y JavaScript de la página web.

4.  **Renderizado/Visualización:** El cliente (el navegador) recibe la respuesta y la interpreta para presentársela al usuario final (mostrando la página web en pantalla).

### Ejemplos Reales y Concretos

- **Navegación Web:**

  - **Cliente:** Navegador.
  - **Petición:** "Dame la página de inicio de Google".
  - **Servidor:** Servidores de Google.
  - **Respuesta:** El código HTML de la página de Google.

- **Consulta en un Buscador:**

  - **Cliente:** Navegador.
  - **Petición:** "Busca 'arquitectura cliente-servidor'".
  - **Servidor:** Servidores del buscador.
  - **Procesamiento:** El servidor consulta su índice de búsqueda.
  - **Respuesta:** Una lista de resultados en formato HTML/JSON.

- **Aplicación de Banca Móvil:**
  - **Cliente:** App del banco en tu teléfono.
  - **Petición:** "Muéstrame mi saldo actual" (con credenciales de acceso).
  - **Servidor:** Servidores del banco.
  - **Procesamiento:** El servidor verifica la identidad y consulta la base de datos de cuentas.
  - **Respuesta:** Los datos del saldo, que la app muestra en pantalla.

### Variantes del modelo cliente-servidor

El modelo cliente-servidor tradicional sigue siendo la base de la web moderna, pero hoy existen variantes que adaptan esta idea a distintas necesidades tecnológicas.

**Cliente ligero**

El cliente solo muestra la interfaz y envía peticiones simples. Toda la lógica se ejecuta en el servidor.

Ejemplo típico: sitios web tradicionales generados desde el servidor (PHP, Django, Laravel, Ruby on Rails).

Ventajas: simplicidad, seguridad centralizada, fácil mantenimiento.

Limitaciones: menos interactividad avanzada en la interfaz.

**Cliente pesado (SPA)**

En este modelo, el navegador ejecuta gran parte de la lógica de la aplicación. El servidor expone una API y el cliente consume datos para renderizar la interfaz dinámicamente.

Ejemplos: aplicaciones desarrolladas con React, Vue o Angular.

Ventajas: experiencia fluida, interfaz rica, actualizaciones rápidas.

Limitaciones: más complejidad en el frontend, mayor responsabilidad de seguridad en el cliente.

**Arquitecturas distribuidas y microservicios**

La lógica se reparte en varios servicios independientes que colaboran entre sí. El cliente sigue haciendo peticiones, pero ya no existe un único servidor central para todo.

Usado en grandes sistemas donde se requiere alta disponibilidad, aislamiento de fallos y escalabilidad modular.

**Servidor en el Edge y Serverless**

Algunas aplicaciones distribuyen funciones más cerca del usuario para reducir latencia. En estos casos no hay un servidor “central” tradicional, sino múltiples puntos de ejecución en red.

La idea sigue siendo la misma: el cliente solicita servicios, pero la infraestructura es más distribuida y automatizada.

### Concepto de estado y escalabilidad

Un aspecto clave al diseñar sistemas cliente-servidor modernos es cómo se gestiona el estado y cómo escalan bajo carga.

**Servidores con estado (stateful)**

El servidor recuerda información sobre el usuario mientras dura la sesión.

Ejemplo: sesiones de login almacenadas en memoria del servidor.

Ventajas: gestión directa del usuario, lógica sencilla.

Limitaciones: requiere que el usuario vuelva al mismo servidor, difícil escalado horizontal.

**Servidores sin estado (stateless)**

El servidor no almacena información sobre la sesión. Cada petición envía los datos necesarios para validarla. Esto permite que cualquier servidor pueda atenderla.

Ejemplo: sistemas basados en tokens JWT.

Ventajas: escalado horizontal sencillo, alta resiliencia.

Limitaciones: requiere un diseño cuidadoso del intercambio de datos y seguridad.

**Escalabilidad vertical vs horizontal**

- Escalado vertical: aumentar recursos del mismo servidor (más memoria, más CPU). Es simple, pero tiene límites físicos y económicos.
- Escalado horizontal: añadir más servidores para repartir la carga. Es la estrategia utilizada por sistemas modernos, exige coordinación y mecanismos como balanceadores de carga y sincronización de datos.

**Implicaciones prácticas**

Cuando el servidor mantiene estado, escalar se vuelve complejo porque las sesiones y datos deben estar sincronizados o compartidos.

Cuando el servidor es stateless, escalar es más directo: basta con añadir instancias.

Por esta razón, las APIs modernas siguen el principio de ser stateless para facilitar crecimiento, redundancia y fiabilidad.

### Resumen Técnico

La arquitectura cliente-servidor se caracteriza por:

- **Separación de responsabilidades:** El cliente se ocupa de la interfaz de usuario y de solicitar datos. El servidor se ocupa de la gestión de datos, la lógica central y la seguridad.
- **Comunicación por red:** La interacción se produce a través de una red, generalmente utilizando protocolos estandarizados como HTTP, TCP/IP.
- **El servidor es centralizado:** Múltiples clientes pueden conectarse y solicitar servicios a un mismo servidor.
- **El cliente inicia la comunicación:** El servidor es pasivo y solo responde cuando recibe una petición.

Este modelo es la base de la gran mayoría de las aplicaciones web y servicios que se utilizan en Internet.
