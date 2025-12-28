'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Trophy, Users, Heart, Zap, Lightbulb, Star } from 'lucide-react';

const StudentLife = () => {
    const [isStudentLifeHovered, setIsStudentLifeHovered] = useState(false);

    return (
        <section className="py-12 md:py-16 bg-white">
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
    );
};

export default StudentLife;
