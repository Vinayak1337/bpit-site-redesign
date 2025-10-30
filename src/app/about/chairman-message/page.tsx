'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { chairmanMessageData } from '@/data/about';

interface ChairmanMessageData {
  header: { title: string; subtitle: string };
  introQuote: string;
  paragraphs: string[];
  signature: { name: string; role: string };
}

const ChairmanMessage = ({ data }: { data: ChairmanMessageData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='space-y-6 sm:space-y-8'>
      <div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-200'>
        <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8'>
          <div className='w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 aspect-square'>
            <MessageSquare className='w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white' />
          </div>
          <div className='flex-1'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2'>
              {data.header.title}
            </h1>
            <p className='text-purple-600 font-medium text-sm sm:text-base'>
              {data.header.subtitle}
            </p>
          </div>
        </div>

        <div className='bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200'>
          <div className='prose prose-sm sm:prose-lg text-gray-700 leading-relaxed max-w-none'>
            <p className='text-base sm:text-lg font-medium text-purple-800 mb-3 sm:mb-4'>
              {data.introQuote}
            </p>

            {data.paragraphs.slice(0, data.paragraphs.length - 1).map((p, i) => (
              <p key={i} className='text-sm sm:text-base mb-3 sm:mb-4'>
                {p}
              </p>
            ))}

            <p className='font-medium text-purple-800 mt-4 sm:mt-6 text-sm sm:text-base'>
              {data.paragraphs[data.paragraphs.length - 1]}
            </p>

            <div className='mt-4 sm:mt-6 pt-4 border-t border-gray-200'>
              <p className='font-semibold text-gray-900 text-sm sm:text-base'>
                {data.signature.name}
              </p>
              <p className='text-purple-600 text-xs sm:text-sm'>
                {data.signature.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ChairmanMessagePage() {
  return <ChairmanMessage data={chairmanMessageData} />;
}
