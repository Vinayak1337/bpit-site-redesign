'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Clock, 
  MapPin, 
  Users,
  Calendar,
  DollarSign,
  Star,
  Building2,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  BookOpen,
  Target,
  Lightbulb,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const InternshipsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Summer Internship', 'Winter Internship', 'Research Internship', 'Industry Project', 'Startup Internship'];

  const internshipStats = [
    { icon: Users, value: '500+', label: 'Students Interned' },
    { icon: Building2, value: '80+', label: 'Partner Organizations' },
    { icon: TrendingUp, value: '75%', label: 'PPO Conversion Rate' },
    { icon: Award, value: '50+', label: 'Industries Covered' }
  ];

  const internshipOpportunities = [
    {
      company: 'Microsoft India',
      title: 'Software Engineering',
      type: 'Summer Internship',
      location: 'Global Operations',
      description: 'Offers internships in cloud technologies, software development, and cutting-edge technology projects.',
      logo: '/internships/microsoft.png',
      category: 'Technology',
      domains: ['Cloud Computing', 'Software Development', 'AI/ML']
    },
    {
      company: 'Amazon',
      title: 'Software Development',
      type: 'Summer Internship',
      location: 'Worldwide',
      description: 'Provides internships in scalable distributed systems, e-commerce, and cloud computing services.',
      logo: '/internships/amazon.png',
      category: 'Technology',
      domains: ['Distributed Systems', 'E-commerce', 'Cloud Services']
    },
    {
      company: 'Google',
      title: 'Software Engineering',
      type: 'Summer Internship',
      location: 'Global Operations',
      description: 'Offers internship opportunities in cutting-edge technology products used by billions globally.',
      logo: '/internships/google.png',
      category: 'Technology',
      domains: ['Web Technologies', 'Mobile Development', 'AI/ML']
    },
    {
      company: 'IBM Research Labs',
      title: 'Research & Development',
      type: 'Research Internship',
      location: 'Global R&D Centers',
      description: 'Provides research internships in artificial intelligence, machine learning, and enterprise solutions.',
      logo: '/internships/ibm.png',
      category: 'Research',
      domains: ['AI/ML Research', 'Enterprise Solutions', 'Quantum Computing']
    },
    {
      company: 'Paytm',
      title: 'Fintech Development',
      type: 'Summer Internship',
      location: 'India Operations',
      description: 'Offers internships in fintech, digital payments, and financial services platform development.',
      logo: '/internships/paytm.png',
      category: 'Fintech',
      domains: ['Digital Payments', 'Financial Services', 'Product Development']
    },
    {
      company: 'Flipkart',
      title: 'E-commerce Technology',
      type: 'Summer Internship',
      location: 'India Operations',
      description: 'Provides internships in e-commerce technology, data science, and supply chain optimization.',
      logo: '/internships/flipkart.png',
      category: 'E-commerce',
      domains: ['Data Science', 'Supply Chain', 'Platform Development']
    },
    {
      company: 'Zomato',
      title: 'Food Tech Innovation',
      type: 'Startup Internship',
      location: 'India Operations',
      description: 'Offers internships in food technology, mobile app development, and delivery platform innovation.',
      logo: '/internships/zomato.png',
      category: 'Food Tech',
      domains: ['Mobile Development', 'Platform Innovation', 'Food Technology']
    },
    {
      company: 'ISRO',
      title: 'Space Technology',
      type: 'Research Internship',
      location: 'India Space Centers',
      description: 'Provides research internships in space technology, satellite development, and aerospace engineering.',
      logo: '/internships/isro.png',
      category: 'Aerospace',
      domains: ['Satellite Technology', 'Space Missions', 'Aerospace Engineering']
    }
  ];


  const filteredInternships = internshipOpportunities.filter(internship => {
    const matchesFilter = selectedFilter === 'All' || internship.type === selectedFilter;
    const matchesSearch = internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const benefits = [
    {
      icon: Target,
      title: 'Industry Exposure',
      description: 'Get hands-on experience with real industry projects and cutting-edge technologies',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Work under experienced professionals and receive guidance throughout your internship',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Enhance your technical and soft skills through practical application and training',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'High chances of receiving Pre-Placement Offers (PPO) based on performance',
      color: 'orange'
    }
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
                <Briefcase className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Internship Opportunities
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Bridge the gap between academics and industry with hands-on experience
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internshipStats.map((stat, index) => (
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Pursue Internships?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of gaining practical experience through our internship programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  benefit.color === 'blue' ? 'from-blue-500 to-cyan-600' :
                  benefit.color === 'green' ? 'from-green-500 to-emerald-600' :
                  benefit.color === 'purple' ? 'from-purple-500 to-violet-600' :
                  'from-orange-500 to-red-600'
                } rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
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
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedFilter === filter
                          ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-16">
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
              Leading companies that regularly offer internship opportunities to our students
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredInternships.map((internship, index) => (
                <motion.div
                  key={internship.company + internship.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                        {internship.company.split(' ').map(word => word[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{internship.company}</h3>
                        <p className="text-blue-600 font-semibold">{internship.title}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {internship.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">{internship.description}</p>

                  {/* Location */}
                  <div className="flex items-center space-x-2 mb-6">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{internship.location}</span>
                  </div>

                  {/* Domains */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.domains.map((domain, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-full border border-blue-200"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-blue-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">Industry Partner</span>
                    </div>
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      {internship.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredInternships.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Internships Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the internship process and what to expect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Application Process', 
                description: 'Students apply through college placement cell with required documents and eligibility criteria.',
                icon: Users 
              },
              { 
                title: 'Selection & Training', 
                description: 'Companies conduct interviews and select candidates who undergo orientation and skills training.',
                icon: Target 
              },
              { 
                title: 'Performance & Growth', 
                description: 'Interns work on real projects, receive mentorship, and may receive Pre-Placement Offers.',
                icon: TrendingUp 
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Need Guidance?
            </h2>
            <p className="text-xl text-blue-200 mb-12 leading-relaxed">
              Our placement team is here to help you find the perfect internship opportunity
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                <p className="text-blue-200">+91-11-27850086 (Ext: 245)</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <p className="text-blue-200">internships@bpit.ac.in</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <BookOpen className="mr-2 w-5 h-5" />
                Internship Guidelines
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Meeting
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default InternshipsPage;