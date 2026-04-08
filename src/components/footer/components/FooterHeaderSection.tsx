import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import type { FooterAchievement } from '@/components/footer/types';

type FooterHeaderSectionProps = {
	achievements: FooterAchievement[];
	isVisible: boolean;
};

const FooterHeaderSection = ({
	achievements,
	isVisible
}: FooterHeaderSectionProps) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		animate={isVisible ? { opacity: 1, y: 0 } : {}}
		transition={{ duration: 0.8 }}
		className='text-center mb-12 sm:mb-16 lg:mb-20'>
		<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8'>
			<div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center'>
				<Building2 className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
			</div>
			<div className='text-center sm:text-left'>
				<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight'>
					Bhagwan Parshuram Institute of Technology
				</h2>
				<p className='text-blue-200 text-sm sm:text-base lg:text-lg mt-1'>
					Excellence in Engineering Education
				</p>
			</div>
		</div>

		<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12'>
			{achievements.map((achievement, index) => (
				<motion.div
					key={achievement.label}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={isVisible ? { opacity: 1, scale: 1 } : {}}
					transition={{ duration: 0.6, delay: 0.1 * index }}
					className='bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group'
					whileHover={{ scale: 1.05 }}>
					<div className='flex items-center justify-center mb-2 sm:mb-3 text-blue-400 group-hover:text-blue-300 transition-colors'>
						<achievement.icon className='w-6 h-6' />
					</div>
					<div className='text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1'>
						{achievement.number}
					</div>
					<div className='text-xs sm:text-sm text-blue-200'>
						{achievement.label}
					</div>
				</motion.div>
			))}
		</div>
	</motion.div>
);

export default FooterHeaderSection;
