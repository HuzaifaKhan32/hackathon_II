<!--
SYNC IMPACT REPORT
Version: 1.0.0 → 1.1.0
Changes:
- Modified Principle: 2.2 Phase II: Full-Stack Web (Explicitly confirmed Next.js 16)
- Modified Principle: 3.4 Frontend Standards (Added Design & UI Implementation Strategy)
- Added Section: Design & UI Implementation Strategy under 3.4
- Templates Pending: None (Plan template references constitution generically)
-->

# Constitution: Evolution of Todo Hackathon Project

**Project Type**: AI-Native Full-Stack Todo Application  
**Development Approach**: Spec-Driven Development (SDD) with Gemini CLI  
**Scope**: Phase I (Console) → Phase V (Cloud-Native Event-Driven System)  
**Created**: 2025-12-30  
**Status**: Living Document (immutable standards, evolving implementation)

---

## 1. Core Principles

### 1.1 Spec-Driven Development Philosophy
- **NEVER write code manually** — All code must be generated via Gemini CLI from specifications
- **Specifications precede implementation** — Every feature requires: constitution → specify → plan → tasks → implement
- **Documentation is executable** — Specs are the source of truth, not afterthoughts
- **Iterative refinement** — Specs evolve through clarification cycles with AI agents
- **Traceability required** — Every code file must reference its originating Task ID and Spec section

### 1.2 AI-Driven Development (AIDD)
- **Humans as Architects** — We design systems, define requirements, review outputs
- **AI as Builders** — Gemini CLI generates code, tests, and documentation
- **Co-learning partnership** — Both human and AI improve through iteration
- **Prompt history matters** — All prompts and iterations must be documented in `/specs/history/`
- **Context engineering** — Every Gemini session loads `GEMINI.md` for project awareness

### 1.3 Phase Progression Integrity
- **Sequential completion required** — Cannot skip phases (I → II → III → IV → V)
- **Each phase builds on previous** — Refactor, don't rebuild from scratch
- **Backward compatibility** — Phase N+1 must not break Phase N functionality
- **Working software always** — Every commit should maintain a deployable state

---

## 2. Technology Stack Standards

### 2.1 Phase I: Console App (Python)
```yaml
Required:
  - Python: 3.13+
  - Package Manager: UV (not pip)
  - Project Structure: src/ for source code
  - Testing: pytest with 80%+ coverage
  - Type Hints: Required on all functions
  - Docstrings: Google style on all public functions
```

### 2.2 Phase II: Full-Stack Web (Next.js + FastAPI)
```yaml
Frontend:
  - Framework: Next.js 16+ (App Router ONLY, no Pages Router)
  - Language: TypeScript (strict mode enabled)
  - Styling: Tailwind CSS (utility-first, no inline styles)
  - State: React hooks (useState, useEffect, useContext)
  - API Client: Centralized in /lib/api.ts

Backend:
  - Framework: FastAPI
  - ORM: SQLModel (type-safe SQL operations)
  - Database: Neon Serverless PostgreSQL (free tier)
  - Auth: Better Auth with JWT tokens
  - API Design: RESTful, /api/{user_id}/resources pattern

Database:
  - Schema: All migrations in /backend/migrations/
  - Naming: snake_case for tables/columns
  - Foreign Keys: ALWAYS include ON DELETE CASCADE
  - Indexes: On user_id, status, created_at
```

### 2.3 Phase III: AI Chatbot (Gemini + MCP)
```yaml
AI Stack:
  - Model: Gemini 2.5 Flash (free tier, no OpenAI)
  - API Key: Via environment variable GEMINI_API_KEY
  - Rate Limits: 15 RPM, 1M TPM (track in logs)
  - Function Calling: Use for MCP tool invocation

Chat Interface:
  - UI: Custom React components (NOT OpenAI ChatKit)
  - Components: Message, ChatInput, MessageList
  - Streaming: Optional (Phase III), Required (Phase V)

MCP Server:
  - SDK: Official MCP SDK (Python)
  - Tools: 5 required (add_task, list_tasks, complete_task, delete_task, update_task)
  - Stateless: NO in-memory state, database-backed only
  - Error Handling: Graceful failures with user-friendly messages
```

### 2.4 Phase IV: Kubernetes Local (Minikube)
```yaml
Containerization:
  - Base Images: python:3.13-slim, node:20-alpine
  - Multi-stage Builds: Required for production images
  - Health Checks: /health endpoint on all services
  - Secrets: Kubernetes Secrets (NOT env files in images)

Orchestration:
  - Platform: Minikube (local), Kubernetes 1.28+
  - Package Manager: Helm Charts
  - Namespace: hackathon-todo
  - Resource Limits: Set memory/CPU on all pods

AIOps:
  - Docker AI: Gordon (if available) for Dockerfile generation
  - kubectl-ai: For K8s manifest generation
  - kagent: For cluster health analysis
```

### 2.5 Phase V: Cloud-Native (Event-Driven)
```yaml
Event Streaming:
  - Kafka: Redpanda Cloud (free tier) OR Strimzi (self-hosted)
  - Topics: task-events, reminders, task-updates
  - Consumer Groups: Per service (notification-service, recurring-task-service)
  - Schema: JSON with event_type, timestamp, user_id

Distributed Runtime:
  - Dapr: v1.12+ with 5 building blocks
  - Pub/Sub: Dapr component for Kafka abstraction
  - State: Dapr state management (alternative to direct DB)
  - Jobs API: Scheduled reminders (NOT cron polling)
  - Secrets: Dapr secrets (alternative to K8s secrets)

Cloud Deployment:
  - Provider: Oracle Cloud OKE (always free) OR DigitalOcean DOKS ($200 trial)
  - CI/CD: GitHub Actions
  - Monitoring: Prometheus + Grafana (optional bonus)
```

---

## 3. Quality Standards (Testable & Specific)

### 3.1 Code Quality
- **No manual code** — All code via Gemini CLI (judges review prompts)
- **Type safety** — TypeScript strict mode, Python type hints on all functions
- **Code coverage** — Minimum 80% test coverage on business logic
- **Linting** — Zero linting errors (ESLint for TS, Ruff for Python)
- **Formatting** — Prettier for TS, Black for Python (auto-format on save)
- **No dead code** — No commented-out code, no unused imports

### 3.2 API Design Standards
```yaml
RESTful Principles:
  - Resources: Plural nouns (/tasks, not /task)
  - Methods: GET (read), POST (create), PUT (update), DELETE (remove), PATCH (partial)
  - Status Codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)
  - Idempotency: GET/PUT/DELETE are idempotent, POST is not

Request/Response:
  - Content-Type: application/json (always)
  - Request Body: Pydantic models in FastAPI
  - Response Body: Consistent shape {data, error, metadata}
  - Error Format: {error: {code, message, details}}

Authentication:
  - Header: Authorization: Bearer <jwt_token>
  - Validation: JWT signature verification on every request
  - User Isolation: Filter ALL queries by authenticated user_id
  - Token Expiry: 7 days (refresh flow optional)
```

### 3.3 Database Standards
```yaml
Schema Design:
  - Normalization: 3NF (eliminate redundancy)
  - Primary Keys: Auto-increment integers OR UUIDs (consistent per table)
  - Foreign Keys: ALWAYS with ON DELETE CASCADE or SET NULL
  - Timestamps: created_at, updated_at on all tables (auto-managed)
  - User Isolation: user_id foreign key on ALL user-owned resources

Migrations:
  - Tool: Alembic (FastAPI) or Prisma (Next.js alternative)
  - Naming: {timestamp}_{action}_{table}.py (e.g., 20250101_create_tasks.py)
  - Reversibility: Every migration must have downgrade()
  - Testing: Test migrations on empty DB before commit

Queries:
  - ORM Only: SQLModel queries (no raw SQL except complex joins)
  - Indexing: user_id, status, created_at on frequently filtered columns
  - Pagination: Limit 50 per page, offset-based or cursor-based
  - N+1 Prevention: Use joinedload/selectinload for relationships
```

### 3.4 Frontend Standards
```yaml
Component Structure:
  - Pattern: Functional components only (no class components)
  - Hooks: useState, useEffect, useContext (no Redux in Phase II-III)
  - File Naming: PascalCase for components (TaskList.tsx), camelCase for utils (api.ts)
  - Folder Structure: /components (reusable), /app (pages), /lib (utilities)

Design & UI Implementation Strategy:
  - Source of Truth: The /design directory contains the canonical UI definitions.
  - Mapping: Folders named [component]_[variant] (e.g., dashboard_-_task_list_1) map to React components.
  - Variants:
      - _1 suffix: Light Mode (Default)
      - _2 suffix: Dark Mode (Must implement via Tailwind dark: prefix)
  - Fidelity:
      - Structure: Adapt code.html from the design folder into Next.js 16/React components.
      - Visuals: The result MUST visually match screen.png.
      - Tech Stack: Use Next.js 16 App Router as specified in Section 2.2.

Styling:
  - Framework: Tailwind CSS
  - Classes: Utility-first (no custom CSS files)
  - Responsive: Mobile-first (sm:, md:, lg: breakpoints)
  - Dark Mode: REQUIRED (Must match _2 folder variants)

State Management:
  - Phase II-III: React Context + hooks
  - Phase IV-V: Consider Zustand if state complexity grows
  - Server State: React Query (optional, recommended for caching)

Accessibility:
  - Semantic HTML: <button>, <input>, <nav> (not <div> everywhere)
  - ARIA Labels: On interactive elements without text
  - Keyboard Nav: Tab order, Enter to submit, Escape to close modals
```

### 3.5 Testing Standards
```yaml
Backend (FastAPI):
  - Framework: pytest
  - Coverage: 80%+ on business logic (models, routes, MCP tools)
  - Fixtures: Database fixtures for test isolation
  - Mocking: Mock external APIs (Gemini, Kafka) in unit tests

Frontend (Next.js):
  - Framework: Jest + React Testing Library
  - Coverage: 70%+ on components with logic
  - Tests: Render tests, user interaction tests
  - Mocking: Mock API calls with MSW (Mock Service Worker)

Integration Tests:
  - API Tests: Test FastAPI endpoints with TestClient
  - E2E Tests: Playwright (optional bonus) for full user flows
```

---

## 4. Spec-Driven Workflow Standards

### 4.1 Specification Structure
Every feature MUST have a spec in `/specs/{feature}/spec.md`:
```markdown
# Feature: {Feature Name}

## User Stories
- As a {role}, I can {action}, so that {benefit}

## Acceptance Criteria
- [ ] Criterion 1 (testable)
- [ ] Criterion 2 (testable)

## Technical Requirements
- API endpoints
- Database schema changes
- UI components

## Testing Requirements
- Unit tests for {components}
- Integration tests for {workflows}

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Tests passing (80%+ coverage)
- [ ] Code reviewed (self-review with Gemini)
- [ ] Deployed and verified
```

### 4.2 Task Breakdown Standards
Every spec generates `/specs/{feature}/tasks.md`:
```markdown
# Tasks: {Feature Name}

## T-001: {Task Title}
**Dependencies**: None  
**Estimated Effort**: 30 minutes  
**Artifacts**: /backend/models.py, /backend/routes/tasks.py

**Description**: Create SQLModel Task model with fields...

**Acceptance**:
- [ ] Task model defined with all required fields
- [ ] Migration created and tested
- [ ] Unit tests for model validation

**Implementation Notes**:
- Use UUID for task IDs
- Add composite index on (user_id, status)
```

### 4.3 Gemini CLI Interaction Standards
```yaml
Context Loading:
  - Every session starts with: "Read @GEMINI.md for project context"
  - Reference specs: "Implement @specs/features/task-crud.md"
  - Reference tasks: "Complete T-001 from @specs/features/tasks.md"

Prompt Structure:
  - Clear: "Create a FastAPI endpoint for POST /api/{user_id}/tasks"
  - Specific: "Use SQLModel, validate title length 1-200 chars, return 201 with task object"
  - Testable: "Generate pytest test for invalid title (empty string)"

Iteration Loop:
  - Generate → Review → Refine → Test → Commit
  - Maximum 3 iterations per task before stopping to refine spec
  - Document all prompts in /specs/history/prompts/{date}.md
```

---

## 5. Architectural Standards

### 5.1 Stateless Services (Phase III+)
```yaml
Requirement: NO in-memory state on server

Bad (Stateful):
  conversations = {}  # Loses data on restart
  
Good (Stateless):
  # Store in Neon DB
  conversation = await db.get_conversation(conv_id)
  # OR store in Dapr state
  conversation = await dapr.get_state("statestore", f"conv-{conv_id}")

Why: Horizontal scaling, fault tolerance, Kubernetes-native
```

### 5.2 Event-Driven Architecture (Phase V)
```yaml
Pattern: Command-Event Separation

Command (REST API):
  POST /api/{user_id}/tasks → Creates task → Returns 201
  
Event (Kafka):
  task-events topic → {"event_type": "created", "task_id": 1, "user_id": "..."} 
  
Consumers:
  - Recurring Task Service: Listens for "completed", spawns next occurrence
  - Notification Service: Listens for "reminder_due", sends notification
  - Audit Service: Listens for ALL events, writes audit log

Benefits:
  - Loose coupling
  - Async processing
  - Independent scaling per service
```

### 5.3 Monorepo Structure (Phase II+)
```
hackathon-todo/
├── .spec-kit/            # Spec-Kit Plus config
├── specs/                # All specifications
│   ├── features/         # Feature specs
│   ├── api/              # API specs
│   ├── database/         # Schema specs
│   └── history/          # Prompt history
├── GEMINI.md             # Root context file
├── frontend/             # Next.js app
│   ├── GEMINI.md         # Frontend-specific context
│   └── ...
├── backend/              # FastAPI app
│   ├── GEMINI.md         # Backend-specific context
│   └── ...
├── docker-compose.yml    # Local multi-container setup
└── README.md             # Setup instructions
```

---

## 6. Security & Compliance Standards

### 6.1 Authentication & Authorization
```yaml
JWT Tokens:
  - Secret: BETTER_AUTH_SECRET (env var, NEVER committed)
  - Algorithm: HS256
  - Expiry: 7 days
  - Claims: user_id, email, issued_at, expires_at

User Isolation:
  - EVERY database query MUST filter by authenticated user_id
  - NEVER trust user_id from URL path without JWT validation
  - Example:
    ❌ Bad: SELECT * FROM tasks WHERE user_id = {url_user_id}
    ✅ Good: SELECT * FROM tasks WHERE user_id = {jwt_claims.user_id}

API Security:
  - CORS: Whitelist frontend domains only
  - Rate Limiting: 100 req/min per user (via middleware)
  - Input Validation: Pydantic models validate ALL inputs
  - SQL Injection: NEVER raw SQL, always ORM
```

### 6.2 Environment Variables
```yaml
Required:
  - DATABASE_URL: Neon connection string
  - BETTER_AUTH_SECRET: JWT signing key
  - GEMINI_API_KEY: Gemini 2.5 Flash API key
  - KAFKA_BROKERS: Redpanda/Kafka connection (Phase V)
  - DAPR_HTTP_PORT: 3500 (default, Phase V)

Management:
  - Local: .env file (NEVER committed, in .gitignore)
  - Production: Kubernetes Secrets OR Dapr Secrets
  - Access: Via os.getenv() in Python, process.env in Node.js
```

### 6.3 Secrets Management
```yaml
Phase II-III:
  - Kubernetes Secrets (if deployed locally)
  - Environment variables (local dev)

Phase V:
  - Dapr Secrets API (abstracts K8s, Azure Key Vault, AWS Secrets Manager)
  - Example:
    secret = await dapr.get_secret("kubernetes-secrets", "gemini-api-key")
```

---

## 7. Deployment Standards

### 7.1 Containerization (Phase IV+)
```yaml
Dockerfile:
  - Multi-stage builds: builder → runtime
  - Base images: python:3.13-slim, node:20-alpine
  - Dependencies: Install in builder stage, copy to runtime
  - Security: Non-root user, minimal attack surface
  - Health checks: HEALTHCHECK command in Dockerfile

Docker Compose (Local):
  - Services: frontend, backend, postgres, kafka (optional)
  - Networks: Internal bridge network
  - Volumes: Named volumes for persistence
  - Ports: Expose only necessary ports (3000, 8000)
```

### 7.2 Kubernetes Manifests (Phase IV+)
```yaml
Required Resources:
  - Deployment: frontend, backend, mcp-server (Phase III+)
  - Service: ClusterIP for internal, LoadBalancer for external
  - ConfigMap: Non-sensitive config (API URLs, feature flags)
  - Secret: Sensitive config (DB password, API keys)
  - Ingress: (Optional) For custom domain

Helm Chart Structure:
  - Chart.yaml: Metadata
  - values.yaml: Configurable parameters
  - templates/: K8s manifests with Go templating
  - templates/NOTES.txt: Post-install instructions

Resource Limits:
  - Frontend: 256Mi memory, 100m CPU
  - Backend: 512Mi memory, 250m CPU
  - Postgres: 1Gi memory, 500m CPU (adjust for load)
```

### 7.3 CI/CD Pipeline (Phase V)
```yaml
GitHub Actions Workflow:
  - Trigger: On push to main, on PR to main
  - Jobs:
    1. Lint: ESLint, Ruff
    2. Test: pytest, Jest (80%+ coverage gate)
    3. Build: Docker images
    4. Deploy: kubectl apply (staging → production)

Environments:
  - Staging: Auto-deploy on main branch
  - Production: Manual approval gate

Secrets:
  - GitHub Secrets: KUBECONFIG, DOCKER_USERNAME, DOCKER_PASSWORD
  - Access in workflow: ${{ secrets.KUBECONFIG }}
```

---

## 8. Monitoring & Observability (Optional Bonus)

### 8.1 Logging Standards
```yaml
Format: Structured JSON logs

Python (FastAPI):
  import logging
  logger.info("Task created", extra={"user_id": "...", "task_id": 1})

TypeScript (Next.js):
  console.log(JSON.stringify({level: "info", msg: "Task created", user_id: "..."}))

Aggregation:
  - Local: Docker logs (docker-compose logs)
  - Production: Loki + Promtail (optional bonus)
```

### 8.2 Metrics (Optional Bonus)
```yaml
Prometheus Metrics:
  - API Latency: Histogram (request_duration_seconds)
  - Error Rate: Counter (errors_total)
  - Active Users: Gauge (active_users)

Grafana Dashboard:
  - Panels: API response times, error rates, task creation rate
```

---

## 9. Documentation Standards

### 9.1 README.md (Required)
Must include:
```markdown
# Evolution of Todo - Hackathon Project

## Overview
Brief description of the project and architecture

## Prerequisites
- Python 3.13+, Node.js 20+, Docker, Minikube (Phase IV+)

## Setup Instructions
1. Clone repo
2. Install dependencies
3. Set environment variables
4. Run migrations
5. Start services

## Running Locally
- Frontend: npm run dev
- Backend: uvicorn main:app --reload
- Full stack: docker-compose up

## Running Tests
- Backend: pytest
- Frontend: npm test

## Deployment
- Minikube: kubectl apply -f k8s/
- Cloud: (instructions for DigitalOcean/Oracle)

## Architecture Diagram
(Link to diagram or inline ASCII art)

## API Documentation
Link to /docs (FastAPI auto-generated)
```

### 9.2 GEMINI.md (Required)
```markdown
# Project Context for Gemini CLI

## Overview
Evolution of Todo - AI-Native full-stack application

## Tech Stack
- Frontend: Next.js 16+, TypeScript, Tailwind
- Backend: FastAPI, SQLModel, Neon PostgreSQL
- AI: Gemini 2.5 Flash, MCP Server
- Cloud: Kubernetes, Dapr, Kafka (Phase V)

## Development Workflow
1. Read spec: @specs/features/{feature}.md
2. Break into tasks: @specs/features/tasks.md
3. Implement: Generate code via Gemini CLI
4. Test: Run pytest/Jest
5. Commit: Conventional commits

## Key Files
- Constitution: @specs/constitution.md
- API Specs: @specs/api/
- Database Schema: @specs/database/schema.md

## Commands
- Backend: uvicorn main:app --reload
- Frontend: npm run dev
- Tests: pytest, npm test
```

### 9.3 Inline Documentation
```yaml
Python:
  - Docstrings: Google style on all public functions
  - Type hints: On all function parameters and returns
  - Comments: Only for "why", not "what"

TypeScript:
  - JSDoc: On complex functions
  - Type annotations: On all function parameters
  - Comments: Only for non-obvious logic
```

---

## 10. Submission Requirements

### 10.1 GitHub Repository Structure
```
hackathon-todo/
├── specs/                # ALL specification files
│   ├── constitution.md   # This file
│   ├── features/         # Feature specs
│   ├── api/              # API specs
│   ├── database/         # Schema specs
│   └── history/          # Prompt history (CRITICAL for judges)
├── GEMINI.md             # Root context
├── frontend/
├── backend/
├── k8s/                  # Kubernetes manifests (Phase IV+)
├── .github/workflows/    # CI/CD (Phase V)
├── docker-compose.yml
└── README.md
```

### 10.2 Demo Video (Max 90 seconds)
Must show:
1. Spec-driven workflow (10s): "Here's my spec → Gemini generates code"
2. Working features (40s): Task CRUD, chatbot, Kubernetes deployment
3. Architecture highlight (20s): Show event-driven flow or Dapr integration
4. Results (20s): "All 5 phases complete, tests passing, deployed"

Tools: NotebookLM (AI narration) OR screen recording with voiceover

### 10.3 Live Presentation (If Invited)
Prepare to show:
- Spec files and prompt history (judges review this)
- Working application (live demo)
- Architecture diagram (event-driven, stateless)
- Challenges and solutions

---

## 11. Success Criteria (Definition of Done)

### 11.1 Phase I (Console App)
- [ ] All 5 Basic features implemented (Add, Delete, Update, View, Mark Complete)
- [ ] Spec files in `/specs/` with constitution, specify, plan, tasks
- [ ] Code generated via Gemini CLI (prompt history documented)
- [ ] pytest tests with 80%+ coverage
- [ ] Clean Python project structure with UV

### 11.2 Phase II (Full-Stack Web)
- [ ] All Phase I features + web interface
- [ ] Next.js frontend with Tailwind CSS
- [ ] FastAPI backend with SQLModel
- [ ] Neon PostgreSQL database
- [ ] Better Auth with JWT (user isolation working)
- [ ] RESTful API with proper status codes
- [ ] Deployed frontend (Vercel) + backend (Railway/Render)

### 11.3 Phase III (AI Chatbot)
- [ ] All Phase II features + conversational interface
- [ ] Custom chat UI (React components)
- [ ] Gemini 2.5 Flash integration
- [ ] MCP server with 5 tools (add_task, list_tasks, complete_task, delete_task, update_task)
- [ ] Stateless chat endpoint (conversation state in DB)
- [ ] Natural language task management working

### 11.4 Phase IV (Local Kubernetes)
- [ ] All Phase III features + Kubernetes deployment
- [ ] Dockerfiles for frontend, backend, MCP server
- [ ] Helm charts for deployment
- [ ] Minikube local deployment working
- [ ] Health checks on all services
- [ ] Used kubectl-ai/kagent for manifest generation

### 11.5 Phase V (Cloud-Native Event-Driven)
- [ ] All Phase IV features + advanced features
- [ ] Intermediate features (Priorities, Tags, Search, Filter, Sort)
- [ ] Advanced features (Recurring Tasks, Due Dates, Reminders)
- [ ] Kafka event streaming (Redpanda Cloud OR Strimzi)
- [ ] Dapr integration (Pub/Sub, State, Jobs API)
- [ ] Deployed to cloud (Oracle OKE OR DigitalOcean DOKS)
- [ ] CI/CD pipeline (GitHub Actions)

---

## 12. Bonus Points Criteria

### 12.1 Reusable Intelligence (+200 pts)
- [ ] Created Gemini CLI Subagents (specialized agents)
- [ ] Created Agent Skills (reusable prompts/workflows)
- [ ] Documented in `/specs/intelligence/`

### 12.2 Cloud-Native Blueprints (+200 pts)
- [ ] Created Agent Skills for infrastructure deployment
- [ ] Spec-driven Kubernetes manifest generation
- [ ] Documented in `/specs/blueprints/`

### 12.3 Multi-language Support (+100 pts)
- [ ] Chatbot supports Urdu language
- [ ] i18n setup (react-intl OR next-i18next)
- [ ] Gemini API supports Urdu queries

### 12.4 Voice Commands (+200 pts)
- [ ] Voice input for todo commands (Web Speech API)
- [ ] Speech-to-text with Gemini API
- [ ] Voice output (Text-to-Speech)

---

## 13. Common Pitfalls to Avoid

### 13.1 Spec-Driven Violations
❌ **Writing code manually** → Disqualification from max points  
✅ **All code via Gemini CLI** → Document prompts in `/specs/history/`

❌ **Skipping specification phase** → Unstructured development  
✅ **Constitution → Specify → Plan → Tasks → Implement** → Traceability

❌ **Vague acceptance criteria** → "Task should work well"  
✅ **Testable criteria** → "Task creation returns 201, stores in DB, user_id matches JWT"

### 13.2 Architecture Violations
❌ **Stateful chat server** → Loses data on restart  
✅ **Stateless with DB persistence** → Kubernetes-native

❌ **Tight coupling** → FastAPI directly imports Kafka client  
✅ **Dapr abstraction** → FastAPI calls Dapr HTTP API

❌ **Direct database queries without user_id filter** → Security vulnerability  
✅ **User isolation on ALL queries** → Filter by JWT claims

### 13.3 Deployment Violations
❌ **Hardcoded secrets in Dockerfiles** → Security risk  
✅ **Environment variables + K8s Secrets** → Secure

❌ **No resource limits on pods** → OOM kills  
✅ **Memory/CPU limits on all pods** → Stable

---

## 14. Review Checklist (Before Submission)

Use this checklist to verify constitution compliance:

### Code Quality
- [ ] All code generated via Gemini CLI (no manual coding)
- [ ] Prompt history documented in `/specs/history/`
- [ ] Tests passing with 80%+ coverage
- [ ] Zero linting errors (ESLint, Ruff)
- [ ] Type safety enforced (TypeScript strict, Python type hints)

### Architecture
- [ ] Stateless services (Phase III+)
- [ ] User isolation on all API endpoints
- [ ] JWT authentication working
- [ ] Event-driven architecture (Phase V)
- [ ] Dapr integration (Phase V)

### Documentation
- [ ] README.md with setup instructions
- [ ] GEMINI.md with project context
- [ ] Spec files in `/specs/` (constitution, features, api, database)
- [ ] Architecture diagram (ASCII art OR image)

### Deployment
- [ ] Dockerfiles with multi-stage builds
- [ ] Kubernetes manifests (Helm charts preferred)
- [ ] Deployed frontend + backend (Phase II+)
- [ ] Cloud deployment (Phase V)

### Submission
- [ ] Public GitHub repository
- [ ] Demo video (max 90 seconds)
- [ ] Deployed app links (Vercel, Railway, DOKS)
- [ ] WhatsApp number for live presentation invite

---

## 15. Version History

| Version | Date       | Changes                          |
|---------|------------|----------------------------------|
| 1.1.0   | 2025-12-30 | Added UI design folder standards |
| 1.0.0   | 2025-12-30 | Initial constitution created     |

---

## Appendix: Constitution vs Specification

**Constitution (This File)**:
- **Scope**: ALL phases, ALL features
- **Purpose**: Quality standards, tech stack, principles
- **Examples**: "All code via Gemini CLI", "80%+ test coverage", "JWT required on ALL endpoints"

**Specification (Per Feature)**:
- **Scope**: ONE feature (e.g., "Task CRUD")
- **Purpose**: User stories, acceptance criteria, technical requirements
- **Examples**: "As a user, I can create a task with title and description", "POST /api/{user_id}/tasks returns 201"

**Key Difference**: Constitution is the **rulebook**, Specification is the **blueprint**.

---

**End of Constitution**  
**Next Step**: Run `gemini "Read @constitution.md and confirm you understand the project standards"`