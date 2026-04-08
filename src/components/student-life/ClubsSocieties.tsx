import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from './StudentLifeIcons';
import type { ClubsSocietiesData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: ClubsSocietiesData;
}

export function ClubsSocietiesHeader({ data }: Props) {
	return (
		<div className='space-y-4'>
			<h1 className='text-3xl font-bold tracking-tight text-gray-900'>{data.title}</h1>
			<p className='text-lg text-gray-600 max-w-4xl'>{data.description}</p>
		</div>
	);
}

export function ClubsSocietiesCategories({ data }: Props) {
	return (
		<>
			{data.categories.map(category => (
				<section key={category.title} className='space-y-6'>
					<div className='border-b pb-2'>
						<h2 className='text-2xl font-semibold text-gray-800'>{category.title}</h2>
						<p className='text-gray-600 mt-1'>{category.description}</p>
					</div>
					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-2'>
						{category.clubs.map(club => {
							const Icon = getIconComponent(club.icon);
							return (
								<Card key={club.name} className='flex flex-col sm:flex-row overflow-hidden'>
									<div className='relative h-48 sm:h-auto sm:w-48 flex-shrink-0'>
										<Image
											src={club.image}
											alt={club.name}
											fill
											className='object-cover'
										/>
									</div>
									<div className='flex flex-col flex-1'>
										<CardHeader>
											<div className='flex items-center gap-2 mb-1'>
												<Icon className='w-4 h-4 text-blue-600' />
												<CardTitle className='text-lg'>{club.name}</CardTitle>
											</div>
											<CardDescription>{club.description}</CardDescription>
										</CardHeader>
										<CardContent className='mt-auto pt-0'>
											<p className='text-sm font-medium text-gray-700 mb-2'>Activities:</p>
											<div className='flex flex-wrap gap-2'>
												{club.activities.map(activity => (
													<Badge key={activity} variant='secondary' className='text-xs'>
														{activity}
													</Badge>
												))}
											</div>
										</CardContent>
									</div>
								</Card>
							);
						})}
					</div>
				</section>
			))}
		</>
	);
}

export default function ClubsSocieties({ data }: Props) {
	return (
		<div className="space-y-12">
			<ClubsSocietiesHeader data={data} />
			<ClubsSocietiesCategories data={data} />
		</div>
	);
}
