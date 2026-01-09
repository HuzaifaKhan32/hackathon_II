from fastapi import APIRouter
from src.api.v1.endpoints import auth, tasks

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
