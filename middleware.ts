import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/login'];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET
  });
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/api/auth') ||
    token ||
    publicRoutes.includes(pathname)
  ) {
    return NextResponse.next();
  }
  if (!token) {
    console.warn(`Unauthorized access attempt to: ${pathname}`);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};
