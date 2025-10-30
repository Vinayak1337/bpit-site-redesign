"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { recruitersWithLogos } from "@/data/admissions";

const RecruitersMarquee = () => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate list for seamless loop
  const items = [...recruitersWithLogos, ...recruitersWithLogos];

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 text-center">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Top Recruiters</h3>
            <p className="text-xs md:text-sm text-gray-600">Trusted by leading companies</p>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-gray-100">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            <div
              ref={trackRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`flex items-center gap-10 py-4 animate-[marquee_20s_linear_infinite] ${
                isHovered ? "[animation-play-state:paused]" : ""
              }`}
              style={{ width: "max-content" }}
            >
              {items.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="flex items-center opacity-80 hover:opacity-100 transition">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={120}
                    height={40}
                    className="h-6 md:h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default RecruitersMarquee;

