# Feature Specification: Cloud Native Event Driven Deployment

**Feature Branch**: `005-cloud-event-deploy`
**Created**: 2026-01-07
**Status**: Draft
**Input**: User description: "Phase V: Advanced Cloud-Native Event-Driven Deployment with Kafka and Dapr..."

## User Scenarios & Testing

### User Story 1 - Advanced Task Management (Priority: P1)

As a user, I want to manage tasks with advanced features like priorities, tags, and recurrence so that I can organize my work effectively.

**Why this priority**: Enhances the core application value proposition and user experience.

**Independent Test**: Can be tested via the UI/API by creating and manipulating tasks with these new attributes.

**Acceptance Scenarios**:

1. **Given** a task, **When** I set the priority to 'High', **Then** it is visually distinguished in the list and sortable by priority.
2. **Given** a recurring task (e.g., weekly), **When** I mark it as complete, **Then** the next occurrence is automatically created for the following week.
3. **Given** a task with a due date, **When** the due date approaches, **Then** a reminder notification is triggered.
4. **Given** a list of tasks with tags, **When** I filter by tag "Work", **Then** only tasks with the "Work" tag are displayed.

---

### User Story 2 - Event-Driven Architecture (Priority: P2)

As a developer, I want services to communicate asynchronously via Kafka and Dapr so that the system is decoupled, scalable, and resilient.

**Why this priority**: Fundamental architectural requirement for Phase V, enabling scalability and loosely coupled services.

**Independent Test**: Can be tested by publishing events to Kafka topics and verifying consumers process them correctly.

**Acceptance Scenarios**:

1. **Given** a task is created/updated/deleted, **When** the Backend publishes a `task-events` message, **Then** the Audit Service and Recurring Task Service consume and process the event.
2. **Given** a reminder is scheduled, **When** the due time arrives, **Then** the Dapr Jobs API triggers the Notification Service to send a notification.
3. **Given** the underlying message broker is changed (e.g., from Kafka to RabbitMQ), **When** Dapr configuration is updated, **Then** the application continues to function without code changes.

---

### User Story 3 - Cloud Deployment & CI/CD (Priority: P3)

As a DevOps engineer, I want an automated CI/CD pipeline and cloud deployment on Kubernetes so that changes are reliably delivered to production.

**Why this priority**: Ensures production readiness and efficient delivery lifecycle.

**Independent Test**: Can be tested by pushing code to the `main` branch and verifying deployment to the cloud cluster.

**Acceptance Scenarios**:

1. **Given** a code change is pushed to `main`, **When** the GitHub Actions workflow runs, **Then** it passes linting, testing, builds Docker images, and deploys to the OKE/DOKS cluster.
2. **Given** the application is running in the cloud, **When** I access the public endpoint, **Then** the application is fully functional.
3. **Given** a deployment update, **When** database migrations are required, **Then** they are executed automatically and safely.

---

### Edge Cases

- **Kafka Unreachable**: If the Kafka broker is temporarily unavailable, Dapr Pub/Sub MUST retry message delivery with exponential backoff to ensure eventual consistency.
- **Service Failure**: If the Recurring Task Service is down when a task completes, it MUST process the missed events upon restart (durable subscription).
- **Duplicate Events**: Consumers MUST handle duplicate events idempotently (e.g., ensuring a recurring task isn't created twice for the same completion event).
- **Dapr Sidecar Failure**: If the Dapr sidecar is not running, the application service SHOULD return a 503 Service Unavailable for operations requiring Dapr.

## Requirements

### Functional Requirements

- **FR-001**: System MUST support task Priorities (High, Medium, Low) and Tags, allowing filtering and sorting by these attributes.
- **FR-002**: System MUST implement Recurring Tasks (Daily, Weekly, Monthly) where completion of one instance triggers the creation of the next.
- **FR-003**: System MUST support Due Dates and Reminders, utilizing the Dapr Jobs API for scheduling notifications.
- **FR-004**: System MUST implement Search functionality to find tasks by keywords in title and description.
- **FR-005**: All inter-service communication MUST be asynchronous via Kafka topics (`task-events`, `reminders`, `task-updates`) abstracted by Dapr Pub/Sub.
- **FR-006**: System MUST utilize Dapr Components for Pub/Sub (Kafka), State Management (PostgreSQL), and Secrets (Kubernetes Secrets).
- **FR-007**: System MUST be deployed to a cloud Kubernetes provider (Oracle OKE or DigitalOcean DOKS).
- **FR-008**: System MUST have a CI/CD pipeline using GitHub Actions that runs linting, testing, image building, and deployment on push to `main`.
- **FR-009**: Backend API MUST publish events for all major task operations (create, update, delete, complete).
- **FR-010**: New microservices (Recurring Task Service, Notification Service) MUST be implemented to consume events and perform background logic.

### Key Entities

- **Task**: Enhanced with Priority, Tags, Due Date, and Recurrence Pattern.
- **Event**: A message representing a state change (e.g., `TaskCompleted`, `ReminderScheduled`).
- **Dapr Component**: Configuration defining infrastructure bindings (Pub/Sub, State Store).
- **Job**: A scheduled action managed by Dapr (e.g., a reminder).

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 8 Intermediate and Advanced features (Priorities, Tags, Search, Filter, Sort, Recurring Tasks, Due Dates, Reminders) are fully implemented and functional.
- **SC-002**: Recurring tasks automatically generate their next occurrence upon completion with 100% reliability.
- **SC-003**: Reminders are triggered within 1 minute of the scheduled time via the Dapr Jobs API.
- **SC-004**: Kafka topics (`task-events`, `reminders`, `task-updates`) are created and actively used for service communication.
- **SC-005**: At least 2 new consumer services (Recurring Task Service, Notification Service) are running and successfully processing events.
- **SC-006**: Dapr sidecars are running alongside all application pods (Backend, Frontend, Consumers) in the Kubernetes cluster.
- **SC-007**: The application is successfully deployed and accessible on a public cloud Kubernetes cluster (OKE or DOKS).
- **SC-008**: The CI/CD pipeline successfully deploys changes to the cloud environment upon a push to the `main` branch.
- **SC-009**: Test coverage for new advanced features reaches at least 80%.

## Assumptions & Constraints

- **Cloud Provider**: Utilization of Oracle Cloud Free Tier or DigitalOcean trial credit is assumed.
- **Kafka**: Managed Kafka (Redpanda Cloud) or self-hosted Strimzi on K8s will be used.
- **Dapr**: Dapr v1.12+ is required.
- **State**: Application state is managed via Dapr State Store (backed by PostgreSQL) or direct DB access where appropriate.