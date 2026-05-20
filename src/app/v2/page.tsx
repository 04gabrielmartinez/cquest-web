import { DeliveryModelSection } from "@/components/DeliveryModelSection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
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

  const outcomes = [
    dictionary.home_outcome_1,
    dictionary.home_outcome_2,
    dictionary.home_outcome_3,
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

        <DeliveryModelSection
          kicker={dictionary.home_method_kicker}
          title={dictionary.home_method_title}
          summary={dictionary.home_method_summary}
        />

        <section id="sectors" className="home-section home-industries">
          <div className="container industries-layout">
            <div>
              <span className="eyebrow">{dictionary.home_industries_kicker}</span>
              <h2>{dictionary.home_industries_title}</h2>
              <p>{dictionary.home_industries_summary}</p>
              <div className="industry-pills">
                <span>{dictionary.nav_health}</span>
                <span>{dictionary.nav_finance}</span>
                <span>{dictionary.nav_retail}</span>
                <span>{dictionary.nav_telecom}</span>
                <span>{dictionary.nav_travel}</span>
              </div>
            </div>

            <div className="outcome-panel">
              <div className="outcome-kpis">
                <div><strong>120+</strong>{dictionary.kpi_1}</div>
                <div><strong>99.9%</strong>{dictionary.kpi_2}</div>
                <div><strong>&lt; 15 min</strong>{dictionary.kpi_3}</div>
              </div>
              <div className="outcome-list">
                {outcomes.map((outcome) => (
                  <span key={outcome}>{outcome}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-cta">
          <div className="container cta-band">
            <div>
              <span className="eyebrow">{dictionary.nav_contact}</span>
              <h2>{dictionary.home_cta_title}</h2>
              <p>{dictionary.home_cta_summary}</p>
            </div>
            <a className="btn" href="/contact">{dictionary.cta}</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">{dictionary.footer}</div>
      </footer>
    </div>
  );
}
