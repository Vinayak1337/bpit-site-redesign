import type { UsefulLinksListData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function UsefulLinksList({
	data
}: {
	data: UsefulLinksListData;
}) {
	const groups: Record<string, UsefulLinksListData['items']> = {};
	for (const l of data.items) {
		const k = l.category || 'Other';
		if (!groups[k]) groups[k] = [];
		groups[k].push(l);
	}
	const keys = Object.keys(groups);
	return (
		<section className='py-8 md:py-12 space-y-8'>
			{keys.map(k => (
				<div key={k}>
					<h3 className='text-lg sm:text-xl font-semibold text-slate-900 mb-3 flex items-center gap-2'>
						<Badge variant='secondary'>{k}</Badge>
					</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
						{groups[k].map((l, i) => (
							<Card
								key={i}
								className='border-slate-200 hover:border-blue-300 transition-colors'>
								<CardContent className='p-4'>
									<a
										href={l.url || '#'}
										target='_blank'
										rel='noreferrer'
										className='flex items-start gap-3 group'>
										<ExternalLink className='h-5 w-5 text-blue-600 mt-0.5 shrink-0' />
										<div className='min-w-0'>
											<div className='text-sm font-semibold text-slate-900 group-hover:text-blue-700'>
												{l.title}
											</div>
											{l.description ? (
												<p className='text-xs text-slate-600 mt-0.5'>
													{l.description}
												</p>
											) : null}
										</div>
									</a>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			))}
		</section>
	);
}
