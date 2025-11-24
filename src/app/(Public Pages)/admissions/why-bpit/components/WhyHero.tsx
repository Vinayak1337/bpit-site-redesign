"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type WhyHeroData = {
  badgeText: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const WhyHero = ({ data }: { data: WhyHeroData }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-4 py-2 mb-5 backdrop-blur">
            <GraduationCap className="w-5 h-5 text-yellow-300" />
            <span className="text-sm text-blue-100">{data.badgeText}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {data.title}
          </h1>
          <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto">
            {data.description}
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-white text-blue-900 font-semibold px-5 py-3 shadow-sm hover:shadow hover:bg-blue-50 transition"
              trackingEvent="why_bpit_hero_primary_cta"
              trackingData={{ label: data.primaryCta.label, href: data.primaryCta.href }}
            >
              <Link href={data.primaryCta.href} className="inline-flex items-center gap-2">
                {data.primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl bg-white/10 border border-white/20 text-white px-5 py-3 hover:bg-white/15 transition"
              trackingEvent="why_bpit_hero_secondary_cta"
              trackingData={{ label: data.secondaryCta.label, href: data.secondaryCta.href }}
            >
              <Link href={data.secondaryCta.href}>
                {data.secondaryCta.label}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHero;
