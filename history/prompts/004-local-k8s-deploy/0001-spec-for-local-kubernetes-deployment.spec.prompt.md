---
id: 0001
title: Spec for Local Kubernetes Deployment
stage: spec
date: 2026-01-07
surface: agent
model: gemini-2.0-flash-exp
feature: 004-local-k8s-deploy
branch: 004-local-k8s-deploy
user: huzaifa_nadeem
command: /sp.specify
labels: ["kubernetes", "minikube", "helm"]
links:
  spec: specs/004-local-k8s-deploy/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-local-k8s-deploy/spec.md
  - specs/004-local-k8s-deploy/checklists/requirements.md
tests:
  - null
---

## Prompt

Phase IV: Local Kubernetes Deployment with Minikube and Helm Project Context: Phase IV of Evolution of Todo hackathon. Deploys the Phase III chatbot on local Kubernetes using Minikube and Helm charts. Containerizes all services (frontend, backend, MCP server) and orchestrates them with Kubernetes. Uses AIOps tools (kubectl-ai, kagent, Gordon) for AI-assisted deployment. Target Audience: - Hackathon judges evaluating cloud-native architecture - DevOps engineers learning Kubernetes and Helm - Developers preparing for cloud deployment (Phase V) Intent: Containerize the full-stack chatbot application and deploy it on a local Kubernetes cluster (Minikube). Use Helm charts for deployment management, Docker for containerization, and AIOps tools for AI-assisted Kubernetes operations. Core Features (Phase III + Kubernetes Deployment): 1. Dockerfiles - Multi-stage builds for frontend, backend, MCP server 2. Helm Charts - Package manager for Kubernetes deployment 3. Minikube Cluster - Local Kubernetes cluster for testing 4. Health Checks - Liveness and readiness probes on all services 5. AIOps Integration - Use kubectl-ai/kagent/Gordon for AI-assisted operations Success Criteria (SMART): - All services containerized with working Dockerfiles - Docker images built and tagged correctly (e.g., todo-frontend:v1.0.0) - Helm chart created with templates for Deployment, Service, ConfigMap, Secret - Application deployed on Minikube and accessible via port-forward or NodePort - All 3 services (frontend, backend, MCP server) running in Kubernetes pods - Health checks working (liveness and readiness probes return 200) - Services can communicate within cluster (backend → MCP server, frontend → backend) - Database connection working (backend → Neon PostgreSQL external service) - Secrets managed via Kubernetes Secrets (not hardcoded in images) - Resource limits set on all pods (memory, CPU) - All Phase III features working in Kubernetes deployment - kubectl-ai/kagent used to generate at least 2 Kubernetes manifests - Gordon used to generate at least 1 Dockerfile (if available) - README includes Minikube setup and deployment instructions - All code generated via Gemini CLI (prompt history documented) Technical Stack (from Constitution): Containerization: - Base Images: python:3.13-slim, node:20-alpine - Multi-stage Builds: Required for production images (builder + runtime stages) - Health Checks: /health endpoint on all services (returns 200 OK) - Secrets: Kubernetes Secrets (NOT env files in images) Orchestration: - Platform: Minikube (Kubernetes 1.28+) - Namespace: hackathon-todo - Package Manager: Helm Charts - Resource Limits: Set memory/CPU on all pods AIOps Tools: - Docker AI (Gordon): For Dockerfile generation (if available) - kubectl-ai: For Kubernetes manifest generation - kagent: For cluster health analysis Dockerfile Structure (Multi-stage): Frontend Dockerfile (Next.js): # Stage 1: Dependencies FROM node:20-alpine AS deps WORKDIR /app COPY package*.json ./ RUN npm ci # Stage 2: Builder FROM node:20-alpine AS builder WORKDIR /app COPY --from=deps /app/node_modules ./node_modules COPY . . RUN npm run build # Stage 3: Runtime FROM node:20-alpine AS runner WORKDIR /app ENV NODE_ENV=production COPY --from=builder /app/public ./public COPY --from=builder /app/.next/standalone ./ COPY --from=builder /app/.next/static ./.next/static EXPOSE 3000 CMD ["node", "server.js"] Backend Dockerfile (FastAPI): # Stage 1: Builder FROM python:3.13-slim AS builder WORKDIR /app RUN pip install uv COPY pyproject.toml uv.lock ./ RUN uv sync --frozen # Stage 2: Runtime FROM python:3.13-slim AS runtime WORKDIR /app COPY --from=builder /app/.venv /app/.venv COPY . . ENV PATH="/app/.venv/bin:$PATH" EXPOSE 8000 HEALTHCHECK --interval=30s CMD curl -f http://localhost:8000/health || exit 1 CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] Helm Chart Structure: hackathon-todo-chart/ ├── Chart.yaml # Metadata (name, version, description) ├── values.yaml # Configurable parameters ├── templates/ │ ├── deployment.yaml # Deployment for frontend, backend, mcp │ ├── service.yaml # Service (ClusterIP or NodePort) │ ├── configmap.yaml # Non-sensitive config (API URLs, feature flags) │ ├── secret.yaml # Sensitive config (DB password, API keys) │ └── NOTES.txt # Post-install instructions Kubernetes Resources: Deployment (Backend Example): apiVersion: apps/v1 kind: Deployment metadata: name: todo-backend namespace: hackathon-todo spec: replicas: 2 selector: matchLabels: app: todo-backend template: metadata: labels: app: todo-backend spec: containers: - name: backend image: todo-backend:v1.0.0 ports: - containerPort: 8000 env: - name: DATABASE_URL valueFrom: secretKeyRef: name: todo-secrets key: database-url resources: requests: memory: "256Mi" cpu: "100m" limits: memory: "512Mi" cpu: "250m" livenessProbe: httpGet: path: /health port: 8000 initialDelaySeconds: 10 periodSeconds: 30 readinessProbe: httpGet: path: /health port: 8000 initialDelaySeconds: 5 periodSeconds: 10 Service (ClusterIP): apiVersion: v1 kind: Service metadata: name: todo-backend namespace: hackathon-todo spec: type: ClusterIP selector: app: todo-backend ports: - protocol: TCP port: 8000 targetPort: 8000 Secret: apiVersion: v1 kind: Secret metadata: name: todo-secrets namespace: hackathon-todo type: Opaque data: database-url: <base64-encoded-neon-connection-string> gemini-api-key: <base64-encoded-gemini-key> better-auth-secret: <base64-encoded-auth-secret> Minik

## Response snapshot

Created feature branch `004-local-k8s-deploy`, spec file, and checklist. Ready for validation and planning.

## Outcome

- ✅ Impact: Feature specified and documented.
- 🧪 Tests: N/A
- 📁 Files: 2 files created.
- 🔁 Next prompts: /sp.clarify
- 🧠 Reflection: Specification created with AI assistance.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None