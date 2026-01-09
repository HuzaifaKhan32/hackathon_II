# Data Model & Schema

## Database Entities (SQLModel)

### User
Represents a registered user of the system.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `id` | UUID | Yes | Yes | Primary Key. Defaults to `uuid4`. |
| `email` | String | Yes | Yes | User's email address. Indexed. |
| `password_hash` | String | Yes | No | Hashed password (bcrypt). |
| `full_name` | String | No | No | Display name. |
| `created_at` | DateTime | Yes | No | UTC timestamp of registration. |
| `updated_at` | DateTime | Yes | No | UTC timestamp of last update. |
| `tasks` | List[Task] | No | No | Relationship: One-to-Many. |

### Task
Represents a single item to be done.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | UUID | Yes | - | Primary Key. Defaults to `uuid4`. |
| `title` | String | Yes | - | Task title (1-200 chars). |
| `description` | String | No | None | Optional details. |
| `is_completed` | Boolean | Yes | False | Completion status. Indexed. |
| `user_id` | UUID | Yes | - | Foreign Key to `user.id`. Indexed. |
| `created_at` | DateTime | Yes | - | UTC timestamp. Indexed. |
| `updated_at` | DateTime | Yes | - | UTC timestamp. |
| `user` | User | Yes | - | Relationship: Many-to-One. |

## API Schemas (Pydantic)

### Auth
**TokenResponse**
```json
{
  "access_token": "eyJhbG...",
  "token_type": "bearer",
  "expires_in": 604800
}
```

**UserCreate**
```json
{
  "email": "user@example.com",
  "password": "strongpassword123",
  "full_name": "John Doe"
}
```

### Task
**TaskCreate**
```json
{
  "title": "Buy milk",
  "description": "2% organic"
}
```

**TaskUpdate**
```json
{
  "title": "Buy milk",
  "description": "Almond milk instead",
  "is_completed": true
}
```

**TaskRead** (Response)
```json
{
  "id": "123e4567-...",
  "title": "Buy milk",
  "description": "2% organic",
  "is_completed": false,
  "created_at": "2026-01-07T10:00:00Z"
}
```
