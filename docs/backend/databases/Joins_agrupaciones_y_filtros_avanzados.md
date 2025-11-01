# Modulo 10. Joins, agrupaciones y filtros avanzados

## 🧭 10.1. JOIN: de la teoría al SQL

En álgebra relacional, el **JOIN** es:

```
R ⨝ condición S ≡ σ condición (R × S)

```

En SQL se escribe:

```sql
SELECT ...
FROM R
JOIN S
  ON condición;

```

El JOIN **no es magia**: es simplemente **un producto cartesiano filtrado**.

### Tipos principales de JOIN

1. **INNER JOIN** → filas que cumplen condición en ambas tablas.
2. **LEFT JOIN** → todas las filas de la tabla izquierda, y coincidencias de la derecha (o NULL si no hay).
3. **RIGHT JOIN** → inverso del LEFT JOIN.
4. **FULL OUTER JOIN** → todas las filas de ambas tablas (aunque no haya coincidencia).
5. **CROSS JOIN** → producto cartesiano sin condición.
6. **SELF JOIN** → unir una tabla consigo misma.

## 🧱 10.2. INNER JOIN — combinación directa

📌 Caso: queremos **ver el nombre del alumno y el nombre del curso** en el que está matriculado.

Tablas:

- `alumno(id_alumno, nombre)`
- `curso(id_curso, nombre_curso)`
- `matricula(id_alumno, id_curso)`

```sql
SELECT a.nombre AS alumno, c.nombre_curso AS curso
FROM alumno a
JOIN matricula m ON a.id_alumno = m.id_alumno
JOIN curso c ON m.id_curso = c.id_curso;

```

📌 Resultado:

| alumno | curso |
| --- | --- |
| Ana | Bases de Datos |
| Luis | Bases de Datos |
| Sara | Redes |

👉 Esto es exactamente la operación de JOIN que hicimos en álgebra relacional.

## 🟡 10.3. LEFT JOIN — mantener “padres” sin hijos

📌 Caso: queremos mostrar **todos los alumnos**, incluso si no tienen matrícula.

```sql
SELECT a.nombre, c.nombre_curso
FROM alumno a
LEFT JOIN matricula m ON a.id_alumno = m.id_alumno
LEFT JOIN curso c ON m.id_curso = c.id_curso;

```

📌 Resultado:

| alumno | curso |
| --- | --- |
| Ana | Bases de Datos |
| Luis | Bases de Datos |
| Sara | Redes |
| Pedro | NULL |

👉 Esto se traduce en álgebra como una unión extendida (outer join).

## 🟢 10.4. SELF JOIN — cuando la tabla se relaciona consigo misma

📌 Caso: en una tabla de empleados, cada empleado tiene un `id_jefe` que también es un empleado.

```sql
SELECT e.nombre AS empleado, j.nombre AS jefe
FROM empleado e
LEFT JOIN empleado j ON e.id_jefe = j.id_empleado;

```

📌 Resultado:

| empleado | jefe |
| --- | --- |
| Ana | Luis |
| Luis | NULL |

👉 Aquí usamos **renombramiento (ρ)** de álgebra relacional de forma práctica.

## 🧮 10.5. CROSS JOIN — producto cartesiano controlado

Aunque rara vez se usa directamente, el **CROSS JOIN** puede ser útil para generar combinaciones:

```sql
SELECT a.nombre, c.nombre_curso
FROM alumno a
CROSS JOIN curso c;

```

📌 Resultado:

| alumno | curso |
| --- | --- |
| Ana | Bases de Datos |
| Ana | Redes |
| Luis | Bases de Datos |
| Luis | Redes |
| Sara | Bases de Datos |
| Sara | Redes |

👉 Equivalente a `Alumno × Curso` en álgebra.

## 🧭 10.6. Filtros (WHERE y ON) — no es lo mismo

📌 **WHERE** filtra después del JOIN.

📌 **ON** filtra durante el JOIN.

Ejemplo:

```sql
-- Filtrando después (WHERE)
SELECT a.nombre, c.nombre_curso
FROM alumno a
LEFT JOIN matricula m ON a.id_alumno = m.id_alumno
LEFT JOIN curso c ON m.id_curso = c.id_curso
WHERE c.nombre_curso = 'Bases de Datos';

```

Esto **excluye alumnos sin curso**, porque el WHERE elimina los NULL.

```sql
-- Filtrando durante (ON)
SELECT a.nombre, c.nombre_curso
FROM alumno a
LEFT JOIN matricula m ON a.id_alumno = m.id_alumno
LEFT JOIN curso c
  ON m.id_curso = c.id_curso AND c.nombre_curso = 'Bases de Datos';

```

Esto **mantiene alumnos sin curso** pero pone NULL en curso si no coincide.

👉 Esta diferencia es vital para evitar bugs en reportes y dashboards.

## 📊 10.7. GROUP BY y agregaciones — resumen de datos

Las operaciones de **agregación** en SQL corresponden a **operaciones de reducción de relaciones** en álgebra extendida.

Funciones comunes:

- `COUNT()` — cuenta filas
- `SUM()` — suma numérica
- `AVG()` — promedio
- `MIN()`, `MAX()`

📌 Caso: contar cuántos alumnos hay en cada curso.

```sql
SELECT c.nombre_curso, COUNT(*) AS total_alumnos
FROM matricula m
JOIN curso c ON m.id_curso = c.id_curso
GROUP BY c.nombre_curso;

```

📌 Resultado:

| nombre_curso | total_alumnos |
| --- | --- |
| Bases de Datos | 2 |
| Redes | 1 |

👉 Equivalente a una operación de **proyección + agrupación** en álgebra.

## 🧭 10.8. HAVING — filtros sobre agregaciones

`HAVING` es como un `WHERE`, pero aplicado después de agrupar.

📌 Caso: mostrar solo cursos con más de 1 alumno.

```sql
SELECT c.nombre_curso, COUNT(*) AS total
FROM matricula m
JOIN curso c ON m.id_curso = c.id_curso
GROUP BY c.nombre_curso
HAVING COUNT(*) > 1;

```

📌 Resultado:

| nombre_curso | total |
| --- | --- |
| Bases de Datos | 2 |

👉 Si usaras WHERE aquí, fallaría porque `COUNT(*)` no existe aún en esa etapa.

## 🧠 10.9. Agregaciones + JOIN — patrones comunes

📌 **Total de pedidos por cliente:**

```sql
SELECT c.nombre AS cliente, SUM(p.total) AS total_gastado
FROM cliente c
JOIN pedido p ON c.id_cliente = p.id_cliente
GROUP BY c.nombre;

```

📌 **Número de préstamos por socio:**

```sql
SELECT s.nombre, COUNT(*) AS prestamos
FROM socio s
LEFT JOIN prestamo p ON s.id_socio = p.id_socio
GROUP BY s.nombre;

```

👉 LEFT JOIN + GROUP BY permite **incluir también los que tienen 0 registros**.

## 🧮 10.10. Agregaciones múltiples

Puedes aplicar múltiples funciones en la misma agrupación:

```sql
SELECT c.nombre_curso,
       COUNT(*) AS total_alumnos,
       MIN(m.fecha_matricula) AS primera_matricula,
       MAX(m.fecha_matricula) AS ultima_matricula
FROM matricula m
JOIN curso c ON m.id_curso = c.id_curso
GROUP BY c.nombre_curso;

```

📌 Resultado:

| nombre_curso | total_alumnos | primera_matricula | ultima_matricula |
| --- | --- | --- | --- |
| Bases de Datos | 2 | 2025-10-10 | 2025-10-12 |
| Redes | 1 | 2025-10-11 | 2025-10-11 |

## 🧠 10.11. Pensar en álgebra antes de SQL = mejores consultas

| Lógica algebraica (concepto) | Traducción SQL práctica |
| --- | --- |
| σ condición (R) | `WHERE condición` |
| π columnas (R) | `SELECT columnas` |
| R ⨝ condición S | `JOIN ... ON ...` |
| γ (agrupación, agregación) | `GROUP BY`, funciones agregadas |
| σ condición (γ ...) | `HAVING` |

👉 Si primero estructuras mentalmente tu consulta con **álgebra**,

es mucho más fácil escribir SQL limpio, legible y eficiente.

## ⚠️ 10.12. Buenas prácticas con JOIN + agregaciones

- Aplica filtros tempranos (`WHERE`) antes de los JOIN si puedes.
- Usa `HAVING` solo para condiciones sobre agregados.
- Usa alias cortos (`a`, `c`, `m`) para mejorar legibilidad en JOIN múltiples.
- No abuses de `SELECT *` en joins grandes — proyecta solo lo necesario.
- Prefiere INNER JOIN cuando la lógica lo permita — es más predecible.
- LEFT JOIN solo cuando **de verdad** necesitas mantener nulos.

## 🚨 Errores comunes

- Filtrar después del LEFT JOIN con WHERE y eliminar filas sin querer.
- No agrupar todas las columnas no agregadas → error clásico de SQL.
- JOIN sin condición → producto cartesiano inesperado.
- GROUP BY innecesario cuando bastaba con DISTINCT.
- No documentar las intenciones del JOIN → consultas difíciles de mantener.