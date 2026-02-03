from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlmodel import Session
from app.database import get_session
from app.models.todo import Todo, TodoCreate, TodoRead, TodoUpdate
from app.services.todo_service import TodoService

router = APIRouter()

def get_todo_service(session: Session = Depends(get_session)) -> TodoService:
    return TodoService(session)

@router.post("/", response_model=TodoRead, status_code=status.HTTP_201_CREATED)
async def create_new_todo(todo: TodoCreate, service: TodoService = Depends(get_todo_service)):
    """Create a new todo item."""
    return await service.create_todo(todo.title, todo.description, todo.priority)

@router.get("/", response_model=List[TodoRead])
async def read_todos(
    status: str = "all",
    priority: str = None,
    service: TodoService = Depends(get_todo_service)
):
    """Retrieve multiple todo items."""
    return await service.list_todos(status, priority)

@router.put("/{todo_id}", response_model=TodoRead)
async def update_existing_todo(
    todo_id: int,
    todo: TodoUpdate,
    service: TodoService = Depends(get_todo_service)
):
    """Update a todo item by ID."""
    try:
        updated_todo = await service.update_todo(todo_id, todo.title, todo.description, todo.status, todo.priority)
        return updated_todo
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_todo(todo_id: int, service: TodoService = Depends(get_todo_service)):
    """Delete a todo item by ID."""
    try:
        await service.delete_todo(todo_id)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.post("/{todo_id}/complete", response_model=TodoRead)
async def mark_todo_as_complete(todo_id: int, service: TodoService = Depends(get_todo_service)):
    """Mark a todo item as completed."""
    try:
        completed_todo = await service.mark_complete(todo_id)
        return completed_todo
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
