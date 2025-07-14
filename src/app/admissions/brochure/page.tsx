'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, GraduationCap, Calendar, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

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

    // Remove unused function
    // const checkBrochureAvailability = async (url: string): Promise<boolean> => {
    //     try {
    //         // Use a proxy or CORS-enabled approach to check URL availability
    //         await fetch(url, { 
    //             method: 'HEAD',
    //             mode: 'no-cors'
    //         });
    //         return true;
    //     } catch {
    //         console.warn(`Brochure URL may not be available: ${url}`);
    //         return false;
    //     }
    // };

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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="flex items-center justify-center mb-6">
                            <FileText className="w-12 h-12 mr-4" />
                            <h1 className="text-4xl md:text-5xl font-bold">
                                Admissions Brochure 2025-26
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Download Official University Brochures for All Programs
                        </p>
                        <p className="text-lg text-blue-200 mt-4 max-w-2xl mx-auto">
                            Get comprehensive information about admissions, programs, and university policies
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Refresh Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 bg-white rounded-xl shadow-md p-6 border border-gray-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-blue-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Academic Year {new Date().getFullYear()}-{new Date().getFullYear() + 1}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Last checked: {lastChecked}
                                </p>
                                {scrapingStatus && (
                                    <p className="text-sm text-blue-600 mt-1">
                                        {scrapingStatus}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {autoDetected && (
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    ✓ Auto-detected
                                </div>
                            )}
                            <button
                                onClick={refreshBrochureUrls}
                                disabled={isRefreshing || isLoading}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                            >
                                <RefreshCw className={`w-4 h-4 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                                {isRefreshing ? 'Scanning IPU...' : 'Refresh from IPU'}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Brochure Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {brochures.map((brochure, index) => (
                        <motion.div
                            key={brochure.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`${brochure.color} p-6 text-white`}>
                                <div className="flex items-center gap-4">
                                    {brochure.icon}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold">{brochure.title}</h3>
                                        <p className="text-sm opacity-90 mt-1">
                                            {brochure.isAutoDetected ? 'Auto-detected from IPU website' : 'Using fallback URL'}
                                        </p>
                                        {brochure.detectedText && (
                                            <p className="text-xs opacity-75 mt-1">
                                                Source: &quot;{brochure.detectedText}&quot;
                                            </p>
                                        )}
                                    </div>
                                    {brochure.isAutoDetected && (
                                        <div className="bg-white/20 px-2 py-1 rounded text-xs font-medium">
                                            ✓ Live
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {brochure.description}
                                </p>
                                
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-2">What&apos;s Included:</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Program details and curriculum</li>
                                        <li>• Admission requirements and eligibility</li>
                                        <li>• Application process and deadlines</li>
                                        <li>• Fee structure and payment options</li>
                                        <li>• Campus facilities and amenities</li>
                                        <li>• Placement statistics and career support</li>
                                    </ul>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => downloadBrochure(brochure)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => openBrochure(brochure)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        View Online
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* URL Pattern Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 mb-8"
                >
                    <div className="flex items-center mb-6">
                        <AlertCircle className="w-8 h-8 text-orange-600 mr-3" />
                        <h3 className="text-2xl font-bold text-orange-800">Auto-Detection System</h3>
                    </div>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg">
                            <strong>Automatic Detection:</strong> Our system now automatically scans the IPU admissions page for the latest brochures:
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">✓ Smart Auto-Detection</h4>
                            <p className="text-sm text-green-700">
                                The system automatically scans <a href="http://www.ipu.ac.in/admission2025main2.php" target="_blank" rel="noopener noreferrer" className="underline">IPU&apos;s admission page</a> to find the latest undergraduate and postgraduate brochures. When you click &quot;Refresh from IPU&quot;, it will scan the page and automatically detect new brochure links.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg border">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    Current Undergraduate URL
                                    {brochures.find(b => b.id === 'undergraduate')?.isAutoDetected && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Auto-detected</span>
                                    )}
                                </h4>
                                <p className="text-sm text-gray-600 font-mono break-all">
                                    {brochures.find(b => b.id === 'undergraduate')?.url}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    Current Postgraduate URL
                                    {brochures.find(b => b.id === 'postgraduate')?.isAutoDetected && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Auto-detected</span>
                                    )}
                                </h4>
                                <p className="text-sm text-gray-600 font-mono break-all">
                                    {brochures.find(b => b.id === 'postgraduate')?.url}
                                </p>
                            </div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">How Auto-Detection Works</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• Scans the official IPU admission page: <span className="font-mono">admission2025main2.php</span></li>
                                <li>• Looks for PDF links containing keywords like &quot;undergraduate&quot;, &quot;postgraduate&quot;, &quot;brochure&quot;</li>
                                <li>• Matches URL patterns like &quot;brug&quot; (undergraduate) and &quot;brPG&quot; (postgraduate)</li>
                                <li>• Falls back to known URLs if auto-detection fails</li>
                                <li>• Updates automatically when IPU publishes new brochures</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Important Notes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Important Notes</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <div className="space-y-3">
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Brochures are updated annually by the university administration
                            </p>
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Download the latest version before applying for admissions
                            </p>
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                All information in the brochure is official and authoritative
                            </p>
                        </div>
                        <div className="space-y-3">
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                For any discrepancies, refer to the official university website
                            </p>
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Brochures contain the most current admission requirements
                            </p>
                            <p className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                Contact admissions office for clarification on any information
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center"
                >
                    <h3 className="text-2xl font-bold mb-4">Need Help with Brochure Information?</h3>
                    <p className="text-lg mb-6">Contact our admissions team for assistance</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="bg-white/20 px-6 py-3 rounded-lg">
                            <p className="font-medium">Admissions Office</p>
                            <p className="text-blue-100">admissions@bpit.ac.in</p>
                        </div>
                        <div className="bg-white/20 px-6 py-3 rounded-lg">
                            <p className="font-medium">Phone</p>
                            <p className="text-blue-100">+91-11-2757-1101</p>
                        </div>
                        <div className="bg-white/20 px-6 py-3 rounded-lg">
                            <p className="font-medium">University Website</p>
                            <p className="text-blue-100">www.ipu.ac.in</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}