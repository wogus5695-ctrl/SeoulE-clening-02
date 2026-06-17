import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { getServiceMetadata } from '@/lib/seo';
import MainTemplate from '@/components/MainTemplate';

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = services.find(s => s.serviceSlug === serviceSlug);
  if (!service) return {};
  return getServiceMetadata(service.id);
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = services.find(s => s.serviceSlug === serviceSlug);

  if (!service) {
    notFound();
  }

  return <MainTemplate region="서울·경기" service={service.serviceNameKo} />;
}

export async function generateStaticParams() {
  return services.map(s => ({
    serviceSlug: s.serviceSlug,
  }));
}
