---
id: "001"
title: "Fix 401 Unauthorized in Chat Panel"
stage: "refactor"
date: "2026-01-13"
surface: "agent"
model: "gemini-2.5-flash"
feature: "002-web-todo-auth"
branch: "main"
user: "HUZAIFA"
command: "fix-401-error"
labels: ["auth", "bugfix", "frontend", "nextjs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/lib/api.ts"
  - "frontend/src/app/(dashboard)/layout.tsx"
tests:
  - "Manual verification of auth flow"
  - "npm run lint"
---

# Prompt

## Error Type
Console AxiosError

## Error Message
Request failed with status code 401

    at async sendChatMessage (src/lib/chat.ts:16:20)
    at async handleSend (src/components/dashboard/ChatPanel.tsx:53:24)

## Code Frame
  14 |
  15 | export const sendChatMessage = async (message: string, conversationId?: string): Promise<ChatResponse> => {
> 16 |   const response = await api.post<ChatResponse>('/chat/message', {
     |                    ^
  17 |     message,
  18 |     conversation_id: conversationId,
  19 |   });

Next.js version: 16.1.1 (Turbopack)

# Response

The user encountered a 401 Unauthorized error when attempting to send a chat message. This was caused by the lack of proper route protection and error handling for invalid/expired tokens.

I identified two key issues:
1. The `/dashboard` route was accessible without authentication, allowing users to invoke API calls without a valid token.
2. The API client (`api.ts`) did not handle 401 responses gracefully, leaving the user on the page with a failing request.

To resolve this, I implemented the following changes:

1.  **Protected the Dashboard Route:**
    - Modified `frontend/src/app/(dashboard)/layout.tsx` to check for authentication status.
    - Added a `useEffect` hook to redirect unauthenticated users to `/sign-in`.
    - Prevented rendering of the dashboard content until authentication is confirmed.

2.  **Global 401 Error Handling:**
    - Updated `frontend/src/lib/api.ts` to include an Axios response interceptor.
    - The interceptor catches 401 errors, clears the invalid token from `localStorage`, and redirects the user to `/sign-in`.

These changes ensure that users must be logged in to access the dashboard and chat features, and that any session expiration is handled by redirecting the user to re-authenticate.
