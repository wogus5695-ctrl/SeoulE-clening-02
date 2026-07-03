export interface SourceRegion {
  name: string;        // 구/시 이름 (예: '강남', '구리')
  fullName: string;    // 구/시 전체 이름 (예: '강남구', '구리시')
  slug: string;        // 영문 슬러그 (예: 'gangnam', 'guri')
  city: '서울' | '경기' | '인천'; // 광역 자치단체 구분
  citySlug: 'seoul' | 'gyeonggi' | 'incheon'; // 광역 자치단체 슬러그
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
    name: '양천',
    fullName: '양천구',
    slug: 'yangcheon',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['목동', '신월동', '신정동'],
    localDescription: '목동 신시가지 대단지 아파트와 학원가가 밀집한 대표적인 교육 및 주거 중심지입니다.',
    buildingCharacteristics: '대형 학원 빌딩, 상가 건물, 아파트 상가'
  },
  {
    name: '강서',
    fullName: '강서구',
    slug: 'gangseo',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['염창동', '등촌동', '화곡동', '우장산동', '가양동', '마곡동', '발산동', '내발산동', '공항동', '방화동', '개화동'],
    localDescription: '마곡 R&D 밸리와 김포공항 배후 단지가 어우러진 신흥 비즈니스 및 주거 중심지입니다.',
    buildingCharacteristics: '신축 R&D 센터, 지식산업센터, 대형 쇼핑몰, 상가 빌딩'
  },
  {
    name: '구로',
    fullName: '구로구',
    slug: 'guro',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['신도림동', '구로동', '가리봉동', '고척동', '개봉동', '구로 오류동', '천왕동', '항동', '온수동', '궁동'],
    localDescription: '구로디지털단지(G밸리)와 교통 요충지인 신도림역 상권이 결합된 산업 및 상업 거점입니다.',
    buildingCharacteristics: '지식산업센터, 대형 쇼핑몰 및 복합 빌딩, IT 오피스 타워'
  },
  {
    name: '금천',
    fullName: '금천구',
    slug: 'geumcheon',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['가산동', '독산동', '시흥동'],
    localDescription: '가산디지털단지를 중심으로 아웃렛 사거리 상권과 지식산업센터가 초고밀도로 집중된 IT 벤처 허브입니다.',
    buildingCharacteristics: '지식산업센터, 대형 패션 아웃렛 매장, 벤처 빌딩, 공장 및 창고'
  },
  {
    name: '영등포',
    fullName: '영등포구',
    slug: 'yeongdeungpo',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['영등포동', '여의도동', '당산동', '도림동', '문래동', '양평동', '신길동', '대림동'],
    localDescription: '대한민국 금융 중심지 여의도와 전통 상업 허브 영등포역, 예술 창작촌 문래동이 공존하는 복합 중심지입니다.',
    buildingCharacteristics: '초고층 오피스 빌딩, 대형 백화점, 지식산업센터, 복합 문화시설'
  },
  {
    name: '동작',
    fullName: '동작구',
    slug: 'dongjak',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['노량진동', '상도동', '흑석동', '사당동', '대방동', '신대방동'],
    localDescription: '노량진 수산시장 및 수험가 상권과 중앙대/숭실대 대학가 상권이 결합된 역동적인 거주/교육 지역입니다.',
    buildingCharacteristics: '학원가 상가, 대학 상권 매장, 수산물 센터, 메디컬 빌딩'
  },
  {
    name: '관악',
    fullName: '관악구',
    slug: 'gwanak',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['봉천동', '신림동', '남현동'],
    localDescription: '서울대 배후 상권인 샤로수길과 신림역 상업 지구가 결합된 고밀도 유동 인구 중심지입니다.',
    buildingCharacteristics: '트렌디한 외식 매장, 대학가 상가, 고시촌 상권, 다세대 복합 빌딩'
  },
  {
    name: '은평',
    fullName: '은평구',
    slug: 'eunpyeong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['녹번동', '불광동', '갈현동', '구산동', '대조동', '응암동', '역촌동', '은평 신사동', '증산동', '수색동', '진관동'],
    localDescription: '은평뉴타운의 쾌적한 주거 단지와 연신내 상권이 연계된 북서부의 대표적인 주거 배후 도시입니다.',
    buildingCharacteristics: '연신내 로드샵 매장, 상가 주택, 신축 복합 상가, 병원 및 학원'
  },
  {
    name: '서대문',
    fullName: '서대문구',
    slug: 'seodaemun',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['충현동', '천연동', '북아현동', '신촌동', '서대문 연희동', '홍제동', '홍은동', '남가좌동', '북가좌동'],
    localDescription: '신촌/이대 대학가 문화의 발상지이자 연희동/홍대 배후 상권이 결합된 교육 및 복합 상업 구역입니다.',
    buildingCharacteristics: '대학가 상가 빌딩, 이색 카페 및 로드샵, 연희동 단독주택형 매장'
  },
  {
    name: '마포',
    fullName: '마포구',
    slug: 'mapo',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['아현동', '공덕동', '마포 도화동', '용강동', '대흥동', '염리동', '신수동', '서강동', '서교동', '합정동', '망원동', '연남동', '성산동', '상암동'],
    localDescription: '홍대/신촌 배후 문화 상권, 상암 DMC 미디어 밸리, 공덕 오피스 타운이 공존하는 트렌디 비즈니스 구역입니다.',
    buildingCharacteristics: 'DMC 빌딩, 공덕 대형 오피스, 이색 팝업스토어, 음식점 주방 및 어닝'
  },
  {
    name: '종로',
    fullName: '종로구',
    slug: 'jongno',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['청운효자동', '사직동', '삼청동', '부암동', '평창동', '무악동', '교남동', '가회동', '종로1가', '종로2가', '종로3가', '종로4가', '종로5가', '종로6가', '이화동', '혜화동', '창신동', '숭인동'],
    localDescription: '경복궁, 삼청동 한옥 거리, 대학로 문화지구와 대기업 본사 오피스가 융합된 전통과 현대의 중심지입니다.',
    buildingCharacteristics: '한옥 개조 매장, 소극장 빌딩, 광화문 대형 오피스, 전통 상가'
  },
  {
    name: '중구',
    fullName: '중구',
    slug: 'jung-gu',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['소공동', '회현동', '명동', '필동', '장충동', '광희동', '을지로동', '신당동', '다산동', '약수동', '청구동', '동화동', '황학동', '중림동'],
    localDescription: '명동 쇼핑 허브, 남대문 시장, 동대문 패션 타운과 을지로 오피스/인쇄 골목이 밀집된 행정·상업 핵심 요충지입니다.',
    buildingCharacteristics: '명동 대형 매장, 동대문 쇼핑몰, 을지로 오피스 빌딩, 호텔 및 게스트하우스'
  },
  {
    name: '용산',
    fullName: '용산구',
    slug: 'yongsan',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['후암동', '용산2가동', '남영동', '청파동', '원효로동', '효창동', '용문동', '한강로동', '이촌동', '이태원동', '한남동', '서빙고동', '보광동'],
    localDescription: '용산 국제업무지구 개발 거점과 이태원/한남동 글로벌 이색 상권이 융합된 핵심 중심지입니다.',
    buildingCharacteristics: '이태원 이색 상가, 용산역 대형 쇼핑몰, 신축 주상복합, 오피스 타워'
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
  },
  {
    name: '분당',
    fullName: '분당구',
    slug: 'bundang',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['판교동'],
    localDescription: '성남 분당구 판교동 주변은 IT 벤처 허브와 주거 단지가 공존하는 곳입니다.',
    buildingCharacteristics: 'IT 벤처 빌딩, 아파트 상가, 오피스 빌딩'
  },
  {
    name: '수정',
    fullName: '수정구',
    slug: 'sujeong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['신흥동'],
    localDescription: '성남 수정구 신흥동 주변은 밀집 주택가와 리모델링 상권이 발달해 있습니다.',
    buildingCharacteristics: '상가 주택, 로드샵 매장, 아파트 상가'
  },
  {
    name: '영통',
    fullName: '영통구',
    slug: 'yeongtong',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['영통동', '광교동'],
    localDescription: '수원 영통구 영통동과 광교동 주변은 첨단 테크노밸리와 대단지 상권이 복합된 중추 지역입니다.',
    buildingCharacteristics: '지식산업센터, 프랜차이즈 상가, 오피스 빌딩, 대학가 상권'
  },
  {
    name: '단원',
    fullName: '단원구',
    slug: 'danwon',
    city: '서울',
    citySlug: 'seoul',
    dongs: ['중앙동'],
    localDescription: '안산 단원구 중앙동 주변은 유동인구가 집중된 최대 상권이자 오피스 밀집 지역입니다.',
    buildingCharacteristics: '대형 복합 상가, 유흥/외식 주방 후드, 빌딩 오피스'
  },
  {
    name: '미추홀',
    fullName: '미추홀구',
    slug: 'michuhol',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['숭의동', '용현동', '학익동', '미추홀 도화동', '주안동', '관교동', '문학동'],
    localDescription: '주안역 법조 타운과 남구 최대의 전통적인 교통 요충지 및 대학 상권이 밀집해 있는 주거/상업 거점입니다.',
    buildingCharacteristics: '법조 빌딩, 대학 상권 매장, 역세권 상가, 요식업 주방 및 후드'
  },
  {
    name: '연수',
    fullName: '연수구',
    slug: 'yeonsu',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['옥련동', '선학동', '연수동', '청학동', '동춘동', '송도동'],
    localDescription: '송도국제도시의 첨단 오피스 빌딩 및 바이오 산업 단지와 기존 연수동 생활 상권이 결합된 고밀도 도시입니다.',
    buildingCharacteristics: '초고층 빌딩, 지식산업센터, 다국적 기업 오피스, 송도 프리미엄 아웃렛 매장'
  },
  {
    name: '남동',
    fullName: '남동구',
    slug: 'namdong',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['구월동', '간석동', '만수동', '장수서창동', '서창동', '남촌도림동', '남동 논현동', '논현고잔동'],
    localDescription: '인천시청 행정 타운과 남동국가산업단지(남동공단), 구월동 최대 로데오 상권이 집중된 복합 거점입니다.',
    buildingCharacteristics: '공단 공장 및 창고, 시청 행정 빌딩, 고밀도 상가 및 식당'
  },
  {
    name: '부평',
    fullName: '부평구',
    slug: 'bupyeong',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['부평동', '산곡동', '청천동', '갈산동', '삼산동', '부개동', '일신동', '십정동'],
    localDescription: '인천 최대의 지하상가 쇼핑권과 대규모 주거 타운, 갈산/청천 공업 단지가 어우러진 부평의 중추입니다.',
    buildingCharacteristics: '대규모 지하 상가 및 로드샵, 공업 지대 복합 빌딩, 상업 타워, 학원가'
  },
  {
    name: '계양',
    fullName: '계양구',
    slug: 'gyeyang',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['효성동', '계산동', '작전동', '작전서운동', '계양동'],
    localDescription: '김포공항 인접 교통 요충지이자 서운일반산업단지 등 제조업 및 유통 단지가 발달하는 도시입니다.',
    buildingCharacteristics: '산업단지 제조업 시설, 유통 물류 매장, 학원 및 병원, 역세권 상권'
  },
  {
    name: '인천 서구',
    fullName: '인천 서구',
    slug: 'incheon-seo-gu',
    city: '인천',
    citySlug: 'incheon',
    dongs: ['검암경서동', '인천 연희동', '청라동', '가정동', '석남동', '가좌동', '신현원창동', '검단동', '당하동', '아라동', '검단 오류동'],
    localDescription: '청라국제도시, 루원시티, 검단신도시 등 다수의 계획 신도시와 제조업 공단이 결합된 인천 최대 면적의 성장 거점입니다.',
    buildingCharacteristics: '청라/검단 오피스, 신축 지식산업센터, 매장 쇼윈도 및 준공 현장'
  },
  {
    name: '인천 서해구',
    fullName: '인천 서해구',
    slug: 'incheon-seohae-gu',
    city: '인천',
    citySlug: 'incheon',
    dongs: [],
    localDescription: '서해구 전 지역 종합청소 서비스를 지원하며 기존 인천 서구 권역과 함께 청소 상담이 가능합니다.',
    buildingCharacteristics: '상가, 매장, 오피스 및 지식산업센터'
  },
  {
    name: '인천 검단구',
    fullName: '인천 검단구',
    slug: 'incheon-geomdan-gu',
    city: '인천',
    citySlug: 'incheon',
    dongs: [],
    localDescription: '검단구 전 지역 종합청소 서비스를 지원하며 기존 인천 서구 권역 및 신도시 상권을 중심으로 청소 상담이 가능합니다.',
    buildingCharacteristics: '신축 상가, 아파트 단지 상권, 매장 및 준공 현장'
  }
];
