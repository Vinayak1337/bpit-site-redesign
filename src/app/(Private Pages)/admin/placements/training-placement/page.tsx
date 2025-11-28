import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getTrainingPlacement, TrainingPlacementData } from '@/app/(Private Pages)/actions/training-placement';
import HeroEditor from './components/HeroEditor';
import DirectorMessageEditor from './components/DirectorMessageEditor';
import TeamEditor from './components/TeamEditor';
import CoordinatorsEditor from './components/CoordinatorsEditor';
import ProgramsEditor from './components/ProgramsEditor';
import ObjectivesEditor from './components/ObjectivesEditor';
import MetricsEditor from './components/MetricsEditor';

const defaultData: TrainingPlacementData = {};

export default async function TrainingPlacementAdminPage() {
	await requireAdmin();
	const data = await getTrainingPlacement();
	const initialData = data ?? defaultData;

	return (
		<div className='space-y-0'>
			<div className='bg-blue-50 border-b border-blue-200 text-blue-900 p-3 text-center text-sm'>
				Select any section to start editing
			</div>
			<HeroEditor initialData={initialData} pageSlug="training-placement" />
			<DirectorMessageEditor initialData={initialData} pageSlug="training-placement" />
			<TeamEditor initialData={initialData} pageSlug="training-placement" />
			<CoordinatorsEditor initialData={initialData} pageSlug="training-placement" />
			<ProgramsEditor initialData={initialData} pageSlug="training-placement" />
			<ObjectivesEditor initialData={initialData} pageSlug="training-placement" />
			<MetricsEditor initialData={initialData} pageSlug="training-placement" />
		</div>
	);
}
