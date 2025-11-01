# Tipos de dominios prácticos

## 15.1. Por qué elegir bien los tipos de datos importa

Elegir tipos de datos no es un detalle menor.

Cada tipo tiene implicaciones en:

- **Rendimiento** (espacio ocupado, velocidad de comparación).
- **Integridad** (qué valores son válidos o no).
- **Portabilidad** (si podrás migrar fácilmente a otro motor).
- **Semántica** (que los datos signifiquen lo que deben significar).

Ejemplo real:

Si guardas fechas como texto (`'2025-10-19'`) en lugar de tipo `DATE`,

no podrás comparar ni ordenar correctamente por fecha.

## 15.2. Tipos numéricos — tamaño, rango y precisión

### 🔹 Enteros

| Tipo                   | Tamaño          | Rango aproximado | Uso típico                           |
| ---------------------- | --------------- | ---------------- | ------------------------------------ |
| `SMALLINT`             | 2 bytes         | -32.768 a 32.767 | IDs pequeños                         |
| `INT` o `INTEGER`      | 4 bytes         | ±2.000 millones  | Claves comunes                       |
| `BIGINT`               | 8 bytes         | ±9 cuatrillones  | Claves globales o contadores grandes |
| `SERIAL` / `BIGSERIAL` | auto-incremento | según base       | Identificadores automáticos          |

**Ejemplo:**

```sql
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  stock INT DEFAULT 0 CHECK (stock >= 0)
);

```

Si vas a tener menos de 100.000 registros, `INT` es suficiente.

Evita usar `BIGINT` sin necesidad: ocupa el doble de espacio.

### 🔹 Decimales y reales

| Tipo             | Precisión                      | Características                      |
| ---------------- | ------------------------------ | ------------------------------------ |
| `NUMERIC(p,s)`   | Precisión exacta, configurable | Ideal para dinero o valores críticos |
| `REAL` / `FLOAT` | Aproximado (no exacto)         | Cálculos científicos, promedios      |

**Ejemplo (dinero):**

```sql
CREATE TABLE factura (
  id SERIAL PRIMARY KEY,
  total NUMERIC(10,2) CHECK (total >= 0)
);

```

`NUMERIC(10,2)` = hasta 10 dígitos, 2 decimales (99999999.99).

Nunca uses `FLOAT` para dinero o contabilidad: genera redondeos impredecibles.

## 15.3. Tipos de texto — longitud y rendimiento

| Tipo         | Características              | Uso recomendado                           |
| ------------ | ---------------------------- | ----------------------------------------- |
| `CHAR(n)`    | Longitud fija                | Códigos o abreviaturas (e.g., “ES”, “US”) |
| `VARCHAR(n)` | Longitud variable con límite | Nombres, correos, direcciones             |
| `TEXT`       | Sin límite fijo              | Comentarios, descripciones largas         |

**Ejemplo:**

```sql
CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL
);

```

`VARCHAR` es preferible a `TEXT` en la mayoría de los casos:

permite validar longitudes y optimiza índices.

**Regla práctica:**

- Usa `VARCHAR(n)` cuando sepas el tamaño máximo razonable.
- Usa `TEXT` solo para campos donde la longitud es impredecible (observaciones, mensajes, etc.).

## 15.4. Tipos de fecha y hora

| Tipo          | Descripción                     | Ejemplo                    |
| ------------- | ------------------------------- | -------------------------- |
| `DATE`        | Solo fecha (año-mes-día)        | `'2025-10-19'`             |
| `TIME`        | Solo hora                       | `'14:35:00'`               |
| `TIMESTAMP`   | Fecha + hora                    | `'2025-10-19 14:35:00'`    |
| `TIMESTAMPTZ` | Fecha + hora con zona horaria   | `'2025-10-19 14:35:00+02'` |
| `INTERVAL`    | Duración o diferencia de tiempo | `'3 days 4 hours'`         |

**Ejemplo:**

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

```

`CURRENT_TIMESTAMP` garantiza que cada registro tenga su marca de creación.

Si la aplicación opera en varios países, usa `TIMESTAMPTZ`.

## 15.5. Tipos booleanos

| Valor lógico | SQL estándar  | Alternativas (según motor) |
| ------------ | ------------- | -------------------------- |
| Verdadero    | `TRUE` o `1`  | `'t'`, `'yes'`             |
| Falso        | `FALSE` o `0` | `'f'`, `'no'`              |

**Ejemplo:**

```sql
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  activo BOOLEAN DEFAULT TRUE
);

```

`BOOLEAN` evita errores de interpretación y mejora la legibilidad:

- Mejor que usar `INT` con 0/1.
- Más portable que `CHAR(1)` con `'S'` o `'N'`.

## 15.6. Valores por defecto y consistencia semántica

Los valores por defecto (`DEFAULT`) ayudan a mantener coherencia en los datos.

**Ejemplo:**

```sql
CREATE TABLE alumno (
  id SERIAL PRIMARY KEY,
  fecha_alta DATE DEFAULT CURRENT_DATE,
  pais CHAR(2) DEFAULT 'ES',
  activo BOOLEAN DEFAULT TRUE
);

```

Esto asegura que, si la app no manda esos campos,

la base mantenga coherencia y no queden vacíos.

**Regla práctica:**

- Usa `DEFAULT` para inicializar datos con sentido lógico.
- Pero **no abuses de ellos** para ocultar errores de inserción.

## 15.7. Tipos personalizados y dominios reutilizables

En motores como PostgreSQL, puedes crear **dominios** para encapsular validaciones repetidas.

**Ejemplo:**

```sql
CREATE DOMAIN telefono_es AS VARCHAR(15)
  CHECK (VALUE ~ '^[0-9]{9}$');

CREATE TABLE contacto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  telefono telefono_es
);

```

Si el número no cumple el patrón, la base lo rechaza.

Puedes usar este dominio en todas las tablas que manejen teléfonos.

Ventajas:

- Reutilizas la regla sin copiarla.
- Facilita el mantenimiento si la validación cambia.
- Mejora la documentación y claridad del modelo.

## 🧠 15.8. Fechas y valores por defecto inteligentes

Puedes usar funciones como valores por defecto dinámicos:

```sql
CREATE TABLE evento (
  id SERIAL PRIMARY KEY,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

Luego, mediante un _trigger_, puedes actualizar `actualizado_en` automáticamente cuando cambien los datos (veremos esto más adelante en Módulos 26–27 sobre migraciones y mantenimiento).

## 15.9. Compatibilidad y portabilidad

Cada motor tiene matices:

- PostgreSQL y MySQL soportan `NUMERIC(p,s)` igual, pero difieren en precisión.
- `TEXT` puede tener límites distintos.
- `BOOLEAN` no existe en todos los motores antiguos (en algunos es `BIT`).

Recomendación general:

- Usa tipos **estándar SQL** siempre que sea posible (`INT`, `VARCHAR`, `DATE`, `NUMERIC`, `BOOLEAN`).
- Evita tipos propietarios si el proyecto debe migrarse en el futuro.

## 15.10. Buenas prácticas

- Usa el tipo más **preciso y pequeño posible** que represente tu dato.
- Nunca guardes fechas como texto ni números como cadenas.
- Usa `CHECK` para limitar rangos y valores válidos.
- Prefiere `NUMERIC` a `FLOAT` para dinero.
- Usa `VARCHAR` con límites razonables (no `VARCHAR(5000)` “por si acaso”).
- Define valores `DEFAULT` coherentes.
- Aprovecha los **dominios** para validaciones recurrentes.

## 15.11. Errores comunes

- Usar `TEXT` para todo (ineficiencia y sin control de longitud).
- Usar `FLOAT` para montos financieros.
- No definir `DEFAULT` en campos booleanos o fechas.
- No limitar longitudes ni valores válidos.
- Guardar datos con formato ambiguo (fechas o números en texto).
