import { Metadata } from 'next';
import { services } from '@/data/services';
import { regions } from '@/data/regions';
import { serviceContents } from '@/data/service-contents';

// 초기 인덱싱 권장 동 단위 조합 (구Slug-동Slug-서비스Id)
export const INDEXED_DONG_COMBINATIONS = [
  'gangdong-cheonhodong-completion',
  'songpa-jamsildong-window',
  'gwangjin-guuidong-floor-wax-coating',
  'seongdong-seongsudong-interior-post-cleaning',
  'jungnang-sangbongdong-awning',
  'nowon-sanggyedong-special-cleaning',
];

// --- 브랜드 환경 설정 (추후 관리자 입력 가능하도록 변수 처리) ---
export const BRAND_NAME = '올케어서비스';
export const BUSINESS_NAME = '올케어서비스';
export const DOMAIN = 'https://www.allcareseoul.co.kr';
export const CONTACT_PHONE = '010-8189-6900'; // 전화번호
export const CONTACT_SMS = 'sms:010-8189-6900'; // 문자 상담 링크
export const CONTACT_KAKAOTALK = 'https://open.kakao.com/o/sallcare'; // 카카오톡 상담 링크
export const BUSINESS_ADDRESS = '서울특별시 송파구 올림픽로'; // 사업장 주소
export const BUSINESS_NUMBER = '405-15-02677'; // 사업자 등록 번호
export const BUSINESS_OWNER = '김재현'; // 대표자명
export const DEFAULT_OG_IMAGE = `/images/seo-thumbnails/allcare-cleaning-main.webp`;
export const NAVER_VERIFICATION = 'f89acb1b81e4f71333fd80b4a090c53cde40ab89'; // 네이버 서치어드바이저 연동 코드
export const GOOGLE_VERIFICATION = 'blHhDPGG_HSm0Di8-FnxZzNBgTIYz9uT_oO4F_SdmRs'; // 구글 서치 콘솔 연동 코드

// 작업명별 SEO 썸네일 이미지 및 altBase 정보 정의
export const SEO_IMAGE_MAP: {
  [serviceName: string]: {
    image: string;
    altBase: string;
  }
} = {
  '외벽청소': {
    image: '/images/seo-thumbnails/exterior-cleaning.webp',
    altBase: '외벽청소 건물 외벽 오염 정리 현장'
  },
  '유리창청소': {
    image: '/images/seo-thumbnails/window-cleaning.webp',
    altBase: '유리창청소 유리 물때와 빗물 얼룩 정리 현장'
  },
  '화재청소': {
    image: '/images/seo-thumbnails/fire-cleaning.webp',
    altBase: '화재청소 그을음과 분진 정리 현장'
  },
  '화재현장 청소': {
    image: '/images/seo-thumbnails/fire-cleaning.webp',
    altBase: '화재청소 그을음과 분진 정리 현장'
  },
  '바닥왁스코팅': {
    image: '/images/seo-thumbnails/floor-wax-coating.webp',
    altBase: '바닥왁스코팅 바닥 광택 관리 현장'
  },
  '바닥청소 및 왁스코팅': {
    image: '/images/seo-thumbnails/floor-wax-coating.webp',
    altBase: '바닥왁스코팅 바닥 광택 관리 현장'
  },
  '어닝청소': {
    image: '/images/seo-thumbnails/awning-signboard-cleaning.jpg',
    altBase: '어닝청소 매장 어닝 오염 정리 현장'
  },
  '어닝/간판청소': {
    image: '/images/seo-thumbnails/awning-signboard-cleaning.jpg',
    altBase: '어닝청소 매장 어닝 오염 정리 현장'
  },
  '간판청소': {
    image: '/images/seo-thumbnails/awning-signboard-cleaning.jpg',
    altBase: '간판청소 매장 간판 오염 정리 현장'
  },
  '인테리어 후 청소': {
    image: '/images/seo-thumbnails/construction-cleaning.webp',
    altBase: '인테리어 후 청소 공사 분진 정리 현장'
  },
  '준공청소': {
    image: '/images/seo-thumbnails/construction-cleaning.webp',
    altBase: '준공청소 공사 후 분진과 잔여물 정리 현장'
  },
  '준공/인테리어 후 청소': {
    image: '/images/seo-thumbnails/construction-cleaning.webp',
    altBase: '준공청소 공사 후 분진과 잔여물 정리 현장'
  },
  '후드청소': {
    image: '/images/seo-thumbnails/hood-cleaning.webp',
    altBase: '후드청소 주방 후드 기름때 관리 현장'
  },
  '특수청소': {
    image: '/images/seo-thumbnails/special-cleaning.webp',
    altBase: '특수청소 방치 공간 오염 정리 현장'
  },
  '쓰레기집/특수 청소': {
    image: '/images/seo-thumbnails/special-cleaning.webp',
    altBase: '특수청소 방치 공간 오염 정리 현장'
  },
  '바닥청소': {
    image: '/images/seo-thumbnails/floor-wax-coating.webp',
    altBase: '바닥청소 바닥 오염과 찌든 때 정리 현장'
  },
  '쓰레기집 청소': {
    image: '/images/seo-thumbnails/special-cleaning.webp',
    altBase: '쓰레기집 청소 생활폐기물 정리 현장'
  }
};

// 실제 public 폴더 내에 존재하는 유효한 썸네일 이미지 화이트리스트
export const VALID_OG_IMAGES = [
  '/images/services/outer-wall.jpg',
  '/images/services/window.jpg',
  '/images/services/fire.jpg',
  '/images/services/floor-wax.jpg',
  '/images/services/awning.jpg',
  '/images/services/signboard.jpg',
  '/images/services/interior-post.jpg',
  '/images/services/completion.jpg',
  '/images/services/hood.jpg',
  '/images/services/trash-house.jpg',
  '/images/services/special-cleaning.jpg',
  '/images/services/awning-sign.jpg',
  '/images/services/interior-completion.jpg',
  '/images/og-main.jpg',
  '/images/og-image.jpg',
  '/images/hero-bg.jpg',
  '/images/seo-thumbnails/exterior-cleaning.webp',
  '/images/seo-thumbnails/window-cleaning.webp',
  '/images/seo-thumbnails/fire-cleaning.webp',
  '/images/seo-thumbnails/floor-wax-coating.webp',
  '/images/seo-thumbnails/awning-signboard-cleaning.jpg',
  '/images/seo-thumbnails/construction-cleaning.webp',
  '/images/seo-thumbnails/hood-cleaning.webp',
  '/images/seo-thumbnails/special-cleaning.webp',
  '/images/seo-thumbnails/allcare-cleaning-main.webp',
];

// --- SEO 기본 메타데이터 생성기 ---
interface SeoOptions {
  title: string;
  description: string;
  path: string;
  indexStatus?: 'index' | 'noindex';
  canonicalTarget?: string | null;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

export function getBaseMetadata({ 
  title, 
  description, 
  path, 
  indexStatus = 'index', 
  canonicalTarget,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  ogImage,
  ogImageAlt,
  ogImageWidth = 1200,
  ogImageHeight = 630
}: SeoOptions): Metadata {
  let canonicalUrl = `${DOMAIN}${path}`;
  if (path === '' || path === '/') {
    canonicalUrl = `${DOMAIN}/`;
  }
  let robots = indexStatus === 'index' ? 'index, follow' : 'noindex, follow';

  if (indexStatus === 'noindex') {
    if (canonicalTarget) {
      // canonicalTarget이 있는 경우: canonical을 우선하여 봇이 신호를 전달하게 함.
      // 구글/네이버 가이드라인 상 noindex와 canonical의 충돌을 막기 위해 robots를 index, follow로 둔다.
      robots = 'index, follow';
      canonicalUrl = canonicalTarget.startsWith('http') ? canonicalTarget : `${DOMAIN}${canonicalTarget}`;
    } else {
      // canonicalTarget이 없는 경우: 순수 noindex로 처리
      robots = 'noindex, follow';
      canonicalUrl = `${DOMAIN}${path}`;
    }
  } else { // indexStatus === 'index'
    robots = 'index, follow';
    canonicalUrl = canonicalTarget 
      ? (canonicalTarget.startsWith('http') ? canonicalTarget : `${DOMAIN}${canonicalTarget}`)
      : `${DOMAIN}${path}`;
  }
  
  let finalOgImage = `${DOMAIN}${DEFAULT_OG_IMAGE}`;
  if (ogImage) {
    if (ogImage.startsWith('http')) {
      finalOgImage = ogImage;
    } else {
      // 화이트리스트에 정확히 존재하는 이미지인지 검증하여 안정성 100% 보장
      const isValid = VALID_OG_IMAGES.some(validPath => 
        ogImage === validPath || ogImage.replace(/\/+/, '/') === validPath
      );
      if (isValid) {
        finalOgImage = `${DOMAIN}${ogImage}`;
      } else {
        // 비정상 경로이거나 파일이 존재하지 않는 경우 자동으로 외벽청소(기본) 이미지로 폴백
        finalOgImage = `${DOMAIN}${DEFAULT_OG_IMAGE}`;
      }
    }
  }

  const finalAlt = ogImageAlt || title;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robots,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      type: ogType,
      images: [{ url: finalOgImage, width: ogImageWidth, height: ogImageHeight, alt: finalAlt }],
      siteName: BRAND_NAME,
      publishedTime: publishedTime,
      modifiedTime: modifiedTime,
    } as any,
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [finalOgImage],
    },
  };
}

// --- 페이지 유형별 메타데이터 생성 ---

// 1. 메인 페이지
export function getMainMetadata(): Metadata {
  return getBaseMetadata({
    title: `서울 종합청소 전문 | ${BRAND_NAME}`,
    description: `서울 상가, 빌딩, 사무실, 음식점, 준공 현장 청소가 필요할 때 올케어서비스가 오염 상태와 작업 범위에 맞춰 상담을 안내합니다.`,
    path: '',
    indexStatus: 'index',
  });
}

// 2. 서비스 상세 페이지
export function getServiceMetadata(serviceId: string): Metadata {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return { title: BRAND_NAME };

  return getBaseMetadata({
    title: `${service.serviceNameKo} | ${BRAND_NAME}`,
    description: `${BRAND_NAME}은 ${service.serviceNameKo} 작업을 현장 특성에 맞춰 정리합니다. ${service.shortDescription}에 근거하여 상가, 빌딩, 사무실의 상태를 진단 후 대응합니다.`,
    indexStatus: service.indexStatus,
    path: `/service/${service.serviceSlug}`,
    ogImage: service.imageUrl,
  });
}

// 3. 지역 허브 페이지
export function getRegionMetadata(districtSlug: string): Metadata {
  const region = regions.find((r) => r.districtSlug === districtSlug && r.subDistrictSlug === 'all');
  if (!region) return { title: BRAND_NAME };

  return getBaseMetadata({
    title: `${region.district} 종합청소 전문 | ${BRAND_NAME}`,
    description: `${region.district} 전 지역 종합청소 전문업체 ${BRAND_NAME}입니다. ${region.localDescription} 빌딩, 상가, 사무실 무료 견적 상담 가능.`,
    indexStatus: region.indexStatus,
    path: `/area/${region.regionSlug}/${region.districtSlug}`,
  });
}

// 4. 지역+작업명 통합 랜딩 페이지 (구/동 공통)
export function getLandingMetadata(districtSlug: string, subDistrictSlug: string, serviceId: string): Metadata {
  const region = regions.find((r) => r.districtSlug === districtSlug && r.subDistrictSlug === subDistrictSlug);
  const service = services.find((s) => s.id === serviceId);

  if (!region || !service) return { title: '올케어서비스' };

  const regionName = region.subDistrict === '전지역' ? region.district : `${region.district} ${region.subDistrict}`;
  
  // 인덱싱 로직 (구 및 동 단위 모든 유효 페이지는 index 상태로 지정)
  const parentRegion = regions.find((r) => r.districtSlug === districtSlug && r.subDistrictSlug === 'all');
  const isParentIndexed = parentRegion ? parentRegion.indexStatus === 'index' : true;
  const indexStatus: 'index' | 'noindex' = (region.indexStatus === 'index' && isParentIndexed && service.indexStatus === 'index') ? 'index' : 'noindex';

  // clean URL 기반 path 지정
  const path = subDistrictSlug === 'all'
    ? `/${region.regionSlug}/${region.districtSlug}/${service.serviceSlug}`
    : `/${region.regionSlug}/${region.districtSlug}/${region.subDistrictSlug}/${service.serviceSlug}`;

  const customContent = serviceContents[service.serviceNameKo];
  const description = customContent
    ? customContent.intro.replace(/{region}/g, regionName)
    : `${regionName} ${service.serviceNameKo} 전문 청소 상담을 안내합니다.`;

  const seoImage = SEO_IMAGE_MAP[service.serviceNameKo];
  const ogImage = seoImage ? seoImage.image : service.imageUrl;
  const ogImageAlt = seoImage ? `${regionName} ${seoImage.altBase}` : `${regionName} ${service.serviceNameKo} 전문 청소 현장`;

  return getBaseMetadata({
    title: `${regionName} ${service.serviceNameKo} 전문 | 올케어서비스`,
    description: description,
    indexStatus: indexStatus,
    path: path,
    ogType: 'article',
    publishedTime: new Date().toISOString(),
    modifiedTime: new Date().toISOString(),
    ogImage: ogImage,
    ogImageAlt: ogImageAlt,
    ogImageWidth: 1200,
    ogImageHeight: 630
  });
}

// 5. 키워드 허브 페이지
export function getKeywordHubMetadata(cityDistrict: string): Metadata {
  const parts = cityDistrict.split('-');
  const districtSlug = parts.slice(1).join('-');
  const region = regions.find(r => r.districtSlug === districtSlug && r.subDistrictSlug === 'all');
  
  if (!region) return { title: BRAND_NAME };

  return getBaseMetadata({
    title: `${region.district} 청소 작업 키워드 허브 | ${BRAND_NAME}`,
    description: `${region.district} 내 각 동네별 최적화된 청소 서비스 페이지를 안내합니다. 외벽, 유리창, 준공 등 작업별 상세 정보를 확인하세요.`,
    indexStatus: 'index',
    path: `/keyword-hub/${cityDistrict}`,
  });
}

// 6. 마스터 사이트맵 (서울 지역 키워드 맵)
export function getSitemapMetadata(): Metadata {
  return getBaseMetadata({
    title: `서울 지역별 청소 키워드 안내 | ${BRAND_NAME}`,
    description: `서울 주요 지역(송파, 강동, 광진, 성동, 노원, 중랑 등)의 구/동별 청소 서비스 키워드를 한눈에 확인하세요. 외벽, 유리창, 준공 등 맞춤형 솔루션을 안내합니다.`,
    indexStatus: 'index',
    path: `/sitemap-seoul`,
  });
}

// --- JSON-LD LocalBusiness 스키마 생성기 ---
export function getJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    'name': BRAND_NAME,
    'legalName': BUSINESS_NAME,
    'alternateName': '올케어서비스 청소전문',
    'description': '서울 상가, 빌딩, 사무실, 음식점, 준공 현장 청소가 필요할 때 올케어서비스가 오염 상태와 작업 범위에 맞춰 상담을 안내합니다.',
    'url': DOMAIN,
    'logo': `${DOMAIN}/logo.png`,
    'image': DEFAULT_OG_IMAGE,
    'telephone': CONTACT_PHONE,
    'priceRange': '₩₩',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': BUSINESS_ADDRESS,
      'addressLocality': 'Seoul',
      'addressRegion': 'KR',
      'postalCode': '06000',
      'addressCountry': 'KR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 37.4979,
      'longitude': 127.0276
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      'opens': '00:00',
      'closes': '23:59'
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Seoul' },
      { '@type': 'City', 'name': 'Gyeonggi-do' }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': '종합청소 서비스 목록',
      'itemListElement': services.map((s, index) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': s.serviceNameKo,
          'description': s.shortDescription
        },
        'position': index + 1
      }))
    }
  };
}

// 7. 문서(Article) 스키마 생성기
export function getArticleJsonLd(title: string, description: string, url: string, image?: string) {
  const now = new Date().toISOString();
  const finalImage = image 
    ? (image.startsWith('http') ? image : `${DOMAIN}${image}`) 
    : `${DOMAIN}${DEFAULT_OG_IMAGE}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'author': {
      '@type': 'Organization',
      'name': BRAND_NAME
    },
    'publisher': {
      '@type': 'Organization',
      'name': BRAND_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': `${DOMAIN}/logo.png`
      }
    },
    'datePublished': now,
    'dateModified': now,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'image': finalImage
  };
}

// 8. 이동경로(Breadcrumb) 스키마 생성기
export function getBreadcrumbJsonLd(regionName: string, serviceName: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '홈',
        'item': DOMAIN
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': regionName,
        'item': `${DOMAIN}/sitemap-seoul`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': serviceName,
        'item': url
      }
    ]
  };
}
