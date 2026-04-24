import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-book-bank';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Book Bank',
	description: 'BPIT library book bank scheme — eligibility, procedures and available titles for long-term lending.',
	alternates: { canonical: '/academia/library/book-bank' }
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
