import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { regions } from '@/data/regions';
import { getRegionMetadata } from '@/lib/seo';
import MainTemplate from '@/components/MainTemplate';

type Props = {
  params: Promise<{ city: string; district: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district } = await params;
  return getRegionMetadata(district);
}

export default async function AreaPage({ params }: Props) {
  const { district } = await params;
  const region = regions.find((r) => r.districtSlug === district && r.subDistrictSlug === 'all');

  if (!region) {
    notFound();
  }

  return <MainTemplate region={region.district} service="종합청소" />;
}

export async function generateStaticParams() {
  const uniqueDistricts = Array.from(new Set(regions.map(r => r.districtSlug)));
  const params: { city: string; district: string }[] = [];
  
  uniqueDistricts.forEach(dSlug => {
    const r = regions.find(reg => reg.districtSlug === dSlug);
    if (r) {
      params.push({ city: r.regionSlug, district: r.districtSlug });
    }
  });

  return params;
}
