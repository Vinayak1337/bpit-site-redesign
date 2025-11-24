'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Target, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type CTAButton = { label: string; href: string; icon?: 'target' | 'map' | 'phone' };
type FinalCTAData = { title: string; subtitle: string; ctas: ReadonlyArray<CTAButton> };

const iconFor = (icon?: CTAButton['icon']) => {
  switch (icon) {
    case 'target':
      return <Target className="w-5 h-5" />;
    case 'map':
      return <MapPin className="w-5 h-5" />;
    case 'phone':
      return <Phone className="w-5 h-5" />;
    default:
      return null;
  }
};

const FinalCTA = ({ data }: { data: FinalCTAData }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 max-w-3xl mx-auto">{data.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {data.ctas.map((cta, idx) => (
              <Button
                key={`${cta.label}-${idx}`}
                asChild
                variant={idx === 0 ? 'default' : 'outline'}
                size="lg"
                className={
                  idx === 0
                    ? 'bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold shadow-sm'
                    : 'bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold'
                }
                trackingEvent="admissions_cta_clicked"
                trackingData={{ label: cta.label, href: cta.href, position: idx }}
              >
                <Link href={cta.href} className="flex items-center gap-2">
                  {iconFor(cta.icon)}
                  {cta.label}
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
