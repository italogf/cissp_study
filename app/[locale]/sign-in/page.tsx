import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { SignInForm } from "@/components/auth/sign-in-form";
import { ClayCard } from "@/components/ui/clay-card";
import { getUserSession } from "@/lib/auth-helpers";
import { ButtonLink } from "@/components/ui/button-link";
import { getDictionary } from "@/i18n/dictionaries";
import { getSafeCallbackUrl } from "@/modules/auth/auth.utils";
import { isLocale } from "@/i18n/config";

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

export default async function SignInPage({ params, searchParams }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const query = await searchParams;
  const callbackUrl = getSafeCallbackUrl(locale, readSearchParam(query.callbackUrl));
  const registered = readSearchParam(query.registered) === "1";
  const session = await getUserSession();

  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  const copy = getDictionary(locale);

  return (
    <main className="study-page-shell">
      <div className="container">
        <section className="auth-grid section-space">
          <ClayCard size="lg">
            <p className="eyebrow">{copy.auth.signInEyebrow}</p>
            <h1 className="card-title">{copy.auth.signInTitle}</h1>
            <p className="card-body">{copy.auth.signInBody}</p>
            {registered ? <p className="auth-banner auth-banner--success">{copy.auth.registeredNotice}</p> : null}
            <SignInForm
              callbackUrl={callbackUrl}
              emailLabel={copy.auth.emailLabel}
              passwordLabel={copy.auth.passwordLabel}
              submitLabel={copy.auth.signInAction}
              invalidCredentialsLabel={copy.auth.errors.invalid_credentials}
            />
          </ClayCard>

          <div className="auth-side-stack">
            <ClayCard tone="dashed">
              <span className="card-label">{copy.auth.noAccount}</span>
              <h2 className="mini-title">{copy.auth.createAccount}</h2>
              <p className="card-body">{copy.auth.signUpBody}</p>
              <ButtonLink href={`/${locale}/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`} variant="secondary">
                {copy.auth.signUpAction}
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
