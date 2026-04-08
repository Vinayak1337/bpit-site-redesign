import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FooterSocialLink } from '@/components/footer/types';
import FooterNewsletterForm from '@/components/footer/components/FooterNewsletterForm';

type FooterEngagementSectionProps = {
	socialLinks: FooterSocialLink[];
	isVisible: boolean;
	isMobile: boolean;
	expandedSection: string | null;
	onToggle: (section: string) => void;
};

const SECTION_ID = 'social';

const FooterEngagementSection = ({
	socialLinks,
	isVisible,
	isMobile,
	expandedSection,
	onToggle
}: FooterEngagementSectionProps) => {
	const isExpanded = expandedSection === SECTION_ID || !isMobile;

	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={isVisible ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.8, delay: 0.5 }}
			className='space-y-6'>
			<div className='flex items-center gap-3 md:hidden'>
				<h3 className='text-xl font-bold text-white'>Stay Connected</h3>
				<button
					onClick={() => onToggle(SECTION_ID)}
					className='md:hidden text-white/60'
					aria-label='Toggle Stay Connected section'>
					<ChevronDown
						className={`w-5 h-5 transition-transform ${
							expandedSection === SECTION_ID ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>
			<h3 className='hidden md:block text-xl font-bold text-white mb-6'>
				Stay Connected
			</h3>

			<div className={`space-y-6 ${isExpanded ? 'block' : 'hidden'} md:block`}>
				<div className='bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10'>
					<h4 className='text-white font-medium mb-3'>Get Updates</h4>
					<FooterNewsletterForm />
				</div>

				<div>
					<h4 className='text-white font-medium mb-4'>Follow Us</h4>
					<div className='flex flex-wrap gap-3'>
						{socialLinks.map((social, index) => (
							<motion.a
								key={social.label}
								href={social.href}
								target='_blank'
								rel='noopener noreferrer'
								className={`w-12 h-12 bg-gradient-to-r ${social.gradientClass} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group`}
								whileHover={{ scale: 1.1, rotate: 5 }}
								whileTap={{ scale: 0.95 }}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={isVisible ? { opacity: 1, scale: 1 } : {}}
								transition={{ duration: 0.4, delay: 0.1 * index }}
								aria-label={social.ariaLabel}>
								<social.icon className='w-5 h-5 text-white group-hover:scale-110 transition-transform' />
							</motion.a>
						))}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default FooterEngagementSection;
