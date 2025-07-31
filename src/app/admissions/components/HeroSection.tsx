'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Zap, ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden min-h-screen flex items-center">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0">
                <div className="absolute top-20 left-4 md:left-10 w-32 h-32 md:w-72 md:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-4 md:right-10 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-80 md:h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
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
                        className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 backdrop-blur-sm shadow-2xl"
                    >
                        <GraduationCap className="w-8 h-8 md:w-12 md:h-12 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100"
                    >
                        Your Future Begins Here
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-4"
                    >
                        Explore why thousands of students choose BPIT as their launchpad into the tech world
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center px-4"
                    >
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group">
                            <Zap className="w-5 h-5 group-hover:animate-pulse" />
                            Discover More
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 group">
                            <Play className="w-5 h-5 group-hover:animate-pulse" />
                            Watch Campus Tour
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
