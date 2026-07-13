import { NextResponse } from 'next/server';
import { regions } from '@/data/regions';
import { keywords } from '@/data/keywords';
import { DOMAIN } from '@/lib/seo';
import { generateSitemapXml } from '@/lib/sitemap-utils';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const fileName = id.replace('.xml', '');
  
  let urls: any[] = [];

  if (fileName === 'sitemap-static') {
    urls.push({ url: DOMAIN, priority: 1.0, changeFrequency: 'daily' });
    urls.push({ url: `${DOMAIN}/sitemap-seoul`, priority: 0.9, changeFrequency: 'weekly' });
    urls.push({ url: `${DOMAIN}/sitemap-gyeonggi`, priority: 0.9, changeFrequency: 'weekly' });
  } 
  
  else if (fileName === 'sitemap-seoul') {
    const activeKeywords = keywords.filter(kw => kw.indexStatus === 'index' && !kw.canonicalTarget);
    activeKeywords.forEach(kw => {
      const matched = regions.find(r => {
        if (kw.regionType === 'district') {
          return r.district === kw.regionName && r.subDistrict === '전지역';
        } else {
          return r.subDistrict === kw.regionName;
        }
      });
      if (matched && matched.city === '서울') {
        urls.push({
          url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
          priority: kw.regionType === 'district' ? 0.7 : 0.5,
          changeFrequency: 'weekly'
        });
      }
    });
  }

  else if (fileName === 'sitemap-incheon') {
    const activeKeywords = keywords.filter(kw => kw.indexStatus === 'index' && !kw.canonicalTarget);
    activeKeywords.forEach(kw => {
      const matched = regions.find(r => {
        if (kw.regionType === 'district') {
          return r.district === kw.regionName && r.subDistrict === '전지역';
        } else {
          return r.subDistrict === kw.regionName;
        }
      });
      if (matched && matched.city === '인천') {
        urls.push({
          url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
          priority: kw.regionType === 'district' ? 0.7 : 0.5,
          changeFrequency: 'weekly'
        });
      }
    });
  }

  else if (fileName === 'sitemap-gyeonggi') {
    const activeKeywords = keywords.filter(kw => kw.indexStatus === 'index' && !kw.canonicalTarget);
    activeKeywords.forEach(kw => {
      const matched = regions.find(r => {
        if (kw.regionType === 'district') {
          return r.district === kw.regionName && r.subDistrict === '전지역';
        } else {
          return r.subDistrict === kw.regionName;
        }
      });
      if (matched && matched.city === '경기') {
        urls.push({
          url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
          priority: kw.regionType === 'district' ? 0.7 : 0.5,
          changeFrequency: 'weekly'
        });
      }
    });
  }

  else if (fileName === 'sitemap-main') {
    // 1. 메인 페이지 및 sitemap-seoul 추가
    urls.push({ url: DOMAIN, priority: 1, changeFrequency: 'daily' });
    urls.push({ url: `${DOMAIN}/sitemap-seoul`, priority: 0.9, changeFrequency: 'weekly' });

    // 2. 구 단위 동적 키워드 중 index 대상 추가 (예: 강남구-외벽청소)
    keywords.filter(kw => kw.regionType === 'district' && kw.indexStatus === 'index' && !kw.canonicalTarget).forEach(kw => {
      urls.push({
        url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
        priority: 0.7,
        changeFrequency: 'weekly'
      });
    });
  } 
  
  else if (fileName.startsWith('sitemap-keyword-')) {
    // 각 구 단위별 산하 동 단위 동적 키워드 중 index 대상 추가 (예: 역삼동-외벽청소)
    const districtSlug = fileName.replace('sitemap-keyword-', '');
    const districtRegion = regions.find(r => r.districtSlug === districtSlug && r.subDistrictSlug === 'all');
    
    if (districtRegion) {
      const dongsOfDistrict = regions.filter(r => r.districtSlug === districtSlug && r.subDistrictSlug !== 'all').map(r => r.subDistrict);
      keywords.filter(kw => kw.regionType === 'dong' && dongsOfDistrict.includes(kw.regionName) && kw.indexStatus === 'index' && !kw.canonicalTarget).forEach(kw => {
        urls.push({
          url: `${DOMAIN}/?k=${encodeURIComponent(kw.urlKeyword)}`,
          priority: 0.5,
          changeFrequency: 'weekly'
        });
      });
    }
  }

  if (urls.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const xml = generateSitemapXml(urls);

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
