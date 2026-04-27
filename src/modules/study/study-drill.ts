const MIN_DIFFICULTY = 1;
const MAX_DIFFICULTY = 3;

export const DEFAULT_ADAPTIVE_QUESTION_COUNT = 10;
const DEFAULT_START_DIFFICULTY = 2;

export type DrillExerciseCandidate = {
  id: string;
  orderIndex: number;
  difficulty: number | null;
};

export type AdaptiveDrillState = {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  askedExerciseIds: string[];
  activeExerciseId: string;
  currentDifficulty: number;
  pendingExerciseId: string | null;
};

export function normalizeExerciseDifficulty(value: number | null | undefined) {
  const rounded = typeof value === "number" ? Math.round(value) : DEFAULT_START_DIFFICULTY;

  return Math.min(MAX_DIFFICULTY, Math.max(MIN_DIFFICULTY, rounded));
}

export function getNextAdaptiveDifficulty(currentDifficulty: number, isCorrect: boolean) {
  const delta = isCorrect ? 1 : -1;

  return normalizeExerciseDifficulty(currentDifficulty + delta);
}

function getLastAskedIndex(exerciseId: string, askedExerciseIds: string[]) {
  return askedExerciseIds.lastIndexOf(exerciseId);
}

export function pickAdaptiveExercise(
  candidates: DrillExerciseCandidate[],
  askedExerciseIds: string[],
  targetDifficulty: number
) {
  if (candidates.length === 0) {
    return null;
  }

  const seenIds = new Set(askedExerciseIds);
  const unseenCandidates = candidates.filter((candidate) => !seenIds.has(candidate.id));
  const pool = unseenCandidates.length > 0 ? unseenCandidates : candidates;
  const normalizedTarget = normalizeExerciseDifficulty(targetDifficulty);

  return [...pool].sort((left, right) => {
    const leftDistance = Math.abs(normalizeExerciseDifficulty(left.difficulty) - normalizedTarget);
    const rightDistance = Math.abs(normalizeExerciseDifficulty(right.difficulty) - normalizedTarget);

    if (leftDistance !== rightDistance) {
      return leftDistance - rightDistance;
    }

    if (unseenCandidates.length === 0) {
      const leftLastAsked = getLastAskedIndex(left.id, askedExerciseIds);
      const rightLastAsked = getLastAskedIndex(right.id, askedExerciseIds);

      if (leftLastAsked !== rightLastAsked) {
        return leftLastAsked - rightLastAsked;
      }
    }

    return left.orderIndex - right.orderIndex;
  })[0];
}

export function createAdaptiveDrill(
  candidates: DrillExerciseCandidate[],
  totalQuestions = DEFAULT_ADAPTIVE_QUESTION_COUNT
) {
  const firstExercise = pickAdaptiveExercise(candidates, [], DEFAULT_START_DIFFICULTY);

  if (!firstExercise) {
    return null;
  }

  return {
    totalQuestions,
    answeredCount: 0,
    correctCount: 0,
    askedExerciseIds: [],
    activeExerciseId: firstExercise.id,
    currentDifficulty: normalizeExerciseDifficulty(firstExercise.difficulty),
    pendingExerciseId: null
  } satisfies AdaptiveDrillState;
}

export function applyAdaptiveDrillAnswer(
  state: AdaptiveDrillState,
  candidates: DrillExerciseCandidate[],
  isCorrect: boolean
) {
  const askedExerciseIds = [...state.askedExerciseIds, state.activeExerciseId];
  const answeredCount = Math.min(state.totalQuestions, state.answeredCount + 1);
  const nextDifficulty = getNextAdaptiveDifficulty(state.currentDifficulty, isCorrect);

  if (answeredCount >= state.totalQuestions) {
    return {
      ...state,
      answeredCount,
      correctCount: state.correctCount + (isCorrect ? 1 : 0),
      askedExerciseIds,
      currentDifficulty: nextDifficulty,
      pendingExerciseId: null
    } satisfies AdaptiveDrillState;
  }

  const nextExercise = pickAdaptiveExercise(candidates, askedExerciseIds, nextDifficulty);

  return {
    ...state,
    answeredCount,
    correctCount: state.correctCount + (isCorrect ? 1 : 0),
    askedExerciseIds,
    currentDifficulty: nextDifficulty,
    pendingExerciseId: nextExercise?.id ?? state.activeExerciseId
  } satisfies AdaptiveDrillState;
}

export function advanceAdaptiveDrill(state: AdaptiveDrillState) {
  if (!state.pendingExerciseId) {
    return state;
  }

  return {
    ...state,
    activeExerciseId: state.pendingExerciseId,
    pendingExerciseId: null
  } satisfies AdaptiveDrillState;
}

export function hasAdaptiveQuestionsRemaining(state: AdaptiveDrillState) {
  return state.answeredCount < state.totalQuestions;
}