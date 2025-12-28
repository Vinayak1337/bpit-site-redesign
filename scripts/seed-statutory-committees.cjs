const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// --- Default Data ---

const overviewData = {
  hero: {
    title: 'Statutory Committees',
    description:
      'BPIT is committed to maintaining the highest standards of education, safety, and governance through our comprehensive statutory committees that ensure regulatory compliance and student welfare.'
  },
  committees: [
    {
      title: 'Internal Quality Assurance Cell (IQAC)',
      description:
        'Ensures quality enhancement and sustenance in all academic and administrative activities.',
      icon: 'CheckCircle',
      iconColor: 'text-blue-600',
      href: '/statutory-committees/iqac',
      key: 'iqac'
    },
    {
      title: 'Anti-Ragging Committee',
      description:
        'Prevents ragging incidents and ensures a safe environment for all students.',
      icon: 'UserX',
      iconColor: 'text-red-600',
      href: '/statutory-committees/anti-ragging',
      key: 'anti-ragging'
    },
    {
      title: 'Internal Complaints Committee',
      description:
        'Addresses complaints related to sexual harassment and ensures a respectful workplace.',
      icon: 'Users',
      iconColor: 'text-purple-600',
      href: '/statutory-committees/internal-complaints',
      key: 'internal-complaints'
    },
    {
      title: 'Student Welfare Committee',
      description:
        'Focuses on student well-being and addresses various welfare-related concerns.',
      icon: 'Heart',
      iconColor: 'text-pink-600',
      href: '/statutory-committees/student-welfare',
      key: 'student-welfare'
    },
    {
      title: 'Grievance Redressal Cell',
      description:
        'Provides a platform for students and staff to raise and resolve grievances.',
      icon: 'Eye',
      iconColor: 'text-orange-600',
      href: '/statutory-committees/grievance-redressal',
      key: 'grievance-redressal'
    }
  ]
};

const iqacData = {
  hero: {
    title: 'Internal Quality Assurance Cell (IQAC)',
    description:
      'Dedicated to ensuring continuous quality improvement and enhancement in all academic and administrative activities at BPIT.',
    icon: 'CheckCircle',
    gradient: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-600'
  },
  about: {
    title: 'About IQAC',
    content: [
      'The Internal Quality Assurance Cell (IQAC) is a significant and strategic approach towards institutionalizing quality assurance. It was established as per the guidelines of the National Assessment and Accreditation Council (NAAC) for promoting quality culture and improvement in higher education institutions.',
      'IQAC serves as a catalyst for quality enhancement through institutionalizing quality culture and internalization of quality assurance strategies. It acts as a nodal agency for coordinating quality related activities and enhancing the overall quality of the institution.'
    ],
    vision:
      'To establish a quality culture that ensures continuous improvement and enhancement in all academic and administrative activities of the institution.',
    mission:
      'To facilitate the creation of a learner-centric environment conducive to quality education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.'
  },
  objectives: [
    {
      title: 'Quality Enhancement',
      description:
        'Ensure the enhancement and coordination of quality-related activities in the institution',
      icon: 'Target',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Quality Assurance',
      description:
        'Develop and apply quality benchmarks and parameters for various academic activities',
      icon: 'CheckCircle',
      iconColor: 'text-green-600'
    },
    {
      title: 'Quality Culture',
      description:
        'Facilitate the creation of a learner-centric environment conducive to quality education',
      icon: 'Users',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Documentation',
      description:
        'Organize inter and intra-institutional workshops, seminars on quality-related themes',
      icon: 'FileText',
      iconColor: 'text-orange-600'
    }
  ],
  functions: [
    'Development and application of quality benchmarks for academic and administrative activities',
    'Dissemination of information on various quality parameters to all stakeholders',
    'Organization of workshops, seminars, and conferences on quality-related themes',
    'Documentation of various activities leading to quality improvement',
    'Preparation of Annual Quality Assurance Report (AQAR) for submission to NAAC',
    'Development of quality culture in the institution',
    'Collection and analysis of feedback from students, parents, and employers',
    'Promotion of measures for institutional functioning towards quality enhancement',
    'Coordination with other stakeholders for quality-related activities',
    'Maintenance of institutional database through MIS for the purpose of maintaining quality'
  ],
  committeeMembers: [
    {
      name: 'Dr. Rakesh Kumar Sharma',
      designation: 'Chairperson',
      department: 'Principal',
      qualification: 'Ph.D. in Computer Science'
    },
    {
      name: 'Dr. Anita Devi',
      designation: 'Coordinator',
      department: 'Computer Science & Engineering',
      qualification: 'Ph.D. in Computer Science'
    }
  ],
  initiatives: [
    {
      title: 'Academic Audit',
      description: 'Regular assessment of academic processes and outcomes',
      icon: 'Eye',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Feedback System',
      description: 'Systematic collection and analysis of stakeholder feedback',
      icon: 'BarChart3',
      iconColor: 'text-green-600'
    },
    {
      title: 'Best Practices',
      description:
        'Identification and implementation of institutional best practices',
      icon: 'Award',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Quality Benchmarks',
      description: 'Development and monitoring of quality parameters',
      icon: 'Settings',
      iconColor: 'text-orange-600'
    }
  ],
  aqar: {
    title: 'Annual Quality Assurance Report (AQAR)',
    description:
      'The Annual Quality Assurance Report (AQAR) is a comprehensive document that captures the quality initiatives taken by the institution during the academic year. It serves as a self-study report for continuous improvement.',
    reports: [
      {
        year: '2023-24',
        title: 'AQAR 2023-24',
        description: 'Latest annual report',
        buttonText: 'Download PDF',
        buttonColor: 'bg-green-600 hover:bg-green-700'
      },
      {
        year: '2022-23',
        title: 'AQAR 2022-23',
        description: 'Previous year report',
        buttonText: 'Download PDF',
        buttonColor: 'bg-blue-600 hover:bg-blue-700'
      }
    ]
  }
};

const antiRaggingData = {
  hero: {
    title: 'Anti-Ragging Committee',
    description:
      'Committed to maintaining a ragging-free environment and ensuring the safety and well-being of all students at BPIT.',
    icon: 'UserX',
    gradient: 'from-red-50 to-orange-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-600'
  },
  definition: {
    title: 'What Constitutes Ragging?',
    content:
      'Ragging means any disorderly conduct, whether by words spoken or written, or by an act which has the effect of teasing, treating or handling with rudeness any student, indulging in rowdy or undisciplined activities which cause or are likely to cause annoyance, hardship or psychological harm or to raise fear or apprehension thereof in a fresher or a junior student.',
    includes: [
      'Any conduct which causes, induces or likely to cause any physical, psychological or physiological harm',
      'Any act of financial extortion or forceful expenditure burden',
      'Any act of physical abuse including all variants of it: sexual abuse, homosexual assaults, stripping, forcing obscene and lewd acts',
      'Any act or abuse by spoken words, emails, post, public insults',
      'Any act that affects the mental health and self-confidence of a fresher or any other student'
    ]
  },
  committeeMembers: [
    {
      name: 'Dr. Rakesh Kumar Sharma',
      designation: 'Chairman',
      department: 'Principal',
      phone: '+91-11-2345-6789',
      email: 'principal@bpit.ac.in'
    }
  ],
  preventiveMeasures: [
    {
      title: 'Awareness Campaigns',
      description:
        'Regular awareness programs about anti-ragging policies and consequences',
      icon: 'Shield',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Zero Tolerance Policy',
      description:
        'Strict enforcement of zero tolerance towards any form of ragging',
      icon: 'AlertTriangle',
      iconColor: 'text-red-600'
    }
  ],
  punishments: [
    'Suspension from attending classes and academic privileges',
    'Withholding/withdrawing scholarship/fellowship and other benefits',
    'Debarring from appearing in any test/examination',
    'Withholding results'
  ],
  emergencyContacts: [
    {
      title: 'Anti-Ragging Helpline',
      contact: '1800-180-5522',
      description: '(24x7 Toll-Free)',
      icon: 'Phone',
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]
};

const internalComplaintsData = {
  hero: {
    title: 'Internal Complaints Committee',
    description:
      'Dedicated to preventing and addressing sexual harassment, ensuring a safe and respectful environment for all members of the BPIT community.',
    icon: 'Users',
    gradient: 'from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-600'
  },
  definition: {
    title: 'Sexual Harassment: Definition & Scope',
    content:
      "Sexual harassment is a form of sex discrimination that violates the fundamental right to equality and dignity. It creates a hostile environment that affects an individual's work or academic performance.",
    includes: [
      'Unwelcome sexually determined behavior (whether directly or by implication)',
      'Physical contact and advances',
      'Demand or request for sexual favors'
    ]
  },
  committeeMembers: [
    {
      name: 'Dr. Meera Gupta',
      designation: 'Presiding Officer',
      department: 'Computer Science & Engineering',
      phone: '+91-11-2345-6789',
      email: 'meera.gupta@bpit.ac.in'
    }
  ],
  procedures: [
    {
      step: '1',
      title: 'File Complaint',
      description:
        'Submit complaint in writing or via email to any committee member',
      icon: 'FileText',
      iconColor: 'text-blue-600'
    }
  ],
  supportServices: [
    {
      title: 'Counselling Support',
      description:
        'Professional counselling services for complainants and affected individuals',
      icon: 'Heart',
      iconColor: 'text-pink-600'
    }
  ],
  rightsAndResponsibilities: {
    rights: [
      'Right to work and study in an environment free from sexual harassment',
      'Right to file complaints without fear of retaliation'
    ],
    responsibilities: [
      'Prompt and fair investigation of all complaints',
      'Maintain confidentiality throughout the process'
    ]
  },
  contactInfo: [
    {
      title: 'Helpline',
      contact: '+91-11-2532-3333',
      description: 'Available 24/7',
      icon: 'Phone',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]
};

async function seedComponent(pageId, key, data, order) {
  await prisma.component.upsert({
    where: { pageId_order: { pageId, order } },
    update: { data, key },
    create: { pageId, data, key, order }
  });
  console.log(`Seeded component: ${key}`);
}

async function seedPage(slug, title, components) {
  const page = await prisma.page.upsert({
    where: { slug },
    update: { title },
    create: { slug, title, kind: 'PAGE', status: 'PUBLISHED' }
  });

  for (const component of components) {
    await seedComponent(page.id, component.key, component.data, component.order);
  }
  console.log(`Seeded page: ${title} (${slug})`);
}

async function seedStatutoryCommittees() {
  try {
    // Overview Page
    await seedPage('statutory-committees', 'Statutory Committees', [
      { key: 'STATUTORY_OVERVIEW_DATA', data: overviewData, order: 1 }
    ]);

    // IQAC
    await seedPage('statutory-committees-iqac', 'IQAC', [
      { key: 'IQAC_DATA', data: iqacData, order: 1 }
    ]);

    // Anti-Ragging
    await seedPage('statutory-committees-anti-ragging', 'Anti-Ragging', [
      { key: 'ANTI_RAGGING_DATA', data: antiRaggingData, order: 1 }
    ]);

    // Internal Complaints
    await seedPage('statutory-committees-internal-complaints', 'Internal Complaints', [
      { key: 'INTERNAL_COMPLAINTS_DATA', data: internalComplaintsData, order: 1 }
    ]);

  } catch (error) {
    console.error('Error seeding statutory committees:', error);
    process.exit(1);
  }
}

async function main() {
  await seedStatutoryCommittees();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
