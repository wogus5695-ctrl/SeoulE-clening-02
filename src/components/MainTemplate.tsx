"use client";

import { useState, useEffect } from 'react';
import { services, displayServices } from '@/data/services';
import { BRAND_NAME, CONTACT_PHONE, SEO_IMAGE_MAP } from '@/lib/seo';
import { regions, Region } from '@/data/regions';
import { KeywordRecord } from '@/data/keywords';
import { serviceContents } from '@/data/service-contents';
import Link from 'next/link';
import FloatingContact from '@/components/FloatingContact';
import styles from '@/app/page.module.css';

interface MainTemplateProps {
  region?: string;
  service?: string;
  regionObj?: Region;
  keywordObj?: KeywordRecord;
}

export default function MainTemplate({ 
  region = '서울·경기', 
  service = '종합청소',
  regionObj,
  keywordObj
}: MainTemplateProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Before/After Slideshow states
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const portfolioVisibleCount = 1; // Always show 1 card per slide for larger images
  const [portfolioPaused, setPortfolioPaused] = useState(false);

  const portfolioItems = [
    {
      title: '마루 왁스코팅',
      before: '/images/portfolio/wax-before.jpg',
      after: '/images/portfolio/wax-after.jpg'
    },
    {
      title: '주방후드청소',
      before: '/images/portfolio/hood-before.jpg',
      after: '/images/portfolio/hood-after.jpg'
    },
    {
      title: '준공청소',
      before: '/images/portfolio/construction-before.jpg',
      after: '/images/portfolio/construction-after.jpg'
    },
    {
      title: '화재청소',
      before: '/images/portfolio/fire-before.jpg',
      after: '/images/portfolio/fire-after.jpg'
    }
  ];
  const totalPortfolioCards = portfolioItems.length;

  useEffect(() => {
    if (portfolioPaused) return;

    const interval = setInterval(() => {
      setPortfolioIndex((prev) => {
        const maxIndex = totalPortfolioCards - portfolioVisibleCount;
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [portfolioPaused]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const mainServicesList = displayServices;

  // 현재 활성화된 서비스 상세 데이터 조회 (neededSituations 동적 연동용)
  const activeServiceObj = services.find(s => 
    s.serviceNameKo === service || 
    s.serviceNameKo.replace(/\s+/g, '') === service.replace(/\s+/g, '')
  );

  const replacePlaceholders = (text: string) => {
    const displayRegion = region === '서울·경기' ? '서울' : region;
    const displayService = service === '종합청소' ? '청소' : service;
    return text
      .replace(/{region}/g, displayRegion)
      .replace(/{service}/g, displayService);
  };

  // 적합한 현장 섹션 헤더 설명문
  const getSuitableDesc = () => {
    const customContent = serviceContents[service];
    if (customContent) {
      return replacePlaceholders(customContent.suitableDesc);
    }
    if (keywordObj || (region !== '서울·경기' && service !== '종합청소')) {
      return `${region} 인근 현장의 건물 유형과 작업 조건을 고려해 상담합니다.`;
    }
    return '비즈니스 공간부터 주택 및 특수 오염지까지 현장 맞춤형 솔루션을 대입합니다.';
  };

  // 적합한 현장 카드 리스트 (작업별 문제 상황 연동)
  const getSuitableCards = () => {
    const customContent = serviceContents[service];
    if (customContent && service !== '종합청소') {
      return customContent.situations.map((item) => ({
        name: item.title,
        desc: item.desc
      }));
    }
    if (activeServiceObj && service !== '종합청소' && activeServiceObj.neededSituations?.length > 0) {
      return activeServiceObj.neededSituations.map((situation, idx) => ({
        name: `상황 0${idx + 1}`,
        desc: situation
      }));
    }
    return [
      { name: '상가 / 매장', desc: '고객 유치를 위한 매장 쇼윈도 유리창, 간판, 이끼 핀 어닝 정밀 세척' },
      { name: '빌딩 / 상업시설', desc: '외벽 로프 세정 및 로비, 대리석 계단, 공용 화장실 정기 관리' },
      { name: '사무실 / 업무공간', desc: '데코타일 찌든 오염 기계 폴리싱 머신 세정 및 바닥 왁스코팅' },
      { name: '음식점 / 식당 주방', desc: '화재 예방을 위한 주방 후드, 배기 덕트 내부 기름때 유화 세정' }
    ];
  };

  // Hero 서브문구 설정
  const getHeroDesc = () => {
    const customContent = serviceContents[service];
    let introText = '';
    const displayRegion = region === '서울·경기' ? '서울' : region;
    
    if (customContent && service !== '종합청소') {
      introText = customContent.intro.replace(/{region}/g, displayRegion);
    } else {
      introText = '상가, 매장, 빌딩, 사무실, 음식점, 준공 현장까지 오염 상태와 작업 조건에 맞춰 청소를 안내합니다.';
    }

    const targetRegion = keywordObj ? keywordObj.regionName : region;
    if (targetRegion.includes('인천 서구') || targetRegion.includes('인천서구')) {
      introText = `${targetRegion} ${service} 상담은 기존 인천 서구 권역과 현 서해구·검단구 일대 현장 조건을 함께 고려해 안내합니다. ` + introText;
    }
    return introText;
  };

  // H1 타이틀 설정
  const getHeroTitle = () => {
    if (keywordObj) {
      const serviceName = keywordObj.serviceName;
      const regionName = keywordObj.regionName;
      return (
        <>
          {regionName} <span className={styles.highlight}>{serviceName}</span> 전문
          <br />
          올케어서비스
        </>
      );
    }
    if (region !== '서울·경기' && service !== '종합청소') {
      return (
        <>
          {region} <span className={styles.highlight}>{service}</span> 전문
          <br />
          올케어서비스
        </>
      );
    }
    return (
      <>
        공간의 가치를 높이는<br />
        <span className={styles.highlight}>서울 종합청소 전문</span> 올케어
      </>
    );
  };


  const isDynamic = !!keywordObj || (region !== '서울·경기' && service !== '종합청소');

  const HOOKING_MAP: { [key: string]: string } = {
    '외벽청소': '외벽 오염부터 확인하세요',
    '유리창청소': '유리 얼룩부터 확인하세요',
    '화재청소': '그을음과 냄새부터 정리하세요',
    '화재현장 청소': '그을음과 냄새부터 정리하세요',
    '바닥왁스코팅': '바닥 광택부터 회복하세요',
    '바닥청소 및 왁스코팅': '바닥 광택부터 회복하세요',
    '어닝청소': '매장 전면 오염부터 정리하세요',
    '어닝/간판청소': '매장 전면 오염부터 정리하세요',
    '간판청소': '간판 오염부터 확인하세요',
    '인테리어 후 청소': '공사 분진부터 정리하세요',
    '준공청소': '입주 전 먼지부터 정리하세요',
    '준공/인테리어 후 청소': '입주 전 먼지부터 정리하세요',
    '후드청소': '기름때와 악취부터 관리하세요',
    '특수청소': '방치된 오염부터 확인하세요',
    '쓰레기집/특수 청소': '방치된 오염부터 확인하세요',
    '바닥청소': '바닥 찌든 때부터 정리하세요',
    '쓰레기집 청소': '정리 범위부터 확인하세요'
  };

  const hookingText = HOOKING_MAP[service] || '작업 범위와 견적부터 확인하세요';

  const seoImage = SEO_IMAGE_MAP[service];
  const dynamicImageUrl = seoImage ? seoImage.image : '/images/seo-thumbnails/allcare-cleaning-main.webp';
  const dynamicAltText = seoImage ? `${region} ${seoImage.altBase}` : `${region} ${service} 전문 청소 현장`;

  return (
    <div className={styles.container}>
      {/* 1. Hero Section */}
      <section className={styles.hero} role="img" aria-label="깨끗하게 청소 및 정돈된 상업 공간 매장 배경 이미지">
        <img
          src={dynamicImageUrl}
          alt={dynamicAltText}
          width="1200"
          height="630"
          className={styles.heroBgImage}
          loading="eager"
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 3 }}>
          <div className="animate-fade-up">
            <span className={styles.badge}>
              {region.includes('인천') || (keywordObj && keywordObj.regionName.includes('인천')) 
                ? '인천 주요 지역 종합청소 서비스' 
                : '서울 주요 지역 종합청소 서비스'}
            </span>
            <h1 className={styles.heroTitle}>
              {getHeroTitle()}
            </h1>
            <p className={styles.heroDesc}>
              {getHeroDesc()}
            </p>
            <div className={styles.heroCta}>
              <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>
                {keywordObj 
                  ? `${keywordObj.regionName} ${keywordObj.serviceName} 상담하기` 
                  : (regionObj || region !== '서울·경기' || service !== '종합청소' ? `${region} ${service} 상담하기` : '서울 종합청소 전화 상담')
                }
              </a>
            </div>
            <div className={styles.heroTip}>
              <span>
                {keywordObj || regionObj || region !== '서울·경기' || service !== '종합청소'
                  ? '💡 현장 사진과 위치를 알려주시면 작업 가능 여부와 상담 방향을 빠르게 안내해 드립니다.'
                  : '💡 지역과 작업명을 알려주시면 작업 가능 여부를 빠르게 안내해 드립니다.'
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 서비스 안내 섹션 */}
      <section id="services" className={styles.services}>
        <div className={styles.inner}>
          <div className={styles.servicesWrapper}>
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>SERVICES</span>
              <h2 className={styles.sectionTitle}>올케어 전문 청소 서비스</h2>
              <p className={styles.sectionDesc}>현장의 오염도와 난이도 조건에 맞춰 실무 방법으로 정밀하게 세정합니다.</p>
            </div>
            <div className={styles.serviceGrid}>
              {mainServicesList.map((item) => (
                <div key={item.id} className={styles.serviceCard}>
                  <div className={styles.serviceImage}>
                    <img src={item.image} alt={`${item.name} 전문 청소 서비스`} />
                  </div>
                  <div className={styles.serviceContent}>
                    <div className={styles.serviceTags}>
                      {item.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className={styles.serviceTag}>#{tag}</span>
                      ))}
                    </div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.servicesBottomCta}>
              <p className={styles.ctaTip}>어떤 청소가 필요한지 모르겠다면</p>
              <p className={styles.ctaNotice}>현장 사진과 위치를 보내주시면 가능한 작업부터 안내해 드립니다.</p>
              <div className={styles.ctaActions}>
                <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>사진 상담하기</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 이런 현장에 적합합니다 섹션 */}
      <section className={styles.suitable} role="img" aria-label="청소 완료 후 정돈된 깨끗한 실내 오피스 빌딩 배경 이미지">
        <div className={styles.suitableOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.sectionHeaderLight}>
            <span className={styles.subTitleLight}>SUITABLE FOR</span>
            <h2 className={styles.sectionTitleLight}>올케어 청소는 이런 현장에 필요합니다</h2>
            <p className={styles.sectionDescLight}>{getSuitableDesc()}</p>
          </div>
          <div className={styles.suitableGrid}>
            {getSuitableCards().map((field, idx) => (
              <div key={idx} className={styles.suitableCard}>
                <div className={styles.suitableIcon}>✔</div>
                <div className={styles.suitableInfo}>
                  <h3>{field.name}</h3>
                  <p>{field.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 동적 랜딩 전용 CTA (동적 유입 시 중간에 강조 노출) */}
      {(keywordObj || (region !== '서울·경기' && service !== '종합청소')) && (
        <section className={styles.landingCtaSection} role="img" aria-label="올케어 서비스 상담 안내 배경">
          <div className={styles.landingCtaOverlay}></div>
          <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
            <div className={styles.landingCtaBox}>
              <h2>📞 {region} {service} 신속 상담 안내</h2>
              <p className={styles.landingCtaDesc}>작업을 원하시는 공간 조건과 위치를 말씀해 주시면 상세 견적 확인이 더욱 빨라집니다.</p>
              <p className={styles.landingCtaTip}>💡 오염 상태와 범위에 따라 작업 일정 및 최종 견적 가격이 유동적으로 조정될 수 있습니다.</p>
              <div className={styles.landingCtaButtons}>
                <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>📞 실시간 무료 전화 상담</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-2. 청소 범위 설정 안내 섹션 (벤다이어그램 / 단계형 카드) */}
      <section className={styles.rangeSection}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>CLEANING SCOPE</span>
            <h2 className={styles.sectionTitle}>청소 범위는 현장 상태를 보고 정합니다</h2>
            <p className={styles.sectionDesc}>
              공간 구조, 오염 상태, 필요한 작업 종류를 확인한 뒤 무리한 작업보다 필요한 범위부터 안내합니다.
            </p>
          </div>

          {/* PC용: 벤다이어그램 인포그래픽 */}
          <div className={styles.pcDiagramWrapper}>
            <div className={styles.diagramContainer}>
              {/* Circle 1 (Top) */}
              <div className={`${styles.circle} ${styles.circle1}`}>
                <div className={styles.circleText}>
                  <h3>현장 상태</h3>
                  <p>면적 · 구조 · 접근성</p>
                </div>
              </div>

              {/* Circle 2 (Bottom Left) */}
              <div className={`${styles.circle} ${styles.circle2}`}>
                <div className={styles.circleText}>
                  <h3>오염 상태</h3>
                  <p>먼지 · 기름때 · 생활오염</p>
                </div>
              </div>

              {/* Circle 3 (Bottom Right) */}
              <div className={`${styles.circle} ${styles.circle3}`}>
                <div className={styles.circleText}>
                  <h3>작업 종류</h3>
                  <p>
                    외벽 · 유리창 · 바닥 · 준공
                    <br />
                    후드 · 특수청소
                  </p>
                </div>
              </div>
              
              {/* Center intersection circle */}
              <div className={styles.intersection}>
                맞춤 작업<br />범위 안내
              </div>
            </div>
            <p className={styles.diagramFooterDesc}>
              💡 전화 상담 시 지역과 필요한 청소 종류만 알려주셔도 작업 가능 여부부터 확인해드립니다.
            </p>
          </div>

          {/* 모바일용: 세로 카드형 레이아웃 */}
          <div className={styles.mobileStepsWrapper}>
            <div className={styles.mobileSteps}>
              <div className={styles.mobileStepCard}>
                <div className={styles.mobileStepInfo}>
                  <h3>현장 상태</h3>
                  <p>면적 · 구조 · 접근성</p>
                </div>
              </div>
              <div className={styles.mobileStepCard}>
                <div className={styles.mobileStepInfo}>
                  <h3>오염 상태</h3>
                  <p>먼지 · 기름때 · 생활오염</p>
                </div>
              </div>
              <div className={styles.mobileStepCard}>
                <div className={styles.mobileStepInfo}>
                  <h3>작업 종류</h3>
                  <p>외벽 · 유리창 · 바닥 · 준공 · 후드 · 특수청소</p>
                </div>
              </div>
              <div className={styles.mobileResultCard}>
                <h3>맞춤 작업 범위 안내</h3>
              </div>
            </div>
            <p className={styles.diagramFooterDesc}>
              💡 전화 상담 시 지역과 필요한 청소 종류만 알려주셔도 작업 가능 여부부터 확인해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 올케어 서비스의 진행 방식 */}
      <section className={styles.process} role="img" aria-label="유리창 및 실내 청소 작업 도구가 준비된 정돈된 매장 배경 이미지">
        <div className={styles.processOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.processWrapper}>
            <div className={styles.sectionHeader}>
              <span className={styles.subTitle}>WORK PROCESS</span>
              <h2 className={styles.sectionTitle}>올케어 서비스의 진행 방식</h2>
              <p className={styles.sectionDesc}>과도한 추가금 요구 없는 투명하고 체계적인 6단계 진행 방식입니다.</p>
            </div>
            <div className={styles.timelineContainer}>
              <div className={styles.timelineLine}></div>
              <div className={styles.processSteps}>
                {[
                  { step: '01', title: '상담 접수', desc: '사진·위치 확인' },
                  { step: '02', title: '상태 확인', desc: '오염도·면적 확인' },
                  { step: '03', title: '견적 안내', desc: '범위·비용 안내' },
                  { step: '04', title: '일정 조율', desc: '작업 시간 조율' },
                  { step: '05', title: '청소 진행', desc: '현장 맞춤 작업' },
                  { step: '06', title: '마감 확인', desc: '작업 후 확인' }
                ].map((item, idx) => (
                  <div key={idx} className={styles.processStepCard}>
                    <div className={styles.stepBadge}>{item.step}</div>
                    <div className={styles.stepContent}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.processBottomCta}>
              <p className={styles.processCtaTitle}>사진과 위치만 보내도 상담이 가능합니다.</p>
              <div className={styles.processCtaActions}>
                <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>사진 보내고 상담하기</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-2. 실제 작업 현장 전후 비교 섹션 */}
      <section 
        className={styles.portfolioSection}
        style={{
          '--visible-count': portfolioVisibleCount,
          '--gap': portfolioVisibleCount === 1 ? '16px' : '28px'
        } as React.CSSProperties}
      >
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>BEFORE & AFTER</span>
            <h2 className={styles.sectionTitle}>주요 청소 작업 전후 사례</h2>
            <p className={styles.sectionDesc}>작업 전후 상태를 사진으로 확인할 수 있습니다.</p>
          </div>
          
          <div 
            className={styles.portfolioTrackWrapper}
            onMouseEnter={() => setPortfolioPaused(true)}
            onMouseLeave={() => setPortfolioPaused(false)}
          >
            <div 
              className={styles.portfolioTrack}
              style={{
                transform: `translateX(calc(-${portfolioIndex} * (100% + var(--gap)) / var(--visible-count)))`
              }}
            >
              {portfolioItems.map((item, idx) => (
                <div key={idx} className={styles.portfolioCard}>
                  <h3 className={styles.portfolioCardTitle}>
                    <span className={styles.portfolioCardBar}></span>
                    {item.title}
                  </h3>
                  <div className={styles.portfolioImages}>
                    <div className={styles.portfolioImgWrapper}>
                      <img src={item.before} alt={`${item.title} 작업 전 상태`} />
                      <span className={`${styles.portfolioBadge} ${styles.before}`}>BEFORE</span>
                    </div>
                    <div className={styles.portfolioImgWrapper}>
                      <img src={item.after} alt={`${item.title} 작업 후 상태`} />
                      <span className={`${styles.portfolioBadge} ${styles.after}`}>AFTER</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.portfolioDots}>
            {Array.from({ length: totalPortfolioCards - portfolioVisibleCount + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`${styles.portfolioDot} ${portfolioIndex === idx ? styles.activeDot : ''}`}
                onClick={() => setPortfolioIndex(idx)}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>
        </div>
      </section>



      {/* 6. FAQ 섹션 */}
      <section className={styles.faq}>
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>FAQ</span>
            <h2 className={styles.sectionTitle}>자주 묻는 질문</h2>
            <p className={styles.sectionDesc}>고객님들이 상담 전 가장 궁금해하시는 정보를 투명하게 정리해 드립니다.</p>
          </div>
          <div className={styles.faqAccordion}>
            {(() => {
              const faqList = [
                {
                  q: '{region} {service} 상담 시 무엇을 먼저 알려드리면 되나요?',
                  a: '지역, 필요한 청소 종류, 대략적인 면적이나 현장 상태를 알려주시면 작업 가능 여부부터 안내합니다. 정확히 설명하지 않으셔도 상담 중 필요한 내용을 순서대로 확인합니다.'
                },
                {
                  q: '원하는 청소 작업이 가능한지 어떻게 확인하나요?',
                  a: '외벽, 유리창, 바닥, 준공, 후드, 특수청소 등 작업 종류와 현장 상태를 기준으로 가능 여부를 확인합니다. 필요한 경우 사진이나 현장 조건을 추가로 확인할 수 있습니다.'
                },
                {
                  q: '비용은 언제 안내받을 수 있나요?',
                  a: '현장 상태와 작업 범위를 확인한 뒤 전화 상담에서 예상 범위를 안내합니다. 무리하게 정해진 금액을 제시하기보다 필요한 범위를 먼저 확인합니다.'
                },
                {
                  q: '작업 전 준비해야 할 것이 있나요?',
                  a: '가능하다면 작업 위치, 면적, 오염 상태, 출입 가능 시간 정도를 알려주시면 상담이 빨라집니다. 현장 상황에 따라 따로 준비하실 사항이 없는 경우도 있습니다.'
                },
                {
                  q: '야간이나 주말 작업도 가능한가요?',
                  a: '작업 종류와 지역, 일정에 따라 야간·주말 작업 가능 여부를 확인합니다. 상담 시 희망 일정을 함께 알려주시면 조율 가능 여부를 안내합니다.'
                }
              ];

              return faqList.map((faq, idx) => {
                const formattedQ = replacePlaceholders(faq.q);
                const formattedA = replacePlaceholders(faq.a);
                return (
                  <div key={idx} className={`${styles.faqAccordionItem} ${openFaqIdx === idx ? styles.active : ''}`}>
                    <button onClick={() => toggleFaq(idx)} className={styles.faqQuestion}>
                      <span>Q. {formattedQ}</span>
                      <span className={styles.faqToggleIcon}>{openFaqIdx === idx ? '▲' : '▼'}</span>
                    </button>
                    <div className={styles.faqAnswerContainer}>
                      <p className={styles.faqAnswer}>A. {formattedA}</p>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </section>

      {/* 7. 하단 CTA 섹션 */}
      <section className={styles.bottomCta} role="img" aria-label="현대적이고 웅장한 빌딩 외관 배경 이미지">
        <div className={styles.bottomCtaOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.bottomCtaCard}>
            {isDynamic ? (
              <>
                <h2>
                  {region} {service},<br />
                  <span style={{ color: 'var(--accent)' }}>{hookingText}</span>
                </h2>
                <div className={styles.bottomCtaDesc}>
                  <p>사진을 보내주시면 작업 가능 여부를 안내합니다.</p>
                </div>
                <div className={styles.bottomCtaButtons}>
                  <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>{region} {service} 상담하기</a>
                </div>
              </>
            ) : (
              <>
                <h2>
                  청소가 필요한 공간,<br />
                  <span style={{ color: 'var(--accent)' }}>사진으로 먼저 확인하세요</span>
                </h2>
                <div className={styles.bottomCtaDesc}>
                  <p>위치와 사진을 보내주시면 작업 가능 여부를 안내합니다.</p>
                </div>
                <div className={styles.bottomCtaButtons}>
                  <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>사진 상담하기</a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <FloatingContact />
    </div>
  );
}
