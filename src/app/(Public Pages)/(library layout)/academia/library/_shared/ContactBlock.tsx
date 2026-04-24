import type { ContactData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactBlock({ data }: { data: ContactData }) {
	const items: { icon: React.ReactNode; label: string; value: string }[] = [
		{ icon: <Phone className='h-5 w-5' />, label: 'Phone', value: data.phone },
		{ icon: <Mail className='h-5 w-5' />, label: 'Email', value: data.email },
		{
			icon: <MapPin className='h-5 w-5' />,
			label: 'Address',
			value: data.address
		},
		{ icon: <Clock className='h-5 w-5' />, label: 'Hours', value: data.hours }
	];
	return (
		<section className='py-8 md:py-12 space-y-6'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
				{items
					.filter(x => x.value)
					.map((it, i) => (
						<Card key={i} className='border-slate-200'>
							<CardContent className='p-5 flex gap-4'>
								<div className='h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0'>
									{it.icon}
								</div>
								<div>
									<div className='text-xs uppercase tracking-wide text-slate-500 mb-1'>
										{it.label}
									</div>
									<div className='text-sm text-slate-800 whitespace-pre-line leading-relaxed'>
										{it.value}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
			</div>
			{data.mapEmbed ? (
				<div className='rounded-xl overflow-hidden border border-slate-200 aspect-[16/9]'>
					<iframe
						src={data.mapEmbed}
						className='w-full h-full'
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
						title='Map'
					/>
				</div>
			) : null}
		</section>
	);
}
