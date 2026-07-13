import { NextResponse } from 'next/server';
import { DOMAIN } from '@/lib/seo';

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemaps/sitemap-static.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemaps/sitemap-seoul.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemaps/sitemap-incheon.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemaps/sitemap-gyeonggi.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
