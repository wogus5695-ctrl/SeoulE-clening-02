import React from 'react';
import { Metadata } from 'next';
import { sourceRegions } from '@/data/regions-source';
import { gyeonggiRegions } from '@/data/gyeonggi-regions';
import { targetServices } from '@/data/keywords';
import { getSitemapMetadata } from '@/lib/seo';
import SitemapAccordion from '@/components/SitemapAccordion';
import GyeonggiSitemapAccordion from '@/components/GyeonggiSitemapAccordion';
import styles from './page.module.css';

export const metadata: Metadata = getSitemapMetadata();

export default function SitemapSeoulPage() {
  const seoulRegions = sourceRegions.filter(r => r.city === '서울');
  const incheonRegions = sourceRegions.filter(r => r.city === '인천');

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.badge}>올케어서비스 행정구역별 청소 안내</span>
          <h1 className={styles.title}>서울·경기·인천 지역별 청소 서비스 안내</h1>
          <div className={styles.subtitle} style={{ textAlign: 'left', marginTop: '20px', color: 'var(--gray-600, #475569)', fontSize: '15px', lineHeight: '1.7' }}>
            <p style={{ marginBottom: '15px' }}>
              올케어서비스는 서울, 경기, 인천 전 지역을 대상으로 현장의 자재 특성과 오염 상태에 알맞은 맞춤식 위생 클리닝 서비스를 진행하고 있습니다. 신뢰할 수 있는 실무 절차와 투명한 견적 요소를 바탕으로 아래 범주별 청소 서비스를 제공합니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--primary, #1b4d3e)', marginBottom: '8px' }}>🏢 사업장 청소</strong>
                <span style={{ fontSize: '13.5px' }}>사무실청소, 상가청소, 공장청소, 창고청소, 병원청소, 건물청소</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--primary, #1b4d3e)', marginBottom: '8px' }}>🧗 외부 관리</strong>
                <span style={{ fontSize: '13.5px' }}>외벽청소, 유리창청소, 어닝청소, 간판청소</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--primary, #1b4d3e)', marginBottom: '8px' }}>🔥 공사 및 특수 오염</strong>
                <span style={{ fontSize: '13.5px' }}>준공청소, 인테리어 후 청소, 화재청소, 침수청소, 특수청소</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--primary, #1b4d3e)', marginBottom: '8px' }}>🧹 바닥 및 주방</strong>
                <span style={{ fontSize: '13.5px' }}>바닥청소, 바닥왁스코팅, 후드청소</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>
          
          {/* 상단 지역 바로가기 (정적 HTML 앵커 링크) */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '40px',
            padding: '15px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '50px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--gray-200, #e2e8f0)'
          }}>
            <a 
              href="#seoul-region" 
              style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--primary, #1b4d3e)',
                textDecoration: 'none',
                padding: '6px 20px',
                borderRadius: '30px',
                transition: 'all 0.2s ease',
                backgroundColor: '#f1f5f9'
              }}
            >
              서울 지역 바로가기
            </a>
            <a 
              href="#gyeonggi-region" 
              style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--primary, #1b4d3e)',
                textDecoration: 'none',
                padding: '6px 20px',
                borderRadius: '30px',
                transition: 'all 0.2s ease',
                backgroundColor: '#f1f5f9'
              }}
            >
              경기 지역 바로가기
            </a>
            <a 
              href="#incheon-region" 
              style={{
                fontSize: '15px',
                fontWeight: '800',
                color: 'var(--primary, #1b4d3e)',
                textDecoration: 'none',
                padding: '6px 20px',
                borderRadius: '30px',
                transition: 'all 0.2s ease',
                backgroundColor: '#f1f5f9'
              }}
            >
              인천 지역 바로가기
            </a>
          </div>

          {/* 서울 지역 섹션 */}
          <div id="seoul-region" className={styles.sectionHeader} style={{ marginBottom: '24px', scrollMarginTop: '80px' }}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary, #1b4d3e)', borderBottom: '2px solid var(--gray-200, #e2e8f0)', paddingBottom: '12px', margin: '0 0 10px' }}>
              서울 지역 청소 키워드
            </h2>
            <p className={styles.sectionDesc} style={{ fontSize: '15px', color: 'var(--gray-600, #475569)', margin: '0', lineHeight: '1.6' }}>
              서울 주요 25개 자치구 권역의 종합청소 키워드를 지역별로 분류하여 신속하게 매칭 및 확인하실 수 있습니다.
            </p>
          </div>
          <SitemapAccordion 
            sourceRegions={seoulRegions} 
            targetServices={targetServices} 
          />

          {/* 경기 지역 섹션 */}
          <div id="gyeonggi-region" className={styles.sectionHeader} style={{ marginTop: '60px', marginBottom: '24px', scrollMarginTop: '80px' }}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary, #1b4d3e)', borderBottom: '2px solid var(--gray-200, #e2e8f0)', paddingBottom: '12px', margin: '0 0 10px' }}>
              경기 지역 청소 키워드
            </h2>
            <p className={styles.sectionDesc} style={{ fontSize: '15px', color: 'var(--gray-600, #475569)', margin: '0', lineHeight: '1.6' }}>
              김포·고양·부천·광명·시흥·안양·과천·군포·안산·의왕·성남·하남·구리·양주·남양주 및 기존 경기 지역의 종합청소 키워드를 지역별로 안내합니다.
            </p>
          </div>
          <GyeonggiSitemapAccordion 
            regions={gyeonggiRegions} 
          />

          {/* 인천 지역 섹션 */}
          <div id="incheon-region" className={styles.sectionHeader} style={{ marginTop: '60px', marginBottom: '24px', scrollMarginTop: '80px' }}>
            <h2 className={styles.sectionTitle} style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary, #1b4d3e)', borderBottom: '2px solid var(--gray-200, #e2e8f0)', paddingBottom: '12px', margin: '0 0 10px' }}>
              인천 지역 청소 키워드
            </h2>
            <p className={styles.sectionDesc} style={{ fontSize: '15px', color: 'var(--gray-600, #475569)', margin: '0', lineHeight: '1.6' }}>
              인천 부평구, 남동구, 계양구, 미추홀구, 연수구, 기존 서구 권역(현 서해구·검단구 일대)까지 주요 종합청소 키워드를 지역별로 확인할 수 있습니다. (인천 서구, 서해구, 검단구 권역 청소 상담 가능)
            </p>
          </div>
          <SitemapAccordion 
            sourceRegions={incheonRegions} 
            targetServices={targetServices} 
          />
        </div>
      </section>
    </div>
  );
}
