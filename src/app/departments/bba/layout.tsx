import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bachelor of Business Administration | BPIT',
  description: 'Explore the Bachelor of Business Administration program at BPIT. World-class business education, industry exposure, and outstanding placement opportunities.',
  keywords: 'BBA, Business Administration, BPIT, Management, Marketing, Finance, Human Resources',
};

export default function BBALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
