'use server';
import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const SESSION_COOKIE = 'admin_session';
const SESSION_DAYS = 7;

type AdminRole = 'ADMIN' | 'EDITOR';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

function hashToken(token: string): string {
	return crypto.createHash('sha256').update(token).digest('hex');
}

export async function loginAdmin(formData: FormData): Promise<void> {
	const parsed = loginSchema.safeParse({
		email: String(formData.get('email') ?? ''),
		password: String(formData.get('password') ?? '')
	});

	if (!parsed.success) {
		redirect('/admin/login?error=invalid');
	}

const { email, password } = parsed.data;
const user = await prisma.adminUser.findUnique({ where: { email } });
	if (!user) {
		redirect('/admin/login?error=invalid');
	}

	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) {
		redirect('/admin/login?error=invalid');
	}

	const rawToken = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(rawToken);
	const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

await prisma.adminSession.create({ data: { token: tokenHash, expiresAt, user: { connect: { id: user.id } } } });

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, rawToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		path: '/',
		expires: expiresAt
	});

	redirect('/admin');
}

export async function logoutAdmin(): Promise<void> {
	const cookieStore = await cookies();
	const rawToken = cookieStore.get(SESSION_COOKIE)?.value;
    if (rawToken) {
        await prisma.adminSession.deleteMany({ where: { token: hashToken(rawToken) } });
    }
	cookieStore.delete(SESSION_COOKIE);
	redirect('/admin/login');
}

export async function getCurrentAdmin(): Promise<{ id: string; email: string; role: string } | null> {
	const cookieStore = await cookies();
	const rawToken = cookieStore.get(SESSION_COOKIE)?.value;
	if (!rawToken) return null;

	const tokenHash = hashToken(rawToken);
    const session = await prisma.adminSession.findFirst({ where: { token: tokenHash, expiresAt: { gt: new Date() } }, include: { user: true } });
    if (!session || !session.user) return null;
    return { id: session.user.id, email: session.user.email, role: session.user.role };
}

export async function requireAdmin(): Promise<{ id: string; email: string; role: string }> {
	const admin = await getCurrentAdmin();
	if (!admin) redirect('/admin/login');
	return admin;
}

const createAdminSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(8),
    role: z.enum(['ADMIN', 'EDITOR'])
});

export async function createAdminUser(formData: FormData): Promise<void> {
    const current = await getCurrentAdmin();
    if (!current || current.role !== 'ADMIN') {
        redirect('/admin/login');
    }

    const parsed = createAdminSchema.safeParse({
        email: String(formData.get('email') ?? ''),
        name: formData.get('name') ? String(formData.get('name')) : undefined,
        password: String(formData.get('password') ?? ''),
        role: String(formData.get('role') ?? 'EDITOR') as AdminRole
    });
    if (!parsed.success) {
        redirect('/admin?error=invalid');
    }

const { email, name, password, role } = parsed.data;
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
        redirect('/admin?error=exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({ data: { email, name, passwordHash, role } });

    redirect('/admin?created=1');
}

export async function deleteAdminUser(formData: FormData): Promise<void> {
	const current = await getCurrentAdmin();
	if (!current || current.role !== 'ADMIN') {
		redirect('/admin/login');
	}

	const userId = String(formData.get('userId') ?? '');
	if (!userId) redirect('/admin?error=invalid');

	// Prevent self-deletion
	if (userId === current.id) {
		redirect('/admin?error=cannot_delete_self');
	}

	const user = await prisma.adminUser.findUnique({ where: { id: userId } });
	if (!user) redirect('/admin?error=not_found');

	if (user.role === 'ADMIN') {
		const adminCount = await prisma.adminUser.count({ where: { role: 'ADMIN' } });
		if (adminCount <= 1) {
			redirect('/admin?error=last_admin');
		}
	}

	await prisma.adminUser.delete({ where: { id: userId } });
	redirect('/admin?deleted=1');
}


