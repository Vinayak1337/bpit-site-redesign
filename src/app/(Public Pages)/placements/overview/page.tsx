'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Award, 
  Target, 
  Briefcase,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const PlacementOverviewPage = () => {
  const stats = [
    { icon: TrendingUp, value: '96%', label: 'Placement Rate' },
    { icon: Building2, value: '500+', label: 'Partner Companies' },
    { icon: Users, value: '2000+', label: 'Students Placed' },
    { icon: Award, value: '₹9.07 LPA', label: 'Average Package' }
  ];

  const features = [
    {
      icon: Target,
      title: 'Career Guidance',
      description: 'Comprehensive career counseling and guidance sessions to help students choose the right career path.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Industry Training',
      description: 'Regular training sessions, workshops, and seminars conducted by industry experts.',
      color: 'purple'
    },
    {
      icon: Briefcase,
      title: 'Mock Interviews',
      description: 'Practice sessions with mock interviews to prepare students for real placement interviews.',
      color: 'green'
    },
    {
      icon: Star,
      title: 'Skill Development',
      description: 'Soft skills and technical skills development programs to enhance employability.',
      color: 'orange'
    }
  ];

  const teamMembers = [
    {
      name: 'Prof. Achal Kausik',
      position: 'Dean of Academics, Head of CSE, Head of T&P',
      image: '/placeholder-team.jpg',
      email: 'placement@bpit.ac.in'
    },
    {
      name: 'Mr. Sanjay Dureja',
      position: 'Sr. Manager T&P',
      image: '/placeholder-team.jpg',
      email: 'sanjay.placement@bpit.ac.in'
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
                <Briefcase className="w-12 h-12" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Placement Cell Overview
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Bridging the gap between academic excellence and industry requirements
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full" />
          </motion.div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{stat.value}</h3>
                <p className="text-gray-600 text-center font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our mission is to foster overall student development through blended learning approaches, 
              preparing ambitious, goal-oriented students with rational understanding for evolving industry demands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="prose prose-lg text-gray-700">
                <p className="text-lg leading-relaxed">
                  The Training & Placement Cell at BPIT focuses on imparting knowledge through blended learning 
                  approaches, combining theoretical and practical knowledge integration. We provide early exposure 
                  to industry requirements and in-house competency development.
                </p>
                <p className="text-lg leading-relaxed">
                  Our comprehensive approach includes technical training from renowned institutions, guest lectures 
                  by industry professionals, industrial visits, and holistic skill development to create industry-ready graduates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Industry Partnerships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Skill Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Career Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700 font-medium">Mock Interviews</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-1">
                <div className="bg-white rounded-2xl p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h3>
                  <ul className="space-y-4">
                    {[
                      'Overall student development',
                      'Blended learning approach',
                      'Early industry exposure',
                      'Technical & soft skills integration',
                      'Industry-ready graduate preparation'
                    ].map((objective, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" />
                        <span className="text-gray-700">{objective}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive placement services designed to maximize student success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  feature.color === 'blue' ? 'from-blue-500 to-cyan-600' :
                  feature.color === 'purple' ? 'from-purple-500 to-violet-600' :
                  feature.color === 'green' ? 'from-green-500 to-emerald-600' :
                  'from-orange-500 to-red-600'
                } rounded-2xl flex items-center justify-center mb-6 text-white`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to your career success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center shadow-lg"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{member.email}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Training Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technical Training Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training programs to prepare students for evolving industry demands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Programming & Development', skills: ['Data Structures & Algorithms', 'Web & Mobile Development', 'System Design', 'SQL & Database'], icon: Users },
              { title: 'Core Technical Skills', skills: ['Quantitative Aptitude', 'Logical Reasoning', 'Programming Fundamentals', 'Linux Administration'], icon: Target },
              { title: 'Specialized Engineering', skills: ['Digital Hardware Design', 'Embedded System Design', 'ASIC Development', 'PCB Board Design'], icon: Briefcase },
              { title: 'Signal Processing', skills: ['MATLAB Programming', 'Signal Processing', 'Image Processing', 'Antenna Design'], icon: Star },
              { title: 'Industry Exposure', skills: ['Guest Lectures by Experts', 'Industrial Visits', 'Live Project Training', 'Hands-on Workshops'], icon: Building2 },
              { title: 'Professional Development', skills: ['Communication Skills', 'Technical Presentations', 'Interview Preparation', 'Career Guidance'], icon: Award }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <area.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
                <ul className="space-y-2">
                  {area.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stars of BPIT - Recent Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stars of BPIT
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Celebrating exceptional achievements and academic excellence of our students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Ujjawal Chaudhary (IT)',
                description: 'Received Gold Medal at 17th GGSIPU Convocation for outstanding academic performance',
                icon: Award,
                highlight: 'Gold Medal',
                category: 'Academic Excellence',
                department: 'Information Technology'
              },
              {
                title: 'Pavneet Singh (CSE)',
                description: 'Received Gold Medal at 17th GGSIPU Convocation for exceptional achievements',
                icon: Award,
                highlight: 'Gold Medal',
                category: 'Academic Excellence',
                department: 'Computer Science'
              },
              {
                title: 'Team "codeBlooded"',
                description: 'BPIT students secured 2nd position in prestigious hackDUCS hackathon',
                icon: Target,
                highlight: '2nd Position',
                category: 'Competition Win',
                department: 'Multi-Department'
              },
              {
                title: 'Team Phoenix Arcana',
                description: 'Won 3rd place at Codezen competition and earned ₹5000 prize money',
                icon: Star,
                highlight: '3rd Position',
                category: 'Technical Competition',
                department: 'Computer Science'
              },
              {
                title: 'BBA Final Year Students',
                description: 'Won 1st position in "Udbhav: The Social Innovation Pitch" competition',
                icon: Lightbulb,
                highlight: '1st Position',
                category: 'Innovation Award',
                department: 'Business Administration'
              },
              {
                title: 'Code Rush Champions',
                description: 'BPIT students won 1st position in Code Rush Competition at Techno-Vision IT Fest',
                icon: Users,
                highlight: '1st Position',
                category: 'Programming Contest',
                department: 'Information Technology'
              },
              {
                title: 'Business Plan Winners',
                description: 'BBA students won 1st position in Business Plan Competition out of 235 teams',
                icon: TrendingUp,
                highlight: '1st Position',
                category: 'Business Competition',
                department: 'Business Administration'
              },
              {
                title: 'ECE Innovation Team',
                description: 'Electronics students bagged 3rd position at IDEATHON 3.0 innovation challenge',
                icon: Briefcase,
                highlight: '3rd Position',
                category: 'Innovation Challenge',
                department: 'Electronics & Communication'
              },
              {
                title: 'BPIT Cricket Team',
                description: 'Won 1st position at Rishihood Sports Fest showcasing sporting excellence',
                icon: Star,
                highlight: '1st Position',
                category: 'Sports Achievement',
                department: 'Sports Team'
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                    {achievement.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{achievement.highlight}</div>
                  <p className="text-sm text-gray-500 mb-2">{achievement.department}</p>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Placement Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Department-wise placement achievements showcasing our academic excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { department: 'Computer Science', maxPackage: '₹51 LPA', avgPackage: '₹8.55 LPA', color: 'from-blue-500 to-blue-700' },
              { department: 'Information Technology', maxPackage: '₹51 LPA', avgPackage: '₹6.77 LPA', color: 'from-green-500 to-green-700' },
              { department: 'Electronics & Communication', maxPackage: '₹13.23 LPA', avgPackage: '₹5.00 LPA', color: 'from-purple-500 to-purple-700' },
              { department: 'Electrical & Electronics', maxPackage: '₹4.5 LPA', avgPackage: '₹4.17 LPA', color: 'from-orange-500 to-orange-700' }
            ].map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${dept.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
                  {dept.department.split(' ').map(word => word[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{dept.department}</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Highest Package</p>
                    <p className="text-lg font-bold text-green-600">{dept.maxPackage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Average Package</p>
                    <p className="text-lg font-bold text-blue-600">{dept.avgPackage}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
              Ready to start your career journey? Connect with our placement team today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-blue-200">+91-11-27850086</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-blue-200">placement@bpit.ac.in</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                <p className="text-blue-200">BPIT Campus, Rohini</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Contact Placement Cell
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PlacementOverviewPage;