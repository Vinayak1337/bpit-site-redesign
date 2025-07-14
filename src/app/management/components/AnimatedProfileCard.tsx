'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedProfileCardProps {
	children: React.ReactNode;
	delay?: number;
}

const AnimatedProfileCard = ({
	children,
	delay = 0
}: AnimatedProfileCardProps) => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: '-100px 0px -100px 0px'
	});

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: -100, scale: 0.8 }}
			animate={
				isInView
					? {
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								type: 'spring',
								damping: 25,
								stiffness: 300,
								delay: delay,
								duration: 0.8
							}
					  }
					: {}
			}
			className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
			whileHover={{
				y: -5,
				transition: { duration: 0.2 }
			}}>
			{children}
		</motion.div>
	);
};

export default AnimatedProfileCard;
