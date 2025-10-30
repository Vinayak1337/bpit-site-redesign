'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Users } from 'lucide-react';
import { principalMessageData } from '@/data/about';

interface PrincipalMessageData {
  header: { title: string; subtitle: string };
  introQuote: string;
  paragraphs: string[];
  signature: { name: string; role: string };
  highlights: Array<{ icon: string; title: string; description: string; color: string }>;
}

const PrincipalMessage = ({ data }: { data: PrincipalMessageData }) => {
  const getIconColorClasses = (color: string) => {
    const mapping: Record<string, { wrapper: string; icon: string }> = {
      green: { wrapper: 'bg-green-100', icon: 'text-green-600' },
      blue: { wrapper: 'bg-blue-100', icon: 'text-blue-600' },
      purple: { wrapper: 'bg-purple-100', icon: 'text-purple-600' },
    };
    return mapping[color] ?? { wrapper: 'bg-gray-100', icon: 'text-gray-600' };
  };

  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-6 sm:space-y-8'>
      <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
        <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 aspect-square'>
            <User className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white' />
          </div>
          <div className='flex-1'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
              {data.header.title}
            </h1>
            <p className='text-green-600 font-medium text-sm sm:text-base'>
              {data.header.subtitle}
            </p>
          </div>
        </div>

        <div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200'>
          <div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
            <p className='text-base sm:text-lg font-medium text-green-800 mb-3 sm:mb-4'>
              {data.introQuote}
            </p>

            {data.paragraphs.slice(0, data.paragraphs.length - 1).map((p, i) => (
              <p key={i} className='text-sm sm:text-base mb-3 sm:mb-4'>
                {p}
              </p>
            ))}

            <p className='font-medium text-green-800 mt-4 sm:mt-6 text-sm sm:text-base'>
              {data.paragraphs[data.paragraphs.length - 1]}
            </p>

            <div className='mt-4 sm:mt-6 pt-4 border-t border-gray-200'>
              <p className='font-semibold text-gray-900 text-sm sm:text-base'>
                {data.signature.name}
              </p>
              <p className='text-green-600 text-xs sm:text-sm'>
                {data.signature.role}
              </p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8'>
          {data.highlights.map((h, idx) => {
            const cls = getIconColorClasses(h.color);
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${cls.wrapper} rounded-lg flex items-center justify-center mb-3 sm:mb-4 aspect-square`}>
                  {renderIcon(h.icon, `w-5 h-5 sm:w-6 sm:h-6 ${cls.icon}`)}
                </div>
                <h3 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
                  {h.title}
                </h3>
                <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
                  {h.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function PrincipalMessagePage() {
  return <PrincipalMessage data={principalMessageData} />;
}
