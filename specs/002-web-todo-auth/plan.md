# Implementation Plan: Phase II: Web Todo Application with Authentication

**Branch**: `002-web-todo-auth` | **Date**: 2026-01-07 | **Spec**: [specs/002-web-todo-auth/spec.md](specs/002-web-todo-auth/spec.md)
**Input**: Feature specification from `/specs/002-web-todo-auth/spec.md`

## Summary

This phase transforms the console-based Todo application into a modern, full-stack web application. It introduces a **Next.js 16 (App Router)** frontend and a **FastAPI** backend, utilizing **Neon PostgreSQL** for persistence and **Better Auth** for JWT-based user authentication. The goal is to provide a secure, multi-user environment where each user's data is isolated.

## Technical Context

**Language/Version**: Python 3.13+ (Backend), TypeScript 5+ (Frontend)
**Primary Dependencies**: 
- Backend: FastAPI, SQLModel, Pydantic, Better Auth (Python SDK/Integration), Uvicorn, Alembic
- Frontend: Next.js 16 (App Router), React, Tailwind CSS, Lucide React (Icons), Axios/Fetch
**Storage**: Neon Serverless PostgreSQL (Production/Dev), SQLite (Optional Local Fallback, but Postgres preferred per Constitution)
**Testing**: pytest (Backend), Jest + React Testing Library (Frontend)
**Target Platform**: Vercel (Frontend), Railway/Render (Backend)
**Project Type**: Full-stack Monorepo
**Performance Goals**: <200ms API response p95, <1s LCP on Frontend
**Constraints**: Zero-trust frontend (token required), strict user isolation in DB queries.
**Scale/Scope**: ~10 screens (Auth, Dashboard, Task Management), ~15 API endpoints.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: Spec exists and is referenced.
- [x] **Phase Progression**: Builds on Phase I concepts (functionally).
- [x] **Technology Stack**:
    - Next.js 16 App Router (Approved)
    - FastAPI + SQLModel (Approved)
    - Neon PostgreSQL (Approved)
    - Better Auth (Approved)
- [x] **Monorepo Structure**: `frontend/` and `backend/` directories planned.
- [x] **Quality Standards**: 80% coverage, strict typing, linting planned.
- [x] **Design Integration**: Design folder structure will be mapped to components.

## Project Structure

### Documentation (this feature)

```text
specs/002-web-todo-auth/
├── plan.md              # This file
├── research.md          # Phase 0 output (Decisions & Rationale)
├── data-model.md        # Phase 1 output (Schema & Entities)
├── quickstart.md        # Phase 1 output (Setup & Run)
├── contracts/           # Phase 1 output (API Specs)
│   └── openapi.yaml
└── tasks.md             # Phase 2 output (Implementation Tasks)
```

### Source Code (repository root)

```text
frontend/ (Next.js 16)
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (auth)/             # Route group for auth pages
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   └── dashboard/          # Protected dashboard routes
│   ├── components/
│   │   ├── ui/                 # Reusable UI components (buttons, inputs)
│   │   └── features/           # Feature-specific components (TaskList, EditTaskModal)
│   ├── lib/
│   │   ├── api.ts              # Centralized API client
│   │   └── utils.ts            # Helper functions
│   └── types/                  # TypeScript interfaces
├── public/
└── tests/

backend/ (FastAPI)
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/      # Route handlers
│   │       └── api.py          # Router aggregation
│   ├── core/                   # Config, security, exceptions
│   ├── db/                     # Database session & base
│   ├── models/                 # SQLModel entities
│   ├── services/               # Business logic
│   └── main.py                 # App entrypoint
├── migrations/                 # Alembic migrations
└── tests/
```

**Structure Decision**: Monorepo with distinct `frontend` and `backend` directories to allow independent deployment and scaling while keeping context unified.

## Design & UI Implementation Strategy

The `design/` directory contains canonical UI definitions. We will map them as follows:

- `authentication_-_sign_in_1` & `_2` -> `src/app/(auth)/sign-in/page.tsx`
- `dashboard_-_task_list_1` & `_2` -> `src/components/features/TaskList.tsx`
- `dashboard_-_sidebar_navigation_1` & `_2` -> `src/components/layout/Sidebar.tsx`
- `add/edit_task_modal_1` & `_2` -> `src/components/features/EditTaskModal.tsx`
- `dashboard_-_chat_panel_1` & `_2` -> `src/components/features/ChatPanel.tsx` (Phase III prep, implementation stub)

*Note: `_1` suffix indicates Light Mode, `_2` indicates Dark Mode. Tailwind `dark:` classes will be used.*
