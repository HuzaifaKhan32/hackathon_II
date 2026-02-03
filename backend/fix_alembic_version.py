from sqlmodel import create_engine, text, Session
from src.core.config import settings

# Force string conversion if it's a MultiHostUrl
db_url = str(settings.SQLALCHEMY_DATABASE_URI)
print(f"Connecting to DB...")

engine = create_engine(db_url)

with Session(engine) as session:
    try:
        # Check current version
        result = session.exec(text("SELECT version_num FROM alembic_version"))
        current = result.first()
        print(f"Current version: {current}")
        
        # Update version
        session.exec(text("UPDATE alembic_version SET version_num = '278644d11934'"))
        session.commit()
        print("Updated version to 278644d11934")
    except Exception as e:
        print(f"Error: {e}")
        # If table doesn't exist, we might need to create it, but it should exist if upgrade head failed on version check
