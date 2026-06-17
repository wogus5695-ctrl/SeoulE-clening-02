export interface PortfolioItem {
  id: string;
  category: string;
  beforeImg: string;
  afterImg: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'fire',
    category: '화재 그을음 특수 정화',
    beforeImg: '/images/portfolio/fire-before.jpg',
    afterImg: '/images/portfolio/fire-after.jpg',
  },
  {
    id: 'wax',
    category: '데코타일 바닥 왁스 코팅',
    beforeImg: '/images/portfolio/wax-before.jpg',
    afterImg: '/images/portfolio/wax-after.jpg',
  },
  {
    id: 'floor',
    category: '바닥 오염/본드 자국 제거',
    beforeImg: '/images/portfolio/floor-before.jpg',
    afterImg: '/images/portfolio/floor-after.jpg',
  },
  {
    id: 'ac',
    category: '종합 에어컨 분해 세척',
    beforeImg: '/images/portfolio/ac-before.jpg',
    afterImg: '/images/portfolio/ac-after.jpg',
  },
  {
    id: 'interior',
    category: '인테리어 공사 후 분진 제거',
    beforeImg: '/images/portfolio/interior-before.jpg',
    afterImg: '/images/portfolio/interior-after.jpg',
  },
  {
    id: 'parking',
    category: '주차장 에폭시 바닥 세정',
    beforeImg: '/images/portfolio/parking-before.jpg',
    afterImg: '/images/portfolio/parking-after.jpg',
  },
  {
    id: 'construction',
    category: '신축 빌딩 준공 클리닝',
    beforeImg: '/images/portfolio/construction-before.jpg',
    afterImg: '/images/portfolio/construction-after.jpg',
  },
];
