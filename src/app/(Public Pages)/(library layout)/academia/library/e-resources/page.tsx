import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-e-resources';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'E-Resources',
	description: 'Electronic resources subscribed by the BPIT library — databases, e-journals, and online research platforms.',
	alternates: { canonical: '/academia/library/e-resources' }
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
