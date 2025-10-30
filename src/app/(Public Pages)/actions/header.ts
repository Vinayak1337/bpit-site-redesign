"use server";
import "server-only";

import { headerContactData, headerAnnouncementsData } from '@/data/header';

export async function getHeaderData(): Promise<{
  contactData: HeaderContactUsData;
  announcementsData: HeaderAnnouncementsData;
}> {
  await new Promise(resolve => setTimeout(resolve, 150));
  return {
    contactData: headerContactData,
    announcementsData: headerAnnouncementsData,
  };
}
