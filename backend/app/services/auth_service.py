from sqlmodel import Session, select
from app.models.user import User, UserCreate
from app.password import get_password_hash, verify_password
from app.utils import generate_verification_token, send_verification_email
from app.config import settings
from fastapi import HTTPException, status

class AuthService:
    def __init__(self, session: Session):
        self.session = session

    async def create_user(self, user_create: UserCreate) -> User:
        existing_user_statement = select(User).where(User.email == user_create.email)
        existing_user_result = await self.session.execute(existing_user_statement)
        existing_user = existing_user_result.scalars().first()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You already signed up. Please log in."
            )

        hashed_password = get_password_hash(user_create.password)
        verification_token = generate_verification_token()
        user = User(
            email=user_create.email,
            hashed_password=hashed_password,
            verification_token=verification_token,
        )
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)

        if settings.EMAILS_ENABLED:
            send_verification_email(email_to=user.email, code=verification_token)

        return user

    async def authenticate_user(self, email: str, password: str) -> User | None:
        statement = select(User).where(User.email == email)
        result = await self.session.execute(statement)
        user = result.scalars().first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials. Please create an account first.")
        if not verify_password(password, user.hashed_password):
            return None
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
        if not user.is_verified:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not verified")
        return user

    async def verify_user(self, token: str) -> User:
        statement = select(User).where(User.verification_token == token)
        result = await self.session.execute(statement)
        user = result.scalars().first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification token",
            )
        user.is_verified = True
        user.verification_token = None
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user
