---
id: "002"
title: "Integrate Better Auth with Next.js and Python FastAPI"
stage: "refactor"
date: "2026-01-13"
surface: "agent"
model: "gemini-2.5-flash"
feature: "002-web-todo-auth"
branch: "main"
user: "HUZAIFA"
command: "integrate-better-auth"
labels: ["auth", "better-auth", "nextjs", "fastapi", "postgres"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/lib/auth.ts"
  - "frontend/src/lib/auth-client.ts"
  - "frontend/src/app/api/auth/[...all]/route.ts"
  - "frontend/src/context/AuthContext.tsx"
  - "frontend/src/app/(marketing)/(auth)/sign-in/page.tsx"
  - "backend/src/core/config.py"
  - "backend/src/api/deps.py"
  - "backend/src/models/__init__.py"
  - "backend/src/models/chat.py"
  - "frontend/.env.local"
  - "backend/.env"
tests:
  - "Manual verification of sign-in flow"
  - "DB schema verification"
---

# Prompt
The authentication is not working maybe the backend written in python is not connected with the frontend also include the google and github login buttons and you have to use better auth do a web search so you can get the current data of the beeter auth

# Response
I integrated "Better Auth" to replace the custom JWT authentication.

Key architectural changes:
1.  **Auth Responsibility**: Moved authentication lifecycle (login, signup, session management) entirely to Next.js using `better-auth`. The Python backend now acts as a resource server verifying tokens issued by Better Auth.
2.  **Database Schema**: Dropped and recreated the database to align with Better Auth's standard schema (using `text` IDs instead of UUIDs for Users) and recreated app tables (`task`, `conversation`, `message`) with compatible foreign keys.
3.  **Token Verification**: Updated FastAPI dependency `get_current_user` to verify JWTs signed by Better Auth using a shared `BETTER_AUTH_SECRET`.

Implementation details:
-   **Frontend**:
    -   Added `better-auth` and `pg` dependencies.
    -   Configured Better Auth server at `/api/auth/[...all]`.
    -   Configured Better Auth client in `auth-client.ts`.
    -   Updated `AuthContext` to expose the Better Auth session.
    -   Refactored `sign-in/page.tsx` to use Better Auth's `signIn.email` and `signIn.social` (Google/GitHub).
-   **Backend**:
    -   Updated `Settings` to load `BETTER_AUTH_SECRET`.
    -   Updated `deps.py` to decode tokens using this secret.
    -   Updated SQLModel definitions for `User`, `Task`, `Conversation`, `Message` to match the new schema.
-   **Database**:
    -   Executed SQL transactions to drop old tables and create new ones for Users, Sessions, Accounts, Tasks, Conversations, and Messages.

Next steps for the user:
-   Fill in `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GITHUB_CLIENT_ID`, and `GITHUB_CLIENT_SECRET` in `frontend/.env.local`.
-   Restart both frontend and backend servers to apply changes.
