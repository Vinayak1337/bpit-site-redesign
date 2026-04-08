import NavPagesGrid from './components/NavPagesGrid';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

export default async function AdminPagesSelector() {
	await requireAdmin();
	return (
		<div className='min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white'>
			<div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-blue-100 p-6'>
				<div className='mb-6'>
					<h1 className='text-2xl font-semibold text-blue-900'>
						Public Pages and Admin Coverage
					</h1>
					<p className='text-sm text-blue-700 mt-1'>
						Open any live page, then use mapped admin editors to click and edit sections.
					</p>
				</div>
				<NavPagesGrid />
			</div>
		</div>
	);
}
