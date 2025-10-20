# Modulo 12. Claves e integridad referencial avanzada

## 🧭 12.1. Recordatorio: ¿qué es una clave?

En el modelo relacional, una **clave** es un **conjunto mínimo de atributos que identifica de forma única una tupla (fila)**.

Existen varios tipos de claves:

| Tipo de clave | Descripción |
| --- | --- |
| **Clave primaria (PK)** | Identifica de forma única cada fila. No puede ser NULL. |
| **Clave candidata** | Cualquier conjunto de atributos que podría ser PK. |
| **Clave alternativa (AK)** | Clave candidata que no se usa como PK, pero también identifica unívocamente. |
| **Clave foránea (FK)** | Atributo que referencia la PK (o AK) de otra tabla. |
| **Clave compuesta** | Clave formada por dos o más columnas. |

👉 Esto no es teoría “de manual”:

una buena elección de claves evita duplicidades, corrupciones y datos huérfanos en producción.

## 🧱 12.2. Clave primaria — la columna que “ancla” la identidad

Una **Primary Key (PK)**:

- Debe ser única,
- No debe permitir valores NULL,
- Identifica inequívocamente cada fila,
- Suele tener un índice implícito (depende del motor),
- Es la base para relaciones foráneas.

Ejemplo (tabla `cliente`):

```sql
CREATE TABLE cliente (
  id_cliente INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL
);

```

👉 `id_cliente` es la **PK**.

👉 `correo` también podría haber sido una clave candidata, pero decidimos usar un ID numérico estable.

## 🧠 12.3. Claves candidatas y alternativas

Una **clave candidata** es cualquier atributo (o conjunto) que podría servir como PK.

Una **clave alternativa** es una candidata que **no se usa como PK** pero que también es única.

Ejemplo:

```sql
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  codigo_interno VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  precio NUMERIC(10,2) NOT NULL
);

```

👉 `id_producto` = PK.

👉 `codigo_interno` = clave alternativa (AK).

👉 Ambas identifican unívocamente un producto, pero la PK es más práctica para relaciones.

📌 **Regla de oro:**

Usa **claves sustitutas (IDs)** para relaciones y **claves naturales (como emails, códigos)** para validaciones de negocio.

## 🧮 12.4. Claves compuestas — cuando 2 o más columnas definen identidad

En muchas relaciones N:N no necesitas un `id` artificial, basta con usar las claves combinadas.

Ejemplo (relación matrícula alumno-curso):

```sql
CREATE TABLE matricula (
  id_alumno INT NOT NULL,
  id_curso INT NOT NULL,
  fecha_matricula DATE NOT NULL,
  PRIMARY KEY (id_alumno, id_curso)
);

```

👉 Cada alumno solo puede matricularse **una vez** en cada curso.

👉 La combinación `(id_alumno, id_curso)` es única.

👉 No hay necesidad de un `id_matricula`.

📌 Este patrón es extremadamente común en tablas intermedias.

## 🔸 12.5. Clave foránea — la pieza que conecta tablas

Una **Foreign Key (FK)** es un atributo (o conjunto) que **referencia una PK o AK en otra tabla**.

Garantiza que **no existan registros huérfanos**.

Ejemplo:

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha DATE NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

```

👉 Cada pedido está vinculado a un cliente existente.

👉 Si intentas insertar un pedido con un `id_cliente` que no existe, fallará.

👉 Esto protege la integridad referencial **automáticamente**.

## 🧭 12.6. ON UPDATE / ON DELETE — reglas de integridad referencial

Al crear una FK, puedes especificar qué pasa si la fila **referenciada cambia** o **se borra**:

| Acción | Descripción |
| --- | --- |
| `RESTRICT` (por defecto) | No permite borrar ni actualizar si hay referencias. |
| `CASCADE` | Borra o actualiza automáticamente las filas hijas. |
| `SET NULL` | Coloca NULL en las filas hijas. (La columna FK debe permitir NULL.) |
| `SET DEFAULT` | Coloca el valor por defecto en la FK. |
| `NO ACTION` | Similar a RESTRICT (depende del motor). |

Ejemplo:

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  id_cliente INT,
  fecha DATE NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

```

👉 Si cambias `id_cliente` en `cliente`, se actualiza automáticamente en `pedido`.

👉 Si borras un cliente, los pedidos quedan con `id_cliente = NULL` (histórico preservado).

## 🧰 12.7. Ejemplo completo — Sistema de biblioteca

### 📄 Tabla `socio`

```sql
CREATE TABLE socio (
  id_socio SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL
);

```

### 📄 Tabla `libro`

```sql
CREATE TABLE libro (
  id_libro SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  isbn VARCHAR(20) UNIQUE NOT NULL
);

```

### 📄 Tabla `prestamo`

```sql
CREATE TABLE prestamo (
  id_prestamo SERIAL PRIMARY KEY,
  id_socio INT NOT NULL,
  id_libro INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  estado VARCHAR(20) NOT NULL,
  FOREIGN KEY (id_socio)
    REFERENCES socio(id_socio)
    ON DELETE CASCADE,     -- si borro al socio, se borran sus préstamos
  FOREIGN KEY (id_libro)
    REFERENCES libro(id_libro)
    ON DELETE RESTRICT     -- no se puede borrar un libro prestado
);

```

👉 Este diseño:

- Evita que existan préstamos sin socio o sin libro,
- Borra automáticamente préstamos si desaparece un socio,
- Impide borrar libros con préstamos activos.

## 🧭 12.8. ON UPDATE — cuándo usarlo

Aunque `ON UPDATE` se usa menos, puede ser útil cuando:

- Usas claves naturales como PK (por ejemplo, `codigo_producto`).
- Necesitas **propagar cambios de identificadores** a relaciones dependientes.
- Quieres garantizar sincronía absoluta sin necesidad de scripts manuales.

Ejemplo:

```sql
FOREIGN KEY (codigo_producto)
  REFERENCES producto(codigo_producto)
  ON UPDATE CASCADE

```

👉 Si el código cambia, todas las tablas relacionadas se actualizan automáticamente.

⚠️ Pero:

Si usas **claves sustitutas numéricas** (como IDs autoincrementales), esto casi nunca se usa.

## 🧠 12.9. Combinaciones habituales de reglas de FK

| Escenario | ON DELETE | ON UPDATE | Explicación breve |
| --- | --- | --- | --- |
| Datos maestros (clientes, libros) | RESTRICT | CASCADE | No permitir borrar si hay referencias |
| Relaciones débiles (histórico pedidos) | SET NULL | CASCADE | Mantener histórico sin cliente activo |
| Tablas hijas totalmente dependientes | CASCADE | CASCADE | Borrar en cascada si desaparece el padre |
| Claves naturales actualizables | RESTRICT | CASCADE | Actualizar hijos automáticamente si cambia el valor de PK |

👉 Elegir bien estas reglas es una **decisión de diseño**, no de conveniencia inmediata.

## 🧪 12.10. Ejercicio práctico guiado — e-commerce

Tablas:

- `cliente`
- `pedido`
- `producto`
- `pedido_producto`

### Diseño con integridad referencial sólida:

```sql
CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100) UNIQUE
);

CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  precio NUMERIC(10,2)
);

CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha DATE NOT NULL,
  total NUMERIC(10,2),
  FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE pedido_producto (
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  PRIMARY KEY (id_pedido, id_producto),
  FOREIGN KEY (id_pedido)
    REFERENCES pedido(id_pedido)
    ON DELETE CASCADE,
  FOREIGN KEY (id_producto)
    REFERENCES producto(id_producto)
    ON DELETE RESTRICT
);

```

✅ Comportamiento esperado:

- Si elimino un pedido → desaparecen sus productos asociados.
- Si elimino un cliente → los pedidos quedan con cliente NULL (histórico).
- No puedo borrar un producto que tenga pedidos asociados.
- No puede existir `pedido_producto` sin pedido ni producto válido.

## ⚠️ 12.11. Buenas prácticas con claves y FKs

- Siempre define PK en toda tabla.
- Prefiere **claves sustitutas** para relaciones (IDs autoincrementales o UUID).
- Usa claves naturales como AK para reglas de negocio.
- Define ON DELETE / ON UPDATE de forma **consciente** — no uses el default a ciegas.
- Documenta claramente las reglas de integridad en tu modelo de datos.
- Mantén consistencia de nombres (`id_cliente` en todas las tablas, no `cliente_id` en unas y `cli` en otras).

## 🚨 Errores comunes

- No definir claves → datos duplicados y consultas ineficientes.
- FK sin reglas → borrados inconsistentes.
- Uso indiscriminado de `CASCADE` → borrados en cadena no deseados.
- Usar claves naturales inestables (como emails) como PK.
- Cambiar PKs manualmente sin entender las consecuencias.