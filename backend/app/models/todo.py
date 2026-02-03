from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class TodoBase(SQLModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"  # low, medium, high
    status: str = "pending"  # pending, completed

class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

class TodoUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
