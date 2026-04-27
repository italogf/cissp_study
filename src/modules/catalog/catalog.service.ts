import { CurriculumNodeKind, NodeProgressStatus, StudySessionStatus } from "@prisma/client";

import type { Locale } from "@/i18n/config";
import { db } from "@/lib/db";
import { pickLocaleRecord } from "@/lib/localized";
import {
  getDomainCheckpointProgression,
  getNextLaunchableProgressionItem
} from "@/modules/catalog/domain-progression";

export const activeProgramSlug = "cissp";

type DomainMetadata = {
  launchLessonCode: string;
  launchCheckpointCode: string;
};

function readDomainMetadata(metadata: unknown): DomainMetadata {
  if (!metadata || typeof metadata !== "object") {
    throw new Error("Missing domain launch metadata.");
  }

  const data = metadata as Partial<DomainMetadata>;

  if (!data.launchLessonCode || !data.launchCheckpointCode) {
    throw new Error("Domain launch metadata is incomplete.");
  }

  return {
    launchLessonCode: data.launchLessonCode,
    launchCheckpointCode: data.launchCheckpointCode
  };
}

export async function getActiveProgramVersion() {
  const programVersion = await db.programVersion.findFirst({
    where: {
      isActive: true,
      trainingProgram: {
        slug: activeProgramSlug,
        isActive: true
      }
    },
    include: {
      translations: true,
      trainingProgram: true
    }
  });

  if (!programVersion) {
    throw new Error("Missing active CISSP program version.");
  }

  return programVersion;
}

export async function getStudyHubData(userId: string, locale: Locale) {
  const programVersion = await getActiveProgramVersion();

  const [domains, resumableSession, progressRecords] = await Promise.all([
    db.curriculumNode.findMany({
      where: {
        programVersionId: programVersion.id,
        kind: CurriculumNodeKind.DOMAIN,
        isPublished: true
      },
      orderBy: {
        orderIndex: "asc"
      },
      include: {
        translations: true
      }
    }),
    db.studySession.findFirst({
      where: {
        userId,
        programVersionId: programVersion.id,
        status: {
          in: [StudySessionStatus.ACTIVE, StudySessionStatus.PAUSED]
        }
      },
      orderBy: {
        lastActivityAt: "desc"
      },
      include: {
        domainNode: {
          include: {
            translations: true
          }
        },
        checkpointNode: {
          include: {
            translations: true
          }
        }
      }
    }),
    db.nodeProgress.findMany({
      where: {
        userId,
        node: {
          programVersionId: programVersion.id,
          kind: CurriculumNodeKind.DOMAIN
        }
      }
    })
  ]);

  const progressByNodeId = new Map(progressRecords.map((record) => [record.nodeId, record]));

  return {
    program: pickLocaleRecord(programVersion.translations, locale),
    domains: domains.map((domain) => {
      const translation = pickLocaleRecord(domain.translations, locale);
      const progress = progressByNodeId.get(domain.id);
      const metadata = readDomainMetadata(domain.metadata);

      return {
        id: domain.id,
        slug: domain.slug,
        sequenceIndex: domain.orderIndex,
        title: translation.title,
        shortTitle: translation.shortTitle ?? translation.title,
        summary: translation.summary ?? "",
        estimatedMinutes: domain.estimatedMinutes ?? 18,
        launchLessonCode: metadata.launchLessonCode,
        launchCheckpointCode: metadata.launchCheckpointCode,
        progressStatus: progress?.status ?? NodeProgressStatus.NOT_STARTED,
        masteryScore: progress?.masteryScore ?? 0
      };
    }),
    resumableSession:
      resumableSession === null
        ? null
        : {
            id: resumableSession.id,
            status: resumableSession.status,
            currentStepKey: resumableSession.currentStepKey,
            lastActivityAt: resumableSession.lastActivityAt,
            domainTitle: pickLocaleRecord(resumableSession.domainNode.translations, locale).title,
            checkpointTitle: pickLocaleRecord(resumableSession.checkpointNode.translations, locale).title
          }
  };
}

export async function getDomainLaunchData(userId: string, locale: Locale, domainSlug: string) {
  const programVersion = await getActiveProgramVersion();

  const domain = await db.curriculumNode.findFirst({
    where: {
      programVersionId: programVersion.id,
      kind: CurriculumNodeKind.DOMAIN,
      slug: domainSlug,
      isPublished: true
    },
    include: {
      translations: true
    }
  });

  if (!domain) {
    return null;
  }

  const [progression, domainProgress, resumableSession] = await Promise.all([
    getDomainCheckpointProgression(programVersion.id, domain.id),
    db.nodeProgress.findUnique({
      where: {
        userId_nodeId: {
          userId,
          nodeId: domain.id
        }
      }
    }),
    db.studySession.findFirst({
      where: {
        userId,
        domainNodeId: domain.id,
        status: {
          in: [StudySessionStatus.ACTIVE, StudySessionStatus.PAUSED]
        }
      },
      orderBy: {
        lastActivityAt: "desc"
      },
      include: {
        lessonNode: {
          include: {
            translations: true
          }
        },
        checkpointNode: {
          include: {
            translations: true
          }
        }
      }
    })
  ]);

  if (progression.length === 0) {
    throw new Error(`Missing launch content for domain "${domainSlug}".`);
  }

  const checkpointProgressRecords = await db.nodeProgress.findMany({
    where: {
      userId,
      nodeId: {
        in: progression.map((item) => item.checkpoint.id)
      }
    }
  });

  const checkpointProgressByNodeId = new Map(
    checkpointProgressRecords.map((record) => [record.nodeId, { status: record.status }])
  );

  const nextLaunchable =
    resumableSession === null
      ? getNextLaunchableProgressionItem(progression, checkpointProgressByNodeId)
      : null;

  const launchItem =
    resumableSession !== null
      ? progression.find((item) => item.checkpoint.id === resumableSession.checkpointNodeId) ?? progression[0]
      : (nextLaunchable ?? progression[0]);

  const lessonTranslation =
    resumableSession !== null
      ? pickLocaleRecord(resumableSession.lessonNode.translations, locale)
      : pickLocaleRecord(launchItem.lesson.translations, locale);

  const checkpointTranslation =
    resumableSession !== null
      ? pickLocaleRecord(resumableSession.checkpointNode.translations, locale)
      : pickLocaleRecord(launchItem.checkpoint.translations, locale);

  return {
    domain: {
      id: domain.id,
      slug: domain.slug,
      sequenceIndex: domain.orderIndex,
      estimatedMinutes: domain.estimatedMinutes ?? 18,
      title: pickLocaleRecord(domain.translations, locale).title,
      shortTitle: pickLocaleRecord(domain.translations, locale).shortTitle,
      summary: pickLocaleRecord(domain.translations, locale).summary,
      objective: pickLocaleRecord(domain.translations, locale).objective
    },
    launchCheckpointId: launchItem.checkpoint.id,
    lesson: lessonTranslation,
    checkpoint: checkpointTranslation,
    keyAreas: progression.map((item) => {
      const lesson = pickLocaleRecord(item.lesson.translations, locale);
      const checkpoint = pickLocaleRecord(item.checkpoint.translations, locale);
      const progress = checkpointProgressByNodeId.get(item.checkpoint.id);

      return {
        sequenceIndex: item.sequenceIndex,
        lesson: {
          id: item.lesson.id,
          title: lesson.title,
          shortTitle: lesson.shortTitle ?? lesson.title,
          summary: lesson.summary ?? "",
          objective: lesson.objective ?? checkpoint.objective ?? ""
        },
        checkpoint: {
          id: item.checkpoint.id,
          title: checkpoint.title,
          summary: checkpoint.summary ?? lesson.summary ?? "",
          objective: checkpoint.objective ?? lesson.objective ?? ""
        },
        progressStatus: progress?.status ?? NodeProgressStatus.NOT_STARTED,
        isSelected: item.checkpoint.id === launchItem.checkpoint.id,
        isCurrentSession: item.checkpoint.id === resumableSession?.checkpointNodeId,
        sessionId: item.checkpoint.id === resumableSession?.checkpointNodeId ? resumableSession.id : null
      };
    }),
    progressStatus: domainProgress?.status ?? NodeProgressStatus.NOT_STARTED,
    resumableSessionId: resumableSession?.id ?? null
  };
}

export { readDomainMetadata };
