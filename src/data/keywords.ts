import { sourceRegions } from './regions-source';
import { serviceContents } from './service-contents';
import { gyeonggiRegions } from './gyeonggi-regions';

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

// BRAND_NAME 상수 하드코딩 선언 (공백 없는 브랜드명 통일)
const BRAND_NAME = '올케어서비스';

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
  { id: 'trash-house', name: '쓰레기집 청소', slug: 'hoarder-house-cleaning' },
  { id: 'office-cleaning', name: '사무실청소', slug: 'office-cleaning' },
  { id: 'store-cleaning', name: '상가청소', slug: 'store-cleaning' },
  { id: 'factory-cleaning', name: '공장청소', slug: 'factory-cleaning' },
  { id: 'building-cleaning', name: '건물청소', slug: 'building-cleaning' },
  { id: 'flood-cleaning', name: '침수청소', slug: 'flood-cleaning' },
  { id: 'warehouse-cleaning', name: '창고청소', slug: 'warehouse-cleaning' },
  { id: 'hospital-cleaning', name: '병원청소', slug: 'hospital-cleaning' }
];

// regions-source에서 가져온 서울/인천 데이터와 gyeonggi-regions의 시/구/동 단위를 결합
const allowedCitiesForDongs = ['gimpo', 'goyang', 'bucheon', 'gwangmyeong', 'siheung', 'anyang', 'gwacheon', 'gunpo', 'ansan', 'uiwang', 'seongnam', 'hanam', 'guri', 'yangju', 'namyangju'];

export const targetRegions = [
  ...sourceRegions.filter(r => r.city === '서울' || r.city === '인천'),
  ...gyeonggiRegions.map(r => {
    const isAllowed = allowedCitiesForDongs.some(slug => r.slug.startsWith(slug));
    return {
      ...r,
      dongs: isAllowed ? r.dongs : ([] as string[])
    };
  })
];

// 개별 키워드의 SEO 설정(수집여부, 캐노니컬 타겟)을 수동으로 재정의(오버라이드)할 수 있는 사전 데이터 구조.
export const KEYWORD_SEO_OVERRIDES: {
  [urlKeyword: string]: {
    indexStatus?: 'index' | 'noindex';
    canonicalTarget?: string | null;
  }
} = {};

const CANONICAL_KEYWORD_NAMES: { [districtName: string]: string } = {
  '고양 덕양구': '덕양구',
  '고양 일산동구': '일산동구',
  '고양 일산서구': '일산서구',
  '부천 원미구': '원미구',
  '부천 소사구': '소사구',
  '부천 오정구': '오정구',
  '안양 만안구': '만안구',
  '안양 동안구': '동안구',
  '안산 상록구': '상록구',
  '성남 중원구': '중원구'
};

// 한글 종성(받침)에 따른 주격 조사 판별 함수 (공용)
export function getSubjectParticle(word: string): string {
  const cleanWord = word.trim();
  if (cleanWord.endsWith('청소')) {
    return '가';
  }
  const lastChar = cleanWord.charCodeAt(cleanWord.length - 1);
  if (lastChar < 0xac00 || lastChar > 0xd7a3) {
    return '가'; // 한글이 아닌 경우 기본값 '가'
  }
  const jong = (lastChar - 0xac00) % 28;
  return jong === 0 ? '가' : '이';
}

// 중복 동명에 대한 상위 지역구분용 접두사 매핑
function getDongPrefix(districtName: string, dongName: string): string {
  if (dongName === '신사동') {
    if (districtName === '은평구') return '은평 ';
  }
  if (dongName === '도화동') {
    if (districtName === '마포구') return '마포 ';
    if (districtName === '미추홀구') return '미추홀 ';
  }
  if (dongName === '연희동') {
    if (districtName === '서대문구') return '서대문 ';
    if (districtName === '인천 서구') return '인천 ';
  }
  if (dongName === '논현동') {
    if (districtName === '남동구') return '남동 ';
  }
  if (dongName === '오류동') {
    if (districtName === '구로구') return '구로 ';
    if (districtName === '인천 서구') return '검단 ';
  }
  return '';
}

// 동적 조합 기반 키워드 데이터셋 생성
export function generateKeywords(): KeywordRecord[] {
  const records: KeywordRecord[] = [];
  const processedUrlKeywords = new Set<string>();

  const addRecord = (rec: KeywordRecord) => {
    if (processedUrlKeywords.has(rec.urlKeyword)) return;
    processedUrlKeywords.add(rec.urlKeyword);
    records.push(rec);
  };

  for (const reg of targetRegions) {
    for (const serv of targetServices) {
      const isNewService = ['사무실청소', '상가청소', '공장청소', '건물청소', '침수청소', '창고청소', '병원청소'].includes(serv.name);
      const josa = getSubjectParticle(serv.name);
      const customContent = serviceContents[serv.name];

      // 안전한 fallback 설명문 사전 계산
      let fallbackDescBase = `${serv.name}${josa} 필요한 현장의 오염 상태와 작업 범위를 확인해 상세 상담을 안내합니다.`;
      if (serv.name === '쓰레기집 청소') {
        fallbackDescBase = '생활폐기물 수거 및 방치된 쓰레기집 청소 가능 여부와 작업 범위를 확인해 비대면 상담을 안내합니다.';
      } else if (serv.name === '후드청소') {
        fallbackDescBase = '음식점 주방 후드 기름때와 배기 덕트 주변의 오염 상태를 확인해 정밀 청소 상담을 안내합니다.';
      } else if (serv.name === '특수청소') {
        fallbackDescBase = '고독사 현장 정리, 유품 수거 및 일반 청소로 해결이 어려운 특수 오염 상태를 확인해 살균 소독 상담을 안내합니다.';
      } else if (serv.name === '준공청소') {
        fallbackDescBase = '신축 건물 입주를 위해 공사 분진, 시멘트 가루, 보양 필름 정리 등의 준공 청소 범위와 일정을 확인해 상담을 안내합니다.';
      } else if (serv.name === '인테리어 후 청소') {
        fallbackDescBase = '공사 후 발생한 석고 분진, 본드/실리콘 잔여 자국 제거 등 입주 전 실내 청소 범위와 일정을 확인해 상담을 안내합니다.';
      }

      // 1. 구 제외 버전 명칭 미리 계산
      let districtWithoutGu = '';
      if (reg.name === '중구') {
        districtWithoutGu = '서울 중구';
      } else if (reg.name === '인천 중구') {
        districtWithoutGu = '인천중구';
      } else {
        districtWithoutGu = reg.name;
      }

      const keywordWithoutGu = `${districtWithoutGu} ${serv.name}`;
      const urlKeywordWithoutGu = `${districtWithoutGu}-${serv.name}`.replace(/\s+/g, '-');
      const overrideWithoutGu = KEYWORD_SEO_OVERRIDES[urlKeywordWithoutGu];

      // 2. 구 포함 버전 명칭 계산
      const districtWithGu = reg.fullName;
      const keywordWithGu = `${districtWithGu} ${serv.name}`;
      const urlKeywordWithGu = `${districtWithGu}-${serv.name}`.replace(/\s+/g, '-');
      const overrideWithGu = KEYWORD_SEO_OVERRIDES[urlKeywordWithGu];

      // Gyeonggi 10 general-gus check
      const isGeneralGu = !!CANONICAL_KEYWORD_NAMES[districtWithGu];

      const defaultIndexStatusWithGu = isGeneralGu ? 'noindex' : 'index';
      const defaultCanonicalTargetWithGu = isGeneralGu ? `/?k=${encodeURIComponent(urlKeywordWithoutGu)}` : null;

      const defaultIndexStatusWithoutGu = isGeneralGu ? 'index' : 'noindex';
      const defaultCanonicalTargetWithoutGu = isGeneralGu ? null : `/?k=${encodeURIComponent(urlKeywordWithGu)}`;

      // 2. 구 포함 버전 레코드 추가
      const fullDesc = customContent
        ? customContent.intro.replace(/{region}/g, districtWithGu)
        : `${districtWithGu} ${fallbackDescBase}`;

      addRecord({
        keyword: keywordWithGu,
        regionName: districtWithGu,
        regionType: 'district',
        serviceName: serv.name,
        urlKeyword: urlKeywordWithGu,
        indexStatus: overrideWithGu?.indexStatus !== undefined ? overrideWithGu.indexStatus : defaultIndexStatusWithGu,
        canonicalTarget: overrideWithGu?.canonicalTarget !== undefined ? overrideWithGu.canonicalTarget : defaultCanonicalTargetWithGu,
        title: `${districtWithGu} ${serv.name} 전문 | ${BRAND_NAME}`,
        description: fullDesc,
        h1: `${districtWithGu} ${serv.name} 전문 ${BRAND_NAME}`,
        priority: 1
      });

      // 3. 구 제외 버전 레코드 추가
      const shortDesc = customContent
        ? customContent.intro.replace(/{region}/g, districtWithoutGu)
        : `${districtWithoutGu} ${fallbackDescBase}`;

      addRecord({
        keyword: keywordWithoutGu,
        regionName: districtWithoutGu,
        regionType: 'district',
        serviceName: serv.name,
        urlKeyword: urlKeywordWithoutGu,
        indexStatus: overrideWithoutGu?.indexStatus !== undefined ? overrideWithoutGu.indexStatus : defaultIndexStatusWithoutGu,
        canonicalTarget: overrideWithoutGu?.canonicalTarget !== undefined ? overrideWithoutGu.canonicalTarget : defaultCanonicalTargetWithoutGu,
        title: `${districtWithoutGu} ${serv.name} 전문 | ${BRAND_NAME}`,
        description: shortDesc,
        h1: `${districtWithoutGu} ${serv.name} 전문 ${BRAND_NAME}`,
        priority: 2
      });

      // 3. 산하 동 단위 버전 (예: 역삼동 외벽청소) - index
      for (const dong of reg.dongs) {
        const prefix = getDongPrefix(reg.fullName, dong);
        const keywordDong = `${prefix}${dong} ${serv.name}`;
        const urlKeywordDong = `${prefix}${dong}-${serv.name}`.replace(/\s+/g, '-');
        const overrideDong = KEYWORD_SEO_OVERRIDES[urlKeywordDong];

        const dongDesc = customContent
          ? customContent.intro.replace(/{region}/g, `${prefix}${dong}`)
          : `${prefix}${dong} ${fallbackDescBase}`;

        addRecord({
          keyword: keywordDong,
          regionName: `${prefix}${dong}`.trim(),
          regionType: 'dong',
          serviceName: serv.name,
          urlKeyword: urlKeywordDong,
          indexStatus: overrideDong?.indexStatus !== undefined ? overrideDong.indexStatus : 'index',
          canonicalTarget: overrideDong?.canonicalTarget !== undefined ? overrideDong.canonicalTarget : null,
          title: `${prefix}${dong} ${serv.name} 전문 | ${BRAND_NAME}`,
          description: dongDesc,
          h1: `${prefix}${dong} ${serv.name} 전문 ${BRAND_NAME}`,
          priority: 3
        });
      }
    }
  }

  return records;
}

export const keywords = generateKeywords();
