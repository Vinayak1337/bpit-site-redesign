import { getMandatoryDisclosure } from '@/app/(Private Pages)/actions/mandatory-disclosure';
import DisclosureHeroSection from '@/components/mandatory-disclosure/DisclosureHeroSection';
import DisclosureListSection from '@/components/mandatory-disclosure/DisclosureListSection';

export const metadata = {
	title: 'Mandatory Disclosure | BPIT',
	description:
		'Mandatory Disclosure documents for Bhagwan Parshuram Institute of Technology (BPIT) including AICTE approvals, fee structures, and committee details.'
};

export default async function MandatoryDisclosurePage() {
	const data = await getMandatoryDisclosure();

	return (
		<div className='min-h-screen bg-gray-50'>
			<DisclosureHeroSection data={data} />
			<DisclosureListSection data={data} />
		</div>
	);
}
