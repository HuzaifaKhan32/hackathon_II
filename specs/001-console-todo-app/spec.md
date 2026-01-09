# Feature Specification: Phase I: In-Memory Python Console Todo Application

**Feature Branch**: `001-console-todo-app`
**Created**: 2026-01-07
**Status**: Draft
**Input**: User description: Phase I of a 5-phase Evolution of Todo hackathon project.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add a Task (Priority: P1)

As a user, I want to create a new task with a title and optional description so that I can track what I need to do.

**Why this priority**: Fundamental entry point for the application; without tasks, other features provide no value.

**Independent Test**: Can be tested by adding a task and verifying the system acknowledges the addition (e.g., returns the created task ID or confirmation).

**Acceptance Scenarios**:

1. **Given** the application is running, **When** I choose to add a task with a valid title (1-200 chars), **Then** the task is created and a success message displays the new task's ID.
2. **Given** the application is running, **When** I add a task with a valid title and a description (up to 1000 chars), **Then** the task is created with both fields preserved.
3. **Given** the application is running, **When** I attempt to add a task with an empty title or whitespace only, **Then** the system rejects it and displays a validation error.
4. **Given** the application is running, **When** I attempt to add a task with a title longer than 200 characters, **Then** the system rejects it with a specific error message.

---

### User Story 2 - View Task List (Priority: P1)

As a user, I want to view all my tasks with their status and details so that I can see what is pending and what is done.

**Why this priority**: Essential for the user to understand the current state of their work.

**Independent Test**: Can be tested by adding multiple tasks and verifying they all appear in the list output with correct fields.

**Acceptance Scenarios**:

1. **Given** I have added tasks, **When** I choose to view the list, **Then** I see all tasks formatted with ID, title, status (✓ or ✗), and creation timestamp.
2. **Given** I have no tasks (empty list), **When** I choose to view the list, **Then** the system displays a friendly "no tasks found" message rather than an error or empty void.

---

### User Story 3 - Mark Task as Complete (Priority: P2)

As a user, I want to mark a task as complete so that I can track my progress.

**Why this priority**: Core workflow functionality that distinguishes a todo list from a simple notepad.

**Independent Test**: Can be tested by creating a task, marking it complete, and verifying the status change in the view list.

**Acceptance Scenarios**:

1. **Given** a pending task exists with ID 1, **When** I mark task 1 as complete, **Then** the system confirms the update and subsequent views show the status as completed (✓).
2. **Given** a task is already complete, **When** I mark it as complete again (or toggle depending on implementation choice, here assuming explicit state setting or toggle), **Then** the system handles it gracefully (either stating it's already complete or toggling to incomplete if that's the design; assuming "Toggle" per prompt "Mark as Complete - Toggle task completion status").
3. **Given** I try to complete a task with a non-existent ID, **Then** the system displays a "task not found" error.

---

### User Story 4 - Update Task Details (Priority: P2)

As a user, I want to modify a task's title or description so that I can correct mistakes or add details.

**Why this priority**: Allows for error correction and refining task information.

**Independent Test**: Can be tested by creating a task, updating it, and viewing the list to verify changes.

**Acceptance Scenarios**:

1. **Given** a task exists, **When** I update its title to a new valid string, **Then** the task reflects the new title.
2. **Given** a task exists, **When** I update its description, **Then** the task reflects the new description.
3. **Given** I try to update a task with an invalid title (empty/too long), **Then** the system rejects the update and keeps the original data.

---

### User Story 5 - Delete Task (Priority: P3)

As a user, I want to remove a task permanently so that I can declutter my list.

**Why this priority**: Useful for cleanup but less critical than creating/completing tasks for the core loop.

**Independent Test**: Can be tested by creating a task, deleting it, and verifying it no longer appears in the list.

**Acceptance Scenarios**:

1. **Given** a task exists with ID 1, **When** I delete task 1, **Then** the system confirms deletion and the task no longer appears in the list.
2. **Given** I try to delete a task that does not exist, **Then** the system displays a "task not found" error.

### Edge Cases

- **Empty List Operations**: Attempting to view, update, delete, or complete tasks when the list is empty must show appropriate "empty/no tasks" messages, not crash.
- **Invalid IDs**: Entering non-integer IDs (e.g., "abc"), negative numbers, or out-of-bound numbers must result in clean error messages.
- **Boundary Limits**: Description exactly 1000 chars allowed; 1001 rejected. Title exactly 200 chars allowed; 201 rejected.
- **Concurrency/Duplicate Operations**: While single-threaded, ensuring operations like deleting an already deleted task (if ID is reused or accessible) handle gracefully.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to add a new task with a mandatory title (1-200 characters) and an optional description (max 1000 characters).
- **FR-002**: System MUST assign a unique ID and a creation timestamp to each new task automatically.
- **FR-003**: System MUST allow users to view a list of all tasks, displaying ID, Title, Status (visual indicator like ✓/✗), and Creation Timestamp.
- **FR-004**: System MUST allow users to toggle the completion status of a specific task by its ID.
- **FR-005**: System MUST allow users to update the title or description of an existing task by its ID, enforcing the same validation rules as creation.
- **FR-006**: System MUST allow users to delete a specific task by its ID.
- **FR-007**: System MUST validate all user inputs and provide clear, human-readable error messages for invalid inputs (e.g., empty title, invalid ID format).
- **FR-008**: System MUST default new tasks to "pending" (incomplete) status.
- **FR-009**: The application interface MUST be text-based (CLI) using standard input/output.
- **FR-010**: System MUST store all data in-memory (non-persistent); data is lost when application exits.

### Key Entities

- **Task**:
  - **ID**: Unique integer identifier.
  - **Title**: String, 1-200 chars.
  - **Description**: String, max 1000 chars, optional.
  - **Status**: Boolean or Enum (Pending/Complete).
  - **Created At**: Timestamp.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 5 core features (Add, View, Update, Delete, Complete) function correctly without crashing.
- **SC-002**: Application achieves 80%+ code coverage on business logic.
- **SC-003**: Application handles 100% of defined edge cases (invalid IDs, empty inputs) with user-friendly error messages instead of stack traces.
- **SC-004**: Codebase meets all defined quality standards (zero linting errors, correct formatting).
- **SC-005**: User can perform any supported operation (e.g., add task) within the CLI interface in under 3 steps/prompts.