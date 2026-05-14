import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'pelie_admin';

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const authed = await isValidSession(token);

  if (pathname === '/admin/login') {
    if (authed) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === '/api/admin/login' || pathname === '/api/admin/logout') {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!authed) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
