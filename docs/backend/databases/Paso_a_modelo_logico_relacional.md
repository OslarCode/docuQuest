# Paso a modelo lógico relacional

## 6.1. Diferencia entre modelo conceptual y modelo lógico

| Conceptual                              | Lógico relacional                                    |
| --------------------------------------- | ---------------------------------------------------- |
| Lenguaje orientado a negocio            | Lenguaje orientado a base de datos relacional        |
| Entidades y relaciones                  | Tablas y claves                                      |
| Cardinalidades expresadas gráficamente  | Claves primarias y foráneas, restricciones           |
| Independiente de la tecnología          | Aún agnóstico de motor, pero ya con estructura firme |
| Ejemplo: “Alumno se matricula en Curso” | Tabla `matricula` con PK compuesta (alumno, curso)   |

En resumen: **lo conceptual describe, lo lógico estructura**.

## 6.2. Ejemplo base — Sistema académico

Recordemos el ER del módulo anterior:

Entidades:

- Alumno
- Curso
- Instructor
- Matrícula

Relaciones:

- Alumno 1:N Matrícula
- Curso 1:N Matrícula
- Curso 1:N Instructor (o 1:1 si solo hay un instructor por curso)

Vamos a transformarlo paso a paso en tablas lógicas.

## 6.3. Paso 1 — Crear una tabla por entidad fuerte

Cada **entidad principal** del modelo conceptual se convierte en **una tabla**.

Esto incluye todas las entidades que tienen existencia propia (no solo relaciones).

**Entidad Alumno → Tabla `alumno`**

| Columna           | Tipo lógico  | Restricciones       |
| ----------------- | ------------ | ------------------- |
| id_alumno         | entero       | PK, único, NOT NULL |
| nombre            | texto        | NOT NULL            |
| correo            | texto        | UNIQUE, NOT NULL    |
| fecha_inscripcion | fecha        | NOT NULL            |
| estado            | enum / texto | NOT NULL            |

**Entidad Curso → Tabla `curso`**

| Columna      | Tipo lógico | Restricciones       |
| ------------ | ----------- | ------------------- |
| id_curso     | entero      | PK, único, NOT NULL |
| nombre       | texto       | NOT NULL            |
| duracion     | entero      | NOT NULL            |
| fecha_inicio | fecha       | NOT NULL            |

**Entidad Instructor → Tabla `instructor`**

| Columna       | Tipo lógico | Restricciones       |
| ------------- | ----------- | ------------------- |
| id_instructor | entero      | PK, único, NOT NULL |
| nombre        | texto       | NOT NULL            |
| correo        | texto       | UNIQUE, NOT NULL    |

Hasta aquí no hay relaciones, solo estructura base.

## 6.4. Paso 2 — Traducir relaciones 1:N

Regla práctica:

La **clave primaria** de la entidad del lado “1” se convierte en **clave foránea** en la tabla del lado “N”.

Ejemplo:

- Un `Curso` tiene muchos `Alumnos` a través de `Matrícula`.
- Un `Alumno` tiene muchas `Matrículas`.

Entonces, la relación conceptual `Alumno — Matrícula — Curso` se traduce en **una tabla `matricula`**:

| Columna          | Tipo lógico           | Restricciones                                  |
| ---------------- | --------------------- | ---------------------------------------------- |
| id_alumno        | entero                | FK → alumno.id_alumno, NOT NULL                |
| id_curso         | entero                | FK → curso.id_curso, NOT NULL                  |
| fecha_matricula  | fecha                 | NOT NULL                                       |
| estado_matricula | texto                 | NOT NULL                                       |
| PRIMARY KEY      | (id_alumno, id_curso) | compuesta, para evitar duplicidad de matrícula |

Notas:

- No es necesario un `id_matricula` artificial, porque la combinación alumno+curso ya identifica unívocamente una matrícula.
- Este es un caso típico de **relación N:N convertida en tabla intermedia**.

## 6.5. Paso 3 — Traducir relaciones 1:1

Si un `Curso` tiene un `Instructor` responsable (relación 1:1), hay dos opciones:

- **Opción A (FK en Curso)**:
  Si cada curso tiene un instructor, pero un instructor puede impartir varios cursos (1:N),
  se añade `id_instructor` en `curso`.
- **Opción B (tabla aparte)**:
  Si la relación es estrictamente 1:1 (por ejemplo, información separada sensible), se crea una tabla independiente y se usa PK=FK.

Vamos a usar **Opción A (más realista)**:

Tabla

```
curso
```

modificada

---

id_curso (PK)

---

nombre

---

duracion

---

fecha_inicio

---

id_instructor (FK → instructor.id_instructor)

---

Esto significa:

- Cada curso tiene exactamente un instructor.
- Un instructor puede estar en varios cursos (1:N).

## 6.6. Paso 4 — Definir claves y restricciones de integridad

En el modelo lógico debemos dejar claras las reglas:

| Tabla      | PK                    | FKs y reglas de integridad                                                       |
| ---------- | --------------------- | -------------------------------------------------------------------------------- |
| alumno     | id_alumno             | —                                                                                |
| curso      | id_curso              | id_instructor → instructor.id_instructor (ON UPDATE CASCADE, ON DELETE RESTRICT) |
| instructor | id_instructor         | —                                                                                |
| matricula  | (id_alumno, id_curso) | id_alumno → alumno.id_alumno, id_curso → curso.id_curso                          |

Aunque aún no usamos sintaxis SQL, **este modelo es suficientemente detallado** como para implementarlo en cualquier motor (PostgreSQL, MySQL, SQLite, etc.) sin ambigüedades.

## 🧪 6.7. Ejercicio práctico guiado — Biblioteca (del módulo anterior)

Vamos a convertir el **modelo conceptual de biblioteca** a su **modelo lógico**:

**Entidades base:**

- Libro
- Ejemplar
- Socio
- Préstamo

**Relaciones:**

- Libro 1:N Ejemplar
- Socio 1:N Préstamo
- Ejemplar 1:N Préstamo

Resultado:

Tabla

```
libro
```

---

id_libro (PK)

---

titulo

---

autor

---

isbn (UNIQUE)

---

editorial

---

anio

---

Tabla

```
ejemplar
```

---

id_ejemplar (PK)

---

id_libro (FK → libro.id_libro)

---

estado

---

Tabla

```
socio
```

---

id_socio (PK)

---

nombre

---

correo (UNIQUE)

---

Tabla

```
prestamo
```

---

id_prestamo (PK)

---

id_socio (FK → socio.id_socio)

---

id_ejemplar (FK → ejemplar.id_ejemplar)

---

fecha_inicio

---

fecha_devolucion_prev

---

estado

---

Observa cómo las relaciones N:N no existen aquí porque ya fueron **resueltas en el modelo conceptual**.

## 6.8. Buenas prácticas en el paso a modelo lógico

- Usa **PK compuestas** cuando la relación intermedia ya identifica de por sí una fila (como matrícula).
- No generes IDs artificiales innecesarios.
- Usa nombres consistentes: `id_entidad` en todos lados.
- Define la dirección de las FKs de forma explícita.
- Documenta las políticas de ON DELETE / ON UPDATE aunque no las implementes todavía.
- Usa ENUMs o dominios controlados para valores fijos (ej. `estado`).

## Errores comunes de principiantes

- Duplicar claves sin necesidad.
- No marcar PK y FK claramente → confusión al generar el SQL.
- No documentar qué pasa si se borra una entidad padre (¿se borran hijos?, ¿se restringe?).
- Usar nombres diferentes para la misma FK en varias tablas.
- Añadir columnas innecesarias por no entender bien la cardinalidad.
