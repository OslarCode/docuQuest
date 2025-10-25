# Paginación, filtros, orden de búsqueda en API usuarios

## Qué añade este módulo

- Búsqueda por texto en `nombre` y `email`: `?q=mario`
- Filtros numéricos por edad: `?minEdad=18&maxEdad=40`
- Ordenación por campo: `?sort=nombre|email|edad|fecha&order=asc|desc`
- Paginación: `?page=1&limit=10`
- Metadatos en cabeceras: `X-Total-Count`, `X-Page`, `X-Limit`, `X-Pages`
- Exponer cabeceras al navegador: `Access-Control-Expose-Headers`

Todo en la misma ruta `GET /api/usuarios`.

## Cambios en `server.js` (Módulo 11)

Sustituye **solo** el bloque del handler de `GET /api/usuarios` y añade un pequeño helper para números. No toques el resto.

### 1) Helper arriba del archivo

```jsx
function asInt(value, fallback) {
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : fallback;
}
```

### 2) Reemplaza el handler `GET /api/usuarios` por esta versión

```jsx
// 1) GET /api/usuarios  (con búsqueda, filtros, orden y paginación)
if (method === "GET" && url.pathname === "/api/usuarios") {
  const usuarios = await readJsonArray();

  // Query params
  const q = (url.searchParams.get("q") || "").toLowerCase().trim();
  const minEdad = url.searchParams.get("minEdad");
  const maxEdad = url.searchParams.get("maxEdad");
  const sort = (url.searchParams.get("sort") || "").trim(); // nombre|email|edad|fecha
  const order = (url.searchParams.get("order") || "asc").toLowerCase(); // asc|desc
  const page = asInt(url.searchParams.get("page"), 0); // 0 = sin paginar
  const limit = asInt(url.searchParams.get("limit"), 0); // 0 = sin paginar

  // Si no hay parámetros, devuelve el array completo como siempre (compatibilidad)
  const noParams = !q && !minEdad && !maxEdad && !sort && !page && !limit;

  if (noParams) {
    return sendJson(res, 200, usuarios);
  }

  // 1) BÚSQUEDA (q en nombre o email)
  let list = usuarios;
  if (q) {
    list = list.filter((u) => {
      const n = String(u.nombre ?? "").toLowerCase();
      const e = String(u.email ?? "").toLowerCase();
      return n.includes(q) || e.includes(q);
    });
  }

  // 2) FILTROS numéricos por edad
  if (minEdad !== null) {
    const min = Number(minEdad);
    if (!Number.isNaN(min)) list = list.filter((u) => Number(u.edad) >= min);
  }
  if (maxEdad !== null) {
    const max = Number(maxEdad);
    if (!Number.isNaN(max)) list = list.filter((u) => Number(u.edad) <= max);
  }

  // 3) ORDENACIÓN segura (whitelist de campos)
  const allowedSort = new Set(["nombre", "email", "edad", "fecha"]);
  if (allowedSort.has(sort)) {
    const dir = order === "desc" ? -1 : 1;
    list = list.slice().sort((a, b) => {
      const va = a[sort];
      const vb = b[sort];
      // Comparación robusta
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number")
        return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }

  // 4) PAGINACIÓN
  const total = list.length;
  let sliced = list;

  if (page && limit) {
    const start = (page - 1) * limit;
    const end = start + limit;
    sliced = list.slice(start, end);
    // Cabeceras de metadatos
    const pages = Math.max(1, Math.ceil(total / limit));
    res.setHeader("X-Total-Count", String(total));
    res.setHeader("X-Page", String(page));
    res.setHeader("X-Limit", String(limit));
    res.setHeader("X-Pages", String(pages));
    // Asegurar que el navegador puede leer estas cabeceras
    res.setHeader(
      "Access-Control-Expose-Headers",
      "X-Total-Count,X-Page,X-Limit,X-Pages"
    );
  }

  return sendJson(res, 200, sliced);
}
```

> Nota: sendJson ya agrega CORS básico. Aquí solo exponemos cabeceras extra si hay paginación.

## Ejemplos de uso (curl)

Listar todo (como antes, sin cambios):

```
curl "http://localhost:3000/api/usuarios"

```

Buscar por texto:

```
curl "http://localhost:3000/api/usuarios?q=peach"

```

Filtrar por edad:

```
curl "http://localhost:3000/api/usuarios?minEdad=30&maxEdad=40"

```

Ordenar por nombre descendente:

```
curl "http://localhost:3000/api/usuarios?sort=nombre&order=desc"

```

Paginación simple (página 2, 2 por página):

```
curl -i "http://localhost:3000/api/usuarios?page=2&limit=2"

```

Fíjate en las cabeceras:

- `X-Total-Count`
- `X-Page`
- `X-Limit`
- `X-Pages`

Paginación + búsqueda + orden:

```
curl -i "http://localhost:3000/api/usuarios?q=a&sort=edad&order=asc&page=1&limit=3"

```

## Lectura de metadatos desde el cliente (opcional)

Si quieres, en el cliente del Módulo 12 puedes leer cabeceras así:

```jsx
const res = await fetch("/api/usuarios?page=1&limit=5");
const data = await res.json();
const total = Number(res.headers.get("X-Total-Count"));
const page = Number(res.headers.get("X-Page"));
const pages = Number(res.headers.get("X-Pages"));
```

Con esto puedes dibujar botones de paginación y mostrar un “total de registros” sin cambiar el formato del cuerpo (sigue siendo un array).

## Decisiones de diseño y compatibilidad

- **Compatibilidad total** con el cliente previo: sin parámetros, la ruta responde con el array completo.
- **Cabeceras de metadatos** en lugar de cambiar el cuerpo a `{ data, meta }`.
- **Ordenación segura** con lista blanca de campos (`nombre`, `email`, `edad`, `fecha`) para evitar sorpresas.
- **Búsqueda sensible a minúsculas/mayúsculas normalizada** a minúsculas de forma simple.
- **Filtros robustos** con conversiones numéricas seguras.
