import { notFound } from "next/navigation";
import { DetailPage } from "@/components/DetailPage";
import { getDictionary, services, t } from "@/lib/content";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const dictionary = await getDictionary();

  return (
    <DetailPage
      eyebrow={dictionary.nav_services}
      title={t(dictionary, service.key)}
      summary={dictionary.service_page_summary}
      items={services}
      basePath="/services"
    />
  );
}
