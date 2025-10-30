"use client"

import { motion } from "framer-motion"
import {
  Building,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  BookOpen,
  FlaskConical,
  Monitor,
  Home,
  TreePine,
  Coffee,
  Gamepad2,
  Heart,
  MapPin,
  Star,
  Quote,
  Play,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import DynamicSidebar from '@/components/ui/DynamicSidebar'
import StudentLifeContentWrapper from '@/app/(Public Pages)/student-life/components/StudentLifeContentWrapper'
import { studentLifeSidebarData } from '@/data/sidebar'

const facilityCategories = [
  {
    id: "academic",
    name: "Academic",
    icon: BookOpen,
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: "residential",
    name: "Residential",
    icon: Home,
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: "recreational",
    name: "Recreation",
    icon: Dumbbell,
    color: "bg-purple-600",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: "dining",
    name: "Dining",
    icon: Utensils,
    color: "bg-orange-600",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    id: "support",
    name: "Support",
    icon: Heart,
    color: "bg-red-600",
    gradient: "from-red-500 to-red-700",
  },
]

// Student testimonials with real vibes
const studentTestimonials = [
  {
    name: "Arjun Sharma",
    year: "3rd Year CSE",
    image: "/events/img1.png",
    quote:
      "The labs here are literally fire! 🔥 Working on AI projects at 2 AM hits different when you have 24/7 access.",
    facility: "Computer Labs",
    rating: 5,
  },
  {
    name: "Priya Patel",
    year: "2nd Year ECE",
    image: "/events/img2.png",
    quote:
      "Hostel life = best life! Made my squad here and we're inseparable. Plus the Wi-Fi never lets us down during Netflix marathons 📺",
    facility: "Girls Hostel",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    year: "4th Year ME",
    image: "/events/img1.png",
    quote:
      "From zero to hero in the gym! The fitness center transformed my college experience. Now I'm the guy who actually enjoys morning workouts 💪",
    facility: "Fitness Center",
    rating: 5,
  },
]

// Fun facts that Gen Z loves
const funFacts = [
  {
    icon: "☕",
    fact: "Students consume 2,000+ cups of coffee daily",
    subtitle: "Fuel for late-night coding sessions",
  },
  {
    icon: "📚",
    fact: "Library has books older than your grandparents",
    subtitle: "Some from the 1800s!",
  },
  {
    icon: "🏃‍♂️",
    fact: "Students walk 15,000+ steps daily on campus",
    subtitle: "Who needs a gym membership?",
  },
  {
    icon: "🍕",
    fact: "Pizza is ordered 500+ times per month",
    subtitle: "The unofficial campus currency",
  },
]

// Day in the life scenarios
const dayInLifeScenarios = [
  {
    time: "7:00 AM",
    activity: "Wake up in cozy hostel room",
    emoji: "😴➡️😊",
    description: "AC rooms make waking up less painful",
  },
  {
    time: "8:30 AM",
    activity: "Grab breakfast at cafeteria",
    emoji: "🍳☕",
    description: "Fuel up for the day ahead",
  },
  {
    time: "9:00 AM",
    activity: "Smart classroom learning",
    emoji: "🧠💡",
    description: "Interactive boards make learning fun",
  },
  {
    time: "2:00 PM",
    activity: "Lab work & projects",
    emoji: "🔬💻",
    description: "Where magic happens",
  },
  {
    time: "6:00 PM",
    activity: "Gym session",
    emoji: "💪🏋️",
    description: "Stress relief mode activated",
  },
  {
    time: "8:00 PM",
    activity: "Library study time",
    emoji: "📚🤓",
    description: "Quiet zone for deep focus",
  },
]

const facilities = {
  academic: [
    {
      icon: Building,
      title: "Smart Classrooms",
      description:
        "Air-conditioned classrooms with interactive whiteboards, projectors, and modern seating arrangements for enhanced learning experience.",
      image: "/events/img2.png",
      features: ["Interactive Whiteboards", "HD Projectors", "Audio Systems", "Climate Control"],
      capacity: "60 students",
      count: "50+ Rooms",
      studentQuote: "No more sweating during presentations! 😅",
      coolFactor: "Tech-enabled learning",
    },
    {
      icon: FlaskConical,
      title: "Advanced Laboratories",
      description:
        "State-of-the-art labs equipped with latest instruments for Computer Science, Electronics, Mechanical, and Civil Engineering.",
      image: "/events/img1.png",
      features: ["Latest Equipment", "Safety Protocols", "Research Facilities", "24/7 Access"],
      capacity: "30 students",
      count: "25+ Labs",
      studentQuote: "Where I built my first robot! 🤖",
      coolFactor: "Innovation playground",
    },
    {
      icon: BookOpen,
      title: "Central Library",
      description:
        "Modern library with vast collection of books, journals, digital resources, and comfortable study spaces with Wi-Fi connectivity.",
      image: "/events/img2.png",
      features: ["50,000+ Books", "Digital Library", "Study Halls", "Research Journals"],
      capacity: "500 students",
      count: "3 Floors",
      studentQuote: "My second home during exams! 📖",
      coolFactor: "Knowledge sanctuary",
    },
    {
      icon: Monitor,
      title: "Computer Centers",
      description:
        "High-performance computing labs with latest software and hardware for programming, design, and research work.",
      image: "/events/img1.png",
      features: ["Latest Software", "High-end Hardware", "24/7 Support", "Internet Access"],
      capacity: "40 students",
      count: "10+ Centers",
      studentQuote: "Coding till 3 AM never felt so good! 💻",
      coolFactor: "Digital fortress",
    },
  ],
  residential: [
    {
      icon: Home,
      title: "Boys Hostel",
      description:
        "Comfortable accommodation with modern amenities, Wi-Fi, and 24/7 security for a safe living environment.",
      image: "/events/img2.png",
      features: ["AC Rooms", "Wi-Fi", "24/7 Security", "Laundry Service"],
      capacity: "500 students",
      count: "2 Blocks",
      studentQuote: "Brotherhood starts here! 👬",
      coolFactor: "Home away from home",
    },
    {
      icon: Home,
      title: "Girls Hostel",
      description:
        "Secure and comfortable accommodation with all modern facilities and dedicated support staff for female students.",
      image: "/events/img1.png",
      features: ["AC Rooms", "Wi-Fi", "24/7 Security", "Common Areas"],
      capacity: "300 students",
      count: "1 Block",
      studentQuote: "Squad goals achieved! 👭",
      coolFactor: "Safe & stylish living",
    },
    {
      icon: Wifi,
      title: "Wi-Fi Campus",
      description:
        "High-speed internet connectivity throughout the campus including hostels, classrooms, and outdoor areas.",
      image: "/events/img2.png",
      features: ["24/7 Connectivity", "High-Speed Internet", "Campus-wide Coverage", "Secure Network"],
      capacity: "Unlimited",
      count: "100% Coverage",
      studentQuote: "Never missed a meme! 📱",
      coolFactor: "Always connected",
    },
  ],
  recreational: [
    {
      icon: Dumbbell,
      title: "Fitness Center",
      description: "Fully equipped gymnasium with modern exercise equipment, personal trainers, and fitness programs.",
      image: "/events/img1.png",
      features: ["Modern Equipment", "Personal Trainers", "Group Classes", "Cardio Zone"],
      capacity: "50 students",
      count: "2000 sq ft",
      studentQuote: "Glow up started here! ✨",
      coolFactor: "Transformation station",
    },
    {
      icon: TreePine,
      title: "Sports Complex",
      description:
        "Comprehensive sports facilities including cricket ground, basketball court, tennis court, and indoor games.",
      image: "/events/img2.png",
      features: ["Cricket Ground", "Basketball Court", "Tennis Court", "Indoor Games"],
      capacity: "200 students",
      count: "5 Acres",
      studentQuote: "Where legends are born! 🏆",
      coolFactor: "Athletic paradise",
    },
    {
      icon: Gamepad2,
      title: "Recreation Center",
      description:
        "Indoor entertainment facility with games, music room, and spaces for cultural activities and relaxation.",
      image: "/events/img1.png",
      features: ["Indoor Games", "Music Room", "Entertainment Zone", "Cultural Space"],
      capacity: "100 students",
      count: "Multi-purpose",
      studentQuote: "Chill zone activated! 🎮",
      coolFactor: "Fun headquarters",
    },
  ],
  dining: [
    {
      icon: Utensils,
      title: "Main Cafeteria",
      description:
        "Spacious dining hall serving nutritious and delicious meals with multiple cuisine options at affordable prices.",
      image: "/events/img2.png",
      features: ["Multiple Cuisines", "Hygienic Preparation", "Affordable Prices", "AC Dining"],
      capacity: "400 students",
      count: "2 Floors",
      studentQuote: "Tastes like home! 🏠",
      coolFactor: "Flavor paradise",
    },
    {
      icon: Coffee,
      title: "Coffee Shop",
      description: "Cozy coffee shop perfect for study sessions, casual meetings, and quick snacks between classes.",
      image: "/events/img1.png",
      features: ["Fresh Coffee", "Light Snacks", "Study Space", "Free Wi-Fi"],
      capacity: "50 students",
      count: "Ground Floor",
      studentQuote: "My productivity partner! ☕",
      coolFactor: "Caffeine sanctuary",
    },
    {
      icon: Utensils,
      title: "Food Court",
      description: "Diverse food options from different vendors offering variety of cuisines and quick meal solutions.",
      image: "/events/img2.png",
      features: ["Multiple Vendors", "Quick Service", "Variety Options", "Outdoor Seating"],
      capacity: "200 students",
      count: "Open Air",
      studentQuote: "Food coma incoming! 🤤",
      coolFactor: "Culinary adventure",
    },
  ],
  support: [
    {
      icon: Car,
      title: "Transportation",
      description:
        "Convenient bus services connecting major areas of Delhi NCR with regular schedules and safe travel.",
      image: "/events/img1.png",
      features: ["Multiple Routes", "Safe Travel", "Affordable Fares", "Regular Schedule"],
      capacity: "50 per bus",
      count: "15+ Routes",
      studentQuote: "Never late to class! 🚌",
      coolFactor: "Reliable rides",
    },
    {
      icon: Heart,
      title: "Medical Center",
      description:
        "On-campus medical facility with qualified doctors and nurses for emergency care and regular health checkups.",
      image: "/events/img2.png",
      features: ["Qualified Doctors", "Emergency Care", "Regular Checkups", "First Aid"],
      capacity: "24/7 Service",
      count: "Ground Floor",
      studentQuote: "Health is wealth! 💊",
      coolFactor: "Wellness hub",
    },
    {
      icon: MapPin,
      title: "Campus Security",
      description:
        "Round-the-clock security with CCTV surveillance, security personnel, and emergency response systems.",
      image: "/events/img1.png",
      features: ["24/7 Security", "CCTV Surveillance", "Emergency Response", "Access Control"],
      capacity: "Full Campus",
      count: "50+ Guards",
      studentQuote: "Sleep peacefully! 😴",
      coolFactor: "Guardian angels",
    },
  ],
}

const campusStats = [
  { number: "50+", label: "Acres Campus", icon: TreePine },
  { number: "100+", label: "Laboratories", icon: FlaskConical },
  { number: "50K+", label: "Library Books", icon: BookOpen },
  { number: "24/7", label: "Wi-Fi Access", icon: Wifi },
  { number: "800+", label: "Hostel Capacity", icon: Home },
  { number: "15+", label: "Bus Routes", icon: Car },
]

export default function CampusFacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState("academic")

  return (
    <>
      {/* Full-width Hero Carousel Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Campus Facilities
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              Where comfort meets innovation - Experience facilities that make college life absolutely amazing! ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🏛️ Modern Infrastructure</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🏠 Comfortable Hostels</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🍽️ Delicious Food</span>
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

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Actually Say 💬</h2>
            <p className="text-xl text-gray-600">Real reviews from real students (no cap! 🧢)</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white rounded-xl shadow-lg border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.year}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <Quote className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-gray-700 italic">{testimonial.quote}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {testimonial.facility}
                      </span>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Campus Fun Facts 🤯</h2>
            <p className="text-xl opacity-90">Mind = Blown! These stats will surprise you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {funFacts.map((fact, index) => (
              <motion.div
                key={fact.fact}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{fact.icon}</div>
                <h3 className="text-xl font-bold mb-2">{fact.fact}</h3>
                <p className="text-blue-200 text-sm">{fact.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Day in the Life */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">A Day in Your Life at BPIT 📅</h2>
            <p className="text-xl text-gray-600">Spoiler alert: It's going to be amazing!</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            {dayInLifeScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.time}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 bg-white rounded-xl shadow-lg border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{scenario.emoji}</span>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {scenario.time}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{scenario.activity}</h4>
                      <p className="text-gray-600 text-sm">{scenario.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-12 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {facilityCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-semibold">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Facilities Grid */}
      <section className="py-10 px-2 sm:px-4 lg:px-6 bg-gradient-to-br from-gray-50 to-blue-50 w-full overflow-hidden">
        <div className="w-full max-w-full mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Section Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {facilityCategories.find(cat => cat.id === activeCategory)?.name} Facilities
                </h3>
                <p className="text-gray-600">Experience world-class facilities ✨</p>
              </div>

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
                       animation: 'smoothSlide 50s linear infinite',
                       animationPlayState: 'running',
                       width: 'max-content'
                     }}>
                {/* Duplicate facilities for infinite scroll effect */}
                {[...facilities[activeCategory as keyof typeof facilities], ...facilities[activeCategory as keyof typeof facilities]].map((facility, index) => (
                  <motion.div
                    key={`${facility.title}-${index}`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: (index % facilities[activeCategory as keyof typeof facilities].length) * 0.15,
                      ease: "easeOut"
                    }}
                    className="flex-shrink-0 w-80 group"
                    style={{ minWidth: '320px' }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-96 hover:shadow-xl transition-all duration-300">
                        {/* Image Section - Reduced height */}
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={facility.image || "/placeholder.svg"}
                            alt={facility.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Floating Elements */}
                          <div className="absolute top-3 left-3">
                            <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                              <facility.icon className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>

                          <div className="absolute top-3 right-3 flex flex-col gap-1">
                            <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold">
                              90% Happy
                            </div>
                            <div className="bg-blue-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold">
                              24/7
                            </div>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-lg font-bold text-white mb-1">{facility.title}</h3>
                            <div className="bg-yellow-400/90 backdrop-blur-sm px-2 py-1 rounded-full text-black text-xs font-bold inline-block">
                              {facility.coolFactor || "Amazing"}
                            </div>
                          </div>
                        </div>

                        {/* Content Section - Compact */}
                        <div className="p-4">
                          <p className="text-gray-600 mb-3 leading-relaxed text-sm line-clamp-2">{facility.description}</p>

                          {/* Stats Row */}
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg text-center">
                              <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                              <div className="text-xs font-bold text-gray-800">{facility.capacity || "N/A"}</div>
                              <div className="text-xs text-gray-600">Capacity</div>
                            </div>
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-2 rounded-lg text-center">
                              <Building className="w-4 h-4 text-green-600 mx-auto mb-1" />
                              <div className="text-xs font-bold text-gray-800">{facility.count || "Available"}</div>
                              <div className="text-xs text-gray-600">Available</div>
                            </div>
                          </div>

                          {/* Student Quote */}
                          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-3 border-l-2 border-yellow-400">
                            <p className="text-gray-800 text-xs italic">"{facility.studentQuote || "Amazing facility!"}"</p>
                          </div>

                          {/* Features - Compact */}
                          <div className="mb-3">
                            <div className="grid grid-cols-2 gap-1">
                              {facility.features.slice(0, 4).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-gray-700">
                                  <CheckCircle className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm">
                            Explore More
                            <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campus Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Campus by Numbers 📊</h2>
            <p className="text-xl opacity-90">Impressive statistics that showcase our commitment to excellence</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {campusStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Play className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Explore? 🚀</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take a virtual tour of our beautiful campus or schedule a visit to see our world-class facilities in
              person. Trust us, you'll love what you see! 😍
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                🎥 Virtual Tour
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg bg-transparent"
              >
                📅 Schedule Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

            </StudentLifeContentWrapper>
        </div>
      </div>
    </>
  )
}
