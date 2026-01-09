# Acceptance Checklist: Phase V Cloud Event-Driven

- [ ] **Infrastructure**
    - [ ] DOKS cluster running with 2+ nodes.
    - [ ] Dapr installed (`dapr-system` pods running).
    - [ ] Kafka (Redpanda) installed and healthy.

- [ ] **Microservices**
    - [ ] Backend API running with Dapr sidecar.
    - [ ] Recurring Task Service running with Dapr sidecar.
    - [ ] Notification Service running with Dapr sidecar.

- [ ] **Eventing**
    - [ ] `task-events` topic created in Kafka.
    - [ ] Completing a task triggers `TaskCompleted` event.
    - [ ] Recurring Service consumes event and creates new task (if recurring).

- [ ] **Advanced Features**
    - [ ] Priority and Tags saved in DB.
    - [ ] Search returns correct results.
    - [ ] Reminders trigger logs/emails at due time.

- [ ] **CI/CD**
    - [ ] GitHub Action runs on push to main.
    - [ ] Pipeline builds images and updates Helm release.
    - [ ] Deployment succeeds in < 10 minutes.
