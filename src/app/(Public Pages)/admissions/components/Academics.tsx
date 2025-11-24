'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { BookOpen, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Academics = () => {
    const [activeTab, setActiveTab] = useState('academics');

    return (
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

                <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
                        {[
                            { id: 'academics', label: 'Academics Overview', icon: <BookOpen className="w-5 h-5" /> },
                            { id: 'faculty', label: 'Faculty Support', icon: <Users className="w-5 h-5" /> },
                            { id: 'research', label: 'R&D & Industry', icon: <Lightbulb className="w-5 h-5" /> }
                        ].map((tab) => (
                            <Button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base h-auto ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                trackingEvent="admissions_academics_tab"
                                trackingData={{ tab: tab.id }}
                            >
                                {tab.icon}
                                <span className="hidden sm:inline">{tab.label}</span>
                                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                            </Button>
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
                                        &quot;The curriculum at BPIT bridges the gap between academic learning and industry requirements perfectly.&quot; - CSE Student, 2023
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
                                        &quot;Faculty not only taught—they mentored us for success.&quot; - ECE Student, 2023
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
                                        &quot;The industry exposure and hands-on projects gave me a competitive edge.&quot; - EEE Student, 2023
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Academics;
