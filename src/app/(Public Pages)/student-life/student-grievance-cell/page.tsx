"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  Users,
  FileText,
  MessageCircle,
  Award,
  CheckCircle,
  AlertTriangle,
  User,
  Send,
  Star,
  Headphones,
  BookOpen,
  Scale,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StudentLifeContentWrapper from "@/app/(Public Pages)/student-life/components/StudentLifeContentWrapper"
import DynamicSidebar from '@/components/ui/DynamicSidebar'
import { studentLifeSidebarData } from "@/data/sidebar"
import Image from "next/image"
import { useState } from "react"

const services = [
  {
    icon: Shield,
    title: "Academic Grievances",
    description: "Issues related to academic evaluation, course content, faculty concerns, and examination matters",
    examples: ["Grade disputes", "Faculty behavior", "Course delivery issues", "Examination problems"],
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
    successRate: "92%",
    avgResolutionTime: "5-7 days",
    totalCases: "250+",
  },
  {
    icon: Users,
    title: "Personal Counseling",
    description: "Confidential support for personal, emotional, and psychological challenges",
    examples: ["Stress management", "Personal conflicts", "Emotional support", "Career guidance"],
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
    successRate: "96%",
    avgResolutionTime: "Same day",
    totalCases: "400+",
  },
  {
    icon: FileText,
    title: "Administrative Issues",
    description: "Problems related to college administration, facilities, and student services",
    examples: ["Fee-related issues", "Facility problems", "Documentation", "Service complaints"],
    color: "bg-purple-600",
    gradient: "from-purple-500 to-purple-700",
    successRate: "89%",
    avgResolutionTime: "3-5 days",
    totalCases: "180+",
  },
  {
    icon: MessageCircle,
    title: "Harassment & Discrimination",
    description: "Safe reporting and resolution of harassment, discrimination, and misconduct cases",
    examples: ["Workplace harassment", "Discrimination", "Bullying", "Misconduct reporting"],
    color: "bg-red-600",
    gradient: "from-red-500 to-red-700",
    successRate: "98%",
    avgResolutionTime: "24-48 hours",
    totalCases: "50+",
  },
]

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91-11-2757-1080", "+91-11-2757-1081"],
    description: "Available during office hours",
    availability: "Mon-Fri: 9 AM - 6 PM",
    responseTime: "Immediate",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: ["grievance@bpitindia.com", "support@bpitindia.com"],
    description: "Response within 24 hours",
    availability: "24/7 Available",
    responseTime: "Within 24 hours",
  },
  {
    icon: MapPin,
    title: "Office Location",
    details: ["Student Affairs Office", "Ground Floor, Admin Block"],
    description: "PSP-4, Sector-17, Rohini",
    availability: "Mon-Sat: 9 AM - 5 PM",
    responseTime: "Walk-in welcome",
  },
  {
    icon: Headphones,
    title: "Live Chat",
    details: ["WhatsApp: +91-98765-43210", "Telegram: @BPITSupport"],
    description: "Instant messaging support",
    availability: "24/7 Available",
    responseTime: "Within 5 minutes",
  },
]

const process = [
  {
    step: "1",
    title: "Submit Complaint",
    description: "File your grievance through online form, email, or in-person visit",
    icon: FileText,
    details: [
      "Multiple submission channels available",
      "Anonymous reporting option",
      "Evidence upload supported",
      "Immediate acknowledgment",
    ],
    timeframe: "Instant",
  },
  {
    step: "2",
    title: "Initial Review",
    description: "Our team reviews and assigns priority based on severity",
    icon: Scale,
    details: [
      "Case categorization and priority assignment",
      "Dedicated officer allocation",
      "Timeline establishment",
      "Stakeholder notification",
    ],
    timeframe: "Within 24 hours",
  },
  {
    step: "3",
    title: "Investigation",
    description: "Thorough investigation with all parties involved",
    icon: Users,
    details: [
      "Evidence collection and analysis",
      "Interviews with involved parties",
      "Witness testimonies",
      "Fair hearing process",
    ],
    timeframe: "3-7 days",
  },
  {
    step: "4",
    title: "Resolution",
    description: "Final decision and implementation of corrective measures",
    icon: CheckCircle,
    details: ["Decision communication", "Action implementation", "Follow-up monitoring", "Satisfaction feedback"],
    timeframe: "1-2 days",
  },
]

const testimonials = [
  {
    name: "Priya Sharma",
    year: "CSE 3rd Year",
    image: "/events/img1.png",
    issue: "Academic Grievance",
    quote:
      "The grievance cell helped me resolve my grade dispute within a week. The process was transparent and fair. Highly recommend! 🌟",
    rating: 5,
    resolved: true,
    timeToResolve: "6 days",
  },
  {
    name: "Arjun Patel",
    year: "ECE 2nd Year",
    image: "/events/img2.png",
    issue: "Personal Counseling",
    quote:
      "Going through a tough time, the counselors provided amazing support. They helped me get back on track both academically and personally. 💪",
    rating: 5,
    resolved: true,
    timeToResolve: "Same day",
  },
  {
    name: "Sneha Gupta",
    year: "ME 4th Year",
    image: "/events/img1.png",
    issue: "Harassment Report",
    quote:
      "Faced harassment, but the cell took immediate action. The issue was resolved confidentially and professionally. Thank you! 🙏",
    rating: 5,
    resolved: true,
    timeToResolve: "2 days",
  },
]

const stats = [
  { number: "1000+", label: "Cases Resolved", icon: CheckCircle, color: "text-green-600" },
  { number: "95%", label: "Satisfaction Rate", icon: Star, color: "text-yellow-600" },
  { number: "24/7", label: "Support Available", icon: Clock, color: "text-blue-600" },
  { number: "48hrs", label: "Avg Response Time", icon: MessageCircle, color: "text-purple-600" },
]

export default function StudentGrievanceCellPage() {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    description: "",
    anonymous: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Campus Facilities Style */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <motion.div
              className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Student Grievance Cell
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              Your voice matters - We're here to listen, support, and resolve with complete confidentiality ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🛡️ 100% Confidential</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">⚡ 24/7 Support</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✅ 95% Success Rate</span>
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
            {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers 📊</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of students for reliable support</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                    <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                  </motion.div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How We Can Help You 🤝</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services designed to address all your concerns with care and professionalism
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                  ></div>
                  <div className="relative bg-white rounded-3xl p-8 h-full shadow-lg">
                    <div
                      className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    {/* Service Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <div className="font-bold text-green-600">{service.successRate}</div>
                        <div className="text-xs text-gray-600">Success Rate</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <div className="font-bold text-blue-600">{service.avgResolutionTime}</div>
                        <div className="text-xs text-gray-600">Avg Resolution</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <div className="font-bold text-purple-600">{service.totalCases}</div>
                        <div className="text-xs text-gray-600">Cases Handled</div>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Common Issues We Handle:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.examples.map((example, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                            {example}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories 🌟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from students who found solutions through our grievance cell
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl p-6 h-full shadow-lg">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4 border-2 border-purple-200"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.year}</p>
                        <p className="text-sm text-purple-600 font-semibold">{testimonial.issue}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-4">
                      <p className="text-gray-700 italic text-sm leading-relaxed">"{testimonial.quote}"</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-semibold">✅ Resolved</div>
                        <div className="text-xs text-gray-600">in {testimonial.timeToResolve}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Resolution Process ⚖️</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A transparent, fair, and efficient process designed to resolve your concerns quickly
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                            Step {step.step}
                          </span>
                          <div className="text-xs text-gray-600 mt-1">{step.timeframe}</div>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center text-sm text-gray-700"
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            {detail}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white font-bold text-sm">{step.step}</span>
                </motion.div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Submit Your Grievance 📝</h2>
            <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25"></div>
            <Card className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <Input
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Award className="w-4 h-4 inline mr-2" />
                        Student ID *
                      </label>
                      <Input
                        placeholder="Enter your student ID"
                        value={formData.studentId}
                        onChange={(e) => handleInputChange("studentId", e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </label>
                      <Input
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Grievance Category *
                    </label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic Grievances</SelectItem>
                        <SelectItem value="personal">Personal Counseling</SelectItem>
                        <SelectItem value="administrative">Administrative Issues</SelectItem>
                        <SelectItem value="harassment">Harassment & Discrimination</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Subject *
                    </label>
                    <Input
                      placeholder="Brief subject of your grievance"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="w-4 h-4 inline mr-2" />
                      Detailed Description *
                    </label>
                    <Textarea
                      placeholder="Please provide detailed information about your grievance..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="rounded transition-all duration-300"
                      checked={formData.anonymous}
                      onChange={(e) => handleInputChange("anonymous", e.target.checked)}
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Submit anonymously (optional)
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-full shadow-lg transition-all duration-300"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit Grievance
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch 📞</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach us - choose what works best for you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <Card className="text-center h-full group-hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <motion.div
                      className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <contact.icon className="w-8 h-8 text-blue-600" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{contact.title}</h3>
                    <div className="space-y-1 mb-3">
                      {contact.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-800 font-medium text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                    <div className="text-xs text-gray-500">
                      <div className="flex items-center justify-center mb-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {contact.availability}
                      </div>
                      <div className="flex items-center justify-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {contact.responseTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <AlertTriangle className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Emergency Support 🚨</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              For urgent matters requiring immediate attention, don't hesitate to reach out to our emergency support
            </p>
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">24/7 Emergency Helpline</h3>
              <div className="text-3xl font-bold mb-2">+91-11-2757-1080</div>
              <div className="text-lg opacity-90 mb-2">Press 911 for emergencies</div>
              <div className="text-sm opacity-75">Available round the clock for critical situations</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      </StudentLifeContentWrapper>
        </div>
      </div>
    </div>
  )
}
