'use client';
import { motion } from 'framer-motion';
import { whyBPITHighlights } from '@/data/admissions';

const WhyBPITHighlights = () => {
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
                        Why Choose BPIT?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover what makes BPIT the preferred choice for engineering aspirants
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
    );
};

export default WhyBPITHighlights;