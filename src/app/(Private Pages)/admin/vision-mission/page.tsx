import { getVisionMission } from '@/app/(Private Pages)/actions/vision-mission';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import VisionMissionEditor from './components/VisionMissionEditor';

export default async function VisionMissionAdminPage() {
	await requireAdmin();
	const visionData = await getVisionMission(VISION_MISSION_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Vision content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Vision Content</h2>
				<VisionMissionEditor 
					initialData={visionData} 
					pageSlug={VISION_MISSION_SLUG} 
				/>
			</div>
		</div>
	);
}
