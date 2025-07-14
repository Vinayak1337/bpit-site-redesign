import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function GET() {
  try {
    const IPU_ADMISSION_URL = 'http://www.ipu.ac.in/admission2025main2.php';
    
    const response = await axios.get(IPU_ADMISSION_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Function to find brochure links
    const findBrochureLinks = () => {
      const brochureLinks: {
        undergraduate?: string;
        postgraduate?: string;
        ugText?: string;
        pgText?: string;
      } = {};

      // Look for PDF links that might be brochures
      $('a[href*=".pdf"]').each((index, element) => {
        const href = $(element).attr('href');
        const text = $(element).text().toLowerCase().trim();
        const fullUrl = href?.startsWith('http') ? href : `http://www.ipu.ac.in/${href}`;

        // Check for undergraduate brochure patterns
        if (text.includes('undergraduate') || 
            text.includes('ug') || 
            text.includes('bachelor') || 
            text.includes('b.tech') || 
            text.includes('btech') ||
            href?.includes('brug') ||
            href?.includes('UG') ||
            href?.includes('undergraduate')) {
          brochureLinks.undergraduate = fullUrl;
          brochureLinks.ugText = $(element).text().trim();
        }

        // Check for postgraduate brochure patterns
        if (text.includes('postgraduate') || 
            text.includes('pg') || 
            text.includes('master') || 
            text.includes('mba') || 
            text.includes('m.tech') ||
            href?.includes('brPG') ||
            href?.includes('PG') ||
            href?.includes('postgraduate')) {
          brochureLinks.postgraduate = fullUrl;
          brochureLinks.pgText = $(element).text().trim();
        }

        // Alternative: Look for specific patterns in href
        if (href?.includes('adm') && href?.includes('brug')) {
          brochureLinks.undergraduate = fullUrl;
          brochureLinks.ugText = $(element).text().trim() || 'Undergraduate Brochure';
        }

        if (href?.includes('adm') && href?.includes('brPG')) {
          brochureLinks.postgraduate = fullUrl;
          brochureLinks.pgText = $(element).text().trim() || 'Postgraduate Brochure';
        }
      });

      // Also look in table cells and divs for brochure links
      $('td, div').each((index, element) => {
        const text = $(element).text().toLowerCase();
        if (text.includes('brochure') || text.includes('prospectus')) {
          $(element).find('a[href*=".pdf"]').each((i, linkElement) => {
            const href = $(linkElement).attr('href');
            const linkText = $(linkElement).text().toLowerCase().trim();
            const fullUrl = href?.startsWith('http') ? href : `http://www.ipu.ac.in/${href}`;

            if ((linkText.includes('undergraduate') || linkText.includes('ug') || href?.includes('brug')) && !brochureLinks.undergraduate) {
              brochureLinks.undergraduate = fullUrl;
              brochureLinks.ugText = $(linkElement).text().trim();
            }

            if ((linkText.includes('postgraduate') || linkText.includes('pg') || href?.includes('brPG')) && !brochureLinks.postgraduate) {
              brochureLinks.postgraduate = fullUrl;
              brochureLinks.pgText = $(linkElement).text().trim();
            }
          });
        }
      });

      return brochureLinks;
    };

    const brochureLinks = findBrochureLinks();

    const fallbackBrochures = {
      undergraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
      postgraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
      ugText: 'Undergraduate Brochure',
      pgText: 'Postgraduate Brochure'
    };

    // Return success if we found at least one brochure
    const hasFoundBrochures = brochureLinks.undergraduate || brochureLinks.postgraduate;

    return NextResponse.json({
      success: hasFoundBrochures,
      brochures: hasFoundBrochures ? brochureLinks : null,
      fallback: fallbackBrochures,
      scrapedAt: new Date().toISOString(),
      sourceUrl: IPU_ADMISSION_URL
    });

  } catch (error) {
    // Log error for debugging purposes
    // console.error('Error scraping brochures:', error);
    
    // Return fallback URLs in case of error
    return NextResponse.json({
      success: false,
      brochures: null,
      fallback: {
        undergraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
        postgraduate: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
        ugText: 'Undergraduate Brochure',
        pgText: 'Postgraduate Brochure'
      },
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      scrapedAt: new Date().toISOString(),
      sourceUrl: 'http://www.ipu.ac.in/admission2025main2.php'
    });
  }
}
