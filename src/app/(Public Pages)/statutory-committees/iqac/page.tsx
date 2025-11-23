import { getIqac } from '@/app/(Private Pages)/actions/statutory-committees';
import IqacView from '@/components/statutory-committees/IqacView';

export const metadata = {
	title: 'Internal Quality Assurance Cell (IQAC) | BPIT',
	description:
		'Driving Continuous Improvement in Academic Excellence and Institutional Development at BPIT.'
};

export default async function IQACPage() {
	const data = await getIqac('statutory-committees-iqac');
	return <IqacView data={data} />;
}
