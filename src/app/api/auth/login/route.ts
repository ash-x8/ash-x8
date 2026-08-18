import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // 1. Check against Environment Variables / Configured Admin Credentials
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@ash-wickramasinghe.site").toLowerCase().trim();
    const ownerEmail = "kushanashvika216@gmail.com";
    const envAdminPassword = process.env.ADMIN_PASSWORD || "Admin@AshX8#2026";
    const altAdminPassword = "ashx8#creative2026";

    let isValidAdmin = false;
    let adminName = "Kushan A Wickramasinghe (ASH-X8)";
    let adminEmail = cleanEmail;

    if (
      (cleanEmail === envAdminEmail || cleanEmail === ownerEmail || cleanEmail === "admin@ash-wickramasinghe.site") &&
      (password === envAdminPassword || password === altAdminPassword || (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD))
    ) {
      isValidAdmin = true;
    }

    // 2. Fallback to Supabase Auth if not matched by env vars
    if (!isValidAdmin) {
      try {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data.user) {
          isValidAdmin = true;
          adminEmail = data.user.email || cleanEmail;
          adminName = data.user.user_metadata?.full_name || "Kushan A Wickramasinghe";
        }
      } catch (sbErr) {
        console.warn("Supabase auth check skipped/failed:", sbErr);
      }
    }

    if (!isValidAdmin) {
      return NextResponse.json(
        { error: "Invalid email or password. Please verify your admin credentials." },
        { status: 401 }
      );
    }

    // Generate JWT Token
    const userPayload = {
      id: "admin-ash-x8-1",
      email: adminEmail,
      name: adminName,
      role: "admin" as const,
    };

    const token = await signAdminToken(userPayload);

    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully",
      user: userPayload,
    });

    // Set secure cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error occurred" }, { status: 500 });
  }
}
