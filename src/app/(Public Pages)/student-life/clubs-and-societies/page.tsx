import { getClubsSocieties } from '@/app/(Private Pages)/actions/student-life';
import ClubsSocieties from '@/components/student-life/ClubsSocieties';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Clubs & Societies',
	description: 'Student clubs and societies at BPIT — technical, cultural, literary and entrepreneurship groups on campus.',
	alternates: { canonical: '/student-life/clubs-and-societies' }
};



export default async function ClubsSocietiesPage() {
	const data = await getClubsSocieties('student-life-clubs-and-societies');
	return <ClubsSocieties data={data} />;
}
