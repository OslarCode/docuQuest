# Modulo 32. Cambios en caliente

## 🧭 32.1. El reto: “cambiar sin romper”

En producción hay tres objetivos al modificar el esquema:

1. **Mantener disponibilidad**: que los usuarios no vean errores.
2. **Mantener compatibilidad**: que la aplicación siga funcionando durante y después del cambio.
3. **Poder revertir rápidamente** si algo sale mal.

Esto implica que **la forma en que haces cambios en producción no puede ser la misma que en desarrollo**.

## 🧠 32.2. Cambios seguros vs cambios peligrosos

Algunos cambios son **casi instantáneos** y no bloquean:

✅ Cambios seguros:

- Añadir columnas con valores por defecto simples o nulos.
- Crear índices en paralelo.
- Crear nuevas tablas, vistas o constraints diferidas.
- Añadir triggers o funciones sin tocar tablas grandes.

⚠️ Cambios peligrosos:

- Borrar columnas o tablas usadas por la aplicación.
- Cambiar tipos de datos de campos grandes.
- Añadir restricciones NOT NULL o UNIQUE sobre millones de filas sin preparación.
- Renombrar columnas que el código aún usa.
- Reescribir relaciones o claves foráneas activas.

📌 La clave está en **descomponer los cambios peligrosos en pasos seguros**.

## 🧭 32.3. Estrategia básica: cambios en dos fases

La regla de oro: **“add first, remove later”**.

Ejemplo: quieres **renombrar una columna** `precio` a `precio_unitario`.

❌ Mal enfoque (riesgoso):

```sql
ALTER TABLE productos RENAME COLUMN precio TO precio_unitario;

```

👉 La aplicación rompe inmediatamente si sigue consultando `precio`.

✅ Enfoque correcto (seguro):

1. **Agregar nueva columna**:

```sql
ALTER TABLE productos ADD COLUMN precio_unitario NUMERIC(10,2);
UPDATE productos SET precio_unitario = precio;

```

1. **Modificar la aplicación** para que use `precio_unitario` sin borrar la vieja.
2. **Verificar logs y tráfico** para confirmar que nadie usa la vieja.
3. **Eliminar columna vieja** cuando todo está estable:

```sql
ALTER TABLE productos DROP COLUMN precio;

```

👉 Cero tiempo de inactividad.

## 🧠 32.4. Añadir restricciones pesadas sin bloqueo

Añadir un `NOT NULL` o `UNIQUE` sobre tablas grandes puede bloquear la escritura durante minutos u horas.

Estrategia segura:

1. **Verificar manualmente que los datos cumplen la restricción**:

```sql
SELECT * FROM usuarios WHERE email IS NULL;

```

1. **Corregir los datos si hay infracciones**.
2. **Agregar la restricción** (o constraint diferida si tu motor lo permite).

Ejemplo:

```sql
ALTER TABLE usuarios
ADD CONSTRAINT email_no_nulo CHECK (email IS NOT NULL) NOT VALID;

ALTER TABLE usuarios
VALIDATE CONSTRAINT email_no_nulo;

```

👉 El `VALIDATE` se hace en segundo plano en muchos motores, reduciendo bloqueos.

## 🧭 32.5. Creación de índices sin interrumpir tráfico

Crear un índice en una tabla grande puede bloquear lecturas y escrituras.

Solución: usar modos concurrentes o en línea.

Ejemplo (PostgreSQL):

```sql
CREATE INDEX CONCURRENTLY idx_pedidos_cliente ON pedidos(cliente_id);

```

👉 Mientras el índice se crea:

- Las operaciones normales siguen funcionando,
- No hay lock exclusivo sobre la tabla.

📌 Este tipo de operaciones debe planificarse, pero **no requieren downtime**.

## 🧠 32.6. “Expand and contract” — estrategia profesional para despliegues

Este patrón se usa en muchas empresas grandes (GitHub, Shopify, Stripe…).

**Fase 1 — Expand** 🪜

- Agrega nueva estructura (columnas, tablas, relaciones).
- Asegúrate de que es compatible con la versión actual de la app.
- Despliega nueva versión de código que puede trabajar con ambas estructuras.

**Fase 2 — Contract** ✂️

- Una vez que todo el tráfico usa la nueva estructura,
- Elimina la antigua de forma controlada y sin impacto.

👉 Así, nunca tienes un estado intermedio que rompa la app.

## 🧭 32.7. Cambios complejos: particiones y relaciones

Algunas migraciones son especialmente sensibles:

- Reparticionar tablas grandes,
- Cambiar claves foráneas activas,
- Fusionar o dividir tablas.

Para estos casos:

- Prepara estructuras paralelas (nuevas tablas, triggers de sincronización).
- Redirige tráfico progresivamente.
- Migra datos en lotes pequeños para evitar bloqueos largos.
- Usa ventanas de mantenimiento planificadas solo si es inevitable.

Ejemplo:

```sql
-- Crear tabla particionada nueva
CREATE TABLE pedidos_nuevo (...) PARTITION BY RANGE (fecha);

-- Copiar datos por lotes
INSERT INTO pedidos_nuevo SELECT * FROM pedidos WHERE fecha < NOW() - INTERVAL '1 year';

-- Activar trigger para redirigir escrituras
-- Cambiar aplicación a nueva tabla
-- Eliminar tabla vieja cuando esté vacía

```

📌 Esto permite “mover” estructuras pesadas **sin downtime masivo**.

## 🧠 32.8. Feature flags y compatibilidad temporal

En muchos despliegues modernos se usan **feature flags** para:

- Activar cambios de esquema de forma gradual,
- Mantener dos caminos compatibles temporalmente,
- Revertir fácilmente si algo falla.

Ejemplo:

- Agregas columna `nuevo_estado`.
- El código lee de `estado` y `nuevo_estado` durante una semana.
- Cuando todo el tráfico usa la nueva columna, borras la vieja.

👉 Esto reduce riesgo y permite rollback rápido.

## 🧭 32.9. Testing de cambios en caliente

Antes de tocar producción:

- Prueba la migración en un entorno staging con datos reales o parecidos.
- Mide el tiempo real que tarda en ejecutarse cada paso.
- Documenta comandos de rollback claros.
- No hagas grandes cambios a ciegas.

Ejemplo:

- Migrar tabla de 50M filas en staging.
- Medir cuánto tarda el índice concurrente.
- Planificar el despliegue real en consecuencia.

📌 Cambiar sin medir = receta para el desastre.

## 🧭 32.10. Buenas prácticas para cambios en caliente

- Prefiere agregar antes que eliminar.
- Usa operaciones concurrentes cuando estén disponibles.
- Divide cambios grandes en pasos pequeños y seguros.
- Despliega código compatible antes de eliminar estructuras viejas.
- Usa triggers o sincronizaciones temporales si hace falta mantener dos estructuras activas.
- Automatiza validaciones previas y postcambio.
- Documenta procedimientos de rollback.

## 🚨 32.11. Errores comunes

- Hacer un `ALTER` destructivo directamente en producción 😬
- No probar cuánto tarda un cambio en tablas grandes.
- No tener rollback → “si falla, estamos jodidos”.
- Borrar estructuras antes de actualizar código.
- No sincronizar cambios entre varios entornos.
- Confiar ciegamente en que “esto tardará poco”.