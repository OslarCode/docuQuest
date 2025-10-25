# Exportar e importar JSON

## Objetivo

- Permitir descargar un volcado JSON de usuarios.
- Permitir importar una lista de usuarios desde el cliente, de forma controlada.
- Respetar las validaciones, límites y seguridad del Módulo 14.
- Mantener compatibilidad con la API y el cliente actuales.

## Diseño

- **Exportación:** `GET /api/usuarios/export` devuelve un archivo `.json` con los usuarios. Opcionalmente admite los mismos parámetros de búsqueda/orden/paginación del Módulo 13 para exportar un subconjunto.
- **Importación:** `POST /api/usuarios/import?mode=append|replace` recibe un **array JSON** de usuarios sin `id`, los valida y:
  - `append`: asigna nuevos `id` y añade al final.
  - `replace`: reemplaza todo el dataset, reasignando `id` desde 1.

> Para mantenerlo simple, no usamos multipart. El cliente lee el archivo local con FileReader y envía el JSON como application/json.

## Cambios en la API (server.js)

A continuación solo añadimos los nuevos handlers. El resto de módulos no se toca.

### 1) Helper de reutilización de filtros/paginación (si tienes Módulo 13)

Si ya tienes la lógica de búsqueda/orden/paginación dentro del handler `GET /api/usuarios`, extrae esa parte a una función para poder reutilizarla en la exportación:

```jsx
function aplicarQuerySobreLista(list, url) {
  const q = (url.searchParams.get("q") || "").toLowerCase().trim();
  const minEdad = url.searchParams.get("minEdad");
  const maxEdad = url.searchParams.get("maxEdad");
  const sort = (url.searchParams.get("sort") || "").trim();
  const order = (url.searchParams.get("order") || "asc").toLowerCase();
  const page = Number(url.searchParams.get("page") || 0);
  const limit = Number(url.searchParams.get("limit") || 0);

  let res = list;

  if (q) {
    res = res.filter((u) => {
      const n = String(u.nombre ?? "").toLowerCase();
      const e = String(u.email ?? "").toLowerCase();
      return n.includes(q) || e.includes(q);
    });
  }
  if (minEdad !== null) {
    const min = Number(minEdad);
    if (!Number.isNaN(min)) res = res.filter((u) => Number(u.edad) >= min);
  }
  if (maxEdad !== null) {
    const max = Number(maxEdad);
    if (!Number.isNaN(max)) res = res.filter((u) => Number(u.edad) <= max);
  }

  const allowedSort = new Set(["nombre", "email", "edad", "fecha"]);
  if (allowedSort.has(sort)) {
    const dir = order === "desc" ? -1 : 1;
    res = res.slice().sort((a, b) => {
      const va = a[sort],
        vb = b[sort];
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number")
        return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }

  // Si hay paginación, devolver el slice; si no, devolver la lista completa
  if (page && limit) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return res.slice(start, end);
  }
  return res;
}
```

### 2) Exportación: `GET /api/usuarios/export`

```jsx
if (method === "GET" && url.pathname === "/api/usuarios/export") {
  const usuarios = await readJsonArray();
  const subset = aplicarQuerySobreLista(usuarios, url); // opcional

  const body = JSON.stringify(subset, null, 2);

  // Cabeceras de descarga
  applySecurityHeaders(res);
  allowCors(req, res);
  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Disposition": `attachment; filename="usuarios-export.json"`,
    "Content-Length": Buffer.byteLength(body),
  });
  return res.end(body);
}
```

### 3) Importación: `POST /api/usuarios/import?mode=append|replace`

- Espera `Content-Type: application/json`.
- El cuerpo debe ser un **array** de objetos con `nombre`, `email`, `edad` (sin `id`).
- `mode=append` añade y reasigna `id` nuevos.
- `mode=replace` borra todo y recrea la lista con `id` consecutivos.

```jsx
if (method === "POST" && url.pathname === "/api/usuarios/import") {
  try {
    const mode = (url.searchParams.get("mode") || "append").toLowerCase();
    if (!["append", "replace"].includes(mode)) {
      return sendJson(res, 400, {
        error: "mode inválido. Usa append o replace",
      });
    }

    const raw = await parseJsonBody(req); // ya valida content-type y tamaño
    if (!Array.isArray(raw)) {
      return sendJson(res, 400, { error: "El cuerpo debe ser un array JSON" });
    }

    // Validar y sanear cada elemento
    const candidatos = [];
    for (const item of raw) {
      // pickAndSanitizePayload whitelistea y convierte tipos
      const payload = pickAndSanitizePayload(item);
      validarUsuarioNuevo(payload); // puede lanzar
      candidatos.push(payload);
    }

    let usuarios = await readJsonArray();

    if (mode === "replace") {
      usuarios = [];
    }

    // Evitar emails duplicados contra el dataset actual y entre los candidatos
    const emailsActuales = new Set(usuarios.map((u) => u.email));
    const emailsNuevos = new Set();

    for (const c of candidatos) {
      const e = c.email;
      if (emailsActuales.has(e) || emailsNuevos.has(e)) {
        return sendJson(res, 400, { error: `Email duplicado en import: ${e}` });
      }
      emailsNuevos.add(e);
    }

    // Asignar IDs nuevos consecutivos
    let nextId = usuarios.length
      ? Math.max(...usuarios.map((u) => u.id || 0)) + 1
      : 1;
    if (mode === "replace") nextId = 1;

    const importados = candidatos.map((c) => ({
      id: nextId++,
      nombre: c.nombre,
      email: c.email,
      edad: c.edad,
      fecha: new Date().toISOString().replace("T", " ").slice(0, 16),
    }));

    if (mode === "append") {
      usuarios.push(...importados);
    } else {
      usuarios = importados;
    }

    await writeJsonArray(usuarios);
    return sendJson(res, 201, {
      ok: true,
      importados: importados.length,
      mode,
    });
  } catch (e) {
    return sendJson(res, 400, { error: e.message });
  }
}
```

## Cliente mínimo: añadir Export/Import al Módulo 12

### 1) HTML: nuevos bloques en `public/index.html`

Añade debajo del listado:

```html
<hr class="my-4" />

<section class="mb-4">
  <h2 class="h5">Exportar</h2>
  <div class="d-flex gap-2 flex-wrap">
    <a id="btn-export" class="btn btn-outline-secondary" href="#" download
      >Descargar JSON</a
    >
    <small class="text-muted"
      >Exporta todos los usuarios o filtra con los mismos parámetros de listado
      si adaptas el cliente.</small
    >
  </div>
</section>

<section class="mb-4">
  <h2 class="h5">Importar</h2>
  <form id="form-import" class="row g-2">
    <div class="col-md-4">
      <input
        type="file"
        class="form-control"
        id="file-json"
        accept="application/json,.json"
        required
      />
    </div>
    <div class="col-md-4">
      <select class="form-select" id="import-mode">
        <option value="append">Añadir (append)</option>
        <option value="replace">Reemplazar (replace)</option>
      </select>
    </div>
    <div class="col-md-2">
      <button class="btn btn-warning w-100">Importar</button>
    </div>
  </form>
  <p class="small-muted mt-2">
    El archivo debe contener un array de objetos sin campo <code>id</code>, con
    las propiedades <code>nombre</code>, <code>email</code>, <code>edad</code>.
    Se aplican validaciones y limpieza.
  </p>
</section>
```

### 2) JS: lógica en `public/app.js`

Añade al final del archivo:

```jsx
const $export = document.getElementById("btn-export");
const $importForm = document.getElementById("form-import");
const $file = document.getElementById("file-json");
const $mode = document.getElementById("import-mode");

// Exportación simple (descarga directa)
function buildExportUrl() {
  // Sencillo: exporta todo. Si quieres, aquí podrías leer inputs de búsqueda
  // y componer query params idénticos al listado (q, sort, page, limit, etc.)
  return `${API_BASE}/export`;
}

function refreshExportHref() {
  $export.href = buildExportUrl();
}
refreshExportHref();

// Importación controlada
$importForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = $file.files[0];
  if (!file) {
    showMsg("Selecciona un archivo JSON", "warning");
    return;
  }
  const mode = $mode.value;

  try {
    setBusy(true);
    const text = await file.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      showMsg("El archivo no es JSON válido", "danger");
      return;
    }
    if (!Array.isArray(data)) {
      showMsg("El JSON debe ser un array", "danger");
      return;
    }

    const res = await fetch(
      `${API_BASE}/import?mode=${encodeURIComponent(mode)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const out = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(out.error || "Error al importar");
    }

    showMsg(`Importación correcta: ${out.importados} registros (${out.mode})`);
    $importForm.reset();
    await loadUsers();
  } catch (err) {
    showMsg(err.message || "Error al importar", "danger");
  } finally {
    setBusy(false);
  }
});
```

## Pruebas rápidas con curl

Exportar todo:

```
curl -OJ "http://localhost:3000/api/usuarios/export"

```

(El `-OJ` intenta guardar con el nombre del servidor.)

Exportar filtrando y ordenando (si aplicaste Módulo 13):

```
curl -OJ "http://localhost:3000/api/usuarios/export?q=a&sort=edad&order=desc"

```

Importar añadiendo:

```
curl -X POST "http://localhost:3000/api/usuarios/import?mode=append" \
  -H "Content-Type: application/json" \
  -d '[{"nombre":"Toad","email":"toad@mail.com","edad":20},{"nombre":"Daisy","email":"daisy@mail.com","edad":27}]'

```

Importar reemplazando:

```
curl -X POST "http://localhost:3000/api/usuarios/import?mode=replace" \
  -H "Content-Type: application/json" \
  -d '[{"nombre":"Nuevo1","email":"n1@mail.com","edad":30},{"nombre":"Nuevo2","email":"n2@mail.com","edad":31}]'

```

## Consideraciones didácticas y de seguridad

- La importación aplica la misma whitelist y validaciones del Módulo 14:
  - Solo acepta `nombre`, `email`, `edad`.
  - Sanea strings, comprueba formato de email y rangos de edad.
  - Controla duplicados por email contra los ya existentes y entre los importados.
- El archivo importado no debe traer `id`. La API los asigna para evitar colisiones.
- La exportación usa `Content-Disposition` para forzar descarga.
- Si se usa paginación en exportación, el archivo contendrá solo el slice pedido. Por defecto, exporta todo.
