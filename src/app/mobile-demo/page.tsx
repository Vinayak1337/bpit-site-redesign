'use client';

import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Menu, Search, Home, GraduationCap, MessageSquare, LogIn, Phone, ArrowRight, CheckCircle } from 'lucide-react';

export default function MobileDemoPage() {
	const features = [
		{
			icon: <Menu className="w-5 h-5" />,
			title: "Animated Hamburger Menu",
			description: "Smooth three-line to X animation when opening the menu"
		},
		{
			icon: <Sparkles className="w-5 h-5" />,
			title: "Full-Screen Overlay",
			description: "Beautiful slide-in panel with gradient header and contact info"
		},
		{
			icon: <Search className="w-5 h-5" />,
			title: "Quick Search Bar",
			description: "Instant access to search functionality with animated reveal"
		},
		{
			icon: <Smartphone className="w-5 h-5" />,
			title: "Swipe Gestures",
			description: "Swipe right to close the menu for natural mobile navigation"
		},
		{
			icon: <MessageSquare className="w-5 h-5" />,
			title: "Floating Bottom Nav",
			description: "Quick access bar that appears when scrolling with enquiry CTA"
		},
		{
			icon: <CheckCircle className="w-5 h-5" />,
			title: "Accordion Dropdowns",
			description: "Organized menu sections with smooth expand/collapse animations"
		}
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
			{/* Hero Section */}
			<div className="container mx-auto px-4 pt-24 pb-12">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12">
					<h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Mobile Navigation Redesign
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Experience our completely reimagined mobile navigation with modern animations, 
						gestures, and user-friendly features
					</p>
				</motion.div>

				{/* Mobile Preview */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="max-w-md mx-auto mb-16">
					<div className="relative">
						{/* Phone Frame */}
						<div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
							<div className="bg-white rounded-[2.5rem] overflow-hidden">
								{/* Status Bar */}
								<div className="bg-gray-900 text-white text-xs py-1 px-6 flex justify-between items-center">
									<span>9:41</span>
									<div className="flex gap-1">
										<div className="w-4 h-3 bg-white rounded-sm"></div>
										<div className="w-4 h-3 bg-white rounded-sm"></div>
										<div className="w-4 h-3 bg-white rounded-sm"></div>
									</div>
								</div>
								
								{/* Demo Screen */}
								<div className="h-[600px] bg-gradient-to-b from-blue-100 to-white p-4">
									<div className="text-center py-12">
										<Smartphone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
										<h3 className="text-lg font-semibold mb-2">Try it on Mobile!</h3>
										<p className="text-sm text-gray-600 px-8">
											Open this page on your mobile device to experience the new navigation
										</p>
									</div>
									
									{/* Feature Cards */}
									<div className="space-y-3 mt-8">
										{features.slice(0, 3).map((feature, index) => (
											<motion.div
												key={index}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: 0.4 + index * 0.1 }}
												className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3">
												<div className="text-blue-600">{feature.icon}</div>
												<div className="flex-1">
													<h4 className="font-medium text-sm">{feature.title}</h4>
													<p className="text-xs text-gray-500 mt-1">{feature.description}</p>
												</div>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</div>
						
						{/* Floating Elements */}
						<motion.div
							animate={{ y: [0, -10, 0] }}
							transition={{ repeat: Infinity, duration: 2 }}
							className="absolute -right-8 top-20 bg-blue-600 text-white rounded-full p-3 shadow-lg">
							<Search className="w-5 h-5" />
						</motion.div>
						<motion.div
							animate={{ y: [0, 10, 0] }}
							transition={{ repeat: Infinity, duration: 2.5 }}
							className="absolute -left-8 bottom-20 bg-green-600 text-white rounded-full p-3 shadow-lg">
							<Menu className="w-5 h-5" />
						</motion.div>
					</div>
				</motion.div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 * index }}
							className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
							<div className="flex items-center gap-4 mb-3">
								<div className="p-3 bg-blue-100 rounded-lg text-blue-600">
									{feature.icon}
								</div>
								<h3 className="font-semibold text-lg">{feature.title}</h3>
							</div>
							<p className="text-gray-600">{feature.description}</p>
						</motion.div>
					))}
				</div>

				{/* Key Improvements */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="mt-16 text-center">
					<h2 className="text-3xl font-bold mb-8">Key Improvements</h2>
					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
						<div>
							<h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
								<ArrowRight className="w-5 h-5 text-blue-600" />
								Enhanced User Experience
							</h3>
							<ul className="space-y-2 text-gray-600">
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Intuitive swipe gestures for natural navigation</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Quick access bottom navigation bar</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Smooth animations and transitions</span>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
								<ArrowRight className="w-5 h-5 text-blue-600" />
								Modern Design Elements
							</h3>
							<ul className="space-y-2 text-gray-600">
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Full-screen overlay with backdrop blur</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Gradient headers with contact information</span>
								</li>
								<li className="flex items-start gap-2">
									<CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
									<span>Organized accordion-style menu sections</span>
								</li>
							</ul>
						</div>
					</div>
				</motion.div>

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1 }}
					className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
					<h2 className="text-2xl font-bold mb-4">Try It Yourself!</h2>
					<p className="mb-6 text-blue-100">
						Visit any page on your mobile device to experience the new navigation system
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<a
							href="/"
							className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
							Go to Homepage
						</a>
						<button
							onClick={() => {
								const event = new CustomEvent('openEnquiry');
								window.dispatchEvent(event);
							}}
							className="bg-blue-800 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-900 transition-colors">
							Enquire Now
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}