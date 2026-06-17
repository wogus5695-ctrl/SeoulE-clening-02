import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/regions';
import { services } from '@/data/services';
import { getKeywordHubMetadata, BRAND_NAME, DOMAIN, CONTACT_PHONE } from '@/lib/seo';
import SectionCTA from '@/components/SectionCTA';
import Link from 'next/link';
import styles from './page.module.css';

type Props = {
  params: Promise<{ cityDistrict: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityDistrict } = await params;
  return getKeywordHubMetadata(cityDistrict);
}

export default async function KeywordHubPage({ params }: Props) {
  const { cityDistrict } = await params;
  const parts = cityDistrict.split('-');
  if (parts.length < 2) notFound();

  const citySlug = parts[0];
  const districtSlug = parts.slice(1).join('-');

  const region = regions.find(r => r.districtSlug === districtSlug && r.subDistrictSlug === 'all');
  const dongs = regions.filter(r => r.districtSlug === districtSlug && r.subDistrictSlug !== 'all');

  if (!region || region.regionSlug !== citySlug) {
    notFound();
  }

  const checklist = [
    '작업 지역 (동 이름)',
    '건물 유형 (상가, 빌딩, 공장 등)',
    '작업명 (외벽, 유리창, 화재 등)',
    '작업 면적 (평수 또는 대략적 크기)',
    '오염 상태 및 특이사항',
    '현장 사진 보유 여부',
    '작업 희망 일정'
  ];

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{region.district} 청소 작업 키워드 허브</h1>
          <p className={styles.subtitle}>
            {region.district} 내 상가, 빌딩, 병원, 학원, 음식점, 사무실, 준공 현장을 대상으로 <br className={styles.pcOnly} />
            외벽청소, 유리창청소, 준공청소, 후드청소 등 주요 청소 작업 페이지를 정리했습니다.
          </p>
        </div>
      </header>

      <SectionCTA 
        title={`${region.district} 청소 통합 견적 문의`}
        subtitle="어떤 작업이든 믿고 맡길 수 있는 전문가를 매칭해 드립니다."
      />

      <section className={styles.content}>
        <div className={styles.container}>
          {/* Gu-level Services */}
          <div className={styles.sectionCard}>
            <h2>{region.district} 주요 작업 바로가기</h2>
            <div className={styles.guLinkGrid}>
              {services.map(service => (
                <Link key={service.id} href={`/${region.regionSlug}/${region.districtSlug}/${service.serviceSlug}`} className={styles.guLink}>
                  {region.district} {service.serviceNameKo}
                </Link>
              ))}
            </div>
          </div>

          {/* Dong-level Services Navigation */}
          <div className={styles.sectionCard}>
            <h2>동 단위 세부 작업 탐색</h2>
            <p className={styles.sectionDesc}>원하시는 동네를 선택하시면 상세 작업 정보를 확인하실 수 있습니다.</p>
            <div className={styles.dongGroupGrid}>
              {dongs.map(dong => (
                <div key={dong.subDistrictSlug} className={styles.dongGroup}>
                  <h3>{dong.subDistrict}</h3>
                  <div className={styles.dongSubLinks}>
                    {services.slice(0, 5).map(service => (
                      <Link key={service.id} href={`/${dong.regionSlug}/${dong.districtSlug}/${dong.subDistrictSlug}/${service.serviceSlug}`}>
                        {service.serviceNameKo}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottomGrid}>
            {/* Consultation Checklist */}
            <div className={styles.checklistCard}>
              <h3>상담 전 확인사항</h3>
              <p>문의 시 아래 내용을 미리 알려주시면 더욱 빠르고 정확한 견적 안내가 가능합니다.</p>
              <ul className={styles.checklist}>
                {checklist.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Region Info */}
            <div className={styles.infoCard}>
              <h3>{region.district} 지역 특징</h3>
              <p>{region.localDescription}</p>
              <p style={{ marginTop: '15px' }}><strong>주요 작업 대상:</strong> {region.buildingCharacteristics}</p>
              <div className={styles.ctaBox}>
                <a href={`tel:${CONTACT_PHONE}`} className={styles.primaryBtn}>{region.district} 실시간 상담</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA 
        title={`${region.district} 청소 솔루션이 필요하신가요?`}
        subtitle="지금 바로 상세한 상담과 무료 견적을 받아보세요."
      />
    </div>
  );
}

export async function generateStaticParams() {
  const uniqueDistricts = Array.from(new Set(regions.map(r => r.districtSlug)));
  return uniqueDistricts.map(dSlug => {
    const r = regions.find(reg => reg.districtSlug === dSlug);
    return {
      cityDistrict: `${r?.regionSlug}-${dSlug}`,
    };
  });
}
