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
          <span className={styles.badge}>올케어 서비스 행정구역별 청소 안내</span>
          <h1 className={styles.title}>서울 및 경기 일부 지역 청소 서비스 구역별 안내 지도</h1>
          <p className={styles.subtitle}>
            올케어 서비스는 서울 주요 지역과 경기 일부 지역 빌딩, 매장, 사무실, 공사 현장에 전문 장비와 직영 시공 팀을 신속히 파견합니다.<br />
            아래의 해당 지역과 필요한 작업을 선택하시면, 맞춤식 청소 가이드라인과 상세 견적 상담으로 안내해 드립니다.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>
          {/* 클라이언트 컴포넌트에 서버 측 데이터를 전달하여 하이브리드 구성 */}
          <SitemapAccordion 
            sourceRegions={sourceRegions} 
            targetServices={targetServices} 
          />
        </div>
      </section>
    </div>
  );
}
