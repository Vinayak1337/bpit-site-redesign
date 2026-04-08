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
	pinned: boolean;
	urgent: boolean;
	link: string;
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
	pinned: boolean;
	urgent: boolean;
	link: string;
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
	ctaLabel: string;
	ctaLink: string;
}

interface EventsSectionData {
	events: EventItem[];
}

interface EventsSectionProps {
	data: EventsSectionData;
}

interface PlacementCompany {
	name: string;
	logo: string;
}

interface PlacementStatistic {
	value: string;
	label: string;
}

interface PlacementCompaniesData {
	title: string;
	subtitle: string;
	companies: PlacementCompany[];
	statistics: PlacementStatistic[];
}

interface TopPlacedStudent {
	id: number;
	name: string;
	company: string;
	package: string;
	branch: string;
	year: string;
	image: string;
	companyLogo: string;
}

interface TopPlacedStudentsData {
	title: string;
	subtitle: string;
	students: TopPlacedStudent[];
	statistics: PlacementStatistic[];
}

interface TestimonialItem {
	id: number;
	name: string;
	batch: string;
	company: string;
	position: string;
	image: string;
	video: string;
	testimonial: string;
	rating: number;
	achievement: string;
	tags: string[];
}

interface TestimonialsData {
	title: string;
	subtitle: string;
	testimonials: TestimonialItem[];
}

// Header contact bar data shape
interface HeaderContactUsData {
	phone: { tel: string; display: string };
	email: string;
	address: string;
	mapUrl: string;
}

// Header important announcements bar data shape
interface HeaderAnnouncementItem {
	title: string;
	href: string;
}

interface HeaderAnnouncementsData {
	items: HeaderAnnouncementItem[];
	labels: { desktop: string; mobile: string };
}

// Footer data shapes
type FooterContactType = 'address' | 'phone' | 'email';

interface FooterContactInfoItem {
	key: FooterContactType;
	title: string;
	text: string;
	href: string;
}

interface FooterContactInfoData {
	items: FooterContactInfoItem[];
}

interface FooterBottomLeftContent {
	copyright: string;
	accreditation: string;
}
