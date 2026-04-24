import { getDepartmentsData } from '@/app/(Private Pages)/actions/departments';
import DepartmentsClient from '@/components/departments/departments-client';
import { DEPARTMENTS_PAGE_SLUG } from '@/lib/page-slugs';

const DepartmentsPage = async () => {
	const data = await getDepartmentsData(DEPARTMENTS_PAGE_SLUG);
	return <DepartmentsClient data={data} />;
};

export default DepartmentsPage;
