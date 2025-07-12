'use client';

import { motion } from 'framer-motion';
import {
    GraduationCap,
    Users,
    Trophy,
    Leaf,
    Building,
    DollarSign,
    BookOpen,
    Lightbulb,
    Award,
    MapPin,
    Star,
    CheckCircle,
    TrendingUp,
    Heart,
    Zap,
    Target,
    Globe,
    Phone,
    Calendar,
    ArrowRight,
    Play,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const WhyBPITPage = () => {
    const [activeTab, setActiveTab] = useState('academics');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const whyBPITHighlights = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Academic Excellence",
            description: "Industry-aligned, accredited curriculum with NBA-approved programs"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Mentorship Culture",
            description: "Faculty as mentors, learner-centric approach for personal growth"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Proven Track Record",
            description: "Alumni in top firms like Accenture, Infosys, TCS, and more"
        },
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Green & Smart Campus",
            description: "Solar panels, rainwater harvesting, smart classrooms"
        },
        {
            icon: <Building className="w-8 h-8" />,
            title: "Top Recruiters",
            description: "TCS, Wipro, KPMG, Nagarro, Tech Mahindra visit regularly"
        },
        {
            icon: <DollarSign className="w-8 h-8" />,
            title: "Affordable Education",
            description: "Only ₹1.7 LPA, ₹6.9 L total B.Tech cost with excellent ROI"
        }
    ];

    const campusImages = [
        { title: "Modern Labs", description: "State-of-the-art laboratory facilities" },
        { title: "Multimedia Lecture Halls", description: "Interactive learning spaces" },
        { title: "Wi-Fi Library", description: "DELNET, NDLI access with digital resources" },
        { title: "Girls' Hostel", description: "Safe and comfortable accommodation" },
        { title: "Seminar Halls", description: "Professional conference facilities" },
        { title: "Green Initiatives", description: "Solar installations & rainwater harvesting" }
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            department: "CSE, Batch 2023",
            quote: "My experience at BPIT has truly been exceptional. Highly intellectual and supportive faculty.",
            image: "/api/placeholder/80/80"
        },
        {
            name: "Rahul Kumar",
            department: "ECE, Batch 2022",
            quote: "Professors ensured every student received career and academic guidance.",
            image: "/api/placeholder/80/80"
        },
        {
            name: "Sneha Patel",
            department: "EEE, Batch 2023",
            quote: "The industry exposure and practical learning approach prepared me for my career.",
            image: "/api/placeholder/80/80"
        }
    ];

    // Updated recruiters data structure for carousel
    const recruitersWithLogos = [
        { name: "TCS", logo: "/logos/tcs.png" },
        { name: "Infosys", logo: "/logos/infosys.png" },
        { name: "Accenture", logo: "/logos/accenture.png" },
        { name: "KPMG", logo: "/logos/kpmg.png" },
        { name: "Wipro", logo: "/logos/wipro.png" },
        { name: "Tech Mahindra", logo: "/logos/tech-mahindra.png" },
        { name: "Nagarro", logo: "/logos/nagarro.png" },
        { name: "HCL", logo: "/logos/hcl.png" },
        { name: "Cognizant", logo: "/logos/cognizant.png" },
        { name: "Capgemini", logo: "/logos/capgemini.png" },
        { name: "IBM", logo: "/logos/ibm.png" },
        { name: "Microsoft", logo: "/logos/microsoft.png" }
    ];

    // Split into two arrays for dual carousel
    const recruitersRow1 = recruitersWithLogos.slice(0, 6);
    const recruitersRow2 = recruitersWithLogos.slice(6);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden min-h-screen flex items-center">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-2xl"
                        >
                            <GraduationCap className="w-12 h-12 text-white" />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100"
                        >
                            Your Future Begins Here
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto"
                        >
                            Explore why thousands of students choose BPIT as their launchpad into the tech world
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 group">
                                <Zap className="w-5 h-5 group-hover:animate-pulse" />
                                Discover More
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group">
                                <Play className="w-5 h-5 group-hover:animate-pulse" />
                                Watch Campus Tour
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Accreditations & Affiliations */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Accreditations & Affiliations
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Recognized by top governing bodies and ranked among the best institutions
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { title: "NBA Accredited", subtitle: "B.Tech programs in CSE, ECE, EEE", icon: <Award className="w-8 h-8" /> },
                            { title: "AICTE Approved", subtitle: "Affiliated to GGSIPU", icon: <CheckCircle className="w-8 h-8" /> },
                            { title: "Grade 'A' Institute", subtitle: "Under GGSIPU", icon: <Star className="w-8 h-8" /> },
                            { title: "NIRF Ranked", subtitle: "251-300 band (2021)", icon: <Trophy className="w-8 h-8" /> }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why BPIT Highlights Carousel */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose BPIT?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Discover what makes BPIT the preferred choice for engineering aspirants
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyBPITHighlights.map((highlight, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    {highlight.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{highlight.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Campus Tour */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Virtual Campus Tour
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Explore our state-of-the-art facilities and infrastructure
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campusImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                            >
                                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <div className="text-white text-center">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                            <Building className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                                        <p className="text-sm opacity-90">{image.description}</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academics & Learning Experience */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Academics & Learning Experience
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Comprehensive education with industry-focused curriculum
                        </p>
                    </motion.div>

                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {[
                                { id: 'academics', label: 'Academics Overview', icon: <BookOpen className="w-5 h-5" /> },
                                { id: 'faculty', label: 'Faculty Support', icon: <Users className="w-5 h-5" /> },
                                { id: 'research', label: 'R&D & Industry', icon: <Lightbulb className="w-5 h-5" /> }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[300px]">
                            {activeTab === 'academics' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Curriculum Excellence</h3>
                                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                                        Our curriculum is designed with multidisciplinary excellence, focusing on both theoretical knowledge and practical application. Regular industry interactions ensure students are prepared for real-world challenges.
                                    </p>
                                    <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
                                        <p className="text-blue-800 italic">
                                            "The curriculum at BPIT bridges the gap between academic learning and industry requirements perfectly." - CSE Student, 2023
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'faculty' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Users className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Mentorship & Support</h3>
                                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                                        Our faculty members act as mentors, providing personalized guidance and project mentorship. The learner-centric approach ensures every student receives individual attention and career guidance.
                                    </p>
                                    <div className="bg-green-50 rounded-lg p-4 max-w-2xl mx-auto">
                                        <p className="text-green-800 italic">
                                            "Faculty not only taught—they mentored us for success." - ECE Student, 2023
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'research' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <Lightbulb className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Research & Industry Integration</h3>
                                    <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
                                        Real-world projects, industry events, and professional skills workshops prepare students for their careers. Our R&D initiatives encourage innovation and practical problem-solving.
                                    </p>
                                    <div className="bg-purple-50 rounded-lg p-4 max-w-2xl mx-auto">
                                        <p className="text-purple-800 italic">
                                            "The industry exposure and hands-on projects gave me a competitive edge." - EEE Student, 2023
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Life & Achievements */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Student Life & Achievements
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            A vibrant campus life with numerous opportunities for growth and success
                        </p>
                    </motion.div>

                    {/* Carousel Container */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <div className="flex">
                            <motion.div
                                className="flex gap-8 min-w-full"
                                animate={{ x: [0, -100 * 6] }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 25,
                                        ease: "linear"
                                    }
                                }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {/* Hackathon & Pitch Wins */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">🏆</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Hackathon & Pitch Wins
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Sankalan tech fest, Techno-Vision competitions, Udbhav innovation challenges
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Clubs & Societies */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">👥</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Active Clubs & Societies
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                NSS social service, Tech societies, Coding clubs, Entrepreneurship Cell
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Campus Fests & Forums */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">🎭</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Campus Fests & Forums
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Industry expert lectures, Cultural festivals, Inter-college competitions
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sports & Recreation */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Zap className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">⚽</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Sports & Recreation
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Cricket, Football, Basketball courts, Indoor games, Fitness center
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Research Projects */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">🔬</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Research Projects
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Student research initiatives, Innovation labs, Patent applications
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cultural Activities */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Star className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">🎨</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Cultural Activities
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Dance competitions, Music events, Drama performances, Art exhibitions
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Duplicate slides for seamless loop */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">🏆</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Hackathon & Pitch Wins
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Sankalan tech fest, Techno-Vision competitions, Udbhav innovation challenges
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 bg-white transition-all duration-500 group-hover:blur-sm">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-white p-8">
                                                <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                                <div className="text-6xl font-bold opacity-20">👥</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white/95">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl">
                                                Active Clubs & Societies
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                NSS social service, Tech societies, Coding clubs, Entrepreneurship Cell
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Gradient Overlays for fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                    </div>

                    {/* Floating indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                                style={{
                                    animationDelay: `${index * 0.5}s`,
                                    animationDuration: '3s'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Placements & Industry Connect */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Placements & Industry Connect
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Strong industry partnerships ensuring excellent placement opportunities
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-2xl p-8 text-center shadow-lg"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">85%+</h3>
                            <p className="text-gray-600">Placement Rate</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 text-center shadow-lg"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                                <DollarSign className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">₹6.5 LPA</h3>
                            <p className="text-gray-600">Average Package</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 text-center shadow-lg"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                                <Trophy className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">₹15+ LPA</h3>
                            <p className="text-gray-600">Highest Package</p>
                        </motion.div>
                    </div>

                    {/* Updated Recruiters Carousel Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg overflow-hidden">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Recruiters</h3>

                        {/* First Carousel - Left to Right */}
                        <div className="relative mb-8">
                            <div className="flex overflow-hidden">
                                <motion.div
                                    className="flex gap-8 min-w-full"
                                    animate={{ x: [0, -100 * recruitersRow1.length] }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 20,
                                            ease: "linear"
                                        }
                                    }}
                                >
                                    {/* Render first set */}
                                    {recruitersRow1.map((recruiter, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -5,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                                            {/* Logo placeholder */}
                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
                                                    {recruiter.name}
                                                </span>
                                            </div>

                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                        </motion.div>
                                    ))}

                                    {/* Duplicate for seamless loop */}
                                    {recruitersRow1.map((recruiter, index) => (
                                        <motion.div
                                            key={`duplicate-${index}`}
                                            className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -5,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
                                                    {recruiter.name}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Second Carousel - Right to Left */}
                        <div className="relative mb-8">
                            <div className="flex overflow-hidden">
                                <motion.div
                                    className="flex gap-8 min-w-full"
                                    animate={{ x: [-100 * recruitersRow2.length, 0] }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 20,
                                            ease: "linear"
                                        }
                                    }}
                                >
                                    {/* Render second set */}
                                    {recruitersRow2.map((recruiter, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-gray-200 flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -5,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-purple-600 transition-colors duration-300">
                                                    {recruiter.name}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-transparent skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                                        </motion.div>
                                    ))}

                                    {/* Duplicate for seamless loop */}
                                    {recruitersRow2.map((recruiter, index) => (
                                        <motion.div
                                            key={`duplicate-${index}`}
                                            className="flex-shrink-0 w-32 h-24 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-gray-200 flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -5,
                                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-purple-600 transition-colors duration-300">
                                                    {recruiter.name}
                                                </span>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/30 to-transparent skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                Explore Placement Reports
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Advantage */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Strategic Location Advantage
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Perfectly located in the heart of Delhi with excellent connectivity
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">📍 Prime Location</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Rohini, New Delhi</h4>
                                            <p className="text-gray-600 text-sm">Central location in Delhi NCR</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900"> 1.5 km from Rithala Metro</h4>
                                            <p className="text-gray-600 text-sm">Direct connectivity to entire Delhi</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900"> 2 km from Samaypur Badli Metro</h4>
                                            <p className="text-gray-600 text-sm">Easy access to business districts</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Building className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900"> Close to Tech Parks</h4>
                                            <p className="text-gray-600 text-sm">Proximity to major IT hubs and companies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 text-white"
                        >
                            <div className="text-center">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                                    <MapPin className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Interactive Campus Map</h3>
                                <p className="text-blue-100 mb-6">
                                    Explore our campus location and nearby facilities
                                </p>
                                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                                        <span className="text-sm">BPIT Campus</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                            <span>Metro Station</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span>Bus Stop</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                            <span>Hospital</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                            <span>Mall</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Student Testimonials */}
            <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Students Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Hear from our successful graduates about their BPIT experience
                        </p>
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300"
                                >
                                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                                </button>
                                <div className="text-center flex-1">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-white font-bold text-xl">
                                            {testimonials[currentTestimonial].name.charAt(0)}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                                    <p className="text-gray-600">{testimonials[currentTestimonial].department}</p>
                                </div>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300"
                                >
                                    <ChevronRight className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <p className="text-lg text-gray-700 italic leading-relaxed mb-6">
                                    "{testimonials[currentTestimonial].quote}"
                                </p>
                                <div className="flex justify-center gap-2">
                                    {testimonials.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Affordability & ROI */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Exceptional Value & ROI
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Quality education at affordable fees with excellent return on investment
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    <DollarSign className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">💸 Cost-Effective Education</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                        <span className="text-gray-700">Annual Fees</span>
                                        <span className="text-2xl font-bold text-green-600">₹1.7 LPA</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                        <span className="text-gray-700">Total B.Tech Cost</span>
                                        <span className="text-2xl font-bold text-blue-600">₹6.9 L</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg">
                                        <span>Average Starting Salary</span>
                                        <span className="text-2xl font-bold">₹6.5 LPA</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    🏆 Strong ROI Comparison
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">Lower fees than most private colleges</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">Excellent placement record</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">Strong industry connections</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">Modern infrastructure & facilities</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center">
                                <Trophy className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">💸 Cost-effective Badge</h3>
                                <p className="text-sm opacity-90">
                                    Best value for money in engineering education
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                            <GraduationCap className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to become a part of the BPIT family?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Join thousands of successful engineers who started their journey at BPIT
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-2xl flex items-center gap-3 justify-center"
                            >
                                <Target className="w-5 h-5" />
                                Apply Now
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 justify-center"
                            >
                                <MapPin className="w-5 h-5" />
                                Book Campus Visit
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 justify-center"
                            >
                                <Phone className="w-5 h-5" />
                                Talk to a Counselor
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WhyBPITPage;