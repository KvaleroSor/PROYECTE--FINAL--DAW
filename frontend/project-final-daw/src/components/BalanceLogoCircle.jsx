export function BalanceLogoCircle({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo circular: Equilibrio perfecto con diseño tipo Stripe/Linear */}
      
      {/* Círculo exterior con gradiente sutil */}
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="currentColor"
        className="text-slate-900"
      />
      
      {/* Círculo interior (fondo) */}
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="white"
      />
      
      {/* Mitad izquierda - Ingresos (barra vertical) */}
      <rect
        x="10"
        y="12"
        width="3"
        height="16"
        rx="1.5"
        fill="currentColor"
        className="text-slate-900"
      />
      
      {/* Mitad derecha - Gastos (barra más corta) */}
      <rect
        x="27"
        y="16"
        width="3"
        height="12"
        rx="1.5"
        fill="currentColor"
        className="text-slate-500"
      />
      
      {/* Línea de equilibrio central */}
      <line
        x1="16"
        y1="20"
        x2="24"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-slate-900"
      />
      
      {/* Punto central de balance */}
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="currentColor"
        className="text-slate-900"
      />
    </svg>
  );
}
