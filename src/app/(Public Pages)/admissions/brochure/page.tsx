'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap, Calendar, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrochureInfo {
    id: string;
    title: string;
    description: string;
    icon: React.ReactElement;
    color: string;
    url: string;
    lastUpdated?: string;
    size?: string;
    isAutoDetected?: boolean;
    detectedText?: string;
}

interface ScrapedBrochures {
    undergraduate?: string;
    postgraduate?: string;
    ugText?: string;
    pgText?: string;
}

export default function BrochurePage() {
    const [brochures, setBrochures] = useState<BrochureInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastChecked, setLastChecked] = useState<string>('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [scrapingStatus, setScrapingStatus] = useState<string>('');
    const [autoDetected, setAutoDetected] = useState<boolean>(false);

    // Function to get current year's brochure URLs (fallback)
    const getCurrentBrochureUrls = (): ScrapedBrochures => {
        const currentYear = new Date().getFullYear();
        
        // For 2025, use the actual URLs provided
        if (currentYear === 2025) {
            return {
                undergraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
                postgraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf'
            };
        }
        
        // For other years, attempt to generate URLs based on pattern
        const yearSuffix = currentYear.toString().slice(2);
        return {
            undergraduate: `http://www.ipu.ac.in/Pubinfo${currentYear}/adm${yearSuffix}brug.pdf`,
            postgraduate: `http://www.ipu.ac.in/Pubinfo${currentYear}/adm${yearSuffix}brPG.pdf`
        };
    };

    const initializeBrochures = useCallback(async () => {
        setIsLoading(true);
        
        // Inline the fetchBrochuresFromIPU logic
        const fetchBrochuresFromIPU = async (): Promise<ScrapedBrochures> => {
            try {
                const response = await fetch('/api/scrape-brochures');
                const data = await response.json();
                
                if (data.success && data.brochures) {
                    setScrapingStatus('✅ Successfully found brochures on IPU website');
                    setAutoDetected(true);
                    return data.brochures;
                } else {
                    setScrapingStatus('⚠ Could not find brochures automatically, using fallback URLs');
                    setAutoDetected(false);
                    return data.fallback || getCurrentBrochureUrls();
                }
            } catch {
                setScrapingStatus('❌ Error scanning website, using fallback URLs');
                setAutoDetected(false);
                return getCurrentBrochureUrls();
            }
        };
        
        const urls = await fetchBrochuresFromIPU();
        const currentYear = new Date().getFullYear();
        
        const brochureData: BrochureInfo[] = [
            {
                id: 'undergraduate',
                title: 'Undergraduate Admissions Brochure',
                description: `Complete information about B.Tech, BBA, and other undergraduate programs for Academic Year ${currentYear}-${currentYear + 1}`,
                icon: <GraduationCap className="w-8 h-8" />,
                color: 'bg-blue-500',
                url: urls.undergraduate || 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
                lastUpdated: 'Auto-detected from IPU website',
                isAutoDetected: autoDetected && !!urls.undergraduate,
                detectedText: urls.ugText
            },
            {
                id: 'postgraduate',
                title: 'Postgraduate Admissions Brochure',
                description: `Complete information about MBA, M.Tech, and other postgraduate programs for Academic Year ${currentYear}-${currentYear + 1}`,
                icon: <FileText className="w-8 h-8" />,
                color: 'bg-purple-500',
                url: urls.postgraduate || 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
                lastUpdated: 'Auto-detected from IPU website',
                isAutoDetected: autoDetected && !!urls.postgraduate,
                detectedText: urls.pgText
            }
        ];

        setBrochures(brochureData);
        setLastChecked(new Date().toLocaleString());
        setIsLoading(false);
    }, [autoDetected]);

    const refreshBrochureUrls = async () => {
        setIsRefreshing(true);
        setIsLoading(true);
        setScrapingStatus('Refreshing brochure links...');
        
        // Add a small delay to show the rotation animation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Fetch fresh URLs from IPU website
        await initializeBrochures();
        
        setTimeout(() => {
            setIsRefreshing(false);
        }, 200);
    };

    const downloadBrochure = (brochure: BrochureInfo) => {
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = brochure.url;
        link.download = `${brochure.title.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openBrochure = (brochure: BrochureInfo) => {
        window.open(brochure.url, '_blank');
    };

    useEffect(() => {
        initializeBrochures();
    }, [initializeBrochures]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
                            <FileText className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-0 sm:mr-4" />
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Admissions Brochure 2025-26
                            </h1>
                        </div>
                        <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
                            Download Official University Brochures for All Programs
                        </p>
                        <p className="text-base sm:text-lg text-blue-200 mt-2 sm:mt-4 max-w-2xl mx-auto px-4">
                            Get comprehensive information about admissions, programs, and university policies
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Refresh Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 sm:mb-8 bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                                    Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 break-all">
                                    Last checked: {lastChecked}
                                </p>
                                {scrapingStatus && (
                                    <p className="text-xs sm:text-sm text-blue-600 mt-1">
                                        {scrapingStatus}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            {autoDetected && (
                                <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                                    ✓ Auto-detected
                                </div>
                            )}
                            <Button
                                onClick={refreshBrochureUrls}
                                disabled={isRefreshing || isLoading}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 text-sm sm:text-base w-full sm:w-auto justify-center"
                                trackingEvent="brochure_refresh_clicked"
                            >
                                <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span className="whitespace-nowrap">
                                    {isRefreshing ? 'Scanning IPU...' : 'Refresh from IPU'}
                                </span>
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Brochure Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {brochures.map((brochure, index) => (
                        <motion.div
                            key={brochure.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`${brochure.color} p-4 sm:p-6 text-white`}>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex-shrink-0">
                                            {brochure.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                                                {brochure.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm opacity-90 mt-1">
                                                {brochure.isAutoDetected ? 'Auto-detected from IPU website' : 'Using fallback URL'}
                                            </p>
                                            {brochure.detectedText && (
                                                <p className="text-xs opacity-75 mt-1 break-words">
                                                    Source: &quot;{brochure.detectedText}&quot;
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {brochure.isAutoDetected && (
                                        <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium self-start sm:self-center whitespace-nowrap">
                                            ✓ Live
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-4 sm:p-6">
                                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                    {brochure.description}
                                </p>
                                
                                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">What&apos;s Included:</h4>
                                    <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                                        <li>• Program details and curriculum</li>
                                        <li>• Admission requirements and eligibility</li>
                                        <li>• Application process and deadlines</li>
                                        <li>• Fee structure and payment options</li>
                                        <li>• Campus facilities and amenities</li>
                                        <li>• Placement statistics and career support</li>
                                    </ul>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => downloadBrochure(brochure)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                                        trackingEvent="brochure_download_clicked"
                                        trackingData={{ brochure: brochure.title, url: brochure.url }}
                                    >
                                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Download PDF
                                    </Button>
                                    <Button
                                        onClick={() => openBrochure(brochure)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200 text-sm sm:text-base"
                                        trackingEvent="brochure_view_clicked"
                                        trackingData={{ brochure: brochure.title, url: brochure.url }}
                                    >
                                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                        View Online
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center"
                >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4">Need Help with Brochure Information?</h3>
                    <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">Contact our admissions team for assistance</p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <div className="bg-white/20 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg">
                            <p className="font-medium text-sm sm:text-base">Admissions Office</p>
                            <p className="text-blue-100 text-xs sm:text-sm break-all">admissions@bpit.ac.in</p>
                        </div>
                        <div className="bg-white/20 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg">
                            <p className="font-medium text-sm sm:text-base">Phone</p>
                            <p className="text-blue-100 text-xs sm:text-sm">+91-11-2757-1101</p>
                        </div>
                        <div className="bg-white/20 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg">
                            <p className="font-medium text-sm sm:text-base">University Website</p>
                            <p className="text-blue-100 text-xs sm:text-sm break-all">www.ipu.ac.in</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
