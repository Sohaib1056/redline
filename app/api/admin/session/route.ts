import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const authenticated = request.cookies.get("redline_admin")?.value === "authenticated";
  return NextResponse.json({ authenticated });
}
