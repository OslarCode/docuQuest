# Modulo 23. Datos sensibles y auditoría

## 🧭 23.1. ¿Qué son “datos sensibles”?

**Datos sensibles** son aquellos que pueden:

- Identificar directamente a una persona, o
- Exponer información privada, confidencial o estratégica.

Ejemplos comunes en aplicaciones reales:

- 📛 Nombre completo, DNI, dirección
- 📧 Email, teléfono
- 💳 Datos financieros (número de tarjeta, cuenta bancaria)
- 🏥 Datos de salud
- 🔐 Contraseñas, tokens de autenticación, información confidencial interna

📌 *En bases de datos, no todos los datos son iguales. Algunos requieren medidas de seguridad especiales*.

## 🧠 23.2. Principios básicos de protección de datos sensibles

1. **Minimizar**: almacenar solo lo estrictamente necesario.
2. **Limitar acceso**: no todos deben ver todo.
3. **Enmascarar u ofuscar** cuando se muestran datos parciales.
4. **Auditar**: registrar quién accede, cuándo y a qué.
5. **Eliminar o anonimizar** cuando los datos dejan de ser necesarios.
6. **Nunca** almacenar contraseñas en texto plano.

## 🧭 23.3. Ejemplo práctico — emails y contraseñas

**Tabla insegura ❌:**

```sql
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(100) -- ❌ inseguro
);

```

**Tabla más segura ✅:**

```sql
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash TEXT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW()
);

```

- La contraseña no se guarda directamente → solo el **hash**.
- El correo es único → evita duplicados y acceso descontrolado.
- Se puede limitar el acceso al campo sensible.

👉 Ejemplo de privilegio restringido:

```sql
REVOKE SELECT ON usuario FROM lector;
GRANT SELECT (id, nombre) ON usuario TO lector;

```

👉 Solo roles con permisos especiales podrán ver emails.

## 🧠 23.4. Enmascaramiento y anonimización

A veces necesitamos mostrar datos **parciales**, por ejemplo, para soporte o informes.

Ejemplo:

- En vez de `ana@example.com`, mostrar `a***@example.com`.
- En vez de DNI completo, mostrar `*****123A`.

Esto se puede hacer desde la aplicación o directamente desde la base:

```sql
CREATE VIEW vista_usuario_enmascarado AS
SELECT
  id,
  CONCAT(LEFT(email, 1), '***', SUBSTRING(email FROM POSITION('@' IN email))) AS email,
  nombre
FROM usuario;

GRANT SELECT ON vista_usuario_enmascarado TO soporte;

```

👉 El equipo de soporte **no ve el email real completo**, solo la versión enmascarada.

## 🧭 23.5. Retención y eliminación controlada

Un error común es **guardar datos sensibles para siempre**.

Las buenas prácticas y normativas como el RGPD obligan a definir políticas de retención:

- Contraseñas viejas → eliminarlas o invalidarlas.
- Cuentas inactivas → anonimizar o borrar.
- Logs antiguos → depurarlos pasado un tiempo razonable.

Ejemplo de anonimización sencilla:

```sql
UPDATE usuario
SET email = CONCAT('anon_', id, '@example.com'),
    nombre = 'Anónimo'
WHERE fecha_creacion < NOW() - INTERVAL '5 years';

```

👉 Así se conserva la estructura de la base sin mantener información personal.

## 🧠 23.6. Auditoría: registrar accesos y modificaciones

La **auditoría** permite responder a preguntas como:

- ¿Quién accedió a estos datos?
- ¿Cuándo se modificó este registro?
- ¿Qué valores se cambiaron?

👉 Esto no es opcional en entornos reales.

Muchos motores ofrecen mecanismos nativos de auditoría o triggers personalizados.

Ejemplo simple con tabla de logs:

```sql
CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  usuario TEXT,
  tabla TEXT,
  accion TEXT,
  fecha TIMESTAMP DEFAULT NOW()
);

```

Trigger para registrar modificaciones en `pedido`:

```sql
CREATE OR REPLACE FUNCTION log_pedido()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO auditoria (usuario, tabla, accion)
  VALUES (SESSION_USER, 'pedido', TG_OP);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_pedido
AFTER INSERT OR UPDATE OR DELETE ON pedido
FOR EACH ROW EXECUTE FUNCTION log_pedido();

```

👉 Cada vez que alguien inserte, actualice o borre en `pedido`, se registrará automáticamente.

## 🧭 23.7. Auditoría de lectura (SELECT)

Por defecto, la mayoría de motores no auditan lecturas (`SELECT`),

pero hay formas de hacerlo en escenarios críticos:

- Mediante **vistas controladas** que registran accesos.
- Mediante **logs del servidor** (nivel avanzado).
- Mediante **middleware** en la capa de aplicación.

Ejemplo conceptual con vista:

```sql
CREATE OR REPLACE FUNCTION log_acceso_usuario()
RETURNS SETOF usuario AS $$
BEGIN
  INSERT INTO auditoria (usuario, tabla, accion) VALUES (SESSION_USER, 'usuario', 'SELECT');
  RETURN QUERY SELECT * FROM usuario;
END;
$$ LANGUAGE plpgsql;

-- Acceso controlado
SELECT * FROM log_acceso_usuario();

```

👉 Así sabemos quién consultó la tabla sensible.

## 🧠 23.8. Roles especiales para datos sensibles

No todos los usuarios que tienen acceso a la base deben poder ver información sensible.

Patrón recomendado:

- Rol `LECTOR_GENERAL` → acceso a datos no sensibles.
- Rol `LECTOR_SENSIBLE` → acceso limitado a columnas sensibles.
- Rol `AUDITOR` → acceso solo de lectura a logs de auditoría.

Ejemplo:

```sql
GRANT SELECT ON auditoria TO auditor;
REVOKE INSERT, UPDATE, DELETE ON auditoria FROM auditor;

```

👉 Así garantizamos que el auditor puede leer los registros, pero **no modificarlos**.

## 🧭 23.9. Buenas prácticas en protección y auditoría

- Identifica datos sensibles en tu modelo y márcalos desde el principio.
- Usa roles y privilegios diferenciados para controlar acceso.
- Enmascara o anonimiza datos cuando no se necesite el valor real.
- Implementa auditoría en tablas críticas (pedidos, usuarios, pagos…).
- Establece políticas de retención claras.
- Documenta qué se audita y por qué.
- Automatiza revisiones periódicas de accesos.

## 🚨 23.10. Errores comunes

- Guardar contraseñas en texto plano (¡aún ocurre!).
- Dar acceso de lectura total a todos los roles.
- No implementar auditoría porque “no es necesaria todavía”.
- No definir políticas de retención → datos expuestos años después.
- No revisar ni usar los logs generados.
- Mezclar datos sensibles con no sensibles sin control.