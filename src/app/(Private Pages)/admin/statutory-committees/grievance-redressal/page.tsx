import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

export default async function GrievanceRedressalAdminPage() {
	await requireAdmin();

	return (
		<div className='space-y-8'>
			<div className='bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-900 shadow-sm'>
				This section is under construction. Content editing will be available soon.
			</div>
			
			<div>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Grievance Redressal Cell</h2>
				<p className="text-gray-600">The editor for this page has not been implemented yet.</p>
			</div>
		</div>
	);
}

