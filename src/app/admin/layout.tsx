import type { ReactNode } from 'react';
import { EditableProvider } from '@/providers/editable';
import AdminToolbar from '@/components/admin/AdminToolbar';

export default function AdminLayout({ children }: { children: ReactNode }) {
	return (
		<EditableProvider>
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-7xl mx-auto p-4">
					<h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
					{children}
				</div>
				<AdminToolbar />
			</div>
		</EditableProvider>
	);
}


