import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getTrainingPlacement } from '@/app/(Private Pages)/actions/training-placement';
import HeroEditor from './components/HeroEditor';
import DirectorMessageEditor from './components/DirectorMessageEditor';
import TeamEditor from './components/TeamEditor';
import CoordinatorsEditor from './components/CoordinatorsEditor';
import ProgramsEditor from './components/ProgramsEditor';
import ObjectivesEditor from './components/ObjectivesEditor';
import MetricsEditor from './components/MetricsEditor';

export default async function TrainingPlacementAdminPage() {
	await requireAdmin();
	const data = await getTrainingPlacement() ?? {};

	return (
		<div className='space-y-0'>
			<div className='bg-blue-50 border-b border-blue-200 text-blue-900 p-3 text-center text-sm'>
				Select any section to start editing
			</div>
			<HeroEditor initialData={data} pageSlug="training-placement" />
			<DirectorMessageEditor initialData={data} pageSlug="training-placement" />
			<TeamEditor initialData={data} pageSlug="training-placement" />
			<CoordinatorsEditor initialData={data} pageSlug="training-placement" />
			<ProgramsEditor initialData={data} pageSlug="training-placement" />
			<ObjectivesEditor initialData={data} pageSlug="training-placement" />
			<MetricsEditor initialData={data} pageSlug="training-placement" />
		</div>
	);
}
