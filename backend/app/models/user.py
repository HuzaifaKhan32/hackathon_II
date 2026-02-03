from sqlmodel import SQLModel, Field
from typing import Optional
from sqlalchemy import Integer # Import Integer

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, sa_type=Integer)
    hashed_password: str
    email: Optional[str] = None
    is_active: bool = True
    # Add other user fields as needed in the future
    # For now, just an ID is sufficient for the foreign key reference in Todo

class UserRead(User):
    pass

class UserCreate(SQLModel):
    email: str
    password: str


