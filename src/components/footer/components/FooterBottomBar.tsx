import Link from 'next/link';
import { motion } from 'framer-motion';

type FooterBottomBarProps = {
	bottomLeftContent: FooterBottomLeftContent;
	isVisible: boolean;
};

const policyLinks = [
	{ label: 'Privacy Policy', href: '/privacy-policy' },
	{ label: 'Terms of Service', href: '/terms-of-service' },
	{ label: 'Sitemap', href: '/sitemap.xml' }
];

const FooterBottomBar = ({
	bottomLeftContent,
	isVisible
}: FooterBottomBarProps) => {
	const currentYear = new Date().getFullYear();

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={isVisible ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.8, delay: 0.6 }}
			className='border-t border-white/10 pt-6 sm:pt-8 mt-8 sm:mt-12'>
			<div className='flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6'>
				<div className='text-center sm:text-left'>
					<p className='text-white/80 text-xs sm:text-sm'>
						&copy; {currentYear} {bottomLeftContent.copyright}
					</p>
					<p className='text-white/60 text-xs mt-1'>
						{bottomLeftContent.accreditation}
					</p>
				</div>

				<div className='flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60'>
					{policyLinks.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='hover:text-white transition-colors py-2 inline-block'>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default FooterBottomBar;
