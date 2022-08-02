import { NextResponse } from "next/server";

export default function middleware(req) {
  const redirect =
    process.env.NODE_ENV == "development"
      ? "http://127.0.0.1:3001"
      : "https://swa-admin.vercel.app";
  if (!req.url.includes("/login")) {
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
