# Acceptance Checklist: Phase IV K8s Deployment

- [ ] **Docker Images**
    - [ ] Backend builds with multi-stage `python:3.13-slim`.
    - [ ] Frontend builds with multi-stage `node:20-alpine`.
    - [ ] Images successfully built in Minikube env (`eval $(minikube docker-env)`).

- [ ] **Helm Chart**
    - [ ] `helm install` succeeds without errors.
    - [ ] `values.yaml` allows configuring replicas and resources.
    - [ ] Deployments use correct labels/selectors.

- [ ] **Kubernetes Resources**
    - [ ] Secrets mounted as environment variables.
    - [ ] ConfigMaps mounted for non-sensitive data.
    - [ ] Services expose ports 80 (Frontend) and 8000 (Backend).
    - [ ] Liveness/Readiness probes configured on `/health`.

- [ ] **Application Behavior**
    - [ ] Frontend can communicate with Backend (via proxy/rewrite).
    - [ ] Backend connects to Neon DB (External).
    - [ ] Auth and Chat features work in cluster.

- [ ] **AIOps (Bonus)**
    - [ ] `kubectl-ai` used to generate a manifest.
    - [ ] `kagent` ran analysis report.
