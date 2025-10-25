# Crear y generar JSON en Node.js con JSON.stringify()

## ¿Qué hace `JSON.stringify()`?

Convierte un **objeto o array de JavaScript** en una **cadena JSON válida** que puedes:

- Guardar en un archivo `.json`
- Enviar como respuesta desde un servidor
- Imprimir en pantalla para usarla en otro lugar

Esto es el equivalente en Node.js a lo que en PHP hacías con `json_encode()`.

## Sintaxis básica

```jsx
const objeto = { nombre: "Mario", edad: 35 };
const json = JSON.stringify(objeto);

console.log(json);
// Resultado: {"nombre":"Mario","edad":35}
```

## Ejemplo 1 – Guardar datos como archivo `.json`

📁 **Archivo: `guardar_usuario.js`**

```jsx
import { writeFileSync } from "node:fs";

const usuario = {
  nombre: "Luigi",
  email: "luigi@nintendo.com",
  activo: true,
};

// Convertir a JSON y guardar bonito
writeFileSync("usuario.json", JSON.stringify(usuario, null, 2), "utf8");

console.log("✅ Archivo 'usuario.json' creado correctamente.");
```

✅ El archivo `usuario.json` contendrá:

```json
{
  "nombre": "Luigi",
  "email": "luigi@nintendo.com",
  "activo": true
}
```

## Ejemplo 2 – Crear un array de objetos

📁 **Archivo: `productos.js`**

```jsx
const productos = [
  {
    id: 1,
    nombre: "Zapatillas",
    precio: 49.99,
  },
  {
    id: 2,
    nombre: "Mochila",
    precio: 29.9,
  },
];

const json = JSON.stringify(productos, null, 2);
console.log(json);
```

✅ Ideal para generar listas de datos que luego servirán en APIs o archivos estáticos.

## ¿Para qué usar `null, 2` en `JSON.stringify()`?

Este segundo y tercer argumento sirven para **dar formato legible al JSON** (indentación bonita):

```jsx
JSON.stringify(datos, null, 2);
```

✅ Muy útil al guardar archivos o inspeccionar resultados durante el desarrollo.

## Flags y opciones útiles en Node.js

Aunque en Node.js no hay flags como en PHP, puedes controlar:

- La indentación (segundo y tercer argumento)
- La forma en que serializas datos (primer argumento)
- Qué propiedades incluir (usando funciones de reemplazo si quieres)

Ejemplo simple:

```jsx
const persona = { nombre: "Peach", secreto: "oculto" };

const json = JSON.stringify(persona, ["nombre"], 2);
console.log(json);
```

✅ Solo se incluirá la propiedad `nombre` en el JSON final.

## Práctica rápida guiada: generar un archivo `.json` con datos mixtos

📁 **Archivo: `crear_personaje.js`**

```jsx
import { writeFileSync } from "node:fs";

const personaje = {
  nombre: "Peach",
  edad: 22,
  habilidades: ["flotar", "curar"],
  activo: true,
  contacto: null,
};

writeFileSync("peach.json", JSON.stringify(personaje, null, 2), "utf8");

console.log("✅ Archivo 'peach.json' creado correctamente.");
```

📦 Resultado en `peach.json`:

```json
{
  "nombre": "Peach",
  "edad": 22,
  "habilidades": ["flotar", "curar"],
  "activo": true,
  "contacto": null
}
```

## En resumen

| Acción que aprendiste        | Método en Node.js                     |
| ---------------------------- | ------------------------------------- |
| Crear JSON desde un objeto   | `JSON.stringify(objeto)`              |
| Guardar JSON en un archivo   | `writeFileSync()`                     |
| Generar JSON legible         | `JSON.stringify(objeto, null, 2)`     |
| Crear listas de objetos JSON | Arrays de objetos                     |
| Preparar datos para API      | `JSON.stringify()` antes de enviarlos |
