# Gestión de usuarios con React, Apollo Client y GraphQL

Interfaz web en React que consume una API GraphQL conectada a MySQL para gestionar usuarios mediante operaciones CRUD (listar, registrar, editar y eliminar).

Este proyecto es el **complemento del proyecto anterior**, en el que se construyó la API GraphQL con Node.js, Express y MySQL. En esta etapa se desarrolla el frontend que se conecta a esa API mediante Apollo Client, de modo que las operaciones ya no se ejecutan desde GraphiQL o Postman, sino desde una interfaz web.

---

## Tecnologías

| Capa          | Tecnologías                                       |
| ------------- | ------------------------------------------------- |
| Frontend      | React, Vite, Apollo Client, CSS                   |
| Backend       | Node.js, Express, GraphQL (express-graphql), CORS |
| Base de datos | MySQL (mysql2)                                    |

## Arquitectura

```
Interfaz React  →  Apollo Client  →  API GraphQL  →  MySQL
```

1. El usuario interactúa con el formulario o los botones de la tabla.
2. Apollo Client envía la query o mutation al endpoint GraphQL.
3. El backend valida la operación con el schema y ejecuta el resolver.
4. El resolver consulta o modifica la base de datos MySQL.
5. La respuesta regresa a React y la tabla se actualiza con `refetchQueries`, sin recargar el navegador.

## Estructura del repositorio

```
├── backend/
│   ├── config/
│   │   └── db.js              # Conexión a MySQL
│   ├── ...                    # Schema y resolvers
│   └── index.js               # Servidor Express + GraphQL
│
└── frontend-usuarios/
    └── src/
        ├── components/
        │   ├── FormularioUsuario.jsx   # Registrar y editar usuarios
        │   └── ListaUsuarios.jsx       # Tabla, edición y eliminación
        ├── graphql/
        │   └── operaciones.js          # Queries y mutations
        ├── App.jsx                     # Integración de componentes
        ├── App.css                     # Estilos de la interfaz
        └── main.jsx                    # Configuración de Apollo Client
```

## Operaciones GraphQL utilizadas

| Operación               | Tipo     | Descripción                                         |
| ----------------------- | -------- | --------------------------------------------------- |
| `users`                 | Query    | Lista todos los usuarios                            |
| `createUser(input)`     | Mutation | Registra un usuario                                 |
| `updateUser(id, input)` | Mutation | Actualiza nombre y correo de un usuario             |
| `deleteUser(id)`        | Mutation | Elimina un usuario y devuelve `success` y `message` |

## Funcionalidades

- Tabla con los usuarios almacenados en MySQL.
- Formulario reutilizable para registrar y editar.
- Confirmación antes de eliminar un registro.
- Mensajes de carga, éxito y error.
- Actualización automática de la tabla después de cada operación.
- Diseño adaptable con modo claro y oscuro según el sistema.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- MySQL 8 (o XAMPP/WAMP con MySQL)
- Git

## Puertos utilizados

| Servicio        | URL                           |
| --------------- | ----------------------------- |
| Backend GraphQL | http://localhost:4000/graphql |
| Frontend React  | http://localhost:5173         |

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosQuenan07/ComplementoMicroserviciosGraphQLReact.git
cd ComplementoMicroserviciosGraphQLReact
```

### 2. Preparar la base de datos

Si ya tiene la base de datos del proyecto anterior, omita este paso. De lo contrario, ejecute en MySQL (reemplace `nombre_base_datos` por el nombre usado en `backend/config/db.js`):

```sql
CREATE DATABASE IF NOT EXISTS nombre_base_datos;
USE nombre_base_datos;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL
);

INSERT INTO users (name, email) VALUES
  ('Ana Torres', 'ana@example.com'),
  ('Carlos Parra', 'carlos@example.com');
```

### 3. Configurar la conexión a MySQL

Abra `backend/config/db.js` y ajuste el host, usuario, contraseña y nombre de la base de datos según su instalación local.

### 4. Ejecutar el backend

En una terminal:

```bash
cd backend
npm install
node index.js
```

Compruebe en el navegador que http://localhost:4000/graphql abre GraphiQL.

### 5. Ejecutar el frontend

En **otra terminal**, sin cerrar la del backend:

```bash
cd frontend-usuarios
npm install
npm run dev
```

Abra la dirección que muestra Vite, normalmente http://localhost:5173.

> El backend y el frontend deben ejecutarse al mismo tiempo, cada uno en su propia terminal.

---

## Solución de problemas

| Situación                                                             | Qué revisar                                                                     |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `Failed to fetch`                                                     | El backend está detenido, la URL es incorrecta o CORS no está habilitado.       |
| `Cannot find package`                                                 | Ejecute `npm install` dentro de la carpeta correcta.                            |
| `Unknown argument` o `Unknown field`                                  | Los nombres en `operaciones.js` no coinciden con el schema del backend.         |
| `Variable "$id" of type "Int!" used in position expecting type "ID!"` | El tipo de la variable no coincide con el schema; use `ID!` en las operaciones. |
| La tabla no se actualiza                                              | Verifique que las mutaciones tengan `refetchQueries`.                           |
| Error de conexión a MySQL                                             | Revise que MySQL esté activo y las credenciales de `config/db.js`.              |

---
