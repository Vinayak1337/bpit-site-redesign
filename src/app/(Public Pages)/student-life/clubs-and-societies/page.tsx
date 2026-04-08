import { getClubsSocieties } from '@/app/(Private Pages)/actions/student-life';
import ClubsSocieties from '@/components/student-life/ClubsSocieties';

export default async function ClubsSocietiesPage() {
	const data = await getClubsSocieties('student-life-clubs-and-societies');
	return <ClubsSocieties data={data} />;
}
