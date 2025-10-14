import { NextRequest, NextResponse } from 'next/server';
import { authenticate, createSession, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
	const { email, password } = (await req.json().catch(() => ({}))) as { email?: string; password?: string };
	if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
	const user = await authenticate(email, password);
	if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
	const token = await createSession(user);
	const res = NextResponse.json({ ok: true });
	res.cookies.set(COOKIE_NAME, token, { httpOnly: true, sameSite: 'lax', path: '/', secure: process.env.NODE_ENV === 'production' });
	return res;
}




