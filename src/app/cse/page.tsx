'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Code,
  Brain,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  Building2,
  Star,
  ChevronRight,
  Calendar,
  Target,
  Eye,
  Lightbulb,
  Database,
  Shield,
  Network,
  Cpu,
  Microscope,
  Factory,
  Globe,
  Trophy,
  FileText,
  Newspaper,
  TrendingUp,
  MapPin,
  Home,
  Briefcase,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Search,
  Filter,
  ChevronDown,
  ArrowRight,
  Play,
  Zap,
  Clock,
  UserCheck,
  Settings,
  Heart,
  Coffee,
  Rocket,
  User,
  Beaker,
  FlaskConical,
  Wrench,
  Monitor,
  Workflow
} from 'lucide-react';

interface TabContent {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  subItems?: string[];
}

const CSEDepartmentPage = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Animated Card Component
  const AnimatedCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { 
      once: true, 
      margin: "-100px 0px -100px 0px" 
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 300,
            delay: delay,
            duration: 0.8
          }
        } : {}}
        className='bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300'
        whileHover={{ 
          y: -8,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    );
  };

  const tabContent: TabContent[] = [
    {
      id: 'home',
      title: 'Home',
      icon: <Home className='w-5 h-5' />,
      subItems: ['Vision / Mission', 'POs / PEOs / PSOs'],
      content: (
        <div className='space-y-8'>
          {/* Department Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-blue-50 to-indigo-100 rounded-3xl p-8 border border-blue-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Code className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>Computer Science & Engineering</h1>
              <p className='text-lg text-gray-600'>Shaping the Future of Technology</p>
            </div>
          </motion.div>

          {/* Vision & Mission Section */}
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Vision & Mission</h2>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Target className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Our Vision</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    To be a center of excellence in Computer Science & Engineering education, fostering innovation, 
                    research, and entrepreneurship to develop globally competitive professionals who contribute to 
                    technological advancement and societal development.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Rocket className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Our Mission</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    To provide quality education in computer science and engineering through innovative teaching 
                    methodologies, cutting-edge research, industry collaboration, and holistic development of 
                    students to meet global challenges.
                  </p>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* POs, PEOs, PSOs Section */}
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Program Outcomes & Objectives</h2>
              <p className='text-gray-600 max-w-3xl mx-auto'>
                Our comprehensive curriculum is designed to achieve specific learning outcomes and objectives
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <GraduationCap className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Program Outcomes (POs)</h3>
                  <ul className='text-sm text-gray-700 space-y-2 text-left'>
                    <li>• Engineering knowledge application</li>
                    <li>• Problem analysis and design solutions</li>
                    <li>• Modern tool usage</li>
                    <li>• Research-based knowledge</li>
                    <li>• Individual and team work</li>
                    <li>• Communication skills</li>
                    <li>• Ethics and responsibility</li>
                    <li>• Life-long learning</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Target className='w-8 h-8 text-orange-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Program Educational Objectives (PEOs)</h3>
                  <ul className='text-sm text-gray-700 space-y-2 text-left'>
                    <li>• Successful career in software industry</li>
                    <li>• Leadership roles in technology</li>
                    <li>• Entrepreneurial ventures</li>
                    <li>• Higher education and research</li>
                    <li>• Ethical and professional responsibility</li>
                    <li>• Contribution to society</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Award className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Program Specific Outcomes (PSOs)</h3>
                  <ul className='text-sm text-gray-700 space-y-2 text-left'>
                    <li>• Software development proficiency</li>
                    <li>• System design and analysis</li>
                    <li>• Emerging technology adaptation</li>
                    <li>• Research and innovation</li>
                    <li>• Industry collaboration</li>
                    <li>• Global competency</li>
                  </ul>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: <Users className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-purple-50 to-pink-100 rounded-3xl p-8 border border-purple-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Users className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Our Distinguished Faculty</h1>
              <p className='text-purple-600 font-medium'>Experienced educators and researchers dedicated to excellence</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* HOD */}
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                    <UserCheck className='w-12 h-12 text-gray-500' />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900'>Dr. [HOD Name]</h3>
                  <p className='text-purple-600 font-medium mb-2'>Head of Department</p>
                  <p className='text-sm text-gray-600 mb-3'>Ph.D. in Computer Science</p>
                  <div className='space-y-1 text-xs text-gray-600'>
                    <p>• 15+ years experience</p>
                    <p>• Machine Learning Expert</p>
                    <p>• 50+ Publications</p>
                  </div>
                </div>
              </AnimatedCard>

              {/* Faculty Members */}
              {[
                { name: 'Dr. Priya Sharma', specialization: 'Artificial Intelligence', exp: '12+ years' },
                { name: 'Dr. Rajesh Kumar', specialization: 'Cybersecurity', exp: '10+ years' },
                { name: 'Dr. Anita Verma', specialization: 'Data Science', exp: '8+ years' },
                { name: 'Dr. Suresh Patel', specialization: 'Software Engineering', exp: '14+ years' },
                { name: 'Dr. Meena Gupta', specialization: 'Computer Networks', exp: '9+ years' }
              ].map((faculty, index) => (
                <AnimatedCard key={faculty.name} delay={0.2 + index * 0.1}>
                  <div className='text-center'>
                    <div className='w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                      <User className='w-10 h-10 text-gray-500' />
                    </div>
                    <h3 className='text-lg font-bold text-gray-900'>{faculty.name}</h3>
                    <p className='text-blue-600 font-medium mb-2'>Professor</p>
                    <p className='text-sm text-gray-600 mb-3'>{faculty.specialization}</p>
                    <div className='space-y-1 text-xs text-gray-600'>
                      <p>• {faculty.exp}</p>
                      <p>• Research Publications</p>
                      <p>• Industry Experience</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'pedagogical',
      title: 'Pedagogical Initiatives',
      icon: <Lightbulb className='w-5 h-5' />,
      subItems: ['Academic Calendar', 'Activity Calendar', 'Innovative Practices', 'Teaching Learning Process'],
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-orange-50 to-amber-100 rounded-3xl p-8 border border-orange-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Lightbulb className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Pedagogical Initiatives</h1>
              <p className='text-orange-600 font-medium'>Innovation in Teaching and Learning</p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Calendar className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Academic Calendar</h3>
                  <p className='text-gray-700 mb-4'>Structured semester planning with key dates and milestones</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Semester start/end dates</li>
                    <li>• Examination schedules</li>
                    <li>• Project deadlines</li>
                    <li>• Holiday calendar</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Clock className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Activity Calendar</h3>
                  <p className='text-gray-700 mb-4'>Comprehensive schedule of academic and co-curricular activities</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Technical symposiums</li>
                    <li>• Workshop schedules</li>
                    <li>• Guest lectures</li>
                    <li>• Cultural events</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Zap className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Innovative Practices</h3>
                  <p className='text-gray-700 mb-4'>Modern teaching methodologies and learning approaches</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Project-based learning</li>
                    <li>• Flipped classroom</li>
                    <li>• Industry collaboration</li>
                    <li>• Digital platforms</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <BookOpen className='w-8 h-8 text-red-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Teaching Learning Process</h3>
                  <p className='text-gray-700 mb-4'>Comprehensive approach to knowledge transfer and skill development</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Interactive lectures</li>
                    <li>• Hands-on labs</li>
                    <li>• Case studies</li>
                    <li>• Continuous assessment</li>
                  </ul>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'facilities',
      title: 'Facilities',
      icon: <Building2 className='w-5 h-5' />,
      subItems: ['Labs', 'R&D Labs', 'Industry-Supported Labs', 'FOSS Cell'],
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-green-50 to-emerald-100 rounded-3xl p-8 border border-green-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Building2 className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>State-of-the-Art Facilities</h1>
              <p className='text-green-600 font-medium'>Advanced infrastructure for learning and research</p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Monitor className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Computer Labs</h3>
                  <p className='text-gray-700 mb-4'>Modern computing facilities with latest hardware and software</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• 300+ high-performance workstations</li>
                    <li>• Latest software tools</li>
                    <li>• 24/7 internet connectivity</li>
                    <li>• Air-conditioned environment</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Beaker className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>R&D Labs</h3>
                  <p className='text-gray-700 mb-4'>Research and development facilities for advanced projects</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• AI/ML research lab</li>
                    <li>• IoT development center</li>
                    <li>• Robotics lab</li>
                    <li>• Innovation incubator</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Factory className='w-8 h-8 text-orange-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Industry-Supported Labs</h3>
                  <p className='text-gray-700 mb-4'>Collaborative spaces with industry partners</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Microsoft Lab</li>
                    <li>• Oracle Academy</li>
                    <li>• Cisco Networking Lab</li>
                    <li>• Google Cloud Platform</li>
                  </ul>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Globe className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>FOSS Cell</h3>
                  <p className='text-gray-700 mb-4'>Free and Open Source Software development center</p>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    <li>• Linux development environment</li>
                    <li>• Open source projects</li>
                    <li>• Community contributions</li>
                    <li>• Training programs</li>
                  </ul>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'student-corner',
      title: 'Student Corner',
      icon: <GraduationCap className='w-5 h-5' />,
      subItems: ['Prototype Product Development', 'Awards', 'Projects', 'Seminars & Workshops', 'Alumni'],
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-indigo-50 to-blue-100 rounded-3xl p-8 border border-indigo-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <GraduationCap className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Student Corner</h1>
              <p className='text-indigo-600 font-medium'>Empowering students through innovation and excellence</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Cpu className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Prototype Development</h3>
                  <p className='text-gray-700 mb-4'>Student-led innovation and product development</p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>• 50+ active projects</p>
                    <p>• Industry mentorship</p>
                    <p>• Funding support</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Trophy className='w-8 h-8 text-yellow-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Awards & Recognition</h3>
                  <p className='text-gray-700 mb-4'>Outstanding achievements and accolades</p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>• National level competitions</p>
                    <p>• Research excellence</p>
                    <p>• Innovation awards</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Code className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Student Projects</h3>
                  <p className='text-gray-700 mb-4'>Innovative solutions and applications</p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>• Final year projects</p>
                    <p>• Industry collaborations</p>
                    <p>• Open source contributions</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <BookOpen className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Seminars & Workshops</h3>
                  <p className='text-gray-700 mb-4'>Continuous learning and skill development</p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>• Monthly technical talks</p>
                    <p>• Industry expert sessions</p>
                    <p>• Hands-on workshops</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.5}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Users className='w-8 h-8 text-red-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Alumni Network</h3>
                  <p className='text-gray-700 mb-4'>Strong connections with successful graduates</p>
                  <div className='space-y-2 text-sm text-gray-600'>
                    <p>• 2000+ alumni</p>
                    <p>• Global presence</p>
                    <p>• Mentorship programs</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'publications',
      title: 'Publications',
      icon: <FileText className='w-5 h-5' />,
      subItems: ['Faculty Publications', 'Student Publications'],
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-rose-50 to-pink-100 rounded-3xl p-8 border border-rose-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <FileText className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Research Publications</h1>
              <p className='text-rose-600 font-medium'>Contributing to knowledge advancement</p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Users className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Faculty Publications</h3>
                  <p className='text-gray-700 mb-4'>Research contributions by our esteemed faculty</p>
                  <div className='space-y-3 text-sm'>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>International Journals: 120+</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>Conference Papers: 80+</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>Book Chapters: 25+</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <GraduationCap className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Student Publications</h3>
                  <p className='text-gray-700 mb-4'>Research achievements by our talented students</p>
                  <div className='space-y-3 text-sm'>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>Research Papers: 45+</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>Technical Articles: 30+</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-3'>
                      <p className='font-semibold'>Patent Applications: 12+</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'patents',
      title: 'Patents',
      icon: <Shield className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-cyan-50 to-blue-100 rounded-3xl p-8 border border-cyan-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Shield className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Patent Portfolio</h1>
              <p className='text-cyan-600 font-medium'>Innovation protection and intellectual property</p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Award className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-green-600'>15+</h3>
                  <p className='text-gray-700 font-medium'>Patents Filed</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Star className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-blue-600'>8+</h3>
                  <p className='text-gray-700 font-medium'>Patents Granted</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Lightbulb className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-purple-600'>5+</h3>
                  <p className='text-gray-700 font-medium'>Innovation Areas</p>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'magazine',
      title: 'Magazine',
      icon: <BookOpen className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-teal-50 to-green-100 rounded-3xl p-8 border border-teal-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <BookOpen className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Department Magazine</h1>
              <p className='text-teal-600 font-medium'>Annual publication showcasing achievements</p>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <FileText className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>CSE Chronicle 2024</h3>
                  <p className='text-gray-700 mb-4'>Latest edition featuring student and faculty achievements</p>
                  <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
                    Download PDF
                  </button>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Star className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Previous Editions</h3>
                  <p className='text-gray-700 mb-4'>Archive of past publications and special issues</p>
                  <button className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                    View Archive
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'newsletter',
      title: 'News-Letter',
      icon: <Newspaper className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-amber-50 to-yellow-100 rounded-3xl p-8 border border-amber-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Newspaper className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Department Newsletter</h1>
              <p className='text-amber-600 font-medium'>Monthly updates and announcements</p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              {[1, 2, 3].map((issue, index) => (
                <AnimatedCard key={issue} delay={0.1 + index * 0.1}>
                  <div className='text-center'>
                    <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                      <Newspaper className='w-8 h-8 text-blue-600' />
                    </div>
                    <h3 className='text-lg font-bold text-gray-900 mb-2'>Issue #{4 - index}</h3>
                    <p className='text-gray-600 text-sm mb-4'>December 2024</p>
                    <div className='space-y-2 text-xs text-gray-600'>
                      <p>• Faculty achievements</p>
                      <p>• Student spotlight</p>
                      <p>• Upcoming events</p>
                      <p>• Research updates</p>
                    </div>
                    <button className='mt-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors'>
                      Read More
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'result',
      title: 'Result',
      icon: <TrendingUp className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-emerald-50 to-green-100 rounded-3xl p-8 border border-emerald-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <TrendingUp className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Academic Results</h1>
              <p className='text-emerald-600 font-medium'>Student performance and achievements</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Award className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-blue-600'>95%</h3>
                  <p className='text-gray-700 font-medium'>Pass Percentage</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Star className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-green-600'>8.2</h3>
                  <p className='text-gray-700 font-medium'>Average CGPA</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Trophy className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-purple-600'>25+</h3>
                  <p className='text-gray-700 font-medium'>Toppers</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <GraduationCap className='w-8 h-8 text-orange-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-orange-600'>180+</h3>
                  <p className='text-gray-700 font-medium'>Graduates</p>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'placement',
      title: 'Placement',
      icon: <Briefcase className='w-5 h-5' />,
      content: (
        <div className='space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='bg-gradient-to-r from-violet-50 to-purple-100 rounded-3xl p-8 border border-violet-200'
          >
            <div className='text-center mb-8'>
              <div className='w-20 h-20 bg-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6'>
                <Briefcase className='w-10 h-10 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Placement Statistics</h1>
              <p className='text-violet-600 font-medium'>Career opportunities and industry connections</p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <TrendingUp className='w-8 h-8 text-green-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-green-600'>92%</h3>
                  <p className='text-gray-700 font-medium'>Placement Rate</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Trophy className='w-8 h-8 text-blue-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-blue-600'>₹12 LPA</h3>
                  <p className='text-gray-700 font-medium'>Highest Package</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Star className='w-8 h-8 text-purple-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-purple-600'>₹5.2 LPA</h3>
                  <p className='text-gray-700 font-medium'>Average Package</p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.4}>
                <div className='text-center'>
                  <div className='w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <Building2 className='w-8 h-8 text-orange-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-orange-600'>50+</h3>
                  <p className='text-gray-700 font-medium'>Recruiting Companies</p>
                </div>
              </AnimatedCard>
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              <AnimatedCard delay={0.5}>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Top Recruiters</h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL', 'IBM', 'Microsoft'].map((company, index) => (
                      <div key={company} className='bg-gray-100 rounded-lg p-3 text-center'>
                        <p className='font-medium text-gray-700'>{company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.6}>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>Placement Trends</h3>
                  <div className='space-y-4'>
                    <div className='bg-blue-50 rounded-lg p-4'>
                      <h4 className='font-semibold text-blue-800 mb-2'>Software Development</h4>
                      <p className='text-blue-600 text-sm'>65% of placements</p>
                    </div>
                    <div className='bg-green-50 rounded-lg p-4'>
                      <h4 className='font-semibold text-green-800 mb-2'>Data Science & Analytics</h4>
                      <p className='text-green-600 text-sm'>20% of placements</p>
                    </div>
                    <div className='bg-purple-50 rounded-lg p-4'>
                      <h4 className='font-semibold text-purple-800 mb-2'>Other Tech Roles</h4>
                      <p className='text-purple-600 text-sm'>15% of placements</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl'></div>
        </div>
        
        <div className='relative z-10 container mx-auto px-4 py-24'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center max-w-4xl mx-auto'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm'
            >
              <Code className='w-12 h-12 text-white' />
            </motion.div>
            
            <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
              Computer Science & Engineering
            </h1>
            
            <p className='text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed'>
              Innovating the Future Through Technology, Research, and Excellence
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex flex-wrap justify-center gap-4 text-sm'
            >
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm'>
                <Brain className='w-5 h-5 text-blue-300' />
                <span>AI & Machine Learning</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm'>
                <Shield className='w-5 h-5 text-green-300' />
                <span>Cybersecurity</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm'>
                <Database className='w-5 h-5 text-purple-300' />
                <span>Data Science</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-6 py-3 backdrop-blur-sm'>
                <Code className='w-5 h-5 text-orange-300' />
                <span>Software Development</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='lg:w-80 flex-shrink-0'
          >
            <div className='bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden sticky top-8'>
              <div className='p-2'>
                {tabContent.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-2xl mb-2 transition-all duration-300 group relative overflow-hidden ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md border border-indigo-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className='flex items-center gap-3 relative z-10'>
                      <div className={`p-2 rounded-xl transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        {tab.icon}
                      </div>
                      <div className='flex-1'>
                        <span className='font-medium block'>{tab.title}</span>
                        {tab.subItems && activeTab === tab.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                            className='text-xs text-indigo-500 mt-1 space-y-1'
                          >
                            {tab.subItems.map((item, idx) => (
                              <div key={idx} className='flex items-center gap-1'>
                                <div className='w-1 h-1 bg-indigo-400 rounded-full'></div>
                                <span>{item}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        activeTab === tab.id ? 'rotate-90 text-indigo-600' : 'text-gray-400'
                      }`} />
                    </div>
                    
                    {activeTab === tab.id && (
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl'
                        layoutId='activeTab'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='flex-1'
          >
            <div className='bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className='p-8'
                >
                  {tabContent.find(tab => tab.id === activeTab)?.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CSEDepartmentPage;
