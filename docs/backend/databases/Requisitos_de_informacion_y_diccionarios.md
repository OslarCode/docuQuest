# Requisitos de información y diccionarios de datos

## 4.1. El error más común: empezar por las tablas

Muchos principiantes abren su editor, crean una tabla `usuarios`, otra `productos`… y luego se dan cuenta de que:

- Les faltan atributos importantes,
- Hay relaciones mal definidas,
- Surgen duplicados o inconsistencias,
- O lo peor: tienen que rehacer todo el esquema.

Por eso, antes de escribir **una sola línea de definición de tabla**, necesitamos:

1. Analizar **qué información** hay que representar,
2. Extraer **entidades, atributos y relaciones**,
3. Crear un **diccionario de datos**,
4. Y asegurar que **todo tiene sentido funcional**.

## 4.2. Qué son los requisitos de información

Los **requisitos de información** no son tablas, son **hechos que el sistema debe ser capaz de almacenar y consultar**.

Ejemplo: imaginemos que queremos crear un sistema para gestionar un **centro de formación**.

Requisitos iniciales:

- Hay **alumnos** con nombre, correo, fecha de inscripción y estado.
- Cada alumno puede matricularse en varios **cursos**.
- Cada curso tiene un nombre, duración y fecha de inicio.
- Cada matrícula tiene una fecha y un estado.
- Cada curso tiene un **instructor** responsable.

Nota: aquí todavía no hemos hablado de tablas, solo de **información que debe ser representada**.

## 4.3. Extracción de entidades y atributos

A partir de los requisitos, **identificamos las entidades principales** (sustantivos del dominio):

- Alumno
- Curso
- Instructor
- Matrícula (relación entre Alumno y Curso)

Luego **detallamos sus atributos**:

**Alumno**

- id_alumno (identificador único)
- nombre
- correo
- fecha_inscripcion
- estado

**Curso**

- id_curso
- nombre
- duracion
- fecha_inicio

**Instructor**

- id_instructor
- nombre
- correo

**Matrícula** (relación entre Alumno y Curso)

- id_alumno (FK)
- id_curso (FK)
- fecha_matricula
- estado_matricula

Ya tenemos un **modelo conceptual textual**.

## 4.4. Diccionario de datos — definición

El **diccionario de datos** es un documento estructurado donde:

- Se listan **todas las entidades** del sistema,
- Se definen sus **atributos**, tipos y restricciones,
- Se describe **el significado** de cada campo,
- Y se anotan las **relaciones y reglas** relevantes.

No es código, es documentación viva.

Es **la referencia base** para quien diseña, desarrolla o mantiene la base de datos.

## 4.5. Ejemplo real de diccionario de datos (formato tabla)

| Entidad    | Atributo          | Tipo conceptual     | Descripción                                 | Obligatorio | Clave |
| ---------- | ----------------- | ------------------- | ------------------------------------------- | ----------- | ----- |
| Alumno     | id_alumno         | Identificador único | Identifica de forma unívoca al alumno       | ✅          | PK    |
| Alumno     | nombre            | Texto               | Nombre completo del alumno                  | ✅          |       |
| Alumno     | correo            | Texto (email)       | Correo de contacto del alumno               | ✅          | AK    |
| Alumno     | fecha_inscripcion | Fecha               | Fecha en que se inscribió                   | ✅          |       |
| Alumno     | estado            | Texto (enum)        | Estado del alumno (activo/inactivo/baja)    | ✅          |       |
| Curso      | id_curso          | Identificador único | Identifica un curso                         | ✅          | PK    |
| Curso      | nombre            | Texto               | Nombre del curso                            | ✅          |       |
| Curso      | duracion          | Número (horas)      | Duración total en horas                     | ✅          |       |
| Curso      | fecha_inicio      | Fecha               | Fecha de inicio                             | ✅          |       |
| Instructor | id_instructor     | Identificador único | Identifica un instructor                    | ✅          | PK    |
| Instructor | nombre            | Texto               | Nombre del instructor                       | ✅          |       |
| Instructor | correo            | Texto (email)       | Correo del instructor                       | ✅          | AK    |
| Matrícula  | id_alumno         | FK → Alumno         | Referencia al alumno                        | ✅          | PK1   |
| Matrícula  | id_curso          | FK → Curso          | Referencia al curso                         | ✅          | PK2   |
| Matrícula  | fecha_matricula   | Fecha               | Fecha en que se matriculó                   | ✅          |       |
| Matrícula  | estado_matricula  | Texto (enum)        | Estado de la matrícula (activa, cancelada…) | ✅          |       |

Este diccionario:

- Nos dice **qué es obligatorio y qué no**,
- Distingue claves primarias, alternativas y foráneas,
- Y documenta las reglas de negocio sin necesidad de abrir el código.

## 4.6. Ejercicio práctico guiado — Crear tu propio diccionario de datos

### Objetivo:

Diseñar un modelo conceptual para un **sistema de gestión de biblioteca**.

### Requisitos (texto libre simulado):

- Hay libros, con título, autor, ISBN, editorial y año.
- Cada libro puede tener varios ejemplares.
- Cada ejemplar puede estar prestado o disponible.
- Hay socios que pueden tomar libros en préstamo.
- Cada préstamo tiene una fecha de inicio, una fecha de devolución prevista y un estado.
- Cada socio tiene un correo y un número de socio único.

Paso 1: Identificar entidades

- Libro
- Ejemplar
- Socio
- Préstamo

Paso 2: Identificar atributos y relaciones

- Libro (1) — Ejemplar (N)
- Socio (1) — Préstamo (N)
- Ejemplar (1) — Préstamo (N)

Paso 3: Crear diccionario de datos en VSCode en un archivo Markdown o CSV.

Por ejemplo: `diccionario_biblioteca.md`

```markdown
| Entidad  | Atributo              | Tipo conceptual     | Descripción                      | Obligatorio | Clave |
| -------- | --------------------- | ------------------- | -------------------------------- | ----------- | ----- |
| Libro    | id_libro              | Identificador único | Identifica el libro              | ✅          | PK    |
| Libro    | titulo                | Texto               | Título del libro                 | ✅          |       |
| Libro    | autor                 | Texto               | Autor principal                  | ✅          |       |
| Libro    | isbn                  | Texto (único)       | ISBN                             | ✅          | AK    |
| Libro    | editorial             | Texto               | Editorial                        | ✅          |       |
| Libro    | anio                  | Número              | Año de publicación               | ✅          |       |
| Ejemplar | id_ejemplar           | Identificador único | Identifica el ejemplar físico    | ✅          | PK    |
| Ejemplar | id_libro              | FK → Libro          | Referencia al libro              | ✅          |       |
| Ejemplar | estado                | Texto (enum)        | disponible / prestado / retirado | ✅          |       |
| Socio    | id_socio              | Identificador único | Identifica al socio              | ✅          | PK    |
| Socio    | nombre                | Texto               | Nombre del socio                 | ✅          |       |
| Socio    | correo                | Texto (email)       | Correo de contacto               | ✅          | AK    |
| Prestamo | id_prestamo           | Identificador único | Identifica el préstamo           | ✅          | PK    |
| Prestamo | id_socio              | FK → Socio          | Socio que realiza el préstamo    | ✅          |       |
| Prestamo | id_ejemplar           | FK → Ejemplar       | Ejemplar prestado                | ✅          |       |
| Prestamo | fecha_inicio          | Fecha               | Fecha de inicio                  | ✅          |       |
| Prestamo | fecha_devolucion_prev | Fecha               | Fecha prevista de devolución     | ✅          |       |
| Prestamo | estado                | Texto (enum)        | activo / devuelto / retrasado    | ✅          |       |
```

Este documento puede mantenerse versionado en Git igual que el código.

Sirve como **contrato de diseño** entre analistas, desarrolladores y DBA.

## 🧠 4.7. Beneficios de trabajar con un diccionario de datos

- Evita improvisar tablas sin contexto.
- Aclara desde el principio qué es obligatorio y qué no.
- Identifica las claves y relaciones antes de definirlas técnicamente.
- Facilita la validación temprana con usuarios o stakeholders.
- Sirve de base para la generación automática de esquemas en motores reales.

## 4.8. Buenas prácticas

- Mantén **una sola fuente de verdad** para nombres de entidades y atributos.
- Usa nombres consistentes y legibles (nada de “tbl_usr” o “t1”).
- Usa un formato legible y versionable (Markdown, CSV o YAML).
- Marca claramente qué atributos son clave primaria, foránea o alternativa.
- Incluye las reglas de negocio esenciales (por ejemplo, “un socio no puede tener más de 5 préstamos activos”).

## Errores comunes

- Saltarse este paso y empezar a crear tablas a lo loco.
- No definir claves ni obligatoriedad desde el principio.
- Usar nombres distintos para el mismo atributo en diferentes tablas.
- Olvidar documentar reglas que después quedan “escondidas” en código.
