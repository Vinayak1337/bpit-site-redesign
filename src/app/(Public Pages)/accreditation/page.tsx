import { getAccreditationData } from '@/app/(Private Pages)/actions/accreditation';
import AccreditationClient from '@/components/accreditation/accreditation-client';
import { ACCREDITATION_PAGE_SLUG } from '@/lib/page-slugs';

const AccreditationPage = async () => {
	const data = await getAccreditationData(ACCREDITATION_PAGE_SLUG);
	return <AccreditationClient data={data} />;
};

export default AccreditationPage;
