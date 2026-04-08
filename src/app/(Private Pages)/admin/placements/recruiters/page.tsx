import { Suspense } from 'react';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getRecruitersData } from '@/app/(Private Pages)/actions/recruiters';
import HeroEditor from './components/HeroEditor';
import StatsEditor from './components/StatsEditor';
import PartnersEditor from './components/PartnersEditor';
import CTAEditor from './components/CTAEditor';

export default async function AdminRecruitersPage() {
	await requireAdmin();
	const recruitersData = await getRecruitersData();

	if (!recruitersData) {
		return (
			<div className='container mx-auto py-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						Recruiters Management
					</h1>
					<p className='text-red-600 mt-2'>
						No recruiters data found. Please run the seed script.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto py-8'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold text-gray-900'>
					Recruiters Management
				</h1>
				<p className='text-gray-600 mt-2'>
					Select any section below to start editing
				</p>
			</div>

			<div className='space-y-8'>
				<Suspense fallback={<div className='text-slate-600'>Loading Hero...</div>}>
					<HeroEditor initialData={recruitersData} pageSlug='recruiters' />
				</Suspense>

				<Suspense fallback={<div className='text-slate-600'>Loading Stats...</div>}>
					<StatsEditor initialData={recruitersData} pageSlug='recruiters' />
				</Suspense>

				<Suspense fallback={<div className='text-slate-600'>Loading Partners...</div>}>
					<PartnersEditor initialData={recruitersData} pageSlug='recruiters' />
				</Suspense>

				<Suspense fallback={<div className='text-slate-600'>Loading CTA...</div>}>
					<CTAEditor initialData={recruitersData} pageSlug='recruiters' />
				</Suspense>
			</div>
		</div>
	);
}
