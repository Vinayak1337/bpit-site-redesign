import NavPagesGrid from './components/NavPagesGrid';

export default async function AdminPagesSelector() {
	return (
		<div className='min-h-screen p-8 bg-gradient-to-br from-blue-50 to-white'>
			<div className='max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-blue-100 p-6'>
				<div className='mb-6'>
					<h1 className='text-2xl font-semibold text-blue-900'>
						Select a Page to Edit
					</h1>
					<p className='text-sm text-blue-700 mt-1'>
						Use the dropdowns or quick tiles to choose a page.
					</p>
				</div>
				<NavPagesGrid />
			</div>
		</div>
	);
}
