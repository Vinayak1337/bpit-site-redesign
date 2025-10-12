'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target, Users, Clock, CheckCircle } from 'lucide-react';

export default function SelfLearning() {
  const resources = [
    {
      title: 'Study Areas',
      icon: BookOpen,
      description: 'Quiet zones for individual study and research',
      features: ['Silent reading rooms', 'Individual study carrels', 'Comfortable seating'],
      color: 'blue'
    },
    {
      title: 'Research Assistance',
      icon: Target,
      description: 'Tools and resources for academic research',
      features: ['Reference materials', 'Academic databases', 'Research guides'],
      color: 'emerald'
    },
    {
      title: 'Learning Resources',
      icon: Lightbulb,
      description: 'Comprehensive collection of learning materials',
      features: ['E-books and journals', 'Course materials', 'Past question papers'],
      color: 'purple'
    },
    {
      title: 'Group Study',
      icon: Users,
      description: 'Collaborative learning spaces',
      features: ['Discussion rooms', 'Group tables', 'Presentation facilities'],
      color: 'orange'
    }
  ];

  const tips = [
    'Use the online catalog to locate resources efficiently',
    'Take advantage of extended hours during exam periods',
    'Maintain silence in designated quiet zones',
    'Ask librarians for research assistance when needed',
    'Book group study rooms in advance',
    'Use personal study carrels for long study sessions'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-8'>
      
      {/* Header Section */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-4 sm:p-6 lg:p-8 border border-blue-200'>
        <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <BookOpen className='w-8 h-8 sm:w-10 sm:h-10 text-white' />
          </div>
          <div className='text-center sm:text-left'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
              Self Learning Resources
            </h1>
            <p className='text-blue-600 font-medium text-sm sm:text-base'>
              Empowering Independent Study and Research
            </p>
          </div>
        </div>
      </div>

      {/* Resource Cards */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          const colorClasses: Record<string, string> = {
            blue: 'bg-blue-50 border-blue-200 text-blue-600',
            emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
            purple: 'bg-purple-50 border-purple-200 text-purple-600',
            orange: 'bg-orange-50 border-orange-200 text-orange-600'
          };
          
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow'>
              
              <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6'>
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorClasses[resource.color]}`}>
                  <Icon className='w-6 h-6 sm:w-8 sm:h-8' />
                </div>
                <div className='text-center sm:text-left'>
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-1'>{resource.title}</h3>
                  <p className='text-gray-600 text-sm'>{resource.description}</p>
                </div>
              </div>
              
              <div className='space-y-3'>
                {resource.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                    className='flex items-center gap-3'>
                    <CheckCircle className='w-4 h-4 text-green-500 flex-shrink-0' />
                    <span className='text-gray-700 text-sm'>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Study Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200'>
        <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <Lightbulb className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
          </div>
          <div className='text-center sm:text-left'>
            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-1'>Study Tips</h3>
            <p className='text-gray-600 text-sm sm:text-base'>Maximize your learning experience</p>
          </div>
        </div>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4'>
          {tips.map((tip, index) => (
            <motion.div
              key={tip}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className='flex items-start gap-3 p-3 sm:p-4 bg-yellow-50 rounded-xl'>
              <div className='w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                <span className='text-white text-xs font-bold'>{index + 1}</span>
              </div>
              <p className='text-gray-700 text-sm leading-relaxed'>{tip}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Study Hours Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className='bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-4 sm:p-6 lg:p-8 border border-green-200'>
        <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6'>
          <div className='w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
            <Clock className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
          </div>
          <div className='text-center sm:text-left'>
            <h3 className='text-xl sm:text-2xl font-bold text-gray-900 mb-1'>Optimal Study Hours</h3>
            <p className='text-green-600 font-medium text-sm sm:text-base'>Best times for focused learning</p>
          </div>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {[
            { time: 'Morning (9-12 PM)', benefit: 'Peak concentration', icon: '🌅' },
            { time: 'Afternoon (2-5 PM)', benefit: 'Group discussions', icon: '☀️' },
            { time: 'Evening (6-8 PM)', benefit: 'Review & revision', icon: '🌆' }
          ].map((period, index) => (
            <motion.div
              key={period.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className='text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm'>
              <div className='text-3xl sm:text-4xl mb-2 sm:mb-3'>{period.icon}</div>
              <h4 className='font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base'>{period.time}</h4>
              <p className='text-green-600 text-xs sm:text-sm font-medium'>{period.benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
