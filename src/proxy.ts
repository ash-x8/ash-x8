import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ||
  process.env.AUTH_SECRET ||
  "ash-x8-creative-portfolio-secure-jwt-secret-key-2026"
);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Check custom JWT cookie first
  const jwtToken = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (jwtToken) {
    try {
      const { payload } = await jwtVerify(jwtToken, JWT_SECRET);
      if (payload && payload.role === "admin") {
        isAuthenticated = true;
      }
    } catch {
      // Invalid/expired token
    }
  }

  // If not authenticated by JWT, check Supabase
  if (!isAuthenticated && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabasePublishableKey,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
              response = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        isAuthenticated = true;
      }
    } catch {
      // Supabase auth check failed
    }
  }

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect administrative API routes
  if (pathname.startsWith("/api/admin")) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access to Admin API" }, { status: 401 });
    }
  }

  return response;
}

// Support both export names for backwards and forward compatibility
export const middleware = proxy;

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
