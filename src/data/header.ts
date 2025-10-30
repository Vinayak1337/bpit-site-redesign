export const headerContactData: HeaderContactUsData = {
  phone: { tel: '011-27571080', display: '011-2757 1080' },
  email: 'bpitindia@yahoo.com',
  address: 'PSP-4, Sector-17, Rohini, New Delhi',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=PSP-4%2C%20Sector-17%2C%20Rohini%2C%20New%20Delhi',
  accreditation: {
    mobile: 'NBA Accredited',
    desktop: 'NBA Accredited B.Tech Programs',
  },
};

export const headerAnnouncementsData: HeaderAnnouncementsData = {
  labels: { desktop: 'Important Announcements:', mobile: 'News:' },
  items: [
    { title: 'Admission 2024-25 Session Open - Apply Now', href: '/admissions/apply' },
    { title: 'Placement Drive 2024 - Register Today', href: '/placements/register' },
    { title: 'Annual Tech Fest "INNOVATE 2024" - March 15-17', href: '/events/tech-fest' },
    { title: 'Library New Books Collection Available', href: '/library' },
    { title: 'Scholarship Applications Open - Merit & Need Based', href: '/admissions/scholarship' },
  ],
};

export const footerContactInfoData: FooterContactInfoData = {
  items: [
    {
      key: 'address',
      title: 'Campus Address',
      text: 'Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089',
      href: 'https://www.google.com/maps/place/Bhagwan+Parshuram+Institute+of+Technology/@28.7366529,77.1097591,17z',
    },
    {
      key: 'phone',
      title: 'Phone Numbers',
      text: '011-2757 1080, 011-2757 2900',
      href: 'tel:01127571080',
    },
    {
      key: 'email',
      title: 'Email Address',
      text: 'bpitindia@yahoo.com',
      href: 'mailto:bpitindia@yahoo.com',
    },
  ],
};

export const footerBottomLeftContent: FooterBottomLeftContent = {
  copyright:
    '© 2024 Bhagwan Parshuram Institute of Technology. All rights reserved.',
  accreditation: 'Affiliated to GGSIPU | NBA Accredited | NAAC Certified',
};
