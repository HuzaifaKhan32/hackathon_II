# Phase 0: Research & Architecture Decisions

**Feature**: Phase II Web Todo App (Auth)
**Date**: 2026-01-07

## 1. Repository Structure: Monorepo

**Decision**: Use a single Git repository with top-level `frontend/` and `backend/` directories.

**Rationale**:
- **Unified Context**: Easier for AI agents (and humans) to see full-stack relationships in one place.
- **Shared Standards**: `GEMINI.md` and `specs/` can govern both sides effectively.
- **Simplified Dev**: One repo to clone. Docker Compose can spin up both easily.

**Alternatives Considered**:
- *Separate Repos*: Better for distinct teams, but adds overhead for a single-developer/AI-agent workflow. Harder to keep specs in sync.
- *Nx/Turborepo*: Powerful but adds complexity. Simple directory separation is sufficient for this scale.

## 2. Database Schema Design

**Decision**: Relational Schema with Foreign Keys and Indexes.

**Rationale**:
- **Integrity**: `ON DELETE CASCADE` ensures that when a user is deleted, their tasks vanish. No orphan data.
- **Performance**: Index on `user_id` is critical because *every* query will filter by it. Index on `status` aids dashboard filtering.
- **Strict Typing**: SQLModel ensures the DB schema matches the Python objects.

**Key Schema Elements**:
- `users`: `id` (UUID/Int), `email` (Unique), `password_hash`, `created_at`.
- `tasks`: `id`, `user_id` (FK -> users.id), `title`, `description`, `is_completed`, `created_at`.

**Alternatives Considered**:
- *No Foreign Keys*: Easier to shard later, but risks data integrity. Not needed for this scale.
- *NoSQL (Mongo)*: Flexible schema, but SQL is standard for Phase II and provides better relational enforcement for user isolation.

## 3. Authentication: Better Auth & JWT

**Decision**: Use **Better Auth** (or compatible flow) to issue stateless JWTs.

**Rationale**:
- **Statelessness**: Server doesn't need to check DB for session validity on every read (though checking user existence is good practice).
- **Scalability**: JWTs work well with separate backend/frontend domains.
- **Standard**: The Constitution mandates JWT.

**Flow**:
1. Frontend POSTs credentials to `/auth/login`.
2. Backend validates & signs JWT (HS256) with `user_id` and `exp`.
3. Frontend stores JWT (HttpOnly cookie or localStorage - Constitution suggests Bearer header, so localStorage/memory is easiest for API clients, but cookies are more secure. We will support Bearer header).
4. All API requests include `Authorization: Bearer <token>`.
5. Backend Middleware verifies signature before processing.

**Alternatives Considered**:
- *Session Cookies*: Easier for same-domain, but harder if frontend/backend are on different Vercel/Railway domains.
- *OAuth Only*: Good, but we need email/password for the "Guest" scenarios in the spec.

## 4. API Client Strategy

**Decision**: Centralized `api.ts` with Axios interceptors.

**Rationale**:
- **Consistency**: One place to attach the JWT token.
- **Error Handling**: One place to catch 401s and redirect to login.
- **Type Safety**: Can define generic return types.

**Pattern**:
```typescript
// lib/api.ts
const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**Alternatives Considered**:
- *Raw fetch in components*: Leads to duplicated auth logic and error handling.
- *React Query only*: Good for state, but still needs a fetcher function. We will use the centralized `api` as the fetcher.

## 5. UI Implementation Strategy

**Decision**: "Pixel-match" mapping of `design/` assets to React components.

**Rationale**:
- The `design/` folder is the source of truth for visuals.
- We must respect the Light (`_1`) and Dark (`_2`) variants using Tailwind's `dark:` modifier.

**Mapping**:
- `design/authentication_-_sign_in_1` -> Login Page
- `design/dashboard_-_task_list_1` -> Main Dashboard
- `design/add/edit_task_modal_1` -> Task Creation/Edit
