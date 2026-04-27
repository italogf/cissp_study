"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type SignInFormProps = {
  callbackUrl: string;
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  invalidCredentialsLabel: string;
};

export function SignInForm({
  callbackUrl,
  emailLabel,
  passwordLabel,
  submitLabel,
  invalidCredentialsLabel
}: SignInFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="auth-form"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email !== "string" || typeof password !== "string") {
          setErrorMessage(invalidCredentialsLabel);
          return;
        }

        setErrorMessage(null);

        startTransition(async () => {
          const result = await signIn("credentials", {
            email,
            password,
            callbackUrl,
            redirect: false
          });

          if (!result || result.error) {
            setErrorMessage(invalidCredentialsLabel);
            return;
          }

          router.push(result.url ?? callbackUrl);
          router.refresh();
        });
      }}
    >
      <div className="field-stack">
        <label className="field-label" htmlFor="email">
          {emailLabel}
        </label>
        <input id="email" name="email" type="email" className="text-input" autoComplete="email" required />
      </div>

      <div className="field-stack">
        <label className="field-label" htmlFor="password">
          {passwordLabel}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="text-input"
          autoComplete="current-password"
          minLength={8}
          required
        />
      </div>

      {errorMessage ? (
        <p className="auth-banner" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button type="submit" className="button-link button-link--primary" disabled={isPending}>
        {submitLabel}
      </button>
    </form>
  );
}
