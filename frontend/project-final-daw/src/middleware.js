import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request) {
    // Log para debugging - identificar /undefinedundefined
    if (request.nextUrl.pathname.includes("undefined")) {
        console.log("🚨 UNDEFINED URL DETECTED:", {
            pathname: request.nextUrl.pathname,
            href: request.nextUrl.href,
            referer: request.headers.get("referer"),
            userAgent: request.headers.get("user-agent"),
        });
    }

    return intlMiddleware(request);
}

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
