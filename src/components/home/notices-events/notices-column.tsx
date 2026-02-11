'use client';

import { BellRing } from 'lucide-react';
import type { NoticeItem } from './types';
import { RotatingNoticeColumn } from './notice-column';

type NoticesColumnProps = {
	items: NoticeItem[];
};

export function NoticesColumn({ items }: NoticesColumnProps) {
	return (
		<RotatingNoticeColumn
			title='Official News & Notices'
			icon={<BellRing className='h-4 w-4 text-blue-700' />}
			items={items}
		/>
	);
}
