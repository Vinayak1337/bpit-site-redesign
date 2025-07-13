'use client';

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
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

const WhyBPITPage = () => {
    const [activeTab, setActiveTab] = useState('academics');
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentStudentLifeSlide, setCurrentStudentLifeSlide] = useState(0);
    
    // Individual carousel states for each campus facility
    const [currentModernLabs, setCurrentModernLabs] = useState(0);
    const [currentMultimediaHalls, setCurrentMultimediaHalls] = useState(0);
    const [currentLibrary, setCurrentLibrary] = useState(0);
    const [currentHostel, setCurrentHostel] = useState(0);
    const [currentSeminarHalls, setCurrentSeminarHalls] = useState(0);
    const [currentGreenInitiatives, setCurrentGreenInitiatives] = useState(0);

    // Hover states for pausing carousels
    const [isModernLabsHovered, setIsModernLabsHovered] = useState(false);
    const [isMultimediaHallsHovered, setIsMultimediaHallsHovered] = useState(false);
    const [isLibraryHovered, setIsLibraryHovered] = useState(false);
    const [isHostelHovered, setIsHostelHovered] = useState(false);
    const [isSeminarHallsHovered, setIsSeminarHallsHovered] = useState(false);
    const [isGreenInitiativesHovered, setIsGreenInitiativesHovered] = useState(false);
    const [isStudentLifeHovered, setIsStudentLifeHovered] = useState(false);

    // Auto-advance individual carousels with same intervals and hover pause
    useEffect(() => {
        const intervals = [
            setInterval(() => {
                if (!isModernLabsHovered) {
                    setCurrentModernLabs(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isMultimediaHallsHovered) {
                    setCurrentMultimediaHalls(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isLibraryHovered) {
                    setCurrentLibrary(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isHostelHovered) {
                    setCurrentHostel(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isSeminarHallsHovered) {
                    setCurrentSeminarHalls(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isGreenInitiativesHovered) {
                    setCurrentGreenInitiatives(prev => (prev + 1) % 3);
                }
            }, 4000)
        ];

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [isModernLabsHovered, isMultimediaHallsHovered, isLibraryHovered, isHostelHovered, isSeminarHallsHovered, isGreenInitiativesHovered]);

    // Campus facilities data with multiple images for each facility
    const campusFacilities = {
        modernLabs: {
            title: "Modern Labs",
            gradient: "from-blue-400 to-purple-600",
            icon: <Building className="w-8 h-8" />,
            images: [
                { title: "Computer Lab", description: "Latest systems with advanced software" },
                { title: "Electronics Lab", description: "State-of-the-art equipment for practical learning" },
                { title: "Research Lab", description: "Dedicated space for innovation projects" }
            ]
        },
        multimediaHalls: {
            title: "Multimedia Lecture Halls",
            gradient: "from-green-400 to-blue-600",
            icon: <Users className="w-8 h-8" />,
            images: [
                { title: "Smart Classrooms", description: "Interactive whiteboards and projectors" },
                { title: "Audio-Visual Systems", description: "Professional presentation equipment" },
                { title: "Recording Studio", description: "High-quality lecture recording facility" }
            ]
        },
        library: {
            title: "Wi-Fi Library",
            gradient: "from-purple-400 to-pink-600",
            icon: <BookOpen className="w-8 h-8" />,
            images: [
                { title: "Digital Resources", description: "DELNET and NDLI access portals" },
                { title: "Study Spaces", description: "Quiet zones for focused learning" },
                { title: "Book Collection", description: "Extensive technical and reference books" }
            ]
        },
        hostel: {
            title: "Girls' Hostel",
            gradient: "from-rose-400 to-orange-600",
            icon: <Heart className="w-8 h-8" />,
            images: [
                { title: "Accommodation", description: "Safe and comfortable living spaces" },
                { title: "Recreation Area", description: "Common areas for social activities" },
                { title: "Dining Facility", description: "Nutritious meals and cafeteria" }
            ]
        },
        seminarHalls: {
            title: "Seminar Halls",
            gradient: "from-teal-400 to-cyan-600",
            icon: <Users className="w-8 h-8" />,
            images: [
                { title: "Conference Room", description: "Professional meeting facilities" },
                { title: "Auditorium", description: "Large capacity for events and presentations" },
                { title: "Workshop Space", description: "Hands-on training and skill development" }
            ]
        },
        greenInitiatives: {
            title: "Green Initiatives",
            gradient: "from-emerald-400 to-green-600",
            icon: <Leaf className="w-8 h-8" />,
            images: [
                { title: "Solar Panels", description: "Renewable energy for sustainable campus" },
                { title: "Rainwater Harvesting", description: "Water conservation systems" },
                { title: "Green Spaces", description: "Landscaped gardens and eco-friendly areas" }
            ]
        }
    };

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
        { name: "Tech Mahindra", logo: "/logos/png-clipart-satyam-scandal-tech-mahindra.png" },
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

                    {/* Grid of Individual Carousels */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Modern Labs Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsModernLabsHovered(true)}
                            onMouseLeave={() => setIsModernLabsHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentModernLabs}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.modernLabs.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.modernLabs.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.modernLabs.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.modernLabs.images[currentModernLabs].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.modernLabs.images[currentModernLabs].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.modernLabs.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentModernLabs(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentModernLabs ? 'bg-blue-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Multimedia Halls Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsMultimediaHallsHovered(true)}
                            onMouseLeave={() => setIsMultimediaHallsHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentMultimediaHalls}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.multimediaHalls.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.multimediaHalls.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.multimediaHalls.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.multimediaHalls.images[currentMultimediaHalls].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.multimediaHalls.images[currentMultimediaHalls].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.multimediaHalls.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentMultimediaHalls(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentMultimediaHalls ? 'bg-green-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Library Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsLibraryHovered(true)}
                            onMouseLeave={() => setIsLibraryHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentLibrary}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.library.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.library.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.library.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.library.images[currentLibrary].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.library.images[currentLibrary].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.library.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentLibrary(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentLibrary ? 'bg-purple-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Hostel Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsHostelHovered(true)}
                            onMouseLeave={() => setIsHostelHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentHostel}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.hostel.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.hostel.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.hostel.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.hostel.images[currentHostel].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.hostel.images[currentHostel].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.hostel.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentHostel(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentHostel ? 'bg-rose-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Seminar Halls Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsSeminarHallsHovered(true)}
                            onMouseLeave={() => setIsSeminarHallsHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentSeminarHalls}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.seminarHalls.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.seminarHalls.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.seminarHalls.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.seminarHalls.images[currentSeminarHalls].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.seminarHalls.images[currentSeminarHalls].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.seminarHalls.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSeminarHalls(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentSeminarHalls ? 'bg-teal-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Green Initiatives Carousel */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsGreenInitiativesHovered(true)}
                            onMouseLeave={() => setIsGreenInitiativesHovered(false)}
                        >
                            <motion.div
                                className="overflow-hidden rounded-2xl"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    key={currentGreenInitiatives}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className={`h-64 bg-gradient-to-br ${campusFacilities.greenInitiatives.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                            <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                        </div>
                                        
                                        <div className="text-white text-center z-10 px-6">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                            >
                                                {campusFacilities.greenInitiatives.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold mb-2">{campusFacilities.greenInitiatives.title}</h3>
                                            <h4 className="text-lg font-semibold mb-1">{campusFacilities.greenInitiatives.images[currentGreenInitiatives].title}</h4>
                                            <p className="text-sm opacity-90">{campusFacilities.greenInitiatives.images[currentGreenInitiatives].description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                            
                            <div className="flex justify-center mt-4 space-x-2">
                                {campusFacilities.greenInitiatives.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentGreenInitiatives(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentGreenInitiatives ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
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
                    <div 
                        className="relative overflow-hidden rounded-2xl shadow-2xl"
                        onMouseEnter={() => setIsStudentLifeHovered(true)}
                        onMouseLeave={() => setIsStudentLifeHovered(false)}
                    >
                        <div className="flex">
                            <motion.div
                                className="flex gap-8 min-w-full"
                                animate={isStudentLifeHovered ? {} : { x: [0, -2112] }} // 352px * 6 slides = 2112px
                                transition={isStudentLifeHovered ? {} : {
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 25,
                                        ease: "linear"
                                    }
                                }}
                            >
                                {/* Hackathon & Pitch Wins */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-yellow-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">🏆</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-yellow-600">
                                                Hackathon & Pitch Wins
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Sankalan tech fest, Techno-Vision competitions, Udbhav innovation challenges
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Clubs & Societies */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Users className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-blue-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">👥</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-blue-600">
                                                Active Clubs & Societies
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                NSS social service, Tech societies, Coding clubs, Entrepreneurship Cell
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Campus Fests & Forums */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Heart className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-pink-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">🎭</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-pink-600">
                                                Campus Fests & Forums
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Industry expert lectures, Cultural festivals, Inter-college competitions
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sports & Recreation */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Zap className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-green-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">⚽</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-green-600">
                                                Sports & Recreation
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Cricket, Football, Basketball courts, Indoor games, Fitness center
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Research Projects */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-purple-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">🔬</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-purple-600">
                                                Research Projects
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Student research initiatives, Innovation labs, Patent applications
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cultural Activities */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Star className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-orange-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">🎨</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-orange-600">
                                                Cultural Activities
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Dance competitions, Music events, Drama performances, Art exhibitions
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Duplicate slides for seamless loop */}
                                {/* Hackathon & Pitch Wins - Duplicate */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-yellow-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">🏆</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-yellow-600">
                                                Hackathon & Pitch Wins
                                            </h3>
                                            <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-base">
                                                Sankalan tech fest, Techno-Vision competitions, Udbhav innovation challenges
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Clubs & Societies - Duplicate */}
                                <div className="flex-shrink-0 w-80 h-96 relative group cursor-pointer overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:z-10">
                                    <div className="absolute inset-0 bg-white transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center text-gray-600 p-8">
                                                <Users className="w-16 h-16 mx-auto mb-4 opacity-60 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 text-blue-500" />
                                                <div className="text-6xl font-bold opacity-30 group-hover:opacity-50 transition-all duration-300 group-hover:rotate-12">👥</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 transition-all duration-300 group-hover:text-xl group-hover:text-blue-600">
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

                    {/* Remove indicator dots since we're using infinite loop */}
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
                                            duration: 24,
                                            ease: "linear"
                                        }
                                    }}
                                >
                                    {/* Render first set */}
                                    {recruitersRow1.map((recruiter, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex-shrink-0 w-32 h-24 bg-white rounded-xl flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden transition-all duration-300"
                                            whileHover={{
                                                scale: 1.05,
                                                y: -3
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                                            {/* Company Logo */}
                                            <div className="relative z-10 flex flex-col items-center w-full h-full">
                                                <img 
                                                    src={recruiter.logo} 
                                                    alt={`${recruiter.name} logo`}
                                                    className="max-w-full max-h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        const nextSibling = target.nextSibling as HTMLElement;
                                                        target.style.display = 'none';
                                                        if (nextSibling) {
                                                            nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hidden items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300 mt-2">
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
                                            className="flex-shrink-0 w-32 h-24 bg-white rounded-xl flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden transition-all duration-300"
                                            whileHover={{
                                                scale: 1.05,
                                                y: -3
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center w-full h-full">
                                                <img 
                                                    src={recruiter.logo} 
                                                    alt={`${recruiter.name} logo`}
                                                    className="max-w-full max-h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        const nextSibling = target.nextSibling as HTMLElement;
                                                        target.style.display = 'none';
                                                        if (nextSibling) {
                                                            nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="w-16 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hidden items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300 mt-2">
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
                                            duration: 24,
                                            ease: "linear"
                                        }
                                    }}
                                >
                                    {/* Render second set */}
                                    {recruitersRow2.map((recruiter, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex-shrink-0 w-32 h-24 bg-white rounded-xl flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden transition-all duration-300"
                                            whileHover={{
                                                scale: 1.05,
                                                y: -3
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center w-full h-full">
                                                <img 
                                                    src={recruiter.logo} 
                                                    alt={`${recruiter.name} logo`}
                                                    className="max-w-full max-h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        const nextSibling = target.nextSibling as HTMLElement;
                                                        target.style.display = 'none';
                                                        if (nextSibling) {
                                                            nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hidden items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-purple-600 transition-colors duration-300 mt-2">
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
                                            className="flex-shrink-0 w-32 h-24 bg-white rounded-xl flex items-center justify-center p-4 group cursor-pointer relative overflow-hidden transition-all duration-300"
                                            whileHover={{
                                                scale: 1.05,
                                                y: -3
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

                                            <div className="relative z-10 flex flex-col items-center w-full h-full">
                                                <img 
                                                    src={recruiter.logo} 
                                                    alt={`${recruiter.name} logo`}
                                                    className="max-w-full max-h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        const nextSibling = target.nextSibling as HTMLElement;
                                                        target.style.display = 'none';
                                                        if (nextSibling) {
                                                            nextSibling.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="w-16 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hidden items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                                                    <span className="text-white font-bold text-xs">{recruiter.name.substring(0, 3)}</span>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-purple-600 transition-colors duration-300 mt-2">
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

                    <div className="grid md:grid-cols-2 gap-12 items-stretch">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="h-full"
                        >
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 h-full flex flex-col">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">📍 Prime Location</h3>
                                <div className="space-y-4 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Rohini, New Delhi</h4>
                                            <p className="text-gray-600 text-sm">Central location in Delhi NCR with excellent infrastructure</p>
                                        </div>
                                    </div>
                                    
                                    {/* Metro Connectivity */}
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                        <h5 className="font-semibold text-blue-900 mb-2">🚇 Metro Connectivity</h5>
                                        <div className="space-y-2">
                                            <div className="flex items-start gap-2">
                                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h6 className="text-sm font-semibold text-gray-900">Rithala Metro Station</h6>
                                                    <p className="text-xs text-gray-600">1.5 km • Red Line • Direct to Connaught Place</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h6 className="text-sm font-semibold text-gray-900">Samaypur Badli Metro</h6>
                                                    <p className="text-xs text-gray-600">2 km • Yellow Line • Direct to Gurgaon</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nearby Amenities */}
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                        <h5 className="font-semibold text-green-900 mb-2">🏢 Nearby Amenities</h5>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex items-center gap-1">
                                                <span className="text-green-600">🏥</span>
                                                <span className="text-gray-700">Max Hospital (1.2km)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-blue-600">🏬</span>
                                                <span className="text-gray-700">Unity One Mall (800m)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-purple-600">🏪</span>
                                                <span className="text-gray-700">City Centre (1.5km)</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-orange-600">🍽️</span>
                                                <span className="text-gray-700">Food Courts (500m)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Industry Proximity */}
                                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                                        <h5 className="font-semibold text-orange-900 mb-2">🏭 Industry Proximity</h5>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Cyber City, Gurgaon</span>
                                                <span className="text-gray-500">45 min via Metro</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Connaught Place</span>
                                                <span className="text-gray-500">35 min via Metro</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Noida Sector 62</span>
                                                <span className="text-gray-500">60 min via Metro</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Nehru Place</span>
                                                <span className="text-gray-500">50 min via Metro</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Transportation Hub */}
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                                        <h5 className="font-semibold text-purple-900 mb-2">🚌 Transportation Hub</h5>
                                        <div className="flex justify-between items-center text-xs">
                                            <div className="flex items-center gap-1">
                                                <span className="text-blue-600">🚌</span>
                                                <span className="text-gray-700">Multiple Bus Routes</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-green-600">🚗</span>
                                                <span className="text-gray-700">Cab Services 24/7</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="h-full"
                        >
                            {/* Simplified Interactive Campus Map */}
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 h-full flex flex-col">
                                <div className="text-center mb-6">
                                    <motion.div 
                                        className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <MapPin className="w-8 h-8" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Interactive Campus Map</h3>
                                    <p className="text-gray-600 mb-6">
                                        Explore our strategic location and nearby connectivity
                                    </p>
                                </div>

                                {/* Simplified Map Visualization */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 flex-grow">
                                    {/* Campus Location Indicator */}
                                    <div className="flex items-center justify-center gap-4 mb-6">
                                        <motion.div 
                                            className="w-3 h-3 bg-red-500 rounded-full relative"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                        </motion.div>
                                        <span className="text-sm font-semibold text-gray-700">BPIT Campus - Rohini, Delhi</span>
                                    </div>

                                    {/* Connectivity Grid */}
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer border border-blue-100"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium text-gray-700">Metro Station</span>
                                                <p className="text-xs text-gray-500">1.5km away</p>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 cursor-pointer border border-green-100"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium text-gray-700">Bus Stop</span>
                                                <p className="text-xs text-gray-500">500m away</p>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all duration-300 cursor-pointer border border-yellow-100"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium text-gray-700">Hospital</span>
                                                <p className="text-xs text-gray-500">1km away</p>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300 cursor-pointer border border-purple-100"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                            <div>
                                                <span className="font-medium text-gray-700">Shopping Mall</span>
                                                <p className="text-xs text-gray-500">800m away</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Quick Access Features */}
                                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                                    <motion.div 
                                        className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <MapPin className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">Directions</span>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Globe className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">Full Map</span>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Building className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700">Campus Tour</span>
                                    </motion.div>
                                </div>

                                {/* Address Footer */}
                                <div className="mt-auto p-4 bg-gray-100 rounded-lg border border-gray-200">
                                    <p className="text-center text-sm text-gray-600">
                                        📍 PSP-4, Dr. K.N. Katju Marg, Sector-17, Rohini, Delhi - 110089
                                    </p>
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