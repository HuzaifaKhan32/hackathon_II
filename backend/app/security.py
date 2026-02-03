from datetime import datetime, timedelta
from typing import Any

from jose import jwt

from app.config import settings

ALGORITHM = "HS256"

def create_access_token(subject: str | Any, expires_delta: timedelta) -> str:
    expire = datetime.utcnow() + expires_delta
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)
    return encoded_jwt