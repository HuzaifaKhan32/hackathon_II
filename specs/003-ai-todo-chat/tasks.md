# Tasks: Phase III AI Chatbot

**Feature**: AI-Powered Todo Chatbot (Phase III)
**Spec**: [specs/003-ai-todo-chat/spec.md](specs/003-ai-todo-chat/spec.md)
**Plan**: [specs/003-ai-todo-chat/plan.md](specs/003-ai-todo-chat/plan.md)
**Status**: Pending

## Phase 1: Setup
**Goal**: Initialize environment and dependencies for AI integration.

- [x] T001 Install Google Generative AI SDK in backend `backend/pyproject.toml`
- [x] T002 Install Vercel AI SDK (or equivalent fetch wrappers) in frontend `frontend/package.json`
- [x] T003 Configure Gemini API Key environment variable in `backend/.env` and `backend/src/core/config.py`

## Phase 2: Foundations
**Goal**: Establish data models, database tables, and core AI service structure.
**Independent Test**: Database tables created; Gemini client can successfully authenticate (basic "hello world" script).

- [x] T004 Create Conversation and Message SQLModel classes in `backend/src/models/chat.py`
- [x] T005 [P] Generate and apply Alembic migration for new chat tables `backend/alembic/versions/`
- [x] T006 Initialize Gemini client wrapper with system instructions in `backend/src/services/llm/gemini.py`
- [x] T007 Define MCP tool schemas (Pydantic definitions) for add, list, update, delete, complete in `backend/src/services/llm/tools.py`

## Phase 3: Natural Language Task Creation (US1)
**Goal**: Enable users to add tasks via chat. Establishes the full end-to-end chat loop.
**Independent Test**: Sending "Add task Buy Milk" creates a task in the DB and returns a confirmation message.

- [x] T008 [US1] Implement `add_task` tool logic (DB interaction) in `backend/src/services/llm/tools.py`
- [x] T009 [US1] Implement `ChatService` to orchestrate Gemini calls and tool execution in `backend/src/services/chat_service.py`
- [x] T010 [US1] Create POST /chat/message endpoint in `backend/src/api/v1/endpoints/chat.py`
- [x] T011 [P] [US1] Create chat client API wrapper in `frontend/src/lib/chat.ts`
- [x] T012 [P] [US1] Implement Chat UI components (Input, Panel, Message bubble) in `frontend/src/components/features/ChatPanel.tsx`

## Phase 4: Task Listing & Status (US2)
**Goal**: Allow users to query their tasks.
**Independent Test**: Asking "What are my tasks?" returns a list of tasks.

- [ ] T013 [US2] Implement `list_tasks` tool logic with filtering in `backend/src/services/llm/tools.py`
- [ ] T014 [P] [US2] Verify and adjust system prompt to ensure clear formatting of task lists in `backend/src/services/llm/gemini.py`

## Phase 5: Task Completion & Updates (US3)
**Goal**: Full CRUD capabilities via chat.
**Independent Test**: Asking "Mark task 1 as done" updates the task status.

- [ ] T015 [US3] Implement `complete_task`, `delete_task`, and `update_task` tool logic in `backend/src/services/llm/tools.py`

## Phase 6: Conversation History Persistence (US4)
**Goal**: Maintain context across sessions.
**Independent Test**: Reloading the page shows previous chat history.

- [ ] T016 [US4] Implement GET /chat/conversations and GET /.../messages endpoints in `backend/src/api/v1/endpoints/chat.py`
- [ ] T017 [US4] Update `ChatService` to inject conversation history into Gemini context in `backend/src/services/chat_service.py`
- [ ] T018 [US4] Update frontend to fetch and display history on load in `frontend/src/components/features/ChatPanel.tsx`

## Phase 7: Polish & Ambiguity Resolution (US5)
**Goal**: Improve UX and error handling.

- [ ] T019 [US5] Refine system prompt for ambiguity resolution (asking clarifying questions) in `backend/src/services/llm/gemini.py`
- [ ] T020 [P] Implement graceful error handling for API failures and rate limits in `backend/src/services/chat_service.py`

## Dependencies
1. Setup (T001-T003) -> Foundations (T004-T007)
2. Foundations -> US1 (T008-T012)
3. US1 -> US2 (T013-T014)
4. US1 -> US3 (T015)
5. Foundations -> US4 (T016-T018) (Can be parallel with US1-3, but better after basic loop works)
6. US1-4 -> Polish (T019-T020)

## Implementation Strategy
- **MVP**: Complete through Phase 3 (US1). This proves the core "Chat -> LLM -> Tool -> DB -> Response" loop.
- **Incremental**: Add tools (US2, US3) one by one.
- **State**: Ensure `ChatService` remains stateless, always rebuilding context from DB (US4).
