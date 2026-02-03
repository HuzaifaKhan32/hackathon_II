---
id: "002"
title: "Fix backend schema divergence"
stage: "misc"
date: "2026-01-13"
surface: "agent"
model: "gemini-2.5-flash"
feature: "002-web-todo-auth"
branch: "main"
user: "HUZAIFA"
command: "fix backend 500 error"
labels:
  - "bugfix"
  - "backend"
  - "database"
  - "migration"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/migrations/versions/1fc5d1edfbe3_sync_schema_divergence.py"
  - "backend/fix_alembic_version.py"
tests: []
prompt: |
  Error Type: Console AxiosError
  Error Message: Network Error
  ...
  at async handleSignUp (src/app/(auth)/sign-up/page.tsx:32:9)
  
  (Backend logs showed: sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedColumn) column user.is_active does not exist)
response: |
  Diagnosed that the backend database schema was out of sync with the SQLAlchemy models (missing `is_active`, `hashed_password` columns, etc.) and the migration history was diverged (`alembic_version` in DB didn't match local files).
  
  Actions taken:
  1.  Created `backend/fix_alembic_version.py` to manually update the DB `alembic_version` to the latest local migration ID (`278644d11934`).
  2.  Ran `alembic revision --autogenerate -m "sync_schema_divergence"` to generate a new migration catching up the schema.
  3.  Manually edited the generated migration (`1fc5d1edfbe3`) to PREVENT dropping `account`, `session`, `verification` tables (managed by Better Auth).
  4.  Ran `alembic upgrade head` to apply the changes.
  
  The `user` table now has the required columns, which should resolve the 500 Internal Server Error during signup.
outcome: "Database schema synced and migrations applied."
evaluation: "success"
---
