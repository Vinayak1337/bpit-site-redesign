import { getCodeOfConduct } from '@/app/(Private Pages)/actions/student-life';
import CodeOfConduct from '@/components/student-life/CodeOfConduct';

export default async function CodeOfConductPage() {
	const data = await getCodeOfConduct('student-life-code-of-conduct');
	return <CodeOfConduct data={data} />;
}
