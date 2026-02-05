import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Rutas que el middleware debe procesar
    // Excluimos archivos estáticos, API routes, y recursos
    matcher: [
        // Todas las rutas excepto las que empiezan con:
        // - api (API routes)
        // - _next (Next.js internals)
        // - _vercel (Vercel internals)
        // - archivos con extensión (favicon.ico, etc.)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
