import express from 'express';
import cors from 'cors';
import postUser from './api/routes_users/postUser.js';
import updateUser from './api/routes_users/updateUser.js';
import deleteUser from './api/routes_users/deleteUser.js';
import getUser from './api/routes_users/getUser.js';
import getUserById from './api/routes_users/getUserById.js';

const app = express();

app.use(express.json());
app.use(cors());

/*
📘 Códigos de estado HTTP más comunes para Express

|---------|------------------------------|----------------|
| 200 OK                 | Petición correcta (GET, PUT, PATCH, DELETE exitosos). |
| 201 Created            | Recurso creado correctamente (por ejemplo, en un POST). |
| 204 No Content         | Petición correcta pero sin contenido que devolver. |
| 400 Bad Request        | Datos incorrectos o petición mal formada (campos inválidos, JSON mal enviado, etc.). |
| 401 Unauthorized       | El usuario no está autenticado (falta token o credenciales). |
| 403 Forbidden          | El usuario está autenticado pero no tiene permisos. |
| 404 Not Found          | Recurso no encontrado (por ejemplo, libro con ese ID no existe). |
| 409 Conflict           | Conflicto con el estado actual (duplicado, ya existe un registro, etc.). |
| 422 Unprocessable Entity | Datos válidos en formato pero con errores de validación (por ejemplo, campos que no cumplen el schema). |
| 500 Internal Server Error | Error inesperado en el servidor. |
| 503 Service Unavailable | El servidor no puede procesar temporalmente la petición. |

*/

/**
 * Routes for users 🧑🏽‍💻👩🏽‍💻
 */

app.use("/api/users", postUser);
app.use("/api/users", updateUser);
app.use("/api/users", deleteUser);
app.use("/api/users", getUser);
app.use("/api/users", getUserById);

/**
 * Routes for spends 💰
 */

// app.use("/api/spends", postSpend);
// app.use("/api/spends", updateSpend);
// app.use("/api/spends", deleteSpend);
// app.use("/api/spends", getSpend);
// app.use("/api/spends", getSpendById);

/**
 * Routes for categories 📋
 */

// app.use("/api/categories", postCategory);
// app.use("/api/categories", updateCategory);
// app.use("/api/categories", deleteCategory);
// app.use("/api/categories", getCategory);
// app.use("/api/categories", getCategoryById);


export default app;