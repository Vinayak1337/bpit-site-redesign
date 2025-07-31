"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Users,
  BookOpen,
  Heart,
  CheckCircle,
  AlertTriangle,
  Scale,
  Eye,
  MessageCircle,
  Target,
  Lightbulb,
  Clock,
  Phone,
  Mail,
  FileText,
  Gavel,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import StudentLifeContentWrapper from "@/app/student-life/components/StudentLifeContentWrapper"
import DynamicSidebar from '@/components/ui/DynamicSidebar'
import { studentLifeSidebarData } from "@/data/sidebar"
import { useState, useEffect } from "react"

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Uphold honesty, transparency, and ethical behavior in all academic and personal endeavors",
    principles: ["Academic honesty", "Truthfulness", "Ethical decision-making", "Personal accountability"],
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
    examples: [
      "Submitting original work in assignments",
      "Citing sources properly in research",
      "Being honest during examinations",
      "Taking responsibility for mistakes",
    ],
  },
  {
    icon: Users,
    title: "Respect",
    description: "Treat all members of the community with dignity, regardless of background or beliefs",
    principles: ["Inclusive behavior", "Cultural sensitivity", "Professional courtesy", "Constructive communication"],
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
    examples: [
      "Using respectful language with everyone",
      "Embracing diversity and inclusion",
      "Listening to different perspectives",
      "Avoiding discriminatory behavior",
    ],
  },
  {
    icon: BookOpen,
    title: "Excellence",
    description: "Strive for the highest standards in academic achievement and personal development",
    principles: ["Quality work", "Continuous learning", "Innovation", "Professional growth"],
    color: "bg-purple-600",
    gradient: "from-purple-500 to-purple-700",
    examples: [
      "Submitting high-quality assignments",
      "Participating actively in classes",
      "Seeking continuous improvement",
      "Contributing to research and innovation",
    ],
  },
  {
    icon: Heart,
    title: "Responsibility",
    description: "Take ownership of actions and contribute positively to the college community",
    principles: ["Personal responsibility", "Community service", "Environmental consciousness", "Leadership"],
    color: "bg-red-600",
    gradient: "from-red-500 to-red-700",
    examples: [
      "Taking care of college property",
      "Participating in community service",
      "Being environmentally conscious",
      "Helping fellow students succeed",
    ],
  },
]

const conductCategories = [
  {
    id: "academic",
    title: "Academic Conduct",
    icon: BookOpen,
    color: "bg-blue-600",
    description: "Standards for academic integrity and scholarly behavior",
  },
  {
    id: "social",
    title: "Social Behavior",
    icon: Users,
    color: "bg-green-600",
    description: "Guidelines for interpersonal interactions and community living",
  },
  {
    id: "digital",
    title: "Digital Citizenship",
    icon: MessageCircle,
    color: "bg-purple-600",
    description: "Responsible use of technology and digital platforms",
  },
  {
    id: "campus",
    title: "Campus Life",
    icon: Shield,
    color: "bg-orange-600",
    description: "Rules for campus facilities and community spaces",
  },
]

const conductRules = {
  academic: [
    {
      title: "Academic Integrity",
      icon: Shield,
      description: "Maintain honesty in all academic work and examinations",
      rules: [
        "No plagiarism - Always cite your sources",
        "Submit original work for all assignments",
        "No unauthorized collaboration",
        "Honest examination practices",
      ],
      consequences: ["Warning", "Assignment redo", "Grade reduction"],
      severity: "High",
      examples: ["✅ Properly citing all sources", "❌ Copying from classmates"],
    },
    {
      title: "Attendance & Participation",
      icon: Clock,
      description: "Regular attendance and active participation required",
      rules: [
        "Minimum 75% attendance required",
        "Punctual arrival to classes",
        "Active participation in discussions",
        "Prior notification for absences",
      ],
      consequences: ["Attendance warning", "Parent notification", "Exam debarment"],
      severity: "Medium",
      examples: ["✅ Attending all scheduled classes", "❌ Skipping without valid reasons"],
    },
  ],
  social: [
    {
      title: "Interpersonal Behavior",
      icon: Users,
      description: "Respectful and inclusive interactions with all community members",
      rules: [
        "Treat all individuals with dignity and respect",
        "Use appropriate and professional language",
        "Avoid discriminatory behavior",
        "Resolve conflicts through peaceful dialogue",
      ],
      consequences: ["Counseling", "Community service", "Disciplinary action"],
      severity: "High",
      examples: ["✅ Helping international students", "❌ Making discriminatory comments"],
    },
    {
      title: "Anti-Harassment Policy",
      icon: Shield,
      description: "Zero tolerance for harassment, bullying, or discriminatory behavior",
      rules: [
        "No form of harassment - physical, verbal, or psychological",
        "Respect personal boundaries and consent",
        "Report harassment incidents through proper channels",
        "Support victims of harassment",
      ],
      consequences: ["Immediate investigation", "Suspension", "Expulsion"],
      severity: "Critical",
      examples: ["✅ Reporting inappropriate behavior", "❌ Making unwanted advances"],
    },
  ],
  digital: [
    {
      title: "Technology Usage",
      icon: MessageCircle,
      description: "Responsible use of college IT resources and digital platforms",
      rules: [
        "Use college computers for academic purposes only",
        "Respect intellectual property rights",
        "Maintain strong passwords",
        "Report security breaches immediately",
      ],
      consequences: ["Access restriction", "Account suspension", "Disciplinary action"],
      severity: "Medium",
      examples: ["✅ Using Wi-Fi for research", "❌ Gaming on college computers"],
    },
    {
      title: "Social Media Conduct",
      icon: Eye,
      description: "Professional and responsible behavior on digital platforms",
      rules: [
        "Maintain professional image when representing college",
        "Avoid posting inappropriate content",
        "Respect privacy of others in photos",
        "Report cyberbullying incidents",
      ],
      consequences: ["Social media counseling", "Account monitoring"],
      severity: "Medium",
      examples: ["✅ Sharing positive college experiences", "❌ Posting inappropriate photos"],
    },
  ],
  campus: [
    {
      title: "Facility Usage",
      icon: Target,
      description: "Proper use and care of college facilities and resources",
      rules: [
        "Use facilities for intended purposes only",
        "Maintain cleanliness and orderliness",
        "Report damages immediately",
        "Follow safety protocols in labs",
      ],
      consequences: ["Facility restriction", "Repair costs", "Community service"],
      severity: "Medium",
      examples: ["✅ Cleaning up after lab use", "❌ Vandalizing college property"],
    },
    {
      title: "Safety & Security",
      icon: Shield,
      description: "Maintaining a safe and secure campus environment",
      rules: [
        "Follow all safety protocols",
        "Carry ID cards at all times",
        "Report suspicious activities",
        "Cooperate with security personnel",
      ],
      consequences: ["Security briefing", "ID suspension", "Campus restriction"],
      severity: "High",
      examples: ["✅ Wearing ID cards visibly", "❌ Bringing unauthorized persons"],
    },
  ],
}

const violationProcess = [
  {
    step: "1",
    title: "Report Incident",
    description: "Violations reported through multiple channels",
    icon: FileText,
    details: [
      "Online reporting system available 24/7",
      "Anonymous reporting option available",
      "Direct reporting to faculty or administration",
    ],
  },
  {
    step: "2",
    title: "Initial Review",
    description: "Disciplinary committee reviews and determines action",
    icon: Eye,
    details: [
      "Case assigned to disciplinary officer",
      "Initial assessment of violation severity",
      "Timeline established for resolution",
    ],
  },
  {
    step: "3",
    title: "Investigation",
    description: "Thorough investigation with all parties involved",
    icon: Scale,
    details: [
      "Interviews with all involved parties",
      "Evidence collection and analysis",
      "Fair hearing process followed",
    ],
  },
  {
    step: "4",
    title: "Decision & Action",
    description: "Final decision and appropriate consequences implemented",
    icon: Gavel,
    details: [
      "Decision communicated to all parties",
      "Consequences implemented as per policy",
      "Appeal process explained if applicable",
    ],
  },
]

const supportResources = [
  {
    title: "Student Counseling Services",
    description: "Professional counseling and mental health support",
    contact: "counseling@bpitindia.com",
    phone: "+91-11-2757-1080 (Ext. 123)",
    availability: "Mon-Fri: 9 AM - 5 PM",
    icon: Heart,
  },
  {
    title: "Academic Support Center",
    description: "Help with academic challenges and study strategies",
    contact: "academic.support@bpitindia.com",
    phone: "+91-11-2757-1080 (Ext. 456)",
    availability: "Mon-Sat: 10 AM - 6 PM",
    icon: BookOpen,
  },
  {
    title: "Student Grievance Cell",
    description: "Address complaints and resolve student concerns",
    contact: "grievance@bpitindia.com",
    phone: "+91-11-2757-1080 (Ext. 789)",
    availability: "24/7 Emergency Line",
    icon: Shield,
  },
  {
    title: "Peer Support Network",
    description: "Student-led support groups and mentorship programs",
    contact: "peer.support@bpitindia.com",
    phone: "+91-11-2757-1080 (Ext. 101)",
    availability: "Daily: 8 AM - 10 PM",
    icon: Users,
  },
]

export default function CodeOfConductPage() {
  const [activeCategory, setActiveCategory] = useState("academic")

  return (
    <div className="min-h-screen">
      {/* Hero Section - Campus Facilities Style */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Code of Conduct
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              Building a community of excellence through shared values, mutual respect, and ethical behavior ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🤝 Mutual Respect</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">⚖️ Fair Justice</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🌟 Excellence</span>
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
            {/* Core Values Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values 💎</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    These fundamental principles guide our community and shape every interaction
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${value.gradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                  ></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full shadow-lg">
                    <motion.div
                      className={`${value.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{value.description}</p>

                    {/* Core Principles */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        Core Principles
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {value.principles.map((principle, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                            {principle}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Examples */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-sm">
                        <Lightbulb className="w-4 h-4 text-yellow-600 mr-2" />
                        Examples
                      </h4>
                      <div className="space-y-1">
                        {value.examples.slice(0, 2).map((example, idx) => (
                          <div key={idx} className="text-xs text-gray-700 bg-gray-50 p-2 rounded-lg">
                            {example}
                          </div>
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

      {/* Category Navigation - Non-sticky */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {conductCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `${category.color} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{category.title}</div>
                  <div className="text-xs opacity-80">{category.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Conduct Rules Section - Reduced card sizes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conductRules[activeCategory as keyof typeof conductRules].map((rule, index) => (
                <motion.div
                  key={rule.title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <motion.div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <rule.icon className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{rule.title}</h3>
                              <p className="text-gray-600 text-sm">{rule.description}</p>
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              rule.severity === "Critical"
                                ? "bg-red-100 text-red-800"
                                : rule.severity === "High"
                                  ? "bg-orange-100 text-orange-800"
                                  : rule.severity === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {rule.severity}
                          </div>
                        </div>

                        {/* Rules */}
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Key Rules
                          </h4>
                          <div className="space-y-1">
                            {rule.rules.map((ruleItem, idx) => (
                              <div key={idx} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                <p className="text-gray-700 text-xs leading-relaxed">{ruleItem}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Examples */}
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center text-sm">
                            <Lightbulb className="w-4 h-4 text-yellow-600 mr-2" />
                            Examples
                          </h4>
                          <div className="space-y-1">
                            {rule.examples.map((example, idx) => (
                              <div
                                key={idx}
                                className={`p-2 rounded-lg text-xs ${
                                  example.startsWith("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                                }`}
                              >
                                {example}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Consequences */}
                        <div className="p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-400">
                          <h4 className="font-bold text-red-800 mb-1 flex items-center text-sm">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Consequences
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {rule.consequences.map((consequence, idx) => (
                              <span
                                key={idx}
                                className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
                              >
                                {consequence}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Violation Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Violation Resolution Process ⚖️</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our fair and transparent process ensures justice while supporting student growth
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            {violationProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 hover:opacity-75 transition duration-1000"></div>
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <step.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                          Step {step.step}
                        </span>
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
                  className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center"
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

      {/* Support Resources */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Support & Resources 🤝</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive support services for academic, personal, and social challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full shadow-lg">
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <resource.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-700">
                        <Mail className="w-4 h-4 text-blue-600 mr-2" />
                        <a href={`mailto:${resource.contact}`} className="hover:text-blue-600 transition-colors">
                          {resource.contact}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Phone className="w-4 h-4 text-green-600 mr-2" />
                        <a href={`tel:${resource.phone}`} className="hover:text-green-600 transition-colors">
                          {resource.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-orange-600 mr-2" />
                        <span>{resource.availability}</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Contact Support
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
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
              <AlertCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold mb-6">Emergency Support 🚨</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              For urgent matters requiring immediate attention, reach out to our emergency support
            </p>
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">24/7 Emergency Helpline</h3>
              <div className="text-3xl font-bold mb-2">+91-11-2757-1080</div>
              <div className="text-lg opacity-90">Press 911 for emergencies</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Questions About Our Code of Conduct? 🤔</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're here to help clarify any doubts and ensure you understand our community standards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                  📞 Contact Student Affairs
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg bg-transparent"
                >
                  📖 Download Full Handbook
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
