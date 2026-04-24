import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-services';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Services',
	description: 'Services offered by the BPIT library — reference, circulation, inter-library loans, research support and more.',
	alternates: { canonical: '/academia/library/services' }
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
