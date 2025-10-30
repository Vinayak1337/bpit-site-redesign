'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { campusFacilities } from '@/data/admissions';

const CampusTour = () => {
    const [currentModernLabs, setCurrentModernLabs] = useState(0);
    const [currentMultimediaHalls, setCurrentMultimediaHalls] = useState(0);
    const [currentLibrary, setCurrentLibrary] = useState(0);
    const [currentHostel, setCurrentHostel] = useState(0);
    const [currentSeminarHalls, setCurrentSeminarHalls] = useState(0);
    const [currentGreenInitiatives, setCurrentGreenInitiatives] = useState(0);

    const [isModernLabsHovered, setIsModernLabsHovered] = useState(false);
    const [isMultimediaHallsHovered, setIsMultimediaHallsHovered] = useState(false);
    const [isLibraryHovered, setIsLibraryHovered] = useState(false);
    const [isHostelHovered, setIsHostelHovered] = useState(false);
    const [isSeminarHallsHovered, setIsSeminarHallsHovered] = useState(false);
    const [isGreenInitiativesHovered, setIsGreenInitiativesHovered] = useState(false);

    useEffect(() => {
        const intervals = [
            setInterval(() => {
                if (!isModernLabsHovered) {
                    setCurrentModernLabs(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isMultimediaHallsHovered) {
                    setCurrentMultimediaHalls(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isLibraryHovered) {
                    setCurrentLibrary(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isHostelHovered) {
                    setCurrentHostel(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isSeminarHallsHovered) {
                    setCurrentSeminarHalls(prev => (prev + 1) % 3);
                }
            }, 4000),
            setInterval(() => {
                if (!isGreenInitiativesHovered) {
                    setCurrentGreenInitiatives(prev => (prev + 1) % 3);
                }
            }, 4000)
        ];

        return () => intervals.forEach(interval => clearInterval(interval));
    }, [isModernLabsHovered, isMultimediaHallsHovered, isLibraryHovered, isHostelHovered, isSeminarHallsHovered, isGreenInitiativesHovered]);

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
                        Virtual Campus Tour
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore our state-of-the-art facilities and infrastructure
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Modern Labs Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsModernLabsHovered(true)}
                        onMouseLeave={() => setIsModernLabsHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentModernLabs}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.modernLabs.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.modernLabs.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.modernLabs.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.modernLabs.images[currentModernLabs].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.modernLabs.images[currentModernLabs].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.modernLabs.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentModernLabs(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentModernLabs ? 'bg-blue-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Multimedia Halls Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsMultimediaHallsHovered(true)}
                        onMouseLeave={() => setIsMultimediaHallsHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentMultimediaHalls}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.multimediaHalls.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.multimediaHalls.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.multimediaHalls.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.multimediaHalls.images[currentMultimediaHalls].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.multimediaHalls.images[currentMultimediaHalls].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.multimediaHalls.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentMultimediaHalls(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentMultimediaHalls ? 'bg-green-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Library Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsLibraryHovered(true)}
                        onMouseLeave={() => setIsLibraryHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentLibrary}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.library.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.library.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.library.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.library.images[currentLibrary].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.library.images[currentLibrary].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.library.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentLibrary(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentLibrary ? 'bg-purple-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Hostel Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsHostelHovered(true)}
                        onMouseLeave={() => setIsHostelHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentHostel}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.hostel.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.hostel.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.hostel.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.hostel.images[currentHostel].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.hostel.images[currentHostel].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.hostel.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentHostel(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentHostel ? 'bg-rose-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Seminar Halls Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsSeminarHallsHovered(true)}
                        onMouseLeave={() => setIsSeminarHallsHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentSeminarHalls}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.seminarHalls.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.seminarHalls.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.seminarHalls.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.seminarHalls.images[currentSeminarHalls].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.seminarHalls.images[currentSeminarHalls].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.seminarHalls.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSeminarHalls(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentSeminarHalls ? 'bg-teal-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Green Initiatives Carousel */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsGreenInitiativesHovered(true)}
                        onMouseLeave={() => setIsGreenInitiativesHovered(false)}
                    >
                        <motion.div
                            className="overflow-hidden rounded-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                key={currentGreenInitiatives}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className={`h-64 bg-gradient-to-br ${campusFacilities.greenInitiatives.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
                                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-white rounded-full"></div>
                                    </div>
                                    
                                    <div className="text-white text-center z-10 px-6">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                                        >
                                            {campusFacilities.greenInitiatives.icon}
                                        </motion.div>
                                        <h3 className="text-xl font-bold mb-2">{campusFacilities.greenInitiatives.title}</h3>
                                        <h4 className="text-lg font-semibold mb-1">{campusFacilities.greenInitiatives.images[currentGreenInitiatives].title}</h4>
                                        <p className="text-sm opacity-90">{campusFacilities.greenInitiatives.images[currentGreenInitiatives].description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        <div className="flex justify-center mt-4 space-x-2">
                            {campusFacilities.greenInitiatives.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentGreenInitiatives(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentGreenInitiatives ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CampusTour;