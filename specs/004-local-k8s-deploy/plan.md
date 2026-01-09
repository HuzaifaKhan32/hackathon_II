# Implementation Plan: Phase IV Local Kubernetes Deployment

**Branch**: `004-local-k8s-deploy` | **Date**: 2026-01-07 | **Spec**: [specs/004-local-k8s-deploy/spec.md](specs/004-local-k8s-deploy/spec.md)
**Input**: Feature specification from `/specs/004-local-k8s-deploy/spec.md`

## Summary

This phase focuses on containerizing the Full-Stack Todo application and deploying it to a local **Minikube** cluster. It involves creating multi-stage **Dockerfiles** for the frontend, backend, and MCP server, and packaging them into a **Helm Chart** for declarative deployment. The deployment will include Deployments, Services, ConfigMaps, and Secrets, ensuring resource limits and health checks are configured.

## Technical Context

**Language/Version**: Helm 3+, Docker 24+, Kubernetes 1.28+ (Minikube)
**Primary Dependencies**: 
- **Tools**: `kubectl`, `minikube`, `helm`, `docker`
- **AIOps**: `kubectl-ai` (optional manifest gen), `kagent` (optional health)
**Storage**: Stateless pods; Data in external Neon PostgreSQL (via connection string)
**Testing**: `helm lint`, `helm test`, `kubectl port-forward` manual verification
**Target Platform**: Minikube (Local)
**Performance Goals**: Pod startup < 30s, Small image sizes (< 500MB)
**Constraints**: Run as non-root user. Strict resource limits.
**Scale/Scope**: 3 services (Frontend, Backend, MCP), 1 Namespace.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Spec-Driven**: Spec exists.
- [x] **Phase Progression**: Builds on Phase III.
- [x] **Technology Stack**: Docker, Helm, Minikube (Approved in Phase IV standards).
- [x] **Quality**: Health checks, non-root users required.
- [x] **Security**: Secrets for DB creds.

## Project Structure

### Documentation (this feature)

```text
specs/004-local-k8s-deploy/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── quickstart.md        # Phase 1 output (Deployment Guide)
└── checklist/           # Created by sp.checklist
    └── acceptance.md
```

### Source Code (repository root)

```text
k8s/
├── helm/
│   └── todo-app/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── templates/
│       │   ├── _helpers.tpl
│       │   ├── deployment-backend.yaml
│       │   ├── deployment-frontend.yaml
│       │   ├── service-backend.yaml
│       │   ├── service-frontend.yaml
│       │   ├── configmap.yaml
│       │   └── secret.yaml
│       └── tests/
│           └── connection-test.yaml

backend/
├── Dockerfile          # Multi-stage Python build

frontend/
├── Dockerfile          # Multi-stage Node.js build
```

**Structure Decision**: A dedicated `k8s/` directory for manifests/charts keeps deployment config separate from app code, cleaner than root-level charts.

## Design & UI Implementation Strategy

No UI changes. This is an infrastructure phase.
However, we must verify that the `UI` connects to the `API` correctly via the ClusterIP service DNS name when running inside the cluster (or relative paths if served via ingress, but we are using NodePort/Proxy for Phase IV).
*Constraint*: Frontend must use `NEXT_PUBLIC_API_URL` which might need to be configurable at runtime or build time. Since Next.js bakes env vars at build time, we might need a runtime config solution or just rebuild for K8s. *Decision*: We will bake the browser-accessible URL (e.g., localhost via port-forward) or use a sidecar/proxy. For Minikube `minikube service` exposes a node port, so we will document setting that env var.
