from collections.abc import Generator
from sqlmodel import Session, create_engine, SQLModel

from src.core.config import settings

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))

def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

def init_db():
    SQLModel.metadata.create_all(engine)
