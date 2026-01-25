import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Obtener el locale de la petición
  let locale = await requestLocale;

  // Validar que el locale sea válido, si no usar el por defecto
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Cargar el fichero de mensajes correspondiente
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
