import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

console.log("Loading /api/auth/[...all] route handler");

export const { POST, GET } = toNextJsHandler(auth);
