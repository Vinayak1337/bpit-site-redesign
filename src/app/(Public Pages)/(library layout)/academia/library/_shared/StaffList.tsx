import type { StaffListData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';

export default function StaffList({ data }: { data: StaffListData }) {
	return (
		<section className='py-8 md:py-12'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
				{data.items.map((s, i) => (
					<Card key={i} className='border-slate-200'>
						<CardContent className='p-5 flex gap-4'>
							<div className='shrink-0'>
								{s.avatar ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={s.avatar}
										alt={s.name}
										className='h-16 w-16 rounded-full object-cover border border-slate-200'
									/>
								) : (
									<div className='h-16 w-16 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center'>
										<User className='h-7 w-7' />
									</div>
								)}
							</div>
							<div className='min-w-0 space-y-1'>
								<h3 className='text-base sm:text-lg font-semibold text-slate-900'>
									{s.name}
								</h3>
								<p className='text-sm text-blue-700'>{s.role}</p>
								{s.qualification ? (
									<p className='text-xs text-slate-500'>{s.qualification}</p>
								) : null}
								{s.specialization ? (
									<p className='text-xs text-slate-600'>{s.specialization}</p>
								) : null}
								<div className='flex flex-wrap gap-3 pt-2 text-xs text-slate-600'>
									{s.email ? (
										<span className='inline-flex items-center gap-1'>
											<Mail className='h-3.5 w-3.5' /> {s.email}
										</span>
									) : null}
									{s.phone ? (
										<span className='inline-flex items-center gap-1'>
											<Phone className='h-3.5 w-3.5' /> {s.phone}
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
