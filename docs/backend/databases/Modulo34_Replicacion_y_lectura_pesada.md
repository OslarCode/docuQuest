# Modulo 34. Replicación y lectura pesada

## 🧭 34.1. Por qué replicar una base de datos

Cuando una base de datos crece:

- Las lecturas se multiplican (dashboards, APIs, informes, consultas de usuarios…),
- Pero **no todas esas lecturas tienen que ir al mismo servidor**.

👉 Al replicar la base:

- Mantienes **un nodo primario** para escrituras,
- Y **uno o varios nodos secundarios** que reciben copias de los datos para lecturas.

📌 Ventajas prácticas:

- 🚀 Escalas lecturas sin saturar el nodo principal.
- 🧯 Tienes redundancia en caso de fallo del primario.
- 📊 Puedes usar los secundarios para reporting, backups o tareas pesadas sin afectar la producción.

## 🧠 34.2. Arquitectura básica primario/secundario

```
        ┌───────────┐
        │ Aplicación│
        └────┬──────┘
             │
 ┌───────────┴─────────────┐
 │ Servidor Primario (write) │
 └───────────┬─────────────┘
             │
   ┌─────────┴─────────┐
   │ Nodo Secundario 1 │
   ├────────────────────┤
   │ Nodo Secundario 2 │
   └────────────────────┘

```

- El **primario** acepta INSERT, UPDATE y DELETE.
- Los **secundarios** replican esos cambios automáticamente.
- La aplicación puede **dirigir las lecturas** a los secundarios.

👉 Este patrón se llama *asynchronous replication* (replicación asíncrona) cuando los secundarios no bloquean las escrituras del primario.

## 🧭 34.3. Ejemplo sencillo — PostgreSQL streaming replication

Supón que tienes dos servidores:

- `db1` (primario)
- `db2` (secundario)

En `db1`:

```
# postgresql.conf
wal_level = replica
max_wal_senders = 5

```

En `db2`:

```
primary_conninfo = 'host=db1 user=replicador password=xxxx'

```

Luego inicializas la réplica:

```bash
pg_basebackup -h db1 -D /var/lib/postgresql/data -U replicador -P --wal-method=stream

```

👉 A partir de ahí, `db2` recibirá en tiempo real los cambios de `db1`.

📌 No necesitas que la aplicación cambie nada en la lógica de escritura.

Solo decides a qué nodo va cada consulta de lectura.

## 🧠 34.4. Lecturas escaladas — distribuir carga

Un patrón común:

- Todas las **escrituras** (INSERT/UPDATE/DELETE) → van al **primario**.
- Las **lecturas pesadas o repetitivas** → se envían a **uno o varios secundarios**.

Ejemplo con un balanceador simple:

```jsx
function getReadConnection() {
  // Balanceo simple round-robin entre réplicas
  const replicas = [dbReplica1, dbReplica2];
  return replicas[Math.floor(Math.random() * replicas.length)];
}

function getWriteConnection() {
  return dbPrimary;
}

```

👉 Así reduces la presión sobre el primario, evitando cuellos de botella.

📌 Muy usado en aplicaciones con muchas lecturas (ecommerce, SaaS, APIs públicas…).

## 🧭 34.5. Consistencia eventual — concepto clave

La replicación **no es instantánea**.

Existe un pequeño retraso entre:

- Escribir en el primario,
- Y ver ese cambio reflejado en un secundario.

Ejemplo:

1. INSERT en primario a las 12:00:00
2. SELECT en secundario a las 12:00:00.010 → todavía no aparece.
3. SELECT en secundario a las 12:00:00.050 → ahora sí aparece.

📌 Este retraso (replication lag) puede ser:

- Imperceptible (milisegundos), o
- Notable (segundos o minutos) si el sistema está bajo carga.

👉 Esto se llama **consistencia eventual**:

Los datos **terminan siendo consistentes**, pero no **instantáneamente consistentes**.

## 🧠 34.6. Ejemplo real de inconsistencia temporal

Imagina que un usuario crea un pedido:

```jsx
await dbPrimary.query('INSERT INTO pedidos ...');

```

Y justo después la app lo consulta para mostrarlo en su panel:

```jsx
const result = await dbReplica.query('SELECT * FROM pedidos WHERE id = ...');

```

Si la consulta de lectura va a una réplica que **aún no recibió la actualización**,

👉 la app mostrará “no hay pedidos”.

📌 Este es un **problema común** en sistemas con réplicas.

### Soluciones típicas:

- Para operaciones sensibles: **leer del primario** inmediatamente después de escribir.
- O usar mecanismos de sincronización (por ejemplo, esperar confirmación de replicación en algunos motores).

## 🧭 34.7. Replicación síncrona vs asíncrona

| Tipo | Características | Ventajas | Desventajas |
| --- | --- | --- | --- |
| **Asíncrona** (la más común) | El primario no espera a los secundarios | Rápida, escalable, sin bloquear escrituras | Pequeño retraso entre nodos |
| **Síncrona** | El primario espera confirmación de al menos un secundario | Cero lag (consistencia fuerte) | Menor rendimiento, más latencia en escritura |

👉 En la práctica:

- Asíncrona se usa para escalabilidad de lecturas.
- Síncrona se usa cuando no se puede perder ni un solo dato.

Ejemplo:

- Plataforma de streaming → asíncrona.
- Sistema bancario → síncrona.

## 🧠 34.8. Failover y alta disponibilidad

Otro beneficio de la replicación:

👉 Si el nodo primario falla, **uno de los secundarios puede asumir su rol**.

- **Failover manual** → un administrador promueve un nodo secundario.
- **Failover automático** → herramientas como Patroni, Stolon, Orchestrator o RDS lo hacen de forma controlada.

Ejemplo en PostgreSQL:

```bash
pg_ctl promote

```

👉 El nodo replica pasa a ser primario.

📌 Esto mejora la disponibilidad sin requerir copias manuales de última hora.

## 🧭 34.9. Replicación + particionamiento = escalabilidad real

- El particionamiento (Módulo 33) divide grandes tablas en pedazos manejables dentro de un nodo.
- La replicación (Módulo 34) permite **multiplicar nodos para distribuir carga**.

👉 Combinarlos da lugar a arquitecturas muy potentes:

- Primario particionado, con múltiples réplicas por shard.
- Lecturas distribuidas geográficamente.
- Alta disponibilidad con failover automatizado.

📌 Ejemplo real: muchas plataformas globales (Netflix, GitHub, Shopify) usan este patrón híbrido.

## 🧠 34.10. Buenas prácticas en entornos con replicación

- Define qué consultas pueden ir a réplicas (solo lecturas no críticas).
- Mide y monitorea el **replication lag** constantemente.
- Para operaciones sensibles, **forzar lectura al primario**.
- Automatiza failover para evitar downtime prolongado.
- Documenta cómo se maneja cada escenario (falla del primario, recuperación, etc.).
- No uses réplicas solo como “backup”: su propósito es **distribuir carga** y **mejorar disponibilidad**.

## 🚨 34.11. Errores comunes

- Leer datos recién escritos desde una réplica → inconsistencias visibles.
- Asumir que la replicación es instantánea.
- No monitorear el lag → consultas lentas y datos desfasados.
- No probar el failover → caos cuando el primario se cae.
- Pensar que tener réplicas reemplaza a los backups (⚠️ no lo hace).