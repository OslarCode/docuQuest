# Direcciones IP

Una **dirección IP** (Internet Protocol Address) es como el **DNI de tu dispositivo** en una red. Es un identificador único que permite localizar y comunicarse con cualquier dispositivo conectado a Internet.

## **La Analogía de las Direcciones Postales**

Piensa en Internet como una **ciudad gigante**:

- **Dirección IP** = Número de casa y calle
- **Router** = Oficina de correos del barrio
- **DNS** = La agenda de teléfonos que traduce nombres a direcciones

**EJEMPLO:**
Cuando visitas `google.com`:

- Primero buscas en la "agenda" (DNS) la dirección de Google
- Encuentras que Google vive en la "calle" `142.251.36.206`
- Vas directamente a esa dirección para pedir la página web

## **Formato de las Direcciones IP**

**IPv4 (Versión 4) - El estándar tradicional:**

```
192.168.1.1
```

- 4 números separados por puntos
- Cada número va de 0 a 255
- Ejemplo: `8.8.8.8` (Google DNS)

**IPv6 (Versión 6) - El nuevo estándar:**

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

- 8 grupos de 4 caracteres hexadecimales
- Separados por dos puntos
- Diseñado para resolver la escasez de IPv4

## **Tipos de Direcciones IP**

### **IP Pública vs IP Privada**

**IP PÚBLICA:**

- Es la **dirección de tu casa** vista desde fuera
- La asigna tu proveedor de Internet (Movistar, Orange, etc.)
- Es única en todo Internet
- **Ejemplo:** `85.245.234.123`

**IP PRIVADA:**

- Es la **dirección de cada habitación** dentro de tu casa
- Usada en redes locales (WiFi de casa, oficina)
- Múltiples redes pueden usar las mismas IPs privadas
- **Ejemplo:** `192.168.1.25`

### **Rangos de IPs Privadas (Reservadas)**

```
192.168.0.0  - 192.168.255.255  (Más común en hogares)
10.0.0.0     - 10.255.255.255   (Empresas grandes)
172.16.0.0   - 172.31.255.255   (Empresas medianas)
```

**EJEMPLO EN UNA CASA:**

- **Router:** `192.168.1.1`
- **Tu móvil:** `192.168.1.25`
- **Tu ordenador:** `192.168.1.26`
- **Smart TV:** `192.168.1.27`

Todos comparten la misma **IP pública** hacia Internet.

### **IP Dinámica vs IP Estática**

**IP DINÁMICA:**

- Cambia periódicamente
- La mayoría de usuarios domésticos
- **Ventaja:** Más económico, más seguridad básica

**IP ESTÁTICA:**

- Siempre es la misma
- Para servidores, cámaras de seguridad, empresas
- **Ventaja:** Siempre accesible desde la misma dirección

## **Localhost - Tu Propio Ordenador como Servidor**

### **¿Qué es Localhost?**

**Localhost** es una dirección especial que **siempre apunta a tu propio dispositivo**. Es como llamarte a ti mismo por teléfono.

**DIRECCIÓN:** `127.0.0.1` (IPv4) o `::1` (IPv6)

### **¿Para qué sirve Localhost?**

1. **Desarrollo web:** Probar sitios web antes de publicarlos
2. **Aplicaciones locales:** Bases de datos, servidores de archivos
3. **Pruebas:** Verificar que el software funciona correctamente

**EJEMPLO PRÁCTICO:**
Estás desarrollando una página web:

- Ejecutas tu servidor web en `http://localhost:3000`
- Abres el navegador y ves tu página localmente
- Puedes hacer pruebas sin necesidad de Internet

### **Cómo funciona Localhost**

Cuando escribes `localhost` en tu navegador:

1. Tu sistema operativo reconoce que es una dirección especial
2. Redirige la petición a tu propio ordenador
3. No sale a Internet en absoluto
4. Es completamente privado y seguro

**EN WINDOWS/MAC/LINUX:**

- Abre tu navegador
- Escribe: `http://localhost`
- O: `http://127.0.0.1`
- Verás lo que tengas ejecutando en tu puerto 80

## **Cómo Acceder a un Servidor por IP**

### **Acceso Directo por IP**

Puedes saltarte el DNS y acceder directamente a servidores usando su IP.

**EJEMPLOS FAMOSOS:**

- **Google DNS:** `8.8.8.8`
- **Cloudflare DNS:** `1.1.1.1`
- **Tu router:** `192.168.1.1` (normalmente)

**PARA ACCEDER:**

1. Abre tu navegador web
2. Escribe: `http://192.168.1.1` (para tu router)
3. O: `http://8.8.8.8` (verás una página de Google)

### **Acceso a Servidores Web por IP**

**PROBLEMA:** Un servidor puede alojar múltiples sitios web.

**SOLUCIÓN:** Usar la cabecera `Host` en la petición HTTP.

**EJEMPLO TÉCNICO:**

```http
GET / HTTP/1.1
Host: www.midominio.com
```

Si solo pones la IP, el servidor no sabe qué sitio web mostrar.

### **Acceso en Redes Locanas**

**ESCENARIO:** Tienes un servidor web en tu red local con IP `192.168.1.100`

**PARA ACCEDER:**

- Desde **tu mismo ordenador:** `http://localhost` o `http://127.0.0.1`
- Desde **otro dispositivo en la misma red:** `http://192.168.1.100`
- Desde **fuera de tu red:** Necesitas configurar reenvío de puertos en el router

## **Herramientas para Trabajar con IPs**

### **Comandos Básicos**

**PARA VER TU IP LOCAL:**

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
# o
ip addr
```

**RESULTADO TÍPICO:**

```
Adaptador Ethernet Ethernet:
   Dirección IPv4. . . . . . . . . . . . . . : 192.168.1.25
   Máscara de subred . . . . . . . . . . . . : 255.255.255.0
   Puerta de enlace predeterminada . . . . . : 192.168.1.1
```

### **Comandos de Diagnóstico**

**PING - Verificar conectividad:**

```bash
ping 8.8.8.8
ping google.com
```

**TRACERT/TRACEROUTE - Seguir la ruta:**

```bash
# Windows
tracert google.com

# Mac/Linux
traceroute google.com
```

**NSLOOKUP - Consultar DNS:**

```bash
nslookup google.com
```

## **Escaneo de Puertos y Acceso Avanzado**

### **¿Qué son los Puertos?**

Si la IP es la **dirección del edificio**, los puertos son los **números de apartamento**.

**EJEMPLO:** `192.168.1.100:80`

- **IP:** `192.168.1.100` (el servidor)
- **Puerto:** `80` (servicio web HTTP)

### **Puertos Comunes**

| Puerto   | Servicio   | Uso                 |
| -------- | ---------- | ------------------- |
| **22**   | SSH        | Conexiones seguras  |
| **80**   | HTTP       | Web normal          |
| **443**  | HTTPS      | Web segura          |
| **3306** | MySQL      | Base de datos       |
| **5432** | PostgreSQL | Base de datos       |
| **3000** | Desarrollo | Apps Node.js, React |

### **Acceso a Diferentes Servicios por IP**

**EJEMPLOS PRÁCTICOS:**

**Servidor web en puerto 80:**

```
http://192.168.1.100
http://192.168.1.100:80
```

**Servidor web en puerto 3000:**

```
http://192.168.1.100:3000
```

**Acceso SSH (seguro):**

```bash
ssh usuario@192.168.1.100
```

## **Problemas Comunes y Soluciones**

### **"No se puede acceder a este sitio"**

**CAUSAS COMUNES:**

1. **IP incorrecta:** Verifica la dirección
2. **Servicio no ejecutándose:** El servidor no está activo
3. **Firewall bloqueando:** El firewall impide la conexión
4. **Puerto incorrecto:** El servicio está en otro puerto

**SOLUCIONES:**

- Verificar con `ping`
- Comprobar que el servicio esté ejecutándose
- Revisar configuración del firewall
- Probar diferentes puertos

### **Ejemplo Real: Montar un Servidor Local**

**PASO A PASO:**

1. **Instalar un servidor web:**

   ```bash
   # Ejemplo con Node.js
   npm install -g http-server
   ```

2. **Ejecutar el servidor:**

   ```bash
   http-server -p 8080
   ```

3. **Acceder desde tu ordenador:**

   - `http://localhost:8080`
   - `http://127.0.0.1:8080`

4. **Acceder desde otro dispositivo en la red:**
   - Primero averigua tu IP local: `ipconfig`
   - Supongamos que es: `192.168.1.25`
   - Desde otro dispositivo: `http://192.168.1.25:8080`

## **Resumen Final**

- **IP Pública:** Tu identidad en Internet (asignada por tu ISP)
- **IP Privada:** Tu identidad en tu red local
- **Localhost:** `127.0.0.1` - Siempre apunta a tu propio dispositivo
- **Puertos:** Especifican el servicio dentro de un dispositivo
- **Acceso directo:** `http://IP:PUERTO` para acceder a servidores específicos

**EJEMPLO DE USO COMPLETO:**

```bash
# Desarrollas una app web en tu portátil
http://localhost:3000          # Desde tu mismo ordenador
http://192.168.1.25:3000       # Desde tu móvil en la misma WiFi
http://85.245.234.123:3000     # Desde fuera de tu red (con configuración)
```

Las direcciones IP son fundamentales para entender cómo los dispositivos se encuentran y comunican en Internet, esencial para cualquier desarrollador web o administrador de sistemas.
