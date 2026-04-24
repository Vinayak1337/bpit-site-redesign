import { getCampusFacilities } from '@/app/(Private Pages)/actions/student-life';
import CampusFacilities from '@/components/student-life/CampusFacilities';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Campus Facilities',
	description: 'Facilities on BPIT campus — labs, library, sports, cafeteria, transport, Wi-Fi and learning spaces.',
	alternates: { canonical: '/student-life/campus-facilities' }
};



export default async function CampusFacilitiesPage() {
	const data = await getCampusFacilities('student-life-campus-facilities');
	return <CampusFacilities data={data} />;
}
