import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma"; // Matches your prisma.ts file

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or your specific DB provider
  }),
  emailAndPassword: {
    enabled: true,
  },
});
