# Capas de acceso a datos

## 25.1. Qué es la capa de acceso a datos

En una aplicación bien diseñada, la lógica de acceso a datos no está dispersa en todas las funciones ni mezclada con la UI o controladores.

En lugar de eso, se concentra en una **capa dedicada**:

```
[ UI / Controladores ]
         ↓
[ Lógica de negocio ]
         ↓
[ Capa de acceso a datos ]
         ↓
[ Base de datos ]

```

Esta separación permite:

- Cambiar la base de datos sin reescribir toda la app.
- Aplicar reglas de seguridad y validación en un solo sitio.
- Reutilizar consultas complejas.
- Facilitar testing y mantenimiento.

Aunque a veces se menosprecia, esta capa es **estructural** en cualquier app escalable.

## 25.2. Tres enfoques principales

1. **Consultas SQL directas** (raw SQL)
2. **Query Builders** (constructores de consultas)
3. **ORM** (Object Relational Mapper)

Cada uno tiene ventajas, desventajas y contextos donde brilla más.

## 25.3. Consultas SQL directas — control total

Escribir consultas manualmente y ejecutarlas directamente desde la app.

Ejemplo:

```jsx
const sql = "SELECT * FROM productos WHERE id = $1";
const result = await db.query(sql, [id]);
```

**Ventajas**:

- Máximo control sobre la consulta.
- Muy eficiente si sabes escribir SQL optimizado.
- No dependes de librerías externas.
- Ideal para consultas complejas o críticas en rendimiento.

**Desventajas**:

- Mucho código repetido si no se organiza bien.
- Dificulta cambios de esquema si las consultas están “esparcidas”.
- Menos abstracción: tienes que manejar manualmente la mayoría de casos.

**Cuándo usarlo**:

- Proyectos pequeños o medianos.
- Consultas altamente personalizadas.
- Sitios donde se prioriza rendimiento sobre abstracción.

## 25.4. Query Builders — estructura sin perder SQL

Herramientas que permiten construir consultas SQL de forma programática y segura, sin concatenar strings manualmente.

Ejemplo con Knex.js:

```jsx
const productos = await knex("productos")
  .select("*")
  .where("categoria", "Electrónica")
  .orderBy("precio", "asc");
```

Esto genera internamente:

```sql
SELECT * FROM productos WHERE categoria = 'Electrónica' ORDER BY precio ASC;

```

**Ventajas**:

- Más legible y modular que SQL crudo.
- Parametrización automática (segura contra inyecciones).
- Reutilizable y fácil de extender.
- Independiente del motor (SQLite, Postgres, MySQL…).

**Desventajas**:

- Aprendes la sintaxis de otra herramienta además de SQL.
- Consultas muy complejas pueden volverse menos claras que en SQL crudo.
- Algunas optimizaciones finas se pierden.

**Cuándo usarlo**:

- Proyectos medianos o grandes.
- Cuando quieres estructurar bien sin llegar a un ORM completo.
- Cuando tu equipo no es experto en SQL.

## 25.5. ORM — mapear tablas a objetos

Un **ORM (Object Relational Mapper)** permite trabajar con la base de datos **como si fuera un conjunto de objetos en memoria**.

Ejemplo con Sequelize:

```jsx
const producto = await Producto.findByPk(1);
console.log(producto.nombre);

await Producto.create({
  nombre: "Teclado mecánico",
  precio: 59.9,
});
```

Internamente genera las consultas SQL necesarias:

```sql
SELECT * FROM productos WHERE id = 1;
INSERT INTO productos (nombre, precio) VALUES ('Teclado mecánico', 59.90);

```

**Ventajas**:

- Alta productividad para CRUDs sencillos.
- Código más declarativo y menos repetitivo.
- Soporte para relaciones entre entidades (1:N, N:N).
- Migraciones automáticas en algunos casos.

**Desventajas**:

- Menor control sobre el SQL final.
- Puede generar consultas ineficientes si no se afina.
- Curva de aprendizaje de la herramienta.
- Dificultad con queries muy complejas.

**Cuándo usarlo**:

- Aplicaciones CRUD típicas.
- Equipos que prefieren trabajar con objetos antes que con SQL.
- Casos donde la velocidad de desarrollo prima sobre el microcontrol.

## 25.6. Patrón Repository — unificar acceso sin importar la herramienta

Una buena práctica es **no usar SQL ni ORM directamente en controladores**, sino envolverlo en una **capa intermedia**.

Ejemplo:

```jsx
// repos/productoRepo.js
export async function getById(id) {
  return db.query("SELECT * FROM productos WHERE id = $1", [id]);
}

// controllers/productoController.js
import * as productoRepo from "../repos/productoRepo.js";

app.get("/productos/:id", async (req, res) => {
  const producto = await productoRepo.getById(req.params.id);
  res.json(producto.rows[0]);
});
```

Esto permite:

- Cambiar de SQL crudo a un query builder o un ORM sin reescribir controladores.
- Centralizar validaciones, logging, cache y auditoría.
- Mejor mantenimiento a largo plazo.

## 25.7. Anti-patrón N+1 — el enemigo silencioso

El **N+1 problem** aparece cuando haces:

- Una consulta para obtener **una lista** de registros,
- Y luego haces **una consulta adicional por cada uno**.

Ejemplo:

```jsx
// Anti-patrón
const pedidos = await Pedido.findAll();
for (const pedido of pedidos) {
  pedido.cliente = await Cliente.findByPk(pedido.clienteId);
}
```

Si hay 100 pedidos, haces:

- 1 consulta inicial,
- - 100 consultas para los clientes → **101 consultas totales** 😬

Solución: **JOINs** o **eager loading**.

Ejemplo con SQL directo:

```sql
SELECT p.*, c.nombre
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id;

```

Ejemplo con ORM (Sequelize):

```jsx
const pedidos = await Pedido.findAll({ include: Cliente });
```

Resultado: **una sola consulta** que trae todos los pedidos con sus clientes.

## 25.8. Buenas prácticas al elegir enfoque

- Usa **SQL directo** para consultas críticas de rendimiento o muy específicas.
- Usa **query builders** si quieres estructura sin perder flexibilidad.
- Usa **ORM** si buscas productividad en CRUDs estándar y relaciones comunes.
- Combina enfoques si es necesario (por ejemplo, ORM + SQL optimizado en casos puntuales).
- Centraliza acceso a datos en repositorios o servicios dedicados.
- Evita el anti-patrón N+1 desde el diseño.
- Loguea y monitorea consultas lentas.

## 25.9. Errores comunes

- Mezclar SQL crudo en controladores y servicios sin estructura.
- Depender completamente de un ORM sin entender qué SQL genera.
- No controlar el número de consultas → problemas de rendimiento ocultos.
- No separar responsabilidades entre lógica de negocio y acceso a datos.
- No preparar la capa para cambios futuros de motor o librería.
