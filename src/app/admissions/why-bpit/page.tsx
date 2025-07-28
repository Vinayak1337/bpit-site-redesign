'use client';

import HeroSection from '../components/HeroSection';
import Accreditations from '../components/Accreditations';
import WhyBPITHighlights from '../components/WhyBPITHighlights';
import CampusTour from '../components/CampusTour';
import Academics from '../components/Academics';
import StudentLife from '../components/StudentLife';
import Placements from '../components/Placements';
import Location from '../components/Location';
import Testimonials from '../components/Testimonials';
import Affordability from '../components/Affordability';
import FinalCTA from '../components/FinalCTA';

const WhyBPITPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection />
            <Accreditations />
            <WhyBPITHighlights />
            <CampusTour />
            <Academics />
            <StudentLife />
            <Placements />
            <Location />
            <Testimonials />
            <Affordability />
            <FinalCTA />
        </div>
    );
};

export default WhyBPITPage;
