import { DOMAIN } from './lib/seo';

const urls = [
  '/?k=%EA%B0%95%EB%82%A8%EA%B5%AC-%EC%82%AC%EB%AC%B4%EC%8B%A4%EC%B2%AD%EC%86%8C',
  '/?k=%EA%B0%95%EB%82%A8-%EC%82%AC%EB%AC%B4%EC%8B%A4%EC%B2%AD%EC%86%8C',
  '/?k=%EC%97%AD%EC%82%BC%EB%8F%99-%EC%83%81%EA%B0%80%EC%B2%AD%EC%86%8C',
  '/?k=%EC%9D%B8%EC%B2%9C%20%EC%84%9C%EA%B5%AC-%EC%83%81%EA%B0%80%EC%B2%AD%EC%86%8C',
  '/?k=%EA%B9%80%ED%8F%AC%EC%8B%9C-%EA%B3%B5%EC%9E%A5%EC%B2%AD%EC%86%8C',
  '/?k=%EA%B9%80%ED%8F%AC-%EA%B3%B5%EC%9E%A5%EC%B2%AD%EC%86%8C',
  '/?k=%EB%8D%95%EC%96%91%EA%B5%AC-%EA%B1%B4%EB%AC%BC%EC%B2%AD%EC%86%8C',
  '/?k=%EC%9B%90%EB%AF%B8%EA%B5%AC-%EA%B1%B4%EB%AC%BC%EC%B2%AD%EC%86%8C',
  '/?k=%EC%95%88%EC%82%B0-%EC%B9%A8%EC%88%98%EC%B2%AD%EC%86%8C',
  '/?k=%EB%A7%8C%EC%95%88%EA%B5%AC-%EC%B9%A8%EC%88%98%EC%B2%AD%EC%86%8C',
  '/?k=%EB%82%A8%EC%96%99%EC%A3%BC-%EC%B0%BD%EA%B3%A0%EC%B2%AD%EC%86%8C',
  '/?k=%EC%A7%84%EC%A0%91%EC%9D%8D-%EC%B0%BD%EA%B3%A0%EC%B2%AD%EC%86%8C',
  '/?k=%EB%B6%84%EB%8B%B9%EA%B5%AC-%EB%B3%91%EC%9B%90%EC%B2%AD%EC%86%8C',
  '/?k=%EC%86%A1%EB%8F%84%EB%8F%99-%EB%B3%91%EC%9B%90%EC%B2%AD%EC%86%8C'
];

async function checkLive() {
  console.log('=== CHECKING LIVE PRODUCTION URLS ===');
  for (const path of urls) {
    const fullUrl = `https://www.allcareseoul.co.kr${path}`;
    try {
      const res = await fetch(fullUrl, { redirect: 'manual' });
      console.log(`URL: ${fullUrl} -> Status: ${res.status}`);
      if (res.status === 301 || res.status === 302 || res.status === 308) {
        console.log(`  Redirect Location: ${res.headers.get('location')}`);
      }
    } catch (e) {
      console.error(`Error fetching ${fullUrl}:`, e);
    }
  }
}

checkLive();
