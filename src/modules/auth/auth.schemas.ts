import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8)
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(2).max(60),
  locale: z.string().min(2),
  callbackUrl: z.string().optional()
});
