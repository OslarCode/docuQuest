# Modulo 16. Tablas puente y modelado N-a-N

## 🧭 16.1. Qué es una relación N-a-N

Una relación **N-a-N** significa que:

- Un registro de la tabla A puede relacionarse con **muchos registros** de la tabla B.
- Y un registro de la tabla B puede relacionarse con **muchos registros** de la tabla A.

Ejemplos comunes:

- Un alumno puede matricularse en muchos cursos, y un curso tener muchos alumnos.
- Un pedido puede incluir muchos productos, y un producto estar en muchos pedidos.
- Un usuario puede tener varios roles, y un rol pertenecer a varios usuarios.

👉 Para representar esto **no podemos usar una FK directa** como en 1-a-N.

Necesitamos una **tabla puente** (o tabla intermedia).

## 🧱 16.2. Tabla puente: estructura base

Supón esta relación:

```
ALUMNO (N) ⟷ (N) CURSO

```

La forma correcta de representarla es:

```
ALUMNO
   |
   |  1-a-N
   v
ALUMNO_CURSO  (tabla puente)
   ^
   |  N-a-1
   |
CURSO

```

**Ejemplo SQL:**

```sql
CREATE TABLE alumno (
  id_alumno SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE curso (
  id_curso SERIAL PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL
);

CREATE TABLE alumno_curso (
  id_alumno INT NOT NULL,
  id_curso INT NOT NULL,
  fecha_matricula DATE NOT NULL DEFAULT CURRENT_DATE,
  PRIMARY KEY (id_alumno, id_curso),
  FOREIGN KEY (id_alumno) REFERENCES alumno(id_alumno),
  FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

```

👉 La tabla `alumno_curso`:

- Tiene **dos claves foráneas**.
- La **clave primaria compuesta** (`id_alumno`, `id_curso`) garantiza que **un alumno no pueda matricularse dos veces** en el mismo curso.
- `fecha_matricula` es un atributo propio de la relación.

## 🧠 16.3. Atributos en la relación

En 1-a-N, los atributos suelen ir en la tabla hija.

En N-a-N, los atributos **pertenecen a la relación misma** y por eso van en la tabla puente.

Ejemplos:

- Fecha de matrícula en curso.
- Cantidad de productos en un pedido.
- Rol asignado a un usuario.
- Precio aplicado en el momento de la venta.

📌 **Importante:** no pongas esos datos en las tablas principales, porque pueden repetirse muchas veces con valores distintos.

Ejemplo con productos y pedidos:

```sql
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  fecha DATE NOT NULL
);

CREATE TABLE pedido_producto (
  id_pedido INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (id_pedido, id_producto),
  FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

```

👉 `cantidad` y `precio_unitario` son **propios de la relación pedido-producto**, no del producto ni del pedido por separado.

## 🧭 16.4. Claves compuestas: por qué son importantes

La **clave primaria compuesta** (FK A + FK B) evita duplicados sin necesidad de un ID artificial:

- Garantiza que un alumno no se inscriba dos veces en el mismo curso.
- Que un producto no aparezca dos veces en el mismo pedido.
- Que un rol no se asigne dos veces al mismo usuario.

📌 También puedes usar una PK artificial (ej. `id SERIAL`) si:

- La tabla puente tiene **muchos atributos adicionales**,
- O si vas a referenciar la relación desde otras tablas.

👉 Pero en muchos casos, **la PK compuesta es más natural y eficiente**.

## 🧱 16.5. Ejemplo práctico — usuarios y roles

Supongamos que tenemos autenticación:

- Tabla `usuario`
- Tabla `rol`
- Un usuario puede tener varios roles, y un rol puede pertenecer a varios usuarios.

```sql
CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE rol (
  id_rol SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE usuario_rol (
  id_usuario INT NOT NULL,
  id_rol INT NOT NULL,
  asignado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_rol),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

```

👉 Así:

- Cada usuario puede tener varios roles, pero no se duplica ninguno.
- Podemos saber cuándo se asignó cada rol.
- La relación queda clara y sin datos repetidos.

## 🧠 16.6. Tablas puente con atributos propios y PK artificial

Si necesitas **identificar la relación individualmente** (por ejemplo, para auditarla o referenciarla desde otra tabla), puedes usar un `id` artificial además de las FKs.

```sql
CREATE TABLE inscripcion (
  id SERIAL PRIMARY KEY,
  id_alumno INT NOT NULL,
  id_curso INT NOT NULL,
  fecha_inscripcion DATE DEFAULT CURRENT_DATE,
  nota NUMERIC(4,2),
  UNIQUE (id_alumno, id_curso),
  FOREIGN KEY (id_alumno) REFERENCES alumno(id_alumno),
  FOREIGN KEY (id_curso) REFERENCES curso(id_curso)
);

```

👉 Aquí:

- `id` sirve como identificador único de inscripción.
- La **restricción UNIQUE** mantiene la integridad N-a-N.
- Se pueden añadir más atributos (nota, estado, etc.) fácilmente.

## 🧭 16.7. Buenas prácticas para modelar N-a-N

- Usa **tabla puente siempre**: no intentes “guardar arrays” en una sola columna.
- Define **PK compuesta** si solo almacenas las FKs y algún atributo simple.
- Usa **PK artificial + UNIQUE** si la relación tiene atributos complejos.
- Aplica `CHECK` a los atributos de relación para validar reglas (ej. `cantidad > 0`).
- Documenta la relación: es parte clave del modelo conceptual.
- Define ON DELETE/UPDATE adecuadamente para mantener integridad (por ejemplo, `CASCADE` en relaciones débiles).

## 🧠 16.8. Errores comunes

- Guardar IDs separados por comas en un campo `VARCHAR` (anti-patrón clásico).
- No usar PK compuesta ni UNIQUE → duplicados silenciosos.
- No usar tabla puente → modelo inconsistente.
- Meter atributos en tablas equivocadas (producto/pedido en lugar de pedido_producto).
- No documentar reglas de unicidad.

✅ Con este módulo, el estudiante:

- Comprende cuándo y cómo usar tablas puente,
- Entiende la diferencia entre atributos de entidad y de relación,
- Y evita anti-patrones muy comunes en principiantes.