import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-weeding-out';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Weeding-Out Policy',
	description: 'Weeding-out policy followed by the BPIT library for removing outdated or unused titles from the collection.',
	alternates: { canonical: '/academia/library/weeding-out' }
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
