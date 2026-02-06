import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    "https://innovarehp.com",
    "https://www.innovarehp.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});
