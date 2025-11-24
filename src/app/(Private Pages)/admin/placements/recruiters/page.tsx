import { Suspense } from 'react';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import RecruitersEditor from './components/RecruitersEditor';

export default async function AdminRecruitersPage() {
	await requireAdmin();
	return (
		<div className='container mx-auto py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900'>
					Recruiters Management
				</h1>
				<p className='text-gray-600 mt-2'>
					Edit recruiter companies, stats, categories, and partnership information
				</p>
			</div>

			<Suspense
				fallback={
					<div className='flex min-h-[400px] items-center justify-center'>
						<div className='text-slate-600'>Loading...</div>
					</div>
				}>
				<RecruitersEditor />
			</Suspense>
		</div>
	);
}
