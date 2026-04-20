# 🔧 Troubleshooting: Alpha Vantage API

## ⚠️ Problema: "No se encontró precio para [SÍMBOLO]"

### Causas Comunes

#### 1. **API Key no configurada o inválida**

**Síntomas:**

```
❌ API Key de Alpha Vantage no configurada
```

**Solución:**

1. Verifica que existe el archivo `.env.local` en la raíz del proyecto frontend
2. Debe contener:
    ```env
    NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE=tu_api_key_aqui
    ```
3. Obtén una API Key gratuita en: https://www.alphavantage.co/support/#api-key
4. **Reinicia el servidor** después de añadir/modificar el `.env.local`

**Verificar en consola:**

```javascript
// En la consola del navegador
console.log(process.env.NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE);
// Debe mostrar tu API key, no undefined
```

---

#### 2. **Límite de API alcanzado**

**Síntomas:**

```
⚠️ Límite de API alcanzado: Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute...
```

**O también:**

```
📦 Respuesta de Alpha Vantage: {Information: 'We have detected your API key... our standard API rate limit is 25 requests per day'}
```

**Límites de Alpha Vantage (Free Tier):**

- **5 llamadas/minuto**
- **25 llamadas/día** (algunas API keys)
- **500 llamadas/día** (otras API keys)

**Solución:**

1. **Esperar 1 minuto** antes de intentar de nuevo
2. Reducir frecuencia de actualización en `InversionContext.js`:
    ```javascript
    // Cambiar de 30 segundos a 60 segundos
    const interval = setInterval(updateNextInvestment, 60000);
    ```
3. Si tienes muchas inversiones, considera:
    - Actualizar solo inversiones activas
    - Implementar sistema de prioridad
    - Actualizar solo en horario de mercado

**Verificar uso de API:**

- Revisa los logs de consola para contar llamadas
- Cada inversión activa hace 1 llamada cada 30 segundos
- Con 3 inversiones = 6 llamadas/minuto (excede límite)

---

#### 3. **Símbolo inválido o no existe**

**Síntomas:**

```
⚠️ No se encontró precio para AAPL. Respuesta vacía o símbolo inválido.
💡 Verifica que el símbolo sea correcto y esté listado en Alpha Vantage
```

**Causas:**

- Símbolo mal escrito (ej: `APPL` en vez de `AAPL`)
- Símbolo no listado en mercados US
- Empresa ya no cotiza en bolsa
- Símbolo es de otro mercado (ej: LSE, TSX)

**Solución:**

1. Verifica el símbolo en: https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=APPLE&apikey=demo
2. Usa solo símbolos de **NYSE** o **NASDAQ**
3. Ejemplos válidos:
    - ✅ `AAPL` (Apple)
    - ✅ `MSFT` (Microsoft)
    - ✅ `GOOGL` (Alphabet)
    - ✅ `TSLA` (Tesla)
    - ✅ `AMZN` (Amazon)
    - ❌ `AAPL.L` (Apple en London Stock Exchange)
    - ❌ `AAPL.TO` (Apple en Toronto Stock Exchange)

---

#### 4. **Mercado cerrado (sin datos recientes)**

**Síntomas:**

- La API devuelve datos pero son del día anterior
- Precio no cambia durante horas

**Horarios de mercado US:**

- **NYSE/NASDAQ**: 9:30 AM - 4:00 PM EST (lunes a viernes)
- **Pre-market**: 4:00 AM - 9:30 AM EST
- **After-hours**: 4:00 PM - 8:00 PM EST

**Nota:** Alpha Vantage Free Tier puede tener **delay de 15 minutos** en los datos.

---

#### 5. **Problemas de red o CORS**

**Síntomas:**

```
❌ HTTP Error: 403 Forbidden
❌ Error: Failed to fetch
```

**Solución:**

1. Verifica conexión a internet
2. Comprueba que no hay firewall bloqueando `alphavantage.co`
3. Si estás en desarrollo local, asegúrate de usar `http://localhost:3000` (no IP)

---

## 🔍 Debugging Paso a Paso

### 1. Verificar API Key

Abre la consola del navegador y ejecuta:

```javascript
// Debe mostrar tu API key
console.log(process.env.NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE);
```

Si muestra `undefined`:

- ❌ El archivo `.env.local` no existe o está mal configurado
- ❌ No reiniciaste el servidor después de crear/modificar `.env.local`

### 2. Probar API manualmente

Abre esta URL en tu navegador (reemplaza `YOUR_API_KEY`):

```
https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_API_KEY
```

**Respuesta esperada (exitosa):**

```json
{
  "Global Quote": {
    "01. symbol": "AAPL",
    "05. price": "178.50",
    "09. change": "2.30",
    "10. change percent": "1.31%",
    ...
  }
}
```

**Respuesta de error (límite alcanzado):**

```json
{
    "Note": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute..."
}
```

**Respuesta de error (API key inválida):**

```json
{
    "Error Message": "Invalid API call..."
}
```

### 3. Revisar logs mejorados

Con la actualización implementada, ahora verás logs detallados:

```
🔄 Obteniendo precio de AAPL...
📡 Llamando a Alpha Vantage para AAPL...
📦 Respuesta de Alpha Vantage para AAPL: { ... }
✅ Precio obtenido para AAPL: $178.50
```

O en caso de error:

```
🔄 Obteniendo precio de AAPL...
📡 Llamando a Alpha Vantage para AAPL...
📦 Respuesta de Alpha Vantage para AAPL: { "Note": "..." }
⚠️ Límite de API alcanzado: Thank you for using Alpha Vantage!...
```

---

## ⚙️ Configuración Recomendada

### Para desarrollo (muchas pruebas):

```javascript
// InversionContext.js - líneas 486-492

// Actualización MUY conservadora
const initialTimeout = setTimeout(() => {
    updateNextInvestment();
}, 30000); // 30 segundos

const interval = setInterval(updateNextInvestment, 120000); // 2 minutos
```

**Llamadas/minuto:** 0.5 (muy por debajo del límite)

### Para producción (uso normal):

```javascript
// Actualización moderada
const initialTimeout = setTimeout(() => {
    updateNextInvestment();
}, 10000); // 10 segundos

const interval = setInterval(updateNextInvestment, 60000); // 1 minuto
```

**Llamadas/minuto:** 1 (seguro)

---

## 🚀 Alternativas a Alpha Vantage

Si sigues teniendo problemas o necesitas más llamadas:

### 1. **Finnhub** (Gratuito)

- **Límite:** 60 llamadas/minuto
- **Registro:** https://finnhub.io/
- **Ventaja:** Más generoso con límites

### 2. **IEX Cloud** (Freemium)

- **Límite:** 50,000 llamadas/mes (gratis)
- **Registro:** https://iexcloud.io/
- **Ventaja:** Datos en tiempo real

### 3. **Yahoo Finance API** (No oficial)

- **Límite:** Sin límite oficial
- **Ventaja:** Gratis, sin API key
- **Desventaja:** No oficial, puede cambiar

### 4. **Alpha Vantage Premium**

- **Precio:** Desde $49.99/mes
- **Límite:** 75 llamadas/minuto
- **Ventaja:** Datos en tiempo real, más confiable

---

## 📋 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] ✅ Archivo `.env.local` existe y tiene `NEXT_PUBLIC_API_KEY_ALPHA_VANTAGE`
- [ ] ✅ Servidor reiniciado después de crear/modificar `.env.local`
- [ ] ✅ API Key válida (probada manualmente en navegador)
- [ ] ✅ Símbolo correcto (verificado en Alpha Vantage)
- [ ] ✅ No se ha excedido límite de 5 llamadas/minuto
- [ ] ✅ Logs de consola revisados para ver respuesta de API
- [ ] ✅ Conexión a internet funcionando
- [ ] ✅ Horario de mercado (si esperas datos en tiempo real)

## 🔧 Solución Temporal: Datos Mock

Si has agotado tu límite diario o necesitas desarrollar sin consumir API:

### Activar Modo Mock

En `InversionContext.js`, línea 274, cambia:

```javascript
const USE_MOCK_DATA = true; // ✅ Activado (no consume API)
```

Para desactivar y usar API real:

```javascript
const USE_MOCK_DATA = false; // ❌ Desactivado (usa API real)
```

### Características del Modo Mock

- ✅ **No consume llamadas de API**
- ✅ **Genera precios realistas** basados en el símbolo
- ✅ **Simula delay de red** (500ms)
- ✅ **Precios consistentes** para el mismo símbolo
- ✅ **Variación aleatoria** en cada actualización
- ✅ **Logs claros** con emoji 🧪

### Ejemplo de uso

```javascript
🧪 MODO MOCK: Generando precio simulado para AAPL
📊 AAPL: Precio inicial: $150.00, Precio actual: $152.34, Rentabilidad: 1.56%
✅ Rentabilidad actualizada para AAPL: 1.56%
```

---

## 📞 Soporte

- **Documentación Alpha Vantage:** https://www.alphavantage.co/documentation/
- **Soporte Alpha Vantage:** https://www.alphavantage.co/support/
- **Status de API:** Verificar en https://status.alphavantage.co/ (si existe)

---

**Última actualización:** Abril 2026  
**Versión:** 1.0
