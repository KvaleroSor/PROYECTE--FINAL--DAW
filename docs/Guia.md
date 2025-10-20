# 💰 Proyecto Final DAW — App de Gestión Financiera Personal

## 🧭 Descripción general
Aplicación web diseñada para ayudar a personas sin conocimientos financieros a **gestionar su dinero de forma sencilla**, **entender sus gastos** y **fomentar el ahorro**.  
El usuario podrá registrar sus ingresos y gastos, establecer gastos fijos y, en base a su nómina mensual, el sistema calculará automáticamente cuánto puede destinar a **ahorro**, **ocio**, **gastos variables** e **inversión**.

El objetivo principal es **educar financieramente a través de la práctica**, ofreciendo una herramienta útil, intuitiva y visualmente atractiva.

---

## 🎯 Objetivos del proyecto
- Fomentar la **educación financiera** mediante una herramienta accesible y visual.  
- Permitir una **gestión clara y sencilla de los gastos personales**.  
- Ayudar al usuario a **distribuir su nómina automáticamente** según categorías financieras.  
- Mostrar estadísticas y gráficos que ayuden a **entender los hábitos de consumo**.  

---

## ⚙️ Stack Tecnológico

| Capa | Tecnología |
|------|-------------|
| **Frontend** | React + Next.js |
| **Estilos** | Tailwind CSS |
| **Backend** | Node.js + Express |
| **Base de datos** | MongoDB |
| **Control de versiones** | Git + GitHub |

---

## 🧱 Arquitectura general del proyecto

```bash
root/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── app.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
