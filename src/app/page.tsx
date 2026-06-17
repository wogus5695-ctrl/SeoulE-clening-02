import { Metadata } from 'next';
import MainTemplate from '@/components/MainTemplate';

export const dynamic = 'force-dynamic';
import { services } from '@/data/services';
import { regions } from '@/data/regions';
import { getBaseMetadata, getLandingMetadata, getMainMetadata, getArticleJsonLd, getBreadcrumbJsonLd, DOMAIN, BRAND_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo';
import { keywords, KeywordRecord } from '@/data/keywords';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 유연한 한글 서비스명 매핑 사전
const SERVICE_NAME_MAP: { [key: string]: string } = {
  '외벽': 'outer-wall',
  '외벽청소': 'outer-wall',
  '유리창': 'window',
  '유리창청소': 'window',
  '화재': 'fire',
  '화재청소': 'fire',
  '바닥': 'floor-wax',
  '바닥청소': 'floor-wax',
  '바닥왁스': 'floor-wax',
  '바닥왁스코팅': 'floor-wax',
  '왁스코팅': 'floor-wax',
  '어닝': 'awning',
  '어닝청소': 'awning',
  '간판': 'signboard',
  '간판청소': 'signboard',
  '인테리어': 'interior-post',
  '인테리어청소': 'interior-post',
  '인테리어후청소': 'interior-post',
  '인테리어 후 청소': 'interior-post',
  '입주': 'interior-post',
  '입주청소': 'interior-post',
  '이사': 'interior-post',
  '이사청소': 'interior-post',
  '준공': 'completion',
  '준공청소': 'completion',
  '후드': 'hood',
  '후드청소': 'hood',
  '주방후드': 'hood',
  '주방후드청소': 'hood',
  '기름때': 'hood',
  '쓰레기': 'trash-house',
  '쓰레기청소': 'trash-house',
  '쓰레기집': 'trash-house',
  '쓰레기집청소': 'trash-house',
  '특수': 'special-cleaning',
  '특수청소': 'special-cleaning',
};

// 두 문자열의 레벤슈타인 거리(편집 거리)를 계산하여 오타를 보정함
function getLevenshteinDistance(a: string, b: string): number {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // 삭제
        tmp[i][j - 1] + 1, // 삽입
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // 대체
      );
    }
  }
  return tmp[a.length][b.length];
}

// 한글 텍스트에서 가장 유사한 동(subDistrict)을 매칭하는 함수
function findClosestSubDistrict(inputRegion: string) {
  // '동'이나 '구' 접미사가 생략되었거나 붙어있는 경우 모두 유연하게 매칭하기 위해 정제
  const cleanInput = inputRegion.trim().replace(/(동|구)$/, '');
  
  let bestRegion = null;
  let minDistance = Infinity;

  for (const r of regions) {
    if (r.subDistrict === '전지역') continue;
    
    const cleanSub = r.subDistrict.replace(/동$/, '');
    
    // 1차: 완전히 일치하는 경우
    if (cleanSub === cleanInput) {
      return r;
    }

    // 2차: 편집 거리 계산
    const distance = getLevenshteinDistance(cleanInput, cleanSub);
    if (distance < minDistance) {
      minDistance = distance;
      bestRegion = r;
    }
  }

  // 편집 거리 허용치 설정 (글자 수가 3글자 내외이므로 거리가 1 이하인 경우만 오타 보정)
  if (minDistance <= 1 && bestRegion) {
    return bestRegion;
  }

  return null;
}

// k 파라미터(슬러그 또는 한글 키워드)를 해석하여 적절한 region과 service를 추출하는 함수
function parseK(k: string): { region: any; service: any; keywordObj?: KeywordRecord } | null {
  if (!k) return null;

  // URL 인코딩된 문자열을 한글 및 일반 특수기호 형태로 디코딩
  let decodedK = '';
  try {
    decodedK = decodeURIComponent(k).trim();
  } catch (e) {
    decodedK = k.trim();
  }

  const cleanK = decodedK.replace(/\s+/g, '-');

  // 1. 신규 데이터베이스 기반 1:1 매치 시도
  const keywordObj = keywords.find(item => item.urlKeyword === cleanK);
  if (keywordObj) {
    // 1-1. 서비스 매칭
    const service = services.find(s => 
      s.serviceNameKo === keywordObj.serviceName || 
      s.serviceNameKo.replace(/\s+/g, '') === keywordObj.serviceName.replace(/\s+/g, '')
    );
    // 1-2. 지역 매칭
    const region = regions.find(r => 
      r.subDistrict === keywordObj.regionName || 
      r.district === keywordObj.regionName ||
      (keywordObj.regionType === 'district' && r.subDistrictSlug === 'all' && r.district.startsWith(keywordObj.regionName.replace(/구$/, '')))
    );

    if (service && region) {
      return { region, service, keywordObj };
    }
  }

  // 2. 기존 영어 슬러그 기반 파싱 시도 (하위 호환성 100% 보장)
  const englishService = services.find(s => decodedK.endsWith(s.serviceSlug));
  if (englishService) {
    const regionPart = decodedK.slice(0, -(englishService.serviceSlug.length + 1));
    const parts = regionPart.split('-');
    if (parts.length >= 2) {
      const citySlug = parts[0];
      const districtSlug = parts[1];
      const subDistrictSlug = parts.slice(2).join('-');

      const region = regions.find(r => 
        r.regionSlug === citySlug && 
        r.districtSlug === districtSlug && 
        (subDistrictSlug ? r.subDistrictSlug === subDistrictSlug : r.subDistrictSlug === 'all')
      );
      if (region) {
        return { region, service: englishService };
      }
    }
  }

  // 3. 한글 기반 파싱 시도 (예: "서빙고동-인테리어-후-청소", "용산구-외벽청소")
  // 하이픈으로 쪼갠 후, 서비스명을 만족하는 가장 긴 뒷부분을 찾고 나머지를 지역명으로 해석하는 백트래킹(Backtracking) 기법 적용
  const parts = decodedK.split('-');
  for (let i = 1; i < parts.length; i++) {
    const inputRegionStr = parts.slice(0, i).join('-').trim(); // 앞부분 전체를 지역명으로 가정
    const inputServiceStr = parts.slice(i).join('-').trim();    // 뒷부분 전체를 서비스명으로 가정

    const cleanServiceStr = inputServiceStr.replace(/[\s-]/g, '');
    let serviceId = SERVICE_NAME_MAP[inputServiceStr] || SERVICE_NAME_MAP[cleanServiceStr];

    if (!serviceId) {
      const matchedService = services.find(s => s.serviceNameKo.replace(/[\s-]/g, '') === cleanServiceStr);
      if (matchedService) {
        serviceId = matchedService.id;
      }
    }

    const service = services.find(s => s.id === serviceId);

    if (service) {
      // 3-2. 지역 매칭 시도
      const regionParts = inputRegionStr.split('-');
      const targetRegionStr = regionParts[regionParts.length - 1].trim();

      // 구 단위 매칭 시도
      const inputDistrictClean = targetRegionStr.replace(/구$/, '');
      const districtRegion = regions.find(r => 
        r.district.replace(/구$/, '') === inputDistrictClean && 
        r.subDistrictSlug === 'all'
      );
      if (districtRegion && regionParts.length === 1) {
        return { region: districtRegion, service };
      }

      // 동 단위 매칭 시도
      const closestRegion = findClosestSubDistrict(targetRegionStr);
      if (closestRegion) {
        return { region: closestRegion, service };
      }
    }
  }

  return null;
}

// 쿼리 파라미터 k가 존재할 시 타겟화된 키워드 메타데이터 생성
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const k = params.k as string;

  if (k) {
    const parsed = parseK(k);
    if (parsed) {
      const { region, service, keywordObj } = parsed;

      // 신규 키워드 데이터베이스(keywords.ts)에 매칭된 레코드가 있는 경우 우선 적용
      if (keywordObj) {
        const path = `/?k=${encodeURIComponent(keywordObj.urlKeyword)}`;
        return getBaseMetadata({
          title: keywordObj.title,
          description: keywordObj.description,
          path: path,
          indexStatus: keywordObj.indexStatus,
          canonicalTarget: keywordObj.canonicalTarget,
          ogType: 'article',
          publishedTime: new Date().toISOString(),
          modifiedTime: new Date().toISOString(),
          ogImage: service.imageUrl || DEFAULT_OG_IMAGE
        });
      }

      return getLandingMetadata(region.districtSlug, region.subDistrictSlug, service.id);
    } else {
      // k 파라미터가 존재하지만 파싱에 실패한 경우 (오타, 잘못된 유입 등)
      // 검색 엔진이 중복 페이지로 수집하지 않도록 noindex를 주입하고 고유한 제목을 부여합니다.
      return {
        title: `페이지를 찾을 수 없습니다 | ${BRAND_NAME}`,
        description: '요청하신 페이지를 찾을 수 없거나 변경되었습니다. 주소를 다시 확인해 주세요.',
        robots: 'noindex, nofollow',
      };
    }
  }

  return getMainMetadata();
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const k = params.k as string;

  if (k) {
    const parsed = parseK(k);
    if (parsed) {
      const { region, service, keywordObj } = parsed;
      const regionName = region.subDistrict === '전지역' ? region.district : region.subDistrict;

      let title = '';
      let description = '';
      let url = `${DOMAIN}/?k=${encodeURIComponent(k)}`;
      let finalRegionName = regionName;
      let finalServiceName = service.serviceNameKo;

      if (keywordObj) {
        title = keywordObj.title;
        description = keywordObj.description;
        url = `${DOMAIN}/?k=${encodeURIComponent(keywordObj.urlKeyword)}`;
        finalRegionName = keywordObj.regionName;
        finalServiceName = keywordObj.serviceName;
      } else {
        const regionName = region.subDistrict === '전지역' ? region.district : `${region.district} ${region.subDistrict}`;
        title = `${regionName} ${service.serviceNameKo} 전문 | ${BRAND_NAME}`;
        description = `${regionName} ${service.serviceNameKo}${service.serviceNameKo.endsWith('코팅') ? '이' : '가'} 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 작업 범위와 오염 상태를 확인해 상담을 안내합니다.`;
      }

      // Naver SEO를 위한 FAQ 스키마 생성
      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': service.faq.map((item: any) => ({
          '@type': 'Question',
          'name': item.question.replace('{service}', finalServiceName).replace('{region}', finalRegionName),
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer.replace('{service}', finalServiceName).replace('{region}', finalRegionName)
          }
        }))
      };

      const articleJsonLd = getArticleJsonLd(title, description, url);
      const breadcrumbJsonLd = getBreadcrumbJsonLd(finalRegionName, finalServiceName, url);

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
          <MainTemplate 
            region={finalRegionName} 
            service={finalServiceName} 
            regionObj={region} 
            keywordObj={keywordObj}
          />
        </>
      );
    }
  }

  const region = (params.region as string) || '서울·경기';
  const service = (params.service as string) || '종합청소';

  return <MainTemplate region={region} service={service} />;
}
