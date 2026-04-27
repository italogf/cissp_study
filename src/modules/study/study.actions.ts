"use server";

import { redirect } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { requireUserSession } from "@/lib/auth-helpers";
import {
  advanceStudySessionStep,
  completeStudySession,
  pauseStudySession,
  resumeStudySession,
  startStudySession,
  submitStudyAnswer
} from "@/modules/study/study.service";

function readLocale(formData: FormData) {
  const localeValue = formData.get("locale");

  if (typeof localeValue !== "string" || !isLocale(localeValue)) {
    throw new Error("Invalid locale.");
  }

  return localeValue;
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing form value "${key}".`);
  }

  return value;
}

export async function startStudySessionAction(formData: FormData) {
  const locale = readLocale(formData);
  const domainSlug = readString(formData, "domainSlug");
  const checkpointIdValue = formData.get("checkpointId");
  const checkpointId = typeof checkpointIdValue === "string" && checkpointIdValue.length > 0 ? checkpointIdValue : undefined;
  const userSession = await requireUserSession(locale, `/${locale}/study/domain/${domainSlug}`);
  const session = await startStudySession(userSession.user.id, locale, domainSlug, checkpointId);

  redirect(`/${locale}/study/session/${session.id}`);
}

export async function resumeStudySessionAction(formData: FormData) {
  const locale = readLocale(formData);
  const sessionId = readString(formData, "sessionId");
  const userSession = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);

  await resumeStudySession(userSession.user.id, sessionId);

  redirect(`/${locale}/study/session/${sessionId}`);
}

export async function advanceStudySessionAction(formData: FormData) {
  const locale = readLocale(formData);
  const sessionId = readString(formData, "sessionId");
  const userSession = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);

  await advanceStudySessionStep(userSession.user.id, sessionId);

  redirect(`/${locale}/study/session/${sessionId}`);
}

export async function submitStudyAnswerAction(formData: FormData) {
  const locale = readLocale(formData);
  const sessionId = readString(formData, "sessionId");
  const exerciseId = readString(formData, "exerciseId");
  const optionId = readString(formData, "optionId");
  const userSession = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);

  await submitStudyAnswer(userSession.user.id, sessionId, exerciseId, optionId);

  redirect(`/${locale}/study/session/${sessionId}`);
}

export async function pauseStudySessionAction(formData: FormData) {
  const locale = readLocale(formData);
  const sessionId = readString(formData, "sessionId");
  const selectedOptionIdValue = formData.get("optionId");
  const selectedOptionId = typeof selectedOptionIdValue === "string" ? selectedOptionIdValue : undefined;
  const userSession = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);

  await pauseStudySession(userSession.user.id, sessionId, selectedOptionId);

  redirect(`/${locale}/study`);
}

export async function completeStudySessionAction(formData: FormData) {
  const locale = readLocale(formData);
  const sessionId = readString(formData, "sessionId");
  const userSession = await requireUserSession(locale, `/${locale}/study/session/${sessionId}`);

  const session = await completeStudySession(userSession.user.id, sessionId);

  redirect(session.status === "COMPLETED" ? `/${locale}/study` : `/${locale}/study/session/${session.id}`);
}
