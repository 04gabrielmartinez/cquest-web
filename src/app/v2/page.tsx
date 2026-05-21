import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OperationalCommandSection } from "@/components/OperationalCommandSection";
import { ServicesNarrative } from "@/components/ServicesNarrative";
import { getDictionary, getLocale } from "@/lib/content";

export default async function HomeV2() {
  const [dictionary, locale] = await Promise.all([getDictionary(), getLocale()]);
  const serviceCards = [
    {
      title: dictionary.home_service_1_title,
      desc: dictionary.home_service_1_desc,
      meta: dictionary.nav_digital,
    },
    {
      title: dictionary.home_service_2_title,
      desc: dictionary.home_service_2_desc,
      meta: dictionary.nav_infra,
    },
    {
      title: dictionary.home_service_3_title,
      desc: dictionary.home_service_3_desc,
      meta: dictionary.nav_customer,
    },
    {
      title: dictionary.home_service_4_title,
      desc: dictionary.home_service_4_desc,
      meta: dictionary.nav_operations,
    },
    {
      title: dictionary.home_service_5_title,
      desc: dictionary.home_service_5_desc,
      meta: dictionary.nav_integrations,
    },
    {
      title: dictionary.home_service_6_title,
      desc: dictionary.home_service_6_desc,
      meta: dictionary.nav_infra,
    },
    {
      title: dictionary.home_service_7_title,
      desc: dictionary.home_service_7_desc,
      meta: dictionary.nav_process,
    },
    {
      title: dictionary.home_service_8_title,
      desc: dictionary.home_service_8_desc,
      meta: dictionary.nav_helpdesk,
    },
    {
      title: dictionary.home_service_9_title,
      desc: dictionary.home_service_9_desc,
      meta: dictionary.nav_crm,
    },
    {
      title: dictionary.home_service_10_title,
      desc: dictionary.home_service_10_desc,
      meta: dictionary.nav_backoffice,
    },
  ];

  return (
    <div className="page-v2">
      <Header dictionary={dictionary} locale={locale} />
      <Hero
        dictionary={dictionary}
        splineRuntimeSceneUrl="https://prod.spline.design/w5fDAYD0y2M-J7Xr/scene.splinecode"
        splineRenderOnDemand={false}
      />

      <main className="page-content">
        <section id="services" className="home-section home-services">
          <div className="container">
            <ServicesNarrative
              kicker={dictionary.home_services_kicker}
              title={dictionary.home_services_title}
              summary={dictionary.home_services_summary}
              services={serviceCards}
            />
          </div>
        </section>

        <OperationalCommandSection locale={locale} />
      </main>

      <footer className="v2-footer">
        <div className="container v2-footer-inner">
          <div className="v2-footer-brand">
            <Image
              src="/assets/img/logo/logo-cquest.png"
              alt="Center Quest"
              width={1536}
              height={384}
              sizes="(max-width: 900px) 80vw, 280px"
            />
            <p>{dictionary.footer}</p>
          </div>

          <div className="v2-footer-panel">
            <span>{dictionary.nav_contact}</span>
            <h2>{dictionary.home_cta_title}</h2>
            <p>{dictionary.home_cta_summary}</p>
            <a href="/contact">{dictionary.cta}</a>
          </div>

          <div className="v2-footer-links" aria-label="Footer navigation">
            <Link href="/services">{dictionary.nav_services}</Link>
            <Link href="/industries">{dictionary.nav_sectors}</Link>
            <Link href="/company">{dictionary.nav_company}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
