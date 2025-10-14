import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change');
export const COOKIE_NAME = 'bpit_admin_token';

export async function createSession(user: { id: string; email: string; role: string }) {
	const token = await new SignJWT(user)
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('7d')
		.sign(JWT_SECRET);
	return token;
}

export async function verifySession(token: string) {
	const { payload } = await jwtVerify(token, JWT_SECRET);
	return payload as { id: string; email: string; role: string };
}




