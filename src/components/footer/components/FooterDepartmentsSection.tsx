import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FooterDepartmentLink } from '@/components/footer/types';

type FooterDepartmentsSectionProps = {
	departments: FooterDepartmentLink[];
	isVisible: boolean;
	isMobile: boolean;
	expandedSection: string | null;
	onToggle: (section: string) => void;
};

const SECTION_ID = 'departments';

const FooterDepartmentsSection = ({
	departments,
	isVisible,
	isMobile,
	expandedSection,
	onToggle
}: FooterDepartmentsSectionProps) => {
	const isExpanded = expandedSection === SECTION_ID || !isMobile;

	return (
		<motion.div
			initial={{ opacity: 0, x: -30 }}
			animate={isVisible ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.8, delay: 0.3 }}
			className='space-y-6'>
			<div className='flex items-center gap-3 md:hidden'>
				<h3 className='text-xl font-bold text-white'>Departments</h3>
				<button
					onClick={() => onToggle(SECTION_ID)}
					className='md:hidden text-white/60 p-2 -m-2'
					aria-label='Toggle Departments section'>
					<ChevronDown
						className={`w-5 h-5 transition-transform ${
							expandedSection === SECTION_ID ? 'rotate-180' : ''
						}`}
					/>
				</button>
			</div>
			<h3 className='hidden md:block text-xl font-bold text-white mb-6'>
				Departments
			</h3>

			<div className={`space-y-3 ${isExpanded ? 'block' : 'hidden'} md:block`}>
				{departments.map((department, index) => {
					const cardContent = (
						<div className='bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer'>
							<div className='flex items-center gap-3'>
								<div
									className={`${department.backgroundClass} ${department.textClass} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-xs`}>
									{department.code}
								</div>
								<div>
									<div className='text-white font-medium text-sm'>
										{department.name}
									</div>
									<div className='text-white/60 text-xs'>Programs</div>
								</div>
							</div>
						</div>
					);

					return (
						<motion.div
							key={department.name}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={isVisible ? { opacity: 1, scale: 1 } : {}}
							transition={{ duration: 0.4, delay: 0.1 * index }}>
							{department.isExternal ? (
								<a
									href={department.href}
									target='_blank'
									rel='noopener noreferrer'
									className='block'>
									{cardContent}
								</a>
							) : (
								<Link href={department.href} className='block'>
									{cardContent}
								</Link>
							)}
						</motion.div>
					);
				})}
			</div>
		</motion.div>
	);
};

export default FooterDepartmentsSection;
