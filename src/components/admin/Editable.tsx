'use client';

import React, { useState } from 'react';
import { useEditable } from '@/providers/editable';

export function Editable<T>({
	label,
	value,
	Form,
	onSubmit,
	children
}: {
	label: string;
	value: T;
	Form: (p: { initial: T; onSave: (v: T) => Promise<void>; onClose: () => void }) => React.ReactElement;
	onSubmit: (v: T) => Promise<void>;
	children: React.ReactNode;
}) {
	const { isEditing, openModal, closeModal } = useEditable();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		if (!isEditing) return;
		setOpen(true);
		openModal(
			<Form
				initial={value}
				onSave={async v => {
					await onSubmit(v);
					setOpen(false);
					closeModal();
				}}
				onClose={() => {
					setOpen(false);
					closeModal();
				}}
			/>
		);
	};

	return (
		<div
			style={
				isEditing
					? {
						outline: '1px dashed #888',
						position: 'relative',
						cursor: 'pointer'
					}
					: undefined
			}
			onClick={handleOpen}>
			{children}
			{isEditing && (
				<span
					style={{
						position: 'absolute',
						top: 4,
						right: 6,
						fontSize: 10,
						background: '#fff',
						padding: '2px 6px',
						borderRadius: 4,
						border: '1px solid #ccc'
					}}>
					{label}
				</span>
			)}
		</div>
	);
}


