import React from 'react';
import { Metadata } from 'next';
import { sourceRegions } from '@/data/regions-source';
import { targetServices } from '@/data/keywords';
import { getSitemapMetadata, BRAND_NAME } from '@/lib/seo';
import SitemapAccordion from '@/components/SitemapAccordion';
import styles from './page.module.css';

export const metadata: Metadata = getSitemapMetadata();

export default function SitemapSeoulPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.badge}>올케어서비스 행정구역별 청소 안내</span>
          <h1 className={styles.title}>서울 지역별 청소 키워드 안내</h1>
          <p className={styles.subtitle} style={{ marginBottom: '14px' }}>
            올케어서비스의 서울 지역별 청소 작업 페이지를 정리한 안내 페이지입니다. 지역명과 작업명을 선택하면 해당 청소 상담 페이지로 이동할 수 있습니다.
          </p>
          <p className={styles.subtitle} style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            외벽청소, 유리창청소, 화재청소, 바닥왁스코팅, 어닝청소, 간판청소, 준공청소, 인테리어 후 청소, 후드청소, 특수청소 등 주요 작업을 지역별로 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>
          {/* 클라이언트 컴포넌트에 서버 측 데이터를 전달하여 하이브리드 구성 */}
          <SitemapAccordion 
            sourceRegions={sourceRegions.filter(r => r.city === '서울')} 
            targetServices={targetServices} 
          />
        </div>
      </section>
    </div>
  );
}
