'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const quotes = [
	{
		text: "The only thing that you absolutely have to know, is the location of the library.",
		author: "Albert Einstein",
		image: "/placeholder.svg?height=120&width=120",
		role: "Theoretical Physicist",
		category: "Knowledge"
	},
	{
		text: "I do believe something very magical can happen when you read a good book.",
		author: "J.K. Rowling",
		image: "/placeholder.svg?height=120&width=120",
		role: "Author",
		category: "Reading"
	},
	{
		text: "A library is not a luxury but one of the necessities of life.",
		author: "Henry Ward Beecher",
		image: "/placeholder.svg?height=120&width=120",
		role: "Clergyman & Writer",
		category: "Education"
	},
	{
		text: "The library is the temple of learning, and learning has liberated more people than all the wars in history.",
		author: "Carl T. Rowan",
		image: "/placeholder.svg?height=120&width=120",
		role: "Journalist",
		category: "Learning"
	},
	{
		text: "Libraries allow children to ask questions about the world and find the answers. And the wonderful thing is that once a child learns to use a library, the doors to learning are always open.",
		author: "Laura Bush",
		image: "/placeholder.svg?height=120&width=120",
		role: "Former First Lady",
		category: "Children"
	},
	{
		text: "A library outranks any other one thing a community can do to benefit its people. It is a never failing spring in the desert.",
		author: "Andrew Carnegie",
		image: "/placeholder.svg?height=120&width=120",
		role: "Industrialist & Philanthropist",
		category: "Community"
	}
];

export function LibraryQuotes() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	// Auto-play functionality
	useEffect(() => {
		const interval = setInterval(() => {
			setDirection(1);
			setCurrentIndex((prev) => (prev + 1) % quotes.length);
		}, 4000); // Move every 4 seconds

		return () => clearInterval(interval);
	}, []);

	const nextQuote = () => {
		setDirection(1);
		setCurrentIndex((prev) => (prev + 1) % quotes.length);
	};

	const prevQuote = () => {
		setDirection(-1);
		setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
	};

	const goToQuote = (index: number) => {
		setDirection(index > currentIndex ? 1 : -1);
		setCurrentIndex(index);
	};

	// Get current quotes to display (2 for lg screens, 1 for smaller)
	const getDisplayQuotes = () => {
		const displayQuotes = [];
		for (let i = 0; i < 2; i++) {
			const index = (currentIndex + i) % quotes.length;
			displayQuotes.push({ ...quotes[index], displayIndex: i });
		}
		return displayQuotes;
	};

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 300 : -300,
			opacity: 0
		})
	};

	return (
		<div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-4 -left-4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-6"
				>
					<div className="flex items-center justify-center gap-2 mb-3">
						<Star className="w-5 h-5 text-yellow-500 fill-current" />
						<h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							Words of Wisdom
						</h2>
						<Star className="w-5 h-5 text-yellow-500 fill-current" />
					</div>
					<p className="text-gray-600 text-base max-w-2xl mx-auto">
						Inspiring thoughts about learning, knowledge, and the power of libraries
					</p>
				</motion.div>

				{/* Main Quotes Display */}
				<div className="max-w-6xl mx-auto relative">
					{/* Navigation Controls */}
					<div className="flex justify-end items-center mb-4">
						<div className="flex gap-2">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={prevQuote}
								className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 text-blue-600 hover:bg-blue-50 transition-all duration-300"
							>
								<ChevronLeft className="w-4 h-4" />
							</motion.button>

							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								onClick={nextQuote}
								className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/20 text-blue-600 hover:bg-blue-50 transition-all duration-300"
							>
								<ChevronRight className="w-4 h-4" />
							</motion.button>
						</div>
					</div>

					{/* Quotes Container */}
					<div className="relative h-56 overflow-hidden">
						<AnimatePresence initial={false} custom={direction} mode="wait">
							<motion.div
								key={currentIndex}
								custom={direction}
								variants={slideVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{
									x: { type: "spring", stiffness: 300, damping: 30 },
									opacity: { duration: 0.2 }
								}}
								className="absolute inset-0"
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
									{getDisplayQuotes().map((quote, idx) => (
										<motion.div
											key={`${currentIndex}-${idx}`}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.1 }}
											className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-white/20 h-full flex flex-col justify-between ${
												idx === 1 ? 'hidden lg:flex' : ''
											}`}
										>
											<div className="flex-1">
												<Quote className="h-6 w-6 text-blue-600 mb-3" />
												<blockquote className="text-base text-gray-700 italic mb-4 leading-relaxed font-light">
													"{quote.text}"
												</blockquote>
											</div>
											
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<img
														src={quote.image || "/placeholder.svg"}
														alt={quote.author}
														className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shadow-md"
													/>
													<div>
														<div className="font-semibold text-gray-800 text-sm">
															{quote.author}
														</div>
														<div className="text-blue-600 text-xs">
															{quote.role}
														</div>
													</div>
												</div>
												<span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
													{quote.category}
												</span>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Quote Indicators */}
					<div className="flex justify-center mt-4 space-x-2">
						{quotes.map((_, index) => (
							<motion.button
								key={index}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.8 }}
								onClick={() => goToQuote(index)}
								className={`w-2 h-2 rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'bg-blue-600 w-6'
										: 'bg-blue-300 hover:bg-blue-400'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default LibraryQuotes;
