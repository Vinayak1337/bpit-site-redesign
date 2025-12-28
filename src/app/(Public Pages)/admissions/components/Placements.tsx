'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TrendingUp, DollarSign, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { recruitersWithLogos } from '@/data/admissions';

const recruitersRow1 = recruitersWithLogos.slice(0, 6);
const recruitersRow2 = recruitersWithLogos.slice(6);

const Placements = () => {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
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
                                            <Image 
                                                src={recruiter.logo} 
                                                alt={`${recruiter.name} logo`}
                                                width={150}
                                                height={48}
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
                                            <Image 
                                                src={recruiter.logo} 
                                                alt={`${recruiter.name} logo`}
                                                width={150}
                                                height={48}
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
                                            <Image 
                                                src={recruiter.logo} 
                                                alt={`${recruiter.name} logo`}
                                                width={150}
                                                height={48}
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
                                            <Image 
                                                src={recruiter.logo} 
                                                alt={`${recruiter.name} logo`}
                                                width={150}
                                                height={48}
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
                        <Button 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl h-auto"
                            trackingEvent="admissions_explore_placements"
                        >
                            Explore Placement Reports
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Placements;