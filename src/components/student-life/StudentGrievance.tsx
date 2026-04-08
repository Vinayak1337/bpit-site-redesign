import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { getIconComponent } from './StudentLifeIcons';
import type { GrievanceCellData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: GrievanceCellData;
}

export function StudentGrievanceHeader({ data }: Props) {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold tracking-tight text-gray-900'>{data.title}</h1>
			<p className='text-lg text-gray-600 max-w-4xl'>{data.description}</p>
		</div>
	);
}

export function StudentGrievanceProcess({ data }: Props) {
	return (
		<section className='space-y-6'>
			<h2 className='text-2xl font-semibold text-gray-900'>Grievance Redressal Mechanism</h2>
			<p className='text-gray-700 leading-relaxed'>
				The Grievance Redressal Cell attempts to address genuine problems and complaints of students
				whatever be the nature of the problem. Students are encouraged to use the suggestion boxes
				placed on different sections of the campus to express constructive suggestions and grievances.
			</p>
			<div className='space-y-4'>
				{data.processSteps.map(item => (
					<div key={item.step} className='flex gap-4 p-4 border rounded-lg bg-white shadow-sm'>
						<div className='flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold'>
							{item.step}
						</div>
						<div>
							<h3 className='font-semibold text-gray-900'>{item.title}</h3>
							<p className='text-sm text-gray-600 mt-1'>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export function StudentGrievanceContacts({ data }: Props) {
	return (
		<section className='space-y-6'>
			<h2 className='text-2xl font-semibold text-gray-900'>Contact Information</h2>
			<div className='grid gap-4'>
				{data.contactInfo.map(item => {
					const Icon = getIconComponent(item.icon);
					return (
						<Card key={item.title}>
							<CardHeader className='flex flex-row items-center gap-4 pb-2'>
								<div className='p-2 bg-gray-100 rounded-lg'>
									<Icon className='w-5 h-5 text-gray-600' />
								</div>
								<div className='flex-1'>
									<CardTitle className='text-lg'>{item.title}</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className='space-y-1'>
									{item.details.map(detail => (
										<div key={detail} className='font-medium text-gray-900'>{detail}</div>
									))}
									<div className='text-sm text-gray-500 mt-1'>{item.sub}</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Card className='bg-red-50 border-red-200 mt-8'>
				<CardHeader className='flex flex-row items-center gap-2 pb-2'>
					<AlertTriangle className='w-5 h-5 text-red-600' />
					<CardTitle className='text-lg text-red-700'>Anti-Ragging Helpline</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-red-800 text-sm mb-2'>
						Ragging is strictly prohibited. Report any incidents immediately.
					</p>
					<div className='font-bold text-red-900'>1800-180-5522 (24x7 Toll Free)</div>
				</CardContent>
			</Card>
		</section>
	);
}

export default function StudentGrievance({ data }: Props) {
	return (
		<div className="space-y-12">
			<StudentGrievanceHeader data={data} />

			<div className="grid gap-8 md:grid-cols-2">
				<StudentGrievanceProcess data={data} />
				<StudentGrievanceContacts data={data} />
			</div>
		</div>
	);
}
