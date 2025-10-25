# JSON vs Objetos en Node.js

## ¿Por qué es importante?

> JSON y los objetos en JavaScript (y Node.js) se parecen muchísimo… de hecho, son prácticamente equivalentes, pero no son exactamente lo mismo.

- Node.js trabaja con **objetos y arrays** de forma nativa.
- JSON es simplemente **texto** con formato estructurado.
- Para trabajar con datos reales, normalmente **conviertes JSON ⇆ objeto**.

Si no haces esta conversión correctamente, obtendrás errores al acceder a los datos, o simplemente estarán vacíos.

## Conversión entre JSON y objetos en Node.js

### 1) De JSON → Objeto JS → `JSON.parse()`

```jsx
const json = '{"nombre": "Mario", "edad": 35}';

const objeto = JSON.parse(json);

console.log(objeto);
```

✅ Resultado en consola:

```jsx
{ nombre: 'Mario', edad: 35 }

```

### 2) De Objeto JS → JSON → `JSON.stringify()`

```jsx
const objeto = { nombre: "Luigi", edad: 34 };

const json = JSON.stringify(objeto);

console.log(json);
```

✅ Resultado:

```json
{ "nombre": "Luigi", "edad": 34 }
```

## Tabla comparativa

| Concepto       | JSON                   | Objeto JS                        |
| -------------- | ---------------------- | -------------------------------- |
| Formato        | Texto plano            | Estructura interna               |
| Sintaxis       | `{"clave":"valor"}`    | `{ clave: "valor" }`             |
| Acceso a datos | No directamente        | `objeto.clave`                   |
| Conversión     | `JSON.parse()`         | `JSON.stringify()`               |
| Usado para     | Guardar / enviar datos | Manipular datos en la aplicación |

## Errores comunes al convertir JSON y objetos en Node.js

| Error                                              | Causa y solución                                                  |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| Usar `objeto.propiedad` sobre JSON sin parsear     | JSON es texto: primero usar `JSON.parse()`                        |
| Intentar guardar objeto directamente               | Hay que usar `JSON.stringify()` antes de escribirlo en un archivo |
| JSON inválido (comillas simples, coma final, etc.) | JSON **debe usar comillas dobles** y tener sintaxis correcta      |

## Ejemplo completo en Node.js

```jsx
import { writeFileSync, readFileSync } from "node:fs";

// 1. Crear objeto JS
const usuario = {
  nombre: "Peach",
  rol: "admin",
  activo: true,
};

// 2. Convertir a JSON para guardar o enviar
const json = JSON.stringify(usuario);

// 3. Guardar en archivo
writeFileSync("usuario.json", json);

// 4. Leerlo después
const contenido = readFileSync("usuario.json", "utf8");

// 5. Convertir de JSON a objeto JS
const datos = JSON.parse(contenido);

// 6. Mostrar en consola
console.log("👤 Nombre:", datos.nombre);
```

## Reglas clave para recordar

| Acción que vas a hacer           | Método en Node.js                 |
| -------------------------------- | --------------------------------- |
| Convertir objeto JS → JSON       | `JSON.stringify(objeto)`          |
| Convertir JSON → objeto JS       | `JSON.parse(json)`                |
| Guardar datos en archivo `.json` | `writeFileSync()` o `writeFile()` |
| Leer archivo JSON                | `readFileSync()` o `readFile()`   |

## En resumen

| JSON                                      | Objeto JS                       |
| ----------------------------------------- | ------------------------------- |
| Formato universal para enviar/guardar     | Estructura nativa para trabajar |
| Se guarda como texto (`.json`)            | Vive en memoria                 |
| Necesita `JSON.parse()` para usarlo       | Se usa directamente             |
| Se convierte fácil con `JSON.stringify()` | Muy fluido en Node.js           |
