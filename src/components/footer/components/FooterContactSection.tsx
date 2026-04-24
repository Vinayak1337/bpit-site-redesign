import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FooterContactItem } from '@/components/footer/types';

type FooterContactSectionProps = {
	contacts: FooterContactItem[];
	isVisible: boolean;
	isMobile: boolean;
	expandedSection: string | null;
	onToggle: (section: string) => void;
};

const SECTION_ID = 'contact';

const FooterContactSection = ({
	contacts,
	isVisible,
	isMobile,
	expandedSection,
	onToggle
}: FooterContactSectionProps) => {
	const isExpanded = expandedSection === SECTION_ID || !isMobile;

	return (
		<motion.div
			initial={{ opacity: 0, x: 30 }}
			animate={isVisible ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.8, delay: 0.4 }}
			className='space-y-6'>
			<div className='flex items-center gap-3 md:hidden'>
				<h3 className='text-xl font-bold text-white'>Contact Info</h3>
				<button
					onClick={() => onToggle(SECTION_ID)}
					className='md:hidden text-white/60 p-2 -m-2'
					aria-label='Toggle Contact Info section'>
					<ChevronDown
						className={`w-5 h-5 transition-transform ${
							expandedSection === SECTION_ID ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>
			<h3 className='hidden md:block text-xl font-bold text-white mb-6'>
				Contact Info
			</h3>

			<div className={`space-y-4 ${isExpanded ? 'block' : 'hidden'} md:block`}>
				{contacts.map((contact, index) => {
					const cardContent = (
						<div className='p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 group'>
							<div className='flex items-start gap-3'>
								<div className='p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/40 transition-colors flex-shrink-0'>
									<contact.icon className='w-5 h-5 text-blue-400' />
								</div>
								<div>
									<div className='text-white font-medium text-sm mb-1'>
										{contact.title}
									</div>
									<div className='text-white/80 text-xs leading-relaxed group-hover:text-white transition-colors'>
										{contact.text}
									</div>
								</div>
							</div>
						</div>
					);

					return (
						<motion.div
							key={contact.title}
							initial={{ opacity: 0, y: 20 }}
							animate={isVisible ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.4, delay: 0.1 * index }}>
							{contact.href ? (
								<a
									href={contact.href}
									target={contact.external ? '_blank' : undefined}
									rel={
										contact.external ? 'noopener noreferrer' : undefined
									}
									className='block'>
									{cardContent}
								</a>
							) : (
								<div className='block'>{cardContent}</div>
							)}
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default FooterContactSection;
