import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-newspapers';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Newspapers & Magazines',
	description: 'Newspapers, magazines and periodicals subscribed by the BPIT library for daily reading and current affairs.',
	alternates: { canonical: '/academia/library/newspapers' }
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
