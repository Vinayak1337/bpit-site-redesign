import { getInternalComplaints } from '@/app/(Private Pages)/actions/statutory-committees';
import InternalComplaintsView from '@/components/statutory-committees/InternalComplaintsView';

export const metadata = {
  title: 'Internal Complaints Committee | BPIT',
  description: 'Internal Complaints Committee (ICC) at BPIT - Addressing grievances related to sexual harassment and ensuring a safe workplace.'
};

export default async function InternalComplaintsPage() {
  const data = await getInternalComplaints('statutory-committees-internal-complaints');
  return <InternalComplaintsView data={data} />;
}
