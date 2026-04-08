import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

type FooterScrollToTopButtonProps = {
	isVisible: boolean;
	onClick: () => void;
};

const FooterScrollToTopButton = ({
	isVisible,
	onClick
}: FooterScrollToTopButtonProps) => (
	<AnimatePresence>
		{isVisible && (
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				onClick={onClick}
				className='fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group'
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				aria-label='Scroll to top'>
				<ArrowUp className='w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform' />
			</motion.button>
		)}
	</AnimatePresence>
);

export default FooterScrollToTopButton;
