# Modulo 22. Modelo de privilegios mínimos

## 🧭 22.1. ¿Por qué hablar de seguridad a nivel de base de datos?

Aunque muchas aplicaciones controlan permisos desde el backend, la **seguridad a nivel de base de datos es la última línea de defensa**.

👉 Si alguien logra acceder a la base directamente, debe **encontrarse con barreras sólidas**.

Ejemplo real:

- Un atacante obtiene acceso a un usuario de lectura →
- Si ese usuario tiene permisos de escritura, puede modificar o borrar información.
    
    👉 Con un **modelo de privilegios mínimo**, esto no ocurre.
    

📌 Principio base:

> “Cada usuario o servicio debe tener el mínimo permiso necesario para hacer su trabajo. Nada más.”
> 

## 🧠 22.2. Tipos de permisos más comunes

La mayoría de motores SQL tienen permisos similares:

| Permiso | Qué permite hacer | Ejemplo práctico |
| --- | --- | --- |
| `SELECT` | Leer datos | Ver registros de clientes. |
| `INSERT` | Insertar datos nuevos | Crear un pedido. |
| `UPDATE` | Modificar datos existentes | Cambiar estado de un pedido. |
| `DELETE` | Eliminar registros | Borrar un pedido cancelado. |
| `CREATE` / `DROP` | Crear o borrar tablas, esquemas… | Administración de base. |
| `ALTER` | Modificar estructura | Cambiar columnas, tipos, índices. |
| `EXECUTE` | Ejecutar procedimientos almacenados, funciones | Usado en sistemas con lógica en BD. |

👉 A esto se suman permisos **a nivel de esquema** y **a nivel de objeto** (tabla, vista, función…).

## 🧭 22.3. Usuarios vs roles

En sistemas bien diseñados:

- **Usuarios** representan personas o servicios concretos.
- **Roles** agrupan permisos comunes.

👉 Esto permite escalar la gestión de seguridad sin volverse locos.

Ejemplo:

- Rol `LECTURA` → solo puede leer tablas.
- Rol `BACKOFFICE` → puede leer y actualizar pedidos.
- Rol `ADMIN` → puede modificar estructuras.

Luego simplemente asignas roles a usuarios:

```
Usuario “ana” → LECTURA
Usuario “juan” → BACKOFFICE
Usuario “soporte-api” → LECTURA

```

📌 Así no necesitas definir permisos individuales para cada uno.

## 🧠 22.4. Ejemplo práctico — escenario de tienda online

Supongamos una BD con tablas:

- `producto`
- `pedido`
- `cliente`

Creamos roles:

```sql
-- Rol solo lectura (por ejemplo para analistas)
CREATE ROLE lector;

-- Rol de gestión (backoffice)
CREATE ROLE gestor;

-- Rol de administración total
CREATE ROLE admin;

```

Damos permisos:

```sql
-- Solo lectura
GRANT SELECT ON producto, pedido, cliente TO lector;

-- Gestión básica (puede ver e insertar pedidos, no borrar productos)
GRANT SELECT, INSERT, UPDATE ON pedido TO gestor;
GRANT SELECT ON producto, cliente TO gestor;

-- Administrador total
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

```

Creamos usuarios reales:

```sql
CREATE USER ana PASSWORD '12345';
CREATE USER juan PASSWORD '12345';
CREATE USER servicio_api PASSWORD 'clave_segura';

GRANT lector TO servicio_api;
GRANT lector TO ana;
GRANT gestor TO juan;

```

👉 `ana` y el servicio API solo pueden **leer datos**, no modificarlos.

👉 `juan` puede gestionar pedidos, pero no borrar tablas.

👉 Nadie que no tenga el rol `admin` puede tocar la estructura.

Esto es **principio de privilegios mínimos aplicado directamente** en la base.

## 🧭 22.5. Revocar permisos innecesarios

Tan importante como dar permisos… es **quitarlos**.

```sql
REVOKE UPDATE ON producto FROM gestor;

```

👉 Si `gestor` no debería modificar productos, se le revoca.

👉 Esto evita errores accidentales, y limita el daño en caso de cuentas comprometidas.

📌 *No asumas que “no lo usarán” → revócalo directamente.*

## 🧠 22.6. Diferencia entre permisos de objeto y permisos globales

- **Permisos de objeto** → sobre tablas, vistas, funciones.
    
    Ej: `GRANT SELECT ON producto`.
    
- **Permisos globales** → afectan al esquema entero o a la instancia.
    
    Ej: `GRANT CREATE ON DATABASE`.
    

Regla general:

- Da permisos **de objeto** siempre que sea posible.
- Reserva permisos globales solo a administradores muy controlados.

## 🧭 22.7. Seguridad en capas: vistas y funciones

Otra práctica común:

👉 No dar acceso directo a tablas,

👉 Sino **dar acceso solo a vistas** que exponen la información necesaria.

Ejemplo:

```sql
CREATE VIEW vista_pedidos AS
SELECT id_pedido, fecha, total FROM pedido WHERE estado != 'cancelado';

GRANT SELECT ON vista_pedidos TO lector;

```

👉 El rol `lector` no tiene acceso a la tabla real `pedido`.

👉 Solo puede leer **lo que la vista expone**.

📌 Esto añade una **capa de seguridad y control**.

## 🧠 22.8. Buenas prácticas con usuarios y roles

- No uses cuentas compartidas entre personas.
- Usa roles para agrupar permisos comunes.
- Revoca permisos innecesarios.
- Usa vistas o funciones para exponer solo lo necesario.
- Documenta los permisos de cada rol.
- Revisa periódicamente quién tiene acceso a qué.

## 🚨 22.9. Errores comunes

- Dar a todos acceso total “porque es más cómodo” 😬
- Usar un único usuario para toda la aplicación.
- No separar permisos de lectura y escritura.
- No revocar permisos obsoletos.
- No documentar roles → pérdida de control con el tiempo.