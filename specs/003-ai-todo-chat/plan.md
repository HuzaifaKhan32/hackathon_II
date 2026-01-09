# Implementation Plan: Phase III AI Chatbot

**Branch**: `003-ai-todo-chat` | **Date**: 2026-01-07 | **Spec**: [specs/003-ai-todo-chat/spec.md](specs/003-ai-todo-chat/spec.md)
**Input**: Feature specification from `/specs/003-ai-todo-chat/spec.md`

## Summary

This phase introduces an AI-powered conversational interface to the existing Todo application. It integrates **Gemini 2.5 Flash** using an **MCP (Model Context Protocol)** server pattern to allow natural language management of tasks. The chat architecture is **stateless**, persisting conversation history in the database, and uses **function calling** to execute tools (add, list, update, etc.).

## Technical Context

**Language/Version**: Python 3.13+ (Backend), TypeScript 5+ (Frontend)
**Primary Dependencies**: 
- Backend: `google-generativeai` (Gemini SDK), MCP SDK (or custom tool schema if SDK overkill), SQLModel
- Frontend: `ai` (Vercel AI SDK - optional but standard, or custom hooks)
**Storage**: Neon PostgreSQL (New tables: `conversations`, `messages`)
**Testing**: pytest (Backend mocks for Gemini), Jest (Frontend)
**Target Platform**: Vercel (Frontend), Railway/Render (Backend)
**Performance Goals**: <3s latency for AI response (streaming preferred if possible, but standard is fine)
**Constraints**: Free tier Gemini limits (15 RPM). Stateless server.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: Spec exists.
- [x] **Phase Progression**: Builds on Phase II (Auth & DB).
- [x] **Technology Stack**: Gemini 2.5 Flash, MCP pattern, Statelessness (Approved).
- [x] **Quality**: 80% coverage required.
- [x] **Security**: User isolation enforced in tools.

## Project Structure

### Documentation (this feature)

```text
specs/003-ai-todo-chat/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (Conversations/Messages)
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
frontend/
├── src/
│   ├── components/
│   │   └── features/
│   │       ├── ChatPanel.tsx       # Main chat container
│   │       ├── MessageList.tsx     # Scrollable list
│   │       └── ChatInput.tsx       # Input with send button
│   └── lib/
│       └── chat.ts                 # Chat API client

backend/
├── src/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/
│   │           └── chat.py         # POST /chat/message
│   ├── models/
│   │   └── chat.py                 # SQLModel for history
│   └── services/
│       ├── llm/
│       │   ├── gemini.py           # Gemini client
│       │   └── tools.py            # MCP tool definitions
│       └── chat_service.py         # Orchestration
```

**Structure Decision**: Integrated into existing Monorepo. New `services/llm` module for isolation of AI logic.

## Design & UI Implementation Strategy

We will use the existing `design/` folder structure, creating new components where necessary or enhancing existing placeholders.

- `dashboard_-_chat_panel_1` & `_2` -> `src/components/features/ChatPanel.tsx`
- New messages will need styling matching the design (User vs Assistant bubbles).
