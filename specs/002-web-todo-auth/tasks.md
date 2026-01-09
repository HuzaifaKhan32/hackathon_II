# Tasks: Phase II: Web Todo Application with Authentication

**Feature**: Phase II Web Todo App  
**Status**: Pending  
**Spec**: [specs/002-web-todo-auth/spec.md](specs/002-web-todo-auth/spec.md)  
**Plan**: [specs/002-web-todo-auth/plan.md](specs/002-web-todo-auth/plan.md)

## Phase 1: Setup & Configuration
**Goal**: Initialize the monorepo structure and basic environment for both frontend and backend.
**Independent Test**: Both `uvicorn` (backend) and `next dev` (frontend) start without errors.

- [x] T001 Initialize monorepo structure and git configuration in project root
- [x] T002 Setup Backend: FastAPI, SQLModel, Poetry/Pipenv in `backend/`
- [x] T003 Setup Frontend: Next.js 16, Tailwind CSS, Lucide React in `frontend/`
- [x] T004 Configure Environment Variables (`.env`) for DB and Auth in `backend/.env` and `frontend/.env.local`

## Phase 2: Foundational (Database & Auth Core)
**Goal**: Establish the data layer and authentication security primitives.
**Independent Test**: Migrations run successfully; Database accepts connections; JWT encoding/decoding works in isolation.

- [x] T005 Create Database Session and Config in `backend/src/db/session.py`
- [x] T006 Define `User` and `Task` SQLModel entities in `backend/src/models/`
- [x] T007 Initialize Alembic and generate initial migration in `backend/migrations/`
- [x] T008 Implement JWT security utilities (hashing, token creation) in `backend/src/core/security.py`

## Phase 3: User Story 1 - Authentication
**Goal**: Users can sign up and sign in to receive a secure access token.
**Independent Test**: POST /signup creates a user; POST /login returns a valid JWT. Frontend redirects to dashboard on success.

- [x] T009 [US1] Create Auth API Endpoints (Login, Signup) in `backend/src/api/v1/endpoints/auth.py`
- [x] T010 [P] [US1] Setup API Client (Axios/Fetch) with Interceptors in `frontend/src/lib/api.ts`
- [x] T011 [P] [US1] Implement Sign In and Sign Up Pages in `frontend/src/app/(auth)/`
- [x] T012 [US1] Integrate Auth Forms with API and handle Token Storage in `frontend/src/context/AuthContext.tsx`

## Phase 4: User Story 2 - Dashboard & Isolation
**Goal**: Authenticated users see only their own tasks.
**Independent Test**: API returns 401 for valid requests without token. API returns only user's tasks. Dashboard loads.

- [x] T013 [US2] Implement `get_current_user` dependency in `backend/src/api/deps.py`
- [x] T014 [US2] Create Task List Endpoint (`GET /tasks`) with user filtering in `backend/src/api/v1/endpoints/tasks.py`
- [x] T015 [P] [US2] Create Dashboard Layout with Sidebar in `frontend/src/components/layout/Sidebar.tsx`
- [x] T016 [US2] Implement TaskList Component and fetch logic in `frontend/src/components/features/TaskList.tsx`

## Phase 5: User Story 3 - Task Management
**Goal**: Full CRUD capabilities for tasks.
**Independent Test**: User can create, edit, toggle, and delete tasks via the UI, and changes persist.

- [x] T017 [US3] Implement Task CRUD Endpoints (POST, PUT, DELETE) in `backend/src/api/v1/endpoints/tasks.py`
- [x] T018 [P] [US3] Create Add/Edit Task Modal Component in `frontend/src/components/features/EditTaskModal.tsx`
- [x] T019 [US3] Integrate Task Actions (Create, Update, Delete) in `frontend/src/components/features/TaskList.tsx`

## Final Phase: Deployment & Polish
**Goal**: Production-ready configuration and deployment.

- [x] T020 Configure Deployment (Vercel, Docker/Render configs) in `vercel.json` and `backend/Dockerfile`

## Dependencies

1. **Phase 1 & 2** (Setup/Foundation) must be completed before any User Story.
2. **US1 (Auth)** blocks US2 and US3 (require authenticated user).
3. **US2 (Dashboard)** provides the container for US3 features.

## Parallel Execution Opportunities

- **T010 & T011 (US1)**: Frontend Auth UI and API Client can be built while Backend Auth (T009) is in progress, using mock responses or agreed contract.
- **T015 & T016 (US2)**: Sidebar and TaskList UI can be scaffolded while the Backend Task Endpoint (T014) is being written.
- **T018 (US3)**: Modal UI can be built independently of the Backend CRUD endpoints (T017).

## Implementation Strategy

1. **MVP Scope**: Complete through Phase 4 (US2). This proves the core architecture (Auth + DB + Isolation).
2. **Incremental Delivery**: Deploy Backend first to ensure API stability, then connect Frontend.
