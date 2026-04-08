import { motion } from 'framer-motion';
import type { FooterParticle } from '@/components/footer/types';

type FooterBackgroundEffectsProps = {
	particles: FooterParticle[];
	enableParticles: boolean;
};

const FooterBackgroundEffects = ({
	particles,
	enableParticles
}: FooterBackgroundEffectsProps) => (
	<>
		<div className='absolute inset-0 overflow-hidden'>
			<div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob' />
			<div className='absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000' />
			<div className='absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000' />
		</div>
		<div className='absolute inset-0 overflow-hidden pointer-events-none'>
			{enableParticles &&
				particles.map(particle => (
					<motion.div
						key={particle.id}
						className='absolute w-1 h-1 bg-white/20 rounded-full'
						style={{
							left: `${particle.left}%`,
							top: `${particle.top}%`
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0.2, 1, 0.2]
						}}
						transition={{
							duration: particle.duration,
							repeat: Infinity,
							delay: particle.delay
						}}
					/>
				))}
		</div>
	</>
);

export default FooterBackgroundEffects;
