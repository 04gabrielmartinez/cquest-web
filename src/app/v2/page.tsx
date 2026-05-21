import { Header } from "@/components/Header";
import { OperationalCommandSection } from "@/components/OperationalCommandSection";
import { getDictionary, getLocale } from "@/lib/content";

export default async function HomeV2() {
  const [dictionary, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <div className="page-v2">
      <Header dictionary={dictionary} locale={locale} />

      <main className="page-content">
        <OperationalCommandSection locale={locale} />
      </main>

      <footer className="v2-footer">
        <div className="container v2-footer-inner">
          <span>CQuest</span>
          <p>{dictionary.footer}</p>
          <a href="/contact">{dictionary.cta}</a>
        </div>
      </footer>
    </div>
  );
}
