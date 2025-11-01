# Búsqueda de texto completo con FTS5

## 1. Qué es FTS5 y cuándo usarlo

Normalmente, si haces:

```sql
SELECT * FROM articles WHERE content LIKE '%sqlite%';

```

SQLite:

- Recorre todas las filas (`SCAN TABLE`).
- Es lento si tienes miles de registros.
- No entiende relevancia ni palabras parciales.

FTS5 crea un **índice especializado para texto**, con el que puedes:

- Buscar texto **mucho más rápido** que con `LIKE`.
- Hacer búsquedas por palabras y frases.
- Obtener puntuaciones de relevancia.
- Usar tokenización (romper el texto en palabras).
- Sincronizarlo con tus tablas reales.

Casos de uso reales:

- Buscadores en blogs, foros, tiendas online, documentación interna, aplicaciones de notas, etc.

## 2. Creando tu primera tabla FTS5

A diferencia de las tablas normales, FTS5 se crea así:

```sql
CREATE VIRTUAL TABLE articles
USING fts5(title, content);

```

`VIRTUAL TABLE` indica que es una tabla especial.

`fts5` es el módulo que proporciona el motor de búsqueda.

Puedes tener uno o varios campos indexados.

Insertar algunos artículos:

```sql
INSERT INTO articles (title, content) VALUES
('Bienvenido a SQLite', 'SQLite es una base de datos ligera y embebida.'),
('FTS5 en acción', 'FTS5 permite realizar búsquedas de texto completas y rápidas.'),
('JSON1 y flexibilidad', 'La extensión JSON1 permite almacenar datos dinámicos.');

```

## 3. Buscando con `MATCH`

Para buscar, no se usa `LIKE`, sino:

```sql
SELECT * FROM articles WHERE articles MATCH 'SQLite';

```

Resultado:

```
title                | content
----------------------|--------------------------------------------
Bienvenido a SQLite   | SQLite es una base de datos ligera y embebida.
FTS5 en acción        | FTS5 permite realizar búsquedas de texto completas y rápidas.

```

FTS5 busca coincidencias en **todos los campos indexados** por defecto.

También puedes limitar a un campo específico:

```sql
SELECT * FROM articles WHERE title MATCH 'FTS5';

```

## 4. Búsqueda con operadores y frases

FTS5 permite hacer búsquedas más expresivas que `LIKE`.

### 📌 Palabras múltiples (OR implícito)

```sql
SELECT * FROM articles WHERE articles MATCH 'SQLite FTS5';

```

Devuelve filas que contengan **al menos una** de las palabras.

### Palabras exactas (frase entre comillas)

```sql
SELECT * FROM articles WHERE articles MATCH '"búsquedas de texto"';

```

Devuelve filas con esa frase exacta.

### Operadores lógicos

```sql
SELECT * FROM articles WHERE articles MATCH 'SQLite AND embebida';
SELECT * FROM articles WHERE articles MATCH 'SQLite NOT JSON1';

```

FTS5 **ignora mayúsculas/minúsculas** por defecto.

## 5. Ranking de resultados — `bm25`

FTS5 no solo busca: también **calcula relevancia**.

La función `bm25()` te da un puntaje de relevancia basado en frecuencia y posición de las palabras.

```sql
SELECT title, bm25(articles) AS score
FROM articles
WHERE articles MATCH 'SQLite'
ORDER BY score;

```

Cuanto **más bajo** el score, **más relevante** es el resultado.

(FTS5 usa un modelo inverso a muchas librerías).

## 6. Resaltado de coincidencias — `highlight`

Puedes destacar las palabras encontradas directamente en SQL:

```sql
SELECT highlight(articles, 1, '[', ']')
FROM articles
WHERE articles MATCH 'SQLite';

```

`1` = índice de columna (0 = title, 1 = content).

Los textos encontrados aparecerán envueltos en `[` y `]`.

Ejemplo de salida:

```
SQLite es una base de datos ligera y embebida.
↓
[SQLite] es una base de datos ligera y embebida.

```

Esto es **muy útil en interfaces web** para mostrar resultados resaltados.

## 7. Ejercicio práctico — Buscador básico

1. Crear tabla FTS5:

```sql
CREATE VIRTUAL TABLE notes USING fts5(title, body);

```

1. Insertar datos:

```sql
INSERT INTO notes (title, body) VALUES
('Introducción a SQLite', 'SQLite es rápido, ligero y sin servidor.'),
('JSON y estructuras flexibles', 'JSON1 añade potencia a SQLite.'),
('FTS5 en acción', 'Con FTS5 puedes buscar texto como si fuera Google.');

```

1. Buscar:

```sql
SELECT title FROM notes WHERE notes MATCH 'SQLite';

```

1. Buscar frases exactas:

```sql
SELECT title FROM notes WHERE notes MATCH '"texto como"';

```

1. Ranking de resultados:

```sql
SELECT title, bm25(notes) AS relevancia
FROM notes
WHERE notes MATCH 'SQLite'
ORDER BY relevancia;

```

1. Resaltado:

```sql
SELECT highlight(notes, 1, '>>', '<<') AS body_highlight
FROM notes
WHERE notes MATCH 'SQLite';

```

Ya tienes un buscador **completo y rápido** directamente dentro de SQLite.

## 8. Cuándo usar FTS5 (y cuándo no)

Ideal cuando:

- Necesitas búsquedas textuales potentes.
- Tienes muchos registros y `LIKE` no escala.
- Quieres ofrecer relevancia y frases exactas.
- No quieres depender de motores externos (como Elasticsearch o Solr).

No recomendado si:

- Tienes poco texto y consultas simples (un índice normal podría bastar).
- Necesitas búsquedas numéricas, de rangos, geoespaciales o muy estructuradas.
- No puedes permitirte mantener el índice sincronizado (aunque esto se puede automatizar).

## 9. Errores comunes al usar FTS5

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| “no such module: fts5” | SQLite antiguo | Actualiza SQLite a una versión moderna |
| Búsqueda lenta | No usar MATCH | Usa `MATCH` en lugar de `LIKE` |
| Resultados vacíos | Búsqueda sensible a tokenización | Revisa el texto insertado y los operadores |
| Resultados sin orden | No usar `bm25()` | Añade orden por relevancia |
| Highlight no muestra coincidencia | Índice de columna incorrecto | Usa 0 o 1 según el campo |

## 10. Buenas prácticas iniciales con FTS5

- Usa `MATCH` para búsquedas, no `LIKE`.
- Aprovecha `bm25()` para ranking.
- Usa `highlight()` para mostrar resultados de forma amigable.
- Mantén tus textos limpios y bien tokenizados (sin HTML innecesario si es posible).
- No indexar campos innecesarios — solo los que realmente quieras buscar.
- Revisa cómo FTS tokeniza tu idioma (más sobre esto en la segunda parte).

## 1. Qué es la tokenización

La **tokenización** es el proceso mediante el cual FTS5 toma un texto y lo **divide en palabras** (tokens) para indexarlas.

Por defecto:

- Separa por espacios y puntuación,
- Convierte todo a minúsculas,
- No hace stemming (no quita sufijos),
- No quita palabras comunes (como “el”, “la”, “de”).

Ejemplo:

```
"FTS5 es genial para búsquedas rápidas."
→ ["fts5", "es", "genial", "para", "búsquedas", "rápidas"]

```

Esto es suficiente en muchos casos, pero se puede personalizar para mejorar la relevancia de los resultados.

## 2. Tokenizadores disponibles

SQLite FTS5 incluye varios **tokenizadores**. Los más comunes:

| Tokenizador | Descripción breve |
| --- | --- |
| `simple` (por defecto) | Divide por espacios y puntuación, sin stemming |
| `porter` | Tokenizador en inglés con stemming |
| `unicode61` | Tokenizador avanzado compatible con unicode y stopwords |

### Ejemplo con `porter`

```sql
CREATE VIRTUAL TABLE docs USING fts5(content, tokenize = 'porter');

```

Si indexas “running” y buscas “run”, lo encontrará.

*(Stemming en inglés únicamente)*

## 3. `unicode61`: el recomendado para español y otros idiomas

El tokenizador `unicode61` es el más flexible y recomendado si trabajas con **texto en español** (u otros idiomas no ingleses).

```sql
CREATE VIRTUAL TABLE docs
USING fts5(content, tokenize = 'unicode61');

```

Ventajas:

- Soporta acentos, ñ, etc.
- Maneja mayúsculas y minúsculas correctamente.
- Puedes personalizar stopwords.

“Información” y “informacion” se tratan igual.

“niño” y “nino” también.

## 4. Stopwords — excluir palabras comunes

Puedes excluir palabras “ruido” para que no afecten la búsqueda:

por ejemplo: “el”, “la”, “de”, “para”, “y”, etc.

### Ejemplo:

Crea un archivo `stopwords_es.txt`:

```
el
la
de
y
en
para

```

Luego:

```sql
CREATE VIRTUAL TABLE docs
USING fts5(content, tokenize = 'unicode61 remove_diacritics 2',
            stopwords = 'stopwords_es.txt');

```

Ahora si buscas `MATCH 'el'` → no devuelve nada (porque no se indexa).

Pero si buscas `MATCH 'búsqueda'` → resultados normales.

Esto mejora la **precisión y relevancia** en textos largos.

## 5. Stemming en español (opcional)

FTS5 **no incluye stemming en español de fábrica**, pero:

- Puedes usar `unicode61` + stopwords → mejora bastante.
- O implementar stemming ligero desde tu aplicación (preprocesando texto antes de insertarlo).

Por ejemplo: eliminar sufijos comunes (`-es`, `-as`, `-mente`, etc.) antes de insertar, si buscas máxima relevancia.

## 6. Sincronizar FTS con una tabla real

Hasta ahora, creamos tablas FTS que contienen **todo el contenido** directamente.

Pero en proyectos reales, normalmente tienes una **tabla principal** con tus datos y una **tabla FTS sincronizada** que sirve solo para búsqueda.

Esto permite:

- Mantener integridad y estructura normalizada,
- Separar la lógica de búsqueda de los datos reales,
- Reindexar sin afectar la tabla principal.

Ejemplo clásico:

### Tabla principal

```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL
);

```

### Tabla FTS vinculada

```sql
CREATE VIRTUAL TABLE articles_fts
USING fts5(title, content, content='articles', content_rowid='id');

```

`content='articles'` le dice a FTS que su “fuente de verdad” es la tabla `articles`.

`content_rowid='id'` sincroniza cada documento con su ID real.

## 7. Sincronizar automáticamente con `triggers`

Para que los cambios en la tabla real se reflejen en la tabla FTS, usamos **triggers**:

```sql
CREATE TRIGGER articles_ai AFTER INSERT ON articles BEGIN
  INSERT INTO articles_fts(rowid, title, content)
  VALUES (new.id, new.title, new.content);
END;

CREATE TRIGGER articles_ad AFTER DELETE ON articles BEGIN
  DELETE FROM articles_fts WHERE rowid = old.id;
END;

CREATE TRIGGER articles_au AFTER UPDATE ON articles BEGIN
  UPDATE articles_fts
  SET title = new.title, content = new.content
  WHERE rowid = old.id;
END;

```

Ahora, si insertas, borras o actualizas en `articles`,

`articles_fts` se actualiza automáticamente.

## 8. Ejemplo práctico — tabla sincronizada

1. Crear tabla principal:

```sql
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY,
  title TEXT,
  body TEXT
);

```

1. Crear tabla FTS vinculada:

```sql
CREATE VIRTUAL TABLE blog_posts_fts
USING fts5(title, body, content='blog_posts', content_rowid='id');

```

1. Crear triggers:

```sql
CREATE TRIGGER blog_posts_ai AFTER INSERT ON blog_posts BEGIN
  INSERT INTO blog_posts_fts(rowid, title, body)
  VALUES (new.id, new.title, new.body);
END;

CREATE TRIGGER blog_posts_ad AFTER DELETE ON blog_posts BEGIN
  DELETE FROM blog_posts_fts WHERE rowid = old.id;
END;

CREATE TRIGGER blog_posts_au AFTER UPDATE ON blog_posts BEGIN
  UPDATE blog_posts_fts
  SET title = new.title, body = new.body
  WHERE rowid = old.id;
END;

```

1. Insertar datos en tabla principal:

```sql
INSERT INTO blog_posts (title, body) VALUES
('Primer post', 'Bienvenido a nuestro blog sobre SQLite.'),
('Buscador con FTS5', 'Aprende a buscar texto completo con SQLite.');

```

1. Buscar en FTS:

```sql
SELECT title FROM blog_posts_fts WHERE blog_posts_fts MATCH 'SQLite';

```

Aunque insertaste en `blog_posts`, los triggers **mantienen sincronizada** la tabla FTS.

## 9. Reindexar manualmente si es necesario

Si en algún momento los índices FTS se pierden o quedan desincronizados (por ejemplo tras una importación masiva), puedes **regenerarlos** fácilmente:

```sql
INSERT INTO blog_posts_fts(blog_posts_fts) VALUES('rebuild');

```

Esto vuelve a indexar todo el contenido de `blog_posts`.

También puedes borrar y recrear la tabla FTS si quieres un reinicio limpio.

## 10. Buenas prácticas con tokenización y sincronización

- Usa `unicode61` si trabajas con español u otros idiomas con tildes.
- Añade stopwords para mejorar precisión.
- Usa triggers para mantener sincronía sin esfuerzo manual.
- Reindexa periódicamente si haces grandes operaciones masivas.
- Separa tu **tabla de datos** de tu **tabla de búsqueda** para mayor flexibilidad.
- Usa `EXPLAIN QUERY PLAN` si quieres entender el rendimiento.

## Errores comunes

| Error / síntoma | Causa | Solución |
| --- | --- | --- |
| Resultados inesperados | Tokenizador por defecto | Usa `unicode61` o `porter` si aplica |
| Búsquedas irrelevantes | Stopwords no definidas | Crea y usa un archivo de stopwords |
| Tabla FTS no se actualiza | No hay triggers | Añadir triggers de sincronización |
| FTS desincronizado tras importación | No se indexó | Ejecutar `INSERT INTO fts_table(fts_table) VALUES('rebuild');` |
| Búsqueda sensible a mayúsculas/acentos | Tokenizador simple | Cambiar a `unicode61` con `remove_diacritics` |