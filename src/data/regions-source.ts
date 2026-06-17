export interface SourceRegion {
  name: string;        // 구/시 이름 (예: '강남', '구리')
  fullName: string;    // 구/시 전체 이름 (예: '강남구', '구리시')
  slug: string;        // 영문 슬러그 (예: 'gangnam', 'guri')
  city: '서울' | '경기'; // 광역 자치단체 구분
  citySlug: 'seoul' | 'gyeonggi'; // 광역 자치단체 슬러그
  dongs: string[];     // 산하 동 단위 리스트
  localDescription?: string; // 구/시 단위 대표 설명글 (생략 시 기본 템플릿 사용)
  buildingCharacteristics?: string; // 구/시 단위 대표 건물 특성 (생략 시 기본 템플릿 사용)
}

export const sourceRegions: SourceRegion[] = [
  {
    name: '서초',
    fullName: '서초구',
    slug: 'seocho',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['서초동', '반포동', '잠원동', '방배동', '양재동', '우면동', '내곡동'],
    localDescription: '서초동 법조타운 and 테헤란로의 시작점이며, 고밀도 상업시설과 거대 주거 단지가 결합된 핵심 행정구역입니다.',
    buildingCharacteristics: '대형 법조 빌딩, 오피스 타워, 상가 건물, 학원 및 병원'
  },
  {
    name: '강남',
    fullName: '강남구',
    slug: 'gangnam',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['역삼동', '논현동', '삼성동', '청담동', '대치동', '신사동', '압구정동', '도곡동', '개포동', '수서동', '일원동', '세곡동'],
    localDescription: '테헤란로 금융 비즈니스 허브와 청담/압구정의 고급 상권, 대치동 학원가가 융합된 한국 대표 상업지구입니다.',
    buildingCharacteristics: '초고층 오피스 빌딩, 명품 로드샵 매장, 의료 타워, 대형 학원'
  },
  {
    name: '송파',
    fullName: '송파구',
    slug: 'songpa',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['잠실동', '신천동', '풍납동', '송파동', '석촌동', '삼전동', '가락동', '문정동', '장지동', '방이동', '오금동', '거여동', '마천동'],
    localDescription: '롯데타워와 올림픽공원을 품은 서울 최대 규모의 주거 및 상업 중심 요충지입니다.',
    buildingCharacteristics: '대형 빌딩, 랜드마크 타워, 복합 쇼핑몰, 음식점 주방 및 사무실'
  },
  {
    name: '강동',
    fullName: '강동구',
    slug: 'gangdong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['천호동', '성내동', '길동', '둔촌동', '암사동', '명일동', '고덕동', '상일동', '강일동'],
    localDescription: '한강변을 접한 서울 동부의 주거 요충지이자 고덕비즈밸리 등 신흥 업무지구가 발달하고 있습니다.',
    buildingCharacteristics: '대단지 아파트 상가, 오피스 빌딩, 신축 지식산업센터, 프랜차이즈 매장'
  },
  {
    name: '광진',
    fullName: '광진구',
    slug: 'gwangjin',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['화양동', '군자동', '중곡동', '능동', '구의동', '광장동', '자양동'],
    localDescription: '교통 허브인 동서울터미널과 대학가, 한강 공원이 융합된 역동적인 행정구역입니다.',
    buildingCharacteristics: '대학가 상가, 터미널 복합 빌딩, 로드샵 매장, 식당'
  },
  {
    name: '성동',
    fullName: '성동구',
    slug: 'seongdong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['성수동', '왕십리동', '행당동', '마장동', '사근동', '응봉동', '금호동', '옥수동'],
    localDescription: '지식산업센터와 문화 예술, 고품격 한강뷰 아파트가 융합된 서울 동부의 핫플레이스입니다.',
    buildingCharacteristics: '신축 지식산업센터, 붉은 벽돌 개성 상가, 트렌디 팝업스토어, 아파트 시설'
  },
  {
    name: '동대문',
    fullName: '동대문구',
    slug: 'dongdaemun',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['청량리동', '회기동', '휘경동', '이문동', '전농동', '답십리동', '장안동', '제기동', '용두동'],
    localDescription: '청량리역 복합 개발과 대규모 한방 전통시장, 교육 인프라가 융합된 강북 핵심 지역입니다.',
    buildingCharacteristics: '복합 초고층 주상복합, 전통시장, 대학가 상가, 병의원 빌딩'
  },
  {
    name: '중랑',
    fullName: '중랑구',
    slug: 'jungnang',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['면목동', '상봉동', '중화동', '묵동', '망우동', '신내동'],
    localDescription: '대형 할인 마트 상권과 다세대 주택가, 신내지구 신흥 복합 업무단지가 조화를 이룹니다.',
    buildingCharacteristics: '할인마트 쇼핑몰, 저층 다세대 상가, 신축 지식산업센터, 매장'
  },
  {
    name: '성북',
    fullName: '성북구',
    slug: 'seongbuk',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['성북동', '삼선동', '동선동', '돈암동', '안암동', '보문동', '정릉동', '길음동', '종암동', '월곡동', '장위동', '석관동'],
    localDescription: '역사적인 주택 지구와 대학교 배후 상권이 공존하며 주거 환경과 역동적인 로드 상권이 혼재한 곳입니다.',
    buildingCharacteristics: '대학가 먹자 상가, 전통 가옥형 매장, 중소형 학원, 주택 상권'
  },
  {
    name: '강북',
    fullName: '강북구',
    slug: 'gangbuk',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['미아동', '번동', '수유동', '우이동'],
    localDescription: '미아사거리 상업지구와 수유역 멀티 교통 중심지를 아우르는 종합 주상업 요지입니다.',
    buildingCharacteristics: '백화점 매장, 먹자 상권 식당, 모텔/호텔, 종합 병원 빌딩'
  },
  {
    name: '도봉',
    fullName: '도봉구',
    slug: 'dobong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['쌍문동', '방학동', '창동', '도봉동'],
    localDescription: '도봉산 배후의 청정 주택지이며 법조 타운과 창동 민자역사 등 새로운 거점이 개발 중입니다.',
    buildingCharacteristics: '공공 법조 빌딩, 체육 문화 시설, 역세권 중소 상가, 단지형 점포'
  },
  {
    name: '노원',
    fullName: '노원구',
    slug: 'nowon',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['월계동', '공릉동', '하계동', '중계동', '상계동'],
    localDescription: '강북 최대 규모의 대단지 아파트 주거 타운과 강북 대표 학원가 인프라를 지닌 교육 요충지입니다.',
    buildingCharacteristics: '대형 학원가 빌딩, 상가 타워, 메디컬 센터, 아파트 상권'
  },
  {
    name: '구리',
    fullName: '구리시',
    slug: 'guri',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['수택동', '갈매동'],
    localDescription: '서울 광진/중랑구와 바로 맞닿아 있으며 생활 상권과 전통시장이 고도로 정착된 복합 도시입니다.',
    buildingCharacteristics: '전통시장 활성 상가, 역세권 백화점/아울렛, 중소형 학원 및 병원'
  },
  {
    name: '하남',
    fullName: '하남시',
    slug: 'hanam',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['망월동', '신장동'],
    localDescription: '미사강변 신도시와 대형 복합 쇼핑몰 스타필드 하남을 보유한 고품격 신도시 주거 상업 요충지입니다.',
    buildingCharacteristics: '미사역 고밀도 상가 빌딩, 대형 쇼핑몰 스타필드 매장, 신축 오피스, 학원'
  },
  {
    name: '남양주',
    fullName: '남양주시',
    slug: 'namyangju',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['다산동', '별내동'],
    localDescription: '다수의 계획 신도시가 조성되어 쾌적하고 안전한 위생 관리가 중요한 거대 도시입니다.',
    buildingCharacteristics: '다산/별내 신축 빌딩 상권, 별내 카페거리, 남양주 행정타운, 지식산업센터'
  }
];
