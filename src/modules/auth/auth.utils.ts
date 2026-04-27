import type { Locale } from "@/i18n/config";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getSafeCallbackUrl(locale: Locale, callbackUrl?: string | null) {
  if (!callbackUrl || !callbackUrl.startsWith("/")) {
    return `/${locale}/study`;
  }

  return callbackUrl;
}
