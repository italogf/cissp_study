import { describe, expect, it } from "vitest";

import {
  applyAdaptiveDrillAnswer,
  createAdaptiveDrill,
  pickAdaptiveExercise,
  type DrillExerciseCandidate
} from "./study-drill";

const candidates: DrillExerciseCandidate[] = [
  { id: "easy-1", orderIndex: 1, difficulty: 1 },
  { id: "medium-1", orderIndex: 2, difficulty: 2 },
  { id: "hard-1", orderIndex: 3, difficulty: 3 }
];

describe("study-drill", () => {
  it("starts on a medium question when one is available", () => {
    const drill = createAdaptiveDrill(candidates);

    expect(drill).not.toBeNull();
    expect(drill?.activeExerciseId).toBe("medium-1");
    expect(drill?.totalQuestions).toBe(10);
  });

  it("moves to a harder question after a correct answer", () => {
    const drill = createAdaptiveDrill(candidates);

    if (!drill) {
      throw new Error("Expected drill state.");
    }

    const updated = applyAdaptiveDrillAnswer(drill, candidates, true);

    expect(updated.currentDifficulty).toBe(3);
    expect(updated.pendingExerciseId).toBe("hard-1");
    expect(updated.correctCount).toBe(1);
    expect(updated.answeredCount).toBe(1);
  });

  it("moves to an easier question after an incorrect answer", () => {
    const drill = createAdaptiveDrill(candidates);

    if (!drill) {
      throw new Error("Expected drill state.");
    }

    const updated = applyAdaptiveDrillAnswer(drill, candidates, false);

    expect(updated.currentDifficulty).toBe(1);
    expect(updated.pendingExerciseId).toBe("easy-1");
    expect(updated.correctCount).toBe(0);
    expect(updated.answeredCount).toBe(1);
  });

  it("keeps targeting the closest difficulty when the pool runs out", () => {
    const pick = pickAdaptiveExercise(
      candidates,
      ["medium-1", "hard-1", "easy-1", "medium-1", "hard-1"],
      3
    );

    expect(pick?.id).toBe("hard-1");
  });
});