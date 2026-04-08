import type { LucideIcon } from 'lucide-react';

export type FooterParticle = {
	id: number;
	left: number;
	top: number;
	duration: number;
	delay: number;
};

export type FooterQuickLink = {
	name: string;
	href: string;
	icon: LucideIcon;
	isExternal?: boolean;
};

export type FooterDepartmentLink = {
	name: string;
	code: string;
	href: string;
	isExternal: boolean;
	backgroundClass: string;
	textClass: string;
};

export type FooterSocialLink = {
	label: string;
	href: string;
	icon: LucideIcon;
	gradientClass: string;
	ariaLabel: string;
};

export type FooterAchievement = {
	number: string;
	label: string;
	icon: LucideIcon;
};

export type FooterContactItem = {
	title: string;
	text: string;
	href: string;
	icon: LucideIcon;
	external: boolean;
};
