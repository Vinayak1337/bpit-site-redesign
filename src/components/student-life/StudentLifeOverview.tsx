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
		<div className='space-y-4'>
			<h2 className='text-3xl font-bold tracking-tight text-gray-900'>
				{data.title}
			</h2>
			<p className='text-lg text-gray-600 leading-relaxed max-w-4xl'>
				{data.description}
			</p>
		</div>
	);
}

export function StudentLifeOverviewHighlights({ data }: Props) {
	return (
		<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
			{data.highlights.map(item => {
				const Icon = getIconComponent(item.icon);
				return (
					<Card key={item.title} className='flex flex-col hover:shadow-md transition-shadow'>
						<CardHeader>
							<div className='w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4'>
								<Icon className='w-6 h-6 text-blue-600' />
							</div>
							<CardTitle className='text-xl'>{item.title}</CardTitle>
						</CardHeader>
						<CardContent className='flex-1 flex flex-col'>
							<CardDescription className='text-base mb-6 flex-1'>
								{item.description}
							</CardDescription>
							<Button asChild variant='outline' className='w-full justify-between group'>
								<Link href={item.href}>
									Explore
									<ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
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
		<div className="space-y-12">
			<StudentLifeOverviewHeader data={data} />
			<StudentLifeOverviewHighlights data={data} />
		</div>
	);
}
