# 📚 Documentación API - Balance.app

## 🌐 Cómo acceder a la documentación

### **En local**

```
http://localhost:3003/api-docs
```

### **En producción**

```
https://proyecte-final-daw.onrender.com/api-docs
```

---

## 🔐 Autenticación

La API usa **JWT** para autenticar las peticiones.

### **Cómo funciona**

1. **Haces login** y obtienes un token:

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

2. **La respuesta incluye el token**:

```json
{
    "id": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com",
    "name": "Juan Pérez",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

3. **Lo usas en el header** de las siguientes peticiones:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints disponibles

### Usuarios

| Método | Endpoint                     | Qué hace                  | Auth |
| ------ | ---------------------------- | ------------------------- | ---- |
| POST   | `/api/users`                 | Crear cuenta nueva        | ❌   |
| POST   | `/api/users/login`           | Login                     | ❌   |
| GET    | `/api/users`                 | Listar todos los usuarios | ✅   |
| GET    | `/api/users/:id`             | Ver un usuario específico | ✅   |
| PUT    | `/api/users/profile`         | Actualizar perfil         | ✅   |
| PUT    | `/api/users/change-password` | Cambiar contraseña        | ✅   |
| PUT    | `/api/users/change-nickname` | Cambiar nickname          | ✅   |
| DELETE | `/api/users/:id`             | Borrar usuario            | ✅   |

### Categorías

| Método | Endpoint              | Descripción                  | Auth |
| ------ | --------------------- | ---------------------------- | ---- |
| GET    | `/api/categories`     | Obtener todas las categorías | ✅   |
| GET    | `/api/categories/:id` | Obtener categoría por ID     | ✅   |
| POST   | `/api/categories`     | Crear nueva categoría        | ✅   |
| PUT    | `/api/categories/:id` | Actualizar categoría         | ✅   |
| DELETE | `/api/categories/:id` | Eliminar categoría           | ✅   |

### **💰 Gastos (Spends)**

| Método | Endpoint                           | Descripción              | Auth |
| ------ | ---------------------------------- | ------------------------ | ---- |
| GET    | `/api/spends`                      | Obtener todos los gastos | ✅   |
| GET    | `/api/spends/:id`                  | Obtener gasto por ID     | ✅   |
| GET    | `/api/spends/category/:categoryId` | Gastos por categoría     | ✅   |
| GET    | `/api/spends/type/:type`           | Gastos por tipo          | ✅   |
| POST   | `/api/spends`                      | Registrar nuevo gasto    | ✅   |
| PUT    | `/api/spends/:id`                  | Actualizar gasto         | ✅   |
| DELETE | `/api/spends/:id`                  | Eliminar gasto           | ✅   |

### **🎯 Metas de Ahorro (Savings)**

| Método | Endpoint                       | Descripción                       | Auth |
| ------ | ------------------------------ | --------------------------------- | ---- |
| GET    | `/api/savings`                 | Obtener todas las metas           | ✅   |
| GET    | `/api/savings/:id`             | Obtener meta por ID               | ✅   |
| GET    | `/api/savings/:id/history`     | Historial de contribuciones       | ✅   |
| POST   | `/api/savings`                 | Crear nueva meta                  | ✅   |
| POST   | `/api/savings/process-monthly` | Procesar contribuciones mensuales | ✅   |
| PUT    | `/api/savings/:id`             | Actualizar meta                   | ✅   |
| DELETE | `/api/savings/:id`             | Eliminar meta                     | ✅   |

### **📈 Inversiones (Investments)**

| Método | Endpoint             | Descripción                   | Auth |
| ------ | -------------------- | ----------------------------- | ---- |
| GET    | `/api/inversion`     | Obtener todas las inversiones | ✅   |
| POST   | `/api/inversion`     | Registrar nueva inversión     | ✅   |
| PUT    | `/api/inversion/:id` | Actualizar inversión          | ✅   |
| DELETE | `/api/inversion/:id` | Eliminar inversión            | ✅   |

### **⚙️ Configuración de Porcentajes**

| Método | Endpoint                   | Descripción              | Auth |
| ------ | -------------------------- | ------------------------ | ---- |
| GET    | `/api/spendpercentage`     | Obtener configuración    | ✅   |
| POST   | `/api/spendpercentage`     | Crear configuración      | ✅   |
| PUT    | `/api/spendpercentage/:id` | Actualizar configuración | ✅   |
| DELETE | `/api/spendpercentage/:id` | Eliminar configuración   | ✅   |

### **👨‍💼 Admin**

| Método | Endpoint           | Descripción                        | Auth     |
| ------ | ------------------ | ---------------------------------- | -------- |
| GET    | `/api/admin/users` | Obtener todos los usuarios (admin) | ✅ Admin |

---

## 📝 Ejemplos de Uso

### **1. Registrar Usuario**

```bash
curl -X POST http://localhost:3003/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "nomina": 2000
  }'
```

### **2. Iniciar Sesión**

```bash
curl -X POST http://localhost:3003/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### **3. Crear Categoría (con token)**

```bash
curl -X POST http://localhost:3003/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Supermercado",
    "categoryType": "fixed",
    "budget": 300
  }'
```

### **4. Registrar Gasto**

```bash
curl -X POST http://localhost:3003/api/spends \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Compra Mercadona",
    "amount": 45.50,
    "date": "2026-05-15",
    "category_id": "ID_DE_CATEGORIA"
  }'
```

### **5. Crear Meta de Ahorro**

```bash
curl -X POST http://localhost:3003/api/savings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "name": "Vacaciones",
    "targetAmount": 2000,
    "priority": 8,
    "deadline": "2026-12-31"
  }'
```

---

## 🔒 Códigos de Estado HTTP

| Código | Significado                                   |
| ------ | --------------------------------------------- |
| 200    | OK - Petición exitosa                         |
| 201    | Created - Recurso creado exitosamente         |
| 400    | Bad Request - Datos inválidos                 |
| 401    | Unauthorized - No autorizado o token inválido |
| 404    | Not Found - Recurso no encontrado             |
| 500    | Internal Server Error - Error del servidor    |

---

## 📊 Modelos de Datos

### **User**

```json
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "nomina": "number",
    "percentageSpend": {
        "fixedExpenses": "number",
        "leisureExpenses": "number",
        "investment": "number",
        "savings": "number"
    },
    "theme": "light | dark",
    "language": "es | en | ca",
    "role": "user | admin"
}
```

### **Category**

```json
{
    "_id": "string",
    "name": "string",
    "categoryType": "fixed | leisure",
    "budget": "number",
    "user_id": "string"
}
```

### **Spend**

```json
{
    "_id": "string",
    "name": "string",
    "amount": "number",
    "date": "date",
    "category_id": "string",
    "user_id": "string"
}
```

### **SavingGoal**

```json
{
    "_id": "string",
    "name": "string",
    "targetAmount": "number",
    "currentAmount": "number",
    "priority": "number (1-10)",
    "deadline": "date",
    "user_id": "string"
}
```

---

## 🛠️ Herramientas Recomendadas

- **Swagger UI**: Interfaz interactiva incluida en `/api-docs`
- **Postman**: Importar colección desde `/api-docs.json`
- **Insomnia**: Cliente REST alternativo
- **curl**: Línea de comandos

---

## 📚 Recursos Adicionales

- **Swagger Spec JSON**: `http://localhost:3003/api-docs.json`
- **OpenAPI 3.0**: Estándar utilizado
- **JWT**: https://jwt.io/

---

## 🚀 Instalación y Uso

### **1. Instalar dependencias**

```bash
cd backend
npm install
```

### **2. Configurar variables de entorno**

```bash
# .env
MONGODB_URI=mongodb://...
JWT_SECRET=tu_secreto_aqui
PORT=3003
```

### **3. Iniciar servidor**

```bash
npm run dev
```

### **4. Acceder a la documentación**

```
http://localhost:3003/api-docs
```

---

## 📞 Soporte

Para más información, consulta la documentación interactiva en `/api-docs` o contacta con el equipo de desarrollo.
