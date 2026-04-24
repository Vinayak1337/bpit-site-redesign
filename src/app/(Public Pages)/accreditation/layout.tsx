import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Accreditation',
	description: 'Accreditations, approvals and affiliations held by BPIT — NBA, AICTE, GGSIPU and other recognitions of academic quality.',
	alternates: { canonical: '/accreditation' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
