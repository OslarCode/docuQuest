# Seguridad práctica

## 1. Entendiendo el modelo de seguridad de SQLite

SQLite **no tiene usuarios, contraseñas ni roles internos**.

Cualquiera que tenga acceso físico al archivo `.db` (o `.db-wal`) puede abrirlo.

Esto implica que:

- La seguridad no se gestiona dentro de SQLite,
- sino **en el sistema operativo, en el código de tu aplicación y en cómo gestionas los archivos**.

Por eso, este módulo se enfoca en **4 pilares prácticos**:

1. Permisos de archivo
2. Cifrado de la base de datos (SQLCipher u otras alternativas)
3. Gestión de secretos y backups
4. Prevención de inyecciones SQL y fugas de datos

## 2. Permisos de archivo: la primera barrera

La base de datos SQLite es **un archivo en disco**:

```
primer.db
primer.db-wal
primer.db-shm

```

Si alguien puede **leer o copiar** estos archivos, puede abrir la base sin restricciones.

Por eso, **la seguridad más básica y efectiva** es:

**limitar quién puede acceder a esos archivos**.

### Windows:

- Coloca la base en una carpeta con permisos limitados.
- Solo el usuario que ejecuta la aplicación debe tener acceso.

Ejemplo de comandos PowerShell:

```powershell
# Quitar permisos a "Users"
icacls "C:\ruta\primer.db" /inheritance:r
icacls "C:\ruta\primer.db" /grant "USUARIO_APP":F

```

### Linux / macOS:

- Usa permisos de archivo clásicos:

```bash
chmod 600 primer.db
chown usuario_app primer.db

```

Esto significa:

- `600`: solo el propietario puede leer y escribir,
- nadie más puede ni leer el archivo.

Es simple, pero **muy efectivo**.

## 3. Cifrado: proteger incluso si el archivo es robado

Incluso con buenos permisos, puede ocurrir que alguien **copie el archivo** (por ejemplo, si accede al servidor o a un portátil robado).

Por eso, muchos proyectos reales usan **SQLCipher**, una extensión de SQLite con cifrado AES-256.

### ¿Qué hace SQLCipher?

- Cifra todo el contenido del archivo `.db`.
- Solo se puede abrir si se proporciona la clave correcta.
- Es 100% compatible con SQLite a nivel de sintaxis.

## 4. Instalar SQLCipher (opcional avanzado)

**Importante**: SQLCipher **no viene por defecto** con SQLite, debes instalarlo aparte.

Ejemplo en macOS o Linux:

```bash
sudo apt install sqlcipher

```

Verificar:

```bash
sqlcipher --version

```

En lugar de `sqlite3`, usas `sqlcipher`:

```bash
sqlcipher primer.db

```

Activar cifrado:

```sql
PRAGMA key = 'mi_clave_super_segura';
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT);
INSERT INTO users (email) VALUES ('ana@example.com');

```

Si alguien intenta abrir `primer.db` con `sqlite3` sin la clave:

Verá basura ilegible, no datos reales.

## 5. Recomendaciones sobre claves de cifrado

- No hardcodees la clave en tu código.
- Usa variables de entorno (`.env`) o servicios seguros de gestión de secretos.
- Cambia la clave periódicamente si el entorno lo permite.
- Usa una clave **larga y aleatoria** (no `1234` ni `admin` 🙄).

Ejemplo en Node.js:

```jsx
import Database from "better-sqlite3";

const key = process.env.DB_KEY;
const db = new Database('primer.db', { verbose: console.log });

db.pragma(`key = '${key}'`);

```

Así, si alguien accede al código, no encontrará directamente la clave.

## 6. Backups seguros

Cuando haces una copia de seguridad de un archivo SQLite:

- Si no está cifrado, estás copiando los datos en claro.
- Si está cifrado con SQLCipher, la copia **mantiene el cifrado**.

Buenas prácticas:

- Guarda los backups **en una ubicación diferente** con permisos igual de restrictivos.
- Si no usas cifrado en la base, **cifra el archivo de backup** con una herramienta externa (`gpg`, `zip` con contraseña robusta, etc.).
- 🧪 Usa `.backup` de SQLite para crear copias consistentes:

```bash
sqlite3 primer.db ".backup 'backup_2025_10_09.db'"

```

Esto evita problemas con WAL o transacciones abiertas.

## 7. Prevención de inyecciones SQL

Una de las amenazas más comunes en bases de datos **no proviene de fallos del motor**, sino de **mal uso en el código**.

**Inyección SQL** ocurre cuando concatenas variables directamente dentro de la consulta.

Ejemplo inseguro:

```jsx
const email = req.body.email;
db.prepare(`SELECT * FROM users WHERE email = '${email}'`).get();

```

Si alguien escribe:

```
ana@example.com' OR 1=1 --

```

Obtendrá todos los usuarios 😬

Ejemplo seguro con parámetros:

```jsx
db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

```

Siempre usa **placeholders** (`?` o `:nombre`) en tu código, como ya vimos en el módulo 1.

Esto **previene el 99 % de inyecciones SQL**.

## 8. Minimizar exposición de datos

Incluso con la base bien protegida, puedes **filtrar más datos de la cuenta** si no cuidas tus consultas.

Ejemplo inseguro:

```jsx
SELECT * FROM users;

```

→ expone todos los datos de todos los usuarios.

Ejemplo correcto:

```jsx
SELECT id, email FROM users WHERE id = ?;

```

Solo devuelves lo necesario para ese contexto.

También puedes:

- Aplicar **vistas con permisos limitados** si usas SQLite en contextos más amplios,
- o sanitizar la salida antes de mostrarla en la app.

## 9. Ejercicio práctico — endureciendo la base

1. Cambia los permisos de `primer.db` a `600` (o su equivalente en Windows).
2. Activa WAL y asegúrate de proteger también `primer.db-wal`.
3. Implementa en tu código consultas **con parámetros**, no concatenadas.
4. (Opcional) Instala SQLCipher y cifra la base con una clave segura.
5. Haz un backup con `.backup` y comprueba que funciona.

Con esto, tu base SQLite ya está mucho más segura que la media.

## 10. Buenas prácticas finales de seguridad

- **Protege el archivo**: permisos adecuados, sin dejarlo en carpetas públicas.
- **Usa cifrado** si la base contiene datos sensibles.
- **Gestiona las claves fuera del código**.
- **Usa parámetros en consultas** para evitar inyecciones.
- **Haz backups seguros y coherentes** (usando `.backup` o checkpoints).
- **Cierra conexiones** cuando no se usen, especialmente en apps web.
- **Audita el acceso físico** al entorno si la base vive en servidores locales.

## Errores comunes

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| Datos accesibles por cualquiera | Permisos de archivo abiertos | Limitar permisos a usuario/app |
| Archivos filtrados en backups | Copias sin cifrar | Cifrar backups o usar SQLCipher |
| Inyección SQL | Concatenación de strings en consultas | Usar parámetros |
| Clave expuesta | Hardcode en código | Usar variables de entorno |
| WAL sin proteger | Se olvidó proteger los archivos auxiliares | Restringir permisos también al WAL |