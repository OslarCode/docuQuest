# Relaciones y cardinalidad

## 3.1. Qué es una relación (en serio)

En el modelo relacional, **una relación no es “una amistad entre tablas”** ni un “link” informal:

Es **una correspondencia formal entre entidades**, basada en **claves** que garantizan integridad.

Ejemplo cotidiano:

- Un **cliente** realiza varios **pedidos**.
- Un **pedido** tiene uno o varios **productos**.
- Un **usuario** tiene **un perfil**.

Estas relaciones se definen en el diseño de la base de datos, no en el código de la aplicación.

## 3.2. Tipos de cardinalidades

La **cardinalidad** indica **cuántas instancias de una entidad se relacionan con cuántas de otra**.

En bases de datos relacionales, hay **tres tipos fundamentales**:

1. **1 a 1 (uno a uno)**
2. **1 a N (uno a muchos)**
3. **N a N (muchos a muchos)**

Vamos a verlas una por una con ejemplos **reales**, **diagramas conceptuales** y **simulación práctica con CSV + JS**.

## 3.3. Relación 1 a 1 — “Identidad extendida”

Una relación 1 a 1 se da cuando:

- Cada fila de la tabla A **se relaciona con una sola** fila de la tabla B.
- Y cada fila de la tabla B **solo pertenece a una** de la tabla A.

Se usa cuando **una entidad se divide en dos tablas** por motivos lógicos, técnicos o de seguridad.

Ejemplo real:

- Tabla `Usuario` (información general)
- Tabla `Perfil` (información sensible o adicional)

| Usuario         | Perfil              |
| --------------- | ------------------- |
| id_usuario (PK) | id_perfil (PK = FK) |
| nombre          | dirección           |
| correo          | fecha_nacimiento    |
|                 | teléfono            |

Nota:

`id_perfil` es **a la vez PK y FK** → esto fuerza la relación 1:1 estricta.

Si hay un usuario, hay (como máximo) un perfil asociado.

Ejemplo en CSV:

`usuarios.csv`

```
id_usuario,nombre,correo
1,Ana,ana@example.com
2,Luis,luis@example.com

```

`perfiles.csv`

```
id_perfil,direccion,fecha_nacimiento,telefono
1,Calle 123,1995-03-10,611000000
2,Calle 456,1990-07-12,612000000

```

## Ejercicio práctico — Validar 1:1

Vamos a verificar que **cada usuario tenga como máximo un perfil** y viceversa.

```jsx
import fs from "fs";

function leerCSV(ruta) {
  const data = fs.readFileSync(ruta, "utf-8").trim();
  const [cabecera, ...filas] = data.split("\n");
  const campos = cabecera.split(",");
  return filas.map((fila) => {
    const valores = fila.split(",");
    return Object.fromEntries(valores.map((v, i) => [campos[i], v]));
  });
}

const usuarios = leerCSV("./datos/usuarios.csv");
const perfiles = leerCSV("./datos/perfiles.csv");

const idsUsuarios = new Set(usuarios.map((u) => u.id_usuario));
const idsPerfiles = new Set(perfiles.map((p) => p.id_perfil));

// Verificamos que cada perfil corresponde a un usuario existente
for (const perfil of perfiles) {
  if (!idsUsuarios.has(perfil.id_perfil)) {
    console.error(
      `❌ Perfil ${perfil.id_perfil} no corresponde a ningún usuario`
    );
  }
}

// Verificamos duplicados (por si acaso)
if (idsUsuarios.size !== usuarios.length) {
  console.error(`❌ Hay duplicados en usuarios`);
}
if (idsPerfiles.size !== perfiles.length) {
  console.error(`❌ Hay duplicados en perfiles`);
}

console.log("✅ Relación 1:1 verificada correctamente");
```

Esto es lo que en un motor real se implementaría con **una PK/FK compartida**.

## 3.4. Relación 1 a N — “Padre e hijos”

La relación 1 a N es la más común:

- Una fila en A **puede estar asociada a muchas** filas en B.
- Pero cada fila en B **solo pertenece a una** de A.

Ejemplo real:

- Un **cliente** puede hacer muchos **pedidos**.
- Pero cada **pedido** solo pertenece a un **cliente**.

| Cliente         | Pedido          |
| --------------- | --------------- |
| id_cliente (PK) | id_pedido (PK)  |
| nombre          | id_cliente (FK) |
| correo          | fecha           |
|                 | total           |

Esta relación se implementa poniendo **la PK del padre como FK en la tabla hija**.

Ejemplo en CSV:

`clientes.csv`

```
id_cliente,nombre,correo
1,Ana,ana@example.com
2,Luis,luis@example.com

```

`pedidos.csv`

```
id_pedido,id_cliente,fecha,total
A001,1,2025-10-10,70.00
A002,1,2025-10-11,20.00
A003,2,2025-10-11,35.00

```

El cliente 1 (Ana) tiene **2 pedidos**; el cliente 2 (Luis) tiene **1 pedido**.

## Ejercicio práctico — Validar 1:N

```jsx
const clientes = leerCSV("./datos/clientes.csv");
const pedidos = leerCSV("./datos/pedidos.csv");

const idsClientes = new Set(clientes.map((c) => c.id_cliente));

for (const pedido of pedidos) {
  if (!idsClientes.has(pedido.id_cliente)) {
    console.error(
      `❌ Pedido ${pedido.id_pedido} apunta a un cliente inexistente`
    );
  }
}

// Contar pedidos por cliente
const contador = {};
for (const pedido of pedidos) {
  contador[pedido.id_cliente] = (contador[pedido.id_cliente] || 0) + 1;
}

for (const cliente of clientes) {
  console.log(
    `${cliente.nombre} tiene ${contador[cliente.id_cliente] || 0} pedidos`
  );
}
```

**Salida esperada:**

```
Ana tiene 2 pedidos
Luis tiene 1 pedidos

```

Así es como se implementa conceptualmente un `JOIN` 1:N sin motor.

## 3.5. Relación N a N — “Redes reales”

Una relación N a N significa:

- Una fila de A puede asociarse con muchas de B.
- Y una fila de B puede asociarse con muchas de A.

Ejemplo real:

- Un **producto** puede estar en **muchos pedidos**.
- Un **pedido** puede tener **muchos productos**.

| Pedido         | PedidoProducto (intermedia) | Producto         |
| -------------- | --------------------------- | ---------------- |
| id_pedido (PK) | id_pedido (FK)              | id_producto (PK) |
|                | id_producto (FK)            | nombre           |
|                | cantidad                    | precio           |

**Esto no se implementa directamente** entre las dos tablas principales:

se usa una **tabla intermedia** que contiene las relaciones (y a veces atributos adicionales como `cantidad`).

Ejemplo en CSV:

`productos.csv`

```
id_producto,nombre,precio
1,Teclado,20.00
2,Ratón,10.00
3,Monitor 24",120.00

```

`pedidos.csv` (como antes)

```
id_pedido,id_cliente,fecha,total
A001,1,2025-10-10,70.00
A002,1,2025-10-11,20.00
A003,2,2025-10-11,35.00

```

`pedido_producto.csv`

```
id_pedido,id_producto,cantidad
A001,1,2
A001,3,1
A002,1,1
A003,2,3

```

Pedido A001 tiene dos productos: Teclado (2 uds) y Monitor (1 ud).

El producto Teclado aparece en varios pedidos.

## Ejercicio práctico — Validar N:N

```jsx
const productos = leerCSV("./datos/productos.csv");
const pedidoProducto = leerCSV("./datos/pedido_producto.csv");
const idsPedidos = new Set(pedidos.map((p) => p.id_pedido));
const idsProductos = new Set(productos.map((p) => p.id_producto));

for (const fila of pedidoProducto) {
  if (!idsPedidos.has(fila.id_pedido)) {
    console.error(`❌ Relación a pedido inexistente: ${fila.id_pedido}`);
  }
  if (!idsProductos.has(fila.id_producto)) {
    console.error(`❌ Relación a producto inexistente: ${fila.id_producto}`);
  }
}

console.log("✅ Relaciones N:N verificadas correctamente");
```

Esto simula lo que en SQL sería una **tabla de unión** con claves compuestas.

## 3.6. Resumen visual rápido

| Tipo relación | Ejemplo real      | Estructura típica                  | Observación clave    |
| ------------- | ----------------- | ---------------------------------- | -------------------- |
| 1:1           | Usuario ↔ Perfil  | PK = FK                            | Extiende entidad     |
| 1:N           | Cliente → Pedido  | FK en la tabla hija                | Caso más común       |
| N:N           | Pedido ↔ Producto | Tabla intermedia con FK compuestas | Escalable y flexible |

## 3.7. Buenas prácticas con relaciones y cardinalidades

- Define siempre **en qué tabla va la FK** (lado “muchos”).
- Usa tablas intermedias con PK compuesta para N:N.
- Nombra las claves y relaciones de forma consistente (`id_cliente`, `id_pedido`…).
- Evita meter información repetida en varias tablas.
- Usa NULL con cuidado en relaciones opcionales (por ejemplo, “un perfil opcional”).

## Errores comunes de principiantes

- Intentar modelar N:N con columnas repetidas o listas de IDs → desnormalización chapucera.
- No definir restricciones → relaciones inconsistentes.
- No usar PK compuesta en tablas intermedias → duplicados silenciosos.
- Usar claves naturales que cambian con el tiempo.
