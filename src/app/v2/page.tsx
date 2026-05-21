import { Header } from "@/components/Header";
import { OperationalCommandSection } from "@/components/OperationalCommandSection";
import { ScrollPathSignal } from "@/components/ScrollPathSignal";
import { getDictionary, getLocale } from "@/lib/content";

export default async function HomeV2() {
  const [dictionary, locale] = await Promise.all([getDictionary(), getLocale()]);
  const outcomes = [
    dictionary.home_outcome_1,
    dictionary.home_outcome_2,
    dictionary.home_outcome_3,
  ];

  return (
    <div className="page-v2">
      <ScrollPathSignal />
      <Header dictionary={dictionary} locale={locale} />

      <main className="page-content">
        <OperationalCommandSection locale={locale} />

        <section id="sectors" className="home-section home-industries" data-scroll-signal="sectors">
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

        <section className="home-section home-cta" data-scroll-signal="contact">
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
