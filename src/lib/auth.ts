import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "ash-x8-creative-portfolio-secure-jwt-secret-key-2026"
);

export const COOKIE_NAME = "ash_admin_token";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

export async function signAdminToken(user: AdminUser): Promise<string> {
  return new SignJWT({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload && payload.role === "admin") {
      return {
        id: payload.sub as string,
        email: (payload.email as string) || "admin@ash-wickramasinghe.site",
        name: (payload.name as string) || "Kushan A Wickramasinghe",
        role: "admin",
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function verifyRequestAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const user = await verifyAdminToken(token);
  return user !== null;
}
