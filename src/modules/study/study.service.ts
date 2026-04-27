import {
  CurriculumNodeKind,
  NodeProgressStatus,
  StudySessionStatus,
  StudyStepKey,
  type Prisma
} from "@prisma/client";

import type { Locale } from "@/i18n/config";
import { db } from "@/lib/db";
import { pickLocaleRecord } from "@/lib/localized";
import { getActiveProgramVersion } from "@/modules/catalog/catalog.service";
import {
  findProgressionItemByCheckpointId,
  getDomainCheckpointProgression,
  getSessionProgressPercent
} from "@/modules/catalog/domain-progression";
import {
  clampMasteryScore,
  getCheckpointProgress,
  getMasteryDelta,
  getNextReviewAt,
  getProgressStatus,
  getStepCount,
  getStepIndex
} from "@/modules/study/study-progress";
import {
  advanceAdaptiveDrill,
  applyAdaptiveDrillAnswer,
  createAdaptiveDrill,
  hasAdaptiveQuestionsRemaining,
  normalizeExerciseDifficulty,
  type AdaptiveDrillState,
  type DrillExerciseCandidate
} from "@/modules/study/study-drill";

type ResumePayload = {
  selectedOptionId?: string | null;
  lastAction?: string;
  drill?: AdaptiveDrillState | null;
};

const sessionInclude = {
  domainNode: {
    include: {
      translations: true
    }
  },
  lessonNode: {
    include: {
      translations: true,
      contentBlocks: {
        orderBy: {
          orderIndex: "asc"
        },
        include: {
          translations: true
        }
      }
    }
  },
  checkpointNode: {
    include: {
      translations: true,
      exercises: {
        orderBy: {
          orderIndex: "asc"
        },
        include: {
          translations: true,
          options: {
            orderBy: {
              orderIndex: "asc"
            },
            include: {
              translations: true,
              misconception: {
                include: {
                  translations: true
                }
              }
            }
          }
        }
      }
    }
  }
} satisfies Prisma.StudySessionInclude;

function getResumePayload(payload: unknown): ResumePayload {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  return payload as ResumePayload;
}

function toDrillCandidates(
  exercises: Array<{
    id: string;
    orderIndex: number;
    difficulty: number | null;
  }>
) {
  return exercises.map((exercise) => ({
    id: exercise.id,
    orderIndex: exercise.orderIndex,
    difficulty: exercise.difficulty
  })) satisfies DrillExerciseCandidate[];
}

function getAdaptiveDrillState(
  resumePayload: ResumePayload,
  exercises: Array<{
    id: string;
    orderIndex: number;
    difficulty: number | null;
  }>
) {
  return resumePayload.drill ?? createAdaptiveDrill(toDrillCandidates(exercises));
}

function rotateItems<T>(items: T[], offset: number) {
  if (items.length <= 1) {
    return items;
  }

  const normalizedOffset = ((offset % items.length) + items.length) % items.length;

  return [...items.slice(normalizedOffset), ...items.slice(0, normalizedOffset)];
}

function getExerciseRotationOffset(exerciseId: string, optionCount: number) {
  if (optionCount <= 1) {
    return 0;
  }

  return [...exerciseId].reduce((total, character) => total + character.charCodeAt(0), 0) % optionCount;
}

function getVisibleExerciseOptions<T extends { id: string; isCorrect: boolean }>(
  exerciseId: string,
  difficulty: number,
  options: T[]
) {
  const rotatedOptions = rotateItems(options, getExerciseRotationOffset(exerciseId, options.length));

  if (difficulty > 1) {
    return rotatedOptions;
  }

  const correctOption = rotatedOptions.find((option) => option.isCorrect);

  if (!correctOption) {
    return rotatedOptions;
  }

  const distractors = rotatedOptions.filter((option) => !option.isCorrect).slice(0, 2);
  const visibleOptionIds = new Set([correctOption.id, ...distractors.map((option) => option.id)]);

  return rotatedOptions.filter((option) => visibleOptionIds.has(option.id));
}

function getVisibleSupportText(
  supportText: string | null | undefined,
  remediationNote: string | null | undefined,
  difficulty: number
) {
  if (difficulty >= 3) {
    return "";
  }

  if (difficulty === 1) {
    return supportText ?? remediationNote ?? "";
  }

  return supportText ?? "";
}

function getAdaptiveCheckpointProgress(stepKey: StudyStepKey, drill: AdaptiveDrillState | null | undefined) {
  if (!drill || (stepKey !== StudyStepKey.QUESTION && stepKey !== StudyStepKey.REVIEW)) {
    return getCheckpointProgress(stepKey);
  }

  const answeredProgress = Math.round((drill.answeredCount / Math.max(1, drill.totalQuestions)) * 50);

  return Math.min(100, Math.max(getCheckpointProgress(stepKey), 50 + answeredProgress));
}

function getCurrentQuestionNumber(stepKey: StudyStepKey, drill: AdaptiveDrillState | null | undefined) {
  if (!drill) {
    return 1;
  }

  return stepKey === StudyStepKey.REVIEW
    ? Math.max(1, drill.answeredCount)
    : Math.min(drill.totalQuestions, drill.answeredCount + 1);
}

async function getOwnedSession(userId: string, sessionId: string) {
  const session = await db.studySession.findFirst({
    where: {
      id: sessionId,
      userId
    }
  });

  if (!session) {
    throw new Error("Study session not found.");
  }

  return session;
}

async function getSessionProgressionContext(
  programVersionId: string,
  domainNodeId: string,
  checkpointNodeId: string
) {
  const progression = await getDomainCheckpointProgression(programVersionId, domainNodeId)
  const currentItem = findProgressionItemByCheckpointId(progression, checkpointNodeId)

  if (!currentItem) {
    throw new Error("Study session progression is out of sync with the catalog.")
  }

  return {
    progression,
    currentItem
  }
}

export async function startStudySession(
  userId: string,
  locale: Locale,
  domainSlug: string,
  checkpointId?: string
) {
  const programVersion = await getActiveProgramVersion();

  const domain = await db.curriculumNode.findFirst({
    where: {
      programVersionId: programVersion.id,
      kind: CurriculumNodeKind.DOMAIN,
      slug: domainSlug,
      isPublished: true
    }
  });

  if (!domain) {
    throw new Error(`Unknown domain "${domainSlug}".`);
  }

  const progression = await getDomainCheckpointProgression(programVersion.id, domain.id);
  const firstItem = progression[0] ?? null;

  if (!firstItem) {
    throw new Error(`Launch content is incomplete for domain "${domainSlug}".`);
  }

  const targetItem =
    checkpointId === undefined
      ? firstItem
      : progression.find((item) => item.checkpoint.id === checkpointId) ?? null;

  if (!targetItem) {
    throw new Error(`Checkpoint "${checkpointId}" does not belong to domain "${domainSlug}".`);
  }

  const existingSession = await db.studySession.findFirst({
    where: {
      userId,
      programVersionId: programVersion.id,
      domainNodeId: domain.id,
      checkpointNodeId: targetItem.checkpoint.id,
      status: {
        in: [StudySessionStatus.ACTIVE, StudySessionStatus.PAUSED]
      }
    },
    orderBy: {
      lastActivityAt: "desc"
    }
  });

  if (existingSession) {
    return existingSession;
  }

  const createdSession = await db.$transaction(async (transaction) => {
    await transaction.enrollment.upsert({
      where: {
        userId_programVersionId: {
          userId,
          programVersionId: programVersion.id
        }
      },
      update: {
        preferredLocale: locale
      },
      create: {
        userId,
        programVersionId: programVersion.id,
        preferredLocale: locale
      }
    });

    for (const nodeId of [domain.id, targetItem.lesson.id, targetItem.checkpoint.id]) {
      await transaction.nodeProgress.upsert({
        where: {
          userId_nodeId: {
            userId,
            nodeId
          }
        },
        update: {
          status: NodeProgressStatus.IN_PROGRESS,
          lastStudiedAt: new Date()
        },
        create: {
          userId,
          nodeId,
          status: NodeProgressStatus.IN_PROGRESS,
          lastStudiedAt: new Date()
        }
      });
    }

    return transaction.studySession.create({
        data: {
          userId,
          programVersionId: programVersion.id,
          domainNodeId: domain.id,
          lessonNodeId: targetItem.lesson.id,
          checkpointNodeId: targetItem.checkpoint.id,
          locale,
          status: StudySessionStatus.ACTIVE,
          currentStepKey: StudyStepKey.MISSION,
          sessionProgressPercent: getSessionProgressPercent(
            targetItem.sequenceIndex,
            progression.length,
            StudyStepKey.MISSION
          ),
        checkpointProgressPercent: 0,
        contentVersion: programVersion.versionCode,
        resumePayload: {
          lastAction: "session_started"
        }
      }
    });
  });

  await db.studySession.updateMany({
    where: {
      userId,
      programVersionId: programVersion.id,
      id: {
        not: createdSession.id
      },
      status: StudySessionStatus.ACTIVE
    },
    data: {
      status: StudySessionStatus.PAUSED,
      pausedAt: new Date()
    }
  });

  return createdSession;
}

export async function getStudySessionView(userId: string, sessionId: string, locale: Locale) {
  const session = await db.studySession.findFirst({
    where: {
      id: sessionId,
      userId
    },
    include: sessionInclude
  });

  if (!session) {
    return null;
  }

  if (session.locale !== locale) {
    await db.studySession.update({
      where: {
        id: session.id
      },
      data: {
        locale
      }
    });
  }

  const nodeProgress = await db.nodeProgress.findUnique({
    where: {
      userId_nodeId: {
        userId,
        nodeId: session.checkpointNodeId
      }
    }
  });

  const lessonTranslation = pickLocaleRecord(session.lessonNode.translations, locale);
  const checkpointTranslation = pickLocaleRecord(session.checkpointNode.translations, locale);
  const domainTranslation = pickLocaleRecord(session.domainNode.translations, locale);
  const lessonBlocks = session.lessonNode.contentBlocks.map((block) => {
    const translation = pickLocaleRecord(block.translations, locale);

    return {
      id: block.id,
      type: block.type,
      title: translation.title ?? null,
      body: translation.body,
      movieTitle: translation.movieTitle ?? null,
      movieCue: translation.movieCue ?? null
    };
  });

  const resumePayload = getResumePayload(session.resumePayload);
  const drill = getAdaptiveDrillState(resumePayload, session.checkpointNode.exercises);
  const exercise =
    (drill?.activeExerciseId
      ? session.checkpointNode.exercises.find((candidate) => candidate.id === drill.activeExerciseId)
      : null) ?? session.checkpointNode.exercises[0];

  if (!exercise) {
    throw new Error("Checkpoint is missing an exercise.");
  }

  const exerciseTranslation = pickLocaleRecord(exercise.translations, locale);
  const exerciseDifficulty = normalizeExerciseDifficulty(exercise.difficulty);
  const options = getVisibleExerciseOptions(
    exercise.id,
    exerciseDifficulty,
    exercise.options.map((option) => {
      const translation = pickLocaleRecord(option.translations, locale);
      const misconceptionTranslation = option.misconception
        ? pickLocaleRecord(option.misconception.translations, locale)
        : null;

      return {
        id: option.id,
        key: option.optionKey,
        isCorrect: option.isCorrect,
        text: translation.text,
        optionFeedback: translation.optionFeedback ?? null,
        misconception:
          misconceptionTranslation === null
            ? null
            : {
                label: misconceptionTranslation.label,
                learnerFeedback: misconceptionTranslation.learnerFeedback
              }
      };
    })
  );

  const lastAttempt = await db.exerciseAttempt.findFirst({
    where: {
      sessionId: session.id,
      userId,
      exerciseId: exercise.id
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      selectedOption: {
        include: {
          translations: true,
          misconception: {
            include: {
              translations: true
            }
          }
        }
      }
    }
  });

  const selectedOptionId =
    resumePayload.selectedOptionId ?? lastAttempt?.selectedOptionId ?? null;
  const correctOption = options.find((option) => option.isCorrect);

  if (!correctOption) {
    throw new Error("Exercise is missing a correct option.");
  }

  const reviewState =
    lastAttempt === null
      ? null
      : {
          isCorrect: lastAttempt.isCorrect,
          chosenOptionId: lastAttempt.selectedOptionId,
          correctOptionId: correctOption.id,
          correctRationale: exerciseTranslation.correctRationale,
          chosenOptionFeedback: pickLocaleRecord(lastAttempt.selectedOption.translations, locale).optionFeedback ?? null,
          misconception:
            lastAttempt.selectedOption.misconception === null
              ? null
              : pickLocaleRecord(lastAttempt.selectedOption.misconception.translations, locale)
        };

  return {
    id: session.id,
    locale,
    status: session.status,
    currentStepKey: session.currentStepKey,
    stepIndex: getStepIndex(session.currentStepKey),
    stepCount: getStepCount(),
    checkpointProgressPercent: session.checkpointProgressPercent,
    sessionProgressPercent: session.sessionProgressPercent,
    lastActivityAt: session.lastActivityAt,
    domain: {
      title: domainTranslation.title,
      summary: domainTranslation.summary ?? ""
    },
    lesson: {
      title: lessonTranslation.title,
      summary: lessonTranslation.summary ?? "",
      objective: lessonTranslation.objective ?? ""
    },
    checkpoint: {
      title: checkpointTranslation.title,
      summary: checkpointTranslation.summary ?? "",
      objective: checkpointTranslation.objective ?? ""
    },
    blocks: lessonBlocks,
    exercise: {
      id: exercise.id,
      prompt: exerciseTranslation.prompt,
      supportText: getVisibleSupportText(
        exerciseTranslation.supportText,
        exerciseTranslation.remediationNote,
        exerciseDifficulty
      ),
      remediationNote: exerciseTranslation.remediationNote ?? "",
      options
    },
    questionSet: {
      current: getCurrentQuestionNumber(session.currentStepKey, drill),
      total: drill?.totalQuestions ?? 1,
      hasMore: drill ? hasAdaptiveQuestionsRemaining(drill) : false
    },
    selectedOptionId,
    reviewState,
    nextReviewAt: nodeProgress?.nextReviewAt ?? null
  };
}

export async function advanceStudySessionStep(userId: string, sessionId: string) {
  const session = await getOwnedSession(userId, sessionId);

  if (session.status === StudySessionStatus.COMPLETED) {
    return session;
  }

  let nextStepKey: StudyStepKey;
  const resumePayload = getResumePayload(session.resumePayload);

  switch (session.currentStepKey) {
    case StudyStepKey.MISSION:
      nextStepKey = StudyStepKey.LEARN;
      break;
    case StudyStepKey.LEARN:
      nextStepKey = StudyStepKey.QUESTION;
      break;
    default:
      throw new Error("Study session cannot advance from the current state.");
  }

  let drill = resumePayload.drill ?? null;

  if (nextStepKey === StudyStepKey.QUESTION) {
    const checkpointExercises = await db.exercise.findMany({
      where: {
        nodeId: session.checkpointNodeId
      },
      orderBy: {
        orderIndex: "asc"
      },
      select: {
        id: true,
        orderIndex: true,
        difficulty: true
      }
    });

    drill = getAdaptiveDrillState(resumePayload, checkpointExercises);
  }

  const { progression, currentItem } = await getSessionProgressionContext(
    session.programVersionId,
    session.domainNodeId,
    session.checkpointNodeId
  );

  return db.studySession.update({
    where: {
      id: session.id
    },
    data: {
      status: StudySessionStatus.ACTIVE,
      pausedAt: null,
      currentStepKey: nextStepKey,
      checkpointProgressPercent: getAdaptiveCheckpointProgress(nextStepKey, drill),
      sessionProgressPercent: getSessionProgressPercent(
        currentItem.sequenceIndex,
        progression.length,
        nextStepKey
      ),
      resumePayload: {
        ...resumePayload,
        drill,
        selectedOptionId: nextStepKey === StudyStepKey.QUESTION ? null : resumePayload.selectedOptionId ?? null,
        lastAction: `step_${nextStepKey.toLowerCase()}`
      }
    }
  });
}

export async function submitStudyAnswer(
  userId: string,
  sessionId: string,
  exerciseId: string,
  optionId: string
) {
  const session = await db.studySession.findFirst({
    where: {
      id: sessionId,
      userId
    },
    include: {
      checkpointNode: {
        include: {
          exercises: {
            include: {
              options: {
                include: {
                  misconception: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!session) {
    throw new Error("Study session not found.");
  }

  if (session.currentStepKey !== StudyStepKey.QUESTION) {
    throw new Error("Answer submission is only available during the question step.");
  }

  const resumePayload = getResumePayload(session.resumePayload);
  const drill = getAdaptiveDrillState(resumePayload, session.checkpointNode.exercises);
  const activeExerciseId = drill?.activeExerciseId ?? session.checkpointNode.exercises[0]?.id ?? null;

  if (activeExerciseId && exerciseId !== activeExerciseId) {
    throw new Error("Submitted question is out of sync with the adaptive drill.");
  }

  const exercise = session.checkpointNode.exercises.find((candidate) => candidate.id === exerciseId);

  if (!exercise) {
    throw new Error("Exercise does not belong to the current checkpoint.");
  }

  const selectedOption = exercise.options.find((option) => option.id === optionId);

  if (!selectedOption) {
    throw new Error("Selected option does not belong to this exercise.");
  }

  const isCorrect = selectedOption.isCorrect;
  const nextDrill = drill ? applyAdaptiveDrillAnswer(drill, toDrillCandidates(session.checkpointNode.exercises), isCorrect) : null;
  const { progression, currentItem } = await getSessionProgressionContext(
    session.programVersionId,
    session.domainNodeId,
    session.checkpointNodeId
  );

  await db.$transaction(async (transaction) => {
    const currentProgress = await transaction.nodeProgress.findUnique({
      where: {
        userId_nodeId: {
          userId,
          nodeId: session.checkpointNodeId
        }
      }
    });

    const nextMasteryScore = clampMasteryScore((currentProgress?.masteryScore ?? 0) + getMasteryDelta(isCorrect));

    await transaction.exerciseAttempt.create({
      data: {
        sessionId: session.id,
        userId,
        exerciseId,
        selectedOptionId: selectedOption.id,
        isCorrect,
        score: isCorrect ? 1 : 0,
        locale: session.locale,
        misconceptionCodes: selectedOption.misconception ? [selectedOption.misconception.code] : [],
        feedbackSnapshot: {
          selectedOptionId: selectedOption.id,
          isCorrect,
          adaptiveDifficulty: drill?.currentDifficulty ?? normalizeExerciseDifficulty(exercise.difficulty),
          questionNumber: drill ? drill.answeredCount + 1 : 1
        }
      }
    });

    await transaction.nodeProgress.upsert({
      where: {
        userId_nodeId: {
          userId,
          nodeId: session.checkpointNodeId
        }
      },
      update: {
        status: getProgressStatus(StudyStepKey.REVIEW, false),
        masteryScore: nextMasteryScore,
        attemptCount: (currentProgress?.attemptCount ?? 0) + 1,
        correctCount: (currentProgress?.correctCount ?? 0) + (isCorrect ? 1 : 0),
        lastStudiedAt: new Date(),
        nextReviewAt: getNextReviewAt(isCorrect),
        lastMisconceptionCode: selectedOption.misconception?.code ?? null
      },
      create: {
        userId,
        nodeId: session.checkpointNodeId,
        status: getProgressStatus(StudyStepKey.REVIEW, false),
        masteryScore: nextMasteryScore,
        attemptCount: 1,
        correctCount: isCorrect ? 1 : 0,
        lastStudiedAt: new Date(),
        nextReviewAt: getNextReviewAt(isCorrect),
        lastMisconceptionCode: selectedOption.misconception?.code ?? null
      }
    });

    await transaction.studySession.update({
      where: {
        id: session.id
      },
      data: {
        status: StudySessionStatus.ACTIVE,
        pausedAt: null,
        currentStepKey: StudyStepKey.REVIEW,
        checkpointProgressPercent: getAdaptiveCheckpointProgress(StudyStepKey.REVIEW, nextDrill),
        sessionProgressPercent: getSessionProgressPercent(
          currentItem.sequenceIndex,
          progression.length,
          StudyStepKey.REVIEW
        ),
        resumePayload: {
          ...resumePayload,
          drill: nextDrill,
          selectedOptionId: selectedOption.id,
          lastAction: "answer_checked"
        }
      }
    });
  });
}

export async function pauseStudySession(userId: string, sessionId: string, selectedOptionId?: string) {
  const session = await getOwnedSession(userId, sessionId);

  const resumePayload = getResumePayload(session.resumePayload);

  await db.studySession.update({
    where: {
      id: session.id
    },
    data: {
      status: StudySessionStatus.PAUSED,
      pausedAt: new Date(),
      resumePayload: {
        ...resumePayload,
        selectedOptionId: selectedOptionId ?? resumePayload.selectedOptionId ?? null,
        lastAction: "session_paused"
      }
    }
  });
}

export async function resumeStudySession(userId: string, sessionId: string) {
  const session = await getOwnedSession(userId, sessionId);

  return db.studySession.update({
    where: {
      id: session.id
    },
    data: {
      status: StudySessionStatus.ACTIVE,
      pausedAt: null,
      resumePayload: {
        ...getResumePayload(session.resumePayload),
        lastAction: "session_resumed"
      }
    }
  });
}

export async function completeStudySession(userId: string, sessionId: string) {
  const session = await getOwnedSession(userId, sessionId);
  const resumePayload = getResumePayload(session.resumePayload);
  const drill = resumePayload.drill ?? null;

  if (
    session.currentStepKey === StudyStepKey.REVIEW &&
    drill &&
    hasAdaptiveQuestionsRemaining(drill) &&
    drill.pendingExerciseId
  ) {
    const { progression, currentItem } = await getSessionProgressionContext(
      session.programVersionId,
      session.domainNodeId,
      session.checkpointNodeId
    );
    const nextDrill = advanceAdaptiveDrill(drill);

    return db.studySession.update({
      where: {
        id: session.id
      },
      data: {
        status: StudySessionStatus.ACTIVE,
        pausedAt: null,
        currentStepKey: StudyStepKey.QUESTION,
        checkpointProgressPercent: getAdaptiveCheckpointProgress(StudyStepKey.QUESTION, nextDrill),
        sessionProgressPercent: getSessionProgressPercent(
          currentItem.sequenceIndex,
          progression.length,
          StudyStepKey.QUESTION
        ),
        resumePayload: {
          ...resumePayload,
          drill: nextDrill,
          selectedOptionId: null,
          lastAction: "next_question_started"
        }
      }
    });
  }

  const { progression, currentItem } = await getSessionProgressionContext(
    session.programVersionId,
    session.domainNodeId,
    session.checkpointNodeId
  );
  const isFinalCheckpoint = currentItem.sequenceIndex === progression.length;
  const nextItem = progression[currentItem.sequenceIndex] ?? null;

  return db.$transaction(async (transaction) => {
    const now = new Date();

    for (const nodeId of [session.lessonNodeId, session.checkpointNodeId]) {
      const progress = await transaction.nodeProgress.findUnique({
        where: {
          userId_nodeId: {
            userId,
            nodeId
          }
        }
      });

      await transaction.nodeProgress.upsert({
        where: {
          userId_nodeId: {
            userId,
            nodeId
          }
        },
        update: {
          status: NodeProgressStatus.COMPLETED,
          masteryScore:
            nodeId === session.checkpointNodeId
              ? progress?.masteryScore ?? 0
              : clampMasteryScore(Math.max(progress?.masteryScore ?? 0, 0.7)),
          lastStudiedAt: now
        },
        create: {
          userId,
          nodeId,
          status: NodeProgressStatus.COMPLETED,
          masteryScore: nodeId === session.checkpointNodeId ? 0 : 0.7,
          lastStudiedAt: now
        }
      });
    }

    if (isFinalCheckpoint || !nextItem) {
      const domainProgress = await transaction.nodeProgress.findUnique({
        where: {
          userId_nodeId: {
            userId,
            nodeId: session.domainNodeId
          }
        }
      });

      await transaction.nodeProgress.upsert({
        where: {
          userId_nodeId: {
            userId,
            nodeId: session.domainNodeId
          }
        },
        update: {
          status: NodeProgressStatus.COMPLETED,
          masteryScore: clampMasteryScore(Math.max(domainProgress?.masteryScore ?? 0, 0.7)),
          lastStudiedAt: now
        },
        create: {
          userId,
          nodeId: session.domainNodeId,
          status: NodeProgressStatus.COMPLETED,
          masteryScore: 0.7,
          lastStudiedAt: now
        }
      });

      return transaction.studySession.update({
        where: {
          id: session.id
        },
        data: {
          status: StudySessionStatus.COMPLETED,
          completedAt: now,
          sessionProgressPercent: 100,
          checkpointProgressPercent: 100,
          resumePayload: {
            ...resumePayload,
            drill: null,
            selectedOptionId: null,
            lastAction: "session_completed"
          }
        }
      });
    }

    await transaction.nodeProgress.upsert({
      where: {
        userId_nodeId: {
          userId,
          nodeId: session.domainNodeId
        }
      },
      update: {
        status: NodeProgressStatus.IN_PROGRESS,
        lastStudiedAt: now
      },
      create: {
        userId,
        nodeId: session.domainNodeId,
        status: NodeProgressStatus.IN_PROGRESS,
        lastStudiedAt: now
      }
    });

    for (const nodeId of [nextItem.lesson.id, nextItem.checkpoint.id]) {
      await transaction.nodeProgress.upsert({
        where: {
          userId_nodeId: {
            userId,
            nodeId
          }
        },
        update: {
          status: NodeProgressStatus.IN_PROGRESS,
          lastStudiedAt: now
        },
        create: {
          userId,
          nodeId,
          status: NodeProgressStatus.IN_PROGRESS,
          lastStudiedAt: now
        }
      });
    }

    return transaction.studySession.update({
      where: {
        id: session.id
      },
      data: {
        lessonNodeId: nextItem.lesson.id,
        checkpointNodeId: nextItem.checkpoint.id,
        status: StudySessionStatus.ACTIVE,
        currentStepKey: StudyStepKey.MISSION,
        completedAt: null,
        pausedAt: null,
        checkpointProgressPercent: getCheckpointProgress(StudyStepKey.MISSION),
        sessionProgressPercent: getSessionProgressPercent(
          nextItem.sequenceIndex,
          progression.length,
          StudyStepKey.MISSION
        ),
        resumePayload: {
          lastAction: "checkpoint_completed"
        }
      }
    });
  });
}
