from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    gemini_api_key: str
    
    # App Config
    base_url: str = "http://localhost:8000"
    secret_key: str = "your-secret-key-for-jwt"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    api_v1_str: str = "/api/v1"

    class Config:
        env_file = ".env"

settings = Settings()
