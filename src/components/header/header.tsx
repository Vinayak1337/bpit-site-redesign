import React from 'react';
import HeaderContactUs from './HeaderContactUs';
import ImportantAnnouncement from './ImportantAnnouncement';
import Navbar from './Navbar';

type HeaderProps = {
  contactData: HeaderContactUsData;
  announcementsData: HeaderAnnouncementsData;
};

const Header = ({ contactData, announcementsData }: HeaderProps) => (
	<>
		<HeaderContactUs data={contactData} />
		<ImportantAnnouncement data={announcementsData} />
		<Navbar />
	</>
);

export default Header;
