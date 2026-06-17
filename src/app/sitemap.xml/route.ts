import { NextResponse } from 'next/server';
import { DOMAIN } from '@/lib/seo';
import { keywords } from '@/data/keywords';
import { generateSitemapXml } from '@/lib/sitemap-utils';

export async function GET() {
  const urls: any[] = [];

  // 1. 메인 및 사이트맵 페이지
  urls.push({ url: DOMAIN, priority: 1.0, changeFrequency: 'daily' });
  urls.push({ url: `${DOMAIN}/sitemap-seoul`, priority: 0.9, changeFrequency: 'weekly' });

  // 2. indexStatus가 index이고 canonicalTarget이 지정되지 않은 (중복 제거) 키워드 URL (/?k=...)
  keywords.filter(kw => kw.indexStatus === 'index' && !kw.canonicalTarget).forEach(kw => {
    urls.push({
      url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
      priority: 0.7,
      changeFrequency: 'weekly'
    });
  });

  // 단일 XML 사이트맵 생성
  const xml = generateSitemapXml(urls);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
