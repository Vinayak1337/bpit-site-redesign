'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  ChevronDown,
  Calendar,
  Target,
  Lightbulb,
  Database,
  Shield,
  Cpu,
  Factory,
  Globe,
  Trophy,
  FileText,
  Newspaper,
  TrendingUp,
  Home,
  Briefcase,
  Zap,
  Clock,
  UserCheck,
  Rocket,
  User,
  Beaker,
  Monitor,
  Eye,
  Heart,
  Settings,
  Microscope,
  Wrench,
  FlaskConical,
  Users2,
  Presentation,
  NotebookPen,
  MessageSquare,
  ThumbsUp,
  FolderOpen,
  Camera,
  Megaphone,
  BarChart,
  CheckCircle,
  Building,
  Network,
  GitBranch,
  BookOpenCheck,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Download,
  ExternalLink
} from 'lucide-react';

interface SubSection {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface NavigationSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  subSections?: SubSection[];
  hasContent?: boolean;
}

const CSEDepartmentPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeSubSection, setActiveSubSection] = useState('vision-mission');
  const [expandedSections, setExpandedSections] = useState<string[]>(['home']);

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Handle section click
  const handleSectionClick = (sectionId: string, subSectionId?: string) => {
    setActiveSection(sectionId);
    if (subSectionId) {
      setActiveSubSection(subSectionId);
      if (!expandedSections.includes(sectionId)) {
        toggleSection(sectionId);
      }
    }
  };

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
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 300,
            delay: delay,
            duration: 0.6
          }
        } : {}}
        className='bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300'
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.div>
    );
  };

  // Navigation structure
  const navigationSections: NavigationSection[] = [
    {
      id: 'home',
      title: 'Home',
      icon: <Home className='w-5 h-5' />,
      subSections: [
        {
          id: 'vision-mission',
          title: 'Vision / Mission',
          icon: <Eye className='w-4 h-4' />
        },
        {
          id: 'pos-peos-psos',
          title: 'POs / PEOs / PSOs',
          icon: <Target className='w-4 h-4' />
        }
      ]
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: <Users className='w-5 h-5' />,
      hasContent: true
    },
    {
      id: 'pedagogical-initiatives',
      title: 'Pedagogical Initiatives',
      icon: <BookOpen className='w-5 h-5' />,
      subSections: [
        {
          id: 'academic-calendar',
          title: 'Academic Calendar',
          icon: <Calendar className='w-4 h-4' />
        },
        {
          id: 'activity-calendar',
          title: 'Activity Calendar',
          icon: <Clock className='w-4 h-4' />
        },
        {
          id: 'innovative-practices',
          title: 'Innovative Practices',
          icon: <Lightbulb className='w-4 h-4' />
        },
        {
          id: 'teaching-learning-process',
          title: 'Teaching Learning Process',
          icon: <GraduationCap className='w-4 h-4' />
        }
      ]
    },
    {
      id: 'facilities',
      title: 'Facilities',
      icon: <Building2 className='w-5 h-5' />,
      subSections: [
        {
          id: 'labs',
          title: 'Labs',
          icon: <Microscope className='w-4 h-4' />
        },
        {
          id: 'rd-labs',
          title: 'R&D Labs',
          icon: <FlaskConical className='w-4 h-4' />
        },
        {
          id: 'industry-supported-labs',
          title: 'Industry‑Supported Labs',
          icon: <Factory className='w-4 h-4' />
        },
        {
          id: 'foss-cell',
          title: 'FOSS Cell',
          icon: <Code className='w-4 h-4' />
        }
      ]
    },
    {
      id: 'student-corner',
      title: 'Student Corner',
      icon: <GraduationCap className='w-5 h-5' />,
      subSections: [
        {
          id: 'prototype-product-development',
          title: 'Prototype Product Development',
          icon: <Wrench className='w-4 h-4' />
        },
        {
          id: 'awards',
          title: 'Awards',
          icon: <Trophy className='w-4 h-4' />
        },
        {
          id: 'projects',
          title: 'Projects',
          icon: <FolderOpen className='w-4 h-4' />
        },
        {
          id: 'seminars-workshops',
          title: 'Seminars & Workshops',
          icon: <Presentation className='w-4 h-4' />
        },
        {
          id: 'alumni',
          title: 'Alumni',
          icon: <Users2 className='w-4 h-4' />
        }
      ]
    },
    {
      id: 'publications',
      title: 'Publications',
      icon: <FileText className='w-5 h-5' />,
      subSections: [
        {
          id: 'faculty-publications',
          title: 'Faculty Publications',
          icon: <BookOpenCheck className='w-4 h-4' />
        },
        {
          id: 'student-publications',
          title: 'Student Publications',
          icon: <NotebookPen className='w-4 h-4' />
        }
      ]
    },
    {
      id: 'patents',
      title: 'Patents',
      icon: <Shield className='w-5 h-5' />,
      hasContent: true
    },
    {
      id: 'magazine',
      title: 'Magazine',
      icon: <Camera className='w-5 h-5' />,
      hasContent: true
    },
    {
      id: 'newsletter',
      title: 'News‑Letter',
      icon: <Newspaper className='w-5 h-5' />,
      hasContent: true
    },
    {
      id: 'result',
      title: 'Result',
      icon: <BarChart className='w-5 h-5' />,
      hasContent: true
    },
    {
      id: 'placement',
      title: 'Placement',
      icon: <Briefcase className='w-5 h-5' />,
      hasContent: true
    }
  ];

  // Get current content based on active section and subsection
  const getCurrentContent = () => {
    const currentKey = activeSection === 'home' ? activeSubSection : activeSection;
    
    switch (currentKey) {
      case 'home':
      case 'overview':
        return (
          <div className='space-y-12'>
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-blue-200'
            >
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Home className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Welcome to CSE Department
                </h1>
                <p className='text-blue-600 font-medium'>
                  Building Tomorrow's Tech Leaders Today
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-8'>
                {[
                  { label: 'Students', value: '800+', icon: <Users className='w-5 h-5' /> },
                  { label: 'Faculty', value: '30+', icon: <UserCheck className='w-5 h-5' /> },
                  { label: 'Labs', value: '15+', icon: <Monitor className='w-5 h-5' /> },
                  { label: 'Placements', value: '95%', icon: <TrendingUp className='w-5 h-5' /> }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className='bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50'
                  >
                    <div className='text-blue-600 flex justify-center mb-2'>{stat.icon}</div>
                    <div className='text-2xl font-bold text-gray-900'>{stat.value}</div>
                    <div className='text-sm text-gray-600'>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Navigation Quick Links */}
            <AnimatedCard delay={0.1}>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Explore Our Department</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {[
                    { title: 'Vision & Mission', icon: <Eye className='w-6 h-6' />, section: 'about', subsection: 'vision-mission', color: 'blue' },
                    { title: 'POs/PEOs/PSOs', icon: <Target className='w-6 h-6' />, section: 'about', subsection: 'pos-peos-psos', color: 'purple' },
                    { title: 'Faculty Members', icon: <Users className='w-6 h-6' />, section: 'about', subsection: 'faculty', color: 'green' },
                    { title: 'Academic Calendar', icon: <Calendar className='w-6 h-6' />, section: 'academics', subsection: 'academic-calendar', color: 'orange' },
                    { title: 'Labs & Facilities', icon: <Monitor className='w-6 h-6' />, section: 'facilities', subsection: 'labs', color: 'indigo' },
                    { title: 'Student Corner', icon: <GraduationCap className='w-6 h-6' />, section: 'student-corner', subsection: 'awards', color: 'teal' }
                  ].map((link, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSectionClick(link.section, link.subsection)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 bg-${link.color}-50 hover:bg-${link.color}-100 border border-${link.color}-200 rounded-xl text-left transition-all duration-300 group`}
                    >
                      <div className={`text-${link.color}-600 mb-2`}>{link.icon}</div>
                      <h3 className={`font-semibold text-gray-900 group-hover:text-${link.color}-600 transition-colors`}>
                        {link.title}
                      </h3>
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'about':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div className='flex items-start gap-4 mb-6'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <Building className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-4'>About Department</h2>
                  <div className='prose prose-gray max-w-none space-y-4'>
                    <p className='text-gray-700 leading-relaxed'>
                      The Department of Computer Science & Engineering is <span className='font-semibold text-blue-600'>NBA Accredited</span>. 
                      The department has a full-fledged team of proficient faculty members to promote a highly engaging learning 
                      experience, ensuring quality education in the field of Technology.
                    </p>
                    <p className='text-gray-700 leading-relaxed'>
                      To cater to this need, the department is committed to inculcate technical, managerial and social skills 
                      within the students, providing the required industrial experience and investing in the overall personality 
                      development of a student. The department ensures that in addition to the course curriculum, the student 
                      is also capable to implement his or her learning on practical grounds.
                    </p>
                    <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 mt-4'>
                      <p className='text-gray-700 font-medium'>
                        <span className='text-green-600 font-semibold'>Partnership Excellence:</span> This is reflected with the 
                        department's association in being a Remote Learning Center with IIT Bombay, IIT Kharagpur & IIT Delhi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'hod':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200'>
                <div className='flex flex-col md:flex-row gap-6 items-start'>
                  <div className='flex-shrink-0'>
                    <div className='w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center'>
                      <User className='w-16 h-16 text-gray-400' />
                    </div>
                    <div className='text-center mt-3'>
                      <h4 className='font-bold text-gray-900'>Prof. Achal Kausik</h4>
                      <p className='text-sm text-blue-600 font-medium'>HOD, CSE</p>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4 flex items-center gap-2'>
                      <MessageSquare className='w-5 h-5 text-blue-600' />
                      Message from HOD Desk
                    </h3>
                    <div className='space-y-3 text-gray-700 leading-relaxed'>
                      <p>
                        Welcome to the Department of Computer Science & Engineering. The Department of Computer Science and 
                        Engineering (CSE), Bhagwan Parshuram Institute of Technology, has made fast strides in many spheres 
                        since the inception of BPIT in 2007. It is NBA accredited and is well-equipped with excellent academic 
                        and research facilities to produce quality Computer Science Engineers.
                      </p>
                      <p>
                        The emphasis is on students' holistic growth through innovative teaching methods, result-oriented 
                        knowledge through regular exposure to industry, seminars and popular lectures by experts. These 
                        methodological efforts help in widening the academic horizon of the students.
                      </p>
                      <p className='font-medium text-blue-600'>
                        The cherished dream of the Department is to equip and groom the students with clear concepts & shape 
                        the career of our young technocrats in today's fast-changing developments in Computer Technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'events':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                    <Calendar className='w-5 h-5 text-purple-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Recent Events</h3>
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                  {[
                    {
                      title: 'Virtual Labs Workshop',
                      description: 'Department of CSE In Association with IIT Delhi organizing workshop on "Virtual Labs"',
                      date: '21 Oct 2024',
                      venue: 'Seminar Hall 6A',
                      type: 'Workshop',
                      image: '/api/placeholder/300/200'
                    },
                    {
                      title: 'Machine Learning with Python',
                      description: 'IEEE BPIT presents Online Webinar on "Machine Learning with Python"',
                      type: 'Webinar',
                      status: 'Online',
                      image: '/api/placeholder/300/200'
                    },
                    {
                      title: 'Building Dall-E2',
                      description: 'IEEE BPIT presents Online Webinar on "Building Dall-E2"',
                      type: 'Webinar',
                      status: 'Online',
                      image: '/api/placeholder/300/200'
                    },
                    {
                      title: 'Careers Opportunities Abroad',
                      description: 'BPIT in collaboration with SIEC Education on "Careers opportunities Abroad/Test Prep"',
                      type: 'Seminar',
                      image: '/api/placeholder/300/200'
                    }
                  ].map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow'
                    >
                      <div className='h-40 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center'>
                        <Calendar className='w-12 h-12 text-purple-600' />
                      </div>
                      <div className='p-4'>
                        <div className='flex justify-between items-start mb-2'>
                          <span className='px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded'>
                            {event.type}
                          </span>
                          {event.status && (
                            <span className='px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded'>
                              {event.status}
                            </span>
                          )}
                        </div>
                        <h4 className='font-semibold text-gray-900 mb-2'>{event.title}</h4>
                        <p className='text-sm text-gray-600 mb-3'>{event.description}</p>
                        {event.date && (
                          <p className='text-xs text-gray-500'>
                            📅 {event.date} {event.venue && `• 📍 ${event.venue}`}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'news':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
                    <Newspaper className='w-5 h-5 text-red-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Latest News</h3>
                </div>
                <div className='space-y-4'>
                  {[
                    {
                      title: 'The Optimistics-BPIT won first Price at "webdash" online Hackathon-JMI',
                      type: 'Achievement',
                      highlight: true,
                      date: 'Nov 2024'
                    },
                    {
                      title: 'ATAL online FDP on "Innovative Applications and Ethical Consideration of Artificial Intelligence in Modern Research"',
                      type: 'FDP',
                      date: 'Oct 2024'
                    },
                    {
                      title: 'Mr. Pavneet Singh, CSE On receiving Gold Medal at 17th Convocation of GGSIPU',
                      type: 'Award',
                      highlight: true,
                      date: 'Oct 2024'
                    },
                    {
                      title: 'Delegates Visit at BPIT from Casio, Japan',
                      type: 'Visit',
                      date: 'Sep 2024'
                    },
                    {
                      title: 'Webinar on "DEVOPS"',
                      type: 'Webinar',
                      date: 'Sep 2024'
                    }
                  ].map((news, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`p-6 rounded-lg border-l-4 ${
                        news.highlight 
                          ? 'bg-yellow-50 border-yellow-500' 
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h4 className='font-semibold text-gray-900 mb-2'>{news.title}</h4>
                          <p className='text-sm text-gray-500'>{news.date}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-4 ${
                          news.highlight 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {news.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'highlights':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center'>
                    <TrendingUp className='w-5 h-5 text-orange-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Highlights of the Department</h3>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[
                    {
                      event: 'Codezen, GTB4CEC!',
                      institution: 'Bharatiya Vidyapeeth',
                      position: '3rd Place',
                      color: 'orange',
                      icon: <Trophy className='w-6 h-6' />
                    },
                    {
                      event: 'MAIT Hackathon Build',
                      institution: 'MAIT',
                      position: 'Winner',
                      color: 'yellow',
                      icon: <Trophy className='w-6 h-6' />
                    },
                    {
                      event: 'Hackverse Hackathon, 2025',
                      institution: 'IILM University',
                      position: '5th Place',
                      color: 'gray',
                      icon: <Trophy className='w-6 h-6' />
                    },
                    {
                      event: 'Technical Excellence Award',
                      institution: 'GGSIPU',
                      position: 'Gold Medal',
                      color: 'yellow',
                      icon: <Trophy className='w-6 h-6' />
                    },
                    {
                      event: 'Research Innovation',
                      institution: 'CSE Department',
                      position: 'Best Project',
                      color: 'blue',
                      icon: <Lightbulb className='w-6 h-6' />
                    },
                    {
                      event: 'Industry Partnership',
                      institution: 'Leading Tech Companies',
                      position: 'Collaboration',
                      color: 'green',
                      icon: <Briefcase className='w-6 h-6' />
                    }
                  ].map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className={`p-6 bg-${highlight.color}-50 border border-${highlight.color}-200 rounded-xl hover:shadow-lg transition-all duration-300`}
                    >
                      <div className={`text-${highlight.color}-600 mb-3`}>{highlight.icon}</div>
                      <h4 className='font-bold text-gray-900 mb-2'>{highlight.event}</h4>
                      <p className='text-sm text-gray-600 mb-2'>{highlight.institution}</p>
                      <span className={`px-3 py-1 text-xs font-semibold bg-${highlight.color}-100 text-${highlight.color}-700 rounded-full`}>
                        {highlight.position}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'placements':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center'>
                    <Trophy className='w-5 h-5 text-yellow-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900'>Top Placements (Glory)</h3>
                </div>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[
                    {
                      name: 'Shubham Jindal',
                      batch: 'CSE(2019-23)',
                      company: 'Zomato',
                      package: '50 LPA',
                      position: 'Senior Software Engineer',
                      image: '/api/placeholder/100/100'
                    },
                    {
                      name: 'Swarika Sharma',
                      batch: 'CSE(2021-25)',
                      company: 'Google',
                      package: '51 LPA',
                      position: 'Software Developer',
                      image: '/api/placeholder/100/100'
                    },
                    {
                      name: 'Yashika',
                      batch: 'CSE(2021-25)',
                      company: 'Microsoft',
                      package: '51 LPA',
                      position: 'Software Engineer',
                      image: '/api/placeholder/100/100'
                    },
                    {
                      name: 'Prajjwal Kapri',
                      batch: 'CSE(2021-25)',
                      company: 'Josh Technology',
                      package: '12 LPA',
                      position: 'Full Stack Developer',
                      image: '/api/placeholder/100/100'
                    },
                    {
                      name: 'Arjun Kumar',
                      batch: 'CSE(2020-24)',
                      company: 'Amazon',
                      package: '45 LPA',
                      position: 'SDE-II',
                      image: '/api/placeholder/100/100'
                    },
                    {
                      name: 'Priya Sharma',
                      batch: 'CSE(2020-24)',
                      company: 'Adobe',
                      package: '42 LPA',
                      position: 'Software Engineer',
                      image: '/api/placeholder/100/100'
                    }
                  ].map((placement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300'
                    >
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                          {placement.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className='font-bold text-gray-900'>{placement.name}</h4>
                          <p className='text-sm text-gray-600'>{placement.batch}</p>
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-sm text-gray-600'>Company:</span>
                          <span className='font-semibold text-blue-600'>{placement.company}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm text-gray-600'>Package:</span>
                          <span className='font-bold text-green-600'>₹{placement.package}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm text-gray-600'>Role:</span>
                          <span className='text-sm text-gray-900'>{placement.position}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'stars':
        return (
          <div className='space-y-8'>
            <AnimatedCard>
              <div className='text-center py-12'>
                <Zap className='w-16 h-16 text-gray-400 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>Shining Stars</h3>
                <p className='text-gray-600'>Content coming soon...</p>
              </div>
            </AnimatedCard>
          </div>
        );

      case 'vision-mission':
        return (
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200'
            >
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Eye className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Vision & Mission
                </h1>
                <p className='text-blue-600 font-medium'>
                  CSE Department - Building Tomorrow's Tech Leaders
                </p>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-1 gap-8'>
              <AnimatedCard delay={0.1}>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
                    <Eye className='w-6 h-6 text-blue-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>Our Vision</h3>
                  <p className='text-gray-700 leading-relaxed'>
                    To be a globally recognized department of Computer Science & Engineering that fosters innovation, 
                    excellence in education, and cutting-edge research to produce competent professionals who contribute 
                    to technological advancement and societal development.
                  </p>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
                    <Target className='w-6 h-6 text-green-600' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>Our Mission</h3>
                  <div className='text-gray-700 leading-relaxed space-y-3'>
                    <p>• To provide quality education in Computer Science & Engineering through innovative teaching-learning practices</p>
                    <p>• To promote research and development activities in emerging areas of technology</p>
                    <p>• To develop industry-ready professionals with strong ethical values and leadership qualities</p>
                    <p>• To foster entrepreneurship and innovation among students and faculty</p>
                    <p>• To establish strong industry-academia collaboration for mutual benefit</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        );

      case 'pos-peos-psos':
        return (
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200'
            >
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Target className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Program Outcomes & Objectives
                </h1>
                <p className='text-purple-600 font-medium'>
                  POs / PEOs / PSOs - Comprehensive Educational Framework
                </p>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-1 gap-8'>
              <AnimatedCard delay={0.1}>
                <div>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <Target className='w-5 h-5 text-blue-600' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900'>Program Educational Objectives (PEOs)</h3>
                  </div>
                  <div className='space-y-3 text-gray-700'>
                    <p><strong>PEO1:</strong> Graduates will have successful careers in computer science and engineering or related fields, demonstrating technical competence and professional growth.</p>
                    <p><strong>PEO2:</strong> Graduates will demonstrate leadership, teamwork, and communication skills in multidisciplinary environments.</p>
                    <p><strong>PEO3:</strong> Graduates will engage in lifelong learning to adapt to technological changes and pursue advanced studies or research.</p>
                    <p><strong>PEO4:</strong> Graduates will contribute to society with ethical responsibility and awareness of contemporary issues.</p>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.2}>
                <div>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center'>
                      <CheckCircle className='w-5 h-5 text-green-600' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900'>Program Outcomes (POs)</h3>
                  </div>
                  <div className='grid md:grid-cols-2 gap-4 text-sm text-gray-700'>
                    <div className='space-y-2'>
                      <p><strong>PO1:</strong> Engineering knowledge</p>
                      <p><strong>PO2:</strong> Problem analysis</p>
                      <p><strong>PO3:</strong> Design/development of solutions</p>
                      <p><strong>PO4:</strong> Conduct investigations</p>
                      <p><strong>PO5:</strong> Modern tool usage</p>
                      <p><strong>PO6:</strong> Engineer and society</p>
                    </div>
                    <div className='space-y-2'>
                      <p><strong>PO7:</strong> Environment and sustainability</p>
                      <p><strong>PO8:</strong> Ethics</p>
                      <p><strong>PO9:</strong> Individual and team work</p>
                      <p><strong>PO10:</strong> Communication</p>
                      <p><strong>PO11:</strong> Project management</p>
                      <p><strong>PO12:</strong> Life-long learning</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={0.3}>
                <div>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                      <Star className='w-5 h-5 text-purple-600' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900'>Program Specific Outcomes (PSOs)</h3>
                  </div>
                  <div className='space-y-3 text-gray-700'>
                    <p><strong>PSO1:</strong> Professional Skills: Ability to design, implement, and maintain software systems using appropriate programming languages, frameworks, and tools.</p>
                    <p><strong>PSO2:</strong> Problem Solving: Capability to analyze complex computing problems and develop algorithmic solutions with consideration of time and space complexity.</p>
                    <p><strong>PSO3:</strong> Emerging Technologies: Competency to adapt and apply emerging technologies in areas like AI/ML, IoT, Cybersecurity, and Data Science to solve real-world problems.</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        );

      case 'faculty':
        return (
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-200'
            >
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Users className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Faculty Members
                </h1>
                <p className='text-indigo-600 font-medium'>
                  Expert Educators & Researchers
                </p>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[
                {
                  name: "Dr. Priya Sharma",
                  designation: "Professor & HOD",
                  specialization: "Machine Learning, Computer Vision",
                  experience: "15+ years",
                  email: "priya.sharma@bpitindia.com",
                  education: "Ph.D. Computer Science, IIT Delhi"
                },
                {
                  name: "Dr. Rajesh Kumar",
                  designation: "Associate Professor",
                  specialization: "Cybersecurity, Network Security",
                  experience: "12+ years",
                  email: "rajesh.kumar@bpitindia.com",
                  education: "Ph.D. Information Security, IIT Bombay"
                },
                {
                  name: "Dr. Anita Verma",
                  designation: "Assistant Professor",
                  specialization: "Data Science, Big Data Analytics",
                  experience: "8+ years",
                  email: "anita.verma@bpitindia.com",
                  education: "Ph.D. Data Science, IIT Kanpur"
                },
                {
                  name: "Prof. Amit Singh",
                  designation: "Assistant Professor",
                  specialization: "Software Engineering, Web Technologies",
                  experience: "6+ years",
                  email: "amit.singh@bpitindia.com",
                  education: "M.Tech CSE, DTU"
                },
                {
                  name: "Dr. Neha Gupta",
                  designation: "Assistant Professor",
                  specialization: "Artificial Intelligence, NLP",
                  experience: "7+ years",
                  email: "neha.gupta@bpitindia.com",
                  education: "Ph.D. AI, IIIT Delhi"
                },
                {
                  name: "Prof. Vikash Yadav",
                  designation: "Assistant Professor",
                  specialization: "Database Systems, Cloud Computing",
                  experience: "5+ years",
                  email: "vikash.yadav@bpitindia.com",
                  education: "M.Tech IT, NSIT"
                }
              ].map((faculty, index) => (
                <AnimatedCard key={faculty.name} delay={0.1 + index * 0.1}>
                  <div className='text-center'>
                    <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <User className='w-10 h-10 text-gray-400' />
                    </div>
                    <h3 className='text-lg font-bold text-gray-900 mb-1'>{faculty.name}</h3>
                    <p className='text-blue-600 font-medium mb-2'>{faculty.designation}</p>
                    <p className='text-sm text-gray-600 mb-3'>{faculty.specialization}</p>
                    
                    <div className='space-y-2 text-xs text-gray-500 mb-4'>
                      <div className='flex items-center justify-center gap-1'>
                        <Clock className='w-3 h-3' />
                        <span>{faculty.experience}</span>
                      </div>
                      <div className='flex items-center justify-center gap-1'>
                        <Mail className='w-3 h-3' />
                        <span className='truncate'>{faculty.email}</span>
                      </div>
                      <p className='text-center'>{faculty.education}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        );

      case 'academic-calendar':
        return (
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200'
            >
              <div className='text-center mb-8'>
                <div className='w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Calendar className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  Academic Calendar
                </h1>
                <p className='text-green-600 font-medium'>
                  Important Academic Dates & Events
                </p>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-1 gap-8'>
              <AnimatedCard delay={0.1}>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 mb-6'>Academic Year 2024-25</h3>
                  <div className='space-y-4'>
                    {[
                      { event: "Semester 1 Registration", date: "July 15 - July 30, 2024", type: "registration" },
                      { event: "Classes Begin (Semester 1)", date: "August 1, 2024", type: "classes" },
                      { event: "Mid-Term Examinations", date: "September 15 - September 25, 2024", type: "exam" },
                      { event: "Semester 1 End Examinations", date: "November 20 - December 5, 2024", type: "exam" },
                      { event: "Winter Break", date: "December 10 - December 31, 2024", type: "break" },
                      { event: "Semester 2 Registration", date: "January 5 - January 15, 2025", type: "registration" },
                      { event: "Classes Begin (Semester 2)", date: "January 20, 2025", type: "classes" },
                      { event: "Mid-Term Examinations", date: "March 1 - March 10, 2025", type: "exam" },
                      { event: "Semester 2 End Examinations", date: "May 15 - May 30, 2025", type: "exam" },
                      { event: "Summer Break", date: "June 1 - July 15, 2025", type: "break" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          item.type === 'exam' ? 'bg-red-50 border-red-500' :
                          item.type === 'classes' ? 'bg-blue-50 border-blue-500' :
                          item.type === 'registration' ? 'bg-green-50 border-green-500' :
                          'bg-gray-50 border-gray-500'
                        }`}
                      >
                        <div className='flex justify-between items-center'>
                          <h4 className='font-semibold text-gray-900'>{item.event}</h4>
                          <span className='text-sm text-gray-600'>{item.date}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        );

      // Add default case for other sections
      default:
        return (
          <div className='space-y-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  <Settings className='w-8 h-8 text-white' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  {navigationSections.find(s => s.id === activeSection)?.title || 
                   navigationSections.find(s => s.subSections?.find(sub => sub.id === activeSubSection))?.subSections?.find(sub => sub.id === activeSubSection)?.title ||
                   'Section'}
                </h1>
                <p className='text-gray-600 font-medium'>
                  Content coming soon...
                </p>
              </div>
            </motion.div>
            
            <AnimatedCard>
              <div className='text-center py-12'>
                <div className='w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Zap className='w-12 h-12 text-blue-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>Content Under Development</h3>
                <p className='text-gray-600 max-w-md mx-auto'>
                  We're working hard to bring you comprehensive content for this section. 
                  Please check back soon for updates!
                </p>
              </div>
            </AnimatedCard>
          </div>
        );
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0'>
          <div className='absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
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
              className='w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm'
            >
              <Code className='w-10 h-10 text-white' />
            </motion.div>
            
            <h1 className='text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
              Computer Science & Engineering
            </h1>
            
            <p className='text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed'>
              Innovating Tomorrow's Technology Today
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex flex-wrap justify-center gap-4 text-sm'
            >
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
                <Star className='w-4 h-4 text-yellow-300' />
                <span>AI & Machine Learning</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
                <Star className='w-4 h-4 text-yellow-300' />
                <span>Data Science</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm'>
                <Star className='w-4 h-4 text-yellow-300' />
                <span>Cybersecurity</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Advanced Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='lg:w-80 flex-shrink-0'
          >
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden sticky top-8'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-4'>
                <h3 className='text-white font-bold text-lg'>Navigation</h3>
              </div>
              
              <div className='p-2 max-h-[80vh] overflow-y-auto'>
                {navigationSections.map((section, index) => (
                  <div key={section.id} className='mb-2'>
                    <motion.button
                      onClick={() => {
                        if (section.subSections) {
                          toggleSection(section.id);
                        } else {
                          handleSectionClick(section.id);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className='flex items-center gap-3 relative z-10'>
                        <div className={`p-2 rounded-lg transition-colors ${
                          activeSection === section.id 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        }`}>
                          {section.icon}
                        </div>
                        <span className='font-medium text-sm'>{section.title}</span>
                        {section.subSections && (
                          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${
                            expandedSections.includes(section.id) ? 'rotate-180' : ''
                          } ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`} />
                        )}
                        {!section.subSections && (
                          <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                            activeSection === section.id ? 'rotate-90 text-blue-600' : 'text-gray-400'
                          }`} />
                        )}
                      </div>
                    </motion.button>

                    {/* Sub-sections */}
                    <AnimatePresence>
                      {section.subSections && expandedSections.includes(section.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className='ml-4 mt-2 space-y-1 border-l-2 border-gray-200'
                        >
                          {section.subSections.map((subSection, subIndex) => (
                            <motion.button
                              key={subSection.id}
                              onClick={() => handleSectionClick(section.id, subSection.id)}
                              className={`w-full text-left p-2 pl-4 rounded-lg transition-all duration-200 group text-sm ${
                                activeSection === section.id && activeSubSection === subSection.id
                                  ? 'bg-blue-100 text-blue-700 border-l-2 border-blue-500'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-2 border-transparent'
                              }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                            >
                              <div className='flex items-center gap-2'>
                                <div className={`p-1 rounded transition-colors ${
                                  activeSection === section.id && activeSubSection === subSection.id
                                    ? 'bg-blue-200 text-blue-700'
                                    : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                                }`}>
                                  {subSection.icon}
                                </div>
                                <span className='font-medium'>{subSection.title}</span>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
            <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={`${activeSection}-${activeSubSection}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className='p-8'
                >
                  {getCurrentContent()}
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
