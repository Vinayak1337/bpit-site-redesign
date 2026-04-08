import { getStudentLifeOverview } from '@/app/(Private Pages)/actions/student-life';
import StudentLifeOverview from '@/components/student-life/StudentLifeOverview';

export default async function StudentLifePage() {
	const data = await getStudentLifeOverview('student-life');
	return <StudentLifeOverview data={data} />;
}
