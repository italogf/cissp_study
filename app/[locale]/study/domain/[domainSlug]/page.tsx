import type { Metadata } from "next";
import Link from "next/link";
import { NodeProgressStatus } from "@prisma/client";
import { notFound } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { DomainLaunchPanel } from "@/components/study/domain-launch-panel";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUserSession } from "@/lib/auth-helpers";
import { getDomainLaunchData } from "@/modules/catalog/catalog.service";
import {
  resumeStudySessionAction,
  startStudySessionAction
} from "@/modules/study/study.actions";

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
    domainSlug: string;
  }>;
};

function getProgressStatusLabel(
  progressStatus: NodeProgressStatus,
  copy: ReturnType<typeof getDictionary>
) {
  switch (progressStatus) {
    case NodeProgressStatus.COMPLETED:
      return copy.studyHub.completedLabel;
    case NodeProgressStatus.IN_PROGRESS:
      return copy.studyHub.inProgressLabel;
    default:
      return copy.studyHub.readyLabel;
  }
}

export default async function DomainLaunchPage({ params }: PageProps) {
  const { locale, domainSlug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const session = await requireUserSession(locale, `/${locale}/study/domain/${domainSlug}`);
  const data = await getDomainLaunchData(session.user.id, locale, domainSlug);

  if (!data) {
    notFound();
  }

  const copy = getDictionary(locale);
  const statusLabel = getProgressStatusLabel(data.progressStatus, copy);

  return (
    <main className="study-page-shell">
      <div className="container">
        <header className="study-topbar">
          <Link href={`/${locale}/study`} className="back-link">
            {copy.studyLaunch.backLink}
          </Link>
          <div className="topbar-actions">
            <span className="session-pill">{statusLabel}</span>
            <SignOutButton callbackUrl={`/${locale}`} label={copy.auth.signOutAction} />
          </div>
        </header>

        <DomainLaunchPanel
          locale={locale}
          domain={{
            slug: data.domain.slug,
            sequenceIndex: data.domain.sequenceIndex,
            title: data.domain.title,
            summary: data.domain.summary ?? "",
            objective: data.domain.objective ?? "",
            estimatedMinutes: data.domain.estimatedMinutes
          }}
          keyAreas={data.keyAreas.map((keyArea) => ({
            sequenceIndex: keyArea.sequenceIndex,
            lesson: {
              title: keyArea.lesson.title,
              shortTitle: keyArea.lesson.shortTitle,
              summary: keyArea.lesson.summary,
              objective: keyArea.lesson.objective
            },
            checkpoint: {
              id: keyArea.checkpoint.id,
              title: keyArea.checkpoint.title,
              summary: keyArea.checkpoint.summary,
              objective: keyArea.checkpoint.objective
            },
            progressStatus: keyArea.progressStatus,
            isSelected: keyArea.isSelected,
            isCurrentSession: keyArea.isCurrentSession,
            sessionId: keyArea.sessionId
          }))}
          copy={{
            eyebrow: copy.studyLaunch.eyebrow,
            title: copy.studyLaunch.title,
            domainLabel: copy.studyHub.domainLabel,
            lessonLabel: copy.studyLaunch.lessonLabel,
            objectiveLabel: copy.studyLaunch.objectiveLabel,
            estimatedTimeLabel: copy.studyLaunch.estimatedTimeLabel,
            keyAreasEyebrow: copy.studyLaunch.keyAreasEyebrow,
            keyAreasTitle: copy.studyLaunch.keyAreasTitle,
            keyAreasBody: copy.studyLaunch.keyAreasBody,
            keyAreaLabel: copy.studyLaunch.keyAreaLabel,
            currentLabel: copy.studyLaunch.currentLabel,
            selectedLabel: copy.studyLaunch.selectedLabel,
            startAction: copy.studyLaunch.startAction,
            resumeAction: copy.studyLaunch.resumeAction,
            startSupport: copy.studyLaunch.startSupport,
            completedLabel: copy.studyHub.completedLabel,
            inProgressLabel: copy.studyHub.inProgressLabel,
            readyLabel: copy.studyHub.readyLabel
          }}
          startSessionAction={startStudySessionAction}
          resumeSessionAction={resumeStudySessionAction}
        />
      </div>
    </main>
  );
}
