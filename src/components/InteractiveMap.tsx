'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './InteractiveMap.module.css';
import { CONTACT_PHONE } from '@/lib/seo';

const GYEONGGI_CITIES = [
  { name: '고양/일산', href: '/' },
  { name: '성남/판교', href: '/' },
  { name: '용인/수지', href: '/' },
  { name: '부천/인천', href: '/' },
  { name: '안산/시흥', href: '/' },
  { name: '화성/동탄', href: '/' },
  { name: '남양주/구리', href: '/' },
  { name: '하남/미사', href: '/' },
  { name: '안양/과천', href: '/' },
  { name: '평택/오산', href: '/' },
  { name: '파주/김포', href: '/' },
  { name: '광주/이천', href: '/' },
];

export default function InteractiveMap() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>지역별 서비스 거점</h2>
        <p className={styles.subtitle}>지역별 작업 가능 여부는 상담 시 확인해 드립니다.</p>

        <div className={styles.mainContent}>
          {/* Map Image Section */}
          <div className={styles.mapFrame}>
            <Image 
              src="/images/map-seoul-gyeonggi.png" 
              alt="서울 경기 서비스 거점 지도" 
              width={800} 
              height={800} 
              className={styles.mapImage}
            />
          </div>

          {/* Interaction Section */}
          <div className={styles.infoSection}>
            <div className={styles.category}>
              <h3>서울특별시</h3>
              <p>서울 주요 지역 서비스 제공</p>
              <div className={styles.seoulBox}>
                <Link href="/area/seoul/mapo" className={styles.seoulBtn}>
                  서울 주요 지역 서비스 거점 확인하기 →
                </Link>
              </div>
            </div>

            <div className={styles.category}>
              <h3>경기도 및 수도권</h3>
              <p>주요 도시별 전담팀 배치</p>
              <div className={styles.cityGrid}>
                {GYEONGGI_CITIES.map((city) => (
                  <Link key={city.name} href={city.href} className={styles.cityLink}>
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomCta}>
          <p>찾으시는 지역이 없으신가요? <strong>서울·경기 상담 가능 여부를 안내해 드립니다.</strong></p>
          <a href={`tel:${CONTACT_PHONE}`} className={styles.callBtn}>실시간 견적 문의하기</a>
        </div>
      </div>
    </section>
  );
}
