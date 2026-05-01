# 📊 Sistema de Inversiones - Guía de Uso

## 🎯 Estado Actual: MODO DEMO ACTIVADO

El sistema está configurado en **modo simulación** para mostrar datos realistas sin consumir la API de Alpha Vantage.

### ✅ Características Activas

- **Actualización automática**: Cada 30 segundos
- **Datos simulados realistas**: Variaciones de precio de -2% a +2%
- **Sin consumo de API**: No gasta llamadas a Alpha Vantage
- **Perfecto para demo y desarrollo**

---

## 🔧 Cómo Funciona

### Modo Mock (Actual)
```javascript
// Archivo: src/app/context/InversionContext.js línea 277
const USE_MOCK_DATA = true; // ✅ ACTIVADO
```

**Ventajas:**
- ✅ No consume API (gratis)
- ✅ Actualización automática cada 30 segundos
- ✅ Datos consistentes y realistas
- ✅ Ideal para demos y desarrollo

**Cómo funciona:**
1. Genera un precio base único por símbolo (ej: AAPL siempre empieza en ~165)
2. Aplica variaciones pequeñas (-2% a +2%) basadas en el tiempo
3. Los precios cambian gradualmente cada 30 segundos
4. Muestra ganancias/pérdidas realistas

---

## 🔄 Cambiar a Modo Real (API Alpha Vantage)

Si quieres usar datos reales de mercado:

### Paso 1: Configurar API Key
```bash
# Archivo: .env.local
NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE=tu_api_key_aqui
```

### Paso 2: Desactivar Mock
```javascript
// Archivo: src/app/context/InversionContext.js línea 277
const USE_MOCK_DATA = false; // ❌ DESACTIVADO
```

### Paso 3: Reiniciar servidor
```bash
npm run dev
```

**⚠️ Limitaciones API Real:**
- Alpha Vantage gratis: 5 llamadas/minuto, 500/día
- Con actualización automática cada 30 seg: ~2 llamadas/minuto
- Suficiente para 5-10 inversiones activas

---

## 📈 Cómo Usar el Sistema

### 1. Crear una Inversión
- Ve a "Inversiones" → "Añadir Inversión"
- Selecciona un símbolo (ej: AAPL, GOOGL, TSLA)
- Introduce el monto y rentabilidad objetivo
- **Importante**: Introduce el precio inicial manualmente

### 2. Ver Actualizaciones
- Los precios se actualizan automáticamente cada 30 segundos
- Verás el indicador "Actualizando..." en la tarjeta de rentabilidad
- La hora de última actualización aparece debajo

### 3. Cerrar Inversión
- Click en "Cerrar Inversión" en la tabla
- El sistema calcula automáticamente:
  - Ganancia/Pérdida final
  - Valor total recuperado
  - Devuelve el capital al presupuesto disponible

### 4. Ver Historial
- Todas las inversiones cerradas aparecen en "Historial"
- Incluye resumen fiscal (ganancias, pérdidas, neto)
- Exportable a CSV/PDF para declaración de impuestos

---

## 🎨 Características Visuales

### Banner de Modo Demo
Cuando hay inversiones activas, aparece un banner azul/morado indicando:
- 🧪 Modo Demo Activo
- Actualización automática cada 30 segundos

### Indicadores en Tiempo Real
- 🔄 "Actualizando..." cuando está obteniendo precios
- ⏰ Hora de última actualización
- 📊 Gráficos de distribución y evolución
- 🎯 Alertas de rendimiento

---

## 💡 Consejos de Uso

### Para Demo/Presentación
✅ **Mantén el modo mock activado**
- Datos siempre disponibles
- Sin errores de API
- Actualizaciones fluidas

### Para Producción Real
1. Consigue API Key de Alpha Vantage (gratis en alphavantage.co)
2. Configura `.env.local`
3. Cambia `USE_MOCK_DATA = false`
4. Considera aumentar el intervalo de actualización a 60-120 segundos

---

## 🐛 Solución de Problemas

### "Los datos no se actualizan"
- ✅ Verifica que hay inversiones con `symbol` e `initial_price`
- ✅ Espera 10 segundos tras crear una inversión
- ✅ Revisa la consola del navegador para logs

### "Aparece 0.00 en beneficios"
- ✅ Asegúrate de introducir el precio inicial al crear la inversión
- ✅ Verifica que el símbolo es válido (ej: AAPL, no Apple)
- ✅ Espera la primera actualización (10 segundos)

### "Error de API en modo real"
- ✅ Verifica la API Key en `.env.local`
- ✅ Comprueba límites de llamadas (5/min, 500/día)
- ✅ Usa símbolos válidos de NYSE/NASDAQ

---

## 📊 Datos de Ejemplo

### Símbolos Recomendados para Pruebas
- **AAPL** - Apple Inc.
- **GOOGL** - Alphabet Inc.
- **MSFT** - Microsoft
- **TSLA** - Tesla
- **AMZN** - Amazon
- **META** - Meta Platforms
- **NVDA** - NVIDIA

### Escenario de Prueba Completo
1. Crea inversión: AAPL, €1000, precio inicial 180
2. Espera 30 segundos → verás cambios de precio
3. Crea inversión: GOOGL, €500, precio inicial 140
4. Observa cómo se actualizan alternadamente
5. Cierra AAPL después de 2-3 minutos
6. Verifica que el capital vuelve al presupuesto

---

## 🔐 Seguridad

- ✅ API Key solo en variables de entorno
- ✅ No se expone en el código frontend
- ✅ Datos de inversión protegidos por autenticación
- ✅ Modo mock no hace llamadas externas

---

## 📝 Notas Técnicas

### Algoritmo de Actualización
```javascript
// Actualiza 1 inversión cada 30 segundos
// Si tienes 5 inversiones: cada una se actualiza cada 2.5 minutos
// Esto respeta los límites de API (2 llamadas/minuto)
```

### Generación de Precios Mock
```javascript
// Precio base: 100 + código ASCII del símbolo * 2
// Variación: -2% a +2% basada en timestamp
// Cambia cada 30 segundos de forma suave
```

---

## 🚀 Próximas Mejoras Sugeridas

1. **Botón manual de actualización** - Para forzar refresh
2. **Gráfico de precio histórico** - Ver evolución del precio
3. **Notificaciones push** - Alertas de objetivos alcanzados
4. **Comparación con índices** - S&P 500, NASDAQ
5. **Modo offline** - Guardar últimos precios en localStorage

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Busca logs con emoji 🧪, 🔄, ✅, ❌
3. Verifica el estado en InversionContext.js

**Archivo principal**: `src/app/context/InversionContext.js`
**Componente visual**: `src/app/[locale]/dashboard/inversion/components/InversionSummary.jsx`
