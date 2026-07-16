import { KeywordRecord } from './keywords';

export const pilotKeywords: KeywordRecord[] = [
  // 1. 강남구 사무실청소 (HTTP 200, noindex)
  {
    keyword: '강남구 사무실청소',
    regionName: '강남구',
    regionType: 'district',
    serviceName: '사무실청소',
    urlKeyword: '강남구-사무실청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '강남구 사무실청소 전문, 업무공간 맞춤 관리 | 올케어서비스',
    description: '강남구 사무실의 바닥 먼지 포집, 데코타일 세척, 탕비실 및 화장실 오염을 확인하고 정밀 청소 가이드라인에 맞춰 안내합니다.',
    h1: '강남구 사무실청소 전문 올케어서비스',
    priority: 2
  },
  // 2. 강남 사무실청소 (Redirect to 강남구 사무실청소)
  {
    keyword: '강남 사무실청소',
    regionName: '강남',
    regionType: 'district',
    serviceName: '사무실청소',
    urlKeyword: '강남-사무실청소',
    indexStatus: 'noindex',
    canonicalTarget: '강남구-사무실청소',
    title: '강남 사무실청소 전문, 업무공간 맞춤 관리 | 올케어서비스',
    description: '강남 사무실의 바닥 먼지 포집, 데코타일 세척, 탕비실 및 화장실 오염을 확인하고 정밀 청소 가이드라인에 맞춰 안내합니다.',
    h1: '강남 사무실청소 전문 올케어서비스',
    priority: 2
  },
  // 3. 역삼동 상가청소 (HTTP 200, noindex)
  {
    keyword: '역삼동 상가청소',
    regionName: '역삼동',
    regionType: 'dong',
    serviceName: '상가청소',
    urlKeyword: '역삼동-상가청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '역삼동 상가청소 전문, 영업 전후 매장 관리 | 올케어서비스',
    description: '역삼동 상가 매장 쇼윈도의 얼룩, 바닥 찌든 오염, 진열대 분진 상태를 확인하고 영업 활성화에 맞춘 클리닝을 안내합니다.',
    h1: '역삼동 상가청소 전문 올케어서비스',
    priority: 3
  },
  // 4. 인천 서구 상가청소 (HTTP 200, noindex)
  {
    keyword: '인천 서구 상가청소',
    regionName: '인천 서구',
    regionType: 'district',
    serviceName: '상가청소',
    urlKeyword: '인천-서구-상가청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '인천 서구 상가청소 전문, 영업 전후 매장 관리 | 올케어서비스',
    description: '인천 서구 상가 매장 쇼윈도의 얼룩, 바닥 찌든 오염, 진열대 분진 상태를 확인하고 영업 활성화에 맞춘 클리닝을 안내합니다.',
    h1: '인천 서구 상가청소 전문 올케어서비스',
    priority: 2
  },
  // 5. 김포시 공장청소 (Redirect to 김포 공장청소)
  {
    keyword: '김포시 공장청소',
    regionName: '김포시',
    regionType: 'district',
    serviceName: '공장청소',
    urlKeyword: '김포시-공장청소',
    indexStatus: 'noindex',
    canonicalTarget: '김포-공장청소',
    title: '김포시 공장청소 전문, 분진·바닥 오염 관리 | 올케어서비스',
    description: '김포시 공장 생산 시설의 산업 분진, 기계 주변 기름때, 고소 배관 먼지를 확인하고 안전 규정을 고려한 세정을 안내합니다.',
    h1: '김포시 공장청소 전문 올케어서비스',
    priority: 2
  },
  // 6. 김포 공장청소 (HTTP 200, noindex)
  {
    keyword: '김포 공장청소',
    regionName: '김포',
    regionType: 'district',
    serviceName: '공장청소',
    urlKeyword: '김포-공장청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '김포 공장청소 전문, 분진·바닥 오염 관리 | 올케어서비스',
    description: '김포 공장 생산 시설의 산업 분진, 기계 주변 기름때, 고소 배관 먼지를 확인하고 안전 규정을 고려한 세정을 안내합니다.',
    h1: '김포 공장청소 전문 올케어서비스',
    priority: 2
  },
  // 7. 덕양구 건물청소 (HTTP 200, noindex)
  {
    keyword: '덕양구 건물청소',
    regionName: '덕양구',
    regionType: 'district',
    serviceName: '건물청소',
    urlKeyword: '덕양구-건물청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '덕양구 건물청소 전문, 공용공간 체적 관리 | 올케어서비스',
    description: '덕양구 건물 공용 복도, 로비, 계단, 승강기의 찌든 오염을 확인하고 입주민 통행 편의를 고려한 청소를 안내합니다.',
    h1: '덕양구 건물청소 전문 올케어서비스',
    priority: 2
  },
  // 8. 원미구 건물청소 (HTTP 200, noindex)
  {
    keyword: '원미구 건물청소',
    regionName: '원미구',
    regionType: 'district',
    serviceName: '건물청소',
    urlKeyword: '원미구-건물청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '원미구 건물청소 전문, 공용공간 체적 관리 | 올케어서비스',
    description: '원미구 건물 공용 복도, 로비, 계단, 승강기의 찌든 오염을 확인하고 입주민 통행 편의를 고려한 청소를 안내합니다.',
    h1: '원미구 건물청소 전문 올케어서비스',
    priority: 2
  },
  // 9. 안산 침수청소 (HTTP 200, noindex)
  {
    keyword: '안산 침수청소',
    regionName: '안산',
    regionType: 'district',
    serviceName: '침수청소',
    urlKeyword: '안산-침수청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '안산 침수청소, 오염물 제거와 현장 정리 | 올케어서비스',
    description: '안산 침수 현장의 잔여 오수 배출, 진흙 토사 세정, 수해 폐기물 반출 및 오염 소독 복구를 긴급 안내합니다.',
    h1: '안산 침수청소 전문 올케어서비스',
    priority: 2
  },
  // 10. 만안구 침수청소 (HTTP 200, noindex)
  {
    keyword: '만안구 침수청소',
    regionName: '만안구',
    regionType: 'district',
    serviceName: '침수청소',
    urlKeyword: '만안구-침수청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '만안구 침수청소, 오염물 제거와 현장 정리 | 올케어서비스',
    description: '만안구 침수 현장의 잔여 오수 배출, 진흙 토사 세정, 수해 폐기물 반출 및 오염 소독 복구를 긴급 안내합니다.',
    h1: '만안구 침수청소 전문 올케어서비스',
    priority: 2
  },
  // 11. 남양주 창고청소 (Redirect to 남양주시 창고청소)
  {
    keyword: '남양주 창고청소',
    regionName: '남양주',
    regionType: 'district',
    serviceName: '창고청소',
    urlKeyword: '남양주-창고청소',
    indexStatus: 'noindex',
    canonicalTarget: '남양주시-창고청소',
    title: '남양주 창고청소 전문, 적재·물류공간 관리 | 올케어서비스',
    description: '남양주 창고 복도 랙의 미세 먼지 포집, 지게차 스키드 마크 제거, 바닥 오염 기계 세정을 안내합니다.',
    h1: '남양주 창고청소 전문 올케어서비스',
    priority: 2
  },
  // 11-b. 남양주시 창고청소 (HTTP 200, noindex)
  {
    keyword: '남양주시 창고청소',
    regionName: '남양주시',
    regionType: 'district',
    serviceName: '창고청소',
    urlKeyword: '남양주시-창고청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '남양주시 창고청소 전문, 적재·물류공간 관리 | 올케어서비스',
    description: '남양주시 창고 복도 랙의 미세 먼지 포집, 지게차 스키드 마크 제거, 바닥 오염 기계 세정을 안내합니다.',
    h1: '남양주시 창고청소 전문 올케어서비스',
    priority: 2
  },
  // 12. 진접읍 창고청소 (HTTP 200, noindex)
  {
    keyword: '진접읍 창고청소',
    regionName: '진접읍',
    regionType: 'dong',
    serviceName: '창고청소',
    urlKeyword: '진접읍-창고청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '진접읍 창고청소 전문, 적재·물류공간 관리 | 올케어서비스',
    description: '진접읍 창고 복도 랙의 미세 먼지 포집, 지게차 스키드 마크 제거, 바닥 오염 기계 세정을 안내합니다.',
    h1: '진접읍 창고청소 전문 올케어서비스',
    priority: 3
  },
  // 13. 분당구 병원청소 (HTTP 200, noindex)
  {
    keyword: '분당구 병원청소',
    regionName: '분당구',
    regionType: 'district',
    serviceName: '병원청소',
    urlKeyword: '분당구-병원청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '분당구 병원청소 전문, 진료공간 위생 관리 | 올케어서비스',
    description: '분당구 병의원 대기실 바닥 물때, 진료실 위생 세정, 원내 감염 예방 살균 소독 가이드를 조율하여 안내합니다.',
    h1: '분당구 병원청소 전문 올케어서비스',
    priority: 2
  },
  // 14. 송도동 병원청소 (HTTP 200, noindex)
  {
    keyword: '송도동 병원청소',
    regionName: '송도동',
    regionType: 'dong',
    serviceName: '병원청소',
    urlKeyword: '송도동-병원청소',
    indexStatus: 'noindex',
    canonicalTarget: null,
    title: '송도동 병원청소 전문, 진료공간 위생 관리 | 올케어서비스',
    description: '송도동 병의원 대기실 바닥 물때, 진료실 위생 세정, 원내 감염 예방 살균 소독 가이드를 조율하여 안내합니다.',
    h1: '송도동 병원청소 전문 올케어서비스',
    priority: 3
  }
];
