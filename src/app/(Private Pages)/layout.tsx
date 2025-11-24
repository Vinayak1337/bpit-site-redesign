import React from 'react';
import '../(Public Pages)/globals.css';
import AdminHeader from '@/components/admin/AdminHeader';

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
					<AdminHeader />
					<main className='p-4 md:p-6'>{children}</main>
				</div>
			</body>
		</html>
	);
}
