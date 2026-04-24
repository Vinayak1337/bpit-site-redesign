import { getStudentLifeOverview } from '@/app/(Private Pages)/actions/student-life';
import StudentLifeOverview from '@/components/student-life/StudentLifeOverview';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Student Life',
	description: 'Student life at BPIT — clubs, societies, campus facilities, events, festivals and support services.',
	alternates: { canonical: '/student-life' }
};



export default async function StudentLifePage() {
	const data = await getStudentLifeOverview('student-life');
	return <StudentLifeOverview data={data} />;
}
