import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-photocopy-service';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Photocopy Service',
	description: 'In-library photocopy service details and rates available to BPIT students and faculty.',
	alternates: { canonical: '/academia/library/photocopy-service' }
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
