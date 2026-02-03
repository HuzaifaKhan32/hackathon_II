from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlmodel import Session
from app.services.auth_service import AuthService
from app import security
from app.config import settings
from app.database import get_session
from app.models.user import UserCreate, UserRead, UserVerify

router = APIRouter()

def get_auth_service(session: Session = Depends(get_session)) -> AuthService:
    return AuthService(session)

@router.post("/signup", response_model=UserRead)
async def register_user(user_create: UserCreate, service: AuthService = Depends(get_auth_service)):
    return await service.create_user(user_create)

@router.post("/login/access-token")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), service: AuthService = Depends(get_auth_service)):
    user = await service.authenticate_user(email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = security.create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/verify-email")
async def verify_email(user_verify: UserVerify, service: AuthService = Depends(get_auth_service)):
    try:
        user = await service.verify_user(user_verify.token)
        return {"message": f"User {user.email} successfully verified!"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during email verification: {e}"
        )

@router.get("/me")
async def read_current_user(service: AuthService = Depends(get_auth_service)):
    # Placeholder for getting current user's information
    # Requires authentication
    return {"message": "Current user endpoint (placeholder)"}
