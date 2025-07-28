'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Target, MapPin, Phone } from 'lucide-react';

const FinalCTA = () => {
    return (
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
    );
};

export default FinalCTA;
