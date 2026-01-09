# Data Model & Schema Additions

## Database Entities (SQLModel Updates)

### Task (Updated)
Existing fields plus:

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `priority` | Enum | Yes | `medium` | `low`, `medium`, `high`. Indexed. |
| `tags` | List[str] | No | `[]` | stored as JSONB or Array. |
| `due_date` | DateTime | No | None | When the task is due. |
| `recurrence` | String | No | None | ISO 8601 duration (e.g., `P1D`, `P1W`) or Cron. |
| `parent_id` | UUID | No | None | ID of the original task if recurring. |

## Async API Events (Dapr/Kafka)

### Topic: `task-events`

**Event: TaskCompleted**
```json
{
  "type": "task.completed",
  "task_id": "uuid",
  "user_id": "uuid",
  "completed_at": "2026-01-07T12:00:00Z",
  "recurrence": "P1W"  // Optional
}
```

**Event: TaskCreated**
```json
{
  "type": "task.created",
  "task_id": "uuid",
  "user_id": "uuid",
  "priority": "high"
}
```

### Topic: `reminders` (Internal Dapr Job Trigger)

**Payload**
```json
{
  "task_id": "uuid",
  "user_id": "uuid",
  "title": "Buy Milk"
}
```
