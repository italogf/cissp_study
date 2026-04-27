import { PrismaClient } from "@prisma/client";

declare global {
  var __cisspPrisma: PrismaClient | undefined;
}

export const db =
  global.__cisspPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  global.__cisspPrisma = db;
}
