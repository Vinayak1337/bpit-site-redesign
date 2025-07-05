import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Science & Engineering | BPIT',
  description: 'Explore the Computer Science & Engineering department at BPIT. World-class education, cutting-edge research, and outstanding placement opportunities.',
  keywords: 'CSE, Computer Science, Engineering, BPIT, Technology, Programming, AI, Machine Learning',
};

export default function CSELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
