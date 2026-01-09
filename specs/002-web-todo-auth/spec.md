# Feature Specification: Phase II: Web Todo Application with Authentication

**Feature Branch**: `002-web-todo-auth`  
**Created**: 2026-01-07  
**Status**: Draft  
**Input**: User description: "Phase II: Full-Stack Web Todo Application with Authentication Project Context: Phase II of Evolution of Todo hackathon. Transforms the Phase I console app into a modern multi-user web application with persistent storage and authentication. Must maintain all Phase I functionality while adding web interface and database. Target Audience: - Hackathon judges evaluating full-stack architecture - Multiple users who need isolated todo lists - Developers learning web app spec-driven development Intent: Build a full-stack web application where authenticated users can manage their personal todo lists through a browser interface. Backend stores data in PostgreSQL, frontend uses Next.js, authentication via Better Auth with JWT tokens. Core Features (All Basic Level from Phase I + Web/Auth): 1. User Authentication - Signup/signin with Better Auth, JWT tokens 2. User Isolation - Each user sees only their own tasks 3. Web Interface - Modern responsive UI with Tailwind CSS 4. Persistent Storage - Tasks stored in Neon PostgreSQL database 5. All Phase I features - Add, View, Update, Delete, Mark Complete (now via web) Success Criteria (SMART): - User can signup with email/password and receive JWT token - User can signin and access their personal task dashboard - JWT token required on all API requests (401 if missing/invalid) - Each user sees ONLY their own tasks (user isolation enforced) - All 5 Basic Level features work via web interface - Frontend deployed to Vercel (public URL provided) - Backend deployed to Railway/Render (API accessible) - API returns proper HTTP status codes (200, 201, 400, 401, 404, 500) - Database schema includes users and tasks tables with foreign keys - All API endpoints follow RESTful conventions - Tests covering authentication, user isolation, CRUD operations - 80%+ coverage on backend business logic - All code generated via Gemini CLI (prompt history documented) Technical Stack (from Constitution): Frontend: - Framework: Next.js 16+ (App Router) - Language: TypeScript (strict mode) - Styling: Tailwind CSS (utility-first, no custom CSS) - State: React hooks (useState, useEffect, useContext) - API Client: Centralized in /lib/api.ts Backend: - Framework: Python FastAPI - ORM: SQLModel (type-safe queries) - Database: Neon Serverless PostgreSQL (free tier) - Auth: Better Auth (frontend) + JWT verification (backend) Authentication Flow: - Better Auth on frontend issues JWT tokens on login - Frontend attaches JWT to every API request (Authorization: Bearer <token>) - FastAPI middleware verifies JWT signature - Backend extracts user_id from JWT claims - All database queries filtered by authenticated user_id API Endpoints (RESTful): GET /api/{user_id}/tasks - List all user's tasks POST /api/{user_id}/tasks - Create new task (returns 201) GET /api/{user_id}/tasks/{id} - Get single task details PUT /api/{user_id}/tasks/{id} - Update task (returns 200) DELETE /api/{user_id}/tasks/{id} - Delete task (returns 204) PATCH /api/{user_id}/tasks/{id}/complete - Toggle completion (returns 200) Database Schema (Neon PostgreSQL): Table: users (managed by Better Auth) - id: UUID (primary key) - email: string (unique, not null) - password_hash: string (not null) - created_at: timestamp (default now) Table: tasks - id: serial (primary key) - user_id: UUID (foreign key -> users.id, ON DELETE CASCADE) - title: string (1-200 chars, not null) - description: text (max 1000 chars, nullable) - completed: boolean (default false) - created_at: timestamp (default now) - updated_at: timestamp (auto-update) Indexes: - tasks.user_id (for user isolation queries) - tasks.completed (for status filtering) Quality Standards (from Constitution): - TypeScript strict mode enforced - Python type hints on all functions - Zero linting errors (ESLint, Ruff) - 80%+ test coverage on backend - No localStorage/sessionStorage (use database only) - Responsive design (mobile-first with Tailwind breakpoints) - Proper error handling (try/catch, HTTPException) User Scenarios: 1. New user visits app → clicks signup → enters email/password → redirected to dashboard 2. Existing user visits app → clicks signin → enters credentials → sees their task list 3. Authenticated user adds task → task appears immediately → stored in database 4. User refreshes page → still logged in (JWT persists) → tasks still visible 5. User tries to access another user's task via URL → receives 401 Unauthorized 6. User's JWT expires after 7 days → forced to re-login Edge Cases to Handle: - Signup with existing email (409 Conflict) - Signin with wrong password (401 Unauthorized) - API request without JWT token (401 Unauthorized) - API request with expired JWT (401 Unauthorized) - API request with valid JWT but wrong user_id in URL (403 Forbidden) - Task ID doesn't exist (404 Not Found) - Task belongs to different user (403 Forbidden) - Database connection failure (500 Internal Server Error) - Network timeout during API call (show loading state, retry option) UI: - Get the UI from the design folder - design folder have the landing_page hero section and the feature section - The dashboard section, The Chatpanel, The dashboard, the sign up and the login page - First, search the folder, and exactly place the name and path of the folders the folder names I have told you are for a reference - You will see 2 folders for a specific UI check which has 1 and 2 at the end of the folder name - 1 is for dark theme and 2 is for light theme - Implement the dark theme and light theme toggle buttom - These UI folders has code.html file which you have to convert into next js code. also has the screen.png match with that also Not Building (Non-Goals): - AI chatbot features (Phase III) - Kubernetes deployment (Phase IV) - Event-driven architecture with Kafka (Phase V) - Advanced features: priorities, tags, search, recurring tasks (Phase V) - Password reset flow (future enhancement) - Email verification (future enhancement) - Social login (OAuth) (future enhancement) Acceptance Criteria Checklist: [ ] User can signup and receive JWT token [ ] User can signin and access dashboard [ ] All API endpoints require valid JWT [ ] User isolation enforced (users can't access others' tasks) [ ] All 5 Basic Level features work via web interface [ ] Frontend deployed to Vercel (URL provided) [ ] Backend deployed to Railway/Render (API URL provided) [ ] Database migrations created and applied [ ] Tests passing (backend: pytest, frontend: Jest) [ ] README includes deployment URLs and setup instructions [ ] Prompt history documented in specs/history/phase-2-prompts.md Timeline: Complete by: December 14, 2025 (Phase II deadline) Estimated Effort: 8-12 hours (refactor, frontend, auth, database, deployment) Deliverables: 1. Monorepo GitHub repository: - /frontend (Next.js) - /backend (FastAPI) - /specs (constitution, Phase II spec, prompt history) - GEMINI.md (root and per-service) - README.md (setup + deployment URLs) 2. Deployed frontend (Vercel URL) 3. Deployed backend (Railway/Render API URL) 4. Demo video (max 90 seconds showing signup, task CRUD, user isolation) Definition of Done: - All acceptance criteria checked - Both services deployed and accessible - All tests passing - Database schema documented - API endpoints follow RESTful conventions - JWT authentication working - User isolation verified (tested with 2+ users) - Committed to GitHub - Demo video recorded"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Authentication (Signup & Login) (Priority: P1)

New users must be able to create an account, and existing users must be able to log in to access their personal dashboard.

**Why this priority**: Without authentication, the core requirement of user isolation and personal lists cannot be met.

**Independent Test**: Can be fully tested by attempting to register a new email, receiving a token, and then using that token to log in.

**Acceptance Scenarios**:

1. **Given** a guest user, **When** they sign up with a valid email and password, **Then** they are redirected to the dashboard and receive a valid access token.
2. **Given** a guest user, **When** they attempt to sign up with an already registered email, **Then** they see a "Conflict" (409) error message.
3. **Given** an existing user, **When** they sign in with correct credentials, **Then** they are redirected to their dashboard.
4. **Given** an existing user, **When** they sign in with an incorrect password, **Then** they see an "Unauthorized" (401) error.

---

### User Story 2 - Personal Dashboard & User Isolation (Priority: P1)

Authenticated users must only see their own tasks and cannot access tasks belonging to others.

**Why this priority**: Critical security and privacy requirement for a multi-user system.

**Independent Test**: Create two users (A and B). Create tasks for both. Verify A only sees A's tasks and cannot access B's tasks via API or UI.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they view their dashboard, **Then** they see a list of only their own created tasks.
2. **Given** logged-in User A, **When** they try to access a specific task ID belonging to User B, **Then** they receive a 403 Forbidden or 404 Not Found error.
3. **Given** an unauthenticated user, **When** they try to access the dashboard URL, **Then** they are redirected to the login page or receive a 401 error.

---

### User Story 3 - Task Management (CRUD) (Priority: P2)

Users must be able to perform basic operations: Create, Read, Update, Delete, and Complete tasks.

**Why this priority**: This is the core functionality of the Todo application.

**Independent Test**: Perform a full lifecycle test: Create a task, verify it appears, update its title, mark it complete, and finally delete it.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they add a new task with a title, **Then** the task appears immediately in their list.
2. **Given** a logged-in user, **When** they toggle a task's completion status, **Then** the visual status updates immediately and persists on refresh.
3. **Given** a logged-in user, **When** they delete a task, **Then** it is removed from the list and the database.
4. **Given** a logged-in user, **When** they update a task's title or description, **Then** the changes are saved and reflected in the UI.

### Edge Cases

- **Signup Collision**: Signup with existing email returns 409 Conflict.
- **Auth Failure**: Signin with wrong password returns 401 Unauthorized.
- **Missing Token**: API request without JWT token returns 401 Unauthorized.
- **Expired Token**: API request with expired JWT returns 401 Unauthorized (user forced to re-login).
- **Data Access Violation**: API request with valid JWT but accessing wrong user_id or task_id returns 403 Forbidden.
- **Resource Missing**: Task ID doesn't exist returns 404 Not Found.
- **System Failure**: Database connection failure returns 500 Internal Server Error with user-friendly message.
- **Network Issues**: Network timeout during API call shows loading state and allows retry.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to sign up with a unique email and password.
- **FR-002**: System MUST authenticate users and issue secure session tokens (JWT) upon successful login.
- **FR-003**: System MUST enforce strict data isolation so users can ONLY access tasks linked to their account.
- **FR-004**: Users MUST be able to create, read, update, and delete their own tasks.
- **FR-005**: Users MUST be able to toggle the completion status of their tasks.
- **FR-006**: System MUST persist user and task data in a relational database.
- **FR-007**: Web Interface MUST support both Dark and Light themes with a toggle switch.
- **FR-008**: Web Interface MUST be responsive, adapting layout for mobile and desktop screens.
- **FR-009**: System MUST validate input to prevent empty task titles or invalid email formats.

### Key Entities *(include if feature involves data)*

- **User**: Represents a registered account. Attributes: ID, Email, Password Hash.
- **Task**: Represents a todo item. Attributes: ID, Title, Description, Completion Status, Owner (User ID).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully create a new account and receive an access token.
- **SC-002**: Authenticated users can view their personal task dashboard with 100% data isolation (zero access to others' data).
- **SC-003**: All core task operations (Add, Edit, Delete, Complete) function correctly via the web interface.
- **SC-004**: API returns correct standard HTTP status codes (200, 201, 400, 401, 403, 404, 500) for all defined scenarios.
- **SC-005**: Application (Frontend and Backend) is deployed and accessible via public URLs.