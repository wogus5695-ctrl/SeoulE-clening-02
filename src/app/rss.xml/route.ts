import { NextResponse } from 'next/server';
import { DOMAIN, BRAND_NAME } from '@/lib/seo';
import { regions } from '@/data/regions';
import { services } from '@/data/services';

export async function GET() {
  const districts = regions.filter(r => r.subDistrictSlug === 'all');
  const items: string[] = [];

  // 구 단위 서비스 페이지들을 RSS 아이템으로 구성
  districts.forEach(d => {
    services.filter(s => s.indexStatus === 'index').forEach(s => {
      const url = `${DOMAIN}/${d.regionSlug}/${d.districtSlug}/${s.serviceSlug}`;
      items.push(`
    <item>
      <title><![CDATA[${d.district} ${s.serviceNameKo} 전문 업체 | ${BRAND_NAME}]]></title>
      <link>${url}</link>
      <description><![CDATA[${d.district} 전 지역 ${s.serviceNameKo} 전문 서비스 안내. ${s.shortDescription}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${url}</guid>
    </item>`);
    });
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BRAND_NAME} - 서울·경기 종합청소 서비스</title>
    <link>${DOMAIN}</link>
    <description>외벽청소, 유리창청소, 화재청소 등 종합청소 전문</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items.join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
