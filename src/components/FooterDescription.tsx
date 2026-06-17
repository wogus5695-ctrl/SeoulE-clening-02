'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
import { BRAND_NAME } from '@/lib/seo';

export default function FooterDescription() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL에서 지역 및 서비스 정보 추출 시도
  let currentRegion = '';
  let currentService = '';

  // 1. 상세 페이지 URL 분석 (/[city]/[district]/[...slug])
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 3) {
    const citySlug = parts[0];
    const districtSlug = parts[1];
    const subOrServiceSlug = parts[2];
    const serviceSlug = parts[parts.length - 1];

    const region = regions.find(r => 
      r.districtSlug === districtSlug && 
      (parts.length === 4 ? r.subDistrictSlug === subOrServiceSlug : r.subDistrictSlug === 'all')
    );
    const service = services.find(s => s.serviceSlug === serviceSlug);

    if (region) {
      currentRegion = region.subDistrict === '전지역' ? region.district : region.subDistrict;
    }
    if (service) {
      currentService = service.serviceNameKo;
    }
  }

  // 2. URL 파라미터(kw)가 있으면 우선 적용
  const kw = searchParams.get('kw');
  if (kw) currentRegion = kw;

  // 3. 메인페이지 파라미터 확인
  const pService = searchParams.get('service');
  if (pService) currentService = pService;

  // 기본값 설정
  const displayRegion = currentRegion || '서울 동부권';
  const displayService = currentService || '종합청소';

  return (
    <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#666' }}>
      {displayRegion} {displayService} 전문 {BRAND_NAME}은<br />
      상가, 빌딩, 매장 및 준공, 특수 현장 등<br />
      자재별 맞춤 친환경 클리닝 솔루션을 제안합니다.<br />
      동서울 및 경기 동부 신속 무료 방문 견적이 가능합니다.
    </p>
  );
}
