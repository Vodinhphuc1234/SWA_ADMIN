import { NextResponse } from "next/server";

export default function middleware(req) {
  if (!req.url.includes("/login")) {
    const token = req.cookies.token;
    if (token) {
      return NextResponse.next();
    }
    return NextResponse.redirect("/login");
  } else if (req.cookies.token) {
    return NextResponse.redirect("/");
  }
  return NextResponse.next();
}
