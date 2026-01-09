# Phase 0: Research & Architecture Decisions

**Feature**: Phase III AI Chatbot
**Date**: 2026-01-07

## 1. Stateless vs Stateful Chat Server

**Decision**: **Stateless** architecture with Database Persistence.

**Rationale**:
- **Scalability**: Allows horizontal scaling of backend services without sticky sessions.
- **Reliability**: Server restarts don't lose conversation context.
- **Constitution**: Explicitly mandated ("NO in-memory state on server").

**Implementation**:
- Each request to `POST /chat/message` includes `conversation_id`.
- Backend retrieves full history from `messages` table.
- Backend sends history + new message to Gemini.
- Backend saves user message and AI response to DB.

**Alternatives Considered**:
- *In-Memory (LangChain Memory)*: Easiest to start, but violates statelessness and loses data on restart.
- *Redis*: Good for caching, but Postgres is sufficient for persistence and simpler (one less infra piece).

## 2. MCP Tool Design & Granularity

**Decision**: Define 5 discrete tools with atomic parameters.

**Tools**:
1. `add_task(title: str, description: str = None)`
2. `list_tasks(status: str = None)`
3. `complete_task(task_id: str)`
4. `delete_task(task_id: str)`
5. `update_task(task_id: str, title: str = None, ...)`

**Rationale**:
- **Atomic**: Each tool does one thing well.
- **Schema**: Maps directly to Backend Service functions.
- **Ambiguity**: If user says "Change task", LLM can ask for missing params or call `list_tasks` first to find IDs.

**Alternatives Considered**:
- *Single `manage_task` tool*: Too complex schema, harder for LLM to get right.

## 3. Gemini Integration: Function Calling

**Decision**: Use Gemini's native **Function Calling** (Tools) API.

**Rationale**:
- **Structured Output**: Gemini returns JSON for tool calls, eliminating parsing errors.
- **Looping**: We can implement a "ReAct" loop: User -> LLM -> Tool Call -> Backend Execute -> LLM -> Response.

**Flow**:
1. User sends "Add milk".
2. LLM returns `function_call: {name: "add_task", args: {title: "milk"}}`.
3. Backend executes `TaskService.create_task(...)`.
4. Backend sends result "Task created with ID 1" back to LLM.
5. LLM generates natural response "I've added 'milk' to your list."

**Alternatives Considered**:
- *Prompt Engineering (JSON Mode)*: Less reliable than native function calling.
- *ReAct via LangChain*: Adds heavy dependency. Native implementation is cleaner for just 5 tools.

## 4. Conversation History Storage

**Decision**: Relational Tables (`conversations`, `messages`).

**Rationale**:
- **Queryable**: Can easily show "past chats" in UI.
- **Integrity**: FK to `users` ensures isolation.

**Schema**:
- `conversations`: `id`, `user_id`, `created_at`
- `messages`: `id`, `conversation_id`, `role` (user/assistant/tool), `content`, `timestamp`

**Alternatives Considered**:
- *JSONB column in User table*: Harder to query individual messages or pagination.
- *No persistence*: Violates requirements.
