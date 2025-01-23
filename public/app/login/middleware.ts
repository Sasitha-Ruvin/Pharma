import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtPayloadWithRole extends jwt.JwtPayload {
  role?: string;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithRole;
    if (req.nextUrl.pathname.startsWith('/dashboard') && user.role !== req.nextUrl.pathname.split('/')[2]) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
