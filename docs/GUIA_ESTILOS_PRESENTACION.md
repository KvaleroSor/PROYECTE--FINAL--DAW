# 🎨 Guía de Estilos - Numoes.app

## Aplicación de Gestión Financiera Personal

**Versión:** 2.0.0  
**Última actualización:** Febrero 2026  
**Proyecto:** Numoes.app - Gestión de Gastos  
**Estilo:** Modern Minimal con Dark Mode

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Filosofía de Diseño](#filosofía-de-diseño)
3. [Sistema de Colores](#sistema-de-colores)
4. [Tipografía](#tipografía)
5. [Componentes UI](#componentes-ui)
6. [Sistema de Espaciado](#sistema-de-espaciado)
7. [Elevación y Sombras](#elevación-y-sombras)
8. [Animaciones y Transiciones](#animaciones-y-transiciones)
9. [Responsive Design](#responsive-design)
10. [Internacionalización](#internacionalización)
11. [Accesibilidad](#accesibilidad)
12. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Introducción

Numoes.app es una aplicación web moderna diseñada para ayudar a personas sin conocimientos financieros a **gestionar su dinero de forma sencilla**. El diseño se centra en la claridad, simplicidad y accesibilidad, utilizando un sistema de diseño coherente que funciona tanto en modo claro como oscuro.

### Objetivos del Diseño

- **Simplicidad**: Interfaz intuitiva sin curva de aprendizaje
- **Claridad**: Información financiera presentada de forma clara
- **Consistencia**: Patrones de diseño coherentes en toda la aplicación
- **Accesibilidad**: Diseño inclusivo para todos los usuarios
- **Modernidad**: Estética actual con tecnologías web modernas

---

## 💡 Filosofía de Diseño

### Principios Fundamentales

1. **Mobile First**: Diseñado primero para dispositivos móviles
2. **Progressive Enhancement**: Mejora progresiva de la experiencia
3. **Dark Mode Native**: Soporte nativo para tema oscuro
4. **Performance First**: Optimización de rendimiento en cada decisión
5. **User Centered**: Centrado en las necesidades del usuario

### Lenguaje Visual

- **Minimalismo**: Menos es más, enfoque en lo esencial
- **Espacios en blanco**: Uso generoso para mejorar legibilidad
- **Colores vibrantes**: Acentos de color para categorías y acciones
- **Bordes redondeados**: Suavidad en todos los elementos (12px-24px)
- **Sombras sutiles**: Elevación sutil para jerarquía visual

---

## 🎨 Sistema de Colores

### Configuración Tailwind

```javascript
// tailwind.config.js
colors: {
  background: {
    slate: "#F8FAFC",
  },
  border: {
    slate: "#E2E8F0",
  },
  cards: {
    slate: "#FFFFFF",
  },
  text: {
    slate: "#0F172A",
  },
  main: {
    indigo: "#6366F1",
    purple: "#8B5CF6",
    pink: "#EC4899",
    rose: "#F43F5E",
    emerald: "#10B981",
    sky: "#0EA5E9"
  },
}
```

### Paleta de Colores Base

#### Modo Claro (Light Mode)

| Elemento                 | Color     | Hex       | Uso                               |
| ------------------------ | --------- | --------- | --------------------------------- |
| **Background Principal** | Slate 50  | `#F8FAFC` | Fondo general de la aplicación    |
| **Background Cards**     | White     | `#FFFFFF` | Cards, modales, formularios       |
| **Bordes**               | Slate 200 | `#E2E8F0` | Separadores, bordes de inputs     |
| **Texto Principal**      | Slate 900 | `#0F172A` | Títulos, textos principales       |
| **Texto Secundario**     | Slate 600 | `#475569` | Descripciones, labels             |
| **Texto Terciario**      | Slate 400 | `#94A3B8` | Placeholders, texto deshabilitado |

#### Modo Oscuro (Dark Mode)

| Elemento                 | Color     | Hex       | Uso                               |
| ------------------------ | --------- | --------- | --------------------------------- |
| **Background Principal** | Slate 900 | `#0F172A` | Fondo general de la aplicación    |
| **Background Cards**     | Slate 800 | `#1E293B` | Cards, modales, formularios       |
| **Bordes**               | Slate 700 | `#334155` | Separadores, bordes de inputs     |
| **Texto Principal**      | Slate 100 | `#F1F5F9` | Títulos, textos principales       |
| **Texto Secundario**     | Slate 400 | `#94A3B8` | Descripciones, labels             |
| **Texto Terciario**      | Slate 500 | `#64748B` | Placeholders, texto deshabilitado |

### Colores de Acento (Categorías y Estados)

#### Colores Principales

```css
--main-indigo: #6366f1 /* Acciones principales, CTAs */ --main-purple: #8b5cf6
    /* Categorías especiales */ --main-pink: #ec4899
    /* Salud, alertas importantes */ --main-rose: #f43f5e /* Comida, errores */
    --main-emerald: #10b981 /* Transporte, éxito */ --main-sky: #0ea5e9
    /* Hogar, información */;
```

#### Uso por Contexto

| Color       | Contexto              | Ejemplo de Uso                          |
| ----------- | --------------------- | --------------------------------------- |
| **Indigo**  | Acciones principales  | Botones "Iniciar Sesión", "Guardar"     |
| **Purple**  | Categorías especiales | Mascotas, Tecnología                    |
| **Pink**    | Salud y bienestar     | Categoría Salud, Gym                    |
| **Rose**    | Alimentación          | Categoría Comida, Restaurantes          |
| **Emerald** | Transporte y éxito    | Categoría Coche, Estados exitosos       |
| **Sky**     | Hogar e información   | Categoría Despensa, Mensajes info       |
| **Yellow**  | Advertencias          | Alertas, presupuesto completo           |
| **Red**     | Errores y peligro     | Mensajes de error, exceder límites      |
| **Green**   | Éxito y confirmación  | Operaciones exitosas, metas completadas |

### Escala de Colores Extendida

Tailwind genera automáticamente escalas de 50-950 para cada color:

```tsx
// Ejemplo con Indigo
bg - indigo - 50; // #EEF2FF - Backgrounds muy claros
bg - indigo - 100; // #E0E7FF - Backgrounds hover
bg - indigo - 500; // #6366F1 - Base (main-indigo)
bg - indigo - 600; // #4F46E5 - Hover de botones
bg - indigo - 700; // #4338CA - Active de botones
bg - indigo - 900; // #312E81 - Muy oscuro
```

### Implementación en Código

```tsx
// Light Mode
<div className="bg-white text-slate-900 border-slate-200">
  Contenido en modo claro
</div>

// Dark Mode
<div className="dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
  Contenido en modo oscuro
</div>

// Colores de acento
<button className="bg-main-indigo hover:bg-indigo-600 text-white">
  Acción Principal
</button>
```

---

## 📝 Tipografía

### Fuente Principal

```css
font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
```

**Características:**

- Fuente moderna y legible
- Excelente en pantallas digitales
- Soporte completo para caracteres latinos
- Variable font weights (100-900)

### Escala Tipográfica

| Uso               | Clase Tailwind | Tamaño | Weight | Line Height | Ejemplo                     |
| ----------------- | -------------- | ------ | ------ | ----------- | --------------------------- |
| **Hero Title**    | `text-4xl`     | 36px   | 700    | 1.1         | Títulos principales landing |
| **Page Title**    | `text-3xl`     | 30px   | 700    | 1.2         | Títulos de página           |
| **Section Title** | `text-2xl`     | 24px   | 600    | 1.3         | Títulos de sección          |
| **Subsection**    | `text-xl`      | 20px   | 600    | 1.4         | Subtítulos                  |
| **Large Text**    | `text-lg`      | 18px   | 400    | 1.6         | Texto destacado             |
| **Body Text**     | `text-base`    | 16px   | 400    | 1.6         | Texto general               |
| **Small Text**    | `text-sm`      | 14px   | 400    | 1.5         | Labels, botones             |
| **Caption**       | `text-xs`      | 12px   | 400    | 1.4         | Captions, badges            |

### Pesos de Fuente (Font Weights)

```tsx
font - normal; // 400 - Texto de párrafos
font - medium; // 500 - Botones, labels destacados
font - semibold; // 600 - Subtítulos, nombres
font - bold; // 700 - Títulos principales
```

### Ejemplos de Uso

```tsx
// Título de página
<h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
  Metas de Ahorro
</h1>

// Subtítulo
<p className="text-gray-600 dark:text-slate-400">
  Gestiona tus objetivos financieros
</p>

// Texto destacado
<span className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
  €1,234.56
</span>

// Label
<label className="text-sm font-medium text-slate-700 dark:text-slate-300">
  Nombre de la Meta
</label>
```

---

## 🧩 Componentes UI

### 1. Botones

#### Primary Button

```tsx
<button
    className="
  px-6 py-3 
  bg-main-indigo hover:bg-indigo-600 active:bg-indigo-700
  text-white text-sm font-medium 
  rounded-xl 
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
"
>
    Guardar Cambios
</button>
```

**Uso:** Acciones principales (Guardar, Crear, Iniciar Sesión)

#### Secondary Button

```tsx
<button
    className="
  px-6 py-3 
  bg-white dark:bg-slate-700 
  border-2 border-slate-200 dark:border-slate-600
  hover:bg-slate-50 dark:hover:bg-slate-600
  text-slate-900 dark:text-slate-100 text-sm font-medium 
  rounded-xl 
  transition-colors duration-200
"
>
    Cancelar
</button>
```

**Uso:** Acciones secundarias (Cancelar, Volver)

#### Icon Button

```tsx
<button
    className="
  w-12 h-12 
  flex items-center justify-center 
  rounded-xl 
  hover:bg-slate-100 dark:hover:bg-slate-700 
  text-slate-600 dark:text-slate-300
  transition-colors duration-200
"
>
    <Plus className="w-5 h-5" />
</button>
```

**Uso:** Acciones con iconos, botones de menú

#### Button con Icono y Texto

```tsx
<button
    className="
  flex items-center gap-2 
  px-4 py-2 
  bg-slate-800 dark:bg-slate-600 
  hover:bg-slate-900 dark:hover:bg-slate-500
  text-white text-sm font-medium 
  rounded-xl 
  transition-all duration-300
  shadow-lg hover:shadow-xl
"
>
    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
    Crear Nueva Meta
</button>
```

**Uso:** Botones de acción destacados con iconos

### 2. Cards

#### Summary Card (Tarjeta de Resumen)

```tsx
<div
    className="
  bg-white dark:bg-slate-700 
  rounded-xl 
  p-4 sm:p-5 
  shadow-lg hover:shadow-md 
  transition-all duration-300
"
>
    <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-slate-700 dark:text-slate-300" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Progreso Total
        </p>
    </div>
    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
        75.5%
    </p>
    <p className="text-sm text-slate-500 dark:text-slate-400">
        €1,500 de €2,000
    </p>
</div>
```

**Uso:** Resúmenes de métricas, estadísticas principales

#### Content Card (Tarjeta de Contenido)

```tsx
<div
    className="
  bg-slate-50 dark:bg-slate-800 
  rounded-xl 
  p-4 
  shadow-lg hover:shadow-md 
  transition-all duration-300
"
>
    {/* Contenido de la card */}
</div>
```

**Uso:** Contenedores principales de contenido

#### Saving Goal Card (Tarjeta de Meta de Ahorro)

```tsx
<div
    className="
  bg-white dark:bg-slate-800 
  border-2 border-slate-200 dark:border-slate-700
  rounded-2xl 
  p-6 
  hover:shadow-lg 
  transition-all duration-300
"
>
    {/* Header con nombre y prioridad */}
    <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
            Viaje a Japón
        </h3>
        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-lg">
            Alta
        </span>
    </div>

    {/* Progreso */}
    <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-400">Progreso</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
                60%
            </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
            <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: "60%" }}
            ></div>
        </div>
    </div>

    {/* Montos */}
    <div className="flex justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">
            €1,200 / €2,000
        </span>
        <span className="text-slate-600 dark:text-slate-400">€200/mes</span>
    </div>
</div>
```

**Uso:** Tarjetas de metas de ahorro con progreso

### 3. Inputs y Formularios

#### Text Input

```tsx
<div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        Nombre de la Meta
    </label>
    <input
        type="text"
        className="
      w-full h-12 px-4 
      bg-white dark:bg-slate-800 
      border-2 border-slate-200 dark:border-slate-700
      focus:border-main-indigo dark:focus:border-indigo-500
      focus:outline-none focus:ring-0
      text-slate-900 dark:text-slate-100
      placeholder:text-slate-400 dark:placeholder:text-slate-500
      rounded-xl 
      transition-colors duration-200
    "
        placeholder="Ej: Viaje a Japón, Fondo emergencia..."
    />
</div>
```

#### Input con Error

```tsx
<input
  className="
    w-full h-12 px-4
    bg-white dark:bg-slate-800
    border-2 border-rose-500 dark:border-rose-600
    focus:border-rose-500 dark:focus:border-rose-600
    focus:outline-none focus:ring-0
    text-slate-900 dark:text-slate-100
    rounded-xl
    transition-colors duration-200
  "
/>
<p className="text-sm text-rose-600 dark:text-rose-400 mt-1">
  Este campo es obligatorio
</p>
```

#### Select / Dropdown

```tsx
<select
    className="
  w-full h-12 px-4 
  bg-white dark:bg-slate-800 
  border-2 border-slate-200 dark:border-slate-700
  focus:border-main-indigo dark:focus:border-indigo-500
  focus:outline-none focus:ring-0
  text-slate-900 dark:text-slate-100
  rounded-xl 
  transition-colors duration-200
  cursor-pointer
"
>
    <option>Alta</option>
    <option>Media</option>
    <option>Baja</option>
</select>
```

### 4. Badges y Tags

#### Priority Badge

```tsx
// Alta prioridad
<span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium rounded-lg">
  Alta
</span>

// Media prioridad
<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-lg">
  Media
</span>

// Baja prioridad
<span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium rounded-lg">
  Baja
</span>
```

#### Status Badge

```tsx
// Activo
<span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded-lg">
  Activa
</span>

// Completado
<span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-lg">
  Completada
</span>

// Pausado
<span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium rounded-lg">
  Pausada
</span>
```

### 5. Alertas y Mensajes

#### Warning Alert

```tsx
<div
    className="
  bg-yellow-50 dark:bg-yellow-900/20 
  border border-yellow-200 dark:border-yellow-800 
  rounded-lg 
  p-4 
  flex items-center gap-3
"
>
    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
    <p className="text-sm text-yellow-800 dark:text-yellow-300">
        Has asignado el 100% de tu presupuesto de ahorro.
    </p>
</div>
```

#### Success Alert

```tsx
<div
    className="
  bg-green-50 dark:bg-green-900/20 
  border border-green-200 dark:border-green-800 
  rounded-lg 
  p-4 
  flex items-center gap-3
"
>
    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
    <p className="text-sm text-green-800 dark:text-green-300">
        ✅ Meta guardada exitosamente
    </p>
</div>
```

#### Error Alert

```tsx
<div
    className="
  bg-red-50 dark:bg-red-900/20 
  border border-red-200 dark:border-red-800 
  rounded-lg 
  p-4 
  flex items-center gap-3
"
>
    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
    <p className="text-sm text-red-800 dark:text-red-300">
        Error al guardar la meta de ahorro
    </p>
</div>
```

### 6. Loading States

#### Spinner

```tsx
<div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
</div>
```

#### Skeleton Loader

```tsx
<div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
</div>
```

### 7. Progress Bars

#### Linear Progress

```tsx
<div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
    <div
        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
        style={{ width: "60%" }}
    ></div>
</div>
```

#### Progress con Label

```tsx
<div className="space-y-2">
    <div className="flex justify-between text-sm">
        <span className="text-slate-600 dark:text-slate-400">Progreso</span>
        <span className="font-semibold text-slate-900 dark:text-slate-100">
            60%
        </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
        <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: "60%" }}
        ></div>
    </div>
</div>
```

---

## 📏 Sistema de Espaciado

### Escala de Espaciado Tailwind

```css
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
```

### Uso por Contexto

| Contexto           | Padding      | Gap            | Margin        |
| ------------------ | ------------ | -------------- | ------------- |
| **Cards pequeñas** | `p-4` (16px) | `gap-2` (8px)  | `mb-4` (16px) |
| **Cards medianas** | `p-5` (20px) | `gap-3` (12px) | `mb-6` (24px) |
| **Cards grandes**  | `p-6` (24px) | `gap-4` (16px) | `mb-8` (32px) |
| **Formularios**    | `p-8` (32px) | `gap-6` (24px) | `mb-6` (24px) |
| **Secciones**      | `p-4 sm:p-6` | `gap-4` (16px) | `mb-8` (32px) |

### Responsive Spacing

```tsx
// Padding responsive
<div className="p-4 sm:p-5 md:p-6 lg:p-8">
  Contenido con padding adaptativo
</div>

// Gap responsive
<div className="grid gap-4 md:gap-6 lg:gap-8">
  Grid con gap adaptativo
</div>
```

---

## 🎭 Elevación y Sombras

### Niveles de Sombra

```css
/* Nivel 0 - Plano */
shadow-none

/* Nivel 1 - Sutil */
shadow-sm
/* 0 1px 2px rgba(0, 0, 0, 0.05) */

/* Nivel 2 - Estándar */
shadow
/* 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06) */

/* Nivel 3 - Medio */
shadow-md
/* 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06) */

/* Nivel 4 - Elevado */
shadow-lg
/* 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05) */

/* Nivel 5 - Máximo */
shadow-xl
/* 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04) */
```

### Uso por Componente

| Componente              | Sombra Default | Sombra Hover |
| ----------------------- | -------------- | ------------ |
| **Cards de resumen**    | `shadow-lg`    | `shadow-md`  |
| **Cards de contenido**  | `shadow-lg`    | `shadow-md`  |
| **Botones principales** | `shadow-lg`    | `shadow-xl`  |
| **Modales**             | `shadow-xl`    | -            |
| **Dropdowns**           | `shadow-lg`    | -            |
| **Inputs**              | `shadow-none`  | -            |

### Implementación

```tsx
// Card con sombra y hover
<div className="shadow-lg hover:shadow-md transition-all duration-300">
  Contenido
</div>

// Botón con sombra elevada
<button className="shadow-lg hover:shadow-xl transition-all duration-300">
  Acción
</button>
```

---

## ✨ Animaciones y Transiciones

### Duraciones Estándar

```css
duration-200  → 200ms  /* Cambios rápidos (hover, focus) */
duration-300  → 300ms  /* Cambios estándar (transiciones generales) */
duration-500  → 500ms  /* Cambios lentos (progress bars, modales) */
```

### Timing Functions

```css
ease-in       /* Aceleración al inicio */
ease-out      /* Desaceleración al final */
ease-in-out   /* Aceleración y desaceleración */
linear        /* Velocidad constante */
```

### Transiciones Comunes

#### Hover en Botones

```tsx
<button
    className="
  bg-main-indigo hover:bg-indigo-600 
  transition-colors duration-200
"
>
    Botón
</button>
```

#### Hover en Cards

```tsx
<div
    className="
  shadow-lg hover:shadow-md 
  transition-all duration-300
"
>
    Card
</div>
```

#### Iconos Animados

```tsx
<Plus
    className="
  group-hover:rotate-90 
  transition-transform duration-300
"
/>
```

#### Progress Bar

```tsx
<div
    className="
    bg-gradient-to-r from-blue-500 to-green-500 
    h-3 rounded-full 
    transition-all duration-500
  "
    style={{ width: `${progress}%` }}
/>
```

### Animaciones Predefinidas

```tsx
// Spinner
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />

// Pulse (skeleton loader)
<div className="animate-pulse bg-slate-200 h-4 rounded" />

// Bounce
<div className="animate-bounce">↓</div>
```

---

## 📱 Responsive Design

### Breakpoints Tailwind

```css
sm:  640px   /* Tablets pequeñas */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Pantallas grandes */
```

### Mobile First Approach

```tsx
// Base: Mobile
// sm: Tablet pequeña
// md: Tablet
// lg: Desktop
<div
    className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  lg:grid-cols-3 
  gap-4
"
>
    {/* Contenido responsive */}
</div>
```

### Patrones Responsive Comunes

#### Grid Adaptativo

```tsx
// 1 columna en móvil, 2 en tablet, 3 en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map((item) => (
        <Card key={item.id} {...item} />
    ))}
</div>
```

#### Padding Responsive

```tsx
<div className="p-4 sm:p-5 md:p-6 lg:p-8">Contenido con padding adaptativo</div>
```

#### Texto Responsive

```tsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
    Título Responsive
</h1>
```

#### Ocultar/Mostrar Elementos

```tsx
// Ocultar en móvil, mostrar en desktop
<div className="hidden lg:block">
  Contenido solo desktop
</div>

// Mostrar en móvil, ocultar en desktop
<div className="block lg:hidden">
  Contenido solo móvil
</div>
```

---

## 🌍 Internacionalización

### Idiomas Soportados

- **Español (es)** - Idioma principal
- **Valenciano/Catalán (ca)** - Idioma regional
- **Inglés (en)** - Idioma internacional

### Estructura de Traducciones

```javascript
// messages/es.json
{
  "savingsPage": {
    "totalProgress": "Progreso Total",
    "activeGoals": "Metas Activas",
    "createNewGoal": "Crear Nueva Meta de Ahorro",
    "monthlyContributionStatus": {
      "title": "Contribuciones Mensuales Automáticas",
      "subtitle": "Sin descontar imprevistos"
    }
  }
}
```

### Uso en Componentes

```tsx
import { useTranslations } from "next-intl";

const Component = () => {
    const t = useTranslations("savingsPage");

    return <h1>{t("totalProgress")}</h1>;
};
```

### Mejores Prácticas

1. **Claves descriptivas**: Usar nombres claros y jerárquicos
2. **Namespace por página**: Organizar traducciones por sección
3. **Pluralización**: Manejar singular/plural correctamente
4. **Interpolación**: Usar variables para valores dinámicos

```tsx
// Con variables
t("totalExpensesInfo", { count: 5 });
// "Tienes 5 gastos en total"
```

---

## ♿ Accesibilidad

### Principios WCAG 2.1

1. **Perceptible**: Información presentada de forma clara
2. **Operable**: Navegable con teclado y mouse
3. **Comprensible**: Contenido y operación comprensibles
4. **Robusto**: Compatible con tecnologías asistivas

### Contraste de Colores

#### Modo Claro

- **Texto principal sobre fondo**: 15.8:1 (AAA) ✅
- **Texto secundario sobre fondo**: 7.1:1 (AAA) ✅
- **Botones principales**: 4.5:1 (AA) ✅

#### Modo Oscuro

- **Texto principal sobre fondo**: 14.2:1 (AAA) ✅
- **Texto secundario sobre fondo**: 5.8:1 (AA) ✅
- **Botones principales**: 4.5:1 (AA) ✅

### Navegación por Teclado

```tsx
// Botón accesible
<button
  className="..."
  aria-label="Crear nueva meta de ahorro"
  tabIndex={0}
>
  <Plus className="w-5 h-5" />
</button>

// Input accesible
<label htmlFor="goalName" className="...">
  Nombre de la Meta
</label>
<input
  id="goalName"
  type="text"
  aria-required="true"
  aria-describedby="goalNameHelp"
/>
<p id="goalNameHelp" className="text-sm text-slate-500">
  Ej: Viaje a Japón, Fondo emergencia...
</p>
```

### Estados de Foco

```tsx
<button
    className="
  focus:outline-none 
  focus:ring-2 
  focus:ring-indigo-500 
  focus:ring-offset-2
"
>
    Botón con estado de foco visible
</button>
```

### ARIA Labels

```tsx
// Loading state
<div role="status" aria-live="polite">
  <div className="animate-spin..." aria-hidden="true" />
  <span className="sr-only">Cargando...</span>
</div>

// Alert
<div role="alert" className="bg-yellow-50...">
  Has asignado el 100% de tu presupuesto
</div>
```

---

## 💎 Mejores Prácticas

### 1. Consistencia

- **Usar componentes reutilizables**: Crear componentes para patrones repetidos
- **Mantener espaciado uniforme**: Usar la escala de espaciado de Tailwind
- **Colores coherentes**: Usar solo los colores definidos en la paleta

### 2. Performance

```tsx
// ✅ Bueno: Clases estáticas
<div className="bg-white dark:bg-slate-800 p-4 rounded-xl">

// ❌ Evitar: Clases dinámicas complejas
<div className={`bg-${color}-500`}> // No funciona con Tailwind
```

### 3. Dark Mode

```tsx
// ✅ Siempre incluir variante dark
<div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">

// ✅ Bordes en dark mode
<div className="border border-slate-200 dark:border-slate-700">

// ✅ Sombras sutiles en dark mode
<div className="shadow-lg dark:shadow-slate-900/30">
```

### 4. Responsive

```tsx
// ✅ Mobile first
<div className="p-4 sm:p-6 lg:p-8">

// ✅ Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// ✅ Texto responsive
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
```

### 5. Accesibilidad

```tsx
// ✅ Labels descriptivos
<label htmlFor="amount">Cantidad</label>
<input id="amount" type="number" />

// ✅ Estados de foco visibles
<button className="focus:ring-2 focus:ring-indigo-500">

// ✅ ARIA labels cuando sea necesario
<button aria-label="Cerrar modal">
  <X className="w-5 h-5" />
</button>
```

### 6. Transiciones

```tsx
// ✅ Transiciones suaves
<div className="transition-all duration-300">

// ✅ Hover states
<button className="hover:bg-indigo-600 transition-colors duration-200">

// ✅ Animaciones de iconos
<Plus className="group-hover:rotate-90 transition-transform duration-300" />
```

---

## 📊 Resumen Visual

### Paleta Rápida

```
Backgrounds Light:  #F8FAFC, #FFFFFF
Backgrounds Dark:   #0F172A, #1E293B
Bordes Light:       #E2E8F0
Bordes Dark:        #334155
Textos Light:       #0F172A, #475569, #94A3B8
Textos Dark:        #F1F5F9, #94A3B8, #64748B

Acentos:
  Indigo:   #6366F1
  Purple:   #8B5CF6
  Pink:     #EC4899
  Rose:     #F43F5E
  Emerald:  #10B981
  Sky:      #0EA5E9
```

### Componentes Clave

```
Botón Primary:     h-12, bg-main-indigo, rounded-xl, px-6
Botón Secondary:   h-12, border-2, rounded-xl, px-6
Input:             h-12, border-2, rounded-xl, px-4
Card Resumen:      p-4 sm:p-5, rounded-xl, shadow-lg
Card Contenido:    p-4, rounded-xl, shadow-lg
Badge:             px-3 py-1, rounded-lg, text-xs
Progress Bar:      h-3, rounded-full, gradient
```

### Espaciado Estándar

```
Gap pequeño:    gap-2  (8px)
Gap medio:      gap-4  (16px)
Gap grande:     gap-6  (24px)

Padding card:   p-4 sm:p-5  (16px-20px)
Padding form:   p-6 sm:p-8  (24px-32px)

Margin bottom:  mb-4  (16px)
Margin section: mb-6  (24px)
```

---

## 🎓 Conclusión

Esta guía de estilos proporciona un sistema de diseño completo y coherente para Numoes.app. Al seguir estos principios y patrones, garantizamos:

- **Consistencia visual** en toda la aplicación
- **Experiencia de usuario** fluida y profesional
- **Accesibilidad** para todos los usuarios
- **Mantenibilidad** del código a largo plazo
- **Escalabilidad** para futuras funcionalidades

### Recursos Adicionales

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Versión:** 2.0.0  
**Fecha:** Febrero 2026  
**Proyecto:** Numoes.app - Gestión de Gastos  
**Autor:** Equipo Numoes.app
