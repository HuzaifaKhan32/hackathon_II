# Tasks: Phase I Console App

**Feature**: Phase I Console App
**Status**: Pending
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Phase 1: Setup & Infrastructure
**Goal**: Initialize project environment and dependencies.

- [x] T001 Initialize project structure and configuration
  - Create `pyproject.toml` with dependencies: `uv`, `rich`, `pydantic`, `pytest`, `pytest-cov`.
  - Create directory structure: `src/` and `tests/` with `__init__.py` files.
  - Create `README.md` with basic project info.

## Phase 2: Foundational
**Goal**: Implement the core Data Model with validation.

- [x] T002 [P] Create Task model and validation tests
  - File: `src/models.py`
  - Implement `Task` Pydantic model with fields: `id` (int), `title` (str, 1-200 chars), `description` (str, max 1000 chars), `status` (Enum: PENDING, COMPLETED), `created_at` (datetime).
  - File: `tests/test_models.py`
  - Add unit tests validating constraints (e.g., empty title raises error).

## Phase 3: User Story 1 - Add a Task (P1)
**Goal**: Users can add a new task.

- [x] T003 [US1] Implement TaskService add_task
  - File: `src/service.py`
  - Create `TaskService` class with in-memory list.
  - Implement `add_task(title, description)` -> `Task`.
  - File: `tests/test_service.py`
  - Add tests: success case, validation error case.

- [x] T004 [US1] Implement Add Task UI
  - File: `src/ui.py`
  - Initialize `rich.console.Console`.
  - Implement `prompt_add_task()` to capture title/description.
  - Setup basic loop to invoke `service.add_task`.

## Phase 4: User Story 2 - View Task List (P1)
**Goal**: Users can view all tasks.

- [x] T005 [US2] Implement TaskService list_tasks
  - File: `src/service.py`
  - Implement `list_tasks()` -> `List[Task]`.
  - File: `tests/test_service.py`
  - Add tests: empty list, populated list.

- [x] T006 [US2] Implement View List UI
  - File: `src/ui.py`
  - Implement `display_tasks(tasks)` using `rich.table.Table`.
  - Columns: ID, Title, Status, Created At.
  - Handle empty list with friendly message.

## Phase 5: User Story 3 - Mark Task as Complete (P2)
**Goal**: Users can complete tasks.

- [x] T007 [US3] Implement Complete Task feature
  - File: `src/service.py`: Add `complete_task(id)` (raise `TaskNotFoundError`).
  - File: `tests/test_service.py`: Test state change and non-existent ID.
  - File: `src/ui.py`: Add "Complete" flow (prompt for ID), handle errors.

## Phase 6: User Story 4 - Update Task Details (P2)
**Goal**: Users can modify tasks.

- [x] T008 [US4] Implement Update Task feature
  - File: `src/service.py`: Add `update_task(id, title=None, description=None)`.
  - File: `tests/test_service.py`: Test partial updates and validation.
  - File: `src/ui.py`: Add "Update" flow (prompt ID, then optional fields).

## Phase 7: User Story 5 - Delete Task (P3)
**Goal**: Users can remove tasks.

- [x] T009 [US5] Implement Delete Task feature
  - File: `src/service.py`: Add `delete_task(id)` -> bool.
  - File: `tests/test_service.py`: Test deletion and double-deletion handling.
  - File: `src/ui.py`: Add "Delete" flow with confirmation.

## Phase 8: Polish & Cross-Cutting
**Goal**: Final integration and quality assurance.

- [x] T010 [App] Finalize Main Entry and Documentation
  - File: `src/main.py`
  - Ensure main loop handles all commands and exits gracefully.
  - Catch global exceptions (KeyboardInterrupt).
  - File: `README.md`
  - Document how to run and test (`uv run src/main.py`).
  - Verify 80% coverage (`pytest --cov=src`).

## Dependencies
- T002 blocks T003
- T003 blocks T004
- T003 blocks T005
- T005 blocks T006
- T003/T005 block T007, T008, T009
- All blocks T010

## Implementation Strategy
- **Sequential**: Follow T001 -> T010 to build the app layer by layer.
- **Testing**: Run `pytest` after every Service task to ensure logic is sound before building UI.
