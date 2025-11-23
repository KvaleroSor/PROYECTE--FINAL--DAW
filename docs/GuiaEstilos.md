🎨 Guía de Estilos

Proyecto Final DAW – App de Gestión Financiera
Estilo: Minimalista Clara + Pastel

1. Paleta Base (Neutrales)
   Uso Color Código
   Fondo general Slate 50 #F8FAFC
   Fondo suave Slate 100 #F1F5F9
   Borde suave Slate 200 #E2E8F0
   Texto secundario Slate 600 #475569
   Texto principal Slate 800 #1E293B
   Texto destacado Slate 900 #0F172A
2. Paleta Pastel (Categorías)

Colores suaves y equilibrados diseñados para un estilo limpio y moderno, pensados para tarjetas como las que ya usas.

Nombre Color Código
Pink Soft Rosa pastel #F8C8C8
Yellow Soft Amarillo pastel #F9F3B0
Mint Soft Verde menta pastel #C6E8D5
Sky Soft Azul cielo pastel #CDE8F5
Lavender Soft Lavanda pastel #D6CCF7
Coral Soft Coral pastel #F7CBC4
Grey Soft Gris pastel #D9D9E0

Ejemplo de uso en tarjeta:

<div class="bg-[#F8C8C8]/30 border border-[#F8C8C8] rounded-xl p-4 shadow-sm">
  <!-- contenido -->
</div>

3. Sistema de Sombras (Elevación)
   Elevación 1 — Hover / Interactivos
   0 1px 3px rgba(0, 0, 0, 0.07)

Elevación 2 — Cards / Elementos base
0 4px 12px rgba(0, 0, 0, 0.06)

Elevación 3 — Modals / Elementos destacados
0 8px 24px rgba(0, 0, 0, 0.08)

4. Componentes Base
4.1 Tarjetas (Cards)
 <div class="
   flex items-center gap-2
   px-4 py-3
   rounded-xl
   bg-[var(--color)]/25
   border border-[var(--color)]
   shadow-sm
 ">
   <!-- contenido -->
 </div>

Reglas:

Bordes redondeados (rounded-xl)

Borde = color pastel

Fondo = color pastel con opacidad (20–30%)

Icono → text-slate-700

4.2 Botones

Botón principal (CTA):

<button class="
  px-4 py-2
  rounded-lg
  bg-sky-500
  text-white
  hover:bg-sky-600
  transition
  shadow-sm
">
Acción
</button>

Botón secundario:

<button class="
  px-4 py-2
  rounded-lg
  border border-slate-300
  bg-white
  hover:bg-slate-100
">
Secundario
</button>

4.3 Inputs
<input class="
  w-full
  px-3 py-2
  rounded-lg
  border border-slate-300
  bg-white
  focus:ring-2 focus:ring-sky-300
  focus:border-sky-300
  outline-none
">

5. Iconografía

Iconos outline (fino, minimalista)

Grosor 1.5–2px

Recomendado: Heroicons o Tabler Icons

Colores:

text-slate-700 sobre blanco

text-black/70 sobre tarjetas pastel

6. Espaciado y Redondeo
   Espaciados recomendados

Padding medio: p-4

Gap entre icono/texto: gap-2 o gap-3

Separación de secciones: my-4

Redondeo

Inputs/botones: rounded-lg

Tarjetas: rounded-xl

Contenedores grandes: rounded-2xl

7. Tokens Tailwind (para tailwind.config.js)

Añadir dentro de theme.extend.colors:

pastel: {
pink: "#F8C8C8",
yellow: "#F9F3B0",
mint: "#C6E8D5",
sky: "#CDE8F5",
lavender: "#D6CCF7",
coral: "#F7CBC4",
grey: "#D9D9E0",
}

Ejemplo de uso:

<div class="bg-pastel-mint/30 border border-pastel-mint"></div>

8. Principios de Diseño
   ✔ Simplicidad

Minimalismo ante todo. Usa el espacio como un elemento visual.

✔ Consistencia

Los colores pastel se usan exclusivamente para categorías o etiquetas.

✔ Jerarquía visual

Texto → slate

Acciones → azul pastel

Ahorro/Inversión → verde mint

Gastos altos → coral pastel

✔ Claridad

Evitar saturación y ruido visual.
La app debe transmitir calma y confianza.
