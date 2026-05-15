# 🧪 Testing - Balance.app

## Estrategia de Testing

Este proyecto implementa una estrategia de testing completa con diferentes niveles:

### 📊 Cobertura de Tests

- **Tests Unitarios**: 22 tests
- **Tests de Integración**: 4 tests  
- **Tests E2E**: 7 tests
- **Total**: 29 tests

---

## 🛠️ Herramientas Utilizadas

| Herramienta | Propósito |
|-------------|-----------|
| **Vitest** | Framework de testing (más rápido que Jest) |
| **React Testing Library** | Testing de componentes React |
| **Playwright** | Tests End-to-End |
| **@vitest/ui** | Interfaz visual para tests |

---

## 🚀 Comandos Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ver tests en UI interactiva
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar tests E2E
npm run test:e2e

# Ver tests E2E en modo UI
npm run test:e2e:ui
```

---

## 📁 Estructura de Tests

```
src/tests/
├── setup.js                    # Configuración global
├── utils/
│   └── validation.test.js      # Tests de validaciones
├── components/
│   ├── LanguageSelector.test.jsx
│   ├── ThemeToggle.test.jsx
│   └── ConfirmationModal.test.jsx
├── services/
│   └── changePassword.test.js
└── hooks/
    └── useBlur.test.jsx

e2e/
├── login.spec.js
└── settings.spec.js
```

---

## ✅ Tipos de Tests Implementados

### 1. Tests de Utilidades
- Validación de email
- Validación de contraseña
- Cálculos financieros

### 2. Tests de Componentes
- LanguageSelector: Cambio de idioma
- ThemeToggle: Modo oscuro/claro
- ConfirmationModal: Modales de confirmación

### 3. Tests de Servicios
- changePassword: Cambio de contraseña
- Llamadas a API
- Manejo de errores

### 4. Tests de Hooks
- useBlur: Toggle de blur
- Persistencia en localStorage

### 5. Tests E2E
- Flujo de login completo
- Navegación en settings
- Cambio de idioma
- Cambio de tema

---

## 📈 Cobertura Objetivo

- **Componentes críticos**: 80%+
- **Servicios**: 70%+
- **Utilidades**: 90%+
- **Hooks**: 70%+

---

## 🎯 Próximos Tests a Implementar

- [ ] Tests de formularios (FormSpend, FormCategory)
- [ ] Tests de contextos (FinancialContext, CategoryContext)
- [ ] Tests de integración (Dashboard completo)
- [ ] Tests de performance
- [ ] Tests de accesibilidad

---

## 📚 Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
