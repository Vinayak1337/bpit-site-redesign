'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  BookOpen, 
  Lightbulb,
  CheckCircle,
  Quote,
  MessageCircle,
  Calendar,
  TrendingUp,
  Building2,
  Star
} from 'lucide-react';

const TrainingPlacementPage = () => {
  const tpTeam = [
    {
      name: 'Prof. Achal Kausik',
      position: 'Dean of Academics, Head of CSE, Head of T&P',
      image: '/placeholder-team.jpg',
      qualifications: 'Ph.D. in Computer Science, Dean of Academics',
      specialization: 'Academic Leadership & Strategic Planning'
    },
    {
      name: 'Mr. Sanjay Dureja',
      position: 'Sr. Manager T&P',
      image: '/placeholder-team.jpg',
      qualifications: 'Senior Manager with extensive placement experience',
      specialization: 'Training & Placement Management'
    },
    {
      name: 'Ms. Priyanka Sharma',
      position: 'Assistant Manager T&P',
      image: '/placeholder-team.jpg',
      qualifications: 'Assistant Manager focused on student development',
      specialization: 'Student Training & Career Guidance'
    },
    {
      name: 'Mr. Kashish Sharma',
      position: 'T&P Coordinator',
      image: '/placeholder-team.jpg',
      qualifications: 'Coordinator for placement activities',
      specialization: 'Placement Coordination & Industry Relations'
    },
    {
      name: 'Mr. Vikas Kumar',
      position: 'Assistant Manager T&P',
      image: '/placeholder-team.jpg',
      qualifications: 'Assistant Manager with focus on student support',
      specialization: 'Student Assistance & Placement Support'
    },
    {
      name: 'Ms. Promila Rana',
      position: 'Office Assistant',
      image: '/placeholder-team.jpg',
      qualifications: 'Administrative support for T&P operations',
      specialization: 'Administrative Operations & Support'
    }
  ];

  const departments = [
    { 
      name: 'Computer Science & Engineering', 
      code: 'CSE',
      coordinator: 'Prof. Achal Kausik',
      companies: 'Google, Microsoft, Amazon, TCS, Infosys, Wipro, Accenture, IBM',
      avgPackage: '₹9.07 LPA',
      placementRate: '96%'
    },
    { 
      name: 'Information Technology', 
      code: 'IT',
      coordinator: 'Department Faculty',
      companies: 'Zomato, Flipkart, Paytm, HCL, Tech Mahindra, Capgemini',
      avgPackage: '₹8.5 LPA',
      placementRate: '94%'
    },
    { 
      name: 'Electronics & Communication', 
      code: 'ECE',
      coordinator: 'Department Faculty',
      companies: 'Samsung, Qualcomm, Ericsson, Nokia, TCS, Infosys',
      avgPackage: '₹7.8 LPA',
      placementRate: '90%'
    },
    { 
      name: 'Electrical & Electronics', 
      code: 'EEE',
      coordinator: 'Department Faculty',
      companies: 'Siemens, ABB, General Electric, Schneider, TCS, Wipro',
      avgPackage: '₹7.2 LPA',
      placementRate: '88%'
    }
  ];

  const trainingPrograms = [
    {
      title: 'Soft Skills Development',
      description: 'Communication, leadership, and interpersonal skills training',
      duration: '2 weeks',
      participants: '500+ students',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Technical Training',
      description: 'Latest technology trends and industry-relevant technical skills',
      duration: '4 weeks',
      participants: '400+ students',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Interview Preparation',
      description: 'Mock interviews, group discussions, and aptitude training',
      duration: '3 weeks',
      participants: '600+ students',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      title: 'Industry Workshops',
      description: 'Guest lectures and hands-on workshops by industry experts',
      duration: 'Ongoing',
      participants: '300+ students',
      icon: Lightbulb,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Users className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About Training & Placement
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Empowering students with industry-ready skills and career opportunities
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-20 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                      AK
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-yellow-800" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">Message from T&P Head</h2>
                    <p className="text-xl text-blue-600 font-semibold">Prof. Achal Kausik</p>
                    <p className="text-gray-600">Dean of Academics, Head of CSE, Head of T&P</p>
                  </div>
                  
                  <div className="prose prose-lg text-gray-700">
                    <p className="text-lg leading-relaxed italic">
                      "The Training & Placement Cell at BPIT is dedicated to maximizing student placements with competitive compensation packages. We focus on early student assessment, targeted training programs, and continuous support to prepare our students for industry success."
                    </p>
                    <p className="text-lg leading-relaxed">
                      "With an average package of ₹9.07 lakhs per annum and a 96% placement rate for eligible students, we maintain strong partnerships with top companies including Google, Microsoft, Amazon, and leading mass recruiters to ensure excellent career opportunities for our graduates."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* T&P Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Dedicated Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the professionals who make career dreams a reality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tpTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg h-full"
              >
                <div className="flex items-start space-x-8 h-full">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 break-words">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3 break-words">{member.position}</p>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">{member.qualifications}</p>
                    <div className="flex items-start space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium break-words">{member.specialization}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Department-wise Placement Coordinators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized support for each department's unique placement needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full text-sm font-bold mb-3">
                      {dept.code}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-blue-600 font-semibold">Coordinator: {dept.coordinator}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{dept.avgPackage}</p>
                    <p className="text-sm text-gray-600">Avg. Package</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Top Recruiters:</h4>
                    <p className="text-gray-600 text-sm">{dept.companies}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-700">Placement Rate</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{dept.placementRate}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training modules to enhance student employability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  program.color === 'blue' ? 'from-blue-500 to-cyan-600' :
                  program.color === 'green' ? 'from-green-500 to-emerald-600' :
                  program.color === 'purple' ? 'from-purple-500 to-violet-600' :
                  'from-orange-500 to-red-600'
                } rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  <program.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{program.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold text-gray-900">{program.participants}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* T&P Cell Objectives */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              T&P Cell Objectives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our primary focus areas for student development and placement success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Maximize Student Placements', description: 'Ensure maximum number of students get placed in reputed companies', icon: Target },
              { title: 'Competitive Compensation', description: 'Achieve competitive salary packages for all placed students', icon: TrendingUp },
              { title: 'Information Dissemination', description: 'Keep students informed about placement opportunities and requirements', icon: MessageCircle },
              { title: 'Student Assessment', description: 'Early assessment and targeted training based on individual strengths', icon: CheckCircle },
              { title: 'Industry Training', description: 'Provide industry-relevant training and skill development programs', icon: BookOpen },
              { title: 'Higher Education Support', description: 'Support students pursuing higher education opportunities', icon: Award }
            ].map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <objective.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Success Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Placement statistics that showcase our commitment to student success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '₹9.07', label: 'Average Package', sublabel: 'LPA for 2022 batch' },
              { number: '₹7.0', label: 'Median Package', sublabel: 'LPA overall' },
              { number: '96%', label: 'Placement Rate', sublabel: 'Eligible students' },
              { number: '500+', label: 'Companies', sublabel: 'Recruiting partners' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TrainingPlacementPage;