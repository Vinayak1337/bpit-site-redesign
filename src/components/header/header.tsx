import React from 'react';
import HeaderContactUs from './HeaderContactUs';
import ImportantAnnouncement from './ImportantAnnouncement';
import Navbar from './Navbar';
import { ContactType } from '@prisma/client';

type ContactDTO = {
	type: ContactType;
	value: string;
	displayValue: string | null;
};

type HeaderProps = {
	contacts: ContactDTO[];
	announcementsData: HeaderAnnouncementsData;
};

const Header = ({ contacts, announcementsData }: HeaderProps) => (
	<>
		<HeaderContactUs contacts={contacts} />
		<ImportantAnnouncement data={announcementsData} />
		<Navbar />
	</>
);

export default Header;
