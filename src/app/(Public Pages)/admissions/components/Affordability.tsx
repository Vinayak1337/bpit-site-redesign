'use client';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, Trophy } from 'lucide-react';

const Affordability = () => {
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
    );
};

export default Affordability;
