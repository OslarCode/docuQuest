# Desnormalización controlada

## 8.1. Qué es desnormalizar (de verdad)

**Desnormalizar** no es volver a cometer errores de diseño.

Es **romper intencionadamente una o más formas normales** para:

- Mejorar el rendimiento de lecturas frecuentes,
- Reducir el número de joins costosos,
- O simplificar ciertos casos de uso específicos.

La clave es que sea:

- **Controlado** → sabes qué estás sacrificando.
- **Documentado** → el equipo entiende por qué y dónde.
- **Mantenido** → sabes cómo sincronizar los datos duplicados.

## 8.2. Ejemplo base — Sistema de pedidos normalizado

Recordemos un esquema perfectamente normalizado (Módulo 7):

```
cliente(id_cliente, nombre, direccion)
producto(id_producto, nombre, precio)
pedido(id_pedido, fecha, id_cliente, total)
pedido_producto(id_pedido, id_producto, cantidad)

```

Para mostrar el detalle de un pedido completo, necesitamos al menos **3 JOINs**:

- pedido → cliente
- pedido_producto → producto
- producto → precio

Si tenemos millones de filas y la consulta es frecuente (ej. dashboard, reportes), esto puede ser **costoso**.

## 8.3. Desnormalización puntual — duplicar datos “seguros”

Una opción común es **guardar algunos atributos redundantes** directamente en la tabla `pedido` o `pedido_producto` para evitar joins constantes.

Ejemplo:

```
pedido(
  id_pedido,
  fecha,
  id_cliente,
  nombre_cliente_cache,   <-- duplicado de cliente.nombre
  total
)

```

Ventajas:

- Reportes más rápidos.
- Menos joins para casos de lectura frecuente.
- Se simplifica el acceso desde capas superiores.

Desventajas:

- Si cambia el nombre del cliente, hay que actualizar más de un sitio.
  (pero puede ser aceptable si esos datos son “históricos”).

**Buen patrón:**

Desnormaliza **datos que no cambian con frecuencia** o que se usan como “snapshot” (por ejemplo, nombre del cliente al momento del pedido).

## 8.4. Desnormalizar para reportes agregados

Otro caso común: si necesitas constantemente el **importe total por cliente**, puedes:

- Calcularlo dinámicamente (JOIN + SUM)
- O mantenerlo desnormalizado en `cliente` como un campo `importe_acumulado`.

```
cliente(
  id_cliente,
  nombre,
  direccion,
  importe_acumulado   <-- calculado y sincronizado
)

```

Esto reduce queries de agregación pesadas.

Pero requiere un **mecanismo de actualización controlado** (trigger, batch, proceso ETL, etc.).

En sistemas reales, esto se usa muchísimo para dashboards y métricas en tiempo real.

## 8.5. Desnormalización por pre-cálculo

Supón que tu aplicación muestra:

- Total de pedidos por mes,
- Total de productos vendidos por categoría.

En lugar de calcularlo cada vez con miles de registros,

puedes tener una tabla desnormalizada de **agregados precomputados**:

```
ventas_resumen(
  anio_mes,
  categoria,
  total_pedidos,
  total_unidades,
  total_facturado
)

```

Esta tabla no es origen de verdad:

- Se **regenera o sincroniza periódicamente**,
- Sirve **exclusivamente para consultas rápidas** (reporting, dashboards).

Este patrón es extremadamente común en BI y analítica.

## 8.6. Desnormalizar para consultas con alto tráfico

Caso real (e-commerce):

- `pedido` tiene 10M de registros.
- La API muestra los 10 últimos pedidos de cada cliente miles de veces al día.
- Los JOIN a `cliente` y `producto` son caros.

Solución práctica:

- Crear una tabla `pedido_resumen` con la información más consultada ya premezclada.

```
pedido_resumen(
  id_pedido,
  fecha,
  nombre_cliente,
  direccion_cliente,
  lista_productos_texto,
  total
)

```

No reemplaza al modelo normalizado original.

Se mantiene sincronizada mediante:

- triggers en cada inserción de pedido,
- jobs programados (batch),
- o colas de eventos (si hay microservicios).

Esto se conoce como **“tabla materializada”** o **“vista materializada”**.

## 8.7. Comparación clara

| Totalmente normalizado              | Desnormalizado controlado                             |
| ----------------------------------- | ----------------------------------------------------- |
| Alta integridad                     | Rendimiento optimizado en casos específicos           |
| Sin duplicaciones                   | Duplica campos seleccionados                          |
| JOINs necesarios                    | JOINs reducidos                                       |
| Ideal para OLTP                     | Ideal para OLAP / reporting                           |
| Complejo en consultas de agregación | Consultas más simples y rápidas                       |
| Mantenimiento más fácil             | Mantenimiento más delicado (sincronización necesaria) |

En sistemas reales, **ambos modelos suelen coexistir**:

uno como **fuente de verdad** y otro como **modelo optimizado para lectura**.

## 8.8. Buenas prácticas en desnormalización

- 📌 Desnormaliza **solo cuando tengas un caso de uso medido**, no “por si acaso”.
- 📌 Documenta claramente qué datos están duplicados y desde dónde se actualizan.
- 📌 Mantén **la versión normalizada como referencia canónica**.
- 📌 Automatiza la sincronización (triggers, tareas programadas, pipelines ETL, vistas materializadas).
- 📌 Evalúa si realmente vale la pena antes de duplicar información.

## Errores comunes

- Desnormalizar sin medir → consultas rápidas hoy, dolor de cabeza mañana.
- Romper relaciones críticas → inconsistencias silenciosas.
- No actualizar los duplicados → datos desfasados.
- Usar desnormalización como sustituto de un buen diseño inicial.

## 8.9. Ejercicio práctico guiado — Casos reales de desnormalización

### Caso 1 — Snapshot de cliente en pedidos

1. Añadir `nombre_cliente_cache` y `direccion_cliente_cache` en `pedido`.
2. Mantenerlos sincronizados al crear un pedido.
3. Si cambia la dirección en `cliente`, no actualizar pedidos antiguos (histórico).

### Caso 2 — Tabla agregada para dashboard

1. Crear `ventas_resumen` con totales por mes y categoría.
2. Rellenarla automáticamente cada noche con un script o job.
3. Consultar dashboard directamente sobre `ventas_resumen`.

### Caso 3 — Vista materializada para API

1. Crear `pedido_resumen` con JOINs precomputados.
2. Consultar la API solo sobre esta tabla para reducir latencia.

Así funcionan internamente muchos ERPs, CRMs y plataformas de e-commerce a gran escala.
