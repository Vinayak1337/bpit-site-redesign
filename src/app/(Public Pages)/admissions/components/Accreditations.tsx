'use client';
import { motion } from 'framer-motion';
import { accreditations } from '@/data/admissions';

const Accreditations = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Accreditations & Affiliations</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Recognized by top governing bodies and ranked among the best institutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {accreditations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 text-center hover:bg-blue-50/70 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center mx-auto mb-3">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">{item.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;
