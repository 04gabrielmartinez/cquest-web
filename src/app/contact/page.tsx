import { DetailPage } from "@/components/DetailPage";
import { getDictionary } from "@/lib/content";

export default async function ContactPage() {
  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_contact}
      title={dictionary.contact_page_title}
      summary={dictionary.contact_page_summary}
    />
  );
}
