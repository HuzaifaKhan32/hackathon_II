---
id: 0001
title: Spec for Web Todo Auth
stage: spec
date: 2026-01-07
surface: agent
model: gemini-cli-agent
feature: 002-web-todo-auth
branch: 002-web-todo-auth
user: user
command: /sp.specify
labels: ["spec", "feature-creation"]
links:
  spec: specs/002-web-todo-auth/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-web-todo-auth/spec.md
  - specs/002-web-todo-auth/checklists/requirements.md
tests:
  - null
---

## Prompt

Phase II: Full-Stack Web Todo Application with Authentication Project Context: Phase II of Evolution of Todo hackathon. Transforms the Phase I console app into a modern multi-user web application with persistent storage and authentication. Must maintain all Phase I functionality while adding web interface and database. Target Audience: - Hackathon judges evaluating full-stack architecture - Multiple users who need isolated todo lists - Developers learning web app spec-driven development Intent: Build a full-stack web application where authenticated users can manage their personal todo lists through a browser interface. Backend stores data in PostgreSQL, frontend uses Next.js, authentication via Better Auth with JWT tokens. Core Features (All Basic Level from Phase I + Web/Auth): 1. User Authentication - Signup/signin with Better Auth, JWT tokens 2. User Isolation - Each user sees only their own tasks 3. Web Interface - Modern responsive UI with Tailwind CSS 4. Persistent Storage - Tasks stored in Neon PostgreSQL database 5. All Phase I features - Add, View, Update, Delete, Mark Complete (now via web) Success Criteria (SMART): - User can signup with email/password and receive JWT token - User can signin and access their personal task dashboard - JWT token required on all API requests (401 if missing/invalid) - Each user sees ONLY their own tasks (user isolation enforced) - All 5 Basic Level features work via web interface - Frontend deployed to Vercel (public URL provided) - Backend deployed to Railway/Render (API accessible) - API returns proper HTTP status codes (200, 201, 400, 401, 404, 500) - Database schema includes users and tasks tables with foreign keys - All API endpoints follow RESTful conventions - Tests covering authentication, user isolation, CRUD operations - 80%+ coverage on backend business logic - All code generated via Gemini CLI (prompt history documented) Technical Stack (from Constitution): Frontend: - Framework: Next.js 16+ (App Router) - Language: TypeScript (strict mode) - Styling: Tailwind CSS (utility-first, no custom CSS) - State: React hooks (useState, useEffect, useContext) - API Client: Centralized in /lib/api.ts Backend: - Framework: Python FastAPI - ORM: SQLModel (type-safe queries) - Database: Neon Serverless PostgreSQL (free tier) - Auth: Better Auth (frontend) + JWT verification (backend) Authentication Flow: - Better Auth on frontend issues JWT tokens on login - Frontend attaches JWT to every API request (Authorization: Bearer <token>) - FastAPI middleware verifies JWT signature - Backend extracts user_id from JWT claims - All database queries filtered by authenticated user_id API Endpoints (RESTful): GET /api/{user_id}/tasks - List all user's tasks POST /api/{user_id}/tasks - Create new task (returns 201) GET /api/{user_id}/tasks/{id} - Get single task details PUT /api/{user_id}/tasks/{id} - Update task (returns 200) DELETE /api/{user_id}/tasks/{id} - Delete task (returns 204) PATCH /api/{user_id}/tasks/{id}/complete - Toggle completion (returns 200) Database Schema (Neon PostgreSQL): Table: users (managed by Better Auth) - id: UUID (primary key) - email: string (unique, not null) - password_hash: string (not null) - created_at: timestamp (default now) Table: tasks - id: serial (primary key) - user_id: UUID (foreign key -> users.id, ON DELETE CASCADE) - title: string (1-200 chars, not null) - description: text (max 1000 chars, nullable) - completed: boolean (default false) - created_at: timestamp (default now) - updated_at: timestamp (auto-update) Indexes: - tasks.user_id (for user isolation queries) - tasks.completed (for status filtering) Quality Standards (from Constitution): - TypeScript strict mode enforced - Python type hints on all functions - Zero linting errors (ESLint, Ruff) - 80%+ test coverage on backend - No localStorage/sessionStorage (use database only) - Responsive design (mobile-first with Tailwind breakpoints) - Proper error handling (try/catch, HTTPException) User Scenarios: 1. New user visits app → clicks signup → enters email/password → redirected to dashboard 2. Existing user visits app → clicks signin → enters credentials → sees their task list 3. Authenticated user adds task → task appears immediately → stored in database 4. User refreshes page → still logged in (JWT persists) → tasks still visible 5. User tries to access another user's task via URL → receives 401 Unauthorized 6. User's JWT expires after 7 days → forced to re-login Edge Cases to Handle: - Signup with existing email (409 Conflict) - Signin with wrong password (401 Unauthorized) - API request without JWT token (401 Unauthorized) - API request with expired JWT (401 Unauthorized) - API request with valid JWT but wrong user_id in URL (403 Forbidden) - Task ID doesn't exist (404 Not Found) - Task belongs to different user (403 Forbidden) - Database connection failure (500 Internal Server Error) - Network timeout during API call (show loading state, retry option) UI: - Get the UI from the design folder - design folder have the landing_page hero section and the feature section - The dashboard section, The Chatpanel, The dashboard, the sign up and the login page - First, search the folder, and exactly place the name and path of the folders the folder names I have told you are for a reference - You will see 2 folders for a specific UI check which has 1 and 2 at the end of the folder name - 1 is for dark theme and 2 is for light theme - Implement the dark theme and light theme toggle buttom - These UI folders has code.html file which you have to convert into next js code. also has the screen.png match with that also Not Building (Non-Goals): - AI chatbot features (Phase III) - Kubernetes deployment (Phase IV) - Event-driven architecture with Kafka (Phase V) - Advanced features: priorities, tags, search, recurring tasks (Phase V) - Password reset flow (future enhancement) - Email verification (future enhancement) - Social login (OAuth) (future enhancement) Acceptance Criteria Checklist: [ ] User can signup and receive JWT token [ ] User can signin and access dashboard [ ] All API endpoints require valid JWT [ ] User isolation enforced (users can't access others' tasks) [ ] All 5 Basic Level features work via web interface [ ] Frontend deployed to Vercel (URL provided) [ ] Backend deployed to Railway/Render (API URL provided) [ ] Database migrations created and applied [ ] Tests passing (backend: pytest, frontend: Jest) [ ] README includes deployment URLs and setup instructions [ ] Prompt history documented in specs/history/phase-2-prompts.md Timeline: Complete by: December 14, 2025 (Phase II deadline) Estimated Effort: 8-12 hours (refactor, frontend, auth, database, deployment) Deliverables: 1. Monorepo GitHub repository: - /frontend (Next.js) - /backend (FastAPI) - /specs (constitution, Phase II spec, prompt history) - GEMINI.md (root and per-service) - README.md (setup + deployment URLs) 2. Deployed frontend (Vercel URL) 3. Deployed backend (Railway/Render API URL) 4. Demo video (max 90 seconds showing signup, task CRUD, user isolation) Definition of Done: - All acceptance criteria checked - Both services deployed and accessible - All tests passing - Database schema documented - API endpoints follow RESTful conventions - JWT authentication working - User isolation verified (tested with 2+ users) - Committed to GitHub - Demo video recorded

## Response snapshot

Created feature branch `002-web-todo-auth` and defined specification in `specs/002-web-todo-auth/spec.md`. Validated requirements against checklist, ensuring no implementation details leaked into the spec while preserving all user value and functional requirements. Created `specs/002-web-todo-auth/checklists/requirements.md` and marked all items as passed.

## Outcome

- ✅ Impact: Created specification for Phase II Web Todo App
- 🧪 Tests: N/A
- 📁 Files: Created spec and checklist
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Spec creation was straightforward. User input was detailed.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): standard
- Next experiment (smallest change to try): None