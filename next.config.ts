import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 0. 중구 옛날 슬러그(jung) 유입 시 표준 슬러그(jung-gu)로 301 영구 리디렉션
        source: '/seoul/jung/:path*',
        destination: '/seoul/jung-gu/:path*',
        permanent: true,
      },
      {
        // 1. -gu 접미사가 붙은 구명을 접미사 없는 표준 슬러그로 변환하여 리디렉션
        // 예: /floor-wax-coating/gangnam-gu -> /seoul/gangnam/floor-wax-coating
        source: '/:service(exterior-cleaning|window-cleaning|fire-cleaning|floor-wax-coating|awning-cleaning|signboard-cleaning|interior-post-cleaning|construction-completion-cleaning|hood-cleaning|hoarder-house-cleaning|special-cleaning)/:district(yangcheon|gangseo|guro|geumcheon|yeongdeungpo|dongjak|gwanak|eunpyeong|seodaemun|mapo|jongno|yongsan)-gu',
        destination: '/seoul/:district/:service',
        permanent: true,
      },
      {
        // 2. 표준 구명 또는 중구(jung-gu) 패턴 리디렉션
        // 예: /floor-wax-coating/gangnam -> /seoul/gangnam/floor-wax-coating
        // 예: /floor-wax-coating/jung-gu -> /seoul/jung-gu/floor-wax-coating
        source: '/:service(exterior-cleaning|window-cleaning|fire-cleaning|floor-wax-coating|awning-cleaning|signboard-cleaning|interior-post-cleaning|construction-completion-cleaning|hood-cleaning|hoarder-house-cleaning|special-cleaning)/:district(yangcheon|gangseo|guro|geumcheon|yeongdeungpo|dongjak|gwanak|eunpyeong|seodaemun|mapo|jongno|jung-gu|yongsan)',
        destination: '/seoul/:district/:service',
        permanent: true,
      },
      {
        // 3. 인천 -gu 접미사가 붙은 구명을 표준 슬러그로 변환하여 리디렉션
        // 예: /floor-wax-coating/yeonsu-gu -> /incheon/yeonsu/floor-wax-coating
        source: '/:service(exterior-cleaning|window-cleaning|fire-cleaning|floor-wax-coating|awning-cleaning|signboard-cleaning|interior-post-cleaning|construction-completion-cleaning|hood-cleaning|hoarder-house-cleaning|special-cleaning)/:district(michuhol|yeonsu|namdong|bupyeong|gyeyang|incheon-seo-gu|incheon-seohae-gu|incheon-geomdan-gu)-gu',
        destination: '/incheon/:district/:service',
        permanent: true,
      },
      {
        // 4. 인천 표준 구명 패턴 리디렉션
        // 예: /floor-wax-coating/yeonsu -> /incheon/yeonsu/floor-wax-coating
        source: '/:service(exterior-cleaning|window-cleaning|fire-cleaning|floor-wax-coating|awning-cleaning|signboard-cleaning|interior-post-cleaning|construction-completion-cleaning|hood-cleaning|hoarder-house-cleaning|special-cleaning)/:district(michuhol|yeonsu|namdong|bupyeong|gyeyang|incheon-seo-gu|incheon-seohae-gu|incheon-geomdan-gu)',
        destination: '/incheon/:district/:service',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
