---
id: 0001
title: Create Spec for Console Todo App
stage: spec
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: 001-console-todo-app
branch: 001-console-todo-app
user: huzaifa_nadeem
command: /sp.specify
labels: ["spec", "python", "cli"]
links:
  spec: specs/001-console-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-console-todo-app/spec.md
 - specs/001-console-todo-app/checklists/requirements.md
tests:
 - null
---

## Prompt

Phase I: In-Memory Python Console Todo Application Project Context: This is Phase I of a 5-phase Evolution of Todo hackathon project. This phase establishes the foundation for a todo application that will evolve into a cloud-native AI chatbot. All code must be generated via Gemini CLI using spec-driven development. Target Audience: - Hackathon judges evaluating spec-driven workflow - Developers learning AI-driven development (AIDD) - Future phases will build on this foundation Intent: Build a command-line todo application in Python that stores tasks in memory (no database yet). Users can perform basic CRUD operations through a text-based interface. This demonstrates mastery of spec-driven development fundamentals. Core Features (Basic Level): 1. Add Task - Create new todo items with title and description 2. View Task List - Display all tasks with status indicators 3. Update Task - Modify task title or description 4. Delete Task - Remove tasks by ID 5. Mark as Complete - Toggle task completion status (pending/complete) Success Criteria (SMART): - All 5 Basic Level features implemented and working - User can add a task with title (1-200 chars) and optional description (max 1000 chars) - User can view all tasks showing: ID, title, status (✓ or ✗), creation timestamp - User can update any task field by ID - User can delete any task by ID - User can mark tasks as complete/incomplete by ID - Application handles invalid inputs gracefully (invalid IDs, empty titles, etc.) - No crashes on edge cases (empty list operations, duplicate operations) - Code coverage: 80%+ on business logic (pytest) - All code generated via Gemini CLI (prompt history documented in specs/history/) - Tests passing: pytest runs without failures - Project follows Python best practices (type hints, docstrings, clean structure) Technical Constraints: - Language: Python 3.13+ - Package Manager: UV (not pip) - Project Structure: /src for source code, /tests for tests - Data Storage: In-memory only (Python lists/dicts, no file I/O, no database) - Interface: Command-line text interface (input/print) - Testing: pytest with 80%+ coverage - Type Hints: Required on all functions - Docstrings: Google style on all public functions - No external dependencies except pytest for testing Quality Standards (from Constitution): - Zero linting errors (Ruff) - Formatted with Black - All tests must pass before submission - No manual code writing - all via Gemini CLI - Prompt history documented in specs/history/phase-1-prompts.md User Scenarios: 1. First-time user opens app → sees empty list → adds first task → sees task displayed 2. User with tasks → views list → updates a task title → sees updated list 3. User marks task complete → status changes from ✗ to ✓ 4. User tries to delete non-existent task → receives clear error message 5. User tries to add task with empty title → receives validation error Edge Cases to Handle: - Operations on empty task list (view, delete, update, complete) - Invalid task IDs (negative, out of range, non-integer) - Empty or whitespace-only titles - Description exceeding 1000 characters - Title exceeding 200 characters - Attempting to complete already-completed task - Attempting to delete already-deleted task Not Building (Non-Goals): - Persistent storage (Phase II will add database) - Web interface (Phase II will add Next.js frontend) - User authentication (Phase II will add Better Auth) - AI chatbot features (Phase III will add Gemini integration) - Multiple users (Phase II will add user isolation) - Task priorities, tags, search, filters (Phase V advanced features) - Due dates or reminders (Phase V advanced features) Acceptance Criteria Checklist: [ ] User can add a task and see it in the list [ ] User can view all tasks with correct status indicators [ ] User can update task details (title, description) [ ] User can delete a task and verify it's removed [ ] User can mark task as complete/incomplete [ ] Application handles all edge cases without crashing [ ] pytest coverage report shows 80%+ on business logic [ ] All code generated via Gemini CLI (no manual coding) [ ] Prompt history documented showing spec-driven process [ ] README.md includes setup and run instructions [ ] Project structure follows constitution standards Timeline: Complete by: December 7, 2025 (Phase I deadline) Estimated Effort: 3-5 hours (spec creation, generation, testing, refinement) Deliverables: 1. GitHub repository with: - specs/constitution.md (project-wide standards) - specs/phase-1-console/spec.md (this specification) - specs/history/phase-1-prompts.md (all Gemini CLI prompts) - src/ folder with Python source code - tests/ folder with pytest test files - README.md with setup instructions - GEMINI.md with context for Gemini CLI 2. Working console application (demo via video or live) 3. Test report showing 80%+ coverage Definition of Done: - All acceptance criteria checked - All tests passing (pytest) - Code coverage ≥ 80% - Zero linting errors (ruff check) - Formatted with Black - Committed to GitHub with clear commit messages - Demo video recorded (max 90 seconds) - Prompt history documented

## Response snapshot

Created feature branch 001-console-todo-app. Generated specification at specs/001-console-todo-app/spec.md. Validated with checklist.

## Outcome

- ✅ Impact: Feature spec created and validated.
- 🧪 Tests: n/a
- 📁 Files: Spec and checklist created.
- 🔁 Next prompts: /sp.plan
- 🧠 Reflection: Spec creation followed standard process. Adjusted spec to be tech-agnostic as per checklist.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): none