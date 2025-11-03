'use client';

import React from 'react';
import {
	Building2,
	BookOpen,
	GraduationCap,
	Lightbulb,
	Trophy,
	Users
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
	GraduationCap: <GraduationCap className='w-4 h-4 sm:w-5 sm:h-5' />,
	BookOpen: <BookOpen className='w-4 h-4 sm:w-5 sm:h-5' />,
	Trophy: <Trophy className='w-5 h-5 sm:w-6 sm:h-6' />,
	Lightbulb: <Lightbulb className='w-5 h-5 sm:w-6 sm:h-6' />,
	Users: <Users className='w-5 h-5 sm:w-6 sm:h-6' />
};

export function getIcon(iconName: string): React.ReactNode {
	return ICON_MAP[iconName] ?? (
		<Building2 className='w-4 h-4 sm:w-5 sm:h-5' />
	);
}

export const SUPPORTED_ICON_NAMES = Object.keys(ICON_MAP);
