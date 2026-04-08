import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { getIconComponent } from './StudentLifeIcons';
import type { CodeOfConductData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: CodeOfConductData;
}

export function CodeOfConductHeader({ data }: Props) {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold tracking-tight text-gray-900'>{data.title}</h1>
			<p className='text-lg text-gray-600 max-w-4xl'>{data.description}</p>
		</div>
	);
}

export function CodeOfConductRules({ data }: Props) {
	return (
		<div className='grid gap-6 md:grid-cols-1'>
			{data.sections.map(section => {
				const Icon = getIconComponent(section.icon);
				return (
					<Card key={section.category}>
						<CardHeader className='flex flex-row items-center gap-4 bg-gray-50/50 border-b'>
							<div className='p-2 bg-blue-100 rounded-lg'>
								<Icon className='w-5 h-5 text-blue-600' />
							</div>
							<CardTitle className='text-xl'>{section.category}</CardTitle>
						</CardHeader>
						<CardContent className='pt-6'>
							<ul className='space-y-3'>
								{section.rules.map((rule, i) => (
									<li key={i} className='flex gap-3 text-gray-700'>
										<div className='w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0' />
										<span className='leading-relaxed'>{rule}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}

export function CodeOfConductNote() {
	return (
		<Card className='bg-blue-50 border-blue-200'>
			<CardContent className='flex items-start gap-4 pt-6'>
				<Info className='w-6 h-6 text-blue-600 flex-shrink-0 mt-1' />
				<div className='space-y-2'>
					<h3 className='font-semibold text-blue-900'>Note on Ragging</h3>
					<p className='text-blue-800 text-sm leading-relaxed'>
						Ragging in any form is a punishable offense under the directives of the Supreme Court of India.
						BPIT follows a zero-tolerance policy towards ragging.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default function CodeOfConduct({ data }: Props) {
	return (
		<div className="space-y-12">
			<CodeOfConductHeader data={data} />
			<CodeOfConductRules data={data} />
			<CodeOfConductNote />
		</div>
	);
}
