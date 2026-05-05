# Sistema de Actualización de Rentabilidad de Inversiones

## 🎯 Funcionamiento

El sistema actualiza automáticamente la rentabilidad de tus inversiones de forma **simple y eficiente**:

### ✅ Actualización Automática al Iniciar Sesión

- Cuando inicias sesión, el sistema espera 2 segundos después de cargar las inversiones
- Actualiza **todas las inversiones activas en paralelo** (rápido y eficiente)
- Calcula la rentabilidad comparando el precio inicial con el precio actual
- Guarda los resultados en la base de datos

### 🔄 Actualización Manual

- Botón "Actualizar" en la página de inversiones
- Icono de refresh que gira mientras actualiza
- Muestra la hora de la última actualización al pasar el ratón

## 🧪 Modo MOCK vs API Real

### Modo MOCK (Actual - Recomendado para desarrollo)

**Archivo**: `frontend/project-final-daw/src/app/context/InversionContext.js`
**Línea**: 277

```javascript
const USE_MOCK_DATA = true; // ✅ ACTIVADO
```

**Ventajas**:

- ✅ No consume llamadas a la API (gratis)
- ✅ Genera precios realistas y consistentes
- ✅ Variaciones pequeñas (-2% a +2%) como en el mercado real
- ✅ Mismo símbolo = mismo precio base
- ✅ Cambios graduales cada 30 segundos

**Cómo funciona**:

- Genera un precio base según el símbolo (ej: AAPL = 165.00)
- Añade variaciones pequeñas basadas en el tiempo
- Simula delay de red (500ms)

### API Real (Alpha Vantage)

**Para activar**: Cambia `USE_MOCK_DATA` a `false`

```javascript
const USE_MOCK_DATA = false; // ❌ DESACTIVADO - Usa API real
```

**Requisitos**:

1. API Key de Alpha Vantage en `.env.local`:
    ```
    NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE=tu_api_key_aqui
    ```
2. Límites de la API gratuita: 5 llamadas/minuto, 500 llamadas/día

**Ventajas**:

- ✅ Precios reales del mercado
- ✅ Datos actualizados en tiempo real

**Desventajas**:

- ❌ Límite de llamadas (se puede agotar rápido)
- ❌ Requiere API Key válida
- ❌ Puede fallar si se excede el límite

## 📊 Cómo se Calcula la Rentabilidad

```javascript
rentabilidad = ((precio_actual - precio_inicial) / precio_inicial) * 100;
```

**Ejemplo**:

- Precio inicial: 100€
- Precio actual: 110€
- Rentabilidad: ((110 - 100) / 100) \* 100 = **10%**

## 🔧 Estructura de Datos

### Modelo de Inversión (Backend)

```javascript
{
  user_id: ObjectId,
  symbol: "AAPL",              // Símbolo del activo
  name: "Apple Inc.",          // Nombre del activo
  type: "stock",               // Tipo de inversión
  amount: 1000,                // Cantidad invertida
  inversion_date: Date,        // Fecha de compra
  initial_price: 150.00,       // Precio al que compraste
  target_profitability: 20,    // Rentabilidad objetivo (%)
  real_profitability: 15.5,    // Rentabilidad actual (%)
  total: 1155,                 // Valor actual total
  status: "active",            // active | closed
  closing_date: Date,          // Fecha de cierre (si cerrada)
  closing_price: 165.00,       // Precio al cerrar
  final_profit_loss: 155,      // Ganancia/Pérdida final
  final_value: 1155            // Valor final
}
```

## 🚀 Flujo de Actualización

### Al Crear una Inversión

1. **Usuario selecciona un stock** → Se busca automáticamente en Alpha Vantage
2. **Se obtiene el precio actual** → Se guarda como `initial_price`
3. **Se muestra en el formulario** → Usuario puede modificarlo si es necesario
4. **Se guarda la inversión** → Con el precio de compra registrado

### Al Iniciar Sesión

1. **Usuario inicia sesión** → Se cargan las inversiones
2. **Espera 2 segundos** → Para no saturar
3. **Filtra inversiones activas** → Solo las que tienen `symbol` e `initial_price`
4. **Actualiza en paralelo** → Todas a la vez (rápido)
5. **Calcula rentabilidad** → Compara precio actual vs inicial
6. **Guarda en BD** → Actualiza `real_profitability`
7. **Actualiza UI** → Sin recargar página

## 💡 Recomendaciones

### Para Desarrollo

- ✅ Usa **MOCK** para no gastar llamadas a la API
- ✅ Los precios simulados son suficientemente realistas
- ✅ Puedes probar sin límites

### Para Producción

- ⚠️ Considera usar API real solo para inversiones reales
- ⚠️ Implementa caché de precios (ya incluido en el código)
- ⚠️ Monitorea el uso de la API para no exceder límites

### Optimizaciones Incluidas

- ✅ Actualización en paralelo (Promise.all)
- ✅ Actualización solo al iniciar sesión (no continua)
- ✅ Actualización manual bajo demanda
- ✅ Estado de carga visible
- ✅ Timestamp de última actualización
- ✅ Sin loops infinitos (usa refs)

## 🐛 Solución de Problemas

### "No hay inversiones activas para actualizar"

- **Causa**: Las inversiones no tienen `initial_price` guardado
- **Solución**:
    1. Al crear una nueva inversión, asegúrate de seleccionar un stock del buscador
    2. El precio se obtendrá automáticamente y aparecerá en el formulario
    3. Si tienes inversiones antiguas sin precio, edítalas y añade el precio manualmente

### "No se actualizan las inversiones"

- Verifica que las inversiones tengan `symbol` e `initial_price`
- Revisa la consola del navegador para logs
- Comprueba que el estado sea "active"

### "Error de API"

- Si usas API real, verifica la API Key
- Comprueba que no hayas excedido el límite
- Cambia a modo MOCK temporalmente

### "Precios inconsistentes en MOCK"

- Es normal, los precios varían cada 30 segundos
- El mismo símbolo siempre tiene el mismo precio base
- Las variaciones son pequeñas (-2% a +2%)

## 📝 Logs de Consola

El sistema incluye logs detallados:

```
🚀 Iniciando actualización de rentabilidad al iniciar sesión
🔄 Actualizando rentabilidad de 3 inversiones activas...
✅ AAPL actualizado
✅ GOOGL actualizado
✅ MSFT actualizado
✅ Todas las inversiones actualizadas correctamente
```

## 🔐 Seguridad

- ✅ Solo actualiza inversiones del usuario autenticado
- ✅ Validación de sesión en cada petición
- ✅ API Key nunca se expone en el frontend (solo en logs de desarrollo)
- ✅ Actualización silenciosa sin bloquear la UI
