# Revisión de Tareas - Correcciones Pendientes

## Estado: En progreso

---

## 1. CardsMainCategories - Cálculo de Ahorro Incorrecto

**Archivo:** `frontend/project-final-daw/src/app/[locale]/dashboard/components/CardsMainCategories.jsx`

**Problema:**
- El componente no muestra correctamente el valor del ahorro.
- Existe una categoría "IMPREVISTOS" que acumula 473€ este mes.
- Según la nómina configurada, el ahorro debería ser ~327€ (ahorro - imprevistos).
- Actualmente muestra 674.36€ en ahorro (valor incorrecto).

**Comportamiento esperado:**
- Los imprevistos deben descontarse del ahorro.
- Fórmula: `Ahorro Real = Ahorro Calculado - Gastos Imprevistos`

**Estado:** [ ] Pendiente

---

## 2. Categorías - Verificar Funcionamiento

**Problema:**
- Verificar que las categorías funcionen correctamente.
- Comprobar creación, edición y eliminación.
- Verificar cálculos de presupuesto por categoría.

**Estado:** [ ] Pendiente

---

## 3. Metas de Ahorro (Savings Goals) - Lógica Incorrecta

**Archivos relacionados:**
- `frontend/project-final-daw/src/app/context/SavingContext.js`
- `frontend/project-final-daw/src/app/hooks/saving/useSavingsRealTime.js`

**Problemas:**
- El ahorro va aumentando continuamente cuando debería calcularse mensualmente.
- Muestra más ahorro del posible según la nómina y porcentajes configurados.
- La lógica de contribuciones mensuales no funciona correctamente.
- El cálculo de `isTotalContributedAllTime` se acumula de forma incorrecta.

**Comportamiento esperado:**
- Las contribuciones a metas deben procesarse una vez al mes.
- El ahorro mostrado debe ser coherente con: (% ahorro × nómina) - imprevistos.
- Resetear/recalcular correctamente cada mes.

**Requiere:** Revisión completa y rediseño de la lógica de metas de ahorro.

**Estado:** [ ] Pendiente

---

## 4. CardsMainCategories - Separar Gasto Fijo y Ocio

**Archivo:** `frontend/project-final-daw/src/app/[locale]/dashboard/components/CardsMainCategories.jsx`

**Situación actual:**
- Gasto Fijo y Gasto Ocio se muestran combinados en una sola card ("Disponible Fijo/Ocio").

**Mejora propuesta:**
- Separar en dos cards independientes:
  - **Card Gasto Fijo**: Presupuesto y disponible para gastos fijos (alquiler, facturas, seguros).
  - **Card Gasto Ocio**: Presupuesto y disponible para ocio (restaurantes, entretenimiento).
- Esto da mejor visibilidad del estado de cada tipo de gasto.

**Tipo:** Mejora / Tarea pendiente

**Estado:** [ ] Pendiente

---

## 5. Pestañas Sin Desarrollar - Dar Funcionalidad

**Problema:**
- Existen pestañas/secciones en la aplicación que actualmente no tienen funcionalidad implementada.

**Tareas:**
- [ ] Identificar todas las pestañas sin funcionalidad
- [ ] Definir requisitos de cada una
- [ ] Implementar lógica y UI

**Estado:** [ ] Pendiente

---

## 6. Responsive Design - Adaptación a Dispositivos

**Problema:**
- La aplicación necesita ser completamente responsive para diferentes tamaños de pantalla.

**Dispositivos objetivo:**
- [ ] **Móvil** (320px - 480px)
- [ ] **Tablet** (481px - 768px)
- [ ] **Laptop** (769px - 1024px)
- [ ] **Desktop** (1025px - 1200px)
- [ ] **Desktop grande** (1201px+)

**Áreas a revisar:**
- Sidebar (colapsable en móvil)
- Cards del dashboard
- Formularios
- Tablas y listados
- Gráficos
- Header y navegación

**Estado:** [ ] Pendiente

---

## 7. PWA (Progressive Web App)

**Objetivo:**
- Convertir la aplicación en una PWA para ofrecer experiencia nativa.

**Características a implementar:**
- [ ] **Manifest.json** - Configuración de la app (nombre, iconos, colores)
- [ ] **Service Worker** - Cache y funcionamiento offline
- [ ] **Iconos** - Diferentes tamaños para instalación
- [ ] **Instalabilidad** - Prompt de instalación en dispositivos
- [ ] **Offline support** - Funcionalidad básica sin conexión
- [ ] **Push notifications** (opcional/futuro)

**Beneficios:**
- Instalable en dispositivos móviles y desktop
- Acceso rápido desde pantalla de inicio
- Mejor rendimiento con cache
- Experiencia similar a app nativa

**Estado:** [ ] Pendiente

---

## 8. GraphicPercentatgeSpend - Completar Componente

**Archivo:** `frontend/project-final-daw/src/app/[locale]/dashboard/components/GraphicPercentatgeSpend.jsx`

**Problemas:**
- La parte inferior del componente queda muy vacía.
- El tamaño de la nómina necesita ajustes visuales.
- La sección de "suposición" necesita modificaciones.

**Tareas:**
- [ ] Rellenar/diseñar la parte inferior del componente
- [ ] Ajustar tamaño y estilo de la nómina
- [ ] Revisar y mejorar la sección de suposición
- [ ] Mejorar distribución visual general

**Tipo:** Mejora UI

**Estado:** [ ] Pendiente

---

## 9. Reorganizar Cards Dashboard - Ocio en lugar de Inversión

**Archivo:** `frontend/project-final-daw/src/app/[locale]/dashboard/components/CardsMainCategories.jsx`

**Cambio propuesto:**
- Sustituir la card de "Inversión" por una card de "Gasto Ocio"
- El ocio es más relevante en el día a día que la inversión

**Cards resultantes:**
1. Ahorro (total acumulado)
2. Gastado (este mes)
3. Disponible Gasto Fijo
4. Disponible Gasto Ocio ← Nueva (reemplaza Inversión)

**Estado:** [ ] Pendiente

---

## 10. Componente de Inversión - Nuevo Widget

**Ubicación propuesta:** Debajo de las categorías en el dashboard

**Funcionalidades:**
- [ ] Mostrar disponible para invertir (según % configurado)
- [ ] Mostrar total invertido
- [ ] Lista de inversiones del usuario
- [ ] Widget con cotizaciones en tiempo real (API externa)

**API de bolsa (opciones gratuitas):**
- **Finnhub** - 60 requests/min (acciones, forex, noticias)
- **Twelve Data** - 800 requests/día (acciones, forex, cripto)
- **CoinGecko** - 10-50 requests/min (solo criptomonedas)

**Requisitos:**
- Seguir la estructura y diseño del proyecto existente
- Componentes con estilo consistente (Tailwind, dark mode)
- Integración con el contexto de inversión existente

**Estado:** [ ] Pendiente

---

## Notas Adicionales

- Se añadirán más tareas según se identifiquen.
- El ahorro acumulado (histórico + mes actual) es comportamiento deseado, verificar que no duplique contribuciones.
