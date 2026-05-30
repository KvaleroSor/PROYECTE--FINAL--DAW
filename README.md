# 💰 App de Gestión Financiera Personal | Numoes.app

Aplicación web para ayudar a personas sin conocimientos financieros a **gestionar su dinero de forma sencilla**, distribuyendo automáticamente su nómina entre **ahorro, gastos fijos, ocio e inversión**.

---

## 🚀 Características principales

- Registro de **ingresos** y **gastos** por categorías.
- Asignación de **gastos fijos** (alquiler, luz, etc.).
- Cálculo automático del **presupuesto mensual**:
    - 💰 Ahorro
    - 🛒 Gastos variables
    - 🎉 Ocio
    - 📈 Inversión
- Dashboard con estadísticas y gráficos financieros.
- Configuración personalizable de porcentajes de reparto.
- Control y seguimiento de la inversión.

---

## 🧠 Objetivo

Ayudar a las personas a **aprender a gestionar su dinero**, entender en qué gastan y crear hábitos financieros saludables sin necesidad de conocimientos previos.

---

## 🛠️ Stack Tecnológico

| Capa                     | Tecnología        |
| ------------------------ | ----------------- |
| **Frontend**             | React + Next.js   |
| **Estilos**              | Tailwind CSS      |
| **Backend**              | Node.js + Express |
| **Base de datos**        | MongoDB           |
| **Control de versiones** | Git + GitHub      |
| **Depliegue Backend**    | Render            |
| **Despliegue Frontend**  | Vercel            |

---

## ⚙️ Estructura inicial del proyecto

```bash
root/
├── backend/
│   ├── src/
│   └── package.json
├── frontend/
│   ├── app/
│   └── package.json
└── README.md
```

---

## 🚀 Poner en marcha el proyecto | BACKEND | DESARROLLO

Nos situaremos en el directorio de "backend"

- npm install
    - Instalamos todas las dependencias que necesite el proyecto.

- npm run dev
    - Arrancaremos nuestro servidor de node con express.

- Anotación:
    - Nos deberá salir en la terminal lo siguiente:
    ```
    ✅🚀 BBDD conectada
    ✅🚀 Servidor escuchando el puerto 3003
    ```

## 🚀 Poner en marcha el proyecto | FRONTEND | DESARROLLO

Nos situaremos en el directorio de "frontend/project-final-daw"

- npm install
    - Instalamos todas las dependencias que necesite el proyecto.

- npm run dev
    - Arrancaremos nuestro servidor de node con express.

- Anotación:
    - Nos deberá salir en la terminal lo siguiente:

    ```
       ▲ Next.js 16.0.3 (Turbopack)
    -   Local: http://localhost:3000
    -   Network: http://192.168.1.40:3000
    -   Environments: .env

    ✓ Starting...
    ✓ Ready in 662ms
    ```

## 🚀 Link despliegue Vercel | FRONTEND | PRODUCCIÓN

```
- proyecte-final-daw.vercel.app
```

## 🚀 Link despliegue Render | BACKEND | PRODUCCIÓN

```
- https://proyecte-final-daw.onrender.com
```

## � Documentación API

La API REST está completamente documentada con **Swagger/OpenAPI 3.0**

### **Acceso a la documentación interactiva:**

- **Desarrollo**: http://localhost:3003/api-docs
- **Producción**: https://proyecte-final-daw.onrender.com/api-docs

### **Recursos:**

- [Documentación API Completa](./backend/API_DOCUMENTATION.md)
- [Especificación OpenAPI JSON](http://localhost:3003/api-docs.json)

---

## 🔗 Enlaces Adicionales

- [Guía de Estilos](./docs/GUIA_ESTILOS_PRESENTACION.md)
- [Documentación de Testing](./frontend/project-final-daw/TESTING.md)
