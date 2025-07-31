// 'use client';

// import GrievanceCellPage from './grievance/page';

// export default function StudentLifePage() {
// 	return <GrievanceCellPage />;
// }


"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Users, Calendar, Building, Shield, BookOpen, Award, Heart, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const carouselImages = [
  {
    src: "/placeholder.svg?height=600&width=1200",
    title: "Welcome to BPIT Student Life",
    subtitle: "Where Innovation Meets Excellence",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    title: "State-of-the-Art Facilities",
    subtitle: "Learn in World-Class Infrastructure",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    title: "Vibrant Campus Culture",
    subtitle: "Celebrate, Learn, and Grow Together",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    title: "Innovation Hub",
    subtitle: "Shape Tomorrow's Technology Today",
  },
]

const quickLinks = [
  {
    icon: Building,
    title: "Campus Facilities",
    description: "Explore our modern infrastructure, labs, library, and recreational facilities",
    href: "/student-life/campus-facilities",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Clubs & Societies",
    description: "Join technical, cultural, and sports clubs to enhance your skills",
    href: "/student-life/clubs-and-societies",
    color: "bg-green-500",
  },
  {
    icon: Calendar,
    title: "Events & Festivals",
    description: "Participate in tech fests, cultural events, and competitions",
    href: "/student-life/events-and-festivals",
    color: "bg-purple-500",
  },
  {
    icon: Shield,
    title: "Student Grievance Cell",
    description: "Get support and guidance for academic and personal concerns",
    href: "/student-life/student-grievance-cell",
    color: "bg-red-500",
  },
  {
    icon: BookOpen,
    title: "Code of Conduct",
    description: "Understand the guidelines and values that shape our community",
    href: "/student-life/code-of-conduct",
    color: "bg-indigo-500",
  },
]

const highlights = [
  {
    icon: Award,
    title: "Excellence in Education",
    description: "NBA accredited programs with industry-relevant curriculum",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description: "Focus on technical skills, personality development, and values",
  },
  {
    icon: Zap,
    title: "Innovation Culture",
    description: "Encouraging creativity, research, and entrepreneurship",
  },
]

export default function StudentLifePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="relative w-full h-full">
          {carouselImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="max-w-4xl px-4"
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {image.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-light opacity-90">{image.subtitle}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore Student Life at <span className="text-blue-600">BPIT</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the vibrant campus life, world-class facilities, and endless opportunities that await you at
              Bhagwan Parshuram Institute of Technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={link.href}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div
                        className={`${link.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <link.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{link.description}</p>
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 bg-transparent"
                        >
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose BPIT?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Experience excellence in education with our commitment to innovation, quality, and holistic student
              development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <highlight.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{highlight.title}</h3>
                <p className="text-blue-100 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards an exceptional educational journey at BPIT.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
