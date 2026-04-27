"use server";

import { hashSync } from "bcryptjs";
import { redirect } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { isLocale } from "@/i18n/config";
import { db } from "@/lib/db";
import { signUpSchema } from "@/modules/auth/auth.schemas";
import { getSafeCallbackUrl, normalizeEmail } from "@/modules/auth/auth.utils";

export async function registerUserAction(formData: FormData) {
  const localeValue = formData.get("locale");
  const locale = typeof localeValue === "string" && isLocale(localeValue) ? localeValue : null;

  if (!locale) {
    redirect("/pt-BR/sign-up?error=invalid_locale");
  }

  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    locale,
    callbackUrl: typeof formData.get("callbackUrl") === "string" ? formData.get("callbackUrl") : undefined
  });

  if (!parsed.success) {
    redirect(`/${locale}/sign-up?error=invalid_input`);
  }

  const email = normalizeEmail(parsed.data.email);
  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    redirect(`/${locale}/sign-up?error=email_in_use`);
  }

  await db.user.create({
    data: {
      name: parsed.data.name,
      email,
      locale,
      passwordHash: hashSync(parsed.data.password, 10)
    }
  });

  const callbackUrl = getSafeCallbackUrl(locale as Locale, parsed.data.callbackUrl);

  redirect(`/${locale}/sign-in?registered=1&callbackUrl=${encodeURIComponent(callbackUrl)}`);
}
