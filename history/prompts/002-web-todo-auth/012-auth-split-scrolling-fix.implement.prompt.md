---
id: 012
title: auth-split-scrolling-fix
stage: implement
date: 2026-01-13
surface: agent
model: gemini-2.0-flash-exp
feature: 002-web-todo-auth
branch: main
user: HUZAIFA
command: fix scrolling UI
labels: ["auth", "frontend", "layout", "scrolling", "split-screen"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/app/(auth)/sign-in/page.tsx
 - frontend/src/app/(auth)/sign-up/page.tsx
tests:
 - npm run lint
---

## Prompt

the UI problem is not fixed

## Response snapshot

I have updated the layout of the Sign In and Sign Up pages to use a robust split-screen scrolling strategy.

1.  **Main Container:** Reverted to `h-screen w-full overflow-hidden flex`. This creates a fixed viewport container.
2.  **Left Panel (Visuals):** Set to `h-full overflow-hidden` (with `hidden lg:flex`). This keeps the decorative background fixed and non-scrollable on large screens.
3.  **Right Panel (Form):** Set to `h-full overflow-y-auto`. This allows the form side to scroll independently if the content (like the form or error messages) exceeds the viewport height.

This ensures that the "Split Screen" look is preserved, the background visuals don't get messed up by page scrolling, and the user can always access the full form even on smaller screens or when error messages appear.

## Outcome

- ✅ Impact: Fixed the "only part rendering" issue by ensuring the form container has its own scrollbar when needed, while keeping the layout stable.
- 🧪 Tests: Ran `npm run lint` successfully.
- 📁 Files: Modified 2 files.
- 🔁 Next prompts: None immediate.
- 🧠 Reflection: The previous `min-h-screen` approach on the parent might have conflicted with flex layout expectations or the user's specific viewport constraints. Isolating the scroll to the content panel is the standard pattern for this type of layout.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
