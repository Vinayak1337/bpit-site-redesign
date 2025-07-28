'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ExternalLink, Database, Users, BookOpen, Share2, Download, CheckCircle } from 'lucide-react';

export default function Delnet() {
  const services = [
    {
      title: 'Union Catalog Access',
      description: 'Access to comprehensive library catalogs across India',
      icon: Database,
      color: 'blue'
    },
    {
      title: 'Interlibrary Loans',
      description: 'Borrow resources from partner institutions',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Document Delivery',
      description: 'Fast delivery of research papers and documents',
      icon: Download,
      color: 'purple'
    },
    {
      title: 'Collaborative Networks',
      description: 'Connect with libraries nationwide',
      icon: Share2,
      color: 'orange'
    }
  ];

  const databases = [
    'DELNET Union Catalogue',
    'Indian Dissertation Database',
    'Indian Periodicals Database', 
    'Conference Proceedings Database',
    'Standards Database',
    'Patents Database',
    'Bibliographic Database',
    'Full-text Database'
  ];

  const benefits = [
    'Access to over 3000+ library collections',
    'Resource sharing with premier institutions',
    'Professional development opportunities',
    'Technical training and support',
    'Research collaboration platform',
    'Cost-effective information access'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-8'>
      
      {/* Header Section */}
      <div className='bg-gradient-to-r from-indigo-50 to-blue-100 rounded-2xl p-8 border border-indigo-200'>
        <div className='flex items-start gap-6 mb-8'>
          <div className='w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <Network className='w-10 h-10 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              DELNET Services
            </h1>
            <p className='text-indigo-600 font-medium'>
              Developing Library Network - Connecting Knowledge Nationwide
            </p>
          </div>
        </div>

        <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
          <p className='text-lg text-gray-700 leading-relaxed'>
            BPIT is a proud member of DELNET (Developing Library Network), one of India's premier library 
            networks. This association provides our students and faculty access to vast information resources, 
            research databases, and collaborative services across participating institutions nationwide.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className='grid md:grid-cols-2 gap-6'>
        {services.map((service, index) => {
          const Icon = service.icon;
          const colorClasses: Record<string, string> = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600'
          };
          
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className='bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all group'>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[service.color]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className='w-7 h-7 text-white' />
              </div>
              
              <h3 className='text-xl font-bold text-gray-900 mb-2'>{service.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{service.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Available Databases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center'>
            <Database className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>Available Databases</h3>
            <p className='text-gray-600'>Access comprehensive research databases</p>
          </div>
        </div>
        
        <div className='grid md:grid-cols-2 gap-4'>
          {databases.map((database, index) => (
            <motion.div
              key={database}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
              className='flex items-center gap-3 p-4 bg-emerald-50 rounded-xl'>
              <CheckCircle className='w-5 h-5 text-emerald-600 flex-shrink-0' />
              <span className='text-gray-700 font-medium'>{database}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Membership Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className='bg-gradient-to-r from-purple-50 to-indigo-100 rounded-2xl p-8 border border-purple-200'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center'>
            <Users className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>Membership Benefits</h3>
            <p className='text-purple-600 font-medium'>Advantages of DELNET partnership</p>
          </div>
        </div>
        
        <div className='grid md:grid-cols-3 gap-4'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className='flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm'>
              <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0'>
                <CheckCircle className='w-4 h-4 text-purple-600' />
              </div>
              <span className='text-gray-700 text-sm font-medium'>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Access Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-200'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center'>
            <ExternalLink className='w-8 h-8 text-white' />
          </div>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>How to Access</h3>
            <p className='text-blue-600 font-medium'>Get started with DELNET services</p>
          </div>
        </div>
        
        <div className='grid md:grid-cols-3 gap-6'>
          {[
            { step: '1', title: 'Visit Library', description: 'Contact our library staff for DELNET access credentials' },
            { step: '2', title: 'Register', description: 'Complete the registration process with required documentation' },
            { step: '3', title: 'Access Resources', description: 'Start exploring databases and services available through DELNET' }
          ].map((instruction, index) => (
            <motion.div
              key={instruction.step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.6 + index * 0.2 }}
              className='text-center p-6 bg-blue-50 rounded-xl'>
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
