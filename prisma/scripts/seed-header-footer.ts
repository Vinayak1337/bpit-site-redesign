/*
  Seed header + footer content using static data from src/data/header.ts
  Run with: node -e "import('./prisma/scripts/seed-header-footer.ts').then(m=>m.main())"
  or using ts-node/tsx if available.
*/

import { PrismaClient } from '@prisma/client';
import {
  headerContactData,
  headerAnnouncementsData,
  footerContactInfoData,
  footerBottomLeftContent,
} from '../../src/data/header';

export async function main() {
  const prisma = new PrismaClient();
  try {
    // Header Contact Setting: upsert (findFirst then update or create)
    const existingContact = await prisma.headerContactSetting.findFirst();
    if (existingContact) {
      await prisma.headerContactSetting.update({
        where: { id: existingContact.id },
        data: {
          phoneTel: headerContactData.phone.tel,
          phoneDisplay: headerContactData.phone.display,
          email: headerContactData.email,
          address: headerContactData.address,
          mapUrl: headerContactData.mapUrl,
          accreditationMobile: headerContactData.accreditation.mobile,
          accreditationDesktop: headerContactData.accreditation.desktop,
        },
      });
    } else {
      await prisma.headerContactSetting.create({
        data: {
          phoneTel: headerContactData.phone.tel,
          phoneDisplay: headerContactData.phone.display,
          email: headerContactData.email,
          address: headerContactData.address,
          mapUrl: headerContactData.mapUrl,
          accreditationMobile: headerContactData.accreditation.mobile,
          accreditationDesktop: headerContactData.accreditation.desktop,
        },
      });
    }

    // Header Announcements: replace all
    await prisma.headerAnnouncement.deleteMany({});
    await prisma.headerAnnouncement.createMany({
      data: headerAnnouncementsData.items.map((it, idx) => ({
        title: it.title,
        href: it.href,
        order: idx,
        active: true,
      })),
    });

    // Footer Contact Info: replace all
    await prisma.footerContactInfo.deleteMany({});
    await prisma.footerContactInfo.createMany({
      data: footerContactInfoData.items.map((it, idx) => ({
        key: it.key,
        title: it.title,
        text: it.text,
        href: it.href,
        order: idx,
      })),
    });

    // Footer Bottom Left content: upsert (single row)
    const existingBottom = await prisma.footerBottomInfo.findFirst();
    if (existingBottom) {
      await prisma.footerBottomInfo.update({
        where: { id: existingBottom.id },
        data: {
          copyright: footerBottomLeftContent.copyright,
          accreditation: footerBottomLeftContent.accreditation,
        },
      });
    } else {
      await prisma.footerBottomInfo.create({
        data: {
          copyright: footerBottomLeftContent.copyright,
          accreditation: footerBottomLeftContent.accreditation,
        },
      });
    }

    console.log('Seed completed: header + footer');
  } catch (err) {
    console.error('Seed failed', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

// Allow running directly with TS/ESM loaders
if (require.main === module) {
  main();
}

