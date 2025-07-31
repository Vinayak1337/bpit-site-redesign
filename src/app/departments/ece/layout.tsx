import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electronics & Communication Engineering | BPIT',
  description: 'Explore the Electronics & Communication Engineering department at BPIT. World-class education, cutting-edge research, and outstanding placement opportunities.',
  keywords: 'ECE, Electronics, Communication, Engineering, BPIT, Technology, Telecommunications, Signal Processing',
};

export default function ECELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
