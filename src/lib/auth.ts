import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createSession, verifySession, COOKIE_NAME } from '@/lib/auth-jwt';

export async function authenticate(email: string, password: string) {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) return null;
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) return null;
	return { id: user.id, email: user.email, role: user.role };
}

export { createSession, verifySession, COOKIE_NAME };


