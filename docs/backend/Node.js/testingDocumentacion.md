# Testing y documentación en Node.js

Este módulo se centra en cómo incorporar pruebas automáticas y documentación clara a un proyecto Node.js que utiliza SQLite como base de datos. No es necesario usar frameworks complejos. Se trabaja sobre un stack Express + SQLite tradicional como el que has desarrollado previamente.

## 1. Enfoque práctico de testing

El testing intermedio en un backend con SQLite debe cubrir al menos tres capas:

- **Tests unitarios**: validan funciones puras, lógica interna o repositorios.
- **Tests de integración**: validan la interacción entre Express y SQLite (por ejemplo, rutas y DB real/temporal).
- **Tests end-to-end simples**: validan flujos completos como si fueras un cliente (sin frontend real, usando herramientas como Supertest o fetch).

### 1.1. Configuración base

Instalación de dependencias:

```bash
npm install -D vitest supertest

```

En `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}

```

Crea un archivo `vitest.config.js`:

```jsx
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

Esto configura un entorno de test ligero sin necesidad de Jest.

### 1.2. Base de datos temporal para testing

Para evitar alterar datos reales, usa una **copia temporal del archivo `.db`** o `:memory:`:

Archivo: `tests/helpers/dbTest.js`

```jsx
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

export function setupTestDb() {
  const original = path.join(process.cwd(), "data", "app.db");
  const tmpDir = path.join(process.cwd(), "tests", "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const tmpFile = path.join(tmpDir, `test-${Date.now()}.db`);
  fs.copyFileSync(original, tmpFile);

  const db = new Database(tmpFile);

  const cleanup = () => {
    db.close();
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  };

  return { db, cleanup };
}
```

Para usar una base en memoria:

```jsx
const db = new Database(":memory:");
```

En ese caso, deberías ejecutar las migraciones antes de los tests.

## 2. Tests unitarios: funciones y repositorios

Supón que tienes un repositorio `proyectosRepo.js` con métodos `list` y `create`. Los tests unitarios se enfocan en estos métodos sin levantar un servidor Express.

Archivo: `tests/proyectos.repo.test.js`

```jsx
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupTestDb } from "./helpers/dbTest.js";

let db, repo, cleanup;

beforeAll(() => {
  const env = setupTestDb();
  db = env.db;
  cleanup = env.cleanup;
  repo = require("../src/repos/proyectosRepo");
  repo._setDbInstance(db); // si tu repo permite inyección de DB
});

afterAll(() => {
  cleanup();
});

describe("Repositorio de proyectos", () => {
  it("debe insertar y listar proyectos", () => {
    repo.create({ titulo: "Test A", descripcion: "Demo" });
    const all = repo.list();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0].titulo).toBe("Test A");
  });
});
```

Si tu repositorio no permite inyección de DB, puedes adaptar su lógica para que lo haga. Esto mejora mucho la testabilidad.

## 3. Tests de integración: Express + SQLite

En este caso, probamos las rutas directamente, simulando peticiones HTTP con Supertest. No necesitas iniciar manualmente el servidor.

Archivo: `tests/proyectos.routes.test.js`

```jsx
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import proyectosRoutes from "../src/routes/proyectos.js";

let app, db, tmpFile;

beforeAll(() => {
  // Clonamos base
  const original = path.join(process.cwd(), "data", "app.db");
  const tmpDir = path.join(process.cwd(), "tests", "tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  tmpFile = path.join(tmpDir, `test-${Date.now()}.db`);
  fs.copyFileSync(original, tmpFile);
  db = new Database(tmpFile);
  require("../src/db/connection")._setInstance(db);

  app = express();
  app.use(express.json());
  app.use("/api/proyectos", proyectosRoutes);
});

afterAll(() => {
  db.close();
  if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
});

describe("Rutas de proyectos", () => {
  it("debe crear y listar proyectos", async () => {
    const nuevo = { titulo: "Proyecto X", descripcion: "Test de integración" };
    await request(app).post("/api/proyectos").send(nuevo).expect(201);
    const res = await request(app).get("/api/proyectos").expect(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
```

Este enfoque es el que más se usa en proyectos reales: aisla la base, monta el servidor en memoria y prueba la API como si fueras un cliente.

## 4. Tests end-to-end simples

En proyectos pequeños puedes simular flujos completos (por ejemplo, creación y búsqueda) sin necesidad de Cypress ni entornos pesados. Esto se hace con Supertest también, combinando varias llamadas:

Archivo: `tests/proyectos.e2e.test.js`

```jsx
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/server.js";

describe("E2E: flujo de proyectos", () => {
  it("crea un proyecto y lo obtiene", async () => {
    const nuevo = { titulo: "E2E Test", descripcion: "Flujo completo" };
    const createRes = await request(app).post("/api/proyectos").send(nuevo);
    expect(createRes.status).toBe(201);

    const listRes = await request(app).get("/api/proyectos");
    const found = listRes.body.find((p) => p.titulo === "E2E Test");
    expect(found).toBeDefined();
  });
});
```

Este tipo de test es útil para pipelines CI/CD simples.

## 5. Documentación de la API

Además del testing, una API real debe **estar documentada**. La forma más común es usar **OpenAPI/Swagger**.

Instalación:

```bash
npm install swagger-jsdoc swagger-ui-express

```

Archivo: `src/docs/swagger.js`

```jsx
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Proyectos",
      version: "1.0.0",
      description: "Documentación de la API Express con SQLite",
    },
  },
  apis: ["./src/routes/*.js"], // busca comentarios JSDoc en rutas
};

export const swaggerSpec = swaggerJSDoc(options);
```

Archivo: `src/server.js`

```jsx
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import proyectosRoutes from "./routes/proyectos.js";

const app = express();
app.use(express.json());

app.use("/api/proyectos", proyectosRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
```

Comenta las rutas con JSDoc:

```jsx
/**
 * @openapi
 * /api/proyectos:
 *   get:
 *     summary: Lista todos los proyectos
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get("/", (req, res) => { ... });

```

Al levantar el servidor:

```
<http://localhost:3000/docs>

```

verás la documentación interactiva.

## 6. Recomendaciones finales

- **Automatiza los tests**: ejecútalos en cada push con GitHub Actions o similar.
- Mantén **una base temporal limpia** para cada test.
- Documenta tus endpoints **junto con el código** para no desincronizar.
- Los tests de integración + Swagger cubren el 80% de necesidades reales de proyectos medianos.

## Recursos recomendados

- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/ladjs/supertest)
- [Swagger/OpenAPI](https://swagger.io/specification/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

## Bloque opcional: CI/CD con GitHub Actions para tests y documentación

Objetivo: ejecutar automáticamente los tests (con base SQLite temporal) y generar/exportar la documentación OpenAPI en cada push y pull request. Este bloque asume tu stack Express + SQLite y los scripts de test ya configurados con Vitest y Supertest.

### Scripts recomendados en `package.json`

Asegúrate de tener estos scripts (ajústalos a tu proyecto):

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ci": "vitest run --coverage",
    "db:migrate": "node ./scripts/run-migrations.js",
    "db:seed": "node ./scripts/run-seeds.js",
    "docs:build": "node ./scripts/build-openapi.js"
  }
}
```

Notas:

- `db:migrate` y `db:seed` deben aplicar tus migraciones y datos de prueba sobre la base temporal.
- `docs:build` generará un `openapi.json` a partir de tu `swaggerSpec`.

### Script para generar OpenAPI JSON

Archivo: `scripts/build-openapi.js`

```jsx
// Genera un openapi.json desde tu swaggerSpec para publicarlo como artefacto del pipeline
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerJSDoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta rutas a tus archivos de rutas con anotaciones @openapi
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API de Proyectos", version: "1.0.0" },
  },
  apis: ["./src/routes/*.js"],
};

const spec = swaggerJSDoc(options);
const outDir = path.join(process.cwd(), "artifacts");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "openapi.json");
fs.writeFileSync(outPath, JSON.stringify(spec, null, 2), "utf8");
console.log("OpenAPI exportado en:", outPath);
```

### Workflow de GitHub Actions

Archivo: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: ["**"]
  pull_request:
    branches: ["**"]

permissions:
  contents: read

jobs:
  test-and-docs:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x] # Ajusta a tus versiones objetivo
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install deps
        run: npm ci

      - name: Prepare CI test DB
        run: |
          mkdir -p data
          # Base temporal para CI; no uses la de desarrollo
          rm -f data/app.ci.db
          # Si usas migraciones con better-sqlite3, crea un archivo vacío y migra
          node -e "require('fs').writeFileSync('data/app.ci.db','')"
          npm run db:migrate
          # Opcional: seed de datos de ejemplo
          if npm run | grep -q "db:seed"; then npm run db:seed; fi
        env:
          DATABASE_URL: ./data/app.ci.db

      - name: Run tests with coverage
        run: npm run test:ci
        env:
          DATABASE_URL: ./data/app.ci.db
          NODE_ENV: test

      - name: Build OpenAPI JSON
        run: npm run docs:build

      - name: Upload coverage artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: coverage-${{ matrix.node-version }}
          path: coverage/
          if-no-files-found: ignore

      - name: Upload OpenAPI artifact
        uses: actions/upload-artifact@v4
        with:
          name: openapi-${{ matrix.node-version }}
          path: artifacts/openapi.json
```

Comentarios:

- `DATABASE_URL` apunta a `./data/app.ci.db` para no tocar tu base local. El job crea el archivo y ejecuta migraciones y seed si existen.
- `npm run test:ci` ejecuta Vitest con cobertura. Puedes publicar el informe en un servicio externo si lo necesitas.
- `docs:build` genera `artifacts/openapi.json` y se sube como artefacto descargable del pipeline.
- La matrix de Node verifica compatibilidad en versiones clave.

### Variante alternativa: base en memoria

Si prefieres usar SQLite en memoria para tests más rápidos, sustituye las variables de entorno de los pasos de test por:

```yaml
env:
  DATABASE_URL: "file::memory:?cache=shared"
  NODE_ENV: test
```

y asegúrate de que tus tests ejecuten las migraciones antes de correr.

### Sugerencias adicionales

- Añade un job opcional de lint:

```yaml
lint:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: 20.x, cache: "npm" }
    - run: npm ci
    - run: npm run lint
```

- Si vas a desplegar a Render o Railway, crea un job separado que se ejecute solo en `main` y dependa de que `test-and-docs` termine con éxito.
- Si versionas tus migraciones, considera subir también como artefacto el directorio `migrations/` para auditoría.
