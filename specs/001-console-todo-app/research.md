# Phase 0 Research: Console App

## Decisions

### 1. User Interface & Interaction
- **Decision**: Interactive REPL (Read-Eval-Print Loop) using `rich` library.
- **Rationale**: 
  - **In-Memory Requirement**: FR-010 mandates non-persistent in-memory data. A standard argument-based CLI (e.g., `todo add "task"`) would spawn a new process for each command, losing state immediately. An interactive session is required to maintain state.
  - **UX**: `rich` allows for visually appealing tables (FR-003) and color-coded status indicators (SC-005) without complex GUI overhead.
- **Alternatives Considered**: 
  - `argparse`/`typer`: Rejected because they are stateless by design (one command = one process).
  - `curses`: Rejected due to high complexity and platform compatibility issues.

### 2. Data Modeling & Validation
- **Decision**: `Pydantic` models.
- **Rationale**: 
  - **Validation**: Declarative validation for constraints (Title 1-200 chars, Description max 1000 chars) meets FR-007 and SC-003 strictly.
  - **Future Proofing**: Aligns with Phase II (FastAPI) requirements, allowing model reuse or easy porting.
- **Alternatives Considered**: 
  - `dataclasses`: Rejected as validation requires manual implementation in `__post_init__`.
  - Raw Dictionaries: Rejected due to lack of type safety and structure.

### 3. Testing Strategy
- **Decision**: `pytest` with `pytest-cov`.
- **Rationale**: Mandated by constitution.
- **Approach**: 
  - Unit tests for `Task` model (validation logic).
  - Unit tests for `TaskService` (business logic: add, delete, update).
  - Integration/E2E tests for the CLI flow using `pytest`'s capability to capture stdout/stdin (mocking `input` and checking `print` output).

### 4. Package Management
- **Decision**: `uv`.
- **Rationale**: Mandated by Constitution 2.1. Fast, modern, and handles python version management.
