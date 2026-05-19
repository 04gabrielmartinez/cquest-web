import { DetailPage } from "@/components/DetailPage";
import { getDictionary, services } from "@/lib/content";

export default async function ServicesPage() {
  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_services}
      title={dictionary.services_title}
      summary={dictionary.services_page_summary}
      items={services}
      basePath="/services"
    />
  );
}
