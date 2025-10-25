# Certificados HTTPs

### **¿Qué son los Certificados SSL/TLS?**

Imagina que quieres enviar una carta confidencial por correo. Un certificado SSL es como un **sobre de seguridad certificado** que garantiza dos cosas: primero, que la carta solo puede ser abierta por el destinatario correcto (el servidor web), y segundo, que el destinatario es realmente quien dice ser (no un impostor).

Los certificados son archivos digitales que vinculan una identidad (como "google.com") con una clave criptográfica pública. Funcionan como pasaportes digitales para sitios web, estableciendo credenciales autenticadas para una conexión segura.

### **El Problema que Resuelven los Certificados**

Sin HTTPS, cuando te conectas a un sitio web, toda la información viaja en **texto plano**. Cualquier persona que intercepte la comunicación (en una WiFi pública, por ejemplo) puede leer tus contraseñas, números de tarjeta de crédito y mensajes personales.

El certificado SSL activa el candado y el protocolo `https://` en tu navegador, creando un **túnel cifrado** seguro para la información sensible.

### **Cómo Funciona el Proceso de Handshake (Saludo)**

Cuando visitas un sitio HTTPS como `https://tu-banco.com`, ocurre una "conversación" instantánea e invisible llamada "SSL handshake":

1. **Hola, soy tu-banco.com** - Tu navegador se conecta al servidor y este envía una copia de su certificado SSL.

2. **¿Eres realmente tú?** - Tu navegador verifica la autenticidad del certificado contra una lista de **Autoridades Certificadoras (CA)** de confianza. Es como si verificaras un pasaporte con una autoridad gubernamental.

3. **Creemos un código secreto** - Si el certificado es válido, tu navegador genera una **clave simétrica** (una contraseña de sesión única) y la envía al servidor, cifrada con la clave pública del certificado.

4. **Conexión segura establecida** - Solo el servidor legítimo, que posee la clave privada correspondiente, puede descifrar ese mensaje y obtener la clave de sesión. A partir de este momento, toda la comunicación se cifra con esa clave temporal.

**Ejemplo Real:** Es como si tú y el servidor se pusieran de acuerdo en usar un idioma inventado y secreto que solo ustedes dos entienden para el resto de la conversación.

### **Los Actores Clave: Autoridades Certificadoras (CA)**

Las Autoridades Certificadoras (CA) son organizaciones de confianza, globalmente reconocidas (como Let's Encrypt, DigiCert, GlobalSign), que actúan como **notarios digitales**. Su trabajo es:

- Verificar que la entidad que solicita el certificado (por ejemplo, "mi-tienda.com") realmente es la propietaria legítima de ese dominio.
- Emitir el certificado digital firmado criptográficamente por ellos.

Tu navegador y sistema operativo vienen con una lista preinstalada de CA en las que confían. Si un certificado fue firmado por una de estas CA, tu navegador lo acepta como válido.

### **Tipos de Certificados SSL**

No todos los certificados son iguales. El nivel de validación requerido determina el tipo y la confianza que transmite.

**Certificado de Validación de Dominio (DV)**
Es el más básico y común. La CA solo verifica que el solicitante controle el dominio. Es rápido y barato (a menudo gratis).
**Ejemplo:** Un blog personal, un sitio web pequeño. Let's Encrypt ofrece estos certificados de forma gratuita. Verás el candado, pero al hacer clic en él no muestra el nombre de la empresa.

**Certificado de Validación de Organización (OV)**
La CA realiza una verificación más estricta. Investiga los detalles de la organización detrás del dominio (nombre, dirección, registro legal). Ofrece un mayor nivel de confianza.
**Ejemplo:** Sitios web corporativos, universidades. El candado mostrará el nombre de la organización verificada.

**Certificado de Validación Extendida (EV)**
Es el nivel más alto de autenticación. La CA realiza una verificación exhaustiva de la organización, siguiendo directrices estrictas definidas a nivel mundial.
**Ejemplo:** Bancos, grandes empresas de comercio electrónico. Hace unos años, la barra de direcciones se volvía verde mostrando el nombre de la empresa, lo que era una señal visual clara de máxima seguridad.

### **Cómo Obtener y Usar un Certificado**

**Paso 1: Generar una Solicitud de Firma de Certificado (CSR)**
En tu servidor web (como Apache o Nginx), generas un par de claves: una **privada** (que NUNCA debes compartir) y una **pública**. Con la clave pública y la información de tu empresa, generas un archivo CSR. Este CSR es como una solicitud de pasaporte en blanco.

**Paso 2: Solicitar el Certificado a una CA**
Compras o solicitas un certificado (por ejemplo, de Let's Encrypt, Namecheap o tu proveedor de hosting) y les envías el archivo CSR durante el proceso.

**Paso 3: Realizar la Validación**
La CA te pedirá que demuestres que controlas el dominio. Para un DV, esto suele ser tan simple como agregar un registro DNS específico o subir un archivo a tu servidor. Para OV y EV, requerirán documentos legales.

**Paso 4: Instalar el Certificado**
Una vez validado, la CA te envía el certificado firmado. Lo instalas en tu servidor web, asociándolo con la clave privada que generaste en el Paso 1.

**Ejemplo con Let's Encrypt:** Herramientas como `certbot` automatizan completamente este proceso. Con un solo comando, se genera el CSR, se realiza la validación y se instala el certificado, renovándolo automáticamente antes de que expire.

### **Qué Sucede si un Certificado es Inválido**

Tu navegador es un guardián de seguridad. Si detecta un problema con un certificado, bloqueará la conexión y te mostrará una advertencia grave. Las razones más comunes son:

**Certificado autofirmado:** El sitio web firmó su propio "pasaporte" en lugar de obtenerlo de una CA de confianza. El navegador no puede verificar su autenticidad.

**Nombre no coincide:** El certificado fue emitido para "www.dominio.com", pero estás intentando acceder a "dominio.com".

**Certificado caducado:** Los certificados tienen una fecha de caducidad (normalmente de 1 a 13 meses). Si ha expirado, es como usar un pasaporte vencido.

**CA no confiable:** El certificado fue firmado por una autoridad que tu navegador no reconoce como legítima.

### **Resumen y Ejemplo de Flujo Completo**

Cuando accedes a `https://tu-banco.com`:

1. Tu navegador inicia una conexión al servidor de `tu-banco.com`.
2. El servidor responde enviando su **certificado SSL** (emitido por una CA como DigiCert).
3. Tu navegador verifica que el certificado sea válido, no esté caducado y esté firmado por una CA en la que confía.
4. Tu navegador usa la **clave pública** del certificado para cifrar una "clave de sesión" temporal y se la envía al servidor.
5. Solo el servidor de `tu-banco.com`, con su **clave privada** correspondiente, puede descifrar ese mensaje y obtener la clave de sesión.
6. Ahora ambos tienen la misma clave secreta. Toda la comunicación posterior (tu login, el saldo de tu cuenta) se cifra con esta clave, haciendo que sea ilegible para cualquier espía.

El certificado es la pieza fundamental que inicia esta confianza, asegurándote de que estás hablando con el servidor correcto y estableciendo un canal de comunicación privado.
