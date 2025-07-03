"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock } from "lucide-react"


const events = [
	{
		id: 1,
		title: "Annual Tech Symposium 2024",
		date: "March 15, 2024",
		time: "9:00 AM - 5:00 PM",
		location: "Main Auditorium",
		image: "/events/img3.png?height=400&width=400",
		category: "Technology",
	},
	{
		id: 2,
		title: "Cultural Fest - Harmony",
		date: "March 22, 2024",
		time: "6:00 PM - 11:00 PM",
		location: "Campus Grounds",
		image: "/events/img2.png?height=400&width=400",
		category: "Cultural",
	},
	{
		id: 3,
		title: "Career Fair 2024",
		date: "April 5, 2024",
		time: "10:00 AM - 4:00 PM",
		location: "Sports Complex",
		image: "/events/img3.png?height=400&width=400",
		category: "Career",
	},
	{
		id: 4,
		title: "Research Conference",
		date: "April 12, 2024",
		time: "9:30 AM - 6:00 PM",
		location: "Conference Hall",
		image: "/events/img2.png?height=400&width=400",
		category: "Academic",
	},
	{
		id: 5,
		title: "Sports Meet 2024",
		date: "April 20, 2024",
		time: "8:00 AM - 6:00 PM",
		location: "Sports Ground",
		image: "/events/img3.png?height=400&width=400",
		category: "Sports",
	},
	{
		id: 6,
		title: "Alumni Meet",
		date: "May 5, 2024",
		time: "5:00 PM - 10:00 PM",
		location: "Main Hall",
		image: "/events/img2.png?height=400&width=400",
		category: "Alumni",
	},
]

const getCategoryColor = (category: string) => {
	const colors = {
		Technology: "bg-blue-100 text-blue-800",
		Cultural: "bg-purple-100 text-purple-800",
		Career: "bg-green-100 text-green-800",
		Academic: "bg-blue-100 text-blue-800",
		Sports: "bg-orange-100 text-orange-800",
		Alumni: "bg-indigo-100 text-indigo-800",
	}
	return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
}

export default function EventsSection() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [cardsPerView, setCardsPerView] = useState(4)


	const getCardsPerView = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth < 640) return 1 // Mobile: 1 card
			if (window.innerWidth < 1024) return 2 // Tablet: 2 cards
			return 4 // Desktop: 4 cards
		}
		return 4
	}

	useEffect(() => {
		const handleResize = () => {
			setCardsPerView(getCardsPerView())
		}

		// Set initial value
		setCardsPerView(getCardsPerView())

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	const maxIndex = Math.max(0, events.length - cardsPerView)

	const nextSlide = () => {
		setCurrentIndex((prev) => {
			const nextIndex = prev + 1
			if (nextIndex > maxIndex) {
				return 0
			}
			return nextIndex
		})
	}

	const prevSlide = () => {
		setCurrentIndex((prev) => {
			const prevIndex = prev - 1
			if (prevIndex < 0) {
				return maxIndex
			}
			return prevIndex
		})
	}

	const getVisibleEvents = () => {
		return events.slice(currentIndex, currentIndex + cardsPerView)
	}

	return (
		<section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4 font-sans">
						Upcoming Events
					</h2>
				</div>

				<div className="relative px-8 md:px-12">
					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
						aria-label="Previous slide"
						type="button"
					>
						<ChevronLeft className="w-6 h-6 text-blue-600 group-hover:text-blue-800 transition-colors" />
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
						aria-label="Next slide"
						type="button"
					>
						<ChevronRight className="w-6 h-6 text-blue-600 group-hover:text-blue-800 transition-colors" />
					</button>

					{/* Events Carousel Container */}
					<div className="overflow-hidden">
						<div className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6">
							{getVisibleEvents().map((event) => (
								<div
									key={event.id}
									className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex-shrink-0 ${
										cardsPerView === 1
											? "w-full max-w-sm mx-auto"
											: cardsPerView === 2
											? "w-[calc(50%-8px)] max-w-xs"
											: "w-[calc(25%-18px)] max-w-xs"
									}`}
								>
									<div className="relative h-[420px]">
										<Image
											src={event.image || "/placeholder.svg"}
											alt={event.title}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

										{/* Category Badge */}
										<div className="absolute top-4 left-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-semibold font-sans ${getCategoryColor(
													event.category
												)}`}
											>
												{event.category}
											</span>
										</div>

										{/* Event Info Overlay */}
										<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
											<h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-2 font-sans">
												{event.title}
											</h3>
											<div className="space-y-2">
												<div className="flex items-center text-xs md:text-sm font-sans">
													<Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
													<span>{event.date}</span>
												</div>
												<div className="flex items-center text-xs md:text-sm font-sans">
													<Clock className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
													<span>{event.time}</span>
												</div>
												<div className="flex items-center text-xs md:text-sm font-sans">
													<MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
													<span>{event.location}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Dots Indicator */}
					<div className="flex justify-center mt-8 space-x-2">
						{Array.from({ length: maxIndex + 1 }).map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-3 h-3 rounded-full transition-colors duration-200 ${
									index === currentIndex
										? "bg-blue-600"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
