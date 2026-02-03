from sqlmodel import Session, select
from app.models.user import User, UserCreate
from app.password import get_password_hash, verify_password

class AuthService:
    def __init__(self, session: Session):
        self.session = session

    async def create_user(self, user_create: UserCreate) -> User:
        hashed_password = get_password_hash(user_create.password)
        user = User(
            email=user_create.email,
            hashed_password=hashed_password,
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def authenticate_user(self, email: str, password: str) -> User | None:
        statement = select(User).where(User.email == email)
        user = self.session.exec(statement).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
