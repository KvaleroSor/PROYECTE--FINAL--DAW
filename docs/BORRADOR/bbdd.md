# 📘 Modelo de Base de Datos

## 🧩 Entidades principales

---

### 🧑‍💻 Usuario
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador único del usuario |
| name | string | Nombre del usuario |
| email | string | Correo electrónico |
| password_hash | string | Hash de la contraseña |
| register_date | date | Fecha de registro |

📎 **Relaciones:**  
- Un `Usuario` puede tener **muchos** `Gastos` (1:N)  
- Un `Usuario` puede tener **muchas** `Inversiones` (1:N)  
- Un `Usuario` tiene **una única** `Configuración de Porcentajes` (1:1)  
- Un `Usuario` tiene **una única** `Nómina` (1:1)

---

### 💳 Gasto (Spending)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador único del gasto |
| usuario_id | integer (FK → User.id) | Usuario al que pertenece |
| categories | array (FK → Category.id) | Lista de categorías asociadas al gasto |
| description | string | Descripción opcional del gasto |
| amount | number | Importe gastado |
| date | date | Fecha del gasto |
| payment_type | string | Tipo de pago (efectivo, tarjeta, etc.) |

📎 **Relaciones:**  
- Un `Usuario` puede tener **muchos** `Gastos` (1:N)  
- Un `Gasto` puede pertenecer a **una o varias Categorías**,  
  y una `Categoría` puede estar asociada a **muchos Gastos** (N:M)

---

### 🏷️ Categoría (Category)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador único de la categoría |
| name | string | Nombre de la categoría (ej. "Supermercado", "Transporte") |
| color | string | (Opcional) Color representativo para gráficos |
| icon | string | (Opcional) Ícono o emoji representativo |

📎 **Relación:**  
Una `Categoría` puede estar asociada a **muchos Gastos**,  
y un `Gasto` puede pertenecer a **una o varias Categorías** (N:M)

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

📎 **Relación:**  
Un `Usuario` puede tener **muchas** `Inversiones` (1:N)

---

### ⚙️ Configuración de Porcentajes (Percentage_settings)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| usuario_id | integer (PK, FK → User.id) | Usuario al que pertenece |
| gasto | number | Porcentaje destinado a gasto |
| ahorro | number | Porcentaje destinado a ahorro |
| inversion | number | Porcentaje destinado a inversión |
| ocio | number | Porcentaje destinado a ocio |

📎 **Relación:**  
Un `Usuario` tiene **una única** configuración de porcentajes (1:1)

---

### 💼 Nómina (Nomina)
| Campo | Tipo | Descripción |
|-------|------|--------------|
| id | integer (PK) | Identificador de la nómina |
| usuario_id | integer (FK → User.id) | Usuario asociado |
| cantidad | number | Importe de la nómina |
| frecuencia | string | Frecuencia de cobro (mensual, semanal, etc.) |
| fecha_inicio | date | Fecha de inicio del pago |

📎 **Relación:**  
Un `Usuario` tiene **una única** `Nómina` (1:1)
