import Link from "next/link";
import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { ClayCard } from "@/components/ui/clay-card";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const copy = getDictionary(locale);

  return (
    <main className="clay-page-shell">
      <div className="ambient-orb ambient-orb--matcha" />
      <div className="ambient-orb ambient-orb--ube" />
      <div className="container">
        <header className="topbar">
          <Link href={`/${locale}`} className="brand-lockup">
            <span className="brand-mark">CF</span>
            <span>
              <strong>{copy.brand}</strong>
              <small>{copy.brandTagline}</small>
            </span>
          </Link>

          <nav className="locale-switcher" aria-label={copy.localeLabel}>
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={item === locale ? "locale-pill locale-pill--active" : "locale-pill"}
              >
                {item}
              </Link>
            ))}
          </nav>
        </header>

        <section className="hero-grid section-space">
          <div>
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1 className="hero-title">{copy.hero.title}</h1>
            <p className="hero-copy">{copy.hero.body}</p>
             <div className="hero-actions">
              <ButtonLink href={`/${locale}/study`}>
                {copy.hero.primaryAction}
              </ButtonLink>
              <ButtonLink href="#domains" variant="secondary">
                {copy.hero.secondaryAction}
              </ButtonLink>
            </div>
            <p className="hero-caption">{copy.hero.caption}</p>
          </div>

          <div className="hero-stack">
            <ClayCard className="hero-focus-card" tone="surface" size="lg">
              <span className="card-label">{copy.hero.focusLabel}</span>
              <h2 className="card-title">{copy.hero.focusTitle}</h2>
              <p className="card-body">{copy.hero.focusBody}</p>
              <div className="metric-row">
                {copy.hero.metrics.map((metric) => (
                  <div key={metric.label} className="metric-pill">
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </ClayCard>

            <div className="hero-stack-grid">
              <ClayCard tone="dashed">
                <span className="card-label">{copy.hero.previewLabel}</span>
                <h3 className="mini-title">{copy.hero.previewTitle}</h3>
                <p className="card-body">{copy.hero.previewBody}</p>
              </ClayCard>

              <ClayCard tone="matcha">
                <span className="card-label">{copy.hero.systemLabel}</span>
                <h3 className="mini-title">{copy.hero.systemTitle}</h3>
                <p className="card-body">{copy.hero.systemBody}</p>
              </ClayCard>
            </div>
          </div>
        </section>

        <section id="domains" className="section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.domains.eyebrow}</p>
              <h2 className="section-title">{copy.domains.title}</h2>
            </div>
            <p className="section-copy">{copy.domains.body}</p>
          </div>

          <div className="domain-grid">
            {copy.domains.items.map((domain, index) => (
              <ClayCard key={domain} className="domain-card">
                <span className="domain-index">0{index + 1}</span>
                <h3 className="mini-title">{domain}</h3>
              </ClayCard>
            ))}
          </div>
        </section>

        <section className="section-space feature-layout">
          <ClayCard tone="dark" size="lg">
            <p className="eyebrow eyebrow--light">{copy.focusLoop.eyebrow}</p>
            <h2 className="section-title section-title--light">{copy.focusLoop.title}</h2>
            <p className="section-copy section-copy--light">{copy.focusLoop.body}</p>
          </ClayCard>

          <div className="feature-grid">
            {copy.focusLoop.items.map((item) => (
              <ClayCard key={item.title}>
                <span className="card-label">{item.step}</span>
                <h3 className="mini-title">{item.title}</h3>
                <p className="card-body">{item.body}</p>
              </ClayCard>
            ))}
          </div>
        </section>

        <section className="section-space catalog-grid">
          <ClayCard tone="surface" size="lg">
            <p className="eyebrow">{copy.catalog.eyebrow}</p>
            <h2 className="section-title">{copy.catalog.title}</h2>
            <p className="section-copy">{copy.catalog.body}</p>
          </ClayCard>

          <ClayCard tone="dashed" size="lg">
            <ul className="catalog-list">
              {copy.catalog.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ClayCard>
        </section>
      </div>
    </main>
  );
}
