"use client";

import { useState, useEffect } from 'react';
import { services } from '@/data/services';
import { BRAND_NAME, CONTACT_PHONE } from '@/lib/seo';
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
  const totalPortfolioCards = 6;

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

  const mainServicesList = [
    {
      id: 'outer-wall',
      name: '외벽청소',
      desc: '고층 빌딩 및 매장 외벽에 고착된 분진과 찌든 물때를 자재 맞춤 약품과 고압수로 완벽히 세정합니다.',
      tags: ['안전 로프 공법', '석재/패널 중화 반응', '고압 물세척'],
      image: '/images/services/outer-wall.jpg'
    },
    {
      id: 'window',
      name: '유리창 청소',
      desc: '쇼윈도와 고층 유리의 찌든 물때, 거미줄, 얼룩을 전문 스퀴지 공법으로 닦아내어 시야를 복원합니다.',
      tags: ['스퀴지 연마 세정', '내외부 양면 작업', '투명 시야 회복'],
      image: '/images/services/window.jpg'
    },
    {
      id: 'fire',
      name: '화재현장 청소',
      desc: '화재 흔적인 그을음, 유독성 타르 분진을 탈취 가스 시공 및 전용 약품으로 정리하여 복구 공사를 지원합니다.',
      tags: ['그을음 연화 세정', '오존 분자 탈취', '증빙용 서류 발급'],
      image: '/images/services/fire.jpg'
    },
    {
      id: 'floor-wax',
      name: '바닥청소 및 왁스코팅',
      desc: '디럭스타일과 아스타일 표면의 구형 코팅막을 기계로 완전히 박리한 후 최고급 보호제를 도포해 마모를 차단합니다.',
      tags: ['기계 연마 박리', '고강도 2회 코팅', '보행 타일 보호'],
      image: '/images/services/floor-wax.jpg'
    },
    {
      id: 'awning-sign',
      name: '어닝/간판청소',
      desc: '가게의 첫인상을 결정하는 천막 어닝의 곰팡이 오염과 아크릴 간판의 눈물 자국 얼룩을 깨끗하게 정리합니다.',
      tags: ['패브릭 이끼 살균', '고압 분사 세정', '시인성 즉시 개선'],
      image: '/images/services/awning-sign.jpg'
    },
    {
      id: 'interior-completion',
      name: '준공/인테리어 후 청소',
      desc: '공사 후 바닥에 남은 시멘트 자국, 비닐 보양막, 미세한 석고 가루를 구역별 전문 인력 배치를 통해 말끔히 치웁니다.',
      tags: ['보양 필름 박리', '시멘트 백화 제거', '대규모 인력 운영'],
      image: '/images/services/interior-completion.jpg'
    },
    {
      id: 'hood',
      name: '후드청소',
      desc: '음식점 주방 후드 내벽에 누적되어 흘러내리기 직전인 누런 유지분 기름때를 특수 고열 스팀과 약품으로 세정합니다.',
      tags: ['동식물 유지 제거', '배기팬 모터 세척', '화재 발화 예방'],
      image: '/images/services/hood.jpg'
    },
    {
      id: 'special',
      name: '쓰레기집/특수 청소',
      desc: '다량의 방치 쓰레기나 고독사 현장처럼 일반 청소로 해결 불가능한 공간을 정밀 약품 멸균 및 탈취 시공으로 복구합니다.',
      tags: ['비대면 보안 수거', '유품 멸균 정리', '고농도 산화 탈취'],
      image: '/images/services/special-cleaning.jpg'
    }
  ];

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
    if (keywordObj) {
      return `${keywordObj.regionName}에서 ${keywordObj.serviceName}이 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 오염 상태와 작업 범위에 맞춰 상담을 안내합니다.`;
    }
    if (regionObj || (region !== '서울·경기' && service !== '종합청소')) {
      return `${region}에서 ${service}이 필요한 상가, 빌딩, 매장, 사무실, 음식점, 준공 현장의 오염 상태와 작업 범위에 맞춰 상담을 안내합니다.`;
    }
    const customContent = serviceContents[service];
    if (customContent && service !== '종합청소') {
      return replacePlaceholders(customContent.intro);
    }
    return '상가, 매장, 빌딩, 사무실, 음식점, 준공 현장까지 오염 상태와 작업 조건에 맞춰 청소를 안내합니다.';
  };

  // H1 타이틀 설정
  const getHeroTitle = () => {
    if (keywordObj) {
      const serviceName = keywordObj.serviceName;
      const parts = keywordObj.h1.split(serviceName);
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}<span className={styles.highlight}>{serviceName}</span>{parts[1]}
          </>
        );
      }
      return keywordObj.h1;
    }
    if (region !== '서울·경기' && service !== '종합청소') {
      return (
        <>
          {region} <span className={styles.highlight}>{service}</span><br />
          공간 맞춤 정밀 클리닝
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



  return (
    <div className={styles.container}>
      {/* 1. Hero Section */}
      <section className={styles.hero} role="img" aria-label="깨끗하게 청소 및 정돈된 상업 공간 매장 배경 이미지">
        <div className={styles.heroOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className="animate-fade-up">
            <span className={styles.badge}>
              서울 주요 지역 종합청소 서비스
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
                  ? `${keywordObj.regionName} ${keywordObj.serviceName} 사진 상담하기` 
                  : (regionObj || region !== '서울·경기' || service !== '종합청소' ? `${region} ${service} 사진 상담하기` : '서울 종합청소 전화 상담')
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
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>SERVICES</span>
            <h2 className={styles.sectionTitle}>올케어 전문 청소 서비스</h2>
            <p className={styles.sectionDesc}>현장의 오염도와 난이도 조건에 맞춰 실무 방법으로 정밀하게 세정합니다.</p>
          </div>
          <div className={styles.serviceGrid}>
            {mainServicesList.map((item) => (
              <div key={item.id} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceTags}>
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.serviceTag}>#{tag}</span>
                    ))}
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <a href={`tel:${CONTACT_PHONE}`} className={styles.serviceCardCta}>📞 견적 및 예약 문의</a>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.servicesBottomCta}>
            <p className={styles.ctaTip}>💡 작업 공간의 주소와 필요한 작업을 말씀해 주시면 신속하게 안내해 드립니다.</p>
            <p className={styles.ctaNotice}>※ 현장 오염 상태에 따라 세부적인 작업 범위와 일정이 조율될 수 있습니다.</p>
            <div className={styles.ctaActions}>
              <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>📞 실시간 무료 전화 상담</a>
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

      {/* 4. 올케어 서비스의 진행 방식 */}
      <section className={styles.process} role="img" aria-label="유리창 및 실내 청소 작업 도구가 준비된 정돈된 매장 배경 이미지">
        <div className={styles.processOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.sectionHeader}>
            <span className={styles.subTitle}>WORK PROCESS</span>
            <h2 className={styles.sectionTitle}>올케어 서비스의 진행 방식</h2>
            <p className={styles.sectionDesc}>과도한 추가금 요구 없는 투명하고 체계적인 6단계 시공 공정입니다.</p>
          </div>
          <div className={styles.processSteps}>
            {[
              { step: '01', title: '현장 정보 확인', desc: '대표 번호 전화를 통해 문의하시는 공간 주소와 기본 요건 등 기본 정보를 신속하게 파악합니다.' },
              { step: '02', title: '오염 상태 확인', desc: '유선 상담이나 주소 조회를 통해 오염 종류, 작업 높이, 현장 면적 등 세부 상태를 파악합니다.' },
              { step: '03', title: '작업 범위 안내', desc: '작업이 필요한 부위와 제외할 부위를 고객님과 협의 후, 고정식 견적 금액을 제안합니다.' },
              { step: '04', title: '일정 조율', desc: '영업 시간이나 이사 계획에 맞춰 주간, 야간 심야, 주말 일정 중 최적의 일정을 결정합니다.' },
              { step: '05', title: '청소 진행', desc: '본사 소속 정규 직영 팀이 자재별 pH 세제와 기계 장비를 투입하여 꼼꼼히 청소를 실시합니다.' },
              { step: '06', title: '마감 확인', desc: '품질 관리자의 1차 검수 후, 고객님과 최종 대면 검수를 통해 미흡 부위를 즉시 재수정하고 마감합니다.' }
            ].map((item, idx) => (
              <div key={idx} className={styles.processStepCard}>
                <div className={styles.stepNum}>{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
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
            <h2 className={styles.sectionTitle}>{replacePlaceholders('{region} 실제 작업 현장')}</h2>
            <p className={styles.sectionDesc}>거짓 없는 작업 전후 사진으로 증명합니다.</p>
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
              {[
                {
                  title: '마루 왁스코팅',
                  before: '/images/portfolio/wax-before.jpg',
                  after: '/images/portfolio/wax-after.jpg'
                },
                {
                  title: '수영장청소',
                  before: '/images/portfolio/pool-before.jpg',
                  after: '/images/portfolio/pool-after.jpg'
                },
                {
                  title: '주방후드청소',
                  before: '/images/portfolio/hood-before.jpg',
                  after: '/images/portfolio/hood-after.jpg'
                },
                {
                  title: '주차장청소',
                  before: '/images/portfolio/parking-before.jpg',
                  after: '/images/portfolio/parking-after.jpg'
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
              ].map((item, idx) => (
                <div key={idx} className={styles.portfolioCard}>
                  <h3 className={styles.portfolioCardTitle}>
                    <span className={styles.portfolioCardBar}></span>
                    {item.title}
                  </h3>
                  <div className={styles.portfolioImages}>
                    <div className={styles.portfolioImgWrapper}>
                      <img src={item.before} alt={`${item.title} 작업 전`} />
                      <span className={`${styles.portfolioBadge} ${styles.before}`}>BEFORE</span>
                    </div>
                    <div className={styles.portfolioImgWrapper}>
                      <img src={item.after} alt={`${item.title} 작업 후`} />
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
              const customContent = serviceContents[service];
              const faqList = (customContent && service !== '종합청소') 
                ? customContent.faq 
                : [
                    {
                      q: '{region} {service} 견적은 어떻게 확인하나요?',
                      a: '작업 지역, 건물 유형, 필요한 청소 종류, 현장 사진을 보내주시면 오염 상태와 작업 범위를 확인해 상담을 안내합니다.'
                    },
                    {
                      q: '사진만으로도 가격 확인이 가능한가요?',
                      a: '간단한 현장은 사진 상담으로 범위를 확인할 수 있습니다. 다만 면적, 오염도, 장비 사용 여부에 따라 현장 확인이 필요할 수 있습니다.'
                    },
                    {
                      q: '영업 중인 매장도 작업할 수 있나요?',
                      a: '가능합니다. 영업 시간, 고객 동선, 소음 여부를 고려해 야간이나 휴무일 작업으로 조율할 수 있습니다.'
                    },
                    {
                      q: '작업 일정은 어떻게 조율하나요?',
                      a: '지역, 작업 범위, 현장 상황을 확인한 뒤 가능한 일정과 작업 시간을 안내합니다.'
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
          <div className={styles.faqBottomNotice}>
            <p>💡 현장 오염도와 내장재 구성에 따라 작업 방법, 소요 일정 및 최종 견적이 다르게 책정될 수 있습니다.</p>
            <p>📞 전화 상담 시 현장 상황을 알려주시면 보다 정밀한 사전 상담이 가능합니다.</p>
            <div className={styles.faqBottomButtons}>
              <a href={`tel:${CONTACT_PHONE}`} className={styles.faqPhoneLink}>📞 실시간 무료 전화 상담</a>
            </div>
          </div>

          {/* 키워드 안내 페이지 링크 안내 박스 */}
          <div className={styles.sitemapLinkBox}>
            <p className={styles.sitemapLinkText}>
              서울 지역별 청소 작업 안내는 키워드 안내 페이지에서 확인할 수 있습니다.
            </p>
            <Link href="/sitemap-seoul" className={styles.sitemapLinkBtn}>
              서울 지역별 작업 안내 보기 ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 하단 CTA 섹션 */}
      <section className={styles.bottomCta} role="img" aria-label="현대적이고 웅장한 빌딩 외관 배경 이미지">
        <div className={styles.bottomCtaOverlay}></div>
        <div className={styles.inner} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.bottomCtaCard}>
            {region !== '서울·경기' && service !== '종합청소' ? (
              <h2>
                {region} {service} 전문 올케어 서비스<br />
                <span style={{ color: 'var(--accent)' }}>전화 한 통으로 쉽고 간편하게</span> 견적을 확인해 보세요.
              </h2>
            ) : (
              <h2>
                청소가 필요한 공간의 조건과 위치를 말씀해 주시면<br />
                <span style={{ color: 'var(--accent)' }}>신속하고 투명하게</span> 안내해 드리겠습니다.
              </h2>
            )}
            <div className={styles.bottomCtaDesc}>
              <p>💡 지역과 작업명을 말씀해 주시면 작업 가능 여부를 신속하게 안내해 드립니다.</p>
              <p>📞 대표번호 전화 상담을 통해 무료 견적 상담을 바로 받아보실 수 있습니다.</p>
              <p>※ 현장 오염도와 면적에 따라 시공 일정 및 상세 견적이 조율될 수 있습니다.</p>
            </div>
            <div className={styles.bottomCtaButtons}>
              <a href={`tel:${CONTACT_PHONE}`} className={`${styles.ctaBtn} ${styles.primary}`}>📞 실시간 무료 전화 상담</a>
            </div>
          </div>
        </div>
      </section>

      <FloatingContact />
    </div>
  );
}
