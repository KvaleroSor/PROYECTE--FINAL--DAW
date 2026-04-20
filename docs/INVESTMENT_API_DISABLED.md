# 🚫 API de Alpha Vantage Desactivada

## 📋 Estado Actual

Todas las peticiones automáticas a la API de Alpha Vantage han sido **DESACTIVADAS** para evitar consumir el límite diario de llamadas.

## ❌ Funcionalidades Desactivadas

### 1. **Actualización automática de rentabilidad**
- **Ubicación:** `InversionContext.js` líneas 543-553
- **Estado:** ✅ Comentado
- **Motivo:** Evitar peticiones repetitivas cada 30 segundos

```javascript
// ❌ DESACTIVADO
// const initialTimeout = setTimeout(() => {
//     updateNextInvestment();
// }, 10000);
// const interval = setInterval(updateNextInvestment, 30000);
```

### 2. **Obtención automática de precio inicial**
- **Ubicación:** `InversionContext.js` líneas 82-97
- **Estado:** ✅ Comentado
- **Motivo:** Evitar petición al crear cada inversión

```javascript
// ❌ DESACTIVADO - No obtener precio automáticamente
// if (inversionData.symbol) {
//     const stockPrice = await fetchStockPrice(inversionData.symbol);
//     ...
// }
```

### 3. **Modo Mock**
- **Ubicación:** `InversionContext.js` línea 274
- **Estado:** ✅ Desactivado
- **Valor:** `const USE_MOCK_DATA = false;`

## ✅ Funcionalidades Activas

### 1. **Carga de símbolos disponibles (LISTING_STATUS)**
- **Ubicación:** `fetchInvestmentAlphaVantage()` línea 135-259
- **Estado:** ✅ ACTIVA
- **Frecuencia:** Una sola vez al cargar la aplicación
- **Caché:** 24 horas en localStorage
- **Propósito:** Mostrar lista de acciones disponibles en el selector al crear inversión

**Esta es la ÚNICA petición permitida a Alpha Vantage.**

## 🎯 Flujo Actual de Inversiones

### Crear Nueva Inversión

1. Usuario abre modal de crear inversión
2. **Se carga lista de símbolos** desde caché (o API si no hay caché)
3. Usuario selecciona símbolo del selector (ej: AAPL)
4. Usuario **introduce manualmente**:
   - Cantidad invertida
   - Precio inicial (debe buscarlo externamente)
   - Rentabilidad objetivo
5. Se crea la inversión **sin hacer petición de precio**

### Visualizar Inversiones

- Se muestran las inversiones con los datos guardados
- **NO se actualiza la rentabilidad automáticamente**
- Los valores de `real_profitability` permanecen como fueron guardados
- El usuario debe actualizar manualmente si lo desea

## 📝 Datos que el Usuario Debe Introducir Manualmente

Ahora que no se obtienen precios automáticamente, el usuario debe proporcionar:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Symbol** | Símbolo de la acción | AAPL |
| **Amount** | Cantidad invertida | 1000€ |
| **Initial Price** | Precio de compra | $178.50 |
| **Target Profitability** | Rentabilidad objetivo | 10% |

**Nota:** El usuario puede consultar precios en:
- https://finance.yahoo.com/
- https://www.google.com/finance/
- https://www.investing.com/

## 🔄 Cómo Reactivar las Funcionalidades

### Opción 1: Cuando tengas nueva API Key

1. **Actualizar `.env.local`** con nueva API Key
2. **Descomentar actualización automática** (líneas 543-553)
3. **Descomentar obtención de precio inicial** (líneas 82-95)
4. **Reiniciar servidor**

### Opción 2: Activar Modo Mock (sin consumir API)

1. **Cambiar línea 274:**
   ```javascript
   const USE_MOCK_DATA = true; // ✅ Activado
   ```
2. **Descomentar actualización automática** (líneas 543-553)
3. Los precios serán simulados pero funcionales

### Opción 3: API Premium

Si necesitas actualizaciones en tiempo real:
- **Alpha Vantage Premium:** $49.99/mes (75 llamadas/minuto)
- **Finnhub:** Gratis (60 llamadas/minuto)
- **IEX Cloud:** Gratis (50,000 llamadas/mes)

## 📊 Consumo de API Actual

| Acción | Peticiones | Estado |
|--------|-----------|--------|
| **Cargar símbolos disponibles** | 1 (cada 24h) | ✅ Activa |
| **Crear inversión** | 0 | ❌ Desactivada |
| **Actualización automática** | 0 | ❌ Desactivada |
| **Total diario** | ~1 | ✅ Muy por debajo del límite |

## 🎨 Impacto en la UI

### Lo que el usuario VE:

- ✅ Lista de símbolos disponibles al crear inversión
- ✅ Todas las inversiones creadas
- ✅ Datos estáticos (no se actualizan automáticamente)
- ❌ **NO** verá badge "Actualizando..."
- ❌ **NO** verá timestamp de última actualización
- ❌ **NO** verá cambios en rentabilidad automáticamente

### Lo que el usuario NO ve:

- ❌ Actualizaciones automáticas de precios
- ❌ Cálculo automático de rentabilidad real
- ❌ Precio inicial obtenido automáticamente

## 🔧 Actualización Manual de Rentabilidad

Si el usuario quiere actualizar la rentabilidad de una inversión:

1. **Consultar precio actual** en Yahoo Finance u otra fuente
2. **Calcular rentabilidad manualmente:**
   ```
   Rentabilidad = ((Precio Actual - Precio Inicial) / Precio Inicial) * 100
   ```
3. **Editar la inversión** y actualizar el campo `real_profitability`

**Ejemplo:**
- Precio inicial: $150.00
- Precio actual: $165.00
- Rentabilidad: ((165 - 150) / 150) * 100 = **10%**

## 📌 Notas Importantes

### ⚠️ Limitaciones Actuales

- **Sin datos en tiempo real** - Los valores no se actualizan
- **Entrada manual requerida** - El usuario debe buscar precios externamente
- **Sin validación de símbolos** - No se verifica si el símbolo existe
- **Sin alertas de rentabilidad** - No hay notificaciones automáticas

### ✅ Ventajas

- **No consume API** - Puedes desarrollar sin límites
- **Funcionalidad básica intacta** - CRUD de inversiones funciona
- **Lista de símbolos disponible** - Selector sigue funcionando
- **Datos persistentes** - Todo se guarda en base de datos

## 🚀 Próximos Pasos Sugeridos

1. **Terminar desarrollo de otras funcionalidades** sin preocuparte por la API
2. **Considerar alternativas:**
   - Finnhub (más generoso con límites)
   - Yahoo Finance API (no oficial pero sin límites)
   - Datos mock permanentes para demo
3. **Implementar actualización manual** con botón "Actualizar precio"
4. **Añadir campo de precio inicial** obligatorio en el formulario

## 📞 Referencia Rápida

### Archivos Modificados

- ✅ `InversionContext.js` - Peticiones desactivadas
- ✅ `INVESTMENT_API_DISABLED.md` - Este documento
- ✅ `ALPHA_VANTAGE_TROUBLESHOOTING.md` - Guía de troubleshooting

### Líneas Clave

- **Línea 274:** `USE_MOCK_DATA = false` (modo mock desactivado)
- **Líneas 82-97:** Precio inicial comentado
- **Líneas 543-553:** Actualización automática comentada

---

**Fecha:** Abril 2026  
**Estado:** ✅ API Desactivada - Solo carga de símbolos activa  
**Versión:** 1.0 (API-Free Mode)
