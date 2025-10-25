# Fundamentos de Node.js

## ¿Qué es Node.js y por qué deberías aprenderlo?

Node.js es un entorno que te permite ejecutar JavaScript fuera del navegador. Esto significa que con los mismos conocimientos que usas para crear sitios web interactivos en el frontend, ahora puedes construir servidores, automatizar tareas, manejar archivos o incluso crear APIs completas. Desde su aparición en 2009, Node.js se ha convertido en una pieza fundamental del desarrollo web moderno, utilizada por empresas como Netflix, PayPal o LinkedIn para construir servicios escalables y de alto rendimiento.

A diferencia de otros entornos backend como PHP o Python, Node.js se apoya en un modelo asincrónico y orientado a eventos. Esto le permite manejar miles de conexiones simultáneas sin bloquear el hilo principal de ejecución, lo que resulta ideal para aplicaciones en tiempo real como chats, notificaciones push, APIs RESTful o dashboards en vivo.

## Instalando Node.js y preparando tu entorno

Antes de comenzar a escribir código, necesitas instalar Node.js en tu equipo. Puedes hacerlo desde la página oficial [https://nodejs.org](https://nodejs.org/), donde se recomienda elegir la versión LTS (Long Term Support) para mayor estabilidad.

Una vez instalado, abre tu terminal o consola de comandos y verifica que todo está en orden ejecutando los comandos `node -v` y `npm -v`. Deberías ver los números de versión correspondientes. Si eso aparece correctamente, ya estás listo para escribir tu primer archivo de Node.

Crea un archivo llamado `hola.js` y dentro escribe la siguiente línea:

```jsx
console.log("¡Hola desde Node.js!");
```

Después, ejecútalo en la terminal con:

```bash
node hola.js
```

Verás el mensaje en pantalla, lo que significa que tu entorno está funcionando correctamente. Con este primer paso ya estás ejecutando código JavaScript fuera del navegador, directamente en tu sistema operativo.

## Escribiendo tu primer programa con argumentos

Una de las ventajas de Node.js es que puedes construir pequeñas utilidades de consola, también conocidas como scripts CLI. Por ejemplo, puedes escribir un saludo personalizado que reciba el nombre del usuario como argumento.

Imagina que tienes este archivo llamado `saludo.js`:

```jsx
const nombre = process.argv[2] || "desconocido";
console.log(`Hola, ${nombre}. Bienvenido a tu primera app Node.js`);
```

Al ejecutarlo desde la terminal con `node saludo.js Laura`, verás el mensaje:

**Hola, Laura. Bienvenido a tu primera app Node.js**

Aquí usamos `process.argv`, una variable especial que contiene todos los argumentos pasados por línea de comandos. Este tipo de interacción es muy útil para automatizar tareas, generar archivos o ejecutar scripts personalizados.

## ¿Cómo funciona Node.js internamente?

Node.js funciona gracias al motor V8 de Google Chrome, el cual convierte el código JavaScript en instrucciones entendibles por el procesador (código máquina). Pero lo que hace especial a Node.js no es solo su velocidad, sino su **arquitectura basada en eventos**.

A diferencia de otros entornos donde cada operación bloquea el hilo principal hasta que termina, Node utiliza un sistema llamado **event loop**. Este mecanismo permite que el programa siga ejecutándose mientras espera, por ejemplo, que un archivo se lea del disco o que llegue una respuesta de red. Así, se optimiza el rendimiento y se evitan los cuellos de botella.

Para verlo en acción, prueba este código:

```jsx
console.log("Inicio");

setTimeout(() => {
  console.log("Después de 2 segundos");
}, 2000);

console.log("Fin");
```

La salida será:

```jsx
Inicio
Fin
Después de 2 segundos

```

Aunque parezca contraintuitivo, el `setTimeout` no bloquea el flujo. Node.js sigue adelante mientras espera que se cumplan los 2 segundos. Esta característica es clave para entender cómo se manejan las tareas asincrónicas en este entorno.

## Explorando el objeto `process` y el entorno de ejecución

Node proporciona acceso directo al entorno del sistema operativo a través del objeto global `process`. Con él puedes saber en qué plataforma estás ejecutando tu código, cuál es el directorio actual o incluso acceder a variables de entorno del sistema.

Veamos un ejemplo real de cómo obtener información del sistema:

```jsx
console.log("Ruta actual:", process.cwd());
console.log("Sistema operativo:", process.platform);
console.log("ID del proceso:", process.pid);
console.log("Usuario:", process.env.USER || process.env.USERNAME);
```

Estos datos son muy útiles para construir herramientas CLI, scripts que se adaptan al entorno o incluso para definir configuraciones dinámicas según el entorno de producción o desarrollo.

También puedes usar `process` para capturar errores inesperados:

```jsx
process.on("uncaughtException", (err) => {
  console.error("Error inesperado:", err.message);
});
```

Esto te permite mantener tus aplicaciones más seguras y controladas, incluso ante fallos.

## Proyecto práctico: Tu primera utilidad CLI

Para finalizar el módulo, te propongo un pequeño proyecto: crear un script llamado `info-sistema.js` que reciba un nombre por consola y muestre un saludo junto con algunos datos útiles del sistema.

Tu script podría combinar varias de las funcionalidades aprendidas:

```jsx
const os = require("os");

const nombre = process.argv[2] || "usuario";
console.log(`👋 Hola, ${nombre}! Aquí tienes información sobre tu sistema:`);

console.log("Sistema operativo:", os.platform());
console.log("CPU:", os.cpus()[0].model);
console.log("Memoria libre:", `${Math.round(os.freemem() / 1024 / 1024)} MB`);
console.log("Directorio actual:", process.cwd());
console.log("Fecha actual:", new Date().toLocaleString());
```

Guarda el archivo, ejecútalo con `node info-sistema.js`, y observa cómo tu programa ya interactúa con el sistema como una herramienta de consola real.

## ¿Y ahora qué?

Has dado los primeros pasos sólidos con Node.js. Entiendes qué es, cómo instalarlo, cómo ejecutar código y cómo funciona internamente. Lo más importante: ya has empezado a escribir código que interactúa directamente con el sistema operativo.

## 🔗 Recursos extra recomendados:

- [Node.js Docs (Intro)](https://nodejs.org/en/docs/guides/getting-started-guide/)
- Canal YouTube: [Midudev – Introducción a Node.js](https://www.youtube.com/watch?v=TlB_eWDSMt4)
- Glitch (plataforma online): https://glitch.com/
