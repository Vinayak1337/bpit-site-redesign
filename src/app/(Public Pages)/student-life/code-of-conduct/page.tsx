import { getCodeOfConduct } from '@/app/(Private Pages)/actions/student-life';
import CodeOfConduct from '@/components/student-life/CodeOfConduct';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Code of Conduct',
	description: 'Student code of conduct at BPIT outlining discipline, academic integrity and campus behaviour expectations.',
	alternates: { canonical: '/student-life/code-of-conduct' }
};



export default async function CodeOfConductPage() {
	const data = await getCodeOfConduct('student-life-code-of-conduct');
	return <CodeOfConduct data={data} />;
}
