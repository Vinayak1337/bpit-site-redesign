import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-ndli';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'National Digital Library of India',
	description: 'Using the National Digital Library of India (NDLI) through BPIT — millions of e-books, journals and multimedia resources.',
	alternates: { canonical: '/academia/library/ndli' }
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
