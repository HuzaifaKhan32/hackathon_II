# Quickstart: Phase IV Local Kubernetes

## Prerequisites

- **Docker**: Desktop or Engine installed.
- **Minikube**: v1.28+ (`minikube start`).
- **Helm**: v3+.
- **kubectl**: Configured for Minikube.

## Setup Cluster

1. **Start Minikube**
   ```bash
   minikube start --cpus=4 --memory=4096 --addons=metrics-server
   ```

2. **Build Images**
   Use Minikube's Docker daemon so it can see the images without pushing to a registry.
   ```bash
   eval $(minikube docker-env)
   docker build -t todo-frontend:latest ./frontend
   docker build -t todo-backend:latest ./backend
   ```

3. **Create Secrets**
   Create the secret manually (avoid committing real creds).
   ```bash
   kubectl create secret generic todo-secrets \
     --from-literal=database-url="postgresql://..." \
     --from-literal=gemini-api-key="AIza..." \
     --from-literal=better-auth-secret="secret..." \
     -n default
   ```

## Deploy

1. **Install Chart**
   ```bash
   helm install todo-app ./k8s/helm/todo-app
   ```

2. **Verify**
   ```bash
   kubectl get pods
   # Wait for status Running
   ```

## Access

1. **Frontend**
   ```bash
   minikube service todo-frontend
   ```

2. **Backend API**
   ```bash
   kubectl port-forward svc/todo-backend 8000:8000
   # Curl localhost:8000/health
   ```

## Troubleshooting

- **CrashLoopBackOff**: `kubectl logs deployment/todo-backend`
- **Pending**: `kubectl describe pod <pod-name>` (Check resources)
