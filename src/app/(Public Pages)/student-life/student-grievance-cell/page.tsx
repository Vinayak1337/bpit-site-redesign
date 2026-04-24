import { getGrievanceCell } from '@/app/(Private Pages)/actions/student-life';
import StudentGrievance from '@/components/student-life/StudentGrievance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Student Grievance Cell',
	description: 'Student grievance cell at BPIT — how to raise concerns, contact points and resolution process.',
	alternates: { canonical: '/student-life/student-grievance-cell' }
};



export default async function StudentGrievanceCellPage() {
	const data = await getGrievanceCell('student-life-student-grievance-cell');
	return <StudentGrievance data={data} />;
}
