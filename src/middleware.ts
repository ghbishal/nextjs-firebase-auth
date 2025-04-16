import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname === "/auth";

  // 🚫 Not logged in + accessing private page → redirect to /auth
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // ✅ Already logged in and accessing /auth → redirect to homepage
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything EXCEPT:
    // - _next/static
    // - _next/image
    // - favicon
    // - auth (your custom login page)
    // - api/auth (used by NextAuth login)
    "/((?!_next/static|_next/image|favicon.ico|auth|api/auth).*)",
  ],
};
