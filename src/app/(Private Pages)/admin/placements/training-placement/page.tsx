import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getTrainingPlacement,
	TrainingPlacementData
} from '@/app/(Private Pages)/actions/training-placement';
import HeroEditor from './components/HeroEditor';
import DirectorMessageEditor from './components/DirectorMessageEditor';
import TeamEditor from './components/TeamEditor';
import CoordinatorsEditor from './components/CoordinatorsEditor';
import ProgramsEditor from './components/ProgramsEditor';
import ObjectivesEditor from './components/ObjectivesEditor';
import MetricsEditor from './components/MetricsEditor';

const defaultData: TrainingPlacementData = {
	hero: {
		icon: 'GraduationCap',
		title: 'Training & Placement Cell',
		subtitle: 'Bridging the gap between academia and industry',
		gradient: 'from-blue-600 to-purple-600',
		iconColor: 'text-white',
		textColor: 'text-white'
	},
	directorMessage: {
		name: 'Director',
		position: 'Director - Training & Placement',
		initials: 'D',
		gradientColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
		message1: '',
		message2: ''
	},
	teamTitle: 'Our Team',
	teamDescription: 'Meet our dedicated team',
	teamMembers: [],
	departmentsTitle: 'Department Coordinators',
	departmentsDescription: 'Our department-wise coordinators',
	departments: [],
	trainingTitle: 'Training Programs',
	trainingDescription: 'Our comprehensive training programs',
	trainingPrograms: [],
	objectivesTitle: 'Our Objectives',
	objectivesDescription: 'What we aim to achieve',
	objectives: [],
	statisticsTitle: 'Placement Statistics',
	statisticsDescription: 'Our achievements in numbers',
	statistics: []
};

export default async function TrainingPlacementAdminPage() {
	await requireAdmin();
	const fetchedData = await getTrainingPlacement();
	const data: TrainingPlacementData = fetchedData || defaultData;

	if (!data) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<div className='text-center'>
					<h2 className='text-xl font-semibold text-slate-900 mb-2'>
						No Data Found
					</h2>
					<p className='text-slate-600'>
						Please run the seed script to populate training placement data.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-0'>
			<div className='bg-blue-50 border-b border-blue-200 text-blue-900 p-3 text-center text-sm'>
				Select any section to start editing
			</div>
			<HeroEditor initialData={data} pageSlug='training-placement' />
			<DirectorMessageEditor initialData={data} pageSlug='training-placement' />
			<TeamEditor initialData={data} pageSlug='training-placement' />
			<CoordinatorsEditor initialData={data} pageSlug='training-placement' />
			<ProgramsEditor initialData={data} pageSlug='training-placement' />
			<ObjectivesEditor initialData={data} pageSlug='training-placement' />
			<MetricsEditor initialData={data} pageSlug='training-placement' />
		</div>
	);
}
