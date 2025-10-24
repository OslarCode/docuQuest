# Fundamentos de la Web y HTTP

## Introducción al funcionamiento de Internet por detrás

Cuando abrimos nuestro navegador y escribimos una dirección como `https://www.google.com`, lo que ocurre detrás de escena es **mucho más interesante** de lo que parece.
Antes de aprender a programar en el lado del servidor (backend), es fundamental **entender cómo funciona la web**.

---

## 1. Cliente y servidor: la base de todo

La web funciona con un **modelo cliente-servidor**:

- **Cliente** → normalmente es tu navegador (Chrome, Firefox, Safari, etc.).
- **Servidor** → es un ordenador remoto que guarda y sirve la información (por ejemplo, los servidores de Google o de tu propia web).

Cuando visitas una página:

1. El cliente **envía una petición**.
2. El servidor **procesa la petición**.
3. El servidor **responde con la información solicitada**.

👉 Esta conversación entre cliente y servidor se hace mediante un “idioma común”: **el protocolo HTTP**.

---

## 2. HTTP y HTTPS: el lenguaje de la Web

**HTTP** significa _HyperText Transfer Protocol_.
Es un conjunto de reglas que define cómo se comunican cliente y servidor.

Cuando escribes:

```
https://www.ejemplo.com
```

estás indicando que:

- usarás el **protocolo HTTPS** (HTTP seguro, cifrado con TLS),
- quieres acceder al dominio `www.ejemplo.com`,
- por defecto se hace una **petición GET** (para obtener información).

El servidor responde con algo como un archivo HTML, un JSON o cualquier otro recurso.

Ejemplo de una conversación sencilla:

```
GET / HTTP/1.1
Host: www.ejemplo.com
```

Y el servidor responde:

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <h1>Hola mundo</h1>
</html>
```

👉 Este ida y vuelta es **la base de cualquier sitio web**.

---

## 3. Dominios, DNS y hosting

Antes de llegar al servidor, el navegador necesita **saber a qué dirección IP apuntar**.
Ahí entra en juego:

- **Dominio** → nombre fácil de recordar (ej. `www.ejemplo.com`).
- **DNS** → un sistema que traduce el nombre del dominio en una dirección IP real.
- **Hosting** → el lugar físico (servidor) donde está alojada tu web o aplicación.

Ejemplo:
`www.google.com` → DNS → `142.250.185.132` → servidor real.

---

## 4. Tipos de peticiones HTTP

HTTP define diferentes **métodos** para indicar qué quieres hacer:

- `GET` → obtener información.
- `POST` → enviar información.
- `PUT` → actualizar algo existente.
- `DELETE` → borrar algo.

Ejemplo sencillo de petición con JavaScript:

```javascript
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

👉 Aquí el navegador hace una **petición GET** a un servidor público y recibe un listado en JSON.

---

## 5. Puertos y direcciones locales

Cuando trabajes en tu propio backend, usarás algo como:

```
http://localhost:3000
```

- `localhost` → tu propio ordenador.
- `3000` → el **puerto** donde estará escuchando tu servidor.

Esto es como decirle: “conéctate a este ordenador, en esta puerta específica”.

---

## 6. Un primer servidor con Node.js

Vamos a hacer una **demostración muy simple** de cómo un servidor responde a una petición.
Este ejemplo no necesita frameworks, solo Node.js.

```javascript
// server.js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`Petición recibida: ${req.method} ${req.url}`);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hola desde mi primer servidor Node.js");
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
```

👉 Pasos para probarlo:

1. Guarda el archivo como `server.js`.
2. Ejecuta en la terminal:

   ```
   node server.js
   ```

3. Abre en el navegador: `http://localhost:3000`.

Verás en pantalla:

```
Hola desde mi primer servidor Node.js
```

Y en la terminal:

```
Petición recibida: GET /
```

Con esto, los alumnos entienden que **el navegador (cliente)** envía una petición y **el servidor Node.js** responde.

---

## 7. HTTPS y seguridad básica

HTTPS es simplemente **HTTP cifrado con un certificado SSL/TLS**.
Esto:

- Protege la información que viaja entre cliente y servidor.
- Es obligatorio para sitios modernos (por ejemplo, en formularios, login, pagos, etc.).
- Se activa normalmente en el hosting o con servicios como Let’s Encrypt.

👉 En local usaremos HTTP para aprender. En producción, **siempre HTTPS**.

---

## 8. Resumen final

- El **backend** no es más que **la parte del sistema que responde a las peticiones HTTP**.
- HTTP es el lenguaje base de esa comunicación.
- Dominios, DNS y hosting son la infraestructura que hace posible que tu petición llegue al servidor.
- Con Node.js puedes crear un servidor en pocas líneas.
