import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-collection';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Collection',
	description: 'Overview of the BPIT library collection — books, journals, reports, thesis and digital media across engineering disciplines.',
	alternates: { canonical: '/academia/library/collection' }
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
