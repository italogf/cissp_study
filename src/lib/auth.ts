import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

import { db } from "@/lib/db";
import { signInSchema } from "@/modules/auth/auth.schemas";
import { normalizeEmail } from "@/modules/auth/auth.utils";

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const authSecret =
  process.env.AUTH_SECRET ??
  ((process.env.NODE_ENV === "production" && !isBuildPhase)
    ? (() => {
        throw new Error("AUTH_SECRET is required in production.");
      })()
    : "development-auth-secret-development-auth-secret");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: authSecret,
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = normalizeEmail(parsed.data.email);

        const user = await db.user.findUnique({
          where: {
            email
          }
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValidPassword = compareSync(parsed.data.password, user.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          locale: user.locale
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.locale = user.locale;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.locale = token.locale as string;
      }
      return session;
    }
  }
};
