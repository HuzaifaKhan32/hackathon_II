import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

console.log("Initializing Better Auth with pool:", !!pool);

export const auth = betterAuth({
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    twoFactor({
      issuer: "Todo App",
    }),
  ],
});
