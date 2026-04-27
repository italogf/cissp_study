import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { ClayCard } from "@/components/ui/clay-card";
import { getUserSession } from "@/lib/auth-helpers";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { registerUserAction } from "@/modules/auth/auth.actions";
import { getSafeCallbackUrl } from "@/modules/auth/auth.utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignUpPage({ params, searchParams }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const query = await searchParams;
  const callbackUrl = getSafeCallbackUrl(locale, readSearchParam(query.callbackUrl));
  const errorKey = readSearchParam(query.error);
  const session = await getUserSession();

  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  const copy = getDictionary(locale);
  const errorMessage = errorKey ? copy.auth.errors[errorKey as keyof typeof copy.auth.errors] ?? copy.auth.errors.generic : null;

  return (
    <main className="study-page-shell">
      <div className="container">
        <section className="auth-grid section-space">
          <ClayCard size="lg">
            <p className="eyebrow">{copy.auth.signUpEyebrow}</p>
            <h1 className="card-title">{copy.auth.signUpTitle}</h1>
            <p className="card-body">{copy.auth.signUpBody}</p>
            {errorMessage ? (
              <p className="auth-banner" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <form action={registerUserAction} className="auth-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="callbackUrl" value={callbackUrl} />

              <div className="field-stack">
                <label className="field-label" htmlFor="name">
                  {copy.auth.nameLabel}
                </label>
                <input id="name" name="name" type="text" className="text-input" autoComplete="name" minLength={2} required />
              </div>

              <div className="field-stack">
                <label className="field-label" htmlFor="email">
                  {copy.auth.emailLabel}
                </label>
                <input id="email" name="email" type="email" className="text-input" autoComplete="email" required />
              </div>

              <div className="field-stack">
                <label className="field-label" htmlFor="password">
                  {copy.auth.passwordLabel}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="text-input"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <button type="submit" className="button-link button-link--primary">
                {copy.auth.signUpAction}
              </button>
            </form>
          </ClayCard>

          <div className="auth-side-stack">
            <ClayCard tone="dashed">
              <span className="card-label">{copy.auth.hasAccount}</span>
              <h2 className="mini-title">{copy.auth.returnToSignIn}</h2>
              <p className="card-body">{copy.auth.signInBody}</p>
              <ButtonLink href={`/${locale}/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`} variant="secondary">
                {copy.auth.signInAction}
              </ButtonLink>
            </ClayCard>

            <Link href={`/${locale}`} className="back-link">
              {copy.auth.backLink}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
