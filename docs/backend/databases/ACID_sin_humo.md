# ACID sin humo

## 20.1. ¿Qué es una transacción?

Una **transacción** es una unidad lógica de trabajo:

> Un conjunto de operaciones que deben ejecutarse como si fueran una sola.

Ejemplo:

- Quitar dinero de una cuenta.
- Añadir ese dinero a otra cuenta.
  Las dos operaciones **deben cumplirse juntas** o no cumplirse en absoluto.

En SQL:

```sql
BEGIN;
UPDATE cuenta SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuenta SET saldo = saldo + 100 WHERE id = 2;
COMMIT;

```

Si algo falla entre medio:

```sql
ROLLBACK;

```

La base de datos revierte todos los cambios.

Esto evita inconsistencias como “dinero desaparecido”.

## 20.2. Las 4 propiedades ACID

| Propiedad        | Qué garantiza                                              |
| ---------------- | ---------------------------------------------------------- |
| **A**tomicidad   | Todo o nada: una transacción no queda a medias.            |
| **C**onsistencia | La base pasa de un estado válido a otro válido.            |
| **I**solamiento  | Las transacciones concurrentes no interfieren entre sí.    |
| **D**urabilidad  | Si se confirma, los cambios persisten incluso ante fallos. |

Vamos a desglosarlas con ejemplos reales

## 20.3. Atomicidad — “Todo o nada”

Ejemplo: transferencia bancaria.

```sql
BEGIN;
UPDATE cuenta SET saldo = saldo - 500 WHERE id = 1;
UPDATE cuenta SET saldo = saldo + 500 WHERE id = 2;
COMMIT;

```

Si la segunda instrucción falla (por ejemplo, cuenta inexistente):

`ROLLBACK` revierte la primera.

Nadie pierde ni gana dinero de forma inconsistente.

Si no existiera atomicidad:

- El primer UPDATE se haría,
- El segundo fallaría,
- Y el dinero se “evaporaría”.

**Regla práctica:**

> No confíes en que tu aplicación controle todo. Las transacciones son tu red de seguridad.

## 20.4. Consistencia — siempre en un estado válido

Cada regla que definimos (FK, CHECK, UNIQUE, dominios…) **define un estado válido**.

La propiedad de **consistencia** garantiza que:

- Si la BD parte de un estado válido,
- Y ejecutas una transacción válida,
- Entonces termina en otro estado válido.

Ejemplo:

- Regla: ningún saldo de cuenta puede ser negativo (`CHECK (saldo >= 0)`).
- Si intentas transferir más de lo que hay:

```sql
UPDATE cuenta SET saldo = saldo - 10000 WHERE id = 1;

```

La restricción falla.

La transacción no se confirma.

La BD **nunca entra en un estado inválido**.

Esto es lo que diferencia un sistema robusto de uno “hecho a mano” que permite errores silenciosos.

## 20.5. Aislamiento — cuando varios actúan al mismo tiempo

Aquí es donde se pone interesante 👀

En sistemas reales, no hay un solo usuario ejecutando transacciones. Hay cientos, miles…

El aislamiento asegura que **una transacción no interfiera con otra**.

Ejemplo real:

- Usuario A está comprando el último billete de avión.
- Usuario B también.
  Si no hay aislamiento, **los dos podrían comprar el mismo asiento** al mismo tiempo.

Con transacciones:

```sql
BEGIN;
SELECT * FROM vuelos WHERE id = 1 FOR UPDATE;
-- (bloquea la fila)
UPDATE vuelos SET asientos_libres = asientos_libres - 1 WHERE id = 1;
COMMIT;

```

Si B intenta hacer lo mismo mientras A no ha terminado:

- La fila está bloqueada.
- Su transacción espera.
- Solo uno de los dos obtiene el asiento.

Sin aislamiento, tendrías **condiciones de carrera** e inconsistencias.

## 20.6. Durabilidad — lo que se confirma no se pierde

La durabilidad garantiza que si una transacción **se confirma (`COMMIT`)**,

sus cambios **persisten incluso si el servidor se cae** justo después.

Esto lo logran los motores de BD mediante:

- **Journaling** o **Write Ahead Log** (WAL),
- Registros de cambios en disco antes de confirmar,
- Mecanismos de recuperación automáticos tras fallos.

Ejemplo real:

- Usuario compra un producto → pago procesado → `COMMIT`.
- Se va la luz.
  Cuando el servidor vuelva, **el pedido sigue registrado**.

Sin durabilidad, la base podría quedar en un estado “medio roto” después de un fallo.

## 20.7. Ejemplo completo — reserva de entradas

Supongamos un sistema de entradas de concierto.

1. Consultar disponibilidad.
2. Restar una entrada.
3. Registrar el pedido.

```sql
BEGIN;

SELECT stock FROM entrada WHERE id_evento = 1 FOR UPDATE;
UPDATE entrada SET stock = stock - 1 WHERE id_evento = 1;
INSERT INTO pedido (id_usuario, id_evento, fecha) VALUES (10, 1, NOW());

COMMIT;

```

- Atomicidad: si la inserción del pedido falla, la resta del stock también se revierte.
- Consistencia: no se permiten stocks negativos.
- Aislamiento: solo un usuario a la vez puede reservar el mismo asiento.
- Durabilidad: si se corta la luz después de `COMMIT`, el pedido queda registrado.

Esto es exactamente lo que pasa en sistemas de venta de entradas, billetes de avión, etc.

## 20.8. Transacciones explícitas vs automáticas

Por defecto, muchas bases ejecutan cada sentencia como **una transacción automática** (autocommit).

Pero cuando necesitas atomicidad real en **operaciones múltiples**, debes agruparlas manualmente:

```sql
BEGIN;
-- Varias operaciones dependientes
COMMIT; -- o ROLLBACK en caso de error

```

Recomendación:

- Para operaciones críticas → usa transacciones explícitas.
- Para operaciones simples e independientes → autocommit está bien.

## 20.9. Buenas prácticas con transacciones

- Haz **transacciones cortas**: bloqueos prolongados generan cuellos de botella.
- Asegúrate de que **todas las operaciones dependientes estén dentro** de la misma transacción.
- Siempre considera qué pasa si algo falla a mitad.
- Usa `ROLLBACK` para revertir en caso de error.
- Aprovecha restricciones de integridad para reforzar la consistencia.

## 20.10. Errores comunes

- No usar transacciones cuando varias operaciones dependen unas de otras.
- Confiar en que “nada fallará” (spoiler: siempre falla).
- Mantener transacciones abiertas demasiado tiempo.
- No manejar fallos correctamente (sin rollback).
- No entender los efectos de múltiples usuarios concurrentes.
