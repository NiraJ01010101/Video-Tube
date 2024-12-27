// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "utils/verifyToken";

export async function middleware(req: NextRequest) {
  const authToken = req.cookies.get('accessToken')?.value || "";
  const verifyUser = await verifyToken(authToken);
  // Paths where users should not access if logged in
  const loggedInUserNotAccessPaths = req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/register";

  // If user is trying to access login/register but is already logged in
  if (req.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  if (loggedInUserNotAccessPaths) {
    if (verifyUser) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }
  // If user is not logged in and trying to access protected paths
  else {
    if (!verifyUser) {
      return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    }
  }
}


// Specify the paths to match
export const config = {
  matcher: ['/', '/auth', '/auth/login', '/auth/register'],
};
