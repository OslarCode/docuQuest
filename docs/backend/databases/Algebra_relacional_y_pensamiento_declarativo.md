# Álgebra relacional y pensamiento declarativo

## 9.1. Qué es el álgebra relacional

El álgebra relacional es:

- Un **conjunto de operaciones formales** sobre **relaciones** (tablas),
- Que produce **nuevas relaciones** como resultado,
- Sin necesidad de bucles ni iteraciones imperativas.

En otras palabras: **no le dices al motor cómo recorrer los datos**.

Le dices **qué resultado quieres obtener**, y el motor decide cómo conseguirlo.

Esto es **pensamiento declarativo**:

> “Quiero todos los alumnos inscritos en el curso X”
>
> no
>
> “Recorre cada alumno y compara si está en curso X”.

## 9.2. Relaciones como conjuntos

En álgebra relacional:

- Cada tabla es **un conjunto de tuplas** (filas),
- Las filas no tienen orden,
- Las operaciones devuelven también relaciones (tablas),
- Los duplicados no existen en el modelo formal (aunque SQL los permita por eficiencia).

Ejemplo (relación `Alumno`):

| id_alumno | nombre |
| --------- | ------ |
| 1         | Ana    |
| 2         | Luis   |
| 3         | Sara   |

Ejemplo (relación `Curso`):

| id_curso | nombre_curso   |
| -------- | -------------- |
| 10       | Bases de Datos |
| 20       | Redes          |

Ejemplo (relación `Matricula`):

| id_alumno | id_curso |
| --------- | -------- |
| 1         | 10       |
| 2         | 10       |
| 3         | 20       |

Cada tabla es un conjunto.

Las operaciones las combinan, filtran o transforman.

## 9.3. Operaciones fundamentales del álgebra relacional

Las operaciones básicas que todo motor implementa de forma interna son:

1. **Selección (σ)** — Filtra filas.
2. **Proyección (π)** — Selecciona columnas.
3. **Producto cartesiano (×)** — Combina todas las filas de dos relaciones.
4. **Unión (∪)** — Une dos relaciones compatibles.
5. **Diferencia (−)** — Elimina elementos de una relación presentes en otra.
6. **Renombramiento (ρ)** — Cambia el nombre de atributos o relaciones.

Y sobre estas:

7. **Join (⨝)** — combinación basada en condiciones.

8. **Intersección (∩)** — elementos comunes a dos relaciones.

9. **División (÷)** — casos específicos de correspondencia múltiple.

Vamos a verlas una por una con ejemplos reales.

## 9.4. Selección — σ (Condición)

```
σ condición (Relación)

```

Filtra las filas que cumplen una condición lógica.

Ejemplo:

“Quiero todos los alumnos que se llaman Ana”

```
σ nombre = 'Ana' (Alumno)

```

Resultado:

| id_alumno | nombre |
| --------- | ------ |
| 1         | Ana    |

Equivale a un `WHERE` en SQL.

Pero aquí no decimos cómo recorrer, solo declaramos la condición.

## 9.5. Proyección — π (Columnas)

```
π atributos (Relación)

```

Selecciona solo ciertas columnas (atributos) de la relación.

Ejemplo:

“Quiero solo los nombres de los alumnos”

```
π nombre (Alumno)

```

Resultado:

nombre

---

Ana

---

Luis

---

Sara

---

Equivale a un `SELECT columna`.

---

## 9.6. Producto cartesiano — ×

```
Relación1 × Relación2

```

Combina cada fila de la primera relación con **todas** las de la segunda.

Es la base de los joins.

Ejemplo:

```
Alumno × Curso

```

| id_alumno | nombre | id_curso | nombre_curso   |
| --------- | ------ | -------- | -------------- |
| 1         | Ana    | 10       | Bases de Datos |
| 1         | Ana    | 20       | Redes          |
| 2         | Luis   | 10       | Bases de Datos |
| 2         | Luis   | 20       | Redes          |
| 3         | Sara   | 10       | Bases de Datos |
| 3         | Sara   | 20       | Redes          |

No es eficiente en sí mismo, pero es **la base del JOIN**.

El JOIN es básicamente un producto cartesiano + filtro.

## 9.7. Unión — ∪

```
Relación1 ∪ Relación2

```

Une dos relaciones **compatibles** (mismo número y tipo de columnas) y elimina duplicados.

Ejemplo:

Supón dos grupos de alumnos:

```
π nombre (GrupoA) ∪ π nombre (GrupoB)

```

nombre

---

Ana

---

Luis

---

Sara

---

Carlos

---

Equivale a `SELECT ... UNION` en SQL.

## 🔸 9.8. Diferencia — −

```
Relación1 − Relación2

```

Devuelve las filas de la primera relación que no están en la segunda.

Ejemplo:

“Alumnos que no están matriculados en ningún curso”:

```
Alumno − π id_alumno (Matricula)

```

Equivalente a `NOT IN` en SQL.

## 9.9. Renombramiento — ρ

```
ρ NuevoNombre(Relación)

```

Sirve para evitar ambigüedades, por ejemplo, cuando se hace self join.

Ejemplo:

```
ρ A(Alumno)
ρ B(Alumno)
A × B

```

Así puedes combinar la misma tabla consigo misma sin confundir las columnas.

## 9.10. JOIN — ⨝

JOIN es una combinación **derivada** de producto cartesiano y selección.

```
R ⨝ condición S
≡ σ condición (R × S)

```

Ejemplo:

“Quiero ver los nombres de alumnos con los nombres de cursos en los que están matriculados”

```
Alumno ⨝ Alumno.id_alumno = Matricula.id_alumno
        ⨝ Matricula.id_curso = Curso.id_curso

```

Resultado:

| nombre | nombre_curso   |
| ------ | -------------- |
| Ana    | Bases de Datos |
| Luis   | Bases de Datos |
| Sara   | Redes          |

Esto es exactamente lo que hace SQL al ejecutar un `JOIN`.

## 9.11. Intersección — ∩

```
Relación1 ∩ Relación2

```

Devuelve las filas que están en ambas relaciones.

Ejemplo:

“Alumnos que están tanto en el curso de BD como en Redes”

```
π id_alumno (Matricula WHERE id_curso = 10)
∩
π id_alumno (Matricula WHERE id_curso = 20)

```

Equivale a `INTERSECT` en SQL (no todos los motores lo soportan directamente).

## 9.12. División — ÷ (un poco más avanzada)

La **división** es útil cuando necesitas responder:

> “Quiero todos los alumnos que están matriculados en todos los cursos requeridos.”

```
Alumno ÷ CursosRequeridos

```

Ejemplo:

Cursos requeridos: `{10, 20}`

Si Ana está en ambos y Luis solo en uno…

Resultado:

| id_alumno | nombre |
| --------- | ------ |
| 1         | Ana    |

La división es menos conocida pero **muy útil para consultas de cobertura**.

## 9.13. Ejercicio práctico guiado — Sistema de biblioteca

Relaciones:

- `Libro(id_libro, titulo, autor)`
- `Socio(id_socio, nombre)`
- `Prestamo(id_prestamo, id_socio, id_libro, fecha_inicio, estado)`

Ejemplos de operaciones:

1. **Socios con préstamos activos**

```
σ estado = 'activo' (Prestamo) ⨝ Socio

```

1. **Títulos de libros prestados actualmente**

```
π titulo (Libro ⨝ Libro.id_libro = Prestamo.id_libro σ estado = 'activo' (Prestamo))

```

1. **Socios que no tienen préstamos activos**

```
Socio − π id_socio (σ estado = 'activo' (Prestamo))

```

Todas estas operaciones son **independientes del motor**.

Este es exactamente el razonamiento que el optimizador de consultas hace antes de ejecutar.

## 9.14. Pensamiento declarativo vs imperativo

| Imperativo (mal enfoque)                              | Declarativo (enfoque relacional)                         |
| ----------------------------------------------------- | -------------------------------------------------------- |
| “Recorre cada alumno y busca si tiene matrícula en X” | “Selecciona los alumnos donde existe una matrícula en X” |
| “Para cada pedido, busca productos y súmalos”         | “Suma el total de productos agrupados por pedido”        |
| “Borra filas una a una en un bucle”                   | “Borra todas las filas que cumplan esta condición”       |

En bases de datos relacionales, **el rendimiento real lo da el optimizador**, no tu bucle.

## 9.15. Buenas prácticas al pensar en álgebra relacional

- Formula tus consultas como **problemas de conjuntos**.
- Reduce JOINs innecesarios → muchas veces puedes expresar la misma lógica de forma más limpia.
- Usa proyecciones (`π`) para limitar atributos lo antes posible.
- Aplica selecciones (`σ`) tempranas para reducir el tamaño de las relaciones intermedias.
- La división (`÷`) es poderosa para consultas complejas de cobertura.

## Errores comunes

- Escribir consultas como si fueran bucles.
- No filtrar antes de hacer joins → consultas lentas.
- Usar SELECT \* sin pensar en la proyección real necesaria.
- Confundir lógica de negocio con lógica de datos.
