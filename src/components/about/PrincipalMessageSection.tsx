'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Users } from 'lucide-react';
import type { PrincipalMessageData } from '@/app/(Private Pages)/actions/about';

interface Props {
  data: PrincipalMessageData;
}

export function PrincipalMessageHeaderBlock({ data }: Props) {
  return (
    <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6'>
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
  );
}

export function PrincipalMessageContentBlock({ data }: Props) {
  return (
    <div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200'>
      <div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
        {data.quote ? (
          <p className='text-base sm:text-lg font-medium text-green-800 mb-3 sm:mb-4'>
            {data.quote}
          </p>
        ) : null}

        {data.paragraphs?.map((paragraph, index) => (
          <p key={index} className='text-sm sm:text-base mb-3 sm:mb-4'>
            {paragraph}
          </p>
        ))}

        {data.more?.map((paragraph, index) => (
          <p key={`more-${index}`} className='text-sm sm:text-base mb-3 sm:mb-4'>
            {paragraph}
          </p>
        ))}

        <p className='font-medium text-green-800 mt-4 sm:mt-6 text-sm sm:text-base'>
          Best wishes for your academic journey.
        </p>

        <div className='mt-4 sm:mt-6 pt-4 border-t border-gray-200'>
          <p className='font-semibold text-gray-900 text-sm sm:text-base'>
            Prof. [Principal Name]
          </p>
          <p className='text-green-600 text-xs sm:text-sm'>Principal, BPIT</p>
        </div>
      </div>
    </div>
  );
}

export function PrincipalMessageCardsBlock({ data }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 aspect-square'>
          <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 text-green-600' />
        </div>
        <h3 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
          {data.cards?.academicLeadership?.title || 'Academic Leadership'}
        </h3>
        <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
          {data.cards?.academicLeadership?.description || 'Guiding curriculum development and maintaining academic standards.'}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 aspect-square'>
          <Target className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
        </div>
        <h3 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
          {data.cards?.strategicVision?.title || 'Strategic Vision'}
        </h3>
        <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
          {data.cards?.strategicVision?.description || 'Developing long-term strategies for institutional growth and excellence.'}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200'>
        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4 aspect-square'>
          <Users className='w-5 h-5 sm:w-6 sm:h-6 text-purple-600' />
        </div>
        <h3 className='font-semibold text-gray-900 mb-2 text-sm sm:text-base'>
          {data.cards?.studentMentorship?.title || 'Student Mentorship'}
        </h3>
        <p className='text-gray-600 text-xs sm:text-sm leading-relaxed'>
          {data.cards?.studentMentorship?.description || 'Fostering student development and career guidance.'}
        </p>
      </motion.div>
    </div>
  );
}

export default function PrincipalMessageSection({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-6 sm:space-y-8'>
      <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
        <div className='space-y-6 sm:space-y-8'>
          <PrincipalMessageHeaderBlock data={data} />
          <PrincipalMessageContentBlock data={data} />
          <PrincipalMessageCardsBlock data={data} />
        </div>
      </div>
    </motion.div>
  );
}
