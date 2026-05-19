import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const locale = formData.get("locale") === "es" ? "es" : "en";
  const referer = request.headers.get("referer") ?? new URL("/", request.url).toString();
  const response = NextResponse.redirect(referer, 303);

  response.cookies.set("locale", locale, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
