# Data Model & Internal API

## Entities

### Task
The core entity representing a todo item.

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `id` | `int` | Yes | Unique, Auto-increment | Unique identifier. |
| `title` | `str` | Yes | 1 <= length <= 200 | The main task text. |
| `description` | `str` | No | length <= 1000 | Optional details. |
| `status` | `TaskStatus` | Yes | Enum: PENDING, COMPLETED | Current state. Default: PENDING. |
| `created_at` | `datetime` | Yes | Valid timestamp | ISO 8601 timestamp of creation. |

## Internal Service Interface (Contracts)

The `TaskService` class will expose these methods to the UI layer.

### `add_task`
- **Input**: `title: str`, `description: Optional[str]`
- **Output**: `Task` object
- **Errors**: `ValidationError` if constraints failed.

### `get_task`
- **Input**: `task_id: int`
- **Output**: `Task` object
- **Errors**: `TaskNotFoundError` if ID not found.

### `list_tasks`
- **Input**: None
- **Output**: `List[Task]`
- **Ordering**: By ID ascending (implied creation order).

### `update_task`
- **Input**: `task_id: int`, `title: Optional[str]`, `description: Optional[str]`
- **Output**: `Task` (updated)
- **Errors**: `TaskNotFoundError`, `ValidationError`.

### `delete_task`
- **Input**: `task_id: int`
- **Output**: `bool` (True if deleted)
- **Errors**: `TaskNotFoundError`.

### `complete_task`
- **Input**: `task_id: int`
- **Output**: `Task` (updated status)
- **Errors**: `TaskNotFoundError`.

### `toggle_task_completion` (Optional convenience)
- **Input**: `task_id: int`
- **Output**: `Task`
- **Errors**: `TaskNotFoundError`.
