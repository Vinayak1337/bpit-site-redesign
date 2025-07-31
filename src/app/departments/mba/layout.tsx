import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master of Business Administration | BPIT',
  description: 'Explore the Master of Business Administration program at BPIT. Advanced business education, leadership development, and outstanding career opportunities.',
  keywords: 'MBA, Business Administration, BPIT, Management, Leadership, Strategy, Entrepreneurship',
};

export default function MBALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
