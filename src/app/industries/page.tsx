import { DetailPage } from "@/components/DetailPage";
import { getDictionary, industries } from "@/lib/content";

export default async function IndustriesPage() {
  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_industries}
      title={dictionary.nav_sectors}
      summary={dictionary.industries_page_summary}
      items={industries}
      basePath="/industries"
    />
  );
}
