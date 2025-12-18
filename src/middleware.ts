import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config';

export async function middleware(req: NextRequest) {
  try {
    const res = await fetch(`${env.apiUrl}/api/me`, {
      headers: req.headers,
      credentials: 'include',
    });

    const session = await res.json();

    if (session?.user) {
      const loginUrl = new URL('/auth/login', req.url);
      const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
      loginUrl.searchParams.set('callbackUrl', callbackUrl);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Unable to read auth session', error);
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
