'use client';
import { motion } from 'framer-motion';
import { whyBPITHighlights } from '@/data/admissions';

const WhyBPITHighlights = () => {
    return (
        <section id="highlights" className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 md:mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose BPIT?</h2>
                    <p className="mt-3 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">Discover what makes BPIT the preferred choice for engineering aspirants</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                    {whyBPITHighlights.map((highlight, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="relative rounded-2xl p-6 bg-white/80 backdrop-blur border border-blue-100 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center mb-4">
                                {highlight.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{highlight.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyBPITHighlights;
