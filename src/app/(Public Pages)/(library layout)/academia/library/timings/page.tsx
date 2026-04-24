import { getHero, getContent } from '@/app/(Private Pages)/actions/academia-library-timings';
import SimpleSubHero from '../_shared/SimpleSubHero';
import SimpleSubContent from '../_shared/SimpleSubContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Library Timings',
	description: 'Working hours of the BPIT library on regular days, weekends, exam periods and holidays.',
	alternates: { canonical: '/academia/library/timings' }
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
