'use client';

import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
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
	presentation?: 'sheet' | 'dialog';
	contentClassName?: string;
};

export default function Editable({
	label,
	formContent,
	children,
	presentation = 'sheet',
	contentClassName
}: EditableProps) {
	const [open, setOpen] = useState(false);

	const overlay = (
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
	);

	return (
		<div className='relative group'>
			<div className='relative z-0 rounded-lg'>{children}</div>
			{overlay}
			{presentation === 'dialog' ? (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent
						showCloseButton
						className={`flex h-[92vh] w-[96vw] max-w-[96vw] flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200 p-0 shadow-2xl sm:max-w-[96vw] ${contentClassName ?? ''}`}>
						<DialogHeader className='border-b border-slate-200 px-6 py-4'>
							<DialogTitle>Edit: {label}</DialogTitle>
						</DialogHeader>
						<div className='min-h-0 flex-1 overflow-y-auto px-6 py-5'>{formContent}</div>
					</DialogContent>
				</Dialog>
			) : (
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetContent
						side='right'
						className={`w-full overflow-y-auto sm:max-w-xl ${contentClassName ?? ''}`}>
						<SheetHeader>
							<SheetTitle>Edit: {label}</SheetTitle>
						</SheetHeader>
						<div className='max-h-full space-y-4 p-4 overflow-y-auto'>{formContent}</div>
					</SheetContent>
				</Sheet>
			)}
		</div>
	);
}
