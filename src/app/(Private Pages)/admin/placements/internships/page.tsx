import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getInternshipsData } from '@/app/(Private Pages)/actions/internships';
import HeroEditor from './components/HeroEditor';
import StatsEditor from './components/StatsEditor';
import BenefitsEditor from './components/BenefitsEditor';
import PartnersEditor from './components/PartnersEditor';
import ProcessEditor from './components/ProcessEditor';
import ContactEditor from './components/ContactEditor';

export const dynamic = 'force-dynamic';

export default async function InternshipsManagementPage() {
	await requireAdmin();
	
	const data = await getInternshipsData();
	
	if (!data) {
		return (
			<div className='container mx-auto py-8'>
				<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
					<h2 className='text-red-800 font-semibold'>Data Loading Error</h2>
					<p className='text-red-600'>Failed to load internships data. Please check if the data exists in the database.</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
			<div className='container mx-auto px-4 py-8'>
				<div className='mb-8'>
					<h1 className='text-4xl font-bold text-gray-900 mb-2'>
						Internships Management
					</h1>
					<p className='text-xl text-gray-600'>
						Click on any section below to edit its content
					</p>
				</div>

				<div className='space-y-8'>
					<HeroEditor initialData={data} pageSlug='internships' />
					<StatsEditor initialData={data} pageSlug='internships' />
					<BenefitsEditor initialData={data} pageSlug='internships' />
					<PartnersEditor initialData={data} pageSlug='internships' />
					<ProcessEditor initialData={data} pageSlug='internships' />
					<ContactEditor initialData={data} pageSlug='internships' />
				</div>
			</div>
		</div>
	);
}
