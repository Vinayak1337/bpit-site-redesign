import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SubHeroData } from '@/app/(Private Pages)/actions/_library-subpage-shared';
import { Badge } from '@/components/ui/badge';

function pickIcon(name: string | undefined): LucideIcon {
	const map = Icons as unknown as Record<string, LucideIcon>;
	if (name && map[name]) return map[name];
	return Icons.BookOpen;
}

export default function SimpleSubHero({
	data,
	icon
}: {
	data: SubHeroData;
	icon?: string;
}) {
	const Icon = pickIcon(icon);
	const gradient = data.gradient || 'from-blue-50 to-indigo-100';
	return (
		<section
			className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${gradient} px-6 py-8 sm:px-8 md:px-10 md:py-12 lg:py-16`}>
			{data.backgroundImage ? (
				<div
					aria-hidden
					className='absolute inset-0 opacity-20 bg-center bg-cover'
					style={{ backgroundImage: `url(${data.backgroundImage})` }}
				/>
			) : null}
			<div className='relative z-10 max-w-3xl'>
				{data.eyebrow ? (
					<Badge variant='secondary' className='mb-3 bg-white/80 text-slate-700'>
						<Icon className='h-3.5 w-3.5 mr-1.5' />
						{data.eyebrow}
					</Badge>
				) : null}
				<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3'>
					{data.title}
				</h1>
				{data.subtitle ? (
					<p className='text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed'>
						{data.subtitle}
					</p>
				) : null}
			</div>
		</section>
	);
}
