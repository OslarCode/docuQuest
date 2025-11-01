# Transacciones y concurrencia

## 1. Qué es una transacción

Una **transacción** es un bloque de operaciones que:

- Se ejecuta **toda o nada**.
- Garantiza que los datos **no queden a medias** si hay un fallo.
- Aísla operaciones simultáneas para evitar inconsistencias.

En SQLite (y en casi todos los motores SQL), esto se rige por las propiedades **ACID**:

| Propiedad | Significado | Qué garantiza |
| --- | --- | --- |
| **A**tomicidad | Todas las operaciones dentro de la transacción se ejecutan o ninguna | “Todo o nada” |
| **C**onsistencia | La base pasa de un estado válido a otro válido | Datos coherentes |
| **I**solación | Varias transacciones no interfieren entre sí | Sin lecturas sucias |
| **D**urabilidad | Los cambios confirmados no se pierden | Persistencia en disco |

Ejemplo simple:

```sql
BEGIN;
INSERT INTO orders (client_id, total) VALUES (1, 50);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (last_insert_rowid(), 2, 3);
COMMIT;

```

Si cualquiera de los `INSERT` falla, toda la transacción se revierte.

Si ambos funcionan, se aplican definitivamente al final.

## 2. Sintaxis básica de transacciones en SQLite

```sql
BEGIN;
-- aquí van tus operaciones
COMMIT;

```

Si hay un problema:

```sql
ROLLBACK;

```

Esto **revierte todo lo que haya pasado desde el `BEGIN`**.

También puedes usar:

```sql
BEGIN TRANSACTION;

```

(o simplemente `BEGIN` — es equivalente).

## 3. Ejemplo práctico — sin transacción

Imagina que quieres insertar un pedido y sus líneas:

```sql
INSERT INTO orders (client_id, total) VALUES (1, 120);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (last_insert_rowid(), 10, 2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (last_insert_rowid(), 15, 1);

```

Si el tercer `INSERT` falla (por ejemplo, por un foreign key inexistente), **los dos primeros ya estarán guardados**, dejando la base en un estado inconsistente.

## 4. Ejemplo correcto — con transacción

```sql
BEGIN;
INSERT INTO orders (client_id, total) VALUES (1, 120);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (last_insert_rowid(), 10, 2);
INSERT INTO order_items (order_id, product_id, quantity) VALUES (last_insert_rowid(), 15, 1);
COMMIT;

```

Si algo falla entre `BEGIN` y `COMMIT`, **ningún cambio queda guardado**.

Esto es especialmente importante en:

- operaciones con múltiples tablas,
- validaciones complejas,
- actualizaciones críticas (saldos, stock, pedidos, reservas…).

## 5. Transacciones implícitas vs explícitas

SQLite inicia transacciones automáticamente en algunos casos (por ejemplo, en `INSERT` individuales), pero **usar transacciones explícitas es más seguro y rápido** cuando haces varias operaciones seguidas.

Además:

- Una transacción explícita reduce los accesos a disco.
- Es **más eficiente** que muchas operaciones sueltas.
- Te permite controlar cuándo confirmar o revertir.

En aplicaciones Node.js o Python, lo habitual es envolver los cambios en un bloque de transacción para evitar estados intermedios corruptos.

## 6. Aislamiento y concurrencia en SQLite

SQLite es **segura en concurrencia**, pero tiene un modelo simple:

**una sola escritura a la vez**, pero **múltiples lecturas concurrentes**.

- Muchos clientes pueden leer al mismo tiempo.
- Solo uno puede escribir (commit) en un instante determinado.
- Si otro intenta escribir mientras hay una escritura en curso, obtendrá un **bloqueo temporal**.

Ejemplo:

- Usuario A hace un `INSERT`.
- Usuario B intenta hacer otro `INSERT` al mismo tiempo.
    
    B esperará hasta que A termine (o fallará si hay timeout).
    

Esto es suficiente para:

- aplicaciones pequeñas y medianas,
- apps web con baja/moderada concurrencia,
- herramientas de escritorio, móviles o edge.

**Importante:** esto no significa que SQLite sea lenta — de hecho es muy eficiente —, solo que **su modelo de concurrencia no es igual que PostgreSQL o MySQL**.

## 7. Tipos de bloqueo en SQLite

SQLite maneja internamente distintos “niveles” de bloqueo:

| Bloqueo | Quién lo usa | Qué permite |
| --- | --- | --- |
| SHARED | Lectores | Varios pueden leer simultáneamente |
| RESERVED | Escritor que se prepara | Lectores pueden seguir leyendo |
| PENDING | Escritor esperando | Espera a que terminen lectores |
| EXCLUSIVE | Escritor escribiendo | Bloquea a todos |

Tú no tienes que manejar esto manualmente — SQLite lo hace por ti.

Pero entenderlo te ayuda a anticipar comportamientos en entornos concurrentes.

## 8. Ejemplo real de concurrencia

Supongamos que tienes dos procesos accediendo a la misma base `primer.db`.

- **Proceso A**:

```sql
BEGIN;
INSERT INTO logs (user_id, ts, action) VALUES (1, datetime('now'), 'escribiendo');
-- no hace COMMIT todavía

```

- **Proceso B**:

```sql
INSERT INTO logs (user_id, ts, action) VALUES (2, datetime('now'), 'también escribiendo');

```

Resultado:

- B se bloquea momentáneamente (espera a que A libere).
- Si A hace `COMMIT`, B continúa.
- Si A se cuelga o tarda demasiado, B lanza un error de “database is locked”.

Esto es normal: **una escritura a la vez**.

## 9. Timeout y reintentos

Puedes configurar un tiempo de espera para evitar errores inmediatos de bloqueo:

```sql
PRAGMA busy_timeout = 5000;  -- en milisegundos

```

Esto da a SQLite hasta 5 segundos para esperar antes de devolver error.

En Node.js (`better-sqlite3`):

```jsx
db.pragma('busy_timeout = 5000');

```

Esto es útil en aplicaciones web multiusuario, evitando que un pequeño pico de concurrencia rompa la app.

## 10. Buenas prácticas con transacciones y concurrencia

- Usa `BEGIN` y `COMMIT` para agrupar operaciones relacionadas.
- Usa `ROLLBACK` si detectas errores intermedios.
- Usa `busy_timeout` si esperas varios usuarios escribiendo a la vez.
- Mantén las transacciones **cortas** — cuanto menos tiempo tengas el bloqueo, mejor.
- No hagas operaciones lentas (como llamadas a APIs) dentro de una transacción.
- Prueba escenarios de concurrencia en desarrollo, no solo en producción.

## Errores comunes

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| “database is locked” | Dos escrituras simultáneas | Usa `busy_timeout` o diseña operaciones más cortas |
| Cambios parciales | No usaste transacción | Agrupa operaciones con `BEGIN` / `COMMIT` |
| Datos corruptos | Cortes o fallos en mitad de operaciones | Usa transacciones y WAL |
| Lecturas lentas durante escritura | Transacción larga bloqueando | Acorta bloqueos |

## 1. Qué es WAL (Write-Ahead Logging)

Por defecto, SQLite usa el **modo de journaling tradicional** (`DELETE`), que:

- Bloquea la base mientras escribe.
- Es seguro, pero **poco eficiente si hay muchas lecturas y escrituras al mismo tiempo**.

WAL (Write-Ahead Logging) cambia la estrategia:

- En lugar de escribir directamente en el archivo `.db`,
- SQLite escribe primero en un **archivo WAL temporal**,
- Y luego **sincroniza** los cambios en segundo plano.

Esto significa:

- Varias **lecturas pueden ocurrir mientras hay una escritura**.
- Las operaciones se vuelven más fluidas.
- No se bloquean tantas conexiones simultáneas.

## 2. Activar WAL mode en SQLite

Activar WAL es tan sencillo como ejecutar:

```sql
PRAGMA journal_mode = WAL;

```

Ejemplo en el shell:

```sql
sqlite> PRAGMA journal_mode = WAL;
wal

```

Resultado: la base ahora funciona en modo WAL.

También puedes verificar el modo actual:

```sql
PRAGMA journal_mode;

```

→ `wal` si está activo.

Esto crea un archivo adicional junto a tu `.db`:

```
primer.db
primer.db-wal
primer.db-shm

```

Estos archivos almacenan los cambios pendientes antes de consolidarlos.

## 3. ¿Qué cambia con WAL?

Modo clásico (`DELETE`):

- Escritura bloquea lectura.
- Escritura se aplica directamente sobre `.db`.
- Rendimiento limitado en alta concurrencia.

Modo WAL:

- Lecturas y escritura pueden ocurrir en paralelo.
- Escritura va primero al WAL y luego se consolida.
- Mucho mejor rendimiento en apps con lecturas frecuentes.

**Ejemplo real**:

- En modo DELETE, si un usuario está insertando un gran lote, otros deben esperar.
- En modo WAL, los lectores pueden seguir trabajando mientras la escritura ocurre.

## 4. Ejemplo de mejora con WAL

Supón que tienes un script que hace miles de inserts:

```sql
BEGIN;
INSERT INTO logs (user_id, ts, action) VALUES (1, datetime('now'), 'test');
-- repetir muchas veces...
COMMIT;

```

Y otra sesión hace:

```sql
SELECT COUNT(*) FROM logs;

```

- En **DELETE mode**: la segunda sesión esperará el fin de la escritura.
- En **WAL mode**: puede seguir leyendo sin bloquearse.

Esto es especialmente útil en:

- aplicaciones web multiusuario,
- dashboards con muchas lecturas,
- apps embebidas que escriben y leen al mismo tiempo.

## 5. Checkpoint: cómo y cuándo se consolida el WAL

Cuando usas WAL, los cambios se escriben en `primer.db-wal`.

Para que esos cambios pasen al archivo principal `.db`, SQLite hace un **checkpoint**.

Existen dos modos:

- **Automático**: SQLite hace checkpoint cuando el WAL supera cierto tamaño (por defecto, 1.000 páginas).
- **Manual**: puedes forzar un checkpoint cuando quieras:

```sql
PRAGMA wal_checkpoint(FULL);

```

También puedes usar:

```sql
PRAGMA wal_checkpoint(TRUNCATE);

```

→ Esto además reduce el tamaño físico del WAL.

💡 *Consejo real*: en la mayoría de aplicaciones basta con el checkpoint automático.

Solo en escenarios muy controlados (por ejemplo, backups programados) conviene forzarlo manualmente.

## 6. WAL y transacciones

WAL **no cambia cómo usas las transacciones**:

- Sigues usando `BEGIN` y `COMMIT` igual.
- Pero ahora **las lecturas no se bloquean mientras la transacción de escritura no haya hecho commit**.

Importante:

- Solo **una escritura activa** a la vez (como siempre en SQLite).
- Pero **muchas lecturas pueden ocurrir al mismo tiempo** sin esperas.

## 7. WAL y backups seguros

Cuando uses WAL, debes tener esto en cuenta al hacer copias de seguridad:

- Si copias solo `primer.db` mientras hay operaciones pendientes en el WAL, **no tendrás un backup completo**.
- Debes asegurarte de que la base esté en un estado consistente:
    - O bien esperar a que se haga un checkpoint,
    - O bien forzarlo tú antes de copiar:
        
        ```sql
        PRAGMA wal_checkpoint(FULL);
        
        ```
        
    - Luego hacer la copia de `primer.db`.

También puedes usar la utilidad `sqlite3`:

```bash
sqlite3 primer.db ".backup 'backup.db'"

```

Esto crea un backup **coherente y seguro**, sin importar el estado del WAL.

## 8. Ejercicio práctico — activar y usar WAL

1. Activa WAL:

```sql
PRAGMA journal_mode = WAL;

```

1. Inserta datos desde una sesión A:

```sql
BEGIN;
INSERT INTO logs (user_id, ts, action) VALUES (1, datetime('now'), 'writing...');
-- no commits aún

```

1. Desde una sesión B:

```sql
SELECT COUNT(*) FROM logs;

```

Observa que no se bloquea la lectura.

1. Haz commit desde A:

```sql
COMMIT;

```

1. Haz checkpoint:

```sql
PRAGMA wal_checkpoint(FULL);

```

1. Verifica que los cambios estén consolidados.

## 9. Buenas prácticas con WAL

- Activa WAL si esperas **múltiples lecturas y escrituras concurrentes**.
- Mantén las transacciones cortas para reducir el tiempo de bloqueo de escritura.
- Deja que SQLite haga los checkpoints automáticos — forzarlos manualmente solo si es necesario (p.ej. antes de un backup).
- Usa `.backup` en lugar de copiar archivos directamente si hay actividad.
- No borres el archivo WAL manualmente: SQLite lo gestiona solo.

## Errores comunes con WAL

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| “database is locked” | Transacción larga de escritura | Acorta la transacción o usa busy_timeout |
| Copia de seguridad incompleta | No se incluyó el WAL | Usa `PRAGMA wal_checkpoint` o `.backup` |
| Archivo WAL muy grande | Checkpoints no se han ejecutado | Forzar checkpoint si es necesario |
| Lector bloqueado | Lector antiguo que impide limpiar WAL | Cierra conexiones que no se usen |

## 10. Resumen: WAL + transacciones = potencia real

Con WAL activado:

- Lecturas y escritura **coexisten sin bloquearse**.
- La base es **más rápida bajo carga**.
- Las transacciones siguen garantizando **seguridad ACID**.
- Los backups requieren un pequeño cuidado extra, pero nada complejo.

Para muchos proyectos (APIs, dashboards, apps locales multiusuario), **activar WAL es el mayor salto de rendimiento** que puedes hacer sin cambiar de motor.