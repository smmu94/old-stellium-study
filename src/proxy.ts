import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, ROUTES } from "./utils/routes/routes";
// Importamos tus constantes y la función de utilidad

export async function proxy(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Verificamos si la ruta actual está en tu lista de rutas públicas
  const isPublic = PUBLIC_ROUTES.some(route => pathname === route);

  // 2. Verificamos si es una ruta de Dashboard (privada)
  const isProtectedRoute = pathname.startsWith(ROUTES.DASHBOARD);

  // CASO 1: Usuario LOGUEADO intentando acceder a rutas PÚBLICAS (Home, About, Auth, etc.)
  if (session && isPublic) {
    // Lo mandamos siempre al Dashboard para que no vea la Landing ni el Login
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
  }

  // CASO 2: Usuario NO LOGUEADO intentando acceder a rutas PRIVADAS
  if (!session && isProtectedRoute) {
    // Lo mandamos a la página de Auth/Login
    return NextResponse.redirect(new URL(ROUTES.AUTH, req.url));
  }

  // Si no se cumple ninguna de las anteriores, lo dejamos pasar
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};