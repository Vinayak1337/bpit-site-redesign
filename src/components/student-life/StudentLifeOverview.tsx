import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getIconComponent } from './StudentLifeIcons';
import type { StudentLifeOverviewData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: StudentLifeOverviewData;
}

export function StudentLifeOverviewHeader({ data }: Props) {
	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-8 md:p-10'>
			<div className='space-y-5'>
				<div className='inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700'>
					Student Life
				</div>

				<h2 className='text-3xl font-bold tracking-tight text-gray-900 md:text-4xl'>
					{data.title}
				</h2>

				<p className='max-w-4xl text-lg leading-relaxed text-gray-600'>
					{data.description}
				</p>

				<div className='flex flex-wrap gap-2 pt-1'>
					<span className='inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700'>
						{data.highlights.length} Highlight{data.highlights.length === 1 ? '' : 's'}
					</span>
					<span className='inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700'>
						Campus Experience
					</span>
				</div>
			</div>
		</div>
	);
}

export function StudentLifeOverviewHighlights({ data }: Props) {
	if (data.highlights.length === 0) {
		return (
			<Card className='border-dashed border-blue-200 bg-blue-50/30'>
				<CardContent className='py-10 text-center'>
					<p className='text-sm font-medium text-blue-700'>No highlights added yet.</p>
					<p className='mt-1 text-sm text-gray-600'>
						Add student life highlight cards from the admin panel.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
			{data.highlights.map((item, index) => {
				const Icon = getIconComponent(item.icon);
				return (
					<Card
						key={item.title}
						className='group relative overflow-hidden border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
						<div className='absolute inset-x-0 top-0 h-1 bg-blue-600' />
						<CardHeader>
							<div className='mb-4 flex items-start justify-between gap-4'>
								<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100'>
									<Icon className='h-6 w-6 text-blue-600' />
								</div>
								<span className='rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600'>
									{String(index + 1).padStart(2, '0')}
								</span>
							</div>
							<CardTitle className='text-xl text-slate-900'>{item.title}</CardTitle>
						</CardHeader>
						<CardContent className='flex-1 flex flex-col'>
							<CardDescription className='mb-6 flex-1 text-base leading-relaxed text-slate-600'>
								{item.description}
							</CardDescription>
							<Button asChild variant='outline' className='w-full justify-between border-slate-200'>
								<Link href={item.href}>
									Explore Section
									<ArrowRight className='ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
								</Link>
							</Button>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

export default function StudentLifeOverview({ data }: Props) {
	return (
		<div className='space-y-10'>
			<StudentLifeOverviewHeader data={data} />
			<StudentLifeOverviewHighlights data={data} />
		</div>
	);
}
