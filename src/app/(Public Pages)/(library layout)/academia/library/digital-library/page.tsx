import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-digital-library';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Digital Library',
	description: 'Digital library resources at BPIT — e-books, journals, databases and research tools available online to students and faculty.',
	alternates: { canonical: '/academia/library/digital-library' }
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
