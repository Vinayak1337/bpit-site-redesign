import type { ReactNode } from 'react';

export default function AdminAdmissionsLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className='overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg'>
			{children}
		</div>
	);
}
