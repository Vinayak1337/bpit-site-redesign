import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Information Technology | BPIT',
  description: 'Explore the Information Technology department at BPIT. World-class education, cutting-edge research, and outstanding placement opportunities.',
  keywords: 'IT, Information Technology, BPIT, Technology, Software Development, Database Management, Networking',
};

export default function ITLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
