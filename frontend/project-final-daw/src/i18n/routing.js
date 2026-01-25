import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Lista de idiomas soportados
  locales: ['es', 'ca', 'en'],

  // Idioma por defecto
  defaultLocale: 'es',

  // El idioma por defecto NO se muestra en la URL
  // Es decir: /dashboard en vez de /es/dashboard para español
  localePrefix: 'as-needed',

  // No detectar automáticamente el idioma del navegador
  // Usar siempre el idioma por defecto a menos que se especifique en la URL
  localeDetection: false
});
