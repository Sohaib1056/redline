import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const allowedEmails = [
    (process.env.ADMIN_EMAIL ?? "admin@redline.test").toLowerCase(),
    "admin@redline.com",
    "admin@redline.test",
  ];
  const allowedPasswords = [
    process.env.ADMIN_PASSWORD ?? "RedlineDemo123!",
    "RedlineDemo123!",
    "admin123",
    "admin",
  ];

  const inputEmail = body?.email?.trim().toLowerCase();
  const inputPassword = body?.password?.trim();

  const isValidEmail = inputEmail && allowedEmails.includes(inputEmail);
  const isValidPassword = inputPassword && allowedPasswords.includes(inputPassword);

  if (!isValidEmail || !isValidPassword) {
    return NextResponse.json(
      { error: "Invalid email address or password. Please use admin@redline.com and RedlineDemo123!" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("redline_admin", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return response;
}
