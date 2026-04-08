import {
	aboutBPITItems,
	admissionsItems,
	academicsItems,
	placementsItems,
	studentLifeItems,
	departmentItems
} from '@/data/nav-items';
import {
	Building2,
	GraduationCap,
	BookOpen,
	Trophy,
	Users,
	Shield,
	Instagram,
	Linkedin,
	Twitter,
	Youtube,
	Facebook,
	Calendar,
	Award
} from 'lucide-react';
import type {
	FooterAchievement,
	FooterDepartmentLink,
	FooterQuickLink,
	FooterSocialLink
} from './types';

const resolveHref = <T extends { href: string }>(
	items: T[],
	predicate: (item: T) => boolean,
	fallback: string
): string => {
	const match = items.find(predicate);
	return match?.href ?? fallback;
};

export const buildQuickLinks = (): FooterQuickLink[] => [
	{
		name: 'About BPIT',
		href: resolveHref(aboutBPITItems, item => item.href === '/about', '/about'),
		icon: Building2
	},
	{
		name: 'Admissions',
		href: resolveHref(
			admissionsItems,
			item => item.href.includes('/admissions/process'),
			'/admissions/process'
		),
		icon: GraduationCap
	},
	{
		name: 'Academics',
		href: resolveHref(
			academicsItems,
			item => item.href.includes('/academia/academic-calendar'),
			'/academia'
		),
		icon: BookOpen
	},
	{
		name: 'Placements',
		href: resolveHref(
			placementsItems,
			item => item.href === '/placements/overview',
			'/placements/overview'
		),
		icon: Trophy
	},
	{
		name: 'Student Life',
		href: resolveHref(
			studentLifeItems,
			item => item.href === '/student-life/campus-facilities',
			'/student-life'
		),
		icon: Users
	},
	{
		name: 'Statutory Committees',
		href: '/statutory-committees',
		icon: Shield
	}
];

const departmentConfig: Array<{
	title: string;
	code: string;
	backgroundClass: string;
	textClass: string;
}> = [
	{
		title: 'Computer Science & Engineering',
		code: 'CSE',
		backgroundClass: 'bg-blue-500/10',
		textClass: 'text-blue-200'
	},
	{
		title: 'Information Technology',
		code: 'IT',
		backgroundClass: 'bg-emerald-500/10',
		textClass: 'text-emerald-200'
	},
	{
		title: 'Electronics & Communication',
		code: 'ECE',
		backgroundClass: 'bg-purple-500/10',
		textClass: 'text-purple-200'
	},
	{
		title: 'Electrical & Electronics',
		code: 'EEE',
		backgroundClass: 'bg-orange-500/10',
		textClass: 'text-orange-200'
	},
	{
		title: 'Applied Sciences',
		code: 'AS',
		backgroundClass: 'bg-slate-500/10',
		textClass: 'text-slate-200'
	},
	{
		title: 'Management Programs',
		code: 'MBA',
		backgroundClass: 'bg-rose-500/10',
		textClass: 'text-rose-200'
	}
];

export const buildDepartmentLinks = (): FooterDepartmentLink[] =>
	departmentConfig.map(config => {
		const navItem = departmentItems.find(item => item.title === config.title);
		const href = navItem?.href ?? '#';
		return {
			name: config.title,
			code: config.code,
			href,
			isExternal: href.startsWith('http'),
			backgroundClass: config.backgroundClass,
			textClass: config.textClass
		};
	});

export const footerAchievements: FooterAchievement[] = [
	{
		number: '2007',
		label: 'Established',
		icon: Calendar
	},
	{
		number: '1000+',
		label: 'Students',
		icon: Users
	},
	{
		number: 'NBA',
		label: 'Accredited',
		icon: Award
	},
	{
		number: '95%+',
		label: 'Placement',
		icon: Trophy
	}
];

export const footerSocialLinks: FooterSocialLink[] = [
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/bpitindia/',
		icon: Instagram,
		gradientClass: 'from-pink-500 to-purple-600',
		ariaLabel: 'Visit BPIT on Instagram'
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/bhagwan-parshuram-institute-of-technology-bpit-50358a178/',
		icon: Linkedin,
		gradientClass: 'from-blue-600 to-blue-700',
		ariaLabel: 'Visit BPIT on LinkedIn'
	},
	{
		label: 'Twitter',
		href: 'https://x.com/BpitIndia',
		icon: Twitter,
		gradientClass: 'from-sky-400 to-blue-500',
		ariaLabel: 'Visit BPIT on X (Twitter)'
	},
	{
		label: 'YouTube',
		href: 'https://www.youtube.com/@bpitcampus',
		icon: Youtube,
		gradientClass: 'from-red-500 to-red-600',
		ariaLabel: 'Visit BPIT on YouTube'
	},
	{
		label: 'Facebook',
		href: 'https://www.facebook.com/bpitindia',
		icon: Facebook,
		gradientClass: 'from-blue-500 to-blue-600',
		ariaLabel: 'Visit BPIT on Facebook'
	}
];
