import { notFound } from 'next/navigation';
import SiteContentForm from '@/components/admin/site/SiteContentForm';
import { getContent, isContentKey } from '@/lib/siteContent';

export const dynamic = 'force-dynamic';

export default async function AdminSiteContentPage({ params }: { params: { key: string } }) {
  if (!isContentKey(params.key)) notFound();
  const value = await getContent(params.key);
  return <SiteContentForm contentKey={params.key} initial={value} />;
}
