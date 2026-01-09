# Quickstart: Phase V Cloud Deployment

## Prerequisites

- **DigitalOcean Account**: With Kubernetes support.
- **GitHub Repo**: For CI/CD Actions.
- **Tools**: `doctl`, `helm`, `kubectl`.

## 1. Setup DOKS Cluster

```bash
# Install doctl and authenticate
doctl auth init

# Create Cluster
doctl kubernetes cluster create todo-cluster --region nyc1 --node-pool "name=worker-pool;size=s-2vcpu-4gb;count=2"

# Configure kubectl
doctl kubernetes cluster kubeconfig save todo-cluster
```

## 2. Install Infrastructure

```bash
# Install Dapr
helm repo add dapr https://dapr.github.io/helm-charts/
helm upgrade --install dapr dapr/dapr --namespace dapr-system --create-namespace

# Install Redpanda (Kafka)
helm repo add redpanda https://charts.redpanda.com
helm install redpanda redpanda/redpanda --namespace kafka --create-namespace
```

## 3. Configure GitHub Actions

1. Get `KUBECONFIG` content: `cat ~/.kube/config | base64`
2. Add Secrets to GitHub Repo:
   - `KUBE_CONFIG`: (Base64 content)
   - `DO_REGISTRY_TOKEN`: (If using DO Container Registry)

## 4. Deploy

Push to `main`. The workflow will:
1. Build images.
2. Push to Registry.
3. Apply Helm Charts with new image tags.

## 5. Verify

```bash
kubectl get pods -n hackathon-todo
# Check sidecars
kubectl get pods -l app=backend -o jsonpath='{.items[*].spec.containers[*].name}'
# Should see "backend daprd"
```
