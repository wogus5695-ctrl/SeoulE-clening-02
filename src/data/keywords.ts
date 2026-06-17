import { sourceRegions } from './regions-source';

export interface KeywordRecord {
  keyword: string;
  regionName: string;
  regionType: 'district' | 'dong';
  serviceName: string;
  urlKeyword: string;
  indexStatus: 'index' | 'noindex';
  canonicalTarget: string | null;
  title: string;
  description: string;
  h1: string;
  priority: number;
}

// BRAND_NAME 상수 하드코딩 선언 (순환 참조 방지)
const BRAND_NAME = '올케어 서비스';

// 12대 작업명 키워드 정의
export const targetServices = [
  { id: 'outer-wall', name: '외벽청소', slug: 'exterior-cleaning' },
  { id: 'window', name: '유리창청소', slug: 'window-cleaning' },
  { id: 'fire', name: '화재청소', slug: 'fire-cleaning' },
  { id: 'floor-wax', name: '바닥왁스코팅', slug: 'floor-wax-coating' },
  { id: 'awning', name: '어닝청소', slug: 'awning-cleaning' },
  { id: 'signboard', name: '간판청소', slug: 'signboard-cleaning' },
  { id: 'interior-post', name: '인테리어 후 청소', slug: 'interior-post-cleaning' },
  { id: 'completion', name: '준공청소', slug: 'construction-completion-cleaning' },
  { id: 'hood', name: '후드청소', slug: 'hood-cleaning' },
  { id: 'special', name: '특수청소', slug: 'special-cleaning' },
  { id: 'floor-clean', name: '바닥청소', slug: 'floor-cleaning' },
  { id: 'trash-house', name: '쓰레기집 청소', slug: 'hoarder-house-cleaning' }
];

// regions-source에서 가져온 데이터를 targetRegions로 맵핑 사용
export const targetRegions = sourceRegions.filter(r => r.city === '서울');

// 개별 키워드의 SEO 설정(수집여부, 캐노니컬 타겟)을 수동으로 재정의(오버라이드)할 수 있는 사전 데이터 구조.
// 특정 구 제외 버전(예: '강남-외벽청소')의 본문을 차별화하여 개별 인덱싱을 원하는 경우, 아래 사전 항목에 등록하여 제어할 수 있습니다.
export const KEYWORD_SEO_OVERRIDES: {
  [urlKeyword: string]: {
    indexStatus?: 'index' | 'noindex';
    canonicalTarget?: string | null;
  }
} = {
  // 예시:
  // '강남-외벽청소': { indexStatus: 'index', canonicalTarget: null }
};

// 동적 조합 기반 키워드 데이터셋 생성
export function generateKeywords(): KeywordRecord[] {
  const records: KeywordRecord[] = [];

  for (const reg of targetRegions) {
    for (const serv of targetServices) {
      // 1. 구 포함 버전 (예: 강남구 외벽청소) - index
      const districtWithGu = reg.fullName;
      const keywordWithGu = `${districtWithGu} ${serv.name}`;
      const urlKeywordWithGu = `${districtWithGu}-${serv.name}`.replace(/\s+/g, '-');
      const overrideWithGu = KEYWORD_SEO_OVERRIDES[urlKeywordWithGu];

      records.push({
        keyword: keywordWithGu,
        regionName: districtWithGu,
        regionType: 'district',
        serviceName: serv.name,
        urlKeyword: urlKeywordWithGu,
        indexStatus: overrideWithGu?.indexStatus !== undefined ? overrideWithGu.indexStatus : 'index',
        canonicalTarget: overrideWithGu?.canonicalTarget !== undefined ? overrideWithGu.canonicalTarget : null,
        title: `${districtWithGu} ${serv.name} 전문 | ${BRAND_NAME}`,
        description: `${districtWithGu} ${serv.name}${serv.name.endsWith('코팅') ? '이' : '가'} 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 작업 범위와 오염 상태를 확인해 상담을 안내합니다.`,
        h1: `${districtWithGu} ${serv.name} 전문 올케어 서비스`,
        priority: 1
      });

      // 2. 구 제외 버전 (예: 강남 외벽청소) - noindex (canonical to 구 포함 버전)
      const districtWithoutGu = reg.name;
      const keywordWithoutGu = `${districtWithoutGu} ${serv.name}`;
      const urlKeywordWithoutGu = `${districtWithoutGu}-${serv.name}`.replace(/\s+/g, '-');
      const overrideWithoutGu = KEYWORD_SEO_OVERRIDES[urlKeywordWithoutGu];

      records.push({
        keyword: keywordWithoutGu,
        regionName: districtWithoutGu,
        regionType: 'district',
        serviceName: serv.name,
        urlKeyword: urlKeywordWithoutGu,
        indexStatus: overrideWithoutGu?.indexStatus !== undefined ? overrideWithoutGu.indexStatus : 'noindex',
        canonicalTarget: overrideWithoutGu?.canonicalTarget !== undefined ? overrideWithoutGu.canonicalTarget : `/?k=${encodeURIComponent(urlKeywordWithGu)}`,
        title: `${districtWithoutGu} ${serv.name} 전문 | ${BRAND_NAME}`,
        description: `${districtWithoutGu} ${serv.name}${serv.name.endsWith('코팅') ? '이' : '가'} 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 작업 범위와 오염 상태를 확인해 상담을 안내합니다.`,
        h1: `${districtWithoutGu} ${serv.name} 전문 올케어 서비스`,
        priority: 2
      });

      // 3. 산하 동 단위 버전 (예: 역삼동 외벽청소) - index
      for (const dong of reg.dongs) {
        const keywordDong = `${dong} ${serv.name}`;
        const urlKeywordDong = `${dong}-${serv.name}`.replace(/\s+/g, '-');
        const overrideDong = KEYWORD_SEO_OVERRIDES[urlKeywordDong];

        records.push({
          keyword: keywordDong,
          regionName: dong,
          regionType: 'dong',
          serviceName: serv.name,
          urlKeyword: urlKeywordDong,
          indexStatus: overrideDong?.indexStatus !== undefined ? overrideDong.indexStatus : 'index',
          canonicalTarget: overrideDong?.canonicalTarget !== undefined ? overrideDong.canonicalTarget : null,
          title: `${dong} ${serv.name} 전문 | ${BRAND_NAME}`,
          description: `${dong} ${serv.name}${serv.name.endsWith('코팅') ? '이' : '가'} 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 작업 범위와 오염 상태를 확인해 상담을 안내합니다.`,
          h1: `${dong} ${serv.name} 전문 올케어 서비스`,
          priority: 3
        });
      }
    }
  }

  return records;
}

export const keywords = generateKeywords();
