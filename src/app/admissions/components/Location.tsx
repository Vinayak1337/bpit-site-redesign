'use client';
import { motion } from 'framer-motion';
import { MapPin, Globe, Building } from 'lucide-react';

const Location = () => {
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
                        Strategic Location Advantage
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Perfectly located in the heart of Delhi with excellent connectivity
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                    >
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 h-full flex flex-col">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">📍 Prime Location</h3>
                            <div className="space-y-4 flex-grow">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Rohini, New Delhi</h4>
                                        <p className="text-gray-600 text-sm">Central location in Delhi NCR with excellent infrastructure</p>
                                    </div>
                                </div>
                                
                                {/* Metro Connectivity */}
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                                    <h5 className="font-semibold text-blue-900 mb-2">🚇 Metro Connectivity</h5>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-semibold text-gray-900">Rithala Metro Station</h6>
                                                <p className="text-xs text-gray-600">1.5 km • Red Line • Direct to Connaught Place</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                            </div>
                                            <div>
                                                <h6 className="text-sm font-semibold text-gray-900">Samaypur Badli Metro</h6>
                                                <p className="text-xs text-gray-600">2 km • Yellow Line • Direct to Gurgaon</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Nearby Amenities */}
                                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                                    <h5 className="font-semibold text-green-900 mb-2">🏢 Nearby Amenities</h5>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-600">🏥</span>
                                            <span className="text-gray-700">Max Hospital (1.2km)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-blue-600">🏬</span>
                                            <span className="text-gray-700">Unity One Mall (800m)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-purple-600">🏪</span>
                                            <span className="text-gray-700">City Centre (1.5km)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-orange-600">🍽️</span>
                                            <span className="text-gray-700">Food Courts (500m)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Industry Proximity */}
                                <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                                    <h5 className="font-semibold text-orange-900 mb-2">🏭 Industry Proximity</h5>
                                    <div className="space-y-1 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Cyber City, Gurgaon</span>
                                            <span className="text-gray-500">45 min via Metro</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Connaught Place</span>
                                            <span className="text-gray-500">35 min via Metro</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Noida Sector 62</span>
                                            <span className="text-gray-500">60 min via Metro</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Nehru Place</span>
                                            <span className="text-gray-500">50 min via Metro</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Transportation Hub */}
                                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                                    <h5 className="font-semibold text-purple-900 mb-2">🚌 Transportation Hub</h5>
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-1">
                                            <span className="text-blue-600">🚌</span>
                                            <span className="text-gray-700">Multiple Bus Routes</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-600">🚗</span>
                                            <span className="text-gray-700">Cab Services 24/7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="h-full"
                    >
                        {/* Simplified Interactive Campus Map */}
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200 h-full flex flex-col">
                            <div className="text-center mb-6">
                                <motion.div 
                                    className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <MapPin className="w-8 h-8" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">🗺️ Interactive Campus Map</h3>
                                <p className="text-gray-600 mb-6">
                                    Explore our strategic location and nearby connectivity
                                </p>
                            </div>

                            {/* Simplified Map Visualization */}
                            <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 flex-grow">
                                {/* Campus Location Indicator */}
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <motion.div 
                                        className="w-3 h-3 bg-red-500 rounded-full relative"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                    </motion.div>
                                    <span className="text-sm font-semibold text-gray-700">BPIT Campus - Rohini, Delhi</span>
                                </div>

                                {/* Connectivity Grid */}
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <motion.div 
                                        className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer border border-blue-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <div>
                                            <span className="font-medium text-gray-700">Metro Station</span>
                                            <p className="text-xs text-gray-500">1.5km away</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 cursor-pointer border border-green-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div>
                                            <span className="font-medium text-gray-700">Bus Stop</span>
                                            <p className="text-xs text-gray-500">500m away</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-all duration-300 cursor-pointer border border-yellow-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div>
                                            <span className="font-medium text-gray-700">Hospital</span>
                                            <p className="text-xs text-gray-500">1km away</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all duration-300 cursor-pointer border border-purple-100"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <div>
                                            <span className="font-medium text-gray-700">Shopping Mall</span>
                                            <p className="text-xs text-gray-500">800m away</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Quick Access Features */}
                            <div className="grid grid-cols-3 gap-3 text-center mb-4">
                                <motion.div 
                                    className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <MapPin className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Directions</span>
                                </motion.div>
                                
                                <motion.div 
                                    className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Globe className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Full Map</span>
                                </motion.div>
                                
                                <motion.div 
                                    className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-all duration-300 cursor-pointer border border-gray-200"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Building className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-700">Campus Tour</span>
                                </motion.div>
                            </div>

                            {/* Address Footer */}
                            <div className="mt-auto p-4 bg-gray-100 rounded-lg border border-gray-200">
                                <p className="text-center text-sm text-gray-600">
                                    📍 PSP-4, Dr. K.N. Katju Marg, Sector-17, Rohini, Delhi - 110089
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Location;
