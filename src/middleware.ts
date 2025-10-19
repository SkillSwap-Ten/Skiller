import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// --------------------------------------------------------------------------
// Función que valida el token JWT (solo verifica expiración simple aquí)
function isValidToken(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch (error) {
    console.error("Error al validar el token:", error);
    return false;
  }
}

// --------------------------------------------------------------------------
// Middleware principal
export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  const token = cookies.get("authToken")?.value;
  const role = cookies.get("userRole")?.value; // 1 = admin, 2 = user

  const url = nextUrl.pathname;

  // ----------------------------------------------------------------------
  // 1. Si no hay token o está vencido, redirigir al login
  if (!token || !isValidToken(token)) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // ----------------------------------------------------------------------
  // 2. Si hay token pero no hay rol, también redirigir
  if (!role) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // ----------------------------------------------------------------------
  // 3. Lógica de autorización por rol
  // role = "1" → solo puede acceder a /admin/*
  // role = "2" → solo puede acceder a /user/*
  const isAdminRoute = url.startsWith("/admin");
  const isUserRoute = url.startsWith("/user");

  // Admin intentando entrar a /user
  if (role === "1" && isUserRoute) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Usuario normal intentando entrar a /admin
  if (role === "2" && isAdminRoute) {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  // ----------------------------------------------------------------------
  // 4. Si todo está correcto, continuar
  return NextResponse.next();
}

// --------------------------------------------------------------------------
// 5. Definimos las rutas donde aplica el middleware
export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*"
  ],
};
