import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-900'>
			<div className='flex flex-col min-h-screen'>
				<header className='h-16 bg-white/70 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 md:px-6'>
					<div className='flex items-center gap-6'>
						<span className='font-semibold text-slate-800'>BPIT Admin</span>
						<nav className='hidden md:flex items-center gap-1'>
							<a href='/admin' className='px-3 py-2 rounded-md hover:bg-slate-100'>Dashboard</a>
							<a href='/admin/pages' className='px-3 py-2 rounded-md hover:bg-slate-100'>Pages</a>
							<a href='/admin/media' className='px-3 py-2 rounded-md hover:bg-slate-100'>Media</a>
							<a href='/admin/logs' className='px-3 py-2 rounded-md hover:bg-slate-100'>Logs</a>
						</nav>
					</div>
					<div className='flex items-center gap-2'>
						<a href='/' className='text-sm text-slate-600 hover:text-slate-900'>View Site</a>
					</div>
				</header>
				<main className='p-4 md:p-6'>{children}</main>
			</div>
		</div>
	);
}

 
