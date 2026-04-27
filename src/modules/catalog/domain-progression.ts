import { CurriculumNodeKind, NodeProgressStatus, StudyStepKey } from "@prisma/client"

import { db } from "@/lib/db"
import { getStepCount, getStepIndex } from "@/modules/study/study-progress"

type ProgressionNodeTranslation = {
  title: string
  shortTitle: string | null
  summary: string | null
  objective: string | null
  locale: string
}

type ProgressionNode = {
  id: string
  code: string
  slug: string
  orderIndex: number
  translations: ProgressionNodeTranslation[]
}

export type DomainCheckpointProgressionItem = {
  sequenceIndex: number
  lesson: ProgressionNode
  checkpoint: ProgressionNode
}

export async function getDomainCheckpointProgression(programVersionId: string, domainNodeId: string) {
  const domain = await db.curriculumNode.findFirst({
    where: {
      id: domainNodeId,
      programVersionId,
      kind: CurriculumNodeKind.DOMAIN,
      isPublished: true
    },
    include: {
      children: {
        where: {
          kind: CurriculumNodeKind.MODULE,
          isPublished: true
        },
        orderBy: {
          orderIndex: "asc"
        },
        include: {
          children: {
            where: {
              kind: CurriculumNodeKind.LESSON,
              isPublished: true
            },
            orderBy: {
              orderIndex: "asc"
            },
            include: {
              translations: true,
              children: {
                where: {
                  kind: CurriculumNodeKind.CHECKPOINT,
                  isPublished: true
                },
                orderBy: {
                  orderIndex: "asc"
                },
                include: {
                  translations: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!domain) {
    throw new Error("Domain progression is unavailable.")
  }

  const progression = domain.children.flatMap((moduleNode) =>
    moduleNode.children.flatMap((lessonNode) =>
      lessonNode.children.map((checkpointNode, indexWithinLesson) => ({
        sequenceIndex: 0,
        lesson: {
          id: lessonNode.id,
          code: lessonNode.code,
          slug: lessonNode.slug,
          orderIndex: lessonNode.orderIndex,
          translations: lessonNode.translations
        },
        checkpoint: {
          id: checkpointNode.id,
          code: checkpointNode.code,
          slug: checkpointNode.slug,
          orderIndex: checkpointNode.orderIndex + indexWithinLesson,
          translations: checkpointNode.translations
        }
      }))
    )
  )

  return progression.map((item, index) => ({
    ...item,
    sequenceIndex: index + 1
  }))
}

export function findProgressionItemByCheckpointId(
  progression: DomainCheckpointProgressionItem[],
  checkpointNodeId: string
) {
  return progression.find((item) => item.checkpoint.id === checkpointNodeId) ?? null
}

export function getNextLaunchableProgressionItem(
  progression: DomainCheckpointProgressionItem[],
  checkpointProgressByNodeId: Map<string, { status: NodeProgressStatus }>
) {
  return (
    progression.find((item) => checkpointProgressByNodeId.get(item.checkpoint.id)?.status !== NodeProgressStatus.COMPLETED) ??
    progression[progression.length - 1] ??
    null
  )
}

export function getSessionProgressPercent(
  sequenceIndex: number,
  totalCheckpoints: number,
  stepKey: StudyStepKey
) {
  if (totalCheckpoints <= 0) {
    return 0
  }

  const completedCheckpoints = Math.max(0, sequenceIndex - 1)
  const intraCheckpointFraction = (getStepIndex(stepKey) - 1) / getStepCount()

  return Math.max(0, Math.min(100, Math.round(((completedCheckpoints + intraCheckpointFraction) / totalCheckpoints) * 100)))
}
