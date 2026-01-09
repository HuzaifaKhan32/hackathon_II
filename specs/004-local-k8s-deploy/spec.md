# Feature Specification: Local Kubernetes Deployment

**Feature Branch**: `004-local-k8s-deploy`
**Created**: 2026-01-07
**Status**: Draft
**Input**: User description: "Phase IV: Local Kubernetes Deployment with Minikube and Helm..."

## User Scenarios & Testing

### Developer runs minikube start → cluster ready in 2 minutes

**Acceptance Scenarios**:
1. **Given** Minikube is not running, **When** the developer executes `minikube start --cpus=4 --memory=8192`, **Then** a local Kubernetes cluster named 'minikube' is started and ready for use within 2 minutes.

### Developer runs helm install → all pods start within 1 minute

**Acceptance Scenarios**:
1. **Given** a running Minikube cluster and the Helm chart is available, **When** the developer executes `helm install todo-app ./hackathon-todo-chart -n hackathon-todo`, **Then** all application pods (frontend, backend, MCP) are in a `Running` state within the `hackathon-todo` namespace within 1 minute.

### User accesses frontend via minikube service → app works as in Phase III

**Acceptance Scenarios**:
1. **Given** the application is deployed and all pods are running, **When** a user accesses the frontend service using `minikube service todo-frontend -n hackathon-todo`, **Then** the application is accessible via the browser and functions as expected in Phase III.

### Pod crashes → Kubernetes auto-restarts (liveness probe detects failure)

**Acceptance Scenarios**:
1. **Given** a pod is running and its liveness probe is configured, **When** the application within the pod becomes unresponsive or unhealthy, **Then** Kubernetes automatically detects the failure via the liveness probe and restarts the pod.

### Developer scales replicas → kubectl scale deployment todo-backend --replicas=3

**Acceptance Scenarios**:
1. **Given** the `todo-backend` deployment is running with a specific number of replicas, **When** the developer executes `kubectl scale deployment todo-backend --replicas=3`, **Then** Kubernetes scales the `todo-backend` deployment to 3 replicas, and all new pods are in a `Running` state.

### Developer checks logs → kubectl logs -f deployment/todo-backend

**Acceptance Scenarios**:
1. **Given** a `todo-backend` pod is running, **When** the developer executes `kubectl logs -f deployment/todo-backend`, **Then** the real-time logs from the `todo-backend` pod are displayed.


---

### Edge Cases

- **Image pull failures (ImagePullBackOff)**: The system should provide clear indications (e.g., in pod status or events) and guidance to verify image tags and registry accessibility.
- **Pending pods (insufficient resources)**: The system should indicate resource constraints, and developers should be able to check resource limits and available cluster capacity.
- **CrashLoopBackOff (startup failures)**: The system should enable developers to diagnose startup issues by checking pod logs and health check configurations.
- **Database connection failures (external Neon DB)**: The system should provide clear error messages indicating connectivity issues, and developers should verify the Kubernetes Secret containing database credentials.
- **Service not accessible (wrong selector)**: Developers should be able to troubleshoot service accessibility issues by verifying labels and selectors match between Deployment and Service resources.
- **ConfigMap/Secret not found**: The system should indicate missing configurations, and developers should verify the creation order and existence of ConfigMaps and Secrets.

## Requirements

### Functional Requirements

- **FR-001**: System MUST include Dockerfiles for Frontend, Backend, and MCP Server that support multi-stage builds (dependencies -> builder -> runtime) and ensure containers run with a non-root user for enhanced security.
- **FR-002**: System MUST use specified base images (`node:20-alpine` for JS/TS, `python:3.13-slim` for Python) to minimize image size and surface area.
- **FR-003**: System MUST provide a Helm Chart that manages Deployment, Service, ConfigMap, and Secret resources for all three services, ensuring proper labels and selectors for resource identification and communication.
- **FR-004**: All services MUST expose a `/health` endpoint that returns a 200 OK status code when healthy, and this endpoint MUST be used for Kubernetes Liveness and Readiness probes.
- **FR-005**: Sensitive configuration (DB credentials, API keys) MUST be securely injected via Kubernetes Secrets, and non-sensitive configurations MUST be managed via Kubernetes ConfigMaps.
- **FR-006**: All pods MUST have resource requests and limits defined for CPU and Memory to prevent resource exhaustion and ensure stable operation.
- **FR-007**: The system MUST be deployable to a Minikube cluster (v1.28+) in the dedicated `hackathon-todo` namespace.
- **FR-008**: AIOps tooling, specifically `kubectl-ai` for manifest generation and `kagent` for cluster health analysis, MUST be integrated and demonstrated for AI-assisted Kubernetes operations.
- **FR-009**: The Backend service MUST establish and verify connectivity to the external Neon PostgreSQL database, and all services MUST be able to communicate within the cluster using Kubernetes service discovery.

### Key Entities

- **Docker Image**: The immutable artifact containing the service code and runtime.
- **Helm Release**: A deployed instance of the application chart.
- **Kubernetes Secret**: Secure storage for sensitive data like `DATABASE_URL`.
- **Pod**: The smallest deployable unit in Kubernetes, hosting the service containers.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Dockerfiles are successfully created for all 3 services (frontend, backend, MCP), and corresponding Docker images build without errors and are tagged correctly.
- **SC-002**: A Helm chart is created with all necessary templates (Deployment, Service, ConfigMap, Secret) and successfully deploys the application to Minikube.
- **SC-003**: All application pods (frontend, backend, MCP) are in a `Running` state (3/3 Ready) in the `hackathon-todo` namespace after Helm deployment.
- **SC-004**: Health checks for all services return `200 OK` responses, indicating healthy and ready states.
- **SC-005**: The Frontend application is accessible via `minikube service`, and the Backend API responds successfully to requests.
- **SC-006**: The Backend service successfully connects to the external Neon PostgreSQL database, and tasks persist across pod restarts.
- **SC-007**: Kubernetes Secrets are correctly created and mounted into pods, and resource limits are effectively applied to all pods.
- **SC-008**: `kubectl-ai` and `kagent` are successfully used to generate at least 2 Kubernetes manifests and analyze cluster health, respectively, with their usage documented.
- **SC-009**: The project README includes clear and comprehensive Minikube setup and deployment instructions.
- **SC-010**: All code generated via Gemini CLI is properly documented in the prompt history.

## Assumptions & Constraints

- **Platform**: Target platform is local Minikube (Kubernetes 1.28+).
- **Database**: The PostgreSQL database (Neon) is external to the cluster; the cluster only connects to it.
- **Registry**: Local Docker daemon (Minikube's docker env) will be used for images; no external registry push required for this phase.
- **OS**: The host system supports Minikube and has Docker installed.

## Non-Goals

- **Ingress Controller**: An Ingress controller is not required for this phase; NodePort or port-forwarding will be used for external access.
- **Persistent Volumes**: Persistent volumes are not within the scope, as the database is external.
- **Horizontal Pod Autoscaler (HPA)**: Automatic scaling is a future enhancement.
- **Network Policies**: Advanced network policies are not in scope for this phase.
- **Service Mesh**: Integration with a service mesh (e.g., Istio, Linkerd) is beyond the scope of this phase.
- **Cloud Deployment**: Deployment to a cloud provider is planned for Phase V.
- **CI/CD Pipeline**: A continuous integration/continuous deployment pipeline is a future enhancement.