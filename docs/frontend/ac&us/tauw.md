# Tecnologías de Asistencia y su Uso en la Web

## ¿Qué son las tecnologías de asistencia y por qué importan?

Las tecnologías de asistencia son herramientas que ayudan a las personas con discapacidades a usar la web y las aplicaciones. No se trata solo de hacer un sitio agradable visualmente, sino de lograr que sea utilizable por todos, sin importar sus capacidades. Este módulo explica cómo funcionan estas tecnologías y cómo asegurarte de que tu web sea compatible con ellas.

### Escuchar la web: lectores de pantalla y sintetizadores de voz

Las personas con discapacidad visual pueden navegar por la web escuchando su contenido gracias a programas que convierten texto en voz.

Lectores de pantalla más usados:

- **JAWS** (Windows): muy completo, de pago.
- **NVDA** (Windows): gratuito y potente.
- **VoiceOver** (Apple): incluido en iPhone, iPad y Mac.
- **TalkBack** (Android): integrado en la mayoría de móviles Android.

**Ejemplo práctico:**
Si una imagen no tiene texto alternativo, el lector de pantalla solo dirá “imagen”, sin aportar contexto.

Buenas prácticas:

- Añadir texto alternativo útil a las imágenes.
- Usar encabezados bien estructurados (H1, H2, etc.).
- Aplicar roles ARIA cuando sea necesario en elementos dinámicos.

### Hablar con la web: control por voz y asistentes virtuales

Para algunas personas, escribir o usar el ratón resulta complicado o imposible. El control por voz permite manejar el dispositivo hablando.

Herramientas destacadas:

- **Dragon NaturallySpeaking** para dictado y control total.
- **Siri**, **Google Assistant** y **Alexa** para ejecutar acciones y búsquedas por voz.

**Ejemplo real:**
Una persona con movilidad reducida puede abrir apps o realizar búsquedas sin tocar el teclado.

### Moverse sin manos: otras formas de interactuar

Hay usuarios que navegan sin teclado ni ratón utilizando tecnologías alternativas:

- **Switches**: botones que se activan con pequeños movimientos.
- **Eye-tracking**: control mediante movimientos oculares.
- **Dispositivos Braille**: convierten el contenido en puntos táctiles para leer con los dedos.

**Ejercicio imaginativo:**
Piensa en navegar una web solo moviendo los ojos o presionando un botón con la rodilla. Para muchos, esa es la única vía de acceso digital.

### Accesibilidad también en apps móviles

Las aplicaciones móviles deben ser diseñadas para ser accesibles, igual que los sitios web.

Principios básicos:

- Botones grandes y bien separados.
- Compatibilidad con lectores de pantalla y control por voz.
- Gestos sencillos e intuitivos.

Herramientas para desarrolladores:

- **Android Accessibility API**
- **Apple Accessibility API**
- Frameworks como **React** o **Angular**, que ya incluyen buenas prácticas para accesibilidad.

## Puntos clave

1. Los lectores de pantalla requieren buena estructura y contenido accesible.
2. El control por voz es esencial para personas con movilidad reducida.
3. Tecnologías como eye-tracking y Braille permiten navegar sin manos ni vista.
4. Las apps móviles deben diseñarse con accesibilidad desde el inicio.
5. Las APIs de accesibilidad facilitan integrar estas herramientas en el código.

## Reto: pruébalo tú mismo

Pasos para experimentar la accesibilidad:

1. Navega un sitio solo con teclado (Tab y Enter).
2. Prueba NVDA en Windows o VoiceOver en Mac.
3. Usa comandos de voz en tu móvil para hacer una búsqueda.
4. Reflexiona: ¿cómo podrías mejorar el sitio que probaste?

Diseñar pensando en accesibilidad mejora la vida de muchos y hace la web más clara, usable y humana.
