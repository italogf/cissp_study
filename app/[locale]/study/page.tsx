import type { Metadata } from "next";
import Link from "next/link";
import { NodeProgressStatus, StudySessionStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { ButtonLink } from "@/components/ui/button-link";
import { ClayCard } from "@/components/ui/clay-card";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUserSession } from "@/lib/auth-helpers";
import { getStudyHubData } from "@/modules/catalog/catalog.service";
import { resumeStudySessionAction } from "@/modules/study/study.actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function StudyHubPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const session = await requireUserSession(locale, `/${locale}/study`);
  const copy = getDictionary(locale);
  const data = await getStudyHubData(session.user.id, locale);
  const completedCount = data.domains.filter((domain) => domain.progressStatus === NodeProgressStatus.COMPLETED).length;

  return (
    <main className="study-page-shell">
      <div className="container">
        <header className="study-topbar">
          <Link href={`/${locale}`} className="back-link">
            {copy.studyHub.backLink}
          </Link>
          <div className="topbar-actions">
            <span className="session-pill">{session.user.email}</span>
            <SignOutButton callbackUrl={`/${locale}`} label={copy.auth.signOutAction} />
          </div>
        </header>

        <section className="section-space study-home-grid">
          <ClayCard size="lg">
            <p className="eyebrow">{copy.studyHub.eyebrow}</p>
            <h1 className="card-title">{copy.studyHub.title}</h1>
            <p className="card-body">{copy.studyHub.body}</p>
            <div className="summary-row">
              <div className="metric-pill">
                <strong>{data.domains.length}</strong>
                <span>{copy.studyHub.domainCountLabel}</span>
              </div>
              <div className="metric-pill">
                <strong>{completedCount}</strong>
                <span>{copy.studyHub.summaryLabel}</span>
              </div>
              <div className="metric-pill">
                <strong>{data.program.title}</strong>
                <span>{copy.studyHub.programLabel}</span>
              </div>
            </div>
          </ClayCard>

          {data.resumableSession ? (
            <ClayCard tone={data.resumableSession.status === StudySessionStatus.PAUSED ? "matcha" : "surface"} size="lg">
              <p className="eyebrow">{copy.studyHub.resumeEyebrow}</p>
              <h2 className="mini-title">{copy.studyHub.resumeTitle}</h2>
              <p className="card-body">
                {data.resumableSession.domainTitle} - {data.resumableSession.checkpointTitle}
              </p>
              <p className="card-body">
                {data.resumableSession.status === StudySessionStatus.PAUSED
                  ? copy.studyHub.resumePaused
                  : copy.studyHub.resumeActive}
              </p>
              <form action={resumeStudySessionAction} className="inline-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sessionId" value={data.resumableSession.id} />
                <button type="submit" className="button-link button-link--primary">
                  {copy.studyHub.resumeAction}
                </button>
              </form>
            </ClayCard>
          ) : null}
        </section>

        <section className="section-space">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{copy.studyHub.domainsEyebrow}</p>
              <h2 className="section-title">{copy.studyHub.domainsTitle}</h2>
            </div>
            <p className="section-copy">{copy.studyHub.domainsBody}</p>
          </div>

          <div className="domain-grid domain-grid--study">
            {data.domains.map((domain) => {
              const statusLabel =
                domain.progressStatus === NodeProgressStatus.COMPLETED
                  ? copy.studyHub.completedLabel
                  : domain.progressStatus === NodeProgressStatus.IN_PROGRESS
                    ? copy.studyHub.inProgressLabel
                    : copy.studyHub.readyLabel;

              return (
                <ClayCard key={domain.id} className="domain-card">
                  <div className="domain-card__meta">
                    <span className="session-pill">
                      {copy.studyHub.domainLabel} {domain.sequenceIndex} · {statusLabel}
                    </span>
                  </div>
                  <h3 className="mini-title">{domain.title}</h3>
                  <p className="card-body">{domain.summary}</p>
                  <div className="domain-card__footer">
                    <span className="session-pill">{domain.estimatedMinutes} min</span>
                    <ButtonLink href={`/${locale}/study/domain/${domain.slug}`} variant="secondary">
                      {domain.progressStatus === NodeProgressStatus.IN_PROGRESS
                        ? copy.studyHub.continueAction
                        : copy.studyHub.launchAction}
                    </ButtonLink>
                  </div>
                </ClayCard>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
