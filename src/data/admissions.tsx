import { Award, CheckCircle, Star, Trophy, BookOpen, Users, Leaf, Building, DollarSign, Heart, GraduationCap, FileText } from 'lucide-react';

export const accreditations = [
    { title: "NBA Accredited", subtitle: "B.Tech programs in CSE, ECE, EEE", icon: <Award className="w-8 h-8" /> },
    { title: "AICTE Approved", subtitle: "Affiliated to GGSIPU", icon: <CheckCircle className="w-8 h-8" /> },
    { title: "Grade 'A' Institute", subtitle: "Under GGSIPU", icon: <Star className="w-8 h-8" /> },
    { title: "NIRF Ranked", subtitle: "251-300 band (2021)", icon: <Trophy className="w-8 h-8" /> }
];

export const whyBPITHighlights = [
    {
        icon: <BookOpen className="w-8 h-8" />,
        title: "Academic Excellence",
        description: "Industry-aligned, accredited curriculum with NBA-approved programs"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Mentorship Culture",
        description: "Faculty as mentors, learner-centric approach for personal growth"
    },
    {
        icon: <Trophy className="w-8 h-8" />,
        title: "Proven Track Record",
        description: "Alumni in top firms like Accenture, Infosys, TCS, and more"
    },
    {
        icon: <Leaf className="w-8 h-8" />,
        title: "Green & Smart Campus",
        description: "Solar panels, rainwater harvesting, smart classrooms"
    },
    {
        icon: <Building className="w-8 h-8" />,
        title: "Top Recruiters",
        description: "TCS, Wipro, KPMG, Nagarro, Tech Mahindra visit regularly"
    },
    {
        icon: <DollarSign className="w-8 h-8" />,
        title: "Affordable Education",
        description: "Only ₹1.7 LPA, ₹6.9 L total B.Tech cost with excellent ROI"
    }
];

export const campusFacilities = {
    modernLabs: {
        title: "Modern Labs",
        gradient: "from-blue-400 to-purple-600",
        icon: <Building className="w-8 h-8" />,
        images: [
            { title: "Computer Lab", description: "Latest systems with advanced software" },
            { title: "Electronics Lab", description: "State-of-the-art equipment for practical learning" },
            { title: "Research Lab", description: "Dedicated space for innovation projects" }
        ]
    },
    multimediaHalls: {
        title: "Multimedia Lecture Halls",
        gradient: "from-green-400 to-blue-600",
        icon: <Users className="w-8 h-8" />,
        images: [
            { title: "Smart Classrooms", description: "Interactive whiteboards and projectors" },
            { title: "Audio-Visual Systems", description: "Professional presentation equipment" },
            { title: "Recording Studio", description: "High-quality lecture recording facility" }
        ]
    },
    library: {
        title: "Wi-Fi Library",
        gradient: "from-purple-400 to-pink-600",
        icon: <BookOpen className="w-8 h-8" />,
        images: [
            { title: "Digital Resources", description: "DELNET and NDLI access portals" },
            { title: "Study Spaces", description: "Quiet zones for focused learning" },
            { title: "Book Collection", description: "Extensive technical and reference books" }
        ]
    },
    hostel: {
        title: "Girls' Hostel",
        gradient: "from-rose-400 to-orange-600",
        icon: <Heart className="w-8 h-8" />,
        images: [
            { title: "Accommodation", description: "Safe and comfortable living spaces" },
            { title: "Recreation Area", description: "Common areas for social activities" },
            { title: "Dining Facility", description: "Nutritious meals and cafeteria" }
        ]
    },
    seminarHalls: {
        title: "Seminar Halls",
        gradient: "from-teal-400 to-cyan-600",
        icon: <Users className="w-8 h-8" />,
        images: [
            { title: "Conference Room", description: "Professional meeting facilities" },
            { title: "Auditorium", description: "Large capacity for events and presentations" },
            { title: "Workshop Space", description: "Hands-on training and skill development" }
        ]
    },
    greenInitiatives: {
        title: "Green Initiatives",
        gradient: "from-emerald-400 to-green-600",
        icon: <Leaf className="w-8 h-8" />,
        images: [
            { title: "Solar Panels", description: "Renewable energy for sustainable campus" },
            { title: "Rainwater Harvesting", description: "Water conservation systems" },
            { title: "Green Spaces", description: "Landscaped gardens and eco-friendly areas" }
        ]
    }
};

export const testimonials = [
    {
        name: "Priya Sharma",
        department: "CSE, Batch 2023",
        quote: "My experience at BPIT has truly been exceptional. Highly intellectual and supportive faculty.",
        image: "/api/placeholder/80/80"
    },
    {
        name: "Rahul Kumar",
        department: "ECE, Batch 2022",
        quote: "Professors ensured every student received career and academic guidance.",
        image: "/api/placeholder/80/80"
    },
    {
        name: "Sneha Patel",
        department: "EEE, Batch 2023",
        quote: "The industry exposure and practical learning approach prepared me for my career.",
        image: "/api/placeholder/80/80"
    }
];

export const recruitersWithLogos = [
    { name: "TCS", logo: "/logos/tcs.png" },
    { name: "Infosys", logo: "/logos/infosys.png" },
    { name: "Accenture", logo: "/logos/accenture.png" },
    { name: "KPMG", logo: "/logos/kpmg.png" },
    { name: "Wipro", logo: "/logos/wipro.png" },
    { name: "Tech Mahindra", logo: "/logos/png-clipart-satyam-scandal-tech-mahindra.png" },
    { name: "Nagarro", logo: "/logos/nagarro.png" },
    { name: "HCL", logo: "/logos/hcl.png" },
    { name: "Cognizant", logo: "/logos/cognizant.png" },
    { name: "Capgemini", logo: "/logos/capgemini.png" },
    { name: "IBM", logo: "/logos/ibm.png" },
    { name: "Microsoft", logo: "/logos/microsoft.png" }
];

export const brochureData = [
    {
        id: 'undergraduate',
        title: 'Undergraduate Admissions Brochure',
        description: `Complete information about B.Tech, BBA, and other undergraduate programs for Academic Year ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        icon: <GraduationCap className="w-8 h-8" />,
        color: 'bg-blue-500',
        url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
        lastUpdated: 'Auto-detected from IPU website',
        isAutoDetected: false,
        detectedText: ''
    },
    {
        id: 'postgraduate',
        title: 'Postgraduate Admissions Brochure',
        description: `Complete information about MBA, M.Tech, and other postgraduate programs for Academic Year ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        icon: <FileText className="w-8 h-8" />,
        color: 'bg-purple-500',
        url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
        lastUpdated: 'Auto-detected from IPU website',
        isAutoDetected: false,
        detectedText: ''
    }
];