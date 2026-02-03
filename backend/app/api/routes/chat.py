from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agents.todo_agent import chat_with_agent

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    success: bool

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the todo assistant"""
    try:
        result = await chat_with_agent(request.message)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))