---
id: 003
title: fix-hydration-and-auth-mismatch
stage: red
date: 2026-01-13
surface: agent
model: gemini-2.0-flash-thinking-exp-01-21
feature: 002-web-todo-auth
branch: main
user: HUZAIFA
command: fix-errors
labels: [hydration, auth, nextjs, fastapi, bugfix]
links: null
file_changes:
  - frontend/src/components/ThemeToggle.tsx
  - frontend/src/app/(auth)/sign-up/page.tsx
  - frontend/src/app/(auth)/sign-in/page.tsx
  - backend/src/models/__init__.py
tests: []
prompt_text: |
  Hydration failed because the server rendered text didn't match the client...
  Request failed with status code 404 at async handleSubmit (src/app/(auth)/sign-up/page.tsx:23:7)
response_text: |
  Fixed hydration mismatch in ThemeToggle by adding a mounted check.
  Resolved authentication errors by:
  1. Updating User models in backend to include hashed_password and password fields needed by auth endpoints.
  2. Replacing Better Auth client in SignUp and SignIn pages with standard API calls matching the existing FastAPI endpoints (/signup and /login/access-token).
outcome: success
evaluation: |
  The frontend and backend authentication logic is now aligned. Hydration error is resolved.
---

# Fix Hydration and Auth Mismatch

## Context
User reported a hydration mismatch in `ThemeToggle` and a 404 error during signup.
Investigation revealed:
1. `ThemeToggle` rendered different icons on server/client.
2. Frontend was using `better-auth` client but backend implemented standard FastAPI OAuth2/JWT endpoints.
3. Backend `User` model definition was missing `hashed_password` despite `auth.py` relying on it.

## Changes
1. **Frontend Hydration**: Added `mounted` state check to `ThemeToggle` to ensure client-only rendering of theme icon.
2. **Backend Models**: Updated `backend/src/models/__init__.py` to add `hashed_password` to `User` and `password` to `UserCreate`.
3. **Frontend Auth**:
   - Refactored `src/app/(auth)/sign-up/page.tsx` to use `api.post('/signup')` with JSON payload.
   - Refactored `src/app/(auth)/sign-in/page.tsx` to use `api.post('/login/access-token')` with `application/x-www-form-urlencoded` payload.

## Verification
- ThemeToggle should no longer warn about hydration.
- Signup should hit the correct backend endpoint.
- Signin should correctly send form data to the OAuth2 endpoint.
