from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    database_url: str
    gemini_api_key: str
    
    # App Config
    base_url: str = "http://localhost:8000"
    secret_key: str = "your-secret-key-for-jwt"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    api_v1_str: str = "/api/v1"

    # Email Config
    EMAILS_ENABLED: bool = False
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = None
    SMTP_USER: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    EMAILS_FROM_EMAIL: Optional[str] = None
    EMAILS_FROM_NAME: Optional[str] = None
    PROJECT_NAME: str = "My App"


    class Config:
        env_file = ".env"

settings = Settings()
