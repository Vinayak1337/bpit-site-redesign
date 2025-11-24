/**
 * Adapters to convert global types to the formats expected by carousel components.
 * The components have their own local types where `id` is optional string, 
 * while the global types have `id` as number.
 */

// ============= NOTICES SECTION =============
interface NoticesSectionNotice {
	id?: string;
	title: string;
	date: string;
	category: string;
	href?: string;
	fileUrl?: string;
	priority?: boolean;
	content?: string;
}

interface NoticesSectionComponentData {
	notices: NoticesSectionNotice[];
	announcements: NoticesSectionNotice[];
}

export function toNoticesSectionComponentData(data: NoticesSectionData): NoticesSectionComponentData {
	return {
		notices: data.notices.map(notice => ({
			id: String(notice.id),
			title: notice.title,
			date: notice.date,
			category: notice.category,
			href: notice.link,
			priority: notice.priority === 'high',
			content: notice.description
		})),
		announcements: data.announcements.map(ann => ({
			id: String(ann.id),
			title: ann.title,
			date: ann.date,
			category: ann.category,
			href: ann.link,
			priority: ann.priority === 'high',
			content: ann.description
		}))
	};
}

// ============= EVENTS SECTION =============
interface EventsSectionEvent {
	id?: string;
	title: string;
	date: string;
	time: string;
	location: string;
	image: string;
	category: string;
	description: string;
	registrationLink?: string;
}

interface EventsSectionComponentData {
	events: EventsSectionEvent[];
}

export function toEventsSectionComponentData(data: EventsSectionData): EventsSectionComponentData {
	return {
		events: data.events.map(event => ({
			id: String(event.id),
			title: event.title,
			date: event.date,
			time: event.time,
			location: event.location,
			image: event.image,
			category: event.category,
			description: event.description,
			registrationLink: event.ctaLink
		}))
	};
}

// ============= TESTIMONIALS =============
interface TestimonialComponentData {
	title: string;
	subtitle: string;
	testimonials: Array<{
		id?: string;
		name: string;
		position: string;
		batch: string;
		achievement: string;
		testimonial: string;
		image: string;
		video?: string;
		company: string;
		rating?: number;
		tags: string[];
	}>;
}

export function toTestimonialComponentData(data: TestimonialsData): TestimonialComponentData {
	return {
		title: data.title,
		subtitle: data.subtitle,
		testimonials: data.testimonials.map(item => ({
			id: String(item.id),
			name: item.name,
			position: item.position,
			batch: item.batch,
			achievement: item.achievement,
			testimonial: item.testimonial,
			image: item.image,
			video: item.video,
			company: item.company,
			rating: item.rating,
			tags: item.tags
		}))
	};
}

