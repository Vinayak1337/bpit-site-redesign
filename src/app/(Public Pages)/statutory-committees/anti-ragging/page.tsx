import { getAntiRagging } from '@/app/(Private Pages)/actions/statutory-committees';
import AntiRaggingView from '@/components/statutory-committees/AntiRaggingView';

export const metadata = {
	title: 'Anti-Ragging Committee | BPIT',
	description:
		'BPIT Anti-Ragging Committee - Ensuring a safe and ragging-free campus environment.'
};

export default async function AntiRaggingPage() {
	const data = await getAntiRagging('statutory-committees-anti-ragging');
	return <AntiRaggingView data={data} />;
}
