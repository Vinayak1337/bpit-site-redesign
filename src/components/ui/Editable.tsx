'use client';

import React, { useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet';

type EditableProps = {
	label: string;
	formContent: React.ReactNode;
	children: React.ReactNode;
};

export default function Editable({
	label,
	formContent,
	children
}: EditableProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className='relative group'>
			{/* Content */}
			<div className='relative z-0 rounded-lg'>{children}</div>
			{/* Hover/Active Overlay (captures interactions) */}
			<div
				role='button'
				tabIndex={0}
				onClick={() => setOpen(true)}
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen(true);
					}
				}}
				aria-label={`Edit ${label}`}
				className={
					`absolute inset-0 rounded-lg z-10 transition-all duration-200 ` +
					(open
						? 'border-2 border-blue-600 ring-4 ring-blue-400/40 shadow-[0_8px_30px_rgba(37,99,235,0.35)]'
						: 'border-2 border-transparent group-hover:border-blue-400 group-hover:ring-4 group-hover:ring-blue-200/50 group-hover:shadow-[0_8px_24px_rgba(37,99,235,0.25)]')
				}
			/>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side='right' className='w-full sm:max-w-md overflow-y-auto'>
					<SheetHeader>
						<SheetTitle>Edit: {label}</SheetTitle>
					</SheetHeader>
					<div className='p-4 space-y-4 max-h-full overflow-y-auto'>{formContent}</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
