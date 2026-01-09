# Implementation Plan: Phase V Cloud-Native Event-Driven System

**Branch**: `005-cloud-event-deploy` | **Date**: 2026-01-07 | **Spec**: [specs/005-cloud-event-deploy/spec.md](specs/005-cloud-event-deploy/spec.md)
**Input**: Feature specification from `/specs/005-cloud-event-deploy/spec.md`

## Summary

This final phase evolves the application into a distributed, event-driven system deployed on the cloud. It introduces **Kafka** for asynchronous messaging and **Dapr** for building block abstractions (Pub/Sub, State, Jobs). The backend is refactored into microservices, including new **Recurring Task** and **Notification** services. The system is deployed to **DigitalOcean Kubernetes (DOKS)** via a **GitHub Actions** CI/CD pipeline.

## Technical Context

**Language/Version**: Python 3.13+ (Backend/Consumers), Node.js 20+ (Frontend)
**Primary Dependencies**: 
- **Runtime**: Dapr v1.12+ (Sidecars)
- **Messaging**: Kafka (Strimzi Operator or Redpanda)
- **Frameworks**: FastAPI, Dapr Python SDK
- **Infrastructure**: DigitalOcean DOKS, Helm, GitHub Actions
**Storage**: Neon PostgreSQL (Primary DB & Dapr State Store)
**Testing**: pytest (Unit/Integration), Dapr Testcontainers
**Target Platform**: DigitalOcean DOKS (Cloud)
**Performance Goals**: Event processing latency < 500ms, 99.9% Uptime
**Constraints**: Free tier/trial limits. Eventual consistency for background tasks.
**Scale/Scope**: 4+ Microservices, Distributed System.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: Spec exists.
- [x] **Phase Progression**: Builds on Phase IV.
- [x] **Technology Stack**: Kafka, Dapr, Cloud K8s (Approved).
- [x] **Quality**: CI/CD pipeline required.
- [x] **Architecture**: Event-driven, Microservices (Approved).

## Project Structure

### Documentation (this feature)

```text
specs/005-cloud-event-deploy/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (Schema additions)
├── contracts/           # Phase 1 output (Async API / Events)
│   └── asyncapi.yaml
├── quickstart.md        # Phase 1 output (Cloud Deploy Guide)
└── checklist/
    └── acceptance.md
```

### Source Code (repository root)

```text
backend/                # Core API (Producers)
consumers/              # New Microservices
├── recurring-task/     # Consumes task-completed
└── notification/       # Consumes reminders

k8s/
├── helm/
│   └── todo-app-cloud/ # Enhanced Chart with Dapr annotations
└── clusters/           # Cluster config (DOKS)

.github/
└── workflows/
    └── ci-cd.yaml      # Pipeline definition
```

**Structure Decision**: Add `consumers/` directory for worker services to separate them from the main API but keep in monorepo for shared code (models).

## Design & UI Implementation Strategy

- **Advanced UI**: Update `TaskList` to show Priorities (Badge colors) and Tags.
- **Filters**: Add Filter bar for Tags/Priority.
- **Search**: Add Search input in Dashboard.
- **Recurring**: Add "Recurrence" dropdown in `EditTaskModal`.
- **Dapr**: No UI impact directly, but "Notifications" might need a UI toast if we implement real-time push (out of scope for now, just email/log).

*Note*: We will use the existing Design System patterns for badges and filters.