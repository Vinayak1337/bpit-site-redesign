import { Suspense } from 'react';
import InternshipsEditor from './components/InternshipsEditor';

export default function InternshipsManagementPage() {
	return (
		<div className='container mx-auto py-8'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-slate-900'>
					Internships Management
				</h1>
				<p className='text-slate-600 mt-2'>
					Edit internship opportunities, stats, benefits, and contact information
				</p>
			</div>

			<Suspense
				fallback={
					<div className='flex items-center justify-center min-h-[400px]'>
						<div className='text-slate-600'>Loading...</div>
					</div>
				}>
				<InternshipsEditor />
			</Suspense>
		</div>
	);
}
