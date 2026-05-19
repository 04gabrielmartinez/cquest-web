import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";
import { getDictionary, industries, t } from "@/lib/content";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_industries}
      title={t(dictionary, industry.key)}
      summary={dictionary.industry_page_summary}
      items={industries}
      basePath="/industries"
    />
  );
}
