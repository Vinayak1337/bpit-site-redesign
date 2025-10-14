'use client';

import React from 'react';
import { useEditable } from '@/providers/editable';

export default function AdminToolbar() {
	const { isEditing, setEditing } = useEditable();
	return (
		<div
			style={{
				position: 'fixed',
				bottom: 16,
				right: 16,
				zIndex: 9998
			}}>
			<button
				onClick={() => setEditing(!isEditing)}
				className={`px-3 py-2 rounded shadow text-sm ${
					isEditing ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'
				}`}>\
				{isEditing ? 'Editing: ON' : 'Editing: OFF'}
			</button>
		</div>
	);
}




