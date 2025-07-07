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
  const [activeSubSection, setActiveSubSection] = useState('overview');
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
    } else if (sectionId === 'home') {
      // When home is clicked directly, show the overview with all sections
      setActiveSubSection('overview');
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

  // Latest Events Carousel Component
  const LatestEventsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [itemsPerView, setItemsPerView] = useState(1);
    const [isClient, setIsClient] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const events = [
      { 
        title: 'AI Workshop Session', 
        participants: '80+ Students', 
        date: 'March 10, 2025',
        description: 'Hands-on machine learning workshop with practical implementations.',
        category: 'Workshop',
        image: '🤖'
      },
      { 
        title: 'Industry Visit to Google', 
        participants: '50+ Students', 
        date: 'March 8, 2025',
        description: 'Educational visit to Google India office exploring latest technologies.',
        category: 'Industry Visit',
        image: '🏢'
      },
      { 
        title: 'Project Exhibition 2025', 
        participants: '100+ Projects', 
        date: 'March 5, 2025',
        description: 'Annual showcase of innovative student projects and research.',
        category: 'Exhibition',
        image: '🔬'
      },
      { 
        title: 'Cybersecurity Seminar', 
        participants: '200+ Attendees', 
        date: 'March 3, 2025',
        description: 'Expert talk on latest cybersecurity threats and prevention.',
        category: 'Seminar',
        image: '🔒'
      },
      { 
        title: 'Advanced Computing Lab', 
        participants: 'Faculty & Students', 
        date: 'February 28, 2025',
        description: 'Inauguration of state-of-the-art computing laboratory.',
        category: 'Inauguration',
        image: '💻'
      },
      { 
        title: 'Coding Bootcamp', 
        participants: '60+ Participants', 
        date: 'February 25, 2025',
        description: 'Intensive 3-day coding bootcamp covering modern frameworks.',
        category: 'Bootcamp',
        image: '⚡'
      },
      { 
        title: 'Research Symposium', 
        participants: '40+ Researchers', 
        date: 'February 22, 2025',
        description: 'Research presentations on AI, ML, and emerging technologies.',
        category: 'Research',
        image: '📊'
      },
      { 
        title: 'Alumni Success Meet', 
        participants: '30+ Alumni', 
        date: 'February 20, 2025',
        description: 'Networking event with successful alumni sharing experiences.',
        category: 'Alumni Event',
        image: '🎓'
      }
    ];

    // Responsive items per view calculation
    const getItemsPerView = () => {
      if (typeof window === 'undefined') return 1;
      
      const width = window.innerWidth;
      if (width < 640) return 1; // mobile - xs
      if (width < 768) return 1; // mobile - sm
      if (width < 1024) return 2; // tablet - md
      return 3; // desktop and larger - never more than 3
    };

    // Client-side hydration
    React.useEffect(() => {
      setIsClient(true);
      setItemsPerView(getItemsPerView());
    }, []);

    const maxIndex = Math.max(0, events.length - itemsPerView);

    // Handle screen resize with debouncing
    React.useEffect(() => {
      if (!isClient) return;

      let timeoutId: NodeJS.Timeout;
      
      const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const newItemsPerView = getItemsPerView();
          if (newItemsPerView !== itemsPerView) {
            setItemsPerView(newItemsPerView);
            setCurrentIndex(0); // Reset to first slide on resize
          }
        }, 150);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timeoutId);
      };
    }, [isClient, itemsPerView]);

    // Auto-play functionality
    React.useEffect(() => {
      if (!isAutoPlaying || maxIndex <= 0) return;
      
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);

      return () => clearInterval(interval);
    }, [isAutoPlaying, maxIndex]);

    const nextSlide = () => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
      setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index: number) => {
      setCurrentIndex(index);
    };

    // Touch/Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe && currentIndex < maxIndex) {
        nextSlide();
      }
      if (isRightSwipe && currentIndex > 0) {
        prevSlide();
      }
    };

    // Don't render on server to avoid hydration mismatch
    if (!isClient) {
      return (
        <div className='h-96 bg-gray-100 rounded-2xl flex items-center justify-center'>
          <div className='animate-pulse text-gray-400'>Loading carousel...</div>
        </div>
      );
    }

    return (
      <div 
        className='relative'
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Container */}
        <div className='overflow-hidden rounded-2xl'>
          <motion.div
            className='flex transition-transform duration-500 ease-in-out'
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {events.map((event, index) => (
              <motion.div
                key={index}
                className={`flex-shrink-0 px-2 sm:px-2.5 ${
                  itemsPerView === 1 ? 'w-full' : 
                  itemsPerView === 2 ? 'w-1/2' : 
                  itemsPerView === 3 ? 'w-1/3' : 'w-1/4'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className='bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer h-full'
                >
                  {/* Event Image with Gradient */}
                  <div className='h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100 flex items-center justify-center relative overflow-hidden'>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                    <div className='relative z-10 text-center'>
                      <div className='text-2xl sm:text-3xl lg:text-4xl mb-2'>{event.image}</div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.category === 'Workshop' ? 'bg-purple-100 text-purple-700' :
                        event.category === 'Industry Visit' ? 'bg-blue-100 text-blue-700' :
                        event.category === 'Exhibition' ? 'bg-green-100 text-green-700' :
                        event.category === 'Seminar' ? 'bg-orange-100 text-orange-700' :
                        event.category === 'Inauguration' ? 'bg-indigo-100 text-indigo-700' :
                        event.category === 'Bootcamp' ? 'bg-red-100 text-red-700' :
                        event.category === 'Research' ? 'bg-pink-100 text-pink-700' :
                        'bg-teal-100 text-teal-700'
                      }`}>
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Event Content */}
                  <div className='p-4 sm:p-6'>
                    <h3 className='font-bold text-gray-900 mb-2 text-sm sm:text-base lg:text-lg line-clamp-2'>{event.title}</h3>
                    <p className='text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2'>{event.description}</p>
                    
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2 text-xs sm:text-sm text-gray-600'>
                        <Users className='w-3 h-3 sm:w-4 sm:h-4 text-teal-600' />
                        <span>{event.participants}</span>
                      </div>
                      <div className='flex items-center gap-2 text-xs sm:text-sm text-teal-600 font-medium'>
                        <Calendar className='w-3 h-3 sm:w-4 sm:h-4' />
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='mt-4 text-teal-600 font-medium text-xs sm:text-sm flex items-center gap-1 hover:text-teal-700 transition-colors'
                    >
                      View Details <ArrowUpRight className='w-3 h-3 sm:w-4 sm:h-4' />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-300 transition-all duration-300 z-10'
            >
              <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rotate-180' />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-teal-600 hover:border-teal-300 transition-all duration-300 z-10'
            >
              <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5' />
            </motion.button>
          </>
        )}

        {/* Pagination Dots */}
        {maxIndex > 0 && (
          <div className='flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8'>
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-teal-600 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* Auto-play indicator */}
        <div className='flex items-center justify-center gap-2 mt-3 sm:mt-4'>
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAutoPlaying ? 'bg-teal-600' : 'bg-gray-400'}`}></div>
          <span className='text-xs text-gray-500'>
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </span>
        </div>

        {/* Mobile swipe indicators */}
        <div className='sm:hidden flex justify-center gap-1 mt-4'>
          <div className='text-xs text-gray-500 flex items-center gap-1'>
            <span>←</span>
            <span>Swipe to navigate</span>
            <span>→</span>
          </div>
        </div>
      </div>
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
          id: 'overview',
          title: 'Department Overview',
          icon: <Building className='w-4 h-4' />
        },
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
          <div className='space-y-16'>
            {/* About the Department */}
            <section id="about-department">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-200 relative overflow-hidden'
              >
                <div className='absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl'></div>
                <div className='relative z-10'>
                  <div className='text-center mb-12'>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className='w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'
                    >
                      <Building className='w-10 h-10 text-white' />
                    </motion.div>
                    <h2 className='text-4xl font-bold text-gray-900 mb-4'>About the Department</h2>
                    <p className='text-xl text-blue-600 font-medium'>Excellence in Computer Science & Engineering Education</p>
                  </div>

                  <div className='grid md:grid-cols-2 gap-8 items-center'>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className='space-y-6'
                    >
                      <p className='text-lg text-gray-700 leading-relaxed'>
                        The Computer Science & Engineering Department at BPIT stands as a beacon of technological excellence, 
                        fostering innovation and nurturing the next generation of tech leaders. Established with a vision to 
                        bridge the gap between academic learning and industry requirements.
                      </p>
                      <p className='text-gray-600 leading-relaxed'>
                        Our department offers comprehensive programs that blend theoretical knowledge with practical application, 
                        ensuring our graduates are well-equipped to tackle real-world challenges in the rapidly evolving 
                        technology landscape.
                      </p>
                      
                      {/* Key Features */}
                      <div className='space-y-3'>
                        {[
                          { icon: <Star className='w-5 h-5' />, text: 'Industry-aligned curriculum' },
                          { icon: <Trophy className='w-5 h-5' />, text: 'Award-winning faculty' },
                          { icon: <Rocket className='w-5 h-5' />, text: 'State-of-the-art labs' },
                          { icon: <Users className='w-5 h-5' />, text: 'Strong industry partnerships' }
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className='flex items-center gap-3 text-gray-700'
                          >
                            <div className='text-blue-600'>{feature.icon}</div>
                            <span className='font-medium'>{feature.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Statistics Cards */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className='grid grid-cols-2 gap-4'
                    >
                      {[
                        { label: 'Students Enrolled', value: '800+', icon: <Users className='w-6 h-6' />, color: 'blue' },
                        { label: 'Expert Faculty', value: '30+', icon: <UserCheck className='w-6 h-6' />, color: 'green' },
                        { label: 'Research Labs', value: '15+', icon: <Beaker className='w-6 h-6' />, color: 'purple' },
                        { label: 'Placement Rate', value: '95%', icon: <TrendingUp className='w-6 h-6' />, color: 'orange' }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`bg-white rounded-2xl p-6 text-center shadow-lg border border-${stat.color}-100 hover:shadow-xl transition-all duration-300`}
                        >
                          <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                            <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                          </div>
                          <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                          <div className='text-sm text-gray-600 font-medium'>{stat.label}</div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Message from HoD's Desk */}
            <section id="hod-message">
              <AnimatedCard delay={0.2}>
                <div className='text-center mb-12'>
                  <div className='w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <MessageSquare className='w-8 h-8 text-white' />
                  </div>
                  <h2 className='text-4xl font-bold text-gray-900 mb-4'>Message from HoD's Desk</h2>
                  <p className='text-xl text-green-600 font-medium'>Leadership & Vision</p>
                </div>

                <div className='grid md:grid-cols-3 gap-8 items-center'>
                  {/* HoD Photo Placeholder */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className='text-center'
                  >
                    <div className='w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                      <User className='w-20 h-20 text-blue-600' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 mb-2'>Dr. Priya Sharma</h3>
                    <p className='text-blue-600 font-medium mb-2'>Head of Department</p>
                    <p className='text-sm text-gray-600'>Ph.D. Computer Science, IIT Delhi</p>
                    <p className='text-sm text-gray-600'>15+ Years Experience</p>
                  </motion.div>

                  {/* Message Content */}
                  <div className='md:col-span-2 space-y-6'>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200'
                    >
                      <div className='text-4xl text-blue-600 mb-4'>"</div>
                      <p className='text-lg text-gray-700 leading-relaxed italic mb-4'>
                        Welcome to the Computer Science & Engineering Department at BPIT. Our commitment to excellence 
                        in education, research, and innovation drives us to prepare students who will shape the future 
                        of technology.
                      </p>
                      <p className='text-gray-600 leading-relaxed mb-4'>
                        We believe in fostering creativity, critical thinking, and ethical responsibility in our students. 
                        Our state-of-the-art facilities, dedicated faculty, and industry partnerships provide an 
                        environment where students can thrive and reach their full potential.
                      </p>
                      <p className='text-gray-600 leading-relaxed'>
                        Join us on this exciting journey of discovery and innovation as we continue to push the 
                        boundaries of what's possible in computer science and engineering.
                      </p>
                      <div className='text-4xl text-blue-600 text-right'>"</div>
                    </motion.div>

                    {/* HoD Achievements */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className='grid grid-cols-2 gap-4'
                    >
                      {[
                        { label: 'Research Papers', value: '50+', icon: <FileText className='w-5 h-5' /> },
                        { label: 'Awards Received', value: '12+', icon: <Award className='w-5 h-5' /> }
                      ].map((achievement, index) => (
                        <div key={index} className='bg-white rounded-xl p-4 border border-gray-200 text-center'>
                          <div className='text-blue-600 flex justify-center mb-2'>{achievement.icon}</div>
                          <div className='text-xl font-bold text-gray-900'>{achievement.value}</div>
                          <div className='text-sm text-gray-600'>{achievement.label}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </AnimatedCard>
            </section>

            {/* Events & News Section - Advanced UI/UX */}
            <section id="events-news">
              <AnimatedCard delay={0.3}>
                <div className='text-center mb-16'>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className='w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl'
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Megaphone className='w-10 h-10 text-white' />
                    </motion.div>
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='text-5xl font-bold text-gray-900 mb-6'
                  >
                    Events & News Hub
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className='text-xl text-orange-600 font-medium max-w-2xl mx-auto'
                  >
                    Discover the latest happenings and exciting events shaping our department's future
                  </motion.p>
                </div>

                {/* Two Main Cards: Events and News */}
                <div className='grid lg:grid-cols-2 gap-12'>
                  
                  {/* Events Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className='group perspective-1000'
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: 2,
                        rotateY: 5,
                        z: 50
                      }}
                      transition={{ duration: 0.3 }}
                      className='relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-8 shadow-2xl border border-blue-200 overflow-hidden transform-gpu h-[600px] flex flex-col'
                    >
                      {/* Animated Background Elements */}
                      <div className='absolute inset-0 overflow-hidden'>
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ 
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl'
                        />
                        <motion.div
                          animate={{ 
                            rotate: [360, 0],
                            scale: [1.2, 1, 1.2]
                          }}
                          transition={{ 
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className='absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-xl'
                        />
                      </div>
                      
                      {/* Header */}
                      <div className='relative z-10 mb-8'>
                        <div className='flex items-center gap-4 mb-6'>
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className='w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'
                          >
                            <Calendar className='w-8 h-8 text-white' />
                          </motion.div>
                          <div>
                            <motion.h3 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className='text-3xl font-bold text-gray-900'
                            >
                              Upcoming Events
                            </motion.h3>
                            <motion.p 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                              className='text-blue-600 font-medium'
                            >
                              Don't miss out on exciting opportunities
                            </motion.p>
                          </div>
                        </div>
                      </div>

                      {/* Auto-Scrolling Events Container */}
                      <div className='relative z-10 flex-1 overflow-hidden'>
                        <div className='h-96 relative'>
                          <motion.div
                            animate={{ 
                              y: [400, -1200] 
                            }}
                            transition={{ 
                              duration: 18,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 0
                            }}
                            className='absolute inset-x-0 space-y-4'
                          >
                            {[
                              {
                                title: 'AI/ML Workshop Series',
                                date: 'March 15-17, 2025',
                                type: 'Workshop',
                                description: 'Comprehensive hands-on workshop on Machine Learning fundamentals.',
                                emoji: '🤖',
                                attendees: '80+ Students',
                                color: 'from-purple-500 to-blue-500'
                              },
                              {
                                title: 'Tech Symposium 2025',
                                date: 'April 22, 2025',
                                type: 'Conference',
                                description: 'Annual technical symposium featuring industry experts.',
                                emoji: '🎤',
                                attendees: '200+ Participants',
                                color: 'from-blue-500 to-cyan-500'
                              },
                              {
                                title: 'Hackathon 2025',
                                date: 'May 10-12, 2025',
                                type: 'Competition',
                                description: '48-hour hackathon focused on sustainable solutions.',
                                emoji: '💻',
                                attendees: '100+ Teams',
                                color: 'from-green-500 to-teal-500'
                              },
                              {
                                title: 'Industry Visit to Google',
                                date: 'June 5, 2025',
                                type: 'Visit',
                                description: 'Educational visit to explore cutting-edge technologies.',
                                emoji: '🏢',
                                attendees: '50+ Students',
                                color: 'from-orange-500 to-red-500'
                              },
                              {
                                title: 'Project Exhibition 2025',
                                date: 'July 20, 2025',
                                type: 'Exhibition',
                                description: 'Showcase of innovative student projects and research.',
                                emoji: '🔬',
                                attendees: '100+ Projects',
                                color: 'from-pink-500 to-purple-500'
                              },
                              {
                                title: 'Coding Bootcamp',
                                date: 'August 15, 2025',
                                type: 'Bootcamp',
                                description: 'Intensive coding bootcamp covering modern frameworks.',
                                emoji: '⚡',
                                attendees: '60+ Participants',
                                color: 'from-indigo-500 to-blue-500'
                              }
                            ].map((event, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ 
                                  scale: 1.02,
                                  x: 10,
                                  transition: { duration: 0.2 }
                                }}
                                className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer group/event'
                              >
                                <div className='flex items-start gap-4'>
                                  <motion.div
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    className={`w-14 h-14 bg-gradient-to-r ${event.color} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                                  >
                                    {event.emoji}
                                  </motion.div>
                                  <div className='flex-1 min-w-0'>
                                    <div className='flex items-center gap-2 mb-2 flex-wrap'>
                                      <h4 className='text-lg font-bold text-gray-900 group-hover/event:text-blue-600 transition-colors truncate'>
                                        {event.title}
                                      </h4>
                                      <span className='px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full whitespace-nowrap'>
                                        {event.type}
                                      </span>
                                    </div>
                                    <p className='text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2'>
                                      {event.description}
                                    </p>
                                    <div className='flex items-center justify-between text-sm text-gray-500'>
                                      <div className='flex items-center gap-1'>
                                        <Clock className='w-4 h-4' />
                                        <span className='truncate'>{event.date}</span>
                                      </div>
                                      <div className='flex items-center gap-1'>
                                        <Users className='w-4 h-4' />
                                        <span className='whitespace-nowrap'>{event.attendees}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                          
                          {/* Gradient Fade Effects */}
                          <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-50 via-purple-50/80 to-transparent pointer-events-none z-10'></div>
                          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 via-purple-50/80 to-transparent pointer-events-none z-10'></div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* News Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 100, rotateY: 15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, ease: "backOut", delay: 0.2 }}
                    className='group perspective-1000'
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        rotateX: -2,
                        rotateY: -5,
                        z: 50
                      }}
                      transition={{ duration: 0.3 }}
                      className='relative bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-3xl p-8 shadow-2xl border border-orange-200 overflow-hidden transform-gpu h-[600px] flex flex-col'
                    >
                      {/* Animated Background Elements */}
                      <div className='absolute inset-0 overflow-hidden'>
                        <motion.div
                          animate={{ 
                            rotate: [0, -360],
                            scale: [1, 1.3, 1]
                          }}
                          transition={{ 
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className='absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl'
                        />
                        <motion.div
                          animate={{ 
                            rotate: [360, 0],
                            scale: [1.1, 1, 1.1]
                          }}
                          transition={{ 
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className='absolute -bottom-20 -right-20 w-36 h-36 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl'
                        />
                      </div>

                      {/* Header */}
                      <div className='relative z-10 mb-8'>
                        <div className='flex items-center gap-4 mb-6'>
                          <motion.div
                            whileHover={{ rotate: -360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className='w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg'
                          >
                            <Newspaper className='w-8 h-8 text-white' />
                          </motion.div>
                          <div>
                            <motion.h3 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 }}
                              className='text-3xl font-bold text-gray-900'
                            >
                              Latest News
                            </motion.h3>
                            <motion.p 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                              className='text-orange-600 font-medium'
                            >
                              Stay informed with recent achievements
                            </motion.p>
                          </div>
                        </div>
                      </div>

                      {/* Auto-Scrolling News Container */}
                      <div className='relative z-10 flex-1 overflow-hidden'>
                        <div className='h-96 relative'>
                          <motion.div
                            animate={{ 
                              y: [400, -1200] 
                            }}
                            transition={{ 
                              duration: 18,
                              repeat: Infinity,
                              ease: "linear",
                              delay: 0
                            }}
                            className='absolute inset-x-0 space-y-4'
                          >
                            {[
                              {
                                title: 'Research Excellence Award',
                                date: 'March 1, 2025',
                                type: 'Achievement',
                                description: 'Faculty receives prestigious national research recognition.',
                                emoji: '🏆',
                                impact: 'High Impact',
                                color: 'from-yellow-500 to-orange-500'
                              },
                              {
                                title: 'Industry Partnership Expansion',
                                date: 'February 25, 2025',
                                type: 'Partnership',
                                description: 'New collaborations with leading tech companies announced.',
                                emoji: '🤝',
                                impact: 'Strategic',
                                color: 'from-green-500 to-blue-500'
                              },
                              {
                                title: 'Student Innovation Success',
                                date: 'February 20, 2025',
                                type: 'Student News',
                                description: 'CSE students win national innovation competition.',
                                emoji: '🚀',
                                impact: 'Inspiring',
                                color: 'from-purple-500 to-pink-500'
                              },
                              {
                                title: 'New Lab Inauguration',
                                date: 'February 15, 2025',
                                type: 'Facility',
                                description: 'State-of-the-art AI research lab officially opened.',
                                emoji: '🔬',
                                impact: 'Infrastructure',
                                color: 'from-blue-500 to-indigo-500'
                              },
                              {
                                title: 'Faculty Publication Success',
                                date: 'February 10, 2025',
                                type: 'Research',
                                description: 'Multiple papers accepted in top-tier conferences.',
                                emoji: '📚',
                                impact: 'Academic',
                                color: 'from-teal-500 to-green-500'
                              },
                              {
                                title: 'Alumni Achievement',
                                date: 'February 5, 2025',
                                type: 'Alumni',
                                description: 'Former student becomes tech unicorn founder.',
                                emoji: '🎓',
                                impact: 'Pride',
                                color: 'from-red-500 to-pink-500'
                              }
                            ].map((news, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                whileHover={{ 
                                  scale: 1.02,
                                  x: -10,
                                  transition: { duration: 0.2 }
                                }}
                                className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 cursor-pointer group/news'
                              >
                                <div className='flex items-start gap-4'>
                                  <motion.div
                                    whileHover={{ scale: 1.2, rotate: -10 }}
                                    className={`w-14 h-14 bg-gradient-to-r ${news.color} rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                                  >
                                    {news.emoji}
                                  </motion.div>
                                  <div className='flex-1 min-w-0'>
                                    <div className='flex items-center gap-2 mb-2 flex-wrap'>
                                      <h4 className='text-lg font-bold text-gray-900 group-hover/news:text-orange-600 transition-colors truncate'>
                                        {news.title}
                                      </h4>
                                      <span className='px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full whitespace-nowrap'>
                                        {news.type}
                                      </span>
                                    </div>
                                    <p className='text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2'>
                                      {news.description}
                                    </p>
                                    <div className='flex items-center justify-between text-sm text-gray-500'>
                                      <div className='flex items-center gap-1'>
                                        <Calendar className='w-4 h-4' />
                                        <span className='truncate'>{news.date}</span>
                                      </div>
                                      <div className='flex items-center gap-1'>
                                        <Star className='w-4 h-4' />
                                        <span className='whitespace-nowrap'>{news.impact}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </motion.div>
                          
                          {/* Gradient Fade Effects */}
                          <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-orange-50 via-red-50/80 to-transparent pointer-events-none z-10'></div>
                          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 via-red-50/80 to-transparent pointer-events-none z-10'></div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom Stats Bar with Advanced Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className='mt-16 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-white overflow-hidden relative'
                >
                  {/* Animated Background Pattern */}
                  <div className='absolute inset-0 overflow-hidden'>
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -100, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className='absolute w-1 h-8 bg-white/10 rounded-full'
                        style={{
                          left: `${(i * 5) % 100}%`,
                          top: '100%',
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className='relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8'>
                    {[
                      { label: 'Total Events', value: '50+', icon: Calendar },
                      { label: 'News Articles', value: '200+', icon: Newspaper },
                      { label: 'Participants', value: '5000+', icon: Users },
                      { label: 'Success Stories', value: '100+', icon: Trophy }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className='text-center'
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className='w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3'
                        >
                          <stat.icon className='w-6 h-6 text-white' />
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.8 + index * 0.1, type: "spring" }}
                          className='text-2xl font-bold mb-1'
                        >
                          {stat.value}
                        </motion.div>
                        <div className='text-white/80 text-sm font-medium'>{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedCard>
            </section>

            {/* Latest Event Updates Carousel */}
            <section id="latest-events">
              <AnimatedCard delay={0.4}>
                <div className='text-center mb-12'>
                  <div className='w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Camera className='w-8 h-8 text-white' />
                  </div>
                  <h2 className='text-4xl font-bold text-gray-900 mb-4'>Latest Event Updates</h2>
                  <p className='text-xl text-teal-600 font-medium'>Visual Highlights from Recent Activities</p>
                </div>

                {/* Carousel Container with constrained width */}
                <div className='max-w-5xl mx-auto px-4'>
                  <LatestEventsCarousel />
                </div>
              </AnimatedCard>
            </section>

            {/* Department Highlights */}
            <section id="highlights">
              <AnimatedCard delay={0.5}>
                <div className='text-center mb-12'>
                  <div className='w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Star className='w-8 h-8 text-white' />
                  </div>
                  <h2 className='text-4xl font-bold text-gray-900 mb-4'>Department Highlights</h2>
                  <p className='text-xl text-purple-600 font-medium'>Excellence in Every Aspect</p>
                </div>

                <div className='grid md:grid-cols-2 gap-8'>
                  {[
                    {
                      category: 'Academic Excellence',
                      highlights: [
                        { title: 'NAAC A+ Accreditation', description: 'Highest academic standards maintained' },
                        { title: 'NBA Accredited Programs', description: 'Industry-relevant curriculum design' },
                        { title: '95% Placement Rate', description: 'Excellent career opportunities' },
                        { title: 'Top University Rankings', description: 'Consistently ranked among best' }
                      ],
                      color: 'blue'
                    },
                    {
                      category: 'Research & Innovation',
                      highlights: [
                        { title: '50+ Research Publications', description: 'Contributing to global knowledge' },
                        { title: '15+ Ongoing Projects', description: 'Cutting-edge research initiatives' },
                        { title: '₹2 Cr+ Research Funding', description: 'Strong financial support' },
                        { title: '25+ Industry Collaborations', description: 'Real-world problem solving' }
                      ],
                      color: 'green'
                    }
                  ].map((section, sectionIndex) => (
                    <motion.div
                      key={sectionIndex}
                      initial={{ opacity: 0, x: sectionIndex === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className={`bg-gradient-to-br from-${section.color}-50 to-${section.color}-100 rounded-2xl p-6 border border-${section.color}-200`}
                    >
                      <h3 className={`text-2xl font-bold text-${section.color}-800 mb-6`}>{section.category}</h3>
                      <div className='space-y-4'>
                        {section.highlights.map((highlight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className='bg-white rounded-xl p-4 border border-white/50 hover:shadow-lg transition-all duration-300'
                          >
                            <h4 className='font-bold text-gray-900 mb-2'>{highlight.title}</h4>
                            <p className='text-gray-600 text-sm'>{highlight.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>
            </section>

            {/* Glory of the Department */}
            <section id="glory">
              <AnimatedCard delay={0.6}>
                <div className='text-center mb-12'>
                  <div className='w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Trophy className='w-8 h-8 text-white' />
                  </div>
                  <h2 className='text-4xl font-bold text-gray-900 mb-4'>Glory of the Department</h2>
                  <p className='text-xl text-yellow-600 font-medium'>Celebrating Our Achievements</p>
                </div>

                <div className='grid md:grid-cols-3 gap-8'>
                  {[
                    {
                      title: 'Awards & Recognition',
                      items: [
                        'Best Engineering Department 2024',
                        'Excellence in Teaching Award',
                        'Innovation in Education Prize',
                        'Industry Partnership Recognition'
                      ],
                      icon: <Award className='w-8 h-8' />,
                      color: 'yellow'
                    },
                    {
                      title: 'Notable Achievements',
                      items: [
                        '1st Prize - National Coding Contest',
                        'Patent Filed - AI Innovation',
                        'Research Excellence Award',
                        'Best Project Award - TechFest'
                      ],
                      icon: <Star className='w-8 h-8' />,
                      color: 'orange'
                    },
                    {
                      title: 'Legacy & Impact',
                      items: [
                        '2000+ Successful Alumni',
                        '500+ Industry Placements',
                        '100+ Startup Founders',
                        '50+ Research Scholars'
                      ],
                      icon: <TrendingUp className='w-8 h-8' />,
                      color: 'red'
                    }
                  ].map((glory, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className={`bg-gradient-to-br from-${glory.color}-50 to-${glory.color}-100 rounded-2xl p-6 border border-${glory.color}-200 hover:shadow-xl transition-all duration-300`}
                    >
                      <div className={`w-16 h-16 bg-${glory.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <div className={`text-${glory.color}-600`}>{glory.icon}</div>
                      </div>
                      <h3 className={`text-xl font-bold text-${glory.color}-800 mb-6 text-center`}>{glory.title}</h3>
                      <div className='space-y-3'>
                        {glory.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + itemIndex * 0.1 }}
                            className='flex items-center gap-3 p-3 bg-white rounded-lg border border-white/50'
                          >
                            <CheckCircle className={`w-5 h-5 text-${glory.color}-600 flex-shrink-0`} />
                            <span className='text-gray-700 font-medium text-sm'>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>
            </section>

            {/* Our Shining Stars */}
            <section id="shining-stars">
              <AnimatedCard delay={0.7}>
                <div className='text-center mb-12'>
                  <div className='w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                    <Users2 className='w-8 h-8 text-white' />
                  </div>
                  <h2 className='text-4xl font-bold text-gray-900 mb-4'>Our Shining Stars</h2>
                  <p className='text-xl text-indigo-600 font-medium'>Success Stories That Inspire</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {[
                    {
                      name: 'Arjun Sharma',
                      achievement: 'Software Engineer at Google',
                      batch: '2023 Graduate',
                      description: 'Secured dream job with 50 LPA package',
                      category: 'placement'
                    },
                    {
                      name: 'Priya Patel',
                      achievement: 'AI Research Intern at Microsoft',
                      batch: '2024 Graduate',
                      description: 'Working on cutting-edge ML projects',
                      category: 'research'
                    },
                    {
                      name: 'Rohit Kumar',
                      achievement: 'Startup Founder - TechVenture',
                      batch: '2022 Graduate',
                      description: 'Founded successful EdTech startup',
                      category: 'entrepreneur'
                    },
                    {
                      name: 'Sneha Gupta',
                      achievement: 'Ph.D. Scholar at IIT Delhi',
                      batch: '2023 Graduate',
                      description: 'Pursuing advanced research in AI',
                      category: 'academic'
                    },
                    {
                      name: 'Vikash Singh',
                      achievement: 'Cybersecurity Expert at ISRO',
                      batch: '2022 Graduate',
                      description: 'Protecting national digital assets',
                      category: 'government'
                    },
                    {
                      name: 'Ananya Verma',
                      achievement: 'Data Scientist at Amazon',
                      batch: '2024 Graduate',
                      description: 'Building next-gen recommendation systems',
                      category: 'placement'
                    },
                    {
                      name: 'Rahul Jain',
                      achievement: 'Mobile App Developer',
                      batch: '2023 Graduate',
                      description: 'Apps with 1M+ downloads',
                      category: 'entrepreneur'
                    },
                    {
                      name: 'Kavya Reddy',
                      achievement: 'ML Engineer at Tesla',
                      batch: '2022 Graduate',
                      description: 'Working on autonomous vehicle AI',
                      category: 'placement'
                    }
                  ].map((star, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className='bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center'
                    >
                      {/* Star Photo Placeholder */}
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                        star.category === 'placement' ? 'bg-blue-100' :
                        star.category === 'research' ? 'bg-green-100' :
                        star.category === 'entrepreneur' ? 'bg-purple-100' :
                        star.category === 'academic' ? 'bg-orange-100' :
                        'bg-indigo-100'
                      }`}>
                        <User className={`w-10 h-10 ${
                          star.category === 'placement' ? 'text-blue-600' :
                          star.category === 'research' ? 'text-green-600' :
                          star.category === 'entrepreneur' ? 'text-purple-600' :
                          star.category === 'academic' ? 'text-orange-600' :
                          'text-indigo-600'
                        }`} />
                      </div>

                      <h3 className='text-lg font-bold text-gray-900 mb-2'>{star.name}</h3>
                      <p className={`font-medium mb-2 ${
                        star.category === 'placement' ? 'text-blue-600' :
                        star.category === 'research' ? 'text-green-600' :
                        star.category === 'entrepreneur' ? 'text-purple-600' :
                        star.category === 'academic' ? 'text-orange-600' :
                        'text-indigo-600'
                      }`}>
                        {star.achievement}
                      </p>
                      <p className='text-sm text-gray-500 mb-3'>{star.batch}</p>
                      <p className='text-sm text-gray-600 leading-relaxed'>{star.description}</p>
                      
                      <div className={`mt-4 px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        star.category === 'placement' ? 'bg-blue-100 text-blue-700' :
                        star.category === 'research' ? 'bg-green-100 text-green-700' :
                        star.category === 'entrepreneur' ? 'bg-purple-100 text-purple-700' :
                        star.category === 'academic' ? 'bg-orange-100 text-orange-700' :
                        'bg-indigo-100 text-indigo-700'
                      }`}>
                        {star.category.charAt(0).toUpperCase() + star.category.slice(1)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatedCard>
            </section>

            {/* Quick Navigation to Sub-sections */}
            <AnimatedCard delay={0.8}>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>Explore More About CSE Department</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <motion.button
                    onClick={() => handleSectionClick('home', 'vision-mission')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='p-6 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-left transition-all duration-300 group'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform'>
                        <Eye className='w-6 h-6 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                          Vision & Mission
                        </h3>
                        <p className='text-sm text-gray-600'>Our guiding principles and future aspirations</p>
                      </div>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleSectionClick('home', 'pos-peos-psos')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='p-6 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl text-left transition-all duration-300 group'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform'>
                        <Target className='w-6 h-6 text-purple-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-gray-900 group-hover:text-purple-600 transition-colors'>
                          POs / PEOs / PSOs
                        </h3>
                        <p className='text-sm text-gray-600'>Program outcomes and educational objectives</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
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
                        if (section.subSections && section.id === 'home') {
                          // For home section, first show the overview, then toggle subsections
                          handleSectionClick(section.id, 'overview');
                          if (!expandedSections.includes(section.id)) {
                            toggleSection(section.id);
                          }
                        } else if (section.subSections) {
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
