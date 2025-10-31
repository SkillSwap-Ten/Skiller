import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken } from "./lib/utils/tokenValidator";

// --------------------------------------------------------------------------
// Middleware para rutas protegidas
function protectedMiddleware(req: NextRequest) {
    const { nextUrl, cookies } = req;

    const token = cookies.get("authToken")?.value;
    const role = cookies.get("userRole")?.value;
    const url = nextUrl.pathname;

    // 1. Si no hay token o rol válido → redirige al login
    if (!token || !isValidToken(token) || !role) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // 2. Lógica de autorización por rol
    const isAdminRoute = url.startsWith("/admin");
    const isUserRoute = url.startsWith("/user");

    // Admin intentando entrar a /user
    if (role === "1" && !isAdminRoute) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Usuario normal intentando entrar a /admin
    if (role === "2" && !isUserRoute) {
        return NextResponse.redirect(new URL("/user", req.url));
    }

    // 3. Si todo está correcto, continuar
    return NextResponse.next();
}

// --------------------------------------------------------------------------
// Middleware para rutas públicas
function publicMiddleware(req: NextRequest) {
    const { nextUrl, cookies } = req;

    const token = cookies.get("authToken")?.value;
    const role = cookies.get("userRole")?.value;
    const url = nextUrl.pathname;

    // 1. Si el usuario NO está autenticado → dejar pasar
    if (!token || !isValidToken(token) || !role) {
        return NextResponse.next();
    }

    // 2. Si está autenticado e intenta acceder a rutas públicas → redirigir según rol
    const publicRoutes = ["/", "/auth", "/legal"];
    const isPublic = publicRoutes.some((r) => url.startsWith(r));

    if (isPublic) {
        if (role === "1") {
            return NextResponse.redirect(new URL("/admin", req.url));
        } else if (role === "2") {
            return NextResponse.redirect(new URL("/user", req.url));
        }
    }

    // 3. Si todo está correcto, continuar
    return NextResponse.next();
}

// --------------------------------------------------------------------------
// Middleware principal que enruta según el tipo de ruta
export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    // 1. Rutas públicas
    if (
        pathname === "/" ||
        pathname.startsWith("/auth") ||
        pathname.startsWith("/legal")
    ) {
        return publicMiddleware(req);
    }

    // 2. Rutas protegidas
    else if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
        return protectedMiddleware(req);
    }

    // 3. Cualquier otra ruta continúa normal
    return NextResponse.next();
}

// --------------------------------------------------------------------------
// Configuración global del matcher (se aplica a todas las rutas)
export const config = {
    matcher: [
        "/",
        "/auth/:path*",
        "/legal/:path*",
        "/user/:path*",
        "/admin/:path*",
    ],
};
