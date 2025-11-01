# Aislamiento y anomalías

## 21.1. Qué significa “aislamiento” realmente

El aislamiento define **cuánto se “ven” o “no se ven” las operaciones de una transacción mientras otra está ejecutándose**.

Ejemplo simple:

- Transacción A actualiza el stock de un producto.
- Transacción B lee el mismo producto al mismo tiempo.
  Dependiendo del nivel de aislamiento, B:
  - podría ver el valor viejo,
  - podría ver el valor nuevo,
  - o podría tener que esperar a que A termine.

Cuanto **mayor el aislamiento**, más coherencia… pero también más bloqueos y menor rendimiento.

## 21.2. Anomalías clásicas en concurrencia

### 1. **Lectura sucia** (dirty read)

Una transacción **lee datos no confirmados** de otra transacción.

Ejemplo:

- A: `UPDATE producto SET stock = 0` (pero no hace COMMIT todavía).
- B: `SELECT stock FROM producto` → ve `0`.
- A: `ROLLBACK`.
  B leyó un valor **que nunca existió oficialmente**.

Esto puede causar efectos lógicos graves en flujos de negocio.

### 2. **Lectura no repetible** (non-repeatable read)

Una transacción lee el mismo dato dos veces y **obtiene resultados diferentes** porque otra transacción lo modificó entre medias.

Ejemplo:

- A: `SELECT stock FROM producto WHERE id = 1` → obtiene 10.
- B: `UPDATE producto SET stock = 5 WHERE id = 1; COMMIT;`
- A: `SELECT stock FROM producto WHERE id = 1` → obtiene 5.

A no tiene una visión estable del dato durante su ejecución.

### 3. **Lectura fantasma** (phantom read)

Una transacción ejecuta la misma consulta dos veces y aparecen **nuevas filas** insertadas por otra transacción.

Ejemplo:

- A: `SELECT * FROM pedido WHERE estado = 'pendiente'` (devuelve 3 filas).
- B: `INSERT INTO pedido (estado) VALUES ('pendiente'); COMMIT;`
- A: ejecuta la misma SELECT otra vez → ahora hay 4 filas.

No hubo cambios en los registros existentes, pero aparecieron “fantasmas”.

## 21.3. Niveles de aislamiento SQL estándar

| Nivel                | Lectura sucia | No repetible     | Fantasmas        | Descripción rápida                                           |
| -------------------- | ------------- | ---------------- | ---------------- | ------------------------------------------------------------ |
| **READ UNCOMMITTED** | ❌ Permitida  | ✅ Puede ocurrir | ✅ Puede ocurrir | Aislamiento mínimo. Muy rápido pero peligroso.               |
| **READ COMMITTED**   | ✅ Evitada    | ❌ Puede ocurrir | ❌ Puede ocurrir | Garantiza no leer datos no confirmados.                      |
| **REPEATABLE READ**  | ✅ Evitada    | ✅ Evitada       | ❌ Puede ocurrir | Mantiene valores estables pero pueden aparecer nuevas filas. |
| **SERIALIZABLE**     | ✅ Evitada    | ✅ Evitada       | ✅ Evitada       | Máxima consistencia, simula ejecución secuencial.            |

Nota: algunos motores (como PostgreSQL) tienen ligeras variantes en el comportamiento de `REPEATABLE READ` y `SERIALIZABLE`, pero los conceptos son los mismos.

## 21.4. Ejemplo práctico de lecturas sucias

Imagina un sistema de stock.

```sql
-- Transacción A
BEGIN;
UPDATE producto SET stock = 0 WHERE id = 1;
-- (no hace COMMIT todavía)

-- Transacción B
SELECT stock FROM producto WHERE id = 1;

```

Si B devuelve `0` **antes de que A haga COMMIT**, hay una lectura sucia.

Esto ocurre en **READ UNCOMMITTED**.

Si la base está en **READ COMMITTED**, B no ve ese cambio hasta que A confirme.

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

```

## 21.5. Ejemplo de lectura no repetible

```sql
-- Transacción A
BEGIN;
SELECT stock FROM producto WHERE id = 1; -- obtiene 10

-- Transacción B
UPDATE producto SET stock = 5 WHERE id = 1;
COMMIT;

-- Transacción A
SELECT stock FROM producto WHERE id = 1; -- obtiene 5

```

A no tiene una visión estable de los datos.

Esto es típico en READ COMMITTED.

Si usáramos REPEATABLE READ, A seguiría viendo `10` hasta que termine su transacción.

## 21.6. Ejemplo de lectura fantasma

```sql
-- Transacción A
BEGIN;
SELECT COUNT(*) FROM pedido WHERE estado = 'pendiente'; -- obtiene 3

-- Transacción B
INSERT INTO pedido (estado) VALUES ('pendiente');
COMMIT;

-- Transacción A
SELECT COUNT(*) FROM pedido WHERE estado = 'pendiente'; -- obtiene 4

```

A no esperaba que aparecieran nuevas filas durante su transacción.

Esto ocurre en REPEATABLE READ.

Para evitarlo, habría que usar SERIALIZABLE.

## 21.7. SERIALIZABLE — el nivel más fuerte

En nivel SERIALIZABLE, la base de datos:

- Detecta conflictos,
- Bloquea accesos peligrosos,
- O aborta transacciones conflictivas para **mantener un orden secuencial lógico**.

No significa que realmente ejecute una transacción detrás de otra,

sino que **el resultado final es equivalente** a si lo hiciera.

Esto da máxima consistencia, pero:

- Menor concurrencia,
- Más bloqueos y posibles abortos automáticos.

## 21.8. Idempotencia y reintentos: patrón fundamental

En niveles altos (especialmente SERIALIZABLE), algunas transacciones pueden abortar por conflictos.

Ejemplo:

- Dos usuarios reservan el último asiento.
- La base aborta una transacción automáticamente para mantener consistencia.

Tu aplicación debe estar preparada para **reintentar** la operación sin romper la lógica de negocio.

Aquí entra el concepto de **idempotencia**:

> Una operación idempotente puede ejecutarse varias veces sin alterar el resultado final.

Ejemplo típico:

- “Reservar asiento 10 para usuario X” → si ya está reservado, no cambia nada.
- “Agregar producto al carrito” → si ya existe, no duplica.

Patrón común:

```sql
BEGIN;
-- intentar la operación
COMMIT;
-- si falla por conflicto -> rollback y reintentar

```

Esto es fundamental en sistemas de pagos, reservas, inventarios, etc.

## 21.9. Elección del nivel de aislamiento correcto

| Escenario típico                         | Nivel recomendado      | Justificación                                       |
| ---------------------------------------- | ---------------------- | --------------------------------------------------- |
| Lecturas rápidas, informes, analítica    | READ COMMITTED o menor | No se necesita consistencia estricta.               |
| Backoffice con ediciones concurrentes    | REPEATABLE READ        | Evita inconsistencias en lecturas múltiples.        |
| Transacciones críticas (pagos, reservas) | SERIALIZABLE           | Garantiza consistencia total, aunque con más coste. |

No uses el nivel más alto por defecto en toda la app: **ajústalo al caso de uso**.

## 21.10. Buenas prácticas con aislamiento

- Entiende las anomalías y cuándo pueden ocurrir.
- Ajusta el nivel de aislamiento según el **riesgo de inconsistencias**.
- Diseña operaciones idempotentes para facilitar reintentos.
- Mantén transacciones **cortas** para reducir bloqueos.
- Usa bloqueos explícitos (`SELECT ... FOR UPDATE`) si necesitas aislar filas específicas.
- Controla bien la lógica de reintentos en la aplicación.

## 21.11. Errores comunes

- Asumir que “usar transacciones” ya evita todas las anomalías.
- No saber qué nivel de aislamiento usa el motor por defecto.
- Dejar transacciones abiertas demasiado tiempo → bloqueos en cascada.
- No implementar reintentos en niveles altos.
- No identificar operaciones que deberían ser idempotentes.
