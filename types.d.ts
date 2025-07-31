type Priority = 'high' | 'medium' | 'low';
type Category =
	| 'Academic'
	| 'Financial Aid'
	| 'Admission'
	| 'Innovation'
	| 'Sports'
	| 'Library'
	| 'General';

interface Notice {
	id: number;
	category: Category;
	title: string;
	subtitle: string;
	date: string;
	time: string;
	image: string;
	priority: Priority;
	tags: string[];
	description: string;
	views: number;
	pinned: boolean;
	urgent: boolean;
}

interface Announcement {
	id: number;
	category: Category;
	title: string;
	subtitle: string;
	date: string;
	time: string;
	image: string;
	priority: Priority;
	tags: string[];
	description: string;
	views: number;
	pinned: boolean;
	urgent: boolean;
}

interface NoticesSectionData {
	notices: Notice[];
	announcements: Announcement[];
}

interface NoticesSectionProps {
	data: NoticesSectionData;
}

interface EventItem {
	id: number;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	date: string;
	time: string;
	location: string;
	category: string;
	attendees: number;
	featured: boolean;
	status: string;
	tags: string[];
	organizer: string;
	registrationOpen: boolean;
	price: string;
	highlights: string[];
	rating: number;
	totalRatings: number;
}

interface EventsSectionData {
	events: EventItem[];
}

interface EventsSectionProps {
	data: EventsSectionData;
}
