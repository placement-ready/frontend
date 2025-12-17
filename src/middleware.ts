import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      request: req,
      headers: req.headers,
    });

    if (session?.user) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error('Unable to read auth session', error);
  }

  const loginUrl = new URL('/auth/login', req.url);
  const callbackUrl = req.nextUrl.pathname + req.nextUrl.search;
  loginUrl.searchParams.set('callbackUrl', callbackUrl);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
