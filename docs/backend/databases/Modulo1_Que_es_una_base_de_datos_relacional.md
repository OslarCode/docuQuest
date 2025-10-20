---
title: ¿Qué es una base de datos relacional?
sidebar_label: ¿Qué es una base de datos relacional?
---

# Modulo 1. ¿Qué es una base de datos relacional?

## 📘 **Módulo 1 — ¿Qué es una base de datos relacional y por qué usarla?**

Este primer módulo no busca que aprendas comandos ni sintaxis. Su objetivo es que **pienses como alguien que diseña información con cabeza**, no como alguien que amontona datos en cualquier parte.

Vamos a entender **por qué existen las bases de datos relacionales**, **cuándo son útiles** y **cuáles son sus ideas clave**, sin depender de ningún sistema específico.

### 🧠 1.1. Concepto base

Una base de datos relacional es un sistema organizado que **almacena y gestiona datos estructurados** en forma de **tablas**.

Cada tabla representa un **conjunto de entidades del mundo real** (personas, productos, reservas, facturas, etc.) y las relaciones entre ellas **están definidas de forma explícita**.

Esto se basa en un modelo matemático formal: [E**l modelo relacional**](https://es.wikipedia.org/wiki/Modelo_relacional), introducido por **Edgar F. Codd en 1970**, que se apoya en teoría de conjuntos y lógica de predicados.

La gran ventaja de esto es que **la estructura y las reglas están bien definidas**, y no dependen de un programa concreto.

Ejemplo sencillo (mundo real):

| Persona | Edad | País   |
| ------- | ---- | ------ |
| Ana     | 28   | España |
| Luis    | 34   | México |
| Sara    | 25   | Chile  |

Aquí estamos modelando **personas** como filas (instancias) y **atributos** como columnas.

### 🧱 1.2. Lo que hace “relacional” a una base de datos

- Los **datos están organizados en tablas** (no en documentos, ni en ficheros de texto).
- Las **relaciones entre datos están definidas de forma explícita**, no implícita.
- Cada tabla tiene **una clave única** para identificar cada fila sin ambigüedades.
- Las operaciones sobre datos se hacen **declarando lo que quieres obtener**, no cómo recorrer los datos (esto se llama pensamiento declarativo).
- **La integridad de los datos es responsabilidad del sistema**, no de tu aplicación.

Ejemplo de relación:

| Cliente | id_cliente |
| ------- | ---------- |
| Ana     | 1          |
| Luis    | 2          |

| Pedido | id_pedido | id_cliente | total |
| ------ | --------- | ---------- | ----- |
| A001   | 1         | 1          | 50.00 |
| A002   | 2         | 2          | 35.00 |

👉 Un pedido está **relacionado con** un cliente a través de `id_cliente`.

### ⚡ 1.3. Ventajas prácticas frente a “archivos sueltos”

| Archivos sueltos                         | Base de datos relacional         |
| ---------------------------------------- | -------------------------------- |
| Duplicación de datos                     | Datos normalizados, sin duplicar |
| Difícil mantener la coherencia           | Reglas de integridad definidas   |
| Búsquedas manuales y lentas              | Consultas rápidas y declarativas |
| No hay control de acceso estructurado    | Control de usuarios y permisos   |
| Crece el caos al aumentar la información | Escala con estructuras sólidas   |

Ejemplo real:

Un negocio que empieza guardando clientes en un Excel… y después no puede:

- Saber cuántos pedidos hizo cada cliente sin fórmulas complejas.
- Evitar duplicados (“Luis Gómez” / “Luis G.”).
- Evitar inconsistencias (“cliente borrado pero pedido activo”).

👉 Una base de datos relacional soluciona esto **desde el diseño**.

### 🧭 1.4. Cuándo **sí** usar una base de datos relacional

- Cuando los datos **tienen estructura clara** (clientes, facturas, productos, matrículas, etc.).
- Cuando necesitas **consistencia estricta** (por ejemplo, en sistemas financieros, administrativos o educativos).
- Cuando hay **relaciones complejas** entre entidades.
- Cuando la información debe ser **consultable de múltiples formas**.

### 🚫 Cuándo **no** es la mejor opción

- Datos extremadamente flexibles, sin esquema fijo (ej. logs, eventos, documentos variables).
- Grandes volúmenes de datos semi-estructurados sin relaciones complejas.
- Casos donde la estructura cambia todo el tiempo y no hay integridad estricta requerida.

👉 Esto no significa que no puedas usar una base relacional, pero quizá **no sea la más óptima**.

### 🧪 1.5. Ejercicio práctico guiado (VSCode + archivos planos simulados)

Este ejercicio es conceptual pero lo haremos en tu entorno de trabajo para que entiendas **por qué estructurar importa**.

### 📂 Estructura de carpetas sugerida:

```
proyecto-relacional/
│
├── datos/
│   ├── clientes.csv
│   ├── pedidos.csv
│
├── scripts/
│   └── analisis.js  (o .py si prefieres Python)
└── README.md

```

### 🧾 Contenido inicial de `clientes.csv`

```
id_cliente,nombre,correo
1,Ana,ana@example.com
2,Luis,luis@example.com
3,Sara,sara@example.com

```

### 🧾 Contenido inicial de `pedidos.csv`

```
id_pedido,id_cliente,total
A001,1,50.00
A002,2,35.00
A003,1,20.00

```

### 🧠 Objetivo del ejercicio:

Simular **una consulta relacional sin usar un motor**.

Por ejemplo:

“Quiero saber cuánto ha gastado cada cliente en total”.

### 🧑‍💻 Código ejemplo (JavaScript — `analisis.js`):

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

const clientes = leerCSV("./datos/clientes.csv");
const pedidos = leerCSV("./datos/pedidos.csv");

// Creamos un mapa de totales por cliente
const totales = {};
for (const pedido of pedidos) {
  const id = pedido.id_cliente;
  const total = parseFloat(pedido.total);
  totales[id] = (totales[id] || 0) + total;
}

// Mostramos resultados
for (const cliente of clientes) {
  console.log(
    `${cliente.nombre} ha gastado ${totales[cliente.id_cliente] || 0} €`
  );
}
```

📌 **Salida esperada**:

```
Ana ha gastado 70 €
Luis ha gastado 35 €
Sara ha gastado 0 €

```

👉 Lo que acabas de hacer manualmente es, en esencia, **una operación de JOIN + GROUP BY**.

Si tuvieras una base de datos relacional real, esto sería una simple consulta declarativa.

Aquí ves **por qué es útil delegar esta lógica al sistema**, no hacerla tú cada vez.

### ⚠️ 1.6. Buenas prácticas iniciales

- Siempre define una **clave única** para identificar cada fila. No uses nombres, correos ni números aleatorios sin control.
- Piensa en las **relaciones** antes de programar.
- Usa nombres consistentes y significativos.
- Separa datos de lógica: los datos son de la base, no del código.

### 🚨 Errores comunes de principiantes

- No definir claves (después no puedes enlazar bien).
- Duplicar información “por comodidad”.
- Pensar que “Excel es una base de datos”.
- Cambiar esquemas sin planificar (rompes relaciones).
