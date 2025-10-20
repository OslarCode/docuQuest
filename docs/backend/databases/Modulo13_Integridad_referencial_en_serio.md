# Modulo 13. Integridad referencial en serio

## 🧭 13.1. ¿Qué es la integridad referencial?

En una base de datos relacional, no todas las tablas viven aisladas: muchas están **relacionadas entre sí**.

Por ejemplo:

- Un **pedido** está siempre asociado a un **cliente**.
- Un **préstamo** de biblioteca pertenece a un **socio** y a un **libro**.
- Una **matrícula** se asocia a un **alumno** y un **curso**.

👉 La **integridad referencial** es la **regla que garantiza que las relaciones entre tablas se mantengan consistentes**.

Es decir:

- No puede existir un pedido sin cliente.
- No puede haber un préstamo de un libro que no exista.
- No puedes matricularte en un curso que no está registrado.

📌 Técnicamente:

> Una clave foránea (FK) en una tabla apunta a la clave primaria (PK) de otra tabla, asegurando que el valor siempre existe en la tabla referenciada.
> 

## 🧱 13.2. Definición de clave foránea

**Clave foránea = restricción que conecta dos tablas.**

La tabla que **contiene la FK** es la “tabla hija”.

La tabla referenciada es la “tabla padre”.

Ejemplo — relación Cliente → Pedido:

```sql
CREATE TABLE cliente (
  id_cliente INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE pedido (
  id_pedido INT PRIMARY KEY,
  id_cliente INT NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

```

👉 `id_cliente` en `pedido` **debe existir primero en la tabla `cliente`**.

Si intentas insertar un pedido con un `id_cliente` que no existe… ❌ la base de datos lo bloquea.

## 🧠 13.3. Qué pasa cuando se rompe la referencia

Imagina que existe un pedido:

```
pedido: (id_pedido = 10, id_cliente = 5)

```

Si alguien intenta borrar el cliente con `id_cliente = 5` de la tabla `cliente`:

- La base de datos detecta que **hay pedidos que dependen de ese cliente**.
- Por defecto, no permitirá borrar (error de integridad referencial).

👉 Esta protección evita que queden **registros “huérfanos”** en la tabla hija.

## 🧭 13.4. Acciones en cascada — políticas de borrado y actualización

Cuando definimos una FK, podemos **decidir qué pasa** si se borra o actualiza el registro padre:

| Acción | Descripción |
| --- | --- |
| `RESTRICT` / `NO ACTION` | (Por defecto) No permite borrar/actualizar si hay referencias activas. |
| `CASCADE` | Borra o actualiza automáticamente los registros hijos. |
| `SET NULL` | Pone en `NULL` la FK en la tabla hija. |
| `SET DEFAULT` | Pone un valor por defecto definido. |

Ejemplo con acciones explícitas:

```sql
CREATE TABLE pedido (
  id_pedido INT PRIMARY KEY,
  id_cliente INT,
  fecha DATE NOT NULL,
  FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);

```

👉 Si borras un cliente:

- Los pedidos no se borran.
- Su `id_cliente` pasa a ser `NULL`.

👉 Si actualizas `id_cliente` en la tabla `cliente`:

- Se actualiza automáticamente en todos los pedidos asociados.

## 🧱 13.5. Ejemplo real — Biblioteca

Vamos a modelar un pequeño sistema de biblioteca:

- `socio`: socios registrados.
- `libro`: libros disponibles.
- `prestamo`: relación entre socio y libro.

```sql
CREATE TABLE socio (
  id_socio INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE libro (
  id_libro INT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL
);

CREATE TABLE prestamo (
  id_prestamo INT PRIMARY KEY,
  id_socio INT NOT NULL,
  id_libro INT NOT NULL,
  fecha_inicio DATE NOT NULL,
  FOREIGN KEY (id_socio)
    REFERENCES socio(id_socio)
    ON DELETE CASCADE,
  FOREIGN KEY (id_libro)
    REFERENCES libro(id_libro)
    ON DELETE RESTRICT
);

```

👉 Interpretación:

- Si borras un socio → **se borran sus préstamos** (CASCADE).
- Si intentas borrar un libro que está prestado → ❌ no se permite (RESTRICT).
- Esto mantiene la integridad del modelo.

## 🧠 13.6. Políticas de borrado/actualización — cuándo usar cada una

| Política | Caso típico |
| --- | --- |
| `RESTRICT` / `NO ACTION` | Entidades “fuertes” que no deben borrarse si tienen dependencias. Ej: libro, curso |
| `CASCADE` | Entidades “débiles” que dependen totalmente del padre. Ej: líneas de pedido, préstamos |
| `SET NULL` | Para preservar datos históricos aunque desaparezca la relación. Ej: cliente eliminado pero pedido histórico |
| `SET DEFAULT` | Escenarios controlados con un valor predefinido (menos frecuente) |

👉 La elección **no es arbitraria**:

debe basarse en la **semántica del negocio real**.

## 🧭 13.7. Políticas de actualización

Aunque el borrado es lo más común, también se puede definir qué pasa si **se actualiza la PK** de la tabla padre:

- `ON UPDATE CASCADE` → actualiza en hijos automáticamente.
- `ON UPDATE RESTRICT` → impide cambiar la PK si hay dependencias.

📌 Nota: si usas **claves sustitutas** (autonuméricos o UUID), normalmente **no se actualizan nunca** → esta política se usa menos.

---

## 🧩 13.8. Ejemplo — Pedido y cliente con ON UPDATE CASCADE

```sql
CREATE TABLE cliente (
  id_cliente INT PRIMARY KEY,
  nombre VARCHAR(100)
);

CREATE TABLE pedido (
  id_pedido INT PRIMARY KEY,
  id_cliente INT,
  FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
    ON UPDATE CASCADE
);

```

Si cambias el `id_cliente` de 5 a 10 en `cliente`:

```sql
UPDATE cliente SET id_cliente = 10 WHERE id_cliente = 5;

```

👉 Automáticamente se actualiza en `pedido`.

Esto **evita inconsistencias manuales**.

## 🧠 13.9. Buenas prácticas

- Define siempre claves foráneas explícitas: no confíes en “coherencia lógica”.
- Elige la acción de borrado según la **semántica del dominio**.
- Usa CASCADE con cuidado: un borrado mal planteado puede eliminar más de lo esperado.
- Documenta las políticas de borrado/actualización.
- Asegúrate de que tus aplicaciones manejen bien las restricciones (errores FK).

## 🚨 13.10. Errores comunes

- No definir FKs → datos huérfanos y consultas inconsistentes.
- Usar CASCADE sin entender su impacto.
- No manejar errores de FK en la aplicación.
- Cambiar manualmente PKs sin ON UPDATE.
- No sincronizar las decisiones de diseño con el equipo de desarrollo.