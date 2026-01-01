export function BalanceLogoAlt({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Logo alternativo: Gráfico de barras que forma una "B" estilizada */}
      
      {/* Barra 1 - ascendente */}
      <rect
        x="6"
        y="22"
        width="4"
        height="14"
        rx="2"
        fill="currentColor"
        className="text-slate-900"
      />
      
      {/* Barra 2 - media */}
      <rect
        x="12"
        y="16"
        width="4"
        height="20"
        rx="2"
        fill="currentColor"
        className="text-slate-700"
      />
      
      {/* Barra 3 - alta */}
      <rect
        x="18"
        y="8"
        width="4"
        height="28"
        rx="2"
        fill="currentColor"
        className="text-slate-900"
      />
      
      {/* Barra 4 - media descendente */}
      <rect
        x="24"
        y="14"
        width="4"
        height="22"
        rx="2"
        fill="currentColor"
        className="text-slate-600"
      />
      
      {/* Barra 5 - baja */}
      <rect
        x="30"
        y="20"
        width="4"
        height="16"
        rx="2"
        fill="currentColor"
        className="text-slate-500"
      />
      
      {/* Línea de tendencia/equilibrio */}
      <path
        d="M 4 24 Q 12 16 20 10 T 36 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="text-slate-900"
        opacity="0.3"
      />
    </svg>
  );
}
