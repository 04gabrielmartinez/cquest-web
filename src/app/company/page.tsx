import { DetailPage } from "@/components/DetailPage";
import { getDictionary } from "@/lib/content";

export default async function CompanyPage() {
  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_company}
      title={dictionary.company_page_title}
      summary={dictionary.company_page_summary}
    />
  );
}
