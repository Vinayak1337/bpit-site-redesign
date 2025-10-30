import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-900'>
			<div className='min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]'>
				<aside className='hidden md:block border-r border-slate-200 bg-white/70 backdrop-blur-sm'>
					<div className='h-16 px-5 flex items-center border-b border-slate-200'>
						<span className='font-semibold text-slate-800'>BPIT Admin</span>
					</div>
					<nav className='p-4 space-y-2'>
						<a href='/admin' className='block px-3 py-2 rounded-md hover:bg-slate-100'>Dashboard</a>
						<a href='/admin/pages' className='block px-3 py-2 rounded-md hover:bg-slate-100'>Pages</a>
						<a href='/admin/media' className='block px-3 py-2 rounded-md hover:bg-slate-100'>Media</a>
						<a href='/admin/users' className='block px-3 py-2 rounded-md hover:bg-slate-100'>Users</a>
					</nav>
				</aside>
				<div className='flex flex-col min-h-screen'>
					<header className='h-16 bg-white/70 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 md:px-6'>
						<div className='md:hidden font-semibold'>BPIT Admin</div>
						<div className='flex items-center gap-2'>
							<a href='/' className='text-sm text-slate-600 hover:text-slate-900'>View Site</a>
						</div>
					</header>
					<main className='p-4 md:p-6'>{children}</main>
				</div>
			</div>
		</div>
	);
}

 
