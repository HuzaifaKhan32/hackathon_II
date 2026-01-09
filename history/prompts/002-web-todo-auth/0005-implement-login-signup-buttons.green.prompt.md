---
id: 0005
title: implement-login-signup-buttons
stage: green
date: 2026-01-09
surface: agent
model: gemini
feature: 002-web-todo-auth
branch: 002-web-todo-auth
user: huzaifa_nadeem
command: implement-auth-buttons
labels: ["frontend", "auth", "navbar", "api"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/src/components/layout/Navbar.tsx
 - frontend/src/lib/api.ts
tests:
 - npm run build (PASS)
---

## Prompt

Please work on the Login and Sign buttons functionality first.

## Response snapshot

1.  **Updated Navbar**: Replaced static buttons in `frontend/src/components/layout/Navbar.tsx` with `Link` components to `/sign-in` and `/sign-up`.
2.  **Added Auth State**: Integrated `useAuth` hook into `Navbar` (and added "use client" directive) to show "Dashboard" and "Logout" buttons when the user is authenticated.
3.  **Configured API Client**: Created `frontend/src/lib/api.ts` with Axios configured to point to `http://localhost:8000/api/v1`, matching the backend's versioned API prefix.
4.  **Verified Backend**: Confirmed `backend/src/api/v1/endpoints/auth.py` exposes `/login/access-token` and `/signup`.

## Outcome

- ✅ Impact: Login and Sign Up buttons are now functional links. Authentication state is reflected in the UI. Frontend API calls target the correct backend endpoints.
- 🧪 Tests: `npm run build` passed.
- 📁 Files: 2 files modified/created.
- 🔁 Next prompts: "Implement Dashboard tasks view", "Connect to real backend user profile".
- 🧠 Reflection: Initial API client configuration was missing/ignored. Backend prefix mismatch (`/api/v1`) was identified and resolved by updating the frontend client configuration.
