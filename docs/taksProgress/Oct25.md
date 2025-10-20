# 📅 Plan de Desarrollo — App de Gestión Financiera

---

## 🔹 Octubre 2025 — Definición del proyecto y análisis funcional

🎯 _Meta:_ Tener totalmente definida la idea, funcionalidades y flujo de usuario.

**Tareas:**

-   [x] Definir usuario objetivo y problema que resuelve la app.
-   [x] Crear lista de funcionalidades (`must-have`, `should-have`, `nice-to-have`).
-   [ ] Redactar historias de usuario.
-   [ ] Esquematizar flujo de uso básico (desde login hasta dashboard).
-   [ ] Documentar esta información en `docs/guia.md`.

🧩 **Resultado esperado:** visión funcional clara y documentada.

---

---

**📋 Tarea 1 - Definir usuario objetivo y problema que resuelve la app**

-   Persona sin conocimientos económicos o conocimientos económicos bajos.
-   La única intención de la App es acompañar a gente sin este tipo de conocimientos
    a llevar un buen control de sus ingresos y gastos.

---

---

**📋 Tarea 2 - Crear lista de funcionalidades (`must-have`, `should-have`, `nice-to-have`)**

# ⚙️ Funcionalidades de la App de Gestión Financiera

La aplicación permitirá a los usuarios gestionar su dinero de forma sencilla, asignando automáticamente su nómina a diferentes partidas (ahorro, gastos fijos, ocio e inversión).  
El siguiente listado clasifica las funcionalidades según su prioridad y relevancia para el proyecto.

---

## 🧩 Must-have (Imprescindibles)

> Funcionalidades básicas sin las cuales la app no cumple su objetivo principal.

- [ ] **Autenticación de usuarios:** registro, inicio y cierre de sesión.  
- [ ] **Gestión de ingresos y gastos:** crear, editar y eliminar movimientos.  
- [ ] **Clasificación por categorías:** alimentación, vivienda, transporte, ocio, etc.  
- [ ] **Cálculo de balance mensual:** ingresos totales – gastos totales.  
- [ ] **Asignación de gastos fijos:** alquiler, luz, internet, etc.  
- [ ] **Dashboard resumen:** visualización de cuánto se ha gastado y cuánto queda disponible.  
- [ ] **Persistencia en base de datos (MongoDB):** almacenar usuarios, gastos, ingresos y categorías.  

🧩 *Resultado esperado:* una app completamente funcional y utilizable por un usuario desde el registro hasta la consulta de su balance.

---

## 🚀 Should-have (Importantes, pero no críticas)

> Funcionalidades que mejoran notablemente la experiencia del usuario y el valor educativo del producto.

- [ ] **Distribución automática de nómina:** repartir los ingresos entre ahorro, inversión, ocio y gastos fijos según porcentajes configurables.  
- [ ] **Dashboard con gráficas:** visualización mediante gráficos de barras o circulares.  
- [ ] **Historial y filtros avanzados:** ver gastos por mes, categoría o rango de fechas.  
- [ ] **Configuración de objetivos financieros:** establecer metas de ahorro mensual o anual.  
- [ ] **Validaciones y alertas:** advertencias si se superan los límites de gasto por categoría.  
- [ ] **Configuración personalizada de porcentajes:** el usuario puede definir cómo repartir su nómina (ahorro, inversión, ocio, gastos fijos), siempre sumando el 100%.


🧩 *Resultado esperado:* app más visual, educativa y personalizada.

---

## 🌟 Nice-to-have (Extras o futuras mejoras)

> Funcionalidades complementarias o ideas de expansión para el futuro.

- [ ] **Exportación de datos:** descargar informes en PDF o Excel.  
- [ ] **Modo educativo o consejos financieros personalizados.**  
- [ ] **Integración con APIs bancarias (Open Banking).**  
- [ ] **Asistente inteligente o chatbot financiero.**  
- [ ] **Aplicación móvil o PWA offline.**  
- [ ] **Múltiples monedas o cuentas.**
- [ ] **Simulador de rentabilidad de inversión:** cálculo proyectado de crecimiento del dinero invertido con tasas estándar (5%, 10%, 15%, 20%) y visualización en gráfica.


🧩 *Resultado esperado:* demostrar visión de producto y posibilidad de crecimiento.

---

## 📅 Nota de desarrollo
> Esta lista puede actualizarse durante el desarrollo a medida que evolucione el alcance o las prioridades del proyecto.


---