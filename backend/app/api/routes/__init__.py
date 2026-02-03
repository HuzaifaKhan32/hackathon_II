from fastapi import APIRouter

from .todos import router as todos_router
from .auth import router as auth_router
# from .chat import router as chat_router # Temporarily commented out for AI integration debugging

api_router = APIRouter()
api_router.include_router(todos_router, prefix="/todos")
api_router.include_router(auth_router, prefix="")
# api_router.include_router(chat_router, prefix="/chat") # Temporarily commented out for AI integration debugging