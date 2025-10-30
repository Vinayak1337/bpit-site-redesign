'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Star,
  MapPin,
  Calendar,
  Briefcase,
  Award,
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const RecruitersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'IT Services', 'Product Companies', 'Consulting', 'Core Engineering', 'Banking & Finance', 'Startups'];

  const recruiters = [
    {
      name: 'Tata Consultancy Services',
      logo: '/recruiters/tcs.png',
      category: 'IT Services',
      sector: 'Information Technology',
      location: 'Global Operations',
      type: 'MNC',
      established: '1968',
      website: 'https://tcs.com',
      description: 'Global leader in IT services, consulting and business solutions with operations across continents'
    },
    {
      name: 'Infosys Limited',
      logo: '/recruiters/infosys.png',
      category: 'IT Services',
      sector: 'Information Technology',
      location: 'Global Operations',
      type: 'MNC',
      established: '1981',
      website: 'https://infosys.com',
      description: 'Global leader in next-generation digital services and consulting, enabling digital transformation'
    },
    {
      name: 'Microsoft Corporation',
      logo: '/recruiters/microsoft.png',
      category: 'Product Companies',
      sector: 'Technology',
      location: 'Worldwide',
      type: 'Product Giant',
      established: '1975',
      website: 'https://microsoft.com',
      description: 'Leading technology corporation specializing in software, cloud computing, and productivity solutions'
    },
    {
      name: 'Wipro Technologies',
      logo: '/recruiters/wipro.png',
      category: 'IT Services',
      sector: 'Information Technology',
      location: 'Global Operations',
      type: 'MNC',
      established: '1945',
      website: 'https://wipro.com',
      description: 'Global technology consulting and digital transformation company serving diverse industries'
    },
    {
      name: 'Accenture',
      logo: '/recruiters/accenture.png',
      category: 'Consulting',
      sector: 'Management Consulting',
      location: 'Global Operations',
      type: 'Consulting',
      established: '1989',
      website: 'https://accenture.com',
      description: 'Global professional services company specializing in digital transformation and technology consulting'
    },
    {
      name: 'Amazon',
      logo: '/recruiters/amazon.png',
      category: 'Product Companies',
      sector: 'E-commerce & Cloud',
      location: 'Worldwide',
      type: 'Product Giant',
      established: '1994',
      website: 'https://amazon.com',
      description: 'World\'s largest e-commerce platform and cloud computing services provider'
    },
    {
      name: 'Samsung R&D',
      logo: '/recruiters/samsung.png',
      category: 'Core Engineering',
      sector: 'Electronics & Technology',
      location: 'Global R&D Centers',
      type: 'R&D',
      established: '1938',
      website: 'https://samsung.com',
      description: 'Global technology conglomerate and innovation leader in electronics and semiconductors'
    },
    {
      name: 'HDFC Bank',
      logo: '/recruiters/hdfc.png',
      category: 'Banking & Finance',
      sector: 'Banking',
      location: 'Pan-India Operations',
      type: 'Banking',
      established: '1994',
      website: 'https://hdfcbank.com',
      description: 'Leading private sector bank offering comprehensive financial services and digital banking solutions'
    },
    {
      name: 'Paytm',
      logo: '/recruiters/paytm.png',
      category: 'Startups',
      sector: 'Fintech',
      location: 'India Operations',
      type: 'Fintech',
      established: '2010',
      website: 'https://paytm.com',
      description: 'Leading digital payments and financial services platform revolutionizing digital transactions'
    },
    {
      name: 'Cognizant',
      logo: '/recruiters/cognizant.png',
      category: 'IT Services',
      sector: 'Information Technology',
      location: 'Global Operations',
      type: 'MNC',
      established: '1994',
      website: 'https://cognizant.com',
      description: 'Multinational technology and professional services company enabling digital transformation'
    },
    {
      name: 'HCL Technologies',
      logo: '/recruiters/hcl.png',
      category: 'IT Services',
      sector: 'Information Technology',
      location: 'Global Operations',
      type: 'MNC',
      established: '1976',
      website: 'https://hcltech.com',
      description: 'Global technology company specializing in engineering, R&D services and digital transformation'
    },
    {
      name: 'IBM India',
      logo: '/recruiters/ibm.png',
      category: 'Product Companies',
      sector: 'Technology & Consulting',
      location: 'Global Operations',
      type: 'MNC',
      established: '1911',
      website: 'https://ibm.com',
      description: 'Global technology and consulting corporation pioneering enterprise AI and cloud solutions'
    },
    {
      name: 'Google',
      logo: '/recruiters/google.png',
      category: 'Product Companies',
      sector: 'Technology',
      location: 'Worldwide',
      type: 'Product Giant',
      established: '1998',
      website: 'https://google.com',
      description: 'Global technology leader specializing in internet services, cloud computing, and artificial intelligence'
    },
    {
      name: 'Zomato',
      logo: '/recruiters/zomato.png',
      category: 'Startups',
      sector: 'Food Tech',
      location: 'India Operations',
      type: 'Unicorn',
      established: '2008',
      website: 'https://zomato.com',
      description: 'Leading food delivery and restaurant discovery platform transforming the food ecosystem'
    },
    {
      name: 'Flipkart',
      logo: '/recruiters/flipkart.png',
      category: 'Product Companies',
      sector: 'E-commerce',
      location: 'India Operations',
      type: 'Unicorn',
      established: '2007',
      website: 'https://flipkart.com',
      description: 'Leading Indian e-commerce marketplace revolutionizing online retail and digital commerce'
    },
    {
      name: 'Capgemini',
      logo: '/recruiters/capgemini.png',
      category: 'Consulting',
      sector: 'Technology Consulting',
      location: 'Global Operations',
      type: 'MNC',
      established: '1967',
      website: 'https://capgemini.com',
      description: 'Global technology consulting and digital transformation leader serving diverse industries worldwide'
    },
    {
      name: 'Juspay',
      logo: '/recruiters/juspay.png',
      category: 'Startups',
      sector: 'Fintech',
      location: 'India Operations',
      type: 'Fintech',
      established: '2012',
      website: 'https://juspay.in',
      description: 'Leading payment infrastructure company enabling seamless digital payment experiences'
    },
    {
      name: 'ZS Associates',
      logo: '/recruiters/zs.png',
      category: 'Consulting',
      sector: 'Analytics Consulting',
      location: 'Global Operations',
      type: 'Consulting',
      established: '1983',
      website: 'https://zs.com',
      description: 'Global consulting firm specializing in sales, marketing, and analytics solutions'
    }
  ];

  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesCategory = selectedCategory === 'All' || recruiter.category === selectedCategory;
    const matchesSearch = recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recruiter.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recruiter.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { icon: Building2, value: '500+', label: 'Partner Companies' },
    { icon: Users, value: '2000+', label: 'Students Placed' },
    { icon: TrendingUp, value: '96%', label: 'Placement Rate' },
    { icon: Award, value: '₹9.07 LPA', label: 'Average Package' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Building2 className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Our Recruiters
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Industry leaders who trust BPIT graduates for their excellence and capabilities
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{stat.value}</h3>
                <p className="text-gray-600 text-center font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="space-y-6">
                {/* Search */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recruiters Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industry Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showing {filteredRecruiters.length} companies in {selectedCategory === 'All' ? 'all categories' : selectedCategory}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRecruiters.map((recruiter, index) => (
                <motion.div
                  key={recruiter.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  {/* Company Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {recruiter.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{recruiter.name}</h3>
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          recruiter.type === 'MNC' ? 'bg-blue-100 text-blue-800' :
                          recruiter.type === 'Product Giant' ? 'bg-purple-100 text-purple-800' :
                          recruiter.type === 'Consulting' ? 'bg-green-100 text-green-800' :
                          recruiter.type === 'Banking' ? 'bg-orange-100 text-orange-800' :
                          recruiter.type === 'Unicorn' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {recruiter.type}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(recruiter.website, '_blank')}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </Button>
                  </div>

                  {/* Company Info */}
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">{recruiter.description}</p>
                    
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Sector</p>
                        <p className="text-sm font-semibold text-gray-900">{recruiter.sector}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{recruiter.location}</span>
                    </div>
                  </div>


                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Est. {recruiter.established}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-blue-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">Industry Partner</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredRecruiters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No companies found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or category filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Want to Partner with Us?
            </h2>
            <p className="text-xl text-blue-200 mb-8 leading-relaxed">
              Join our network of industry partners and hire top-tier talent from BPIT
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Building2 className="mr-2 w-5 h-5" />
                Become a Recruiter
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                <Globe className="mr-2 w-5 h-5" />
                Visit Career Portal
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default RecruitersPage;