import { NextResponse } from "next/server";

const SESSION_COOKIE = "stori_cymru_session";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const password = process.env.STORI_CYMRU_PASSWORD;
  const sessionSecret = process.env.STORI_CYMRU_SESSION_SECRET;

  if (!password || !sessionSecret) {
    return NextResponse.json(
      { error: "This page isn't connected yet. Please ask Alchemy to finish setup." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });
  return response;
}
