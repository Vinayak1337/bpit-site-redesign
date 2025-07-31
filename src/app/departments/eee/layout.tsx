import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Electrical & Electronics Engineering | BPIT',
  description: 'Explore the Electrical & Electronics Engineering department at BPIT. World-class education, cutting-edge research, and outstanding placement opportunities.',
  keywords: 'EEE, Electrical, Electronics, Engineering, BPIT, Technology, Power Systems, Control Systems',
};

export default function EEELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
