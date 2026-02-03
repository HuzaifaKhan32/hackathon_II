from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import create_db_and_tables, AsyncSessionLocal
from app.agents import chat_with_agent
from app.api.routes import api_router, users
from app.services.todo_service import TodoService
from typing import Optional
from fastmcp import FastMCP

# Create FastAPI app
app = FastAPI(
    title="Todo API with AI Chatbot",
    description="FastAPI backend with OpenAI Agents SDK, MCP, and Gemini",
    version="1.0.0"
)

# Create MCP server
mcp = FastMCP("Todo_Server")

@mcp.tool()
async def create_todo(title: str, description: str = "", priority: str = "medium"):
    """Create a new todo item in the Neon database."""
    async with AsyncSessionLocal() as session:
        service = TodoService(session)
        todo = await service.create_todo(title, description, priority)
        return {"id": todo.id, "status": todo.status}

@mcp.tool()
async def list_todos(status: str = "all", priority: Optional[str] = None):
    """List tasks from the Neon database."""
    async with AsyncSessionLocal() as session:
        service = TodoService(session)
        return await service.list_todos(status, priority)

@mcp.tool()
async def update_todo(todo_id: int, title: Optional[str] = None, description: Optional[str] = None, status: Optional[str] = None, priority: Optional[str] = None):
    """Update a task in the Neon database."""
    async with AsyncSessionLocal() as session:
        service = TodoService(session)
        return await service.update_todo(todo_id, title, description, status, priority)

@mcp.tool()
async def delete_todo(todo_id: int):
    """Delete a task from the Neon database."""
    async with AsyncSessionLocal() as session:
        service = TodoService(session)
        return await service.delete_todo(todo_id)

@mcp.tool()
async def mark_complete(todo_id: int):
    """Mark a task as complete in the Neon database."""
    async with AsyncSessionLocal() as session:
        service = TodoService(session)
        return await service.mark_complete(todo_id)

app.include_router(api_router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount MCP server
app.mount("/mcp", mcp)

@app.post("/api/chat")
async def chat(message: str):
    return await chat_with_agent(message)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

@app.get("/")
async def root():
    return {"message": "Todo API with AI Chatbot"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}