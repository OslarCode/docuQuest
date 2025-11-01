# Modulo 27. Pruebas de bases de datos

## 🧭 27.1. Por qué probar la base de datos

Muchas apps fallan no por errores de código… sino por:

- Cambios en el esquema no testeados.
- Datos inconsistentes tras migraciones.
- Consultas que devuelven resultados inesperados.
- Integridad referencial rota sin darse cuenta.

📌 Las pruebas de base de datos sirven para:

- Detectar errores **antes** de llegar a producción.
- Asegurar que las migraciones no rompen integridad.
- Verificar que las consultas críticas siguen funcionando.
- Facilitar despliegues y rollback seguros.

## 🧠 27.2. Qué se prueba exactamente en la base

1. **Estructura**:
    - Existen las tablas esperadas.
    - Las columnas tienen el tipo correcto.
    - Las constraints están activas.
2. **Integridad**:
    - FKs, restricciones UNIQUE, CHECK… se cumplen.
    - No hay relaciones rotas.
3. **Consultas críticas**:
    - Devuelven los resultados esperados para casos conocidos.
4. **Reglas de negocio en BD**:
    - Triggers, vistas, funciones y restricciones hacen lo correcto.
5. **Migraciones**:
    - Se aplican y revierten sin errores.
    - No rompen datos existentes.

## 🧭 27.3. Fixtures — datos controlados para probar

Un **fixture** es un conjunto de datos **pequeño, limpio y conocido** que sirve para:

- Alimentar la BD en un estado reproducible,
- Ejecutar pruebas consistentes,
- Comparar resultados predecibles.

Ejemplo de fixture simple (SQL):

```sql
INSERT INTO clientes (id, nombre, correo)
VALUES (1, 'Ana', 'ana@example.com'),
       (2, 'Luis', 'luis@example.com');

INSERT INTO pedidos (id, cliente_id, total)
VALUES (101, 1, 50.00),
       (102, 2, 75.00);

```

👉 Con estos datos conocidos, puedes probar:

- Que las consultas JOIN devuelven lo correcto.
- Que no hay problemas de FK.
- Que triggers o reglas de negocio se comportan como se espera.

📌 Es recomendable **mantener fixtures bajo control de versiones** junto con el código.

## 🧠 27.4. Ejemplo práctico — verificación de integridad

Supón estas tablas:

```sql
CREATE TABLE cliente (
  id INT PRIMARY KEY,
  nombre TEXT
);

CREATE TABLE pedido (
  id INT PRIMARY KEY,
  cliente_id INT REFERENCES cliente(id)
);

```

Si insertas un pedido con un cliente inexistente:

```sql
INSERT INTO pedido (id, cliente_id) VALUES (1, 999);

```

👉 La prueba debe **fallar** porque viola la FK.

Una prueba automatizada en Node.js podría ser:

```jsx
import { strict as assert } from 'assert';
import db from './db.js';

await db.query('BEGIN');
try {
  await db.query('INSERT INTO pedido (id, cliente_id) VALUES ($1, $2)', [1, 999]);
  assert.fail('La FK debería haber fallado');
} catch (e) {
  assert.ok(e.message.includes('violates foreign key constraint'));
} finally {
  await db.query('ROLLBACK');
}

```

👉 No se daña la base real porque usamos una transacción revertida.

👉 Si alguien rompe la FK en una migración futura, la CI lo detectará.

## 🧭 27.5. Verificación de consultas críticas

Si tienes consultas de negocio que **no deben romperse nunca** (por ejemplo, informes o dashboards), conviene probarlas directamente:

Ejemplo:

```sql
SELECT c.nombre, COUNT(p.id) AS pedidos
FROM cliente c
LEFT JOIN pedido p ON c.id = p.cliente_id
GROUP BY c.id;

```

Test:

```jsx
const result = await db.query(/* consulta */);
assert.equal(result.rows[0].pedidos, 1);
assert.equal(result.rows[1].pedidos, 1);

```

👉 Si alguien cambia columnas, nombres, JOINs o lógica → el test falla antes de desplegar.

## 🧠 27.6. Migraciones y tests automáticos

Una buena práctica es:

- Ejecutar todas las **migraciones desde cero** en un entorno de test.
- Aplicar los fixtures.
- Correr los tests de integridad y consultas.
- (Opcional) revertir migraciones y comprobar que también funcionan al bajar.

Ejemplo de script de CI:

```bash
npm run migrate:latest
npm run seed
npm test
npm run migrate:rollback --all

```

📌 Esto asegura que las migraciones **son realmente reproducibles** y no dependen de un entorno “mágico” que ya estaba montado.

## 🧭 27.7. Testeo de triggers, restricciones y reglas de negocio

Ejemplo:

- Regla: “No se puede hacer un pedido con total negativo”.

```sql
ALTER TABLE pedido ADD CONSTRAINT total_no_negativo CHECK (total >= 0);

```

Test:

```jsx
await db.query('BEGIN');
try {
  await db.query('INSERT INTO pedido (id, cliente_id, total) VALUES (103, 1, -50)');
  assert.fail('Debería haber lanzado error por CHECK');
} catch (e) {
  assert.ok(e.message.includes('total_no_negativo'));
} finally {
  await db.query('ROLLBACK');
}

```

👉 Esto permite **verificar reglas internas de la base** sin necesidad de probarlas indirectamente desde el frontend o backend.

## 🧠 27.8. Revisión de regresiones en CI

Cuando integras esto en **CI/CD**:

- Cada PR ejecuta migraciones desde cero.
- Carga los fixtures.
- Corre todos los tests SQL.
- Si algo se rompe (FK, restricciones, consultas), CI falla y **el error no llega a producción**.

Ejemplo (pipeline simple):

```
- docker-compose up db
- npm run migrate:latest
- npm run seed
- npm test

```

📌 Esto protege tu esquema igual que los tests unitarios protegen tu lógica de negocio.

## 🧭 27.9. Buenas prácticas para pruebas de base de datos

- Mantén fixtures pequeños, claros y versionados.
- Usa transacciones para aislar tests y no ensuciar la base.
- Cubre constraints, triggers, FKs y consultas críticas.
- Integra las pruebas en la CI, no solo en local.
- Asegúrate de que las migraciones se aplican y revierten limpias.
- No dependas de “baselines manuales” o dumps sin versionar.
- Loguea fallos con contexto (tabla, migración, error exacto).

## 🚨 27.10. Errores comunes

- No probar la base porque “los tests ya están en backend”.
- Asumir que si la migración funciona una vez, funcionará siempre.
- No validar reglas de integridad en CI.
- Fixtures enormes y desorganizados.
- Dejar de actualizar tests cuando cambia el esquema.
- No limpiar datos entre tests (contaminación cruzada).