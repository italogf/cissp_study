import { describe, expect, it } from "vitest";

import {
  clampMasteryScore,
  getCheckpointProgress,
  getNextReviewAt,
  getProgressStatus,
  getStepCount,
  getStepIndex
} from "./study-progress";

describe("study-progress", () => {
  it("keeps the checkpoint step sequence stable", () => {
    expect(getStepCount()).toBe(4);
    expect(getStepIndex("MISSION")).toBe(1);
    expect(getStepIndex("LEARN")).toBe(2);
    expect(getStepIndex("QUESTION")).toBe(3);
    expect(getStepIndex("REVIEW")).toBe(4);
  });

  it("maps steps to visible checkpoint progress", () => {
    expect(getCheckpointProgress("MISSION")).toBe(0);
    expect(getCheckpointProgress("LEARN")).toBe(25);
    expect(getCheckpointProgress("QUESTION")).toBe(50);
    expect(getCheckpointProgress("REVIEW")).toBe(75);
  });

  it("clamps mastery score into a safe range", () => {
    expect(clampMasteryScore(-0.5)).toBe(0);
    expect(clampMasteryScore(0.6)).toBe(0.6);
    expect(clampMasteryScore(1.4)).toBe(1);
  });

  it("marks completion explicitly and keeps earlier steps in progress", () => {
    expect(getProgressStatus("MISSION", false)).toBe("NOT_STARTED");
    expect(getProgressStatus("QUESTION", false)).toBe("IN_PROGRESS");
    expect(getProgressStatus("REVIEW", true)).toBe("COMPLETED");
  });

  it("schedules faster review for incorrect answers", () => {
    const incorrectReview = getNextReviewAt(false);
    const correctReview = getNextReviewAt(true);
    const differenceInDays =
      (correctReview.getTime() - incorrectReview.getTime()) / (1000 * 60 * 60 * 24);

    expect(differenceInDays).toBeGreaterThanOrEqual(5);
  });
});
