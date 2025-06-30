# Módulo 12: Tecnologías de Asistencia y su Uso en la Web

## 🌍 ¿Qué son las tecnologías de asistencia y por qué importan?

Las tecnologías de asistencia son herramientas que ayudan a las personas con discapacidades a usar la web y las aplicaciones. No se trata solo de hacer un sitio "bonito", sino de lograr que sea realmente utilizable por todos, sin importar sus capacidades. Este módulo te muestra cómo funcionan estas tecnologías y cómo asegurarte de que tu web sea compatible con ellas.

### Escuchar la web: lectores de pantalla y sintetizadores de voz

Las personas con discapacidad visual muchas veces no ven la pantalla, pero sí pueden **escuchar** su contenido gracias a programas especiales. Estos convierten el texto en voz y permiten navegar por sitios web.

Entre los más usados están:

- **JAWS** (Windows): muy potente, pero de pago.
- **NVDA** (Windows): gratuito y muy completo.
- **VoiceOver** (Apple): ya viene con iPhone, iPad o Mac.
- **TalkBack** (Android): integrado en la mayoría de móviles Android.

🧠 **Ejemplo práctico**: Si una imagen no tiene texto alternativo, el lector de pantalla solo dirá "imagen", dejando al usuario sin contexto.

Por eso es clave:

- Añadir **texto alternativo** útil a las imágenes.
- Usar bien los **encabezados** (H1, H2, etc.) para organizar el contenido.
- Aplicar **roles ARIA** en elementos dinámicos como botones o menús desplegables.

### Hablar con la web: control por voz y asistentes virtuales

Para algunas personas, escribir o usar el ratón es complicado o imposible. Ahí entra el **control por voz**: una forma de manejar el ordenador hablando.

Herramientas como:

- **Dragon NaturallySpeaking** permiten escribir y controlar el PC con comandos hablados.
- **Siri**, **Google Assistant** y **Alexa** también ayudan a navegar, buscar y ejecutar acciones con la voz.

🧠 **Ejemplo real**: Una persona con movilidad reducida puede decir "abrir correo" o "buscar recetas de pasta" sin tocar el teclado.

### Moverse sin manos: otras formas de interactuar

Hay muchas formas de usar un ordenador sin necesidad de teclado o ratón.

- **Switches**: pequeños botones que se activan con un leve movimiento.
- **Eye-tracking**: el cursor sigue el movimiento de los ojos. Ideal para personas con parálisis.
- **Dispositivos Braille**: transforman el texto de la pantalla en puntos táctiles que se pueden leer con los dedos.

🧠 **Imagina** controlar toda una página web solo con la mirada o tocando un botón con la rodilla. Para algunas personas, esa es su única vía de acceso.

### Hacer accesibles también las apps móviles

La accesibilidad no es solo para sitios web. Las **aplicaciones móviles** también deben ser fáciles de usar para todos.

Claves para lograrlo:

- Botones grandes y bien espaciados.
- Compatibilidad con lectores de pantalla y control por voz.
- Gestos táctiles simples e intuitivos.

Además, existen herramientas como:

- **Android Accessibility API** y **Apple Accessibility API**, que ayudan a los desarrolladores a que sus apps funcionen con tecnologías de asistencia.
- Frameworks como **React** o **Angular**, que ofrecen buenas prácticas para implementar accesibilidad desde el código.

## 🧠 Recapitulando los puntos clave

1. Los lectores de pantalla convierten texto en voz y necesitan páginas bien estructuradas.
2. El control por voz es vital para personas con movilidad reducida.
3. Existen tecnologías como eye-tracking y Braille que permiten usar la web sin manos ni vista.
4. Las apps móviles deben ser accesibles desde el diseño: botones grandes, texto legible, gestos claros.
5. APIs y frameworks modernos facilitan que todo lo anterior sea posible desde el desarrollo.

## 🧪 ¿Y si lo pruebas tú?

Haz este pequeño reto:

1. Entra en un sitio web y navega solo usando el teclado (Tab y Enter).
2. Prueba un lector de pantalla gratuito como NVDA o activa VoiceOver si tienes Mac.
3. Usa tu móvil para buscar algo solo con comandos de voz.
4. Piensa cómo podrías mejorar ese sitio para que fuera más cómodo de usar.

👉 Diseñar con accesibilidad en mente no solo mejora la vida de quienes tienen una discapacidad. Hace que la web sea mejor para todos: más clara, más usable y más humana.

### **📝 Flashcards para Memorizar el Contenido**

Aquí tienes una serie de flashcards para ayudar a recordar los conceptos clave:

### **1️⃣ Flashcard: Lectores de Pantalla**

🧐 **Pregunta:** Menciona dos lectores de pantalla populares y en qué sistemas operativos funcionan.

✅ **Respuesta:** JAWS (Windows) y VoiceOver (Apple).

### **2️⃣ Flashcard: Uso del Control por Voz**

🧐 **Pregunta:** ¿Qué tecnologías permiten controlar dispositivos mediante la voz?

✅ **Respuesta:** Dragon NaturallySpeaking, Siri, Google Assistant y Alexa.

### **3️⃣ Flashcard: Dispositivos de Asistencia**

🧐 **Pregunta:** ¿Qué tecnologías pueden usar personas con discapacidades motoras para navegar en la web?

✅ **Respuesta:** Switches, eye-tracking y dispositivos Braille.

### **4️⃣ Flashcard: Accesibilidad en Apps Móviles**

🧐 **Pregunta:** ¿Qué características debe tener una aplicación móvil accesible?

✅ **Respuesta:** Botones grandes, compatibilidad con lectores de pantalla y gestos táctiles intuitivos.

### **5️⃣ Flashcard: APIs y Frameworks**

🧐 **Pregunta:** ¿Qué APIs permiten mejorar la accesibilidad en apps móviles?

✅ **Respuesta:** Android Accessibility API y Apple Accessibility API.

### **🛠 Actividad Práctica para Aplicar lo Aprendido**

💡 **Título:** "Explorando Tecnologías de Asistencia en la Web"

🎯 **Objetivo:** Identificar y probar tecnologías de asistencia para mejorar la accesibilidad web.

🔹 **Instrucciones:**

1. **Prueba un lector de pantalla:** Usa NVDA (Windows) o VoiceOver (Mac) para navegar por un sitio web.
2. **Controla un dispositivo con la voz:** Usa Siri, Google Assistant o Alexa para realizar una búsqueda en la web.
3. **Simula la navegación sin ratón:** Usa solo el teclado para interactuar con una página web (tecla Tab y Enter).
4. **Investiga APIs de accesibilidad:** Busca información sobre cómo integrar accesibilidad en una app con React o Angular.
5. **Registra tus observaciones y discute en clase:** Comparte dificultades encontradas y posibles mejoras.

🔹 **Materiales Necesarios:**

✅ Un ordenador con NVDA o VoiceOver activado.

✅ Un teléfono con Google Assistant, Siri o Alexa.

✅ Un navegador web para pruebas con teclado.

✅ Documento para registrar observaciones.