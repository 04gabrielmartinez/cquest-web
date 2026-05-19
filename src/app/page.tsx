import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { getDictionary, getLocale } from "@/lib/content";

export default async function Home() {
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
  ];

  const methodSteps = [
    dictionary.home_method_1,
    dictionary.home_method_2,
    dictionary.home_method_3,
    dictionary.home_method_4,
  ];

  const outcomes = [
    dictionary.home_outcome_1,
    dictionary.home_outcome_2,
    dictionary.home_outcome_3,
  ];

  return (
    <>
      <Header dictionary={dictionary} locale={locale} />
      <Hero dictionary={dictionary} />

      <main className="page-content">
        <section id="services" className="home-section home-services">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">{dictionary.home_services_kicker}</span>
              <h2>{dictionary.home_services_title}</h2>
              <p>{dictionary.home_services_summary}</p>
            </div>

            <div className="premium-grid">
              {serviceCards.map((service) => (
                <article className="premium-card" key={service.title}>
                  <span>{service.meta}</span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-method">
          <div className="container method-layout">
            <div className="section-heading">
              <span className="eyebrow">{dictionary.home_method_kicker}</span>
              <h2>{dictionary.home_method_title}</h2>
              <p>{dictionary.home_method_summary}</p>
            </div>

            <div className="method-panel">
              {methodSteps.map((step, index) => (
                <div className="method-step" key={step}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

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
    </>
  );
}
