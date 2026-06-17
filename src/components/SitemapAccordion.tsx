"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/sitemap-seoul/page.module.css';

// 각 구/시 단위별 실무 안내 카피 사전 (스팸 페이지 오인 방지 및 문맥 콘텐츠 강화)
const DISTRICT_GUIDE_MAP: { [key: string]: string } = {
  'seocho': '서초동 법조단지 대형 빌딩의 바닥 박리 왁싱과 반포/잠원 주거 배후 상권의 학원가, 병원 위생 정밀 살균 소독을 안전 가이드라인에 맞춰 제공합니다.',
  'gangnam': '테헤란로 금융 비즈니스 빌딩 대형 오피스 왁스코팅 및 압구정/청담동의 명품 팝업스토어, 매장 쇼윈도 유리창 정밀 세척 솔루션을 투명하게 진행합니다.',
  'songpa': '문정 법조타운 지식산업센터 준공 청소, 잠실/석촌호수 주변의 음식점 주방 후드 기름때 제거 및 어닝 곰팡이 고압 세척을 신속히 지원합니다.',
  'gangdong': '고덕비즈밸리 신축 지식산업센터 입주/준공 청소와 천호동/성내동 상업 구역의 노화된 매장 간판 및 유리창 물때 클리닝을 맞춤 시공합니다.',
  'gwangjin': '동서울터미널 현대화 지구 배후 빌딩과 건대입구/화양동 대학가 먹자골목 식당 주방의 기름때 후드 세정 및 어닝 먼지 케어를 영업시간 조율 하에 완료합니다.',
  'seongdong': '성수동의 트렌디한 브랜드 팝업스토어 오픈 대비 준공 분진 청소, 왕십리 역세권 빌딩 외벽 로프 세척 및 마장동 상가의 특수 소독을 직영팀이 책임집니다.',
  'dongdaemun': '청량리역 복합 고층 주상복합 공사 분진 제거와 장안동 자동차 전시장/사무실 바닥 왁싱, 제기동 전통 한방 상가의 어닝 찌든 오염을 정돈합니다.',
  'jungnang': '상봉역 주변 대형 할인점/쇼핑몰 시설의 정기 관리 및 신내동 지식산업센터 리모델링 인테리어 후 톱밥 가루 제거와 외벽 물세척을 진행합니다.',
  'seongbuk': '안암동/성북동 대학 배후 시설의 연구소 위생 케어, 돈암동 상권 로드샵의 쇼윈도 유리창 및 간판 먼지 세척을 pH 전용 세제로 안전하게 해결합니다.',
  'gangbuk': '미아사거리 백화점 매장 청소, 수유역 유흥 및 요식업가 먹자상권의 야간 심야 주방 후드 필터 기름때 연화 세정 및 모텔 특수 소독을 조율합니다.',
  'dobong': '창동 역세권 신축 프라자 상가 준공 검사 대비 청소와 쌍문동 저층 빌라 상가 및 학원 시설의 바닥 타일 찌든 오염 기계 폴리싱 머신 세척을 제공합니다.',
  'nowon': '은행사거리 대형 학원가 건물의 방학 대비 실내 미세분진 포집 청소 및 상계동 아파트 상가, 공릉동 경춘선 숲길 카페의 간판/어닝 고압수 정리를 실시합니다.',
  'guri': '구리 돌다리 상권 음식점 주방 유화 세정과 갈매 신도시 지식산업센터 신규 입주 사무실의 바닥 코팅을 지원합니다.',
  'hanam': '미사역 역세권 메디컬 빌딩 청소와 하남 스타필드 주변 대형 매장 쇼윈도 및 공사 후 리모델링 준공 청소를 전담합니다.',
  'namyangju': '다산/별내 신도시 신축 근린 빌딩 상가 준공 검사 가이드 대응과 카페거리 테라스 어닝 이끼 곰팡이 제거를 고압 헹굼 공정으로 완수합니다.'
};

interface SourceRegion {
  name: string;
  fullName: string;
  slug: string;
  city: string;
  citySlug: string;
  dongs: string[];
  localDescription?: string;
  buildingCharacteristics?: string;
}

interface TargetService {
  id: string;
  name: string;
  slug: string;
}

interface SitemapAccordionProps {
  sourceRegions: SourceRegion[];
  targetServices: TargetService[];
}

export default function SitemapAccordion({ sourceRegions, targetServices }: SitemapAccordionProps) {
  const [openDistrict, setOpenDistrict] = useState<string | null>(null);

  const toggleDistrict = (slug: string) => {
    setOpenDistrict(openDistrict === slug ? null : slug);
  };

  return (
    <div className={styles.accordionList}>
      {sourceRegions.map(reg => {
        const isOpen = openDistrict === reg.slug;
        const guideText = DISTRICT_GUIDE_MAP[reg.slug] || `${reg.fullName} 내 입지한 오피스, 매장, 식당 등 상업시설의 오염도 조건에 맞는 청소를 책임집니다.`;
        const shortDistrict = reg.fullName.replace(/(구|시)$/, '');

        return (
          <div 
            key={reg.slug} 
            className={`${styles.districtCard} ${isOpen ? styles.cardOpen : ''}`}
          >
            {/* 카드 헤더 (클릭 시 아코디언 열림/닫힘) */}
            <button 
              onClick={() => toggleDistrict(reg.slug)}
              className={styles.cardHeader}
              aria-expanded={isOpen}
            >
              <div className={styles.cardHeaderInfo}>
                <h2 className={styles.districtTitle}>
                  {reg.fullName} <span>{reg.dongs.length}개 동네 관리 중</span>
                </h2>
                <p className={styles.cardHeaderDesc}>{reg.localDescription}</p>
              </div>
              <span className={styles.toggleArrow}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* 카드 본문 (아코디언 패널 - max-height 기반 부드러운 개폐) */}
            <div className={`${styles.accordionPanel} ${isOpen ? styles.panelOpen : styles.panelClosed}`}>
              <div className={styles.panelContent}>
                {/* 1. 지역 맞춤 실무 카피 수록 (SEO 최적화) */}
                <div className={styles.guideBox}>
                  <strong>💡 {reg.fullName} 청소 실무 가이드</strong>
                  <p>{guideText}</p>
                </div>

                {/* 2. 구/시 단위 통합 키워드 섹션 (구 포함 / 구 제외 버전 모두 생성) */}
                <div className={styles.sectionBlock}>
                  <h3 className={styles.blockTitle}>🏢 {reg.fullName} 광역 키워드 링크</h3>
                  <div className={styles.keywordGrid}>
                    {targetServices.map(serv => {
                      const fullKw = `${reg.fullName}-${serv.name}`;
                      const shortKw = `${shortDistrict}-${serv.name}`;

                      return (
                        <React.Fragment key={serv.id}>
                          <Link 
                            href={`/?k=${encodeURIComponent(fullKw)}`}
                            className={styles.keywordLink}
                          >
                            🔗 {reg.fullName} {serv.name}
                          </Link>
                          <Link 
                            href={`/?k=${encodeURIComponent(shortKw)}`}
                            className={styles.keywordLink}
                          >
                            🔗 {shortDistrict} {serv.name}
                          </Link>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* 3. 각 행정동 단위별 세부 키워드 섹션 */}
                <div className={styles.sectionBlock}>
                  <h3 className={styles.blockTitle}>📍 {reg.fullName} 동별 세부 키워드 링크</h3>
                  <div className={styles.dongList}>
                    {reg.dongs.map(dong => (
                      <div key={dong} className={styles.dongBox}>
                        <span className={styles.dongLabel}>{dong}</span>
                        <div className={styles.dongKeywordGrid}>
                          {targetServices.map(serv => {
                            const dongKw = `${dong}-${serv.name}`;
                            return (
                              <Link 
                                key={serv.id}
                                href={`/?k=${encodeURIComponent(dongKw)}`}
                                className={styles.dongKeywordLink}
                              >
                                {dong} {serv.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
