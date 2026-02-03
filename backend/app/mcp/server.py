from fastmcp import FastMCP
from app.database import get_session
from app.services.todo_service import TodoService
from typing import List, Dict

mcp = FastMCP("Todo MCP Server")

@mcp.tool()
async def create_todo(
    title: str,
    description: str = "",
    priority: str = "medium"
) -> Dict:
    """Create a new todo item"""
    session = next(get_session())
    service = TodoService(session)
    todo = await service.create_todo(title, description, priority)
    return {
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "priority": todo.priority,
        "status": todo.status
    }

@mcp.tool()
async def list_todos(
    status: str = "all",
    priority: str = None
) -> List[Dict]:
    """List todos with optional filters"""
    session = next(get_session())
    service = TodoService(session)
    todos = await service.list_todos(status, priority)
    return [
        {
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "priority": t.priority,
            "status": t.status,
            "created_at": t.created_at.isoformat()
        }
        for t in todos
    ]

@mcp.tool()
async def update_todo(
    todo_id: int,
    title: str = None,
    description: str = None,
    status: str = None,
    priority: str = None
) -> Dict:
    """Update an existing todo"""
    session = next(get_session())
    service = TodoService(session)
    todo = await service.update_todo(todo_id, title, description, status, priority)
    return {
        "id": todo.id,
        "title": todo.title,
        "description": todo.description,
        "priority": todo.priority,
        "status": todo.status
    }

@mcp.tool()
async def delete_todo(todo_id: int) -> Dict:
    """Delete a todo by ID"""
    session = next(get_session())
    service = TodoService(session)
    await service.delete_todo(todo_id)
    return {"message": f"Todo {todo_id} deleted successfully"}

@mcp.tool()
async def mark_todo_complete(todo_id: int) -> Dict:
    """Mark a todo as completed"""
    session = next(get_session())
    service = TodoService(session)
    todo = await service.mark_complete(todo_id)
    return {
        "id": todo.id,
        "title": todo.title,
        "status": todo.status
    }
