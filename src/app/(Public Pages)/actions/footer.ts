"use server";
import "server-only";

import { footerContactInfoData, footerBottomLeftContent } from '@/data/header';

export async function getFooterData(): Promise<{
  contactInfoData: FooterContactInfoData;
  bottomLeftContent: FooterBottomLeftContent;
}> {
  await new Promise((r) => setTimeout(r, 120));
  return {
    contactInfoData: footerContactInfoData,
    bottomLeftContent: footerBottomLeftContent,
  };
}

