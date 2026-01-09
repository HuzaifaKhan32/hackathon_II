# Data Model & Schema

## Database Entities (SQLModel)

### Conversation
Represents a chat session.

| Field | Type | Required | Unique | Description |
|-------|------|----------|--------|-------------|
| `id` | UUID | Yes | Yes | Primary Key. |
| `user_id` | UUID | Yes | No | Foreign Key to `users.id`. |
| `title` | String | No | No | Auto-generated or "New Chat". |
| `created_at` | DateTime | Yes | No | UTC timestamp. |
| `updated_at` | DateTime | Yes | No | UTC timestamp of last message. |
| `messages` | List[Message] | No | No | Relationship. |

### Message
Represents a single turn in the conversation.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | UUID | Yes | - | Primary Key. |
| `conversation_id` | UUID | Yes | - | Foreign Key to `conversations.id`. |
| `role` | String | Yes | - | "user", "model" (assistant), "function" (tool). |
| `content` | Text | Yes | - | The text content or JSON tool call. |
| `created_at` | DateTime | Yes | - | UTC timestamp. |

## API Schemas (Pydantic)

### Chat
**MessageCreate**
```json
{
  "content": "Add a task to buy milk",
  "conversation_id": "optional-uuid"
}
```

**MessageResponse**
```json
{
  "role": "model",
  "content": "I have added 'buy milk' to your tasks.",
  "conversation_id": "uuid"
}
```

**ConversationRead**
```json
{
  "id": "uuid",
  "title": "New Chat",
  "updated_at": "2026-01-07T..."
}
```
