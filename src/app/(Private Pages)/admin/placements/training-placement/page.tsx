import { Suspense } from 'react';
import TrainingPlacementEditor from './components/TrainingPlacementEditor';

export default function TrainingPlacementAdminPage() {
	return (
		<div className='min-h-screen bg-slate-50'>
			<div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-slate-900'>
						Training & Placement Management
					</h1>
					<p className='mt-2 text-sm text-slate-600'>
						Manage training and placement content, team members, departments, and programs.
					</p>
				</div>

				<Suspense
					fallback={
						<div className='flex min-h-[400px] items-center justify-center'>
							<div className='text-slate-600'>Loading...</div>
						</div>
					}>
					<TrainingPlacementEditor />
				</Suspense>
			</div>
		</div>
	);
}
