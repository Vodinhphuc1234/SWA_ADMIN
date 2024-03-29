import { NextResponse } from "next/server";

export default function middleware(req) {
  const redirect =
    process.env.NODE_ENV == "development"
      ? "http://127.0.0.1:3000"
      : "https://swa-operator.vercel.app";
  if (!req.nextUrl.pathname.startsWith("/login")) {
    const token = req.cookies.token;
    if (token) {
      return NextResponse.next();
    }

    return NextResponse.redirect(redirect + "/login");
  } else if (req.cookies.token) {
    return NextResponse.redirect(redirect);
  }

  return NextResponse.next();
}
