"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Star,
  Trophy,
  Music,
  Code,
  Users,
  MapPin,
  Award,
  ArrowRight,
  CheckCircle,
  Heart,
  Camera,
  Sparkles,
  Rocket,
  Crown,
  FlameIcon as Fire,
  Target,
  Lightbulb,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import StudentLifeContentWrapper from "@/app/student-life/components/StudentLifeContentWrapper"
import DynamicSidebar from '@/components/ui/DynamicSidebar'
import { studentLifeSidebarData } from "@/data/sidebar"
import { useState } from "react"

const eventTypes = [
  {
    id: "technical",
    name: "Tech Fests",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500",
    description: "Innovation meets competition",
    emoji: "💻",
    count: "15+ Events",
  },
  {
    id: "cultural",
    name: "Cultural Fests",
    icon: Music,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500",
    description: "Art, music, and creativity",
    emoji: "🎭",
    count: "20+ Events",
  },
  {
    id: "sports",
    name: "Sports Events",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500",
    description: "Athletic excellence",
    emoji: "🏆",
    count: "25+ Events",
  },
  {
    id: "competitions",
    name: "Competitions",
    icon: Target,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500",
    description: "Battle of talents",
    emoji: "🎯",
    count: "30+ Events",
  },
  {
    id: "workshops",
    name: "Workshops",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500",
    description: "Learn and grow",
    emoji: "💡",
    count: "40+ Sessions",
  },
  {
    id: "celebrity",
    name: "Celebrity Events",
    icon: Crown,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500",
    description: "Star-studded nights",
    emoji: "⭐",
    count: "10+ Stars",
  },
]

const pastEvents = [
  {
    id: 1,
    name: "INNOVATE 2023",
    type: "Technical Fest",
    category: "technical",
    date: "March 2023",
    image: "/events/img1.png",
    celebrity: "Sundar Pichai",
    celebrityRole: "CEO, Google",
    celebrityImage: "/placeholder.svg?height=100&width=100&text=Sundar+Pichai",
    participants: "5000+",
    prizes: "₹10 Lakhs",
    highlights: ["48-hour Hackathon", "AI/ML Workshop", "Startup Pitch", "Tech Talks"],
    studentQuote: "Meeting Sundar Pichai changed my perspective on technology! Got inspired to start my own startup 🚀",
    studentName: "Arjun Sharma, CSE 3rd Year",
    studentImage: "/placeholder.svg?height=60&width=60&text=Arjun",
    rating: 4.9,
    mediaCount: "500+ Photos",
    socialReach: "2M+ Views",
    achievements: ["Best Technical Fest Award", "Record Participation", "Industry Recognition"],
    funMoments: [
      "Sundar Pichai tried college canteen food",
      "24-hour coding marathon with pizza",
      "Students got job offers on spot",
      "Drone show finale was epic",
    ],
  },
  {
    id: 2,
    name: "CULTURAL CARNIVAL 2023",
    type: "Cultural Fest",
    category: "cultural",
    date: "October 2023",
    image: "/events/img2.png",
    celebrity: "Shreya Ghoshal",
    celebrityRole: "Playback Singer",
    celebrityImage: "/placeholder.svg?height=100&width=100&text=Shreya+Ghoshal",
    participants: "3000+",
    prizes: "₹5 Lakhs",
    highlights: ["Live Concert", "Dance Battle", "Fashion Show", "Art Exhibition"],
    studentQuote:
      "Performing on the same stage as Shreya Ghoshal was a dream come true! She even complimented my voice 🎤",
    studentName: "Priya Patel, ECE 2nd Year",
    studentImage: "/placeholder.svg?height=60&width=60&text=Priya",
    rating: 4.8,
    mediaCount: "800+ Photos",
    socialReach: "1.5M+ Views",
    achievements: ["Best Cultural Event", "Celebrity Appreciation", "Media Coverage"],
    funMoments: [
      "Shreya Ghoshal sang with students",
      "Flash mob surprised everyone",
      "Bollywood dance-off went viral",
      "Food festival was a hit",
    ],
  },
  {
    id: 3,
    name: "SPORTS EXTRAVAGANZA 2023",
    type: "Sports Festival",
    category: "sports",
    date: "February 2023",
    image: "/events/img3.png",
    celebrity: "P.V. Sindhu",
    celebrityRole: "Olympic Medalist",
    celebrityImage: "/placeholder.svg?height=100&width=100&text=PV+Sindhu",
    participants: "2000+",
    prizes: "₹3 Lakhs",
    highlights: ["Inter-College Tournament", "Olympic Training", "Sports Clinic", "Fitness Challenge"],
    studentQuote: "Training with P.V. Sindhu motivated me to pursue badminton professionally! Now I'm in state team 🏸",
    studentName: "Rohit Kumar, ME 4th Year",
    studentImage: "/placeholder.svg?height=60&width=60&text=Rohit",
    rating: 4.7,
    mediaCount: "300+ Photos",
    socialReach: "800K+ Views",
    achievements: ["Sports Excellence Award", "Olympic Inspiration", "Fitness Revolution"],
    funMoments: [
      "P.V. Sindhu played with students",
      "Marathon across Delhi",
      "Yoga session at sunrise",
      "Victory dance celebrations",
    ],
  },
  {
    id: 4,
    name: "STARTUP SUMMIT 2023",
    type: "Entrepreneurship Event",
    category: "competitions",
    date: "September 2023",
    image: "/events/img1.png",
    celebrity: "Ritesh Agarwal",
    celebrityRole: "Founder, OYO",
    celebrityImage: "/placeholder.svg?height=100&width=100&text=Ritesh+Agarwal",
    participants: "1500+",
    prizes: "₹15 Lakhs",
    highlights: ["Pitch Competition", "Investor Meet", "Mentorship", "Funding Opportunities"],
    studentQuote:
      "Ritesh's mentorship helped me secure ₹50L funding for my startup! From idea to reality in 6 months 💰",
    studentName: "Ananya Singh, CSE 4th Year",
    studentImage: "/placeholder.svg?height=60&width=60&text=Ananya",
    rating: 4.9,
    mediaCount: "200+ Photos",
    socialReach: "1M+ Views",
    achievements: ["5 Startups Funded", "Investor Network", "Entrepreneurship Hub"],
    funMoments: [
      "Ritesh invested in student startup",
      "Shark Tank style pitches",
      "Networking over chai",
      "Success stories shared",
    ],
  },
]

const upcomingEvents = [
  {
    id: 1,
    name: "TECH REVOLUTION 2024",
    type: "Technical Mega Fest",
    category: "technical",
    date: "March 15-17, 2024",
    time: "9:00 AM onwards",
    venue: "Main Campus",
    image: "/events/img2.png",
    celebrity: "Elon Musk",
    celebrityRole: "CEO, Tesla & SpaceX",
    celebrityConfirmed: false,
    expectedParticipants: "8000+",
    prizePool: "₹25 Lakhs",
    registrationFee: "₹500",
    earlyBird: "₹300 (Till Feb 15)",
    highlights: ["AI/ML Hackathon", "Robotics Competition", "Space Tech Workshop", "Tesla Factory Tour"],
    specialFeatures: ["VR Experience Zone", "Drone Racing", "3D Printing Lab", "Startup Expo"],
    registrationStatus: "Open",
    seatsFilled: 65,
    trending: true,
    newEvent: false,
  },
  {
    id: 2,
    name: "BOLLYWOOD NIGHTS 2024",
    type: "Cultural Spectacular",
    category: "cultural",
    date: "April 20-21, 2024",
    time: "6:00 PM onwards",
    venue: "Open Air Theatre",
    image: "/events/img3.png",
    celebrity: "Ranveer Singh",
    celebrityRole: "Bollywood Actor",
    celebrityConfirmed: true,
    expectedParticipants: "5000+",
    prizePool: "₹8 Lakhs",
    registrationFee: "₹200",
    earlyBird: "₹150 (Till March 20)",
    highlights: ["Live Performance", "Dance Competition", "Fashion Show", "Celebrity Meet"],
    specialFeatures: ["Red Carpet Entry", "Photo Booth", "Food Festival", "DJ Night"],
    registrationStatus: "Open",
    seatsFilled: 80,
    trending: true,
    newEvent: true,
  },
  {
    id: 3,
    name: "OLYMPIC DREAMS 2024",
    type: "Sports Championship",
    category: "sports",
    date: "February 10-12, 2024",
    time: "7:00 AM onwards",
    venue: "Sports Complex",
    image: "/events/img1.png",
    celebrity: "Neeraj Chopra",
    celebrityRole: "Olympic Gold Medalist",
    celebrityConfirmed: true,
    expectedParticipants: "3000+",
    prizePool: "₹5 Lakhs",
    registrationFee: "₹100",
    earlyBird: "₹75 (Till Jan 25)",
    highlights: ["Athletics Meet", "Olympic Training", "Sports Clinic", "Fitness Challenge"],
    specialFeatures: ["Olympic Simulator", "Sports Medicine", "Nutrition Workshop", "Medal Ceremony"],
    registrationStatus: "Filling Fast",
    seatsFilled: 90,
    trending: false,
    newEvent: false,
  },
]

const studentExperiences = [
  {
    id: 1,
    name: "Arjun Sharma",
    year: "CSE 3rd Year",
    event: "INNOVATE 2023",
    image: "/placeholder.svg?height=80&width=80&text=Arjun",
    experience:
      "Meeting Sundar Pichai was surreal! He reviewed my AI project and gave valuable feedback. Got a Google internship offer the next month! 🚀",
    rating: 5,
    eventImage: "/events/img1.png",
    achievement: "Google Internship",
    beforeAfter: {
      before: "Nervous CS student",
      after: "Google Intern",
    },
    socialMedia: "@arjun_codes",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Patel",
    year: "ECE 2nd Year",
    event: "Cultural Carnival 2023",
    image: "/placeholder.svg?height=80&width=80&text=Priya",
    experience:
      "Shreya Ghoshal heard me sing and invited me to her concert! Now I'm pursuing music professionally alongside engineering 🎤",
    rating: 5,
    eventImage: "/events/img2.png",
    achievement: "Music Career Launch",
    beforeAfter: {
      before: "Shy singer",
      after: "Professional artist",
    },
    socialMedia: "@priya_melodies",
    verified: true,
  },
  {
    id: 3,
    name: "Rohit Kumar",
    year: "ME 4th Year",
    event: "Sports Extravaganza 2023",
    image: "/placeholder.svg?height=80&width=80&text=Rohit",
    experience:
      "P.V. Sindhu's training session changed my game completely! Made it to state badminton team and won gold medal 🏸",
    rating: 5,
    eventImage: "/events/img3.png",
    achievement: "State Champion",
    beforeAfter: {
      before: "College player",
      after: "State champion",
    },
    socialMedia: "@rohit_shuttler",
    verified: true,
  },
  {
    id: 4,
    name: "Ananya Singh",
    year: "CSE 4th Year",
    event: "Startup Summit 2023",
    image: "/placeholder.svg?height=80&width=80&text=Ananya",
    experience:
      "Ritesh Agarwal mentored my startup idea and connected me with investors. Raised ₹50L funding and now running a successful EdTech startup! 💰",
    rating: 5,
    eventImage: "/events/img1.png",
    achievement: "₹50L Funding",
    beforeAfter: {
      before: "Student with idea",
      after: "Funded entrepreneur",
    },
    socialMedia: "@ananya_startup",
    verified: true,
  },
]

const eventStats = [
  { number: "100+", label: "Events Annually", icon: Calendar, color: "text-blue-600" },
  { number: "50K+", label: "Total Participants", icon: Users, color: "text-green-600" },
  { number: "₹1Cr+", label: "Prize Money", icon: Trophy, color: "text-yellow-600" },
  { number: "25+", label: "Celebrity Guests", icon: Star, color: "text-purple-600" },
  { number: "10M+", label: "Social Media Reach", icon: Heart, color: "text-red-600" },
  { number: "500+", label: "Media Coverage", icon: Camera, color: "text-indigo-600" },
]

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 17H9.154a3.374 3.374 0 00-1.849-1.153l-.548-.547z"
    />
  </svg>
)

export default function EventsAndFestivalsPage() {
  const [activeEventType, setActiveEventType] = useState("all")

  const filteredPastEvents =
    activeEventType === "all" ? pastEvents : pastEvents.filter((event) => event.category === activeEventType)

  return (
    <div className="min-h-screen">
      {/* Hero Section - Campus Facilities Style */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Events & Festivals
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              Where dreams come true and legends are born - Experience the most epic events that transform lives! ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🎉 100+ Events</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">⭐ Celebrity Guests</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🏆 ₹1Cr+ Prizes</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className='container mx-auto px-4 py-12 max-w-full overflow-hidden'>
        <div className='flex flex-col lg:flex-row gap-8 w-full max-w-full'>
          {/* Sidebar Navigation */}
          <DynamicSidebar
            navItems={studentLifeSidebarData.navItems}
            theme={studentLifeSidebarData.theme}
          />

          {/* Content Area */}
          <StudentLifeContentWrapper>
            {/* Event Types Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-5xl font-bold text-gray-900 mb-6">Choose Your Adventure 🎯</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    From tech hackathons to celebrity concerts - find your passion and make it legendary!
                  </p>
                </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
                onClick={() => setActiveEventType(type.id)}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${type.color} p-4 text-white transform transition-all duration-500 h-full flex flex-col justify-between min-h-[180px] ${activeEventType === type.id ? "scale-105 shadow-2xl ring-4 ring-white/50" : ""}`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="relative z-10 text-center flex flex-col justify-between h-full">
                    <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <div className="text-2xl mb-2">{type.emoji}</div>
                      {type.icon === Lightbulb && <LightbulbIcon className="w-6 h-6 mx-auto mb-2" />}
                      {type.icon !== Lightbulb && <type.icon className="w-6 h-6 mx-auto mb-2" />}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-sm mb-1">{type.name}</h3>
                      <p className="text-xs opacity-90 mb-2">{type.description}</p>
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
                        {type.count}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-white/10 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full shadow-lg"
                onClick={() => document.getElementById("legendary-events")?.scrollIntoView({ behavior: "smooth" })}
              >
                🌟 Famous Events
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full shadow-lg"
                onClick={() => document.getElementById("student-experiences")?.scrollIntoView({ behavior: "smooth" })}
              >
                💫 Life-Changing Stories
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg"
                onClick={() => document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" })}
              >
                🚀 Upcoming Events
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events Showcase */}
      <section id="legendary-events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Legendary Events That Made History 🌟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Relive the magic of our past events where students met their heroes and dreams came true!
            </p>
          </motion.div>

          <div className="space-y-20">
            {filteredPastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  {/* Event Image */}
                  <motion.div
                    className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        width={600}
                        height={500}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Event Badge */}
                      <motion.div
                        className="absolute top-6 left-6"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        viewport={{ once: true }}
                      >
                        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-800">{event.date}</span>
                        </div>
                      </motion.div>

                      {/* Stats Overlay */}
                      <motion.div
                        className="absolute bottom-6 left-6 right-6"
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center text-white">
                            <Users className="w-5 h-5 mx-auto mb-1" />
                            <div className="font-bold text-sm">{event.participants}</div>
                            <div className="text-xs opacity-80">Participants</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center text-white">
                            <Trophy className="w-5 h-5 mx-auto mb-1" />
                            <div className="font-bold text-sm">{event.prizes}</div>
                            <div className="text-xs opacity-80">Prizes</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center text-white">
                            <Star className="w-5 h-5 mx-auto mb-1" />
                            <div className="font-bold text-sm">{event.rating}</div>
                            <div className="text-xs opacity-80">Rating</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Event Content */}
                  <motion.div
                    className="space-y-6"
                    initial={{ x: index % 2 === 0 ? 100 : -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
                          {event.type}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(event.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">{event.rating}/5</span>
                        </div>
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{event.name}</h3>
                    </motion.div>

                    {/* Celebrity Section */}
                    <motion.div
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-400"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={event.celebrityImage || "/placeholder.svg"}
                          alt={event.celebrity}
                          width={60}
                          height={60}
                          className="rounded-full border-3 border-yellow-400"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <Crown className="w-5 h-5 text-yellow-600" />
                            <span className="font-bold text-yellow-800">Celebrity Guest</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900">{event.celebrity}</h4>
                          <p className="text-gray-600">{event.celebrityRole}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Student Experience */}
                    <motion.div
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-4">
                        <Image
                          src={event.studentImage || "/placeholder.svg"}
                          alt={event.studentName}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="font-semibold text-gray-800">Student Experience</span>
                          </div>
                          <p className="text-gray-700 italic mb-2">"{event.studentQuote}"</p>
                          <p className="text-sm font-semibold text-blue-600">- {event.studentName}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Event Highlights */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                        Event Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {event.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 1.4 + idx * 0.1, type: "spring", stiffness: 200 }}
                            viewport={{ once: true }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Impact & Achievements */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      viewport={{ once: true }}
                    >
                      {event.achievements.map((achievement, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          🏆 {achievement}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg">
                        View Full Gallery
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Experiences */}
      <section id="student-experiences" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Life-Changing Experiences 💫</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real students whose lives were transformed by our events!
            </p>
          </motion.div>

          {/* Smooth Horizontal Scrolling Cards */}
          <div className="overflow-hidden w-full max-w-full">
            <style jsx>{`
              @keyframes smoothSlide {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              
              /* Pause animation on hover for better UX */
              .animated-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex gap-6 pb-4 px-4 animated-container"
                 style={{ 
                   scrollbarWidth: 'none', 
                   msOverflowStyle: 'none',
                   animation: 'smoothSlide 40s linear infinite',
                   animationPlayState: 'running',
                   width: 'max-content'
                 }}>
            {/* Duplicate experiences for infinite scroll effect */}
            {[...studentExperiences, ...studentExperiences].map((student, index) => (
              <motion.div
                key={`${student.id}-${index}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: (index % studentExperiences.length) * 0.15,
                  ease: "easeOut"
                }}
                className="flex-shrink-0 w-80 group"
                style={{ minWidth: '320px' }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl p-6 h-full flex flex-col shadow-lg">
                    {/* Student Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={student.image || "/placeholder.svg"}
                            alt={student.name}
                            width={50}
                            height={50}
                            className="rounded-full border-2 border-purple-200"
                          />
                          {student.verified && (
                            <motion.div
                              className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                            >
                              <CheckCircle className="w-2 h-2 text-white" />
                            </motion.div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{student.name}</h4>
                          <p className="text-gray-600 text-xs">{student.year}</p>
                          <p className="text-purple-600 text-xs font-semibold">{student.event}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(student.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                          >
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="relative mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={student.eventImage || "/placeholder.svg"}
                        alt={`${student.name} at ${student.event}`}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
                        {student.event}
                      </div>
                    </div>

                    {/* Experience Quote */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-4 flex-grow">
                      <p className="text-gray-700 italic text-sm leading-relaxed">"{student.experience}"</p>
                    </div>

                    {/* Before/After Transformation */}
                    <div className="bg-gradient-to-r from-red-50 to-green-50 p-3 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <div className="text-center">
                          <div className="text-red-600 font-bold text-xs">BEFORE</div>
                          <div className="text-gray-700 text-xs">{student.beforeAfter.before}</div>
                        </div>
                        <motion.div
                          className="text-lg"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          ➡️
                        </motion.div>
                        <div className="text-center">
                          <div className="text-green-600 font-bold text-xs">AFTER</div>
                          <div className="text-gray-700 text-xs">{student.beforeAfter.after}</div>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        {student.achievement}
                      </div>
                      <div className="text-blue-600 text-xs font-semibold">{student.socialMedia}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Next Level Events Coming Soon 🚀</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get ready for the most epic events of 2024! Early bird registrations are now open!
            </p>
          </motion.div>

          {/* Smooth Horizontal Scrolling Cards */}
          <div className="overflow-hidden w-full max-w-full">
            <style jsx>{`
              @keyframes smoothSlide {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              
              /* Pause animation on hover for better UX */
              .animated-container:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="flex gap-6 pb-4 px-4 animated-container"
                 style={{ 
                   scrollbarWidth: 'none', 
                   msOverflowStyle: 'none',
                   animation: 'smoothSlide 45s linear infinite',
                   animationPlayState: 'running',
                   width: 'max-content'
                 }}>
            {/* Duplicate events for infinite scroll effect */}
            {[...upcomingEvents, ...upcomingEvents].map((event, index) => (
              <motion.div
                key={`${event.id}-${index}`}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: (index % upcomingEvents.length) * 0.2,
                  ease: "easeOut"
                }}
                className="flex-shrink-0 w-80 group"
                style={{ minWidth: '320px' }}
                whileHover={{ y: -10, rotateY: 5 }}
              >
                <div className="relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-lg">
                    {/* Event Image */}
                    <div className="relative h-48">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {event.trending && (
                          <motion.div
                            className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                          >
                            <Fire className="w-3 h-3 mr-1" />
                            Trending
                          </motion.div>
                        )}
                        {event.newEvent && (
                          <motion.div
                            className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                          >
                            New Event
                          </motion.div>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            event.registrationStatus === "Open"
                              ? "bg-green-500 text-white"
                              : event.registrationStatus === "Filling Fast"
                                ? "bg-orange-500 text-white"
                                : "bg-red-500 text-white"
                          }`}
                        >
                          {event.registrationStatus}
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white mb-1">{event.name}</h3>
                        <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold inline-block">
                          {event.type}
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-4 flex-grow flex flex-col">
                      {/* Date & Venue */}
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3 text-blue-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <MapPin className="w-3 h-3 text-red-600" />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Celebrity */}
                      <motion.div
                        className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 mb-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Crown className="w-4 h-4 text-yellow-600" />
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{event.celebrity}</div>
                            <div className="text-xs text-gray-600">{event.celebrityRole}</div>
                            <div
                              className={`text-xs font-semibold ${event.celebrityConfirmed ? "text-green-600" : "text-orange-600"}`}
                            >
                              {event.celebrityConfirmed ? "✅ Confirmed" : "⏳ Pending"}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-center">
                          <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                          <div className="font-bold text-gray-900 text-xs">{event.expectedParticipants}</div>
                          <div className="text-xs text-gray-600">Expected</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg text-center">
                          <Trophy className="w-4 h-4 text-green-600 mx-auto mb-1" />
                          <div className="font-bold text-gray-900 text-xs">{event.prizePool}</div>
                          <div className="text-xs text-gray-600">Prize Pool</div>
                        </div>
                      </div>

                      {/* Registration Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-gray-700">Registration</span>
                          <span className="text-xs font-bold text-blue-600">{event.seatsFilled}% filled</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${event.seatsFilled}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                          />
                        </div>
                        {event.seatsFilled > 80 && (
                          <motion.div
                            className="text-xs text-red-600 mt-1 font-semibold"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          >
                            ⚡ Filling Fast!
                          </motion.div>
                        )}
                      </div>

                      {/* Pricing */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-gray-600">Regular</div>
                            <div className="font-bold text-gray-900 text-sm">{event.registrationFee}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-green-600">Early Bird</div>
                            <div className="font-bold text-green-600 text-sm">{event.earlyBird}</div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 mt-auto">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-full text-sm shadow-lg">
                            Register Now 🎉
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className="w-full border-gray-300 hover:bg-gray-50 py-2 rounded-full text-sm bg-transparent"
                          >
                            Learn More
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event Statistics */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6">Numbers That Speak Volumes 📊</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Our events don't just entertain - they transform lives and create lasting impact!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {eventStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
                whileHover={{ scale: 1.1, rotateY: 10 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 group-hover:bg-white/20 transition-all duration-300">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Ready to Make History? 🌟</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't just watch from the sidelines - be part of the events that will define your college experience and
              shape your future!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-6 text-xl rounded-full shadow-2xl"
                >
                  🎉 Join Next Event
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-12 py-6 text-xl rounded-full bg-transparent"
                >
                  📅 View Full Calendar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      </StudentLifeContentWrapper>
        </div>
      </div>
    </div>
  )
}
