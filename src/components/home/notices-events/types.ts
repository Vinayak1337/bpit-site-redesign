export type NoticeItem = {
	id?: string;
	title: string;
	date: string;
	category: string;
	href?: string;
	fileUrl?: string;
	priority?: boolean;
	content?: string;
};

export type EventItem = {
	id?: string;
	title: string;
	date: string;
	time: string;
	location: string;
	image: string;
	category: string;
	description: string;
	registrationLink?: string;
};

export type NoticesEventsComparisonProps = {
	noticesData: {
		notices: NoticeItem[];
		announcements: NoticeItem[];
	};
	eventsData: {
		events: EventItem[];
	};
};

export type EventQueueItem = EventItem & {
	_queueKey: string;
};

export type EventPhase =
	| 'idle'
	| 'collapse_current'
	| 'expand_next'
	| 'slide_queue_up'
	| 'reset_queue_down';

export type NoticeTransitionMode = 'step' | 'reset';

export type PhaseAwaiter = {
	wait: () => Promise<void>;
	resolve: () => void;
	cancel: () => void;
};
