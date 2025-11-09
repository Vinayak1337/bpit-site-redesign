import { getVisionMission, getMission, getQualityPolicy } from '@/app/(Private Pages)/actions/vision-mission';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import VisionMissionEditor from './components/VisionMissionEditor';
import MissionEditor from './components/MissionEditor';
import QualityPolicyEditor from './components/QualityPolicyEditor';

export default async function VisionMissionAdminPage() {
	const visionData = await getVisionMission(VISION_MISSION_SLUG);
	const missionData = await getMission(VISION_MISSION_SLUG);
	const qualityPolicyData = await getQualityPolicy(VISION_MISSION_SLUG);

	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold text-gray-900'>
					Edit Vision, Mission & Quality Policy
				</h1>
			</div>
			
			{/* Vision Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Vision Content
				</h2>
				<VisionMissionEditor 
					initialData={visionData} 
					pageSlug={VISION_MISSION_SLUG} 
				/>
			</div>

			{/* Mission Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Mission Content
				</h2>
				<MissionEditor 
					initialData={missionData} 
					pageSlug={VISION_MISSION_SLUG} 
				/>
			</div>

			{/* Quality Policy Section */}
			<div className='space-y-4'>
				<h2 className='text-xl font-semibold text-gray-800 border-b pb-2'>
					Quality Policy Content
				</h2>
				<QualityPolicyEditor 
					initialData={qualityPolicyData} 
					pageSlug={VISION_MISSION_SLUG} 
				/>
			</div>
		</div>
	);
}