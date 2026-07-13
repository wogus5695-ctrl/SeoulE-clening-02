import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { gyeonggiRegions } from '@/data/gyeonggi-regions';
import { getGyeonggiSitemapMetadata } from '@/lib/seo';
import GyeonggiSitemapAccordion from '@/components/GyeonggiSitemapAccordion';
import styles from '@/app/sitemap-seoul/page.module.css';

export const metadata: Metadata = getGyeonggiSitemapMetadata();

export default function SitemapGyeonggiPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.badge}>올케어서비스 행정구역별 청소 안내</span>
          <h1 className={styles.title}>경기 지역별 종합청소 키워드 안내</h1>
          <p className={styles.subtitle}>
            김포·고양·부천·광명·시흥·안양·과천·군포·안산·의왕·성남·하남·구리·양주·남양주 지역의 종합청소 서비스 키워드를 확인할 수 있습니다.
          </p>
        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>
          <div style={{ marginBottom: '30px', textAlign: 'right' }}>
            <Link 
              href="/sitemap-seoul" 
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
              서울·인천 지역 종합청소 키워드 보기 ➔
            </Link>
          </div>

          <GyeonggiSitemapAccordion 
            regions={gyeonggiRegions} 
          />
        </div>
      </section>
    </div>
  );
}
