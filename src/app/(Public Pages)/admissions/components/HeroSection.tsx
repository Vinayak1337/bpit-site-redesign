'use client';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const stats = [
  { value: 'NBA', label: 'Accredited Programs' },
  { value: '95%', label: 'Placement Rate' },
  { value: '100+', label: 'Recruiters' },
  { value: 'GGSIPU', label: 'Affiliated' },
];

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-4 py-2 mb-5 backdrop-blur">
            <GraduationCap className="w-5 h-5 text-yellow-300" />
            <span className="text-sm text-blue-100">Why Choose BPIT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Launch your engineering career with confidence
          </h1>

          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto">
            Accredited programs, strong industry connections, modern infrastructure, and a culture of mentorship — all designed to set you up for success.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-white text-blue-900 font-semibold px-5 py-3 shadow-sm hover:shadow hover:bg-blue-50 transition"
              trackingEvent="admissions_hero_explore_highlights"
            >
              <Link href="#highlights" className="inline-flex items-center gap-2">
                Explore Highlights
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl bg-white/10 border border-white/20 text-white px-5 py-3 hover:bg-white/15 transition"
              trackingEvent="admissions_hero_process_click"
            >
              <Link href="/admissions/process">
                Admissions Process
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-blue-100/80">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
