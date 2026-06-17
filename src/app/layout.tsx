import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import FooterDescription from "@/components/FooterDescription";
import { Suspense } from "react";
import Link from 'next/link';
import { getMainMetadata, getJsonLd, BRAND_NAME, BUSINESS_NAME, CONTACT_PHONE, NAVER_VERIFICATION, GOOGLE_VERIFICATION } from "@/lib/seo";

const scDream = localFont({
  src: [
    { path: "../../public/fonts/SCDream3.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/SCDream4.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/SCDream5.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/SCDream6.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/SCDream8.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-sc-dream",
});

export const metadata: Metadata = getMainMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd();

  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content={NAVER_VERIFICATION} />
        <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={scDream.className}>
        <Header />
        <main>{children}</main>
        
        <footer style={{ padding: '80px 0 100px', backgroundColor: 'var(--gray-50)', color: 'var(--primary)', borderTop: '1px solid var(--gray-200)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--accent-dark)' }}>{BRAND_NAME}</h3>
                <Suspense fallback={
                  <p style={{ lineHeight: '1.6', fontSize: '14px', color: 'var(--gray-600)' }}>
                    외벽, 유리창, 준공, 화재 복구 등<br />
                    현장 맞춤형 종합청소 솔루션을 제공합니다.<br />
                    지역별 작업 가능 여부는 상담 시 확인해 드립니다.
                  </p>
                }>
                  <FooterDescription />
                </Suspense>
              </div>
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '15px' }}>상담 안내</h4>
                <p style={{ fontSize: '15px', fontWeight: '800', marginBottom: '5px' }}>대표번호: {CONTACT_PHONE}</p>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)' }}>연중무휴 24시간 상담 가능</p>

              </div>
              <div>
                <h4 style={{ fontSize: '16px', marginBottom: '15px' }}>작업 지역</h4>
                <p style={{ fontSize: '14px', color: 'var(--gray-600)', lineHeight: '1.6' }}>
                  서울 주요 지역 상담 가능<br />
                  지역별 작업 가능 여부는 상담 시 확인해 드립니다.
                </p>
              </div>
            </div>
             <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--gray-200)', textAlign: 'center', fontSize: '13px', color: 'var(--gray-600)' }}>
              <p style={{ marginBottom: '5px' }}>상호명: {BUSINESS_NAME}</p>
              <p>&copy; 2026 {BRAND_NAME}. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <MobileFloatingCTA />
      </body>
    </html>
  );
}
