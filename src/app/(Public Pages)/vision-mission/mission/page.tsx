import React from 'react';
import { getMission } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import MissionSection from '../components/MissionSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Mission',
	description: 'The mission of BPIT — delivering quality technical education, fostering research, and producing industry-ready engineers with strong ethics.',
	alternates: { canonical: '/vision-mission/mission' }
};



export default async function MissionPage() {
	const missionData = await getMission(VISION_MISSION_SLUG);

	return <MissionSection data={missionData} />;
}
