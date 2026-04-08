import React from 'react';
import { getMission } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import MissionSection from '../components/MissionSection';

export default async function MissionPage() {
	const missionData = await getMission(VISION_MISSION_SLUG);

	return <MissionSection data={missionData} />;
}
