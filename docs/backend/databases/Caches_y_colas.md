# Cachés y colas

## 35.1. El cuello de botella de la base de datos

En sistemas grandes, **el 80–90 % del tráfico son lecturas repetitivas**:

- Consultas para dashboards,
- Contadores de vistas,
- Detalles de productos,
- Información que cambia poco o nada.

Si todas esas lecturas golpean directamente al primario o a las réplicas → te comes el rendimiento y subes costos.

Ahí entra **la caché**: guardar respuestas calculadas para no repetir consultas innecesarias.

## 35.2. Qué es la caché en este contexto

La **caché** es una **copia temporal** de datos que ya fueron consultados o calculados.

Ejemplo:

```
Consulta a BD: producto 123 → tarda 80 ms
Caché: producto 123 → tarda 2 ms

```

Si 10 000 usuarios piden lo mismo, lo resuelves una sola vez en la base…

y 9 999 veces desde caché.

Esto alivia carga, mejora tiempos de respuesta y abarata recursos.

## 35.3. Tipos de caché más comunes

1. **Caché en memoria de la aplicación** (in-memory)
   - Guardar resultados directamente en RAM de cada instancia.
   - Rápida, pero local a un servidor.
2. **Caché compartida (centralizada)**
   - Redis, Memcached u otros.
   - Accesible desde varias instancias.
   - Ideal para escalabilidad horizontal.
3. **Caché en base de datos** (materialized views, summary tables…)
   - Ya lo vimos en el Módulo 29.
   - Menos flexible, pero estable y transaccional.

## 35.4. Ejemplo básico con Redis (caché compartida)

Supongamos una API que consulta productos:

```jsx
async function getProducto(id) {
  const cacheKey = `producto:${id}`;
  const cacheValue = await redis.get(cacheKey);

  if (cacheValue) {
    return JSON.parse(cacheValue); // ⚡ lectura desde caché
  }

  const result = await db.query("SELECT * FROM producto WHERE id = $1", [id]);
  const producto = result.rows[0];

  await redis.set(cacheKey, JSON.stringify(producto), "EX", 60); // TTL 60s
  return producto;
}
```

La primera consulta va a la base.

Las siguientes van a Redis durante 60 segundos.

Esto **reduce tráfico innecesario**.

## 35.5. TTL y expiración: equilibrio entre velocidad y coherencia

La caché **no es mágica**. Si los datos cambian en la base, la caché puede quedar desactualizada.

Ejemplo:

- Usuario cambia el precio de un producto.
- Redis sigue sirviendo el precio viejo durante 60 segundos.

Para controlar esto:

- TTL (time to live) → define cuánto tiempo vive una entrada en caché.
- Invalidación → borrar o actualizar la entrada en caché cuando cambia en la base.

Ejemplo de invalidación al actualizar:

```jsx
await db.query("UPDATE producto SET precio = $1 WHERE id = $2", [
  nuevoPrecio,
  id,
]);
await redis.del(`producto:${id}`);
```

Así, la próxima lectura se actualizará automáticamente.

## 35.6. Estrategias de invalidación

1. **Time-based (TTL)**
   - Simple y fácil de implementar.
   - Buena si los datos cambian poco.
   - Riesgo: servir datos viejos temporalmente.
2. **Write-through**
   - Actualizas base y caché **en la misma operación**.
   - Asegura sincronía, pero es más costoso.
3. **Write-behind**
   - Escribes primero en caché y luego en la base (peligroso si no se diseña bien).
4. **Explicit invalidation**
   - Borras o actualizas caché cuando hay un cambio.
   - Es más predecible y confiable en la práctica.

**Regla de oro:** la invalidación de caché es más importante que la caché en sí.

## 35.7. Cachés mal diseñadas = incoherencias silenciosas

Si no se invalida bien la caché:

- El usuario puede ver datos viejos,
- Informes pueden usar valores desactualizados,
- Se pueden tomar decisiones de negocio con información errónea.

Ejemplo clásico:

- Un carrito de compras guarda stock en caché.
- Dos usuarios compran el último ítem al mismo tiempo.
  Resultado: **overselling**.

Por eso **no todos los datos deben cachearse**, especialmente si cambian rápido o tienen implicaciones transaccionales.

## 35.8. Cuándo **sí** conviene cachear

Ideal para:

- Catálogos de productos o servicios.
- Datos públicos o semi-estáticos (precios, textos, configuración).
- Reportes precomputados.
- Resultados de consultas costosas que no cambian constantemente.

No recomendable para:

- Stocks en tiempo real.
- Saldos financieros.
- Datos críticos que deben estar siempre sincronizados.
- Transacciones en curso.

Cachea inteligentemente, no todo.

## 35.9. Colas: aliviar carga **diferida**

A diferencia de la caché, las **colas no evitan lecturas**, sino que **desacoplan operaciones** que no necesitan hacerse al instante.

Ejemplo:

Cuando un usuario hace una compra:

1. Se guarda el pedido en la base (rápido).
2. Se encola un evento “enviar email de confirmación”.
3. Un proceso en segundo plano procesa esa cola y envía el correo.

Así evitas sobrecargar la base o el servidor web en el momento crítico de la transacción.

## 35.10. Ejemplo sencillo de cola (RabbitMQ / Redis)

```jsx
// productService.js
await db.query("INSERT INTO pedidos (...) VALUES (...)");
await queue.send("emails", { pedidoId });

// worker.js
queue.consume("emails", async (msg) => {
  const { pedidoId } = msg;
  const pedido = await db.query("SELECT * FROM pedidos WHERE id = $1", [
    pedidoId,
  ]);
  await enviarCorreo(pedido);
});
```

El sistema no espera a que se envíe el email para responder al usuario.

Esto mejora **tiempos de respuesta** y **robustez**.

## 35.11. Beneficios de usar colas

- Evitas bloquear operaciones críticas con tareas lentas.
- Controlas picos de carga (las colas absorben “olas” de trabajo).
- Puedes reintentar operaciones fallidas.
- Aíslas componentes: la base hace lo suyo, el worker hace lo suyo.

Muy común en:

- Envío de correos,
- Generación de reportes pesados,
- Sincronizaciones con sistemas externos,
- Notificaciones en segundo plano.

## 35.12. Riesgos si no se diseñan bien

- Si la cola falla → tareas pendientes se pierden.
- Si no hay idempotencia → tareas duplicadas pueden generar inconsistencias.
- Si no se monitorea → la cola se llena silenciosamente y todo se frena.
- Si la lógica de negocio depende del worker para mantener coherencia → mala arquitectura.

Una cola no debe contener **operaciones críticas sin fallback**.

## 35.13. Caché + colas: un combo poderoso

Muchos sistemas modernos combinan ambos:

- Caché → reduce lecturas innecesarias.
- Colas → diferencian operaciones no urgentes.

Ejemplo real:

- Usuario actualiza su perfil.
- Se invalida la caché para que la app sirva los datos nuevos.
- Se encola una tarea para sincronizar ese cambio con otro sistema (por ejemplo, CRM).
- La respuesta al usuario es inmediata.

Esto mejora rendimiento y resiliencia sin sacrificar coherencia crítica.

## 35.14. Buenas prácticas para cachés y colas

- Cachea solo lo que tiene sentido cachear.
- Define políticas claras de invalidación.
- Usa TTL razonables.
- Diseña colas para absorber carga, no para guardar lógica crítica.
- Haz que las tareas encoladas sean idempotentes.
- Monitorea métricas: hit ratio en caché, tamaño de la cola, tiempos de procesamiento.
- Documenta claramente qué parte del sistema depende de qué.

## 35.15. Errores comunes

- Cachear datos que cambian rápido → incoherencias visibles.
- No invalidar cachés correctamente → bugs difíciles de reproducir.
- Tratar la cola como base de datos persistente.
- No diseñar reintentos ni idempotencia.
- No monitorear → cuellos de botella invisibles.
- Asumir que “caché + colas = escalabilidad mágica”.
