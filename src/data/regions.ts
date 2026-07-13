import { sourceRegions, SourceRegion } from './regions-source';
import { gyeonggiRegions } from './gyeonggi-regions';

export interface Region {
  city: string;             // 시/도 (예: 서울)
  district: string;         // 구/시/군 (예: 강남구)
  subDistrict: string;      // 동/읍/면 (예: 역삼동)
  regionSlug: string;       // 시/도 슬러그 (예: seoul)
  districtSlug: string;     // 구 슬러그 (예: gangnam)
  subDistrictSlug: string;  // 동 슬러그 (예: yeoksam-dong)
  localDescription: string;
  buildingCharacteristics: string;
  priority: number;
  indexStatus: 'index' | 'noindex';
}

// 동 단위 영문 발음 예외/지정 사전 (URL 슬러그 호환성 유지)
const DONG_SLUG_MAP: { [key: string]: string } = {
  '서초동': 'seocho-dong',
  '반포동': 'banpo-dong',
  '잠원동': 'jamwon-dong',
  '방배동': 'bangbae-dong',
  '양재동': 'yangjae-dong',
  '우면동': 'umyeon-dong',
  '내곡동': 'naegok-dong',
  '역삼동': 'yeoksam-dong',
  '논현동': 'nonhyeon-dong',
  '삼성동': 'samseong-dong',
  '청담동': 'cheongdam-dong',
  '대치동': 'daechi-dong',
  '신사동': 'sinsa-dong',
  '압구정동': 'apgujeong-dong',
  '도곡동': 'dogok-dong',
  '개포동': 'gaepo-dong',
  '수서동': 'suseo-dong',
  '일원동': 'irwon-dong',
  '세곡동': 'segok-dong',
  '잠실동': 'jamsil-dong',
  '신천동': 'sincheon-dong',
  '풍납동': 'pungnap-dong',
  '송파동': 'songpa-dong',
  '석촌동': 'seokchon-dong',
  '삼전동': 'samjeon-dong',
  '가락동': 'garak-dong',
  '문정동': 'munjeong-dong',
  '장지동': 'jangji-dong',
  '방이동': 'bangi-dong',
  '오금동': 'ogeum-dong',
  '거여동': 'geoye-dong',
  '마천동': 'macheon-dong',
  '천호동': 'cheonho-dong',
  '성내동': 'seongnae-dong',
  '길동': 'gil-dong',
  '둔촌동': 'dunchon-dong',
  '암사동': 'amsa-dong',
  '명일동': 'myeongil-dong',
  '고덕동': 'godeok-dong',
  '상일동': 'sangil-dong',
  '강일동': 'gangil-dong',
  '화양동': 'hwayang-dong',
  '군자동': 'gunja-dong',
  '중곡동': 'junggok-dong',
  '능동': 'neung-dong',
  '구의동': 'guui-dong',
  '광장동': 'gwangjang-dong',
  '자양동': 'jayang-dong',
  '성수동': 'seongsudong', // 기존 alternates.canonical 규격 유지
  '왕십리동': 'wangsimni-dong',
  '행당동': 'haengdang-dong',
  '마장동': 'majang-dong',
  '사근동': 'sageun-dong',
  '응봉동': 'eungbong-dong',
  '금호동': 'geumho-dong',
  '옥수동': 'oksu-dong',
  '청량리동': 'cheongryangri-dong',
  '회기동': 'hoegi-dong',
  '휘경동': 'hwigyeong-dong',
  '이문동': 'imun-dong',
  '전농동': 'jeonnong-dong',
  '답십리동': 'dapsimni-dong',
  '장안동': 'jangan-dong',
  '제기동': 'jegi-dong',
  '용두동': 'yongdu-dong',
  '면목동': 'myeonmok-dong',
  '상봉동': 'sangbong-dong',
  '중화동': 'junghwa-dong',
  '묵동': 'muk-dong',
  '망우동': 'mangu-dong',
  '신내동': 'sinnae-dong',
  '성북동': 'seongbuk-dong',
  '삼선동': 'samseon-dong',
  '동선동': 'dongseon-dong',
  '돈암동': 'donam-dong',
  '안암동': 'anam-dong',
  '보문동': 'bomun-dong',
  '정릉동': 'jeongneung-dong',
  '길음동': 'gireum-dong',
  '종암동': 'jongam-dong',
  '월곡동': 'wolgok-dong',
  '장위동': 'jangwi-dong',
  '석관동': 'seokgwan-dong',
  '미아동': 'mia-dong',
  '번동': 'beon-dong',
  '수유동': 'suyu-dong',
  '우이동': 'ui-dong',
  '쌍문동': 'ssangmun-dong',
  '방학동': 'banghak-dong',
  '창동': 'chang-dong',
  '도봉동': 'dobong-dong',
  '월계동': 'wolgye-dong',
  '공릉동': 'gongreung-dong',
  '하계동': 'hagye-dong',
  '중계동': 'junggye-dong',
  '상계동': 'sanggye-dong',
  '수택동': 'sutaek-dong',
  '갈매동': 'galmae-dong',
  '망월동': 'mangwol-dong',
  '신장동': 'sinjang-dong',
  '다산동': 'dasan-dong',
  '별내동': 'byeollae-dong',
  '은평 신사동': 'eunpyeong-sinsa-dong',
  '서대문 연희동': 'seodaemun-yeonhui-dong',
  '마포 도화동': 'mapo-dohwa-dong',
  '구로 오류동': 'guro-oryu-dong',
  '미추홀 도화동': 'michuhol-dohwa-dong',
  '인천 연희동': 'incheon-yeonhui-dong',
  '검단 오류동': 'geomdan-oryu-dong',
  '남동 논현동': 'namdong-nonhyeon-dong',
  '종로1가': 'jongno-1-ga',
  '종로2가': 'jongno-2-ga',
  '종로3가': 'jongno-3-ga',
  '종로4가': 'jongno-4-ga',
  '종로5가': 'jongno-5-ga',
  '종로6가': 'jongno-6-ga'
};

function getDongSlug(dongName: string): string {
  if (DONG_SLUG_MAP[dongName]) {
    return DONG_SLUG_MAP[dongName];
  }
  // 기본 폴백 변환 규칙 (마지막 '동' 제외 후 '-dong' 부여)
  const cleanName = dongName.replace(/동$/, '');
  return `${cleanName.toLowerCase()}-dong`;
}

// 원천 데이터를 기반으로 Region[] 동적 생성
export function generateRegions(): Region[] {
  const list: Region[] = [];

  for (const src of sourceRegions.filter(r => r.city === '서울' || r.city === '인천')) {
    const parentDesc = src.localDescription || `${src.fullName} 전 지역 종합청소 서비스를 지원합니다.`;
    const parentBuilding = src.buildingCharacteristics || '상가, 오피스 빌딩, 매장 및 준공 현장';

    // 1. 구/시 단위 '전지역' 레코드 생성
    list.push({
      city: src.city,
      district: src.fullName,
      subDistrict: '전지역',
      regionSlug: src.citySlug,
      districtSlug: src.slug,
      subDistrictSlug: 'all',
      localDescription: parentDesc,
      buildingCharacteristics: parentBuilding,
      priority: src.city === '서울' ? 1 : 2,
      indexStatus: 'index'
    });

    // 2. 산하 동 단위 레코드들 동적 생성
    for (const dong of src.dongs) {
      const slug = getDongSlug(dong);
      list.push({
        city: src.city,
        district: src.fullName,
        subDistrict: dong,
        regionSlug: src.citySlug,
        districtSlug: src.slug,
        subDistrictSlug: slug,
        // 구 단위 설명글을 상속받아 자연스럽게 문장 구성
        localDescription: `${src.fullName} ${dong} 주변은 ${parentDesc}`,
        buildingCharacteristics: `${dong} 내에 입지한 ${parentBuilding} 공간을 특성에 맞춰 클리닝합니다.`,
        priority: src.city === '서울' ? 1 : 2,
        indexStatus: 'index'
      });
    }
  }

  // 3. 경기 지역 중 시/구 단위(전지역) 레코드만 동적으로 추가
  for (const src of gyeonggiRegions) {
    const parentDesc = src.localDescription || `${src.fullName} 전 지역 종합청소 서비스를 지원합니다.`;
    const parentBuilding = src.buildingCharacteristics || '상가, 오피스 빌딩, 매장 및 준공 현장';

    list.push({
      city: src.city,
      district: src.fullName,
      subDistrict: '전지역',
      regionSlug: src.citySlug,
      districtSlug: src.slug,
      subDistrictSlug: 'all',
      localDescription: parentDesc,
      buildingCharacteristics: parentBuilding,
      priority: 4,
      indexStatus: 'index'
    });
  }

  return list;
}

export const regions = generateRegions();
