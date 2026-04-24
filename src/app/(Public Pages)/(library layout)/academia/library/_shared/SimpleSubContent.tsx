import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SimpleContentData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function pickIcon(name: string | undefined): LucideIcon {
	const map = Icons as unknown as Record<string, LucideIcon>;
	if (name && map[name]) return map[name];
	return Icons.Info;
}

export default function SimpleSubContent({ data }: { data: SimpleContentData }) {
	return (
		<section className='py-8 md:py-12 lg:py-16'>
			<div className='max-w-4xl mx-auto'>
				{data.eyebrow ? (
					<Badge variant='outline' className='mb-3 border-slate-300'>
						{data.eyebrow}
					</Badge>
				) : null}
				{data.heading ? (
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3'>
						{data.heading}
					</h2>
				) : null}
				{data.intro ? (
					<p className='text-sm sm:text-base text-slate-600 mb-6 md:mb-8 leading-relaxed'>
						{data.intro}
					</p>
				) : null}

				{data.sections.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
						{data.sections.map((s, i) => {
							const Icon = pickIcon(s.icon);
							return (
								<Card key={i} className='border-slate-200'>
									<CardHeader className='pb-3'>
										<CardTitle className='flex items-center gap-2 text-base sm:text-lg'>
											<span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700'>
												<Icon className='h-5 w-5' />
											</span>
											{s.title}
										</CardTitle>
									</CardHeader>
									<CardContent className='space-y-2'>
										{s.description ? (
											<p className='text-sm text-slate-700 leading-relaxed'>
												{s.description}
											</p>
										) : null}
										{s.note ? (
											<p className='text-xs text-slate-500 italic'>{s.note}</p>
										) : null}
									</CardContent>
								</Card>
							);
						})}
					</div>
				) : null}

				{data.body ? (
					<div className='mt-6 md:mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4'>
						<p className='text-sm text-slate-700 leading-relaxed whitespace-pre-line'>
							{data.body}
						</p>
					</div>
				) : null}
			</div>
		</section>
	);
}
