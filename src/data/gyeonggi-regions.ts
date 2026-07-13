import { SourceRegion } from './regions-source';

export interface GyeonggiRegion extends SourceRegion {
  id: string; // 고유한 식별 키 (예: 'gyeonggi-gimpo')
}

export const gyeonggiRegions: GyeonggiRegion[] = [
  // 1. 김포시
  {
    id: 'gyeonggi-gimpo',
    name: '김포',
    fullName: '김포시',
    slug: 'gimpo',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['사우동', '풍무동', '김포 장기동', '구래동', '운양동', '마산동', '북변동', '걸포동'],
    localDescription: '한강신도시 개발과 함께 고밀도 주거 상권이 조성된 김포 권역입니다.',
    buildingCharacteristics: '신축 상가 빌딩, 프렌차이즈 매장, 대단지 아파트 상가'
  },
  // 2. 고양시 (시 단위 대표)
  {
    id: 'gyeonggi-goyang',
    name: '고양',
    fullName: '고양시',
    slug: 'goyang',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: [],
    localDescription: '킨텍스 전시관 및 대규모 배후 신도시를 보유한 고양 권역입니다.',
    buildingCharacteristics: '상업 빌딩, 대형 전시장, 오피스텔 단지'
  },
  // 고양시 일반구
  {
    id: 'gyeonggi-goyang-deogyang',
    name: '덕양구',
    fullName: '고양 덕양구',
    slug: 'goyang-deogyang',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['주교동', '원신동', '흥도동', '신도동', '창릉동', '고양동', '관산동', '능곡동', '화정동', '행주동', '행신동', '화전동', '대덕동'],
    localDescription: '삼송/지축 신도시 개발과 교통 중심지가 결합된 고양 덕양구 권역입니다.',
    buildingCharacteristics: '삼송 신축 상가, 화정역 로드샵 매장, 지식산업센터'
  },
  {
    id: 'gyeonggi-goyang-ilsandong',
    name: '일산동구',
    fullName: '고양 일산동구',
    slug: 'goyang-ilsandong',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['식사동', '중산동', '정발산동', '풍산동', '고양 백석동', '마두동', '장항동', '고봉동'],
    localDescription: '일산 호수공원 주변 대형 상권 및 웨스턴돔/라페스타 쇼핑몰이 집중된 구역입니다.',
    buildingCharacteristics: '쇼핑몰 상가, 웨딩홀 및 대형 부페 주방, 오피스 빌딩'
  },
  {
    id: 'gyeonggi-goyang-ilsanseo',
    name: '일산서구',
    fullName: '고양 일산서구',
    slug: 'goyang-ilsanseo',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['일산동', '탄현동', '주엽동', '대화동', '송포동', '송산동'],
    localDescription: '킨텍스(KINTEX) 전시장 및 대화역 역세권 상권이 발달한 경기 서북부의 중심지입니다.',
    buildingCharacteristics: '킨텍스 전시장 배후 매장, 대형 학원 빌딩, 프랜차이즈 상가'
  },
  // 3. 부천시 (시 단위 대표)
  {
    id: 'gyeonggi-bucheon',
    name: '부천',
    fullName: '부천시',
    slug: 'bucheon',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: [],
    localDescription: '서울 및 인천과 인접하여 유동인구가 집중된 고밀도 복합 상업 도시입니다.',
    buildingCharacteristics: '초고층 아파트 상가, 복합 문화 쇼핑 상가, 지상 매장'
  },
  // 부천시 일반구
  {
    id: 'gyeonggi-bucheon-wonmi',
    name: '원미구',
    fullName: '부천 원미구',
    slug: 'bucheon-wonmi',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['심곡동', '부천동', '부천 중동', '상동', '신중동'],
    localDescription: '부천시의 대표적인 상업 허브이자 중동/상동 신도시 상권이 집중된 핵심 지역입니다.',
    buildingCharacteristics: '백화점 주변 대형 상가, 중동/상동 상업 빌딩, 외식업 주방 및 어닝'
  },
  {
    id: 'gyeonggi-bucheon-sosa',
    name: '소사구',
    fullName: '부천 소사구',
    slug: 'bucheon-sosa',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['대산동', '소사본동', '범안동'],
    localDescription: '소사역 역세권 개발과 구도심 주거 생활권이 결합된 남부 중심 구역입니다.',
    buildingCharacteristics: '중소형 학원, 메디컬 상가 빌딩, 소형 로드샵 매장'
  },
  {
    id: 'gyeonggi-bucheon-ojeong',
    name: '오정구',
    fullName: '부천 오정구',
    slug: 'bucheon-ojeong',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['오정동', '성곡동'],
    localDescription: '오정 산업단지 및 김포공항 배후 물류망이 연계된 북부의 신흥 거점 구역입니다.',
    buildingCharacteristics: '제조 및 물류창고형 빌딩, 지식산업센터, 산업단지 매장'
  },
  // 4. 광명시
  {
    id: 'gyeonggi-gwangmyeong',
    name: '광명',
    fullName: '광명시',
    slug: 'gwangmyeong',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['광명동', '철산동', '하안동', '소하동', '학온동', '일직동'],
    localDescription: 'KTX 광명역 이케아/코스트코 대형 유통 상권과 철산역 역세권 상업지구가 융합된 핵심지입니다.',
    buildingCharacteristics: '역세권 대형 복합 쇼핑 상가, 지식산업센터, 요식업 주방 후드'
  },
  // 5. 시흥시
  {
    id: 'gyeonggi-siheung',
    name: '시흥',
    fullName: '시흥시',
    slug: 'siheung',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['대야동', '신천동', '신현동', '은행동', '매화동', '목감동', '군자동', '월곶동', '정왕동', '배곧동', '연성동', '장곡동', '능곡동'],
    localDescription: '시화 MTV 개발 및 배곧신도시 대학가 상권이 공존하는 서해안 벨트 중심 도시입니다.',
    buildingCharacteristics: '배곳신도시 대단지 상가, 지식산업센터, 매장 쇼윈도 및 유리창'
  },
  // 6. 안양시 (시 단위 대표)
  {
    id: 'gyeonggi-anyang',
    name: '안양',
    fullName: '안양시',
    slug: 'anyang',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: [],
    localDescription: '안양역 일 번가 전통 상권과 평촌 신도시 핵심 행정타운이 결합된 중추 도시입니다.',
    buildingCharacteristics: '평촌 오피스 빌딩, 안양일번가 상업 매장, 메디컬 빌딩'
  },
  // 안양시 일반구
  {
    id: 'gyeonggi-anyang-manan',
    name: '만안구',
    fullName: '안양 만안구',
    slug: 'anyang-manan',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['안양동', '석수동', '박달동'],
    localDescription: '안양역 중심 상권과 전통적인 상업 인프라가 갖추어진 활기찬 구역입니다.',
    buildingCharacteristics: '로드샵 어닝 및 간판, 구도심 상가 주택, 소극장 및 전시 공간'
  },
  {
    id: 'gyeonggi-anyang-dongan',
    name: '동안구',
    fullName: '안양 동안구',
    slug: 'anyang-dongan',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['비산동', '안양 관양동', '평촌동', '평안동', '귀인동', '범계동', '안양 신촌동', '안양 갈산동', '호계동'],
    localDescription: '평촌 신도시 행정 타운 and 안양IT밸리 지식산업센터가 밀집된 지식 비즈니스 구역입니다.',
    buildingCharacteristics: '지식산업센터 빌딩, 범계역 핵심 로데오 상업 빌딩, 병원/학원 빌딩'
  },
  // 7. 과천시
  {
    id: 'gyeonggi-gwacheon',
    name: '과천',
    fullName: '과천시',
    slug: 'gwacheon',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['과천 중앙동', '갈현동', '별양동', '부림동', '과천동', '문원동'],
    localDescription: '정부과천청사 및 지식정보타운 신규 첨단 비즈니스 지구가 구축된 명품 배후 도시입니다.',
    buildingCharacteristics: '신축 오피스 빌딩, 정부청사 주변 상가, 정보타운 지식산업센터'
  },
  // 8. 군포시
  {
    id: 'gyeonggi-gunpo',
    name: '군포',
    fullName: '군포시',
    slug: 'gunpo',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['군포동', '군포 산본동', '금정동', '재궁동', '오금동', '수리동', '궁내동', '군포 대야동', '광정동', '송부동'],
    localDescription: '산본신도시 중심 상업용 로데오 거리와 금정역 역세권 환승 허브가 연계된 중심지입니다.',
    buildingCharacteristics: '산본 로데오 빌딩, 역세권 지식산업센터, 요식업 후드 및 주방'
  },
  // 9. 안산시 (시 단위 대표)
  {
    id: 'gyeonggi-ansan',
    name: '안산',
    fullName: 'ansan', // 기존 canonical 유지
    slug: 'ansan',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: [],
    localDescription: '반월국가산업단지의 제조/IT 기반 배후 상업 및 행정 중심 도시입니다.',
    buildingCharacteristics: '공단 제조형 빌딩, 대형 유통 상가, 역세권 오피스텔'
  },
  // 안산시 일반구
  {
    id: 'gyeonggi-ansan-sangrok',
    name: '상록구',
    fullName: '안산 상록구',
    slug: 'ansan-sangrok',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['안산 일동', '안산 이동', '안산 사동', '본오동', '안산 부곡동', '월피동', '성포동', '반월동', '안산동'],
    localDescription: '한양대 에리카 캠퍼스 대학가 상권과 본오동 배후 주거 상권이 활성화된 지역입니다.',
    buildingCharacteristics: '대학가 이색 매장, 상가 주택 빌딩, 신축 복합 메디컬 상가'
  },
  {
    id: 'gyeonggi-ansan-danwon',
    name: '단원구',
    fullName: '안산 단원구',
    slug: 'ansan-danwon',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['와동', '신길동', '원곡동', '초지동', '백운동', '선부동', '대부동', '안산 중앙동', '호수동'],
    localDescription: '안산 최대 중심 상권인 고잔동 및 중앙역 역세권 상업 타운이 위치한 구역입니다.',
    buildingCharacteristics: '중앙역 로데오 대형 빌딩, 고잔동 오피스 타워, 백화점 주변 쇼핑 상가'
  },
  // 10. 의왕시
  {
    id: 'gyeonggi-uiwang',
    name: '의왕',
    fullName: '의왕시',
    slug: 'uiwang',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['고천동', '오전동', '내손동', '청계동', '삼동', '의왕 부곡동'],
    localDescription: '의왕 테크노파크 개발 및 철도 물류 연구 거점 배후 상권이 연계된 쾌적한 도시입니다.',
    buildingCharacteristics: '테크노파크 신축 공장/오피스, 상가 빌딩, 학원 상가'
  },
  // 11. 성남시 (시 단위 대표)
  {
    id: 'gyeonggi-seongnam',
    name: '성남',
    fullName: '성남시',
    slug: 'seongnam',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: [],
    localDescription: '서울 강남권과 최인접한 명실상부한 첨단 IT 비즈니스 및 고밀도 주거 중심 요충지입니다.',
    buildingCharacteristics: 'IT 벤처 센터, 고밀도 중심 상가 빌딩, 로드샵 매장'
  },
  // 성남시 일반구
  {
    id: 'gyeonggi-seongnam-sujeong',
    name: '수정구',
    fullName: '성남 수정구',
    slug: 'seongnam-sujeong',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['성남 신흥동', '태평동', '수진동', '단대동', '산성동', '양지동', '복정동', '창곡동', '고등동', '시흥동'],
    localDescription: '위례신도시 신축 상권과 가천대/동서울대 대학가 활성 지구가 결합된 구역입니다.',
    buildingCharacteristics: '위례 테라스 상가, 구도심 리모델링 빌딩, 대학가 로드샵 매장'
  },
  {
    id: 'gyeonggi-seongnam-jungwon',
    name: '중원구',
    fullName: '성남 중원구',
    slug: 'seongnam-jungwon',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['성남동', '성남 중동', '금광동', '성남 은행동', '상대원동', '하대원동', '도촌동', '여수동'],
    localDescription: '모란역 종합 시장/핵심 교통 환승 상권과 성남 하이테크밸리 아파트형 공장이 결합된 구역입니다.',
    buildingCharacteristics: '모란역 대형 상업 빌딩, 모란시장 전통 어닝/간판, 공장 및 지식산업센터'
  },
  {
    id: 'gyeonggi-seongnam-bundang',
    name: '분당구',
    fullName: '성남 분당구',
    slug: 'seongnam-bundang',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['분당동', '수내동', '성남 정자동', '율동', '서현동', '이매동', '야탑동', '판교동', '삼평동', '백현동', '성남 금곡동', '구미동', '운중동'],
    localDescription: '판교 테크노밸리 IT 대기업군과 분당 정자 카페거리 등 명품 상권이 구축된 경기 남부 최고 요충지입니다.',
    buildingCharacteristics: '판교 테크노밸리 오피스 빌딩, 정자동 정밀 유리창 및 외벽, 서현역 로데오 상가'
  },
  // 12. 하남시
  {
    id: 'gyeonggi-hanam',
    name: '하남',
    fullName: '하남시',
    slug: 'hanam',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['천현동', '신장동', '덕풍동', '풍산동', '미사동', '감일동', '위례동', '초이동'],
    localDescription: '미사강변도시 역세권 상권과 초대형 스타필드 쇼핑몰이 집중된 트렌디 주거 상업 신도시입니다.',
    buildingCharacteristics: '미사역 고밀도 상업 빌딩, 스타필드 하남 배후 상가, 지식산업센터'
  },
  // 13. 구리시
  {
    id: 'gyeonggi-guri',
    name: '구리',
    fullName: '구리시',
    slug: 'guri',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['갈매동', '동구동', '인창동', '교문동', '수택동'],
    localDescription: '서울 광진/중랑구와 직통 연결된 생활 밀접형 상권과 구리 전통시장 중심 상권이 발달한 도시입니다.',
    buildingCharacteristics: '구리역 대형 상업 빌딩, 전통시장 매장, 로드샵 간판 및 주방'
  },
  // 14. 양주시
  {
    id: 'gyeonggi-yangju',
    name: '양주',
    fullName: '양주시',
    slug: 'yangju',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['양주동', '회천동', '옥정동', '광적면', '백석읍', '장흥면'],
    localDescription: '옥정신도시 및 회천신도시 중심의 대규모 신규 상권이 정착되고 있는 북부 핵심 거점 도시입니다.',
    buildingCharacteristics: '옥정역 신축 복합 상가, 신도시 학원/병원, 준공 및 입주 청소 현장'
  },
  // 15. 남양주시
  {
    id: 'gyeonggi-namyangju',
    name: '남양주',
    fullName: '남양주시',
    slug: 'namyangju',
    city: '경기',
    citySlug: 'gyeonggi',
    dongs: ['와부읍', '진접읍', '화도읍', '진건읍', '오남읍', '퇴계원읍', '별내면', '수동면', '조안면', '호평동', '평내동', '남양주 금곡동', '양정동', '남양주 다산동', '별내동'],
    localDescription: '다산신도시, 별내신도시 및 별내 카페거리 등 쾌적한 위생 관리가 요구되는 신도시 밀집 연계 도시입니다.',
    buildingCharacteristics: '다산/별내 복합 지식산업센터, 별내 신축 상가 카페, 병원 및 외식 매장'
  }
];
