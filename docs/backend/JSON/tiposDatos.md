# Tipos de datos en JSON

## ¿Por qué es importante?

Cuando usas JSON para guardar datos o enviar información entre el frontend y el backend, necesitas **saber qué tipo de dato estás manipulando**, porque:

- JavaScript (y Node.js) interpreta los datos según su tipo. Si no están bien definidos, tu lógica puede romperse.
- Un error de tipo puede causar resultados inesperados (por ejemplo, si intentas sumar un texto y un número).
- Al convertir JSON a objetos en Node.js (con `JSON.parse`), **los tipos deben coincidir** para que tu aplicación funcione correctamente.

## JSON tiene solo **6 tipos de datos**

Aquí te explico cada uno **con ejemplos prácticos** en JSON y en Node.js:

### 1) String (cadena de texto)

- Siempre entre **comillas dobles `"..."`**
- Se usa para nombres, correos, mensajes, etc.

```json
{
  "nombre": "Mario",
  "juego": "Super Mario Bros"
}
```

En Node.js:

```jsx
const usuario = {
  nombre: "Mario",
  juego: "Super Mario Bros",
};

console.log(typeof usuario.nombre); // "string"
```

### 2) Number (número)

- Pueden ser enteros o decimales
- **Sin comillas**

```json
{
  "edad": 25,
  "puntuacion": 99.5
}
```

En Node.js:

```jsx
const datos = {
  edad: 25,
  puntuacion: 99.5,
};

console.log(typeof datos.edad); // "number"
```

### 3) Boolean (verdadero/falso)

- Solo puede ser: `true` o `false` (sin comillas)
- Útil para estados: activado, conectado, disponible…

```json
{
  "activo": true,
  "admin": false
}
```

En Node.js:

```jsx
const estado = {
  activo: true,
  admin: false,
};

console.log(typeof estado.activo); // "boolean"
```

### 4) Null (valor nulo)

- Representa “nada” o “vacío”
- Es diferente de `false` o `0`

```json
{
  "telefono": null
}
```

En Node.js:

```jsx
const contacto = {
  telefono: null,
};

console.log(contacto.telefono === null); // true
```

### 5) Array (lista de valores)

- Se escriben entre **corchetes `[]`**
- Se separan los valores con comas

```json
{
  "juegos": ["Zelda", "Mario", "Donkey Kong"]
}
```

En Node.js:

```jsx
const lista = {
  juegos: ["Zelda", "Mario", "Donkey Kong"],
};

console.log(Array.isArray(lista.juegos)); // true
```

### 6) Object (conjunto clave-valor)

- Se escriben entre **llaves `{}`**
- Cada clave debe estar entre comillas

```json
{
  "usuario": {
    "nombre": "Peach",
    "edad": 22
  }
}
```

En Node.js:

```jsx
const objeto = {
  usuario: {
    nombre: "Peach",
    edad: 22,
  },
};

console.log(typeof objeto.usuario); // "object"
```

## Tabla resumen visual

| Tipo    | Ejemplo JSON                         | Node.js equivalente                           |
| ------- | ------------------------------------ | --------------------------------------------- |
| String  | `"nombre": "Luigi"`                  | `"Luigi"` (tipo: `string`)                    |
| Number  | `"nivel": 5`                         | `5` (tipo: `number`)                          |
| Boolean | `"activo": true`                     | `true` / `false` (tipo: `boolean`)            |
| Null    | `"correo": null`                     | `null`                                        |
| Array   | `"colores": ["rojo", "verde"]`       | `["rojo", "verde"]` (tipo: `object` + array)  |
| Object  | `"user": {"id":1, "nombre":"Peach"}` | `{ id: 1, nombre: "Peach" }` (tipo: `object`) |

## Errores comunes con tipos

| Error JSON                  | Corrección                     |
| --------------------------- | ------------------------------ |
| `"edad": "30"` (como texto) | `"edad": 30` (como número)     |
| `"activo": "true"` (string) | `"activo": true` (boolean)     |
| `"vacío": "null"` (string)  | `"vacío": null` (null real)    |
| `"colores": "{rojo,verde}"` | `"colores": ["rojo", "verde"]` |

## En resumen

| Lo que debes recordar            | Explicación                                   |
| -------------------------------- | --------------------------------------------- |
| JSON solo usa 6 tipos            | Texto, número, booleano, nulo, array, objeto  |
| Comillas dobles para strings     | `"nombre": "Mario"`                           |
| Números y booleanos sin comillas | `"activo": true`, `"edad": 30`                |
| Objetos = estructura `{}`        | En Node.js es un objeto JS                    |
| Arrays = lista `[]`              | En Node.js es un array real (`Array.isArray`) |
