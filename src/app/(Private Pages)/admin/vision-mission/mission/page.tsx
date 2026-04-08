import { getMission } from '@/app/(Private Pages)/actions/vision-mission';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { VISION_MISSION_SLUG } from '@/lib/page-slugs';
import MissionEditor from '../components/MissionEditor';

export default async function AdminMissionPage() {
	await requireAdmin();
	const missionData = await getMission(VISION_MISSION_SLUG);

	return (
		<div className='space-y-8'>
			<div className='bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Mission content below. Changes apply immediately after saving.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Mission Content</h2>
				<MissionEditor 
					initialData={missionData} 
					pageSlug={VISION_MISSION_SLUG} 
				/>
			</div>
		</div>
	);
}

