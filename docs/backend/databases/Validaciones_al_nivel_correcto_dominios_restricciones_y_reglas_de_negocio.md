# Modulo 14. Validaciones al nivel correcto: dominios, restricciones y reglas de negocio en la BD

## 🧭 14.1. Por qué validar en la base de datos

En muchas aplicaciones, toda la validación se hace “en el backend” o incluso en el frontend.

Eso **no es suficiente**.

Si alguien:

- inserta datos desde otro sistema,
- usa un script,
- o explota un error en la app…
    
    👉 puede **romper las reglas** de negocio si estas no están definidas en la base.
    

📌 Las **restricciones y validaciones al nivel de la base de datos** son la **última línea de defensa**.

> “Si es una regla estructural e inmutable, debería estar en la base, no en la lógica de la app.”
> 

## 🧱 14.2. Tipos de restricciones que podemos aplicar

| Tipo | Qué garantiza | Ejemplo práctico |
| --- | --- | --- |
| `NOT NULL` | Que un campo no quede vacío | nombre de cliente |
| `UNIQUE` | Que un valor no se repita | correo electrónico |
| `CHECK` | Que un valor cumpla una condición lógica | precio >= 0 |
| `DEFAULT` | Que haya un valor por defecto cuando no se especifica | fecha actual |
| `FOREIGN KEY` | Que exista en otra tabla (ya visto en M13) | id_cliente |
| **Dominios** | Tipos personalizados con reglas | email válido, DNI, etc. |
| **Triggers / reglas** | Validaciones más complejas | límite de préstamos por socio, stock mínimo |

## 🧩 14.3. Restricciones básicas: `NOT NULL` y `UNIQUE`

Estas son las más simples y también las más olvidadas.

### 📌 Ejemplo — tabla de clientes

```sql
CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL
);

```

- `NOT NULL` evita que se creen clientes sin nombre ni correo.
- `UNIQUE` garantiza que no se repita el correo electrónico.

Si intentas:

```sql
INSERT INTO cliente (nombre, correo) VALUES ('Ana', NULL);

```

👉 ❌ Error inmediato: violación de `NOT NULL`.

## 🧮 14.4. Restricciones con `CHECK` — validaciones condicionales

`CHECK` permite imponer **reglas lógicas directas** sobre un campo o combinación de campos.

### 📌 Ejemplo — precios de productos

```sql
CREATE TABLE producto (
  id_producto SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0)
);

```

Si alguien intenta insertar un precio negativo:

```sql
INSERT INTO producto (nombre, precio) VALUES ('Taza', -5.50);

```

👉 ❌ La base lo bloquea automáticamente.

### 📌 Ejemplo — valores predefinidos

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  estado VARCHAR(20) CHECK (estado IN ('pendiente', 'enviado', 'cancelado'))
);

```

👉 No se puede insertar otro estado distinto a los previstos.

## 🧠 14.5. Valores por defecto con `DEFAULT`

Los `DEFAULT` simplifican el código de inserción y evitan campos nulos innecesarios.

```sql
CREATE TABLE pedido (
  id_pedido SERIAL PRIMARY KEY,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente'
);

```

- Si no se especifica `fecha` → se inserta la actual.
- Si no se especifica `estado` → queda “pendiente”.

👉 Esto **reduce errores en el código de la aplicación**.

## 🧭 14.6. Dominios: tipos personalizados con reglas incorporadas

Algunos motores (como PostgreSQL) permiten crear **dominios**, es decir, tipos de datos que ya incluyen restricciones.

📌 Ideal para valores que se repiten en muchas tablas (email, DNI, etc.).

```sql
CREATE DOMAIN email_valido AS VARCHAR(255)
  CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  correo email_valido UNIQUE
);

```

👉 Cada vez que insertes un correo, se valida automáticamente.

👉 Y puedes usar `email_valido` en cualquier otra tabla sin repetir la expresión.

## 🧰 14.7. Triggers y validaciones complejas

Cuando las restricciones básicas no bastan, puedes usar **triggers** para validar reglas más elaboradas.

Ejemplo — biblioteca: un socio no puede tener más de 5 préstamos activos.

```sql
CREATE OR REPLACE FUNCTION validar_limite_prestamos()
RETURNS TRIGGER AS $$
DECLARE
  prestamos_activos INT;
BEGIN
  SELECT COUNT(*) INTO prestamos_activos
  FROM prestamo
  WHERE id_socio = NEW.id_socio
    AND estado = 'activo';

  IF prestamos_activos >= 5 THEN
    RAISE EXCEPTION 'El socio % ya tiene 5 préstamos activos', NEW.id_socio;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_limite_prestamos
BEFORE INSERT ON prestamo
FOR EACH ROW
EXECUTE FUNCTION validar_limite_prestamos();

```

👉 Esto asegura que aunque la app falle, la BD **nunca permita más de 5 préstamos activos por socio**.

## 🧱 14.8. Validaciones combinadas

Puedes mezclar restricciones para reforzar la calidad:

```sql
CREATE TABLE alumno (
  id_alumno SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  dni VARCHAR(15) UNIQUE NOT NULL,
  edad INT CHECK (edad BETWEEN 18 AND 120)
);

```

- `NOT NULL` para nombre y DNI
- `UNIQUE` para DNI
- `CHECK` para edad

👉 Este tipo de modelo reduce muchísimo la necesidad de validaciones redundantes en la app.

## 🧠 14.9. Dónde poner cada validación

| Tipo de regla | Lugar adecuado | Ejemplo |
| --- | --- | --- |
| Estructural, inmutable | Base de datos | DNI único, edad mínima, FK obligatoria |
| De negocio estable | Base de datos o capa mixta | Límite de préstamos, stock mínimo |
| Temporal, dinámica o contextual | Aplicación (backend/frontend) | Promociones, reglas que cambian cada semana |

📌 Regla práctica:

- Si **romper la regla corrompe datos** → ponla en la base.
- Si **romper la regla solo afecta la lógica temporal** → puede ir en la aplicación.

## 🧭 14.10. Buenas prácticas

- Usa restricciones básicas (`NOT NULL`, `CHECK`, `UNIQUE`) siempre que puedas.
- Usa dominios para patrones repetidos.
- Mantén triggers **solo para reglas que no pueden expresarse como restricciones**.
- Documenta todas las reglas en un diccionario de datos.
- Valida primero en la aplicación por usabilidad, pero **refuerza en la base por seguridad**.

## 🚨 14.11. Errores comunes

- No definir restricciones, confiando en la app.
- Repetir la misma validación en muchas tablas sin dominios.
- Usar triggers para reglas simples que podrían ser `CHECK`.
- No manejar adecuadamente las excepciones de validación en el backend.
- No actualizar reglas cuando cambia el negocio.