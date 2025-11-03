# Diseño y documentación de APIs web

# Diseñar y documentar APIs web sin perderse en el camino

Cuando desarrollas software, las APIs web son como puentes que conectan diferentes partes de una aplicación o distintos sistemas. Pero no basta con que funcionen: deben estar bien diseñadas, documentadas y probadas.

## Diseñar una API bien pensada desde el principio

Antes de escribir una sola línea de código, es importante tener claro qué necesitas que haga tu API. ¿Qué datos va a ofrecer? ¿Quién la usará? ¿Cómo esperas que interactúen con ella? Una vez respondas esas preguntas, puedes empezar a planificar cómo se verán los recursos y cómo se organizarán.

Por ejemplo, si tu API gestiona usuarios, es mejor usar una ruta como `/users` que algo como `/getUsers`. Es más limpio, y ya sabemos que se trata de un recurso. Si luego quieres obtener un usuario específico, simplemente accedes a `/users/5`.

También es importante que uses bien los métodos HTTP. Usa `GET` para leer, `POST` para crear, `PUT` para actualizar y `DELETE` para eliminar. Así cualquier desarrollador entenderá lo que hace tu API sin tener que revisar documentación a cada paso.

Además, responde siempre con códigos HTTP claros: un `200` significa éxito, un `404` indica que no se encontró lo que pediste, y un `500` refleja que algo falló en el servidor. Acompaña esos códigos con mensajes útiles, como “El usuario no existe” o “Faltan datos”, para que quien use tu API sepa cómo actuar.

Y no olvides la seguridad: proteger tu API con autenticación es vital. Un método como OAuth ayuda a controlar quién puede acceder y qué puede hacer. También es buena idea permitir que quien usa tu API pueda filtrar, ordenar y paginar los resultados cuando trabaja con muchos datos.

## Documentar tu API como si tú mismo fueras a usarla

Una API sin documentación es como una máquina sin manual: tal vez funcione, pero nadie sabrá cómo. Aquí es donde entra **OpenAPI**, un estándar para describir cómo funciona una API. Puedes pensar en él como una hoja de instrucciones muy detallada y fácil de seguir.

Con OpenAPI puedes definir tus rutas, los métodos que soportan, los datos que esperan y las respuestas que devuelven. Y lo mejor es que puedes hacerlo en un archivo sencillo en formato YAML o JSON.

Si usas herramientas como **Swagger Editor**, puedes escribir tu documentación mientras ves cómo se genera en tiempo real. Luego, con **Swagger UI**, obtienes una página web interactiva donde cualquiera puede probar tu API sin necesidad de programar. Es como tener una demo en vivo que responde a cada clic.

Además, puedes generar automáticamente clientes para distintos lenguajes (como JavaScript, Python o Java), ahorrando tiempo y evitando errores.

## Versionar tu API sin romper lo que ya funciona

Las APIs evolucionan, y eso está bien. Pero si cambias una API sin avisar, puedes romper aplicaciones que ya dependen de ella. Por eso, es buena práctica **versionar tu API**.

La forma más común de hacerlo es indicar la versión en la URL, como `/v1/users` o `/v2/users`. También puedes hacerlo en las cabeceras de las peticiones, aunque esto puede ser menos intuitivo.

Lo importante es que cada versión tenga su propia documentación y soporte. Si decides dejar de usar una versión, debes avisar con tiempo y explicar cómo migrar a la nueva. Esto genera confianza y facilita el trabajo de quienes usan tu API.

## Probar tu API para asegurarte de que realmente funciona

Diseñar y documentar son solo parte del trabajo. Una buena API debe estar **bien probada** para evitar sorpresas en producción. Hay varios tipos de pruebas que deberías hacer.

Primero, verifica que cada ruta funcione como debe. Si pides datos válidos, deberían llegar correctamente. Si haces algo mal, como enviar datos vacíos, la API debería decirte qué corregir.

También necesitas ver cómo se comporta la API cuando trabaja con otros sistemas. Por ejemplo, si depende de una base de datos externa o de otra API, asegúrate de que la conexión sea estable.

No olvides las pruebas de carga: ¿qué pasa si 100 personas usan tu API al mismo tiempo? ¿Y 1000? Herramientas como **JMeter** pueden simular ese escenario.

Finalmente, revisa la seguridad: prueba que los usuarios no puedan acceder a datos sin permiso. Herramientas como **Postman**, **Hoppscotch**, **Newman** o **OWASP ZAP** son excelentes aliados para hacer todo esto.

Si automatizas estas pruebas e integras todo en un sistema de despliegue continuo (CI/CD), evitarás muchos errores antes de que lleguen a los usuarios reales.

## Mantener la documentación siempre actualizada

Tu API va a cambiar con el tiempo. Y cuando lo haga, debes asegurarte de que la documentación también cambie. Aquí es donde OpenAPI vuelve a brillar.

Si documentas tu API con OpenAPI desde el principio, puedes actualizar fácilmente el archivo de especificaciones cada vez que haces un cambio. Y si usas Git, puedes llevar un control de esas actualizaciones como lo haces con el código.

Incluso puedes conectar tus anotaciones en el código a herramientas que generen documentación automáticamente. Así te aseguras de que nadie se quede con instrucciones antiguas o incompletas.

También es buena práctica avisar con anticipación cuando vas a eliminar una versión de la API, y ofrecer una guía clara para migrar. Eso demuestra responsabilidad y respeto por quienes usan tu tecnología.

## Programas y herramientas gratuitas para documentar APIs

- Redoc (open source): genera una documentación HTML limpia a partir de OpenAPI.
- Swagger UI y Swagger Editor (open source): edición y visualización interactiva de OpenAPI.
- Stoplight Elements (open source): visor de OpenAPI moderno; Prism (mock server) y Spectral (linter) también son gratuitos.
- OpenAPI Generator y Swagger Codegen (open source): generan SDKs/servidores desde OpenAPI.
- Hoppscotch e Insomnia (free): clientes para explorar y probar APIs; pueden leer colecciones/OpenAPI.
- Slate, Shins, Widdershins (open source): transforman especificaciones en sitios estáticos tipo manual.
- RapiDoc / RapiPdf (open source): web components para renderizar OpenAPI en páginas.
- MkDocs + plugins de OpenAPI o Docusaurus + plugins: pipelines gratuitos para portales de documentación.

## Conclusión: una API bien hecha no se nota… porque simplemente funciona

Cuando una API está bien diseñada, documentada y probada, lo notas enseguida: es fácil de entender, responde bien y te da lo que necesitas sin complicaciones.

Seguir buenas prácticas como las que acabas de leer no solo mejora la experiencia de otros desarrolladores, también hace que tu proyecto sea más estable, profesional y preparado para crecer.

**¿Qué tipo de experiencia estás ofreciendo hoy con tu API? ¿Te animas a mejorarla y convertirla en una herramienta que los demás disfruten usar?**

### **Práctica guiada: Documentación de una API REST con OpenAPI (Swagger Editor)**

**Contexto:**

Vas a documentar una API REST ficticia construida con Node.js, Express y SQLite que gestiona una colección de libros. La API ya está desarrollada, pero carece de documentación. Tu tarea será describirla usando OpenAPI 3.0 en Swagger Editor.

**Enunciado:**

Imagina que tienes una API con las siguientes características:

- **Base URL:** `https://api.ejemplo-libros.com/v1`
- **Recurso:** `libros`
- **Endpoints:**
  1. `GET /libros` → Devuelve lista de libros (con paginación opcional: `page`, `limit`).
  2. `GET /libros/{id}` → Devuelve un libro por ID.
  3. `POST /libros` → Crea un nuevo libro (necesita `titulo`, `autor`, `anio`).
  4. `PUT /libros/{id}` → Actualiza un libro completo.
  5. `DELETE /libros/{id}` → Elimina un libro.
- **Ejemplo de objeto libro:**

```json
{
  "id": 1,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez",
  "anio": 1967
}
```

- **Códigos de respuesta comunes:**
  - `200` OK
  - `201` Created
  - `400` Datos inválidos
  - `404` Libro no encontrado
  - `500` Error interno

**Objetivos de aprendizaje:**

1. Escribir una especificación OpenAPI 3.0 para una API REST existente.
2. Definir rutas, métodos, parámetros y respuestas.
3. Usar componentes reutilizables para esquemas y respuestas.
4. Probar la documentación en Swagger UI de forma interactiva.

**Materiales necesarios:**

- Editor de texto o IDE.
- Swagger Editor online: https://editor.swagger.io/.
- Conocimientos básicos de YAML/JSON.

**Paso 1: Estructura básica del documento OpenAPI**
Comienza creando la estructura básica en YAML dentro de Swagger Editor:

```yaml
openapi: 3.0.0
info:
  title: API de Libros
  description: API para gestionar una biblioteca de libros
  version: 1.0.0
servers:
  - url: <https://api.ejemplo-libros.com/v1>
    description: Servidor de producción
paths: {}
components:
  schemas: {}
  responses: {}
  parameters: {}
```

**Paso 2: Definir el esquema del libro**
En la sección `components/schemas`, define la estructura del recurso libro:

```yaml
components:
  schemas:
    Libro:
      type: object
      required:
        - id
        - titulo
        - autor
        - anio
      properties:
        id:
          type: integer
          format: int64
          example: 1
        titulo:
          type: string
          example: "Cien años de soledad"
        autor:
          type: string
          example: "Gabriel García Márquez"
        anio:
          type: integer
          example: 1967
```

**Paso 3: Definir respuestas comunes**
Crea respuestas reutilizables en `components/responses`:

```yaml
components:
  responses:
    NotFound:
      description: El recurso solicitado no fue encontrado
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Libro no encontrado"
    ValidationError:
      description: Datos de entrada inválidos
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Datos de entrada inválidos"
              detalles:
                type: array
                items:
                  type: string
```

**Paso 4: Definir parámetros comunes**
Crea parámetros reutilizables en `components/parameters`:

```yaml
components:
  parameters:
    IdLibro:
      name: id
      in: path
      required: true
      description: ID único del libro
      schema:
        type: integer
        format: int64
    Pagina:
      name: page
      in: query
      required: false
      description: Número de página para paginación
      schema:
        type: integer
        default: 1
    Limite:
      name: limit
      in: query
      required: false
      description: Límite de resultados por página
      schema:
        type: integer
        default: 10
```

**Paso 5: Documentar el endpoint GET /libros**
En la sección `paths`, documenta el primer endpoint:

```yaml
paths:
  /libros:
    get:
      summary: Obtener lista de libros
      description: Retorna una lista paginada de todos los libros disponibles
      parameters:
        - $ref: "#/components/parameters/Pagina"
        - $ref: "#/components/parameters/Limite"
      responses:
        "200":
          description: Lista de libros obtenida exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  pagina:
                    type: integer
                    example: 1
                  total:
                    type: integer
                    example: 50
                  libros:
                    type: array
                    items:
                      $ref: "#/components/schemas/Libro"
```

### **Continuación de pasos detallados**

**Paso 6: Documentar el endpoint GET /libros/`\{id\}`**

```yaml
/libros/{id}:
  get:
    summary: Obtener un libro específico
    description: Retorna un libro individual según su ID
    parameters:
      - $ref: "#/components/parameters/IdLibro"
    responses:
      "200":
        description: Libro obtenido exitosamente
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Libro"
      "404":
        $ref: "#/components/responses/NotFound"
```

**Paso 7: Documentar el endpoint POST /libros**

```yaml
post:
  summary: Crear un nuevo libro
  description: Añade un nuevo libro a la biblioteca
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - titulo
            - autor
            - anio
          properties:
            titulo:
              type: string
              example: "Rayuela"
            autor:
              type: string
              example: "Julio Cortázar"
            anio:
              type: integer
              example: 1963
  responses:
    "201":
      description: Libro creado exitosamente
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Libro"
    "400":
      $ref: "#/components/responses/ValidationError"
```

**Paso 8: Documentar el endpoint PUT /libros/`\{id\}`**

```yaml
put:
  summary: Actualizar un libro existente
  description: Reemplaza todos los datos de un libro existente
  parameters:
    - $ref: "#/components/parameters/IdLibro"
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          required:
            - titulo
            - autor
            - anio
          properties:
            titulo:
              type: string
              example: "Rayuela"
            autor:
              type: string
              example: "Julio Cortázar"
            anio:
              type: integer
              example: 1963
  responses:
    "200":
      description: Libro actualizado exitosamente
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Libro"
    "400":
      $ref: "#/components/responses/ValidationError"
    "404":
      $ref: "#/components/responses/NotFound"
```

**Paso 9: Documentar el endpoint DELETE /libros/`\{id\}`**

```yaml
delete:
  summary: Eliminar un libro
  description: Elimina permanentemente un libro de la biblioteca
  parameters:
    - $ref: "#/components/parameters/IdLibro"
  responses:
    "204":
      description: Libro eliminado exitosamente
    "404":
      $ref: "#/components/responses/NotFound"
```

**Paso 10: Probar la documentación en Swagger UI**

1. Copia el YAML completo en [Swagger Editor](https://editor.swagger.io/)
2. Observa la representación visual en el panel derecho
3. Prueba los endpoints de forma interactiva:
   - Expande GET /libros y haz clic en "Try it out"
   - Ejecuta la petición (aunque no tendrá respuesta real del servidor)
   - Prueba POST /libros con datos de ejemplo
   - Verifica que los esquemas y respuestas se muestren correctamente

**Paso 11: Validación final**

Verifica que:

- Todos los endpoints estén documentados
- Los códigos de respuesta sean apropiados para cada operación
- Los esquemas reutilizables se usen consistentemente
- Los ejemplos sean claros y representativos
- No haya errores de sintaxis YAML en Swagger Editor

**Ejercicio complementario:**
Modifica la documentación para añadir:

- Búsqueda por título en GET /libros (parámetro query `titulo`)
- Campo opcional `genero` en el esquema Libro
- Respuesta 500 para error interno del servidor