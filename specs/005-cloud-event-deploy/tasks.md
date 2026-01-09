# Tasks: Phase V Cloud-Native Event-Driven

**Feature**: Cloud-Native Event-Driven Deployment
**Status**: Pending
**Spec**: [specs/005-cloud-event-deploy/spec.md](specs/005-cloud-event-deploy/spec.md)
**Plan**: [specs/005-cloud-event-deploy/plan.md](specs/005-cloud-event-deploy/plan.md)

## Phase 1: Setup & Foundational
*Goal: Prepare the database and local development environment for advanced features and Dapr.*

- [ ] T001 Install Dapr CLI and initialize local environment in `docs/setup.md`
- [ ] T002 Update `Task` model with priority, tags, due_date, recurrence in `backend/app/models/task.py`
- [ ] T003 Create Alembic migration script for new schema changes in `backend/alembic/versions/`
- [ ] T004 Define Dapr Pub/Sub component for local development in `components/local/pubsub.yaml`
- [ ] T005 Define Dapr State Store component for local development in `components/local/statestore.yaml`

## Phase 2: Advanced Features (US1)
*Goal: Implement Priorities, Tags, Search, and Recurrence logic.*
*Story: [US1] Advanced Task Management*

- [ ] T006 [US1] Update Backend Create/Update API to handle new fields in `backend/app/api/routes/tasks.py`
- [ ] T007 [US1] Implement search, filter, and sort logic in `backend/app/services/task_service.py`
- [ ] T008 [US1] [P] Update Frontend `Task` interface and API client in `frontend/src/lib/api/tasks.ts`
- [ ] T009 [US1] [P] Add Priority and Tags selectors to `frontend/src/components/EditTaskModal.tsx`
- [ ] T010 [US1] [P] Update `TaskList` to display Priority badges and Tags in `frontend/src/components/TaskList.tsx`
- [ ] T011 [US1] [P] Implement Filter and Sort controls in Dashboard in `frontend/src/app/dashboard/page.tsx`
- [ ] T012 [US1] [P] Implement Search input and state logic in `frontend/src/components/Dashboard.tsx`
- [ ] T013 [US1] Implement basic recurrence calculation logic (next date helper) in `backend/app/utils/recurrence.py`

## Phase 3: Event-Driven Architecture (US2)
*Goal: Decouple services using Kafka and Dapr, implementing consumers for background tasks.*
*Story: [US2] Event-Driven Architecture*

- [ ] T014 [US2] Integrate Dapr Client in Backend to publish events in `backend/app/core/events.py`
- [ ] T015 [US2] Publish `task.created` and `task.completed` events in `backend/app/api/routes/tasks.py`
- [ ] T016 [US2] Create Recurring Task Service skeleton in `consumers/recurring-task/main.py`
- [ ] T017 [US2] Implement `task.completed` subscriber to create next task in `consumers/recurring-task/subscriber.py`
- [ ] T018 [US2] Create Notification Service skeleton in `consumers/notification/main.py`
- [ ] T019 [US2] Implement Dapr Jobs API call for scheduling reminders in `backend/app/services/reminder_service.py`
- [ ] T020 [US2] Implement reminder job handler in `consumers/notification/worker.py`
- [ ] T021 [US2] Add Dapr sidecar configurations to `docker-compose.yml`

## Phase 4: Cloud Deployment (US3)
*Goal: Deploy the distributed system to a Cloud Kubernetes cluster.*
*Story: [US3] Cloud Deployment & CI/CD*

- [ ] T022 [US3] Create Terraform or CLI script for DOKS cluster creation in `infra/cloud/create-cluster.sh`
- [ ] T023 [US3] Create/Update Helm charts with Dapr annotations in `k8s/helm/todo-app-cloud/templates/`
- [ ] T024 [US3] Define Production Dapr Components (Kafka, State) in `k8s/helm/todo-app-cloud/components/`
- [ ] T025 [US3] Create GitHub Actions workflow for building consumers and deploying to DOKS in `.github/workflows/ci-cd.yaml`
- [ ] T026 [US3] Verify production deployment and update `docs/deployment.md`

## Dependencies

- **US1** requires **T002, T003** (Schema)
- **US2** requires **T001** (Dapr Setup) and **T004** (PubSub)
- **US3** requires **US1, US2** completion

## Parallel Execution

- T008-T012 (Frontend) can run parallel to T006-T007 (Backend US1).
- T016 and T018 (Service Skeletons) can be created in parallel.
