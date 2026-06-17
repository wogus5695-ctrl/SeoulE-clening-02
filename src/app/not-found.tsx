import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND_NAME } from '@/lib/seo';

export const metadata: Metadata = {
  title: `페이지를 찾을 수 없습니다 | ${BRAND_NAME}`,
  description: '요청하신 페이지를 찾을 수 없거나 변경되었습니다. 주소를 다시 확인해 주세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{ padding: '120px 20px', textAlign: 'center', fontFamily: 'var(--font-sc-dream), sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '72px', color: '#003366', margin: '0 0 20px', fontWeight: '800' }}>404</h1>
        <h2 style={{ fontSize: '24px', color: '#333', margin: '0 0 15px', fontWeight: '600' }}>원하시는 페이지를 찾을 수 없습니다.</h2>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', margin: '0 0 40px' }}>
          찾으시려는 페이지의 주소가 잘못 입력되었거나,<br />
          페이지 주소의 변경 또는 삭제로 인해 현재 사용하실 수 없습니다.<br />
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </p>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-block', 
            padding: '14px 28px', 
            backgroundColor: '#003366', 
            color: '#fff', 
            borderRadius: '6px', 
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background-color 0.2s ease',
            boxShadow: '0 4px 6px rgba(0, 51, 102, 0.1)'
          }}
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
