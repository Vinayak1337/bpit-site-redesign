'use client';
import { motion } from 'framer-motion';
import { accreditations } from '@/data/admissions';

const Accreditations = () => {
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
                        Accreditations & Affiliations
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Recognized by top governing bodies and ranked among the best institutions
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {accreditations.map((item, index) => (
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
    );
};

export default Accreditations;