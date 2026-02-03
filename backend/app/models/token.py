from sqlmodel import SQLModel
from typing import Optional

class TokenPayload(SQLModel):
    sub: Optional[int] = None
