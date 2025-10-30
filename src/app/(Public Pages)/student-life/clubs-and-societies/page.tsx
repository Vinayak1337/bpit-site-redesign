"use client"

import { motion } from "framer-motion"
import {
  Code,
  Palette,
  Music,
  Trophy,
  Camera,
  Mic,
  Users,
  Lightbulb,
  Zap,
  Heart,
  Star,
  Award,
  Target,
  Rocket,
  Quote,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import DynamicSidebar from '@/components/ui/DynamicSidebar'
import StudentLifeContentWrapper from '@/app/(Public Pages)/student-life/components/StudentLifeContentWrapper'
import { studentLifeSidebarData } from '@/data/sidebar'

const clubCategories = [
  {
    id: "technical",
    title: "Technical Clubs",
    description: "Enhance your technical skills and work on cutting-edge projects",
    color: "bg-blue-600",
    gradient: "from-blue-500 to-blue-700",
    icon: Code,
    emoji: "💻",
  },
  {
    id: "cultural",
    title: "Cultural Clubs",
    description: "Express your creativity and celebrate diverse cultures",
    color: "bg-purple-600",
    gradient: "from-purple-500 to-purple-700",
    icon: Palette,
    emoji: "🎨",
  },
  {
    id: "sports",
    title: "Sports Clubs",
    description: "Stay fit and compete in various sports activities",
    color: "bg-green-600",
    gradient: "from-green-500 to-green-700",
    icon: Trophy,
    emoji: "🏆",
  },
  {
    id: "media",
    title: "Media & Communication",
    description: "Share stories and capture memories of campus life",
    color: "bg-red-600",
    gradient: "from-red-500 to-red-700",
    icon: Camera,
    emoji: "📸",
  },
  {
    id: "social",
    title: "Social Service",
    description: "Make a difference in society through community service",
    color: "bg-orange-600",
    gradient: "from-orange-500 to-orange-700",
    icon: Heart,
    emoji: "❤️",
  },
]

// Student success stories
const successStories = [
  {
    name: "Ananya Singh",
    club: "Coding Club",
    achievement: "Got placed at Google",
    image: "/events/img1.png",
    quote: "From zero coding knowledge to Google SDE - the coding club literally changed my life! 🚀",
    beforeAfter: {
      before: "Scared of coding",
      after: "Google Software Engineer",
    },
  },
  {
    name: "Rahul Verma",
    club: "Drama Society",
    achievement: "Bollywood Actor",
    image: "/events/img2.png",
    quote: "Started with stage fright, now I'm living my Bollywood dream! The drama society gave me wings 🎭",
    beforeAfter: {
      before: "Stage fright victim",
      after: "Confident performer",
    },
  },
  {
    name: "Priya Sharma",
    club: "Photography Club",
    achievement: "National Geographic Photographer",
    image: "/events/img1.png",
    quote: "From phone camera to National Geographic - this journey started in our photography club! 📸",
    beforeAfter: {
      before: "Phone photographer",
      after: "Professional photographer",
    },
  },
]

// Meme-style club benefits
const clubBenefits = [
  {
    title: "When you join clubs vs when you don't",
    scenarios: [
      {
        situation: "With Clubs",
        description: "Squad goals achieved ✅\nSkills unlocked 🔓\nNetworking pro 🤝\nResume looking fire 🔥",
        emoji: "😎",
        color: "bg-green-100 text-green-800",
      },
      {
        situation: "Without Clubs",
        description: "Netflix and chill only 📺\nSame old routine 😴\nMissing opportunities 😢\nRegret later 💔",
        emoji: "😭",
        color: "bg-red-100 text-red-800",
      },
    ],
  },
]

// Club personality quiz results
const clubPersonalities = [
  {
    type: "The Tech Wizard 🧙‍♂️",
    description: "You speak in code and dream in algorithms",
    clubs: ["Coding Club", "Robotics Club", "Cybersecurity Club"],
    traits: ["Problem solver", "Night owl", "Coffee addict"],
  },
  {
    type: "The Creative Soul 🎨",
    description: "You see art everywhere and express through creativity",
    clubs: ["Art Club", "Music Society", "Drama Society"],
    traits: ["Imaginative", "Expressive", "Aesthetic lover"],
  },
  {
    type: "The Social Butterfly 🦋",
    description: "You thrive in communities and love helping others",
    clubs: ["NSS", "Environmental Club", "Blood Donation Club"],
    traits: ["Empathetic", "Leader", "Change maker"],
  },
]

const clubs = {
  technical: [
    {
      icon: Code,
      name: "Coding Club",
      tagline: "Code. Create. Conquer.",
      description:
        "From 'Hello World' to 'Hello Job Offer' - Learn programming languages, participate in hackathons, and build projects that actually matter!",
      members: "250+",
      image: "/events/img2.png",
      achievements: ["Won 5 Hackathons", "100+ Projects", "Industry Partnerships"],
      activities: ["Weekly Coding Sessions", "Hackathons", "Tech Talks", "Open Source Contributions"],
      meetingTime: "Every Saturday 4 PM",
      difficulty: "Beginner to Advanced",
      vibe: "Caffeine-fueled coding sessions",
      studentQuote: "Went from 'What is coding?' to 'I got the job!' 💻",
      funFact: "Our members have collectively consumed 10,000+ cups of coffee",
      trending: true,
    },
    {
      icon: Code,
      name: "Web Dev Warriors",
      tagline: "Build. Deploy. Dominate.",
      description:
        "Master the art of web development! From responsive designs to full-stack applications - we create the web that runs the world! 🌐",
      members: "180+",
      image: "/events/img1.png",
      achievements: ["50+ Live Websites", "E-commerce Projects", "Client Projects"],
      activities: ["Frontend Workshops", "Backend Bootcamps", "UI/UX Sessions", "Client Projects"],
      meetingTime: "Every Thursday 6 PM",
      difficulty: "Beginner to Pro",
      vibe: "Design meets code perfection",
      studentQuote: "Built my first website, now I'm freelancing! 💰",
      funFact: "Created 100+ websites that are live on the internet",
      trending: true,
    },
    {
      icon: Code,
      name: "App Developers Guild",
      tagline: "Mobile. Native. Legendary.",
      description:
        "Create mobile apps that millions will use! iOS, Android, React Native - we build apps that actually get downloaded! 📱",
      members: "150+",
      image: "/events/img2.png",
      achievements: ["20+ Play Store Apps", "100K+ Downloads", "Startup Collaborations"],
      activities: ["Mobile App Development", "UI/UX Design", "App Store Optimization", "Startup Pitches"],
      meetingTime: "Every Tuesday 5 PM",
      difficulty: "Intermediate to Expert",
      vibe: "Next unicorn app in making",
      studentQuote: "My app hit 10K downloads in first month! 🚀",
      funFact: "Combined downloads of member apps exceed 500K",
      trending: false,
    },
    {
      icon: Lightbulb,
      name: "Innovation Lab",
      tagline: "Ideas to IPOs",
      description:
        "Got the next billion-dollar idea? We'll help you turn that shower thought into a startup that changes the world!",
      members: "180+",
      image: "/events/img1.png",
      achievements: ["15 Startups Launched", "₹50L+ Funding Raised", "Patent Applications"],
      activities: ["Idea Pitching", "Prototype Development", "Investor Meets", "Startup Workshops"],
      meetingTime: "Every Friday 5 PM",
      difficulty: "All Levels",
      vibe: "Shark Tank vibes daily",
      studentQuote: "My crazy idea is now a real company! 🚀",
      funFact: "3 unicorn founders started here",
      trending: false,
    },
    {
      icon: Zap,
      name: "Robotics Club",
      tagline: "Building Tomorrow's Robots",
      description:
        "Create robots that are cooler than the ones in movies. Warning: You might become obsessed with automation!",
      members: "120+",
      image: "/events/img2.png",
      achievements: ["National Champions", "International Competitions", "Research Publications"],
      activities: ["Robot Building", "AI/ML Projects", "Competitions", "Tech Exhibitions"],
      meetingTime: "Every Sunday 2 PM",
      difficulty: "Intermediate to Advanced",
      vibe: "Real-life Tony Stark workshop",
      studentQuote: "I built a robot that brings me coffee! ☕🤖",
      funFact: "Our robots have their own Instagram accounts",
      trending: true,
    },
    {
      icon: Target,
      name: "Cybersecurity Club",
      tagline: "Ethical Hackers Unite",
      description: "Learn to hack (ethically!) and protect the digital world. Become the hero the internet needs!",
      members: "90+",
      image: "/events/img1.png",
      achievements: ["CTF Winners", "Security Audits", "Industry Certifications"],
      activities: ["Ethical Hacking", "CTF Competitions", "Security Workshops", "Penetration Testing"],
      meetingTime: "Every Wednesday 6 PM",
      difficulty: "Intermediate to Advanced",
      vibe: "Mr. Robot meets good guys",
      studentQuote: "I protect companies from bad hackers now! 🛡️",
      funFact: "We've prevented 50+ cyber attacks",
      trending: false,
    },
  ],
  cultural: [
    {
      icon: Music,
      name: "Music Society",
      tagline: "Where Melodies Meet Memories",
      description:
        "From bathroom singers to stage performers - discover your musical superpowers and create memories that last forever!",
      members: "200+",
      image: "/events/img2.png",
      achievements: ["Inter-college Winners", "50+ Performances", "Music Albums Released"],
      activities: ["Instrument Training", "Vocal Coaching", "Live Performances", "Music Production"],
      meetingTime: "Every Tuesday & Thursday 5 PM",
      difficulty: "All Levels",
      vibe: "Bollywood meets Broadway",
      studentQuote: "From shower singer to stage star! 🎤",
      funFact: "Our jam sessions go till 2 AM",
      trending: true,
    },
    {
      icon: Palette,
      name: "Art & Design Club",
      tagline: "Painting Dreams into Reality",
      description:
        "Turn your doodles into masterpieces! Whether you're Picasso or stick-figure level, we've got you covered.",
      members: "150+",
      image: "/events/img1.png",
      achievements: ["Art Exhibitions", "Design Competitions", "College Branding"],
      activities: ["Art Workshops", "Design Projects", "Exhibitions", "Digital Art"],
      meetingTime: "Every Monday & Friday 4 PM",
      difficulty: "Beginner to Advanced",
      vibe: "Instagram-worthy art everywhere",
      studentQuote: "My art is now in the college gallery! 🎨",
      funFact: "We use 500+ paint tubes per month",
      trending: false,
    },
    {
      icon: Mic,
      name: "Drama Society",
      tagline: "Life's a Stage, We're the Stars",
      description: "Overcome stage fright, discover your inner actor, and maybe become the next Bollywood sensation!",
      members: "100+",
      image: "/events/img2.png",
      achievements: ["Award-winning Plays", "Street Performances", "Social Awareness Campaigns"],
      activities: ["Play Rehearsals", "Script Writing", "Public Speaking", "Theater Workshops"],
      meetingTime: "Every Saturday 3 PM",
      difficulty: "All Levels",
      vibe: "Drama queens and kings welcome",
      studentQuote: "From stage fright to spotlight! 🎭",
      funFact: "Our alumni are in 5 web series",
      trending: true,
    },
    {
      icon: Users,
      name: "Literary Society",
      tagline: "Words That Win Hearts",
      description:
        "Express your thoughts through poetry, stories, and words that inspire. Your next viral poem starts here!",
      members: "80+",
      image: "/events/img1.png",
      achievements: ["Published Magazine", "Poetry Competitions", "Author Interactions"],
      activities: ["Creative Writing", "Poetry Sessions", "Book Discussions", "Literary Events"],
      meetingTime: "Every Thursday 5 PM",
      difficulty: "All Levels",
      vibe: "Shakespeare meets modern poetry",
      studentQuote: "My poem got 10K likes on Instagram! 📝",
      funFact: "We've published 1000+ poems",
      trending: false,
    },
  ],
  sports: [
    {
      icon: Trophy,
      name: "Sports Committee",
      tagline: "Champions in the Making",
      description: "From couch potato to campus champion - join us and discover your athletic superpowers!",
      members: "300+",
      image: "/events/img2.png",
      achievements: ["Inter-college Champions", "State Level Participation", "Sports Infrastructure"],
      activities: ["Tournament Organization", "Training Sessions", "Inter-college Matches", "Sports Events"],
      meetingTime: "Every Sunday 9 AM",
      difficulty: "All Levels",
      vibe: "Olympic dreams start here",
      studentQuote: "From zero stamina to marathon runner! 🏃‍♂️",
      funFact: "We burn 50,000+ calories weekly",
      trending: true,
    },
    {
      icon: Target,
      name: "Cricket Club",
      tagline: "Gentlemen's Game, Champions' Spirit",
      description:
        "Live your MS Dhoni dreams! From gully cricket to professional matches - we'll make you a cricket star!",
      members: "80+",
      image: "/events/img1.png",
      achievements: ["District Champions", "University Team", "Professional Coaching"],
      activities: ["Daily Practice", "Match Tournaments", "Coaching Sessions", "Fitness Training"],
      meetingTime: "Every Day 6 AM",
      difficulty: "Beginner to Professional",
      vibe: "IPL energy every day",
      studentQuote: "Hit my first six here! 🏏",
      funFact: "We practice 365 days a year",
      trending: false,
    },
    {
      icon: Zap,
      name: "Basketball Club",
      tagline: "Shoot for the Stars",
      description: "Channel your inner LeBron James! Fast-paced action, team spirit, and slam dunks await you!",
      members: "60+",
      image: "/events/img2.png",
      achievements: ["Inter-college Runners-up", "Professional Training", "Team Spirit"],
      activities: ["Daily Practice", "Skill Development", "Team Matches", "Fitness Training"],
      meetingTime: "Every Day 5 PM",
      difficulty: "All Levels",
      vibe: "NBA dreams come alive",
      studentQuote: "Finally dunked like in the movies! 🏀",
      funFact: "Our tallest player is 6'8\"",
      trending: true,
    },
  ],
  media: [
    {
      icon: Camera,
      name: "Photography Club",
      tagline: "Capturing Life, One Click at a Time",
      description: "From phone photography to professional shoots - turn your Instagram hobby into a career!",
      members: "120+",
      image: "/events/img1.png",
      achievements: ["Photo Exhibitions", "Event Coverage", "Photography Contests"],
      activities: ["Photo Walks", "Workshops", "Event Photography", "Portfolio Building"],
      meetingTime: "Every Saturday 10 AM",
      difficulty: "Beginner to Professional",
      vibe: "Every moment is picture perfect",
      studentQuote: "My photos are now in magazines! 📸",
      funFact: "We've taken 100,000+ photos",
      trending: true,
    },
    {
      icon: Mic,
      name: "Media Club",
      tagline: "Voice of BPIT",
      description: "Create viral content, manage social media like a pro, and become the voice everyone listens to!",
      members: "100+",
      image: "/events/img2.png",
      achievements: ["Viral Content", "Event Coverage", "Social Media Growth"],
      activities: ["Content Creation", "Video Production", "Social Media", "Event Coverage"],
      meetingTime: "Every Wednesday 4 PM",
      difficulty: "All Levels",
      vibe: "Content creators paradise",
      studentQuote: "My video got 1M views! 🎥",
      funFact: "Our content reaches 500K+ people monthly",
      trending: false,
    },
    {
      icon: Users,
      name: "Journalism Club",
      tagline: "Truth Seekers, Story Tellers",
      description: "Uncover stories, interview celebrities, and become the journalist who changes the world!",
      members: "70+",
      image: "/events/img1.png",
      achievements: ["College Newsletter", "Interview Series", "News Coverage"],
      activities: ["Article Writing", "Interviews", "News Reporting", "Editorial Work"],
      meetingTime: "Every Tuesday 5 PM",
      difficulty: "All Levels",
      vibe: "Breaking news every day",
      studentQuote: "Interviewed a Bollywood star! 🎬",
      funFact: "We publish 50+ articles monthly",
      trending: true,
    },
  ],
  social: [
    {
      icon: Heart,
      name: "NSS (National Service Scheme)",
      tagline: "Service Before Self",
      description: "Be the change you want to see! Make a real difference in society and feel good about it too!",
      members: "200+",
      image: "/events/img2.png",
      achievements: ["Community Projects", "Social Campaigns", "Government Recognition"],
      activities: ["Community Service", "Awareness Campaigns", "Rural Development", "Environmental Projects"],
      meetingTime: "Every Sunday 10 AM",
      difficulty: "All Levels",
      vibe: "Superheroes without capes",
      studentQuote: "Helped 1000+ families! ❤️",
      funFact: "We've planted 5000+ trees",
      trending: false,
    },
    {
      icon: Lightbulb,
      name: "Environmental Club",
      tagline: "Green Warriors",
      description: "Save the planet one tree at a time! Join the eco-revolution and become an environmental superhero!",
      members: "150+",
      image: "/events/img1.png",
      achievements: ["Tree Plantation", "Waste Management", "Sustainability Projects"],
      activities: ["Tree Plantation", "Clean-up Drives", "Awareness Programs", "Eco-friendly Initiatives"],
      meetingTime: "Every Saturday 9 AM",
      difficulty: "All Levels",
      vibe: "Captain Planet vibes",
      studentQuote: "Made our campus plastic-free! 🌱",
      funFact: "We recycle 1 ton of waste monthly",
      trending: true,
    },
    {
      icon: Users,
      name: "Blood Donation Club",
      tagline: "Heroes Who Save Lives",
      description:
        "Be a real-life superhero! Donate blood, save lives, and feel like the hero you always wanted to be!",
      members: "80+",
      image: "/events/img2.png",
      achievements: ["500+ Units Collected", "Life Saving Campaigns", "Health Awareness"],
      activities: ["Blood Donation Camps", "Health Checkups", "Awareness Drives", "Emergency Support"],
      meetingTime: "Every Month 2nd Sunday",
      difficulty: "All Levels",
      vibe: "Real superheroes",
      studentQuote: "Saved 10 lives through donation! 🩸",
      funFact: "We've saved 200+ lives",
      trending: false,
    },
  ],
}

const benefits = [
  {
    icon: Users,
    title: "Squad Goals Achieved",
    description: "Find your tribe and build friendships that last beyond college years",
    color: "bg-blue-500",
    memeText: "When you find your people 👥",
  },
  {
    icon: Trophy,
    title: "Level Up Your Skills",
    description: "Unlock achievements in real life - from beginner to expert in record time",
    color: "bg-green-500",
    memeText: "Skill tree: UNLOCKED 🔓",
  },
  {
    icon: Lightbulb,
    title: "Leadership Unlocked",
    description: "From follower to leader - develop the confidence to lead and inspire others",
    color: "bg-purple-500",
    memeText: "Boss mode: ACTIVATED 👑",
  },
  {
    icon: Star,
    title: "Recognition & Fame",
    description: "Get your 15 minutes of fame and maybe more - competitions, awards, and achievements",
    color: "bg-orange-500",
    memeText: "Main character energy ⭐",
  },
  {
    icon: Rocket,
    title: "Career Boost",
    description: "Stand out in job interviews with experiences that make recruiters say 'WOW!'",
    color: "bg-red-500",
    memeText: "Resume goes BRRR 🚀",
  },
  {
    icon: Heart,
    title: "Personal Glow Up",
    description: "Transform from shy to confident, from ordinary to extraordinary",
    color: "bg-indigo-500",
    memeText: "Glow up is real ✨",
  },
]

export default function ClubsAndSocietiesPage() {
  const [activeCategory, setActiveCategory] = useState("technical")

  return (
    <>
      {/* Full-width Hero Carousel Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Clubs & Societies
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto mb-8">
              Where ordinary students become extraordinary legends! Join the club that matches your vibe ✨
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🚀 25+ Active Clubs</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">👥 1000+ Members</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">🏆 100+ Awards Won</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className='container mx-auto px-4 py-12 max-w-full overflow-hidden'>
        <div className='flex flex-col lg:flex-row gap-8 w-full max-w-full'>
          {/* Sidebar Navigation */}
          <DynamicSidebar
            navItems={studentLifeSidebarData.navItems}
            theme={studentLifeSidebarData.theme}
          />

          {/* Content Area */}
          <StudentLifeContentWrapper>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Glow Up Stories 🌟</h2>
            <p className="text-xl text-gray-600">Real students, real transformations, real success!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-xl shadow-lg border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={story.image || "/events/img1.png"}
                        alt={story.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4 border-4 border-blue-200"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                        <p className="text-sm text-blue-600 font-semibold">{story.club}</p>
                        <p className="text-sm text-green-600 font-bold">{story.achievement}</p>
                      </div>
                    </div>

                    {/* Before/After */}
                    <div className="bg-gradient-to-r from-red-50 to-green-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-center">
                          <div className="text-red-600 font-bold">BEFORE</div>
                          <div className="text-gray-700">{story.beforeAfter.before}</div>
                        </div>
                        <div className="text-2xl">➡️</div>
                        <div className="text-center">
                          <div className="text-green-600 font-bold">AFTER</div>
                          <div className="text-gray-700">{story.beforeAfter.after}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Quote className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-gray-700 italic font-medium">{story.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meme-style Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Club Life Difference 📈</h2>
            <p className="text-xl text-gray-600">Choose your character development arc wisely!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-xl shadow-lg border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`${benefit.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">
                      {benefit.memeText}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Meme */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Club Members vs Non-Club Members 😅</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clubBenefits[0].scenarios.map((scenario, index) => (
                <div key={scenario.situation} className={`${scenario.color} p-6 rounded-xl text-center`}>
                  <div className="text-4xl mb-4">{scenario.emoji}</div>
                  <h4 className="text-xl font-bold mb-4">{scenario.situation}</h4>
                  <div className="whitespace-pre-line text-sm font-medium">{scenario.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Club Personality Types */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Your Club Personality? 🤔</h2>
            <p className="text-xl text-gray-600">Find your tribe based on your vibe!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clubPersonalities.map((personality, index) => (
              <motion.div
                key={personality.type}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 bg-white rounded-xl shadow-lg border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{personality.type}</h3>
                    <p className="text-gray-600 mb-4">{personality.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Perfect Clubs for You:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {personality.clubs.map((club, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Your Traits:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {personality.traits.map((trait, idx) => (
                          <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Categories Heading */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore Club Categories 🎯</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tech wizards to creative artists - find your tribe and make lifelong connections!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-12 bg-white sticky top-0 z-10 shadow-sm" id="clubs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {clubCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.emoji}</span>
                <span className="font-semibold">{category.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Clubs Grid */}
      <section className="py-10 px-2 sm:px-4 lg:px-6 bg-gradient-to-br from-gray-50 to-purple-50 w-full overflow-hidden">
        <div className="w-full max-w-full mx-auto">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              {clubCategories.map(
                (category) =>
                  category.id === activeCategory && (
                    <div key={category.id}>
                      <div
                        className={`${category.color} inline-block px-6 py-2 rounded-full text-white font-semibold mb-4`}
                      >
                        {category.emoji} {category.title}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h3>
                      <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                    </div>
                  ),
              )}
            </div>

            <div className="relative">
              {/* Section Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {clubCategories.find(cat => cat.id === activeCategory)?.title}
                </h3>
                <p className="text-gray-600">Scroll to explore all amazing clubs ✨</p>
              </div>

              {/* Smooth Horizontal Scrolling Cards */}
              <div className="overflow-hidden w-full max-w-full">
                <div className="flex gap-6 pb-4 px-4 animated-container"
                     style={{ 
                       scrollbarWidth: 'none', 
                       msOverflowStyle: 'none',
                       animation: 'smoothSlide 60s linear infinite',
                       animationPlayState: 'running',
                       width: 'max-content'
                     }}>
              {/* Duplicate cards for infinite scroll effect with extra spacing */}
              {[...clubs[activeCategory as keyof typeof clubs], ...clubs[activeCategory as keyof typeof clubs]].map((club, clubIndex) => (
                <motion.div
                  key={`${club.name}-${clubIndex}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: (clubIndex % clubs[activeCategory as keyof typeof clubs].length) * 0.15,
                    ease: "easeOut"
                  }}
                  className="flex-shrink-0 w-80 group"
                  style={{ minWidth: '320px' }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-96 hover:shadow-xl transition-all duration-300">
              
              <style jsx>{`
                @keyframes smoothSlide {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                
                /* Pause animation on hover for better UX */
                .animated-container:hover {
                  animation-play-state: paused;
                }
              `}</style>
                      {/* Image Section - Reduced height */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={club.image || "/events/img2.png"}
                          alt={club.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Floating Elements */}
                        <div className="absolute top-3 left-3">
                          <div className="bg-white/90 backdrop-blur-sm w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                            <club.icon className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>

                        <div className="absolute top-3 right-3 flex flex-col gap-1">
                          <div className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold">
                            {club.members}
                          </div>
                          {club.trending && (
                            <div className="bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-bold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </div>
                          )}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-lg font-bold text-white mb-1">{club.name}</h3>
                          <div className="bg-yellow-400/90 backdrop-blur-sm px-2 py-1 rounded-full text-black text-xs font-bold inline-block">
                            {club.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Content Section - Compact */}
                      <div className="p-4">
                        <p className="text-gray-600 mb-3 leading-relaxed text-sm line-clamp-2">{club.description}</p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg text-center">
                            <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                            <div className="text-xs font-bold text-gray-800">{club.members}</div>
                            <div className="text-xs text-gray-600">Members</div>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-2 rounded-lg text-center">
                            <Clock className="w-4 h-4 text-green-600 mx-auto mb-1" />
                            <div className="text-xs font-bold text-gray-800">{club.difficulty}</div>
                            <div className="text-xs text-gray-600">Level</div>
                          </div>
                        </div>

                        {/* Student Quote */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-3 border-l-2 border-yellow-400">
                          <p className="text-gray-800 text-xs italic">"{club.studentQuote}"</p>
                        </div>

                        {/* Achievements - Compact */}
                        <div className="mb-3">
                          <div className="grid grid-cols-2 gap-1">
                            {club.achievements.slice(0, 4).map((achievement, idx) => (
                              <div key={idx} className="flex items-center text-xs text-gray-700">
                                <CheckCircle className="w-3 h-3 text-green-600 mr-1 flex-shrink-0" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm">
                          Join Club
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Glow Up Starts Here! ✨</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Don't just survive college - THRIVE in it! Join clubs, make memories, and become the legend you're meant
              to be 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100 border-white px-8 py-4 text-lg"
              >
                🎯 Find My Perfect Club
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
              >
                📞 Get Started Today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

            </StudentLifeContentWrapper>
        </div>
      </div>
    </>
  )
}
