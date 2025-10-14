import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, verifySession } from '@/lib/auth-jwt';

export async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
		const token = req.cookies.get(COOKIE_NAME)?.value;
		if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));
		try {
			await verifySession(token);
			return NextResponse.next();
		} catch (e) {
			return NextResponse.redirect(new URL('/admin/login', req.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*']
};


