'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/admissions';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
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
                    <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
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
                                &quot;{testimonials[currentTestimonial].quote}&quot;
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
    );
};

export default Testimonials;