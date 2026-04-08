'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Trophy } from 'lucide-react';
import type { FounderTributeData } from '@/app/(Private Pages)/actions/about';

interface Props {
  data: FounderTributeData;
}

export function FounderTributeHeaderBlock({ data }: Props) {
  return (
    <div className='text-center'>
      <div className='w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 aspect-square'>
        <Heart className='w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white' />
      </div>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
        {data.header.title}
      </h1>
      <p className='text-orange-600 font-medium text-sm sm:text-base'>
        {data.header.subtitle}
      </p>
    </div>
  );
}

export function FounderTributeContentBlock({ data }: Props) {
  return (
    <div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
      {data.paragraphs?.map((p, i) => (
        <p key={i} className='text-sm sm:text-base mb-3 sm:mb-4'>
          {p}
        </p>
      ))}

      {data.quote && (
        <blockquote className='border-l-4 border-orange-500 pl-4 sm:pl-6 italic text-orange-800 bg-orange-50 p-3 sm:p-4 rounded-r-lg text-sm sm:text-base mb-3 sm:mb-4'>
          {data.quote}
        </blockquote>
      )}

      {data.more?.map((p, i) => (
        <p key={`more-${i}`} className='text-sm sm:text-base mb-4 sm:mb-6'>
          {p}
        </p>
      ))}
    </div>
  );
}

export function FounderTributeValuesBlock({ data }: Props) {
  if ((data.coreValues?.length ?? 0) === 0 && (data.commitments?.length ?? 0) === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
      {(data.coreValues?.length ?? 0) > 0 && (
        <div className='bg-white rounded-lg p-4 sm:p-6 shadow-sm'>
          <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base'>
            <Star className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0' />
            Core Values
          </h3>
          <ul className='space-y-2 text-gray-700'>
            {data.coreValues?.map((v, i) => (
              <li key={i} className='text-xs sm:text-sm'>• {v}</li>
            ))}
          </ul>
        </div>
      )}
      {(data.commitments?.length ?? 0) > 0 && (
        <div className='bg-white rounded-lg p-4 sm:p-6 shadow-sm'>
          <h3 className='font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base'>
            <Trophy className='w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0' />
            Our Commitment
          </h3>
          <ul className='space-y-2 text-gray-700'>
            {data.commitments?.map((v, i) => (
              <li key={i} className='text-xs sm:text-sm'>• {v}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function FounderTributeSection({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-6 sm:space-y-8'>
      <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-200'>
        <div className='space-y-6 sm:space-y-8'>
          <FounderTributeHeaderBlock data={data} />
          <FounderTributeContentBlock data={data} />
          <FounderTributeValuesBlock data={data} />
        </div>
      </div>
    </motion.div>
  );
}
