'use client';

import { Megaphone } from 'lucide-react';
import type { NoticeItem } from './types';
import { RotatingNoticeColumn } from './notice-column';

type AnnouncementsColumnProps = {
	items: NoticeItem[];
};

export function AnnouncementsColumn({ items }: AnnouncementsColumnProps) {
	return (
		<RotatingNoticeColumn
			title='Announcements'
			icon={<Megaphone className='h-4 w-4 text-blue-700' />}
			items={items}
		/>
	);
}
