import { getCampusFacilities } from '@/app/(Private Pages)/actions/student-life';
import CampusFacilities from '@/components/student-life/CampusFacilities';

export default async function CampusFacilitiesPage() {
	const data = await getCampusFacilities('student-life-campus-facilities');
	return <CampusFacilities data={data} />;
}
