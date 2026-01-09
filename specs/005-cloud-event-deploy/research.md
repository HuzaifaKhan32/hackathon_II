# Phase 0: Research & Architecture Decisions

**Feature**: Phase V Cloud-Native Event-Driven
**Date**: 2026-01-07

## 1. Message Broker: Kafka (Redpanda)

**Decision**: Use **Redpanda** (Kafka-compatible) deployed via Helm.

**Rationale**:
- **Performance**: High throughput, low latency.
- **Compatibility**: Works with standard Kafka Dapr component.
- **Resource Efficient**: Single binary, lighter than JVM-based Kafka (crucial for trial clusters).

**Alternatives Considered**:
- *RabbitMQ*: Good for queuing, but Kafka is better for event streaming and log replay.
- *Redis Streams*: Simple, but less durable/scalable for "enterprise" eventing patterns.

## 2. Integration Pattern: Dapr Pub/Sub

**Decision**: Use **Dapr Pub/Sub** abstraction instead of direct Kafka clients.

**Rationale**:
- **Decoupling**: App code doesn't know it's using Kafka. Can switch to Redis/ServiceBus later.
- **Standardization**: Unified API for publishing/subscribing across languages.
- **Sidecar**: Handles retries, tracing, and mTLS automatically.

**Implementation**:
- **Pub**: `dapr_client.publish_event("pubsub", "task-events", data)`
- **Sub**: FastAPI route decorated with `@app.post("/events/task-completed")`.

## 3. Scheduled Tasks: Dapr Jobs API

**Decision**: Use **Dapr Jobs API** (Alpha/Beta features) for Reminders.

**Rationale**:
- **Distributed**: No single point of failure (unlike a single cron pod).
- **Integrated**: Triggers sidecar to call app on schedule.

**Alternatives Considered**:
- *Kubernetes CronJob*: Good for batch scripts, not for "remind user X at specific time Y".
- *Celery/BullMQ*: Adds another worker queue system. Dapr unifies this.

## 4. Microservices Boundaries

**Decision**: Split into **Core API** (Synchronous) and **Async Consumers** (Background).

**Services**:
1. **Core API (Backend)**: User-facing, CRUD, publishes events.
2. **Recurring Service**: Listens to `task-events`, creates new tasks.
3. **Notification Service**: Listens to `reminders` (from Jobs), sends emails/logs.

**Rationale**:
- **Scalability**: Can scale consumers independently of API.
- **Isolation**: Heavy background processing doesn't slow down user requests.

## 5. Cloud Provider: DigitalOcean DOKS

**Decision**: Use **DigitalOcean Kubernetes (DOKS)**.

**Rationale**:
- **Simplicity**: Easier setup than Oracle OKE or AWS EKS.
- **Cost**: Predictable pricing, valid for trial credits.
- **Performance**: Good enough for hackathon scale.

## 6. CI/CD Strategy: Push-to-Main

**Decision**: **Push-to-Main** triggers deployment to **Staging/Prod**.

**Rationale**:
- **Velocity**: Fast iteration for hackathon.
- **Simplicity**: No complex GitFlow.

**Pipeline Steps**:
1. Checkout
2. Lint & Test
3. Build & Push Docker Images (GHCR)
4. Update K8s Manifests (Helm Upgrade)
