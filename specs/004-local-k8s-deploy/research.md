# Phase 0: Research & Architecture Decisions

**Feature**: Phase IV Local Kubernetes Deployment
**Date**: 2026-01-07

## 1. Dockerfile Strategy: Multi-stage

**Decision**: Use **Multi-stage** builds for all services.

**Rationale**:
- **Size**: Separates build tools (compilers, node_modules with devDeps) from runtime (slim OS, only prodDeps).
- **Security**: Runtime image can be minimal (e.g., `python:3.13-slim`, `node:20-alpine`) without build tools that attackers could use.
- **Cache**: Optimizes layer caching for faster rebuilds.

**Pattern**:
```dockerfile
# Builder Stage
FROM python:3.13-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Runtime Stage
FROM python:3.13-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
USER nonroot
CMD ["uvicorn", "main:app"]
```

## 2. Configuration Management: Helm vs Raw Manifests

**Decision**: Use **Helm Charts**.

**Rationale**:
- **DRY**: Reusable templates for Deployments (Backend/Frontend share similar structure).
- **Configurability**: `values.yaml` allows easy switching between environments (Minikube vs Cloud in Phase V).
- **Management**: `helm install/upgrade/rollback` is easier than `kubectl apply -f` multiple files.

**Alternatives Considered**:
- *Kustomize*: Good for overlays, but Helm templating is more flexible for defining "the app" as a package.

## 3. Secret Management: Environment Variables via Secrets

**Decision**: Inject sensitive configs (DB URL, API Keys) as **Environment Variables** derived from **Kubernetes Secrets**.

**Rationale**:
- **Standard**: 12-factor app compliant.
- **Secure**: Secrets are not stored in git (we will provide a `secrets-template.yaml` or use a setup script to create them from local `.env`).

**Mechanism**:
```yaml
env:
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: todo-secrets
        key: database-url
```

## 4. Service Exposure: NodePort (Minikube)

**Decision**: Use **NodePort** (or LoadBalancer which Minikube tunnels) for external access.

**Rationale**:
- **Simplicity**: No need for Ingress Controller setup in basic Minikube.
- **Access**: `minikube service frontend` command easily opens the browser.

**Future (Phase V)**: Switch to LoadBalancer (Cloud) or Ingress (Production).

## 5. Resource Limits

**Decision**: Enforce conservative limits for Minikube compatibility.

**Values**:
- **Frontend**: Requests (0.1 CPU, 128Mi RAM), Limits (0.5 CPU, 512Mi RAM)
- **Backend**: Requests (0.2 CPU, 256Mi RAM), Limits (1.0 CPU, 512Mi RAM)

**Rationale**:
- Prevents OOM kills on the host machine.
- Ensures one service doesn't starve others.

## 6. Frontend Runtime Configuration

**Problem**: Next.js `NEXT_PUBLIC_` variables are baked at build time.
**Decision**:
1. For Server-Side calls (API Client in `lib/api.ts`): Use internal K8s DNS (`http://todo-backend:8000`).
2. For Client-Side calls: We must ensure the API is accessible from the browser.
   - **Approach**: Route all API calls through Next.js API Routes (Proxy) or use CORS.
   - **Decision**: **Next.js Rewrite**. Frontend `next.config.js` will rewrite `/api/:path*` to the Backend Service URL. This allows the browser to talk to Frontend (same origin), and Frontend server talks to Backend (K8s internal network). This solves the "baked env var" issue for API URL.

```javascript
// next.config.js
module.exports = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://todo-backend:8000/api/:path*' }]
  }
}
```
*Note*: This requires the Frontend container to be able to resolve `todo-backend`.
