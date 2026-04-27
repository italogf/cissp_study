import type { Metadata } from "next";
import Link from "next/link";
import { StudySessionStatus, StudyStepKey } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { StudyCardDeck } from "@/components/study/study-card-deck";
import { StudyStepProgress } from "@/components/study/study-step-progress";
import { ClayCard } from "@/components/ui/clay-card";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { requireUserSession } from "@/lib/auth-helpers";
import {
  advanceStudySessionAction,
  completeStudySessionAction,
  pauseStudySessionAction,
  resumeStudySessionAction,
  submitStudyAnswerAction
} from "@/modules/study/study.actions";
import { getStudySessionView } from "@/modules/study/study.service";

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
    sessionId: string;
  }>;
};

function getStepLabel(copy: ReturnType<typeof getDictionary>, stepKey: StudyStepKey) {
  switch (stepKey) {
    case StudyStepKey.MISSION:
      return copy.studySession.missionEyebrow;
    case StudyStepKey.LEARN:
      return copy.studySession.learnEyebrow;
    case StudyStepKey.QUESTION:
      return copy.studySession.questionEyebrow;
    case StudyStepKey.REVIEW:
      return copy.studySession.reviewEyebrow;
  }
}

export default async function StudySessionPage({ params }: PageProps) {
  const { locale, sessionId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const session = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);
  const copy = getDictionary(locale);
  const view = await getStudySessionView(session.user.id, sessionId, locale);

  if (!view) {
    notFound();
  }

  if (view.status === StudySessionStatus.COMPLETED) {
    redirect(`/${locale}/study`);
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium"
  });
  const questionCounter = copy.studySession.questionCounter
    .replace("{current}", String(view.questionSet.current))
    .replace("{total}", String(view.questionSet.total));

  return (
    <main className="study-page-shell">
      <div className="container">
        <header className="study-topbar">
          <Link href={`/${locale}/study`} className="back-link">
            {copy.studySession.backLink}
          </Link>
          <div className="topbar-actions">
            <span className="session-pill">{view.domain.title}</span>
            <SignOutButton callbackUrl={`/${locale}`} label={copy.auth.signOutAction} />
          </div>
        </header>

        <section className="section-space session-layout">
          <StudyStepProgress
            label={copy.studySession.stepLabel}
            currentStepLabel={getStepLabel(copy, view.currentStepKey)}
            stepIndex={view.stepIndex}
            stepCount={view.stepCount}
            progressPercent={view.checkpointProgressPercent}
          />

          {view.status === StudySessionStatus.PAUSED ? (
            <ClayCard tone="matcha" size="lg">
              <p className="eyebrow">{copy.studySession.pausedEyebrow}</p>
              <h1 className="card-title">{copy.studySession.pausedTitle}</h1>
              <p className="card-body">{copy.studySession.pausedBody}</p>
              <div className="detail-list">
                <div>
                  <span>{copy.studySession.domainLabel}</span>
                  <strong>{view.domain.title}</strong>
                </div>
                <div>
                  <span>{copy.studySession.objectiveLabel}</span>
                  <strong>{view.checkpoint.objective}</strong>
                </div>
                <div>
                  <span>{copy.studyHub.lastStepLabel}</span>
                  <strong>{getStepLabel(copy, view.currentStepKey)}</strong>
                </div>
              </div>
              <form action={resumeStudySessionAction} className="inline-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sessionId" value={view.id} />
                <button type="submit" className="button-link button-link--primary">
                  {copy.studySession.resumeAction}
                </button>
              </form>
            </ClayCard>
          ) : null}

          {view.status === StudySessionStatus.ACTIVE && view.currentStepKey === StudyStepKey.MISSION ? (
            <ClayCard size="lg" className="session-card">
              <p className="eyebrow">{copy.studySession.missionEyebrow}</p>
              <h1 className="card-title">{view.checkpoint.title}</h1>
              <p className="card-body">{view.checkpoint.objective}</p>
              <ul className="study-list">
                {copy.studySession.missionSupport.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="detail-list">
                <div>
                  <span>{copy.studySession.domainLabel}</span>
                  <strong>{view.domain.title}</strong>
                </div>
                <div>
                  <span>{copy.studySession.lessonLabel}</span>
                  <strong>{view.lesson.title}</strong>
                </div>
              </div>
              <form action={advanceStudySessionAction} className="inline-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sessionId" value={view.id} />
                <button type="submit" className="button-link button-link--primary">
                  {copy.studySession.missionAction}
                </button>
              </form>
            </ClayCard>
          ) : null}

          {view.status === StudySessionStatus.ACTIVE && view.currentStepKey === StudyStepKey.LEARN ? (
            <ClayCard size="lg" className="session-card">
              <p className="eyebrow">{copy.studySession.learnEyebrow}</p>
              <h1 className="card-title">{view.lesson.title}</h1>
              <p className="card-body">{view.lesson.summary}</p>
              <StudyCardDeck
                blocks={view.blocks}
                sessionId={view.id}
                locale={locale}
                domainTitle={view.domain.title}
                lessonTitle={view.lesson.title}
                advanceAction={advanceStudySessionAction}
                pauseAction={pauseStudySessionAction}
                copy={{
                  cardCounter: copy.studySession.cardCounter,
                  prevCard: copy.studySession.prevCard,
                  nextCard: copy.studySession.nextCard,
                   allCardsRead: copy.studySession.allCardsRead,
                   tryQuestionAction: copy.studySession.tryQuestionAction,
                   movieCueLabel: copy.studySession.movieCueLabel,
                   pauseAction: copy.studySession.pauseAction,
                   listenCardAction: copy.studySession.listenCardAction,
                   stopCardAudioAction: copy.studySession.stopCardAudioAction,
                   audioUnavailableLabel: copy.studySession.audioUnavailableLabel,
                   aiExplain: {
                     action: copy.studySession.aiExplainAction,
                     close: copy.studySession.aiExplainClose,
                     loading: copy.studySession.aiExplainLoading,
                     error: copy.studySession.aiExplainError,
                     questions: copy.studySession.aiQuestions,
                   }
                 }}
               />
            </ClayCard>
          ) : null}

          {view.status === StudySessionStatus.ACTIVE && view.currentStepKey === StudyStepKey.QUESTION ? (
            <ClayCard size="lg" className="session-card">
              <p className="eyebrow">{copy.studySession.questionEyebrow}</p>
              <h1 className="card-title">{view.checkpoint.title}</h1>
              <p className="support-note">{questionCounter}</p>
              <p className="card-body">{view.exercise.prompt}</p>
              {view.exercise.supportText ? <p className="support-note">{view.exercise.supportText}</p> : null}

              <form className="choice-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sessionId" value={view.id} />
                <input type="hidden" name="exerciseId" value={view.exercise.id} />
                <div className="choice-stack">
                  {view.exercise.options.map((option) => (
                    <label key={option.id} className="choice-option">
                      <input
                        className="choice-radio"
                        type="radio"
                        name="optionId"
                        value={option.id}
                        defaultChecked={view.selectedOptionId === option.id}
                        required
                      />
                      <span className="choice-option__body">
                        <strong>{option.key}</strong>
                        <span>{option.text}</span>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="button-row">
                  <button type="submit" formAction={submitStudyAnswerAction} className="button-link button-link--primary">
                    {copy.studySession.questionAction}
                  </button>
                  <button
                    type="submit"
                    formAction={pauseStudySessionAction}
                    formNoValidate
                    className="button-link button-link--ghost"
                  >
                    {copy.studySession.pauseAction}
                  </button>
                </div>
              </form>
            </ClayCard>
          ) : null}

          {view.status === StudySessionStatus.ACTIVE &&
          view.currentStepKey === StudyStepKey.REVIEW &&
          view.reviewState ? (
            <ClayCard size="lg" className="session-card">
              <p className="eyebrow">{copy.studySession.reviewEyebrow}</p>
              <p className="support-note">{questionCounter}</p>
              <div className={view.reviewState.isCorrect ? "review-banner review-banner--correct" : "review-banner"}>
                <strong>
                  {view.reviewState.isCorrect ? copy.studySession.correctLabel : copy.studySession.incorrectLabel}
                </strong>
                <span>{view.exercise.prompt}</span>
              </div>

              <div className="detail-list">
                <div>
                  <span>{copy.studySession.chosenAnswerLabel}</span>
                  <strong>
                    {view.exercise.options.find((option) => option.id === view.reviewState?.chosenOptionId)?.text}
                  </strong>
                </div>
                <div>
                  <span>{copy.studySession.correctAnswerLabel}</span>
                  <strong>
                    {view.exercise.options.find((option) => option.id === view.reviewState?.correctOptionId)?.text}
                  </strong>
                </div>
              </div>

              <div className="review-grid">
                <div className="lesson-block lesson-block--accent">
                  <span className="card-label">{copy.studySession.rationaleLabel}</span>
                  <p className="lesson-copy">{view.reviewState.correctRationale}</p>
                </div>
                <div className="lesson-block">
                  <span className="card-label">{copy.studySession.misconceptionLabel}</span>
                  <p className="lesson-copy">
                    {view.reviewState.misconception?.learnerFeedback ??
                      view.reviewState.chosenOptionFeedback ??
                      view.exercise.remediationNote}
                  </p>
                </div>
              </div>

              <div className="detail-list">
                <div>
                  <span>{copy.studySession.memoryCueLabel}</span>
                  <strong>{view.exercise.remediationNote}</strong>
                </div>
                {view.nextReviewAt ? (
                  <div>
                    <span>{copy.studySession.nextReviewLabel}</span>
                    <strong>{formatter.format(view.nextReviewAt)}</strong>
                  </div>
                ) : null}
              </div>

              <form action={completeStudySessionAction} className="inline-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="sessionId" value={view.id} />
                 <button type="submit" className="button-link button-link--primary">
                   {view.questionSet.hasMore ? copy.studySession.nextQuestionAction : copy.studySession.reviewAction}
                 </button>
              </form>
            </ClayCard>
          ) : null}
        </section>
      </div>
    </main>
  );
}
