# Modulo 5. Modelado conceptual ER/UML

## 🧭 5.1. Qué es el modelado conceptual

El **modelo conceptual** representa las entidades y relaciones de un dominio **de forma gráfica y abstracta**, sin entrar todavía en detalles técnicos de SQL, tipos de datos o índices.

El objetivo es:

- Visualizar las **entidades** y sus **relaciones**,
- Expresar **cardinalidades** y **opcionalidades**,
- Alinear la visión de analistas, desarrolladores y responsables del proyecto,
- Prevenir errores de diseño antes de que lleguen a la base de datos real.

👉 En bases de datos relacionales, esto se suele hacer con:

- **Diagramas Entidad–Relación (ER)** tradicionales (Chen / Crow’s Foot)
- O **diagramas de clases UML** simplificados, si se prefiere un estilo orientado a objetos.

## 🧱 5.2. Elementos principales de un diagrama ER

1. **Entidad** → Representa un conjunto de objetos reales o abstractos.
   - Se dibuja como un rectángulo.
   - Ejemplo: `Alumno`, `Curso`, `Pedido`.
2. **Atributo** → Propiedad de la entidad.
   - Se puede representar dentro de la caja o con óvalos conectados.
   - Ejemplo: `nombre`, `correo`, `precio`.
3. **Clave primaria** → Atributo que identifica de forma única cada instancia.
   - Suele subrayarse o marcarse de forma destacada.
4. **Relación** → Asociación entre entidades.
   - Se representa con líneas o rombos.
   - Incluye cardinalidades (1:1, 1:N, N:N).
5. **Cardinalidades y opcionalidad** → Indican cuántas instancias de una entidad se asocian con la otra.
   - `1` obligatorio
   - `0..1` opcional
   - `0..*` muchos opcional
   - `1..*` muchos obligatorio

## 🏫 5.3. Ejemplo: Sistema de gestión académica (continuación del Módulo 4)

Tomamos el diccionario de datos del centro de formación:

Entidades:

- `Alumno`
- `Curso`
- `Instructor`
- `Matrícula`

Relaciones:

- Un **Alumno** puede tener muchas **Matrículas**
- Un **Curso** puede tener muchas **Matrículas**
- Cada **Matrícula** pertenece a exactamente **un Alumno** y **un Curso**
- Cada **Curso** tiene un **Instructor** responsable

👉 Observa:

- `Alumno` ↔ `Matrícula` es 1:N (un alumno tiene muchas matrículas, cada matrícula es de un solo alumno).
- `Curso` ↔ `Matrícula` es 1:N (igual lógica).
- `Curso` ↔ `Instructor` es 1:1 (un curso tiene un instructor principal; un instructor puede impartir varios cursos si el negocio lo permite —esto sería 1:N).

## ✏️ 5.4. Sintaxis de cardinalidades (Crow’s Foot)

| Notación       | Significado        |
| -------------- | ------------------ |
| 1 ———— 1       | Relación uno a uno |
| 1 ———— ∞       | Uno a muchos       |
| 0..1 ———— 1    | Uno opcional       |
| 0..\* ———— 1   | Muchos opcional    |
| 0.._ ———— 0.._ | Muchos a muchos    |

👉 Esta notación es práctica y clara para el análisis y documentación.

## 📊 5.5. Ejemplo UML (alternativa válida)

Si trabajas con equipos más cercanos a programación orientada a objetos, puedes usar **UML simplificado** para modelar entidades como clases:

```
+-----------------+       +----------------+
|     Alumno      |       |     Curso      |
+-----------------+       +----------------+
| id_alumno       |<>-----| id_curso       |
| nombre          |       | nombre         |
| correo          |       | fecha_inicio   |
+-----------------+       +----------------+

              +-------------------+
              |   Matrícula       |
              +-------------------+
              | id_alumno (FK)    |
              | id_curso (FK)     |
              | fecha_matricula   |
              +-------------------+

```

👉 UML no sustituye al ER clásico, pero puede ser útil cuando la base de datos se integrará directamente con código orientado a objetos.

## 🧰 5.6. Ejercicio práctico guiado — Crear un ER conceptual simple

📌 **Dominio**: sistema de biblioteca (el que usamos en Módulo 4)

Entidades:

- Libro
- Ejemplar
- Socio
- Préstamo

Relaciones:

- Libro (1) — Ejemplar (N)
- Socio (1) — Préstamo (N)
- Ejemplar (1) — Préstamo (N)

👉 Objetivo:

- Crear un diagrama ER con entidades, atributos y cardinalidades.
- Usar la notación Crow’s Foot.

Si quieres trabajar en local:

1. Crea una carpeta `modelo_biblioteca/`.
2. Añade `diccionario_biblioteca.md` (del módulo anterior).
3. Usa una herramienta gratuita para ER como:
   - **draw.io** (gratuita en navegador),
   - **DbDiagram.io** (sintaxis rápida tipo markdown),
   - o **Mermaid ER** directamente en VSCode.

Ejemplo con sintaxis **dbdiagram.io**:

```
Table Libro {
  id_libro int [pk]
  titulo varchar
  autor varchar
  isbn varchar [unique]
  editorial varchar
  anio int
}

Table Ejemplar {
  id_ejemplar int [pk]
  id_libro int [ref: > Libro.id_libro]
  estado varchar
}

Table Socio {
  id_socio int [pk]
  nombre varchar
  correo varchar [unique]
}

Table Prestamo {
  id_prestamo int [pk]
  id_socio int [ref: > Socio.id_socio]
  id_ejemplar int [ref: > Ejemplar.id_ejemplar]
  fecha_inicio date
  fecha_devolucion_prev date
  estado varchar
}

```

Esto genera automáticamente un diagrama ER con relaciones y cardinalidades.

## 🧠 5.7. Buenas prácticas en modelado conceptual

- Cada relación debe tener **una justificación funcional**, no se crean “por si acaso”.
- Define cardinalidades con precisión (evita dejar “N:N” si no sabes si es opcional u obligatorio).
- Usa nombres coherentes y consistentes con el diccionario de datos.
- El modelo conceptual **no incluye aún índices, triggers ni optimizaciones físicas**.
- No intentes resolver reglas de negocio complejas aquí: documenta la lógica y sigue.

## 🚨 Errores comunes de principiantes

- Crear relaciones circulares sin motivo.
- No diferenciar entre cardinalidad obligatoria y opcional.
- Confundir entidades con atributos (por ejemplo: poner “teléfono” como entidad separada sin necesidad).
- No usar una tabla intermedia para N:N.
- Cambiar nombres entre modelo conceptual y físico sin documentar.
