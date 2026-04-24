import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-moocs';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'MOOCs',
	description: 'Massive Open Online Courses (MOOCs) curated by the BPIT library — SWAYAM, NPTEL and other platforms for skill development.',
	alternates: { canonical: '/academia/library/moocs' }
};



export const revalidate = 3600;

export default async function Page() {
	const [hero, content] = await Promise.all([getHero(), getContent()]);
	return (
		<div className='space-y-6'>
			<SimpleSubHero data={hero} />
			<SimpleSubContent data={content} />
		</div>
	);
}
