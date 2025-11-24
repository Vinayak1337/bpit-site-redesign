import React from 'react';
import { getVisionMission } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import VisionMissionSection from './components/VisionMissionSection';

export default async function VisionPage() {
	const data = await getVisionMission(VISION_MISSION_SLUG);

	return <VisionMissionSection data={data} />;
}
