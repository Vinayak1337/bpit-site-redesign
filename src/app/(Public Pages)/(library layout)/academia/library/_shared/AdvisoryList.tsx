import type { AdvisoryListData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, UserCircle } from 'lucide-react';

export default function AdvisoryList({ data }: { data: AdvisoryListData }) {
	return (
		<section className='py-8 md:py-12'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
				{data.items.map((m, i) => (
					<Card key={i} className='border-slate-200'>
						<CardContent className='p-5 flex gap-4'>
							<div className='shrink-0'>
								{m.avatar ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={m.avatar}
										alt={m.name}
										className='h-16 w-16 rounded-full object-cover border border-slate-200'
									/>
								) : (
									<div className='h-16 w-16 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center'>
										<UserCircle className='h-7 w-7' />
									</div>
								)}
							</div>
							<div className='min-w-0 space-y-1'>
								<div className='flex items-start justify-between gap-2'>
									<h3 className='text-base sm:text-lg font-semibold text-slate-900'>
										{m.name}
									</h3>
									{m.role ? (
										<Badge variant='secondary' className='shrink-0'>
											{m.role}
										</Badge>
									) : null}
								</div>
								{m.designation ? (
									<p className='text-sm text-slate-600'>{m.designation}</p>
								) : null}
								<div className='flex flex-wrap gap-3 pt-2 text-xs text-slate-600'>
									{m.email ? (
										<span className='inline-flex items-center gap-1'>
											<Mail className='h-3.5 w-3.5' /> {m.email}
										</span>
									) : null}
									{m.phone ? (
										<span className='inline-flex items-center gap-1'>
											<Phone className='h-3.5 w-3.5' /> {m.phone}
										</span>
									) : null}
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
