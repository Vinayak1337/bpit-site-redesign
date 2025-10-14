'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type EditableContextValue = {
	isEditing: boolean;
	setEditing: (value: boolean) => void;
	openModal: (content: React.ReactNode) => void;
	closeModal: () => void;
	modalContent: React.ReactNode | null;
};

const EditableContext = createContext<EditableContextValue | null>(null);

export function EditableProvider({ children }: { children: React.ReactNode }) {
	const [isEditing, setEditing] = useState(false);
	const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		if (params.get('admin') === '1') setEditing(true);
	}, []);

	const value = useMemo(
		() => ({
			isEditing,
			setEditing,
			openModal: setModalContent,
			closeModal: () => setModalContent(null),
			modalContent
		}),
		[isEditing, modalContent]
	);

	return (
		<EditableContext.Provider value={value}>
			{children}
			{modalContent}
		</EditableContext.Provider>
	);
}

export function useEditable() {
	const ctx = useContext(EditableContext);
	if (!ctx) throw new Error('useEditable must be used within EditableProvider');
	return ctx;
}




