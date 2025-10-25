# Cliente HTML minimo para la API

## Objetivo

- Listar usuarios desde `GET /api/usuarios`.
- Crear usuarios con `POST /api/usuarios`.
- Seleccionar un usuario de la tabla y actualizarlo con `PUT /api/usuarios/:id`.
- Eliminar usuarios con `DELETE /api/usuarios/:id`.
- Manejo básico de errores.

> Requisito: tener corriendo el servidor del Módulo 11 en http://localhost:3000 (ya expone CORS básico, así que se puede consumir desde un index.html local).

## Estructura sugerida

```
json-crud-client/
└── public/
    ├── index.html
    └── app.js

```

## `public/index.html`

> Interfaz mínima con dos formularios: crear y actualizar. La tabla permite seleccionar un usuario y eliminarlo.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Cliente mínimo API JSON (Node.js)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <style>
      .clickable {
        cursor: pointer;
      }
      .small-muted {
        font-size: 0.9rem;
        color: #6c757d;
      }
      .loading {
        opacity: 0.6;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <div class="container py-4">
      <h1 class="mb-4">Cliente mínimo para API de usuarios</h1>

      <!-- Estado -->
      <div id="msg" class="mb-3"></div>

      <!-- Crear -->
      <section class="mb-4">
        <h2 class="h5">Crear usuario</h2>
        <form id="form-create" class="row g-2">
          <div class="col-md-4">
            <input
              class="form-control"
              name="nombre"
              placeholder="Nombre"
              required
            />
          </div>
          <div class="col-md-4">
            <input
              class="form-control"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="col-md-2">
            <input
              class="form-control"
              name="edad"
              type="number"
              placeholder="Edad"
              min="0"
              required
            />
          </div>
          <div class="col-md-2">
            <button class="btn btn-success w-100">Crear</button>
          </div>
        </form>
        <p class="small-muted mt-2">
          Tras crear, se refresca el listado automáticamente.
        </p>
      </section>

      <!-- Actualizar -->
      <section class="mb-4">
        <h2 class="h5">Actualizar usuario</h2>
        <form id="form-update" class="row g-2">
          <input type="hidden" name="id" />
          <div class="col-md-3">
            <input
              class="form-control"
              name="nombre"
              placeholder="Nuevo nombre"
            />
          </div>
          <div class="col-md-3">
            <input
              class="form-control"
              name="email"
              type="email"
              placeholder="Nuevo email"
            />
          </div>
          <div class="col-md-2">
            <input
              class="form-control"
              name="edad"
              type="number"
              placeholder="Nueva edad"
              min="0"
            />
          </div>
          <div class="col-md-2">
            <button class="btn btn-primary w-100">Actualizar</button>
          </div>
          <div class="col-md-2">
            <button
              type="button"
              id="btn-update-cancel"
              class="btn btn-secondary w-100"
            >
              Cancelar
            </button>
          </div>
        </form>
        <p class="small-muted mt-2">
          Selecciona un usuario de la tabla para cargar sus datos aquí. Solo se
          envían los campos que rellenes.
        </p>
      </section>

      <!-- Listado -->
      <section>
        <div class="d-flex align-items-center mb-2">
          <h2 class="h5 mb-0">Usuarios</h2>
          <button
            id="btn-refresh"
            class="btn btn-outline-secondary btn-sm ms-3"
          >
            Recargar
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle" id="tabla-usuarios">
            <thead>
              <tr>
                <th style="width:90px;">ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th style="width:120px;">Edad</th>
                <th style="width:160px;">Fecha</th>
                <th style="width:120px;">Acciones</th>
              </tr>
            </thead>
            <tbody id="tbody-usuarios"></tbody>
          </table>
        </div>
      </section>
    </div>

    <script src="./app.js" type="module"></script>
  </body>
</html>
```

## `public/app.js`

> Lógica mínima: cargar, crear, seleccionar para actualizar, actualizar parcial, eliminar. Manejo de mensajes y bloqueos simples para evitar dobles clics.

```jsx
const API_BASE = "http://localhost:3000/api/usuarios";

const $msg = document.getElementById("msg");
const $tbody = document.getElementById("tbody-usuarios");
const $btnRefresh = document.getElementById("btn-refresh");

const $formCreate = document.getElementById("form-create");
const $formUpdate = document.getElementById("form-update");
const $btnCancelUpdate = document.getElementById("btn-update-cancel");

function showMsg(texto, tipo = "success") {
  $msg.innerHTML = `<div class="alert alert-${tipo}">${escapeHtml(
    texto
  )}</div>`;
  setTimeout(() => ($msg.innerHTML = ""), 3000);
}

function setBusy(busy) {
  document.body.classList.toggle("loading", busy);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadUsers() {
  setBusy(true);
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Error al cargar usuarios");
    const data = await res.json();
    renderUsers(data);
  } catch (err) {
    showMsg(err.message || "Fallo al cargar", "danger");
    $tbody.innerHTML = "";
  } finally {
    setBusy(false);
  }
}

function renderUsers(list) {
  $tbody.innerHTML = list
    .map(
      (u) => `
    <tr data-id="${u.id}">
      <td>${u.id}</td>
      <td class="clickable" data-action="pick">${escapeHtml(
        u.nombre ?? ""
      )}</td>
      <td>${escapeHtml(u.email ?? "")}</td>
      <td>${Number.isFinite(u.edad) ? u.edad : ""}</td>
      <td>${escapeHtml(u.fecha ?? "")}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-2" data-action="pick">Editar</button>
        <button class="btn btn-sm btn-outline-danger" data-action="del">Eliminar</button>
      </td>
    </tr>
  `
    )
    .join("");
}

$btnRefresh.addEventListener("click", loadUsers);

// Crear
$formCreate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData($formCreate);
  const payload = {
    nombre: fd.get("nombre")?.trim(),
    email: fd.get("email")?.trim(),
    edad: Number(fd.get("edad")),
  };
  setBusy(true);
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudo crear");
    showMsg(`Creado id=${data.id}`);
    $formCreate.reset();
    await loadUsers();
  } catch (err) {
    showMsg(err.message || "Error al crear", "danger");
  } finally {
    setBusy(false);
  }
});

// Seleccionar fila (para editar o eliminar)
$tbody.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const tr = e.target.closest("tr");
  const id = Number(tr?.dataset?.id);
  if (!Number.isInteger(id)) return;

  const action = btn.dataset.action;
  if (action === "pick") {
    // Cargar datos en el formulario de update
    try {
      const res = await fetch(`${API_BASE}/${id}`);
      const user = await res.json();
      if (!res.ok) throw new Error(user.error || "No encontrado");
      $formUpdate.elements.id.value = user.id;
      $formUpdate.elements.nombre.value = user.nombre ?? "";
      $formUpdate.elements.email.value = user.email ?? "";
      $formUpdate.elements.edad.value = Number.isFinite(user.edad)
        ? user.edad
        : "";
      showMsg(`Editando id=${user.id}`, "secondary");
    } catch (err) {
      showMsg(err.message || "Error al obtener usuario", "danger");
    }
  }

  if (action === "del") {
    if (!confirm(`¿Eliminar usuario ${id}?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo eliminar");
      }
      showMsg(`Eliminado id=${id}`);
      if ($formUpdate.elements.id.value === String(id)) {
        $formUpdate.reset();
      }
      await loadUsers();
    } catch (err) {
      showMsg(err.message || "Error al eliminar", "danger");
    } finally {
      setBusy(false);
    }
  }
});

// Actualizar
$formUpdate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = Number($formUpdate.elements.id.value);
  if (!Number.isInteger(id)) {
    showMsg("Selecciona antes un usuario de la tabla", "warning");
    return;
  }
  // Enviar solo los campos rellenados (patch parcial con PUT)
  const nombre = $formUpdate.elements.nombre.value.trim();
  const email = $formUpdate.elements.email.value.trim();
  const edadStr = $formUpdate.elements.edad.value;
  const patch = {};
  if (nombre) patch.nombre = nombre;
  if (email) patch.email = email;
  if (edadStr !== "") patch.edad = Number(edadStr);

  if (Object.keys(patch).length === 0) {
    showMsg("No hay cambios para enviar", "warning");
    return;
  }

  setBusy(true);
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudo actualizar");
    showMsg(`Actualizado id=${id}`);
    $formUpdate.reset();
    await loadUsers();
  } catch (err) {
    showMsg(err.message || "Error al actualizar", "danger");
  } finally {
    setBusy(false);
  }
});

$btnCancelUpdate.addEventListener("click", () => {
  $formUpdate.reset();
  showMsg("Edición cancelada", "secondary");
});

// Inicio
loadUsers();
```

## Cómo ejecutar

Opción A (sencilla):

1. Asegúrate de que el servidor del **Módulo 11** está corriendo en `http://localhost:3000`.
2. Abre `public/index.html` con tu navegador (doble clic).

   La API ya permite CORS, así que `fetch` debería funcionar desde un archivo local.

Opción B (sirviendo `public/`):

1. Instala una extensión de servidor estático en VSCode (por ejemplo “Live Server”) o usa cualquier servidor estático.
2. Sirve la carpeta `public/` y navega a `http://localhost:5500` (o el puerto que te dé).
3. Mantén el Módulo 11 activo en `http://localhost:3000`.

## Qué has cubierto con este módulo

| Operación                | Acción en el cliente                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| GET /api/usuarios        | Botón “Recargar” e inicio automático                                            |
| GET /api/usuarios/:id    | Cargar datos en el formulario de actualización al “Editar” o click en el nombre |
| POST /api/usuarios       | Formulario “Crear usuario”                                                      |
| PUT /api/usuarios/:id    | Formulario “Actualizar usuario” (envía solo campos rellenados)                  |
| DELETE /api/usuarios/:id | Botón “Eliminar” por fila                                                       |
