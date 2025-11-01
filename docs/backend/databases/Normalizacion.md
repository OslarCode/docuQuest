# Normalización

## 7.1. Qué es la normalización

La **normalización** es el proceso de organizar los datos en tablas para:

- Eliminar redundancias,
- Asegurar dependencias lógicas correctas entre atributos,
- Y garantizar que cada pieza de información esté **en un solo sitio**.

No es un proceso único, sino **una serie de “formas normales” (1FN, 2FN, 3FN, BCNF...)** que establecen niveles progresivos de calidad estructural.

## 7.2. Un mal diseño inicial (caso real: sistema de pedidos)

Supongamos que alguien hace esta tabla única para registrar pedidos:

| id_pedido | fecha      | nombre_cliente | direccion_cliente | producto1 | producto2 | producto3 | total  |
| --------- | ---------- | -------------- | ----------------- | --------- | --------- | --------- | ------ |
| 1         | 2025-10-10 | Ana Gómez      | Calle 123         | Teclado   | Ratón     | NULL      | 30.00  |
| 2         | 2025-10-11 | Luis Pérez     | Av. Central       | Monitor   | NULL      | NULL      | 120.00 |
| 3         | 2025-10-11 | Ana Gómez      | Calle 123         | Ratón     | Teclado   | Monitor   | 150.00 |

Problemas claros:

- **Redundancia** de datos del cliente (se repite para cada pedido).
- Productos “aplanados” en columnas fijas (producto1, producto2…).
- Si hay 4 productos en un pedido… no cabe.
- Actualizar la dirección de Ana requeriría hacerlo en varias filas.

Este es un esquema **no normalizado**.

## 7.3. Primera Forma Normal (1FN) — _“Una celda, un valor”_

**Regla:**

- Todos los atributos deben ser **atómicos** (sin listas ni grupos repetitivos).
- No debe haber columnas repetidas (`producto1`, `producto2`...).
- Cada fila debe representar **una sola instancia bien definida**.

**Corrección:** separar los productos en filas distintas:

| id_pedido | fecha      | nombre_cliente | direccion_cliente | producto | total  |
| --------- | ---------- | -------------- | ----------------- | -------- | ------ |
| 1         | 2025-10-10 | Ana Gómez      | Calle 123         | Teclado  | 30.00  |
| 1         | 2025-10-10 | Ana Gómez      | Calle 123         | Ratón    | 30.00  |
| 2         | 2025-10-11 | Luis Pérez     | Av. Central       | Monitor  | 120.00 |
| 3         | 2025-10-11 | Ana Gómez      | Calle 123         | Ratón    | 150.00 |
| 3         | 2025-10-11 | Ana Gómez      | Calle 123         | Teclado  | 150.00 |
| 3         | 2025-10-11 | Ana Gómez      | Calle 123         | Monitor  | 150.00 |

Ya no tenemos valores compuestos, pero:

- **Sigue habiendo redundancia** en datos de clientes.
- El total se repite en cada línea del pedido.
- Si cambias el nombre de un producto, tienes que hacerlo en cada fila.

**Conclusión:** cumplimos 1FN, pero no está optimizado.

## 🔸 7.4. Segunda Forma Normal (2FN) — _“Cada atributo depende de toda la clave”_

**Regla:**

- Debe cumplir 1FN.
- Todos los atributos no clave deben depender **de toda la clave primaria** y no de una parte de ella.

Observa:

- En esta tabla, si la PK es `(id_pedido, producto)`,
  el `nombre_cliente` y la `direccion_cliente` dependen **solo de id_pedido**, no del producto.
  → Violación de 2FN.

**Solución:** separar en tablas por entidades funcionales:

- Tabla `pedido` (id_pedido, fecha, cliente, total)
- Tabla `cliente` (id_cliente, nombre, dirección)
- Tabla `pedido_producto` (id_pedido, id_producto)

**Resultado lógico:**

| pedido          | cliente         | pedido_producto     | producto         |
| --------------- | --------------- | ------------------- | ---------------- |
| id_pedido (PK)  | id_cliente (PK) | id_pedido (FK)      | id_producto (PK) |
| fecha           | nombre          | id_producto (FK)    | nombre           |
| id_cliente (FK) | direccion       | cantidad (opcional) | precio           |
| total           | correo (opt)    |                     |                  |

Ahora cada atributo depende de **una clave y solo de ella**.

Eliminamos redundancia de cliente y productos.

## 7.5. Tercera Forma Normal (3FN) — _“No dependencias transitivas”_

**Regla:**

- Debe cumplir 2FN.
- Los atributos no clave **no deben depender de otros atributos no clave**.

Ejemplo:

Si en `pedido` tenemos:

| id_pedido | fecha | id_cliente | nombre_cliente | direccion_cliente |
| --------- | ----- | ---------- | -------------- | ----------------- |

`nombre_cliente` depende de `id_cliente`, no de `id_pedido`.

Eso es **una dependencia transitiva** → 🚨 Violación de 3FN.

**Solución:**

- Mantener en `pedido` solo la FK `id_cliente`.
- Mover `nombre_cliente` y `direccion_cliente` a `cliente`.

Resultado:

- `pedido` ya no almacena datos del cliente, solo lo referencia.
- Si el cliente cambia de dirección, solo hay que actualizar una tabla.
- La integridad queda centralizada.

## 7.6. Forma Normal de Boyce-Codd (BCNF) — _“No anomalías de dependencia”_

**Regla:**

- Toda determinante debe ser una clave candidata.
- Es una versión más estricta de la 3FN.

Ejemplo:

Supongamos que en `curso` tenemos:

```
(codigo_asignatura, aula) → profesor
profesor → aula

```

Aquí `profesor` determina `aula`, pero **profesor no es clave** → 🚨 no cumple BCNF.

**Solución:** separar en dos tablas:

- `asignacion_profesor` (profesor, aula)
- `curso` (codigo_asignatura, profesor)

De esta forma:

- Cada profesor está asociado a un aula en una tabla.
- Los cursos solo indican quién da la asignatura.
- Se eliminan dependencias no clave.

BCNF elimina las **anomalías de actualización y borrado** que 3FN a veces deja pasar.

## 🧰 7.7. Resumen de las Formas Normales

| Forma | Requisitos principales                               | Qué evita                                      |
| ----- | ---------------------------------------------------- | ---------------------------------------------- |
| 1FN   | Atributos atómicos, sin grupos repetitivos           | Datos duplicados por celda                     |
| 2FN   | Cumple 1FN y elimina dependencias parciales de la PK | Redundancia funcional                          |
| 3FN   | Cumple 2FN y elimina dependencias transitivas        | Duplicados por atributos no clave              |
| BCNF  | Cumple 3FN y elimina todas las dependencias no clave | Anomalías de actualización, inserción, borrado |

No todos los sistemas necesitan llegar siempre a BCNF,

pero **un buen diseño debería llegar como mínimo a 3FN**.

## 7.8. Ejercicio práctico guiado — Normalizando la tabla de pedidos

### Tabla inicial no normalizada

```
pedido(id_pedido, fecha, nombre_cliente, direccion, producto1, producto2, producto3, total)

```

### 1FN

```
pedido_producto(id_pedido, fecha, nombre_cliente, direccion, producto, total)

```

### 2FN

```
pedido(id_pedido, fecha, id_cliente, total)
cliente(id_cliente, nombre_cliente, direccion)
pedido_producto(id_pedido, id_producto)

```

### 3FN

```
pedido(id_pedido, fecha, id_cliente, total)
cliente(id_cliente, nombre, direccion)
producto(id_producto, nombre, precio)
pedido_producto(id_pedido, id_producto, cantidad)

```

### BCNF (si hubiera dependencias no clave extra, las separaríamos)

Este esquema ya está listo para implementarse de forma robusta y **es idéntico al que usaría un ERP real**.

## 7.9. Buenas prácticas al normalizar

- Siempre empieza **por limpiar los atributos repetidos** (1FN).
- Luego **separa entidades** según dependencias funcionales (2FN y 3FN).
- Revisa si quedan dependencias no clave (BCNF).
- Usa **claves sustitutas** (IDs autogenerados) si las naturales son complicadas o poco estables.
- No normalices “a ciegas”: entiende la lógica de negocio detrás.

## Errores comunes

- Pasar directamente de un Excel a una tabla SQL sin normalizar.
- Dejar datos redundantes por “comodidad”.
- No documentar qué atributos se movieron en cada paso.
- Normalizar en exceso sin motivo (romper tablas innecesariamente).
