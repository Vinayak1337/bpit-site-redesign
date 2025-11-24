import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from './StudentLifeIcons';
import type { EventsFestivalsData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	data: EventsFestivalsData;
}

export default function EventsFestivals({ data }: Props) {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">{data.title}</h1>
				<p className="text-lg text-gray-600 max-w-4xl">
					{data.description}
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
				{data.events.map((event) => {
					const Icon = getIconComponent(event.icon);
					return (
						<Card key={event.title} className="overflow-hidden flex flex-col">
							<div className="relative h-64 w-full">
								<Image
									src={event.image}
									alt={event.title}
									fill
									className="object-cover"
								/>
								<div className="absolute top-4 right-4">
									<Badge className="bg-white/90 text-black hover:bg-white shadow-sm">
										{event.month}
									</Badge>
								</div>
							</div>
							<CardHeader>
								<div className="flex items-center gap-2 mb-2">
									<Icon className="w-5 h-5 text-blue-600" />
									<span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{event.type}</span>
								</div>
								<CardTitle className="text-2xl">{event.title}</CardTitle>
								<CardDescription className="text-base mt-2">
									{event.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="mt-auto">
								<h4 className="text-sm font-semibold text-gray-900 mb-3">Event Highlights:</h4>
								<div className="flex flex-wrap gap-2">
									{event.highlights.map((highlight) => (
										<Badge key={highlight} variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
											{highlight}
										</Badge>
									))}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}

