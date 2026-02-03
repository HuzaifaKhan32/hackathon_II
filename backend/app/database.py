from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Ensure the URL starts with postgresql+psycopg://
# Neon requires sslmode=require for secure connections
connection_string = settings.database_url.replace("postgresql://", "postgresql+psycopg://")

engine = create_async_engine(
    connection_string,
    echo=True,
    connect_args={"sslmode": "require"},
    pool_pre_ping=True,
)

# Use this factory to create sessions within your tools
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_session() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
