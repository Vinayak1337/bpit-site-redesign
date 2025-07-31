'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Search, BookOpen, Download, ExternalLink, Shield, Clock, Users } from 'lucide-react';

export default function DigitalLibrary() {
  const resources = [
    {
      title: 'E-Books Collection',
      icon: BookOpen,
      description: 'Comprehensive digital book library',
      count: '50,000+',
      features: ['Engineering textbooks', 'Reference materials', 'Academic publications'],
      color: 'blue'
    },
    {
      title: 'Online Journals',
      icon: Globe,
      description: 'Peer-reviewed academic journals',
      count: '15,000+',
      features: ['Research papers', 'Conference proceedings', 'Academic articles'],
      color: 'emerald'
    },
    {
      title: 'Research Databases',
      icon: Database,
      description: 'Scientific and technical databases',
      count: '100+',
      features: ['IEEE Xplore', 'ACM Digital Library', 'SpringerLink'],
      color: 'purple'
    },
    {
      title: 'Search Portal',
      icon: Search,
      description: 'Advanced search capabilities',
      count: 'Unlimited',
      features: ['Cross-database search', 'Advanced filters', 'Citation tools'],
      color: 'orange'
    }
  ];

  const features = [
    { icon: Clock, title: '24/7 Access', description: 'Available round the clock' },
    { icon: Shield, title: 'Secure Login', description: 'Protected student access' },
    { icon: Download, title: 'Download Support', description: 'Save for offline reading' },
    { icon: Users, title: 'Multi-user Access', description: 'Concurrent user support' }
  ];

  const popularDatabases = [
    { name: 'IEEE Xplore', subjects: 'Engineering, Computer Science', access: 'Full Text' },
    { name: 'ACM Digital Library', subjects: 'Computing, Information Technology', access: 'Full Text' },
    { name: 'SpringerLink', subjects: 'Science, Technology, Medicine', access: 'Full Text' },
    { name: 'ScienceDirect', subjects: 'Physical Sciences, Engineering', access: 'Full Text' },
    { name: 'Wiley Online Library', subjects: 'Engineering, Mathematics', access: 'Full Text' },
    { name: 'Taylor & Francis', subjects: 'Engineering, Technology', access: 'Full Text' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-8'>
      
      {/* Header Section */}
      <div className='bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200'>
        <div className='flex items-start gap-6 mb-8'>
          <div className='w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <Database className='w-10 h-10 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Digital Library
            </h1>
            <p className='text-purple-600 font-medium'>
              Comprehensive Digital Resources & Research Database
            </p>
          </div>
        </div>      </div>

      {/* Resource Statistics */}
      <div className='grid md:grid-cols-4 gap-6'>
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          const colorClasses: Record<string, string> = {
            blue: 'from-blue-500 to-blue-600',
            emerald: 'from-emerald-500 to-emerald-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600'
          };
          
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className='bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all group'>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[resource.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className='w-7 h-7 text-white' />
              </div>
              
              <div className='text-3xl font-bold text-gray-900 mb-1'>{resource.count}</div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>{resource.title}</h3>
              <p className='text-gray-600 text-sm mb-4'>{resource.description}</p>
              
              <div className='space-y-2'>
                {resource.features.map((feature, featureIndex) => (
                  <div key={feature} className='flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-gray-400 rounded-full'></div>
                    <span className='text-xs text-gray-600'>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
        <h3 className='text-2xl font-bold text-gray-900 mb-6'>Key Features</h3>
        
        <div className='grid md:grid-cols-4 gap-6'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className='text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl'>
                <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3'>
                  <Icon className='w-6 h-6 text-white' />
                </div>
                <h4 className='font-bold text-gray-900 mb-2'>{feature.title}</h4>
                <p className='text-gray-600 text-sm'>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Databases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center'>
            <Database className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>Popular Databases</h3>
            <p className='text-gray-600'>Most accessed research databases</p>
          </div>
        </div>
        
        <div className='grid md:grid-cols-2 gap-4'>
          {popularDatabases.map((database, index) => (
            <motion.div
              key={database.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className='flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group'>
              <div>
                <h4 className='font-bold text-gray-900 mb-1'>{database.name}</h4>
                <p className='text-gray-600 text-sm mb-1'>{database.subjects}</p>
                <span className='text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded'>
                  {database.access}
                </span>
              </div>
              <ExternalLink className='w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors' />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Access Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className='bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center'>
            <Shield className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>How to Access</h3>
            <p className='text-blue-600 font-medium'>Simple steps to get started</p>
          </div>
        </div>
        
        <div className='grid md:grid-cols-3 gap-6'>
          {[
            { step: '1', title: 'Login', description: 'Use your student credentials to access the digital library portal' },
            { step: '2', title: 'Search', description: 'Use advanced search tools to find specific resources or browse by category' },
            { step: '3', title: 'Access', description: 'Download, bookmark, or read online. Cite sources for your research work' }
          ].map((instruction, index) => (
            <motion.div
              key={instruction.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6 + index * 0.2 }}
              className='text-center p-6 bg-white rounded-xl shadow-sm'>
              <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-lg'>{instruction.step}</span>
              </div>
              <h4 className='font-bold text-gray-900 mb-2'>{instruction.title}</h4>
              <p className='text-gray-600 text-sm leading-relaxed'>{instruction.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
