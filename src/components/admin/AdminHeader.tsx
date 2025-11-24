'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink } from 'lucide-react';

export default function AdminHeader() {
	const pathname = usePathname();

	const getTargetUrl = () => {
		if (!pathname.startsWith('/admin')) return '/';

		// Remove /admin prefix
		const subPath = pathname.replace(/^\/admin/, '');

		// If we are at root /admin or /admin/, return /
		if (!subPath || subPath === '/') return '/';

		// Special case: /admin/home -> /
		if (subPath === '/home') return '/';

		// Restricted paths that don't have public equivalents
		const restrictedPrefixes = ['/pages', '/logs'];
		
		if (restrictedPrefixes.some(prefix => subPath.startsWith(prefix))) {
			return '/';
		}

		// Otherwise, return the subPath (e.g. /about)
		return subPath;
	};

	const targetUrl = getTargetUrl();

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

