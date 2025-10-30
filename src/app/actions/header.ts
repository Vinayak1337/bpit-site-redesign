"use server";
import "server-only";

import { headerContactData, headerAnnouncementsData } from '@/data/header';
import { prisma } from '@/lib/prisma';

export async function getHeaderData(): Promise<{
  contactData: HeaderContactUsData;
  announcementsData: HeaderAnnouncementsData;
}> {
  // Simulate server latency
  await new Promise(resolve => setTimeout(resolve, 150));

  // Try DB first
  if (prisma) {
    try {
      const contact = await prisma.headerContactSetting.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
      const items = await prisma.headerAnnouncement.findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });

      const contactDataFromDb: HeaderContactUsData | null = contact
        ? {
            phone: { tel: contact.phoneTel, display: contact.phoneDisplay },
            email: contact.email,
            address: contact.address,
            mapUrl: contact.mapUrl,
            accreditation: {
              mobile: contact.accreditationMobile,
              desktop: contact.accreditationDesktop,
            },
          }
        : null;

      const announcementsFromDb: HeaderAnnouncementsData | null = items && items.length
        ? {
            labels: { desktop: 'Important Announcements:', mobile: 'News:' },
            items: items.map((it: any) => ({ title: it.title, href: it.href })),
          }
        : null;

      return {
        contactData: contactDataFromDb ?? headerContactData,
        announcementsData: announcementsFromDb ?? headerAnnouncementsData,
      };
    } catch (_err) {
      // Fallback
      return {
        contactData: headerContactData,
        announcementsData: headerAnnouncementsData,
      };
    }
  }

  // No prisma, fallback
  return {
    contactData: headerContactData,
    announcementsData: headerAnnouncementsData,
  };
}
