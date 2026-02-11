'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { resolvePublicPathFromAdminPath } from '@/data/admin-page-map';

export default function AdminHeader() {
	const pathname = usePathname();
	const targetUrl = resolvePublicPathFromAdminPath(pathname);

	return (
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
						href='/admin/logs'
						className='px-3 py-2 rounded-md hover:bg-slate-100'>
						Logs
					</Link>
				</nav>
			</div>
			<div className='flex items-center gap-2'>
				<Link
					href={targetUrl}
					target='_blank'
					className='text-sm text-slate-600 hover:text-slate-900 flex items-center gap-2'>
					View Site
					<ExternalLink className='w-4 h-4' />
				</Link>
			</div>
		</header>
	);
}
