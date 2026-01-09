# Tasks: Phase IV Local Kubernetes Deployment

**Feature**: Local Kubernetes Deployment
**Status**: Pending
**Phase**: 4

## Phase 1: Setup
*Goal: Prepare the environment for deployment development.*

- [ ] T001 Verify Minikube, Docker, and Helm installation and project root structure
- [ ] T002 Initialize `k8s/` directory structure

## Phase 2: Foundational Tasks
*Goal: Ensure code readiness for containerization.*

- [ ] T003 Verify `backend/` and `frontend/` source code presence and structure
- [ ] T004 [P] Ensure `backend/requirements.txt` and `frontend/package.json` are up to date

## Phase 3: User Story 1 - Containerization
*Goal: Create optimized Docker images for all services.*
*Story: [US1] Containerize Application*

- [ ] T005 [US1] Create `backend/Dockerfile` with multi-stage build (Python 3.13-slim, non-root)
- [ ] T006 [US1] Create `frontend/Dockerfile` with multi-stage build (Node 20-alpine, non-root)
- [ ] T007 [US1] Create `mcp-server/Dockerfile` (or `backend/Dockerfile.mcp`) for MCP service
- [ ] T008 [US1] Build and tag images in Minikube (`eval $(minikube docker-env)`)

## Phase 4: User Story 2 - Orchestration
*Goal: Define Kubernetes resources via Helm.*
*Story: [US2] Helm Chart Creation*

- [ ] T009 [US2] Initialize Helm chart at `k8s/helm/todo-app/Chart.yaml`
- [ ] T010 [US2] Define values in `k8s/helm/todo-app/values.yaml` (images, replicas, resources)
- [ ] T011 [US2] Create ConfigMap template `k8s/helm/todo-app/templates/configmap.yaml`
- [ ] T012 [US2] Create Secret template `k8s/helm/todo-app/templates/secret.yaml`
- [ ] T013 [P] [US2] Create Backend Deployment/Service `k8s/helm/todo-app/templates/backend.yaml`
- [ ] T014 [P] [US2] Create Frontend Deployment/Service `k8s/helm/todo-app/templates/frontend.yaml`
- [ ] T015 [P] [US2] Create MCP Deployment/Service `k8s/helm/todo-app/templates/mcp.yaml`

## Phase 5: User Story 3 - Deployment & Verification
*Goal: Deploy to Minikube and verify functionality.*
*Story: [US3] Deploy and Verify*

- [ ] T016 [US3] Implement `/health` endpoints in `backend/main.py` and `frontend/app/api/health/route.ts` (if missing)
- [ ] T017 [US3] Deploy Chart: `helm install todo-app k8s/helm/todo-app -n hackathon-todo --create-namespace`
- [ ] T018 [US3] Verify Pods: `kubectl get pods -n hackathon-todo` (Expect 3/3 Running)
- [ ] T019 [US3] Verify Connectivity: `minikube service todo-frontend -n hackathon-todo`

## Phase 6: User Story 4 - AIOps Integration
*Goal: Demonstrate AI-assisted operations.*
*Story: [US4] AIOps*

- [ ] T020 [US4] Generate a test manifest using `kubectl-ai` (e.g., "create a pod that curls the backend")
- [ ] T021 [US4] Analyze cluster health using `kagent` commands and log output

## Phase 7: Polish & Documentation
*Goal: Finalize documentation for handoff.*

- [ ] T022 Update `README.md` with Minikube deployment steps
- [ ] T023 Update `specs/004-local-k8s-deploy/quickstart.md` with verification commands

## Dependencies

- US1 (Containerization) -> US2 (Orchestration) -> US3 (Deployment)
- US4 (AIOps) depends on US3
- US5 (Docs) depends on all

## Parallel Execution

- T005 (Backend Docker), T006 (Frontend Docker) can be done in parallel.
- T013, T014, T015 (Helm Templates) can be done in parallel.
