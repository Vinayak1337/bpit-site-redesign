import { getGrievanceCell } from '@/app/(Private Pages)/actions/student-life';
import StudentGrievance from '@/components/student-life/StudentGrievance';

export default async function StudentGrievanceCellPage() {
	const data = await getGrievanceCell('student-life-student-grievance-cell');
	return <StudentGrievance data={data} />;
}
