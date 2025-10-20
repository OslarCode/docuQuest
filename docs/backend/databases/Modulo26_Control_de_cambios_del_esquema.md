# Modulo 26. Control de cambios del esquema

## 🧭 26.1. Por qué versionar cambios en la base

Cuando desarrollas una aplicación moderna:

- El código está versionado en Git,
- El frontend evoluciona con commits y ramas,
- Pero la base de datos… ¿cómo controlas su evolución?

👉 No puedes depender de “copiar y pegar scripts SQL a mano”.

Si dos desarrolladores hacen cambios en paralelo, sin control:

- La base de datos puede quedar inconsistente.
- Desplegar a producción se vuelve riesgoso.
- No hay forma de “volver atrás” si algo sale mal.

📌 Por eso usamos **migraciones**: scripts ordenados que describen cómo cambia la base a lo largo del tiempo.

## 🧠 26.2. Qué es una migración

Una **migración** es un archivo que contiene instrucciones para **modificar la estructura de la base** de forma **determinística y reversible**.

Ejemplo — crear tabla productos:

```sql
-- 001_create_productos_up.sql
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio NUMERIC(10,2) NOT NULL,
  creado_en TIMESTAMP DEFAULT NOW()
);

```

Y su reverso:

```sql
-- 001_create_productos_down.sql
DROP TABLE productos;

```

📌 *Up = aplicar cambios*

📌 *Down = revertir cambios*

👉 Con esto puedes:

- Crear la tabla en desarrollo, staging y producción.
- Revertir si algo falla.
- Mantener un historial claro de cambios.

## 🧭 26.3. Migraciones ascendentes y descendentes

Las migraciones se **aplican en orden** (ascendentes) o se **deshacen** (descendentes).

Ejemplo:

```
001_create_productos.sql
002_add_stock_column.sql
003_add_categoria_table.sql

```

- Migrar “hacia arriba” → se aplican en orden 1, 2, 3.
- Migrar “hacia abajo” → se revierten en orden 3, 2, 1.

✅ Esto permite sincronizar la estructura de la base con cualquier versión del código.

## 🧱 26.4. Ejemplo práctico — añadir columna

Up:

```sql
ALTER TABLE productos ADD COLUMN stock INT DEFAULT 0;

```

Down:

```sql
ALTER TABLE productos DROP COLUMN stock;

```

👉 Pequeño cambio, pero versionado y reversible.

## 🧭 26.5. Herramientas comunes para migraciones

Dependiendo del stack, hay varias opciones populares:

| Herramienta | Lenguaje | Descripción breve |
| --- | --- | --- |
| Flyway | SQL / Java | Muy usada en entornos empresariales |
| Liquibase | SQL / XML / YAML | Ideal para equipos grandes |
| Knex Migrations | JS | Muy usada en Node.js |
| Prisma Migrate | JS/TS | ORM + migraciones |
| Alembic | Python | Standard en ecosistemas Flask/FastAPI |
| Django Migrations | Python | Integrado al framework |

👉 Todas siguen el mismo patrón: scripts versionados, ordenados y reversibles.

Ejemplo Knex:

```bash
npx knex migrate:make add_stock_column
npx knex migrate:latest
npx knex migrate:rollback

```

## 🧠 26.6. Migraciones automáticas vs manuales

- **Manuales** → tú escribes las instrucciones SQL a mano (máximo control).
- **Automáticas** → la herramienta las genera a partir de cambios en modelos (rápido, pero puede ser menos preciso).

📌 Recomendación práctica:

- Usa automáticas para cambios sencillos (agregar columnas, índices).
- Usa manuales para operaciones delicadas (mover datos, refactorizar claves, etc.).

## 🧭 26.7. Semillas (seeders) — poblar datos iniciales

Además de migrar estructura, muchas apps necesitan:

- Usuarios iniciales,
- Configuraciones por defecto,
- Catálogos básicos (países, roles, categorías…).

👉 Para eso usamos **semillas** (seed data).

Ejemplo en SQL:

```sql
INSERT INTO roles (nombre) VALUES ('admin'), ('editor'), ('lector');
INSERT INTO categorias (nombre) VALUES ('Electrónica'), ('Ropa'), ('Libros');

```

Ejemplo con Knex:

```jsx
exports.seed = async function (knex) {
  await knex('roles').insert([
    { nombre: 'admin' },
    { nombre: 'editor' },
    { nombre: 'lector' }
  ]);
};

```

📌 Esto se ejecuta después de las migraciones iniciales, garantizando que la BD arranca con datos mínimos funcionales.

## 🧱 26.8. Data-migrations — cuando cambia la forma de los datos

No todos los cambios son estructurales.

A veces debes **modificar el contenido existente** porque cambió el modelo lógico.

Ejemplo:

- Antes: `nombre_completo` en un solo campo.
- Ahora: `nombre` y `apellido` separados.

Up:

```sql
ALTER TABLE usuarios ADD COLUMN nombre TEXT;
ALTER TABLE usuarios ADD COLUMN apellido TEXT;

UPDATE usuarios
SET nombre = split_part(nombre_completo, ' ', 1),
    apellido = split_part(nombre_completo, ' ', 2);

ALTER TABLE usuarios DROP COLUMN nombre_completo;

```

Down:

```sql
ALTER TABLE usuarios ADD COLUMN nombre_completo TEXT;
UPDATE usuarios
SET nombre_completo = nombre || ' ' || apellido;
ALTER TABLE usuarios DROP COLUMN nombre;
ALTER TABLE usuarios DROP COLUMN apellido;

```

👉 Esto es una **data-migration**:

- Cambia estructura + contenido.
- Debe ser tratada como una migración normal, versionada y reversible.

## 🧭 26.9. Buenas prácticas con migraciones

- Una migración debe ser **atómica**: hace un cambio lógico y nada más.
- Usa nombres claros: `001_add_stock_column.sql`, no `mig1.sql`.
- Asegúrate de que **todas las migraciones funcionan en orden limpio**.
- Mantén up y down sincronizados.
- Documenta por qué se hizo cada cambio.
- Usa control de versiones (Git) para todo el historial.

## 🧠 26.10. Despliegues seguros con migraciones

En entornos reales:

- Se ejecutan migraciones en staging antes que en producción.
- Se automatizan con CI/CD.
- Se hacen backups previos si son cambios críticos.
- Se monitorean tiempos de ejecución para no bloquear la base.

📌 Ejemplo de pipeline típico:

```
git push main
→ CI corre tests
→ CI aplica migraciones
→ Despliegue en staging
→ QA
→ Despliegue en producción

```

## 🚨 26.11. Errores comunes

- Editar directamente la base de datos “a mano” en producción 😬
- No escribir migraciones de reversión (down).
- Hacer migraciones gigantes que mezclan 10 cambios distintos.
- No poblar datos iniciales con seeders → sistemas vacíos que fallan.
- No versionar migraciones → caos entre entornos.
- Confiar en migraciones automáticas sin revisarlas.