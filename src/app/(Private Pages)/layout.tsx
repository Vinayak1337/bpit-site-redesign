import Link from 'next/link';
import React from 'react';
import '../(Public Pages)/globals.css';

export default function AdminLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1'
				/>
				<meta name='robots' content='noindex, nofollow' />
				<meta name='theme-color' content='#1e3a8a' />
				<title>BPIT Admin</title>
				<link rel='icon' href='/favicon.ico?v=2' />
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body className='min-h-screen bg-gradient-to-br from-slate-50 to-white text-slate-900'>
				<div className='flex flex-col min-h-screen'>
					<header className='h-16 bg-white/70 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 md:px-6'>
						<div className='flex items-center gap-6'>
							<span className='font-semibold text-slate-800'>BPIT Admin</span>
							<nav className='hidden md:flex items-center gap-1'>
								<Link
									href='/admin'
									className='px-3 py-2 rounded-md hover:bg-slate-100'>
									Dashboard
								</Link>
								<Link
									href='/admin/pages'
									className='px-3 py-2 rounded-md hover:bg-slate-100'>
									Pages
								</Link>
								<Link
									href='/admin/media'
									className='px-3 py-2 rounded-md hover:bg-slate-100'>
									Media
								</Link>
								<Link
									href='/admin/logs'
									className='px-3 py-2 rounded-md hover:bg-slate-100'>
									Logs
								</Link>
							</nav>
						</div>
						<div className='flex items-center gap-2'>
							<Link
								href='/'
								className='text-sm text-slate-600 hover:text-slate-900'>
								View Site
							</Link>
						</div>
					</header>
					<main className='p-4 md:p-6'>{children}</main>
				</div>
			</body>
		</html>
	);
}
