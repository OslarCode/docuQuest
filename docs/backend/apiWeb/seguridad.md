# Seguridad APIs web

### ¿Por qué la seguridad en APIs es tan importante?

Cuando usas una API, básicamente estás dejando abierta una puerta de tu sistema para que otras aplicaciones entren y salgan con datos. Esto puede ser muy útil, pero también arriesgado. Sin medidas de seguridad, cualquiera podría intentar entrar sin permiso, manipular la información o incluso dañar la base de datos.

Para evitarlo, es fundamental usar métodos que verifiquen quién accede, qué puede hacer, y cómo se transmite la información. A esto lo llamamos "asegurar la API".

### Identificar usuarios y limitar accesos

Primero, es importante **verificar quién eres tú** cuando haces una petición a una API. A esto se le llama autenticación. Luego, hay que decidir **qué puedes o no puedes hacer**, lo que se llama autorización.

### Autenticación: ¿quién eres?

- **Contraseña simple (Basic Auth)**: Es como dar usuario y clave, pero codificados. No es muy seguro si no se usa HTTPS.
- **OAuth 2.0**: Es como usar tu cuenta de Google para entrar en una app sin darle tu clave. Se usan “tokens” que duran un tiempo limitado.
- **JWT (JSON Web Tokens)**: Un pequeño archivo codificado que confirma quién eres. Es fácil de validar y transportar.
- **API Keys**: Una clave secreta que identifica a cada app o usuario. Útil, pero menos segura si se filtra.

### Autorización: ¿qué puedes hacer?

- **Roles y permisos**: Como en una empresa, algunos usuarios pueden ver datos, otros pueden cambiarlos.
- **Scopes**: En OAuth, los tokens pueden tener límites claros (por ejemplo: “solo puede ver, no puede editar”).
- **Listas de acceso (ACL)**: Un listado detallado de quién puede acceder a qué partes de la API.

### Cómo proteger los datos mientras viajan

Una vez autenticado y autorizado, lo que transmites también debe estar protegido. Si no, cualquiera podría interceptarlo.

### HTTPS: tu candado de seguridad

Al igual que cuando compras online, HTTPS cifra los datos que van entre tu navegador y el servidor. Así, nadie puede espiar ni modificar lo que estás enviando.

- Para activarlo, necesitas un **certificado digital**.
- Hay que mantenerlo actualizado y configurar bien el servidor (usando opciones como HSTS).

### Datos almacenados también deben protegerse

No solo importa la seguridad en tránsito. Si los datos ya están guardados en una base de datos, también hay que **cifrarlos en reposo**, por si alguien accede indebidamente al disco. Se usan claves privadas para este fin, y es importante gestionarlas con cuidado.

### Defenderse de los ataques más comunes

Las APIs pueden ser blanco de varios trucos maliciosos. Estos son los más conocidos y cómo prevenirlos.

### CSRF (engaño en segundo plano)

Un sitio malicioso puede intentar que, sin saberlo, hagas algo con tu sesión activa en otra web. Para evitarlo, se usan **tokens CSRF**, códigos únicos que solo el servidor y tú conocen.

### XSS (inyección de scripts)

Alguien puede intentar meter código malicioso en una entrada (como un comentario), y que ese código se ejecute cuando otro usuario lo vea. Para prevenirlo:

- Limpia los datos que ingresan.
- Usa políticas de seguridad (CSP) que bloqueen scripts desconocidos.

### SQL Injection (ataque a la base de datos)

Un atacante puede escribir comandos en un formulario para controlar la base de datos. Para evitarlo:

- Nunca juntes directamente datos del usuario con consultas SQL.
- Usa consultas preparadas o parametrizadas.

### ¿Y si otra web quiere usar mi API?

Por defecto, los navegadores bloquean peticiones que vienen de otros sitios web. Pero si tú quieres permitirlo (por ejemplo, desde tu frontend en React), debes configurar **CORS**.

Esto se hace añadiendo ciertos encabezados en las respuestas de tu API, como:

- **Access-Control-Allow-Origin**: qué dominios pueden acceder.
- **Access-Control-Allow-Methods**: qué métodos están permitidos.
- **Access-Control-Allow-Headers**: qué datos pueden incluirse en la petición.
- **Access-Control-Allow-Credentials**: si se permiten cookies o tokens.

Ejemplo real: si usas Node.js con Express, puedes usar el middleware `cors()` para configurar estas opciones fácilmente.

### Reflexión final

Cuidar la seguridad de una API es como poner cerraduras, cámaras y reglas claras en la entrada de un edificio. Si no lo haces, cualquiera puede entrar y hacer daño. Pero si lo haces bien, no solo proteges tu aplicación: también generas confianza en tus usuarios y evitas problemas futuros.

**¿Ya revisaste si tu API tiene estas protecciones activadas? ¿Qué parte podrías mejorar hoy mismo?**
