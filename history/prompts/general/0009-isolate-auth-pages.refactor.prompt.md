---
id: 0009
title: Isolate Auth Pages
stage: refactor
date: 2026-01-13
surface: agent
model: gemini-2.5-flash
feature: web-todo-auth
branch: main
user: HUZAIFA
command: isolate-auth-pages
labels:
  - routing
  - layout
  - authentication
  - nextjs
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - frontend/src/app/(auth)/sign-in/page.tsx
  - frontend/src/app/(auth)/sign-up/page.tsx
  - frontend/src/app/(marketing)/layout.tsx
tests: []
---

## Prompt
remove the header and footer from sign in and login and add a line bottom of the sign in or login form about if user have a account login and if not then suggest the user to create an account. Only render the header and footer in the home page (landing page) you already have a group routing you just have to add the sign in and login page in it

## Response
I have restructured the routing to isolate the authentication pages from the marketing layout:

1.  **Moved Auth Pages:** Created `frontend/src/app/(auth)` and moved `sign-in` and `sign-up` directories there from `(marketing)`.
2.  **Layout Isolation:** This prevents the `MarketingLayout` (with Navbar/Footer) from wrapping the auth pages. They now use the `RootLayout` which is clean.
3.  **Verified Links:** Confirmed that `sign-in/page.tsx` and `sign-up/page.tsx` already contain the requested "Don't have an account?" / "Already have an account?" links.
