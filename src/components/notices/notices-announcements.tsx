import Image from "next/image"
import { Calendar, ExternalLink } from "lucide-react"

const notices = [
	{
		id: 1,
		category: "Academic",
		title: "Mid-semester examination schedule released",
		date: "Dec 28, 2024",
		image: "/events/img1.png?height=60&width=60",
	},
	{
		id: 2,
		category: "Financial Aid",
		title: "Education loans available through PM Vidya laxmi scheme",
		date: "Dec 25, 2024",
		image: "/events/img2.png?height=60&width=60",
	},
	{
		id: 3,
		category: "Admission",
		title: "Last date for semester registration extended",
		date: "Dec 24, 2024",
		image: "/events/img1.png?height=60&width=60",
	},
    {
		id: 4,
		category: "Admission",
		title: "Last date for semester registration extended",
		date: "Dec 24, 2024",
		image: "/events/img2.png?height=60&width=60",
	},
]

const announcements = [
	{
		id: 1,
		category: "Innovation",
		title: "Note for Institute Innovation Council (IIC)",
		date: "Dec 24, 2024",
		image: "/events/img1.png?height=60&width=60",
	},
	{
		id: 2,
		category: "Sports",
		title: "Inter-college basketball tournament registration open",
		date: "Dec 23, 2024",
		image: "/events/img2.png?height=60&width=60",
	},
	{
		id: 3,
		category: "Library",
		title: "New digital resources added to library portal",
		date: "Dec 22, 2024",
		image: "/events/img1.png?height=60&width=60",
	},
    {
		id: 4,
		category: "Sports",
		title: "Inter-college basketball tournament registration open",
		date: "Dec 23, 2024",
		image: "/events/img2.png?height=60&width=60",
	},
]

export default function NoticesAnnouncementsSection() {
	return (
		<section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
					{/* Notices */}
					<div className="space-y-6">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-2xl md:text-3xl font-bold text-gray-600 font-sans">
								Notices
							</h2>
							<a
								href="#"
								className="border border-blue-600 text-blue-600 hover:border-black hover:text-black px-6 py-2 rounded-lg font-semibold transition-colors bg-transparent font-sans"
								style={{ background: "none" }}
							>
								View All Notices
							</a>
						</div>
						<div className="space-y-6">
							{notices.map((notice) => (
								<div
									key={notice.id}
									className="flex min-h-[80px] group cursor-pointer bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 overflow-hidden"
								>
									{/* Left Image - Rectangular and flush to left, full height */}
									<div className="flex-shrink-0">
										<div className="w-20 h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center overflow-hidden">
											<Image
												src={notice.image || "/placeholder.svg"}
												alt="Notice preview"
												width={80}
												height={80}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									{/* Content - Properly centered */}
									<div className="flex-1 min-w-0 flex items-center">
										<div className="w-full p-4">
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1">
													<span
														className={`inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-2`}
													>
														{notice.category}
													</span>
													<h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
														{notice.title}
													</h3>
													<p className="text-xs text-gray-500 flex items-center gap-1">
														<Calendar className="w-3 h-3" />
														{notice.date}
													</p>
												</div>
												<ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0 ml-2" />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Vertical Separator */}
					<div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 opacity-20" style={{ zIndex: 1 }}></div>

					{/* Announcements */}
					<div className="space-y-6">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-2xl md:text-3xl font-bold text-gray-600 font-sans">
								Announcements
							</h2>
							<a
								href="#"
								className="border border-blue-600 text-blue-600 hover:border-black hover:text-black px-6 py-2 rounded-lg font-semibold transition-colors bg-transparent font-sans"
								style={{ background: "none" }}
							>
								View All Announcements
							</a>
						</div>
						<div className="space-y-6">
							{announcements.map((announcement) => (
								<div
									key={announcement.id}
									className="flex min-h-[80px] group cursor-pointer bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 overflow-hidden"
								>
									{/* Left Image - Rectangular and flush to left, full height */}
									<div className="flex-shrink-0">
										<div className="w-20 h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center overflow-hidden">
											<Image
												src={announcement.image || "/placeholder.svg"}
												alt="Announcement preview"
												width={80}
												height={80}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
									{/* Content - Properly centered */}
									<div className="flex-1 min-w-0 flex items-center">
										<div className="w-full p-4">
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1">
													<span
														className={`inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full mb-2`}
													>
														{announcement.category}
													</span>
													<h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
														{announcement.title}
													</h3>
													<p className="text-xs text-gray-500 flex items-center gap-1">
														<Calendar className="w-3 h-3" />
														{announcement.date}
													</p>
												</div>
												<ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0 ml-2" />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
