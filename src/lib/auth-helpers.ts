import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import type { Locale } from "@/i18n/config";
import { getSafeCallbackUrl } from "@/modules/auth/auth.utils";

export async function getUserSession() {
  return getServerSession(authOptions);
}

export async function requireUserSession(locale: Locale, callbackPath: string) {
  const session = await getUserSession();

  if (!session?.user?.id) {
    redirect(`/${locale}/sign-in?callbackUrl=${encodeURIComponent(getSafeCallbackUrl(locale, callbackPath))}`);
  }

  return session;
}
