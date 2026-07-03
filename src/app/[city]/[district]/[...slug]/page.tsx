import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
import { getLandingMetadata, getArticleJsonLd, getBreadcrumbJsonLd, DOMAIN, BRAND_NAME, INDEXED_DONG_COMBINATIONS, SEO_IMAGE_MAP } from '@/lib/seo';
import MainTemplate from '@/components/MainTemplate';

type Props = {
  params: Promise<{ city: string; district: string; slug: string[] }>;
};

function getRegionAndService(city: string, district: string, slug: string[]) {
  if (!slug || slug.length === 0) return { region: null, service: null };
  const serviceSlug = slug[slug.length - 1];
  const subDistrictSlug = slug.length > 1 ? slug[0] : 'all';

  const service = services.find(s => s.serviceSlug === serviceSlug);
  const region = regions.find(r => 
    r.regionSlug === city && 
    r.districtSlug === district && 
    r.subDistrictSlug === subDistrictSlug
  );

  return { region, service };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, district, slug } = await params;
  const { region, service } = getRegionAndService(city, district, slug);

  if (!region || !service) {
    return {};
  }

  return getLandingMetadata(region.districtSlug, region.subDistrictSlug, service.id);
}

export default async function LandingPage({ params }: Props) {
  const { city, district, slug } = await params;
  const { region, service } = getRegionAndService(city, district, slug);

  if (!region || !service) {
    notFound();
  }

  const regionName = region.subDistrict === '전지역' ? region.district : region.subDistrict;

  // Naver SEO를 위한 FAQ 스키마 생성
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': service.faq.map(item => ({
      '@type': 'Question',
      'name': item.question.replace('{service}', service.serviceNameKo).replace('{region}', regionName),
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer.replace('{service}', service.serviceNameKo).replace('{region}', regionName)
      }
    }))
  };

  const isDistrictLevel = region.subDistrict === '전지역';
  const shortDistrict = region.district.replace(/(구|시)$/, '');
  const titleRegion = isDistrictLevel ? `${region.district} ${shortDistrict}` : region.subDistrict;
  const descRegion = isDistrictLevel ? `${region.district}(${shortDistrict})` : region.subDistrict;

  // SEO 최적화 메타데이터 생성 (동일 로직 재사용)
  const title = `${titleRegion} ${service.serviceNameKo} 전문업체 | ${BRAND_NAME}`;
  const description = `${descRegion} ${service.serviceNameKo} 고민 해결! ${BRAND_NAME}은 ${service.serviceNameKo} 전문 업체로서 ${service.shortDescription}을 위해 24시간 친절 상담 및 무료 견적을 제공합니다.`;
  
  const path = region.subDistrictSlug === 'all'
    ? `/${region.regionSlug}/${region.districtSlug}/${service.serviceSlug}`
    : `/${region.regionSlug}/${region.districtSlug}/${region.subDistrictSlug}/${service.serviceSlug}`;
  
  const url = `${DOMAIN}${path}`;
  
  const seoImage = SEO_IMAGE_MAP[service.serviceNameKo];
  const imageUrl = seoImage ? seoImage.image : service.imageUrl;
  const articleJsonLd = getArticleJsonLd(title, description, url, imageUrl);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(regionName, service.serviceNameKo, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MainTemplate region={regionName} service={service.serviceNameKo} regionObj={region} />
    </>
  );
}

export async function generateStaticParams() {
  const params: { city: string; district: string; slug: string[] }[] = [];

  // 1. 모든 구 단위 서비스 페이지 조합 추가 (25개 구 * 11개 서비스 = 275개)
  const guRegions = regions.filter(r => r.subDistrictSlug === 'all');
  const activeServices = services.filter(s => s.indexStatus === 'index');

  guRegions.forEach(region => {
    activeServices.forEach(service => {
      params.push({
        city: region.regionSlug,
        district: region.districtSlug,
        slug: [service.serviceSlug]
      });
    });
  });

  // 2. 인덱싱 지정된 핵심 동 단위 조합 추가 (20개 조합)
  INDEXED_DONG_COMBINATIONS.forEach(combo => {
    const service = services.find(s => combo.endsWith(s.id) || combo.endsWith(s.serviceSlug));
    if (service) {
      const matchedSuffix = combo.endsWith(service.id) ? service.id : service.serviceSlug;
      const regionPart = combo.slice(0, -(matchedSuffix.length + 1));
      const regionParts = regionPart.split('-');
      if (regionParts.length >= 2) {
        const districtSlug = regionParts[0];
        const subDistrictSlug = regionParts.slice(1).join('-');

        const region = regions.find(r => 
          r.districtSlug === districtSlug && 
          r.subDistrictSlug === subDistrictSlug
        );
        if (region) {
          params.push({
            city: region.regionSlug,
            district: region.districtSlug,
            slug: [region.subDistrictSlug, service.serviceSlug]
          });
        }
      }
    }
  });

  return params;
}
