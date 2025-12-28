'use client';

import { useEffect, useMemo, useState } from 'react';
import { ContactType } from '@prisma/client';
import {
	buildDepartmentLinks,
	buildQuickLinks,
	footerAchievements,
	footerSocialLinks
} from '@/components/footer/data';
import FooterScrollToTopButton from '@/components/footer/components/FooterScrollToTopButton';
import FooterBackgroundEffects from '@/components/footer/components/FooterBackgroundEffects';
import FooterHeaderSection from '@/components/footer/components/FooterHeaderSection';
import FooterQuickLinksSection from '@/components/footer/components/FooterQuickLinksSection';
import FooterDepartmentsSection from '@/components/footer/components/FooterDepartmentsSection';
import FooterContactSection from '@/components/footer/components/FooterContactSection';
import FooterEngagementSection from '@/components/footer/components/FooterEngagementSection';
import FooterBottomBar from '@/components/footer/components/FooterBottomBar';
import type {
	FooterParticle,
	FooterContactItem
} from '@/components/footer/types';
import { MapPin, Phone, Mail } from 'lucide-react';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

type BPITFooterProps = {
	contacts: ContactDTO[];
	bottomLeftContent: FooterBottomLeftContent;
};

const PARTICLE_COUNT = 20;
const MOBILE_BREAKPOINT = 768;

const createParticles = (): FooterParticle[] =>
	Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
		id: index,
		left: Math.random() * 100,
		top: Math.random() * 100,
		duration: 3 + Math.random() * 2,
		delay: Math.random() * 2
	}));

const sanitizeTelephone = (input: string): string => input.replace(/[^+\d]/g, '');

const BPITFooter = ({ contacts, bottomLeftContent }: BPITFooterProps) => {
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [isFooterVisible, setIsFooterVisible] = useState(false);
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isClient, setIsClient] = useState(false);
	const [particles, setParticles] = useState<FooterParticle[]>([]);

	useEffect(() => {
		setIsClient(true);
		setParticles(createParticles());
	}, []);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const updateIsMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};

		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);
		return () => window.removeEventListener('resize', updateIsMobile);
	}, [isClient]);

	useEffect(() => {
		if (!isClient) {
			return;
		}

		const footerElement = document.getElementById('footer');
		if (!footerElement) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFooterVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 500);
		};

		observer.observe(footerElement);
		window.addEventListener('scroll', handleScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isClient]);

	const quickLinks = useMemo(() => buildQuickLinks(), []);
	const departmentLinks = useMemo(() => buildDepartmentLinks(), []);

	const contactItems = useMemo<FooterContactItem[]>(() => {
		const phoneContacts = contacts.filter(contact => contact.type === ContactType.PHONE);
		const emailContact = contacts.find(contact => contact.type === ContactType.EMAIL);
		const addressContact = contacts.find(contact => contact.type === ContactType.ADDRESS);

		const phoneDisplay = phoneContacts
			.map(contact => contact.displayValue ?? contact.value)
			.filter(value => value.length > 0)
			.join(', ');

		const items: FooterContactItem[] = [
			{
				title: 'Campus Address',
				text: addressContact?.displayValue ?? addressContact?.value ?? '',
				href: addressContact
					? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
							addressContact.displayValue ?? addressContact.value
						)}`
					: '',
				icon: MapPin,
				external: true
			},
			{
				title: 'Phone Numbers',
				text: phoneDisplay,
				href:
					phoneContacts[0]?.value
						? `tel:${sanitizeTelephone(phoneContacts[0].value)}`
						: '',
				icon: Phone,
				external: false
			},
			{
				title: 'Email Address',
				text: emailContact?.displayValue ?? emailContact?.value ?? '',
				href: emailContact ? `mailto:${emailContact.value}` : '',
				icon: Mail,
				external: false
			}
		];

		return items.filter(item => item.text.length > 0 && item.href.length > 0);
	}, [contacts]);

	const handleToggleSection = (section: string) => {
		setExpandedSection(previous =>
			previous === section ? null : section
		);
	};

	const handleScrollToTop = () => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<>
			<FooterScrollToTopButton
				isVisible={showScrollTop}
				onClick={handleScrollToTop}
			/>
			<footer
				id='footer'
				className='relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden'>
				<FooterBackgroundEffects
					particles={particles}
					enableParticles={isClient}
				/>
				<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-red-500 to-blue-400' />
				<div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
					<FooterHeaderSection
						achievements={footerAchievements}
						isVisible={isFooterVisible}
					/>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12'>
						<FooterQuickLinksSection
							links={quickLinks}
							isVisible={isFooterVisible}
							isMobile={isMobile}
							expandedSection={expandedSection}
							onToggle={handleToggleSection}
						/>
						<FooterDepartmentsSection
							departments={departmentLinks}
							isVisible={isFooterVisible}
							isMobile={isMobile}
							expandedSection={expandedSection}
							onToggle={handleToggleSection}
						/>
						<FooterContactSection
							contacts={contactItems}
							isVisible={isFooterVisible}
							isMobile={isMobile}
							expandedSection={expandedSection}
							onToggle={handleToggleSection}
						/>
						<FooterEngagementSection
							socialLinks={footerSocialLinks}
							isVisible={isFooterVisible}
							isMobile={isMobile}
							expandedSection={expandedSection}
							onToggle={handleToggleSection}
						/>
					</div>
					<FooterBottomBar
						bottomLeftContent={bottomLeftContent}
						isVisible={isFooterVisible}
					/>
				</div>
			</footer>
		</>
	);
};

export default BPITFooter;
