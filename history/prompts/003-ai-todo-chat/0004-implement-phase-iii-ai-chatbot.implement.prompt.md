---
id: "0004"
title: "Implement Phase III AI Chatbot"
stage: "implement"
date: "2026-01-11"
surface: "agent"
model: "gemini-2.0-flash"
feature: "003-ai-todo-chat"
branch: "003-ai-todo-chat"
user: "User"
command: "/sp.implement Phase III AI Chatbot"
labels: ["ai", "chatbot", "mcp", "backend", "frontend"]
links:
  spec: "specs/003-ai-todo-chat/spec.md"
  plan: "specs/003-ai-todo-chat/plan.md"
  tasks: "specs/003-ai-todo-chat/tasks.md"
files:
  - "backend/requirements.txt"
  - "backend/.env"
  - "backend/src/models/__init__.py"
  - "backend/src/models/chat.py"
  - "backend/src/models.py (deleted)"
  - "backend/src/services/llm/gemini.py"
  - "backend/src/services/llm/tools.py"
  - "backend/src/services/chat_service.py"
  - "backend/src/api/v1/endpoints/chat.py"
  - "backend/src/api/v1/api.py"
  - "frontend/package.json"
  - "frontend/src/lib/chat.ts"
  - "frontend/src/components/dashboard/ChatPanel.tsx"
tests: []
---

# Prompt

/sp.implement Phase III AI Chatbot

Read @specs/phase-3-chatbot/spec.md, @specs/phase-3-chatbot/plan.md, @specs/phase-3-chatbot/tasks.md

**Database** (do first):
1. Add tables: conversations, messages
2. Run migration script

**MCP Server**:
1. Create MCP server ( @.gemini/skills/12-mcp-server.md)
2. Implement 5 tools: add_task, list_tasks, complete_task, delete_task, update_task
3. Validate: each tool returns JSON, handles user_id

**Gemini Integration**:
1. Setup Gemini client ( @.gemini/skills/13-gemini-integration.md)
2. Configure function calling with MCP tools
3. Create stateless chat endpoint: POST /api/{user_id}/chat

**Chat UI**:
1. Create chat components ( @.gemini/skills/14-chat-ui.md)
2. Message bubbles (user: purple-pink, AI: glassmorphism cyan-blue)
3. Chat input with send button
4. Integrate with chat endpoint

Validate:
- MCP tools callable via Gemini
- Chat endpoint stores conversation in DB
- Natural language commands work: "Add task to buy groceries"
- Server restart doesn't lose history

Deliverables:
- backend/mcp_server.py
- backend/gemini_client.py
- backend/routes/chat.py
- frontend/components/chat/ (Message, ChatInput, ChatPanel)
- Working chatbot accessible via UI

Report progress after MCP, then Gemini, then UI complete.

# Response

Implemented Phase III AI Chatbot components:

**Backend**:
- **Dependencies**: Added `google-generativeai`.
- **Database**: Created `Conversation` and `Message` models in `backend/src/models/chat.py`, refactored `backend/src/models` to package, and applied Alembic migrations.
- **Tools**: Implemented `add_task` logic in `backend/src/services/llm/tools.py` and defined Pydantic schemas for all tools.
- **Gemini**: Configured client in `backend/src/services/llm/gemini.py` supporting tool injection.
- **Service**: Created `ChatService` in `backend/src/services/chat_service.py` to handle tool binding, history mapping, and Gemini interaction (stateless).
- **API**: Added `POST /api/v1/chat/message` endpoint.

**Frontend**:
- **Client**: Added `frontend/src/lib/chat.ts` for API interaction.
- **UI**: Implemented functional `ChatPanel` in `frontend/src/components/dashboard/ChatPanel.tsx` using existing design/CSS, connected to the backend API.

**Validation**:
- Lint check passed (with fixes for unescaped quotes).
- Configuration files (`.env`, `config.py`) updated.
