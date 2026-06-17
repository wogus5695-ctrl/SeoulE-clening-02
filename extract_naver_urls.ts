import * as fs from 'fs';
import * as path from 'path';
import { keywords, KeywordRecord } from './src/data/keywords';

const DOMAIN = 'https://www.allcareservice.co.kr';

interface CsvRow {
  regionType: string;       // 지역구분
  regionName: string;       // 지역명
  serviceName: string;      // 작업명
  keyword: string;          // 키워드
  url: string;              // URL
  indexStatus: string;      // indexStatus
  canonicalTarget: string;  // canonicalTarget
  requestYn: string;        // 수집요청 여부
}

function generateCsvContent(rows: CsvRow[]): string {
  // UTF-8 BOM 헤더 추가 (엑셀 한글 깨짐 방지)
  let csv = '\ufeff';
  csv += '지역구분,지역명,작업명,키워드,URL,indexStatus,canonicalTarget,수집요청 여부\n';
  
  for (const row of rows) {
    const escaped = (val: string) => {
      // 값 내에 큰따옴표나 줄바꿈, 쉼표가 있을 경우 이스케이프 처리
      if (val.includes('"') || val.includes(',') || val.includes('\n')) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };
    
    csv += [
      escaped(row.regionType),
      escaped(row.regionName),
      escaped(row.serviceName),
      escaped(row.keyword),
      escaped(row.url),
      escaped(row.indexStatus),
      escaped(row.canonicalTarget),
      escaped(row.requestYn)
    ].join(',') + '\n';
  }
  
  return csv;
}

function main() {
  const rows: CsvRow[] = [];

  // 1. 공통 페이지 추가 (메인, 허브)
  rows.push({
    regionType: '공통',
    regionName: '공통',
    serviceName: '메인',
    keyword: '올케어 서비스 메인',
    url: `${DOMAIN}/`,
    indexStatus: 'index',
    canonicalTarget: '',
    requestYn: 'Y'
  });

  rows.push({
    regionType: '공통',
    regionName: '공통',
    serviceName: '허브',
    keyword: '동서울 키워드 허브',
    url: `${DOMAIN}/sitemap-seoul`,
    indexStatus: 'index',
    canonicalTarget: '',
    requestYn: 'Y'
  });

  // 2. 키워드 페이지 추가
  for (const kw of keywords) {
    const url = `${DOMAIN}/?k=${kw.urlKeyword}`;
    const canonical = kw.canonicalTarget ? `${DOMAIN}${kw.canonicalTarget}` : '';
    const regionTypeKo = kw.regionType === 'district' ? '구/시' : '동';
    
    // 수집요청 여부: indexStatus가 index이고 canonicalTarget이 없는 경우
    const requestYn = (kw.indexStatus === 'index' && !kw.canonicalTarget) ? 'Y' : 'N';

    rows.push({
      regionType: regionTypeKo,
      regionName: kw.regionName,
      serviceName: kw.serviceName,
      keyword: kw.keyword,
      url: url,
      indexStatus: kw.indexStatus,
      canonicalTarget: canonical,
      requestYn: requestYn
    });
  }

  // 3. 파일로 저장
  // A. 전체 리스트
  fs.writeFileSync(
    path.join(__dirname, 'naver_sitemap_urls_all.csv'),
    generateCsvContent(rows),
    'utf8'
  );

  // B. 1차 수집 대상 리스트 (수집요청 여부 === 'Y')
  const indexRows = rows.filter(r => r.requestYn === 'Y');
  fs.writeFileSync(
    path.join(__dirname, 'naver_sitemap_urls_index.csv'),
    generateCsvContent(indexRows),
    'utf8'
  );

  // C. 제외/중복 대상 리스트 (수집요청 여부 === 'N')
  const noindexRows = rows.filter(r => r.requestYn === 'N');
  fs.writeFileSync(
    path.join(__dirname, 'naver_sitemap_urls_noindex.csv'),
    generateCsvContent(noindexRows),
    'utf8'
  );

  console.log(`[CSV 생성 완료]`);
  console.log(`- 전체 URL 수: ${rows.length}개 (naver_sitemap_urls_all.csv)`);
  console.log(`- 1차 수집요청 대상 URL 수: ${indexRows.length}개 (naver_sitemap_urls_index.csv)`);
  console.log(`- 제외/중복 대상 URL 수: ${noindexRows.length}개 (naver_sitemap_urls_noindex.csv)`);
}

main();
