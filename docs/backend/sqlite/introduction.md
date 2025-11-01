# Qué es SQLite y cómo usarlo

## 1. Qué es SQLite, en palabras claras

SQLite es una **base de datos relacional embebida**.

Eso significa que:

- **No hay un servidor que levantar ni administrar.**
- Toda la base de datos vive en **un único archivo `.sqlite` o `.db`** que se puede mover, copiar, versionar o subir a un repositorio.
- La base usa el **lenguaje SQL estándar**, así que lo que aprendas aquí **te servirá también** para otros sistemas como PostgreSQL o MySQL.

Cuando ejecutas SQLite, no estás “conectándote a un servidor”, simplemente estás **leyendo y escribiendo en un fichero con un motor SQL incluido dentro de tu aplicación**.

Esto lo convierte en una herramienta **ligera, rápida y perfecta para proyectos pequeños y medianos**.

Ejemplos reales donde se usa SQLite:

- Apps móviles (iOS y Android lo usan bajo el capó).
- Navegadores (Chrome, Firefox guardan tu historial en SQLite).
- Aplicaciones de escritorio (VSCode, Discord, Spotify, etc.).
- Prototipos de APIs y proyectos personales.
- Aplicaciones edge/serverless (ej: Cloudflare D1, Vercel KV+SQLite).

## 2. SQLite vs otros motores

Para entender bien qué vas a aprender, vale la pena compararlo brevemente con los sistemas más conocidos:

| Característica | SQLite | PostgreSQL / MySQL |
| --- | --- | --- |
| Instalación | Muy simple | Requiere instalar servidor |
| Arquitectura | Embebida (archivo único) | Cliente-servidor |
| Ideal para… | Prototipos, apps locales | Apps empresariales, multiusuario |
| Concurrencia | Limitada pero eficiente | Alta (múltiples conexiones) |
| Administración | Mínima | Completa y compleja |
| Rendimiento | Muy alto para lecturas | Muy alto, más escalable |
| Despliegue | Copiar un archivo | Configurar servidor |

**Importante:** SQLite no es “inferior” a otros motores.

Es **la herramienta adecuada para el tamaño adecuado del problema**.

## 3. Instalación rápida en tu entorno local

Vamos a usar **VSCode + SQLite CLI**.

### 3.1. Instalar SQLite CLI

### Windows

- Ve a: [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)
- Descarga: *“sqlite-tools-win32-x86-xxxx.zip”*.
- Extrae el ZIP en `C:\sqlite`.
- Agrega esa ruta al **PATH** del sistema para poder usar `sqlite3` desde cualquier terminal.

### Linux

```bash
sudo apt update
sudo apt install sqlite3

```

### macOS

```bash
brew install sqlite

```

Verifica la instalación con:

```bash
sqlite3 --version

```

Debería devolverte algo como:

```
3.46.0 2025-05-10 19:31:16 ...

```

### 3.2. VSCode y extensiones útiles

Abre VSCode y asegúrate de instalar estas extensiones:

- **SQLite Viewer** (alexcvzz) → para explorar archivos `.db` gráficamente.
- **SQLTools** + “SQLite driver” → si prefieres autocompletado y consultas dentro de VSCode.
- (Opcional) *Dracula Theme* → para trabajar más cómodo.

También puedes usar la **terminal integrada de VSCode** para ejecutar comandos `sqlite3`.

## 4. Creando tu primer archivo `.db`

Crea una carpeta para el curso, por ejemplo:

```
sqlite-curso/
  ├─ data/
  ├─ scripts/
  └─ README.md

```

Abre la terminal en esa carpeta y ejecuta:

```bash
sqlite3 data/primer.db

```

Esto abrirá el **shell interactivo** de SQLite:

```
SQLite version 3.46.0 2025-05-10 19:31:16
Enter ".help" for usage hints.
sqlite>

```

Prueba tu primer comando:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

```

Y luego inserta un par de registros:

```sql
INSERT INTO users (name, email) VALUES ('Ana', 'ana@example.com');
INSERT INTO users (name, email) VALUES ('Luis', 'luis@example.com');

```

Consulta lo que tienes:

```sql
SELECT * FROM users;

```

Sal de la consola:

```
sqlite> .exit

```

Ahora verás que en `data/primer.db` se ha creado un archivo que **contiene toda tu base de datos**.

## 5. Primer ejercicio práctico guiado

**Objetivo:** Familiarizarte con el shell de SQLite y la estructura de un archivo `.db`.

1. Abre la terminal en la carpeta del proyecto.
2. Ejecuta:
    
    ```bash
    sqlite3 data/ejercicio0.db
    
    ```
    
3. Dentro del shell:
    - Crea una tabla `productos` con campos `id`, `nombre` y `precio`.
    - Inserta al menos 3 productos con valores reales.
    - Haz una consulta `SELECT * FROM productos;`
4. Sal con `.exit`.
5. Abre el archivo `ejercicio0.db` con la extensión **SQLite Viewer** y comprueba que los datos están ahí.

Este primer ejercicio es **clave**: a diferencia de otros motores, no hay servicios corriendo en segundo plano.

Simplemente estás manipulando un fichero que contiene una base SQL funcional.

## 6. Buenas prácticas iniciales

- Guarda tus archivos `.db` **fuera de las carpetas temporales**.
- Haz **copias de seguridad** (un simple `cp` o `Ctrl+C` + `Ctrl+V` es suficiente).
- No uses SQLite si tu app necesita miles de usuarios escribiendo a la vez.
- No abras el mismo `.db` en varias herramientas en modo escritura simultánea.
- Usa un **naming claro** para tus archivos `.db` (ej. `ventas_2025.db`).

## Errores comunes (y cómo evitarlos)

- ❌ *“no such table”* → te faltó crear la tabla antes de insertar.
- ❌ *“database is locked”* → estás intentando escribir desde varias sesiones a la vez.
- ❌ *“UNIQUE constraint failed”* → intentaste insertar un dato duplicado en una columna única.
- ❌ *“syntax error”* → SQLite es estricto con comas y paréntesis; revisa bien tu SQL.

## Conclusión de Módulo 0

En este punto ya:

- Sabes qué es SQLite y por qué es tan usado.
- Lo tienes instalado y corriendo en tu máquina.
- Has creado y consultado tu primera base.
- Entiendes su naturaleza embebida y sus límites.

## Anexo — Instalación de SQLite en Windows 10 / 11

### 1. Descarga oficial

1. Ve al sitio oficial de SQLite:
    
     [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)
    
2. Busca la sección **“Precompiled Binaries for Windows”**.
3. Descarga este archivo ZIP:

```
sqlite-tools-win32-x86-<versión>.zip

```

Ejemplo:

```
sqlite-tools-win32-x86-3460000.zip

```

*(el número cambia según la versión)*

### 2. Descomprimir y ubicar

1. Crea una carpeta en tu disco principal, por ejemplo:

```
C:\sqlite

```

1. Extrae **el contenido del ZIP** dentro de esa carpeta.
    
    Deberías ver al menos estos tres archivos:
    

```
sqlite3.exe
sqldiff.exe
sqlite3_analyzer.exe

```

1. Asegúrate de que `sqlite3.exe` funciona haciendo doble clic o ejecutando:

```powershell
C:\sqlite\sqlite3.exe

```

Debería abrirse el shell de SQLite.

### 3. Agregar SQLite al PATH (para usarlo desde cualquier terminal)

1. Presiona **Win + R** → escribe:

```
sysdm.cpl

```

y pulsa **Enter**.

1. Ve a la pestaña **“Opciones avanzadas”** → botón **“Variables de entorno”**.
2. En la sección **“Variables del sistema”** busca `Path` → selecciona y haz clic en **“Editar”**.
3. Pulsa **“Nuevo”** y pega la ruta:

```
C:\sqlite

```

1. Acepta todo y cierra.

### 4. Verificar desde terminal

Abre **PowerShell** o **CMD** y escribe:

```bash
sqlite3 --version

```

Si ves algo como:

```
3.46.0 2025-05-10 19:31:16 ...

```

¡SQLite está instalado correctamente!

### 5. (Opcional) Configurar VSCode

Para trabajar cómodamente:

- Abre VSCode.
- Instala la extensión **“SQLite Viewer”** de *alexcvzz* o **SQLTools**.
- Crea tu carpeta de proyecto (por ejemplo `C:\Users\TuUsuario\sqlite-curso`).
- Abre una terminal integrada y escribe:

```bash
sqlite3 data\primer.db

```

¡Y ya estás dentro del shell interactivo de SQLite!

## Nota importante sobre permisos en Windows

A diferencia de macOS y Linux, Windows puede poner restricciones de escritura si la carpeta está en:

- `C:\Archivos de programa`
- Escritorio corporativo o sincronizado con OneDrive

 **Recomendación:** guarda tus proyectos en una carpeta personal sencilla, por ejemplo:

```
C:\Users\TuUsuario\Proyectos\sqlite-curso

```

## Kit mínimo para Windows 10/11

Crea la carpeta, genera `primer.db` y ejecuta comandos iniciales. Incluye un `.bat` y un `init.sql`. Copia los archivos tal cual.

# Estructura propuesta

```
sqlite-curso\
 ├─ setup_windows.bat
 └─ scripts\
     └─ init.sql

```

# 1) `setup_windows.bat`

Guarda este contenido en `sqlite-curso\setup_windows.bat`.

```bash
@echo off
setlocal enabledelayedexpansion

REM === Comprobaciones previas ===
where sqlite3 >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No encuentro sqlite3 en el PATH.
  echo Descarga "sqlite-tools-win32-x86-*.zip" y agrega C:\sqlite al PATH.
  echo Guia rapida: https://www.sqlite.org/download.html
  exit /b 1
)

REM === Rutas base ===
set ROOT=%~dp0
set DATA=%ROOT%data
set SCRIPTS=%ROOT%scripts
set DB=%DATA%\primer.db

REM === Crear carpetas ===
if not exist "%DATA%" mkdir "%DATA%"
if not exist "%SCRIPTS%" mkdir "%SCRIPTS%"

REM === Verificar que init.sql existe ===
if not exist "%SCRIPTS%\init.sql" (
  echo [ERROR] No existe "%SCRIPTS%\init.sql".
  echo Crea el archivo scripts\init.sql con el contenido indicado en la guia.
  exit /b 1
)

REM === Crear/actualizar la base ejecutando el script ===
echo [INFO] Creando/actualizando "%DB%" ...
sqlite3 "%DB%" ".read %SCRIPTS%\init.sql"
if errorlevel 1 (
  echo [ERROR] Fallo al ejecutar init.sql
  exit /b 1
)

REM === Verificacion rapida ===
echo [INFO] Tablas en la base:
sqlite3 "%DB%" "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"

echo.
echo [OK] Base lista en: "%DB%"
echo Usa:   sqlite3 "%DB%"
echo O abre el archivo con la extension "SQLite Viewer" en VSCode.
echo.

endlocal
exit /b 0

```

# 2) `scripts/init.sql`

Guarda este contenido en `sqlite-curso\scripts\init.sql`.

```sql
-- === Ajustes seguros por defecto ===
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;          -- Mejor lectura concurrente
PRAGMA synchronous = NORMAL;        -- Rendimiento equilibrado
PRAGMA temp_store = MEMORY;

-- === Esquema de ejemplo (idempotente) ===
CREATE TABLE IF NOT EXISTS users (
  id     INTEGER PRIMARY KEY,
  name   TEXT    NOT NULL,
  email  TEXT    UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;

CREATE TABLE IF NOT EXISTS products (
  id     INTEGER PRIMARY KEY,
  name   TEXT    NOT NULL,
  price  REAL    NOT NULL CHECK (price >= 0),
  sku    TEXT    UNIQUE
) STRICT;

CREATE TABLE IF NOT EXISTS orders (
  id         INTEGER PRIMARY KEY,
  user_id    INTEGER NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  total      REAL    NOT NULL CHECK (total >= 0),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) STRICT;

CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- === Datos semilla (solo si no existen) ===
INSERT INTO users (name, email)
SELECT 'Ana', 'ana@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='ana@example.com');

INSERT INTO users (name, email)
SELECT 'Luis', 'luis@example.com'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='luis@example.com');

INSERT INTO products (name, price, sku)
SELECT 'Teclado mecánico', 79.90, 'KB-001'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku='KB-001');

INSERT INTO products (name, price, sku)
SELECT 'Ratón inalámbrico', 29.50, 'MS-010'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE sku='MS-010');

-- === Ejemplo: pedido para Ana si no existe ninguno ===
INSERT INTO orders (user_id, total)
SELECT u.id, 109.40
FROM users u
WHERE u.email='ana@example.com'
  AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- === Comprobaciones rapidas (se veran al ejecutar el .bat si las llamas aparte)
-- SELECT COUNT(*) AS users FROM users;
-- SELECT COUNT(*) AS products FROM products;
-- SELECT * FROM users;

```

## Cómo usarlo (Windows)

1. Coloca ambos archivos en las rutas indicadas.
2. Abre **PowerShell** o **CMD** en la carpeta `sqlite-curso`.
3. Ejecuta:

```
setup_windows.bat

```

1. Si todo va bien, verás la lista de tablas. La base queda en `data\primer.db`.

### Consultas rápidas

- Abrir el shell:
    
    ```
    sqlite3 data\primer.db
    
    ```
    
- Probar:
    
    ```sql
    SELECT * FROM users;
    .mode box
    SELECT * FROM products;
    
    ```
    

## Notas y buenas prácticas (starter)

- El script es **idempotente**: puedes relanzarlo sin duplicar datos clave (usa `UNIQUE` y `WHERE NOT EXISTS`).
- Usamos **`STRICT` tables** para mejorar la calidad de datos (tipado más estricto).
- Activamos **WAL** por defecto (mejores lecturas concurrentes en desarrollo).
- Evita guardar el proyecto dentro de carpetas sincronizadas (OneDrive) si notas bloqueos de archivo.