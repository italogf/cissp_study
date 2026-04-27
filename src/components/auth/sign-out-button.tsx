"use client";

import { signOut } from "next-auth/react";
import { useTransition } from "react";

type SignOutButtonProps = {
  callbackUrl: string;
  label: string;
};

export function SignOutButton({ callbackUrl, label }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="button-link button-link--ghost"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await signOut({
            callbackUrl
          });
        });
      }}
    >
      {label}
    </button>
  );
}
