from sqlmodel import SQLModel, Field
from typing import Optional
from sqlalchemy import Integer, String, Column

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    email: str = Field(index=True, unique=True)
    is_active: bool = Field(default=True)
    is_verified: bool = Field(default=False)
    verification_token: Optional[str] = Field(default=None, sa_column=Column(String, index=True))
    # Add other user fields as needed in the future
    # For now, just an ID is sufficient for the foreign key reference in Todo

class UserRead(User):
    pass

class UserCreate(SQLModel):
    email: str
    password: str = Field(max_length=72)

class UserVerify(SQLModel):
    token: str
