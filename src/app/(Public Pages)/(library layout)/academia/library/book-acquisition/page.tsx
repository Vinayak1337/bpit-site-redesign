import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-book-acquisition';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Book Acquisition',
	description: 'Book acquisition policy and requisition process followed by the BPIT library.',
	alternates: { canonical: '/academia/library/book-acquisition' }
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
