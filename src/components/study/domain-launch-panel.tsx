"use client";

import { useState } from "react";

import { ClayCard } from "@/components/ui/clay-card";

type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

type DomainLaunchCopy = {
  eyebrow: string;
  title: string;
  domainLabel: string;
  lessonLabel: string;
  objectiveLabel: string;
  estimatedTimeLabel: string;
  keyAreasEyebrow: string;
  keyAreasTitle: string;
  keyAreasBody: string;
  keyAreaLabel: string;
  currentLabel: string;
  selectedLabel: string;
  startAction: string;
  resumeAction: string;
  startSupport: string;
  completedLabel: string;
  inProgressLabel: string;
  readyLabel: string;
};

type DomainLaunchDomain = {
  slug: string;
  sequenceIndex: number;
  title: string;
  summary: string;
  objective: string;
  estimatedMinutes: number;
};

type DomainLaunchKeyArea = {
  sequenceIndex: number;
  lesson: {
    title: string;
    shortTitle: string;
    summary: string;
    objective: string;
  };
  checkpoint: {
    id: string;
    title: string;
    summary: string;
    objective: string;
  };
  progressStatus: ProgressStatus;
  isSelected: boolean;
  isCurrentSession: boolean;
  sessionId: string | null;
};

type Props = {
  locale: string;
  domain: DomainLaunchDomain;
  keyAreas: DomainLaunchKeyArea[];
  copy: DomainLaunchCopy;
  startSessionAction: (formData: FormData) => Promise<void>;
  resumeSessionAction: (formData: FormData) => Promise<void>;
};

type KeyAreaGroup = {
  startIndex: number;
  endIndex: number;
  items: DomainLaunchKeyArea[];
};

function getProgressLabel(status: ProgressStatus, copy: DomainLaunchCopy) {
  switch (status) {
    case "COMPLETED":
      return copy.completedLabel;
    case "IN_PROGRESS":
      return copy.inProgressLabel;
    default:
      return copy.readyLabel;
  }
}

function buildKeyAreaGroups(keyAreas: DomainLaunchKeyArea[]): KeyAreaGroup[] {
  const groupSize = keyAreas.length > 8 ? 4 : 3;
  const groups: KeyAreaGroup[] = [];

  for (let index = 0; index < keyAreas.length; index += groupSize) {
    const items = keyAreas.slice(index, index + groupSize);

    if (items.length === 0) {
      continue;
    }

    groups.push({
      startIndex: items[0].sequenceIndex,
      endIndex: items[items.length - 1].sequenceIndex,
      items
    });
  }

  return groups;
}

function getGroupEntryPoint(group: KeyAreaGroup) {
  return (
    group.items.find((keyArea) => keyArea.isCurrentSession) ??
    group.items.find((keyArea) => keyArea.progressStatus === "IN_PROGRESS") ??
    group.items.find((keyArea) => keyArea.progressStatus !== "COMPLETED") ??
    group.items[0]
  );
}

function getGroupLabel(group: KeyAreaGroup, copy: DomainLaunchCopy) {
  return group.startIndex === group.endIndex
    ? `${copy.keyAreaLabel} ${group.startIndex}`
    : `${copy.keyAreaLabel} ${group.startIndex}-${group.endIndex}`;
}

export function DomainLaunchPanel({
  locale,
  domain,
  keyAreas,
  copy,
  startSessionAction,
  resumeSessionAction
}: Props) {
  const initialCheckpointId =
    keyAreas.find((keyArea) => keyArea.isCurrentSession)?.checkpoint.id ??
    keyAreas.find((keyArea) => keyArea.isSelected)?.checkpoint.id ??
    keyAreas[0]?.checkpoint.id ??
    "";
  const [selectedCheckpointId, setSelectedCheckpointId] = useState(initialCheckpointId);
  const selectedArea =
    keyAreas.find((keyArea) => keyArea.checkpoint.id === selectedCheckpointId) ?? keyAreas[0] ?? null;
  const completedCount = keyAreas.filter((keyArea) => keyArea.progressStatus === "COMPLETED").length;
  const inProgressCount = keyAreas.filter((keyArea) => keyArea.progressStatus === "IN_PROGRESS").length;
  const currentArea = keyAreas.find((keyArea) => keyArea.isCurrentSession) ?? null;
  const progressPercent = keyAreas.length === 0 ? 0 : Math.round((completedCount / keyAreas.length) * 100);
  const keyAreaGroups = buildKeyAreaGroups(keyAreas);
  const shouldCollapseFullMap = keyAreas.length > 8;

  if (!selectedArea) {
    return null;
  }

  const selectedProgressLabel = getProgressLabel(selectedArea.progressStatus, copy);
  const selectedGroup =
    keyAreaGroups.find((group) =>
      group.items.some((keyArea) => keyArea.checkpoint.id === selectedArea.checkpoint.id)
    ) ?? keyAreaGroups[0] ?? null;

  if (!selectedGroup) {
    return null;
  }

  const focusGroupSections = (
    <div className="focus-group-sections">
      {keyAreaGroups.map((group) => {
        const groupCompletedCount = group.items.filter(
          (keyArea) => keyArea.progressStatus === "COMPLETED"
        ).length;

        return (
          <section key={`${group.startIndex}-${group.endIndex}`} className="focus-group-section">
            <div className="focus-group-section__header">
              <span className="session-pill">{getGroupLabel(group, copy)}</span>
              <span className="support-note">
                {groupCompletedCount}/{group.items.length}
              </span>
            </div>

            <div className="key-area-grid">
              {group.items.map((keyArea) => {
                const isSelected = keyArea.checkpoint.id === selectedArea.checkpoint.id;
                const progressLabel = getProgressLabel(keyArea.progressStatus, copy);
                const stateLabel = keyArea.isCurrentSession
                  ? copy.currentLabel
                  : isSelected
                    ? copy.selectedLabel
                    : progressLabel;

                return (
                  <ClayCard
                    key={keyArea.checkpoint.id}
                    className={[
                      "key-area-card",
                      isSelected ? "key-area-card--selected" : "",
                      keyArea.isCurrentSession ? "key-area-card--current" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <button
                      type="button"
                      className="key-area-card__button"
                      onClick={() => {
                        setSelectedCheckpointId(keyArea.checkpoint.id);
                      }}
                      aria-pressed={isSelected}
                    >
                      <div className="key-area-card__meta">
                        <span className="domain-index">
                          {copy.keyAreaLabel} {keyArea.sequenceIndex}
                        </span>
                        <span className="session-pill">{stateLabel}</span>
                      </div>
                      <h3 className="mini-title">{keyArea.lesson.title}</h3>
                      <p className="card-body">{keyArea.lesson.summary}</p>
                      <p className="support-note">{keyArea.checkpoint.objective}</p>

                      <div className="domain-card__footer">
                        <span className="session-pill">{progressLabel}</span>
                      </div>
                    </button>
                  </ClayCard>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );

  return (
    <>
      <section className="section-space study-home-grid">
        <ClayCard size="lg">
          <p className="eyebrow">{copy.eyebrow}</p>
          <div className="key-area-card__meta">
            <span className="session-pill">
              {copy.domainLabel} {domain.sequenceIndex} · {selectedProgressLabel}
            </span>
            <span className="session-pill">{domain.estimatedMinutes} min</span>
          </div>
          <h1 className="card-title">{domain.title}</h1>
          <p className="card-body">{domain.summary}</p>
          <p className="support-note">{domain.objective}</p>

          <div className="launch-progress" aria-label={copy.keyAreasTitle}>
            <div className="launch-progress__summary">
              <span className="card-label">{copy.keyAreasEyebrow}</span>
              <strong>
                {completedCount}/{keyAreas.length}
              </strong>
            </div>
            <div className="progress-track" aria-hidden="true">
              <span className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="launch-progress__meta">
              <span className="session-pill">
                {copy.completedLabel}: {completedCount}
              </span>
              {inProgressCount > 0 ? (
                <span className="session-pill">
                  {copy.inProgressLabel}: {inProgressCount}
                </span>
              ) : null}
              {currentArea ? (
                <span className="session-pill">
                  {copy.currentLabel}: {currentArea.sequenceIndex}
                </span>
              ) : null}
            </div>
          </div>

          <div className="detail-list">
            <div>
              <span>{copy.lessonLabel}</span>
              <strong>{selectedArea.lesson.title}</strong>
            </div>
            <div>
              <span>{copy.objectiveLabel}</span>
              <strong>{selectedArea.checkpoint.objective}</strong>
            </div>
            <div>
              <span>{copy.estimatedTimeLabel}</span>
              <strong>{domain.estimatedMinutes} min</strong>
            </div>
          </div>
        </ClayCard>

        <ClayCard tone="dashed" size="lg">
          <p className="eyebrow">{copy.title}</p>
          <h2 className="mini-title">{selectedArea.checkpoint.title}</h2>
          <p className="card-body">{selectedArea.lesson.summary}</p>
          <p className="support-note">{selectedArea.checkpoint.objective}</p>

          <div className="launch-strip">
            <div className="launch-strip__copy">
              <span className="card-label">{copy.keyAreasEyebrow}</span>
              <p className="support-note">{copy.keyAreasBody}</p>
            </div>

            <div className="focus-group-panel">
              <div className="focus-group-list" aria-label={copy.keyAreasTitle}>
                {keyAreaGroups.map((group) => {
                  const entryPoint = getGroupEntryPoint(group);
                  const isSelectedGroup = group.items.some(
                    (keyArea) => keyArea.checkpoint.id === selectedArea.checkpoint.id
                  );
                  const isCurrentGroup = group.items.some((keyArea) => keyArea.isCurrentSession);
                  const groupCompletedCount = group.items.filter(
                    (keyArea) => keyArea.progressStatus === "COMPLETED"
                  ).length;

                  return (
                    <button
                      key={`${group.startIndex}-${group.endIndex}`}
                      type="button"
                      className={[
                        "focus-group-chip",
                        isSelectedGroup ? "focus-group-chip--selected" : "",
                        isCurrentGroup ? "focus-group-chip--current" : ""
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        setSelectedCheckpointId(entryPoint.checkpoint.id);
                      }}
                      aria-pressed={isSelectedGroup}
                    >
                      <span className="key-area-nav__eyebrow">{copy.keyAreaLabel}</span>
                      <span className="focus-group-chip__title">
                        {group.startIndex}
                        {group.startIndex === group.endIndex ? "" : `-${group.endIndex}`}
                      </span>
                      <span className="focus-group-chip__status">
                        {isCurrentGroup ? copy.currentLabel : `${groupCompletedCount}/${group.items.length}`}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="focus-group-nav">
                <div className="focus-group-nav__header">
                  <span className="session-pill">{getGroupLabel(selectedGroup, copy)}</span>
                  <span className="support-note">
                    {selectedGroup.items.filter((keyArea) => keyArea.progressStatus === "COMPLETED").length}/
                    {selectedGroup.items.length}
                  </span>
                </div>

                <div className="key-area-nav" aria-label={copy.keyAreasTitle}>
                  {selectedGroup.items.map((keyArea) => {
                    const isSelected = keyArea.checkpoint.id === selectedArea.checkpoint.id;
                    const label = keyArea.isCurrentSession
                      ? copy.currentLabel
                      : getProgressLabel(keyArea.progressStatus, copy);

                    return (
                      <button
                        key={keyArea.checkpoint.id}
                        type="button"
                        className={[
                          "key-area-nav__button",
                          isSelected ? "key-area-nav__button--selected" : "",
                          keyArea.isCurrentSession ? "key-area-nav__button--current" : ""
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => {
                          setSelectedCheckpointId(keyArea.checkpoint.id);
                        }}
                        aria-pressed={isSelected}
                      >
                        <span className="key-area-nav__eyebrow">
                          {copy.keyAreaLabel} {keyArea.sequenceIndex}
                        </span>
                        <span className="key-area-nav__title">{keyArea.lesson.shortTitle}</span>
                        <span className="key-area-nav__status">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {selectedArea.sessionId ? (
            <form action={resumeSessionAction} className="inline-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="sessionId" value={selectedArea.sessionId} />
              <button type="submit" className="button-link button-link--primary">
                {copy.resumeAction}
              </button>
            </form>
          ) : (
            <form action={startSessionAction} className="inline-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="domainSlug" value={domain.slug} />
              <input type="hidden" name="checkpointId" value={selectedArea.checkpoint.id} />
              <button type="submit" className="button-link button-link--primary">
                {copy.startAction}
              </button>
            </form>
          )}

          <p className="support-note">{copy.startSupport}</p>
        </ClayCard>
      </section>

      <section className="section-space">
        {shouldCollapseFullMap ? (
          <details className="focus-group-toggle">
            <summary className="focus-group-toggle__summary">
              <div className="focus-group-toggle__title">
                <p className="eyebrow">{copy.keyAreasEyebrow}</p>
                <h2 className="focus-group-toggle__heading">{copy.keyAreasTitle}</h2>
              </div>
              <span className="session-pill">
                {completedCount}/{keyAreas.length}
              </span>
            </summary>

            <div className="focus-group-toggle__content">
              <p className="section-copy">{copy.keyAreasBody}</p>
              {focusGroupSections}
            </div>
          </details>
        ) : (
          <>
            <div className="section-heading">
              <div>
                <p className="eyebrow">{copy.keyAreasEyebrow}</p>
                <h2 className="section-title">{copy.keyAreasTitle}</h2>
              </div>
              <p className="section-copy">{copy.keyAreasBody}</p>
            </div>

            {focusGroupSections}
          </>
        )}
      </section>
    </>
  );
}