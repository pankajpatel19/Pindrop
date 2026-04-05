import { NextResponse } from "next/server";
import { verifyToken } from "./lib/token";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const ReqHeaders = new Headers(request.headers);

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const decode = await verifyToken(token);
  if (decode) {
    ReqHeaders.set("user-role", JSON.stringify(decode));
  }

  if (request.nextUrl.pathname.startsWith("/home") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next({
    request: {
      headers: ReqHeaders,
    },
  });
}

export const config = {
  matcher: ["/login", "/home/:path*", "/pin-creation/:path*"],
};
