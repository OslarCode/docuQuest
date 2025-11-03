# GraphQL

# Entendiendo GraphQL de forma sencilla

GraphQL es una forma moderna de trabajar con APIs que te permite pedir exactamente los datos que necesitas, ni más ni menos. A diferencia del estilo tradicional REST, con GraphQL puedes hacer consultas a medida y obtener todo lo necesario en una sola llamada.

## ¿Qué hace a GraphQL tan especial?

Imagina que vas a una tienda y en lugar de aceptar solo combos prediseñados, puedes elegir exactamente lo que quieres poner en tu carrito. Así funciona GraphQL. En lugar de depender de múltiples rutas fijas como en REST (una para cada cosa), haces una sola consulta donde indicas todo lo que quieres. Eso hace que tu app sea más rápida y que el código sea más limpio.

Esto soluciona dos problemas comunes:

- **Over-fetching**: cuando una API REST devuelve más datos de los que realmente necesitas.
- **Under-fetching**: cuando tienes que hacer varias llamadas para reunir toda la información.

Con GraphQL haces una sola petición personalizada y obtienes solo lo que pediste.

## Esquema y resolvers: el motor de GraphQL

### El esquema: el contrato entre cliente y servidor

El **esquema** define las reglas del juego. Es como un mapa que dice qué tipos de datos existen, cómo se relacionan y qué operaciones se pueden hacer. Por ejemplo, un tipo `User` podría tener los campos `id`, `name` y `age`.

También puedes definir operaciones como:

- `Query`: para obtener datos (como un GET).
- `Mutation`: para modificar datos (como un POST, PUT o DELETE).
- `Subscription`: para recibir actualizaciones en tiempo real (como un chat en vivo o notificaciones).

Ejemplo de un esquema muy simple:

```graphql
type Query {
  users: [User]
}

type Mutation {
  createUser(name: String!, age: Int!): User
}

type User {
  id: ID!
  name: String!
  age: Int!
}
```

### Los resolvers: los que hacen el trabajo real

Cada campo del esquema necesita saber cómo conseguir su información. Eso lo hacen los **resolvers**, que son funciones que se encargan de responder a lo que se pide. Si pides `user(id: 1)`, el resolver busca ese usuario en la base de datos y lo devuelve.

En Node.js, esto puede verse así:

```
const resolvers = {
  Query: {
    users: () => db.getAllUsers(),
  },
  Mutation: {
    createUser: (_, args) => db.createUser(args.name, args.age),
  }
};

```

## ¿GraphQL es mejor que REST?

No se trata de que uno sea “mejor” que el otro, sino de elegir el adecuado según lo que necesites.

### REST

- Usa varias URLs como `/users`, `/users/1`.
- Usa métodos HTTP (GET, POST, PUT, DELETE).
- Es fácil de cachear con herramientas estándar del navegador.

### GraphQL

- Tiene solo un endpoint (`/graphql`).
- Tú defines la forma y profundidad de los datos que quieres.
- Evita datos innecesarios y múltiples llamadas.
- Es más flexible, pero requiere definir un esquema y resolvers.
- La caché es más compleja, aunque existen soluciones como Apollo Client.

**Ejemplo práctico:**

Con REST, para obtener un usuario y sus artículos tendrías que hacer dos llamadas: `/users/1` y luego `/users/1/articles`.

Con GraphQL, puedes pedirlo todo de una:

```graphql
{
  user(id: "1") {
    name
    articles {
      title
    }
  }
}
```

## Ejemplos de uso en la vida real

### Consulta simple

```graphql
{
  user(id: "1") {
    id
    name
    age
  }
}
```

Devuelve exactamente lo pedido:

```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "John Doe",
      "age": 30
    }
  }
}
```

### Mutación (crear un nuevo usuario)

```graphql
mutation {
  createUser(name: "Jane", age: 25) {
    id
    name
    age
  }
}
```

El servidor responde con los datos recién creados.

### Actualizar un usuario

```graphql
mutation {
  updateUser(id: "2", name: "Jane Smith", age: 26) {
    id
    name
    age
  }
}
```

Así, puedes modificar solo lo necesario sin sobrescribir todo.

## ¿Vale la pena usar GraphQL?

Si tu aplicación necesita obtener datos de forma flexible, evitar múltiples peticiones o trabajar con conexiones móviles donde el rendimiento importa, **sí**. GraphQL puede darte el control que REST no siempre ofrece. Eso sí, aprender a definir esquemas y configurar resolvers lleva algo de tiempo, pero es una inversión que vale la pena.

## Reflexión final

GraphQL cambia la forma en que diseñamos APIs. Al poner al cliente en control de los datos que recibe, mejora la eficiencia y la experiencia del usuario. Pero como todo en desarrollo, hay que elegir la herramienta adecuada para el problema que tienes.

**¿Y tú? Te animas a probar GraphQL en tu próximo proyecto o migrar parte de tu backend para ganar más flexibilidad?**
