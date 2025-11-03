# Entendiendo las API Web: Conectando el mundo digital

**Resumen introductorio**

Hoy en día, casi todas las aplicaciones que usas se comunican entre sí: tu móvil pide datos al servidor del banco, tu app de comida habla con un sistema de entregas, o tus redes sociales muestran publicaciones nuevas sin recargar la página. Todo eso ocurre gracias a las API web. Son el lenguaje común que permite que distintos sistemas trabajen juntos de forma eficiente.

## ¿Qué es una API web?

Una API web (Interfaz de Programación de Aplicaciones) es como un intérprete entre dos programas. Imagina que una app quiere pedir información a otra. En vez de conectarse directamente y arriesgarse a errores, lo hace usando un conjunto de reglas comunes: la API. Estas reglas definen cómo se piden y se envían los datos a través de internet, usando un protocolo llamado HTTP (el mismo que usan los navegadores para cargar páginas).

Cada vez que usas una app para ver noticias, hacer una compra o revisar tu saldo, esa app probablemente está haciendo una **solicitud HTTP**. Por ejemplo, si necesita obtener datos, usará el método GET; si quiere enviar información, usará POST. Todo esto sucede sin que tú lo veas.

Para que los programas se entiendan, los datos suelen viajar en formatos organizados como **JSON**, que es fácil de leer para las máquinas (y para los humanos también). Así, diferentes sistemas pueden compartir datos como si hablaran el mismo idioma.

## Tipos de APIs web que debes conocer

Existen varios tipos de APIs y se pueden clasificar de múltiples maneras según diferentes criterios.

### **1. Por Nivel de Acceso y Disponibilidad (La clasificación más común)**

Esta es la forma más frecuente de clasificar las APIs y se basa en quién puede usarlas.

- **APIs Públicas (o Abiertas):**
  - **Descripción:** Disponibles para cualquier desarrollador externo. No suelen requerir autenticación compleja o son de pago para volúmenes altos.
  - **Objetivo:** Fomentar la innovación, crear ecosistemas alrededor de un producto o servicio.
  - **Ejemplos:** Google Maps API, Twitter API, API de clima, API de GitHub.
- **APIs Privadas (o Internas):**
  - **Descripción:** Son de uso exclusivo dentro de una empresa u organización. Se utilizan para conectar sistemas internos, como un ERP con un CRM, o una aplicación móvil con la base de datos central.
  - **Objetivo:** Mejorar la eficiencia, la integración y la seguridad de los procesos internos.
  - **Ejemplos:** La API que usa la app bancaria de tu banco para consultar tu saldo, o la API que conecta el sistema de ventas con el de logística.
- **APIs de Partners (o de Socios):**
  - **Descripción:** Son un punto intermedio. No son públicas para todos, pero tampoco son completamente internas. Se comparten con socios comerciales específicos para una integración estratégica.
  - **Objetivo:** Crear canales de negocio fuertes y automatizados entre empresas aliadas.
  - **Ejemplos:** La API que una aerolínea le proporciona a un sitio web de viajes para vender sus boletos, o la API que un fabricante le da a su cadena de distribuidores para consultar inventario.

### **2. Por Arquitectura y Protocolo (¿Cómo se comunican?)**

Esta clasificación se centra en la tecnología y el estilo de comunicación que utiliza la API.

- **REST (Representational State Transfer):**
  - **Es el estándar más popular.** Se basa en el protocolo HTTP y utiliza sus verbos (GET, POST, PUT, DELETE).
  - **Características:** Sin estado (stateless), estructura uniforme, devuelve datos comúnmente en JSON.
  - **Ventajas:** Simple, flexible, fácil de entender e implementar.
- **SOAP (Simple Object Access Protocol):**
  - **Es un protocolo más antiguo y estricto.** Utiliza XML para el formato de los mensajes y suele operar sobre HTTP, SMTP, etc.
  - **Características:** Muy estructurado, con alto nivel de seguridad y confiabilidad integrados (WS-Security).
  - **Ventajas:** Robusto, ideal para entornos empresariales donde la seguridad y la transaccionalidad son críticas (ej. banca).
- **GraphQL:**
  - **Es una alternativa moderna a REST.** Permite al cliente solicitar **exactamente** los datos que necesita, ni más ni menos, en una sola petición.
  - **Características:** El cliente define la estructura de la respuesta.
  - **Ventajas:** Muy eficiente, evita el "over-fetching" (traer datos de más) y el "under-fetching" (necesitar hacer múltiples peticiones).
- **gRPC (Google Remote Procedure Call):**
  - **Es un framework moderno y de alto rendimiento.** Desarrollado por Google, utiliza el protocolo HTTP/2 y el formato de serialización Protocol Buffers (más pequeño y rápido que JSON/XML).
  - **Características:** Ideal para comunicación entre microservicios, apps móviles y sistemas en tiempo real.
  - **Ventajas:** Extremadamente rápido y eficiente.
- **WebSocket:**
  - **No es una API en sí mismo, sino un protocolo** que permite una **comunicación bidireccional y en tiempo real** entre el cliente y el servidor.
  - **Características:** A diferencia de HTTP (que es "pregunta-respuesta"), WebSocket mantiene una conexión abierta.
  - **Uso en APIs:** Se usa para APIs que necesitan "push" de datos en tiempo real (ej. chats, cotizaciones de bolsa, notificaciones instantáneas).

## ¿Por qué son tan importantes las API web?

Las API son como puentes invisibles entre servicios. Gracias a ellas, las aplicaciones pueden colaborar sin importar quién las creó ni en qué lenguaje están hechas.

- Integran servicios y mejoran la compatibilidad: Una tienda online puede conectarse con una pasarela de pago, un sistema de stock y un servicio de envíos... todo a través de APIs. Sin necesidad de reinventarlo todo, cada pieza hace su trabajo y la tienda funciona como una sola unidad.

- Impulsan la innovación: Al usar APIs, los desarrolladores pueden concentrarse en lo que importa: crear nuevas ideas. Por ejemplo, una app de viajes no necesita crear su propio sistema de mapas o clima: puede integrar APIs como Google Maps o OpenWeather y centrarse en la experiencia del usuario.

- Hacen las apps más rápidas y agradables: ¿Te has fijado que muchas apps ya no recargan toda la página, sino solo la parte necesaria? Eso se debe al uso de APIs. Así, todo es más fluido y personalizado. Y con tecnologías como GraphQL, hasta puedes afinar qué datos recibir para no desperdiciar recursos.

- Sostienen ecosistemas tecnológicos complejos: En sectores como el de la salud, la banca o el IoT (Internet de las Cosas), las APIs permiten que diferentes sistemas trabajen juntos. Un sensor inteligente puede enviar sus datos a una app, que los muestra en tiempo real a un médico o técnico. Todo gracias a una comunicación bien diseñada vía API.

## ¿Dónde se usan las API web?

Para que te hagas una idea clara, aquí van ejemplos cotidianos:

- **Redes sociales**: Cuando una app muestra tu feed de Facebook o permite publicar en Twitter, está usando sus APIs. Lo mismo con Instagram o TikTok.
- **E-commerce**: Cuando pagas con PayPal o ves el estado de un envío por FedEx, detrás hay APIs conectando esos servicios.
- **Finanzas**: Aplicaciones de gastos personales acceden a tus movimientos bancarios (con tu permiso, claro) usando APIs oficiales de los bancos.
- **Salud**: Apps como Fitbit o Apple Health usan APIs para enviar tus datos a médicos o plataformas de seguimiento.
- **Dispositivos inteligentes**: Desde bombillas hasta cámaras conectadas, todos estos aparatos usan APIs para hablar con la nube o entre sí.

## Para terminar: ¿y ahora qué?

Ahora que entiendes qué son las API web y por qué son tan valiosas, puedes empezar a verlas en acción en todo lo que te rodea. Detrás de cada app que conecta servicios, de cada proceso automatizado, de cada integración invisible… hay una o varias APIs trabajando.

**¿Y tú? ¿Qué podrías crear si aprendieras a diseñar tu propia API o a consumir una existente?**

El siguiente paso está en tus manos: explorar, probar y construir cosas conectadas.

Por supuesto. Aquí tienes una serie de para que puedas **ver, practicar y entender cómo se usan las API web** en proyectos del mundo real.

## Mini Proyecto 1: Consumir una API pública desde JavaScript (frontend puro)

**Objetivo**: Aprender a hacer peticiones GET usando `fetch()` y mostrar los datos en pantalla.

### Contexto: API pública de Pokémon

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Buscador de Pokémon</title>
    <!-- Link a los estilos css -->
  </head>
  <body>
    <h1>Buscador de Pokémon</h1>

    <div class="container">
      <div class="description">
        <p>
          Esta aplicación demuestra cómo consumir una API pública (PokeAPI)
          usando Node.js como backend.
        </p>
        <p>
          Escribe el nombre de un Pokémon y haz clic en "Buscar" para ver sus
          detalles.
        </p>
      </div>

      <div class="search-container">
        <input
          type="text"
          id="pokemon"
          placeholder="Ej. pikachu, charmander, eevee..."
        />
        <button onclick="buscarPokemon()">Buscar Pokémon</button>
      </div>

      <div id="loading" class="loading" style="display: none;">
        <p>Buscando Pokémon...</p>
      </div>

      <div id="resultado" class="result-container"></div>

      <div class="api-info">
        <h3>Información sobre la API</h3>
        <p>
          Esta aplicación utiliza la <strong>PokeAPI</strong>, una API RESTful
          pública que proporciona datos completos sobre Pokémon.
        </p>
        <p>
          <strong>Endpoint utilizado:</strong>
          https://pokeapi.co/api/v2/pokemon/{nombre-o-id}
        </p>
        <p>
          El frontend se comunica con nuestro servidor Node.js, que a su vez
          hace la petición a la PokeAPI.
        </p>
      </div>
    </div>

    <footer>
      <p>Ejemplo educativo - Consumo de API con Node.js</p>
    </footer>
    <!--Links a los scripts -->
  </body>
</html>
```

Código CSS

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: #333;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  max-width: 800px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin-top: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
}

.description {
  text-align: center;
  margin-bottom: 30px;
  color: #555;
  line-height: 1.6;
}

.search-container {
  display: flex;
  margin-bottom: 30px;
  gap: 10px;
}

input {
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #3498db;
  outline: none;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.result-container {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  display: none;
}

.pokemon-card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.pokemon-image {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.pokemon-image img {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

.pokemon-details {
  flex: 2;
  min-width: 300px;
}

.pokemon-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.pokemon-types {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.type-badge {
  padding: 5px 15px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  text-transform: capitalize;
}

.stats-container {
  margin-top: 20px;
}

.stat {
  margin-bottom: 8px;
}

.stat-name {
  display: inline-block;
  width: 120px;
  font-weight: bold;
  text-transform: capitalize;
}

.stat-bar {
  display: inline-block;
  width: 200px;
  height: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
}

.stat-value {
  height: 100%;
  background-color: #3498db;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  padding: 15px;
  background-color: #fadbd8;
  border-radius: 8px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
}

.api-info {
  margin-top: 40px;
  padding: 20px;
  background-color: #e8f4fc;
  border-radius: 10px;
}

.api-info h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

footer {
  margin-top: 30px;
  text-align: center;
  color: white;
  font-size: 0.9rem;
}
```

Código JavaScript

```javascript
// Función asíncrona para buscar un Pokémon
async function buscarPokemon() {
  // Obtener el nombre del Pokémon desde el campo de entrada
  const nombre = document.getElementById("pokemon").value.toLowerCase().trim();

  // Validar que se haya ingresado un nombre
  if (!nombre) {
    alert("Por favor, ingresa el nombre de un Pokémon");
    return;
  }

  // Mostrar indicador de carga
  document.getElementById("loading").style.display = "block";
  document.getElementById("resultado").style.display = "none";

  try {
    // Hacer la petición a nuestro servidor Node.js
    // En un entorno real, esta URL sería la de tu servidor Node.js desplegado
    const res = await fetch(`/api/pokemon/${nombre}`);

    // Verificar si la respuesta fue exitosa (código 200-299)
    if (res.ok) {
      // Convertir la respuesta a formato JSON
      const data = await res.json();

      // Mostrar los datos del Pokémon en la interfaz
      mostrarPokemon(data);
    } else {
      // Manejar errores de la API
      if (res.status === 404) {
        mostrarError(
          "Pokémon no encontrado. Verifica el nombre e intenta nuevamente."
        );
      } else {
        mostrarError("Error al buscar el Pokémon. Intenta más tarde.");
      }
    }
  } catch (error) {
    // Manejar errores de red u otros errores
    console.error("Error:", error);
    mostrarError(
      "Error de conexión. Verifica tu internet e intenta nuevamente."
    );
  } finally {
    // Ocultar el indicador de carga
    document.getElementById("loading").style.display = "none";
  }
}

// Función para mostrar los datos del Pokémon en la interfaz
function mostrarPokemon(data) {
  // Mapear tipos de Pokémon a colores para una mejor visualización
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  // Crear elementos HTML para los tipos del Pokémon
  const tiposHTML = data.types
    .map((tipoInfo) => {
      const tipo = tipoInfo.type.name;
      const color = typeColors[tipo] || "#777";
      return `<span class="type-badge" style="background-color: ${color}">${tipo}</span>`;
    })
    .join("");

  // Crear elementos HTML para las estadísticas del Pokémon
  const statsHTML = data.stats
    .map((statInfo) => {
      const statName = statInfo.stat.name.replace("-", " ");
      const statValue = statInfo.base_stat;
      const percentage = Math.min(100, (statValue / 255) * 100);

      return `
                    <div class="stat">
                        <span class="stat-name">${statName}:</span>
                        <span>${statValue}</span>
                        <div class="stat-bar">
                            <div class="stat-value" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
    })
    .join("");

  // Construir el HTML completo para mostrar el Pokémon
  const pokemonHTML = `
                <div class="pokemon-card">
                    <div class="pokemon-image">
                        <img src="${
                          data.sprites.other["official-artwork"]
                            .front_default || data.sprites.front_default
                        }" alt="${data.name}" />
                        <p>#${data.id.toString().padStart(3, "0")}</p>
                    </div>
                    <div class="pokemon-details">
                        <h2 class="pokemon-name">${data.name}</h2>
                        <div class="pokemon-types">
                            ${tiposHTML}
                        </div>
                        <p><strong>Altura:</strong> ${data.height / 10} m</p>
                        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
                        <div class="stats-container">
                            <h3>Estadísticas Base</h3>
                            ${statsHTML}
                        </div>
                    </div>
                </div>
            `;

  // Insertar el HTML en el contenedor de resultados y mostrarlo
  document.getElementById("resultado").innerHTML = pokemonHTML;
  document.getElementById("resultado").style.display = "block";
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
  document.getElementById("resultado").innerHTML = `
                <div class="error-message">
                    <p>${mensaje}</p>
                </div>
            `;
  document.getElementById("resultado").style.display = "block";
}

// Permitir buscar presionando Enter en el campo de texto
document
  .getElementById("pokemon")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      buscarPokemon();
    }
  });
```

Código para Node.js

```javascript
// Importar los módulos necesarios
const express = require("express");
const fetch = require("node-fetch"); // Necesitarás instalar este paquete: npm install node-fetch
const path = require("path");

// Crear una instancia de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos (como nuestro index.html)
app.use(express.static(path.join(__dirname, "public")));

// Ruta de la API para buscar Pokémon
app.get("/api/pokemon/:name", async (req, res) => {
  try {
    // Obtener el nombre del Pokémon de los parámetros de la URL
    const pokemonName = req.params.name.toLowerCase();

    // Hacer una petición a la PokeAPI
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    // Verificar si la PokeAPI respondió correctamente
    if (response.ok) {
      // Convertir la respuesta a JSON
      const pokemonData = await response.json();

      // Enviar los datos del Pokémon al cliente
      res.json(pokemonData);
    } else {
      // Si la PokeAPI devuelve un error, enviar el código de estado correspondiente
      res.status(response.status).json({
        error: "Pokémon no encontrado",
      });
    }
  } catch (error) {
    // Manejar errores de conexión u otros errores
    console.error("Error al buscar Pokémon:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
});

// Ruta de inicio - servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

## **Explicación Detallada**

### **Frontend (HTML/JS):**

1. **Interfaz de Usuario**: Crea una interfaz atractiva con un campo de búsqueda y botón.
2. **Función `buscarPokemon()`**: Maneja la búsqueda, muestra estados de carga y errores.
3. **Comunicación con el Backend**: Usa `fetch()` para hacer peticiones a nuestro servidor Node.js.
4. **Manejo de Respuestas**: Procesa los datos del Pokémon y los muestra de forma visualmente atractiva.

### **Backend (Node.js/Express):**

1. **Servidor Express**: Crea un servidor web que sirve archivos estáticos y maneja rutas de API.
2. **Ruta `/api/pokemon/:name`**:
   - Recibe el nombre del Pokémon desde el frontend
   - Hace una petición a la PokeAPI
   - Devuelve los datos al frontend o maneja errores
3. **Middleware**: Configura Express para servir archivos estáticos como el HTML.

### **Para ejecutar este proyecto:**

1. Crear una carpeta para el proyecto
2. Colocar el HTML en `public/index.html`
3. Crear el archivo `server.js` con el código del servidor
4. Ejecutar `npm init -y` para crear package.json
5. Instalar dependencias: `npm install express node-fetch`
6. Ejecutar el servidor: `node server.js`
7. Abrir [http://localhost:3000](http://localhost:3000/) en el navegador

Este ejemplo mantiene la simplicidad pero añade funcionalidades esenciales como manejo de errores, estados de carga y una presentación visual mejorada de los datos del Pokémon.

## Recomendación final para el aprendizaje

1. **Empieza por el consumo de APIs públicas**: No necesitas backend para practicar.
2. **Crea una API sencilla en PHP**: Aunque solo devuelva arrays, ya es útil.
3. **Usa `fetch()` en el navegador**: Para entender cómo el frontend se comunica con la API.
4. **Combina ambos mundos**: Crea tu primera mini app con backend en PHP y frontend en JS.
5. **Luego añade filtros, formularios, autenticación y seguridad**.
