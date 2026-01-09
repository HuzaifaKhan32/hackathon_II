import uuid
from typing import Any, List

from fastapi import APIRouter, HTTPException
from sqlmodel import select

from src.api.deps import SessionDep, CurrentUser
from src.models import Task, TaskRead, TaskCreate, TaskUpdate

router = APIRouter()

@router.get("/", response_model=List[TaskRead])
def read_tasks(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve tasks.
    """
    statement = select(Task).where(Task.user_id == current_user.id).offset(skip).limit(limit)
    tasks = session.exec(statement).all()
    return tasks

@router.post("/", response_model=TaskRead)
def create_task(
    *, session: SessionDep, current_user: CurrentUser, task_in: TaskCreate
) -> Any:
    """
    Create new task.
    """
    task = Task.model_validate(task_in, update={"user_id": current_user.id})
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.put("/{id}", response_model=TaskRead)
def update_task(
    *, session: SessionDep, current_user: CurrentUser, id: uuid.UUID, task_in: TaskUpdate
) -> Any:
    """
    Update a task.
    """
    task = session.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    update_data = task_in.model_dump(exclude_unset=True)
    task.sqlmodel_update(update_data)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{id}", response_model=TaskRead)
def delete_task(
    *, session: SessionDep, current_user: CurrentUser, id: uuid.UUID
) -> Any:
    """
    Delete a task.
    """
    task = session.get(Task, id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if task.user_id != current_user.id:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    
    session.delete(task)
    session.commit()
    return task
