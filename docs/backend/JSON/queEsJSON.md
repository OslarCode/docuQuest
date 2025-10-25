# ¿Qué es JSON? Sintaxis y estructura básica

# ¿Qué es JSON?

> JSON (JavaScript Object Notation) es una forma de escribir datos organizados usando texto plano.
>
> Lo usamos para **guardar, enviar y recibir información** entre el frontend (HTML/JS) y el backend (**Node.js**, etc.).

### ¿Dónde se usa JSON?

- Al **guardar datos** como usuarios, configuraciones o productos.
- Al **enviar datos desde formularios**.
- Al **leer datos desde una API externa** (películas, clima, usuarios, etc.).
- Al construir una **respuesta desde Node.js para JavaScript** (por ejemplo, con Express). _(Actualizado)_

## JSON es como una cajita de datos

### Ejemplo 1 – Usuario:

```json
{
  "nombre": "Mario",
  "edad": 35,
  "activo": true
}
```

Esto representa un usuario que:

- Se llama **Mario**
- Tiene **35 años**
- Está **activo**

## Reglas básicas de sintaxis en JSON (las que necesitas hoy)

| Regla                                                           | Ejemplo                                   |
| --------------------------------------------------------------- | ----------------------------------------- |
| Los datos están entre **llaves `{}`**                           | `{ "nombre": "Mario" }`                   |
| Las **claves** van entre **comillas dobles**                    | `"nombre"`                                |
| Las claves y valores se separan con **dos puntos `:`**          | `"edad": 35`                              |
| Cada par clave-valor termina en **coma `,`**, excepto el último |                                           |
| Los arrays usan **corchetes `[]`**                              | `"juegos": ["Zelda", "Mario", "Metroid"]` |

### Ejemplo 2 – Producto en una tienda

```json
{
  "id": 101,
  "nombre": "Zapatillas",
  "precio": 49.99,
  "tallas": [38, 39, 40, 41],
  "disponible": true
}
```

## ¿Cómo se ve un JSON más completo?

```json
{
  "usuarios": [
    {
      "id": 1,
      "nombre": "Luigi",
      "email": "luigi@example.com"
    },
    {
      "id": 2,
      "nombre": "Peach",
      "email": "peach@example.com"
    }
  ]
}
```

Aquí tenemos un objeto con una clave `"usuarios"`, cuyo valor es un **array de objetos** (una lista de personas).

## ¿Y cómo se representa y usa en **Node.js**?

### 1) Objeto JavaScript en Node.js (memoria)

```jsx
// Node.js (objeto JS en memoria)
const usuario = {
  nombre: "Mario",
  edad: 35,
  activo: true,
};
```

### 2) Convertir entre **objeto JS** y **texto JSON**

```jsx
// Objeto JS -> cadena JSON
const jsonStr = JSON.stringify(usuario); // '{"nombre":"Mario","edad":35,"activo":true}'

// Cadena JSON -> objeto JS
const copia = JSON.parse(jsonStr); // { nombre: 'Mario', edad: 35, activo: true }
```

> Pista: usa JSON.stringify(valor, null, 2) para guardar bonito con sangría.

### 3) Enviar JSON con **Express**

```jsx
import express from "express";
const app = express();

app.use(express.json()); // habilita parseo de JSON del body

app.get("/api/usuario", (req, res) => {
  res.json(usuario); // establece cabeceras y serializa a JSON automáticamente
});

app.post("/api/echo", (req, res) => {
  // req.body ya es un objeto JS si el cliente envió JSON válido
  res.status(201).json({ recibido: req.body });
});

app.listen(3000, () => console.log("API en http://localhost:3000"));
```

### 4) Leer y escribir **archivos .json** con `fs/promises`

```jsx
import { readFile, writeFile } from "node:fs/promises";

// Leer
const texto = await readFile("datos.json", "utf8");
const datos = JSON.parse(texto);

// Modificar en memoria
datos.usuarios.push({ id: 3, nombre: "Toad" });

// Guardar (con formato)
await writeFile("datos.json", JSON.stringify(datos, null, 2), "utf8");
```

**Resumen de esta sección:** en Node.js trabajas con **objetos JS**; cuando necesitas **persistir** o **enviar por HTTP**, conviertes a/desde **JSON** con `JSON.stringify` y `JSON.parse`.

## En resumen

| Concepto        | Qué debes recordar                                       |
| --------------- | -------------------------------------------------------- |
| JSON            | Es texto con estructura de clave-valor                   |
| Se usa en web   | Para guardar, enviar o recibir datos                     |
| Estructura base | `{ "clave": valor }`                                     |
| Soporta arrays  | `["uno", "dos", "tres"]`                                 |
| En Node.js      | Serializa con `JSON.stringify` y parsea con `JSON.parse` |

## Con esto ya puedes:

- Leer y entender un archivo `.json`
- Crear tu primer objeto JSON a mano
- Detectar errores básicos de sintaxis
- **Exponer y consumir JSON con Node.js/Express** _(Nuevo)_

# Ampliación del Bloque 1

**Errores comunes + herramientas + cómo escribir JSON desde cero**

## 1) Errores comunes al escribir JSON (y cómo evitarlos)

**Error 1: No usar comillas dobles en las claves**

```json
{ "nombre": "Mario" } // ❌ Error
```

**Correcto:**

```json
{ "nombre": "Mario" }
```

**Error 2: Olvidar comas entre elementos**

```json
{
  "nombre": "Luigi"
  "edad": 34
}

```

**Correcto:**

```json
{
  "nombre": "Luigi",
  "edad": 34
}
```

**Error 3: Coma final innecesaria**

```json
{
  "nombre": "Peach"
}
```

**Correcto:**

```json
{
  "nombre": "Peach"
}
```

**Error 4: Usar comillas simples**

```json
{ "nombre": "Toad" } // ❌ No válido
```

**Correcto:**

```json
{ "nombre": "Toad" }
```

## 2) Herramientas visuales para validar y probar JSON

Te permiten:

- Ver si tu JSON es válido
- Darle formato bonito (pretty print)
- Detectar errores rápidamente

Recomendadas:

- JSONLint
- JSON Formatter
- JSON Editor Online
- Extensión VSCode “JSON Tools”

## 3) ¿Cómo escribir JSON desde cero? (Guía rápida)

**Caso: guardar un usuario con nombre, edad y email.**

Paso 1: anota los datos como ficha

```
Nombre: Mario
Edad: 35
Email: mario@nintendo.com

```

Paso 2: conviértelo a JSON

```json
{
  "nombre": "Mario",
  "edad": 35,
  "email": "mario@nintendo.com"
}
```

**Lista de varios usuarios:**

```json
{
  "usuarios": [
    { "id": 1, "nombre": "Peach" },
    { "id": 2, "nombre": "Luigi" }
  ]
}
```

## Tips para no equivocarte

| Consejo                        | Por qué                       |
| ------------------------------ | ----------------------------- |
| Comillas dobles en claves      | JSON lo exige                 |
| Valida tu JSON antes de usarlo | Evitas errores en Node/JS     |
| Empieza simple                 | Luego anidas arrays y objetos |
| Usa herramientas online        | Aprendes más rápido           |
