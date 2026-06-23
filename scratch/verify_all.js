const http = require('http');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 한글 종성(받침) 여부 판별 함수
function getSubjectParticle(word) {
  const lastChar = word.charCodeAt(word.length - 1);
  const jong = (lastChar - 0xac00) % 28;
  return jong === 0 ? '가' : '이';
}

const targetServices = [
  '외벽청소', '유리창청소', '화재청소', '바닥왁스코팅', '어닝청소', '간판청소',
  '인테리어 후 청소', '준공청소', '후드청소', '특수청소', '바닥청소', '쓰레기집 청소'
];

const targetDistricts = [
  { fullName: '서초구', name: '서초' },
  { fullName: '강남구', name: '강남' },
  { fullName: '송파구', name: '송파' },
  { fullName: '강동구', name: '강동' },
  { fullName: '광진구', name: '광진' },
  { fullName: '성동구', name: '성동' },
  { fullName: '동대문구', name: '동대문' },
  { fullName: '중랑구', name: '중랑' },
  { fullName: '성북구', name: '성북' },
  { fullName: '강북구', name: '강북' },
  { fullName: '도봉구', name: '도봉' },
  { fullName: '노원구', name: '노원' }
];

const forbiddenKeywords = ['구리', '하남', '남양주'];

async function verifyAll() {
  console.log('==================================================');
  console.log('   올케어서비스 홈페이지 키워드 최종 종합 검수   ');
  console.log('==================================================\n');

  let failedTests = 0;

  try {
    // 1단계: /sitemap-seoul 페이지 검수
    console.log('[검수 1단계] /sitemap-seoul 페이지 검사 중...');
    const sitemap = await fetchPage('http://localhost:3000/sitemap-seoul');
    
    // 경기 지역 키워드가 포함되었는지 확인 (기준 7)
    console.log(' -> [기준 7] 경기 지역 키워드 차단 검사');
    for (const forbidden of forbiddenKeywords) {
      if (sitemap.body.includes(forbidden)) {
        console.error(`  [-] 오류: 사이트맵에 경기 지역 단어(${forbidden})가 감지되었습니다!`);
        failedTests++;
      }
    }
    if (failedTests === 0) {
      console.log('  [+] 통과: 경기 지역 키워드(구리, 하남, 남양주)가 전혀 감지되지 않았습니다.');
    }

    // 12개 자치구 및 12개 작업명 링크 존재 검증 (기준 1, 2, 3)
    console.log(' -> [기준 1, 2, 3] 모든 자치구 12대 작업명 구 포함/제외 a href 태그 검증');
    let linkCount = 0;
    for (const dist of targetDistricts) {
      for (const serv of targetServices) {
        const fullKw = `${dist.fullName}-${serv}`;
        const shortKw = `${dist.name}-${serv}`;

        const fullHref = `href="/?k=${encodeURIComponent(fullKw)}"`;
        const shortHref = `href="/?k=${encodeURIComponent(shortKw)}"`;

        // full href 검사
        if (!sitemap.body.includes(fullHref)) {
          console.error(`  [-] 오류: 링크 누락 -> ${dist.fullName} ${serv} (${fullHref})`);
          failedTests++;
        }
        // short href 검사
        if (!sitemap.body.includes(shortHref)) {
          console.error(`  [-] 오류: 링크 누락 -> ${dist.name} ${serv} (${shortHref})`);
          failedTests++;
        }
        linkCount += 2;
      }
    }
    console.log(`  [+] 통과: 총 ${linkCount}개의 구 포함/구 제외 a href 키워드 링크가 완벽하게 존재합니다.`);

    // 2단계: 동적 페이지 렌더링 검수 (기준 4, 5, 6, 8)
    console.log('\n[검수 2단계] 개별 동적 랜딩 페이지 렌더링 검사 중...');
    
    const SERVICE_DESC_TEMPLATES = {
      '외벽청소': '{region} 건물 외벽에 쌓인 먼지, 빗물 자국, 매연 오염을 확인하고 현장 조건에 맞춰 작업 가능 여부를 안내합니다.',
      '유리창청소': '{region} 상가, 빌딩, 매장 유리창의 물때, 손자국, 빗물 얼룩을 확인하고 작업 범위에 맞춰 상담을 안내합니다.',
      '화재청소': '{region} 화재 피해 현장의 그을음, 냄새, 분진 상태를 확인하고 정리 범위와 청소 가능 여부를 안내합니다.',
      '바닥왁스코팅': '{region} 상가, 사무실, 매장 바닥의 광택 저하와 오염 상태를 확인하고 왁스코팅 작업 범위를 안내합니다.',
      '어닝청소': '{region} 매장 어닝에 쌓인 먼지, 빗물 자국, 곰팡이 오염을 확인하고 원단 상태와 작업 가능 여부를 안내합니다.',
      '간판청소': '{region} 매장 간판의 먼지, 빗물 얼룩, 조류 오염 상태를 확인하고 외부 작업 가능 여부를 안내합니다.',
      '인테리어 후 청소': '{region} 인테리어 공사 후 남은 분진, 접착제 자국, 실내 오염 상태를 확인하고 입주 전 청소 범위를 안내합니다.',
      '준공청소': '{region} 준공 현장의 공사 분진, 시멘트 가루, 보양재 잔여물을 확인하고 입주 전 정리 범위를 안내합니다.',
      '후드청소': '{region} 음식점 주방 후드와 배기 주변의 기름때, 악취, 오염 상태를 확인하고 청소 범위를 안내합니다.',
      '특수청소': '{region} 일반 청소로 처리하기 어려운 오염, 악취, 방치 공간 상태를 확인하고 현장에 맞는 정리 방향을 안내합니다.',
      '바닥청소': '{region} 상가, 사무실, 매장 바닥의 찌든 때, 오염 누적, 미끄럼 상태를 확인하고 청소 범위를 안내합니다.',
      '쓰레기집 청소': '{region} 원룸, 오피스텔, 빌라 등 생활폐기물이 쌓인 공간의 상태를 확인하고 정리 범위와 청소 가능 여부를 안내합니다.'
    };

    // 검사 대상 샘플 키워드 지정 (띄어쓰기가 있는 인테리어 후 청소, 쓰레기집 청소 및 받침 있는 코팅 포함)
    const testCases = [
      { dist: '성북구', shortDist: '성북', serv: '간판청소' },
      { dist: '강남구', shortDist: '강남', serv: '쓰레기집 청소' },
      { dist: '서초구', shortDist: '서초', serv: '인테리어 후 청소' },
      { dist: '송파구', shortDist: '송파', serv: '바닥왁스코팅' },
      { dist: '노원구', shortDist: '노원', serv: '바닥청소' }
    ];

    for (const tc of testCases) {
      const kw = `${tc.dist}-${tc.serv}`;
      const url = `http://localhost:3000/?k=${encodeURIComponent(kw)}`;
      console.log(`\n -> 페이지 테스트: [${tc.dist} ${tc.serv}] (${url})`);
      
      const res = await fetchPage(url);

      // A. H1 검증
      const h1Match = res.body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      const expectedH1Text = `${tc.dist} ${tc.serv} 전문 올케어서비스`;
      const cleanH1Text = h1Match ? h1Match[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : '';

      if (cleanH1Text === expectedH1Text) {
        console.log(`  [+] H1 일치: "${cleanH1Text}"`);
      } else {
        console.error(`  [-] H1 불일치! 기대한 값: "${expectedH1Text}", 실제 값: "${cleanH1Text}"`);
        failedTests++;
      }

      // B. Hero 설명 검증
      const expectedHeroDesc = SERVICE_DESC_TEMPLATES[tc.serv].replace(/{region}/g, tc.dist);

      if (res.body.includes(expectedHeroDesc)) {
        console.log(`  [+] Hero 설명 일치 및 맞춤형 문안 적용 완료!`);
      } else {
        console.error(`  [-] Hero 설명 불일치!\n    기대한 값: "${expectedHeroDesc}"`);
        failedTests++;
      }

      // C. CTA 검증
      const expectedCTA = `${tc.dist} ${tc.serv} 상담하기`;
      if (res.body.includes(expectedCTA)) {
        console.log(`  [+] CTA 일치: "${expectedCTA}"`);
      } else {
        console.error(`  [-] CTA 불일치! 기대한 값: "${expectedCTA}"`);
        failedTests++;
      }

      // D. meta title 검증
      const expectedTitle = `<title>${tc.dist} ${tc.serv} 전문 | 올케어서비스</title>`;
      if (res.body.includes(expectedTitle)) {
        console.log(`  [+] meta title 일치: "${tc.dist} ${tc.serv} 전문 | 올케어서비스"`);
      } else {
        console.error(`  [-] meta title 불일치! 기대한 태그: "${expectedTitle}"`);
        failedTests++;
      }

      // E. meta description 검증
      const expectedDescPart = `content="${expectedHeroDesc}`;
      if (res.body.includes(expectedDescPart)) {
        console.log(`  [+] meta description 일치 및 맞춤형 문안 적용 완료!`);
      } else {
        console.error(`  [-] meta description 불일치!\n    기대한 내용 일부: "${expectedDescPart}"`);
        failedTests++;
      }
    }

    console.log('\n==================================================');
    if (failedTests === 0) {
      console.log('   ★ 모든 검수 항목 100% 통과 (오류 없음) ★   ');
    } else {
      console.log(`   ⚠ 총 ${failedTests}개의 검수 오류가 발견되었습니다. ⚠   `);
    }
    console.log('==================================================');

  } catch (err) {
    console.error('검수 실행 중 네트워크 또는 서버 에러가 발생했습니다:', err);
  }
}

verifyAll();
