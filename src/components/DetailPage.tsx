import Link from "next/link";
import { Header } from "@/components/Header";
import { Dictionary, DictionaryKey, getDictionary, getLocale, t } from "@/lib/content";

type DetailItem = {
  slug: string;
  key: DictionaryKey;
};

export async function DetailPage({
  eyebrow,
  title,
  summary,
  items,
  basePath,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  items?: readonly DetailItem[];
  basePath?: string;
}) {
  const [dictionary, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <>
      <Header dictionary={dictionary} locale={locale} />
      <main className="container detail-main">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{summary}</p>

        {items && basePath ? (
          <div className="related">
            {items.map((item) => (
              <Link className="related-card" key={item.slug} href={`${basePath}/${item.slug}`}>
                {t(dictionary as Dictionary, item.key)}
              </Link>
            ))}
          </div>
        ) : null}

        <Link className="btn" href="/">{dictionary.back_home}</Link>
      </main>
    </>
  );
}
