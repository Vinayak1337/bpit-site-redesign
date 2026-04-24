import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Departments',
	description: 'Academic departments at BPIT — programmes, faculty, research areas and departmental highlights across engineering branches.',
	alternates: { canonical: '/departments' }
};



const DepartmentsLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default DepartmentsLayout;
