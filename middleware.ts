import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Single shared-password gate for the Stori Cymru client project page.
// Session model: the cookie value must exactly equal STORI_CYMRU_SESSION_SECRET
// (a random secret, not a signed token) — no per-user accounts, no database.
const SESSION_COOKIE = "stori_cymru_session";
const LOGIN_PATH = "/projects/stori-cymru/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === LOGIN_PATH) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.STORI_CYMRU_SESSION_SECRET;
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;

  if (sessionSecret && cookie === sessionSecret) {
    return NextResponse.next();
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/projects/stori-cymru/:path*"],
};
