'use server';

import { revalidatePath } from 'next/cache';
import { upsertHeroCarousel } from '@/lib/homepage';

export async function updateHeroCarousel(data: unknown) {
	// TODO: add auth check to restrict to admins
	await upsertHeroCarousel(data);
	revalidatePath('/');
	revalidatePath('/admin');
}


