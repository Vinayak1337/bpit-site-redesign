import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { FooterQuickLink } from '@/components/footer/types';

type FooterQuickLinksSectionProps = {
	links: FooterQuickLink[];
	isVisible: boolean;
	isMobile: boolean;
	expandedSection: string | null;
	onToggle: (section: string) => void;
};

const SECTION_ID = 'links';

const FooterQuickLinksSection = ({
	links,
	isVisible,
	isMobile,
	expandedSection,
	onToggle
}: FooterQuickLinksSectionProps) => {
	const isExpanded = expandedSection === SECTION_ID || !isMobile;

	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={isVisible ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.8, delay: 0.2 }}
			className='space-y-6'>
			<div className='flex items-center gap-3 md:hidden'>
				<h3 className='text-xl font-bold text-white'>Quick Links</h3>
				<button
					onClick={() => onToggle(SECTION_ID)}
					className='md:hidden text-white/60'
					aria-label='Toggle Quick Links section'>
					<ChevronDown
						className={`w-5 h-5 transition-transform ${
							expandedSection === SECTION_ID ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>
			<h3 className='hidden md:block text-xl font-bold text-white mb-6'>
				Quick Links
			</h3>

			<div className={`space-y-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>
				{links.map((link, index) => (
					<motion.div
						key={link.name}
						initial={{ opacity: 0, x: -20 }}
						animate={isVisible ? { opacity: 1, x: 0 } : {}}
						transition={{ duration: 0.4, delay: 0.1 * index }}>
						<Link
							href={link.href}
							className='flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 group'
							target={link.isExternal ? '_blank' : undefined}
							rel={link.isExternal ? 'noopener noreferrer' : undefined}>
							<div className='p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/40 transition-colors'>
								<link.icon className='w-4 h-4' />
							</div>
							<span className='group-hover:translate-x-1 transition-transform'>
								{link.name}
							</span>
							<ChevronRight className='w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity' />
						</Link>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default FooterQuickLinksSection;
