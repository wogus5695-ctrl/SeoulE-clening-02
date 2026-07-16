"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { GyeonggiRegion } from '@/data/gyeonggi-regions';
import { targetServices } from '@/data/keywords';
import { keywords } from '@/data/keywords';
import { regions, resolveRegion } from '@/data/regions';
import styles from '@/app/sitemap-seoul/page.module.css';

function getActiveKeyword(district: string, subDistrict: string, serviceName: string) {
  return keywords.find(kw => {
    if (kw.serviceName !== serviceName) return false;
    if (kw.indexStatus !== 'index' || kw.canonicalTarget) return false;
    
    const r = resolveRegion(kw.regionName);
    if (!r) return false;
    
    return r.district === district && r.subDistrict === subDistrict;
  });
}

interface GyeonggiSitemapAccordionProps {
  regions: GyeonggiRegion[];
}

const CITY_ORDER = [
  { key: 'gimpo', name: '김포', fullName: '김포시', hasGus: false, desc: '한강신도시 개발과 함께 고밀도 주거 상권이 조성된 김포 권역입니다.' },
  { key: 'goyang', name: '고양', fullName: '고양시', hasGus: true, desc: '킨텍스 전시관 및 대규모 배후 신도시를 보유한 고양 권역입니다.' },
  { key: 'bucheon', name: '부천', fullName: '부천시', hasGus: true, desc: '서울 및 인천과 인접하여 유동인구가 집중된 고밀도 복합 상업 도시입니다.' },
  { key: 'gwangmyeong', name: '광명', fullName: '광명시', hasGus: false, desc: 'KTX 광명역 대형 유통 상권과 철산역 역세권 상업지구가 융합된 핵심지입니다.' },
  { key: 'siheung', name: '시흥', fullName: '시흥시', hasGus: false, desc: '시화 MTV 개발 및 배곧신도시 대학가 상권이 공존하는 서해안 벨트 중심 도시입니다.' },
  { key: 'anyang', name: '안양', fullName: '안양시', hasGus: true, desc: '안양역 일 번가 전통 상권과 평촌 신도시 핵심 행정타운이 결합된 중추 도시입니다.' },
  { key: 'gwacheon', name: '과천', fullName: '과천시', hasGus: false, desc: '정부과천청사 및 지식정보타운 신규 첨단 비즈니스 지구가 구축된 명품 배후 도시입니다.' },
  { key: 'gunpo', name: '군포', fullName: '군포시', hasGus: false, desc: '산본신도시 중심 상업용 로데오 거리와 금정역 역세권 환승 허브가 연계된 중심지입니다.' },
  { key: 'ansan', name: '안산', fullName: '안산시', hasGus: true, desc: '반월국가산업단지의 제조/IT 기반 배후 상업 및 행정 중심 도시입니다.' },
  { key: 'uiwang', name: '의왕', fullName: '의왕시', hasGus: false, desc: '의왕 테크노파크 개발 및 철도 물류 연구 거점 배후 상권이 연계된 쾌적한 도시입니다.' },
  { key: 'seongnam', name: '성남', fullName: '성남시', hasGus: true, desc: '서울 강남권과 최인접한 명실상부한 IT 비즈니스 및 고밀도 주거 중심 요충지입니다.' },
  { key: 'hanam', name: '하남', fullName: '하남시', hasGus: false, desc: '미사강변도시 역세권 상권과 스타필드 쇼핑몰이 집중된 트렌디 주거 상업 신도시입니다.' },
  { key: 'guri', name: '구리', fullName: '구리시', hasGus: false, desc: '서울 광진/중랑구와 직통 연결된 생활 밀접형 상권과 구리 전통시장 중심 도시입니다.' },
  { key: 'yangju', name: '양주', fullName: '양주시', hasGus: false, desc: '옥정신도시 및 회천신도시 중심의 대규모 신규 상권이 정착되고 있는 북부 핵심 거점 도시입니다.' },
  { key: 'namyangju', name: '남양주', fullName: '남양주시', hasGus: false, desc: '다산신도시, 별내신도시 및 별내 카페거리 등 위생 관리가 요구되는 신도시 밀집 도시입니다.' }
];

export default function GyeonggiSitemapAccordion({ regions }: GyeonggiSitemapAccordionProps) {
  const [openCity, setOpenCity] = useState<string | null>(null);

  const toggleCity = (key: string) => {
    setOpenCity(openCity === key ? null : key);
  };

  return (
    <div className={styles.accordionList}>
      {CITY_ORDER.map(city => {
        const isOpen = openCity === city.key;

        // 1. 해당 도시에 속하는 모든 레코드 필터링 (시 단위 및 일반구 단위)
        const cityRecord = regions.find(r => r.id === `gyeonggi-${city.key}`);
        const guRecords = regions.filter(r => r.id.startsWith(`gyeonggi-${city.key}-`));

        // 총 동 개수 구하기
        let totalDongsCount = 0;
        if (cityRecord && cityRecord.dongs) {
          totalDongsCount += cityRecord.dongs.length;
        }
        guRecords.forEach(gu => {
          if (gu.dongs) {
            totalDongsCount += gu.dongs.length;
          }
        });

        return (
          <div 
            key={city.key} 
            className={`${styles.districtCard} ${isOpen ? styles.cardOpen : ''}`}
          >
            {/* 카드 헤더 */}
            <button 
              onClick={() => toggleCity(city.key)}
              className={styles.cardHeader}
              aria-expanded={isOpen}
              aria-controls={`panel-${city.key}`}
            >
              <div className={styles.cardHeaderInfo}>
                <h2 className={styles.districtTitle}>
                  {city.fullName} {totalDongsCount > 0 && <span>{totalDongsCount}개 동네 관리 중</span>}
                </h2>
                <p className={styles.cardHeaderDesc}>{cityRecord?.localDescription || city.desc}</p>
              </div>
              <span className={styles.toggleArrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* 카드 본문 (아코디언 패널 - max-height 기반 부드러운 개폐로 검색엔진 수집 보장) */}
            <div 
              id={`panel-${city.key}`}
              className={`${styles.accordionPanel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}
            >
              <div className={styles.panelContent}>
                
                {/* 1. 시 단위 키워드 섹션 */}
                <div className={styles.sectionBlock}>
                  <h3 className={styles.blockTitle}>🏢 {city.name} 시 단위 키워드</h3>
                  <div className={styles.keywordGrid}>
                    {targetServices.map(serv => {
                      const activeKw = getActiveKeyword(cityRecord?.fullName || city.fullName, '전지역', serv.name);
                      if (!activeKw) return null;

                      return (
                        <Link 
                          key={serv.id}
                          href={`/?k=${encodeURIComponent(activeKw.urlKeyword)}`}
                          className={styles.keywordLink}
                        >
                          🔗 {activeKw.keyword}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 일반구 단위 키워드 섹션 */}
                {city.hasGus && guRecords.length > 0 && (
                  <div className={styles.sectionBlock}>
                    <h3 className={styles.blockTitle}>🔎 {city.name} 구 단위 키워드</h3>
                    <div className={styles.keywordGrid}>
                      {guRecords.map(gu => {
                        return targetServices.map(serv => {
                          const activeKw = getActiveKeyword(gu.fullName, '전지역', serv.name);
                          if (!activeKw) return null;

                          return (
                            <Link 
                              key={`${gu.id}-${serv.id}`}
                              href={`/?k=${encodeURIComponent(activeKw.urlKeyword)}`}
                              className={styles.keywordLink}
                            >
                              🔗 {activeKw.keyword}
                            </Link>
                          );
                        });
                      })}
                    </div>
                  </div>
                )}

                {/* 3. 동·읍·면 단위 키워드 섹션 */}
                {totalDongsCount > 0 && (
                  <div className={styles.sectionBlock}>
                    <h3 className={styles.blockTitle}>📍 {city.name} 동·읍·면 단위 키워드</h3>
                    <div className={styles.dongList}>
                      {/* 시 단위 다이렉트 동 단위들 (구 없는 도시) */}
                      {cityRecord && cityRecord.dongs && cityRecord.dongs.length > 0 && (
                        <div className={styles.dongBox}>
                          <div className={styles.dongKeywordGrid}>
                            {cityRecord.dongs.map(dong => {
                              return targetServices.map(serv => {
                                const activeKw = getActiveKeyword(city.fullName, dong, serv.name);
                                if (!activeKw) return null;
                                return (
                                  <Link 
                                    key={`${dong}-${serv.id}`}
                                    href={`/?k=${encodeURIComponent(activeKw.urlKeyword)}`}
                                    className={styles.dongKeywordLink}
                                  >
                                    {activeKw.keyword}
                                  </Link>
                                );
                              });
                            })}
                          </div>
                        </div>
                      )}

                      {/* 구 단위별 동 단위들 */}
                      {guRecords.map(gu => {
                        if (!gu.dongs || gu.dongs.length === 0) return null;
                        return (
                          <div key={gu.id} className={styles.dongBox}>
                            <span className={styles.dongLabel}>{gu.fullName} 소속</span>
                            <div className={styles.dongKeywordGrid}>
                              {gu.dongs.map(dong => {
                                return targetServices.map(serv => {
                                  const activeKw = getActiveKeyword(gu.fullName, dong, serv.name);
                                  if (!activeKw) return null;
                                  return (
                                    <Link 
                                      key={`${dong}-${serv.id}`}
                                      href={`/?k=${encodeURIComponent(activeKw.urlKeyword)}`}
                                      className={styles.dongKeywordLink}
                                    >
                                      {activeKw.keyword}
                                    </Link>
                                  );
                                });
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
