import type { NodeProgressStatus, StudyStepKey } from "@prisma/client";

const stepOrder: StudyStepKey[] = ["MISSION", "LEARN", "QUESTION", "REVIEW"];

export function getStepIndex(stepKey: StudyStepKey) {
  return stepOrder.indexOf(stepKey) + 1;
}

export function getStepCount() {
  return stepOrder.length;
}

export function getCheckpointProgress(stepKey: StudyStepKey) {
  const stepIndex = getStepIndex(stepKey);

  return Math.max(0, Math.round(((stepIndex - 1) / stepOrder.length) * 100));
}

export function getMasteryDelta(isCorrect: boolean) {
  return isCorrect ? 0.35 : -0.1;
}

export function clampMasteryScore(score: number) {
  return Math.min(1, Math.max(0, score));
}

export function getNextReviewAt(isCorrect: boolean) {
  const nextReviewAt = new Date();
  const offsetDays = isCorrect ? 7 : 1;

  nextReviewAt.setDate(nextReviewAt.getDate() + offsetDays);

  return nextReviewAt;
}

export function getProgressStatus(stepKey: StudyStepKey, isComplete: boolean): NodeProgressStatus {
  if (isComplete) {
    return "COMPLETED";
  }

  if (stepKey === "MISSION") {
    return "NOT_STARTED";
  }

  return "IN_PROGRESS";
}
