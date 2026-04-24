import { getAcademiaOverview } from '@/app/(Private Pages)/actions/academia-overview';
import AcademiaOverviewClient from '@/components/academia/academia-overview-client';
import { ACADEMIA_PAGE_SLUG } from '@/lib/page-slugs';

const AcademiaOverviewPage = async () => {
	const data = await getAcademiaOverview(ACADEMIA_PAGE_SLUG);
	return <AcademiaOverviewClient data={data} />;
};

export default AcademiaOverviewPage;
