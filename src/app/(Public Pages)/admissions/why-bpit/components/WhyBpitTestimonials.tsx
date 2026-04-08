import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

type WhyBpitTestimonialsProps = {
	data?: TestimonialsData | null;
};

const getInitials = (name: string) =>
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map(part => part.charAt(0).toUpperCase())
		.join('') || 'BP';

const WhyBpitTestimonials = ({ data }: WhyBpitTestimonialsProps) => {
	if (!data || data.testimonials.length === 0) {
		return null;
	}

	return (
		<section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
			<div className='mb-7'>
				<p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-700'>
					Student voices
				</p>
				<h2 className='mt-2 text-2xl font-semibold text-slate-900 md:text-3xl'>{data.title}</h2>
				{data.subtitle ? (
					<p className='mt-3 max-w-3xl text-sm text-slate-600 md:text-base'>
						{data.subtitle}
					</p>
				) : null}
			</div>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				{data.testimonials.map((testimonial, index) => (
					<article
						key={`${testimonial.id}-${testimonial.name}-${index}`}
						className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
						<div className='flex items-start justify-between gap-4'>
							<div className='flex items-center gap-3'>
								{testimonial.image ? (
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										width={52}
										height={52}
										className='h-[52px] w-[52px] rounded-xl object-cover'
									/>
								) : (
									<div className='flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-blue-900 text-sm font-semibold text-white'>
										{getInitials(testimonial.name)}
									</div>
								)}
								<div>
									<p className='text-sm font-semibold text-slate-900 md:text-base'>
										{testimonial.name}
									</p>
									<p className='text-xs text-slate-600 md:text-sm'>
										{[testimonial.position, testimonial.company, testimonial.batch]
											.filter(Boolean)
											.join(' • ') || 'BPIT Student'}
									</p>
								</div>
							</div>
							<Quote className='h-5 w-5 shrink-0 text-blue-700' />
						</div>

						<p className='mt-4 text-sm leading-relaxed text-slate-700 md:text-base'>
							{testimonial.testimonial}
						</p>

						{testimonial.rating > 0 ? (
							<div className='mt-4 flex items-center gap-1'>
								{Array.from({ length: Math.min(5, testimonial.rating) }).map((_, starIndex) => (
									<Star
										key={`${testimonial.id}-${starIndex}`}
										className='h-4 w-4 fill-amber-400 text-amber-400'
									/>
								))}
							</div>
						) : null}
					</article>
				))}
			</div>
		</section>
	);
};

export default WhyBpitTestimonials;
