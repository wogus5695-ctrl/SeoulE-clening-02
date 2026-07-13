import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { sourceRegions } from '@/data/regions-source';
import { targetServices } from '@/data/keywords';
import { getSitemapMetadata, BRAND_NAME } from '@/lib/seo';
import SitemapAccordion from '@/components/SitemapAccordion';
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
          <h1 className={styles.title}>서울·인천 지역별 청소 키워드 안내</h1>
          <p className={styles.subtitle}>
            서울 및 인천 주요 지역의 외벽청소, 유리창청소, 화재청소, 바닥왁스코팅, 어닝청소, 간판청소, 준공청소, 후드청소 등 주요 종합청소 서비스를 지역별로 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>
          <div style={{ marginBottom: '30px', textAlign: 'right' }}>
            <Link 
              href="/sitemap-gyeonggi" 
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px', 
                fontWeight: '700', 
                color: 'var(--primary, #1b4d3e)', 
                textDecoration: 'none',
                padding: '10px 20px',
                border: '2px solid var(--primary, #1b4d3e)',
                borderRadius: '30px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
            >
              경기 지역 종합청소 키워드 보기 ➔
            </Link>
          </div>

          {/* 서울 지역 섹션 */}
          <div className={styles.sectionHeader} style={{ marginBottom: '24px' }}>
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

          {/* 인천 지역 섹션 */}
          <div className={styles.sectionHeader} style={{ marginTop: '60px', marginBottom: '24px' }}>
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
