# 🎨 Guía de Estilos - Balance.app

**Versión:** 1.0.0  
**Última actualización:** Noviembre 2025  
**Estilo:** Minimal Modern con colores vibrantes

---

## 📋 Índice

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Espaciado y Layout](#espaciado-y-layout)
4. [Componentes](#componentes)
5. [Sistema de Elevación](#sistema-de-elevación)
6. [Bordes y Radios](#bordes-y-radios)
7. [Responsive Design](#responsive-design)

---

## 🎨 Paleta de Colores

### Colores Base

#### Backgrounds
```css
--background-slate: #F8FAFC   
--cards-slate: #FFFFFF        
```

**Uso:**
- `bg-background-slate` → Body, fondo general de páginas
- `bg-cards-slate` → Cards, modales, formularios elevados

#### Bordes
```css
--border-slate: #E2E8F0      
```

**Uso:**
- `border-border-slate` → Separadores, bordes de inputs, divisores de secciones

#### Textos
```css
--text-slate: #0F172A       
```

**Uso:**
- `text-text-slate` → Títulos, textos principales
- `text-slate-600` → Textos secundarios (usando escala de Tailwind)
- `text-slate-400` → Textos terciarios, placeholders

---

### Colores Principales (Categorías/Acentos)

```css
--main-indigo: #6366F1 
--main-purple: #8B5CF6  
--main-pink: #EC4899    
--main-rose: #F43F5E    
--main-emerald: #10B981 
--main-sky: #0EA5E9     
```
**Uso por contexto:**

| Color | Uso Principal | Ejemplo |
|-------|--------------|---------|
| `main-indigo` | Acciones principales, CTAs, enlaces | Botones "Iniciar Sesión" |
| `main-purple` | Categoría Tecnología, estados especiales | Mascotas |
| `main-pink` | Categoría Salud, alertas importantes | Cama |
| `main-rose` | Categoría Comida, errores | Comida |
| `main-emerald` | Categoría Transporte, éxito | Coche, Tecnología |
| `main-sky` | Categoría Hogar, información | Despensa |

**Implementación en Tailwind:**
```tsx
<div className="bg-main-indigo">Indigo</div>
<div className="text-main-emerald">Emerald</div>
<div className="border-main-pink">Pink</div>
```

---

### Colores Extendidos (Generados por Tailwind)

Para cada color principal, Tailwind genera automáticamente una escala de 50-950:

```tsx
// Ejemplos con indigo
bg-indigo-50    // Muy claro (backgrounds hover)
bg-indigo-100   // Claro (backgrounds activos)
bg-indigo-500   // Base (igual que main-indigo)
bg-indigo-600   // Hover de botones
bg-indigo-700   // Active de botones
bg-indigo-900   // Muy oscuro
```

---

## 📝 Tipografía

### Fuente Principal
```css
font-family: system-ui, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
```

**Razón:** Fuente del sistema para máxima legibilidad y rendimiento.

---

### Escala Tipográfica

| Uso | Clase Tailwind | Tamaño | Weight | Line Height | Implementación |
|-----|----------------|--------|--------|-------------|----------------|
| **Título Hero** | `text-4xl` | 36px | 700 | 1.1 | `<h1 className="text-4xl">` |
| **Título Principal** | `text-3xl` | 30px | 700 | 1.2 | Landing page |
| **Título Sección** | `text-2xl` | 24px | 600 | 1.3 | Headers de cards |
| **Subtítulo** | `text-xl` | 20px | 600 | 1.4 | Subtítulos |
| **Texto Grande** | `text-lg` | 18px | 400 | 1.6 | Descripciones destacadas |
| **Texto Normal** | `text-base` | 16px | 400 | 1.6 | Texto general |
| **Texto Pequeño** | `text-sm` | 14px | 400 | 1.5 | Labels, botones |
| **Texto Mini** | `text-xs` | 12px | 400 | 1.4 | Captions, badges |

---

**Guía de uso:**
- **400 (Normal):** Texto de párrafos, descripciones
- **500 (Medium):** Botones, labels de inputs
- **600 (Semibold):** Subtítulos, nombres de categorías
- **700 (Bold):** Títulos principales, hero text

---

### Ejemplos de Implementación

```tsx
// Título Hero (Landing)
<h1 className="text-4xl font-bold text-text-slate">
  Tu App Favorita para Gestionar los Gastos
</h1>

// Subtítulo
<p className="text-lg text-slate-600">
  Donde tus ideas cobran vida...
</p>

// Texto de card
<p className="text-sm text-slate-600">
  Experiencia Única
</p>

// Label de input
<label className="text-sm font-medium text-text-slate">
  Correo Electrónico
</label>
```

---

## 🧩 Componentes

### 1. Botones

#### Primary Button (Indigo)
```tsx
<button className="w-full h-12 px-6 bg-main-indigo hover:bg-indigo-600 
                   text-white text-sm font-medium rounded-xl 
                   transition-colors duration-200">
  Iniciar Sesión
</button>
```

**Uso:** Acciones principales (Login, Submit, Guardar)

---

#### Secondary Button (Outline)
```tsx
<button className="h-12 px-6 border-2 border-border-slate 
                   hover:bg-slate-50 text-text-slate text-sm 
                   font-medium rounded-xl transition-colors duration-200">
  Crear Cuenta
</button>
```

**Uso:** Acciones secundarias, cancelar

---

#### Icon Button
```tsx
<button className="w-12 h-12 flex items-center justify-center 
                   rounded-xl hover:bg-slate-100 text-slate-600 
                   transition-colors duration-200">
  <Icon className="w-5 h-5" />
</button>
```

**Uso:** Iconos de categorías, acciones rápidas

---

#### Small Button (+ Crear Categoría)
```tsx
<button className="flex items-center gap-2 px-4 py-2 
                   border border-border-slate hover:bg-slate-50 
                   text-sm text-text-slate rounded-lg 
                   transition-colors duration-200">
  <Plus className="w-4 h-4" />
  <span>Crear Categoría</span>
</button>
```

---

### Estados de Botones

| Estado | Clase | Ejemplo |
|--------|-------|---------|
| Default | Base styles | `bg-main-indigo` |
| Hover | `hover:` | `hover:bg-indigo-600` |
| Active | `active:` | `active:bg-indigo-700` |
| Disabled | `disabled:` | `disabled:opacity-50 disabled:cursor-not-allowed` |

---

### 2. Inputs

#### Text Input
```tsx
<input 
  type="text"
  className="w-full h-12 px-4 bg-cards-slate border-2 border-border-slate
             focus:border-main-indigo focus:outline-none
             text-text-slate placeholder:text-slate-400
             rounded-xl transition-colors duration-200"
  placeholder="tu-email@email.com"
/>
```

**Variaciones:**
- Email: `type="email"`
- Password: `type="password"` + icono de ojo
- Con icono: Agregar padding-left y posicionar icono absolute

---

#### Estados del Input

```tsx
// Focus
focus:border-main-indigo focus:ring-0 focus:outline-none

// Error
border-rose-500 focus:border-rose-500

// Disabled
disabled:bg-slate-100 disabled:cursor-not-allowed
```

---

#### Label
```tsx
<label className="block text-sm font-medium text-text-slate mb-2">
  Correo Electrónico
</label>
```

---

### 3. Cards

#### Category Card
```tsx
<div className="flex flex-col items-center gap-3 p-4 
                bg-cards-slate rounded-2xl border border-border-slate
                hover:shadow-md transition-all duration-200 cursor-pointer">
  {/* Icono con background de color */}
  <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
    <Icon className="w-6 h-6 text-main-pink" />
  </div>
  
  {/* Nombre */}
  <span className="text-sm font-medium text-text-slate">Cama</span>
  
  {/* Botón de opciones */}
  <button className="w-6 h-6 rounded-full border border-border-slate
                     hover:bg-slate-50 flex items-center justify-center">
    <MoreVertical className="w-4 h-4 text-slate-500" />
  </button>
</div>
```

**Colores de íconos por categoría:**
- Cama: `bg-pink-100` + `text-main-pink`
- Coche: `bg-emerald-100` + `text-main-emerald`
- Salud: `bg-purple-100` + `text-main-purple`
- Comida: `bg-rose-100` + `text-main-rose`
- Tecnología: `bg-emerald-100` + `text-main-emerald`
- Despensa: `bg-sky-100` + `text-main-sky`
- Deporte: `bg-yellow-100` + `text-yellow-600`

---

#### Feature Card (Landing Page)
```tsx
<div className="p-6 bg-slate-50 rounded-2xl border border-border-slate">
  {/* Icono */}
  <div className="w-12 h-12 mb-4">
    <Icon className="w-6 h-6 text-text-slate" />
  </div>
  
  {/* Título */}
  <h3 className="font-semibold text-text-slate mb-2">
    Experiencia Única
  </h3>
  
  {/* Descripción */}
  <p className="text-sm text-slate-600">
    Diseñado para ofrecerte la mejor experiencia
  </p>
</div>
```

---

#### Form Card (Login/Crear Categoría)
```tsx
<div className="bg-cards-slate rounded-3xl p-8 
                shadow-lg border border-border-slate">
  {/* Contenido del formulario */}
</div>
```

---

### 4. Sidebar

```tsx
<aside className="w-64 h-screen bg-cards-slate border-r border-border-slate
                  flex flex-col">
  {/* Header */}
  <div className="h-16 px-6 border-b border-border-slate 
                  flex items-center">
    <span className="text-lg font-semibold text-text-slate">
      Balance.app
    </span>
  </div>
  
  {/* Navigation */}
  <nav className="flex-1 p-3 space-y-1">
    <a href="#" className="flex items-center gap-3 px-3 py-2.5 
                           rounded-xl bg-slate-100 text-text-slate">
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">Inicio</span>
    </a>
    
    <a href="#" className="flex items-center gap-3 px-3 py-2.5 
                           rounded-xl hover:bg-slate-50 text-slate-600">
      <Icon className="w-5 h-5" />
      <span className="text-sm">Categorías</span>
    </a>
  </nav>
  
  {/* Footer */}
  <div className="p-4 border-t border-border-slate">
    <button className="w-full flex items-center gap-3 px-3 py-2.5
                       rounded-xl hover:bg-slate-50 text-slate-600">
      <Icon className="w-5 h-5" />
      <span className="text-sm">Cerrar Sesión</span>
    </button>
  </div>
</aside>
```

**Características:**
- Ancho fijo: `w-64` (256px)
- Altura completa: `h-screen`
- Borde derecho sutil
- Item activo: `bg-slate-100`
- Items normales: `hover:bg-slate-50`

---

## 🎭 Sistema de Elevación

### Sombras Definidas

```css
/* Nivel 0 - Plano */
box-shadow: none;

/* Nivel 1 - Sutil (Inputs, botones) */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Nivel 2 - Estándar (Cards de categoría) */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);

/* Nivel 3 - Elevado (Card hover, dropdowns) */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08), 0 3px 8px rgba(0, 0, 0, 0.06);

/* Nivel 4 - Máximo (Modales, login card) */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);
```

---

### Uso por Componente

| Componente | Sombra Default | Sombra Hover |
|------------|----------------|--------------|
| Sidebar | Ninguna (usa border) | - |
| Category Card | Borde sutil | Nivel 2 |
| Login Card | Nivel 4 | - |
| Feature Card | Ninguna (usa border) | - |
| Dropdown | Nivel 3 | - |
| Modal | Nivel 4 | - |

---

### Uso por Componente

| Componente | Border Radius | Clase |
|------------|---------------|-------|
| **Botones** | 12px | `rounded-xl` |
| **Inputs** | 12px | `rounded-xl` |
| **Cards de categoría** | 16px | `rounded-2xl` |
| **Feature cards** | 16px | `rounded-2xl` |
| **Login card** | 24px | `rounded-3xl` |
| **Icon backgrounds** | 12px | `rounded-xl` |
| **Avatares** | Full | `rounded-full` |
| **Badges** | 8px | `rounded-lg` |

---

### Bordes

```css
/* Grosor */
border: 1px solid;          
border: 2px solid;          

/* Colores */
border-border-slate         
border-main-indigo          
border-rose-500            
```

---

## 📊 Resumen Visual

### Paleta Rápida
```
Backgrounds: #F8FAFC, #FFFFFF
Bordes:      #E2E8F0
Textos:      #0F172A, #64748B, #94A3B8

Acentos:
🔵 Indigo:   #6366F1
🟣 Purple:   #8B5CF6  
🌸 Pink:     #EC4899
🌹 Rose:     #F43F5E
💚 Emerald:  #10B981
🩵 Sky:      #0EA5E9
```

### Componentes Clave
```
Botón Primary:    h-12, bg-main-indigo, rounded-xl
Input:            h-12, border-2, rounded-xl, focus:border-indigo
Card Categoría:   p-4, rounded-2xl, border
Card Login:       p-8, rounded-3xl, shadow-xl
Sidebar:          w-64, border-r
```

---

## 🔄 Actualización y Mantenimiento

**Responsable:** Equipo de desarrollo  
**Frecuencia:** Revisar trimestralmente  
**Proceso:**
1. Revisar nuevos componentes creados
2. Verificar consistencia con la guía
3. Actualizar ejemplos si hay cambios
4. Documentar nuevos patrones

---

**Versión:** 1.0.0  
**Fecha:** Noviembre 2025  
**Proyecto:** Balance.app - Gestión de Gastos
