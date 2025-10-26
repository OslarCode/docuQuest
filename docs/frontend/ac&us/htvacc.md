# Módulo 11: Herramientas y Técnicas para la Validación de la Accesibilidad

## 🔍 ¿Cómo saber si tu web es realmente accesible?

Crear una web accesible es el primer paso. El segundo, igual de importante, es comprobar que realmente lo sea. Validar la accesibilidad significa evaluar si todas las personas, con o sin discapacidad, pueden usar tu sitio sin barreras. En este módulo verás cómo hacerlo con herramientas automáticas, pruebas manuales y buenas prácticas dentro del desarrollo.

### Detectar errores automáticamente: herramientas que te ayudan

Antes de pasar a las pruebas más humanas, conviene usar herramientas que escanean tu web en segundos y te muestran posibles fallos. No lo hacen todo, pero son una excelente primera revisión.

### Extensiones del navegador

Hay herramientas que puedes añadir a tu navegador y usar con solo un clic.

- **WAVE**: resalta los errores directamente en tu página y sugiere cómo solucionarlos.
- **Accessibility Insights**: desarrollada por Microsoft, evalúa accesibilidad paso a paso.

🧠 *Ejemplo práctico:* Abres tu web, activas WAVE, y ves que varias imágenes no tienen texto alternativo. Solución rápida: añadir esos `alt`.

### Aplicaciones más avanzadas

Si necesitas un análisis más profundo (incluso de muchas páginas a la vez), existen programas específicos.

- **SortSite**: revisa accesibilidad, enlaces rotos, SEO y más.

🧠 *Ejemplo real:* Una agencia puede usar SortSite para validar toda una web antes de lanzarla.

### Herramientas integradas en el navegador

Sin instalar nada, Chrome ya trae **Lighthouse**, una herramienta que evalúa accesibilidad y rendimiento.

🧠 *Tip útil:* Pulsa F12 → pestaña Lighthouse → “Generate report”.

### Las pruebas que no puede hacer una máquina

Las herramientas automáticas no lo detectan todo. Por eso es clave hacer pruebas manuales que simulen cómo navegan personas reales.

### Involucra a usuarios con discapacidad

Invita a personas con distintas discapacidades a probar tu web. Su experiencia directa es insustituible.

🧠 *Ejemplo:* Un usuario con baja visión puede señalar que el tamaño de letra no es suficiente o que los formularios confunden.

### Prueba a navegar solo con el teclado

Muchas personas no usan ratón. Si tú no puedes moverte bien por la web solo con Tab y Enter, imagina alguien que no tiene otra opción.

- Asegúrate de que el foco (ese contorno que indica dónde estás) se vea bien.
- Verifica que el orden de navegación tenga lógica.

### Usa lectores de pantalla

Un lector de pantalla transforma lo visual en audio. Si el contenido no está bien estructurado, el resultado es caótico.

- Escucha si el contenido se lee en orden.
- Revisa que los botones, enlaces e imágenes tengan descripciones claras.

🧠 *Herramientas recomendadas:* NVDA (Windows), VoiceOver (Mac).

### Prueba mientras desarrollas, no después

Lo ideal es que la accesibilidad no se valide solo al final, sino que esté presente durante todo el proceso de diseño y desarrollo.

### Haz que sea parte del ciclo

- Incluye criterios de accesibilidad desde los primeros bocetos.
- Usa validadores automáticos durante el desarrollo, no al terminar.

🧠 *Ejemplo:* Antes de terminar el HTML, prueba con Lighthouse y ajusta lo necesario en el momento.

### Haz auditorías periódicas

Pide a expertos externos que revisen la accesibilidad de forma integral. Su visión neutral puede detectar errores que se nos escapan.

## 📌 En resumen: ¿qué necesitas para validar bien?

1. **WAVE y Lighthouse** para análisis rápido de errores comunes.
2. **Usuarios reales** para evaluar la experiencia desde distintos puntos de vista.
3. **Navegación con teclado y lectores de pantalla** para probar accesibilidad real.
4. **Testing continuo durante el desarrollo**, no solo al final.
5. **Auditorías profesionales** para asegurarte de cumplir las normativas.

## 🧪 ¿Te atreves a ponerlo en práctica?

Haz la prueba tú mismo. Escoge una web cualquiera (o la tuya), y:

1. Analízala con WAVE o Lighthouse.
2. Navega solo con el teclado.
3. Activa un lector de pantalla.
4. Anota todo lo que encuentres.
5. Imagina cómo lo viviría alguien con discapacidad visual o motora.

✅ Validar accesibilidad no es complicado, pero sí requiere atención. Lo importante es no olvidarlo. Porque una web usable por todos no solo es mejor para quien tiene una discapacidad: es mejor para todos.

### **📝 Flashcards para Memorizar el Contenido**

Aquí tienes una serie de flashcards para ayudar recordar los conceptos clave:

### **1️⃣ Flashcard: WAVE**

🧐 **Pregunta:** ¿Qué es WAVE y para qué se usa?

✅ **Respuesta:** Es una herramienta de evaluación de accesibilidad web que resalta errores y sugiere mejoras.

### **2️⃣ Flashcard: Lighthouse**

🧐 **Pregunta:** ¿Qué tipo de análisis realiza Lighthouse?

✅ **Respuesta:** Evalúa accesibilidad, rendimiento y SEO en sitios web.

### **3️⃣ Flashcard: Navegación con Teclado**

🧐 **Pregunta:** ¿Por qué es importante probar la accesibilidad con teclado?

✅ **Respuesta:** Muchas personas con discapacidades dependen del teclado para navegar, por lo que es esencial que todas las funciones sean accesibles sin ratón.

### **4️⃣ Flashcard: Lectores de Pantalla**

🧐 **Pregunta:** ¿Cómo ayudan los lectores de pantalla en la accesibilidad web?

✅ **Respuesta:** Convierten el contenido visual en audio, permitiendo que usuarios con discapacidad visual accedan a la información.

### **5️⃣ Flashcard: Auditorías de Accesibilidad**

🧐 **Pregunta:** ¿Qué beneficios tienen las auditorías de accesibilidad?

✅ **Respuesta:** Ayudan a identificar problemas ocultos y aseguran el cumplimiento con normativas.

### **🛠 Actividad Práctica para Aplicar lo Aprendido**

💡 **Título:** "Validando la Accesibilidad de un Sitio Web"

🎯 **Objetivo:** Aplicar herramientas y técnicas de validación para evaluar la accesibilidad de una página web.

🔹 **Instrucciones:**

1. **Selecciona un sitio web** para evaluar su accesibilidad.
2. **Realiza un análisis automático** con herramientas como:
    - WAVE (extensión de navegador).
    - Lighthouse (herramienta de Chrome).
3. **Haz pruebas manuales**, verificando:
    - Navegación con teclado (sin usar ratón).
    - Compatibilidad con lectores de pantalla.
4. **Registra los problemas detectados** y propón mejoras.
5. **Comparte los hallazgos en clase** y discute soluciones para mejorar la accesibilidad del sitio.

🔹 **Materiales Necesarios:**

✅ Un navegador con herramientas de accesibilidad (Lighthouse, WAVE).

✅ Un lector de pantalla (NVDA, VoiceOver).

✅ Documento para registrar observaciones.