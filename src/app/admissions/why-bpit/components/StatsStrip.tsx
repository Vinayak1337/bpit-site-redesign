"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type Stat = { value: string; label: string };

const StatsStrip = ({ stats }: { stats: Stat[] }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-80px" }}
          className="-mt-10 md:-mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 text-center shadow-sm"
              >
                <div className="text-lg md:text-xl font-bold text-blue-900">
                  {mounted ? s.value : ""}
                </div>
                <div className="text-xs md:text-sm text-gray-600">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsStrip;
