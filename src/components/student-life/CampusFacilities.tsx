import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from './StudentLifeIcons';
import type { CampusFacilitiesData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: CampusFacilitiesData;
}

export default function CampusFacilities({ data }: Props) {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">{data.title}</h1>
				<p className="text-lg text-gray-600 max-w-4xl">
					{data.description}
				</p>
			</div>

			{data.sections.map((section) => (
				<section key={section.title} className="space-y-6">
					<h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">{section.title}</h2>
					<div className="grid gap-6 md:grid-cols-2">
						{section.items.map((item) => {
							const Icon = getIconComponent(item.icon);
							return (
								<Card key={item.title} className="overflow-hidden flex flex-col">
									<div className="relative h-48 w-full">
										<Image
											src={item.image}
											alt={item.title}
											fill
											className="object-cover"
										/>
									</div>
									<CardHeader>
										<div className="flex items-center gap-3 mb-2">
											<div className="p-2 bg-blue-100 rounded-lg">
												<Icon className="w-5 h-5 text-blue-600" />
											</div>
											<CardTitle className="text-xl">{item.title}</CardTitle>
										</div>
										<CardDescription className="text-sm leading-relaxed">
											{item.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="mt-auto">
										<div className="flex flex-wrap gap-2">
											{item.features.map((feature) => (
												<Badge key={feature} variant="secondary" className="text-xs font-normal">
													{feature}
												</Badge>
											))}
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
}

