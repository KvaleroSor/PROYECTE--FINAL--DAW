# 📘 Modelo de Base de Datos

## 🧩 Entidades principales

### 🧑‍💻 Usuario
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador único del usuario |
| name | string | Nombre del usuario |
| email | string | Correo electrónico |
| password_hash | string | Hash de la contraseña |
| register_date | date | Fecha de registro |

---

### 💳 Gasto (Spending)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador único del gasto |
| usuario_id | integer (FK → User.id) | Usuario al que pertenece |
| category | string | Categoría del gasto |
| description | string | Descripción opcional |
| import | number | Importe gastado |
| date | date | Fecha del gasto |
| payment_type | string | Tipo de pago (efectivo, tarjeta, etc.) |

📎 **Relación:** Un `Usuario` puede tener **muchos** `Gastos` (1:N)

---

### 💰 Inversión (Inversion)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador de la inversión |
| usuario_id | integer (FK → User.id) | Usuario al que pertenece |
| type | string | Tipo de inversión |
| import | number | Cantidad invertida |
| date | date | Fecha de la inversión |
| target_profitability | number | Rentabilidad objetivo |
| real_profitability | number | Rentabilidad real |
| total | number | Total acumulado |

📎 **Relación:** Un `Usuario` puede tener **muchas** `Inversiones` (1:N)

---

### ⚙️ Configuración de Porcentajes (Percentage_settings)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| usuario_id | integer (PK, FK → User.id) | Usuario al que pertenece |
| gasto | number | Porcentaje destinado a gasto |
| ahorro | number | Porcentaje destinado a ahorro |
| inversion | number | Porcentaje destinado a inversión |
| ocio | number | Porcentaje destinado a ocio |

📎 **Relación:** Un `Usuario` tiene **una única** configuración de porcentajes (1:1)

---

### 💼 Nómina (Nomina)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador de la nómina |
| usuario_id | integer (FK → User.id) | Usuario asociado |
| cantidad | number | Importe de la nómina |
| frecuencia | string | Frecuencia de cobro (mensual, semanal, etc.) |
| fecha_inicio | date | Fecha de inicio del pago |

📎 **Relación:** Un `Usuario` tiene **una única** `Nómina` (1:1)

---

## 🔗 Relaciones generales



![Diagrama ER](Diagrama%20sin%20título.jpg)
