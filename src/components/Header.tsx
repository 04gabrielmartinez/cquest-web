import Link from "next/link";
import { BrandHomeLink } from "@/components/BrandHomeLink";
import { NavLink } from "@/components/NavLink";
import { Dictionary, DictionaryKey, industries, services, t } from "@/lib/content";

const groups: { key: DictionaryKey; slugs: string[] }[] = [
  { key: "nav_automation", slugs: ["system-integrations", "analytics-dashboards", "ai-automation", "process-optimization"] },
  { key: "nav_infra", slugs: ["managed-technical-support", "enterprise-help-desk", "monitoring-continuity", "cloud-servers"] },
  { key: "nav_cx", slugs: ["omnichannel-service", "quality-audit", "crm-sales-workflows", "contact-center-cx"] },
  { key: "nav_backoffice", slugs: ["administrative-bpo", "operational-reporting", "process-optimization", "managed-operations"] },
];

const groupHeadingSlug: Record<string, string> = {
  nav_automation: "automation-software",
  nav_infra: "managed-technical-support",
  nav_cx: "contact-center-cx",
  nav_backoffice: "operational-back-office",
};

export function Header({ dictionary, locale }: { dictionary: Dictionary; locale: "en" | "es" }) {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="top-nav">
          <BrandHomeLink />

          <div className="desktop-links">
            <div className="nav-item">
              <NavLink href="/services">{dictionary.nav_services}</NavLink>
              <button className="nav-link mega-trigger" type="button" aria-label={`${dictionary.nav_services} menu`}>
                <span className="chevron" aria-hidden="true" />
              </button>
              <div className="mega-menu">
                <div className="mega-panel">
                  <div className="mega-intro">
                    <span className="mega-kicker">{dictionary.nav_services}</span>
                    <p>{dictionary.nav_service_intro}</p>
                    <Link className="btn" href="/services">{dictionary.nav_service_cta}</Link>
                  </div>

                  <div className="mega-grid">
                    {groups.map((group) => (
                      <div className="mega-group" key={group.key}>
                        <Link className="mega-heading" href={`/services/${groupHeadingSlug[group.key]}`}>
                          {t(dictionary, group.key)}
                        </Link>
                        {group.slugs.map((slug) => {
                          const service = services.find((item) => item.slug === slug);
                          return service ? (
                            <Link key={slug} href={`/services/${slug}`}>{t(dictionary, service.key)}</Link>
                          ) : null;
                        })}
                      </div>
                    ))}

                    <div className="industry-list">
                      <strong>{dictionary.nav_industries}</strong>
                      {industries.map((industry) => (
                        <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                          {t(dictionary, industry.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <NavLink href="/industries">{dictionary.nav_sectors}</NavLink>
            <NavLink href="/company">{dictionary.nav_company}</NavLink>
            <NavLink href="/contact">{dictionary.nav_contact}</NavLink>
          </div>

          <div className="toolbar-actions">
            <form className="language-switcher" action="/language" method="post" aria-label="Language selector">
              <button type="submit" name="locale" value="en" aria-pressed={locale === "en"}>EN</button>
              <button type="submit" name="locale" value="es" aria-pressed={locale === "es"}>ES</button>
            </form>
          </div>

          <input className="menu-toggle" id="mobile-menu" type="checkbox" aria-label="Toggle navigation" />
          <label className="mobile-menu-button" htmlFor="mobile-menu" aria-hidden="true"><span /></label>
          <div className="mobile-panel">
            <div className="mobile-links">
              <Link href="/services">{dictionary.nav_services}</Link>
              <Link href="/industries">{dictionary.nav_sectors}</Link>
              <Link href="/company">{dictionary.nav_company}</Link>
              <Link href="/contact">{dictionary.nav_contact}</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
