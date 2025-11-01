# Modulo 30. Copias de seguridad y recuperación

## 🧭 30.1. La verdad incómoda: los backups que no se prueban no sirven

En demasiados proyectos:

- Se hacen copias de seguridad automáticas,
- Nadie las comprueba,
- Y cuando hay que restaurar… no funcionan ❌

📌 Un backup no probado es **una falsa sensación de seguridad**.

El objetivo de este módulo no es solo **guardar** datos, sino **garantizar que se pueden recuperar cuando más se necesitan**.

## 🧠 30.2. Tipos de backups

1. **Backups completos** 🧱
    - Copia total de la base de datos en un punto en el tiempo.
    - Son la base de cualquier estrategia sólida.
    - Ocupan más espacio y tardan más, pero son simples de restaurar.
2. **Backups incrementales** 🪜
    - Guardan solo lo que **cambió** desde el último backup.
    - Ahorra espacio y tiempo.
    - Requiere aplicar varios incrementos para restaurar.
3. **Backups diferenciales** ⚖️
    - Guardan todo lo que cambió desde el **último completo**.
    - Compromiso entre tamaño y facilidad de restauración.
4. **Backups lógicos vs físicos**
    - **Lógicos**: exportan datos en formato legible (SQL, CSV, JSON).
    - **Físicos**: copian directamente los archivos binarios de la base.

📌 En la práctica:

- Muchas empresas hacen un **completo diario** + **incrementales cada hora**.
- También se combinan **backups lógicos** (para portabilidad) y **físicos** (para velocidad de recuperación).

## 🧭 30.3. Ejemplo: backup lógico simple

Supongamos una base llamada `tienda`.

**Exportar:**

```bash
pg_dump tienda > tienda_backup_2025_10_19.sql

```

👉 Esto crea un archivo SQL con toda la estructura y los datos.

**Restaurar:**

```bash
psql -d tienda_restaurada -f tienda_backup_2025_10_19.sql

```

✅ Muy útil para:

- Migrar bases entre entornos,
- Probar restauraciones,
- Tener una copia portable.

📌 Esto aplica igual con otras herramientas (`mysqldump`, `sqlite .dump`, etc.).

## 🧠 30.4. Ejemplo: backup físico (nivel archivo)

Para grandes volúmenes de datos, un **backup físico** es más rápido.

Ejemplo con PostgreSQL:

```bash
pg_basebackup -D /backups/tienda_full -F tar -z -P

```

👉 Copia toda la instancia en formato comprimido.

Restauración:

- Detienes el servidor,
- Descomprimes el backup,
- Inicias con la carpeta restaurada.

📌 Esto permite restaurar bases de cientos de GB de forma más eficiente que con `pg_dump`.

## 🧭 30.5. Copias incrementales y WAL (registro de transacciones)

En bases modernas, no necesitas hacer una copia completa cada hora.

👉 Puedes:

- Hacer un **backup completo diario**.
- Capturar los **WAL (Write Ahead Logs)** para cubrir los cambios intermedios.

Esto permite **volver a un punto exacto en el tiempo** ⏳.

Ejemplo típico en PostgreSQL:

```bash
pg_basebackup ...
# Archivar WALs cada minuto a /wal_archive

```

Si ocurre un desastre a las 15:37:

- Restauras el backup completo de las 00:00.
- Reproduces los WAL hasta las 15:37.
    
    ✅ Recuperación casi exacta.
    

📌 Esto se llama **PITR (Point In Time Recovery)**.

## 🧠 30.6. Pruebas de restauración (lo más importante)

Un buen plan de backup debe incluir **ensayos de restauración periódicos**.

Pasos típicos:

1. Crear una nueva base vacía o entorno aislado.
2. Restaurar desde el backup más reciente.
3. Verificar que:
    - La estructura es correcta,
    - Los datos están completos,
    - Las vistas, constraints y usuarios funcionan.

Ejemplo:

```bash
psql -c "CREATE DATABASE tienda_restore;"
psql -d tienda_restore -f tienda_backup_2025_10_19.sql

```

👉 Si no pruebas este paso, no sabes si realmente estás protegido.

📌 Muchas empresas automatizan esta restauración cada noche en un entorno “espejo”.

## 🧭 30.7. Puntos de recuperación (RPO y RTO)

En planes profesionales de backup se manejan dos conceptos clave:

- **RPO (Recovery Point Objective)** →
    
    Cuánto tiempo de datos puedes permitirte perder.
    
    Ej: RPO = 1h → como máximo se perdería una hora de transacciones.
    
- **RTO (Recovery Time Objective)** →
    
    Cuánto tiempo puede tardar la restauración.
    
    Ej: RTO = 30min → la base debe volver a estar operativa en 30 minutos.
    

📌 No es lo mismo:

- Un blog personal → RPO 1 día puede ser aceptable.
- Un ecommerce → RPO 5 minutos puede ser obligatorio.

👉 Esto determina **la frecuencia y tipo de backup** que debes usar.

## 🧠 30.8. Versionar y proteger backups

- Guarda **múltiples versiones** (por si un backup sale corrupto).
- Almacena **en ubicaciones seguras** (no en el mismo servidor productivo).
- Usa cifrado si hay datos sensibles.
- Automatiza con rotación (por ejemplo, conservar 7 días + 4 semanas + 12 meses).

Ejemplo con rotación simple:

```
/backups/diarios/
  tienda_2025_10_19.sql
  tienda_2025_10_18.sql
  ...
/backups/semanales/
/backups/mensuales/

```

📌 Así puedes volver atrás a diferentes momentos si algo se corrompe lentamente.

## 🧭 30.9. Automatización de backups

En entornos reales, nadie hace esto manualmente.

Se usan:

- Cron jobs,
- Scripts shell,
- Herramientas integradas del motor,
- Sistemas externos (Borg, Restic, Velero, etc.).

Ejemplo cron (backup diario):

```
0 2 * * * pg_dump tienda > /backups/tienda_$(date +\%F).sql

```

Ejemplo con compresión:

```bash
pg_dump tienda | gzip > /backups/tienda_$(date +%F).sql.gz

```

👉 Simple pero efectiva.

## 🧠 30.10. Checklist de un buen plan de backups

✅ Tener **al menos un backup diario completo**.

✅ Usar incrementales o WAL si necesitas recuperación granular.

✅ Almacenar backups **fuera del servidor principal**.

✅ Cifrar si hay datos sensibles.

✅ Probar restauraciones regularmente.

✅ Definir claramente RPO y RTO.

✅ Documentar todo el procedimiento.

✅ Automatizar alertas si un backup falla.

## 🚨 30.11. Errores comunes

- Hacer backups… pero en el mismo disco que la base 😅.
- No probar nunca una restauración.
- No cifrar datos sensibles en backups.
- No limpiar backups antiguos → sin espacio cuando más se necesita.
- No documentar el procedimiento → solo una persona “sabe cómo hacerlo”.
- RPO y RTO no definidos → caos en incidentes reales.