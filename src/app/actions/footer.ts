"use server";
import "server-only";

import { prisma } from '@/lib/prisma';
import { footerContactInfoData, footerBottomLeftContent } from '@/data/header';

export async function getFooterData(): Promise<{
  contactInfoData: FooterContactInfoData;
  bottomLeftContent: FooterBottomLeftContent;
}> {
  await new Promise((r) => setTimeout(r, 120));

  if (prisma) {
    try {
      const contactItems = await prisma.footerContactInfo.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });
      const bottom = await prisma.footerBottomInfo.findFirst({
        orderBy: { updatedAt: 'desc' },
      });

      const contactInfoFromDb: FooterContactInfoData | null = contactItems && contactItems.length
        ? {
            items: contactItems.map((it: any) => ({
              key: it.key as FooterContactType,
              title: it.title,
              text: it.text,
              href: it.href,
            })),
          }
        : null;

      const bottomFromDb: FooterBottomLeftContent | null = bottom
        ? {
            copyright: bottom.copyright,
            accreditation: bottom.accreditation,
          }
        : null;

      return {
        contactInfoData: contactInfoFromDb ?? footerContactInfoData,
        bottomLeftContent: bottomFromDb ?? footerBottomLeftContent,
      };
    } catch (_e) {
      return {
        contactInfoData: footerContactInfoData,
        bottomLeftContent: footerBottomLeftContent,
      };
    }
  }

  return {
    contactInfoData: footerContactInfoData,
    bottomLeftContent: footerBottomLeftContent,
  };
}

