# Funcionamiento de Direcciones y Puertos

Las direcciones y puertos forman el sistema de direccionamiento fundamental de Internet, comparable a un sistema postal.

## 1. **Dirección IP**

**QUÉ ES:** Un identificador numérico único asignado a cada dispositivo conectado a una red.

**FUNCIÓN:** Permite localizar de manera inequívoca cualquier dispositivo en Internet.

**TIPOS PRINCIPALES:**

- **IPv4:** Formato de 4 números separados por puntos

  - Ejemplo: `192.168.1.1`
  - Rango: `0.0.0.0` a `255.255.255.255`
  - Limitación: Aproximadamente 4.300 millones de direcciones

- **IPv6:** Formato hexadecimal para resolver la escasez de IPv4
  - Ejemplo: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
  - Permite 340 sextillones de direcciones

**EJEMPLO REAL:**
Cuando tu ordenador (IP: `192.168.1.50`) quiere acceder a Google, necesita conocer la IP de los servidores de Google (ej: `142.251.36.206`).

## 2. **Sistema de Nombres de Dominio (DNS)**

**PROBLEMA:** Los humanos no memorizamos fácilmente números como `142.251.36.206`.

**SOLUCIÓN:** DNS actúa como "la agenda de teléfonos de Internet".

**CÓMO FUNCIONA:**

1. Usuario escribe `www.google.com` en el navegador
2. El sistema consulta al servidor DNS: "¿Qué IP corresponde a google.com?"
3. DNS responde: `142.251.36.206`
4. El navegador se conecta a esa IP

**COMPONENTES DNS:**

- **Registros A:** Asocian dominio → IPv4
- **Registros AAAA:** Asocian dominio → IPv6
- **Servidores DNS:** Jerarquía distribuida que resuelve las consultas

## 3. **Puertos**

**QUÉ ES:** Un número de 16 bits (0-65535) que identifica un servicio específico en un dispositivo.

**ANALOGÍA:** Si la IP es la dirección de un edificio, el puerto es el número de apartamento específico.

**FUNCIÓN:** Permite que un solo servidor ofrezca múltiples servicios simultáneamente.

**PUERTOS BIEN CONOCIDOS (0-1023):**

| Puerto | Servicio   | Protocolo | Uso                         |
| ------ | ---------- | --------- | --------------------------- |
| 80     | HTTP       | TCP       | Navegación web estándar     |
| 443    | HTTPS      | TCP       | Navegación web segura       |
| 22     | SSH        | TCP       | Conexiones seguras remotas  |
| 25     | SMTP       | TCP       | Envío de correo electrónico |
| 53     | DNS        | UDP/TCP   | Resolución de nombres       |
| 3306   | MySQL      | TCP       | Base de datos MySQL         |
| 5432   | PostgreSQL | TCP       | Base de datos PostgreSQL    |

**EJEMPLO PRÁCTICO:**
Un servidor web puede tener:

- Servicio web en puerto 80
- Base de datos en puerto 3306
- SSH para administración en puerto 22

Todos funcionando simultáneamente en la misma IP.

## 4. **Combinación IP:Puerto**

**FORMATO:** `IP:Puerto` o `Dominio:Puerto`

**EJEMPLOS:**

- `192.168.1.100:80` → Servicio web en ese equipo
- `mi-servidor.com:5432` → PostgreSQL en ese dominio
- `localhost:3000` → Servicio en tu propia máquina, puerto 3000

**EN LA PRÁCTICA:**
Cuando escribes `https://www.ejemplo.com`, realmente estás accediendo a:

- IP: La que resuelva DNS para `www.ejemplo.com`
- Puerto: 443 (implícito para HTTPS)

## 5. **Flujo Completo de Conexión**

**ESCENARIO:** Cliente accede a `https://www.mitienda.com:443/productos`

1. **RESOLUCIÓN DNS:**

   - Cliente: "Necesito la IP de `www.mitienda.com`"
   - DNS responde: `203.0.113.45`

2. **ESTABLECIMIENTO DE CONEXIÓN:**

   - Cliente inicia conexión TCP a `203.0.113.45:443`
   - Protocolo de enlace de 3 vías (SYN, SYN-ACK, ACK)

3. **COMUNICACIÓN:**

   - Cliente envía petición HTTP sobre la conexión establecida
   - Servidor responde con los datos solicitados

4. **CIERRE DE CONEXIÓN:**
   - Ambas partes acuerdan terminar la comunicación

## 6. **Casos de Uso Avanzados**

**PUERTOS EN DESARROLLO WEB:**

```bash
# Servicios ejecutándose en diferentes puertos
Frontend:    http://localhost:3000
Backend API: http://localhost:8000
Base de datos: localhost:5432
Servidor email: localhost:1025
```

**REDIRECCIONES DE PUERTO:**

- `www.midominio.com` → redirige a puerto 80 (HTTP)
- `www.midominio.com:443` → redirige a puerto 443 (HTTPS)
- `api.midominio.com:3000` → servicio de API específico

## 7. **Seguridad y Puertos**

**BUENAS PRÁCTICAS:**

- Exponer solo los puertos necesarios
- Usar firewalls para bloquear puertos no utilizados
- Cambiar puertos predeterminados en servicios críticos (ej: SSH del 22 al 2222)

**EJEMPLO DE CONFIGURACIÓN SEGURA:**

```
Puerto 80:   Redirigido → 443 (forzar HTTPS)
Puerto 443:  Abierto (servicio web)
Puerto 2222: Abierto (SSH, en lugar del 22)
Puerto 3306: Solo acceso local (base de datos)
```

## Resumen Técnico

- **IP:** Identifica el dispositivo en la red
- **DNS:** Traduce nombres legibles a IPs
- **Puerto:** Identifica el servicio específico en el dispositivo
- **Combinación:** `IP:Puerto` localiza exactamente qué servicio en qué dispositivo

Este sistema jerárquico permite la escalabilidad y organización de Internet, permitiendo que millones de servicios coexistan y sean accesibles de manera ordenada.
